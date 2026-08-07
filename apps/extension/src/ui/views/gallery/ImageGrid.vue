<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import VirtualList from "../../components/VirtualList.vue";
import { layout_justified_rows, type LayoutRow } from "./image_layout.js";
import styles from "./gallery.module.css";
import GalleryTile from "./GalleryTile.vue";

const ROW_HEIGHT = 176;
const ROW_GAP = 8;

/**
 * Virtualized justified-row grid (assumes `records` is non-empty and loaded -- GalleryView owns
 * the loading/empty StateSurface wrapping). Rows are windowed through VirtualList (real DOM
 * windowing for a library with thousands of records); each row's tiles get their own aspect-ratio
 * width, giving the masonry look without needing every tile mounted at once.
 */
const props = defineProps<{
  readonly records: readonly GalleryRecordSummary[];
  readonly selectedIds: ReadonlySet<string>;
  readonly readBytes: (id: string) => Promise<Uint8Array>;
  readonly thumbnailFailedLabel: string;
  readonly pinnedLabel: string;
  readonly selectLabel: string;
  readonly openLabel: string;
  readonly ariaLabel: string;
  /** Forces the measured viewport instead of tracking ResizeObserver -- happy-dom (this repo's
   * test environment) has no real layout engine, so clientWidth/clientHeight and ResizeObserver
   * callbacks never fire on their own (same rationale as use_shell_viewport.ts's `override`). */
  readonly widthOverride?: number;
  readonly heightOverride?: number;
}>();

const emit = defineEmits<{
  open: [record_id: string];
  "toggle-select": [record_id: string];
}>();

const container = ref<HTMLElement | null>(null);
const measured_width = ref(0);
const measured_height = ref(0);
let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!container.value || typeof ResizeObserver === "undefined") {
    return;
  }
  observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) {
      return;
    }
    measured_width.value = entry.contentRect.width;
    measured_height.value = entry.contentRect.height;
  });
  observer.observe(container.value);
  measured_width.value = container.value.clientWidth;
  measured_height.value = container.value.clientHeight;
});

const container_width = computed(() => props.widthOverride ?? measured_width.value);
const container_height = computed(() => props.heightOverride ?? measured_height.value);

onUnmounted(() => {
  observer?.disconnect();
});

const rows = computed<readonly LayoutRow<GalleryRecordSummary>[]>(() =>
  layout_justified_rows(props.records, container_width.value, ROW_HEIGHT, ROW_GAP),
);

function row_key(row: LayoutRow<GalleryRecordSummary>): string {
  return row.key;
}
</script>

<template>
  <div ref="container" :class="styles.gridContainer">
    <!-- eslint-disable vue/attribute-hyphenation -- "aria-label" is exempt from Vue's kebab-to-camel
         attribute/prop matching (it stays a literal passthrough attribute), so `ariaLabel` below
         must stay camelCase to actually bind VirtualList's prop; hyphenating it silently breaks the
         binding instead of merely triggering the style rule (confirmed via vue-tsc, which fails
         "Property 'ariaLabel' is missing" against the hyphenated form). -->
    <VirtualList
      v-if="container_height > 0"
      :items="rows"
      :item-size="ROW_HEIGHT + ROW_GAP"
      :height="`${container_height}px`"
      :get-key="row_key"
      :ariaLabel="ariaLabel"
    >
      <!-- eslint-enable vue/attribute-hyphenation -->
      <template #default="{ item: row }">
        <div
          v-if="row"
          :class="styles.gridRow"
          :style="{ height: `${ROW_HEIGHT}px`, gap: `${ROW_GAP}px` }"
        >
          <GalleryTile
            v-for="tile in row.tiles"
            :key="tile.item.id"
            :record="tile.item"
            :pixel-width="tile.pixel_width"
            :row-height="ROW_HEIGHT"
            :selected="selectedIds.has(tile.item.id)"
            :read-bytes="readBytes"
            :thumbnail-failed-label="thumbnailFailedLabel"
            :pinned-label="pinnedLabel"
            :select-label="selectLabel"
            :open-label="openLabel"
            @open="emit('open', tile.item.id)"
            @toggle-select="emit('toggle-select', tile.item.id)"
          />
        </div>
      </template>
    </VirtualList>
  </div>
</template>
