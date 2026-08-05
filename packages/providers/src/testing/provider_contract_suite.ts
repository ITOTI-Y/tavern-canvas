import {
  ImageGenerationResultSchema,
  type ImageGenerationRequest,
  type ImageGenerationResult,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  type ProviderAdapter,
  type ProviderExecutionContext,
  type ProviderPollResult,
  type ProviderSubmission,
} from "../provider_adapter.js";
import { ProviderAdapterError } from "../provider_error.js";

export type ProviderContractScenario =
  | "success"
  | "multiple_images"
  | "auth_failure"
  | "content_rejection"
  | "rate_limit"
  | "timeout"
  | "cancellation"
  | "malformed_response"
  | "reference_image"
  | "unsupported_capability";

export type ProviderContractExpectation =
  | { readonly kind: "success"; readonly asset_count: number }
  | {
      readonly kind: "error";
      readonly code: ProviderAdapterError["provider_error"]["code"];
    };

export interface ProviderContractHarness<TRequest extends ImageGenerationRequest> {
  readonly adapter: ProviderAdapter<TRequest>;
  readonly raw_profile: unknown;
  readonly context: Omit<ProviderExecutionContext, "profile">;
  readonly request: TRequest;
  readonly expectation: ProviderContractExpectation;
  readonly secret_markers: readonly string[];
  log_records(): readonly unknown[];
}

export function define_provider_contract_suite<TRequest extends ImageGenerationRequest>(
  provider_name: string,
  create_harness: (
    scenario: ProviderContractScenario,
  ) => ProviderContractHarness<TRequest> | Promise<ProviderContractHarness<TRequest>>,
): void {
  describe(`${provider_name} provider contract`, () => {
    it.each([
      "success",
      "multiple_images",
      "auth_failure",
      "content_rejection",
      "rate_limit",
      "timeout",
      "cancellation",
      "malformed_response",
      "reference_image",
      "unsupported_capability",
    ] as const)("normalizes %s", async (scenario) => {
      const harness = await create_harness(scenario);
      const profile = harness.adapter.validate_profile(harness.raw_profile);
      const context: ProviderExecutionContext = { ...harness.context, profile };
      const source_request = structuredClone(harness.request);

      let result: ImageGenerationResult | undefined;
      let failure: unknown;
      try {
        result = await settle_submission(harness.adapter, context, harness.request);
      } catch (error) {
        failure = error;
      }

      expect(harness.request).toEqual(source_request);
      if (harness.expectation.kind === "success") {
        expect(failure).toBeUndefined();
        expect(ImageGenerationResultSchema.parse(result).assets).toHaveLength(
          harness.expectation.asset_count,
        );
      } else {
        expect(failure).toBeInstanceOf(ProviderAdapterError);
        expect((failure as ProviderAdapterError).provider_error.code).toBe(
          harness.expectation.code,
        );
      }

      const logs = JSON.stringify(harness.log_records());
      for (const secret of harness.secret_markers) {
        expect(logs).not.toContain(secret);
      }
    });
  });
}

async function settle_submission<TRequest extends ImageGenerationRequest>(
  adapter: ProviderAdapter<TRequest>,
  context: ProviderExecutionContext,
  request: TRequest,
): Promise<ReturnType<typeof ImageGenerationResultSchema.parse>> {
  let submission = await adapter.submit(context, request);
  for (let poll_count = 0; poll_count < 20; poll_count += 1) {
    if (submission.state === "completed") {
      return ImageGenerationResultSchema.parse(submission.result);
    }

    const poll_result = await adapter.poll(context, submission);
    if (poll_result.state === "completed") {
      return ImageGenerationResultSchema.parse(poll_result.result);
    }
    if (poll_result.state === "failed") {
      throw new ProviderAdapterError(poll_result.error);
    }
    submission = pending_submission(submission, poll_result);
  }
  throw new ProviderAdapterError({ code: "timed_out", retryable: false });
}

function pending_submission(
  submission: Extract<ProviderSubmission, { state: "pending" }>,
  poll_result: Extract<ProviderPollResult, { state: "pending" }>,
): Extract<ProviderSubmission, { state: "pending" }> {
  return {
    state: "pending",
    submission_id: submission.submission_id,
    ...(submission.continuation === undefined ? {} : { continuation: submission.continuation }),
    ...(poll_result.poll_after_ms === undefined
      ? {}
      : { poll_after_ms: poll_result.poll_after_ms }),
  };
}
