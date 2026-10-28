import { C as e, G as t, L as n, P as r, T as i, dt as a, ft as o, g as s, h as c, lt as l, m as u, mt as d, p as f, v as p, x as m, y as h } from "./vue-i18n-L-BrQRnK.js";
import { n as g } from "./portal_keys-DthxrmWp.js";
import { t as _ } from "./AppIcon-DkyxvN8k.js";
import { t as v } from "./components_styles-DfkKC2VR.js";
import { t as y } from "./x-D7Ry5i_D.js";
import { n as b } from "./_prop_utils-DgoYzKlR.js";
import { a as x, c as S, i as C, l as w, o as T, r as E } from "./IconButton-Co--h1UV.js";
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
		return (i, f) => (r(), c(l(w), {
			open: m.open,
			"onUpdate:open": k
		}, {
			default: t(() => [h(l(b), o(e(j.value)), {
				default: t(() => [h(l(C), { class: a(l(v).dialogOverlay) }, null, 8, ["class"]), h(l(T), { class: a(l(v).dialogContent) }, {
					default: t(() => [
						u("header", { class: a(l(v).dialogHeader) }, [h(l(E), { class: a(l(v).dialogTitle) }, {
							default: t(() => [p(d(m.title), 1)]),
							_: 1
						}, 8, ["class"]), h(l(S), {
							class: a(["tc-interactive", l(v).dialogClose]),
							"aria-label": m.closeLabel
						}, {
							default: t(() => [h(_, {
								icon: l(y),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						m.description ? (r(), c(l(x), {
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
