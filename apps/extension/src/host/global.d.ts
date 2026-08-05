import type { SillyTavernContextSurface } from "./sillytavern_host.js";
import type { TavernHelperSurface } from "./tavern_helper_host.js";
import type { TauriTavernGlobalSurface } from "./tauritavern_host.js";

declare global {
  interface Window {
    TavernHelper?: TavernHelperSurface & {
      getTavernHelperVersion(): string;
    };
    SillyTavern?: {
      getContext(): SillyTavernContextSurface;
    };
    __TAURITAVERN__?: TauriTavernGlobalSurface;
    __TAURITAVERN_MAIN_READY__?: Promise<void>;
  }
}

export {};
