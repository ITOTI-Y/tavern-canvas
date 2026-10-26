import { readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const ui_root = resolve(import.meta.dirname, "..");
const APP_ICON_FILE = resolve(ui_root, "components/AppIcon.vue");

async function collect_vue_files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect_vue_files(path)));
    } else if (entry.name.endsWith(".vue")) {
      files.push(path);
    }
  }
  return files;
}

interface VueFile {
  readonly path: string;
  readonly source: string;
}

async function load_vue_files(): Promise<readonly VueFile[]> {
  const paths = await collect_vue_files(ui_root);
  return Promise.all(paths.map(async (path) => ({ path, source: await readFile(path, "utf8") })));
}

function lucide_imports(source: string): readonly string[] {
  const names: string[] = [];
  for (const match of source.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']lucide-vue-next["']/gu)) {
    for (const raw of (match[1] ?? "").split(",")) {
      const name = raw
        .trim()
        .split(/\s+as\s+/u)
        .at(-1)
        ?.trim();
      if (name) {
        names.push(name);
      }
    }
  }
  return names;
}

function template_of(source: string): string {
  const start = source.indexOf("<template>");
  return start === -1 ? "" : source.slice(start);
}

describe("icon contract", () => {
  it("finds Vue files to check", async () => {
    const files = await load_vue_files();
    expect(files.length).toBeGreaterThan(0);
  });

  it("renders every Lucide glyph through AppIcon, never as a bare component tag", async () => {
    const files = await load_vue_files();
    const offenders: string[] = [];

    for (const file of files) {
      if (file.path === APP_ICON_FILE) {
        continue;
      }
      const template = template_of(file.source);
      for (const name of lucide_imports(file.source)) {
        const tag = new RegExp(`<${name}(?=[\\s/>])`, "u");
        if (tag.test(template)) {
          offenders.push(`${relative(ui_root, file.path)}: <${name} ...>`);
        }
      }
    }

    expect(
      offenders,
      `pass these to <AppIcon :icon="..."> instead:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("lets no file except AppIcon.vue set an icon stroke width", async () => {
    const files = await load_vue_files();
    const offenders: string[] = [];

    for (const file of files) {
      if (file.path === APP_ICON_FILE) {
        continue;
      }
      if (/:?stroke-width\s*=/u.test(template_of(file.source))) {
        offenders.push(relative(ui_root, file.path));
      }
    }

    expect(
      offenders,
      `stroke width belongs to AppIcon.vue alone; found it set in:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("keeps the stroke width defined in exactly one place", async () => {
    const app_icon = await readFile(APP_ICON_FILE, "utf8");
    expect(app_icon).toMatch(/const ICON_STROKE_WIDTH = [\d.]+;/u);

    const files = await collect_vue_files(ui_root);
    const ts_files = await collect_ts_files(ui_root);
    const duplicates: string[] = [];
    for (const path of [...files, ...ts_files]) {
      if (path === APP_ICON_FILE) {
        continue;
      }
      const source = await readFile(path, "utf8");
      if (/ICON_STROKE_WIDTH\s*=/u.test(source)) {
        duplicates.push(relative(ui_root, path));
      }
    }

    expect(
      duplicates,
      `a second stroke-width constant defeats the point; found in:\n${duplicates.join("\n")}`,
    ).toEqual([]);
  });
});

async function collect_ts_files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect_ts_files(path)));
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      files.push(path);
    }
  }
  return files;
}
