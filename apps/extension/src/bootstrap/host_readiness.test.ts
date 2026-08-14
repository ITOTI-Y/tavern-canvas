import { describe, expect, it, vi } from "vitest";

import { wait_for_sillytavern_app_ready } from "./host_readiness.js";

describe("wait_for_sillytavern_app_ready", () => {
  it("resolves immediately when the SillyTavern readiness surface is unavailable", async () => {
    await expect(wait_for_sillytavern_app_ready({})).resolves.toBeUndefined();

    const globals = Object.defineProperty({}, "SillyTavern", {
      get() {
        throw new Error("host getter failed");
      },
    });
    await expect(wait_for_sillytavern_app_ready(globals)).resolves.toBeUndefined();
  });

  it("waits for APP_READY and removes its listener before resolving", async () => {
    let ready_listener: (() => void) | undefined;
    const event_source = {
      on: vi.fn((_event_name: string, listener: () => void) => {
        ready_listener = listener;
      }),
      removeListener: vi.fn(),
    };
    const globals = {
      SillyTavern: {
        getContext: () => ({
          eventSource: event_source,
          eventTypes: { APP_READY: "app_ready" },
        }),
      },
    };

    let resolved = false;
    const readiness = wait_for_sillytavern_app_ready(globals).then(() => {
      resolved = true;
    });
    await Promise.resolve();

    expect(resolved).toBe(false);
    expect(event_source.on).toHaveBeenCalledWith("app_ready", expect.any(Function));

    ready_listener?.();
    await readiness;

    expect(resolved).toBe(true);
    expect(event_source.removeListener).toHaveBeenCalledWith("app_ready", ready_listener);
  });

  it("falls back to immediate startup when event registration throws", async () => {
    const globals = {
      SillyTavern: {
        getContext: () => ({
          eventSource: {
            on: () => {
              throw new Error("registration failed");
            },
          },
          eventTypes: { APP_READY: "app_ready" },
        }),
      },
    };

    await expect(wait_for_sillytavern_app_ready(globals)).resolves.toBeUndefined();
  });
});
