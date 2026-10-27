import { c as e, h as t, i as n, m as r, o as i, p as a, r as o, t as s, u as c, x as l, y as u } from "./schemas-DMBLWk59.js";
import { a as d, o as f } from "./ids-stC4fUL8.js";
//#region ../../packages/contracts/src/settings.ts
var p = u().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), m = r({
	endpoint: p.nullable(),
	token_secret_id: t().min(1).nullable(),
	http_acknowledgments: a(p, l({ offset: !1 }))
}), h = "gateway_access_token", g = "analysis_api_key";
function _(e) {
	return f.parse(`tavern_canvas:${e}:${h}`);
}
function v(e) {
	return f.parse(`tavern_canvas:${e}:${g}`);
}
var y = t().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), b = s([
	"browser_device",
	"host",
	"browser_encrypted"
]), x = r({
	color_mode: s([
		"system",
		"light",
		"dark"
	]),
	inspector_width: c().int().min(240).max(720),
	inspector_collapsed: n(),
	optional_entry_enabled: n()
}), S = i("kind", [
	r({ kind: e("current") }),
	r({
		kind: e("proxy_preset"),
		proxy_preset: t().trim().min(1).max(200),
		model: t().trim().min(1).max(200).nullable()
	}),
	r({
		kind: e("custom"),
		api_url: u({ protocol: /^https?$/u }).max(500),
		model: t().trim().min(1).max(200)
	})
]), C = i("mode", [
	r({ mode: e("chat") }),
	r({ mode: e("off") }),
	r({
		mode: e("worldbook"),
		worldbook: t().trim().min(1).max(200)
	})
]), w = r({
	preset_name: t().trim().min(1).max(200),
	connection: S,
	max_chat_history: c().int().min(0).max(20),
	max_images_per_message: c().int().min(1).max(8),
	prompt_preset_id: d.nullable(),
	world_info: C.default({ mode: "chat" }),
	wardrobe_model: t().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: t().max(2e3).default(""),
	wardrobe_guidance: t().max(2e3).default("")
}), T = r({
	source: t().trim().min(1).max(32),
	target: t().trim().min(1).max(128)
}), E = r({
	deepl_endpoint: s(["free", "pro"]),
	glossary: o(T).max(200)
}), D = r({
	schema_version: e(1),
	active_namespace: y,
	locale: s([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: b,
	active_provider_profile_id: d.nullable(),
	global_concurrency: c().int().min(1).max(4),
	auto_generation_enabled: n(),
	vocabulary_update_channel: s(["bundled", "remote"]),
	illustration: w,
	translation: E,
	gateway: m,
	ui: x
}), O = l({ offset: !1 });
function k(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (t.protocol !== "http:" && t.protocol !== "https:" || t.username.length > 0 || t.password.length > 0 || t.pathname !== "/" || t.search.length > 0 || t.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return p.parse(t.origin);
}
function A(e, t, n) {
	let r = k(t);
	return O.parse(n), Object.freeze({
		...e,
		[r]: n
	});
}
function j(e, t) {
	let n = e[k(t)];
	return n !== void 0 && O.safeParse(n).success;
}
function M(e) {
	let t = k(e);
	return new URL(t).protocol === "http:";
}
function N(e) {
	let t = new URL(k(e)).hostname.toLowerCase();
	if (t === "localhost" || t === "[::1]") return "loopback";
	let n = F(t);
	return n === void 0 ? t.startsWith("[fc") || t.startsWith("[fd") || /^\[fe[89ab]/u.test(t) ? "private" : "public_or_unknown" : n[0] === 127 ? "loopback" : n[0] === 10 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168 || n[0] === 169 && n[1] === 254 ? "private" : "public_or_unknown";
}
function P(e) {
	return N(e) === "loopback";
}
function F(e) {
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
export { k as a, m as c, v as d, _ as f, P as i, D as l, N as n, M as o, j as r, b as s, A as t, x as u };
