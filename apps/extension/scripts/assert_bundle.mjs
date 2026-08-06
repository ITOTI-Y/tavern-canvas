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

// The vocabulary baseline (apps/extension/public/vocabulary/baseline) ships
// via Vite's publicDir copy, not the module graph -- verify every shard the
// manifest lists actually reached dist/, since a future Vite upgrade
// silently changing the copyPublicDir default would otherwise fail only at
// runtime, in the Worker, far from this build step.
const vocabulary_baseline_manifest_path = resolve(
  repository_root,
  "dist/vocabulary/baseline/manifest.json",
);
const vocabulary_manifest = JSON.parse(await readFile(vocabulary_baseline_manifest_path, "utf8"));
const vocabulary_shard_paths = vocabulary_manifest.shards.map((shard) =>
  resolve(repository_root, "dist/vocabulary/baseline", shard.path),
);
await Promise.all(
  [vocabulary_baseline_manifest_path, ...vocabulary_shard_paths].map((path) => access(path)),
);
console.log(
  `bundle_file=dist/vocabulary/baseline/manifest.json ` +
    `(record_count=${vocabulary_manifest.record_count}, shards=${vocabulary_shard_paths.length})`,
);
