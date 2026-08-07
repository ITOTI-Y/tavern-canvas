<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import type { CommandState } from "../../contracts/view_models.js";
import styles from "./prompt.module.css";

/**
 * Private LLM prompt-builder test, tools disabled: no `StudioCapabilities` port runs a private
 * prompt (the Studio never imports host modules directly per roadmap rule 5, and
 * `host_adapter.ts`'s `generate_private_prompt` is not among the nine capability ports -- see
 * task-5-report.md's contract-gap note). `testCommand` therefore stays `idle` in production until
 * a future capability is wired in; a `capability_not_implemented` failure renders the composed
 * "not connected yet" message instead of a raw error.
 */
const props = defineProps<{
  readonly inputValue: string;
  readonly testCommand: CommandState<string>;
}>();

const emit = defineEmits<{
  "update:inputValue": [value: string];
  run: [input: string];
}>();

const { t } = useI18n();

const is_unavailable = computed(
  () => props.testCommand.status === "error" && props.testCommand.failure.code === "capability_not_implemented",
);
</script>

<template>
  <div :class="styles.test_panel" data-testid="prompt-test-panel">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.test_panel.title") }}</span>
    </div>
    <div :class="styles.test_panel_body">
      <p :class="styles.tools_disabled_note">{{ t("prompt.test_panel.tools_disabled_note") }}</p>

      <FieldGroup :label="t('prompt.test_panel.input_label')">
        <template #default="{ fieldId }">
          <textarea
            :id="fieldId"
            :class="styles.textarea"
            data-testid="test-panel-input"
            :value="props.inputValue"
            :placeholder="t('prompt.test_panel.input_placeholder')"
            rows="3"
            @input="emit('update:inputValue', (($event.target) as HTMLTextAreaElement).value)"
          />
        </template>
      </FieldGroup>

      <AppButton
        :label="t('prompt.test_panel.run_action')"
        :pending="props.testCommand.status === 'pending'"
        data-testid="test-panel-run"
        @click="emit('run', props.inputValue)"
      />

      <p v-if="props.testCommand.status === 'pending'" data-testid="test-panel-running">
        {{ t("prompt.test_panel.running") }}
      </p>
      <div v-else-if="props.testCommand.status === 'success'" data-testid="test-panel-result">
        <p :class="styles.section_title">{{ t("prompt.test_panel.result_title") }}</p>
        <p>{{ props.testCommand.result }}</p>
      </div>
      <p v-else-if="is_unavailable" role="alert" data-testid="test-panel-unavailable">
        {{ t("prompt.test_panel.unavailable_description") }}
      </p>
      <p v-else-if="props.testCommand.status === 'error'" role="alert" data-testid="test-panel-error">
        {{ t("errors.unexpected") }}
      </p>
    </div>
  </div>
</template>
