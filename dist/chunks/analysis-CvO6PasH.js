import { d as e, g as t, r as n, u as r, v as i } from "./schemas-BjkyCQYG.js";
import { t as a } from "./model_json-DnhzkPSG.js";
//#region src/modules/illustration/user_guidance.ts
function o(e) {
	let t = e.trim();
	return t === "" ? [] : [
		"",
		"User guidance (follow it wherever the story leaves room; what the story states still wins):",
		t
	];
}
//#endregion
//#region src/modules/illustration/analysis.ts
var s = {
	name: "tavern_canvas_illustrations",
	value: {
		type: "object",
		properties: { illustrations: {
			type: "array",
			items: {
				type: "object",
				properties: {
					paragraph: { type: "integer" },
					scene: { type: "string" },
					tags: { type: "string" },
					characters: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: { type: "string" },
								tags: { type: "string" }
							},
							required: ["name", "tags"],
							additionalProperties: !1
						}
					}
				},
				required: [
					"paragraph",
					"scene",
					"tags",
					"characters"
				],
				additionalProperties: !1
			}
		} },
		required: ["illustrations"],
		additionalProperties: !1
	}
};
function c(e) {
	let t = s.value;
	return {
		name: s.name,
		value: {
			type: "object",
			properties: {
				...t.properties,
				wardrobe: e.value
			},
			required: ["illustrations", "wardrobe"],
			additionalProperties: !1
		}
	};
}
var l = "Answer both requests above in one JSON object of the form {\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}. This replaces the reply format each request states.";
function u(e) {
	for (let t of a(e, "illustrations")) try {
		let e = JSON.parse(t);
		if (typeof e.wardrobe == "object" && e.wardrobe !== null) return JSON.stringify(e.wardrobe);
	} catch {
		continue;
	}
	return null;
}
function d(e) {
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
var f = [
	"- paragraph: the paragraph number",
	"- scene: one sentence describing what the picture shows",
	"- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
	"- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character"
];
function p(e, t, n, r, i) {
	return [
		"[Inkwell illustration request]",
		e,
		...f,
		t,
		...d(r),
		...o(i),
		"",
		"Paragraphs:",
		...n.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
function m(e, t, n, r) {
	return p(`Read the latest reply below, split into numbered paragraphs. Choose at most ${String(t)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}. Use an empty array when nothing should be illustrated.", e, n, r);
}
function h(e, t, n, r) {
	return p(`Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${t.map((e) => `[${String(e)}]`).join(", ")}. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}.", e, n, r);
}
var g = e({
	paragraph: r().int().min(0),
	scene: t().trim().min(1).max(2e3),
	tags: i([t(), n(t()).transform((e) => e.join(", "))]),
	characters: n(e({
		name: t().trim().min(1).max(120),
		tags: t().trim()
	})).max(16)
}), _ = e({ illustrations: n(g) }), v = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
};
function y(e, t, n) {
	for (let r of a(e, "illustrations")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = _.safeParse(e);
		if (!i.success) continue;
		let a = /* @__PURE__ */ new Set();
		return i.data.illustrations.filter((e) => e.paragraph >= t || a.has(e.paragraph) ? !1 : (a.add(e.paragraph), !0)).slice(0, n);
	}
	throw new v("The analysis reply contains no illustrations JSON object", e);
}
//#endregion
export { m as a, d as c, o as d, f as i, y as l, v as n, h as o, l as r, c as s, s as t, u };
