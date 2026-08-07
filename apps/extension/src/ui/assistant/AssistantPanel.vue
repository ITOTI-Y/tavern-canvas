<script setup lang="ts">
import {
  Download,
  Loader2,
  MonitorUp,
  Paperclip,
  Pencil,
  Plus,
  SendHorizontal,
  Square,
  Trash2,
} from "lucide-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import type { AssistantTaskStripEntry } from "../../modules/assistant/assistant_module.js";
import type {
  AssistantImageAttachment,
  AssistantMessageRecord,
  AssistantSession,
} from "../../modules/assistant/assistant_session.js";
import type { SettingsDraftDiff } from "../../modules/assistant/settings_draft_tools.js";
import AppButton from "../components/AppButton.vue";
import IconButton from "../components/IconButton.vue";
import StateSurface from "../components/StateSurface.vue";
import AssistantDraftReview from "./AssistantDraftReview.vue";
import AssistantMessage from "./AssistantMessage.vue";
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
  readonly pendingDraft: SettingsDraftDiff | null;
  readonly screenCaptureActive: boolean;
  readonly sending: boolean;
}>();

const emit = defineEmits<{
  send: [text: string, images: readonly AssistantImageAttachment[]];
  abort: [];
  "new-session": [];
  "switch-session": [id: string];
  "rename-session": [id: string];
  "delete-session": [id: string];
  "export-session": [id: string];
  "load-older": [];
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
    <aside :class="styles.sessionRail">
      <div :class="styles.sessionRailHeader">
        <span>{{ t("assistant.panel_title") }}</span>
        <IconButton :icon="Plus" size="sm" :label="t('assistant.new_chat_action')" @click="emit('new-session')" />
      </div>
      <StateSurface :status="sessions.length === 0 ? 'empty' : 'ready'" :empty-message="t('assistant.sessions_empty.description')">
        <template #action>
          <AppButton :label="t('assistant.sessions_empty.action')" variant="primary" @click="emit('new-session')" />
        </template>
        <ul :class="styles.sessionList">
          <li v-for="session in sessions" :key="session.id">
            <div
              :class="[styles.sessionItem, session.id === activeSessionId && styles.sessionItemActive]"
              role="button"
              tabindex="0"
              @click="emit('switch-session', session.id)"
              @keydown.enter="emit('switch-session', session.id)"
            >
              <span :class="styles.sessionItemTitle">{{ session.title }}</span>
              <span :class="styles.messageActions">
                <IconButton
                  :icon="Pencil"
                  size="sm"
                  :label="t('assistant.rename_session_action')"
                  @click.stop="emit('rename-session', session.id)"
                />
                <IconButton
                  :icon="Download"
                  size="sm"
                  :label="t('assistant.export_session_action')"
                  @click.stop="emit('export-session', session.id)"
                />
                <IconButton
                  :icon="Trash2"
                  size="sm"
                  destructive
                  :label="t('assistant.delete_session_action')"
                  @click.stop="emit('delete-session', session.id)"
                />
              </span>
            </div>
          </li>
        </ul>
      </StateSurface>
    </aside>

    <div :class="styles.conversationColumn">
      <div :class="styles.messageList">
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
      </div>

      <div v-if="taskStrip.length > 0" :class="styles.taskStrip" data-testid="assistant-task-strip">
        <span v-for="entry in taskStrip" :key="entry.job_id" :class="styles.taskChip">
          <Loader2 :size="12" />
          {{ t("assistant.task_strip_generating", { prompt: entry.positive_prompt }) }}
        </span>
      </div>

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
            :label="screenCaptureActive ? t('assistant.screen_capture_stop_action') : t('assistant.screen_capture_start_action')"
            @click="emit('screen-capture-toggle')"
          />
          <IconButton
            v-if="!sending"
            :icon="SendHorizontal"
            :label="t('assistant.send_action')"
            @click="handle_send"
          />
          <IconButton v-else :icon="Square" :label="t('assistant.abort_action')" @click="emit('abort')" />
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
