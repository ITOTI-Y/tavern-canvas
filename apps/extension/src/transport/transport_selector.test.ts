import { describe, expect, it } from "vitest";

import {
  select_transport,
  TransportConfigurationError,
  type TransportSelectionInput,
} from "./transport_selector.js";

const CREDENTIAL_REFERENCE = "tavern_canvas:primary:profile-1:novelai_token";

const CLOUD_CANDIDATE = {
  provider_id: "novelai",
  credential_reference: CREDENTIAL_REFERENCE,
  secrets_readable: true,
} as const;

const EMPTY_INPUT: TransportSelectionInput = {
  direct_provider_base_url: null,
  direct_cloud: null,
};

describe("transport selection", () => {
  it("uses the required priority order", () => {
    expect(
      select_transport({
        ...EMPTY_INPUT,
        direct_cloud: CLOUD_CANDIDATE,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({
      kind: "direct_cloud",
      provider_id: "novelai",
      credential_reference: CREDENTIAL_REFERENCE,
    });
    expect(
      select_transport({
        ...EMPTY_INPUT,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({ kind: "local_direct", endpoint: "http://127.0.0.1:7860" });
  });

  it.each(["novelai", "openai_image", "google_image"] as const)(
    "selects the direct cloud route for %s",
    (provider_id) => {
      expect(
        select_transport({
          ...EMPTY_INPUT,
          direct_cloud: { ...CLOUD_CANDIDATE, provider_id },
        }),
      ).toEqual({
        kind: "direct_cloud",
        provider_id,
        credential_reference: CREDENTIAL_REFERENCE,
      });
    },
  );

  it.each(["sd_webui", "comfyui"] as const)(
    "leaves the loopback provider %s on the local direct route",
    (provider_id) => {
      expect(
        select_transport({
          ...EMPTY_INPUT,
          direct_cloud: { ...CLOUD_CANDIDATE, provider_id },
          direct_provider_base_url: "http://127.0.0.1:7860",
        }),
      ).toEqual({ kind: "local_direct", endpoint: "http://127.0.0.1:7860" });
    },
  );

  it("names the missing credential rather than reporting no transport at all", () => {
    expect(() =>
      select_transport({
        ...EMPTY_INPUT,
        direct_cloud: { ...CLOUD_CANDIDATE, credential_reference: null },
      }),
    ).toThrowError(/stored credential/u);
  });

  it("refuses a direct cloud call on a host that cannot reveal stored credentials", () => {
    expect(() =>
      select_transport({
        ...EMPTY_INPUT,
        direct_cloud: { ...CLOUD_CANDIDATE, secrets_readable: false },
      }),
    ).toThrowError(/cannot reveal stored credentials/u);
  });

  it.each([
    "http://192.168.1.10:7860",
    "https://[2001:db8::1]:7860",
    "http://localhost.example:7860",
  ])("rejects non-loopback direct endpoint %s", (endpoint) => {
    expect(() =>
      select_transport({
        ...EMPTY_INPUT,
        direct_provider_base_url: endpoint,
      }),
    ).toThrow(TransportConfigurationError);
  });

  it("fails closed when no transport is available", () => {
    expect(() => select_transport(EMPTY_INPUT)).toThrow(TransportConfigurationError);
  });
});
