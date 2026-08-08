import { A as e, E as t, I as n, K as r, O as i, S as a, _ as o, b as s, ft as c, g as l, ht as u, mt as d, pt as f, t as p, ut as m, v as h, w as g, x as _, z as v } from "./AppIcon-BpY-A4VH.js";
import { r as y } from "./StateSurface-CNBIMTjV.js";
import { $ as b, C as x, k as S, r as C } from "./PopperContent-_OEj_1Tb.js";
import { a as w, i as T, n as E, r as D, t as O } from "./TooltipTrigger-Cq_k30Ce.js";
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
	setup(t) {
		let i = t;
		return S(), (t, a) => (n(), h(m(x), e(i, {
			width: t.width,
			height: t.height,
			viewBox: t.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: t.asChild ? void 0 : "none"
		}), {
			default: r(() => [v(t.$slots, "default", {}, () => [t.rounded ? (n(), s("path", A)) : (n(), s("path", k))])]),
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
	setup(t) {
		let { forwardRef: i } = S(), o = C(), c = l(() => M[o.placedSide.value]);
		return (t, l) => (n(), s("span", {
			ref: (e) => {
				m(o).onArrowChange(e ?? void 0);
			},
			style: d({
				position: "absolute",
				left: m(o).arrowX?.value ? `${m(o).arrowX?.value}px` : void 0,
				top: m(o).arrowY?.value ? `${m(o).arrowY?.value}px` : void 0,
				[c.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[m(o).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[m(o).placedSide.value],
				visibility: m(o).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [a(j, e(t.$attrs, {
			ref: m(i),
			style: { display: "block" },
			as: t.as,
			"as-child": t.asChild,
			rounded: t.rounded,
			width: t.width,
			height: t.height
		}), {
			default: r(() => [v(t.$slots, "default")]),
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
	setup(e) {
		let i = e;
		return S(), (e, a) => (n(), h(m(N), f(t(i)), {
			default: r(() => [v(e.$slots, "default")]),
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
	setup(e) {
		let o = i(b, void 0), s = l(() => o ? { to: o } : {});
		return (i, o) => (n(), h(m(w), { "disable-hoverable-content": !1 }, {
			default: r(() => [a(m(T), {
				"delay-duration": e.delayDuration,
				disabled: e.disabled
			}, {
				default: r(() => [a(m(O), { "as-child": "" }, {
					default: r(() => [v(i.$slots, "default")]),
					_: 3
				}), a(m(E), f(t(s.value)), {
					default: r(() => [a(m(D), {
						side: e.side,
						"side-offset": 6,
						class: c(m(y).tooltipContent)
					}, {
						default: r(() => [_(u(e.content) + " ", 1), a(m(P), {
							class: c(m(y).tooltipArrow),
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
		tooltip: {},
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
		let i = e, s = t, u = {
			sm: y.iconButtonSm,
			md: y.iconButtonMd,
			lg: y.iconButtonLg
		}, d = {
			sm: 16,
			md: 18,
			lg: 22
		}, f = l(() => u[i.size]), g = l(() => d[i.size]);
		function _(e) {
			i.disabled || s("click", e);
		}
		return (t, i) => (n(), h(F, { content: e.tooltip ?? e.label }, {
			default: r(() => [o("button", {
				type: "button",
				class: c(["tc-interactive", [
					m(y).iconButton,
					f.value,
					e.destructive && m(y).iconButtonDestructive,
					e.pressed === !0 && m(y).iconButtonPressed
				]]),
				"aria-label": e.label,
				"aria-pressed": e.pressed === null ? void 0 : e.pressed,
				disabled: e.disabled,
				onClick: _
			}, [a(p, {
				icon: e.icon,
				size: g.value
			}, null, 8, ["icon", "size"])], 10, I)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { L as t };

//# sourceMappingURL=IconButton-CW62aQy5.js.map