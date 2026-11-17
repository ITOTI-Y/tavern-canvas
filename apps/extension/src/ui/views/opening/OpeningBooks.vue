<script setup lang="ts">
import { Link, Pencil, Plus, Scissors, Trash2, Undo2 } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningBookEntry, OpeningHost } from "../../../modules/opening/opening_host.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import {
  accept_slim,
  is_slim_candidate,
  SLIM_CONCURRENCY,
  slim_request,
  type SlimSource,
} from "../../../modules/world_info/slim_requests.js";
import { content_hash, create_slim_store } from "../../../modules/world_info/slim_store.js";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import type { OpeningPort } from "../../contracts/opening_port.js";
import { use_deferred_deletion } from "../../components/use_deferred_deletion.js";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import StateSurface from "../../components/StateSurface.vue";
import OpeningSectionSwitch from "./OpeningSectionSwitch.vue";
import SlimCompareDialog from "./SlimCompareDialog.vue";
import { reason, type OpeningLists, type OpeningSection } from "./opening_section.js";
import styles from "./opening_styles.js";

const props = defineProps<{
  readonly host: OpeningHost | null;
  readonly hostError: string | null;
  readonly lists: OpeningLists;
  /** Books whose entry text never activates other entries; the books stay unchanged. */
  readonly noRecursionBooks: readonly string[];
  /** Books whose active entries are sent as their stored condensed versions. */
  readonly slimBooks: readonly string[];
  /** The user's requirements added to every condensing request. */
  readonly slimGuidance: string;
  readonly port: OpeningPort | null;
}>();

const section = defineModel<OpeningSection>("section", { required: true });

const emit = defineEmits<{
  "refresh-lists": [];
  "set-no-recursion": [book: string, value: boolean];
  "set-slim": [book: string, value: boolean];
  "set-slim-guidance": [text: string];
}>();

const { t } = useI18n();

const defer_deletion = use_deferred_deletion();

/** Books and entries waiting for a deferred deletion, left out of the lists until then. */
const hidden_books = ref<ReadonlySet<string>>(new Set());
const hidden_entries = ref<ReadonlySet<string>>(new Set());
const entry_key = (name: string, uid: number): string => `${name}\u0000${String(uid)}`;
const visible_books = computed(() =>
  props.lists.books.filter((name) => !hidden_books.value.has(name)),
);

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
    const name = book.value;
    entries.value = (await props.host.read_entries(name)).filter(
      (entry) => !hidden_entries.value.has(entry_key(name, entry.uid)),
    );
  } catch (caught) {
    error.value = t("opening.errors.failed", { reason: reason(caught) });
  } finally {
    loading.value = false;
  }
}

watch(book, () => void load(), { immediate: true });
watch(visible_books, (books) => {
  if (book.value === null || !books.includes(book.value)) {
    book.value = props.lists.chat_book ?? books[0] ?? null;
  }
});

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

function delete_book(): void {
  const current = book.value;
  const host = props.host;
  if (current === null || host === null) {
    return;
  }
  hidden_books.value = new Set([...hidden_books.value, current]);
  confirm_delete_book.value = false;
  book.value = props.lists.chat_book !== current ? props.lists.chat_book : null;
  book.value ??= visible_books.value[0] ?? null;
  defer_deletion(
    { label: current, count: 1 },
    {
      commit: async () => {
        await host.delete_worldbook(current);
        emit("refresh-lists");
      },
      restore: () => {
        hidden_books.value = new Set([...hidden_books.value].filter((name) => name !== current));
      },
    },
  );
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

/* ---------- Condensed entries ---------- */

const slims = create_slim_store(globalThis.localStorage);
const slim_version = ref(0);
const slim_running = ref<AbortController | null>(null);
const slim_note = ref<string | null>(null);

const slim_sources = computed<SlimSource[]>(() =>
  entries.value
    .filter((entry) => entry.enabled)
    .map((entry) => ({
      uid: entry.uid,
      name: entry.name,
      keys: entry.keys,
      content: entry.content,
    }))
    .filter(is_slim_candidate),
);

const slim_stats = computed(() => {
  void slim_version.value;
  const name = book.value;
  const hashes = new Map(
    slim_sources.value.map((source) => [source.uid, content_hash(source.content)]),
  );
  const stored = name === null ? new Map<number, string>() : slims.matching(name, hashes);
  const done = slim_sources.value.filter((source) => stored.has(source.uid));
  return {
    total: slim_sources.value.length,
    done: done.length,
    before: done.reduce((sum, source) => sum + source.content.length, 0),
    after: [...stored.values()].reduce((sum, slim) => sum + slim.length, 0),
    pending: slim_sources.value.filter((source) => !stored.has(source.uid)),
  };
});

async function generate_slims(): Promise<void> {
  const name = book.value;
  const port = props.port;
  if (name === null || port === null || slim_running.value !== null) {
    return;
  }
  const controller = new AbortController();
  slim_running.value = controller;
  slim_note.value = null;
  const stopped = (): boolean => controller.signal.aborted;
  const queue = [...slim_stats.value.pending];
  let rejected = 0;
  let failed = 0;
  let last_failure = "";
  const work = async (): Promise<void> => {
    for (let source = queue.shift(); source !== undefined; source = queue.shift()) {
      if (stopped()) {
        return;
      }
      try {
        const { preamble, request } = slim_request(source, props.slimGuidance);
        const slim = await port.request_lean(request, preamble, controller.signal);
        if (accept_slim(source, slim)) {
          slims.save(name, [
            { uid: source.uid, hash: content_hash(source.content), slim: slim.trim() },
          ]);
          slim_version.value += 1;
        } else {
          rejected += 1;
        }
      } catch (caught) {
        if (stopped()) {
          return;
        }
        failed += 1;
        last_failure = reason(caught);
      }
    }
  };
  try {
    await Promise.all(Array.from({ length: SLIM_CONCURRENCY }, work));
  } finally {
    slim_running.value = null;
  }
  if (stopped()) {
    return;
  }
  slim_note.value =
    failed === 0
      ? t("opening.books.slim_finished", { rejected })
      : t("opening.books.slim_failed", { rejected, failed, reason: last_failure });
}

/** Whether each listed entry has a condensed text for its current original, or an outdated one. */
const slim_states = computed(() => {
  void slim_version.value;
  const name = book.value;
  const states = new Map<number, "fresh" | "stale">();
  if (name === null) {
    return states;
  }
  for (const entry of entries.value) {
    const stored = slims.get(name, entry.uid);
    if (stored !== null) {
      states.set(entry.uid, stored.hash === content_hash(entry.content) ? "fresh" : "stale");
    }
  }
  return states;
});

const comparing = ref<OpeningBookEntry | null>(null);
const comparing_stored = computed(() => {
  void slim_version.value;
  const name = book.value;
  const entry = comparing.value;
  return name === null || entry === null ? null : slims.get(name, entry.uid);
});

function save_compared(slim: string): void {
  const name = book.value;
  const entry = comparing.value;
  if (name === null || entry === null) {
    return;
  }
  slims.save(name, [{ uid: entry.uid, hash: content_hash(entry.content), slim }]);
  slim_version.value += 1;
  comparing.value = null;
}

/** Removes condensed texts at once; the undo toast saves them back. */
function revert_slims(name: string, uids: readonly number[], label: string | null): void {
  const removed = uids.flatMap((uid) => {
    const entry = slims.remove(name, uid);
    return entry === null ? [] : [{ uid, ...entry }];
  });
  if (removed.length === 0) {
    return;
  }
  slim_version.value += 1;
  defer_deletion(
    { label, count: removed.length },
    {
      commit: () => Promise.resolve(),
      restore: () => {
        slims.save(name, removed);
        slim_version.value += 1;
      },
    },
  );
}

function revert_compared(): void {
  const name = book.value;
  const entry = comparing.value;
  if (name === null || entry === null) {
    return;
  }
  comparing.value = null;
  revert_slims(name, [entry.uid], t("opening.books.slim_label", { name: entry.name }));
}

function revert_entry(entry: OpeningBookEntry): void {
  const name = book.value;
  if (name !== null) {
    revert_slims(name, [entry.uid], t("opening.books.slim_label", { name: entry.name }));
  }
}

function clear_book_slims(): void {
  const name = book.value;
  if (name !== null) {
    revert_slims(name, [...slim_states.value.keys()], null);
  }
}

function delete_entry(): void {
  const entry = deleting_entry.value;
  const target = book.value;
  const host = props.host;
  if (entry === null || target === null || host === null) {
    return;
  }
  const key = entry_key(target, entry.uid);
  hidden_entries.value = new Set([...hidden_entries.value, key]);
  entries.value = entries.value.filter((candidate) => candidate.uid !== entry.uid);
  deleting_entry.value = null;
  defer_deletion(
    { label: entry.name, count: 1 },
    {
      commit: async () => {
        await host.save_entries(target, { upsert: [], remove: [entry.uid] });
        hidden_entries.value = new Set([...hidden_entries.value].filter((item) => item !== key));
        emit("refresh-lists");
      },
      restore: () => {
        hidden_entries.value = new Set([...hidden_entries.value].filter((item) => item !== key));
        if (book.value === target) {
          void load();
        }
      },
    },
  );
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
      <div v-if="visible_books.length > 0" :class="styles.aside_title">
        {{ t("opening.books.list_title") }}
      </div>
      <button
        v-for="name in visible_books"
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
        <AppSwitch
          v-if="book !== null"
          :model-value="noRecursionBooks.includes(book)"
          :label="t('opening.books.no_recursion')"
          :description="t('opening.books.no_recursion_hint')"
          @update:model-value="
            (value: boolean) => book !== null && emit('set-no-recursion', book, value)
          "
        />

        <template v-if="book !== null">
          <AppSwitch
            :model-value="slimBooks.includes(book)"
            :label="t('opening.books.slim')"
            :description="t('opening.books.slim_hint')"
            @update:model-value="(value: boolean) => book !== null && emit('set-slim', book, value)"
          />
          <div :class="styles.row">
            <span :class="styles.hint">{{
              t("opening.books.slim_stats", {
                done: slim_stats.done,
                total: slim_stats.total,
                before: slim_stats.before,
                after: slim_stats.after,
              })
            }}</span>
            <span :class="styles.spacer" />
            <AppButton
              v-if="slim_running !== null"
              :label="t('opening.status.stop')"
              variant="ghost"
              @click="slim_running?.abort()"
            />
            <AppButton
              v-if="slim_states.size > 0"
              :label="t('opening.books.slim_clear')"
              variant="ghost"
              :disabled="slim_running !== null"
              @click="clear_book_slims"
            />
            <AppButton
              :label="t('opening.books.slim_generate', { n: slim_stats.pending.length })"
              :pending="slim_running !== null"
              :disabled="port === null || slim_stats.pending.length === 0 || slim_running !== null"
              @click="() => void generate_slims()"
            />
          </div>
          <FieldGroup
            :label="t('opening.books.slim_guidance')"
            :hint="t('opening.books.slim_guidance_hint')"
          >
            <template #default="{ fieldId, describedBy }">
              <textarea
                :id="fieldId"
                :aria-describedby="describedBy"
                :class="styles.text_area_small"
                :value="slimGuidance"
                maxlength="2000"
                :placeholder="t('opening.books.slim_guidance_placeholder')"
                @change="
                  (event) => emit('set-slim-guidance', (event.target as HTMLTextAreaElement).value)
                "
              />
            </template>
          </FieldGroup>
          <p v-if="slim_note !== null" :class="styles.hint" role="status">{{ slim_note }}</p>
        </template>

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

          <AppDialog
            :open="form !== null"
            :title="
              form?.uid === undefined ? t('opening.books.add_entry') : t('opening.entry.edit')
            "
            :close-label="t('common.actions.close')"
            @update:open="(value) => (form = value ? form : null)"
          >
            <div v-if="form !== null" :class="styles.work_inner">
              <div :class="styles.grid3">
                <FieldGroup :label="t('opening.entry.title_label')">
                  <template #default="{ fieldId }">
                    <input
                      :id="fieldId"
                      v-model="form.name"
                      :class="styles.input"
                      maxlength="120"
                    />
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
                <AppButton
                  :label="t('common.actions.cancel')"
                  variant="ghost"
                  @click="form = null"
                />
                <AppButton
                  :label="t('common.actions.save')"
                  variant="primary"
                  :pending="working"
                  :disabled="form.name.trim() === ''"
                  @click="save_form"
                />
              </div>
            </div>
          </AppDialog>

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
                    <span
                      v-if="slim_states.get(entry.uid) === 'fresh'"
                      :class="styles.pill"
                      data-tone="new"
                      >{{ t("opening.books.slim_badge") }}</span
                    >
                    <span
                      v-else-if="slim_states.get(entry.uid) === 'stale'"
                      :class="styles.pill"
                      data-tone="changed"
                      >{{ t("opening.books.slim_stale_badge") }}</span
                    >
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
                    v-if="slim_states.has(entry.uid)"
                    :icon="Undo2"
                    :label="t('opening.books.slim_revert_entry', { name: entry.name })"
                    size="sm"
                    :disabled="working || slim_running !== null"
                    @click="revert_entry(entry)"
                  />
                  <IconButton
                    :icon="Scissors"
                    :label="t('opening.books.slim_compare')"
                    size="sm"
                    :disabled="working"
                    @click="comparing = entry"
                  />
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
    <SlimCompareDialog
      :entry="comparing"
      :stored="comparing_stored"
      :guidance="slimGuidance"
      :port="port"
      @close="comparing = null"
      @save="save_compared"
      @remove="revert_compared"
      @set-guidance="(text: string) => emit('set-slim-guidance', text)"
    />
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
