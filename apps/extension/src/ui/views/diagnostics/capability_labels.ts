import { HOST_CAPABILITY_IDS, type HostCapabilityId } from "../../../host/index.js";

export type Translate = (key: string) => string;

/** The exact nine keys `capability_probe.ts`'s `build_matrix` always populates, in the fixed
 * display order the brief calls out ("the nine capability IDs"). Reuses the host layer's own
 * `HOST_CAPABILITY_IDS` constant (a pure identifier list, not a fetch/storage/provider import --
 * roadmap rule 5 is about domain implementations, not shared ID constants) instead of redeclaring
 * it, so the two can never drift. `capability_label` below resolves each ID through a `switch`
 * with a literal translate-function call per case, never a template-interpolated lookup key, so
 * `tools/locale_check`'s dynamic-key rule can statically verify every call site -- matching
 * `route_nav.ts`'s `route_label` precedent. */
export const CAPABILITY_MATRIX_IDS = HOST_CAPABILITY_IDS;

export type CapabilityMatrixId = HostCapabilityId;

export function capability_label(t: Translate, id: CapabilityMatrixId): string {
  switch (id) {
    case "native_tool_manager":
      return t("diagnostics.capability_matrix.capabilities.native_tool_manager");
    case "main_generation_events":
      return t("diagnostics.capability_matrix.capabilities.main_generation_events");
    case "private_prompt_generation":
      return t("diagnostics.capability_matrix.capabilities.private_prompt_generation");
    case "message_swipe_metadata":
      return t("diagnostics.capability_matrix.capabilities.message_swipe_metadata");
    case "host_image_upload":
      return t("diagnostics.capability_matrix.capabilities.host_image_upload");
    case "tavern_helper":
      return t("diagnostics.capability_matrix.capabilities.tavern_helper");
    case "tauri_chat_surface":
      return t("diagnostics.capability_matrix.capabilities.tauri_chat_surface");
    case "tauri_world_info_activation":
      return t("diagnostics.capability_matrix.capabilities.tauri_world_info_activation");
    case "gateway_protocol":
      return t("diagnostics.capability_matrix.capabilities.gateway_protocol");
  }
}
