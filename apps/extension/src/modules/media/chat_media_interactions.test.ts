import { describe, expect, it, vi } from "vitest";

import {
  ChatMediaInteractionCommands,
  StandardHostChatMediaInteractions,
  wire_chat_media_interactions,
  type ChatMediaInteractionCommandsDeps,
  type ChatMediaInteractionHandler,
  type ChatMediaInteractionPort,
} from "./chat_media_interactions.js";

const IMAGE_ID = "33333333-3333-4333-8333-333333333333";

/**
 * chat_media_interactions: ChatMediaInteractionPort click/double-click/long-press/context
 * actions keyed by TavernCanvas image ID; long press opens prompt edit, double-click submits
 * regenerate after confirming the active profile, single click opens image preview; streaming
 * placeholders keyed by request ID and replaced only by matching job completion (see
 * chat_placeholder.test.ts for the placeholder half).
 */
describe("StandardHostChatMediaInteractions", () => {
  it("reports gestures as unavailable rather than using a private selector", () => {
    const port = new StandardHostChatMediaInteractions();
    expect(port.capability.available).toBe(false);
    expect(port.capability.reason).toBeDefined();
  });

  it("never emits any gesture", () => {
    const port = new StandardHostChatMediaInteractions();
    const handler = vi.fn();
    const unsubscribe = port.subscribe(handler);
    unsubscribe();
    expect(handler).not.toHaveBeenCalled();
  });
});

function build_commands(overrides: Partial<ChatMediaInteractionCommandsDeps> = {}) {
  const deps: ChatMediaInteractionCommandsDeps = {
    open_prompt_edit: vi.fn(),
    confirm_active_profile: vi.fn(async () => true),
    regenerate: vi.fn(),
    open_preview: vi.fn(),
    open_context_menu: vi.fn(),
    ...overrides,
  };
  return { commands: new ChatMediaInteractionCommands(deps), deps };
}

describe("ChatMediaInteractionCommands", () => {
  it("long press opens prompt edit", async () => {
    const { commands, deps } = build_commands();
    await commands.handle({ image_id: IMAGE_ID, gesture: "long_press" });
    expect(deps.open_prompt_edit).toHaveBeenCalledWith(IMAGE_ID);
    expect(deps.regenerate).not.toHaveBeenCalled();
  });

  it("single click opens image preview", async () => {
    const { commands, deps } = build_commands();
    await commands.handle({ image_id: IMAGE_ID, gesture: "click" });
    expect(deps.open_preview).toHaveBeenCalledWith(IMAGE_ID);
  });

  it("double-click confirms the active profile, then regenerates", async () => {
    const { commands, deps } = build_commands();
    await commands.handle({ image_id: IMAGE_ID, gesture: "double_click" });
    expect(deps.confirm_active_profile).toHaveBeenCalledWith(IMAGE_ID);
    expect(deps.regenerate).toHaveBeenCalledWith(IMAGE_ID);
  });

  it("double-click does not regenerate when the profile confirmation is declined", async () => {
    const { commands, deps } = build_commands({ confirm_active_profile: vi.fn(async () => false) });
    await commands.handle({ image_id: IMAGE_ID, gesture: "double_click" });
    expect(deps.regenerate).not.toHaveBeenCalled();
  });

  it("context gesture opens the context menu when supported", async () => {
    const { commands, deps } = build_commands();
    await commands.handle({ image_id: IMAGE_ID, gesture: "context" });
    expect(deps.open_context_menu).toHaveBeenCalledWith(IMAGE_ID);
  });

  it("context gesture is a safe no-op when the host has no context menu", async () => {
    const commands = new ChatMediaInteractionCommands({
      open_prompt_edit: vi.fn(),
      confirm_active_profile: vi.fn(async () => true),
      regenerate: vi.fn(),
      open_preview: vi.fn(),
    });
    await expect(
      commands.handle({ image_id: IMAGE_ID, gesture: "context" }),
    ).resolves.toBeUndefined();
  });
});

describe("wire_chat_media_interactions", () => {
  class FakePort implements ChatMediaInteractionPort {
    readonly capability = { available: true };
    #handler: ChatMediaInteractionHandler | null = null;

    subscribe(handler: ChatMediaInteractionHandler): () => void {
      this.#handler = handler;
      return () => {
        this.#handler = null;
      };
    }

    emit(event: Parameters<ChatMediaInteractionHandler>[0]): void {
      this.#handler?.(event);
    }
  }

  it("routes emitted gestures into the command handler, keyed by image ID", () => {
    const port = new FakePort();
    const { commands, deps } = build_commands();
    wire_chat_media_interactions(port, commands);

    port.emit({ image_id: IMAGE_ID, gesture: "click" });
    expect(deps.open_preview).toHaveBeenCalledWith(IMAGE_ID);
  });

  it("stops routing after unsubscribe", () => {
    const port = new FakePort();
    const { commands, deps } = build_commands();
    const unsubscribe = wire_chat_media_interactions(port, commands);
    unsubscribe();

    port.emit({ image_id: IMAGE_ID, gesture: "click" });
    expect(deps.open_preview).not.toHaveBeenCalled();
  });
});
