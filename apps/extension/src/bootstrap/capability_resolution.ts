import type { CapabilityId } from "../ui/contracts/ui_capabilities.js";

export type CapabilityResolution<TValue> =
  | { readonly status: "available"; readonly value: TValue }
  | { readonly status: "unavailable"; readonly reason: string };

export function available<TValue>(value: TValue): CapabilityResolution<TValue> {
  return { status: "available", value };
}

export function unavailable(reason: string): CapabilityResolution<never> {
  return { status: "unavailable", reason };
}

export function resolve_capability<TValue>(build: () => TValue): CapabilityResolution<TValue> {
  try {
    return available(build());
  } catch (error) {
    return unavailable(describe_failure(error));
  }
}

export function describe_failure(error: unknown): string {
  if (error instanceof Error && error.message.trim() !== "") {
    return error.message;
  }
  return "Capability construction failed";
}

export interface CapabilityResolutionRecord {
  readonly capability_id: CapabilityId;
  readonly status: CapabilityResolution<unknown>["status"];
  readonly reason: string | null;
}

export function to_resolution_record(
  capability_id: CapabilityId,
  resolution: CapabilityResolution<unknown>,
): CapabilityResolutionRecord {
  return {
    capability_id,
    status: resolution.status,
    reason: resolution.status === "unavailable" ? resolution.reason : null,
  };
}

/** Code every unavailable capability's commands reject with; matches `to_ui_failure` in studio_controller.ts. */
export const CAPABILITY_UNAVAILABLE_CODE = "capability_unavailable";

export function capability_unavailable_error(reason: string): Error & { readonly code: string } {
  const error = new Error(reason) as Error & { readonly code: string };
  Object.defineProperty(error, "code", { value: CAPABILITY_UNAVAILABLE_CODE });
  return error;
}
