import type Database from "better-sqlite3";
import {
  GenerationStateSchema,
  ImageGenerationRequestSchema,
  JobIdSchema,
  ProviderErrorCodeSchema,
  ProviderIdSchema,
  RequestIdSchema,
  type GenerationState,
  type ImageGenerationRequest,
  type JobId,
  type ProviderErrorCode,
  type ProviderId,
  type RequestId,
} from "@tavern-canvas/contracts";
import { z } from "zod";

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

interface JobRow {
  readonly job_id: string;
  readonly request_id: string;
  readonly provider_id: string;
  readonly state: string;
  readonly request_json: string;
  readonly submission_json: string | null;
  readonly error_code: string | null;
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
  readonly state: GenerationState;
  readonly request: ImageGenerationRequest;
  readonly submission: unknown;
  readonly error_code: ProviderErrorCode | null;
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
  readonly error_code?: ProviderErrorCode | null;
  readonly created_at: string;
}

export class JobRepository {
  readonly #connection: Database.Database;
  readonly #insert_job: Database.Statement;
  readonly #select_by_id: Database.Statement;
  readonly #select_by_request_id: Database.Statement;
  readonly #select_events: Database.Statement;
  readonly #select_next_sequence: Database.Statement;
  readonly #update_job: Database.Statement;
  readonly #insert_event: Database.Statement;
  readonly #delete_job: Database.Statement;
  readonly #create_or_get_transaction: (input: CreateJobInput) => CreateJobResult;
  readonly #transition_transaction: (input: JobTransitionInput) => StoredJobEvent;

  constructor(connection: Database.Database) {
    this.#connection = connection;
    this.#insert_job = connection.prepare(`
      INSERT INTO jobs (
        job_id, request_id, provider_id, state, request_json,
        submission_json, error_code, created_at, updated_at
      ) VALUES (
        @job_id, @request_id, @provider_id, 'queued', @request_json,
        NULL, NULL, @created_at, @created_at
      )
      ON CONFLICT(request_id) DO NOTHING
    `);
    this.#select_by_id = connection.prepare("SELECT * FROM jobs WHERE job_id = ?");
    this.#select_by_request_id = connection.prepare("SELECT * FROM jobs WHERE request_id = ?");
    this.#select_events = connection.prepare(`
      SELECT * FROM job_events
      WHERE job_id = ? AND sequence > ?
      ORDER BY sequence
    `);
    this.#select_next_sequence = connection.prepare(`
      SELECT COALESCE(MAX(sequence), 0) + 1 AS sequence
      FROM job_events WHERE job_id = ?
    `);
    this.#update_job = connection.prepare(`
      UPDATE jobs SET
        state = @state,
        submission_json = @submission_json,
        error_code = @error_code,
        updated_at = @updated_at
      WHERE job_id = @job_id
    `);
    this.#insert_event = connection.prepare(`
      INSERT INTO job_events (
        job_id, sequence, event_type, event_json, created_at
      ) VALUES (
        @job_id, @sequence, @event_type, @event_json, @created_at
      )
    `);
    this.#delete_job = connection.prepare("DELETE FROM jobs WHERE job_id = ?");
    const create_or_get_transaction = connection.transaction((input: CreateJobInput) =>
      this.#create_or_get(input),
    );
    this.#create_or_get_transaction = (input) => create_or_get_transaction.immediate(input);
    const transition_transaction = connection.transaction((input: JobTransitionInput) =>
      this.#transition(input),
    );
    this.#transition_transaction = (input) => transition_transaction.immediate(input);
  }

  create_or_get(input: CreateJobInput): CreateJobResult {
    return this.#create_or_get_transaction(input);
  }

  get_by_id(job_id: JobId): StoredJob | undefined {
    JobIdSchema.parse(job_id);
    const row = this.#select_by_id.get(job_id) as JobRow | undefined;
    return row === undefined ? undefined : parse_job_row(row);
  }

  get_by_request_id(request_id: RequestId): StoredJob | undefined {
    RequestIdSchema.parse(request_id);
    const row = this.#select_by_request_id.get(request_id) as JobRow | undefined;
    return row === undefined ? undefined : parse_job_row(row);
  }

  list_events(job_id: JobId, after_sequence = 0): StoredJobEvent[] {
    JobIdSchema.parse(job_id);
    if (!Number.isSafeInteger(after_sequence) || after_sequence < 0) {
      throw new TypeError("Event sequence cursor is invalid");
    }
    return (this.#select_events.all(job_id, after_sequence) as EventRow[]).map(parse_event_row);
  }

  list_recoverable(): StoredJob[] {
    const placeholders = RECOVERABLE_STATES.map(() => "?").join(", ");
    const rows = this.#connection
      .prepare(`SELECT * FROM jobs WHERE state IN (${placeholders}) ORDER BY created_at, job_id`)
      .all(...RECOVERABLE_STATES) as JobRow[];
    return rows.map(parse_job_row);
  }

  transition_with_event(input: JobTransitionInput): StoredJobEvent {
    return this.#transition_transaction(input);
  }

  delete(job_id: JobId): boolean {
    JobIdSchema.parse(job_id);
    return this.#delete_job.run(job_id).changes === 1;
  }

  #create_or_get(input: CreateJobInput): CreateJobResult {
    const job_id = JobIdSchema.parse(input.job_id);
    const request = ImageGenerationRequestSchema.parse(input.request);
    const created_at = OccurredAtSchema.parse(input.created_at);
    const request_json = stringify_json(request);
    const insert_result = this.#insert_job.run({
      job_id,
      request_id: request.request_id,
      provider_id: request.provider_id,
      request_json,
      created_at,
    });
    const row = this.#select_by_request_id.get(request.request_id) as JobRow | undefined;
    if (row === undefined) {
      throw new Error("Job insert did not produce a readable row");
    }
    return { job: parse_job_row(row), created: insert_result.changes === 1 };
  }

  #transition(input: JobTransitionInput): StoredJobEvent {
    const job_id = JobIdSchema.parse(input.job_id);
    const state = GenerationStateSchema.parse(input.state);
    const event_type = EventTypeSchema.parse(input.event_type);
    const created_at = OccurredAtSchema.parse(input.created_at);
    const current = this.get_by_id(job_id);
    if (current === undefined) {
      throw new Error(`Unknown Gateway job: ${job_id}`);
    }
    const submission = input.submission === undefined ? current.submission : input.submission;
    const error_code = input.error_code === undefined ? current.error_code : input.error_code;
    const submission_json = submission === null ? null : stringify_json(submission);
    const normalized_error = error_code === null ? null : ProviderErrorCodeSchema.parse(error_code);
    const event_json = stringify_json(input.event);
    const sequence_row = this.#select_next_sequence.get(job_id) as {
      sequence: number;
    };
    if (!Number.isSafeInteger(sequence_row.sequence)) {
      throw new Error("Job event sequence exceeded the safe integer range");
    }

    const updated = this.#update_job.run({
      job_id,
      state,
      submission_json,
      error_code: normalized_error,
      updated_at: created_at,
    });
    if (updated.changes !== 1) {
      throw new Error(`Unknown Gateway job: ${job_id}`);
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
  return {
    job_id,
    request_id,
    provider_id,
    state,
    request,
    submission: row.submission_json === null ? null : parse_json(row.submission_json),
    error_code: row.error_code === null ? null : ProviderErrorCodeSchema.parse(row.error_code),
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
