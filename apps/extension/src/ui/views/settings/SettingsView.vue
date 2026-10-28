<script setup lang="ts">
import {
  BookOpenText,
  Cable,
  Image,
  Languages,
  ScanSearch,
  SlidersHorizontal,
  Sparkles,
} from "lucide-vue-next";
import { type Component, computed, defineAsyncComponent, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppIcon from "../../components/AppIcon.vue";
import ToastViewport from "../../components/ToastViewport.vue";
import type { PromptRegexRule } from "../../contracts/ui_capabilities.js";
import type { SettingsSection, StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import AppearanceSettings from "./AppearanceSettings.vue";
import CredentialStorageSettings from "./CredentialStorageSettings.vue";
import DataSettings from "./DataSettings.vue";
import IllustrationSettings from "./IllustrationSettings.vue";
import NovelAiSettings from "./NovelAiSettings.vue";
import ProviderProfiles from "./ProviderProfiles.vue";
import styles from "./settings_styles.js";
import TranslationSettings from "./TranslationSettings.vue";
import { use_toasts } from "../prompt/use_toasts.js";

const PromptView = defineAsyncComponent(() => import("../prompt/PromptView.vue"));
const PromptTagPresetPanel = defineAsyncComponent(
  () => import("../prompt/PromptTagPresetPanel.vue"),
);
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
    case "general":
      return t("settings.nav.general");
    case "diagnostics":
      return t("settings.nav.diagnostics");
  }
}

const SECTION_ICONS: Readonly<Record<SettingsSection, Component>> = {
  illustration: Sparkles,
  providers: Image,
  translation: Languages,
  prompts: BookOpenText,
  general: SlidersHorizontal,
  diagnostics: ScanSearch,
};

/** One literal translate call per section; tools/locale_check forbids dynamic keys. */
function section_description(item: SettingsSection): string {
  switch (item) {
    case "illustration":
      return t("settings.pane.illustration");
    case "providers":
      return t("settings.pane.providers");
    case "translation":
      return t("settings.pane.translation");
    case "prompts":
      return t("settings.pane.prompts");
    case "general":
      return t("settings.pane.general");
    case "diagnostics":
      return t("settings.pane.diagnostics");
  }
}

const section = computed(() => props.state.settings_section);

const { toasts, push: push_toast, dismiss: dismiss_toast } = use_toasts();
watch(
  () => props.state.settings.update_command.status,
  (status, previous) => {
    if (status === "success" && previous === "pending") {
      push_toast({ title: t("settings.saved"), variant: "success", duration: 1800 });
    }
  },
);

/** NovelAI parameters belong to the profile generation uses, which is the active one. */
const active_novelai_profile = computed(
  () =>
    props.state.generation.profiles.find(
      (profile) =>
        profile.id === props.state.generation.active_profile_id &&
        profile.provider_id === "novelai",
    ) ?? null,
);

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
        <AppIcon :icon="SECTION_ICONS[item]" :size="15" />
        <span>{{ section_label(item) }}</span>
      </button>
    </nav>

    <div :class="styles.section_content">
      <header :class="styles.pane_head">
        <h1 :class="styles.pane_title">{{ section_label(section) }}</h1>
        <p :class="styles.pane_description">{{ section_description(section) }}</p>
      </header>
      <p
        v-if="state.settings.update_command.status === 'error'"
        :class="[styles.status_text, styles.description]"
        data-tone="error"
        role="alert"
        data-testid="settings-save-failed"
      >
        {{ t("settings.save_failed", { code: state.settings.update_command.failure.code }) }}
      </p>
      <template v-if="section === 'prompts'">
        <PromptView
          :state="state"
          :test-regex="test_prompt_regex"
          @select-preset="(id) => void controller.select_prompt_preset(id)"
          @new-preset="controller.start_new_prompt_preset()"
          @bulk-delete-presets="(ids) => void controller.bulk_remove_prompt_presets(ids)"
          @update-draft="(patch) => controller.update_prompt_draft(patch)"
          @save="(draft) => void controller.save_prompt_preset(draft)"
        />
        <PromptTagPresetPanel
          :records="state.assets.records.prompt_tag"
          :loading="state.loading.has('assets')"
          :controller="controller"
        />
      </template>
      <DiagnosticsView
        v-else-if="section === 'diagnostics'"
        :state="state"
        :controller="controller"
      />
      <div v-else :class="styles.view">
        <template v-if="section === 'illustration'">
          <IllustrationSettings
            :settings="state.settings.settings"
            :prompt-presets="state.prompt.presets"
            :controller="controller"
          />
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
          <ProviderProfiles
            :profiles="state.generation.profiles"
            :prompt-tag-presets="state.assets.records.prompt_tag"
            :controller="controller"
          />
          <NovelAiSettings
            v-if="active_novelai_profile !== null"
            :profile="active_novelai_profile"
            :vibes="state.assets.records.vibe"
            :controller="controller"
          />
        </template>
        <TranslationSettings
          v-else-if="section === 'translation'"
          :settings="state.settings.settings"
          :controller="controller"
        />
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

    <ToastViewport
      :toasts="toasts"
      :viewport-label="t('common.notifications.viewport_label')"
      :announce-label="t('common.notifications.announce_label')"
      :close-label="t('common.actions.close')"
      @dismiss="dismiss_toast"
    />
  </div>
</template>
