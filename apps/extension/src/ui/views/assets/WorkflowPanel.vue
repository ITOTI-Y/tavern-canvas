<script setup lang="ts">
import { ScanSearch, Upload } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import styles from "./assets.module.css";
import { use_asset_category_panel } from "./use_asset_category_panel.js";
import {
  scan_workflow_placeholders,
  WORKFLOW_INPUT_TARGETS,
  type WorkflowInputTarget,
} from "./workflow_placeholders.js";

/**
 * ComfyUI workflow import/placeholder-mapping panel. Bespoke instead of AssetRecordForm: a
 * workflow record's real content is a JSON document plus a placeholder->input mapping, neither of
 * which fits the generic text/textarea/number field schema the other five panels share.
 */
const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t, locale } = useI18n();

const FIELDS: readonly AssetFieldSpec[] = [{ key: "workflow_json", label: "", kind: "textarea" }];

const panel = use_asset_category_panel(
  "workflow",
  props.controller,
  () => FIELDS,
  () => t("errors.validation_required"),
);

const file_input = ref<HTMLInputElement | null>(null);
const placeholder_entries = ref<{ name: string; target: string }[]>([]);

/** Reka's SelectItem rejects an empty-string value (reserved as its own "nothing selected"
 * sentinel), so "not mapped yet" is its own real option value instead of "". */
const UNMAPPED = "unmapped";

/** Explicit branches (not a template literal into the target name) so every translation call site
 * stays a static key the locale checker can verify -- matches VocabularyPanel's progress_label. */
function target_label(target: WorkflowInputTarget): string {
  switch (target) {
    case "positive_prompt":
      return t("assets.workflow.target_positive_prompt");
    case "negative_prompt":
      return t("assets.workflow.target_negative_prompt");
    case "seed":
      return t("assets.workflow.target_seed");
    case "width":
      return t("assets.workflow.target_width");
    case "height":
      return t("assets.workflow.target_height");
    case "steps":
      return t("assets.workflow.target_steps");
  }
}

const target_options = computed<readonly AppSelectOption[]>(() => [
  { value: UNMAPPED, label: t("assets.workflow.placeholder_unmapped") },
  ...WORKFLOW_INPUT_TARGETS.map((target) => ({
    value: target,
    label: target_label(target),
  })),
]);

function workflow_json(): string {
  const raw = panel.values.workflow_json;
  return typeof raw === "string" ? raw : "";
}

function load_placeholder_entries_from_payload(payload: Readonly<Record<string, unknown>>): void {
  const raw = payload.placeholder_map;
  let map: Record<string, string> = {};
  if (typeof raw === "string") {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (parsed !== null && typeof parsed === "object") {
        map = parsed as Record<string, string>;
      }
    } catch {
      map = {};
    }
  }
  placeholder_entries.value = Object.entries(map).map(([name, target]) => ({ name, target }));
}

watch(
  () => panel.editing_record.value,
  (record) => {
    if (record) {
      load_placeholder_entries_from_payload(record.payload);
    } else {
      placeholder_entries.value = [];
    }
  },
  { immediate: true },
);

function scan_placeholders(): void {
  const found = scan_workflow_placeholders(workflow_json());
  const existing = new Map(placeholder_entries.value.map((entry) => [entry.name, entry.target]));
  placeholder_entries.value = found.map((name) => ({ name, target: existing.get(name) ?? "" }));
}

function set_target(name: string, target: string): void {
  const entry = placeholder_entries.value.find((candidate) => candidate.name === name);
  if (entry) {
    entry.target = target === UNMAPPED ? "" : target;
  }
}

function trigger_import(): void {
  file_input.value?.click();
}

/** Built in script, not inline in the template: a literal `{{name}}` written directly inside a
 * `{{ }}` mustache interpolation confuses Vue's template compiler's own delimiter scanning. */
const OPEN_BRACES = "{{";
const CLOSE_BRACES = "}}";
function placeholder_display(name: string): string {
  return `${OPEN_BRACES}${name}${CLOSE_BRACES}`;
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
  panel.values.workflow_json = text;
  placeholder_entries.value = scan_workflow_placeholders(text).map((name) => ({
    name,
    target: "",
  }));
}

async function save_workflow(): Promise<void> {
  const map: Record<string, string> = {};
  for (const entry of placeholder_entries.value) {
    map[entry.name] = entry.target;
  }
  panel.values.placeholder_map = JSON.stringify(map);
  await panel.save();
}

const delete_confirm_title = (record_name: string): string =>
  t("assets.delete_confirm_title", { name: record_name });
</script>

<template>
  <div>
    <div :class="styles.workflowToolbarRow">
      <AppButton
        :label="t('assets.workflow.import_action')"
        :icon="Upload"
        variant="primary"
        @click="trigger_import"
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
      :delete-label="t('common.actions.delete')"
      :delete-confirm-title="delete_confirm_title"
      :delete-confirm-description="t('assets.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :move-up-label="t('assets.move_up_action')"
      :move-down-label="t('assets.move_down_action')"
      :drag-handle-label="t('assets.drag_handle_label')"
      @add="trigger_import"
      @edit="panel.open_edit"
      @delete="panel.remove"
      @reorder="panel.reorder"
      @random-select="panel.random_select"
    />

    <AppDialog
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
              :class="styles.textArea"
              style="min-height: 160px; font-family: ui-monospace, monospace"
              :value="workflow_json()"
              @input="panel.values.workflow_json = ($event.target as HTMLTextAreaElement).value"
            />
          </template>
        </FieldGroup>

        <AppButton
          :label="t('assets.workflow.placeholder_scan_action')"
          :icon="ScanSearch"
          variant="secondary"
          type="button"
          @click="scan_placeholders"
        />

        <div v-if="placeholder_entries.length > 0" :class="styles.placeholderList">
          <div
            v-for="entry in placeholder_entries"
            :key="entry.name"
            :class="styles.placeholderRow"
          >
            <span :class="styles.placeholderKey">{{ placeholder_display(entry.name) }}</span>
            <!-- eslint-disable vue/attribute-hyphenation -- "aria-label" bypasses Vue's
                 kebab-to-camel prop matching (it stays a literal passthrough attribute instead),
                 so AppSelect's `ariaLabel` prop must stay camelCase here to actually bind
                 (confirmed via vue-tsc against the hyphenated form). `:key="locale"`
                 (real-browser-smoke-caught, see GalleryView.vue's identical note): this select
                 always has a real pre-selected value (UNMAPPED by default), and Reka's closed
                 SelectValue does not react to the option list's own labels changing on a locale
                 switch -- only a remount picks up the new-locale label. -->
            <AppSelect
              :key="locale"
              :model-value="entry.target === '' ? UNMAPPED : entry.target"
              :options="target_options"
              :placeholder="t('assets.workflow.placeholder_unmapped')"
              :ariaLabel="entry.name"
              @update:model-value="(value) => set_target(entry.name, value)"
            />
            <!-- eslint-enable vue/attribute-hyphenation -->
          </div>
        </div>

        <div :class="styles.formActions">
          <AppButton
            :label="t('common.actions.cancel')"
            variant="secondary"
            type="button"
            @click="panel.close_dialog"
          />
          <AppButton
            :label="t('common.actions.save')"
            variant="primary"
            type="submit"
            :pending="panel.saving.value"
          />
        </div>
      </form>
    </AppDialog>
  </div>
</template>
