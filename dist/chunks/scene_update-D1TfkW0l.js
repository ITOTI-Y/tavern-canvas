import { d as e, g as t, i as n, m as r, r as i, t as a } from "./schemas-BjkyCQYG.js";
import { c as o, n as s, o as c, s as l } from "./wardrobe_library-BkM-wKPK.js";
import { a as u, c as d, l as f, o as p, t as m } from "./model_json-DnhzkPSG.js";
//#region src/modules/wardrobe/scene_update.ts
var h = {
	type: "array",
	items: { type: "string" }
};
function g(e) {
	return {
		type: "object",
		properties: Object.fromEntries(e.map((e) => [e, h])),
		required: [...e],
		additionalProperties: !1
	};
}
function _(e) {
	return { anyOf: [e, { type: "null" }] };
}
var v = {
	type: "object",
	properties: {
		name: { type: "string" },
		slots: g(l)
	},
	required: ["name", "slots"],
	additionalProperties: !1
}, y = {
	type: "array",
	items: {
		type: "object",
		properties: {
			ref: { type: ["string", "null"] },
			name: { type: "string" },
			new_character: _({
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
					aliases: h,
					appearance: g(c),
					outfit: v
				},
				required: [
					"subject",
					"aliases",
					"appearance",
					"outfit"
				],
				additionalProperties: !1
			}),
			appearance_additions: _(g(c)),
			subject: {
				type: ["string", "null"],
				enum: [
					"girl",
					"boy",
					null
				]
			},
			wearing_changed: { type: "boolean" },
			outfit_id: { type: ["string", "null"] },
			new_outfit: _(v),
			overrides: {
				type: "array",
				items: {
					type: "object",
					properties: {
						slot: {
							type: "string",
							enum: [...l]
						},
						tags: h,
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
			conditions: h
		},
		required: [
			"ref",
			"name",
			"new_character",
			"appearance_additions",
			"subject",
			"wearing_changed",
			"outfit_id",
			"new_outfit",
			"overrides",
			"conditions"
		],
		additionalProperties: !1
	}
};
function b(e) {
	return {
		name: "tavern_canvas_wardrobe",
		value: {
			type: "object",
			properties: {
				characters: y,
				initial_outfits: {
					type: "object",
					properties: Object.fromEntries(e.map((e) => [e, v])),
					required: [...e],
					additionalProperties: !1
				}
			},
			required: ["characters", "initial_outfits"],
			additionalProperties: !1
		}
	};
}
var x = i(t()).catch([]);
function S(t) {
	return e(Object.fromEntries(t.map((e) => [e, x.default([])])));
}
var C = e({
	name: t().trim().min(1).max(120),
	slots: S(l)
}), w = e({
	ref: t().nullable().catch(null),
	name: t().trim().min(1).max(120),
	new_character: e({
		subject: a([
			"girl",
			"boy",
			"other"
		]).catch("other"),
		aliases: x.default([]),
		appearance: S(c).default({}),
		outfit: C.nullable().catch(null)
	}).nullable().catch(null),
	appearance_additions: S(c).nullable().catch(null),
	subject: a(["girl", "boy"]).nullable().catch(null),
	wearing_changed: n().catch(!1),
	outfit_id: t().nullable().catch(null),
	new_outfit: C.nullable().catch(null),
	overrides: i(e({
		slot: o,
		tags: x.default([]),
		removed: n()
	})).catch([]),
	conditions: x.default([])
}), T = e({
	characters: i(w).max(32),
	initial_outfits: r(t(), C.nullable().catch(null)).catch({})
}), E = class extends Error {
	constructor(e) {
		super(`The wardrobe reply contains no characters JSON object: ${e.slice(0, 200)}`), this.name = "SceneUpdateParseError";
	}
};
function D(e) {
	for (let t of m(e, "characters")) {
		let e;
		try {
			e = JSON.parse(t);
		} catch {
			continue;
		}
		let n = T.safeParse(e);
		if (n.success) return n.data;
	}
	throw new E(e);
}
function O(e, t, n) {
	let r = d(e, t, n.outfits), i = n.outfits.find((e) => e.id === r.outfit_id), a = c.filter((t) => e.appearance[t].length === 0 && !e.locked_fields.includes(t));
	return [
		`- id ${e.id}: ${e.name}`,
		e.aliases.length > 0 ? `, also called ${e.aliases.join(" / ")}` : "",
		i === void 0 ? "; outfit not yet known" : `; wears outfit ${i.id} (${i.name}): ${s(f(r, n.outfits))}`,
		a.length > 0 ? `; appearance slots still empty: ${a.join(", ")}` : "",
		e.subject === "other" ? "; subject not yet known" : ""
	].join("");
}
function k(e, t, n) {
	return n.characters.filter((r) => d(r, t, n.outfits).outfit_id === null && [r.name, ...r.aliases].some((t) => u(e, t)));
}
function A(e, t, n, r) {
	let i = new Map(r.characters.map((e) => [e.id, e.name])), a = k(t, n, r);
	return [
		"[Inkwell wardrobe update]",
		"Track what each named character wears across the story. Read the latest reply and return one entry for every named character who appears in it or is clearly present. Skip unnamed people.",
		"- ref: the id listed for this exact character below, also when the story uses a shorter or fuller form of the listed name, or null for a named character not listed; never another character's id",
		"- name: the name as written in the story",
		"- new_character: only when ref is null: subject (see Subject), aliases (other names used for them), appearance tags per slot taken from what the story states, and outfit: what they wear now (see Outfit choice); otherwise null",
		"- appearance_additions: for a known character, tags for the appearance slots listed as still empty, only when the reply states them; otherwise null",
		"- subject: for a known character whose subject is not yet known, girl or boy when the story shows it; otherwise null",
		"Subject: girl for a woman or girl, boy for a man or boy, judged from pronouns such as 他 / 她 or he / she, how others address them, the name and the description. other only for a character without a gender, such as a creature or a machine.",
		"- wearing_changed: true only when the reply changes what the character wears or their passing state; describing clothing they already wear is no change; when false the other wearing fields are ignored",
		"- outfit_id: the known outfit now worn, chosen whenever the clothing broadly matches one of this character's outfits, with overrides for the parts that differ; null with new_outfit filled only for clothing unlike every known outfit",
		"- overrides: slots of that outfit the reply changes, with the new tags, or removed true when taken off",
		"- conditions: the complete list of visible passing states of clothing or body now in effect, such as wet clothes, torn sleeve or messy hair; moods, actions and illness are not conditions; an empty list clears them",
		"All tags are visual Danbooru-style English tags for an anime image model. Leave a slot out, or give it an empty list, when the story does not state it; never write placeholders such as unknown or none. Appearance slots: age, body, skin, hair, eyes, makeup, expression, features (species traits such as pointy ears belong in features). Outfit slots: full_body, outerwear, top, bottom, legwear, footwear, headwear, accessories.",
		"initial_outfits: one entry per id listed under Outfits needed, giving what that character wears now (see Outfit choice); an empty object when none are listed.",
		"Outfit choice: take the clothing from the story, else from the character description; when neither states it, choose plausible clothing for the character's role, the setting and the era. Fill at least the top and bottom, or full_body, and give the outfit a short descriptive name.",
		"Reply with only a JSON object of the form {\"characters\":[...],\"initial_outfits\":{...}}. Use an empty array when no named character appears.",
		"",
		...a.length === 0 ? [] : [
			"Outfits needed (decide each one now; empty slots are not an answer):",
			...a.map((e) => `- id ${e.id}: ${e.name}`),
			""
		],
		"Known characters:",
		...r.characters.length === 0 ? ["(none)"] : r.characters.map((e) => O(e, n, r)),
		"",
		"Known outfits:",
		...r.outfits.length === 0 ? ["(none)"] : r.outfits.map((e) => {
			let t = e.character_id === null ? null : i.get(e.character_id);
			return `- id ${e.id}: ${e.name}${t == null ? "" : ` (${t})`}: ${s(l.flatMap((t) => e.slots[t]))}`;
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
var j = /* @__PURE__ */ new Set([
	"unknown",
	"none",
	"n/a",
	"null",
	"unspecified"
]);
function M(e) {
	return [...new Set(e.map((e) => e.trim()).filter((e) => e !== "" && !j.has(e.toLowerCase())))];
}
function N(e, t) {
	let n = {};
	for (let r of t) {
		let t = M(e?.[r] ?? []);
		t.length > 0 && (n[r] = t);
	}
	return n;
}
function P(e, t) {
	return [e.name, ...e.aliases].some((e) => u(t, e) && u(e, t));
}
function F(e, t) {
	return [e.name, ...e.aliases].some((e) => u(t, e) || u(e, t));
}
function I(e, t) {
	let n = t.find((t) => t.id === e.ref);
	return n !== void 0 && F(n, e.name) ? n : t.find((t) => P(t, e.name));
}
function L(e) {
	return l.map((t) => [...new Set((e[t] ?? []).map((e) => e.toLowerCase()))].sort().join(",")).join("|");
}
function R(e, t, n, r) {
	let i = new Map(t.map((e) => [e.character_id, e])), a = [], o = [], s = [], u = (e) => n.outfits.some((t) => t.id === e) || o.some((t) => t.id === e), d = (e, t) => {
		let i = N(e.slots, l);
		if (Object.keys(i).length === 0) return null;
		let a = L(i), s = [...n.outfits, ...o].find((e) => e.character_id === t && L(e.slots) === a);
		if (s !== void 0) return s.id;
		let c = r();
		return o.push({
			id: c,
			name: e.name,
			character_id: t,
			slots: i
		}), c;
	};
	for (let t of e.characters) {
		let e = I(t, n.characters), o;
		if (e !== void 0) {
			o = e.id;
			let n = c.filter((t) => e.appearance[t].length === 0 && !e.locked_fields.includes(t)), r = N(t.appearance_additions, n), i = e.subject === "other" ? t.subject : null;
			(Object.keys(r).length > 0 || i !== null) && s.push({
				character_id: o,
				slots: r,
				subject: i
			});
		} else {
			let e = t.new_character ?? {
				subject: "other",
				aliases: [],
				appearance: t.appearance_additions ?? {}
			};
			o = r(), a.push({
				id: o,
				name: t.name,
				aliases: e.aliases.filter((e) => e.trim() !== t.name),
				subject: e.subject,
				appearance: N(e.appearance, c),
				default_outfit_id: null
			});
		}
		let l = i.get(o) ?? (e === void 0 ? {
			character_id: o,
			outfit_id: null,
			overrides: {},
			conditions: []
		} : p(e, n.outfits)), f = l.outfit_id === null ? t.new_outfit ?? t.new_character?.outfit ?? null : null;
		if (!t.wearing_changed) {
			let e = f === null ? null : d(f, o);
			i.set(o, e === null ? l : {
				...l,
				outfit_id: e
			});
			continue;
		}
		let m = u(t.outfit_id) ? t.outfit_id : l.outfit_id, h = e !== void 0 && !i.has(o) && l.outfit_id !== null ? null : t.new_outfit ?? f;
		h !== null && (m = d(h, o) ?? m);
		let g = {};
		for (let e of t.overrides) g[e.slot] = e.removed ? "removed" : M(e.tags);
		i.set(o, {
			character_id: o,
			outfit_id: m,
			overrides: g,
			conditions: M(t.conditions)
		});
	}
	for (let [t, r] of Object.entries(e.initial_outfits)) {
		let e = n.characters.find((e) => e.id === t);
		if (e === void 0 || r === null) continue;
		let a = i.get(t) ?? p(e, n.outfits), o = a.outfit_id === null ? d(r, t) : null;
		o !== null && i.set(t, {
			...a,
			outfit_id: o
		});
	}
	let f = new Map(o.map((e) => [e.character_id, e.id]));
	return {
		wearing: [...i.values()],
		new_characters: a.map((e) => ({
			...e,
			default_outfit_id: f.get(e.id) ?? null
		})),
		new_outfits: o,
		appearance_additions: s
	};
}
//#endregion
export { C as OutfitSchema, E as SceneUpdateParseError, R as apply_scene_update, A as build_scene_update_input, k as characters_needing_outfit, N as clean_slots, D as parse_scene_update, b as scene_update_json_schema, S as slot_record, g as slots_schema };
