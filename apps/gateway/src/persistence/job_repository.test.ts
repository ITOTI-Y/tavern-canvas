// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { OpenAiImageRequestSchema } from "@tavern-canvas/contracts";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AssetRepository } from "./asset_repository.js";
import { open_gateway_database, type GatewayDatabase } from "./database.js";
import { JobRepository } from "./job_repository.js";

const JOB_ID = "11111111-1111-4111-8111-111111111111";
const OTHER_JOB_ID = "22222222-2222-4222-8222-222222222222";
const REQUEST_ID = "33333333-3333-4333-8333-333333333333";
const ASSET_ID = "44444444-4444-4444-8444-444444444444";
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
        error_code: "provider_unavailable",
        created_at: "2026-08-05T12:00:03.000Z",
      }),
    ).toThrow("synthetic event insert failure");
    expect(jobs.get_by_id(JOB_ID)?.state).toBe("running");
    expect(jobs.list_events(JOB_ID)).toHaveLength(2);
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
