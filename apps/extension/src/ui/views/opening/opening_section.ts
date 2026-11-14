export type OpeningSection = "build" | "books" | "templates";

/** What the host lists; read again after every write. */
export interface OpeningLists {
  readonly books: readonly string[];
  readonly presets: readonly string[];
  readonly proxies: readonly string[];
  /** The book bound to the open chat. */
  readonly chat_book: string | null;
}

export function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
