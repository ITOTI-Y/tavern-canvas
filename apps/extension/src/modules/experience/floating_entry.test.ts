import { describe } from "vitest";

/**
 * Placeholder acceptance test for Stage 07 Task 6 (complete optional floating entry, themes, and
 * Tauri enhancements), created by Task 1 (parity ledger foundation) so tools/parity_check's
 * "every acceptance-test file exists" rule passes on the initial matrix commit. Task 6 extends
 * this file in place with real assertions; see docs/parity/feature_matrix.md's "themes and
 * optional floating entry" and "AI assistant, TTS, ASR, summary, and screen input" sections for
 * the exact parity rows this test backs.
 */
describe.todo(
  "floating_entry: enable/disable, desktop/mobile position, pointer drag, viewport clamping, " +
    "keyboard activation, user-provided icon, and media states idle/thinking/talk/enter/dragging " +
    "-- using Pointer Events and viewport measurements, not UA detection; missing/corrupt media " +
    "falls back to a Lucide image icon without blocking studio access; legacy .chatu8 media " +
    "adapter is confined to the v2 converter",
);
