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
  assert.equal(invalidateHead(a.ledger,"o/r",12,"b".repeat(40)).length,0);
  assert.equal(invalidateHead(a.ledger,"o/r",12,SHA).length,1);
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
 const a=selectOffline(x);x.ledger=[...a.ledger,{...a.ledger[0],state:"RATE_LIMITED"}];
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
 const kept=invalidateHead(complete,"o/r",12,"b".repeat(40));
 assert.equal(kept.length,2);
 const next=base();next.headSha="b".repeat(40);next.ledger=kept;
 assert.equal(selectOffline(next).provider,"cursor-bugbot");
 let invoked=0;const hostile=[{get key(){invoked++;return a.key;}}];
 assert.deepEqual(invalidateHead(hostile,"o/r",12,SHA),[]);
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
