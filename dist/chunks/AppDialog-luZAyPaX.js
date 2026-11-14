import { C as e, F as t, R as n, T as r, dt as i, g as a, gt as o, h as s, m as c, mt as l, p as u, pt as d, q as f, v as p, x as m, y as h } from "./vue-i18n-XoxYzLIP.js";
import { n as g } from "./portal_keys-DthxrmWp.js";
import { t as _ } from "./AppIcon-DD754F_c.js";
import { t as v } from "./components_styles-BXC5Dc_L.js";
import { t as y } from "./x-CyHrRl6n.js";
import { n as b } from "./_prop_utils-CvImpN6J.js";
import { a as x, c as S, i as C, l as w, o as T, r as E } from "./IconButton-CPI-A0bT.js";
//#endregion
//#region src/ui/components/AppDialog.vue
var D = /* @__PURE__ */ m({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(m, { emit: D }) {
		let O = D;
		function k(e) {
			O("update:open", e);
		}
		let A = r(g, void 0), j = u(() => A ? { to: A } : {});
		return (r, u) => (t(), s(i(w), {
			open: m.open,
			"onUpdate:open": k
		}, {
			default: f(() => [h(i(b), l(e(j.value)), {
				default: f(() => [h(i(C), { class: d(i(v).dialogOverlay) }, null, 8, ["class"]), h(i(T), { class: d(i(v).dialogContent) }, {
					default: f(() => [
						c("header", { class: d(i(v).dialogHeader) }, [h(i(E), { class: d(i(v).dialogTitle) }, {
							default: f(() => [p(o(m.title), 1)]),
							_: 1
						}, 8, ["class"]), h(i(S), {
							class: d(["tc-interactive", i(v).dialogClose]),
							"aria-label": m.closeLabel
						}, {
							default: f(() => [h(_, {
								icon: i(y),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						m.description ? (t(), s(i(x), {
							key: 0,
							class: d(i(v).dialogDescription)
						}, {
							default: f(() => [p(o(m.description), 1)]),
							_: 1
						}, 8, ["class"])) : a("", !0),
						c("div", { class: d(i(v).dialogBody) }, [n(r.$slots, "default")], 2)
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
export { D as t };
