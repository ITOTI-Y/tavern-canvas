import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";
import { z } from "zod";

const repository_root = resolve(import.meta.dirname, "../../..");

const package_version = z
  .object({ version: z.string() })
  .parse(JSON.parse(await readFile(resolve(repository_root, "package.json"), "utf8"))).version;

const expected_manifest = {
  display_name: "智绘姬",
  loading_order: 110,
  requires: [],
  optional: [],
  dependencies: ["third-party/JS-Slash-Runner"],
  js: "dist/index.js",
  css: "dist/index.css",
  author: "ITOTI-Y",
  version: package_version,
  homePage: "https://github.com/ITOTI-Y/tavern-canvas",
  auto_update: true,
  minimum_client_version: "1.18.0",
  minimum_tavern_helper_version: "4.9.1",
  i18n: {
    en: "i18n/en.json",
  },
} as const;

const runtime_paths_schema = z.object({
  js: z.string(),
  css: z.string(),
  i18n: z.object({ en: z.string() }),
});

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
