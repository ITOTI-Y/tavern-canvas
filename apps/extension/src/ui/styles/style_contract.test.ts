import { readFile, readdir } from "node:fs/promises";
import { extname, resolve } from "node:path";

import postcss, { type AnyNode, type AtRule, type Root } from "postcss";
import { beforeAll, describe, expect, it } from "vitest";

const styles_root = resolve(import.meta.dirname, "..");

interface CssFile {
  readonly path: string;
  readonly root: Root;
}

interface DeclarationRef {
  readonly file: string;
  readonly selector: string;
  readonly prop: string;
  readonly value: string;
  readonly line: number;
  readonly in_reduced_motion: boolean;
}

function is_within_reduced_motion(node: AnyNode): boolean {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.type !== "atrule") {
      continue;
    }
    const at_rule = ancestor as unknown as AtRule;
    if (at_rule.name === "media" && /prefers-reduced-motion\s*:\s*reduce/iu.test(at_rule.params)) {
      return true;
    }
  }
  return false;
}

async function collect_css_files(): Promise<readonly CssFile[]> {
  const entries = await readdir(styles_root, { recursive: true, withFileTypes: true });
  const css_entries = entries.filter((entry) => entry.isFile() && extname(entry.name) === ".css");
  return Promise.all(
    css_entries.map(async (entry) => {
      const absolute_path = resolve(entry.parentPath, entry.name);
      const content = await readFile(absolute_path, "utf8");
      return {
        path: absolute_path.slice(styles_root.length + 1),
        root: postcss.parse(content, { from: absolute_path }),
      };
    }),
  );
}

function collect_declarations(files: readonly CssFile[]): readonly DeclarationRef[] {
  const declarations: DeclarationRef[] = [];
  for (const file of files) {
    file.root.walkDecls((decl) => {
      const parent = decl.parent;
      const selector =
        parent && "selector" in parent && typeof parent.selector === "string"
          ? parent.selector
          : "";
      declarations.push({
        file: file.path,
        selector,
        prop: decl.prop,
        value: decl.value,
        line: decl.source?.start?.line ?? 0,
        in_reduced_motion: is_within_reduced_motion(decl),
      });
    });
  }
  return declarations;
}

function format(
  refs: readonly { file: string; line: number; prop?: string; value?: string }[],
): string[] {
  return refs.map(
    (ref) =>
      `${ref.file}:${ref.line}${ref.prop ? ` ${ref.prop}` : ""}${ref.value ? ` = ${ref.value}` : ""}`,
  );
}

const GRADIENT_PATTERN = /(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/iu;
const NOISE_ASSET_PATTERN = /url\([^)]*(?:noise|grain)[^)]*\)/iu;
const VIEWPORT_UNIT_PATTERN = /\d*\.?\d+\s*(?:vw|vh|vmin|vmax)\b/iu;

function is_negative_length(value: string): boolean {
  return /^-\s*(?:\d|\.\d)/u.test(value.trim());
}

function find_forbidden_pattern_violations(decls: readonly DeclarationRef[]) {
  const violations: DeclarationRef[] = [];
  for (const decl of decls) {
    const prop = decl.prop.toLowerCase();
    if (GRADIENT_PATTERN.test(decl.value)) {
      violations.push(decl);
    } else if (prop === "backdrop-filter") {
      violations.push(decl);
    } else if (prop === "filter" && /blur\(/iu.test(decl.value)) {
      violations.push(decl);
    } else if (NOISE_ASSET_PATTERN.test(decl.value)) {
      violations.push(decl);
    } else if (/^background(-image)?$/iu.test(prop) && /url\(/iu.test(decl.value)) {
      violations.push(decl);
    } else if (prop === "letter-spacing" && is_negative_length(decl.value)) {
      violations.push(decl);
    } else if (prop === "font-size" && VIEWPORT_UNIT_PATTERN.test(decl.value)) {
      violations.push(decl);
    }
  }
  return violations;
}

const EXPECTED_RADIUS_TOKENS: Readonly<Record<string, string>> = {
  "--tc-radius-panel": "0",
  "--tc-radius-field": "6px",
  "--tc-radius-image": "8px",
  "--tc-radius-status": "4px",
};

const ALLOWED_MOTION_PROPERTIES = new Set(["transform", "opacity", "color", "background-color"]);
const MOTION_TOKEN_MS: Readonly<Record<string, number>> = {
  "var(--tc-motion-fast)": 140,
  "var(--tc-motion-normal)": 180,
  "var(--tc-motion-slow)": 220,
};
const MIN_MOTION_MS = 140;
const MAX_MOTION_MS = 220;

function split_top_level(value: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
    }
    if (char === separator && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter((part) => part.length > 0);
}

function tokenize_whitespace(value: string): string[] {
  const tokens: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
    }
    if (/\s/u.test(char) && depth === 0) {
      if (current.length > 0) {
        tokens.push(current);
      }
      current = "";
    } else {
      current += char;
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
}

function resolve_duration_ms(token: string): number | null {
  const known = MOTION_TOKEN_MS[token];
  if (known !== undefined) {
    return known;
  }
  const match = /^(\d*\.?\d+)(ms|s)$/u.exec(token);
  if (!match) {
    return null;
  }
  const [, amount, unit] = match;
  const numeric = Number(amount);
  return unit === "s" ? numeric * 1000 : numeric;
}

function find_transition_violations(decls: readonly DeclarationRef[]) {
  const violations: DeclarationRef[] = [];
  for (const decl of decls) {
    if (decl.prop.toLowerCase() !== "transition" || decl.in_reduced_motion) {
      continue;
    }
    for (const segment of split_top_level(decl.value, ",")) {
      const [property_token, duration_token] = tokenize_whitespace(segment);
      const duration_ms = duration_token ? resolve_duration_ms(duration_token) : null;
      const property_allowed =
        property_token !== undefined && ALLOWED_MOTION_PROPERTIES.has(property_token);
      const duration_in_range =
        duration_ms !== null && duration_ms >= MIN_MOTION_MS && duration_ms <= MAX_MOTION_MS;
      if (!property_allowed || !duration_in_range) {
        violations.push(decl);
      }
    }
  }
  return violations;
}

function find_animation_duration_violations(decls: readonly DeclarationRef[]) {
  const violations: DeclarationRef[] = [];
  for (const decl of decls) {
    if (decl.prop.toLowerCase() !== "animation-duration" || decl.in_reduced_motion) {
      continue;
    }
    for (const segment of split_top_level(decl.value, ",")) {
      const duration_ms = resolve_duration_ms(segment);
      if (duration_ms === null || duration_ms < MIN_MOTION_MS || duration_ms > MAX_MOTION_MS) {
        violations.push(decl);
      }
    }
  }
  return violations;
}

function find_keyframes_violations(files: readonly CssFile[]): string[] {
  const violations: string[] = [];
  for (const file of files) {
    file.root.walkAtRules(/^(-webkit-)?keyframes$/u, (at_rule) => {
      if (/spin(ner)?/iu.test(at_rule.params)) {
        violations.push(
          `${file.path}: @keyframes ${at_rule.params} reads as a spinner; loading states use skeletons`,
        );
      }
      at_rule.walkDecls((decl) => {
        if (!ALLOWED_MOTION_PROPERTIES.has(decl.prop.toLowerCase())) {
          violations.push(
            `${file.path}: @keyframes ${at_rule.params} animates disallowed property "${decl.prop}"`,
          );
        }
      });
    });
  }
  return violations;
}

function has_reduced_motion_rule(files: readonly CssFile[]): boolean {
  let found = false;
  for (const file of files) {
    file.root.walkAtRules("media", (at_rule) => {
      if (!/prefers-reduced-motion\s*:\s*reduce/iu.test(at_rule.params)) {
        return;
      }
      at_rule.walkDecls((decl) => {
        if (/^(transition|animation)(-duration)?$/iu.test(decl.prop)) {
          found = true;
        }
      });
    });
  }
  return found;
}

function collect_font_face_urls(files: readonly CssFile[]): { file: string; url: string }[] {
  const urls: { file: string; url: string }[] = [];
  for (const file of files) {
    file.root.walkAtRules("font-face", (at_rule) => {
      at_rule.walkDecls("src", (decl) => {
        for (const match of decl.value.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/giu)) {
          urls.push({ file: file.path, url: match[1] ?? "" });
        }
      });
    });
  }
  return urls;
}

const NEUTRAL_TOKENS = [
  "--tc-canvas",
  "--tc-surface",
  "--tc-surface-raised",
  "--tc-text",
  "--tc-text-muted",
  "--tc-divider",
] as const;
const ACCENT_TOKENS = ["--tc-accent", "--tc-accent-hover"] as const;
const STATUS_TOKENS = ["--tc-success", "--tc-warning", "--tc-error"] as const;

const LIGHT_SELECTOR = ":host";
const DARK_SELECTOR = ':host([data-color-mode="dark"])';

function collect_tokens_for_selector(
  decls: readonly DeclarationRef[],
  selector: string,
): Map<string, string> {
  const tokens = new Map<string, string>();
  for (const decl of decls) {
    if (decl.selector !== selector || !decl.prop.startsWith("--tc-")) {
      continue;
    }
    tokens.set(decl.prop, decl.value.trim());
  }
  return tokens;
}

function collect_z_index_tokens(decls: readonly DeclarationRef[], selector: string): number[] {
  return decls
    .filter((decl) => decl.selector === selector && /^--tc-z-/u.test(decl.prop))
    .map((decl) => Number(decl.value.trim()))
    .filter((value) => Number.isFinite(value));
}

function hex_to_rgb(hex: string): [number, number, number] {
  const normalized = hex.trim().replace("#", "");
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

function contrast_ratio(hex_a: string, hex_b: string): number {
  const la = relative_luminance(hex_a);
  const lb = relative_luminance(hex_b);
  const [lighter, darker] = la >= lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

const AA_BODY_TEXT_RATIO = 4.5;
const AA_LARGE_TEXT_RATIO = 3;

describe("style contract", () => {
  let files: readonly CssFile[];
  let decls: readonly DeclarationRef[];

  beforeAll(async () => {
    files = await collect_css_files();
    decls = collect_declarations(files);
  });

  it("parsed at least the token, base, and utility stylesheets", () => {
    expect(files.length).toBeGreaterThanOrEqual(3);
  });

  it("has no gradients, backdrop blur, grain/noise assets, decorative backgrounds, negative letter-spacing, or viewport font sizing", () => {
    expect(format(find_forbidden_pattern_violations(decls))).toEqual([]);
  });

  it("defines the exact panel/field/image/status radius tokens", () => {
    const light_tokens = collect_tokens_for_selector(decls, LIGHT_SELECTOR);
    for (const [token, expected] of Object.entries(EXPECTED_RADIUS_TOKENS)) {
      expect(light_tokens.get(token)).toBe(expected);
    }
  });

  it("keeps transition durations within 140-220ms on an allowed property list", () => {
    expect(format(find_transition_violations(decls))).toEqual([]);
    expect(format(find_animation_duration_violations(decls))).toEqual([]);
    expect(find_keyframes_violations(files)).toEqual([]);
  });

  it("disables nonessential transitions under prefers-reduced-motion", () => {
    expect(has_reduced_motion_rule(files)).toBe(true);
  });

  it("loads first-party fonts from relative local assets only", () => {
    const urls = collect_font_face_urls(files);
    expect(urls.length).toBeGreaterThan(0);
    for (const { file, url } of urls) {
      expect(`${file}: ${url}`).not.toMatch(/^(?:[a-z]+:)?\/\//iu);
      expect(`${file}: ${url}`).not.toMatch(/^data:/iu);
    }
  });

  it("defines separate, non-overlapping neutral/accent/success/warning/error token families", () => {
    for (const selector of [LIGHT_SELECTOR, DARK_SELECTOR]) {
      const tokens = collect_tokens_for_selector(decls, selector);
      for (const token of [...NEUTRAL_TOKENS, ...ACCENT_TOKENS, ...STATUS_TOKENS]) {
        expect(tokens.get(token), `${selector} is missing ${token}`).toBeDefined();
      }

      const accent_and_status = [...ACCENT_TOKENS, ...STATUS_TOKENS].map((token) =>
        tokens.get(token),
      );
      expect(new Set(accent_and_status).size).toBe(accent_and_status.length);

      const neutral_values = new Set(NEUTRAL_TOKENS.map((token) => tokens.get(token)));
      for (const value of accent_and_status) {
        expect(neutral_values.has(value)).toBe(false);
      }
    }
  });

  it("documents a z-index scale as tokens instead of ad-hoc values", () => {
    const light_scale = collect_z_index_tokens(decls, LIGHT_SELECTOR);
    expect(light_scale.length).toBeGreaterThanOrEqual(2);
    const sorted = [...light_scale].sort((a, b) => a - b);
    expect(new Set(sorted).size).toBe(sorted.length);
  });

  it("meets WCAG AA contrast for text/status tokens against every neutral surface, both themes", () => {
    for (const selector of [LIGHT_SELECTOR, DARK_SELECTOR]) {
      const tokens = collect_tokens_for_selector(decls, selector);
      const backgrounds = ["--tc-canvas", "--tc-surface", "--tc-surface-raised"] as const;
      const body_foregrounds = [
        "--tc-text",
        "--tc-text-muted",
        "--tc-accent",
        "--tc-error",
      ] as const;

      for (const fg of body_foregrounds) {
        for (const bg of backgrounds) {
          const fg_value = tokens.get(fg);
          const bg_value = tokens.get(bg);
          expect(fg_value, `${selector} ${fg}`).toBeDefined();
          expect(bg_value, `${selector} ${bg}`).toBeDefined();
          const ratio = contrast_ratio(fg_value ?? "", bg_value ?? "");
          expect(ratio, `${selector} ${fg} on ${bg} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(
            AA_BODY_TEXT_RATIO,
          );
        }
      }

      for (const fg of ["--tc-success", "--tc-warning"] as const) {
        for (const bg of backgrounds) {
          const fg_value = tokens.get(fg);
          const bg_value = tokens.get(bg);
          const ratio = contrast_ratio(fg_value ?? "", bg_value ?? "");
          const minimum =
            bg === "--tc-canvas" && selector === LIGHT_SELECTOR
              ? AA_LARGE_TEXT_RATIO
              : AA_BODY_TEXT_RATIO;
          expect(ratio, `${selector} ${fg} on ${bg} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(
            minimum,
          );
        }
      }
    }
  });

  // --tc-accent is a solid fill behind text and the dark accent carries white at only 2.93:1, so --tc-on-accent is pinned against both fills in both themes.
  it("meets WCAG AA contrast for the on-accent foreground against every accent fill, both themes", () => {
    for (const selector of [LIGHT_SELECTOR, DARK_SELECTOR]) {
      const tokens = collect_tokens_for_selector(decls, selector);
      const on_accent = tokens.get("--tc-on-accent");
      expect(on_accent, `${selector} is missing --tc-on-accent`).toBeDefined();

      for (const fill of ACCENT_TOKENS) {
        const fill_value = tokens.get(fill);
        expect(fill_value, `${selector} ${fill}`).toBeDefined();
        const ratio = contrast_ratio(on_accent ?? "", fill_value ?? "");
        expect(
          ratio,
          `${selector} --tc-on-accent on ${fill} = ${ratio.toFixed(2)}`,
        ).toBeGreaterThanOrEqual(AA_BODY_TEXT_RATIO);
      }
    }
  });
});
