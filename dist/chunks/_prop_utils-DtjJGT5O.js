import { A as e, C as t, D as n, F as r, G as i, I as a, N as o, O as s, T as c, V as l, W as u, _ as d, at as f, c as p, ct as m, dt as h, et as g, g as _, h as v, m as y, o as b, ot as x, p as S, pt as C, u as w, ut as T, v as E, x as D, y as O } from "./vue-i18n-DUz2Gjn8.js";
import { t as ee } from "./AppIcon-Cnhzrx9o.js";
import { i as te, r as k } from "./StateSurface-Bo_sA18G.js";
import { t as ne } from "./portal_keys-gQ1cWdMS.js";
import { _ as re, c as A, i as j, j as M, l as N, n as ie, o as P, p as ae, s as F, t as oe } from "./Teleport-C7mDSUEl.js";
import { a as se, i as ce, o as I, t as L } from "./FocusScope-B2vRGnoX.js";
import { o as R } from "./PopperContent-7a56nwZP.js";
import { s as z, u as B } from "./Collection-5SRQOk3F.js";
import { t as V } from "./VisuallyHidden-5YftsqxW.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function H(e) {
	return S(() => !x(e) || !!ae(e)?.closest("form"));
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
	setup(e, { emit: t }) {
		let n = e, r = re(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), i = g(), o = g(), { modal: s, unmountOnHide: c } = f(n);
		return W({
			open: r,
			modal: s,
			unmountOnHide: c,
			openModal: () => {
				r.value = !0;
			},
			onOpenChange: (e) => {
				r.value = e;
			},
			onOpenToggle: () => {
				r.value = !r.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement: i,
			contentElement: o
		}), (e, t) => a(e.$slots, "default", {
			open: m(r),
			close: () => r.value = !1
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
		let r = U();
		return (e, i) => (o(), v(m(j), n(t, {
			type: e.as === "button" ? "button" : void 0,
			onClick: i[0] ||= (e) => m(r).onOpenChange(!1)
		}), {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(t, { emit: r }) {
		let i = t, s = r, c = U(), { forwardRef: l, currentElement: d } = A();
		return c.titleId ||= F(void 0, "reka-dialog-title"), c.descriptionId ||= F(void 0, "reka-dialog-description"), e(() => {
			c.contentElement = d, I() !== document.body && (c.triggerElement.value = I());
		}), (e, t) => (o(), v(m(L), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: t[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: u(() => [O(m(ie), n({
				id: m(c).contentId,
				ref: m(l),
				as: e.as,
				"as-child": e.asChild,
				present: i.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": m(c).descriptionId,
				"aria-labelledby": m(c).titleId,
				"data-state": m(z)(m(c).open.value)
			}, e.$attrs, {
				onDismiss: t[0] ||= (e) => m(c).onOpenChange(!1),
				onEscapeKeyDown: t[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: t[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: t[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: t[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: u(() => [a(e.$slots, "default")]),
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
		let r = e, i = t, s = U(), c = N(i), { forwardRef: d, currentElement: f } = A(), p = S(() => r.present ? f.value : void 0);
		ce(p);
		let h = S(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return l(() => r.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (e, t) => (o(), v(q, n({
			...h.value,
			...m(c)
		}, {
			ref: m(d),
			present: e.present,
			"trap-focus": m(s).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), m(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: t[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: t[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let r = e, i = N(t);
		A();
		let s = U(), c = g(!1), d = g(!1), f = S(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return l(() => r.present, (e, t) => {
			!e && t && (c.value || s.triggerElement.value?.focus(), c.value = !1, d.value = !1);
		}), (e, t) => (o(), v(q, n({
			...f.value,
			...m(i)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (c.value || m(s).triggerElement.value?.focus(), e.preventDefault()), c.value = !1, d.value = !1;
			},
			onInteractOutside: t[1] ||= (e) => {
				e.defaultPrevented || (c.value = !0, e.detail.originalEvent.type === "pointerdown" && (d.value = !0));
				let t = e.target;
				m(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && d.value && e.preventDefault();
			}
		}), {
			default: u(() => [a(e.$slots, "default")]),
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
		let r = e, s = t, c = U(), l = N(s), { forwardRef: d } = A();
		return (e, t) => (o(), v(m(P), {
			present: e.forceMount || m(c).open.value,
			"force-mount": e.forceMount || !m(c).unmountOnHide.value
		}, {
			default: u(({ present: t }) => [m(c).modal.value ? i((o(), v(le, n({
				key: 0,
				ref: m(d),
				present: m(c).unmountOnHide.value || t
			}, {
				...r,
				...m(l),
				...e.$attrs
			}), {
				default: u(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, m(c).unmountOnHide.value || t]]) : i((o(), v(ue, n({
				key: 1,
				ref: m(d),
				present: m(c).unmountOnHide.value || t
			}, {
				...r,
				...m(l),
				...e.$attrs
			}), {
				default: u(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, m(c).unmountOnHide.value || t]])]),
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
		let r = U();
		return (e, i) => (o(), v(m(j), n(t, { id: m(r).descriptionId }), {
			default: u(() => [a(e.$slots, "default")]),
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
		let t = e, n = U(), r = se(t.present);
		return l(() => t.present, (e) => r.value = e), A(), (e, t) => (o(), v(m(j), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": m(n).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= p(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: u(() => [a(e.$slots, "default")]),
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
		let t = U(), { forwardRef: r } = A();
		return (e, s) => m(t)?.modal.value ? (o(), v(m(P), {
			key: 0,
			present: e.forceMount || m(t).open.value,
			"force-mount": e.forceMount || !m(t).unmountOnHide.value
		}, {
			default: u(({ present: o }) => [i(O(de, n(e.$attrs, {
				ref: m(r),
				as: e.as,
				"as-child": e.asChild,
				present: m(t).unmountOnHide.value || o
			}), {
				default: u(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[b, m(t).unmountOnHide.value || o]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : _("v-if", !0);
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
		let t = e, r = U();
		return A(), (e, i) => (o(), v(m(j), n(t, { id: m(r).titleId }), {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let r = e, i = N(t);
		A();
		let c = g();
		return pe({ onCancelElementChange: (e) => {
			c.value = e;
		} }), (e, t) => (o(), v(m(J), n({
			...r,
			...m(i)
		}, {
			role: "alertdialog",
			onPointerDownOutside: t[0] ||= p(() => {}, ["prevent"]),
			onInteractOutside: t[1] ||= p(() => {}, ["prevent"]),
			onOpenAutoFocus: t[2] ||= () => {
				s(() => {
					c.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(t) {
		let r = t, i = fe(), { forwardRef: s, currentElement: c } = A();
		return e(() => {
			i.onCancelElementChange(c.value);
		}), (e, t) => (o(), v(m(K), n(r, { ref: m(s) }), {
			default: u(() => [a(e.$slots, "default")]),
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
		let n = e;
		return A(), (e, r) => (o(), v(m(Y), h(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
		let n = e;
		return A(), (e, r) => (o(), v(m(X), h(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
		let n = e;
		return (e, r) => (o(), v(m(oe), h(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
	setup(e, { emit: r }) {
		let i = R(e, r);
		return A(), (e, r) => (o(), v(m(G), n(m(i), { modal: !0 }), {
			default: u((n) => [a(e.$slots, "default", h(t(n)))]),
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
		let n = e;
		return A(), (e, r) => (o(), v(m(Z), h(t(n)), {
			default: u(() => [a(e.$slots, "default")]),
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
		let t = e, { primitiveElement: r, currentElement: i } = B(), a = S(() => t.checked ?? t.value);
		return l(a, (e, t) => {
			if (!i.value) return;
			let n = i.value, r = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(r, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, i) => (o(), v(V, n({
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
		let t = e, i = S(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), a = S(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
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
		return (e, s) => (o(), d(w, null, [_(" We render single input if it's required "), i.value ? (o(), v($, n({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (o(!0), d(w, { key: 1 }, r(a.value, (r) => (o(), v($, n({ key: r.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: r.name,
			value: r.value
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
	setup(e, { emit: n }) {
		let r = n;
		function i(e) {
			r("update:open", e);
		}
		function a() {
			r("confirm");
		}
		let s = c(ne, void 0), l = S(() => s ? { to: s } : {});
		return (n, r) => (o(), v(m(ve), {
			open: e.open,
			"onUpdate:open": i
		}, {
			default: u(() => [O(m(Q), h(t(l.value)), {
				default: u(() => [O(m(_e), { class: T(m(k).dialogOverlay) }, null, 8, ["class"]), O(m(me), { class: T([m(k).dialogContent, m(k).confirmDialogContent]) }, {
					default: u(() => [
						O(m(ye), { class: T(m(k).dialogTitle) }, {
							default: u(() => [E(C(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						O(m(ge), { class: T(m(k).dialogDescription) }, {
							default: u(() => [E(C(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						y("div", { class: T(m(k).confirmDialogActions) }, [O(m(he), {
							class: T(["tc-interactive", [m(k).appButton, m(k).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: u(() => [E(C(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), y("button", {
							type: "button",
							class: T(["tc-interactive", [m(k).appButton, m(k).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: a
						}, [y("span", {
							class: T([m(k).appButtonContent, e.pending && m(k).appButtonContentPending]),
							"aria-hidden": "true"
						}, [y("span", { class: T(m(k).appButtonLabel) }, C(e.confirmLabel), 3)], 2), e.pending ? (o(), d("span", {
							key: 0,
							class: T(m(k).appButtonSpinner),
							"aria-hidden": "true"
						}, [O(ee, {
							icon: m(te),
							size: 16
						}, null, 8, ["icon"])], 2)) : _("", !0)], 10, xe)], 2)
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
