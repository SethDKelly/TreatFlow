// S-77: offline-only, untrusted observation contract. No GitHub API or dispatch.
const sha = /^[a-f0-9]{40}$/i;
const providers = new Set(["codex", "cursor-bugbot", "cursor-agent"]);
const purposes = new Set(["standard", "targeted-adversarial"]);
const verdicts = new Set(["PASS", "FINDINGS", "ERROR", "UNKNOWN"]);
const validSha = (v) => typeof v === "string" && sha.test(v);
const own = (o, k) => Object.hasOwn(o, k);
const stableIsProxy = (await import("node:util")).types.isProxy;
const stableArrayIsArray = Array.isArray;
const stableGetPrototype = Object.getPrototypeOf;
const record = (v) => v !== null && typeof v === "object" && !stableIsProxy(v) && !stableArrayIsArray(v) && stableGetPrototype(v) === Object.prototype;
const text = (v) => typeof v === "string" && v.length > 0 && v.length <= 1024;
const time = (v) => text(v) && !Number.isNaN(Date.parse(v)) && /Z$/.test(v);
const fail = (reason) => Object.freeze({state: "HOLD", reason, canApprove: false, canDispatch: false, canMerge: false});
export function evaluateProviderAttempt(attempt, authenticatedSource) {
  if (!record(attempt) || !record(attempt.dispatch) || !record(authenticatedSource)) return fail("INVALID_RECORD");
  if (attempt.schemaVersion !== 1 || !text(attempt.repository) || !Number.isSafeInteger(attempt.pullRequest) || attempt.pullRequest < 1 ||
      !validSha(attempt.headSha) || !providers.has(attempt.provider) || !purposes.has(attempt.purpose) || !text(attempt.attemptId) ||
      !text(attempt.dispatch.mechanism) || !text(attempt.dispatch.requestUrl) || !time(attempt.dispatch.requestedAt))
    return fail("INVALID_ATTEMPT");
  if (attempt.provider === "cursor-agent" && attempt.purpose !== "targeted-adversarial") return fail("PROVIDER_PURPOSE_MISMATCH");
  if (attempt.provider !== "cursor-agent" && attempt.purpose !== "standard") return fail("PROVIDER_PURPOSE_MISMATCH");
  if (!own(attempt, "receipt")) return fail("RECEIPT_MISSING");
  const receipt = attempt.receipt;
  if (!record(receipt) || !text(receipt.source) || !text(receipt.sourceUrl) || !validSha(receipt.reviewedSha) ||
      !time(receipt.observedAt) || !verdicts.has(receipt.verdict)) return fail("INVALID_RECEIPT");
  // Caller-authored receipt claims cannot authenticate themselves. A trusted
  // collector must supply a separate, authenticated source observation.
  if (authenticatedSource.authenticated !== true || authenticatedSource.repository !== attempt.repository ||
      authenticatedSource.pullRequest !== attempt.pullRequest || authenticatedSource.provider !== attempt.provider ||
      authenticatedSource.sourceUrl !== receipt.sourceUrl || authenticatedSource.reviewedSha !== attempt.headSha ||
      receipt.reviewedSha !== attempt.headSha || authenticatedSource.verdict !== receipt.verdict)
    return fail("SOURCE_MISMATCH");
  if (receipt.verdict !== "PASS") return fail("NON_PASS_REVIEW");
  // Advisory only: even a valid provider receipt never confers merge authority.
  return Object.freeze({state: "RECEIPT_OBSERVED", reason: "ADVISORY_ONLY", canApprove: false, canDispatch: false, canMerge: false});
}
