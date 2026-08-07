<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
} from "reka-ui";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

import { ICON_STROKE_WIDTH } from "./route_nav.js";
import styles from "./shell.module.css";
import { use_portal_target } from "./use_portal_target.js";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const { t } = useI18n();
const portal_target = use_portal_target();

function close(): void {
  emit("update:open", false);
}

// `document.activeElement` does not pierce an open Shadow Root: from the top-level document's own
// perspective it retargets to the shadow host (#tavern-canvas-root, a plain unfocusable div), not
// the real focused descendant inside it -- confirmed directly against a real Chromium instance,
// not assumed (happy-dom, this repo's unit-test environment, does not reproduce this retargeting,
// which is exactly why a real-browser check caught it). Walking into `.shadowRoot.activeElement`
// finds the element that actually triggered the sheet (the top bar's inspector toggle).
function deep_active_element(root: Document | ShadowRoot): Element | null {
  const active = root.activeElement;
  return active?.shadowRoot ? deep_active_element(active.shadowRoot) : active;
}

let element_to_restore_focus_to: HTMLElement | null = null;

watch(
  () => props.open,
  (open) => {
    if (open) {
      const active = deep_active_element(document);
      element_to_restore_focus_to = active instanceof HTMLElement ? active : null;
    }
  },
);

function on_close_auto_focus(event: Event): void {
  event.preventDefault();
  element_to_restore_focus_to?.focus();
  element_to_restore_focus_to = null;
}
</script>

<template>
  <DrawerRoot
    :open="open"
    modal
    swipe-direction="down"
    @update:open="(next: boolean) => emit('update:open', next)"
  >
    <DrawerPortal :to="portal_target">
      <DrawerOverlay :class="styles.sheet_overlay" />
      <DrawerContent
        :class="styles.sheet_content"
        data-testid="inspector-sheet"
        @close-auto-focus="on_close_auto_focus"
      >
        <DrawerHandle :class="styles.sheet_handle" />
        <DrawerTitle class="tc-visually-hidden">{{ t("common.inspector.title") }}</DrawerTitle>
        <DrawerDescription class="tc-visually-hidden">
          {{ t("common.inspector.empty_description") }}
        </DrawerDescription>
        <div :class="styles.sheet_header">
          <span>{{ t("common.inspector.title") }}</span>
          <button
            type="button"
            class="tc-interactive"
            :class="styles.icon_button"
            :aria-label="t('common.actions.close')"
            @click="close"
          >
            <X :size="18" :stroke-width="ICON_STROKE_WIDTH" aria-hidden="true" />
          </button>
        </div>
        <div :class="styles.sheet_body">
          <p>{{ t("common.inspector.empty_title") }}</p>
          <p>{{ t("common.inspector.empty_description") }}</p>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
