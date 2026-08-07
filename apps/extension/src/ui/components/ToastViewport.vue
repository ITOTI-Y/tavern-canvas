<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport as RekaToastViewport,
} from "reka-ui";
import { computed, inject } from "vue";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components.module.css";

export interface ToastItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: "info" | "success" | "error";
}

/**
 * Transient completion notices only (roadmap: toasts report things like "copied parameters" or a
 * successful save, never primary content). Driven entirely by the `toasts` prop -- no internal
 * timers/state -- so the caller owns dismissal timing and can test it deterministically. Every
 * visible string is a prop; `viewportLabel`/`announceLabel` override Reka's own hard-coded English
 * defaults ("Notifications (F8)" / "Notification") the same way `NumberStepper` overrides
 * increase/decrease.
 */
defineProps<{
  readonly toasts: readonly ToastItem[];
  readonly viewportLabel: string;
  readonly announceLabel: string;
  readonly closeLabel: string;
}>();

const emit = defineEmits<{
  dismiss: [id: string];
}>();

function handle_open_change(id: string, open: boolean): void {
  if (!open) {
    emit("dismiss", id);
  }
}

const VARIANT_CLASSES = {
  info: undefined,
  success: styles.toastSuccess,
  error: styles.toastError,
} as const;

const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <ToastProvider :label="announceLabel" :duration="5000">
    <ToastPortal v-bind="portal_props">
      <RekaToastViewport class="tc-z-toast" :class="styles.toastViewport" :label="viewportLabel">
        <ToastRoot
          v-for="toast in toasts"
          :key="toast.id"
          :class="[styles.toastRoot, VARIANT_CLASSES[toast.variant ?? 'info']]"
          :type="toast.variant === 'error' ? 'foreground' : 'background'"
          :open="true"
          @update:open="(open: boolean) => handle_open_change(toast.id, open)"
        >
          <ToastTitle :class="styles.toastTitle">{{ toast.title }}</ToastTitle>
          <ToastDescription v-if="toast.description" :class="styles.toastDescription">
            {{ toast.description }}
          </ToastDescription>
          <ToastClose class="tc-interactive" :class="styles.toastClose" :aria-label="closeLabel">
            <AppIcon :icon="X" :size="14" />
          </ToastClose>
        </ToastRoot>
      </RekaToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>
