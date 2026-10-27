import { T as e, a as t, b as n, f as r, g as i, l as a, m as o, o as s, s as c, u as l, v as u, w as d, y as f } from "./ids-DjWg1HG8.js";
//#region ../../packages/contracts/src/settings.ts
var p = d().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), m = f({
	endpoint: p.nullable(),
	token_secret_id: n().min(1).nullable(),
	http_acknowledgments: u(p, e({ offset: !1 }))
}), h = "gateway_access_token", g = "analysis_api_key";
function _(e) {
	return s.parse(`tavern_canvas:${e}:${h}`);
}
function v(e) {
	return s.parse(`tavern_canvas:${e}:${g}`);
}
var y = n().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), b = c([
	"browser_device",
	"host",
	"browser_encrypted"
]), x = f({
	color_mode: c([
		"system",
		"light",
		"dark"
	]),
	inspector_width: i().int().min(240).max(720),
	inspector_collapsed: l(),
	optional_entry_enabled: l()
}), S = r("kind", [
	f({ kind: o("current") }),
	f({
		kind: o("proxy_preset"),
		proxy_preset: n().trim().min(1).max(200),
		model: n().trim().min(1).max(200).nullable()
	}),
	f({
		kind: o("custom"),
		api_url: d({ protocol: /^https?$/u }).max(500),
		model: n().trim().min(1).max(200)
	})
]), C = r("mode", [
	f({ mode: o("chat") }),
	f({ mode: o("off") }),
	f({
		mode: o("worldbook"),
		worldbook: n().trim().min(1).max(200)
	})
]), w = f({
	preset_name: n().trim().min(1).max(200),
	connection: S,
	max_chat_history: i().int().min(0).max(20),
	max_images_per_message: i().int().min(1).max(8),
	prompt_preset_id: t.nullable(),
	world_info: C.default({ mode: "chat" })
}), T = f({
	source: n().trim().min(1).max(32),
	target: n().trim().min(1).max(128)
}), E = f({
	deepl_endpoint: c(["free", "pro"]),
	glossary: a(T).max(200)
}), D = f({
	schema_version: o(1),
	active_namespace: y,
	locale: c([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: b,
	active_provider_profile_id: t.nullable(),
	global_concurrency: i().int().min(1).max(4),
	auto_generation_enabled: l(),
	vocabulary_update_channel: c(["bundled", "remote"]),
	illustration: w,
	translation: E,
	gateway: m,
	ui: x
}), O = e({ offset: !1 });
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
