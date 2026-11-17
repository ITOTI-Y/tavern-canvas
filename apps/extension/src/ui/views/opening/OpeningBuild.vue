<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronsRight,
  Copy,
  Download,
  FileText,
  MessageSquare,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  Square,
  Trash2,
  X,
} from "lucide-vue-next";
import { computed, nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { AnalysisParseError } from "../../../modules/illustration/analysis_error.js";
import type { OpeningCharacter, OpeningHost } from "../../../modules/opening/opening_host.js";
import {
  BUILTIN_TEMPLATE_ID,
  change_description,
  empty_state,
  plain,
  type OpeningDraft,
  type OpeningEntry,
  type OpeningStepState,
  type OpeningTemplate,
  type WrittenEntry,
} from "../../../modules/opening/opening_model.js";
import { draft_entries, draft_markdown } from "../../../modules/opening/opening_output.js";
import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppIcon from "../../components/AppIcon.vue";
import AppSelect from "../../components/AppSelect.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { use_deferred_deletion } from "../../components/use_deferred_deletion.js";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import OpeningEntryCard from "./OpeningEntryCard.vue";
import OpeningSectionSwitch from "./OpeningSectionSwitch.vue";
import OpeningWriteDialog from "./OpeningWriteDialog.vue";
import { reason, type OpeningLists, type OpeningSection } from "./opening_section.js";
import styles from "./opening_styles.js";
import type { OpeningFlow } from "./use_opening_flow.js";
import type { OpeningStore } from "./use_opening_store.js";

const props = defineProps<{
  readonly store: OpeningStore;
  readonly flow: OpeningFlow;
  readonly host: OpeningHost | null;
  readonly hostError: string | null;
  readonly lists: OpeningLists;
  readonly templates: readonly OpeningTemplate[];
  readonly saveError: string | null;
}>();

const section = defineModel<OpeningSection>("section", { required: true });

const emit = defineEmits<{
  "refresh-lists": [];
}>();

const { t } = useI18n();

const defer_deletion = use_deferred_deletion();

const DESCRIPTION_MAX_LENGTH = 4000;

/* ---------- Drafts ---------- */

const selected_id = ref<string | null>(props.store.drafts.value[0]?.id ?? null);
const draft = computed<OpeningDraft | null>(() =>
  selected_id.value === null ? null : props.store.draft(selected_id.value),
);
const action_error = ref<string | null>(null);

function step_states(item: OpeningDraft): readonly string[] {
  return item.states.map((state, index) =>
    state.status === "pending" && item.started && index === item.current ? "asking" : state.status,
  );
}

function draft_meta(item: OpeningDraft): string {
  if (!item.started) {
    return t("opening.draft.not_started");
  }
  if (item.states.every((state) => state.status === "done")) {
    return t("opening.draft.finished");
  }
  return t("opening.draft.at_step", { n: item.current + 1, total: item.steps.length });
}

function template_by_id(id: string): OpeningTemplate | undefined {
  return props.templates.find((template) => template.id === id);
}

async function new_draft(): Promise<void> {
  const template = template_by_id(BUILTIN_TEMPLATE_ID) ?? props.templates[0];
  if (template === undefined) {
    return;
  }
  const item: OpeningDraft = {
    id: crypto.randomUUID(),
    kind: "draft",
    display_name: t("opening.draft.new_name", { n: props.store.drafts.value.length + 1 }),
    created_at: new Date().toISOString(),
    description: "",
    template_name: template.display_name,
    steps: template.steps.map((step) => ({ ...step })),
    states: template.steps.map(empty_state),
    current: 0,
    started: false,
    connection: { kind: "analysis" },
    preset_name: "in_use",
    worldbooks: [],
    card: null,
    use_greeting: false,
    written: {},
  };
  await props.store.add(item);
  selected_id.value = item.id;
}

const confirm_delete = ref(false);
const deleting = ref(false);

async function delete_draft(): Promise<void> {
  const current = draft.value;
  if (current === null) {
    return;
  }
  deleting.value = true;
  try {
    await props.store.remove(current.id);
    confirm_delete.value = false;
    selected_id.value = props.store.drafts.value[0]?.id ?? null;
  } finally {
    deleting.value = false;
  }
}

function edit(change: (item: OpeningDraft) => void, debounce = false): void {
  if (draft.value !== null) {
    props.store.edit(draft.value, change, { debounce });
  }
}

/* ---------- Draft settings ---------- */

const template_options = computed(() =>
  props.templates.map((template) => ({ value: template.id, label: template.display_name })),
);
const chosen_template = ref<string>(BUILTIN_TEMPLATE_ID);

watch(
  () => draft.value?.template_name,
  (name) => {
    chosen_template.value =
      props.templates.find((template) => template.display_name === name)?.id ?? BUILTIN_TEMPLATE_ID;
  },
  { immediate: true },
);

function choose_template(id: string | undefined): void {
  const template = id === undefined ? undefined : template_by_id(id);
  if (template === undefined) {
    return;
  }
  chosen_template.value = template.id;
  edit((item) => {
    item.template_name = template.display_name;
    item.steps = template.steps.map((step) => ({ ...step }));
    item.states = template.steps.map(empty_state);
    item.current = 0;
  });
}

const connection_options = computed(() => [
  { value: "analysis", label: t("opening.settings.connection_analysis") },
  { value: "current", label: t("opening.settings.connection_current") },
  ...props.lists.proxies.map((name) => ({
    value: `proxy:${name}`,
    label: t("opening.settings.connection_proxy", { name }),
  })),
]);

const connection_value = computed(() => {
  const connection = draft.value?.connection;
  return connection?.kind === "proxy_preset"
    ? `proxy:${connection.proxy_preset}`
    : connection?.kind;
});

function choose_connection(value: string | undefined): void {
  if (value === undefined) {
    return;
  }
  edit((item) => {
    item.connection = value.startsWith("proxy:")
      ? { kind: "proxy_preset", proxy_preset: value.slice("proxy:".length) }
      : value === "current"
        ? { kind: "current" }
        : { kind: "analysis" };
  });
}

const preset_options = computed(() =>
  props.lists.presets.map((name) => ({
    value: name,
    label: name === "in_use" ? t("opening.settings.preset_in_use") : name,
  })),
);

function choose_preset(value: string | undefined): void {
  if (value !== undefined) {
    edit((item) => {
      item.preset_name = value;
    });
  }
}

function toggle_worldbook(name: string): void {
  edit((item) => {
    item.worldbooks = item.worldbooks.includes(name)
      ? item.worldbooks.filter((book) => book !== name)
      : [...item.worldbooks, name].slice(0, 20);
  });
}

/** The open chat's character, read again whenever another draft is shown. */
const character = ref<OpeningCharacter | null>(null);

watch(
  [selected_id, () => props.host],
  () => {
    character.value = props.host?.character() ?? null;
  },
  { immediate: true },
);

/** Takes a copy of the card and adds the books bound to it to the reference books. */
function toggle_card(value: boolean | "indeterminate"): void {
  const source = character.value;
  edit((item) => {
    if (value === true && source !== null) {
      item.card = {
        name: source.name,
        description: source.description,
        personality: source.personality,
        scenario: source.scenario,
        first_message: source.first_message,
      };
      item.worldbooks = [...new Set([...item.worldbooks, ...source.worldbooks])].slice(0, 20);
      return;
    }
    item.card = null;
    item.use_greeting = false;
  });
}

function toggle_greeting(value: boolean | "indeterminate"): void {
  edit((item) => {
    item.use_greeting = value === true && item.card !== null;
  });
}

function connection_label(item: OpeningDraft): string {
  return (
    connection_options.value.find((option) => option.value === connection_value.value)?.label ??
    item.connection.kind
  );
}

/* ---------- Steps ---------- */

const busy = computed(() => (draft.value === null ? null : props.flow.busy(draft.value.id)));
const flow_error = computed(() => (draft.value === null ? null : props.flow.error(draft.value.id)));
const step = computed(() => draft.value?.steps[draft.value.current] ?? null);
const state = computed<OpeningStepState | null>(
  () => draft.value?.states[draft.value.current] ?? null,
);
const is_last = computed(
  () => draft.value !== null && draft.value.current === draft.value.steps.length - 1,
);
const has_result = computed(
  () => state.value?.status === "done" || state.value?.status === "stale",
);
const has_stale = computed(
  () => draft.value?.states.some((item) => item.status === "stale") ?? false,
);

function error_text(error: unknown): string {
  if (error instanceof AnalysisParseError) {
    return t("opening.errors.unparsable", { excerpt: error.excerpt });
  }
  return t("opening.errors.failed", { reason: reason(error) });
}

function step_tag(status: string): string {
  return status === "stale" ? t("opening.steps.stale") : "";
}

function can_open(index: number): boolean {
  const item = draft.value;
  return item !== null && (item.states[index]?.status !== "pending" || index === item.current);
}

function open_step(index: number): void {
  edit((item) => {
    item.current = index;
  });
}

async function start(): Promise<void> {
  const item = draft.value;
  if (item === null || item.description.trim() === "") {
    return;
  }
  edit((current) => {
    current.started = true;
  });
  await props.flow.run_step(item, 0);
}

/* ---------- Description of a draft under way ---------- */

const editing_description = ref(false);
const description_text = ref("");

function edit_description(): void {
  description_text.value = draft.value?.description ?? "";
  editing_description.value = true;
}

function save_description(): void {
  const text = description_text.value;
  edit((item) => {
    change_description(item, text);
  });
  editing_description.value = false;
}

/* ---------- Questions ---------- */

const picked = ref<readonly string[]>([]);
const other = ref("");

/* What was wrong with the question shown, sent when asking for another; may be empty. */
const refine_open = ref(false);
const refine_feedback = ref("");

async function refine(): Promise<void> {
  const item = draft.value;
  if (item === null) {
    return;
  }
  const feedback = refine_feedback.value;
  refine_open.value = false;
  refine_feedback.value = "";
  await props.flow.refine_question(item, feedback);
}

/* What the user wants the next "Ask more" question to be about; empty leaves it to the model. */
const more_open = ref(false);
const more_focus = ref("");
const more_input = ref<HTMLInputElement | null>(null);

async function open_more(): Promise<void> {
  more_open.value = true;
  await nextTick();
  more_input.value?.focus();
}

watch(
  () => [draft.value?.id, draft.value?.current],
  () => {
    more_open.value = false;
    more_focus.value = "";
  },
);

async function ask_more(): Promise<void> {
  const item = draft.value;
  if (item === null) {
    return;
  }
  const focus = more_focus.value;
  more_open.value = false;
  more_focus.value = "";
  await props.flow.ask_more(item, item.current, focus);
}

watch(
  () => state.value?.question,
  () => {
    picked.value = [];
    other.value = "";
  },
);

function pick(label: string): void {
  const question = state.value?.question;
  if (question === null || question === undefined) {
    return;
  }
  if (!question.multiple) {
    picked.value = picked.value.includes(label) ? [] : [label];
    return;
  }
  picked.value = picked.value.includes(label)
    ? picked.value.filter((item) => item !== label)
    : [...picked.value, label];
}

async function answer(): Promise<void> {
  if (draft.value !== null) {
    await props.flow.answer(draft.value, picked.value, other.value);
  }
}

function answer_text(selected: readonly string[], typed: string): string {
  const parts = [...selected, ...(typed === "" ? [] : [typed])];
  return parts.length === 0 ? t("opening.ask.left_to_model") : parts.join(t("opening.ask.joiner"));
}

/* ---------- Results ---------- */

const added_entry = ref<string | null>(null);

function save_entry(index: number, entry: OpeningEntry): void {
  edit((item) => {
    const entries = item.states[index]?.entries;
    const position = entries?.findIndex((candidate) => candidate.id === entry.id) ?? -1;
    if (entries !== undefined && position >= 0) {
      entries[position] = entry;
    }
  });
  added_entry.value = null;
}

function remove_entry(index: number, id: string): void {
  const item_id = draft.value?.id;
  const entries = draft.value?.states[index]?.entries ?? [];
  const position = entries.findIndex((entry) => entry.id === id);
  const removed = entries[position];
  if (item_id !== undefined && removed !== undefined && added_entry.value !== id) {
    const snapshot = plain(removed);
    defer_deletion(
      { label: removed.title, count: 1 },
      {
        commit: () => Promise.resolve(),
        restore: () => {
          const owner = props.store.draft(item_id);
          if (owner !== null) {
            props.store.edit(owner, (current) => {
              const target = current.states[index];
              if (target !== undefined && !target.entries.some((entry) => entry.id === id)) {
                target.entries.splice(Math.min(position, target.entries.length), 0, snapshot);
              }
            });
          }
        },
      },
    );
  }
  edit((item) => {
    const target = item.states[index];
    if (target !== undefined) {
      target.entries = target.entries.filter((entry) => entry.id !== id);
    }
  });
}

function add_entry(index: number): void {
  const id = crypto.randomUUID();
  edit((item) => {
    item.states[index]?.entries.push({
      id,
      title: t("opening.entry.new_title"),
      constant: false,
      keys: [],
      content: "",
    });
  });
  added_entry.value = id;
}

function cancel_added(index: number, id: string): void {
  if (added_entry.value === id) {
    remove_entry(index, id);
    added_entry.value = null;
  }
}

const editing_message = ref(false);
const message_speaker = ref("");
const message_text = ref("");

function edit_message(): void {
  message_speaker.value = state.value?.message?.speaker ?? "";
  message_text.value = state.value?.message?.text ?? "";
  editing_message.value = true;
}

function save_message(): void {
  const index = draft.value?.current ?? 0;
  edit((item) => {
    const target = item.states[index];
    if (target !== undefined) {
      target.message = { speaker: message_speaker.value.trim(), text: message_text.value };
    }
  });
  editing_message.value = false;
}

/* ---------- Outputs ---------- */

const all_entries = computed(() => (draft.value === null ? [] : draft_entries(draft.value)));
const message = computed(() => {
  const states = draft.value?.states ?? [];
  return [...states].reverse().find((item) => item.message !== null)?.message ?? null;
});

const write_open = ref(false);
const output_note = ref<string | null>(null);

function written(book: string, snapshot: WrittenEntry[]): void {
  edit((item) => {
    item.written = { ...item.written, [book]: snapshot };
  });
  output_note.value = t("opening.output.book_written", { book });
  emit("refresh-lists");
}

const append_open = ref(false);
const appending = ref(false);
const chat_name = computed(() => (append_open.value ? (props.host?.chat_name() ?? null) : null));

async function append(): Promise<void> {
  const text = message.value;
  if (props.host === null || text === null) {
    return;
  }
  appending.value = true;
  try {
    await props.host.append_character_message(text.speaker, text.text);
    append_open.value = false;
    output_note.value = t("opening.output.message_added");
  } catch (error) {
    action_error.value = t("opening.errors.failed", { reason: reason(error) });
    append_open.value = false;
  } finally {
    appending.value = false;
  }
}

function markdown(): string {
  const item = draft.value;
  return item === null
    ? ""
    : draft_markdown(item, {
        description: t("opening.markdown.description"),
        constant: t("opening.entry.constant"),
        keys: t("opening.entry.keys_label"),
      });
}

async function copy_markdown(): Promise<void> {
  try {
    await navigator.clipboard.writeText(markdown());
    output_note.value = t("opening.output.copied");
  } catch (error) {
    action_error.value = t("opening.errors.failed", { reason: reason(error) });
  }
}

function download_markdown(): void {
  const url = URL.createObjectURL(new Blob([markdown()], { type: "text/markdown" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${draft.value?.display_name ?? "opening"}.md`;
  link.click();
  URL.revokeObjectURL(url);
}

const show_known = ref(false);

watch(selected_id, () => {
  action_error.value = null;
  output_note.value = null;
  editing_message.value = false;
  editing_description.value = false;
});
</script>

<template>
  <div :class="styles.layout">
    <aside :class="styles.aside" :aria-label="t('opening.draft.list_label')">
      <AppButton
        :class="styles.aside_new"
        :icon="Plus"
        :label="t('opening.draft.new')"
        @click="new_draft"
      />
      <div v-if="store.drafts.value.length > 0" :class="styles.aside_title">
        {{ t("opening.draft.list_title") }}
      </div>
      <button
        v-for="item in store.drafts.value"
        :key="item.id"
        type="button"
        class="tc-interactive"
        :class="styles.item"
        :aria-current="item.id === selected_id ? 'true' : undefined"
        @click="selected_id = item.id"
      >
        <span :class="styles.item_name">{{ item.display_name }}</span>
        <span :class="styles.dots">
          <i
            v-for="(status, index) in step_states(item)"
            :key="index"
            :class="styles.dot"
            :data-state="status"
          />
        </span>
        <span :class="styles.item_meta">{{ draft_meta(item) }}</span>
      </button>
    </aside>

    <div :class="styles.columns">
      <div :class="styles.work">
        <div :class="styles.work_inner">
          <div :class="styles.topline">
            <OpeningSectionSwitch v-model="section" />
            <span :class="styles.spacer" />
            <AppButton
              v-if="draft !== null && draft.started"
              :icon="Pencil"
              :label="t('opening.draft.description_label')"
              variant="ghost"
              :disabled="busy !== null || editing_description"
              @click="edit_description"
            />
            <AppButton
              v-if="draft !== null && draft.started"
              :class="styles.known_toggle"
              :icon="BookOpen"
              :label="t('opening.known.toggle')"
              variant="ghost"
              @click="show_known = !show_known"
            />
            <IconButton
              v-if="draft !== null"
              :icon="Trash2"
              :label="t('opening.draft.delete')"
              @click="confirm_delete = true"
            />
          </div>

          <p v-if="hostError !== null" :class="styles.error">
            {{ t("opening.errors.host", { reason: hostError }) }}
          </p>
          <p v-if="saveError !== null" :class="styles.error" role="alert">
            {{ t("opening.errors.save", { reason: saveError }) }}
          </p>
          <p v-if="action_error !== null" :class="styles.error" role="alert">
            {{ action_error }}
          </p>

          <!-- No draft yet. -->
          <div v-if="draft === null" :class="styles.work_head">
            <h1 :class="styles.work_title">{{ t("opening.title") }}</h1>
            <p :class="styles.work_description">{{ t("opening.empty_hint") }}</p>
            <div :class="styles.row">
              <AppButton
                :icon="Plus"
                :label="t('opening.draft.new')"
                variant="primary"
                @click="new_draft"
              />
            </div>
          </div>

          <!-- A draft not started: its description and settings. -->
          <template v-else-if="!draft.started">
            <FieldGroup :label="t('opening.draft.name_label')">
              <template #default="{ fieldId }">
                <input
                  :id="fieldId"
                  :value="draft.display_name"
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
            <FieldGroup
              :label="t('opening.draft.description_label')"
              :hint="t('opening.draft.description_hint')"
            >
              <template #default="{ fieldId, describedBy }">
                <textarea
                  :id="fieldId"
                  :value="draft.description"
                  :class="styles.text_area"
                  :maxlength="DESCRIPTION_MAX_LENGTH"
                  :aria-describedby="describedBy"
                  :placeholder="t('opening.draft.description_placeholder')"
                  @input="
                    edit((item) => {
                      item.description = ($event.target as HTMLTextAreaElement).value;
                    }, true)
                  "
                />
                <div :class="styles.counter">
                  {{ draft.description.length }} / {{ DESCRIPTION_MAX_LENGTH }}
                </div>
              </template>
            </FieldGroup>
            <div :class="styles.grid3">
              <FieldGroup :label="t('opening.settings.template_label')">
                <template #default="{ fieldId }">
                  <AppSelect
                    :id="fieldId"
                    :model-value="chosen_template"
                    :options="template_options"
                    :placeholder="t('opening.settings.template_label')"
                    @update:model-value="choose_template"
                  />
                </template>
              </FieldGroup>
              <FieldGroup :label="t('opening.settings.connection_label')">
                <template #default="{ fieldId }">
                  <AppSelect
                    :id="fieldId"
                    :model-value="connection_value"
                    :options="connection_options"
                    :placeholder="t('opening.settings.connection_label')"
                    @update:model-value="choose_connection"
                  />
                </template>
              </FieldGroup>
              <FieldGroup :label="t('opening.settings.preset_label')">
                <template #default="{ fieldId }">
                  <AppSelect
                    :id="fieldId"
                    :model-value="draft.preset_name"
                    :options="preset_options"
                    :placeholder="t('opening.settings.preset_label')"
                    @update:model-value="choose_preset"
                  />
                </template>
              </FieldGroup>
            </div>
            <FieldGroup
              :label="t('opening.settings.worldbooks_label')"
              :hint="t('opening.settings.worldbooks_hint')"
            >
              <div v-if="lists.books.length > 0" :class="styles.row">
                <button
                  v-for="name in lists.books"
                  :key="name"
                  type="button"
                  class="tc-interactive"
                  :class="styles.chip_toggle"
                  :aria-pressed="draft.worldbooks.includes(name)"
                  @click="toggle_worldbook(name)"
                >
                  <AppIcon :icon="BookOpen" :size="14" />{{ name }}
                </button>
              </div>
              <p v-else :class="styles.hint">{{ t("opening.settings.no_worldbooks") }}</p>
            </FieldGroup>
            <FieldGroup
              :label="t('opening.settings.card_label')"
              :hint="t('opening.settings.card_hint')"
            >
              <div :class="styles.row">
                <AppCheckbox
                  :model-value="draft.card !== null"
                  :label="
                    draft.card !== null
                      ? t('opening.settings.card_use', { name: draft.card.name })
                      : character !== null
                        ? t('opening.settings.card_use', { name: character.name })
                        : t('opening.settings.card_none')
                  "
                  :disabled="draft.card === null && character === null"
                  @update:model-value="toggle_card"
                />
                <AppCheckbox
                  :model-value="draft.use_greeting"
                  :label="t('opening.settings.greeting_use')"
                  :disabled="draft.card === null || draft.card.first_message.trim() === ''"
                  @update:model-value="toggle_greeting"
                />
              </div>
            </FieldGroup>
            <div :class="styles.row">
              <span :class="styles.spacer" />
              <span :class="styles.hint">{{
                t("opening.draft.step_count", { n: draft.steps.length })
              }}</span>
              <AppButton
                :icon="Sparkles"
                :label="t('opening.draft.start')"
                variant="primary"
                :pending="busy !== null"
                :disabled="draft.description.trim() === ''"
                @click="start"
              />
            </div>
          </template>

          <!-- A draft under way. -->
          <template v-else-if="step !== null && state !== null">
            <div v-if="editing_description" :class="styles.editor">
              <FieldGroup
                :label="t('opening.draft.description_label')"
                :hint="t('opening.draft.description_change_hint')"
              >
                <template #default="{ fieldId, describedBy }">
                  <textarea
                    :id="fieldId"
                    v-model="description_text"
                    :class="styles.text_area"
                    :maxlength="DESCRIPTION_MAX_LENGTH"
                    :aria-describedby="describedBy"
                  />
                  <div :class="styles.counter">
                    {{ description_text.length }} / {{ DESCRIPTION_MAX_LENGTH }}
                  </div>
                </template>
              </FieldGroup>
              <div :class="styles.row">
                <span :class="styles.spacer" />
                <AppButton
                  :label="t('common.actions.cancel')"
                  variant="ghost"
                  @click="editing_description = false"
                />
                <AppButton
                  :label="t('common.actions.save')"
                  variant="primary"
                  :disabled="
                    busy !== null ||
                    description_text.trim() === '' ||
                    description_text === draft.description
                  "
                  @click="save_description"
                />
              </div>
            </div>

            <nav :class="styles.steps" :aria-label="t('opening.steps.label')">
              <button
                v-for="(item, index) in draft.steps"
                :key="item.id"
                type="button"
                class="tc-interactive"
                :class="styles.step"
                :data-state="draft.states[index]?.status"
                :aria-current="index === draft.current ? 'step' : undefined"
                :disabled="!can_open(index) || busy !== null"
                @click="open_step(index)"
              >
                <span :class="styles.step_number">
                  <AppIcon v-if="draft.states[index]?.status === 'done'" :icon="Check" :size="13" />
                  <template v-else>{{ index + 1 }}</template>
                </span>
                <span :class="styles.step_label">{{ item.name }}</span>
                <span :class="styles.step_tag">{{
                  step_tag(draft.states[index]?.status ?? "")
                }}</span>
              </button>
            </nav>

            <div v-if="has_stale" :class="styles.banner">
              <span>{{ t("opening.steps.stale_banner") }}</span>
              <AppButton
                :icon="RefreshCw"
                :label="t('opening.steps.regenerate_stale')"
                :pending="busy !== null"
                @click="flow.regenerate_stale(draft)"
              />
            </div>

            <div :class="styles.work_head">
              <h1 :class="styles.work_title">{{ step.name }}</h1>
              <p :class="styles.work_description">{{ step.instruction }}</p>
            </div>

            <div v-for="(item, index) in state.answers" :key="index" :class="styles.answered">
              <span :class="styles.answered_question">{{
                t("opening.ask.answered", { n: index + 1, question: item.question.text })
              }}</span>
              <span :class="styles.answered_answer">{{
                answer_text(item.selected, item.other)
              }}</span>
              <AppButton
                :icon="Pencil"
                :label="t('opening.ask.change')"
                variant="ghost"
                :disabled="busy !== null"
                @click="flow.reask(draft, draft.current, index)"
              />
            </div>

            <div v-if="busy !== null" :class="styles.row">
              <p :class="styles.hint" role="status">
                {{
                  busy.kind === "question"
                    ? t("opening.status.asking")
                    : busy.kind === "generate"
                      ? t("opening.status.generating", { step: draft.steps[busy.step]?.name ?? "" })
                      : t("opening.status.rewriting")
                }}
              </p>
              <AppButton
                :icon="Square"
                :label="t('opening.status.stop')"
                variant="ghost"
                @click="flow.cancel(draft)"
              />
            </div>
            <p
              v-if="busy === null && flow.dropped(draft.id) > 0 && has_result"
              :class="styles.hint"
              role="status"
            >
              {{ t("opening.status.dropped", { n: flow.dropped(draft.id) }) }}
            </p>
            <div v-if="flow_error !== null" :class="styles.banner" role="alert">
              <span>{{ error_text(flow_error) }}</span>
              <AppButton
                v-if="state.status === 'asking' && state.question === null"
                :icon="RefreshCw"
                :label="t('opening.status.retry')"
                @click="flow.run_step(draft, draft.current)"
              />
            </div>

            <!-- The question waiting for an answer. -->
            <div v-if="state.question !== null" :class="styles.ask">
              <div :class="styles.ask_head">
                <h2 :class="styles.ask_title">{{ state.question.text }}</h2>
                <span :class="styles.badge">{{
                  state.question.multiple ? t("opening.ask.multiple") : t("opening.ask.single")
                }}</span>
                <span :class="styles.spacer" />
                <span :class="styles.hint">{{
                  state.answers.length < step.max_rounds
                    ? t("opening.ask.round", { n: state.answers.length + 1, max: step.max_rounds })
                    : t("opening.ask.round_more", { n: state.answers.length + 1 })
                }}</span>
              </div>
              <p v-if="state.question.why !== ''" :class="styles.hint">{{ state.question.why }}</p>
              <div
                :class="styles.options"
                :role="state.question.multiple ? 'group' : 'radiogroup'"
                :aria-label="state.question.text"
              >
                <button
                  v-for="option in state.question.options"
                  :key="option.label"
                  type="button"
                  class="tc-interactive"
                  :class="styles.option"
                  :role="state.question.multiple ? 'checkbox' : 'radio'"
                  :aria-checked="picked.includes(option.label)"
                  :disabled="busy !== null"
                  @click="pick(option.label)"
                >
                  <span
                    :class="styles.option_mark"
                    :data-shape="state.question.multiple ? 'box' : 'radio'"
                  >
                    <AppIcon v-if="picked.includes(option.label)" :icon="Check" :size="13" />
                  </span>
                  <span :class="styles.option_label">{{ option.label }}</span>
                  <span :class="styles.option_detail">{{ option.detail }}</span>
                </button>
              </div>
              <FieldGroup :label="t('opening.ask.other_label')">
                <template #default="{ fieldId }">
                  <input
                    :id="fieldId"
                    v-model="other"
                    :class="styles.input"
                    maxlength="500"
                    :placeholder="t('opening.ask.other_placeholder')"
                  />
                </template>
              </FieldGroup>
              <div v-if="refine_open" :class="styles.ask">
                <FieldGroup
                  :label="t('opening.ask.refine_label')"
                  :hint="t('opening.ask.refine_hint')"
                >
                  <template #default="{ fieldId, describedBy }">
                    <input
                      :id="fieldId"
                      v-model="refine_feedback"
                      :class="styles.input"
                      maxlength="500"
                      :aria-describedby="describedBy"
                      :placeholder="t('opening.ask.refine_placeholder')"
                      @keydown.enter="refine"
                    />
                  </template>
                </FieldGroup>
                <div :class="styles.row">
                  <AppButton
                    :label="t('common.actions.cancel')"
                    variant="ghost"
                    @click="refine_open = false"
                  />
                  <span :class="styles.spacer" />
                  <AppButton
                    :icon="RefreshCw"
                    :label="t('opening.ask.refine_start')"
                    variant="primary"
                    :disabled="busy !== null"
                    @click="refine"
                  />
                </div>
              </div>
              <div :class="styles.row">
                <AppButton
                  :icon="X"
                  :label="t('opening.ask.cancel')"
                  variant="ghost"
                  :disabled="busy !== null"
                  @click="flow.cancel_question(draft)"
                />
                <AppButton
                  :icon="RefreshCw"
                  :label="t('opening.ask.refine')"
                  variant="ghost"
                  :disabled="busy !== null || refine_open"
                  @click="refine_open = true"
                />
                <AppButton
                  :icon="ChevronsRight"
                  :label="t('opening.ask.skip')"
                  variant="ghost"
                  :disabled="busy !== null"
                  @click="flow.skip(draft)"
                />
                <span :class="styles.spacer" />
                <AppButton
                  :icon="ArrowRight"
                  :label="t('opening.ask.confirm')"
                  variant="primary"
                  :pending="busy !== null"
                  :disabled="picked.length === 0 && other.trim() === ''"
                  @click="answer"
                />
              </div>
            </div>

            <!-- A step not yet run, after the user moved to it by hand. -->
            <div v-else-if="state.status === 'pending' && busy === null" :class="styles.row">
              <AppButton
                :icon="Sparkles"
                :label="t('opening.steps.run')"
                variant="primary"
                @click="flow.run_step(draft, draft.current)"
              />
            </div>

            <!-- Entries written by the step. -->
            <template v-if="has_result && step.output === 'entries'">
              <div :class="styles.entries">
                <OpeningEntryCard
                  v-for="entry in state.entries"
                  :key="entry.id"
                  :entry="entry"
                  :editing="entry.id === added_entry"
                  :rewriting="busy?.kind === 'rewrite' && busy.entry_id === entry.id"
                  :disabled="busy !== null"
                  @save="(next) => save_entry(draft!.current, next)"
                  @remove="remove_entry(draft.current, entry.id)"
                  @rewrite="flow.rewrite_entry(draft, draft.current, entry)"
                  @cancel="cancel_added(draft.current, entry.id)"
                />
              </div>
            </template>

            <!-- The opening message. -->
            <template v-if="has_result && step.output === 'message' && state.message !== null">
              <div v-if="editing_message" :class="styles.editor">
                <FieldGroup :label="t('opening.message.speaker_label')">
                  <template #default="{ fieldId }">
                    <input
                      :id="fieldId"
                      v-model="message_speaker"
                      :class="styles.input"
                      maxlength="80"
                    />
                  </template>
                </FieldGroup>
                <FieldGroup :label="t('opening.message.text_label')">
                  <template #default="{ fieldId }">
                    <textarea :id="fieldId" v-model="message_text" :class="styles.text_area" />
                  </template>
                </FieldGroup>
                <div :class="styles.row">
                  <span :class="styles.spacer" />
                  <AppButton
                    :label="t('common.actions.cancel')"
                    variant="ghost"
                    @click="editing_message = false"
                  />
                  <AppButton
                    :label="t('common.actions.save')"
                    variant="primary"
                    :disabled="message_speaker.trim() === '' || message_text.trim() === ''"
                    @click="save_message"
                  />
                </div>
              </div>
              <div v-else :class="styles.bubble">
                <span :class="styles.bubble_name">{{ state.message.speaker }}</span>
                <p :class="styles.bubble_text">{{ state.message.text }}</p>
              </div>
              <div v-if="!editing_message" :class="styles.row">
                <AppButton
                  :icon="Pencil"
                  :label="t('opening.message.edit')"
                  :disabled="busy !== null"
                  @click="edit_message"
                />
              </div>
            </template>

            <!-- What to ask about, before an "Ask more" question. -->
            <div v-if="has_result && more_open" :class="styles.ask">
              <FieldGroup
                :label="t('opening.steps.ask_more_label')"
                :hint="t('opening.steps.ask_more_hint')"
              >
                <template #default="{ fieldId, describedBy }">
                  <input
                    :id="fieldId"
                    ref="more_input"
                    v-model="more_focus"
                    :class="styles.input"
                    maxlength="500"
                    :aria-describedby="describedBy"
                    :placeholder="t('opening.steps.ask_more_placeholder')"
                    @keydown.enter="ask_more"
                  />
                </template>
              </FieldGroup>
              <div :class="styles.row">
                <AppButton
                  :label="t('common.actions.cancel')"
                  variant="ghost"
                  @click="more_open = false"
                />
                <span :class="styles.spacer" />
                <AppButton
                  :icon="ArrowRight"
                  :label="t('opening.steps.ask_more_start')"
                  variant="primary"
                  :disabled="busy !== null"
                  @click="ask_more"
                />
              </div>
            </div>

            <!-- Step actions. -->
            <div v-if="has_result" :class="styles.foot">
              <AppButton
                :icon="ArrowLeft"
                :label="t('opening.steps.ask_more')"
                variant="ghost"
                :pending="busy?.kind === 'question'"
                :disabled="busy !== null || more_open"
                @click="open_more"
              />
              <AppButton
                v-if="step.output === 'entries'"
                :icon="Plus"
                :label="t('opening.entry.add')"
                :disabled="busy !== null"
                @click="add_entry(draft.current)"
              />
              <span :class="styles.spacer" />
              <AppButton
                :icon="RefreshCw"
                :label="t('opening.steps.regenerate')"
                :pending="busy?.kind === 'generate'"
                :disabled="busy !== null"
                @click="flow.generate(draft, draft.current)"
              />
              <AppButton
                v-if="!is_last"
                :icon="ArrowRight"
                :label="t('opening.steps.next')"
                variant="primary"
                :disabled="busy !== null"
                @click="flow.next(draft)"
              />
            </div>

            <!-- Outputs, once the last step has a result. -->
            <template v-if="is_last && has_result">
              <div :class="styles.outputs">
                <div :class="styles.output">
                  <h3 :class="styles.output_title">
                    <AppIcon :icon="BookOpen" />{{ t("opening.output.book_title") }}
                  </h3>
                  <p :class="styles.hint">
                    {{ t("opening.output.book_hint", { n: all_entries.length }) }}
                  </p>
                  <div :class="styles.row">
                    <AppButton
                      :label="t('opening.output.book_action')"
                      variant="primary"
                      :disabled="host === null || all_entries.length === 0 || busy !== null"
                      @click="write_open = true"
                    />
                  </div>
                </div>
                <div :class="styles.output">
                  <h3 :class="styles.output_title">
                    <AppIcon :icon="MessageSquare" />{{ t("opening.output.message_title") }}
                  </h3>
                  <p :class="styles.hint">{{ t("opening.output.message_hint") }}</p>
                  <div :class="styles.row">
                    <AppButton
                      :label="t('opening.output.message_action')"
                      :disabled="host === null || message === null || busy !== null"
                      @click="append_open = true"
                    />
                  </div>
                </div>
                <div :class="styles.output">
                  <h3 :class="styles.output_title">
                    <AppIcon :icon="FileText" />{{ t("opening.output.markdown_title") }}
                  </h3>
                  <p :class="styles.hint">{{ t("opening.output.markdown_hint") }}</p>
                  <div :class="styles.row">
                    <AppButton
                      :icon="Copy"
                      :label="t('opening.output.copy')"
                      @click="copy_markdown"
                    />
                    <AppButton
                      :icon="Download"
                      :label="t('opening.output.download')"
                      variant="ghost"
                      @click="download_markdown"
                    />
                  </div>
                </div>
              </div>
              <p v-if="output_note !== null" :class="styles.hint" role="status">
                {{ output_note }}
              </p>
            </template>
          </template>
        </div>
      </div>

      <!-- What is settled so far, beside the build area. -->
      <aside
        v-if="draft !== null && draft.started"
        :class="styles.known"
        :data-open="show_known ? '' : undefined"
        :aria-label="t('opening.known.label')"
      >
        <div :class="styles.known_block">
          <h3 :class="styles.known_title">{{ t("opening.known.settled") }}</h3>
          <template v-for="(item, index) in draft.steps" :key="item.id">
            <div
              v-if="index !== draft.current && (draft.states[index]?.entries.length ?? 0) > 0"
              :class="styles.known_line"
            >
              <strong>{{ item.name }}</strong
              ><br />{{
                (draft.states[index]?.entries ?? [])
                  .map((entry) => entry.title)
                  .join(t("opening.ask.joiner"))
              }}
            </div>
          </template>
        </div>
        <div v-if="state !== null && state.answers.length > 0" :class="styles.known_block">
          <h3 :class="styles.known_title">{{ t("opening.known.answered") }}</h3>
          <div v-for="(item, index) in state.answers" :key="index" :class="styles.known_line">
            {{ answer_text(item.selected, item.other) }}
          </div>
        </div>
        <div :class="styles.known_block">
          <h3 :class="styles.known_title">{{ t("opening.known.draft") }}</h3>
          <div :class="styles.known_line">
            {{ t("opening.known.connection", { name: connection_label(draft) }) }}<br />{{
              t("opening.known.preset", {
                name:
                  draft.preset_name === "in_use"
                    ? t("opening.settings.preset_in_use")
                    : draft.preset_name,
              })
            }}<br /><template v-if="draft.card !== null"
              >{{
                draft.use_greeting
                  ? t("opening.known.card_greeting", { name: draft.card.name })
                  : t("opening.known.card", { name: draft.card.name })
              }}<br /></template
            >{{
              draft.worldbooks.length === 0
                ? t("opening.known.no_books")
                : t("opening.known.books", {
                    names: draft.worldbooks.join(t("opening.ask.joiner")),
                  })
            }}
          </div>
        </div>
      </aside>
    </div>

    <OpeningWriteDialog
      v-if="host !== null && draft !== null"
      v-model:open="write_open"
      :host="host"
      :entries="all_entries"
      :default-name="draft.display_name"
      :lists="lists"
      :written="draft.written"
      @written="written"
    />
    <ConfirmDialog
      v-model:open="append_open"
      :title="t('opening.output.append_title')"
      :description="
        chat_name === null
          ? t('opening.output.append_no_chat')
          : t('opening.output.append_description', {
              chat: chat_name,
              speaker: message?.speaker ?? '',
            })
      "
      :confirm-label="t('opening.output.append_confirm')"
      :cancel-label="t('common.actions.cancel')"
      :pending="appending"
      :destructive="false"
      @confirm="chat_name === null ? (append_open = false) : append()"
    />
    <ConfirmDialog
      v-model:open="confirm_delete"
      :title="t('opening.draft.delete_title', { name: draft?.display_name ?? '' })"
      :description="t('opening.draft.delete_description')"
      :confirm-label="t('common.actions.delete')"
      :cancel-label="t('common.actions.cancel')"
      :pending="deleting"
      @confirm="delete_draft"
    />
  </div>
</template>
