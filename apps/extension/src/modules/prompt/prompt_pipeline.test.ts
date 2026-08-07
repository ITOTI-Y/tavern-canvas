import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 2 (prompt transformation and context-source
 * parity), created by Task 1 (parity ledger foundation) so tools/parity_check's "every
 * acceptance-test file exists" rule passes on the initial matrix commit. Task 2 extends this file
 * in place with real assertions; see docs/parity/feature_matrix.md's "prompt presets and
 * transformations" and "main trigger and streaming pre-generation" sections for the exact parity
 * rows this test backs.
 */
describe.todo(
  "prompt_pipeline: fixed stage order (context -> MVU -> quality controls -> preset/random " +
    "group -> replacement -> regex -> roll -> tag normalization -> provider mapping), " +
    "idempotent transforms, comma spacing, and physical newline handling",
);
