<script setup lang="ts">
import type { PromptTagsPort } from "../../contracts/prompt_tags_port.js";
import type {
  AssetRecordSummary,
  ProviderProfileSummary,
} from "../../contracts/ui_capabilities.js";
import {
  NOVELAI_MODEL_PROFILES,
  UuidSchema,
  type ProviderId,
  type Uuid,
} from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import {
  missing_values_with_choices,
  OPTION_TARGETS,
  type ComfyUiInspection,
} from "../../../modules/comfyui/server_inspection.js";
import {
  DEFAULT_TARGETS,
  read_mapped_workflow,
  workflow_value,
  type ComfyUiDefaults,
  type MappedWorkflow,
} from "../../../modules/comfyui/workflow_mapping.js";

import type { StudioController } from "../../controllers/studio_controller.js";
import { DEFAULT_NOVELAI_MODEL_ID } from "../../../modules/novelai/novelai_request_defaults.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import StateSurface from "../../components/StateSurface.vue";
import PromptTagChips from "../../chat/PromptTagChips.vue";
import { normalize_http_origin } from "../../../transport/http_origin.js";
import { workflow_target_label } from "../assets/workflow_target_label.js";
import { PROVIDER_IDS, provider_type_label } from "./provider_labels.js";
import styles from "./settings_styles.js";

const props = defineProps<{
  readonly profiles: readonly ProviderProfileSummary[];
  readonly promptTagPresets: readonly AssetRecordSummary[];
  readonly workflows: readonly AssetRecordSummary[];
  /** The profile generation uses; `null` while none is chosen. */
  readonly activeProfileId: Uuid | null;
  readonly controller: StudioController;
}>();

const active_options = computed(() =>
  props.profiles.map((profile) => ({ value: profile.id, label: profile.display_name })),
);

const active_model = computed<string>({
  get: () =>
    props.profiles.some((profile) => profile.id === props.activeProfileId)
      ? (props.activeProfileId ?? "")
      : "",
  set: (value) => {
    const profile = props.profiles.find((candidate) => candidate.id === value);
    if (profile !== undefined) {
      void props.controller.set_active_provider_profile(profile.id);
    }
  },
});

function prompt_tags_port(profile: ProviderProfileSummary): PromptTagsPort {
  return {
    profile,
    custom_presets: props.promptTagPresets,
    save: (profile_id, selection) => props.controller.save_prompt_tags(profile_id, selection),
  };
}

const { t } = useI18n();

interface DraftForm {
  readonly id: Uuid;
  readonly is_new: boolean;
  provider_id: ProviderId;
  display_name: string;
  model_id: string;
  workflow_id: string;
  base_url: string;
  /** ComfyUI values as entered; an empty one keeps the workflow's value. */
  comfyui: Record<DefaultTarget, string>;
  /** LoRAs loaded with every request; a row without a file is dropped on save. */
  loras: { lora_name: string; strength: string }[];
}

type DefaultTarget = (typeof DEFAULT_TARGETS)[number];
type OptionTarget = (typeof OPTION_TARGETS)[number];

function is_option_target(target: DefaultTarget): target is OptionTarget {
  return OPTION_TARGETS.some((candidate) => candidate === target);
}

/** Reka's SelectItem rejects an empty-string value. */
const KEEP_WORKFLOW_VALUE = "keep-workflow-value";

/** A ComfyUI profile's model is whatever its workflow loads; the adapter profile still needs a name. */
const COMFYUI_MODEL_ID = "workflow";

function default_fields(
  defaults: ComfyUiDefaults | null | undefined,
): Record<DefaultTarget, string> {
  return {
    steps: defaults?.steps?.toString() ?? "",
    cfg: defaults?.cfg?.toString() ?? "",
    sampler_name: defaults?.sampler_name ?? "",
    scheduler: defaults?.scheduler ?? "",
    model: defaults?.model ?? "",
    text_encoder: defaults?.text_encoder ?? "",
    vae: defaults?.vae ?? "",
  };
}

function lora_rows(defaults: ComfyUiDefaults | null | undefined): DraftForm["loras"] {
  return (defaults?.loras ?? []).map((lora) => ({
    lora_name: lora.lora_name,
    strength: lora.strength.toString(),
  }));
}

/** `null` when steps, CFG or a LoRA strength is not a number in range. */
function read_defaults(
  fields: Record<DefaultTarget, string>,
  rows: DraftForm["loras"],
): ComfyUiDefaults | null {
  const steps = fields.steps.trim() === "" ? undefined : Number(fields.steps);
  const cfg = fields.cfg.trim() === "" ? undefined : Number(fields.cfg);
  const loras = rows
    .filter((row) => row.lora_name !== "")
    .map((row) => ({ lora_name: row.lora_name, strength: Number(row.strength) }));
  if (
    (steps !== undefined && (!Number.isInteger(steps) || steps < 1 || steps > 200)) ||
    (cfg !== undefined && (!Number.isFinite(cfg) || cfg < 0 || cfg > 100)) ||
    loras.some((lora) => !Number.isFinite(lora.strength) || Math.abs(lora.strength) > 10)
  ) {
    return null;
  }
  const text = (value: string): string | undefined =>
    value.trim() === "" ? undefined : value.trim();
  const sampler_name = text(fields.sampler_name);
  const scheduler = text(fields.scheduler);
  const model = text(fields.model);
  const text_encoder = text(fields.text_encoder);
  const vae = text(fields.vae);
  return {
    ...(steps === undefined ? {} : { steps }),
    ...(cfg === undefined ? {} : { cfg }),
    ...(sampler_name === undefined ? {} : { sampler_name }),
    ...(scheduler === undefined ? {} : { scheduler }),
    ...(model === undefined ? {} : { model }),
    ...(text_encoder === undefined ? {} : { text_encoder }),
    ...(vae === undefined ? {} : { vae }),
    ...(loras.length === 0 ? {} : { loras }),
  };
}

const dialog_open = ref(false);
const draft = ref<DraftForm | null>(null);
const save_pending = ref(false);
const save_error = ref<string | null>(null);

const remove_target = ref<ProviderProfileSummary | null>(null);
const remove_pending = ref(false);
const credential_target = ref<ProviderProfileSummary | null>(null);
const credential_value = ref("");
const credential_pending = ref(false);
const credential_error = ref<string | null>(null);

const test_state = ref<Map<Uuid, { readonly pending: boolean; readonly label: string | null }>>(
  new Map(),
);

const provider_options = PROVIDER_IDS.map((id) => ({
  value: id,
  label: provider_type_label(t, id),
}));

const provider_id_model = computed<string>({
  get: () => draft.value?.provider_id ?? "sd_webui",
  set: (value) => {
    if (draft.value) {
      draft.value.provider_id = value as ProviderId;
      draft.value.workflow_id = "";
      inspection.value = null;
      inspect_error.value = null;
      draft.value.base_url = value === "comfyui" ? DEFAULT_COMFYUI_URL : DEFAULT_SD_WEBUI_URL;
      if (value === "novelai" && !NOVELAI_MODEL_IDS.has(draft.value.model_id)) {
        draft.value.model_id = DEFAULT_NOVELAI_MODEL_ID;
      }
    }
  },
});

const NOVELAI_MODEL_IDS: ReadonlySet<string> = new Set(
  NOVELAI_MODEL_PROFILES.map((profile) => profile.model_id),
);
const novelai_model_options = NOVELAI_MODEL_PROFILES.filter((profile) => profile.selectable).map(
  (profile) => ({ value: profile.model_id, label: profile.display_name }),
);

const DEFAULT_SD_WEBUI_URL = "http://127.0.0.1:7860";
const DEFAULT_COMFYUI_URL = "http://127.0.0.1:8188";

const is_local_draft = computed(
  () => draft.value?.provider_id === "sd_webui" || draft.value?.provider_id === "comfyui",
);

const workflow_options = computed(() =>
  props.workflows.map((workflow) => ({ value: workflow.id, label: workflow.display_name })),
);

/** The chosen workflow, to show which values a default would replace; `null` while none is chosen or its JSON is unreadable. */
const selected_workflow = computed<MappedWorkflow | null>(() => {
  const record = props.workflows.find((workflow) => workflow.id === draft.value?.workflow_id);
  if (record === undefined) {
    return null;
  }
  try {
    return read_mapped_workflow(record.payload);
  } catch {
    return null;
  }
});

const default_targets = computed(() =>
  DEFAULT_TARGETS.filter((target) => selected_workflow.value?.mapping.inputs[target] !== undefined),
);

function workflow_default(target: DefaultTarget): string {
  const value =
    selected_workflow.value === null ? null : workflow_value(selected_workflow.value, target);
  return value === null ? "" : value.toString();
}

/**
 * What the server offers for a target, after the entry that keeps the workflow's own value. A saved
 * value the server no longer lists stays selectable so opening the dialog does not drop it.
 */
function target_options(target: OptionTarget): readonly { value: string; label: string }[] {
  const saved = draft.value?.comfyui[target] ?? "";
  const listed = inspection.value?.options[target] ?? [];
  return [
    {
      value: KEEP_WORKFLOW_VALUE,
      label: t("settings.provider_profiles.comfyui.keep_workflow_value", {
        value: workflow_default(target),
      }),
    },
    ...[...new Set([...(saved === "" ? [] : [saved]), ...listed])].map((value) => ({
      value,
      label: value,
    })),
  ];
}

function set_target(target: OptionTarget, value: string): void {
  if (draft.value) {
    draft.value.comfyui[target] = value === KEEP_WORKFLOW_VALUE ? "" : value;
  }
}

const takes_loras = computed(() => selected_workflow.value?.mapping.lora_model !== undefined);

function lora_options(current: string): readonly { value: string; label: string }[] {
  const listed = inspection.value?.lora_names ?? [];
  return [...new Set([...(current === "" ? [] : [current]), ...listed])].map((value) => ({
    value,
    label: value,
  }));
}

function add_lora(): void {
  draft.value?.loras.push({ lora_name: "", strength: "1" });
}

function remove_lora(index: number): void {
  draft.value?.loras.splice(index, 1);
}

const inspection = ref<ComfyUiInspection | null>(null);
const inspect_pending = ref(false);
const inspect_error = ref<string | null>(null);

/** Fixed LoRAs in the form that the server does not list. */
const missing_loras = computed(() => {
  const listed = inspection.value?.lora_names ?? [];
  return takes_loras.value && listed.length > 0
    ? [
        ...new Set(
          (draft.value?.loras ?? [])
            .map((lora) => lora.lora_name)
            .filter((name) => name !== "" && !listed.includes(name)),
        ),
      ]
    : [];
});

/** The values the server lacks, judged by the models and samplers chosen in the form. */
const missing_values = computed(() => {
  const found = inspection.value;
  if (found === null) {
    return [];
  }
  return selected_workflow.value === null || draft.value === null
    ? found.missing_values
    : missing_values_with_choices(found, selected_workflow.value, draft.value.comfyui);
});

/** Reads the server's choices as soon as an address and a workflow are in the form. */
let inspection_timer: ReturnType<typeof setTimeout> | undefined;
watch(
  () =>
    draft.value?.provider_id === "comfyui"
      ? `${draft.value.base_url}\n${draft.value.workflow_id}`
      : null,
  (key) => {
    clearTimeout(inspection_timer);
    if (key !== null && http_origin(draft.value?.base_url ?? "") !== null) {
      inspection_timer = setTimeout(() => void run_inspection(), 600);
    }
  },
);

async function run_inspection(): Promise<void> {
  const current = draft.value;
  if (!current || inspect_pending.value) {
    return;
  }
  const base_url = http_origin(current.base_url);
  if (base_url === null) {
    inspect_error.value = t("settings.provider_profiles.base_url_invalid");
    return;
  }
  const workflow_id = UuidSchema.safeParse(current.workflow_id);
  inspect_pending.value = true;
  inspect_error.value = null;
  inspection.value = null;
  try {
    inspection.value = await props.controller.inspect_comfyui({
      base_url,
      workflow_id: workflow_id.success ? workflow_id.data : null,
    });
  } catch {
    inspect_error.value = t("settings.provider_profiles.comfyui.unreachable");
  } finally {
    inspect_pending.value = false;
  }
}

function http_origin(value: string): string | null {
  try {
    return normalize_http_origin(value.trim());
  } catch {
    return null;
  }
}

function open_add_dialog(): void {
  draft.value = {
    id: crypto.randomUUID(),
    is_new: true,
    provider_id: "novelai",
    display_name: "",
    model_id: DEFAULT_NOVELAI_MODEL_ID,
    workflow_id: "",
    base_url: DEFAULT_SD_WEBUI_URL,
    comfyui: default_fields(null),
    loras: [],
  };
  save_error.value = null;
  inspection.value = null;
  inspect_error.value = null;
  dialog_open.value = true;
}

function open_edit_dialog(profile: ProviderProfileSummary): void {
  draft.value = {
    id: profile.id,
    is_new: false,
    provider_id: profile.provider_id,
    display_name: profile.display_name,
    model_id: profile.model_id ?? "",
    workflow_id: profile.workflow_id ?? "",
    base_url: profile.base_url ?? "",
    comfyui: default_fields(profile.comfyui_defaults),
    loras: lora_rows(profile.comfyui_defaults),
  };
  save_error.value = null;
  inspection.value = null;
  inspect_error.value = null;
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
  const display_name = current.display_name.trim();
  const model_id = current.provider_id === "comfyui" ? COMFYUI_MODEL_ID : current.model_id.trim();
  const comfyui_defaults = read_defaults(current.comfyui, current.loras);
  if (current.provider_id === "comfyui" && comfyui_defaults === null) {
    save_error.value = t("settings.provider_profiles.comfyui.number_invalid");
    return;
  }
  const workflow_id =
    current.provider_id === "comfyui" ? UuidSchema.safeParse(current.workflow_id.trim()) : null;
  if (
    display_name.length === 0 ||
    model_id.length === 0 ||
    (current.provider_id === "comfyui" && workflow_id?.success !== true)
  ) {
    save_error.value = t("errors.validation_required");
    return;
  }
  const base_url = is_local_draft.value ? http_origin(current.base_url) : null;
  if (is_local_draft.value && base_url === null) {
    save_error.value = t("settings.provider_profiles.base_url_invalid");
    return;
  }
  save_pending.value = true;
  save_error.value = null;
  try {
    await props.controller.save_provider_profile({
      id: current.id,
      provider_id: current.provider_id,
      display_name,
      model_id,
      workflow_id:
        current.provider_id === "comfyui" && workflow_id?.success === true
          ? workflow_id.data
          : null,
      base_url,
      updated_at: new Date().toISOString(),
      ...(current.provider_id === "comfyui" && comfyui_defaults !== null
        ? { comfyui_defaults }
        : {}),
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
function provider_requires_credential(provider_id: ProviderId): boolean {
  return (
    provider_id === "novelai" || provider_id === "openai_image" || provider_id === "google_image"
  );
}

function open_credential_dialog(profile: ProviderProfileSummary): void {
  credential_target.value = profile;
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
    await props.controller.set_provider_profile_credential(target.id, credential_value.value);
    close_credential_dialog();
  } catch {
    credential_error.value = t("settings.credential_storage.unlock_required");
  } finally {
    credential_pending.value = false;
    credential_value.value = "";
  }
}

async function clear_credential(profile: ProviderProfileSummary): Promise<void> {
  try {
    await props.controller.clear_provider_profile_credential(profile.id);
  } catch {
    credential_target.value = profile;
    credential_value.value = "";
    credential_error.value = t("settings.credential_storage.unlock_required");
  }
}

async function run_connection_test(profile: ProviderProfileSummary): Promise<void> {
  test_state.value.set(profile.id, { pending: true, label: null });
  test_state.value = new Map(test_state.value);
  try {
    const result = await props.controller.test_provider_profile_connection(profile.id);
    const label =
      result.status === "success"
        ? `${t("status.success")} · ${t("settings.provider_profiles.connection_test_latency", { ms: result.latency_ms })}`
        : t("settings.provider_profiles.connection_test_failed", { code: result.error.code });
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
      <AppButton
        :label="t('settings.provider_profiles.add_action')"
        :variant="profiles.length === 0 ? 'primary' : 'secondary'"
        @click="open_add_dialog"
      />
    </div>

    <FieldGroup
      v-if="profiles.length > 0"
      :label="t('settings.provider_profiles.active_label')"
      :hint="t('settings.provider_profiles.active_hint')"
    >
      <template #default="{ fieldId }">
        <AppSelect
          :id="fieldId"
          v-model="active_model"
          :options="active_options"
          :placeholder="t('settings.provider_profiles.active_label')"
        />
      </template>
    </FieldGroup>
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
              v-if="provider_requires_credential(profile.provider_id)"
              :class="styles.profile_meta"
            >
              {{
                profile.credential_reference
                  ? t("settings.provider_profiles.credential_set")
                  : t("settings.provider_profiles.credential_unset")
              }}
            </span>
            <span
              v-if="test_state.get(profile.id)?.label"
              :class="styles.profile_meta"
              data-testid="profile-test-result"
            >
              {{ test_state.get(profile.id)?.label }}
            </span>
            <div :class="styles.prompt_tag_row">
              <PromptTagChips :port="prompt_tags_port(profile)" kind="quality" />
              <PromptTagChips :port="prompt_tags_port(profile)" kind="undesired_content" />
            </div>
          </div>
          <div :class="styles.profile_actions">
            <span v-if="profile.id === activeProfileId" :class="styles.badge">{{
              t("settings.provider_profiles.active_badge")
            }}</span>
            <AppButton
              :label="t('settings.provider_profiles.connection_test_action')"
              variant="secondary"
              :pending="test_state.get(profile.id)?.pending === true"
              @click="run_connection_test(profile)"
            />
            <AppButton
              v-if="provider_requires_credential(profile.provider_id)"
              :label="t('settings.provider_profiles.set_credential_action')"
              variant="secondary"
              @click="open_credential_dialog(profile)"
            />
            <AppButton
              v-if="
                provider_requires_credential(profile.provider_id) &&
                profile.credential_reference !== null
              "
              :label="t('settings.provider_profiles.clear_credential_action')"
              variant="secondary"
              @click="clear_credential(profile)"
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
              :class="styles.text_input"
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
          v-if="draft.provider_id === 'novelai'"
          :label="t('settings.provider_profiles.model_label')"
          required
        >
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="draft.model_id"
              :options="novelai_model_options"
              :placeholder="t('settings.provider_profiles.model_label')"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          v-else-if="draft.provider_id !== 'comfyui'"
          :label="t('settings.provider_profiles.model_label')"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.model_id"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="provider-model-input"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          v-if="is_local_draft"
          :label="t('settings.provider_profiles.base_url_label')"
          :hint="
            draft.provider_id === 'comfyui'
              ? t('settings.provider_profiles.base_url_hint_comfyui')
              : t('settings.provider_profiles.base_url_hint_sd_webui')
          "
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.base_url"
              type="url"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="provider-base-url-input"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          v-if="draft.provider_id === 'comfyui'"
          :label="t('settings.provider_profiles.workflow_label')"
          :hint="
            workflow_options.length === 0
              ? t('settings.provider_profiles.comfyui.no_workflows')
              : undefined
          "
          required
        >
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="draft.workflow_id"
              :options="workflow_options"
              :placeholder="t('settings.provider_profiles.workflow_label')"
            />
          </template>
        </FieldGroup>
        <template v-if="draft.provider_id === 'comfyui'">
          <template v-for="target in default_targets" :key="target">
            <FieldGroup v-if="is_option_target(target)" :label="workflow_target_label(t, target)">
              <template #default="{ fieldId }">
                <AppSelect
                  :id="fieldId"
                  :model-value="draft.comfyui[target] || KEEP_WORKFLOW_VALUE"
                  :options="target_options(target)"
                  :placeholder="workflow_target_label(t, target)"
                  @update:model-value="(value) => set_target(target, value)"
                />
              </template>
            </FieldGroup>
            <FieldGroup
              v-else
              :label="workflow_target_label(t, target)"
              :hint="
                t('settings.provider_profiles.comfyui.default_hint', {
                  value: workflow_default(target),
                })
              "
            >
              <template #default="{ fieldId, describedBy }">
                <!-- v-model would hand over a number for type="number"; the draft keeps the text. -->
                <input
                  :id="fieldId"
                  :value="draft.comfyui[target]"
                  type="number"
                  :step="target === 'cfg' ? 'any' : 1"
                  :placeholder="workflow_default(target)"
                  :aria-describedby="describedBy"
                  :class="styles.text_input"
                  :data-testid="`comfyui-default-${target}`"
                  @input="
                    (event) => {
                      if (draft !== null) {
                        draft.comfyui[target] = (event.target as HTMLInputElement).value;
                      }
                    }
                  "
                />
              </template>
            </FieldGroup>
          </template>
          <FieldGroup
            v-if="selected_workflow !== null"
            :label="t('settings.provider_profiles.comfyui.loras_label')"
            :hint="
              takes_loras
                ? t('settings.provider_profiles.comfyui.loras_hint')
                : t('settings.provider_profiles.comfyui.loras_unmapped')
            "
          >
            <template #default>
              <div :class="styles.form_grid" data-testid="comfyui-loras">
                <div
                  v-for="(lora, index) in draft.loras"
                  :key="index"
                  :class="styles.lora_row"
                  data-testid="comfyui-lora-row"
                >
                  <!-- eslint-disable vue/attribute-hyphenation -- ariaLabel must stay camelCase to bind AppSelect's prop -->
                  <AppSelect
                    v-model="lora.lora_name"
                    :options="lora_options(lora.lora_name)"
                    :placeholder="t('settings.provider_profiles.comfyui.lora_placeholder')"
                    :ariaLabel="t('settings.provider_profiles.comfyui.lora_placeholder')"
                  />
                  <!-- eslint-enable vue/attribute-hyphenation -->
                  <input
                    :value="lora.strength"
                    type="number"
                    step="0.05"
                    :aria-label="t('settings.provider_profiles.comfyui.lora_strength_label')"
                    :class="styles.text_input"
                    @input="(event) => (lora.strength = (event.target as HTMLInputElement).value)"
                  />
                  <AppButton
                    :label="t('common.actions.delete')"
                    variant="ghost"
                    @click="remove_lora(index)"
                  />
                </div>
                <div :class="styles.actions_row">
                  <AppButton
                    :label="t('settings.provider_profiles.comfyui.add_lora_action')"
                    variant="secondary"
                    :disabled="!takes_loras"
                    data-testid="comfyui-add-lora"
                    @click="add_lora"
                  />
                </div>
              </div>
            </template>
          </FieldGroup>
          <div :class="styles.actions_row">
            <AppButton
              :label="t('settings.provider_profiles.comfyui.inspect_action')"
              variant="secondary"
              :pending="inspect_pending"
              data-testid="comfyui-inspect"
              @click="run_inspection"
            />
          </div>
          <p
            v-if="inspect_error"
            :class="[styles.status_text, styles.description]"
            data-tone="error"
          >
            {{ inspect_error }}
          </p>
          <div v-if="inspection" data-testid="comfyui-inspection">
            <p :class="[styles.status_text, styles.description]">
              {{
                t("settings.provider_profiles.comfyui.connected", {
                  version: inspection.version ?? "?",
                })
              }}
            </p>
            <p
              v-if="inspection.missing_node_types.length > 0"
              :class="[styles.status_text, styles.description]"
              data-tone="error"
            >
              {{
                t("settings.provider_profiles.comfyui.missing_nodes", {
                  names: inspection.missing_node_types.join(", "),
                })
              }}
            </p>
            <p
              v-for="missing in missing_values"
              :key="`${missing.node_id}:${missing.property}`"
              :class="[styles.status_text, styles.description]"
              data-tone="error"
            >
              {{
                t("settings.provider_profiles.comfyui.missing_value", {
                  node: missing.node_id,
                  class_type: missing.class_type,
                  property: missing.property,
                  value: missing.value,
                })
              }}
            </p>
            <p
              v-for="name in missing_loras"
              :key="`lora:${name}`"
              :class="[styles.status_text, styles.description]"
              data-tone="error"
            >
              {{ t("settings.provider_profiles.comfyui.missing_lora", { value: name }) }}
            </p>
            <p
              v-if="
                draft.workflow_id !== '' &&
                missing_loras.length === 0 &&
                inspection.missing_node_types.length === 0 &&
                missing_values.length === 0
              "
              :class="[styles.status_text, styles.description]"
            >
              {{ t("settings.provider_profiles.comfyui.workflow_ready") }}
            </p>
          </div>
        </template>
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
      :title="
        t('settings.provider_profiles.credential_dialog_title', {
          name: credential_target?.display_name ?? '',
        })
      "
      :description="t('settings.provider_profiles.credential_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_credential_dialog()"
    >
      <div :class="styles.form_grid">
        <FieldGroup
          :label="t('settings.provider_profiles.credential_label')"
          :error="credential_error"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="credential_value"
              type="password"
              autocomplete="new-password"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="provider-credential-input"
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
