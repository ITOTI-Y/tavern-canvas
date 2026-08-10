<script setup lang="ts">
import { Check, ChevronDown } from "lucide-vue-next";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import { drop_undefined } from "./_prop_utils.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

export interface AppSelectOption {
  readonly value: string;
  readonly label: string;
}

/**
 * Option-set control (roadmap rule: "option sets use selects/menus"). Wraps Reka's Select
 * primitives for the `role="combobox"`/`listbox` pair, typeahead, and arrow-key navigation. The
 * `placeholder` here is the standard "nothing chosen yet" affordance inside the closed trigger --
 * distinct from a field label, which the caller always supplies separately (via `FieldGroup` or
 * its own visible text), so it never substitutes as the label (taste directive: no
 * placeholder-as-label).
 */
const props = withDefaults(
  defineProps<{
    readonly modelValue: string | undefined;
    readonly options: readonly AppSelectOption[];
    readonly placeholder: string;
    readonly disabled?: boolean;
    readonly id?: string | undefined;
    readonly describedBy?: string | undefined;
    readonly ariaLabel?: string | undefined;
  }>(),
  {
    id: undefined,
    describedBy: undefined,
    ariaLabel: undefined,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function handle_update(value: unknown): void {
  emit("update:modelValue", value as string);
}

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
const trigger_props = computed(() =>
  drop_undefined({
    id: props.id,
    "aria-describedby": props.describedBy,
    "aria-label": props.ariaLabel,
  }),
);
const root_props = computed(() => drop_undefined({ modelValue: props.modelValue }));
</script>

<template>
  <SelectRoot v-bind="root_props" :disabled="disabled" @update:model-value="handle_update">
    <SelectTrigger v-bind="trigger_props" class="tc-interactive" :class="styles.selectTrigger">
      <SelectValue :class="styles.selectValue" :placeholder="placeholder" />
      <SelectIcon as-child>
        <AppIcon :icon="ChevronDown" :size="16" />
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal v-bind="portal_props">
      <SelectContent :class="styles.selectContent" :side-offset="4" position="popper">
        <SelectViewport :class="styles.selectViewport">
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :class="styles.selectItem"
            :value="option.value"
          >
            <SelectItemText>{{ option.label }}</SelectItemText>
            <SelectItemIndicator :class="styles.selectItemIndicator">
              <AppIcon :icon="Check" :size="14" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
