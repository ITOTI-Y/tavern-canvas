// @vitest-environment node

import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";
import type { ProviderId } from "@tavern-canvas/contracts";
import {
  SdWebuiAdapter,
  type ProviderPollResult,
  type ProviderSubmission,
  type ProviderTransport,
  type ProviderTransportOperation,
  type ProviderTransportResponse,
} from "@tavern-canvas/providers";
import { AssetStore } from "../assets/asset_store.js";
import { load_gateway_config } from "../config/load_config.js";
import { JobService } from "./job_service.js";
import { JobWorker, type GatewayAdapter, type ProviderTransportFactory } from "./job_worker.js";
import { type GatewayLogger } from "../logging/logger.js";
import { AssetRepository } from "../persistence/asset_repository.js";
import { open_gateway_database } from "../persistence/database.js";
import { JobRepository } from "../persistence/job_repository.js";

const TOKEN = "worker-test-token";
const CREATED_AT = "2026-08-05T12:00:00.000Z";
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);
const PNG_SHA256 = createHash("sha256").update(PNG_BYTES).digest("hex");
const OUTPUT_ASSET_ONE = {
  asset_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  media_type: "image/png" as const,
  byte_length: PNG_BYTES.byteLength,
  sha256: PNG_SHA256,
};
const OUTPUT_ASSET_TWO = {
  asset_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  media_type: "image/png" as const,
  byte_length: PNG_BYTES.byteLength,
  sha256: PNG_SHA256,
};

const silent_logger: GatewayLogger = {
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
  debug: () => undefined,
  child: () => silent_logger,
  flush: () => undefined,
};

const DEFAULT_PROVIDER_CONFIG = {
  provider_id: "openai_image",
  base_url: "https://api.example.com",
  credential: "provider-secret",
  profile: {
    profile_id: "openai-test",
    provider_id: "openai_image",
    model_allowlist: ["gpt-image-1"],
    output_mime_type_allowlist: ["image/png"],
    remote_asset_origin_allowlist: [],
    max_response_bytes: 20_000_000,
    max_input_asset_bytes: 20_000_000,
  },
} as const;

const SD_PROVIDER_CONFIG = {
  provider_id: "sd_webui",
  base_url: "https://sd.example.com",
  profile: {
    profile_id: "sd-test",
    provider_id: "sd_webui",
    model_allowlist: ["sdxl-base"],
    output_mime_type_allowlist: ["image/png"],
    max_response_bytes: 2_000_000,
  },
} as const;

function create_config(
  directory: string,
  concurrency = "1",
  provider_config:
    typeof DEFAULT_PROVIDER_CONFIG | typeof SD_PROVIDER_CONFIG = DEFAULT_PROVIDER_CONFIG,
) {
  return load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([
        createHash("sha256").update(TOKEN).digest("hex"),
      ]),
      TAVERN_CANVAS_DATA_DIR: directory,
      TAVERN_CANVAS_CONCURRENCY: concurrency,
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([provider_config]),
    },
  });
}

function request(request_id: string) {
  return {
    provider_id: "openai_image" as const,
    request_id,
    generation_anchor: "c".repeat(64),
    prompt: "recovery test",
    output_count: 1,
    mode: "generate" as const,
    model_id: "gpt-image-1" as const,
    size: "1024x1024" as const,
    quality: "low" as const,
    background: "opaque" as const,
    output_format: "png" as const,
    input_asset_ids: [],
  };
}

function sd_request(request_id: string) {
  return {
    provider_id: "sd_webui" as const,
    request_id,
    generation_anchor: "d".repeat(64),
    prompt: "worker cancellation test",
    output_count: 1,
    mode: "txt2img" as const,
    model_id: "sdxl-base",
    sampler: "Euler a",
    scheduler: "Automatic",
    width: 512,
    height: 512,
    steps: 1,
    cfg_scale: 7,
  };
}

function deferred<T>(): {
  readonly promise: Promise<T>;
  readonly resolve: (value: T) => void;
} {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolve_promise) => {
    resolve = resolve_promise;
  });
  return { promise, resolve };
}

async function wait_for(predicate: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) {
      return;
    }
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  throw new Error("Condition did not become true");
}

async function wait_for_real_time(predicate: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) {
      return;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
  throw new Error("Condition did not become true");
}

class BlockingSdTransport implements ProviderTransport {
  readonly operations: ProviderTransportOperation[] = [];

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    this.operations.push(operation);
    if (operation.route === "/sdapi/v1/interrupt") {
      return Promise.resolve({
        status: 200,
        headers: {},
        body: new Uint8Array(),
      });
    }
    return new Promise<ProviderTransportResponse>((_resolve, reject) => {
      const abort = () => reject(new DOMException("Aborted", "AbortError"));
      if (operation.signal.aborted) {
        abort();
        return;
      }
      operation.signal.addEventListener("abort", abort, { once: true });
    });
  }
}

class CompletedThenBlockingSdTransport implements ProviderTransport {
  readonly operations: ProviderTransportOperation[] = [];
  readonly second_submit_started = deferred<void>();
  readonly second_submit_signal = deferred<AbortSignal>();

  execute(operation: ProviderTransportOperation): Promise<ProviderTransportResponse> {
    this.operations.push(operation);
    if (operation.route === "/sdapi/v1/interrupt") {
      return Promise.resolve({
        status: 200,
        headers: {},
        body: new Uint8Array(),
      });
    }
    if (operation.route !== "/sdapi/v1/txt2img") {
      return Promise.reject(new Error(`Unexpected SD route ${operation.route}`));
    }
    const submit_count = this.operations.filter(
      ({ route }) => route === "/sdapi/v1/txt2img",
    ).length;
    if (submit_count === 1) {
      return Promise.resolve({
        status: 200,
        headers: { "content-type": "application/json" },
        body: new TextEncoder().encode(
          JSON.stringify({
            images: [PNG_BYTES.toString("base64")],
            parameters: {},
            info: '{"seed":42,"all_seeds":[42]}',
          }),
        ),
      });
    }
    this.second_submit_started.resolve(undefined);
    return new Promise<ProviderTransportResponse>((_resolve, reject) => {
      const abort = () => reject(new DOMException("Aborted", "AbortError"));
      this.second_submit_signal.resolve(operation.signal);
      if (operation.signal.aborted) {
        abort();
        return;
      }
      operation.signal.addEventListener("abort", abort, { once: true });
    });
  }
}

function make_adapter(): GatewayAdapter {
  return {
    provider_id: "openai_image",
    capabilities: new Set(["text_to_image"]),
    validate_profile: (profile: unknown) => profile as never,
    submit: async () => ({
      state: "pending" as const,
      submission_id: "upstream-recovery-1",
      poll_after_ms: 0,
    }),
    poll: async () => ({
      state: "failed" as const,
      error: { code: "provider_unavailable" as const, retryable: true },
    }),
    cancel: async () => undefined,
  } as unknown as GatewayAdapter;
}

type OutputAsset = typeof OUTPUT_ASSET_ONE | typeof OUTPUT_ASSET_TWO;

function make_completed_adapter(
  request_id: string,
  assets: readonly OutputAsset[] = [OUTPUT_ASSET_ONE],
): GatewayAdapter {
  return {
    provider_id: "openai_image",
    capabilities: new Set(["text_to_image"]),
    validate_profile: (profile: unknown) => profile as never,
    submit: async () => ({
      state: "completed" as const,
      result: {
        request_id,
        provider_id: "openai_image" as const,
        assets,
      },
      output_assets: assets.map((asset) => ({ asset, bytes: PNG_BYTES })),
    }),
    poll: async () => ({ state: "pending" as const }),
    cancel: async () => undefined,
  } as unknown as GatewayAdapter;
}

async function create_worker_fixture(
  options: {
    readonly concurrency?: string;
    readonly adapter?: GatewayAdapter;
    readonly provider_config?: typeof DEFAULT_PROVIDER_CONFIG | typeof SD_PROVIDER_CONFIG;
    readonly transport_factory?: ProviderTransportFactory;
    readonly use_default_sleep?: boolean;
  } = {},
) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-recovery-"));
  const provider_config = options.provider_config ?? DEFAULT_PROVIDER_CONFIG;
  const provider_id = provider_config.provider_id as ProviderId;
  const config = create_config(directory, options.concurrency ?? "1", provider_config);
  const database = open_gateway_database({
    file_path: path.join(directory, "tavern_canvas.sqlite"),
  });
  const asset_repository = new AssetRepository(database.connection);
  const job_repository = new JobRepository(database.connection);
  const asset_store = new AssetStore({
    data_directory: directory,
    asset_repository,
    ...config.limits,
  });
  const service = new JobService({
    job_repository,
    asset_repository,
    config,
    clock: () => CREATED_AT,
  });
  const worker = new JobWorker({
    service,
    asset_store,
    config,
    adapters: new Map([[provider_id, options.adapter ?? make_adapter()]]),
    logger: silent_logger,
    clock: () => CREATED_AT,
    ...(options.transport_factory === undefined
      ? {}
      : { transport_factory: options.transport_factory }),
    ...(options.use_default_sleep ? {} : { sleep: async () => undefined }),
  });
  return { directory, database, job_repository, asset_repository, asset_store, service, worker };
}

async function wait_for_state(service: JobService, job_id: string, state: "failed"): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (service.get_stored_job(job_id)?.state === state) {
      return;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
  throw new Error(`Job did not reach ${state}`);
}

describe("JobWorker restart recovery", () => {
  it("returns preparing jobs to queued and fails active jobs without a persisted submission", async () => {
    const fixture = await create_worker_fixture();
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("11111111-1111-4111-8111-111111111111"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "preparing",
        event_type: "preparing",
        event: { state: "preparing" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      expect(fixture.service.list_events(created.job.job_id).map((event) => event.state)).toContain(
        "queued",
      );

      const active = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("33333333-3333-4333-8333-333333333333"),
      });
      fixture.job_repository.transition_with_event({
        job_id: active.job.job_id,
        state: "submitting",
        event_type: "submitting",
        event: { state: "submitting" },
        created_at: CREATED_AT,
      });
      await fixture.worker.stop();
      const restarted = new JobWorker({
        service: fixture.service,
        asset_store: fixture.asset_store,
        config: create_config(fixture.directory),
        adapters: new Map([["openai_image", make_adapter()]]),
        logger: silent_logger,
        clock: () => CREATED_AT,
        sleep: async () => undefined,
      });
      await restarted.start();
      expect(fixture.service.get_stored_job(active.job.job_id)?.state).toBe("failed");
      expect(fixture.service.get_job(active.job.job_id)?.error?.code).toBe("provider_unavailable");
      await restarted.stop();
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("polls a persisted submission instead of treating it as in-memory state", async () => {
    const fixture = await create_worker_fixture();
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("22222222-2222-4222-8222-222222222222"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-recovery-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for_state(fixture.service, created.job.job_id, "failed");
      expect(fixture.service.get_stored_job(created.job.job_id)?.state).toBe("failed");
      await fixture.worker.stop();
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("leaves terminal jobs unchanged without submitting or polling", async () => {
    let submit_calls = 0;
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      submit: async () => {
        submit_calls += 1;
        return {
          state: "pending" as const,
          submission_id: "unexpected-terminal-submit",
        };
      },
      poll: async () => {
        poll_calls += 1;
        return {
          state: "failed" as const,
          error: { code: "provider_unavailable" as const, retryable: true },
        };
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    const terminal_cases = [
      ["completed", "66666666-6666-4666-8666-666666666660"],
      ["failed", "66666666-6666-4666-8666-666666666661"],
      ["cancelled", "66666666-6666-4666-8666-666666666662"],
      ["attached", "66666666-6666-4666-8666-666666666663"],
      ["orphaned", "66666666-6666-4666-8666-666666666664"],
    ] as const;
    try {
      const jobs = terminal_cases.map(([state, request_id]) => {
        const created = fixture.service.create_job({
          protocol_version: "1.0",
          request: request(request_id),
        });
        fixture.job_repository.transition_with_event({
          job_id: created.job.job_id,
          state,
          event_type: state,
          event: { state },
          created_at: CREATED_AT,
        });
        return { job_id: created.job.job_id, state };
      });

      await fixture.worker.start();
      await new Promise<void>((resolve) => setImmediate(resolve));

      expect(jobs.map(({ job_id }) => fixture.service.get_stored_job(job_id)?.state)).toEqual(
        jobs.map(({ state }) => state),
      );
      expect(submit_calls).toBe(0);
      expect(poll_calls).toBe(0);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("does not re-submit an active job when an idempotent enqueue is replayed", async () => {
    const blocked_submission = deferred<ProviderSubmission>();
    let submit_calls = 0;
    const adapter = {
      ...make_adapter(),
      submit: async () => {
        submit_calls += 1;
        return blocked_submission.promise;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ concurrency: "2", adapter });
    try {
      await fixture.worker.start();
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("44444444-4444-4444-8444-444444444444"),
      });
      fixture.worker.enqueue(created.job.job_id);
      await wait_for(() => submit_calls === 1);

      const replay = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("44444444-4444-4444-8444-444444444444"),
      });
      expect(replay.created).toBe(false);
      fixture.worker.enqueue(replay.job.job_id);
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(submit_calls).toBe(1);
    } finally {
      blocked_submission.resolve({
        state: "pending",
        submission_id: "upstream-duplicate-1",
        poll_after_ms: 0,
      });
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("preserves a running submission across stop and resumes polling after restart", async () => {
    const blocked_poll = deferred<ProviderPollResult>();
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      poll: async () => {
        poll_calls += 1;
        return blocked_poll.promise;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    let restarted: JobWorker | undefined;
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("55555555-5555-4555-8555-555555555555"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-stop-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for(() => poll_calls === 1);

      const stopping = fixture.worker.stop();
      expect(fixture.service.get_stored_job(created.job.job_id)?.state).toBe("running");
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await stopping;
      expect(fixture.service.get_stored_job(created.job.job_id)?.state).toBe("running");

      let resumed_poll_calls = 0;
      const restarted_adapter = {
        ...make_adapter(),
        poll: async () => {
          resumed_poll_calls += 1;
          return {
            state: "failed" as const,
            error: { code: "provider_unavailable" as const, retryable: true },
          };
        },
      } as GatewayAdapter;
      restarted = new JobWorker({
        service: fixture.service,
        asset_store: fixture.asset_store,
        config: create_config(fixture.directory),
        adapters: new Map([["openai_image", restarted_adapter]]),
        logger: silent_logger,
        clock: () => CREATED_AT,
        sleep: async () => undefined,
      });
      await restarted.start();
      await wait_for_state(fixture.service, created.job.job_id, "failed");
      expect(resumed_poll_calls).toBe(1);
    } finally {
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await fixture.worker.stop();
      await restarted?.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("calls upstream cancellation once with a fresh signal", async () => {
    const blocked_poll = deferred<ProviderPollResult>();
    let poll_calls = 0;
    let cancel_calls = 0;
    let cancel_signal_aborted: boolean | undefined;
    const adapter = {
      ...make_adapter(),
      capabilities: new Set(["text_to_image", "cancel"] as const),
      poll: async () => {
        poll_calls += 1;
        return blocked_poll.promise;
      },
      cancel: async (
        context: { readonly signal: AbortSignal },
        submission: ProviderSubmission | undefined,
      ) => {
        expect(submission).toEqual({
          state: "pending",
          submission_id: "upstream-cancel-1",
        });
        cancel_calls += 1;
        cancel_signal_aborted = context.signal.aborted;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("66666666-6666-4666-8666-666666666666"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-cancel-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for(() => poll_calls === 1);

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      await wait_for(() => cancel_calls === 1);
      expect(cancel_signal_aborted).toBe(false);

      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await fixture.worker.stop();
    } finally {
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("submits a queued job recovered before worker start exactly once", async () => {
    let submit_calls = 0;
    const adapter = {
      ...make_adapter(),
      submit: async () => {
        submit_calls += 1;
        return {
          state: "pending" as const,
          submission_id: "upstream-queued-1",
        };
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("77777777-7777-4777-8777-777777777777"),
      });
      await fixture.worker.start();
      await wait_for_state(fixture.service, created.job.job_id, "failed");
      expect(submit_calls).toBe(1);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("polls a persisted submitting job without re-submitting it", async () => {
    let submit_calls = 0;
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      submit: async () => {
        submit_calls += 1;
        return {
          state: "pending" as const,
          submission_id: "upstream-unexpected-submit-1",
        };
      },
      poll: async () => {
        poll_calls += 1;
        return {
          state: "failed" as const,
          error: { code: "provider_unavailable" as const, retryable: true },
        };
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("88888888-8888-4888-8888-888888888888"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "submitting",
        event_type: "submitting",
        event: { state: "submitting" },
        submission: { state: "pending", submission_id: "upstream-persisted-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for_state(fixture.service, created.job.job_id, "failed");
      expect(submit_calls).toBe(0);
      expect(poll_calls).toBe(1);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });
  it("does not attach staged output when cancellation wins completion", async () => {
    const request_id = "99999999-9999-4999-8999-999999999991";
    let cancel_calls = 0;
    const adapter = {
      ...make_completed_adapter(request_id),
      capabilities: new Set(["text_to_image", "cancel"] as const),
      cancel: async () => {
        cancel_calls += 1;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    const stage_started = deferred<void>();
    const release_stage = deferred<void>();
    const register_generated_asset = fixture.asset_store.register_generated_asset.bind(
      fixture.asset_store,
    );
    fixture.asset_store.register_generated_asset = async (generated, created_at) => {
      stage_started.resolve(undefined);
      await release_stage.promise;
      return register_generated_asset(generated, created_at);
    };
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request(request_id),
      });
      await fixture.worker.start();
      fixture.worker.enqueue(created.job.job_id);
      await stage_started.promise;

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      expect(cancel_calls).toBe(0);
      release_stage.resolve(undefined);
      await wait_for(
        () => fixture.service.get_stored_job(created.job.job_id)?.state === "cancelled",
      );

      expect(fixture.asset_repository.list_for_job(created.job.job_id)).toEqual([]);
      expect(fixture.service.get_job(created.job.job_id)).not.toHaveProperty("image_ids");
    } finally {
      release_stage.resolve(undefined);
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("fails without partial attachments when a later output asset fails staging", async () => {
    const request_id = "99999999-9999-4999-8999-999999999992";
    const fixture = await create_worker_fixture({
      adapter: make_completed_adapter(request_id, [OUTPUT_ASSET_ONE, OUTPUT_ASSET_TWO]),
    });
    let register_calls = 0;
    const register_generated_asset = fixture.asset_store.register_generated_asset.bind(
      fixture.asset_store,
    );
    fixture.asset_store.register_generated_asset = async (generated, created_at) => {
      register_calls += 1;
      if (register_calls === 2) {
        throw new Error("synthetic output staging failure");
      }
      return register_generated_asset(generated, created_at);
    };
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request(request_id),
      });
      await fixture.worker.start();
      fixture.worker.enqueue(created.job.job_id);
      await wait_for_state(fixture.service, created.job.job_id, "failed");

      expect(register_calls).toBe(2);
      expect(fixture.asset_repository.list_for_job(created.job.job_id)).toEqual([]);
      expect(fixture.service.get_job(created.job.job_id)).not.toHaveProperty("image_ids");
      expect(fixture.service.get_job(created.job.job_id)?.error).toEqual({
        code: "malformed_response",
        retryable: false,
      });
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("removes the poll abort listener when a sleep is aborted", async () => {
    const adapter = {
      ...make_adapter(),
      submit: async () => ({
        state: "pending" as const,
        submission_id: "upstream-listener-abort-1",
        poll_after_ms: 10_000,
      }),
    } as GatewayAdapter;
    const add_listener = vi.spyOn(AbortSignal.prototype, "addEventListener");
    const remove_listener = vi.spyOn(AbortSignal.prototype, "removeEventListener");
    const fixture = await create_worker_fixture({ adapter, use_default_sleep: true });
    try {
      const request_id = "99999999-9999-4999-8999-999999999994";
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request(request_id),
      });
      await fixture.worker.start();
      fixture.worker.enqueue(created.job.job_id);
      await wait_for(() => add_listener.mock.calls.some(([type]) => type === "abort"));

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      await wait_for(
        () => fixture.service.get_stored_job(created.job.job_id)?.state === "cancelled",
      );

      const added = add_listener.mock.calls.filter(([type]) => type === "abort").length;
      const removed = remove_listener.mock.calls.filter(([type]) => type === "abort").length;
      expect(added).toBe(1);
      expect(removed).toBe(added);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
      add_listener.mockRestore();
      remove_listener.mockRestore();
    }
  });

  it("removes each normal poll abort listener after its timer settles", async () => {
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      submit: async () => ({
        state: "pending" as const,
        submission_id: "upstream-listener-cleanup-1",
        poll_after_ms: 1,
      }),
      poll: async () => {
        poll_calls += 1;
        return poll_calls > 24
          ? {
              state: "failed" as const,
              error: { code: "provider_unavailable" as const, retryable: true },
            }
          : { state: "pending" as const, poll_after_ms: 1 };
      },
    } as GatewayAdapter;
    const add_listener = vi.spyOn(AbortSignal.prototype, "addEventListener");
    const remove_listener = vi.spyOn(AbortSignal.prototype, "removeEventListener");
    const fixture = await create_worker_fixture({ adapter, use_default_sleep: true });
    try {
      const request_id = "99999999-9999-4999-8999-999999999993";
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request(request_id),
      });
      await fixture.worker.start();
      fixture.worker.enqueue(created.job.job_id);
      await wait_for_real_time(
        () => fixture.service.get_stored_job(created.job.job_id)?.state === "failed",
      );

      const added = add_listener.mock.calls.filter(([type]) => type === "abort").length;
      const removed = remove_listener.mock.calls.filter(([type]) => type === "abort").length;
      expect(added).toBeGreaterThan(20);
      expect(removed).toBe(added);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
      add_listener.mockRestore();
      remove_listener.mockRestore();
    }
  });
  it("does not invoke upstream cancellation without the cancel capability", async () => {
    const blocked_poll = deferred<ProviderPollResult>();
    let poll_calls = 0;
    let cancel_calls = 0;
    const adapter = {
      ...make_adapter(),
      poll: async () => {
        poll_calls += 1;
        return blocked_poll.promise;
      },
      cancel: async () => {
        cancel_calls += 1;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("99999999-9999-4999-8999-999999999995"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-no-cancel-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for(() => poll_calls === 1);

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      expect(cancel_calls).toBe(0);

      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await fixture.worker.stop();
    } finally {
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("waits for upstream cancellation to settle before stopping", async () => {
    const blocked_poll = deferred<ProviderPollResult>();
    const cancellation = deferred<void>();
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      capabilities: new Set(["text_to_image", "cancel"] as const),
      poll: async () => {
        poll_calls += 1;
        return blocked_poll.promise;
      },
      cancel: async (
        _context: { readonly signal: AbortSignal },
        submission: ProviderSubmission | undefined,
      ) => {
        expect(submission).toEqual({
          state: "pending",
          submission_id: "upstream-stop-cancel-1",
        });
        await cancellation.promise;
      },
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("99999999-9999-4999-8999-999999999996"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-stop-cancel-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for(() => poll_calls === 1);

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      let stop_finished = false;
      const stopping = fixture.worker.stop().then(() => {
        stop_finished = true;
      });
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await wait_for(() => fixture.worker.active_count === 0);
      expect(stop_finished).toBe(false);

      cancellation.resolve();
      await stopping;
      expect(stop_finished).toBe(true);
    } finally {
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      cancellation.resolve();
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });

  it("stops after the cancellation deadline when the provider ignores the signal", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const blocked_poll = deferred<ProviderPollResult>();
    let poll_calls = 0;
    const adapter = {
      ...make_adapter(),
      capabilities: new Set(["text_to_image", "cancel"] as const),
      poll: async () => {
        poll_calls += 1;
        return blocked_poll.promise;
      },
      cancel: async () => new Promise<void>(() => undefined),
    } as GatewayAdapter;
    const fixture = await create_worker_fixture({ adapter });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: request("99999999-9999-4999-8999-999999999998"),
      });
      fixture.job_repository.transition_with_event({
        job_id: created.job.job_id,
        state: "running",
        event_type: "running",
        event: { state: "running" },
        submission: { state: "pending", submission_id: "upstream-timeout-1" },
        created_at: CREATED_AT,
      });
      await fixture.worker.start();
      await wait_for(() => poll_calls === 1);

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      let stop_finished = false;
      const stopping = fixture.worker.stop().then(() => {
        stop_finished = true;
      });
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await wait_for(() => fixture.worker.active_count === 0);
      await vi.advanceTimersByTimeAsync(4_999);
      expect(stop_finished).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await stopping;
      expect(stop_finished).toBe(true);
    } finally {
      blocked_poll.resolve({
        state: "failed",
        error: { code: "provider_unavailable", retryable: true },
      });
      await vi.advanceTimersByTimeAsync(5_000);
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
      vi.useRealTimers();
    }
  });

  it("interrupts SD WebUI when cancellation aborts a blocking submit", async () => {
    const transport = new BlockingSdTransport();
    const adapter = new SdWebuiAdapter() as unknown as GatewayAdapter;
    const fixture = await create_worker_fixture({
      adapter,
      provider_config: SD_PROVIDER_CONFIG,
      transport_factory: { create: () => transport },
    });
    try {
      const created = fixture.service.create_job({
        protocol_version: "1.0",
        request: sd_request("99999999-9999-4999-8999-999999999997"),
      });
      await fixture.worker.start();
      fixture.worker.enqueue(created.job.job_id);
      await wait_for(() =>
        transport.operations.some((operation) => operation.route === "/sdapi/v1/txt2img"),
      );

      fixture.service.cancel_job(created.job.job_id);
      fixture.worker.cancel_active(created.job.job_id);
      await wait_for(() =>
        transport.operations.some((operation) => operation.route === "/sdapi/v1/interrupt"),
      );

      const interrupt = transport.operations.find(
        (operation) => operation.route === "/sdapi/v1/interrupt",
      );
      expect(interrupt?.method).toBe("POST");
      expect(interrupt?.signal.aborted).toBe(false);
    } finally {
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });
  it("does not interrupt another SD job after a completed submit enters staging", async () => {
    const transport = new CompletedThenBlockingSdTransport();
    const adapter = new SdWebuiAdapter() as unknown as GatewayAdapter;
    const fixture = await create_worker_fixture({
      adapter,
      concurrency: "2",
      provider_config: SD_PROVIDER_CONFIG,
      transport_factory: { create: () => transport },
    });
    const stage_started = deferred<void>();
    const release_stage = deferred<void>();
    const register_generated_asset = fixture.asset_store.register_generated_asset.bind(
      fixture.asset_store,
    );
    let register_calls = 0;
    fixture.asset_store.register_generated_asset = async (generated, created_at) => {
      register_calls += 1;
      if (register_calls === 1) {
        stage_started.resolve(undefined);
        await release_stage.promise;
      }
      return register_generated_asset(generated, created_at);
    };
    let second_job_id: string | undefined;
    try {
      const first = fixture.service.create_job({
        protocol_version: "1.0",
        request: sd_request("99999999-9999-4999-8999-999999999999"),
      });
      const second = fixture.service.create_job({
        protocol_version: "1.0",
        request: sd_request("99999999-9999-4999-8999-999999999990"),
      });
      second_job_id = second.job.job_id;
      await fixture.worker.start();
      fixture.worker.enqueue(first.job.job_id);
      await stage_started.promise;
      fixture.worker.enqueue(second.job.job_id);
      await transport.second_submit_started.promise;
      const second_submit_signal = await transport.second_submit_signal.promise;
      expect(second_submit_signal.aborted).toBe(false);

      fixture.service.cancel_job(first.job.job_id);
      fixture.worker.cancel_active(first.job.job_id);
      expect(
        transport.operations.filter((operation) => operation.route === "/sdapi/v1/interrupt"),
      ).toHaveLength(0);
      expect(second_submit_signal.aborted).toBe(false);

      release_stage.resolve(undefined);
      fixture.service.cancel_job(second.job.job_id);
      fixture.worker.cancel_active(second.job.job_id);
      await fixture.worker.stop();
    } finally {
      release_stage.resolve(undefined);
      if (second_job_id !== undefined) {
        fixture.service.cancel_job(second_job_id);
        fixture.worker.cancel_active(second_job_id);
      }
      await fixture.worker.stop();
      fixture.database.close();
      await rm(fixture.directory, { recursive: true, force: true });
    }
  });
});
