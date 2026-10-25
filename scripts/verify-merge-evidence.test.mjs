import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from './verify-merge-evidence.mjs';
const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40),d='d'.repeat(40);
const good={repository:'SethDKelly/TreatFlow',pr:130,baseSha:a,headSha:b,mergeSha:c,observedBaseSha:a,observedHeadSha:b,observedMergeSha:c,testedSha:c,checkAssociatedSha:c,checkConclusion:'success',checkRunUrl:'https://github.com/SethDKelly/TreatFlow/actions/runs/123',requiredCheckName:'Verify',protectionVerified:true,independentReviewVerified:true};
test('complete internally consistent self-reported evidence is not authenticated or merge approved',()=>assert.equal(evaluate(good).decision,'UNVERIFIED_EVIDENCE'));
for(const [name,change] of Object.entries({
 'stale base':{observedBaseSha:d},'stale head':{observedHeadSha:d},'stale merge':{observedMergeSha:d},
 'wrong tested checkout':{testedSha:d},'dispatch ref attribution mismatch':{checkAssociatedSha:d},
 'missing CI':{checkConclusion:'neutral'},'forged URL':{checkRunUrl:'https://evil.invalid/ok'},
 'missing protection':{protectionVerified:false},'missing reviewer':{independentReviewVerified:false},
 'wrong repo':{repository:'other/repo'},'wrong PR':{pr:129},'wrong check':{requiredCheckName:'Build'}
})) test('HOLD on '+name,()=>assert.equal(evaluate({...good,...change}).decision,'HOLD'));
