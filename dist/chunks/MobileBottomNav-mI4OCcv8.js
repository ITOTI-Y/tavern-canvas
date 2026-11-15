import { t as e } from "./shell.module-Bkh0ofYg.js";
import { I as t, R as n, S as r, _t as i, b as a, d as o, ft as s, h as c, m as l, mt as u, n as d, v as f } from "./vue-i18n-BQWz_HuU.js";
import { t as p } from "./AppIcon-B1iv8vRB.js";
import { n as m, t as h } from "./route_nav-5KhCah_z.js";
//#region src/ui/shell/MobileBottomNav.vue?vue&type=script&setup=true&lang.ts
var g = [
	"data-selected",
	"aria-current",
	"onClick"
], _ = /* @__PURE__ */ r({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(r, { emit: _ }) {
		let v = r, y = _, { t: b } = d(), x = l(() => h.map((e) => ({
			...e,
			label: m(b, e.route)
		})));
		return (r, l) => (t(), f("nav", {
			class: u(s(e).bottom_nav),
			"data-testid": "studio-bottom-nav"
		}, [(t(!0), f(o, null, n(x.value, (n) => (t(), f("button", {
			key: n.route,
			type: "button",
			class: u(["tc-interactive", s(e).bottom_nav_item]),
			"data-selected": n.route === v.route,
			"aria-current": n.route === v.route ? "page" : void 0,
			onClick: (e) => y("select", n.route)
		}, [a(p, {
			icon: n.icon,
			size: 20
		}, null, 8, ["icon"]), c("span", { class: u(s(e).bottom_nav_item_label) }, i(n.label), 3)], 10, g))), 128))], 2));
	}
});
//#endregion
export { _ as default };
