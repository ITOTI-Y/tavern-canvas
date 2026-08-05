import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";
import { z } from "zod";

const expected_manifest = {
  display_name: "智绘姬",
  loading_order: 110,
  requires: [],
  optional: [],
  dependencies: ["JS-Slash-Runner"],
  js: "dist/index.js",
  css: "dist/index.css",
  author: "ITOTI-Y",
  version: "3.0.0-alpha.1",
  homePage: "https://github.com/ITOTI-Y/tavern-canvas",
  auto_update: true,
  minimum_client_version: "1.18.0",
  i18n: {
    en: "i18n/en.json",
  },
} as const;

const runtime_paths_schema = z.object({
  js: z.string(),
  css: z.string(),
  i18n: z.object({ en: z.string() }),
});

const repository_root = resolve(import.meta.dirname, "../../..");

describe("extension manifest", () => {
  it("matches the installable root contract exactly", async () => {
    const source = await readFile(resolve(repository_root, "manifest.json"), "utf8");
    const manifest: unknown = JSON.parse(source);

    expect(manifest).toEqual(expected_manifest);
  });

  it("resolves every declared runtime path from the repository root", async () => {
    const source = await readFile(resolve(repository_root, "manifest.json"), "utf8");
    const manifest: unknown = JSON.parse(source);
    const paths = runtime_paths_schema.parse(manifest);

    expect(resolve(repository_root, paths.js)).toBe(resolve(repository_root, "dist/index.js"));
    expect(resolve(repository_root, paths.css)).toBe(resolve(repository_root, "dist/index.css"));
    expect(resolve(repository_root, paths.i18n.en)).toBe(resolve(repository_root, "i18n/en.json"));
  });
});
