<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { AssistantSummaryRecord } from "../../modules/assistant/assistant_session.js";
import { estimate_summary_tokens } from "../../modules/assistant/assistant_session.js";
import AppButton from "../components/AppButton.vue";
import AppSwitch from "../components/AppSwitch.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import StateSurface from "../components/StateSurface.vue";
import AssistantSummaryGraph from "./AssistantSummaryGraph.vue";
import styles from "./assistant.module.css";

/**
 * Summary manager: the list, the selected summary's full detail, and the hierarchy graph that
 * makes `parent_id` legible. Enabling one summary disables its parent and children upstream, so
 * this view only emits intent and renders whatever comes back.
 */
const props = defineProps<{
  readonly summaries: readonly AssistantSummaryRecord[];
}>();

const emit = defineEmits<{
  "set-enabled": [id: string, enabled: boolean];
  delete: [id: string];
  regenerate: [id: string];
}>();

const { t } = useI18n();

const selected_id = ref<string | null>(null);
const delete_target = ref<AssistantSummaryRecord | null>(null);
const delete_pending = ref(false);

const selected = computed(
  () => props.summaries.find((summary) => summary.id === selected_id.value) ?? null,
);

const total_tokens = computed(() =>
  props.summaries
    .filter((summary) => summary.enabled)
    .reduce((total, summary) => total + estimate_summary_tokens(summary.text), 0),
);

function select(id: string): void {
  selected_id.value = selected_id.value === id ? null : id;
}

function confirm_delete(): void {
  const target = delete_target.value;
  if (!target || delete_pending.value) {
    return;
  }
  delete_pending.value = true;
  emit("delete", target.id);
  if (selected_id.value === target.id) {
    selected_id.value = null;
  }
  delete_target.value = null;
  delete_pending.value = false;
}
</script>

<template>
  <section :class="styles.summaryPanel" data-testid="assistant-summary-panel">
    <header :class="styles.summaryHeader">
      <span>{{ t("assistant.summaries.panel_title") }}</span>
      <span :class="styles.summaryTokenEstimate" data-testid="assistant-summary-tokens">
        {{ t("assistant.summaries.token_estimate", { n: total_tokens }) }}
      </span>
    </header>

    <StateSurface
      :status="summaries.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('assistant.summaries.empty_description')"
    >
      <div :class="styles.summaryBody">
        <ul :class="styles.summaryList">
          <li
            v-for="summary in summaries"
            :key="summary.id"
            :class="[styles.summaryRow, summary.id === selected_id && styles.summaryRowSelected]"
            data-testid="assistant-summary-row"
          >
            <button
              type="button"
              :class="styles.summaryRowMain"
              :aria-expanded="summary.id === selected_id"
              @click="select(summary.id)"
            >
              <span :class="styles.summaryRowText">{{ summary.text }}</span>
              <span :class="styles.summaryRowMeta">
                {{ t("assistant.summaries.covers_label", { n: summary.covers_up_to_message_id }) }}
              </span>
            </button>
            <span :class="styles.summaryRowActions">
              <AppSwitch
                :model-value="summary.enabled"
                :label="t('assistant.summaries.enabled_label')"
                @update:model-value="(value) => emit('set-enabled', summary.id, value)"
              />
              <AppButton
                :label="t('assistant.summaries.regenerate_action')"
                variant="secondary"
                @click="emit('regenerate', summary.id)"
              />
              <AppButton
                :label="t('common.actions.delete')"
                variant="destructive"
                @click="delete_target = summary"
              />
            </span>
          </li>
        </ul>

        <article
          v-if="selected"
          :class="styles.summaryDetail"
          data-testid="assistant-summary-detail"
        >
          <h3 :class="styles.summaryDetailTitle">{{ t("assistant.summaries.detail_title") }}</h3>
          <p :class="styles.summaryDetailMeta">
            {{ t("assistant.summaries.covers_label", { n: selected.covers_up_to_message_id }) }}
            ·
            {{
              t("assistant.summaries.token_estimate", {
                n: estimate_summary_tokens(selected.text),
              })
            }}
          </p>
          <p :class="styles.summaryDetailText">{{ selected.text }}</p>
        </article>

        <div :class="styles.summaryGraphWrapper">
          <AssistantSummaryGraph
            :summaries="summaries"
            :selected-id="selected_id"
            @select="select"
          />
        </div>
      </div>
    </StateSurface>

    <ConfirmDialog
      :open="delete_target !== null"
      :title="t('assistant.summaries.delete_confirm_title')"
      :description="t('assistant.summaries.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="delete_pending"
      @update:open="(open) => !open && (delete_target = null)"
      @confirm="confirm_delete"
    />
  </section>
</template>
