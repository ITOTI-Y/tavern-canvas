import type { RuntimeModule } from "@tavern-canvas/core";

import type { HostAdapter } from "../../host/index.js";
import type { SlimStore } from "./slim_store.js";

export interface WorldInfoOverrideSettings {
  readonly no_recursion_books: readonly string[];
  readonly slim_books: readonly string[];
}

/**
 * Changes world info scans without changing the books: entries of the chosen books never activate
 * others by recursion, and active entries of the chosen books are sent as their condensed versions.
 */
export class WorldInfoOverridesModule implements RuntimeModule {
  readonly module_id = "world_info_overrides";
  readonly requires: readonly string[] = [];
  readonly #host: HostAdapter;
  readonly #settings: () => WorldInfoOverrideSettings;
  readonly #slims: SlimStore;
  #stops: readonly (() => void)[] = [];

  constructor(host: HostAdapter, settings: () => WorldInfoOverrideSettings, slims: SlimStore) {
    this.#host = host;
    this.#settings = settings;
    this.#slims = slims;
  }

  start(): Promise<void> {
    this.#stops = [
      this.#host.prevent_world_info_recursion(() => new Set(this.#settings().no_recursion_books)),
      this.#host.inject_world_info_slims((book, uid, hash) =>
        this.#settings().slim_books.includes(book) ? this.#slims.lookup(book, uid, hash) : null,
      ),
    ];
    return Promise.resolve();
  }

  stop(): Promise<void> {
    for (const stop of this.#stops) {
      stop();
    }
    this.#stops = [];
    return Promise.resolve();
  }
}
