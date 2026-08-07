import { ImageIdSchema, type ImageId } from "@tavern-canvas/contracts";
import type { RuntimeModule } from "@tavern-canvas/core";

import {
  create_tauritavern_host,
  type TauriChatSurfaceMountedContext,
  type TauriChatSurfaceParticipant,
  type TauriDetectionGlobals,
  type TauriTavernHost,
} from "../../host/index.js";

export type ChatMediaInteractionAction = "click" | "double_click" | "long_press" | "context";

export interface ChatMediaInteractionEvent {
  readonly action: ChatMediaInteractionAction;
  readonly image_id: ImageId;
  readonly message_id: number;
}

/**
 * Defined here against task-6-brief.md's own shape description ("click, double-click, long-press,
 * and context actions keyed by TavernCanvas image ID") because Stage 07 Task 3 -- which owns this
 * port's canonical home, apps/extension/src/modules/media/chat_media_interactions.ts -- had not
 * merged at implementation time (that file is still Task 1's `describe.todo` placeholder). Same
 * reconciliation pattern as Stage 05/06: whichever module lands second at stage merge re-points
 * its import to the other's real definition instead of keeping two parallel port shapes. This is a
 * direct transcription of the brief text, not an invented shape.
 */
export interface ChatMediaInteractionPort {
  handle(event: ChatMediaInteractionEvent): void;
}

/**
 * The DOM contract a rendered chat message must expose for this module to find TavernCanvas-owned
 * image/video elements inside a Tauri ChatSurface `content` root. Also provisional pending T3's
 * real chat_placeholder.ts/chat_media_interactions.ts rendering code -- see the port doc comment.
 */
export const TAVERN_CANVAS_IMAGE_ID_ATTRIBUTE = "data-tavern-canvas-image-id";

const LONG_PRESS_THRESHOLD_MS = 500;
const LONG_PRESS_MOVE_TOLERANCE_PX = 8;

export interface ChatSurfaceDiagnostics {
  readonly tauri_chat_surface_available: boolean;
  readonly reason?: string;
}

export interface ChatSurfaceModuleOptions {
  readonly globals: TauriDetectionGlobals;
  readonly port: ChatMediaInteractionPort;
  /** Test/production seam. Production defaults to create_tauritavern_host (host/tauritavern_host.ts)
   * -- the same capability-probing entry point capability_probe.ts already uses, so this module
   * never reads any Tauri global beyond the one documented readiness entry it delegates to. */
  readonly connect?: (globals: TauriDetectionGlobals) => Promise<TauriTavernHost | undefined>;
}

function read_image_id(element: Element): ImageId | null {
  const raw = element.getAttribute(TAVERN_CANVAS_IMAGE_ID_ATTRIBUTE);
  if (raw === null) {
    return null;
  }
  const parsed = ImageIdSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

function find_image_id(target: EventTarget | null): ImageId | null {
  if (!(target instanceof Element)) {
    return null;
  }
  const element = target.closest(`[${TAVERN_CANVAS_IMAGE_ID_ATTRIBUTE}]`);
  return element === null ? null : read_image_id(element);
}

function failure_reason(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

/**
 * Tauri-side wiring for T3's ChatMediaInteractionPort: when TauriTavern's ChatSurface capability is
 * present, this module claims each mounted message's content and translates click/double-click/
 * long-press/context-menu gestures on TavernCanvas-owned media into port calls. Standard
 * SillyTavern hosts never see this module active (RuntimeModule.start degrades to a diagnostics-only
 * no-op when TauriTavern is absent) -- "the identical command remains available from Gallery and
 * the image parameters dialog" per the brief, unaffected by this module either way.
 */
export class TauriChatSurfaceModule implements RuntimeModule {
  readonly module_id = "tauri_chat_surface";
  readonly requires: readonly string[] = [];

  readonly #globals: TauriDetectionGlobals;
  readonly #port: ChatMediaInteractionPort;
  readonly #connect: (globals: TauriDetectionGlobals) => Promise<TauriTavernHost | undefined>;
  #host: TauriTavernHost | null = null;
  #diagnostics: ChatSurfaceDiagnostics = {
    tauri_chat_surface_available: false,
    reason: "not started",
  };

  constructor(options: ChatSurfaceModuleOptions) {
    this.#globals = options.globals;
    this.#port = options.port;
    this.#connect = options.connect ?? create_tauritavern_host;
  }

  get diagnostics(): ChatSurfaceDiagnostics {
    return this.#diagnostics;
  }

  async start(): Promise<void> {
    if (this.#host !== null) {
      return; // Idempotent: a second start() while already registered must not double-register.
    }

    let host: TauriTavernHost | undefined;
    try {
      host = await this.#connect(this.#globals);
    } catch (error) {
      this.#diagnostics = {
        tauri_chat_surface_available: false,
        reason: failure_reason(error, "TauriTavern connection failed"),
      };
      return;
    }
    if (host === undefined) {
      this.#diagnostics = {
        tauri_chat_surface_available: false,
        reason: "TauriTavern is not present on this host",
      };
      return;
    }

    try {
      host.register_chat_surface(this.#participant());
      this.#host = host;
      this.#diagnostics = { tauri_chat_surface_available: true };
    } catch (error) {
      this.#diagnostics = {
        tauri_chat_surface_available: false,
        reason: failure_reason(error, "TauriTavern ChatSurface registration failed"),
      };
    }
  }

  stop(): Promise<void> {
    this.#host = null;
    this.#diagnostics = { tauri_chat_surface_available: false, reason: "stopped" };
    return Promise.resolve();
  }

  #participant(): TauriChatSurfaceParticipant {
    return {
      id: "tavern-canvas-chat-surface",
      did_mount: (context) => this.#bind_gestures(context),
    };
  }

  #bind_gestures(context: TauriChatSurfaceMountedContext): () => void {
    const root = context.content;
    const port = this.#port;
    const message_id = context.message_id;

    let press_timer: ReturnType<typeof setTimeout> | null = null;
    let press_origin: { readonly x: number; readonly y: number } | null = null;
    let press_image_id: ImageId | null = null;
    let long_press_fired = false;

    function clear_press(): void {
      if (press_timer !== null) {
        clearTimeout(press_timer);
        press_timer = null;
      }
      press_origin = null;
      press_image_id = null;
    }

    function dispatch(action: ChatMediaInteractionAction, image_id: ImageId): void {
      port.handle({ action, image_id, message_id });
    }

    function on_click(event: MouseEvent): void {
      if (long_press_fired) {
        long_press_fired = false; // The long-press already fired the interaction; swallow the
        return; // browser's own trailing click for the same press-release cycle.
      }
      const image_id = find_image_id(event.target);
      if (image_id !== null) {
        dispatch("click", image_id);
      }
    }

    function on_dblclick(event: MouseEvent): void {
      const image_id = find_image_id(event.target);
      if (image_id !== null) {
        dispatch("double_click", image_id);
      }
    }

    function on_contextmenu(event: MouseEvent): void {
      const image_id = find_image_id(event.target);
      if (image_id !== null) {
        event.preventDefault();
        dispatch("context", image_id);
      }
    }

    function on_pointerdown(event: PointerEvent): void {
      const image_id = find_image_id(event.target);
      if (image_id === null) {
        return;
      }
      press_origin = { x: event.clientX, y: event.clientY };
      press_image_id = image_id;
      long_press_fired = false;
      press_timer = setTimeout(() => {
        if (press_image_id !== null) {
          long_press_fired = true;
          dispatch("long_press", press_image_id);
        }
      }, LONG_PRESS_THRESHOLD_MS);
    }

    function on_pointermove(event: PointerEvent): void {
      if (press_origin === null) {
        return;
      }
      const moved_x = Math.abs(event.clientX - press_origin.x);
      const moved_y = Math.abs(event.clientY - press_origin.y);
      if (moved_x > LONG_PRESS_MOVE_TOLERANCE_PX || moved_y > LONG_PRESS_MOVE_TOLERANCE_PX) {
        clear_press();
      }
    }

    function on_pointerup(): void {
      clear_press();
    }

    function on_pointercancel(): void {
      clear_press();
    }

    root.addEventListener("click", on_click);
    root.addEventListener("dblclick", on_dblclick);
    root.addEventListener("contextmenu", on_contextmenu);
    root.addEventListener("pointerdown", on_pointerdown);
    root.addEventListener("pointermove", on_pointermove);
    root.addEventListener("pointerup", on_pointerup);
    root.addEventListener("pointercancel", on_pointercancel);

    return () => {
      clear_press();
      root.removeEventListener("click", on_click);
      root.removeEventListener("dblclick", on_dblclick);
      root.removeEventListener("contextmenu", on_contextmenu);
      root.removeEventListener("pointerdown", on_pointerdown);
      root.removeEventListener("pointermove", on_pointermove);
      root.removeEventListener("pointerup", on_pointerup);
      root.removeEventListener("pointercancel", on_pointercancel);
    };
  }
}
