<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";
import { computed, markRaw, onBeforeUnmount, onMounted, ref, toRaw, watch } from "vue";

import {
  FloatingEntryController,
  InMemoryFloatingEntryPositionStore,
  validate_custom_icon,
  type FloatingEntryPosition,
  type FloatingEntryPositionStore,
  type ViewportBucket,
  type ViewportSize,
} from "../../modules/experience/floating_entry.js";
import {
  resolve_media_for_state,
  type MediaState,
  type MediaStateAssetMap,
  type MediaStateResolution,
} from "../../modules/experience/media_state_player.js";
import AppIcon from "../components/AppIcon.vue";
import { use_shell_viewport } from "../shell/use_shell_viewport.js";
import styles from "./experience.module.css";

const props = withDefaults(
  defineProps<{
    readonly enabled: boolean;
    readonly mediaState?: MediaState;
    readonly mediaAssets?: MediaStateAssetMap;
    readonly openLabel?: string;
    readonly positionStore?: FloatingEntryPositionStore | undefined;
    readonly viewportOverride?: ViewportBucket | undefined;
  }>(),
  {
    positionStore: undefined,
    viewportOverride: undefined,
    mediaState: "idle",
    mediaAssets: () => ({}),
    openLabel: "Open Inkwell",
  },
);

const emit = defineEmits<{
  open: [];
}>();

const viewport_bucket = use_shell_viewport(props.viewportOverride);

function read_viewport(): ViewportSize {
  if (typeof window === "undefined") {
    return { width: 1280, height: 800 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

// Vue's reactivity Proxy breaks the private-field brand checks of the controller and store; unwrap with toRaw() and markRaw().
const position_store =
  toRaw(props.positionStore) ?? markRaw(new InMemoryFloatingEntryPositionStore());

const controller = new FloatingEntryController({
  position_store,
  get_viewport: read_viewport,
  get_viewport_bucket: () => viewport_bucket.value,
});

const position = ref<FloatingEntryPosition>(controller.position);
const dragging = ref(controller.dragging);

function sync(): void {
  position.value = controller.position;
  dragging.value = controller.dragging;
}

watch(viewport_bucket, () => {
  controller.reflow();
  sync();
});

function on_window_resize(): void {
  controller.reflow();
  sync();
}

onMounted(() => {
  window.addEventListener("resize", on_window_resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", on_window_resize);
});

const resolved_media = computed<MediaStateResolution>(() => {
  const state: MediaState = dragging.value ? "dragging" : props.mediaState;
  if (state === "idle") {
    return { state, asset: validate_custom_icon(props.mediaAssets.idle) };
  }
  return resolve_media_for_state(props.mediaAssets, state);
});

let suppress_click = false;

function on_pointerdown(event: PointerEvent): void {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement) || !event.isPrimary) {
    return;
  }
  const element: HTMLElement = target;

  element.setPointerCapture(event.pointerId);
  controller.begin_drag();
  sync();
  const start_client = { x: event.clientX, y: event.clientY };
  const start_position = controller.position;

  function on_pointermove(move_event: PointerEvent): void {
    controller.drag_to({
      x: start_position.x + (move_event.clientX - start_client.x),
      y: start_position.y + (move_event.clientY - start_client.y),
    });
    sync();
  }

  function finish_drag(): void {
    element.removeEventListener("pointermove", on_pointermove);
    element.removeEventListener("pointerup", on_pointerup);
    element.removeEventListener("pointercancel", on_pointercancel);
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    const { moved } = controller.end_drag();
    sync();
    suppress_click = moved;
  }

  function on_pointerup(): void {
    finish_drag();
  }

  function on_pointercancel(): void {
    finish_drag();
  }

  element.addEventListener("pointermove", on_pointermove);
  element.addEventListener("pointerup", on_pointerup);
  element.addEventListener("pointercancel", on_pointercancel);
}

function on_click(): void {
  if (suppress_click) {
    suppress_click = false;
    return;
  }
  emit("open");
}

function on_keydown(event: KeyboardEvent): void {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  emit("open");
}
</script>

<template>
  <button
    v-if="enabled"
    type="button"
    class="tc-interactive"
    :class="[styles.floatingEntry, dragging && styles.floatingEntryDragging]"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    :aria-label="openLabel"
    data-testid="floating-entry"
    :data-dragging="dragging"
    :data-media-state="resolved_media.state"
    data-shadow-role="entry"
    @pointerdown="on_pointerdown"
    @click="on_click"
    @keydown="on_keydown"
  >
    <video
      v-if="resolved_media.asset?.kind === 'video'"
      :class="styles.floatingEntryMedia"
      :src="resolved_media.asset.url"
      autoplay
      muted
      loop
      playsinline
    />
    <img
      v-else-if="resolved_media.asset?.kind === 'image'"
      :class="styles.floatingEntryMedia"
      :src="resolved_media.asset.url"
      alt=""
    />
    <AppIcon v-else :icon="ImageIcon" />
  </button>
</template>
