<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { AssetCategory } from "../../contracts/ui_capabilities.js";
import type { StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./assets.module.css";
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

const ASSET_CATEGORY_TABS: ReadonlySet<string> = new Set([
  "character",
  "outfit",
  "lora",
  "vibe",
  "workflow",
]);

const active_tab = ref<AssetsTab>(props.state.assets.active_category);

function select_tab(value: string): void {
  active_tab.value = value as AssetsTab;
  if (ASSET_CATEGORY_TABS.has(value)) {
    props.controller.set_active_asset_category(value as AssetCategory);
  }
}

const assets_loading = computed(() => props.state.loading.has("assets"));
const vocabulary_loading = computed(() => props.state.loading.has("vocabulary"));
const resolved_locale = computed<"en" | "zh-CN">(() => (locale.value === "zh-CN" ? "zh-CN" : "en"));
</script>

<template>
  <div :class="styles.assetsView">
    <TabsRoot :model-value="active_tab" @update:model-value="select_tab">
      <TabsList :class="styles.tabsList" :aria-label="t('nav.assets')">
        <TabsTrigger value="vocabulary" :class="styles.tabsTrigger">
          {{ t("assets.tabs.vocabulary") }}
        </TabsTrigger>
        <TabsTrigger value="character" :class="styles.tabsTrigger">
          {{ t("assets.tabs.characters") }}
        </TabsTrigger>
        <TabsTrigger value="outfit" :class="styles.tabsTrigger">
          {{ t("assets.tabs.outfits") }}
        </TabsTrigger>
        <TabsTrigger value="lora" :class="styles.tabsTrigger">{{
          t("assets.tabs.lora")
        }}</TabsTrigger>
        <TabsTrigger value="vibe" :class="styles.tabsTrigger">{{
          t("assets.tabs.vibe")
        }}</TabsTrigger>
        <TabsTrigger value="workflow" :class="styles.tabsTrigger">
          {{ t("assets.tabs.workflow") }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vocabulary" :class="styles.tabsContent">
        <VocabularyPanel
          :catalog="state.assets.vocabulary_catalog"
          :install-command="state.assets.vocabulary_install_command"
          :loading="vocabulary_loading"
          :controller="controller"
          :locale="resolved_locale"
        />
      </TabsContent>
      <TabsContent value="character" :class="styles.tabsContent">
        <CharacterPanel
          :records="state.assets.records.character"
          :loading="assets_loading"
          :controller="controller"
        />
      </TabsContent>
      <TabsContent value="outfit" :class="styles.tabsContent">
        <OutfitPanel
          :records="state.assets.records.outfit"
          :character-records="state.assets.records.character"
          :loading="assets_loading"
          :controller="controller"
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
    </TabsRoot>
  </div>
</template>
