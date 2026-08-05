import {
  NovelAiRequestSchema,
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
import {
  execute_non_idempotent_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "../retry_policy.js";
import { map_novelai_request } from "./novelai_mapping.js";
import { parse_novelai_response } from "./novelai_response.js";

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
const RETRYABLE_STATUS_CODES = new Set([500, 502, 503, 504]);

export class NovelAiAdapter implements ProviderAdapter<NovelAiRequest> {
  readonly provider_id = "novelai" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
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
    const validated_request = parse_request(request);
    const profile = parse_profile(context.profile);
    if (!profile.model_allowlist.includes(validated_request.model_id)) {
      throw invalid_request();
    }
    const assets = await load_assets(context, validated_request, profile.max_input_asset_bytes);

    const response = await execute_non_idempotent_with_retry(
      validated_request,
      async (attempt_request, attempt) => {
        const payload = map_novelai_request(attempt_request, assets);
        const started_at = this.#clock.now();
        const transport_response = await context.transport.execute({
          route: "/ai/generate-image",
          method: "POST",
          body: new TextEncoder().encode(JSON.stringify(payload)),
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
          throw new ProviderAdapterError(
            provider_error_from_status(transport_response.status, {
              recoverable: RETRYABLE_STATUS_CODES.has(transport_response.status),
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
      },
    );

    const parsed = await parse_novelai_response(
      response.body,
      response.headers["content-type"] ?? "",
      validated_request,
      profile.max_response_bytes,
      profile.max_archive_entries,
      profile.output_mime_type_allowlist,
    );
    return {
      state: "completed",
      ...parsed,
    };
  }

  poll(
    _context: ProviderExecutionContext,
    _submission: ProviderSubmission,
  ): Promise<ProviderPollResult> {
    return Promise.reject(invalid_request());
  }

  cancel(_context: ProviderExecutionContext, _submission: ProviderSubmission): Promise<void> {
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
  const asset_ids = new Set<AssetId>();
  for (const reference of request.vibe_references ?? []) {
    asset_ids.add(reference.asset_id);
  }
  for (const reference of request.character_references ?? []) {
    asset_ids.add(reference.asset_id);
  }

  const assets = new Map<AssetId, ProviderSourceAsset>();
  for (const asset_id of asset_ids) {
    const asset = await context.assets.read(asset_id, context.signal);
    if (asset.asset_id !== asset_id || asset.bytes.byteLength > max_input_asset_bytes) {
      throw invalid_request();
    }
    assets.set(asset_id, asset);
  }
  return assets;
}
