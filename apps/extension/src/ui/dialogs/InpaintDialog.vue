<script setup lang="ts">
import {
  Eraser,
  Redo2,
  Sparkles,
  Trash2,
  Undo2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-vue-next";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { computed, inject, onMounted, ref, watch } from "vue";

import AppButton from "../components/AppButton.vue";
import AppIcon from "../components/AppIcon.vue";
import IconButton from "../components/IconButton.vue";
import component_styles from "../components/components.module.css";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import {
  InpaintMaskSession,
  validate_mask_dimensions,
  type MaskPoint,
} from "../../modules/media/inpaint_session.js";
import styles from "./dialogs.module.css";

const props = withDefaults(
  defineProps<{
    readonly open: boolean;
    readonly title: string;
    readonly closeLabel: string;
    readonly bitmap: ImageBitmap;
    readonly maskWidth?: number | undefined;
    readonly maskHeight?: number | undefined;
    readonly undoLabel: string;
    readonly redoLabel: string;
    readonly eraseLabel: string;
    readonly clearLabel: string;
    readonly zoomInLabel: string;
    readonly zoomOutLabel: string;
    readonly uploadLabel: string;
    readonly generateLabel: string;
    readonly brushSizeLabel: string;
    readonly positivePromptLabel: string;
    readonly negativePromptLabel: string;
    readonly denoiseLabel: string;
    readonly dimensionErrorLabel: string;
    readonly pending?: boolean;
  }>(),
  {
    maskWidth: undefined,
    maskHeight: undefined,
    pending: false,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  submit: [
    payload: {
      readonly mask: Uint8ClampedArray;
      readonly brushSize: number;
      readonly positivePrompt: string;
      readonly negativePrompt: string;
      readonly denoiseStrength: number;
    },
  ];
  "upload-reference": [];
}>();

const MASK_OVERLAY_RGBA = [239, 68, 68, 140] as const;
const DEFAULT_BRUSH_SIZE = 32;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));

function handle_open_change(value: boolean): void {
  emit("update:open", value);
}

const bitmap_canvas = ref<HTMLCanvasElement | null>(null);
const mask_canvas = ref<HTMLCanvasElement | null>(null);
const brush_size = ref(DEFAULT_BRUSH_SIZE);
const erase_mode = ref(false);
const zoom = ref(MIN_ZOOM);
const positive_prompt = ref("");
const negative_prompt = ref("");
const denoise_strength = ref(0.75);
const can_undo = ref(false);
const can_redo = ref(false);

const dimension_error = computed<string | null>(() => {
  const target_width = props.maskWidth ?? props.bitmap.width;
  const target_height = props.maskHeight ?? props.bitmap.height;
  try {
    validate_mask_dimensions(props.bitmap.width, props.bitmap.height, target_width, target_height);
    return null;
  } catch {
    return props.dimensionErrorLabel;
  }
});

const aspect_ratio = computed(() => props.bitmap.width / props.bitmap.height);
const frame_style = computed(() => ({ "--tc-inpaint-aspect": String(aspect_ratio.value) }));

let session: InpaintMaskSession | null = null;
let active_pointer_id: number | null = null;
let stroke_points: MaskPoint[] = [];

function sync_history_flags(): void {
  can_undo.value = session?.can_undo() ?? false;
  can_redo.value = session?.can_redo() ?? false;
}

function create_session(): void {
  session = new InpaintMaskSession(props.bitmap.width, props.bitmap.height);
  sync_history_flags();
}

function draw_bitmap(): void {
  const canvas = bitmap_canvas.value;
  if (canvas === null) {
    return;
  }
  canvas.width = props.bitmap.width;
  canvas.height = props.bitmap.height;
  const context = canvas.getContext("2d");
  context?.drawImage(props.bitmap, 0, 0);
}

function redraw_mask(): void {
  const canvas = mask_canvas.value;
  if (canvas === null || session === null) {
    return;
  }
  canvas.width = session.width;
  canvas.height = session.height;
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }
  const mask = session.mask;
  const image_data = context.createImageData(session.width, session.height);
  const [r, g, b, a] = MASK_OVERLAY_RGBA;
  for (let index = 0; index < mask.length; index += 1) {
    const pixel_offset = index * 4;
    if (mask[index] === 255) {
      image_data.data[pixel_offset] = r;
      image_data.data[pixel_offset + 1] = g;
      image_data.data[pixel_offset + 2] = b;
      image_data.data[pixel_offset + 3] = a;
    }
  }
  context.putImageData(image_data, 0, 0);
}

onMounted(() => {
  create_session();
  draw_bitmap();
  redraw_mask();
});

watch(
  () => props.bitmap,
  () => {
    create_session();
    draw_bitmap();
    redraw_mask();
  },
);

function to_mask_point(event: PointerEvent): MaskPoint | null {
  const canvas = mask_canvas.value;
  if (canvas === null) {
    return null;
  }
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return { x: 0, y: 0 };
  }
  const scale_x = canvas.width / rect.width;
  const scale_y = canvas.height / rect.height;
  return { x: (event.clientX - rect.left) * scale_x, y: (event.clientY - rect.top) * scale_y };
}

function on_pointer_down(event: PointerEvent): void {
  if (active_pointer_id !== null) {
    return;
  }
  const point = to_mask_point(event);
  if (point === null) {
    return;
  }
  active_pointer_id = event.pointerId;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  stroke_points = [point];
}

function on_pointer_move(event: PointerEvent): void {
  if (active_pointer_id !== event.pointerId) {
    return;
  }
  const point = to_mask_point(event);
  if (point === null) {
    return;
  }
  stroke_points.push(point);
}

function on_pointer_up(event: PointerEvent): void {
  if (active_pointer_id !== event.pointerId) {
    return;
  }
  active_pointer_id = null;
  finish_stroke();
}

function finish_stroke(): void {
  if (session === null || stroke_points.length === 0) {
    stroke_points = [];
    return;
  }
  session.stroke(stroke_points, brush_size.value, erase_mode.value ? "erase" : "brush");
  stroke_points = [];
  sync_history_flags();
  redraw_mask();
}

function undo(): void {
  session?.undo();
  sync_history_flags();
  redraw_mask();
}

function redo(): void {
  session?.redo();
  sync_history_flags();
  redraw_mask();
}

function clear(): void {
  session?.clear();
  sync_history_flags();
  redraw_mask();
}

function zoom_in(): void {
  zoom.value = Math.min(MAX_ZOOM, zoom.value + 0.5);
}

function zoom_out(): void {
  zoom.value = Math.max(MIN_ZOOM, zoom.value - 0.5);
}

function submit(): void {
  if (session === null || dimension_error.value !== null) {
    return;
  }
  emit("submit", {
    mask: session.export_binary_mask(),
    brushSize: brush_size.value,
    positivePrompt: positive_prompt.value,
    negativePrompt: negative_prompt.value,
    denoiseStrength: denoise_strength.value,
  });
}
</script>

<template>
  <DialogRoot :open="open" @update:open="handle_open_change">
    <DialogPortal v-bind="portal_props">
      <DialogOverlay :class="component_styles.dialogOverlay" />
      <DialogContent :class="[component_styles.dialogContent, styles.inpaintDialogContent]">
        <header :class="component_styles.dialogHeader">
          <DialogTitle :class="component_styles.dialogTitle">{{ title }}</DialogTitle>
          <DialogClose
            class="tc-interactive"
            :class="component_styles.dialogClose"
            :aria-label="closeLabel"
          >
            <AppIcon :icon="X" :size="18" />
          </DialogClose>
        </header>
        <DialogDescription class="tc-visually-hidden">{{ title }}</DialogDescription>
        <div :class="styles.inpaintBody">
          <div :class="styles.inpaintToolbar">
            <IconButton :icon="Undo2" :label="undoLabel" :disabled="!can_undo" @click="undo" />
            <IconButton :icon="Redo2" :label="redoLabel" :disabled="!can_redo" @click="redo" />
            <IconButton
              :icon="Eraser"
              :label="eraseLabel"
              :pressed="erase_mode"
              @click="erase_mode = !erase_mode"
            />
            <IconButton :icon="Trash2" :label="clearLabel" destructive @click="clear" />
            <span :class="styles.inpaintToolbarDivider" aria-hidden="true" />
            <IconButton :icon="ZoomOut" :label="zoomOutLabel" @click="zoom_out" />
            <IconButton :icon="ZoomIn" :label="zoomInLabel" @click="zoom_in" />
            <span :class="styles.inpaintToolbarDivider" aria-hidden="true" />
            <IconButton :icon="Upload" :label="uploadLabel" @click="emit('upload-reference')" />
          </div>

          <div :class="styles.inpaintCanvasFrame" :style="frame_style">
            <canvas
              ref="bitmap_canvas"
              :style="{ transform: `scale(${zoom})` }"
              data-testid="inpaint-bitmap-canvas"
            />
            <canvas
              ref="mask_canvas"
              :style="{ transform: `scale(${zoom})`, touchAction: 'none' }"
              data-testid="inpaint-mask-canvas"
              @pointerdown="on_pointer_down"
              @pointermove="on_pointer_move"
              @pointerup="on_pointer_up"
              @pointercancel="on_pointer_up"
            />
          </div>
          <p v-if="dimension_error" :class="styles.inpaintDimensionError" role="alert">
            {{ dimension_error }}
          </p>

          <div :class="styles.inpaintBrushRow">
            <label>
              {{ brushSizeLabel }}
              <input
                v-model.number="brush_size"
                type="range"
                min="4"
                max="128"
                step="1"
                :aria-label="brushSizeLabel"
              />
            </label>
          </div>

          <div :class="styles.inpaintPromptGrid">
            <label>
              {{ positivePromptLabel }}
              <textarea v-model="positive_prompt" :aria-label="positivePromptLabel" rows="2" />
            </label>
            <label>
              {{ negativePromptLabel }}
              <textarea v-model="negative_prompt" :aria-label="negativePromptLabel" rows="2" />
            </label>
          </div>

          <label>
            {{ denoiseLabel }}
            <input
              v-model.number="denoise_strength"
              type="range"
              min="0"
              max="1"
              step="0.01"
              :aria-label="denoiseLabel"
            />
          </label>

          <div :class="styles.inpaintFooter">
            <AppButton
              :label="generateLabel"
              :icon="Sparkles"
              variant="primary"
              :pending="pending"
              :disabled="dimension_error !== null"
              @click="submit"
            />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
