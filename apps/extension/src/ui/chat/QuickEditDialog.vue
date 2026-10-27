<script setup lang="ts">
import type { NovelAiAugmentTool, NovelAiCostEstimate } from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { NovelAiEmotion, SlotEdit } from "../../modules/illustration/slot_edits.js";
import AppButton from "../components/AppButton.vue";
import AppDialog from "../components/AppDialog.vue";
import AppSelect from "../components/AppSelect.vue";
import type { NovelAiCapability } from "../contracts/ui_capabilities.js";
import styles from "./illustrate_dialog_styles.js";
import type { QuickEditRequest } from "./quick_edit_request.js";
import { AUGMENT_TOOLS, augment_tool_label, EMOTIONS, emotion_label } from "./quick_edit_labels.js";

const props = defineProps<{
  /** Inpainting has its own dialog; every other kind is edited here. */
  readonly request: QuickEditRequest | null;
  readonly service: IllustrationService;
  readonly novelai: NovelAiCapability;
  readonly loadBitmap: (image_id: string) => Promise<ImageBitmap>;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const positive_prompt = ref("");
const negative_prompt = ref("");
const strength = ref(0.6);
const tool = ref<NovelAiAugmentTool>("lineart");
const emotion = ref<NovelAiEmotion>("happy");
const tool_prompt = ref("");
const defry = ref(0);
const source_size = ref<{ width: number; height: number } | null>(null);
const estimate = ref<NovelAiCostEstimate | null>(null);
const submitting = ref(false);
const error = ref<string | null>(null);

const takes_prompt = computed(() => tool.value === "colorize" || tool.value === "emotion");
const title = computed(() => {
  switch (props.request?.kind) {
    case "img2img":
      return t("chat.quick_edit.img2img");
    case "upscale":
      return t("chat.quick_edit.upscale");
    default:
      return t("chat.quick_edit.director");
  }
});
const tool_options = computed(() =>
  AUGMENT_TOOLS.map((value) => ({ value, label: augment_tool_label(t, value) })),
);
const emotion_options = computed(() =>
  EMOTIONS.map((value) => ({ value, label: emotion_label(t, value) })),
);

function current_edit(): Exclude<SlotEdit, { readonly kind: "inpaint" }> | null {
  const request = props.request;
  if (request === null) {
    return null;
  }
  switch (request.kind) {
    case "img2img":
      return source_size.value === null
        ? null
        : {
            kind: "img2img",
            image_id: request.image_id,
            source: source_size.value,
            positive_prompt: positive_prompt.value,
            negative_prompt: negative_prompt.value,
            strength: strength.value,
          };
    case "upscale":
      return { kind: "upscale", image_id: request.image_id };
    case "augment":
      return {
        kind: "augment",
        image_id: request.image_id,
        tool: tool.value,
        ...(tool.value === "emotion" ? { emotion: emotion.value } : {}),
        ...(takes_prompt.value
          ? {
              defry: defry.value,
              ...(tool_prompt.value.trim() ? { tool_prompt: tool_prompt.value.trim() } : {}),
            }
          : {}),
      };
    case "inpaint":
      return null;
  }
}

async function refresh_estimate(): Promise<void> {
  const edit = current_edit();
  estimate.value = null;
  if (edit === null) {
    return;
  }
  try {
    const request = await props.service.preview_edit(edit);
    if (request.provider_id === "novelai") {
      estimate.value = await props.novelai.estimate_cost(request);
    }
  } catch {
    estimate.value = null;
  }
}

watch(
  () => props.request,
  async (request) => {
    if (request === null) {
      return;
    }
    positive_prompt.value = request.positive_prompt;
    negative_prompt.value = request.negative_prompt;
    error.value = null;
    source_size.value = null;
    if (request.kind === "img2img") {
      const bitmap = await props.loadBitmap(request.image_id);
      source_size.value = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
    }
    await refresh_estimate();
  },
  { immediate: true },
);
watch([strength, tool, emotion, defry], () => {
  void refresh_estimate();
});

const estimate_text = computed(() => {
  if (estimate.value === null) {
    return "";
  }
  if (estimate.value.opus_free) {
    return t("chat.dialog.cost_free");
  }
  return estimate.value.anlas === null
    ? t("chat.dialog.cost_rejected")
    : t("chat.dialog.cost_anlas", { anlas: estimate.value.anlas });
});

function set_tool(value: string): void {
  tool.value = AUGMENT_TOOLS.find((candidate) => candidate === value) ?? tool.value;
}

function set_emotion(value: string): void {
  emotion.value = EMOTIONS.find((candidate) => candidate === value) ?? emotion.value;
}

async function confirm(): Promise<void> {
  const request = props.request;
  const edit = current_edit();
  if (request === null || edit === null) {
    return;
  }
  submitting.value = true;
  error.value = null;
  try {
    await props.service.edit(request.location, request.slot_id, edit);
    emit("close");
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : String(caught);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <AppDialog
    :open="request !== null && request.kind !== 'inpaint'"
    :title="title"
    :close-label="t('chat.dialog.close')"
    @update:open="(open) => !open && emit('close')"
  >
    <div :class="styles.body">
      <template v-if="request?.kind === 'img2img'">
        <label :class="styles.label">
          {{ t("chat.dialog.positive_prompt") }}
          <textarea v-model="positive_prompt" :class="styles.prompt" />
        </label>
        <label :class="styles.label">
          {{ t("chat.dialog.negative_prompt") }}
          <textarea v-model="negative_prompt" :class="styles.prompt" />
        </label>
        <label :class="styles.label">
          {{ t("chat.quick_edit.strength", { value: strength.toFixed(2) }) }}
          <input v-model.number="strength" type="range" min="0.01" max="0.99" step="0.01" />
        </label>
      </template>
      <p v-else-if="request?.kind === 'upscale'">{{ t("chat.quick_edit.upscale_description") }}</p>
      <template v-else-if="request?.kind === 'augment'">
        <AppSelect
          :model-value="tool"
          :options="tool_options"
          :placeholder="t('chat.quick_edit.tool')"
          :aria-label="t('chat.quick_edit.tool')"
          @update:model-value="set_tool"
        />
        <AppSelect
          v-if="tool === 'emotion'"
          :model-value="emotion"
          :options="emotion_options"
          :placeholder="t('chat.quick_edit.emotion')"
          :aria-label="t('chat.quick_edit.emotion')"
          @update:model-value="set_emotion"
        />
        <template v-if="takes_prompt">
          <label :class="styles.label">
            {{ t("chat.quick_edit.tool_prompt") }}
            <textarea v-model="tool_prompt" :class="styles.prompt" />
          </label>
          <label :class="styles.label">
            {{ t("chat.quick_edit.defry", { value: defry }) }}
            <input v-model.number="defry" type="range" min="0" max="5" step="1" />
          </label>
        </template>
      </template>
      <p v-if="error !== null" :class="styles.error">{{ error }}</p>
      <div :class="styles.footer">
        <span :class="styles.total">{{ estimate_text }}</span>
        <AppButton :label="t('chat.dialog.cancel')" @click="emit('close')" />
        <AppButton
          :label="t('chat.quick_edit.submit')"
          variant="primary"
          :pending="submitting"
          :disabled="current_edit() === null"
          @click="confirm"
        />
      </div>
    </div>
  </AppDialog>
</template>
