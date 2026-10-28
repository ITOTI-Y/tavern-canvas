<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppDialog from "../../components/AppDialog.vue";
import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import { drop_undefined } from "../../components/_prop_utils.js";
import FieldGroup from "../../components/FieldGroup.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec, AssetSummaryFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly characterRecords: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const FIELDS = computed<readonly AssetFieldSpec[]>(() => [
  {
    key: "file_name",
    label: t("assets.lora.file_name_label"),
    kind: "text",
    required: true,
    hint: t("assets.lora.file_name_hint"),
  },
  {
    key: "trigger_words",
    label: t("assets.lora.trigger_words_label"),
    kind: "text",
  },
  {
    key: "weight",
    label: t("assets.lora.weight_label"),
    kind: "number",
    min: 0,
    max: 2,
    step: 0.05,
  },
]);

const SUMMARY_FIELDS: readonly AssetSummaryFieldSpec[] = [
  { key: "file_name", label: t("assets.lora.file_name_label") },
  { key: "weight", label: t("assets.lora.weight_label"), numeric: true },
  { key: "trigger_words", label: t("assets.lora.trigger_words_label") },
];

const panel = use_asset_category_panel(
  "lora",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  ["character_id"],
);

function open_create(): void {
  panel.open_create();
  panel.values.weight = 1;
}

const character_options = computed<readonly AppSelectOption[]>(() =>
  props.characterRecords.map((record) => ({ value: record.id, label: record.display_name })),
);

const selected_character_id = computed<string | undefined>(() => {
  const raw = panel.values.character_id;
  return typeof raw === "string" && raw !== "" ? raw : undefined;
});

const delete_confirm_title = (record_name: string): string =>
  t("assets.delete_confirm_title", { name: record_name });
</script>

<template>
  <div>
    <AssetCategoryList
      :records="records"
      :summary-fields="SUMMARY_FIELDS"
      :loading="loading"
      :search-label="t('common.actions.search')"
      :search-placeholder="t('common.actions.search')"
      :empty-title="t('assets.lora.empty_title')"
      :empty-description="t('assets.lora.empty_description')"
      :add-label="t('assets.lora.add_action')"
      :random-label="t('assets.random_selection_action')"
      :reorder-hint="t('assets.reorder_hint')"
      :edit-label="t('common.actions.edit')"
      :delete-label="t('common.actions.delete')"
      :delete-confirm-title="delete_confirm_title"
      :delete-confirm-description="t('assets.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :move-up-label="t('assets.move_up_action')"
      :move-down-label="t('assets.move_down_action')"
      :drag-handle-label="t('assets.drag_handle_label')"
      @add="open_create"
      @edit="panel.open_edit"
      @delete="panel.remove"
      @delete-many="(ids) => void panel.remove_many(ids)"
      @reorder="panel.reorder"
      @random-select="panel.random_select"
    />

    <AppDialog
      :open="panel.dialog_open.value"
      :title="panel.editing_record.value ? t('common.actions.edit') : t('assets.lora.add_action')"
      :description="t('assets.form_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="
        (open) => {
          if (!open) panel.close_dialog();
        }
      "
    >
      <AssetRecordForm
        :name-label="t('common.labels.name')"
        :name-placeholder="t('common.labels.name')"
        :name="panel.name.value"
        :name-error="panel.name_error.value"
        :save-error="panel.save_error.value"
        :fields="FIELDS"
        :values="panel.values"
        :save-label="t('common.actions.save')"
        :cancel-label="t('common.actions.cancel')"
        :decrement-label="t('common.actions.decrease')"
        :increment-label="t('common.actions.increase')"
        :pending="panel.saving.value"
        @update:name="
          (value) => {
            panel.name.value = value;
          }
        "
        @update:values="(next) => replace_values(panel.values, next)"
        @save="panel.save"
        @cancel="panel.close_dialog"
      >
        <template #extra-fields>
          <FieldGroup
            :label="t('assets.lora.character_label')"
            :hint="t('assets.lora.character_hint')"
          >
            <template #default="{ fieldId, describedBy }">
              <AppSelect
                :id="fieldId"
                :model-value="selected_character_id"
                :options="character_options"
                :placeholder="t('assets.lora.character_placeholder')"
                v-bind="drop_undefined({ describedBy })"
                @update:model-value="(character_id) => (panel.values.character_id = character_id)"
              />
            </template>
          </FieldGroup>
        </template>
      </AssetRecordForm>
    </AppDialog>
  </div>
</template>
