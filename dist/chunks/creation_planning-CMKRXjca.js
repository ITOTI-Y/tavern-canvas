import { d as e, g as t, r as n, t as r, u as i, v as a } from "./schemas-BjkyCQYG.js";
import { c as o, d as s, i as c, n as l } from "./analysis-CvO6PasH.js";
import { t as u } from "./model_json-DnhzkPSG.js";
import { o as d, t as f } from "./proposal_slots-ufEAgMTk.js";
//#region src/modules/creation/creation_planning.ts
var p = {
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
}, m = {
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
}, h = "- frame: portrait for one figure or a close-up, landscape for a wide shot, a place or several figures side by side, square otherwise";
function g(e, t, n, r, i) {
	let a = e === "story" ? `Read the story below, split into numbered paragraphs. Choose at most ${String(n)} moments that would make the strongest pictures, in story order. For each one give:` : `Read the chat messages below, split into numbered paragraphs. Retell them as a comic strip of at most ${String(n)} panels, in the order the events happen; several panels may come from one paragraph. A panel is a single picture with no lettering: no speech bubbles, captions or sound effects. For each panel give:`;
	return [
		e === "story" ? "[Inkwell scene request]" : "[Inkwell comic strip request]",
		a,
		...c,
		h,
		"Reply with only a JSON object of the form {\"scenes\":[...]}.",
		...o(r.library),
		...s(i),
		"",
		"Paragraphs:",
		...t.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var _ = e({
	paragraph: i().int().min(0),
	scene: t().trim().min(1).max(2e3),
	frame: r([
		"portrait",
		"landscape",
		"square"
	]).catch("square"),
	tags: a([t(), n(t()).transform((e) => e.join(", "))]),
	characters: n(e({
		name: t().trim().min(1).max(120),
		tags: t().trim()
	})).max(16)
}), v = e({ scenes: n(_) });
function y(e, t, n) {
	for (let r of u(e, "scenes")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = v.safeParse(e);
		if (i.success) return i.data.scenes.filter((e) => e.paragraph < t).slice(0, n);
	}
	throw new l("The reply contains no scenes JSON object", e);
}
function b(e) {
	let t = [];
	for (let n of e) for (let e of d(n.text)) t.push({
		index: t.length,
		text: `${n.name}: ${e.text}`,
		line: e.line
	});
	return t;
}
function x(e, t, n, r, i) {
	return f(e, t, n, r, i).map((e, n) => ({
		id: e.slot_id,
		enabled: !0,
		scene: e.scene,
		excerpt: e.anchor.slice(0, 200),
		characters: e.characters,
		size: p[t[n]?.frame ?? "square"],
		positive_prompt: e.positive_prompt,
		negative_prompt: e.negative_prompt,
		character_prompts: e.character_prompts,
		image_ids: [],
		active_image_id: null,
		last_error: null
	}));
}
//#endregion
export { m as SCENE_JSON_SCHEMA, g as build_scene_input, y as parse_scene_output, x as scenes_from_plans, b as strip_paragraphs };
