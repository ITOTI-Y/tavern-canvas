<script setup lang="ts">
import type { TavernCanvasSettings } from "@tavern-canvas/contracts";
import { AlertTriangle, CircleCheck } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { StudioController } from "../../controllers/studio_controller.js";
import type { CommandState } from "../../contracts/view_models.js";
import type { ConnectionTestResult } from "../../contracts/ui_capabilities.js";
import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import {
  classify_http_origin,
  is_http_origin_acknowledged,
  normalize_http_origin,
  requires_http_acknowledgment,
} from "../../../transport/http_acknowledgment.js";
import styles from "./settings.module.css";

/**
 * Step 3 (HTTP risk disclosure, plan Step 3 / brief binding): loopback and private-IP HTTP is
 * warning severity, public/unknown-host HTTP is error-colored risk -- neither ever blocks saving
 * the endpoint. Acknowledgment is read straight from `settings.gateway.http_acknowledgments`
 * (persisted, per normalized origin, Stage 04's model) rather than local-only component state, so
 * a page reload does not re-show a banner the user already dismissed for that origin.
 */
const props = defineProps<{
  readonly settings: TavernCanvasSettings | null;
  readonly connectionTestCommand: CommandState<ConnectionTestResult>;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

const EMPTY_GATEWAY = { endpoint: null, token_secret_id: null, http_acknowledgments: {} };

const endpoint_draft = ref(props.settings?.gateway.endpoint ?? "");
const endpoint_error = ref<string | null>(null);
const save_pending = ref(false);
const acknowledge_pending = ref(false);
const token_draft = ref("");
const token_pending = ref(false);
const token_error = ref<string | null>(null);

watch(
  () => props.settings?.gateway.endpoint ?? "",
  (value) => {
    endpoint_draft.value = value;
  },
);

const risk = computed(() => {
  const value = endpoint_draft.value.trim();
  if (value.length === 0) {
    return null;
  }
  try {
    if (!requires_http_acknowledgment(value)) {
      return null;
    }
    const origin = normalize_http_origin(value);
    const classification = classify_http_origin(origin);
    const acknowledged = is_http_origin_acknowledged(
      props.settings?.gateway.http_acknowledgments ?? {},
      origin,
    );
    return {
      origin,
      severity: classification === "public_or_unknown" ? ("error" as const) : ("warning" as const),
      acknowledged,
    };
  } catch {
    return null;
  }
});

async function save_endpoint(): Promise<void> {
  if (save_pending.value) {
    return;
  }
  const value = endpoint_draft.value.trim();
  endpoint_error.value = null;
  if (value.length === 0) {
    save_pending.value = true;
    try {
      await props.controller.update_settings({
        gateway: { ...(props.settings?.gateway ?? EMPTY_GATEWAY), endpoint: null },
      });
    } finally {
      save_pending.value = false;
    }
    return;
  }
  let normalized: string;
  try {
    normalized = normalize_http_origin(value);
  } catch {
    endpoint_error.value = t("errors.validation_required");
    return;
  }
  save_pending.value = true;
  try {
    await props.controller.update_settings({
      gateway: { ...(props.settings?.gateway ?? EMPTY_GATEWAY), endpoint: normalized },
    });
  } finally {
    save_pending.value = false;
  }
}

async function acknowledge(): Promise<void> {
  const current = risk.value;
  if (!current || acknowledge_pending.value) {
    return;
  }
  acknowledge_pending.value = true;
  try {
    await props.controller.acknowledge_http_origin(current.origin);
  } finally {
    acknowledge_pending.value = false;
  }
}

/** The plaintext never lands in settings: the controller hands it to the selected credential
 * backend and only the returned reference is rendered. The draft clears after the write. */
async function save_token(): Promise<void> {
  const value = token_draft.value.trim();
  token_error.value = null;
  if (value.length === 0 || token_pending.value) {
    return;
  }
  token_pending.value = true;
  try {
    await props.controller.set_gateway_token(value);
    token_draft.value = "";
  } catch {
    token_error.value = t("settings.credential_storage.unlock_required");
  } finally {
    token_pending.value = false;
  }
}

async function clear_token(): Promise<void> {
  if (token_pending.value) {
    return;
  }
  token_pending.value = true;
  token_error.value = null;
  try {
    await props.controller.clear_gateway_token();
  } catch {
    token_error.value = t("settings.credential_storage.unlock_required");
  } finally {
    token_pending.value = false;
  }
}

function detect_protocol(): void {
  void props.controller.test_diagnostics_connection();
}

const is_detecting = computed(() => props.connectionTestCommand.status === "pending");
</script>

<template>
  <div :class="styles.section" data-testid="gateway-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">{{ t("settings.sections.gateway") }}</h2>
    </div>

    <div :class="styles.form_grid">
      <FieldGroup
        :label="t('settings.gateway.endpoint_label')"
        :hint="t('settings.gateway.endpoint_hint')"
        :error="endpoint_error"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="endpoint_draft"
            type="text"
            :aria-describedby="describedBy"
            :class="styles.typed_confirm_input"
            data-testid="gateway-endpoint-input"
            @blur="save_endpoint"
          />
        </template>
      </FieldGroup>

      <div
        v-if="risk && !risk.acknowledged"
        :class="styles.risk_banner"
        :data-severity="risk.severity"
        data-testid="http-risk-banner"
        role="alert"
      >
        <div :class="styles.risk_banner_title">
          <AppIcon :icon="AlertTriangle" :size="16" />
          {{ t("settings.http_risk.warning_title") }}
        </div>
        <p :class="styles.risk_banner_description">
          {{
            risk.severity === "error"
              ? t("settings.http_risk.error_description_public", { origin: risk.origin })
              : t("settings.http_risk.warning_description_local", { origin: risk.origin })
          }}
        </p>
        <p :class="styles.risk_banner_description">{{ t("settings.http_risk.disclosure") }}</p>
        <div :class="styles.risk_banner_actions">
          <AppButton
            :label="t('settings.http_risk.continue_action')"
            :pending="acknowledge_pending"
            @click="acknowledge"
          />
        </div>
      </div>
      <div
        v-else-if="risk && risk.acknowledged"
        :class="styles.acknowledged_note"
        data-testid="http-risk-acknowledged"
      >
        <AppIcon :icon="CircleCheck" :size="14" />
        {{ t("settings.http_risk.acknowledged_label") }}
      </div>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.gateway.protocol_label") }}</span>
        <AppButton
          :label="t('settings.gateway.detect_action')"
          variant="secondary"
          :pending="is_detecting"
          @click="detect_protocol"
        />
      </div>

      <FieldGroup :label="t('settings.gateway.token_secret_label')">
        <template #default="{ fieldId }">
          <span :id="fieldId" :class="styles.row_value" data-testid="gateway-token-reference">
            {{ settings?.gateway.token_secret_id ?? t("settings.gateway.token_not_set") }}
          </span>
        </template>
      </FieldGroup>

      <FieldGroup
        :label="t('settings.gateway.token_label')"
        :hint="t('settings.gateway.token_hint')"
        :error="token_error"
      >
        <template #default="{ fieldId, describedBy }">
          <input
            :id="fieldId"
            v-model="token_draft"
            type="password"
            autocomplete="off"
            :aria-describedby="describedBy"
            :class="styles.typed_confirm_input"
            data-testid="gateway-token-input"
          />
        </template>
      </FieldGroup>

      <div :class="styles.row">
        <AppButton
          :label="t('settings.gateway.token_save_action')"
          :pending="token_pending"
          :disabled="token_draft.trim().length === 0"
          data-testid="gateway-token-save"
          @click="save_token"
        />
        <AppButton
          v-if="settings?.gateway.token_secret_id"
          :label="t('settings.gateway.token_clear_action')"
          variant="secondary"
          :pending="token_pending"
          data-testid="gateway-token-clear"
          @click="clear_token"
        />
      </div>
    </div>
  </div>
</template>
