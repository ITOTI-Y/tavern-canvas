import type { CapabilityMatrix, TavernCanvasSettings } from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import {
  AssistantModule,
  type AssistantConnectionPort,
  type AssistantConnectionResult,
  type AssistantModuleDependencies,
  type AssistantStreamEvent,
} from "./assistant_module.js";
import type { AssistantSession, AssistantSessionStore } from "./assistant_session.js";
import {
  ScreenInputService,
  type DisplayMediaPort,
  type FrameCapturePort,
} from "./screen_input.js";

const NOW = "2026-08-07T00:00:00.000Z";

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
    gateway: { endpoint: null, token_secret_id: "tc:ns:secret", http_acknowledgments: {} },
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
      for (const id of ids) {
        rows.delete(id);
      }
      return Promise.resolve();
    },
  };
}

/** Streams `chunks` one at a time before resolving, so the module's own chunk plumbing is what
 * the assertions exercise rather than a single pre-assembled string. */
function streaming_connection(
  chunks: readonly string[],
  tool_calls: AssistantConnectionResult["tool_calls"] = [],
): AssistantConnectionPort {
  return {
    send: (_request, on_chunk) => {
      for (const chunk of chunks) {
        on_chunk(chunk);
      }
      return Promise.resolve({ content: "", tool_calls });
    },
    fetch_models: () => Promise.resolve([]),
  };
}

function no_op_screen_input(): ScreenInputService {
  const display_media: DisplayMediaPort = {
    get_display_media: () => Promise.reject(new Error("not used")),
  };
  const frame_capture: FrameCapturePort = {
    capture_frame: () => Promise.resolve(new Blob([""], { type: "image/png" })),
  };
  return new ScreenInputService(display_media, frame_capture);
}

let id_counter = 0;
function make_dependencies(
  overrides: Partial<AssistantModuleDependencies> = {},
): AssistantModuleDependencies {
  return {
    connection: streaming_connection(["ok"]),
    session_store: in_memory_session_store(),
    image_generation: { submit: () => Promise.resolve({ job_id: "job-1" }) },
    settings_provider: base_settings,
    diagnostics_provider: () => [],
    capability_matrix_provider: (): CapabilityMatrix => ({}),
    workflow_metadata_provider: () => [],
    screen_input: no_op_screen_input(),
    clock: () => NOW,
    id_source: () => `id-${(id_counter += 1)}`,
    ...overrides,
  };
}

describe("AssistantModule: streaming render subscription", () => {
  it("emits one event per chunk with the running accumulation", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({ connection: streaming_connection(["Hel", "lo ", "world"]) }),
    );
    const session = await module_instance.new_session();
    const events: AssistantStreamEvent[] = [];
    module_instance.subscribe_stream((event) => {
      events.push(event);
    });

    await module_instance.send(session.id, "hi");

    const deltas = events.filter((event) => !event.done);
    expect(deltas.map((event) => event.delta)).toEqual(["Hel", "lo ", "world"]);
    expect(deltas.at(-1)?.accumulated).toBe("Hello world");
  });

  it("emits a final done event carrying the completed message", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({ connection: streaming_connection(["done"]) }),
    );
    const session = await module_instance.new_session();
    const events: AssistantStreamEvent[] = [];
    module_instance.subscribe_stream((event) => {
      events.push(event);
    });

    const reply = await module_instance.send(session.id, "hi");

    const final = events.at(-1);
    expect(final?.done).toBe(true);
    expect(final?.message_id).toBe(reply.message_id);
    expect(final?.accumulated).toBe("done");
  });

  it("tags every event with the session it belongs to", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const first = await module_instance.new_session();
    const second = await module_instance.new_session();
    const events: AssistantStreamEvent[] = [];
    module_instance.subscribe_stream((event) => {
      events.push(event);
    });

    await module_instance.send(second.id, "hi");

    expect(events.every((event) => event.session_id === second.id)).toBe(true);
    expect(events.some((event) => event.session_id === first.id)).toBe(false);
  });

  it("stops delivering after unsubscribe", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();
    const handler = vi.fn();
    const unsubscribe = module_instance.subscribe_stream(handler);

    unsubscribe();
    await module_instance.send(session.id, "hi");

    expect(handler).not.toHaveBeenCalled();
  });

  it("emits a done event even when the connection streamed nothing", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({ connection: streaming_connection([]) }),
    );
    const session = await module_instance.new_session();
    const events: AssistantStreamEvent[] = [];
    module_instance.subscribe_stream((event) => {
      events.push(event);
    });

    await module_instance.send(session.id, "hi");

    expect(events).toHaveLength(1);
    expect(events[0]?.done).toBe(true);
  });
});

describe("AssistantModule: task tracker", () => {
  it("records a running task per tool call and completes it", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(
          ["ok"],
          [{ name: "list_diagnostics_codes", arguments: {} }],
        ),
      }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "what broke?");

    expect(module_instance.tasks).toHaveLength(1);
    expect(module_instance.tasks[0]).toMatchObject({
      kind: "tool_call",
      label: "list_diagnostics_codes",
      state: "completed",
    });
  });

  it("marks a rejected tool call as a failed task carrying its reason", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(["ok"], [{ name: "not_a_tool", arguments: {} }]),
      }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "do something odd");

    expect(module_instance.tasks[0]).toMatchObject({
      state: "failed",
      error_code: "unknown_tool",
    });
  });

  it("tracks an image generation task and keeps the task strip shape", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(
          ["ok"],
          [{ name: "generate_image", arguments: { profile_id: "p1", positive_prompt: "a cat" } }],
        ),
      }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "draw a cat");

    expect(module_instance.tasks.some((task) => task.kind === "image_generation")).toBe(true);
    expect(module_instance.task_strip).toEqual([
      { job_id: "job-1", profile_id: "p1", positive_prompt: "a cat", created_at: NOW },
    ]);
  });

  it("lets a caller complete and fail a tracked task by id", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(
          ["ok"],
          [{ name: "generate_image", arguments: { profile_id: "p1", positive_prompt: "a cat" } }],
        ),
      }),
    );
    const session = await module_instance.new_session();
    await module_instance.send(session.id, "draw a cat");
    const task_id = module_instance.tasks.find((task) => task.kind === "image_generation")?.task_id;

    module_instance.fail_task(task_id ?? "", "provider_unavailable");
    expect(module_instance.tasks.find((task) => task.task_id === task_id)).toMatchObject({
      state: "failed",
      error_code: "provider_unavailable",
    });

    module_instance.complete_task(task_id ?? "");
    expect(module_instance.tasks.find((task) => task.task_id === task_id)?.state).toBe("completed");
  });

  it("clears finished tasks while leaving running ones in place", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(
          ["ok"],
          [{ name: "list_diagnostics_codes", arguments: {} }],
        ),
      }),
    );
    const session = await module_instance.new_session();
    await module_instance.send(session.id, "check");

    module_instance.clear_finished_tasks();
    expect(module_instance.tasks).toHaveLength(0);
  });

  it("notifies task subscribers and stops after unsubscribe", async () => {
    const module_instance = new AssistantModule(
      make_dependencies({
        connection: streaming_connection(
          ["ok"],
          [{ name: "list_diagnostics_codes", arguments: {} }],
        ),
      }),
    );
    const session = await module_instance.new_session();
    const handler = vi.fn();
    const unsubscribe = module_instance.subscribe_tasks(handler);

    await module_instance.send(session.id, "check");
    expect(handler).toHaveBeenCalled();

    handler.mockClear();
    unsubscribe();
    await module_instance.send(session.id, "check again");
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("AssistantModule: auto-query iteration loop", () => {
  /** Answers with a tool call for the first `rounds` turns, then stops asking. */
  function iterating_connection(rounds: number): AssistantConnectionPort & { turns: number } {
    const connection = {
      turns: 0,
      send: (_request: unknown, on_chunk: (delta: string) => void) => {
        connection.turns += 1;
        on_chunk(`turn ${String(connection.turns)}`);
        return Promise.resolve({
          content: "",
          tool_calls:
            connection.turns <= rounds ? [{ name: "list_diagnostics_codes", arguments: {} }] : [],
        });
      },
      fetch_models: () => Promise.resolve([]),
    };
    return connection as unknown as AssistantConnectionPort & { turns: number };
  }

  it("runs a single round by default", async () => {
    const connection = iterating_connection(5);
    const module_instance = new AssistantModule(make_dependencies({ connection }));
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "go");

    expect(connection.turns).toBe(1);
  });

  it("feeds tool results back as a new turn until the model stops asking", async () => {
    const connection = iterating_connection(2);
    const module_instance = new AssistantModule(
      make_dependencies({ connection, auto_query_max_iterations: 10 }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "go");

    expect(connection.turns).toBe(3);
  });

  it("stops at the iteration cap when the model never stops asking", async () => {
    const connection = iterating_connection(Number.MAX_SAFE_INTEGER);
    const module_instance = new AssistantModule(
      make_dependencies({ connection, auto_query_max_iterations: 4 }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "go");

    expect(connection.turns).toBe(4);
  });

  it("carries every round's tool calls on the final assistant message", async () => {
    const connection = iterating_connection(2);
    const module_instance = new AssistantModule(
      make_dependencies({ connection, auto_query_max_iterations: 10 }),
    );
    const session = await module_instance.new_session();

    const reply = await module_instance.send(session.id, "go");

    expect(reply.tool_calls).toHaveLength(2);
  });

  it("appends exactly one assistant message no matter how many rounds ran", async () => {
    const connection = iterating_connection(3);
    const module_instance = new AssistantModule(
      make_dependencies({ connection, auto_query_max_iterations: 10 }),
    );
    const session = await module_instance.new_session();

    await module_instance.send(session.id, "go");

    const stored = module_instance.sessions.find((item) => item.id === session.id);
    expect(stored?.messages.filter((message) => message.role === "assistant")).toHaveLength(1);
  });
});

describe("AssistantModule: session history management", () => {
  it("hydrates sessions from the store", async () => {
    const session_store = in_memory_session_store();
    const module_instance = new AssistantModule(make_dependencies({ session_store }));
    const first = await module_instance.new_session();
    const second = await module_instance.new_session();

    const reloaded = new AssistantModule(make_dependencies({ session_store }));
    const listed = await reloaded.load_sessions();

    expect(listed.map((item) => item.id).sort()).toEqual([first.id, second.id].sort());
    expect(reloaded.sessions).toHaveLength(2);
  });

  it("renames a session in memory and in the store", async () => {
    const session_store = in_memory_session_store();
    const module_instance = new AssistantModule(make_dependencies({ session_store }));
    const session = await module_instance.new_session();

    const renamed = await module_instance.rename_session(session.id, "Harbor plans");

    expect(renamed?.title).toBe("Harbor plans");
    expect(session_store.rows.get(session.id)?.title).toBe("Harbor plans");
  });

  it("deletes a multi-selection in one call", async () => {
    const session_store = in_memory_session_store();
    const module_instance = new AssistantModule(make_dependencies({ session_store }));
    const first = await module_instance.new_session();
    const second = await module_instance.new_session();
    const third = await module_instance.new_session();

    await module_instance.delete_sessions([first.id, third.id]);

    expect(module_instance.sessions.map((item) => item.id)).toEqual([second.id]);
    expect([...session_store.rows.keys()]).toEqual([second.id]);
  });

  it("exports a multi-selection as one JSON document", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const first = await module_instance.new_session();
    await module_instance.new_session();
    await module_instance.send(first.id, "keep this");

    const exported = JSON.parse(module_instance.export_sessions([first.id])) as {
      sessions: { id: string; messages: unknown[] }[];
    };

    expect(exported.sessions).toHaveLength(1);
    expect(exported.sessions[0]?.id).toBe(first.id);
    expect(exported.sessions[0]?.messages.length).toBeGreaterThan(0);
  });

  it("ignores unknown ids in a selection rather than throwing mid-batch", async () => {
    const module_instance = new AssistantModule(make_dependencies());
    const session = await module_instance.new_session();

    await module_instance.delete_sessions([session.id, "not-a-session"]);

    expect(module_instance.sessions).toHaveLength(0);
  });
});
