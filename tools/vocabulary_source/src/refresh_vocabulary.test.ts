import { describe, expect, it } from "vitest";

import { refresh_vocabulary } from "./refresh_vocabulary.js";
import type { VocabularyRecord } from "./vocabulary_record_schema.js";

function record(
  record_id: number,
  tag: string,
  popularity: number,
  extra: Partial<VocabularyRecord> = {},
): VocabularyRecord {
  return { record_id, tag, aliases: [], category: "general", popularity, ...extra };
}

function refresh(
  previous: readonly VocabularyRecord[],
  facts: readonly VocabularyRecord[],
  memory: { tag: string; translation: string }[] = [],
) {
  return refresh_vocabulary({ previous, memory, facts, min_post_count: 10 });
}

describe("refresh_vocabulary", () => {
  it("keeps translations, drops tags under the threshold, and counts what was added", () => {
    const result = refresh(
      [record(1, "long_hair", 100, { translation: "长发" }), record(2, "rare_tag", 5)],
      [record(1, "long_hair", 120), record(2, "rare_tag", 5), record(3, "new_tag", 40)],
    );

    expect(result.records.map((entry) => [entry.tag, entry.translation])).toEqual([
      ["long_hair", "长发"],
      ["new_tag", undefined],
    ]);
    expect(result.report).toMatchObject({
      below_threshold_dropped: 1,
      added_count: 1,
      removed_count: 1,
      untranslated_added_count: 1,
    });
  });

  it("keeps the last fetch of a repeated tag id", () => {
    const result = refresh([], [record(7, "cat", 10), record(7, "cat", 30)]);

    expect(result.records).toHaveLength(1);
    expect(result.records[0]?.popularity).toBe(30);
    expect(result.report.duplicate_ids_dropped).toBe(1);
  });

  it("folds tags with the same normalized key into the most popular one as aliases", () => {
    const result = refresh(
      [record(9, "A b", 20, { translation: "甲乙" })],
      [record(8, "a_b", 500), record(9, "A b", 20)],
    );

    expect(result.records).toEqual([
      expect.objectContaining({ tag: "a_b", aliases: [], translation: "甲乙" }),
    ]);
    expect(result.report.key_conflicts_merged).toBe(1);
  });

  it("drops aliases that are tags themselves or already claimed by a more popular tag", () => {
    const result = refresh(
      [],
      [
        record(1, "cat_ears", 900, { aliases: ["nekomimi", "dog_ears"] }),
        record(2, "dog_ears", 800),
        record(3, "animal_ears", 100, { aliases: ["nekomimi"] }),
      ],
    );

    const aliases = Object.fromEntries(result.records.map((entry) => [entry.tag, entry.aliases]));
    expect(aliases).toEqual({ cat_ears: ["nekomimi"], dog_ears: [], animal_ears: [] });
    expect(result.report).toMatchObject({
      aliases_dropped_matching_a_tag: 1,
      aliases_dropped_shared: 1,
    });
  });

  it("gives a renamed tag the translation its old name had", () => {
    const result = refresh(
      [record(1, "old_name", 300, { translation: "旧译名" })],
      [record(2, "new_name", 300, { aliases: ["old_name"] })],
    );

    expect(result.records[0]).toMatchObject({ tag: "new_name", translation: "旧译名" });
    expect(result.report.translation_via_alias_count).toBe(1);
  });

  it("remembers translations of tags that fall out so they return when the tag does", () => {
    const first = refresh(
      [record(1, "faded", 20, { translation: "褪色" })],
      [record(1, "faded", 3)],
    );
    expect(first.records).toEqual([]);

    const second = refresh(first.records, [record(1, "faded", 40)], first.memory);
    expect(second.records[0]).toMatchObject({ tag: "faded", translation: "褪色" });
  });

  it("keeps a previous tag Danbooru stopped listing unless it became an alias", () => {
    const result = refresh(
      [
        record(1, "night_sky", 65_000, { translation: "夜空" }),
        record(2, "china_dress", 9_000, { translation: "旗袍" }),
        record(3, "tiny_tag", 4),
      ],
      [record(4, "qipao", 9_500, { aliases: ["china_dress"] })],
    );

    expect(result.records.map((entry) => [entry.tag, entry.translation])).toEqual([
      ["night_sky", "夜空"],
      ["qipao", "旗袍"],
    ]);
    expect(result.report.retained_missing_count).toBe(1);
  });

  it("produces the same hash for the same input", () => {
    const facts = [record(1, "b", 20), record(2, "a", 20)];
    expect(refresh([], facts).report.records_sha256).toBe(
      refresh([], [...facts].reverse()).report.records_sha256,
    );
  });
});
