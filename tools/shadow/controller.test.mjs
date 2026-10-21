import test from "node:test";
import assert from "node:assert/strict";
import { evaluateOffline, evidenceDigest, reviewWithMock } from "./controller.mjs";

const sha = (c) => c.repeat(40);
const digest = (c) => c.repeat(64);
const file = (path = "src/domain/types.ts", kind = "text") =>
  kind === "text" ? { path, status: "modified", kind, patchDigest: digest("a") } :
    { path, status: "modified", kind, objectDigest: digest("b") };
const clone = (v) => structuredClone(v);

function fixture(strategy = "squash") {
  const head = sha("1"), tip = sha("2"), base = sha("3"), ancestor = sha("4");
  return {
    capture: { source: "synthetic-fixture", complete: true, producer: "test-harness", capturedAt: "2026-10-21T00:00:00Z" },
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
      checks: [{
        name: "Verify", sha: tip, appId: 15368, workflowRevision: sha("6"),
        workflowPath: ".github/workflows/ci.yml", runId: 400, attempt: 1,
        status: "completed", conclusion: "success",
      }],
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
    const result = evaluateOffline(fixture(s));
    assert.equal(result.state, "SHADOW_EVIDENCE_READY");
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
  for (let i = 0; i < 3990; i++) accepted.capture["padding" + i] = i;
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
