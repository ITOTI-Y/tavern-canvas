import type { IllustrationSlot } from "@tavern-canvas/contracts";
import { onBeforeUnmount, onMounted, shallowRef, type ShallowRef } from "vue";

import type { HostAdapter, HostSwipeLocation } from "../../host/index.js";
import type { IllustrationService } from "../../modules/illustration/illustration_service.js";
import { create_host_image_icon } from "../experience/host_image_icon.js";

export interface SlotTarget {
  readonly key: string;
  readonly element: HTMLElement;
  readonly location: HostSwipeLocation;
  readonly slot: IllustrationSlot;
}

export type AnalysisNotice =
  | { readonly status: "running" }
  | { readonly status: "failed"; readonly message: string; readonly excerpt: string | null }
  | { readonly status: "wardrobe_failed"; readonly message: string };

export interface AnalysisNoticeTarget {
  readonly key: string;
  readonly element: HTMLElement;
  readonly notice: AnalysisNotice;
}

export interface ChatSlotsOptions {
  readonly host: HostAdapter;
  readonly service: IllustrationService;
  readonly button_label: () => string;
  readonly on_illustrate: (message_id: number) => void;
}

export interface ChatSlots {
  readonly targets: ShallowRef<readonly SlotTarget[]>;
  readonly notices: ShallowRef<readonly AnalysisNoticeTarget[]>;
}

const BUTTON_ATTRIBUTE = "data-tc-illustrate";
const NOTICE_ATTRIBUTE = "data-tc-notice";
const CHAT_RESCAN_DELAY_MS = 50;

function location_key(location: HostSwipeLocation): string {
  return `${location.chat_id}:${String(location.message_id)}:${String(location.swipe_id)}`;
}

/** Re-reads slot elements whenever SillyTavern rebuilds a message, since each rebuild replaces the DOM. */
export function use_chat_slots(options: ChatSlotsOptions): ChatSlots {
  const { host, service } = options;
  const targets = shallowRef<readonly SlotTarget[]>([]);
  const notices = shallowRef<readonly AnalysisNoticeTarget[]>([]);
  const targets_by_message = new Map<number, readonly SlotTarget[]>();
  const notice_by_location = new Map<string, AnalysisNotice>();
  const wardrobe_notice_by_location = new Map<string, AnalysisNotice>();
  const unsubscribes: (() => void)[] = [];
  let rescan_timer: ReturnType<typeof setTimeout> | null = null;

  function ensure_button(text_element: HTMLElement, message_id: number): void {
    const message_element = text_element.closest(".mes");
    const container =
      message_element?.querySelector(".extraMesButtons") ??
      message_element?.querySelector(".mes_buttons");
    if (container === null || container === undefined) {
      return;
    }
    // Only assistant replies are illustrated.
    if (message_element?.getAttribute("is_user") === "true") {
      return;
    }
    if (container.querySelector(`[${BUTTON_ATTRIBUTE}]`) !== null) {
      return;
    }
    const button = text_element.ownerDocument.createElement("div");
    button.className = "mes_button interactable";
    button.append(create_host_image_icon(text_element.ownerDocument));
    button.setAttribute(BUTTON_ATTRIBUTE, "");
    button.setAttribute("role", "button");
    button.tabIndex = 0;
    button.title = options.button_label();
    button.addEventListener("click", () => {
      options.on_illustrate(message_id);
    });
    container.prepend(button);
  }

  function notice_element(text_element: HTMLElement): HTMLElement {
    const existing = text_element.parentElement?.querySelector<HTMLElement>(
      `:scope > [${NOTICE_ATTRIBUTE}]`,
    );
    if (existing !== null && existing !== undefined) {
      return existing;
    }
    const element = text_element.ownerDocument.createElement("div");
    element.setAttribute(NOTICE_ATTRIBUTE, "");
    text_element.after(element);
    return element;
  }

  function process(location: HostSwipeLocation): void {
    const text_element = host.find_message_element(location.message_id);
    if (text_element === null) {
      targets_by_message.delete(location.message_id);
      return;
    }
    ensure_button(text_element, location.message_id);
    const slots = service.read(location)?.slots ?? [];
    const found: SlotTarget[] = [];
    for (const element of text_element.querySelectorAll<HTMLElement>("[data-tc-slot]")) {
      const slot = slots.find((candidate) => candidate.slot_id === element.dataset.tcSlot);
      if (slot !== undefined) {
        found.push({ key: `${location_key(location)}:${slot.slot_id}`, element, location, slot });
      }
    }
    targets_by_message.set(location.message_id, found);
  }

  function publish(): void {
    targets.value = [...targets_by_message.values()].flat();
    const entries = [
      ...[...notice_by_location.entries()].map(([key, notice]) => [key, key, notice] as const),
      ...[...wardrobe_notice_by_location.entries()].map(
        ([key, notice]) => [`wardrobe:${key}`, key, notice] as const,
      ),
    ];
    notices.value = entries.flatMap(([key, location, notice]) => {
      const message_id = Number(location.split(":").at(-2));
      const text_element = host.find_message_element(message_id);
      return text_element === null ? [] : [{ key, element: notice_element(text_element), notice }];
    });
  }

  async function scan_message(message_id: number): Promise<void> {
    try {
      process(await service.active_location(message_id));
    } catch {
      targets_by_message.delete(message_id);
    }
    publish();
  }

  async function scan_all(): Promise<void> {
    targets_by_message.clear();
    try {
      const chat = await host.get_active_chat();
      for (const message of chat.messages) {
        if (message.role === "assistant") {
          process({
            chat_id: chat.chat_id,
            message_id: message.message_id,
            swipe_id: message.active_swipe_id,
          });
        }
      }
    } catch {
      // No chat is open; nothing to render.
    }
    publish();
  }

  function schedule_scan_all(): void {
    if (rescan_timer !== null) {
      clearTimeout(rescan_timer);
    }
    rescan_timer = setTimeout(() => {
      rescan_timer = null;
      void scan_all();
    }, CHAT_RESCAN_DELAY_MS);
  }

  onMounted(() => {
    unsubscribes.push(
      host.subscribe_message_rendered((message_id) => {
        void scan_message(message_id);
      }),
      host.subscribe_message_released((message_id) => {
        targets_by_message.delete(message_id);
        publish();
      }),
      host.subscribe_chat_rendered(() => {
        notice_by_location.clear();
        wardrobe_notice_by_location.clear();
        schedule_scan_all();
      }),
      service.subscribe((event) => {
        const key = location_key(event.location);
        if (event.type === "wardrobe_failed") {
          wardrobe_notice_by_location.set(key, {
            status: "wardrobe_failed",
            message: event.message,
          });
        } else if (event.type === "analysis_started") {
          notice_by_location.set(key, { status: "running" });
        } else if (event.type === "analysis_failed") {
          notice_by_location.set(key, {
            status: "failed",
            message: event.message,
            excerpt: event.excerpt,
          });
        } else {
          notice_by_location.delete(key);
        }
        void scan_message(event.location.message_id);
      }),
    );
    void scan_all();
  });

  onBeforeUnmount(() => {
    for (const unsubscribe of unsubscribes.splice(0)) {
      unsubscribe();
    }
    if (rescan_timer !== null) {
      clearTimeout(rescan_timer);
    }
    for (const element of document.querySelectorAll(
      `[${BUTTON_ATTRIBUTE}], [${NOTICE_ATTRIBUTE}]`,
    )) {
      element.remove();
    }
  });

  return { targets, notices };
}
