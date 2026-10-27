<script setup lang="ts">
import { computed } from "vue";

import AppButton from "../../components/AppButton.vue";
import { drop_undefined } from "../../components/_prop_utils.js";
import FieldGroup from "../../components/FieldGroup.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import type { AssetFieldSpec, AssetFormValues } from "./asset_field_schema.js";
import styles from "./assets.module.css";

const props = defineProps<{
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly name: string;
  readonly nameError: string | null;
  readonly saveError?: string | null;
  readonly fields: readonly AssetFieldSpec[];
  readonly values: AssetFormValues;
  readonly saveLabel: string;
  readonly cancelLabel: string;
  readonly decrementLabel: string;
  readonly incrementLabel: string;
  readonly pending?: boolean;
}>();

const emit = defineEmits<{
  "update:name": [value: string];
  "update:values": [value: AssetFormValues];
  save: [];
  cancel: [];
}>();

function update_text_field(key: string, value: string): void {
  emit("update:values", { ...props.values, [key]: value });
}

function update_number_field(key: string, value: number): void {
  emit("update:values", { ...props.values, [key]: value });
}

function handle_submit(event: Event): void {
  event.preventDefault();
  emit("save");
}

const is_pending = computed(() => props.pending);
</script>

<template>
  <form :class="styles.form" @submit="handle_submit">
    <slot name="leading-fields" />

    <FieldGroup :label="nameLabel" :error="nameError" required>
      <template #default="{ fieldId, describedBy, invalid }">
        <input
          :id="fieldId"
          :class="styles.textInput"
          type="text"
          :placeholder="namePlaceholder"
          :value="name"
          :aria-describedby="describedBy"
          :aria-invalid="invalid"
          @input="emit('update:name', ($event.target as HTMLInputElement).value)"
        />
      </template>
    </FieldGroup>

    <FieldGroup
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      v-bind="drop_undefined({ hint: field.hint })"
    >
      <template #default="{ fieldId, describedBy }">
        <input
          v-if="field.kind === 'text'"
          :id="fieldId"
          :class="styles.textInput"
          type="text"
          :value="values[field.key]"
          :aria-describedby="describedBy"
          @input="update_text_field(field.key, ($event.target as HTMLInputElement).value)"
        />
        <textarea
          v-else-if="field.kind === 'textarea'"
          :id="fieldId"
          :class="styles.textArea"
          :value="values[field.key]"
          :aria-describedby="describedBy"
          @input="update_text_field(field.key, ($event.target as HTMLTextAreaElement).value)"
        />
        <NumberStepper
          v-else
          :id="fieldId"
          :model-value="typeof values[field.key] === 'number' ? (values[field.key] as number) : 0"
          :label="field.label"
          :step="field.step ?? 1"
          :decrement-label="decrementLabel"
          :increment-label="incrementLabel"
          v-bind="drop_undefined({ min: field.min, max: field.max, describedBy })"
          @update:model-value="update_number_field(field.key, $event)"
        />
      </template>
    </FieldGroup>

    <slot name="extra-fields" />

    <p v-if="saveError" :class="styles.formError" role="alert">{{ saveError }}</p>
    <div :class="styles.formActions">
      <AppButton :label="cancelLabel" variant="secondary" type="button" @click="emit('cancel')" />
      <AppButton :label="saveLabel" variant="primary" type="submit" :pending="is_pending" />
    </div>
  </form>
</template>
