import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 4 (replace the vendored NovelAI tokenizer with a
 * local lazy module), created by Task 1 (parity ledger foundation) so tools/parity_check's "every
 * acceptance-test file exists" rule passes on the initial matrix commit. Task 4 extends this file
 * in place with real assertions; see docs/parity/feature_matrix.md's "NovelAI" and "LLM prompt
 * generation and testing" sections for the exact parity rows this test backs.
 */
describe.todo(
  "tokenizer_service: opening unrelated views does not load the tokenizer chunk/assets; first " +
    "NovelAI token-count request loads one Worker/chunk; concurrent requests share one " +
    "initialization promise; remote models disabled and any network request outside the local " +
    "extension tokenizer path fails; fixed prompts match committed expected token counts; " +
    "cancellation/dispose terminates pending work; load failure returns tokenizer_unavailable " +
    "without blocking generation",
);
