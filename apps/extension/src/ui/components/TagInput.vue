<script setup lang="ts">
import { X } from "lucide-vue-next";
import { PopoverAnchor, PopoverContent, PopoverPortal, PopoverRoot } from "reka-ui";
import { computed, inject, onBeforeUnmount, ref, useId } from "vue";
import { useI18n } from "vue-i18n";

import type { TagSuggestion } from "../../modules/translation/prompt_translator.js";
import { PORTAL_TARGET_KEY, TAG_SUGGESTIONS_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components_styles.js";

const SUGGEST_DELAY_MS = 150;
const SEPARATOR = /[,，]/u;
const CJK_PATTERN = /[぀-ヿ㐀-鿿豈-﫿]/u;

const props = withDefaults(
  defineProps<{
    /** Comma-separated tags, the form asset payloads store them in. */
    readonly modelValue: string;
    readonly id?: string | undefined;
    readonly describedBy?: string | undefined;
  }>(),
  { id: undefined, describedBy: undefined },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { t, locale } = useI18n();
const source = inject(TAG_SUGGESTIONS_KEY, null);
const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
const listbox_id = `${useId()}-suggestions`;

const input = ref<HTMLInputElement | null>(null);
const draft = ref("");
const suggestions = ref<readonly TagSuggestion[]>([]);
const highlighted = ref(0);
let suggest_timer: ReturnType<typeof setTimeout> | null = null;
let suggest_sequence = 0;

const tags = computed(() => [
  ...new Set(
    props.modelValue
      .split(SEPARATOR)
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
  ),
]);
const open = computed(() => suggestions.value.length > 0);
const compact_number = computed(
  () => new Intl.NumberFormat(locale.value, { notation: "compact", maximumFractionDigits: 1 }),
);

function emit_tags(next: readonly string[]): void {
  emit("update:modelValue", [...new Set(next)].join(", "));
}

function add_tags(added: readonly string[]): void {
  const fresh = added.map((tag) => tag.trim()).filter((tag) => tag !== "");
  if (fresh.length > 0) {
    emit_tags([...tags.value, ...fresh]);
  }
}

function remove_tag(tag: string): void {
  emit_tags(tags.value.filter((candidate) => candidate !== tag));
  input.value?.focus();
}

function close_suggestions(): void {
  suggest_sequence += 1;
  if (suggest_timer !== null) {
    clearTimeout(suggest_timer);
    suggest_timer = null;
  }
  suggestions.value = [];
  highlighted.value = 0;
}

/** Looks up tags for the draft, dropping answers a later keystroke made stale. */
function schedule_suggestions(): void {
  const query = draft.value.trim();
  const long_enough = CJK_PATTERN.test(query) ? query.length >= 1 : query.length >= 2;
  if (source === null || !long_enough) {
    close_suggestions();
    return;
  }
  if (suggest_timer !== null) {
    clearTimeout(suggest_timer);
  }
  const sequence = ++suggest_sequence;
  suggest_timer = setTimeout(() => {
    void source.suggest(query).then((found) => {
      if (sequence === suggest_sequence) {
        suggestions.value = (found ?? []).filter((item) => !tags.value.includes(item.tag));
        highlighted.value = 0;
      }
    });
  }, SUGGEST_DELAY_MS);
}

/** A typed or pasted separator turns everything before it into tags. */
function on_input(event: Event): void {
  const parts = (event.target as HTMLInputElement).value.split(SEPARATOR);
  const rest = parts.pop() ?? "";
  add_tags(parts);
  draft.value = parts.length > 0 ? rest.trimStart() : rest;
  schedule_suggestions();
}

function commit_draft(): void {
  add_tags([draft.value]);
  draft.value = "";
  close_suggestions();
}

function accept(index: number): void {
  const suggestion = suggestions.value[index];
  if (suggestion === undefined) {
    return;
  }
  add_tags([suggestion.tag]);
  draft.value = "";
  close_suggestions();
  input.value?.focus();
}

function on_keydown(event: KeyboardEvent): void {
  const count = suggestions.value.length;
  if ((event.key === "ArrowDown" || event.key === "ArrowUp") && count > 0) {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    highlighted.value = (highlighted.value + step + count) % count;
  } else if (event.key === "Enter") {
    // Enter adds a tag here; it never submits the surrounding form.
    event.preventDefault();
    if (count > 0) {
      accept(highlighted.value);
    } else {
      commit_draft();
    }
  } else if (event.key === "Escape" && count > 0) {
    // Only the list closes; the panel around the field stays open.
    event.stopPropagation();
    close_suggestions();
  } else if (event.key === "Backspace" && draft.value === "" && tags.value.length > 0) {
    emit_tags(tags.value.slice(0, -1));
  }
}

/** Splits a suggestion into the typed prefix, shown bold, and the rest. */
function match_parts(tag: string): readonly [string, string] {
  const query = draft.value.trim().toLowerCase();
  return tag.toLowerCase().startsWith(query) && query !== ""
    ? [tag.slice(0, query.length), tag.slice(query.length)]
    : ["", tag];
}

function keep_open_for_field(event: Event): void {
  if (event.target instanceof Node && input.value?.parentElement?.contains(event.target)) {
    event.preventDefault();
  }
}

onBeforeUnmount(close_suggestions);
</script>

<template>
  <PopoverRoot :open="open" @update:open="(next) => !next && close_suggestions()">
    <PopoverAnchor as-child>
      <div :class="styles.tagInput" @click.self="input?.focus()">
        <span v-for="tag in tags" :key="tag" :class="styles.tagInputChip">
          {{ tag }}
          <button
            type="button"
            class="tc-interactive"
            :class="styles.tagInputRemove"
            :aria-label="t('common.tag_input.remove', { tag })"
            @click="remove_tag(tag)"
          >
            <AppIcon :icon="X" :size="12" />
          </button>
        </span>
        <input
          :id="id"
          ref="input"
          :value="draft"
          type="text"
          autocomplete="off"
          :class="styles.tagInputField"
          :placeholder="t('common.tag_input.placeholder')"
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="open"
          :aria-controls="open ? listbox_id : undefined"
          :aria-activedescendant="open ? `${listbox_id}-${highlighted}` : undefined"
          :aria-describedby="describedBy"
          @input="on_input"
          @keydown="on_keydown"
          @blur="commit_draft"
        />
      </div>
    </PopoverAnchor>
    <PopoverPortal v-bind="portal_props">
      <PopoverContent
        :class="styles.tagInputPopover"
        side="bottom"
        align="start"
        :side-offset="4"
        @open-auto-focus.prevent
        @close-auto-focus.prevent
        @pointer-down-outside="keep_open_for_field"
        @focus-outside.prevent
      >
        <ul
          :id="listbox_id"
          role="listbox"
          :aria-label="t('common.tag_input.suggestions_label')"
          :class="styles.tagInputList"
        >
          <li
            v-for="(suggestion, index) in suggestions"
            :id="`${listbox_id}-${index}`"
            :key="suggestion.tag"
            role="option"
            :aria-selected="index === highlighted"
            :class="styles.tagInputOption"
            @mousedown.prevent="accept(index)"
            @mousemove="highlighted = index"
          >
            <span :class="styles.tagInputOptionTag"
              ><b>{{ match_parts(suggestion.tag)[0] }}</b
              >{{ match_parts(suggestion.tag)[1] }}</span
            >
            <span :class="styles.tagInputOptionTranslation">{{
              suggestion.translation ?? ""
            }}</span>
            <span :class="styles.tagInputOptionCount" class="tc-tabular-nums">{{
              compact_number.format(suggestion.popularity)
            }}</span>
          </li>
        </ul>
        <div :class="styles.tagInputHints" aria-hidden="true">
          <span><kbd>↑</kbd> <kbd>↓</kbd> {{ t("common.tag_input.hint_select") }}</span>
          <span><kbd>Enter</kbd> {{ t("common.tag_input.hint_add") }}</span>
          <span><kbd>Esc</kbd> {{ t("common.tag_input.hint_close") }}</span>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
