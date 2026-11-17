import type { RuntimeModule } from "@tavern-canvas/core";

import type { HostAdapter } from "../../host/index.js";

/**
 * Keeps the text of entries in the chosen world books from activating other entries, without
 * changing the books: the setting applies to each world info scan as it loads the entries.
 */
export class WorldInfoOverridesModule implements RuntimeModule {
  readonly module_id = "world_info_overrides";
  readonly requires: readonly string[] = [];
  readonly #host: HostAdapter;
  readonly #books: () => readonly string[];
  #stop: (() => void) | null = null;

  constructor(host: HostAdapter, books: () => readonly string[]) {
    this.#host = host;
    this.#books = books;
  }

  start(): Promise<void> {
    this.#stop = this.#host.prevent_world_info_recursion(() => new Set(this.#books()));
    return Promise.resolve();
  }

  stop(): Promise<void> {
    this.#stop?.();
    this.#stop = null;
    return Promise.resolve();
  }
}
