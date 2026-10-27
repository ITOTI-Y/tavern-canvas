<script setup lang="ts">
import type { Uuid } from "@tavern-canvas/contracts";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import StateSurface from "../../components/StateSurface.vue";
import ToastViewport from "../../components/ToastViewport.vue";
import type { PromptPresetDraft, PromptRegexRule } from "../../contracts/ui_capabilities.js";
import type { CommandState, StudioState } from "../../contracts/view_models.js";
import PresetBrowser from "./PresetBrowser.vue";
import PromptBuilder from "./PromptBuilder.vue";
import styles from "./prompt_styles.js";
import RegexRules from "./RegexRules.vue";
import ReplacementRules from "./ReplacementRules.vue";
import { use_toasts } from "./use_toasts.js";

const props = defineProps<{
  readonly state: StudioState;
  readonly testRegex: (rule: PromptRegexRule, sampleText: string) => Promise<string>;
}>();

const emit = defineEmits<{
  "select-preset": [presetId: Uuid];
  "new-preset": [];
  "bulk-delete-presets": [presetIds: Uuid[]];
  "update-draft": [patch: Partial<PromptPresetDraft>];
  save: [draft: PromptPresetDraft];
}>();

const { t } = useI18n();
const { toasts, push: push_toast, dismiss: dismiss_toast } = use_toasts();

const saved_snapshot = ref<PromptPresetDraft | null>(null);
const awaiting_baseline = ref(false);
const pending_action = ref<{ kind: "select"; presetId: Uuid } | { kind: "new" } | null>(null);
const regex_test_results = ref<Record<string, CommandState<string>>>({});

function snapshot_key(draft: PromptPresetDraft | null): string {
  return draft ? JSON.stringify(draft) : "";
}

const is_dirty = () =>
  props.state.prompt.draft !== null &&
  saved_snapshot.value !== null &&
  snapshot_key(props.state.prompt.draft) !== snapshot_key(saved_snapshot.value);

watch(
  () => props.state.prompt.draft,
  (draft) => {
    const needs_baseline = awaiting_baseline.value || saved_snapshot.value === null;
    if (needs_baseline && draft) {
      saved_snapshot.value = draft;
      awaiting_baseline.value = false;
      regex_test_results.value = {};
    }
    if (draft === null) {
      saved_snapshot.value = null;
    }
  },
  { immediate: true },
);

function request_select(preset_id: Uuid): void {
  if (is_dirty()) {
    pending_action.value = { kind: "select", presetId: preset_id };
    return;
  }
  awaiting_baseline.value = true;
  emit("select-preset", preset_id);
}

function request_new_preset(): void {
  if (is_dirty()) {
    pending_action.value = { kind: "new" };
    return;
  }
  awaiting_baseline.value = true;
  emit("new-preset");
}

function confirm_discard(): void {
  const action = pending_action.value;
  pending_action.value = null;
  if (!action) {
    return;
  }
  awaiting_baseline.value = true;
  if (action.kind === "select") {
    emit("select-preset", action.presetId);
  } else {
    emit("new-preset");
  }
}

function update_draft(patch: Partial<PromptPresetDraft>): void {
  emit("update-draft", patch);
}

function handle_save(): void {
  if (!props.state.prompt.draft) {
    return;
  }
  emit("save", props.state.prompt.draft);
}

watch(
  () => props.state.prompt.save_command,
  (command) => {
    if (command.status === "success") {
      push_toast({
        title: t("common.actions.save"),
        description: t("status.success"),
        variant: "success",
      });
      saved_snapshot.value = null;
    }
  },
);

async function run_regex_test(rule: PromptRegexRule, sample_text: string): Promise<void> {
  regex_test_results.value = { ...regex_test_results.value, [rule.id]: { status: "pending" } };
  try {
    const result = await props.testRegex(rule, sample_text);
    regex_test_results.value = {
      ...regex_test_results.value,
      [rule.id]: { status: "success", result },
    };
  } catch (error) {
    const code =
      error instanceof Error && "code" in error && typeof error.code === "string"
        ? error.code
        : "command_failed";
    regex_test_results.value = {
      ...regex_test_results.value,
      [rule.id]: { status: "error", failure: { code } },
    };
  }
}
</script>

<template>
  <div :class="styles.prompt_view" data-testid="prompt-view">
    <div :class="styles.browser_column">
      <PresetBrowser
        :presets="props.state.prompt.presets"
        :selected-preset-id="props.state.prompt.selected_preset_id"
        :loading="props.state.loading.has('prompt_presets')"
        :has-error="props.state.failures.has('prompt_presets')"
        @select="request_select"
        @new-preset="request_new_preset"
        @bulk-delete="(ids) => emit('bulk-delete-presets', ids)"
      />
    </div>

    <div :class="styles.editor_column">
      <StateSurface
        :status="props.state.prompt.draft ? 'ready' : 'empty'"
        :empty-title="t('prompt.preset_browser.empty_title')"
        :empty-message="t('prompt.preset_browser.empty_description')"
      >
        <template v-if="props.state.prompt.draft">
          <div :class="styles.name_row">
            <FieldGroup :label="t('common.labels.name')">
              <template #default="{ fieldId }">
                <input
                  :id="fieldId"
                  type="text"
                  :class="styles.text_input"
                  data-testid="preset-name-input"
                  :value="props.state.prompt.draft.display_name"
                  @input="update_draft({ display_name: ($event.target as HTMLInputElement).value })"
                />
              </template>
            </FieldGroup>
            <AppButton
              :label="t('common.actions.save')"
              variant="primary"
              :pending="props.state.prompt.save_command.status === 'pending'"
              data-testid="save-preset"
              @click="handle_save"
            />
          </div>

          <PromptBuilder
            :fixed-positive-prompt="props.state.prompt.draft.fixed_positive_prompt"
            :fixed-negative-prompt="props.state.prompt.draft.fixed_negative_prompt"
            @update:fixed-positive-prompt="
              (value) => update_draft({ fixed_positive_prompt: value })
            "
            @update:fixed-negative-prompt="
              (value) => update_draft({ fixed_negative_prompt: value })
            "
          />

          <ReplacementRules
            :rules="props.state.prompt.draft.replacement_rules"
            @update:rules="(rules) => update_draft({ replacement_rules: rules })"
          />

          <RegexRules
            :rules="props.state.prompt.draft.regex_rules"
            :test-results="regex_test_results"
            @update:rules="(rules) => update_draft({ regex_rules: rules })"
            @test="run_regex_test"
          />
        </template>
      </StateSurface>
    </div>

    <ConfirmDialog
      :open="pending_action !== null"
      :title="t('confirmations.discard_unsaved.title')"
      :description="t('confirmations.discard_unsaved.description')"
      :confirm-label="t('confirmations.discard_unsaved.discard_action')"
      :cancel-label="t('confirmations.discard_unsaved.stay_action')"
      data-testid="discard-unsaved-confirm"
      @update:open="(open) => (pending_action = open ? pending_action : null)"
      @confirm="confirm_discard"
    />

    <ToastViewport
      :toasts="toasts"
      :viewport-label="t('common.notifications.viewport_label')"
      :announce-label="t('common.notifications.announce_label')"
      :close-label="t('common.actions.close')"
      @dismiss="dismiss_toast"
    />
  </div>
</template>
