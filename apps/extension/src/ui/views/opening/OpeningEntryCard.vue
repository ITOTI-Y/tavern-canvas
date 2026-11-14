<script setup lang="ts">
import { Pencil, RefreshCw, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningEntry } from "../../../modules/opening/opening_model.js";
import AppButton from "../../components/AppButton.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import styles from "./opening_styles.js";

const props = defineProps<{
  readonly entry: OpeningEntry;
  readonly rewriting: boolean;
  readonly disabled: boolean;
  /** Opens in edit mode, for an entry the user just added. */
  readonly editing?: boolean;
}>();

const emit = defineEmits<{
  save: [entry: OpeningEntry];
  remove: [];
  rewrite: [];
  cancel: [];
}>();

const { t } = useI18n();

const editing = ref(props.editing);
const title = ref("");
const constant = ref(false);
const keys = ref("");
const content = ref("");

function open_editor(): void {
  title.value = props.entry.title;
  constant.value = props.entry.constant;
  keys.value = props.entry.keys.join(", ");
  content.value = props.entry.content;
  editing.value = true;
}

if (editing.value) {
  open_editor();
}

function save(): void {
  const key_list = [
    ...new Set(
      keys.value
        .split(/[,，、]/u)
        .map((key) => key.trim())
        .filter((key) => key !== ""),
    ),
  ];
  emit("save", {
    id: props.entry.id,
    title: title.value.trim(),
    constant: constant.value,
    keys: constant.value ? [] : key_list.slice(0, 12),
    content: content.value.trim(),
  });
  editing.value = false;
}

function cancel(): void {
  editing.value = false;
  emit("cancel");
}
</script>

<template>
  <div v-if="editing" :class="styles.editor">
    <FieldGroup :label="t('opening.entry.title_label')">
      <template #default="{ fieldId }">
        <input :id="fieldId" v-model="title" :class="styles.input" maxlength="120" />
      </template>
    </FieldGroup>
    <AppSwitch
      v-model="constant"
      :label="t('opening.entry.constant_label')"
      :description="t('opening.entry.constant_hint')"
    />
    <FieldGroup
      v-if="!constant"
      :label="t('opening.entry.keys_label')"
      :hint="t('opening.entry.keys_hint')"
    >
      <template #default="{ fieldId, describedBy }">
        <input :id="fieldId" v-model="keys" :class="styles.input" :aria-describedby="describedBy" />
      </template>
    </FieldGroup>
    <FieldGroup :label="t('opening.entry.content_label')">
      <template #default="{ fieldId }">
        <textarea :id="fieldId" v-model="content" :class="styles.text_area" maxlength="8000" />
      </template>
    </FieldGroup>
    <div :class="styles.row">
      <span :class="styles.spacer" />
      <AppButton :label="t('common.actions.cancel')" variant="ghost" @click="cancel" />
      <AppButton
        :label="t('common.actions.save')"
        variant="primary"
        :disabled="title.trim() === '' || content.trim() === ''"
        @click="save"
      />
    </div>
  </div>
  <article v-else :class="styles.entry">
    <div :class="styles.entry_head">
      <span :class="styles.entry_title">{{ entry.title }}</span>
      <span v-if="entry.constant" :class="styles.pill" data-tone="constant">{{
        t("opening.entry.constant")
      }}</span>
      <span v-else :class="styles.pill">{{ t("opening.entry.keyword") }}</span>
      <span :class="styles.spacer" />
      <IconButton
        :icon="RefreshCw"
        :label="t('opening.entry.rewrite')"
        size="sm"
        :disabled="disabled || rewriting"
        @click="emit('rewrite')"
      />
      <IconButton
        :icon="Pencil"
        :label="t('opening.entry.edit')"
        size="sm"
        :disabled="disabled"
        @click="open_editor"
      />
      <IconButton
        :icon="Trash2"
        :label="t('opening.entry.remove')"
        size="sm"
        destructive
        :disabled="disabled"
        @click="emit('remove')"
      />
    </div>
    <div v-if="!entry.constant && entry.keys.length > 0" :class="styles.keys">
      {{ t("opening.entry.keys_label") }}
      <span v-for="key in entry.keys" :key="key" :class="styles.key">{{ key }}</span>
    </div>
    <p v-if="rewriting" :class="styles.hint" role="status">{{ t("opening.status.rewriting") }}</p>
    <p :class="styles.entry_content">{{ entry.content }}</p>
  </article>
</template>
