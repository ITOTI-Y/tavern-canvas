import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o } from "./schemas-BjkyCQYG.js";
import { c as s, d as c, i as l, n as u } from "./analysis-CvO6PasH.js";
import { t as d } from "./model_json-DnhzkPSG.js";
import { o as f, t as p } from "./proposal_slots-ufEAgMTk.js";
//#region src/modules/creation/creation_planning.ts
var m = /* @__PURE__ */ e({
	FRAME_SIZES: () => h,
	SCENE_JSON_SCHEMA: () => g,
	build_scene_input: () => v,
	parse_scene_output: () => x,
	scene_generation_input: () => T,
	scenes_from_plans: () => C,
	strip_paragraphs: () => S
}), h = {
	portrait: {
		width: 832,
		height: 1216
	},
	landscape: {
		width: 1216,
		height: 832
	},
	square: {
		width: 1024,
		height: 1024
	}
}, g = {
	name: "tavern_canvas_scenes",
	value: {
		type: "object",
		properties: { scenes: {
			type: "array",
			items: {
				type: "object",
				properties: {
					paragraph: { type: "integer" },
					scene: { type: "string" },
					frame: {
						type: "string",
						enum: [
							"portrait",
							"landscape",
							"square"
						]
					},
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
					"frame",
					"tags",
					"characters"
				],
				additionalProperties: !1
			}
		} },
		required: ["scenes"],
		additionalProperties: !1
	}
}, _ = "- frame: portrait for one figure or a close-up, landscape for a wide shot, a place or several figures side by side, square otherwise";
function v(e, t, n, r, i) {
	let a = e === "story" ? `Read the story below, split into numbered paragraphs. Choose at most ${String(n)} moments that would make the strongest pictures, in story order. For each one give:` : `Read the chat messages below, split into numbered paragraphs. Retell them as a comic strip of at most ${String(n)} panels, in the order the events happen; several panels may come from one paragraph. A panel is a single picture with no lettering: no speech bubbles, captions or sound effects. For each panel give:`;
	return [
		e === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
		a,
		...l,
		_,
		"Reply with only a JSON object of the form {\"scenes\":[...]}.",
		...s(r.library),
		...c(i),
		"",
		"Paragraphs:",
		...t.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var y = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	frame: i([
		"portrait",
		"landscape",
		"square"
	]).catch("square"),
	tags: o([n(), r(n()).transform((e) => e.join(", "))]),
	characters: r(t({
		name: n().trim().min(1).max(120),
		tags: n().trim()
	})).max(16)
}), b = t({ scenes: r(y) });
function x(e, t, n) {
	for (let r of d(e, "scenes")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = b.safeParse(e);
		if (i.success) return i.data.scenes.filter((e) => e.paragraph < t).slice(0, n);
	}
	throw new u("The reply contains no scenes JSON object", e);
}
function S(e) {
	let t = [];
	for (let n of e) for (let e of f(n.text)) t.push({
		index: t.length,
		text: `${n.name}: ${e.text}`,
		line: e.line
	});
	return t;
}
function C(e, t, n, r, i) {
	return p(e, t, n, r, i).map((e, n) => ({
		id: e.slot_id,
		enabled: !0,
		scene: e.scene,
		excerpt: e.anchor.slice(0, 200),
		characters: e.characters,
		size: h[t[n]?.frame ?? "square"],
		positive_prompt: e.positive_prompt,
		negative_prompt: e.negative_prompt,
		character_prompts: e.character_prompts,
		image_ids: [],
		active_image_id: null,
		last_error: null
	}));
}
function w(...e) {
	return e.map((e) => e.trim().replace(/^,+|,+$/gu, "").trim()).filter((e) => e !== "").join(", ");
}
function T(e, t) {
	return {
		positive_prompt: t?.style === "strip" ? w(e.positive_prompt, t.settings.style_tags) : e.positive_prompt,
		negative_prompt: t === null ? e.negative_prompt : w(e.negative_prompt, t.settings.no_text_tags),
		character_prompts: e.character_prompts,
		size: e.size
	};
}
//#endregion
export { m as n, T as r, h as t };
