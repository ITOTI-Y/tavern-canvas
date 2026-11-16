import { C as e, F as t, M as n, R as r, T as i, dt as a, g as o, gt as s, h as c, j as l, m as u, mt as d, p as f, pt as p, q as m, v as h, x as g, y as _ } from "./vue-i18n-XoxYzLIP.js";
import { n as v } from "./portal_keys-DthxrmWp.js";
import { t as y } from "./AppIcon-DD754F_c.js";
import { t as b } from "./components_styles-BXC5Dc_L.js";
import { t as x } from "./x-CyHrRl6n.js";
import { n as S } from "./_prop_utils-CvImpN6J.js";
import { a as C, c as w, i as T, l as E, o as D, r as O } from "./IconButton-CPI-A0bT.js";
//#endregion
//#region src/ui/components/AppDialog.vue
var k = /* @__PURE__ */ g({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(g, { emit: k }) {
		let A = k;
		function j(e) {
			A("update:open", e);
		}
		let M = i(v, void 0), N = f(() => M ? { to: M } : {}), P = !1;
		function F(e) {
			P = e.composedPath().some((e) => e instanceof HTMLElement && e.dataset.dismissableLayer !== void 0);
		}
		function I(e) {
			P && e.preventDefault();
		}
		return n(() => {
			window.addEventListener("pointerdown", F, !0);
		}), l(() => {
			window.removeEventListener("pointerdown", F, !0);
		}), (n, i) => (t(), c(a(E), {
			open: g.open,
			"onUpdate:open": j
		}, {
			default: m(() => [_(a(S), d(e(N.value)), {
				default: m(() => [_(a(T), { class: p(a(b).dialogOverlay) }, null, 8, ["class"]), _(a(D), {
					class: p(a(b).dialogContent),
					onPointerDownOutside: I
				}, {
					default: m(() => [
						u("header", { class: p(a(b).dialogHeader) }, [_(a(O), { class: p(a(b).dialogTitle) }, {
							default: m(() => [h(s(g.title), 1)]),
							_: 1
						}, 8, ["class"]), _(a(w), {
							class: p(["tc-interactive", a(b).dialogClose]),
							"aria-label": g.closeLabel
						}, {
							default: m(() => [_(y, {
								icon: a(x),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						g.description ? (t(), c(a(C), {
							key: 0,
							class: p(a(b).dialogDescription)
						}, {
							default: m(() => [h(s(g.description), 1)]),
							_: 1
						}, 8, ["class"])) : o("", !0),
						u("div", { class: p(a(b).dialogBody) }, [r(n.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
});
//#endregion
export { k as t };
