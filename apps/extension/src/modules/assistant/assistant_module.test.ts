import type { CapabilityMatrix, TavernCanvasSettings } from "@tavern-canvas/contracts";
import { CapabilityRegistry, DomainEventBus, type ModuleContext } from "@tavern-canvas/core";
import { describe, expect, it, vi } from "vitest";

import {
  AssistantModule,
  type AssistantConnectionPort,
  type AssistantConnectionResult,
  type AssistantImageGenerationPort,
  type AssistantModuleDependencies,
} from "./assistant_module.js";
import type { AssistantSession, AssistantSessionStore } from "./assistant_session.js";
import {
  ScreenInputService,
  type DisplayMediaPort,
  type FrameCapturePort,
} from "./screen_input.js";

function base_settings(): TavernCanvasSettings {
  return {
    schema_version: 1,
    active_namespace: "ns-1",
    locale: "auto",
    credential_storage_mode: "host",
    active_provider_profile_id: null,
    global_concurrency: 2,
    auto_generation_enabled: false,
    fallback_generation_enabled: false,
    vocabulary_update_channel: "bundled",
    gateway: {
      endpoint: null,
      token_secret_id: "tc:ns:secret-should-never-leak",
      http_acknowledgments: {},
    },
    ui: {
      color_mode: "system",
      inspector_width: 320,
      inspector_collapsed: false,
      optional_entry_enabled: true,
    },
  };
}

function in_memory_session_store(): AssistantSessionStore & {
  readonly rows: Map<string, AssistantSession>;
} {
  const rows = new Map<string, AssistantSession>();
  return {
    rows,
    list: () => Promise.resolve([...rows.values()]),
    get: (id) => Promise.resolve(rows.get(id) ?? null),
    put: (session) => {
      rows.set(session.id, session);
      return Promise.resolve();
    },
    delete_many: (ids) => {
      for (const id of ids) rows.delete(id);
      return Promise.resolve();
    },
  };
}

function fake_connection(
  respond: (request: Parameters<AssistantConnectionPort["send"]>[0]) => AssistantConnectionResult,
): AssistantConnectionPort & {
  readonly requests: Parameters<AssistantConnectionPort["send"]>[0][];
} {
  const requests: Parameters<AssistantConnectionPort["send"]>[0][] = [];
  return {
    requests,
    send: (request, on_chunk, _signal) => {
      requests.push(request);
      const result = respond(request);
      on_chunk(result.content);
      return Promise.resolve(result);
    },
    fetch_models: () => Promise.resolve(["assistant-model-1"]),
  };
}

function fake_image_generation(): AssistantImageGenerationPort & { readonly calls: unknown[] } {
  const calls: unknown[] = [];
  return {
    calls,
    submit: (request) => {
      calls.push(request);
      return Promise.resolve({ job_id: "job-1" });
    },
  };
}

function fake_screen_input(): ScreenInputService & {
  readonly stream_tracks: { stopped: boolean }[];
} {
  const tracks: { stopped: boolean }[] = [];
  const display_media: DisplayMediaPort = {
    get_display_media: () => {
      const track = { stopped: false };
      tracks.push(track);
      const media_track = {
        addEventListener: () => {},
        removeEventListener: () => {},
        stop: () => {
          track.stopped = true;
        },
      } as unknown as MediaStreamTrack;
      const stream = {
        getVideoTracks: () => [media_track],
        getTracks: () => [media_track],
      } as unknown as MediaStream;
      return Promise.resolve(stream);
    },
  };
  const frame_capture: FrameCapturePort = {
    capture_frame: () => Promise.resolve(new Blob(["frame"], { type: "image/png" })),
  };
  const service = new ScreenInputService(display_media, frame_capture) as ScreenInputService & {
    stream_tracks: { stopped: boolean }[];
  };
  service.stream_tracks = tracks;
  return service;
}

let id_counter = 0;
function make_dependencies(
  overrides: Partial<AssistantModuleDependencies> = {},
): AssistantModuleDependencies {
  return {
    connection: fake_connection(() => ({ content: "ok", tool_calls: [] })),
    session_store: in_memory_session_store(),
    image_generation: fake_image_generation(),
    settings_provider: () => base_settings(),
    diagnostics_provider: () => [{ error_code: "provider_timeout" }, { error_code: null }],
    capability_matrix_provider: (): CapabilityMatrix => ({
      gateway_protocol: { available: false },
    }),
    workflow_metadata_provider: () => [
      { id: "wf-1", display_name: "Portrait pipeline", updated_at: "2026-08-07T00:00:00.000Z" },
    ],
    screen_input: fake_screen_input(),
    clock: () => "2026-08-07T00:00:00.000Z",
    id_source: () => `id-${(id_counter += 1)}`,
    ...overrides,
  };
}

describe("AssistantModule: authority boundary", () => {
  it("reading settings goes through the redacted schema tool and never exposes the secret gateway token", async () => {
    const connection = fake_connection(() => ({
      content: "let me check",
      tool_calls: [{ name: "read_settings_path", arguments: { path: "gateway.token_secret_id" } }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "what is my gateway token?");

    expect(reply.tool_calls).toHaveLength(1);
    const tool_result = JSON.parse(reply.tool_calls[0]?.result ?? "{}") as {
      status: string;
      result: { status: string; reason: string };
    };
    expect(tool_result.status).toBe("ok");
    expect(tool_result.result.status).toBe("rejected");
    expect(tool_result.result.reason).toBe("secret_path");
    expect(JSON.stringify(reply)).not.toContain("tc:ns:secret-should-never-leak");
  });

  it("a settings write tool call only produces a draft diff -- it never calls the settings update port", async () => {
    const connection = fake_connection(() => ({
      content: "here is a draft",
      tool_calls: [{ name: "create_settings_draft", arguments: { changes: { locale: "zh-CN" } } }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "switch to Chinese");

    const tool_result = JSON.parse(reply.tool_calls[0]?.result ?? "{}") as {
      status: string;
      result: { status: string; draft: { changes: unknown[] } };
    };
    expect(tool_result.result.status).toBe("ok");
    expect(tool_result.result.draft.changes).toEqual([
      { path: "locale", from: "auto", to: "zh-CN" },
    ]);
  });

  it("rejects an unknown-path settings write attempt rather than silently applying it", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [
        { name: "create_settings_draft", arguments: { changes: { active_namespace: "attacker" } } },
      ],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "change the namespace");

    const tool_result = JSON.parse(reply.tool_calls[0]?.result ?? "{}") as {
      result: { status: string; rejections: { reason: string }[] };
    };
    expect(tool_result.result.status).toBe("rejected");
    expect(tool_result.result.rejections[0]?.reason).toBe("secret_path");
  });

  it("surfaces diagnostics codes only, never message content", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "list_diagnostics_codes", arguments: {} }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "any recent errors?");

    const tool_result = JSON.parse(reply.tool_calls[0]?.result ?? "{}") as {
      result: { codes: string[] };
    };
    expect(tool_result.result.codes).toEqual(["provider_timeout"]);
  });

  it("surfaces provider capability availability without any credential/header fields", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "list_provider_capabilities", arguments: {} }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "what can the host do?");

    expect(JSON.parse(reply.tool_calls[0]?.result ?? "{}")).toEqual({
      status: "ok",
      result: { gateway_protocol: { available: false } },
    });
  });

  it("surfaces workflow metadata identity fields only, dropping the graph payload", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "list_workflow_metadata", arguments: {} }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "what workflows exist?");

    expect(JSON.parse(reply.tool_calls[0]?.result ?? "{}")).toEqual({
      status: "ok",
      result: [
        { id: "wf-1", display_name: "Portrait pipeline", updated_at: "2026-08-07T00:00:00.000Z" },
      ],
    });
  });

  it("rejects a UI action outside the fixed allowlist -- no raw DOM/textarea bridge", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "highlight_ui_section", arguments: { action: "tavern_read_input" } }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "read the chat input");

    expect(JSON.parse(reply.tool_calls[0]?.result ?? "{}")).toMatchObject({
      status: "rejected",
      reason: "unknown_action",
    });
  });

  it("rejects an entirely unknown tool name", async () => {
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "read_raw_browser_storage", arguments: {} }],
    }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "give me raw storage");

    expect(JSON.parse(reply.tool_calls[0]?.result ?? "{}")).toEqual({
      status: "rejected",
      reason: "unknown_tool",
    });
  });

  it("only sends the active session's own history to the connection, never another chat's messages", async () => {
    const connection = fake_connection(() => ({ content: "ok", tool_calls: [] }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session_a = await module_instance.new_session();
    const session_b = await module_instance.new_session();

    await module_instance.send(session_a.id, "secret to session A");
    connection.requests.length = 0;
    await module_instance.send(session_b.id, "message in session B");

    const sent_contents = connection.requests[0]?.messages.map((message) => message.content) ?? [];
    expect(sent_contents).not.toContain("secret to session A");
    expect(sent_contents).toContain("message in session B");
  });
});

describe("AssistantModule: prompt-building calls never carry tools", () => {
  it("generate_summary's request always has an empty tools array and tool_choice none, unlike the chat turn that produced the source message", async () => {
    const connection = fake_connection(() => ({ content: "A short summary.", tool_calls: [] }));
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();
    const reply = await module_instance.send(session.id, "hello");
    connection.requests.length = 0;

    const summary = await module_instance.generate_summary(session.id, [reply.message_id]);

    expect(connection.requests).toHaveLength(1);
    expect(connection.requests[0]?.tools).toEqual([]);
    expect(connection.requests[0]?.tool_choice).toBe("none");
    expect(summary.text).toBe("A short summary.");
  });

  it("the main chat turn carries the fixed tool allowlist with tool_choice auto", async () => {
    const connection = fake_connection((request) => {
      expect(request.tool_choice).toBe("auto");
      expect(request.tools.length).toBeGreaterThan(0);
      return { content: "hi", tool_calls: [] };
    });
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "hello");
  });
});

describe("AssistantModule: sessions, abort, edit/resend, persistence", () => {
  it("supports multiple independent chats", async () => {
    const module_instance = new AssistantModule(make_dependencies());

    const session_a = await module_instance.new_session();
    const session_b = await module_instance.new_session();

    expect(module_instance.sessions.map((session) => session.id)).toEqual([
      session_a.id,
      session_b.id,
    ]);
  });

  it("abort() aborts the in-flight connection signal", async () => {
    let observed_signal: AbortSignal | undefined;
    const connection: AssistantConnectionPort = {
      send: (_request, _on_chunk, signal) => {
        observed_signal = signal;
        return new Promise(() => {});
      },
      fetch_models: () => Promise.resolve([]),
    };
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    void module_instance.send(session.id, "hang forever");
    await Promise.resolve();
    module_instance.abort();

    expect(observed_signal?.aborted).toBe(true);
  });

  it("edit_and_resend truncates history at the edited message and re-sends", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();
    const first_reply = await module_instance.send(session.id, "first question");
    await module_instance.send(session.id, "second question");

    await module_instance.edit_and_resend(session.id, first_reply.message_id, "revised question");

    const messages =
      module_instance.sessions.find((candidate) => candidate.id === session.id)?.messages ?? [];
    expect(messages.map((message) => message.content)).toEqual([
      "first question",
      "revised question",
      "ok",
    ]);
  });

  it("persists every message to the session store as it is appended", async () => {
    const store = in_memory_session_store();
    const module_instance = new AssistantModule(make_dependencies({ session_store: store }));
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "please persist me");

    expect(store.rows.get(session.id)?.messages).toHaveLength(2);
  });

  it("recovers a corrupt session row instead of throwing, flagging recovered: true", async () => {
    const store = in_memory_session_store();
    store.rows.set("corrupt-1", { id: "corrupt-1" } as unknown as AssistantSession);
    const module_instance = new AssistantModule(make_dependencies({ session_store: store }));

    const result = await module_instance.switch_session("corrupt-1");

    expect(result?.recovered).toBe(true);
    expect(result?.session.messages).toEqual([]);
  });

  it("windowed_messages returns the most recent slice for scroll windowing / infinite-scroll-up", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();
    for (let index = 0; index < 5; index += 1) {
      await module_instance.send(session.id, `message ${String(index)}`);
    }
    const full_session = module_instance.sessions.find((candidate) => candidate.id === session.id);
    expect(full_session).toBeDefined();

    const window = module_instance.windowed_messages(full_session as AssistantSession, 0, 4);

    expect(window).toHaveLength(4);
    expect(window[window.length - 1]?.content).toBe("ok");
  });

  it("carries image attachments through to the persisted user message", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();

    const reply_context = await module_instance.send(session.id, "look at this", [
      { image_id: "img-1", data_url: "data:image/png;base64,AAAA" },
    ]);
    void reply_context;

    const stored = module_instance.sessions.find((candidate) => candidate.id === session.id);
    expect(stored?.messages[0]?.images).toEqual([
      { image_id: "img-1", data_url: "data:image/png;base64,AAAA" },
    ]);
  });
});

describe("AssistantModule: image generation stays on the typed Stage 02 command and the task strip", () => {
  it("generate_image dispatches through the injected image-generation port and appends a task-strip entry", async () => {
    const image_generation = fake_image_generation();
    const connection = fake_connection(() => ({
      content: "generating now",
      tool_calls: [
        {
          name: "generate_image",
          arguments: { profile_id: "profile-1", positive_prompt: "a cat" },
        },
      ],
    }));
    const module_instance = new AssistantModule(
      make_dependencies({ connection, image_generation }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "draw me a cat");

    expect(image_generation.calls).toEqual([{ profile_id: "profile-1", positive_prompt: "a cat" }]);
    expect(module_instance.task_strip).toEqual([
      {
        job_id: "job-1",
        profile_id: "profile-1",
        positive_prompt: "a cat",
        created_at: "2026-08-07T00:00:00.000Z",
      },
    ]);
  });

  it("rejects a generate_image call missing required arguments without touching the image-generation port", async () => {
    const image_generation = fake_image_generation();
    const connection = fake_connection(() => ({
      content: "",
      tool_calls: [{ name: "generate_image", arguments: { profile_id: "profile-1" } }],
    }));
    const module_instance = new AssistantModule(
      make_dependencies({ connection, image_generation }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "draw something");

    expect(image_generation.calls).toEqual([]);
  });
});

describe("AssistantModule: screen input stays explicit-command-only", () => {
  it("never captures the screen on its own -- start_capture must be called explicitly", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "hello");

    expect(module_instance.screen_input.is_active).toBe(false);
  });

  it("an explicit start_capture followed by capture_frame produces an image blob", async () => {
    const module_instance = new AssistantModule(make_dependencies());

    await module_instance.screen_input.start_capture();
    const frame = await module_instance.screen_input.capture_frame();

    expect(module_instance.screen_input.is_active).toBe(true);
    expect(frame).toBeInstanceOf(Blob);
  });
});

describe("AssistantModule: lifecycle (RuntimeModule)", () => {
  it("registers the assistant capability on start", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const capabilities = new CapabilityRegistry();
    const context: ModuleContext = { capabilities, events: new DomainEventBus() };

    await module_instance.start(context);

    expect(capabilities.has("assistant")).toBe(true);
  });

  it("stop disposes screen capture and tracked object URLs", async () => {
    const revoke_spy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const dependencies = make_dependencies();
    const module_instance = new AssistantModule(dependencies);
    await module_instance.screen_input.start_capture();
    module_instance.track_object_url("blob:tracked-1");

    await module_instance.stop();

    expect(module_instance.screen_input.is_active).toBe(false);
    expect(revoke_spy).toHaveBeenCalledWith("blob:tracked-1");
    revoke_spy.mockRestore();
  });
});

describe("AssistantModule: voice features removed", () => {
  it("accepts no TTS/ASR dependency and exposes no TTS/ASR getter -- voice removed per the user's 2026-08-07 scope ruling", async () => {
    const dependencies = make_dependencies();
    expect("tts" in dependencies).toBe(false);
    expect("asr" in dependencies).toBe(false);

    const module_instance = new AssistantModule(dependencies);
    const exposed = module_instance as unknown as Record<string, unknown>;
    expect(exposed.tts).toBeUndefined();
    expect(exposed.asr).toBeUndefined();

    await module_instance.stop();
  });
});
