import { C as e, D as t, G as n, L as r, P as i, c as a, ft as o, h as s, lt as c, ot as l, tt as u, x as d, y as f } from "./vue-i18n-L-BrQRnK.js";
import { E as p, P as m, S as h, a as g, d as _, f as v, l as y, m as b, n as x, t as S, u as C } from "./Teleport-CquQcgiX.js";
import { i as w, n as T, o as E, s as D } from "./AppTooltip-CrGQyPAP.js";
import { t as O } from "./useFocusGuards-CZE33dT6.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [k, A] = /*#__PURE__*/ m("PopoverRoot"), j = /* @__PURE__ */ d({
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
		let a = e, o = t, { modal: d } = l(a), f = h(a, "open", o, {
			defaultValue: a.defaultOpen,
			passive: a.open === void 0
		});
		return A({
			contentId: "",
			triggerId: "",
			modal: d,
			open: f,
			onOpenChange: (e) => {
				f.value = e;
			},
			onOpenToggle: () => {
				f.value = !f.value;
			},
			triggerElement: u(),
			hasCustomAnchor: u(!1)
		}), (e, t) => (i(), s(c(w), null, {
			default: n(() => [r(e.$slots, "default", {
				open: c(f),
				close: () => f.value = !1
			})]),
			_: 3
		}));
	}
}), M = /* @__PURE__ */ d({
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
	setup(e, { emit: a }) {
		let o = e, l = a, u = D(p(o, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: d } = v(), m = k();
		return O(), (e, a) => (i(), s(c(x), {
			"as-child": "",
			loop: "",
			trapped: e.trapFocus,
			onMountAutoFocus: a[5] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: a[6] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: n(() => [f(c(g), {
				"as-child": "",
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				onPointerDownOutside: a[0] ||= (e) => l("pointerDownOutside", e),
				onInteractOutside: a[1] ||= (e) => l("interactOutside", e),
				onEscapeKeyDown: a[2] ||= (e) => l("escapeKeyDown", e),
				onFocusOutside: a[3] ||= (e) => l("focusOutside", e),
				onDismiss: a[4] ||= (e) => c(m).onOpenChange(!1)
			}, {
				default: n(() => [f(c(T), t(c(u), {
					id: c(m).contentId,
					ref: c(d),
					"data-state": c(m).open.value ? "open" : "closed",
					"aria-labelledby": c(m).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: n(() => [r(e.$slots, "default")]),
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
}), N = /* @__PURE__ */ d({
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
	setup(e, { emit: o }) {
		let l = e, d = o, f = k(), p = u(!1);
		b(!0);
		let m = E(l, d), { forwardRef: h, currentElement: g } = v();
		return _(g), (e, o) => (i(), s(M, t(c(m), {
			ref: c(h),
			"trap-focus": c(f).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: o[0] ||= a((e) => {
				d("closeAutoFocus", e), p.value || c(f).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: o[1] ||= (e) => {
				d("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				p.value = r;
			},
			onFocusOutside: o[2] ||= a(() => {}, ["prevent"])
		}), {
			default: n(() => [r(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus"]));
	}
}), P = /* @__PURE__ */ d({
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
	setup(e, { emit: a }) {
		let o = e, l = a, d = k(), f = u(!1), p = u(!1), m = E(o, l);
		return (e, a) => (i(), s(M, t(c(m), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: a[0] ||= (e) => {
				l("closeAutoFocus", e), e.defaultPrevented || (f.value || c(d).triggerElement.value?.focus(), e.preventDefault()), f.value = !1, p.value = !1;
			},
			onInteractOutside: a[1] ||= async (e) => {
				l("interactOutside", e), e.defaultPrevented || (f.value = !0, e.detail.originalEvent.type === "pointerdown" && (p.value = !0));
				let t = e.target;
				c(d).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && p.value && e.preventDefault();
			}
		}), {
			default: n(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), F = /* @__PURE__ */ d({
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
	setup(e, { emit: a }) {
		let o = e, l = a, u = k(), d = E(o, l), { forwardRef: f } = v();
		return u.contentId ||= C(void 0, "reka-popover-content"), (e, a) => (i(), s(c(y), { present: e.forceMount || c(u).open.value }, {
			default: n(() => [c(u).modal.value ? (i(), s(N, t({ key: 0 }, c(d), { ref: c(f) }), {
				default: n(() => [r(e.$slots, "default")]),
				_: 3
			}, 16)) : (i(), s(P, t({ key: 1 }, c(d), { ref: c(f) }), {
				default: n(() => [r(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), I = /* @__PURE__ */ d({
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
	setup(t) {
		let a = t;
		return (t, l) => (i(), s(c(S), o(e(a)), {
			default: n(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
export { k as i, F as n, j as r, I as t };
