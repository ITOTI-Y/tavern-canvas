<script setup lang="ts">
import type { NovelAiCostEstimate } from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { HostSwipeLocation } from "../../host/index.js";
import { AnalysisParseError } from "../../modules/illustration/analysis.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { PromptTranslator } from "../../modules/translation/prompt_translator.js";
import AppButton from "../components/AppButton.vue";
import AppCheckbox from "../components/AppCheckbox.vue";
import AppDialog from "../components/AppDialog.vue";
import StateSurface from "../components/StateSurface.vue";
import type { NovelAiCapability } from "../contracts/ui_capabilities.js";
import styles from "./illustrate_dialog.module.css";
import type { IllustrateRequest } from "./illustrate_request.js";

interface SlotDraft {
  readonly slot_id: string;
  readonly anchor: string;
  readonly scene: string;
  selected: boolean;
  positive_prompt: string;
  negative_prompt: string;
  estimate: NovelAiCostEstimate | null;
  translating: boolean;
  reading: string | null;
  translation_error: string | null;
}

type DialogState =
  | { readonly status: "analyzing" }
  | { readonly status: "ready"; readonly location: HostSwipeLocation }
  | { readonly status: "failed"; readonly message: string; readonly excerpt: string | null };

const props = defineProps<{
  readonly request: IllustrateRequest | null;
  readonly service: IllustrationService;
  readonly novelai: NovelAiCapability;
  readonly translator: PromptTranslator | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const state = ref<DialogState>({ status: "analyzing" });
const drafts = ref<SlotDraft[]>([]);
const submitting = ref(false);
const submit_error = ref<string | null>(null);

const selected = computed(() => drafts.value.filter((draft) => draft.selected));
const total_anlas = computed(() => {
  let total = 0;
  for (const draft of selected.value) {
    if (draft.estimate?.anlas === null || draft.estimate === null) {
      return null;
    }
    total += draft.estimate.anlas;
  }
  return total;
});

async function estimate(location: HostSwipeLocation, draft: SlotDraft): Promise<void> {
  try {
    const request = await props.service.preview_request(location, draft.slot_id, draft);
    if (request.provider_id === "novelai") {
      draft.estimate = await props.novelai.estimate_cost(request);
    }
  } catch {
    draft.estimate = null;
  }
}

async function load(request: IllustrateRequest): Promise<void> {
  state.value = { status: "analyzing" };
  drafts.value = [];
  submit_error.value = null;
  try {
    const record = await props.service.analyze(request.message_id);
    const location = await props.service.active_location(request.message_id);
    drafts.value = record.slots
      .filter((slot) => request.slot_id === null || slot.slot_id === request.slot_id)
      .map((slot) => ({
        slot_id: slot.slot_id,
        anchor: slot.anchor,
        scene: slot.scene,
        selected: request.slot_id !== null || slot.image_ids.length === 0,
        positive_prompt: slot.positive_prompt,
        negative_prompt: slot.negative_prompt,
        estimate: null,
        translating: false,
        reading: null,
        translation_error: null,
      }));
    state.value = { status: "ready", location };
    await Promise.all(drafts.value.map((draft) => estimate(location, draft)));
  } catch (error) {
    state.value = {
      status: "failed",
      message: error instanceof Error ? error.message : String(error),
      excerpt: error instanceof AnalysisParseError ? error.excerpt : null,
    };
  }
}

watch(
  () => props.request,
  (request) => {
    if (request !== null) {
      void load(request);
    }
  },
  { immediate: true },
);

async function translate(draft: SlotDraft, direction: "to_tags" | "read"): Promise<void> {
  const translator = props.translator;
  if (translator === null) {
    return;
  }
  draft.translating = true;
  draft.translation_error = null;
  try {
    if (direction === "to_tags") {
      draft.positive_prompt = await translator.to_tags(draft.positive_prompt);
      draft.reading = null;
    } else {
      draft.reading = await translator.read_in_chinese(draft.positive_prompt);
    }
  } catch (error) {
    draft.translation_error = error instanceof Error ? error.message : String(error);
  } finally {
    draft.translating = false;
  }
}

async function confirm(): Promise<void> {
  const current = state.value;
  if (current.status !== "ready") {
    return;
  }
  submitting.value = true;
  submit_error.value = null;
  try {
    for (const draft of selected.value) {
      await props.service.generate(current.location, draft.slot_id, {
        positive_prompt: draft.positive_prompt,
        negative_prompt: draft.negative_prompt,
      });
    }
    emit("close");
  } catch (error) {
    submit_error.value = error instanceof Error ? error.message : String(error);
  } finally {
    submitting.value = false;
  }
}

function estimate_label(draft: SlotDraft): string {
  if (draft.estimate === null) {
    return "";
  }
  if (draft.estimate.opus_free) {
    return t("chat.dialog.cost_free");
  }
  return draft.estimate.anlas === null
    ? t("chat.dialog.cost_rejected")
    : t("chat.dialog.cost_anlas", { anlas: draft.estimate.anlas });
}

function update_open(open: boolean): void {
  if (!open) {
    emit("close");
  }
}
</script>

<template>
  <AppDialog
    :open="request !== null"
    :title="t('chat.dialog.title')"
    :close-label="t('chat.dialog.close')"
    @update:open="update_open"
  >
    <div :class="styles.body">
      <StateSurface v-if="state.status === 'analyzing'" status="loading" min-height="160px" />
      <template v-else-if="state.status === 'failed'">
        <p :class="styles.error">{{ state.message }}</p>
        <template v-if="state.excerpt !== null">
          <p>{{ t("chat.dialog.parse_failed_hint") }}</p>
          <pre :class="styles.excerpt">{{ state.excerpt }}</pre>
        </template>
        <div :class="styles.footer">
          <AppButton
            :label="t('chat.dialog.retry')"
            variant="primary"
            @click="request !== null && load(request)"
          />
        </div>
      </template>
      <template v-else>
        <p v-if="drafts.length === 0">{{ t("chat.dialog.no_slots") }}</p>
        <section v-for="draft in drafts" :key="draft.slot_id" :class="styles.slot">
          <AppCheckbox v-model="draft.selected" :label="draft.scene" />
          <blockquote :class="styles.anchor">{{ draft.anchor }}</blockquote>
          <label :class="styles.label">
            {{ t("chat.dialog.positive_prompt") }}
            <textarea v-model="draft.positive_prompt" :class="styles.prompt" />
          </label>
          <div v-if="translator !== null" :class="styles.meta">
            <span>
              <AppButton
                :label="t('chat.dialog.translate_to_tags')"
                :pending="draft.translating"
                @click="translate(draft, 'to_tags')"
              />
              <AppButton
                :label="t('chat.dialog.read_in_chinese')"
                :pending="draft.translating"
                @click="translate(draft, 'read')"
              />
            </span>
          </div>
          <p v-if="draft.reading !== null" :class="styles.anchor">{{ draft.reading }}</p>
          <p v-if="draft.translation_error !== null" :class="styles.error">
            {{ draft.translation_error }}
          </p>
          <label :class="styles.label">
            {{ t("chat.dialog.negative_prompt") }}
            <textarea v-model="draft.negative_prompt" :class="styles.prompt" />
          </label>
          <div :class="styles.meta">
            <span>{{ estimate_label(draft) }}</span>
          </div>
        </section>
        <p v-if="submit_error !== null" :class="styles.error">{{ submit_error }}</p>
        <div :class="styles.footer">
          <span v-if="total_anlas !== null && selected.length > 0" :class="styles.total">
            {{ t("chat.dialog.total_anlas", { anlas: total_anlas }) }}
          </span>
          <AppButton :label="t('chat.dialog.cancel')" @click="emit('close')" />
          <AppButton
            :label="t('chat.dialog.confirm', { count: selected.length })"
            variant="primary"
            :pending="submitting"
            :disabled="selected.length === 0"
            @click="confirm"
          />
        </div>
      </template>
    </div>
  </AppDialog>
</template>
