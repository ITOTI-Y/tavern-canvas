<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { CommandState } from "../../contracts/view_models.js";
import type { ConnectionTestResult } from "../../contracts/ui_capabilities.js";
import AppButton from "../../components/AppButton.vue";
import styles from "./diagnostics.module.css";

const props = defineProps<{
  readonly command: CommandState<ConnectionTestResult>;
  readonly gatewayEndpoint: string | null;
}>();

const emit = defineEmits<{
  run: [];
}>();

const { t } = useI18n();

const is_pending = computed(() => props.command.status === "pending");

function failure_message(code: string): string {
  if (code === "gateway_incompatible" && props.gatewayEndpoint) {
    return t("errors.gateway_incompatible", { origin: props.gatewayEndpoint });
  }
  if (code === "gateway_offline" && props.gatewayEndpoint) {
    return t("errors.gateway_offline", { origin: props.gatewayEndpoint });
  }
  return t("errors.connection_test_failed", { code });
}
</script>

<template>
  <div :class="styles.section" data-testid="connection-tests">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("diagnostics.connection_tests.title") }}</h2>
      <AppButton
        :label="t('diagnostics.connection_tests.run_action')"
        :pending="is_pending"
        @click="emit('run')"
      />
    </div>
    <p v-if="command.status === 'idle'" :class="styles.description">
      {{ t("diagnostics.connection_tests.idle") }}
    </p>
    <p v-else-if="is_pending" :class="styles.description">
      {{ t("diagnostics.connection_tests.running") }}
    </p>
    <div
      v-else-if="command.status === 'success' && command.result.status === 'success'"
      :class="styles.status_text"
      data-tone="success"
      data-testid="connection-test-result"
    >
      {{ t("status.success") }} &middot;
      <span class="tc-tabular-nums">
        {{ t("diagnostics.connection_tests.latency_label", { ms: command.result.latency_ms }) }}
      </span>
    </div>
    <p
      v-else-if="command.status === 'success' && command.result.status === 'failed'"
      :class="[styles.status_text, styles.description]"
      data-tone="error"
      data-testid="connection-test-result"
    >
      {{ failure_message(command.result.code) }}
    </p>
    <p
      v-else-if="command.status === 'error'"
      :class="[styles.status_text, styles.description]"
      data-tone="error"
      data-testid="connection-test-result"
    >
      {{ failure_message(command.failure.code) }}
    </p>
  </div>
</template>
