<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import type { StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";

const GalleryView = defineAsyncComponent(() => import("../views/gallery/GalleryView.vue"));
const SettingsView = defineAsyncComponent(() => import("../views/settings/SettingsView.vue"));

defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();
</script>

<template>
  <GalleryView v-if="state.route === 'gallery'" :state="state" :controller="controller" />
  <SettingsView v-else :state="state" :controller="controller" />
</template>
