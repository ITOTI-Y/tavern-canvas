<script setup lang="ts">
import type { TavernCanvasSettings, TavernCanvasUiSettings } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import AppSwitch from "../../components/AppSwitch.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const EMPTY_UI: TavernCanvasUiSettings = {
  color_mode: "system",
  inspector_width: 320,
  inspector_collapsed: false,
  optional_entry_enabled: false,
};

function update_ui(partial: Partial<TavernCanvasUiSettings>): void {
  void props.controller.update_settings({
    ui: { ...(props.settings?.ui ?? EMPTY_UI), ...partial },
  });
}

const theme_options = computed(() => [
  { value: "system", label: t("settings.appearance.theme_system") },
  { value: "light", label: t("settings.appearance.theme_light") },
  { value: "dark", label: t("settings.appearance.theme_dark") },
]);

const language_options = computed(() => [
  { value: "auto", label: t("settings.appearance.language_auto") },
  { value: "zh-CN", label: t("settings.appearance.language_zh_cn") },
  { value: "en", label: t("settings.appearance.language_en") },
]);

function set_theme(value: string): void {
  if (value === "system" || value === "light" || value === "dark") {
    update_ui({ color_mode: value });
  }
}

function set_language(value: string): void {
  if (value === "auto" || value === "zh-CN" || value === "en") {
    void props.controller.update_settings({ locale: value });
  }
}

function set_inspector_width(value: number): void {
  props.controller.set_inspector_width(value);
  update_ui({ inspector_width: value });
}
</script>

<template>
  <div :class="styles.section" data-testid="appearance-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.appearance") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.appearance.theme_label") }}</span>
        <SegmentedControl
          :model-value="settings?.ui.color_mode ?? 'system'"
          :options="theme_options"
          :label="t('settings.appearance.theme_label')"
          @update:model-value="set_theme"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.appearance.language_label") }}</span>
        <SegmentedControl
          :model-value="settings?.locale ?? 'auto'"
          :options="language_options"
          :label="t('settings.appearance.language_label')"
          @update:model-value="set_language"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.appearance.inspector_width_label") }}</span>
        <NumberStepper
          :model-value="settings?.ui.inspector_width ?? 320"
          :label="t('settings.appearance.inspector_width_label')"
          :min="240"
          :max="720"
          :step="8"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="set_inspector_width"
        />
      </div>
      <AppSwitch
        :model-value="settings?.ui.optional_entry_enabled ?? false"
        :label="t('settings.appearance.optional_entry_label')"
        :disabled="!settings"
        @update:model-value="(value) => update_ui({ optional_entry_enabled: value })"
      />
    </div>
  </div>
</template>
