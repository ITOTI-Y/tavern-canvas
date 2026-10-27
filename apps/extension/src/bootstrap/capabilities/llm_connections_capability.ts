import type { LlmConnectionRepository } from "@tavern-canvas/storage";

import { LlmConnectionService } from "../../modules/llm/llm_connection_service.js";
import type { LlmTransportPort } from "../../modules/llm/llm_connection_service.js";
import type { SecretDestinationPort } from "../../host/secret_destination.js";
import type { LlmConnectionsCapability } from "../../ui/contracts/ui_capabilities.js";

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
