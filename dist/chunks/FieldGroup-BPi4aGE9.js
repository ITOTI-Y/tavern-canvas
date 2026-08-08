import { H as e, I as t, _ as n, b as r, ft as i, g as a, ht as o, r as s, ut as c, w as l, x as u, y as d, z as f } from "./AppIcon-BpY-A4VH.js";
import { r as p } from "./StateSurface-CNBIMTjV.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/plus.js
var m = s("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), h = ["for"], g = ["id"], _ = ["id"], v = /* @__PURE__ */ l({
	__name: "FieldGroup",
	props: {
		label: {},
		hint: {},
		error: { default: null },
		required: {
			type: Boolean,
			default: !1
		}
	},
	setup(s) {
		let l = s, m = e(), v = e(), y = e(), b = a(() => {
			if (l.error) return y;
			if (l.hint) return v;
		});
		return (e, a) => (t(), r("div", { class: i(c(p).fieldGroup) }, [
			n("label", {
				for: c(m),
				class: i(c(p).fieldGroupLabel)
			}, [u(o(s.label) + " ", 1), s.required ? (t(), r("span", {
				key: 0,
				class: i(c(p).fieldGroupRequired),
				"aria-hidden": "true"
			}, "*", 2)) : d("", !0)], 10, h),
			f(e.$slots, "default", {
				fieldId: c(m),
				describedBy: b.value,
				invalid: !!s.error
			}),
			s.error ? (t(), r("p", {
				key: 0,
				id: c(y),
				class: i(c(p).fieldGroupError),
				role: "alert"
			}, o(s.error), 11, g)) : s.hint ? (t(), r("p", {
				key: 1,
				id: c(v),
				class: i(c(p).fieldGroupHint)
			}, o(s.hint), 11, _)) : d("", !0)
		], 2));
	}
});
//#endregion
export { m as n, v as t };

//# sourceMappingURL=FieldGroup-BPi4aGE9.js.map