// @vitest-environment node

import { createHash, randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { load_gateway_config } from "../config/load_config.js";
import type { GatewayConfig } from "../config/config_schema.js";
import { create_gateway_runtime, type GatewayRuntime } from "../index.js";
import type { JobService } from "../jobs/job_service.js";

const TOKEN = "gateway-lifecycle-test-token";
const TOKEN_HASH = createHash("sha256").update(TOKEN).digest("hex");
const STOP_DEADLINE_MS = 1_000;

type ReadableStreamReader = ReadableStreamDefaultReader<Uint8Array>;

interface TestRuntime {
  readonly runtime: GatewayRuntime;
  readonly base_url: string;
  readonly directory: string;
}

function create_test_config(directory: string): GatewayConfig {
  const config = load_gateway_config({
    cwd: directory,
    env: {
      TAVERN_CANVAS_BIND_HOST: "127.0.0.1",
      TAVERN_CANVAS_BIND_PORT: "8787",
      TAVERN_CANVAS_CORS_ORIGINS: JSON.stringify(["https://app.example"]),
      TAVERN_CANVAS_BEARER_TOKEN_HASHES: JSON.stringify([TOKEN_HASH]),
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
          credential: "test-provider-secret",
          profile: {
            profile_id: "openai-lifecycle-test",
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
  return { ...config, bind_port: 0 };
}

async function create_test_runtime(readiness?: () => boolean): Promise<TestRuntime> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "tavern-gateway-lifecycle-"));
  const runtime = create_gateway_runtime({
    config: create_test_config(directory),
    adapters: new Map(),
    auto_start_worker: false,
    ...(readiness === undefined ? {} : { database_ready: readiness }),
  });
  try {
    const server = await runtime.start();
    const address = server.address();
    if (address === null || typeof address === "string") {
      throw new Error("Test server did not expose a loopback address");
    }
    return {
      runtime,
      base_url: `http://127.0.0.1:${String(address.port)}`,
      directory,
    };
  } catch (error: unknown) {
    await runtime.stop();
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}

async function dispose_test_runtime(fixture: TestRuntime): Promise<void> {
  await fixture.runtime.stop();
  await rm(fixture.directory, { recursive: true, force: true });
}

async function with_deadline<T>(promise: Promise<T>, milliseconds = STOP_DEADLINE_MS): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Operation exceeded ${String(milliseconds)} ms deadline`));
    }, milliseconds);
  });
  try {
    return await Promise.race([promise, deadline]);
  } finally {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  }
}

function create_job(service: JobService): string {
  return service.create_job({
    protocol_version: "1.0",
    request: {
      provider_id: "openai_image",
      request_id: randomUUID(),
      generation_anchor: "0".repeat(64),
      prompt: "lifecycle test",
      output_count: 1,
      mode: "generate",
      model_id: "gpt-image-1",
      size: "1024x1024",
      quality: "auto",
      background: "auto",
      output_format: "png",
      input_asset_ids: [],
    },
  }).job.job_id;
}

function append_event(
  service: JobService,
  job_id: string,
  state: "preparing" | "running" | "submitting",
): void {
  service.transition({
    job_id,
    state,
    event_type: state,
    event: { state },
    created_at: new Date().toISOString(),
  });
}

async function read_until(reader: ReadableStreamReader, marker: string): Promise<string> {
  const decoder = new TextDecoder();
  let body = "";
  while (!body.includes(marker)) {
    const result = await with_deadline(reader.read());
    if (result.done) {
      break;
    }
    body += decoder.decode(result.value, { stream: true });
  }
  return body;
}

async function read_to_end(reader: ReadableStreamReader): Promise<void> {
  while (true) {
    const result = await with_deadline(reader.read());
    if (result.done) {
      return;
    }
  }
}
async function wait_for_sse_connections(
  get_count: () => number,
  expected_count: number,
): Promise<void> {
  let polling = true;
  try {
    await with_deadline(
      new Promise<void>((resolve) => {
        const check = (): void => {
          if (get_count() === expected_count) {
            resolve();
          } else if (polling) {
            setImmediate(check);
          }
        };
        check();
      }),
    );
  } finally {
    polling = false;
  }
}

async function expect_not_ready(readiness: () => boolean): Promise<void> {
  const fixture = await create_test_runtime(readiness);
  try {
    const response = await fetch(`${fixture.base_url}/healthz`);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "not_ready",
      process: { ready: true },
      database: { ready: false },
    });
  } finally {
    await dispose_test_runtime(fixture);
  }
}

describe("Gateway readiness and SSE lifecycle", () => {
  it("returns 503 when the database readiness probe returns false", async () => {
    await expect_not_ready(() => false);
  });

  it("returns 503 when the database readiness probe throws", async () => {
    await expect_not_ready(() => {
      throw new Error("database unavailable");
    });
  });

  it("reports SQLite closure as database unready through the production probe", async () => {
    const fixture = await create_test_runtime();
    try {
      const ready_response = await fetch(`${fixture.base_url}/healthz`);
      expect(ready_response.status).toBe(200);
      await expect(ready_response.json()).resolves.toMatchObject({
        process: { ready: true },
        database: { ready: true },
      });

      fixture.runtime.database.close();

      const closed_response = await fetch(`${fixture.base_url}/healthz`);
      expect(closed_response.status).toBe(503);
      await expect(closed_response.json()).resolves.toEqual({
        status: "not_ready",
        process: { ready: true },
        database: { ready: false },
      });
    } finally {
      await dispose_test_runtime(fixture);
    }
  });

  it("replays ordered SSE events after Last-Event-ID and closes the stream on stop", async () => {
    const fixture = await create_test_runtime();
    try {
      const service = fixture.runtime.app.gateway.service;
      const job_id = create_job(service);
      append_event(service, job_id, "preparing");
      append_event(service, job_id, "running");
      append_event(service, job_id, "submitting");

      const response = await fetch(`${fixture.base_url}/v1/jobs/${job_id}/events`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Last-Event-ID": "1",
        },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("text/event-stream; charset=utf-8");
      expect(response.headers.get("cache-control")).toBe("no-cache, no-transform");
      if (response.body === null) {
        throw new Error("SSE response did not expose a body");
      }
      const reader = response.body.getReader();
      expect(fixture.runtime.app.gateway.sse_connections.active_connections).toBe(1);

      const replay = await read_until(reader, "id: 3\n");
      const replay_ids = replay
        .split("\n")
        .filter((line) => line.startsWith("id: "))
        .map((line) => Number(line.slice(4)));
      expect(replay_ids).toEqual([2, 3]);

      append_event(service, job_id, "running");
      const live = await read_until(reader, "id: 4\n");
      const live_ids = live
        .split("\n")
        .filter((line) => line.startsWith("id: "))
        .map((line) => Number(line.slice(4)));
      expect(live_ids).toEqual([4]);

      await with_deadline(fixture.runtime.stop());
      await read_to_end(reader);
      expect(fixture.runtime.app.gateway.sse_connections.active_connections).toBe(0);
    } finally {
      await dispose_test_runtime(fixture);
    }
  });

  it("removes the SSE subscription exactly once after a client disconnect", async () => {
    const fixture = await create_test_runtime();
    try {
      const job_id = create_job(fixture.runtime.app.gateway.service);
      const response = await fetch(`${fixture.base_url}/v1/jobs/${job_id}/events`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (response.body === null) {
        throw new Error("SSE response did not expose a body");
      }
      expect(fixture.runtime.app.gateway.sse_connections.active_connections).toBe(1);
      await response.body.cancel();
      await wait_for_sse_connections(
        () => fixture.runtime.app.gateway.sse_connections.active_connections,
        0,
      );

      await with_deadline(fixture.runtime.app.gateway.stop());
      expect(fixture.runtime.app.gateway.sse_connections.active_connections).toBe(0);
    } finally {
      await dispose_test_runtime(fixture);
    }
  });
});
