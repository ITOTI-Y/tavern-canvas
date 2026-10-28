<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import { use_marquee_selection } from "../../components/use_marquee_selection.js";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import { layout_masonry_columns, place_column } from "./image_layout.js";
import styles from "./gallery_styles.js";
import GalleryTile from "./GalleryTile.vue";

/** Matches --tc-tile-min and --tc-tile-gap; narrow workspaces always get two columns. */
const TILE_MIN_PX = 168;
const TILE_GAP_PX = 10;
const NARROW_COLUMNS = 2;
const NARROW_MAX_PX = 640;
/** Tiles this far above or below the viewport stay mounted, so a fling scroll rarely shows gaps. */
const OVERSCAN_PX = 800;

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
  "select-ids": [record_ids: readonly string[], mode: "add" | "replace"];
}>();

const container = ref<HTMLElement | null>(null);
const measured_width = ref(0);
/** The viewport's span in the grid's own coordinates. */
const visible = ref({ top: 0, bottom: 0 });
let observer: ResizeObserver | null = null;
let frame: number | null = null;

const marquee = use_marquee_selection(container, {
  start_on_items: true,
  on_select: (ids, mode) => {
    emit("select-ids", ids, mode);
  },
});

function measure_visible(): void {
  frame = null;
  const element = container.value;
  if (element === null) {
    return;
  }
  const top = -element.getBoundingClientRect().top;
  visible.value = { top, bottom: top + window.innerHeight };
}

function schedule_measure(): void {
  frame ??= requestAnimationFrame(measure_visible);
}

onMounted(() => {
  measure_visible();
  window.addEventListener("scroll", schedule_measure, { capture: true, passive: true });
  window.addEventListener("resize", schedule_measure, { passive: true });
  if (!container.value || typeof ResizeObserver === "undefined") {
    return;
  }
  observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (entry) {
      measured_width.value = entry.contentRect.width;
      schedule_measure();
    }
  });
  observer.observe(container.value);
  measured_width.value = container.value.clientWidth;
});

onUnmounted(() => {
  observer?.disconnect();
  window.removeEventListener("scroll", schedule_measure, { capture: true });
  window.removeEventListener("resize", schedule_measure);
  if (frame !== null) {
    cancelAnimationFrame(frame);
  }
});

const width = computed(() => props.widthOverride ?? measured_width.value);

const column_count = computed(() => {
  if (width.value <= NARROW_MAX_PX) {
    return NARROW_COLUMNS;
  }
  return Math.max(1, Math.floor((width.value + TILE_GAP_PX) / (TILE_MIN_PX + TILE_GAP_PX)));
});

const columns = computed(() => {
  const count = column_count.value;
  const column_width = Math.max(0, (width.value - TILE_GAP_PX * (count - 1)) / count);
  return layout_masonry_columns(props.records, count).map((items) =>
    place_column(items, column_width, TILE_GAP_PX),
  );
});

const grid_height = computed(() => Math.max(0, ...columns.value.map((column) => column.height)));

/** Only the tiles near the viewport are mounted; a tile releases its image when it unmounts. */
const mounted_columns = computed(() => {
  const from = visible.value.top - OVERSCAN_PX;
  const to = visible.value.bottom + OVERSCAN_PX;
  return columns.value.map((column) =>
    column.tiles.filter((tile) => tile.top + tile.height >= from && tile.top <= to),
  );
});
</script>

<template>
  <div
    ref="container"
    :class="styles.masonry"
    :style="{ height: `${String(grid_height)}px` }"
    role="list"
    :aria-label="ariaLabel"
    :data-marquee="marquee.box.value === null ? null : ''"
    @pointerdown="marquee.on_pointerdown"
  >
    <div
      v-if="marquee.box.value !== null"
      :class="styles.marquee"
      aria-hidden="true"
      :style="{
        left: `${String(marquee.box.value.left)}px`,
        top: `${String(marquee.box.value.top)}px`,
        width: `${String(marquee.box.value.width)}px`,
        height: `${String(marquee.box.value.height)}px`,
      }"
    />
    <ul
      v-for="(column, index) in mounted_columns"
      :key="index"
      :class="styles.masonryColumn"
      role="none"
    >
      <GalleryTile
        v-for="tile in column"
        :key="tile.item.id"
        role="listitem"
        :style="{ top: `${String(tile.top)}px`, height: `${String(tile.height)}px` }"
        :record="tile.item"
        :selected="selectedIds.has(tile.item.id)"
        :read-image="readImage"
        :thumbnail-failed-label="thumbnailFailedLabel"
        :pinned-label="pinnedLabel"
        :select-label="selectLabel"
        :open-label="openLabel"
        @open="emit('open', tile.item.id)"
        @toggle-select="emit('toggle-select', tile.item.id)"
      />
    </ul>
  </div>
</template>
