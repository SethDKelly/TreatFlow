import test from "node:test";
import assert from "node:assert/strict";
import { evaluateOffline, evidenceDigest, reviewWithMock } from "./controller.mjs";
import { types } from "node:util";
import { createRequire, syncBuiltinESMExports } from "node:module";

const sha = (c) => c.repeat(40);
const digest = (c) => c.repeat(64);
const file = (path = "src/domain/types.ts", kind = "text") =>
  kind === "text" ? { path, status: "modified", kind, patchDigest: digest("a") } :
    { path, status: "modified", kind, objectDigest: digest("b") };
const clone = (v) => structuredClone(v);
// One fixed test-run clock keeps cross-fixture digests reproducible while
// exercising the time-sensitive source-claim freshness gate.
const testClock = Date.now();
const at = (secondsBefore = 0) => new Date(testClock - secondsBefore * 1000).toISOString();

function fixture(strategy = "squash") {
  const head = sha("1"), tip = sha("2"), base = sha("3"), ancestor = sha("4");
  const check = { name: "Verify", sha: tip, appId: 15368, workflowRevision: sha("6"),
    workflowPath: ".github/workflows/ci.yml", runId: 400, attempt: 1,
    status: "completed", conclusion: "success" };
  const reads = ["merge", "checks", "issue", "threads", "final"].map((kind, index) => ({
    kind, sequence: index + 1, observedAt: at(4 - index),
    complete: true, tipSha: tip,
  }));
  const checkClaim = { name: check.name, runId: check.runId,
    attempt: check.attempt, status: check.status, conclusion: check.conclusion,
    sha: check.sha, appId: check.appId,
    workflowRevision: check.workflowRevision, workflowPath: check.workflowPath };
  reads[1].checkRuns = [clone(checkClaim)];
  reads[2].issueId = "S-32";
  reads[2].status = "Verification";
  reads[2].blockersComplete = true;
  reads[3].unresolvedCount = 0;
  reads[4].issueId = "S-32";
  reads[4].status = "Verification";
  reads[4].unresolvedCount = 0;
  reads[4].checkRunCount = 1;
  reads[4].blockersComplete = true;
  reads[4].checkRuns = [clone(checkClaim)];
  return {
    capture: { source: "synthetic-fixture", complete: true, producer: "test-harness",
      capturedAt: at(), reads },
    event: { action: "closed", merged: true, repositoryId: 123, prNumber: 115, baseRef: "main" },
    policy: {
      repositoryId: 123, baseRef: "main", issueId: "S-32",
      policySha: sha("5"), workflowRevision: sha("6"),
      checkAppId: 15368, workflowPath: ".github/workflows/ci.yml", requiredChecks: ["Verify"],
    },
    observations: {
      repositoryId: 123, prNumber: 115, baseRef: "main", merged: true,
      reviewedHead: head, integratedTip: tip, mergeBaseSha: ancestor,
      preIntegrationBaseSha: base, mergeStrategy: strategy,
      parentShas: strategy === "merge" ? [base, head] : [base],
      authoredChange: { fromSha: ancestor, toSha: head, complete: true, files: [file()] },
      integratedChange: { fromSha: base, toSha: tip, complete: true, files: [file()] },
      issue: { id: "S-32", linkedIds: ["S-32"], status: "Verification", blockersComplete: true },
      unresolvedThreads: [],
      checks: [check],
    },
  };
}
const decide = (update, strategy) => {
  const f = fixture(strategy);
  update(f);
  return evaluateOffline(f);
};
const state = (update, strategy) => decide(update, strategy).state;
const code = (update, strategy) => decide(update, strategy).code;

test("offline squash and ordinary merge produce shadow-ready envelopes, never trusted PASS", () => {
  for (const s of ["squash", "merge"]) {
    evidenceDigest(fixture(s));
    const result = evaluateOffline(fixture(s));
    assert.equal(result.state, "SHADOW_EVIDENCE_READY", result.code);
    assert.equal(result.envelope.authenticated, false);
    assert.equal(result.envelope.manifest.sourceClass, "SYNTHETIC_UNATTESTED");
    assert.equal(result.canDispatch, false);
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
    assert.match(result.envelope.manifestDigest, /^[0-9a-f]{64}$/);
  }
});
test("immutable canonical snapshots and stable replay identity", () => {
  const f = fixture();
  const first = evaluateOffline(f);
  const second = evaluateOffline(clone(f));
  assert.equal(first.envelope.manifestDigest, second.envelope.manifestDigest);
  assert.equal(first.envelope.workKey, second.envelope.workKey);
  f.observations.issue.id = "ALTERED";
  assert.equal(first.envelope.manifest.observations.issue.id, "S-32");
  assert.throws(() => { first.envelope.manifest.event.prNumber = 77; }, TypeError);
});
test("canonical hashing is independent of key insertion order", () => {
  assert.equal(evidenceDigest({ b: [1, null], a: "hello" }), evidenceDigest({ a: "hello", b: [1, null] }));
});
test("closed but not merged is ignored", () => {
  assert.equal(state((f) => { f.event.merged = false; }), "SHADOW_IGNORED");
});
test("unrelated event is ignored", () => {
  assert.equal(code((f) => { f.event.action = "opened"; }), "NON_CLOSED_EVENT");
});
test("wrong repo and base are rejected", () => {
  assert.equal(code((f) => { f.event.repositoryId = 999; }), "UNAUTHORIZED_REPOSITORY_OR_BASE");
  assert.equal(code((f) => { f.event.baseRef = "development"; }), "UNAUTHORIZED_REPOSITORY_OR_BASE");
});
test("webhook mismatch with re-fetched PR is HOLD", () => {
  assert.equal(code((f) => { f.observations.prNumber = 999; }), "EVENT_API_MISMATCH");
});
test("unpinned graph and policy never advance", () => {
  assert.equal(code((f) => { f.policy.policySha = "main"; }), "UNPINNED_GIT_OR_POLICY");
  assert.equal(code((f) => { f.observations.reviewedHead = "HEAD"; }), "UNPINNED_GIT_OR_POLICY");
});
test("unsupported merge strategy stops", () => {
  assert.equal(code((f) => { f.observations.mergeStrategy = "indirect"; }), "UNSUPPORTED_INTEGRATION_STRATEGY");
});
test("integration commit may not appear in its own parent list", () => {
  assert.equal(code((f) => {
    f.observations.integratedTip = sha("1");
    f.observations.integratedChange.toSha = sha("1");
    f.observations.checks[0].sha = sha("1");
    f.observations.parentShas = [sha("3"), sha("1")];
  }, "merge"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => {
    f.observations.integratedTip = sha("3");
    f.observations.integratedChange.toSha = sha("3");
    f.observations.checks[0].sha = sha("3");
  }, "squash"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => {
    f.observations.rebaseRangeProven = true;
    f.observations.integratedChange.rangeProven = true;
    f.observations.integratedTip = sha("3");
    f.observations.integratedChange.toSha = sha("3");
    f.observations.checks[0].sha = sha("3");
  }, "rebase"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => {
    f.observations.parentShas = [sha("3"), sha("3")];
  }, "merge"), "INCONSISTENT_PARENT_GRAPH");
});
test("mixed-case SHA aliases cannot evade self-parent or duplicate-parent guards", () => {
  assert.equal(code((f) => {
    f.observations.integratedTip = sha("a");
    f.observations.integratedChange.toSha = sha("a");
    f.observations.checks[0].sha = sha("a");
    f.observations.parentShas = [sha("A")];
    f.observations.preIntegrationBaseSha = sha("A");
    f.observations.integratedChange.fromSha = sha("A");
  }, "squash"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => {
    f.observations.parentShas = [sha("a"), sha("A")];
    f.observations.preIntegrationBaseSha = sha("a");
    f.observations.integratedChange.fromSha = sha("a");
  }, "merge"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => {
    f.observations.integratedTip = sha("a");
    f.observations.integratedChange.toSha = sha("a");
    f.observations.checks[0].sha = sha("a");
    f.observations.reviewedHead = sha("a");
    f.observations.authoredChange.toSha = sha("a");
    f.observations.parentShas = [sha("3"), sha("A")];
  }, "merge"), "INCONSISTENT_PARENT_GRAPH");
});
test("declared nonempty diffs cannot have identical endpoints", () => {
  for (const strategy of ["squash", "merge", "rebase"]) {
    assert.equal(code((f) => {
      f.observations.mergeBaseSha = f.observations.reviewedHead;
      f.observations.authoredChange.fromSha = f.observations.reviewedHead;
      if (strategy === "rebase") {
        f.observations.rebaseRangeProven = true;
        f.observations.integratedChange.rangeProven = true;
      }
    }, strategy), "ZERO_LENGTH_DECLARED_DIFF");
  }
  assert.equal(code((f) => {
    f.observations.rebaseRangeProven = true;
    f.observations.integratedChange.rangeProven = true;
    f.observations.preIntegrationBaseSha = f.observations.integratedTip;
    f.observations.integratedChange.fromSha = f.observations.integratedTip;
  }, "rebase"), "ZERO_LENGTH_DECLARED_DIFF");
  assert.equal(code((f) => {
    f.observations.reviewedHead = sha("a");
    f.observations.authoredChange.toSha = sha("a");
    f.observations.mergeBaseSha = sha("A");
    f.observations.authoredChange.fromSha = sha("A");
  }), "ZERO_LENGTH_DECLARED_DIFF");
});
test("ordinary merge must have two parents", () => {
  assert.equal(code((f) => { f.observations.parentShas = [sha("3")]; }, "merge"), "INCONSISTENT_PARENT_GRAPH");
});
test("ordinary merge second parent must be the reviewed head", () => {
  assert.equal(code((f) => { f.observations.parentShas[1] = sha("9"); }, "merge"), "WRONG_MERGE_SECOND_PARENT");
});
test("missing check source policy is insufficient even if observed check field is missing too", () => {
  assert.equal(code((f) => { delete f.policy.checkAppId; delete f.observations.checks[0].appId; }), "UNTRUSTED_CHECK_POLICY_SOURCE");
  assert.equal(code((f) => { delete f.policy.workflowPath; delete f.observations.checks[0].workflowPath; }), "UNTRUSTED_CHECK_POLICY_SOURCE");
  assert.equal(code((f) => { f.policy.checkAppId = 0; }), "UNTRUSTED_CHECK_POLICY_SOURCE");
});
test("first parent mismatch stops for squash", () => {
  assert.equal(code((f) => { f.observations.parentShas = [sha("9")]; }), "WRONG_PRE_INTEGRATION_PARENT");
});
test("multi-commit rebase requires complete landing range proof", () => {
  assert.equal(code((f) => {}, "rebase"), "REBASE_LANDING_RANGE_UNPROVEN");
  const a = fixture("rebase");
  a.observations.rebaseRangeProven = true;
  a.observations.integratedChange.rangeProven = true;
  // Even a simulated asserted proof never creates a trusted PASS.
  assert.equal(evaluateOffline(a).state, "SHADOW_EVIDENCE_READY");
});
test("rebase requires a nonempty, single-parent Git graph even with claimed range proof", () => {
  const proven = (f) => {
    f.observations.rebaseRangeProven = true;
    f.observations.integratedChange.rangeProven = true;
  };
  assert.equal(code((f) => { proven(f); f.observations.parentShas = []; }, "rebase"), "MISSING_GIT_GRAPH");
  assert.equal(code((f) => { proven(f); f.observations.parentShas = [sha("3"), sha("4")]; }, "rebase"), "INCONSISTENT_PARENT_GRAPH");
  assert.equal(code((f) => { proven(f); f.observations.parentShas = ["not-a-sha"]; }, "rebase"), "MISSING_GIT_GRAPH");
  assert.equal(decide((f) => { proven(f); }, "rebase").state, "SHADOW_EVIDENCE_READY");
});
test("truncated authored or integrated diffs fail closed", () => {
  assert.equal(code((f) => { f.observations.authoredChange.complete = false; }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => { f.observations.integratedChange.complete = false; }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("wrong range and missing binary identity fail closed", () => {
  assert.equal(code((f) => { f.observations.integratedChange.fromSha = sha("9"); }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [file("assets/figure.bin", "nontext")];
    f.observations.integratedChange.files = [file("assets/figure.bin", "nontext")];
  }), "SIMULATED_PREREQUISITES_ONLY");
  assert.equal(code((f) => {
    f.observations.integratedChange.files = [file("assets/figure.bin", "nontext")];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => { f.observations.integratedChange.files = [{ path: "figure.bin", kind: "nontext", status: "modified" }]; }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("ordinary merge cannot land unrelated or conflict-resolution content without reconciliation", () => {
  const mismatch = (change) => code((f) => { change(f); }, "merge");
  assert.equal(mismatch((f) => {
    f.observations.integratedChange.files = [file("src/unrelated.ts")];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(mismatch((f) => {
    f.observations.integratedChange.files[0].patchDigest = digest("f");
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(mismatch((f) => {
    f.observations.integratedChange.files[0].status = "added";
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(mismatch((f) => {
    f.observations.authoredChange.files = [file("src/reviewed.ts")];
    f.observations.integratedChange.files = [
      file("src/reviewed.ts"), file("src/resolution.ts"),
    ];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(mismatch((f) => {
    f.observations.authoredChange.files = [file("assets/figure.bin", "nontext")];
    f.observations.integratedChange.files = [{
      ...file("assets/figure.bin", "nontext"), objectDigest: digest("e"),
    }];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  const renamed = (origin) => ({
    ...file("src/new-name.ts"), status: "renamed", previousPath: origin,
  });
  assert.equal(mismatch((f) => {
    f.observations.authoredChange.files = [renamed("src/old-name.ts")];
    f.observations.integratedChange.files = [renamed("src/unrelated.ts")];
  }), "LANDED_CHANGE_NOT_RECONCILED");
});
test("ordinary merge matching descriptors remain mock-replayable regardless of file order", () => {
  const f = fixture("merge");
  f.observations.authoredChange.files = [
    file("src/one.ts"), file("assets/icon.bin", "nontext"),
  ];
  f.observations.integratedChange.files = [
    file("assets/icon.bin", "nontext"), file("src/one.ts"),
  ];
  const ready = evaluateOffline(f);
  assert.equal(ready.state, "SHADOW_EVIDENCE_READY");
  assert.equal(ready.envelope.authenticated, false);
  const review = reviewWithMock(structuredClone(ready), {
    manifestDigest: ready.envelope.manifestDigest, verdict: "PASS",
  });
  assert.equal(review.state, "SHADOW_REVIEW_RECORDED");
  assert.equal(review.canApprove, false);
  assert.equal(review.canWrite, false);
  assert.equal(review.canDispatch, false);
});
test("squash and rebase must not silently land unrelated changes", () => {
  assert.equal(code((f) => {
    f.observations.integratedChange.files = [file("src/unrelated.ts")];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => {
    f.observations.integratedChange.files[0].patchDigest = digest("e");
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => {
    f.observations.integratedChange.files[0].status = "added";
  }), "LANDED_CHANGE_NOT_RECONCILED");
  const prove = (f) => {
    f.observations.rebaseRangeProven = true;
    f.observations.integratedChange.rangeProven = true;
  };
  assert.equal(code((f) => {
    prove(f);
    f.observations.authoredChange.files = [file("src/reviewed.ts")];
    f.observations.integratedChange.files = [file("src/unrelated.ts")];
  }, "rebase"), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => {
    prove(f);
    f.observations.integratedChange.files[0].patchDigest = digest("f");
  }, "rebase"), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => {
    prove(f);
    f.observations.authoredChange.files = [
      file("src/a.ts"), file("src/b.ts"),
    ];
    f.observations.integratedChange.files = [
      file("src/b.ts"), file("src/a.ts"),
    ];
  }, "rebase"), "SIMULATED_PREREQUISITES_ONLY");
});
test("rename provenance and duplicate landed paths are conservatively checked", () => {
  const rename = (previousPath) => ({
    ...file("src/renamed.ts"), previousPath, status: "renamed",
  });
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [rename("src/original.ts")];
    f.observations.integratedChange.files = [rename("src/unrelated.ts")];
  }), "LANDED_CHANGE_NOT_RECONCILED");
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [file("src/one.ts"), file("src/two.ts")];
    f.observations.integratedChange.files = [file("src/one.ts"), file("src/one.ts")];
  }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("hidden tool settings including .npmrc cannot neutralize required Verify", () => {
  for (const path of [
    ".npmrc", "packages/app/.npmrc", ".yarnrc.yml", ".nvmrc",
    ".config/npm/npmrc", ".env", ".pnpmfile.cjs", "nested/.tools/runner.toml",
  ]) {
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [file(path)];
      f.observations.integratedChange.files = [file(path)];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [{
        ...file("src/moved-config.ts"), status: "renamed", previousPath: path,
      }];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [file("src/component.ts")];
    f.observations.integratedChange.files = [file("src/component.ts")];
  }), "SIMULATED_PREREQUISITES_ONLY");
});
test("Verify tool configs and TypeScript project variants require a separate pre-merge gate", () => {
  for (const path of [
    "vite.config.ts", "vitest.config.ts", "eslint.config.js",
    "tsconfig.json", "tsconfig.node.json", "tsconfig.build.json",
    "nested/vite.config.ts", "packages/app/eslint.config.mjs",
    "packages/app/tsconfig.test.json", ".eslintrc", "nested/.eslintrc.json",
    "postcss.config.cjs", "playwright.config.ts",
  ]) {
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [file(path)];
      f.observations.integratedChange.files = [file(path)];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [{
        ...file("src/moved.ts"), status: "renamed", previousPath: path,
      }];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [file("src/component.test.ts")];
    f.observations.integratedChange.files = [file("src/component.test.ts")];
  }), "SIMULATED_PREREQUISITES_ONLY");
});
test("CI package scripts and script entry points require protected review", () => {
  for (const path of [
    "package.json", "packages/secondary/package.json", "package-lock.json",
    "npm-shrinkwrap.json", "pnpm-lock.yaml", "yarn.lock", "scripts/verify.mjs",
  ]) {
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [file(path)];
      f.observations.integratedChange.files = [file(path)];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [{
        ...file("src/renamed-script.ts"), status: "renamed", previousPath: path,
      }];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
});
test("duplicate rename sources fail closed even with unique destinations", () => {
  const descriptors = [
    { ...file("src/a.ts"), status: "renamed", previousPath: "src/original.ts" },
    { ...file("src/b.ts"), status: "renamed", previousPath: "src/original.ts" },
  ];
  assert.equal(code((f) => {
    f.observations.authoredChange.files = descriptors;
    f.observations.integratedChange.files = descriptors;
  }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [
      { ...file("src/a.ts"), status: "renamed", previousPath: "src/original.ts" },
      { ...file("src/b.ts"), status: "renamed", previousPath: "src/other.ts" },
    ];
    f.observations.integratedChange.files = [
      { ...file("src/a.ts"), status: "renamed", previousPath: "src/original.ts" },
      { ...file("src/b.ts"), status: "renamed", previousPath: "src/other.ts" },
    ];
  }), "SIMULATED_PREREQUISITES_ONLY");
});
test("privileged policy/workflow paths require separate premerge gate", () => {
  for (const path of [".github/workflows/ci.yml", "AGENTS.md", "terraform/roles.tf", "docs/methodology/agentic-development-governance.md"]) {
    assert.equal(code((f) => { f.observations.integratedChange.files = [file(path)]; }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
});
test("authored-only security path also demands the pre-merge gate", () => {
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [file(".github/workflows/ci.yml")];
    f.observations.integratedChange.files = [file("src/domain/types.ts")];
  }), "PREMERGE_SECURITY_GATE_UNATTESTED");
});
test("renames classify BOTH old and new paths, and missing old path is insufficient", () => {
  assert.equal(code((f) => {
    f.observations.integratedChange.files = [{
      ...file("src/safe.ts"), status: "renamed", previousPath: ".github/workflows/ci.yml",
    }];
  }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  assert.equal(code((f) => {
    f.observations.authoredChange.files = [{
      ...file("src/safe.ts"), status: "renamed", previousPath: "security/roles.ts",
    }];
  }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  assert.equal(code((f) => {
    f.observations.integratedChange.files = [{ ...file("src/safe.ts"), status: "renamed" }];
  }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("missing identities and nonpositive check run IDs fail closed", () => {
  assert.equal(code((f) => { f.policy.issueId = null; f.observations.issue.id = null; f.observations.issue.linkedIds = [null]; }), "AMBIGUOUS_OR_WRONG_LINEAR_ISSUE");
  assert.equal(code((f) => { f.observations.checks[0].runId = 0; }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  assert.equal(code((f) => { f.observations.checks[0].attempt = 0; }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
});
test("getter mutations, sparse arrays and exotic values never reach shadow ready", () => {
  const a = fixture();
  let getterCalls = 0;
  Object.defineProperty(a.capture, "producer", { enumerable: true, get() { getterCalls++; return "spoof"; } });
  assert.equal(evaluateOffline(a).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(getterCalls, 0);
  const b = fixture();
  b.observations.parentShas = new Array(1);
  assert.equal(evaluateOffline(b).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  const c = fixture();
  c.observations.issue = new Date();
  assert.equal(evaluateOffline(c).state, "SHADOW_INSUFFICIENT_EVIDENCE");
});
test("invalid mock envelope does not throw or claim PASS", () => {
  assert.equal(reviewWithMock({ state: "SHADOW_EVIDENCE_READY" }, { verdict: "PASS" }).state, "SHADOW_HOLD");
  assert.equal(reviewWithMock({ state: "SHADOW_EVIDENCE_READY", envelope: null }, null).state, "SHADOW_HOLD");
  const a = evaluateOffline(fixture());
  const bad = {};
  Object.defineProperty(bad, "verdict", { enumerable: true, get() { throw new Error("should not run"); } });
  assert.equal(reviewWithMock(a, bad).state, "SHADOW_HOLD");
});
test("nested agent instructions cannot evade pre-merge policy classification", () => {
  assert.equal(code((f) => { f.observations.authoredChange.files = [file("tools/AGENTS.md")]; }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  assert.equal(code((f) => { f.observations.integratedChange.files = [file("nested/config/AGENTS.md")]; }), "PREMERGE_SECURITY_GATE_UNATTESTED");
});
test("ambiguous leading-dot or backslash paths cannot evade sensitive-path checks", () => {
  assert.equal(code((f) => { f.observations.integratedChange.files = [file("./.github/workflows/ci.yml")]; }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => { f.observations.authoredChange.files = [{ ...file("src/new.ts"), status: "renamed", previousPath: "./.github/workflows/ci.yml" }]; }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => { f.observations.integratedChange.files = [file("src\\file.ts")]; }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("workflow path traversal is rejected as untrusted provenance", () => {
  assert.equal(code((f) => {
    f.policy.workflowPath = ".github/workflows/../untrusted.yml";
    f.observations.checks[0].workflowPath = ".github/workflows/../untrusted.yml";
  }), "UNTRUSTED_CHECK_POLICY_SOURCE");
});
test("workflow provenance accepts only direct .yml/.yaml workflow files", () => {
  for (const path of [
    ".github/workflows/noop.txt", ".github/workflows/readme.md",
    ".github/workflows/nested/verify.yml", ".github/workflows/ci.json",
  ]) {
    assert.equal(code((f) => {
      f.policy.workflowPath = path;
      f.observations.checks[0].workflowPath = path;
    }), "UNTRUSTED_CHECK_POLICY_SOURCE");
  }
  assert.equal(code((f) => {
    f.policy.workflowPath = ".github/workflows/verify.yaml";
    f.observations.checks[0].workflowPath = ".github/workflows/verify.yaml";
    f.capture.reads[1].checkRuns[0].workflowPath = ".github/workflows/verify.yaml";
    f.capture.reads[4].checkRuns[0].workflowPath = ".github/workflows/verify.yaml";
  }), "SIMULATED_PREREQUISITES_ONLY");
});
test("array-wrapped hashes and digests cannot pass string validation", () => {
  assert.equal(code((f) => { f.policy.policySha = [sha("5")]; }), "UNPINNED_GIT_OR_POLICY");
  assert.equal(code((f) => { f.observations.parentShas = [[sha("3")]]; }), "MISSING_GIT_GRAPH");
  assert.equal(code((f) => { f.observations.authoredChange.files[0].patchDigest = [digest("a")]; }), "INCOMPLETE_OR_WRONG_DIFF");
  assert.equal(code((f) => { f.observations.integratedChange.files = [{ ...file("assets/image.bin", "nontext"), objectDigest: [digest("b")] }]; }), "INCOMPLETE_OR_WRONG_DIFF");
});
test("required check identities must be nonempty, configured names", () => {
  assert.equal(code((f) => { f.policy.requiredChecks = [""]; f.observations.checks[0].name = ""; }), "REQUIRED_CHECK_POLICY_MISSING");
  assert.equal(code((f) => { f.policy.requiredChecks = ["   "]; f.observations.checks[0].name = "   "; }), "REQUIRED_CHECK_POLICY_MISSING");
});
test("ambiguous issue correlation is HOLD", () => {
  assert.equal(code((f) => { f.observations.issue.linkedIds.push("S-42"); }), "AMBIGUOUS_OR_WRONG_LINEAR_ISSUE");
  assert.equal(code((f) => { f.observations.issue.linkedIds = ["S-44"]; }), "AMBIGUOUS_OR_WRONG_LINEAR_ISSUE");
});
test("non-verification issue and incomplete blockers stop", () => {
  assert.equal(code((f) => { f.observations.issue.status = "Done"; }), "ISSUE_NOT_ACCEPTANCE_ELIGIBLE");
  assert.equal(code((f) => { f.observations.issue.blockersComplete = false; }), "ISSUE_NOT_ACCEPTANCE_ELIGIBLE");
});
test("exact integrated SHA, source app, workflow revision, status required", () => {
  assert.equal(code((f) => { f.observations.checks[0].sha = sha("1"); }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  assert.equal(code((f) => { f.observations.checks[0].appId = 11; }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  assert.equal(code((f) => { f.observations.checks[0].workflowRevision = sha("a"); }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  assert.equal(code((f) => { f.observations.checks[0].status = "queued"; }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  assert.equal(code((f) => { f.observations.checks[0].conclusion = "neutral"; }), "CI_PROVENANCE_OR_RESULT_MISMATCH");
});
test("duplicate or missing required check is HOLD", () => {
  assert.equal(code((f) => { f.observations.checks.push(clone(f.observations.checks[0])); }), "MISSING_OR_DUPLICATE_REQUIRED_CHECK");
  assert.equal(code((f) => { f.observations.checks = []; }), "MISSING_OR_DUPLICATE_REQUIRED_CHECK");
});
test("policy without required check definition is insufficient", () => {
  assert.equal(code((f) => { f.policy.requiredChecks = []; }), "REQUIRED_CHECK_POLICY_MISSING");
});
test("unresolved code-review thread blocks", () => {
  assert.equal(code((f) => { f.observations.unresolvedThreads = ["T1"]; }), "UNRESOLVED_REVIEW_THREADS");
});
test("capture timestamp must be a string and must parse as a date", () => {
  for (const timestamp of [
    [0], ["2026-10-21T00:00:00Z"], 0, 20261021, false, null,
    { toString: "2026-10-21T00:00:00Z" }, "not-a-date",
    "0", "2026-10-21", "10/21/2026", "2026-10-21 00:00:00Z",
    "2026-10-21T00:00:00", "2026-02-30T00:00:00Z",
    "2026-10-21T24:00:00Z", "2026-10-21T00:00:60Z",
    "2026-10-21T00:00:00+24:00", "2026-10-21T00:00:00+00:60",
  ]) {
    const f = fixture();
    f.capture.capturedAt = timestamp;
    const result = evaluateOffline(f);
    assert.equal(result.state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(result.code, "CAPTURE_NOT_ATTESTED");
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
    assert.equal(result.canDispatch, false);
  }
  const valid = evaluateOffline(fixture());
  assert.equal(valid.state, "SHADOW_EVIDENCE_READY");
  assert.equal(typeof valid.envelope.manifest.capture.capturedAt, "string");
  // Valid RFC3339 alone must never imply freshness/completeness.
  for (const timestamp of [
    "2024-02-29T23:59:59Z", "2026-10-21T00:00:00.123Z",
    "2026-10-21T12:30:59+05:30", "2026-10-21T12:30:59-04:00",
  ]) {
    const f = fixture();
    f.capture.capturedAt = timestamp;
    assert.equal(evaluateOffline(f).code, "CAPTURE_STALE_OR_UNORDERED");
  }
});

test("independently discovered P2: year-2000 snapshot cannot report ready", () => {
  const f = fixture();
  f.capture.capturedAt = "2000-01-01T00:00:00Z";
  f.capture.reads.forEach((read) => { read.observedAt = "2000-01-01T00:00:00Z"; });
  const result = evaluateOffline(f);
  assert.equal(result.code, "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(result.state, "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(result.canWrite, false);
});

test("source claim missing, partial or disordered remains insufficient", () => {
  assert.equal(code((f) => { delete f.capture.reads; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[1].complete = false; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[2].sequence = 1; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[3].observedAt = at(60); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].observedAt = at(1); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[2].tipSha = sha("8"); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[1].checkRuns = []; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[1].checkRuns[0].runId = 123; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[1].checkRuns[0].attempt = 2; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRunCount = 0; }), "CAPTURE_STALE_OR_UNORDERED");
  // A final scan of the same cardinality is not evidence of same run.
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].runId = 401; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].attempt = 2; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].status = "queued"; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].conclusion = "failure"; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].appId = 999; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].sha = sha("9"); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].workflowRevision = sha("9"); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns[0].workflowPath = ".github/workflows/other.yml"; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].checkRuns = []; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { delete f.capture.reads[4].checkRuns; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { delete f.capture.reads[4].blockersComplete; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].blockersComplete = false; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[2].status = "In Progress"; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[3].unresolvedCount = 1; }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.reads[4].issueId = "S-33"; }), "CAPTURE_STALE_OR_UNORDERED");
});

test("P2 exact final source reread catches same-count run replacement and blocker regression", () => {
  for (const change of [
    (f) => { f.capture.reads[4].checkRuns[0].runId = 500; },
    (f) => { f.capture.reads[4].checkRuns[0].attempt = 3; },
    (f) => { f.capture.reads[4].checkRuns[0].conclusion = "failure"; },
    (f) => { f.capture.reads[4].blockersComplete = false; },
  ]) {
    const result = decide(change);
    assert.equal(result.state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(result.code, "CAPTURE_STALE_OR_UNORDERED");
    assert.equal(result.canDispatch, false);
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
  }
  const ready = evaluateOffline(fixture());
  assert.equal(ready.state, "SHADOW_EVIDENCE_READY");
  assert.equal(ready.envelope.authenticated, false);
});

test("P2 non-required runs must include complete check provenance in both scans", () => {
  const auxiliary = {
    name: "Optional audit", sha: sha("2"), appId: 15368,
    workflowRevision: sha("6"), workflowPath: ".github/workflows/optional.yml",
    runId: 601, attempt: 1, status: "completed", conclusion: "failure",
  };
  const addExtra = (f) => {
    f.observations.checks.push(clone(auxiliary));
    f.capture.reads[1].checkRuns.push(clone(auxiliary));
    f.capture.reads[4].checkRuns.push(clone(auxiliary));
    f.capture.reads[4].checkRunCount = 2;
  };
  // An OPTIONAL failed check is allowed as an observation; it is not a
  // substitute for the required successful Verify, and remains untrusted.
  const positive = decide(addExtra);
  assert.equal(positive.state, "SHADOW_EVIDENCE_READY");
  assert.equal(positive.canWrite, false);
  assert.equal(positive.canApprove, false);
  assert.equal(positive.canDispatch, false);
  for (const name of ["runId", "attempt", "status", "conclusion", "appId",
    "workflowPath", "workflowRevision", "sha", "name"]) {
    for (const omitFrom of ["all", "initial", "final"]) {
      const result = decide((f) => {
        addExtra(f);
        if (omitFrom === "all") {
          delete f.observations.checks[1][name];
          delete f.capture.reads[1].checkRuns[1][name];
          delete f.capture.reads[4].checkRuns[1][name];
        } else if (omitFrom === "initial") {
          delete f.capture.reads[1].checkRuns[1][name];
        } else {
          delete f.capture.reads[4].checkRuns[1][name];
        }
      });
      assert.equal(result.code, "CAPTURE_STALE_OR_UNORDERED", name + "/" + omitFrom);
      assert.equal(result.state, "SHADOW_INSUFFICIENT_EVIDENCE");
      assert.equal(result.canWrite, false);
      assert.equal(result.canApprove, false);
      assert.equal(result.canDispatch, false);
    }
  }
  // Explicit null conclusion is allowed for a pending auxiliary check;
  // omission is NOT equivalent to the valid explicit unknown result.
  const pending = decide((f) => {
    addExtra(f);
    for (const c of [
      f.observations.checks[1],
      f.capture.reads[1].checkRuns[1],
      f.capture.reads[4].checkRuns[1],
    ]) {
      c.status = "in_progress";
      c.conclusion = null;
    }
  });
  assert.equal(pending.state, "SHADOW_EVIDENCE_READY");
});

test("source claims older than five minutes or future dated cannot become ready", () => {
  assert.equal(code((f) => { f.capture.reads[0].observedAt = at(360); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.capturedAt = at(360); }), "CAPTURE_STALE_OR_UNORDERED");
  assert.equal(code((f) => { f.capture.capturedAt = new Date(testClock + 360000).toISOString(); }), "CAPTURE_STALE_OR_UNORDERED");
});

test("fresh self-consistent synthetic scan is still never a live approval", () => {
  const r = evaluateOffline(fixture());
  assert.equal(r.state, "SHADOW_EVIDENCE_READY");
  assert.equal(r.envelope.authenticated, false);
  assert.equal(r.envelope.manifest.sourceClass, "SYNTHETIC_UNATTESTED");
  assert.equal(r.canApprove, false);
  assert.equal(r.canDispatch, false);
  assert.equal(r.canWrite, false);
});

test("independently discovered P2: Proxy cannot execute reflective traps", () => {
  let traps = 0;
  const adversarial = (target) => new Proxy(target, {
    get(inner, key) { traps++; return Reflect.get(inner, key); },
    ownKeys(inner) { traps++; return Reflect.ownKeys(inner); },
    getPrototypeOf(inner) { traps++; return Reflect.getPrototypeOf(inner); },
    getOwnPropertyDescriptor(inner, key) {
      traps++;
      return Reflect.getOwnPropertyDescriptor(inner, key);
    },
  });
  const proxiedInput = adversarial(fixture());
  assert.equal(evaluateOffline(proxiedInput).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(traps, 0);
  const nested = fixture();
  nested.capture.reads[1].checkRuns[0] = adversarial(nested.capture.reads[1].checkRuns[0]);
  assert.equal(evaluateOffline(nested).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(traps, 0);
  assert.throws(() => evidenceDigest(adversarial({ safe: true })), TypeError);
  assert.equal(traps, 0);
  assert.equal(reviewWithMock(adversarial(evaluateOffline(fixture())), {
    verdict: "PASS",
  }).state, "SHADOW_HOLD");
  assert.equal(traps, 0);
  assert.equal(reviewWithMock(evaluateOffline(fixture()), adversarial({
    verdict: "PASS",
  })).state, "SHADOW_HOLD");
  assert.equal(traps, 0);
});


test("S-74 P2: monkey-patched shared util.types.isProxy cannot open proxy traps", () => {
  const original = types.isProxy;
  let traps = 0;
  const malicious = (target) => new Proxy(target, {
    getPrototypeOf(inner) { traps++; return Reflect.getPrototypeOf(inner); },
    ownKeys(inner) { traps++; return Reflect.ownKeys(inner); },
    getOwnPropertyDescriptor(inner, key) {
      traps++;
      return Reflect.getOwnPropertyDescriptor(inner, key);
    },
  });
  try {
    types.isProxy = () => false;
    assert.throws(() => evidenceDigest(malicious({ x: "safe-looking" })), TypeError);
    assert.equal(evaluateOffline(malicious(fixture())).state, "SHADOW_INSUFFICIENT_EVIDENCE");
    const nested = fixture();
    nested.capture.reads[4].checkRuns[0] = malicious(nested.capture.reads[4].checkRuns[0]);
    assert.equal(evaluateOffline(nested).state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(reviewWithMock(malicious(evaluateOffline(fixture())), {
      verdict: "PASS",
    }).state, "SHADOW_HOLD");
    assert.equal(reviewWithMock(evaluateOffline(fixture()), malicious({
      verdict: "PASS",
    })).state, "SHADOW_HOLD");
    const revoked = Proxy.revocable({ present: true }, {});
    revoked.revoke();
    assert.throws(() => evidenceDigest(revoked.proxy), TypeError);
    assert.equal(traps, 0);
  } finally {
    types.isProxy = original;
  }
});


test("S-74 P2: syncBuiltinESMExports cannot replace module-captured proxy guard", () => {
  const localRequire = createRequire(import.meta.url);
  const liveTypes = localRequire("node:util/types");
  const original = liveTypes.isProxy;
  let traps = 0;
  const proxy = new Proxy({ innocent: true }, {
    getPrototypeOf(obj) { traps++; return Reflect.getPrototypeOf(obj); },
    ownKeys(obj) { traps++; return Reflect.ownKeys(obj); },
    getOwnPropertyDescriptor(obj, key) {
      traps++;
      return Reflect.getOwnPropertyDescriptor(obj, key);
    },
  });
  try {
    liveTypes.isProxy = () => false;
    syncBuiltinESMExports();
    assert.throws(() => evidenceDigest(proxy), TypeError);
    const nested = fixture();
    nested.capture.reads[4].checkRuns[0] = proxy;
    assert.equal(evaluateOffline(nested).state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(reviewWithMock(proxy, { verdict: "PASS" }).state, "SHADOW_HOLD");
    assert.equal(traps, 0);
  } finally {
    liveTypes.isProxy = original;
    syncBuiltinESMExports();
  }
});

test("S-74 P2: later mutated toLowerCase cannot spoof CI execution identities", () => {
  const original = String.prototype.toLowerCase;
  let invocations = 0;
  const aux = {
    name: "Auxiliary", sha: sha("2"), appId: 15368,
    runId: 601, attempt: 1, workflowRevision: sha("6"),
    workflowPath: ".github/workflows/optional.yml",
    status: "completed", conclusion: "success",
  };
  try {
    String.prototype.toLowerCase = function (...args) {
      invocations++;
      if (String(this) === "Auxiliary") return "auxiliary-" + invocations;
      return original.apply(this, args);
    };
    const doubled = decide((f) => {
      for (const run of [aux, aux]) {
        f.observations.checks.push(clone(run));
        f.capture.reads[1].checkRuns.push(clone(run));
        f.capture.reads[4].checkRuns.push(clone(run));
      }
      f.capture.reads[4].checkRunCount = 3;
    });
    assert.equal(doubled.code, "CAPTURE_STALE_OR_UNORDERED");
    assert.equal(doubled.state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(doubled.canApprove, false);
    assert.equal(doubled.canDispatch, false);
    assert.equal(doubled.canWrite, false);
    assert.equal(invocations, 0, "mutable prototype normalizer must not execute");

    const valid = evaluateOffline(fixture());
    assert.equal(valid.state, "SHADOW_EVIDENCE_READY");
    assert.equal(valid.canApprove, false);
    assert.equal(valid.canDispatch, false);
    assert.equal(valid.canWrite, false);
    assert.equal(invocations, 0);
  } finally {
    String.prototype.toLowerCase = original;
  }
});

test("S-74 P2: duplicate or conflicting complete check executions cannot claim ready", () => {
  const additional = {
    name: "Auxiliary", sha: sha("2"), appId: 15368, runId: 601,
    attempt: 1, workflowRevision: sha("6"),
    workflowPath: ".github/workflows/optional.yml",
    status: "completed", conclusion: "failure",
  };
  const withExtra = (f, records) => {
    for (const run of records) {
      f.observations.checks.push(clone(run));
      f.capture.reads[1].checkRuns.push(clone(run));
      f.capture.reads[4].checkRuns.push(clone(run));
    }
    f.capture.reads[4].checkRunCount = f.observations.checks.length;
  };
  assert.equal(code((f) => withExtra(f, [additional])), "SIMULATED_PREREQUISITES_ONLY");
  for (const edit of [
    (x) => x,
    (x) => ({ ...x, conclusion: "success" }),
    (x) => ({ ...x, name: "auxiliary" }), // normalized case is not a new execution
    (x) => ({ ...x, sha: sha("9") }), // changed claimed SHA is not a new run
    (x) => ({ ...x, workflowPath: ".github/workflows/other.yml" }),
  ]) {
    const result = decide((f) => {
      withExtra(f, [additional, edit(additional)]);
    });
    assert.equal(result.code, "CAPTURE_STALE_OR_UNORDERED");
    assert.equal(result.state, "SHADOW_INSUFFICIENT_EVIDENCE");
    assert.equal(result.canApprove, false);
    assert.equal(result.canDispatch, false);
    assert.equal(result.canWrite, false);
  }
  for (const records of [
    [{...additional,runId:602},additional],
    [{...additional,attempt:2},additional],
    [{...additional,name:"Different job"},additional],
  ]) {
    assert.equal(decide((f) => withExtra(f, records)).state,
      "SHADOW_EVIDENCE_READY");
  }
  // A duplicated REQUIRED Verify is denied by the earlier required-check
  // uniqueness policy (SHADOW_HOLD), before the generic complete scan runs.
  const requiredDuplicate = decide((f) => {
    const required = clone(f.observations.checks[0]);
    withExtra(f, [required]);
  });
  assert.equal(requiredDuplicate.state, "SHADOW_HOLD");
  assert.equal(requiredDuplicate.canApprove, false);
  assert.equal(requiredDuplicate.canWrite, false);
  assert.equal(requiredDuplicate.canDispatch, false);
});

test("unattested source and malformed inputs fail closed", () => {
  assert.equal(state((f) => { f.capture.source = "github-live"; }), "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(evaluateOffline(null).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  assert.equal(state((f) => { f.capture.extra = undefined; }), "SHADOW_INSUFFICIENT_EVIDENCE");
});
test("mock verifier rehashes cloned evidence and work key before recording verdicts", () => {
  const ready = evaluateOffline(fixture());
  const cleanCopy = structuredClone(ready);
  const proposal = { manifestDigest: ready.envelope.manifestDigest, verdict: "PASS" };
  assert.equal(reviewWithMock(cleanCopy, proposal).state, "SHADOW_REVIEW_RECORDED");

  const tampered = structuredClone(ready);
  tampered.envelope.manifest.observations.issue.status = "Done";
  const rejection = reviewWithMock(tampered, proposal);
  assert.equal(rejection.state, "SHADOW_HOLD");
  assert.equal(rejection.code, "MOCK_ENVELOPE_DIGEST_MISMATCH");
  assert.equal(rejection.canApprove, false);
  assert.equal(rejection.canWrite, false);
  assert.equal(rejection.canDispatch, false);

  const wrongWorkKey = structuredClone(ready);
  wrongWorkKey.envelope.workKey = digest("e");
  assert.equal(reviewWithMock(wrongWorkKey, proposal).code, "MOCK_ENVELOPE_DIGEST_MISMATCH");

  const corruptedObject = structuredClone(ready);
  corruptedObject.envelope.manifest.objectDigests.event = digest("f");
  corruptedObject.envelope.manifestDigest = evidenceDigest(corruptedObject.envelope.manifest);
  assert.equal(reviewWithMock(corruptedObject, {
    manifestDigest: corruptedObject.envelope.manifestDigest, verdict: "PASS",
  }).code, "MOCK_ENVELOPE_DIGEST_MISMATCH");

  const omitted = structuredClone(ready);
  delete omitted.envelope.manifest.event.repositoryId;
  assert.equal(reviewWithMock(omitted, proposal).state, "SHADOW_HOLD");
});

test("fully rehashed but semantically invalid mock evidence is still denied", () => {
  const ready = evaluateOffline(fixture());
  const forged = structuredClone(ready);
  const m = forged.envelope.manifest;
  // An adversary can recompute all public digests after changing the issue.
  m.observations.issue.status = "Done";
  m.objectDigests.observations = evidenceDigest(m.observations);
  forged.envelope.manifestDigest = evidenceDigest(m);
  forged.envelope.workKey = evidenceDigest({
    repo: m.event.repositoryId, pr: m.event.prNumber,
    head: m.observations.reviewedHead, tip: m.observations.integratedTip,
    issue: m.policy.issueId, policy: m.policy.policySha,
    envelope: forged.envelope.manifestDigest,
  });
  const result = reviewWithMock(forged, {
    manifestDigest: forged.envelope.manifestDigest, verdict: "PASS",
  });
  assert.equal(result.state, "SHADOW_HOLD");
  assert.equal(result.code, "MOCK_ENVELOPE_SEMANTICS_INVALID");
  assert.equal(result.canDispatch, false);
  assert.equal(result.canApprove, false);
  assert.equal(result.canWrite, false);

  const changedCheck = structuredClone(ready);
  const n = changedCheck.envelope.manifest;
  n.observations.checks[0].conclusion = "failure";
  n.objectDigests.observations = evidenceDigest(n.observations);
  changedCheck.envelope.manifestDigest = evidenceDigest(n);
  changedCheck.envelope.workKey = evidenceDigest({
    repo: n.event.repositoryId, pr: n.event.prNumber,
    head: n.observations.reviewedHead, tip: n.observations.integratedTip,
    issue: n.policy.issueId, policy: n.policy.policySha,
    envelope: changedCheck.envelope.manifestDigest,
  });
  assert.equal(reviewWithMock(changedCheck, {
    manifestDigest: changedCheck.envelope.manifestDigest, verdict: "PASS",
  }).code, "MOCK_ENVELOPE_SEMANTICS_INVALID");

  // An intact serialized/rehydrated offline shadow is still acceptable.
  assert.equal(reviewWithMock(structuredClone(ready), {
    manifestDigest: ready.envelope.manifestDigest, verdict: "PASS",
  }).state, "SHADOW_REVIEW_RECORDED");
});

test("bounded nested evidence survives mock round trip without asymmetric depth rejection", () => {
  const f = fixture();
  let nested = { value: "leaf" };
  for (let i = 0; i < 23; i++) nested = { child: nested };
  f.capture.nested = nested;
  const ready = evaluateOffline(f);
  assert.equal(ready.state, "SHADOW_EVIDENCE_READY");
  const result = reviewWithMock(structuredClone(ready), {
    manifestDigest: ready.envelope.manifestDigest, verdict: "PASS",
  });
  assert.equal(result.state, "SHADOW_REVIEW_RECORDED");
  assert.equal(result.canWrite, false);

  let tooDeep = { value: "leaf" };
  for (let i = 0; i < 32; i++) tooDeep = { child: tooDeep };
  const invalid = fixture();
  invalid.capture.nested = tooDeep;
  assert.equal(evaluateOffline(invalid).state, "SHADOW_INSUFFICIENT_EVIDENCE");
});
test("shared-reference DAG cannot expand beyond copy-node budget", () => {
  const f = fixture();
  let shared = { value: "leaf" };
  for (let i = 0; i < 21; i++) shared = { a: shared, b: shared };
  f.capture.nested = shared;
  assert.equal(evaluateOffline(f).state, "SHADOW_INSUFFICIENT_EVIDENCE");

  const oversize = fixture();
  oversize.capture.payload = "x".repeat(1048577);
  assert.equal(evaluateOffline(oversize).state, "SHADOW_INSUFFICIENT_EVIDENCE");
});
test("active Phase 014 and future phase authorization records always HOLD", () => {
  for (const path of [
    "docs/phases/014/014-b-c01-backbone-security-deployment-authority.md",
    "docs/phases/014/phase-definition.md",
    "docs/phases/015/015-a-future-authority.md",
  ]) {
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [file(path)];
      f.observations.integratedChange.files = [file(path)];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [{
        ...file("src/moved.txt"), status: "renamed", previousPath: path,
      }];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
});
test("large UTF-8 object keys consume the same byte budget as values", () => {
  const f = fixture();
  f.capture["é".repeat(540000)] = "";
  assert.equal(evaluateOffline(f).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  const g = fixture();
  for (let i = 0; i < 800; i++) {
    g.capture["n" + i + "_" + "𓀀".repeat(260)] = "";
  }
  assert.equal(evaluateOffline(g).state, "SHADOW_INSUFFICIENT_EVIDENCE");
  // Small Unicode keys are supported, bounded and deterministic.
  const valid = fixture();
  valid.capture["évidence🦊"] = "tiny";
  assert.equal(evaluateOffline(valid).state, "SHADOW_EVIDENCE_READY");
});
test("near-limit accepted fixture round-trips; oversized node input refuses READY", () => {
  const accepted = fixture();
  for (let i = 0; i < 3820; i++) accepted.capture["padding" + i] = i;
  const ready = evaluateOffline(accepted);
  assert.equal(ready.state, "SHADOW_EVIDENCE_READY");
  assert.equal(reviewWithMock(structuredClone(ready), {
    manifestDigest: ready.envelope.manifestDigest,
    verdict: "PASS",
  }).state, "SHADOW_REVIEW_RECORDED");

  const oversized = fixture();
  for (let i = 0; i < 4300; i++) oversized.capture["padding" + i] = i;
  assert.equal(evaluateOffline(oversized).state, "SHADOW_INSUFFICIENT_EVIDENCE");
});
test("Claude instructions and independent review methodology are policy-sensitive", () => {
  for (const path of [
    "CLAUDE.md", "nested/CLAUDE.md",
    "docs/phases/013/013-f-agentic-independent-test-control.md",
    "docs/methodology/other-policy.md",
    "tools/shadow/controller.mjs",
  ]) {
    assert.equal(code((f) => {
      f.observations.authoredChange.files = [file(path)];
    }), "PREMERGE_SECURITY_GATE_UNATTESTED");
  }
});
test("mock PASS remains untrusted, never grants status writes", () => {
  const ready = evaluateOffline(fixture());
  const result = reviewWithMock(ready, { manifestDigest: ready.envelope.manifestDigest, verdict: "PASS" });
  assert.equal(result.state, "SHADOW_REVIEW_RECORDED");
  assert.equal(result.detail, "PASS");
  assert.equal(result.envelope.manifestDigest, ready.envelope.manifestDigest);
  assert.equal(result.envelope.workKey, ready.envelope.workKey);
  assert.equal(result.envelope.authenticated, false);
  const other = evaluateOffline(fixture("merge"));
  const second = reviewWithMock(other, { manifestDigest: other.envelope.manifestDigest, verdict: "PASS" });
  assert.notEqual(result.envelope.manifestDigest, second.envelope.manifestDigest);
  assert.equal(result.canWrite, false);
  assert.equal(result.canDispatch, false);
  assert.equal(result.canApprove, false);
  assert.equal(reviewWithMock(ready, { manifestDigest: digest("d"), verdict: "PASS" }).state, "SHADOW_HOLD");
  assert.equal(reviewWithMock(ready, { manifestDigest: ready.envelope.manifestDigest, verdict: "APPROVED" }).state, "SHADOW_HOLD");
});


test("S-74 P2: inherited array toJSON cannot spoof duplicate CI identities", () => {
  const original = Object.getOwnPropertyDescriptor(Array.prototype, "toJSON");
  let calls = 0;
  try {
    Object.defineProperty(Array.prototype, "toJSON", { configurable: true, value() { calls++; return String(calls); } });
    const extra = { name: "Auxiliary", sha: sha("2"), appId: 15368, runId: 601,
      attempt: 1, workflowRevision: sha("6"), workflowPath: ".github/workflows/optional.yml",
      status: "completed", conclusion: "success" };
    const result = decide((f) => {
      for (const run of [extra, extra]) {
        f.observations.checks.push(clone(run));
        f.capture.reads[1].checkRuns.push(clone(run));
        f.capture.reads[4].checkRuns.push(clone(run));
      }
      f.capture.reads[4].checkRunCount = 3;
    });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
    assert.equal(result.canDispatch, false);
  } finally {
    if (original) Object.defineProperty(Array.prototype, "toJSON", original);
    else delete Array.prototype.toJSON;
  }
});

test("S-74: mutated push cannot rewrite copied evidence", () => {
  const original = Array.prototype.push;
  try {
    Array.prototype.push = function(value) { if (typeof value === "string") return this.length; return Reflect.apply(original, this, [value]); };
    const result = decide((f) => { f.observations.integratedChange.files[0].path = "src/different.ts"; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Array.prototype.push = original; }
});

test("S-74: inherited numeric setter cannot drop copied unresolved evidence", () => {
  const original = Object.getOwnPropertyDescriptor(Array.prototype, "0");
  try {
    Object.defineProperty(Array.prototype, "0", { configurable: true, set() {} });
    const result = decide((f) => { f.observations.unresolvedThreads = [{ id: 99 }]; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally {
    if (original) Object.defineProperty(Array.prototype, "0", original);
    else delete Array.prototype[0];
  }
});

test("S-74: mutable property definer cannot discard unresolved evidence", () => {
  const original = Object.defineProperty;
  try {
    Object.defineProperty = function(target, key, descriptor) {
      if (key === "unresolvedThreads" && target && !Object.hasOwn(target, "unresolvedThreads")) return target;
      return Reflect.apply(original, Object, [target, key, descriptor]);
    };
    const result = decide((f) => { f.observations.unresolvedThreads = [{ id: 99 }]; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Object.defineProperty = original; }
});

test("S-74: mutable regex matcher cannot bypass sensitive-path hold", () => {
  const original = RegExp.prototype.test;
  try {
    RegExp.prototype.test = function(value) {
      if (this.source.includes("github") && typeof value === "string") return false;
      return Reflect.apply(original, this, [value]);
    };
    const result = decide((f) => {
      f.observations.authoredChange.files = [file(".github/workflows/evil.yml")];
      f.observations.integratedChange.files = [file(".github/workflows/evil.yml")];
    });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { RegExp.prototype.test = original; }
});

test("S-74: post-import descriptor reader cannot hide unresolved threads", () => {
  const original = Object.getOwnPropertyDescriptor;
  try {
    Object.getOwnPropertyDescriptor = function(target, key) {
      const descriptor = Reflect.apply(original, Object, [target, key]);
      if (key === "unresolvedThreads" && descriptor && Array.isArray(descriptor.value))
        return { ...descriptor, value: [] };
      return descriptor;
    };
    const result = decide((f) => { f.observations.unresolvedThreads = [{ id: 99 }]; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Object.getOwnPropertyDescriptor = original; }
});

test("S-74: post-import array predicates cannot bypass sensitive path hold", () => {
  const original = Array.prototype.some;
  try {
    Array.prototype.some = function(predicate) {
      if (this.length && this[0] && this[0].path) return false;
      return Reflect.apply(original, this, [predicate]);
    };
    const result = decide((f) => {
      f.observations.authoredChange.files = [file(".github/workflows/evil.yml")];
      f.observations.integratedChange.files = [file(".github/workflows/evil.yml")];
    });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Array.prototype.some = original; }
});

test("S-74: mutated array iterator cannot suppress sensitive workflow files", () => {
  const original = Array.prototype[Symbol.iterator];
  const changed = (f) => {
    f.observations.authoredChange.files = [file(".github/workflows/evil.yml")];
    f.observations.integratedChange.files = [file(".github/workflows/evil.yml")];
  };
  assert.equal(code(changed), "PREMERGE_SECURITY_GATE_UNATTESTED");
  try {
    Array.prototype[Symbol.iterator] = function* () {
      if (this.length && this[0]?.path === ".github/workflows/evil.yml") return;
      yield* Reflect.apply(original, this, []);
    };
    const result = decide(changed);
    assert.equal(result.code, "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(result.canApprove, false);
  } finally { Array.prototype[Symbol.iterator] = original; }
});

test("S-74: mutated Date.now cannot make stale capture fresh", () => {
  const changed = (f) => {
    f.capture.capturedAt = at(3600);
    for (let i = 0; i < f.capture.reads.length; i++)
      f.capture.reads[i].observedAt = at(3604 - i);
  };
  assert.equal(code(changed), "CAPTURE_STALE_OR_UNORDERED");
  const original = Date.now;
  try {
    Date.now = () => testClock - 3600 * 1000;
    const result = decide(changed);
    assert.equal(result.code, "CAPTURE_STALE_OR_UNORDERED");
    assert.equal(result.canApprove, false);
  } finally { Date.now = original; }
});

test("S-74: mutated Date.parse cannot reclassify invalid timestamp", () => {
  const changed = (f) => { f.capture.capturedAt = "not-a-date"; };
  assert.notEqual(state(changed), "SHADOW_EVIDENCE_READY");
  const original = Date.parse;
  try {
    Date.parse = () => testClock;
    const result = decide(changed);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Date.parse = original; }
});

test("S-74: mutable required-check iterator cannot suppress failed Verify", () => {
  const original = Array.prototype[Symbol.iterator];
  const changed = (f) => { f.observations.checks[0].conclusion = "failure"; };
  assert.equal(code(changed), "CI_PROVENANCE_OR_RESULT_MISMATCH");
  let visits = 0;
  try {
    Array.prototype[Symbol.iterator] = function* () {
      if (this.length === 1 && this[0] === "Verify") {
        visits++;
        if (visits > 1) return;
      }
      yield* Reflect.apply(original, this, []);
    };
    const result = decide(changed);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Array.prototype[Symbol.iterator] = original; }
});

test("S-74: mutated RegExp.exec cannot bypass sensitive path hold", () => {
  const original = RegExp.prototype.exec;
  const changed = (f) => {
    f.observations.authoredChange.files = [file(".github/workflows/evil.yml")];
    f.observations.integratedChange.files = [file(".github/workflows/evil.yml")];
  };
  assert.equal(code(changed), "PREMERGE_SECURITY_GATE_UNATTESTED");
  try {
    RegExp.prototype.exec = function(value) {
      if (value === ".github/workflows/evil.yml") return null;
      return Reflect.apply(original, this, [value]);
    };
    const result = decide(changed);
    assert.equal(result.code, "PREMERGE_SECURITY_GATE_UNATTESTED");
    assert.equal(result.canApprove, false);
  } finally { RegExp.prototype.exec = original; }
});

test("S-74: numeric validator mutation cannot authorize fractional repository identity", () => {
  const original = Number.isSafeInteger;
  try {
    Number.isSafeInteger = () => true;
    const result = decide((f) => { f.event.repositoryId = 1.5; f.policy.repositoryId = 1.5; f.observations.repositoryId = 1.5; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Number.isSafeInteger = original; }
});

test("S-74: mutable set input iterator cannot hide duplicate required checks", () => {
  const original = Array.prototype[Symbol.iterator];
  try {
    Array.prototype[Symbol.iterator] = function* () {
      if (this.length === 2 && this[0] === "Verify" && this[1] === "Verify") {
        yield "Verify"; yield "Other"; return;
      }
      yield* Reflect.apply(original, this, []);
    };
    const result = decide((f) => { f.policy.requiredChecks = ["Verify", "Verify"]; });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Array.prototype[Symbol.iterator] = original; }
});

test("S-74: mutable array species cannot hide a duplicate required check", () => {
  const original = Object.getOwnPropertyDescriptor(Array, Symbol.species);
  try {
    Object.defineProperty(Array, Symbol.species, { configurable: true, get: () => function() { return {length: 1}; } });
    const result = decide((f) => {
      const check = f.observations.checks[0];
      f.observations.checks.push({ ...check, conclusion: "failure" });
    });
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
  } finally { if (original) Object.defineProperty(Array, Symbol.species, original); else delete Array[Symbol.species]; }
});

test("S-74: live Object.create cannot inject inherited capture source", () => {
  const input = fixture();
  delete input.capture.source;
  const originalCreate = Object.create;
  const prior = Object.getOwnPropertyDescriptor(Object.prototype, "source");
  try {
    Object.create = () => ({});
    Object.defineProperty(Object.prototype, "source", {configurable: true, value: "synthetic-fixture"});
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally {
    Object.create = originalCreate;
    if (prior) Object.defineProperty(Object.prototype, "source", prior);
    else delete Object.prototype.source;
  }
});

test("S-74: mutated UTC calendar methods cannot normalize invalid dates", () => {
  const input = fixture();
  const methods = ["setUTCFullYear", "getUTCFullYear", "getUTCMonth", "getUTCDate"];
  const prior = methods.map((name) => [name, Date.prototype[name]]);
  try {
    Date.prototype.setUTCFullYear = function() { return 0; };
    Date.prototype.getUTCFullYear = () => 2026;
    Date.prototype.getUTCMonth = () => 1;
    Date.prototype.getUTCDate = () => 29;
    for (const read of input.capture.reads) read.observedAt = "2026-02-29T12:00:00Z";
    input.capture.capturedAt = "2026-02-29T12:00:00Z";
    const result = evaluateOffline(input);
    assert.equal(result.code, "CAPTURE_NOT_ATTESTED");
    assert.equal(result.canApprove, false);
  } finally { for (const [name, fn] of prior) Date.prototype[name] = fn; }
});

test("S-74: inherited descriptor value cannot convert accessor evidence into clean data", () => {
  const input = fixture();
  Object.defineProperty(input.observations, "unresolvedThreads", {enumerable: true, configurable: true, get: () => [{id: 99}]});
  const prior = Object.getOwnPropertyDescriptor(Object.prototype, "value");
  try {
    Object.defineProperty(Object.prototype, "value", {configurable: true, get() { return []; }});
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally {
    if (prior) Object.defineProperty(Object.prototype, "value", prior);
    else delete Object.prototype.value;
  }
});

test("S-74: live WeakSet add cannot rewrite failed Verify", () => {
  const input = fixture();
  input.observations.checks[0].conclusion = "failure";
  const original = WeakSet.prototype.add;
  try {
    WeakSet.prototype.add = function(value) {
      if (value && value.name === "Verify") value.conclusion = "success";
      return Reflect.apply(original, this, [value]);
    };
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { WeakSet.prototype.add = original; }
});

test("S-74: live Set size cannot conceal duplicate merge parents", () => {
  const input = fixture("merge");
  input.observations.parentShas = [sha("a"), sha("A")];
  input.observations.preIntegrationBaseSha = sha("a");
  input.observations.reviewedHead = sha("A");
  const prior = Object.getOwnPropertyDescriptor(Set.prototype, "size");
  try {
    Object.defineProperty(Set.prototype, "size", {configurable: true, get() { return 2; }});
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { Object.defineProperty(Set.prototype, "size", prior); }
});

test("S-74: WeakSet delete mutation cannot rewrite later failed Verify", () => {
  const input = fixture();
  input.observations.checks[0].conclusion = "failure";
  const original = WeakSet.prototype.delete;
  try {
    WeakSet.prototype.delete = function(value) {
      if (value?.kind === "merge") {
        input.observations.checks[0].conclusion = "success";
        input.capture.reads[1].checkRuns[0].conclusion = "success";
        input.capture.reads[4].checkRuns[0].conclusion = "success";
      }
      return Reflect.apply(original, this, [value]);
    };
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { WeakSet.prototype.delete = original; }
});

test("S-74: replaced WeakSet constructor cannot mutate Verify evidence", () => {
  const input = fixture();
  input.observations.checks[0].conclusion = "failure";
  const original = globalThis.WeakSet;
  try {
    globalThis.WeakSet = function(...args) {
      input.observations.checks[0].conclusion = "success";
      return new original(...args);
    };
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
  } finally { globalThis.WeakSet = original; }
});

test("S-74: mutable global String cannot change later failed Verify", () => {
  const input = fixture();
  input.observations.checks[0].conclusion = "failure";
  const original = globalThis.String;
  try {
    globalThis.String = function(...args) {
      input.observations.checks[0].conclusion = "success";
      return Reflect.apply(original, undefined, args);
    };
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
  } finally { globalThis.String = original; }
});

test("S-74: mutable Object.prototype getter cannot change later failed Verify", () => {
  const input = fixture();
  input.observations.checks[0].conclusion = "failure";
  const original = globalThis.Object;
  try {
    globalThis.Object = {get prototype() {
      input.observations.checks[0].conclusion = "success";
      return original.prototype;
    }};
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
  } finally { globalThis.Object = original; }
});

test("S-74: mock path uses captured WeakSet constructor before copying", () => {
  const input = fixture();
  const ready = evaluateOffline(input);
  assert.equal(ready.state, "SHADOW_EVIDENCE_READY");
  const mock = { manifestDigest: ready.envelope.manifestDigest, verdict: "PASS" };
  const original = globalThis.WeakSet;
  try {
    globalThis.WeakSet = function(...args) {
      mock.verdict = "REJECT";
      return new original(...args);
    };
    const result = reviewWithMock(ready, mock);
    assert.equal(result.state, "SHADOW_REVIEW_RECORDED");
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
    assert.equal(result.canDispatch, false);
  } finally { globalThis.WeakSet = original; }
});

test("S-74: descriptor index collision cannot hide first mismatched file", () => {
  const input = fixture("merge");
  const first = file("src/first.ts");
  const second = file("src/second.ts");
  input.observations.authoredChange.files = [first, second];
  input.observations.integratedChange.files = [{ ...first, patchDigest: digest("e") }, second];
  const original = globalThis.String;
  try {
    globalThis.String = function(value) {
      if (typeof value === "number") return "0";
      return Reflect.apply(original, undefined, [value]);
    };
    const result = evaluateOffline(input);
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
  } finally { globalThis.String = original; }
});

test("S-74: post-import Number replacement cannot accept impossible leap date", () => {
  const input = fixture();
  const invalid = "2026-02-29T12:00:00Z";
  for (const read of input.capture.reads) read.observedAt = invalid;
  input.capture.capturedAt = invalid;
  const original = globalThis.Number;
  try {
    globalThis.Number = function(value) {
      if (value === "2026") return 2024;
      return Reflect.apply(original, undefined, [value]);
    };
    const result = evaluateOffline(input);
    assert.equal(result.code, "CAPTURE_NOT_ATTESTED");
    assert.equal(result.canApprove, false);
  } finally { globalThis.Number = original; }
});

test("S-74: endpoint-aligned case aliases cannot evade duplicate parent detection", () => {
  const input = fixture("merge");
  input.observations.parentShas = [sha("a"), sha("A")];
  input.observations.preIntegrationBaseSha = sha("a");
  input.observations.reviewedHead = sha("A");
  const descriptor = Object.getOwnPropertyDescriptor(Set.prototype, "size");
  try {
    Object.defineProperty(Set.prototype, "size", {
      configurable: true,
      get() {
        const actual = Reflect.apply(descriptor.get, this, []);
        return actual === 1 ? 2 : actual;
      },
    });
    const result = evaluateOffline(input);
    assert.equal(result.code, "INCONSISTENT_PARENT_GRAPH");
    assert.notEqual(result.state, "SHADOW_EVIDENCE_READY");
    assert.equal(result.canApprove, false);
    assert.equal(result.canWrite, false);
    assert.equal(result.canDispatch, false);
  } finally {
    Object.defineProperty(Set.prototype, "size", descriptor);
  }
});
