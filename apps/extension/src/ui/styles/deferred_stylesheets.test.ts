import { beforeEach, describe, expect, it, vi } from "vitest";

type Registry = typeof import("./deferred_stylesheets.js");

function create_root(): ShadowRoot {
  const shadow_root = document.createElement("div").attachShadow({ mode: "open" });
  const first_party = document.createElement("style");
  first_party.textContent = "first-party";
  shadow_root.append(first_party, document.createElement("div"));
  return shadow_root;
}

function style_texts(shadow_root: ShadowRoot): (string | null)[] {
  return [...shadow_root.querySelectorAll("style")].map((element) => element.textContent);
}

describe("deferred stylesheets", () => {
  let registry: Registry;

  beforeEach(async () => {
    vi.resetModules();
    registry = await import("./deferred_stylesheets.js");
  });

  it("inserts sheets after the first-party stylesheet in the fixed cascade order", () => {
    const shadow_root = create_root();
    registry.attach_deferred_stylesheets(shadow_root);
    registry.register_deferred_stylesheet("settings", "settings");
    registry.register_deferred_stylesheet("assets", "assets");
    registry.register_deferred_stylesheet("dialogs", "dialogs");

    expect(style_texts(shadow_root)).toStrictEqual([
      "first-party",
      "dialogs",
      "assets",
      "settings",
    ]);
  });

  it("replaces a re-registered sheet instead of duplicating it", () => {
    const shadow_root = create_root();
    registry.attach_deferred_stylesheets(shadow_root);
    registry.register_deferred_stylesheet("gallery", "old");
    registry.register_deferred_stylesheet("gallery", "new");

    expect(style_texts(shadow_root)).toStrictEqual(["first-party", "new"]);
  });

  it("writes sheets registered before the shadow root was attached, and none after detaching", () => {
    registry.register_deferred_stylesheet("prompt", "prompt");
    const shadow_root = create_root();
    const detach = registry.attach_deferred_stylesheets(shadow_root);
    detach();
    registry.register_deferred_stylesheet("diagnostics", "diagnostics");

    expect(style_texts(shadow_root)).toStrictEqual(["first-party", "prompt"]);
  });
});
