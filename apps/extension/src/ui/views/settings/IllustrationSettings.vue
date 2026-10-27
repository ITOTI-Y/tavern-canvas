<script setup lang="ts">
import type {
  AnalysisConnection,
  IllustrationSettings,
  TavernCanvasSettings,
} from "@tavern-canvas/contracts";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import type { PromptPresetSummary } from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly promptPresets: readonly PromptPresetSummary[];
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const CURRENT_PRESET = "in_use";
const NO_PROMPT_PRESET = "none";

const illustration = computed(() => props.settings?.illustration ?? null);

function update(partial: Partial<TavernCanvasSettings>): void {
  void props.controller.update_settings(partial);
}

function update_illustration(partial: Partial<IllustrationSettings>): void {
  const current = illustration.value;
  if (current !== null) {
    update({ illustration: { ...current, ...partial } });
  }
}

const preset_name_draft = ref("");
const proxy_preset_draft = ref("");
const proxy_model_draft = ref("");
const custom_url_draft = ref("");
const custom_model_draft = ref("");

watch(
  illustration,
  (current) => {
    preset_name_draft.value =
      current === null || current.preset_name === CURRENT_PRESET ? "" : current.preset_name;
    if (current?.connection.kind === "proxy_preset") {
      proxy_preset_draft.value = current.connection.proxy_preset;
      proxy_model_draft.value = current.connection.model ?? "";
    } else if (current?.connection.kind === "custom") {
      custom_url_draft.value = current.connection.api_url;
      custom_model_draft.value = current.connection.model;
    }
  },
  { immediate: true },
);

function save_preset_name(): void {
  update_illustration({ preset_name: preset_name_draft.value.trim() || CURRENT_PRESET });
}

const connection_options = computed(() => [
  { value: "current", label: t("settings.illustration.connection_current") },
  { value: "proxy_preset", label: t("settings.illustration.connection_proxy_preset") },
  { value: "custom", label: t("settings.illustration.connection_custom") },
]);

function proxy_connection(): AnalysisConnection | null {
  const proxy_preset = proxy_preset_draft.value.trim();
  if (proxy_preset === "") {
    return null;
  }
  const model = proxy_model_draft.value.trim();
  return { kind: "proxy_preset", proxy_preset, model: model === "" ? null : model };
}

function custom_connection(): AnalysisConnection | null {
  const api_url = custom_url_draft.value.trim();
  const model = custom_model_draft.value.trim();
  if (model === "" || !URL.canParse(api_url) || !/^https?:$/u.test(new URL(api_url).protocol)) {
    return null;
  }
  return { kind: "custom", api_url, model };
}

const custom_invalid = computed(
  () =>
    connection_kind.value === "custom" &&
    custom_url_draft.value.trim() !== "" &&
    custom_connection() === null,
);

function save_custom_connection(): void {
  const connection = custom_connection();
  if (connection !== null) {
    update_illustration({ connection });
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
    await props.controller.set_analysis_key(value);
    key_draft.value = "";
    key_status.value = "saved";
  } catch {
    key_status.value = "failed";
  }
}

async function clear_key(): Promise<void> {
  key_status.value = "saving";
  try {
    await props.controller.clear_analysis_key();
    key_status.value = "cleared";
  } catch {
    key_status.value = "failed";
  }
}

const key_status_text = computed(() => {
  switch (key_status.value) {
    case "saved":
      return t("settings.illustration.custom_key_saved");
    case "cleared":
      return t("settings.illustration.custom_key_cleared");
    case "failed":
      return t("settings.illustration.custom_key_failed");
    case "idle":
    case "saving":
      return "";
  }
});

const connection_kind = ref(illustration.value?.connection.kind ?? "current");
watch(
  () => illustration.value?.connection.kind,
  (kind) => {
    if (kind !== undefined) {
      connection_kind.value = kind;
    }
  },
);

function set_connection_kind(value: string): void {
  if (value === "current") {
    connection_kind.value = "current";
    update_illustration({ connection: { kind: "current" } });
  } else if (value === "proxy_preset") {
    connection_kind.value = "proxy_preset";
    const connection = proxy_connection();
    if (connection !== null) {
      update_illustration({ connection });
    }
  } else if (value === "custom") {
    connection_kind.value = "custom";
    save_custom_connection();
  }
}

function save_proxy_connection(): void {
  const connection = proxy_connection();
  if (connection !== null) {
    update_illustration({ connection });
  }
}

const prompt_preset_options = computed(() => [
  { value: NO_PROMPT_PRESET, label: t("settings.illustration.prompt_preset_none") },
  ...props.promptPresets.map((preset) => ({ value: preset.id, label: preset.display_name })),
]);

function set_prompt_preset(value: string): void {
  const preset = props.promptPresets.find((candidate) => candidate.id === value);
  update_illustration({ prompt_preset_id: preset?.id ?? null });
}

const world_info_options = computed(() => [
  { value: "chat", label: t("settings.illustration.world_info_chat") },
  { value: "worldbook", label: t("settings.illustration.world_info_worldbook") },
  { value: "off", label: t("settings.illustration.world_info_off") },
]);

const world_info_mode = ref(illustration.value?.world_info.mode ?? "chat");
watch(
  () => illustration.value?.world_info.mode,
  (mode) => {
    if (mode !== undefined) {
      world_info_mode.value = mode;
    }
  },
);

const worldbooks = ref<readonly string[]>([]);
const worldbooks_failed = ref(false);

async function load_worldbooks(): Promise<void> {
  try {
    worldbooks.value = await props.controller.list_worldbooks();
    worldbooks_failed.value = false;
  } catch {
    worldbooks_failed.value = true;
  }
}

onMounted(() => {
  if (world_info_mode.value === "worldbook") {
    void load_worldbooks();
  }
});

const selected_worldbook = computed(() =>
  illustration.value?.world_info.mode === "worldbook"
    ? illustration.value.world_info.worldbook
    : undefined,
);

/** A book renamed or deleted in SillyTavern stays selectable, so the setting is not lost silently. */
const worldbook_options = computed(() =>
  [
    ...new Set([
      ...worldbooks.value,
      ...(selected_worldbook.value === undefined ? [] : [selected_worldbook.value]),
    ]),
  ].map((name) => ({ value: name, label: name })),
);

function set_world_info_mode(value: string): void {
  if (value === "chat" || value === "off") {
    world_info_mode.value = value;
    update_illustration({ world_info: { mode: value } });
  } else if (value === "worldbook") {
    world_info_mode.value = value;
    void load_worldbooks();
  }
}

function set_worldbook(worldbook: string): void {
  update_illustration({ world_info: { mode: "worldbook", worldbook } });
}
</script>

<template>
  <div :class="styles.section" data-testid="illustration-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.nav.illustration") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <AppSwitch
        :model-value="settings?.auto_generation_enabled ?? false"
        :label="t('settings.illustration.auto_generation_label')"
        :disabled="!settings"
        @update:model-value="(value) => update({ auto_generation_enabled: value })"
      />
      <p :class="styles.description">{{ t("settings.illustration.auto_generation_hint") }}</p>

      <FieldGroup
        :label="t('settings.illustration.preset_label')"
        :hint="t('settings.illustration.preset_hint')"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="preset_name_draft"
            type="text"
            :placeholder="t('settings.illustration.preset_placeholder')"
            :aria-describedby="describedBy"
            :class="styles.text_input"
            :disabled="!settings"
            data-testid="analysis-preset-input"
            @blur="save_preset_name"
          />
        </template>
      </FieldGroup>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.connection_label") }}</span>
        <SegmentedControl
          :model-value="connection_kind"
          :options="connection_options"
          :label="t('settings.illustration.connection_label')"
          :disabled="!settings"
          @update:model-value="set_connection_kind"
        />
      </div>
      <template v-if="connection_kind === 'proxy_preset'">
        <FieldGroup
          :label="t('settings.illustration.proxy_preset_label')"
          :hint="t('settings.illustration.proxy_preset_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="proxy_preset_draft"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="analysis-proxy-preset-input"
              @blur="save_proxy_connection"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          :label="t('settings.illustration.proxy_model_label')"
          :hint="t('settings.illustration.proxy_model_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="proxy_model_draft"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              @blur="save_proxy_connection"
            />
          </template>
        </FieldGroup>
      </template>
      <template v-if="connection_kind === 'custom'">
        <FieldGroup
          :label="t('settings.illustration.custom_url_label')"
          :hint="t('settings.illustration.custom_url_hint')"
          :error="custom_invalid ? t('settings.illustration.custom_invalid') : null"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="custom_url_draft"
              type="url"
              placeholder="https://"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="analysis-custom-url-input"
              @blur="save_custom_connection"
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('settings.illustration.custom_model_label')">
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="custom_model_draft"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="analysis-custom-model-input"
              @blur="save_custom_connection"
            />
          </template>
        </FieldGroup>
        <FieldGroup
          :label="t('settings.illustration.custom_key_label')"
          :hint="t('settings.illustration.custom_key_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="key_draft"
              type="password"
              autocomplete="off"
              :aria-describedby="describedBy"
              :class="styles.text_input"
              data-testid="analysis-custom-key-input"
            />
          </template>
        </FieldGroup>
        <div :class="styles.actions_row">
          <AppButton
            :label="t('settings.illustration.custom_key_save')"
            variant="primary"
            :pending="key_status === 'saving'"
            :disabled="key_draft.trim() === ''"
            @click="save_key"
          />
          <AppButton :label="t('settings.illustration.custom_key_clear')" @click="clear_key" />
          <span :class="styles.status_text" role="status">{{ key_status_text }}</span>
        </div>
      </template>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.chat_history_label") }}</span>
        <NumberStepper
          :model-value="illustration?.max_chat_history"
          :label="t('settings.illustration.chat_history_label')"
          :min="0"
          :max="20"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          :disabled="!settings"
          @update:model-value="(value) => update_illustration({ max_chat_history: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.world_info_label") }}</span>
        <SegmentedControl
          :model-value="world_info_mode"
          :options="world_info_options"
          :label="t('settings.illustration.world_info_label')"
          :disabled="!settings"
          @update:model-value="set_world_info_mode"
        />
      </div>
      <p :class="styles.description">{{ t("settings.illustration.world_info_hint") }}</p>
      <template v-if="world_info_mode === 'worldbook'">
        <div :class="styles.row">
          <span :class="styles.row_label">{{ t("settings.illustration.worldbook_label") }}</span>
          <AppSelect
            :model-value="selected_worldbook"
            :options="worldbook_options"
            :placeholder="t('settings.illustration.worldbook_placeholder')"
            :aria-label="t('settings.illustration.worldbook_label')"
            @update:model-value="set_worldbook"
          />
        </div>
        <p v-if="worldbooks_failed" :class="styles.description" role="alert">
          {{ t("settings.illustration.worldbook_unavailable") }}
        </p>
      </template>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.max_images_label") }}</span>
        <NumberStepper
          :model-value="illustration?.max_images_per_message"
          :label="t('settings.illustration.max_images_label')"
          :min="1"
          :max="8"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          :disabled="!settings"
          @update:model-value="(value) => update_illustration({ max_images_per_message: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.prompt_preset_label") }}</span>
        <AppSelect
          :model-value="illustration?.prompt_preset_id ?? NO_PROMPT_PRESET"
          :options="prompt_preset_options"
          :placeholder="t('settings.illustration.prompt_preset_label')"
          :aria-label="t('settings.illustration.prompt_preset_label')"
          :disabled="!settings"
          @update:model-value="set_prompt_preset"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.illustration.concurrency_label") }}</span>
        <NumberStepper
          :model-value="settings?.global_concurrency"
          :label="t('settings.illustration.concurrency_label')"
          :min="1"
          :max="4"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          :disabled="!settings"
          @update:model-value="(value) => update({ global_concurrency: value })"
        />
      </div>
    </div>
  </div>
</template>
