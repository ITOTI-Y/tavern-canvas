<script setup lang="ts">
import {
  MAX_CHAT_SIZE_SETS,
  type IllustrationSettings,
  type ImageSize,
  type SizeSet,
} from "@tavern-canvas/contracts";
import { computed, inject, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppSelect from "../../components/AppSelect.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import { ACTIVE_CHAT_ID_KEY } from "../../contracts/portal_keys.js";
import ImageSizeField from "./ImageSizeField.vue";
import { FREE_PIXELS, ratio_label, SIZE_SET_CATALOG } from "./image_size.js";
import styles from "./settings_styles.js";

const props = defineProps<{
  readonly illustration: IllustrationSettings;
}>();

const emit = defineEmits<{
  update: [partial: Partial<IllustrationSettings>];
}>();

const { t } = useI18n();
const active_chat_id = inject(ACTIVE_CHAT_ID_KEY, ref(null));

const NONE = "none";
const FOLLOW_DEFAULT = "default";
const NEW_SET_SIZES: readonly ImageSize[] = [
  { width: 832, height: 1216 },
  { width: 1216, height: 832 },
  { width: 1024, height: 1024 },
  { width: 1344, height: 768 },
];

const sets = computed(() => props.illustration.size_sets);
const set_options = computed(() => sets.value.map((set) => ({ value: set.id, label: set.name })));

const default_options = computed(() => [
  { value: NONE, label: t("settings.size_sets.none") },
  ...set_options.value,
]);

const chat_options = computed(() => [
  { value: FOLLOW_DEFAULT, label: t("settings.size_sets.follow_default") },
  ...default_options.value,
]);

const chat_choice = computed(() => {
  const chat_id = active_chat_id.value;
  if (chat_id === null || !(chat_id in props.illustration.size_set_by_chat)) {
    return FOLLOW_DEFAULT;
  }
  return props.illustration.size_set_by_chat[chat_id] ?? NONE;
});

function set_default(value: string): void {
  emit("update", { size_set_id: value === NONE ? null : value });
}

/** The newest choices are kept when the map is full, so it never grows past the settings limit. */
function set_chat(value: string): void {
  const chat_id = active_chat_id.value;
  if (chat_id === null) {
    return;
  }
  const others = Object.entries(props.illustration.size_set_by_chat).filter(
    ([id]) => id !== chat_id,
  );
  const next: [string, string | null][] =
    value === FOLLOW_DEFAULT ? others : [...others, [chat_id, value === NONE ? null : value]];
  emit("update", {
    size_set_by_chat: Object.fromEntries(next.slice(-MAX_CHAT_SIZE_SETS)),
  });
}

const editing_id = ref<string | null>(sets.value[0]?.id ?? null);
watch(sets, (current) => {
  if (!current.some((set) => set.id === editing_id.value)) {
    editing_id.value = current[0]?.id ?? null;
  }
});
const editing = computed(() => sets.value.find((set) => set.id === editing_id.value) ?? null);

const name_draft = ref("");
watch(
  editing,
  (set) => {
    name_draft.value = set?.name ?? "";
  },
  { immediate: true },
);

function save_sets(next: readonly SizeSet[], extra: Partial<IllustrationSettings> = {}): void {
  emit("update", { size_sets: [...next], ...extra });
}

function replace_editing(patch: Partial<SizeSet>): void {
  const current = editing.value;
  if (current !== null) {
    save_sets(sets.value.map((set) => (set.id === current.id ? { ...set, ...patch } : set)));
  }
}

function add_set(source: SizeSet | null): void {
  const set: SizeSet = {
    id: crypto.randomUUID(),
    name:
      source === null
        ? t("settings.size_sets.new_name", { n: sets.value.length + 1 })
        : t("settings.size_sets.copy_name", { name: source.name }),
    sizes: (source?.sizes ?? NEW_SET_SIZES).map((size) => ({ ...size })),
  };
  editing_id.value = set.id;
  save_sets([...sets.value, set]);
}

/** Chats and the default that used the removed set fall back to the profile's canvas. */
function remove_set(): void {
  const current = editing.value;
  if (current === null) {
    return;
  }
  save_sets(
    sets.value.filter((set) => set.id !== current.id),
    {
      size_set_id:
        props.illustration.size_set_id === current.id ? null : props.illustration.size_set_id,
      size_set_by_chat: Object.fromEntries(
        Object.entries(props.illustration.size_set_by_chat).filter(([, id]) => id !== current.id),
      ),
    },
  );
}

function save_name(): void {
  const name = name_draft.value.trim();
  if (name !== "" && name !== editing.value?.name) {
    replace_editing({ name });
  }
}

const same = (left: ImageSize, right: ImageSize): boolean =>
  left.width === right.width && left.height === right.height;

/** The catalog plus any custom canvas the set holds, wide ones first. */
const listed_sizes = computed(() => {
  const custom = (editing.value?.sizes ?? []).filter(
    (size) => !SIZE_SET_CATALOG.some((entry) => same(entry, size)),
  );
  return [...SIZE_SET_CATALOG, ...custom];
});

function size_label(size: ImageSize): string {
  const label = `${ratio_label(size)} · ${String(size.width)} × ${String(size.height)}`;
  return size.width * size.height > FREE_PIXELS
    ? `${label} · ${t("settings.size_sets.costs_anlas")}`
    : label;
}

function is_chosen(size: ImageSize): boolean {
  return editing.value?.sizes.some((entry) => same(entry, size)) ?? false;
}

/** A set keeps at least one size; removing the last one is how a set is deleted. */
function toggle_size(size: ImageSize, chosen: boolean): void {
  const current = editing.value;
  if (current === null) {
    return;
  }
  const sizes = chosen
    ? [...current.sizes, { ...size }]
    : current.sizes.filter((entry) => !same(entry, size));
  if (sizes.length > 0 && sizes.length <= 16) {
    replace_editing({ sizes });
  }
}

const custom_size = ref<ImageSize>({ width: 1344, height: 768 });

function add_custom(): void {
  if (!is_chosen(custom_size.value)) {
    toggle_size(custom_size.value, true);
  }
}
</script>

<template>
  <section :class="styles.section" data-testid="size-set-settings">
    <h2 :class="styles.section_title">{{ t("settings.groups.sizes") }}</h2>
    <p :class="styles.description">{{ t("settings.size_sets.hint") }}</p>
    <div :class="styles.field_grid">
      <div :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.size_sets.default_label") }}</span>
        <AppSelect
          :model-value="illustration.size_set_id ?? NONE"
          :options="default_options"
          :placeholder="t('settings.size_sets.default_label')"
          :aria-label="t('settings.size_sets.default_label')"
          @update:model-value="set_default"
        />
      </div>
      <div v-if="active_chat_id !== null" :class="styles.row">
        <span :class="styles.row_label">{{ t("settings.size_sets.chat_label") }}</span>
        <AppSelect
          :model-value="chat_choice"
          :options="chat_options"
          :placeholder="t('settings.size_sets.chat_label')"
          :aria-label="t('settings.size_sets.chat_label')"
          data-testid="size-set-chat-select"
          @update:model-value="set_chat"
        />
      </div>
    </div>
    <div :class="styles.actions_row">
      <AppSelect
        v-if="sets.length > 0"
        :model-value="editing_id ?? undefined"
        :options="set_options"
        :placeholder="t('settings.size_sets.edit_label')"
        :aria-label="t('settings.size_sets.edit_label')"
        @update:model-value="editing_id = $event"
      />
      <AppButton :label="t('settings.size_sets.add')" @click="add_set(null)" />
      <AppButton
        v-if="editing !== null"
        :label="t('settings.size_sets.duplicate')"
        variant="ghost"
        @click="add_set(editing)"
      />
      <AppButton
        v-if="editing !== null"
        :label="t('settings.size_sets.remove')"
        variant="destructive"
        @click="remove_set"
      />
    </div>
    <template v-if="editing !== null">
      <FieldGroup :label="t('settings.size_sets.name_label')">
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            v-model="name_draft"
            type="text"
            maxlength="60"
            :class="styles.text_input"
            data-testid="size-set-name-input"
            @blur="save_name"
          />
        </template>
      </FieldGroup>
      <fieldset :class="styles.check_list" data-testid="size-set-sizes">
        <legend :class="styles.row_label">{{ t("settings.size_sets.sizes_label") }}</legend>
        <AppCheckbox
          v-for="size in listed_sizes"
          :key="`${size.width}x${size.height}`"
          :model-value="is_chosen(size)"
          :label="size_label(size)"
          :disabled="is_chosen(size) && editing.sizes.length === 1"
          @update:model-value="(chosen) => toggle_size(size, chosen)"
        />
      </fieldset>
      <ImageSizeField v-model="custom_size" />
      <div :class="styles.actions_row">
        <AppButton
          :label="t('settings.size_sets.add_custom')"
          variant="ghost"
          :disabled="is_chosen(custom_size) || editing.sizes.length >= 16"
          @click="add_custom"
        />
      </div>
    </template>
  </section>
</template>
