import { describe, expect, it } from "vitest";

import { select_random_preset, select_random_vibe_group } from "./random_group_transform.js";
import { apply_regex_rules, test_regex_rule, type RegexRule } from "./regex_transform.js";
import {
  apply_character_replacement_rules,
  apply_replacement_rules,
  evaluate_if_condition,
  extract_if_condition,
  parse_replacement_rules,
  safe_evaluate_if_condition,
  type ReplacementRule,
} from "./replacement_transform.js";
import {
  deduplicate_tags,
  get_base_tag,
  has_weight,
  join_prompt_parts,
  normalize_physical_newlines,
} from "./tag_normalizer.js";
import {
  map_to_provider_request,
  merge_adjacent_messages,
  resolve_roll_placeholders,
  run_prompt_pipeline,
  strip_chinese_annotations,
  substitute_template_placeholders,
  type PipelineStageId,
  type ProviderRequestBase,
  type PromptPipelineInput,
} from "./prompt_pipeline.js";

const GENERATION_ANCHOR = "a".repeat(64);
const REQUEST_ID = "11111111-1111-4111-8111-111111111111";

function novelai_base(): ProviderRequestBase {
  return {
    provider_id: "novelai",
    request_id: REQUEST_ID,
    generation_anchor: GENERATION_ANCHOR,
    output_count: 1,
    model_id: "nai-diffusion-4",
    sampler: "k_euler",
    width: 832,
    height: 1216,
    steps: 28,
    scale: 5,
    cfg_rescale: 0,
    noise_schedule: "karras",
    quality_toggle: true,
    undesired_content_preset: "heavy",
    smea: false,
    dyn: false,
  };
}

function build_input(overrides: Partial<PromptPipelineInput> = {}): PromptPipelineInput {
  return {
    raw_scene: "1girl, smile",
    context: null,
    mvu_store: null,
    fixed_positive_prompt: "masterpiece, best quality",
    fixed_positive_prompt_end: "",
    fixed_negative_prompt: "",
    ucp_negative_prompt: "",
    aqt_quality_tags: "",
    preset_selection: null,
    vibe_group_selection: null,
    replacement_rules: [],
    regex_rules: [],
    provider_request_base: novelai_base(),
    ...overrides,
  };
}

describe("prompt_pipeline: fixed stage order", () => {
  it("runs every stage in the exact declared order", () => {
    const result = run_prompt_pipeline(build_input());
    const order: readonly PipelineStageId[] = result.trace.map((entry) => entry.stage);
    expect(order).toEqual([
      "context",
      "mvu_resolution",
      "quality_controls",
      "preset_selection",
      "replacement_rules",
      "regex_rules",
      "roll_resolution",
      "tag_normalization",
      "provider_mapping",
    ]);
  });

  it("detects an ordering conflict: a regex rule targeting roll output never matches, because regex runs before roll resolution", () => {
    const regex_rules: RegexRule[] = [
      { id: "r1", pattern: "ABCDEFGH", flags: "g", replacement: "MATCHED" },
    ];
    // Regex runs before roll resolution, so a rule matching the fixed roll output never sees it.
    const result = run_prompt_pipeline(
      build_input({
        raw_scene: "{{roll 10}}",
        regex_rules,
        roll_seed_picker: () => 0,
      }),
    );
    expect(result.positive_prompt).not.toContain("MATCHED");
  });

  it("keeps idempotent stages stable when re-run on their own output (tag dedup, regex)", () => {
    const once = deduplicate_tags("1girl, (1girl:1.2), smile, smile");
    const twice = deduplicate_tags(once);
    expect(twice).toBe(once);

    const rules: RegexRule[] = [{ id: "r1", pattern: "foo", flags: "g", replacement: "bar" }];
    const applied_once = apply_regex_rules("foo baz", rules).text;
    const applied_twice = apply_regex_rules(applied_once, rules).text;
    expect(applied_twice).toBe(applied_once);
  });

  it("preserves the original raw scene verbatim as metadata alongside the transformed prompt", () => {
    const result = run_prompt_pipeline(
      build_input({ raw_scene: "1girl（一个女孩）, （标注）smile" }),
    );
    expect(result.original_text).toBe("1girl（一个女孩）, （标注）smile");
    expect(result.positive_prompt).not.toContain("（");
  });

  it("normalizes comma spacing across empty fragments", () => {
    expect(join_prompt_parts(["a", "", "  ", "b", undefined, "c"])).toBe("a, b, c");
    expect(join_prompt_parts([" a ", "", "b"])).toBe("a, b");
  });

  it("collapses physical newlines produced by multi-line model output", () => {
    expect(normalize_physical_newlines("1girl,\nsmile,\n\ndancing")).toBe("1girl, smile, dancing");
  });

  it("resolves a multi-trigger replacement rule (A|B=value shorthand for two triggers sharing one value)", () => {
    const rules = parse_replacement_rules("sad|upset=替换|smile");
    expect(rules).toEqual([
      { triggers: ["sad", "upset"], type: "替换", value: "smile", condition: null },
    ]);
    const result = apply_replacement_rules("1girl, sad", rules);
    expect(result.modified_prompt).toBe("1girl, smile");

    const result_upset = apply_replacement_rules("1girl, upset", rules);
    expect(result_upset.modified_prompt).toBe("1girl, smile");
  });

  it("applies all 5 insertion positions plus a global replace from parsed rule text", () => {
    const rules = parse_replacement_rules(
      [
        "leading=前置前|<lora:a:1>",
        "afterfixed=前置后|nature",
        "beforeend=后置前|beforeend",
        "afterend=后置后|afterend",
        "trailing=最后置|trailing_tag",
        "sad=替换|smile",
      ].join("\n"),
    );
    const result = run_prompt_pipeline(
      build_input({
        raw_scene: "1girl, sad, leading, afterfixed, beforeend, afterend, trailing",
        fixed_positive_prompt: "masterpiece",
        fixed_positive_prompt_end: "highres",
        replacement_rules: rules,
      }),
    );
    expect(result.positive_prompt).toContain("<lora:a:1>");
    expect(result.positive_prompt).toContain("smile");
    expect(result.positive_prompt).not.toContain("sad");
    expect(result.positive_prompt).toContain("nature");
    expect(result.positive_prompt).toContain("beforeend");
    expect(result.positive_prompt).toContain("afterend");
    expect(result.positive_prompt).toContain("trailing_tag");
    // "<lora:a:1>" (前置前) must land before the fixed prompt, "trailing_tag" (最后置) after everything.
    expect(result.positive_prompt.indexOf("<lora:a:1>")).toBeLessThan(
      result.positive_prompt.indexOf("masterpiece"),
    );
    expect(result.positive_prompt.indexOf("trailing_tag")).toBe(
      result.positive_prompt.length - "trailing_tag".length,
    );
  });

  it("supports the character-scoped replace variant separately from the global engine", () => {
    const rules = parse_replacement_rules("1girl=替换分角色|1boy\nignored=前置前|nope");
    const result = apply_character_replacement_rules("1girl, standing", rules);
    expect(result).toBe("1boy, standing");
  });

  it("evaluates @if guard expressions (&&, ||, !, quoted substrings)", () => {
    expect(evaluate_if_condition('"a" && "b"', "a b c")).toBe(true);
    expect(evaluate_if_condition('"a" && "z"', "a b c")).toBe(false);
    expect(evaluate_if_condition('"a" || "z"', "a b c")).toBe(true);
    expect(evaluate_if_condition('!"z"', "a b c")).toBe(true);
    expect(evaluate_if_condition('("a" && "z") || "b"', "a b c")).toBe(true);
  });

  it("fails a malformed @if guard closed rather than throwing", () => {
    expect(safe_evaluate_if_condition('"a" &&', "a b c")).toBe(false);
  });

  it("splits a trailing @if(...) guard off a rule value", () => {
    expect(extract_if_condition('smile@if("happy")')).toEqual({
      value: "smile",
      condition: '"happy"',
    });
    expect(extract_if_condition("smile")).toEqual({ value: "smile", condition: null });
  });

  it("skips a rule whose @if guard does not pass", () => {
    const rules: ReplacementRule[] = [
      { triggers: ["sad"], type: "替换", value: "smile", condition: '"happy"' },
    ];
    const result = apply_replacement_rules("1girl, sad", rules);
    expect(result.modified_prompt).toBe("1girl, sad");
  });

  it("resolves {{roll N}} and {{roll 1dN}} deterministically for a fixed seed", () => {
    const fixed_seed = () => 42;
    const first = resolve_roll_placeholders("{{roll 100}}", fixed_seed);
    const second = resolve_roll_placeholders("{{roll 1d100}}", fixed_seed);
    expect(first).toBe(second);
    expect(first).toHaveLength(8);
    expect(resolve_roll_placeholders("no roll here", fixed_seed)).toBe("no roll here");
  });

  it("selects a random preset/vibe group deterministically for a fixed random source and falls back when disabled", () => {
    const presets = { a: {}, b: {}, c: {} };
    const disabled = select_random_preset("a", presets, false, () => 0.9);
    expect(disabled).toEqual({ selected_id: "a", was_randomized: false });

    const enabled_low = select_random_preset("a", presets, true, () => 0);
    const enabled_high = select_random_preset("a", presets, true, () => 0.999);
    expect(enabled_low.was_randomized).toBe(true);
    expect(enabled_high.was_randomized).toBe(true);
    expect(enabled_low.selected_id).not.toBe(enabled_high.selected_id);

    const vibe_groups = { empty: { vibes: [] }, full: { vibes: ["v1"] } };
    const vibe_selection = select_random_vibe_group("empty", vibe_groups, true, () => 0);
    expect(vibe_selection.selected_id).toBe("full");
  });

  it("keeps the negative prompt separate: replacement/regex rules never touch it", () => {
    const rules = parse_replacement_rules("worst=替换|best");
    const regex_rules: RegexRule[] = [
      { id: "r1", pattern: "worst", flags: "g", replacement: "best" },
    ];
    const result = run_prompt_pipeline(
      build_input({
        fixed_negative_prompt: "worst quality",
        ucp_negative_prompt: "lowres",
        replacement_rules: rules,
        regex_rules,
      }),
    );
    expect(result.negative_prompt).toContain("worst quality");
    expect(result.negative_prompt).toBe("lowres, worst quality");
  });

  it("assembles the negative prompt as UCP followed by the fixed negative prompt", () => {
    const result = run_prompt_pipeline(
      build_input({
        fixed_negative_prompt: "extra digits",
        ucp_negative_prompt: "lowres, bad anatomy",
      }),
    );
    expect(result.negative_prompt).toBe("lowres, bad anatomy, extra digits");
  });

  it("maps the assembled prompt into a validated provider-specific request", () => {
    const request = map_to_provider_request(novelai_base(), {
      positive_prompt: "1girl, smile",
      negative_prompt: "lowres",
    });
    expect(request).toMatchObject({
      provider_id: "novelai",
      prompt: "1girl, smile",
      negative_prompt: "lowres",
    });
  });

  it("omits negative_prompt entirely from the provider request when empty, rather than sending an empty string", () => {
    const request = map_to_provider_request(novelai_base(), {
      positive_prompt: "1girl",
      negative_prompt: "   ",
    });
    expect(request).not.toHaveProperty("negative_prompt");
  });

  it("rejects a provider request whose base fields fail that provider's own validation", () => {
    const invalid_base = { ...novelai_base(), width: 65 } as ProviderRequestBase; // not a multiple of 64
    expect(() =>
      map_to_provider_request(invalid_base, { positive_prompt: "1girl", negative_prompt: "" }),
    ).toThrow();
  });

  it("end to end: produces a fully validated provider request from a realistic input", () => {
    const result = run_prompt_pipeline(
      build_input({
        raw_scene: "1girl, {@getvar::mood@}, {{roll 10}}",
        mvu_store: { mood: "happy" },
        fixed_negative_prompt: "worst quality",
        ucp_negative_prompt: "lowres",
      }),
    );
    expect(result.positive_prompt).toContain("happy");
    expect(result.positive_prompt).not.toContain("{@getvar");
    expect(result.positive_prompt).not.toContain("{{roll");
    expect(result.provider_request.prompt).toBe(result.positive_prompt);
  });
});

describe("prompt_pipeline: shared helpers", () => {
  it("strips full-width Chinese parenthetical annotations, including nested ones", () => {
    expect(strip_chinese_annotations("1girl（一个女孩（详细）说明）, smile")).toBe("1girl, smile");
    expect(strip_chinese_annotations("")).toBe("");
  });

  it("merges consecutive same-role messages and can fold system into user", () => {
    const messages = [
      { role: "system" as const, content: "A" },
      { role: "system" as const, content: "B" },
      { role: "user" as const, content: "C" },
    ];
    expect(merge_adjacent_messages(messages)).toEqual([
      { role: "system", content: "A\nB" },
      { role: "user", content: "C" },
    ]);
    expect(merge_adjacent_messages(messages, { merge_system_user: true })).toEqual([
      { role: "user", content: "A\nB\nC" },
    ]);
    expect(merge_adjacent_messages([])).toEqual([]);
  });

  it("substitutes {{key}} template placeholders and leaves unknown keys untouched", () => {
    expect(substitute_template_placeholders("Hello {{name}}!", { name: "World" })).toBe(
      "Hello World!",
    );
    expect(substitute_template_placeholders("{{missing}}", {})).toBe("{{missing}}");
  });
});

describe("tag_normalizer", () => {
  it("deduplicates tags, preferring the weighted variant", () => {
    expect(deduplicate_tags("1girl, smile, 1girl")).toBe("1girl, smile");
    expect(deduplicate_tags("1girl, (1girl:1.3)")).toBe("(1girl:1.3)");
    expect(deduplicate_tags("(1girl:1.3), 1girl")).toBe("(1girl:1.3)");
  });

  it("preserves $json$ placeholders untouched through dedup", () => {
    const input = "$scene: composition$, 1girl, $scene: composition$";
    expect(deduplicate_tags(input)).toBe("$scene: composition$, 1girl");
  });

  it("strips weight syntax down to a stable base tag", () => {
    expect(get_base_tag("(1girl:1.2)")).toBe("1girl");
    expect(get_base_tag("[1girl]")).toBe("1girl");
    expect(get_base_tag("2::1girl::")).toBe("1girl");
    expect(has_weight("(1girl:1.2)")).toBe(true);
    expect(has_weight("1girl")).toBe(false);
  });

  it("returns an empty string for empty input", () => {
    expect(deduplicate_tags("")).toBe("");
  });
});

describe("regex_transform", () => {
  it("applies rules sequentially and reports a failure for an invalid pattern without aborting the rest", () => {
    const rules: RegexRule[] = [
      { id: "bad", pattern: "(", flags: "g", replacement: "x" },
      { id: "good", pattern: "foo", flags: "g", replacement: "bar" },
    ];
    const result = apply_regex_rules("foo", rules);
    expect(result.text).toBe("bar");
    expect(result.failures).toEqual([{ rule_id: "bad", error: expect.any(String) }]);
  });

  it("exposes a pure test-against-sample-text function for the UI test panel", () => {
    expect(
      test_regex_rule({ id: "r1", pattern: "a", flags: "g", replacement: "b" }, "banana"),
    ).toBe("bbnbnb");
  });
});
