import type {
  AssetId,
  GeneratedAsset,
  ImageGenerationRequest,
  ImageGenerationResult,
  ProviderCapability,
  ProviderError,
  ProviderId,
} from "@tavern-canvas/contracts";

import type { ProviderTransport } from "./provider_transport.js";

export interface ProviderProfile {
  readonly profile_id: string;
  readonly provider_id: ProviderId;
  readonly model_allowlist: readonly string[];
  readonly output_mime_type_allowlist: readonly GeneratedAsset["media_type"][];
}

export interface ProviderSourceAsset {
  readonly asset_id: AssetId;
  readonly media_type: "image/png" | "image/jpeg" | "image/webp";
  readonly bytes: Uint8Array;
}

export interface ProviderOutputAsset {
  readonly asset: GeneratedAsset;
  readonly bytes: Uint8Array;
}

export interface ProviderAssetReader {
  read(asset_id: AssetId, signal: AbortSignal): Promise<ProviderSourceAsset>;
}

export interface ProviderLogSink {
  write(record: unknown): void;
}

export interface ProviderExecutionContext {
  readonly profile: ProviderProfile;
  readonly transport: ProviderTransport;
  readonly assets: ProviderAssetReader;
  readonly signal: AbortSignal;
  readonly log: ProviderLogSink;
}

export type ProviderSubmission =
  | {
      readonly state: "completed";
      readonly result: ImageGenerationResult;
      readonly output_assets: readonly ProviderOutputAsset[];
    }
  | {
      readonly state: "pending";
      readonly submission_id: string;
      readonly poll_after_ms?: number;
      readonly continuation?: Readonly<Record<string, unknown>>;
    };

export type ProviderPollResult =
  | {
      readonly state: "pending";
      readonly poll_after_ms?: number;
    }
  | {
      readonly state: "completed";
      readonly result: ImageGenerationResult;
      readonly output_assets: readonly ProviderOutputAsset[];
    }
  | {
      readonly state: "failed";
      readonly error: ProviderError;
    };

export interface ProviderAdapter<TRequest extends ImageGenerationRequest> {
  readonly provider_id: TRequest["provider_id"];
  readonly capabilities: ReadonlySet<ProviderCapability>;
  validate_profile(profile: unknown): ProviderProfile;
  submit(context: ProviderExecutionContext, request: TRequest): Promise<ProviderSubmission>;
  poll(
    context: ProviderExecutionContext,
    submission: ProviderSubmission,
  ): Promise<ProviderPollResult>;
  cancel(context: ProviderExecutionContext, submission: ProviderSubmission): Promise<void>;
}
