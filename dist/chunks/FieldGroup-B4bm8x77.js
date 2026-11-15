import { I as e, S as t, U as n, _ as r, _t as i, ft as a, h as o, m as s, mt as c, v as l, y as u, z as d } from "./vue-i18n-BQWz_HuU.js";
import { n as f } from "./AppIcon-B1iv8vRB.js";
import { t as p } from "./components_styles-Cab5IILs.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/plus.js
var m = f("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), h = ["for"], g = ["id"], _ = ["id"], v = /* @__PURE__ */ t({
	__name: "FieldGroup",
	props: {
		label: {},
		hint: { default: void 0 },
		error: { default: null },
		required: {
			type: Boolean,
			default: !1
		}
	},
	setup(t) {
		let f = t, m = n(), v = n(), y = n(), b = s(() => {
			if (f.error) return y;
			if (f.hint) return v;
		});
		return (n, s) => (e(), l("div", { class: c(a(p).fieldGroup) }, [
			o("label", {
				for: a(m),
				class: c(a(p).fieldGroupLabel)
			}, [u(i(t.label) + " ", 1), t.required ? (e(), l("span", {
				key: 0,
				class: c(a(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : r("", !0)], 10, h),
			d(n.$slots, "default", {
				fieldId: a(m),
				describedBy: b.value,
				invalid: !!t.error
			}),
			t.error ? (e(), l("p", {
				key: 0,
				id: a(y),
				class: c(a(p).fieldGroupError),
				role: "alert"
			}, i(t.error), 11, g)) : t.hint ? (e(), l("p", {
				key: 1,
				id: a(v),
				class: c(a(p).fieldGroupHint)
			}, i(t.hint), 11, _)) : r("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };
