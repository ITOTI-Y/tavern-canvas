<script setup lang="ts">
import {
  NovelAiGenerationDefaultsSchema,
  NovelAiNoiseScheduleSchema,
  NovelAiQualityPresetSchema,
  NovelAiSamplerSchema,
  NovelAiUndesiredContentPresetSchema,
  novelai_ignored_parameters,
  resolve_novelai_model,
  type NovelAiAccountStatus,
  type NovelAiGenerationDefaults,
  type ResolvedNovelAiModel,
  type Uuid,
} from "@tavern-canvas/contracts";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import {
  DEFAULT_NOVELAI_MODEL_ID,
  novelai_default_parameters,
} from "../../../modules/novelai/novelai_request_defaults.js";
import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import type {
  AssetRecordSummary,
  ProviderProfileSummary,
} from "../../contracts/ui_capabilities.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import {
  ignored_parameter_label,
  NOISE_SCHEDULE_NAMES,
  quality_preset_label,
  SAMPLER_NAMES,
  undesired_content_label,
} from "./novelai_labels.js";
import styles from "./settings.module.css";

const props = defineProps<{
  readonly profile: ProviderProfileSummary;
  readonly vibes: readonly AssetRecordSummary[];
  readonly controller: StudioController;
}>();

const { t, d } = useI18n();

/** A profile can still name a model from another provider or one NovelAI has retired. */
const model_id = computed(() => {
  const saved = props.profile.model_id;
  return saved != null && resolve_novelai_model(saved) !== null ? saved : DEFAULT_NOVELAI_MODEL_ID;
});

function initial_defaults(): NovelAiGenerationDefaults {
  if (props.profile.novelai_defaults !== null) {
    return props.profile.novelai_defaults;
  }
  const parameters = novelai_default_parameters(model_id.value);
  return {
    width: parameters.width,
    height: parameters.height,
    steps: parameters.steps,
    scale: parameters.scale,
    cfg_rescale: parameters.cfg_rescale,
    sampler: parameters.sampler,
    noise_schedule: parameters.noise_schedule,
    quality_preset: parameters.quality_preset,
    undesired_content_preset: parameters.undesired_content_preset,
    smea: parameters.smea,
    dyn: parameters.dyn,
    variety_plus: parameters.variety_plus,
    vibe_asset_ids: [],
  };
}

const draft = ref<NovelAiGenerationDefaults>(initial_defaults());
watch(
  () => props.profile.id,
  () => {
    draft.value = initial_defaults();
  },
);

function patch(partial: Partial<NovelAiGenerationDefaults>): void {
  draft.value = { ...draft.value, ...partial };
}

const validation_error = computed(() =>
  NovelAiGenerationDefaultsSchema.safeParse(draft.value).success
    ? null
    : t("settings.novelai.invalid_size"),
);

const ignored = computed(() => {
  const resolved = resolve_novelai_model(model_id.value);
  return resolved === null ? [] : novelai_ignored_parameters(resolved.profile, draft.value);
});

const account = ref<NovelAiAccountStatus | null>(null);
const account_error = ref<string | null>(null);
/** A network-level failure here is the browser blocking NovelAI's account API (CORS), as in TauriTavern. */
const account_unreachable = ref(false);
const NOVELAI_ACCOUNT_URL = "https://novelai.net/image";
const account_pending = ref(false);

async function refresh_account(): Promise<void> {
  account_pending.value = true;
  account_error.value = null;
  account_unreachable.value = false;
  try {
    account.value = await props.controller.load_novelai_account();
  } catch (error) {
    account_unreachable.value = error instanceof Error && error.name === "ProviderNetworkError";
    account_error.value = error instanceof Error ? error.message : String(error);
  } finally {
    account_pending.value = false;
  }
}

const models = ref<readonly ResolvedNovelAiModel[]>([]);
onMounted(async () => {
  try {
    models.value = (await props.controller.load_novelai_models()).filter(
      (model) => model.profile.selectable,
    );
  } catch {
    models.value = [];
  }
});
const model_options = computed(() =>
  models.value.map((model) => ({
    value: model.profile.model_id,
    label: model.profile.display_name,
  })),
);

async function set_model(value: string): Promise<void> {
  await props.controller.save_provider_profile({
    id: props.profile.id,
    provider_id: props.profile.provider_id,
    display_name: props.profile.display_name,
    model_id: value,
    workflow_id: props.profile.workflow_id ?? null,
    is_default: props.profile.is_default,
    updated_at: props.profile.updated_at,
  });
}

const sampler_options = NovelAiSamplerSchema.options.map((value) => ({
  value,
  label: SAMPLER_NAMES[value],
}));
const noise_options = NovelAiNoiseScheduleSchema.options.map((value) => ({
  value,
  label: NOISE_SCHEDULE_NAMES[value],
}));
const quality_options = computed(() =>
  NovelAiQualityPresetSchema.options.map((value) => ({
    value,
    label: quality_preset_label(t, value),
  })),
);
const uc_options = computed(() =>
  NovelAiUndesiredContentPresetSchema.options.map((value) => ({
    value,
    label: undesired_content_label(t, value),
  })),
);

function set_enum(
  key: "sampler" | "noise_schedule" | "quality_preset" | "undesired_content_preset",
  options: readonly string[],
  value: string,
): void {
  if (options.includes(value)) {
    patch({ [key]: value });
  }
}

/** Only entries with an attached image can be sent as vibe references. */
const usable_vibes = computed(() =>
  props.vibes.filter(
    (vibe) =>
      typeof vibe.payload.image === "string" &&
      (vibe.payload.provider === undefined || vibe.payload.provider === "novelai"),
  ),
);

function toggle_vibe(vibe_id: Uuid, selected: boolean): void {
  const ids = draft.value.vibe_asset_ids.filter((id) => id !== vibe_id);
  patch({ vibe_asset_ids: selected ? [...ids, vibe_id].slice(0, 16) : ids });
}

const save_state = ref<"idle" | "saving" | "saved" | "failed">("idle");
async function save(): Promise<void> {
  save_state.value = "saving";
  try {
    await props.controller.save_novelai_defaults(props.profile.id, draft.value);
    save_state.value = "saved";
  } catch {
    save_state.value = "failed";
  }
}
</script>

<template>
  <div :class="styles.section" data-testid="novelai-settings">
    <div :class="styles.section_header">
      <h2 :class="styles.section_title">
        {{ t("settings.novelai.title", { name: profile.display_name }) }}
      </h2>
    </div>

    <div :class="styles.form_grid">
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.novelai.refresh_account')"
          :pending="account_pending"
          @click="refresh_account"
        />
        <span v-if="account !== null" :class="styles.status_text" data-testid="novelai-account">
          {{
            t("settings.novelai.account_summary", {
              tier: account.tier,
              anlas: account.anlas,
              expires: d(new Date(account.expires_at), "short_date"),
            })
          }}
        </span>
        <span
          v-else-if="account_unreachable"
          :class="styles.status_text"
          data-testid="novelai-account-unreachable"
        >
          {{ t("settings.novelai.account_unreachable") }}
          <a :href="NOVELAI_ACCOUNT_URL" target="_blank" rel="noopener noreferrer">
            {{ t("settings.novelai.account_open_site") }}
          </a>
        </span>
        <span v-else-if="account_error !== null" :class="styles.status_text">
          {{ account_error }}
        </span>
      </div>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.model_label") }}</span>
        <AppSelect
          :model-value="model_id"
          :options="model_options"
          :placeholder="model_id"
          :aria-label="t('settings.novelai.model_label')"
          @update:model-value="(value) => void set_model(value)"
        />
      </div>

      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.width_label") }}</span>
        <NumberStepper
          :model-value="draft.width"
          :label="t('settings.novelai.width_label')"
          :min="64"
          :max="2048"
          :step="64"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => patch({ width: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.height_label") }}</span>
        <NumberStepper
          :model-value="draft.height"
          :label="t('settings.novelai.height_label')"
          :min="64"
          :max="2048"
          :step="64"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => patch({ height: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.steps_label") }}</span>
        <NumberStepper
          :model-value="draft.steps"
          :label="t('settings.novelai.steps_label')"
          :min="1"
          :max="50"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => patch({ steps: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.scale_label") }}</span>
        <NumberStepper
          :model-value="draft.scale"
          :label="t('settings.novelai.scale_label')"
          :min="0"
          :max="10"
          :step="0.1"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => patch({ scale: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.cfg_rescale_label") }}</span>
        <NumberStepper
          :model-value="draft.cfg_rescale"
          :label="t('settings.novelai.cfg_rescale_label')"
          :min="0"
          :max="1"
          :step="0.02"
          :increment-label="t('common.actions.increase')"
          :decrement-label="t('common.actions.decrease')"
          @update:model-value="(value) => patch({ cfg_rescale: value })"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.sampler_label") }}</span>
        <AppSelect
          :model-value="draft.sampler"
          :options="sampler_options"
          :placeholder="t('settings.novelai.sampler_label')"
          :aria-label="t('settings.novelai.sampler_label')"
          @update:model-value="(value) => set_enum('sampler', NovelAiSamplerSchema.options, value)"
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.noise_schedule_label") }}</span>
        <AppSelect
          :model-value="draft.noise_schedule"
          :options="noise_options"
          :placeholder="t('settings.novelai.noise_schedule_label')"
          :aria-label="t('settings.novelai.noise_schedule_label')"
          @update:model-value="
            (value) => set_enum('noise_schedule', NovelAiNoiseScheduleSchema.options, value)
          "
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.quality_label") }}</span>
        <AppSelect
          :model-value="draft.quality_preset"
          :options="quality_options"
          :placeholder="t('settings.novelai.quality_label')"
          :aria-label="t('settings.novelai.quality_label')"
          @update:model-value="
            (value) => set_enum('quality_preset', NovelAiQualityPresetSchema.options, value)
          "
        />
      </div>
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.novelai.uc_label") }}</span>
        <AppSelect
          :model-value="draft.undesired_content_preset"
          :options="uc_options"
          :placeholder="t('settings.novelai.uc_label')"
          :aria-label="t('settings.novelai.uc_label')"
          @update:model-value="
            (value) =>
              set_enum(
                'undesired_content_preset',
                NovelAiUndesiredContentPresetSchema.options,
                value,
              )
          "
        />
      </div>
      <AppSwitch
        :model-value="draft.smea"
        :label="t('settings.novelai.smea_label')"
        @update:model-value="(value) => patch({ smea: value })"
      />
      <AppSwitch
        :model-value="draft.dyn"
        :label="t('settings.novelai.dyn_label')"
        @update:model-value="(value) => patch({ dyn: value })"
      />
      <AppSwitch
        :model-value="draft.variety_plus"
        :label="t('settings.novelai.variety_label')"
        @update:model-value="(value) => patch({ variety_plus: value })"
      />

      <h3 :class="styles.section_title">{{ t("settings.novelai.vibes_title") }}</h3>
      <p v-if="usable_vibes.length === 0" :class="styles.description">
        {{ t("settings.novelai.vibes_empty") }}
      </p>
      <AppCheckbox
        v-for="vibe in usable_vibes"
        :key="vibe.id"
        :model-value="draft.vibe_asset_ids.includes(vibe.id)"
        :label="vibe.display_name"
        @update:model-value="(value) => toggle_vibe(vibe.id, value)"
      />

      <div v-if="ignored.length > 0" :class="styles.risk_banner" data-testid="novelai-ignored">
        <p :class="styles.risk_banner_title">{{ t("settings.novelai.ignored_title") }}</p>
        <p v-for="parameter in ignored" :key="parameter" :class="styles.risk_banner_description">
          {{ ignored_parameter_label(t, parameter) }}
        </p>
      </div>
      <p v-if="validation_error !== null" :class="styles.status_text" role="alert">
        {{ validation_error }}
      </p>

      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.novelai.save')"
          variant="primary"
          :pending="save_state === 'saving'"
          :disabled="validation_error !== null"
          @click="save"
        />
        <span :class="styles.status_text" role="status">
          {{
            save_state === "saved"
              ? t("settings.novelai.saved")
              : save_state === "failed"
                ? t("settings.novelai.save_failed")
                : ""
          }}
        </span>
      </div>
    </div>
  </div>
</template>
