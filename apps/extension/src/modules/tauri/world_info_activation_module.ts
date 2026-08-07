import type { RuntimeModule } from "@tavern-canvas/core";

import {
  create_tauritavern_host,
  type HostWorldInfoActivationBatch,
  type HostWorldInfoActivationHandler,
  type TauriDetectionGlobals,
  type TauriTavernHost,
} from "../../host/index.js";

/**
 * Consumed by T2's world_info_source.ts ("World Info uses selected data and optional Tauri
 * activation results", Stage 07 plan Task 2 Step 2). T2 had not merged at implementation time
 * (context_sources.ts is still Task 1's `describe.todo` placeholder), so this module exposes its
 * own standalone port for T2 to wire in directly at stage merge -- reusing
 * HostWorldInfoActivationBatch's already-shipped shape (host/tauritavern_host.ts) rather than
 * inventing a new one.
 */
export interface WorldInfoActivationSource {
  get_last_activation(): Promise<HostWorldInfoActivationBatch | null>;
  subscribe(handler: HostWorldInfoActivationHandler): () => void;
}

/** What T2's world_info_source.ts falls back to on a standard SillyTavern host: no activation
 * results, selected World Info context stands unaugmented. */
export const NULL_WORLD_INFO_ACTIVATION_SOURCE: WorldInfoActivationSource = {
  get_last_activation: () => Promise.resolve(null),
  subscribe: () => () => undefined,
};

export interface WorldInfoActivationDiagnostics {
  readonly tauri_world_info_activation_available: boolean;
  readonly reason?: string;
}

export interface WorldInfoActivationModuleOptions {
  readonly globals: TauriDetectionGlobals;
  /** Test/production seam. Production defaults to create_tauritavern_host, the same capability
   * readiness entry capability_probe.ts already uses -- no additional global access. */
  readonly connect?: (globals: TauriDetectionGlobals) => Promise<TauriTavernHost | undefined>;
}

function failure_reason(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

/**
 * Tauri-side wiring for WorldInfo activation. Standard SillyTavern hosts degrade gracefully:
 * get_last_activation() resolves null and subscribe() is a no-op, matching
 * NULL_WORLD_INFO_ACTIVATION_SOURCE's contract exactly (a caller can use this module unconditionally
 * without an availability branch).
 */
export class TauriWorldInfoActivationModule implements RuntimeModule, WorldInfoActivationSource {
  readonly module_id = "tauri_world_info_activation";
  readonly requires: readonly string[] = [];

  readonly #globals: TauriDetectionGlobals;
  readonly #connect: (globals: TauriDetectionGlobals) => Promise<TauriTavernHost | undefined>;
  #host: TauriTavernHost | null = null;
  #diagnostics: WorldInfoActivationDiagnostics = {
    tauri_world_info_activation_available: false,
    reason: "not started",
  };
  #subscribers = new Set<HostWorldInfoActivationHandler>();
  #unsubscribe_host: (() => Promise<void>) | null = null;
  #starting: Promise<void> | null = null;

  constructor(options: WorldInfoActivationModuleOptions) {
    this.#globals = options.globals;
    this.#connect = options.connect ?? create_tauritavern_host;
  }

  get diagnostics(): WorldInfoActivationDiagnostics {
    return this.#diagnostics;
  }

  async start(): Promise<void> {
    if (this.#host !== null) {
      return; // Idempotent: already subscribed.
    }
    if (this.#starting !== null) {
      // A start() already in flight (e.g. two callers racing) -- await the same attempt instead
      // of issuing a second concurrent subscribe_world_info_activation call.
      await this.#starting;
      return;
    }
    this.#starting = this.#connect_and_subscribe();
    try {
      await this.#starting;
    } finally {
      this.#starting = null;
    }
  }

  async #connect_and_subscribe(): Promise<void> {
    let host: TauriTavernHost | undefined;
    try {
      host = await this.#connect(this.#globals);
    } catch (error) {
      this.#diagnostics = {
        tauri_world_info_activation_available: false,
        reason: failure_reason(error, "TauriTavern connection failed"),
      };
      return;
    }
    if (host === undefined) {
      this.#diagnostics = {
        tauri_world_info_activation_available: false,
        reason: "TauriTavern is not present on this host",
      };
      return;
    }

    try {
      this.#unsubscribe_host = await host.subscribe_world_info_activation((batch) => {
        for (const subscriber of this.#subscribers) {
          subscriber(batch);
        }
      });
      this.#host = host;
      this.#diagnostics = { tauri_world_info_activation_available: true };
    } catch (error) {
      this.#diagnostics = {
        tauri_world_info_activation_available: false,
        reason: failure_reason(error, "TauriTavern WorldInfo activation subscription failed"),
      };
    }
  }

  async stop(): Promise<void> {
    const unsubscribe_host = this.#unsubscribe_host;
    this.#unsubscribe_host = null;
    this.#host = null;
    this.#diagnostics = { tauri_world_info_activation_available: false, reason: "stopped" };
    if (unsubscribe_host !== null) {
      await unsubscribe_host();
    }
  }

  async get_last_activation(): Promise<HostWorldInfoActivationBatch | null> {
    if (this.#host === null) {
      return null;
    }
    return this.#host.get_last_world_info_activation();
  }

  subscribe(handler: HostWorldInfoActivationHandler): () => void {
    this.#subscribers.add(handler);
    return () => {
      this.#subscribers.delete(handler);
    };
  }
}
