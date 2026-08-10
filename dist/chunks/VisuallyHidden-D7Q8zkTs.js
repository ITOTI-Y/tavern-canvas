import { I as e, N as t, U as n, h as r, st as i, x as a } from "./vue-i18n-D0uIxSJk.js";
import { i as o } from "./Teleport-CfSgxnHY.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var s = /* @__PURE__ */ a({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(a) {
		return (a, s) => (t(), r(i(o), {
			as: a.as,
			"as-child": a.asChild,
			"aria-hidden": a.feature === "focusable" || a.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": a.feature === "fully-hidden" ? "" : void 0,
			tabindex: a.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: n(() => [e(a.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
});
//#endregion
export { s as t };
