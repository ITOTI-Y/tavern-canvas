import { L as e, N as t, h as n, x as r } from "./vue-i18n-CmRk7RjK.js";
//#region src/ui/components/AppIcon.vue?vue&type=script&setup=true&lang.ts
var i = 1.75, a = /* @__PURE__ */ r({
	__name: "AppIcon",
	props: {
		icon: {},
		size: { default: 20 },
		label: {}
	},
	setup(r) {
		return (a, o) => (t(), n(e(r.icon), {
			size: r.size,
			"stroke-width": i,
			role: r.label ? "img" : void 0,
			"aria-label": r.label,
			"aria-hidden": r.label ? void 0 : "true"
		}, null, 8, [
			"size",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
});
//#endregion
export { a as t };
