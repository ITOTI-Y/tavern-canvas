import type { BusinessRepositories, NamespacedRecord } from "@tavern-canvas/storage";

import type {
  AssetCategory,
  AssetRecordSummary,
  AssetsCapability,
  AssetsDomainEvent,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import {
  DomainEventEmitter,
  read_number,
  read_payload,
  read_string,
  to_json_value,
} from "./_records.js";

type CategoryRepository = Pick<
  BusinessRepositories["character_profiles"],
  "get" | "list" | "put" | "delete"
>;

/** Categories without a matching v3 store resolve to `capability_unavailable` on mutation and load as empty. */
const UNMAPPED_CATEGORY_REASON =
  "No v3 store exists for this asset category yet; character, vibe and workflow assets are stored, the rest are not.";

export interface AssetsCapabilityDeps {
  readonly repositories: BusinessRepositories;
  readonly namespace: () => string;
  readonly now: () => string;
}

const ALL_CATEGORIES: readonly AssetCategory[] = [
  "character",
  "outfit",
  "lora",
  "vibe",
  "reference",
  "workflow",
];

function repository_for(
  repositories: BusinessRepositories,
  category: AssetCategory,
): CategoryRepository | null {
  switch (category) {
    case "character":
      return repositories.character_profiles;
    case "vibe":
      return repositories.novelai_vibes;
    case "workflow":
      return repositories.comfy_workflows;
    case "outfit":
    case "lora":
    case "reference":
      return null;
  }
}

function to_summary(record: NamespacedRecord, category: AssetCategory): AssetRecordSummary {
  const payload = read_payload(record);
  return {
    id: record.id,
    category,
    record_key: record.record_key,
    display_name: read_string(payload, "display_name", record.id),
    updated_at: record.updated_at,
    payload,
  };
}

function by_order(left: NamespacedRecord, right: NamespacedRecord): number {
  const left_order = read_number(read_payload(left), "order", Number.MAX_SAFE_INTEGER);
  const right_order = read_number(read_payload(right), "order", Number.MAX_SAFE_INTEGER);
  if (left_order !== right_order) {
    return left_order - right_order;
  }
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

export function create_assets_capability(deps: AssetsCapabilityDeps): AssetsCapability {
  const events = new DomainEventEmitter<AssetsDomainEvent>();

  function require_repository(category: AssetCategory): CategoryRepository {
    const repository = repository_for(deps.repositories, category);
    if (repository === null) {
      throw capability_unavailable_error(UNMAPPED_CATEGORY_REASON);
    }
    return repository;
  }

  async function list(category: AssetCategory): Promise<readonly AssetRecordSummary[]> {
    const repository = repository_for(deps.repositories, category);
    if (repository === null) {
      return [];
    }
    const records = await repository.list(deps.namespace());
    return [...records].sort(by_order).map((record) => to_summary(record, category));
  }

  return {
    async load() {
      const entries = await Promise.all(
        ALL_CATEGORIES.map(async (category) => [category, await list(category)] as const),
      );
      return Object.fromEntries(entries) as Readonly<
        Record<AssetCategory, readonly AssetRecordSummary[]>
      >;
    },
    subscribe: (handler) => events.subscribe(handler),
    async save(category, asset) {
      const repository = require_repository(category);
      const namespace = deps.namespace();
      const existing = await repository.get(namespace, asset.id);
      const now = deps.now();
      const record: NamespacedRecord = {
        schema_version: 1,
        id: asset.id,
        namespace,
        record_key: `${namespace}:${asset.id}`,
        created_at: existing?.created_at ?? now,
        updated_at: now,
        payload: to_json_value({
          ...asset.payload,
          display_name: asset.display_name,
        }),
      };
      await repository.put(namespace, record);
      const summary = to_summary(record, category);
      events.emit({ type: "asset_upserted", asset: summary });
      return summary;
    },
    async remove(category, asset_id) {
      const repository = require_repository(category);
      await repository.delete(deps.namespace(), asset_id);
      events.emit({ type: "asset_removed", category, asset_id });
    },
    async reorder(category, ordered_ids) {
      const repository = require_repository(category);
      const namespace = deps.namespace();
      const now = deps.now();
      for (const [index, asset_id] of ordered_ids.entries()) {
        const existing = await repository.get(namespace, asset_id);
        if (existing === null) {
          continue;
        }
        await repository.put(namespace, {
          ...existing,
          updated_at: now,
          payload: to_json_value({ ...read_payload(existing), order: index }),
        });
      }
    },
  };
}
