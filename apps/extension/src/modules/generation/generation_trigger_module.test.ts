import {
  RequestImageTool,
  SessionRegistry,
  SourceContextSchema,
  type GenerationSession,
  type ImageRequestQueuePort,
  type QueuedImageRequest,
  type RandomSource,
  type RequestIdSource,
} from "@tavern-canvas/core";
import { describe, expect, it } from "vitest";

import type {
  HostAdapter,
  HostGenerationEvent,
  HostGenerationHandler,
  HostImageTool,
} from "../../host/index.js";
import {
  GenerationTriggerModule,
  type FallbackTextSink,
  type GenerationTriggerSessionPort,
} from "./generation_trigger_module.js";

class FixedRandomSource implements RandomSource {
  bytes(length: number): Uint8Array {
    return new Uint8Array(length).fill(7);
  }
}

class FixedRequestIdSource implements RequestIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `11111111-1111-4111-8111-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class RecordingQueue implements ImageRequestQueuePort {
  readonly requests: QueuedImageRequest[] = [];

  enqueue(request: QueuedImageRequest): void {
    this.requests.push(request);
  }
}

class RecordingTextSink implements FallbackTextSink {
  cleaned_text = "";

  append(text: string): void {
    this.cleaned_text += text;
  }
}

class RecordingSessionPort implements GenerationTriggerSessionPort {
  completed: GenerationSession[] = [];
  readonly #session: GenerationSession;

  constructor(session: GenerationSession) {
    this.#session = session;
  }

  begin(_event: Extract<HostGenerationEvent, { phase: "started" }>): GenerationSession {
    return this.#session;
  }

  complete(session: GenerationSession): void {
    this.completed.push(session);
  }
}

class RecordingHost implements HostAdapter {
  readonly capabilities;
  registered_tools: HostImageTool[] = [];
  unregistered_tools: string[] = [];
  generation_handlers: HostGenerationHandler[] = [];
  chunk_handlers: ((chunk: string) => void)[] = [];

  constructor(native_tool_available: boolean) {
    this.capabilities = {
      native_tool_manager: { available: native_tool_available },
      main_generation_events: { available: true },
    };
  }

  get_locale(): string {
    return "en";
  }

  async get_active_chat() {
    return { chat_id: "chat-a", messages: [] };
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    this.generation_handlers.push(handler);
    return () => {
      this.generation_handlers = this.generation_handlers.filter(
        (candidate) => candidate !== handler,
      );
    };
  }

  subscribe_generation_chunk(handler: (chunk: string) => void): () => void {
    this.chunk_handlers.push(handler);
    return () => {
      this.chunk_handlers = this.chunk_handlers.filter((candidate) => candidate !== handler);
    };
  }

  register_image_tool(tool: HostImageTool): () => void {
    this.registered_tools.push(tool);
    return () => {
      this.unregistered_tools.push(tool.name);
    };
  }

  async generate_private_prompt(): Promise<string> {
    return "";
  }

  async update_message(): Promise<void> {}

  async upload_image() {
    return { path: "/image.png" };
  }

  emit_generation(event: HostGenerationEvent): void {
    for (const handler of [...this.generation_handlers]) {
      handler(event);
    }
  }

  emit_chunk(chunk: string): void {
    for (const handler of [...this.chunk_handlers]) {
      handler(chunk);
    }
  }
}

function create_fixture(native_tool_available: boolean, auto_generation_enabled = true) {
  const sessions = new SessionRegistry(new FixedRandomSource());
  const session = sessions.open({
    depth: 0,
    host_root_generation_id: "host-root-a",
    source_context: SourceContextSchema.parse({
      schema_version: 1,
      chat_id: "chat-a",
      active_swipes: [],
      messages: [],
    }),
  });
  const queue = new RecordingQueue();
  const request_image_tool = new RequestImageTool(sessions, new FixedRequestIdSource(), queue);
  const host = new RecordingHost(native_tool_available);
  const session_port = new RecordingSessionPort(session);
  const text_sink = new RecordingTextSink();
  const module = new GenerationTriggerModule({
    host,
    request_image_tool,
    session_port,
    fallback_text_sink: text_sink,
    is_auto_generation_enabled: () => auto_generation_enabled,
  });
  return { module, host, queue, session, session_port, text_sink };
}

const started_event = {
  phase: "started",
  generation_type: "normal",
  dry_run: false,
} as const;

describe("GenerationTriggerModule", () => {
  it("registers a non-stealth native tool and never subscribes to fallback chunks", async () => {
    const fixture = create_fixture(true);
    await fixture.module.start();
    fixture.host.emit_generation(started_event);

    expect(fixture.host.registered_tools).toHaveLength(1);
    expect(fixture.host.registered_tools[0]).toMatchObject({
      name: "request_image",
      display_name: "Request image",
      stealth: false,
    });
    expect(fixture.host.chunk_handlers).toEqual([]);

    const response = await fixture.host.registered_tools[0]?.execute({
      generation_anchor: fixture.session.generation_anchor,
      scene_description: "A rainy alley",
    });
    expect(JSON.parse(String(response))).toEqual({
      status: "queued",
      request_id: "11111111-1111-4111-8111-000000000001",
      generation_anchor: fixture.session.generation_anchor,
    });
    expect(fixture.queue.requests).toHaveLength(1);

    fixture.host.emit_generation({ phase: "ended", message_id: 9 });
    expect(fixture.host.unregistered_tools).toEqual(["request_image"]);
    expect(fixture.session_port.completed).toEqual([fixture.session]);
  });

  it("uses only the bounded fallback parser when native tools are unavailable", async () => {
    const fixture = create_fixture(false);
    await fixture.module.start();
    fixture.host.emit_generation(started_event);

    expect(fixture.host.registered_tools).toEqual([]);
    expect(fixture.host.chunk_handlers).toHaveLength(1);

    const comment = `<!-- tavern-canvas:image ${JSON.stringify({
      generation_anchor: fixture.session.generation_anchor,
      scene_description: "A rainy alley",
    })} -->`;
    fixture.host.emit_chunk(`Before ${comment.slice(0, 20)}`);
    fixture.host.emit_chunk(`${comment.slice(20)} after`);
    fixture.host.emit_generation({ phase: "ended", message_id: 9 });

    expect(fixture.queue.requests).toHaveLength(1);
    expect(fixture.text_sink.cleaned_text).toBe("Before  after");
    expect(fixture.host.chunk_handlers).toEqual([]);
    expect(fixture.host.unregistered_tools).toEqual([]);
  });

  it("does not parse fallback controls when automatic generation is disabled", async () => {
    const fixture = create_fixture(false, false);
    await fixture.module.start();
    fixture.host.emit_generation(started_event);
    const comment = `<!-- tavern-canvas:image ${JSON.stringify({
      generation_anchor: fixture.session.generation_anchor,
      scene_description: "A rainy alley",
    })} -->`;

    fixture.host.emit_chunk(comment);
    fixture.host.emit_generation({ phase: "stopped" });

    expect(fixture.queue.requests).toEqual([]);
    expect(fixture.text_sink.cleaned_text).toBe(comment);
  });

  it("unregisters the active trigger and host event listener on module stop", async () => {
    const fixture = create_fixture(true);
    await fixture.module.start();
    fixture.host.emit_generation(started_event);

    await fixture.module.stop();
    await fixture.module.stop();

    expect(fixture.host.unregistered_tools).toEqual(["request_image"]);
    expect(fixture.host.generation_handlers).toEqual([]);
    expect(fixture.session_port.completed).toEqual([fixture.session]);
  });

  it("ignores dry-run generation events", async () => {
    const fixture = create_fixture(true);
    await fixture.module.start();
    fixture.host.emit_generation({ ...started_event, dry_run: true });

    expect(fixture.host.registered_tools).toEqual([]);
    expect(fixture.host.chunk_handlers).toEqual([]);
  });
});
