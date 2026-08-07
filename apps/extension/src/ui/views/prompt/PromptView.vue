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
import type { ContextPreview } from "./context_preview.js";
import PresetBrowser from "./PresetBrowser.vue";
import PromptBuilder from "./PromptBuilder.vue";
import PromptTestPanel from "./PromptTestPanel.vue";
import styles from "./prompt.module.css";
import QualityControls from "./QualityControls.vue";
import RegexRules from "./RegexRules.vue";
import ReplacementRules from "./ReplacementRules.vue";
import { use_toasts } from "./use_toasts.js";

/**
 * Presentational, controller-agnostic view -- same pattern as WorkbenchView.vue and
 * StudioShell.vue: receives `StudioState` and emits intent events instead of holding a
 * `StudioController` reference. Mounting into StudioShell's workspace slot for the `prompt` route
 * is deferred to the stage's whole-review integration pass (see task-5-report.md).
 */
const props = defineProps<{
  readonly state: StudioState;
  /** Pure request/response, not a mutating command -- unlike submit/save/delete, a regex test has
   * no effect on shared `StudioState` (nothing else in the Studio needs its result), so it is
   * wired as a direct callback rather than round-tripped through emitted events + a new
   * `StudioState` field that would exist for no other reason than this one panel. */
  readonly testRegex: (rule: PromptRegexRule, sampleText: string) => Promise<string>;
  /** No `StudioCapabilities` port runs a private prompt yet (see PromptTestPanel.vue's docstring).
   * Omit this prop in production until a real capability exists; the panel then shows the
   * composed "not connected" state instead of silently doing nothing. */
  readonly testCommand?: CommandState<string>;
  readonly contextPreview?: ContextPreview | null;
}>();

const emit = defineEmits<{
  "select-preset": [presetId: Uuid];
  "new-preset": [];
  "bulk-delete-presets": [presetIds: Uuid[]];
  "update-draft": [patch: Partial<PromptPresetDraft>];
  save: [draft: PromptPresetDraft];
  "run-test": [input: string];
}>();

const { t } = useI18n();
const { toasts, push: push_toast, dismiss: dismiss_toast } = use_toasts();

const saved_snapshot = ref<PromptPresetDraft | null>(null);
const awaiting_baseline = ref(false);
const ucp_enabled = ref(false);
const aqt_enabled = ref(false);
const pending_action = ref<{ kind: "select"; presetId: Uuid } | { kind: "new" } | null>(null);
const test_input = ref("");
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
    // A baseline is captured either right after a deliberate select/new-preset action
    // (`awaiting_baseline`) or the very first time a draft is seen at all (e.g. the view mounts
    // with a preset already selected from a prior session) -- without the latter, a draft that
    // arrives before the user ever calls select/new would never get a dirty-check baseline.
    const needs_baseline = awaiting_baseline.value || saved_snapshot.value === null;
    if (needs_baseline && draft) {
      saved_snapshot.value = draft;
      awaiting_baseline.value = false;
      ucp_enabled.value = false;
      aqt_enabled.value = false;
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
      push_toast({ title: t("common.actions.save"), description: t("status.success"), variant: "success" });
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

function handle_run_test(input: string): void {
  test_input.value = input;
  emit("run-test", input);
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
        :empty-message="`${t('prompt.preset_browser.empty_title')} ${t('prompt.preset_browser.empty_description')}`"
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
                  @input="
                    update_draft({ display_name: (($event.target) as HTMLInputElement).value })
                  "
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
            :context-preview="props.contextPreview ?? null"
            @update:fixed-positive-prompt="(value) => update_draft({ fixed_positive_prompt: value })"
            @update:fixed-negative-prompt="(value) => update_draft({ fixed_negative_prompt: value })"
          />

          <QualityControls
            v-model:ucp-enabled="ucp_enabled"
            v-model:aqt-enabled="aqt_enabled"
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

          <PromptTestPanel
            :input-value="test_input"
            :test-command="props.testCommand ?? { status: 'error', failure: { code: 'capability_not_implemented' } }"
            @update:input-value="(value) => (test_input = value)"
            @run="handle_run_test"
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
      :viewport-label="t('common.inspector.title')"
      :announce-label="t('common.actions.confirm')"
      :close-label="t('common.actions.close')"
      @dismiss="dismiss_toast"
    />
  </div>
</template>
