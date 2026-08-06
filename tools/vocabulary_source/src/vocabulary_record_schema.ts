import { z } from "zod";

/**
 * Local structural mirror of the (not-yet-present-in-this-worktree)
 * `VocabularyRecordSchema` from `packages/contracts/src/vocabulary.ts`
 * (plan Task 1, developed in parallel on `main`). Field-for-field copy of
 * the shape excerpted at
 * `.superpowers/sdd/2026-08-04-tavern-canvas-05-vocabulary/schema-excerpt.md`.
 *
 * The controller must replace this import with `@tavern-canvas/contracts`
 * at merge time, exactly like Stage 04 Task 5's local `TavernCanvasSettings`
 * mirror was replaced by the real contracts import (see
 * `docs/_dev/reviews/stage04/sdd-ledger.md:16`).
 *
 * `is_nsfw` is NOT part of the excerpted schema. It is a proposed extension
 * requested by the task brief ("NSFW-shard records get an explicit marker
 * the builder can filter on") for which the strict excerpted schema has no
 * fitting field (`category` is a taxonomy slot — general/artist/character/
 * copyright/meta — not a content-safety flag, and a tag can carry both).
 * Flagged for controller reconciliation: either fold `is_nsfw` into the real
 * `VocabularyRecordSchema` or drop it if Task 2's builder handles NSFW
 * filtering another way. See task-src-report.md for the real-run finding
 * that makes this currently unexercised (no archive shard actually produces
 * `is_nsfw: true` records — see extract_legacy_seed.ts).
 */
export const VocabularyRecordSchema = z.strictObject({
  record_id: z.number().int().nonnegative(),
  tag: z.string().trim().min(1).max(256),
  translation: z.string().trim().max(512).optional(),
  aliases: z.array(z.string().trim().min(1).max(256)).max(32).default([]),
  category: z.string().trim().max(64).optional(),
  popularity: z.number().int().nonnegative().default(0),
  description: z.string().trim().max(4_096).optional(),
  is_nsfw: z.boolean().default(false),
});

export type VocabularyRecord = z.infer<typeof VocabularyRecordSchema>;
