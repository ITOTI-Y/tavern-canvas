<script setup lang="ts">
import type { AssetRecordSummary } from "../../contracts/ui_capabilities.js";
import { ChevronDown, ChevronUp, ImageOff, Plus, X } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppDialog from "../../components/AppDialog.vue";
import IconButton from "../../components/IconButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { ReferenceDraftItem } from "./build_generation_request.js";
import styles from "./workbench.module.css";

const MAX_REFERENCES = 4;

const props = defineProps<{
  readonly references: readonly ReferenceDraftItem[];
  readonly available: readonly AssetRecordSummary[];
  readonly status: "loading" | "ready" | "error";
}>();

const emit = defineEmits<{
  add: [assetId: ReferenceDraftItem["asset_id"]];
  remove: [index: number];
  reorder: [fromIndex: number, toIndex: number];
}>();

const { t } = useI18n();
const picker_open = ref(false);

const at_max = computed(() => props.references.length >= MAX_REFERENCES);
const pickable = computed(() => {
  const selected = new Set(props.references.map((reference) => reference.asset_id));
  return props.available.filter((asset) => !selected.has(asset.id));
});
const picker_surface_status = computed<"loading" | "empty" | "error" | "ready">(() => {
  if (props.status === "loading") {
    return "loading";
  }
  if (props.status === "error") {
    return "error";
  }
  return pickable.value.length === 0 ? "empty" : "ready";
});
const picker_empty_message = computed(() => {
  const title = t("workbench.reference_strip.picker_empty_title");
  const description = t("workbench.reference_strip.picker_empty_description");
  return `${title} ${description}`;
});

function open_picker(): void {
  if (at_max.value) {
    return;
  }
  picker_open.value = true;
}

function pick(asset: AssetRecordSummary): void {
  emit("add", asset.id);
  picker_open.value = false;
}

function move_up(index: number): void {
  if (index === 0) {
    return;
  }
  emit("reorder", index, index - 1);
}

function move_down(index: number): void {
  if (index === props.references.length - 1) {
    return;
  }
  emit("reorder", index, index + 1);
}
</script>

<template>
  <div :class="styles.reference_strip" data-testid="reference-strip">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("workbench.reference_strip.title") }}</span>
      <span :class="styles.section_hint">{{ t("workbench.reference_strip.max_reached_hint") }}</span>
    </div>

    <div v-if="props.references.length === 0" :class="styles.reference_empty">
      <p>{{ t("workbench.reference_strip.empty_title") }}</p>
      <p :class="styles.section_hint">{{ t("workbench.reference_strip.empty_description") }}</p>
      <button
        type="button"
        class="tc-interactive"
        :class="styles.reference_add_button"
        data-testid="reference-add"
        @click="open_picker"
      >
        <Plus :size="16" aria-hidden="true" />
        {{ t("workbench.reference_strip.add_action") }}
      </button>
    </div>

    <ul v-else :class="styles.reference_list" data-testid="reference-list">
      <li
        v-for="(reference, index) in props.references"
        :key="reference.asset_id"
        :class="styles.reference_tile"
        data-testid="reference-item"
      >
        <span :class="styles.reference_tile_thumb" aria-hidden="true">
          <ImageOff :size="18" />
        </span>
        <span :class="styles.reference_tile_name">{{ reference.display_name }}</span>
        <span :class="styles.reference_tile_actions">
          <IconButton
            :icon="ChevronUp"
            size="sm"
            :label="t('workbench.reference_strip.move_up_action')"
            :disabled="index === 0"
            @click="move_up(index)"
          />
          <IconButton
            :icon="ChevronDown"
            size="sm"
            :label="t('workbench.reference_strip.move_down_action')"
            :disabled="index === props.references.length - 1"
            @click="move_down(index)"
          />
          <IconButton
            :icon="X"
            size="sm"
            :label="t('workbench.reference_strip.remove_action')"
            data-testid="reference-remove"
            @click="emit('remove', index)"
          />
        </span>
      </li>
      <li v-if="!at_max" :class="styles.reference_tile_add">
        <button
          type="button"
          class="tc-interactive"
          :class="styles.reference_add_button"
          data-testid="reference-add"
          @click="open_picker"
        >
          <Plus :size="16" aria-hidden="true" />
          {{ t("workbench.reference_strip.add_action") }}
        </button>
      </li>
    </ul>

    <AppDialog
      :open="picker_open"
      :title="t('workbench.reference_strip.picker_title')"
      :close-label="t('common.actions.close')"
      @update:open="(open) => (picker_open = open)"
    >
      <StateSurface
        :status="picker_surface_status"
        :empty-message="picker_empty_message"
        :error-message="t('workbench.reference_strip.picker_error')"
      >
        <ul :class="styles.picker_list">
          <li v-for="asset in pickable" :key="asset.id">
            <button
              type="button"
              class="tc-interactive"
              :class="styles.picker_item"
              data-testid="reference-picker-item"
              @click="pick(asset)"
            >
              {{ asset.display_name }}
            </button>
          </li>
        </ul>
      </StateSurface>
    </AppDialog>
  </div>
</template>
