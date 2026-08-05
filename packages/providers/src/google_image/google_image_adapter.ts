import {
  GoogleImageRequestSchema,
  ImageGenerationResultSchema,
  type GoogleImageRequest,
  type ProviderCapability,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import {
  create_provider_output_asset,
  decode_base64_image,
  encode_base64,
  invalid_request,
  malformed_response,
} from "../image_bytes.js";
import type {
  ProviderAdapter,
  ProviderExecutionContext,
  ProviderPollResult,
  ProviderOutputAsset,
  ProviderProfile,
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
import {
  derive_provider_request_limit,
  type ProviderTransportResponse,
} from "../provider_transport.js";

const GoogleImageProfileSchema = z
  .strictObject({
    profile_id: z.string().trim().min(1).max(128),
    provider_id: z.literal("google_image"),
    model_allowlist: z.array(GoogleImageRequestSchema.shape.model_id).min(1).max(32),
    output_mime_type_allowlist: z
      .array(z.enum(["image/png", "image/jpeg", "image/webp"]))
      .min(1)
      .max(3),
    max_response_bytes: z.number().int().positive().max(100_000_000),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000),
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

const GoogleInteractionResponseSchema = z.object({
  id: z.string().min(1),
  model: z.string().min(1),
  status: z.enum(["completed", "failed", "in_progress"]),
  error: z
    .object({
      code: z.string().optional(),
      message: z.string().optional(),
    })
    .optional(),
  steps: z.array(
    z.object({
      type: z.string(),
      content: z
        .array(
          z.object({
            type: z.string(),
            mime_type: z.string().optional(),
            data: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
});

type GoogleImageProfile = z.infer<typeof GoogleImageProfileSchema>;

export interface GoogleImageAdapterOptions {
  readonly clock?: RetryClock;
  readonly random?: RetryRandomSource;
}

const DEFAULT_RANDOM: RetryRandomSource = { next: Math.random };
const RETRYABLE_STATUS_CODES = new Set([500, 502, 503, 504]);

export class GoogleImageAdapter implements ProviderAdapter<GoogleImageRequest> {
  readonly provider_id = "google_image" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
    "reference_image",
  ]);
  readonly #clock: RetryClock;
  readonly #random: RetryRandomSource;

  constructor(options: GoogleImageAdapterOptions = {}) {
    this.#clock = options.clock ?? new SystemRetryClock();
    this.#random = options.random ?? DEFAULT_RANDOM;
  }

  validate_profile(profile: unknown): ProviderProfile {
    return GoogleImageProfileSchema.parse(profile);
  }

  async submit(
    context: ProviderExecutionContext,
    request: GoogleImageRequest,
  ): Promise<ProviderSubmission> {
    const validated_request = parse_request(request);
    const profile = parse_profile(context.profile);
    if (
      !profile.model_allowlist.includes(validated_request.model_id) ||
      !profile.output_mime_type_allowlist.includes(validated_request.output_mime_type)
    ) {
      throw invalid_request();
    }

    const input: (
      { type: "text"; text: string } | { type: "image"; mime_type: string; data: string }
    )[] = [
      {
        type: "text",
        text:
          validated_request.negative_prompt === undefined
            ? validated_request.prompt
            : `${validated_request.prompt}\n\nAvoid: ${validated_request.negative_prompt}`,
      },
    ];
    let input_bytes = 0;
    for (const asset_id of validated_request.reference_asset_ids) {
      const asset = await context.assets.read(asset_id, context.signal);
      if (asset.asset_id !== asset_id) {
        throw invalid_request();
      }
      const asset_bytes = asset.bytes.byteLength;
      if (
        asset_bytes > profile.max_input_asset_bytes ||
        asset_bytes > profile.max_input_asset_bytes - input_bytes
      ) {
        throw invalid_request();
      }
      input_bytes += asset_bytes;
      input.push({
        type: "image",
        mime_type: asset.media_type,
        data: encode_base64(asset.bytes),
      });
    }
    const max_request_bytes = derive_provider_request_limit(profile.max_input_asset_bytes);

    const body = new TextEncoder().encode(
      JSON.stringify({
        model: validated_request.model_id,
        input,
        response_format: {
          type: "image",
          mime_type: validated_request.output_mime_type,
          aspect_ratio: validated_request.aspect_ratio,
          image_size: validated_request.image_size,
        },
      }),
    );
    const output_assets: ProviderOutputAsset[] = [];
    let total_bytes = 0;
    for (let output_index = 0; output_index < validated_request.output_count; output_index += 1) {
      const response = await execute_non_idempotent_with_retry(
        validated_request,
        async (attempt_request, attempt) => {
          const started_at = this.#clock.now();
          const transport_response = await context.transport.execute({
            route: "/v1beta/interactions",
            method: "POST",
            body,
            max_request_bytes,
            content_type: "application/json",
            accept: "application/json",
            max_response_bytes: profile.max_response_bytes - total_bytes,
            signal: context.signal,
          });
          log_response(
            context,
            attempt_request.request_id,
            attempt,
            transport_response,
            started_at,
            this.#clock,
          );
          throw_for_status(transport_response, this.#clock);
          return transport_response;
        },
        { signal: context.signal, clock: this.#clock, random: this.#random },
      );
      if (response.body.byteLength > profile.max_response_bytes - total_bytes) {
        throw malformed_response();
      }

      let interaction: z.infer<typeof GoogleInteractionResponseSchema>;
      try {
        interaction = GoogleInteractionResponseSchema.parse(parse_json(response.body));
      } catch {
        throw malformed_response();
      }
      if (interaction.status === "failed") {
        if (interaction.error?.code === "SAFETY") {
          throw new ProviderAdapterError({
            code: "content_blocked",
            retryable: false,
          });
        }
        throw new ProviderAdapterError({
          code: "provider_unavailable",
          retryable: false,
        });
      }
      if (interaction.status !== "completed") {
        throw malformed_response();
      }

      const images = interaction.steps.flatMap((step) =>
        step.type === "model_output"
          ? (step.content ?? []).filter(
              (part) =>
                part.type === "image" &&
                typeof part.mime_type === "string" &&
                typeof part.data === "string",
            )
          : [],
      );
      if (images.length !== 1) {
        throw malformed_response();
      }
      const image = images[0];
      if (
        image === undefined ||
        image.mime_type !== validated_request.output_mime_type ||
        image.data === undefined
      ) {
        throw malformed_response();
      }
      const bytes = decode_base64_image(image.data, profile.max_response_bytes - total_bytes);
      total_bytes += bytes.byteLength;
      const output_asset = create_provider_output_asset(
        bytes,
        undefined,
        undefined,
        profile.output_mime_type_allowlist,
      );
      if (output_asset.asset.media_type !== validated_request.output_mime_type) {
        throw malformed_response();
      }
      output_assets.push(output_asset);
    }

    return {
      state: "completed",
      result: ImageGenerationResultSchema.parse({
        request_id: validated_request.request_id,
        provider_id: "google_image",
        assets: output_assets.map(({ asset }) => asset),
      }),
      output_assets,
    };
  }

  poll(
    _context: ProviderExecutionContext,
    submission: ProviderSubmission,
  ): Promise<ProviderPollResult> {
    if (submission.state !== "completed") {
      throw invalid_request();
    }
    return Promise.resolve(submission);
  }

  cancel(
    _context: ProviderExecutionContext,
    _submission: ProviderSubmission | undefined,
  ): Promise<void> {
    return Promise.resolve();
  }
}

function throw_for_status(response: ProviderTransportResponse, clock: RetryClock): void {
  if (response.status >= 200 && response.status < 300) {
    return;
  }
  const retry_after_ms = parse_retry_after(response.headers["retry-after"] ?? null, clock.now());
  throw new ProviderAdapterError(
    provider_error_from_status(response.status, {
      recoverable: RETRYABLE_STATUS_CODES.has(response.status),
      ...(retry_after_ms === undefined ? {} : { retry_after_ms }),
    }),
  );
}

function log_response(
  context: ProviderExecutionContext,
  request_id: string,
  attempt: number,
  response: ProviderTransportResponse,
  started_at: number,
  clock: RetryClock,
): void {
  context.log.write(
    redact_provider_log({
      provider_id: "google_image",
      request_id,
      attempt,
      status_code: response.status,
      duration_ms: Math.max(0, clock.now() - started_at),
      byte_count: response.body.byteLength,
    }),
  );
}

function parse_request(request: GoogleImageRequest): GoogleImageRequest {
  const result = GoogleImageRequestSchema.safeParse(request);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_profile(profile: ProviderProfile): GoogleImageProfile {
  const result = GoogleImageProfileSchema.safeParse(profile);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_json(body: Uint8Array): unknown {
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) as unknown;
}
