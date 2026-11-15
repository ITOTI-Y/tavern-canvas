import { s as e, t } from "./wardrobe_library-D08dVzPC.js";
//#region src/modules/wardrobe/wearing.ts
function n(e, n) {
	return {
		character_id: e.id,
		outfit_id: t(e, n)?.id ?? null,
		overrides: {},
		conditions: []
	};
}
function r(t, n) {
	let r = n.find((e) => e.id === t.outfit_id), i = (e) => {
		let n = t.overrides[e];
		return n !== void 0 && n !== "removed";
	}, a = /* @__PURE__ */ new Set();
	i("full_body") && (a.add("top"), a.add("bottom")), (i("top") || i("bottom")) && a.add("full_body");
	let o = e.flatMap((e) => {
		let n = t.overrides[e];
		return n === "removed" ? [] : n === void 0 ? a.has(e) ? [] : r?.slots[e] ?? [] : n;
	});
	return [...new Set(o)];
}
function i(e, t) {
	return [.../* @__PURE__ */ new Set([...r(e, t), ...e.conditions])];
}
function a(e, t, r) {
	return t.find((t) => t.character_id === e.id) ?? n(e, r);
}
function o(e, t, n) {
	let r = new Set(t.map((e) => e.trim().toLowerCase())), i = e.split(",").map((e) => e.trim()).filter((e) => e !== ""), a = i.findIndex((e) => r.has(e.toLowerCase())), o = i.filter((e) => !r.has(e.toLowerCase())), s = a === -1 ? o.length : a;
	return [
		...o.slice(0, s),
		...n,
		...o.slice(s)
	].join(", ");
}
//#endregion
//#region src/modules/illustration/library_match.ts
var s = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
function c(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function l(e, t) {
	let n = t.trim();
	return n === "" ? !1 : s.test(n) ? e.toLowerCase().includes(n.toLowerCase()) : RegExp(`(?<![\\p{L}\\p{N}])${c(n)}(?![\\p{L}\\p{N}])`, "iu").test(e);
}
function u(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function d(e, t) {
	return [e.name, ...e.aliases].some((e) => u(e, t));
}
function f(e, t) {
	return e.flatMap((e) => {
		let n = t.characters.find((t) => d(t, e));
		return n === void 0 ? [] : [n];
	});
}
function p(e, t, n, r) {
	return {
		characters: n.characters.filter((n) => [n.name, ...n.aliases].some((t) => l(e, t)) || t.some((e) => d(n, e))).map((e) => ({
			character: e,
			outfit_tags: i(a(e, r, n.outfits), n.outfits)
		})),
		outfit_names: n.outfits.map((e) => e.name)
	};
}
//#endregion
export { n as a, a as c, l as i, i as l, d as n, r as o, p as r, o as s, f as t };
