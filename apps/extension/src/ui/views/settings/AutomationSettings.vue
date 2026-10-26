<script setup lang="ts">
import type { TavernCanvasSettings } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import AppSwitch from "../../components/AppSwitch.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

function update(partial: Partial<TavernCanvasSettings>): void {
  void props.controller.update_settings(partial);
}

const global_concurrency = computed(() => props.settings?.global_concurrency);
</script>

<template>
  <div :class="styles.section" data-testid="automation-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.automation") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <AppSwitch
        :model-value="settings?.auto_generation_enabled ?? false"
        :label="t('settings.automation.auto_generation_label')"
        :disabled="!settings"
        @update:model-value="(value) => update({ auto_generation_enabled: value })"
      />
      <div :class="styles.row">
        <span :class="styles.row_label">{{
          t("settings.automation.global_concurrency_label")
        }}</span>
        <NumberStepper
          :model-value="global_concurrency"
          :label="t('settings.automation.global_concurrency_label')"
          :min="1"
          :max="4"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          :disabled="!settings"
          @update:model-value="(value) => update({ global_concurrency: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{
          t("settings.automation.provider_concurrency_label")
        }}</span>
        <NumberStepper
          :model-value="1"
          :label="t('settings.automation.provider_concurrency_label')"
          :min="1"
          :max="4"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          disabled
          data-testid="provider-concurrency-stepper"
        />
      </div>
      <p :class="styles.description">
        {{
          t("errors.capability_blocked", {
            capability: t("settings.automation.provider_concurrency_label"),
          })
        }}
      </p>
    </div>
  </div>
</template>
