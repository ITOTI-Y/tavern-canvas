import type { LlmConnectionRepository } from "@tavern-canvas/storage";
import type { CharacterProfileRepository, KnowledgeEntryRepository } from "@tavern-canvas/storage";

import { LlmConnectionService } from "../../modules/llm/llm_connection_service.js";
import type { LlmTransportPort } from "../../modules/llm/llm_connection_service.js";
import { KnowledgeService } from "../../modules/library/knowledge_service.js";
import { PersonaService } from "../../modules/library/persona_service.js";
import type { SecretDestinationPort } from "../../migration/secret_transfer.js";
import type {
  KnowledgeCapability,
  LlmConnectionsCapability,
  PersonasCapability,
} from "../../ui/contracts/ui_capabilities.js";

/**
 * The three Stage 07 services already implement their capability's behaviour; what they do not
 * share is the capability contract's `load()` name for a listing. These adapters exist to bridge
 * that one difference, so the services stay free of UI-contract vocabulary and the composition
 * root stays free of per-service shims.
 */

export interface LlmConnectionsCapabilityDeps {
  readonly repository: LlmConnectionRepository;
  readonly namespace: string;
  readonly secrets: SecretDestinationPort;
  readonly transport: LlmTransportPort;
  readonly clock: () => string;
}

export function create_llm_connections_capability(
  deps: LlmConnectionsCapabilityDeps,
): LlmConnectionsCapability {
  const service = new LlmConnectionService(deps);
  return {
    load: () => service.list(),
    subscribe: (handler) => service.subscribe(handler),
    save: (draft) => service.save(draft),
    remove: (connection_id) => service.remove(connection_id),
    set_credential: (connection_id, plaintext_value) =>
      service.set_credential(connection_id, plaintext_value),
    clear_credential: (connection_id) => service.clear_credential(connection_id),
    test_connection: (connection_id) => service.test_connection(connection_id),
  };
}

export interface PersonasCapabilityDeps {
  readonly repository: CharacterProfileRepository;
  readonly namespace: string;
  readonly clock: () => string;
}

export function create_personas_capability(deps: PersonasCapabilityDeps): PersonasCapability {
  const service = new PersonaService(deps);
  return {
    load: () => service.list(),
    subscribe: (handler) => service.subscribe(handler),
    save: (draft) => service.save(draft),
    remove: (persona_id) => service.remove(persona_id),
  };
}

export interface KnowledgeCapabilityDeps {
  readonly repository: KnowledgeEntryRepository;
  readonly namespace: string;
  readonly clock: () => string;
}

export function create_knowledge_capability(deps: KnowledgeCapabilityDeps): KnowledgeCapability {
  const service = new KnowledgeService(deps);
  return {
    load: () => service.list(),
    subscribe: (handler) => service.subscribe(handler),
    save: (draft) => service.save(draft),
    set_enabled: (entry_id, enabled) => service.set_enabled(entry_id, enabled),
    remove: (entry_id) => service.remove(entry_id),
    bulk_remove: (entry_ids) => service.bulk_remove(entry_ids),
  };
}
