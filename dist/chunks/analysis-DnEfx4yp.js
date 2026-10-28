import { _ as e, d as t, h as n, r, u as i } from "./schemas-DMBLWk59.js";
import { n as a } from "./provider-B-m_0o6I.js";
import { t as o } from "./model_json-DNK3Va6h.js";
//#region src/ui/experience/host_image_icon.ts
var s = "http://www.w3.org/2000/svg", c = [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2"
	}],
	["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
];
function l(e) {
	let t = e.createElementNS(s, "svg");
	for (let [e, n] of Object.entries({
		viewBox: "0 0 24 24",
		width: "1em",
		height: "1em",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": "2",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true"
	})) t.setAttribute(e, n);
	for (let [n, r] of c) {
		let i = e.createElementNS(s, n);
		for (let [e, t] of Object.entries(r)) i.setAttribute(e, t);
		t.append(i);
	}
	return t;
}
//#endregion
//#region src/ui/chat/slot_error_label.ts
function u(e, t) {
	let n = a.safeParse(t);
	if (!n.success) return t;
	switch (n.data) {
		case "auth_failed": return e("chat.errors.auth_failed");
		case "rate_limited": return e("chat.errors.rate_limited");
		case "content_blocked": return e("chat.errors.content_blocked");
		case "invalid_request": return e("chat.errors.invalid_request");
		case "provider_unavailable": return e("chat.errors.provider_unavailable");
		case "timed_out": return e("chat.errors.timed_out");
		case "cancelled": return e("chat.errors.cancelled");
		case "malformed_response": return e("chat.errors.malformed_response");
		case "not_configured": return e("chat.errors.not_configured");
		case "storage_failed": return e("chat.errors.storage_failed");
		case "interrupted": return e("chat.errors.interrupted");
	}
}
//#endregion
//#region src/modules/illustration/user_guidance.ts
function d(e) {
	let t = e.trim();
	return t === "" ? [] : [
		"",
		"User guidance (follow it wherever the story leaves room; what the story states still wins):",
		t
	];
}
//#endregion
//#region src/modules/illustration/analysis.ts
var f = {
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
function p(e) {
	let t = f.value;
	return {
		name: f.name,
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
var m = "Answer both requests above in one JSON object of the form {\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}. This replaces the reply format each request states.";
function h(e) {
	for (let t of o(e, "illustrations")) try {
		let e = JSON.parse(t);
		if (typeof e.wardrobe == "object" && e.wardrobe !== null) return JSON.stringify(e.wardrobe);
	} catch {
		continue;
	}
	return null;
}
function g(e) {
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
function _(e, t, n, r, i) {
	return [
		"[Inkwell illustration request]",
		e,
		"- paragraph: the paragraph number",
		"- scene: one sentence describing what the picture shows",
		"- tags: comma-separated Danbooru-style English tags for an anime image model describing what the characters share: setting, background, lighting, composition. When nobody is visible, describe the whole picture here",
		"- characters: one entry per character visible in the picture, with name exactly as written in the story and tags: that character's own Danbooru-style tags starting with girl or boy by the character's gender as the story shows it (other only for a creature or machine without one; no numbers), then appearance, clothing, pose, action and expression; use a character name tag only when it is a well-known Danbooru character",
		t,
		...g(r),
		...d(i),
		"",
		"Paragraphs:",
		...n.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
function v(e, t, n, r) {
	return _(`Read the latest reply below, split into numbered paragraphs. Choose at most ${String(t)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}. Use an empty array when nothing should be illustrated.", e, n, r);
}
function y(e, t, n, r) {
	return _(`Read the latest reply below, split into numbered paragraphs. Illustrate exactly these paragraphs, one entry each: ${t.map((e) => `[${String(e)}]`).join(", ")}. For each one give:`, "Reply with only a JSON object of the form {\"illustrations\":[...]}.", e, n, r);
}
var b = t({
	paragraph: i().int().min(0),
	scene: n().trim().min(1).max(2e3),
	tags: e([n(), r(n()).transform((e) => e.join(", "))]),
	characters: r(t({
		name: n().trim().min(1).max(120),
		tags: n().trim()
	})).max(16)
}), x = t({ illustrations: r(b) }), S = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
};
function C(e, t, n) {
	for (let r of o(e, "illustrations")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = x.safeParse(e);
		if (!i.success) continue;
		let a = /* @__PURE__ */ new Set();
		return i.data.illustrations.filter((e) => e.paragraph >= t || a.has(e.paragraph) ? !1 : (a.add(e.paragraph), !0)).slice(0, n);
	}
	throw new S("The analysis reply contains no illustrations JSON object", e);
}
//#endregion
export { y as a, h as c, l as d, v as i, d as l, S as n, p as o, m as r, C as s, f as t, u };
