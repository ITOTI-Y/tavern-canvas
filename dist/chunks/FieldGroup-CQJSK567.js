import { I as e, N as t, _ as n, ft as r, g as i, lt as a, m as o, p as s, st as c, v as l, x as u, z as d } from "./vue-i18n-D0uIxSJk.js";
import { t as f } from "./createLucideIcon-D9d_Lia0.js";
import { r as p } from "./StateSurface-C7mKA32L.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/plus.js
var m = f("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), h = ["for"], g = ["id"], _ = ["id"], v = /* @__PURE__ */ u({
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
	setup(u) {
		let f = u, m = d(), v = d(), y = d(), b = s(() => {
			if (f.error) return y;
			if (f.hint) return v;
		});
		return (s, d) => (t(), n("div", { class: a(c(p).fieldGroup) }, [
			o("label", {
				for: c(m),
				class: a(c(p).fieldGroupLabel)
			}, [l(r(u.label) + " ", 1), u.required ? (t(), n("span", {
				key: 0,
				class: a(c(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : i("", !0)], 10, h),
			e(s.$slots, "default", {
				fieldId: c(m),
				describedBy: b.value,
				invalid: !!u.error
			}),
			u.error ? (t(), n("p", {
				key: 0,
				id: c(y),
				class: a(c(p).fieldGroupError),
				role: "alert"
			}, r(u.error), 11, g)) : u.hint ? (t(), n("p", {
				key: 1,
				id: c(v),
				class: a(c(p).fieldGroupHint)
			}, r(u.hint), 11, _)) : i("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };
