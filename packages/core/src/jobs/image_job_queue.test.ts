import type {
  ImageId,
  ProviderError,
  ProviderId,
  RequestImageArguments,
} from "@tavern-canvas/contracts";
import { describe, expect, it, vi } from "vitest";

import type {
  EnqueueGenerationJobRequest,
  GenerationJobSnapshot,
  JobIdSource,
  JobTimeSource,
} from "./generation_job.js";
import {
  ImageJobQueue,
  type GenerationJobListener,
  type JobPersistencePort,
} from "./image_job_queue.js";
import {
  JobExecutorFailure,
  type JobExecutionControl,
  type JobExecutionResult,
  type JobExecutor,
} from "./job_executor.js";

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

interface ExecutionRecord {
  readonly job: GenerationJobSnapshot;
  readonly control: JobExecutionControl;
  readonly deferred: Deferred<JobExecutionResult>;
}

class ControlledExecutor implements JobExecutor {
  readonly starts: ExecutionRecord[] = [];

  execute(job: GenerationJobSnapshot, control: JobExecutionControl): Promise<JobExecutionResult> {
    const deferred = new Deferred<JobExecutionResult>();
    control.signal.addEventListener(
      "abort",
      () => {
        deferred.reject(new JobExecutorFailure({ code: "cancelled", retryable: false }));
      },
      { once: true },
    );
    this.starts.push({ job, control, deferred });
    return deferred.promise;
  }

  complete(index: number, image_ids: readonly ImageId[] = [image_id(index)]): void {
    this.starts[index]?.deferred.resolve({ image_ids });
  }

  fail(index: number, provider_error: ProviderError): void {
    this.starts[index]?.deferred.reject(new JobExecutorFailure(provider_error));
  }
}

class MemoryPersistence implements JobPersistencePort {
  readonly saves: GenerationJobSnapshot[] = [];

  save(job: GenerationJobSnapshot): Promise<void> {
    this.saves.push(job);
    return Promise.resolve();
  }
}

class SequenceJobIdSource implements JobIdSource {
  #sequence = 0;

  next(): string {
    this.#sequence += 1;
    return `22222222-2222-4222-8222-${String(this.#sequence).padStart(12, "0")}`;
  }
}

class ControlledJobTimeSource implements JobTimeSource {
  #milliseconds = Date.parse("2026-08-05T00:00:00.000Z");

  now(): Date {
    const value = new Date(this.#milliseconds);
    this.#milliseconds += 1;
    return value;
  }
}

function request_id(index: number): string {
  return `11111111-1111-4111-8111-${String(index).padStart(12, "0")}`;
}

function image_id(index: number): ImageId {
  return `33333333-3333-4333-8333-${String(index).padStart(12, "0")}`;
}

function request(
  index: number,
  options: {
    readonly provider_id?: ProviderId;
    readonly automatic?: boolean;
    readonly generation_anchor?: string;
    readonly arguments?: RequestImageArguments;
  } = {},
): EnqueueGenerationJobRequest {
  const generation_anchor = options.generation_anchor ?? "a".repeat(64);
  return {
    request_id: request_id(index),
    generation_anchor,
    source_anchor: "b".repeat(64),
    chat_id: "chat-a",
    requested_swipe_id: 0,
    provider_id: options.provider_id ?? "sd_webui",
    arguments: options.arguments ?? {
      generation_anchor,
      scene_description: "A rainy alley",
    },
    automatic: options.automatic ?? true,
  };
}

function create_queue(
  options: {
    readonly global_concurrency?: number;
    readonly provider_concurrency?: Partial<Record<ProviderId, number>>;
  } = {},
) {
  const executor = new ControlledExecutor();
  const persistence = new MemoryPersistence();
  const queue = new ImageJobQueue({
    executor,
    persistence,
    job_id_source: new SequenceJobIdSource(),
    time_source: new ControlledJobTimeSource(),
    ...options,
  });
  return { queue, executor, persistence };
}

async function wait_for_starts(executor: ControlledExecutor, count: number): Promise<void> {
  await vi.waitFor(() => expect(executor.starts).toHaveLength(count));
}

async function wait_for_state(
  queue: ImageJobQueue,
  job_id: string,
  state: GenerationJobSnapshot["state"],
): Promise<GenerationJobSnapshot> {
  await vi.waitFor(() => expect(queue.get(job_id)?.state).toBe(state));
  const job = queue.get(job_id);
  if (job === null) {
    throw new Error(`Job ${job_id} disappeared`);
  }
  return job;
}

describe("ImageJobQueue", () => {
  it("uses global default concurrency four and starts the fifth job after settlement", async () => {
    const { queue, executor } = create_queue();
    const jobs = await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        queue.enqueue(request(index + 1, { automatic: false })),
      ),
    );

    await wait_for_starts(executor, 4);
    expect(executor.starts.map((record) => record.job.job_id)).toEqual(
      jobs.slice(0, 4).map((job) => job.job_id),
    );

    executor.complete(0);
    await wait_for_starts(executor, 5);
    await wait_for_state(queue, jobs[0]?.job_id ?? "", "completed");
    expect(executor.starts[4]?.job.job_id).toBe(jobs[4]?.job_id);
  });

  it("enforces provider limits while filling independent provider slots", async () => {
    const { queue, executor } = create_queue({
      provider_concurrency: { sd_webui: 1, novelai: 2 },
    });
    await Promise.all([
      queue.enqueue(request(1, { provider_id: "sd_webui" })),
      queue.enqueue(request(2, { provider_id: "sd_webui", automatic: false })),
      queue.enqueue(request(3, { provider_id: "novelai", automatic: false })),
      queue.enqueue(request(4, { provider_id: "novelai", automatic: false })),
      queue.enqueue(request(5, { provider_id: "novelai", automatic: false })),
    ]);

    await wait_for_starts(executor, 3);
    expect(executor.starts.map((record) => record.job.provider_id)).toEqual([
      "sd_webui",
      "novelai",
      "novelai",
    ]);
  });

  it("schedules FIFO within providers and round-robin across providers", async () => {
    const { queue, executor } = create_queue({ global_concurrency: 4 });
    const jobs = await Promise.all([
      queue.enqueue(request(1, { provider_id: "sd_webui" })),
      queue.enqueue(request(2, { provider_id: "sd_webui", automatic: false })),
      queue.enqueue(request(3, { provider_id: "novelai", automatic: false })),
      queue.enqueue(request(4, { provider_id: "novelai", automatic: false })),
    ]);

    await wait_for_starts(executor, 4);
    expect(executor.starts.map((record) => record.job.job_id)).toEqual([
      jobs[0]?.job_id,
      jobs[2]?.job_id,
      jobs[1]?.job_id,
      jobs[3]?.job_id,
    ]);
  });

  it("deduplicates identical automatic requests within one generation", async () => {
    const { queue, executor, persistence } = create_queue();
    const [first, duplicate] = await Promise.all([
      queue.enqueue(request(1)),
      queue.enqueue(request(2)),
    ]);

    expect(duplicate.job_id).toBe(first.job_id);
    expect(duplicate.request_id).toBe(first.request_id);
    expect(first.request_digest).toBe(
      "fbd7b72521728906e28bb6d6ba221a0d2843d1b08a2dff0ae0457e096202f5ec",
    );
    expect(persistence.saves.filter((job) => job.state === "queued")).toHaveLength(1);
    await wait_for_starts(executor, 1);
  });

  it("lets explicit regeneration bypass automatic deduplication", async () => {
    const { queue, executor } = create_queue();
    const first = await queue.enqueue(request(1));
    const explicit = await queue.enqueue(request(2, { automatic: false }));

    expect(explicit.job_id).not.toBe(first.job_id);
    expect(explicit.request_id).not.toBe(first.request_id);
    expect(explicit.request_digest).toBe(first.request_digest);
    await wait_for_starts(executor, 2);
  });

  it("gives every job a distinct abort signal and isolates sibling cancellation", async () => {
    const { queue, executor } = create_queue({ global_concurrency: 2 });
    const jobs = await Promise.all([
      queue.enqueue(request(1)),
      queue.enqueue(request(2, { automatic: false })),
    ]);
    await wait_for_starts(executor, 2);

    const first_signal = executor.starts[0]?.control.signal;
    const second_signal = executor.starts[1]?.control.signal;
    expect(first_signal).toBeDefined();
    expect(second_signal).toBeDefined();
    expect(first_signal).not.toBe(second_signal);

    await queue.cancel(jobs[0]?.job_id ?? "");

    expect(first_signal?.aborted).toBe(true);
    expect(second_signal?.aborted).toBe(false);
    await wait_for_state(queue, jobs[0]?.job_id ?? "", "cancelled");
    expect(queue.get(jobs[1]?.job_id ?? "")?.state).not.toBe("cancelled");
  });

  it("cancels queued work without calling provider execution", async () => {
    const { queue, executor } = create_queue({ global_concurrency: 1 });
    const first = await queue.enqueue(request(1));
    const queued = await queue.enqueue(request(2, { automatic: false }));
    await wait_for_starts(executor, 1);

    await queue.cancel(queued.job_id);
    executor.complete(0);
    await wait_for_state(queue, first.job_id, "completed");

    expect(executor.starts).toHaveLength(1);
    expect(queue.get(queued.job_id)?.state).toBe("cancelled");
  });

  it("frees the global slot after executor failure", async () => {
    const { queue, executor } = create_queue({ global_concurrency: 1 });
    const jobs = await Promise.all([
      queue.enqueue(request(1)),
      queue.enqueue(request(2, { automatic: false })),
    ]);
    await wait_for_starts(executor, 1);

    executor.fail(0, { code: "provider_unavailable", retryable: true });

    await wait_for_state(queue, jobs[0]?.job_id ?? "", "failed");
    await wait_for_starts(executor, 2);
    expect(queue.get(jobs[0]?.job_id ?? "")?.error).toEqual({
      code: "provider_unavailable",
      retryable: true,
    });
  });

  it("lets executors mark asynchronous provider work as running", async () => {
    const { queue, executor } = create_queue({ global_concurrency: 1 });
    const job = await queue.enqueue(request(1));
    await wait_for_starts(executor, 1);

    await executor.starts[0]?.control.mark_running();

    await wait_for_state(queue, job.job_id, "running");
    executor.complete(0);
    await wait_for_state(queue, job.job_id, "completed");
  });

  it("persists each state before publishing deeply immutable snapshots", async () => {
    const { queue, executor, persistence } = create_queue({ global_concurrency: 1 });
    const observed: GenerationJobSnapshot[] = [];
    const listener: GenerationJobListener = (job) => {
      const persisted = persistence.saves.at(-1);
      expect(persisted).toEqual(job);
      expect(Object.isFrozen(job)).toBe(true);
      expect(Object.isFrozen(job.arguments)).toBe(true);
      expect(Object.isFrozen(job.image_ids)).toBe(true);
      observed.push(job);
    };
    const unsubscribe = queue.subscribe(listener);

    const job = await queue.enqueue(request(1));
    await wait_for_starts(executor, 1);
    executor.complete(0, [image_id(1), image_id(2)]);
    const completed = await wait_for_state(queue, job.job_id, "completed");
    unsubscribe();

    expect(completed.image_ids).toEqual([image_id(1), image_id(2)]);
    expect(observed.map((snapshot) => snapshot.state)).toEqual([
      "queued",
      "preparing",
      "submitting",
      "completed",
    ]);
    expect(Reflect.set(observed[0] ?? {}, "state", "failed")).toBe(false);
    expect(observed[0]?.state).toBe("queued");
  });
});
