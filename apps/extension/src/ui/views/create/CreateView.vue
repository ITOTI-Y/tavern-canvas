<script setup lang="ts">
import { DEFAULT_STRIP_SETTINGS, type StripSettings } from "@tavern-canvas/contracts";
import {
  BookOpen,
  LayoutPanelTop,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  Tags,
  Trash2,
} from "lucide-vue-next";
import { computed, inject, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import FieldGroup from "../../components/FieldGroup.vue";
import IconButton from "../../components/IconButton.vue";
import NumberStepper from "../../components/NumberStepper.vue";
import SegmentedControl from "../../components/SegmentedControl.vue";
import StateSurface from "../../components/StateSurface.vue";
import TagInput from "../../components/TagInput.vue";
import { CREATION_KEY, type StripMessageView } from "../../contracts/creation_port.js";
import { ACTIVE_CHAT_ID_KEY } from "../../contracts/portal_keys.js";
import type { StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import type {
  Creation,
  CreationKind,
  CreationScene,
  ImageSize,
} from "../../../modules/creation/creation_record.js";
import ImageSizeField from "../settings/ImageSizeField.vue";
import { page_rows } from "./comic_page.js";
import CreationImage from "./CreationImage.vue";
import PanelFigure from "./PanelFigure.vue";
import SceneCard, { type ScenePatch } from "./SceneCard.vue";
import StripRange from "./StripRange.vue";
import styles from "./create_styles.js";
import { use_creation_store } from "./use_creation_store.js";

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t, locale } = useI18n();
const port = inject(CREATION_KEY, null);

const STORY_MAX_LENGTH = 4000;
const PROMPT_MAX_COUNT = 4;

const strip_settings = computed<StripSettings>(
  () => props.state.settings.settings?.illustration.strip ?? DEFAULT_STRIP_SETTINGS,
);

const action_error = ref<string | null>(null);

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

const store = use_creation_store({
  records: () => props.state.assets.records.creation,
  save: (record) => props.controller.save_asset("creation", record),
  remove: (id) => props.controller.remove_asset("creation", id),
  strip_settings: () => strip_settings.value,
  on_save_error: (error) => {
    action_error.value = t("create.save_failed", { reason: reason(error) });
  },
});

function media_type(image_id: string): string {
  return (
    props.state.gallery.records.find((record) => record.id === image_id)?.media_type ?? "image/png"
  );
}

async function read_image(image_id: string): Promise<Blob> {
  const bytes = await props.controller.read_gallery_bytes(image_id);
  return new Blob([new Uint8Array(bytes)], { type: media_type(image_id) });
}

async function read_thumbnail(image_id: string): Promise<Blob> {
  const bytes = await props.controller.read_gallery_thumbnail(image_id);
  return new Blob([new Uint8Array(bytes)], { type: "image/webp" });
}

/* ---------- Selection ---------- */

const selected_id = ref<string | null>(null);
const selected = computed<Creation | null>(
  () => store.list.value.find((creation) => creation.id === selected_id.value) ?? null,
);
const view_mode = ref<"plan" | "panels">("plan");
const editing_story = ref(false);

function has_pictures(creation: Creation): boolean {
  return creation.scenes.some((scene) => scene.active_image_id !== null);
}

function select(id: string | null): void {
  action_error.value = null;
  editing_story.value = false;
  selected_id.value = id;
  const creation = id === null ? null : store.get(id);
  view_mode.value = creation !== null && has_pictures(creation) ? "panels" : "plan";
  if (creation?.kind === "prompt") {
    const first = creation.scenes[0];
    if (first !== undefined) {
      prompt_positive.value = first.positive_prompt;
      prompt_negative.value = first.negative_prompt;
      prompt_size.value = { ...first.size };
    }
  }
}

const mode = ref<CreationKind>("story");
const current_kind = computed<CreationKind>(() => selected.value?.kind ?? mode.value);

const mode_options = computed(() => [
  { value: "story", label: t("create.mode.story") },
  { value: "prompt", label: t("create.mode.prompt") },
  { value: "strip", label: t("create.mode.strip") },
]);

/* ---------- History ---------- */

const date_format = computed(
  () =>
    new Intl.DateTimeFormat(locale.value, {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
);

function kind_label(kind: CreationKind): string {
  switch (kind) {
    case "story":
      return t("create.mode.story");
    case "prompt":
      return t("create.mode.prompt");
    case "strip":
      return t("create.mode.strip");
  }
}

function kind_icon(kind: CreationKind) {
  switch (kind) {
    case "story":
      return BookOpen;
    case "prompt":
      return Tags;
    case "strip":
      return LayoutPanelTop;
  }
}

function picture_count(creation: Creation): number {
  return creation.scenes.filter((scene) => scene.active_image_id !== null).length;
}

function history_meta(creation: Creation): string {
  const count = picture_count(creation);
  const counted =
    creation.kind === "strip" ? t("create.panel_count", count) : t("create.picture_count", count);
  return `${counted} · ${date_format.value.format(new Date(creation.created_at))}`;
}

function cover_image(creation: Creation): string | null {
  return creation.scenes.find((scene) => scene.active_image_id !== null)?.active_image_id ?? null;
}

/* ---------- Story ---------- */

const story_text = ref("");
const worldbooks = ref<readonly string[]>([]);
const chosen_worldbooks = ref<readonly string[]>([]);
const planning = ref(false);

onMounted(async () => {
  try {
    worldbooks.value = await props.controller.list_worldbooks();
  } catch {
    worldbooks.value = [];
  }
});

function toggle_worldbook(name: string): void {
  chosen_worldbooks.value = chosen_worldbooks.value.includes(name)
    ? chosen_worldbooks.value.filter((candidate) => candidate !== name)
    : [...chosen_worldbooks.value, name];
}

function title_from(text: string): string {
  const line = text.trim().split(/\r?\n/u)[0]?.trim() ?? "";
  return line.length > 24 ? `${line.slice(0, 24)}…` : line;
}

function new_creation(kind: CreationKind, display_name: string): Creation {
  return {
    id: crypto.randomUUID(),
    display_name,
    kind,
    created_at: new Date().toISOString(),
    story: "",
    worldbooks: [],
    chat_id: null,
    from_message: null,
    to_message: null,
    style: strip_settings.value.style,
    scenes: [],
  };
}

async function plan_story(): Promise<void> {
  const story = story_text.value.trim();
  if (port === null || story === "" || planning.value) {
    return;
  }
  planning.value = true;
  action_error.value = null;
  try {
    const scenes = await port.plan_story(story, chosen_worldbooks.value);
    const current = selected.value;
    if (current !== null && current.kind === "story") {
      store.edit(current.id, (creation) => {
        creation.story = story;
        creation.worldbooks = [...chosen_worldbooks.value];
        creation.display_name = title_from(story);
        creation.scenes = [...scenes];
      });
    } else {
      const creation = new_creation("story", title_from(story));
      creation.story = story;
      creation.worldbooks = [...chosen_worldbooks.value];
      creation.scenes = [...scenes];
      await store.add(creation);
      selected_id.value = creation.id;
    }
    editing_story.value = false;
    story_text.value = "";
    chosen_worldbooks.value = [];
    view_mode.value = "plan";
  } catch (error) {
    action_error.value = t("create.plan_failed", { reason: reason(error) });
  } finally {
    planning.value = false;
  }
}

function edit_story(): void {
  const current = selected.value;
  if (current === null) {
    return;
  }
  story_text.value = current.story;
  chosen_worldbooks.value = current.worldbooks.filter((name) => worldbooks.value.includes(name));
  editing_story.value = true;
}

async function replan(): Promise<void> {
  const current = selected.value;
  if (current === null) {
    return;
  }
  if (current.kind === "story") {
    story_text.value = current.story;
    chosen_worldbooks.value = [...current.worldbooks];
    await plan_story();
  } else if (current.kind === "strip") {
    await plan_strip();
  }
}

const show_story_input = computed(
  () => current_kind.value === "story" && (selected.value === null || editing_story.value),
);

/* ---------- Strip ---------- */

const strip_chat_id = ref<string | null>(null);
const strip_messages = ref<readonly StripMessageView[]>([]);
const strip_error = ref<string | null>(null);
const strip_loading = ref(false);
const strip_from = ref(0);
const strip_to = ref(0);
const strip_style = ref<"strip" | "default">(strip_settings.value.style);
const strip_max = ref(strip_settings.value.max_panels);

const style_options = computed(() => [
  { value: "strip", label: t("create.style.strip") },
  { value: "default", label: t("create.style.default") },
]);

async function load_strip_messages(): Promise<void> {
  if (port === null) {
    return;
  }
  strip_loading.value = true;
  strip_error.value = null;
  try {
    const { chat_id, messages } = await port.strip_messages();
    strip_chat_id.value = chat_id;
    strip_messages.value = messages;
    const reply = messages.findLast((message) => !message.is_user) ?? messages.at(-1);
    strip_from.value = reply?.message_id ?? 0;
    strip_to.value = reply?.message_id ?? 0;
  } catch {
    strip_error.value = t("create.strip_no_chat");
    strip_messages.value = [];
  } finally {
    strip_loading.value = false;
  }
}

const active_chat_id = inject(ACTIVE_CHAT_ID_KEY, ref(null));

/** Reloaded whenever the range picker opens or the open chat changes under it. */
watch(
  () => [selected.value === null && mode.value === "strip", active_chat_id.value] as const,
  ([needed]) => {
    if (needed) {
      strip_style.value = strip_settings.value.style;
      strip_max.value = strip_settings.value.max_panels;
      void load_strip_messages();
    }
  },
);

async function plan_strip(): Promise<void> {
  if (port === null || planning.value) {
    return;
  }
  const current = selected.value;
  const from = current?.from_message ?? strip_from.value;
  const to = current?.to_message ?? strip_to.value;
  planning.value = true;
  action_error.value = null;
  try {
    if (current !== null) {
      const { chat_id } = await port.strip_messages();
      if (chat_id !== current.chat_id) {
        throw new Error(t("create.strip_other_chat"));
      }
    }
    const max = current === null ? strip_max.value : strip_settings.value.max_panels;
    const scenes = await port.plan_strip(from, to, max);
    if (current !== null) {
      store.edit(current.id, (creation) => {
        creation.scenes = [...scenes];
      });
    } else {
      const creation = new_creation(
        "strip",
        t("create.strip_title", { from: String(from), to: String(to) }),
      );
      creation.chat_id = strip_chat_id.value;
      creation.from_message = from;
      creation.to_message = to;
      creation.style = strip_style.value;
      creation.scenes = [...scenes];
      await store.add(creation);
      selected_id.value = creation.id;
    }
    view_mode.value = "plan";
  } catch (error) {
    action_error.value = t("create.plan_failed", { reason: reason(error) });
  } finally {
    planning.value = false;
  }
}

/* ---------- Prompt ---------- */

const prompt_positive = ref("");
const prompt_negative = ref("");
const prompt_size = ref<ImageSize>({ width: 832, height: 1216 });
const prompt_count = ref(1);

async function generate_prompt(): Promise<void> {
  if (port === null || prompt_positive.value.trim() === "") {
    return;
  }
  action_error.value = null;
  const scenes: CreationScene[] = Array.from({ length: prompt_count.value }, () => ({
    id: crypto.randomUUID(),
    enabled: true,
    scene: "",
    excerpt: "",
    characters: [],
    size: { ...prompt_size.value },
    positive_prompt: prompt_positive.value,
    negative_prompt: prompt_negative.value,
    character_prompts: [],
    image_ids: [],
    active_image_id: null,
    last_error: null,
  }));
  const current = selected.value;
  let id: string;
  if (current !== null && current.kind === "prompt") {
    id = current.id;
    store.edit(id, (creation) => {
      creation.scenes.push(...scenes);
    });
  } else {
    const creation = new_creation("prompt", title_from(prompt_positive.value));
    creation.scenes = scenes;
    await store.add(creation);
    selected_id.value = creation.id;
    id = creation.id;
  }
  await store.generate(
    port,
    id,
    scenes.map((scene) => scene.id),
  );
}

/* ---------- Scenes and panels ---------- */

const enabled_count = computed(
  () => selected.value?.scenes.filter((scene) => scene.enabled).length ?? 0,
);
const to_draw = computed(
  () =>
    selected.value?.scenes.filter(
      (scene) => scene.enabled && scene.active_image_id === null && !store.pending.has(scene.id),
    ) ?? [],
);
const shown_panels = computed(
  () =>
    selected.value?.scenes.filter(
      (scene) => scene.enabled || scene.active_image_id !== null || store.pending.has(scene.id),
    ) ?? [],
);

const show_source = ref(false);
const panel_rows = computed(() => page_rows(shown_panels.value));

function change_scene(scene_id: string, patch: ScenePatch, debounce: boolean): void {
  const current = selected.value;
  if (current === null) {
    return;
  }
  store.edit(
    current.id,
    (creation) => {
      const scene = creation.scenes.find((candidate) => candidate.id === scene_id);
      if (scene !== undefined) {
        Object.assign(scene, patch);
      }
    },
    { debounce },
  );
}

function remove_scene(scene_id: string): void {
  const current = selected.value;
  if (current !== null) {
    store.edit(current.id, (creation) => {
      creation.scenes = creation.scenes.filter((scene) => scene.id !== scene_id);
    });
  }
}

function generate_planned(): void {
  const current = selected.value;
  if (port === null || current === null) {
    return;
  }
  const ids = to_draw.value.map((scene) => scene.id);
  view_mode.value = "panels";
  void store.generate(port, current.id, ids);
}

function regenerate(scene_id: string): void {
  const current = selected.value;
  if (port !== null && current !== null) {
    void store.generate(port, current.id, [scene_id]);
  }
}

const work_title = computed(() => selected.value?.display_name ?? t("create.title"));
const work_description = computed(() => {
  const current = selected.value;
  if (current === null) {
    switch (mode.value) {
      case "story":
        return t("create.description.story");
      case "prompt":
        return t("create.description.prompt");
      case "strip":
        return t("create.description.strip");
    }
  }
  const count = current.scenes.length;
  switch (current.kind) {
    case "story":
      return t("create.summary.story", { n: count });
    case "prompt":
      return t("create.description.prompt");
    case "strip":
      return t("create.summary.strip", {
        from: String(current.from_message ?? ""),
        to: String(current.to_message ?? ""),
        n: count,
        style: current.style === "strip" ? t("create.style.strip") : t("create.style.default"),
      });
  }
});

/* ---------- Deletion ---------- */

const confirm_delete = ref(false);
const deleting = ref(false);

async function delete_selected(): Promise<void> {
  const current = selected.value;
  if (current === null) {
    return;
  }
  deleting.value = true;
  try {
    await store.remove(current.id);
    confirm_delete.value = false;
    select(null);
  } catch (error) {
    action_error.value = t("create.save_failed", { reason: reason(error) });
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <StateSurface
    v-if="port === null"
    status="empty"
    :empty-title="t('create.unavailable_title')"
    :empty-message="t('create.unavailable_message')"
  />
  <div v-else :class="styles.layout">
    <aside :class="styles.history" :aria-label="t('create.history_label')">
      <AppButton
        :class="styles.history_new"
        :icon="Plus"
        :label="t('create.new')"
        @click="select(null)"
      />
      <div v-if="store.list.value.length > 0" :class="styles.history_title">
        {{ t("create.history_recent") }}
      </div>
      <button
        v-for="creation in store.list.value"
        :key="creation.id"
        type="button"
        class="tc-interactive"
        :class="styles.history_item"
        :aria-current="creation.id === selected_id ? 'true' : undefined"
        @click="select(creation.id)"
      >
        <span :class="styles.history_thumb">
          <CreationImage
            v-if="cover_image(creation) !== null"
            :image-id="cover_image(creation) ?? ''"
            alt=""
            :read-image="read_thumbnail"
          />
          <AppIcon v-else :icon="kind_icon(creation.kind)" />
        </span>
        <span :class="styles.history_body">
          <span :class="styles.history_name">{{ creation.display_name }}</span>
          <span :class="styles.history_meta">
            <span :class="styles.kind">{{ kind_label(creation.kind) }}</span>
            {{ history_meta(creation) }}
          </span>
        </span>
      </button>
    </aside>

    <div :class="styles.work">
      <div :class="styles.work_inner">
        <div :class="styles.row">
          <div :class="[styles.work_head, styles.spacer]">
            <h1 :class="styles.work_title">{{ work_title }}</h1>
            <p :class="styles.work_description">{{ work_description }}</p>
          </div>
          <IconButton
            v-if="selected !== null"
            :icon="Trash2"
            :label="t('create.delete')"
            @click="confirm_delete = true"
          />
        </div>

        <SegmentedControl
          v-if="selected === null"
          v-model="mode"
          :class="[styles.compact, styles.mode_switch]"
          :options="mode_options"
          :label="t('create.mode_label')"
        />

        <p v-if="action_error !== null" :class="styles.error" role="alert">{{ action_error }}</p>

        <!-- Story input, for a new story or a story being rewritten. -->
        <template v-if="show_story_input">
          <FieldGroup :label="t('create.story_label')">
            <template #default="{ fieldId }">
              <textarea
                :id="fieldId"
                v-model="story_text"
                :class="styles.text_area"
                :maxlength="STORY_MAX_LENGTH"
                :placeholder="t('create.story_placeholder')"
              />
              <div :class="styles.counter">{{ story_text.length }} / {{ STORY_MAX_LENGTH }}</div>
            </template>
          </FieldGroup>
          <FieldGroup
            v-if="worldbooks.length > 0"
            :label="t('create.worldbooks_label')"
            :hint="t('create.worldbooks_hint')"
          >
            <div :class="styles.row">
              <button
                v-for="name in worldbooks"
                :key="name"
                type="button"
                class="tc-interactive"
                :class="styles.chip_toggle"
                :aria-pressed="chosen_worldbooks.includes(name)"
                @click="toggle_worldbook(name)"
              >
                <AppIcon :icon="BookOpen" :size="14" />{{ name }}
              </button>
            </div>
          </FieldGroup>
          <div :class="styles.row">
            <AppButton
              :icon="Sparkles"
              :label="t('create.plan_story')"
              variant="primary"
              :pending="planning"
              :disabled="story_text.trim() === ''"
              @click="plan_story"
            />
            <AppButton
              v-if="editing_story"
              :label="t('common.actions.cancel')"
              variant="ghost"
              @click="editing_story = false"
            />
            <span :class="styles.hint">{{ t("create.plan_story_hint", { n: 6 }) }}</span>
          </div>
        </template>

        <!-- A planned story, folded to a summary. -->
        <div
          v-else-if="selected !== null && selected.kind === 'story'"
          :class="styles.story_summary"
        >
          <span :class="styles.story_summary_label">{{
            selected.worldbooks.length > 0
              ? t("create.story_summary_books", {
                  n: selected.story.length,
                  books: selected.worldbooks.join("、"),
                })
              : t("create.story_summary", { n: selected.story.length })
          }}</span>
          <span :class="styles.story_summary_text">{{ selected.story }}</span>
          <span :class="styles.story_summary_action">
            <AppButton
              :icon="Pencil"
              :label="t('create.edit_story')"
              variant="ghost"
              @click="edit_story"
            />
          </span>
        </div>

        <!-- Prompt form, new or adding to a prompt creation. -->
        <template v-if="current_kind === 'prompt'">
          <FieldGroup :label="t('create.positive_label')" :hint="t('create.positive_hint')">
            <template #default="{ fieldId, describedBy }">
              <TagInput :id="fieldId" v-model="prompt_positive" :described-by="describedBy" />
            </template>
          </FieldGroup>
          <FieldGroup :label="t('create.negative_label')">
            <template #default="{ fieldId }">
              <TagInput :id="fieldId" v-model="prompt_negative" />
            </template>
          </FieldGroup>
          <ImageSizeField v-model="prompt_size" />
          <div :class="styles.grid2">
            <FieldGroup :label="t('create.count_label')">
              <template #default="{ fieldId }">
                <NumberStepper
                  :id="fieldId"
                  :model-value="prompt_count"
                  :label="t('create.count_label')"
                  :min="1"
                  :max="PROMPT_MAX_COUNT"
                  :increment-label="t('common.actions.increase')"
                  :decrement-label="t('common.actions.decrease')"
                  @update:model-value="prompt_count = $event ?? 1"
                />
              </template>
            </FieldGroup>
          </div>
          <div :class="styles.row">
            <AppButton
              :icon="Sparkles"
              :label="t('create.generate_count', { n: prompt_count })"
              variant="primary"
              :disabled="prompt_positive.trim() === ''"
              @click="generate_prompt"
            />
            <span :class="styles.hint">{{ t("create.generate_hint") }}</span>
          </div>
          <div v-if="selected !== null && selected.scenes.length > 0" :class="styles.results">
            <PanelFigure
              v-for="(scene, index) in selected.scenes"
              :key="scene.id"
              :scene="scene"
              :index="index"
              :pending="store.pending.has(scene.id)"
              :numbered="false"
              layout="list"
              :source="null"
              :read-image="read_image"
              @regenerate="regenerate(scene.id)"
              @update:prompt="change_scene(scene.id, { positive_prompt: $event }, true)"
            />
          </div>
        </template>

        <!-- Strip range, before planning. -->
        <template v-if="selected === null && mode === 'strip'">
          <StateSurface
            v-if="strip_loading || strip_error !== null"
            :status="strip_loading ? 'loading' : 'error'"
            min-height="160px"
            :error-message="strip_error ?? ''"
          />
          <template v-else>
            <StripRange
              :messages="strip_messages"
              :from="strip_from"
              :to="strip_to"
              @change="(from, to) => ((strip_from = from), (strip_to = to))"
            />
            <div :class="styles.grid2">
              <FieldGroup :label="t('create.style_label')">
                <SegmentedControl
                  v-model="strip_style"
                  :class="styles.compact"
                  :options="style_options"
                  :label="t('create.style_label')"
                />
              </FieldGroup>
              <FieldGroup :label="t('create.max_panels_label')">
                <template #default="{ fieldId }">
                  <NumberStepper
                    :id="fieldId"
                    :model-value="strip_max"
                    :label="t('create.max_panels_label')"
                    :min="1"
                    :max="12"
                    :increment-label="t('common.actions.increase')"
                    :decrement-label="t('common.actions.decrease')"
                    @update:model-value="strip_max = $event ?? strip_settings.max_panels"
                  />
                </template>
              </FieldGroup>
            </div>
            <div :class="styles.row">
              <AppButton
                :icon="LayoutPanelTop"
                :label="t('create.plan_strip')"
                variant="primary"
                :pending="planning"
                :disabled="strip_messages.length === 0"
                @click="plan_strip"
              />
              <span :class="styles.hint">{{ t("create.plan_strip_hint") }}</span>
            </div>
          </template>
        </template>

        <!-- Scene confirmation. -->
        <section
          v-if="
            selected !== null &&
            selected.kind !== 'prompt' &&
            view_mode === 'plan' &&
            !editing_story
          "
          :class="styles.plan"
        >
          <div :class="styles.plan_head">
            <h2 :class="styles.section_title">
              {{ selected.kind === "strip" ? t("create.panels_title") : t("create.scenes_title") }}
            </h2>
            <span :class="styles.hint">{{
              t("create.scenes_selected", { n: enabled_count, total: selected.scenes.length })
            }}</span>
          </div>
          <p v-if="selected.scenes.length === 0" :class="styles.hint">
            {{ t("create.scenes_empty") }}
          </p>
          <SceneCard
            v-for="(scene, index) in selected.scenes"
            :key="scene.id"
            :scene="scene"
            :index="index"
            @change="(patch, debounce) => change_scene(scene.id, patch, debounce)"
            @remove="remove_scene(scene.id)"
          />
          <div :class="styles.plan_foot">
            <AppButton
              :icon="RefreshCw"
              :label="t('create.replan')"
              variant="ghost"
              :pending="planning"
              @click="replan"
            />
            <span :class="styles.spacer" />
            <AppButton
              v-if="has_pictures(selected)"
              :label="t('create.show_panels')"
              variant="secondary"
              @click="view_mode = 'panels'"
            />
            <AppButton
              :label="t('create.generate_count', { n: to_draw.length })"
              variant="primary"
              :disabled="to_draw.length === 0"
              @click="generate_planned"
            />
          </div>
        </section>

        <!-- Finished pictures. -->
        <div
          v-if="selected !== null && selected.kind !== 'prompt' && view_mode === 'panels'"
          :class="styles.strip"
        >
          <div :class="styles.strip_toolbar">
            <span :class="styles.kind">{{ kind_label(selected.kind) }}</span>
            <span :class="styles.hint">{{ t("create.panels_saved") }}</span>
            <span :class="styles.spacer" />
            <button
              type="button"
              class="tc-interactive"
              :class="styles.chip_toggle"
              :aria-pressed="show_source"
              @click="show_source = !show_source"
            >
              {{ t("create.show_source") }}
            </button>
            <AppButton
              :icon="Pencil"
              :label="t('create.edit_scenes')"
              variant="ghost"
              @click="view_mode = 'plan'"
            />
          </div>
          <div :class="styles.page">
            <div
              v-for="row in panel_rows"
              :key="row.cells[0]?.item.id"
              :class="styles.page_row"
              :data-narrow="String(row.narrow)"
            >
              <PanelFigure
                v-for="cell in row.cells"
                :key="cell.item.id"
                :style="{ flex: `${String(cell.ratio)} 1 0` }"
                :scene="cell.item"
                :index="cell.index"
                :pending="store.pending.has(cell.item.id)"
                :numbered="true"
                layout="page"
                :source="show_source && cell.item.excerpt !== '' ? cell.item.excerpt : null"
                :read-image="read_image"
                @regenerate="regenerate(cell.item.id)"
                @update:prompt="change_scene(cell.item.id, { positive_prompt: $event }, true)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDialog
    :open="confirm_delete"
    :title="t('create.delete_title')"
    :description="t('create.delete_description')"
    :confirm-label="t('common.actions.delete')"
    :cancel-label="t('common.actions.cancel')"
    :pending="deleting"
    @update:open="confirm_delete = $event"
    @confirm="delete_selected"
  />
</template>
