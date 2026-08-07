import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import type { VocabularyCatalogClient } from "../../modules/vocabulary/vocabulary_catalog_client.js";
import type { VocabularyClient } from "../../modules/vocabulary/vocabulary_client.js";
import type {
  VocabularyCapability,
  VocabularyInstallProgressView,
} from "../../ui/contracts/ui_capabilities.js";

export interface VocabularyCapabilityDeps {
  readonly catalog: VocabularyCatalogClient;
  /** A fresh client per call site is required after an install: the search Worker holds an open
   * snapshot of the installed packages and never sees a mid-session install. */
  readonly create_client: () => VocabularyClient;
}

function to_progress_view(progress: {
  readonly phase: string;
  readonly received_bytes?: number;
  readonly total_bytes?: number;
}): VocabularyInstallProgressView | null {
  switch (progress.phase) {
    case "verifying_catalog_manifest":
      return { phase: "verifying_catalog_manifest" };
    case "downloading":
      return {
        phase: "downloading",
        received_bytes: progress.received_bytes ?? 0,
        total_bytes: progress.total_bytes ?? 0,
      };
    case "verifying_package":
      return { phase: "verifying_package" };
    case "installing":
      return { phase: "installing" };
    default:
      return null;
  }
}

export function create_vocabulary_capability(deps: VocabularyCapabilityDeps): VocabularyCapability {
  let client: VocabularyClient | null = null;

  function active_client(): VocabularyClient {
    client ??= deps.create_client();
    return client;
  }

  function recreate_client(): void {
    client?.dispose();
    client = null;
  }

  return {
    load: () => deps.catalog.list(),
    search: (query, category) =>
      active_client().search(query, category === undefined ? {} : { category }),
    next_page: (cursor) => active_client().next_page(cursor),
    async install(entry: VocabularyCatalogEntry, on_progress) {
      await deps.catalog.install(entry, (progress) => {
        const view = to_progress_view(progress);
        if (view !== null) {
          on_progress?.(view);
        }
      });
      recreate_client();
    },
    cancel_install: () => {
      deps.catalog.cancel();
    },
  };
}
