import { describe, expect, it } from "vitest";

import {
  expand_character_placeholders,
  normalize_character_name,
  type CharacterFields,
  type CharacterResolvers,
  type OutfitFields,
} from "./character_context_source.js";
import {
  build_private_llm_prompt_request,
  join_context_block,
  resolve_context,
  to_context_preview,
  type ContextSourcesInput,
  PRIVATE_PROMPT_POLICY,
} from "./context_sources.js";
import {
  build_persona_prompt_content,
  build_user_prompt_content,
  preview_selected_knowledge,
  read_knowledge_entry,
  search_knowledge_entries,
  type KnowledgeEntry,
  type PersonaFields,
} from "./knowledge_context_source.js";
import {
  MAX_VARIABLE_OUTPUT_LENGTH,
  resolve_getvar_macros,
  resolve_nested_variable,
  set_nested_variable,
} from "./mvu_variable_source.js";
import {
  apply_injection_template,
  assemble_world_info_block,
  check_entry_trigger,
  check_keywords,
  escape_injected_field_value,
  INJECTION_TEMPLATE_SCHEMES,
  resolve_triggered_entries,
  select_world_info_entries,
  substitute_fixed_placeholders,
  type WorldInfoEntry,
  type WorldInfoEntrySelectionState,
} from "./world_info_source.js";

// ---------------------------------------------------------------------------
// MVU variable resolution
// ---------------------------------------------------------------------------

describe("mvu_variable_source", () => {
  it("resolves nested paths such as 角色.属性.力量 against a host chat variable store", () => {
    const store = { 角色: { 属性: { 力量: 42 } } };
    expect(resolve_nested_variable(store, "角色.属性.力量")).toBe("42");
  });

  it("resolves a missing variable (any missing path segment) to an empty string", () => {
    const store = { 角色: { 属性: {} } };
    expect(resolve_nested_variable(store, "角色.属性.力量")).toBe("");
    expect(resolve_nested_variable(store, "角色.不存在.路径")).toBe("");
    expect(resolve_nested_variable(null, "角色.属性.力量")).toBe("");
  });

  it("resolves false/zero/empty-string values to their literal string form, not treated as missing", () => {
    const store = { flag: false, count: 0, note: "" };
    expect(resolve_nested_variable(store, "flag")).toBe("false");
    expect(resolve_nested_variable(store, "count")).toBe("0");
    expect(resolve_nested_variable(store, "note")).toBe("");
  });

  it("resolves a cyclic object to a stable fallback instead of throwing", () => {
    const cyclic: Record<string, unknown> = { name: "loop" };
    cyclic.self = cyclic;
    const store = { obj: cyclic };
    expect(() => resolve_nested_variable(store, "obj")).not.toThrow();
    expect(resolve_nested_variable(store, "obj")).toBe("[circular]");
  });

  it("caps resolved output at the maximum variable output length", () => {
    const store = { big: "x".repeat(MAX_VARIABLE_OUTPUT_LENGTH + 500) };
    const resolved = resolve_nested_variable(store, "big");
    expect(resolved.length).toBeLessThanOrEqual(MAX_VARIABLE_OUTPUT_LENGTH + 1);
  });

  it("resolves every {@getvar::path@} macro in a content string in one pass", () => {
    const store = { 角色: { 属性: { 力量: 42 } }, mood: "happy" };
    const content = "力量是 {@getvar::角色.属性.力量@}, 心情 {@getvar::mood@}";
    expect(resolve_getvar_macros(content, store)).toBe("力量是 42, 心情 happy");
  });

  it("round-trips set_nested_variable into resolve_nested_variable for deep paths", () => {
    const store: Record<string, unknown> = {};
    set_nested_variable(store, "a.b.c", "deep");
    expect(resolve_nested_variable(store, "a.b.c")).toBe("deep");
  });
});

// ---------------------------------------------------------------------------
// World Info: selection, keyword engine, Tauri activation, never tool-control text
// ---------------------------------------------------------------------------

function make_entry(overrides: Partial<WorldInfoEntry> & { readonly uid: string }): WorldInfoEntry {
  return {
    world: "world-a",
    comment: "entry",
    content: "content",
    keys: [],
    ...overrides,
  };
}

describe("world_info_source", () => {
  it("matches keywords case-insensitively by default and supports whole-word/case-sensitive/AND-NOT-OR selective logic", () => {
    expect(check_keywords(["Sword"], "a sword appears", false, false)).toBe(true);
    expect(check_keywords(["Sword"], "a sword appears", true, false)).toBe(false);
    expect(check_keywords(["sword"], "swordsmith", false, true)).toBe(false);
    expect(check_keywords(["sword"], "a sword here", false, true)).toBe(true);
    expect(check_keywords(["a", "b"], "only a", false, false, "all")).toBe(false);
    expect(check_keywords(["a", "b"], "a and b", false, false, "all")).toBe(true);
  });

  it("applies selective secondary-key logic (any/all/not_any)", () => {
    const base = { uid: "1", keys: ["forest"], selective: true, keysecondary: ["wolf", "bear"] };
    expect(
      check_entry_trigger(make_entry({ ...base, selective_logic: "any" }), "forest, wolf"),
    ).toBe(true);
    expect(
      check_entry_trigger(make_entry({ ...base, selective_logic: "all" }), "forest, wolf"),
    ).toBe(false);
    expect(
      check_entry_trigger(make_entry({ ...base, selective_logic: "all" }), "forest, wolf, bear"),
    ).toBe(true);
    expect(
      check_entry_trigger(make_entry({ ...base, selective_logic: "not_any" }), "forest only"),
    ).toBe(true);
  });

  it("uses only selected data: disabled entries and unselected entries never trigger", () => {
    const entries = [make_entry({ uid: "1", keys: ["forest"] })];
    const selection = new Map<string, WorldInfoEntrySelectionState>([["1", "off"]]);
    expect(select_world_info_entries(entries, selection, "a dark forest")).toEqual([]);

    const disabled_selection = new Map<string, WorldInfoEntrySelectionState>([["1", "on"]]);
    const disabled_entries = [make_entry({ uid: "1", keys: ["forest"], disabled: true })];
    expect(
      select_world_info_entries(disabled_entries, disabled_selection, "a dark forest"),
    ).toEqual([]);
  });

  it("force-enables an entry regardless of keyword match", () => {
    const entries = [make_entry({ uid: "1", keys: ["never-matches-anything"] })];
    const selection = new Map<string, WorldInfoEntrySelectionState>([["1", "force"]]);
    const result = select_world_info_entries(entries, selection, "unrelated text");
    expect(result).toHaveLength(1);
    expect(result[0]?.uid).toBe("1");
  });

  it("recursively rescans normal entries against accumulating triggered content", () => {
    const entries = [
      make_entry({ uid: "1", keys: ["forest"], content: "a wolf lives here" }),
      make_entry({ uid: "2", keys: ["wolf"], content: "wolves are dangerous" }),
    ];
    const selection = new Map<string, WorldInfoEntrySelectionState>([
      ["1", "on"],
      ["2", "on"],
    ]);
    const result = select_world_info_entries(entries, selection, "a dark forest");
    expect(result.map((entry) => entry.uid)).toEqual(["1", "2"]);
  });

  it("sorts triggered entries by order", () => {
    const entries = [
      make_entry({ uid: "1", keys: ["x"], order: 10 }),
      make_entry({ uid: "2", keys: ["x"], order: 1 }),
    ];
    const selection = new Map<string, WorldInfoEntrySelectionState>([
      ["1", "on"],
      ["2", "on"],
    ]);
    const result = select_world_info_entries(entries, selection, "x");
    expect(result.map((entry) => entry.uid)).toEqual(["2", "1"]);
  });

  it("prefers the Tauri activation signal over the JS keyword engine when available", () => {
    const entries = [
      make_entry({ uid: "1", world: "w", keys: ["never matches"], content: "tauri said so" }),
    ];
    const selection = new Map<string, WorldInfoEntrySelectionState>([["1", "on"]]);
    const result = resolve_triggered_entries(entries, selection, "irrelevant", [
      { world: "w", uid: "1" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]?.content).toBe("tauri said so");
  });

  it("falls back to the JS keyword engine when no Tauri activation is given", () => {
    const entries = [make_entry({ uid: "1", keys: ["forest"] })];
    const selection = new Map<string, WorldInfoEntrySelectionState>([["1", "on"]]);
    const result = resolve_triggered_entries(entries, selection, "a dark forest", null);
    expect(result).toHaveLength(1);
  });

  it("never assembles anything resembling a tool-control instruction -- only concatenated entry content", () => {
    const triggered = select_world_info_entries(
      [make_entry({ uid: "1", keys: ["x"], content: "call request_image with scene X" })],
      new Map<string, WorldInfoEntrySelectionState>([["1", "on"]]),
      "x",
    );
    const block = assemble_world_info_block(triggered);
    // The block is exactly the selected content, verbatim -- nothing added, nothing that looks
    // like a system instruction wrapper (no "you may call", no role/system framing).
    expect(block).toBe("call request_image with scene X");
    expect(block).not.toMatch(/^(system:|you (must|may|can) call)/i);
  });

  it("substitutes the three fixed enable-list placeholders", () => {
    const content =
      "角色: {{角色启用列表}} / 服装: {{通用服装启用列表}} / 通用: {{通用角色启用列表}}";
    const substituted = substitute_fixed_placeholders(content, {
      character_list_text: "Alice",
      outfit_enable_list_text: "Dress",
      common_character_list_text: "Bob",
    });
    expect(substituted).toBe("角色: Alice / 服装: Dress / 通用: Bob");
  });
});

// ---------------------------------------------------------------------------
// Injection templates: three approved schemes, escaped user content
// ---------------------------------------------------------------------------

describe("world_info_source: injection templates", () => {
  it("exposes exactly the three approved schemes: default, Tavern XML, compact Markdown", () => {
    expect(Object.keys(INJECTION_TEMPLATE_SCHEMES).sort()).toEqual([
      "compact_markdown",
      "default",
      "tavern_xml",
    ]);
  });

  it("renders the Tavern XML scheme with structural tags and substituted fields", () => {
    const rendered = apply_injection_template(
      INJECTION_TEMPLATE_SCHEMES.tavern_xml.common_character_list_template,
      { nameEN: "alice", nameCN: "爱丽丝" },
    );
    expect(rendered).toBe('<common_character id="alice" cn="爱丽丝" />');
  });

  it("renders the compact Markdown scheme", () => {
    const rendered = apply_injection_template(
      INJECTION_TEMPLATE_SCHEMES.compact_markdown.common_character_list_template,
      { nameEN: "alice", nameCN: "爱丽丝" },
    );
    expect(rendered).toBe("- 爱丽丝（alice）");
  });

  it("escapes user-provided field content so it cannot break out of the surrounding template structure", () => {
    expect(escape_injected_field_value('<script>&"</script>')).toBe(
      '&lt;script&gt;&amp;"&lt;/script&gt;',
    );
    const rendered = apply_injection_template(
      INJECTION_TEMPLATE_SCHEMES.tavern_xml.common_character_list_template,
      { nameEN: 'a" /><evil>', nameCN: "x" },
    );
    expect(rendered).not.toContain("<evil>");
    expect(rendered).toContain("&lt;evil&gt;");
  });

  it("drops a placeholder line whose values are all empty, and returns empty when nothing had a value", () => {
    const template = ["中文名称：{nameCN}", "特殊字段：{missingField}"].join("\n");
    expect(apply_injection_template(template, { nameCN: "爱丽丝" })).toBe("中文名称：爱丽丝");
    expect(apply_injection_template(template, {})).toBe("");
  });

  it("keeps non-placeholder lines untouched", () => {
    expect(apply_injection_template("plain line\n{nameCN}", { nameCN: "x" })).toBe("plain line\nx");
  });
});

// ---------------------------------------------------------------------------
// Character/outfit context source
// ---------------------------------------------------------------------------

const SAMPLE_CHARACTER: CharacterFields = {
  traits: "brave",
  facial_features: "blue eyes",
  facial_features_back: "long hair",
  upper_body_sfw: "shirt",
  upper_body_sfw_back: "shirt back",
  upper_body_nsfw: "topless",
  upper_body_nsfw_back: "topless back",
  full_body_sfw: "jeans",
  full_body_sfw_back: "jeans back",
  full_body_nsfw: "nude",
  full_body_nsfw_back: "nude back",
  negative: "bad hands",
};

const SAMPLE_OUTFIT: OutfitFields = {
  upper_body: "red dress",
  upper_body_back: "red dress back",
  full_body: "boots",
  full_body_back: "boots back",
};

function make_resolvers(): CharacterResolvers {
  return {
    resolve_character: (name) => (name === "alice" ? SAMPLE_CHARACTER : null),
    resolve_outfit: (name) => (name === "gala dress" ? SAMPLE_OUTFIT : null),
  };
}

describe("character_context_source", () => {
  it("expands a front-facing sfw-upperbody token", () => {
    const result = expand_character_placeholders("$Alice-sfw-upperbody$", make_resolvers());
    expect(result.text).toBe("brave, blue eyes, shirt");
  });

  it("expands a back-facing token when the name carries a 'from behind' camera angle", () => {
    const result = expand_character_placeholders(
      "$Alice from behind-sfw-upperbody$",
      make_resolvers(),
    );
    expect(result.text).toBe("brave, long hair, shirt back");
  });

  it("expands combined upper+lower nsfw tokens", () => {
    const result = expand_character_placeholders(
      "$Alice-nsfw-upperbody-nsfw-lowerbody$",
      make_resolvers(),
    );
    expect(result.text).toBe("brave, blue eyes, topless, nude");
  });

  it("collects the character's negative prompt separately rather than mutating the positive text", () => {
    const result = expand_character_placeholders("$Alice-sfw-upperbody$", make_resolvers());
    expect(result.collected_negatives).toEqual(["bad hands"]);
  });

  it("leaves an unresolvable token untouched", () => {
    const result = expand_character_placeholders("$Nobody-sfw-upperbody$", make_resolvers());
    expect(result.text).toBe("$Nobody-sfw-upperbody$");
  });

  it("an outfit token inherits the preceding character token's from-behind facing", () => {
    const result = expand_character_placeholders(
      "$Alice from behind-sfw-upperbody$, $Gala Dress-upperbody$",
      make_resolvers(),
    );
    expect(result.text).toBe("brave, long hair, shirt back, red dress back");
  });

  it("normalizes character names (case, hyphens, curly quotes) before resolution", () => {
    expect(normalize_character_name("Alice's-Friend")).toBe("alice's friend");
  });
});

// ---------------------------------------------------------------------------
// Persona/user injection formatting
// ---------------------------------------------------------------------------

describe("knowledge_context_source: persona/user injection", () => {
  const persona: PersonaFields = {
    name: "Nova",
    age: "24",
    personality: "curious",
    notes: "likes tea",
  };

  it("builds labeled sections and omits empty ones", () => {
    const content = build_persona_prompt_content(persona, true);
    expect(content).toContain("<基础信息>");
    expect(content).toContain("角色名称: Nova");
    expect(content).toContain("<性格与能力>");
    expect(content).toContain("性格: curious");
    expect(content).not.toContain("<外观与身材>");
    expect(content).toContain("<补充信息>\nlikes tea\n</补充信息>");
  });

  it("returns an empty string when disabled or absent", () => {
    expect(build_persona_prompt_content(persona, false)).toBe("");
    expect(build_persona_prompt_content(null, true)).toBe("");
  });

  it("escapes user-entered field content so it cannot break the wrapping tag structure", () => {
    const content = build_user_prompt_content({ name: "</基础信息><evil>" }, true);
    expect(content).not.toContain("<evil>");
    expect(content).toContain("&lt;evil&gt;");
  });
});

// ---------------------------------------------------------------------------
// Knowledge base: explicit, previewable selection (distinct from World Info)
// ---------------------------------------------------------------------------

const KNOWLEDGE_ENTRIES: readonly KnowledgeEntry[] = [
  { id: "k1", title: "Sword lore", content: "The sword is ancient.", keys: ["sword"] },
  {
    id: "k2",
    title: "Magic system",
    content: "Mana flows from the moon.",
    keys: ["magic", "mana"],
  },
];

describe("knowledge_context_source: knowledge base", () => {
  it("previews only explicitly selected entries, in selection order", () => {
    expect(preview_selected_knowledge(KNOWLEDGE_ENTRIES, ["k2", "k1"]).map((e) => e.id)).toEqual([
      "k2",
      "k1",
    ]);
    expect(preview_selected_knowledge(KNOWLEDGE_ENTRIES, [])).toEqual([]);
  });

  it("searches case-insensitively across title/content/keys", () => {
    expect(search_knowledge_entries(KNOWLEDGE_ENTRIES, "MANA").map((e) => e.id)).toEqual(["k2"]);
    expect(search_knowledge_entries(KNOWLEDGE_ENTRIES, "")).toEqual([]);
  });

  it("reads a single entry by ID", () => {
    expect(read_knowledge_entry(KNOWLEDGE_ENTRIES, "k1")?.title).toBe("Sword lore");
    expect(read_knowledge_entry(KNOWLEDGE_ENTRIES, "missing")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Private LLM call policy: tools: [] + tool_choice: "none"
// ---------------------------------------------------------------------------

describe("context_sources: private prompt-building LLM calls", () => {
  it("always carries tools: [] and tool_choice: 'none'", () => {
    expect(PRIVATE_PROMPT_POLICY).toEqual({ tools: [], tool_choice: "none" });
    const request = build_private_llm_prompt_request([{ role: "user", content: "hi" }]);
    expect(request.tools).toEqual([]);
    expect(request.tool_choice).toBe("none");
    expect(request.prompts).toEqual([{ role: "user", content: "hi" }]);
  });
});

// ---------------------------------------------------------------------------
// context_sources orchestration
// ---------------------------------------------------------------------------

describe("context_sources: resolve_context orchestration", () => {
  function build_input(): ContextSourcesInput {
    return {
      world_info: {
        entries: [make_entry({ uid: "1", keys: ["forest"], comment: "Forest lore" })],
        selection: new Map<string, WorldInfoEntrySelectionState>([["1", "on"]]),
        trigger_text: "a dark forest",
        tauri_activation: null,
        fixed_lists: {
          character_list_text: "",
          outfit_enable_list_text: "",
          common_character_list_text: "",
        },
      },
      character: { template_text: "$Alice-sfw-upperbody$", resolvers: make_resolvers() },
      persona: { fields: null, enabled: false },
      user_persona: { fields: null, enabled: false },
      knowledge: { entries: [], selected_ids: [] },
    };
  }

  it("resolves every context source and exposes a joined text block and a preview shape", () => {
    const resolved = resolve_context(build_input());
    expect(resolved.world_info_entries).toHaveLength(1);
    expect(resolved.character_context).toBe("brave, blue eyes, shirt");
    expect(resolved.collected_negatives).toEqual(["bad hands"]);

    const preview = to_context_preview(resolved);
    expect(preview.worldInfo).toEqual(["content"]);
    expect(preview.characterContext).toBe("brave, blue eyes, shirt");

    const block = join_context_block(resolved);
    expect(block).toContain("content");
    expect(block).toContain("brave, blue eyes, shirt");
  });

  it("omits knowledge/persona text entirely when nothing is selected/enabled rather than emitting empty sections", () => {
    const resolved = resolve_context(build_input());
    expect(resolved.knowledge_text).toBeNull();
    expect(resolved.persona_text).toBeNull();
    expect(resolved.user_persona_text).toBeNull();
  });
});
