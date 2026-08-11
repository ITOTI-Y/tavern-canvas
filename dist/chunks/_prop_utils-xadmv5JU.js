import { $ as e, A as t, B as n, C as r, D as i, F as a, I as o, N as s, O as c, T as l, U as u, W as d, _ as f, at as p, c as m, ft as h, g, h as _, it as v, lt as y, m as b, o as x, p as S, st as C, u as w, ut as T, v as E, x as D, y as O } from "./vue-i18n-D0uIxSJk.js";
import { t as ee } from "./AppIcon-C3iVkJ88.js";
import { i as te, r as k } from "./StateSurface-BEQHm_62.js";
import { t as ne } from "./portal_keys-gQ1cWdMS.js";
import { _ as re, c as A, i as j, j as M, l as N, n as ie, o as P, p as ae, s as F, t as oe } from "./Teleport-CfSgxnHY.js";
import { a as se, i as ce, o as I, t as L } from "./FocusScope-MQ_KQm08.js";
import { o as R } from "./PopperContent-K7T6sb7Y.js";
import { s as z, u as B } from "./Collection-CsTPApsC.js";
import { t as V } from "./VisuallyHidden-D7Q8zkTs.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function H(e) {
	return S(() => !p(e) || !!ae(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [U, W] = /*#__PURE__*/ M("DialogRoot"), G = /* @__PURE__ */ D({
	inheritAttrs: !1,
	__name: "DialogRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		},
		unmountOnHide: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(t, { emit: n }) {
		let r = t, i = re(r, "open", n, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		}), a = e(), s = e(), { modal: c, unmountOnHide: l } = v(r);
		return W({
			open: i,
			modal: c,
			unmountOnHide: l,
			openModal: () => {
				i.value = !0;
			},
			onOpenChange: (e) => {
				i.value = e;
			},
			onOpenToggle: () => {
				i.value = !i.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement: a,
			contentElement: s
		}), (e, t) => o(e.$slots, "default", {
			open: C(i),
			close: () => i.value = !1
		});
	}
}), K = /* @__PURE__ */ D({
	__name: "DialogClose",
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
	setup(e) {
		let t = e;
		A();
		let n = U();
		return (e, r) => (s(), _(C(j), i(t, {
			type: e.as === "button" ? "button" : void 0,
			onClick: r[0] ||= (e) => C(n).onOpenChange(!1)
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), q = /* @__PURE__ */ D({
	__name: "DialogContentImpl",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		present: {
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
	setup(e, { emit: n }) {
		let r = e, a = n, c = U(), { forwardRef: l, currentElement: d } = A();
		return c.titleId ||= F(void 0, "reka-dialog-title"), c.descriptionId ||= F(void 0, "reka-dialog-description"), t(() => {
			c.contentElement = d, I() !== document.body && (c.triggerElement.value = I());
		}), (e, t) => (s(), _(C(L), {
			"as-child": "",
			loop: "",
			trapped: r.trapFocus,
			present: r.present,
			onMountAutoFocus: t[5] ||= (e) => a("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: u(() => [O(C(ie), i({
				id: C(c).contentId,
				ref: C(l),
				as: e.as,
				"as-child": e.asChild,
				present: r.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": C(c).descriptionId,
				"aria-labelledby": C(c).titleId,
				"data-state": C(z)(C(c).open.value)
			}, e.$attrs, {
				onDismiss: t[0] ||= (e) => C(c).onOpenChange(!1),
				onEscapeKeyDown: t[1] ||= (e) => a("escapeKeyDown", e),
				onFocusOutside: t[2] ||= (e) => a("focusOutside", e),
				onInteractOutside: t[3] ||= (e) => a("interactOutside", e),
				onPointerDownOutside: t[4] ||= (e) => a("pointerDownOutside", e)
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"as",
				"as-child",
				"present",
				"disable-outside-pointer-events",
				"aria-describedby",
				"aria-labelledby",
				"data-state"
			])]),
			_: 3
		}, 8, ["trapped", "present"]));
	}
}), le = /* @__PURE__ */ D({
	__name: "DialogContentModal",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		present: {
			type: Boolean,
			required: !0
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
		let r = e, a = t, c = U(), l = N(a), { forwardRef: d, currentElement: f } = A(), p = S(() => r.present ? f.value : void 0);
		ce(p);
		let m = S(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return n(() => r.present, (e, t) => {
			!e && t && c.triggerElement.value?.focus();
		}), (e, t) => (s(), _(q, i({
			...m.value,
			...C(l)
		}, {
			ref: C(d),
			present: e.present,
			"trap-focus": C(c).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), C(c).triggerElement.value?.focus());
			},
			onPointerDownOutside: t[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: t[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), ue = /* @__PURE__ */ D({
	__name: "DialogContentNonModal",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
		present: {
			type: Boolean,
			required: !0
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
	setup(t, { emit: r }) {
		let a = t, c = N(r);
		A();
		let l = U(), d = e(!1), f = e(!1), p = S(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return n(() => a.present, (e, t) => {
			!e && t && (d.value || l.triggerElement.value?.focus(), d.value = !1, f.value = !1);
		}), (e, t) => (s(), _(q, i({
			...p.value,
			...C(c)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (d.value || C(l).triggerElement.value?.focus(), e.preventDefault()), d.value = !1, f.value = !1;
			},
			onInteractOutside: t[1] ||= (e) => {
				e.defaultPrevented || (d.value = !0, e.detail.originalEvent.type === "pointerdown" && (f.value = !0));
				let t = e.target;
				C(l).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && f.value && e.preventDefault();
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), J = /* @__PURE__ */ D({
	__name: "DialogContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
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
		let n = e, r = t, a = U(), c = N(r), { forwardRef: l } = A();
		return (e, t) => (s(), _(C(P), {
			present: e.forceMount || C(a).open.value,
			"force-mount": e.forceMount || !C(a).unmountOnHide.value
		}, {
			default: u(({ present: t }) => [C(a).modal.value ? d((s(), _(le, i({
				key: 0,
				ref: C(l),
				present: C(a).unmountOnHide.value || t
			}, {
				...n,
				...C(c),
				...e.$attrs
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[x, C(a).unmountOnHide.value || t]]) : d((s(), _(ue, i({
				key: 1,
				ref: C(l),
				present: C(a).unmountOnHide.value || t
			}, {
				...n,
				...C(c),
				...e.$attrs
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[x, C(a).unmountOnHide.value || t]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), Y = /* @__PURE__ */ D({
	__name: "DialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "p"
		}
	},
	setup(e) {
		let t = e;
		A();
		let n = U();
		return (e, r) => (s(), _(C(j), i(t, { id: C(n).descriptionId }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), de = /* @__PURE__ */ D({
	__name: "DialogOverlayImpl",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	setup(e) {
		let t = e, r = U(), i = se(t.present);
		return n(() => t.present, (e) => i.value = e), A(), (e, t) => (s(), _(C(j), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": C(r).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= m(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), X = /* @__PURE__ */ D({
	__name: "DialogOverlay",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = U(), { forwardRef: n } = A();
		return (e, r) => C(t)?.modal.value ? (s(), _(C(P), {
			key: 0,
			present: e.forceMount || C(t).open.value,
			"force-mount": e.forceMount || !C(t).unmountOnHide.value
		}, {
			default: u(({ present: r }) => [d(O(de, i(e.$attrs, {
				ref: C(n),
				as: e.as,
				"as-child": e.asChild,
				present: C(t).unmountOnHide.value || r
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[x, C(t).unmountOnHide.value || r]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : g("v-if", !0);
	}
}), Z = /* @__PURE__ */ D({
	__name: "DialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "h2"
		}
	},
	setup(e) {
		let t = e, n = U();
		return A(), (e, r) => (s(), _(C(j), i(t, { id: C(n).titleId }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), [fe, pe] = /*#__PURE__*/ M("AlertDialogContent"), me = /* @__PURE__ */ D({
	__name: "AlertDialogContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
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
	setup(t, { emit: n }) {
		let r = t, a = N(n);
		A();
		let l = e();
		return pe({ onCancelElementChange: (e) => {
			l.value = e;
		} }), (e, t) => (s(), _(C(J), i({
			...r,
			...C(a)
		}, {
			role: "alertdialog",
			onPointerDownOutside: t[0] ||= m(() => {}, ["prevent"]),
			onInteractOutside: t[1] ||= m(() => {}, ["prevent"]),
			onOpenAutoFocus: t[2] ||= () => {
				c(() => {
					l.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), he = /* @__PURE__ */ D({
	__name: "AlertDialogCancel",
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
	setup(e) {
		let n = e, r = fe(), { forwardRef: a, currentElement: c } = A();
		return t(() => {
			r.onCancelElementChange(c.value);
		}), (e, t) => (s(), _(C(K), i(n, { ref: C(a) }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ D({
	__name: "AlertDialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "p"
		}
	},
	setup(e) {
		let t = e;
		return A(), (e, n) => (s(), _(C(Y), T(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ D({
	__name: "AlertDialogOverlay",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return A(), (e, n) => (s(), _(C(X), T(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Q = /* @__PURE__ */ D({
	__name: "AlertDialogPortal",
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
		let t = e;
		return (e, n) => (s(), _(C(oe), T(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ve = /* @__PURE__ */ D({
	__name: "AlertDialogRoot",
	props: {
		open: {
			type: Boolean,
			required: !1
		},
		defaultOpen: {
			type: Boolean,
			required: !1
		},
		unmountOnHide: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = R(e, t);
		return A(), (e, t) => (s(), _(C(G), i(C(n), { modal: !0 }), {
			default: u((t) => [o(e.$slots, "default", T(r(t)))]),
			_: 3
		}, 16));
	}
}), ye = /* @__PURE__ */ D({
	__name: "AlertDialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "h2"
		}
	},
	setup(e) {
		let t = e;
		return A(), (e, n) => (s(), _(C(Z), T(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), $ = /* @__PURE__ */ D({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, { primitiveElement: r, currentElement: a } = B(), o = S(() => t.checked ?? t.value);
		return n(o, (e, t) => {
			if (!a.value) return;
			let n = a.value, r = window.HTMLInputElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (i && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				i.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, n) => (s(), _(V, i({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...t,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), be = /* @__PURE__ */ D({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, n = S(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), r = S(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
			name: t.name,
			value: t.value
		}] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((e, n) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${t.name}[${n}][${e}]`,
			value: r
		})) : {
			name: `${t.name}[${n}]`,
			value: e
		}) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
			name: `${t.name}[${e}]`,
			value: n
		})) : []);
		return (e, o) => (s(), f(w, null, [g(" We render single input if it's required "), n.value ? (s(), _($, i({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (s(!0), f(w, { key: 1 }, a(r.value, (n) => (s(), _($, i({ key: n.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
}), xe = [
	"disabled",
	"aria-busy",
	"aria-label"
], Se = /* @__PURE__ */ D({
	__name: "ConfirmDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		confirmLabel: {},
		cancelLabel: {},
		pending: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "confirm"],
	setup(e, { emit: t }) {
		let n = t;
		function i(e) {
			n("update:open", e);
		}
		function a() {
			n("confirm");
		}
		let o = l(ne, void 0), c = S(() => o ? { to: o } : {});
		return (t, n) => (s(), _(C(ve), {
			open: e.open,
			"onUpdate:open": i
		}, {
			default: u(() => [O(C(Q), T(r(c.value)), {
				default: u(() => [O(C(_e), { class: y(C(k).dialogOverlay) }, null, 8, ["class"]), O(C(me), { class: y([C(k).dialogContent, C(k).confirmDialogContent]) }, {
					default: u(() => [
						O(C(ye), { class: y(C(k).dialogTitle) }, {
							default: u(() => [E(h(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						O(C(ge), { class: y(C(k).dialogDescription) }, {
							default: u(() => [E(h(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						b("div", { class: y(C(k).confirmDialogActions) }, [O(C(he), {
							class: y(["tc-interactive", [C(k).appButton, C(k).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: u(() => [E(h(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), b("button", {
							type: "button",
							class: y(["tc-interactive", [C(k).appButton, C(k).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: a
						}, [b("span", {
							class: y([C(k).appButtonContent, e.pending && C(k).appButtonContentPending]),
							"aria-hidden": "true"
						}, [b("span", { class: y(C(k).appButtonLabel) }, h(e.confirmLabel), 3)], 2), e.pending ? (s(), f("span", {
							key: 0,
							class: y(C(k).appButtonSpinner),
							"aria-hidden": "true"
						}, [O(ee, {
							icon: C(te),
							size: 16
						}, null, 8, ["icon"])], 2)) : g("", !0)], 10, xe)], 2)
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"]));
	}
});
//#endregion
//#region src/ui/components/_prop_utils.ts
function Ce(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		r !== void 0 && (t[n] = r);
	}
	return t;
}
//#endregion
export { X as a, K as c, Z as i, G as l, Se as n, Y as o, be as r, J as s, Ce as t, H as u };
