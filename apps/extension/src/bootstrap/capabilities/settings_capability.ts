import type { TavernCanvasSettings } from "@tavern-canvas/contracts";
import { export_archive, import_archive, type StorageDatabase } from "@tavern-canvas/storage";

import type { SillyTavernSettings } from "../../storage/sillytavern_settings.js";
import { acknowledge_http_origin } from "../../transport/http_acknowledgment.js";
import type {
  SettingsCapability,
  SettingsDomainEvent,
  SettingsSnapshot,
  VocabularyUpdateChannel,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";

/**
 * The vocabulary update channel has no field in `TavernCanvasSettingsSchema` (a strictObject owned
 * by Stage 04), so it lives here as session state shared by reference with the vocabulary
 * capability, which genuinely reads it when listing and installing packages. It is real behaviour,
 * not a stub -- but it does not survive a reload, which is recorded as a remaining gap rather than
 * papered over by writing it somewhere it does not belong.
 */
export class VocabularyChannelState {
  #channel: VocabularyUpdateChannel = "bundled";

  get(): VocabularyUpdateChannel {
    return this.#channel;
  }

  set(channel: VocabularyUpdateChannel): void {
    this.#channel = channel;
  }
}

export interface SettingsCapabilityDeps {
  readonly settings: SillyTavernSettings;
  readonly database: StorageDatabase | null;
  readonly extension_version: string;
  readonly vocabulary_channel: VocabularyChannelState;
}

function require_database(database: StorageDatabase | null): StorageDatabase {
  if (database === null) {
    throw capability_unavailable_error(
      "Archive import and export need IndexedDB, which is unavailable on this host",
    );
  }
  return database;
}

export function create_settings_capability(deps: SettingsCapabilityDeps): SettingsCapability {
  const events = new DomainEventEmitter<SettingsDomainEvent>();

  function snapshot(): SettingsSnapshot {
    return {
      settings: deps.settings.get_settings(),
      vocabulary_update_channel: deps.vocabulary_channel.get(),
    };
  }

  function apply(partial: Partial<TavernCanvasSettings>): TavernCanvasSettings {
    const settings = deps.settings.update_settings(partial);
    events.emit({ type: "settings_changed", settings });
    return settings;
  }

  return {
    load: () => Promise.resolve(snapshot()),
    subscribe: (handler) => events.subscribe(handler),
    update: (partial) => Promise.resolve(apply(partial)),
    acknowledge_http_origin(origin) {
      const current = deps.settings.get_settings();
      apply({
        gateway: {
          ...current.gateway,
          http_acknowledgments: acknowledge_http_origin(
            current.gateway.http_acknowledgments,
            origin,
            new Date().toISOString(),
          ),
        },
      });
      return deps.settings.flush();
    },
    set_vocabulary_update_channel(channel) {
      deps.vocabulary_channel.set(channel);
      return Promise.resolve();
    },
    export_archive: () =>
      export_archive({
        database: require_database(deps.database),
        namespace: deps.settings.get_settings().active_namespace,
        extension_version: deps.extension_version,
      }),
    async import_archive(archive) {
      await import_archive({ database: require_database(deps.database), archive });
    },
  };
}
