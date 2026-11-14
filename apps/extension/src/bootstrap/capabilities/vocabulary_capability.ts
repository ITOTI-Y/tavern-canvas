import type { VocabularyCatalogEntry } from "@tavern-canvas/contracts";

import type { VocabularyCatalogClient } from "../../modules/vocabulary/vocabulary_catalog_client.js";
import type { VocabularyClient } from "../../modules/vocabulary/vocabulary_client.js";
import type {
  InstalledVocabularyView,
  VocabularyCapability,
  VocabularyInstallProgressView,
} from "../../ui/contracts/ui_capabilities.js";

export interface VocabularyCapabilityDeps {
  /** Called on each use, so a changed catalog URL or token applies to the next check or install. */
  readonly load_catalog: () => Promise<VocabularyCatalogClient>;
  /** A fresh client is needed after an install: the search Worker holds a snapshot of the installed packages. */
  readonly create_client: () => Promise<VocabularyClient>;
  readonly read_active_package: () => Promise<InstalledVocabularyView | null>;
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
  let installing: VocabularyCatalogClient | null = null;
  let client: Promise<VocabularyClient> | null = null;

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
      return (await deps.load_catalog()).list();
    },
    async installed() {
      await (await active_client()).ready();
      return deps.read_active_package();
    },
    async search(query, category) {
      return (await active_client()).search(query, category === undefined ? {} : { category });
    },
    async lookup(query) {
      const instance = await active_client();
      return instance.is_ready || instance.has_failed ? instance.lookup(query) : null;
    },
    async prepare() {
      await (await active_client()).ready();
    },
    async next_page(cursor) {
      return (await active_client()).next_page(cursor);
    },
    async install(entry: VocabularyCatalogEntry, on_progress) {
      const catalog = await deps.load_catalog();
      installing = catalog;
      try {
        await catalog.install(entry, (progress) => {
          const view = to_progress_view(progress);
          if (view !== null) {
            on_progress?.(view);
          }
        });
      } finally {
        installing = null;
      }
      recreate_client();
    },
    cancel_install: () => {
      installing?.cancel();
    },
  };
}
