import { E as e, T as t, a as n, b as r, g as i, m as a, o, s, u as c, x as l, y as u } from "./ids-CQF5rr2J.js";
//#region ../../packages/contracts/src/settings.ts
var d = t().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), f = r({
	endpoint: d.nullable(),
	token_secret_id: l().min(1).nullable(),
	http_acknowledgments: u(d, e({ offset: !1 }))
}), p = "gateway_access_token";
function m(e) {
	return o.parse(`tavern_canvas:${e}:${p}`);
}
var h = l().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), g = s(["host", "browser_encrypted"]), _ = r({
	color_mode: s([
		"system",
		"light",
		"dark"
	]),
	inspector_width: i().int().min(240).max(720),
	inspector_collapsed: c(),
	optional_entry_enabled: c()
}), v = r({
	schema_version: a(1),
	active_namespace: h,
	locale: s([
		"auto",
		"zh-CN",
		"en"
	]),
	credential_storage_mode: g,
	active_provider_profile_id: n.nullable(),
	global_concurrency: i().int().min(1).max(4),
	auto_generation_enabled: c(),
	fallback_generation_enabled: c(),
	vocabulary_update_channel: s(["bundled", "remote"]),
	gateway: f,
	ui: _
});
//#endregion
export { _ as a, v as i, f as n, m as o, d as r, g as t };
