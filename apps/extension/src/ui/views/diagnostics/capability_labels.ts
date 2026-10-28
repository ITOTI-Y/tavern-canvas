import { HOST_CAPABILITY_IDS, type HostCapabilityId } from "../../../host/index.js";

export type Translate = (key: string) => string;

export const CAPABILITY_MATRIX_IDS = HOST_CAPABILITY_IDS;

export type CapabilityMatrixId = HostCapabilityId;

export function capability_label(t: Translate, id: CapabilityMatrixId): string {
  switch (id) {
    case "main_generation_events":
      return t("diagnostics.capability_matrix.capabilities.main_generation_events");
    case "preset_generation":
      return t("diagnostics.capability_matrix.capabilities.preset_generation");
    case "message_swipe_metadata":
      return t("diagnostics.capability_matrix.capabilities.message_swipe_metadata");
    case "tavern_regex":
      return t("diagnostics.capability_matrix.capabilities.tavern_regex");
    case "tavern_helper":
      return t("diagnostics.capability_matrix.capabilities.tavern_helper");
  }
}
