import type {
  GenerationState,
  ImageId,
  JobId,
  ProviderError,
  ProviderId,
  RequestId,
  RequestImageArguments,
  Sha256,
} from "@tavern-canvas/contracts";

export interface EnqueueGenerationJobRequest {
  readonly request_id: RequestId;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly provider_id: ProviderId;
  readonly arguments: RequestImageArguments;
  readonly automatic: boolean;
}

export interface GenerationJob {
  readonly job_id: JobId;
  readonly request_id: RequestId;
  readonly request_digest: Sha256;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly provider_id: ProviderId;
  readonly arguments: RequestImageArguments;
  state: GenerationState;
  readonly created_at: string;
  updated_at: string;
  error: ProviderError | null;
  image_ids: ImageId[];
}

export interface GenerationJobSnapshot {
  readonly job_id: JobId;
  readonly request_id: RequestId;
  readonly request_digest: Sha256;
  readonly generation_anchor: Sha256;
  readonly source_anchor: Sha256;
  readonly chat_id: string;
  readonly requested_swipe_id: number;
  readonly provider_id: ProviderId;
  readonly arguments: Readonly<RequestImageArguments>;
  readonly state: GenerationState;
  readonly created_at: string;
  readonly updated_at: string;
  readonly error: Readonly<ProviderError> | null;
  readonly image_ids: readonly ImageId[];
}

export interface JobIdSource {
  next(): string;
}

export interface JobTimeSource {
  now(): Date;
}

export class SystemJobTimeSource implements JobTimeSource {
  now(): Date {
    return new Date();
  }
}

export function snapshot_generation_job(job: GenerationJob): GenerationJobSnapshot {
  const error = job.error === null ? null : Object.freeze({ ...job.error });
  return Object.freeze({
    job_id: job.job_id,
    request_id: job.request_id,
    request_digest: job.request_digest,
    generation_anchor: job.generation_anchor,
    source_anchor: job.source_anchor,
    chat_id: job.chat_id,
    requested_swipe_id: job.requested_swipe_id,
    provider_id: job.provider_id,
    arguments: Object.freeze({ ...job.arguments }),
    state: job.state,
    created_at: job.created_at,
    updated_at: job.updated_at,
    error,
    image_ids: Object.freeze([...job.image_ids]),
  });
}
