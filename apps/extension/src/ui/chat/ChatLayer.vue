<script setup lang="ts">
import type { IllustrationSlot, Uuid } from "@tavern-canvas/contracts";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { useI18n } from "vue-i18n";

import type { HostAdapter, HostSwipeLocation } from "../../host/index.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { PromptTranslator } from "../../modules/translation/prompt_translator.js";
import type { PromptTagsPort } from "../contracts/prompt_tags_port.js";
import type { GalleryCapability, NovelAiCapability } from "../contracts/ui_capabilities.js";
import styles from "./chat.module.css";
import InpaintDialog from "../dialogs/InpaintDialog.vue";
import IllustrateDialog from "./IllustrateDialog.vue";
import type { IllustrateRequest } from "./illustrate_request.js";
import { encode_mask_png } from "./mask_png.js";
import QuickEditDialog from "./QuickEditDialog.vue";
import type { QuickEditKind, QuickEditRequest } from "./quick_edit_request.js";
import SlotCard from "./SlotCard.vue";
import ParagraphActions from "./ParagraphActions.vue";
import { slot_error_label } from "./slot_error_label.js";
import { use_chat_slots } from "./use_chat_slots.js";
import { use_image_urls } from "./use_image_urls.js";

const props = defineProps<{
  readonly host: HostAdapter;
  readonly service: IllustrationService;
  readonly gallery: GalleryCapability;
  readonly novelai: NovelAiCapability;
  readonly translator: PromptTranslator | null;
  readonly promptTags: PromptTagsPort;
}>();

const { t } = useI18n();
const dialog_request = ref<IllustrateRequest | null>(null);
const preview_url = ref<string | null>(null);
const load_image = use_image_urls(props.gallery);
const quick_edit = ref<QuickEditRequest | null>(null);
const inpaint = shallowRef<{
  readonly request: QuickEditRequest;
  readonly bitmap: ImageBitmap;
} | null>(null);
const inpaint_pending = ref(false);

async function load_bitmap(image_id: string): Promise<ImageBitmap> {
  const bytes = await props.gallery.read_bytes(image_id);
  return createImageBitmap(new Blob([new Uint8Array(bytes)]));
}

async function open_quick_edit(
  location: HostSwipeLocation,
  slot: IllustrationSlot,
  kind: QuickEditKind,
  image_id: Uuid,
): Promise<void> {
  const request: QuickEditRequest = {
    kind,
    location,
    slot_id: slot.slot_id,
    image_id,
    positive_prompt: slot.positive_prompt,
    negative_prompt: slot.negative_prompt,
  };
  if (kind === "inpaint") {
    inpaint.value = { request, bitmap: await load_bitmap(image_id) };
  } else {
    quick_edit.value = request;
  }
}

function close_inpaint(): void {
  inpaint.value?.bitmap.close();
  inpaint.value = null;
}

async function submit_inpaint(payload: {
  readonly mask: Uint8ClampedArray;
  readonly positivePrompt: string;
  readonly negativePrompt: string;
  readonly denoiseStrength: number;
}): Promise<void> {
  const current = inpaint.value;
  if (current === null) {
    return;
  }
  const source = { width: current.bitmap.width, height: current.bitmap.height };
  inpaint_pending.value = true;
  try {
    await props.service.edit(current.request.location, current.request.slot_id, {
      kind: "inpaint",
      image_id: current.request.image_id,
      source,
      mask_png: await encode_mask_png(payload.mask, source.width, source.height),
      positive_prompt: payload.positivePrompt,
      negative_prompt: payload.negativePrompt,
      strength: payload.denoiseStrength,
    });
  } catch {
    // The slot records the submission error and its card shows it.
  } finally {
    inpaint_pending.value = false;
    close_inpaint();
  }
}

const { targets, notices } = use_chat_slots({
  host: props.host,
  service: props.service,
  button_label: () => t("chat.message_button"),
  on_illustrate: (message_id) => {
    dialog_request.value = { message_id, slot_id: null };
  },
});

function is_pending(request_ids: readonly string[]): boolean {
  return request_ids.some((request_id) => props.service.is_pending(request_id));
}

function generate(location: HostSwipeLocation, slot_id: string): void {
  void props.service.generate(location, slot_id).catch(() => {
    // The slot records the submission error and re-renders with it.
  });
}

/** Automatic illustration runs again on its own; otherwise the dialog reopens for the user to confirm. */
function retry_analysis(message_id: number): void {
  if (props.service.auto_generation_enabled()) {
    void props.service.illustrate(message_id).catch(() => {
      // A second failure shows in the same notice.
    });
  } else {
    dialog_request.value = { message_id, slot_id: null };
  }
}

function select(location: HostSwipeLocation, slot_id: string, image_id: Uuid): void {
  void props.service.select_image(location, slot_id, image_id);
}

async function preview(image_id: Uuid): Promise<void> {
  preview_url.value = await load_image(image_id);
}

function close_preview_on_escape(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    preview_url.value = null;
  }
}

onMounted(() => {
  document.addEventListener("keydown", close_preview_on_escape);
  // A failure shows later as missing suggestions and readings that fall back to DeepL.
  props.translator?.prepare().catch(() => undefined);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", close_preview_on_escape);
});
</script>

<template>
  <Teleport v-for="target in targets" :key="target.key" :to="target.element">
    <SlotCard
      :entry="target.slot"
      :pending="is_pending(target.slot.pending_request_ids)"
      :load-image="load_image"
      :can-edit="service.can_edit()"
      @generate="generate(target.location, target.slot.slot_id)"
      @edit="
        dialog_request = { message_id: target.location.message_id, slot_id: target.slot.slot_id }
      "
      @select="(image_id) => select(target.location, target.slot.slot_id, image_id)"
      @preview="preview"
      @quick-edit="
        (kind, image_id) => open_quick_edit(target.location, target.slot, kind, image_id)
      "
    />
  </Teleport>
  <Teleport v-for="target in notices" :key="target.key" :to="target.element">
    <div :class="styles.notice">
      <template v-if="target.notice.status === 'running'">
        <div>{{ t("chat.analysis_running") }}</div>
        <div :class="styles.notice_actions">
          <button
            type="button"
            :class="styles.button"
            data-testid="analysis-cancel"
            @click="service.cancel_analysis(target.message_id)"
          >
            {{ t("common.actions.cancel") }}
          </button>
        </div>
      </template>
      <template v-else-if="target.notice.status === 'wardrobe_failed'">{{
        t("chat.wardrobe_failed", { reason: slot_error_label(t, target.notice.message) })
      }}</template>
      <template v-else>
        <div>
          {{ t("chat.analysis_failed", { reason: slot_error_label(t, target.notice.message) }) }}
        </div>
        <pre v-if="target.notice.excerpt !== null" :class="styles.excerpt">{{
          target.notice.excerpt
        }}</pre>
        <div v-if="target.notice.excerpt !== null">{{ t("chat.dialog.parse_failed_hint") }}</div>
        <div :class="styles.notice_actions">
          <button
            type="button"
            :class="styles.button"
            data-testid="analysis-retry"
            @click="retry_analysis(target.message_id)"
          >
            {{ t("chat.dialog.retry") }}
          </button>
        </div>
      </template>
    </div>
  </Teleport>
  <Teleport v-if="preview_url !== null" to="body">
    <div :class="styles.lightbox" role="dialog" @click="preview_url = null">
      <img :src="preview_url" alt="" />
    </div>
  </Teleport>
  <ParagraphActions
    :service="service"
    @fallback="(message_id) => (dialog_request = { message_id, slot_id: null })"
  />
  <IllustrateDialog
    :request="dialog_request"
    :service="service"
    :novelai="novelai"
    :translator="translator"
    :prompt-tags="promptTags"
    @close="dialog_request = null"
  />
  <QuickEditDialog
    :request="quick_edit"
    :service="service"
    :novelai="novelai"
    :load-bitmap="load_bitmap"
    @close="quick_edit = null"
  />
  <InpaintDialog
    v-if="inpaint !== null"
    :open="true"
    :bitmap="inpaint.bitmap"
    :title="t('chat.quick_edit.inpaint')"
    :close-label="t('chat.dialog.close')"
    :undo-label="t('chat.inpaint.undo')"
    :redo-label="t('chat.inpaint.redo')"
    :erase-label="t('chat.inpaint.erase')"
    :clear-label="t('chat.inpaint.clear')"
    :zoom-in-label="t('chat.inpaint.zoom_in')"
    :zoom-out-label="t('chat.inpaint.zoom_out')"
    upload-label=""
    :show-upload="false"
    :generate-label="t('chat.quick_edit.submit')"
    :brush-size-label="t('chat.inpaint.brush_size')"
    :positive-prompt-label="t('chat.dialog.positive_prompt')"
    :negative-prompt-label="t('chat.dialog.negative_prompt')"
    :denoise-label="t('chat.inpaint.strength')"
    :dimension-error-label="t('chat.inpaint.dimension_error')"
    :pending="inpaint_pending"
    :initial-positive-prompt="inpaint.request.positive_prompt"
    :initial-negative-prompt="inpaint.request.negative_prompt"
    @update:open="(open) => !open && close_inpaint()"
    @submit="submit_inpaint"
  />
</template>
