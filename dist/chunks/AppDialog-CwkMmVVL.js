import { C as e, G as t, L as n, P as r, T as i, dt as a, ft as o, g as s, h as c, lt as l, m as u, mt as d, p as f, v as p, x as m, y as h } from "./vue-i18n-L-BrQRnK.js";
import { n as g } from "./portal_keys-DthxrmWp.js";
import { t as _ } from "./AppIcon-DkyxvN8k.js";
import { t as v } from "./components_styles-DHX8irr3.js";
import { t as y } from "./x-D7Ry5i_D.js";
import { a as b, c as x, i as S, n as C, r as w, s as T } from "./Collection-e6mvGbNy.js";
import { t as E } from "./DialogPortal-BX3_tTUP.js";
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
		let A = i(g, void 0), j = f(() => A ? { to: A } : {});
		return (i, f) => (r(), c(l(x), {
			open: m.open,
			"onUpdate:open": k
		}, {
			default: t(() => [h(l(E), o(e(j.value)), {
				default: t(() => [h(l(w), { class: a(l(v).dialogOverlay) }, null, 8, ["class"]), h(l(b), { class: a(l(v).dialogContent) }, {
					default: t(() => [
						u("header", { class: a(l(v).dialogHeader) }, [h(l(C), { class: a(l(v).dialogTitle) }, {
							default: t(() => [p(d(m.title), 1)]),
							_: 1
						}, 8, ["class"]), h(l(T), {
							class: a(["tc-interactive", l(v).dialogClose]),
							"aria-label": m.closeLabel
						}, {
							default: t(() => [h(_, {
								icon: l(y),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						m.description ? (r(), c(l(S), {
							key: 0,
							class: a(l(v).dialogDescription)
						}, {
							default: t(() => [p(d(m.description), 1)]),
							_: 1
						}, 8, ["class"])) : s("", !0),
						u("div", { class: a(l(v).dialogBody) }, [n(i.$slots, "default")], 2)
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
