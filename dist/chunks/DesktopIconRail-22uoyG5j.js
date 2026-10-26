import { t as e } from "./shell.module-BO7qLX9Z.js";
import { F as t, N as n, W as r, _ as i, ct as a, h as o, m as s, n as c, p as l, pt as u, u as d, ut as f, v as p, x as m, y as h } from "./vue-i18n-DUz2Gjn8.js";
import { t as g } from "./AppIcon-Cnhzrx9o.js";
import { n as _, t as v } from "./route_nav-BrwZiRD4.js";
import { a as y, i as b, n as x, r as S, t as C } from "./TooltipTrigger-DaKXNAcF.js";
import { t as w } from "./use_portal_target-DcUqGXJq.js";
//#region src/ui/shell/DesktopIconRail.vue?vue&type=script&setup=true&lang.ts
var T = [
	"data-selected",
	"aria-current",
	"aria-label",
	"onClick"
], E = /* @__PURE__ */ m({
	__name: "DesktopIconRail",
	props: { route: {} },
	emits: ["select"],
	setup(m, { emit: E }) {
		let D = m, O = E, { t: k } = c(), A = w(), j = l(() => v.map((e) => ({
			...e,
			label: _(k, e.route)
		})));
		return (c, l) => (n(), o(a(y), { "delay-duration": 300 }, {
			default: r(() => [s("nav", {
				class: f(a(e).rail),
				"data-testid": "studio-rail"
			}, [(n(!0), i(d, null, t(j.value, (t) => (n(), o(a(b), { key: t.route }, {
				default: r(() => [h(a(C), { "as-child": "" }, {
					default: r(() => [s("button", {
						type: "button",
						class: f(["tc-interactive", a(e).rail_button]),
						"data-selected": t.route === D.route,
						"aria-current": t.route === D.route ? "page" : void 0,
						"aria-label": t.label,
						onClick: (e) => O("select", t.route)
					}, [h(g, {
						icon: t.icon,
						size: 20
					}, null, 8, ["icon"])], 10, T)]),
					_: 2
				}, 1024), h(a(x), { to: a(A) }, {
					default: r(() => [h(a(S), {
						class: f(a(e).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: r(() => [p(u(t.label), 1)]),
						_: 2
					}, 1032, ["class"])]),
					_: 2
				}, 1032, ["to"])]),
				_: 2
			}, 1024))), 128))], 2)]),
			_: 1
		}));
	}
});
//#endregion
export { E as default };
