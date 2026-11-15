import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { f as t, g as n, h as r, r as i, t as a, u as o } from "./schemas-BjkyCQYG.js";
//#region src/modules/comfyui/workflow_mapping.ts
var s = /* @__PURE__ */ e({
	ComfyUiDefaultsSchema: () => P,
	DEFAULT_TARGETS: () => F,
	NODE_MAP_FIELD: () => D,
	REQUIRED_TARGETS: () => A,
	WORKFLOW_JSON_FIELD: () => E,
	WORKFLOW_TARGETS: () => c,
	WorkflowFormatError: () => p,
	WorkflowMappingError: () => M,
	WorkflowMappingSchema: () => f,
	detect_workflow_mapping: () => S,
	missing_required: () => j,
	parse_workflow: () => h,
	read_mapped_workflow: () => k,
	request_placeholder_values: () => R,
	target_value_type: () => u,
	to_adapter_workflow: () => N,
	workflow_input_choices: () => w,
	workflow_output_choices: () => T,
	workflow_value: () => L
}), c = [
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
	"model"
], l = /* @__PURE__ */ new Set([
	"prompt",
	"negative_prompt",
	"sampler_name",
	"scheduler",
	"model"
]);
function u(e) {
	return l.has(e) ? "string" : "number";
}
var d = r({
	node_id: n().min(1).max(128),
	property: n().min(1).max(128)
}), f = r({
	inputs: t(a(c), d),
	output_node_ids: i(n().min(1).max(128)).max(16)
}), p = class extends Error {
	reason;
	constructor(e) {
		super(e === "not_json" ? "The workflow is not valid JSON" : "The workflow is not in ComfyUI API format"), this.reason = e, this.name = "WorkflowFormatError";
	}
};
function m(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function h(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		throw new p("not_json");
	}
	if (!m(t) || Object.keys(t).length === 0) throw new p("not_api_format");
	for (let e of Object.values(t)) if (!m(e) || typeof e.class_type != "string" || !m(e.inputs)) throw new p("not_api_format");
	return t;
}
function g(e) {
	if (!Array.isArray(e) || e.length !== 2) return null;
	let t = e[0];
	return typeof t == "string" || typeof t == "number" ? String(t) : null;
}
var _ = 8;
function v(e, t, n, r, i = 0) {
	let a = e[t];
	if (a === void 0 || i > _) return null;
	for (let o of n) {
		let s = a.inputs[o];
		if (typeof s === r) return {
			node_id: t,
			property: o
		};
		let c = g(s);
		if (c !== null) {
			let t = v(e, c, n, r, i + 1);
			if (t !== null) return t;
		}
	}
	return null;
}
var y = [
	"text",
	"prompt",
	"string",
	"value",
	"conditioning"
], b = [
	"unet_name",
	"ckpt_name",
	"model_name",
	"model"
];
function x(e) {
	return g(e.inputs.images) !== null && /save|preview/iu.test(e.class_type);
}
function S(e) {
	let t = {}, n = (e, n) => {
		n !== null && (t[e] = n);
	}, r = Object.keys(e).find((t) => {
		let n = e[t]?.inputs ?? {};
		return g(n.positive) !== null && g(n.negative) !== null;
	});
	if (r !== void 0) {
		let t = e[r]?.inputs ?? {}, i = (n, r, i) => {
			let a = g(t[n]);
			return a === null ? null : v(e, a, r, i);
		};
		n("prompt", i("positive", y, "string")), n("negative_prompt", i("negative", y, "string")), n("seed", v(e, r, [
			"seed",
			"noise_seed",
			"value"
		], "number")), n("steps", v(e, r, ["steps", "value"], "number")), n("cfg", v(e, r, ["cfg", "value"], "number")), n("sampler_name", v(e, r, ["sampler_name"], "string")), n("scheduler", v(e, r, ["scheduler"], "string")), n("width", i("latent_image", ["width", "value"], "number")), n("height", i("latent_image", ["height", "value"], "number")), n("output_count", i("latent_image", ["batch_size", "value"], "number")), n("model", i("model", b, "string"));
	}
	let i = Object.keys(e).find((t) => {
		let n = e[t];
		return n !== void 0 && x(n);
	});
	return {
		inputs: t,
		output_node_ids: i === void 0 ? [] : [i]
	};
}
function C(e, t) {
	let n = t._meta?.title;
	return `#${e} ${typeof n == "string" && n !== "" ? n : t.class_type}`;
}
function w(e) {
	return Object.entries(e).flatMap(([e, t]) => Object.entries(t.inputs).flatMap(([n, r]) => typeof r == "string" || typeof r == "number" ? [{
		node_id: e,
		property: n,
		title: C(e, t),
		type: typeof r == "string" ? "string" : "number"
	}] : []));
}
function T(e) {
	return Object.entries(e).flatMap(([e, t]) => g(t.inputs.images) === null ? [] : [{
		node_id: e,
		title: C(e, t)
	}]);
}
var E = "workflow_json", D = "node_map";
function O(e, t, n) {
	return typeof e[n.node_id]?.inputs[n.property] === u(t);
}
function k(e) {
	let t = e[E], n = h(typeof t == "string" ? t : ""), r = e[D], i = null;
	if (typeof r == "string") try {
		i = JSON.parse(r);
	} catch {
		i = null;
	}
	let a = f.safeParse(i);
	if (!a.success) return {
		workflow: n,
		mapping: S(n)
	};
	let o = {};
	for (let e of c) {
		let t = a.data.inputs[e];
		t !== void 0 && O(n, e, t) && (o[e] = t);
	}
	return {
		workflow: n,
		mapping: {
			inputs: o,
			output_node_ids: a.data.output_node_ids.filter((e) => e in n)
		}
	};
}
var A = ["prompt", "output_count"];
function j(e) {
	return [...A.filter((t) => e.inputs[t] === void 0), ...e.output_node_ids.length === 0 ? ["output"] : []];
}
var M = class extends Error {
	missing;
	constructor(e) {
		super(`The ComfyUI workflow has no mapping for: ${e.join(", ")}`), this.missing = e, this.name = "WorkflowMappingError";
	}
};
function N(e, t) {
	let { mapping: n } = t, r = j(n), i = n.inputs.prompt, a = n.inputs.output_count;
	if (r.length > 0 || i === void 0 || a === void 0) throw new M(r);
	let o = structuredClone(t.workflow), s = n.inputs.negative_prompt;
	if (s !== void 0) {
		let e = o[s.node_id];
		e !== void 0 && (e.inputs[s.property] = "");
	}
	let l = {};
	for (let e of c) {
		let t = n.inputs[e];
		t !== void 0 && e !== "prompt" && e !== "negative_prompt" && e !== "seed" && e !== "output_count" && (l[e] = {
			...t,
			value_type: u(e)
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
			placeholders: l,
			input_assets: {}
		}
	};
}
var P = r({
	steps: o().int().min(1).max(200).optional(),
	cfg: o().min(0).max(100).optional(),
	sampler_name: n().trim().min(1).max(128).optional(),
	scheduler: n().trim().min(1).max(128).optional(),
	model: n().trim().min(1).max(512).optional()
}), F = [
	"steps",
	"cfg",
	"sampler_name",
	"scheduler",
	"model"
];
function I(e, t) {
	if (t === void 0) return null;
	let n = e[t.node_id]?.inputs[t.property];
	return typeof n == "string" || typeof n == "number" ? n : null;
}
function L(e, t) {
	return I(e.workflow, e.mapping.inputs[t]);
}
function R(e, t) {
	let n = {};
	for (let t of ["width", "height"]) {
		let r = L(e, t);
		typeof r == "number" && (n[t] = r);
	}
	for (let r of F) {
		let i = t[r];
		i !== void 0 && e.mapping.inputs[r] !== void 0 && (n[r] = i);
	}
	return n;
}
//#endregion
export { T as _, c as a, S as c, k as d, R as f, s as g, w as h, E as i, j as l, N as m, F as n, p as o, u as p, D as r, M as s, P as t, h as u, L as v };
