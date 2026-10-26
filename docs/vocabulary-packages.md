# Vocabulary packages

The tag autocomplete in TavernCanvas is backed by a versioned, sharded, integrity checked data
package. One package ships inside the extension; others can be installed from a catalog. This
document describes the package format, where the data comes from, how updates work, and what happens
when integrity checking fails.

## The bundled baseline

| Property          | Value                                                                    |
| ----------------- | ------------------------------------------------------------------------ |
| `package_id`      | `tavern-canvas-baseline`                                                 |
| `data_version`    | `1.1.0`                                                                  |
| `record_count`    | 50,000                                                                   |
| `compressed_size` | 3,882,215 bytes                                                          |
| Shards            | 2,742, comprising 1,502 trigram, 714 prefix, 512 alias, 13 detail, 1 hot |
| Languages         | `en` and `zh-CN`; 39,279 of 50,000 records carry a `zh` translation      |
| Ships at          | `dist/vocabulary/baseline/`                                              |

The baseline is a top 50,000 by popularity cut of a roughly 153,000 record bilingual dataset. Every
record carries a category, distributed as 22,157 character, 21,823 general, 5,636 copyright, and 384
meta.

The Worker resolves the baseline from a path relative to its own location, so it is always loaded
from the installed extension directory rather than the network. Loading is lazy: the baseline is
imported into IndexedDB only when no active or confirmed package already exists.

## Package format

A package is a directory containing `manifest.json` and one file per shard.

### Manifest

`manifest.json` is a strict object; unknown fields are rejected.

| Field                       | Type                                                                             |
| --------------------------- | -------------------------------------------------------------------------------- |
| `package_id`                | String, 1–128 chars, matching `^[a-z][a-z0-9_-]*$`                               |
| `schema_version`            | Literal `1`                                                                      |
| `data_version`              | SemVer                                                                           |
| `changelog`                 | String, 1–4096 chars                                                             |
| `record_count`              | Non negative integer                                                             |
| `compressed_size`           | Non negative integer, equal to the sum of every shard `byte_length`              |
| `minimum_extension_version` | SemVer; a package declaring a version above the running extension is not offered |
| `shards`                    | Array of 1–50,000 shard entries                                                  |

Duplicate `shard_id` values are rejected, and every shard's `package_id` must equal the manifest's.

Each shard entry:

| Field         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| `shard_id`    | String, 1–128 chars, not trimmed, because a group key such as `"v "` is a real distinct key |
| `package_id`  | Same as the manifest's                                                                      |
| `kind`        | One of `prefix`, `alias`, `trigram`, `detail`, `hot`                                        |
| `path`        | Relative path restricted to `^[A-Za-z0-9._-]+(?:/[A-Za-z0-9._-]+)*$` and rejecting `..`     |
| `sha256`      | Hex SHA-256 of the shard file's bytes as stored                                             |
| `byte_length` | Non negative integer                                                                        |

The path allowlist is what stops a manifest from redirecting a shard fetch: a leading `/`, a
backslash, and a colon are all outside the character set, so an absolute path or a URL such as
`https://attacker.example/shard` can never validate.

Example entry:

```json
{
  "shard_id": "alias:h000",
  "package_id": "tavern-canvas-baseline",
  "kind": "alias",
  "path": "alias/h000.msgpack.gz",
  "sha256": "795c4d61966f1ca1b09bcdf77e63a5a2ff060cece3d99d3843aa06d72e6de866",
  "byte_length": 1695
}
```

### Shards

Every shard is MessagePack encoded and then gzipped at level 9. Node's zlib writes a zero mtime and a
fixed OS byte, so the output is byte reproducible from the same input.

| Kind      | Path pattern                                | Payload                                                                   |
| --------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| `prefix`  | `prefix/<hex of the group key>.msgpack.gz`  | `[key, record_id, popularity]` tuples                                     |
| `alias`   | `alias/h000.msgpack.gz` … `h511`            | Same tuple shape, bucketed by FNV-1a 32 of the group key over 512 buckets |
| `trigram` | `trigram/<hex of the group key>.msgpack.gz` | `[trigram, deltas]`, where deltas are a first id followed by gaps         |
| `detail`  | `detail/<start_id>.msgpack.gz`              | Up to 4,096 full records                                                  |
| `hot`     | `hot/global.msgpack.gz`                     | A global top 1,000 plus per category top 500 lists                        |

Group keys are the first two Unicode code points of the normalized text, hex encoded into the file
name. Alias shards are bucketed rather than grouped directly because grouping by first two code
points exploded for CJK, producing 17,313 alias shards at roughly 2.5 entries each.

Search keys are normalized by NFKC, replacing `_` with a space, lowercasing, collapsing whitespace,
and trimming. The trigram index covers primary tag text only, not aliases or translations.

A record:

| Field         | Type                              |
| ------------- | --------------------------------- |
| `record_id`   | Non negative integer              |
| `tag`         | String, 1–256 chars               |
| `translation` | Optional string, up to 512 chars  |
| `aliases`     | Up to 32 strings, default empty   |
| `category`    | Optional string, up to 64 chars   |
| `popularity`  | Non negative integer, default 0   |
| `description` | Optional string, up to 4096 chars |

Duplicate `record_id` values and duplicate normalized tags are both rejected.

## Integrity

Integrity is per shard, not per package. Each manifest entry carries the SHA-256 of that shard's
compressed bytes exactly as stored, so the check covers what crossed the wire without decompressing
it first.

Verification runs in a fixed order: declared against actual `byte_length`, then SHA-256, then a
bounded gunzip, then MessagePack decoding, then a check that the decoded envelope's kind matches the
entry's declared kind. Decompression is bounded to a ratio of 128, a floor of 65,536 bytes, and a
ceiling of 32 MB per shard, so a compression bomb cannot exhaust memory before the size check fires.

Catalog installs add a second, earlier check: the catalog entry carries a `manifest_sha256` covering
the raw bytes of `manifest.json`, verified before any staging record is created.

The package builder performs the same verification itself: after writing a package it re-reads every
shard and checks size, hash, gzip validity, MessagePack validity, and kind before the output
directory is put in place.

## When a hash does not match

Verification fails closed. There is no fallback to the unverified shard and no partial install.

A mismatch throws a `PackageVerificationError` carrying a reason from `unsupported_schema`,
`invalid_manifest`, `extension_version_too_low`, `duplicate_shard_path`, `byte_length_mismatch`,
`hash_mismatch`, `corrupt_gzip`, `decompressed_size_exceeded`, `corrupt_messagepack`, or
`wrong_shard_kind`.

The updater catches it, rolls back the entire staging package, emits a `rolled_back` progress event
carrying the reason, and rethrows as `PackageUpdateError`. **The previously active package is never
touched**, so a corrupt update leaves search working on the data you already had. A catalog manifest
hash mismatch throws `CatalogInstallError` with reason `manifest_hash_mismatch` before staging
begins at all.

Two limits are worth knowing:

- Shard hashes are verified **at download time only**. Reading a shard back out of IndexedDB
  re-checks its recorded `byte_length` but not its hash, so this defends against a corrupted or
  tampered download rather than against later corruption of browser storage.
- The UI has no dedicated message for a verification failure. The failure surfaces as a generic
  command error rather than naming the offending shard, so read the browser console for the reason.

If the bundled baseline itself fails to bootstrap, the Worker reports `package_unavailable`, marks
the active version failed, and restores the most recently confirmed superseded version.

## Where the data comes from

The baseline is built from three public sources, merged and then translated:

- **Tag universe and categories** from the Hugging Face `danbooru-tags` tag table, Apache-2.0, whose
  underlying facts originate from Danbooru. 194,431 raw rows reduce to 153,258 unique tags after
  dropping deprecated rows and deduplicating.
- **Popularity** from a post level aggregation of a May 2026 Danbooru snapshot, counting posts per
  tag excluding deleted posts, supplemented for the top 60,000 tags by a live fetch from Danbooru's
  public API so the highest traffic counts are current.
- **Chinese translations** overlaid from the legacy v2.8.1 tag data seed, matched by normalized tag.

Per source licensing, attribution, transformation, and redistribution decisions are recorded in
`data/vocabulary/LICENSES.json` and summarised in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).
The translation strings have no traceable upstream author or license and are redistributed on an
explicit decision by the repository owner, which is an acceptance of risk rather than a license
clearance.

## The update channel

Settings has a vocabulary channel with two values. `bundled`, the default, uses only the package that
ships with the extension and makes no network request. `https` allows installing packages from the
remote catalog.

The catalog is a single JSON document:

```text
https://huggingface.co/datasets/ITOTIY/tavern-canvas-vocabulary/resolve/main/catalog.json
```

`huggingface.co` is the only host contacted. HTTPS is enforced twice, at the client and in the
schema. The catalog document is a JSON array of at most 500 entries, each declaring `package_id`,
bilingual display name and description, `data_version`, `record_count`, `compressed_bytes`,
`manifest_sha256`, `languages`, `min_extension_version`, `base_url`, an optional `bundled` flag, and
`updated_at`. A `base_url` may be null only for a bundled entry. The catalog fetch is bounded to
1 MB and a manifest fetch to 8 MB.

Fetching the catalog is deliberately deferred. The catalog client is dynamically imported on first
use, and the catalog is loaded when the vocabulary panel is opened rather than at startup, so simply
opening a chat never sends your IP address and extension version to a third party host. Entries
flagged NSFW sit behind an explicit disclosure toggle and are never pre-selected or installed
automatically.

An update proceeds as staging, ready, active, confirmed. The updater compares the new manifest
against the installed one and short circuits when `data_version`, shard count, and every per path
hash already match. Shards whose hash is unchanged are copied from the existing package instead of
downloaded; only changed shards cross the network, each bounded to its declared `byte_length` plus a
64 KB margin. Activation happens in a single IndexedDB transaction.

Two known gaps: the channel setting is held in memory and does not survive a reload, and the catalog
client is constructed without a bundled base URL, so installing the bundled catalog entry through the
UI fails.

## Importing your own package

The import pipeline is implemented but **not wired to any UI in this release**. The Worker answers an
`import_source` request with `import_source is not wired in this build`. The "Import package" button
in the vocabulary panel installs a catalog entry rather than a local file.

For reference, the implemented pipeline accepts two formats. `tavern_canvas_jsonl` is newline
delimited JSON, one record per line, skipping blank lines and collecting malformed lines as
positioned errors without aborting the batch. `legacy_v2` is a single JSON object of the v2 tag group
shape, where a shape failure rejects the whole batch.

Source records must omit `record_id`, which is reassigned deterministically after merging. A batch
payload is capped at 8 MB and a total import at 200,000 records. Duplicate, out of range, or repeated
batch indices, and a `batch_count` that changes mid import, are all rejected. The assembled manifest
is validated against the same schema as any other package. Merging is tolerant, keeping the first
occurrence and counting later conflicts, unlike the command line builder which throws.

## Storage

Packages and shards are stored in the `tavern_canvas_v3` IndexedDB database, in the
`vocabulary_packages` and `vocabulary_shards` object stores, keyed by `<namespace>:<uuid>`. Shard
bytes are held base64 encoded inside the shard record, because the frozen store schema offers the
payload field as its only extension point for binary content.

Package lifecycle states are `staging`, `ready`, `active`, `confirmed`, `superseded`, and `failed`.

## Building a package

```bash
pnpm --filter @tavern-canvas/vocabulary-builder build-package \
  --input data/vocabulary/raw_vocabulary_tags_public.jsonl \
  --output output/packages/my-package \
  --package-id my-package \
  --data-version 1.0.0 \
  --minimum-extension-version 3.0.0 \
  --changelog "Initial build"

pnpm --filter @tavern-canvas/vocabulary-builder verify-package --package output/packages/my-package
```

Input is newline delimited JSON, one record per line, without `record_id`. Exit codes are 0 for
success, 2 for invalid input, 3 for verification failure, and 4 for an I/O failure.

The builder writes into a staging directory beside the output, verifies it against its own manifest,
and only then renames it into place, keeping a backup of the previous directory. Any failure removes
the staging directory and leaves the previous output untouched.

`minimum_extension_version` is read from the repository root `package.json`, so it can never exceed
the version of the extension being built.

Regenerating the bundled baseline:

```bash
pnpm --filter @tavern-canvas/vocabulary-builder generate-baseline
pnpm exec tsx tools/vocabulary_builder/scripts/generate_baseline.ts --check
```

The `--check` mode rebuilds into a temporary directory and byte compares every file against the
committed baseline. CI runs it, so a hand edited or stale shard fails the build.
