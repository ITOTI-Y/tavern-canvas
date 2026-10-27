import { B as e, I as t, N as n, _ as r, ct as i, g as a, m as o, p as s, pt as c, ut as l, v as u, x as d } from "./vue-i18n-DUz2Gjn8.js";
import { n as f } from "./AppIcon-Cnhzrx9o.js";
import { r as p } from "./StateSurface-C9BHPFzJ.js";
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
		let f = d, m = e(), v = e(), y = e(), b = s(() => {
			if (f.error) return y;
			if (f.hint) return v;
		});
		return (e, s) => (n(), r("div", { class: l(i(p).fieldGroup) }, [
			o("label", {
				for: i(m),
				class: l(i(p).fieldGroupLabel)
			}, [u(c(d.label) + " ", 1), d.required ? (n(), r("span", {
				key: 0,
				class: l(i(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : a("", !0)], 10, h),
			t(e.$slots, "default", {
				fieldId: i(m),
				describedBy: b.value,
				invalid: !!d.error
			}),
			d.error ? (n(), r("p", {
				key: 0,
				id: i(y),
				class: l(i(p).fieldGroupError),
				role: "alert"
			}, c(d.error), 11, g)) : d.hint ? (n(), r("p", {
				key: 1,
				id: i(v),
				class: l(i(p).fieldGroupHint)
			}, c(d.hint), 11, _)) : a("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };
