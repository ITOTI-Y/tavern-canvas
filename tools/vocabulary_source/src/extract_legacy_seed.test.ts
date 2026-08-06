import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { LegacyDecryptionError } from "./decrypt_legacy_tagdata.js";
import {
  extract_legacy_seed_from_files,
  extract_legacy_seed_records,
  LEGACY_V2_TAGDATA_PASSPHRASE,
  parse_legacy_shard,
  type LegacyShardSpec,
} from "./extract_legacy_seed.js";

// Synthetic shards generated with the module's own EVP_BytesToKey-compatible
// derivation (already verified bit-for-bit against real `openssl enc
// -aes-256-cbc -md md5` output in decrypt_legacy_tagdata.test.ts). All tag
// names and translations below are invented for testing; none are copied
// from the real st-chatu8 v2.8.1 archive.
const SHARD_A_PAYLOAD =
  "U2FsdGVkX19U7CA+ajpa9MGWxfq5D4EvD66CFKVQSvGpFdUr95/Q7jPhDN5Rxlf3pLDaF9MBccK5FAwXRXrxr6hTWGEblsWzWitkvtStbKZt5uIyHp1yEsxmzjlM3DQ9UMydqCNW5euzM3FMg2V2Zb+ag4Hpwxjg0jzjguZQE8m1xpX7SyfvM7HoIAZ0+mpvQCkXWhaLgPm3R2YdYV2oyDI9SHgkQcT6Ri2z5nw5pfk5Hz9LlIp7Xz7VOzlEyMXi+PxsUyHnSxEnUGI7uoWLAs+EcJ5DyiCUk7FrqnIRXqBdFAOVVEGxD4c8Q5JXsGnt16ePz0JWfcXyVr3buEqhyqAV4gar19lEpcz16rq1j87rIsrJ5cNUPHOc2DU0i9mbUk128TcO0zbodgbAkj6cEHCvG/nmSSIgusPjJ4P6Dzs9PZ7CjxFYHJZjoVtMzgiqxwgWejeUvl8faqFIoiTtePPSb4RHlmE3wTFjEeORdH4=";
const SHARD_B_PAYLOAD =
  "U2FsdGVkX1+fdTM/CpRaX2wv3GsIqlrpnfoTwm/kharzH3t898UpVqGSkQJyXOv4E7caRSjdvVw2O2bjFhl/x7NWY/qfyHQf/IfJHYP3WsAIwHRGcOWNhUEPGU2cM6jDexGoRxCaECmgWAw5TR892jiRXNxolKZLPkYBWSV/uypZ8bg2nTfcjfgbpbm464xUsdALVUREMfUVHeahM/BATQ==";
const SHARD_DUPLICATE_TAG_PAYLOAD =
  "U2FsdGVkX19/BDaLXKcFTBtNglxEa+WBiPckzxlEQyub8E/EPbKpHTBZvhK57An9+sq0hN8eqWetBU+C7UcsSARwKHqIweh24/yYOJTL3R+zTxYx00b6PpIb0w4NRDDbWTEwVgfIlETI6ptDI6HrKTrcRNBuKsuaEm6lIUIJ3BSVTjy+6IfDwtrAMphFpXib";
const SHARD_DUPLICATE_ID_PAYLOAD =
  "U2FsdGVkX19cr4dFnQCKp7jan3ID0f3pBMWJPT9+ion02W2+PBp9URdOP+PQufGu/oCET5jVIsg4uQhgmB4nLM/KtsOk3jszVUGNxiuvE0p1zuzk898K6Xe+/YxGMTLm8vwobumB02aHoZiTrAL3YzcpctSOkE8rhEZXQyFLeUoK6X05n3F7PKB9MkrnXRe+";
const SHARD_MALFORMED_ENTRY_PAYLOAD =
  "U2FsdGVkX1+ueHOCdcCMAwQ8dTpAk0CMUwGSvv2AzWwT3q0rgOivU43T89JSoAWROczd1TnK3rsHg0eMqhvxoac6cypm8ACriHK+dJWNHG6mRzTvAxxwQ5l0iERtsjDaOmJQBbxKOap0drC5xL5n6H2eMrDcqRYw5JwrGVvBvJtP9N1K/EywSlOHG3OVIsWr";
// Mirrors the *shape* of the real archive defect found during the real run
// (danbooru_007.json id_index 12402: an empty tag among otherwise-valid
// entries). The translation text here is an invented placeholder, not the
// real archive's value.
const SHARD_WITH_ONE_JUNK_ENTRY_PAYLOAD =
  "U2FsdGVkX1+rs5DRGYrz2XOFBTmjizhr6etBbvIbgjSZ1MZiDEB+vds5sAtPETqq1M5khvJNRaRf1A98nW8VSDoupgmYxM649tDvHIJdvgxF0uVIFWC03gebYg2DE5BY4QFaxtv7UrVHNOjjfC7WBVzU8741fTWDtGLZdnNlk/6HrccaI1jkdhvIikuzIM2sZnsNLfpx7QMMKOTkSEo0D+6aQCvGdpNkjUHaLcsZrJG5ApZyVI/JN5VVrdYKI8Bkdg//mjjRRs0QPtUn0bIm9J8tiNNGFqmKWxOTq62o45N+75I7OMm3wcN+1Pzkb5ig4Nph6pKXmym0trnmtOHW7k1PlCUOdvoGULpOPUJvmTgB8+SdEhjxQw/IRz1MVBWaOWXLOqTh6rZdAP/vKcnggCmHvGjt2d9eRDXUiXpmxcvhA/sdBCVQLx3Tc394ILcacMEVYA/FvzP/RjBbu7axkWtjoEAX5UL58drkU1w8sozEY7FZu5Y3Cd8aM3MfK29Y";
const SHARD_NSFW_CANDIDATE_PAYLOAD =
  "U2FsdGVkX18Yj66kFhuaJAD61eGPauSTJTW9srWvLTZ0Jy5iDPvFBh179DOnDu0vz/xLMriIcCgMpbFsjiBJODUfteNN9J7jP3AYmjh5l4QMZcmEyWDwCQhpVjKDMVR5UApqS0/fZJfMoPEaBbp6QMk/3su92CZCMnsammAx3fTVvSpBp0cqtFgzgaILOmqXLKzaa5/uwlzTOcDpS78pVQ==";
// The real tagData/tag_NSFW001.json and tags.json shape, from the actual
// archive: `{ tag_groups: [...], tag_tags: [...] }`, not `{ danbooru_tag }`.
// Content is invented for testing.
const GROUP_TREE_SHAPE_PAYLOAD =
  "U2FsdGVkX1/6TGAwunrgbrgD5qx3Yb8kX30lubl+IgBrdT3BqxN109xfD966zOyMQy9w0TSc/ED1kH9BL2UMk7kaOj4LFg3yrOmWivImmKDih5oSG2lr13RopauXNHosSwlC01G+/9sNYJrFRprXH8swgRIsoARwnCGhIbREgudif77baXrPvUDNU0Z4FR+/";
// color_id 0 and 4 mixed in one shard, for the category-mapping fix.
const SHARD_MIXED_CATEGORIES_PAYLOAD =
  "U2FsdGVkX1/AlUuZI3x+2c47bm+XY9ynGiUiIkQPMKyax84wZg4vHZNNWqrv41Oq6RpovG1z0/IAKxPghcLAn6U0DlpgfiC9Wm0NszOy7Fqi+RSbcJEhyt6buxzu2g5ZUmkAuyNx1xzVqGkHMwMyJ/mSwH+lYMg/g8rLKkDdzis4OWU+sXhIY6pBFqbFIMpUUTXn893FhKDgDNCSoGGLeVnesuVKzMNYC619mD6VufAjVxkX2j6KnheeS+l23YX2r7IphAsv+9R7deoobI4uWsf7xS1IhOUbWqXNbjJQ2IPHvvuz//WrWLAMea8S2FZbp+xC3E7UFOMmdV1d86hOYkmtPSnrDlpu2oMmO4lrolk=";
// A color_id (7) outside the known {0=general, 4=character} mapping.
const SHARD_UNKNOWN_COLOR_ID_PAYLOAD =
  "U2FsdGVkX19DHGoAKYLSXsdU4XmKTCpJhfIMxpV/t1kDb/qaYI0/c2VrsMjQh6C/Qx6P4wvuM7axa5pZJwQcR079AjxkXR4Uw+jPWdn24Y6tddvB1jMMQsj5Wjaj36UqnfVNy4s7bQIZpzcrOetnsGr5plPAGxCrWh13imO4ue6kpHh/++UX00yjrTSASSrG9dbIGJgOpEl2UX6Ba8RHKb9SNXwwkX2IQAuaQFyCSew=";
// A color_id (9) outside the known mapping, sandwiched with a valid entry —
// used to prove skip_invalid_entries also covers this failure mode.
const SHARD_UNKNOWN_COLOR_ID_WITH_GOOD_NEIGHBOR_PAYLOAD =
  "U2FsdGVkX19c8ZjyH5mHP67dz0GESa1R6aYzpHG5G7hlRW577GMMrPnfcWVkR4vaMkFd+s7ZWhapuIRo+KtYpVZ+r3lE1OJfI/+Sa5c7Jvw41oZoYGrzRzrFpyGCizufAt+T14KvUBCHfqqR/JO4KDELWuXE/4T3OisUsj80XDuPxWxHGHIAZjy7eySxIGWOQVUCYOTbLnXLaMV4nh0QNGrvlK/TlBB/NPKQ+xof84vV8LUwjTBBotC4JGLuRXQ5IFL5qZsJ4rquYT49emAJ5j3ZehgMJjFn/jJr4TNxCs/sTyYK7nwhLaojf1LEOh6lhikGnU1bOM47VD+ILJLK5Frt2PMU/w636eQjhITMrol7AFpPNM7WP7BrJzLQwK6V";

const shard = (label: string, payload: string, is_nsfw?: boolean): LegacyShardSpec => ({
  file_label: label,
  raw_base64: payload,
  ...(is_nsfw !== undefined ? { is_nsfw } : {}),
});

describe("LEGACY_V2_TAGDATA_PASSPHRASE", () => {
  it("matches the passphrase documented in the task brief", () => {
    expect(LEGACY_V2_TAGDATA_PASSPHRASE).toBe("a-very-secret-key-that-is-not-so-secret");
  });
});

describe("parse_legacy_shard", () => {
  it("maps danbooru_tag entries onto VocabularyRecordSchema", () => {
    const records = parse_legacy_shard(
      shard("shard_a.json", SHARD_A_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(records).toHaveLength(3);
    expect(records[0]).toEqual({
      record_id: 1,
      tag: "synthetic_tag_alpha",
      translation: "合成标签阿尔法",
      category: "general",
      popularity: 100,
      aliases: [],
      is_nsfw: false,
    });
  });

  it("drops the aliases count field entirely rather than carrying it as content", () => {
    const [record] = parse_legacy_shard(
      shard("shard_a.json", SHARD_A_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(record?.aliases).toEqual([]);
  });

  it("omits translation rather than emitting an empty string", () => {
    const records = parse_legacy_shard(
      shard("shard_a.json", SHARD_A_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );
    const no_translate = records.find((record) => record.tag === "synthetic_tag_no_translate");

    expect(no_translate?.translation).toBeUndefined();
    expect(no_translate).not.toHaveProperty("translation");
  });

  it("marks records from a shard flagged is_nsfw, and leaves others false", () => {
    const nsfw_records = parse_legacy_shard(
      shard("nsfw_candidate.json", SHARD_NSFW_CANDIDATE_PAYLOAD, true),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );
    const general_records = parse_legacy_shard(
      shard("shard_a.json", SHARD_A_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(nsfw_records.every((record) => record.is_nsfw)).toBe(true);
    expect(general_records.every((record) => !record.is_nsfw)).toBe(true);
  });

  it("maps color_id 0 to category general and color_id 4 to category character", () => {
    const records = parse_legacy_shard(
      shard("shard_mixed_categories.json", SHARD_MIXED_CATEGORIES_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(records.find((record) => record.tag === "synthetic_general_tag")?.category).toBe(
      "general",
    );
    expect(records.find((record) => record.tag === "synthetic_character_tag")?.category).toBe(
      "character",
    );
  });

  it("throws loudly on an unrecognized color_id, with the value in the message, instead of defaulting it", () => {
    expect(() =>
      parse_legacy_shard(
        shard("shard_unknown_color_id.json", SHARD_UNKNOWN_COLOR_ID_PAYLOAD),
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/unrecognized color_id 7/);
  });

  it("skip_invalid_entries: true also skips an unrecognized-color_id entry and reports it", () => {
    const skipped: { file_label: string; index: number; raw_entry: unknown; reason: string }[] = [];

    const records = parse_legacy_shard(
      shard(
        "shard_unknown_color_id_neighbor.json",
        SHARD_UNKNOWN_COLOR_ID_WITH_GOOD_NEIGHBOR_PAYLOAD,
      ),
      LEGACY_V2_TAGDATA_PASSPHRASE,
      {
        skip_invalid_entries: true,
        on_invalid_entry: (entry) => skipped.push(entry),
      },
    );

    expect(records.map((record) => record.tag)).toEqual(["synthetic_good_neighbor"]);
    expect(skipped).toHaveLength(1);
    expect(skipped[0]?.index).toBe(1);
    expect(skipped[0]?.reason).toMatch(/unrecognized color_id 9/);
    expect(skipped[0]?.raw_entry).toMatchObject({ color_id: 9 });
  });

  it("throws for a wrong passphrase (propagates LegacyDecryptionError)", () => {
    expect(() => parse_legacy_shard(shard("shard_a.json", SHARD_A_PAYLOAD), "wrong")).toThrow(
      LegacyDecryptionError,
    );
  });

  it("throws loudly when the decrypted shape is the tag_groups/tag_tags group tree, not danbooru_tag", () => {
    expect(() =>
      parse_legacy_shard(
        shard("tag_NSFW001.json", GROUP_TREE_SHAPE_PAYLOAD),
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/danbooru_tag/);
  });

  it("throws loudly on a malformed entry (missing required field) instead of skipping it", () => {
    expect(() =>
      parse_legacy_shard(
        shard("shard_malformed.json", SHARD_MALFORMED_ENTRY_PAYLOAD),
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/danbooru_tag/);
  });

  it("throws loudly on a single invalid entry (empty tag) among otherwise-valid entries by default", () => {
    expect(() =>
      parse_legacy_shard(
        shard("shard_with_junk.json", SHARD_WITH_ONE_JUNK_ENTRY_PAYLOAD),
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/danbooru_tag\[1\]/);
  });

  it("skip_invalid_entries: true skips only the invalid entry and reports it via on_invalid_entry", () => {
    const skipped: { file_label: string; index: number; raw_entry: unknown }[] = [];

    const records = parse_legacy_shard(
      shard("shard_with_junk.json", SHARD_WITH_ONE_JUNK_ENTRY_PAYLOAD),
      LEGACY_V2_TAGDATA_PASSPHRASE,
      {
        skip_invalid_entries: true,
        on_invalid_entry: (entry) => skipped.push(entry),
      },
    );

    expect(records.map((record) => record.tag)).toEqual([
      "synthetic_good_tag_alpha",
      "synthetic_good_tag_beta",
    ]);
    expect(skipped).toHaveLength(1);
    expect(skipped[0]?.file_label).toBe("shard_with_junk.json");
    expect(skipped[0]?.index).toBe(1);
    expect(skipped[0]?.raw_entry).toMatchObject({ id_index: 2, tag: "" });
  });
});

describe("extract_legacy_seed_records", () => {
  it("combines multiple shards and orders by popularity desc, then tag asc", () => {
    const records = extract_legacy_seed_records(
      [shard("shard_a.json", SHARD_A_PAYLOAD), shard("shard_b.json", SHARD_B_PAYLOAD)],
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(records.map((record) => record.tag)).toEqual([
      "synthetic_tag_alpha",
      "synthetic_tag_gamma",
      "synthetic_tag_beta",
      "synthetic_tag_no_translate",
    ]);
  });

  it("is deterministic across repeated extraction (stable order, not just stable set)", () => {
    const shards = [shard("shard_a.json", SHARD_A_PAYLOAD), shard("shard_b.json", SHARD_B_PAYLOAD)];

    const first = extract_legacy_seed_records(shards, LEGACY_V2_TAGDATA_PASSPHRASE);
    const second = extract_legacy_seed_records(shards, LEGACY_V2_TAGDATA_PASSPHRASE);

    expect(first).toEqual(second);
  });

  it("throws loudly on a duplicate tag across shards instead of silently overwriting", () => {
    expect(() =>
      extract_legacy_seed_records(
        [
          shard("shard_a.json", SHARD_A_PAYLOAD),
          shard("dup_tag.json", SHARD_DUPLICATE_TAG_PAYLOAD),
        ],
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/Duplicate tag/);
  });

  it("throws loudly on a duplicate record_id across shards", () => {
    expect(() =>
      extract_legacy_seed_records(
        [shard("shard_a.json", SHARD_A_PAYLOAD), shard("dup_id.json", SHARD_DUPLICATE_ID_PAYLOAD)],
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).toThrow(/Duplicate record_id/);
  });

  it("propagates skip_invalid_entries across multiple shards", () => {
    const records = extract_legacy_seed_records(
      [
        shard("shard_b.json", SHARD_B_PAYLOAD),
        shard("shard_with_junk.json", SHARD_WITH_ONE_JUNK_ENTRY_PAYLOAD),
      ],
      LEGACY_V2_TAGDATA_PASSPHRASE,
      { skip_invalid_entries: true },
    );

    expect(records.map((record) => record.tag).sort()).toEqual(
      ["synthetic_good_tag_alpha", "synthetic_good_tag_beta", "synthetic_tag_gamma"].sort(),
    );
  });

  it("returns an empty list for an empty shard list", () => {
    expect(extract_legacy_seed_records([], LEGACY_V2_TAGDATA_PASSPHRASE)).toEqual([]);
  });
});

describe("extract_legacy_seed_from_files", () => {
  let temp_dir: string;

  beforeEach(async () => {
    temp_dir = await mkdtemp(join(tmpdir(), "vocab-seed-test-"));
  });

  afterEach(async () => {
    await rm(temp_dir, { recursive: true, force: true });
  });

  it("reads shard files from disk and extracts records", async () => {
    const shard_a_path = join(temp_dir, "danbooru_001.json");
    const shard_b_path = join(temp_dir, "danbooru_002.json");
    await writeFile(shard_a_path, SHARD_A_PAYLOAD, "utf8");
    await writeFile(shard_b_path, SHARD_B_PAYLOAD, "utf8");

    const records = await extract_legacy_seed_from_files(
      [{ path: shard_a_path }, { path: shard_b_path }],
      LEGACY_V2_TAGDATA_PASSPHRASE,
    );

    expect(records).toHaveLength(4);
  });

  it("fails loudly (rejects) instead of silently skipping an unreadable file", async () => {
    await expect(
      extract_legacy_seed_from_files(
        [{ path: join(temp_dir, "does_not_exist.json") }],
        LEGACY_V2_TAGDATA_PASSPHRASE,
      ),
    ).rejects.toThrow();
  });
});
