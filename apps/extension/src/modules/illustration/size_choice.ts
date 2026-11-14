import type { IllustrationSettings, ImageSize } from "@tavern-canvas/contracts";

/** The sizes of the set this chat uses: its own, else the default one; empty keeps the profile's. */
export function active_sizes(
  settings: IllustrationSettings,
  chat_id: string | null,
): readonly ImageSize[] {
  const own = chat_id === null ? undefined : settings.size_set_by_chat[chat_id];
  const id = own === undefined ? settings.size_set_id : own;
  return settings.size_sets.find((set) => set.id === id)?.sizes ?? [];
}

export function size_key(size: ImageSize): string {
  return `${String(size.width)}x${String(size.height)}`;
}

function shape(size: ImageSize): string {
  const ratio = size.width / size.height;
  if (ratio >= 1.15) {
    return `wide ${ratio.toFixed(2)}:1`;
  }
  return ratio <= 1 / 1.15 ? `tall 1:${(1 / ratio).toFixed(2)}` : "square";
}

/** The request line for a picture's canvas; with fewer than two sizes there is nothing to choose. */
export function size_field_lines(sizes: readonly ImageSize[]): readonly string[] {
  if (sizes.length < 2) {
    return [];
  }
  const choices = sizes.map((size) => `${size_key(size)} (${shape(size)})`).join(", ");
  return [
    `- size: the canvas for this picture, one of ${choices}. Choose it by composition: the widest canvas when three or more characters are spread from left to right, such as at left, center and right, and for a chase, a battle or a landscape; a wide canvas when two characters are side by side or face each other; tall for one figure seen in full, a fall or a climb, or a tall building; square for a close-up of faces or of one object. On a wide canvas spread the characters' x positions across it.`,
  ];
}

export function size_json_schema(sizes: readonly ImageSize[]): {
  readonly type: "string";
  readonly enum: readonly string[];
} {
  return { type: "string", enum: sizes.map(size_key) };
}

/** The size the model named, the only size of a one-size set, or `undefined`. */
export function chosen_size(key: unknown, sizes: readonly ImageSize[]): ImageSize | undefined {
  if (sizes.length === 1) {
    return sizes[0];
  }
  return sizes.find((size) => size_key(size) === key);
}
