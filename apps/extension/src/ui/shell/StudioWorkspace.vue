<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import type { PromptRegexRule } from "../contracts/ui_capabilities.js";
import type { StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";
import { use_generation_preview_urls } from "./use_generation_preview_urls.js";

const WorkbenchView = defineAsyncComponent(() => import("../views/workbench/WorkbenchView.vue"));
const PromptView = defineAsyncComponent(() => import("../views/prompt/PromptView.vue"));
const AssetsView = defineAsyncComponent(() => import("../views/assets/AssetsView.vue"));
const GalleryView = defineAsyncComponent(() => import("../views/gallery/GalleryView.vue"));
const DiagnosticsView = defineAsyncComponent(
  () => import("../views/diagnostics/DiagnosticsView.vue"),
);
const SettingsView = defineAsyncComponent(() => import("../views/settings/SettingsView.vue"));

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const preview_urls = use_generation_preview_urls(() => props.state, props.controller);

function test_prompt_regex(rule: PromptRegexRule, sample_text: string): Promise<string> {
  return props.controller.test_prompt_regex(rule, sample_text);
}
</script>

<template>
  <WorkbenchView
    v-if="props.state.route === 'workbench'"
    :state="props.state"
    :preview-urls="preview_urls"
    @select-profile="(id) => void props.controller.select_provider_profile(id)"
    @submit="(command) => void props.controller.submit_generation(command)"
    @cancel-job="(id) => void props.controller.cancel_generation(id)"
    @retry-job="(id) => void props.controller.retry_generation(id)"
    @open-settings="props.controller.set_route('settings')"
    @consume-inspector-selection="props.controller.select_inspector_record(null)"
  />
  <PromptView
    v-else-if="props.state.route === 'prompt'"
    :state="props.state"
    :test-regex="test_prompt_regex"
    @select-preset="(id) => void props.controller.select_prompt_preset(id)"
    @new-preset="props.controller.start_new_prompt_preset()"
    @bulk-delete-presets="(ids) => void props.controller.bulk_remove_prompt_presets(ids)"
    @update-draft="(patch) => props.controller.update_prompt_draft(patch)"
    @save="(draft) => void props.controller.save_prompt_preset(draft)"
  />
  <AssetsView
    v-else-if="props.state.route === 'assets'"
    :state="props.state"
    :controller="props.controller"
  />
  <GalleryView
    v-else-if="props.state.route === 'gallery'"
    :state="props.state"
    :controller="props.controller"
  />
  <DiagnosticsView
    v-else-if="props.state.route === 'diagnostics'"
    :state="props.state"
    :controller="props.controller"
  />
  <SettingsView v-else :state="props.state" :controller="props.controller" />
</template>
