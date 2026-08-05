// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { OpenAiImageRequestSchema } from "@tavern-canvas/contracts";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AssetRepository } from "./asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "./database.js";
import { JobRepository, JobStateConflictError } from "./job_repository.js";

const JOB_ID = "11111111-1111-4111-8111-111111111111";
const OTHER_JOB_ID = "22222222-2222-4222-8222-222222222222";
const REQUEST_ID = "33333333-3333-4333-8333-333333333333";
const ASSET_ID = "44444444-4444-4444-8444-444444444444";
const SECOND_ASSET_ID = "55555555-5555-4555-8555-555555555555";
const CREATED_AT = "2026-08-05T12:00:00.000Z";
const request = OpenAiImageRequestSchema.parse({
  request_id: REQUEST_ID,
  provider_id: "openai_image",
  generation_anchor: "c".repeat(64),
  mode: "generate",
  model_id: "gpt-image-1",
  prompt: "fixture prompt",
  output_count: 1,
  input_asset_ids: [],
  size: "1024x1024",
  quality: "medium",
  background: "opaque",
  output_format: "png",
});

let directory = "";
let file_path = "";
let database: GatewayDatabase;
let jobs: JobRepository;

beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), "tavern-canvas-jobs-"));
  file_path = path.join(directory, "tavern_canvas.sqlite");
  database = open_gateway_database({ file_path });
  jobs = new JobRepository(database.connection);
});

afterEach(() => {
  database.close();
  rmSync(directory, { force: true, recursive: true });
});

function create_job(job_id = JOB_ID) {
  return jobs.create_or_get({ job_id, request, created_at: CREATED_AT });
}

describe("JobRepository", () => {
  it("returns the original job for a duplicate request ID", () => {
    const first = create_job();
    const replay = create_job(OTHER_JOB_ID);

    expect(first.created).toBe(true);
    expect(replay.created).toBe(false);
    expect(replay.job).toEqual(first.job);
    expect(replay.job.job_id).toBe(JOB_ID);
    expect(replay.job.request).toEqual(request);
  });

  it("updates state and appends increasing event sequences atomically", () => {
    create_job();

    const first_event = jobs.transition_with_event({
      job_id: JOB_ID,
      state: "submitting",
      event_type: "state_changed",
      event: { state: "submitting" },
      submission: { submission_id: "upstream-1" },
      created_at: "2026-08-05T12:00:01.000Z",
    });
    const second_event = jobs.transition_with_event({
      job_id: JOB_ID,
      state: "running",
      event_type: "progress",
      event: { progress: 0.5 },
      created_at: "2026-08-05T12:00:02.000Z",
    });

    expect([first_event.sequence, second_event.sequence]).toEqual([1, 2]);
    expect(jobs.get_by_id(JOB_ID)).toMatchObject({
      state: "running",
      submission: { submission_id: "upstream-1" },
    });
    expect(jobs.list_events(JOB_ID)).toMatchObject([
      { sequence: 1, event_type: "state_changed" },
      { sequence: 2, event_type: "progress" },
    ]);

    database.connection.exec(`
      CREATE TRIGGER reject_test_event
      BEFORE INSERT ON job_events
      BEGIN
        SELECT RAISE(ABORT, 'synthetic event insert failure');
      END
    `);
    expect(() =>
      jobs.transition_with_event({
        job_id: JOB_ID,
        state: "failed",
        event_type: "failed",
        event: { state: "failed" },
        error: { code: "provider_unavailable", retryable: true },
        created_at: "2026-08-05T12:00:03.000Z",
      }),
    ).toThrow("synthetic event insert failure");
    expect(jobs.get_by_id(JOB_ID)?.state).toBe("running");
    expect(jobs.list_events(JOB_ID)).toHaveLength(2);
  });

  it("round-trips the complete provider error after reopening", () => {
    create_job();
    const error = {
      code: "rate_limited" as const,
      retryable: false,
      retry_after_ms: 7_500,
      status_code: 429,
    };
    jobs.transition_with_event({
      job_id: JOB_ID,
      state: "failed",
      event_type: "failed",
      event: { state: "failed", error },
      error,
      created_at: "2026-08-05T12:00:03.000Z",
    });

    expect(jobs.get_by_id(JOB_ID)?.error).toEqual(error);
    database.close();
    database = open_gateway_database({ file_path });
    jobs = new JobRepository(database.connection);

    expect(jobs.get_by_id(JOB_ID)?.error).toEqual(error);
  });

  it("completes with ordered attachments and allows only one CAS winner", () => {
    create_job();
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const first = assets.create_or_get({
      sha256: "a".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    const second_assets = new AssetRepository(database.connection, {
      uuid_factory: () => SECOND_ASSET_ID,
    });
    const second = second_assets.create_or_get({
      sha256: "b".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    jobs.transition_with_event({
      job_id: JOB_ID,
      state: "running",
      event_type: "running",
      event: { state: "running" },
      created_at: CREATED_AT,
    });

    const event = jobs.complete_with_assets({
      job_id: JOB_ID,
      expected_state: "running",
      asset_ids: [second.asset_id, first.asset_id],
      created_at: "2026-08-05T12:00:01.000Z",
    });

    expect(event).toMatchObject({
      event_type: "completed",
      event: { state: "completed", image_ids: [second.asset_id, first.asset_id] },
    });
    expect(assets.list_for_job(JOB_ID).map((asset) => asset.asset_id)).toEqual([
      second.asset_id,
      first.asset_id,
    ]);
    expect(jobs.get_by_id(JOB_ID)?.state).toBe("completed");
    expect(
      jobs.complete_with_assets({
        job_id: JOB_ID,
        expected_state: "running",
        asset_ids: [first.asset_id],
        created_at: "2026-08-05T12:00:02.000Z",
      }),
    ).toBeUndefined();
    expect(assets.list_for_job(JOB_ID).map((asset) => asset.asset_id)).toEqual([
      second.asset_id,
      first.asset_id,
    ]);
  });

  it("rolls back completion state and attachments when an attachment insert fails", () => {
    create_job();
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const first = assets.create_or_get({
      sha256: "c".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    const second_assets = new AssetRepository(database.connection, {
      uuid_factory: () => SECOND_ASSET_ID,
    });
    const second = second_assets.create_or_get({
      sha256: "d".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    jobs.transition_with_event({
      job_id: JOB_ID,
      state: "running",
      event_type: "running",
      event: { state: "running" },
      created_at: CREATED_AT,
    });
    database.connection.exec(`
      CREATE TRIGGER reject_completion_attachment
      BEFORE INSERT ON job_assets
      WHEN NEW.job_id = '${JOB_ID}' AND NEW.position = 1
      BEGIN
        SELECT RAISE(ABORT, 'synthetic attachment failure');
      END
    `);

    expect(() =>
      jobs.complete_with_assets({
        job_id: JOB_ID,
        expected_state: "running",
        asset_ids: [first.asset_id, second.asset_id],
        created_at: "2026-08-05T12:00:01.000Z",
      }),
    ).toThrow("synthetic attachment failure");
    expect(jobs.get_by_id(JOB_ID)?.state).toBe("running");
    expect(assets.list_for_job(JOB_ID)).toEqual([]);
    expect(jobs.list_events(JOB_ID)).toHaveLength(1);
  });

  it("allows exactly one queued claim across repository connections", () => {
    create_job();
    const contender_database = open_gateway_database({ file_path });
    const contender = new JobRepository(contender_database.connection);

    try {
      const first_claim = jobs.transition_if_current({
        job_id: JOB_ID,
        expected_state: "queued",
        state: "preparing",
        event_type: "claimed",
        event: { state: "preparing" },
        created_at: "2026-08-05T12:00:01.000Z",
      });
      const second_claim = contender.transition_if_current({
        job_id: JOB_ID,
        expected_state: "queued",
        state: "preparing",
        event_type: "claimed",
        event: { state: "preparing" },
        created_at: "2026-08-05T12:00:02.000Z",
      });

      expect(first_claim).toBeDefined();
      expect(second_claim).toBeUndefined();
      expect(jobs.get_by_id(JOB_ID)?.state).toBe("preparing");
      expect(jobs.list_events(JOB_ID)).toHaveLength(1);
    } finally {
      contender_database.close();
    }
  });

  it("rejects a late transition after a job reaches a terminal state", () => {
    create_job();
    jobs.transition_with_event({
      job_id: JOB_ID,
      state: "cancelled",
      event_type: "cancelled",
      event: { state: "cancelled" },
      created_at: "2026-08-05T12:00:01.000Z",
    });

    expect(() =>
      jobs.transition_with_event({
        job_id: JOB_ID,
        state: "completed",
        event_type: "completed",
        event: { state: "completed" },
        created_at: "2026-08-05T12:00:02.000Z",
      }),
    ).toThrow(JobStateConflictError);
    expect(jobs.get_by_id(JOB_ID)?.state).toBe("cancelled");
    expect(jobs.list_events(JOB_ID)).toHaveLength(1);
  });

  it("deleting a job removes references without deleting the asset", () => {
    create_job();
    const assets = new AssetRepository(database.connection, {
      uuid_factory: () => ASSET_ID,
    });
    const asset = assets.create_or_get({
      sha256: "b".repeat(64),
      media_type: "image/png",
      byte_length: 8,
      created_at: CREATED_AT,
    });
    assets.attach_to_job({
      job_id: JOB_ID,
      asset_id: asset.asset_id,
      position: 0,
    });

    jobs.delete(JOB_ID);

    expect(jobs.get_by_id(JOB_ID)).toBeUndefined();
    expect(assets.get_by_id(asset.asset_id)).toEqual(asset);
    expect(assets.list_for_job(JOB_ID)).toEqual([]);
  });

  it("recovers queued jobs and existing events after reopen", () => {
    create_job();
    jobs.transition_with_event({
      job_id: JOB_ID,
      state: "queued",
      event_type: "queued",
      event: { state: "queued" },
      created_at: "2026-08-05T12:00:01.000Z",
    });
    database.close();

    database = open_gateway_database({ file_path });
    jobs = new JobRepository(database.connection);

    expect(jobs.list_recoverable()).toMatchObject([{ job_id: JOB_ID, state: "queued" }]);
    expect(jobs.list_events(JOB_ID)).toEqual([
      {
        job_id: JOB_ID,
        sequence: 1,
        event_type: "queued",
        event: { state: "queued" },
        created_at: "2026-08-05T12:00:01.000Z",
      },
    ]);
  });
});
