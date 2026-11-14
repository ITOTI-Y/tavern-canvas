import { F as e, G as t, I as n, J as r, M as i, O as a, R as o, T as s, W as c, c as l, ct as u, dt as d, et as f, g as p, h as m, m as h, o as g, p as _, pt as v, q as y, rt as b, w as x, x as S, y as C } from "./vue-i18n-XoxYzLIP.js";
import { t as w } from "./AppIcon-DD754F_c.js";
import { t as T } from "./components_styles-BXC5Dc_L.js";
import { N as E, P as D, S as ee, a as O, c as k, d as A, f as j, l as M, m as N, n as P, p as F, s as I, u as L, v as R } from "./Teleport-zHbQRGnp.js";
import { t as z } from "./AppTooltip-CmgWxKYL.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function B() {
	let e = b();
	return {
		primitiveElement: e,
		currentElement: _(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : R(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [V, H] = /*#__PURE__*/ D("DialogRoot"), U = /* @__PURE__ */ S({
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
		}), i = b(), a = b(), { modal: s, unmountOnHide: c } = u(n);
		return H({
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
			contentElement: a
		}), (e, t) => o(e.$slots, "default", {
			open: d(r),
			close: () => r.value = !1
		});
	}
}), W = /* @__PURE__ */ S({
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
		let n = t;
		j();
		let r = V();
		return (t, i) => (e(), m(d(I), a(n, {
			type: t.as === "button" ? "button" : void 0,
			onClick: i[0] ||= (e) => d(r).onOpenChange(!1)
		}), {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), G = ["Enter", " "], K = [
	"ArrowDown",
	"PageUp",
	"Home"
], q = [
	"ArrowUp",
	"PageDown",
	"End"
];
[...K, ...q], [...G], [...G];
function J(e) {
	return e ? "open" : "closed";
}
function Y(e) {
	let t = E();
	for (let n of e) if (n === t || (n.focus(), E() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var X = /* @__PURE__ */ S({
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
	setup(t, { emit: n }) {
		let r = t, s = n, c = V(), { forwardRef: l, currentElement: u } = j();
		return c.titleId ||= L(void 0, "reka-dialog-title"), c.descriptionId ||= L(void 0, "reka-dialog-description"), i(() => {
			c.contentElement = u, E() !== document.body && (c.triggerElement.value = E());
		}), (t, n) => (e(), m(d(P), {
			"as-child": "",
			loop: "",
			trapped: r.trapFocus,
			present: r.present,
			onMountAutoFocus: n[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: n[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: y(() => [C(d(O), a({
				id: d(c).contentId,
				ref: d(l),
				as: t.as,
				"as-child": t.asChild,
				present: r.present,
				"disable-outside-pointer-events": t.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": d(c).descriptionId,
				"aria-labelledby": d(c).titleId,
				"data-state": d(J)(d(c).open.value)
			}, t.$attrs, {
				onDismiss: n[0] ||= (e) => d(c).onOpenChange(!1),
				onEscapeKeyDown: n[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: n[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: n[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: n[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: y(() => [o(t.$slots, "default")]),
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
}), Z = /* @__PURE__ */ S({
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
	setup(t, { emit: n }) {
		let r = t, i = n, s = V(), l = F(i), { forwardRef: u, currentElement: f } = j(), p = _(() => r.present ? f.value : void 0);
		A(p);
		let h = _(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return c(() => r.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (t, n) => (e(), m(X, a({
			...h.value,
			...d(l)
		}, {
			ref: d(u),
			present: t.present,
			"trap-focus": d(s).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), d(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: n[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: n[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), Q = /* @__PURE__ */ S({
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
	setup(t, { emit: n }) {
		let r = t, i = F(n);
		j();
		let s = V(), l = b(!1), u = b(!1), f = _(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return c(() => r.present, (e, t) => {
			!e && t && (l.value || s.triggerElement.value?.focus(), l.value = !1, u.value = !1);
		}), (t, n) => (e(), m(X, a({
			...f.value,
			...d(i)
		}, {
			present: t.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (l.value || d(s).triggerElement.value?.focus(), e.preventDefault()), l.value = !1, u.value = !1;
			},
			onInteractOutside: n[1] ||= (e) => {
				e.defaultPrevented || (l.value = !0, e.detail.originalEvent.type === "pointerdown" && (u.value = !0));
				let t = e.target;
				d(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && u.value && e.preventDefault();
			}
		}), {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), te = /* @__PURE__ */ S({
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
	setup(t, { emit: n }) {
		let i = t, s = n, c = V(), l = F(s), { forwardRef: u } = j();
		return (t, n) => (e(), m(d(M), {
			present: t.forceMount || d(c).open.value,
			"force-mount": t.forceMount || !d(c).unmountOnHide.value
		}, {
			default: y(({ present: n }) => [d(c).modal.value ? r((e(), m(Z, a({
				key: 0,
				ref: d(u),
				present: d(c).unmountOnHide.value || n
			}, {
				...i,
				...d(l),
				...t.$attrs
			}), {
				default: y(() => [o(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[g, d(c).unmountOnHide.value || n]]) : r((e(), m(Q, a({
				key: 1,
				ref: d(u),
				present: d(c).unmountOnHide.value || n
			}, {
				...i,
				...d(l),
				...t.$attrs
			}), {
				default: y(() => [o(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[g, d(c).unmountOnHide.value || n]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), ne = /* @__PURE__ */ S({
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
		let n = t;
		j();
		let r = V();
		return (t, i) => (e(), m(d(I), a(n, { id: d(r).descriptionId }), {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), re = /* @__PURE__ */ S({
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
	setup(t) {
		let n = t, r = V(), i = N(n.present);
		return c(() => n.present, (e) => i.value = e), j(), (t, n) => (e(), m(d(I), {
			as: t.as,
			"as-child": t.asChild,
			"data-state": d(r).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: n[0] ||= l(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), ie = /* @__PURE__ */ S({
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
		let n = V(), { forwardRef: i } = j();
		return (t, s) => d(n)?.modal.value ? (e(), m(d(M), {
			key: 0,
			present: t.forceMount || d(n).open.value,
			"force-mount": t.forceMount || !d(n).unmountOnHide.value
		}, {
			default: y(({ present: e }) => [r(C(re, a(t.$attrs, {
				ref: d(i),
				as: t.as,
				"as-child": t.asChild,
				present: d(n).unmountOnHide.value || e
			}), {
				default: y(() => [o(t.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[g, d(n).unmountOnHide.value || e]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : p("v-if", !0);
	}
}), ae = /* @__PURE__ */ S({
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
		let n = t, r = V();
		return j(), (t, i) => (e(), m(d(I), a(n, { id: d(r).titleId }), {
			default: y(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $ = "data-reka-collection-item";
function oe(e = {}) {
	let { key: r = "", isProvider: i = !1 } = e, a = `${r}CollectionProvider`, o;
	if (i) {
		let e = b(/* @__PURE__ */ new Map());
		o = {
			collectionRef: b(),
			itemMap: e
		}, n(a, o);
	} else o = s(a);
	let l = (e = !1) => {
		let t = o.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${$}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(o.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, u = /*#__PURE__*/ S({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = B();
			return c(i, () => {
				o.collectionRef.value = i.value;
			}), () => x(k, {
				ref: r,
				...n
			}, t);
		}
	}), d = /*#__PURE__*/ S({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: n, attrs: r }) {
			let { primitiveElement: i, currentElement: a } = B();
			return t((t) => {
				if (a.value) {
					let n = f(a.value);
					o.itemMap.value.set(n, {
						ref: a.value,
						value: e.value
					}), t(() => o.itemMap.value.delete(n));
				}
			}), () => x(k, {
				...r,
				[$]: "",
				ref: i
			}, n);
		}
	});
	return {
		getItems: l,
		reactiveItems: _(() => Array.from(o.itemMap.value.values())),
		itemMapSize: _(() => o.itemMap.value.size),
		CollectionSlot: u,
		CollectionItem: d
	};
}
//#endregion
//#region src/ui/components/IconButton.vue?vue&type=script&setup=true&lang.ts
var se = [
	"aria-label",
	"aria-pressed",
	"disabled"
], ce = /* @__PURE__ */ S({
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
	setup(t, { emit: n }) {
		let r = t, i = n, a = {
			sm: T.iconButtonSm,
			md: T.iconButtonMd,
			lg: T.iconButtonLg
		}, o = {
			sm: 16,
			md: 18,
			lg: 22
		}, s = _(() => a[r.size]), c = _(() => o[r.size]);
		function l(e) {
			r.disabled || i("click", e);
		}
		return (n, r) => (e(), m(z, { content: t.tooltip ?? t.label }, {
			default: y(() => [h("button", {
				type: "button",
				class: v(["tc-interactive", [
					d(T).iconButton,
					s.value,
					t.destructive && d(T).iconButtonDestructive,
					t.pressed === !0 && d(T).iconButtonPressed
				]]),
				"aria-label": t.label,
				"aria-pressed": t.pressed === null ? void 0 : t.pressed,
				disabled: t.disabled,
				onClick: l
			}, [C(w, {
				icon: t.icon,
				size: c.value
			}, null, 8, ["icon", "size"])], 10, se)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { ne as a, W as c, ie as i, U as l, oe as n, te as o, ae as r, Y as s, ce as t, B as u };
