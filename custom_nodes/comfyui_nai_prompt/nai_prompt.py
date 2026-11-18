"""Convert NovelAI prompt emphasis syntax to ComfyUI weight syntax."""

import re
from typing import Final

BRACE_FACTOR: Final = 1.05
_NUMERIC_OPEN: Final = re.compile(r"-?\d+(?:\.\d+)?::")
_NUMERIC_BOUNDARY: Final = frozenset(" \t\n,{}[]:|")


def _format_weight(weight: float) -> str:
    return f"{weight:.4f}".rstrip("0").rstrip(".")


def _escape(text: str) -> str:
    return text.replace("(", r"\(").replace(")", r"\)")


def convert(prompt: str) -> str:
    """Rewrite ``{tag}``, ``[tag]`` and ``1.5::tag::`` as flat ``(tag:w)`` spans.

    Groups left open extend to the end of the prompt and unmatched closers are
    dropped, matching how NovelAI reads them. Literal parentheses are escaped so
    ComfyUI does not read them as emphasis.
    """
    stack: list[tuple[str, float]] = []
    runs: list[tuple[str, float]] = []
    i = 0
    while i < len(prompt):
        weight_open = _NUMERIC_OPEN.match(prompt, i)
        if weight_open and (i == 0 or prompt[i - 1] in _NUMERIC_BOUNDARY):
            stack.append(("::", float(weight_open.group()[:-2])))
            i = weight_open.end()
            continue
        if prompt.startswith("::", i):
            if any(kind == "::" for kind, _ in stack):
                while stack.pop()[0] != "::":
                    pass
            i += 2
            continue
        char = prompt[i]
        i += 1
        if char in "{[":
            stack.append((char, BRACE_FACTOR if char == "{" else 1 / BRACE_FACTOR))
            continue
        if char in "}]":
            opener = "{" if char == "}" else "["
            if stack and stack[-1][0] == opener:
                stack.pop()
            continue
        weight = 1.0
        for _, factor in stack:
            weight *= factor
        if runs and abs(runs[-1][1] - weight) < 1e-9:
            runs[-1] = (runs[-1][0] + char, weight)
        else:
            runs.append((char, weight))

    parts = []
    for text, weight in runs:
        escaped = _escape(text)
        if abs(weight - 1.0) < 1e-9 or not text.strip():
            parts.append(escaped)
            continue
        core = escaped.strip()
        start = escaped.index(core)
        end = start + len(core)
        parts.append(
            f"{escaped[:start]}({core}:{_format_weight(weight)}){escaped[end:]}"
        )
    return "".join(parts)
