import {
  MAX_PROVIDER_SEED,
  NovelAiRequestSchema,
  is_novelai_diffusion_request,
  type AssetId,
  type NovelAiRequest,
  type ProviderCapability,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import { invalid_request } from "../image_bytes.js";
import type {
  ProviderAdapter,
  ProviderExecutionContext,
  ProviderPollResult,
  ProviderProfile,
  ProviderSourceAsset,
  ProviderSubmission,
} from "../provider_adapter.js";
import { ProviderAdapterError, provider_error_from_status } from "../provider_error.js";
import { redact_provider_log } from "../redaction.js";
import { derive_provider_request_limit } from "../provider_transport.js";
import {
  execute_non_idempotent_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "../retry_policy.js";
import { map_novelai_request, novelai_request_asset_ids } from "./novelai_mapping.js";
import { parse_novelai_response, type NovelAiExpectedOutput } from "./novelai_response.js";

// A subscription account answers 429 while another of its images is generating, with a Retry-After
// well under a second; the backoff has to outlast several queued generations of a few seconds each.
const NOVELAI_RETRY = { max_retries: 6, base_delay_ms: 2_000, max_delay_ms: 15_000 } as const;

const NovelAiProfileSchema = z
  .strictObject({
    profile_id: z.string().trim().min(1).max(128),
    provider_id: z.literal("novelai"),
    model_allowlist: z.array(z.string().trim().min(1).max(128)).min(1).max(32),
    output_mime_type_allowlist: z
      .array(z.enum(["image/png", "image/webp"]))
      .min(1)
      .max(2),
    max_response_bytes: z.number().int().positive().max(100_000_000),
    max_archive_entries: z.number().int().min(1).max(32),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000).default(20_000_000),
  })
  .check((context) => {
    for (const property_name of ["model_allowlist", "output_mime_type_allowlist"] as const) {
      const values = context.value[property_name];
      if (new Set(values).size !== values.length) {
        context.issues.push({
          code: "custom",
          input: values,
          message: `${property_name} must not contain duplicates`,
          path: [property_name],
        });
      }
    }
  });

type NovelAiProfile = z.infer<typeof NovelAiProfileSchema>;

export interface NovelAiAdapterOptions {
  readonly clock?: RetryClock;
  readonly random?: RetryRandomSource;
}

const DEFAULT_RANDOM: RetryRandomSource = { next: Math.random };

export class NovelAiAdapter implements ProviderAdapter<NovelAiRequest> {
  readonly provider_id = "novelai" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
    "image_to_image",
    "reference_image",
    "seed",
  ]);
  readonly #clock: RetryClock;
  readonly #random: RetryRandomSource;

  constructor(options: NovelAiAdapterOptions = {}) {
    this.#clock = options.clock ?? new SystemRetryClock();
    this.#random = options.random ?? DEFAULT_RANDOM;
  }

  validate_profile(profile: unknown): ProviderProfile {
    return NovelAiProfileSchema.parse(profile);
  }

  async submit(
    context: ProviderExecutionContext,
    request: NovelAiRequest,
  ): Promise<ProviderSubmission> {
    const validated_request = this.#with_seed(parse_request(request));
    const profile = parse_profile(context.profile);
    if (
      is_novelai_diffusion_request(validated_request) &&
      !profile.model_allowlist.includes(validated_request.model_id)
    ) {
      throw invalid_request();
    }
    const assets = await load_assets(context, validated_request, profile.max_input_asset_bytes);
    const max_request_bytes = derive_provider_request_limit(profile.max_input_asset_bytes);

    const response = await execute_non_idempotent_with_retry(
      validated_request,
      async (attempt_request, attempt) => {
        const payload = map_novelai_request(attempt_request, assets);
        const started_at = this.#clock.now();
        const transport_response = await context.transport.execute({
          route: payload.route,
          method: "POST",
          body: new TextEncoder().encode(JSON.stringify(payload.body)),
          max_request_bytes,
          content_type: "application/json",
          accept: "application/json, application/zip, multipart/mixed",
          max_response_bytes: profile.max_response_bytes,
          signal: context.signal,
        });
        context.log.write(
          redact_provider_log({
            provider_id: this.provider_id,
            request_id: attempt_request.request_id,
            attempt,
            status_code: transport_response.status,
            duration_ms: Math.max(0, this.#clock.now() - started_at),
            byte_count: transport_response.body.byteLength,
          }),
        );
        if (transport_response.status === 451) {
          throw new ProviderAdapterError({
            code: "content_blocked",
            retryable: false,
            status_code: 451,
          });
        }
        if (transport_response.status < 200 || transport_response.status >= 300) {
          const retry_after_ms = parse_retry_after(
            transport_response.headers["retry-after"] ?? null,
            this.#clock.now(),
          );
          // A 5xx may arrive after NovelAI has charged Anlas, so only rejections it never billed are retried.
          throw new ProviderAdapterError(
            provider_error_from_status(transport_response.status, {
              recoverable: false,
              ...(retry_after_ms === undefined ? {} : { retry_after_ms }),
            }),
          );
        }
        return transport_response;
      },
      {
        signal: context.signal,
        clock: this.#clock,
        random: this.#random,
        ...NOVELAI_RETRY,
      },
    );

    const parsed = await parse_novelai_response(
      response.body,
      response.headers["content-type"] ?? "",
      expected_output(validated_request),
      profile.max_response_bytes,
      profile.max_archive_entries,
      profile.output_mime_type_allowlist,
    );
    return {
      state: "completed",
      ...parsed,
    };
  }

  #with_seed(request: NovelAiRequest): NovelAiRequest {
    if (!is_novelai_diffusion_request(request) || request.seed !== undefined) {
      return request;
    }
    return { ...request, seed: Math.floor(this.#random.next() * MAX_PROVIDER_SEED) };
  }

  poll(
    _context: ProviderExecutionContext,
    _submission: ProviderSubmission,
  ): Promise<ProviderPollResult> {
    return Promise.reject(invalid_request());
  }

  cancel(
    _context: ProviderExecutionContext,
    _submission: ProviderSubmission | undefined,
  ): Promise<void> {
    return Promise.reject(invalid_request());
  }
}

function parse_request(request: NovelAiRequest): NovelAiRequest {
  const result = NovelAiRequestSchema.safeParse(request);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_profile(profile: ProviderProfile): NovelAiProfile {
  const result = NovelAiProfileSchema.safeParse(profile);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

async function load_assets(
  context: ProviderExecutionContext,
  request: NovelAiRequest,
  max_input_asset_bytes: number,
): Promise<ReadonlyMap<AssetId, ProviderSourceAsset>> {
  const asset_ids: readonly AssetId[] = novelai_request_asset_ids(request);
  const assets = new Map<AssetId, ProviderSourceAsset>();
  let total_bytes = 0;
  for (const asset_id of asset_ids) {
    const asset = await context.assets.read(asset_id, context.signal);
    const asset_bytes = asset.bytes.byteLength;
    if (
      asset.asset_id !== asset_id ||
      asset_bytes > max_input_asset_bytes ||
      asset_bytes > max_input_asset_bytes - total_bytes
    ) {
      throw invalid_request();
    }
    total_bytes += asset_bytes;
    assets.set(asset_id, asset);
  }
  return assets;
}

function expected_output(request: NovelAiRequest): NovelAiExpectedOutput {
  if (!is_novelai_diffusion_request(request)) {
    return { request_id: request.request_id, output_count: 1 };
  }
  return {
    request_id: request.request_id,
    output_count: request.output_count,
    width: request.width,
    height: request.height,
    ...(request.seed === undefined ? {} : { seed: request.seed }),
  };
}
