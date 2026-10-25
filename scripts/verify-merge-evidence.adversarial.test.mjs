// Separately derived from S-42 Gate A trust boundary, not from implementation test cases.
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from './verify-merge-evidence.mjs';
const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40);
const claimed={repository:'SethDKelly/TreatFlow',pr:130,baseSha:a,headSha:b,mergeSha:c,observedBaseSha:a,observedHeadSha:b,observedMergeSha:c,testedSha:c,checkAssociatedSha:c,checkConclusion:'success',checkRunUrl:'https://github.com/SethDKelly/TreatFlow/actions/runs/99999999',requiredCheckName:'Verify',protectionVerified:true,independentReviewVerified:true};
test('forged coherent packet must HOLD with nonempty provenance errors',()=>{const r=evaluate(claimed);assert.equal(r.decision,'HOLD');assert.ok(r.errors.length>0);});
test('caller cannot bypass missing independent protection evidence',()=>assert.equal(evaluate({...claimed,protectionVerified:'true'}).decision,'HOLD'));
test('caller cannot bypass missing independent reviewer evidence',()=>assert.equal(evaluate({...claimed,independentReviewVerified:1}).decision,'HOLD'));
for(const x of [null,[],{},'garbage',3]) test('untrusted input fails closed: '+String(x),()=>assert.equal(evaluate(x).decision,'HOLD'));
test('same-tree synthetic merge claim explicitly diagnosed',()=>assert.ok(evaluate({...claimed,mergeSha:a,observedMergeSha:a,testedSha:a,checkAssociatedSha:a}).errors.includes('IMPOSSIBLE_MERGE_IDENTITY')));

test('fake run URL never becomes authenticated',()=>assert.equal(evaluate({...claimed,checkRunUrl:'https://github.com/SethDKelly/TreatFlow/actions/runs/1'}).decision,'HOLD'));
test('head check and merge checkout must remain distinct',()=>assert.ok(evaluate({...claimed,checkAssociatedSha:b}).errors.includes('CHECK_ON_PR_HEAD_NOT_MERGE')));
test('replayed self-consistent packet still HOLD',()=>assert.equal(evaluate({...claimed}).decision,'HOLD'));
test('inherited fields cannot authenticate',()=>assert.equal(evaluate(Object.create(claimed)).decision,'HOLD'));
test('proxy getter trap cannot clear gate',()=>assert.equal(evaluate(new Proxy({}, {get(){throw Error('trap')}})).decision,'HOLD'));

import { mkdtempSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

test('symlinked CLI invocation evaluates packet and never exits 0', () => {
  const dir = mkdtempSync(join(tmpdir(), 's42-symlink-'));
  try {
    const link = join(dir, 'verifier-link.mjs');
    const packet = join(dir, 'forged.json');
    symlinkSync(fileURLToPath(new URL('./verify-merge-evidence.mjs', import.meta.url)), link);
    writeFileSync(packet, JSON.stringify(claimed));
    const run = spawnSync(process.execPath, [link, packet], { encoding: 'utf8' });
    assert.equal(run.status, 1, run.stderr);
    assert.match(run.stdout, /"decision":"HOLD"/);
    assert.match(run.stdout, /UNAUTHENTICATED_EVIDENCE/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test('symlinked CLI missing packet also exits nonzero', () => {
  const dir = mkdtempSync(join(tmpdir(), 's42-symlink-missing-'));
  try {
    const link = join(dir, 'verifier-link.mjs');
    symlinkSync(fileURLToPath(new URL('./verify-merge-evidence.mjs', import.meta.url)), link);
    const run = spawnSync(process.execPath, [link], { encoding: 'utf8' });
    assert.equal(run.status, 1);
    assert.match(run.stderr, /HOLD/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
