import { HOST_CAPABILITY_IDS, type HostCapabilityId } from "../../../host/index.js";

export type Translate = (key: string) => string;

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
