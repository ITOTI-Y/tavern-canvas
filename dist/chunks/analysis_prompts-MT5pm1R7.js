import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { t } from "./user_guidance-Bx38WM6V.js";
import { i as n } from "./size_choice-BAuN1-V0.js";
//#region src/modules/illustration/analysis_prompts.ts
var r = /* @__PURE__ */ e({
	build_analysis_input: () => c,
	build_chosen_paragraphs_input: () => l,
	library_lines: () => i
});
function i(e) {
	if (e.characters.length === 0 && e.outfits.length === 0) return [];
	let t = new Map(e.characters.map((e) => [e.id, e.name]));
	return [
		"",
		"Characters and outfits below have stored appearance tags that are added automatically. For these characters, character tags hold only pose, action and expression, never hair, eyes, face, body or clothing, and never an outfit name; use exactly the name shown, not an alias.",
		...e.characters.map((e) => `- character: ${e.name}${e.aliases.length > 0 ? ` (also called ${e.aliases.join(", ")})` : ""}`),
		...e.outfits.map((e) => {
			let n = e.character_id === null ? void 0 : t.get(e.character_id);
			return `- outfit: ${e.name}${n === void 0 ? "" : ` (worn by ${n})`}`;
		})
	];
}
var a = [
	"- paragraph: the paragraph number",
	"- scene: one sentence describing what the picture shows",
	"- caption: one plain English sentence without commas that tells the image model who is where and doing what to whom, calling every character by their look, such as the pink-haired girl, never by name",
	"- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
	"- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character; and position: where the character is in the picture, x one of left, center-left, center, center-right, right and y one of top, middle, bottom, where bottom is nearer the viewer"
];
function o(e) {
	return [
		"Put everyone who takes part in the moment into the picture, so both sides of an exchange are visible: a character being tended, handed something or spoken to belongs in it too.",
		"In each character's tags include what they hold and the visible states the story has set up that still hold, such as wet hair, a bandaged arm, blood or torn clothing.",
		"Animals and creatures that take part in the moment are characters too: give each its own entry named by kind, such as wolf 1, with tags starting with other.",
		"For an action between two characters, put it in both entries with a prefix: source# for the one who acts and target# for the one acted on, or mutual# on both when they act on each other, such as source#hug and target#hug.",
		...e === null ? [] : [`"You" in the story is ${e}; when ${e} is visible, list them under that name.`]
	];
}
function s(e, r, s, c, l, u, d) {
	return [
		"[Inkwell illustration request]",
		e,
		...a,
		...n(d),
		...o(u),
		r,
		...i(c),
		...t(l),
		"",
		"Paragraphs:",
		...s.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
function c(e, t, n, r, i, a) {
	return s(`Read the latest reply below, split into numbered paragraphs. Choose at most ${String(t)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}. Use an empty array when nothing should be illustrated.", e, n, r, i, a);
}
function l(e, t, n, r, i, a) {
	return s(`Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${t.map((e) => `[${String(e)}]`).join(", ")}. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}.", e, n, r, i, a);
}
//#endregion
export { i as n, r as t };
