# TavernCanvas Stage 04: Persistence and v2 Migration Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `executing-plans`, `test-driven-development`, and `systematic-debugging` for migration failures. Complete Stages 01–03 first. Legacy data is read-only until a verified v3 namespace is ready.

**Goal:** Add typed browser persistence, a content-addressed gallery, verified ZIP backup/restore, and a resumable copy-verify-switch migration from every v2 storage source.

**Architecture:** Small preferences live under `extension_settings.tavern_canvas`. Business records live in versioned namespaces inside `tavern_canvas_v3` IndexedDB. Image metadata references SHA-256-addressed blobs. Migration writes a journal, verifies every record and byte hash, then atomically changes one active namespace pointer.

**Tech Stack:** TypeScript 6.0.3, Zod 4, idb 8.0.3, `@noble/hashes` 2.2.0, Zip.js 2.8.34, fake-indexeddb 6.2.5, and Vitest 4.

---

## Task 1: Define the browser database and repositories

**Files:**

- Create: `packages/storage/package.json`
- Create: `packages/storage/tsconfig.json`
- Create: `packages/storage/src/database_schema.ts`
- Create: `packages/storage/src/open_database.ts`
- Create: `packages/storage/src/transaction.ts`
- Create: `packages/storage/src/repository.ts`
- Create: `packages/storage/src/repositories/business_repositories.ts`
- Create: `packages/storage/src/repositories/job_repository.ts`
- Test: `packages/storage/src/open_database.test.ts`
- Test: `packages/storage/src/repositories/business_repositories.test.ts`
- Modify: `packages/storage/src/index.ts`
- Local only: `docs/_dev/DATA.md`

**Step 0: Register the browser data asset**

Update ignored local `docs/_dev/DATA.md` before opening the database. Register `indexeddb://tavern_canvas_v3` with the stores and key/index schema below, flow `extension modules -> IndexedDB repositories -> extension modules`, `active` status, and `unverified` quality. Do not commit this file.

**Step 1: Write failing upgrade tests**

Use `fake-indexeddb` and assert a fresh database named `tavern_canvas_v3` creates exactly these stores:

| Store                 | Key path       | Required indexes                                                   |
| --------------------- | -------------- | ------------------------------------------------------------------ |
| `provider_profiles`   | `record_key`   | `namespace`, `provider_id`, `updated_at`                           |
| `prompt_presets`      | `record_key`   | `namespace`, `updated_at`                                          |
| `comfy_workflows`     | `record_key`   | `namespace`, `updated_at`                                          |
| `novelai_vibes`       | `record_key`   | `namespace`, `updated_at`                                          |
| `character_profiles`  | `record_key`   | `namespace`, `updated_at`                                          |
| `regex_rules`         | `record_key`   | `namespace`, `updated_at`                                          |
| `knowledge_entries`   | `record_key`   | `namespace`, `source_type`, `updated_at`                           |
| `vocabularies`        | `record_key`   | `namespace`, `updated_at`                                          |
| `vocabulary_groups`   | `record_key`   | `namespace`, `vocabulary_id`                                       |
| `vocabulary_packages` | `record_key`   | `namespace`, `data_version`, `state`                               |
| `vocabulary_shards`   | `record_key`   | `namespace`, `data_version`, `kind`                                |
| `image_records`       | `record_key`   | `namespace`, `sha256`, `created_at`, `last_accessed_at`, `pinned`  |
| `image_blobs`         | `sha256`       | `ref_count`, `byte_length`                                         |
| `generation_jobs`     | `record_key`   | `namespace`, `request_id`, `request_digest`, `state`, `updated_at` |
| `migration_journal`   | `migration_id` | `source_version`, `state`, `updated_at`                            |

Every namespaced record uses `record_key = namespace + ":" + id`. A v1 database upgrade must run in the provided upgrade transaction and fail atomically if any store/index creation throws.

**Step 2: Write failing repository tests**

For each repository, test create/get/list/update/delete, namespace isolation, Zod validation before write and after read, deterministic sort order, duplicate ID rejection, transaction rollback, and no leaking mutable stored objects. A repository accepts a transaction from the caller so multi-store operations can be atomic.

Define the generic boundary:

```ts
export interface Repository<TRecord> {
  get(namespace: string, id: string): Promise<TRecord | null>;
  list(namespace: string): Promise<TRecord[]>;
  put(namespace: string, record: TRecord): Promise<void>;
  delete(namespace: string, id: string): Promise<void>;
}
```

**Step 3: Implement typed `idb` schema and repositories**

Use one explicit `DBSchema` interface and one upgrade function. Do not open independent database connections per repository. `open_database()` memoizes the connection, handles `versionchange` by closing it, and exposes a disposer.

Business records include `schema_version`, UUID `id`, `created_at`, and `updated_at`. Keep provider secrets out of provider-profile records.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/storage test -- src/open_database.test.ts src/repositories
pnpm --filter @tavern-canvas/storage typecheck
git add packages/storage pnpm-lock.yaml
git commit -m "feat(storage): add typed browser repositories"
```

---

## Task 2: Implement small settings and active namespace ownership

**Files:**

- Modify: `packages/contracts/src/settings.ts`
- Create: `apps/extension/src/storage/settings_port.ts`
- Create: `apps/extension/src/storage/sillytavern_settings.ts`
- Create: `apps/extension/src/storage/active_namespace.ts`
- Test: `apps/extension/src/storage/sillytavern_settings.test.ts`
- Test: `apps/extension/src/storage/active_namespace.test.ts`

**Step 1: Write failing settings tests**

The new host key is exactly `extension_settings.tavern_canvas`. Test:

- missing settings initialize schema version `1` and namespace `primary`;
- known locale mappings accept `auto`, `zh-CN`, and `en` only;
- concurrency stays within 1–4;
- Gateway acknowledgments key by normalized origin;
- invalid persisted values are reported and replaced only field-by-field with defaults;
- unknown fields are removed from the v3 runtime object but included in diagnostics;
- large profiles, workflows, image data, vocabulary data, and logs are rejected from small settings;
- multiple changes in one task coalesce to one host save call;
- `flush()` persists immediately during module stop.

Use this shape:

```ts
export interface TavernCanvasSettings {
  schema_version: 1;
  active_namespace: string;
  locale: "auto" | "zh-CN" | "en";
  active_provider_profile_id: string | null;
  global_concurrency: number;
  auto_generation_enabled: boolean;
  fallback_generation_enabled: boolean;
  gateway: {
    endpoint: string | null;
    token_secret_id: string | null;
    http_acknowledgments: Record<string, string>;
  };
  ui: {
    color_mode: "system" | "light" | "dark";
    inspector_width: number;
    inspector_collapsed: boolean;
    optional_entry_enabled: boolean;
  };
}
```

**Step 2: Implement the host settings adapter**

Inject `extension_settings`, the host save function, and a scheduler. Do not import SillyTavern globals into `packages/storage`. Settings writes validate first, replace the whole `tavern_canvas` object immutably, and schedule one debounced host save.

`switch_active_namespace()` verifies a namespace marker transactionally in IndexedDB before changing the small setting. If host save fails, restore the prior active pointer in memory and report failure.

**Step 3: Verify and commit**

```bash
pnpm --filter @tavern-canvas/contracts test -- src/settings
pnpm --filter @tavern-canvas/extension test -- src/storage
pnpm typecheck
git add packages/contracts apps/extension
git commit -m "feat(storage): add versioned extension settings"
```

---

## Task 3: Implement content-addressed image storage and eviction

**Files:**

- Create: `packages/storage/src/images/image_schema.ts`
- Create: `packages/storage/src/images/image_store.ts`
- Create: `packages/storage/src/images/image_references.ts`
- Create: `packages/storage/src/images/lru_eviction.ts`
- Create: `apps/extension/src/storage/object_url_registry.ts`
- Test: `packages/storage/src/images/image_store.test.ts`
- Test: `packages/storage/src/images/lru_eviction.test.ts`
- Test: `apps/extension/src/storage/object_url_registry.test.ts`

**Step 1: Write failing content-addressing tests**

Test:

- identical bytes create one blob and two image records;
- SHA-256 is calculated from raw Blob bytes and checked after read;
- metadata update does not duplicate Blob bytes;
- deleting a gallery record decrements ref count but retains a blob still referenced by a message/job/other record;
- physical deletion occurs only at reference count zero;
- attach/detach operations update image record, blob reference, and generation job in one transaction;
- hash mismatch quarantines the record and returns a stable corruption error;
- image records contain generation parameters, provider ID, source message identity, persisted URL, pin state, dimensions, and media type, but no secret.

**Step 2: Write failing LRU tests**

Inject `navigator.storage.estimate()` and a fixed clock. Test:

- cleanup starts only after configured quota pressure;
- pinned records never evict;
- a blob that is the sole copy for a message never evicts;
- a blob with host/Gateway persisted URL may evict its local bytes while retaining metadata;
- least recently accessed eligible content is selected first;
- shared blobs count bytes once;
- cleanup stops at target pressure and reports reclaimed bytes;
- unavailable quota estimate disables automatic cleanup without deleting anything.

**Step 3: Implement image store and object URL lifecycle**

Hash with bundled Noble hashes. Store MIME type and bytes after independent magic-byte validation from Stage 03 utilities. `ObjectUrlRegistry` tracks URLs by owner component ID and revokes every URL on owner release or app unmount. Never cache object URL strings in IndexedDB.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/storage test -- src/images
pnpm --filter @tavern-canvas/extension test -- src/storage/object_url_registry.test.ts
pnpm typecheck
git add packages/storage apps/extension
git commit -m "feat(storage): add content-addressed gallery cache"
```

---

## Task 4: Implement verified streaming export and import

**Files:**

- Create: `packages/contracts/src/archive.ts`
- Create: `packages/storage/src/archive/export_archive.ts`
- Create: `packages/storage/src/archive/import_archive.ts`
- Create: `packages/storage/src/archive/archive_manifest.ts`
- Test: `packages/storage/src/archive/export_archive.test.ts`
- Test: `packages/storage/src/archive/import_archive.test.ts`

**Step 1: Define and test the archive format**

A TavernCanvas archive contains:

```text
manifest.json
checksums.json
records/provider_profiles.jsonl
records/prompt_presets.jsonl
records/comfy_workflows.jsonl
records/novelai_vibes.jsonl
records/character_profiles.jsonl
records/regex_rules.jsonl
records/knowledge_entries.jsonl
records/vocabularies.jsonl
records/vocabulary_groups.jsonl
records/image_records.jsonl
records/generation_jobs.jsonl
assets/<sha256>.<extension>
```

`manifest.json` includes format `tavern-canvas-archive`, schema version, extension version, created timestamp, record counts, asset count, and excluded secret categories. `checksums.json` maps every other path to SHA-256 and byte length.

Tests must cover deterministic ordering, valid round trip, empty archive, CJK/user prompt preservation, duplicate assets, bad checksum, missing file, duplicate ZIP path, traversal path, decompression limit, malformed JSONL, unsupported schema, and cancellation midway.

**Step 2: Implement streaming export**

Use Zip.js streams. Write records in stable ID order as JSON Lines and assets one at a time. Do not load the complete archive or all blobs into memory. Default export excludes Gateway token, Provider credentials, logs, support bundles, and host secrets.

**Step 3: Implement staging import**

Import into namespace `import:<uuid>`. Validate path, declared/uncompressed size, per-file hash, record schema, cross-record references, and total counts before setting an `import_ready` marker. Only `switch_active_namespace()` can activate it. Failed/cancelled imports delete the staging namespace and preserve the active namespace.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/storage test -- src/archive
pnpm --filter @tavern-canvas/storage typecheck
git add packages/contracts packages/storage
git commit -m "feat(storage): add verified archive import and export"
```

---

## Task 5: Inventory every v2 source and create converters

**Files:**

- Create: `tools/v2_migration/package.json`
- Create: `tools/v2_migration/tsconfig.json`
- Create: `tools/v2_migration/src/legacy_schema.ts`
- Create: `tools/v2_migration/src/inventory.ts`
- Create: `tools/v2_migration/src/converters/settings_converter.ts`
- Create: `tools/v2_migration/src/converters/provider_converter.ts`
- Create: `tools/v2_migration/src/converters/prompt_converter.ts`
- Create: `tools/v2_migration/src/converters/asset_converter.ts`
- Create: `tools/v2_migration/src/converters/character_converter.ts`
- Create: `tools/v2_migration/src/converters/knowledge_converter.ts`
- Create: `tools/v2_migration/src/converters/gallery_converter.ts`
- Create: `tools/v2_migration/src/converters/message_converter.ts`
- Create: `tools/v2_migration/src/converter_registry.ts`
- Test: `tools/v2_migration/src/converter_registry.test.ts`
- Create: `tests/fixtures/migration/v2_settings_full.json`
- Create: `tests/fixtures/migration/v2_gallery_metadata.json`
- Create: `tests/fixtures/migration/v2_messages.json`

**Step 1: Extract sanitized exhaustive fixtures from the local archive**

Read only the archived `index.js` and derive fixture shapes from these sources:

```text
extension_settings["st-chatu8"]
IndexedDB "tupian" / store "tupianhuancun"
IndexedDB "chatu8_gallery" v6 / stores "tupianhuancun", "vocabularies", "groups", "subgroups", "tags"
IndexedDB "chatu8_config_images" v2 / store "config_images"
localStorage migration flags and "chatu8_uid"
message/swipe metadata and extra media written by v2
host image folders "chatu8List" and "chatu8_config"
```

Fixtures use synthetic prompts, names, endpoints, image bytes, and tokens. Do not copy user data or original bundled tag datasets into Git.

**Step 2: Write a completeness test before converters**

Inventory every own property under a fully populated v2 settings fixture. The converter registry must classify each nonempty path as exactly one of:

```text
mapped
deferred_secret_transfer
intentionally_obsolete
```

Unknown paths fail the migration. Allowed obsolete paths are limited to cache-completion flags, old UI DOM state, global error collector state, old updater state, steganography synchronization state, and `chatu8_uid`. Business records, prompts, custom themes, assets, and profiles cannot be marked obsolete.

**Step 3: Implement converter ownership**

- `settings_converter`: enable flags, trigger tags, automatic/stream settings, concurrency, locale, theme tokens, floating-entry preferences, and cache policy.
- `provider_converter`: SD fields, `novelai_profiles`, `comfyui_profiles`, Banana/Grok, OpenAI, Google, LLM profiles, model IDs, and route selections. Reversible v2 credentials become secret-transfer operations and never enter v3 profile records.
- `prompt_converter`: `yushe`, fixed positive/negative prompts, UCP/AQT quality controls, replacement rules, regex, roll/random groups, and LLM prompt-builder templates.
- `asset_converter`: `workers` workflows, edit/inpaint workflows, LORA metadata, vibes, character references, groups, uploaded configuration images, and custom FAB icon/video references.
- `character_converter`: character presets, names/tags, outfit presets, enable rules, injection templates, reference groups, and persona profiles.
- `knowledge_converter`: World Info selections, entry selections, knowledge records, `send_data` selections, persona/user context sources.
- `gallery_converter`: server metadata, `chatu8_gallery`, legacy `tupian`, blob/thumbnail records, generation parameters, active indices, and persisted host paths.
- `message_converter`: prompt markers, v2 image references, active swipe data, and media entries into `TavernCanvasMessageMetadata`.

Converters are pure. They return validated v3 records plus warnings; they do not write storage or call host APIs.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/v2-migration test
pnpm --filter @tavern-canvas/v2-migration typecheck
git add tools/v2_migration tests/fixtures/migration
git commit -m "feat(migration): add exhaustive v2 converters"
```

---

## Task 6: Implement resumable copy-verify-switch migration

**Files:**

- Create: `apps/extension/src/migration/legacy_sources.ts`
- Create: `apps/extension/src/migration/migration_journal.ts`
- Create: `apps/extension/src/migration/migration_runner.ts`
- Create: `apps/extension/src/migration/secret_transfer.ts`
- Create: `apps/extension/src/migration/lazy_message_migration.ts`
- Test: `apps/extension/src/migration/migration_runner.test.ts`
- Test: `apps/extension/src/migration/lazy_message_migration.test.ts`

**Step 1: Write failing migration lifecycle tests**

Cover:

- no legacy data records `not_required` without touching active v3 data;
- migration creates `migration:<uuid>` staging namespace and journal before first write;
- interruption resumes from the last committed batch;
- rerun does not duplicate records or blob references;
- every copied image hash is recalculated and compared;
- record counts and key-field summaries match source inventory;
- a converter error, unknown setting path, missing blob, hash mismatch, or secret-transfer failure blocks switch;
- failed migration retains all v2 data and the prior active namespace;
- success switches once and never writes the old settings key;
- the runner never calls `indexedDB.deleteDatabase` or host image delete APIs;
- migration success is not written when verification fails.

Journal state is:

```text
inventory -> copying -> verifying -> ready_to_switch -> completed
inventory | copying | verifying | ready_to_switch -> failed
```

Each journal records source fingerprints, batch cursors, counts, hashes, warnings, failures, staging namespace, and timestamps.

**Step 2: Implement secret transfer**

Move provider credentials into supported SillyTavern secret storage or require a Gateway profile. Verify retrieval through a credential-reference probe before considering the field migrated. Do not log or include plaintext values in the journal. If no supported destination exists, block migration with a user-action requirement; do not silently keep a reversible encrypted v2 credential in v3 settings.

**Step 3: Implement lazy message migration**

Because the host cannot enumerate all chats reliably, migrate message metadata when a chat opens. For each chat, convert in memory, save changed messages once, verify a re-read, then journal the chat fingerprint. Failure affects that chat only and is surfaced in diagnostics. Do not scan or rewrite unopened chats.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/migration
pnpm --filter @tavern-canvas/storage test
pnpm typecheck
git add apps/extension
git commit -m "feat(migration): add verified v2 migration runner"
```

---

## Task 7: Prove migration and storage end to end

**Files:**

- Create: `tests/integration/storage_migration_flow.test.ts`
- Create: `tests/integration/archive_round_trip.test.ts`
- Modify: `vitest.config.ts`
- Local only: `docs/_dev/DATA.md`

**Step 1: Add end-to-end scenarios**

Run with fake IndexedDB and a fake host settings/message port:

1. fully populated v2 fixture migrates every classified path;
2. duplicate legacy images become one blob with correct references;
3. interruption after each batch boundary resumes without duplication;
4. corrupt one source image byte and prove switch does not occur;
5. unknown legacy setting blocks completion;
6. secret transfer failure blocks completion without exposing the value;
7. unopened chat remains untouched, then migrates on first open;
8. export migrated namespace and import into a fresh database;
9. imported counts and every asset hash match;
10. LRU cleanup preserves sole message copies and pinned assets.

**Step 2: Run the Stage 04 gate**

```bash
pnpm --filter @tavern-canvas/contracts test
pnpm --filter @tavern-canvas/storage test
pnpm --filter @tavern-canvas/v2-migration test
pnpm --filter @tavern-canvas/extension test -- src/storage src/migration
pnpm vitest run tests/integration/storage_migration_flow.test.ts tests/integration/archive_round_trip.test.ts
pnpm typecheck
pnpm build
```

**Step 3: Mark local data quality verified**

Update `docs/_dev/DATA.md` entries for `tavern_canvas_v3` and Gateway SQLite from `unverified` to `verified` only if their full persistence, reopen, migration, and hash checks passed. Keep the document ignored.

**Step 4: Commit**

```bash
git add tests vitest.config.ts
git commit -m "test(migration): verify copy verify switch flow"
```

## Stage 04 completion evidence

Report:

- v2 setting paths classified, mapped, deferred, obsolete, and unknown counts;
- migrated record counts by store;
- source/copied image counts, unique hash counts, and verified bytes;
- interruption boundaries exercised;
- failed-switch assertions;
- archive paths, checksums, and round-trip counts;
- LRU reclaimed-byte scenario;
- focused test counts, typecheck, and build exit codes.
