import {
  derive_gateway_credential_reference,
  type TavernCanvasSettings,
} from "@tavern-canvas/contracts";
import type { StorageDatabase } from "@tavern-canvas/storage";

import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import type { SillyTavernSettings } from "../../storage/sillytavern_settings.js";
import type {
  BrowserSecretVaultPort,
  BrowserSecretVaultStatus,
} from "../../storage/browser_secret_vault.js";
import { acknowledge_http_origin } from "../../transport/http_acknowledgment.js";
import type {
  SettingsCapability,
  SettingsDomainEvent,
  SettingsSnapshot,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";
import { VocabularyImportError } from "./_vocabulary_import_error.js";

interface ActiveVocabularyImport {
  cancel(): void;
}

interface RunningVocabularyImport extends ActiveVocabularyImport {
  readonly completed: Promise<void>;
}

export interface SettingsCapabilityDeps {
  readonly settings: SillyTavernSettings;
  readonly database: StorageDatabase | null;
  readonly extension_version: string;
  readonly secrets: SecretDestinationPort | null;
  readonly browser_secret_vault: BrowserSecretVaultPort | null;
}

const SECRET_DESTINATION_UNAVAILABLE = "The selected credential storage backend is unavailable";

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
  let active_import: ActiveVocabularyImport | null = null;

  async function snapshot(): Promise<SettingsSnapshot> {
    const settings = deps.settings.get_settings();
    let browser_secret_vault: BrowserSecretVaultStatus;
    if (deps.browser_secret_vault === null) {
      browser_secret_vault = { state: "unavailable", secret_count: 0 };
    } else if (settings.credential_storage_mode !== "browser_encrypted") {
      browser_secret_vault = { state: "uninitialized", secret_count: 0 };
    } else {
      browser_secret_vault = await deps.browser_secret_vault
        .status()
        .catch((): BrowserSecretVaultStatus => ({ state: "error", secret_count: 0 }));
    }
    return {
      settings,
      vocabulary_update_channel: settings.vocabulary_update_channel,
      browser_secret_vault,
    };
  }

  function apply(partial: Partial<TavernCanvasSettings>): TavernCanvasSettings {
    const settings = deps.settings.update_settings(partial);
    events.emit({ type: "settings_changed", settings });
    return settings;
  }

  return {
    load: snapshot,
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
    /** The plaintext token goes straight to the credential backend; settings keep only the reference, and no read path exists. */
    async set_gateway_token(plaintext_value) {
      if (plaintext_value.trim().length === 0) {
        throw new TypeError("A Gateway token must not be blank");
      }
      if (deps.secrets === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      const current = deps.settings.get_settings();
      const reference = derive_gateway_credential_reference(current.active_namespace);
      await deps.secrets.write_secret(reference, plaintext_value);
      apply({ gateway: { ...current.gateway, token_secret_id: reference } });
      return deps.settings.flush();
    },
    async clear_gateway_token() {
      const current = deps.settings.get_settings();
      const reference = current.gateway.token_secret_id;
      if (reference !== null) {
        await deps.secrets?.delete_secret?.(reference);
      }
      apply({ gateway: { ...current.gateway, token_secret_id: null } });
      return deps.settings.flush();
    },
    async initialize_browser_secret_vault(passphrase) {
      if (deps.browser_secret_vault === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      return deps.browser_secret_vault.initialize(passphrase);
    },
    async unlock_browser_secret_vault(passphrase) {
      if (deps.browser_secret_vault === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      return deps.browser_secret_vault.unlock(passphrase);
    },
    async lock_browser_secret_vault() {
      if (deps.browser_secret_vault === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      return deps.browser_secret_vault.lock();
    },
    async reset_browser_secret_vault() {
      if (deps.browser_secret_vault === null) {
        throw capability_unavailable_error(SECRET_DESTINATION_UNAVAILABLE);
      }
      return deps.browser_secret_vault.reset();
    },
    set_vocabulary_update_channel(channel) {
      apply({ vocabulary_update_channel: channel });
      return deps.settings.flush();
    },
    async import_vocabulary_package(file, on_progress) {
      if (active_import !== null) {
        throw new VocabularyImportError(
          "vocabulary_import_busy",
          "A vocabulary import is already in progress",
        );
      }

      const loading = {
        cancelled: false,
        cancel() {
          loading.cancelled = true;
        },
      };
      let operation: RunningVocabularyImport | null = null;
      active_import = loading;
      try {
        const { start_vocabulary_import } = await import("./vocabulary_import.js");
        operation = start_vocabulary_import(deps.database, file, on_progress);
        active_import = operation;
        if (loading.cancelled) {
          operation.cancel();
        }
        await operation.completed;
      } finally {
        if (active_import === loading || active_import === operation) {
          active_import = null;
        }
      }
    },
    cancel_vocabulary_import() {
      active_import?.cancel();
    },
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
