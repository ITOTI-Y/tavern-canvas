import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { parse_comfyui_event } from "./comfyui_events.js";

const PROMPT_ID = "44444444-4444-4444-8444-444444444444";
const events_fixture = await read_events_fixture(
  "../../../../tests/fixtures/providers/comfyui/events.json",
);

describe("parse_comfyui_event", () => {
  it("maps queue progress and executed output nodes", () => {
    expect(parse_comfyui_event(events_fixture[0], PROMPT_ID)).toEqual({
      type: "progress",
      prompt_id: PROMPT_ID,
      node_id: "3",
      value: 10,
      max: 20,
    });
    expect(parse_comfyui_event(events_fixture[1], PROMPT_ID)).toMatchObject({
      type: "output",
      prompt_id: PROMPT_ID,
      node_id: "9",
      output: { images: [{ filename: "fixture_00001_.png" }] },
    });
  });

  it("maps execution errors without upstream exception text", () => {
    expect(parse_comfyui_event(events_fixture[2], PROMPT_ID)).toEqual({
      type: "failed",
      prompt_id: PROMPT_ID,
      error: { code: "provider_unavailable", retryable: false },
    });
  });

  it("maps an interrupted execution to cancellation", () => {
    expect(
      parse_comfyui_event(
        { type: "execution_interrupted", data: { prompt_id: PROMPT_ID } },
        PROMPT_ID,
      ),
    ).toEqual({
      type: "failed",
      prompt_id: PROMPT_ID,
      error: { code: "cancelled", retryable: false },
    });
  });

  it("maps completion and ignores another prompt", () => {
    expect(
      parse_comfyui_event(
        { type: "executing", data: { prompt_id: PROMPT_ID, node: null } },
        PROMPT_ID,
      ),
    ).toEqual({ type: "completed", prompt_id: PROMPT_ID });
    expect(
      parse_comfyui_event(
        { type: "progress", data: { prompt_id: "another", value: 1, max: 2 } },
        PROMPT_ID,
      ),
    ).toEqual({ type: "ignored" });
  });

  it("rejects malformed progress values", () => {
    expect(() =>
      parse_comfyui_event(
        { type: "progress", data: { prompt_id: PROMPT_ID, value: 3, max: 2 } },
        PROMPT_ID,
      ),
    ).toThrow();
  });
});

async function read_events_fixture(relative_path: string): Promise<readonly unknown[]> {
  const text = await readFile(new URL(relative_path, import.meta.url), "utf8");
  const value: unknown = JSON.parse(text);
  if (typeof value !== "object" || value === null) {
    throw new TypeError("Invalid events fixture");
  }
  const events = Reflect.get(value, "events");
  if (!Array.isArray(events)) {
    throw new TypeError("Invalid events fixture");
  }
  return events.map((event: unknown) => event);
}
