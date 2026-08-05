import { describe, expect, it, vi } from "vitest";

import {
  inspect_tauritavern,
  create_tauritavern_host,
  TauriTavernHost,
  type TauriTavernChatSurfaceParticipantSurface,
  type TauriTavernGlobalSurface,
  type TauriWorldInfoActivationBatchSurface,
} from "./tauritavern_host.js";

function create_tauri_host(options?: {
  readonly last_activation?: unknown;
  readonly registration_result?: unknown;
  readonly unsubscribe_result?: unknown;
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
  const registration_result =
    options !== undefined && "registration_result" in options
      ? options.registration_result
      : { fault };
  const unsubscribe_result =
    options !== undefined && "unsubscribe_result" in options
      ? options.unsubscribe_result
      : unsubscribe;
  const tauri: TauriTavernGlobalSurface = {
    abiVersion: 1,
    ready: Promise.resolve(),
    api: {
      chatSurface: {
        protocolVersion: 1,
        isManagedOwnershipRequired: () => true,
        registerParticipant: (participant) => {
          registered_participant = participant;
          return registration_result as {
            readonly fault: (error: unknown) => void;
          };
        },
      },
      worldInfo: {
        getLastActivation: async () =>
          (options?.last_activation ?? null) as
            | TauriWorldInfoActivationBatchSurface
            | null,
        subscribeActivations: async (handler) => {
          activation_handler = handler;
          return unsubscribe_result as () => void | Promise<void>;
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

  it.each([undefined, null, {}, { fault: "invalid" }])(
    "rejects malformed ChatSurface registration %j",
    (registration_result) => {
      const tauri = create_tauri_host({ registration_result });

      expect(() => tauri.host.register_chat_surface({
        id: "tavern-canvas.messages",
      })).toThrowError(/invalid ChatSurface registration/u);
    },
  );

  it.each([
    {},
    { dispose: "invalid" },
  ])("rejects a malformed ChatSurface hook disposer", (raw_disposer) => {
    const tauri = create_tauri_host();
    tauri.host.register_chat_surface({
      id: "tavern-canvas.messages",
      did_mount: () => raw_disposer as unknown as { dispose: () => void },
    });
    const participant = tauri.get_registered_participant();
    if (participant === undefined) {
      throw new Error("participant was not registered");
    }

    expect(() => participant.didMount?.({
      mesid: 7,
      element: document.createElement("article"),
      content: document.createElement("div"),
      signal: new AbortController().signal,
    })).toThrowError(/invalid ChatSurface disposer/u);
  });

  it.each([
    ["a scalar batch", 7],
    [
      "an invalid timestamp",
      { timestampMs: Number.NaN, trigger: "generation", entries: [] },
    ],
    [
      "an invalid trigger",
      { timestampMs: 1, trigger: null, entries: [] },
    ],
    [
      "non-array entries",
      { timestampMs: 1, trigger: "generation", entries: null },
    ],
    [
      "a non-record entry",
      { timestampMs: 1, trigger: "generation", entries: [null] },
    ],
    [
      "an invalid world",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{ world: null, uid: 1, displayName: "Entry", constant: true }],
      },
    ],
    [
      "an invalid uid",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{ world: "Lore", uid: null, displayName: "Entry", constant: true }],
      },
    ],
    [
      "an invalid display name",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{ world: "Lore", uid: 1, displayName: null, constant: true }],
      },
    ],
    [
      "an invalid constant flag",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{ world: "Lore", uid: 1, displayName: "Entry", constant: 1 }],
      },
    ],
    [
      "an invalid position",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{
          world: "Lore",
          uid: 1,
          displayName: "Entry",
          constant: true,
          position: "middle",
        }],
      },
    ],
    [
      "uncloneable activation data",
      {
        timestampMs: 1,
        trigger: "generation",
        entries: [{
          world: "Lore",
          uid: 1,
          displayName: "Entry",
          constant: true,
          callback: () => undefined,
        }],
      },
    ],
  ])("rejects %s", async (_, last_activation) => {
    const tauri = create_tauri_host({ last_activation });

    await expect(
      tauri.host.get_last_world_info_activation(),
    ).rejects.toThrowError(/invalid WorldInfo activation/u);
  });

  it("validates subscribed activation batches before normalization", async () => {
    const tauri = create_tauri_host();
    const handler = vi.fn();
    await tauri.host.subscribe_world_info_activation(handler);

    expect(() => tauri.emit_activation({
      timestampMs: 1,
      trigger: "generation",
      entries: [{
        world: "Lore",
        uid: 1,
        displayName: "Entry",
        constant: true,
        position: "middle" as unknown as "before",
      }],
    })).toThrowError(/invalid WorldInfo activation/u);
    expect(handler).not.toHaveBeenCalled();
  });

  it.each([undefined, null, {}, "invalid"])(
    "rejects malformed WorldInfo unsubscribe result %j",
    async (unsubscribe_result) => {
      const tauri = create_tauri_host({ unsubscribe_result });

      await expect(
        tauri.host.subscribe_world_info_activation(() => undefined),
      ).rejects.toThrowError(/invalid WorldInfo unsubscribe/u);
    },
  );

  it("keeps async WorldInfo disposal idempotent after an error", async () => {
    const unsubscribe = vi.fn(async () => {
      throw new Error("unsubscribe failed");
    });
    const tauri = create_tauri_host({ unsubscribe_result: unsubscribe });
    const dispose = await tauri.host.subscribe_world_info_activation(
      () => undefined,
    );

    await expect(dispose()).rejects.toThrowError("unsubscribe failed");
    await expect(dispose()).resolves.toBeUndefined();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("requires ABI 1 before creating a Tauri host", async () => {
    await expect(create_tauritavern_host({
      __TAURITAVERN__: {
        ready: Promise.resolve(),
        api: {},
      } as unknown as TauriTavernGlobalSurface,
    })).resolves.toBeUndefined();
    await expect(create_tauritavern_host({
      __TAURITAVERN__: {
        abiVersion: 2,
        ready: Promise.resolve(),
        api: {},
      } as unknown as TauriTavernGlobalSurface,
    })).resolves.toBeUndefined();
  });

  it("waits for the fallback when Tauri ready is null", async () => {
    let release_ready: (() => void) | undefined;
    const fallback = new Promise<void>((resolve) => {
      release_ready = resolve;
    });
    const host_promise = create_tauritavern_host({
      __TAURITAVERN__: { abiVersion: 1, ready: null, api: {} },
      __TAURITAVERN_MAIN_READY__: fallback,
    });
    let settled = false;
    void host_promise.then(() => {
      settled = true;
    });
    await Promise.resolve();
    expect(settled).toBe(false);
    release_ready?.();

    await expect(host_promise).resolves.toBeInstanceOf(TauriTavernHost);
  });

  it("supports null readiness without a fallback", async () => {
    await expect(create_tauritavern_host({
      __TAURITAVERN__: { abiVersion: 1, ready: null, api: {} },
    })).resolves.toBeInstanceOf(TauriTavernHost);
  });

describe("inspect_tauritavern", () => {
  it("requires ABI 1 and checks enhancement methods independently", () => {
    expect(inspect_tauritavern({
      abiVersion: 1,
      api: {
        chatSurface: {
          protocolVersion: 1,
          isManagedOwnershipRequired: () => true,
          registerParticipant: () => ({ fault: () => undefined }),
        },
        worldInfo: {
          getLastActivation: () => Promise.resolve(null),
          subscribeActivations: () => Promise.resolve(() => undefined),
        },
      },
    })).toEqual({
      tauri_chat_surface: true,
      tauri_world_info_activation: true,
    });
  });

  it.each([undefined, null, 7, {}, { abiVersion: 2, api: {} }])(
    "fails closed for malformed or incompatible host %j",
    (value) => {
      expect(() => inspect_tauritavern(value)).not.toThrow();
      expect(inspect_tauritavern(value)).toEqual({
        tauri_chat_surface: false,
        tauri_world_info_activation: false,
      });
    },
  );

  it.each([
    "protocolVersion",
    "isManagedOwnershipRequired",
    "registerParticipant",
  ])("requires ChatSurface %s", (property_name) => {
    const chat_surface: Record<string, unknown> = {
      protocolVersion: 1,
      isManagedOwnershipRequired: () => true,
      registerParticipant: () => ({ fault: () => undefined }),
    };
    Reflect.deleteProperty(chat_surface, property_name);

    expect(inspect_tauritavern({
      abiVersion: 1,
      api: { chatSurface: chat_surface },
    })).toEqual({
      tauri_chat_surface: false,
      tauri_world_info_activation: false,
    });
  });

  it.each(["getLastActivation", "subscribeActivations"])(
    "requires WorldInfo %s",
    (property_name) => {
      const world_info: Record<string, unknown> = {
        getLastActivation: () => Promise.resolve(null),
        subscribeActivations: () => Promise.resolve(() => undefined),
      };
      Reflect.deleteProperty(world_info, property_name);

      expect(inspect_tauritavern({
        abiVersion: 1,
        api: { worldInfo: world_info },
      })).toEqual({
        tauri_chat_surface: false,
        tauri_world_info_activation: false,
      });
    },
  );

  it.each(["abiVersion", "api"])(
    "fails closed when the %s getter throws",
    (property_name) => {
      const tauri: Record<string, unknown> = {
        abiVersion: 1,
        api: {},
      };
      Object.defineProperty(tauri, property_name, {
        get: () => {
          throw new Error("getter failed");
        },
      });

      expect(() => inspect_tauritavern(tauri)).not.toThrow();
      expect(inspect_tauritavern(tauri)).toEqual({
        tauri_chat_surface: false,
        tauri_world_info_activation: false,
      });
    },
  );
});

  it("never detects Tauri from the fallback alone", async () => {
    await expect(create_tauritavern_host({
      __TAURITAVERN_MAIN_READY__: Promise.resolve(),
    })).resolves.toBeUndefined();
  });

it("declares the public Tauri readiness fallback", async () => {
  const fallback: Window["__TAURITAVERN_MAIN_READY__"] = Promise.resolve();

  await expect(fallback).resolves.toBeUndefined();
});
