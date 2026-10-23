import test from "node:test";
import assert from "node:assert/strict";
import {selectOffline,invalidateHead} from "./selection.mjs";
const SHA="a".repeat(40);
const base=()=>({repository:"o/r",pr:12,headSha:SHA,seed:"recorded-seed",now:100000,
  implementer:"human",ledger:[],providers:[
    {id:"codex",verifiedDispatch:true,healthy:true,cooldownUntil:0,weight:2},
    {id:"cursor-bugbot",verifiedDispatch:true,healthy:true,cooldownUntil:0,weight:1},
    {id:"cursor-agent",verifiedDispatch:false,healthy:true,cooldownUntil:0,weight:1}
  ]});
test("deterministic auditable weighted selection never dispatches",()=>{
  const x=base(),a=selectOffline(x),b=selectOffline(x);
  assert.deepEqual(a,b);assert.equal(a.state,"OFFLINE_SELECTION");
  assert.equal(a.canDispatch,false);assert.equal(a.canMerge,false);assert.ok(a.draw>=0&&a.draw<1);
  assert.equal(Object.isFrozen(a.ledger),true);
});
test("unverified, unhealthy, cooldown and implementer are ineligible",()=>{
  const x=base();x.implementer="codex";x.providers[1].cooldownUntil=100001;
  assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
});
test("bounded manual pin expires and cannot bypass eligibility",()=>{
  const x=base();x.override={provider:"cursor-bugbot",startsAt:90000,expiresAt:110000,requester:"operator",reason:"quota"};
  assert.equal(selectOffline(x).provider,"cursor-bugbot");
  assert.equal(selectOffline(x).selectionMethod,"BOUNDED_OVERRIDE");
  x.now=110000;assert.equal(selectOffline(x).selectionMethod,"WEIGHTED_DETERMINISTIC");
  x.now=100000;x.providers[1].verifiedDispatch=false;
  assert.notEqual(selectOffline(x).provider,"cursor-bugbot");
  x.override.expiresAt=999999999;assert.equal(selectOffline(x).reason,"INVALID_INPUT");
});
test("idempotent pending and single retry then alternate",()=>{
  const x=base(),first=selectOffline(x);x.ledger=[...first.ledger];
  assert.equal(selectOffline(x).reason,"IDEMPOTENT_PENDING");
  x.ledger.push({...x.ledger.at(-1),state:"TIMED_OUT"});
  const retry=selectOffline(x);assert.equal(retry.provider,first.provider);assert.equal(retry.attempt,2);
  x.ledger=[...retry.ledger,{...retry.ledger.at(-1),state:"FAILED"}];
  const alt=selectOffline(x);assert.notEqual(alt.provider,first.provider);
});
test("quota cooldown and no verified alternate hold",()=>{
  const x=base();x.providers[0].cooldownUntil=200000;x.providers[1].verifiedDispatch=false;
  assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
});
test("head changes invalidate old attempts",()=>{
  const x=base(),a=selectOffline(x);
  assert.equal(invalidateHead(a.ledger,"o/r",12,"b".repeat(40),100000).length,0);
  assert.equal(invalidateHead(a.ledger,"o/r",12,SHA,100000).length,1);
});
test("invalid and hostile inputs hold without effects",()=>{
  assert.equal(selectOffline({}).reason,"INVALID_INPUT");
  const x=base();x.providers[0].weight=0;assert.equal(selectOffline(x).reason,"INVALID_INPUT");
  const y=base();y.providers.push({...y.providers[0]});assert.equal(selectOffline(y).reason,"INVALID_INPUT");
  assert.equal(selectOffline(new Proxy(base(),{get(){throw Error("trap")}})).reason,"INVALID_INPUT");
});

test("accessor evidence rejected without getter invocation",()=>{
 let invoked=0;const x=base();Object.defineProperty(x,"seed",{enumerable:true,get(){invoked++;return "evil";}});
 assert.equal(selectOffline(x).reason,"INVALID_INPUT");assert.equal(invoked,0);
});
test("malformed trailing failure cannot hide pending attempt",()=>{
 const x=base(),a=selectOffline(x);x.ledger=[...a.ledger,{key:a.key,provider:"cursor-agent",attempt:1,state:"FAILED"}];
 assert.equal(selectOffline(x).reason,"INVALID_LEDGER");
});
test("rate-limit recovery retries once after cooldown",()=>{
 const x=base();x.providers[1].verifiedDispatch=false;
 const a=selectOffline(x);x.ledger=[...a.ledger,{...a.ledger[0],state:"RATE_LIMITED",retryAfter:x.now+1}];
 x.providers[0].cooldownUntil=x.now+1;assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
 x.now+=2;const retry=selectOffline(x);assert.equal(retry.provider,"codex");assert.equal(retry.attempt,2);
});
test("completed cycle excludes previous reviewer when alternative exists",()=>{
 const x=base();const oldKey=JSON.stringify(["o/r",11,SHA]);
 x.ledger=[{key:oldKey,provider:"codex",attempt:1,state:"REQUESTED"},{key:oldKey,provider:"codex",attempt:1,state:"COMPLETED"}];
 assert.equal(selectOffline(x).provider,"cursor-bugbot");
});

test("noncanonical ledger keys fail closed instead of replaying",()=>{
 const x=base(),a=selectOffline(x);x.ledger=[{...a.ledger[0],key:JSON.stringify(["O/R",12,SHA.toUpperCase()])}];
 assert.equal(selectOffline(x).reason,"INVALID_INPUT");
});
test("historical unmatched completion cannot manipulate rotation",()=>{
 const x=base();x.ledger=[{key:JSON.stringify(["other/repo",12,SHA]),provider:"codex",attempt:1,state:"COMPLETED"}];
 assert.equal(selectOffline(x).reason,"INVALID_LEDGER");
});
test("head invalidation retains validated completed cycle and safely rejects getters",()=>{
 const x=base(),a=selectOffline(x);
 const complete=[...a.ledger,{...a.ledger[0],state:"COMPLETED"}];
 const kept=invalidateHead(complete,"o/r",12,"b".repeat(40),100000);
 assert.equal(kept.length,2);
 const next=base();next.headSha="b".repeat(40);next.ledger=kept;
 assert.equal(selectOffline(next).provider,"cursor-bugbot");
 let invoked=0;const hostile=[{get key(){invoked++;return a.key;}}];
 assert.equal(invalidateHead(hostile,"o/r",12,SHA,100000).reason,"INVALID_INPUT");
 assert.equal(invoked,0);
});
test("repository case normalizes idempotency",()=>{
 const x=base(),a=selectOffline(x);x.repository="O/R";x.ledger=[...a.ledger];
 assert.equal(selectOffline(x).reason,"IDEMPOTENT_PENDING");
});
test("standard purpose excludes cursor cloud agent",()=>{
 const x=base();x.providers[0].verifiedDispatch=false;x.providers[1].verifiedDispatch=false;x.providers[2].verifiedDispatch=true;
 assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
 x.purpose="targeted-adversarial";assert.equal(selectOffline(x).provider,"cursor-agent");
});
test("array holes are rejected",()=>{
 const x=base();delete x.providers[1];assert.equal(selectOffline(x).reason,"INVALID_INPUT");
});

test("rate-limit ledger deadline blocks retry despite provider claiming recovery",()=>{
 const x=base(),a=selectOffline(x);
 x.ledger=[...a.ledger,{...a.ledger[0],state:"RATE_LIMITED",retryAfter:x.now+100}];
 x.providers[0].cooldownUntil=0;
 const next=selectOffline(x);
 assert.notEqual(next.provider,a.provider);
 x.providers[1].verifiedDispatch=false;
 assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
 x.now+=101;
 assert.equal(selectOffline(x).provider,a.provider);
});
test("rate-limit event without auditable recovery deadline is invalid",()=>{
 const x=base(),a=selectOffline(x);
 x.ledger=[...a.ledger,{...a.ledger[0],state:"RATE_LIMITED"}];
 assert.equal(selectOffline(x).reason,"INVALID_INPUT");
});

test("targeted purpose exclusively selects cloud agent",()=>{
 const x=base();x.purpose="targeted-adversarial";x.providers[2].verifiedDispatch=true;
 assert.equal(selectOffline(x).provider,"cursor-agent");
 x.providers[2].verifiedDispatch=false;assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
});
test("attempt two requires prior terminal failure",()=>{
 const x=base(),key=JSON.stringify(["o/r",12,SHA]);
 x.ledger=[{key,provider:"codex",attempt:2,state:"REQUESTED"},{key,provider:"codex",attempt:2,state:"COMPLETED"}];
 assert.equal(selectOffline(x).reason,"INVALID_LEDGER");
});
test("rate limit survives head invalidation",()=>{
 const x=base(),a=selectOffline(x);
 x.ledger=[...a.ledger,{...a.ledger[0],state:"RATE_LIMITED",retryAfter:x.now+100}];
 const y=base();y.headSha="b".repeat(40);y.ledger=invalidateHead(x.ledger,"o/r",12,y.headSha,x.now);
 assert.notEqual(selectOffline(y).provider,a.provider);
});

test("head invalidation rejects orphan completed and rate-limited events",()=>{
 const key=JSON.stringify(["o/r",12,SHA]);
 for(const state of ["COMPLETED","RATE_LIMITED"]){
  const event={key,provider:"codex",attempt:1,state,...(state==="RATE_LIMITED"?{retryAfter:100100}:{})};
  assert.equal(invalidateHead([event],"o/r",12,"b".repeat(40),100000).reason,"INVALID_LEDGER");
 }
});
test("head invalidation rejects second attempt without first failure",()=>{
 const key=JSON.stringify(["o/r",12,SHA]);
 const events=[{key,provider:"codex",attempt:2,state:"REQUESTED"},{key,provider:"codex",attempt:2,state:"COMPLETED"}];
 assert.equal(invalidateHead(events,"o/r",12,"b".repeat(40),100000).reason,"INVALID_LEDGER");
});

test("mutated Object.create cannot inject an unverified provider",()=>{
 const original=Object.create;
 try {
  Object.create=()=>({providers:[{id:"cursor-agent",verifiedDispatch:true,healthy:true,cooldownUntil:0,weight:100}]});
  const x=base();x.providers[0].verifiedDispatch=false;x.providers[1].verifiedDispatch=false;
  assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
 } finally {Object.create=original;}
});
test("mutated Math.max cannot bypass retry limits or rate-limit cooldown",()=>{
 const original=Math.max;
 try {
  Math.max=()=>0;
  const x=base();x.providers[1].verifiedDispatch=false;
  const first=selectOffline(x);
  x.ledger=[...first.ledger,{...first.ledger[0],state:"RATE_LIMITED",retryAfter:x.now+100}];
  assert.equal(selectOffline(x).reason,"BLOCKED_NO_DISPATCH");
 } finally {Math.max=original;}
});
test("mutated collection size getters cannot bypass duplicate providers or pending ledger",()=>{
 const mapDescriptor=Object.getOwnPropertyDescriptor(Map.prototype,"size");
 const setDescriptor=Object.getOwnPropertyDescriptor(Set.prototype,"size");
 try {
  Object.defineProperty(Map.prototype,"size",{configurable:true,get(){return 0;}});
  Object.defineProperty(Set.prototype,"size",{configurable:true,get(){return 0;}});
  const x=base();x.providers.push({...x.providers[0]});
  assert.equal(selectOffline(x).reason,"INVALID_INPUT");
  const y=base(),first=selectOffline(y);y.ledger=[...first.ledger];
  assert.equal(selectOffline(y).reason,"IDEMPOTENT_PENDING");
 } finally {
  Object.defineProperty(Map.prototype,"size",mapDescriptor);
  Object.defineProperty(Set.prototype,"size",setDescriptor);
 }
});
test("mutated parseInt and string slice cannot alter deterministic draw",()=>{
 const x=base(),expected=selectOffline(x),parse=Number.parseInt,slice=String.prototype.slice;
 try {
  Number.parseInt=()=>0;String.prototype.slice=()=> "0000000000000";
  assert.deepEqual(selectOffline(x),expected);
 } finally {Number.parseInt=parse;String.prototype.slice=slice;}
});

test("poisoned array iterator cannot omit validated ledger history",()=>{
 const x=base(),first=selectOffline(x);
 x.ledger=Array.from(first.ledger);
 x.ledger.push({...x.ledger[0],state:"TIMED_OUT"});
 const iterator=Array.prototype[Symbol.iterator];
 try {
  Array.prototype[Symbol.iterator]=function*(){};
  const next=selectOffline(x);
  assert.equal(next.state,"OFFLINE_SELECTION");
  assert.equal(next.ledger.length,3);
  assert.equal(next.ledger[0].state,"REQUESTED");
  assert.equal(next.ledger[1].state,"TIMED_OUT");
  assert.equal(next.ledger[2].attempt,2);
 } finally {Array.prototype[Symbol.iterator]=iterator;}
});

test("array species replacement cannot forge eligibility or throw from selection",()=>{
 const x=base(),expected=selectOffline(x);
 const prior=Object.getOwnPropertyDescriptor(Array,Symbol.species);
 let actual;
 try {
  Object.defineProperty(Array,Symbol.species,{configurable:true,get(){throw Error("poisoned species");}});
  actual=selectOffline(x);
 } finally {Object.defineProperty(Array,Symbol.species,prior);}
 assert.deepEqual(actual,expected);
});
test("poisoned array iterator cannot forge duplicate-provider uniqueness",()=>{
 const x=base();x.providers.push({...x.providers[1]});
 const original=Array.prototype[Symbol.iterator];
 let actual;
 try {
  Array.prototype[Symbol.iterator]=function*(){for(let i=0;i<this.length;i++)yield "forged-unique-"+i;};
  actual=selectOffline(x);
 } finally {Array.prototype[Symbol.iterator]=original;}
 assert.equal(actual.state,"HOLD");
 assert.equal(actual.reason,"INVALID_INPUT");
});
test("mutated Map and Set globals cannot escape fail-closed selection",()=>{
 const x=base(),expected=selectOffline(x),mapCtor=globalThis.Map,setCtor=globalThis.Set;
 let actual;
 try {
  globalThis.Map=class {constructor(){throw Error("map-ctor");}};
  globalThis.Set=class {constructor(){throw Error("set-ctor");}};
  actual=selectOffline(x);
 } finally {globalThis.Map=mapCtor;globalThis.Set=setCtor;}
 assert.deepEqual(actual,expected);
});
test("Array.prototype.toJSON cannot forge repository identity or draw",()=>{
 const x=base(),expected=selectOffline(x),prior=Object.getOwnPropertyDescriptor(Array.prototype,"toJSON");
 let actual;
 try {
  Object.defineProperty(Array.prototype,"toJSON",{configurable:true,value(){return ["evil/repo",99,"b".repeat(40)];}});
  actual=selectOffline(x);
 } finally {
  if(prior)Object.defineProperty(Array.prototype,"toJSON",prior);
  else delete Array.prototype.toJSON;
 }
 assert.deepEqual(actual,expected);
});

test("head invalidation drops expired and unrelated rate-limit history",()=>{
 const target=JSON.stringify(["o/r",12,SHA]),other=JSON.stringify(["other/repo",12,SHA]);
 const pair=(key,provider,retryAfter)=>[
  {key,provider,attempt:1,state:"REQUESTED"},
  {key,provider,attempt:1,state:"RATE_LIMITED",retryAfter}
 ];
 const ledger=[...pair(target,"codex",100001),...pair(other,"codex",200000),...pair(target,"cursor-bugbot",200000)];
 const kept=invalidateHead(ledger,"O/R",12,"b".repeat(40),100010);
 assert.equal(kept.length,2);
 assert.equal(kept[0].provider,"cursor-bugbot");
 assert.equal(kept[1].state,"RATE_LIMITED");
 assert.equal(invalidateHead(ledger,"o/r",12,"b".repeat(40)).reason,"INVALID_INPUT");
});

test("function-valued evidence is rejected without executing getters",()=>{
 let calls=0;
 const hostile=function(){};
 Object.defineProperty(hostile,"id",{enumerable:true,get(){calls++;return "codex";}});
 Object.assign(hostile,{verifiedDispatch:true,healthy:true,cooldownUntil:0,weight:2});
 const x=base();x.providers[0]=hostile;
 assert.equal(selectOffline(x).reason,"INVALID_INPUT");
 assert.equal(calls,0);
 const y=base();y.ledger=[hostile];
 assert.equal(selectOffline(y).reason,"INVALID_INPUT");
 const z=base();z.override=hostile;
 assert.equal(selectOffline(z).reason,"INVALID_INPUT");
 const nested=base();nested.extra={callback:hostile};
 assert.equal(selectOffline(nested).reason,"INVALID_INPUT");
 assert.equal(calls,0);
 assert.equal(invalidateHead([hostile],"o/r",12,SHA,100000).reason,"INVALID_INPUT");
 assert.equal(calls,0);
});

test("invalid head invalidation is distinguishable from successful empty history",()=>{
 const nextHead="b".repeat(40),x=base(),first=selectOffline(x);
 const validEmpty=invalidateHead(first.ledger,"o/r",12,nextHead,x.now);
 assert.deepEqual(validEmpty,[]);
 assert.equal(Object.isFrozen(validEmpty),true);
 const invalid=invalidateHead(first.ledger,"o/r",12,nextHead);
 assert.equal(invalid.state,"HOLD");
 assert.equal(invalid.reason,"INVALID_INPUT");
 assert.equal(invalid.canDispatch,false);
 assert.equal(invalid.canApprove,false);
 assert.equal(invalid.canMerge,false);
 assert.equal("ledger" in invalid,false);
 const next=base();next.headSha=nextHead;next.ledger=invalid;
 assert.equal(selectOffline(next).reason,"INVALID_INPUT");
 next.ledger=invalid.ledger;
 assert.equal(selectOffline(next).reason,"INVALID_INPUT");
 const bad=[{...first.ledger[0],state:"COMPLETED"}];
 const rejected=invalidateHead(bad,"o/r",12,nextHead,x.now);
 assert.equal(rejected.state,"HOLD");
 assert.equal(rejected.reason,"INVALID_LEDGER");
 assert.equal("ledger" in rejected,false);
});
