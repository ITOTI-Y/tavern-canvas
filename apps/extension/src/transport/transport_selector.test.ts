import { describe, expect, it } from "vitest";

import {
  select_transport,
  TransportConfigurationError,
  type TransportSelectionInput,
} from "./transport_selector.js";

const EMPTY_INPUT: TransportSelectionInput = {
  gateway_endpoint: null,
  http_acknowledgments: {},
  tauri_provider_available: false,
  sillytavern_available: false,
  direct_provider_base_url: null,
};

describe("transport selection", () => {
  it("uses the required priority order", () => {
    expect(
      select_transport({
        ...EMPTY_INPUT,
        gateway_endpoint: "https://gateway.example",
        tauri_provider_available: true,
        sillytavern_available: true,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({ kind: "gateway", endpoint: "https://gateway.example" });
    expect(
      select_transport({
        ...EMPTY_INPUT,
        tauri_provider_available: true,
        sillytavern_available: true,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({ kind: "tauri" });
    expect(
      select_transport({
        ...EMPTY_INPUT,
        sillytavern_available: true,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({ kind: "host_proxy" });
    expect(
      select_transport({
        ...EMPTY_INPUT,
        direct_provider_base_url: "http://127.0.0.1:7860",
      }),
    ).toEqual({ kind: "local_direct", endpoint: "http://127.0.0.1:7860" });
  });

  it("accepts an exactly acknowledged cleartext Gateway", () => {
    expect(
      select_transport({
        ...EMPTY_INPUT,
        gateway_endpoint: "http://192.168.1.10:8080",
        http_acknowledgments: {
          "http://192.168.1.10:8080": "2026-08-05T09:30:00.000Z",
        },
      }),
    ).toEqual({ kind: "gateway", endpoint: "http://192.168.1.10:8080" });
  });

  it("rejects unacknowledged cleartext Gateway origins", () => {
    expect(() =>
      select_transport({
        ...EMPTY_INPUT,
        gateway_endpoint: "http://192.168.1.10:8080",
      }),
    ).toThrow(TransportConfigurationError);
  });

  it("requires exact acknowledgment for a loopback cleartext Gateway", () => {
    expect(() =>
      select_transport({
        ...EMPTY_INPUT,
        gateway_endpoint: "http://127.0.0.1:8080",
      }),
    ).toThrow(TransportConfigurationError);
    expect(
      select_transport({
        ...EMPTY_INPUT,
        gateway_endpoint: "http://127.0.0.1:8080",
        http_acknowledgments: {
          "http://127.0.0.1:8080": "2026-08-05T09:30:00.000Z",
        },
      }),
    ).toEqual({ kind: "gateway", endpoint: "http://127.0.0.1:8080" });
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
