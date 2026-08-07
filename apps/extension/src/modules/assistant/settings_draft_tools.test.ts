import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 5 (rebuild the optional AI assistant, TTS, and
 * ASR safely), created by Task 1 (parity ledger foundation) so tools/parity_check's "every
 * acceptance-test file exists" rule passes on the initial matrix commit. Task 5 extends this file
 * in place with real assertions; see docs/parity/feature_matrix.md's "AI assistant, TTS, ASR,
 * summary, and screen input", "regular-expression and click/drawing triggers", and "ComfyUI"
 * sections for the exact parity rows this test backs.
 */
describe.todo(
  "settings_draft_tools: a settings write creates a typed draft diff; only an explicit user " +
    "Review then Apply command can call settings capabilities; unknown paths, secret paths, " +
    "invalid values, and hidden auto-execute are all rejected",
);
