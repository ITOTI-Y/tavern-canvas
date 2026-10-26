import type { CapabilityStatus, ImageId } from "@tavern-canvas/contracts";

export type ChatMediaGesture = "click" | "double_click" | "long_press" | "context";

export interface ChatMediaInteractionEvent {
  readonly image_id: ImageId;
  readonly gesture: ChatMediaGesture;
}

export type ChatMediaInteractionHandler = (event: ChatMediaInteractionEvent) => void;

/** Receives already-classified gestures: only a host with real DOM access to rendered message media (Tauri's ChatSurface) can measure press and double-click timing safely. */
export interface ChatMediaInteractionPort {
  readonly capability: CapabilityStatus;
  subscribe(handler: ChatMediaInteractionHandler): () => void;
}

export const CHAT_MEDIA_INTERACTION_CAPABILITY_ID = "chat_media_interaction_gestures";

function unavailable_capability(reason: string): CapabilityStatus {
  return { available: false, reason };
}

/** A standard SillyTavern host exposes no hook on rendered chat media, so this implementation is permanently unavailable and never emits; the same commands stay reachable from Gallery and GenerationParametersDialog. */
export class StandardHostChatMediaInteractions implements ChatMediaInteractionPort {
  readonly capability = unavailable_capability(
    "Standard SillyTavern host exposes no message-media gesture hook; use Gallery or the image parameters dialog instead.",
  );

  subscribe(_handler: ChatMediaInteractionHandler): () => void {
    return () => {};
  }
}

/** Write side of `ChatMediaInteractionPort`: a host surface that owns the message DOM reports classified gestures through `handle`. */
export interface ChatMediaSurfaceEvent {
  readonly action: ChatMediaGesture;
  readonly image_id: ImageId;
  readonly message_id: number;
}

export interface ChatMediaGestureSink {
  handle(event: ChatMediaSurfaceEvent): void;
}

/** `message_id` is dropped at this boundary because every command is keyed by image ID. */
export class HostSurfaceChatMediaInteractions
  implements ChatMediaInteractionPort, ChatMediaGestureSink
{
  readonly capability: CapabilityStatus = { available: true };
  readonly #handlers = new Set<ChatMediaInteractionHandler>();

  subscribe(handler: ChatMediaInteractionHandler): () => void {
    this.#handlers.add(handler);
    return () => {
      this.#handlers.delete(handler);
    };
  }

  handle(event: ChatMediaSurfaceEvent): void {
    for (const handler of [...this.#handlers]) {
      handler({ image_id: event.image_id, gesture: event.action });
    }
  }
}

export interface ChatMediaInteractionCommandsDeps {
  open_prompt_edit(image_id: ImageId): void | Promise<void>;
  confirm_active_profile(image_id: ImageId): Promise<boolean>;
  regenerate(image_id: ImageId): void | Promise<void>;
  open_preview(image_id: ImageId): void | Promise<void>;
  open_context_menu?(image_id: ImageId): void | Promise<void>;
}

export class ChatMediaInteractionCommands {
  readonly #deps: ChatMediaInteractionCommandsDeps;

  constructor(deps: ChatMediaInteractionCommandsDeps) {
    this.#deps = deps;
  }

  async handle(event: ChatMediaInteractionEvent): Promise<void> {
    switch (event.gesture) {
      case "long_press":
        return this.open_prompt_edit(event.image_id);
      case "double_click":
        return this.regenerate_with_confirmation(event.image_id);
      case "click":
        return this.open_preview(event.image_id);
      case "context":
        return this.open_context_menu(event.image_id);
    }
  }

  async open_prompt_edit(image_id: ImageId): Promise<void> {
    await this.#deps.open_prompt_edit(image_id);
  }

  async regenerate_with_confirmation(image_id: ImageId): Promise<void> {
    const confirmed = await this.#deps.confirm_active_profile(image_id);
    if (!confirmed) {
      return;
    }
    await this.#deps.regenerate(image_id);
  }

  async open_preview(image_id: ImageId): Promise<void> {
    await this.#deps.open_preview(image_id);
  }

  async open_context_menu(image_id: ImageId): Promise<void> {
    await this.#deps.open_context_menu?.(image_id);
  }
}

/** Connects a port's classified gesture stream to the shared command logic. */
export function wire_chat_media_interactions(
  port: ChatMediaInteractionPort,
  commands: ChatMediaInteractionCommands,
): () => void {
  return port.subscribe((event) => {
    void commands.handle(event);
  });
}
