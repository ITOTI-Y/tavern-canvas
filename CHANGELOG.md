# Changelog

All notable changes to TavernCanvas are documented here. This project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

TavernCanvas 3.0.0 is a complete rewrite. It shares no code and no git history with st-chatu8 2.8.1.

### Breaking: this is a clean cutover

3.0.0 is not an upgrade of the 2.x extension and cannot be installed over it.

- **Different extension.** 3.0.0 installs from `https://github.com/ITOTI-Y/tavern-canvas` as a
  separate SillyTavern extension. The 2.x extension, `st-chatu8`, is unrelated at the file, module,
  and repository level. The published repository begins at a fresh orphan root commit that shares no
  ancestor with the 2.x history.
- **Both can be installed at once**, which is what makes migration possible. 3.0.0 reads 2.x settings
  out of SillyTavern's extension settings while both are present.
- **No automatic uninstall.** Remove the 2.x extension by hand after migration reports completion.
  Legacy data cleanup is not implemented in this release and the in app control always reports that.
- **Settings do not carry over implicitly.** Nothing is read from 2.x until you run the migration in
  Settings, then Data.
- **Rolling back means reinstalling 2.x.** 3.0.0 never writes to 2.x storage, so 2.x data survives a
  rollback intact. Export a 3.0.0 archive first if you want to keep work done in 3.0.0.

### Migrating from 2.8.1

Open Settings, then Data, and run the migration. It reads 2.x settings from SillyTavern's extension
settings under the key `st-chatu8`, reads the legacy gallery and configuration-image IndexedDB
stores, and resolves same-origin host image files. The run is idempotent and resumable: progress is
written to a migration journal, so an interrupted migration continues where it stopped rather than
duplicating records. It reports one of `inventory`, `copying`, `verifying`, `ready_to_switch`,
`completed`, `failed`, or `not_required`, with a failure reason when it fails, and it can be retried
from the same screen. Missing or invalid image bytes fail before the active namespace switches.

Legacy cleanup remains manual. Remove the 2.x extension yourself once migration completes.

Before migrating, export a backup from Settings, then Data. The export is a ZIP containing a
manifest, checksums, one JSONL file per record store, and content addressed image assets.
Credentials, Gateway tokens, logs, and support bundles are excluded by design. Import merges an
archive into the active namespace and never deletes existing data.

### Added

- A Vue Studio mounted in a Shadow Root, with Workbench, Prompt, Assets, Gallery, Diagnostics, and
  Settings routes, and separate desktop and mobile navigation.
- Image generation anchored to chat messages, including a prompt pipeline that draws on world info,
  character context, knowledge entries, and MVU variables, with regex, replacement, and random group
  transforms.
- Provider adapters for SD WebUI, ComfyUI, NovelAI, OpenAI Image, and Google Image. Loopback
  providers are called at a user supplied loopback URL; the three cloud vendors are called directly
  at fixed catalog routes using a credential held by SillyTavern.
- Media features comprising image edit, inpainting, reference image upload of up to four images, and
  video generation.
- A local gallery and asset library covering vocabulary, personas, knowledge, characters, outfits,
  LoRA, vibe, reference, and workflow entries, stored in an IndexedDB database named
  `tavern_canvas_v3` with content addressed image blobs and LRU eviction.
- A versioned, sharded vocabulary package system with per shard SHA-256 verification, bounded
  decompression, and rollback on failure. A 50,000 record bilingual baseline ships with the
  extension; further packages install from an opt in HTTPS catalog. See
  [docs/vocabulary-packages.md](docs/vocabulary-packages.md).
- A self hosted Gateway service with bearer token authentication, exact origin CORS, per token rate
  limiting, SQLite persistence, canonical image re-encoding, Server Sent Events job streaming, and
  restart recovery for in flight jobs, plus the extension side executor that submits jobs to it,
  follows them over SSE with a polling fallback, downloads the finished images, and cancels remote
  work when a job is cancelled locally. Configuring a Gateway endpoint and access token routes all
  generation through it, so no provider credential reaches the browser. See
  [docs/gateway.md](docs/gateway.md).
- Archive export and import, and a redacted, locally generated diagnostics support bundle.
- Production v2 gallery migration covering legacy IndexedDB records, configuration images, and
  same-origin host image files, with copy-verify-switch protection when bytes are missing or invalid.
- Local vocabulary JSONL/NDJSON import with progress and cancellation, persistent update-channel
  settings, and SHA-256 verification when cached shards are read back from IndexedDB.
- Gateway job and asset ownership scoped to the authenticated bearer token, a bounded pending queue,
  terminal-data retention, orphan asset cleanup, and optional atomic token-file reload through
  `SIGHUP`.
- A startup capability gate that blocks with an actionable message when JS Slash Runner is missing or
  older than 4.9.1.
- A deterministic release packaging tool writing `tavern-canvas.zip` with a SHA-256 sidecar, and a
  release audit covering archive hygiene, manifest schema, runtime completeness, locale coverage,
  secrets, source maps, legacy paths, and git history.

### Changed

- Requires SillyTavern 1.18.0 or newer and JS Slash Runner 4.9.1 or newer.
- User data lives in IndexedDB rather than in extension settings blobs. Settings themselves live
  under the `tavern_canvas` key and are size capped.
- The extension stores references to secrets rather than secret values.

### Removed

- The 2.x root `index.js` monolith and its `html/settings/`, `utils/iframe/`, and `utils/settings/`
  trees. No 2.x runtime path exists in 3.0.0.
- Font Awesome icons and remote runtime script loading. Icons are bundled, and the Geist font is self
  hosted, so the runtime fetches nothing from a content delivery network.
- The encrypted `tagData` shards. Vocabulary data is now an open, verifiable package format.

### Known limitations

- Routing generation through the Gateway needs both a Gateway endpoint and a stored Gateway access
  token. With an endpoint but no token, generation reports that reason rather than running.
- Direct cloud generation requires `allowKeysExposure: true` in SillyTavern's `config.yaml`. Without
  it, cloud calls fail closed with an actionable message. Loopback providers are unaffected.
- The Studio renders as a full viewport overlay when the optional floating entry point is disabled,
  which is the default, and offers no dismiss control.
- Legacy v2 cleanup is manual.
- Gateway token hashes supplied through the startup environment still require a restart to change.
  Token hashes supplied through the optional hash file can be reloaded atomically with `SIGHUP`.
