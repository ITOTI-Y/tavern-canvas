import {
  estimate_novelai_cost,
  extract_novelai_model_ids,
  list_novelai_models,
  NOVELAI_PUBLISHED_MODEL_IDS,
  type NovelAiAccountStatus,
  type NovelAiCostEstimate,
  type NovelAiRequest,
  type ResolvedNovelAiModel,
} from "@tavern-canvas/contracts";
import type { ProviderTransport } from "@tavern-canvas/providers";

import { NovelAiServiceUnavailableError } from "./novelai_errors.js";
import type { NovelAiImageOperations } from "./novelai_image_operations.js";
import {
  count_unencoded_vibes,
  type NovelAiPreparationDeps,
} from "./novelai_request_preparation.js";

const IMAGE_PAGE_URL = "https://novelai.net/image";
const CHUNK_PATTERN = /\/_next\/static\/chunks\/[A-Za-z0-9._-]+\.js/gu;
const VIBE_REQUEST_LIMIT_BYTES = 30_000_000;

/** Fetches a public page as text through a host relay; the browser cannot read novelai.net directly. */
export type PageTextFetcher = (url: string, signal: AbortSignal) => Promise<string>;

export interface NovelAiServiceDeps {
  /** Resolves the transport of the active NovelAI profile, or throws why there is none. */
  readonly transport: () => ProviderTransport;
  readonly preparation: Pick<NovelAiPreparationDeps, "assets" | "vibe_cache" | "sha256">;
  readonly image_operations: NovelAiImageOperations;
  readonly page_fetchers: readonly PageTextFetcher[];
}

export interface NovelAiService {
  get_account(signal: AbortSignal): Promise<NovelAiAccountStatus>;
  list_models(): readonly ResolvedNovelAiModel[];
  refresh_models(signal: AbortSignal): Promise<readonly ResolvedNovelAiModel[]>;
  estimate_cost(request: NovelAiRequest, signal: AbortSignal): Promise<NovelAiCostEstimate>;
  encode_vibe(
    image: Uint8Array,
    model_id: string,
    information_extracted: number,
    signal: AbortSignal,
  ): Promise<string>;
}

async function fetch_published_model_ids(
  fetch_text: PageTextFetcher,
  signal: AbortSignal,
): Promise<readonly string[]> {
  const page = await fetch_text(IMAGE_PAGE_URL, signal);
  const chunk_urls = [...new Set(page.match(CHUNK_PATTERN) ?? [])].map(
    (path) => new URL(path, IMAGE_PAGE_URL).href,
  );
  const sources = [page];
  for (const url of chunk_urls) {
    sources.push(await fetch_text(url, signal));
  }
  return extract_novelai_model_ids(sources);
}

export function create_novelai_service(deps: NovelAiServiceDeps): NovelAiService {
  let published_ids: readonly string[] = NOVELAI_PUBLISHED_MODEL_IDS;
  let last_account: NovelAiAccountStatus | null = null;
  let account_attempted = false;

  async function get_account(signal: AbortSignal): Promise<NovelAiAccountStatus> {
    account_attempted = true;
    const { fetch_novelai_account } = await import("@tavern-canvas/providers/adapters");
    last_account = await fetch_novelai_account(deps.transport(), signal);
    return last_account;
  }

  return {
    get_account,
    list_models: () => list_novelai_models(published_ids),
    async refresh_models(signal) {
      const failures: string[] = [];
      for (const fetch_text of deps.page_fetchers) {
        try {
          const ids = await fetch_published_model_ids(fetch_text, signal);
          if (ids.length > 0) {
            published_ids = ids;
            return list_novelai_models(published_ids);
          }
          failures.push("the page named no NovelAI models");
        } catch (error) {
          failures.push(error instanceof Error ? error.message : String(error));
        }
      }
      throw new NovelAiServiceUnavailableError(
        failures.length === 0
          ? "No relay can reach novelai.net from this host; the bundled model list stays in use"
          : `The NovelAI model list could not be refreshed (${failures.join("; ")}); the bundled list stays in use`,
      );
    },
    async estimate_cost(request, signal) {
      // Free Opus generations only show once the tier is known; one failed lookup is not retried.
      if (!account_attempted) {
        await get_account(signal).catch(() => undefined);
      }
      const unencoded_vibes = await count_unencoded_vibes(deps.preparation, request, signal);
      let source_pixels: number | undefined;
      if (request.action === "upscale") {
        const bytes = (await deps.preparation.assets.read(request.image_asset_id, signal)).bytes;
        const size = await deps.image_operations.size(bytes);
        source_pixels = size.width * size.height;
      }
      return estimate_novelai_cost(request, {
        account: last_account,
        unencoded_vibes,
        ...(source_pixels === undefined ? {} : { source_pixels }),
      });
    },
    async encode_vibe(image, model_id, information_extracted, signal) {
      const { encode_novelai_vibe } = await import("@tavern-canvas/providers/adapters");
      return encode_novelai_vibe(deps.transport(), {
        image,
        model_id,
        information_extracted,
        max_request_bytes: VIBE_REQUEST_LIMIT_BYTES,
        signal,
      });
    },
  };
}
