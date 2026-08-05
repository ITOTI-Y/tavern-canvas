import { describe, expect, it } from "vitest";

import { CapabilityRegistry } from "./capability_registry.js";

describe("CapabilityRegistry", () => {
  it("rejects a duplicate capability without replacing its first owner", () => {
    const registry = new CapabilityRegistry();
    const first_value = { adapter: "first" };

    registry.register("image_generation", "provider.sd", first_value);

    let thrown: unknown;
    try {
      registry.register("image_generation", "provider.comfy", {
        adapter: "second",
      });
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).toContain("provider.sd");
    expect((thrown as Error).message).toContain("provider.comfy");
    expect(registry.get("image_generation")).toBe(first_value);
  });

  it("distinguishes optional lookup from required resolution", () => {
    const registry = new CapabilityRegistry();

    expect(registry.has("host.chat")).toBe(false);
    expect(registry.get("host.chat")).toBeUndefined();
    expect(() => registry.require("host.chat")).toThrowError(/host\.chat/u);
  });

  it("returns registered values through optional and required resolution", () => {
    const registry = new CapabilityRegistry();
    const capability = { get_active_chat: () => "chat-7" };

    registry.register("host.chat", "host.sillytavern", capability);

    expect(registry.has("host.chat")).toBe(true);
    expect(registry.get<typeof capability>("host.chat")).toBe(capability);
    expect(registry.require<typeof capability>("host.chat")).toBe(capability);
  });

  it("removes only capabilities owned by the stopped module", () => {
    const registry = new CapabilityRegistry();
    registry.register("host.chat", "host.sillytavern", { chat: true });
    registry.register("host.upload", "host.sillytavern", { upload: true });
    registry.register("provider.generate", "provider.sd", { generate: true });

    registry.remove_by_owner("host.sillytavern");

    expect(registry.has("host.chat")).toBe(false);
    expect(registry.has("host.upload")).toBe(false);
    expect(registry.has("provider.generate")).toBe(true);
  });
});
