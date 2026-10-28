<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { computed, inject, ref } from "vue";
import { useI18n } from "vue-i18n";

import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import AppIcon from "./AppIcon.vue";
import styles from "./components_styles.js";

defineProps<{
  readonly src: string;
  readonly alt: string;
  /** Sizes the inline picture; the enlarged one always fits the window. */
  readonly imageClass?: string | undefined;
}>();

const { t } = useI18n();
const open = ref(false);
const portal_target = inject(PORTAL_TARGET_KEY, undefined);
const portal_props = computed(() => (portal_target ? { to: portal_target } : {}));
</script>

<template>
  <button
    type="button"
    :class="styles.zoomTrigger"
    :aria-label="`${t('common.actions.enlarge')}: ${alt}`"
    @click="open = true"
  >
    <img :src="src" :alt="alt" :class="imageClass" />
  </button>
  <DialogRoot v-model:open="open">
    <DialogPortal v-bind="portal_props">
      <DialogOverlay :class="styles.dialogOverlay" @click="open = false" />
      <DialogContent
        :class="styles.zoomContent"
        :aria-describedby="undefined"
        @click="open = false"
      >
        <DialogTitle class="tc-visually-hidden">{{ alt }}</DialogTitle>
        <img :src="src" :alt="alt" :class="styles.zoomImage" />
        <DialogClose
          class="tc-interactive"
          :class="styles.zoomClose"
          :aria-label="t('common.actions.close')"
        >
          <AppIcon :icon="X" :size="18" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
