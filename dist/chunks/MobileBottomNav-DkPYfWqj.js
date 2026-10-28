import { t as e } from "./shell.module-d_8aga09.js";
import { F as t, N as n, _ as r, ct as i, m as a, n as o, p as s, pt as c, u as l, ut as u, x as d, y as f } from "./vue-i18n-DUz2Gjn8.js";
import { t as p } from "./AppIcon-Cnhzrx9o.js";
import { n as m, t as h } from "./route_nav-BrwZiRD4.js";
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
		let v = d, y = _, { t: b } = o(), x = s(() => h.map((e) => ({
			...e,
			label: m(b, e.route)
		})));
		return (o, s) => (n(), r("nav", {
			class: u(i(e).bottom_nav),
			"data-testid": "studio-bottom-nav"
		}, [(n(!0), r(l, null, t(x.value, (t) => (n(), r("button", {
			key: t.route,
			type: "button",
			class: u(["tc-interactive", i(e).bottom_nav_item]),
			"data-selected": t.route === v.route,
			"aria-current": t.route === v.route ? "page" : void 0,
			onClick: (e) => y("select", t.route)
		}, [f(p, {
			icon: t.icon,
			size: 20
		}, null, 8, ["icon"]), a("span", { class: u(i(e).bottom_nav_item_label) }, c(t.label), 3)], 10, g))), 128))], 2));
	}
});
//#endregion
export { _ as default };
