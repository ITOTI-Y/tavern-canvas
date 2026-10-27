<script setup lang="ts">
import { BookOpenText, Languages } from "lucide-vue-next";
import { nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import { useI18n } from "vue-i18n";

import type {
  PromptTranslator,
  TagSuggestion,
} from "../../modules/translation/prompt_translator.js";
import IconButton from "../components/IconButton.vue";
import dialog_styles from "./illustrate_dialog.module.css";
import styles from "./prompt_field.module.css";
import { apply_suggestion, popularity_tier, token_at, type TagToken } from "./tag_completion.js";

const SUGGEST_DELAY_MS = 150;
const READING_DELAY_MS = 800;

const props = defineProps<{
  readonly modelValue: string;
  readonly label: string;
  readonly translator: PromptTranslator | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { t } = useI18n();
const id = useId();
const listbox_id = `${id}-suggestions`;
const textarea = ref<HTMLTextAreaElement | null>(null);

const suggestions = ref<readonly TagSuggestion[]>([]);
const highlighted = ref(-1);
const preparing = ref(false);
let token: TagToken | null = null;
let suggest_timer: ReturnType<typeof setTimeout> | null = null;
let suggest_sequence = 0;

const reading_on = ref(false);
const reading = ref<string | null>(null);
const translating = ref(false);
const error = ref<string | null>(null);
let reading_timer: ReturnType<typeof setTimeout> | null = null;
let reading_sequence = 0;

function message_of(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause);
}

function close_suggestions(): void {
  suggest_sequence += 1;
  suggestions.value = [];
  highlighted.value = -1;
}

/** Looks up tags for whatever is typed at the caret, dropping answers a later keystroke made stale. */
function schedule_suggestions(): void {
  const element = textarea.value;
  const translator = props.translator;
  if (suggest_timer !== null) {
    clearTimeout(suggest_timer);
  }
  token = element === null ? null : token_at(element.value, element.selectionStart);
  if (translator === null || token === null) {
    close_suggestions();
    return;
  }
  const query = token.query;
  const sequence = ++suggest_sequence;
  suggest_timer = setTimeout(() => {
    void translator.suggest(query).then((found) => {
      if (sequence !== suggest_sequence) {
        return;
      }
      preparing.value = found === null;
      suggestions.value = found ?? [];
      highlighted.value = -1;
    });
  }, SUGGEST_DELAY_MS);
}

async function accept(index: number): Promise<void> {
  const suggestion = suggestions.value[index];
  if (suggestion === undefined || token === null) {
    return;
  }
  const applied = apply_suggestion(props.modelValue, token, suggestion.tag);
  close_suggestions();
  emit("update:modelValue", applied.value);
  await nextTick();
  textarea.value?.focus();
  textarea.value?.setSelectionRange(applied.caret, applied.caret);
}

function on_keydown(event: KeyboardEvent): void {
  const count = suggestions.value.length;
  if (count === 0) {
    return;
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    highlighted.value = (highlighted.value + step + count) % count;
  } else if (event.key === "Tab" || (event.key === "Enter" && highlighted.value >= 0)) {
    event.preventDefault();
    void accept(Math.max(highlighted.value, 0));
  } else if (event.key === "Escape") {
    // The dialog would otherwise close on the same key.
    event.stopPropagation();
    close_suggestions();
  }
}

function on_input(event: Event): void {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
  schedule_suggestions();
}

async function read(): Promise<void> {
  const translator = props.translator;
  if (translator === null) {
    return;
  }
  const sequence = ++reading_sequence;
  error.value = null;
  try {
    const text = await translator.read_in_chinese(props.modelValue);
    if (sequence === reading_sequence) {
      reading.value = text;
    }
  } catch (cause) {
    if (sequence === reading_sequence) {
      error.value = message_of(cause);
    }
  }
}

function toggle_reading(): void {
  reading_on.value = !reading_on.value;
  reading.value = null;
  if (reading_on.value) {
    void read();
  } else {
    reading_sequence += 1;
  }
}

async function to_tags(): Promise<void> {
  const translator = props.translator;
  if (translator === null) {
    return;
  }
  translating.value = true;
  error.value = null;
  try {
    emit("update:modelValue", await translator.to_tags(props.modelValue));
  } catch (cause) {
    error.value = message_of(cause);
  } finally {
    translating.value = false;
  }
}

watch(
  () => props.modelValue,
  () => {
    if (!reading_on.value) {
      return;
    }
    if (reading_timer !== null) {
      clearTimeout(reading_timer);
    }
    reading_timer = setTimeout(() => void read(), READING_DELAY_MS);
  },
);

onBeforeUnmount(() => {
  for (const timer of [suggest_timer, reading_timer]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
  }
});
</script>

<template>
  <div :class="styles.field">
    <div :class="styles.header">
      <label :for="id" :class="styles.label">{{ label }}</label>
      <span v-if="translator !== null" :class="styles.tools">
        <IconButton
          :icon="Languages"
          size="sm"
          :label="t('chat.dialog.translate_to_tags')"
          :disabled="translating"
          data-testid="translate-to-tags"
          @click="to_tags"
        />
        <IconButton
          :icon="BookOpenText"
          size="sm"
          :label="t('chat.dialog.read_in_chinese')"
          :pressed="reading_on"
          data-testid="read-in-chinese"
          @click="toggle_reading"
        />
      </span>
    </div>
    <textarea
      :id="id"
      ref="textarea"
      :value="modelValue"
      :class="dialog_styles.prompt"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="suggestions.length > 0"
      :aria-controls="listbox_id"
      :aria-activedescendant="highlighted >= 0 ? `${listbox_id}-${highlighted}` : undefined"
      @input="on_input"
      @click="schedule_suggestions"
      @keydown="on_keydown"
      @blur="close_suggestions"
    />
    <ul
      v-if="suggestions.length > 0"
      :id="listbox_id"
      role="listbox"
      :aria-label="t('chat.dialog.suggestions_label')"
      :class="styles.suggestions"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :id="`${listbox_id}-${index}`"
        :key="suggestion.tag"
        role="option"
        :aria-selected="index === highlighted"
        :class="[styles.suggestion, index === highlighted && styles.highlighted]"
        @mousedown.prevent="accept(index)"
      >
        <span>{{ suggestion.tag }}</span>
        <span v-if="suggestion.translation !== null" :class="styles.translation">
          {{ suggestion.translation }}
        </span>
        <span
          :class="[styles.dot, styles[`tier${popularity_tier(suggestion.popularity)}`]]"
          aria-hidden="true"
        />
      </li>
    </ul>
    <p v-else-if="preparing" :class="styles.hint">{{ t("chat.dialog.vocabulary_preparing") }}</p>
    <p v-if="reading_on" :class="styles.reading">
      {{ reading ?? t("chat.dialog.reading_pending") }}
    </p>
    <p v-if="error !== null" :class="dialog_styles.error">{{ error }}</p>
  </div>
</template>
