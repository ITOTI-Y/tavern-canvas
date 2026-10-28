<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { computed, inject, ref } from "vue";
import { useI18n } from "vue-i18n";

import AppSwitch from "../../components/AppSwitch.vue";
import { ACTIVE_CHAT_ID_KEY } from "../../contracts/portal_keys.js";
import type { AssetCategory } from "../../contracts/ui_capabilities.js";
import type { StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./assets_styles.js";
import CharacterPanel from "./CharacterPanel.vue";
import LoraPanel from "./LoraPanel.vue";
import OutfitPanel from "./OutfitPanel.vue";
import VibePanel from "./VibePanel.vue";
import VocabularyPanel from "./VocabularyPanel.vue";
import WorkflowPanel from "./WorkflowPanel.vue";

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t, locale } = useI18n();

type AssetsTab = "vocabulary" | AssetCategory;
type ListedCategory = Exclude<AssetCategory, "prompt_tag">;

const CATEGORY_TABS = ["character", "outfit", "lora", "vibe", "workflow"] as const;

const active_tab = ref<AssetsTab>(props.state.assets.active_category);
const show_all_chats = ref(false);
const active_chat_id = inject(ACTIVE_CHAT_ID_KEY, ref(null));

function select_tab(value: string | number): void {
  active_tab.value = value as AssetsTab;
  if ((CATEGORY_TABS as readonly string[]).includes(String(value))) {
    props.controller.set_active_asset_category(value as AssetCategory);
  }
}

function bound_elsewhere(payload: Readonly<Record<string, unknown>>): boolean {
  const chat_id = payload.chat_id;
  return typeof chat_id === "string" && chat_id !== "" && chat_id !== active_chat_id.value;
}

/** Entries the list shows: global ones and the active chat's, or every chat's when asked. */
function listed_count(category: ListedCategory): number {
  const records = props.state.assets.records[category];
  return show_all_chats.value
    ? records.length
    : records.filter((record) => !bound_elsewhere(record.payload)).length;
}

/** The switch only matters once some character or outfit belongs to another chat. */
const has_other_chat_entries = computed(() =>
  [...props.state.assets.records.character, ...props.state.assets.records.outfit].some((record) =>
    bound_elsewhere(record.payload),
  ),
);

const tab_labels = computed<Readonly<Record<ListedCategory, string>>>(() => ({
  character: t("assets.tabs.characters"),
  outfit: t("assets.tabs.outfits"),
  lora: t("assets.tabs.lora"),
  vibe: t("assets.tabs.vibe"),
  workflow: t("assets.tabs.workflow"),
}));

const assets_loading = computed(() => props.state.loading.has("assets"));
const vocabulary_loading = computed(() => props.state.loading.has("vocabulary"));
const resolved_locale = computed<"en" | "zh-CN">(() => (locale.value === "zh-CN" ? "zh-CN" : "en"));
</script>

<template>
  <div :class="styles.assetsView">
    <TabsRoot :model-value="active_tab" :class="styles.tabsRoot" @update:model-value="select_tab">
      <TabsList :class="styles.tabsList" :aria-label="t('nav.assets')">
        <TabsTrigger
          v-for="category in CATEGORY_TABS"
          :key="category"
          :value="category"
          :class="styles.tabsTrigger"
        >
          {{ tab_labels[category] }}
          <span v-if="!assets_loading" :class="styles.tabsCount" class="tc-tabular-nums">{{
            listed_count(category)
          }}</span>
        </TabsTrigger>
        <TabsTrigger value="vocabulary" :class="styles.tabsTrigger">
          {{ t("assets.tabs.vocabulary") }}
        </TabsTrigger>
      </TabsList>

      <div
        v-if="has_other_chat_entries && (active_tab === 'character' || active_tab === 'outfit')"
        :class="styles.scopeSwitch"
      >
        <AppSwitch v-model="show_all_chats" :label="t('assets.show_all_chats_label')" />
      </div>

      <TabsContent value="character" :class="styles.tabsContent">
        <CharacterPanel
          :records="state.assets.records.character"
          :outfit-records="state.assets.records.outfit"
          :loading="assets_loading"
          :controller="controller"
          :show-all-chats="show_all_chats"
        />
      </TabsContent>
      <TabsContent value="outfit" :class="styles.tabsContent">
        <OutfitPanel
          :records="state.assets.records.outfit"
          :character-records="state.assets.records.character"
          :loading="assets_loading"
          :controller="controller"
          :show-all-chats="show_all_chats"
        />
      </TabsContent>
      <TabsContent value="lora" :class="styles.tabsContent">
        <LoraPanel
          :records="state.assets.records.lora"
          :character-records="state.assets.records.character"
          :loading="assets_loading"
          :controller="controller"
        />
      </TabsContent>
      <TabsContent value="vibe" :class="styles.tabsContent">
        <VibePanel
          :records="state.assets.records.vibe"
          :loading="assets_loading"
          :controller="controller"
        />
      </TabsContent>
      <TabsContent value="workflow" :class="styles.tabsContent">
        <WorkflowPanel
          :records="state.assets.records.workflow"
          :loading="assets_loading"
          :controller="controller"
        />
      </TabsContent>
      <TabsContent value="vocabulary" :class="[styles.tabsContent, styles.vocabularyContent]">
        <VocabularyPanel
          :catalog="state.assets.vocabulary_catalog"
          :install-command="state.assets.vocabulary_install_command"
          :catalog-failure="state.failures.get('vocabulary') ?? null"
          :loading="vocabulary_loading"
          :controller="controller"
          :locale="resolved_locale"
        />
      </TabsContent>
    </TabsRoot>
  </div>
</template>
