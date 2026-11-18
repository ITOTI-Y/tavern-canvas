# NovelAI Prompt → ComfyUI

A ComfyUI custom node that rewrites NovelAI emphasis syntax into ComfyUI weights, so prompts written
for NovelAI, including Inkwell's prompts and quality tags, keep their emphasis on a ComfyUI server.

| NovelAI           | ComfyUI             |
| ----------------- | ------------------- |
| `{red hair}`      | `(red hair:1.05)`   |
| `{{red hair}}`    | `(red hair:1.1025)` |
| `[blush]`         | `(blush:0.9524)`    |
| `1.5::red hair::` | `(red hair:1.5)`    |
| `artist (name)`   | `artist \(name\)`   |

Each `{}` multiplies the weight by 1.05 and each `[]` divides it by 1.05; a `w::text::` span sets
weight `w`, and nested groups multiply. A group left open runs to the end of the prompt and an
unmatched closer is dropped, as NovelAI reads them. Literal parentheses are escaped so ComfyUI does
not read them as emphasis.

## Installation

The Inkwell extension does not install this node. Copy the `comfyui_nai_prompt` folder into
`ComfyUI/custom_nodes/` on the ComfyUI server and restart ComfyUI. The node appears as
**NovelAI Prompt → ComfyUI** under the `conditioning` category.

## Use with Inkwell

Put the node between the prompt text and its `CLIPTextEncode` node, once for the positive prompt and
once for the negative prompt, and save the workflow in API format. Inkwell follows the link from the
text encoder to the node's `text` input and writes the prompt there, so the workflow needs no
manual mapping for it.

## Tests

From this folder:

```bash
python -m pytest tests
```
