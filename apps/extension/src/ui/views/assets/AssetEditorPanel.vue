<script setup lang="ts">
import { X } from "lucide-vue-next";
import { nextTick, ref, watch } from "vue";

import IconButton from "../../components/IconButton.vue";
import styles from "./assets_styles.js";

const props = withDefaults(
  defineProps<{
    readonly open: boolean;
    readonly title: string;
    readonly description: string;
    readonly closeLabel: string;
    /** `undefined` leaves the header without a picture, `null` shows the empty placeholder. */
    readonly thumbnail?: string | null | undefined;
  }>(),
  { thumbnail: undefined },
);

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const root = ref<HTMLElement | null>(null);

/** Opening moves focus into the panel; on a narrow window it sits under the list, so scroll to it. */
watch(
  () => props.open,
  async (open) => {
    if (!open) {
      return;
    }
    await nextTick();
    root.value?.focus({ preventScroll: true });
    root.value?.scrollIntoView({ block: "nearest" });
  },
);
</script>

<template>
  <aside
    v-if="open"
    ref="root"
    :class="styles.editor"
    :aria-label="title"
    tabindex="-1"
    data-testid="asset-editor"
    @keydown.esc="emit('update:open', false)"
  >
    <header :class="styles.editorHead">
      <span
        v-if="thumbnail !== undefined"
        :class="styles.editorThumb"
        :data-empty="thumbnail === null ? '' : undefined"
      >
        <img v-if="thumbnail !== null" :src="thumbnail" alt="" />
      </span>
      <div :class="styles.editorHeading">
        <h3 :class="styles.editorTitle">{{ title }}</h3>
        <p :class="styles.editorDescription">{{ description }}</p>
      </div>
      <IconButton :icon="X" :label="closeLabel" @click="emit('update:open', false)" />
    </header>
    <div :class="styles.editorBody">
      <slot />
    </div>
  </aside>
</template>
