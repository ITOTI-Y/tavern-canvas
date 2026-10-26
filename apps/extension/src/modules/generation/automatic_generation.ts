import {
  RequestIdSchema,
  Sha256Schema,
  TavernCanvasMessageMetadataSchema,
  type ProviderId,
} from "@tavern-canvas/contracts";
import {
  create_trigger_policy,
  FALLBACK_COMMENT_OPENING,
  type GenerationSession,
  type ImageJobQueue,
  type ImageRequestQueuePort,
  type QueuedImageRequest,
  type RuntimeModule,
  type SessionRegistry,
} from "@tavern-canvas/core";

import { to_source_context } from "../../bootstrap/capabilities/generation_context.js";
import type {
  HostAdapter,
  HostChatSnapshot,
  HostGenerationEvent,
  HostMessageSwipeSnapshot,
} from "../../host/index.js";
import { build_provider_request } from "../../ui/views/workbench/build_generation_request.js";
import type { MediaExecutionPlanRegistry } from "../media/media_command_service.js";
import type {
  FallbackTextSink,
  GenerationTriggerSessionPort,
} from "./generation_trigger_module.js";
import {
  read_swipe_media,
  type FinalAssistantBinding,
  type FinalAssistantBindingSource,
} from "./message_binding_module.js";

const EMPTY_CHAT: HostChatSnapshot = Object.freeze({ chat_id: "", messages: Object.freeze([]) });

export interface GenerationTarget {
  readonly chat_id: string;
  readonly requested_swipe_id: number;
}

export interface GenerationTargetSource {
  target(generation_anchor: string): GenerationTarget | null;
}

/**
 * A swipe appends one past the last message's swipes, a continue rewrites the active one, and
 * every other turn appends a new message at swipe 0. `MessageBinder` refuses to attach when the
 * finished message's swipe disagrees, so a wrong prediction orphans the image.
 */
function predict_target_swipe_id(generation_type: string, chat: HostChatSnapshot): number {
  const last_message = chat.messages.at(-1);
  if (last_message === undefined) {
    return 0;
  }
  switch (generation_type) {
    case "swipe":
      return last_message.swipes.length;
    case "continue":
      return last_message.active_swipe_id;
    default:
      return 0;
  }
}

export interface HostGenerationSessionPortOptions {
  readonly host: HostAdapter;
  readonly sessions: SessionRegistry;
  readonly new_root_id: () => string;
  readonly is_auto_generation_enabled: () => boolean;
}

/**
 * The session is prepared ahead of the turn: an anchor published mid-turn would reach the model
 * too late and every request would be rejected. `begin()` adopts the prepared session and the
 * next one is prepared when the turn retires, which also lets tool recursion reuse the root anchor.
 */
export class HostGenerationSessionPort
  implements GenerationTriggerSessionPort, FinalAssistantBindingSource, GenerationTargetSource
{
  readonly #host: HostAdapter;
  readonly #sessions: SessionRegistry;
  readonly #new_root_id: () => string;
  readonly #is_auto_generation_enabled: () => boolean;
  readonly #targets = new Map<string, GenerationTarget>();
  #chat: HostChatSnapshot = EMPTY_CHAT;
  #root: GenerationSession | null = null;
  #retired = true;
  #unsubscribes: (() => void)[] = [];

  constructor(options: HostGenerationSessionPortOptions) {
    this.#host = options.host;
    this.#sessions = options.sessions;
    this.#new_root_id = options.new_root_id;
    this.#is_auto_generation_enabled = options.is_auto_generation_enabled;
  }

  start(): void {
    if (this.#unsubscribes.length > 0) {
      return;
    }
    this.#unsubscribes = [
      this.#host.subscribe_generation((event) => {
        this.#handle_generation(event);
      }),
      this.#host.subscribe_chat_change(() => {
        this.#retired = true;
        void this.#refresh_and_prepare();
      }),
    ];
    void this.#refresh_and_prepare();
  }

  stop(): void {
    const unsubscribes = this.#unsubscribes.toReversed();
    this.#unsubscribes = [];
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
    this.#targets.clear();
    this.#retired = true;
    this.#host.set_trigger_injection(null);
  }

  begin(event: Extract<HostGenerationEvent, { phase: "started" }>): GenerationSession {
    if (this.#root === null || this.#retired) {
      this.#prepare();
    }
    const session = this.#root;
    if (session === null) {
      throw new Error("A generation session could not be opened for this turn");
    }
    this.#targets.set(session.generation_anchor, {
      chat_id: session.chat_id,
      requested_swipe_id: predict_target_swipe_id(event.generation_type, this.#chat),
    });
    return session;
  }

  complete(session: GenerationSession): void {
    this.#sessions.complete(session.host_root_generation_id);
  }

  /** Every image in a turn binds to the root session regardless of the message the host reports; `HostMessagePort` discards anything that is not the final assistant text. */
  resolve(_message_id: number): FinalAssistantBinding | null {
    const session = this.#root;
    if (session === null) {
      return null;
    }
    return {
      generation_anchor: Sha256Schema.parse(session.generation_anchor),
      source_anchor: Sha256Schema.parse(session.source_anchor),
      request_ids: [...session.request_ids].map((request_id) => RequestIdSchema.parse(request_id)),
    };
  }

  target(generation_anchor: string): GenerationTarget | null {
    return this.#targets.get(generation_anchor) ?? null;
  }

  get active_session(): GenerationSession | null {
    return this.#root;
  }

  get registry(): SessionRegistry {
    return this.#sessions;
  }

  #handle_generation(event: HostGenerationEvent): void {
    if (event.phase === "started") {
      return;
    }
    if (event.phase === "stopped") {
      this.#retire();
      return;
    }
    void this.#host
      .get_active_chat()
      .then((chat) => {
        this.#chat = chat;
        const message = chat.messages.find(
          (candidate) => candidate.message_id === event.message_id,
        );
        if (message?.role === "assistant" && !message.is_hidden) {
          this.#retire();
        }
      })
      .catch(() => {
        this.#retire();
      });
  }

  #retire(): void {
    if (this.#retired) {
      return;
    }
    this.#retired = true;
    void this.#refresh_and_prepare();
  }

  async #refresh_and_prepare(): Promise<void> {
    try {
      this.#chat = await this.#host.get_active_chat();
    } catch {
      // A host that cannot answer keeps the last snapshot; the anchor still identifies the turn.
    }
    this.#prepare();
  }

  #prepare(): void {
    if (this.#chat.chat_id === "") {
      return;
    }
    this.#root = this.#sessions.open({
      depth: 0,
      host_root_generation_id: this.#new_root_id(),
      source_context: to_source_context(this.#chat),
    });
    this.#retired = false;
    this.#publish_injection();
  }

  #publish_injection(): void {
    const session = this.#root;
    if (session === null || !this.#is_auto_generation_enabled()) {
      this.#host.set_trigger_injection(null);
      return;
    }
    const mode = this.#host.can_use_native_tools() ? "native_tool" : "fallback_comment";
    this.#host.set_trigger_injection(
      create_trigger_policy(mode, session.generation_anchor).host_injection,
    );
  }
}

/** Subscriptions are established when the runtime starts the trigger, never at composition time, when the probe may still be blocked. */
export class AutomaticGenerationSessionModule implements RuntimeModule {
  readonly module_id = "automatic_generation_session";
  readonly requires: readonly string[] = [];

  readonly #session_port: HostGenerationSessionPort;
  readonly #fallback_text_sink: HostFallbackTextSink;

  constructor(session_port: HostGenerationSessionPort, fallback_text_sink: HostFallbackTextSink) {
    this.#session_port = session_port;
    this.#fallback_text_sink = fallback_text_sink;
  }

  start(): Promise<void> {
    this.#session_port.start();
    this.#fallback_text_sink.start();
    return Promise.resolve();
  }

  stop(): Promise<void> {
    this.#fallback_text_sink.stop();
    this.#session_port.stop();
    return Promise.resolve();
  }
}

export interface AutomaticImageRequestRouterOptions {
  readonly queue: ImageJobQueue;
  readonly plans: MediaExecutionPlanRegistry;
  readonly targets: GenerationTargetSource;
  readonly provider_id: () => ProviderId | null;
  /** The active profile's own model; a placeholder would be rejected by profiles that declare an allowlist. */
  readonly model_id: () => string | null;
}

/** `enqueue` is synchronous, so a rejected enqueue drops its own orphaned plan. */
export class AutomaticImageRequestRouter implements ImageRequestQueuePort {
  readonly #options: AutomaticImageRequestRouterOptions;

  constructor(options: AutomaticImageRequestRouterOptions) {
    this.#options = options;
  }

  enqueue(request: QueuedImageRequest): void {
    const provider_id = this.#options.provider_id();
    if (provider_id === null) {
      throw new Error("No provider profile is active, so an automatic image cannot be generated");
    }
    const target = this.#options.targets.target(request.generation_anchor);
    if (target === null) {
      throw new Error(
        `Generation anchor ${request.generation_anchor} has no chat target to attach to`,
      );
    }

    const model_id = this.#options.model_id();
    const provider_request = build_provider_request(
      {
        provider_id,
        positive_prompt: request.arguments.scene_description,
        negative_prompt: request.arguments.negative_constraints ?? "",
        image_count: request.arguments.image_count ?? 1,
        references: [],
        ...(model_id === null ? {} : { model_id }),
      },
      request.request_id,
      request.generation_anchor,
    );
    this.#options.plans.register(request.request_id, {
      kind: "adapter",
      request: provider_request,
    });
    void this.#options.queue
      .enqueue({
        request_id: request.request_id,
        generation_anchor: request.generation_anchor,
        source_anchor: request.source_anchor,
        chat_id: target.chat_id,
        requested_swipe_id: target.requested_swipe_id,
        provider_id,
        arguments: request.arguments,
        automatic: true,
      })
      .catch(() => {
        this.#options.plans.take(request.request_id);
      });
  }
}

export interface HostFallbackTextSinkOptions {
  readonly host: HostAdapter;
  readonly sessions: HostGenerationSessionPort;
}

/** SillyTavern saves what the model streamed, so the hidden fallback comment is rewritten out of the chat log; only a message still carrying the marker is touched. */
export class HostFallbackTextSink implements FallbackTextSink {
  readonly #host: HostAdapter;
  readonly #sessions: HostGenerationSessionPort;
  #buffer = "";
  #unsubscribe: (() => void) | null = null;

  constructor(options: HostFallbackTextSinkOptions) {
    this.#host = options.host;
    this.#sessions = options.sessions;
  }

  start(): void {
    this.#unsubscribe ??= this.#host.subscribe_generation((event) => {
      if (event.phase === "started") {
        this.#buffer = "";
        return;
      }
      if (event.phase === "ended") {
        const message_id = event.message_id;
        const session = this.#sessions.active_session;
        // Capture the finishing session now. The session port may prepare the next turn before this
        // microtask runs, but the final append for this event still needs one microtask to land.
        queueMicrotask(() => {
          void this.#flush(message_id, session);
        });
      }
    });
  }

  stop(): void {
    const unsubscribe = this.#unsubscribe;
    this.#unsubscribe = null;
    this.#buffer = "";
    unsubscribe?.();
  }

  append(text: string): void {
    this.#buffer += text;
  }

  async #flush(message_id: number, session: GenerationSession | null): Promise<void> {
    const cleaned_text = this.#buffer;
    this.#buffer = "";
    if (cleaned_text.length === 0 || session === null) {
      return;
    }

    let swipe: HostMessageSwipeSnapshot | undefined;
    try {
      const chat = await this.#host.get_active_chat();
      const message = chat.messages.find((candidate) => candidate.message_id === message_id);
      swipe = message?.swipes.find((candidate) => candidate.swipe_id === message.active_swipe_id);
      if (swipe === undefined || !swipe.content.includes(FALLBACK_COMMENT_OPENING)) {
        return;
      }
      await this.#host.update_message({
        message_id,
        swipe_id: swipe.swipe_id,
        content: cleaned_text,
        metadata: TavernCanvasMessageMetadataSchema.parse({
          schema_version: 1,
          generation_anchor: session.generation_anchor,
          source_anchor: session.source_anchor,
          request_ids: [...session.request_ids],
          image_ids: [],
        }),
        media: read_swipe_media(swipe).map((media) => ({ ...media })),
      });
    } catch {
      // The saved message keeps the marker; nothing else in the turn depends on the rewrite.
    }
  }
}
