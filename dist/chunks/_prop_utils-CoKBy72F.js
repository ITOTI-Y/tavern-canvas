import { A as e, E as t, I as n, K as r, N as i, O as a, R as o, S as s, U as c, _ as l, b as u, ct as d, d as f, ft as p, g as m, ht as h, j as g, l as _, nt as v, p as y, pt as b, q as x, st as S, t as C, ut as w, v as T, w as E, x as D, y as O, z as k } from "./AppIcon-BpY-A4VH.js";
import { i as A, r as j } from "./StateSurface-CNBIMTjV.js";
import { $ as M, A as N, B as ee, C as P, D as te, E as ne, I as F, M as re, Q as I, S as ie, T as L, Z as R, _ as ae, b as oe, c as se, k as z, m as B, o as V, w as H } from "./PopperContent-_OEj_1Tb.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function U(e) {
	return m(() => !d(e) || !!F(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [W, G] = /*#__PURE__*/ I("DialogRoot"), K = /* @__PURE__ */ E({
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
		let n = e, r = ee(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), i = v(), a = v(), { modal: o, unmountOnHide: s } = S(n);
		return G({
			open: r,
			modal: o,
			unmountOnHide: s,
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
			contentElement: a
		}), (e, t) => k(e.$slots, "default", {
			open: w(r),
			close: () => r.value = !1
		});
	}
}), q = /* @__PURE__ */ E({
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
	setup(t) {
		let i = t;
		z();
		let a = W();
		return (t, o) => (n(), T(w(P), e(i, {
			type: t.as === "button" ? "button" : void 0,
			onClick: o[0] ||= (e) => w(a).onOpenChange(!1)
		}), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), J = /* @__PURE__ */ E({
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
	setup(t, { emit: a }) {
		let o = t, c = a, l = W(), { forwardRef: u, currentElement: d } = z();
		return l.titleId ||= L(void 0, "reka-dialog-title"), l.descriptionId ||= L(void 0, "reka-dialog-description"), i(() => {
			l.contentElement = d, R() !== document.body && (l.triggerElement.value = R());
		}), (t, i) => (n(), T(w(ae), {
			"as-child": "",
			loop: "",
			trapped: o.trapFocus,
			present: o.present,
			onMountAutoFocus: i[5] ||= (e) => c("openAutoFocus", e),
			onUnmountAutoFocus: i[6] ||= (e) => c("closeAutoFocus", e)
		}, {
			default: r(() => [s(w(oe), e({
				id: w(l).contentId,
				ref: w(u),
				as: t.as,
				"as-child": t.asChild,
				present: o.present,
				"disable-outside-pointer-events": t.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": w(l).descriptionId,
				"aria-labelledby": w(l).titleId,
				"data-state": w(B)(w(l).open.value)
			}, t.$attrs, {
				onDismiss: i[0] ||= (e) => w(l).onOpenChange(!1),
				onEscapeKeyDown: i[1] ||= (e) => c("escapeKeyDown", e),
				onFocusOutside: i[2] ||= (e) => c("focusOutside", e),
				onInteractOutside: i[3] ||= (e) => c("interactOutside", e),
				onPointerDownOutside: i[4] ||= (e) => c("pointerDownOutside", e)
			}), {
				default: r(() => [k(t.$slots, "default")]),
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
}), ce = /* @__PURE__ */ E({
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
	setup(t, { emit: i }) {
		let a = t, o = i, s = W(), l = N(o), { forwardRef: u, currentElement: d } = z(), f = m(() => a.present ? d.value : void 0);
		ne(f);
		let p = m(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return c(() => a.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (t, i) => (n(), T(J, e({
			...p.value,
			...w(l)
		}, {
			ref: w(u),
			present: t.present,
			"trap-focus": w(s).open.value,
			"disable-outside-pointer-events": a.disableOutsidePointerEvents,
			onCloseAutoFocus: i[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), w(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: i[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: i[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), le = /* @__PURE__ */ E({
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
	setup(t, { emit: i }) {
		let a = t, o = N(i);
		z();
		let s = W(), l = v(!1), u = v(!1), d = m(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return c(() => a.present, (e, t) => {
			!e && t && (l.value || s.triggerElement.value?.focus(), l.value = !1, u.value = !1);
		}), (t, i) => (n(), T(J, e({
			...d.value,
			...w(o)
		}, {
			present: t.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: i[0] ||= (e) => {
				e.defaultPrevented || (l.value || w(s).triggerElement.value?.focus(), e.preventDefault()), l.value = !1, u.value = !1;
			},
			onInteractOutside: i[1] ||= (e) => {
				e.defaultPrevented || (l.value = !0, e.detail.originalEvent.type === "pointerdown" && (u.value = !0));
				let t = e.target;
				w(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && u.value && e.preventDefault();
			}
		}), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), Y = /* @__PURE__ */ E({
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
	setup(t, { emit: i }) {
		let a = t, o = i, s = W(), c = N(o), { forwardRef: l } = z();
		return (t, i) => (n(), T(w(H), {
			present: t.forceMount || w(s).open.value,
			"force-mount": t.forceMount || !w(s).unmountOnHide.value
		}, {
			default: r(({ present: i }) => [w(s).modal.value ? x((n(), T(ce, e({
				key: 0,
				ref: w(l),
				present: w(s).unmountOnHide.value || i
			}, {
				...a,
				...w(c),
				...t.$attrs
			}), {
				default: r(() => [k(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, w(s).unmountOnHide.value || i]]) : x((n(), T(le, e({
				key: 1,
				ref: w(l),
				present: w(s).unmountOnHide.value || i
			}, {
				...a,
				...w(c),
				...t.$attrs
			}), {
				default: r(() => [k(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, w(s).unmountOnHide.value || i]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), X = /* @__PURE__ */ E({
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
	setup(t) {
		let i = t;
		z();
		let a = W();
		return (t, o) => (n(), T(w(P), e(i, { id: w(a).descriptionId }), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), ue = /* @__PURE__ */ E({
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
		let t = e, i = W(), a = re(t.present);
		return c(() => t.present, (e) => a.value = e), z(), (e, t) => (n(), T(w(P), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": w(i).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= f(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: r(() => [k(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), Z = /* @__PURE__ */ E({
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
	setup(t) {
		let i = W(), { forwardRef: a } = z();
		return (t, o) => w(i)?.modal.value ? (n(), T(w(H), {
			key: 0,
			present: t.forceMount || w(i).open.value,
			"force-mount": t.forceMount || !w(i).unmountOnHide.value
		}, {
			default: r(({ present: n }) => [x(s(ue, e(t.$attrs, {
				ref: w(a),
				as: t.as,
				"as-child": t.asChild,
				present: w(i).unmountOnHide.value || n
			}), {
				default: r(() => [k(t.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[_, w(i).unmountOnHide.value || n]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : O("v-if", !0);
	}
}), Q = /* @__PURE__ */ E({
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
	setup(t) {
		let i = t, a = W();
		return z(), (t, o) => (n(), T(w(P), e(i, { id: w(a).titleId }), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), [de, fe] = /*#__PURE__*/ I("AlertDialogContent"), pe = /* @__PURE__ */ E({
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
	setup(t, { emit: i }) {
		let a = t, o = N(i);
		z();
		let s = v();
		return fe({ onCancelElementChange: (e) => {
			s.value = e;
		} }), (t, i) => (n(), T(w(Y), e({
			...a,
			...w(o)
		}, {
			role: "alertdialog",
			onPointerDownOutside: i[0] ||= f(() => {}, ["prevent"]),
			onInteractOutside: i[1] ||= f(() => {}, ["prevent"]),
			onOpenAutoFocus: i[2] ||= () => {
				g(() => {
					s.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), me = /* @__PURE__ */ E({
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
		let a = t, o = de(), { forwardRef: s, currentElement: c } = z();
		return i(() => {
			o.onCancelElementChange(c.value);
		}), (t, i) => (n(), T(w(q), e(a, { ref: w(s) }), {
			default: r(() => [k(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), he = /* @__PURE__ */ E({
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
		let i = e;
		return z(), (e, a) => (n(), T(w(X), b(t(i)), {
			default: r(() => [k(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ E({
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
		let i = e;
		return z(), (e, a) => (n(), T(w(Z), b(t(i)), {
			default: r(() => [k(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ E({
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
		let i = e;
		return (e, a) => (n(), T(w(se), b(t(i)), {
			default: r(() => [k(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ve = /* @__PURE__ */ E({
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
	setup(i, { emit: a }) {
		let o = te(i, a);
		return z(), (i, a) => (n(), T(w(K), e(w(o), { modal: !0 }), {
			default: r((e) => [k(i.$slots, "default", b(t(e)))]),
			_: 3
		}, 16));
	}
}), ye = /* @__PURE__ */ E({
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
		let i = e;
		return z(), (e, a) => (n(), T(w(Q), b(t(i)), {
			default: r(() => [k(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), $ = /* @__PURE__ */ E({
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
	setup(t) {
		let r = t, { primitiveElement: i, currentElement: a } = ie(), o = m(() => r.checked ?? r.value);
		return c(o, (e, t) => {
			if (!a.value) return;
			let n = a.value, r = window.HTMLInputElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (i && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				i.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (t, a) => (n(), T(V, e({
			ref_key: "primitiveElement",
			ref: i
		}, {
			...r,
			...t.$attrs
		}, { as: "input" }), null, 16));
	}
}), be = /* @__PURE__ */ E({
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
	setup(t) {
		let r = t, i = m(() => typeof r.value == "object" && Array.isArray(r.value) && r.value.length === 0 && r.required), a = m(() => typeof r.value == "string" || typeof r.value == "number" || typeof r.value == "boolean" || r.value === null || r.value === void 0 ? [{
			name: r.name,
			value: r.value
		}] : typeof r.value == "object" && Array.isArray(r.value) ? r.value.flatMap((e, t) => typeof e == "object" ? Object.entries(e).map(([e, n]) => ({
			name: `${r.name}[${t}][${e}]`,
			value: n
		})) : {
			name: `${r.name}[${t}]`,
			value: e
		}) : r.value !== null && typeof r.value == "object" && !Array.isArray(r.value) ? Object.entries(r.value).map(([e, t]) => ({
			name: `${r.name}[${e}]`,
			value: t
		})) : []);
		return (t, s) => (n(), u(y, null, [O(" We render single input if it's required "), i.value ? (n(), T($, e({ key: t.name }, {
			...r,
			...t.$attrs
		}, {
			name: t.name,
			value: t.value
		}), null, 16, ["name", "value"])) : (n(!0), u(y, { key: 1 }, o(a.value, (i) => (n(), T($, e({ key: i.name }, { ref_for: !0 }, {
			...r,
			...t.$attrs
		}, {
			name: i.name,
			value: i.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
}), xe = [
	"disabled",
	"aria-busy",
	"aria-label"
], Se = /* @__PURE__ */ E({
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
	setup(e, { emit: i }) {
		let o = i;
		function c(e) {
			o("update:open", e);
		}
		function d() {
			o("confirm");
		}
		let f = a(M, void 0), g = m(() => f ? { to: f } : {});
		return (i, a) => (n(), T(w(ve), {
			open: e.open,
			"onUpdate:open": c
		}, {
			default: r(() => [s(w(_e), b(t(g.value)), {
				default: r(() => [s(w(ge), { class: p(w(j).dialogOverlay) }, null, 8, ["class"]), s(w(pe), { class: p([w(j).dialogContent, w(j).confirmDialogContent]) }, {
					default: r(() => [
						s(w(ye), { class: p(w(j).dialogTitle) }, {
							default: r(() => [D(h(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						s(w(he), { class: p(w(j).dialogDescription) }, {
							default: r(() => [D(h(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						l("div", { class: p(w(j).confirmDialogActions) }, [s(w(me), {
							class: p(["tc-interactive", [w(j).appButton, w(j).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: r(() => [D(h(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), l("button", {
							type: "button",
							class: p(["tc-interactive", [w(j).appButton, w(j).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: d
						}, [l("span", {
							class: p([w(j).appButtonContent, e.pending && w(j).appButtonContentPending]),
							"aria-hidden": "true"
						}, [l("span", { class: p(w(j).appButtonLabel) }, h(e.confirmLabel), 3)], 2), e.pending ? (n(), u("span", {
							key: 0,
							class: p(w(j).appButtonSpinner),
							"aria-hidden": "true"
						}, [s(C, {
							icon: w(A),
							size: 16
						}, null, 8, ["icon"])], 2)) : O("", !0)], 10, xe)], 2)
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
export { Z as a, q as c, Q as i, K as l, Se as n, X as o, be as r, Y as s, Ce as t, U as u };

//# sourceMappingURL=_prop_utils-CoKBy72F.js.map