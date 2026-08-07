import { afterEach, describe, expect, it, vi } from "vitest";

import type {
  HostWorldInfoActivationBatch,
  TauriTavernChatSurfaceParticipantSurface,
  TauriTavernGlobalSurface,
} from "../../host/index.js";
import { TauriTavernHost } from "../../host/index.js";
import {
  TAVERN_CANVAS_IMAGE_ID_ATTRIBUTE,
  TauriChatSurfaceModule,
  type ChatMediaInteractionEvent,
  type ChatMediaInteractionPort,
} from "./chat_surface_module.js";
import {
  NULL_WORLD_INFO_ACTIVATION_SOURCE,
  TauriWorldInfoActivationModule,
} from "./world_info_activation_module.js";

const IMAGE_ID = "123e4567-e89b-12d3-a456-426614174000";

interface FakeTauriHostHandle {
  readonly tauri: TauriTavernGlobalSurface;
  readonly register_participant: ReturnType<typeof vi.fn>;
  readonly subscribe_activations: ReturnType<typeof vi.fn>;
  readonly unsubscribe_activations: ReturnType<typeof vi.fn>;
  get_registered_participant(): TauriTavernChatSurfaceParticipantSurface | undefined;
  emit_activation(batch: unknown): void;
}

function create_fake_tauri_host(options?: {
  readonly last_activation?: unknown;
}): FakeTauriHostHandle {
  let registered_participant: TauriTavernChatSurfaceParticipantSurface | undefined;
  let activation_handler: ((batch: unknown) => void) | undefined;
  const unsubscribe_activations = vi.fn(async () => undefined);
  const subscribe_activations = vi.fn(async (handler: (batch: unknown) => void) => {
    activation_handler = handler;
    return unsubscribe_activations;
  });
  const register_participant = vi.fn((participant: TauriTavernChatSurfaceParticipantSurface) => {
    registered_participant = participant;
    return { fault: vi.fn() };
  });

  const tauri: TauriTavernGlobalSurface = {
    abiVersion: 1,
    ready: Promise.resolve(),
    api: {
      chatSurface: {
        protocolVersion: 1,
        isManagedOwnershipRequired: () => true,
        registerParticipant: register_participant,
      },
      worldInfo: {
        getLastActivation: async () => options?.last_activation ?? null,
        subscribeActivations: subscribe_activations,
      },
    },
  };

  return {
    tauri,
    register_participant,
    subscribe_activations,
    unsubscribe_activations,
    get_registered_participant: () => registered_participant,
    emit_activation: (batch) => activation_handler?.(batch),
  };
}

function image_element(): HTMLElement {
  const element = document.createElement("img");
  element.setAttribute(TAVERN_CANVAS_IMAGE_ID_ATTRIBUTE, IMAGE_ID);
  return element;
}

class RecordingPort implements ChatMediaInteractionPort {
  readonly events: ChatMediaInteractionEvent[] = [];
  handle(event: ChatMediaInteractionEvent): void {
    this.events.push(event);
  }
}

describe("TauriChatSurfaceModule", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("registers a ChatSurface participant exactly once across repeated start() calls", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });

    await module_.start();
    await module_.start();

    expect(fake.register_participant).toHaveBeenCalledTimes(1);
    expect(module_.diagnostics.tauri_chat_surface_available).toBe(true);
  });

  it("dispatches click on a TavernCanvas-owned element to the port, keyed by image ID", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();

    const participant = fake.get_registered_participant();
    if (participant?.didMount === undefined) {
      throw new Error("participant.didMount was not registered");
    }
    const content = document.createElement("div");
    const media = image_element();
    content.append(media);
    participant.didMount({
      mesid: 42,
      element: content,
      content,
      signal: new AbortController().signal,
    });

    media.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(port.events).toEqual([{ action: "click", image_id: IMAGE_ID, message_id: 42 }]);
  });

  it("dispatches double-click and context actions", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();
    const participant = fake.get_registered_participant();
    if (participant?.didMount === undefined) {
      throw new Error("participant.didMount was not registered");
    }
    const content = document.createElement("div");
    const media = image_element();
    content.append(media);
    participant.didMount({
      mesid: 9,
      element: content,
      content,
      signal: new AbortController().signal,
    });

    media.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    const context_event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    media.dispatchEvent(context_event);

    expect(port.events).toEqual([
      { action: "double_click", image_id: IMAGE_ID, message_id: 9 },
      { action: "context", image_id: IMAGE_ID, message_id: 9 },
    ]);
    expect(context_event.defaultPrevented).toBe(true);
  });

  it("dispatches long_press after the hold threshold and swallows the trailing click", async () => {
    vi.useFakeTimers();
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();
    const participant = fake.get_registered_participant();
    if (participant?.didMount === undefined) {
      throw new Error("participant.didMount was not registered");
    }
    const content = document.createElement("div");
    const media = image_element();
    content.append(media);
    participant.didMount({
      mesid: 3,
      element: content,
      content,
      signal: new AbortController().signal,
    });

    media.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, clientX: 10, clientY: 10 }),
    );
    vi.advanceTimersByTime(500);
    media.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(port.events).toEqual([{ action: "long_press", image_id: IMAGE_ID, message_id: 3 }]);
  });

  it("cancels the pending long-press when the pointer moves past the tolerance", async () => {
    vi.useFakeTimers();
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();
    const participant = fake.get_registered_participant();
    if (participant?.didMount === undefined) {
      throw new Error("participant.didMount was not registered");
    }
    const content = document.createElement("div");
    const media = image_element();
    content.append(media);
    participant.didMount({
      mesid: 3,
      element: content,
      content,
      signal: new AbortController().signal,
    });

    media.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, clientX: 10, clientY: 10 }),
    );
    media.dispatchEvent(
      new PointerEvent("pointermove", { bubbles: true, clientX: 40, clientY: 10 }),
    );
    vi.advanceTimersByTime(500);

    expect(port.events).toEqual([]);
  });

  it("un-registers gesture listeners when did_mount's disposer runs", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();
    const participant = fake.get_registered_participant();
    if (participant?.didMount === undefined) {
      throw new Error("participant.didMount was not registered");
    }
    const content = document.createElement("div");
    const media = image_element();
    content.append(media);
    const disposer = participant.didMount({
      mesid: 3,
      element: content,
      content,
      signal: new AbortController().signal,
    });
    if (typeof disposer !== "function") {
      throw new Error("did_mount did not return a plain disposer function");
    }

    disposer();
    media.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(port.events).toEqual([]);
  });

  it("degrades gracefully with no port calls when TauriTavern is absent", async () => {
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => undefined,
    });

    await expect(module_.start()).resolves.toBeUndefined();
    expect(module_.diagnostics.tauri_chat_surface_available).toBe(false);
    expect(port.events).toEqual([]);
  });

  it("detects presence through the single documented readiness global, no override needed", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: { __TAURITAVERN__: fake.tauri },
      port,
    });

    await module_.start();

    expect(module_.diagnostics.tauri_chat_surface_available).toBe(true);
  });

  it("stop() clears diagnostics and is safe to call twice", async () => {
    const fake = create_fake_tauri_host();
    const port = new RecordingPort();
    const module_ = new TauriChatSurfaceModule({
      globals: {},
      port,
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();

    await module_.stop();
    await module_.stop();

    expect(module_.diagnostics.tauri_chat_surface_available).toBe(false);
  });
});

describe("TauriWorldInfoActivationModule", () => {
  const sample_batch: HostWorldInfoActivationBatch = {
    timestamp_ms: 1000,
    trigger: "message",
    entries: [{ world: "w", uid: 1, display_name: "Entry", constant: true }],
  };

  it("subscribes to the host exactly once across repeated start() calls", async () => {
    const fake = create_fake_tauri_host();
    const module_ = new TauriWorldInfoActivationModule({
      globals: {},
      connect: async () => new TauriTavernHost(fake.tauri),
    });

    await Promise.all([module_.start(), module_.start()]);
    await module_.start();

    expect(fake.subscribe_activations).toHaveBeenCalledTimes(1);
    expect(module_.diagnostics.tauri_world_info_activation_available).toBe(true);
  });

  it("fans out host activation batches to every subscriber", async () => {
    const fake = create_fake_tauri_host();
    const module_ = new TauriWorldInfoActivationModule({
      globals: {},
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();

    const received: HostWorldInfoActivationBatch[] = [];
    const unsubscribe = module_.subscribe((batch) => received.push(batch));

    fake.emit_activation({ timestampMs: 5, trigger: "message", entries: [] });

    expect(received).toEqual([{ timestamp_ms: 5, trigger: "message", entries: [] }]);
    unsubscribe();
    fake.emit_activation({ timestampMs: 6, trigger: "message", entries: [] });
    expect(received).toHaveLength(1);
  });

  it("delegates get_last_activation to the host once connected", async () => {
    const fake = create_fake_tauri_host({
      last_activation: {
        timestampMs: sample_batch.timestamp_ms,
        trigger: sample_batch.trigger,
        entries: [
          {
            world: "w",
            uid: 1,
            displayName: "Entry",
            constant: true,
          },
        ],
      },
    });
    const module_ = new TauriWorldInfoActivationModule({
      globals: {},
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();

    await expect(module_.get_last_activation()).resolves.toEqual(sample_batch);
  });

  it("stop() unsubscribes from the host and is safe to call twice", async () => {
    const fake = create_fake_tauri_host();
    const module_ = new TauriWorldInfoActivationModule({
      globals: {},
      connect: async () => new TauriTavernHost(fake.tauri),
    });
    await module_.start();

    await module_.stop();
    await module_.stop();

    expect(fake.unsubscribe_activations).toHaveBeenCalledTimes(1);
    expect(module_.diagnostics.tauri_world_info_activation_available).toBe(false);
  });

  it("degrades to the null activation source's exact contract when TauriTavern is absent", async () => {
    const module_ = new TauriWorldInfoActivationModule({
      globals: {},
      connect: async () => undefined,
    });
    await module_.start();

    await expect(module_.get_last_activation()).resolves.toBe(
      await NULL_WORLD_INFO_ACTIVATION_SOURCE.get_last_activation(),
    );
    expect(module_.diagnostics.tauri_world_info_activation_available).toBe(false);

    const handler = vi.fn();
    const unsubscribe = module_.subscribe(handler);
    expect(() => unsubscribe()).not.toThrow();
    expect(handler).not.toHaveBeenCalled();
  });
});
