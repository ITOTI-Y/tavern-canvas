<script setup lang="ts">
import type { Wearing } from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import {
  join_tags,
  split_tags,
  type WardrobeCharacter,
  type WardrobeOutfit,
} from "../../modules/wardrobe/wardrobe_library.js";
import AppSelect from "../components/AppSelect.vue";
import styles from "./illustrate_dialog_styles.js";

const props = defineProps<{
  readonly character: WardrobeCharacter;
  readonly wearing: Wearing;
  readonly outfits: readonly WardrobeOutfit[];
}>();

const emit = defineEmits<{
  change: [wearing: Wearing];
}>();

const { t } = useI18n();
const NO_OUTFIT = "none";

const options = computed(() => [
  { value: NO_OUTFIT, label: t("chat.dialog.outfit_none") },
  ...props.outfits
    .filter((outfit) => outfit.character_id === null || outfit.character_id === props.character.id)
    .map((outfit) => ({ value: outfit.id, label: outfit.name })),
]);

const conditions_draft = ref("");
watch(
  () => props.wearing.conditions,
  (conditions) => {
    conditions_draft.value = join_tags(conditions);
  },
  { immediate: true },
);

function choose(value: string): void {
  emit("change", {
    character_id: props.character.id,
    outfit_id: value === NO_OUTFIT ? null : value,
    overrides: {},
    conditions: props.wearing.conditions,
  });
}

function save_conditions(): void {
  const conditions = split_tags(conditions_draft.value);
  if (join_tags(conditions) !== join_tags(props.wearing.conditions)) {
    emit("change", { ...props.wearing, conditions: [...conditions] });
  }
}
</script>

<template>
  <div :class="styles.outfit" data-testid="outfit-picker">
    <AppSelect
      :model-value="wearing.outfit_id ?? NO_OUTFIT"
      :options="options"
      :placeholder="t('chat.dialog.outfit_label')"
      :aria-label="t('chat.dialog.outfit_label', { name: character.name })"
      @update:model-value="choose"
    />
    <input
      v-model="conditions_draft"
      type="text"
      :class="styles.conditions"
      :placeholder="t('chat.dialog.outfit_conditions')"
      :aria-label="t('chat.dialog.outfit_conditions')"
      @blur="save_conditions"
    />
  </div>
</template>
