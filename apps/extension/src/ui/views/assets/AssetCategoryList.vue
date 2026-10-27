<script setup lang="ts">
import { ChevronDown, ChevronUp, GripVertical, Plus, Shuffle, Trash2 } from "lucide-vue-next";
import { computed, ref } from "vue";

import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import type { Uuid } from "@tavern-canvas/contracts";
import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import { summarize_payload, type AssetSummaryFieldSpec } from "./asset_field_schema.js";
import styles from "./assets_styles.js";

const props = defineProps<{
  readonly records: readonly AssetRecordSummary[];
  readonly summaryFields: readonly AssetSummaryFieldSpec[];
  readonly loading: boolean;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly emptyTitle: string;
  readonly emptyDescription: string;
  readonly addLabel: string;
  readonly randomLabel: string;
  readonly reorderHint: string;
  readonly editLabel: string;
  readonly deleteLabel: string;
  readonly deleteConfirmTitle: (name: string) => string;
  readonly deleteConfirmDescription: string;
  readonly confirmLabel: string;
  readonly cancelLabel: string;
  readonly moveUpLabel: string;
  readonly moveDownLabel: string;
  readonly dragHandleLabel: string;
}>();

const emit = defineEmits<{
  add: [];
  edit: [record: AssetRecordSummary];
  delete: [record_id: Uuid];
  reorder: [ordered_ids: readonly Uuid[]];
  "random-select": [record: AssetRecordSummary];
}>();

const search_query = ref("");
const pending_delete = ref<AssetRecordSummary | null>(null);
const dragged_id = ref<Uuid | null>(null);

const filtered_records = computed(() => {
  const query = search_query.value.trim().toLowerCase();
  if (query === "") {
    return props.records;
  }
  return props.records.filter((record) => record.display_name.toLowerCase().includes(query));
});

const status = computed(() => {
  if (props.loading) {
    return "loading" as const;
  }
  return props.records.length === 0 ? ("empty" as const) : ("ready" as const);
});

function summary_for(record: AssetRecordSummary) {
  return summarize_payload(record.payload, props.summaryFields);
}

function request_delete(record: AssetRecordSummary): void {
  pending_delete.value = record;
}

function confirm_delete(): void {
  if (pending_delete.value) {
    emit("delete", pending_delete.value.id);
  }
  pending_delete.value = null;
}

function move(record_id: Uuid, direction: -1 | 1): void {
  const index = props.records.findIndex((record) => record.id === record_id);
  const target_index = index + direction;
  if (index === -1 || target_index < 0 || target_index >= props.records.length) {
    return;
  }
  const ordered = [...props.records];
  const [moved] = ordered.splice(index, 1);
  if (moved === undefined) {
    return;
  }
  ordered.splice(target_index, 0, moved);
  emit(
    "reorder",
    ordered.map((record) => record.id),
  );
}

function pick_random(): void {
  if (props.records.length === 0) {
    return;
  }
  const index = Math.floor(Math.random() * props.records.length);
  const record = props.records[index];
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

function handle_drag_over(event: DragEvent): void {
  event.preventDefault();
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
  if (source_index === -1 || target_index === -1) {
    return;
  }
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
</script>

<template>
  <div :class="styles.categoryList">
    <div :class="styles.categoryToolbar">
      <label class="tc-visually-hidden" :for="`${searchLabel}-search`">{{ searchLabel }}</label>
      <input
        :id="`${searchLabel}-search`"
        v-model="search_query"
        type="text"
        :class="styles.searchInput"
        :placeholder="searchPlaceholder"
        :aria-label="searchLabel"
      />
      <AppButton :label="randomLabel" :icon="Shuffle" variant="secondary" @click="pick_random" />
      <AppButton :label="addLabel" :icon="Plus" variant="primary" @click="emit('add')" />
    </div>

    <p v-if="records.length > 1" :class="styles.reorderHint">{{ reorderHint }}</p>

    <StateSurface :status="status" :empty-title="emptyTitle" min-height="120px">
      <template #action>
        <p :class="styles.emptyDescription">{{ emptyDescription }}</p>
        <AppButton :label="addLabel" :icon="Plus" variant="primary" @click="emit('add')" />
      </template>
      <ul :class="styles.cardGrid">
        <li
          v-for="record in filtered_records"
          :key="record.id"
          :class="styles.assetCard"
          draggable="true"
          :data-dragging="dragged_id === record.id ? '' : null"
          @dragstart="handle_drag_start(record.id, $event)"
          @dragover="handle_drag_over"
          @drop="handle_drop(record.id, $event)"
        >
          <span :class="styles.dragHandle" :aria-label="dragHandleLabel" aria-hidden="true">
            <AppIcon :icon="GripVertical" :size="16" />
          </span>
          <button
            type="button"
            :class="styles.assetCardMain"
            :aria-label="`${editLabel}: ${record.display_name}`"
            @click="emit('edit', record)"
          >
            <span :class="styles.assetCardName">{{ record.display_name }}</span>
            <span v-if="summary_for(record).length > 0" :class="styles.assetCardSummary">
              <span
                v-for="part in summary_for(record)"
                :key="part.label"
                :class="[styles.assetCardSummaryPart, part.numeric && 'tc-tabular-nums']"
              >
                {{ part.label }}: {{ part.value }}
              </span>
            </span>
          </button>
          <div :class="styles.assetCardActions">
            <IconButton
              :icon="ChevronUp"
              size="sm"
              :label="moveUpLabel"
              @click="move(record.id, -1)"
            />
            <IconButton
              :icon="ChevronDown"
              size="sm"
              :label="moveDownLabel"
              @click="move(record.id, 1)"
            />
            <IconButton
              :icon="Trash2"
              size="sm"
              destructive
              :label="deleteLabel"
              @click="request_delete(record)"
            />
          </div>
        </li>
      </ul>
    </StateSurface>

    <ConfirmDialog
      :open="pending_delete !== null"
      :title="pending_delete ? deleteConfirmTitle(pending_delete.display_name) : ''"
      :description="deleteConfirmDescription"
      :confirm-label="confirmLabel"
      :cancel-label="cancelLabel"
      @update:open="
        (open) => {
          if (!open) pending_delete = null;
        }
      "
      @confirm="confirm_delete"
    />
  </div>
</template>
