/** Lines appended to an analysis or wardrobe request; none when the user gave no guidance. */
export function guidance_lines(guidance: string): readonly string[] {
  const text = guidance.trim();
  return text === ""
    ? []
    : [
        "",
        "User guidance (follow it wherever the story leaves room; what the story states still wins):",
        text,
      ];
}
