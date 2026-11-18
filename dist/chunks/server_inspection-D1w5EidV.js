import { h as e, i as t, r as n, u as r } from "./schemas-BjkyCQYG.js";
import { a as i } from "./ids-pPJWL4BL.js";
import { i as a, o, r as s, t as c } from "./novelai-CAMu2SDf.js";
import { i as l } from "./settings-CPEkVgp_.js";
import { n as u } from "./AppIcon-DD754F_c.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var d = e({
	width: s,
	height: s,
	steps: r().int().min(1).max(50),
	scale: r().min(0).max(10),
	cfg_rescale: r().min(0).max(1),
	sampler: o,
	noise_schedule: a,
	smea: t(),
	dyn: t(),
	variety_plus: t(),
	vibe_asset_ids: n(i).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(c)} pixels`,
		path: ["width"]
	});
});
function f(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var p = u("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]);
//#endregion
//#region src/transport/http_origin.ts
function m(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (t.protocol !== "http:" && t.protocol !== "https:" || t.username.length > 0 || t.password.length > 0 || t.pathname !== "/" || t.search.length > 0 || t.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return l.parse(t.origin);
}
//#endregion
//#region src/modules/comfyui/server_inspection.ts
var h = [
	"sampler_name",
	"scheduler",
	"model",
	"text_encoder",
	"vae"
];
function g(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function _(e) {
	return Array.isArray(e) && e.every((e) => typeof e == "string") ? e : null;
}
function v(e, t) {
	let n = g(e) ? e.input : null;
	if (!g(n)) return null;
	for (let e of [n.required, n.optional]) {
		let n = g(e) ? e[t] : void 0;
		if (!Array.isArray(n)) continue;
		let r = n[0], i = n[1], a = _(r);
		if (a !== null) return a;
		if (r === "COMBO" && g(i)) return _(i.options);
	}
	return null;
}
async function y(e, t) {
	let n = await e("/system_stats"), r = g(n) ? n.system : null, i = g(r) ? r.comfyui_version : null, a = typeof i == "string" ? i : null, o = {
		sampler_name: [],
		scheduler: [],
		model: [],
		text_encoder: [],
		vae: []
	}, s = _(await e("/models/loras")) ?? [];
	if (t === null) return {
		version: a,
		options: o,
		lora_names: s,
		missing_node_types: [],
		missing_values: []
	};
	let c = [...new Set(Object.values(t.workflow).map((e) => e.class_type))], l = new Map(await Promise.all(c.map(async (t) => {
		let n = await e(`/object_info/${encodeURIComponent(t)}`);
		return [t, g(n) ? n[t] : void 0];
	}))), u = [];
	for (let [e, n] of Object.entries(t.workflow)) for (let [t, r] of Object.entries(n.inputs)) {
		if (typeof r != "string") continue;
		let i = v(l.get(n.class_type), t);
		i !== null && !i.includes(r) && u.push({
			node_id: e,
			class_type: n.class_type,
			property: t,
			value: r
		});
	}
	for (let e of h) {
		let n = t.mapping.inputs[e], r = n === void 0 ? void 0 : t.workflow[n.node_id];
		n !== void 0 && r !== void 0 && (o[e] = v(l.get(r.class_type), n.property) ?? []);
	}
	return {
		version: a,
		options: o,
		lora_names: s,
		missing_node_types: c.filter((e) => l.get(e) === void 0),
		missing_values: u
	};
}
function b(e, t, n) {
	let r = [], i = e.missing_values.filter((e) => h.every((r) => {
		let i = t.mapping.inputs[r];
		return (n[r] ?? "") === "" || i?.node_id !== e.node_id || i.property !== e.property;
	}));
	for (let i of h) {
		let a = n[i] ?? "", o = t.mapping.inputs[i], s = o === void 0 ? void 0 : t.workflow[o.node_id], c = e.options[i];
		a !== "" && o !== void 0 && s !== void 0 && c.length !== 0 && (c.includes(a) || r.push({
			node_id: o.node_id,
			class_type: s.class_type,
			property: o.property,
			value: a
		}));
	}
	return [...i, ...r];
}
//#endregion
export { p as a, m as i, y as n, d as o, b as r, f as s, h as t };
