<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppDialog from "../../components/AppDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl, {
  type SegmentedControlOption,
} from "../../components/SegmentedControl.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec, AssetSummaryFieldSpec } from "../assets/asset_field_schema.js";
import AssetCategoryList from "../assets/AssetCategoryList.vue";
import AssetRecordForm from "../assets/AssetRecordForm.vue";
import { replace_values, use_asset_category_panel } from "../assets/use_asset_category_panel.js";
import styles from "./prompt_styles.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const FIELDS = computed<readonly AssetFieldSpec[]>(() => [
  {
    key: "text",
    label: t("prompt_tags.text_label"),
    kind: "textarea",
    required: true,
    hint: t("prompt_tags.text_hint"),
  },
]);

const SUMMARY_FIELDS = computed<readonly AssetSummaryFieldSpec[]>(() => [
  { key: "kind_label", label: t("prompt_tags.kind_label") },
]);

const kind_options = computed<readonly SegmentedControlOption[]>(() => [
  { value: "quality", label: t("prompt_tags.kind_quality") },
  { value: "undesired_content", label: t("prompt_tags.kind_undesired") },
]);

const records_with_kind = computed(() =>
  props.records.map((record) => ({
    ...record,
    payload: {
      ...record.payload,
      kind_label:
        record.payload.kind === "undesired_content"
          ? t("prompt_tags.kind_undesired")
          : t("prompt_tags.kind_quality"),
    },
  })),
);

const panel = use_asset_category_panel(
  "prompt_tag",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  ["kind"],
);

function open_create(): void {
  panel.open_create();
  panel.values.kind = "quality";
}
</script>

<template>
  <section :class="styles.prompt_tag_panel" data-testid="prompt-tag-presets">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt_tags.panel_title") }}</span>
    </div>
    <p :class="styles.prompt_tag_description">{{ t("prompt_tags.panel_description") }}</p>
    <AssetCategoryList
      :records="records_with_kind"
      :summary-fields="SUMMARY_FIELDS"
      :loading="loading"
      :search-label="t('common.actions.search')"
      :search-placeholder="t('common.actions.search')"
      :empty-title="t('prompt_tags.empty_title')"
      :empty-description="t('prompt_tags.empty_description')"
      :add-label="t('prompt_tags.add_action')"
      :random-label="t('assets.random_selection_action')"
      :reorder-hint="t('assets.reorder_hint')"
      :edit-label="t('common.actions.edit')"
      :delete-confirm-description="t('assets.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      @add="open_create"
      @edit="panel.open_edit"
      @delete-many="(ids) => void panel.remove_many(ids)"
      @reorder="panel.reorder"
      @random-select="panel.random_select"
    />

    <AppDialog
      :open="panel.dialog_open.value"
      :title="panel.editing_record.value ? t('common.actions.edit') : t('prompt_tags.add_action')"
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
          <FieldGroup :label="t('prompt_tags.kind_label')">
            <template #default>
              <SegmentedControl
                :model-value="
                  panel.values.kind === 'undesired_content' ? 'undesired_content' : 'quality'
                "
                :options="kind_options"
                :label="t('prompt_tags.kind_label')"
                @update:model-value="(kind) => (panel.values.kind = kind)"
              />
            </template>
          </FieldGroup>
        </template>
      </AssetRecordForm>
    </AppDialog>
  </section>
</template>
