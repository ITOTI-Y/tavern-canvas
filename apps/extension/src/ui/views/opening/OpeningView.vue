<script setup lang="ts">
import { computed, inject, onMounted, ref, shallowRef } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningHost } from "../../../modules/opening/opening_host.js";
import {
  builtin_template,
  type BuiltinStepId,
  type OpeningTemplate,
} from "../../../modules/opening/opening_model.js";
import StateSurface from "../../components/StateSurface.vue";
import { OPENING_KEY } from "../../contracts/opening_port.js";
import type { StudioState } from "../../contracts/view_models.js";
import type { StudioController } from "../../controllers/studio_controller.js";
import OpeningBooks from "./OpeningBooks.vue";
import OpeningBuild from "./OpeningBuild.vue";
import OpeningTemplates from "./OpeningTemplates.vue";
import type { OpeningLists, OpeningSection } from "./opening_section.js";
import { use_opening_flow } from "./use_opening_flow.js";
import { use_opening_messages } from "./use_opening_messages.js";
import { use_opening_store } from "./use_opening_store.js";

const props = defineProps<{
  readonly state: StudioState;
  readonly controller: StudioController;
}>();

const { t } = useI18n();
const port = inject(OPENING_KEY, null);
const ready = use_opening_messages();

const save_error = ref<string | null>(null);

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

const store = use_opening_store({
  records: () => props.state.assets.records.opening,
  save: (record) => props.controller.save_asset("opening", record),
  remove: (id) => props.controller.remove_asset("opening", id),
  on_save_error: (error) => {
    save_error.value = reason(error);
  },
});
const flow = port === null ? null : use_opening_flow(port, store);

const section = ref<OpeningSection>("build");

const host = shallowRef<OpeningHost | null>(null);
const host_error = ref<string | null>(null);
const lists = ref<OpeningLists>({ books: [], presets: ["in_use"], proxies: [], chat_book: null });

/** Reads the world book, preset and chat binding lists again, after a write or on demand. */
function refresh_lists(): void {
  const current = host.value;
  if (current === null) {
    return;
  }
  try {
    lists.value = {
      books: current.list_worldbooks(),
      presets: current.preset_names(),
      proxies: current.proxy_preset_names(),
      chat_book: current.chat_worldbook(),
    };
  } catch (error) {
    host_error.value = reason(error);
  }
}

onMounted(async () => {
  if (port === null) {
    return;
  }
  try {
    host.value = await port.host();
    refresh_lists();
  } catch (error) {
    host_error.value = reason(error);
  }
});

function step_text(id: BuiltinStepId): { readonly name: string; readonly instruction: string } {
  switch (id) {
    case "genre":
      return {
        name: t("opening.builtin.genre_name"),
        instruction: t("opening.builtin.genre_text"),
      };
    case "world":
      return {
        name: t("opening.builtin.world_name"),
        instruction: t("opening.builtin.world_text"),
      };
    case "cast":
      return { name: t("opening.builtin.cast_name"), instruction: t("opening.builtin.cast_text") };
    case "rules":
      return {
        name: t("opening.builtin.rules_name"),
        instruction: t("opening.builtin.rules_text"),
      };
    case "opening":
      return {
        name: t("opening.builtin.opening_name"),
        instruction: t("opening.builtin.opening_text"),
      };
  }
}

/** The built-in template follows the page's locale; saved templates keep the text they were saved with. */
const templates = computed<readonly OpeningTemplate[]>(() =>
  ready.value
    ? [builtin_template(step_text, t("opening.builtin.name")), ...store.templates.value]
    : [],
);
</script>

<template>
  <StateSurface v-if="!ready" status="loading" />
  <StateSurface
    v-else-if="port === null || flow === null"
    status="empty"
    :empty-title="t('opening.unavailable_title')"
    :empty-message="t('opening.unavailable_message')"
  />
  <template v-else>
    <OpeningBuild
      v-if="section === 'build'"
      v-model:section="section"
      :store="store"
      :flow="flow"
      :host="host"
      :host-error="host_error"
      :lists="lists"
      :templates="templates"
      :save-error="save_error"
      @refresh-lists="refresh_lists"
    />
    <OpeningBooks
      v-else-if="section === 'books'"
      v-model:section="section"
      :host="host"
      :host-error="host_error"
      :lists="lists"
      @refresh-lists="refresh_lists"
    />
    <OpeningTemplates
      v-else
      v-model:section="section"
      :store="store"
      :templates="templates"
      :save-error="save_error"
    />
  </template>
</template>
