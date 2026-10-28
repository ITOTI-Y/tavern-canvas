import { s as e, t } from "./wardrobe_library-cpT1rkQA.js";
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
	let r = n.find((e) => e.id === t.outfit_id), i = e.flatMap((e) => {
		let n = t.overrides[e];
		return n === "removed" ? [] : n ?? r?.slots[e] ?? [];
	});
	return [.../* @__PURE__ */ new Set([...i, ...t.conditions])];
}
function i(e, t, r) {
	return t.find((t) => t.character_id === e.id) ?? n(e, r);
}
function a(e, t, n) {
	let r = new Set(t.map((e) => e.trim().toLowerCase())), i = e.split(",").map((e) => e.trim()).filter((e) => e !== ""), a = i.findIndex((e) => r.has(e.toLowerCase())), o = i.filter((e) => !r.has(e.toLowerCase())), s = a === -1 ? o.length : a;
	return [
		...o.slice(0, s),
		...n,
		...o.slice(s)
	].join(", ");
}
//#endregion
//#region src/modules/illustration/library_match.ts
var o = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
function s(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function c(e, t) {
	let n = t.trim();
	return n === "" ? !1 : o.test(n) ? e.toLowerCase().includes(n.toLowerCase()) : RegExp(`(?<![\\p{L}\\p{N}])${s(n)}(?![\\p{L}\\p{N}])`, "iu").test(e);
}
function l(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function u(e, t) {
	return [e.name, ...e.aliases].some((e) => l(e, t));
}
function d(e, t) {
	return e.flatMap((e) => {
		let n = t.characters.find((t) => u(t, e));
		return n === void 0 ? [] : [n];
	});
}
function f(e, t, n, a) {
	return {
		characters: n.characters.filter((n) => [n.name, ...n.aliases].some((t) => c(e, t)) || t.some((e) => u(n, e))).map((e) => ({
			character: e,
			outfit_tags: r(i(e, a, n.outfits), n.outfits)
		})),
		outfit_names: n.outfits.map((e) => e.name)
	};
}
//#endregion
//#region src/modules/illustration/model_json.ts
var p = /<(think|thinking|reasoning)>[\s\S]*?<\/\1>/giu, m = /```(?:json)?\s*([\s\S]*?)```/giu;
function h(e, t) {
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
function g(e, t) {
	let n = e.replace(p, "").trim(), r = [...n.matchAll(m)].map((e) => (e[1] ?? "").trim()).reverse(), i = h(n, t);
	return [
		n,
		...r,
		...i === null ? [] : [i]
	];
}
//#endregion
export { c as a, i as c, f as i, r as l, d as n, n as o, u as r, a as s, g as t };
