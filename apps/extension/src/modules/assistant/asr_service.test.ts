import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 5 (rebuild the optional AI assistant, TTS, and
 * ASR safely), created by Task 1 (parity ledger foundation) so tools/parity_check's "every
 * acceptance-test file exists" rule passes on the initial matrix commit. Task 5 extends this file
 * in place with real assertions; see docs/parity/feature_matrix.md's "AI assistant, TTS, ASR,
 * summary, and screen input" section for the exact parity rows this test backs.
 */
describe.todo(
  "asr_service: exposes permission, recording, transcribing, cancellation, and unavailable " +
    "states via injected browser/host speech ports; capability is never inferred from UA; no " +
    "recording or screenshot leaves the device without an explicit user command and configured service",
);
