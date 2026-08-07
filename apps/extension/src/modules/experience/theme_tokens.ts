import { z } from "zod";

/**
 * Runtime counterpart of ui/styles/tokens.css's `:host` / `:host([data-color-mode="dark"])`
 * blocks. A "theme" in TavernCanvas is nothing but a validated vector of these exact custom
 * property names -- there is no free-text CSS surface anywhere in this module (the removed
 * `[custom-css-injector]` legacy behavior, feature_matrix.md's theme.legacy_dom_style_mutation
 * row). Keep this list in sync with tokens.css and style_contract.test.ts's NEUTRAL/ACCENT/STATUS
 * token lists by hand; nothing enforces the two automatically.
 */
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/u;

const HexColorSchema = z
  .string()
  .regex(HEX_COLOR_PATTERN, "Theme color tokens must be a strict 6-digit hex color, e.g. #2457d6");

/**
 * Radius tokens are locked by taste directive ("shape consistency lock ... no component invents a
 * fifth radius"): a custom theme may omit them (falling back to the canonical value) or repeat the
 * canonical value, never override it. Each token's "bound" is a set of exactly one value -- still a
 * real, machine-checked bound, not a passthrough.
 */
const THEME_RADIUS_TOKEN_BOUNDS = {
  "--tc-radius-panel": "0",
  "--tc-radius-field": "6px",
  "--tc-radius-image": "8px",
  "--tc-radius-status": "4px",
} as const;

export const ThemeTokenSetSchema = z.strictObject({
  "--tc-canvas": HexColorSchema,
  "--tc-surface": HexColorSchema,
  "--tc-surface-raised": HexColorSchema,
  "--tc-text": HexColorSchema,
  "--tc-text-muted": HexColorSchema,
  "--tc-divider": HexColorSchema,
  "--tc-accent": HexColorSchema,
  "--tc-accent-hover": HexColorSchema,
  "--tc-success": HexColorSchema,
  "--tc-warning": HexColorSchema,
  "--tc-error": HexColorSchema,
  "--tc-radius-panel": z.literal(THEME_RADIUS_TOKEN_BOUNDS["--tc-radius-panel"]).optional(),
  "--tc-radius-field": z.literal(THEME_RADIUS_TOKEN_BOUNDS["--tc-radius-field"]).optional(),
  "--tc-radius-image": z.literal(THEME_RADIUS_TOKEN_BOUNDS["--tc-radius-image"]).optional(),
  "--tc-radius-status": z.literal(THEME_RADIUS_TOKEN_BOUNDS["--tc-radius-status"]).optional(),
});
export type ThemeTokenSet = z.infer<typeof ThemeTokenSetSchema>;

export type ThemeColorTokenKey = Exclude<
  keyof ThemeTokenSet,
  keyof typeof THEME_RADIUS_TOKEN_BOUNDS
>;

const COLOR_TOKEN_KEYS: readonly ThemeColorTokenKey[] = [
  "--tc-canvas",
  "--tc-surface",
  "--tc-surface-raised",
  "--tc-text",
  "--tc-text-muted",
  "--tc-divider",
  "--tc-accent",
  "--tc-accent-hover",
  "--tc-success",
  "--tc-warning",
  "--tc-error",
];

const RADIUS_TOKEN_KEYS = Object.keys(
  THEME_RADIUS_TOKEN_BOUNDS,
) as readonly (keyof typeof THEME_RADIUS_TOKEN_BOUNDS)[];

const ALL_TOKEN_KEYS: readonly (keyof ThemeTokenSet)[] = [
  ...COLOR_TOKEN_KEYS,
  ...RADIUS_TOKEN_KEYS,
];

const ThemeIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u, "Theme id must be a lowercase kebab-case slug");

export const CustomThemeSchema = z.strictObject({
  id: ThemeIdSchema,
  label: z.string().min(1).max(64),
  color_mode: z.enum(["light", "dark"]),
  tokens: ThemeTokenSetSchema,
});
export type CustomTheme = z.infer<typeof CustomThemeSchema>;

// ---------------------------------------------------------------------------
// Contrast validation (WCAG 2.x relative luminance), mirroring
// ui/styles/style_contract.test.ts's own algorithm so the two never silently diverge on formula,
// only on which token pairs they gate.
// ---------------------------------------------------------------------------

function hex_to_rgb(hex: string): readonly [number, number, number] {
  const normalized = hex.slice(1);
  return [0, 2, 4].map((offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function channel_to_linear(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relative_luminance(hex: string): number {
  const [r, g, b] = hex_to_rgb(hex);
  return (
    0.2126 * channel_to_linear(r) + 0.7152 * channel_to_linear(g) + 0.0722 * channel_to_linear(b)
  );
}

export function contrast_ratio(hex_a: string, hex_b: string): number {
  const la = relative_luminance(hex_a);
  const lb = relative_luminance(hex_b);
  const [lighter, darker] = la >= lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

const CONTRAST_BACKGROUND_KEYS: readonly ThemeColorTokenKey[] = [
  "--tc-canvas",
  "--tc-surface",
  "--tc-surface-raised",
];
// Body-text-bearing tokens only (mirrors style_contract.test.ts's own body_foregrounds list).
// --tc-success/--tc-warning are icon/badge-only tokens tokens.css itself documents as clearing
// only large-text AA on bare --tc-canvas, not body-text AA -- out of scope for this uniform gate.
const CONTRAST_FOREGROUND_KEYS: readonly ThemeColorTokenKey[] = [
  "--tc-text",
  "--tc-text-muted",
  "--tc-accent",
  "--tc-error",
];
const AA_BODY_TEXT_RATIO = 4.5;

export interface ContrastViolation {
  readonly foreground: ThemeColorTokenKey;
  readonly background: ThemeColorTokenKey;
  readonly ratio: number;
}

export function find_contrast_violations(tokens: ThemeTokenSet): readonly ContrastViolation[] {
  const violations: ContrastViolation[] = [];
  for (const foreground of CONTRAST_FOREGROUND_KEYS) {
    for (const background of CONTRAST_BACKGROUND_KEYS) {
      const ratio = contrast_ratio(tokens[foreground], tokens[background]);
      if (ratio < AA_BODY_TEXT_RATIO) {
        violations.push({ foreground, background, ratio });
      }
    }
  }
  return violations;
}

export type ThemeValidationResult =
  | { readonly ok: true; readonly theme: CustomTheme }
  | { readonly ok: false; readonly errors: readonly string[] };

export function validate_custom_theme(candidate: unknown): ThemeValidationResult {
  const parsed = CustomThemeSchema.safeParse(candidate);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  }
  const violations = find_contrast_violations(parsed.data.tokens);
  if (violations.length > 0) {
    return {
      ok: false,
      errors: violations.map(
        (violation) =>
          `${violation.foreground} on ${violation.background} contrast ratio ${violation.ratio.toFixed(2)} is below WCAG AA ${String(AA_BODY_TEXT_RATIO)}:1`,
      ),
    };
  }
  return { ok: true, theme: parsed.data };
}

// ---------------------------------------------------------------------------
// Legacy migration: only a fixed, permitted subset of legacy color fields carries over. Everything
// else -- unknown fields, and any permitted field whose value fails normalization -- is dropped,
// never partially trusted.
// ---------------------------------------------------------------------------

const FORBIDDEN_VALUE_PATTERNS: readonly RegExp[] = [
  /<[a-z!]/iu, // HTML tags
  /url\s*\(/iu, // external/asset resource reference
  /@import/iu,
  /expression\s*\(/iu, // legacy CSS expression() injection vector
  /javascript:/iu,
  /animation|@keyframes|transition/iu, // animation rules
  /[{};]/u, // raw CSS declaration/selector syntax
  /^\s*(?:[a-z][\w+.-]*:)?\/\//iu, // absolute or protocol-relative URL
];

function contains_forbidden_content(value: string): boolean {
  return FORBIDDEN_VALUE_PATTERNS.some((pattern) => pattern.test(value));
}

function expand_short_hex(hex: string): string {
  return hex
    .split("")
    .map((channel) => channel + channel)
    .join("");
}

function clamp_byte(value: string): number {
  return Math.min(255, Math.max(0, Number.parseInt(value, 10)));
}

/**
 * Normalizes a raw legacy color value (hex or rgb()/rgba()) into the strict 6-digit hex this
 * module accepts. Returns null for anything unrecognized or matching a forbidden pattern --
 * migration drops the field rather than guessing.
 */
export function normalize_legacy_color(raw: unknown): string | null {
  if (typeof raw !== "string") {
    return null;
  }
  const value = raw.trim();
  if (value.length === 0 || contains_forbidden_content(value)) {
    return null;
  }

  const hex6 = /^#([0-9a-f]{6})$/iu.exec(value);
  if (hex6?.[1] !== undefined) {
    return `#${hex6[1].toLowerCase()}`;
  }

  const hex3 = /^#([0-9a-f]{3})$/iu.exec(value);
  if (hex3?.[1] !== undefined) {
    return `#${expand_short_hex(hex3[1]).toLowerCase()}`;
  }

  const rgb = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/iu.exec(
    value,
  );
  if (rgb?.[1] !== undefined && rgb[2] !== undefined && rgb[3] !== undefined) {
    const channels = [rgb[1], rgb[2], rgb[3]].map((channel) =>
      clamp_byte(channel).toString(16).padStart(2, "0"),
    );
    return `#${channels.join("")}`;
  }

  return null;
}

/**
 * Best-effort mapping from chatu8 v2.8.1's `utils/settings/theme.js` color-picker fields
 * (feature_matrix.md's theme.picker_and_custom_editor row) to the v3 token schema. The legacy
 * source archive is gitignored and was not present in this worktree at implementation time, so
 * exact field names could not be confirmed against `populateThemeColorPickers`; this list uses
 * the closest documented SillyTavern-family theme field naming as a placeholder. Reconcile against
 * the real legacy source at stage merge -- same reconciliation pattern used for ports defined
 * ahead of their owning task landing (Stage 05/06).
 */
export const LEGACY_FIELD_TO_TOKEN: Readonly<Record<string, ThemeColorTokenKey>> = {
  main_bg_color: "--tc-canvas",
  chat_tint_color: "--tc-surface",
  bot_mes_blur_tint_color: "--tc-surface-raised",
  main_text_color: "--tc-text",
  italics_text_color: "--tc-text-muted",
  border_color: "--tc-divider",
  quote_text_color: "--tc-accent",
  underline_text_color: "--tc-accent-hover",
  valid_color: "--tc-success",
  warning_color: "--tc-warning",
  invalid_color: "--tc-error",
};

export interface LegacyThemeMigrationResult {
  readonly tokens: Partial<Record<ThemeColorTokenKey, string>>;
  readonly dropped_fields: readonly string[];
}

export function migrate_legacy_theme_values(
  raw: Readonly<Record<string, unknown>>,
): LegacyThemeMigrationResult {
  const tokens: Partial<Record<ThemeColorTokenKey, string>> = {};
  const dropped_fields: string[] = [];

  for (const [field, token_key] of Object.entries(LEGACY_FIELD_TO_TOKEN)) {
    if (!(field in raw)) {
      continue;
    }
    const normalized = normalize_legacy_color(raw[field]);
    if (normalized === null) {
      dropped_fields.push(field);
      continue;
    }
    tokens[token_key] = normalized;
  }

  for (const field of Object.keys(raw)) {
    if (!(field in LEGACY_FIELD_TO_TOKEN)) {
      dropped_fields.push(field);
    }
  }

  return { tokens, dropped_fields: Object.freeze(dropped_fields) };
}

// ---------------------------------------------------------------------------
// Applying a theme changes Shadow Root custom properties only -- no <style> element, no innerHTML,
// no document-level mutation of any kind.
// ---------------------------------------------------------------------------

export function apply_theme_tokens(host_element: HTMLElement, tokens: ThemeTokenSet): void {
  for (const key of ALL_TOKEN_KEYS) {
    const value = tokens[key];
    if (value === undefined) {
      host_element.style.removeProperty(key);
    } else {
      host_element.style.setProperty(key, value);
    }
  }
}

// ---------------------------------------------------------------------------
// The two canonical built-ins, transcribed from tokens.css's :host / dark-mode override blocks.
// Custom themes validate against the same schema and contrast gate as these; there is no separate
// "built-in" code path.
// ---------------------------------------------------------------------------

export const DEFAULT_LIGHT_THEME: CustomTheme = {
  id: "default-light",
  label: "Default light",
  color_mode: "light",
  tokens: {
    "--tc-canvas": "#f4f5f7",
    "--tc-surface": "#ffffff",
    "--tc-surface-raised": "#f8f9fb",
    "--tc-text": "#181a1f",
    "--tc-text-muted": "#616773",
    "--tc-divider": "#d8dce3",
    "--tc-accent": "#2457d6",
    "--tc-accent-hover": "#1f49b8",
    "--tc-success": "#16815d",
    "--tc-warning": "#9a6700",
    "--tc-error": "#c23838",
    "--tc-radius-panel": "0",
    "--tc-radius-field": "6px",
    "--tc-radius-image": "8px",
    "--tc-radius-status": "4px",
  },
};

export const DEFAULT_DARK_THEME: CustomTheme = {
  id: "default-dark",
  label: "Default dark",
  color_mode: "dark",
  tokens: {
    "--tc-canvas": "#111318",
    "--tc-surface": "#181b21",
    "--tc-surface-raised": "#20242b",
    "--tc-text": "#f4f5f7",
    "--tc-text-muted": "#aeb4bf",
    "--tc-divider": "#343a44",
    "--tc-accent": "#6f91ff",
    "--tc-accent-hover": "#7d9cff",
    "--tc-success": "#45c995",
    "--tc-warning": "#e8b44e",
    "--tc-error": "#ff7b7b",
    "--tc-radius-panel": "0",
    "--tc-radius-field": "6px",
    "--tc-radius-image": "8px",
    "--tc-radius-status": "4px",
  },
};
