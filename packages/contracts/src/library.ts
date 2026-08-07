import { z } from "zod";

import { ImageIdSchema, UuidSchema } from "./ids.js";

/**
 * Persona and knowledge records: the two library surfaces Stage 06 could only read. Both are
 * plain content, so the schemas here carry no transport or credential shape at all; the one
 * field that could smuggle a remote fetch, a persona avatar, is an `ImageId` into the local image
 * store rather than a URL.
 */

export const PersonaRoleSchema = z.enum(["user", "assistant"]);
export type PersonaRole = z.infer<typeof PersonaRoleSchema>;

const persona_fields = {
  id: UuidSchema,
  display_name: z.string().trim().min(1).max(120),
  role: PersonaRoleSchema,
  description: z.string().trim().max(8_000),
  greeting: z.string().trim().max(4_000),
  avatar_image_id: ImageIdSchema.nullable(),
  is_active: z.boolean(),
};

export const PersonaProfileDraftSchema = z.strictObject(persona_fields);
export type PersonaProfileDraft = z.infer<typeof PersonaProfileDraftSchema>;

export const PersonaProfileSchema = z.strictObject({
  ...persona_fields,
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});
export type PersonaProfile = z.infer<typeof PersonaProfileSchema>;

export const KnowledgeSourceTypeSchema = z.enum(["manual", "imported", "character"]);
export type KnowledgeSourceType = z.infer<typeof KnowledgeSourceTypeSchema>;

const knowledge_fields = {
  id: UuidSchema,
  title: z.string().trim().min(1).max(200),
  source_type: KnowledgeSourceTypeSchema,
  content: z.string().trim().min(1).max(50_000),
  keywords: z
    .array(z.string().trim().min(1).max(80))
    .max(64)
    .refine((values) => new Set(values).size === values.length, "keywords must not repeat"),
  /** Higher wins when the prompt builder has to drop entries to fit a budget. */
  priority: z.number().int().min(0).max(1000),
  enabled: z.boolean(),
};

export const KnowledgeRecordDraftSchema = z.strictObject(knowledge_fields);
export type KnowledgeRecordDraft = z.infer<typeof KnowledgeRecordDraftSchema>;

export const KnowledgeRecordSchema = z.strictObject({
  ...knowledge_fields,
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});
export type KnowledgeRecord = z.infer<typeof KnowledgeRecordSchema>;
