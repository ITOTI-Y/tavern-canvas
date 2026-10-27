import { C as e, D as t, I as n, N as r, T as i, W as a, _ as o, ct as s, dt as c, ft as l, h as u, m as d, p as f, pt as p, ut as m, v as h, x as g, y as _ } from "./vue-i18n-DUz2Gjn8.js";
import { t as v } from "./AppIcon-Cnhzrx9o.js";
import { r as y } from "./StateSurface-Bo_sA18G.js";
import { t as b } from "./portal_keys-gQ1cWdMS.js";
import { c as x, i as S } from "./Teleport-C7mDSUEl.js";
import { n as C } from "./PopperContent-a3U-C0mc.js";
import { a as w, i as T, n as E, r as D, t as O } from "./TooltipTrigger-DaKXNAcF.js";
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
		return x(), (e, c) => (r(), u(s(S), t(i, {
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
		let { forwardRef: i } = x(), c = C(), u = f(() => M[c.placedSide.value]);
		return (e, d) => (r(), o("span", {
			ref: (e) => {
				s(c).onArrowChange(e ?? void 0);
			},
			style: l({
				position: "absolute",
				left: s(c).arrowX?.value ? `${s(c).arrowX?.value}px` : void 0,
				top: s(c).arrowY?.value ? `${s(c).arrowY?.value}px` : void 0,
				[u.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[s(c).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[s(c).placedSide.value],
				visibility: s(c).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [_(j, t(e.$attrs, {
			ref: s(i),
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
		return x(), (t, o) => (r(), u(s(N), c(e(i)), {
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
		let o = i(b, void 0), l = f(() => o ? { to: o } : {});
		return (i, o) => (r(), u(s(w), { "disable-hoverable-content": !1 }, {
			default: a(() => [_(s(T), {
				"delay-duration": t.delayDuration,
				disabled: t.disabled
			}, {
				default: a(() => [_(s(O), { "as-child": "" }, {
					default: a(() => [n(i.$slots, "default")]),
					_: 3
				}), _(s(E), c(e(l.value)), {
					default: a(() => [_(s(D), {
						side: t.side,
						"side-offset": 6,
						class: m(s(y).tooltipContent)
					}, {
						default: a(() => [h(p(t.content) + " ", 1), _(s(P), {
							class: m(s(y).tooltipArrow),
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
			sm: y.iconButtonSm,
			md: y.iconButtonMd,
			lg: y.iconButtonLg
		}, c = {
			sm: 16,
			md: 18,
			lg: 22
		}, l = f(() => o[n.size]), p = f(() => c[n.size]);
		function h(e) {
			n.disabled || i("click", e);
		}
		return (t, n) => (r(), u(F, { content: e.tooltip ?? e.label }, {
			default: a(() => [d("button", {
				type: "button",
				class: m(["tc-interactive", [
					s(y).iconButton,
					l.value,
					e.destructive && s(y).iconButtonDestructive,
					e.pressed === !0 && s(y).iconButtonPressed
				]]),
				"aria-label": e.label,
				"aria-pressed": e.pressed === null ? void 0 : e.pressed,
				disabled: e.disabled,
				onClick: h
			}, [_(v, {
				icon: e.icon,
				size: p.value
			}, null, 8, ["icon", "size"])], 10, I)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { L as t };
