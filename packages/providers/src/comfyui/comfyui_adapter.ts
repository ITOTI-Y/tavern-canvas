import {
  ComfyUiRequestSchema,
  ImageGenerationResultSchema,
  AssetIdSchema,
  type AssetId,
  type ComfyUiRequest,
  type GeneratedAsset,
  type ProviderCapability,
} from "@tavern-canvas/contracts";
import { z } from "zod";

import {
  create_generated_asset,
  invalid_request,
  malformed_response,
  result_with_optional_seed,
} from "../image_bytes.js";
import { encode_multipart } from "../multipart.js";
import type {
  ProviderAdapter,
  ProviderExecutionContext,
  ProviderPollResult,
  ProviderProfile,
  ProviderSourceAsset,
  ProviderSubmission,
} from "../provider_adapter.js";
import {
  normalize_provider_failure,
  ProviderAdapterError,
  provider_error_from_status,
} from "../provider_error.js";
import { redact_provider_log } from "../redaction.js";
import {
  execute_non_idempotent_with_retry,
  execute_with_retry,
  parse_retry_after,
  SystemRetryClock,
  type RetryClock,
  type RetryRandomSource,
} from "../retry_policy.js";
import type {
  ProviderTransportOperation,
  ProviderTransportResponse,
} from "../provider_transport.js";
import {
  render_comfyui_workflow,
  validate_stored_comfyui_workflow,
  type ComfyUiWorkflowNode,
  type StoredComfyUiWorkflow,
} from "./workflow_renderer.js";

const ComfyUiProfileSchema = z
  .strictObject({
    profile_id: z.string().trim().min(1).max(128),
    provider_id: z.literal("comfyui"),
    model_allowlist: z.array(z.string().trim().min(1).max(128)).min(1).max(32),
    output_mime_type_allowlist: z
      .array(z.enum(["image/png", "image/jpeg", "image/webp"]))
      .min(1)
      .max(3),
    workflow_allowlist: z.array(AssetIdSchema).min(1).max(256),
    max_response_bytes: z.number().int().positive().max(100_000_000),
    max_input_asset_bytes: z.number().int().positive().max(100_000_000),
  })
  .check((context) => {
    for (const property_name of [
      "model_allowlist",
      "output_mime_type_allowlist",
      "workflow_allowlist",
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

const PromptResponseSchema = z.object({
  prompt_id: z.string().trim().min(1).max(128),
  number: z.number(),
  node_errors: z.record(z.string(), z.unknown()),
});
const UploadResponseSchema = z.object({
  name: z.string().trim().min(1).max(512),
  subfolder: z.string().max(512),
  type: z.enum(["input", "output", "temp"]),
});
const ComfyUiContinuationSchema = z.strictObject({
  request: z.strictObject({
    request_id: ComfyUiRequestSchema.shape.request_id,
    output_count: ComfyUiRequestSchema.shape.output_count,
    output_node_ids: ComfyUiRequestSchema.shape.output_node_ids,
    seed: ComfyUiRequestSchema.shape.seed,
  }),
});

type ComfyUiProfile = z.infer<typeof ComfyUiProfileSchema>;

export interface ComfyUiWorkflowStore {
  load(workflow_id: AssetId): Promise<unknown>;
}

export interface ComfyUiAdapterOptions {
  readonly workflow_store: ComfyUiWorkflowStore;
  readonly clock?: RetryClock;
  readonly random?: RetryRandomSource;
}

const DEFAULT_RANDOM: RetryRandomSource = { next: Math.random };
const RETRYABLE_STATUS_CODES = new Set([500, 502, 503, 504]);

export class ComfyUiAdapter implements ProviderAdapter<ComfyUiRequest> {
  readonly provider_id = "comfyui" as const;
  readonly capabilities: ReadonlySet<ProviderCapability> = new Set([
    "text_to_image",
    "reference_image",
    "cancel",
    "seed",
    "workflow",
  ]);
  readonly #workflow_store: ComfyUiWorkflowStore;
  readonly #clock: RetryClock;
  readonly #random: RetryRandomSource;

  constructor(options: ComfyUiAdapterOptions) {
    this.#workflow_store = options.workflow_store;
    this.#clock = options.clock ?? new SystemRetryClock();
    this.#random = options.random ?? DEFAULT_RANDOM;
  }

  validate_profile(profile: unknown): ProviderProfile {
    return ComfyUiProfileSchema.parse(profile);
  }

  async submit(
    context: ProviderExecutionContext,
    request: ComfyUiRequest,
  ): Promise<ProviderSubmission> {
    const validated_request = parse_request(request);
    const profile = parse_profile(context.profile);
    if (!profile.workflow_allowlist.includes(validated_request.workflow_id)) {
      throw invalid_request();
    }

    let stored: StoredComfyUiWorkflow;
    try {
      stored = validate_stored_comfyui_workflow(
        await this.#workflow_store.load(validated_request.workflow_id),
      );
    } catch {
      throw invalid_request();
    }
    if (stored.workflow_id !== validated_request.workflow_id) {
      throw invalid_request();
    }

    render_request_workflow(
      stored,
      validated_request,
      Object.fromEntries(
        Object.keys(validated_request.input_asset_bindings).map((name) => [
          name,
          "validated-input.png",
        ]),
      ),
    );
    const input_asset_names = await upload_input_assets(
      context,
      validated_request,
      profile,
      this.#clock,
      this.#random,
    );
    const workflow = render_request_workflow(stored, validated_request, input_asset_names);

    const response = await execute_comfyui_operation(
      context,
      validated_request,
      {
        route: "/prompt",
        method: "POST",
        body: new TextEncoder().encode(JSON.stringify({ prompt: workflow })),
        content_type: "application/json",
        accept: "application/json",
        max_response_bytes: profile.max_response_bytes,
        signal: context.signal,
      },
      this.#clock,
      this.#random,
      true,
    );
    if (response.body.byteLength > profile.max_response_bytes) {
      throw malformed_response();
    }

    let prompt_response: z.infer<typeof PromptResponseSchema>;
    try {
      prompt_response = PromptResponseSchema.parse(parse_json(response.body));
    } catch {
      throw malformed_response();
    }
    if (Object.keys(prompt_response.node_errors).length > 0) {
      throw invalid_request();
    }
    return {
      state: "pending",
      submission_id: prompt_response.prompt_id,
      continuation: {
        request: {
          request_id: validated_request.request_id,
          output_count: validated_request.output_count,
          output_node_ids: validated_request.output_node_ids,
          seed: validated_request.seed,
        },
      },
    };
  }

  async poll(
    context: ProviderExecutionContext,
    submission: ProviderSubmission,
  ): Promise<ProviderPollResult> {
    if (submission.state !== "pending") {
      throw invalid_request();
    }
    const continuation = ComfyUiContinuationSchema.safeParse(submission.continuation);
    if (!continuation.success) {
      throw invalid_request();
    }
    const pending_request = continuation.data.request;
    const profile = parse_profile(context.profile);
    const route = `/history/${encodeURIComponent(submission.submission_id)}` as const;
    const response = await execute_comfyui_operation(
      context,
      pending_request,
      {
        route,
        method: "GET",
        accept: "application/json",
        max_response_bytes: profile.max_response_bytes,
        signal: context.signal,
      },
      this.#clock,
      this.#random,
      true,
    );
    if (response.body.byteLength > profile.max_response_bytes) {
      throw malformed_response();
    }

    const history = parse_json(response.body);
    if (!is_record(history)) {
      throw malformed_response();
    }
    const entry = history[submission.submission_id];
    if (entry === undefined) {
      return { state: "pending", poll_after_ms: 250 };
    }
    if (!is_record(entry)) {
      throw malformed_response();
    }
    const status = entry.status;
    if (!is_record(status)) {
      throw malformed_response();
    }
    if (status.status_str === "error") {
      return {
        state: "failed",
        error: { code: "provider_unavailable", retryable: false },
      };
    }
    if (status.completed !== true) {
      return { state: "pending", poll_after_ms: 250 };
    }

    const outputs = entry.outputs;
    if (!is_record(outputs)) {
      throw malformed_response();
    }
    const image_references = collect_output_images(
      outputs,
      pending_request.output_node_ids,
      pending_request.output_count,
    );
    if (image_references.length !== pending_request.output_count) {
      throw malformed_response();
    }

    const assets: GeneratedAsset[] = [];
    let total_bytes = 0;
    for (const image of image_references) {
      const query = new URLSearchParams({
        filename: image.filename,
        subfolder: image.subfolder,
        type: image.type,
      });
      const image_response = await execute_comfyui_operation(
        context,
        pending_request,
        {
          route: `/view?${query.toString()}`,
          method: "GET",
          max_response_bytes: profile.max_response_bytes - total_bytes,
          signal: context.signal,
        },
        this.#clock,
        this.#random,
        true,
      );
      total_bytes += image_response.body.byteLength;
      if (total_bytes > profile.max_response_bytes) {
        throw malformed_response();
      }
      assets.push(
        create_generated_asset(
          image_response.body,
          undefined,
          undefined,
          profile.output_mime_type_allowlist,
        ),
      );
    }

    return {
      state: "completed",
      result: ImageGenerationResultSchema.parse(
        result_with_optional_seed(
          {
            request_id: pending_request.request_id,
            provider_id: "comfyui",
            assets,
          },
          pending_request.seed,
        ),
      ),
    };
  }

  async cancel(context: ProviderExecutionContext, submission: ProviderSubmission): Promise<void> {
    if (submission.state !== "pending") {
      return;
    }
    const profile = parse_profile(context.profile);
    const retry_request = { request_id: submission.submission_id };
    const queue_response = await execute_comfyui_operation(
      context,
      retry_request,
      {
        route: "/queue",
        method: "GET",
        accept: "application/json",
        max_response_bytes: profile.max_response_bytes,
        signal: context.signal,
      },
      this.#clock,
      this.#random,
      true,
    );
    if (queue_response.body.byteLength > profile.max_response_bytes) {
      throw malformed_response();
    }
    const queue = parse_json(queue_response.body);
    if (!is_record(queue)) {
      throw malformed_response();
    }
    const running = queue_contains_prompt(queue.queue_running, submission.submission_id);
    const queued = queue_contains_prompt(queue.queue_pending, submission.submission_id);
    if (running) {
      await execute_comfyui_operation(
        context,
        retry_request,
        {
          route: "/interrupt",
          method: "POST",
          max_response_bytes: profile.max_response_bytes,
          signal: context.signal,
        },
        this.#clock,
        this.#random,
        false,
      );
    } else if (queued) {
      await execute_comfyui_operation(
        context,
        retry_request,
        {
          route: "/queue",
          method: "POST",
          body: new TextEncoder().encode(JSON.stringify({ delete: [submission.submission_id] })),
          content_type: "application/json",
          max_response_bytes: profile.max_response_bytes,
          signal: context.signal,
        },
        this.#clock,
        this.#random,
        false,
      );
    }
  }
}

async function upload_input_assets(
  context: ProviderExecutionContext,
  request: ComfyUiRequest,
  profile: ComfyUiProfile,
  clock: RetryClock,
  random: RetryRandomSource,
): Promise<Readonly<Record<string, string>>> {
  const loaded_assets: {
    readonly binding_name: string;
    readonly asset: ProviderSourceAsset;
  }[] = [];
  let total_bytes = 0;
  for (const [binding_name, asset_id] of Object.entries(request.input_asset_bindings)) {
    const asset = await context.assets.read(asset_id, context.signal);
    total_bytes += asset.bytes.byteLength;
    if (asset.asset_id !== asset_id || total_bytes > profile.max_input_asset_bytes) {
      throw invalid_request();
    }
    loaded_assets.push({ binding_name, asset });
  }

  const uploaded: Record<string, string> = {};
  for (const { binding_name, asset } of loaded_assets) {
    const multipart = encode_multipart({ type: "input", overwrite: "true" }, [
      {
        field_name: "image",
        file_name: `${asset.asset_id}.${extension_for_media_type(asset.media_type)}`,
        content_type: asset.media_type,
        bytes: asset.bytes,
      },
    ]);
    const response = await execute_comfyui_operation(
      context,
      request,
      {
        route: "/upload/image",
        method: "POST",
        body: multipart.body,
        content_type: multipart.content_type,
        accept: "application/json",
        max_response_bytes: profile.max_response_bytes,
        signal: context.signal,
      },
      clock,
      random,
      false,
    );
    if (response.body.byteLength > profile.max_response_bytes) {
      throw malformed_response();
    }
    let upload: z.infer<typeof UploadResponseSchema>;
    try {
      upload = UploadResponseSchema.parse(parse_json(response.body));
    } catch {
      throw malformed_response();
    }
    uploaded[binding_name] =
      upload.subfolder.length === 0 ? upload.name : `${upload.subfolder}/${upload.name}`;
  }
  return uploaded;
}

function render_request_workflow(
  stored: StoredComfyUiWorkflow,
  request: ComfyUiRequest,
  input_asset_names: Readonly<Record<string, string>>,
): Record<string, ComfyUiWorkflowNode> {
  return render_comfyui_workflow(stored, {
    prompt: request.prompt,
    ...(request.negative_prompt === undefined ? {} : { negative_prompt: request.negative_prompt }),
    ...(request.seed === undefined ? {} : { seed: request.seed }),
    output_count: request.output_count,
    placeholder_values: request.placeholder_values,
    input_asset_names,
  });
}

function collect_output_images(
  outputs: Record<string, unknown>,
  output_node_ids: readonly string[],
  max_images: number,
): { readonly filename: string; readonly subfolder: string; readonly type: string }[] {
  const result: { filename: string; subfolder: string; type: string }[] = [];
  for (const node_id of output_node_ids) {
    const output = outputs[node_id];
    if (!is_record(output) || !Array.isArray(output.images)) {
      throw malformed_response();
    }
    if (output.images.length > max_images - result.length) {
      throw malformed_response();
    }
    for (const image of output.images) {
      if (
        !is_record(image) ||
        typeof image.filename !== "string" ||
        typeof image.subfolder !== "string" ||
        typeof image.type !== "string" ||
        image.filename.length === 0 ||
        image.filename.length > 512 ||
        image.subfolder.length > 512 ||
        !["input", "output", "temp"].includes(image.type)
      ) {
        throw malformed_response();
      }
      result.push({
        filename: image.filename,
        subfolder: image.subfolder,
        type: image.type,
      });
    }
  }
  return result;
}

async function execute_comfyui_operation(
  context: ProviderExecutionContext,
  request: Readonly<{ request_id: string }>,
  operation: ProviderTransportOperation,
  clock: RetryClock,
  random: RetryRandomSource,
  retry: boolean,
): Promise<ProviderTransportResponse> {
  const execute_once = async (
    attempt_request: Readonly<{ request_id: string }>,
    attempt: number,
  ): Promise<ProviderTransportResponse> => {
    const started_at = clock.now();
    const response = await context.transport.execute(operation);
    log_response(context, attempt_request.request_id, attempt, response, started_at, clock);
    throw_for_status(response, clock);
    return response;
  };

  if (retry) {
    const execute_retry =
      operation.method === "GET" ? execute_with_retry : execute_non_idempotent_with_retry;
    return execute_retry(request, execute_once, {
      signal: context.signal,
      clock,
      random,
    });
  }
  try {
    return await execute_once(request, 0);
  } catch (error) {
    throw normalize_provider_failure(error, context.signal);
  }
}

function throw_for_status(
  response: ProviderTransportResponse,
  clock: Pick<RetryClock, "now">,
): void {
  if (response.status >= 200 && response.status < 300) {
    return;
  }
  if (response.status === 451) {
    throw new ProviderAdapterError({
      code: "content_blocked",
      retryable: false,
      status_code: 451,
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
      provider_id: "comfyui",
      request_id,
      attempt,
      status_code: response.status,
      duration_ms: Math.max(0, clock.now() - started_at),
      byte_count: response.body.byteLength,
    }),
  );
}

function parse_request(request: ComfyUiRequest): ComfyUiRequest {
  const result = ComfyUiRequestSchema.safeParse(request);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_profile(profile: ProviderProfile): ComfyUiProfile {
  const result = ComfyUiProfileSchema.safeParse(profile);
  if (!result.success) {
    throw invalid_request();
  }
  return result.data;
}

function parse_json(body: Uint8Array): unknown {
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) as unknown;
  } catch {
    throw malformed_response();
  }
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function queue_contains_prompt(value: unknown, prompt_id: string): boolean {
  return (
    Array.isArray(value) && value.some((entry) => Array.isArray(entry) && entry[1] === prompt_id)
  );
}

function extension_for_media_type(media_type: string): string {
  if (media_type === "image/jpeg") {
    return "jpg";
  }
  return media_type === "image/webp" ? "webp" : "png";
}
