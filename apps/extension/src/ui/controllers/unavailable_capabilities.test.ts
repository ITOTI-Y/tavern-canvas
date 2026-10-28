import { describe, expect, it } from "vitest";

import {
  CAPABILITY_NOT_IMPLEMENTED_CODE,
  create_unavailable_capabilities,
} from "./unavailable_capabilities.js";

describe("create_unavailable_capabilities", () => {
  it("resolves every load() to an empty snapshot instead of rejecting", async () => {
    const capabilities = create_unavailable_capabilities();

    await expect(capabilities.generation.load()).resolves.toEqual([]);
    await expect(capabilities.profiles.load()).resolves.toEqual([]);
    await expect(capabilities.prompt_presets.load()).resolves.toEqual([]);
    await expect(capabilities.assets.load()).resolves.toEqual({
      character: [],
      outfit: [],
      lora: [],
      vibe: [],
      workflow: [],
      prompt_tag: [],
    });
    await expect(capabilities.gallery.load()).resolves.toEqual([]);
    await expect(capabilities.vocabulary.load()).resolves.toEqual([]);
    await expect(capabilities.diagnostics.load()).resolves.toEqual({
      capability_matrix: {},
      helper_version: null,
      storage_usage_bytes: null,
      storage_quota_bytes: null,
    });
    const settings_snapshot = await capabilities.settings.load();
    expect(settings_snapshot.settings.schema_version).toBe(1);
    expect(settings_snapshot.vocabulary_update_channel).toBe("bundled");
  });

  it("every subscribe() returns a callable no-op unsubscribe", () => {
    const capabilities = create_unavailable_capabilities();

    for (const capability of [
      capabilities.generation,
      capabilities.profiles,
      capabilities.prompt_presets,
      capabilities.assets,
      capabilities.gallery,
      capabilities.diagnostics,
      capabilities.settings,
    ]) {
      const unsubscribe = capability.subscribe(() => {
        throw new Error("handler should never fire: nothing is ever published");
      });
      expect(() => {
        unsubscribe();
      }).not.toThrow();
    }
  });

  it("rejects every mutating command with the stable capability_not_implemented code", async () => {
    const capabilities = create_unavailable_capabilities();

    await expect(capabilities.settings.update({})).rejects.toMatchObject({
      code: CAPABILITY_NOT_IMPLEMENTED_CODE,
    });
  });

  it("vocabulary.cancel_install() is a harmless synchronous no-op", () => {
    const capabilities = create_unavailable_capabilities();
    expect(() => {
      capabilities.vocabulary.cancel_install();
    }).not.toThrow();
  });
});
