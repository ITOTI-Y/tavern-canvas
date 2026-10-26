import { E as e, a as t, b as n, g as r, o as i, s as a, u as o, x as s } from "./ids-CQF5rr2J.js";
//#region ../../packages/contracts/src/llm_connection.ts
var c = a([
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
]), l = {
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
function u(e) {
	return e.startsWith("/") && !e.startsWith("//") && !e.includes("\\") && !e.includes("#") && !e.split(/[/?]/u).includes("..") && !/^[a-z][a-z0-9+.-]*:/iu.test(e);
}
function d(e, t) {
	return u(t) && l[e].completion_routes.includes(t);
}
var f = "llm_profile_api_key";
function p(e, t) {
	return `tavern_canvas:${e}:${t}:${f}`;
}
var m = {
	id: t,
	display_name: s().trim().min(1).max(120),
	provider_kind: c,
	route: s().min(1).max(256),
	model_id: s().trim().min(1).max(200),
	temperature: r().min(0).max(2),
	max_output_tokens: r().int().min(1).max(2e5),
	is_default: o()
}, h = "route must be one of the selected provider kind's catalog routes";
function g(e) {
	return {
		code: "custom",
		input: e,
		path: ["route"],
		message: h
	};
}
var _ = n(m).check((e) => {
	d(e.value.provider_kind, e.value.route) || e.issues.push(g(e.value.route));
}), v = n({
	...m,
	credential_reference: i.nullable(),
	created_at: e({ offset: !0 }),
	updated_at: e({ offset: !0 })
}).check((e) => {
	d(e.value.provider_kind, e.value.route) || e.issues.push(g(e.value.route));
});
//#endregion
export { p as a, v as i, l as n, _ as r, f as t };
