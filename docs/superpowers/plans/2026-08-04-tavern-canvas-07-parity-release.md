# TavernCanvas Stage 07: Feature Parity and Release Implementation Plan

> **For Codex:** REQUIRED SUB-SKILLS: Use `executing-plans`, `test-driven-development`, `transformers-js` for the tokenizer task, `verification-before-completion`, `requesting-code-review`, and `finishing-a-development-branch`. Complete Stages 01–06 first. Do not push `origin` until every release gate passes locally.

**Goal:** Close every approved v2 user workflow, add optional assistant/experience modules without restoring legacy coupling, prove all 19 architecture acceptance criteria, and publish the first clean-history TavernCanvas release.

**Architecture:** Remaining behaviors become typed modules behind existing capabilities. A machine-checked parity matrix prevents silent feature loss. Release tooling rebuilds and audits the installable root runtime, then packages only manifest, i18n, dist, notices, and required data assets.

**License decision:** The user selected no code license for the initial public release. Do not copy the legacy AFPL 9 file and do not add a new `LICENSE`. Public visibility does not grant reuse rights; state this plainly in README. Third-party assets retain their own license notices.

---

## Task 1: Create a machine-checked feature parity ledger

**Files:**
- Create: `docs/parity/feature_matrix.md`
- Create: `tools/parity_check/package.json`
- Create: `tools/parity_check/tsconfig.json`
- Create: `tools/parity_check/src/legacy_inventory.ts`
- Create: `tools/parity_check/src/parse_matrix.ts`
- Create: `tools/parity_check/src/index.ts`
- Test: `tools/parity_check/src/index.test.ts`
- Modify: `package.json`

**Step 1: Define every legacy capability row**

Create one row per observable workflow, grouped under:

```text
startup and update
main trigger and streaming pre-generation
SD WebUI
NovelAI
ComfyUI
OpenAI compatible and Google/Banana/Grok
prompt presets and transformations
LLM prompt generation and testing
character, outfit, persona, and knowledge context
World Info and send-data selection
LORA, vibe, character reference, and workflows
manual generation, edit, inpaint, video, and image upload
gallery, cache, metadata, download, regenerate, and batch operations
vocabulary import, grouping, search, and update
regular-expression and click/drawing triggers
themes and optional floating entry
AI assistant, TTS, ASR, summary, and screen input
diagnostics, migration, import/export, and cleanup
```

Each row has stable ID, v2 entry, v3 owner, status, acceptance test, and notes. Status is exactly `ported` or `removed_approved`; `pending`, `partial`, `planned`, and blank are release failures.

**Step 2: Record only approved removals**

The approved removal list is limited to:

- page-wide/global error collector;
- steganography used as a hidden synchronization database;
- vendored UMD/global patches for transformers, zip, msgpack, and crypto;
- arbitrary custom CSS injectors and legacy DOM style mutation;
- UA-based capability detection;
- direct client control over provider URL, authorization, and arbitrary headers;
- reversible local pseudo-encryption presented as secret protection;
- World Info tool-control prompt injection;
- last-message/last-layer attachment fallback;
- duplicate in-app code updater replaced by SillyTavern `manifest.auto_update`;
- cache-completion flags and stale one-off migration markers.

These removals retain their user goal through scoped diagnostics, typed tokens, host/Gateway secret storage, deterministic binding, or host update behavior. Any additional removal requires explicit user approval and an architecture-document revision.

**Step 3: Implement parity validation**

The checker reads the committed inventory and matrix, rejects missing/duplicate IDs, invalid status, missing target owner, missing acceptance-test path, and unapproved removal. It also verifies every acceptance-test file exists.

**Step 4: Run and commit**

```bash
pnpm --filter @tavern-canvas/parity-check test
pnpm --filter @tavern-canvas/parity-check build
node tools/parity_check/dist/index.js docs/parity/feature_matrix.md

git add docs/parity tools/parity_check package.json pnpm-lock.yaml
git commit -m "docs(parity): map every legacy user workflow"
```

At this point rows may reference tests created in later tasks only if those test files are created in the same commit as the initial matrix. Do not commit a matrix that fails its checker.

---

## Task 2: Complete prompt transformation and context-source parity

**Files:**
- Create: `apps/extension/src/modules/prompt/prompt_pipeline.ts`
- Create: `apps/extension/src/modules/prompt/context_sources.ts`
- Create: `apps/extension/src/modules/prompt/world_info_source.ts`
- Create: `apps/extension/src/modules/prompt/mvu_variable_source.ts`
- Create: `apps/extension/src/modules/prompt/character_context_source.ts`
- Create: `apps/extension/src/modules/prompt/knowledge_context_source.ts`
- Create: `apps/extension/src/modules/prompt/replacement_transform.ts`
- Create: `apps/extension/src/modules/prompt/regex_transform.ts`
- Create: `apps/extension/src/modules/prompt/random_group_transform.ts`
- Create: `apps/extension/src/modules/prompt/tag_normalizer.ts`
- Create: `apps/extension/src/modules/prompt/trigger_parser.ts`
- Test: `apps/extension/src/modules/prompt/prompt_pipeline.test.ts`
- Test: `apps/extension/src/modules/prompt/trigger_parser.test.ts`
- Test: `apps/extension/src/modules/prompt/context_sources.test.ts`

**Step 1: Write failing ordered-pipeline tests**

The pipeline order is fixed:

```text
raw scene
-> selected World Info/user/character/outfit/knowledge context
-> MVU variable resolution
-> fixed positive/negative and UCP/AQT quality controls
-> preset/random group selection
-> replacement rules
-> regex rules
-> roll/random expression resolution
-> tag normalization and stable deduplication
-> provider-specific request mapping
```

Test ordering conflicts, idempotent transforms, original text preservation metadata, comma spacing, physical newline handling, multiple replacement triggers such as `A|B=value`, seeded randomness, random vibe/preset groups, negative prompt separation, and provider-specific output.

**Step 2: Cover context behavior**

Test `{@getvar::角色.属性.力量@}` and nested paths against host chat variables, missing variables, false/zero/empty values, cyclic objects, and maximum output length. World Info uses selected data and optional Tauri activation results; it never provides tool-control instructions. Character/outfit/persona injection supports the three approved templates, including Tavern XML and compact Markdown, with escaped user content.

Knowledge/send-data selection remains explicit and previewable. Prompt-building private LLM calls set `tools: []` and `tool_choice: "none"`.

**Step 3: Cover trigger parity**

`trigger_parser` supports configured start/end markers in final and streaming text, multiple prompts, partial markers across chunks, original-text retention, auto-generation enablement, and stream pre-generation dedupe. It delegates image jobs to Stage 02; it does not maintain a second queue.

**Step 4: Implement, verify, and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/modules/prompt
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension/src/modules/prompt docs/parity/feature_matrix.md
git commit -m "feat(prompt): complete context and transformation parity"
```

---

## Task 3: Complete manual image, edit, inpaint, video, and chat interaction flows

**Files:**
- Create: `apps/extension/src/modules/media/media_command_service.ts`
- Create: `apps/extension/src/modules/media/reference_upload.ts`
- Create: `apps/extension/src/modules/media/image_edit.ts`
- Create: `apps/extension/src/modules/media/inpaint_session.ts`
- Create: `apps/extension/src/modules/media/video_generation.ts`
- Create: `apps/extension/src/modules/media/chat_media_interactions.ts`
- Create: `apps/extension/src/modules/media/chat_placeholder.ts`
- Create: `apps/extension/src/ui/dialogs/ImageEditDialog.vue`
- Create: `apps/extension/src/ui/dialogs/InpaintDialog.vue`
- Create: `apps/extension/src/ui/dialogs/GenerationParametersDialog.vue`
- Test: `apps/extension/src/modules/media/media_command_service.test.ts`
- Test: `apps/extension/src/modules/media/inpaint_session.test.ts`
- Test: `apps/extension/src/modules/media/chat_media_interactions.test.ts`
- Test: `apps/extension/src/ui/dialogs/InpaintDialog.test.ts`

**Step 1: Write failing command tests**

Cover manual text-to-image, image-to-image, prompt modification, regenerate, upload reference, SD/NovelAI/ComfyUI inpaint, Google/OpenAI edit, supported video generation, multiple results, cancellation, failed upload, cache-only source, and source-message navigation. Every flow creates or reuses typed Stage 02 jobs and Stage 04 assets.

**Step 2: Write failing inpaint tests**

The dialog loads a real bitmap, maintains fixed canvas aspect ratio, supports brush size/erase/undo/redo/clear, exports a binary mask, validates source/mask dimensions, and submits asset IDs. Pointer events support mouse, pen, and touch without UA detection. Canvas and controls do not resize when status changes.

Use Lucide undo, redo, eraser, trash, zoom, upload, and generate icons. Do not draw custom SVG toolbar icons.

**Step 3: Implement chat interactions through a host-surface port**

Define `ChatMediaInteractionPort` for click, double-click, long-press, and context actions keyed by TavernCanvas image ID. Tauri implements it through ChatSurface. Standard SillyTavern uses only supported message/media hooks centralized in the host adapter. If a host cannot expose a gesture safely, the identical command remains available from Gallery and the image parameters dialog; record the capability result in diagnostics rather than using private selectors.

Long press opens prompt edit. Double-click submits regenerate after confirming the active profile. Single click opens image preview. Streaming placeholders are keyed by request ID and replaced only by matching job completion.

**Step 4: Implement video handling**

Normalize generated MP4 as a gallery asset with poster, duration, source job, download, preview, and cache references. Reference upload still rejects video; only provider-generated video enters this path. Revoke video object URLs on view release.

**Step 5: Browser-smoke and commit**

Exercise touch inpaint, long press, double click, preview, four-image result, one video, and one failed edit in desktop/mobile harnesses.

```bash
pnpm --filter @tavern-canvas/extension test -- src/modules/media src/ui/dialogs
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension/src/modules/media apps/extension/src/ui/dialogs docs/parity/feature_matrix.md
git commit -m "feat(media): add edit inpaint and chat image flows"
```

---

## Task 4: Replace the vendored NovelAI tokenizer with a local lazy module

**Files:**
- Create: `apps/extension/src/modules/novelai/tokenizer/tokenizer_service.ts`
- Create: `apps/extension/src/modules/novelai/tokenizer/tokenizer_worker.ts`
- Create: `apps/extension/public/tokenizers/novelai/tokenizer.json`
- Create: `apps/extension/public/tokenizers/novelai/tokenizer_config.json`
- Create: `apps/extension/public/tokenizers/novelai/SOURCE.json`
- Test: `apps/extension/src/modules/novelai/tokenizer/tokenizer_service.test.ts`
- Modify: `apps/extension/package.json`
- Modify: `apps/extension/vite.config.ts`

**Step 1: Read the current Transformers.js skill/docs and pin assets**

Use `transformers-js` before coding. Identify the NovelAI tokenizer revision used by current behavior, record model/revision/source/checksums in `SOURCE.json`, and download only tokenizer assets. Do not include model weights.

**Step 2: Write failing lazy-loading tests**

Assert:

- opening unrelated views does not load the tokenizer chunk or assets;
- first NovelAI token-count request loads one Worker/chunk;
- concurrent requests share one initialization promise;
- remote models are disabled;
- any attempted network request outside the local extension tokenizer path fails the test;
- fixed prompts match committed expected token counts;
- cancellation/dispose terminates pending work and Worker resources;
- load failure returns `tokenizer_unavailable` without blocking generation.

**Step 3: Implement local-only loading**

Use `@huggingface/transformers` 4.2.0 `AutoTokenizer` in a lazy Worker. Configure local model path and `allowRemoteModels = false` before loading. Import the package only inside the lazy module so initial bundle budget excludes it.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/modules/novelai/tokenizer
pnpm --filter @tavern-canvas/extension build
node tools/first_party_check/dist/index.js apps packages
git add apps/extension/src/modules/novelai apps/extension/public/tokenizers apps/extension/package.json apps/extension/vite.config.ts pnpm-lock.yaml
git commit -m "feat(novelai): add local lazy token counting"
```

---

## Task 5: Rebuild the optional AI assistant, TTS, and ASR safely

**Files:**
- Create: `apps/extension/src/modules/assistant/assistant_module.ts`
- Create: `apps/extension/src/modules/assistant/assistant_session.ts`
- Create: `apps/extension/src/modules/assistant/assistant_context.ts`
- Create: `apps/extension/src/modules/assistant/settings_draft_tools.ts`
- Create: `apps/extension/src/modules/assistant/assistant_markdown.ts`
- Create: `apps/extension/src/modules/assistant/tts_service.ts`
- Create: `apps/extension/src/modules/assistant/asr_service.ts`
- Create: `apps/extension/src/modules/assistant/screen_input.ts`
- Create: `apps/extension/src/ui/assistant/AssistantPanel.vue`
- Create: `apps/extension/src/ui/assistant/AssistantMessage.vue`
- Create: `apps/extension/src/ui/assistant/AssistantDraftReview.vue`
- Test: `apps/extension/src/modules/assistant/assistant_module.test.ts`
- Test: `apps/extension/src/modules/assistant/settings_draft_tools.test.ts`
- Test: `apps/extension/src/modules/assistant/assistant_markdown.test.ts`
- Test: `apps/extension/src/modules/assistant/tts_service.test.ts`
- Test: `apps/extension/src/modules/assistant/asr_service.test.ts`
- Modify: `apps/extension/package.json`

**Step 1: Write failing authority-boundary tests**

Assistant tools may read redacted settings schema/help, diagnostics codes, provider capabilities, workflow metadata, and user-selected screenshots/images. They cannot read secret values, authorization headers, raw browser storage, unrelated chats, or full provider bodies.

A settings write creates a typed draft diff. Only an explicit user Review then Apply command can call settings capabilities. Reject unknown paths, secret paths, invalid values, and hidden auto-execute. Image-generation requests use the same typed Stage 02 command and remain visible in task strip.

**Step 2: Write failing session/rendering tests**

Cover multiple assistant chats, abort, edit/resend, summary, image attachments, thought-content separation, scroll windowing, persistence, and corrupt-history recovery. Render Markdown with bundled `marked` 18.0.9 and sanitize with DOMPurify 3.4.13. Reject scripts, event handlers, unsafe URLs, iframes, style tags, and SVG; allow a minimal text/code/list/link subset.

**Step 3: Write TTS/ASR tests**

TTS extracts selected dialogue scope, supports play/pause/stop/rate/voice, and never logs spoken content. ASR exposes permission, recording, transcribing, cancellation, and unavailable states. Inject browser/host speech ports; do not infer capability from UA. No recording or screenshot leaves the device without an explicit user command and configured service.

**Step 4: Implement optional lazy module**

The assistant, Markdown renderer, TTS, ASR, and screen-input code load only when enabled/opened. The module unregisters media tracks, speech sessions, object URLs, and event handlers on stop.

**Step 5: Browser-smoke and commit**

Exercise assistant draft review, rejected secret request, Markdown attack fixture, abort, TTS controls, denied microphone, successful ASR fixture, and explicit screen capture selection.

```bash
pnpm --filter @tavern-canvas/extension test -- src/modules/assistant src/ui/assistant
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension/src/modules/assistant apps/extension/src/ui/assistant apps/extension/package.json pnpm-lock.yaml docs/parity/feature_matrix.md
git commit -m "feat(assistant): add constrained optional assistant"
```

---

## Task 6: Complete optional floating entry, themes, and Tauri enhancements

**Files:**
- Create: `apps/extension/src/modules/experience/floating_entry.ts`
- Create: `apps/extension/src/modules/experience/media_state_player.ts`
- Create: `apps/extension/src/modules/experience/theme_tokens.ts`
- Create: `apps/extension/src/modules/tauri/chat_surface_module.ts`
- Create: `apps/extension/src/modules/tauri/world_info_activation_module.ts`
- Create: `apps/extension/src/ui/experience/FloatingEntry.vue`
- Test: `apps/extension/src/modules/experience/floating_entry.test.ts`
- Test: `apps/extension/src/modules/experience/theme_tokens.test.ts`
- Test: `apps/extension/src/modules/tauri/tauri_modules.test.ts`

**Step 1: Write failing optional-entry tests**

Cover enable/disable, desktop/mobile position, pointer drag, viewport clamping, keyboard activation, user-provided icon, and media states `idle`, `thinking`, `talk`, `enter`, and `dragging`. Use Pointer Events and viewport measurements, not UA detection. Missing/corrupt media falls back to a Lucide image icon without blocking studio access.

Any legacy `.chatu8` media adapter is confined to the v2 converter. Runtime stores standard validated image/video assets.

**Step 2: Write failing theme-token tests**

Migrate permitted legacy theme values into the approved token schema. Validate contrast-sensitive foreground/background pairs and bounded dimensions. Reject arbitrary selectors, HTML, external URLs, `@import`, animation rules, and CSS text. Applying a theme changes Shadow Root variables only.

**Step 3: Write Tauri enhancement tests**

With Tauri capabilities present, ChatSurface handles message media interactions and WorldInfo activation augments selected context. Without them, standard host adapters continue unchanged. Start/stop twice without duplicate handlers. Capability probing never accesses undocumented globals beyond the single documented readiness entry.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/modules/experience src/modules/tauri
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension/src/modules/experience apps/extension/src/modules/tauri apps/extension/src/ui/experience docs/parity/feature_matrix.md
git commit -m "feat(parity): add optional experience and Tauri modules"
```

---

## Task 7: Add full host E2E, security, bundle, and release audits

**Files:**
- Create: `tests/harness/sillytavern_host.html`
- Create: `tests/harness/tauri_host.html`
- Create: `tests/e2e/full_standard_host.spec.ts`
- Create: `tests/e2e/full_tauri_host.spec.ts`
- Create: `tests/e2e/full_gateway.spec.ts`
- Create: `tests/e2e/migration_and_update.spec.ts`
- Create: `tests/e2e/security_boundaries.spec.ts`
- Create: `tools/bundle_budget/package.json`
- Create: `tools/bundle_budget/src/index.ts`
- Create: `tools/release_audit/package.json`
- Create: `tools/release_audit/src/index.ts`
- Test: `tools/bundle_budget/src/index.test.ts`
- Test: `tools/release_audit/src/index.test.ts`
- Modify: `playwright.config.ts`
- Modify: `package.json`

**Step 1: Implement all-host E2E**

Standard SillyTavern harness covers TavernHelper 4.9.1, native tools, fallback model, message/swipe metadata, host upload, image gallery, settings, and no Tauri capabilities. Tauri harness adds ChatSurface and WorldInfo activation. Gateway E2E starts the actual server, uses HTTP acknowledgment, submits jobs, loses SSE, polls, restarts, and cancels.

Every architecture acceptance criterion 1–19 receives a named E2E or audit assertion. Link those exact paths in `docs/parity/feature_matrix.md`.

**Step 2: Implement security tests**

Assert:

- client request cannot override provider URL/header/credential;
- exact CORS and bearer auth enforcement;
- upload magic-byte/pixel/path restrictions;
- malformed fallback comments and workflow placeholders do not execute code;
- Markdown/user tag content cannot create script/event/unsafe URL;
- support bundle/logs contain no seeded prompt, chat, secret, authorization, base64, or full upstream body;
- no remote runtime script/font/model request occurs;
- HTTP warning is per origin and nonblocking after acknowledgment;
- no page-wide error listeners are installed.

**Step 3: Implement bundle budget**

Read Vite manifest and gzip emitted entry assets. Count only code/styles required before the studio or optional view opens. Fail when:

```text
initial_js_gzip_bytes > 184320
initial_css_gzip_bytes > 40960
```

Also fail if tokenizer, assistant, gallery detail, vocabulary Worker, or nondefault locale enters the initial chunk.

**Step 4: Implement release archive audit**

Audit ZIP paths, duplicate/traversal entries, manifest schema, checksums, JS/CSS existence, locale count, dependency/version gates, forbidden names/content, source maps, secret patterns, old archives, legacy runtime paths, remote URLs, Font Awesome, and first-party emoji.

The audit prints:

```text
legacy_paths
remote_runtime_scripts
font_awesome_references
first_party_emoji
manifest_dependency
minimum_tavern_helper_version
locale_count
initial_js_gzip_bytes
initial_css_gzip_bytes
```

**Step 5: Run the full pre-release verification**

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm test:gateway
pnpm test:e2e
pnpm check:locale
pnpm check:first-party
pnpm check:bundle
node tools/parity_check/dist/index.js docs/parity/feature_matrix.md
```

Do not proceed with any nonzero exit or unresolved parity row.

**Step 6: Commit**

```bash
git add tests tools/bundle_budget tools/release_audit package.json playwright.config.ts docs/parity/feature_matrix.md
git commit -m "test(release): enforce TavernCanvas acceptance gates"
```

---

## Task 8: Document, package, review, and publish the clean release

**Files:**
- Create: `README.md`
- Create: `CHANGELOG.md`
- Create: `SECURITY.md`
- Create: `THIRD_PARTY_NOTICES.md`
- Create: `docs/gateway.md`
- Create: `docs/vocabulary-packages.md`
- Create: `.github/workflows/release.yml`
- Create: `tools/package_extension/package.json`
- Create: `tools/package_extension/src/index.ts`
- Modify: `package.json`
- Modify: `manifest.json`
- Modify: root `dist/**`
- Modify: root `i18n/en.json`
- Create: `output/release/tavern-canvas.zip` locally only

**Step 1: Write concise operator documentation**

README includes product identity, requirements, direct SillyTavern installation URL, JS Slash Runner `>=4.9.1`, workbench entry, supported providers/transports, local data ownership, HTTP risk, Gateway link, migration/backup link, and build commands. State clearly:

```text
No license is granted for TavernCanvas source code in this release. Public access to the repository does not grant permission to copy, modify, or redistribute the code.
```

Do not add a `LICENSE` file. `THIRD_PARTY_NOTICES.md` lists exact bundled dependencies, Geist font license, tokenizer source/revision, and redistributable vocabulary data licenses. README does not claim unverified compatibility or performance.

`docs/gateway.md` documents loopback default, LAN HTTP example with the plaintext warning, HTTPS reverse-proxy recommendation, token rotation/revocation, exact CORS, limits, data paths, backup, and restart recovery. `docs/vocabulary-packages.md` documents package schema, source provenance, update channel, user import, and hash failure behavior.

**Step 2: Package from a clean rebuild**

The packaging tool accepts the repository root and writes a deterministic ZIP containing only:

```text
manifest.json
i18n/en.json
dist/index.js
dist/index.css
dist/chunks/*
dist/assets/*
README.md
THIRD_PARTY_NOTICES.md
```

It validates every manifest path, rejects untracked runtime inputs, omits source maps, and writes a SHA-256 sidecar. Root `dist/` is rebuilt from source and committed because SillyTavern clones the repository root and loads manifest-relative runtime paths. CI byte-compares committed `dist/` with a clean build.

Set root package and manifest versions to `3.0.0`. Add a complete `CHANGELOG.md` entry with migration and breaking clean-cutover notes.

**Step 3: Run verification from a clean checkout/worktree**

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm verify:release
node tools/release_audit/dist/index.js output/release/tavern-canvas.zip
sha256sum output/release/tavern-canvas.zip
```

Open the packaged extension in each real host harness, not the source dev server. Repeat one native-tool generation, one fallback generation, one four-job concurrency case, one Gallery regeneration, and one Gateway HTTP acknowledgment.

**Step 4: Request code review and fix findings**

Use `requesting-code-review`. Review contracts, generation binding, provider/Gateway security, migration rollback, Worker memory, Shadow Root UI, optional assistant authority, release artifact, and clean history. Apply valid findings, then rerun the complete `verify:release` command from a fresh process.

**Step 5: Prove repository and artifact history boundaries**

```bash
git rev-list --max-parents=0 main
git merge-base --is-ancestor legacy-upstream/main main
git log --all -- data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz
```

Expected:

- exactly one TavernCanvas orphan root;
- merge-base command exits `1`;
- archive log is empty;
- `git status --short` is empty after committing the release runtime;
- release audit reports zero legacy paths.

Do not push any legacy ref, tag, or object set with `--all`, `--tags`, or `--mirror`.

**Step 6: Commit release runtime and push main**

```bash
git add README.md CHANGELOG.md SECURITY.md THIRD_PARTY_NOTICES.md docs/gateway.md docs/vocabulary-packages.md .github/workflows/release.yml tools/package_extension package.json manifest.json i18n dist pnpm-lock.yaml
git commit -m "chore(release): prepare TavernCanvas 3.0.0"
git push --set-upstream origin main
```

After the first push succeeds and GitHub CI passes, create annotated tag `v3.0.0`, push only that tag, and create the GitHub release with `tavern-canvas.zip` plus its SHA-256 file. Never create the tag before the exact release commit passes CI.

**Step 7: Final installation smoke test**

Install from `https://github.com/ITOTI-Y/tavern-canvas` through SillyTavern's extension installer into a disposable host profile. Confirm root manifest discovery, JS Slash Runner dependency handling, English manifest translation, bootstrap version gate, studio opening, one real configured provider generation if credentials are available, and uninstall cleanup. When live credentials are unavailable, mark only the real-provider call unverified; all scripted provider/Gateway paths must still pass.

## Stage 07 completion evidence

Report:

- parity row totals by status and zero unresolved rows;
- every approved removal and its replacement outcome;
- prompt/context, media, tokenizer, assistant, TTS/ASR, optional entry, and Tauri scenario counts;
- all 19 acceptance-criterion test paths;
- lint, formatting, typecheck, unit, integration, Gateway, E2E, visual, locale, source-policy, parity, bundle, and release-audit results;
- initial JS/CSS gzip bytes and all performance budgets;
- release ZIP size and SHA-256;
- orphan root hash and legacy merge-base exit code;
- first public push commit, CI result, tag, release URL, and disposable-install result;
- any real-provider path skipped because credentials were unavailable.
