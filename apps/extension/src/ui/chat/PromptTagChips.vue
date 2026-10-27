<script setup lang="ts">
import type { PromptTagChoice, PromptTagKind } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import {
  effective_prompt_tags,
  prompt_tag_presets,
} from "../../modules/illustration/prompt_tags.js";
import PromptTagChip from "../components/PromptTagChip.vue";
import type { PromptTagsPort } from "../contracts/prompt_tags_port.js";

const props = defineProps<{
  readonly port: PromptTagsPort;
  readonly kind: PromptTagKind;
}>();

const { t } = useI18n();

const presets = computed(() =>
  prompt_tag_presets(props.port.custom_presets).filter((preset) => preset.kind === props.kind),
);

const selection = computed(() =>
  props.port.profile === null ? null : effective_prompt_tags(props.port.profile),
);

function save(choice: PromptTagChoice): void {
  const profile = props.port.profile;
  if (profile !== null && selection.value !== null) {
    void props.port.save(profile.id, { ...selection.value, [props.kind]: choice });
  }
}
</script>

<template>
  <PromptTagChip
    v-if="selection !== null"
    :prefix="
      kind === 'quality' ? t('prompt_tags.quality_prefix') : t('prompt_tags.undesired_prefix')
    "
    :choice="selection[kind]"
    :presets="presets"
    :custom-group-label="t('prompt_tags.custom_group')"
    :missing-label="t('prompt_tags.missing')"
    :enable-label="t('prompt_tags.enable')"
    :disable-label="t('prompt_tags.disable')"
    :data-testid="`prompt-tag-chip-${kind}`"
    @update:choice="save"
  />
</template>
