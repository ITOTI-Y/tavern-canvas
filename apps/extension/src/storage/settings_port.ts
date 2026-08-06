/**
 * Injection seams for the SillyTavern host settings surface.
 *
 * `packages/*` must never import SillyTavern globals directly. This module
 * defines the minimal shape the extension host must provide so the settings
 * adapter can be constructed and unit tested without a real host runtime.
 */

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
