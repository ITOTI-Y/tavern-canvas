# Changelog

All notable changes to TavernCanvas are documented here. This project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-08-08

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
settings under the key `st-chatu8`. The run is idempotent and resumable: progress is written to a
migration journal, so an interrupted migration continues where it stopped rather than duplicating
records. It reports one of `inventory`, `copying`, `verifying`, `ready_to_switch`, `completed`,
`failed`, or `not_required`, with a failure reason when it fails, and it can be retried from the
same screen.

Two limits in this release:

- **Legacy images are not migrated.** The 2.x gallery database is not read, so 2.x image bytes stay
  where they are. Keep the 2.x extension installed if you still need them.
- **Legacy cleanup is manual.** Remove the 2.x extension yourself once migration completes.

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
  restart recovery for in flight jobs. See [docs/gateway.md](docs/gateway.md).
- Archive export and import, and a redacted, locally generated diagnostics support bundle.
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

- **A configured Gateway endpoint disables generation.** The Gateway service and the extension's
  Gateway client both exist, but the extension's job executor cannot yet drive the Gateway transport,
  and a configured Gateway endpoint outranks every other transport. Leave the Gateway endpoint unset
  in 3.0.0.
- Direct cloud generation requires `allowKeysExposure: true` in SillyTavern's `config.yaml`. Without
  it, cloud calls fail closed with an actionable message. Loopback providers are unaffected.
- The Studio renders as a full viewport overlay when the optional floating entry point is disabled,
  which is the default, and offers no dismiss control.
- Vocabulary package import from a local file is implemented but not wired to any UI.
- The vocabulary update channel setting is held in memory and does not survive a reload.
- 2.x image bytes are not migrated, and legacy cleanup is not implemented.
- Gateway jobs carry no owner, token rotation requires a restart, and there is no retention or
  cleanup. See [SECURITY.md](SECURITY.md).

[3.0.0]: https://github.com/ITOTI-Y/tavern-canvas/releases/tag/v3.0.0
