import { I as e, J as t, S as n, b as r, ft as i, g as a, ht as o, it as s, k as c, l, lt as u, w as d, z as f } from "./vue-i18n-BQWz_HuU.js";
import { E as p, P as m, S as h, a as g, d as _, f as v, l as y, m as b, n as x, t as S, u as C } from "./Teleport-B2amidH8.js";
import { i as w, n as T, o as E, s as D } from "./AppTooltip-DuggrS-8.js";
import { t as O } from "./useFocusGuards-OHZKmDOB.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [k, A] = /*#__PURE__*/ m("PopoverRoot"), j = /* @__PURE__ */ n({
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
	setup(n, { emit: r }) {
		let o = n, c = r, { modal: l } = u(o), d = h(o, "open", c, {
			defaultValue: o.defaultOpen,
			passive: o.open === void 0
		});
		return A({
			contentId: "",
			triggerId: "",
			modal: l,
			open: d,
			onOpenChange: (e) => {
				d.value = e;
			},
			onOpenToggle: () => {
				d.value = !d.value;
			},
			triggerElement: s(),
			hasCustomAnchor: s(!1)
		}), (n, r) => (e(), a(i(w), null, {
			default: t(() => [f(n.$slots, "default", {
				open: i(d),
				close: () => d.value = !1
			})]),
			_: 3
		}));
	}
}), M = /* @__PURE__ */ n({
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
	setup(n, { emit: o }) {
		let s = n, l = o, u = D(p(s, "trapFocus", "disableOutsidePointerEvents")), { forwardRef: d } = v(), m = k();
		return O(), (n, o) => (e(), a(i(x), {
			"as-child": "",
			loop: "",
			trapped: n.trapFocus,
			onMountAutoFocus: o[5] ||= (e) => l("openAutoFocus", e),
			onUnmountAutoFocus: o[6] ||= (e) => l("closeAutoFocus", e)
		}, {
			default: t(() => [r(i(g), {
				"as-child": "",
				"disable-outside-pointer-events": n.disableOutsidePointerEvents,
				onPointerDownOutside: o[0] ||= (e) => l("pointerDownOutside", e),
				onInteractOutside: o[1] ||= (e) => l("interactOutside", e),
				onEscapeKeyDown: o[2] ||= (e) => l("escapeKeyDown", e),
				onFocusOutside: o[3] ||= (e) => l("focusOutside", e),
				onDismiss: o[4] ||= (e) => i(m).onOpenChange(!1)
			}, {
				default: t(() => [r(i(T), c(i(u), {
					id: i(m).contentId,
					ref: i(d),
					"data-state": i(m).open.value ? "open" : "closed",
					"aria-labelledby": i(m).triggerId,
					style: {
						"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
						"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
						"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
					},
					role: "dialog"
				}), {
					default: t(() => [f(n.$slots, "default")]),
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
}), N = /* @__PURE__ */ n({
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
	setup(n, { emit: r }) {
		let o = n, u = r, d = k(), p = s(!1);
		b(!0);
		let m = E(o, u), { forwardRef: h, currentElement: g } = v();
		return _(g), (n, r) => (e(), a(M, c(i(m), {
			ref: i(h),
			"trap-focus": i(d).open.value,
			"disable-outside-pointer-events": "",
			onCloseAutoFocus: r[0] ||= l((e) => {
				u("closeAutoFocus", e), p.value || i(d).triggerElement.value?.focus();
			}, ["prevent"]),
			onPointerDownOutside: r[1] ||= (e) => {
				u("pointerDownOutside", e);
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				p.value = r;
			},
			onFocusOutside: r[2] ||= l(() => {}, ["prevent"])
		}), {
			default: t(() => [f(n.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus"]));
	}
}), P = /* @__PURE__ */ n({
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
	setup(n, { emit: r }) {
		let o = n, l = r, u = k(), d = s(!1), p = s(!1), m = E(o, l);
		return (n, r) => (e(), a(M, c(i(m), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: r[0] ||= (e) => {
				l("closeAutoFocus", e), e.defaultPrevented || (d.value || i(u).triggerElement.value?.focus(), e.preventDefault()), d.value = !1, p.value = !1;
			},
			onInteractOutside: r[1] ||= async (e) => {
				l("interactOutside", e), e.defaultPrevented || (d.value = !0, e.detail.originalEvent.type === "pointerdown" && (p.value = !0));
				let t = e.target;
				i(u).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && p.value && e.preventDefault();
			}
		}), {
			default: t(() => [f(n.$slots, "default")]),
			_: 3
		}, 16));
	}
}), F = /* @__PURE__ */ n({
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
	setup(n, { emit: r }) {
		let o = n, s = r, l = k(), u = E(o, s), { forwardRef: d } = v();
		return l.contentId ||= C(void 0, "reka-popover-content"), (n, r) => (e(), a(i(y), { present: n.forceMount || i(l).open.value }, {
			default: t(() => [i(l).modal.value ? (e(), a(N, c({ key: 0 }, i(u), { ref: i(d) }), {
				default: t(() => [f(n.$slots, "default")]),
				_: 3
			}, 16)) : (e(), a(P, c({ key: 1 }, i(u), { ref: i(d) }), {
				default: t(() => [f(n.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), I = /* @__PURE__ */ n({
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
		let r = n;
		return (n, s) => (e(), a(i(S), o(d(r)), {
			default: t(() => [f(n.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
export { k as i, F as n, j as r, I as t };
