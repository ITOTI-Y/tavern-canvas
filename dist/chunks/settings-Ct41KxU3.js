import { b as e, c as t, g as n, h as r, i, m as a, o, p as s, r as c, t as l, u } from "./schemas-BjkyCQYG.js";
import { a as d, o as f } from "./ids-pPJWL4BL.js";
//#region ../../packages/contracts/src/settings.ts
var p = e().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), m = "analysis_api_key";
function h(e) {
	return f.parse(`tavern_canvas:${e}:${m}`);
}
var g = n().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), _ = l([
	"browser_device",
	"host",
	"browser_encrypted"
]), v = r({
	color_mode: l([
		"system",
		"light",
		"dark"
	]),
	inspector_width: u().int().min(240).max(720),
	inspector_collapsed: i(),
	optional_entry_enabled: i()
}), y = o("kind", [
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
]), b = s((e) => typeof e == "object" && e && "worldbook" in e && typeof e.worldbook == "string" ? {
	mode: "worldbook",
	worldbooks: [e.worldbook]
} : e, o("mode", [
	r({ mode: t("chat") }),
	r({ mode: t("off") }),
	r({
		mode: t("worldbook"),
		worldbooks: c(n().trim().min(1).max(200)).min(1).max(20)
	})
])), x = r({
	style: l(["strip", "default"]),
	max_panels: u().int().min(1).max(12),
	style_tags: n().max(2e3),
	no_text_tags: n().max(2e3),
	symbol_bubbles: i().default(!0)
}), S = {
	style: "strip",
	max_panels: 6,
	style_tags: "dynamic angle, cinematic lighting, depth of field, clean lineart",
	no_text_tags: "text, speech bubble, onomatopoeia, english text, watermark, signature",
	symbol_bubbles: !0
}, C = r({
	width: u().int().min(64).max(2048).multipleOf(64),
	height: u().int().min(64).max(2048).multipleOf(64)
}), w = r({
	id: n().trim().min(1).max(64),
	name: n().trim().min(1).max(60),
	sizes: c(C).min(1).max(16)
}), T = r({
	preset_name: n().trim().min(1).max(200),
	connection: y,
	max_chat_history: u().int().min(0).max(20),
	max_images_per_message: u().int().min(1).max(8),
	prompt_preset_id: d.nullable(),
	world_info: b.default({ mode: "chat" }),
	wardrobe_model: n().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: n().max(2e3).default(""),
	wardrobe_guidance: n().max(2e3).default(""),
	strip: x.default(S),
	size_sets: c(w).max(20).default([]),
	size_set_id: n().trim().min(1).max(64).nullable().default(null),
	size_set_by_chat: a(n().min(1).max(300), n().trim().min(1).max(64).nullable()).default({})
}), E = r({
	source: n().trim().min(1).max(32),
	target: n().trim().min(1).max(128)
}), D = r({
	deepl_endpoint: l(["free", "pro"]),
	glossary: c(E).max(200)
}), O = r({
	schema_version: t(1),
	active_namespace: g,
	locale: l([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: _,
	active_provider_profile_id: d.nullable(),
	global_concurrency: u().int().min(1).max(4),
	auto_generation_enabled: i(),
	vocabulary_update_channel: l(["bundled", "remote"]),
	illustration: T,
	translation: D,
	ui: v
});
//#endregion
export { O as a, h as c, p as i, S as n, v as o, T as r, D as s, _ as t };
