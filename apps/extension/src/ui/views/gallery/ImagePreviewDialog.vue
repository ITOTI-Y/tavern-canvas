<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Pin,
  PinOff,
  Trash2,
  Unlink,
  X,
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
import { computed, inject, ref, watch } from "vue";

import AppIcon from "../../components/AppIcon.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import IconButton from "../../components/IconButton.vue";
import { PORTAL_TARGET_KEY } from "../../contracts/portal_keys.js";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import styles from "./gallery.module.css";
import ImageMetadataInspector from "./ImageMetadataInspector.vue";
import {
  extract_generation_parameters,
  type ExtractedGenerationParameters,
} from "./image_metadata.js";
import { use_gallery_object_url } from "./use_gallery_object_url.js";

/**
 * Full-screen (mobile) / large centered (desktop) preview -- built on Reka's raw Dialog
 * primitives, not AppDialog (which caps at 480px, wrong for an image viewer). No `touch-action`
 * restriction is applied to the image or its wrapper, so native pinch zoom keeps working on
 * mobile; the control bar is pinned above the scrollable metadata region so it never scrolls out
 * of reach under a long parameter list.
 */
const props = defineProps<{
  readonly open: boolean;
  readonly record: GalleryRecordSummary | null;
  readonly hasPrevious: boolean;
  readonly hasNext: boolean;
  readonly readBytes: (id: string) => Promise<Uint8Array>;
  readonly closeLabel: string;
  readonly previousLabel: string;
  readonly nextLabel: string;
  readonly pinLabel: string;
  readonly unpinLabel: string;
  readonly downloadLabel: string;
  readonly detachLabel: string;
  readonly deleteLabel: string;
  readonly detachConfirmTitle: string;
  readonly detachConfirmDescription: string;
  readonly deleteConfirmTitle: string;
  readonly deleteConfirmDescription: string;
  /** Distinct confirm labels ("Detach from message" vs. "Delete") -- sharing one generic
   * "Delete" label across both dialogs would make the detach confirmation read as if it were
   * about to delete the image (plan rule: the two are distinct confirmed actions). */
  readonly detachConfirmLabel: string;
  readonly deleteConfirmLabel: string;
  readonly cancelLabel: string;
  readonly thumbnailFailedLabel: string;
  readonly metadataTitle: string;
  readonly orphanLabel: string;
  readonly seedLabel: string;
  readonly providerLabel: string;
  readonly modelLabel: string;
  readonly promptLabel: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly parametersEmptyDescription: string;
  readonly modifyPromptLabel: string;
  readonly regenerateLabel: string;
  readonly editLabel: string;
  readonly inpaintLabel: string;
  readonly sourceMessageLabel: string;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  previous: [];
  next: [];
  "toggle-pin": [];
  download: [];
  detach: [];
  delete: [];
  "modify-prompt": [];
  regenerate: [];
  edit: [];
  inpaint: [];
  "source-message": [];
  copied: [];
}>();

const record_id = computed(() => props.record?.id ?? "");
const media_type = computed(() => props.record?.media_type ?? "image/png");
const active = computed(() => props.open && props.record !== null);
const { url, status, bytes } = use_gallery_object_url(
  record_id,
  media_type,
  active,
  props.readBytes,
);

const parameters = ref<ExtractedGenerationParameters | null>(null);
watch(bytes, (next_bytes) => {
  parameters.value = next_bytes ? extract_generation_parameters(next_bytes) : null;
});

const pending_detach = ref(false);
const pending_delete = ref(false);

function handle_open_change(value: boolean): void {
  emit("update:open", value);
}

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <DialogRoot :open="open" @update:open="handle_open_change">
    <DialogPortal v-bind="portal_props">
      <DialogOverlay :class="styles.previewOverlay" />
      <DialogContent :class="styles.previewContent">
        <DialogTitle class="tc-visually-hidden">{{ metadataTitle }}</DialogTitle>
        <DialogDescription class="tc-visually-hidden">{{
          parametersEmptyDescription
        }}</DialogDescription>

        <div v-if="record" :class="styles.previewLayout">
          <div :class="styles.previewMain">
            <div :class="styles.previewToolbar">
              <DialogClose
                class="tc-interactive"
                :class="styles.previewToolbarButton"
                :aria-label="closeLabel"
              >
                <AppIcon :icon="X" :size="18" />
              </DialogClose>
              <div :class="styles.previewToolbarSpacer" />
              <IconButton
                :icon="record.pinned ? PinOff : Pin"
                :label="record.pinned ? unpinLabel : pinLabel"
                :pressed="record.pinned"
                @click="emit('toggle-pin')"
              />
              <IconButton :icon="Download" :label="downloadLabel" @click="emit('download')" />
              <IconButton :icon="Unlink" :label="detachLabel" @click="pending_detach = true" />
              <IconButton
                :icon="Trash2"
                destructive
                :label="deleteLabel"
                @click="pending_delete = true"
              />
            </div>

            <div :class="styles.previewImageArea">
              <IconButton
                v-if="hasPrevious"
                :icon="ChevronLeft"
                :label="previousLabel"
                :class="styles.previewNavButton"
                @click="emit('previous')"
              />
              <div :class="styles.previewImageFrame">
                <img
                  v-if="status === 'ready' && url"
                  :src="url"
                  :class="styles.previewImage"
                  alt=""
                  decoding="async"
                />
                <div v-else-if="status === 'error'" :class="styles.previewImageFallback">
                  {{ thumbnailFailedLabel }}
                </div>
                <div v-else :class="styles.tileSkeleton" aria-hidden="true" />
              </div>
              <IconButton
                v-if="hasNext"
                :icon="ChevronRight"
                :label="nextLabel"
                :class="styles.previewNavButton"
                @click="emit('next')"
              />
            </div>
          </div>

          <div :class="styles.previewInspector">
            <ImageMetadataInspector
              :record="record"
              :parameters="parameters"
              :loading="status === 'loading'"
              :title="metadataTitle"
              :orphan-label="orphanLabel"
              :seed-label="seedLabel"
              :provider-label="providerLabel"
              :model-label="modelLabel"
              :prompt-label="promptLabel"
              :copy-label="copyLabel"
              :copied-label="copiedLabel"
              :empty-description="parametersEmptyDescription"
              :modify-prompt-label="modifyPromptLabel"
              :regenerate-label="regenerateLabel"
              :edit-label="editLabel"
              :inpaint-label="inpaintLabel"
              :source-message-label="sourceMessageLabel"
              @modify-prompt="emit('modify-prompt')"
              @regenerate="emit('regenerate')"
              @edit="emit('edit')"
              @inpaint="emit('inpaint')"
              @source-message="emit('source-message')"
              @copied="emit('copied')"
            />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>

    <ConfirmDialog
      :open="pending_detach"
      :title="detachConfirmTitle"
      :description="detachConfirmDescription"
      :confirm-label="detachConfirmLabel"
      :cancel-label="cancelLabel"
      @update:open="
        (value) => {
          pending_detach = value;
        }
      "
      @confirm="
        () => {
          pending_detach = false;
          emit('detach');
        }
      "
    />
    <ConfirmDialog
      :open="pending_delete"
      :title="deleteConfirmTitle"
      :description="deleteConfirmDescription"
      :confirm-label="deleteConfirmLabel"
      :cancel-label="cancelLabel"
      @update:open="
        (value) => {
          pending_delete = value;
        }
      "
      @confirm="
        () => {
          pending_delete = false;
          emit('delete');
        }
      "
    />
  </DialogRoot>
</template>
