// S-78 deterministic OFFLINE decision engine. No provider transport, authenticated receipt or writer.
import { createHash } from "node:crypto";
import { types } from "node:util";
const isProxy=types.isProxy;
const descriptors=Object.getOwnPropertyDescriptors;
const freeze=Object.freeze;
const filter=Function.call.bind(Array.prototype.filter);
const map=Function.call.bind(Array.prototype.map);
const some=Function.call.bind(Array.prototype.some);
const every=Function.call.bind(Array.prototype.every);
const lower=Function.call.bind(String.prototype.toLowerCase);
const prototype=Object.getPrototypeOf;
const arrayIsArray=Array.isArray;
const includes=Function.call.bind(Array.prototype.includes);
const find=Function.call.bind(Array.prototype.find);
const at=Function.call.bind(Array.prototype.at);
const reduce=Function.call.bind(Array.prototype.reduce);
const keys=Object.keys;
const define=Object.defineProperty;
const ownKeyList=Reflect.ownKeys;
const stringify=JSON.stringify;
const parse=JSON.parse;
const regexTest=Function.call.bind(RegExp.prototype.test);

function safeCopy(v,seen=new WeakSet(),budget={n:0},depth=0){
 if(++budget.n>2048||depth>32) throw Error("budget");
 if(v===null||typeof v!=="object") return v;
 if(isProxy(v)||seen.has(v)) throw Error("proxy or cycle");
 seen.add(v);
 const arr=arrayIsArray(v);
 if(!arr&&prototype(v)!==Object.prototype&&prototype(v)!==null) throw Error("prototype");
 const ds=descriptors(v),out=arr?[]:Object.create(null);
 for(const k of ownKeyList(ds)){
  if(typeof k!=="string"||(arr&&k==="length")) continue;
  const d=ds[k];if(!Object.hasOwn(d,"value")||!d.enumerable) throw Error("accessor");
  if(arr&&!regexTest(/^(0|[1-9]\d*)$/,k)) throw Error("array key");
  define(out,k,{value:safeCopy(d.value,seen,budget,depth+1),enumerable:true,writable:true,configurable:true});
 }
 if(arr&&out.length!==v.length) throw Error("holes");
 if(arr&&keys(out).length!==v.length) throw Error("holes");
 seen.delete(v);return out;
}
const PROVIDERS = freeze(["codex","cursor-bugbot","cursor-agent"]);
const SHA = /^[a-f0-9]{40}$/i;
const integer = Number.isSafeInteger;

const hold = (reason,ledger) => freeze({state:"HOLD",reason,canDispatch:false,canApprove:false,canMerge:false,ledger});

const keyOf = ({repository,pr,headSha}) => stringify([lower(repository),pr,lower(headSha)]);
function canonicalKey(k){const v=parse(k);if(!arrayIsArray(v)||v.length!==3||typeof v[0]!=="string"||!regexTest(/^[^/]+\/[^/]+$/,v[0])||!integer(v[1])||v[1]<1||typeof v[2]!=="string"||!regexTest(SHA,v[2])) throw Error("key");return keyOf({repository:v[0],pr:v[1],headSha:v[2]});}
const draw = (seed,key) => parseInt(createHash("sha256").update(stringify([seed,key])).digest("hex").slice(0,13),16)/0x10000000000000;
const validTime = n => integer(n) && n>=0;
function validInput(x) {
  if (!x || prototype(x)!==null || !arrayIsArray(x.providers) || !arrayIsArray(x.ledger) ||
      typeof x.repository!=="string" || !regexTest(/^[^/]+\/[^/]+$/,x.repository) ||
      !integer(x.pr) || x.pr<1 || typeof x.headSha!=="string" || !regexTest(SHA,x.headSha) ||
      typeof x.seed!=="string" || !x.seed || !validTime(x.now) ||
      !includes(["codex","cursor-bugbot","cursor-agent","human","unknown"],x.implementer)) return false;
  if (x.purpose!==undefined && !includes(["standard","targeted-adversarial"],x.purpose)) return false;
  if (x.override && (!includes(PROVIDERS,x.override.provider) || !validTime(x.override.startsAt) ||
      !validTime(x.override.expiresAt) || x.override.expiresAt<=x.override.startsAt ||
      x.override.expiresAt-x.override.startsAt>3600000 || typeof x.override.reason!=="string" || !x.override.reason ||
      typeof x.override.requester!=="string" || !x.override.requester)) return false;
  return every(x.providers,p=>p && includes(PROVIDERS,p.id) && typeof p.verifiedDispatch==="boolean" &&
    typeof p.healthy==="boolean" && validTime(p.cooldownUntil) && integer(p.weight) && p.weight>=1 && p.weight<=100) &&
    new Set(map(x.providers,p=>p.id)).size===x.providers.length &&
    every(x.ledger,e=>e && typeof e.key==="string" && canonicalKey(e.key)===e.key && includes(PROVIDERS,e.provider) &&
      includes(["REQUESTED","TIMED_OUT","FAILED","RATE_LIMITED","RECEIPT_PENDING","COMPLETED"],e.state) &&
      integer(e.attempt) && e.attempt>=1 && e.attempt<=2 &&
      (e.state!=="RATE_LIMITED" || validTime(e.retryAfter)));
}
export function selectOffline(input) {
  // JSON-only data is required; never execute arbitrary callbacks from evidence.
  let x;
  try {
    x=safeCopy(input);
    if (!validInput(x)) return hold("INVALID_INPUT",freeze([]));
  } catch { return hold("INVALID_INPUT",freeze([])); }
  const key=keyOf(x);
  const ledger=freeze(map(x.ledger,e=>freeze({...e})));
  const existing=filter(ledger,e=>e.key===key);
  // Validate all historical attempts before allowing their completion to influence rotation.
  const allOpen=new Map(),allFinished=new Set(),firstTerminal=new Map();
  for(const e of map(ledger,e=>e)){const id=stringify([e.key,e.provider,e.attempt]);
   if(e.state==="REQUESTED"){if(allOpen.has(id)||allFinished.has(id)) return hold("INVALID_LEDGER",ledger);if(e.attempt===2&&!includes(["FAILED","TIMED_OUT","RATE_LIMITED"],firstTerminal.get(stringify([e.key,e.provider])))) return hold("INVALID_LEDGER",ledger);allOpen.set(id,true);}
   else if(e.state==="RECEIPT_PENDING"){if(!allOpen.has(id)) return hold("INVALID_LEDGER",ledger);}
   else {if(!allOpen.has(id)) return hold("INVALID_LEDGER",ledger);allOpen.delete(id);allFinished.add(id);if(e.attempt===1) firstTerminal.set(stringify([e.key,e.provider]),e.state);}
  }
  const open=new Map(),finished=new Set();
  for(const e of map(existing,e=>e)){
    const id=stringify([e.provider,e.attempt]);
    if(e.state==="REQUESTED"){
      if(open.has(id)||finished.has(id)) return hold("INVALID_LEDGER",ledger);
      open.set(id,true);
    } else if(e.state==="RECEIPT_PENDING"){
      if(!open.has(id)) return hold("INVALID_LEDGER",ledger);
    } else {
      if(!open.has(id)) return hold("INVALID_LEDGER",ledger);
      open.delete(id);finished.add(id);
    }
  }
  if(open.size) return hold("IDEMPOTENT_PENDING",ledger);
  if(some(existing,e=>e.state==="COMPLETED")) return hold("CYCLE_COMPLETED",ledger);
  const failures=filter(existing,e=>includes(["FAILED","TIMED_OUT","RATE_LIMITED"],e.state));
  const used=new Map();
  for(const e of map(failures,e=>e)) used.set(e.provider,Math.max(used.get(e.provider)??0,e.attempt));
  const limited=filter(ledger,e=>e.state==="RATE_LIMITED" && parse(e.key)[0]===lower(x.repository) && parse(e.key)[1]===x.pr);
  const recovery=new Map();
  for(const e of map(limited,e=>e)) recovery.set(e.provider,Math.max(recovery.get(e.provider)??0,e.retryAfter));
  const eligible=filter(x.providers,p=>(x.purpose==="targeted-adversarial" ? p.id==="cursor-agent" : p.id!=="cursor-agent") && p.verifiedDispatch && p.healthy && p.cooldownUntil<=x.now && (recovery.get(p.id)??0)<=x.now &&
    p.id!==x.implementer && (used.get(p.id)??0)<2);
  if (!eligible.length) return hold("BLOCKED_NO_DISPATCH",ledger);
  // One retry of the same provider, then verified alternate; a failure on attempt 2 excludes it.
  const latest=at(failures,-1);
  let candidates=eligible;
  if(latest && latest.attempt===1 && (latest.state!=="RATE_LIMITED" || latest.retryAfter<=x.now)) {
    const retry=find(eligible,p=>p.id===latest.provider);
    if(retry) candidates=[retry];
  } else if(latest) {
    const alternate=filter(eligible,p=>p.id!==latest.provider);
    if(alternate.length) candidates=alternate;
    else return hold("BLOCKED_NO_ALTERNATE",ledger);
  }
  const override=x.override;
  const active=override && x.now>=override.startsAt && x.now<override.expiresAt;
  if(active) {
    const pinned=find(candidates,p=>p.id===override.provider);
    if(pinned) candidates=[pinned]; // override cannot bypass eligibility
  }
  const history=new Map();
  const completed=filter(ledger,e=>e.state==="COMPLETED");
  const previous=at(completed,-1)?.provider;
  if(candidates.length>1 && previous){const rotated=filter(candidates,p=>p.id!==previous);if(rotated.length)candidates=rotated;}
  for(const e of map(completed,e=>e)) history.set(e.provider,(history.get(e.provider)??0)+1);
  const weights=map(candidates,p=>p.weight/(1+(history.get(p.id)??0)));
  const total=reduce(weights,(a,b)=>a+b,0);
  const sample=draw(x.seed,key);
  let offset=sample*total, selected=at(candidates,-1);
  for(let i=0;i<candidates.length;i++) {offset-=weights[i];if(offset<0){selected=candidates[i];break;}}
  const attempt=(used.get(selected.id)??0)+1;
  const next=freeze([...ledger,freeze({key,provider:selected.id,attempt,state:"REQUESTED"})]);
  return freeze({state:"OFFLINE_SELECTION",provider:selected.id,attempt,key,draw:sample,
    selectionMethod:active&&selected.id===override.provider?"BOUNDED_OVERRIDE":"WEIGHTED_DETERMINISTIC",
    eligible:freeze(map(candidates,p=>p.id)),canDispatch:false,canApprove:false,canMerge:false,ledger:next});
}
export function invalidateHead(input,repository,pr,newHeadSha) {
 try {
  const ledger=safeCopy(input);
  if(!arrayIsArray(ledger)||typeof repository!=="string"||!regexTest(/^[^/]+\/[^/]+$/,repository)||!integer(pr)||pr<1||typeof newHeadSha!=="string"||!regexTest(SHA,newHeadSha)) return freeze([]);
  const current=keyOf({repository,pr,headSha:newHeadSha});
  if(!every(ledger,e=>e&&typeof e.key==="string"&&canonicalKey(e.key)===e.key&&includes(PROVIDERS,e.provider)&&integer(e.attempt)&&e.attempt>=1&&e.attempt<=2&&includes(["REQUESTED","RECEIPT_PENDING","FAILED","TIMED_OUT","RATE_LIMITED","COMPLETED"],e.state)&&(e.state!=="RATE_LIMITED"||validTime(e.retryAfter)))) return freeze([]);
  const keep=new Set();
  for(const e of map(ledger,e=>e)) if(e.state==="COMPLETED" || (e.state==="RATE_LIMITED" && e.retryAfter>0)) keep.add(stringify([e.key,e.provider,e.attempt]));
  return freeze(map(filter(ledger,e=>e.key===current||keep.has(stringify([e.key,e.provider,e.attempt]))),e=>freeze(e)));
 }catch{return freeze([]);}
}
