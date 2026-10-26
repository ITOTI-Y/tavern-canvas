import { S as e, _ as t, b as n, g as r, l as i } from "./ids-DjWg1HG8.js";
//#region src/ui/experience/host_image_icon.ts
var a = "http://www.w3.org/2000/svg", o = [
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
function s(e) {
	let t = e.createElementNS(a, "svg");
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
	for (let [n, r] of o) {
		let i = e.createElementNS(a, n);
		for (let [e, t] of Object.entries(r)) i.setAttribute(e, t);
		t.append(i);
	}
	return t;
}
//#endregion
//#region src/modules/illustration/analysis.ts
var c = {
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
						items: { type: "string" }
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
function l(e, t) {
	return [
		"[TavernCanvas illustration request]",
		`Read the latest reply below, split into numbered paragraphs. Choose at most ${String(t)} paragraphs that would benefit most from an illustration: vivid, visually distinct moments. For each one give:`,
		"- paragraph: the paragraph number",
		"- scene: one sentence describing what the picture shows",
		"- tags: comma-separated Danbooru-style English tags for an anime image model (subject count such as 1girl, pose, action, expression, clothing, setting, lighting, composition); use a character name only when it is a well-known Danbooru character tag",
		"- characters: the names of the characters visible in the picture, exactly as written in the story",
		"Reply with only a JSON object of the form {\"illustrations\":[...]}. Use an empty array when nothing should be illustrated.",
		"",
		"Paragraphs:",
		...e.map((e) => `[${String(e.index)}] ${e.text}`)
	].join("\n");
}
var u = t({
	paragraph: r().int().min(0),
	scene: n().trim().min(1).max(2e3),
	tags: e([n(), i(n()).transform((e) => e.join(", "))]),
	characters: i(n().trim().min(1).max(120)).max(16).default([])
}), d = t({ illustrations: i(u) }), f = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
}, p = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu, m = /```(?:json)?\s*([\s\S]*?)```/giu;
function h(e) {
	for (let t = e.lastIndexOf("}"); t >= 0; t = e.lastIndexOf("}", t - 1)) {
		let n = 0;
		for (let r = t; r >= 0; --r) {
			let i = e[r];
			if (i === "}") n += 1;
			else if (i === "{" && (--n, n === 0)) {
				let n = e.slice(r, t + 1);
				if (n.includes("\"illustrations\"")) return n;
				break;
			}
		}
	}
	return null;
}
function g(e) {
	let t = e.replace(p, "").trim(), n = [...t.matchAll(m)].map((e) => (e[1] ?? "").trim()).reverse(), r = h(t);
	return [
		t,
		...n,
		...r === null ? [] : [r]
	];
}
function _(e, t, n) {
	for (let r of g(e)) {
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
export { s as a, _ as i, f as n, l as r, c as t };
