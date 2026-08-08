import {
  derive_gateway_credential_reference,
  type TavernCanvasSettings,
} from "@tavern-canvas/contracts";
import type { StorageDatabase } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
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
  readonly secrets: SecretDestinationPort | null;
}

const SECRET_DESTINATION_UNAVAILABLE =
  "This host exposes no secret vault, so a Gateway token cannot be stored anywhere but the page";

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
    /**
     * The plaintext token goes straight to host secret storage; settings keep only the reference,
     * mirroring how an LLM connection's API key is set. There is no read path back through this
     * capability, so nothing the UI or a support bundle can reach ever holds the value.
     */
    async set_gateway_token(plaintext_value) {
      if (deps.secrets === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      const current = deps.settings.get_settings();
      const reference = derive_gateway_credential_reference(current.active_namespace);
      await deps.secrets.write_secret(reference, plaintext_value);
      apply({ gateway: { ...current.gateway, token_secret_id: reference } });
      return deps.settings.flush();
    },
    /** Drops the reference only: the host vault owns the value and its own removal. */
    clear_gateway_token() {
      const current = deps.settings.get_settings();
      apply({ gateway: { ...current.gateway, token_secret_id: null } });
      return deps.settings.flush();
    },
    set_vocabulary_update_channel(channel) {
      deps.vocabulary_channel.set(channel);
      return Promise.resolve();
    },
    // Both halves of the archive path, including the zip writer they pull in, load only when the
    // user actually exports or imports.
    async export_archive() {
      const { export_archive } = await import("@tavern-canvas/storage/archive");
      return export_archive({
        database: require_database(deps.database),
        namespace: deps.settings.get_settings().active_namespace,
        extension_version: deps.extension_version,
      });
    },
    async import_archive(archive) {
      const { import_archive } = await import("@tavern-canvas/storage/archive");
      await import_archive({ database: require_database(deps.database), archive });
    },
  };
}
