import { N as e, W as t, ct as n, h as r, m as i, p as a, ut as o, x as s, y as c } from "./vue-i18n-DUz2Gjn8.js";
import { t as l } from "./AppIcon-Cnhzrx9o.js";
import { t as u } from "./components_styles-AQk4evuq.js";
import { t as d } from "./AppTooltip-CUidZ-oG.js";
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
		}, v = a(() => g[m.size]), y = a(() => _[m.size]);
		function b(e) {
			m.disabled || h("click", e);
		}
		return (a, p) => (e(), r(d, { content: s.tooltip ?? s.label }, {
			default: t(() => [i("button", {
				type: "button",
				class: o(["tc-interactive", [
					n(u).iconButton,
					v.value,
					s.destructive && n(u).iconButtonDestructive,
					s.pressed === !0 && n(u).iconButtonPressed
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
