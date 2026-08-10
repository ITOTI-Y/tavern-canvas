import { t as e } from "./shell.module-vwMcpviy.js";
import { F as t, L as n, N as r, U as i, _ as a, ft as o, h as s, lt as c, m as l, n as u, p as d, st as f, u as p, v as m, x as h, y as g } from "./vue-i18n-D0uIxSJk.js";
import { i as _, o as v, t as y } from "./route_nav-DgPwdX5c.js";
import { a as b, i as x, n as S, r as C, t as w } from "./TooltipTrigger-B-A-Rt57.js";
import { t as T } from "./use_portal_target-Bu49Bio9.js";
//#region src/ui/shell/DesktopIconRail.vue?vue&type=script&setup=true&lang.ts
var E = [
	"data-selected",
	"aria-current",
	"aria-label",
	"onClick"
], D = /* @__PURE__ */ h({
	__name: "DesktopIconRail",
	props: { route: {} },
	emits: ["select"],
	setup(h, { emit: D }) {
		let O = h, k = D, { t: A } = u(), j = T(), M = d(() => _.map((e) => ({
			...e,
			label: v(A, e.route)
		})));
		return (u, d) => (r(), s(f(b), { "delay-duration": 300 }, {
			default: i(() => [l("nav", { class: c(f(e).rail) }, [(r(!0), a(p, null, t(M.value, (t) => (r(), s(f(x), { key: t.route }, {
				default: i(() => [g(f(w), { "as-child": "" }, {
					default: i(() => [l("button", {
						type: "button",
						class: c(["tc-interactive", f(e).rail_button]),
						"data-selected": t.route === O.route,
						"aria-current": t.route === O.route ? "page" : void 0,
						"aria-label": t.label,
						onClick: (e) => k("select", t.route)
					}, [(r(), s(n(t.icon), {
						size: 20,
						"stroke-width": f(y),
						"aria-hidden": "true"
					}, null, 8, ["stroke-width"]))], 10, E)]),
					_: 2
				}, 1024), g(f(S), { to: f(j) }, {
					default: i(() => [g(f(C), {
						class: c(f(e).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: i(() => [m(o(t.label), 1)]),
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
export { D as default };
