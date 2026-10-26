<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../components/AppIcon.vue";
import type { StudioRoute } from "../contracts/view_models.js";
import { route_label, STUDIO_ROUTES } from "./route_nav.js";
import styles from "./shell.module.css";

const props = defineProps<{
  route: StudioRoute;
}>();

const emit = defineEmits<{
  select: [route: StudioRoute];
}>();

const { t } = useI18n();

const items = computed(() =>
  STUDIO_ROUTES.map((item) => ({ ...item, label: route_label(t, item.route) })),
);
</script>

<template>
  <nav :class="styles.bottom_nav" data-testid="studio-bottom-nav">
    <button
      v-for="item in items"
      :key="item.route"
      type="button"
      class="tc-interactive"
      :class="styles.bottom_nav_item"
      :data-selected="item.route === props.route"
      :aria-current="item.route === props.route ? 'page' : undefined"
      @click="emit('select', item.route)"
    >
      <AppIcon :icon="item.icon" :size="20" />
      <span :class="styles.bottom_nav_item_label">{{ item.label }}</span>
    </button>
  </nav>
</template>
