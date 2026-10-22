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
const StableWeakSet = WeakSet;
const stableWeakAdd = WeakSet.prototype.add;
const stableWeakHas = WeakSet.prototype.has;
const stableWeakDelete = WeakSet.prototype.delete;
const stableIncludes = Array.prototype.includes;
const stableRegexExec = RegExp.prototype.exec;
const stableSlice = String.prototype.slice;
const stablePadEnd = String.prototype.padEnd;
const arrayIndexPattern = /^(0|[1-9]\d*)$/;
const stableNumberSafe = Number.isSafeInteger;
const stableNumberFinite = Number.isFinite;
const stableParse = Date.parse;
const stableDate = Date;
const plainPrototype = Object.prototype;
const shaPattern = /^[a-f0-9]{40}$/i;
const timestampPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?Z$/;
const sha = v => typeof v === "string" && stableCall(stableRegexExec, shaPattern, [v]) !== null;
const own = (o,k) => stableCall(stableHasOwn,o,[k]);
function copy(value, seen = new StableWeakSet()) {
  if (value === null || typeof value !== "object" || stableIsProxy(value)) {
    if (value !== null && typeof value === "object") throw Error("proxy");
    return value;
  }
  if (stableCall(stableWeakHas,seen,[value])) throw Error("cycle");
  stableCall(stableWeakAdd,seen,[value]);
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
    if (array && stableCall(stableRegexExec, arrayIndexPattern, [key]) === null) throw Error("array key");
    stableDefine(result,key,{value:copy(d.value,seen),enumerable:true,writable:true,configurable:true});
  }
  if (array && result.length !== value.length) throw Error("array holes");
  stableCall(stableWeakDelete,seen,[value]);
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
// UTC-Z profile: fixed-width seconds and zero-padded 9-digit fractions compare exactly.
// Date.parse truncates beyond milliseconds and MUST NOT be used for receipt ordering.
function compareUtc(left, right) {
  const lSeconds = stableCall(stableSlice, left, [0, 19]);
  const rSeconds = stableCall(stableSlice, right, [0, 19]);
  if (lSeconds !== rSeconds) return lSeconds < rSeconds ? -1 : 1;
  const lMatch = stableCall(stableRegexExec, timestampPattern, [left]);
  const rMatch = stableCall(stableRegexExec, timestampPattern, [right]);
  const lFraction = stableCall(stablePadEnd, lMatch[7] ?? "", [9, "0"]);
  const rFraction = stableCall(stablePadEnd, rMatch[7] ?? "", [9, "0"]);
  return lFraction === rFraction ? 0 : (lFraction < rFraction ? -1 : 1);
}
const fail = reason => stableFreeze({state:"HOLD",reason,canApprove:false,canDispatch:false,canMerge:false});
export function evaluateProviderAttempt(rawAttempt, rawSource) {
  let attempt,source;
  try {attempt=copy(rawAttempt);source=copy(rawSource);} catch {return fail("INVALID_RECORD");}
  if (!record(attempt) || !record(attempt.dispatch) || !record(source)) return fail("INVALID_RECORD");
  if (attempt.schemaVersion!==1 || !text(attempt.repository) || !stableNumberSafe(attempt.pullRequest) || attempt.pullRequest<1 ||
    !sha(attempt.headSha) || !stableCall(stableIncludes,["codex","cursor-bugbot","cursor-agent"],[attempt.provider]) ||
    !stableCall(stableIncludes,["standard","targeted-adversarial"],[attempt.purpose]) || !text(attempt.attemptId) ||
    !text(attempt.dispatch.mechanism) || !text(attempt.dispatch.requestUrl) || !time(attempt.dispatch.requestedAt))
    return fail("INVALID_ATTEMPT");
  if ((attempt.provider==="cursor-agent") !== (attempt.purpose==="targeted-adversarial")) return fail("PROVIDER_PURPOSE_MISMATCH");
  if (!own(attempt,"receipt")) return fail("RECEIPT_MISSING");
  const receipt=attempt.receipt;
  if (!record(receipt) || !text(receipt.source) || !text(receipt.sourceUrl) || !sha(receipt.reviewedSha) ||
    !time(receipt.observedAt) || !stableCall(stableIncludes,["PASS","FINDINGS","ERROR","UNKNOWN"],[receipt.verdict]))
    return fail("INVALID_RECEIPT");
  if (receipt.reviewedSha!==attempt.headSha || compareUtc(receipt.observedAt,attempt.dispatch.requestedAt)<0) return fail("SOURCE_MISMATCH");
  // Even matching caller-supplied authenticatedSource is NOT authenticated evidence.
  // S-75 must establish a non-forgeable collector provenance boundary first.
  return fail("UNVERIFIED_PROVIDER_SOURCE");
}
