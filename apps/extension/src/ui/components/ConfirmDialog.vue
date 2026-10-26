<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from "reka-ui";
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

/** The confirm button is a plain button, not `AlertDialogAction`: the caller closes via `update:open` only after the async action settles. */
withDefaults(
  defineProps<{
    readonly open: boolean;
    readonly title: string;
    readonly description: string;
    readonly confirmLabel: string;
    readonly cancelLabel: string;
    readonly pending?: boolean;
  }>(),
  {
    pending: false,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  confirm: [];
}>();

function handle_open_change(value: boolean): void {
  emit("update:open", value);
}

function handle_confirm(): void {
  emit("confirm");
}

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <AlertDialogRoot :open="open" @update:open="handle_open_change">
    <AlertDialogPortal v-bind="portal_props">
      <AlertDialogOverlay :class="styles.dialogOverlay" />
      <AlertDialogContent :class="[styles.dialogContent, styles.confirmDialogContent]">
        <AlertDialogTitle :class="styles.dialogTitle">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription :class="styles.dialogDescription">
          {{ description }}
        </AlertDialogDescription>
        <div :class="styles.confirmDialogActions">
          <AlertDialogCancel
            class="tc-interactive"
            :class="[styles.appButton, styles.appButtonSecondary]"
            :disabled="pending"
          >
            {{ cancelLabel }}
          </AlertDialogCancel>
          <button
            type="button"
            class="tc-interactive"
            :class="[styles.appButton, styles.appButtonDestructive]"
            :disabled="pending"
            :aria-busy="pending"
            :aria-label="confirmLabel"
            @click="handle_confirm"
          >
            <span
              :class="[styles.appButtonContent, pending && styles.appButtonContentPending]"
              aria-hidden="true"
            >
              <span :class="styles.appButtonLabel">{{ confirmLabel }}</span>
            </span>
            <span v-if="pending" :class="styles.appButtonSpinner" aria-hidden="true">
              <AppIcon :icon="LoaderCircle" :size="16" />
            </span>
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
