import type { SillyTavernContextSurface } from "./sillytavern_host.js";
import type { TavernHelperSurface } from "./tavern_helper_host.js";

declare global {
  interface Window {
    TavernHelper?: TavernHelperSurface & {
      getTavernHelperVersion(): string;
    };
    SillyTavern?: {
      getContext(): SillyTavernContextSurface;
    };
  }
}

export {};
