import type { ImageGenerationRequest, RequestId } from "@tavern-canvas/contracts";
import { ProviderIdSchema } from "@tavern-canvas/contracts";
import type { GenerationJobSnapshot, ImageJobQueue } from "@tavern-canvas/core";
import type { GenerationJob, GenerationJobRepository } from "@tavern-canvas/storage";

import {
  cancel_media_job,
  submit_manual_generation,
  type MediaExecutionPlanRegistry,
} from "../../modules/media/media_command_service.js";
import type {
  GenerationCapability,
  GenerationDomainEvent,
  GenerationJobSummary,
} from "../../ui/contracts/ui_capabilities.js";
import { capability_unavailable_error } from "../capability_resolution.js";
import { DomainEventEmitter } from "./_records.js";
import type { GenerationOriginSource } from "./generation_context.js";

export interface GenerationCapabilityDeps {
  readonly queue: ImageJobQueue;
  readonly plans: MediaExecutionPlanRegistry;
  readonly jobs: GenerationJobRepository;
  readonly namespace: () => string;
  readonly origin: GenerationOriginSource;
  readonly new_request_id: () => RequestId;
  /** Rewrites a request into the form its provider accepts before it is queued. */
  readonly prepare_request?: (request: ImageGenerationRequest) => Promise<ImageGenerationRequest>;
}

function image_count(request_arguments: GenerationJobSnapshot["arguments"]): number {
  return request_arguments.image_count ?? 1;
}

export function snapshot_to_summary(job: GenerationJobSnapshot): GenerationJobSummary {
  return {
    job_id: job.job_id,
    request_id: job.request_id,
    provider_id: ProviderIdSchema.parse(job.provider_id),
    state: job.state,
    image_count: image_count(job.arguments),
    completed_image_ids: job.image_ids,
    error: job.error,
    submitted_at: job.created_at,
  };
}

function record_to_summary(record: GenerationJob): GenerationJobSummary {
  return {
    job_id: record.id,
    request_id: record.request_id,
    provider_id: ProviderIdSchema.parse(record.provider_id),
    state: record.state,
    image_count: record.arguments.image_count ?? 1,
    completed_image_ids: record.image_ids,
    error: record.error,
    submitted_at: record.created_at,
  };
}

export function create_generation_capability(deps: GenerationCapabilityDeps): GenerationCapability {
  const events = new DomainEventEmitter<GenerationDomainEvent>();
  const submitted_requests = new Map<string, ImageGenerationRequest>();

  deps.queue.subscribe((job) => {
    events.emit({ type: "job_updated", job: snapshot_to_summary(job) });
  });

  async function submit_request(source: ImageGenerationRequest): Promise<GenerationJobSummary> {
    const request =
      deps.prepare_request === undefined ? source : await deps.prepare_request(source);
    const origin = await deps.origin.resolve();
    const job = await submit_manual_generation(
      { queue: deps.queue, plans: deps.plans },
      { ...origin, scene_description: request.prompt },
      request,
    );
    submitted_requests.set(job.job_id, request);
    return snapshot_to_summary(job);
  }

  return {
    async load() {
      const records = await deps.jobs.list(deps.namespace());
      return records.map(record_to_summary);
    },
    subscribe: (handler) => events.subscribe(handler),
    submit: (command) => submit_request(command.request),
    async cancel(job_id) {
      const job = await cancel_media_job({ queue: deps.queue, plans: deps.plans }, job_id);
      return snapshot_to_summary(job);
    },
    retry(job_id) {
      const request = submitted_requests.get(job_id);
      if (request === undefined) {
        throw capability_unavailable_error(
          `Generation job ${job_id} was not submitted in this session, so its request cannot be replayed`,
        );
      }
      return submit_request({ ...request, request_id: deps.new_request_id() });
    },
    async dismiss(job_ids) {
      for (const job_id of job_ids) {
        const record = await deps.jobs.get(deps.namespace(), job_id);
        if (record?.state !== "failed" && record?.state !== "cancelled") {
          continue;
        }
        await deps.jobs.delete(deps.namespace(), job_id);
        events.emit({ type: "job_removed", job_id });
      }
    },
  };
}
