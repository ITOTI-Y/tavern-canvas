<script setup lang="ts">
import { Loader2, MonitorUp, Paperclip, SendHorizontal, Square } from "lucide-vue-next";
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type {
  AssistantTask,
  AssistantTaskStripEntry,
} from "../../modules/assistant/assistant_module.js";
import type {
  AssistantImageAttachment,
  AssistantMessageRecord,
  AssistantSession,
  AssistantSummaryRecord,
} from "../../modules/assistant/assistant_session.js";
import type { SettingsDraftDiff } from "../../modules/assistant/settings_draft_tools.js";
import AppButton from "../components/AppButton.vue";
import IconButton from "../components/IconButton.vue";
import AssistantDraftReview from "./AssistantDraftReview.vue";
import AssistantMessage from "./AssistantMessage.vue";
import AssistantSessionHistory from "./AssistantSessionHistory.vue";
import AssistantSummaryPanel from "./AssistantSummaryPanel.vue";
import AssistantTaskTracker from "./AssistantTaskTracker.vue";
import styles from "./assistant.module.css";

/**
 * Presentational shell (mirrors WorkbenchView.vue's own controller-agnostic pattern): receives
 * session/message/task-strip/draft state and emits intent events. Mounting this into a live
 * controller and a floating-entry launcher is the stage's whole-review integration pass, same as
 * every other Studio view today (see task-5-report.md).
 */
const props = defineProps<{
  readonly sessions: readonly AssistantSession[];
  readonly activeSessionId: string | null;
  readonly messages: readonly AssistantMessageRecord[];
  readonly hasOlderMessages: boolean;
  readonly taskStrip: readonly AssistantTaskStripEntry[];
  readonly tasks: readonly AssistantTask[];
  readonly summaries: readonly AssistantSummaryRecord[];
  /** The in-flight assistant reply as it streams. Null once the turn has settled. */
  readonly streamingText: string | null;
  readonly pendingDraft: SettingsDraftDiff | null;
  readonly screenCaptureActive: boolean;
  readonly sending: boolean;
}>();

const emit = defineEmits<{
  send: [text: string, images: readonly AssistantImageAttachment[]];
  abort: [];
  "new-session": [];
  "switch-session": [id: string];
  "rename-session": [id: string, title: string];
  "delete-sessions": [ids: readonly string[]];
  "export-sessions": [ids: readonly string[]];
  "load-older": [];
  "clear-finished-tasks": [];
  "set-summary-enabled": [id: string, enabled: boolean];
  "delete-summary": [id: string];
  "regenerate-summary": [id: string];
  "edit-message": [messageId: string, newContent: string];
  "resend-message": [messageId: string];
  "regenerate-message": [messageId: string];
  "choice-select": [value: string];
  "image-zoom": [imageId: string];
  "attach-image": [];
  "screen-capture-toggle": [];
  "apply-draft": [];
  "discard-draft": [];
}>();

const { t } = useI18n();
const draft_input = ref("");
const draft_review_open = ref(false);
const message_list = ref<HTMLElement | null>(null);
const summary_open = ref(false);

/** Paging up is a scroll gesture rather than a button press, with the button kept as the explicit
 * fallback for keyboard and reduced-motion users. */
function handle_message_scroll(): void {
  const element = message_list.value;
  if (element && props.hasOlderMessages && element.scrollTop <= 48) {
    emit("load-older");
  }
}

/** Keeps the view pinned to the newest turn while a reply streams in, but only when the reader is
 * already at the bottom, so scrolling back through history is never yanked away. */
async function scroll_to_latest(): Promise<void> {
  await nextTick();
  const element = message_list.value;
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

watch(
  () => props.streamingText,
  (value) => {
    if (value !== null) {
      void scroll_to_latest();
    }
  },
);

function handle_send(): void {
  const text = draft_input.value.trim();
  if (text.length === 0 || props.sending) {
    return;
  }
  emit("send", text, []);
  draft_input.value = "";
}

function handle_input_keydown(event: KeyboardEvent): void {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handle_send();
  }
}
</script>

<template>
  <div :class="styles.panel" data-testid="assistant-panel">
    <AssistantSessionHistory
      :sessions="sessions"
      :active-session-id="activeSessionId"
      @new-session="emit('new-session')"
      @switch-session="(id) => emit('switch-session', id)"
      @rename-session="(id, title) => emit('rename-session', id, title)"
      @delete-sessions="(ids) => emit('delete-sessions', ids)"
      @export-sessions="(ids) => emit('export-sessions', ids)"
    />

    <div :class="styles.conversationColumn">
      <div
        ref="message_list"
        :class="styles.messageList"
        data-testid="assistant-message-list"
        @scroll="handle_message_scroll"
      >
        <AppButton
          v-if="hasOlderMessages"
          :label="t('assistant.load_older_action')"
          @click="emit('load-older')"
        />
        <AssistantMessage
          v-for="message in messages"
          :key="message.message_id"
          :message="message"
          @edit="(id, content) => emit('edit-message', id, content)"
          @resend="(id) => emit('resend-message', id)"
          @regenerate="(id) => emit('regenerate-message', id)"
          @choice-select="(value) => emit('choice-select', value)"
          @image-zoom="(id) => emit('image-zoom', id)"
        />
        <p
          v-if="streamingText !== null"
          :class="[styles.message, styles.messageAssistant]"
          aria-live="polite"
          data-testid="assistant-streaming-message"
        >
          <span :class="styles.messageBubble">{{ streamingText }}</span>
        </p>
      </div>

      <div v-if="taskStrip.length > 0" :class="styles.taskStrip" data-testid="assistant-task-strip">
        <span v-for="entry in taskStrip" :key="entry.job_id" :class="styles.taskChip">
          <Loader2 :size="12" />
          {{ t("assistant.task_strip_generating", { prompt: entry.positive_prompt }) }}
        </span>
      </div>

      <AssistantTaskTracker :tasks="tasks" @clear-finished="emit('clear-finished-tasks')" />

      <div :class="styles.summaryToggleRow">
        <AppButton
          :label="
            summary_open
              ? t('assistant.summaries.hide_action')
              : t('assistant.summaries.show_action', { n: summaries.length })
          "
          variant="secondary"
          data-testid="assistant-summary-toggle"
          @click="summary_open = !summary_open"
        />
      </div>

      <AssistantSummaryPanel
        v-if="summary_open"
        :summaries="summaries"
        @set-enabled="(id, enabled) => emit('set-summary-enabled', id, enabled)"
        @delete="(id) => emit('delete-summary', id)"
        @regenerate="(id) => emit('regenerate-summary', id)"
      />

      <div :class="styles.inputRow">
        <textarea
          v-model="draft_input"
          :class="styles.inputTextarea"
          :placeholder="t('assistant.input_placeholder')"
          rows="1"
          @keydown="handle_input_keydown"
        />
        <div :class="styles.inputActions">
          <IconButton
            :icon="Paperclip"
            :label="t('assistant.attach_image_action')"
            @click="emit('attach-image')"
          />
          <IconButton
            :icon="MonitorUp"
            :pressed="screenCaptureActive"
            :label="
              screenCaptureActive
                ? t('assistant.screen_capture_stop_action')
                : t('assistant.screen_capture_start_action')
            "
            @click="emit('screen-capture-toggle')"
          />
          <IconButton
            v-if="!sending"
            :icon="SendHorizontal"
            :label="t('assistant.send_action')"
            @click="handle_send"
          />
          <IconButton
            v-else
            :icon="Square"
            :label="t('assistant.abort_action')"
            @click="emit('abort')"
          />
        </div>
      </div>
    </div>

    <AssistantDraftReview
      :open="draft_review_open || pendingDraft !== null"
      :draft="pendingDraft"
      @update:open="(value) => (draft_review_open = value)"
      @apply="emit('apply-draft')"
      @discard="emit('discard-draft')"
    />
  </div>
</template>
