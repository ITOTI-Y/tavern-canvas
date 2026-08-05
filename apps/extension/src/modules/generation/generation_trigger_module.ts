import {
  FallbackStreamParser,
  type GenerationSession,
  type RequestImageTool,
  type RuntimeModule,
} from "@tavern-canvas/core";

import type { HostAdapter, HostGenerationEvent, HostImageTool } from "../../host/host_adapter.js";

export interface GenerationTriggerSessionPort {
  begin(event: Extract<HostGenerationEvent, { phase: "started" }>): GenerationSession;
  complete(session: GenerationSession): void;
}

export interface FallbackTextSink {
  append(text: string): void;
}

export interface GenerationTriggerModuleOptions {
  readonly host: HostAdapter;
  readonly request_image_tool: RequestImageTool;
  readonly session_port: GenerationTriggerSessionPort;
  readonly fallback_text_sink: FallbackTextSink;
  readonly is_auto_generation_enabled: () => boolean;
}

interface ActiveTrigger {
  readonly session: GenerationSession;
  readonly dispose_trigger: () => void;
  readonly parser: FallbackStreamParser | null;
}

function throw_cleanup_failures(failures: unknown[]): void {
  if (failures.length > 0) {
    throw new AggregateError(failures, "Generation trigger cleanup failed");
  }
}

export class GenerationTriggerModule implements RuntimeModule {
  readonly module_id = "generation_trigger";
  readonly requires: readonly string[] = [];

  readonly #host: HostAdapter;
  readonly #request_image_tool: RequestImageTool;
  readonly #session_port: GenerationTriggerSessionPort;
  readonly #fallback_text_sink: FallbackTextSink;
  readonly #is_auto_generation_enabled: () => boolean;
  #unsubscribe_generation: (() => void) | null = null;
  #active_trigger: ActiveTrigger | null = null;

  constructor(options: GenerationTriggerModuleOptions) {
    this.#host = options.host;
    this.#request_image_tool = options.request_image_tool;
    this.#session_port = options.session_port;
    this.#fallback_text_sink = options.fallback_text_sink;
    this.#is_auto_generation_enabled = options.is_auto_generation_enabled;
  }

  start(): Promise<void> {
    if (this.#unsubscribe_generation !== null) {
      return Promise.resolve();
    }
    this.#unsubscribe_generation = this.#host.subscribe_generation((event) => {
      this.#handle_generation_event(event);
    });
    return Promise.resolve();
  }

  stop(): Promise<void> {
    const failures: unknown[] = [];
    const unsubscribe_generation = this.#unsubscribe_generation;
    this.#unsubscribe_generation = null;
    if (unsubscribe_generation !== null) {
      try {
        unsubscribe_generation();
      } catch (error) {
        failures.push(error);
      }
    }
    try {
      this.#complete_active_trigger();
    } catch (error) {
      failures.push(error);
    }
    throw_cleanup_failures(failures);
    return Promise.resolve();
  }

  #handle_generation_event(event: HostGenerationEvent): void {
    if (event.phase === "started") {
      if (!event.dry_run) {
        this.#activate_generation(event);
      }
      return;
    }
    this.#complete_active_trigger();
  }

  #activate_generation(event: Extract<HostGenerationEvent, { phase: "started" }>): void {
    this.#complete_active_trigger();
    const session = this.#session_port.begin(event);

    try {
      if (this.#host.capabilities.native_tool_manager?.available === true) {
        const definition = this.#request_image_tool.definition;
        const tool: HostImageTool = {
          name: definition.name,
          display_name: definition.display_name,
          description: definition.description,
          parameters: definition.parameters,
          stealth: definition.stealth,
          execute: (arguments_) =>
            JSON.stringify(
              this.#request_image_tool.execute(session.host_root_generation_id, arguments_),
            ),
        };
        this.#active_trigger = {
          session,
          dispose_trigger: this.#host.register_image_tool(tool),
          parser: null,
        };
        return;
      }

      const parser = new FallbackStreamParser(
        session.generation_anchor,
        this.#is_auto_generation_enabled(),
      );
      const dispose_trigger = this.#host.subscribe_generation_chunk((chunk) => {
        const parsed = parser.push(chunk);
        this.#fallback_text_sink.append(parsed.cleaned_text);
        for (const arguments_ of parsed.requests) {
          this.#request_image_tool.execute(session.host_root_generation_id, arguments_);
        }
      });
      this.#active_trigger = { session, dispose_trigger, parser };
    } catch (error) {
      this.#session_port.complete(session);
      throw error;
    }
  }

  #complete_active_trigger(): void {
    const active_trigger = this.#active_trigger;
    if (active_trigger === null) {
      return;
    }
    this.#active_trigger = null;
    const failures: unknown[] = [];

    try {
      active_trigger.dispose_trigger();
    } catch (error) {
      failures.push(error);
    }
    if (active_trigger.parser !== null) {
      try {
        this.#fallback_text_sink.append(active_trigger.parser.finish().cleaned_text);
      } catch (error) {
        failures.push(error);
      }
    }
    try {
      this.#session_port.complete(active_trigger.session);
    } catch (error) {
      failures.push(error);
    }
    throw_cleanup_failures(failures);
  }
}
