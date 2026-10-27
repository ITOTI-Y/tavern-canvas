import { T as e, a as t, b as n, g as r, l as i, o as a, s as o, u as s, y as c } from "./ids-DjWg1HG8.js";
import { i as l, o as u, r as d, t as f } from "./novelai-cCZ4kJg6.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var p = c({
	width: d,
	height: d,
	steps: r().int().min(1).max(50),
	scale: r().min(0).max(10),
	cfg_rescale: r().min(0).max(1),
	sampler: u,
	noise_schedule: l,
	smea: s(),
	dyn: s(),
	variety_plus: s(),
	vibe_asset_ids: i(t).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(f)} pixels`,
		path: ["width"]
	});
});
function m(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
//#region ../../packages/contracts/src/llm_connection.ts
var h = o([
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
]), g = {
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
function _(e) {
	return e.startsWith("/") && !e.startsWith("//") && !e.includes("\\") && !e.includes("#") && !e.split(/[/?]/u).includes("..") && !/^[a-z][a-z0-9+.-]*:/iu.test(e);
}
function v(e, t) {
	return _(t) && g[e].completion_routes.includes(t);
}
var y = "llm_profile_api_key";
function b(e, t) {
	return `tavern_canvas:${e}:${t}:${y}`;
}
var x = {
	id: t,
	display_name: n().trim().min(1).max(120),
	provider_kind: h,
	route: n().min(1).max(256),
	model_id: n().trim().min(1).max(200),
	temperature: r().min(0).max(2),
	max_output_tokens: r().int().min(1).max(2e5),
	is_default: s()
}, S = "route must be one of the selected provider kind's catalog routes";
function C(e) {
	return {
		code: "custom",
		input: e,
		path: ["route"],
		message: S
	};
}
var w = c(x).check((e) => {
	v(e.value.provider_kind, e.value.route) || e.issues.push(C(e.value.route));
}), T = c({
	...x,
	credential_reference: a.nullable(),
	created_at: e({ offset: !0 }),
	updated_at: e({ offset: !0 })
}).check((e) => {
	v(e.value.provider_kind, e.value.route) || e.issues.push(C(e.value.route));
});
//#endregion
export { b as a, T as i, g as n, p as o, w as r, m as s, y as t };
