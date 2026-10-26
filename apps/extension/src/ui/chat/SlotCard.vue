<script setup lang="ts">
import type { IllustrationSlot, Uuid } from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import styles from "./chat.module.css";
import { slot_error_label } from "./slot_error_label.js";
import type { ImageUrlLoader } from "./use_image_urls.js";

const props = defineProps<{
  readonly entry: IllustrationSlot;
  /** A request id is in flight in this session; ids left over from a reload are not. */
  readonly pending: boolean;
  readonly loadImage: ImageUrlLoader;
}>();

const emit = defineEmits<{
  generate: [];
  edit: [];
  select: [image_id: Uuid];
  preview: [image_id: Uuid];
}>();

const { t } = useI18n();
const image_url = ref<string | null>(null);
const load_failed = ref(false);

const active_index = computed(() =>
  props.entry.active_image_id === null
    ? -1
    : props.entry.image_ids.indexOf(props.entry.active_image_id),
);
const interrupted = computed(() => !props.pending && props.entry.pending_request_ids.length > 0);

watch(
  () => props.entry.active_image_id,
  (image_id) => {
    image_url.value = null;
    load_failed.value = false;
    if (image_id === null) {
      return;
    }
    props.loadImage(image_id).then(
      (url) => {
        if (props.entry.active_image_id === image_id) {
          image_url.value = url;
        }
      },
      () => {
        load_failed.value = true;
      },
    );
  },
  { immediate: true },
);

function step(offset: number): void {
  const image_id = props.entry.image_ids[active_index.value + offset];
  if (image_id !== undefined) {
    emit("select", image_id);
  }
}
</script>

<template>
  <div :class="styles.slot" data-tc-slot-card>
    <div :class="styles.frame">
      <img
        v-if="image_url !== null && entry.active_image_id !== null"
        :class="styles.image"
        :src="image_url"
        :alt="entry.scene"
        @click="emit('preview', entry.active_image_id)"
      />
      <div v-else :class="styles.placeholder">
        <template v-if="pending">
          <span :class="styles.skeleton" aria-hidden="true" />
          <span>{{ t("chat.slot.generating") }}</span>
        </template>
        <span v-else-if="load_failed" :class="styles.error">{{
          t("chat.slot.image_missing")
        }}</span>
        <span v-else-if="entry.last_error !== null" :class="styles.error">
          {{ t("chat.slot.failed", { reason: slot_error_label(t, entry.last_error) }) }}
        </span>
        <span v-else-if="interrupted">{{ t("chat.slot.interrupted") }}</span>
        <span v-else>{{ entry.scene }}</span>
      </div>
    </div>
    <div :class="styles.toolbar">
      <span v-if="entry.image_ids.length > 1" :class="styles.counter">
        {{ active_index + 1 }} / {{ entry.image_ids.length }}
      </span>
      <span v-else :class="styles.counter" />
      <button
        v-if="entry.image_ids.length > 1"
        type="button"
        :class="styles.button"
        :disabled="active_index <= 0"
        :aria-label="t('chat.slot.previous')"
        @click="step(-1)"
      >
        ‹
      </button>
      <button
        v-if="entry.image_ids.length > 1"
        type="button"
        :class="styles.button"
        :disabled="active_index >= entry.image_ids.length - 1"
        :aria-label="t('chat.slot.next')"
        @click="step(1)"
      >
        ›
      </button>
      <button type="button" :class="styles.button" :disabled="pending" @click="emit('generate')">
        {{ entry.image_ids.length === 0 ? t("chat.slot.generate") : t("chat.slot.regenerate") }}
      </button>
      <button type="button" :class="styles.button" @click="emit('edit')">
        {{ t("chat.slot.edit") }}
      </button>
    </div>
  </div>
</template>
