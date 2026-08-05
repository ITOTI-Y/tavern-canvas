export type TauriWorldInfoActivationPosition =
  "before" | "after" | "an_top" | "an_bottom" | "depth" | "em_top" | "em_bottom" | "outlet";

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

export type HostWorldInfoActivationHandler = (batch: HostWorldInfoActivationBatch) => void;

export type TauriTavernHostUnsubscribe = () => void | Promise<void>;

export interface TauriTavernWorldInfoSurface {
  getLastActivation(): Promise<unknown>;
  subscribeActivations(handler: (batch: unknown) => void): Promise<unknown>;
}

export type TauriChatSurfaceDisposer = (() => void) | { readonly dispose: () => void };

export interface TauriChatSurfaceDetachedContext {
  readonly message_id: number;
  readonly content: HTMLElement;
}

export interface TauriChatSurfaceMountedContext extends TauriChatSurfaceDetachedContext {
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
    activate: (context: TauriChatSurfaceRuntimeContext) => TauriChatSurfaceDisposer,
  ): void;
}

export interface TauriChatSurfaceParticipant {
  readonly id: string;
  prepare_content?(
    context: TauriChatSurfaceDetachedContext,
    claims: TauriChatSurfaceRuntimeClaims,
  ): void;
  did_mount?(context: TauriChatSurfaceMountedContext): void | TauriChatSurfaceDisposer;
  did_commit_content?(context: TauriChatSurfaceMountedContext): void | TauriChatSurfaceDisposer;
}

export interface TauriChatSurfaceRegistration {
  report_fault(error: unknown): void;
}

export interface TauriTavernChatSurfaceDetachedContextSurface {
  readonly mesid: number;
  readonly content: HTMLElement;
}

export interface TauriTavernChatSurfaceMountedContextSurface extends TauriTavernChatSurfaceDetachedContextSurface {
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
    activate: (context: TauriTavernChatSurfaceRuntimeContextSurface) => TauriChatSurfaceDisposer,
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
  registerParticipant(participant: TauriTavernChatSurfaceParticipantSurface): unknown;
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
  readonly __TAURITAVERN__?: unknown;
  readonly __TAURITAVERN_MAIN_READY__?: Promise<void> | undefined;
}

function is_property_container(value: unknown): value is object {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

function is_plain_record(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  try {
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  } catch {
    return false;
  }
}

function read_property(
  value: object,
  property_name: string,
): { readonly ok: true; readonly value: unknown } | { readonly ok: false } {
  try {
    return { ok: true, value: Reflect.get(value, property_name) };
  } catch {
    return { ok: false };
  }
}

export interface TauriTavernInspection {
  readonly tauri_chat_surface: boolean;
  readonly tauri_world_info_activation: boolean;
}

function has_function_property(value: object, property_name: string): boolean {
  const property = read_property(value, property_name);
  return property.ok && typeof property.value === "function";
}

function read_property_container(value: object, property_name: string): object | undefined {
  const property = read_property(value, property_name);
  return property.ok && is_property_container(property.value) ? property.value : undefined;
}

export function inspect_tauritavern(value: unknown): TauriTavernInspection {
  const unavailable: TauriTavernInspection = {
    tauri_chat_surface: false,
    tauri_world_info_activation: false,
  };
  if (!is_property_container(value)) {
    return unavailable;
  }
  const abi_version = read_property(value, "abiVersion");
  if (!abi_version.ok || abi_version.value !== 1) {
    return unavailable;
  }
  const api = read_property_container(value, "api");
  if (api === undefined) {
    return unavailable;
  }

  const chat_surface = read_property_container(api, "chatSurface");
  const chat_protocol =
    chat_surface === undefined
      ? { ok: false as const }
      : read_property(chat_surface, "protocolVersion");
  const world_info = read_property_container(api, "worldInfo");
  return {
    tauri_chat_surface:
      chat_surface !== undefined &&
      chat_protocol.ok &&
      chat_protocol.value === 1 &&
      has_function_property(chat_surface, "isManagedOwnershipRequired") &&
      has_function_property(chat_surface, "registerParticipant"),
    tauri_world_info_activation:
      world_info !== undefined &&
      has_function_property(world_info, "getLastActivation") &&
      has_function_property(world_info, "subscribeActivations"),
  };
}

function normalize_disposer(disposer: unknown, allow_undefined = true): void | (() => void) {
  if (disposer === undefined && allow_undefined) {
    return undefined;
  }

  let dispose: () => void;
  if (typeof disposer === "function") {
    dispose = () => Reflect.apply(disposer, undefined, []);
  } else if (is_property_container(disposer)) {
    const dispose_method = read_property(disposer, "dispose");
    if (!dispose_method.ok || typeof dispose_method.value !== "function") {
      throw new Error("TauriTavern returned an invalid ChatSurface disposer");
    }
    const dispose_function = dispose_method.value;
    dispose = () => Reflect.apply(dispose_function, disposer, []);
  } else {
    throw new Error("TauriTavern returned an invalid ChatSurface disposer");
  }

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

function is_activation_position(value: unknown): value is TauriWorldInfoActivationPosition {
  return (
    value === "before" ||
    value === "after" ||
    value === "an_top" ||
    value === "an_bottom" ||
    value === "depth" ||
    value === "em_top" ||
    value === "em_bottom" ||
    value === "outlet"
  );
}

function invalid_activation(): never {
  throw new Error("TauriTavern returned an invalid WorldInfo activation");
}

function has_plain_activation_records(value: unknown): boolean {
  if (!is_plain_record(value)) {
    return false;
  }
  const entries = read_property(value, "entries");
  if (!entries.ok) {
    return false;
  }
  try {
    if (!Array.isArray(entries.value)) {
      return false;
    }
    for (let index = 0; index < entries.value.length; index += 1) {
      if (!is_plain_record(entries.value[index])) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

function normalize_activation(batch: unknown): HostWorldInfoActivationBatch {
  if (!has_plain_activation_records(batch)) {
    return invalid_activation();
  }
  let clone: unknown;
  try {
    clone = structuredClone(batch);
  } catch {
    return invalid_activation();
  }
  if (!is_plain_record(clone)) {
    return invalid_activation();
  }

  const { timestampMs, trigger, entries } = clone;
  if (
    typeof timestampMs !== "number" ||
    !Number.isFinite(timestampMs) ||
    typeof trigger !== "string" ||
    trigger.length === 0 ||
    !Array.isArray(entries)
  ) {
    return invalid_activation();
  }

  const normalized_entries: HostWorldInfoActivationEntry[] = [];
  for (const entry of entries) {
    if (!is_plain_record(entry)) {
      return invalid_activation();
    }
    const { world, uid, displayName, constant, position } = entry;
    if (
      typeof world !== "string" ||
      (typeof uid !== "string" && (typeof uid !== "number" || !Number.isFinite(uid))) ||
      typeof displayName !== "string" ||
      typeof constant !== "boolean" ||
      (position !== undefined && !is_activation_position(position))
    ) {
      return invalid_activation();
    }
    normalized_entries.push({
      world,
      uid,
      display_name: displayName,
      constant,
      ...(position === undefined ? {} : { position }),
    });
  }

  return {
    timestamp_ms: timestampMs,
    trigger,
    entries: normalized_entries,
  };
}

export class TauriTavernHost {
  readonly #tauri: TauriTavernGlobalSurface;

  constructor(tauri: TauriTavernGlobalSurface) {
    this.#tauri = tauri;
  }

  register_chat_surface(participant: TauriChatSurfaceParticipant): TauriChatSurfaceRegistration {
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
                      return normalize_disposer(disposer, false) ?? (() => undefined);
                    });
                  },
                },
              );
            },
          }),
      ...(participant.did_mount === undefined
        ? {}
        : {
            didMount: (context: TauriTavernChatSurfaceMountedContextSurface) =>
              normalize_disposer(participant.did_mount?.(normalize_mounted_context(context))),
          }),
      ...(participant.did_commit_content === undefined
        ? {}
        : {
            didCommitContent: (context: TauriTavernChatSurfaceMountedContextSurface) =>
              normalize_disposer(
                participant.did_commit_content?.(normalize_mounted_context(context)),
              ),
          }),
    });

    if (!is_property_container(registration)) {
      throw new Error("TauriTavern returned an invalid ChatSurface registration");
    }
    const fault = read_property(registration, "fault");
    if (!fault.ok || typeof fault.value !== "function") {
      throw new Error("TauriTavern returned an invalid ChatSurface registration");
    }

    const fault_function = fault.value;
    return {
      report_fault: (error) => Reflect.apply(fault_function, registration, [error]),
    };
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
    if (typeof unsubscribe !== "function") {
      throw new Error("TauriTavern returned an invalid WorldInfo unsubscribe");
    }
    let disposed = false;
    return async () => {
      if (disposed) {
        return;
      }
      disposed = true;
      await Reflect.apply(unsubscribe, undefined, []);
    };
  }
}

export async function create_tauritavern_host(
  globals: TauriDetectionGlobals,
): Promise<TauriTavernHost | undefined> {
  const raw_tauri_property = read_property(globals, "__TAURITAVERN__");
  if (!raw_tauri_property.ok || !is_property_container(raw_tauri_property.value)) {
    return undefined;
  }
  const raw_tauri = raw_tauri_property.value;
  const abi_version = read_property(raw_tauri, "abiVersion");
  if (!abi_version.ok || abi_version.value !== 1) {
    return undefined;
  }

  const ready = read_property(raw_tauri, "ready");
  if (!ready.ok) {
    return undefined;
  }
  let readiness = ready.value;
  if (readiness === null || readiness === undefined) {
    const fallback = read_property(globals, "__TAURITAVERN_MAIN_READY__");
    if (!fallback.ok) {
      return undefined;
    }
    readiness = fallback.value;
  }
  await readiness;
  return new TauriTavernHost(raw_tauri as unknown as TauriTavernGlobalSurface);
}
