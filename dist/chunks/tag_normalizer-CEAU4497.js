//#region src/modules/prompt/tag_normalizer.ts
var e = /\$([^$]+)\$/g, t = /^[([{<]+/, n = /[)\]}>]+$/, r = /^[\d.]+::/, i = /::$/, a = /:(?:\d*\.\d+|\d+)$/;
function o(e) {
	let o = e.toLowerCase(), s;
	do
		s = o, o = o.replace(t, ""), o = o.replace(n, ""), o = o.replace(r, ""), o = o.replace(i, ""), o = o.replace(a, ""), o = o.trim();
	while (o !== s);
	return o;
}
function s(e) {
	return e.toLowerCase() !== o(e);
}
function c(e) {
	return e.map((e) => e?.trim() ?? "").filter((e) => e.length > 0).join(", ");
}
function l(t) {
	if (!t) return "";
	let n = [], r = t.replace(e, (e) => (n.push(e), `__ST_JSON_TAG_${String(n.length - 1)}__`)).split(",").map((e) => e.trim()).filter((e) => e.length > 0);
	if (r.length === 0) return "";
	let i = /* @__PURE__ */ new Map();
	for (let e of r) {
		let t = e.replace(/__ST_JSON_TAG_(\d+)__/g, (e, t) => n[Number(t)] ?? ""), r = o(t), a = i.get(r);
		if (a === void 0) {
			i.set(r, t);
			continue;
		}
		!s(a) && s(t) && i.set(r, t);
	}
	return Array.from(i.values()).join(", ");
}
//#endregion
export { o as n, c as r, l as t };
