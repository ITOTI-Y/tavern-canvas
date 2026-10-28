<script setup lang="ts">
import { ImagePlus } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { useI18n } from "vue-i18n";

import type { HostAdapter } from "../../host/index.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import AppIcon from "../components/AppIcon.vue";
import styles from "./chat.module.css";

const props = defineProps<{
  readonly host: HostAdapter;
  readonly service: IllustrationService;
}>();

const emit = defineEmits<{
  /** The paragraph could not be matched or analysed; the message's dialog takes over. */
  fallback: [message_id: number];
}>();

interface ParagraphTarget {
  readonly paragraph: HTMLElement;
  readonly message_id: number;
}

interface Position {
  readonly top: number;
  readonly left: number;
}

const BUTTON_SIZE_PX = 28;
const GAP_PX = 8;
const HIDE_DELAY_MS = 300;

const { t } = useI18n();
const touch = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;

const hovered = shallowRef<ParagraphTarget | null>(null);
const hover_position = ref<Position | null>(null);
const selected = shallowRef<ParagraphTarget | null>(null);
const selection_position = ref<Position | null>(null);
const busy = shallowRef<ParagraphTarget | null>(null);
const busy_position = ref<Position | null>(null);
const hover_button = ref<HTMLElement | null>(null);
let hide_timer: ReturnType<typeof setTimeout> | null = null;

/** The block of an assistant reply's text that holds `node`, skipping Inkwell's own cards. */
function paragraph_of(node: Node | null): ParagraphTarget | null {
  // The welcome screen shows replies that belong to no chat, so they cannot be illustrated.
  if (props.host.get_active_chat_id() === null) {
    return null;
  }
  const element = node instanceof Element ? node : (node?.parentElement ?? null);
  const text = element?.closest(".mes_text");
  if (element === null || text === null || text === undefined) {
    return null;
  }
  const message = text.closest(".mes");
  if (message === null || message.getAttribute("is_user") === "true") {
    return null;
  }
  const message_id = Number(message.getAttribute("mesid"));
  let block: Element = element;
  while (block.parentElement !== text) {
    if (block.parentElement === null || block === text) {
      return null;
    }
    block = block.parentElement;
  }
  const own_markup = block.matches("[data-tc-slot], [data-tc-notice]");
  if (
    !Number.isInteger(message_id) ||
    own_markup ||
    !(block instanceof HTMLElement) ||
    block.textContent.trim() === ""
  ) {
    return null;
  }
  return { paragraph: block, message_id };
}

function clamp_left(left: number): number {
  return Math.min(Math.max(GAP_PX, left), window.innerWidth - BUTTON_SIZE_PX - GAP_PX);
}

/** Beside the paragraph's right edge; on touch, after its last line, where the tap landed. */
function hover_position_of(paragraph: HTMLElement): Position {
  if (touch) {
    const range = paragraph.ownerDocument.createRange();
    range.selectNodeContents(paragraph);
    const lines = range.getClientRects();
    const last = lines[lines.length - 1];
    if (last !== undefined) {
      return {
        top: last.top + (last.height - BUTTON_SIZE_PX) / 2,
        left: clamp_left(last.right + GAP_PX / 2),
      };
    }
  }
  const rect = paragraph.getBoundingClientRect();
  return { top: rect.top, left: clamp_left(rect.right + GAP_PX) };
}

function set_hovered(target: ParagraphTarget | null): void {
  hovered.value?.paragraph.classList.remove(styles.paragraph_highlight ?? "");
  hovered.value = target;
  target?.paragraph.classList.add(styles.paragraph_highlight ?? "");
  hover_position.value = target === null ? null : hover_position_of(target.paragraph);
}

function cancel_hide(): void {
  if (hide_timer !== null) {
    clearTimeout(hide_timer);
    hide_timer = null;
  }
}

function on_pointer_over(event: PointerEvent): void {
  if (touch || busy.value !== null) {
    return;
  }
  if (event.target instanceof Node && hover_button.value?.contains(event.target)) {
    cancel_hide();
    return;
  }
  const target = paragraph_of(event.target as Node | null);
  if (target !== null) {
    cancel_hide();
    if (target.paragraph !== hovered.value?.paragraph) {
      set_hovered(target);
    }
  } else if (hovered.value !== null && hide_timer === null) {
    hide_timer = setTimeout(() => {
      hide_timer = null;
      set_hovered(null);
    }, HIDE_DELAY_MS);
  }
}

/** Touch has no hover: a tap on a paragraph shows its button, a tap elsewhere hides it. */
function on_click(event: MouseEvent): void {
  if (!touch || (event.target instanceof Node && hover_button.value?.contains(event.target))) {
    return;
  }
  set_hovered(paragraph_of(event.target as Node | null));
}

function on_selection_change(): void {
  const selection = document.getSelection();
  if (selection === null || selection.isCollapsed || selection.rangeCount === 0) {
    selected.value = null;
    selection_position.value = null;
    return;
  }
  const target = paragraph_of(selection.anchorNode);
  if (target === null || paragraph_of(selection.focusNode)?.message_id !== target.message_id) {
    selected.value = null;
    selection_position.value = null;
    return;
  }
  const rect = selection.getRangeAt(0).getBoundingClientRect();
  selected.value = target;
  selection_position.value = { top: rect.top, left: rect.left + rect.width / 2 };
}

/** Fixed buttons follow their paragraph while the chat scrolls. */
function reposition(): void {
  if (hovered.value !== null) {
    hover_position.value = hover_position_of(hovered.value.paragraph);
  }
  if (busy.value !== null) {
    busy_position.value = hover_position_of(busy.value.paragraph);
  }
  if (selected.value !== null) {
    on_selection_change();
  }
}

async function illustrate(target: ParagraphTarget): Promise<void> {
  set_hovered(null);
  selected.value = null;
  selection_position.value = null;
  document.getSelection()?.removeAllRanges();
  busy.value = target;
  busy_position.value = hover_position_of(target.paragraph);
  try {
    const index = await props.service.paragraph_index_of(
      target.message_id,
      target.paragraph.textContent,
    );
    if (index === null) {
      emit("fallback", target.message_id);
      return;
    }
    await props.service.illustrate_paragraph(target.message_id, index);
  } catch {
    emit("fallback", target.message_id);
  } finally {
    busy.value = null;
    busy_position.value = null;
  }
}

const hover_style = computed(() =>
  hover_position.value === null
    ? undefined
    : {
        top: `${String(hover_position.value.top)}px`,
        left: `${String(hover_position.value.left)}px`,
      },
);
const selection_style = computed(() =>
  selection_position.value === null
    ? undefined
    : {
        top: `${String(selection_position.value.top)}px`,
        left: `${String(selection_position.value.left)}px`,
      },
);
const busy_style = computed(() =>
  busy_position.value === null
    ? undefined
    : {
        top: `${String(busy_position.value.top)}px`,
        left: `${String(busy_position.value.left)}px`,
      },
);

onMounted(() => {
  document.addEventListener("pointerover", on_pointer_over);
  document.addEventListener("click", on_click);
  document.addEventListener("selectionchange", on_selection_change);
  window.addEventListener("scroll", reposition, { capture: true, passive: true });
  window.addEventListener("resize", reposition, { passive: true });
});

onBeforeUnmount(() => {
  cancel_hide();
  set_hovered(null);
  document.removeEventListener("pointerover", on_pointer_over);
  document.removeEventListener("click", on_click);
  document.removeEventListener("selectionchange", on_selection_change);
  window.removeEventListener("scroll", reposition, { capture: true });
  window.removeEventListener("resize", reposition);
});
</script>

<template>
  <Teleport to="body">
    <button
      v-if="hovered !== null && hover_style !== undefined"
      ref="hover_button"
      type="button"
      :class="styles.paragraph_action"
      :style="hover_style"
      :aria-label="t('chat.paragraph.illustrate')"
      :title="t('chat.paragraph.illustrate')"
      data-testid="paragraph-illustrate"
      @click="illustrate(hovered)"
    >
      <AppIcon :icon="ImagePlus" :size="16" />
    </button>
    <button
      v-if="selected !== null && selection_style !== undefined"
      type="button"
      :class="styles.paragraph_action"
      data-kind="selection"
      :style="selection_style"
      data-testid="selection-illustrate"
      @mousedown.prevent
      @click="illustrate(selected)"
    >
      <AppIcon :icon="ImagePlus" :size="16" />
      {{ t("chat.paragraph.illustrate") }}
    </button>
    <span
      v-if="busy !== null && busy_style !== undefined"
      :class="styles.paragraph_action"
      data-kind="status"
      :style="busy_style"
      role="status"
    >
      {{ t("chat.paragraph.analyzing") }}
    </span>
  </Teleport>
</template>
