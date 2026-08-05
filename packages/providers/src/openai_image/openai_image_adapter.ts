import {
  ImageGenerationResultSchema,
  OpenAiImageRequestSchema,
  type OpenAiImageRequest,
  type ProviderCapability,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import {
  create_provider_output_asset,
  decode_base64_image,
  invalid_request,
  malformed_response,
} from "../image_bytes.js";
import { encode_multipart, type MultipartFile } from "../multipart.js";
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
  execute_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "../retry_policy.js";
import {
  derive_provider_request_limit,
  type ProviderTransportResponse,
} from "../provider_transport.js";

const OpenAiImageProfileSchema = z
  .strictObject({
    profile_id: z.string().trim().min(1).max(128),
    provider_id: z.literal("openai_image"),
    model_allowlist: z.array(OpenAiImageRequestSchema.shape.model_id).min(1).max(32),
    output_mime_type_allowlist: z
      .array(z.enum(["image/png", "image/jpeg", "image/webp"]))
      .min(1)
      .max(3),
    remote_asset_origin_allowlist: z.array(z.url()).max(32),
    max_response_bytes: z.number().int().positive().max(100_000_000),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000),
  })
  .check((context) => {
    for (const property_name of [
      "model_allowlist",
      "output_mime_type_allowlist",
      "remote_asset_origin_allowlist",
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

const OpenAiImageResponseSchema = z.strictObject({
  created: z.number().int().nonnegative().optional(),
  data: z
    .array(
      z.union([z.strictObject({ b64_json: z.string().min(1) }), z.strictObject({ url: z.url() })]),
    )
    .min(1)
    .max(4),
  usage: z.unknown().optional(),
});

type OpenAiImageProfile = z.infer<typeof OpenAiImageProfileSchema>;

export interface OpenAiImageAdapterOptions {
  readonly clock?: RetryClock;
  readonly random?: RetryRandomSource;
}

const DEFAULT_RANDOM: RetryRandomSource = { next: Math.random };
const RETRYABLE_STATUS_CODES = new Set([500, 502, 503, 504]);

export class OpenAiImageAdapter implements ProviderAdapter<OpenAiImageRequest> {
  readonly provider_id = "openai_image" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
    "reference_image",
  ]);
  readonly #clock: RetryClock;
  readonly #random: RetryRandomSource;

  constructor(options: OpenAiImageAdapterOptions = {}) {
    this.#clock = options.clock ?? new SystemRetryClock();
    this.#random = options.random ?? DEFAULT_RANDOM;
  }

  validate_profile(profile: unknown): ProviderProfile {
    return OpenAiImageProfileSchema.parse(profile);
  }

  async submit(
    context: ProviderExecutionContext,
    request: OpenAiImageRequest,
  ): Promise<ProviderSubmission> {
    const validated_request = parse_request(request);
    const profile = parse_profile(context.profile);
    if (
      !profile.model_allowlist.includes(validated_request.model_id) ||
      !profile.output_mime_type_allowlist.includes(
        media_type_for_output_format(validated_request.output_format),
      )
    ) {
      throw invalid_request();
    }
    const max_request_bytes = derive_provider_request_limit(profile.max_input_asset_bytes);
    const operation =
      validated_request.mode === "generate"
        ? build_generation_operation(
            validated_request,
            context.signal,
            profile.max_response_bytes,
            max_request_bytes,
          )
        : await build_edit_operation(
            context,
            validated_request,
            profile.max_input_asset_bytes,
            profile.max_response_bytes,
            max_request_bytes,
          );
    const response = await execute_non_idempotent_with_retry(
      validated_request,
      async (attempt_request, attempt) => {
        const started_at = this.#clock.now();
        const transport_response = await context.transport.execute(operation);
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
    if (response.body.byteLength > profile.max_response_bytes) {
      throw malformed_response();
    }

    let parsed_response: z.infer<typeof OpenAiImageResponseSchema>;
    try {
      parsed_response = OpenAiImageResponseSchema.parse(parse_json(response.body));
    } catch {
      throw malformed_response();
    }
    if (parsed_response.data.length !== validated_request.output_count) {
      throw malformed_response();
    }

    const dimensions = dimensions_for_size(validated_request.size);
    const output_assets: ProviderOutputAsset[] = [];
    let total_bytes = 0;
    for (const image of parsed_response.data) {
      let bytes: Uint8Array;
      // Provider URLs are temporary download locations, never application-owned asset URLs.
      if ("b64_json" in image) {
        bytes = decode_base64_image(image.b64_json, profile.max_response_bytes - total_bytes);
      } else {
        bytes = await fetch_remote_image(
          context,
          image.url,
          profile,
          profile.max_response_bytes - total_bytes,
          validated_request,
          this.#random,
          this.#clock,
        );
      }
      total_bytes += bytes.byteLength;
      if (total_bytes > profile.max_response_bytes) {
        throw malformed_response();
      }
      const output_asset = create_provider_output_asset(
        bytes,
        dimensions.width,
        dimensions.height,
        profile.output_mime_type_allowlist,
      );
      if (
        output_asset.asset.media_type !==
        media_type_for_output_format(validated_request.output_format)
      ) {
        throw malformed_response();
      }
      output_assets.push(output_asset);
    }

    return {
      state: "completed",
      result: ImageGenerationResultSchema.parse({
        request_id: validated_request.request_id,
        provider_id: "openai_image",
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

function build_generation_operation(
  request: OpenAiImageRequest,
  signal: AbortSignal,
  max_response_bytes: number,
  max_request_bytes: number,
) {
  const body = {
    model: request.model_id,
    prompt: prompt_for_request(request),
    n: request.output_count,
    size: request.size,
    quality: request.quality,
    background: request.background,
    output_format: request.output_format,
    ...(request.compression === undefined ? {} : { output_compression: request.compression }),
  };
  return {
    route: "/v1/images/generations" as const,
    method: "POST" as const,
    body: new TextEncoder().encode(JSON.stringify(body)),
    max_request_bytes,
    content_type: "application/json",
    accept: "application/json",
    max_response_bytes,
    signal,
  };
}

async function build_edit_operation(
  context: ProviderExecutionContext,
  request: OpenAiImageRequest,
  max_input_asset_bytes: number,
  max_response_bytes: number,
  max_request_bytes: number,
) {
  const files: MultipartFile[] = [];
  let total_bytes = 0;
  for (const [asset_index, asset_id] of request.input_asset_ids.entries()) {
    const asset = await context.assets.read(asset_id, context.signal);
    if (asset.asset_id !== asset_id) {
      throw invalid_request();
    }
    const asset_bytes = asset.bytes.byteLength;
    if (asset_bytes > max_input_asset_bytes || asset_bytes > max_input_asset_bytes - total_bytes) {
      throw invalid_request();
    }
    total_bytes += asset_bytes;
    files.push({
      field_name: "image[]",
      file_name: `input_${String(asset_index)}.${extension_for_media_type(asset.media_type)}`,
      content_type: asset.media_type,
      bytes: asset.bytes,
    });
  }
  if (request.mask_asset_id !== undefined) {
    const mask = await context.assets.read(request.mask_asset_id, context.signal);
    if (mask.asset_id !== request.mask_asset_id) {
      throw invalid_request();
    }
    const mask_bytes = mask.bytes.byteLength;
    if (mask_bytes > max_input_asset_bytes || mask_bytes > max_input_asset_bytes - total_bytes) {
      throw invalid_request();
    }
    files.push({
      field_name: "mask",
      file_name: `mask.${extension_for_media_type(mask.media_type)}`,
      content_type: mask.media_type,
      bytes: mask.bytes,
    });
  }

  const multipart = encode_multipart(
    {
      model: request.model_id,
      prompt: prompt_for_request(request),
      n: String(request.output_count),
      size: request.size,
      quality: request.quality,
      background: request.background,
      output_format: request.output_format,
      ...(request.compression === undefined
        ? {}
        : { output_compression: String(request.compression) }),
    },
    files,
  );
  return {
    route: "/v1/images/edits" as const,
    method: "POST" as const,
    body: multipart.body,
    max_request_bytes,
    content_type: multipart.content_type,
    accept: "application/json",
    max_response_bytes,
    signal: context.signal,
  };
}

function prompt_for_request(request: OpenAiImageRequest): string {
  return request.negative_prompt === undefined
    ? request.prompt
    : `${request.prompt}\n\nAvoid: ${request.negative_prompt}`;
}

async function fetch_remote_image(
  context: ProviderExecutionContext,
  remote_url: string,
  profile: OpenAiImageProfile,
  max_bytes: number,
  request: OpenAiImageRequest,
  random: RetryRandomSource,
  clock: RetryClock,
): Promise<Uint8Array> {
  let url: URL;
  try {
    url = new URL(remote_url);
  } catch {
    throw malformed_response();
  }
  const allowed_origins = profile.remote_asset_origin_allowlist.map(
    (allowed) => new URL(allowed).origin,
  );
  const fetch_remote_asset = context.transport.fetch_remote_asset?.bind(context.transport);
  if (
    url.protocol !== "https:" ||
    url.username.length > 0 ||
    url.password.length > 0 ||
    url.hash.length > 0 ||
    !allowed_origins.includes(url.origin) ||
    fetch_remote_asset === undefined ||
    max_bytes <= 0
  ) {
    throw malformed_response();
  }
  return execute_with_retry(
    request,
    async (attempt_request, attempt) => {
      const started_at = clock.now();
      const response = await fetch_remote_asset({
        url: url.href,
        allowed_origins,
        max_bytes,
        signal: context.signal,
      });
      log_response(context, attempt_request.request_id, attempt, response, started_at, clock);
      throw_for_status(response, clock);
      if (response.body.byteLength > max_bytes) {
        throw malformed_response();
      }
      return response.body;
    },
    { signal: context.signal, clock, random },
  );
}

function throw_for_status(response: ProviderTransportResponse, clock: RetryClock): void {
  if (response.status >= 200 && response.status < 300) {
    return;
  }
  if (is_content_policy_rejection(response)) {
    throw new ProviderAdapterError({
      code: "content_blocked",
      retryable: false,
      status_code: response.status,
    });
  }
  const retry_after_ms = parse_retry_after(response.headers["retry-after"] ?? null, clock.now());
  throw new ProviderAdapterError(
    provider_error_from_status(response.status, {
      recoverable: RETRYABLE_STATUS_CODES.has(response.status),
      ...(retry_after_ms === undefined ? {} : { retry_after_ms }),
    }),
  );
}

function is_content_policy_rejection(response: ProviderTransportResponse): boolean {
  if (response.status !== 400) {
    return false;
  }
  try {
    const body = parse_json(response.body);
    return (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "object" &&
      body.error !== null &&
      "code" in body.error &&
      body.error.code === "content_policy_violation"
    );
  } catch {
    return false;
  }
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
      provider_id: "openai_image",
      request_id,
      attempt,
      status_code: response.status,
      duration_ms: Math.max(0, clock.now() - started_at),
      byte_count: response.body.byteLength,
    }),
  );
}

function parse_request(request: OpenAiImageRequest): OpenAiImageRequest {
  const result = OpenAiImageRequestSchema.safeParse(request);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_profile(profile: ProviderProfile): OpenAiImageProfile {
  const result = OpenAiImageProfileSchema.safeParse(profile);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_json(body: Uint8Array): unknown {
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) as unknown;
}

function dimensions_for_size(size: OpenAiImageRequest["size"]): {
  readonly width: number | undefined;
  readonly height: number | undefined;
} {
  if (size === "auto") {
    return { width: undefined, height: undefined };
  }
  const [width, height] = size.split("x").map(Number);
  return { width, height };
}

function media_type_for_output_format(
  output_format: OpenAiImageRequest["output_format"],
): "image/png" | "image/jpeg" | "image/webp" {
  if (output_format === "jpeg") {
    return "image/jpeg";
  }
  return output_format === "webp" ? "image/webp" : "image/png";
}

function extension_for_media_type(media_type: string): string {
  if (media_type === "image/jpeg") {
    return "jpg";
  }
  return media_type === "image/webp" ? "webp" : "png";
}
