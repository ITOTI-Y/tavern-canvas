<script setup lang="ts">
import type { PromptRegexRule } from "../contracts/ui_capabilities.js";
import type { StudioState } from "../contracts/view_models.js";
import type { StudioController } from "../controllers/studio_controller.js";
import AssetsView from "../views/assets/AssetsView.vue";
import DiagnosticsView from "../views/diagnostics/DiagnosticsView.vue";
import GalleryView from "../views/gallery/GalleryView.vue";
import PromptView from "../views/prompt/PromptView.vue";
import SettingsView from "../views/settings/SettingsView.vue";
import WorkbenchView from "../views/workbench/WorkbenchView.vue";
import { use_generation_preview_urls } from "./use_generation_preview_urls.js";

/**
 * Mounts the active route's feature view under StudioShell.vue's workspace region -- the piece
 * every T5/T6/T7 view doc comment flagged as deferred ("StudioShell currently always renders a
 * generic placeholder... mounting into StudioShell's workspace slot is deferred to the stage's
 * whole-review integration pass") and progress.md's stage-review ledger called a MUST-close
 * integration gap. Assets/Gallery/Diagnostics/Settings already accept `state` + `controller`
 * directly and need no translation; Workbench/Prompt stay presentational (state in, intents out --
 * see their own doc comments) precisely so they mount and unit-test standalone, so this component
 * is where their emitted intents become real controller calls.
 */
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
    @select-profile="(id) => props.controller.select_provider_profile(id)"
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
