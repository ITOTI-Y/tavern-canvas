export type VocabularyImportErrorCode =
  | "vocabulary_import_busy"
  | "vocabulary_import_cancelled"
  | "vocabulary_import_invalid_file"
  | "vocabulary_import_invalid_format"
  | "vocabulary_import_size_limit"
  | "vocabulary_import_unavailable"
  | "vocabulary_import_failed";

export class VocabularyImportError extends Error {
  readonly code: VocabularyImportErrorCode;

  constructor(code: VocabularyImportErrorCode, message: string) {
    super(message);
    this.name = "VocabularyImportError";
    this.code = code;
  }
}
