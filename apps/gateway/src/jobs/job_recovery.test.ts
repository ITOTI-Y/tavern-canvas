// @vitest-environment node

import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AssetStore } from "../assets/asset_store.js";
import { load_gateway_config } from "../config/load_config.js";
import { JobService } from "./job_service.js";
import { JobWorker, type GatewayAdapter } from "./job_worker.js";
import { type GatewayLogger } from "../logging/logger.js";
import { AssetRepository } from "../persistence/asset_repository.js";
import { open_gateway_database } from "../persistence/database.js";
import { JobRepository } from "../persistence/job_repository.js";

const TOKEN = "worker-test-token";
const CREATED_AT = "2026-08-05T12:00:00.000Z";

const silent_logger: GatewayLogger = {
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
  debug: () => undefined,
  child: () => silent_logger,
  flush: () => undefined,
};

function create_config(directory: string) {
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
      TAVERN_CANVAS_CONCURRENCY: "1",
      TAVERN_CANVAS_MAX_REQUEST_BYTES: "2000000",
      TAVERN_CANVAS_MAX_IMAGE_BYTES: "20000000",
      TAVERN_CANVAS_MAX_IMAGE_PIXELS: "40000000",
      TAVERN_CANVAS_MAX_IMAGE_DIMENSION: "8192",
      TAVERN_CANVAS_PROVIDER_PROFILES: JSON.stringify([
        {
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
        },
      ]),
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

async function create_worker_fixture() {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-recovery-"));
  const config = create_config(directory);
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
    adapters: new Map([["openai_image", make_adapter()]]),
    logger: silent_logger,
    clock: () => CREATED_AT,
    sleep: async () => undefined,
  });
  return { directory, database, job_repository, asset_repository, asset_store, service, worker };
}

async function wait_for_state(service: JobService, job_id: string, state: "failed"): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (service.get_stored_job(job_id)?.state === state) {
      return;
    }
    await new Promise<void>((resolve) => setImmediate(resolve));
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
});
