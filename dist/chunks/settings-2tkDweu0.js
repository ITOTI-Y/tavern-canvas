import { b as e, c as t, g as n, h as r, i, m as a, o, p as s, r as c, t as l, u, v as d } from "./schemas-BjkyCQYG.js";
import { a as f, o as p } from "./ids-pPJWL4BL.js";
//#region ../../packages/contracts/src/settings.ts
var m = e().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), h = "analysis_api_key";
function g(e) {
	return p.parse(`tavern_canvas:${e}:${h}`);
}
var _ = n().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), v = l([
	"browser_device",
	"host",
	"browser_encrypted"
]), y = r({
	color_mode: l([
		"system",
		"light",
		"dark"
	]),
	inspector_width: u().int().min(240).max(720),
	inspector_collapsed: i(),
	optional_entry_enabled: i()
}), b = o("kind", [
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
]), x = s((e) => typeof e == "object" && e && "worldbook" in e && typeof e.worldbook == "string" ? {
	mode: "worldbook",
	worldbooks: [e.worldbook]
} : e, o("mode", [
	r({ mode: t("chat") }),
	r({ mode: t("off") }),
	r({
		mode: t("worldbook"),
		worldbooks: c(n().trim().min(1).max(200)).min(1).max(20)
	})
])), S = r({
	style: l(["strip", "default"]),
	max_panels: u().int().min(1).max(12),
	style_tags: n().max(2e3),
	no_text_tags: n().max(2e3),
	symbol_bubbles: i().default(!0)
}), C = {
	style: "strip",
	max_panels: 6,
	style_tags: "dynamic angle, cinematic lighting, depth of field, clean lineart",
	no_text_tags: "text, speech bubble, onomatopoeia, english text, watermark, signature",
	symbol_bubbles: !0
}, w = r({
	width: u().int().min(64).max(2048).multipleOf(64),
	height: u().int().min(64).max(2048).multipleOf(64)
}), T = r({
	id: n().trim().min(1).max(64),
	name: n().trim().min(1).max(60),
	sizes: c(w).min(1).max(16)
}), E = r({
	preset_source: l(["builtin", "sillytavern"]).default("sillytavern"),
	preset_name: n().trim().min(1).max(200),
	connection: b,
	max_chat_history: u().int().min(0).max(20),
	max_images_per_message: u().int().min(1).max(8),
	prompt_preset_id: f.nullable(),
	world_info: x.default({ mode: "chat" }),
	wardrobe_model: n().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: n().max(2e3).default(""),
	wardrobe_guidance: n().max(2e3).default(""),
	strip: S.default(C),
	size_sets: c(T).max(20).default([]),
	size_set_id: n().trim().min(1).max(64).nullable().default(null),
	size_set_by_chat: a(n().min(1).max(300), n().trim().min(1).max(64).nullable()).default({}),
	structured_output: l([
		"auto",
		"tools",
		"json_schema"
	]).default("auto")
}), D = r({
	source: n().trim().min(1).max(32),
	target: n().trim().min(1).max(128)
}), O = r({
	deepl_endpoint: l(["free", "pro"]),
	glossary: c(D).max(200)
}), k = "tavern_canvas:vocabulary:hf_token", A = r({
	catalog_url: d([t(""), e({ protocol: /^https$/u }).max(2048)]),
	token_saved: i()
}), j = r({
	schema_version: t(1),
	active_namespace: _,
	locale: l([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: v,
	active_provider_profile_id: f.nullable(),
	global_concurrency: u().int().min(1).max(4),
	auto_generation_enabled: i(),
	vocabulary_remote: A,
	illustration: E,
	translation: O,
	ui: y
});
//#endregion
export { j as a, k as c, m as i, A as l, C as n, y as o, E as r, O as s, v as t, g as u };
