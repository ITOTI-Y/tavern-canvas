import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { f as t, g as n, h as r, r as i, t as a, u as o } from "./schemas-BjkyCQYG.js";
import { t as s } from "./comfyui-DKuS9w2U.js";
//#region src/modules/comfyui/workflow_mapping.ts
var c = /* @__PURE__ */ e({
	ComfyUiDefaultsSchema: () => R,
	DEFAULT_TARGETS: () => z,
	NODE_MAP_FIELD: () => j,
	REQUIRED_TARGETS: () => P,
	WORKFLOW_JSON_FIELD: () => A,
	WORKFLOW_TARGETS: () => l,
	WorkflowFormatError: () => m,
	WorkflowMappingError: () => I,
	WorkflowMappingSchema: () => p,
	detect_workflow_mapping: () => T,
	missing_required: () => F,
	parse_workflow: () => g,
	read_mapped_workflow: () => N,
	request_loras: () => U,
	request_placeholder_values: () => H,
	target_value_type: () => d,
	to_adapter_workflow: () => L,
	workflow_input_choices: () => D,
	workflow_model_input_choices: () => k,
	workflow_output_choices: () => O,
	workflow_value: () => V
}), l = [
	"prompt",
	"negative_prompt",
	"seed",
	"output_count",
	"width",
	"height",
	"steps",
	"cfg",
	"sampler_name",
	"scheduler",
	"model",
	"text_encoder",
	"vae"
], u = /* @__PURE__ */ new Set([
	"prompt",
	"negative_prompt",
	"sampler_name",
	"scheduler",
	"model",
	"text_encoder",
	"vae"
]);
function d(e) {
	return u.has(e) ? "string" : "number";
}
var f = r({
	node_id: n().min(1).max(128),
	property: n().min(1).max(128)
}), p = r({
	inputs: t(a(l), f),
	output_node_ids: i(n().min(1).max(128)).max(16),
	lora_model: f.optional()
}), m = class extends Error {
	reason;
	constructor(e) {
		super(e === "not_json" ? "The workflow is not valid JSON" : "The workflow is not in ComfyUI API format"), this.reason = e, this.name = "WorkflowFormatError";
	}
};
function h(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function g(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		throw new m("not_json");
	}
	if (!h(t) || Object.keys(t).length === 0) throw new m("not_api_format");
	for (let e of Object.values(t)) if (!h(e) || typeof e.class_type != "string" || !h(e.inputs)) throw new m("not_api_format");
	return t;
}
function _(e) {
	if (!Array.isArray(e) || e.length !== 2) return null;
	let t = e[0];
	return typeof t == "string" || typeof t == "number" ? String(t) : null;
}
var v = 8;
function y(e, t, n, r, i = 0) {
	let a = e[t];
	if (a === void 0 || i > v) return null;
	for (let o of n) {
		let s = a.inputs[o];
		if (typeof s === r) return {
			node_id: t,
			property: o
		};
		let c = _(s);
		if (c !== null) {
			let t = y(e, c, n, r, i + 1);
			if (t !== null) return t;
		}
	}
	return null;
}
var b = [
	"text",
	"prompt",
	"string",
	"value",
	"conditioning"
], x = [
	"unet_name",
	"ckpt_name",
	"model_name",
	"model"
], S = ["clip_name", "clip"], C = ["vae_name", "vae"];
function w(e) {
	return _(e.inputs.images) !== null && /save|preview/iu.test(e.class_type);
}
function T(e) {
	let t = {}, n = (e, n) => {
		n !== null && (t[e] = n);
	}, r = Object.keys(e).find((t) => {
		let n = e[t]?.inputs ?? {};
		return _(n.positive) !== null && _(n.negative) !== null;
	}), i;
	if (r !== void 0) {
		let t = e[r]?.inputs ?? {};
		_(t.model) !== null && (i = {
			node_id: r,
			property: "model"
		});
		let a = _(t.positive);
		a !== null && n("text_encoder", y(e, a, S, "string"));
		let o = (n, r, i) => {
			let a = _(t[n]);
			return a === null ? null : y(e, a, r, i);
		};
		n("prompt", o("positive", b, "string")), n("negative_prompt", o("negative", b, "string")), n("seed", y(e, r, [
			"seed",
			"noise_seed",
			"value"
		], "number")), n("steps", y(e, r, ["steps", "value"], "number")), n("cfg", y(e, r, ["cfg", "value"], "number")), n("sampler_name", y(e, r, ["sampler_name"], "string")), n("scheduler", y(e, r, ["scheduler"], "string")), n("width", o("latent_image", ["width", "value"], "number")), n("height", o("latent_image", ["height", "value"], "number")), n("output_count", o("latent_image", ["batch_size", "value"], "number")), n("model", o("model", x, "string"));
	}
	let a = Object.keys(e).find((t) => {
		let n = e[t];
		return n !== void 0 && w(n);
	}), o = a === void 0 ? null : _(e[a]?.inputs.images);
	return o !== null && n("vae", y(e, o, C, "string")), {
		inputs: t,
		output_node_ids: a === void 0 ? [] : [a],
		...i === void 0 ? {} : { lora_model: i }
	};
}
function E(e, t) {
	let n = t._meta?.title;
	return `#${e} ${typeof n == "string" && n !== "" ? n : t.class_type}`;
}
function D(e) {
	return Object.entries(e).flatMap(([e, t]) => Object.entries(t.inputs).flatMap(([n, r]) => typeof r == "string" || typeof r == "number" ? [{
		node_id: e,
		property: n,
		title: E(e, t),
		type: typeof r == "string" ? "string" : "number"
	}] : []));
}
function O(e) {
	return Object.entries(e).flatMap(([e, t]) => _(t.inputs.images) === null ? [] : [{
		node_id: e,
		title: E(e, t)
	}]);
}
function k(e) {
	return Object.entries(e).flatMap(([e, t]) => _(t.inputs.model) === null ? [] : [{
		node_id: e,
		property: "model",
		title: E(e, t)
	}]);
}
var A = "workflow_json", j = "node_map";
function M(e, t, n) {
	return typeof e[n.node_id]?.inputs[n.property] === d(t);
}
function N(e) {
	let t = e[A], n = g(typeof t == "string" ? t : ""), r = e[j], i = null;
	if (typeof r == "string") try {
		i = JSON.parse(r);
	} catch {
		i = null;
	}
	let a = p.safeParse(i);
	if (!a.success) return {
		workflow: n,
		mapping: T(n)
	};
	let o = {};
	for (let e of l) {
		let t = a.data.inputs[e];
		t !== void 0 && M(n, e, t) && (o[e] = t);
	}
	let s = a.data.lora_model;
	return {
		workflow: n,
		mapping: {
			inputs: o,
			output_node_ids: a.data.output_node_ids.filter((e) => e in n),
			...s !== void 0 && _(n[s.node_id]?.inputs[s.property]) !== null ? { lora_model: s } : {}
		}
	};
}
var P = ["prompt", "output_count"];
function F(e) {
	return [...P.filter((t) => e.inputs[t] === void 0), ...e.output_node_ids.length === 0 ? ["output"] : []];
}
var I = class extends Error {
	missing;
	constructor(e) {
		super(`The ComfyUI workflow has no mapping for: ${e.join(", ")}`), this.missing = e, this.name = "WorkflowMappingError";
	}
};
function L(e, t) {
	let { mapping: n } = t, r = F(n), i = n.inputs.prompt, a = n.inputs.output_count;
	if (r.length > 0 || i === void 0 || a === void 0) throw new I(r);
	let o = structuredClone(t.workflow), s = n.inputs.negative_prompt;
	if (s !== void 0) {
		let e = o[s.node_id];
		e !== void 0 && (e.inputs[s.property] = "");
	}
	let c = {};
	for (let e of l) {
		let t = n.inputs[e];
		t !== void 0 && e !== "prompt" && e !== "negative_prompt" && e !== "seed" && e !== "output_count" && (c[e] = {
			...t,
			value_type: d(e)
		});
	}
	return {
		workflow_id: e,
		workflow: o,
		bindings: {
			prompt: i,
			...s === void 0 ? {} : { negative_prompt: s },
			...n.inputs.seed === void 0 ? {} : { seed: n.inputs.seed },
			output_count: a,
			...n.lora_model === void 0 ? {} : { lora_model: n.lora_model },
			placeholders: c,
			input_assets: {}
		}
	};
}
var R = r({
	steps: o().int().min(1).max(200).optional(),
	cfg: o().min(0).max(100).optional(),
	sampler_name: n().trim().min(1).max(128).optional(),
	scheduler: n().trim().min(1).max(128).optional(),
	model: n().trim().min(1).max(512).optional(),
	text_encoder: n().trim().min(1).max(512).optional(),
	vae: n().trim().min(1).max(512).optional(),
	loras: i(s).max(64).optional()
}), z = [
	"steps",
	"cfg",
	"sampler_name",
	"scheduler",
	"model",
	"text_encoder",
	"vae"
];
function B(e, t) {
	if (t === void 0) return null;
	let n = e[t.node_id]?.inputs[t.property];
	return typeof n == "string" || typeof n == "number" ? n : null;
}
function V(e, t) {
	return B(e.workflow, e.mapping.inputs[t]);
}
function H(e, t) {
	let n = {};
	for (let t of ["width", "height"]) {
		let r = V(e, t);
		typeof r == "number" && (n[t] = r);
	}
	for (let r of z) {
		let i = t[r];
		i !== void 0 && e.mapping.inputs[r] !== void 0 && (n[r] = i);
	}
	return n;
}
function U(e, t) {
	return e.mapping.lora_model === void 0 ? void 0 : t.loras ?? [];
}
//#endregion
export { c as _, l as a, V as b, T as c, N as d, U as f, D as g, L as h, A as i, F as l, d as m, z as n, m as o, H as p, j as r, I as s, R as t, g as u, k as v, O as y };
