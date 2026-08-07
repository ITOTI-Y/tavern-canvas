import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { LegacyInventoryEntry } from "./legacy_inventory.js";
import { parse_matrix, type ParityRow } from "./parse_matrix.js";
import {
  APPROVED_REMOVAL_REASONS,
  check_parity,
  format_finding,
  validate_rows,
  type ParityFinding,
} from "./index.js";

const GROUP = "startup and update";

function row(overrides: Partial<ParityRow> = {}): ParityRow {
  return {
    id: "startup.example",
    group: GROUP,
    v2_entry: "index.js:1 example",
    v3_owner: "apps/extension/src/bootstrap/bootstrap.ts",
    status: "ported",
    acceptance_test: "apps/extension/src/bootstrap/bootstrap.test.ts",
    notes: "example note",
    line: 10,
    ...overrides,
  };
}

function entry(overrides: Partial<LegacyInventoryEntry> = {}): LegacyInventoryEntry {
  return { id: "startup.example", group: GROUP, ...overrides };
}

function rule_ids(findings: readonly ParityFinding[]): string[] {
  return findings.map((finding) => finding.rule_id);
}

let temporary_root: string;

beforeEach(async () => {
  temporary_root = await mkdtemp(resolve(tmpdir(), "tavern-canvas-parity-check-"));
});

afterEach(async () => {
  await rm(temporary_root, { recursive: true, force: true });
});

async function write_file(relative_path: string, content = ""): Promise<void> {
  const absolute_path = resolve(temporary_root, relative_path);
  await mkdir(dirname(absolute_path), { recursive: true });
  await writeFile(absolute_path, content, "utf8");
}

describe("validate_rows", () => {
  it("accepts a single well-formed ported row matched 1:1 against the inventory", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows([row()], [entry()], temporary_root);
    expect(findings).toEqual([]);
  });

  it("accepts a well-formed removed_approved row with a closed-list reason tag", async () => {
    await write_file("tests/e2e/security_boundaries.spec.ts");
    const findings = validate_rows(
      [
        row({
          status: "removed_approved",
          acceptance_test: "tests/e2e/security_boundaries.spec.ts",
          notes: "[global-error-collector] replaced by scoped diagnostics",
        }),
      ],
      [entry()],
      temporary_root,
    );
    expect(findings).toEqual([]);
  });

  it("accepts the non-redistributable-content-default-bundle reason (2026-08-07 architecture amendment)", async () => {
    // Regression guard for the 12th approved-removal category, added per the user's 2026-08-07
    // ruling on vocabulary.nsfw_group_tree_default_load (docs/plans/2026-08-04-tavern-canvas-v3-
    // architecture-design.md section 15.1): a category can be added to the closed list without
    // touching validate_rows itself, only APPROVED_REMOVAL_REASONS -- this pins that the constant
    // is genuinely the single source of truth the rule reads from.
    await write_file("tests/integration/vocabulary_baseline_provenance.test.ts");
    const findings = validate_rows(
      [
        row({
          status: "removed_approved",
          acceptance_test: "tests/integration/vocabulary_baseline_provenance.test.ts",
          notes:
            "[non-redistributable-content-default-bundle] NSFW group-tree no longer bundled by default",
        }),
      ],
      [entry()],
      temporary_root,
    );
    expect(findings).toEqual([]);
  });

  it("covers all twelve approved-removal reasons as valid tags", async () => {
    await write_file("placeholder.test.ts");
    for (const reason of APPROVED_REMOVAL_REASONS) {
      const findings = validate_rows(
        [
          row({
            status: "removed_approved",
            acceptance_test: "placeholder.test.ts",
            notes: `[${reason}] replacement note`,
          }),
        ],
        [entry()],
        temporary_root,
      );
      expect(findings, `reason ${reason} should be accepted`).toEqual([]);
    }
  });

  it("rejects a blank ID", () => {
    const findings = validate_rows([row({ id: "" })], [], temporary_root);
    expect(rule_ids(findings)).toContain("blank-id");
  });

  it("rejects duplicate IDs across rows", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows([row(), row({ line: 20 })], [entry()], temporary_root);
    expect(rule_ids(findings)).toContain("duplicate-id");
  });

  it("rejects an inventory entry with no matching matrix row", () => {
    const findings = validate_rows([], [entry()], temporary_root);
    expect(rule_ids(findings)).toContain("missing-inventory-row");
  });

  it("rejects a matrix row with no matching inventory entry", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows([row()], [], temporary_root);
    expect(rule_ids(findings)).toContain("unknown-id");
  });

  it("rejects a row filed under a group that does not match its inventory entry", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows(
      [row({ group: "NovelAI" })],
      [entry({ group: GROUP })],
      temporary_root,
    );
    expect(rule_ids(findings)).toContain("group-mismatch");
  });

  it("rejects a row filed under a heading that is not one of the 18 canonical groups", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows(
      [row({ group: "not a real group" })],
      [entry({ group: "not a real group" as never })],
      temporary_root,
    );
    expect(rule_ids(findings)).toContain("unknown-group");
  });

  it.each(["pending", "partial", "planned", ""])(
    "rejects status %j as not exactly ported/removed_approved",
    async (status) => {
      await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
      const findings = validate_rows([row({ status })], [entry()], temporary_root);
      expect(rule_ids(findings)).toContain("invalid-status");
    },
  );

  it("rejects a missing V3 Owner", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows([row({ v3_owner: "" })], [entry()], temporary_root);
    expect(rule_ids(findings)).toContain("missing-owner");
  });

  it("rejects a blank Acceptance Test cell", () => {
    const findings = validate_rows([row({ acceptance_test: "" })], [entry()], temporary_root);
    expect(rule_ids(findings)).toContain("missing-acceptance-test");
  });

  it("rejects an Acceptance Test path that does not exist on disk", () => {
    const findings = validate_rows(
      [row({ acceptance_test: "does/not/exist.test.ts" })],
      [entry()],
      temporary_root,
    );
    expect(rule_ids(findings)).toContain("acceptance-test-not-found");
  });

  it("rejects removed_approved with no reason tag in Notes", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows(
      [row({ status: "removed_approved", notes: "removed because it was legacy cruft" })],
      [entry()],
      temporary_root,
    );
    expect(rule_ids(findings)).toContain("unapproved-removal");
  });

  it("rejects removed_approved with a reason tag outside the closed list", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows(
      [row({ status: "removed_approved", notes: "[not-an-approved-reason] because reasons" })],
      [entry()],
      temporary_root,
    );
    expect(rule_ids(findings)).toContain("unapproved-removal");
  });

  it("does not require a removal-reason tag on a ported row", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    const findings = validate_rows(
      [row({ status: "ported", notes: "plain note, no bracket tag" })],
      [entry()],
      temporary_root,
    );
    expect(findings).toEqual([]);
  });
});

describe("check_parity (file-reading wrapper)", () => {
  it("reads a real matrix file and validates it against an injected inventory", async () => {
    await write_file("apps/extension/src/bootstrap/bootstrap.test.ts");
    await write_file(
      "docs/parity/feature_matrix.md",
      [
        `## ${GROUP}`,
        "",
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "| startup.example | index.js:1 example | apps/extension/src/bootstrap/bootstrap.ts | ported | apps/extension/src/bootstrap/bootstrap.test.ts | fine |",
        "",
      ].join("\n"),
    );

    const findings = await check_parity("docs/parity/feature_matrix.md", {
      repository_root: temporary_root,
      inventory: [entry()],
    });
    expect(findings).toEqual([]);
  });

  it("surfaces a finding when the file references an inventory ID the matrix omits", async () => {
    await write_file(
      "docs/parity/feature_matrix.md",
      [
        `## ${GROUP}`,
        "",
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "",
      ].join("\n"),
    );

    const findings = await check_parity("docs/parity/feature_matrix.md", {
      repository_root: temporary_root,
      inventory: [entry()],
    });
    expect(rule_ids(findings)).toContain("missing-inventory-row");
  });

  it("defaults to the real committed LEGACY_INVENTORY when no inventory override is given", async () => {
    // Regression guard for the CLI/default path: without an explicit `inventory` option,
    // check_parity must fall back to the real committed ledger, not silently validate against
    // nothing (which would make every row "unknown-id" but never catch a truly missing row).
    await write_file("docs/parity/feature_matrix.md", `## ${GROUP}\n`);
    const findings = await check_parity("docs/parity/feature_matrix.md", {
      repository_root: temporary_root,
    });
    expect(findings.length).toBeGreaterThan(0);
    expect(rule_ids(findings)).toContain("missing-inventory-row");
  });
});

describe("parse_matrix", () => {
  it("parses one row per group, skipping the header and separator rows", () => {
    const rows = parse_matrix(
      [
        "# TavernCanvas Feature Parity Matrix",
        "",
        "Intro prose before any group heading.",
        "",
        `## ${GROUP}`,
        "",
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "| startup.a | v2 a | owner a | ported | test/a.test.ts | note a |",
        "| startup.b | v2 b | owner b | removed_approved | test/b.test.ts | [duplicate-in-app-updater] note b |",
        "",
        "## NovelAI",
        "",
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "| novelai.a | v2 c | owner c | ported | test/c.test.ts | note c |",
      ].join("\n"),
    );

    expect(rows).toHaveLength(3);
    expect(rows[0]).toMatchObject({ id: "startup.a", group: GROUP, status: "ported" });
    expect(rows[1]).toMatchObject({
      id: "startup.b",
      group: GROUP,
      status: "removed_approved",
      notes: "[duplicate-in-app-updater] note b",
    });
    expect(rows[2]).toMatchObject({ id: "novelai.a", group: "NovelAI" });
  });

  it("trims cell whitespace", () => {
    const rows = parse_matrix(
      [
        `## ${GROUP}`,
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "|  startup.a  |  v2 a  |  owner a  |  ported  |  test/a.test.ts  |  note a  |",
      ].join("\n"),
    );
    expect(rows[0]).toMatchObject({ id: "startup.a", v2_entry: "v2 a", notes: "note a" });
  });

  it("throws with a line number when a data row has the wrong column count", () => {
    const content = [
      `## ${GROUP}`,
      "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
      "|---|---|---|---|---|---|",
      "| startup.a | v2 a | owner a | ported | test/a.test.ts |",
    ].join("\n");
    expect(() => parse_matrix(content)).toThrow(/feature_matrix\.md:4/);
  });

  it("throws when a table row appears before any group heading", () => {
    const content = [
      "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
      "|---|---|---|---|---|---|",
      "| startup.a | v2 a | owner a | ported | test/a.test.ts | note a |",
    ].join("\n");
    expect(() => parse_matrix(content)).toThrow(/group heading/);
  });

  it("ignores non-table lines between group sections", () => {
    const rows = parse_matrix(
      [
        `## ${GROUP}`,
        "",
        "Some prose describing the group.",
        "",
        "| ID | V2 Entry | V3 Owner | Status | Acceptance Test | Notes |",
        "|---|---|---|---|---|---|",
        "| startup.a | v2 a | owner a | ported | test/a.test.ts | note a |",
      ].join("\n"),
    );
    expect(rows).toHaveLength(1);
  });
});

describe("format_finding", () => {
  it("renders id, rule, and detail on one line", () => {
    const text = format_finding({
      rule_id: "invalid-status",
      id: "startup.example",
      detail: 'status "pending" is not "ported" or "removed_approved"',
    });
    expect(text).toBe(
      'startup.example [invalid-status] status "pending" is not "ported" or "removed_approved"',
    );
  });
});
