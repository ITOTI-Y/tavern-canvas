import type {
  NovelAiPromptPresetKey,
  NovelAiQualityPreset,
  NovelAiUndesiredContentPreset,
} from "./novelai_models.js";

const V3_UC = {
  heavy:
    "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]",
  light: "lowres, jpeg artifacts, worst quality, watermark, blurry, very displeasing",
  human_focus:
    "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], bad anatomy, bad hands, @_@, mismatched pupils, heart-shaped pupils, glowing eyes",
  none: "lowres",
} as const;

const FURRY_V3_UC = {
  heavy:
    "{{worst quality}}, [displeasing], {unusual pupils}, guide lines, {{unfinished}}, {bad}, url, artist name, {{tall image}}, mosaic, {sketch page}, comic panel, impact (font), [dated], {logo}, ych, {what}, {where is your god now}, {distorted text}, repeated text, {floating head}, {1994}, {widescreen}, absolutely everyone, sequence, {compression artifacts}, hard translated, {cropped}, {commissioner name}, unknown text, high contrast",
  light:
    "{worst quality}, guide lines, unfinished, bad, url, tall image, widescreen, compression artifacts, unknown text",
  none: "lowres",
} as const;

const V4_CURATED_UC = {
  heavy:
    "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, logo, dated, signature, multiple views, gigantic breasts, white blank page, blank page",
  light:
    "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, logo, dated, signature, white blank page, blank page",
  none: "",
} as const;

const V4_FULL_UC = {
  heavy:
    "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, white blank page, blank page",
  light:
    "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, white blank page, blank page",
  none: "",
} as const;

const V4_5_CURATED_UC = {
  heavy:
    "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, negative space, blank page",
  light:
    "blurry, lowres, upscaled, artistic error, scan artifacts, jpeg artifacts, logo, too many watermarks, negative space, blank page",
  human_focus:
    "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, bad anatomy, bad hands, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, @_@, mismatched pupils, glowing eyes, negative space, blank page",
  none: "",
} as const;

const FURRY_FOCUS_UC =
  "{worst quality}, distracting watermark, unfinished, bad quality, {widescreen}, upscale, {sequence}, {{grandfathered content}}, blurred foreground, chromatic aberration, sketch, everyone, [sketch background], simple, [flat colors], ych (character), outline, multiple scenes, [[horror (theme)]], comic";

const FULL_HEAVY_UC =
  "lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page";

const V4_5_FULL_UC = {
  heavy: FULL_HEAVY_UC,
  light:
    "lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page",
  furry_focus: FURRY_FOCUS_UC,
  human_focus: `${FULL_HEAVY_UC}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
  none: "",
} as const;

const V5_UC = {
  heavy: FULL_HEAVY_UC,
  light:
    "lowres, bad hands, bad anatomy, artistic error, sepia, white haze, worst quality, very displeasing, jpeg artifacts, 0::ai-generated::",
  furry_focus: FURRY_FOCUS_UC,
  human_focus: `${FULL_HEAVY_UC}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
  none: "",
} as const;

export interface PromptPresetTexts {
  readonly quality: Readonly<Partial<Record<Exclude<NovelAiQualityPreset, "none">, string>>>;
  readonly undesired_content: Readonly<Partial<Record<NovelAiUndesiredContentPreset, string>>>;
}

/** Verbatim from NovelAI's web client; the server appends nothing, so the client must. */
export const NOVELAI_PROMPT_PRESETS: Readonly<Record<NovelAiPromptPresetKey, PromptPresetTexts>> = {
  v3: {
    quality: { standard: "best quality, amazing quality, very aesthetic, absurdres" },
    undesired_content: V3_UC,
  },
  furry_v3: {
    quality: { standard: "{best quality}, {amazing quality}" },
    undesired_content: FURRY_V3_UC,
  },
  v4_curated: {
    quality: { standard: "rating:general, best quality, very aesthetic, absurdres" },
    undesired_content: V4_CURATED_UC,
  },
  v4_full: {
    quality: { standard: "no text, best quality, very aesthetic, absurdres" },
    undesired_content: V4_FULL_UC,
  },
  v4_5_curated: {
    quality: { standard: "very aesthetic, masterpiece, no text, -0.8::feet::, rating:general" },
    undesired_content: V4_5_CURATED_UC,
  },
  v4_5_full: {
    quality: { standard: "very aesthetic, masterpiece, no text" },
    undesired_content: V4_5_FULL_UC,
  },
  v5: {
    quality: {
      standard: "very aesthetic, masterpiece, no text",
      light: "very aesthetic, amazing quality, no text",
    },
    undesired_content: V5_UC,
  },
};
