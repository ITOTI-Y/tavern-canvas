/** `packages/*` must never import SillyTavern globals directly; this is the host settings surface they receive instead. */

export type SaveSettingsFunction = () => void | Promise<void>;

export interface ExtensionSettingsHost {
  tavern_canvas?: unknown;
  [key: string]: unknown;
}

export interface SettingsScheduler {
  schedule(callback: () => void | Promise<void>): void;
}

export interface SillyTavernSettingsHostOptions {
  extension_settings: ExtensionSettingsHost;
  save_settings: SaveSettingsFunction;
  scheduler: SettingsScheduler;
}
