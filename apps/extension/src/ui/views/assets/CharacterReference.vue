<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { CharacterReferenceMode } from "../../../modules/wardrobe/wardrobe_library.js";
import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import SegmentedControl, {
  type SegmentedControlOption,
} from "../../components/SegmentedControl.vue";
import { REFERENCE_IMAGE_KEY } from "../../contracts/portal_keys.js";
import styles from "./assets_styles.js";
import { read_reference_image } from "./reference_image.js";

const props = defineProps<{
  readonly image: string | null;
  readonly send: boolean;
  readonly mode: CharacterReferenceMode;
  /** The prompt the generator starts from, built from the character's current form values. */
  readonly defaultPrompt: { readonly positive_prompt: string; readonly negative_prompt: string };
}>();

const emit = defineEmits<{
  "update:image": [image: string | null];
  "update:send": [send: boolean];
  "update:mode": [mode: CharacterReferenceMode];
  /** A newly generated reference, after `update:image` carried it. */
  generated: [image: string];
}>();

const { t } = useI18n();
const generator = inject(REFERENCE_IMAGE_KEY, null);
const file_input = ref<HTMLInputElement | null>(null);
const error = ref<string | null>(null);
const composing = ref(false);
const generating = ref(false);
const positive_prompt = ref("");
const negative_prompt = ref("");

const mode_options = computed<readonly SegmentedControlOption[]>(() => [
  { value: "vibe", label: t("assets.characters.reference_mode_vibe") },
  { value: "img2img", label: t("assets.characters.reference_mode_img2img") },
  { value: "precise", label: t("assets.characters.reference_mode_precise") },
]);

async function choose_file(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (file === undefined) {
    return;
  }
  error.value = null;
  try {
    emit("update:image", await read_reference_image(file));
  } catch {
    error.value = t("assets.characters.reference_image_unreadable");
  }
}

function start_composing(): void {
  positive_prompt.value = props.defaultPrompt.positive_prompt;
  negative_prompt.value = props.defaultPrompt.negative_prompt;
  error.value = null;
  composing.value = true;
}

async function generate(): Promise<void> {
  if (generator === null) {
    return;
  }
  generating.value = true;
  error.value = null;
  try {
    const blob = await generator.generate({
      positive_prompt: positive_prompt.value,
      negative_prompt: negative_prompt.value,
    });
    const image = await read_reference_image(blob);
    emit("update:image", image);
    emit("generated", image);
    composing.value = false;
  } catch (cause) {
    error.value = t("assets.characters.reference_generate_failed", {
      reason: cause instanceof Error ? cause.message : String(cause),
    });
  } finally {
    generating.value = false;
  }
}
</script>

<template>
  <FieldGroup
    :label="t('assets.characters.reference_image_label')"
    :hint="t('assets.characters.reference_image_hint')"
    :error="error"
  >
    <template #default>
      <div :class="styles.reference">
        <img
          v-if="image !== null"
          :src="image"
          :alt="t('assets.characters.reference_image_label')"
          :class="styles.reference_thumbnail"
        />
        <div :class="styles.reference_actions">
          <input
            ref="file_input"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            data-testid="character-reference-input"
            @change="choose_file"
          />
          <AppButton
            :label="t('assets.characters.reference_upload')"
            @click="file_input?.click()"
          />
          <AppButton
            v-if="generator !== null"
            :label="t('assets.characters.reference_generate')"
            :disabled="composing"
            data-testid="character-reference-generate"
            @click="start_composing"
          />
          <AppButton
            v-if="image !== null"
            :label="t('assets.characters.reference_image_remove')"
            @click="emit('update:image', null)"
          />
        </div>
      </div>
    </template>
  </FieldGroup>
  <div v-if="composing" :class="styles.reference_composer">
    <p :class="styles.chat_scope_note">{{ t("assets.characters.reference_generate_hint") }}</p>
    <FieldGroup :label="t('assets.characters.reference_prompt_label')">
      <template #default="{ fieldId }">
        <textarea :id="fieldId" v-model="positive_prompt" :class="styles.textArea" />
      </template>
    </FieldGroup>
    <FieldGroup :label="t('assets.characters.reference_negative_label')">
      <template #default="{ fieldId }">
        <textarea :id="fieldId" v-model="negative_prompt" :class="styles.textArea" />
      </template>
    </FieldGroup>
    <div :class="styles.reference_actions">
      <AppButton :label="t('common.actions.cancel')" @click="composing = false" />
      <AppButton
        :label="
          image === null
            ? t('assets.characters.reference_generate_submit')
            : t('assets.characters.reference_regenerate_submit')
        "
        variant="primary"
        :pending="generating"
        data-testid="character-reference-submit"
        @click="generate"
      />
    </div>
  </div>
  <template v-if="image !== null">
    <AppCheckbox
      :model-value="send"
      :label="t('assets.characters.reference_send_label')"
      @update:model-value="(value) => emit('update:send', value)"
    />
    <FieldGroup
      :label="t('assets.characters.reference_mode_label')"
      :hint="t('assets.characters.reference_mode_hint')"
    >
      <template #default>
        <SegmentedControl
          :model-value="mode"
          :options="mode_options"
          :label="t('assets.characters.reference_mode_label')"
          @update:model-value="(value) => emit('update:mode', value as CharacterReferenceMode)"
        />
      </template>
    </FieldGroup>
  </template>
</template>
