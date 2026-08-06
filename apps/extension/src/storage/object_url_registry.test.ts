import { describe, expect, it, vi } from "vitest";

import { create_object_url_registry, type ObjectUrlFactory } from "./object_url_registry.js";

function fake_factory(): ObjectUrlFactory & { readonly urls: string[] } {
  let counter = 0;
  const urls: string[] = [];
  return {
    urls,
    create_object_url: vi.fn((_blob: Blob) => {
      counter += 1;
      const url = `blob:tavern-canvas/${counter}`;
      urls.push(url);
      return url;
    }),
    revoke_object_url: vi.fn(),
  };
}

function blob(content = "x"): Blob {
  return new Blob([content], { type: "image/png" });
}

describe("object_url_registry", () => {
  it("creates and returns an object URL for the given blob", () => {
    const factory = fake_factory();
    const registry = create_object_url_registry(factory);

    const url = registry.create("owner-1", blob());

    expect(url).toBe("blob:tavern-canvas/1");
    expect(factory.create_object_url).toHaveBeenCalledTimes(1);
  });

  it("revokes every URL owned by a component when it releases, and is idempotent", () => {
    const factory = fake_factory();
    const registry = create_object_url_registry(factory);

    const first = registry.create("owner-1", blob("a"));
    const second = registry.create("owner-1", blob("b"));

    registry.release("owner-1");
    expect(factory.revoke_object_url).toHaveBeenCalledTimes(2);
    expect(factory.revoke_object_url).toHaveBeenCalledWith(first);
    expect(factory.revoke_object_url).toHaveBeenCalledWith(second);

    registry.release("owner-1");
    expect(factory.revoke_object_url).toHaveBeenCalledTimes(2);
  });

  it("does not revoke URLs owned by a different component", () => {
    const factory = fake_factory();
    const registry = create_object_url_registry(factory);

    const owned_by_a = registry.create("owner-a", blob("a"));
    const owned_by_b = registry.create("owner-b", blob("b"));

    registry.release("owner-a");

    expect(factory.revoke_object_url).toHaveBeenCalledExactlyOnceWith(owned_by_a);
    expect(factory.revoke_object_url).not.toHaveBeenCalledWith(owned_by_b);
  });

  it("revokes every tracked URL for every owner on dispose (app unmount)", () => {
    const factory = fake_factory();
    const registry = create_object_url_registry(factory);

    registry.create("owner-a", blob("a"));
    registry.create("owner-b", blob("b"));
    registry.create("owner-b", blob("c"));

    registry.dispose();

    expect(factory.revoke_object_url).toHaveBeenCalledTimes(3);

    registry.dispose();
    expect(factory.revoke_object_url).toHaveBeenCalledTimes(3);
  });

  it("uses the global URL API by default", () => {
    const registry = create_object_url_registry();
    const revoke_spy = vi.spyOn(URL, "revokeObjectURL");

    const url = registry.create("owner-1", blob());
    expect(typeof url).toBe("string");

    registry.release("owner-1");
    expect(revoke_spy).toHaveBeenCalledWith(url);

    revoke_spy.mockRestore();
  });
});
