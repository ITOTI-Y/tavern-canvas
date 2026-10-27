import type { PromptTagSelection } from "@tavern-canvas/contracts";

import type { AssetRecordSummary, ProviderProfileSummary } from "./ui_capabilities.js";

/** What the prompt tag chips read and write: the active profile's selection and the saved presets. */
export interface PromptTagsPort {
  /** `null` when no provider profile is active. */
  readonly profile: ProviderProfileSummary | null;
  readonly custom_presets: readonly AssetRecordSummary[];
  save(profile_id: string, selection: PromptTagSelection): Promise<unknown>;
}
