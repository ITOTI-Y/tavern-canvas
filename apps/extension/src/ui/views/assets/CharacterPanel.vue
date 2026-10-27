<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppDialog from "../../components/AppDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl, {
  type SegmentedControlOption,
} from "../../components/SegmentedControl.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import styles from "./assets.module.css";
import { read_reference_image } from "./reference_image.js";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const FIELDS = computed<readonly AssetFieldSpec[]>(() => [
  { key: "role_label", label: t("assets.characters.role_label"), kind: "text" },
  { key: "appearance", label: t("assets.characters.appearance_label"), kind: "textarea" },
  {
    key: "excluded_traits",
    label: t("assets.characters.excluded_traits_label"),
    kind: "text",
    hint: t("assets.characters.excluded_traits_hint"),
  },
  { key: "context_notes", label: t("assets.characters.context_notes_label"), kind: "textarea" },
]);

const REFERENCE_KEYS = ["reference_image", "reference_send", "reference_mode"] as const;

const panel = use_asset_category_panel(
  "character",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  REFERENCE_KEYS,
);

const reference_mode_options = computed<readonly SegmentedControlOption[]>(() => [
  { value: "vibe", label: t("assets.characters.reference_mode_vibe") },
  { value: "img2img", label: t("assets.characters.reference_mode_img2img") },
  { value: "precise", label: t("assets.characters.reference_mode_precise") },
]);

const image_error = ref<string | null>(null);
const reference_image = computed(() =>
  typeof panel.values.reference_image === "string" && panel.values.reference_image !== ""
    ? panel.values.reference_image
    : null,
);
const reference_mode = computed(() =>
  typeof panel.values.reference_mode === "string" ? panel.values.reference_mode : "vibe",
);

async function choose_reference_image(event: Event): Promise<void> {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file === undefined) {
    return;
  }
  image_error.value = null;
  try {
    panel.values.reference_image = await read_reference_image(file);
    panel.values.reference_mode = reference_mode.value;
  } catch {
    image_error.value = t("assets.characters.reference_image_unreadable");
  }
}

function remove_reference_image(): void {
  for (const key of REFERENCE_KEYS) {
    Reflect.deleteProperty(panel.values, key);
  }
}

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
      :empty-title="t('assets.characters.empty_title')"
      :empty-description="t('assets.characters.empty_description')"
      :add-label="t('assets.characters.add_action')"
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
        panel.editing_record.value ? t('common.actions.edit') : t('assets.characters.add_action')
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
            :label="t('assets.characters.reference_image_label')"
            :hint="t('assets.characters.reference_image_hint')"
            :error="image_error"
          >
            <template #default="{ fieldId, describedBy }">
              <img
                v-if="reference_image !== null"
                :src="reference_image"
                :alt="t('assets.characters.reference_image_label')"
                :class="styles.reference_thumbnail"
              />
              <input
                :id="fieldId"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                :aria-describedby="describedBy"
                data-testid="character-reference-input"
                @change="choose_reference_image"
              />
              <AppButton
                v-if="reference_image !== null"
                :label="t('assets.characters.reference_image_remove')"
                @click="remove_reference_image"
              />
            </template>
          </FieldGroup>
          <template v-if="reference_image !== null">
            <AppCheckbox
              :model-value="panel.values.reference_send === 1"
              :label="t('assets.characters.reference_send_label')"
              @update:model-value="(send) => (panel.values.reference_send = send ? 1 : 0)"
            />
            <FieldGroup
              :label="t('assets.characters.reference_mode_label')"
              :hint="t('assets.characters.reference_mode_hint')"
            >
              <template #default>
                <SegmentedControl
                  :model-value="reference_mode"
                  :options="reference_mode_options"
                  :label="t('assets.characters.reference_mode_label')"
                  @update:model-value="(mode) => (panel.values.reference_mode = mode)"
                />
              </template>
            </FieldGroup>
          </template>
        </template>
      </AssetRecordForm>
    </AppDialog>
  </div>
</template>
