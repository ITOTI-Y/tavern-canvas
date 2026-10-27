import { z } from "zod";

/** Quality tags go after the positive prompt; undesired content goes before the negative prompt. */
export const PromptTagKindSchema = z.enum(["quality", "undesired_content"]);
export type PromptTagKind = z.infer<typeof PromptTagKindSchema>;

export const PromptTagChoiceSchema = z.strictObject({
  enabled: z.boolean(),
  /** `novelai:<preset group>:<tier>` for a built-in preset, `custom:<uuid>` for a saved one. */
  preset_id: z.string().trim().min(1).max(200),
});
export type PromptTagChoice = z.infer<typeof PromptTagChoiceSchema>;

/** Stored per provider profile and injected into every request made with that profile. */
export const PromptTagSelectionSchema = z.strictObject({
  quality: PromptTagChoiceSchema,
  undesired_content: PromptTagChoiceSchema,
});
export type PromptTagSelection = z.infer<typeof PromptTagSelectionSchema>;
