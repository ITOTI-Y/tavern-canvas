# TavernCanvas Stage 03: Providers and Gateway Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `executing-plans`, `test-driven-development`, and `systematic-debugging` for any failing contract case. Complete Stages 01–02 first. Re-read each provider's official API documentation at implementation time before accepting or updating wire fixtures.

**Goal:** Implement typed image-provider adapters and a recoverable Express Gateway with strict security boundaries, stable errors, SSE plus polling, and no client-controlled upstream credentials or URLs.

**Architecture:** Provider adapters convert strict discriminated requests into transport-neutral upstream operations and normalized results. Transports own network placement. The Gateway reuses the same adapters, stores jobs/events/assets in SQLite, and exposes only the versioned `/v1` contract.

**Tech Stack:** TypeScript 6.0.3, Zod 4, Express 5.2.1, better-sqlite3 13.0.2, Pino 10.3.1, Helmet 8.3.0, express-rate-limit 8.6.2, file-type 22.0.1, Sharp 0.35.3, and Vitest 4.

---

## Task 1: Finalize provider request and result contracts

**Files:**
- Modify: `packages/contracts/src/provider.ts`
- Create: `packages/contracts/src/providers/sd_webui.ts`
- Create: `packages/contracts/src/providers/novelai.ts`
- Create: `packages/contracts/src/providers/comfyui.ts`
- Create: `packages/contracts/src/providers/openai_image.ts`
- Create: `packages/contracts/src/providers/google_image.ts`
- Create: `packages/contracts/src/providers/index.ts`
- Test: `packages/contracts/src/providers/provider_contracts.test.ts`

**Step 1: Write failing strict-schema tests**

Each request variant must reject unknown keys and client-controlled `base_url`, `api_key`, `headers`, `authorization`, `proxy`, and raw transport options. Test legal and illegal boundaries for width, height, image count, steps, CFG, seed, and reference-image count.

Use one top-level discriminant:

```ts
export const ImageGenerationRequestSchema = z.discriminatedUnion("provider_id", [
  SdWebuiRequestSchema,
  NovelAiRequestSchema,
  ComfyUiRequestSchema,
  OpenAiImageRequestSchema,
  GoogleImageRequestSchema,
]);
```

Every variant includes `request_id`, `generation_anchor`, positive prompt, optional negative prompt, output count 1–4, and asset IDs instead of base64 strings. Provider-specific fields remain typed inside the variant.

**Step 2: Define exact provider-owned fields**

`SdWebuiRequestSchema` supports `txt2img` and `img2img`, model/VAE IDs, sampler, scheduler, dimensions, steps, CFG, seed, denoise strength, Hires fix, ADetailer, ControlNet references, and LORA prompt tokens. Script arguments are represented by named schemas; arbitrary scripts and raw `alwayson_scripts` are rejected.

`NovelAiRequestSchema` supports model, sampler, dimensions, steps, scale, CFG rescale, noise schedule, seed, quality toggle, undesired-content preset, SMEA/DYN flags, vibe references, and character references. Vibe/character image bytes are asset IDs with bounded strength/information values.

`ComfyUiRequestSchema` supports a stored `workflow_id`, typed placeholder values, input asset bindings, output node IDs, seed, and output count. The request never accepts a raw workflow from the generation tool; raw workflows enter through the separately validated asset library.

`OpenAiImageRequestSchema` supports generation/edit mode, approved model ID, size, quality, background, output format, compression, input asset IDs, and mask asset ID.

`GoogleImageRequestSchema` supports approved model ID, prompt, reference asset IDs, aspect ratio, image size, and output MIME type. Banana/Grok legacy profiles migrate into OpenAI-compatible or Google profiles in Stage 04; they do not become ambiguous provider IDs.

**Step 3: Define normalized results and errors**

```ts
export const GeneratedAssetSchema = z.strictObject({
  asset_id: z.uuid(),
  media_type: z.enum(["image/png", "image/jpeg", "image/webp", "video/mp4"]),
  byte_length: z.number().int().positive().max(100_000_000),
  sha256: Sha256Schema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  duration_ms: z.number().int().positive().optional(),
  persisted_url: z.url().optional(),
});

export const ProviderErrorSchema = z.strictObject({
  code: z.enum([
    "auth_failed",
    "rate_limited",
    "content_blocked",
    "invalid_request",
    "provider_unavailable",
    "timed_out",
    "cancelled",
    "malformed_response",
  ]),
  retryable: z.boolean(),
  retry_after_ms: z.number().int().nonnegative().optional(),
  status_code: z.number().int().min(100).max(599).optional(),
});
```

No public error contains upstream response text, prompt, request body, or authorization data.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/contracts test -- src/providers
pnpm --filter @tavern-canvas/contracts typecheck
git add packages/contracts
git commit -m "feat(contracts): define provider request variants"
```

---

## Task 2: Add the provider adapter contract harness and retry policy

**Files:**
- Create: `packages/providers/package.json`
- Create: `packages/providers/tsconfig.json`
- Create: `packages/providers/src/provider_adapter.ts`
- Create: `packages/providers/src/provider_transport.ts`
- Create: `packages/providers/src/retry_policy.ts`
- Create: `packages/providers/src/provider_error.ts`
- Create: `packages/providers/src/redaction.ts`
- Create: `packages/providers/src/testing/provider_contract_suite.ts`
- Test: `packages/providers/src/retry_policy.test.ts`
- Test: `packages/providers/src/redaction.test.ts`

**Step 1: Write failing retry tests with fake timers**

Cover:

- network errors, 408, 429, and explicitly recoverable 5xx retry;
- 400, 401, 403, content-policy responses, schema failures, and cancellation do not retry;
- maximum two retries after the initial attempt;
- integer `Retry-After` seconds and HTTP date values are honored;
- exponential delays use injected jitter and remain bounded;
- abort during backoff ends immediately with `cancelled`;
- attempts never mutate the source request.

Use an injected clock and random source. Do not sleep in tests.

**Step 2: Write failing redaction tests**

Deep redaction must remove fields named `prompt`, `negative_prompt`, `scene_description`, `messages`, `chat_content`, `secret`, `api_key`, `authorization`, `image`, `images`, `base64`, and upstream bodies regardless of case. It preserves correlation IDs, provider ID, status code, error code, durations, and byte counts.

**Step 3: Implement the adapter boundary**

```ts
export interface ProviderAdapter<TRequest extends ImageGenerationRequest> {
  readonly provider_id: TRequest["provider_id"];
  readonly capabilities: ReadonlySet<ProviderCapability>;
  validate_profile(profile: unknown): ProviderProfile;
  submit(context: ProviderExecutionContext, request: TRequest): Promise<ProviderSubmission>;
  poll(
    context: ProviderExecutionContext,
    submission: ProviderSubmission,
  ): Promise<ProviderPollResult>;
  cancel(context: ProviderExecutionContext, submission: ProviderSubmission): Promise<void>;
}
```

`ProviderTransport` receives an operation with a relative route, method, bounded body, and signal. Base URL, credentials, and allowlists are constructor configuration and cannot come from `ImageGenerationRequest`.

**Step 4: Implement the reusable contract suite**

Every adapter must pass the same cases: success, multiple images, authorization failure, content rejection, rate limit, timeout, cancellation, malformed response, and unsupported capability. The suite also asserts that redacted logs contain no fixture secrets or prompt text.

**Step 5: Verify and commit**

```bash
pnpm --filter @tavern-canvas/providers test -- src/retry_policy.test.ts src/redaction.test.ts
pnpm --filter @tavern-canvas/providers typecheck
git add packages/providers pnpm-lock.yaml
git commit -m "feat(providers): add adapter and retry contracts"
```

---

## Task 3: Implement SD WebUI and NovelAI adapters

**Files:**
- Create: `packages/providers/src/sd_webui/sd_webui_adapter.ts`
- Create: `packages/providers/src/sd_webui/sd_webui_mapping.ts`
- Create: `packages/providers/src/sd_webui/sd_webui_response.ts`
- Create: `packages/providers/src/novelai/novelai_adapter.ts`
- Create: `packages/providers/src/novelai/novelai_mapping.ts`
- Create: `packages/providers/src/novelai/novelai_response.ts`
- Test: `packages/providers/src/sd_webui/sd_webui_adapter.test.ts`
- Test: `packages/providers/src/novelai/novelai_adapter.test.ts`
- Create: `tests/fixtures/providers/sd_webui/*.json`
- Create: `tests/fixtures/providers/novelai/*.json`

**Step 1: Pin audited wire fixtures**

Before coding, read current official SD WebUI/Forge API documentation and current NovelAI image API documentation. Store minimal sanitized request/response fixtures for each supported mode. Add a fixture README containing source URL and retrieval date; never store credentials or user prompts.

**Step 2: Run the shared contract suite and confirm failure**

Instantiate each adapter with a scripted transport and invoke `provider_contract_suite`. Add adapter-specific tests for:

- SD model/VAE override, Hires fix, ADetailer, ControlNet, txt2img, and img2img;
- SD response image count and PNG/JPEG MIME detection;
- NovelAI quality and undesired-content presets;
- NovelAI vibe and character reference encoding;
- NovelAI ZIP/multipart response extraction with bounded entry count and bytes;
- deterministic seed mapping and multiple output handling.

**Step 3: Implement mappings**

Mapping functions are pure and return new objects. They never read settings globals. Validate upstream response structure and decoded byte length before producing normalized assets. Treat a successful HTTP status with missing or malformed image payload as `malformed_response`.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/providers test -- src/sd_webui src/novelai
pnpm --filter @tavern-canvas/providers typecheck
git add packages/providers tests/fixtures/providers
git commit -m "feat(providers): add SD WebUI and NovelAI adapters"
```

---

## Task 4: Implement ComfyUI, OpenAI image, and Google image adapters

**Files:**
- Create: `packages/providers/src/comfyui/comfyui_adapter.ts`
- Create: `packages/providers/src/comfyui/workflow_renderer.ts`
- Create: `packages/providers/src/comfyui/comfyui_events.ts`
- Create: `packages/providers/src/openai_image/openai_image_adapter.ts`
- Create: `packages/providers/src/google_image/google_image_adapter.ts`
- Test: `packages/providers/src/comfyui/comfyui_adapter.test.ts`
- Test: `packages/providers/src/comfyui/workflow_renderer.test.ts`
- Test: `packages/providers/src/openai_image/openai_image_adapter.test.ts`
- Test: `packages/providers/src/google_image/google_image_adapter.test.ts`
- Create: `tests/fixtures/providers/comfyui/*.json`
- Create: `tests/fixtures/providers/openai_image/*.json`
- Create: `tests/fixtures/providers/google_image/*.json`

**Step 1: Pin current official wire fixtures**

Read current official ComfyUI server API, OpenAI image API, and Google Gemini image-generation API documents. Record source URL and retrieval date. The committed fixtures must contain only synthetic prompts and generated placeholder bytes.

**Step 2: Write failing adapter-specific tests**

ComfyUI:

- validates stored workflow JSON as a plain object with bounded nodes and depth;
- replaces only declared typed placeholders;
- escapes slash-containing strings without textual JSON replacement;
- rejects a placeholder that targets a missing node/property;
- maps queue progress, execution errors, output history, cancellation, and multiple output nodes;
- never mutates the stored workflow.

OpenAI image:

- generation and edit modes choose the correct route/body type;
- mask requires an input image;
- size/quality/background/output fields map exactly once;
- URL and base64 result forms normalize to assets;
- content-policy errors map to `content_blocked`.

Google image:

- reference assets map to typed inline parts;
- text and image parts are distinguished;
- absent image parts produce `malformed_response`;
- safety rejection maps to `content_blocked`;
- model and MIME allowlists are enforced by profile validation.

**Step 3: Implement and run the shared suite**

All three adapters must pass `provider_contract_suite`, including cancellation and redaction cases. ComfyUI may expose `progress`, `cancel`, `workflow`, and `streaming_result`; OpenAI/Google capabilities must reflect only their observed API behavior.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/providers test
pnpm --filter @tavern-canvas/providers typecheck
git add packages/providers tests/fixtures/providers
git commit -m "feat(providers): add workflow and hosted image adapters"
```

---

## Task 5: Implement extension transports and protocol fallback

**Files:**
- Create: `apps/extension/src/transport/host_proxy_transport.ts`
- Create: `apps/extension/src/transport/tauri_transport.ts`
- Create: `apps/extension/src/transport/gateway_transport.ts`
- Create: `apps/extension/src/transport/local_direct_transport.ts`
- Create: `apps/extension/src/transport/transport_selector.ts`
- Create: `apps/extension/src/transport/http_acknowledgment.ts`
- Test: `apps/extension/src/transport/transport_selector.test.ts`
- Test: `apps/extension/src/transport/gateway_transport.test.ts`
- Test: `apps/extension/src/transport/http_acknowledgment.test.ts`

**Step 1: Write failing selection and HTTP tests**

Selection priority is:

```text
explicit Gateway profile -> gateway_transport
Tauri provider capability -> tauri_transport
standard SillyTavern -> host_proxy_transport
explicit loopback direct profile -> local_direct_transport
otherwise -> configuration error
```

Direct transport rejects non-loopback addresses. Gateway accepts HTTP and HTTPS. A normalized origin includes scheme, lowercase host, and effective port. Acknowledging `http://192.168.1.10:8080` must not acknowledge another host, port, or HTTPS origin.

Classify loopback/private IP literals separately from public or unknown hostnames for warning severity, but allow acknowledgment in both cases. Never infer private DNS resolution in the browser.

**Step 2: Add SSE with polling fallback tests**

Gateway transport must:

- validate `/v1/capabilities` protocol major before submission;
- submit one idempotent request ID;
- consume ordered SSE event sequence numbers;
- ignore duplicate event sequence numbers;
- fall back to polling after an SSE connection error;
- use bounded exponential polling delay;
- resume from the last event ID;
- cancel with `DELETE` and an AbortSignal;
- never retry an incompatible protocol.

**Step 3: Implement and verify**

Use the browser's native `fetch` and `EventSource` boundary wrappers so tests can inject fakes. UI never calls these classes directly; Stage 06 uses a transport capability.

```bash
pnpm --filter @tavern-canvas/extension test -- src/transport
pnpm --filter @tavern-canvas/extension typecheck
git add apps/extension
git commit -m "feat(transport): add host and Gateway routes"
```

---

## Task 6: Build Gateway configuration and SQLite persistence

**Files:**
- Create: `apps/gateway/package.json`
- Create: `apps/gateway/tsconfig.json`
- Create: `apps/gateway/.env.example`
- Create: `apps/gateway/src/config/config_schema.ts`
- Create: `apps/gateway/src/config/load_config.ts`
- Create: `apps/gateway/src/persistence/database.ts`
- Create: `apps/gateway/src/persistence/migrations/001_initial.ts`
- Create: `apps/gateway/src/persistence/job_repository.ts`
- Create: `apps/gateway/src/persistence/asset_repository.ts`
- Test: `apps/gateway/src/config/load_config.test.ts`
- Test: `apps/gateway/src/persistence/database.test.ts`
- Test: `apps/gateway/src/persistence/job_repository.test.ts`

**Step 0: Register persistent data before opening SQLite**

Create ignored local `docs/_dev/DATA.md` from `/home/ubuntu/.claude/docs/data-template.md`. Register `output/gateway/tavern_canvas.sqlite` with its five-table schema, producer/consumer flow, `active` status, and `unverified` quality. Change quality to `verified` only after the persistence and restart tests pass. Never commit this file.

**Step 1: Write failing configuration tests**

Configuration includes bind host/port, exact CORS origins, bearer-token hashes, data directory, concurrency, request/image limits, and provider profiles. Test that provider base URLs, credentials, and model allowlists come only from server configuration. Reject empty allowlists, wildcard CORS with authentication, invalid URLs, path traversal, and plaintext token logging.

`.env.example` documents keys with non-secret example values; it contains no real token.

**Step 2: Write failing database tests**

Use one temporary directory per test. Assert:

- `journal_mode` is `wal`;
- `foreign_keys` is `1`;
- `busy_timeout` is set;
- migrations run in transactions and are idempotent;
- duplicate `request_id` returns the original job;
- job state and event append are atomic;
- event sequence increases per job;
- deleting a job does not delete referenced assets prematurely;
- process reopen recovers queued jobs and existing events;
- corrupt schema version fails startup without modifying data.

Create these tables:

```sql
CREATE TABLE schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL
);
CREATE TABLE jobs (
  job_id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  provider_id TEXT NOT NULL,
  state TEXT NOT NULL,
  request_json TEXT NOT NULL,
  submission_json TEXT,
  error_code TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE job_events (
  job_id TEXT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  event_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (job_id, sequence)
);
CREATE TABLE assets (
  asset_id TEXT PRIMARY KEY,
  sha256 TEXT NOT NULL UNIQUE,
  media_type TEXT NOT NULL,
  byte_length INTEGER NOT NULL,
  relative_path TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);
CREATE TABLE job_assets (
  job_id TEXT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL REFERENCES assets(asset_id),
  position INTEGER NOT NULL,
  PRIMARY KEY (job_id, asset_id)
);
```

**Step 3: Implement persistence**

Set pragmas immediately after opening. Store request JSON because queued jobs must survive restart, but never log it. Use prepared statements and explicit transactions. Asset paths are generated server-side from UUID and MIME extension.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/gateway test -- src/config src/persistence
pnpm --filter @tavern-canvas/gateway typecheck
git add apps/gateway pnpm-lock.yaml
git commit -m "feat(gateway): add secure configuration and job storage"
```

---

## Task 7: Implement Gateway HTTP API, authentication, assets, and workers

**Files:**
- Create: `apps/gateway/src/http/create_app.ts`
- Create: `apps/gateway/src/http/authentication.ts`
- Create: `apps/gateway/src/http/error_handler.ts`
- Create: `apps/gateway/src/http/routes/capabilities.ts`
- Create: `apps/gateway/src/http/routes/jobs.ts`
- Create: `apps/gateway/src/http/routes/job_events.ts`
- Create: `apps/gateway/src/http/routes/assets.ts`
- Create: `apps/gateway/src/jobs/job_service.ts`
- Create: `apps/gateway/src/jobs/job_worker.ts`
- Create: `apps/gateway/src/logging/logger.ts`
- Create: `apps/gateway/src/index.ts`
- Test: `apps/gateway/src/http/gateway_api.test.ts`
- Test: `apps/gateway/src/jobs/job_recovery.test.ts`

**Step 1: Write failing API tests against a real random-port server**

Cover:

- `GET /healthz` returns process/database readiness without auth;
- all `/v1` routes require a valid bearer token;
- CORS accepts exact configured origins and rejects all others;
- `GET /v1/capabilities` returns protocol `1.0`, enabled providers, capabilities, and limits;
- `POST /v1/jobs` returns `202`, stable job ID, and replayed request ID returns the same job;
- unknown provider/model and client URL/header fields return `400`;
- `GET /v1/jobs/:job_id` returns normalized state only;
- SSE sets `Content-Type: text/event-stream`, `Cache-Control: no-cache`, and ordered IDs;
- polling returns equivalent state after SSE disconnect;
- `DELETE` is idempotent;
- JSON body limit is enforced before schema parsing;
- errors use stable codes and never expose stack traces in production.

Express 5 catches rejected async route promises automatically; keep the final four-argument error middleware last.

**Step 2: Write failing upload tests**

`POST /v1/assets` accepts bounded PNG, JPEG, and WebP reference images only. Validate magic bytes with `file-type`, decode metadata with Sharp, enforce maximum bytes/pixels/dimensions, strip metadata on canonical storage, hash canonical bytes, and deduplicate by SHA-256. Reject SVG, HTML, archives, video, polyglot fixtures, mismatched content type, excess files, and path fragments.

**Step 3: Implement workers and restart recovery**

Workers claim queued jobs transactionally, run the configured adapter, append events, store assets, and publish SSE notifications. On restart:

- `queued` and `preparing` return to `queued`;
- `submitting` or `running` resumes only when the adapter persisted a queryable upstream submission ID;
- otherwise it becomes `failed` with `provider_unavailable` and remains user-retryable;
- terminal jobs remain unchanged.

No in-memory state may be the sole source of truth for a submitted Gateway job.

**Step 4: Add security middleware**

Use Helmet, exact-origin CORS, bearer-token hash comparison, per-token rate limits, request correlation IDs, and configured size limits. Bind to loopback by default. Pino serializers pass every object through the redaction layer before output.

**Step 5: Verify and commit**

```bash
pnpm --filter @tavern-canvas/gateway test -- src/http src/jobs
pnpm --filter @tavern-canvas/gateway typecheck
pnpm --filter @tavern-canvas/gateway build
git add apps/gateway
git commit -m "feat(gateway): add persistent image job API"
```

---

## Task 8: Run provider and Gateway smoke verification

**Files:**
- Create: `tests/integration/gateway_flow.test.ts`
- Create: `tests/integration/provider_contract_matrix.test.ts`
- Modify: `vitest.config.ts`

**Step 1: Add the provider matrix**

Run the shared contract suite for all five adapters and report each case by provider. The matrix must cover success, multiple images, content rejection, rate limit, timeout, cancellation, malformed response, and reference-image behavior when supported.

**Step 2: Add a full Gateway scenario**

Start a real Gateway on a random loopback port with a temporary SQLite directory and a scripted fake upstream. Exercise:

1. capability discovery;
2. authenticated asset upload;
3. idempotent job submission;
4. SSE progress and completion;
5. asset retrieval metadata;
6. process shutdown and reopen;
7. completed job/status recovery;
8. a new job with SSE disabled and polling fallback;
9. cancellation;
10. redacted log inspection.

**Step 3: Run the Stage 03 gate**

```bash
pnpm --filter @tavern-canvas/contracts test -- src/providers
pnpm --filter @tavern-canvas/providers test
pnpm --filter @tavern-canvas/extension test -- src/transport
pnpm --filter @tavern-canvas/gateway test
pnpm vitest run tests/integration/provider_contract_matrix.test.ts tests/integration/gateway_flow.test.ts
pnpm typecheck
pnpm build
```

**Step 4: Commit**

```bash
git add tests vitest.config.ts
git commit -m "test(gateway): verify provider and recovery flows"
```

## Stage 03 completion evidence

Report:

- official provider documentation URLs and fixture retrieval dates;
- contract matrix results for all five adapters;
- retry attempt counts and `Retry-After` cases;
- SQLite pragma values and recovery cases;
- HTTP route status/result summary;
- accepted/rejected upload fixture counts;
- log scan proving fixture prompts and secrets are absent;
- focused test counts, typecheck, and build exit codes.
