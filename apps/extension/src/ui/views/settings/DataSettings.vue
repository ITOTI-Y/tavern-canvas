<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import type {
  VocabularyImportProgressView,
  VocabularyUpdateChannel,
} from "../../contracts/ui_capabilities.js";
import AppButton from "../../components/AppButton.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly vocabularyUpdateChannel: VocabularyUpdateChannel | null;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const channel_pending = ref(false);
const channel_options = [
  { value: "bundled", label: t("settings.data.vocabulary_channel_bundled") },
  { value: "remote", label: t("settings.data.vocabulary_channel_https") },
];

async function set_channel(value: string): Promise<void> {
  if ((value !== "bundled" && value !== "remote") || channel_pending.value) {
    return;
  }
  channel_pending.value = true;
  try {
    await props.controller.set_vocabulary_update_channel(value);
  } finally {
    channel_pending.value = false;
  }
}

const vocabulary_import_pending = ref(false);
const vocabulary_import_success = ref(false);
const vocabulary_import_error = ref<string | null>(null);
const vocabulary_import_progress = ref<VocabularyImportProgressView | null>(null);
const vocabulary_file_input = ref<HTMLInputElement | null>(null);

function trigger_vocabulary_import_picker(): void {
  vocabulary_file_input.value?.click();
}

function cancel_vocabulary_import(): void {
  props.controller.cancel_vocabulary_import();
}

async function handle_vocabulary_import_file(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file || vocabulary_import_pending.value) {
    return;
  }
  vocabulary_import_pending.value = true;
  vocabulary_import_success.value = false;
  vocabulary_import_error.value = null;
  vocabulary_import_progress.value = null;
  try {
    await props.controller.import_vocabulary_package(file, (progress) => {
      vocabulary_import_progress.value = progress;
    });
    vocabulary_import_success.value = true;
  } catch (error) {
    const code =
      error !== null &&
      typeof error === "object" &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : "vocabulary_import_failed";
    vocabulary_import_error.value = t("settings.data.vocabulary_import_error", { code });
  } finally {
    vocabulary_import_pending.value = false;
  }
}

const vocabulary_import_progress_label = computed(() => {
  const progress = vocabulary_import_progress.value;
  if (progress === null) {
    return null;
  }
  switch (progress.phase) {
    case "reading":
      return t("settings.data.vocabulary_import.progress_reading", {
        received: progress.received_bytes,
        total: progress.total_bytes,
      });
    case "batch":
      return t("settings.data.vocabulary_import.progress_batch", {
        current: progress.batch_index + 1,
        total: progress.batch_count,
      });
    case "indexing":
      return t("settings.data.vocabulary_import.progress_indexing");
    case "staging_shard":
      return t("settings.data.vocabulary_import.progress_staging", {
        current: progress.shard_index + 1,
        total: progress.shard_count,
      });
    case "activating":
      return t("settings.data.vocabulary_import.progress_activating");
    case "complete":
      return t("settings.data.vocabulary_import.progress_complete", {
        count: progress.record_count,
      });
    case "cancelled":
      return t("settings.data.vocabulary_import.progress_cancelled");
  }
});

const archive_export_pending = ref(false);
const archive_export_error = ref<string | null>(null);

async function export_archive(): Promise<void> {
  if (archive_export_pending.value) {
    return;
  }
  archive_export_pending.value = true;
  archive_export_error.value = null;
  try {
    const blob = await props.controller.export_settings_archive();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "tavern-canvas-archive.json";
    anchor.click();
    URL.revokeObjectURL(url);
  } catch {
    archive_export_error.value = t("errors.unexpected");
  } finally {
    archive_export_pending.value = false;
  }
}

const archive_import_pending = ref(false);
const archive_import_error = ref<string | null>(null);
const file_input = ref<HTMLInputElement | null>(null);

function trigger_import_picker(): void {
  file_input.value?.click();
}

async function handle_import_file(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file || archive_import_pending.value) {
    return;
  }
  archive_import_pending.value = true;
  archive_import_error.value = null;
  try {
    await props.controller.import_settings_archive(file);
  } catch {
    archive_import_error.value = t("errors.unexpected");
  } finally {
    archive_import_pending.value = false;
  }
}
</script>

<template>
  <div :class="styles.section" data-testid="data-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.data") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.data.vocabulary_channel_label") }}</span>
        <SegmentedControl
          :model-value="vocabularyUpdateChannel ?? 'bundled'"
          :options="channel_options"
          :label="t('settings.data.vocabulary_channel_label')"
          :disabled="channel_pending"
          @update:model-value="set_channel"
        />
      </div>

      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.data.vocabulary_import.action')"
          variant="secondary"
          :pending="vocabulary_import_pending"
          @click="trigger_vocabulary_import_picker"
        />
        <AppButton
          v-if="vocabulary_import_pending"
          :label="t('settings.data.vocabulary_import.cancel_action')"
          variant="destructive"
          @click="cancel_vocabulary_import"
        />
        <input
          ref="vocabulary_file_input"
          type="file"
          accept=".json,.jsonl,.ndjson,application/json,application/x-ndjson"
          class="tc-visually-hidden"
          :aria-label="t('settings.data.vocabulary_import.action')"
          data-testid="vocabulary-import-input"
          @change="handle_vocabulary_import_file"
        />
      </div>
      <p :class="styles.description">
        {{ t("settings.data.vocabulary_import.description") }}
      </p>
      <p
        v-if="vocabulary_import_progress_label"
        :class="[styles.status_text, styles.description]"
        data-testid="vocabulary-import-progress"
      >
        {{ vocabulary_import_progress_label }}
      </p>
      <p
        v-if="vocabulary_import_success"
        :class="[styles.status_text, styles.description]"
        data-tone="success"
        data-testid="vocabulary-import-success"
      >
        {{ t("settings.data.vocabulary_import.success") }}
      </p>
      <p
        v-if="vocabulary_import_error"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
        data-testid="vocabulary-import-error"
      >
        {{ vocabulary_import_error }}
      </p>

      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.data.archive_export_action')"
          :pending="archive_export_pending"
          @click="export_archive"
        />
        <AppButton
          :label="t('settings.data.archive_import_action')"
          variant="secondary"
          :pending="archive_import_pending"
          @click="trigger_import_picker"
        />
        <input
          ref="file_input"
          type="file"
          accept="application/json"
          class="tc-visually-hidden"
          :aria-label="t('settings.data.archive_import_action')"
          data-testid="archive-import-input"
          @change="handle_import_file"
        />
      </div>
      <p :class="styles.description">{{ t("settings.data.archive_import_description") }}</p>
      <p
        v-if="archive_export_error"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
      >
        {{ archive_export_error }}
      </p>
      <p
        v-if="archive_import_error"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
      >
        {{ archive_import_error }}
      </p>
    </div>
  </div>
</template>
