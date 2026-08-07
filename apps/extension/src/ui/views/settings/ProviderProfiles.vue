<script setup lang="ts">
import type { ProviderProfileSummary } from "../../contracts/ui_capabilities.js";
import type { ProviderId, Uuid } from "@tavern-canvas/contracts";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import StateSurface from "../../components/StateSurface.vue";
import { PROVIDER_IDS, provider_type_label } from "./provider_labels.js";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly profiles: readonly ProviderProfileSummary[];
  readonly controller: StudioController;
}>();

const { t } = useI18n();

interface DraftForm {
  readonly id: Uuid;
  readonly is_new: boolean;
  provider_id: ProviderId;
  display_name: string;
  secret_reference: string;
  is_default: boolean;
}

const dialog_open = ref(false);
const draft = ref<DraftForm | null>(null);
const save_pending = ref(false);
const save_error = ref<string | null>(null);

const remove_target = ref<ProviderProfileSummary | null>(null);
const remove_pending = ref(false);

/** Row-scoped connection-test feedback, keyed by profile id -- deliberately local component
 * state, not shared StudioState (see studio_controller.ts's "additive command surface" note):
 * each row's pending/result is independent, so a single shared CommandState would misattribute
 * one profile's test outcome to every row. */
const test_state = ref<Map<Uuid, { readonly pending: boolean; readonly label: string | null }>>(
  new Map(),
);

const provider_options = PROVIDER_IDS.map((id) => ({
  value: id,
  label: provider_type_label(t, id),
}));

/** Bridges AppSelect's generic `string` v-model back to the narrower `ProviderId` union: the
 * options list above is built exclusively from `PROVIDER_IDS`, so every value AppSelect can ever
 * emit here is already a valid `ProviderId`. */
const provider_id_model = computed<string>({
  get: () => draft.value?.provider_id ?? "sd_webui",
  set: (value) => {
    if (draft.value) {
      draft.value.provider_id = value as ProviderId;
    }
  },
});

function open_add_dialog(): void {
  draft.value = {
    id: crypto.randomUUID(),
    is_new: true,
    provider_id: "sd_webui",
    display_name: "",
    secret_reference: "",
    is_default: props.profiles.length === 0,
  };
  save_error.value = null;
  dialog_open.value = true;
}

function open_edit_dialog(profile: ProviderProfileSummary): void {
  draft.value = {
    id: profile.id,
    is_new: false,
    provider_id: profile.provider_id,
    display_name: profile.display_name,
    secret_reference: "",
    is_default: profile.is_default,
  };
  save_error.value = null;
  dialog_open.value = true;
}

function close_dialog(): void {
  dialog_open.value = false;
  draft.value = null;
  save_error.value = null;
}

async function submit_draft(): Promise<void> {
  const current = draft.value;
  if (!current || save_pending.value) {
    return;
  }
  save_pending.value = true;
  save_error.value = null;
  try {
    await props.controller.save_provider_profile({
      id: current.id,
      provider_id: current.provider_id,
      display_name: current.display_name,
      is_default: current.is_default,
      updated_at: new Date().toISOString(),
      secret_reference:
        current.secret_reference.trim().length > 0 ? current.secret_reference : null,
    });
    close_dialog();
  } catch {
    save_error.value = t("errors.unexpected");
  } finally {
    save_pending.value = false;
  }
}

function request_remove(profile: ProviderProfileSummary): void {
  remove_target.value = profile;
}

async function confirm_remove(): Promise<void> {
  const target = remove_target.value;
  if (!target || remove_pending.value) {
    return;
  }
  remove_pending.value = true;
  try {
    await props.controller.remove_provider_profile(target.id);
    remove_target.value = null;
  } finally {
    remove_pending.value = false;
  }
}

async function run_connection_test(profile: ProviderProfileSummary): Promise<void> {
  test_state.value.set(profile.id, { pending: true, label: null });
  test_state.value = new Map(test_state.value);
  try {
    const result = await props.controller.test_provider_profile_connection(profile.id);
    const label =
      result.status === "success"
        ? `${t("status.success")} · ${t("diagnostics.connection_tests.latency_label", { ms: result.latency_ms })}`
        : t("errors.connection_test_failed", { code: result.error.code });
    test_state.value.set(profile.id, { pending: false, label });
  } catch {
    test_state.value.set(profile.id, { pending: false, label: t("errors.unexpected") });
  }
  test_state.value = new Map(test_state.value);
}
</script>

<template>
  <div :class="styles.section" data-testid="provider-profiles">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.provider_profiles") }}</h2>
      <AppButton :label="t('settings.provider_profiles.add_action')" @click="open_add_dialog" />
    </div>

    <StateSurface
      :status="profiles.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('settings.provider_profiles.empty_description')"
    >
      <div>
        <div
          v-for="profile in profiles"
          :key="profile.id"
          :class="styles.profile_row"
          data-testid="provider-profile-row"
        >
          <div :class="styles.profile_identity">
            <span :class="styles.profile_name">{{ profile.display_name }}</span>
            <span :class="styles.profile_meta">{{
              provider_type_label(t, profile.provider_id)
            }}</span>
            <span
              v-if="test_state.get(profile.id)?.label"
              :class="styles.profile_meta"
              data-testid="profile-test-result"
            >
              {{ test_state.get(profile.id)?.label }}
            </span>
          </div>
          <div :class="styles.profile_actions">
            <span v-if="profile.is_default" :class="styles.badge">{{
              t("settings.provider_profiles.default_badge")
            }}</span>
            <AppButton
              :label="t('settings.provider_profiles.connection_test_action')"
              variant="secondary"
              :pending="test_state.get(profile.id)?.pending === true"
              @click="run_connection_test(profile)"
            />
            <AppButton
              :label="t('common.actions.edit')"
              variant="secondary"
              @click="open_edit_dialog(profile)"
            />
            <AppButton
              :label="t('common.actions.delete')"
              variant="destructive"
              @click="request_remove(profile)"
            />
          </div>
        </div>
      </div>
    </StateSurface>

    <AppDialog
      :open="dialog_open"
      :title="
        draft?.is_new
          ? t('settings.provider_profiles.dialog_add_title')
          : t('settings.provider_profiles.dialog_edit_title')
      "
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_dialog()"
    >
      <div v-if="draft" :class="styles.form_grid">
        <FieldGroup :label="t('common.labels.name')" required>
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.display_name"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('settings.provider_profiles.provider_label')" required>
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="provider_id_model"
              :options="provider_options"
              :placeholder="t('settings.provider_profiles.provider_label')"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          :label="t('settings.gateway.token_secret_label')"
          :hint="t('provider.credentials.not_stored_locally')"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.secret_reference"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
            />
          </template>
        </FieldGroup>
        <AppSwitch
          v-model="draft.is_default"
          :label="t('settings.provider_profiles.set_default_action')"
        />
        <p v-if="save_error" :class="[styles.status_text, styles.description]" data-tone="error">
          {{ save_error }}
        </p>
        <div :class="styles.actions_row">
          <AppButton
            :label="t('common.actions.save')"
            :pending="save_pending"
            @click="submit_draft"
          />
          <AppButton
            :label="t('common.actions.cancel')"
            variant="secondary"
            @click="close_dialog"
          />
        </div>
      </div>
    </AppDialog>

    <ConfirmDialog
      :open="remove_target !== null"
      :title="
        t('settings.provider_profiles.remove_confirm_title', {
          name: remove_target?.display_name ?? '',
        })
      "
      :description="t('settings.provider_profiles.remove_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="remove_pending"
      @update:open="(open) => !open && (remove_target = null)"
      @confirm="confirm_remove"
    />
  </div>
</template>
