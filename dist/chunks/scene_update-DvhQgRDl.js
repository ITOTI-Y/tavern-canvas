import { d as e, h as t, i as n, r, t as i } from "./schemas-DMBLWk59.js";
import { c as a, l as o, n as s, s as c } from "./wardrobe_library-CZLkOF9h.js";
import { a as l, c as u, i as d, l as f, s as p } from "./library_match-U5kHYoiF.js";
//#region src/modules/wardrobe/scene_update.ts
var m = {
	type: "array",
	items: { type: "string" }
};
function h(e) {
	return {
		type: "object",
		properties: Object.fromEntries(e.map((e) => [e, m])),
		required: [...e],
		additionalProperties: !1
	};
}
function g(e) {
	return { anyOf: [e, { type: "null" }] };
}
var _ = {
	name: "tavern_canvas_wardrobe",
	value: {
		type: "object",
		properties: { characters: {
			type: "array",
			items: {
				type: "object",
				properties: {
					ref: { type: ["string", "null"] },
					name: { type: "string" },
					new_character: g({
						type: "object",
						properties: {
							subject: {
								type: "string",
								enum: [
									"girl",
									"boy",
									"other"
								]
							},
							aliases: m,
							appearance: h(c)
						},
						required: [
							"subject",
							"aliases",
							"appearance"
						],
						additionalProperties: !1
					}),
					appearance_additions: g(h(c)),
					wearing_changed: { type: "boolean" },
					outfit_id: { type: ["string", "null"] },
					new_outfit: g({
						type: "object",
						properties: {
							name: { type: "string" },
							slots: h(a)
						},
						required: ["name", "slots"],
						additionalProperties: !1
					}),
					overrides: {
						type: "array",
						items: {
							type: "object",
							properties: {
								slot: {
									type: "string",
									enum: [...a]
								},
								tags: m,
								removed: { type: "boolean" }
							},
							required: [
								"slot",
								"tags",
								"removed"
							],
							additionalProperties: !1
						}
					},
					conditions: m
				},
				required: [
					"ref",
					"name",
					"new_character",
					"appearance_additions",
					"wearing_changed",
					"outfit_id",
					"new_outfit",
					"overrides",
					"conditions"
				],
				additionalProperties: !1
			}
		} },
		required: ["characters"],
		additionalProperties: !1
	}
}, v = r(t()).catch([]);
function y(t) {
	return e(Object.fromEntries(t.map((e) => [e, v.default([])])));
}
var b = e({
	ref: t().nullable().catch(null),
	name: t().trim().min(1).max(120),
	new_character: e({
		subject: i([
			"girl",
			"boy",
			"other"
		]).catch("other"),
		aliases: v.default([]),
		appearance: y(c).default({})
	}).nullable().catch(null),
	appearance_additions: y(c).nullable().catch(null),
	wearing_changed: n().catch(!1),
	outfit_id: t().nullable().catch(null),
	new_outfit: e({
		name: t().trim().min(1).max(120),
		slots: y(a)
	}).nullable().catch(null),
	overrides: r(e({
		slot: o,
		tags: v.default([]),
		removed: n()
	})).catch([]),
	conditions: v.default([])
}), x = e({ characters: r(b).max(32) }), S = class extends Error {
	constructor(e) {
		super(`The wardrobe reply contains no characters JSON object: ${e.slice(0, 200)}`), this.name = "SceneUpdateParseError";
	}
};
function C(e) {
	for (let t of f(e, "characters")) {
		let e;
		try {
			e = JSON.parse(t);
		} catch {
			continue;
		}
		let n = x.safeParse(e);
		if (n.success) return n.data.characters;
	}
	throw new S(e);
}
function w(e, t, n) {
	let r = p(e, t, n.outfits), i = n.outfits.find((e) => e.id === r.outfit_id), a = c.filter((t) => e.appearance[t].length === 0 && !e.locked_fields.includes(t));
	return [
		`- id ${e.id}: ${e.name}`,
		e.aliases.length > 0 ? `, also called ${e.aliases.join(" / ")}` : "",
		`; wears ${i === void 0 ? "nothing recorded" : `outfit ${i.id} (${i.name})`}`,
		`: ${s(u(r, n.outfits)) || "no tags"}`,
		a.length > 0 ? `; appearance slots still empty: ${a.join(", ")}` : ""
	].join("");
}
function T(e, t, n, r) {
	let i = new Map(r.characters.map((e) => [e.id, e.name]));
	return [
		"[Inkwell wardrobe update]",
		"Track what each named character wears across the story. Read the latest reply and return one entry for every named character who appears in it or is clearly present. Skip unnamed people.",
		"- ref: the id listed for this exact character below, or null for a named character not listed; never another character's id",
		"- name: the name as written in the story",
		"- new_character: only when ref is null: subject (girl, boy or other), aliases (other names used for them) and appearance tags per slot taken from what the story states; otherwise null",
		"- appearance_additions: for a known character, tags for the appearance slots listed as still empty, only when the reply states them; otherwise null",
		"- wearing_changed: true only when the reply changes what the character wears or their passing state; when false the other wearing fields are ignored",
		"- outfit_id: the known outfit now worn, or null with new_outfit filled for clothing that matches no known outfit",
		"- new_outfit: also fill it, even when wearing_changed is false, for a new character or one that wears nothing recorded, with the clothing the story or the character description gives them; otherwise null",
		"- overrides: slots of that outfit the reply changes, with the new tags, or removed true when taken off",
		"- conditions: the complete list of visible passing states of clothing or body now in effect, such as wet clothes, torn sleeve or messy hair; moods, actions and illness are not conditions; an empty list clears them",
		"All tags are visual Danbooru-style English tags for an anime image model. Leave a slot out, or give it an empty list, when the story does not state it; never write placeholders such as unknown or none. Appearance slots: age, body, skin, hair, eyes, makeup, expression, features (species traits such as pointy ears belong in features). Outfit slots: full_body, outerwear, top, bottom, legwear, footwear, headwear, accessories.",
		"Reply with only a JSON object of the form {\"characters\":[...]}. Use an empty array when no named character appears.",
		"",
		"Known characters:",
		...r.characters.length === 0 ? ["(none)"] : r.characters.map((e) => w(e, n, r)),
		"",
		"Known outfits:",
		...r.outfits.length === 0 ? ["(none)"] : r.outfits.map((e) => {
			let t = e.character_id === null ? null : i.get(e.character_id);
			return `- id ${e.id}: ${e.name}${t == null ? "" : ` (${t})`}: ${s(a.flatMap((t) => e.slots[t]))}`;
		}),
		"",
		...e === null ? [] : [
			"Latest user message:",
			e,
			""
		],
		"Latest reply:",
		t
	].join("\n");
}
var E = /* @__PURE__ */ new Set([
	"unknown",
	"none",
	"n/a",
	"null",
	"unspecified"
]);
function D(e) {
	return [...new Set(e.map((e) => e.trim()).filter((e) => e !== "" && !E.has(e.toLowerCase())))];
}
function O(e, t) {
	let n = {};
	for (let r of t) {
		let t = D(e?.[r] ?? []);
		t.length > 0 && (n[r] = t);
	}
	return n;
}
function k(e, t) {
	return [e.name, ...e.aliases].some((e) => d(t, e) && d(e, t));
}
function A(e, t) {
	let n = t.find((t) => t.id === e.ref);
	return n !== void 0 && k(n, e.name) ? n : t.find((t) => k(t, e.name));
}
function j(e, t, n, r) {
	let i = new Map(t.map((e) => [e.character_id, e])), o = [], s = [], u = [], d = (e) => n.outfits.some((t) => t.id === e) || s.some((t) => t.id === e);
	for (let t of e) {
		let e = A(t, n.characters), f;
		if (e !== void 0) {
			f = e.id;
			let n = c.filter((t) => e.appearance[t].length === 0 && !e.locked_fields.includes(t)), r = O(t.appearance_additions, n);
			Object.keys(r).length > 0 && u.push({
				character_id: f,
				slots: r
			});
		} else {
			let e = t.new_character ?? {
				subject: "other",
				aliases: [],
				appearance: t.appearance_additions ?? {}
			};
			f = r(), o.push({
				id: f,
				name: t.name,
				aliases: e.aliases.filter((e) => e.trim() !== t.name),
				subject: e.subject,
				appearance: O(e.appearance, c),
				default_outfit_id: null
			});
		}
		let p = i.get(f) ?? (e === void 0 ? {
			character_id: f,
			outfit_id: null,
			overrides: {},
			conditions: []
		} : l(e, n.outfits)), m = p.outfit_id === null && t.new_outfit !== null;
		if (!t.wearing_changed && !m) {
			i.set(f, p);
			continue;
		}
		let h = d(t.outfit_id) ? t.outfit_id : p.outfit_id;
		t.new_outfit !== null && (h = r(), s.push({
			id: h,
			name: t.new_outfit.name,
			character_id: f,
			slots: O(t.new_outfit.slots, a)
		}));
		let g = {};
		for (let e of t.overrides) g[e.slot] = e.removed ? "removed" : D(e.tags);
		i.set(f, {
			character_id: f,
			outfit_id: h,
			overrides: g,
			conditions: D(t.conditions)
		});
	}
	let f = new Map(s.map((e) => [e.character_id, e.id]));
	return {
		wearing: [...i.values()],
		new_characters: o.map((e) => ({
			...e,
			default_outfit_id: f.get(e.id) ?? null
		})),
		new_outfits: s,
		appearance_additions: u
	};
}
//#endregion
export { _ as SCENE_UPDATE_JSON_SCHEMA, S as SceneUpdateParseError, j as apply_scene_update, T as build_scene_update_input, C as parse_scene_update };
