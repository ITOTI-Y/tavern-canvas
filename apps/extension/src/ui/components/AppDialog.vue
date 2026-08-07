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
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

/**
 * General-purpose modal wrapper around Reka's Dialog primitives. Modal `DialogContent` (the
 * default; non-modal is never used here) forces `trapFocus` internally and restores focus to the
 * trigger on close -- this file does not reimplement that, only tokens/layout. Escape and
 * outside-click both close through Reka's default dismiss handling; `ConfirmDialog` (AlertDialog)
 * is the one that blocks outside-click for destructive actions.
 */
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
/** Portal's `to` prop is optional -- omit the key entirely rather than pass it as `undefined`, so
 * this composes under `exactOptionalPropertyTypes` in every test that runs without a provided
 * portal host. */
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <DialogRoot :open="open" @update:open="handle_open_change">
    <DialogPortal v-bind="portal_props">
      <DialogOverlay :class="styles.dialogOverlay" />
      <DialogContent :class="styles.dialogContent">
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
