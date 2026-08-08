import { $ as e, A as t, B as n, C as r, D as i, F as a, I as o, N as s, O as c, T as l, U as u, W as d, _ as f, at as p, c as m, ft as h, g, h as _, it as ee, lt as v, m as y, o as b, p as x, st as S, u as C, ut as w, v as T, x as E, y as D } from "./vue-i18n-CmRk7RjK.js";
import { i as te, r as O } from "./StateSurface-BqMfI2cI.js";
import { t as k } from "./AppIcon-B4b88cvE.js";
import { t as ne } from "./portal_keys-gQ1cWdMS.js";
import { _ as re, c as A, i as j, j as M, l as N, n as ie, o as P, p as ae, s as F, t as oe } from "./Teleport-abGLK5Wv.js";
import { a as se, i as ce, o as I, t as L } from "./FocusScope-DrI3mUpj.js";
import { o as R } from "./PopperContent-CWEcCerf.js";
import { s as z, u as B } from "./Collection-DSmIzJYn.js";
import { t as V } from "./VisuallyHidden-CukVafpV.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function H(e) {
	return x(() => !p(e) || !!ae(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [U, W] = /*#__PURE__*/ M("DialogRoot"), G = /* @__PURE__ */ E({
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
		}), a = e(), s = e(), { modal: c, unmountOnHide: l } = ee(r);
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
			open: S(i),
			close: () => i.value = !1
		});
	}
}), K = /* @__PURE__ */ E({
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
		return (e, r) => (s(), _(S(j), i(t, {
			type: e.as === "button" ? "button" : void 0,
			onClick: r[0] ||= (e) => S(n).onOpenChange(!1)
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), q = /* @__PURE__ */ E({
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
		}), (e, t) => (s(), _(S(L), {
			"as-child": "",
			loop: "",
			trapped: r.trapFocus,
			present: r.present,
			onMountAutoFocus: t[5] ||= (e) => a("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: u(() => [D(S(ie), i({
				id: S(c).contentId,
				ref: S(l),
				as: e.as,
				"as-child": e.asChild,
				present: r.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": S(c).descriptionId,
				"aria-labelledby": S(c).titleId,
				"data-state": S(z)(S(c).open.value)
			}, e.$attrs, {
				onDismiss: t[0] ||= (e) => S(c).onOpenChange(!1),
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
}), le = /* @__PURE__ */ E({
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
		let r = e, a = t, c = U(), l = N(a), { forwardRef: d, currentElement: f } = A(), p = x(() => r.present ? f.value : void 0);
		ce(p);
		let m = x(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return n(() => r.present, (e, t) => {
			!e && t && c.triggerElement.value?.focus();
		}), (e, t) => (s(), _(q, i({
			...m.value,
			...S(l)
		}, {
			ref: S(d),
			present: e.present,
			"trap-focus": S(c).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), S(c).triggerElement.value?.focus());
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
}), ue = /* @__PURE__ */ E({
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
		let l = U(), d = e(!1), f = e(!1), p = x(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return n(() => a.present, (e, t) => {
			!e && t && (d.value || l.triggerElement.value?.focus(), d.value = !1, f.value = !1);
		}), (e, t) => (s(), _(q, i({
			...p.value,
			...S(c)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (d.value || S(l).triggerElement.value?.focus(), e.preventDefault()), d.value = !1, f.value = !1;
			},
			onInteractOutside: t[1] ||= (e) => {
				e.defaultPrevented || (d.value = !0, e.detail.originalEvent.type === "pointerdown" && (f.value = !0));
				let t = e.target;
				S(l).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && f.value && e.preventDefault();
			}
		}), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), J = /* @__PURE__ */ E({
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
		return (e, t) => (s(), _(S(P), {
			present: e.forceMount || S(a).open.value,
			"force-mount": e.forceMount || !S(a).unmountOnHide.value
		}, {
			default: u(({ present: t }) => [S(a).modal.value ? d((s(), _(le, i({
				key: 0,
				ref: S(l),
				present: S(a).unmountOnHide.value || t
			}, {
				...n,
				...S(c),
				...e.$attrs
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, S(a).unmountOnHide.value || t]]) : d((s(), _(ue, i({
				key: 1,
				ref: S(l),
				present: S(a).unmountOnHide.value || t
			}, {
				...n,
				...S(c),
				...e.$attrs
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, S(a).unmountOnHide.value || t]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), Y = /* @__PURE__ */ E({
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
		return (e, r) => (s(), _(S(j), i(t, { id: S(n).descriptionId }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), de = /* @__PURE__ */ E({
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
		return n(() => t.present, (e) => i.value = e), A(), (e, t) => (s(), _(S(j), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": S(r).open.value ? "open" : "closed",
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
}), X = /* @__PURE__ */ E({
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
		return (e, r) => S(t)?.modal.value ? (s(), _(S(P), {
			key: 0,
			present: e.forceMount || S(t).open.value,
			"force-mount": e.forceMount || !S(t).unmountOnHide.value
		}, {
			default: u(({ present: r }) => [d(D(de, i(e.$attrs, {
				ref: S(n),
				as: e.as,
				"as-child": e.asChild,
				present: S(t).unmountOnHide.value || r
			}), {
				default: u(() => [o(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[b, S(t).unmountOnHide.value || r]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : g("v-if", !0);
	}
}), Z = /* @__PURE__ */ E({
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
		return A(), (e, r) => (s(), _(S(j), i(t, { id: S(n).titleId }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), [fe, pe] = /*#__PURE__*/ M("AlertDialogContent"), me = /* @__PURE__ */ E({
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
		} }), (e, t) => (s(), _(S(J), i({
			...r,
			...S(a)
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
}), he = /* @__PURE__ */ E({
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
		}), (e, t) => (s(), _(S(K), i(n, { ref: S(a) }), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ge = /* @__PURE__ */ E({
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
		return A(), (e, n) => (s(), _(S(Y), w(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), _e = /* @__PURE__ */ E({
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
		return A(), (e, n) => (s(), _(S(X), w(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Q = /* @__PURE__ */ E({
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
		return (e, n) => (s(), _(S(oe), w(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let n = R(e, t);
		return A(), (e, t) => (s(), _(S(G), i(S(n), { modal: !0 }), {
			default: u((t) => [o(e.$slots, "default", w(r(t)))]),
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
		let t = e;
		return A(), (e, n) => (s(), _(S(Z), w(r(t)), {
			default: u(() => [o(e.$slots, "default")]),
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
	setup(e) {
		let t = e, { primitiveElement: r, currentElement: a } = B(), o = x(() => t.checked ?? t.value);
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
	setup(e) {
		let t = e, n = x(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), r = x(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
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
		return (e, o) => (s(), f(C, null, [g(" We render single input if it's required "), n.value ? (s(), _($, i({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (s(!0), f(C, { key: 1 }, a(r.value, (n) => (s(), _($, i({ key: n.name }, { ref_for: !0 }, {
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
	setup(e, { emit: t }) {
		let n = t;
		function i(e) {
			n("update:open", e);
		}
		function a() {
			n("confirm");
		}
		let o = l(ne, void 0), c = x(() => o ? { to: o } : {});
		return (t, n) => (s(), _(S(ve), {
			open: e.open,
			"onUpdate:open": i
		}, {
			default: u(() => [D(S(Q), w(r(c.value)), {
				default: u(() => [D(S(_e), { class: v(S(O).dialogOverlay) }, null, 8, ["class"]), D(S(me), { class: v([S(O).dialogContent, S(O).confirmDialogContent]) }, {
					default: u(() => [
						D(S(ye), { class: v(S(O).dialogTitle) }, {
							default: u(() => [T(h(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						D(S(ge), { class: v(S(O).dialogDescription) }, {
							default: u(() => [T(h(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						y("div", { class: v(S(O).confirmDialogActions) }, [D(S(he), {
							class: v(["tc-interactive", [S(O).appButton, S(O).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: u(() => [T(h(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), y("button", {
							type: "button",
							class: v(["tc-interactive", [S(O).appButton, S(O).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: a
						}, [y("span", {
							class: v([S(O).appButtonContent, e.pending && S(O).appButtonContentPending]),
							"aria-hidden": "true"
						}, [y("span", { class: v(S(O).appButtonLabel) }, h(e.confirmLabel), 3)], 2), e.pending ? (s(), f("span", {
							key: 0,
							class: v(S(O).appButtonSpinner),
							"aria-hidden": "true"
						}, [D(k, {
							icon: S(te),
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
