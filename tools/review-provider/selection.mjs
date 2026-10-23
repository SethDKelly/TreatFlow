// S-78 deterministic OFFLINE decision engine. No provider transport, authenticated receipt or writer.
import { createHash } from "node:crypto";
import { types } from "node:util";
const isProxy=types.isProxy;
const descriptors=Object.getOwnPropertyDescriptors;
const prototype=Object.getPrototypeOf;
function safeCopy(v,seen=new WeakSet(),budget={n:0},depth=0){
 if(++budget.n>2048||depth>32) throw Error("budget");
 if(v===null||typeof v!=="object") return v;
 if(isProxy(v)||seen.has(v)) throw Error("proxy or cycle");
 seen.add(v);
 const arr=Array.isArray(v);
 if(!arr&&prototype(v)!==Object.prototype&&prototype(v)!==null) throw Error("prototype");
 const ds=descriptors(v),out=arr?[]:Object.create(null);
 for(const k of Reflect.ownKeys(ds)){
  if(typeof k!=="string"||(arr&&k==="length")) continue;
  const d=ds[k];if(!Object.hasOwn(d,"value")||!d.enumerable) throw Error("accessor");
  if(arr&&!/^(0|[1-9]\\d*)$/.test(k)) throw Error("array key");
  Object.defineProperty(out,k,{value:safeCopy(d.value,seen,budget,depth+1),enumerable:true,writable:true,configurable:true});
 }
 if(arr&&out.length!==v.length) throw Error("holes");
 seen.delete(v);return out;
}
const PROVIDERS = Object.freeze(["codex","cursor-bugbot","cursor-agent"]);
const SHA = /^[a-f0-9]{40}$/i;
const integer = Number.isSafeInteger;
const own = (o,k) => Object.prototype.hasOwnProperty.call(o,k);
const hold = (reason,ledger) => Object.freeze({state:"HOLD",reason,canDispatch:false,canApprove:false,canMerge:false,ledger});
const freeze = value => Object.freeze(value);
const keyOf = ({repository,pr,headSha}) => JSON.stringify([repository,pr,headSha.toLowerCase()]);
const draw = (seed,key) => parseInt(createHash("sha256").update(JSON.stringify([seed,key])).digest("hex").slice(0,13),16)/0x10000000000000;
const validTime = n => integer(n) && n>=0;
function validInput(x) {
  if (!x || Object.getPrototypeOf(x)!==null || !Array.isArray(x.providers) || !Array.isArray(x.ledger) ||
      typeof x.repository!=="string" || !/^[^/]+\/[^/]+$/.test(x.repository) ||
      !integer(x.pr) || x.pr<1 || typeof x.headSha!=="string" || !SHA.test(x.headSha) ||
      typeof x.seed!=="string" || !x.seed || !validTime(x.now) ||
      !["codex","cursor-bugbot","cursor-agent","human","unknown"].includes(x.implementer)) return false;
  if (x.override && (!PROVIDERS.includes(x.override.provider) || !validTime(x.override.startsAt) ||
      !validTime(x.override.expiresAt) || x.override.expiresAt<=x.override.startsAt ||
      x.override.expiresAt-x.override.startsAt>3600000 || typeof x.override.reason!=="string" || !x.override.reason ||
      typeof x.override.requester!=="string" || !x.override.requester)) return false;
  return x.providers.every(p=>p && PROVIDERS.includes(p.id) && typeof p.verifiedDispatch==="boolean" &&
    typeof p.healthy==="boolean" && validTime(p.cooldownUntil) && integer(p.weight) && p.weight>=1 && p.weight<=100) &&
    new Set(x.providers.map(p=>p.id)).size===x.providers.length &&
    x.ledger.every(e=>e && typeof e.key==="string" && PROVIDERS.includes(e.provider) &&
      ["REQUESTED","TIMED_OUT","FAILED","RATE_LIMITED","RECEIPT_PENDING","COMPLETED"].includes(e.state) &&
      integer(e.attempt) && e.attempt>=1 && e.attempt<=2);
}
export function selectOffline(input) {
  // JSON-only data is required; never execute arbitrary callbacks from evidence.
  let x;
  try {
    x=safeCopy(input);
    if (!validInput(x)) return hold("INVALID_INPUT",freeze([]));
  } catch { return hold("INVALID_INPUT",freeze([])); }
  const key=keyOf(x);
  const ledger=freeze(x.ledger.map(e=>freeze({...e})));
  const existing=ledger.filter(e=>e.key===key);
  const open=new Map(),finished=new Set();
  for(const e of existing){
    const id=JSON.stringify([e.provider,e.attempt]);
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
  if(existing.some(e=>e.state==="COMPLETED")) return hold("CYCLE_COMPLETED",ledger);
  const failures=existing.filter(e=>["FAILED","TIMED_OUT","RATE_LIMITED"].includes(e.state));
  const used=new Map();
  for(const e of failures) used.set(e.provider,Math.max(used.get(e.provider)??0,e.attempt));
  const eligible=x.providers.filter(p=>p.verifiedDispatch && p.healthy && p.cooldownUntil<=x.now &&
    p.id!==x.implementer && (used.get(p.id)??0)<2);
  if (!eligible.length) return hold("BLOCKED_NO_DISPATCH",ledger);
  // One retry of the same provider, then verified alternate; a failure on attempt 2 excludes it.
  const latest=failures.at(-1);
  let candidates=eligible;
  if(latest && latest.attempt===1 && true) {
    const retry=eligible.find(p=>p.id===latest.provider);
    if(retry) candidates=[retry];
  } else if(latest) {
    const alternate=eligible.filter(p=>p.id!==latest.provider);
    if(alternate.length) candidates=alternate;
    else return hold("BLOCKED_NO_ALTERNATE",ledger);
  }
  const override=x.override;
  const active=override && x.now>=override.startsAt && x.now<override.expiresAt;
  if(active) {
    const pinned=candidates.find(p=>p.id===override.provider);
    if(pinned) candidates=[pinned]; // override cannot bypass eligibility
  }
  const history=new Map();
  const completed=ledger.filter(e=>e.state==="COMPLETED");
  const previous=completed.at(-1)?.provider;
  if(candidates.length>1 && previous){const rotated=candidates.filter(p=>p.id!==previous);if(rotated.length)candidates=rotated;}
  for(const e of completed) history.set(e.provider,(history.get(e.provider)??0)+1);
  const weights=candidates.map(p=>p.weight/(1+(history.get(p.id)??0)));
  const total=weights.reduce((a,b)=>a+b,0);
  const sample=draw(x.seed,key);
  let offset=sample*total, selected=candidates.at(-1);
  for(let i=0;i<candidates.length;i++) {offset-=weights[i];if(offset<0){selected=candidates[i];break;}}
  const attempt=(used.get(selected.id)??0)+1;
  const next=freeze([...ledger,freeze({key,provider:selected.id,attempt,state:"REQUESTED"})]);
  return freeze({state:"OFFLINE_SELECTION",provider:selected.id,attempt,key,draw:sample,
    selectionMethod:active&&selected.id===override.provider?"BOUNDED_OVERRIDE":"WEIGHTED_DETERMINISTIC",
    eligible:freeze(candidates.map(p=>p.id)),canDispatch:false,canApprove:false,canMerge:false,ledger:next});
}
export function invalidateHead(ledger,repository,pr,newHeadSha) {
  if (!Array.isArray(ledger) || typeof repository!=="string" || !integer(pr) || !SHA.test(newHeadSha)) throw Error("invalid head");
  const current=keyOf({repository,pr,headSha:newHeadSha});
  return freeze(ledger.filter(e=>e.key===current).map(e=>freeze({...e})));
}
