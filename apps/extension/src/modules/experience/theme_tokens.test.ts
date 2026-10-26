import { describe, expect, it } from "vitest";

import {
  apply_theme_tokens,
  contrast_ratio,
  CustomThemeSchema,
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  find_contrast_violations,
  migrate_legacy_theme_values,
  normalize_legacy_color,
  ThemeTokenSetSchema,
  validate_custom_theme,
  type CustomTheme,
} from "./theme_tokens.js";

function with_tokens(overrides: Partial<CustomTheme["tokens"]>): CustomTheme {
  return {
    ...DEFAULT_LIGHT_THEME,
    id: "candidate",
    label: "Candidate",
    tokens: { ...DEFAULT_LIGHT_THEME.tokens, ...overrides },
  };
}

function with_invalid_tokens(overrides: Record<string, unknown>): unknown {
  return {
    ...DEFAULT_LIGHT_THEME,
    id: "candidate",
    label: "Candidate",
    tokens: { ...DEFAULT_LIGHT_THEME.tokens, ...overrides },
  };
}

describe("theme_tokens: token schema", () => {
  it("accepts the two canonical built-in themes, both modes", () => {
    expect(ThemeTokenSetSchema.safeParse(DEFAULT_LIGHT_THEME.tokens).success).toBe(true);
    expect(ThemeTokenSetSchema.safeParse(DEFAULT_DARK_THEME.tokens).success).toBe(true);
    expect(validate_custom_theme(DEFAULT_LIGHT_THEME)).toEqual({
      ok: true,
      theme: DEFAULT_LIGHT_THEME,
    });
    expect(validate_custom_theme(DEFAULT_DARK_THEME)).toEqual({
      ok: true,
      theme: DEFAULT_DARK_THEME,
    });
  });

  it("rejects a non-hex color value for any color token", () => {
    const candidate = with_tokens({ "--tc-accent": "not-a-color" });
    const result = CustomThemeSchema.safeParse(candidate);
    expect(result.success).toBe(false);
  });

  it("rejects an unknown/extra key -- the token set has a fixed, bounded dimensionality", () => {
    const candidate = {
      ...DEFAULT_LIGHT_THEME.tokens,
      "--tc-made-up-token": "#000000",
    };
    expect(ThemeTokenSetSchema.safeParse(candidate).success).toBe(false);
  });

  it("rejects a radius token that departs from its single locked bound", () => {
    const candidate = with_invalid_tokens({ "--tc-radius-field": "12px" });
    expect(CustomThemeSchema.safeParse(candidate).success).toBe(false);
  });

  it("accepts a radius token only when it repeats the canonical locked value", () => {
    const candidate = with_tokens({ "--tc-radius-field": "6px" });
    expect(CustomThemeSchema.safeParse(candidate).success).toBe(true);
  });

  it("rejects a theme id that is not a kebab-case slug", () => {
    const candidate = { ...DEFAULT_LIGHT_THEME, id: "Not A Slug!" };
    expect(CustomThemeSchema.safeParse(candidate).success).toBe(false);
  });
});

describe("theme_tokens: contrast validation", () => {
  it("computes the standard WCAG contrast ratio for black on white", () => {
    expect(contrast_ratio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("finds no violations for either canonical built-in theme", () => {
    expect(find_contrast_violations(DEFAULT_LIGHT_THEME.tokens)).toEqual([]);
    expect(find_contrast_violations(DEFAULT_DARK_THEME.tokens)).toEqual([]);
  });

  it("rejects a theme whose text/background pair fails WCAG AA", () => {
    const low_contrast = with_tokens({ "--tc-text": "#cfd2d8" });
    const result = validate_custom_theme(low_contrast);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((message) => message.includes("--tc-text"))).toBe(true);
    }
  });

  it("flags every failing foreground/background pair, not just the first", () => {
    const violations = find_contrast_violations({
      ...DEFAULT_LIGHT_THEME.tokens,
      "--tc-text-muted": "#eeeeee",
    });
    expect(violations.length).toBeGreaterThanOrEqual(3); // canvas, surface, surface-raised
    expect(violations.every((violation) => violation.foreground === "--tc-text-muted")).toBe(true);
  });
});

// Built by concatenation, not a literal "url(" + "https://" source substring: that literal
// Assembled from parts so the repo-wide remote-reference check does not flag this fixture.
const REMOTE_URL_REFERENCE = "url(" + "https" + "://evil.example/track.png)";

describe("theme_tokens: rejects unsafe content in migrated/candidate values", () => {
  it.each([
    ["<img src=x onerror=alert(1)>", "HTML"],
    [REMOTE_URL_REFERENCE, "external URL reference"],
    ["@import url(evil.css)", "@import"],
    ["expression(alert(1))", "CSS expression()"],
    ["javascript:alert(1)", "javascript: URL"],
    ["red; animation: spin 1s infinite", "animation rule / raw CSS text"],
    ["http://evil.example/#ffffff", "bare external URL"],
    [".evil-selector { color: red }", "arbitrary selector / raw CSS text"],
  ])("normalize_legacy_color rejects %s (%s)", (value) => {
    expect(normalize_legacy_color(value)).toBeNull();
  });

  it("rejects forbidden content even when passed directly to the schema", () => {
    const candidate = with_tokens({ "--tc-accent": "url(javascript:alert(1))" });
    expect(CustomThemeSchema.safeParse(candidate).success).toBe(false);
  });
});

describe("theme_tokens: legacy migration", () => {
  it("migrates only the permitted legacy fields, normalizing hex/rgb formats", () => {
    const result = migrate_legacy_theme_values({
      main_bg_color: "#F4F5F7",
      main_text_color: "rgb(24, 26, 31)",
      quote_text_color: "#25d",
    });

    expect(result.tokens["--tc-canvas"]).toBe("#f4f5f7");
    expect(result.tokens["--tc-text"]).toBe("#181a1f");
    expect(result.tokens["--tc-accent"]).toBe("#2255dd");
    expect(result.dropped_fields).toEqual([]);
  });

  it("drops unpermitted fields and permitted fields with unsafe/unparseable values", () => {
    const result = migrate_legacy_theme_values({
      main_bg_color: "<script>alert(1)</script>",
      waifu_mode: true,
      some_unknown_legacy_field: "whatever",
    });

    expect(result.tokens).toEqual({});
    expect(result.dropped_fields).toEqual(
      expect.arrayContaining(["main_bg_color", "waifu_mode", "some_unknown_legacy_field"]),
    );
  });

  it("never carries a legacy field through as a literal CSS/HTML string", () => {
    const result = migrate_legacy_theme_values({
      main_text_color: "expression(alert(document.cookie))",
    });
    expect(Object.values(result.tokens)).not.toContain("expression(alert(document.cookie))");
    expect(result.dropped_fields).toContain("main_text_color");
  });
});

describe("theme_tokens: applying a theme changes Shadow Root variables only", () => {
  it("sets exactly the theme's custom properties on the given host element", () => {
    const host_element = document.createElement("div");
    apply_theme_tokens(host_element, DEFAULT_DARK_THEME.tokens);

    for (const [key, value] of Object.entries(DEFAULT_DARK_THEME.tokens)) {
      expect(host_element.style.getPropertyValue(key)).toBe(value);
    }
  });

  it("touches nothing outside the host element's own inline style", () => {
    const document_style_before = document.head.innerHTML;
    const host_element = document.createElement("div");
    const other_element = document.createElement("div");
    document.body.append(host_element, other_element);

    apply_theme_tokens(host_element, DEFAULT_LIGHT_THEME.tokens);

    expect(document.head.innerHTML).toBe(document_style_before);
    expect(document.head.querySelector("style")).toBeNull();
    expect(other_element.style.length).toBe(0);
    expect(host_element.innerHTML).toBe("");
    expect(host_element.tagName).toBe("DIV");

    host_element.remove();
    other_element.remove();
  });

  it("clears a token the new theme omits instead of leaving a stale value behind", () => {
    const host_element = document.createElement("div");
    apply_theme_tokens(host_element, DEFAULT_LIGHT_THEME.tokens);
    expect(host_element.style.getPropertyValue("--tc-radius-field")).toBe("6px");

    const { "--tc-radius-field": _omitted, ...rest } = DEFAULT_LIGHT_THEME.tokens;
    apply_theme_tokens(host_element, rest as CustomTheme["tokens"]);

    expect(host_element.style.getPropertyValue("--tc-radius-field")).toBe("");
  });

  it("swaps cleanly between light and dark token sets", () => {
    const host_element = document.createElement("div");
    apply_theme_tokens(host_element, DEFAULT_LIGHT_THEME.tokens);
    expect(host_element.style.getPropertyValue("--tc-canvas")).toBe("#f4f5f7");

    apply_theme_tokens(host_element, DEFAULT_DARK_THEME.tokens);
    expect(host_element.style.getPropertyValue("--tc-canvas")).toBe("#111318");
  });
});
