import { describe, expect, it, vi } from "vitest";

import type { SecretDestinationPort } from "../host/secret_destination.js";
import type { BrowserSecretVaultPort } from "../storage/browser_secret_vault.js";
import { SecretBackendRouter } from "./secret_backend_router.js";
import type { SecretResolverPort } from "./sillytavern_secret_resolver.js";

const REFERENCE = "tavern_canvas:default:profile-1:novelai_token";

function browser_vault(): BrowserSecretVaultPort {
  return {
    supports: () => true,
    write_secret: vi.fn(() => Promise.resolve()),
    delete_secret: vi.fn(() => Promise.resolve()),
    probe_secret: vi.fn(() => Promise.resolve(true)),
    resolve_secret: vi.fn(() => Promise.resolve("browser-secret")),
    status: vi.fn(() => Promise.resolve({ state: "unlocked", secret_count: 1 } as const)),
    initialize: vi.fn(() => Promise.resolve({ state: "unlocked", secret_count: 0 } as const)),
    unlock: vi.fn(() => Promise.resolve({ state: "unlocked", secret_count: 1 } as const)),
    lock: vi.fn(() => Promise.resolve({ state: "locked", secret_count: 1 } as const)),
    reset: vi.fn(() => Promise.resolve({ state: "uninitialized", secret_count: 0 } as const)),
    close: vi.fn(() => Promise.resolve()),
  };
}

describe("SecretBackendRouter", () => {
  it("routes writes, reads, probes, and deletions through the currently selected backend", async () => {
    let mode: "host" | "browser_encrypted" = "host";
    const host_destination: SecretDestinationPort = {
      supports: () => true,
      write_secret: vi.fn(() => Promise.resolve()),
      delete_secret: vi.fn(() => Promise.resolve()),
      probe_secret: vi.fn(() => Promise.resolve(true)),
    };
    const host_resolver: SecretResolverPort = {
      resolve_secret: vi.fn(() => Promise.resolve("host-secret")),
    };
    const browser = browser_vault();
    const router = new SecretBackendRouter({
      mode: () => mode,
      host_destination,
      host_resolver,
      browser_vault: browser,
    });

    await router.write_secret(REFERENCE, "host-value");
    await expect(router.resolve_secret(REFERENCE)).resolves.toBe("host-secret");
    await router.delete_secret(REFERENCE);
    expect(host_destination.write_secret).toHaveBeenCalledWith(REFERENCE, "host-value");
    expect(host_destination.delete_secret).toHaveBeenCalledWith(REFERENCE);
    expect(browser.write_secret).not.toHaveBeenCalled();

    mode = "browser_encrypted";
    await router.write_secret(REFERENCE, "browser-value");
    await expect(router.probe_secret(REFERENCE)).resolves.toBe(true);
    await expect(router.resolve_secret(REFERENCE)).resolves.toBe("browser-secret");
    await router.delete_secret(REFERENCE);
    expect(browser.write_secret).toHaveBeenCalledWith(REFERENCE, "browser-value");
    expect(browser.delete_secret).toHaveBeenCalledWith(REFERENCE);
  });

  it("never falls back to the other backend when the selected backend is unavailable", async () => {
    const browser = browser_vault();
    const router = new SecretBackendRouter({
      mode: () => "host",
      host_destination: null,
      host_resolver: null,
      browser_vault: browser,
    });

    expect(router.supports("novelai_token")).toBe(false);
    await expect(router.write_secret(REFERENCE, "secret")).rejects.toThrowError(
      "Host credential storage is unavailable",
    );
    await expect(router.resolve_secret(REFERENCE)).rejects.toMatchObject({
      code: "unsupported_host",
    });
    expect(browser.write_secret).not.toHaveBeenCalled();
    expect(browser.resolve_secret).not.toHaveBeenCalled();
  });

  it("reports deletion as unsupported instead of silently leaving a credential behind", async () => {
    const host_destination: SecretDestinationPort = {
      supports: () => true,
      write_secret: () => Promise.resolve(),
      probe_secret: () => Promise.resolve(true),
    };
    const router = new SecretBackendRouter({
      mode: () => "host",
      host_destination,
      host_resolver: null,
      browser_vault: null,
    });

    await expect(router.delete_secret(REFERENCE)).rejects.toThrowError(
      "Host credential storage does not support deletion",
    );
  });
});
