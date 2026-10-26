import { normalize_vocabulary_search_key } from "@tavern-canvas/contracts";
import type {
  VocabularyCategory,
  VocabularyMatchKind,
  VocabularyPopularity,
  VocabularyRecordId,
} from "@tavern-canvas/contracts";

import type { VocabularyPlannerCandidate } from "./query_planner.js";

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
  readonly translation?: string;
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

// Primary tag matches outrank alias/translation matches, which outrank fuzzy trigram recall.
const MATCH_TIER: Readonly<Record<VocabularyMatchKind, number>> = {
  exact: 5,
  hot: 4,
  prefix: 3,
  translation: 2,
  alias: 2,
  trigram: 1,
};

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

export function select_hydration_targets(
  candidates: readonly VocabularyPlannerCandidate[],
): readonly VocabularyPlannerCandidate[] {
  return [...dedupe_best_candidate(candidates)]
    .sort(pre_hydration_comparator)
    .slice(0, MAX_DETAIL_RECORDS_PER_REQUEST);
}

// An alias-shard candidate matched either the translation or an alias; hydration disambiguates.
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
      ...(record.translation === undefined ? {} : { translation: record.translation }),
      ...(record.category !== undefined ? { category: record.category } : {}),
      popularity: record.popularity,
      match_kind,
      score,
    });
  }

  results.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.record_id - b.record_id));
  return results;
}
