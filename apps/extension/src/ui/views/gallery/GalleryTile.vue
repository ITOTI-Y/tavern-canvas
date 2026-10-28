<script setup lang="ts">
import { Check, ImageOff, Pin } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import AppIcon from "../../components/AppIcon.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import styles from "./gallery_styles.js";

const props = defineProps<{
  readonly record: GalleryRecordSummary;
  readonly selected: boolean;
  /** The tile's picture, read only once the tile scrolls near the viewport. */
  readonly readImage: (record: GalleryRecordSummary) => Promise<Blob>;
  readonly thumbnailFailedLabel: string;
  readonly pinnedLabel: string;
  readonly selectLabel: string;
  readonly openLabel: string;
}>();

const emit = defineEmits<{
  open: [];
  "toggle-select": [];
}>();

const root = ref<HTMLElement | null>(null);
const url = ref<string | null>(null);
const failed = ref(false);
const decoded = ref(false);
let observer: IntersectionObserver | null = null;
let disposed = false;

/** Reserves the image's box before it loads, so the columns never reflow. */
const aspect_ratio = computed(() => {
  const { width, height } = props.record;
  return width !== null && height !== null && width > 0 && height > 0
    ? `${String(width)} / ${String(height)}`
    : "1 / 1";
});

async function load(): Promise<void> {
  try {
    const blob = await props.readImage(props.record);
    if (!disposed) {
      url.value = URL.createObjectURL(blob);
    }
  } catch {
    failed.value = true;
  }
}

onMounted(() => {
  if (typeof IntersectionObserver === "undefined" || root.value === null) {
    void load();
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer?.disconnect();
        void load();
      }
    },
    { rootMargin: "400px" },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  disposed = true;
  observer?.disconnect();
  if (url.value !== null) {
    URL.revokeObjectURL(url.value);
  }
});
</script>

<template>
  <li
    ref="root"
    :class="styles.tile"
    :style="{ aspectRatio: aspect_ratio }"
    :data-selected="selected ? '' : null"
    :data-failed="failed ? '' : null"
  >
    <button
      type="button"
      :class="styles.tileButton"
      :aria-label="`${openLabel}: ${record.id}`"
      @click="emit('open')"
    >
      <img
        v-if="url !== null"
        :src="url"
        decoding="async"
        alt=""
        :class="styles.tileImage"
        :data-decoded="decoded ? '' : null"
        @load="decoded = true"
      />
      <span v-else-if="failed" :class="styles.tileFallback">
        <AppIcon :icon="ImageOff" :size="20" />
        <span>{{ thumbnailFailedLabel }}</span>
      </span>
    </button>

    <span v-if="record.pinned" role="img" :class="styles.tilePinnedBadge" :aria-label="pinnedLabel">
      <AppIcon :icon="Pin" :size="14" />
    </span>

    <button
      type="button"
      :class="styles.tileSelectToggle"
      :aria-pressed="selected"
      :aria-label="`${selectLabel}: ${record.id}`"
      @click.stop="emit('toggle-select')"
    >
      <AppIcon :icon="Check" :size="14" />
    </button>
  </li>
</template>
