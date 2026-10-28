import type { GenerationJob, GenerationJobRepository } from "@tavern-canvas/storage";
import { describe, expect, it } from "vitest";

import { settle_interrupted_jobs } from "./generation_capability.js";

function job(id: string, state: GenerationJob["state"]): GenerationJob {
  return { id, state, error: null, updated_at: "2026-10-01T00:00:00.000Z" } as GenerationJob;
}

function repository(records: GenerationJob[]): GenerationJobRepository {
  return {
    list: () => Promise.resolve([...records]),
    put: (_namespace: string, record: GenerationJob) => {
      records.splice(
        records.findIndex((existing) => existing.id === record.id),
        1,
        record,
      );
      return Promise.resolve();
    },
  } as unknown as GenerationJobRepository;
}

describe("settle_interrupted_jobs", () => {
  it("fails every unfinished job as interrupted and leaves settled jobs alone", async () => {
    const records = [
      job("queued", "queued"),
      job("running", "running"),
      job("completed", "completed"),
      job("attached", "attached"),
    ];

    await settle_interrupted_jobs(repository(records), "primary", "2026-10-28T00:00:00.000Z");

    expect(records.map((record) => [record.id, record.state, record.error?.code ?? null])).toEqual([
      ["queued", "failed", "interrupted"],
      ["running", "failed", "interrupted"],
      ["completed", "completed", null],
      ["attached", "attached", null],
    ]);
    expect(records[0]?.updated_at).toBe("2026-10-28T00:00:00.000Z");
  });
});
