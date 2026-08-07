<script setup lang="ts" generic="TItem">
import { useVirtualizer } from "@tanstack/vue-virtual";
import { computed, ref } from "vue";

import styles from "./components.module.css";

/**
 * Fixed-height virtualized list wrapping TanStack Vue Virtual. `height` is a fixed viewport size
 * the caller reserves up front, so the container's own box never changes as `items` grows,
 * shrinks, or is still loading -- only the scroll content inside it does.
 */
const props = withDefaults(
  defineProps<{
    readonly items: readonly TItem[];
    readonly itemSize: number;
    readonly height: string;
    readonly overscan?: number;
    readonly getKey?: (item: TItem, index: number) => string | number;
    readonly ariaLabel?: string;
  }>(),
  {
    overscan: 6,
  },
);

const scroll_parent = ref<HTMLElement | null>(null);

const virtualizer = useVirtualizer(
  computed(() => ({
    count: props.items.length,
    getScrollElement: () => scroll_parent.value,
    estimateSize: () => props.itemSize,
    overscan: props.overscan,
    getItemKey: (index: number) => {
      const item = props.items[index];
      if (props.getKey && item !== undefined) {
        return props.getKey(item, index);
      }
      return index;
    },
  })),
);

const virtual_items = computed(() => virtualizer.value.getVirtualItems());
const total_size = computed(() => virtualizer.value.getTotalSize());
</script>

<template>
  <div
    ref="scroll_parent"
    :class="styles.virtualList"
    :style="{ height }"
    role="list"
    :aria-label="ariaLabel"
  >
    <div :class="styles.virtualListSizer" :style="{ height: `${total_size}px` }">
      <div
        v-for="virtual_row in virtual_items"
        :key="String(virtual_row.key)"
        role="listitem"
        :class="styles.virtualListItem"
        :style="{
          height: `${virtual_row.size}px`,
          transform: `translateY(${virtual_row.start}px)`,
        }"
      >
        <slot :item="items[virtual_row.index]" :index="virtual_row.index" />
      </div>
    </div>
  </div>
</template>
