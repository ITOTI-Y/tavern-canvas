import { t as e } from "./shell.module-vwMcpviy.js";
import { F as t, N as n, U as r, _ as i, ft as a, h as o, lt as s, m as c, n as l, p as u, st as d, u as f, v as p, x as m, y as h } from "./vue-i18n-D0uIxSJk.js";
import { t as g } from "./AppIcon-C3iVkJ88.js";
import { a as _, r as v } from "./route_nav-CynI56Wc.js";
import { a as y, i as b, n as x, r as S, t as C } from "./TooltipTrigger-B-A-Rt57.js";
import { t as w } from "./use_portal_target-Bu49Bio9.js";
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
		let D = m, O = E, { t: k } = l(), A = w(), j = u(() => v.map((e) => ({
			...e,
			label: _(k, e.route)
		})));
		return (l, u) => (n(), o(d(y), { "delay-duration": 300 }, {
			default: r(() => [c("nav", { class: s(d(e).rail) }, [(n(!0), i(f, null, t(j.value, (t) => (n(), o(d(b), { key: t.route }, {
				default: r(() => [h(d(C), { "as-child": "" }, {
					default: r(() => [c("button", {
						type: "button",
						class: s(["tc-interactive", d(e).rail_button]),
						"data-selected": t.route === D.route,
						"aria-current": t.route === D.route ? "page" : void 0,
						"aria-label": t.label,
						onClick: (e) => O("select", t.route)
					}, [h(g, {
						icon: t.icon,
						size: 20
					}, null, 8, ["icon"])], 10, T)]),
					_: 2
				}, 1024), h(d(x), { to: d(A) }, {
					default: r(() => [h(d(S), {
						class: s(d(e).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: r(() => [p(a(t.label), 1)]),
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
