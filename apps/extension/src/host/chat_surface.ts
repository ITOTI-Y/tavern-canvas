/** A message whose current content TauriTavern's managed ChatSurface has committed to the page. */
export interface ChatSurfaceMount {
  readonly mesid: number;
  readonly element: HTMLElement;
  readonly content: HTMLElement;
}

export type ChatSurfaceEvent =
  | { readonly type: "committed"; readonly mount: ChatSurfaceMount }
  | { readonly type: "released"; readonly mesid: number };

export const CHAT_SURFACE_PARTICIPANT_ID = "tavern-canvas/illustration-slots";

interface CommitContext {
  readonly mesid: number;
  readonly element: HTMLElement;
  readonly content: HTMLElement;
}

interface ChatSurfaceApi {
  isManagedOwnershipRequired(): boolean;
  registerParticipant(definition: {
    readonly id: string;
    readonly protocolVersion: 1;
    readonly didCommitContent: (context: CommitContext) => () => void;
  }): unknown;
}

/**
 * Under managed ownership TauriTavern unmounts and rebuilds `.mes` elements while scrolling without
 * emitting any SillyTavern event, so mounted content is tracked through its participant callbacks.
 */
export class ChatSurfaceMounts {
  readonly #mounted = new Map<number, ChatSurfaceMount>();
  readonly #listeners = new Set<(event: ChatSurfaceEvent) => void>();
  #active = false;

  get active(): boolean {
    return this.#active;
  }

  /** Called once `registerParticipant` succeeded; the host fixes the mode for the page's lifetime. */
  activate(): void {
    this.#active = true;
  }

  commit(mount: ChatSurfaceMount): () => void {
    this.#mounted.set(mount.mesid, mount);
    this.#emit({ type: "committed", mount });
    return () => {
      if (this.#mounted.get(mount.mesid) === mount) {
        this.#mounted.delete(mount.mesid);
      }
      this.#emit({ type: "released", mesid: mount.mesid });
    };
  }

  mounted(): readonly ChatSurfaceMount[] {
    return [...this.#mounted.values()];
  }

  subscribe(listener: (event: ChatSurfaceEvent) => void): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #emit(event: ChatSurfaceEvent): void {
    for (const listener of this.#listeners) {
      // A throw inside a participant callback faults the host's whole virtualization cycle.
      try {
        listener(event);
      } catch (error) {
        console.error("[TavernCanvas] chat surface listener failed", error);
      }
    }
  }
}

function read_chat_surface_api(globals: unknown): ChatSurfaceApi | null {
  const api = (globals as { __TAURITAVERN__?: { api?: { chatSurface?: unknown } } } | undefined)
    ?.__TAURITAVERN__?.api?.chatSurface;
  if (typeof api !== "object" || api === null) {
    return null;
  }
  const candidate = api as Partial<ChatSurfaceApi>;
  return typeof candidate.isManagedOwnershipRequired === "function" &&
    typeof candidate.registerParticipant === "function"
    ? (candidate as ChatSurfaceApi)
    : null;
}

/**
 * Registers the slot participant when TauriTavern runs with managed ownership. It must run from the
 * manifest's `chatSurface` hook: the host freezes its registry at the first projection.
 */
export function register_chat_surface_participant(
  globals: unknown,
  mounts: ChatSurfaceMounts,
): boolean {
  const api = read_chat_surface_api(globals);
  if (api === null || !api.isManagedOwnershipRequired()) {
    return false;
  }
  api.registerParticipant({
    id: CHAT_SURFACE_PARTICIPANT_ID,
    protocolVersion: 1,
    didCommitContent: ({ mesid, element, content }) => mounts.commit({ mesid, element, content }),
  });
  mounts.activate();
  return true;
}

export const chat_surface_mounts = new ChatSurfaceMounts();
