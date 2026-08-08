/**
 * The archive round trip, reachable without the package barrel. The barrel is on the initial path
 * (`open_database`, the repositories), so a dynamic `import("@tavern-canvas/storage")` would resolve
 * to a module the initial chunk already contains and defer nothing.
 */
export { ArchiveExportError, export_archive } from "./archive/export_archive.js";
export type { ArchiveExportFailureReason, ExportArchiveOptions } from "./archive/export_archive.js";
export { ArchiveImportError, import_archive } from "./archive/import_archive.js";
export type {
  ArchiveImportFailureReason,
  ImportArchiveOptions,
  ImportArchiveResult,
} from "./archive/import_archive.js";
