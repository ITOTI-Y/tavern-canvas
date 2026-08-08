<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "reka-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioRoute } from "../contracts/view_models.js";
import { ICON_STROKE_WIDTH, route_label, STUDIO_ROUTES } from "./route_nav.js";
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

// Desktop rail exposes all six routes directly (task-2-brief.md); labels are resolved once here
// through route_label's exhaustive switch (never a data-driven translate call) so both the
// tooltip text and each button's accessible name come from the same literal-keyed lookup.
const items = computed(() =>
  STUDIO_ROUTES.map((item) => ({ ...item, label: route_label(t, item.route) })),
);
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <nav :class="styles.rail">
      <TooltipRoot v-for="item in items" :key="item.route">
        <TooltipTrigger as-child>
          <button
            type="button"
            class="tc-interactive"
            :class="styles.rail_button"
            :data-selected="item.route === props.route"
            :aria-current="item.route === props.route ? 'page' : undefined"
            :aria-label="item.label"
            @click="emit('select', item.route)"
          >
            <component
              :is="item.icon"
              :size="20"
              :stroke-width="ICON_STROKE_WIDTH"
              aria-hidden="true"
            />
          </button>
        </TooltipTrigger>
        <TooltipPortal :to="portal_target">
          <TooltipContent :class="styles.tooltip_content" side="right" :side-offset="8">
            {{ item.label }}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </nav>
  </TooltipProvider>
</template>
