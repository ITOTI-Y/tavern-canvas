import { describe, expect, it } from "vitest";

import { Uint8ArrayReader, ZipReader } from "@zip.js/zip.js";

import {
  build_archive,
  format_checksum_sidecar,
  is_packageable_dist_path,
  parse_arguments,
  read_manifest_facts,
  select_release_paths,
  sha256_hex,
  type ManifestFacts,
  type SelectionInput,
} from "./index.js";

const MANIFEST: ManifestFacts = {
  version: "3.0.0",
  js_path: "dist/index.js",
  css_path: "dist/index.css",
  locale_paths: ["i18n/en.json"],
};

const CLEAN_PATHS = [
  "manifest.json",
  "README.md",
  "THIRD_PARTY_NOTICES.md",
  "i18n/en.json",
  "dist/index.js",
  "dist/index.css",
  "dist/chunks/GalleryView-8SiYHb9N.js",
  "dist/workers/vocabulary_worker.js",
  "dist/vocabulary/baseline/manifest.json",
  "dist/geist_variable.woff2",
];

function selection_for(overrides: Partial<SelectionInput> = {}) {
  return select_release_paths({
    manifest: MANIFEST,
    package_version: "3.0.0",
    tracked: new Set(CLEAN_PATHS),
    present: new Set(CLEAN_PATHS),
    ...overrides,
  });
}

describe("packageable dist paths", () => {
  it("keeps runtime output and drops maps and build bookkeeping", () => {
    expect(is_packageable_dist_path("dist/index.js")).toBe(true);
    expect(is_packageable_dist_path("dist/vocabulary/baseline/alias/h000.msgpack.gz")).toBe(true);
    expect(is_packageable_dist_path("dist/index.js.map")).toBe(false);
    expect(is_packageable_dist_path("dist/.vite/manifest.json")).toBe(false);
    expect(is_packageable_dist_path("README.md")).toBe(false);
  });
});

describe("release path selection", () => {
  it("selects exactly the sorted runtime and document set for a clean repository", () => {
    const selection = selection_for();
    expect(selection.rejections).toEqual([]);
    expect(selection.paths).toEqual([...CLEAN_PATHS].sort());
  });

  it("omits a source map that is present but never tracked", () => {
    const selection = selection_for({
      present: new Set([...CLEAN_PATHS, "dist/index.js.map", "dist/.vite/manifest.json"]),
    });
    expect(selection.rejections).toEqual([]);
    expect(selection.paths).not.toContain("dist/index.js.map");
    expect(selection.paths).not.toContain("dist/.vite/manifest.json");
  });

  it("rejects a runtime input git does not track", () => {
    const untracked = "dist/vocabulary/baseline/alias/h000.msgpack.gz";
    const selection = selection_for({ present: new Set([...CLEAN_PATHS, untracked]) });
    expect(selection.rejections).toEqual([`${untracked} is an untracked runtime input`]);
    expect(selection.paths).not.toContain(untracked);
  });

  it("rejects a tracked runtime path the build did not emit", () => {
    const selection = selection_for({
      present: new Set(
        CLEAN_PATHS.filter((path) => path !== "dist/chunks/GalleryView-8SiYHb9N.js"),
      ),
    });
    expect(selection.rejections).toEqual([
      "dist/chunks/GalleryView-8SiYHb9N.js is tracked by git but absent from the build output",
    ]);
  });

  it("rejects a committed source map even though the archive would exclude it", () => {
    const selection = selection_for({
      tracked: new Set([...CLEAN_PATHS, "dist/index.js.map"]),
      present: new Set([...CLEAN_PATHS, "dist/index.js.map"]),
    });
    expect(selection.rejections).toEqual([
      "dist/index.js.map is a source map that git tracks; source maps must never be committed",
    ]);
  });

  it("rejects a manifest runtime path that is missing or untracked", () => {
    expect(
      selection_for({ present: new Set(CLEAN_PATHS.filter((path) => path !== "dist/index.css")) })
        .rejections,
    ).toContain(
      "dist/index.css is missing from the working tree but manifest.json declares it as the extension css",
    );
    expect(
      selection_for({ tracked: new Set(CLEAN_PATHS.filter((path) => path !== "i18n/en.json")) })
        .rejections,
    ).toContain(
      "i18n/en.json is not tracked by git but manifest.json names it as a locale catalog",
    );
  });

  it("rejects a manifest runtime path that points outside the packaged dist tree", () => {
    expect(
      select_release_paths({
        manifest: { ...MANIFEST, js_path: "index.js" },
        package_version: "3.0.0",
        tracked: new Set(CLEAN_PATHS),
        present: new Set(CLEAN_PATHS),
      }).rejections,
    ).toContain("manifest.json js path index.js is not a packageable dist/ path");
  });

  it("rejects a locale catalog the manifest does not declare", () => {
    const selection = selection_for({
      tracked: new Set([...CLEAN_PATHS, "i18n/fr.json"]),
      present: new Set([...CLEAN_PATHS, "i18n/fr.json"]),
    });
    expect(selection.rejections).toEqual([
      "i18n/fr.json is a locale catalog that manifest.json does not declare",
    ]);
  });

  it("rejects a package version that has drifted from the manifest version", () => {
    expect(selection_for({ package_version: "3.0.1" }).rejections).toEqual([
      "package.json version 3.0.1 does not match manifest.json version 3.0.0",
    ]);
  });
});

const encoder = new TextEncoder();

function files_of(entries: Record<string, string>) {
  return Object.entries(entries).map(([path, content]) => ({
    path,
    bytes: encoder.encode(content),
  }));
}

describe("deterministic archive", () => {
  it("produces identical bytes for identical inputs", async () => {
    const files = files_of({ "manifest.json": "{}", "dist/index.js": "export {};" });
    const first = await build_archive(files);
    const second = await build_archive(files);
    expect(sha256_hex(first)).toBe(sha256_hex(second));
  });

  it("pins every entry's modification time to the DOS epoch and to regular-file permissions", async () => {
    const archive = await build_archive(files_of({ "dist/index.js": "export {};" }));
    const reader = new ZipReader(new Uint8ArrayReader(archive));
    const entries = await reader.getEntries();
    await reader.close();

    expect(entries).toHaveLength(1);
    const entry = entries[0];
    expect(entry?.filename).toBe("dist/index.js");
    expect(entry?.lastModDate.getUTCFullYear()).toBe(1980);
    expect((entry?.externalFileAttributes ?? 0) >>> 16).toBe(0o100_644);
    expect(entry?.directory).toBe(false);
  });

  it("preserves the caller's entry order", async () => {
    const archive = await build_archive(
      files_of({ "dist/index.js": "a", "manifest.json": "{}", "README.md": "b" }),
    );
    const reader = new ZipReader(new Uint8ArrayReader(archive));
    const filenames = (await reader.getEntries()).map((entry) => entry.filename);
    await reader.close();
    expect(filenames).toEqual(["dist/index.js", "manifest.json", "README.md"]);
  });
});

describe("manifest reading", () => {
  it("extracts the runtime paths a release must validate", () => {
    expect(
      read_manifest_facts(
        JSON.stringify({
          version: "3.0.0",
          js: "dist/index.js",
          css: "dist/index.css",
          i18n: { en: "i18n/en.json" },
        }),
      ),
    ).toEqual(MANIFEST);
  });

  it("reports absent fields rather than inventing them", () => {
    expect(read_manifest_facts("{}")).toEqual({
      version: "",
      js_path: undefined,
      css_path: undefined,
      locale_paths: [],
    });
    expect(() => read_manifest_facts("[]")).toThrow(/not a JSON object/u);
  });
});

describe("command line and sidecar", () => {
  it("parses the supported flags", () => {
    expect(parse_arguments([])).toEqual({ repository_root: undefined, output_path: undefined });
    expect(parse_arguments(["--repository-root", "/repo", "--output", "/out.zip"])).toEqual({
      repository_root: "/repo",
      output_path: "/out.zip",
    });
    expect(() => parse_arguments(["--unknown"])).toThrow(/Usage/u);
  });

  it("writes a sidecar sha256sum can verify", () => {
    expect(format_checksum_sidecar("abc123", "tavern-canvas.zip")).toBe(
      "abc123  tavern-canvas.zip\n",
    );
  });
});
