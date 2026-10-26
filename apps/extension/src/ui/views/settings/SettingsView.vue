<script setup lang="ts">
import { Cable } from "lucide-vue-next";
import { computed, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../../components/AppIcon.vue";
import type { PromptRegexRule } from "../../contracts/ui_capabilities.js";
import type { SettingsSection, StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import AppearanceSettings from "./AppearanceSettings.vue";
import AutomationSettings from "./AutomationSettings.vue";
import CredentialStorageSettings from "./CredentialStorageSettings.vue";
import DataSettings from "./DataSettings.vue";
import GatewaySettings from "./GatewaySettings.vue";
import LlmConnections from "./LlmConnections.vue";
import ProviderProfiles from "./ProviderProfiles.vue";
import styles from "./settings.module.css";

const PromptView = defineAsyncComponent(() => import("../prompt/PromptView.vue"));
const AssetsView = defineAsyncComponent(() => import("../assets/AssetsView.vue"));
const DiagnosticsView = defineAsyncComponent(() => import("../diagnostics/DiagnosticsView.vue"));

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const SECTIONS: readonly SettingsSection[] = [
  "illustration",
  "providers",
  "translation",
  "prompts",
  "library",
  "connections",
  "general",
  "diagnostics",
];

/** One literal translate call per section; tools/locale_check forbids dynamic keys. */
function section_label(section: SettingsSection): string {
  switch (section) {
    case "illustration":
      return t("settings.nav.illustration");
    case "providers":
      return t("settings.nav.providers");
    case "translation":
      return t("settings.nav.translation");
    case "prompts":
      return t("settings.nav.prompts");
    case "library":
      return t("settings.nav.library");
    case "connections":
      return t("settings.nav.connections");
    case "general":
      return t("settings.nav.general");
    case "diagnostics":
      return t("settings.nav.diagnostics");
  }
}

const section = computed(() => props.state.settings_section);

function test_prompt_regex(rule: PromptRegexRule, sample_text: string): Promise<string> {
  return props.controller.test_prompt_regex(rule, sample_text);
}
</script>

<template>
  <div :class="styles.layout" data-testid="settings-view">
    <nav :class="styles.section_nav" :aria-label="t('nav.settings')">
      <button
        v-for="item in SECTIONS"
        :key="item"
        type="button"
        class="tc-interactive"
        :class="styles.section_nav_item"
        :data-selected="item === section"
        :aria-current="item === section ? 'page' : undefined"
        @click="controller.set_settings_section(item)"
      >
        {{ section_label(item) }}
      </button>
    </nav>

    <div :class="styles.section_content">
      <PromptView
        v-if="section === 'prompts'"
        :state="state"
        :test-regex="test_prompt_regex"
        @select-preset="(id) => void controller.select_prompt_preset(id)"
        @new-preset="controller.start_new_prompt_preset()"
        @bulk-delete-presets="(ids) => void controller.bulk_remove_prompt_presets(ids)"
        @update-draft="(patch) => controller.update_prompt_draft(patch)"
        @save="(draft) => void controller.save_prompt_preset(draft)"
      />
      <AssetsView v-else-if="section === 'library'" :state="state" :controller="controller" />
      <DiagnosticsView
        v-else-if="section === 'diagnostics'"
        :state="state"
        :controller="controller"
      />
      <div v-else :class="styles.view">
        <h1 class="tc-visually-hidden">{{ section_label(section) }}</h1>
        <template v-if="section === 'illustration'">
          <AutomationSettings :settings="state.settings.settings" :controller="controller" />
        </template>
        <template v-else-if="section === 'providers'">
          <section
            v-if="state.generation.profiles.length === 0"
            :class="styles.onboarding"
            data-testid="settings-onboarding"
            aria-labelledby="settings-onboarding-title"
          >
            <div :class="styles.onboarding_icon" aria-hidden="true">
              <AppIcon :icon="Cable" :size="22" />
            </div>
            <div>
              <p :class="styles.onboarding_label">{{ t("settings.onboarding.label") }}</p>
              <h2 id="settings-onboarding-title" :class="styles.onboarding_title">
                {{ t("settings.onboarding.title") }}
              </h2>
              <p :class="styles.onboarding_description">
                {{ t("settings.onboarding.description") }}
              </p>
            </div>
          </section>
          <ProviderProfiles :profiles="state.generation.profiles" :controller="controller" />
        </template>
        <template v-else-if="section === 'connections'">
          <LlmConnections
            :connections="state.llm_connections.connections"
            :loading="state.loading.has('llm_connections')"
            :controller="controller"
          />
          <GatewaySettings
            :settings="state.settings.settings"
            :connection-test-command="state.diagnostics.connection_test_command"
            :controller="controller"
          />
        </template>
        <template v-else-if="section === 'general'">
          <AppearanceSettings :settings="state.settings.settings" :controller="controller" />
          <CredentialStorageSettings
            :settings="state.settings.settings"
            :vault-status="state.settings.browser_secret_vault"
            :controller="controller"
          />
          <DataSettings
            :vocabulary-update-channel="state.settings.vocabulary_update_channel"
            :controller="controller"
          />
        </template>
      </div>
    </div>
  </div>
</template>
