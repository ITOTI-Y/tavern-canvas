import type { CapabilityStatus, ImageId } from "@tavern-canvas/contracts";

export type ChatMediaGesture = "click" | "double_click" | "long_press" | "context";

export interface ChatMediaInteractionEvent {
  readonly image_id: ImageId;
  readonly gesture: ChatMediaGesture;
}

export type ChatMediaInteractionHandler = (event: ChatMediaInteractionEvent) => void;

/**
 * Source of already-classified chat-image gestures, keyed by TavernCanvas image ID. Deliberately
 * receives classified gestures, not raw pointer/timing events: only a host with real DOM access to
 * rendered message media (Tauri's ChatSurface) can measure press duration / double-click windows
 * safely, so that classification lives in the host-specific wiring (T6's
 * apps/extension/src/modules/tauri/chat_surface_module.ts), while this port -- and the shared
 * command logic below -- stays host-agnostic.
 */
export interface ChatMediaInteractionPort {
  readonly capability: CapabilityStatus;
  subscribe(handler: ChatMediaInteractionHandler): () => void;
}

export const CHAT_MEDIA_INTERACTION_CAPABILITY_ID = "chat_media_interaction_gestures";

function unavailable_capability(reason: string): CapabilityStatus {
  return { available: false, reason };
}

/**
 * `HostAdapter` (apps/extension/src/host/host_adapter.ts) exposes no click/dblclick/long-press/
 * context hook on rendered chat message media at all -- confirmed by its full method list
 * (message/data-level only, no DOM access). A standard SillyTavern host therefore cannot expose
 * these gestures without a private DOM selector, which the parity brief explicitly forbids,
 * so this implementation degrades to a permanently unavailable capability and never emits.
 * The identical commands stay reachable from Gallery and GenerationParametersDialog, which call
 * `ChatMediaInteractionCommands` directly instead of going through gesture events.
 */
export class StandardHostChatMediaInteractions implements ChatMediaInteractionPort {
  readonly capability = unavailable_capability(
    "Standard SillyTavern host exposes no message-media gesture hook; use Gallery or the image parameters dialog instead.",
  );

  subscribe(_handler: ChatMediaInteractionHandler): () => void {
    return () => {};
  }
}

// ---------------------------------------------------------------------------
// Shared command logic (manual.longpress_edit_open, gallery.click_to_regenerate-equivalent,
// gallery.click_to_preview-equivalent) -- identical whether triggered by a real gesture (Tauri) or
// by an explicit Gallery/params-dialog button.
// ---------------------------------------------------------------------------

export interface ChatMediaInteractionCommandsDeps {
  open_prompt_edit(image_id: ImageId): void | Promise<void>;
  /** "double-click submits regenerate after confirming the active profile" */
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
