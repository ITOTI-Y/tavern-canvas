<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import type { CommandState } from "../../contracts/view_models.js";
import type {
  MigrationSnapshot,
  VocabularyUpdateChannel,
} from "../../contracts/ui_capabilities.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import MigrationStatus from "../diagnostics/MigrationStatus.vue";
import styles from "./settings.module.css";

/**
 * Manual legacy cleanup (plan + Stage 04 carry-over, binding): shows source record counts + a
 * byte estimate, requires an exact typed confirmation phrase, and calls the destructive capability
 * only after a verified migration or a just-exported archive -- never automatically.
 */
const props = defineProps<{
  readonly vocabularyUpdateChannel: VocabularyUpdateChannel | null;
  readonly migration: MigrationSnapshot | null;
  readonly migrationRetryCommand: CommandState<MigrationSnapshot>;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

/** Kept identical across locales (settings.data.manual_cleanup.confirm_phrase, en.ts/zh_cn.ts):
 * a typed-delete-confirmation phrase is arbitrary text to retype exactly, not content that
 * benefits from translation, matching common typed-confirm UX (e.g. "type the resource name"). */
const CONFIRM_PHRASE = computed(() => t("settings.data.manual_cleanup.confirm_phrase"));

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

const archive_export_pending = ref(false);
const archive_exported = ref(false);
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
    archive_exported.value = true;
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

function retry_migration(): void {
  void props.controller.retry_migration();
}

const show_migration_report = ref(false);

function toggle_migration_report(): void {
  show_migration_report.value = !show_migration_report.value;
}

const total_legacy_records = computed(() =>
  Object.values(props.migration?.counts ?? {}).reduce((sum, count) => sum + count, 0),
);
const record_summary_text = computed(() =>
  t("settings.data.manual_cleanup.record_summary", total_legacy_records.value, {
    named: {
      count: total_legacy_records.value,
      bytes: t("settings.data.manual_cleanup.bytes_unavailable"),
    },
  }),
);

const cleanup_unlocked = computed(
  () => props.migration?.state === "completed" || archive_exported.value,
);

const cleanup_dialog_open = ref(false);
const cleanup_confirm_text = ref("");
const cleanup_pending = ref(false);
const cleanup_error = ref<string | null>(null);

function open_cleanup_dialog(): void {
  cleanup_confirm_text.value = "";
  cleanup_error.value = null;
  cleanup_dialog_open.value = true;
}

function close_cleanup_dialog(): void {
  cleanup_dialog_open.value = false;
  cleanup_confirm_text.value = "";
}

async function confirm_cleanup(): Promise<void> {
  if (cleanup_confirm_text.value !== CONFIRM_PHRASE.value || cleanup_pending.value) {
    return;
  }
  cleanup_pending.value = true;
  cleanup_error.value = null;
  try {
    await props.controller.confirm_legacy_cleanup(cleanup_confirm_text.value);
    cleanup_dialog_open.value = false;
  } catch {
    cleanup_error.value = t("errors.unexpected");
  } finally {
    cleanup_pending.value = false;
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

      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.data.migration_retry_action')"
          :pending="migrationRetryCommand.status === 'pending'"
          @click="retry_migration"
        />
        <AppButton
          :label="t('settings.data.migration_report_action')"
          variant="secondary"
          @click="toggle_migration_report"
        />
      </div>
      <MigrationStatus v-if="show_migration_report" :snapshot="migration" />

      <div :class="styles.section" data-testid="manual-cleanup">
        <div :class="styles.section_header">
          <h3 :class="styles.section_title">{{ t("settings.data.manual_cleanup.title") }}</h3>
        </div>
        <p :class="styles.description">{{ t("settings.data.manual_cleanup.description") }}</p>
        <div :class="styles.row">
          <span :class="styles.row_label">{{
            t("diagnostics.migration_status.counts_label")
          }}</span>
          <span class="tc-tabular-nums" :class="styles.row_value">
            {{ record_summary_text }}
          </span>
        </div>
        <p v-if="!cleanup_unlocked" :class="styles.description" data-testid="cleanup-locked">
          {{ t("settings.data.manual_cleanup.unlock_hint") }}
        </p>
        <div :class="styles.actions_row">
          <AppButton
            :label="t('settings.data.manual_cleanup.confirm_action')"
            variant="destructive"
            :disabled="!cleanup_unlocked"
            data-testid="manual-cleanup-action"
            @click="open_cleanup_dialog"
          />
        </div>
      </div>
    </div>

    <AppDialog
      :open="cleanup_dialog_open"
      :title="t('settings.data.manual_cleanup.title')"
      :description="t('confirmations.destructive.irreversible_note')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_cleanup_dialog()"
    >
      <FieldGroup
        :label="t('confirmations.typed_confirmation.label', { phrase: CONFIRM_PHRASE })"
        :error="
          cleanup_confirm_text.length > 0 && cleanup_confirm_text !== CONFIRM_PHRASE
            ? t('confirmations.typed_confirmation.mismatch', { phrase: CONFIRM_PHRASE })
            : cleanup_error
        "
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="cleanup_confirm_text"
            type="text"
            :aria-describedby="describedBy"
            :class="styles.typed_confirm_input"
            :placeholder="t('confirmations.typed_confirmation.placeholder')"
            data-testid="cleanup-confirm-input"
          />
        </template>
      </FieldGroup>
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.data.manual_cleanup.confirm_action')"
          variant="destructive"
          :pending="cleanup_pending"
          :disabled="cleanup_confirm_text !== CONFIRM_PHRASE"
          @click="confirm_cleanup"
        />
        <AppButton
          :label="t('confirmations.destructive.default_cancel_action')"
          variant="secondary"
          @click="close_cleanup_dialog"
        />
      </div>
    </AppDialog>
  </div>
</template>
