export type ZipModule = typeof import("@zip.js/zip.js");

let pending_module: Promise<ZipModule> | undefined;

/**
 * Loads zip.js on first archive use instead of at module evaluation.
 *
 * The library is ~294 KB of raw source and is reachable only from `export_archive` and
 * `import_archive`, both of which run behind an explicit Settings command. A static import
 * would put all of it in the extension's initial chunk (`@tavern-canvas/storage`'s barrel is
 * statically imported by the bootstrap's settings capability), so the import must stay dynamic
 * for the archive code to land in its own chunk. The promise is memoized, so a second archive
 * operation reuses the already-resolved module.
 */
export function load_zip_module(): Promise<ZipModule> {
  pending_module ??= import("@zip.js/zip.js");
  return pending_module;
}
