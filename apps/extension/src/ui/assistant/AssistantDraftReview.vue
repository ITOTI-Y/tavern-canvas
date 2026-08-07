<script setup lang="ts">
import { useI18n } from "vue-i18n";

import type { SettingsDraftDiff } from "../../modules/assistant/settings_draft_tools.js";
import AppButton from "../components/AppButton.vue";
import AppDialog from "../components/AppDialog.vue";
import styles from "./assistant.module.css";

/**
 * The Review-then-Apply gate: shows exactly the typed `SettingsDraftDiff` `settings_draft_tools.
 * create_settings_draft` produced, and nothing else. `apply`/`discard` are events only -- this
 * component never imports `apply_settings_draft` or a settings capability itself, so it cannot
 * become a second path to a hidden auto-execute.
 */
defineProps<{
  readonly open: boolean;
  readonly draft: SettingsDraftDiff | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  apply: [];
  discard: [];
}>();

const { t } = useI18n();
</script>

<template>
  <AppDialog
    :open="open"
    :title="t('assistant.draft_review.title')"
    :description="t('assistant.draft_review.description')"
    :close-label="t('common.actions.close')"
    @update:open="(value) => emit('update:open', value)"
  >
    <div :class="styles.draftReview">
      <p v-if="!draft || draft.changes.length === 0" :class="styles.draftDescription">
        {{ t("assistant.draft_review.empty") }}
      </p>
      <div v-else :class="styles.draftChangeList">
        <div v-for="change in draft.changes" :key="change.path" :class="styles.draftChangeRow">
          <span :class="styles.draftChangePath">{{ change.path }}</span>
          <span>{{ t("assistant.draft_review.from_label") }}: {{ String(change.from) }}</span>
          <span>{{ t("assistant.draft_review.to_label") }}: {{ String(change.to) }}</span>
        </div>
      </div>
      <div :class="styles.draftReviewActions">
        <AppButton :label="t('assistant.draft_review.discard_action')" @click="emit('discard')" />
        <AppButton
          :label="t('assistant.draft_review.apply_action')"
          variant="primary"
          :disabled="!draft || draft.changes.length === 0"
          @click="emit('apply')"
        />
      </div>
    </div>
  </AppDialog>
</template>
