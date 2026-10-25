// Offline-only CI evidence qualification. No network, tokens, or GitHub API writes.
// Usage: node scripts/verify-merge-evidence.mjs evidence.json
import fs from 'node:fs';
const sha = x => typeof x === 'string' && /^[a-f0-9]{40}$/.test(x);
export function evaluate(e) {
  const errors = [];
  const need = (ok, why) => { if (!ok) errors.push(why); };
  need(e?.repository === 'SethDKelly/TreatFlow' && e?.pr === 130, 'wrong repository or PR');
  for (const k of ['baseSha','headSha','mergeSha','observedBaseSha','observedHeadSha','observedMergeSha','testedSha','checkAssociatedSha'])
    need(sha(e?.[k]), 'missing/invalid '+k);
  if (errors.length) return { decision:'HOLD', errors };
  need(e.baseSha === e.observedBaseSha, 'stale base');
  need(e.headSha === e.observedHeadSha, 'stale head');
  need(e.mergeSha === e.observedMergeSha, 'stale merge');
  need(e.testedSha === e.mergeSha, 'tested checkout differs from merge candidate');
  need(e.checkAssociatedSha === e.mergeSha, 'check is not attributed to merge candidate');
  need(e.checkConclusion === 'success' && typeof e.checkRunUrl === 'string' && /^https:\/\/github\.com\/SethDKelly\/TreatFlow\/actions\/runs\/\d+$/.test(e.checkRunUrl), 'missing/failing/untraceable CI check');
  need(e.requiredCheckName === 'Verify', 'required check not identified');
  need(e.protectionVerified === true, 'branch protection not independently verified');
  need(e.independentReviewVerified === true, 'independent review not verified');
  // These are caller assertions, not authenticated provider receipts; structural consistency cannot clear a gate.
  return { decision: errors.length ? 'HOLD' : 'UNVERIFIED_EVIDENCE', errors };
}
if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  try {
    const r = evaluate(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
    console.log(JSON.stringify(r));
    process.exitCode = r.errors.length ? 1 : 2; // structurally consistent still requires external verification
  } catch (err) { console.error('HOLD: invalid evidence input:', err.message); process.exitCode = 1; }
}
