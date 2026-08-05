import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import {
  ImageGenerationResultSchema,
  type ImageGenerationRequest,
  type ImageGenerationResult,
} from "@tavern-canvas/contracts";
import { describe, expect, it } from "vitest";

import {
  type ProviderAdapter,
  type ProviderExecutionContext,
  type ProviderOutputAsset,
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

type SettledProviderCompletion = {
  readonly result: ImageGenerationResult;
  readonly output_assets: readonly ProviderOutputAsset[];
};

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

      let completion: SettledProviderCompletion | undefined;
      let failure: unknown;
      try {
        completion = await settle_submission(harness.adapter, context, harness.request);
      } catch (error) {
        failure = error;
      }

      expect(harness.request).toEqual(source_request);
      if (harness.expectation.kind === "success") {
        expect(failure).toBeUndefined();
        if (completion === undefined) {
          throw new Error("Expected provider completion");
        }
        const result = ImageGenerationResultSchema.parse(completion.result);
        expect(result.assets).toHaveLength(harness.expectation.asset_count);
        expect(completion.output_assets).toHaveLength(harness.expectation.asset_count);
        expect(completion.output_assets.map(({ asset }) => asset)).toEqual(result.assets);
        completion.output_assets.forEach((output_asset, index) => {
          const result_asset = result.assets[index];
          if (result_asset === undefined) {
            throw new Error(`Missing result asset at index ${String(index)}`);
          }
          expect(output_asset.asset).toEqual(result_asset);
          expect(output_asset.asset.asset_id).toBe(result_asset.asset_id);
          expect(output_asset.bytes.byteLength).toBe(result_asset.byte_length);
          expect(bytesToHex(sha256(output_asset.bytes))).toBe(result_asset.sha256);
        });
        expect(JSON.stringify(result)).not.toMatch(/"bytes"\s*:/u);
      } else {
        expect(failure).toBeInstanceOf(ProviderAdapterError);
        expect((failure as ProviderAdapterError).provider_error.code).toBe(
          harness.expectation.code,
        );
      }

      const logs = JSON.stringify(harness.log_records());
      expect(logs).not.toMatch(/"bytes"\s*:/u);
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
): Promise<SettledProviderCompletion> {
  let submission = await adapter.submit(context, request);
  for (let poll_count = 0; poll_count < 20; poll_count += 1) {
    if (submission.state === "completed") {
      return {
        result: ImageGenerationResultSchema.parse(submission.result),
        output_assets: submission.output_assets,
      };
    }

    const poll_result = await adapter.poll(context, submission);
    if (poll_result.state === "completed") {
      return {
        result: ImageGenerationResultSchema.parse(poll_result.result),
        output_assets: poll_result.output_assets,
      };
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
