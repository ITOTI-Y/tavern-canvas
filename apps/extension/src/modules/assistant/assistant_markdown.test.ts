// @vitest-environment jsdom
// DOMPurify's sanitizer is spec-strict about DOM tree-walking/serialization in ways happy-dom
// (this suite's shared "apps" project environment) does not fully implement -- the widely
// documented Node.js pairing is jsdom, so this one file opts out per-file rather than moving
// every other test in the project off happy-dom.
import { describe, expect, it } from "vitest";

import {
  extract_ask_choices,
  render_assistant_markdown,
  split_thinking_content,
} from "./assistant_markdown.js";

describe("split_thinking_content", () => {
  it("separates everything before the last </think> as thinking, and the remainder as visible text", () => {
    const result = split_thinking_content(
      "<think>reasoning about the user's request</think>Here is the answer.",
    );

    expect(result.thinking).toBe("reasoning about the user's request");
    expect(result.visible_text).toBe("Here is the answer.");
  });

  it("returns no thinking block when there is no closing tag", () => {
    const result = split_thinking_content("Just a plain reply.");

    expect(result.thinking).toBeNull();
    expect(result.visible_text).toBe("Just a plain reply.");
  });

  it("uses the last </think> when multiple thinking segments are present, stripping every think tag from the merged content", () => {
    const result = split_thinking_content("<think>first</think><think>second</think>Answer.");

    expect(result.thinking).toBe("firstsecond");
    expect(result.visible_text).toBe("Answer.");
  });

  it("truncates thinking content beyond 10240 characters", () => {
    const long_thinking = "a".repeat(11_000);
    const result = split_thinking_content(`<think>${long_thinking}</think>Reply.`);

    expect(result.thinking).toHaveLength(10_240 + "\n...(内容过长已截断)".length);
    expect(result.thinking?.endsWith("...(内容过长已截断)")).toBe(true);
  });

  it("treats an empty thinking block as no thinking at all", () => {
    const result = split_thinking_content("<think>   </think>Reply.");

    expect(result.thinking).toBeNull();
    expect(result.visible_text).toBe("Reply.");
  });
});

describe("extract_ask_choices", () => {
  it("parses a JSON-array AskChoice block into options and strips it from the text", () => {
    const result = extract_ask_choices('Pick one:\n<AskChoice>["A", "B", "C"]</AskChoice>');

    expect(result.options).toEqual(["A", "B", "C"]);
    expect(result.cleaned_text).toBe("Pick one:");
  });

  it("falls back to newline-splitting when the block is not valid JSON", () => {
    const result = extract_ask_choices("<AskChoice>Option one\nOption two</AskChoice>");

    expect(result.options).toEqual(["Option one", "Option two"]);
  });

  it("returns no options and the original text unchanged when no block is present", () => {
    const result = extract_ask_choices("Just a normal reply.");

    expect(result.options).toEqual([]);
    expect(result.cleaned_text).toBe("Just a normal reply.");
  });
});

describe("render_assistant_markdown", () => {
  it("renders a minimal text/code/list/link subset from GFM markdown", async () => {
    const rendered = await render_assistant_markdown(
      "**bold** and `code` and\n\n- one\n- two\n\n[link](https://example.com)",
    );

    expect(rendered.html).toContain("<strong>bold</strong>");
    expect(rendered.html).toContain("<code>code</code>");
    expect(rendered.html).toContain("<li>one</li>");
    expect(rendered.html).toContain('<a href="https://example.com"');
    expect(rendered.html).toContain('target="_blank"');
    expect(rendered.html).toContain('rel="noopener noreferrer"');
  });

  it("separates the thinking block and ask-choice options from the sanitized html", async () => {
    const rendered = await render_assistant_markdown(
      '<think>internal reasoning</think>Choose:\n<AskChoice>["Yes", "No"]</AskChoice>',
    );

    expect(rendered.thinking).toBe("internal reasoning");
    expect(rendered.ask_choices).toEqual(["Yes", "No"]);
    expect(rendered.html).not.toContain("AskChoice");
    expect(rendered.html).not.toContain("internal reasoning");
  });

  it("strips <script> tags and their content entirely", async () => {
    const rendered = await render_assistant_markdown(
      'Hello <script>alert("xss")</script> world',
    );

    expect(rendered.html).not.toContain("<script");
    expect(rendered.html).not.toContain("alert(");
  });

  it("strips inline event-handler attributes", async () => {
    const rendered = await render_assistant_markdown('<p onclick="alert(1)">click me</p>');

    expect(rendered.html).not.toContain("onclick");
  });

  it("rejects unsafe javascript: URLs in links", async () => {
    const rendered = await render_assistant_markdown("[click me](javascript:alert(1))");

    expect(rendered.html).not.toContain("javascript:");
  });

  it("strips iframe tags", async () => {
    const rendered = await render_assistant_markdown(
      '<iframe src="https://evil.example"></iframe>',
    );

    expect(rendered.html).not.toContain("<iframe");
  });

  it("strips style tags and inline style attributes", async () => {
    const rendered = await render_assistant_markdown(
      '<style>body{background:url(evil)}</style><p style="color:red">text</p>',
    );

    expect(rendered.html).not.toContain("<style");
    expect(rendered.html).not.toContain("style=");
  });

  it("strips svg content entirely", async () => {
    const rendered = await render_assistant_markdown(
      '<svg onload="alert(1)"><circle r="10"/></svg>',
    );

    expect(rendered.html).not.toContain("<svg");
    expect(rendered.html).not.toContain("onload");
  });

  it("strips image tags -- outside the allowed text/code/list/link subset", async () => {
    const rendered = await render_assistant_markdown('<img src="x" onerror="alert(1)">');

    expect(rendered.html).not.toContain("<img");
    expect(rendered.html).not.toContain("onerror");
  });
});
