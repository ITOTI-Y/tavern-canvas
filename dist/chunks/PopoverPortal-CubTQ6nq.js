import { C as e, F as t, O as n, R as r, c as i, ct as a, dt as o, h as s, mt as c, q as l, rt as u, x as d, y as f } from "./vue-i18n-XoxYzLIP.js";
import { E as p, P as m, S as h, a as g, d as _, f as v, l as y, m as b, n as x, t as S, u as C } from "./Teleport-zHbQRGnp.js";
import { c as w, i as T, l as E, n as D } from "./AppTooltip-D3BiEM01.js";
import { t as O } from "./useFocusGuards-71hS207-.js";
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
	setup(e, { emit: n }) {
		let i = e, c = n, { modal: d } = a(i), f = h(i, "open", c, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
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
		}), (e, n) => (t(), s(o(T), null, {
			default: l(() => [r(e.$slots, "default", {
				open: o(f),
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
	setup(e, { emit: i }) {
		let a = e, c = i, u = E(p(a, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: d } = v(), m = k();
		return O(), (e, i) => (t(), s(o(x), {
			"as-child": "",
			loop: "",
			trapped: e.trapFocus,
			onMountAutoFocus: i[5] ||= (e) => c("openAutoFocus", e),
			onUnmountAutoFocus: i[6] ||= (e) => c("closeAutoFocus", e)
		}, {
			default: l(() => [f(o(g), {
				"as-child": "",
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				onPointerDownOutside: i[0] ||= (e) => c("pointerDownOutside", e),
				onInteractOutside: i[1] ||= (e) => c("interactOutside", e),
				onEscapeKeyDown: i[2] ||= (e) => c("escapeKeyDown", e),
				onFocusOutside: i[3] ||= (e) => c("focusOutside", e),
				onDismiss: i[4] ||= (e) => o(m).onOpenChange(!1)
			}, {
				default: l(() => [f(o(D), n(o(u), {
					id: o(m).contentId,
					ref: o(d),
					"data-state": o(m).open.value ? "open" : "closed",
					"aria-labelledby": o(m).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: l(() => [r(e.$slots, "default")]),
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
	setup(e, { emit: a }) {
		let c = e, d = a, f = k(), p = u(!1);
		b(!0);
		let m = w(c, d), { forwardRef: h, currentElement: g } = v();
		return _(g), (e, a) => (t(), s(M, n(o(m), {
			ref: o(h),
			"trap-focus": o(f).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: a[0] ||= i((e) => {
				d("closeAutoFocus", e), p.value || o(f).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: a[1] ||= (e) => {
				d("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				p.value = r;
			},
			onFocusOutside: a[2] ||= i(() => {}, ["prevent"])
		}), {
			default: l(() => [r(e.$slots, "default")]),
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
	setup(e, { emit: i }) {
		let a = e, c = i, d = k(), f = u(!1), p = u(!1), m = w(a, c);
		return (e, i) => (t(), s(M, n(o(m), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: i[0] ||= (e) => {
				c("closeAutoFocus", e), e.defaultPrevented || (f.value || o(d).triggerElement.value?.focus(), e.preventDefault()), f.value = !1, p.value = !1;
			},
			onInteractOutside: i[1] ||= async (e) => {
				c("interactOutside", e), e.defaultPrevented || (f.value = !0, e.detail.originalEvent.type === "pointerdown" && (p.value = !0));
				let t = e.target;
				o(d).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && p.value && e.preventDefault();
			}
		}), {
			default: l(() => [r(e.$slots, "default")]),
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
	setup(e, { emit: i }) {
		let a = e, c = i, u = k(), d = w(a, c), { forwardRef: f } = v();
		return u.contentId ||= C(void 0, "reka-popover-content"), (e, i) => (t(), s(o(y), { present: e.forceMount || o(u).open.value }, {
			default: l(() => [o(u).modal.value ? (t(), s(N, n({ key: 0 }, o(d), { ref: o(f) }), {
				default: l(() => [r(e.$slots, "default")]),
				_: 3
			}, 16)) : (t(), s(P, n({ key: 1 }, o(d), { ref: o(f) }), {
				default: l(() => [r(e.$slots, "default")]),
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
	setup(n) {
		let i = n;
		return (n, a) => (t(), s(o(S), c(e(i)), {
			default: l(() => [r(n.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
export { k as i, F as n, j as r, I as t };
