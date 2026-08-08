import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import type { VocabularyCatalogClient } from "../../modules/vocabulary/vocabulary_catalog_client.js";
import type { VocabularyClient } from "../../modules/vocabulary/vocabulary_client.js";
import type {
  VocabularyCapability,
  VocabularyInstallProgressView,
} from "../../ui/contracts/ui_capabilities.js";

export interface VocabularyCapabilityDeps {
  /**
   * Resolved on first use rather than at composition time. The catalog client drags in the whole
   * package installer -- verifier, updater, msgpack store -- and a session that never opens the
   * vocabulary panel needs none of it. It also fetches from a remote host, so constructing it
   * eagerly was how a studio open became an unsolicited third-party request.
   */
  readonly load_catalog: () => Promise<VocabularyCatalogClient>;
  /** A fresh client per call site is required after an install: the search Worker holds an open
   * snapshot of the installed packages and never sees a mid-session install. */
  readonly create_client: () => Promise<VocabularyClient>;
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
  let catalog: Promise<VocabularyCatalogClient> | null = null;
  let client: Promise<VocabularyClient> | null = null;

  function active_catalog(): Promise<VocabularyCatalogClient> {
    return (catalog ??= deps.load_catalog());
  }

  function active_client(): Promise<VocabularyClient> {
    return (client ??= deps.create_client());
  }

  function recreate_client(): void {
    const disposing = client;
    client = null;
    void disposing?.then((instance) => {
      instance.dispose();
    });
  }

  return {
    async load() {
      return (await active_catalog()).list();
    },
    async search(query, category) {
      return (await active_client()).search(query, category === undefined ? {} : { category });
    },
    async next_page(cursor) {
      return (await active_client()).next_page(cursor);
    },
    async install(entry: VocabularyCatalogEntry, on_progress) {
      await (
        await active_catalog()
      ).install(entry, (progress) => {
        const view = to_progress_view(progress);
        if (view !== null) {
          on_progress?.(view);
        }
      });
      recreate_client();
    },
    cancel_install: () => {
      // Nothing can be in flight before the catalog client exists, so an unloaded catalog is a
      // no-op rather than a reason to load it.
      void catalog?.then((instance) => {
        instance.cancel();
      });
    },
  };
}
