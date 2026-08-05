import type { CapabilityMatrix, CapabilityStatus } from "@tavern-canvas/contracts";
import { gte, valid } from "semver";

import { HOST_CAPABILITY_IDS, type HostCapabilityId } from "./host_adapter.js";

export const MINIMUM_TAVERN_HELPER_VERSION = "4.9.1";

export interface ProbeTavernHelperSurface {
  readonly getTavernHelperVersion?: () => unknown;
  readonly generateRaw?: unknown;
  readonly getChatMessages?: unknown;
  readonly setChatMessages?: unknown;
}

export interface ProbeEventSourceSurface {
  readonly on?: unknown;
  readonly removeListener?: unknown;
}

export interface ProbeEventTypesSurface {
  readonly GENERATION_STARTED?: unknown;
  readonly GENERATION_STOPPED?: unknown;
  readonly GENERATION_ENDED?: unknown;
}

export interface ProbeSillyTavernContext {
  readonly eventSource?: ProbeEventSourceSurface;
  readonly eventTypes?: ProbeEventTypesSurface;
  readonly registerFunctionTool?: unknown;
  readonly unregisterFunctionTool?: unknown;
  readonly getRequestHeaders?: unknown;
}

export interface ProbeSillyTavernGlobal {
  readonly getContext: () => ProbeSillyTavernContext;
}

export interface ProbeTauriTavernHost {
  readonly api?: {
    readonly chatSurface?: {
      readonly protocolVersion?: unknown;
      readonly registerParticipant?: unknown;
    };
    readonly worldInfo?: {
      readonly getLastActivation?: unknown;
      readonly subscribeActivations?: unknown;
    };
  };
}

export interface HostProbeGlobals {
  TavernHelper: ProbeTavernHelperSurface | undefined;
  SillyTavern: ProbeSillyTavernGlobal | undefined;
  __TAURITAVERN__: ProbeTauriTavernHost | undefined;
  fetch: unknown;
}

export type BootstrapProbeResult =
  | {
      ready: true;
      matrix: CapabilityMatrix;
      helper_version: string;
    }
  | {
      ready: false;
      error_code:
        | "tavern_helper_missing"
        | "helper_version_invalid"
        | "helper_version_unsupported"
        | "helper_api_incomplete";
      missing_capabilities: string[];
    };

const REQUIRED_CAPABILITY_IDS = HOST_CAPABILITY_IDS.slice(0, 6);

function unavailable(reason: string): CapabilityStatus {
  return { available: false, reason };
}

function is_function(value: unknown): value is (...arguments_: never[]) => unknown {
  return typeof value === "function";
}

function has_main_generation_events(
  context: ProbeSillyTavernContext | undefined,
): boolean {
  return Boolean(
    context &&
      is_function(context.eventSource?.on) &&
      is_function(context.eventSource.removeListener) &&
      typeof context.eventTypes?.GENERATION_STARTED === "string" &&
      typeof context.eventTypes.GENERATION_STOPPED === "string" &&
      typeof context.eventTypes.GENERATION_ENDED === "string",
  );
}

function build_matrix(
  helper: ProbeTavernHelperSurface | undefined,
  context: ProbeSillyTavernContext | undefined,
  tauri: ProbeTauriTavernHost | undefined,
  fetch_: unknown,
): CapabilityMatrix {
  const chat_surface = tauri?.api?.chatSurface;
  const world_info = tauri?.api?.worldInfo;

  return {
    native_tool_manager:
      is_function(context?.registerFunctionTool) &&
      is_function(context.unregisterFunctionTool)
        ? { available: true }
        : unavailable("SillyTavern ToolManager API is unavailable"),
    main_generation_events: has_main_generation_events(context)
      ? { available: true }
      : unavailable("SillyTavern generation event API is unavailable"),
    private_prompt_generation: is_function(helper?.generateRaw)
      ? { available: true }
      : unavailable("TavernHelper.generateRaw is unavailable"),
    message_swipe_metadata:
      is_function(helper?.getChatMessages) &&
      is_function(helper.setChatMessages)
        ? { available: true }
        : unavailable("TavernHelper message swipe API is unavailable"),
    host_image_upload:
      is_function(context?.getRequestHeaders) && is_function(fetch_)
        ? { available: true }
        : unavailable("SillyTavern image upload API is unavailable"),
    tavern_helper: is_function(helper?.getTavernHelperVersion)
      ? { available: true }
      : unavailable("TavernHelper version API is unavailable"),
    tauri_chat_surface:
      chat_surface?.protocolVersion === 1 &&
      is_function(chat_surface.registerParticipant)
        ? { available: true }
        : unavailable("TauriTavern ChatSurface API is unavailable"),
    tauri_world_info_activation:
      is_function(world_info?.getLastActivation) &&
      is_function(world_info.subscribeActivations)
        ? { available: true }
        : unavailable("TauriTavern WorldInfo activation API is unavailable"),
    gateway_protocol: unavailable("Gateway protocol is not connected"),
  };
}

function missing_required_capabilities(matrix: CapabilityMatrix): string[] {
  return REQUIRED_CAPABILITY_IDS.filter(
    (capability_id: HostCapabilityId) =>
      matrix[capability_id]?.available !== true,
  );
}

export function probe_host_capabilities(
  globals: HostProbeGlobals,
): BootstrapProbeResult {
  const helper = globals.TavernHelper;
  const context = globals.SillyTavern?.getContext();
  const matrix = build_matrix(
    helper,
    context,
    globals.__TAURITAVERN__,
    globals.fetch,
  );

  if (helper === undefined) {
    return {
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: missing_required_capabilities(matrix),
    };
  }

  if (!is_function(helper.getTavernHelperVersion)) {
    return {
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: missing_required_capabilities(matrix),
    };
  }

  const helper_version = helper.getTavernHelperVersion();
  if (typeof helper_version !== "string" || valid(helper_version) === null) {
    return {
      ready: false,
      error_code: "helper_version_invalid",
      missing_capabilities: ["tavern_helper"],
    };
  }

  if (!gte(helper_version, MINIMUM_TAVERN_HELPER_VERSION)) {
    return {
      ready: false,
      error_code: "helper_version_unsupported",
      missing_capabilities: ["tavern_helper"],
    };
  }

  const missing_capabilities = missing_required_capabilities(matrix);
  if (missing_capabilities.length > 0) {
    return {
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities,
    };
  }

  return { ready: true, matrix, helper_version };
}
