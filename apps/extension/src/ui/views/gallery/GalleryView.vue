<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppSelect, { type AppSelectOption } from "../../components/AppSelect.vue";
import AppSwitch from "../../components/AppSwitch.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { drop_undefined } from "../../components/_prop_utils.js";
import StateSurface from "../../components/StateSurface.vue";
import ToastViewport from "../../components/ToastViewport.vue";
import type { ToastItem } from "../../components/ToastViewport.vue";
import type { GalleryRecordSummary } from "../../contracts/ui_capabilities.js";
import type { StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import { format_byte_size } from "../../../i18n/create_i18n.js";
import BulkActionBar from "./BulkActionBar.vue";
import styles from "./gallery.module.css";
import ImageGrid from "./ImageGrid.vue";
import ImagePreviewDialog from "./ImagePreviewDialog.vue";

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
  readonly gridWidthOverride?: number;
  readonly gridHeightOverride?: number;
}>();

const { t, locale } = useI18n();

/** Reka's SelectItem rejects an empty-string value. */
const ALL_PROVIDERS = "all";

const filter_provider = ref(ALL_PROVIDERS);
const filter_pinned_only = ref(false);
const filter_orphaned_only = ref(false);
const filter_date_from = ref("");
const filter_date_to = ref("");

const provider_options = computed<readonly AppSelectOption[]>(() => {
  const providers = new Set(props.state.gallery.records.map((record) => record.provider_id));
  return [
    { value: ALL_PROVIDERS, label: t("common.actions.clear") },
    ...[...providers].map((provider_id) => ({ value: provider_id, label: provider_id })),
  ];
});

function matches_filters(record: GalleryRecordSummary): boolean {
  if (filter_provider.value !== ALL_PROVIDERS && record.provider_id !== filter_provider.value) {
    return false;
  }
  if (filter_pinned_only.value && !record.pinned) {
    return false;
  }
  // `quarantined` marks a record detached from its message.
  if (filter_orphaned_only.value && !record.quarantined) {
    return false;
  }
  if (filter_date_from.value !== "" && record.created_at < filter_date_from.value) {
    return false;
  }
  if (filter_date_to.value !== "" && record.created_at > `${filter_date_to.value}T23:59:59.999Z`) {
    return false;
  }
  return true;
}

const filtered_records = computed(() => props.state.gallery.records.filter(matches_filters));

const resolved_locale = computed<"en" | "zh-CN">(() => (locale.value === "zh-CN" ? "zh-CN" : "en"));
const cache_occupancy_label = computed<string | null>(() => {
  const snapshot = props.state.diagnostics.snapshot;
  if (!snapshot || snapshot.storage_usage_bytes === null || snapshot.storage_quota_bytes === null) {
    return null;
  }
  return t("gallery.cache_occupancy.description", {
    used: format_byte_size(snapshot.storage_usage_bytes, resolved_locale.value),
    limit: format_byte_size(snapshot.storage_quota_bytes, resolved_locale.value),
  });
});

const selected_ids = reactive(new Set<string>());

function toggle_select(record_id: string): void {
  if (selected_ids.has(record_id)) {
    selected_ids.delete(record_id);
  } else {
    selected_ids.add(record_id);
  }
}

function clear_selection(): void {
  selected_ids.clear();
}

const selected_count_label = computed(() =>
  t("gallery.selection.selected_count", selected_ids.size),
);

const toasts = ref<ToastItem[]>([]);
let toast_sequence = 0;

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- type-aware ESLint resolves types exported from another SFC as any */
function push_toast(title: string): void {
  toast_sequence += 1;
  const id = `gallery-toast-${String(toast_sequence)}`;
  toasts.value = [...toasts.value, { id, title, variant: "success" }];
  setTimeout(() => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }, 4000);
}

function dismiss_toast(id: string): void {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

const EXTENSION_BY_MEDIA_TYPE: Readonly<Record<string, string>> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

async function download_record(record: GalleryRecordSummary): Promise<void> {
  const bytes = await props.controller.read_gallery_bytes(record.id);
  const extension = EXTENSION_BY_MEDIA_TYPE[record.media_type] ?? "png";
  const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: record.media_type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${record.id}.${extension}`;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function download_selected(): Promise<void> {
  const records = filtered_records.value.filter((record) => selected_ids.has(record.id));
  for (const record of records) {
    await download_record(record);
  }
}

const preview_record_id = ref<string | null>(null);

const preview_record = computed<GalleryRecordSummary | null>(
  () => filtered_records.value.find((record) => record.id === preview_record_id.value) ?? null,
);
const preview_index = computed(() =>
  filtered_records.value.findIndex((record) => record.id === preview_record_id.value),
);
const has_previous = computed(() => preview_index.value > 0);
const has_next = computed(
  () => preview_index.value >= 0 && preview_index.value < filtered_records.value.length - 1,
);

function open_preview(record_id: string): void {
  preview_record_id.value = record_id;
  props.controller.select_gallery_record(record_id);
  props.controller.select_inspector_record({ kind: "gallery_record", record_id });
}

function close_preview(open: boolean): void {
  if (!open) {
    preview_record_id.value = null;
    props.controller.select_gallery_record(null);
  }
}

function step_preview(direction: -1 | 1): void {
  const next_index = preview_index.value + direction;
  const next_record = filtered_records.value[next_index];
  if (next_record) {
    preview_record_id.value = next_record.id;
  }
}

async function open_source(): Promise<void> {
  const record = preview_record.value;
  if (!record) {
    return;
  }
  const outcome = await props.controller.reveal_gallery_source(record.id);
  switch (outcome) {
    case "revealed":
      return;
    case "other_chat":
      push_toast(t("gallery.metadata_inspector.source_other_chat"));
      return;
    case "not_found":
      push_toast(t("gallery.metadata_inspector.source_not_found"));
      return;
  }
}

async function toggle_pin_preview(): Promise<void> {
  const record = preview_record.value;
  if (!record) {
    return;
  }
  await props.controller.pin_gallery_record(record.id, !record.pinned);
}

async function detach_preview(): Promise<void> {
  const record = preview_record.value;
  if (!record) {
    return;
  }
  await props.controller.detach_gallery_record(record.id);
}

async function delete_preview(): Promise<void> {
  const record = preview_record.value;
  if (!record) {
    return;
  }
  await props.controller.delete_gallery_record(record.id);
  preview_record_id.value = null;
}

const bulk_delete_pending = ref(false);
const bulk_detach_pending = ref(false);

async function confirm_bulk_delete(): Promise<void> {
  bulk_delete_pending.value = false;
  await props.controller.bulk_delete_gallery_records([...selected_ids]);
  clear_selection();
}

async function confirm_bulk_detach(): Promise<void> {
  bulk_detach_pending.value = false;
  await Promise.all([...selected_ids].map((id) => props.controller.detach_gallery_record(id)));
  clear_selection();
}

const read_bytes = (id: string): Promise<Uint8Array> => props.controller.read_gallery_bytes(id);

const grid_status = computed(() => {
  if (props.state.loading.has("gallery")) {
    return "loading" as const;
  }
  return filtered_records.value.length === 0 ? ("empty" as const) : ("ready" as const);
});
</script>

<template>
  <div :class="styles.galleryView">
    <div :class="styles.filterBar">
      <span class="tc-visually-hidden">{{ t("gallery.filters.title") }}</span>
      <!-- eslint-disable vue/attribute-hyphenation -- ariaLabel must stay camelCase to bind AppSelect's prop -->
      <!-- :key="locale" remounts the select: Reka's SelectValue keeps the old-locale label when option labels change. -->

      <AppSelect
        :key="locale"
        :model-value="filter_provider"
        :options="provider_options"
        :placeholder="t('gallery.filters.provider_label')"
        :ariaLabel="t('gallery.filters.provider_label')"
        @update:model-value="
          (value) => {
            filter_provider = value;
          }
        "
      />
      <!-- eslint-enable vue/attribute-hyphenation -->
      <AppSwitch v-model="filter_pinned_only" :label="t('gallery.filters.pinned_only_label')" />
      <AppSwitch v-model="filter_orphaned_only" :label="t('gallery.filters.orphaned_only_label')" />
      <label :class="styles.dateFilterLabel">
        {{ t("gallery.filters.date_range_label") }}
        <input v-model="filter_date_from" type="date" :class="styles.dateInput" />
        <input v-model="filter_date_to" type="date" :class="styles.dateInput" />
      </label>
      <span v-if="cache_occupancy_label" class="tc-tabular-nums" :class="styles.cacheOccupancy">
        {{ t("gallery.cache_occupancy.label") }}: {{ cache_occupancy_label }}
      </span>
    </div>

    <StateSurface
      :status="grid_status"
      :empty-title="t('gallery.empty_title')"
      :empty-message="t('gallery.empty_description')"
      min-height="240px"
    >
      <template #skeleton>
        <div :class="styles.skeletonGrid" aria-hidden="true">
          <div v-for="index in 12" :key="index" :class="styles.skeletonTile" />
        </div>
      </template>
      <template #action>
        <p :class="styles.emptyDescription">{{ t("gallery.empty_description") }}</p>
      </template>
      <!-- eslint-disable vue/attribute-hyphenation -- ariaLabel must stay camelCase to bind AppSelect's prop -->
      <ImageGrid
        :records="filtered_records"
        :selected-ids="selected_ids"
        :read-bytes="read_bytes"
        :thumbnail-failed-label="t('gallery.thumbnail_failed')"
        :pinned-label="t('gallery.pin_action')"
        :select-label="t('gallery.select_image_action')"
        :open-label="t('gallery.open_preview_action')"
        :ariaLabel="t('nav.gallery')"
        v-bind="
          drop_undefined({ widthOverride: gridWidthOverride, heightOverride: gridHeightOverride })
        "
        @open="open_preview"
        @toggle-select="toggle_select"
      />
      <!-- eslint-enable vue/attribute-hyphenation -->
    </StateSurface>

    <BulkActionBar
      v-if="selected_ids.size > 0"
      :selected-count-label="selected_count_label"
      :download-label="t('gallery.selection.download_action')"
      :delete-label="t('gallery.selection.delete_action')"
      :detach-label="t('gallery.selection.detach_action')"
      :clear-label="t('common.actions.deselect_all')"
      @download="() => void download_selected()"
      @delete="bulk_delete_pending = true"
      @detach="bulk_detach_pending = true"
      @clear="clear_selection"
    />

    <ImagePreviewDialog
      :open="preview_record !== null"
      :record="preview_record"
      :has-previous="has_previous"
      :has-next="has_next"
      :read-bytes="read_bytes"
      :close-label="t('common.actions.close')"
      :previous-label="t('common.actions.back')"
      :next-label="t('common.actions.next')"
      :pin-label="t('gallery.pin_action')"
      :unpin-label="t('gallery.unpin_action')"
      :download-label="t('gallery.download_action')"
      :detach-label="t('gallery.selection.detach_action')"
      :delete-label="t('common.actions.delete')"
      :detach-confirm-title="t('gallery.selection.detach_confirm_title', 1)"
      :detach-confirm-description="t('gallery.selection.detach_confirm_description')"
      :delete-confirm-title="t('gallery.selection.delete_confirm_title', 1)"
      :delete-confirm-description="t('gallery.selection.delete_confirm_description')"
      :detach-confirm-label="t('gallery.selection.detach_action')"
      :delete-confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      :thumbnail-failed-label="t('gallery.thumbnail_failed')"
      :metadata-title="t('gallery.metadata_inspector.title')"
      :orphan-label="t('gallery.orphan_label')"
      :seed-label="t('gallery.metadata_inspector.seed_label')"
      :provider-label="t('gallery.metadata_inspector.provider_label')"
      :model-label="t('gallery.metadata_inspector.model_label')"
      :prompt-label="t('gallery.metadata_inspector.prompt_label')"
      :copy-label="t('gallery.metadata_inspector.copy_action')"
      :copied-label="t('gallery.metadata_inspector.copied_toast')"
      :parameters-empty-description="t('gallery.metadata_inspector.parameters_unavailable')"
      :source-message-label="t('gallery.metadata_inspector.source_message_action')"
      @update:open="close_preview"
      @previous="step_preview(-1)"
      @next="step_preview(1)"
      @toggle-pin="() => void toggle_pin_preview()"
      @download="() => preview_record && void download_record(preview_record)"
      @detach="() => void detach_preview()"
      @delete="() => void delete_preview()"
      @open-source="() => void open_source()"
      @copied="push_toast(t('gallery.metadata_inspector.copied_toast'))"
    />

    <ConfirmDialog
      :open="bulk_delete_pending"
      :title="t('gallery.selection.delete_confirm_title', selected_ids.size)"
      :description="t('gallery.selection.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      @update:open="
        (value) => {
          bulk_delete_pending = value;
        }
      "
      @confirm="() => void confirm_bulk_delete()"
    />
    <ConfirmDialog
      :open="bulk_detach_pending"
      :title="t('gallery.selection.detach_confirm_title', selected_ids.size)"
      :description="t('gallery.selection.detach_confirm_description')"
      :confirm-label="t('gallery.selection.detach_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      @update:open="
        (value) => {
          bulk_detach_pending = value;
        }
      "
      @confirm="() => void confirm_bulk_detach()"
    />

    <ToastViewport
      :toasts="toasts"
      :viewport-label="t('common.notifications.viewport_label')"
      :announce-label="t('common.notifications.announce_label')"
      :close-label="t('common.actions.close')"
      @dismiss="dismiss_toast"
    />
  </div>
</template>
