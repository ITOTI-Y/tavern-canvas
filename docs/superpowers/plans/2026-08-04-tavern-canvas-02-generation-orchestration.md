# TavernCanvas Stage 02: Generation Orchestration Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `executing-plans` and `test-driven-development`. Complete Stage 01 first. Run only focused Vitest and the generation harness in this stage.

**Goal:** Implement deterministic main-LLM image requests, parallel provider jobs, and message attachment that remains correct across tool recursion, chat switches, swipe changes, deletion, and extension refresh.

**Architecture:** A root `GenerationSession` captures the input context and anchors. A native `request_image` tool or one bounded hidden-comment parser creates validated jobs. `ImageJobQueue` owns concurrency and cancellation. `MessageBinder` is the only component that updates assistant swipe metadata and media.

**Tech Stack:** TypeScript 6.0.3, Zod 4, `@noble/hashes` 2.2.0, Vitest 4, and Stage 01 host/contracts/core packages.

---

## Task 1: Implement canonical context hashing and anchors

**Files:**
- Create: `packages/core/src/generation/canonical_json.ts`
- Create: `packages/core/src/generation/source_context.ts`
- Create: `packages/core/src/generation/anchors.ts`
- Test: `packages/core/src/generation/canonical_json.test.ts`
- Test: `packages/core/src/generation/anchors.test.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Write failing canonicalization tests**

Cover:

- object key insertion order does not change canonical JSON;
- array order does change canonical JSON;
- strings are preserved exactly, including CJK and line breaks;
- `undefined`, functions, symbols, `NaN`, infinities, cyclic objects, class instances, maps, and sets are rejected;
- `-0` serializes as `0`;
- two identical source contexts produce the same `source_anchor`;
- distinct random invocation bytes produce distinct `generation_anchor` values;
- fixed context and fixed random bytes produce a committed 64-character lowercase hash fixture.

Use this source schema:

```ts
export const SourceContextSchema = z.strictObject({
  schema_version: z.literal(1),
  chat_id: z.string().min(1).max(512),
  active_swipes: z.array(
    z.object({
      message_id: z.number().int().nonnegative(),
      swipe_id: z.number().int().nonnegative(),
    }),
  ),
  messages: z.array(
    z.object({
      message_id: z.number().int().nonnegative(),
      role: z.enum(["user", "assistant", "system"]),
      content_sha256: Sha256Schema,
      swipe_id: z.number().int().nonnegative().nullable(),
    }),
  ),
});
```

**Step 2: Confirm failure**

```bash
pnpm --filter @tavern-canvas/core test -- src/generation/canonical_json.test.ts src/generation/anchors.test.ts
```

**Step 3: Implement canonicalization and hashing**

`canonical_json` recursively emits JSON with lexicographically sorted object keys and unchanged array order. It accepts only JSON primitives, arrays, and plain objects. Hash UTF-8 bytes with bundled `@noble/hashes`; do not call `crypto.subtle`.

Expose dependency injection for random bytes in tests:

```ts
export interface RandomSource {
  bytes(length: number): Uint8Array;
}

export function create_generation_anchors(
  source_context: SourceContext,
  random_source: RandomSource,
): GenerationAnchors {
  const source_anchor = sha256_hex(canonical_json(source_context));
  const invocation_id = bytes_to_hex(random_source.bytes(32));
  const generation_anchor = sha256_hex(`${source_anchor}${invocation_id}`);
  return { source_anchor, generation_anchor };
}
```

The production `RandomSource` wraps `crypto.getRandomValues` and throws at startup if unavailable. Do not use time, `Math.random`, message index, or current chat state in anchor generation.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/core test -- src/generation
pnpm --filter @tavern-canvas/core typecheck
git add packages/core
git commit -m "feat(generation): add deterministic generation anchors"
```

---

## Task 2: Implement root generation sessions and prompt policy

**Files:**
- Create: `packages/core/src/generation/generation_session.ts`
- Create: `packages/core/src/generation/session_registry.ts`
- Create: `packages/core/src/generation/tool_policy.ts`
- Test: `packages/core/src/generation/session_registry.test.ts`
- Test: `packages/core/src/generation/tool_policy.test.ts`
- Modify: `packages/contracts/src/generation.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Write failing session tests**

Test:

- depth `0` creates one root session;
- recursive tool generations with the same host root ID reuse the same anchors;
- a regenerate with the same source context but a new host root ID creates a new `generation_anchor` and the same `source_anchor`;
- a completed session remains readable for late image results until its retention deadline;
- expired sessions reject new tool actions;
- changing chats does not alter an existing session;
- registry cleanup never removes a session with queued or running jobs.

`GenerationSession` is immutable except for lifecycle timestamps and associated request IDs:

```ts
export interface GenerationSession {
  readonly session_id: string;
  readonly host_root_generation_id: string;
  readonly chat_id: string;
  readonly source_context: SourceContext;
  readonly source_anchor: string;
  readonly generation_anchor: string;
  readonly started_at: string;
  readonly request_ids: ReadonlySet<string>;
  completed_at: string | null;
}
```

**Step 2: Write failing prompt-policy tests**

Assert that native-tool policy contains only:

1. the exact current `generation_anchor`;
2. when image generation is appropriate;
3. call the tool before writing final assistant text.

Fallback policy must contain the exact grammar and no native tool registration. Private prompt generation must always set an empty tools array and `tool_choice: "none"`.

**Step 3: Implement session registry and policies**

The registry keys roots by host generation root ID and anchors by generation hash. It returns explicit errors for missing, expired, or mismatched sessions. Do not store message DOM nodes or mutable host context objects.

Native policy returns structured host injection data. Fallback grammar is exactly:

```html
<!-- tavern-canvas:image {"generation_anchor":"<64 lowercase hex>","scene_description":"<text>"} -->
```

The production prompt contains no provider name, URL, secret, workflow JSON, arbitrary headers, or World Info tool-control instruction.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/core test -- src/generation/session_registry.test.ts src/generation/tool_policy.test.ts
pnpm --filter @tavern-canvas/core typecheck
git add packages/core packages/contracts
git commit -m "feat(generation): add root generation sessions"
```

---

## Task 3: Add the native tool and streaming fallback parser

**Files:**
- Create: `packages/core/src/generation/request_image_tool.ts`
- Create: `packages/core/src/generation/fallback_stream_parser.ts`
- Create: `apps/extension/src/modules/generation/generation_trigger_module.ts`
- Test: `packages/core/src/generation/request_image_tool.test.ts`
- Test: `packages/core/src/generation/fallback_stream_parser.test.ts`
- Test: `apps/extension/src/modules/generation/generation_trigger_module.test.ts`

**Step 1: Write failing native-tool tests**

The tool definition exposed to the host must be named `request_image`, non-stealth, and use a strict JSON schema matching `RequestImageArgumentsSchema`. The action must:

- reject an anchor not owned by the active root session;
- reject an expired session;
- generate a UUID request ID;
- enqueue and return before provider execution starts;
- return only `{ status: "queued", request_id, generation_anchor }`;
- never include prompt details, provider settings, image data, or task timeline in the tool result.

**Step 2: Write exhaustive fragmented-parser tests**

Use one valid comment and split it at every character boundary. For each split, feed two chunks and assert exactly one request. Also test:

- opener and closer split across multiple chunks;
- ordinary HTML comments before and after the grammar;
- multiple valid requests in one session;
- malformed JSON;
- unknown keys;
- more than 16,384 bytes before closure;
- scene text longer than 12,000 characters;
- mismatched anchor;
- trailing incomplete comment on stream end;
- native-tool mode disables parser consumption;
- parser receives only the current response stream and has no history-scan API.

**Step 3: Confirm failures**

```bash
pnpm --filter @tavern-canvas/core test -- src/generation/request_image_tool.test.ts src/generation/fallback_stream_parser.test.ts
pnpm --filter @tavern-canvas/extension test -- src/modules/generation/generation_trigger_module.test.ts
```

**Step 4: Implement bounded parsing**

Use a state machine with three states: `text`, `candidate`, and `discarding_oversize`. Retain at most the opener length minus one while scanning ordinary text and at most 16,384 bytes for a candidate. Parse only after the exact `-->` closer. Validate JSON with `RequestImageArgumentsSchema` and compare anchors with the current session before emitting.

Return cleaned raw message text separately from parsed requests so the host adapter removes only TavernCanvas control comments. Do not parse rendered HTML.

**Step 5: Wire one trigger mode per generation**

`generation_trigger_module` chooses native tool when `native_tool_manager` is available; otherwise it installs the fallback stream listener. It cannot enable both. It unregisters tool/listener subscriptions when the root generation ends or the module stops.

**Step 6: Verify and commit**

```bash
pnpm --filter @tavern-canvas/core test -- src/generation
pnpm --filter @tavern-canvas/extension test -- src/modules/generation
pnpm typecheck
git add packages/core apps/extension
git commit -m "feat(generation): add tool and fallback triggers"
```

---

## Task 4: Implement job state, deduplication, queueing, and cancellation

**Files:**
- Modify: `packages/contracts/src/generation.ts`
- Create: `packages/core/src/jobs/generation_job.ts`
- Create: `packages/core/src/jobs/job_state_machine.ts`
- Create: `packages/core/src/jobs/image_job_queue.ts`
- Create: `packages/core/src/jobs/job_executor.ts`
- Test: `packages/core/src/jobs/job_state_machine.test.ts`
- Test: `packages/core/src/jobs/image_job_queue.test.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Write failing transition tests**

Allow only:

```text
queued -> preparing | cancelled
preparing -> submitting | failed | cancelled
submitting -> running | completed | failed | cancelled
running -> completed | failed | cancelled
completed -> attached | orphaned
```

Terminal states are `failed`, `cancelled`, `attached`, and `orphaned`. Repeating cancellation is a successful no-op. Every other transition throws before mutation and includes job ID, prior state, and attempted state in a typed internal error.

**Step 2: Write failing queue tests**

Use controllable deferred provider promises and assert:

- global default concurrency is 4;
- per-provider configured limits are enforced simultaneously;
- five jobs start only four executors until one settles;
- two identical automatic requests in the same generation session share one job by `request_digest`;
- explicit user regeneration creates a new request ID and bypasses automatic dedupe;
- request digest is SHA-256 of generation anchor plus canonical tool arguments;
- each job owns a distinct `AbortController`;
- cancelling one job does not affect siblings;
- queued cancellation never calls provider execution;
- executor failure frees its concurrency slot;
- queue listeners receive immutable job snapshots.

**Step 3: Implement the queue**

`ImageJobQueue` accepts a `JobExecutor` interface and a persistence port, both injected. It must not import provider adapters or IndexedDB. State changes are written before publishing domain events. Queue scheduling uses FIFO within a provider and round-robin across providers to prevent one provider from starving others.

A job includes immutable identity/context fields and mutable execution state:

```ts
export interface GenerationJob {
  readonly job_id: string;
  readonly request_id: string;
  readonly request_digest: string;
  readonly generation_anchor: string;
  readonly source_anchor: string;
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly provider_id: ProviderId;
  readonly arguments: RequestImageArguments;
  state: GenerationState;
  created_at: string;
  updated_at: string;
  error: ProviderError | null;
  image_ids: string[];
}
```

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/core test -- src/jobs
pnpm --filter @tavern-canvas/core typecheck
git add packages/core packages/contracts
git commit -m "feat(generation): add concurrent image job queue"
```

---

## Task 5: Implement final-assistant swipe binding

**Files:**
- Create: `packages/core/src/messages/message_binding.ts`
- Create: `packages/core/src/messages/message_binder.ts`
- Create: `apps/extension/src/modules/generation/message_binding_module.ts`
- Test: `packages/core/src/messages/message_binder.test.ts`
- Test: `apps/extension/src/modules/generation/message_binding_module.test.ts`

**Step 1: Write failing binder tests**

Use an in-memory `MessagePort` and cover:

- tool/system/intermediate messages are ignored;
- the final assistant swipe receives source/generation anchors and all current request IDs;
- image completion before final text waits for the target assistant binding;
- final text before image completion attaches when the image arrives;
- switching to another chat does not redirect the result;
- changing the active swipe does not attach to a nonmatching swipe;
- returning to the matching chat/swipe resumes attachment;
- deleting the target message or swipe produces `orphaned` and leaves the image in the gallery;
- duplicate completion events do not duplicate `extra.media` or metadata image IDs;
- host update failure leaves the job `completed`, retries on the next matching chat refresh, and never targets the last message as fallback.

Define the boundary port:

```ts
export interface MessagePort {
  find_target(request: MessageTargetQuery): Promise<MessageTarget | null>;
  update_target(request: MessageAttachmentUpdate): Promise<void>;
  subscribe_final_assistant(handler: FinalAssistantHandler): () => void;
  subscribe_chat_change(handler: ChatChangeHandler): () => void;
  subscribe_swipe_change(handler: SwipeChangeHandler): () => void;
}
```

**Step 2: Confirm failure**

```bash
pnpm --filter @tavern-canvas/core test -- src/messages
pnpm --filter @tavern-canvas/extension test -- src/modules/generation/message_binding_module.test.ts
```

**Step 3: Implement binding without DOM access**

`MessageBinder` matches exactly `chat_id`, `generation_anchor`, and `swipe_id`. It merges TavernCanvas metadata and host `extra.media` by stable image ID. It never calls `document.querySelector`, inspects `.last_mes`, or infers the current last assistant layer.

The standard SillyTavern port uses supported chat/message metadata save and refresh APIs. The Tauri adapter uses ChatSurface only when that capability exists. Both implement the same port and pass the same contract tests.

**Step 4: Verify and commit**

```bash
pnpm --filter @tavern-canvas/core test -- src/messages
pnpm --filter @tavern-canvas/extension test -- src/modules/generation/message_binding_module.test.ts
pnpm typecheck
git add packages/core apps/extension
git commit -m "feat(generation): bind results to anchored assistant swipes"
```

---

## Task 6: Prove the complete generation flow in a host harness

**Files:**
- Create: `tests/harness/src/fake_host.ts`
- Create: `tests/harness/src/controlled_provider.ts`
- Create: `tests/integration/generation_flow.test.ts`
- Modify: `vitest.config.ts`

**Step 1: Build a deterministic fake host**

The harness exposes public host events, a tool registry, raw response chunks, chats/messages/swipes, and metadata update calls. It must not mimic private SillyTavern DOM. The controlled provider records start order and resolves jobs only when the test instructs it.

**Step 2: Add required integration scenarios**

Implement tests for:

1. three native tool calls return queued results before any provider completes, then run concurrently;
2. recursive host generation reuses the root anchor and binds only the final assistant;
3. fallback comment split at every byte boundary produces one job and disappears from saved text;
4. native tool mode ignores a fallback-shaped comment in model text;
5. chat switch during generation preserves the original target;
6. swipe switch during generation leaves completion pending until the target swipe returns;
7. deleted target becomes orphaned;
8. repeated automatic request digest creates one job;
9. one cancellation leaves sibling jobs running.

**Step 3: Run the smoke scenario**

```bash
pnpm vitest run tests/integration/generation_flow.test.ts --reporter=verbose
```

Expected: all nine end-to-end generation scenarios pass in a fresh Vitest process.

**Step 4: Run the Stage 02 gate**

```bash
pnpm --filter @tavern-canvas/contracts test
pnpm --filter @tavern-canvas/core test
pnpm --filter @tavern-canvas/extension test -- src/host src/modules/generation
pnpm vitest run tests/integration/generation_flow.test.ts
pnpm typecheck
pnpm build
```

**Step 5: Commit**

```bash
git add tests vitest.config.ts
git commit -m "test(generation): cover anchored parallel generation"
```

## Stage 02 completion evidence

Report:

- fixed canonical hash fixture;
- fragmented parser split count and pass count;
- observed maximum concurrent provider executions;
- tool action completion before provider resolution;
- chat/swipe switch outcomes;
- orphan outcome after deletion;
- focused test counts and build exit code.
