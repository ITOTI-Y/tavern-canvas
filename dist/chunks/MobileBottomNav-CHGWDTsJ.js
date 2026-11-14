import { t as e } from "./shell.module-Bkh0ofYg.js";
import { F as t, L as n, _ as r, dt as i, gt as a, m as o, n as s, p as c, pt as l, u, x as d, y as f } from "./vue-i18n-XoxYzLIP.js";
import { t as p } from "./AppIcon-DD754F_c.js";
import { n as m, t as h } from "./route_nav-CLGBgaEt.js";
//#region src/ui/shell/MobileBottomNav.vue?vue&type=script&setup=true&lang.ts
var g = [
	"data-selected",
	"aria-current",
	"onClick"
], _ = /* @__PURE__ */ d({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(d, { emit: _ }) {
		let v = d, y = _, { t: b } = s(), x = c(() => h.map((e) => ({
			...e,
			label: m(b, e.route)
		})));
		return (s, c) => (t(), r("nav", {
			class: l(i(e).bottom_nav),
			"data-testid": "studio-bottom-nav"
		}, [(t(!0), r(u, null, n(x.value, (n) => (t(), r("button", {
			key: n.route,
			type: "button",
			class: l(["tc-interactive", i(e).bottom_nav_item]),
			"data-selected": n.route === v.route,
			"aria-current": n.route === v.route ? "page" : void 0,
			onClick: (e) => y("select", n.route)
		}, [f(p, {
			icon: n.icon,
			size: 20
		}, null, 8, ["icon"]), o("span", { class: l(i(e).bottom_nav_item_label) }, a(n.label), 3)], 10, g))), 128))], 2));
	}
});
//#endregion
export { _ as default };
