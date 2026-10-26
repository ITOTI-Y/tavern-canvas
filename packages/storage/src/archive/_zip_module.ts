export type ZipModule = typeof import("@zip.js/zip.js");

let pending_module: Promise<ZipModule> | undefined;

// Dynamic import keeps zip.js out of the extension's initial chunk (the storage barrel is imported
// statically by the bootstrap); the promise is memoized.
export function load_zip_module(): Promise<ZipModule> {
  pending_module ??= import("@zip.js/zip.js");
  return pending_module;
}
