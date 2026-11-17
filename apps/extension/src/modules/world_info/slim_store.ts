/**
 * Condensed versions of world book entries, kept in this browser by book name and entry uid with
 * a hash of the original text. A stale hash means the entry changed since, and the original is
 * sent instead. The store is a cache: losing it only brings back the original texts.
 */
export interface SlimEntry {
  readonly hash: string;
  readonly slim: string;
}

const STORAGE_KEY = "tavern_canvas.world_info_slims.v1";

/** Macros whose value changes per scan; such an entry is never condensed. */
const RANDOM_MACRO = /\{\{\s*(?:random|roll|pick)\b/iu;

export function is_slimmable(content: string): boolean {
  return !RANDOM_MACRO.test(content);
}

/** FNV-1a over the text with its length; enough to notice an edited entry. */
export function content_hash(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 0x01000193) >>> 0;
  }
  return `${hash.toString(16)}-${String(text.length)}`;
}

type Books = Record<string, Record<string, SlimEntry>>;

function read_all(storage: Storage): Books {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? "{}");
    return typeof parsed === "object" && parsed !== null ? (parsed as Books) : {};
  } catch {
    return {};
  }
}

export interface SlimStore {
  /** The condensed text when one is stored for this exact original. */
  lookup(book: string, uid: number, hash: string): string | null;
  save(book: string, entries: readonly { uid: number; hash: string; slim: string }[]): void;
  /** Stored entries of a book that still match `current` original hashes, by uid. */
  matching(book: string, current: ReadonlyMap<number, string>): ReadonlyMap<number, string>;
}

export function create_slim_store(storage: Storage): SlimStore {
  let books = read_all(storage);
  return {
    lookup(book, uid, hash) {
      const entry = books[book]?.[String(uid)];
      return entry !== undefined && entry.hash === hash ? entry.slim : null;
    },
    save(book, entries) {
      books = read_all(storage);
      const stored = { ...books[book] };
      for (const entry of entries) {
        stored[String(entry.uid)] = { hash: entry.hash, slim: entry.slim };
      }
      books = { ...books, [book]: stored };
      storage.setItem(STORAGE_KEY, JSON.stringify(books));
    },
    matching(book, current) {
      const result = new Map<number, string>();
      for (const [uid, hash] of current) {
        const entry = books[book]?.[String(uid)];
        if (entry !== undefined && entry.hash === hash) {
          result.set(uid, entry.slim);
        }
      }
      return result;
    },
  };
}
