import {
  JobExecutorFailure,
  type GenerationJobSnapshot,
  type JobExecutionControl,
  type JobExecutionResult,
  type JobExecutor,
} from "@tavern-canvas/core";
import type { ImageId } from "@tavern-canvas/contracts";

class Deferred<T> {
  readonly promise: Promise<T>;
  resolve!: (value: T) => void;
  reject!: (reason: unknown) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export interface ControlledExecution {
  readonly job: GenerationJobSnapshot;
  readonly signal: AbortSignal;
  readonly deferred: Deferred<JobExecutionResult>;
}

function image_id(index: number): ImageId {
  return `33333333-3333-4333-8333-${String(index).padStart(12, "0")}`;
}

export class ControlledProvider implements JobExecutor {
  readonly starts: ControlledExecution[] = [];
  active_count = 0;
  maximum_active_count = 0;

  execute(job: GenerationJobSnapshot, control: JobExecutionControl): Promise<JobExecutionResult> {
    const deferred = new Deferred<JobExecutionResult>();
    const execution: ControlledExecution = {
      job,
      signal: control.signal,
      deferred,
    };
    this.starts.push(execution);
    this.active_count += 1;
    this.maximum_active_count = Math.max(this.maximum_active_count, this.active_count);
    control.signal.addEventListener(
      "abort",
      () => {
        deferred.reject(new JobExecutorFailure({ code: "cancelled", retryable: false }));
      },
      { once: true },
    );
    return deferred.promise.finally(() => {
      this.active_count -= 1;
    });
  }

  complete(job_id: string): void {
    const index = this.starts.findIndex((execution) => execution.job.job_id === job_id);
    const execution = this.starts[index];
    if (execution === undefined) {
      throw new Error(`Provider execution ${job_id} has not started`);
    }
    execution.deferred.resolve({ image_ids: [image_id(index + 1)] });
  }

  fail(job_id: string): void {
    const execution = this.starts.find((candidate) => candidate.job.job_id === job_id);
    if (execution === undefined) {
      throw new Error(`Provider execution ${job_id} has not started`);
    }
    execution.deferred.reject(
      new JobExecutorFailure({ code: "provider_unavailable", retryable: true }),
    );
  }
}
