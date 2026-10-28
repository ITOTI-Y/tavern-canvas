import { G as e, P as t, dt as n, h as r, lt as i, m as a, p as o, x as s, y as c } from "./vue-i18n-L-BrQRnK.js";
import { t as l } from "./AppIcon-DkyxvN8k.js";
import { t as u } from "./components_styles-DHX8irr3.js";
import { t as d } from "./AppTooltip-Dja5kx2K.js";
//#region src/ui/components/IconButton.vue?vue&type=script&setup=true&lang.ts
var f = [
	"aria-label",
	"aria-pressed",
	"disabled"
], p = /* @__PURE__ */ s({
	__name: "IconButton",
	props: {
		icon: {},
		label: {},
		tooltip: { default: void 0 },
		size: { default: "md" },
		pressed: {
			type: [Boolean, null],
			default: null
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		destructive: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["click"],
	setup(s, { emit: p }) {
		let m = s, h = p, g = {
			sm: u.iconButtonSm,
			md: u.iconButtonMd,
			lg: u.iconButtonLg
		}, _ = {
			sm: 16,
			md: 18,
			lg: 22
		}, v = o(() => g[m.size]), y = o(() => _[m.size]);
		function b(e) {
			m.disabled || h("click", e);
		}
		return (o, p) => (t(), r(d, { content: s.tooltip ?? s.label }, {
			default: e(() => [a("button", {
				type: "button",
				class: n(["tc-interactive", [
					i(u).iconButton,
					v.value,
					s.destructive && i(u).iconButtonDestructive,
					s.pressed === !0 && i(u).iconButtonPressed
				]]),
				"aria-label": s.label,
				"aria-pressed": s.pressed === null ? void 0 : s.pressed,
				disabled: s.disabled,
				onClick: b
			}, [c(l, {
				icon: s.icon,
				size: y.value
			}, null, 8, ["icon", "size"])], 10, f)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { p as t };
