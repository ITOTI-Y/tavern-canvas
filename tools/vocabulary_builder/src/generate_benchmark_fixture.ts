import { createWriteStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  normalize_vocabulary_search_key,
  type VocabularyMatchKind,
} from "@tavern-canvas/contracts";

import { EXIT_INVALID_INPUT, EXIT_IO_FAILURE, EXIT_SUCCESS } from "./index.js";

// Deterministic 500,000-record synthetic vocabulary from a fixed seed; fixture, built package and
// query oracles regenerate byte-identically. Point `--output`/`--queries-output` at gitignored
// `output/benchmark/`.

class GenerateBenchmarkError extends Error {}

function required<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new GenerateBenchmarkError(message);
  }
  return value;
}

interface GenerateBenchmarkOptions {
  readonly records: number;
  readonly seed: number;
  readonly output: string;
  readonly queries_output: string;
}

function parse_args(argv: readonly string[]): GenerateBenchmarkOptions {
  let records: number | undefined;
  let seed: number | undefined;
  let output: string | undefined;
  let queries_output: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--records") {
      records = Number.parseInt(String(value), 10);
      index += 1;
    } else if (flag === "--seed") {
      seed = Number.parseInt(String(value), 10);
      index += 1;
    } else if (flag === "--output") {
      output = value;
      index += 1;
    } else if (flag === "--queries-output") {
      queries_output = value;
      index += 1;
    } else {
      throw new GenerateBenchmarkError(`unrecognized argument: ${flag ?? "<none>"}`);
    }
  }

  if (records === undefined || !Number.isInteger(records) || records <= 0) {
    throw new GenerateBenchmarkError("missing or invalid --records (positive integer required)");
  }
  if (seed === undefined || !Number.isInteger(seed)) {
    throw new GenerateBenchmarkError("missing or invalid --seed (integer required)");
  }
  if (output === undefined) {
    throw new GenerateBenchmarkError("missing required flag --output");
  }

  return {
    records,
    seed,
    output,
    queries_output: queries_output ?? default_queries_output_path(output),
  };
}

function default_queries_output_path(output_path: string): string {
  return resolve(dirname(output_path), "known_queries.json");
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const CATEGORIES = ["character", "general", "scene", "object", "action", "style"] as const;
const SYLLABLE_LENGTH = 4;
const CJK_BASE_CODE_POINT = 0x4e00;
const CJK_SUFFIX_POOL_SIZE = 2048;
// Translations are 4 code points: 2 shared prefix points from a small pool, so many translations
// share an alias-shard group_key, then 2 unique suffix points. A 2-point translation would give
// nearly one alias shard per translation.
const CJK_PREFIX_POOL_SIZE = 50;
const ALIAS_PROBABILITY = 0.15;
const TRANSLATION_PROBABILITY = 0.08;

// Disjoint index residue classes (mod 11) reserve non-overlapping record pools per oracle bucket,
// so no popularity sentinel is overwritten by another bucket.
const RESIDUE_MODULUS = 11;
const PREFIX_RESIDUE = 0;
const TYPO_RESIDUE = 3;
const ALIAS_PROBE_RESIDUE = 5;
const TRANSLATION_PROBE_RESIDUE = 7;
const EXACT_PROBE_RESIDUE = 9;
const HOT_RESIDUE = 1;

const PREFIX_GROUP2_PROBE_COUNT = 65;
const PREFIX_GROUP3_PROBE_COUNT = 65;
const TYPO_PROBE_COUNT = 150;
const ALIAS_PROBE_COUNT = 40;
const TRANSLATION_PROBE_COUNT = 40;
const EXACT_PROBE_COUNT = 10;

// Sentinel popularities exceed the ambient range (under 200,000), so a designated record outranks
// every candidate in its match tier and each oracle's top-1 holds by construction (MATCH_TIER
// dominance plus popularity tie-break in result_ranker.ts).
const SENTINEL_BASE = 500_000_000;
const HOT_SENTINEL_POPULARITY = 999_999_999;

interface MutableRecord {
  tag: string;
  translation?: string;
  aliases: string[];
  category: string;
  popularity: number;
}

interface QueryOracleEntry {
  readonly query: string;
  readonly bucket: "prefix" | "content_fuzzy" | "exact" | "hot";
  readonly subtype: "prefix2" | "prefix3" | "typo" | "alias" | "translation" | "exact" | "hot";
  readonly expected_match_kind: VocabularyMatchKind;
  readonly expected_display_text: string;
}

function random_letters(rng: () => number, length: number): string {
  let text = "";
  for (let index = 0; index < length; index += 1) {
    text += required(LETTERS[Math.floor(rng() * LETTERS.length)], "letter index out of range");
  }
  return text;
}

/** 4 code points from CJK Unified Ideographs: 2 shared prefix points (index mod CJK_PREFIX_POOL_SIZE) and 2 suffix points, making the translation injective in `index`. */
function cjk_translation(index: number): string {
  const prefix_group = index % CJK_PREFIX_POOL_SIZE;
  const suffix = Math.floor(index / CJK_PREFIX_POOL_SIZE);
  const prefix_high = Math.floor(prefix_group / 8);
  const prefix_low = prefix_group % 8;
  const suffix_high = Math.floor(suffix / CJK_SUFFIX_POOL_SIZE) % CJK_SUFFIX_POOL_SIZE;
  const suffix_low = suffix % CJK_SUFFIX_POOL_SIZE;
  return String.fromCodePoint(
    CJK_BASE_CODE_POINT + prefix_high,
    CJK_BASE_CODE_POINT + 8 + prefix_low,
    CJK_BASE_CODE_POINT + 16 + suffix_high,
    CJK_BASE_CODE_POINT + 16 + CJK_SUFFIX_POOL_SIZE + suffix_low,
  );
}

function typo_variant(tag: string): string {
  const first = required(tag.codePointAt(0), "cannot build a typo variant of an empty tag");
  const first_letter_code = required(LETTERS.codePointAt(0), "LETTERS must be non-empty");
  const shifted = required(
    LETTERS[(first - first_letter_code + 13) % LETTERS.length],
    "typo shift produced an out-of-range letter index",
  );
  return shifted + tag.slice(1);
}

function generate_records(options: GenerateBenchmarkOptions): MutableRecord[] {
  const rng = mulberry32(options.seed);
  const records: MutableRecord[] = [];

  for (let index = 0; index < options.records; index += 1) {
    const syllable_a = random_letters(rng, SYLLABLE_LENGTH);
    const syllable_b = random_letters(rng, SYLLABLE_LENGTH);
    const tag = `${syllable_a}_${syllable_b}_${index.toString(36)}`;
    const category = CATEGORIES[Math.floor(rng() * CATEGORIES.length)] ?? "general";
    const popularity = Math.floor(rng() * rng() * 200_000);

    const record: MutableRecord = { tag, aliases: [], category, popularity };

    if (rng() < ALIAS_PROBABILITY) {
      record.aliases = [`${syllable_b}_${syllable_a}_alias_${index.toString(36)}`];
    }
    if (rng() < TRANSLATION_PROBABILITY) {
      record.translation = cjk_translation(index);
    }

    records.push(record);
  }

  return records;
}

interface GroupIndex {
  readonly by_group2: Map<string, number[]>;
  readonly by_group3: Map<string, number[]>;
}

function build_group_index(records: readonly MutableRecord[]): GroupIndex {
  const by_group2 = new Map<string, number[]>();
  const by_group3 = new Map<string, number[]>();

  records.forEach((record, index) => {
    const normalized = normalize_vocabulary_search_key(record.tag);
    const code_points = Array.from(normalized);
    const group2 = code_points.slice(0, 2).join("");
    const group3 = code_points.slice(0, 3).join("");

    const group2_members = by_group2.get(group2) ?? [];
    group2_members.push(index);
    by_group2.set(group2, group2_members);

    const group3_members = by_group3.get(group3) ?? [];
    group3_members.push(index);
    by_group3.set(group3, group3_members);
  });

  return { by_group2, by_group3 };
}

function select_prefix_probes(
  records: MutableRecord[],
  group_index: GroupIndex,
  next_sentinel: () => number,
): QueryOracleEntry[] {
  const oracles: QueryOracleEntry[] = [];
  const eligible = (index: number) => index % RESIDUE_MODULUS === PREFIX_RESIDUE;

  // prefix3 winners are also candidates for their parent prefix2 query. `used_winner_indices` keeps
  // every winner's record unique, and prefix2 groups are processed first so their sentinels
  // (decreasing monotonically) always exceed every prefix3 sentinel.
  const used_winner_indices = new Set<number>();

  const pick_from = (map: Map<string, number[]>, subtype: "prefix2" | "prefix3", limit: number) => {
    const sorted_keys = [...map.keys()].sort();
    let picked = 0;
    for (const key of sorted_keys) {
      if (picked >= limit) {
        break;
      }
      const members = (map.get(key) ?? []).filter(eligible);
      if (members.length < 2) {
        continue;
      }
      const winner_index = members.find((index) => !used_winner_indices.has(index));
      if (winner_index === undefined) {
        continue;
      }
      used_winner_indices.add(winner_index);
      const winner = required(records[winner_index], "winner_index must index into records");
      winner.popularity = next_sentinel();
      oracles.push({
        query: key,
        bucket: "prefix",
        subtype,
        expected_match_kind: "prefix",
        expected_display_text: winner.tag,
      });
      picked += 1;
    }
  };

  pick_from(group_index.by_group2, "prefix2", PREFIX_GROUP2_PROBE_COUNT);
  pick_from(group_index.by_group3, "prefix3", PREFIX_GROUP3_PROBE_COUNT);
  return oracles;
}

function select_typo_probes(
  records: MutableRecord[],
  next_sentinel: () => number,
): QueryOracleEntry[] {
  const oracles: QueryOracleEntry[] = [];
  for (let index = 0; index < records.length && oracles.length < TYPO_PROBE_COUNT; index += 1) {
    if (index % RESIDUE_MODULUS !== TYPO_RESIDUE) {
      continue;
    }
    const record = required(records[index], "index must be within records bounds");
    record.popularity = next_sentinel();
    oracles.push({
      query: typo_variant(record.tag),
      bucket: "content_fuzzy",
      subtype: "typo",
      expected_match_kind: "trigram",
      expected_display_text: record.tag,
    });
  }
  return oracles;
}

function select_alias_probes(records: readonly MutableRecord[]): QueryOracleEntry[] {
  const oracles: QueryOracleEntry[] = [];
  for (let index = 0; index < records.length && oracles.length < ALIAS_PROBE_COUNT; index += 1) {
    if (index % RESIDUE_MODULUS !== ALIAS_PROBE_RESIDUE) {
      continue;
    }
    const record = required(records[index], "index must be within records bounds");
    const alias = record.aliases[0];
    if (alias === undefined) {
      continue;
    }
    oracles.push({
      query: alias,
      bucket: "content_fuzzy",
      subtype: "alias",
      expected_match_kind: "alias",
      expected_display_text: record.tag,
    });
  }
  return oracles;
}

function select_translation_probes(records: readonly MutableRecord[]): QueryOracleEntry[] {
  const oracles: QueryOracleEntry[] = [];
  for (
    let index = 0;
    index < records.length && oracles.length < TRANSLATION_PROBE_COUNT;
    index += 1
  ) {
    if (index % RESIDUE_MODULUS !== TRANSLATION_PROBE_RESIDUE) {
      continue;
    }
    const record = required(records[index], "index must be within records bounds");
    if (record.translation === undefined) {
      continue;
    }
    oracles.push({
      query: record.translation,
      bucket: "content_fuzzy",
      subtype: "translation",
      expected_match_kind: "translation",
      expected_display_text: record.tag,
    });
  }
  return oracles;
}

function select_exact_probes(records: readonly MutableRecord[]): QueryOracleEntry[] {
  const oracles: QueryOracleEntry[] = [];
  for (let index = 0; index < records.length && oracles.length < EXACT_PROBE_COUNT; index += 1) {
    if (index % RESIDUE_MODULUS !== EXACT_PROBE_RESIDUE) {
      continue;
    }
    const record = required(records[index], "index must be within records bounds");
    oracles.push({
      query: record.tag,
      bucket: "exact",
      subtype: "exact",
      expected_match_kind: "exact",
      expected_display_text: record.tag,
    });
  }
  return oracles;
}

function select_hot_probe(records: MutableRecord[]): QueryOracleEntry {
  for (let index = 0; index < records.length; index += 1) {
    if (index % RESIDUE_MODULUS !== HOT_RESIDUE) {
      continue;
    }
    const record = required(records[index], "index must be within records bounds");
    record.popularity = HOT_SENTINEL_POPULARITY;
    return {
      query: "",
      bucket: "hot",
      subtype: "hot",
      expected_match_kind: "hot",
      expected_display_text: record.tag,
    };
  }
  throw new GenerateBenchmarkError("no eligible record for the hot-query probe");
}

async function write_jsonl(records: readonly MutableRecord[], output_path: string): Promise<void> {
  await mkdir(dirname(output_path), { recursive: true });
  const stream = createWriteStream(output_path, { encoding: "utf8" });
  const BATCH_SIZE = 10_000;

  try {
    for (let start = 0; start < records.length; start += BATCH_SIZE) {
      const batch = records.slice(start, start + BATCH_SIZE);
      const chunk = `${batch.map((record) => JSON.stringify(record)).join("\n")}\n`;
      if (!stream.write(chunk)) {
        await new Promise<void>((resolve_drain) => stream.once("drain", resolve_drain));
      }
    }
    await new Promise<void>((resolve_end, reject_end) => {
      stream.end((error: Error | null | undefined) => {
        if (error) {
          reject_end(error);
          return;
        }
        resolve_end();
      });
    });
  } catch (error) {
    stream.destroy();
    throw error;
  }
}

export async function run_generate_benchmark(argv: readonly string[]): Promise<number> {
  let options: GenerateBenchmarkOptions;
  try {
    options = parse_args(argv);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return EXIT_INVALID_INPUT;
  }

  try {
    const records = generate_records(options);
    const group_index = build_group_index(records);

    let sentinel_counter = 0;
    const next_sentinel = () => SENTINEL_BASE - (sentinel_counter += 1);

    const queries: QueryOracleEntry[] = [
      ...select_prefix_probes(records, group_index, next_sentinel),
      ...select_typo_probes(records, next_sentinel),
      ...select_alias_probes(records),
      ...select_translation_probes(records),
      ...select_exact_probes(records),
      select_hot_probe(records),
    ];

    const output_path = resolve(options.output);
    const queries_output_path = resolve(options.queries_output);
    await write_jsonl(records, output_path);
    await mkdir(dirname(queries_output_path), { recursive: true });
    await writeFile(
      queries_output_path,
      `${JSON.stringify({ seed: options.seed, record_count: options.records, queries }, null, 2)}\n`,
    );

    console.log(
      `generate_benchmark_fixture: records=${String(records.length)} queries=${String(queries.length)} ` +
        `output=${output_path} queries_output=${queries_output_path}`,
    );
    return EXIT_SUCCESS;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return EXIT_IO_FAILURE;
  }
}

const entry_path = process.argv[1];
if (entry_path !== undefined && resolve(entry_path) === fileURLToPath(import.meta.url)) {
  process.exitCode = await run_generate_benchmark(process.argv.slice(2));
}
