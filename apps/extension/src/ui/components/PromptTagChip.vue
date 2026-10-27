<script setup lang="ts">
import type { PromptTagChoice, PromptTagPreset } from "@tavern-canvas/contracts";
import { Check } from "lucide-vue-next";
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "reka-ui";
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

const props = defineProps<{
  readonly prefix: string;
  readonly choice: PromptTagChoice;
  /** Presets of this chip's kind, built-in ones first. */
  readonly presets: readonly PromptTagPreset[];
  readonly customGroupLabel: string;
  readonly missingLabel: string;
  readonly enableLabel: string;
  readonly disableLabel: string;
}>();

const emit = defineEmits<{
  "update:choice": [choice: PromptTagChoice];
}>();

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));

const selected = computed(() =>
  props.presets.find((preset) => preset.id === props.choice.preset_id),
);
const selected_label = computed(() => {
  const preset = selected.value;
  if (preset === undefined) {
    return props.missingLabel;
  }
  return preset.group === null ? preset.label : `${preset.label} · ${preset.group}`;
});

const groups = computed(() => {
  const by_group = new Map<string, PromptTagPreset[]>();
  for (const preset of props.presets) {
    const group = preset.group ?? props.customGroupLabel;
    by_group.set(group, [...(by_group.get(group) ?? []), preset]);
  }
  return [...by_group.entries()].map(([label, presets]) => ({ label, presets }));
});

function choose(preset: PromptTagPreset): void {
  emit("update:choice", { enabled: true, preset_id: preset.id });
}

function toggle(): void {
  emit("update:choice", { ...props.choice, enabled: !props.choice.enabled });
}
</script>

<template>
  <div :class="styles.promptTagChip" :data-enabled="choice.enabled ? '' : undefined">
    <PopoverRoot>
      <PopoverTrigger class="tc-interactive" :class="styles.promptTagTrigger">
        {{ prefix }}{{ selected_label }}
      </PopoverTrigger>
      <PopoverPortal v-bind="portal_props">
        <PopoverContent
          :class="styles.promptTagContent"
          :side-offset="4"
          align="end"
          data-testid="prompt-tag-list"
        >
          <section v-for="group in groups" :key="group.label" :class="styles.promptTagGroup">
            <h4 :class="styles.promptTagGroupTitle">{{ group.label }}</h4>
            <button
              v-for="preset in group.presets"
              :key="preset.id"
              type="button"
              class="tc-interactive"
              :class="styles.promptTagOption"
              :aria-pressed="preset.id === choice.preset_id"
              @click="choose(preset)"
            >
              <span :class="styles.promptTagOptionLabel">
                {{ preset.label }}
                <AppIcon v-if="preset.id === choice.preset_id" :icon="Check" :size="14" />
              </span>
              <span
                :class="[
                  styles.promptTagOptionText,
                  preset.kind === 'undesired_content' && styles.promptTagOptionTextClamped,
                ]"
                >{{ preset.text }}</span
              >
            </button>
          </section>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <button
      type="button"
      class="tc-interactive"
      :class="styles.promptTagToggle"
      :aria-pressed="choice.enabled"
      :aria-label="choice.enabled ? disableLabel : enableLabel"
      @click="toggle"
    >
      <AppIcon :icon="Check" :size="14" />
    </button>
  </div>
</template>
