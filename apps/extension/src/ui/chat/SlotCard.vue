<script setup lang="ts">
import type { IllustrationSlot, Uuid } from "@tavern-canvas/contracts";
import { ChevronLeft, ChevronRight, Ellipsis, Pencil, RefreshCw } from "lucide-vue-next";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import styles from "./chat.module.css";
import type { QuickEditKind } from "./quick_edit_request.js";
import { slot_error_label } from "./slot_error_label.js";
import type { ImageUrlLoader } from "./use_image_urls.js";

const props = defineProps<{
  readonly entry: IllustrationSlot;
  /** A request id is in flight in this session; ids left over from a reload are not. */
  readonly pending: boolean;
  readonly loadImage: ImageUrlLoader;
  /** The active provider profile supports quick edits of an existing image. */
  readonly canEdit: boolean;
}>();

const emit = defineEmits<{
  generate: [];
  edit: [];
  select: [image_id: Uuid];
  preview: [image_id: Uuid];
  "quick-edit": [kind: QuickEditKind, image_id: Uuid];
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

const QUICK_EDITS: readonly { readonly kind: QuickEditKind; readonly label: () => string }[] = [
  { kind: "img2img", label: () => t("chat.quick_edit.img2img") },
  { kind: "inpaint", label: () => t("chat.quick_edit.inpaint") },
  { kind: "upscale", label: () => t("chat.quick_edit.upscale") },
  { kind: "augment", label: () => t("chat.quick_edit.director") },
];

const menu_open = ref(false);
const menu_root = ref<HTMLElement | null>(null);

function close_menu_outside(event: PointerEvent): void {
  if (event.target instanceof Node && !menu_root.value?.contains(event.target)) {
    menu_open.value = false;
  }
}

watch(menu_open, (open) => {
  if (open) {
    document.addEventListener("pointerdown", close_menu_outside);
  } else {
    document.removeEventListener("pointerdown", close_menu_outside);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", close_menu_outside);
});

function quick_edit(kind: QuickEditKind): void {
  menu_open.value = false;
  if (props.entry.active_image_id !== null) {
    emit("quick-edit", kind, props.entry.active_image_id);
  }
}

function step(offset: number): void {
  const image_id = props.entry.image_ids[active_index.value + offset];
  if (image_id !== undefined) {
    emit("select", image_id);
  }
}
</script>

<template>
  <figure :class="styles.slot" data-tc-slot-card>
    <div :class="styles.frame">
      <img
        v-if="image_url !== null && entry.active_image_id !== null"
        :class="styles.image"
        :src="image_url"
        :alt="entry.scene"
        @click="emit('preview', entry.active_image_id)"
      />
      <div v-else :class="styles.placeholder">
        <span v-if="pending" :class="styles.skeleton" aria-hidden="true" />
        <span v-if="pending" :class="styles.status">{{ t("chat.slot.generating") }}</span>
        <span v-else-if="load_failed" :class="[styles.status, styles.error]">{{
          t("chat.slot.image_missing")
        }}</span>
        <span v-else-if="entry.last_error !== null" :class="[styles.status, styles.error]">
          {{ t("chat.slot.failed", { reason: slot_error_label(t, entry.last_error) }) }}
        </span>
        <span v-else-if="interrupted" :class="styles.status">{{ t("chat.slot.interrupted") }}</span>
      </div>
    </div>
    <figcaption :class="styles.toolbar">
      <span v-if="entry.image_ids.length > 1" :class="styles.pager">
        <button
          type="button"
          :class="[styles.button, styles.icon_button]"
          :disabled="active_index <= 0"
          :aria-label="t('chat.slot.previous')"
          @click="step(-1)"
        >
          <AppIcon :icon="ChevronLeft" :size="16" />
        </button>
        <span :class="styles.counter">{{ active_index + 1 }} / {{ entry.image_ids.length }}</span>
        <button
          type="button"
          :class="[styles.button, styles.icon_button]"
          :disabled="active_index >= entry.image_ids.length - 1"
          :aria-label="t('chat.slot.next')"
          @click="step(1)"
        >
          <AppIcon :icon="ChevronRight" :size="16" />
        </button>
      </span>
      <span :class="styles.scene" :title="entry.scene">{{ entry.scene }}</span>
      <span :class="styles.actions">
        <button type="button" :class="styles.button" :disabled="pending" @click="emit('generate')">
          <AppIcon :icon="RefreshCw" :size="16" />
          <span :class="styles.button_label">{{
            entry.image_ids.length === 0 ? t("chat.slot.generate") : t("chat.slot.regenerate")
          }}</span>
        </button>
        <button type="button" :class="styles.button" @click="emit('edit')">
          <AppIcon :icon="Pencil" :size="16" />
          <span :class="styles.button_label">{{ t("chat.slot.edit") }}</span>
        </button>
        <span v-if="canEdit && entry.active_image_id !== null" ref="menu_root" :class="styles.more">
          <button
            type="button"
            :class="[styles.button, styles.icon_button]"
            :aria-label="t('chat.slot.more')"
            aria-haspopup="menu"
            :aria-expanded="menu_open"
            @click="menu_open = !menu_open"
            @keydown.esc="menu_open = false"
          >
            <AppIcon :icon="Ellipsis" :size="16" />
          </button>
          <span v-if="menu_open" role="menu" :class="styles.menu" @keydown.esc="menu_open = false">
            <button
              v-for="kind in QUICK_EDITS"
              :key="kind.kind"
              type="button"
              role="menuitem"
              :class="styles.menu_item"
              :disabled="pending"
              @click="quick_edit(kind.kind)"
            >
              {{ kind.label() }}
            </button>
          </span>
        </span>
      </span>
    </figcaption>
  </figure>
</template>
