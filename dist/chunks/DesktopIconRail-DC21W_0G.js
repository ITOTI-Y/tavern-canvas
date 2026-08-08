import { F as e, L as t, N as n, U as r, _ as i, ft as a, h as o, lt as s, m as c, n as l, p as u, st as d, u as f, v as p, x as m, y as h } from "./vue-i18n-CmRk7RjK.js";
import { t as g } from "./shell.module-vwMcpviy.js";
import { i as _, o as v, t as y } from "./route_nav-CAxsCBUg.js";
import { a as b, i as x, n as S, r as C, t as w } from "./TooltipTrigger-C6sUtk2V.js";
import { t as T } from "./use_portal_target-r_aUtBuc.js";
//#region src/ui/shell/DesktopIconRail.vue?vue&type=script&setup=true&lang.ts
var E = [
	"data-selected",
	"aria-current",
	"aria-label",
	"onClick"
], D = /* @__PURE__ */ m({
	__name: "DesktopIconRail",
	props: { route: {} },
	emits: ["select"],
	setup(m, { emit: D }) {
		let O = m, k = D, { t: A } = l(), j = T(), M = u(() => _.map((e) => ({
			...e,
			label: v(A, e.route)
		})));
		return (l, u) => (n(), o(d(b), { "delay-duration": 300 }, {
			default: r(() => [c("nav", { class: s(d(g).rail) }, [(n(!0), i(f, null, e(M.value, (e) => (n(), o(d(x), { key: e.route }, {
				default: r(() => [h(d(w), { "as-child": "" }, {
					default: r(() => [c("button", {
						type: "button",
						class: s(["tc-interactive", d(g).rail_button]),
						"data-selected": e.route === O.route,
						"aria-current": e.route === O.route ? "page" : void 0,
						"aria-label": e.label,
						onClick: (t) => k("select", e.route)
					}, [(n(), o(t(e.icon), {
						size: 20,
						"stroke-width": d(y),
						"aria-hidden": "true"
					}, null, 8, ["stroke-width"]))], 10, E)]),
					_: 2
				}, 1024), h(d(S), { to: d(j) }, {
					default: r(() => [h(d(C), {
						class: s(d(g).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: r(() => [p(a(e.label), 1)]),
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
