<script setup lang="ts">
import { Plus, X } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { PromptReplacementRule } from "../../contracts/ui_capabilities.js";
import styles from "./prompt.module.css";

const props = defineProps<{
  readonly rules: readonly PromptReplacementRule[];
}>();

const emit = defineEmits<{
  "update:rules": [rules: PromptReplacementRule[]];
}>();

const { t } = useI18n();

const empty_message = computed(() => {
  const title = t("prompt.replacement_rules.empty_title");
  const description = t("prompt.replacement_rules.empty_description");
  return `${title} ${description}`;
});

function triggers_text(rule: PromptReplacementRule): string {
  return rule.triggers.join(", ");
}

function add_rule(): void {
  const next: PromptReplacementRule = { id: crypto.randomUUID(), triggers: [], replacement: "" };
  emit("update:rules", [...props.rules, next]);
}

function update_triggers(rule_id: string, text: string): void {
  const triggers = text
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  emit(
    "update:rules",
    props.rules.map((rule) => (rule.id === rule_id ? { ...rule, triggers } : rule)),
  );
}

function update_replacement(rule_id: string, replacement: string): void {
  emit(
    "update:rules",
    props.rules.map((rule) => (rule.id === rule_id ? { ...rule, replacement } : rule)),
  );
}

function remove_rule(rule_id: string): void {
  emit(
    "update:rules",
    props.rules.filter((rule) => rule.id !== rule_id),
  );
}
</script>

<template>
  <div :class="styles.replacement_rules" data-testid="replacement-rules">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.replacement_rules.title") }}</span>
      <button
        type="button"
        class="tc-interactive"
        :class="styles.icon_text_button"
        data-testid="add-replacement-rule"
        @click="add_rule"
      >
        <Plus :size="14" aria-hidden="true" />
        {{ t("prompt.replacement_rules.add_action") }}
      </button>
    </div>

    <StateSurface :status="props.rules.length === 0 ? 'empty' : 'ready'" :empty-message="empty_message">
      <div
        v-for="rule in props.rules"
        :key="rule.id"
        :class="styles.rule_row"
        data-testid="replacement-rule-row"
      >
        <FieldGroup
          :label="t('prompt.replacement_rules.trigger_label')"
          :hint="t('prompt.replacement_rules.triggers_hint')"
        >
          <template #default="{ fieldId }">
            <input
              :id="fieldId"
              type="text"
              :class="styles.text_input"
              data-testid="replacement-triggers-input"
              :value="triggers_text(rule)"
              :placeholder="t('prompt.replacement_rules.trigger_placeholder')"
              @change="(event) => update_triggers(rule.id, (event.target as HTMLInputElement).value)"
            />
          </template>
        </FieldGroup>
        <FieldGroup :label="t('prompt.replacement_rules.replacement_label')">
          <template #default="{ fieldId }">
            <input
              :id="fieldId"
              type="text"
              :class="styles.text_input"
              data-testid="replacement-value-input"
              :value="rule.replacement"
              :placeholder="t('prompt.replacement_rules.replacement_placeholder')"
              @input="(event) => update_replacement(rule.id, (event.target as HTMLInputElement).value)"
            />
          </template>
        </FieldGroup>
        <span :class="styles.rule_row_action">
          <IconButton
            :icon="X"
            size="sm"
            :label="t('common.actions.delete')"
            data-testid="remove-replacement-rule"
            @click="remove_rule(rule.id)"
          />
        </span>
      </div>
    </StateSurface>
  </div>
</template>
