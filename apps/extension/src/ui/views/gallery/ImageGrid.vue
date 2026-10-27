<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import VirtualList from "../../components/VirtualList.vue";
import { layout_justified_rows, type LayoutRow } from "./image_layout.js";
import styles from "./gallery_styles.js";
import GalleryTile from "./GalleryTile.vue";

const ROW_HEIGHT = 176;
const ROW_GAP = 8;

const props = defineProps<{
  readonly records: readonly GalleryRecordSummary[];
  readonly selectedIds: ReadonlySet<string>;
  readonly readBytes: (id: string) => Promise<Uint8Array>;
  readonly thumbnailFailedLabel: string;
  readonly pinnedLabel: string;
  readonly selectLabel: string;
  readonly openLabel: string;
  readonly ariaLabel: string;
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
    <!-- eslint-disable vue/attribute-hyphenation -- ariaLabel must stay camelCase to bind VirtualList's prop -->
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
