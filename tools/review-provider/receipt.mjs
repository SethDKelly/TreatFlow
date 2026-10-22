// S-77 offline-only receipt parsing. Caller input cannot establish authenticated provenance.
// A trusted collector is not implemented; no untrusted pair can yield RECEIPT_OBSERVED.
import { types } from "node:util";
const stableIsProxy = types.isProxy;
const stableIsArray = Array.isArray;
const stableGetPrototype = Object.getPrototypeOf;
const stableGetDescriptors = Object.getOwnPropertyDescriptors;
const stableOwnKeys = Reflect.ownKeys;
const stableCreate = Object.create;
const stableDefine = Object.defineProperty;
const stableFreeze = Object.freeze;
const stableHasOwn = Object.prototype.hasOwnProperty;
const stableCall = Reflect.apply;
const stableRegexExec = RegExp.prototype.exec;
const stableNumberSafe = Number.isSafeInteger;
const stableNumberFinite = Number.isFinite;
const stableParse = Date.parse;
const stableDate = Date;
const plainPrototype = Object.prototype;
const shaPattern = /^[a-f0-9]{40}$/i;
const timestampPattern = /^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(?:\\.(\\d{1,9}))?Z$/;
const sha = v => typeof v === "string" && stableCall(stableRegexExec, shaPattern, [v]) !== null;
const own = (o,k) => stableCall(stableHasOwn,o,[k]);
function copy(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || stableIsProxy(value)) {
    if (value !== null && typeof value === "object") throw Error("proxy");
    return value;
  }
  if (seen.has(value)) throw Error("cycle");
  seen.add(value);
  const array = stableIsArray(value);
  if (!array && stableGetPrototype(value) !== plainPrototype && stableGetPrototype(value) !== null) throw Error("prototype");
  const result = array ? [] : stableCreate(null);
  const descriptors = stableGetDescriptors(value);
  const keys = stableOwnKeys(descriptors);
  for (let i=0;i<keys.length;i++) {
    const key=keys[i];
    if (typeof key !== "string" || (array && key === "length")) continue;
    const d=descriptors[key];
    if (!own(d,"value") || !d.enumerable) throw Error("accessor or nonenumerable");
    if (array && !/^(0|[1-9]\\d*)$/.test(key)) throw Error("array key");
    stableDefine(result,key,{value:copy(d.value,seen),enumerable:true,writable:true,configurable:true});
  }
  if (array && result.length !== value.length) throw Error("array holes");
  seen.delete(value);
  return result;
}
const record = v => v !== null && typeof v === "object" && !stableIsArray(v) && stableGetPrototype(v) === null;
const text = v => typeof v === "string" && v.length > 0 && v.length <= 1024;
function time(v) {
  if (typeof v !== "string") return false;
  const m=stableCall(stableRegexExec,timestampPattern,[v]);
  if (!m) return false;
  const year=+m[1],month=+m[2],day=+m[3],hour=+m[4],minute=+m[5],second=+m[6];
  if (year<1 || month<1 || month>12 || day<1 || day>31 || hour>23 || minute>59 || second>59) return false;
  const days=[31,year%4===0&&(year%100!==0||year%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];
  return day<=days[month-1] && stableNumberFinite(stableCall(stableParse,stableDate,[v]));
}
const fail = reason => stableFreeze({state:"HOLD",reason,canApprove:false,canDispatch:false,canMerge:false});
export function evaluateProviderAttempt(rawAttempt, rawSource) {
  let attempt,source;
  try {attempt=copy(rawAttempt);source=copy(rawSource);} catch {return fail("INVALID_RECORD");}
  if (!record(attempt) || !record(attempt.dispatch) || !record(source)) return fail("INVALID_RECORD");
  if (attempt.schemaVersion!==1 || !text(attempt.repository) || !stableNumberSafe(attempt.pullRequest) || attempt.pullRequest<1 ||
    !sha(attempt.headSha) || !["codex","cursor-bugbot","cursor-agent"].includes(attempt.provider) ||
    !["standard","targeted-adversarial"].includes(attempt.purpose) || !text(attempt.attemptId) ||
    !text(attempt.dispatch.mechanism) || !text(attempt.dispatch.requestUrl) || !time(attempt.dispatch.requestedAt))
    return fail("INVALID_ATTEMPT");
  if ((attempt.provider==="cursor-agent") !== (attempt.purpose==="targeted-adversarial")) return fail("PROVIDER_PURPOSE_MISMATCH");
  if (!own(attempt,"receipt")) return fail("RECEIPT_MISSING");
  const receipt=attempt.receipt;
  if (!record(receipt) || !text(receipt.source) || !text(receipt.sourceUrl) || !sha(receipt.reviewedSha) ||
    !time(receipt.observedAt) || !["PASS","FINDINGS","ERROR","UNKNOWN"].includes(receipt.verdict))
    return fail("INVALID_RECEIPT");
  if (receipt.reviewedSha!==attempt.headSha || receipt.observedAt<attempt.dispatch.requestedAt) return fail("SOURCE_MISMATCH");
  // Even matching caller-supplied authenticatedSource is NOT authenticated evidence.
  // S-75 must establish a non-forgeable collector provenance boundary first.
  return fail("UNVERIFIED_PROVIDER_SOURCE");
}
