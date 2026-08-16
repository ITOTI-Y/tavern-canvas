<script setup lang="ts">
import type { LlmConnectionProfile, LlmProviderKind, Uuid } from "@tavern-canvas/contracts";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import { LLM_PROVIDER_KINDS, llm_provider_kind_label, llm_route_options } from "./llm_labels.js";
import styles from "./settings.module.css";

/**
 * Text-LLM connection management. The form has no endpoint, header, or credential field: the
 * origin is host-resolved, the route is chosen from the dialect's own catalog, and the credential
 * travels through a separate action to the selected credential backend. Only its reference enters
 * application state. That is why "save" and "set credential" are separate buttons.
 */
const props = defineProps<{
  readonly connections: readonly LlmConnectionProfile[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

interface DraftForm {
  readonly id: Uuid;
  readonly is_new: boolean;
  provider_kind: LlmProviderKind;
  route: string;
  display_name: string;
  model_id: string;
  temperature: number;
  max_output_tokens: number;
  is_default: boolean;
}

const dialog_open = ref(false);
const draft = ref<DraftForm | null>(null);
const save_pending = ref(false);
const name_error = ref<string | null>(null);
const model_error = ref<string | null>(null);
const save_error = ref<string | null>(null);

const remove_target = ref<LlmConnectionProfile | null>(null);
const remove_pending = ref(false);

const credential_target = ref<LlmConnectionProfile | null>(null);
const credential_value = ref("");
const credential_pending = ref(false);
const credential_error = ref<string | null>(null);

/** Row-scoped test feedback, keyed by connection id: one shared CommandState would misattribute
 * one row's outcome to every row (the same reasoning ProviderProfiles.vue records). */
const test_state = ref<Map<Uuid, { readonly pending: boolean; readonly label: string | null }>>(
  new Map(),
);

const kind_options = computed(() =>
  LLM_PROVIDER_KINDS.map((kind) => ({ value: kind, label: llm_provider_kind_label(t, kind) })),
);

const route_options = computed(() =>
  llm_route_options(draft.value?.provider_kind ?? "openai_compatible").map((route) => ({
    value: route,
    label: route,
  })),
);

/** Bridges AppSelect's generic `string` model to the narrower union; every option value comes
 * from `LLM_PROVIDER_KINDS`, so an emitted value is always a valid kind. Switching kind resets
 * the route to that kind's first catalog entry, since routes never cross dialects. */
const provider_kind_model = computed<string>({
  get: () => draft.value?.provider_kind ?? "openai_compatible",
  set: (value) => {
    if (!draft.value) {
      return;
    }
    draft.value.provider_kind = value as LlmProviderKind;
    draft.value.route = llm_route_options(draft.value.provider_kind)[0] ?? "";
  },
});

const route_model = computed<string>({
  get: () => draft.value?.route ?? "",
  set: (value) => {
    if (draft.value) {
      draft.value.route = value;
    }
  },
});

function open_add_dialog(): void {
  draft.value = {
    id: crypto.randomUUID(),
    is_new: true,
    provider_kind: "openai_compatible",
    route: llm_route_options("openai_compatible")[0] ?? "",
    display_name: "",
    model_id: "",
    temperature: 0.7,
    max_output_tokens: 2048,
    is_default: props.connections.length === 0,
  };
  reset_errors();
  dialog_open.value = true;
}

function open_edit_dialog(connection: LlmConnectionProfile): void {
  draft.value = {
    id: connection.id,
    is_new: false,
    provider_kind: connection.provider_kind,
    route: connection.route,
    display_name: connection.display_name,
    model_id: connection.model_id,
    temperature: connection.temperature,
    max_output_tokens: connection.max_output_tokens,
    is_default: connection.is_default,
  };
  reset_errors();
  dialog_open.value = true;
}

function reset_errors(): void {
  name_error.value = null;
  model_error.value = null;
  save_error.value = null;
}

function close_dialog(): void {
  dialog_open.value = false;
  draft.value = null;
  reset_errors();
}

async function submit_draft(): Promise<void> {
  const current = draft.value;
  if (!current || save_pending.value) {
    return;
  }
  reset_errors();
  const display_name = current.display_name.trim();
  const model_id = current.model_id.trim();
  if (display_name.length === 0) {
    name_error.value = t("errors.validation_required");
  }
  if (model_id.length === 0) {
    model_error.value = t("errors.validation_required");
  }
  if (name_error.value || model_error.value) {
    return;
  }

  save_pending.value = true;
  try {
    await props.controller.save_llm_connection({
      id: current.id,
      display_name,
      provider_kind: current.provider_kind,
      route: current.route,
      model_id,
      temperature: current.temperature,
      max_output_tokens: current.max_output_tokens,
      is_default: current.is_default,
    });
    close_dialog();
  } catch {
    save_error.value = t("errors.unexpected");
  } finally {
    save_pending.value = false;
  }
}

function request_remove(connection: LlmConnectionProfile): void {
  remove_target.value = connection;
}

async function confirm_remove(): Promise<void> {
  const target = remove_target.value;
  if (!target || remove_pending.value) {
    return;
  }
  remove_pending.value = true;
  try {
    await props.controller.remove_llm_connection(target.id);
    remove_target.value = null;
  } finally {
    remove_pending.value = false;
  }
}

function open_credential_dialog(connection: LlmConnectionProfile): void {
  credential_target.value = connection;
  credential_value.value = "";
  credential_error.value = null;
}

function close_credential_dialog(): void {
  credential_target.value = null;
  credential_value.value = "";
  credential_error.value = null;
}

async function submit_credential(): Promise<void> {
  const target = credential_target.value;
  if (!target || credential_pending.value) {
    return;
  }
  if (credential_value.value.trim().length === 0) {
    credential_error.value = t("errors.validation_required");
    return;
  }
  credential_pending.value = true;
  credential_error.value = null;
  try {
    await props.controller.set_llm_connection_credential(target.id, credential_value.value);
    close_credential_dialog();
  } catch {
    credential_error.value = t("settings.credential_storage.unlock_required");
  } finally {
    credential_pending.value = false;
    credential_value.value = "";
  }
}

async function clear_credential(connection: LlmConnectionProfile): Promise<void> {
  try {
    await props.controller.clear_llm_connection_credential(connection.id);
  } catch {
    credential_target.value = connection;
    credential_value.value = "";
    credential_error.value = t("settings.credential_storage.unlock_required");
  }
}

async function run_connection_test(connection: LlmConnectionProfile): Promise<void> {
  test_state.value = new Map(test_state.value).set(connection.id, { pending: true, label: null });
  let label: string;
  try {
    const result = await props.controller.test_llm_connection(connection.id);
    label =
      result.status === "success"
        ? `${t("status.success")} · ${t("diagnostics.connection_tests.latency_label", { ms: result.latency_ms })}`
        : t("errors.connection_test_failed", { code: result.code });
  } catch {
    label = t("errors.unexpected");
  }
  test_state.value = new Map(test_state.value).set(connection.id, { pending: false, label });
}
</script>

<template>
  <div :class="styles.section" data-testid="llm-connections">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.llm_connections") }}</h2>
      <AppButton :label="t('settings.llm_connections.add_action')" @click="open_add_dialog" />
    </div>

    <p :class="styles.description">{{ t("settings.llm_connections.section_description") }}</p>

    <StateSurface
      :status="loading ? 'loading' : connections.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('settings.llm_connections.empty_description')"
    >
      <template #action>
        <AppButton :label="t('settings.llm_connections.add_action')" @click="open_add_dialog" />
      </template>
      <div>
        <div
          v-for="connection in connections"
          :key="connection.id"
          :class="styles.profile_row"
          data-testid="llm-connection-row"
        >
          <div :class="styles.profile_identity">
            <span :class="styles.profile_name">{{ connection.display_name }}</span>
            <span :class="styles.profile_meta">
              {{ llm_provider_kind_label(t, connection.provider_kind) }} · {{ connection.model_id }}
            </span>
            <span :class="styles.profile_meta" data-testid="llm-connection-credential-state">
              {{
                connection.credential_reference
                  ? t("settings.llm_connections.credential_set")
                  : t("settings.llm_connections.credential_unset")
              }}
            </span>
            <span
              v-if="test_state.get(connection.id)?.label"
              :class="styles.profile_meta"
              data-testid="llm-connection-test-result"
            >
              {{ test_state.get(connection.id)?.label }}
            </span>
          </div>
          <div :class="styles.profile_actions">
            <span v-if="connection.is_default" :class="styles.badge">{{
              t("settings.llm_connections.default_badge")
            }}</span>
            <AppButton
              :label="t('settings.llm_connections.connection_test_action')"
              variant="secondary"
              :pending="test_state.get(connection.id)?.pending === true"
              @click="run_connection_test(connection)"
            />
            <AppButton
              :label="t('settings.llm_connections.set_credential_action')"
              variant="secondary"
              @click="open_credential_dialog(connection)"
            />
            <AppButton
              v-if="connection.credential_reference"
              :label="t('settings.llm_connections.clear_credential_action')"
              variant="secondary"
              @click="clear_credential(connection)"
            />
            <AppButton
              :label="t('common.actions.edit')"
              variant="secondary"
              @click="open_edit_dialog(connection)"
            />
            <AppButton
              :label="t('common.actions.delete')"
              variant="destructive"
              @click="request_remove(connection)"
            />
          </div>
        </div>
      </div>
    </StateSurface>

    <AppDialog
      :open="dialog_open"
      :title="
        draft?.is_new
          ? t('settings.llm_connections.dialog_add_title')
          : t('settings.llm_connections.dialog_edit_title')
      "
      :description="t('settings.llm_connections.dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_dialog()"
    >
      <div v-if="draft" :class="styles.form_grid">
        <FieldGroup :label="t('common.labels.name')" :error="name_error" required>
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

        <FieldGroup :label="t('settings.llm_connections.provider_kind_label')" required>
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="provider_kind_model"
              :options="kind_options"
              :placeholder="t('settings.llm_connections.provider_kind_label')"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('settings.llm_connections.route_label')"
          :hint="t('settings.llm_connections.route_hint')"
          required
        >
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="route_model"
              :options="route_options"
              :placeholder="t('settings.llm_connections.route_label')"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('settings.llm_connections.model_label')"
          :hint="t('settings.llm_connections.model_hint')"
          :error="model_error"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.model_id"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('settings.llm_connections.temperature_label')"
          :hint="t('settings.llm_connections.temperature_hint')"
        >
          <template #default>
            <NumberStepper
              v-model="draft.temperature"
              :label="t('settings.llm_connections.temperature_label')"
              :increment-label="t('common.actions.increase')"
              :decrement-label="t('common.actions.decrease')"
              :min="0"
              :max="2"
              :step="0.1"
            />
          </template>
        </FieldGroup>

        <FieldGroup :label="t('settings.llm_connections.max_output_tokens_label')">
          <template #default>
            <NumberStepper
              v-model="draft.max_output_tokens"
              :label="t('settings.llm_connections.max_output_tokens_label')"
              :increment-label="t('common.actions.increase')"
              :decrement-label="t('common.actions.decrease')"
              :min="1"
              :max="200000"
              :step="256"
            />
          </template>
        </FieldGroup>

        <AppSwitch
          v-model="draft.is_default"
          :label="t('settings.llm_connections.set_default_action')"
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

    <AppDialog
      :open="credential_target !== null"
      :title="t('settings.llm_connections.credential_dialog_title')"
      :description="t('settings.llm_connections.credential_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_credential_dialog()"
    >
      <div :class="styles.form_grid">
        <FieldGroup
          :label="t('settings.llm_connections.credential_label')"
          :hint="t('provider.credentials.not_stored_locally')"
          :error="credential_error"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="credential_value"
              type="password"
              autocomplete="off"
              :aria-describedby="describedBy"
              :class="styles.typed_confirm_input"
              data-testid="llm-credential-input"
            />
          </template>
        </FieldGroup>
        <div :class="styles.actions_row">
          <AppButton
            :label="t('common.actions.save')"
            :pending="credential_pending"
            @click="submit_credential"
          />
          <AppButton
            :label="t('common.actions.cancel')"
            variant="secondary"
            @click="close_credential_dialog"
          />
        </div>
      </div>
    </AppDialog>

    <ConfirmDialog
      :open="remove_target !== null"
      :title="
        t('settings.llm_connections.remove_confirm_title', {
          name: remove_target?.display_name ?? '',
        })
      "
      :description="t('settings.llm_connections.remove_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="remove_pending"
      @update:open="(open) => !open && (remove_target = null)"
      @confirm="confirm_remove"
    />
  </div>
</template>
