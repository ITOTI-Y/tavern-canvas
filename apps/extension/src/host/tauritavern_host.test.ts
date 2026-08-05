import { describe, expect, it, vi } from "vitest";

import {
  create_tauritavern_host,
  TauriTavernHost,
  type TauriTavernChatSurfaceParticipantSurface,
  type TauriTavernGlobalSurface,
} from "./tauritavern_host.js";

function create_tauri_host(options?: {
  readonly last_activation?: {
    timestampMs: number;
    trigger: string;
    entries: {
      world: string;
      uid: string | number;
      displayName: string;
      constant: boolean;
      position?: "before" | "after" | "depth";
    }[];
  } | null;
}) {
  let registered_participant: TauriTavernChatSurfaceParticipantSurface | undefined;
  let activation_handler:
    | ((batch: {
        timestampMs: number;
        trigger: string;
        entries: {
          world: string;
          uid: string | number;
          displayName: string;
          constant: boolean;
          position?: "before" | "after" | "depth";
        }[];
      }) => void)
    | undefined;
  const fault = vi.fn();
  const unsubscribe = vi.fn(async () => undefined);
  const tauri: TauriTavernGlobalSurface = {
    abiVersion: 1,
    ready: Promise.resolve(),
    api: {
      chatSurface: {
        protocolVersion: 1,
        isManagedOwnershipRequired: () => true,
        registerParticipant: (participant) => {
          registered_participant = participant;
          return { fault };
        },
      },
      worldInfo: {
        getLastActivation: async () => options?.last_activation ?? null,
        subscribeActivations: async (handler) => {
          activation_handler = handler;
          return unsubscribe;
        },
      },
    },
  };

  return {
    host: new TauriTavernHost(tauri),
    get_registered_participant: () => registered_participant,
    emit_activation: (batch: Parameters<NonNullable<typeof activation_handler>>[0]) => {
      activation_handler?.(batch);
    },
    fault,
    unsubscribe,
  };
}

describe("TauriTavernHost", () => {
  it("registers a protocol-v1 ChatSurface participant and normalizes hook disposers", () => {
    const tauri = create_tauri_host();
    const did_mount_dispose = vi.fn();
    const did_commit_dispose = vi.fn();
    const registration = tauri.host.register_chat_surface({
      id: "tavern-canvas.messages",
      did_mount: (context) => {
        expect(context.message_id).toBe(7);
        return { dispose: did_mount_dispose };
      },
      did_commit_content: () => did_commit_dispose,
    });
    const participant = tauri.get_registered_participant();
    if (participant === undefined) {
      throw new Error("participant was not registered");
    }

    expect(participant.id).toBe("tavern-canvas.messages");
    expect(participant.protocolVersion).toBe(1);

    const mounted_context = {
      mesid: 7,
      element: document.createElement("article"),
      content: document.createElement("div"),
      signal: new AbortController().signal,
    };
    const mounted_disposer = participant.didMount?.(mounted_context);
    const commit_disposer = participant.didCommitContent?.(mounted_context);
    expect(typeof mounted_disposer).toBe("function");
    expect(typeof commit_disposer).toBe("function");
    if (
      typeof mounted_disposer !== "function" ||
      typeof commit_disposer !== "function"
    ) {
      throw new Error("participant hooks did not return normalized disposers");
    }

    mounted_disposer();
    mounted_disposer();
    commit_disposer();
    commit_disposer();
    expect(did_mount_dispose).toHaveBeenCalledTimes(1);
    expect(did_commit_dispose).toHaveBeenCalledTimes(1);

    const error = new Error("surface failed");
    registration.report_fault(error);
    expect(tauri.fault).toHaveBeenCalledWith(error);
  });

  it("normalizes and clones the latest WorldInfo activation", async () => {
    const last_activation = {
      timestampMs: 1_786_000_000_000,
      trigger: "generation",
      entries: [
        {
          world: "Lore",
          uid: 9,
          displayName: "Rainy district",
          constant: false,
          position: "before" as const,
        },
      ],
    };
    const tauri = create_tauri_host({ last_activation });

    const result = await tauri.host.get_last_world_info_activation();

    expect(result).toEqual({
      timestamp_ms: 1_786_000_000_000,
      trigger: "generation",
      entries: [
        {
          world: "Lore",
          uid: 9,
          display_name: "Rainy district",
          constant: false,
          position: "before",
        },
      ],
    });
    const raw_entry = last_activation.entries[0];
    if (raw_entry === undefined) {
      throw new Error("test fixture is missing its activation entry");
    }
    raw_entry.displayName = "changed";
    expect(result?.entries[0]?.display_name).toBe("Rainy district");
  });

  it("normalizes activation subscription data and async unsubscribe", async () => {
    const tauri = create_tauri_host();
    const activations: unknown[] = [];
    const dispose = await tauri.host.subscribe_world_info_activation((batch) =>
      activations.push(batch),
    );

    tauri.emit_activation({
      timestampMs: 1_786_000_000_100,
      trigger: "manual",
      entries: [
        {
          world: "Lore",
          uid: "entry-2",
          displayName: "Market",
          constant: true,
          position: "after",
        },
      ],
    });

    expect(activations).toEqual([
      {
        timestamp_ms: 1_786_000_000_100,
        trigger: "manual",
        entries: [
          {
            world: "Lore",
            uid: "entry-2",
            display_name: "Market",
            constant: true,
            position: "after",
          },
        ],
      },
    ]);

    await dispose();
    await dispose();
    expect(tauri.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("detects Tauri only through window.__TAURITAVERN__ and waits for readiness", async () => {
    let ready = false;
    const tauri: TauriTavernGlobalSurface = {
      abiVersion: 1,
      ready: Promise.resolve().then(() => {
        ready = true;
      }),
      api: {},
    };
    const globals = { __TAURITAVERN__: tauri };
    Object.defineProperties(globals, {
      __TAURI__: {
        get: () => {
          throw new Error("private Tauri global accessed");
        },
      },
      navigator: {
        get: () => {
          throw new Error("user agent accessed");
        },
      },
    });

    await expect(create_tauritavern_host(globals)).resolves.toBeInstanceOf(
      TauriTavernHost,
    );
    expect(ready).toBe(true);
    await expect(
      create_tauritavern_host({ __TAURITAVERN__: undefined }),
    ).resolves.toBeUndefined();
  });
});
