<script setup lang="ts">
import { Ellipsis } from "lucide-vue-next";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "reka-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioRoute } from "../contracts/view_models.js";
import {
  find_route_nav_item,
  ICON_STROKE_WIDTH,
  MOBILE_MORE_ROUTES,
  MOBILE_PRIMARY_ROUTES,
  route_label,
} from "./route_nav.js";
import styles from "./shell.module.css";
import { use_portal_target } from "./use_portal_target.js";

const props = defineProps<{
  route: StudioRoute;
}>();

const emit = defineEmits<{
  select: [route: StudioRoute];
}>();

const { t } = useI18n();
const portal_target = use_portal_target();

// Five stable items: the four primary routes plus "More" (task-2-brief.md). "More" opens
// Diagnostics and Settings in a Reka DropdownMenu portaled to the Shadow Root's portal element.
const primary_items = computed(() =>
  MOBILE_PRIMARY_ROUTES.map((route) => ({
    ...find_route_nav_item(route),
    label: route_label(t, route),
  })),
);
const more_items = computed(() =>
  MOBILE_MORE_ROUTES.map((route) => ({
    ...find_route_nav_item(route),
    label: route_label(t, route),
  })),
);
const is_more_active = computed(() => MOBILE_MORE_ROUTES.includes(props.route));
const more_label = computed(() => t("nav.more"));

function select(route: StudioRoute): void {
  emit("select", route);
}
</script>

<template>
  <nav :class="styles.bottom_nav">
    <button
      v-for="item in primary_items"
      :key="item.route"
      type="button"
      class="tc-interactive"
      :class="styles.bottom_nav_item"
      :data-selected="item.route === props.route"
      :aria-current="item.route === props.route ? 'page' : undefined"
      @click="select(item.route)"
    >
      <component :is="item.icon" :size="20" :stroke-width="ICON_STROKE_WIDTH" aria-hidden="true" />
      <span :class="styles.bottom_nav_item_label">{{ item.label }}</span>
    </button>

    <DropdownMenuRoot>
      <DropdownMenuTrigger as-child>
        <button
          type="button"
          class="tc-interactive"
          :class="styles.bottom_nav_item"
          :data-selected="is_more_active"
          :aria-label="more_label"
          data-testid="mobile-more-trigger"
        >
          <Ellipsis :size="20" :stroke-width="ICON_STROKE_WIDTH" aria-hidden="true" />
          <span :class="styles.bottom_nav_item_label">{{ more_label }}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal :to="portal_target">
        <DropdownMenuContent
          :class="styles.more_menu_content"
          side="top"
          :side-offset="8"
          align="end"
        >
          <DropdownMenuItem
            v-for="item in more_items"
            :key="item.route"
            :class="styles.more_menu_item"
            @select="select(item.route)"
          >
            <component
              :is="item.icon"
              :size="16"
              :stroke-width="ICON_STROKE_WIDTH"
              aria-hidden="true"
            />
            {{ item.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </nav>
</template>
