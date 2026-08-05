# TavernCanvas Stage 06: Vue Workbench Implementation Plan

> **For Codex:** REQUIRED SUB-SKILLS: Use `executing-plans`, `test-driven-development`, and the approved frontend design skills referenced by the architecture document. Complete Stages 01–05 first. Every UI task ends with a real-browser interaction check; unit tests alone are insufficient.

**Goal:** Deliver a bilingual, responsive Vue image-generation workbench mounted in an isolated Shadow Root, with complete operational views for generation, prompts, assets, gallery, diagnostics, and settings.

**Architecture:** Vue components consume typed view models and command/query capabilities. One Studio controller translates domain events into reactive state. Reka UI provides accessible primitives and portals into the app Shadow Root. Domain, provider, host, and storage implementations remain outside components.

**Tech Stack:** Vue 3.5.40, Vue I18n 11.4.8, Reka UI 2.10.1, Lucide Vue 1.0.0, TanStack Vue Virtual 3.13.35, native CSS variables/modules, Vitest 4, Vue Test Utils 2.4.11, and Playwright 1.62.1.

---

## Task 1: Define UI contracts, controller, and design tokens

**Files:**
- Create: `apps/extension/src/ui/contracts/ui_capabilities.ts`
- Create: `apps/extension/src/ui/contracts/view_models.ts`
- Create: `apps/extension/src/ui/controllers/studio_controller.ts`
- Create: `apps/extension/src/ui/controllers/use_studio_controller.ts`
- Create: `apps/extension/src/ui/styles/tokens.css`
- Create: `apps/extension/src/ui/styles/base.css`
- Create: `apps/extension/src/ui/styles/utilities.css`
- Create: `apps/extension/src/ui/assets/fonts/geist_variable.woff2`
- Create: `apps/extension/src/ui/assets/fonts/OFL.txt`
- Test: `apps/extension/src/ui/controllers/studio_controller.test.ts`
- Test: `apps/extension/src/ui/styles/style_contract.test.ts`

**Step 1: Write failing controller tests**

The Studio controller receives capability interfaces for generation, profiles, prompt presets, assets, gallery, vocabulary, diagnostics, migration, and settings. Test:

- initial loading resolves each slice independently;
- one failed slice yields partial state instead of blanking the studio;
- domain events update only their owned slice;
- commands expose pending/success/error state and prevent duplicate submission;
- route and selected-record state survive panel resize and color-mode change;
- stopping the controller unsubscribes every domain listener and rejects no settled command;
- controller state contains stable codes/parameters, not translated strings.

Use this top-level state:

```ts
export interface StudioState {
  route: "workbench" | "prompt" | "assets" | "gallery" | "diagnostics" | "settings";
  color_mode: "light" | "dark";
  loading: ReadonlySet<string>;
  failures: ReadonlyMap<string, UiFailure>;
  workbench: WorkbenchViewModel;
  prompt: PromptViewModel;
  assets: AssetsViewModel;
  gallery: GalleryViewModel;
  diagnostics: DiagnosticsViewModel;
  settings: SettingsViewModel;
  inspector: InspectorViewModel;
  tasks: readonly TaskStripItemViewModel[];
}
```

**Step 2: Write failing style-contract tests**

Parse first-party CSS and assert:

- no gradient functions, backdrop blur, grain/noise assets, decorative background images, negative letter spacing, or viewport-width font sizing;
- panel radius is `0`, field radius `6px`, image tile radius `8px`, and status badge radius `4px`;
- animation durations are 140–220 ms and properties are transform, opacity, color, or background-color;
- a `prefers-reduced-motion` rule disables nonessential transitions;
- first-party font URLs are relative local assets;
- tokens include separate neutral, accent, success, warning, and error families.

**Step 3: Implement exact token baseline**

Use this light palette:

```css
:host {
  --tc-canvas: #f4f5f7;
  --tc-surface: #ffffff;
  --tc-surface-raised: #f8f9fb;
  --tc-text: #181a1f;
  --tc-text-muted: #616773;
  --tc-divider: #d8dce3;
  --tc-accent: #2457d6;
  --tc-accent-hover: #1f49b8;
  --tc-success: #16815d;
  --tc-warning: #9a6700;
  --tc-error: #c23838;
  --tc-radius-panel: 0;
  --tc-radius-field: 6px;
  --tc-radius-image: 8px;
  --tc-radius-status: 4px;
  --tc-motion-fast: 140ms;
  --tc-motion-normal: 180ms;
  --tc-motion-slow: 220ms;
  color: var(--tc-text);
  background: var(--tc-canvas);
  font-family: "Geist", system-ui, "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  letter-spacing: 0;
}
```

Dark mode uses canvas `#111318`, surface `#181b21`, raised `#20242b`, text `#f4f5f7`, muted `#aeb4bf`, divider `#343a44`, accent `#6f91ff`, success `#45c995`, warning `#e8b44e`, and error `#ff7b7b`.

Use tabular figures for counts, dimensions, seeds, durations, file sizes, and progress. Do not use beige, purple, orange/brown, or dark-blue monochrome themes.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/ui/controllers src/ui/styles
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension/src/ui
git commit -m "feat(ui): add studio state and design tokens"
```

---

## Task 2: Build the Shadow Root application shell and responsive navigation

**Files:**
- Create: `apps/extension/src/ui/AppRoot.vue`
- Create: `apps/extension/src/ui/shell/StudioShell.vue`
- Create: `apps/extension/src/ui/shell/TopCommandBar.vue`
- Create: `apps/extension/src/ui/shell/DesktopIconRail.vue`
- Create: `apps/extension/src/ui/shell/MobileBottomNav.vue`
- Create: `apps/extension/src/ui/shell/ContextInspector.vue`
- Create: `apps/extension/src/ui/shell/InspectorSheet.vue`
- Create: `apps/extension/src/ui/shell/TaskStrip.vue`
- Create: `apps/extension/src/ui/shell/PortalProvider.vue`
- Create: `apps/extension/src/ui/shell/shell.module.css`
- Modify: `apps/extension/src/bootstrap/bootstrap.ts`
- Test: `apps/extension/src/ui/shell/StudioShell.test.ts`
- Test: `apps/extension/src/ui/shell/PortalProvider.test.ts`

**Step 1: Write failing layout and navigation tests**

Desktop assertions:

```text
top bar = 56 px
icon rail = 64 px
workspace = minmax(0, 1fr)
inspector = clamp(320 px, persisted width, 400 px)
task strip = content-sized bottom row
```

Mobile assertions:

```text
height = 100dvh
one content layer
bottom navigation = 5 stable items
inspector = full-width draggable sheet
safe-area padding is applied
```

The five mobile items are Workbench, Prompt, Assets, Gallery, and More. More opens Diagnostics and Settings. Desktop rail exposes all six routes directly. Route buttons use Lucide icons with localized tooltips and visible selected state.

Test keyboard route activation, focus return after sheet close, inspector collapse/resize persistence, narrow/long locale labels, task-strip expansion, and no content width change when task state text changes.

**Step 2: Implement shell and portals**

Mount Vue into the `app` element from Stage 01 and pass the Shadow Root `portal` element through an `InjectionKey<HTMLElement>`. Every Reka `DialogPortal`, `TooltipPortal`, menu portal, and sheet portal receives that element. Do not portal into `document.body`.

Use CSS grid for desktop and fixed tracks for mobile. Shell sections are unframed bands separated by 1 px dividers. Do not wrap the entire workspace or inspector in cards.

**Step 3: Add shell-level UI states**

Implement startup loading, capability-blocked, partial initialization, fatal bootstrap error, and normal studio. Unsupported TavernHelper shows version/current requirement and one update link. It does not render disabled operational controls behind the error.

**Step 4: Verify with a browser harness**

Start the UI harness and inspect at 1440×900 and 390×844. Exercise all routes, inspector resize/sheet, task strip, keyboard focus, and reduced motion. Capture screenshots as implementation evidence; visual baselines are added in Task 8.

**Step 5: Commit**

```bash
git add apps/extension/src/ui apps/extension/src/bootstrap
git commit -m "feat(ui): add responsive studio shell"
```

---

## Task 3: Implement bilingual runtime and locale validation

**Files:**
- Create: `apps/extension/src/i18n/create_i18n.ts`
- Create: `apps/extension/src/i18n/locale_resolution.ts`
- Create: `apps/extension/src/i18n/locales/en.ts`
- Create: `apps/extension/src/i18n/locales/zh_cn.ts`
- Modify: `i18n/en.json`
- Create: `tools/locale_check/package.json`
- Create: `tools/locale_check/tsconfig.json`
- Create: `tools/locale_check/src/index.ts`
- Test: `apps/extension/src/i18n/locale_resolution.test.ts`
- Test: `tools/locale_check/src/index.test.ts`
- Modify: `package.json`

**Step 1: Write failing locale-resolution tests**

Map `zh-CN`, `zh-SG`, `zh-Hans`, and case/separator variants to `zh-CN`. Map every other unsupported locale, including `zh-TW`, to `en`. Explicit user override wins over host locale. `auto` follows host changes. Missing locale chunk falls back to English and reports `locale_load_failed`.

**Step 2: Define stable key domains**

Both locale modules must expose identical nested keys under:

```text
app
nav
common
status
workbench
provider
prompt
assets
gallery
diagnostics
settings
migration
errors
confirmations
```

Include all loading, empty, partial, error, disabled, field error, destructive confirmation, and HTTP-risk states. Provider names, model IDs, user prompt, tag source text, filenames, and upstream messages are interpolated data and remain untranslated.

**Step 3: Implement lazy Vue I18n loading**

Bundle English as fallback; lazy-load Simplified Chinese on demand. Use Composition API only. Format date/time, number, percentage, byte size, and plurals through `Intl`, not concatenated locale strings.

The manifest-level `i18n/en.json` translates SillyTavern's extension display description only; it does not duplicate runtime keys.

**Step 4: Implement locale checker**

The checker compares key sets, value types, interpolation parameter names, plural variants, unused static keys, and first-party emoji. It prints exact path and rule. Dynamic keys are forbidden.

**Step 5: Verify and commit**

```bash
pnpm --filter @tavern-canvas/extension test -- src/i18n
pnpm --filter @tavern-canvas/locale-check test
pnpm --filter @tavern-canvas/locale-check build
node tools/locale_check/dist/index.js
pnpm --filter @tavern-canvas/extension build
git add apps/extension/src/i18n i18n/en.json tools/locale_check package.json
git commit -m "feat(i18n): add English and Simplified Chinese"
```

---

## Task 4: Build accessible shared controls and state surfaces

**Files:**
- Create: `apps/extension/src/ui/components/AppIcon.vue`
- Create: `apps/extension/src/ui/components/IconButton.vue`
- Create: `apps/extension/src/ui/components/AppButton.vue`
- Create: `apps/extension/src/ui/components/SegmentedControl.vue`
- Create: `apps/extension/src/ui/components/AppSwitch.vue`
- Create: `apps/extension/src/ui/components/NumberStepper.vue`
- Create: `apps/extension/src/ui/components/AppSelect.vue`
- Create: `apps/extension/src/ui/components/FieldGroup.vue`
- Create: `apps/extension/src/ui/components/AppDialog.vue`
- Create: `apps/extension/src/ui/components/ConfirmDialog.vue`
- Create: `apps/extension/src/ui/components/AppTooltip.vue`
- Create: `apps/extension/src/ui/components/StateSurface.vue`
- Create: `apps/extension/src/ui/components/ToastViewport.vue`
- Create: `apps/extension/src/ui/components/VirtualList.vue`
- Create: `apps/extension/src/ui/components/components.module.css`
- Test: `apps/extension/src/ui/components/components.test.ts`

**Step 1: Write failing component-contract tests**

Test keyboard semantics, labels, tooltip association, focus-visible state, disabled state, pressed state, validation linkage, dialog focus trap/return, destructive confirmation, Escape behavior, virtual-list stable dimensions, and text overflow for long English/CJK strings.

`IconButton` accepts a Lucide component, accessible label, tooltip, size, pressed/disabled/destructive states, and no visible text. `AppButton` is reserved for clear commands and may render icon plus text. Binary settings use switches/checkboxes; mode choices use segmented controls; numeric values use steppers/inputs; option sets use selects/menus.

**Step 2: Implement components from Reka primitives**

Use Reka UI for dialog, tooltip, tabs, menu/select, switch, focus management, and portal behavior. First-party components add tokens and state styling but do not fork accessibility behavior.

Cards are limited to image tiles, draggable asset items, and modal content. `StateSurface` is an unframed region with stable min dimensions so loading/empty/error changes do not shift surrounding layout.

**Step 3: Verify browser keyboard behavior**

Exercise every shared control with Tab, Shift+Tab, Enter, Space, arrows, Escape, and screen-reader accessible names in the harness. Check 200% browser zoom and both locales.

**Step 4: Commit**

```bash
git add apps/extension/src/ui/components
git commit -m "feat(ui): add accessible studio controls"
```

---

## Task 5: Implement Workbench and Prompt views

**Files:**
- Create: `apps/extension/src/ui/views/workbench/WorkbenchView.vue`
- Create: `apps/extension/src/ui/views/workbench/PromptComposer.vue`
- Create: `apps/extension/src/ui/views/workbench/ReferenceStrip.vue`
- Create: `apps/extension/src/ui/views/workbench/ProviderSummary.vue`
- Create: `apps/extension/src/ui/views/workbench/ActiveJobs.vue`
- Create: `apps/extension/src/ui/views/workbench/GenerationInspector.vue`
- Create: `apps/extension/src/ui/views/prompt/PromptView.vue`
- Create: `apps/extension/src/ui/views/prompt/PresetBrowser.vue`
- Create: `apps/extension/src/ui/views/prompt/QualityControls.vue`
- Create: `apps/extension/src/ui/views/prompt/ReplacementRules.vue`
- Create: `apps/extension/src/ui/views/prompt/RegexRules.vue`
- Create: `apps/extension/src/ui/views/prompt/PromptBuilder.vue`
- Create: `apps/extension/src/ui/views/prompt/PromptTestPanel.vue`
- Test: `apps/extension/src/ui/views/workbench/WorkbenchView.test.ts`
- Test: `apps/extension/src/ui/views/prompt/PromptView.test.ts`

**Step 1: Write failing Workbench tests**

Cover provider-profile selection, positive/negative prompt drafts, image count 1–4, reference add/reorder/remove, generation submission, validation errors, active job progress, independent cancellation, completion preview, retry, and keyboard flow. A submit command carries profile ID and typed request only; the component does not fetch or inspect credentials.

Use a dense editor layout with prompt central, reference strip below, command controls adjacent, and current provider parameters in the contextual inspector. Generated/user images are the primary visual content. There is no hero, marketing copy, or feature tutorial text.

**Step 2: Write failing Prompt tests**

Cover preset search/group/bulk delete, fixed positive/negative prompts, UCP/AQT controls, random preset groups, replacement rules with multiple triggers, regex validation/test, World Info/user/character context preview, and private LLM prompt-builder test with tools disabled.

Draft edits remain local until Save. AI assistant suggestions, when added in Stage 07, can update only drafts. Unsaved navigation prompts for confirmation.

**Step 3: Implement views and all state surfaces**

Every list/section has loading, empty, partial, and error handling. Inline field errors remain near inputs. Toasts only report transient completion, such as copied parameters or successful save.

**Step 4: Browser-smoke both views**

Use mocked provider images, long prompts, four concurrent jobs, one error, and one cancelled task. Check desktop/mobile, both locales, light/dark, keyboard and touch emulation.

**Step 5: Commit**

```bash
git add apps/extension/src/ui/views/workbench apps/extension/src/ui/views/prompt
git commit -m "feat(ui): add generation and prompt workspaces"
```

---

## Task 6: Implement Assets and Gallery views

**Files:**
- Create: `apps/extension/src/ui/views/assets/AssetsView.vue`
- Create: `apps/extension/src/ui/views/assets/VocabularyPanel.vue`
- Create: `apps/extension/src/ui/views/assets/CharacterPanel.vue`
- Create: `apps/extension/src/ui/views/assets/OutfitPanel.vue`
- Create: `apps/extension/src/ui/views/assets/LoraPanel.vue`
- Create: `apps/extension/src/ui/views/assets/VibePanel.vue`
- Create: `apps/extension/src/ui/views/assets/ReferencePanel.vue`
- Create: `apps/extension/src/ui/views/assets/WorkflowPanel.vue`
- Create: `apps/extension/src/ui/views/gallery/GalleryView.vue`
- Create: `apps/extension/src/ui/views/gallery/ImageGrid.vue`
- Create: `apps/extension/src/ui/views/gallery/ImagePreviewDialog.vue`
- Create: `apps/extension/src/ui/views/gallery/ImageMetadataInspector.vue`
- Create: `apps/extension/src/ui/views/gallery/BulkActionBar.vue`
- Test: `apps/extension/src/ui/views/assets/AssetsView.test.ts`
- Test: `apps/extension/src/ui/views/gallery/GalleryView.test.ts`

**Step 1: Write failing Assets tests**

Cover vocabulary query/partial pagination/update/import, character/outfit/persona CRUD, World Info/context selection, LORA metadata, NovelAI vibe/reference groups, Google references, ComfyUI workflow import/placeholder scan/edit workflow, search, group editing, random selection, drag reorder, and destructive confirmation.

Use tabs inside the unframed Assets page. Asset items may be cards because they are repeated/draggable records; do not nest cards inside cards.

**Step 2: Write failing Gallery tests**

Cover virtualized/masonry image rendering, stable tile dimensions before load, object URL release, filters, source message navigation, parameter inspector, copy parameters, modify prompt, regenerate, image edit/inpaint routing, download, pin, multi-select, batch download, batch delete, orphan label, cache occupancy, and failed thumbnail fallback.

Deleting a gallery record and detaching from a message are distinct confirmed actions. Physical blob cleanup is never issued directly by the component.

**Step 3: Add real bitmap UI fixtures**

Generate six local PNG/JPEG fixtures with distinct aspect ratios and visible content using a deterministic bitmap generator. Include portrait, landscape, square, very light, very dark, and detailed images. Do not use SVG, remote stock URLs, blank gradients, or blurred placeholders.

**Step 4: Implement and browser-smoke**

Test large lists through virtualization, 200% zoom, slow image decode, a missing blob, and long metadata. On mobile, preview is full-screen and supports native pinch zoom; primary controls remain reachable without overlap.

**Step 5: Commit**

```bash
git add apps/extension/src/ui/views/assets apps/extension/src/ui/views/gallery tests/fixtures/ui
git commit -m "feat(ui): add asset library and gallery"
```

---

## Task 7: Implement Diagnostics and Settings views

**Files:**
- Create: `apps/extension/src/ui/views/diagnostics/DiagnosticsView.vue`
- Create: `apps/extension/src/ui/views/diagnostics/CapabilityMatrix.vue`
- Create: `apps/extension/src/ui/views/diagnostics/ConnectionTests.vue`
- Create: `apps/extension/src/ui/views/diagnostics/TaskTimeline.vue`
- Create: `apps/extension/src/ui/views/diagnostics/MigrationStatus.vue`
- Create: `apps/extension/src/ui/views/diagnostics/StorageUsage.vue`
- Create: `apps/extension/src/ui/views/settings/SettingsView.vue`
- Create: `apps/extension/src/ui/views/settings/ProviderProfiles.vue`
- Create: `apps/extension/src/ui/views/settings/GatewaySettings.vue`
- Create: `apps/extension/src/ui/views/settings/AutomationSettings.vue`
- Create: `apps/extension/src/ui/views/settings/AppearanceSettings.vue`
- Create: `apps/extension/src/ui/views/settings/DataSettings.vue`
- Test: `apps/extension/src/ui/views/diagnostics/DiagnosticsView.test.ts`
- Test: `apps/extension/src/ui/views/settings/SettingsView.test.ts`

**Step 1: Write failing Diagnostics tests**

Display the nine capability IDs, helper/host/protocol versions, connection-test result, task error codes, redacted timeline, migration journal, storage estimate, cache references, and support-bundle export. Test 1,000-event ring-buffer display through virtualization.

Support bundle content is version, capability matrix, redacted settings, error codes, and task timeline only. Assert no prompt, message content, secret, bearer token, base64, provider body, or user image name appears.

**Step 2: Write failing Settings tests**

Cover provider profile CRUD and connection test, Gateway endpoint/protocol discovery, first-use HTTP warning by origin, token secret reference, auto generation, fallback enablement, global/provider concurrency, theme mode, language, inspector width, optional entry toggle, vocabulary update channel, archive export/import, migration retry/report, and manual legacy cleanup.

Manual cleanup shows source record counts and bytes, requires explicit typed confirmation, and calls a separate destructive capability only after a verified migration/archive. UI never auto-deletes v2 data.

**Step 3: Implement warning severity without blocking HTTP**

Loopback/private-IP HTTP uses warning status; public/unknown-host HTTP uses error-colored risk status. Both offer Continue after exact disclosure that token, prompt, and images travel in plaintext. Acknowledgment is stored per normalized origin and a nonblocking status remains visible.

**Step 4: Browser-smoke all settings and diagnostics states**

Exercise helper missing/outdated, Gateway incompatible/offline, HTTP warning, migration failed/ready/completed, quota unavailable/high pressure, empty logs, 1,000 logs, and support export. Verify secrets never render in DOM snapshots.

**Step 5: Commit**

```bash
git add apps/extension/src/ui/views/diagnostics apps/extension/src/ui/views/settings
git commit -m "feat(ui): add diagnostics and settings workspaces"
```

---

## Task 8: Add browser, accessibility, and visual regression gates

**Files:**
- Create: `tests/harness/studio_host.html`
- Create: `tests/harness/src/studio_host.ts`
- Create: `tests/e2e/studio_navigation.spec.ts`
- Create: `tests/e2e/studio_workflows.spec.ts`
- Create: `tests/e2e/studio_accessibility.spec.ts`
- Create: `tests/e2e/studio_visual.spec.ts`
- Create: `tests/e2e/studio_overflow.spec.ts`
- Create: `tests/e2e/studio_visual.spec.ts-snapshots/*.png`
- Modify: `playwright.config.ts`

**Step 1: Build a feature-complete UI harness**

Provide deterministic mock capabilities and scenarios for loading, empty, partial, error, disabled, focus, pressed, destructive confirmation, success, four concurrent jobs, long English, long Simplified Chinese, HTTP warning, migration, and gallery images. The harness mounts the real production Vue app in a Shadow Root.

**Step 2: Add interaction and accessibility tests**

Exercise the complete common workflow:

```text
open studio -> select provider -> write prompt -> add reference -> generate four images -> cancel one -> inspect completed image -> copy parameters -> regenerate -> navigate to source message
```

Exercise preset save, vocabulary search, workflow import, batch gallery actions, HTTP acknowledgment, archive export/import, and migration status. Assert keyboard access, focus order/return, accessible names, dialog traps, no focus clipping, and reduced motion.

**Step 3: Add four-viewport visual snapshots**

Cover 1440×900, 1024×768, 390×844, and 360×800 in light/dark and `en`/`zh-CN`. Capture shell plus each route with representative real bitmap content. Use stable fonts and disable only nondeterministic caret/progress animation for snapshots.

**Step 4: Add programmatic overflow and pixel checks**

In every viewport/state, fail if:

- any first-party element extends beyond its scroll container unexpectedly;
- text is clipped without an intentional ellipsis/title;
- controls overlap;
- fixed navigation hides content;
- layout shifts after images/loaders resolve;
- gallery images have zero dimensions or render as uniform blank pixels;
- Shadow Root portals appear outside the root;
- buttons change dimensions on hover/loading/status changes.

**Step 5: Run the Stage 06 gate**

Start the Vite harness as a supervised process, then run:

```bash
pnpm --filter @tavern-canvas/extension test -- src/ui src/i18n
node tools/locale_check/dist/index.js
node tools/first_party_check/dist/index.js apps packages
pnpm exec playwright test tests/e2e/studio_navigation.spec.ts tests/e2e/studio_workflows.spec.ts tests/e2e/studio_accessibility.spec.ts tests/e2e/studio_visual.spec.ts tests/e2e/studio_overflow.spec.ts
pnpm typecheck
pnpm build
```

Review every changed screenshot at full size. Update baselines only when the observed result matches the approved design; never use blanket snapshot update to hide a regression.

**Step 6: Commit**

```bash
git add tests/harness tests/e2e playwright.config.ts
git commit -m "test(ui): enforce responsive workbench behavior"
```

## Stage 06 completion evidence

Report:

- route/state combinations exercised;
- four viewport dimensions, locale, and color-mode matrix;
- keyboard/focus checks;
- overflow, overlap, layout-shift, and blank-image counts;
- Shadow Root portal target results;
- locale key/parameter/unused-key counts;
- screenshot paths reviewed;
- focused tests, source-policy check, typecheck, and build exit codes.
