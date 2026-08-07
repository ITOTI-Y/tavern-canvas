<script setup lang="ts">
import { Image as ImageIcon, Lock, RotateCcw, Trash2, Unlock, Video, Wand2 } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import AppButton from "../components/AppButton.vue";
import AppDialog from "../components/AppDialog.vue";
import IconButton from "../components/IconButton.vue";
import { find_preset_matches, type PresetMatchCandidate } from "../../modules/media/image_edit.js";
import styles from "./dialogs.module.css";

/**
 * Tag-edit textbox dialog (manual.tag_edit_dialog) with preset-match highlighting underlay, the
 * per-tag reset/lock/delete actions (manual.tag_actions_menu), and the 4-way image-processing
 * submenu (manual.image_process_submenu: Banana retouch / Grok video / ComfyUI inpaint / NovelAI
 * inpaint). This dialog only edits/saves the tag text and reports which processing route the user
 * picked -- actually opening InpaintDialog or submitting a retouch/video request is the caller's
 * job (`open-*` events), keeping this component focused on one responsibility.
 */
const props = withDefaults(
  defineProps<{
    readonly open: boolean;
    readonly title: string;
    readonly closeLabel: string;
    readonly text: string;
    readonly locked: boolean;
    readonly presets?: readonly PresetMatchCandidate[];
    readonly textLabel: string;
    readonly resetLabel: string;
    readonly lockLabel: string;
    readonly unlockLabel: string;
    readonly deleteLabel: string;
    readonly saveLabel: string;
    readonly processMenuLabel: string;
    readonly bananaRetouchLabel: string;
    readonly grokVideoLabel: string;
    readonly comfyuiInpaintLabel: string;
    readonly novelaiInpaintLabel: string;
  }>(),
  {
    presets: () => [],
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  save: [text: string];
  reset: [];
  "toggle-lock": [];
  delete: [];
  "open-banana-retouch": [];
  "open-grok-video": [];
  "open-comfyui-inpaint": [];
  "open-novelai-inpaint": [];
}>();

const draft_text = ref(props.text);
watch(
  () => props.text,
  (next_text) => {
    draft_text.value = next_text;
  },
);

const match_ranges = computed(() => find_preset_matches(draft_text.value, props.presets));

interface HighlightSegment {
  readonly text: string;
  readonly matched: boolean;
}

const highlight_segments = computed<readonly HighlightSegment[]>(() => {
  const text = draft_text.value;
  const segments: HighlightSegment[] = [];
  let cursor = 0;
  for (const range of match_ranges.value) {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), matched: false });
    }
    segments.push({ text: text.slice(range.start, range.end), matched: true });
    cursor = range.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), matched: false });
  }
  return segments;
});

function save(): void {
  emit("save", draft_text.value);
}
</script>

<template>
  <AppDialog
    :open="open"
    :title="title"
    :close-label="closeLabel"
    @update:open="emit('update:open', $event)"
  >
    <div :class="styles.editBody">
      <label>
        {{ textLabel }}
        <div :class="styles.editTextareaWrap">
          <div :class="styles.editHighlightLayer" aria-hidden="true">
            <span
              v-for="(segment, index) in highlight_segments"
              :key="index"
              :class="segment.matched ? styles.editHighlightMatch : undefined"
              >{{ segment.text }}</span
            >
          </div>
          <textarea
            v-model="draft_text"
            :class="styles.editTextarea"
            :aria-label="textLabel"
            :disabled="locked"
            rows="4"
          />
        </div>
      </label>

      <div :class="styles.editTagActions">
        <IconButton
          :icon="RotateCcw"
          :label="resetLabel"
          :disabled="locked"
          @click="emit('reset')"
        />
        <IconButton
          :icon="locked ? Unlock : Lock"
          :label="locked ? unlockLabel : lockLabel"
          :pressed="locked"
          @click="emit('toggle-lock')"
        />
        <IconButton
          :icon="Trash2"
          :label="deleteLabel"
          destructive
          :disabled="locked"
          @click="emit('delete')"
        />
      </div>

      <div>
        <p>{{ processMenuLabel }}</p>
        <div :class="styles.editSubmenu">
          <AppButton
            :label="bananaRetouchLabel"
            :icon="Wand2"
            variant="secondary"
            @click="emit('open-banana-retouch')"
          />
          <AppButton
            :label="grokVideoLabel"
            :icon="Video"
            variant="secondary"
            @click="emit('open-grok-video')"
          />
          <AppButton
            :label="comfyuiInpaintLabel"
            :icon="ImageIcon"
            variant="secondary"
            @click="emit('open-comfyui-inpaint')"
          />
          <AppButton
            :label="novelaiInpaintLabel"
            :icon="ImageIcon"
            variant="secondary"
            @click="emit('open-novelai-inpaint')"
          />
        </div>
      </div>

      <div :class="styles.editFooter">
        <AppButton :label="saveLabel" variant="primary" :disabled="locked" @click="save" />
      </div>
    </div>
  </AppDialog>
</template>
