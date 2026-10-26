import { T as e, a as t, b as n, g as r, l as i, o as a, s as o, u as s, y as c } from "./ids-DjWg1HG8.js";
import { a as l, c as u, i as d, r as f, s as p, t as m } from "./novelai-BG6cLQq6.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var h = c({
	width: f,
	height: f,
	steps: r().int().min(1).max(50),
	scale: r().min(0).max(10),
	cfg_rescale: r().min(0).max(1),
	sampler: p,
	noise_schedule: d,
	quality_preset: l,
	undesired_content_preset: u,
	smea: s(),
	dyn: s(),
	variety_plus: s(),
	vibe_asset_ids: i(t).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(m)} pixels`,
		path: ["width"]
	});
});
function g(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps"), t.undesired_content_preset !== r.undesired_content_preset && n.push("undesired_content_preset")), n;
}
//#endregion
//#region ../../packages/contracts/src/llm_connection.ts
var _ = o([
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
]), v = {
	openai_compatible: {
		completion_routes: ["/v1/chat/completions", "/chat/completions"],
		models_route: "/v1/models"
	},
	anthropic: {
		completion_routes: ["/v1/messages"],
		models_route: "/v1/models"
	},
	google_generative: {
		completion_routes: ["/v1beta/openai/chat/completions"],
		models_route: "/v1beta/openai/models"
	},
	ollama: {
		completion_routes: ["/api/chat"],
		models_route: "/api/tags"
	}
};
function y(e) {
	return e.startsWith("/") && !e.startsWith("//") && !e.includes("\\") && !e.includes("#") && !e.split(/[/?]/u).includes("..") && !/^[a-z][a-z0-9+.-]*:/iu.test(e);
}
function b(e, t) {
	return y(t) && v[e].completion_routes.includes(t);
}
var x = "llm_profile_api_key";
function S(e, t) {
	return `tavern_canvas:${e}:${t}:${x}`;
}
var C = {
	id: t,
	display_name: n().trim().min(1).max(120),
	provider_kind: _,
	route: n().min(1).max(256),
	model_id: n().trim().min(1).max(200),
	temperature: r().min(0).max(2),
	max_output_tokens: r().int().min(1).max(2e5),
	is_default: s()
}, w = "route must be one of the selected provider kind's catalog routes";
function T(e) {
	return {
		code: "custom",
		input: e,
		path: ["route"],
		message: w
	};
}
var E = c(C).check((e) => {
	b(e.value.provider_kind, e.value.route) || e.issues.push(T(e.value.route));
}), D = c({
	...C,
	credential_reference: a.nullable(),
	created_at: e({ offset: !0 }),
	updated_at: e({ offset: !0 })
}).check((e) => {
	b(e.value.provider_kind, e.value.route) || e.issues.push(T(e.value.route));
});
//#endregion
export { S as a, D as i, v as n, h as o, E as r, g as s, x as t };
