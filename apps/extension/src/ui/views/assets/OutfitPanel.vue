<script setup lang="ts">
import { OUTFIT_SLOTS } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { split_tags } from "../../../modules/wardrobe/wardrobe_library.js";
import AppButton from "../../components/AppButton.vue";
import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import { drop_undefined } from "../../components/_prop_utils.js";
import FieldGroup from "../../components/FieldGroup.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec, AssetSummaryFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList, { type AssetCardView } from "./AssetCategoryList.vue";
import AssetEditorPanel from "./AssetEditorPanel.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import styles from "./assets_styles.js";
import { use_chat_scope } from "./chat_scope.js";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";
import { outfit_slot_label } from "./wardrobe_labels.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly characterRecords: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
  readonly showAllChats: boolean;
}>();

const { t } = useI18n();

const FIELDS = computed<readonly AssetFieldSpec[]>(() =>
  OUTFIT_SLOTS.map((slot) => ({ key: slot, label: outfit_slot_label(t, slot), kind: "tags" })),
);

const SUMMARY_FIELDS = computed<readonly AssetSummaryFieldSpec[]>(() => [
  { key: "owner_label", label: t("assets.outfits.character_label") },
  { key: "scope_label", label: t("assets.scope_label") },
]);

const { visible: scoped } = use_chat_scope(
  () => props.records,
  () => ({
    this_chat: t("assets.chat_scope_label"),
    other_chat: (chat) => t("assets.other_chat_scope_label", { chat }),
  }),
  () => props.showAllChats,
);
/** Each outfit with the name of its character, for the list summary. */
const visible = computed(() =>
  scoped.value.map((record) => {
    const owner = props.characterRecords.find(
      (character) => character.id === record.payload.character_id,
    );
    return owner === undefined
      ? record
      : { ...record, payload: { ...record.payload, owner_label: owner.display_name } };
  }),
);
function payload_text(record: AssetRecordSummary, key: string): string {
  const value = record.payload[key];
  return typeof value === "string" ? value : "";
}

function describe_outfit(record: AssetRecordSummary): AssetCardView {
  return {
    subtitle: payload_text(record, "owner_label"),
    detail: payload_text(record, "scope_label"),
    tags: OUTFIT_SLOTS.flatMap((slot) => split_tags(payload_text(record, slot))),
  };
}

const { visible: visible_characters } = use_chat_scope(
  () => props.characterRecords,
  () => ({
    this_chat: t("assets.chat_scope_label"),
    other_chat: (chat) => t("assets.other_chat_scope_label", { chat }),
  }),
);

const panel = use_asset_category_panel(
  "outfit",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  ["character_id", "origin", "chat_id"],
);

const bound_to_chat = computed(
  () => typeof panel.values.chat_id === "string" && panel.values.chat_id !== "",
);

async function import_to_global(): Promise<void> {
  panel.values.chat_id = "";
  await panel.save();
}

const character_options = computed<readonly AppSelectOption[]>(() =>
  visible_characters.value.map((record) => ({ value: record.id, label: record.display_name })),
);

const selected_character_id = computed<string | undefined>(() => {
  const raw = panel.values.character_id;
  return typeof raw === "string" && raw !== "" ? raw : undefined;
});

function set_character_id(character_id: string): void {
  panel.values.character_id = character_id;
}
</script>

<template>
  <div :class="styles.assetsBody" :data-editing="panel.dialog_open.value ? '' : undefined">
    <div :class="styles.assetsMain">
      <AssetCategoryList
        :active-id="panel.dialog_open.value ? panel.record_id.value : null"
        :describe="describe_outfit"
        :records="visible"
        :summary-fields="SUMMARY_FIELDS"
        :loading="loading"
        :search-label="t('common.actions.search')"
        :search-placeholder="t('common.actions.search')"
        :empty-title="t('assets.outfits.empty_title')"
        :empty-description="t('assets.outfits.empty_description')"
        :add-label="t('assets.outfits.add_action')"
        :random-label="t('assets.random_selection_action')"
        :reorder-hint="t('assets.reorder_hint')"
        :edit-label="t('common.actions.edit')"
        :delete-confirm-description="t('assets.delete_confirm_description')"
        :confirm-label="t('confirmations.destructive.default_confirm_action')"
        :cancel-label="t('confirmations.destructive.default_cancel_action')"
        @add="panel.open_create"
        @edit="panel.open_edit"
        @delete-many="(ids) => void panel.remove_many(ids)"
        @reorder="panel.reorder"
        @random-select="panel.random_select"
      />
    </div>

    <AssetEditorPanel
      :open="panel.dialog_open.value"
      :title="
        panel.editing_record.value
          ? panel.editing_record.value.display_name
          : t('assets.outfits.add_action')
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
          <p v-if="bound_to_chat" :class="styles.chat_scope_note">
            {{ t("assets.chat_scope_note") }}
            <AppButton :label="t('assets.import_to_global_action')" @click="import_to_global" />
          </p>
          <FieldGroup :label="t('assets.outfits.character_label')">
            <template #default="{ fieldId, describedBy }">
              <AppSelect
                :id="fieldId"
                :model-value="selected_character_id"
                :options="character_options"
                :placeholder="t('assets.outfits.character_placeholder')"
                v-bind="drop_undefined({ describedBy })"
                @update:model-value="set_character_id"
              />
            </template>
          </FieldGroup>
        </template>
      </AssetRecordForm>
    </AssetEditorPanel>
  </div>
</template>
