import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { t } from "./user_guidance-Bx38WM6V.js";
//#region src/modules/illustration/analysis_prompts.ts
var n = /* @__PURE__ */ e({
	build_analysis_input: () => s,
	build_chosen_paragraphs_input: () => c,
	library_lines: () => r
});
function r(e) {
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
var i = [
	"- paragraph: the paragraph number",
	"- scene: one sentence describing what the picture shows",
	"- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
	"- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character"
];
function a(e) {
	return [
		"Put everyone who takes part in the moment into the picture, so both sides of an exchange are visible: a character being tended, handed something or spoken to belongs in it too.",
		"In each character's tags include what they hold and the visible states the story has set up that still hold, such as wet hair, a bandaged arm, blood or torn clothing.",
		...e === null ? [] : [`"You" in the story is ${e}; when ${e} is visible, list them under that name.`]
	];
}
function o(e, n, o, s, c, l) {
	return [
		"[Inkwell illustration request]",
		e,
		...i,
		...a(l),
		n,
		...r(s),
		...t(c),
		"",
		"Paragraphs:",
		...o.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
function s(e, t, n, r, i) {
	return o(`Read the latest reply below, split into numbered paragraphs. Choose at most ${String(t)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}. Use an empty array when nothing should be illustrated.", e, n, r, i);
}
function c(e, t, n, r, i) {
	return o(`Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${t.map((e) => `[${String(e)}]`).join(", ")}. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}.", e, n, r, i);
}
//#endregion
export { r as n, n as t };
