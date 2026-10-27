<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppDialog from "../../components/AppDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl, {
  type SegmentedControlOption,
} from "../../components/SegmentedControl.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec, AssetSummaryFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import styles from "./assets_styles.js";
import { read_reference_image } from "./reference_image.js";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";

const NOVELAI = "novelai";
const GOOGLE = "google";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const provider_options = computed<readonly SegmentedControlOption[]>(() => [
  { value: NOVELAI, label: t("assets.vibe.provider_novelai") },
  { value: GOOGLE, label: t("assets.vibe.provider_google") },
]);

const FIELDS = computed<readonly AssetFieldSpec[]>(() => {
  const base: AssetFieldSpec[] = [
    { key: "notes", label: t("assets.vibe.notes_label"), kind: "textarea" },
  ];
  if (panel.values.provider !== GOOGLE) {
    base.push(
      {
        key: "strength",
        label: t("assets.vibe.strength_label"),
        kind: "number",
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        key: "information_extracted",
        label: t("assets.vibe.information_extracted_label"),
        kind: "number",
        min: 0,
        max: 1,
        step: 0.05,
      },
    );
  }
  return base;
});

const SUMMARY_FIELDS: readonly AssetSummaryFieldSpec[] = [
  { key: "strength", label: t("assets.vibe.strength_label"), numeric: true },
];

const panel = use_asset_category_panel(
  "vibe",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  ["provider", "image"],
);

const image_error = ref<string | null>(null);
const image_url = computed(() =>
  typeof panel.values.image === "string" && panel.values.image !== "" ? panel.values.image : null,
);

async function choose_image(event: Event): Promise<void> {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file === undefined) {
    return;
  }
  image_error.value = null;
  try {
    panel.values.image = await read_reference_image(file);
  } catch {
    image_error.value = t("assets.vibe.image_unreadable");
  }
}

const provider_value = computed<string>(() =>
  typeof panel.values.provider === "string" && panel.values.provider !== ""
    ? panel.values.provider
    : NOVELAI,
);

function set_provider(value: string): void {
  panel.values.provider = value;
}

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
      :empty-title="t('assets.vibe.empty_title')"
      :empty-description="t('assets.vibe.empty_description')"
      :add-label="t('assets.vibe.add_action')"
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
      :title="panel.editing_record.value ? t('common.actions.edit') : t('assets.vibe.add_action')"
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
            :label="t('assets.vibe.image_label')"
            :hint="t('assets.vibe.image_hint')"
            :error="image_error"
          >
            <template #default="{ fieldId, describedBy }">
              <img
                v-if="image_url !== null"
                :src="image_url"
                :alt="t('assets.vibe.image_label')"
                :class="styles.reference_thumbnail"
              />
              <input
                :id="fieldId"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                :aria-describedby="describedBy"
                data-testid="vibe-image-input"
                @change="choose_image"
              />
            </template>
          </FieldGroup>
          <FieldGroup :label="t('assets.vibe.provider_label')">
            <template #default>
              <SegmentedControl
                :model-value="provider_value"
                :options="provider_options"
                :label="t('assets.vibe.provider_label')"
                @update:model-value="set_provider"
              />
            </template>
          </FieldGroup>
        </template>
      </AssetRecordForm>
    </AppDialog>
  </div>
</template>
