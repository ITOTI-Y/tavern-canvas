import { z } from "zod";

import { RequestIdSchema } from "./ids.js";
import {
  VocabularyCategorySchema,
  VocabularyPackageIdSchema,
  VocabularyPopularitySchema,
  VocabularyRecordIdSchema,
  VocabularySemverSchema,
} from "./vocabulary.js";

const MAX_RESULT_PAGE_SIZE = 50;

export const VocabularyMatchKindSchema = z.enum([
  "exact",
  "hot",
  "prefix",
  "alias",
  "translation",
  "trigram",
]);
export type VocabularyMatchKind = z.infer<typeof VocabularyMatchKindSchema>;

// Compact search-result DTO the Worker returns across the postMessage
// boundary. It never carries a full shard object — only what the UI needs
// to render a result row.
export const VocabularySearchResultSchema = z.strictObject({
  record_id: VocabularyRecordIdSchema,
  display_text: z.string().trim().min(1).max(512),
  category: VocabularyCategorySchema.optional(),
  popularity: VocabularyPopularitySchema,
  match_kind: VocabularyMatchKindSchema,
  score: z.number().nonnegative(),
});
export type VocabularySearchResult = z.infer<typeof VocabularySearchResultSchema>;

export const VocabularyImportFormatSchema = z.enum(["tavern_canvas_jsonl", "legacy_v2"]);
export type VocabularyImportFormat = z.infer<typeof VocabularyImportFormatSchema>;

const VocabularyCursorSchema = z.string().trim().min(1).max(512);

export const VocabularyInitializeRequestSchema = z.strictObject({
  type: z.literal("initialize"),
  request_id: RequestIdSchema,
});
export type VocabularyInitializeRequest = z.infer<typeof VocabularyInitializeRequestSchema>;

export const VocabularyQueryRequestSchema = z.strictObject({
  type: z.literal("query"),
  request_id: RequestIdSchema,
  query: z.string().trim().max(256),
  category: VocabularyCategorySchema.optional(),
});
export type VocabularyQueryRequest = z.infer<typeof VocabularyQueryRequestSchema>;

export const VocabularyNextPageRequestSchema = z.strictObject({
  type: z.literal("next_page"),
  request_id: RequestIdSchema,
  cursor: VocabularyCursorSchema,
});
export type VocabularyNextPageRequest = z.infer<typeof VocabularyNextPageRequestSchema>;

export const VocabularyCancelRequestSchema = z.strictObject({
  type: z.literal("cancel"),
  request_id: RequestIdSchema,
  target_request_id: RequestIdSchema,
});
export type VocabularyCancelRequest = z.infer<typeof VocabularyCancelRequestSchema>;

export const VocabularyImportSourceRequestSchema = z.strictObject({
  type: z.literal("import_source"),
  request_id: RequestIdSchema,
  format: VocabularyImportFormatSchema,
  batch_index: z.number().int().nonnegative(),
  batch_count: z.number().int().positive(),
  payload: z.string().min(1).max(8_388_608),
});
export type VocabularyImportSourceRequest = z.infer<typeof VocabularyImportSourceRequestSchema>;

export const VocabularyDisposeRequestSchema = z.strictObject({
  type: z.literal("dispose"),
  request_id: RequestIdSchema,
});
export type VocabularyDisposeRequest = z.infer<typeof VocabularyDisposeRequestSchema>;

export const VocabularyWorkerRequestSchema = z.discriminatedUnion("type", [
  VocabularyInitializeRequestSchema,
  VocabularyQueryRequestSchema,
  VocabularyNextPageRequestSchema,
  VocabularyCancelRequestSchema,
  VocabularyImportSourceRequestSchema,
  VocabularyDisposeRequestSchema,
]);
export type VocabularyWorkerRequest = z.infer<typeof VocabularyWorkerRequestSchema>;

// The only response without request_id: it is an unprompted lifecycle
// signal emitted once the Worker has loaded the active package, not a
// reply correlated to a specific client request.
export const VocabularyReadyResponseSchema = z.strictObject({
  type: z.literal("ready"),
  package_id: VocabularyPackageIdSchema,
  data_version: VocabularySemverSchema,
  record_count: z.number().int().nonnegative(),
});
export type VocabularyReadyResponse = z.infer<typeof VocabularyReadyResponseSchema>;

export const VocabularyPartialResultsResponseSchema = z.strictObject({
  type: z.literal("partial_results"),
  request_id: RequestIdSchema,
  results: z.array(VocabularySearchResultSchema).max(MAX_RESULT_PAGE_SIZE),
});
export type VocabularyPartialResultsResponse = z.infer<
  typeof VocabularyPartialResultsResponseSchema
>;

export const VocabularyCompleteResponseSchema = z.strictObject({
  type: z.literal("complete"),
  request_id: RequestIdSchema,
  results: z.array(VocabularySearchResultSchema).max(MAX_RESULT_PAGE_SIZE),
  next_cursor: VocabularyCursorSchema.nullable(),
});
export type VocabularyCompleteResponse = z.infer<typeof VocabularyCompleteResponseSchema>;

export const VocabularyProgressResponseSchema = z.strictObject({
  type: z.literal("progress"),
  request_id: RequestIdSchema,
  phase: z.string().trim().min(1).max(64),
  processed: z.number().int().nonnegative(),
  total: z.number().int().positive(),
});
export type VocabularyProgressResponse = z.infer<typeof VocabularyProgressResponseSchema>;

export const VocabularyWorkerErrorCodeSchema = z.enum([
  "cancelled",
  "invalid_request",
  "not_ready",
  "package_unavailable",
  "import_failed",
  "internal_error",
]);
export type VocabularyWorkerErrorCode = z.infer<typeof VocabularyWorkerErrorCodeSchema>;

export const VocabularyErrorResponseSchema = z.strictObject({
  type: z.literal("error"),
  request_id: RequestIdSchema,
  code: VocabularyWorkerErrorCodeSchema,
  message: z.string().trim().min(1).max(1_024),
});
export type VocabularyErrorResponse = z.infer<typeof VocabularyErrorResponseSchema>;

export const VocabularyWorkerResponseSchema = z.discriminatedUnion("type", [
  VocabularyReadyResponseSchema,
  VocabularyPartialResultsResponseSchema,
  VocabularyCompleteResponseSchema,
  VocabularyProgressResponseSchema,
  VocabularyErrorResponseSchema,
]);
export type VocabularyWorkerResponse = z.infer<typeof VocabularyWorkerResponseSchema>;
