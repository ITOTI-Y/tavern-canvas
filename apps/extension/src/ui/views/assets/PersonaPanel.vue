<script setup lang="ts">
import type { ImageId, PersonaProfile, PersonaRole, Uuid } from "@tavern-canvas/contracts";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./assets.module.css";
import { persona_role_label } from "./persona_labels.js";

/**
 * Persona CRUD. A persona is the speaker identity behind a chat: the user's own, or the
 * assistant's. Only one of each role is active at a time, which is why activating one here
 * deactivates its same-role sibling rather than offering a free-for-all of checkboxes.
 */
const props = defineProps<{
  readonly personas: readonly PersonaProfile[];
  readonly loading: boolean;
  readonly controller: StudioController;
}>();

const { t } = useI18n();

interface DraftForm {
  readonly id: Uuid;
  readonly is_new: boolean;
  display_name: string;
  role: PersonaRole;
  description: string;
  greeting: string;
  avatar_image_id: ImageId | null;
  is_active: boolean;
}

const dialog_open = ref(false);
const draft = ref<DraftForm | null>(null);
const saving = ref(false);
const name_error = ref<string | null>(null);
const save_error = ref<string | null>(null);
const remove_target = ref<PersonaProfile | null>(null);
const remove_pending = ref(false);

const role_options = computed(() =>
  (["assistant", "user"] as const).map((role) => ({
    value: role,
    label: persona_role_label(t, role),
  })),
);

const role_model = computed<string>({
  get: () => draft.value?.role ?? "assistant",
  set: (value) => {
    if (draft.value) {
      draft.value.role = value as PersonaRole;
    }
  },
});

function open_create(): void {
  draft.value = {
    id: crypto.randomUUID(),
    is_new: true,
    display_name: "",
    role: "assistant",
    description: "",
    greeting: "",
    avatar_image_id: null,
    is_active: props.personas.length === 0,
  };
  name_error.value = null;
  save_error.value = null;
  dialog_open.value = true;
}

function open_edit(persona: PersonaProfile): void {
  draft.value = {
    id: persona.id,
    is_new: false,
    display_name: persona.display_name,
    role: persona.role,
    description: persona.description,
    greeting: persona.greeting,
    avatar_image_id: persona.avatar_image_id,
    is_active: persona.is_active,
  };
  name_error.value = null;
  save_error.value = null;
  dialog_open.value = true;
}

function close_dialog(): void {
  dialog_open.value = false;
  draft.value = null;
}

async function save(): Promise<void> {
  const current = draft.value;
  if (!current || saving.value) {
    return;
  }
  const display_name = current.display_name.trim();
  if (display_name.length === 0) {
    name_error.value = t("errors.validation_required");
    return;
  }
  name_error.value = null;
  save_error.value = null;
  saving.value = true;
  try {
    await props.controller.save_persona({
      id: current.id,
      display_name,
      role: current.role,
      description: current.description.trim(),
      greeting: current.greeting.trim(),
      avatar_image_id: current.avatar_image_id,
      is_active: current.is_active,
    });
    close_dialog();
  } catch {
    save_error.value = t("errors.unexpected");
  } finally {
    saving.value = false;
  }
}

async function toggle_active(persona: PersonaProfile, is_active: boolean): Promise<void> {
  await props.controller.save_persona({
    id: persona.id,
    display_name: persona.display_name,
    role: persona.role,
    description: persona.description,
    greeting: persona.greeting,
    avatar_image_id: persona.avatar_image_id,
    is_active,
  });
}

async function confirm_remove(): Promise<void> {
  const target = remove_target.value;
  if (!target || remove_pending.value) {
    return;
  }
  remove_pending.value = true;
  try {
    await props.controller.remove_persona(target.id);
    remove_target.value = null;
  } finally {
    remove_pending.value = false;
  }
}
</script>

<template>
  <div :class="styles.categoryList" data-testid="persona-panel">
    <div :class="styles.categoryToolbar">
      <AppButton :label="t('assets.personas.add_action')" @click="open_create" />
    </div>

    <StateSurface
      :status="loading ? 'loading' : personas.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('assets.personas.empty_description')"
    >
      <template #action>
        <AppButton :label="t('assets.personas.add_action')" @click="open_create" />
      </template>
      <ul :class="styles.cardGrid">
        <li
          v-for="persona in personas"
          :key="persona.id"
          :class="styles.assetCard"
          data-testid="persona-card"
        >
          <div :class="styles.assetCardMain">
            <span :class="styles.assetCardName">{{ persona.display_name }}</span>
            <span :class="styles.assetCardSummary">
              <span :class="styles.assetCardSummaryPart">{{
                persona_role_label(t, persona.role)
              }}</span>
              <span v-if="persona.is_active" :class="styles.assetCardSummaryPart">{{
                t("assets.personas.active_badge")
              }}</span>
            </span>
          </div>
          <div :class="styles.assetCardActions">
            <AppSwitch
              :model-value="persona.is_active"
              :label="t('assets.personas.active_toggle_label')"
              @update:model-value="(value) => toggle_active(persona, value)"
            />
            <AppButton
              :label="t('common.actions.edit')"
              variant="secondary"
              @click="open_edit(persona)"
            />
            <AppButton
              :label="t('common.actions.delete')"
              variant="destructive"
              @click="remove_target = persona"
            />
          </div>
        </li>
      </ul>
    </StateSurface>

    <AppDialog
      :open="dialog_open"
      :title="draft?.is_new ? t('assets.personas.add_action') : t('common.actions.edit')"
      :description="t('assets.form_dialog_description')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => !open && close_dialog()"
    >
      <div v-if="draft" :class="styles.form">
        <FieldGroup :label="t('common.labels.name')" :error="name_error" required>
          <template #default="{ fieldId, describedBy }">
            <input
              :id="fieldId"
              v-model="draft.display_name"
              type="text"
              :aria-describedby="describedBy"
              :class="styles.textInput"
            />
          </template>
        </FieldGroup>

        <FieldGroup :label="t('assets.personas.role_label')" required>
          <template #default="{ fieldId }">
            <AppSelect
              :id="fieldId"
              v-model="role_model"
              :options="role_options"
              :placeholder="t('assets.personas.role_label')"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('assets.personas.description_label')"
          :hint="t('assets.personas.description_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <textarea
              :id="fieldId"
              v-model="draft.description"
              rows="4"
              :aria-describedby="describedBy"
              :class="styles.textArea"
            />
          </template>
        </FieldGroup>

        <FieldGroup
          :label="t('assets.personas.greeting_label')"
          :hint="t('assets.personas.greeting_hint')"
        >
          <template #default="{ fieldId, describedBy }">
            <textarea
              :id="fieldId"
              v-model="draft.greeting"
              rows="3"
              :aria-describedby="describedBy"
              :class="styles.textArea"
            />
          </template>
        </FieldGroup>

        <AppSwitch v-model="draft.is_active" :label="t('assets.personas.active_toggle_label')" />

        <p v-if="save_error" :class="styles.emptyDescription" data-tone="error">{{ save_error }}</p>

        <div :class="styles.formActions">
          <AppButton :label="t('common.actions.save')" :pending="saving" @click="save" />
          <AppButton
            :label="t('common.actions.cancel')"
            variant="secondary"
            @click="close_dialog"
          />
        </div>
      </div>
    </AppDialog>

    <ConfirmDialog
      :open="remove_target !== null"
      :title="t('assets.delete_confirm_title', { name: remove_target?.display_name ?? '' })"
      :description="t('assets.personas.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :pending="remove_pending"
      @update:open="(open) => !open && (remove_target = null)"
      @confirm="confirm_remove"
    />
  </div>
</template>
