import { A as e, C as t, D as n, I as r, L as i, N as a, W as o, at as s, c, ct as l, dt as u, et as d, h as f, x as p, y as m } from "./vue-i18n-DUz2Gjn8.js";
import { E as h, P as g, S as _, a as v, d as y, f as b, l as x, m as S, n as C, s as w, t as T, u as E } from "./Teleport-CQG7H--I.js";
import { i as D, o as O, r as k, s as A, t as j } from "./PopperContent-C8_wQG8J.js";
import { t as M } from "./useFocusGuards-C429-XYu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [N, P] = /*#__PURE__*/ g("PopoverRoot"), F = /* @__PURE__ */ p({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, i = t, { modal: c } = s(n), u = _(n, "open", i, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		return P({
			contentId: "",
			triggerId: "",
			modal: c,
			open: u,
			onOpenChange: (e) => {
				u.value = e;
			},
			onOpenToggle: () => {
				u.value = !u.value;
			},
			triggerElement: d(),
			hasCustomAnchor: d(!1)
		}), (e, t) => (a(), f(l(D), null, {
			default: o(() => [r(e.$slots, "default", {
				open: l(u),
				close: () => u.value = !1
			})]),
			_: 3
		}));
	}
}), I = /* @__PURE__ */ p({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let i = e, s = t, c = A(h(i, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: u } = b(), d = N();
		return M(), (e, t) => (a(), f(l(C), {
			"as-child": "",
			loop: "",
			trapped: e.trapFocus,
			onMountAutoFocus: t[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: o(() => [m(l(v), {
				"as-child": "",
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				onPointerDownOutside: t[0] ||= (e) => s("pointerDownOutside", e),
				onInteractOutside: t[1] ||= (e) => s("interactOutside", e),
				onEscapeKeyDown: t[2] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: t[3] ||= (e) => s("focusOutside", e),
				onDismiss: t[4] ||= (e) => l(d).onOpenChange(!1)
			}, {
				default: o(() => [m(l(j), n(l(c), {
					id: l(d).contentId,
					ref: l(u),
					"data-state": l(d).open.value ? "open" : "closed",
					"aria-labelledby": l(d).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: o(() => [r(e.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"data-state",
					"aria-labelledby"
				])]),
				_: 3
			}, 8, ["disable-outside-pointer-events"])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), L = /* @__PURE__ */ p({
	__name: "PopoverContentModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let i = e, s = t, u = N(), p = d(!1);
		S(!0);
		let m = O(i, s), { forwardRef: h, currentElement: g } = b();
		return y(g), (e, t) => (a(), f(I, n(l(m), {
			ref: l(h),
			"trap-focus": l(u).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: t[0] ||= c((e) => {
				s("closeAutoFocus", e), p.value || l(u).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: t[1] ||= (e) => {
				s("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				p.value = r;
			},
			onFocusOutside: t[2] ||= c(() => {}, ["prevent"])
		}), {
			default: o(() => [r(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus"]));
	}
}), R = /* @__PURE__ */ p({
	__name: "PopoverContentNonModal",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let i = e, s = t, c = N(), u = d(!1), p = d(!1), m = O(i, s);
		return (e, t) => (a(), f(I, n(l(m), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				s("closeAutoFocus", e), e.defaultPrevented || (u.value || l(c).triggerElement.value?.focus(), e.preventDefault()), u.value = !1, p.value = !1;
			},
			onInteractOutside: t[1] ||= async (e) => {
				s("interactOutside", e), e.defaultPrevented || (u.value = !0, e.detail.originalEvent.type === "pointerdown" && (p.value = !0));
				let t = e.target;
				l(c).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && p.value && e.preventDefault();
			}
		}), {
			default: o(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), z = /* @__PURE__ */ p({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let i = e, s = t, c = N(), u = O(i, s), { forwardRef: d } = b();
		return c.contentId ||= E(void 0, "reka-popover-content"), (e, t) => (a(), f(l(x), { present: e.forceMount || l(c).open.value }, {
			default: o(() => [l(c).modal.value ? (a(), f(L, n({ key: 0 }, l(u), { ref: l(d) }), {
				default: o(() => [r(e.$slots, "default")]),
				_: 3
			}, 16)) : (a(), f(R, n({ key: 1 }, l(u), { ref: l(d) }), {
				default: o(() => [r(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), B = /* @__PURE__ */ p({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let n = e;
		return (e, i) => (a(), f(l(T), u(t(n)), {
			default: o(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), V = /* @__PURE__ */ p({
	__name: "PopoverTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(t) {
		let n = t, s = N(), { forwardRef: c, currentElement: u } = b();
		return s.triggerId ||= E(void 0, "reka-popover-trigger"), e(() => {
			s.triggerElement.value = u.value;
		}), (e, t) => (a(), f(i(l(s).hasCustomAnchor.value ? l(w) : l(k)), { "as-child": "" }, {
			default: o(() => [m(l(w), {
				id: l(s).triggerId,
				ref: l(c),
				type: e.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": l(s).open.value,
				"aria-controls": l(s).contentId,
				"data-state": l(s).open.value ? "open" : "closed",
				as: e.as,
				"as-child": n.asChild,
				onClick: l(s).onOpenToggle
			}, {
				default: o(() => [r(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"as",
				"as-child",
				"onClick"
			])]),
			_: 3
		}));
	}
});
//#endregion
export { F as i, B as n, z as r, V as t };
