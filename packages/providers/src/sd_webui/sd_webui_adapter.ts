import {
  SdWebuiRequestSchema,
  type AssetId,
  type ProviderCapability,
  type SdWebuiRequest,
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
  execute_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "../retry_policy.js";
import { map_sd_webui_request } from "./sd_webui_mapping.js";
import { parse_sd_webui_response } from "./sd_webui_response.js";

const SdWebuiProfileSchema = z
  .strictObject({
    profile_id: z.string().trim().min(1).max(128),
    provider_id: z.literal("sd_webui"),
    model_allowlist: z.array(z.string().trim().min(1).max(128)).min(1).max(128),
    vae_allowlist: z.array(z.string().trim().min(1).max(128)).max(128).default([]),
    adetailer_model_allowlist: z.array(z.string().trim().min(1).max(128)).max(128).default([]),
    controlnet_model_allowlist: z.array(z.string().trim().min(1).max(128)).max(128).default([]),
    output_mime_type_allowlist: z
      .array(z.enum(["image/png", "image/jpeg", "image/webp"]))
      .min(1)
      .max(3),
    max_response_bytes: z.number().int().positive().max(100_000_000),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000).default(20_000_000),
  })
  .check((context) => {
    for (const property_name of [
      "model_allowlist",
      "vae_allowlist",
      "adetailer_model_allowlist",
      "controlnet_model_allowlist",
      "output_mime_type_allowlist",
    ] as const) {
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

type SdWebuiProfile = z.infer<typeof SdWebuiProfileSchema>;

export interface SdWebuiAdapterOptions {
  readonly clock?: RetryClock;
  readonly random?: RetryRandomSource;
}

const DEFAULT_RANDOM: RetryRandomSource = { next: Math.random };
const RETRYABLE_STATUS_CODES = new Set([500, 502, 503, 504]);

export class SdWebuiAdapter implements ProviderAdapter<SdWebuiRequest> {
  readonly provider_id = "sd_webui" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
    "image_to_image",
    "reference_image",
    "cancel",
    "seed",
  ]);
  readonly #clock: RetryClock;
  readonly #random: RetryRandomSource;

  constructor(options: SdWebuiAdapterOptions = {}) {
    this.#clock = options.clock ?? new SystemRetryClock();
    this.#random = options.random ?? DEFAULT_RANDOM;
  }

  validate_profile(profile: unknown): ProviderProfile {
    return SdWebuiProfileSchema.parse(profile);
  }

  async submit(
    context: ProviderExecutionContext,
    request: SdWebuiRequest,
  ): Promise<ProviderSubmission> {
    const validated_request = parse_request(request);
    const profile = parse_profile(context.profile);
    assert_profile_allows_request(profile, validated_request);
    const assets = await load_assets(context, validated_request, profile.max_input_asset_bytes);

    const response = await execute_with_retry(
      validated_request,
      async (attempt_request, attempt) => {
        const payload = map_sd_webui_request(attempt_request, assets);
        const route =
          attempt_request.mode === "txt2img" ? "/sdapi/v1/txt2img" : "/sdapi/v1/img2img";
        const started_at = this.#clock.now();
        const transport_response = await context.transport.execute({
          route,
          method: "POST",
          body: new TextEncoder().encode(JSON.stringify(payload)),
          content_type: "application/json",
          accept: "application/json",
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

    return {
      state: "completed",
      result: parse_sd_webui_response(
        response.body,
        validated_request,
        profile.max_response_bytes,
        profile.output_mime_type_allowlist,
      ),
    };
  }

  poll(
    _context: ProviderExecutionContext,
    _submission: ProviderSubmission,
  ): Promise<ProviderPollResult> {
    return Promise.reject(invalid_request());
  }

  async cancel(context: ProviderExecutionContext, submission: ProviderSubmission): Promise<void> {
    if (submission.state !== "pending") {
      return;
    }
    const response = await context.transport.execute({
      route: "/sdapi/v1/interrupt",
      method: "POST",
      signal: context.signal,
    });
    if (response.status < 200 || response.status >= 300) {
      throw new ProviderAdapterError(provider_error_from_status(response.status));
    }
  }
}

function parse_request(request: SdWebuiRequest): SdWebuiRequest {
  const result = SdWebuiRequestSchema.safeParse(request);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_profile(profile: ProviderProfile): SdWebuiProfile {
  const result = SdWebuiProfileSchema.safeParse(profile);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function assert_profile_allows_request(profile: SdWebuiProfile, request: SdWebuiRequest): void {
  if (!profile.model_allowlist.includes(request.model_id)) {
    throw invalid_request();
  }
  if (request.vae_id !== undefined && !profile.vae_allowlist.includes(request.vae_id)) {
    throw invalid_request();
  }
  for (const detailer of request.adetailer ?? []) {
    if (!profile.adetailer_model_allowlist.includes(detailer.model_id)) {
      throw invalid_request();
    }
  }
  for (const reference of request.controlnet ?? []) {
    if (!profile.controlnet_model_allowlist.includes(reference.model_id)) {
      throw invalid_request();
    }
  }
}

async function load_assets(
  context: ProviderExecutionContext,
  request: SdWebuiRequest,
  max_input_asset_bytes: number,
): Promise<ReadonlyMap<AssetId, ProviderSourceAsset>> {
  const asset_ids = new Set<AssetId>();
  if (request.input_asset_id !== undefined) {
    asset_ids.add(request.input_asset_id);
  }
  for (const reference of request.controlnet ?? []) {
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
