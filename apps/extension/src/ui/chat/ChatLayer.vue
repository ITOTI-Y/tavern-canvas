<script setup lang="ts">
import type { Uuid } from "@tavern-canvas/contracts";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { HostAdapter, HostSwipeLocation } from "../../host/index.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import type { GalleryCapability, NovelAiCapability } from "../contracts/ui_capabilities.js";
import styles from "./chat.module.css";
import IllustrateDialog from "./IllustrateDialog.vue";
import type { IllustrateRequest } from "./illustrate_request.js";
import SlotCard from "./SlotCard.vue";
import { use_chat_slots } from "./use_chat_slots.js";
import { use_image_urls } from "./use_image_urls.js";

const props = defineProps<{
  readonly host: HostAdapter;
  readonly service: IllustrationService;
  readonly gallery: GalleryCapability;
  readonly novelai: NovelAiCapability;
}>();

const { t } = useI18n();
const dialog_request = ref<IllustrateRequest | null>(null);
const preview_url = ref<string | null>(null);
const load_image = use_image_urls(props.gallery);

const { targets, notices } = use_chat_slots({
  host: props.host,
  service: props.service,
  button_label: () => t("chat.message_button"),
  on_illustrate: (message_id) => {
    dialog_request.value = { message_id, slot_id: null };
  },
});

function is_pending(request_ids: readonly string[]): boolean {
  return request_ids.some((request_id) => props.service.is_pending(request_id));
}

function generate(location: HostSwipeLocation, slot_id: string): void {
  void props.service.generate(location, slot_id).catch(() => {
    // The slot records the submission error and re-renders with it.
  });
}

function select(location: HostSwipeLocation, slot_id: string, image_id: Uuid): void {
  void props.service.select_image(location, slot_id, image_id);
}

async function preview(image_id: Uuid): Promise<void> {
  preview_url.value = await load_image(image_id);
}

function close_preview_on_escape(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    preview_url.value = null;
  }
}

onMounted(() => {
  document.addEventListener("keydown", close_preview_on_escape);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", close_preview_on_escape);
});
</script>

<template>
  <Teleport v-for="target in targets" :key="target.key" :to="target.element">
    <SlotCard
      :entry="target.slot"
      :pending="is_pending(target.slot.pending_request_ids)"
      :load-image="load_image"
      @generate="generate(target.location, target.slot.slot_id)"
      @edit="
        dialog_request = { message_id: target.location.message_id, slot_id: target.slot.slot_id }
      "
      @select="(image_id) => select(target.location, target.slot.slot_id, image_id)"
      @preview="preview"
    />
  </Teleport>
  <Teleport v-for="target in notices" :key="target.key" :to="target.element">
    <div :class="styles.notice">
      <template v-if="target.notice.status === 'running'">{{
        t("chat.analysis_running")
      }}</template>
      <template v-else>
        <div>{{ t("chat.analysis_failed", { reason: target.notice.message }) }}</div>
        <pre v-if="target.notice.excerpt !== null" :class="styles.excerpt">{{
          target.notice.excerpt
        }}</pre>
        <div v-if="target.notice.excerpt !== null">{{ t("chat.dialog.parse_failed_hint") }}</div>
      </template>
    </div>
  </Teleport>
  <Teleport v-if="preview_url !== null" to="body">
    <div :class="styles.lightbox" role="dialog" @click="preview_url = null">
      <img :src="preview_url" alt="" />
    </div>
  </Teleport>
  <IllustrateDialog
    :request="dialog_request"
    :service="service"
    :novelai="novelai"
    @close="dialog_request = null"
  />
</template>
