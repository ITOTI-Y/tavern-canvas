/** A world book entry as the opening page shows and edits it; a regex key reads as `/source/flags`. */
export interface OpeningBookEntry {
  readonly uid: number;
  readonly name: string;
  readonly enabled: boolean;
  /** Always active; otherwise the entry fires on one of its keys. */
  readonly constant: boolean;
  readonly keys: readonly string[];
  readonly content: string;
  readonly order: number;
}

/** Where an entry is inserted and whether its text may activate other entries. */
export interface EntryPlacement {
  readonly position: "before_character_definition" | "after_character_definition" | "at_depth";
  /** Used with `at_depth`: how many messages from the end the entry goes. */
  readonly depth: number;
  /** The entry's text never activates other entries by recursion. */
  readonly prevent_outgoing: boolean;
}

/**
 * A new entry has no `uid`; an existing one keeps every field this type does not name. Without
 * `placement` the entry keeps the book's placement, or the host's default for a new one.
 */
export type OpeningEntryInput = Omit<OpeningBookEntry, "uid"> & {
  readonly uid?: number;
  readonly placement?: EntryPlacement;
};

export interface OpeningEntryChanges {
  readonly upsert: readonly OpeningEntryInput[];
  readonly remove: readonly number[];
}

/** The open chat's character card, read as background for a draft. */
export interface OpeningCharacter {
  readonly name: string;
  readonly description: string;
  readonly personality: string;
  readonly scenario: string;
  readonly first_message: string;
  /** The card's primary and additional world books. */
  readonly worldbooks: readonly string[];
}

/** The world book, preset and chat surface of JS-Slash-Runner the opening page writes through. */
export interface OpeningHost {
  list_worldbooks(): readonly string[];
  read_entries(book: string): Promise<readonly OpeningBookEntry[]>;
  /** Rejects when a book of that name exists. */
  create_worldbook(name: string): Promise<void>;
  save_entries(book: string, changes: OpeningEntryChanges): Promise<void>;
  delete_worldbook(name: string): Promise<void>;
  /** Copies the entries to a book of the new name, moves the chat binding along, and deletes the old book. */
  rename_worldbook(from: string, to: string): Promise<void>;
  /** `null` when no chat is open. */
  chat_name(): string | null;
  /** `null` without a single character's chat open, as in a group chat. */
  character(): OpeningCharacter | null;
  /** The book bound to the open chat; `null` when none is bound or no chat is open. */
  chat_worldbook(): string | null;
  bind_chat_worldbook(name: string): Promise<void>;
  preset_names(): readonly string[];
  proxy_preset_names(): readonly string[];
  /** Appends one message from `speaker` to the end of the open chat. */
  append_character_message(speaker: string, text: string): Promise<void>;
}
