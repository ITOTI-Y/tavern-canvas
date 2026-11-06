import { z } from "zod";

export type SceneFrame = "portrait" | "landscape" | "square";

export interface ImageSize {
  readonly width: number;
  readonly height: number;
}

const CharacterPromptSchema = z.object({
  name: z.string(),
  prompt: z.string(),
  negative_prompt: z.string(),
});

export const CreationSceneSchema = z.object({
  id: z.string().min(1),
  enabled: z.boolean(),
  scene: z.string(),
  /** The source paragraph, so the scene can be checked against the story. */
  excerpt: z.string(),
  characters: z.array(z.string()),
  size: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }),
  positive_prompt: z.string(),
  negative_prompt: z.string(),
  character_prompts: z.array(CharacterPromptSchema),
  image_ids: z.array(z.string()),
  active_image_id: z.string().nullable(),
  last_error: z.string().nullable(),
});
export type CreationScene = z.infer<typeof CreationSceneSchema>;

export const CREATION_KINDS = ["story", "prompt", "strip"] as const;
export type CreationKind = (typeof CREATION_KINDS)[number];

/** The payload of a `creation` library record; `display_name` is the history title. */
export const CreationPayloadSchema = z.object({
  display_name: z.string(),
  kind: z.enum(CREATION_KINDS),
  created_at: z.string(),
  /** Story mode: the text the scenes were planned from, and the worldbooks sent with it. */
  story: z.string().default(""),
  worldbooks: z.array(z.string()).default([]),
  /** Strip mode: the chat and the inclusive message range the panels retell. */
  chat_id: z.string().nullable().default(null),
  from_message: z.number().int().nullable().default(null),
  to_message: z.number().int().nullable().default(null),
  style: z.enum(["strip", "default"]).default("strip"),
  scenes: z.array(CreationSceneSchema),
});
export type CreationPayload = z.infer<typeof CreationPayloadSchema>;

export interface Creation extends CreationPayload {
  readonly id: string;
}

/** `null` for a record this version cannot read, which the history then leaves out. */
export function read_creation(record: {
  readonly id: string;
  readonly payload: Readonly<Record<string, unknown>>;
}): Creation | null {
  const parsed = CreationPayloadSchema.safeParse(record.payload);
  return parsed.success ? { ...parsed.data, id: record.id } : null;
}

/** A plain copy for storage: reactive proxies and class instances cannot be cloned into IndexedDB. */
export function creation_payload(creation: Creation): CreationPayload {
  const { id: _id, ...payload } = creation;
  return CreationPayloadSchema.parse(JSON.parse(JSON.stringify(payload)));
}
