import { b as e, c as t, g as n, h as r, i, o as a, p as o, r as s, t as c, u as l } from "./schemas-BjkyCQYG.js";
import { a as u, o as d } from "./ids-pPJWL4BL.js";
import { i as f, o as p, r as m, t as h } from "./novelai-B6V3MfU9.js";
import { n as g } from "./AppIcon-DkyxvN8k.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var _ = r({
	width: m,
	height: m,
	steps: l().int().min(1).max(50),
	scale: l().min(0).max(10),
	cfg_rescale: l().min(0).max(1),
	sampler: p,
	noise_schedule: f,
	smea: i(),
	dyn: i(),
	variety_plus: i(),
	vibe_asset_ids: s(u).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(h)} pixels`,
		path: ["width"]
	});
});
function v(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
//#region ../../packages/contracts/src/settings.ts
var y = e().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), b = "analysis_api_key";
function x(e) {
	return d.parse(`tavern_canvas:${e}:${b}`);
}
var S = n().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), C = c([
	"browser_device",
	"host",
	"browser_encrypted"
]), w = r({
	color_mode: c([
		"system",
		"light",
		"dark"
	]),
	inspector_width: l().int().min(240).max(720),
	inspector_collapsed: i(),
	optional_entry_enabled: i()
}), T = a("kind", [
	r({ kind: t("current") }),
	r({
		kind: t("proxy_preset"),
		proxy_preset: n().trim().min(1).max(200),
		model: n().trim().min(1).max(200).nullable()
	}),
	r({
		kind: t("custom"),
		api_url: e({ protocol: /^https?$/u }).max(500),
		model: n().trim().min(1).max(200)
	})
]), E = o((e) => typeof e == "object" && e && "worldbook" in e && typeof e.worldbook == "string" ? {
	mode: "worldbook",
	worldbooks: [e.worldbook]
} : e, a("mode", [
	r({ mode: t("chat") }),
	r({ mode: t("off") }),
	r({
		mode: t("worldbook"),
		worldbooks: s(n().trim().min(1).max(200)).min(1).max(20)
	})
])), D = r({
	style: c(["strip", "default"]),
	max_panels: l().int().min(1).max(12),
	style_tags: n().max(2e3),
	no_text_tags: n().max(2e3)
}), O = {
	style: "strip",
	max_panels: 6,
	style_tags: "comic panel, cinematic composition, clean lineart, dynamic angle",
	no_text_tags: "text, speech bubble, onomatopoeia, english text, watermark, signature"
}, k = r({
	preset_name: n().trim().min(1).max(200),
	connection: T,
	max_chat_history: l().int().min(0).max(20),
	max_images_per_message: l().int().min(1).max(8),
	prompt_preset_id: u.nullable(),
	world_info: E.default({ mode: "chat" }),
	wardrobe_model: n().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: n().max(2e3).default(""),
	wardrobe_guidance: n().max(2e3).default(""),
	strip: D.default(O)
}), A = r({
	source: n().trim().min(1).max(32),
	target: n().trim().min(1).max(128)
}), j = r({
	deepl_endpoint: c(["free", "pro"]),
	glossary: s(A).max(200)
}), M = r({
	schema_version: t(1),
	active_namespace: S,
	locale: c([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: C,
	active_provider_profile_id: u.nullable(),
	global_concurrency: l().int().min(1).max(4),
	auto_generation_enabled: i(),
	vocabulary_update_channel: c(["bundled", "remote"]),
	illustration: k,
	translation: j,
	ui: w
}), N = g("image", [
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
function P(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (t.protocol !== "http:" && t.protocol !== "https:" || t.username.length > 0 || t.password.length > 0 || t.pathname !== "/" || t.search.length > 0 || t.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return y.parse(t.origin);
}
function F(e) {
	let t = new URL(P(e)).hostname.toLowerCase();
	if (t === "localhost" || t === "[::1]") return "loopback";
	let n = L(t);
	return n === void 0 ? t.startsWith("[fc") || t.startsWith("[fd") || /^\[fe[89ab]/u.test(t) ? "private" : "public_or_unknown" : n[0] === 127 ? "loopback" : n[0] === 10 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168 || n[0] === 169 && n[1] === 254 ? "private" : "public_or_unknown";
}
function I(e) {
	return F(e) === "loopback";
}
function L(e) {
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
export { O as a, w as c, _ as d, v as f, C as i, j as l, P as n, k as o, N as r, M as s, I as t, x as u };
