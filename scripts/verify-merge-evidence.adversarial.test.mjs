// Separately derived from S-42 Gate A trust boundary, not from implementation test cases.
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from './verify-merge-evidence.mjs';
const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40);
const claimed={repository:'SethDKelly/TreatFlow',pr:130,baseSha:a,headSha:b,mergeSha:c,observedBaseSha:a,observedHeadSha:b,observedMergeSha:c,testedSha:c,checkAssociatedSha:c,checkConclusion:'success',checkRunUrl:'https://github.com/SethDKelly/TreatFlow/actions/runs/99999999',requiredCheckName:'Verify',protectionVerified:true,independentReviewVerified:true};
test('fully forged but internally coherent source cannot produce PASS or Gate C clearance',()=>assert.equal(evaluate(claimed).decision,'UNVERIFIED_EVIDENCE'));
test('caller cannot bypass missing independent protection evidence',()=>assert.equal(evaluate({...claimed,protectionVerified:'true'}).decision,'HOLD'));
test('caller cannot bypass missing independent reviewer evidence',()=>assert.equal(evaluate({...claimed,independentReviewVerified:1}).decision,'HOLD'));
for(const x of [null,[],{},'garbage',3]) test('untrusted input fails closed: '+String(x),()=>assert.equal(evaluate(x).decision,'HOLD'));
test('synthetic merge same-tree claim is not authenticated by self-consistent SHA',()=>assert.notEqual(evaluate({...claimed,mergeSha:a,observedMergeSha:a,testedSha:a,checkAssociatedSha:a}).decision,'PASS'));
