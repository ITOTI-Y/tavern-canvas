import { ProviderErrorSchema, type ImageId, type ProviderError } from "@tavern-canvas/contracts";

import type { GenerationJobSnapshot } from "./generation_job.js";

export interface JobExecutionResult {
  readonly image_ids: readonly ImageId[];
}

export interface JobExecutionControl {
  readonly signal: AbortSignal;
  mark_running(): Promise<void>;
}

export interface JobExecutor {
  execute(job: GenerationJobSnapshot, control: JobExecutionControl): Promise<JobExecutionResult>;
}

export class JobExecutorFailure extends Error {
  readonly provider_error: Readonly<ProviderError>;

  constructor(provider_error: ProviderError) {
    super(`Job executor failed: ${provider_error.code}`);
    this.name = "JobExecutorFailure";
    this.provider_error = Object.freeze(ProviderErrorSchema.parse(provider_error));
  }
}
