import type { WorkflowTarget } from "../../../modules/comfyui/workflow_mapping.js";

export type Translate = (key: string) => string;

/** Each key is spelled out so the locale check sees it referenced. */
export function workflow_target_label(
  t: Translate,
  target: WorkflowTarget | "output" | "lora_model",
): string {
  switch (target) {
    case "prompt":
      return t("assets.workflow.targets.prompt");
    case "negative_prompt":
      return t("assets.workflow.targets.negative_prompt");
    case "seed":
      return t("assets.workflow.targets.seed");
    case "output_count":
      return t("assets.workflow.targets.output_count");
    case "width":
      return t("assets.workflow.targets.width");
    case "height":
      return t("assets.workflow.targets.height");
    case "steps":
      return t("assets.workflow.targets.steps");
    case "cfg":
      return t("assets.workflow.targets.cfg");
    case "sampler_name":
      return t("assets.workflow.targets.sampler_name");
    case "scheduler":
      return t("assets.workflow.targets.scheduler");
    case "model":
      return t("assets.workflow.targets.model");
    case "text_encoder":
      return t("assets.workflow.targets.text_encoder");
    case "vae":
      return t("assets.workflow.targets.vae");
    case "lora_model":
      return t("assets.workflow.targets.lora_model");
    case "output":
      return t("assets.workflow.targets.output");
  }
}
