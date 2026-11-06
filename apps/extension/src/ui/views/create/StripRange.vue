<script setup lang="ts">
import { MessageCircle } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import type { StripMessageView } from "../../contracts/creation_port.js";
import styles from "./create_styles.js";

const PAGE = 40;

const props = defineProps<{
  readonly messages: readonly StripMessageView[];
  readonly from: number;
  readonly to: number;
}>();

const emit = defineEmits<{
  change: [from: number, to: number];
}>();

const { t } = useI18n();

const shown_count = ref(PAGE);
const shown = computed(() => props.messages.slice(-shown_count.value));
const chosen_count = computed(
  () =>
    props.messages.filter(
      (message) => message.message_id >= props.from && message.message_id <= props.to,
    ).length,
);

/** The first click starts a new range at that message; the next one closes it. */
const anchor = ref<number | null>(null);

function pick(message_id: number): void {
  if (anchor.value === null) {
    anchor.value = message_id;
    emit("change", message_id, message_id);
    return;
  }
  emit("change", Math.min(anchor.value, message_id), Math.max(anchor.value, message_id));
  anchor.value = null;
}

function latest_reply(): void {
  const reply = props.messages.findLast((message) => !message.is_user);
  if (reply !== undefined) {
    anchor.value = null;
    emit("change", reply.message_id, reply.message_id);
  }
}

function bound_label(message_id: number): string {
  if (message_id === props.from) {
    return t("create.range_from");
  }
  return message_id === props.to ? t("create.range_to") : "";
}

function excerpt(text: string): string {
  return text.slice(0, 400).replace(/\s+/gu, " ").trim();
}
</script>

<template>
  <div :class="styles.range_summary">
    <AppIcon :icon="MessageCircle" />
    <span>{{
      t("create.range_summary", { from: `#${from}`, to: `#${to}`, n: chosen_count })
    }}</span>
    <span :class="styles.range_summary_action">
      <AppButton :label="t('create.range_latest')" variant="ghost" @click="latest_reply" />
    </span>
  </div>
  <p :class="styles.hint">
    {{ anchor === null ? t("create.range_hint_start") : t("create.range_hint_end") }}
  </p>
  <div :class="styles.range" role="group" :aria-label="t('create.range_label')">
    <AppButton
      v-if="shown.length < messages.length"
      :label="t('create.range_more')"
      variant="ghost"
      @click="shown_count += PAGE"
    />
    <button
      v-for="message in shown"
      :key="message.message_id"
      type="button"
      class="tc-interactive"
      :class="styles.message"
      :data-in-range="String(message.message_id >= from && message.message_id <= to)"
      :data-edge="String(message.message_id === from || message.message_id === to)"
      :data-user="String(message.is_user)"
      :aria-pressed="message.message_id >= from && message.message_id <= to"
      @click="pick(message.message_id)"
    >
      <span :class="styles.bound">{{ bound_label(message.message_id) }}</span>
      <span :class="styles.message_body">
        <span :class="styles.message_name"
          >{{ message.name
          }}<span :class="styles.message_number">#{{ message.message_id }}</span></span
        >
        <span :class="styles.message_excerpt">{{ excerpt(message.text) }}</span>
      </span>
    </button>
  </div>
</template>
