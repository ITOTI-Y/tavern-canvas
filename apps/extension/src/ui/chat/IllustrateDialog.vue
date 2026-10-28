<script setup lang="ts">
import type {
  IllustrationSlot,
  NovelAiCostEstimate,
  SlotCharacterPrompt,
  Wearing,
} from "@tavern-canvas/contracts";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { HostSwipeLocation } from "../../host/index.js";
import { AnalysisParseError } from "../../modules/illustration/analysis.js";
import { is_named, type SlotLibrary } from "../../modules/illustration/library_match.js";
import type { Paragraph } from "../../modules/illustration/slot_markers.js";
import { replace_outfit_tags, wearing_of, wearing_tags } from "../../modules/wardrobe/wearing.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { PromptTranslator } from "../../modules/translation/prompt_translator.js";
import AppButton from "../components/AppButton.vue";
import AppCheckbox from "../components/AppCheckbox.vue";
import AppDialog from "../components/AppDialog.vue";
import StateSurface from "../components/StateSurface.vue";
import type { PromptTagsPort } from "../contracts/prompt_tags_port.js";
import type { NovelAiCapability } from "../contracts/ui_capabilities.js";
import styles from "./illustrate_dialog_styles.js";
import type { IllustrateRequest } from "./illustrate_request.js";
import OutfitPicker from "./OutfitPicker.vue";
import PromptField from "./PromptField.vue";
import PromptTagChips from "./PromptTagChips.vue";

interface SlotDraft {
  readonly slot_id: string;
  readonly anchor: string;
  readonly scene: string;
  selected: boolean;
  positive_prompt: string;
  negative_prompt: string;
  character_prompts: { -readonly [Key in keyof SlotCharacterPrompt]: SlotCharacterPrompt[Key] }[];
  estimate: NovelAiCostEstimate | null;
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
  readonly promptTags: PromptTagsPort;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const state = ref<DialogState>({ status: "analyzing" });
const drafts = ref<SlotDraft[]>([]);
const submitting = ref(false);
const submit_error = ref<string | null>(null);
const wardrobe = ref<{ library: SlotLibrary; snapshot: readonly Wearing[] } | null>(null);
const open_paragraphs = ref<readonly Paragraph[]>([]);
const chosen = ref<readonly number[]>([]);
const picker_open = ref(false);
const adding = ref(false);
const add_error = ref<string | null>(null);

const PARAGRAPH_LABEL_LENGTH = 120;

function paragraph_label(paragraph: Paragraph): string {
  return paragraph.text.length > PARAGRAPH_LABEL_LENGTH
    ? `${paragraph.text.slice(0, PARAGRAPH_LABEL_LENGTH)}…`
    : paragraph.text;
}

function toggle_paragraph(index: number, on: boolean): void {
  chosen.value = on
    ? [...chosen.value, index]
    : chosen.value.filter((candidate) => candidate !== index);
}

function to_draft(slot: IllustrationSlot, selected: boolean): SlotDraft {
  return {
    slot_id: slot.slot_id,
    anchor: slot.anchor,
    scene: slot.scene,
    selected,
    positive_prompt: slot.positive_prompt,
    negative_prompt: slot.negative_prompt,
    character_prompts: slot.character_prompts.map((character) => ({ ...character })),
    estimate: null,
  };
}

function library_character(name: string) {
  return wardrobe.value?.library.characters.find((character) => is_named(character, name)) ?? null;
}

/** The picker's data for a library character, as a list of zero or one for `v-for`. */
function outfit_views(name: string) {
  const view = wardrobe.value;
  const character = library_character(name);
  return view === null || character === null
    ? []
    : [
        {
          character,
          wearing: wearing_of(character, view.snapshot, view.library.outfits),
          outfits: view.library.outfits,
        },
      ];
}

function wearing_for(name: string): Wearing | null {
  const view = wardrobe.value;
  const character = library_character(name);
  return view === null || character === null
    ? null
    : wearing_of(character, view.snapshot, view.library.outfits);
}

/** Saves the corrected outfit on this reply and swaps the outfit tags in every draft's prompt. */
async function change_wearing(name: string, next: Wearing): Promise<void> {
  const view = wardrobe.value;
  const previous = wearing_for(name);
  if (view === null || previous === null || state.value.status !== "ready") {
    return;
  }
  const old_tags = wearing_tags(previous, view.library.outfits);
  const new_tags = wearing_tags(next, view.library.outfits);
  for (const draft of drafts.value) {
    for (const character of draft.character_prompts) {
      if (character.name === name) {
        character.prompt = replace_outfit_tags(character.prompt, old_tags, new_tags);
      }
    }
  }
  wardrobe.value = {
    ...view,
    snapshot: [...view.snapshot.filter((item) => item.character_id !== next.character_id), next],
  };
  await props.service.set_wearing(state.value.location, next);
}

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
  wardrobe.value = null;
  submit_error.value = null;
  open_paragraphs.value = [];
  chosen.value = [];
  picker_open.value = false;
  add_error.value = null;
  try {
    const record = await props.service.analyze(request.message_id);
    const location = await props.service.active_location(request.message_id);
    drafts.value = record.slots
      .filter((slot) => request.slot_id === null || slot.slot_id === request.slot_id)
      .map((slot) => to_draft(slot, request.slot_id !== null || slot.image_ids.length === 0));
    wardrobe.value = await props.service.wardrobe_view(location);
    if (request.slot_id === null) {
      open_paragraphs.value = await props.service.open_paragraphs(location);
    }
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

async function add_chosen(): Promise<void> {
  const current = state.value;
  if (current.status !== "ready" || chosen.value.length === 0) {
    return;
  }
  adding.value = true;
  add_error.value = null;
  try {
    const slots = await props.service.add_paragraphs(current.location, chosen.value);
    const added = slots.map((slot) => to_draft(slot, true));
    drafts.value = [...drafts.value, ...added];
    const taken = new Set(slots.map((slot) => slot.paragraph));
    open_paragraphs.value = open_paragraphs.value.filter(
      (paragraph) => !taken.has(paragraph.index),
    );
    chosen.value = [];
    picker_open.value = false;
    // Estimate through the reactive proxies so each cost shows as soon as it arrives.
    await Promise.all(
      drafts.value.slice(-added.length).map((draft) => estimate(current.location, draft)),
    );
  } catch (error) {
    add_error.value = error instanceof Error ? error.message : String(error);
  } finally {
    adding.value = false;
  }
}

async function confirm(): Promise<void> {
  const current = state.value;
  if (current.status !== "ready") {
    return;
  }
  submitting.value = true;
  submit_error.value = null;
  const total = selected.value.length;
  let submitted = 0;
  try {
    for (const draft of selected.value) {
      await props.service.generate(current.location, draft.slot_id, {
        positive_prompt: draft.positive_prompt,
        negative_prompt: draft.negative_prompt,
        character_prompts: draft.character_prompts.filter(
          (character) => character.prompt.trim() !== "",
        ),
      });
      // A queued slot is unticked so confirming again after a later failure does not pay for it twice.
      draft.selected = false;
      submitted += 1;
    }
    emit("close");
  } catch (error) {
    submit_error.value = t("chat.dialog.submit_partial", {
      submitted,
      total,
      reason: error instanceof Error ? error.message : String(error),
    });
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
    if (state.value.status === "analyzing" && props.request !== null) {
      props.service.cancel_analysis(props.request.message_id);
    }
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
          <PromptField
            v-model="draft.positive_prompt"
            :label="
              draft.character_prompts.length > 0
                ? t('chat.dialog.base_prompt')
                : t('chat.dialog.positive_prompt')
            "
            :translator="translator"
          />
          <div :class="styles.chips">
            <PromptTagChips :port="promptTags" kind="quality" />
          </div>
          <template v-for="character in draft.character_prompts" :key="character.name">
            <PromptField
              v-model="character.prompt"
              :label="t('chat.dialog.character_prompt', { name: character.name })"
              :translator="translator"
              data-testid="character-prompt"
            />
            <OutfitPicker
              v-for="view in outfit_views(character.name)"
              :key="view.character.id"
              :character="view.character"
              :wearing="view.wearing"
              :outfits="view.outfits"
              @change="(next) => void change_wearing(character.name, next)"
            />
          </template>
          <PromptField
            v-model="draft.negative_prompt"
            :label="t('chat.dialog.negative_prompt')"
            :translator="translator"
          />
          <div :class="styles.chips">
            <PromptTagChips :port="promptTags" kind="undesired_content" />
          </div>
          <div :class="styles.meta">
            <span>{{ estimate_label(draft) }}</span>
          </div>
        </section>
        <section v-if="open_paragraphs.length > 0" :class="styles.picker">
          <AppButton
            :label="t('chat.dialog.pick_paragraphs', { count: open_paragraphs.length })"
            :aria-expanded="picker_open"
            data-testid="pick-paragraphs"
            @click="picker_open = !picker_open"
          />
          <template v-if="picker_open">
            <p :class="styles.hint">{{ t("chat.dialog.pick_paragraphs_hint") }}</p>
            <div :class="styles.paragraphs">
              <AppCheckbox
                v-for="paragraph in open_paragraphs"
                :key="paragraph.index"
                :model-value="chosen.includes(paragraph.index)"
                :label="paragraph_label(paragraph)"
                @update:model-value="(on) => toggle_paragraph(paragraph.index, on === true)"
              />
            </div>
            <p v-if="add_error !== null" :class="styles.error">{{ add_error }}</p>
            <div :class="styles.footer">
              <AppButton
                :label="t('chat.dialog.add_paragraphs', { count: chosen.length })"
                :pending="adding"
                :disabled="chosen.length === 0"
                data-testid="add-paragraphs"
                @click="add_chosen"
              />
            </div>
          </template>
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
