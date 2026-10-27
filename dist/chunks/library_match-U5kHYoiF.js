import { c as e, t } from "./wardrobe_library-CZLkOF9h.js";
//#region src/modules/illustration/model_json.ts
var n = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu, r = /```(?:json)?\s*([\s\S]*?)```/giu;
function i(e, t) {
	for (let n = e.lastIndexOf("}"); n >= 0; n = e.lastIndexOf("}", n - 1)) {
		let r = 0;
		for (let i = n; i >= 0; --i) {
			let a = e[i];
			if (a === "}") r += 1;
			else if (a === "{" && (--r, r === 0)) {
				let r = e.slice(i, n + 1);
				if (r.includes(`"${t}"`)) return r;
				break;
			}
		}
	}
	return null;
}
function a(e, t) {
	let a = e.replace(n, "").trim(), o = [...a.matchAll(r)].map((e) => (e[1] ?? "").trim()).reverse(), s = i(a, t);
	return [
		a,
		...o,
		...s === null ? [] : [s]
	];
}
//#endregion
//#region src/modules/wardrobe/wearing.ts
function o(e, n) {
	return {
		character_id: e.id,
		outfit_id: t(e, n)?.id ?? null,
		overrides: {},
		conditions: []
	};
}
function s(t, n) {
	let r = n.find((e) => e.id === t.outfit_id), i = e.flatMap((e) => {
		let n = t.overrides[e];
		return n === "removed" ? [] : n ?? r?.slots[e] ?? [];
	});
	return [.../* @__PURE__ */ new Set([...i, ...t.conditions])];
}
function c(e, t, n) {
	return t.find((t) => t.character_id === e.id) ?? o(e, n);
}
function l(e, t, n) {
	let r = new Set(t.map((e) => e.trim().toLowerCase())), i = e.split(",").map((e) => e.trim()).filter((e) => e !== ""), a = i.findIndex((e) => r.has(e.toLowerCase())), o = i.filter((e) => !r.has(e.toLowerCase())), s = a === -1 ? o.length : a;
	return [
		...o.slice(0, s),
		...n,
		...o.slice(s)
	].join(", ");
}
//#endregion
//#region src/modules/illustration/library_match.ts
var u = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
function d(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function f(e, t) {
	let n = t.trim();
	return n === "" ? !1 : u.test(n) ? e.toLowerCase().includes(n.toLowerCase()) : RegExp(`(?<![\\p{L}\\p{N}])${d(n)}(?![\\p{L}\\p{N}])`, "iu").test(e);
}
function p(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function m(e, t) {
	return [e.name, ...e.aliases].some((e) => p(e, t));
}
function h(e, t) {
	return e.flatMap((e) => {
		let n = t.characters.find((t) => m(t, e));
		return n === void 0 ? [] : [n];
	});
}
function g(e, t, n, r) {
	return {
		characters: n.characters.filter((n) => [n.name, ...n.aliases].some((t) => f(e, t)) || t.some((e) => m(n, e))).map((e) => ({
			character: e,
			outfit_tags: s(c(e, r, n.outfits), n.outfits)
		})),
		outfit_names: n.outfits.map((e) => e.name)
	};
}
//#endregion
export { o as a, s as c, f as i, a as l, m as n, l as o, g as r, c as s, h as t };
