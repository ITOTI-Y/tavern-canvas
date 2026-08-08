import type { GatewayJobResponse, ProviderError } from "@tavern-canvas/contracts";
import {
  JobExecutorFailure,
  type GenerationJobSnapshot,
  type JobExecutionControl,
  type JobExecutionResult,
  type JobExecutor,
} from "@tavern-canvas/core";

import {
  persist_generated_images,
  type GeneratedImageBytes,
  type GeneratedImageStoreDeps,
  type MediaExecutionPlanRegistry,
} from "../modules/media/media_command_service.js";
import {
  GatewayProtocolError,
  GatewayTransport,
  GatewayTransportError,
  type GatewayFetch,
} from "./gateway_transport.js";

/** A cancel must outlive the aborted job signal, or the Gateway would keep generating. */
const REMOTE_CANCEL_TIMEOUT_MS = 5_000;

export interface GatewayJobExecutorDeps extends GeneratedImageStoreDeps {
  readonly endpoint: string;
  readonly http_acknowledgments: Readonly<Record<string, string>>;
  /**
   * Resolved from host secret storage once per job. The plaintext token lives no longer than the
   * `GatewayTransport` that carries it, which is discarded when the job settles.
   */
  readonly access_token: () => Promise<string>;
  readonly plans: MediaExecutionPlanRegistry;
  readonly fetch?: GatewayFetch;
}

/**
 * Drives the standalone Gateway as a `JobExecutor` rather than a `ProviderTransport`: the Gateway
 * runs the provider adapter itself, so the client submits one whole `ImageGenerationRequest` and
 * follows the resulting job over SSE (falling back to polling) instead of issuing per-route
 * provider calls. What comes back is an asset id list, downloaded here and written through the
 * same Stage 04 persistence step the direct executors use, so a Gateway-produced image is
 * indistinguishable from a directly generated one everywhere downstream.
 */
export class GatewayJobExecutor implements JobExecutor {
  readonly #deps: GatewayJobExecutorDeps;

  constructor(deps: GatewayJobExecutorDeps) {
    this.#deps = deps;
  }

  async execute(
    job: GenerationJobSnapshot,
    control: JobExecutionControl,
  ): Promise<JobExecutionResult> {
    const plan = this.#deps.plans.take(job.request_id);
    if (plan === undefined || plan.kind !== "adapter") {
      throw new JobExecutorFailure({ code: "invalid_request", retryable: false });
    }

    let transport: GatewayTransport;
    let submitted: GatewayJobResponse;
    try {
      transport = new GatewayTransport({
        endpoint: this.#deps.endpoint,
        access_token: await this.#resolve_access_token(),
        http_acknowledgments: this.#deps.http_acknowledgments,
        ...(this.#deps.fetch === undefined ? {} : { fetch: this.#deps.fetch }),
      });
      submitted = await transport.submit(plan.request, control.signal);
    } catch (error) {
      throw to_job_failure(error);
    }

    await control.mark_running();
    try {
      const finished = await transport.observe(submitted, { signal: control.signal });
      return { image_ids: await this.#collect(transport, job, finished, control.signal) };
    } catch (error) {
      if (control.signal.aborted) {
        await cancel_remote_job(transport, submitted);
      }
      throw error instanceof JobExecutorFailure ? error : to_job_failure(error);
    }
  }

  async #resolve_access_token(): Promise<string> {
    try {
      return await this.#deps.access_token();
    } catch {
      /* The vault failure carries no diagnostic the user can act on here beyond "no usable token",
       * and its message may have been built from a response that held the token itself. */
      throw new JobExecutorFailure({ code: "auth_failed", retryable: false });
    }
  }

  async #collect(
    transport: GatewayTransport,
    job: GenerationJobSnapshot,
    finished: GatewayJobResponse,
    signal: AbortSignal,
  ): Promise<readonly string[]> {
    if (finished.state === "failed") {
      throw new JobExecutorFailure(
        finished.error ?? { code: "provider_unavailable", retryable: false },
      );
    }
    if (finished.state === "cancelled") {
      throw new JobExecutorFailure({ code: "cancelled", retryable: false });
    }
    const image_ids = finished.image_ids ?? [];
    if (image_ids.length === 0) {
      throw new JobExecutorFailure({ code: "malformed_response", retryable: false });
    }

    const outputs: GeneratedImageBytes[] = [];
    for (const image_id of image_ids) {
      outputs.push(await transport.fetch_asset(image_id, signal));
    }
    return persist_generated_images(this.#deps, job, outputs);
  }
}

async function cancel_remote_job(
  transport: GatewayTransport,
  submitted: GatewayJobResponse,
): Promise<void> {
  try {
    await transport.cancel(submitted.job_id, AbortSignal.timeout(REMOTE_CANCEL_TIMEOUT_MS));
  } catch {
    /* The local job is already ending; a Gateway that cannot be told stays authoritative for its
     * own copy and reaps it on the next restart. */
  }
}

function to_job_failure(error: unknown): JobExecutorFailure {
  if (error instanceof JobExecutorFailure) {
    return error;
  }
  if (error instanceof GatewayProtocolError) {
    return new JobExecutorFailure({ code: "malformed_response", retryable: false });
  }
  if (error instanceof GatewayTransportError) {
    return new JobExecutorFailure(provider_error_of(error));
  }
  return new JobExecutorFailure({ code: "provider_unavailable", retryable: false });
}

function provider_error_of(error: GatewayTransportError): ProviderError {
  const status_code = error.status_code === undefined ? {} : { status_code: error.status_code };
  switch (error.code) {
    case "cancelled":
      return { code: "cancelled", retryable: false };
    case "configuration":
      return { code: "invalid_request", retryable: false };
    case "malformed_response":
      return { code: "malformed_response", retryable: false };
    case "provider_unavailable":
      return { code: "provider_unavailable", retryable: true };
    case "http_error":
      return { ...http_provider_error(error.status_code), ...status_code };
  }
}

function http_provider_error(status_code: number | undefined): ProviderError {
  if (status_code === 401 || status_code === 403) {
    return { code: "auth_failed", retryable: false };
  }
  if (status_code === 408) {
    return { code: "timed_out", retryable: true };
  }
  if (status_code === 429) {
    return { code: "rate_limited", retryable: true };
  }
  if (status_code !== undefined && status_code >= 500) {
    return { code: "provider_unavailable", retryable: true };
  }
  return { code: "invalid_request", retryable: false };
}
