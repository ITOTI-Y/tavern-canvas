import type { ProviderError } from "@tavern-canvas/contracts";
import { z } from "zod";

import { malformed_response } from "../image_bytes.js";
import { ProviderAdapterError } from "../provider_error.js";

export type ComfyUiEvent =
  | { readonly type: "ignored" }
  | {
      readonly type: "progress";
      readonly prompt_id: string;
      readonly node_id?: string;
      readonly value: number;
      readonly max: number;
    }
  | {
      readonly type: "executing";
      readonly prompt_id: string;
      readonly node_id: string;
    }
  | {
      readonly type: "output";
      readonly prompt_id: string;
      readonly node_id: string;
      readonly output: Readonly<Record<string, unknown>>;
    }
  | { readonly type: "completed"; readonly prompt_id: string }
  | { readonly type: "failed"; readonly prompt_id: string; readonly error: ProviderError };

const EnvelopeSchema = z.object({
  type: z.string(),
  data: z.object({ prompt_id: z.string().optional() }).loose(),
});

export function parse_comfyui_event(value: unknown, prompt_id: string): ComfyUiEvent {
  try {
    const envelope = EnvelopeSchema.parse(value);
    if (envelope.data.prompt_id !== prompt_id) {
      return { type: "ignored" };
    }

    if (envelope.type === "progress") {
      const progress = z
        .object({
          prompt_id: z.string(),
          node: z.string().optional(),
          value: z.number().int().nonnegative(),
          max: z.number().int().positive(),
        })
        .parse(envelope.data);
      if (progress.value > progress.max) {
        throw malformed_response();
      }
      return {
        type: "progress",
        prompt_id,
        ...(progress.node === undefined ? {} : { node_id: progress.node }),
        value: progress.value,
        max: progress.max,
      };
    }

    if (envelope.type === "executing") {
      const executing = z
        .object({ prompt_id: z.string(), node: z.string().nullable() })
        .parse(envelope.data);
      return executing.node === null
        ? { type: "completed", prompt_id }
        : { type: "executing", prompt_id, node_id: executing.node };
    }

    if (envelope.type === "execution_success") {
      return { type: "completed", prompt_id };
    }

    if (envelope.type === "executed") {
      const executed = z
        .object({
          prompt_id: z.string(),
          node: z.string(),
          output: z.record(z.string(), z.unknown()),
        })
        .parse(envelope.data);
      return {
        type: "output",
        prompt_id,
        node_id: executed.node,
        output: executed.output,
      };
    }

    if (envelope.type === "execution_interrupted") {
      return {
        type: "failed",
        prompt_id,
        error: { code: "cancelled", retryable: false },
      };
    }

    if (envelope.type === "execution_error") {
      return {
        type: "failed",
        prompt_id,
        error: { code: "provider_unavailable", retryable: false },
      };
    }

    return { type: "ignored" };
  } catch (error) {
    if (error instanceof ProviderAdapterError) {
      throw error;
    }
    throw malformed_response();
  }
}
