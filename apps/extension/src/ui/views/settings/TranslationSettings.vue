<script setup lang="ts">
import type {
  GlossaryEntry,
  TavernCanvasSettings,
  TranslationSettings,
} from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./settings_styles.js";

const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const MAX_GLOSSARY_ENTRIES = 200;

const translation = computed(() => props.settings?.translation ?? null);

function update_translation(partial: Partial<TranslationSettings>): Promise<void> {
  const current = translation.value;
  return current === null
    ? Promise.resolve()
    : props.controller.update_settings({ translation: { ...current, ...partial } });
}

const endpoint_options = computed(() => [
  { value: "free", label: t("settings.translation.endpoint_free") },
  { value: "pro", label: t("settings.translation.endpoint_pro") },
]);

function set_endpoint(value: string): void {
  if (value === "free" || value === "pro") {
    void update_translation({ deepl_endpoint: value });
  }
}

const key_draft = ref("");
const key_status = ref<"idle" | "saving" | "saved" | "cleared" | "failed">("idle");

async function save_key(): Promise<void> {
  const value = key_draft.value.trim();
  if (value === "") {
    return;
  }
  key_status.value = "saving";
  try {
    await props.controller.set_deepl_key(value);
    key_draft.value = "";
    key_status.value = "saved";
  } catch {
    key_status.value = "failed";
  }
}

async function clear_key(): Promise<void> {
  key_status.value = "saving";
  try {
    await props.controller.clear_deepl_key();
    key_status.value = "cleared";
  } catch {
    key_status.value = "failed";
  }
}

const key_status_text = computed(() => {
  switch (key_status.value) {
    case "saved":
      return t("settings.translation.key_saved");
    case "cleared":
      return t("settings.translation.key_cleared");
    case "failed":
      return t("settings.translation.key_failed");
    default:
      return "";
  }
});

const glossary_draft = ref<{ source: string; target: string }[]>([]);
watch(
  () => translation.value?.glossary,
  (glossary) => {
    glossary_draft.value = (glossary ?? []).map((entry) => ({ ...entry }));
  },
  { immediate: true },
);

function add_entry(): void {
  if (glossary_draft.value.length < MAX_GLOSSARY_ENTRIES) {
    glossary_draft.value.push({ source: "", target: "" });
  }
}

function remove_entry(index: number): void {
  glossary_draft.value.splice(index, 1);
}

/** Rows with an empty side are dropped rather than rejected, so a half-typed row never blocks saving. */
function save_glossary(): void {
  const glossary: GlossaryEntry[] = glossary_draft.value
    .map((entry) => ({ source: entry.source.trim(), target: entry.target.trim() }))
    .filter((entry) => entry.source !== "" && entry.target !== "");
  void update_translation({ glossary });
}
</script>

<template>
  <div :class="styles.section" data-testid="translation-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.nav.translation") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <p :class="styles.description">{{ t("settings.translation.description") }}</p>

      <FieldGroup
        :label="t('settings.translation.key_label')"
        :hint="t('settings.translation.key_hint')"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="key_draft"
            type="password"
            autocomplete="off"
            :aria-describedby="describedBy"
            :class="styles.text_input"
            data-testid="deepl-key-input"
          />
        </template>
      </FieldGroup>
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.translation.key_save')"
          variant="primary"
          :pending="key_status === 'saving'"
          :disabled="key_draft.trim() === ''"
          @click="save_key"
        />
        <AppButton :label="t('settings.translation.key_clear')" @click="clear_key" />
        <span :class="styles.status_text" role="status">{{ key_status_text }}</span>
      </div>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.translation.endpoint_label") }}</span>
        <SegmentedControl
          :model-value="translation?.deepl_endpoint ?? 'free'"
          :options="endpoint_options"
          :label="t('settings.translation.endpoint_label')"
          :disabled="!settings"
          @update:model-value="set_endpoint"
        />
      </div>

      <h3 :class="styles.section_title">{{ t("settings.translation.glossary_title") }}</h3>
      <p :class="styles.description">{{ t("settings.translation.glossary_description") }}</p>
      <div
        v-for="(entry, index) in glossary_draft"
        :key="index"
        :class="styles.actions_row"
        data-testid="glossary-row"
      >
        <input
          v-model="entry.source"
          type="text"
          maxlength="32"
          :aria-label="t('settings.translation.glossary_source')"
          :placeholder="t('settings.translation.glossary_source')"
          :class="styles.text_input"
        />
        <input
          v-model="entry.target"
          type="text"
          maxlength="128"
          :aria-label="t('settings.translation.glossary_target')"
          :placeholder="t('settings.translation.glossary_target')"
          :class="styles.text_input"
        />
        <AppButton
          :label="t('settings.translation.glossary_remove')"
          @click="remove_entry(index)"
        />
      </div>
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.translation.glossary_add')"
          :disabled="glossary_draft.length >= MAX_GLOSSARY_ENTRIES"
          @click="add_entry"
        />
        <AppButton
          :label="t('settings.translation.glossary_save')"
          variant="primary"
          :disabled="!settings"
          @click="save_glossary"
        />
      </div>
    </div>
  </div>
</template>
