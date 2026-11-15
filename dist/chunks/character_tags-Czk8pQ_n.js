function e(e) {
	return e.trim().toLowerCase().replace(/\s+/gu, "_");
}
function t(e) {
	return e.replaceAll("_", " ");
}
function n(e) {
	return e.category === "character" && e.popularity >= 50;
}
async function r(t, n) {
	let r = e(n);
	return (await t(r))?.find((e) => e.match_kind === "exact" && e.display_text.toLowerCase() === r);
}
async function i(e, t) {
	let r = t.trim();
	if (r !== "") return (await e(r))?.find((e) => e.match_kind === "translation" && n(e) && e.translation?.split("-")[0]?.trim() === r);
}
async function a(e, t) {
	let n = `${t}_(`;
	return (await e(t))?.some((e) => e.category === "character" && e.display_text.startsWith(n)) ?? !1;
}
async function o(e, o, s) {
	if (e.length === 0) return [];
	let c = await Promise.all(e.map((e) => r(s, e))), l = c.find((e) => e !== void 0 && n(e)) ?? await i(s, o);
	if (l === void 0) return [];
	let u = l.display_text.toLowerCase(), d = c.find((e) => e?.category === "copyright");
	return d === void 0 || u.includes("_(") || !await a(s, u) ? [t(u)] : [t(u), t(d.display_text.toLowerCase())];
}
//#endregion
export { o as resolve_character_tags };
