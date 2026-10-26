import type { NovelAiService } from "../../modules/novelai/novelai_service.js";
import type { NovelAiCapability } from "../../ui/contracts/ui_capabilities.js";

const ACCOUNT_TIMEOUT_MS = 30_000;
const REFRESH_TIMEOUT_MS = 120_000;
const ESTIMATE_TIMEOUT_MS = 30_000;

export function create_novelai_capability(
  load_service: () => Promise<NovelAiService>,
): NovelAiCapability {
  return {
    load: async () => (await load_service()).list_models(),
    get_account: async () =>
      (await load_service()).get_account(AbortSignal.timeout(ACCOUNT_TIMEOUT_MS)),
    refresh_models: async () =>
      (await load_service()).refresh_models(AbortSignal.timeout(REFRESH_TIMEOUT_MS)),
    estimate_cost: async (request) =>
      (await load_service()).estimate_cost(request, AbortSignal.timeout(ESTIMATE_TIMEOUT_MS)),
  };
}
