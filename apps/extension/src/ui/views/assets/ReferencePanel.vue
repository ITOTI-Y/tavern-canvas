<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppDialog from "../../components/AppDialog.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";

/**
 * Plain reference-image records. AssetsCapability has no byte-upload method (unlike
 * GalleryCapability.read_bytes, which only reads generated images) -- there is no capability
 * surface to persist an uploaded file's bytes as asset payload, so a record here tracks a
 * source reference (URL or a description of where the image lives) rather than image bytes
 * themselves. Ledgered for stage review as a real capability gap, not an oversight.
 */
const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const FIELDS = computed<readonly AssetFieldSpec[]>(() => [
  { key: "source_url", label: t("assets.reference.source_url_label"), kind: "text" },
  { key: "notes", label: t("assets.reference.notes_label"), kind: "textarea" },
]);

const panel = use_asset_category_panel(
  "reference",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
);

const delete_confirm_title = (record_name: string): string =>
  t("assets.delete_confirm_title", { name: record_name });
</script>

<template>
  <div>
    <AssetCategoryList
      :records="records"
      :summary-fields="[]"
      :loading="loading"
      :search-label="t('common.actions.search')"
      :search-placeholder="t('common.actions.search')"
      :empty-title="t('assets.reference.empty_title')"
      :empty-description="t('assets.reference.empty_description')"
      :add-label="t('assets.reference.add_action')"
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
      @add="panel.open_create"
      @edit="panel.open_edit"
      @delete="panel.remove"
      @reorder="panel.reorder"
      @random-select="panel.random_select"
    />

    <AppDialog
      :open="panel.dialog_open.value"
      :title="
        panel.editing_record.value ? t('common.actions.edit') : t('assets.reference.add_action')
      "
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
      />
    </AppDialog>
  </div>
</template>
