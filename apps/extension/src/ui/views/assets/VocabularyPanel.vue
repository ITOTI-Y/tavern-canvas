<script setup lang="ts">
import { ChevronDown, ChevronUp, Copy, Download } from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import type { VocabularyCatalogEntry, VocabularySearchResult } from "@tavern-canvas/contracts";

import AppButton from "../../components/AppButton.vue";
import StateSurface from "../../components/StateSurface.vue";
import type { CommandState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import styles from "./assets.module.css";

/**
 * Vocabulary catalog + search. Consumes the Stage 05 catalog capability (list packages, install
 * selected, progress) via the controller's search_vocabulary/load_more_vocabulary/
 * install_vocabulary_package pass-throughs. Per VocabularyCapability.install's own doc comment, a
 * live VocabularyClient Worker never observes a package installed mid-session on its own -- after
 * a successful install this panel drops its current search results/cursor and, if a query was
 * active, re-issues it, which is the UI-side half of the "dispose and recreate" contract (the
 * capability adapter that owns the actual Worker instance is out of this task's ownership).
 *
 * NSFW ruling (controller): the legacy NSFW group-tree is not installed as default data and is
 * never pre-selected. Since VocabularyCatalogEntry carries no dedicated NSFW flag, any catalog
 * entry whose package_id/display_name matches /nsfw|adult|explicit/ is treated as opt-in: hidden
 * behind a collapsed disclosure the user must expand before an install button even renders.
 */
const props = defineProps<{
  readonly catalog: readonly VocabularyCatalogEntry[];
  readonly installCommand: CommandState<void>;
  readonly loading: boolean;
  readonly controller: StudioController;
  readonly locale: "en" | "zh-CN";
}>();

const { t } = useI18n();

// The catalog is fetched from a remote host, so it is loaded here rather than at bootstrap:
// opening this panel is the user asking for it. See StudioController.load_vocabulary_catalog.
onMounted(() => {
  void props.controller.load_vocabulary_catalog();
});

const NSFW_PATTERN = /nsfw|adult|explicit/iu;

function is_nsfw_entry(entry: VocabularyCatalogEntry): boolean {
  return (
    NSFW_PATTERN.test(entry.package_id) ||
    NSFW_PATTERN.test(entry.display_name.en) ||
    NSFW_PATTERN.test(entry.display_name["zh-CN"])
  );
}

const standard_entries = computed(() => props.catalog.filter((entry) => !is_nsfw_entry(entry)));
const nsfw_entries = computed(() => props.catalog.filter((entry) => is_nsfw_entry(entry)));
const nsfw_expanded = ref(false);

function entry_name(entry: VocabularyCatalogEntry): string {
  return props.locale === "zh-CN" ? entry.display_name["zh-CN"] : entry.display_name.en;
}

const installing_package_id = ref<string | null>(null);
const install_progress_label = ref<string | null>(null);

/** Explicit branches (not a template literal into the phase name) so every translation call site
 * stays a static key the locale checker can verify. */
function progress_label(progress: { readonly phase: string }): string {
  switch (progress.phase) {
    case "verifying_catalog_manifest":
      return t("assets.vocabulary.progress_verifying_catalog_manifest");
    case "downloading":
      return t("assets.vocabulary.progress_downloading");
    case "verifying_package":
      return t("assets.vocabulary.progress_verifying_package");
    case "installing":
      return t("assets.vocabulary.progress_installing");
    default:
      return "";
  }
}

async function install(entry: VocabularyCatalogEntry): Promise<void> {
  if (installing_package_id.value !== null) {
    return;
  }
  installing_package_id.value = entry.package_id;
  install_progress_label.value = null;
  await props.controller.install_vocabulary_package(entry, (progress) => {
    install_progress_label.value = progress_label(progress);
  });
  installing_package_id.value = null;
  install_progress_label.value = null;
  if (props.controller.state.assets.vocabulary_install_command.status === "success") {
    // Worker dispose/recreate handoff: this session's results are stale the moment a new
    // package might be active, so drop them and, if the user had a query in flight, ask again.
    search_results.value = [];
    next_cursor.value = null;
    if (search_query.value.trim() !== "") {
      await run_search();
    }
  }
}

// ---------------------------------------------------------------------------
// Search (stateless request/response -- see VocabularyCapability's own doc comment)
// ---------------------------------------------------------------------------

const search_query = ref("");
const search_results = ref<readonly VocabularySearchResult[]>([]);
const next_cursor = ref<string | null>(null);
const searching = ref(false);
const loading_more = ref(false);
const copied_record_id = ref<number | null>(null);
let debounce_handle: ReturnType<typeof setTimeout> | null = null;

async function run_search(): Promise<void> {
  const query = search_query.value.trim();
  if (query === "") {
    search_results.value = [];
    next_cursor.value = null;
    return;
  }
  searching.value = true;
  try {
    const page = await props.controller.search_vocabulary(query);
    search_results.value = page.results;
    next_cursor.value = page.next_cursor;
  } finally {
    searching.value = false;
  }
}

async function load_more(): Promise<void> {
  if (next_cursor.value === null) {
    return;
  }
  loading_more.value = true;
  try {
    const page = await props.controller.load_more_vocabulary(next_cursor.value);
    search_results.value = [...search_results.value, ...page.results];
    next_cursor.value = page.next_cursor;
  } finally {
    loading_more.value = false;
  }
}

watch(search_query, () => {
  if (debounce_handle !== null) {
    clearTimeout(debounce_handle);
  }
  debounce_handle = setTimeout(() => {
    void run_search();
  }, 250);
});

async function copy_result(result: VocabularySearchResult): Promise<void> {
  await navigator.clipboard.writeText(result.display_text);
  copied_record_id.value = result.record_id;
  setTimeout(() => {
    if (copied_record_id.value === result.record_id) {
      copied_record_id.value = null;
    }
  }, 2000);
}

const catalog_status = computed(() => {
  if (props.loading) {
    return "loading" as const;
  }
  return props.catalog.length === 0 ? ("empty" as const) : ("ready" as const);
});

/** "ready" once there is either no active query (nothing to show yet) or at least one result;
 * "empty" only for a completed, non-empty query with zero matches. */
const search_status = computed(() => {
  if (searching.value && search_results.value.length === 0) {
    return "loading" as const;
  }
  if (search_query.value.trim() === "" || search_results.value.length > 0) {
    return "ready" as const;
  }
  return "empty" as const;
});
</script>

<template>
  <div :class="styles.vocabularyPanel">
    <section>
      <p :class="styles.sectionTitle">{{ t("assets.vocabulary.search_placeholder") }}</p>
      <div :class="styles.vocabularySearchRow">
        <label class="tc-visually-hidden" for="vocabulary-search-input">
          {{ t("assets.vocabulary.search_placeholder") }}
        </label>
        <input
          id="vocabulary-search-input"
          v-model="search_query"
          type="text"
          :class="styles.searchInput"
          :placeholder="t('assets.vocabulary.search_placeholder')"
        />
      </div>

      <StateSurface
        :status="search_status"
        :empty-message="t('assets.vocabulary.empty_title')"
        min-height="60px"
      >
        <template #action>
          <p :class="styles.emptyDescription">{{ t("assets.vocabulary.empty_description") }}</p>
        </template>
        <ul v-if="search_results.length > 0" :class="styles.searchResultsList">
          <li
            v-for="result in search_results"
            :key="result.record_id"
            :class="styles.searchResultRow"
          >
            <span :class="styles.searchResultTag">{{ result.display_text }}</span>
            <span v-if="result.category" :class="styles.searchResultTranslation">{{
              result.category
            }}</span>
            <AppButton
              :label="
                copied_record_id === result.record_id
                  ? t('common.actions.copied')
                  : t('common.actions.copy')
              "
              :icon="Copy"
              variant="secondary"
              @click="() => void copy_result(result)"
            />
          </li>
        </ul>
      </StateSurface>

      <div v-if="next_cursor !== null" :class="styles.loadMoreRow">
        <AppButton
          :label="t('common.actions.next')"
          variant="secondary"
          :pending="loading_more"
          @click="() => void load_more()"
        />
      </div>
    </section>

    <section>
      <p :class="styles.sectionTitle">{{ t("assets.vocabulary.update_action") }}</p>
      <StateSurface
        :status="catalog_status"
        :empty-message="t('assets.vocabulary.empty_title')"
        min-height="80px"
      >
        <template #action>
          <p :class="styles.emptyDescription">{{ t("assets.vocabulary.empty_description") }}</p>
        </template>
        <div :class="styles.catalogList">
          <div
            v-for="entry in standard_entries"
            :key="entry.package_id"
            :class="styles.catalogEntry"
          >
            <div :class="styles.catalogEntryInfo">
              <span :class="styles.catalogEntryName">{{ entry_name(entry) }}</span>
              <span class="tc-tabular-nums" :class="styles.catalogEntryMeta">
                {{ t("assets.vocabulary.tag_count", entry.record_count) }}
              </span>
            </div>
            <span v-if="entry.bundled" :class="styles.bundledBadge">{{
              t("assets.vocabulary.bundled_label")
            }}</span>
            <AppButton
              v-else
              :label="t('assets.vocabulary.import_action')"
              :icon="Download"
              variant="primary"
              :pending="installing_package_id === entry.package_id"
              @click="() => void install(entry)"
            />
          </div>
        </div>
      </StateSurface>
      <p
        v-if="installing_package_id !== null && install_progress_label !== null"
        :class="styles.installProgress"
      >
        {{ install_progress_label }}
      </p>
    </section>

    <section v-if="nsfw_entries.length > 0" :class="styles.nsfwSection">
      <button
        type="button"
        class="tc-interactive"
        :class="styles.nsfwToggle"
        :aria-expanded="nsfw_expanded"
        @click="nsfw_expanded = !nsfw_expanded"
      >
        <component
          :is="nsfw_expanded ? ChevronUp : ChevronDown"
          :size="14"
          :stroke-width="1.75"
          aria-hidden="true"
        />
        {{ t("assets.vocabulary.nsfw_disclosure_label") }}
      </button>
      <p v-if="!nsfw_expanded" :class="styles.nsfwNotice">
        {{ t("assets.vocabulary.nsfw_disclosure_hint") }}
      </p>
      <div v-else :class="styles.catalogList">
        <p :class="styles.nsfwNotice">{{ t("assets.vocabulary.nsfw_disclosure_hint") }}</p>
        <div v-for="entry in nsfw_entries" :key="entry.package_id" :class="styles.catalogEntry">
          <div :class="styles.catalogEntryInfo">
            <span :class="styles.catalogEntryName">{{ entry_name(entry) }}</span>
            <span class="tc-tabular-nums" :class="styles.catalogEntryMeta">
              {{ t("assets.vocabulary.tag_count", entry.record_count) }}
            </span>
          </div>
          <AppButton
            :label="t('assets.vocabulary.import_action')"
            :icon="Download"
            variant="destructive"
            :pending="installing_package_id === entry.package_id"
            @click="() => void install(entry)"
          />
        </div>
      </div>
    </section>
  </div>
</template>
