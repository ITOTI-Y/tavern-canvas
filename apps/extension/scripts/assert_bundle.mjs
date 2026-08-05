import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const repository_root = resolve(import.meta.dirname, "../../..");
const manifest_path = resolve(repository_root, "manifest.json");
const locale_path = resolve(repository_root, "i18n/en.json");
const manifest = JSON.parse(await readFile(manifest_path, "utf8"));

if (manifest.js !== "dist/index.js" || manifest.css !== "dist/index.css") {
  throw new Error("Root manifest runtime paths do not match the production bundle");
}

const required_paths = [
  manifest_path,
  locale_path,
  resolve(repository_root, manifest.js),
  resolve(repository_root, manifest.css),
];

await Promise.all(required_paths.map((path) => access(path)));
for (const path of required_paths) {
  console.log(`bundle_file=${path.slice(repository_root.length + 1)}`);
}
