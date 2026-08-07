<script setup lang="ts">
import { Plus, X } from "lucide-vue-next";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { PromptRegexRule } from "../../contracts/ui_capabilities.js";
import type { CommandState } from "../../contracts/view_models.js";
import styles from "./prompt.module.css";

const props = defineProps<{
  readonly rules: readonly PromptRegexRule[];
  readonly testResults: Readonly<Record<string, CommandState<string>>>;
}>();

const emit = defineEmits<{
  "update:rules": [rules: PromptRegexRule[]];
  test: [rule: PromptRegexRule, sampleText: string];
}>();

const { t } = useI18n();
const sample_text_by_rule = reactive<Record<string, string>>({});

const empty_message = computed(() => {
  const title = t("prompt.regex_rules.empty_title");
  const description = t("prompt.regex_rules.empty_description");
  return `${title} ${description}`;
});

function pattern_error(rule: PromptRegexRule): string | null {
  if (!rule.pattern) {
    return null;
  }
  try {
    // Validity check only; RegExp() throws SyntaxError for a malformed pattern/flags pair.
    const validity_check = new RegExp(rule.pattern, rule.flags);
    void validity_check;
    return null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return t("prompt.regex_rules.invalid_pattern", { message });
  }
}

function add_rule(): void {
  const next: PromptRegexRule = {
    id: crypto.randomUUID(),
    pattern: "",
    flags: "",
    replacement: "",
  };
  emit("update:rules", [...props.rules, next]);
}

function update_rule(rule_id: string, patch: Partial<PromptRegexRule>): void {
  emit(
    "update:rules",
    props.rules.map((rule) => (rule.id === rule_id ? { ...rule, ...patch } : rule)),
  );
}

function remove_rule(rule_id: string): void {
  emit(
    "update:rules",
    props.rules.filter((rule) => rule.id !== rule_id),
  );
}

function run_test(rule: PromptRegexRule): void {
  emit("test", rule, sample_text_by_rule[rule.id] ?? "");
}

/** Template expressions do not narrow a discriminated union the way a `<script>` block does, so
 * the `status === "success"` check and the `.result` access happen together, here. */
function test_result_text(rule_id: string): string | null {
  const result = props.testResults[rule_id];
  return result?.status === "success" ? result.result : null;
}
</script>

<template>
  <div :class="styles.regex_rules" data-testid="regex-rules">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.regex_rules.title") }}</span>
      <button
        type="button"
        class="tc-interactive"
        :class="styles.icon_text_button"
        data-testid="add-regex-rule"
        @click="add_rule"
      >
        <Plus :size="14" aria-hidden="true" />
        {{ t("prompt.regex_rules.add_action") }}
      </button>
    </div>

    <StateSurface
      :status="props.rules.length === 0 ? 'empty' : 'ready'"
      :empty-message="empty_message"
    >
      <div
        v-for="rule in props.rules"
        :key="rule.id"
        :class="styles.rule_row"
        data-testid="regex-rule-row"
      >
        <FieldGroup :label="t('prompt.regex_rules.pattern_label')" :error="pattern_error(rule)">
          <template #default="{ fieldId, describedBy, invalid }">
            <input
              :id="fieldId"
              type="text"
              :class="styles.text_input"
              data-testid="regex-pattern-input"
              :value="rule.pattern"
              :placeholder="t('prompt.regex_rules.pattern_placeholder')"
              :aria-describedby="describedBy"
              :aria-invalid="invalid"
              @input="
                (event) =>
                  update_rule(rule.id, { pattern: (event.target as HTMLInputElement).value })
              "
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('prompt.regex_rules.flags_label')">
          <template #default="{ fieldId }">
            <input
              :id="fieldId"
              type="text"
              :class="styles.text_input_narrow"
              data-testid="regex-flags-input"
              :value="rule.flags"
              @input="
                (event) => update_rule(rule.id, { flags: (event.target as HTMLInputElement).value })
              "
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('prompt.replacement_rules.replacement_label')">
          <template #default="{ fieldId }">
            <input
              :id="fieldId"
              type="text"
              :class="styles.text_input"
              data-testid="regex-replacement-input"
              :value="rule.replacement"
              @input="
                (event) =>
                  update_rule(rule.id, { replacement: (event.target as HTMLInputElement).value })
              "
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('prompt.regex_rules.test_input_label')">
          <template #default="{ fieldId }">
            <input
              :id="fieldId"
              v-model="sample_text_by_rule[rule.id]"
              type="text"
              :class="styles.text_input"
              data-testid="regex-test-input"
            />
          </template>
        </FieldGroup>
        <span :class="styles.rule_row_action">
          <button
            type="button"
            class="tc-interactive"
            :class="styles.icon_text_button"
            data-testid="regex-test-run"
            :disabled="Boolean(pattern_error(rule))"
            @click="run_test(rule)"
          >
            {{ t("prompt.regex_rules.test_action") }}
          </button>
          <IconButton
            :icon="X"
            size="sm"
            :label="t('common.actions.delete')"
            data-testid="remove-regex-rule"
            @click="remove_rule(rule.id)"
          />
        </span>
        <p
          v-if="props.testResults[rule.id]?.status === 'success'"
          :class="styles.test_result"
          data-testid="regex-test-result"
        >
          {{ t("prompt.regex_rules.test_result_label") }}: {{ test_result_text(rule.id) }}
        </p>
        <p
          v-else-if="props.testResults[rule.id]?.status === 'error'"
          role="alert"
          :class="styles.test_result_error"
          data-testid="regex-test-error"
        >
          {{ t("errors.unexpected") }}
        </p>
      </div>
    </StateSurface>
  </div>
</template>
