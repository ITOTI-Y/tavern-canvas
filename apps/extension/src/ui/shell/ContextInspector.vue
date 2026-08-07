<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import styles from "./shell.module.css";

// Matches TavernCanvasUiSettingsSchema's real stored bounds (packages/contracts/src/settings.ts):
// the *persisted* width can range wider than the [320px, 400px] CSS clamp() that bounds the
// *rendered* column (task-2-brief.md's desktop assertion) -- dragging past 400px still records a
// value the clamp will honor once the window is wide enough, instead of clipping data silently.
const MIN_STORED_WIDTH = 240;
const MAX_STORED_WIDTH = 720;
const KEYBOARD_RESIZE_STEP = 16;

const props = defineProps<{
  width: number;
}>();

const emit = defineEmits<{
  resize: [width: number];
}>();

const { t } = useI18n();
const is_dragging = ref(false);

function clamp_width(value: number): number {
  return Math.min(MAX_STORED_WIDTH, Math.max(MIN_STORED_WIDTH, value));
}

function on_pointer_down(event: PointerEvent): void {
  if (event.button !== 0) {
    return;
  }
  event.preventDefault();
  const start_x = event.clientX;
  const start_width = props.width;
  const pointer_id = event.pointerId;
  const target = event.currentTarget as HTMLElement;
  target.setPointerCapture(pointer_id);
  is_dragging.value = true;

  function on_pointer_move(move_event: PointerEvent): void {
    // The inspector sits on the trailing (right) edge: dragging toward the left grows it.
    const delta = start_x - move_event.clientX;
    emit("resize", clamp_width(start_width + delta));
  }

  function stop_dragging(): void {
    target.releasePointerCapture(pointer_id);
    target.removeEventListener("pointermove", on_pointer_move);
    target.removeEventListener("pointerup", stop_dragging);
    target.removeEventListener("pointercancel", stop_dragging);
    is_dragging.value = false;
  }

  target.addEventListener("pointermove", on_pointer_move);
  target.addEventListener("pointerup", stop_dragging);
  target.addEventListener("pointercancel", stop_dragging);
}

// Keyboard resize mirrors the WAI-ARIA window-splitter pattern for role="separator".
function on_key_down(event: KeyboardEvent): void {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    emit("resize", clamp_width(props.width + KEYBOARD_RESIZE_STEP));
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    emit("resize", clamp_width(props.width - KEYBOARD_RESIZE_STEP));
  }
}
</script>

<template>
  <div :class="styles.inspector">
    <div
      role="separator"
      aria-orientation="vertical"
      tabindex="0"
      :class="styles.inspector_resizer"
      :data-dragging="is_dragging"
      :aria-valuenow="props.width"
      :aria-valuemin="MIN_STORED_WIDTH"
      :aria-valuemax="MAX_STORED_WIDTH"
      :aria-label="t('common.inspector.title')"
      @pointerdown="on_pointer_down"
      @keydown="on_key_down"
    />
    <div :class="styles.inspector_panel">
      <div :class="styles.inspector_header">
        <span>{{ t("common.inspector.title") }}</span>
      </div>
      <div :class="styles.inspector_body">
        <p>{{ t("common.inspector.empty_title") }}</p>
        <p>{{ t("common.inspector.empty_description") }}</p>
      </div>
    </div>
  </div>
</template>
