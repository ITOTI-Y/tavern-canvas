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
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import type { InspectorSelection } from "../contracts/view_models.js";
import styles from "./shell.module.css";
import { use_portal_target } from "./use_portal_target.js";

const props = defineProps<{
  open: boolean;
  selection?: InspectorSelection | null;
}>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const { t } = useI18n();
const portal_target = use_portal_target();

function close(): void {
  emit("update:open", false);
}

// `document.activeElement` is retargeted to the shadow host; read `shadowRoot.activeElement` to find the element that opened the sheet.
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

const selection_kind_label = computed(() => {
  const selection = props.selection;
  if (!selection) {
    return null;
  }
  if (selection.kind === "generation_job") {
    return t("common.inspector.selection.kind_generation_job");
  }
  if (selection.kind === "gallery_record") {
    return t("common.inspector.selection.kind_gallery_record");
  }
  return t("common.inspector.selection.kind_asset");
});

const selection_id = computed(() => {
  const selection = props.selection;
  if (!selection) {
    return null;
  }
  if (selection.kind === "generation_job") {
    return selection.job_id;
  }
  if (selection.kind === "gallery_record") {
    return selection.record_id;
  }
  return selection.asset_id;
});

const selection_intent_label = computed(() => {
  const selection = props.selection;
  if (selection?.kind !== "gallery_record") {
    return null;
  }
  switch (selection.intent) {
    case "modify_prompt":
      return t("common.inspector.selection.intent_modify_prompt");
    case "regenerate":
      return t("common.inspector.selection.intent_regenerate");
    case "edit":
      return t("common.inspector.selection.intent_edit");
    case "inpaint":
      return t("common.inspector.selection.intent_inpaint");
    default:
      return null;
  }
});
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
            <AppIcon :icon="X" :size="18" />
          </button>
        </div>
        <div :class="styles.sheet_body">
          <template v-if="selection">
            <p :class="styles.inspector_selection_kind">{{ selection_kind_label }}</p>
            <dl :class="styles.inspector_selection">
              <div>
                <dt>{{ t("common.inspector.selection.id_label") }}</dt>
                <dd class="tc-tabular-nums">{{ selection_id }}</dd>
              </div>
              <div v-if="selection_intent_label">
                <dt>{{ t("common.inspector.selection.action_label") }}</dt>
                <dd>{{ selection_intent_label }}</dd>
              </div>
            </dl>
          </template>
          <template v-else>
            <p>{{ t("common.inspector.empty_title") }}</p>
            <p>{{ t("common.inspector.empty_description") }}</p>
          </template>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
