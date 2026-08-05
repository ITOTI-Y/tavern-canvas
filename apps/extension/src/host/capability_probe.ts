import type { CapabilityMatrix, CapabilityStatus } from "@tavern-canvas/contracts";
import { gte, valid } from "semver";

import { HOST_CAPABILITY_IDS, type HostCapabilityId } from "./host_adapter.js";
import {
  inspect_sillytavern,
  type SillyTavernInspection,
} from "./sillytavern_host.js";
import {
  inspect_tauritavern,
  type TauriTavernInspection,
} from "./tauritavern_host.js";
import {
  inspect_tavern_helper,
  type TavernHelperInspection,
} from "./tavern_helper_host.js";

export const MINIMUM_TAVERN_HELPER_VERSION = "4.9.1";

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

function available_when(value: boolean, reason: string): CapabilityStatus {
  return value ? { available: true } : unavailable(reason);
}

function read_global(value: unknown, property_name: string): unknown {
  if (
    (typeof value !== "object" || value === null) &&
    typeof value !== "function"
  ) {
    return undefined;
  }
  try {
    return Reflect.get(value, property_name);
  } catch {
    return undefined;
  }
}

function build_matrix(
  helper: TavernHelperInspection,
  sillytavern: SillyTavernInspection,
  tauri: TauriTavernInspection,
): CapabilityMatrix {
  return {
    native_tool_manager: available_when(
      sillytavern.native_tool_manager,
      "SillyTavern ToolManager API is unavailable",
    ),
    main_generation_events: available_when(
      sillytavern.main_generation_events,
      "SillyTavern generation event API is unavailable",
    ),
    private_prompt_generation: available_when(
      helper.private_prompt_generation,
      "TavernHelper.generateRaw is unavailable",
    ),
    message_swipe_metadata: available_when(
      helper.message_swipe_metadata && sillytavern.message_swipe_metadata,
      "TavernHelper message swipe API is unavailable",
    ),
    host_image_upload: available_when(
      sillytavern.host_image_upload,
      "SillyTavern image upload API is unavailable",
    ),
    tavern_helper: available_when(
      helper.version.state === "available",
      "TavernHelper version API is unavailable",
    ),
    tauri_chat_surface: available_when(
      tauri.tauri_chat_surface,
      "TauriTavern ChatSurface API is unavailable",
    ),
    tauri_world_info_activation: available_when(
      tauri.tauri_world_info_activation,
      "TauriTavern WorldInfo activation API is unavailable",
    ),
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
  globals: unknown,
): BootstrapProbeResult {
  const helper = inspect_tavern_helper(read_global(globals, "TavernHelper"));
  const sillytavern = inspect_sillytavern(
    read_global(globals, "SillyTavern"),
    read_global(globals, "fetch"),
  );
  const tauri = inspect_tauritavern(
    read_global(globals, "__TAURITAVERN__"),
  );
  const matrix = build_matrix(helper, sillytavern, tauri);

  if (!helper.detected) {
    return {
      ready: false,
      error_code: "tavern_helper_missing",
      missing_capabilities: missing_required_capabilities(matrix),
    };
  }
  const version = helper.version;

  if (version.state === "missing" || version.state === "threw") {
    return {
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: missing_required_capabilities(matrix),
    };
  }

  if (version.state === "invalid") {
    return {
      ready: false,
      error_code: "helper_version_invalid",
      missing_capabilities: ["tavern_helper"],
    };
  }

  if (version.state !== "available") {
    return {
      ready: false,
      error_code: "helper_api_incomplete",
      missing_capabilities: missing_required_capabilities(matrix),
    };
  }

  const helper_version = version.value;
  if (valid(helper_version) === null) {
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
