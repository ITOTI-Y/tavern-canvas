<script setup lang="ts">
import type { Uuid } from "@tavern-canvas/contracts";
import { Plus, Shuffle } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppButton from "../../components/AppButton.vue";
import AppIcon from "../../components/AppIcon.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { PromptPresetSummary } from "../../contracts/ui_capabilities.js";
import styles from "./prompt_styles.js";

const props = defineProps<{
  readonly presets: readonly PromptPresetSummary[];
  readonly selectedPresetId: Uuid | null;
  readonly loading: boolean;
  readonly hasError: boolean;
}>();

const emit = defineEmits<{
  select: [presetId: Uuid];
  "new-preset": [];
  "bulk-delete": [presetIds: Uuid[]];
}>();

const { t } = useI18n();
const query = ref("");
const bulk_selected = ref<Set<Uuid>>(new Set());
const bulk_delete_open = ref(false);

const surface_status = computed<"loading" | "empty" | "error" | "ready">(() => {
  if (props.loading) {
    return "loading";
  }
  if (props.hasError) {
    return "error";
  }
  return props.presets.length === 0 ? "empty" : "ready";
});

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) {
    return props.presets;
  }
  return props.presets.filter((preset) => preset.display_name.toLowerCase().includes(needle));
});

const groups = computed(() => {
  const map = new Map<string | null, PromptPresetSummary[]>();
  for (const preset of filtered.value) {
    const key = preset.group;
    const list = map.get(key) ?? [];
    list.push(preset);
    map.set(key, list);
  }
  return [...map.entries()].sort(([a], [b]) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    return a.localeCompare(b);
  });
});

function toggle_bulk(preset_id: Uuid, checked: boolean): void {
  const next = new Set(bulk_selected.value);
  if (checked) {
    next.add(preset_id);
  } else {
    next.delete(preset_id);
  }
  bulk_selected.value = next;
}

function pick_random(group_presets: readonly PromptPresetSummary[]): void {
  if (group_presets.length === 0) {
    return;
  }
  const index = Math.floor(Math.random() * group_presets.length);
  const chosen = group_presets[index];
  if (chosen) {
    emit("select", chosen.id);
  }
}

function confirm_bulk_delete(): void {
  emit("bulk-delete", [...bulk_selected.value]);
  bulk_selected.value = new Set();
  bulk_delete_open.value = false;
}
</script>

<template>
  <div :class="styles.preset_browser" data-testid="preset-browser">
    <div :class="styles.section_header">
      <span :class="styles.section_title">{{ t("prompt.preset_browser.title") }}</span>
      <AppButton
        :label="t('prompt.preset_browser.new_preset_action')"
        :icon="Plus"
        variant="secondary"
        data-testid="new-preset"
        @click="emit('new-preset')"
      />
    </div>

    <input
      v-model="query"
      type="search"
      :class="styles.search_input"
      data-testid="preset-search"
      :placeholder="t('prompt.preset_browser.search_placeholder')"
      :aria-label="t('prompt.preset_browser.search_placeholder')"
    />

    <button
      v-if="bulk_selected.size > 0"
      type="button"
      class="tc-interactive"
      :class="styles.bulk_delete_button"
      data-testid="bulk-delete-action"
      @click="bulk_delete_open = true"
    >
      {{ t("prompt.preset_browser.bulk_delete_action") }} ({{ bulk_selected.size }})
    </button>

    <StateSurface
      :status="surface_status"
      :empty-title="t('prompt.preset_browser.empty_title')"
      :empty-message="t('prompt.preset_browser.empty_description')"
      :error-message="t('prompt.preset_browser.load_error')"
    >
      <div v-for="[group_key, group_presets] in groups" :key="group_key ?? '__ungrouped__'">
        <div :class="styles.group_header">
          <span>{{ group_key ?? t("prompt.preset_browser.ungrouped_label") }}</span>
          <button
            type="button"
            class="tc-interactive"
            :class="styles.icon_text_button"
            :aria-label="t('prompt.preset_browser.random_group_action')"
            data-testid="random-group"
            @click="pick_random(group_presets)"
          >
            <AppIcon :icon="Shuffle" :size="14" />
          </button>
        </div>
        <ul :class="styles.preset_list">
          <li
            v-for="preset in group_presets"
            :key="preset.id"
            :class="[
              styles.preset_row,
              preset.id === props.selectedPresetId && styles.preset_row_selected,
            ]"
            data-testid="preset-row"
          >
            <input
              type="checkbox"
              :checked="bulk_selected.has(preset.id)"
              :aria-label="preset.display_name"
              data-testid="preset-bulk-checkbox"
              @change="
                (event) => toggle_bulk(preset.id, (event.target as HTMLInputElement).checked)
              "
            />
            <button
              type="button"
              class="tc-interactive"
              :class="styles.preset_name_button"
              data-testid="preset-select"
              @click="emit('select', preset.id)"
            >
              {{ preset.display_name }}
            </button>
          </li>
        </ul>
      </div>
    </StateSurface>

    <ConfirmDialog
      :open="bulk_delete_open"
      :title="
        t(
          'prompt.preset_browser.bulk_delete_confirm_title',
          { n: bulk_selected.size },
          bulk_selected.size,
        )
      "
      :description="t('prompt.preset_browser.bulk_delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      data-testid="bulk-delete-confirm"
      @update:open="(open) => (bulk_delete_open = open)"
      @confirm="confirm_bulk_delete"
    />
  </div>
</template>
