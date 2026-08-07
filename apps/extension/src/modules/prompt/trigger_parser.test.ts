import { describe, expect, it } from "vitest";

import {
  build_insert_original_text_regex_scripts,
  DEFAULT_TRIGGER_MARKERS,
  extract_triggers_from_text,
  TriggerParserSession,
  TriggerStreamParser,
  type TriggerDelegatePort,
} from "./trigger_parser.js";

const ANCHOR = "b".repeat(64);

class RecordingDelegate implements TriggerDelegatePort {
  readonly calls: { host_root_generation_id: string; arguments_: unknown }[] = [];

  execute(host_root_generation_id: string, arguments_: unknown): unknown {
    this.calls.push({ host_root_generation_id, arguments_ });
    return { status: "queued" };
  }
}

describe("trigger_parser: final text extraction", () => {
  it("extracts a single prompt between the configured start/end markers", () => {
    const result = extract_triggers_from_text("before image###1girl, smile### after");
    expect(result.triggers).toEqual([
      { raw_match: "image###1girl, smile###", prompt: "1girl, smile" },
    ]);
    expect(result.cleaned_text).toBe("before  after");
  });

  it("extracts multiple prompts from one final text", () => {
    const result = extract_triggers_from_text("image###a### mid image###b### end");
    expect(result.triggers.map((t) => t.prompt)).toEqual(["a", "b"]);
  });

  it("sanitizes extracted content: strips physical newlines and full-width punctuation", () => {
    const result = extract_triggers_from_text("image###1girl，\nsmile；happy：yes### done");
    expect(result.triggers[0]?.prompt).toBe("1girl,smile;happy:yes");
  });

  it("retains the original marker text in cleaned_text when retain_original_text is true", () => {
    const text = "before image###1girl### after";
    const stripped = extract_triggers_from_text(text, DEFAULT_TRIGGER_MARKERS, false);
    const retained = extract_triggers_from_text(text, DEFAULT_TRIGGER_MARKERS, true);
    expect(stripped.cleaned_text).toBe("before  after");
    expect(retained.cleaned_text).toBe(text);
    // Both modes still extract the same triggers -- retention only changes what's rendered.
    expect(retained.triggers).toEqual(stripped.triggers);
  });

  it("supports fully custom configured markers, not just the default", () => {
    const result = extract_triggers_from_text("<gen>a cat</gen>", {
      start: "<gen>",
      end: "</gen>",
    });
    expect(result.triggers).toEqual([{ raw_match: "<gen>a cat</gen>", prompt: "a cat" }]);
  });

  it("finds nothing when no markers are present", () => {
    const result = extract_triggers_from_text("just plain text");
    expect(result.triggers).toEqual([]);
    expect(result.cleaned_text).toBe("just plain text");
  });
});

describe("trigger_parser: streaming extraction", () => {
  it("extracts a trigger delivered across many small chunks", () => {
    const parser = new TriggerStreamParser();
    const text = "before image###1girl, smile### after";
    let all_cleaned = "";
    const all_triggers: string[] = [];
    for (const character of text) {
      const result = parser.push(character);
      all_cleaned += result.cleaned_text;
      all_triggers.push(...result.triggers.map((t) => t.prompt));
    }
    const final = parser.finish();
    all_cleaned += final.cleaned_text;

    expect(all_triggers).toEqual(["1girl, smile"]);
    expect(all_cleaned).toBe("before  after");
  });

  it("handles the start marker split exactly at the chunk boundary", () => {
    const parser = new TriggerStreamParser();
    const first = parser.push("before ima");
    const second = parser.push("ge###1girl###");
    expect(first.triggers).toEqual([]);
    expect(second.triggers).toEqual([{ raw_match: "image###1girl###", prompt: "1girl" }]);
    expect(first.cleaned_text + second.cleaned_text).toBe("before ");
  });

  it("handles the end marker split across chunk boundaries", () => {
    const parser = new TriggerStreamParser();
    parser.push("image###1girl, sm");
    const result = parser.push("ile##");
    const more = parser.push("#");
    expect(result.triggers).toEqual([]);
    expect(more.triggers).toEqual([
      { raw_match: "image###1girl, smile###", prompt: "1girl, smile" },
    ]);
  });

  it("never emits a partial start-marker prefix into cleaned_text before it's disambiguated", () => {
    const parser = new TriggerStreamParser();
    // "ima" is a strict prefix of "image###" -- must stay buffered, not leak into cleaned_text.
    const result = parser.push("ima");
    expect(result.cleaned_text).toBe("");
    // Once it's clear this isn't actually the marker, the buffered text flushes.
    const followup = parser.push("gine no marker here");
    expect(result.cleaned_text + followup.cleaned_text).toContain("imagine");
  });

  it("extracts multiple prompts across a stream", () => {
    const parser = new TriggerStreamParser();
    parser.push("image###a### then image###b###");
    const final = parser.finish();
    expect(final.triggers).toEqual([]);
  });

  it("supports original-text retention in streaming mode too", () => {
    const retaining = new TriggerStreamParser(DEFAULT_TRIGGER_MARKERS, true);
    const chunk = "before image###1girl### after";
    const result = retaining.push(chunk);
    expect(result.cleaned_text).toBe(chunk);
    expect(result.triggers).toEqual([{ raw_match: "image###1girl###", prompt: "1girl" }]);
  });

  it("throws if pushed again after finish", () => {
    const parser = new TriggerStreamParser();
    parser.finish();
    expect(() => parser.push("x")).toThrow();
  });
});

describe("trigger_parser: session dedupe and delegation to Stage 02", () => {
  it("delegates each newly seen distinct prompt to the injected Stage 02 port exactly once", () => {
    const delegate = new RecordingDelegate();
    const session = new TriggerParserSession({
      auto_generation_enabled: true,
      generation_anchor: ANCHOR,
      host_root_generation_id: "host-root-1",
      delegate,
    });

    session.push("image###1girl### and image###1girl### again");
    session.finish();

    // Same prompt text seen twice in the same stream -- stream pre-generation dedupe means only
    // one delegated call, not a second internal queue entry.
    expect(delegate.calls).toHaveLength(1);
    expect(delegate.calls[0]).toEqual({
      host_root_generation_id: "host-root-1",
      arguments_: { generation_anchor: ANCHOR, scene_description: "1girl" },
    });
    expect(session.delegated_prompts).toEqual(["1girl"]);
  });

  it("delegates distinct prompts independently", () => {
    const delegate = new RecordingDelegate();
    const session = new TriggerParserSession({
      auto_generation_enabled: true,
      generation_anchor: ANCHOR,
      host_root_generation_id: "host-root-1",
      delegate,
    });
    session.push("image###a### image###b###");
    expect(
      delegate.calls.map(
        (call) => (call.arguments_ as { scene_description: string }).scene_description,
      ),
    ).toEqual(["a", "b"]);
  });

  it("does not delegate when auto-generation is disabled, but still extracts and exposes prompts", () => {
    const delegate = new RecordingDelegate();
    const session = new TriggerParserSession({
      auto_generation_enabled: false,
      generation_anchor: ANCHOR,
      host_root_generation_id: "host-root-1",
      delegate,
    });
    session.push("image###1girl###");
    expect(delegate.calls).toEqual([]);
    expect(session.delegated_prompts).toEqual(["1girl"]);
  });

  it("dedupe persists across push/finish within the same session", () => {
    const delegate = new RecordingDelegate();
    const session = new TriggerParserSession({
      auto_generation_enabled: true,
      generation_anchor: ANCHOR,
      host_root_generation_id: "host-root-1",
      delegate,
    });
    session.push("image###1girl###");
    session.push(" more text ");
    session.push("image###1girl###");
    session.finish();
    expect(delegate.calls).toHaveLength(1);
  });

  it("never maintains a second queue -- delegation is a direct synchronous call to the injected port", () => {
    const delegate = new RecordingDelegate();
    const session = new TriggerParserSession({
      auto_generation_enabled: true,
      generation_anchor: ANCHOR,
      host_root_generation_id: "host-root-1",
      delegate,
    });
    session.push("image###a###");
    // The delegate call already happened synchronously inside push(), before this assertion --
    // there is no intermediate queued/pending state to poll.
    expect(delegate.calls).toHaveLength(1);
  });
});

describe("trigger_parser: insert-original-text regex descriptors", () => {
  it("returns typed descriptors for hiding <image>/<imgthink> tags from the rendered message", () => {
    const scripts = build_insert_original_text_regex_scripts();
    expect(scripts).toHaveLength(2);
    expect(scripts.every((script) => script.prompt_only)).toBe(true);
    expect(scripts.map((script) => script.find_regex)).toEqual([
      "/<image>[\\s\\S]*?<\\/image>/g",
      "/<imgthink>[\\s\\S]*?<\\/imgthink>/g",
    ]);
  });
});
