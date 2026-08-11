<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import {
  clamp_floating_window_position,
  default_floating_window_position,
  type FloatingWindowPosition,
  type FloatingWindowSize,
  type FloatingWindowViewport,
} from "../../modules/experience/floating_window.js";
import { DESKTOP_BREAKPOINT_PX } from "../shell/use_shell_viewport.js";
import styles from "./floating_window.module.css";

const props = defineProps<{
  readonly label: string;
}>();

const window_element = ref<HTMLElement | null>(null);
const position = ref<FloatingWindowPosition>({ x: 0, y: 0 });
const positioned = ref(false);
const dragging = ref(false);

function read_viewport(): FloatingWindowViewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function read_window_size(element: HTMLElement): FloatingWindowSize {
  const bounds = element.getBoundingClientRect();
  return {
    width: bounds.width,
    height: bounds.height,
  };
}

function reflow(): void {
  const element = window_element.value;
  if (element === null || window.innerWidth < DESKTOP_BREAKPOINT_PX) {
    return;
  }
  const viewport = read_viewport();
  const window_size = read_window_size(element);
  position.value = positioned.value
    ? clamp_floating_window_position(position.value, viewport, window_size)
    : default_floating_window_position(viewport, window_size);
  positioned.value = true;
}

function on_pointerdown(event: PointerEvent): void {
  const candidate = window_element.value;
  const target = event.target;
  if (
    candidate === null ||
    !(target instanceof Element) ||
    !event.isPrimary ||
    event.button !== 0 ||
    window.innerWidth < DESKTOP_BREAKPOINT_PX ||
    target.closest("[data-window-drag-handle]") === null ||
    target.closest("button, a, input, select, textarea, [role='button']") !== null
  ) {
    return;
  }
  const element: HTMLElement = candidate;

  event.preventDefault();
  element.setPointerCapture(event.pointerId);
  dragging.value = true;
  const start_client = { x: event.clientX, y: event.clientY };
  const start_position = position.value;

  function on_pointermove(move_event: PointerEvent): void {
    position.value = clamp_floating_window_position(
      {
        x: start_position.x + move_event.clientX - start_client.x,
        y: start_position.y + move_event.clientY - start_client.y,
      },
      read_viewport(),
      read_window_size(element),
    );
  }

  function finish_drag(): void {
    element.removeEventListener("pointermove", on_pointermove);
    element.removeEventListener("pointerup", on_pointerup);
    element.removeEventListener("pointercancel", on_pointercancel);
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    dragging.value = false;
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

function on_window_resize(): void {
  reflow();
}

onMounted(() => {
  window.addEventListener("resize", on_window_resize);
  void nextTick(reflow);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", on_window_resize);
});
</script>

<template>
  <section
    ref="window_element"
    :class="styles.window"
    :style="{
      '--tc-floating-window-x': `${position.x}px`,
      '--tc-floating-window-y': `${position.y}px`,
    }"
    :aria-label="props.label"
    :data-positioned="positioned"
    :data-dragging="dragging"
    data-window-role="studio"
    role="dialog"
    @pointerdown="on_pointerdown"
  >
    <slot />
  </section>
</template>
