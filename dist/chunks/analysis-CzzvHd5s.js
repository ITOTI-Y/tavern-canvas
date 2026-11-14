import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { d as t, g as n, r, t as i, u as a, v as o } from "./schemas-BjkyCQYG.js";
import { t as s } from "./analysis_error-a25bWfWj.js";
import { t as c } from "./model_json-B2EVqBvs.js";
//#region src/modules/illustration/analysis.ts
var l = /* @__PURE__ */ e({
	ANALYSIS_JSON_SCHEMA: () => h,
	COMBINED_REPLY_FORMAT: () => _,
	POSITION_JSON_SCHEMA: () => f,
	PositionSchema: () => p,
	center_of: () => m,
	combined_analysis_json_schema: () => g,
	parse_analysis_output: () => x,
	wardrobe_reply_of: () => v
}), u = {
	left: .1,
	"center-left": .3,
	center: .5,
	"center-right": .7,
	right: .9
}, d = {
	top: .3,
	middle: .5,
	bottom: .7
}, f = {
	type: "object",
	properties: {
		x: {
			type: "string",
			enum: Object.keys(u)
		},
		y: {
			type: "string",
			enum: Object.keys(d)
		}
	},
	required: ["x", "y"],
	additionalProperties: !1
}, p = t({
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
function m(e) {
	return e === null ? {} : { center: {
		x: u[e.x],
		y: d[e.y]
	} };
}
var h = {
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
								position: f
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
function g(e) {
	let t = h.value;
	return {
		name: h.name,
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
var _ = "Answer both requests above in one JSON object of the form {\"illustrations\":[...],\"wardrobe\":{\"characters\":[...],\"initial_outfits\":{...}}}. This replaces the reply format each request states.";
function v(e) {
	for (let t of c(e, "illustrations")) try {
		let e = JSON.parse(t);
		if (typeof e.wardrobe == "object" && e.wardrobe !== null) return JSON.stringify(e.wardrobe);
	} catch {
		continue;
	}
	return null;
}
var y = t({
	paragraph: a().int().min(0),
	scene: n().trim().min(1).max(2e3),
	caption: n().trim().max(600).catch(""),
	tags: o([n(), r(n()).transform((e) => e.join(", "))]),
	characters: r(t({
		name: n().trim().min(1).max(120),
		tags: n().trim(),
		position: p
	})).max(16)
}).transform(({ characters: e, ...t }) => ({
	...t,
	characters: e.map(({ position: e, ...t }) => ({
		...t,
		...m(e)
	}))
})), b = t({ illustrations: r(y) });
function x(e, t, n) {
	for (let r of c(e, "illustrations")) {
		let e;
		try {
			e = JSON.parse(r);
		} catch {
			continue;
		}
		let i = b.safeParse(e);
		if (!i.success) continue;
		let a = /* @__PURE__ */ new Set();
		return i.data.illustrations.filter((e) => e.paragraph >= t || a.has(e.paragraph) ? !1 : (a.add(e.paragraph), !0)).slice(0, n);
	}
	throw new s("The analysis reply contains no illustrations JSON object", e);
}
//#endregion
export { m as i, p as n, l as r, f as t };
