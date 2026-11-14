import { describe, expect, it } from "vitest";

import { catalog_url_from_input } from "./catalog_url.js";

const CATALOG = "https://huggingface.co/datasets/owner/name/resolve/main/catalog.json";

describe("catalog_url_from_input", () => {
  it("turns a dataset id or dataset page into the dataset's catalog.json", () => {
    expect(catalog_url_from_input(" owner/name ")).toBe(CATALOG);
    expect(catalog_url_from_input("https://huggingface.co/datasets/owner/name")).toBe(CATALOG);
    expect(catalog_url_from_input("https://huggingface.co/datasets/owner/name/tree/main")).toBe(
      CATALOG,
    );
  });

  it("keeps a catalog address as given and clears on empty input", () => {
    expect(catalog_url_from_input(CATALOG)).toBe(CATALOG);
    expect(catalog_url_from_input("https://updates.example.com/catalog.json")).toBe(
      "https://updates.example.com/catalog.json",
    );
    expect(catalog_url_from_input("  ")).toBe("");
  });

  it("rejects plain http and text that names no address", () => {
    expect(catalog_url_from_input("http://example.com/catalog.json")).toBeNull();
    expect(catalog_url_from_input("not a url")).toBeNull();
  });
});
