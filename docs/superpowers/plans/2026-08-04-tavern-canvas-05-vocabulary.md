# TavernCanvas Stage 05: Vocabulary Package and Search Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `executing-plans` and `test-driven-development`. Complete Stages 01–04 first. Run large synthetic benchmarks only after correctness tests pass.

**Goal:** Replace bundled monolithic tag JSON with an independently versioned, hash-verified vocabulary package and a cancellable Web Worker search path that remains responsive with 500,000 records on mobile.

**Architecture:** A deterministic Node builder normalizes source records and emits MessagePack plus gzip shards for prefix, alias, trigram, detail, and hot indexes. The extension updater stages changed shards in IndexedDB, verifies them, and atomically activates a data version. A Worker performs tiered search with an explicit LRU budget.

**Tech Stack:** TypeScript 6.0.3, Zod 4, `@msgpack/msgpack` 3.1.3, `@noble/hashes` 2.2.0, IndexedDB, Web Workers, Vitest 4, and Playwright benchmark harnesses.

---

## Task 1: Define vocabulary records, manifests, and Worker messages

**Files:**

- Create: `packages/contracts/src/vocabulary.ts`
- Create: `packages/contracts/src/vocabulary_worker.ts`
- Test: `packages/contracts/src/vocabulary.test.ts`
- Modify: `packages/contracts/src/index.ts`

**Step 1: Write failing record tests**

Define a strict canonical source record:

```ts
export const VocabularyRecordSchema = z.strictObject({
  record_id: z.number().int().nonnegative(),
  tag: z.string().trim().min(1).max(256),
  translation: z.string().trim().max(512).optional(),
  aliases: z.array(z.string().trim().min(1).max(256)).max(32).default([]),
  category: z.string().trim().max(64).optional(),
  popularity: z.number().int().nonnegative().default(0),
  description: z.string().trim().max(4_096).optional(),
});
```

Test duplicate record IDs, duplicate normalized tags, empty aliases, HTML/script strings treated as plain text, overlong fields, and stable NFKC normalization. Do not strip user-visible original text; store separate normalized search keys.

**Step 2: Write failing manifest tests**

The manifest schema includes package ID, schema version `1`, semantic data version, changelog, record count, compressed size, minimum extension version, and strict shard/index entries with SHA-256 and exact byte length. Reject duplicate shard IDs, unknown index kinds, traversal paths, mixed package IDs, unsupported schema, and invalid semver.

Index kinds are exactly:

```ts
export const VocabularyIndexKindSchema = z.enum(["prefix", "alias", "trigram", "detail", "hot"]);
```

**Step 3: Define Worker protocol**

Requests are discriminated by `type`: `initialize`, `query`, `next_page`, `cancel`, `import_source`, `dispose`. Responses are `ready`, `partial_results`, `complete`, `progress`, and `error`. Every request/response except `ready` includes a UUID `request_id`. Search results contain IDs, display text, category, popularity, match kind, and score; they never return full shard objects.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/contracts test -- src/vocabulary.test.ts
pnpm --filter @tavern-canvas/contracts typecheck
git add packages/contracts
git commit -m "feat(contracts): define vocabulary package protocol"
```

---

## Task 2: Build deterministic vocabulary packages

**Files:**

- Create: `tools/vocabulary_builder/package.json`
- Create: `tools/vocabulary_builder/tsconfig.json`
- Create: `tools/vocabulary_builder/src/normalize_record.ts`
- Create: `tools/vocabulary_builder/src/read_source.ts`
- Create: `tools/vocabulary_builder/src/build_prefix_index.ts`
- Create: `tools/vocabulary_builder/src/build_alias_index.ts`
- Create: `tools/vocabulary_builder/src/build_trigram_index.ts`
- Create: `tools/vocabulary_builder/src/build_detail_shards.ts`
- Create: `tools/vocabulary_builder/src/write_package.ts`
- Create: `tools/vocabulary_builder/src/index.ts`
- Test: `tools/vocabulary_builder/src/builder.test.ts`
- Create: `tests/fixtures/vocabulary/raw_small_vocabulary.jsonl`
- Create: `tests/fixtures/vocabulary/expected_manifest.json`
- Local only: `docs/_dev/DATA.md`

**Step 0: Register source and generated data**

Update ignored local `docs/_dev/DATA.md` with the vocabulary source JSONL schema, generated package manifest/shard schema, flow `source JSONL -> vocabulary_builder -> extension baseline/update channel -> vocabulary Worker`, status, and quality. Use data naming categories such as `raw_vocabulary_tags.jsonl` and `processed_vocabulary_baseline_v1/`.

**Step 1: Write failing deterministic-builder tests**

Given the small fixture, assert:

- two builds produce byte-identical files and manifest;
- source order does not affect output;
- record IDs are reassigned deterministically by normalized tag, then original tag;
- duplicate normalized tags merge aliases/translations without data loss or throw on conflicting primary content according to a documented rule;
- prefix, alias, trigram, hot, and detail lookups return expected IDs;
- every manifest hash and size matches disk bytes;
- malformed or over-limit source fails before output replacement;
- output is written to a staging directory and atomically renamed only after all checks pass.

**Step 2: Implement normalization and indexes**

Search normalization performs NFKC, lowercase, underscore-to-space conversion, whitespace collapse, and trim. Original tag/translation/description remain unchanged for display.

Index layout:

- prefix shards group by the first two normalized Unicode code points and store sorted `(key, record_id, popularity)` tuples;
- alias shards use the same layout for normalized aliases and translations;
- trigram shards map each normalized 3-code-point sequence to delta-encoded sorted record IDs;
- detail shards contain at most 4,096 consecutive records;
- hot shards contain descending popularity lists per category and globally.

Serialize each logical shard with MessagePack, then gzip with fixed metadata so output bytes are reproducible. The builder writes no timestamp inside shard content; `created_at` is excluded from reproducibility checks and the release pipeline supplies it only in release metadata.

**Step 3: Implement the CLI**

```text
vocabulary_builder build --input <jsonl> --output <directory> --package-id <id> --data-version <semver> --minimum-extension-version <semver> --changelog <text>
vocabulary_builder verify --package <directory>
```

Use explicit exit codes: `0` success, `2` invalid input, `3` verification failure, `4` I/O failure. Never partially overwrite a valid package.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/vocabulary-builder test
pnpm --filter @tavern-canvas/vocabulary-builder build
node tools/vocabulary_builder/dist/index.js build --input tests/fixtures/vocabulary/raw_small_vocabulary.jsonl --output output/vocabulary_test --package-id baseline --data-version 1.0.0 --minimum-extension-version 3.0.0 --changelog initial
node tools/vocabulary_builder/dist/index.js verify --package output/vocabulary_test
git add tools/vocabulary_builder tests/fixtures/vocabulary
git commit -m "feat(vocabulary): add deterministic package builder"
```

---

## Task 3: Implement package verification, staging, and atomic update

**Files:**

- Create: `packages/vocabulary/package.json`
- Create: `packages/vocabulary/tsconfig.json`
- Create: `packages/vocabulary/src/package_client.ts`
- Create: `packages/vocabulary/src/package_verifier.ts`
- Create: `packages/vocabulary/src/package_store.ts`
- Create: `packages/vocabulary/src/package_updater.ts`
- Test: `packages/vocabulary/src/package_verifier.test.ts`
- Test: `packages/vocabulary/src/package_updater.test.ts`
- Modify: `packages/vocabulary/src/index.ts`

**Step 1: Write failing verifier tests**

Test valid package, unsupported schema, extension version too low, duplicate paths, wrong byte length, wrong hash, corrupt gzip, corrupt MessagePack, wrong shard kind, excess decompressed size, and HTML/script payload stored as text. Verification must consume bounded streams and reject declared/compressed/decompressed size inconsistencies.

**Step 2: Write failing updater tests**

Cover:

- no update when active and remote data versions/hashes match;
- only changed hashes download;
- unchanged shards are referenced into staging without re-download;
- every download goes to `staging:<uuid>` records;
- interruption or one bad shard keeps the old active version;
- successful verification sets `ready` but does not delete old version;
- active pointer changes in one transaction;
- old version remains until the new version completes one successful Worker query;
- cleanup removes unreferenced stale staging data only;
- concurrent update attempts serialize under one update lock.

**Step 3: Implement update flow**

`PackageClient` retrieves a manifest and bounded shard streams from a configured HTTPS update base URL or bundled relative baseline path. Runtime URLs cannot come from package content. `PackageUpdater` emits progress with downloaded/total bytes and stable phase codes.

After the first successful query on the new version, mark it `confirmed` and permit deletion of older unpinned versions. Failure reselects the prior confirmed version.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/vocabulary test -- src/package_verifier.test.ts src/package_updater.test.ts
pnpm --filter @tavern-canvas/vocabulary typecheck
git add packages/vocabulary pnpm-lock.yaml
git commit -m "feat(vocabulary): add atomic package updater"
```

---

## Task 4: Implement tiered Worker search and bounded LRU

**Files:**

- Create: `packages/vocabulary/src/search/query_normalizer.ts`
- Create: `packages/vocabulary/src/search/query_planner.ts`
- Create: `packages/vocabulary/src/search/result_ranker.ts`
- Create: `packages/vocabulary/src/search/shard_lru.ts`
- Create: `apps/extension/src/workers/vocabulary_worker.ts`
- Create: `apps/extension/src/modules/vocabulary/vocabulary_client.ts`
- Test: `packages/vocabulary/src/search/query_planner.test.ts`
- Test: `packages/vocabulary/src/search/result_ranker.test.ts`
- Test: `packages/vocabulary/src/search/shard_lru.test.ts`
- Test: `apps/extension/src/modules/vocabulary/vocabulary_client.test.ts`

**Step 1: Write failing query-planner and ranking tests**

Search phases are:

```text
exact/hot -> prefix -> alias/translation -> trigram candidates -> detail hydration
```

Test exact tag before prefix, primary tag before alias/translation, popularity as tie-breaker, deterministic score/order, CJK translation search, underscore/space equivalence, typo trigram recall, empty query hot results, category filter, duplicate result elimination, and a maximum of 200 detail records per request.

**Step 2: Write failing cancellation/pagination tests**

- client debounce is 120 ms;
- a new query sends `cancel` for the previous request ID;
- stale Worker responses are ignored;
- first page is at most 50 results;
- `next_page` continues a stable result set without duplicates;
- exact/prefix partial results may arrive before fuzzy results;
- cancellation stops further shard loads and detail hydration;
- disposing the module terminates the Worker and rejects pending promises with `cancelled`.

Use fake timers; do not wait 120 real milliseconds.

**Step 3: Write failing LRU tests**

Unknown/low-memory mode uses 16 MiB; desktop mode uses 64 MiB. Track decoded byte size, not compressed file size. Under pressure, evict trigram then detail shards before active prefix/alias shards. Pinned manifest metadata and the current result page remain resident. One shard may temporarily exceed budget only while decoding, then must be released if not retained.

**Step 4: Implement Worker and client**

The Worker owns IndexedDB package reads, decompression, MessagePack decode, indexes, cancellation flags, result cursors, and LRU. Main thread receives compact result DTOs only. It never receives a full 500,000-record array.

`VocabularyClient` owns debounce and request correlation. Vue components in Stage 06 depend on this client capability, not Worker APIs.

**Step 5: Verify and commit**

```bash
pnpm --filter @tavern-canvas/vocabulary test -- src/search
pnpm --filter @tavern-canvas/extension test -- src/modules/vocabulary
pnpm typecheck
git add packages/vocabulary apps/extension
git commit -m "feat(vocabulary): add cancellable Worker search"
```

---

## Task 5: Add user import and baseline package production

**Files:**

- Create: `packages/vocabulary/src/import/import_source.ts`
- Create: `packages/vocabulary/src/import/import_builder.ts`
- Test: `packages/vocabulary/src/import/import_builder.test.ts`
- Create: `apps/extension/public/vocabulary/baseline/manifest.json`
- Create: `apps/extension/public/vocabulary/baseline/*.msgpack.gz`
- Create: `data/vocabulary/raw_vocabulary_tags.jsonl` only if licensing and provenance checks permit committing source data
- Create: `data/vocabulary/LICENSES.json`
- Modify: `apps/extension/vite.config.ts`
- Modify: `.github/workflows/ci.yml`

**Step 1: Establish provenance before importing legacy data**

Inspect legacy dataset headers, repository license, and upstream source metadata. Record each dataset's origin, license, attribution requirements, and transformation in `data/vocabulary/LICENSES.json`. If any dataset lacks redistribution permission, do not commit or publish it; build the baseline only from redistributable sources and keep unsupported local data as user-import migration input.

**Step 2: Write failing user-import tests**

Accept TavernCanvas JSONL and legacy v2 vocabulary/group/tag records through explicit format adapters. Test progress batches, cancellation, malformed records, duplicate merge behavior, source size limits, index correctness, staging cleanup, and activation only after one successful query.

User import runs indexing inside the Worker in bounded batches and persists staged shards incrementally. The UI remains responsive and receives progress only.

**Step 3: Build and verify the baseline**

Generate baseline package files with the committed builder. Do not hand-edit generated shards. CI rebuilds into a temporary directory and byte-compares every manifest/shard to committed output.

```bash
pnpm --filter @tavern-canvas/vocabulary-builder build
node tools/vocabulary_builder/dist/index.js build --input data/vocabulary/raw_vocabulary_tags.jsonl --output output/baseline_rebuild --package-id tavern-canvas-baseline --data-version 1.0.0 --minimum-extension-version 3.0.0 --changelog initial
node tools/vocabulary_builder/dist/index.js verify --package output/baseline_rebuild
```

Then copy verified generated files into `apps/extension/public/vocabulary/baseline` through the repository's generation script and compare hashes.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/vocabulary test
pnpm --filter @tavern-canvas/extension build
git add packages/vocabulary apps/extension/public/vocabulary data/vocabulary .github/workflows/ci.yml
git commit -m "feat(vocabulary): ship verified baseline package"
```

If provenance blocks source publication, omit `data/vocabulary/raw_vocabulary_tags.jsonl` and generated restricted records from the commit, keep a minimal redistributable baseline, and report the excluded source precisely. Do not claim full legacy vocabulary parity for excluded data.

---

## Task 6: Prove 500,000-record correctness and performance

**Files:**

- Create: `tools/vocabulary_builder/src/generate_benchmark_fixture.ts`
- Create: `tests/performance/vocabulary_search.bench.ts`
- Create: `tests/harness/vocabulary_benchmark.html`
- Create: `tests/e2e/vocabulary_performance.spec.ts`
- Modify: `playwright.config.ts`

**Step 1: Generate deterministic synthetic data outside Git**

Generate 500,000 records from a fixed seed into `output/benchmark/`. Include exact, prefix, alias, CJK translation, popularity, and controlled typo queries with known expected IDs. Do not commit the large fixture.

**Step 2: Build and verify the benchmark package**

```bash
pnpm --filter @tavern-canvas/vocabulary-builder generate-benchmark --records 500000 --seed 20260804 --output output/benchmark/raw_vocabulary_500k.jsonl
pnpm --filter @tavern-canvas/vocabulary-builder build-package --input output/benchmark/raw_vocabulary_500k.jsonl --output output/benchmark/package
```

**Step 3: Run browser Worker benchmarks**

In real Chromium, preload the package, warm one query, then run at least 100 measured prefix and 100 measured content/fuzzy queries. Capture p50, p95, max, result correctness, Worker decoded-memory high-water mark, and main-thread long tasks.

Acceptance:

```text
prefix_query_p95_ms <= 100
content_fuzzy_query_p95_ms <= 300
mobile_worker_lru_bytes <= 16777216
desktop_worker_lru_bytes <= 67108864
main_thread_long_tasks_over_50_ms = 0
incorrect_query_results = 0
```

**Step 4: Run the Stage 05 gate**

```bash
pnpm --filter @tavern-canvas/contracts test -- src/vocabulary.test.ts
pnpm --filter @tavern-canvas/vocabulary-builder test
pnpm --filter @tavern-canvas/vocabulary test
pnpm --filter @tavern-canvas/extension test -- src/modules/vocabulary
pnpm exec playwright test tests/e2e/vocabulary_performance.spec.ts
pnpm typecheck
pnpm build
```

**Step 5: Mark data quality and commit**

Update ignored `docs/_dev/DATA.md` vocabulary entries to `verified` only after package hash, query correctness, and performance checks pass.

```bash
git add tools/vocabulary_builder tests/performance tests/harness tests/e2e playwright.config.ts
git commit -m "test(vocabulary): enforce large-package budgets"
```

## Stage 05 completion evidence

Report:

- source provenance and redistribution decision for each dataset;
- package record count, shard counts by kind, compressed bytes, and manifest hash;
- changed-shard update and failed-update behavior;
- user-import correctness/cancellation cases;
- 500,000-record prefix and fuzzy p50/p95/max;
- Worker memory high-water marks and main-thread long-task count;
- focused test counts, typecheck, and build exit codes.
