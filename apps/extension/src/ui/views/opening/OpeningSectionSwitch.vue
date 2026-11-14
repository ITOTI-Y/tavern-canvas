<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import SegmentedControl from "../../components/SegmentedControl.vue";
import type { OpeningSection } from "./opening_section.js";
import styles from "./opening_styles.js";

const section = defineModel<OpeningSection>({ required: true });

const { t } = useI18n();

const options = computed(() => [
  { value: "build", label: t("opening.sections.build") },
  { value: "books", label: t("opening.sections.books") },
  { value: "templates", label: t("opening.sections.templates") },
]);

function choose(value: string): void {
  if (value === "build" || value === "books" || value === "templates") {
    section.value = value;
  }
}
</script>

<template>
  <SegmentedControl
    :model-value="section"
    :class="styles.compact"
    :options="options"
    :label="t('opening.sections.label')"
    @update:model-value="choose"
  />
</template>
