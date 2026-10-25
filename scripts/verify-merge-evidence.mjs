// S-42 offline-only diagnostic verifier. No network, secrets, GitHub API calls or writes.
// Local, caller-supplied JSON cannot authenticate any check, reviewer, policy or SHA.
// Consequently this tool NEVER grants a gate, even when every field is consistent.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const SHA_RE = /^[a-f0-9]{40}$/;
const RUN_RE = /^https:\/\/github\.com\/SethDKelly\/TreatFlow\/actions\/runs\/\d+$/;
export function evaluate(e) {
  const errors = ['UNAUTHENTICATED_EVIDENCE: caller-provided JSON cannot establish GitHub check, source revision, branch policy or independent review provenance'];
  const need = (ok, why) => { if (!ok) errors.push(why); };
  try {
    if (e === null || typeof e !== 'object' || Array.isArray(e) || Object.getPrototypeOf(e) !== Object.prototype) {
      errors.push('INVALID_PACKET');
      return { decision: 'HOLD', errors };
    }
    const own = k => Object.hasOwn(e, k);
    const validSha = k => own(k) && typeof e[k] === 'string' && SHA_RE.test(e[k]);
    need(own('repository') && e.repository === 'SethDKelly/TreatFlow' && own('pr') && e.pr === 130, 'WRONG_REPOSITORY_OR_PR');
    const keys = ['baseSha','headSha','mergeSha','observedBaseSha','observedHeadSha','observedMergeSha','testedSha','checkAssociatedSha'];
    for (const k of keys) need(validSha(k), 'INVALID_SHA:'+k);
    if (keys.every(validSha)) {
      need(e.baseSha !== e.headSha && e.mergeSha !== e.baseSha && e.mergeSha !== e.headSha, 'IMPOSSIBLE_MERGE_IDENTITY');
      need(e.baseSha === e.observedBaseSha, 'STALE_BASE_CLAIM');
      need(e.headSha === e.observedHeadSha, 'STALE_HEAD_CLAIM');
      need(e.mergeSha === e.observedMergeSha, 'STALE_MERGE_CLAIM');
      need(e.testedSha === e.mergeSha, 'CHECKOUT_NOT_MERGE_CANDIDATE');
      // The run's check association is NOT the same thing as the checkout SHA.
      // A check on the PR head does not prove a required check on the merge SHA.
      need(e.checkAssociatedSha === e.mergeSha, e.checkAssociatedSha === e.headSha ? 'CHECK_ON_PR_HEAD_NOT_MERGE' : 'CHECK_NOT_ON_MERGE');
    }
    need(own('checkConclusion') && e.checkConclusion === 'success' && own('checkRunUrl') && typeof e.checkRunUrl === 'string' && RUN_RE.test(e.checkRunUrl), 'MISSING_OR_UNTRACEABLE_CHECK_CLAIM');
    need(own('requiredCheckName') && e.requiredCheckName === 'Verify', 'REQUIRED_CHECK_NOT_IDENTIFIED');
    // These booleans are untrusted claims, never authentication.
    need(own('protectionVerified') && e.protectionVerified === true, 'MISSING_PROTECTION_CLAIM');
    need(own('independentReviewVerified') && e.independentReviewVerified === true, 'MISSING_REVIEW_CLAIM');
  } catch {
    errors.push('UNSAFE_INPUT');
  }
  return { decision: 'HOLD', errors };
}
// Compare canonical filesystem paths: Node resolves symlinked entrypoints before import.
// A symlink invocation must execute the CLI and fail closed, not silently exit 0.
function isCliEntrypoint() {
  try { return !!process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url)); }
  catch { return false; }
}
if (isCliEntrypoint()) {
  try {
    const result = evaluate(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
    console.log(JSON.stringify(result));
    process.exitCode = 1; // No self-attested packet is gate eligible.
  } catch (err) { console.error('HOLD: invalid evidence input:', err.message); process.exitCode = 1; }
}
