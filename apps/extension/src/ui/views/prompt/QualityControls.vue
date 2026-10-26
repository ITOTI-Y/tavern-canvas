<script setup lang="ts">
import { useI18n } from "vue-i18n";

import AppSwitch from "../../components/AppSwitch.vue";
import styles from "./prompt.module.css";

/** These toggles are local state: `PromptPresetDraft` has no field for them, so they are not saved with the preset. */
const props = defineProps<{
  readonly ucpEnabled: boolean;
  readonly aqtEnabled: boolean;
}>();

const emit = defineEmits<{
  "update:ucpEnabled": [value: boolean];
  "update:aqtEnabled": [value: boolean];
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="styles.quality_controls" data-testid="quality-controls">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.quality_controls.title") }}</span>
    </div>
    <div :class="styles.switch_list">
      <AppSwitch
        :model-value="props.ucpEnabled"
        :label="t('prompt.quality_controls.ucp_label')"
        :description="t('prompt.quality_controls.ucp_description')"
        data-testid="ucp-switch"
        @update:model-value="(value) => emit('update:ucpEnabled', value)"
      />
      <AppSwitch
        :model-value="props.aqtEnabled"
        :label="t('prompt.quality_controls.aqt_label')"
        :description="t('prompt.quality_controls.aqt_description')"
        data-testid="aqt-switch"
        @update:model-value="(value) => emit('update:aqtEnabled', value)"
      />
    </div>
  </div>
</template>
