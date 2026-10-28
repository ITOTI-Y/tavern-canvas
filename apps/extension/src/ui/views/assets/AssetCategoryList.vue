<script setup lang="ts">
import { ImagePlus, Plus, Search, Shuffle, Trash2 } from "lucide-vue-next";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { Uuid } from "@tavern-canvas/contracts";
import AppButton from "../../components/AppButton.vue";
import AppCheckbox from "../../components/AppCheckbox.vue";
import AppIcon from "../../components/AppIcon.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import { use_marquee_selection } from "../../components/use_marquee_selection.js";
import { summarize_payload, type AssetSummaryFieldSpec } from "./asset_field_schema.js";
import styles from "./assets_styles.js";

/** What a record's card shows besides its name. */
export interface AssetCardView {
  /** An image URL, or `null` for the empty placeholder when the category shows thumbnails. */
  readonly thumbnail?: string | null;
  readonly subtitle?: string;
  readonly detail?: string;
  readonly tags?: readonly string[];
}

const MAX_CARD_TAGS = 3;

const props = withDefaults(
  defineProps<{
    readonly records: readonly AssetRecordSummary[];
    readonly summaryFields: readonly AssetSummaryFieldSpec[];
    readonly describe?: ((record: AssetRecordSummary) => AssetCardView) | undefined;
    /** The record open in the editor, outlined in the list. */
    readonly activeId?: Uuid | null;
    readonly loading: boolean;
    readonly searchLabel: string;
    readonly searchPlaceholder: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly addLabel: string;
    readonly randomLabel: string;
    readonly reorderHint: string;
    readonly editLabel: string;
    readonly deleteConfirmDescription: string;
    readonly confirmLabel: string;
    readonly cancelLabel: string;
  }>(),
  { describe: undefined, activeId: null },
);

const emit = defineEmits<{
  add: [];
  edit: [record: AssetRecordSummary];
  reorder: [ordered_ids: readonly Uuid[]];
  "random-select": [record: AssetRecordSummary];
  "delete-many": [record_ids: readonly Uuid[]];
}>();

const { t } = useI18n();

const search_query = ref("");
const dragged_id = ref<Uuid | null>(null);

function card_for(record: AssetRecordSummary): AssetCardView {
  if (props.describe !== undefined) {
    return props.describe(record);
  }
  const parts = summarize_payload(record.payload, props.summaryFields);
  return { detail: parts.map((part) => part.value).join(" · ") };
}

const cards = computed(() =>
  props.records.map((record) => {
    const view = card_for(record);
    return { record, view, tags: (view.tags ?? []).slice(0, MAX_CARD_TAGS) };
  }),
);

/** Matches the name, the detail line (aliases, owner) and the tags. */
const filtered_cards = computed(() => {
  const query = search_query.value.trim().toLowerCase();
  if (query === "") {
    return cards.value;
  }
  return cards.value.filter(({ record, view }) =>
    [record.display_name, view.detail ?? "", ...(view.tags ?? [])].some((text) =>
      text.toLowerCase().includes(query),
    ),
  );
});

const selected = reactive(new Set<Uuid>());
const bulk_delete_pending = ref(false);
/** Selected entries that still exist, so a deletion elsewhere drops them from the count. */
const selected_ids = computed(() =>
  props.records.filter((record) => selected.has(record.id)).map((record) => record.id),
);
const select_all_state = computed<boolean | "indeterminate">(() => {
  const shown = filtered_cards.value;
  const count = shown.filter(({ record }) => selected.has(record.id)).length;
  if (count === 0) {
    return false;
  }
  return count === shown.length ? true : "indeterminate";
});

function set_selected(record_id: Uuid, value: boolean): void {
  if (value) {
    selected.add(record_id);
  } else {
    selected.delete(record_id);
  }
}

/** Selects every entry the search shows, or deselects them when all are already selected. */
function toggle_select_all(): void {
  const select = select_all_state.value !== true;
  for (const { record } of filtered_cards.value) {
    set_selected(record.id, select);
  }
}

const root = ref<HTMLElement | null>(null);
/** A box drawn from empty space selects the cards it touches; cards themselves drag to reorder. */
const marquee = use_marquee_selection(root, {
  start_on_items: false,
  on_select: (ids, mode) => {
    if (mode === "replace") {
      selected.clear();
    }
    for (const id of ids) {
      selected.add(id);
    }
  },
});

function confirm_bulk_delete(): void {
  emit("delete-many", selected_ids.value);
  selected.clear();
  bulk_delete_pending.value = false;
}

const status = computed(() => {
  if (props.loading) {
    return "loading" as const;
  }
  return props.records.length === 0 ? ("empty" as const) : ("ready" as const);
});

function emit_order(source_index: number, target_index: number): void {
  const ordered = [...props.records];
  const [moved] = ordered.splice(source_index, 1);
  if (moved === undefined) {
    return;
  }
  ordered.splice(target_index, 0, moved);
  emit(
    "reorder",
    ordered.map((record) => record.id),
  );
}

/** Alt+Arrow moves the focused card, the keyboard counterpart of dragging it. */
function move(record_id: Uuid, direction: -1 | 1): void {
  const index = props.records.findIndex((record) => record.id === record_id);
  const target_index = index + direction;
  if (index === -1 || target_index < 0 || target_index >= props.records.length) {
    return;
  }
  emit_order(index, target_index);
}

function pick_random(): void {
  if (props.records.length === 0) {
    return;
  }
  const record = props.records[Math.floor(Math.random() * props.records.length)];
  if (record) {
    emit("random-select", record);
  }
}

function handle_drag_start(record_id: Uuid, event: DragEvent): void {
  dragged_id.value = record_id;
  event.dataTransfer?.setData("text/plain", record_id);
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
  }
}

function handle_drop(target_id: Uuid, event: DragEvent): void {
  event.preventDefault();
  const source_id = dragged_id.value;
  dragged_id.value = null;
  if (!source_id || source_id === target_id) {
    return;
  }
  const source_index = props.records.findIndex((record) => record.id === source_id);
  const target_index = props.records.findIndex((record) => record.id === target_id);
  if (source_index !== -1 && target_index !== -1) {
    emit_order(source_index, target_index);
  }
}
</script>

<template>
  <div
    ref="root"
    :class="styles.categoryList"
    :data-marquee="marquee.box.value === null ? null : ''"
    @pointerdown="marquee.on_pointerdown"
  >
    <div
      v-if="marquee.box.value !== null"
      :class="styles.marquee"
      aria-hidden="true"
      :style="{
        left: `${String(marquee.box.value.left)}px`,
        top: `${String(marquee.box.value.top)}px`,
        width: `${String(marquee.box.value.width)}px`,
        height: `${String(marquee.box.value.height)}px`,
      }"
    />
    <div :class="styles.categoryToolbar">
      <div :class="styles.searchField">
        <AppIcon :icon="Search" :size="16" />
        <input
          v-model="search_query"
          type="search"
          :class="styles.searchInput"
          :placeholder="searchPlaceholder"
          :aria-label="searchLabel"
        />
      </div>
      <AppButton
        :label="randomLabel"
        :icon="Shuffle"
        variant="secondary"
        :class="styles.randomWide"
        @click="pick_random"
      />
      <span :class="styles.randomNarrow">
        <IconButton :icon="Shuffle" :label="randomLabel" @click="pick_random" />
      </span>
      <AppButton :label="addLabel" :icon="Plus" variant="primary" @click="emit('add')" />
    </div>

    <div v-if="records.length > 0" :class="styles.selectionBar">
      <AppCheckbox
        :model-value="select_all_state"
        :label="t('common.actions.select_all')"
        :disabled="filtered_cards.length === 0"
        data-testid="asset-select-all"
        @update:model-value="toggle_select_all"
      />
      <template v-if="selected_ids.length > 0">
        <span :class="styles.selectionCount" class="tc-tabular-nums">
          {{ t("assets.selected_count", { n: selected_ids.length }) }}
        </span>
        <AppButton
          :label="t('assets.delete_selected_action')"
          :icon="Trash2"
          variant="destructive"
          data-testid="asset-delete-selected"
          @click="bulk_delete_pending = true"
        />
      </template>
      <span v-if="records.length > 1" :class="styles.reorderHint">{{ reorderHint }}</span>
    </div>

    <StateSurface :status="status" :empty-title="emptyTitle" min-height="120px">
      <template #action>
        <p :class="styles.emptyDescription">{{ emptyDescription }}</p>
        <AppButton :label="addLabel" :icon="Plus" variant="primary" @click="emit('add')" />
      </template>
      <ul :class="styles.cardGrid">
        <li
          v-for="{ record, view, tags } in filtered_cards"
          :key="record.id"
          :class="styles.assetCard"
          draggable="true"
          :data-select-id="record.id"
          :data-selected="selected.has(record.id) ? 'true' : undefined"
          :data-active="record.id === activeId ? 'true' : undefined"
          :data-dragging="dragged_id === record.id ? '' : null"
          data-testid="asset-card"
          @dragstart="handle_drag_start(record.id, $event)"
          @dragover.prevent
          @drop="handle_drop(record.id, $event)"
        >
          <span
            v-if="view.thumbnail !== undefined"
            :class="styles.assetCardThumb"
            :data-empty="view.thumbnail === null ? '' : undefined"
          >
            <img v-if="view.thumbnail !== null" :src="view.thumbnail" alt="" />
            <AppIcon v-else :icon="ImagePlus" :size="16" />
          </span>
          <button
            type="button"
            :class="styles.assetCardMain"
            :aria-label="`${editLabel}: ${record.display_name}`"
            :aria-keyshortcuts="records.length > 1 ? 'Alt+ArrowUp Alt+ArrowDown' : undefined"
            @click="emit('edit', record)"
            @keydown.alt.up.prevent="move(record.id, -1)"
            @keydown.alt.down.prevent="move(record.id, 1)"
          >
            <span :class="styles.assetCardName">
              <span :class="styles.assetCardNameText">{{ record.display_name }}</span>
              <span v-if="view.subtitle" :class="styles.assetCardSubtitle">{{
                view.subtitle
              }}</span>
            </span>
            <span v-if="view.detail" :class="styles.assetCardDetail">{{ view.detail }}</span>
            <span v-if="tags.length > 0" :class="styles.assetCardTags">
              <span v-for="tag in tags" :key="tag" :class="styles.cardTag">{{ tag }}</span>
            </span>
          </button>
          <span :class="styles.assetCardCheck">
            <AppCheckbox
              :model-value="selected.has(record.id)"
              :label="t('assets.select_entry_action', { name: record.display_name })"
              label-hidden
              data-testid="asset-select"
              @update:model-value="(value) => set_selected(record.id, value)"
            />
          </span>
        </li>
      </ul>
    </StateSurface>

    <ConfirmDialog
      :open="bulk_delete_pending"
      :title="t('assets.delete_selected_confirm_title', { n: selected_ids.length })"
      :description="deleteConfirmDescription"
      :confirm-label="confirmLabel"
      :cancel-label="cancelLabel"
      @update:open="
        (open) => {
          if (!open) bulk_delete_pending = false;
        }
      "
      @confirm="confirm_bulk_delete"
    />
  </div>
</template>
