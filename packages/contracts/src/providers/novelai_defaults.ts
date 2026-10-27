import { z } from "zod";

import { UuidSchema } from "../ids.js";
import {
  NOVELAI_MAX_PIXELS,
  NovelAiDimensionSchema,
  NovelAiNoiseScheduleSchema,
  NovelAiSamplerSchema,
} from "./novelai.js";
import type { NovelAiModelProfile } from "./novelai_models.js";

/** Stored on a NovelAI provider profile; every image generated with that profile starts from these. */
export const NovelAiGenerationDefaultsSchema = z
  .strictObject({
    width: NovelAiDimensionSchema,
    height: NovelAiDimensionSchema,
    steps: z.number().int().min(1).max(50),
    scale: z.number().min(0).max(10),
    cfg_rescale: z.number().min(0).max(1),
    sampler: NovelAiSamplerSchema,
    noise_schedule: NovelAiNoiseScheduleSchema,
    smea: z.boolean(),
    dyn: z.boolean(),
    variety_plus: z.boolean(),
    /** Vibe library entries sent as vibe references, in order. */
    vibe_asset_ids: z.array(UuidSchema).max(16),
  })
  .check((context) => {
    if (context.value.width * context.value.height > NOVELAI_MAX_PIXELS) {
      context.issues.push({
        code: "custom",
        input: context.value,
        message: `width × height must not exceed ${String(NOVELAI_MAX_PIXELS)} pixels`,
        path: ["width"],
      });
    }
  });
export type NovelAiGenerationDefaults = z.infer<typeof NovelAiGenerationDefaultsSchema>;

export type NovelAiIgnoredParameter =
  "vibe_transfer" | "smea" | "cfg_rescale" | "variety_plus" | "sampler" | "steps";

/** The defaults the selected model does not use, so the user can see what has no effect. */
export function novelai_ignored_parameters(
  profile: NovelAiModelProfile,
  defaults: NovelAiGenerationDefaults,
): readonly NovelAiIgnoredParameter[] {
  const ignored: NovelAiIgnoredParameter[] = [];
  if (defaults.vibe_asset_ids.length > 0 && profile.vibe_transfer === "unsupported") {
    ignored.push("vibe_transfer");
  }
  if ((defaults.smea || defaults.dyn) && !profile.smea) {
    ignored.push("smea");
  }
  if (defaults.cfg_rescale > 0 && !profile.cfg_rescale) {
    ignored.push("cfg_rescale");
  }
  if (defaults.variety_plus && profile.variety_sigma === null) {
    ignored.push("variety_plus");
  }
  const fixed = profile.fixed_settings;
  if (fixed !== null) {
    if (defaults.sampler !== fixed.sampler) {
      ignored.push("sampler");
    }
    if (defaults.steps !== fixed.steps) {
      ignored.push("steps");
    }
  }
  return ignored;
}
