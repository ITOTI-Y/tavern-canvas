<script setup lang="ts">
import { Maximize2, Pencil, RefreshCw, SendHorizontal } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import IconButton from "../components/IconButton.vue";
import { render_assistant_markdown } from "../../modules/assistant/assistant_markdown.js";
import type { AssistantMessageRecord } from "../../modules/assistant/assistant_session.js";
import styles from "./assistant.module.css";

const props = defineProps<{
  readonly message: AssistantMessageRecord;
  readonly streaming?: boolean;
}>();

const emit = defineEmits<{
  edit: [messageId: string, newContent: string];
  resend: [messageId: string];
  regenerate: [messageId: string];
  "choice-select": [value: string];
  "image-zoom": [imageId: string];
}>();

const { t } = useI18n();

const rendered_html = ref("");
const thinking = ref<string | null>(null);
const ask_choices = ref<readonly string[]>([]);
const thinking_open = ref(false);
const tool_calls_open = ref(false);
const editing = ref(false);
const draft_content = ref(props.message.content);

watch(
  () => props.message.content,
  async (content) => {
    const result = await render_assistant_markdown(content);
    rendered_html.value = result.html;
    thinking.value = result.thinking;
    ask_choices.value = result.ask_choices;
  },
  { immediate: true },
);

const is_user = computed(() => props.message.role === "user");

function start_edit(): void {
  draft_content.value = props.message.content;
  editing.value = true;
}

function submit_edit(): void {
  editing.value = false;
  if (draft_content.value.trim().length > 0 && draft_content.value !== props.message.content) {
    emit("edit", props.message.message_id, draft_content.value);
  }
}
</script>

<template>
  <div :class="[styles.message, is_user ? styles.messageUser : styles.messageAssistant]">
    <div v-if="thinking" :class="styles.thinkingBlock">
      <button
        type="button"
        :class="styles.thinkingSummary"
        :aria-expanded="thinking_open"
        @click="thinking_open = !thinking_open"
      >
        {{ t("assistant.thinking_toggle") }}
      </button>
      <p v-if="thinking_open" :class="styles.thinkingContent">{{ thinking }}</p>
    </div>

    <div v-if="editing" :class="styles.messageBubble">
      <textarea v-model="draft_content" :class="styles.inputTextarea" rows="3" />
      <IconButton
        :icon="SendHorizontal"
        :label="t('assistant.message_resend_action')"
        @click="submit_edit"
      />
    </div>
    <!-- rendered_html is DOMPurify-sanitized by render_assistant_markdown. -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-else :class="styles.messageBubble" v-html="rendered_html" />

    <div v-if="message.images.length > 0" :class="styles.imageStrip">
      <img
        v-for="image in message.images"
        :key="image.image_id"
        :src="image.data_url"
        :class="styles.imageThumbnail"
        alt=""
        @click="emit('image-zoom', image.image_id)"
      />
    </div>

    <div v-if="ask_choices.length > 0" :class="styles.choiceRow">
      <p :class="styles.choiceHint">{{ t("assistant.ask_choice_hint") }}</p>
      <div :class="styles.choiceButtons">
        <button
          v-for="choice in ask_choices"
          :key="choice"
          type="button"
          :class="styles.choiceButton"
          @click="emit('choice-select', choice)"
        >
          {{ choice }}
        </button>
      </div>
    </div>

    <div v-if="message.tool_calls.length > 0" :class="styles.toolCallBlock">
      <button
        type="button"
        :class="styles.toolCallSummary"
        :aria-expanded="tool_calls_open"
        @click="tool_calls_open = !tool_calls_open"
      >
        {{ t("assistant.tool_call_toggle") }} ({{ message.tool_calls.length }})
      </button>
      <template v-if="tool_calls_open">
        <p v-for="(call, index) in message.tool_calls" :key="index" :class="styles.toolCallEntry">
          {{ call.tool_name }}: {{ call.result }}
        </p>
      </template>
    </div>

    <div v-if="!editing" :class="styles.messageActions">
      <IconButton
        v-if="is_user"
        :icon="Pencil"
        size="sm"
        :label="t('assistant.message_edit_action')"
        @click="start_edit"
      />
      <IconButton
        v-if="is_user"
        :icon="SendHorizontal"
        size="sm"
        :label="t('assistant.message_resend_action')"
        @click="emit('resend', message.message_id)"
      />
      <IconButton
        v-if="!is_user"
        :icon="RefreshCw"
        size="sm"
        :label="t('assistant.message_regenerate_action')"
        @click="emit('regenerate', message.message_id)"
      />
      <IconButton
        v-if="message.images.length > 0"
        :icon="Maximize2"
        size="sm"
        :label="t('assistant.message_edit_action')"
        @click="emit('image-zoom', message.images[0]?.image_id ?? '')"
      />
    </div>
  </div>
</template>
