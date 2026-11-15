<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { computed, inject, onBeforeUnmount, onMounted } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components_styles.js";

defineProps<{
  readonly open: boolean;
  readonly title: string;
  readonly description?: string;
  readonly closeLabel: string;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

function handle_open_change(value: boolean): void {
  emit("update:open", value);
}

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));

/**
 * A popover opened from inside the dialog is portaled next to it, so a press on it lands outside
 * the dialog's content. Reka recognises such a layer by searching the document, which does not
 * reach into the shadow root Inkwell renders in, and would close the dialog before the press
 * becomes a click. The press is read here, during dispatch, while its path is still available.
 */
let pressed_in_another_layer = false;

function note_press(event: PointerEvent): void {
  pressed_in_another_layer = event
    .composedPath()
    .some((node) => node instanceof HTMLElement && node.dataset.dismissableLayer !== undefined);
}

function keep_open_for_another_layer(event: Event): void {
  if (pressed_in_another_layer) {
    event.preventDefault();
  }
}

onMounted(() => {
  window.addEventListener("pointerdown", note_press, true);
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", note_press, true);
});
</script>

<template>
  <DialogRoot :open="open" @update:open="handle_open_change">
    <DialogPortal v-bind="portal_props">
      <DialogOverlay :class="styles.dialogOverlay" />
      <DialogContent
        :class="styles.dialogContent"
        @pointer-down-outside="keep_open_for_another_layer"
      >
        <header :class="styles.dialogHeader">
          <DialogTitle :class="styles.dialogTitle">{{ title }}</DialogTitle>
          <DialogClose class="tc-interactive" :class="styles.dialogClose" :aria-label="closeLabel">
            <AppIcon :icon="X" :size="18" />
          </DialogClose>
        </header>
        <DialogDescription v-if="description" :class="styles.dialogDescription">
          {{ description }}
        </DialogDescription>
        <div :class="styles.dialogBody">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
