/**
 * The `skip-thought/skip-thought-imperative` instruction of the Petals preset 7.11.2 that ships with Advanced
 * Preset, copied verbatim. Sent after the last user message of a built-in preset request, it keeps
 * Gemini from reasoning before it answers; without it, Gemini answers some requests about mature
 * story text with empty results.
 *
 * Copyright (c) 2026 mirrorange, MIT License; see THIRD_PARTY_NOTICES.md.
 */
export const SKIP_THOUGHT_PROMPT =
  'The workflow already does all of the planning, so no internal reasoning is needed. In your internal thought block (`<thought>`), output only this exact sentence: "Skip the internal thought and proceed directly to the workflow." Do not analyze the story, plan, draft or write anything else inside the thought block—then go straight to the workflow.';

/**
 * The `core/bottom-imperative` instruction of the same preset without its Advanced Preset workflow hint, copied
 * verbatim. Sent after the skip-thought instruction: a Gemini model that skips its reasoning
 * otherwise often submits an empty result.
 */
export const CLOSING_PROMPT =
  "Start the workflow (Produce the task results in the specified format.) now. Deliver every stage in order.";
