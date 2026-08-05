import type { SourceContext } from "./source_context.js";

export interface GenerationSession {
  readonly session_id: string;
  readonly host_root_generation_id: string;
  readonly chat_id: string;
  readonly source_context: SourceContext;
  readonly source_anchor: string;
  readonly generation_anchor: string;
  readonly started_at: string;
  readonly request_ids: ReadonlySet<string>;
  completed_at: string | null;
}

export interface OpenGenerationSessionRequest {
  readonly depth: number;
  readonly host_root_generation_id: string;
  readonly source_context: SourceContext;
}
