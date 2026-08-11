import { L as e, N as t, h as n, w as r, x as i } from "./vue-i18n-DUz2Gjn8.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/shared/src/utils/hasA11yProp.js
var a = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, o = (e) => e === "", s = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), c = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), l = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), u = (e) => {
	let t = l(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, d = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, f = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": i, strokeWidth: l, "stroke-width": f, size: p = d.width, color: m = d.stroke, ...h }, { slots: g }) => r("svg", {
	...d,
	...h,
	width: p,
	height: p,
	stroke: m,
	"stroke-width": o(n) || o(i) || n === !0 || i === !0 ? Number(l || f || d["stroke-width"]) * 24 / Number(p) : l || f || d["stroke-width"],
	class: s("lucide", h.class, ...e ? [`lucide-${c(u(e))}-icon`, `lucide-${c(e)}`] : ["lucide-icon"]),
	...!g.default && !a(h) && { "aria-hidden": "true" }
}, [...t.map((e) => r(...e)), ...g.default ? [g.default()] : []]), p = (e, t) => (n, { slots: i, attrs: a }) => r(f, {
	...a,
	...n,
	iconNode: t,
	name: e
}, i), m = 1.75, h = /* @__PURE__ */ i({
	__name: "AppIcon",
	props: {
		icon: {},
		size: { default: 20 },
		label: { default: void 0 }
	},
	setup(r) {
		return (i, a) => (t(), n(e(r.icon), {
			size: r.size,
			"stroke-width": m,
			role: r.label ? "img" : void 0,
			"aria-label": r.label,
			"aria-hidden": r.label ? void 0 : "true"
		}, null, 8, [
			"size",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
});
//#endregion
export { p as n, h as t };
