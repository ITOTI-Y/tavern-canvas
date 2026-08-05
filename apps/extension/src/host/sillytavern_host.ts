import type {
  HostGenerationHandler,
  HostImageTool,
  HostImageUploadRequest,
  HostImageUploadResult,
} from "./host_adapter.js";

export type SillyTavernEventListener = (
  ...arguments_: readonly unknown[]
) => void;

export interface SillyTavernEventSource {
  on(event_name: string, listener: SillyTavernEventListener): void;
  removeListener(event_name: string, listener: SillyTavernEventListener): void;
}

export interface SillyTavernFunctionTool {
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly parameters: Readonly<Record<string, unknown>>;
  readonly action: (
    arguments_: Readonly<Record<string, unknown>>,
  ) => string | Promise<string>;
  readonly stealth: true;
}

export interface SillyTavernContextSurface {
  getCurrentLocale(): string;
  getCurrentChatId(): string;
  getRequestHeaders(): Readonly<Record<string, string>>;
  readonly eventSource: SillyTavernEventSource;
  readonly eventTypes: {
    readonly GENERATION_STARTED: string;
    readonly GENERATION_STOPPED: string;
    readonly GENERATION_ENDED: string;
  };
  registerFunctionTool(tool: SillyTavernFunctionTool): void;
  unregisterFunctionTool(name: string): void;
}

export interface SillyTavernUploadResponse {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<unknown>;
}

export type SillyTavernFetch = (
  input: string,
  init: {
    readonly method: "POST";
    readonly headers: Readonly<Record<string, string>>;
    readonly body: string;
  },
) => Promise<SillyTavernUploadResponse>;

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export class SillyTavernHost {
  readonly #context: SillyTavernContextSurface;
  readonly #fetch: SillyTavernFetch;

  constructor(context: SillyTavernContextSurface, fetch_: SillyTavernFetch) {
    this.#context = context;
    this.#fetch = fetch_;
  }

  get_locale(): string {
    return this.#context.getCurrentLocale();
  }

  get_active_chat_id(): string {
    return this.#context.getCurrentChatId();
  }

  subscribe_generation(handler: HostGenerationHandler): () => void {
    const started: SillyTavernEventListener = (...arguments_) => {
      const generation_type = arguments_[0];
      const dry_run = arguments_[2];
      if (typeof generation_type === "string" && typeof dry_run === "boolean") {
        handler({ phase: "started", generation_type, dry_run });
      }
    };
    const stopped: SillyTavernEventListener = () => {
      handler({ phase: "stopped" });
    };
    const ended: SillyTavernEventListener = (...arguments_) => {
      const message_id = arguments_[0];
      if (typeof message_id === "number") {
        handler({ phase: "ended", message_id });
      }
    };
    const listeners = [
      [this.#context.eventTypes.GENERATION_STARTED, started],
      [this.#context.eventTypes.GENERATION_STOPPED, stopped],
      [this.#context.eventTypes.GENERATION_ENDED, ended],
    ] as const;

    for (const [event_name, listener] of listeners) {
      this.#context.eventSource.on(event_name, listener);
    }

    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      for (const [event_name, listener] of listeners) {
        this.#context.eventSource.removeListener(event_name, listener);
      }
    };
  }

  register_image_tool(tool: HostImageTool): () => void {
    this.#context.registerFunctionTool({
      name: tool.name,
      displayName: tool.display_name,
      description: tool.description,
      parameters: structuredClone(tool.parameters),
      action: (arguments_) => tool.execute(arguments_),
      stealth: true,
    });

    let disposed = false;
    return () => {
      if (disposed) {
        return;
      }
      disposed = true;
      this.#context.unregisterFunctionTool(tool.name);
    };
  }

  async upload_image(
    request: HostImageUploadRequest,
  ): Promise<HostImageUploadResult> {
    const response = await this.#fetch("/api/images/upload", {
      method: "POST",
      headers: { ...this.#context.getRequestHeaders() },
      body: JSON.stringify({
        image: request.image_base64,
        format: request.format,
        ch_name: request.character_name,
        filename: request.file_name.replaceAll(".", "_"),
      }),
    });
    const payload = await response.json();

    if (!response.ok) {
      if (
        is_record(payload) &&
        typeof payload.error === "string" &&
        payload.error.trim().length > 0
      ) {
        throw new Error(payload.error);
      }
      throw new Error(`Host image upload failed with status ${response.status}`);
    }

    if (
      !is_record(payload) ||
      typeof payload.path !== "string" ||
      payload.path.trim().length === 0
    ) {
      throw new Error("Host image upload returned an invalid response");
    }

    return { path: payload.path };
  }
}
