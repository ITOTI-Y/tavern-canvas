# TavernCanvas Stage 01: Foundation and Host Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan. Use `using-git-worktrees` before Task 1 and `test-driven-development` for Tasks 2–5. Do not run project-wide Playwright in this stage.

**Goal:** Establish a clean orphan workspace with typed contracts, a lifecycle microkernel, supported host adapters, and a production extension bootstrap that refuses unsupported JS Slash Runner versions.

**Architecture:** `packages/contracts` owns validation and serializable types. `packages/core` owns lifecycle and capability registration without importing browser globals. `apps/extension/src/host` adapts TavernHelper, SillyTavern, and optional TauriTavern APIs. Bootstrap validates the host before activating any module.

**Tech Stack:** Node.js 24 LTS, pnpm 11.20.0, TypeScript 6.0.3, Zod 4.4.3, Vue 3.5.40, Vite 8.2.0, Vitest 4.1.10, ESLint 10.8.0, and Prettier 3.9.6.

---

## Task 1: Create the orphan workspace and copy approved documents

**Files:**
- Create: `.gitignore`
- Create: `.npmrc`
- Create: `.nvmrc`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `eslint.config.js`
- Create: `.prettierrc.json`
- Create: `vitest.config.ts`
- Create: `docs/plans/2026-08-04-tavern-canvas-v3-architecture-design.md`
- Create: `docs/superpowers/plans/2026-08-04-tavern-canvas-00-roadmap.md`
- Create: `docs/superpowers/plans/2026-08-04-tavern-canvas-01-foundation-host.md`
- Create: the remaining Stage 02–07 plan files from the approved planning worktree

**Step 1: Prepare the isolated orphan worktree**

From `/home/ubuntu/code/st-chatu8`, verify the archive before changing Git state:

```bash
sha256sum data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz
gzip -t data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz
git branch -m legacy-v2.8.1
git worktree add --orphan -b main ../tavern-canvas-v3
```

Expected checksum:

```text
01ba87905171c12590de863de34e044935013826674811ef2978dc06498e79c1
```

Perform all remaining steps in `/home/ubuntu/code/tavern-canvas-v3`. Copy only the approved architecture and implementation-plan documents. Do not copy `index.js`, legacy HTML/CSS, vendored libraries, tag data, `.git`, or `data/_archive`.

**Step 2: Add repository ignore rules**

Write `.gitignore` with these entries:

```gitignore
node_modules/
.pnpm-store/
**/dist/
!/dist/
!/dist/**
.vite/
coverage/
playwright-report/
test-results/
output/
.env
.env.*
!.env.example
*.sqlite
*.sqlite-shm
*.sqlite-wal
data/_archive/
docs/_dev/
```

**Step 3: Add exact root package metadata**

Write `package.json`:

```json
{
  "name": "tavern-canvas",
  "version": "3.0.0-alpha.1",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@11.20.0",
  "engines": {
    "node": ">=24.0.0"
  },
  "scripts": {
    "build": "pnpm -r build",
    "check": "pnpm lint && pnpm format:check && pnpm typecheck && pnpm test",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "pnpm -r typecheck",
    "test": "vitest run"
  },
  "devDependencies": {
    "@eslint/js": "10.0.1",
    "@types/node": "24.13.3",
    "eslint": "10.8.0",
    "eslint-config-prettier": "10.1.8",
    "eslint-plugin-vue": "10.10.0",
    "globals": "17.9.0",
    "happy-dom": "20.11.1",
    "prettier": "3.9.6",
    "typescript": "6.0.3",
    "typescript-eslint": "8.66.0",
    "vitest": "4.1.10",
    "vue-eslint-parser": "10.4.1"
  }
}
```

Write `pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
  - tools/*
```

Write `.npmrc`:

```ini
save-exact=true
strict-peer-dependencies=true
prefer-frozen-lockfile=true
```

Write `.nvmrc`:

```text
24
```

**Step 4: Add strict TypeScript and formatting configuration**

Write `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2024", "DOM", "DOM.Iterable", "WebWorker"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "useDefineForClassFields": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

Write `.prettierrc.json`:

```json
{
  "printWidth": 100,
  "singleQuote": false,
  "semi": true,
  "trailingComma": "all"
}
```

Configure ESLint flat config with `@eslint/js`, `typescript-eslint` strict type-checked rules, `eslint-plugin-vue` flat recommended rules, browser globals for the extension, Node globals for Gateway/tools, and `eslint-config-prettier` last. Ignore only generated `dist`, coverage, reports, and vocabulary package binaries.

Write `vitest.config.ts` with `defineConfig({ test: { projects: [...] } })`. Named projects must discover package, app, tool, and integration tests so later `--project` filters remain stable. Do not use removed Vitest 4 workspace APIs: no `defineWorkspace`, `test.workspace`, or `--workspace` flag.

**Step 5: Install and establish the root commit**

```bash
corepack enable
pnpm install
git add .
git commit -m "chore(repo): establish TavernCanvas workspace"
```

**Step 6: Prove clean history**

```bash
git rev-list --max-parents=0 HEAD
git merge-base --is-ancestor legacy-upstream/main HEAD
```

Expected: the first command prints the new root commit; the second exits `1`.

---

## Task 2: Define shared contracts

**Files:**
- Create: `packages/contracts/package.json`
- Create: `packages/contracts/tsconfig.json`
- Create: `packages/contracts/src/ids.ts`
- Create: `packages/contracts/src/generation.ts`
- Create: `packages/contracts/src/provider.ts`
- Create: `packages/contracts/src/message.ts`
- Create: `packages/contracts/src/gateway.ts`
- Create: `packages/contracts/src/settings.ts`
- Create: `packages/contracts/src/capability.ts`
- Create: `packages/contracts/src/index.ts`
- Test: `packages/contracts/src/contracts.test.ts`

**Step 1: Write failing schema tests**

Cover these observable contracts:

- IDs accept lowercase UUID strings and reject arbitrary strings.
- `RequestImageArgumentsSchema` accepts `context_turns` 0–12 and `image_count` 1–4.
- Tool arguments reject provider URLs, headers, secrets, and unknown fields.
- Generation transitions expose only the nine designed states.
- Message metadata rejects duplicate request/image IDs and unknown keys.
- Provider errors expose only stable error codes and never require raw upstream payloads.
- Gateway protocol is exactly `1.0`.

Use fixtures with fixed UUIDs so tests are deterministic:

```ts
import { describe, expect, it } from "vitest";

import { RequestImageArgumentsSchema } from "./generation.js";

const generation_anchor = "a".repeat(64);

describe("RequestImageArgumentsSchema", () => {
  it("accepts the bounded public tool payload", () => {
    const value = RequestImageArgumentsSchema.parse({
      generation_anchor,
      scene_description: "A rainy alley at night",
      context_turns: 6,
      image_count: 2,
    });

    expect(value.image_count).toBe(2);
  });

  it("rejects provider control fields", () => {
    expect(() =>
      RequestImageArgumentsSchema.parse({
        generation_anchor,
        scene_description: "A rainy alley at night",
        provider_url: "https://example.invalid",
      }),
    ).toThrow();
  });
});
```

**Step 2: Run the contract test and confirm failure**

```bash
pnpm --filter @tavern-canvas/contracts test -- contracts.test.ts
```

Expected: fail because the package and schemas do not exist.

**Step 3: Implement the exact public schemas**

`generation.ts` must include:

```ts
import { z } from "zod";

export const Sha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);

export const RequestImageArgumentsSchema = z.strictObject({
  generation_anchor: Sha256Schema,
  scene_description: z.string().trim().min(1).max(12_000),
  negative_constraints: z.string().trim().max(4_000).optional(),
  context_turns: z.number().int().min(0).max(12).optional(),
  style_preset_id: z.string().uuid().optional(),
  image_count: z.number().int().min(1).max(4).optional(),
});

export type RequestImageArguments = z.infer<typeof RequestImageArgumentsSchema>;

export const GenerationStateSchema = z.enum([
  "queued",
  "preparing",
  "submitting",
  "running",
  "completed",
  "failed",
  "cancelled",
  "attached",
  "orphaned",
]);

export type GenerationState = z.infer<typeof GenerationStateSchema>;
```

`message.ts` must define `TavernCanvasMessageMetadataSchema` with `schema_version: z.literal(1)`, SHA-256 source/generation anchors, UUID request/image ID arrays, and a `.check()` callback that reports duplicate IDs. `provider.ts` must define the capability enum, stable error enum, base request fields, and a discriminated union keyed by `provider_id`. Provider-specific request fields are added in Stage 03 without weakening `z.strictObject()` boundaries.

`gateway.ts` must expose `PROTOCOL_VERSION = "1.0"`, job creation/response/event schemas, and capability response schemas. `settings.ts` initially contains only `schema_version`, locale override, concurrency 1–4, Gateway endpoint, and HTTP acknowledgments keyed by normalized origin. Stage 04 extends this schema by composing nested domain schemas.

**Step 4: Export only the supported surface**

`src/index.ts` explicitly exports named schemas, constants, and inferred types. Do not use wildcard barrel exports from internal files.

**Step 5: Verify contracts**

```bash
pnpm --filter @tavern-canvas/contracts test
pnpm --filter @tavern-canvas/contracts typecheck
```

Expected: all schema tests pass and TypeScript reports no errors.

**Step 6: Commit**

```bash
git add packages/contracts pnpm-lock.yaml
git commit -m "feat(contracts): define runtime boundary schemas"
```

---

## Task 3: Build the lifecycle microkernel

**Files:**
- Create: `packages/core/package.json`
- Create: `packages/core/tsconfig.json`
- Create: `packages/core/src/capability_registry.ts`
- Create: `packages/core/src/domain_event_bus.ts`
- Create: `packages/core/src/module_runtime.ts`
- Create: `packages/core/src/index.ts`
- Test: `packages/core/src/capability_registry.test.ts`
- Test: `packages/core/src/domain_event_bus.test.ts`
- Test: `packages/core/src/module_runtime.test.ts`

**Step 1: Write failing lifecycle tests**

Test these invariants:

- Registering the same capability twice throws and identifies both owner module IDs.
- A module cannot resolve a capability that was not registered.
- `start_all()` starts modules in declared dependency order.
- Startup failure stops already started modules in reverse order and leaves runtime state `failed`.
- `stop_all()` is idempotent.
- Event handlers run from a snapshot so subscription changes during publish affect only later events.
- One failing event subscriber does not prevent other subscribers; the failure is returned to diagnostics.

Use this module contract:

```ts
export interface RuntimeModule {
  readonly module_id: string;
  readonly requires: readonly string[];
  start(context: ModuleContext): Promise<void>;
  stop(): Promise<void>;
}
```

**Step 2: Run focused tests and confirm failure**

```bash
pnpm --filter @tavern-canvas/core test
```

**Step 3: Implement registry, bus, and runtime**

`CapabilityRegistry` stores `{ owner_module_id, value }` under string keys, provides `register`, `has`, `get`, `require`, and `remove_by_owner`, and never exposes its mutable map. `DomainEventBus` accepts typed serializable envelopes with `event_id`, `event_type`, `occurred_at`, and `payload`. `ModuleRuntime` validates missing requirements and dependency cycles before starting anything.

Do not introduce a dependency injection framework. These three small classes are the entire kernel.

**Step 4: Verify the package**

```bash
pnpm --filter @tavern-canvas/core test
pnpm --filter @tavern-canvas/core typecheck
```

**Step 5: Commit**

```bash
git add packages/core pnpm-lock.yaml
git commit -m "feat(core): add capability microkernel"
```

---

## Task 4: Add supported host adapters and capability probing

**Files:**
- Create: `apps/extension/package.json`
- Create: `apps/extension/tsconfig.json`
- Create: `apps/extension/src/host/host_adapter.ts`
- Create: `apps/extension/src/host/capability_probe.ts`
- Create: `apps/extension/src/host/tavern_helper_host.ts`
- Create: `apps/extension/src/host/sillytavern_host.ts`
- Create: `apps/extension/src/host/tauritavern_host.ts`
- Create: `apps/extension/src/host/global.d.ts`
- Test: `apps/extension/src/host/capability_probe.test.ts`
- Test: `apps/extension/src/host/tavern_helper_host.test.ts`

**Step 1: Write failing capability tests**

Fixtures must cover:

- missing `window.TavernHelper` blocks activation;
- helper version `4.9.0` blocks activation;
- helper version `4.9.1` passes;
- malformed versions block activation with `helper_version_invalid`;
- missing required public methods reports their stable capability IDs;
- absent Tauri globals disable only `tauri_chat_surface` and `tauri_world_info_activation`;
- host detection does not inspect the user agent or query private DOM selectors.

Define the probe result as a discriminated union:

```ts
export type BootstrapProbeResult =
  | {
      ready: true;
      matrix: CapabilityMatrix;
      helper_version: string;
    }
  | {
      ready: false;
      error_code:
        | "tavern_helper_missing"
        | "helper_version_invalid"
        | "helper_version_unsupported"
        | "helper_api_incomplete";
      missing_capabilities: string[];
    };
```

**Step 2: Run tests and confirm failure**

```bash
pnpm --filter @tavern-canvas/extension test -- src/host
```

**Step 3: Implement host interfaces**

`HostAdapter` groups only supported operations:

```ts
export interface HostAdapter {
  readonly capabilities: CapabilityMatrix;
  get_locale(): string;
  get_active_chat(): Promise<HostChatSnapshot>;
  subscribe_generation(handler: HostGenerationHandler): () => void;
  register_image_tool(tool: HostImageTool): () => void;
  generate_private_prompt(request: PrivatePromptRequest): Promise<string>;
  update_message(request: MessageUpdateRequest): Promise<void>;
  upload_image(request: HostImageUploadRequest): Promise<HostImageUploadResult>;
}
```

Keep TavernHelper calls inside `tavern_helper_host.ts`, standard SillyTavern context/event calls inside `sillytavern_host.ts`, and Tauri enhancement calls inside `tauritavern_host.ts`. The adapter may compose these implementations, but business modules cannot import their raw globals.

Use `semver` 7.8.5 for the minimum-version check. Do not hand-roll semantic version comparison.

**Step 4: Verify host behavior**

```bash
pnpm --filter @tavern-canvas/extension test -- src/host
pnpm --filter @tavern-canvas/extension typecheck
```

**Step 5: Commit**

```bash
git add apps/extension packages/contracts pnpm-lock.yaml
git commit -m "feat(host): add supported host adapters"
```

---

## Task 5: Add manifest, bootstrap, and production bundle

**Files:**
- Create: `manifest.json`
- Create: `i18n/en.json`
- Create: `apps/extension/vite.config.ts`
- Create: `apps/extension/src/bootstrap/bootstrap.ts`
- Create: `apps/extension/src/bootstrap/startup_error.ts`
- Create: `apps/extension/src/index.ts`
- Create: `apps/extension/src/style.css`
- Create: `apps/extension/src/ui/BootstrapStatus.vue`
- Create: `apps/extension/src/ui/create_shadow_root.ts`
- Test: `apps/extension/src/bootstrap/bootstrap.test.ts`
- Test: `apps/extension/src/manifest.test.ts`

**Step 1: Write failing manifest and bootstrap tests**

The manifest test must parse the real JSON and assert exact fields:

```json
{
  "display_name": "智绘姬",
  "loading_order": 110,
  "requires": [],
  "optional": [],
  "dependencies": ["JS-Slash-Runner"],
  "js": "dist/index.js",
  "css": "dist/index.css",
  "author": "ITOTI-Y",
  "version": "3.0.0-alpha.1",
  "homePage": "https://github.com/ITOTI-Y/tavern-canvas",
  "auto_update": true,
  "minimum_client_version": "1.18.0",
  "i18n": {
    "en": "i18n/en.json"
  }
}
```

Write root `i18n/en.json` as the SillyTavern manifest translation source:

```json
{
  "智绘姬": "TavernCanvas"
}
```

Bootstrap tests must assert that no runtime module starts before a successful probe, startup failure calls reverse-order cleanup, and unsupported helper versions render one local error surface without registering tools or events.

**Step 2: Run tests and confirm failure**

```bash
pnpm --filter @tavern-canvas/extension test -- src/bootstrap src/manifest.test.ts
```

**Step 3: Implement bootstrap and Shadow Root creation**

Create one host element with ID `tavern-canvas-root`, attach an open Shadow Root, append separate `app` and `portal` elements, and inject only the built first-party stylesheet. Return a disposer that unmounts Vue, removes subscriptions, revokes owned object URLs, removes the host element, and stops the microkernel.

Use Vue `createApp().mount(app_element)` and `app.onUnmount()` according to the Vue 3 application API. Store the Reka UI portal element in app-level typed injection; Stage 06 binds every dialog/menu/tooltip portal to it.

**Step 4: Configure the extension build**

The Vite build must:

- output repository-root `dist/index.js` and `dist/index.css` with deterministic names;
- inline no remote URL;
- keep locale, tokenizer, workbench, gallery, and vocabulary Worker code as lazy chunks under root `dist/chunks` and `dist/assets`;
- read the single root `manifest.json`; do not generate or maintain a second manifest under `apps/extension`;
- emit source maps only for non-release builds;
- define the build version from `package.json`.

`apps/extension/package.json` uses exact runtime dependencies:

```json
{
  "dependencies": {
    "@noble/hashes": "2.2.0",
    "lucide-vue-next": "1.0.0",
    "reka-ui": "2.10.1",
    "semver": "7.8.5",
    "vue": "3.5.40",
    "vue-i18n": "11.4.8",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "6.0.8",
    "@vue/test-utils": "2.4.11",
    "vite": "8.2.0",
    "vue-tsc": "3.3.9"
  }
}
```

Add workspace dependencies on `@tavern-canvas/contracts` and `@tavern-canvas/core` with `workspace:*`.

**Step 5: Smoke-build the actual extension**

```bash
pnpm --filter @tavern-canvas/extension test
pnpm --filter @tavern-canvas/extension typecheck
pnpm --filter @tavern-canvas/extension build
```

Inspect the emitted files through the package script and assert root `manifest.json`, `i18n/en.json`, `dist/index.js`, and `dist/index.css` exist. Confirm the manifest paths resolve relative to the repository root. Do not accept a unit test alone as bootstrap proof.

**Step 6: Commit**

```bash
git add manifest.json i18n apps/extension pnpm-lock.yaml
git commit -m "feat(extension): add validated bootstrap"
```

---

## Task 6: Add CI and stage quality gates

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `tools/first_party_check/package.json`
- Create: `tools/first_party_check/tsconfig.json`
- Create: `tools/first_party_check/src/index.ts`
- Test: `tools/first_party_check/src/index.test.ts`
- Modify: `package.json`

**Step 1: Write failing source-policy tests**

Test scanner fixtures for:

- remote `<script src="https://...">`;
- `@import` or runtime font URLs;
- `Font Awesome`, `fa-solid`, and `fa-` class references;
- emoji in first-party TypeScript, Vue templates, CSS content, and locale values;
- allowed user fixture text and allowed legacy migration fixtures;
- legacy runtime imports of `index.js`, `settings.html`, or `transformers.min.js`.

The scanner reports file, line, rule ID, and a short excerpt. It never rewrites files.

**Step 2: Implement and verify the scanner**

```bash
pnpm --filter @tavern-canvas/first-party-check test
pnpm --filter @tavern-canvas/first-party-check build
node tools/first_party_check/dist/index.js apps packages
```

Expected: zero findings against Stage 01 sources.

**Step 3: Add CI**

CI uses Node 24, Corepack, and `pnpm install --frozen-lockfile`. It runs:

```text
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
node tools/first_party_check/dist/index.js apps packages
```

Cache only pnpm's store. Do not cache `dist`, test results, or generated vocabulary data as trusted outputs.

**Step 4: Run the Stage 01 gate**

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
node tools/first_party_check/dist/index.js apps packages
```

Expected: every command exits `0`; extension production assets are present.

**Step 5: Commit**

```bash
git add .github tools package.json pnpm-lock.yaml
git commit -m "ci: enforce foundation quality gates"
```

## Stage 01 completion evidence

Record these exact facts in the execution report:

- orphan root commit hash;
- `git merge-base --is-ancestor legacy-upstream/main main` exit code `1`;
- helper versions `4.9.0` rejected and `4.9.1` accepted by tests;
- manifest dependency exactly `JS-Slash-Runner`;
- focused test counts;
- extension bundle output paths;
- lint, formatting, typecheck, tests, build, and source-policy scanner exit codes.
