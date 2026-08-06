import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  VocabularyManifestSchema,
  type VocabularySearchResult,
  type VocabularyWorkerResponse,
} from "@tavern-canvas/contracts";
import type { ShardByteSource } from "@tavern-canvas/vocabulary";
import { EXIT_SUCCESS, run_build, run_verify } from "@tavern-canvas/vocabulary-builder";
import { afterEach, describe, expect, it } from "vitest";

import { VocabularyWorkerEngine } from "./vocabulary_worker.js";

/**
 * Proves the encoder (Task 2's real builder) and the decoder (this Worker
 * engine) agree on the wire: builds an actual package on disk with the
 * committed `tools/vocabulary_builder` CLI entry points (not a
 * reimplementation), serves it through a disk-backed ShardByteSource, and
 * runs real VocabularyWorkerEngine queries against it. If either side's
 * shard-addressing convention, payload shape, or normalization drifts, this
 * test fails -- it is not exercising fakes anywhere past the filesystem.
 *
 * Lives here (not packages/vocabulary) because VocabularyWorkerEngine is
 * owned by apps/extension; a packages/vocabulary test cannot import it
 * without an upward, layering-violating dependency.
 */

const SOURCE_RECORDS = [
  { tag: "cat", category: "animal", popularity: 100 },
  { tag: "catalog", category: "object", popularity: 50 },
  { tag: "caterpillar", category: "animal", popularity: 10 },
  { tag: "dog", aliases: ["puppy"], category: "animal", popularity: 80 },
  { tag: "dolphin", category: "animal", popularity: 20 },
  { tag: "sakura", translation: "桜花", category: "plant", popularity: 60 },
  { tag: "sunset", aliases: ["dusk"], category: "scene", popularity: 40 },
  { tag: "sunrise", category: "scene", popularity: 30 },
  { tag: "ocean_view", category: "scene", popularity: 15 },
  { tag: "torii", translation: "鳥居", category: "structure", popularity: 25 },
  { tag: "moon", category: "scene", popularity: 90 },
  {
    tag: "star_sky",
    translation: "星空",
    aliases: ["starry sky"],
    category: "scene",
    popularity: 70,
  },
];

function create_disk_shard_byte_source(directory: string): ShardByteSource {
  return {
    async manifest() {
      const text = await readFile(join(directory, "manifest.json"), "utf8");
      return VocabularyManifestSchema.parse(JSON.parse(text));
    },
    async shard_bytes(path) {
      return readFile(join(directory, path));
    },
  };
}

let request_counter = 0;
function next_request_id(): string {
  request_counter += 1;
  return `00000000-0000-4000-8000-${String(request_counter).padStart(12, "0")}`;
}

async function initialize(engine: VocabularyWorkerEngine): Promise<void> {
  const responses: VocabularyWorkerResponse[] = [];
  await engine.handle({ type: "initialize", request_id: next_request_id() }, (response) => {
    responses.push(response);
  });
  const ready = responses.find((response) => response.type === "ready");
  if (ready === undefined) {
    throw new Error(`expected a ready response, got: ${JSON.stringify(responses)}`);
  }
}

async function query(
  engine: VocabularyWorkerEngine,
  text: string,
): Promise<VocabularySearchResult[]> {
  const responses: VocabularyWorkerResponse[] = [];
  await engine.handle({ type: "query", request_id: next_request_id(), query: text }, (response) => {
    responses.push(response);
  });
  const complete = responses.at(-1);
  if (complete?.type !== "complete") {
    throw new Error(
      `expected a complete response for query "${text}", got: ${JSON.stringify(responses)}`,
    );
  }
  return complete.results;
}

describe("builder <-> Worker integration (real Task 2 output)", () => {
  let scratch_directory: string | null = null;

  afterEach(async () => {
    if (scratch_directory !== null) {
      await rm(scratch_directory, { recursive: true, force: true });
      scratch_directory = null;
    }
  });

  it("answers real Worker-engine queries against a package the real builder produced", async () => {
    scratch_directory = await mkdtemp(join(tmpdir(), "vocabulary-builder-integration-"));
    const input_path = join(scratch_directory, "source.jsonl");
    const output_directory = join(scratch_directory, "package");
    await writeFile(input_path, SOURCE_RECORDS.map((record) => JSON.stringify(record)).join("\n"));

    const build_exit_code = await run_build([
      "--input",
      input_path,
      "--output",
      output_directory,
      "--package-id",
      "integration-test",
      "--data-version",
      "1.0.0",
      "--minimum-extension-version",
      "3.0.0",
      "--changelog",
      "builder/worker integration test fixture",
    ]);
    expect(build_exit_code).toBe(EXIT_SUCCESS);

    // Independent re-verification pass -- the encoder side of the contract
    // proof, on top of write_vocabulary_package's own internal self-check.
    const verify_exit_code = await run_verify(["--package", output_directory]);
    expect(verify_exit_code).toBe(EXIT_SUCCESS);

    const engine = new VocabularyWorkerEngine(create_disk_shard_byte_source(output_directory), {
      memory_mode: "desktop",
    });
    await initialize(engine);

    const exact = await query(engine, "cat");
    expect(exact[0]).toMatchObject({ display_text: "cat", match_kind: "exact" });
    expect(exact.map((result) => result.display_text)).toEqual(
      expect.arrayContaining(["catalog", "caterpillar"]),
    );

    const prefix = await query(engine, "sun");
    expect(prefix.map((result) => result.display_text)).toEqual(["sunset", "sunrise"]);

    const alias = await query(engine, "puppy");
    expect(alias[0]).toMatchObject({ display_text: "dog", match_kind: "alias" });

    const alias_latin = await query(engine, "starry sky");
    expect(alias_latin[0]).toMatchObject({ display_text: "star_sky", match_kind: "alias" });

    const translation_sakura = await query(engine, "桜花");
    expect(translation_sakura[0]).toMatchObject({
      display_text: "sakura",
      match_kind: "translation",
    });

    const translation_torii = await query(engine, "鳥居");
    expect(translation_torii[0]).toMatchObject({
      display_text: "torii",
      match_kind: "translation",
    });

    const translation_star = await query(engine, "星空");
    expect(translation_star[0]).toMatchObject({
      display_text: "star_sky",
      match_kind: "translation",
    });

    // "mook" (typo for "moon") shares no prefix with any tag, so this only
    // resolves through the trigram phase -- and only if the Worker groups
    // trigram shards exactly the way the builder wrote them.
    const typo = await query(engine, "mook");
    expect(typo.map((result) => result.display_text)).toEqual(["moon"]);
    expect(typo[0]?.match_kind).toBe("trigram");

    const hot = await query(engine, "");
    expect(hot[0]).toMatchObject({ display_text: "cat", match_kind: "hot" });
    expect(hot.map((result) => result.display_text).slice(0, 3)).toEqual(["cat", "moon", "dog"]);
  });
});
