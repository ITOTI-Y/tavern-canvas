import type Database from "better-sqlite3";
import {
  AssetIdSchema,
  GenerationStateSchema,
  ImageGenerationRequestSchema,
  JobIdSchema,
  ProviderErrorSchema,
  ProviderIdSchema,
  RequestIdSchema,
  type AssetId,
  type GenerationState,
  type ImageGenerationRequest,
  type JobId,
  type ProviderError,
  type ProviderId,
  type RequestId,
} from "@tavern-canvas/contracts";
import { z } from "zod";

export const OwnerTokenHashSchema = z.string().regex(/^[a-f0-9]{64}$/u);
export type OwnerTokenHash = z.infer<typeof OwnerTokenHashSchema>;

const OccurredAtSchema = z.iso.datetime({ offset: false });
const EventTypeSchema = z
  .string()
  .regex(/^[a-z][a-z0-9_]*$/u)
  .max(100);
const RECOVERABLE_STATES = [
  "queued",
  "preparing",
  "submitting",
  "running",
] as const satisfies readonly GenerationState[];

type TerminalGenerationState = Extract<
  GenerationState,
  "completed" | "failed" | "cancelled" | "attached" | "orphaned"
>;
const TERMINAL_STATES: Record<TerminalGenerationState, true> = {
  completed: true,
  failed: true,
  cancelled: true,
  attached: true,
  orphaned: true,
};

function is_terminal_state(state: GenerationState): boolean {
  return Object.hasOwn(TERMINAL_STATES, state);
}

interface JobRow {
  readonly job_id: string;
  readonly request_id: string;
  readonly provider_id: string;
  readonly owner_token_hash: string;
  readonly state: string;
  readonly request_json: string;
  readonly submission_json: string | null;
  readonly error_json: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}

interface EventRow {
  readonly job_id: string;
  readonly sequence: number;
  readonly event_type: string;
  readonly event_json: string;
  readonly created_at: string;
}

export interface StoredJob {
  readonly job_id: JobId;
  readonly request_id: RequestId;
  readonly provider_id: ProviderId;
  readonly owner_token_hash: OwnerTokenHash;
  readonly state: GenerationState;
  readonly request: ImageGenerationRequest;
  readonly submission: unknown;
  readonly error: ProviderError | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface StoredJobEvent {
  readonly job_id: JobId;
  readonly sequence: number;
  readonly event_type: string;
  readonly event: unknown;
  readonly created_at: string;
}

export interface CreateJobInput {
  readonly job_id: JobId;
  readonly owner_token_hash: OwnerTokenHash;
  readonly request: ImageGenerationRequest;
  readonly created_at: string;
}

export interface CreateJobResult {
  readonly job: StoredJob;
  readonly created: boolean;
}

export interface JobTransitionInput {
  readonly job_id: JobId;
  readonly state: GenerationState;
  readonly event_type: string;
  readonly event: unknown;
  readonly submission?: unknown;
  readonly error?: ProviderError | null;
  readonly created_at: string;
}

export interface ConditionalJobTransitionInput extends JobTransitionInput {
  readonly expected_state: GenerationState;
}

export interface CompleteJobInput {
  readonly job_id: JobId;
  readonly expected_state: GenerationState;
  readonly asset_ids: readonly AssetId[];
  readonly created_at: string;
}

export class JobStateConflictError extends Error {
  constructor() {
    super("Gateway job state precondition failed");
    this.name = "JobStateConflictError";
  }
}
export class JobQueueFullError extends Error {
  constructor() {
    super("Gateway job queue is full");
    this.name = "JobQueueFullError";
  }
}
export class JobRepository {
  readonly #connection: Database.Database;
  readonly #insert_job: Database.Statement;
  readonly #select_by_id_for_worker: Database.Statement;
  readonly #select_by_id_for_owner: Database.Statement;
  readonly #select_by_request_id: Database.Statement;
  readonly #select_events_for_worker: Database.Statement;
  readonly #select_events_for_owner: Database.Statement;
  readonly #select_next_sequence: Database.Statement;
  readonly #update_job: Database.Statement;
  readonly #update_job_if_state: Database.Statement;
  readonly #complete_job_if_state: Database.Statement;
  readonly #select_asset: Database.Statement;
  readonly #delete_job_assets: Database.Statement;
  readonly #insert_job_asset: Database.Statement;
  readonly #insert_event: Database.Statement;

  readonly #delete_job_for_worker: Database.Statement;
  readonly #delete_job_for_owner: Database.Statement;
  readonly #delete_expired_jobs: Database.Statement;
  readonly #count_pending_jobs: Database.Statement;
  readonly #create_or_get_transaction: (
    input: CreateJobInput,
    max_pending_jobs?: number,
  ) => CreateJobResult;
  readonly #transition_transaction: (input: JobTransitionInput) => StoredJobEvent;
  readonly #conditional_transition_transaction: (
    input: ConditionalJobTransitionInput,
  ) => StoredJobEvent | undefined;
  readonly #complete_transaction: (input: CompleteJobInput) => StoredJobEvent | undefined;
  constructor(connection: Database.Database) {
    this.#connection = connection;
    this.#insert_job = connection.prepare(`
      INSERT INTO jobs (
        job_id, request_id, provider_id, owner_token_hash, state, request_json,
        submission_json, error_json, created_at, updated_at
      ) VALUES (
        @job_id, @request_id, @provider_id, @owner_token_hash, 'queued', @request_json,
        NULL, NULL, @created_at, @created_at
      )
      ON CONFLICT(owner_token_hash, request_id) DO NOTHING
    `);
    this.#select_by_id_for_worker = connection.prepare("SELECT * FROM jobs WHERE job_id = ?");
    this.#select_by_id_for_owner = connection.prepare(
      "SELECT * FROM jobs WHERE job_id = ? AND owner_token_hash = ?",
    );
    this.#select_by_request_id = connection.prepare(
      "SELECT * FROM jobs WHERE owner_token_hash = ? AND request_id = ?",
    );
    this.#select_events_for_worker = connection.prepare(`
      SELECT * FROM job_events
      WHERE job_id = ? AND sequence > ?
      ORDER BY sequence
    `);
    this.#select_events_for_owner = connection.prepare(`
      SELECT job_events.*
      FROM job_events
      JOIN jobs ON jobs.job_id = job_events.job_id
      WHERE job_events.job_id = ?
        AND jobs.owner_token_hash = ?
        AND job_events.sequence > ?
      ORDER BY job_events.sequence
    `);
    this.#select_next_sequence = connection.prepare(`
      SELECT COALESCE(MAX(sequence), 0) + 1 AS sequence
      FROM job_events WHERE job_id = ?
    `);
    this.#update_job = connection.prepare(`
      UPDATE jobs SET
        state = @state,
        submission_json = @submission_json,
        error_json = @error_json,
        updated_at = @updated_at
      WHERE job_id = @job_id
    `);
    this.#update_job_if_state = connection.prepare(`
      UPDATE jobs SET
        state = @state,
        submission_json = @submission_json,
        error_json = @error_json,
        updated_at = @updated_at
      WHERE job_id = @job_id AND state = @expected_state
    `);
    this.#complete_job_if_state = connection.prepare(`
      UPDATE jobs SET
        state = 'completed',
        submission_json = NULL,
        error_json = NULL,
        updated_at = @updated_at
      WHERE job_id = @job_id
        AND state = @expected_state
        AND state NOT IN ('completed', 'failed', 'cancelled', 'attached', 'orphaned')
    `);
    this.#select_asset = connection.prepare(
      "SELECT 1 FROM assets WHERE asset_id = ? AND owner_token_hash = ?",
    );
    this.#delete_job_assets = connection.prepare(
      "DELETE FROM job_assets WHERE job_id = ? AND owner_token_hash = ?",
    );
    this.#insert_job_asset = connection.prepare(`
      INSERT INTO job_assets (job_id, owner_token_hash, asset_id, position)
      VALUES (@job_id, @owner_token_hash, @asset_id, @position)
    `);
    this.#insert_event = connection.prepare(`
      INSERT INTO job_events (
        job_id, sequence, event_type, event_json, created_at
      ) VALUES (
        @job_id, @sequence, @event_type, @event_json, @created_at
      )
    `);
    this.#delete_job_for_worker = connection.prepare("DELETE FROM jobs WHERE job_id = ?");
    this.#delete_job_for_owner = connection.prepare(
      "DELETE FROM jobs WHERE job_id = ? AND owner_token_hash = ?",
    );
    this.#delete_expired_jobs = connection.prepare(`
      DELETE FROM jobs
      WHERE updated_at < ?
        AND state IN ('completed', 'failed', 'cancelled', 'attached', 'orphaned')
    `);
    const create_or_get_transaction = connection.transaction(
      (input: CreateJobInput, max_pending_jobs?: number) =>
        this.#create_or_get(input, max_pending_jobs),
    );
    this.#create_or_get_transaction = (input, max_pending_jobs) =>
      create_or_get_transaction.immediate(input, max_pending_jobs);
    this.#count_pending_jobs = connection.prepare(`
      SELECT COUNT(*) AS count
      FROM jobs
      WHERE state IN ('queued', 'preparing', 'submitting', 'running')
    `);
    const transition_transaction = connection.transaction((input: JobTransitionInput) =>
      this.#transition(input),
    );
    this.#transition_transaction = (input) => transition_transaction.immediate(input);
    const conditional_transition_transaction = connection.transaction(
      (input: ConditionalJobTransitionInput) => this.#transition_if_current(input),
    );
    this.#conditional_transition_transaction = (input) =>
      conditional_transition_transaction.immediate(input);
    const complete_transaction = connection.transaction((input: CompleteJobInput) =>
      this.#complete(input),
    );
    this.#complete_transaction = (input) => complete_transaction.immediate(input);
  }

  create_or_get(input: CreateJobInput, max_pending_jobs?: number): CreateJobResult {
    return this.#create_or_get_transaction(input, max_pending_jobs);
  }

  get_by_id_for_worker(job_id: JobId): StoredJob | undefined {
    JobIdSchema.parse(job_id);
    const row = this.#select_by_id_for_worker.get(job_id) as JobRow | undefined;
    return row === undefined ? undefined : parse_job_row(row);
  }

  get_by_id_for_owner(job_id: JobId, owner_token_hash: OwnerTokenHash): StoredJob | undefined {
    JobIdSchema.parse(job_id);
    const normalized_owner_token_hash = OwnerTokenHashSchema.parse(owner_token_hash);
    const row = this.#select_by_id_for_owner.get(job_id, normalized_owner_token_hash) as
      JobRow | undefined;
    return row === undefined ? undefined : parse_job_row(row);
  }

  list_events_for_worker(job_id: JobId, after_sequence = 0): StoredJobEvent[] {
    JobIdSchema.parse(job_id);
    if (!Number.isSafeInteger(after_sequence) || after_sequence < 0) {
      throw new TypeError("Event sequence cursor is invalid");
    }
    return (this.#select_events_for_worker.all(job_id, after_sequence) as EventRow[]).map(
      parse_event_row,
    );
  }

  list_events_for_owner(
    job_id: JobId,
    owner_token_hash: OwnerTokenHash,
    after_sequence = 0,
  ): StoredJobEvent[] {
    JobIdSchema.parse(job_id);
    const normalized_owner_token_hash = OwnerTokenHashSchema.parse(owner_token_hash);
    if (!Number.isSafeInteger(after_sequence) || after_sequence < 0) {
      throw new TypeError("Event sequence cursor is invalid");
    }
    return (
      this.#select_events_for_owner.all(
        job_id,
        normalized_owner_token_hash,
        after_sequence,
      ) as EventRow[]
    ).map(parse_event_row);
  }

  list_recoverable_for_worker(): StoredJob[] {
    const placeholders = RECOVERABLE_STATES.map(() => "?").join(", ");
    const rows = this.#connection
      .prepare(`SELECT * FROM jobs WHERE state IN (${placeholders}) ORDER BY created_at, job_id`)
      .all(...RECOVERABLE_STATES) as JobRow[];
    return rows.map(parse_job_row);
  }

  transition_with_event_for_worker(input: JobTransitionInput): StoredJobEvent {
    return this.#transition_transaction(input);
  }

  transition_if_current_for_worker(
    input: ConditionalJobTransitionInput,
  ): StoredJobEvent | undefined {
    return this.#conditional_transition_transaction(input);
  }

  complete_with_assets_for_worker(input: CompleteJobInput): StoredJobEvent | undefined {
    return this.#complete_transaction(input);
  }

  delete_for_worker(job_id: JobId): boolean {
    JobIdSchema.parse(job_id);
    return this.#delete_job_for_worker.run(job_id).changes === 1;
  }

  delete_for_owner(job_id: JobId, owner_token_hash: OwnerTokenHash): boolean {
    JobIdSchema.parse(job_id);
    const normalized_owner_token_hash = OwnerTokenHashSchema.parse(owner_token_hash);
    return this.#delete_job_for_owner.run(job_id, normalized_owner_token_hash).changes === 1;
  }
  delete_expired(cutoff_at: string): number {
    const normalized_cutoff_at = OccurredAtSchema.parse(cutoff_at);
    return this.#delete_expired_jobs.run(normalized_cutoff_at).changes;
  }
  #create_or_get(input: CreateJobInput, max_pending_jobs?: number): CreateJobResult {
    const job_id = JobIdSchema.parse(input.job_id);
    const owner_token_hash = OwnerTokenHashSchema.parse(input.owner_token_hash);
    const request = ImageGenerationRequestSchema.parse(input.request);
    const created_at = OccurredAtSchema.parse(input.created_at);
    if (
      max_pending_jobs !== undefined &&
      (!Number.isSafeInteger(max_pending_jobs) || max_pending_jobs < 1)
    ) {
      throw new TypeError("Maximum pending Gateway jobs is invalid");
    }
    const existing = this.#select_by_request_id.get(owner_token_hash, request.request_id) as
      JobRow | undefined;
    if (existing !== undefined) {
      return { job: parse_job_row(existing), created: false };
    }
    if (max_pending_jobs !== undefined) {
      const pending = this.#count_pending_jobs.get() as { readonly count: number };
      if (pending.count >= max_pending_jobs) {
        throw new JobQueueFullError();
      }
    }
    const request_json = stringify_json(request);
    const insert_result = this.#insert_job.run({
      job_id,
      request_id: request.request_id,
      provider_id: request.provider_id,
      owner_token_hash,
      request_json,
      created_at,
    });
    const row = this.#select_by_request_id.get(owner_token_hash, request.request_id) as
      JobRow | undefined;
    if (row === undefined) {
      throw new Error("Job insert did not produce a readable row");
    }
    return { job: parse_job_row(row), created: insert_result.changes === 1 };
  }

  #transition(input: JobTransitionInput): StoredJobEvent {
    const event = this.#apply_transition(input);
    if (event === undefined) {
      throw new JobStateConflictError();
    }
    return event;
  }

  #transition_if_current(input: ConditionalJobTransitionInput): StoredJobEvent | undefined {
    const expected_state = GenerationStateSchema.parse(input.expected_state);
    return this.#apply_transition(input, expected_state);
  }

  #apply_transition(
    input: JobTransitionInput,
    expected_state?: GenerationState,
  ): StoredJobEvent | undefined {
    const job_id = JobIdSchema.parse(input.job_id);
    const state = GenerationStateSchema.parse(input.state);
    const event_type = EventTypeSchema.parse(input.event_type);
    const created_at = OccurredAtSchema.parse(input.created_at);
    const current = this.get_by_id_for_worker(job_id);
    if (current === undefined) {
      throw new Error(`Unknown Gateway job: ${job_id}`);
    }
    if (is_terminal_state(current.state)) {
      throw new JobStateConflictError();
    }
    if (expected_state !== undefined && current.state !== expected_state) {
      return undefined;
    }
    const submission = input.submission === undefined ? current.submission : input.submission;
    const error = input.error === undefined ? current.error : input.error;
    const submission_json = submission === null ? null : stringify_json(submission);
    const normalized_error = error === null ? null : ProviderErrorSchema.parse(error);
    const error_json = normalized_error === null ? null : stringify_json(normalized_error);
    const event_json = stringify_json(input.event);
    const sequence_row = this.#select_next_sequence.get(job_id) as {
      sequence: number;
    };
    if (!Number.isSafeInteger(sequence_row.sequence)) {
      throw new Error("Job event sequence exceeded the safe integer range");
    }

    const update_parameters = {
      job_id,
      state,
      submission_json,
      error_json,
      updated_at: created_at,
    };
    const updated =
      expected_state === undefined
        ? this.#update_job.run(update_parameters)
        : this.#update_job_if_state.run({ ...update_parameters, expected_state });
    if (updated.changes !== 1) {
      if (expected_state === undefined) {
        throw new Error(`Unknown Gateway job: ${job_id}`);
      }
      return undefined;
    }
    this.#insert_event.run({
      job_id,
      sequence: sequence_row.sequence,
      event_type,
      event_json,
      created_at,
    });
    return {
      job_id,
      sequence: sequence_row.sequence,
      event_type,
      event: input.event,
      created_at,
    };
  }

  #complete(input: CompleteJobInput): StoredJobEvent | undefined {
    const job_id = JobIdSchema.parse(input.job_id);
    const expected_state = GenerationStateSchema.parse(input.expected_state);
    const asset_ids = input.asset_ids.map((asset_id) => AssetIdSchema.parse(asset_id));
    const created_at = OccurredAtSchema.parse(input.created_at);
    if (is_terminal_state(expected_state)) {
      return undefined;
    }
    const current = this.get_by_id_for_worker(job_id);
    if (current === undefined) {
      throw new Error(`Unknown Gateway job: ${job_id}`);
    }
    if (is_terminal_state(current.state)) {
      return undefined;
    }
    if (current.state !== expected_state) {
      return undefined;
    }
    for (const asset_id of asset_ids) {
      if (this.#select_asset.get(asset_id, current.owner_token_hash) === undefined) {
        throw new Error(`Unknown Gateway asset: ${asset_id}`);
      }
    }
    const updated = this.#complete_job_if_state.run({
      job_id,
      expected_state,
      updated_at: created_at,
    });
    if (updated.changes !== 1) {
      return undefined;
    }
    this.#delete_job_assets.run(job_id, current.owner_token_hash);
    for (const [position, asset_id] of asset_ids.entries()) {
      this.#insert_job_asset.run({
        job_id,
        owner_token_hash: current.owner_token_hash,
        asset_id,
        position,
      });
    }
    const sequence_row = this.#select_next_sequence.get(job_id) as {
      sequence: number;
    };
    if (!Number.isSafeInteger(sequence_row.sequence)) {
      throw new Error("Job event sequence exceeded the safe integer range");
    }
    const event = { state: "completed", image_ids: asset_ids };
    this.#insert_event.run({
      job_id,
      sequence: sequence_row.sequence,
      event_type: "completed",
      event_json: stringify_json(event),
      created_at,
    });
    return {
      job_id,
      sequence: sequence_row.sequence,
      event_type: "completed",
      event,
      created_at,
    };
  }
}

function parse_job_row(row: JobRow): StoredJob {
  const job_id = JobIdSchema.parse(row.job_id);
  const request_id = RequestIdSchema.parse(row.request_id);
  const provider_id = ProviderIdSchema.parse(row.provider_id);
  const state = GenerationStateSchema.parse(row.state);
  const request = ImageGenerationRequestSchema.parse(parse_json(row.request_json));
  if (request.request_id !== request_id || request.provider_id !== provider_id) {
    throw new Error("Stored Gateway job identity is inconsistent");
  }
  const error =
    row.error_json === null ? null : ProviderErrorSchema.parse(parse_json(row.error_json));
  return {
    job_id,
    request_id,
    provider_id,
    owner_token_hash: OwnerTokenHashSchema.parse(row.owner_token_hash),
    state,
    request,
    submission: row.submission_json === null ? null : parse_json(row.submission_json),
    error,
    created_at: OccurredAtSchema.parse(row.created_at),
    updated_at: OccurredAtSchema.parse(row.updated_at),
  };
}

function parse_event_row(row: EventRow): StoredJobEvent {
  if (!Number.isSafeInteger(row.sequence) || row.sequence <= 0) {
    throw new Error("Stored Gateway event sequence is invalid");
  }
  return {
    job_id: JobIdSchema.parse(row.job_id),
    sequence: row.sequence,
    event_type: EventTypeSchema.parse(row.event_type),
    event: parse_json(row.event_json),
    created_at: OccurredAtSchema.parse(row.created_at),
  };
}

function parse_json(value: string): unknown {
  return JSON.parse(value) as unknown;
}

function stringify_json(value: unknown): string {
  const serialized: unknown = JSON.stringify(value);
  if (typeof serialized !== "string") {
    throw new TypeError("Gateway persistence value is not JSON serializable");
  }
  return serialized;
}
