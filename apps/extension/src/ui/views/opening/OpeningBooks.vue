<script setup lang="ts">
import { Link, Pencil, Plus, Trash2 } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningBookEntry, OpeningHost } from "../../../modules/opening/opening_host.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import StateSurface from "../../components/StateSurface.vue";
import OpeningSectionSwitch from "./OpeningSectionSwitch.vue";
import { reason, type OpeningLists, type OpeningSection } from "./opening_section.js";
import styles from "./opening_styles.js";

const props = defineProps<{
  readonly host: OpeningHost | null;
  readonly hostError: string | null;
  readonly lists: OpeningLists;
}>();

const section = defineModel<OpeningSection>("section", { required: true });

const emit = defineEmits<{
  "refresh-lists": [];
}>();

const { t } = useI18n();

const book = ref<string | null>(props.lists.chat_book ?? props.lists.books[0] ?? null);
const entries = ref<readonly OpeningBookEntry[]>([]);
const loading = ref(false);
const working = ref(false);
const error = ref<string | null>(null);

async function load(): Promise<void> {
  entries.value = [];
  if (props.host === null || book.value === null) {
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    entries.value = await props.host.read_entries(book.value);
  } catch (caught) {
    error.value = t("opening.errors.failed", { reason: reason(caught) });
  } finally {
    loading.value = false;
  }
}

watch(book, () => void load(), { immediate: true });
watch(
  () => props.lists.books,
  (books) => {
    if (book.value === null || !books.includes(book.value)) {
      book.value = props.lists.chat_book ?? books[0] ?? null;
    }
  },
);

/** Runs one host write, then reads the lists and the open book again. */
async function act(work: (host: OpeningHost) => Promise<void>): Promise<boolean> {
  if (props.host === null) {
    return false;
  }
  working.value = true;
  error.value = null;
  try {
    await work(props.host);
    emit("refresh-lists");
    await load();
    return true;
  } catch (caught) {
    error.value = t("opening.errors.failed", { reason: reason(caught) });
    return false;
  } finally {
    working.value = false;
  }
}

/* ---------- Books ---------- */

const name_dialog = ref<"create" | "rename" | null>(null);
const name_draft = ref("");
const name_taken = computed(
  () =>
    name_draft.value.trim() !== book.value && props.lists.books.includes(name_draft.value.trim()),
);

function open_name_dialog(kind: "create" | "rename"): void {
  name_draft.value = kind === "rename" ? (book.value ?? "") : "";
  name_dialog.value = kind;
}

async function save_name(): Promise<void> {
  const name = name_draft.value.trim();
  const kind = name_dialog.value;
  const current = book.value;
  if (name === "" || name_taken.value || kind === null) {
    return;
  }
  const done = await act((host) =>
    kind === "create" || current === null
      ? host.create_worldbook(name)
      : host.rename_worldbook(current, name),
  );
  if (done) {
    name_dialog.value = null;
    book.value = name;
  }
}

const confirm_delete_book = ref(false);

async function delete_book(): Promise<void> {
  const current = book.value;
  if (current !== null && (await act((host) => host.delete_worldbook(current)))) {
    confirm_delete_book.value = false;
    book.value = null;
  }
}

async function bind(): Promise<void> {
  const current = book.value;
  if (current !== null) {
    await act((host) => host.bind_chat_worldbook(current));
  }
}

function book_meta(name: string): string {
  return name === props.lists.chat_book ? t("opening.books.bound") : "";
}

/* ---------- Entries ---------- */

const query = ref("");
const filter = ref<string>("all");
const filter_options = computed(() => [
  { value: "all", label: t("opening.books.filter_all") },
  { value: "constant", label: t("opening.books.filter_constant") },
  { value: "keyword", label: t("opening.books.filter_keyword") },
]);

const shown = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return entries.value.filter((entry) => {
    if (filter.value === "constant" && !entry.constant) {
      return false;
    }
    if (filter.value === "keyword" && entry.constant) {
      return false;
    }
    return (
      needle === "" ||
      [entry.name, entry.content, ...entry.keys].some((text) => text.toLowerCase().includes(needle))
    );
  });
});

const enabled_count = computed(() => entries.value.filter((entry) => entry.enabled).length);

interface EntryForm {
  uid: number | undefined;
  name: string;
  constant: boolean;
  keys: string;
  content: string;
  order: number;
  enabled: boolean;
}

const form = ref<EntryForm | null>(null);

function open_form(entry: OpeningBookEntry | null): void {
  const highest = entries.value.reduce((max, item) => Math.max(max, item.order), 0);
  form.value =
    entry === null
      ? {
          uid: undefined,
          name: "",
          constant: false,
          keys: "",
          content: "",
          order: highest + 10,
          enabled: true,
        }
      : {
          uid: entry.uid,
          name: entry.name,
          constant: entry.constant,
          keys: entry.keys.join(", "),
          content: entry.content,
          order: entry.order,
          enabled: entry.enabled,
        };
}

async function save_form(): Promise<void> {
  const current = form.value;
  const target = book.value;
  if (current === null || target === null) {
    return;
  }
  const keys = [
    ...new Set(
      current.keys
        .split(/[,，、]/u)
        .map((key) => key.trim())
        .filter((key) => key !== ""),
    ),
  ];
  const done = await act((host) =>
    host.save_entries(target, {
      upsert: [
        {
          ...(current.uid === undefined ? {} : { uid: current.uid }),
          name: current.name.trim(),
          enabled: current.enabled,
          constant: current.constant,
          keys: current.constant ? [] : keys,
          content: current.content,
          order: current.order,
        },
      ],
      remove: [],
    }),
  );
  if (done) {
    form.value = null;
  }
}

async function toggle(entry: OpeningBookEntry, enabled: boolean): Promise<void> {
  const target = book.value;
  if (target !== null) {
    await act((host) => host.save_entries(target, { upsert: [{ ...entry, enabled }], remove: [] }));
  }
}

const deleting_entry = ref<OpeningBookEntry | null>(null);

async function delete_entry(): Promise<void> {
  const entry = deleting_entry.value;
  const target = book.value;
  if (entry !== null && target !== null) {
    await act((host) => host.save_entries(target, { upsert: [], remove: [entry.uid] }));
    deleting_entry.value = null;
  }
}
</script>

<template>
  <div :class="styles.layout">
    <aside :class="styles.aside" :aria-label="t('opening.books.list_label')">
      <AppButton
        :class="styles.aside_new"
        :icon="Plus"
        :label="t('opening.books.new')"
        :disabled="host === null"
        @click="open_name_dialog('create')"
      />
      <div v-if="lists.books.length > 0" :class="styles.aside_title">
        {{ t("opening.books.list_title") }}
      </div>
      <button
        v-for="name in lists.books"
        :key="name"
        type="button"
        class="tc-interactive"
        :class="styles.item"
        :aria-current="name === book ? 'true' : undefined"
        @click="book = name"
      >
        <span :class="styles.item_name">{{ name }}</span>
        <span v-if="book_meta(name) !== ''" :class="styles.item_meta">{{ book_meta(name) }}</span>
      </button>
    </aside>

    <div :class="styles.work">
      <div :class="styles.work_inner" data-wide>
        <div :class="styles.topline">
          <OpeningSectionSwitch v-model="section" />
          <span :class="styles.spacer" />
          <template v-if="book !== null">
            <AppButton
              v-if="book !== lists.chat_book && host?.chat_name() !== null"
              :icon="Link"
              :label="t('opening.books.bind')"
              variant="ghost"
              :disabled="working"
              @click="bind"
            />
            <AppButton
              :icon="Pencil"
              :label="t('opening.books.rename')"
              variant="ghost"
              :disabled="working"
              @click="open_name_dialog('rename')"
            />
            <IconButton
              :icon="Trash2"
              :label="t('opening.books.delete')"
              destructive
              :disabled="working"
              @click="confirm_delete_book = true"
            />
          </template>
        </div>

        <StateSurface
          v-if="host === null"
          status="empty"
          :empty-title="t('opening.books.unavailable_title')"
          :empty-message="hostError ?? t('opening.books.unavailable_message')"
        />
        <template v-else-if="book === null">
          <div :class="styles.work_head">
            <h1 :class="styles.work_title">{{ t("opening.books.title") }}</h1>
            <p :class="styles.work_description">{{ t("opening.books.empty") }}</p>
          </div>
        </template>
        <template v-else>
          <div :class="styles.work_head">
            <h1 :class="styles.work_title">{{ book }}</h1>
            <p :class="styles.work_description">
              {{ t("opening.books.summary", { n: entries.length, enabled: enabled_count }) }}
              <template v-if="book === lists.chat_book"> · {{ t("opening.books.bound") }}</template>
            </p>
          </div>
          <p v-if="error !== null" :class="styles.error" role="alert">{{ error }}</p>
          <div :class="styles.row">
            <input
              v-model="query"
              :class="[styles.input, styles.spacer]"
              type="search"
              :placeholder="t('opening.books.search')"
              :aria-label="t('opening.books.search')"
            />
            <AppSelect
              v-model="filter"
              :options="filter_options"
              :placeholder="t('opening.books.filter_all')"
              :aria-label="t('opening.books.filter_label')"
            />
            <AppButton
              :icon="Plus"
              :label="t('opening.books.add_entry')"
              :disabled="working"
              @click="open_form(null)"
            />
          </div>

          <div v-if="form !== null" :class="styles.editor">
            <div :class="styles.grid3">
              <FieldGroup :label="t('opening.entry.title_label')">
                <template #default="{ fieldId }">
                  <input :id="fieldId" v-model="form.name" :class="styles.input" maxlength="120" />
                </template>
              </FieldGroup>
              <FieldGroup :label="t('opening.books.order_label')">
                <template #default="{ fieldId }">
                  <NumberStepper
                    :id="fieldId"
                    v-model="form.order"
                    :label="t('opening.books.order_label')"
                    :increment-label="t('opening.books.order_up')"
                    :decrement-label="t('opening.books.order_down')"
                    :min="0"
                    :max="10000"
                  />
                </template>
              </FieldGroup>
            </div>
            <AppSwitch
              v-model="form.constant"
              :label="t('opening.entry.constant_label')"
              :description="t('opening.entry.constant_hint')"
            />
            <FieldGroup
              v-if="!form.constant"
              :label="t('opening.entry.keys_label')"
              :hint="t('opening.entry.keys_hint')"
            >
              <template #default="{ fieldId, describedBy }">
                <input
                  :id="fieldId"
                  v-model="form.keys"
                  :class="styles.input"
                  :aria-describedby="describedBy"
                />
              </template>
            </FieldGroup>
            <FieldGroup :label="t('opening.entry.content_label')">
              <template #default="{ fieldId }">
                <textarea :id="fieldId" v-model="form.content" :class="styles.text_area" />
              </template>
            </FieldGroup>
            <div :class="styles.row">
              <span :class="styles.spacer" />
              <AppButton :label="t('common.actions.cancel')" variant="ghost" @click="form = null" />
              <AppButton
                :label="t('common.actions.save')"
                variant="primary"
                :pending="working"
                :disabled="form.name.trim() === ''"
                @click="save_form"
              />
            </div>
          </div>

          <StateSurface
            :status="loading ? 'loading' : shown.length === 0 ? 'empty' : 'ready'"
            :empty-title="t('opening.books.no_entries')"
            min-height="80px"
          >
            <div :class="styles.table">
              <div
                v-for="entry in shown"
                :key="entry.uid"
                :class="styles.table_row"
                :data-off="entry.enabled ? undefined : ''"
              >
                <AppSwitch
                  :model-value="entry.enabled"
                  :label="t('opening.books.enabled', { name: entry.name })"
                  label-hidden
                  :disabled="working"
                  @update:model-value="(value) => toggle(entry, value)"
                />
                <span :class="styles.table_name">
                  {{ entry.name }}
                  <span :class="styles.keys">
                    <span v-if="entry.constant" :class="styles.pill" data-tone="constant">{{
                      t("opening.entry.constant")
                    }}</span>
                    <span
                      v-for="key in entry.keys.slice(0, 4)"
                      v-else
                      :key="key"
                      :class="styles.key"
                      >{{ key }}</span
                    >
                  </span>
                </span>
                <span :class="styles.preview">{{ entry.content }}</span>
                <span :class="styles.order">{{ entry.order }}</span>
                <span :class="styles.row">
                  <IconButton
                    :icon="Pencil"
                    :label="t('opening.entry.edit')"
                    size="sm"
                    :disabled="working"
                    @click="open_form(entry)"
                  />
                  <IconButton
                    :icon="Trash2"
                    :label="t('opening.entry.remove')"
                    size="sm"
                    destructive
                    :disabled="working"
                    @click="deleting_entry = entry"
                  />
                </span>
              </div>
            </div>
          </StateSurface>
        </template>
      </div>
    </div>

    <AppDialog
      :open="name_dialog !== null"
      :title="name_dialog === 'rename' ? t('opening.books.rename') : t('opening.books.new')"
      v-bind="name_dialog === 'rename' ? { description: t('opening.books.rename_hint') } : {}"
      :close-label="t('common.actions.close')"
      @update:open="(value) => (name_dialog = value ? name_dialog : null)"
    >
      <div :class="styles.work_inner">
        <input
          v-model="name_draft"
          :class="styles.input"
          maxlength="120"
          :aria-label="t('opening.books.name_label')"
        />
        <p v-if="name_taken" :class="styles.error">{{ t("opening.write.name_taken") }}</p>
        <div :class="styles.row">
          <span :class="styles.spacer" />
          <AppButton
            :label="t('common.actions.cancel')"
            variant="ghost"
            @click="name_dialog = null"
          />
          <AppButton
            :label="t('common.actions.save')"
            variant="primary"
            :pending="working"
            :disabled="name_draft.trim() === '' || name_taken"
            @click="save_name"
          />
        </div>
      </div>
    </AppDialog>
    <ConfirmDialog
      v-model:open="confirm_delete_book"
      :title="t('opening.books.delete_title', { name: book ?? '' })"
      :description="t('opening.books.delete_description')"
      :confirm-label="t('common.actions.delete')"
      :cancel-label="t('common.actions.cancel')"
      :pending="working"
      @confirm="delete_book"
    />
    <ConfirmDialog
      :open="deleting_entry !== null"
      :title="t('opening.books.delete_entry_title', { name: deleting_entry?.name ?? '' })"
      :description="t('opening.books.delete_entry_description')"
      :confirm-label="t('common.actions.delete')"
      :cancel-label="t('common.actions.cancel')"
      :pending="working"
      @update:open="(value) => (deleting_entry = value ? deleting_entry : null)"
      @confirm="delete_entry"
    />
  </div>
</template>
