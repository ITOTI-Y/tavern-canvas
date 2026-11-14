<script setup lang="ts">
import type { VocabularyRemoteSettings } from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import type { VocabularyImportProgressView } from "../../contracts/ui_capabilities.js";
import AppButton from "../../components/AppButton.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import { catalog_url_from_input } from "../../../modules/vocabulary/catalog_url.js";
import styles from "./settings_styles.js";

const props = defineProps<{
  readonly remote: VocabularyRemoteSettings | null;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const catalog_draft = ref("");
const catalog_invalid = ref(false);
watch(
  () => props.remote?.catalog_url,
  (url) => {
    catalog_draft.value = url ?? "";
  },
  { immediate: true },
);

/** A dataset id or page is saved as the catalog.json URL it names, so the field shows what is requested. */
async function save_catalog(): Promise<void> {
  const remote = props.remote;
  const catalog_url = catalog_url_from_input(catalog_draft.value);
  catalog_invalid.value = catalog_url === null;
  if (remote === null || catalog_url === null) {
    return;
  }
  catalog_draft.value = catalog_url;
  if (catalog_url !== remote.catalog_url) {
    await props.controller.update_settings({ vocabulary_remote: { ...remote, catalog_url } });
  }
}

const token_draft = ref("");
const token_status = ref<"idle" | "saving" | "failed">("idle");

async function save_token(): Promise<void> {
  const value = token_draft.value.trim();
  if (value === "") {
    return;
  }
  token_status.value = "saving";
  try {
    await props.controller.set_vocabulary_token(value);
    token_draft.value = "";
    token_status.value = "idle";
  } catch {
    token_status.value = "failed";
  }
}

async function clear_token(): Promise<void> {
  token_status.value = "saving";
  try {
    await props.controller.clear_vocabulary_token();
    token_status.value = "idle";
  } catch {
    token_status.value = "failed";
  }
}

const token_status_text = computed(() => {
  if (token_status.value === "failed") {
    return t("settings.data.vocabulary_token_failed");
  }
  return props.remote?.token_saved === true
    ? t("settings.data.vocabulary_token_present")
    : t("settings.data.vocabulary_token_absent");
});

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
    anchor.download = "inkwell-archive.zip";
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
      <FieldGroup
        :label="t('settings.data.vocabulary_catalog_label')"
        :hint="t('settings.data.vocabulary_catalog_hint')"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="catalog_draft"
            type="url"
            autocomplete="off"
            spellcheck="false"
            :placeholder="t('settings.data.vocabulary_catalog_placeholder')"
            :aria-describedby="describedBy"
            :class="styles.text_input"
            :disabled="remote === null"
            data-testid="vocabulary-catalog-input"
            @change="save_catalog"
          />
        </template>
      </FieldGroup>
      <p
        v-if="catalog_invalid"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
        data-testid="vocabulary-catalog-invalid"
      >
        {{ t("settings.data.vocabulary_catalog_invalid") }}
      </p>

      <FieldGroup
        :label="t('settings.data.vocabulary_token_label')"
        :hint="t('settings.data.vocabulary_token_hint')"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="token_draft"
            type="password"
            autocomplete="off"
            :aria-describedby="describedBy"
            :class="styles.text_input"
            data-testid="vocabulary-token-input"
          />
        </template>
      </FieldGroup>
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.data.vocabulary_token_save')"
          variant="primary"
          :pending="token_status === 'saving'"
          :disabled="token_draft.trim() === ''"
          @click="save_token"
        />
        <AppButton
          v-if="remote?.token_saved === true"
          :label="t('settings.data.vocabulary_token_clear')"
          @click="clear_token"
        />
        <span :class="styles.status_text" role="status">{{ token_status_text }}</span>
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
          accept=".zip,application/zip"
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
