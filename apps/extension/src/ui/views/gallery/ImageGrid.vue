<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import { layout_masonry_columns } from "./image_layout.js";
import styles from "./gallery_styles.js";
import GalleryTile from "./GalleryTile.vue";

/** Matches --tc-tile-min and --tc-tile-gap; narrow workspaces always get two columns. */
const TILE_MIN_PX = 168;
const TILE_GAP_PX = 10;
const NARROW_COLUMNS = 2;
const NARROW_MAX_PX = 640;

const props = defineProps<{
  readonly records: readonly GalleryRecordSummary[];
  readonly selectedIds: ReadonlySet<string>;
  readonly readImage: (record: GalleryRecordSummary) => Promise<Blob>;
  readonly thumbnailFailedLabel: string;
  readonly pinnedLabel: string;
  readonly selectLabel: string;
  readonly openLabel: string;
  readonly ariaLabel: string;
  readonly widthOverride?: number;
}>();

const emit = defineEmits<{
  open: [record_id: string];
  "toggle-select": [record_id: string];
}>();

const container = ref<HTMLElement | null>(null);
const measured_width = ref(0);
let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!container.value || typeof ResizeObserver === "undefined") {
    return;
  }
  observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (entry) {
      measured_width.value = entry.contentRect.width;
    }
  });
  observer.observe(container.value);
  measured_width.value = container.value.clientWidth;
});

onUnmounted(() => {
  observer?.disconnect();
});

const column_count = computed(() => {
  const width = props.widthOverride ?? measured_width.value;
  if (width <= NARROW_MAX_PX) {
    return NARROW_COLUMNS;
  }
  return Math.max(1, Math.floor((width + TILE_GAP_PX) / (TILE_MIN_PX + TILE_GAP_PX)));
});

const columns = computed(() => layout_masonry_columns(props.records, column_count.value));
</script>

<template>
  <div ref="container" :class="styles.masonry" role="list" :aria-label="ariaLabel">
    <ul v-for="(column, index) in columns" :key="index" :class="styles.masonryColumn" role="none">
      <GalleryTile
        v-for="record in column"
        :key="record.id"
        role="listitem"
        :record="record"
        :selected="selectedIds.has(record.id)"
        :read-image="readImage"
        :thumbnail-failed-label="thumbnailFailedLabel"
        :pinned-label="pinnedLabel"
        :select-label="selectLabel"
        :open-label="openLabel"
        @open="emit('open', record.id)"
        @toggle-select="emit('toggle-select', record.id)"
      />
    </ul>
  </div>
</template>
