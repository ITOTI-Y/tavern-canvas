import { C as e, D as t, I as n, N as r, T as i, U as a, _ as o, dt as s, ft as c, h as l, lt as u, m as d, p as f, st as p, ut as m, v as h, x as g, y as _ } from "./vue-i18n-D0uIxSJk.js";
import { r as v } from "./StateSurface-C7mKA32L.js";
import { t as y } from "./AppIcon-CXvmyYE2.js";
import { t as b } from "./portal_keys-gQ1cWdMS.js";
import { c as x, i as S } from "./Teleport-CfSgxnHY.js";
import { r as C } from "./PopperContent-K7T6sb7Y.js";
import { a as w, i as T, n as E, r as D, t as O } from "./TooltipTrigger-B-A-Rt57.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/component/Arrow.js
var k = {
	key: 0,
	d: "M0 0L6 6L12 0"
}, A = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
}, j = /* @__PURE__ */ g({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let i = e;
		return x(), (e, s) => (r(), l(p(S), t(i, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: a(() => [n(e.$slots, "default", {}, () => [e.rounded ? (r(), o("path", A)) : (r(), o("path", k))])]),
			_: 3
		}, 16, [
			"width",
			"height",
			"viewBox",
			"preserveAspectRatio"
		]));
	}
}), M = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, N = /* @__PURE__ */ g({
	inheritAttrs: !1,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: !1
		},
		height: {
			type: Number,
			required: !1
		},
		rounded: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let { forwardRef: i } = x(), c = C(), l = f(() => M[c.placedSide.value]);
		return (e, u) => (r(), o("span", {
			ref: (e) => {
				p(c).onArrowChange(e ?? void 0);
			},
			style: s({
				position: "absolute",
				left: p(c).arrowX?.value ? `${p(c).arrowX?.value}px` : void 0,
				top: p(c).arrowY?.value ? `${p(c).arrowY?.value}px` : void 0,
				[l.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[p(c).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[p(c).placedSide.value],
				visibility: p(c).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [_(j, t(e.$attrs, {
			ref: p(i),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: a(() => [n(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), P = /* @__PURE__ */ g({
	__name: "TooltipArrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(t) {
		let i = t;
		return x(), (t, o) => (r(), l(p(N), m(e(i)), {
			default: a(() => [n(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), F = /* @__PURE__ */ g({
	__name: "AppTooltip",
	props: {
		content: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		side: { default: "top" },
		delayDuration: { default: 300 }
	},
	setup(t) {
		let o = i(b, void 0), s = f(() => o ? { to: o } : {});
		return (i, o) => (r(), l(p(w), { "disable-hoverable-content": !1 }, {
			default: a(() => [_(p(T), {
				"delay-duration": t.delayDuration,
				disabled: t.disabled
			}, {
				default: a(() => [_(p(O), { "as-child": "" }, {
					default: a(() => [n(i.$slots, "default")]),
					_: 3
				}), _(p(E), m(e(s.value)), {
					default: a(() => [_(p(D), {
						side: t.side,
						"side-offset": 6,
						class: u(p(v).tooltipContent)
					}, {
						default: a(() => [h(c(t.content) + " ", 1), _(p(P), {
							class: u(p(v).tooltipArrow),
							width: 8,
							height: 5
						}, null, 8, ["class"])]),
						_: 1
					}, 8, ["side", "class"])]),
					_: 1
				}, 16)]),
				_: 3
			}, 8, ["delay-duration", "disabled"])]),
			_: 3
		}));
	}
}), I = [
	"aria-label",
	"aria-pressed",
	"disabled"
], L = /* @__PURE__ */ g({
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
	setup(e, { emit: t }) {
		let n = e, i = t, o = {
			sm: v.iconButtonSm,
			md: v.iconButtonMd,
			lg: v.iconButtonLg
		}, s = {
			sm: 16,
			md: 18,
			lg: 22
		}, c = f(() => o[n.size]), m = f(() => s[n.size]);
		function h(e) {
			n.disabled || i("click", e);
		}
		return (t, n) => (r(), l(F, { content: e.tooltip ?? e.label }, {
			default: a(() => [d("button", {
				type: "button",
				class: u(["tc-interactive", [
					p(v).iconButton,
					c.value,
					e.destructive && p(v).iconButtonDestructive,
					e.pressed === !0 && p(v).iconButtonPressed
				]]),
				"aria-label": e.label,
				"aria-pressed": e.pressed === null ? void 0 : e.pressed,
				disabled: e.disabled,
				onClick: h
			}, [_(y, {
				icon: e.icon,
				size: m.value
			}, null, 8, ["icon", "size"])], 10, I)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { L as t };
