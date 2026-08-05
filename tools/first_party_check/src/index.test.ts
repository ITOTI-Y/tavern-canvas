import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { format_finding, scan_first_party, type SourceFinding } from "./index.js";

let temporary_root: string;

beforeEach(async () => {
  temporary_root = await mkdtemp(resolve(tmpdir(), "tavern-canvas-source-check-"));
});

afterEach(async () => {
  await rm(temporary_root, { recursive: true, force: true });
});

async function write_fixture(relative_path: string, source: string): Promise<string> {
  const absolute_path = resolve(temporary_root, relative_path);
  await mkdir(dirname(absolute_path), { recursive: true });
  await writeFile(absolute_path, source, "utf8");
  return absolute_path;
}

async function scan_fixture(relative_path: string, source: string): Promise<SourceFinding[]> {
  const absolute_path = await write_fixture(relative_path, source);
  return scan_first_party([absolute_path], { repository_root: temporary_root });
}

describe("scan_first_party", () => {
  it.each([
    [
      "remote script",
      "apps/extension/src/remote.ts",
      '<script src="https://cdn.example.invalid/runtime.js"></script>',
      "remote-script",
    ],
    [
      "CSS import",
      "apps/extension/src/remote.css",
      '@import "https://cdn.example.invalid/theme.css";',
      "remote-style",
    ],
    [
      "runtime font URL",
      "apps/extension/src/font.css",
      'src: url("https://cdn.example.invalid/font.woff2");',
      "remote-style",
    ],
    [
      "Font Awesome family",
      "apps/extension/src/icon.css",
      'font-family: "Font Awesome 6 Free";',
      "font-awesome",
    ],
    [
      "Font Awesome utility class",
      "apps/extension/src/Icon.vue",
      '<i class="fa-solid fa-camera"></i>',
      "font-awesome",
    ],
  ] as const)("reports %s", async (_name, relative_path, source, rule_id) => {
    const findings = await scan_fixture(relative_path, source);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule_id).toBe(rule_id);
  });

  it.each([
    ["TypeScript", "apps/extension/src/status.ts", 'export const status = "✅";'],
    ["Vue template", "apps/extension/src/Status.vue", "<template><p>Ready ✅</p></template>"],
    ["CSS content", "apps/extension/src/status.css", '.status::before { content: "✅"; }'],
    ["locale value", "apps/extension/src/locales/en.json", '{"ready":"✅"}'],
  ] as const)("reports first-party emoji in %s", async (_kind, relative_path, source) => {
    const findings = await scan_fixture(relative_path, source);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule_id).toBe("first-party-emoji");
  });

  it("reports legacy root runtime imports on their source lines", async () => {
    const findings = await scan_fixture(
      "apps/extension/src/legacy.ts",
      [
        'import "../../../index.js";',
        'import template from "../../../settings.html";',
        'const worker = import("../../../transformers.min.js");',
      ].join("\n"),
    );

    expect(findings.map(({ line, rule_id }) => ({ line, rule_id }))).toEqual([
      { line: 1, rule_id: "legacy-runtime-import" },
      { line: 2, rule_id: "legacy-runtime-import" },
      { line: 3, rule_id: "legacy-runtime-import" },
    ]);
  });

  it("reports a relative file, line, rule ID, and bounded excerpt", async () => {
    const findings = await scan_fixture(
      "apps/extension/src/remote.ts",
      [
        'const safe = "safe";',
        'const markup = `<script src="https://bad.invalid/x.js"></script>`;',
      ].join("\n"),
    );

    expect(findings).toEqual([
      {
        file_path: "apps/extension/src/remote.ts",
        line: 2,
        rule_id: "remote-script",
        excerpt: 'const markup = `<script src="https://bad.invalid/x.js"></script>`;',
      },
    ]);
    const finding = findings[0];
    if (finding === undefined) {
      throw new Error("Expected one remote script finding");
    }
    expect(format_finding(finding)).toBe(
      'apps/extension/src/remote.ts:2 [remote-script] const markup = `<script src="https://bad.invalid/x.js"></script>`;',
    );
  });

  it("allows user-content and legacy migration fixtures", async () => {
    await write_fixture(
      "tests/fixtures/user_content/message.json",
      '{"message":"✅ <script src=\\"https://user.invalid/x.js\\"></script>"}',
    );
    await write_fixture(
      "tools/v2_migration/fixtures/legacy.js",
      'import "../../../index.js"; const legacy = "✅";',
    );

    await expect(
      scan_first_party([temporary_root], { repository_root: temporary_root }),
    ).resolves.toEqual([]);
  });

  it("never rewrites a scanned file", async () => {
    const source = 'const markup = `<script src="https://bad.invalid/x.js"></script>`;\n';
    const absolute_path = await write_fixture("apps/extension/src/remote.ts", source);

    await scan_first_party([absolute_path], { repository_root: temporary_root });

    await expect(readFile(absolute_path, "utf8")).resolves.toBe(source);
  });
});
