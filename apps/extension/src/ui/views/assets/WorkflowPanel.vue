<script setup lang="ts">
import { ScanSearch, Server, Upload } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { ServerWorkflow } from "../../../modules/comfyui/server_workflows.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetEditorPanel from "./AssetEditorPanel.vue";
import styles from "./assets_styles.js";
import { use_asset_category_panel } from "./use_asset_category_panel.js";
import { workflow_target_label } from "./workflow_target_label.js";
import {
  detect_workflow_mapping,
  missing_required,
  NODE_MAP_FIELD,
  parse_workflow,
  read_mapped_workflow,
  target_value_type,
  WORKFLOW_JSON_FIELD,
  WORKFLOW_TARGETS,
  workflow_input_choices,
  workflow_model_input_choices,
  workflow_output_choices,
  WorkflowFormatError,
  type Workflow,
  type WorkflowMapping,
  type WorkflowTarget,
} from "../../../modules/comfyui/workflow_mapping.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t, locale } = useI18n();

const FIELDS: readonly AssetFieldSpec[] = [
  { key: WORKFLOW_JSON_FIELD, label: "", kind: "textarea" },
];

const panel = use_asset_category_panel(
  "workflow",
  props.controller,
  () => FIELDS,
  () => t("errors.validation_required"),
);

const file_input = ref<HTMLInputElement | null>(null);
const EMPTY_MAPPING: WorkflowMapping = { inputs: {}, output_node_ids: [] };
const mapping = ref<WorkflowMapping>(EMPTY_MAPPING);

/** Reka's SelectItem rejects an empty-string value. */
const UNMAPPED = "unmapped";

interface SelectOption {
  readonly value: string;
  readonly label: string;
}
/** Node ids and input names never contain a newline. */
const CHOICE_SEPARATOR = "\n";

function workflow_json(): string {
  const raw = panel.values[WORKFLOW_JSON_FIELD];
  return typeof raw === "string" ? raw : "";
}

const parsed = computed<
  | { readonly workflow: Workflow; readonly error: null }
  | { readonly workflow: null; readonly error: string }
>(() => {
  try {
    return { workflow: parse_workflow(workflow_json()), error: null };
  } catch (error) {
    return {
      workflow: null,
      error:
        error instanceof WorkflowFormatError && error.reason === "not_api_format"
          ? t("assets.workflow.format_not_api")
          : t("assets.workflow.format_not_json"),
    };
  }
});

const input_choices = computed(() =>
  parsed.value.workflow === null ? [] : workflow_input_choices(parsed.value.workflow),
);

function target_options(target: WorkflowTarget): readonly SelectOption[] {
  const type = target_value_type(target);
  return [
    { value: UNMAPPED, label: t("assets.workflow.unmapped") },
    ...input_choices.value
      .filter((choice) => choice.type === type)
      .map((choice) => ({
        value: `${choice.node_id}${CHOICE_SEPARATOR}${choice.property}`,
        label: `${choice.title} · ${choice.property}`,
      })),
  ];
}

const output_options = computed<readonly SelectOption[]>(() => [
  { value: UNMAPPED, label: t("assets.workflow.unmapped") },
  ...(parsed.value.workflow === null ? [] : workflow_output_choices(parsed.value.workflow)).map(
    (choice) => ({ value: choice.node_id, label: choice.title }),
  ),
]);

const lora_model_options = computed<readonly SelectOption[]>(() => [
  { value: UNMAPPED, label: t("assets.workflow.unmapped") },
  ...(parsed.value.workflow === null
    ? []
    : workflow_model_input_choices(parsed.value.workflow)
  ).map((choice) => ({
    value: `${choice.node_id}${CHOICE_SEPARATOR}${choice.property}`,
    label: `${choice.title} · ${choice.property}`,
  })),
]);

const lora_model_value = computed(() => {
  const input = mapping.value.lora_model;
  const value =
    input === undefined ? UNMAPPED : `${input.node_id}${CHOICE_SEPARATOR}${input.property}`;
  return lora_model_options.value.some((option) => option.value === value) ? value : UNMAPPED;
});

function set_lora_model(value: string): void {
  const [node_id, property] = value.split(CHOICE_SEPARATOR);
  const { lora_model: _previous, ...rest } = mapping.value;
  mapping.value =
    value === UNMAPPED || node_id === undefined || property === undefined
      ? rest
      : { ...rest, lora_model: { node_id, property } };
}

function target_value(target: WorkflowTarget): string {
  const input = mapping.value.inputs[target];
  const value =
    input === undefined ? UNMAPPED : `${input.node_id}${CHOICE_SEPARATOR}${input.property}`;
  return target_options(target).some((option) => option.value === value) ? value : UNMAPPED;
}

function set_target(target: WorkflowTarget, value: string): void {
  const inputs = { ...mapping.value.inputs };
  const [node_id, property] = value.split(CHOICE_SEPARATOR);
  if (value === UNMAPPED || node_id === undefined || property === undefined) {
    Reflect.deleteProperty(inputs, target);
  } else {
    inputs[target] = { node_id, property };
  }
  mapping.value = { ...mapping.value, inputs };
}

const output_value = computed(() => {
  const node_id = mapping.value.output_node_ids[0] ?? UNMAPPED;
  return output_options.value.some((option) => option.value === node_id) ? node_id : UNMAPPED;
});

function set_output(value: string): void {
  mapping.value = { ...mapping.value, output_node_ids: value === UNMAPPED ? [] : [value] };
}

const missing_labels = computed(() =>
  missing_required(mapping.value).map((name) => workflow_target_label(t, name)),
);

watch(
  () => panel.editing_record.value,
  (record) => {
    if (!record) {
      mapping.value = EMPTY_MAPPING;
      return;
    }
    try {
      mapping.value = read_mapped_workflow(record.payload).mapping;
    } catch {
      mapping.value = EMPTY_MAPPING;
    }
  },
  { immediate: true },
);

function detect_mapping(): void {
  mapping.value =
    parsed.value.workflow === null ? EMPTY_MAPPING : detect_workflow_mapping(parsed.value.workflow);
}

function trigger_import(): void {
  file_input.value?.click();
}

async function handle_file_selected(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) {
    return;
  }
  const text = await file.text();
  panel.open_create();
  panel.name.value = file.name.replace(/\.json$/iu, "");
  panel.values[WORKFLOW_JSON_FIELD] = text;
  detect_mapping();
}

/* ---------- Workflows saved on the ComfyUI server ---------- */

const server_open = ref(false);
const server_url = ref<string | undefined>(undefined);
const server_workflows = ref<readonly ServerWorkflow[]>([]);
const server_loading = ref(false);
const server_error = ref<string | null>(null);
const server_options = ref<readonly SelectOption[]>([]);

async function load_server_workflows(): Promise<void> {
  server_workflows.value = [];
  server_error.value = null;
  const url = server_url.value;
  if (url === undefined) {
    return;
  }
  server_loading.value = true;
  try {
    server_workflows.value = await props.controller.list_comfyui_workflows(url);
  } catch (error) {
    server_error.value = t("assets.workflow.server_failed", {
      reason: error instanceof Error ? error.message : String(error),
    });
  } finally {
    server_loading.value = false;
  }
}

function open_server(): void {
  server_options.value = props.controller.state.generation.profiles.flatMap((profile) =>
    profile.provider_id === "comfyui" &&
    typeof profile.base_url === "string" &&
    profile.base_url !== ""
      ? [{ value: profile.base_url, label: `${profile.display_name} · ${profile.base_url}` }]
      : [],
  );
  server_url.value = server_options.value[0]?.value;
  server_open.value = true;
  void load_server_workflows();
}

function choose_server(value: string | undefined): void {
  server_url.value = value;
  void load_server_workflows();
}

function server_format_label(format: ServerWorkflow["format"]): string {
  switch (format) {
    case "api":
      return t("assets.workflow.format_api");
    case "editor":
      return t("assets.workflow.format_editor");
    case "unreadable":
      return t("assets.workflow.format_unreadable");
  }
}

async function import_server_workflow(path: string): Promise<void> {
  const url = server_url.value;
  if (url === undefined) {
    return;
  }
  try {
    const text = await props.controller.read_comfyui_workflow(url, path);
    server_open.value = false;
    panel.open_create();
    panel.name.value = (path.split("/").at(-1) ?? path).replace(/\.json$/iu, "");
    panel.values[WORKFLOW_JSON_FIELD] = text;
    detect_mapping();
  } catch (error) {
    server_error.value = t("assets.workflow.server_failed", {
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

async function save_workflow(): Promise<void> {
  if (parsed.value.workflow === null) {
    return;
  }
  panel.values[NODE_MAP_FIELD] = JSON.stringify(mapping.value);
  await panel.save();
}
</script>

<template>
  <div :class="styles.assetsBody" :data-editing="panel.dialog_open.value ? '' : undefined">
    <div :class="styles.assetsMain">
      <div :class="styles.workflowToolbarRow">
        <AppButton
          :label="t('assets.workflow.import_action')"
          :icon="Upload"
          variant="primary"
          @click="trigger_import"
        />
        <AppButton
          :label="t('assets.workflow.server_action')"
          :icon="Server"
          variant="ghost"
          @click="open_server"
        />
        <input
          ref="file_input"
          :class="styles.hiddenFileInput"
          type="file"
          accept="application/json,.json"
          :aria-label="t('assets.workflow.import_action')"
          @change="(event) => void handle_file_selected(event)"
        />
      </div>

      <AssetCategoryList
        :active-id="panel.dialog_open.value ? panel.record_id.value : null"
        :records="records"
        :summary-fields="[]"
        :loading="loading"
        :search-label="t('common.actions.search')"
        :search-placeholder="t('common.actions.search')"
        :empty-title="t('assets.workflow.empty_title')"
        :empty-description="t('assets.workflow.empty_description')"
        :add-label="t('assets.workflow.import_action')"
        :random-label="t('assets.random_selection_action')"
        :reorder-hint="t('assets.reorder_hint')"
        :edit-label="t('assets.workflow.edit_action')"
        :delete-confirm-description="t('assets.delete_confirm_description')"
        :confirm-label="t('confirmations.destructive.default_confirm_action')"
        :cancel-label="t('confirmations.destructive.default_cancel_action')"
        @add="trigger_import"
        @edit="panel.open_edit"
        @delete-many="(ids) => void panel.remove_many(ids)"
        @reorder="panel.reorder"
        @random-select="panel.random_select"
      />
    </div>

    <AssetEditorPanel
      :open="panel.dialog_open.value"
      :title="t('assets.workflow.edit_action')"
      :description="t('assets.form_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="
        (open) => {
          if (!open) panel.close_dialog();
        }
      "
    >
      <form :class="styles.form" @submit.prevent="() => void save_workflow()">
        <FieldGroup :label="t('common.labels.name')" :error="panel.name_error.value" required>
          <template #default="{ fieldId, describedBy, invalid }">
            <input
              :id="fieldId"
              :class="styles.textInput"
              type="text"
              :placeholder="t('common.labels.name')"
              :value="panel.name.value"
              :aria-describedby="describedBy"
              :aria-invalid="invalid"
              @input="panel.name.value = ($event.target as HTMLInputElement).value"
            />
          </template>
        </FieldGroup>

        <FieldGroup :label="t('assets.workflow.json_label')">
          <template #default="{ fieldId }">
            <textarea
              :id="fieldId"
              :class="[styles.textArea, styles.codeTextArea]"
              :value="workflow_json()"
              @input="
                panel.values[WORKFLOW_JSON_FIELD] = ($event.target as HTMLTextAreaElement).value
              "
            />
          </template>
        </FieldGroup>
        <p v-if="parsed.error !== null" :class="styles.formError" role="alert">
          {{ parsed.error }}
        </p>

        <template v-if="parsed.workflow !== null">
          <AppButton
            :label="t('assets.workflow.detect_action')"
            :icon="ScanSearch"
            variant="secondary"
            type="button"
            @click="detect_mapping"
          />
          <p :class="styles.editorDescription">{{ t("assets.workflow.mapping_hint") }}</p>
          <div :class="styles.mappingList">
            <!-- eslint-disable vue/attribute-hyphenation -- ariaLabel must stay camelCase to bind AppSelect's prop -->
            <!-- :key includes the locale: Reka's SelectValue keeps the old-locale label when option labels change. -->
            <div v-for="target in WORKFLOW_TARGETS" :key="target" :class="styles.mappingRow">
              <span :class="styles.mappingKey">
                {{ workflow_target_label(t, target) }}
              </span>
              <AppSelect
                :key="`${locale}:${target}`"
                :model-value="target_value(target)"
                :options="target_options(target)"
                :placeholder="t('assets.workflow.unmapped')"
                :ariaLabel="workflow_target_label(t, target)"
                @update:model-value="(value) => set_target(target, value)"
              />
            </div>
            <div :class="styles.mappingRow">
              <span :class="styles.mappingKey">{{ workflow_target_label(t, "lora_model") }}</span>
              <AppSelect
                :key="`${locale}:lora_model`"
                :model-value="lora_model_value"
                :options="lora_model_options"
                :placeholder="t('assets.workflow.unmapped')"
                :ariaLabel="workflow_target_label(t, 'lora_model')"
                @update:model-value="set_lora_model"
              />
            </div>
            <div :class="styles.mappingRow">
              <span :class="styles.mappingKey">{{ workflow_target_label(t, "output") }}</span>
              <AppSelect
                :key="`${locale}:output`"
                :model-value="output_value"
                :options="output_options"
                :placeholder="t('assets.workflow.unmapped')"
                :ariaLabel="workflow_target_label(t, 'output')"
                @update:model-value="set_output"
              />
            </div>
            <!-- eslint-enable vue/attribute-hyphenation -->
          </div>
          <p v-if="missing_labels.length > 0" :class="styles.formError" role="alert">
            {{ t("assets.workflow.mapping_missing", { names: missing_labels.join(", ") }) }}
          </p>
        </template>

        <div :class="styles.formActions">
          <AppButton
            :label="t('common.actions.cancel')"
            variant="ghost"
            type="button"
            @click="panel.close_dialog"
          />
          <AppButton
            :label="t('common.actions.save')"
            variant="primary"
            type="submit"
            :pending="panel.saving.value"
            :disabled="parsed.workflow === null"
          />
        </div>
      </form>
    </AssetEditorPanel>
  </div>
  <AppDialog
    v-model:open="server_open"
    :title="t('assets.workflow.server_title')"
    :description="t('assets.workflow.server_description')"
    :close-label="t('common.actions.close')"
  >
    <p v-if="server_options.length === 0" :class="styles.workflowHint">
      {{ t("assets.workflow.server_no_profile") }}
    </p>
    <template v-else>
      <AppSelect
        v-if="server_options.length > 1"
        :model-value="server_url"
        :options="server_options"
        :placeholder="t('assets.workflow.server_label')"
        :aria-label="t('assets.workflow.server_label')"
        @update:model-value="choose_server"
      />
      <p v-if="server_loading" :class="styles.workflowHint" role="status">
        {{ t("assets.workflow.server_loading") }}
      </p>
      <p v-else-if="server_error !== null" :class="styles.workflowHint" role="alert">
        {{ server_error }}
      </p>
      <p v-else-if="server_workflows.length === 0" :class="styles.workflowHint">
        {{ t("assets.workflow.server_empty") }}
      </p>
      <ul v-else :class="styles.workflowServerList">
        <li v-for="item in server_workflows" :key="item.path" :class="styles.workflowServerRow">
          <span :class="styles.workflowServerName">{{ item.path }}</span>
          <span :class="styles.workflowHint">{{ server_format_label(item.format) }}</span>
          <AppButton
            :label="t('assets.workflow.server_import')"
            variant="ghost"
            :disabled="item.format === 'unreadable'"
            @click="() => void import_server_workflow(item.path)"
          />
        </li>
      </ul>
    </template>
  </AppDialog>
</template>
