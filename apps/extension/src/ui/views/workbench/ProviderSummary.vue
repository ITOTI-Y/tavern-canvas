<script setup lang="ts">
import type { Uuid } from "@tavern-canvas/contracts";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { ProviderProfileSummary } from "../../contracts/ui_capabilities.js";
import styles from "./workbench.module.css";

const props = defineProps<{
  readonly profiles: readonly ProviderProfileSummary[];
  readonly activeProfileId: Uuid | null;
  readonly loading: boolean;
  readonly hasError: boolean;
}>();

const emit = defineEmits<{
  select: [profileId: Uuid];
  "open-settings": [];
}>();

const { t } = useI18n();

const surface_status = computed<"loading" | "empty" | "error" | "ready">(() => {
  if (props.loading) {
    return "loading";
  }
  if (props.hasError) {
    return "error";
  }
  return props.profiles.length === 0 ? "empty" : "ready";
});

const empty_message = computed(() => {
  const title = t("workbench.provider_summary.no_profile_title");
  const description = t("workbench.provider_summary.no_profile_description");
  return `${title} ${description}`;
});

const options = computed<readonly AppSelectOption[]>(() =>
  props.profiles.map((profile) => ({
    value: profile.id,
    label: `${profile.display_name} (${profile.provider_id})`,
  })),
);

function handle_select(value: string): void {
  emit("select", value);
}
</script>

<template>
  <div :class="styles.provider_summary" data-testid="provider-summary">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("workbench.provider_summary.title") }}</span>
    </div>
    <StateSurface
      :status="surface_status"
      min-height="56px"
      :empty-message="empty_message"
      :error-message="t('workbench.provider_summary.load_error')"
    >
      <template #action>
        <button
          type="button"
          class="tc-interactive"
          :class="styles.text_action_button"
          data-testid="open-provider-settings"
          @click="emit('open-settings')"
        >
          {{ t("workbench.provider_summary.open_settings_action") }}
        </button>
      </template>
      <AppSelect
        data-testid="provider-select"
        :model-value="props.activeProfileId ?? undefined"
        :options="options"
        :placeholder="t('workbench.provider_summary.select_label')"
        :aria-label="t('workbench.provider_summary.select_label')"
        @update:model-value="handle_select"
      />
    </StateSurface>
  </div>
</template>
