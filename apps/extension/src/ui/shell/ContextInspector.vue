<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { InspectorSelection } from "../contracts/view_models.js";
import styles from "./shell.module.css";

const MIN_STORED_WIDTH = 240;
const MAX_STORED_WIDTH = 720;
const KEYBOARD_RESIZE_STEP = 16;

const props = defineProps<{
  width: number;
  selection?: InspectorSelection | null;
}>();

const emit = defineEmits<{
  resize: [width: number];
}>();

const { t } = useI18n();
const is_dragging = ref(false);

const selection_kind_label = computed(() => {
  const selection = props.selection;
  if (!selection) {
    return null;
  }
  if (selection.kind === "generation_job") {
    return t("common.inspector.selection.kind_generation_job");
  }
  if (selection.kind === "gallery_record") {
    return t("common.inspector.selection.kind_gallery_record");
  }
  return t("common.inspector.selection.kind_asset");
});

const selection_id = computed(() => {
  const selection = props.selection;
  if (!selection) {
    return null;
  }
  if (selection.kind === "generation_job") {
    return selection.job_id;
  }
  if (selection.kind === "gallery_record") {
    return selection.record_id;
  }
  return selection.asset_id;
});

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
        <template v-if="selection">
          <p :class="styles.inspector_selection_kind">{{ selection_kind_label }}</p>
          <dl :class="styles.inspector_selection">
            <div>
              <dt>{{ t("common.inspector.selection.id_label") }}</dt>
              <dd class="tc-tabular-nums">{{ selection_id }}</dd>
            </div>
          </dl>
        </template>
        <template v-else>
          <p>{{ t("common.inspector.empty_title") }}</p>
          <p>{{ t("common.inspector.empty_description") }}</p>
        </template>
      </div>
    </div>
  </div>
</template>
