import { L as e, P as t, V as n, _ as r, dt as i, g as a, lt as o, m as s, mt as c, p as l, v as u, x as d } from "./vue-i18n-L-BrQRnK.js";
import { n as f } from "./AppIcon-DkyxvN8k.js";
import { t as p } from "./components_styles-DHX8irr3.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/plus.js
var m = f("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), h = ["for"], g = ["id"], _ = ["id"], v = /* @__PURE__ */ d({
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
	setup(d) {
		let f = d, m = n(), v = n(), y = n(), b = l(() => {
			if (f.error) return y;
			if (f.hint) return v;
		});
		return (n, l) => (t(), r("div", { class: i(o(p).fieldGroup) }, [
			s("label", {
				for: o(m),
				class: i(o(p).fieldGroupLabel)
			}, [u(c(d.label) + " ", 1), d.required ? (t(), r("span", {
				key: 0,
				class: i(o(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : a("", !0)], 10, h),
			e(n.$slots, "default", {
				fieldId: o(m),
				describedBy: b.value,
				invalid: !!d.error
			}),
			d.error ? (t(), r("p", {
				key: 0,
				id: o(y),
				class: i(o(p).fieldGroupError),
				role: "alert"
			}, c(d.error), 11, g)) : d.hint ? (t(), r("p", {
				key: 1,
				id: o(v),
				class: i(o(p).fieldGroupHint)
			}, c(d.hint), 11, _)) : a("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };
