import { d as e, g as t, r as n, u as r, v as i } from "./schemas-BjkyCQYG.js";
import { t as a } from "./model_json-BmZ6iNw3.js";
//#region src/modules/illustration/analysis.ts
var o = {
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
function s(e) {
	let t = o.value;
	return {
		name: o.name,
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
var c = "Answer both requests above in one JSON object of the form {\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}. This replaces the reply format each request states.";
function l(e) {
	for (let t of a(e, "illustrations")) try {
		let e = JSON.parse(t);
		if (typeof e.wardrobe == "object" && e.wardrobe !== null) return JSON.stringify(e.wardrobe);
	} catch {
		continue;
	}
	return null;
}
var u = e({
	paragraph: r().int().min(0),
	scene: t().trim().min(1).max(2e3),
	tags: i([t(), n(t()).transform((e) => e.join(", "))]),
	characters: n(e({
		name: t().trim().min(1).max(120),
		tags: t().trim()
	})).max(16)
}), d = e({ illustrations: n(u) }), f = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
};
function p(e, t, n) {
	for (let r of a(e, "illustrations")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = d.safeParse(e);
		if (!i.success) continue;
		let a = /* @__PURE__ */ new Set();
		return i.data.illustrations.filter((e) => e.paragraph >= t || a.has(e.paragraph) ? !1 : (a.add(e.paragraph), !0)).slice(0, n);
	}
	throw new f("The analysis reply contains no illustrations JSON object", e);
}
//#endregion
export { p as a, s as i, f as n, l as o, c as r, o as t };
