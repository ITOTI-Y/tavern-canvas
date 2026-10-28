import { _ as e, c as t, f as n, h as r, m as i, r as a, t as o } from "./schemas-DMBLWk59.js";
//#region ../../packages/contracts/src/wardrobe.ts
var s = [
	"full_body",
	"outerwear",
	"top",
	"bottom",
	"legwear",
	"footwear",
	"headwear",
	"accessories"
], c = o(s), l = [
	"age",
	"body",
	"skin",
	"hair",
	"eyes",
	"makeup",
	"expression",
	"features"
];
o(l);
var u = a(r().trim().min(1).max(120)).max(64), d = i({
	character_id: r().min(1).max(64),
	outfit_id: r().min(1).max(64).nullable(),
	overrides: n(c, e([u, t("removed")])),
	conditions: u
}), f = i({
	schema_version: t(1),
	wearing: a(d).max(64)
});
//#endregion
//#region src/modules/wardrobe/wardrobe_library.ts
function p(e) {
	return typeof e == "string" ? [...new Set(e.split(",").map((e) => e.trim()).filter((e) => e !== ""))] : [];
}
function m(e) {
	return e.join(", ");
}
function h(e) {
	return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function g(e) {
	let { reference_image: t, reference_send: n, reference_mode: r } = e;
	return typeof t != "string" || t === "" || n !== 1 ? null : r === "img2img" || r === "precise" ? {
		image: t,
		mode: r
	} : {
		image: t,
		mode: "vibe"
	};
}
function _(e) {
	return e === "analysis" ? "analysis" : "user";
}
function v(e) {
	let { payload: t } = e, n = t.subject === "boy" || t.subject === "other" ? t.subject : "girl", r = p(t.locked_fields);
	return {
		id: e.id,
		name: e.display_name,
		aliases: p(t.aliases),
		subject: n,
		appearance: Object.fromEntries(l.map((e) => [e, p(t[e])])),
		excluded_traits: p(t.excluded_traits),
		default_outfit_id: h(t.default_outfit_id),
		reference: g(t),
		origin: _(t.origin),
		locked_fields: l.filter((e) => r.includes(e)),
		chat_id: h(t.chat_id)
	};
}
function y(e) {
	let { payload: t } = e;
	return {
		id: e.id,
		name: e.display_name,
		character_id: h(t.character_id),
		slots: Object.fromEntries(s.map((e) => [e, p(t[e])])),
		origin: _(t.origin),
		chat_id: h(t.chat_id)
	};
}
function b(e, t) {
	return e.filter((e) => e.chat_id === null || e.chat_id === t);
}
function x(e, t) {
	let n = b(e.character.map(v), t), r = new Set(n.map((e) => e.default_outfit_id));
	return {
		characters: n,
		outfits: e.outfit.map(y).filter((e) => e.chat_id === null || e.chat_id === t || r.has(e.id))
	};
}
function S(e, t) {
	return t.find((t) => t.id === e.default_outfit_id) ?? t.find((t) => t.character_id === e.id) ?? null;
}
//#endregion
export { p as a, c, y as i, f as l, m as n, l as o, x as r, s, S as t };
