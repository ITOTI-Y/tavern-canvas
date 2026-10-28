<script setup lang="ts">
import { ImagePlus } from "lucide-vue-next";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import ZoomableImage from "../../components/ZoomableImage.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import { REFERENCE_IMAGE_KEY } from "../../contracts/portal_keys.js";
import styles from "./assets_styles.js";
import { read_reference_image } from "./reference_image.js";

const props = defineProps<{
  readonly image: string | null;
  /** Built from the outfit's current tags when the button is pressed. */
  readonly prompt: () => { readonly positive_prompt: string; readonly negative_prompt: string };
}>();

const emit = defineEmits<{
  "update:image": [image: string | null];
}>();

const { t } = useI18n();
const generator = inject(REFERENCE_IMAGE_KEY, null);
const generating = ref(false);
const error = ref<string | null>(null);

async function generate(): Promise<void> {
  if (generator === null) {
    return;
  }
  generating.value = true;
  error.value = null;
  try {
    emit("update:image", await read_reference_image(await generator.generate(props.prompt())));
  } catch (cause) {
    error.value = t("assets.outfits.preview_failed", {
      reason: cause instanceof Error ? cause.message : String(cause),
    });
  } finally {
    generating.value = false;
  }
}
</script>

<template>
  <FieldGroup
    v-if="generator !== null || image !== null"
    :label="t('assets.outfits.preview_label')"
    :hint="t('assets.outfits.preview_hint')"
    :error="error"
  >
    <template #default>
      <div :class="styles.reference">
        <ZoomableImage
          v-if="image !== null"
          :src="image"
          :alt="t('assets.outfits.preview_label')"
          :image-class="styles.reference_thumbnail"
        />
        <div :class="styles.reference_actions">
          <AppButton
            v-if="generator !== null"
            :label="
              image === null
                ? t('assets.outfits.preview_generate')
                : t('assets.outfits.preview_regenerate')
            "
            :icon="ImagePlus"
            :pending="generating"
            data-testid="outfit-preview-generate"
            @click="generate"
          />
          <AppButton
            v-if="image !== null"
            :label="t('assets.outfits.preview_remove')"
            variant="ghost"
            @click="emit('update:image', null)"
          />
        </div>
      </div>
    </template>
  </FieldGroup>
</template>
