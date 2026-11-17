import { F as e, H as t, R as n, _ as r, dt as i, g as a, gt as o, m as s, p as c, pt as l, v as u, x as d } from "./vue-i18n-XoxYzLIP.js";
import { n as f } from "./AppIcon-DD754F_c.js";
import { t as p } from "./components_styles-CTlfgDU5.js";
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
		let f = d, m = t(), v = t(), y = t(), b = c(() => {
			if (f.error) return y;
			if (f.hint) return v;
		});
		return (t, c) => (e(), r("div", { class: l(i(p).fieldGroup) }, [
			s("label", {
				for: i(m),
				class: l(i(p).fieldGroupLabel)
			}, [u(o(d.label) + " ", 1), d.required ? (e(), r("span", {
				key: 0,
				class: l(i(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : a("", !0)], 10, h),
			n(t.$slots, "default", {
				fieldId: i(m),
				describedBy: b.value,
				invalid: !!d.error
			}),
			d.error ? (e(), r("p", {
				key: 0,
				id: i(y),
				class: l(i(p).fieldGroupError),
				role: "alert"
			}, o(d.error), 11, g)) : d.hint ? (e(), r("p", {
				key: 1,
				id: i(v),
				class: l(i(p).fieldGroupHint)
			}, o(d.hint), 11, _)) : a("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };
