import { b as e, c as t, g as n, h as r, i, o as a, p as o, r as s, t as c, u as l } from "./schemas-BjkyCQYG.js";
import { a as u, o as d } from "./ids-pPJWL4BL.js";
//#region ../../packages/contracts/src/settings.ts
var f = e().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), p = "analysis_api_key";
function m(e) {
	return d.parse(`tavern_canvas:${e}:${p}`);
}
var h = n().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), g = c([
	"browser_device",
	"host",
	"browser_encrypted"
]), _ = r({
	color_mode: c([
		"system",
		"light",
		"dark"
	]),
	inspector_width: l().int().min(240).max(720),
	inspector_collapsed: i(),
	optional_entry_enabled: i()
}), v = a("kind", [
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
]), y = o((e) => typeof e == "object" && e && "worldbook" in e && typeof e.worldbook == "string" ? {
	mode: "worldbook",
	worldbooks: [e.worldbook]
} : e, a("mode", [
	r({ mode: t("chat") }),
	r({ mode: t("off") }),
	r({
		mode: t("worldbook"),
		worldbooks: s(n().trim().min(1).max(200)).min(1).max(20)
	})
])), b = r({
	style: c(["strip", "default"]),
	max_panels: l().int().min(1).max(12),
	style_tags: n().max(2e3),
	no_text_tags: n().max(2e3)
}), x = {
	style: "strip",
	max_panels: 6,
	style_tags: "comic panel, cinematic composition, clean lineart, dynamic angle",
	no_text_tags: "text, speech bubble, onomatopoeia, english text, watermark, signature"
}, S = r({
	preset_name: n().trim().min(1).max(200),
	connection: v,
	max_chat_history: l().int().min(0).max(20),
	max_images_per_message: l().int().min(1).max(8),
	prompt_preset_id: u.nullable(),
	world_info: y.default({ mode: "chat" }),
	wardrobe_model: n().trim().min(1).max(200).nullable().default(null),
	analysis_guidance: n().max(2e3).default(""),
	wardrobe_guidance: n().max(2e3).default(""),
	strip: b.default(x)
}), C = r({
	source: n().trim().min(1).max(32),
	target: n().trim().min(1).max(128)
}), w = r({
	deepl_endpoint: c(["free", "pro"]),
	glossary: s(C).max(200)
}), T = r({
	schema_version: t(1),
	active_namespace: h,
	locale: c([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: g,
	active_provider_profile_id: u.nullable(),
	global_concurrency: l().int().min(1).max(4),
	auto_generation_enabled: i(),
	vocabulary_update_channel: c(["bundled", "remote"]),
	illustration: S,
	translation: w,
	ui: _
});
//#endregion
export { T as a, m as c, f as i, x as n, _ as o, S as r, w as s, g as t };
