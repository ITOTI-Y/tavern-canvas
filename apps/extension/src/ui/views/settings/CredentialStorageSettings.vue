<script setup lang="ts">
import type { CredentialStorageMode, TavernCanvasSettings } from "@tavern-canvas/contracts";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import {
  BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH,
  type BrowserSecretVaultStatus,
} from "../../../storage/browser_secret_vault.js";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly vaultStatus: BrowserSecretVaultStatus;
  readonly controller: StudioController;
}>();

const { t } = useI18n();
const passphrase = ref("");
const confirmation = ref("");
const pending = ref(false);
const error = ref<string | null>(null);
const reset_open = ref(false);

const mode_options = computed(() => [
  { value: "host", label: t("settings.credential_storage.modes.host") },
  {
    value: "browser_encrypted",
    label: t("settings.credential_storage.modes.browser_encrypted"),
  },
]);

const mode = computed<string>({
  get: () => props.settings?.credential_storage_mode ?? "host",
  set: (value) => {
    error.value = null;
    void props.controller
      .update_settings({ credential_storage_mode: value as CredentialStorageMode })
      .catch(() => {
        error.value = t("errors.unexpected");
      });
  },
});

const status_label = computed(() => {
  const count = { count: props.vaultStatus.secret_count };
  switch (props.vaultStatus.state) {
    case "unavailable":
      return t("settings.credential_storage.states.unavailable", count);
    case "error":
      return t("settings.credential_storage.states.error", count);
    case "uninitialized":
      return t("settings.credential_storage.states.uninitialized", count);
    case "locked":
      return t("settings.credential_storage.states.locked", count);
    case "unlocked":
      return t("settings.credential_storage.states.unlocked", count);
  }
});

const vault_failure_message = computed(() =>
  props.vaultStatus.state === "error"
    ? t("settings.credential_storage.error")
    : t("settings.credential_storage.unavailable"),
);

function clear_inputs(): void {
  passphrase.value = "";
  confirmation.value = "";
}

function validate_passphrase(require_confirmation: boolean): boolean {
  if (passphrase.value.length < BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH) {
    error.value = t("settings.credential_storage.passphrase_too_short", {
      count: BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH,
    });
    return false;
  }
  if (require_confirmation && passphrase.value !== confirmation.value) {
    error.value = t("settings.credential_storage.passphrase_mismatch");
    return false;
  }
  return true;
}

function vault_error_message(reason: unknown): string {
  if (
    typeof reason === "object" &&
    reason !== null &&
    "code" in reason &&
    Reflect.get(reason, "code") === "invalid_passphrase"
  ) {
    return t("settings.credential_storage.invalid_passphrase");
  }
  return t("errors.unexpected");
}

async function initialize_vault(): Promise<void> {
  if (pending.value || !validate_passphrase(true)) {
    return;
  }
  pending.value = true;
  error.value = null;
  try {
    await props.controller.initialize_browser_secret_vault(passphrase.value);
    await props.controller.update_settings({ credential_storage_mode: "browser_encrypted" });
    clear_inputs();
  } catch (reason) {
    error.value = vault_error_message(reason);
  } finally {
    pending.value = false;
  }
}

async function unlock_vault(): Promise<void> {
  if (pending.value || !validate_passphrase(false)) {
    return;
  }
  pending.value = true;
  error.value = null;
  try {
    await props.controller.unlock_browser_secret_vault(passphrase.value);
    clear_inputs();
  } catch (reason) {
    error.value = vault_error_message(reason);
  } finally {
    pending.value = false;
  }
}

async function lock_vault(): Promise<void> {
  if (pending.value) {
    return;
  }
  pending.value = true;
  error.value = null;
  try {
    await props.controller.lock_browser_secret_vault();
    clear_inputs();
  } catch {
    error.value = t("errors.unexpected");
  } finally {
    pending.value = false;
  }
}

async function reset_vault(): Promise<void> {
  if (pending.value) {
    return;
  }
  pending.value = true;
  error.value = null;
  try {
    await props.controller.reset_browser_secret_vault();
    reset_open.value = false;
    clear_inputs();
  } catch {
    error.value = t("errors.unexpected");
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div :class="styles.section" data-testid="credential-storage-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.credential_storage") }}</h2>
      <span
        v-if="mode === 'browser_encrypted'"
        :class="styles.status_text"
        :data-tone="vaultStatus.state === 'unlocked' ? 'success' : undefined"
      >
        {{ status_label }}
      </span>
    </div>

    <div :class="styles.vault_mode_row">
      <div :class="styles.profile_identity">
        <span :class="styles.profile_name">{{ t("settings.credential_storage.mode_label") }}</span>
        <span :class="styles.profile_meta">{{ t("settings.credential_storage.mode_hint") }}</span>
      </div>
      <SegmentedControl
        v-model="mode"
        :options="mode_options"
        :label="t('settings.credential_storage.mode_label')"
        :disabled="settings === null"
      />
    </div>

    <div v-if="mode === 'browser_encrypted'" :class="styles.vault_controls">
      <p
        v-if="vaultStatus.state === 'unavailable' || vaultStatus.state === 'error'"
        :class="styles.status_text"
        data-tone="error"
        role="alert"
      >
        {{ vault_failure_message }}
      </p>

      <template v-else-if="vaultStatus.state === 'uninitialized'">
        <FieldGroup
          :label="t('settings.credential_storage.passphrase_label')"
          :hint="
            t('settings.credential_storage.passphrase_hint', {
              count: BROWSER_SECRET_MINIMUM_PASSPHRASE_LENGTH,
            })
          "
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="passphrase"
              type="password"
              autocomplete="new-password"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
              data-testid="browser-vault-passphrase"
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('settings.credential_storage.confirm_passphrase_label')" required>
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="confirmation"
              type="password"
              autocomplete="new-password"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
              data-testid="browser-vault-passphrase-confirmation"
            />
          </template>
        </FieldGroup>
        <AppButton
          :label="t('settings.credential_storage.initialize_action')"
          :pending="pending"
          @click="initialize_vault"
        />
      </template>

      <template v-else-if="vaultStatus.state === 'locked'">
        <FieldGroup
          :label="t('settings.credential_storage.passphrase_label')"
          :hint="t('settings.credential_storage.unlock_hint')"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="passphrase"
              type="password"
              autocomplete="current-password"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
              data-testid="browser-vault-passphrase"
              @keydown.enter="unlock_vault"
            />
          </template>
        </FieldGroup>
        <AppButton
          :label="t('settings.credential_storage.unlock_action')"
          :pending="pending"
          @click="unlock_vault"
        />
      </template>

      <div v-else :class="styles.vault_unlocked_actions">
        <AppButton
          :label="t('settings.credential_storage.lock_action')"
          variant="secondary"
          :pending="pending"
          @click="lock_vault"
        />
        <AppButton
          :label="t('settings.credential_storage.reset_action')"
          variant="destructive"
          @click="reset_open = true"
        />
      </div>

      <p v-if="error" :class="styles.status_text" data-tone="error" role="alert">
        {{ error }}
      </p>
    </div>

    <ConfirmDialog
      :open="reset_open"
      :title="t('settings.credential_storage.reset_confirm_title')"
      :description="t('settings.credential_storage.reset_confirm_description')"
      :confirm-label="t('settings.credential_storage.reset_action')"
      :cancel-label="t('common.actions.cancel')"
      :pending="pending"
      @update:open="reset_open = $event"
      @confirm="reset_vault"
    />
  </div>
</template>
