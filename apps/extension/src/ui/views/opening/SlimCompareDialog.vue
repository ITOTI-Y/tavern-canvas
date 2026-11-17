<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { OpeningBookEntry } from "../../../modules/opening/opening_host.js";
import { accept_slim, slim_request } from "../../../modules/world_info/slim_requests.js";
import { content_hash, type SlimEntry } from "../../../modules/world_info/slim_store.js";
import AppButton from "../../components/AppButton.vue";
import AppDialog from "../../components/AppDialog.vue";
import type { OpeningPort } from "../../contracts/opening_port.js";
import { reason } from "./opening_section.js";
import styles from "./opening_styles.js";

/**
 * One entry's original beside its condensed version: the condensed text can be written, generated,
 * edited, or removed so the original is sent again.
 */
const props = defineProps<{
  /** `null` closes the dialog. */
  readonly entry: OpeningBookEntry | null;
  readonly stored: SlimEntry | null;
  readonly port: OpeningPort | null;
  /** The user's requirements, sent with a generation; edits here are saved for every request. */
  readonly guidance: string;
}>();

const emit = defineEmits<{
  close: [];
  save: [slim: string];
  remove: [];
  "set-guidance": [text: string];
}>();

const { t } = useI18n();

const draft = ref("");
const guidance_draft = ref("");
const running = ref<AbortController | null>(null);
const failure = ref<string | null>(null);

watch(
  () => props.entry,
  () => {
    running.value?.abort();
    running.value = null;
    failure.value = null;
    draft.value = props.stored?.slim ?? "";
    guidance_draft.value = props.guidance;
  },
  { immediate: true },
);

const original = computed(() => props.entry?.content.trim() ?? "");
const stale = computed(
  () =>
    props.entry !== null &&
    props.stored !== null &&
    props.stored.hash !== content_hash(props.entry.content),
);
const ratio = computed(() =>
  original.value === "" ? 0 : Math.round((draft.value.trim().length / original.value.length) * 100),
);
const passes = computed(
  () =>
    props.entry !== null &&
    accept_slim(
      {
        uid: props.entry.uid,
        name: props.entry.name,
        keys: props.entry.keys,
        content: props.entry.content,
      },
      draft.value,
    ),
);

async function generate(): Promise<void> {
  const entry = props.entry;
  const port = props.port;
  if (entry === null || port === null || running.value !== null) {
    return;
  }
  const controller = new AbortController();
  running.value = controller;
  failure.value = null;
  emit("set-guidance", guidance_draft.value);
  try {
    const { preamble, request } = slim_request(
      {
        uid: entry.uid,
        name: entry.name,
        keys: entry.keys,
        content: entry.content,
      },
      guidance_draft.value,
    );
    const slim = await port.request_lean(request, preamble, controller.signal);
    if (props.entry === entry) {
      draft.value = slim.trim();
    }
  } catch (caught) {
    if (!controller.signal.aborted) {
      failure.value = t("opening.errors.failed", { reason: reason(caught) });
    }
  } finally {
    if (running.value === controller) {
      running.value = null;
    }
  }
}

function close(): void {
  running.value?.abort();
  emit("close");
}
</script>

<template>
  <AppDialog
    :open="entry !== null"
    :title="t('opening.books.slim_compare_title', { name: entry?.name ?? '' })"
    :close-label="t('common.actions.close')"
    wide
    @update:open="(value) => !value && close()"
  >
    <div v-if="entry !== null" :class="styles.work_inner" data-wide>
      <div :class="styles.compare">
        <label :class="styles.compare_column">
          <span :class="styles.hint">{{
            t("opening.books.slim_original", { n: original.length })
          }}</span>
          <textarea :class="styles.compare_text" :value="original" readonly />
        </label>
        <label :class="styles.compare_column">
          <span :class="styles.hint">{{
            t("opening.books.slim_condensed", { n: draft.trim().length, ratio })
          }}</span>
          <textarea
            v-model="draft"
            :class="styles.compare_text"
            :placeholder="t('opening.books.slim_placeholder')"
          />
        </label>
      </div>
      <label :class="styles.compare_column">
        <span :class="styles.hint">{{ t("opening.books.slim_guidance") }}</span>
        <textarea
          v-model="guidance_draft"
          :class="styles.text_area_small"
          maxlength="2000"
          :placeholder="t('opening.books.slim_guidance_placeholder')"
        />
      </label>
      <p v-if="stale" :class="styles.error">{{ t("opening.books.slim_stale") }}</p>
      <p v-else-if="draft.trim() !== '' && !passes" :class="styles.hint">
        {{ t("opening.books.slim_check_warning") }}
      </p>
      <p v-if="failure !== null" :class="styles.error" role="status">{{ failure }}</p>
      <div :class="styles.row">
        <AppButton
          :label="
            draft.trim() === ''
              ? t('opening.books.slim_generate_one')
              : t('opening.books.slim_regenerate')
          "
          variant="ghost"
          :pending="running !== null"
          :disabled="port === null || running !== null"
          @click="() => void generate()"
        />
        <AppButton
          v-if="running !== null"
          :label="t('opening.status.stop')"
          variant="ghost"
          @click="running?.abort()"
        />
        <AppButton
          v-if="stored !== null"
          :label="t('opening.books.slim_revert')"
          variant="ghost"
          @click="emit('remove')"
        />
        <span :class="styles.spacer" />
        <AppButton :label="t('common.actions.cancel')" variant="ghost" @click="close" />
        <AppButton
          :label="t('common.actions.save')"
          variant="primary"
          :disabled="draft.trim() === '' || running !== null"
          @click="emit('save', draft.trim())"
        />
      </div>
    </div>
  </AppDialog>
</template>
