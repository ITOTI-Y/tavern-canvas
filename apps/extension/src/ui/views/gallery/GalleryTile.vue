<script setup lang="ts">
import { Check, ImageOff, Pin } from "lucide-vue-next";
import { computed, ref } from "vue";

import AppIcon from "../../components/AppIcon.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import styles from "./gallery.module.css";
import { use_gallery_object_url } from "./use_gallery_object_url.js";

/**
 * One grid tile: fixed box (pixelWidth x rowHeight, reserved before any byte loads -- taste
 * directive), lazy byte fetch through the controller's read_gallery_bytes (never a direct fetch),
 * failed-thumbnail fallback composed of an icon and message rather than a blank box, and object
 * URL release the instant this tile unmounts (a virtualized row scrolling out of view).
 */
const props = defineProps<{
  readonly record: GalleryRecordSummary;
  readonly pixelWidth: number;
  readonly rowHeight: number;
  readonly selected: boolean;
  readonly readBytes: (id: string) => Promise<Uint8Array>;
  readonly thumbnailFailedLabel: string;
  readonly pinnedLabel: string;
  readonly selectLabel: string;
  readonly openLabel: string;
}>();

const emit = defineEmits<{
  open: [];
  "toggle-select": [];
}>();

const record_id = computed(() => props.record.id);
const media_type = computed(() => props.record.media_type);
const always_active = ref(true);
const { url, status } = use_gallery_object_url(
  record_id,
  media_type,
  always_active,
  props.readBytes,
);

const decoded = ref(false);
</script>

<template>
  <div
    :class="styles.tile"
    :style="{ width: `${pixelWidth}px`, height: `${rowHeight}px` }"
    :data-selected="selected ? '' : null"
  >
    <button
      type="button"
      :class="styles.tileButton"
      :aria-label="`${openLabel}: ${record.id}`"
      @click="emit('open')"
    >
      <div v-if="status !== 'ready' || !decoded" :class="styles.tileSkeleton" aria-hidden="true" />
      <img
        v-if="status === 'ready' && url"
        :src="url"
        decoding="async"
        loading="lazy"
        alt=""
        :class="styles.tileImage"
        :style="{ visibility: decoded ? 'visible' : 'hidden' }"
        @load="decoded = true"
        @error="decoded = false"
      />
      <div v-else-if="status === 'error'" :class="styles.tileFallback">
        <AppIcon :icon="ImageOff" :size="20" />
        <span>{{ thumbnailFailedLabel }}</span>
      </div>
    </button>

    <span v-if="record.pinned" role="img" :class="styles.tilePinnedBadge" :aria-label="pinnedLabel">
      <AppIcon :icon="Pin" :size="12" />
    </span>

    <!-- Checkmark on select, empty box otherwise. The previous ringed dot inside this box read as
         the digit "0" against artwork: two concentric outlines with nothing filled in. A checkbox
         that is either empty or ticked has no such second reading. -->
    <button
      type="button"
      :class="styles.tileSelectToggle"
      :data-checked="selected ? '' : null"
      :aria-pressed="selected"
      :aria-label="`${selectLabel}: ${record.id}`"
      @click.stop="emit('toggle-select')"
    >
      <AppIcon v-if="selected" :icon="Check" :size="14" />
    </button>
  </div>
</template>
