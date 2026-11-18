from .nai_prompt import convert


class NovelAIPromptToComfy:
    @classmethod
    def INPUT_TYPES(cls):  # noqa: N802
        return {"required": {"text": ("STRING", {"multiline": True, "default": ""})}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "run"
    CATEGORY = "conditioning"
    DESCRIPTION = "Convert NovelAI {tag}, [tag] and 1.5::tag:: emphasis to (tag:w)."

    def run(self, text: str) -> tuple[str]:
        return (convert(text),)


NODE_CLASS_MAPPINGS = {"NovelAIPromptToComfy": NovelAIPromptToComfy}
NODE_DISPLAY_NAME_MAPPINGS = {"NovelAIPromptToComfy": "NovelAI Prompt → ComfyUI"}
