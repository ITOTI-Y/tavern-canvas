import type { DOMPurify as DOMPurifyInstance } from "dompurify";
import type { Marked } from "marked";

const THINK_CLOSE_TAG = "</think>";
const MAX_THINKING_CHARS = 10_240;
const TRUNCATION_SUFFIX = "\n...(内容过长已截断)";

export interface AssistantThinkingSplit {
  readonly thinking: string | null;
  readonly visible_text: string;
}

/** Everything before the last `</think>` is reasoning: discarded from the reply and truncated past 10240 characters. */
export function split_thinking_content(text: string): AssistantThinkingSplit {
  const last_close_index = text.lastIndexOf(THINK_CLOSE_TAG);
  if (last_close_index === -1) {
    return { thinking: null, visible_text: text };
  }

  const raw_thinking = text.slice(0, last_close_index).trim();
  const cleaned_thinking = raw_thinking.replace(/<\/?think>/giu, "").trim();
  const visible_text = text.slice(last_close_index + THINK_CLOSE_TAG.length).trim();
  if (cleaned_thinking.length === 0) {
    return { thinking: null, visible_text };
  }

  const thinking =
    cleaned_thinking.length > MAX_THINKING_CHARS
      ? `${cleaned_thinking.slice(0, MAX_THINKING_CHARS)}${TRUNCATION_SUFFIX}`
      : cleaned_thinking;
  return { thinking, visible_text };
}

export interface AssistantAskChoiceExtraction {
  readonly cleaned_text: string;
  readonly options: readonly string[];
}

function stringify_option(option: unknown): string {
  if (typeof option === "string") {
    return option;
  }
  if (typeof option === "object" && option !== null) {
    const record = option as Record<string, unknown>;
    if (typeof record.label === "string") {
      return record.label;
    }
    if (typeof record.text === "string") {
      return record.text;
    }
  }
  return String(option);
}

/** Runs on raw text before Markdown rendering: `<AskChoice>` is never real HTML and must not reach the sanitizer looking like a tag. */
export function extract_ask_choices(text: string): AssistantAskChoiceExtraction {
  const match = /<AskChoice>([\s\S]*?)<\/AskChoice>/iu.exec(text);
  if (!match) {
    return { cleaned_text: text, options: [] };
  }

  const body = match[1] ?? "";
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    parsed = undefined;
  }

  const raw_options = Array.isArray(parsed)
    ? parsed
    : body
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

  const cleaned_text = text.replace(/<AskChoice>[\s\S]*?<\/AskChoice>/giu, "").trim();
  const options = raw_options.map(stringify_option).filter((label) => label.length > 0);
  return { cleaned_text, options };
}

export interface AssistantRenderedMessage {
  readonly html: string;
  readonly thinking: string | null;
  readonly ask_choices: readonly string[];
}

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "del",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
];
const ALLOWED_ATTR = ["href"];

interface AssistantMarkdownRenderer {
  readonly marked: Marked;
  readonly purify: DOMPurifyInstance;
}

let renderer_promise: Promise<AssistantMarkdownRenderer> | null = null;

/** `marked` and `dompurify` are imported dynamically only here, so referencing this module's types does not pull the parser/sanitizer into a chunk. */
async function load_renderer(): Promise<AssistantMarkdownRenderer> {
  renderer_promise ??= (async () => {
    const [{ Marked }, purify_module] = await Promise.all([import("marked"), import("dompurify")]);
    // DOMPurify's default export is the `createDOMPurify` factory itself, not a ready instance --
    // bundler/ESM consumption never gets the auto-bound-to-ambient-`window` UMD global, in a real
    // browser or under test, so the window it sanitizes against must always be passed explicitly.
    const purify = purify_module.default(window);
    purify.addHook("afterSanitizeAttributes", (node) => {
      if (node.tagName === "A" && node.hasAttribute("href")) {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
    });
    return { marked: new Marked({ gfm: true, breaks: true }), purify };
  })();
  return renderer_promise;
}

/** Strips the reasoning block and AskChoice directive, then Markdown-renders and sanitizes down to a minimal text/code/list/link subset. */
export async function render_assistant_markdown(
  raw_text: string,
): Promise<AssistantRenderedMessage> {
  const { thinking, visible_text } = split_thinking_content(raw_text);
  const { cleaned_text, options } = extract_ask_choices(visible_text);
  const { marked, purify } = await load_renderer();

  const unsafe_html = await marked.parse(cleaned_text, { async: true });
  const html = purify.sanitize(unsafe_html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });

  return { html, thinking, ask_choices: options };
}
