import type { IllustrationSettings } from "@tavern-canvas/contracts";
import { afterEach, describe, expect, it, vi } from "vitest";

import type {
  HostAdapter,
  PresetGenerationRequest,
  PresetGenerationResult,
} from "../../host/index.js";
import { DEFAULT_TAVERN_CANVAS_SETTINGS } from "../../storage/sillytavern_settings.js";
import { AnalysisParseError } from "./analysis_error.js";
import { request_analysis, run_wardrobe_request } from "./analysis_requests.js";
import {
  reset_tool_memory,
  type StructuredMode,
  type StructuredOutcome,
} from "./structured_output.js";

const SCHEMA = { name: "tavern_canvas_test", value: { type: "object" } };

function parse(raw: string): { readonly n: number } {
  const value = JSON.parse(raw) as { n?: unknown };
  if (typeof value.n !== "number") {
    throw new AnalysisParseError("no n", raw);
  }
  return { n: value.n };
}

function setup(
  replies: readonly (PresetGenerationResult | Error)[],
  mode: IllustrationSettings["structured_output"] = "auto",
  source: string | null = "openrouter",
) {
  const sent: PresetGenerationRequest[] = [];
  const attempts: [StructuredMode, StructuredOutcome][] = [];
  const queue = [...replies];
  const host = {
    generate_with_preset: vi.fn((request: PresetGenerationRequest) => {
      sent.push(request);
      const reply = queue.shift();
      return reply instanceof Error || reply === undefined
        ? Promise.reject(reply ?? new Error("no reply"))
        : Promise.resolve(reply);
    }),
    stop_generation: vi.fn(),
    read_worldbook: vi.fn(() => Promise.resolve([])),
    chat_completion_target: () => (source === null ? null : { source, model: "m1" }),
  } as unknown as HostAdapter;
  const deps = {
    host,
    settings: () => ({ ...DEFAULT_TAVERN_CANVAS_SETTINGS.illustration, structured_output: mode }),
    resolve_analysis_key: () => Promise.resolve("key"),
    new_generation_id: () => "g",
    wait: () => Promise.resolve(),
    on_attempt: (m: StructuredMode, outcome: StructuredOutcome) => {
      attempts.push([m, outcome]);
    },
  };
  const run = () =>
    request_analysis(
      deps,
      "",
      { user_input: "in", history: [], json_schema: SCHEMA, parse },
      new AbortController().signal,
    );
  return { sent, attempts, run, deps };
}

const text = (content: string): PresetGenerationResult => ({ content, reasoning: null });
const called = (args: string): PresetGenerationResult => ({
  content: "",
  reasoning: null,
  tool_calls: [{ name: SCHEMA.name, arguments: args }],
});

afterEach(() => {
  reset_tool_memory();
});

describe("structured replies", () => {
  it("sends a forced submit tool by default and reads its arguments", async () => {
    const { sent, attempts, run } = setup([called('{"n": 1}')]);

    await expect(run()).resolves.toEqual({ n: 1 });
    expect(sent[0]).toMatchObject({
      json_schema: null,
      tools: {
        tools: [{ name: SCHEMA.name, parameters: SCHEMA.value }],
        choice: { name: SCHEMA.name },
      },
    });
    expect(attempts).toEqual([["tools", "ok"]]);
  });

  it("switches to the JSON schema when the backend rejects tools, and stays there this session", async () => {
    const { sent, attempts, run } = setup([
      new Error("No endpoints found that support tool use"),
      text('{"n": 2}'),
      text('{"n": 3}'),
    ]);

    await expect(run()).resolves.toEqual({ n: 2 });
    await expect(run()).resolves.toEqual({ n: 3 });
    expect(sent.map((request) => request.tools === undefined)).toEqual([false, true, true]);
    expect(sent[1]?.json_schema).toEqual(SCHEMA);
    expect(attempts).toEqual([
      ["tools", "fallback"],
      ["json_schema", "ok"],
      ["json_schema", "ok"],
    ]);
  });

  it("keeps tools for the next request when the JSON schema failed as well", async () => {
    const { sent, run } = setup([
      new Error("Failed to construct 'Response'"),
      new Error("upstream 502"),
      new Error("upstream 502"),
      new Error("upstream 502"),
      called('{"n": 10}'),
    ]);

    await expect(run()).rejects.toThrow("upstream 502");
    await expect(run()).resolves.toEqual({ n: 10 });
    expect(sent.map((request) => request.tools === undefined)).toEqual([
      false,
      true,
      true,
      true,
      false,
    ]);
  });

  it("switches when the model neither called the tool nor wrote valid JSON", async () => {
    const { sent, run } = setup([text("I cannot do that."), text('{"n": 4}')]);

    await expect(run()).resolves.toEqual({ n: 4 });
    expect(sent.map((request) => request.tools === undefined)).toEqual([false, true]);
  });

  it("uses the reply's text when the model answered in prose JSON instead of calling", async () => {
    const { attempts, run } = setup([text('{"n": 5}')]);

    await expect(run()).resolves.toEqual({ n: 5 });
    expect(attempts).toEqual([["tools", "ok"]]);
  });

  it("keeps retrying with tools in tools-only mode", async () => {
    const only_tools = setup([new Error("tool use unsupported"), called('{"n": 6}')], "tools");
    await expect(only_tools.run()).resolves.toEqual({ n: 6 });
    expect(only_tools.sent.every((request) => request.tools !== undefined)).toBe(true);
  });

  it("sends the JSON schema to a text completion API", async () => {
    const { sent, run } = setup([text('{"n": 8}')], "auto", null);

    await expect(run()).resolves.toEqual({ n: 8 });
    expect(sent[0]?.tools).toBeUndefined();
  });

  it("falls back once for a wardrobe request whose backend rejects tools", async () => {
    const { sent, deps } = setup([
      new Error("function calling is not supported"),
      text('{"n": 9}'),
    ]);

    await expect(run_wardrobe_request(deps, "in", SCHEMA, null)).resolves.toBe('{"n": 9}');
    expect(sent.map((request) => request.tools === undefined)).toEqual([false, true]);
  });
});
