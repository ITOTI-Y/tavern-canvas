<script setup lang="ts">
import { Cable } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

import AppIcon from "../../components/AppIcon.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import type { StudioState } from "../../contracts/view_models.js";
import AppearanceSettings from "./AppearanceSettings.vue";
import AutomationSettings from "./AutomationSettings.vue";
import DataSettings from "./DataSettings.vue";
import CredentialStorageSettings from "./CredentialStorageSettings.vue";
import GatewaySettings from "./GatewaySettings.vue";
import LlmConnections from "./LlmConnections.vue";
import ProviderProfiles from "./ProviderProfiles.vue";
import styles from "./settings.module.css";

/**
 * Top-level Settings workspace. Reads `state.workbench.profiles` (provider profile summaries --
 * they never carry `secret_reference`, only the read/write draft type does) and
 * `state.diagnostics.migration`/`connection_test_command` (cross-slice, read-only) alongside its
 * own `state.settings.*` slice. Every mutation goes through `controller`, passed straight to each
 * section so no intermediate event-relay layer has to enumerate every command by hand.
 */
defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="styles.view" data-testid="settings-view">
    <h1 v-if="state.workbench.profiles.length > 0" class="tc-visually-hidden">
      {{ t("nav.settings") }}
    </h1>

    <section
      v-else
      :class="styles.onboarding"
      data-testid="settings-onboarding"
      aria-labelledby="settings-onboarding-title"
    >
      <div :class="styles.onboarding_icon" aria-hidden="true">
        <AppIcon :icon="Cable" :size="22" />
      </div>
      <div>
        <p :class="styles.onboarding_label">{{ t("settings.onboarding.label") }}</p>
        <h1 id="settings-onboarding-title" :class="styles.onboarding_title">
          {{ t("settings.onboarding.title") }}
        </h1>
        <p :class="styles.onboarding_description">
          {{ t("settings.onboarding.description") }}
        </p>
      </div>
    </section>

    <CredentialStorageSettings
      :settings="state.settings.settings"
      :vault-status="state.settings.browser_secret_vault"
      :controller="controller"
    />

    <ProviderProfiles :profiles="state.workbench.profiles" :controller="controller" />

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

    <AutomationSettings :settings="state.settings.settings" :controller="controller" />

    <AppearanceSettings :settings="state.settings.settings" :controller="controller" />

    <DataSettings
      :vocabulary-update-channel="state.settings.vocabulary_update_channel"
      :migration="state.diagnostics.migration"
      :migration-retry-command="state.settings.migration_retry_command"
      :controller="controller"
    />
  </div>
</template>
