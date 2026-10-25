import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from './verify-merge-evidence.mjs';
const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40),d='d'.repeat(40);
const good={repository:'SethDKelly/TreatFlow',pr:130,baseSha:a,headSha:b,mergeSha:c,observedBaseSha:a,observedHeadSha:b,observedMergeSha:c,testedSha:c,checkAssociatedSha:c,checkConclusion:'success',checkRunUrl:'https://github.com/SethDKelly/TreatFlow/actions/runs/123',requiredCheckName:'Verify',protectionVerified:true,independentReviewVerified:true};
test('internally consistent self-assertion is HOLD with unauthenticated provenance',()=>{const r=evaluate(good);assert.equal(r.decision,'HOLD');assert.ok(r.errors.some(x=>x.startsWith('UNAUTHENTICATED_EVIDENCE')));});
for(const [name,change] of Object.entries({
 'stale base':{observedBaseSha:d},'stale head':{observedHeadSha:d},'stale merge':{observedMergeSha:d},
 'wrong tested checkout':{testedSha:d},'dispatch ref attribution mismatch':{checkAssociatedSha:d},
 'missing CI':{checkConclusion:'neutral'},'forged URL':{checkRunUrl:'https://evil.invalid/ok'},
 'missing protection':{protectionVerified:false},'missing reviewer':{independentReviewVerified:false},
 'wrong repo':{repository:'other/repo'},'wrong PR':{pr:129},'wrong check':{requiredCheckName:'Build'}
})) test('HOLD on '+name,()=>assert.equal(evaluate({...good,...change}).decision,'HOLD'));

test('head-associated check cannot satisfy merge check',()=>assert.ok(evaluate({...good,checkAssociatedSha:b}).errors.includes('CHECK_ON_PR_HEAD_NOT_MERGE')));
test('impossible merge identity diagnosed',()=>assert.ok(evaluate({...good,mergeSha:a,observedMergeSha:a,testedSha:a,checkAssociatedSha:a}).errors.includes('IMPOSSIBLE_MERGE_IDENTITY')));
