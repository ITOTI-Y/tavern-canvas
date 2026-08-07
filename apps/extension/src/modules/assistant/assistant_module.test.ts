import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 5 (rebuild the optional AI assistant, TTS, and
 * ASR safely), created by Task 1 (parity ledger foundation) so tools/parity_check's "every
 * acceptance-test file exists" rule passes on the initial matrix commit. Task 5 extends this file
 * in place with real assertions; see docs/parity/feature_matrix.md's "AI assistant, TTS, ASR,
 * summary, and screen input" section for the exact parity rows this test backs.
 */
describe.todo(
  "assistant_module: authority boundary (tools read redacted settings schema/help, diagnostics " +
    "codes, provider capabilities, workflow metadata, and user-selected screenshots/images -- " +
    "never secrets, auth headers, raw browser storage, unrelated chats, or full provider " +
    "bodies); multiple assistant chats, abort, edit/resend, summary, image attachments, " +
    "thought-content separation, scroll windowing, persistence, corrupt-history recovery; " +
    "image-generation requests use the same typed Stage 02 command and remain visible in the " +
    "task strip",
);
