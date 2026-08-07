import type { CapabilityId } from "../ui/contracts/ui_capabilities.js";

/**
 * A capability either has a working implementation behind it or it does not. Nothing in between:
 * there is no "degraded" or "partially wired" third state, because every consumer of a capability
 * calls the same methods either way and a half-built implementation would fail at call time
 * instead of at composition time.
 */
export type CapabilityResolution<TValue> =
  | { readonly status: "available"; readonly value: TValue }
  | { readonly status: "unavailable"; readonly reason: string };

export function available<TValue>(value: TValue): CapabilityResolution<TValue> {
  return { status: "available", value };
}

/** `never` so an unavailable branch unifies with whatever the available branch produces. */
export function unavailable(reason: string): CapabilityResolution<never> {
  return { status: "unavailable", reason };
}

/**
 * Builds one capability, converting a construction failure into an unavailable resolution rather
 * than letting it escape. Bootstrap must never fail because one capability could not be built.
 */
export function resolve_capability<TValue>(build: () => TValue): CapabilityResolution<TValue> {
  try {
    return available(build());
  } catch (error) {
    return unavailable(describe_failure(error));
  }
}

export async function resolve_capability_async<TValue>(
  build: () => Promise<TValue>,
): Promise<CapabilityResolution<TValue>> {
  try {
    return available(await build());
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

/** What Diagnostics renders and what the support bundle carries -- one row per capability. */
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

/**
 * Stable failure code every unavailable capability's commands reject with. Matches
 * studio_controller.ts's `to_ui_failure` snake_case contract so the shell shows a real
 * capability-blocked state instead of a generic error.
 */
export const CAPABILITY_UNAVAILABLE_CODE = "capability_unavailable";

export function capability_unavailable_error(reason: string): Error & { readonly code: string } {
  const error = new Error(reason) as Error & { readonly code: string };
  Object.defineProperty(error, "code", { value: CAPABILITY_UNAVAILABLE_CODE });
  return error;
}
