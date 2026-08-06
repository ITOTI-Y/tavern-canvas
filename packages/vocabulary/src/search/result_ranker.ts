import { normalize_vocabulary_search_key } from "@tavern-canvas/contracts";
import type {
  VocabularyCategory,
  VocabularyMatchKind,
  VocabularyPopularity,
  VocabularyRecordId,
} from "@tavern-canvas/contracts";

import type { VocabularyPlannerCandidate } from "./query_planner.js";

// Optional fields use the `T | undefined` form (not just `field?: T`) so a
// contracts VocabularyRecord -- whose zod `.optional()` fields infer that
// way -- satisfies this interface directly under exactOptionalPropertyTypes,
// with no adapter object needed at the Worker/contracts boundary.
export interface VocabularyRecordLike {
  readonly record_id: VocabularyRecordId;
  readonly tag: string;
  readonly translation?: string | undefined;
  readonly aliases: readonly string[];
  readonly category?: VocabularyCategory | undefined;
  readonly popularity: VocabularyPopularity;
}

export interface VocabularyRankedResult {
  readonly record_id: VocabularyRecordId;
  readonly display_text: string;
  readonly category?: VocabularyCategory;
  readonly popularity: VocabularyPopularity;
  readonly match_kind: VocabularyMatchKind;
  readonly score: number;
}

export interface RankVocabularyCandidatesOptions {
  readonly candidates: readonly VocabularyPlannerCandidate[];
  readonly category?: string;
  readonly detail_lookup: (record_id: number) => VocabularyRecordLike | undefined;
  readonly query_normalized: string;
}

// Primary tag matches always outrank alias/translation matches, which
// always outrank fuzzy trigram recall (brief: "exact tag before prefix",
// "primary tag before alias/translation"). "hot" only ever appears for an
// empty query, where it is the sole phase, so its relative position versus
// exact/prefix never actually competes in a single ranked list.
const MATCH_TIER: Readonly<Record<VocabularyMatchKind, number>> = {
  exact: 5,
  hot: 4,
  prefix: 3,
  translation: 2,
  alias: 2,
  trigram: 1,
};

// Comfortably larger than any realistic popularity count, so tier always
// dominates the sort key regardless of popularity magnitude.
const TIER_WEIGHT = 1_000_000_000;
const MAX_DETAIL_RECORDS_PER_REQUEST = 200;

function better_candidate(
  a: VocabularyPlannerCandidate,
  b: VocabularyPlannerCandidate,
): VocabularyPlannerCandidate {
  const tier_a = MATCH_TIER[a.match_kind];
  const tier_b = MATCH_TIER[b.match_kind];
  if (tier_a !== tier_b) {
    return tier_a > tier_b ? a : b;
  }
  const popularity_a = a.source_popularity ?? -1;
  const popularity_b = b.source_popularity ?? -1;
  if (popularity_a !== popularity_b) {
    return popularity_a > popularity_b ? a : b;
  }
  return a.trigram_overlap >= b.trigram_overlap ? a : b;
}

function dedupe_best_candidate(
  candidates: readonly VocabularyPlannerCandidate[],
): readonly VocabularyPlannerCandidate[] {
  const best = new Map<number, VocabularyPlannerCandidate>();
  for (const candidate of candidates) {
    const existing = best.get(candidate.record_id);
    best.set(
      candidate.record_id,
      existing === undefined ? candidate : better_candidate(candidate, existing),
    );
  }
  return Array.from(best.values());
}

function pre_hydration_comparator(
  a: VocabularyPlannerCandidate,
  b: VocabularyPlannerCandidate,
): number {
  const tier_a = MATCH_TIER[a.match_kind];
  const tier_b = MATCH_TIER[b.match_kind];
  if (tier_a !== tier_b) {
    return tier_b - tier_a;
  }
  const popularity_a = a.source_popularity ?? -1;
  const popularity_b = b.source_popularity ?? -1;
  if (popularity_a !== popularity_b) {
    return popularity_b - popularity_a;
  }
  if (a.trigram_overlap !== b.trigram_overlap) {
    return b.trigram_overlap - a.trigram_overlap;
  }
  return a.record_id - b.record_id;
}

/**
 * Dedupes candidates by record (keeping the best match per record) and
 * bounds hydration cost to at most 200 detail records per request, ranking
 * by the signal already available from the index entry itself (tier, then
 * popularity or trigram overlap) before any detail shard is fetched.
 * Exported so the Worker can resolve and load exactly the detail shards
 * this set of candidates needs, before calling rank_vocabulary_candidates
 * with a synchronous detail_lookup built from those shards.
 */
export function select_hydration_targets(
  candidates: readonly VocabularyPlannerCandidate[],
): readonly VocabularyPlannerCandidate[] {
  return [...dedupe_best_candidate(candidates)]
    .sort(pre_hydration_comparator)
    .slice(0, MAX_DETAIL_RECORDS_PER_REQUEST);
}

// An alias-shard candidate's matched key came from either the record's
// translation or one of its aliases (payload-contract.md does not
// distinguish the two structurally) -- hydration is what disambiguates.
function refine_match_kind(
  candidate: VocabularyPlannerCandidate,
  record: VocabularyRecordLike,
): VocabularyMatchKind {
  if (candidate.match_kind !== "alias") {
    return candidate.match_kind;
  }
  const normalized_translation =
    record.translation === undefined ? null : normalize_vocabulary_search_key(record.translation);
  return normalized_translation !== null && normalized_translation === candidate.matched_key
    ? "translation"
    : "alias";
}

function matches_category(record: VocabularyRecordLike, category: string | undefined): boolean {
  if (category === undefined || category === "") {
    return true;
  }
  return record.category === category;
}

/**
 * Dedupes candidates by record (keeping the best match per record), caps
 * detail hydration at 200 records per request, hydrates, disambiguates
 * alias vs. translation matches, applies the category filter, scores, and
 * returns a fully and deterministically ordered result list.
 */
export function rank_vocabulary_candidates(
  options: RankVocabularyCandidatesOptions,
): readonly VocabularyRankedResult[] {
  const capped = select_hydration_targets(options.candidates);

  const results: VocabularyRankedResult[] = [];
  for (const candidate of capped) {
    const record = options.detail_lookup(candidate.record_id);
    if (record === undefined) {
      continue;
    }
    if (!matches_category(record, options.category)) {
      continue;
    }

    const match_kind = refine_match_kind(candidate, record);
    const score = MATCH_TIER[match_kind] * TIER_WEIGHT + record.popularity;
    results.push({
      record_id: record.record_id,
      display_text: record.tag,
      ...(record.category !== undefined ? { category: record.category } : {}),
      popularity: record.popularity,
      match_kind,
      score,
    });
  }

  results.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.record_id - b.record_id));
  return results;
}
