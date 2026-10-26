import type { NovelAiAugmentTool } from "@tavern-canvas/contracts";

import type { NovelAiEmotion } from "../../modules/illustration/slot_edits.js";

type Translate = (key: string) => string;

export const AUGMENT_TOOLS: readonly NovelAiAugmentTool[] = [
  "lineart",
  "sketch",
  "colorize",
  "emotion",
  "declutter",
  "declutter-keep-bubbles",
  "bg-removal",
];

export const EMOTIONS: readonly NovelAiEmotion[] = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "scared",
  "surprised",
  "tired",
  "excited",
  "nervous",
  "thinking",
  "confused",
  "shy",
  "disgusted",
  "smug",
  "bored",
  "laughing",
  "irritated",
  "aroused",
  "embarrassed",
  "worried",
  "love",
  "determined",
  "hurt",
  "playful",
];

export function augment_tool_label(t: Translate, tool: NovelAiAugmentTool): string {
  switch (tool) {
    case "lineart":
      return t("chat.quick_edit.tools.lineart");
    case "sketch":
      return t("chat.quick_edit.tools.sketch");
    case "colorize":
      return t("chat.quick_edit.tools.colorize");
    case "emotion":
      return t("chat.quick_edit.tools.emotion");
    case "declutter":
      return t("chat.quick_edit.tools.declutter");
    case "declutter-keep-bubbles":
      return t("chat.quick_edit.tools.declutter_keep_bubbles");
    case "bg-removal":
      return t("chat.quick_edit.tools.bg_removal");
  }
}

export function emotion_label(t: Translate, emotion: NovelAiEmotion): string {
  switch (emotion) {
    case "neutral":
      return t("chat.quick_edit.emotions.neutral");
    case "happy":
      return t("chat.quick_edit.emotions.happy");
    case "sad":
      return t("chat.quick_edit.emotions.sad");
    case "angry":
      return t("chat.quick_edit.emotions.angry");
    case "scared":
      return t("chat.quick_edit.emotions.scared");
    case "surprised":
      return t("chat.quick_edit.emotions.surprised");
    case "tired":
      return t("chat.quick_edit.emotions.tired");
    case "excited":
      return t("chat.quick_edit.emotions.excited");
    case "nervous":
      return t("chat.quick_edit.emotions.nervous");
    case "thinking":
      return t("chat.quick_edit.emotions.thinking");
    case "confused":
      return t("chat.quick_edit.emotions.confused");
    case "shy":
      return t("chat.quick_edit.emotions.shy");
    case "disgusted":
      return t("chat.quick_edit.emotions.disgusted");
    case "smug":
      return t("chat.quick_edit.emotions.smug");
    case "bored":
      return t("chat.quick_edit.emotions.bored");
    case "laughing":
      return t("chat.quick_edit.emotions.laughing");
    case "irritated":
      return t("chat.quick_edit.emotions.irritated");
    case "aroused":
      return t("chat.quick_edit.emotions.aroused");
    case "embarrassed":
      return t("chat.quick_edit.emotions.embarrassed");
    case "worried":
      return t("chat.quick_edit.emotions.worried");
    case "love":
      return t("chat.quick_edit.emotions.love");
    case "determined":
      return t("chat.quick_edit.emotions.determined");
    case "hurt":
      return t("chat.quick_edit.emotions.hurt");
    case "playful":
      return t("chat.quick_edit.emotions.playful");
  }
}
