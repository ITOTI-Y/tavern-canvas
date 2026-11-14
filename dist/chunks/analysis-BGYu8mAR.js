import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o, y as s } from "./schemas-BjkyCQYG.js";
import { t as c } from "./analysis_error-a25bWfWj.js";
import { t as l } from "./model_json-B2EVqBvs.js";
import { a as u, n as d } from "./size_choice-BAuN1-V0.js";
//#region src/modules/illustration/analysis.ts
var f = /* @__PURE__ */ e({
	ANALYSIS_JSON_SCHEMA: () => v,
	COMBINED_REPLY_FORMAT: () => x,
	POSITION_JSON_SCHEMA: () => h,
	PositionSchema: () => g,
	analysis_json_schema: () => y,
	center_of: () => _,
	combined_analysis_json_schema: () => b,
	parse_analysis_output: () => T,
	wardrobe_reply_of: () => S
}), p = {
	left: .1,
	"center-left": .3,
	center: .5,
	"center-right": .7,
	right: .9
}, m = {
	top: .3,
	middle: .5,
	bottom: .7
}, h = {
	type: "object",
	properties: {
		x: {
			type: "string",
			enum: Object.keys(p)
		},
		y: {
			type: "string",
			enum: Object.keys(m)
		}
	},
	required: ["x", "y"],
	additionalProperties: !1
}, g = t({
	x: i([
		"left",
		"center-left",
		"center",
		"center-right",
		"right"
	]),
	y: i([
		"top",
		"middle",
		"bottom"
	])
}).nullable().catch(null);
function _(e) {
	return e === null ? {} : { center: {
		x: p[e.x],
		y: m[e.y]
	} };
}
var v = {
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
					caption: { type: "string" },
					tags: { type: "string" },
					characters: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: { type: "string" },
								tags: { type: "string" },
								position: h
							},
							required: [
								"name",
								"tags",
								"position"
							],
							additionalProperties: !1
						}
					}
				},
				required: [
					"paragraph",
					"scene",
					"caption",
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
function y(e) {
	if (e.length < 2) return v;
	let t = v.value, n = t.properties.illustrations;
	return {
		name: v.name,
		value: {
			...t,
			properties: { illustrations: {
				...n,
				items: {
					...n.items,
					properties: {
						...n.items.properties,
						size: u(e)
					},
					required: [...n.items.required, "size"]
				}
			} }
		}
	};
}
function b(e, t = v) {
	let n = t.value;
	return {
		name: t.name,
		value: {
			type: "object",
			properties: {
				...n.properties,
				wardrobe: e.value
			},
			required: ["illustrations", "wardrobe"],
			additionalProperties: !1
		}
	};
}
var x = "Answer both requests above in one JSON object of the form {\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}. This replaces the reply format each request states.";
function S(e) {
	for (let t of l(e, "illustrations")) try {
		let e = JSON.parse(t);
		if (typeof e.wardrobe == "object" && e.wardrobe !== null) return JSON.stringify(e.wardrobe);
	} catch {
		continue;
	}
	return null;
}
var C = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	caption: n().trim().max(600).catch(""),
	tags: o([n(), r(n()).transform((e) => e.join(", "))]),
	characters: r(t({
		name: n().trim().min(1).max(120),
		tags: n().trim(),
		position: g
	})).max(16),
	size: s().optional()
}).transform(({ characters: e, ...t }) => ({
	...t,
	characters: e.map(({ position: e, ...t }) => ({
		...t,
		..._(e)
	}))
})), w = t({ illustrations: r(C) });
function T(e, t, n, r = []) {
	for (let i of l(e, "illustrations")) {
		let e;
		try {
			e = JSON.parse(i);
		} catch {
			continue;
		}
		let a = w.safeParse(e);
		if (!a.success) continue;
		let o = /* @__PURE__ */ new Set();
		return a.data.illustrations.filter((e) => e.paragraph >= t || o.has(e.paragraph) ? !1 : (o.add(e.paragraph), !0)).slice(0, n).map(({ size: e, ...t }) => {
			let n = d(e, r);
			return n === void 0 ? t : {
				...t,
				size: n
			};
		});
	}
	throw new c("The analysis reply contains no illustrations JSON object", e);
}
//#endregion
export { _ as i, g as n, f as r, h as t };
