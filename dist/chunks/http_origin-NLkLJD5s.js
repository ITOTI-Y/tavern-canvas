import { c as e, h as t, i as n, m as r, o as i, r as a, t as o, u as s, y as c } from "./schemas-DMBLWk59.js";
import { a as l, o as u } from "./ids-stC4fUL8.js";
import { i as d, o as f, r as p, t as m } from "./novelai-Dh4UVw5r.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var h = r({
	width: p,
	height: p,
	steps: s().int().min(1).max(50),
	scale: s().min(0).max(10),
	cfg_rescale: s().min(0).max(1),
	sampler: f,
	noise_schedule: d,
	smea: n(),
	dyn: n(),
	variety_plus: n(),
	vibe_asset_ids: a(l).max(16)
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
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
//#region ../../packages/contracts/src/settings.ts
var _ = c().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), v = "analysis_api_key";
function y(e) {
	return u.parse(`tavern_canvas:${e}:${v}`);
}
var b = t().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), x = o([
	"browser_device",
	"host",
	"browser_encrypted"
]), S = r({
	color_mode: o([
		"system",
		"light",
		"dark"
	]),
	inspector_width: s().int().min(240).max(720),
	inspector_collapsed: n(),
	optional_entry_enabled: n()
}), C = i("kind", [
	r({ kind: e("current") }),
	r({
		kind: e("proxy_preset"),
		proxy_preset: t().trim().min(1).max(200),
		model: t().trim().min(1).max(200).nullable()
	}),
	r({
		kind: e("custom"),
		api_url: c({ protocol: /^https?$/u }).max(500),
		model: t().trim().min(1).max(200)
	})
]), w = i("mode", [
	r({ mode: e("chat") }),
	r({ mode: e("off") }),
	r({
		mode: e("worldbook"),
		worldbook: t().trim().min(1).max(200)
	})
]), T = r({
	preset_name: t().trim().min(1).max(200),
	connection: C,
	max_chat_history: s().int().min(0).max(20),
	max_images_per_message: s().int().min(1).max(8),
	prompt_preset_id: l.nullable(),
	world_info: w.default({ mode: "chat" }),
	wardrobe_model: t().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: t().max(2e3).default(""),
	wardrobe_guidance: t().max(2e3).default("")
}), E = r({
	source: t().trim().min(1).max(32),
	target: t().trim().min(1).max(128)
}), D = r({
	deepl_endpoint: o(["free", "pro"]),
	glossary: a(E).max(200)
}), O = r({
	schema_version: e(1),
	active_namespace: b,
	locale: o([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: x,
	active_provider_profile_id: l.nullable(),
	global_concurrency: s().int().min(1).max(4),
	auto_generation_enabled: n(),
	vocabulary_update_channel: o(["bundled", "remote"]),
	illustration: T,
	translation: D,
	ui: S
});
//#endregion
//#region src/transport/http_origin.ts
function k(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (t.protocol !== "http:" && t.protocol !== "https:" || t.username.length > 0 || t.password.length > 0 || t.pathname !== "/" || t.search.length > 0 || t.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return _.parse(t.origin);
}
function A(e) {
	let t = new URL(k(e)).hostname.toLowerCase();
	if (t === "localhost" || t === "[::1]") return "loopback";
	let n = M(t);
	return n === void 0 ? t.startsWith("[fc") || t.startsWith("[fd") || /^\[fe[89ab]/u.test(t) ? "private" : "public_or_unknown" : n[0] === 127 ? "loopback" : n[0] === 10 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168 || n[0] === 169 && n[1] === 254 ? "private" : "public_or_unknown";
}
function j(e) {
	return A(e) === "loopback";
}
function M(e) {
	let t = e.split(".");
	if (t.length !== 4) return;
	let n = t.map(Number);
	if (n.some((e) => !Number.isInteger(e) || e < 0 || e > 255)) return;
	let [r, i, a, o] = n;
	return r === void 0 || i === void 0 || a === void 0 || o === void 0 ? void 0 : [
		r,
		i,
		a,
		o
	];
}
//#endregion
export { S as a, g as c, O as i, k as n, y as o, x as r, h as s, j as t };
