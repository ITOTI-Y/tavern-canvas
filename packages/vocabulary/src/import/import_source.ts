import { z } from "zod";

import { VocabularyRecordSchema, type VocabularyImportFormat } from "@tavern-canvas/contracts";

export const ImportedRecordDraftSchema = VocabularyRecordSchema.omit({ record_id: true });
export type ImportedRecordDraft = z.infer<typeof ImportedRecordDraftSchema>;

export interface MalformedImportRecord {
  readonly position: number;
  readonly reason: string;
}

export interface ImportBatchParseResult {
  readonly records: readonly ImportedRecordDraft[];
  readonly malformed: readonly MalformedImportRecord[];
}

export class ImportSourceFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImportSourceFormatError";
  }
}

export interface ImportSourceAdapter {
  readonly format: VocabularyImportFormat;
  parse_batch(payload: string): ImportBatchParseResult;
}

function error_message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function parse_tavern_canvas_jsonl(payload: string): ImportBatchParseResult {
  const records: ImportedRecordDraft[] = [];
  const malformed: MalformedImportRecord[] = [];

  payload.split(/\r?\n/u).forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      return;
    }
    const position = index + 1;
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch (error) {
      malformed.push({ position, reason: `not valid JSON: ${error_message(error)}` });
      return;
    }
    const result = ImportedRecordDraftSchema.safeParse(parsed);
    if (!result.success) {
      malformed.push({ position, reason: result.error.message });
      return;
    }
    records.push(result.data);
  });

  return { records, malformed };
}

export const tavern_canvas_jsonl_adapter: ImportSourceAdapter = {
  format: "tavern_canvas_jsonl",
  parse_batch: parse_tavern_canvas_jsonl,
};

// Legacy group-tree format: `{ tag_groups, tag_tags }`. Its color/create_time/uuid fields are
// corrupted in known files, so the adapter reads only the fields it understands.

const LegacySubgroupSchema = z.object({
  id_index: z.number().int(),
  name: z.string(),
});

const LegacyGroupSchema = z.object({
  id_index: z.number().int(),
  name: z.string(),
  subgroups: z.array(LegacySubgroupSchema).default([]),
});

const LegacyTagSchema = z.object({
  subgroup_id: z.number().int().optional(),
  text: z.string().optional(),
  desc: z.string().optional(),
});

const LegacyGroupTreeSchema = z.object({
  tag_groups: z.array(LegacyGroupSchema),
  tag_tags: z.array(LegacyTagSchema),
});
type LegacyGroupTree = z.infer<typeof LegacyGroupTreeSchema>;

// Contracts has no content-rating field: NSFW-group membership maps to category "nsfw".
const NSFW_CATEGORY = "nsfw";

// A document whose single group has no subgroups puts every tag in that group; detected
// structurally rather than by group name.
function is_flat_nsfw_document(group_tree: LegacyGroupTree): boolean {
  return group_tree.tag_groups.length === 1 && group_tree.tag_groups[0]?.subgroups.length === 0;
}

function resolve_legacy_category(
  group_tree: LegacyGroupTree,
  subgroup_id: number | undefined,
): string | undefined {
  if (is_flat_nsfw_document(group_tree)) {
    return NSFW_CATEGORY;
  }
  if (subgroup_id === undefined) {
    return undefined;
  }
  const owning_group = group_tree.tag_groups.find((group) =>
    group.subgroups.some((subgroup) => subgroup.id_index === subgroup_id),
  );
  return owning_group?.name;
}

function parse_legacy_v2(payload: string): ImportBatchParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(payload);
  } catch (error) {
    throw new ImportSourceFormatError(`legacy_v2 batch is not valid JSON: ${error_message(error)}`);
  }
  const document_result = LegacyGroupTreeSchema.safeParse(parsed);
  if (!document_result.success) {
    throw new ImportSourceFormatError(
      `legacy_v2 batch does not have the { tag_groups, tag_tags } shape: ${document_result.error.message}`,
    );
  }
  const group_tree = document_result.data;

  const records: ImportedRecordDraft[] = [];
  const malformed: MalformedImportRecord[] = [];

  group_tree.tag_tags.forEach((tag, index) => {
    const position = index + 1;
    const text = tag.text?.trim();
    if (text === undefined || text.length === 0) {
      malformed.push({ position, reason: "missing or empty text" });
      return;
    }
    const category = resolve_legacy_category(group_tree, tag.subgroup_id);
    const desc = tag.desc?.trim();
    const candidate = {
      tag: text,
      aliases: [],
      popularity: 0,
      ...(desc !== undefined && desc.length > 0 ? { translation: desc } : {}),
      ...(category !== undefined ? { category } : {}),
    };
    const result = ImportedRecordDraftSchema.safeParse(candidate);
    if (!result.success) {
      malformed.push({ position, reason: result.error.message });
      return;
    }
    records.push(result.data);
  });

  return { records, malformed };
}

export const legacy_v2_adapter: ImportSourceAdapter = {
  format: "legacy_v2",
  parse_batch: parse_legacy_v2,
};

export const IMPORT_SOURCE_ADAPTERS: Readonly<Record<VocabularyImportFormat, ImportSourceAdapter>> =
  {
    tavern_canvas_jsonl: tavern_canvas_jsonl_adapter,
    legacy_v2: legacy_v2_adapter,
  };
