export type TauriWorldInfoActivationPosition =
  | "before"
  | "after"
  | "an_top"
  | "an_bottom"
  | "depth"
  | "em_top"
  | "em_bottom"
  | "outlet";

export interface TauriWorldInfoActivationEntrySurface {
  readonly world: string;
  readonly uid: string | number;
  readonly displayName: string;
  readonly constant: boolean;
  readonly position?: TauriWorldInfoActivationPosition;
}

export interface TauriWorldInfoActivationBatchSurface {
  readonly timestampMs: number;
  readonly trigger: string;
  readonly entries: readonly TauriWorldInfoActivationEntrySurface[];
}

export interface HostWorldInfoActivationEntry {
  readonly world: string;
  readonly uid: string | number;
  readonly display_name: string;
  readonly constant: boolean;
  readonly position?: TauriWorldInfoActivationPosition;
}

export interface HostWorldInfoActivationBatch {
  readonly timestamp_ms: number;
  readonly trigger: string;
  readonly entries: readonly HostWorldInfoActivationEntry[];
}

export type HostWorldInfoActivationHandler = (
  batch: HostWorldInfoActivationBatch,
) => void;

export type TauriTavernHostUnsubscribe = () => void | Promise<void>;

export interface TauriTavernWorldInfoSurface {
  getLastActivation(): Promise<TauriWorldInfoActivationBatchSurface | null>;
  subscribeActivations(
    handler: (batch: TauriWorldInfoActivationBatchSurface) => void,
  ): Promise<TauriTavernHostUnsubscribe>;
}

export type TauriChatSurfaceDisposer =
  | (() => void)
  | { readonly dispose: () => void };

export interface TauriChatSurfaceDetachedContext {
  readonly message_id: number;
  readonly content: HTMLElement;
}

export interface TauriChatSurfaceMountedContext
  extends TauriChatSurfaceDetachedContext {
  readonly element: HTMLElement;
  readonly signal: AbortSignal;
}

export interface TauriChatSurfaceRuntimeContext {
  readonly message_id: number;
  readonly source: Element;
  readonly element: HTMLElement;
  readonly content: HTMLElement;
  readonly signal: AbortSignal;
}

export interface TauriChatSurfaceRuntimeClaims {
  claim(
    source: Element,
    activate: (
      context: TauriChatSurfaceRuntimeContext,
    ) => TauriChatSurfaceDisposer,
  ): void;
}

export interface TauriChatSurfaceParticipant {
  readonly id: string;
  prepare_content?(
    context: TauriChatSurfaceDetachedContext,
    claims: TauriChatSurfaceRuntimeClaims,
  ): void;
  did_mount?(
    context: TauriChatSurfaceMountedContext,
  ): void | TauriChatSurfaceDisposer;
  did_commit_content?(
    context: TauriChatSurfaceMountedContext,
  ): void | TauriChatSurfaceDisposer;
}

export interface TauriChatSurfaceRegistration {
  report_fault(error: unknown): void;
}

export interface TauriTavernChatSurfaceDetachedContextSurface {
  readonly mesid: number;
  readonly content: HTMLElement;
}

export interface TauriTavernChatSurfaceMountedContextSurface
  extends TauriTavernChatSurfaceDetachedContextSurface {
  readonly element: HTMLElement;
  readonly signal: AbortSignal;
}

export interface TauriTavernChatSurfaceRuntimeContextSurface {
  readonly mesid: number;
  readonly source: Element;
  readonly element: HTMLElement;
  readonly content: HTMLElement;
  readonly signal: AbortSignal;
}

export interface TauriTavernChatSurfaceRuntimeClaimsSurface {
  claim(
    source: Element,
    activate: (
      context: TauriTavernChatSurfaceRuntimeContextSurface,
    ) => TauriChatSurfaceDisposer,
  ): void;
}

export interface TauriTavernChatSurfaceParticipantSurface {
  readonly id: string;
  readonly protocolVersion: 1;
  readonly prepareContent?: (
    context: TauriTavernChatSurfaceDetachedContextSurface,
    claims: TauriTavernChatSurfaceRuntimeClaimsSurface,
  ) => void;
  readonly didMount?: (
    context: TauriTavernChatSurfaceMountedContextSurface,
  ) => void | TauriChatSurfaceDisposer;
  readonly didCommitContent?: (
    context: TauriTavernChatSurfaceMountedContextSurface,
  ) => void | TauriChatSurfaceDisposer;
}

export interface TauriTavernChatSurfaceSurface {
  readonly protocolVersion: 1;
  isManagedOwnershipRequired(): boolean;
  registerParticipant(
    participant: TauriTavernChatSurfaceParticipantSurface,
  ): { readonly fault: (error: unknown) => void };
}

export interface TauriTavernGlobalSurface {
  readonly abiVersion: 1;
  readonly ready: Promise<void> | null;
  readonly api?: {
    readonly chatSurface?: TauriTavernChatSurfaceSurface;
    readonly worldInfo?: TauriTavernWorldInfoSurface;
  };
}

export interface TauriDetectionGlobals {
  readonly __TAURITAVERN__?: TauriTavernGlobalSurface | undefined;
}

function normalize_disposer(
  disposer: void | TauriChatSurfaceDisposer,
): void | (() => void) {
  if (disposer === undefined) {
    return undefined;
  }

  const dispose =
    typeof disposer === "function" ? disposer : () => disposer.dispose();
  let disposed = false;
  return () => {
    if (disposed) {
      return;
    }
    disposed = true;
    dispose();
  };
}

function normalize_mounted_context(
  context: TauriTavernChatSurfaceMountedContextSurface,
): TauriChatSurfaceMountedContext {
  return {
    message_id: context.mesid,
    element: context.element,
    content: context.content,
    signal: context.signal,
  };
}

function normalize_activation(
  batch: TauriWorldInfoActivationBatchSurface,
): HostWorldInfoActivationBatch {
  return {
    timestamp_ms: batch.timestampMs,
    trigger: batch.trigger,
    entries: batch.entries.map((entry) => ({
      world: entry.world,
      uid: entry.uid,
      display_name: entry.displayName,
      constant: entry.constant,
      ...(entry.position === undefined ? {} : { position: entry.position }),
    })),
  };
}

export class TauriTavernHost {
  readonly #tauri: TauriTavernGlobalSurface;

  constructor(tauri: TauriTavernGlobalSurface) {
    this.#tauri = tauri;
  }

  register_chat_surface(
    participant: TauriChatSurfaceParticipant,
  ): TauriChatSurfaceRegistration {
    const chat_surface = this.#tauri.api?.chatSurface;
    if (chat_surface === undefined) {
      throw new Error("TauriTavern ChatSurface API is unavailable");
    }

    const registration = chat_surface.registerParticipant({
      id: participant.id,
      protocolVersion: 1,
      ...(participant.prepare_content === undefined
        ? {}
        : {
            prepareContent: (
              context: TauriTavernChatSurfaceDetachedContextSurface,
              claims: TauriTavernChatSurfaceRuntimeClaimsSurface,
            ) => {
              participant.prepare_content?.(
                { message_id: context.mesid, content: context.content },
                {
                  claim: (source, activate) => {
                    claims.claim(source, (runtime_context) => {
                      const disposer = activate({
                        message_id: runtime_context.mesid,
                        source: runtime_context.source,
                        element: runtime_context.element,
                        content: runtime_context.content,
                        signal: runtime_context.signal,
                      });
                      return normalize_disposer(disposer) ?? (() => undefined);
                    });
                  },
                },
              );
            },
          }),
      ...(participant.did_mount === undefined
        ? {}
        : {
            didMount: (
              context: TauriTavernChatSurfaceMountedContextSurface,
            ) => normalize_disposer(participant.did_mount?.(normalize_mounted_context(context))),
          }),
      ...(participant.did_commit_content === undefined
        ? {}
        : {
            didCommitContent: (
              context: TauriTavernChatSurfaceMountedContextSurface,
            ) =>
              normalize_disposer(
                participant.did_commit_content?.(
                  normalize_mounted_context(context),
                ),
              ),
          }),
    });

    return { report_fault: (error) => registration.fault(error) };
  }

  async get_last_world_info_activation(): Promise<HostWorldInfoActivationBatch | null> {
    const world_info = this.#tauri.api?.worldInfo;
    if (world_info === undefined) {
      throw new Error("TauriTavern WorldInfo activation API is unavailable");
    }

    const activation = await world_info.getLastActivation();
    return activation === null ? null : normalize_activation(activation);
  }

  async subscribe_world_info_activation(
    handler: HostWorldInfoActivationHandler,
  ): Promise<() => Promise<void>> {
    const world_info = this.#tauri.api?.worldInfo;
    if (world_info === undefined) {
      throw new Error("TauriTavern WorldInfo activation API is unavailable");
    }

    const unsubscribe = await world_info.subscribeActivations((batch) => {
      handler(normalize_activation(batch));
    });
    let disposed = false;
    return async () => {
      if (disposed) {
        return;
      }
      disposed = true;
      await unsubscribe();
    };
  }
}

export async function create_tauritavern_host(
  globals: TauriDetectionGlobals,
): Promise<TauriTavernHost | undefined> {
  const tauri = globals.__TAURITAVERN__;
  if (tauri === undefined) {
    return undefined;
  }

  await tauri.ready;
  return new TauriTavernHost(tauri);
}
