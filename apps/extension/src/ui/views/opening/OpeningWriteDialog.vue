<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningBookEntry, OpeningHost } from "../../../modules/opening/opening_host.js";
import type { OpeningEntry } from "../../../modules/opening/opening_model.js";
import {
  plan_write,
  write_changes,
  type WriteRow,
} from "../../../modules/opening/opening_output.js";
import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppDialog from "../../components/AppDialog.vue";
import AppSelect from "../../components/AppSelect.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import { reason, type OpeningLists } from "./opening_section.js";
import styles from "./opening_styles.js";

const props = defineProps<{
  readonly host: OpeningHost;
  readonly entries: readonly OpeningEntry[];
  readonly defaultName: string;
  readonly lists: OpeningLists;
}>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
  written: [book: string];
}>();

const { t } = useI18n();

const mode = ref<"new" | "existing">("new");
const new_name = ref("");
const book = ref<string | undefined>(undefined);
const existing = ref<readonly OpeningBookEntry[]>([]);
const loading = ref(false);
const writing = ref(false);
const error = ref<string | null>(null);
const chosen = ref(new Set<string>());

const mode_options = computed(() => [
  { value: "new", label: t("opening.write.mode_new") },
  { value: "existing", label: t("opening.write.mode_existing") },
]);

const book_options = computed(() =>
  props.lists.books.map((name) => ({ value: name, label: name })),
);

const rows = computed<WriteRow[]>(() =>
  plan_write(props.entries, mode.value === "existing" ? existing.value : []),
);

function choose_defaults(): void {
  chosen.value = new Set(
    rows.value.filter((row) => row.status !== "same").map((row) => row.entry.id),
  );
}

async function load_book(): Promise<void> {
  existing.value = [];
  if (mode.value !== "existing" || book.value === undefined) {
    choose_defaults();
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    existing.value = await props.host.read_entries(book.value);
  } catch (caught) {
    error.value = t("opening.write.read_failed", { reason: reason(caught) });
  } finally {
    loading.value = false;
    choose_defaults();
  }
}

watch(open, (value) => {
  if (!value) {
    return;
  }
  error.value = null;
  new_name.value = props.defaultName;
  book.value = props.lists.chat_book ?? props.lists.books[0];
  mode.value = props.lists.chat_book === null ? "new" : "existing";
  void load_book();
});

watch([mode, book], () => {
  void load_book();
});

function toggle(id: string, value: boolean | "indeterminate"): void {
  const next = new Set(chosen.value);
  if (value === true) {
    next.add(id);
  } else {
    next.delete(id);
  }
  chosen.value = next;
}

const target = computed(() => (mode.value === "new" ? new_name.value.trim() : (book.value ?? "")));
const name_taken = computed(
  () => mode.value === "new" && props.lists.books.includes(new_name.value.trim()),
);
const chosen_count = computed(
  () => rows.value.filter((row) => row.status !== "same" && chosen.value.has(row.entry.id)).length,
);
const chat_name = computed(() => (open.value ? props.host.chat_name() : null));

function status_label(row: WriteRow): string {
  switch (row.status) {
    case "new":
      return t("opening.write.status_new");
    case "modified":
      return t("opening.write.status_modified");
    case "same":
      return t("opening.write.status_same");
  }
}

async function write(): Promise<void> {
  const name = target.value;
  if (name === "" || name_taken.value) {
    return;
  }
  writing.value = true;
  error.value = null;
  try {
    if (mode.value === "new") {
      await props.host.create_worldbook(name);
    }
    const base = mode.value === "new" ? [] : existing.value;
    await props.host.save_entries(name, write_changes(rows.value, chosen.value, base));
    if (chat_name.value !== null) {
      await props.host.bind_chat_worldbook(name);
    }
    emit("written", name);
    open.value = false;
  } catch (caught) {
    error.value = t("opening.write.failed", { reason: reason(caught) });
  } finally {
    writing.value = false;
  }
}
</script>

<template>
  <AppDialog
    v-model:open="open"
    :title="t('opening.write.title')"
    :description="t('opening.write.description')"
    :close-label="t('common.actions.close')"
  >
    <div :class="styles.work_inner">
      <SegmentedControl
        v-model="mode"
        :class="styles.compact"
        :options="mode_options"
        :label="t('opening.write.mode_label')"
      />
      <input
        v-if="mode === 'new'"
        v-model="new_name"
        :class="styles.input"
        maxlength="120"
        :aria-label="t('opening.write.name_label')"
      />
      <AppSelect
        v-else
        v-model="book"
        :options="book_options"
        :placeholder="t('opening.write.book_placeholder')"
        :aria-label="t('opening.write.book_label')"
      />
      <p v-if="name_taken" :class="styles.error">{{ t("opening.write.name_taken") }}</p>
      <p v-if="loading" :class="styles.hint" role="status">{{ t("opening.write.loading") }}</p>
      <div v-else :class="styles.write_list">
        <div
          v-for="row in rows"
          :key="row.entry.id"
          :class="styles.write_row"
          :data-status="row.status"
        >
          <AppCheckbox
            :model-value="row.status !== 'same' && chosen.has(row.entry.id)"
            :label="row.entry.title"
            label-hidden
            :disabled="row.status === 'same'"
            @update:model-value="(value) => toggle(row.entry.id, value)"
          />
          <span :class="styles.pill" :data-tone="row.status">{{ status_label(row) }}</span>
          <span>
            <strong>{{ row.entry.title }}</strong>
            <span v-if="row.status === 'modified' && row.existing !== null" :class="styles.diff">
              <del>{{ row.existing.content }}</del>
              <ins>{{ row.entry.content }}</ins>
            </span>
          </span>
        </div>
      </div>
      <p :class="styles.hint">
        {{
          chat_name === null
            ? t("opening.write.no_chat")
            : t("opening.write.bind_note", { book: target, chat: chat_name })
        }}
      </p>
      <p v-if="error !== null" :class="styles.error" role="alert">{{ error }}</p>
      <div :class="styles.row">
        <span :class="styles.spacer" />
        <AppButton :label="t('common.actions.cancel')" variant="ghost" @click="open = false" />
        <AppButton
          :label="t('opening.write.confirm', { n: chosen_count })"
          variant="primary"
          :pending="writing"
          :disabled="chosen_count === 0 || target === '' || name_taken || loading"
          @click="write"
        />
      </div>
    </div>
  </AppDialog>
</template>
