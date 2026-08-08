<script setup lang="ts">
import { computed, defineAsyncComponent, ref, type SlotsType, type VNode } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioRoute } from "../contracts/view_models.js";
import { ICON_STROKE_WIDTH, route_label, STUDIO_ROUTES } from "./route_nav.js";
import styles from "./shell.module.css";

const props = defineProps<{
  route: StudioRoute;
}>();

const emit = defineEmits<{
  select: [route: StudioRoute];
}>();

const { t } = useI18n();

// Desktop rail exposes all six routes directly (task-2-brief.md); labels are resolved once here
// through route_label's exhaustive switch (never a data-driven translate call) so both the
// tooltip text and each button's accessible name come from the same literal-keyed lookup.
const items = computed(() =>
  STUDIO_ROUTES.map((item) => ({ ...item, label: route_label(t, item.route) })),
);

const RailTooltip = defineAsyncComponent(() => import("./RailTooltip.vue"));

/** Renders the rail button alone until the tooltip chunk is wanted, so the rail's markup and
 * layout are identical whether or not Reka's Tooltip primitives have loaded. */
const BareButton = (_props: unknown, context: { slots: SlotsType }): VNode[] =>
  (context.slots as { default?: () => VNode[] }).default?.() ?? [];

const tooltips_wanted = ref(false);

function want_tooltips(): void {
  tooltips_wanted.value = true;
}
</script>

<template>
  <nav :class="styles.rail" @pointerenter="want_tooltips" @focusin="want_tooltips">
    <component
      :is="tooltips_wanted ? RailTooltip : BareButton"
      v-for="item in items"
      :key="item.route"
      :label="item.label"
    >
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
    </component>
  </nav>
</template>
