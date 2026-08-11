<script setup lang="ts">
import type { KnowledgeRecord, KnowledgeSourceType, Uuid } from "@tavern-canvas/contracts";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import AppTooltip from "../../components/AppTooltip.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./assets.module.css";
import { knowledge_source_label } from "./persona_labels.js";

/**
 * Knowledge entry CRUD with multi-select batch delete. Keywords are entered as a comma separated
 * line and normalized here, which keeps the form to one field instead of a chip editor while the
 * stored shape stays a real array.
 */
const props = defineProps<{
  readonly entries: readonly KnowledgeRecord[];
  readonly selectedIds: readonly Uuid[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

interface DraftForm {
  readonly id: Uuid;
  readonly is_new: boolean;
  title: string;
  source_type: KnowledgeSourceType;
  content: string;
  keywords_text: string;
  priority: number;
  enabled: boolean;
}

const dialog_open = ref(false);
const draft = ref<DraftForm | null>(null);
const saving = ref(false);
const title_error = ref<string | null>(null);
const content_error = ref<string | null>(null);
const save_error = ref<string | null>(null);

const remove_target = ref<KnowledgeRecord | null>(null);
const remove_pending = ref(false);
const bulk_remove_open = ref(false);
const bulk_remove_pending = ref(false);

const source_options = computed(() =>
  (["manual", "imported", "character"] as const).map((source_type) => ({
    value: source_type,
    label: knowledge_source_label(t, source_type),
  })),
);

const source_model = computed<string>({
  get: () => draft.value?.source_type ?? "manual",
  set: (value) => {
    if (draft.value) {
      draft.value.source_type = value as KnowledgeSourceType;
    }
  },
});

const selected_set = computed(() => new Set(props.selectedIds));

/** Mixed rather than unchecked while a subset is selected, so the box reports what clicking it
 * will do -- an unchecked "select all" over a half-selected list claims nothing is selected. */
const select_all_state = computed<boolean | "indeterminate">(() => {
  if (props.selectedIds.length === 0) {
    return false;
  }
  return props.selectedIds.length === props.entries.length ? true : "indeterminate";
});

/** Splits on commas and the full-width comma so a Simplified Chinese keyboard needs no switch. */
function parse_keywords(text: string): string[] {
  const parts = text
    .split(/[,，]/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return [...new Set(parts)];
}

function toggle_selection(entry_id: Uuid, selected: boolean): void {
  const next = new Set(props.selectedIds);
  if (selected) {
    next.add(entry_id);
  } else {
    next.delete(entry_id);
  }
  props.controller.set_knowledge_selection([...next]);
}

function toggle_select_all(selected: boolean): void {
  props.controller.set_knowledge_selection(selected ? props.entries.map((entry) => entry.id) : []);
}

function open_create(): void {
  draft.value = {
    id: crypto.randomUUID(),
    is_new: true,
    title: "",
    source_type: "manual",
    content: "",
    keywords_text: "",
    priority: 10,
    enabled: true,
  };
  reset_errors();
  dialog_open.value = true;
}

function open_edit(entry: KnowledgeRecord): void {
  draft.value = {
    id: entry.id,
    is_new: false,
    title: entry.title,
    source_type: entry.source_type,
    content: entry.content,
    keywords_text: entry.keywords.join(", "),
    priority: entry.priority,
    enabled: entry.enabled,
  };
  reset_errors();
  dialog_open.value = true;
}

function reset_errors(): void {
  title_error.value = null;
  content_error.value = null;
  save_error.value = null;
}

function close_dialog(): void {
  dialog_open.value = false;
  draft.value = null;
}

async function save(): Promise<void> {
  const current = draft.value;
  if (!current || saving.value) {
    return;
  }
  reset_errors();
  const title = current.title.trim();
  const content = current.content.trim();
  if (title.length === 0) {
    title_error.value = t("errors.validation_required");
  }
  if (content.length === 0) {
    content_error.value = t("errors.validation_required");
  }
  if (title_error.value || content_error.value) {
    return;
  }

  saving.value = true;
  try {
    await props.controller.save_knowledge_entry({
      id: current.id,
      title,
      source_type: current.source_type,
      content,
      keywords: parse_keywords(current.keywords_text),
      priority: current.priority,
      enabled: current.enabled,
    });
    close_dialog();
  } catch {
    save_error.value = t("errors.unexpected");
  } finally {
    saving.value = false;
  }
}

async function confirm_remove(): Promise<void> {
  const target = remove_target.value;
  if (!target || remove_pending.value) {
    return;
  }
  remove_pending.value = true;
  try {
    await props.controller.remove_knowledge_entry(target.id);
    remove_target.value = null;
  } finally {
    remove_pending.value = false;
  }
}

async function confirm_bulk_remove(): Promise<void> {
  if (bulk_remove_pending.value) {
    return;
  }
  bulk_remove_pending.value = true;
  try {
    await props.controller.bulk_remove_knowledge_entries(props.selectedIds);
    bulk_remove_open.value = false;
  } finally {
    bulk_remove_pending.value = false;
  }
}
</script>

<template>
  <div :class="styles.categoryList" data-testid="knowledge-panel">
    <div :class="styles.categoryToolbar">
      <AppButton :label="t('assets.knowledge.add_action')" @click="open_create" />
      <AppCheckbox
        v-if="entries.length > 0"
        :model-value="select_all_state"
        :label="t('assets.knowledge.select_all_label')"
        @update:model-value="toggle_select_all"
      />
      <AppButton
        v-if="selectedIds.length > 0"
        :label="t('assets.knowledge.bulk_delete_action', { count: selectedIds.length })"
        variant="destructive"
        data-testid="knowledge-bulk-delete"
        @click="bulk_remove_open = true"
      />
    </div>

    <StateSurface
      :status="loading ? 'loading' : entries.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('assets.knowledge.empty_description')"
    >
      <template #action>
        <AppButton :label="t('assets.knowledge.add_action')" @click="open_create" />
      </template>
      <ul :class="styles.cardGrid">
        <li
          v-for="entry in entries"
          :key="entry.id"
          :class="styles.assetCard"
          data-testid="knowledge-card"
        >
          <AppCheckbox
            :model-value="selected_set.has(entry.id)"
            :label="t('assets.knowledge.select_label', { title: entry.title })"
            label-hidden
            @update:model-value="(value) => toggle_selection(entry.id, value)"
          />
          <div :class="styles.assetCardMain">
            <span :class="styles.assetCardName">{{ entry.title }}</span>
            <span :class="styles.assetCardSummary">
              <span :class="styles.assetCardSummaryPart">{{
                knowledge_source_label(t, entry.source_type)
              }}</span>
              <span :class="styles.assetCardSummaryPart">{{
                t("assets.knowledge.priority_summary", { priority: entry.priority })
              }}</span>
              <span v-if="entry.keywords.length > 0" :class="styles.assetCardSummaryPart">{{
                entry.keywords.join(", ")
              }}</span>
            </span>
          </div>
          <div :class="styles.assetCardActions">
            <AppTooltip :content="t('assets.knowledge.enabled_label')">
              <AppSwitch
                :model-value="entry.enabled"
                :label="t('assets.knowledge.enabled_label')"
                label-hidden
                @update:model-value="
                  (value) => controller.set_knowledge_entry_enabled(entry.id, value)
                "
              />
            </AppTooltip>
            <AppButton
              :label="t('common.actions.edit')"
              variant="secondary"
              @click="open_edit(entry)"
            />
            <AppButton
              :label="t('common.actions.delete')"
              variant="destructive"
              @click="remove_target = entry"
            />
          </div>
        </li>
      </ul>
    </StateSurface>

    <AppDialog
      :open="dialog_open"
      :title="draft?.is_new ? t('assets.knowledge.add_action') : t('common.actions.edit')"
      :description="t('assets.form_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_dialog()"
    >
      <div v-if="draft" :class="styles.form">
        <FieldGroup :label="t('assets.knowledge.title_label')" :error="title_error" required>
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.title"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.textInput"
            />
          </template>
        </FieldGroup>

        <FieldGroup :label="t('assets.knowledge.source_type_label')" required>
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="source_model"
              :options="source_options"
              :placeholder="t('assets.knowledge.source_type_label')"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('assets.knowledge.content_label')"
          :hint="t('assets.knowledge.content_hint')"
          :error="content_error"
          required
        >
          <template #default="{ fieldId, describedBy }">
            <textarea
              :id="fieldId"
              v-model="draft.content"
              rows="6"
              :aria-describedby="describedBy"
              :class="styles.textArea"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('assets.knowledge.keywords_label')"
          :hint="t('assets.knowledge.keywords_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.keywords_text"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.textInput"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('assets.knowledge.priority_label')"
          :hint="t('assets.knowledge.priority_hint')"
        >
          <template #default>
            <NumberStepper
              v-model="draft.priority"
              :label="t('assets.knowledge.priority_label')"
              :increment-label="t('common.actions.increase')"
              :decrement-label="t('common.actions.decrease')"
              :min="0"
              :max="1000"
              :step="5"
            />
          </template>
        </FieldGroup>

        <AppSwitch v-model="draft.enabled" :label="t('assets.knowledge.enabled_label')" />

        <p v-if="save_error" :class="styles.emptyDescription" data-tone="error">{{ save_error }}</p>

        <div :class="styles.formActions">
          <AppButton :label="t('common.actions.save')" :pending="saving" @click="save" />
          <AppButton
            :label="t('common.actions.cancel')"
            variant="secondary"
            @click="close_dialog"
          />
        </div>
      </div>
    </AppDialog>

    <ConfirmDialog
      :open="remove_target !== null"
      :title="t('assets.delete_confirm_title', { name: remove_target?.title ?? '' })"
      :description="t('assets.knowledge.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="remove_pending"
      @update:open="(open) => !open && (remove_target = null)"
      @confirm="confirm_remove"
    />

    <ConfirmDialog
      :open="bulk_remove_open"
      :title="t('assets.knowledge.bulk_delete_confirm_title', { count: selectedIds.length })"
      :description="t('assets.knowledge.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="bulk_remove_pending"
      @update:open="(open) => (bulk_remove_open = open)"
      @confirm="confirm_bulk_remove"
    />
  </div>
</template>
