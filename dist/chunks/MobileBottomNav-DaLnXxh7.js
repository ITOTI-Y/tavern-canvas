import { t as e } from "./shell.module-bsdu70fJ.js";
import { I as t, P as n, _ as r, dt as i, lt as a, m as o, mt as s, n as c, p as l, u, x as d, y as f } from "./vue-i18n-L-BrQRnK.js";
import { t as p } from "./AppIcon-DkyxvN8k.js";
import { n as m, t as h } from "./route_nav-CXLRDOo3.js";
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
		let v = d, y = _, { t: b } = c(), x = l(() => h.map((e) => ({
			...e,
			label: m(b, e.route)
		})));
		return (c, l) => (n(), r("nav", {
			class: i(a(e).bottom_nav),
			"data-testid": "studio-bottom-nav"
		}, [(n(!0), r(u, null, t(x.value, (t) => (n(), r("button", {
			key: t.route,
			type: "button",
			class: i(["tc-interactive", a(e).bottom_nav_item]),
			"data-selected": t.route === v.route,
			"aria-current": t.route === v.route ? "page" : void 0,
			onClick: (e) => y("select", t.route)
		}, [f(p, {
			icon: t.icon,
			size: 20
		}, null, 8, ["icon"]), o("span", { class: i(a(e).bottom_nav_item_label) }, s(t.label), 3)], 10, g))), 128))], 2));
	}
});
//#endregion
export { _ as default };
