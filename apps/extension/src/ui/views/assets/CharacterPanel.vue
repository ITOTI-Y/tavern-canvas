<script setup lang="ts">
import { APPEARANCE_SLOTS, OUTFIT_SLOTS } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import {
  join_tags,
  read_outfit,
  split_tags,
  type CharacterReferenceMode,
} from "../../../modules/wardrobe/wardrobe_library.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import { drop_undefined } from "../../components/_prop_utils.js";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl, {
  type SegmentedControlOption,
} from "../../components/SegmentedControl.vue";
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { AssetFieldSpec, AssetSummaryFieldSpec } from "./asset_field_schema.js";
import AssetCategoryList from "./AssetCategoryList.vue";
import AssetRecordForm from "./AssetRecordForm.vue";
import styles from "./assets.module.css";
import { use_chat_scope } from "./chat_scope.js";
import CharacterReference from "./CharacterReference.vue";
import { replace_values, use_asset_category_panel } from "./use_asset_category_panel.js";
import { appearance_slot_label } from "./wardrobe_labels.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly outfitRecords: readonly AssetRecordSummary[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();
const NO_OUTFIT = "none";

const { visible } = use_chat_scope(
  () => props.records,
  () => t("assets.chat_scope_label"),
);

const FIELDS = computed<readonly AssetFieldSpec[]>(() => [
  {
    key: "aliases",
    label: t("assets.characters.aliases_label"),
    kind: "text",
    hint: t("assets.characters.aliases_hint"),
  },
  ...APPEARANCE_SLOTS.map((slot): AssetFieldSpec => ({
    key: slot,
    label: appearance_slot_label(t, slot),
    kind: "text",
  })),
  {
    key: "excluded_traits",
    label: t("assets.characters.excluded_traits_label"),
    kind: "text",
    hint: t("assets.characters.excluded_traits_hint"),
  },
]);

const SUMMARY_FIELDS = computed<readonly AssetSummaryFieldSpec[]>(() => [
  { key: "scope_label", label: t("assets.scope_label") },
]);

const PRESERVED_KEYS = [
  "subject",
  "default_outfit_id",
  "reference_image",
  "reference_send",
  "reference_mode",
  "origin",
  "locked_fields",
  "chat_id",
  "created_from_message_id",
] as const;

const panel = use_asset_category_panel(
  "character",
  props.controller,
  () => FIELDS.value,
  () => t("errors.validation_required"),
  PRESERVED_KEYS,
);

const subject_options = computed<readonly SegmentedControlOption[]>(() => [
  { value: "girl", label: t("assets.characters.subject_girl") },
  { value: "boy", label: t("assets.characters.subject_boy") },
  { value: "other", label: t("assets.characters.subject_other") },
]);
const subject = computed(() =>
  panel.values.subject === "boy" || panel.values.subject === "other"
    ? panel.values.subject
    : "girl",
);

const outfit_options = computed<readonly AppSelectOption[]>(() => {
  const id = panel.editing_record.value?.id;
  return [
    { value: NO_OUTFIT, label: t("assets.characters.default_outfit_first") },
    ...props.outfitRecords
      .filter((record) => {
        const owner = record.payload.character_id;
        return typeof owner !== "string" || owner === "" || owner === id;
      })
      .map((record) => ({ value: record.id, label: record.display_name })),
  ];
});
const default_outfit = computed(() =>
  typeof panel.values.default_outfit_id === "string" && panel.values.default_outfit_id !== ""
    ? panel.values.default_outfit_id
    : NO_OUTFIT,
);

const bound_to_chat = computed(
  () => typeof panel.values.chat_id === "string" && panel.values.chat_id !== "",
);

const reference_image = computed(() =>
  typeof panel.values.reference_image === "string" && panel.values.reference_image !== ""
    ? panel.values.reference_image
    : null,
);
const reference_mode = computed<CharacterReferenceMode>(() =>
  panel.values.reference_mode === "img2img" || panel.values.reference_mode === "precise"
    ? panel.values.reference_mode
    : "vibe",
);

function set_reference_image(image: string | null): void {
  if (image === null) {
    for (const key of ["reference_image", "reference_send", "reference_mode"]) {
      Reflect.deleteProperty(panel.values, key);
    }
    return;
  }
  panel.values.reference_image = image;
  panel.values.reference_mode = reference_mode.value;
}

const SUBJECT_TAGS = { girl: "1girl", boy: "1boy", other: "" } as const;
/** A clear, full-figure view on a plain background, which reference and vibe transfer use best. */
const REFERENCE_COMPOSITION =
  "solo, full body, standing, looking at viewer, simple background, white background";

/** The default outfit's tags: the chosen one, else the first outfit linked to this character. */
const default_outfit_tags = computed(() => {
  const id = panel.editing_record.value?.id;
  const outfits = props.outfitRecords.map(read_outfit);
  const outfit =
    outfits.find((candidate) => candidate.id === panel.values.default_outfit_id) ??
    outfits.find((candidate) => id !== undefined && candidate.character_id === id);
  return outfit === undefined ? [] : OUTFIT_SLOTS.flatMap((slot) => outfit.slots[slot]);
});

const reference_prompt = computed(() => ({
  positive_prompt: join_tags(
    [
      SUBJECT_TAGS[subject.value],
      REFERENCE_COMPOSITION,
      ...APPEARANCE_SLOTS.flatMap((slot) => split_tags(panel.values[slot])),
      ...default_outfit_tags.value,
    ].filter((tag) => tag !== ""),
  ),
  negative_prompt: join_tags(split_tags(panel.values.excluded_traits)),
}));

/** Appearance slots the user changed are locked, so the wardrobe update never refills them. */
async function save(): Promise<void> {
  const previous = panel.editing_record.value?.payload ?? {};
  const changed = APPEARANCE_SLOTS.filter(
    (slot) =>
      split_tags(panel.values[slot]).join(",") !==
      split_tags(typeof previous[slot] === "string" ? previous[slot] : "").join(","),
  );
  const locked = new Set([...split_tags(panel.values.locked_fields), ...changed]);
  panel.values.locked_fields = [...locked].join(", ");
  panel.values.origin = typeof panel.values.origin === "string" ? panel.values.origin : "user";
  await panel.save();
}

async function import_to_global(): Promise<void> {
  panel.values.chat_id = "";
  await save();
}

const delete_confirm_title = (record_name: string): string =>
  t("assets.delete_confirm_title", { name: record_name });
</script>

<template>
  <div>
    <AssetCategoryList
      :records="visible"
      :summary-fields="SUMMARY_FIELDS"
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
        @save="save"
        @cancel="panel.close_dialog"
      >
        <template #leading-fields>
          <CharacterReference
            :image="reference_image"
            :send="panel.values.reference_send === 1"
            :mode="reference_mode"
            :default-prompt="reference_prompt"
            @update:image="set_reference_image"
            @update:send="(send) => (panel.values.reference_send = send ? 1 : 0)"
            @update:mode="(mode) => (panel.values.reference_mode = mode)"
          />
        </template>
        <template #extra-fields>
          <p v-if="bound_to_chat" :class="styles.chat_scope_note">
            {{ t("assets.chat_scope_note") }}
            <AppButton
              :label="t('assets.import_to_global_action')"
              data-testid="import-to-global"
              @click="import_to_global"
            />
          </p>
          <FieldGroup :label="t('assets.characters.subject_label')">
            <template #default>
              <SegmentedControl
                :model-value="subject"
                :options="subject_options"
                :label="t('assets.characters.subject_label')"
                @update:model-value="(value) => (panel.values.subject = value)"
              />
            </template>
          </FieldGroup>
          <FieldGroup :label="t('assets.characters.default_outfit_label')">
            <template #default="{ fieldId, describedBy }">
              <AppSelect
                :id="fieldId"
                :model-value="default_outfit"
                :options="outfit_options"
                :placeholder="t('assets.characters.default_outfit_label')"
                v-bind="drop_undefined({ describedBy })"
                @update:model-value="
                  (value) => (panel.values.default_outfit_id = value === NO_OUTFIT ? '' : value)
                "
              />
            </template>
          </FieldGroup>
        </template>
      </AssetRecordForm>
    </AppDialog>
  </div>
</template>
