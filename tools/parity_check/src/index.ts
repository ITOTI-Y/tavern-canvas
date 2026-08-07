import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LEGACY_INVENTORY,
  PARITY_GROUPS,
  type LegacyInventoryEntry,
  type ParityGroup,
} from "./legacy_inventory.js";
import { parse_matrix, type ParityRow, type ParityStatus } from "./parse_matrix.js";

export type ParityRuleId =
  | "blank-id"
  | "duplicate-id"
  | "missing-inventory-row"
  | "unknown-id"
  | "unknown-group"
  | "group-mismatch"
  | "invalid-status"
  | "missing-owner"
  | "missing-acceptance-test"
  | "acceptance-test-not-found"
  | "unapproved-removal";

export interface ParityFinding {
  readonly rule_id: ParityRuleId;
  readonly id: string;
  readonly detail: string;
}

const VALID_STATUSES: ReadonlySet<string> = new Set<ParityStatus>(["ported", "removed_approved"]);
const VALID_GROUPS: ReadonlySet<string> = new Set<ParityGroup>(PARITY_GROUPS);

// Every `removed_approved` row must open its Notes cell with one of these bracketed tags, each
// mapping 1:1 onto a bullet of the closed approved-removal list (task brief Step 2, amended
// 2026-08-07 three times -- see docs/plans/2026-08-04-tavern-canvas-v3-architecture-design.md
// section 15.1 for the authoritative record and the user-directive citations for reasons 12, 13,
// and 14). This is what makes "unapproved removal" a machine check rather than a prose-matching
// heuristic: a removal whose replacement rationale cannot be classified into one of these fourteen
// reasons is rejected, not merely unrecorded. Any additional removal category requires explicit
// user approval and an architecture-document revision -- not a new entry here.
export const APPROVED_REMOVAL_REASONS = [
  "global-error-collector",
  "steganography-sync-db",
  "vendored-umd-patches",
  "custom-css-injector",
  "ua-capability-detection",
  "client-controlled-provider-url",
  "reversible-pseudo-encryption",
  "worldinfo-tool-injection",
  "last-message-attachment-fallback",
  "duplicate-in-app-updater",
  "cache-completion-flags",
  "non-redistributable-content-default-bundle",
  "decorative-flourish-out-of-scope",
  "voice-features-out-of-scope",
] as const;

export type ApprovedRemovalReason = (typeof APPROVED_REMOVAL_REASONS)[number];

const VALID_REMOVAL_REASONS: ReadonlySet<string> = new Set<ApprovedRemovalReason>(
  APPROVED_REMOVAL_REASONS,
);
const REMOVAL_REASON_TAG_PATTERN = /^\[([a-z-]+)\]/u;

function extract_removal_reason(notes: string): string | null {
  return REMOVAL_REASON_TAG_PATTERN.exec(notes.trim())?.[1] ?? null;
}

function check_row(row: ParityRow, repository_root: string): ParityFinding[] {
  const findings: ParityFinding[] = [];
  const label = row.id === "" ? `feature_matrix.md:${String(row.line)}` : row.id;

  if (row.id === "") {
    findings.push({
      rule_id: "blank-id",
      id: label,
      detail: `feature_matrix.md:${String(row.line)}: row has a blank ID`,
    });
  }

  if (!VALID_GROUPS.has(row.group)) {
    findings.push({
      rule_id: "unknown-group",
      id: label,
      detail: `heading "${row.group}" is not one of the 18 canonical parity groups`,
    });
  }

  if (!VALID_STATUSES.has(row.status)) {
    findings.push({
      rule_id: "invalid-status",
      id: label,
      detail: `status "${row.status}" is not "ported" or "removed_approved"`,
    });
  }

  if (row.v3_owner === "") {
    findings.push({ rule_id: "missing-owner", id: label, detail: "V3 Owner cell is empty" });
  }

  if (row.acceptance_test === "") {
    findings.push({
      rule_id: "missing-acceptance-test",
      id: label,
      detail: "Acceptance Test cell is empty",
    });
  } else if (!existsSync(resolve(repository_root, row.acceptance_test))) {
    findings.push({
      rule_id: "acceptance-test-not-found",
      id: label,
      detail: `acceptance test file does not exist: ${row.acceptance_test}`,
    });
  }

  if (row.status === "removed_approved") {
    const reason = extract_removal_reason(row.notes);
    if (reason === null || !VALID_REMOVAL_REASONS.has(reason)) {
      findings.push({
        rule_id: "unapproved-removal",
        id: label,
        detail:
          "Notes must open with one of the closed-list removal tags " +
          `[${APPROVED_REMOVAL_REASONS.join("|")}], found: ${JSON.stringify(row.notes)}`,
      });
    }
  }

  return findings;
}

/**
 * Cross-checks parsed matrix rows against the legacy inventory and validates every row's fields.
 * A clean result (empty array) is the release gate: any finding here means either a v2 workflow
 * was silently dropped, a row was left in a non-terminal status, or a removal was recorded
 * without a closed-list justification. Pure and file-system-read-only (acceptance-test existence
 * is checked against `repository_root`) so it is unit-testable against fixture rows/inventories
 * without touching the real committed matrix.
 */
export function validate_rows(
  rows: readonly ParityRow[],
  inventory: readonly LegacyInventoryEntry[],
  repository_root: string,
): ParityFinding[] {
  const findings: ParityFinding[] = [];

  for (const row of rows) {
    findings.push(...check_row(row, repository_root));
  }

  const id_occurrences = new Map<string, number>();
  for (const row of rows) {
    if (row.id === "") {
      continue;
    }
    id_occurrences.set(row.id, (id_occurrences.get(row.id) ?? 0) + 1);
  }
  for (const [id, count] of id_occurrences) {
    if (count > 1) {
      findings.push({
        rule_id: "duplicate-id",
        id,
        detail: `ID "${id}" appears in ${String(count)} rows`,
      });
    }
  }

  const matrix_rows_by_id = new Map<string, ParityRow>();
  for (const row of rows) {
    if (row.id !== "") {
      matrix_rows_by_id.set(row.id, row);
    }
  }
  const inventory_by_id = new Map(inventory.map((entry) => [entry.id, entry]));

  for (const entry of inventory) {
    if (!matrix_rows_by_id.has(entry.id)) {
      findings.push({
        rule_id: "missing-inventory-row",
        id: entry.id,
        detail: `legacy inventory entry "${entry.id}" (${entry.group}) has no matching matrix row`,
      });
    }
  }
  for (const id of matrix_rows_by_id.keys()) {
    if (!inventory_by_id.has(id)) {
      findings.push({
        rule_id: "unknown-id",
        id,
        detail: `matrix row "${id}" does not correspond to any legacy_inventory.ts entry`,
      });
    }
  }
  for (const [id, entry] of inventory_by_id) {
    const row = matrix_rows_by_id.get(id);
    if (row && row.group !== entry.group) {
      findings.push({
        rule_id: "group-mismatch",
        id,
        detail: `matrix row is under "${row.group}", inventory declares "${entry.group}"`,
      });
    }
  }

  return findings;
}

export interface CheckParityOptions {
  readonly repository_root?: string;
  readonly inventory?: readonly LegacyInventoryEntry[];
}

/**
 * Reads the committed matrix file from disk and validates it against the real (or, in tests, an
 * injected) legacy inventory. This is the thin file-I/O wrapper the CLI calls; `validate_rows`
 * carries the actual rule logic.
 */
export async function check_parity(
  matrix_path: string,
  options: CheckParityOptions = {},
): Promise<ParityFinding[]> {
  const repository_root = resolve(options.repository_root ?? process.cwd());
  const absolute_matrix_path = resolve(repository_root, matrix_path);
  const content = await readFile(absolute_matrix_path, "utf8");
  const rows = parse_matrix(content);
  return validate_rows(rows, options.inventory ?? LEGACY_INVENTORY, repository_root);
}

export function format_finding(finding: ParityFinding): string {
  return `${finding.id} [${finding.rule_id}] ${finding.detail}`;
}

async function run_cli(argv: readonly string[]): Promise<void> {
  const matrix_path = argv[0] ?? "docs/parity/feature_matrix.md";
  const findings = await check_parity(matrix_path);
  if (findings.length === 0) {
    console.log(`parity check passed: ${String(LEGACY_INVENTORY.length)} rows verified`);
    return;
  }

  for (const finding of findings) {
    console.error(format_finding(finding));
  }
  console.error(`parity check failed: ${String(findings.length)} finding(s)`);
  process.exitCode = 1;
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  await run_cli(process.argv.slice(2));
}
