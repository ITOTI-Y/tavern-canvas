<script setup lang="ts">
import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import {
  BUILTIN_TEMPLATE_ID,
  MAX_ROUNDS,
  MAX_STEPS,
  type OpeningStep,
  type OpeningTemplate,
} from "../../../modules/opening/opening_model.js";
import AppButton from "../../components/AppButton.vue";
import AppSelect from "../../components/AppSelect.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import OpeningSectionSwitch from "./OpeningSectionSwitch.vue";
import type { OpeningSection } from "./opening_section.js";
import styles from "./opening_styles.js";
import type { OpeningStore } from "./use_opening_store.js";

const props = defineProps<{
  readonly store: OpeningStore;
  readonly templates: readonly OpeningTemplate[];
  readonly saveError: string | null;
}>();

const section = defineModel<OpeningSection>("section", { required: true });

const { t } = useI18n();

const selected_id = ref<string>(BUILTIN_TEMPLATE_ID);
const template = computed<OpeningTemplate | null>(
  () => props.templates.find((item) => item.id === selected_id.value) ?? props.templates[0] ?? null,
);
const editable = computed(() => template.value !== null && !template.value.builtin);

const output_options = computed(() => [
  { value: "entries", label: t("opening.templates.output_entries") },
  { value: "message", label: t("opening.templates.output_message") },
]);

async function copy_of(source: OpeningTemplate | null): Promise<void> {
  const steps: OpeningStep[] =
    source === null
      ? [
          {
            id: crypto.randomUUID(),
            name: t("opening.templates.new_step"),
            instruction: "",
            max_rounds: 2,
            output: "entries",
          },
        ]
      : source.steps.map((step) => ({ ...step, id: crypto.randomUUID() }));
  const item: OpeningTemplate = {
    id: crypto.randomUUID(),
    builtin: false,
    kind: "template",
    display_name:
      source === null
        ? t("opening.templates.new_name")
        : t("opening.templates.copy_name", { name: source.display_name }),
    created_at: new Date().toISOString(),
    steps,
  };
  await props.store.add(item);
  selected_id.value = item.id;
}

function edit(change: (item: OpeningTemplate) => void, debounce = false): void {
  if (template.value !== null && editable.value) {
    props.store.edit(template.value, change, { debounce });
  }
}

function edit_step(index: number, change: (step: OpeningStep) => void, debounce = false): void {
  edit((item) => {
    const step = item.steps[index];
    if (step !== undefined) {
      change(step);
    }
  }, debounce);
}

function move(index: number, offset: number): void {
  edit((item) => {
    const target = index + offset;
    const step = item.steps[index];
    const other = item.steps[target];
    if (step !== undefined && other !== undefined) {
      item.steps[index] = other;
      item.steps[target] = step;
    }
  });
}

function add_step(): void {
  edit((item) => {
    if (item.steps.length < MAX_STEPS) {
      item.steps.push({
        id: crypto.randomUUID(),
        name: t("opening.templates.new_step"),
        instruction: "",
        max_rounds: 2,
        output: "entries",
      });
    }
  });
}

function remove_step(index: number): void {
  edit((item) => {
    if (item.steps.length > 1) {
      item.steps.splice(index, 1);
    }
  });
}

function set_output(index: number, value: string | undefined): void {
  if (value === "entries" || value === "message") {
    edit_step(index, (step) => {
      step.output = value;
    });
  }
}

const confirm_delete = ref(false);

async function delete_template(): Promise<void> {
  const current = template.value;
  if (current !== null && !current.builtin) {
    await props.store.remove(current.id);
    confirm_delete.value = false;
    selected_id.value = BUILTIN_TEMPLATE_ID;
  }
}
</script>

<template>
  <div :class="styles.layout">
    <aside :class="styles.aside" :aria-label="t('opening.templates.list_label')">
      <AppButton
        :class="styles.aside_new"
        :icon="Plus"
        :label="t('opening.templates.new')"
        @click="copy_of(null)"
      />
      <div :class="styles.aside_title">{{ t("opening.templates.list_title") }}</div>
      <button
        v-for="item in templates"
        :key="item.id"
        type="button"
        class="tc-interactive"
        :class="styles.item"
        :aria-current="item.id === template?.id ? 'true' : undefined"
        @click="selected_id = item.id"
      >
        <span :class="styles.item_name">{{ item.display_name }}</span>
        <span :class="styles.item_meta">{{
          item.builtin
            ? t("opening.templates.builtin_meta", { n: item.steps.length })
            : t("opening.templates.meta", { n: item.steps.length })
        }}</span>
      </button>
    </aside>

    <div :class="styles.work">
      <div v-if="template !== null" :class="styles.work_inner">
        <div :class="styles.topline">
          <OpeningSectionSwitch v-model="section" />
          <span :class="styles.spacer" />
          <AppButton
            :icon="Copy"
            :label="t('opening.templates.copy')"
            variant="ghost"
            @click="copy_of(template)"
          />
          <IconButton
            v-if="editable"
            :icon="Trash2"
            :label="t('opening.templates.delete')"
            destructive
            @click="confirm_delete = true"
          />
        </div>
        <p v-if="saveError !== null" :class="styles.error" role="alert">
          {{ t("opening.errors.save", { reason: saveError }) }}
        </p>

        <div :class="styles.work_head">
          <h1 v-if="!editable" :class="styles.work_title">{{ template.display_name }}</h1>
          <FieldGroup v-else :label="t('opening.templates.name_label')">
            <template #default="{ fieldId }">
              <input
                :id="fieldId"
                :value="template.display_name"
                :class="styles.input"
                maxlength="60"
                @input="
                  edit((item) => {
                    item.display_name = ($event.target as HTMLInputElement).value;
                  }, true)
                "
              />
            </template>
          </FieldGroup>
          <p :class="styles.work_description">
            {{ editable ? t("opening.templates.hint") : t("opening.templates.builtin_hint") }}
          </p>
        </div>

        <div v-for="(step, index) in template.steps" :key="step.id" :class="styles.template_step">
          <span :class="styles.template_number">{{ index + 1 }}</span>
          <div :class="styles.template_fields">
            <input
              :value="step.name"
              :class="styles.input"
              maxlength="40"
              :disabled="!editable"
              :aria-label="t('opening.templates.step_name', { n: index + 1 })"
              @input="
                edit_step(
                  index,
                  (item) => {
                    item.name = ($event.target as HTMLInputElement).value;
                  },
                  true,
                )
              "
            />
            <textarea
              :value="step.instruction"
              :class="styles.text_area_small"
              maxlength="2000"
              :disabled="!editable"
              :aria-label="t('opening.templates.step_instruction', { n: index + 1 })"
              :placeholder="t('opening.templates.instruction_placeholder')"
              @input="
                edit_step(
                  index,
                  (item) => {
                    item.instruction = ($event.target as HTMLTextAreaElement).value;
                  },
                  true,
                )
              "
            />
          </div>
          <div :class="styles.template_side">
            <span :class="styles.hint">{{ t("opening.templates.rounds_label") }}</span>
            <NumberStepper
              :model-value="step.max_rounds"
              :label="t('opening.templates.rounds_label')"
              :increment-label="t('opening.templates.rounds_up')"
              :decrement-label="t('opening.templates.rounds_down')"
              :min="0"
              :max="MAX_ROUNDS"
              :disabled="!editable"
              @update:model-value="
                (value) =>
                  edit_step(index, (item) => {
                    item.max_rounds = value ?? 0;
                  })
              "
            />
            <AppSelect
              :model-value="step.output"
              :options="output_options"
              :placeholder="t('opening.templates.output_label')"
              :aria-label="t('opening.templates.output_label')"
              :disabled="!editable"
              @update:model-value="(value) => set_output(index, value)"
            />
            <div v-if="editable" :class="styles.row">
              <IconButton
                :icon="ArrowUp"
                :label="t('opening.templates.move_up')"
                size="sm"
                :disabled="index === 0"
                @click="move(index, -1)"
              />
              <IconButton
                :icon="ArrowDown"
                :label="t('opening.templates.move_down')"
                size="sm"
                :disabled="index === template.steps.length - 1"
                @click="move(index, 1)"
              />
              <IconButton
                :icon="Trash2"
                :label="t('opening.templates.remove_step')"
                size="sm"
                destructive
                :disabled="template.steps.length === 1"
                @click="remove_step(index)"
              />
            </div>
          </div>
        </div>

        <div v-if="editable" :class="styles.row">
          <AppButton
            :icon="Plus"
            :label="t('opening.templates.add_step')"
            :disabled="template.steps.length >= MAX_STEPS"
            @click="add_step"
          />
        </div>
      </div>
    </div>

    <ConfirmDialog
      v-model:open="confirm_delete"
      :title="t('opening.templates.delete_title', { name: template?.display_name ?? '' })"
      :description="t('opening.templates.delete_description')"
      :confirm-label="t('common.actions.delete')"
      :cancel-label="t('common.actions.cancel')"
      @confirm="delete_template"
    />
  </div>
</template>
