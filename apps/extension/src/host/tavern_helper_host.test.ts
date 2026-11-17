import { describe, expect, it, vi } from "vitest";

import type { HostRegexScript } from "./host_adapter.js";
import {
  inspect_tavern_helper,
  TavernHelperHost,
  type TavernHelperSurface,
  type TavernRegex,
} from "./tavern_helper_host.js";

const NO_TIMERS = () => ({ restore: () => {} });

/** The request text as the host sends it: a system message after the history. */
const REQUEST_MESSAGE = { role: "system" as const, content: "request" };

function create_helper(overrides: Partial<TavernHelperSurface> = {}): TavernHelperSurface {
  return {
    getChatMessages: vi.fn(() => [
      {
        message_id: 0,
        name: "Alice",
        role: "assistant",
        is_hidden: false,
        swipe_id: 1,
        swipes: ["a", "b"],
      },
    ]),
    setChatMessages: vi.fn(() => Promise.resolve()),
    generate: vi.fn(() => Promise.resolve("{}")),
    generateRaw: vi.fn(() => Promise.resolve("{}")),
    stopGenerationById: vi.fn(() => true),
    getTavernRegexes: vi.fn(() => []),
    replaceTavernRegexes: vi.fn(() => Promise.resolve()),
    retrieveDisplayedMessage: vi.fn(() => ({ get: () => undefined })),
    getWorldbookNames: vi.fn(() => []),
    getWorldbook: vi.fn(() => Promise.resolve([])),
    ...overrides,
  };
}

const DISPLAY_SCRIPT: HostRegexScript = {
  id: "tavern-canvas-display",
  script_name: "TavernCanvas display",
  find_regex: "/<!--tc-image:([A-Za-z0-9_-]+)-->/g",
  replace_string: '<div data-tc-slot="$1"></div>',
  destination: "display",
};

function installed(script: HostRegexScript, changes: Partial<TavernRegex> = {}): TavernRegex {
  return {
    id: script.id,
    script_name: script.script_name,
    enabled: true,
    find_regex: script.find_regex,
    replace_string: script.replace_string,
    trim_strings: [],
    source: {
      user_input: false,
      ai_output: true,
      slash_command: false,
      world_info: false,
      reasoning: false,
    },
    destination: { display: true, prompt: false },
    run_on_edit: true,
    min_depth: null,
    max_depth: null,
    ...changes,
  };
}

describe("inspect_tavern_helper", () => {
  it("reports each API group independently", () => {
    const { generate: _generate, ...without_generate } = create_helper();
    expect(
      inspect_tavern_helper({ ...without_generate, getTavernHelperVersion: () => "4.11.1" }),
    ).toEqual({
      detected: true,
      version: { state: "available", value: "4.11.1" },
      message_swipe_metadata: true,
      preset_generation: false,
      tavern_regex: true,
    });
  });
});

describe("TavernHelperHost", () => {
  it("normalizes the active chat snapshot", async () => {
    const host = new TavernHelperHost(create_helper(), () => "chat-1", NO_TIMERS);

    await expect(host.get_active_chat()).resolves.toEqual({
      chat_id: "chat-1",
      messages: [
        {
          message_id: 0,
          name: "Alice",
          role: "assistant",
          is_hidden: false,
          active_swipe_id: 1,
          swipes: [
            { swipe_id: 0, content: "a" },
            { swipe_id: 1, content: "b" },
          ],
        },
      ],
    });
  });

  it("replaces message text only while it still matches the expected text", async () => {
    const helper = create_helper();
    const host = new TavernHelperHost(helper, () => "chat-1", NO_TIMERS);

    await expect(host.replace_message_text(0, "edited by user", "b<!--x-->")).resolves.toBe(false);
    await expect(host.replace_message_text(0, "b", "b<!--x-->")).resolves.toBe(true);
    expect(helper.setChatMessages).toHaveBeenCalledExactlyOnceWith(
      [{ message_id: 0, message: "b<!--x-->" }],
      { refresh: "affected" },
    );
  });

  it("sends a custom connection and schema and separates reasoning from content", async () => {
    const generate = vi.fn(() => Promise.resolve({ content: '{"a":1}', reasoning: "thinking" }));
    const host = new TavernHelperHost(create_helper({ generate }), () => "chat-1", NO_TIMERS);

    const result = await host.generate_with_preset({
      generation_id: "g1",
      preset: { kind: "sillytavern", name: "in_use" },
      instructions: "request",
      user_input: "analyze",
      chat_history: [],
      connection: {
        kind: "custom",
        api_url: "https://llm.example",
        api_key: "k",
        model: "m",
        source: "openai",
      },
      json_schema: { name: "illustrations", value: { type: "object" } },
      world_info: { kind: "chat" },
      image: "data:image/jpeg;base64,AAAA",
      reasoning: "preset",
    });

    expect(result).toEqual({ content: '{"a":1}', reasoning: "thinking", tool_calls: [] });
    expect(generate).toHaveBeenCalledWith({
      generation_id: "g1",
      preset_name: "in_use",
      user_input: "analyze",
      overrides: { chat_history: { prompts: [REQUEST_MESSAGE] } },
      should_silence: true,
      should_stream: false,
      should_return_reasoning: true,
      custom_api: { apiurl: "https://llm.example", key: "k", model: "m", source: "openai" },
      json_schema: { name: "illustrations", value: { type: "object" }, strict: true },
      image: ["data:image/jpeg;base64,AAAA"],
    });
  });

  it("sends tools in place of the schema and reads the tool calls back", async () => {
    const generate = vi.fn(() =>
      Promise.resolve({
        content: "",
        tool_calls: [
          { id: "1", type: "function", function: { name: "add_entry", arguments: '{"a":1}' } },
          { id: "2", type: "function", function: { name: "add_entry", arguments: '{"a":2}' } },
        ],
      }),
    );
    const host = new TavernHelperHost(create_helper({ generate }), () => "chat-1", NO_TIMERS);

    const result = await host.generate_with_preset({
      generation_id: "g1",
      preset: { kind: "sillytavern", name: "in_use" },
      instructions: "request",
      user_input: "write",
      chat_history: [],
      connection: { kind: "current" },
      json_schema: null,
      tools: {
        tools: [{ name: "add_entry", description: "Add one.", parameters: { type: "object" } }],
        choice: "required",
      },
      world_info: { kind: "chat" },
      image: null,
      reasoning: "preset",
    });

    expect(generate).toHaveBeenCalledWith(
      expect.objectContaining({
        tools: [
          {
            type: "function",
            function: {
              name: "add_entry",
              description: "Add one.",
              parameters: { type: "object" },
            },
          },
        ],
        tool_choice: "required",
      }),
    );
    expect(result.tool_calls).toEqual([
      { name: "add_entry", arguments: '{"a":1}' },
      { name: "add_entry", arguments: '{"a":2}' },
    ]);
  });

  it("puts the world info timers back after a request, also when it fails", async () => {
    const restore = vi.fn();
    const generate = vi.fn(() => Promise.reject(new Error("offline")));
    const host = new TavernHelperHost(
      create_helper({ generate }),
      () => "chat-1",
      () => ({
        restore,
      }),
    );

    await expect(
      host.generate_with_preset({
        generation_id: "g1",
        preset: { kind: "sillytavern", name: "in_use" },
        instructions: "request",
        user_input: "analyze",
        chat_history: [],
        connection: { kind: "current" },
        json_schema: null,
        world_info: { kind: "chat" },
        image: null,
        reasoning: "preset",
      }),
    ).rejects.toThrow("offline");
    expect(restore).toHaveBeenCalledOnce();
  });

  it("sends the built-in preset as its system prompt, the card, world info and chat", async () => {
    const generate = vi.fn(() => Promise.resolve("{}"));
    const generateRaw = vi.fn(() => Promise.resolve("{}"));
    const host = new TavernHelperHost(
      create_helper({ generate, generateRaw }),
      () => "chat-1",
      NO_TIMERS,
    );

    await host.generate_with_preset({
      generation_id: "g1",
      preset: {
        kind: "builtin",
        preamble: [{ role: "system", content: "Answer through the tool." }],
      },
      instructions: "request",
      user_input: "analyze",
      chat_history: [{ role: "user", content: "Hello." }],
      connection: { kind: "current" },
      json_schema: null,
      tools: {
        tools: [{ name: "submit", description: "Submit.", parameters: { type: "object" } }],
        choice: { name: "submit" },
      },
      world_info: { kind: "chat" },
      image: null,
      reasoning: "preset",
    });

    expect(generate).not.toHaveBeenCalled();
    expect(generateRaw).toHaveBeenCalledWith(
      expect.objectContaining({
        user_input: "analyze",
        ordered_prompts: [
          { role: "system", content: "Answer through the tool." },
          "world_info_before",
          "persona_description",
          "char_description",
          "char_personality",
          "scenario",
          "world_info_after",
          "chat_history",
          "user_input",
        ],
        overrides: {
          chat_history: { prompts: [{ role: "user", content: "Hello." }, REQUEST_MESSAGE] },
        },
        tool_choice: { type: "function", function: { name: "submit" } },
      }),
    );
    expect(generateRaw).toHaveBeenCalledWith(
      expect.not.objectContaining({ preset_name: "in_use" }),
    );
  });

  it("sends the given messages as the chat history, oldest first", async () => {
    const generate = vi.fn(() => Promise.resolve("{}"));
    const host = new TavernHelperHost(create_helper({ generate }), () => "chat-1", NO_TIMERS);
    const chat_history = [
      { role: "user" as const, content: "Hi" },
      { role: "assistant" as const, content: "Hello" },
    ];

    await host.generate_with_preset({
      generation_id: "g1",
      preset: { kind: "sillytavern", name: "in_use" },
      instructions: "request",
      user_input: "analyze",
      chat_history,
      connection: { kind: "current" },
      json_schema: null,
      world_info: { kind: "chat" },
      image: null,
      reasoning: "preset",
    });

    const config = (generate.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(config["overrides"]).toEqual({
      chat_history: { prompts: [...chat_history, REQUEST_MESSAGE] },
    });
  });

  it("replaces world info and depth entries when the analysis brings its own", async () => {
    const generate = vi.fn(() => Promise.resolve("{}"));
    const host = new TavernHelperHost(create_helper({ generate }), () => "chat-1", NO_TIMERS);

    await host.generate_with_preset({
      generation_id: "g1",
      preset: { kind: "sillytavern", name: "in_use" },
      instructions: "request",
      user_input: "analyze",
      chat_history: [],
      connection: { kind: "current" },
      json_schema: null,
      world_info: { kind: "replace", text: "Doors are blue." },
      image: null,
      reasoning: "preset",
    });

    expect(generate).toHaveBeenCalledWith(
      expect.objectContaining({
        overrides: {
          world_info_before: "Doors are blue.",
          world_info_after: "",
          chat_history: { with_depth_entries: false, prompts: [REQUEST_MESSAGE] },
        },
      }),
    );
  });

  it("reads world info entries, keeping regular-expression keys", async () => {
    const getWorldbook = vi.fn(() =>
      Promise.resolve([
        {
          uid: 0,
          name: "Doors",
          enabled: true,
          strategy: {
            type: "selective",
            keys: ["door", /gate/iu],
            keys_secondary: { keys: [] },
            scan_depth: "same_as_global",
          },
          position: { type: "before_character_definition", role: "system", depth: 0, order: 3 },
          content: "Doors are blue.",
        },
      ]),
    );
    const host = new TavernHelperHost(create_helper({ getWorldbook }), () => "chat-1", NO_TIMERS);

    await expect(host.read_worldbook("Town")).resolves.toEqual([
      {
        enabled: true,
        strategy: "selective",
        keys: ["door", { source: "gate", flags: "iu" }],
        secondary_logic: "and_any",
        secondary_keys: [],
        order: 3,
        content: "Doors are blue.",
      },
    ]);
    expect(getWorldbook).toHaveBeenCalledWith("Town");
  });

  it("leaves matching regex scripts alone, including ones the user disabled", async () => {
    const helper = create_helper({
      getTavernRegexes: vi.fn(() => [installed(DISPLAY_SCRIPT, { enabled: false })]),
    });
    const host = new TavernHelperHost(helper, () => "chat-1", NO_TIMERS);

    await expect(host.sync_regex_scripts([DISPLAY_SCRIPT])).resolves.toBe(false);
    expect(helper.replaceTavernRegexes).not.toHaveBeenCalled();
  });

  it("replaces an outdated script and keeps the user's other scripts", async () => {
    const other = { ...installed(DISPLAY_SCRIPT), id: "user-script", script_name: "Mine" };
    const helper = create_helper({
      getTavernRegexes: vi.fn(() => [other, installed(DISPLAY_SCRIPT, { replace_string: "old" })]),
    });
    const host = new TavernHelperHost(helper, () => "chat-1", NO_TIMERS);

    await expect(host.sync_regex_scripts([DISPLAY_SCRIPT])).resolves.toBe(true);
    expect(helper.replaceTavernRegexes).toHaveBeenCalledWith([other, installed(DISPLAY_SCRIPT)], {
      type: "global",
    });
  });
});
