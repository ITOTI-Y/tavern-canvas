import type { VocabularySearchResult } from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import { resolve_character_tags, type VocabularyLookup } from "./character_tags.js";

function record(
  tag: string,
  category: string,
  popularity: number,
  translation?: string,
): Omit<VocabularySearchResult, "match_kind"> {
  return {
    record_id: tag.length,
    display_text: tag,
    category,
    popularity,
    score: 1,
    ...(translation === undefined ? {} : { translation }),
  };
}

const RECORDS = [
  record("hatsune_miku", "character", 143_051, "初音未来-初音未来-VOCALOID"),
  record("vocaloid", "copyright", 200_000),
  record("saber", "character", 5_000),
  record("saber_(fate)", "character", 40_000),
  record("fate/stay_night", "copyright", 60_000),
  record("obscure_girl", "character", 12),
  record("long_hair", "general", 6_000_000),
];

/** Exact, prefix and Chinese-name matches over `RECORDS`, as the vocabulary Worker answers. */
const lookup: VocabularyLookup = (query) =>
  Promise.resolve(
    RECORDS.flatMap((item): VocabularySearchResult[] => {
      if (item.display_text === query) {
        return [{ ...item, match_kind: "exact" }];
      }
      if (item.display_text.startsWith(query)) {
        return [{ ...item, match_kind: "prefix" }];
      }
      return item.translation?.startsWith(query) ? [{ ...item, match_kind: "translation" }] : [];
    }),
  );

describe("resolve_character_tags", () => {
  it("keeps a known character tag and drops its copyright when the name is unambiguous", async () => {
    await expect(
      resolve_character_tags(["Hatsune Miku", "vocaloid"], "Miku", lookup),
    ).resolves.toEqual(["hatsune miku"]);
  });

  it("adds the copyright when another character shares the unqualified name", async () => {
    await expect(
      resolve_character_tags(["saber", "fate/stay_night"], "Saber", lookup),
    ).resolves.toEqual(["saber", "fate/stay night"]);
  });

  it("falls back to the character the vocabulary files under the story's name", async () => {
    await expect(resolve_character_tags(["miku_hatsune"], "初音未来", lookup)).resolves.toEqual([
      "hatsune miku",
    ]);
  });

  it("stores nothing for an original, rare or unknown character, or without a vocabulary", async () => {
    await expect(resolve_character_tags([], "初音未来", lookup)).resolves.toEqual([]);
    await expect(resolve_character_tags(["obscure_girl"], "Girl", lookup)).resolves.toEqual([]);
    await expect(resolve_character_tags(["long_hair"], "Ann", lookup)).resolves.toEqual([]);
    await expect(
      resolve_character_tags(["hatsune_miku"], "Miku", () => Promise.resolve(null)),
    ).resolves.toEqual([]);
  });
});
