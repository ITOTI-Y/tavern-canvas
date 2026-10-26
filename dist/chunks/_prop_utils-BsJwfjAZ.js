import { A as e, D as t, F as n, G as r, H as i, I as a, N as o, P as s, S as c, T as l, V as u, W as d, Z as f, _ as p, at as m, c as h, ct as g, et as _, g as v, h as y, o as b, ot as x, p as S, u as C, w, x as T, y as E } from "./vue-i18n-DUz2Gjn8.js";
import { _ as D, a as O, c as k, i as A, j as ee, l as j, n as te, o as M, p as N, s as P } from "./Teleport-C7mDSUEl.js";
import { a as ne, i as re, o as F, t as I } from "./FocusScope-B2vRGnoX.js";
import { a as L } from "./PopperContent-a3U-C0mc.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function R(e) {
	return S(() => !x(e) || !!N(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function z() {
	let e = c()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function B() {
	let e = _();
	return {
		primitiveElement: e,
		currentElement: S(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : N(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [V, H] = /*#__PURE__*/ ee("DialogRoot"), U = /* @__PURE__ */ T({
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
		let n = e, r = D(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), i = _(), o = _(), { modal: s, unmountOnHide: c } = m(n);
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
			contentElement: o
		}), (e, t) => a(e.$slots, "default", {
			open: g(r),
			close: () => r.value = !1
		});
	}
}), W = /* @__PURE__ */ T({
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
		let n = e;
		k();
		let r = V();
		return (e, i) => (o(), y(g(A), t(n, {
			type: e.as === "button" ? "button" : void 0,
			onClick: i[0] ||= (e) => g(r).onOpenChange(!1)
		}), {
			default: d(() => [a(e.$slots, "default")]),
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
	let t = F();
	for (let n of e) if (n === t || (n.focus(), F() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var X = /* @__PURE__ */ T({
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
	setup(n, { emit: r }) {
		let i = n, s = r, c = V(), { forwardRef: l, currentElement: u } = k();
		return c.titleId ||= P(void 0, "reka-dialog-title"), c.descriptionId ||= P(void 0, "reka-dialog-description"), e(() => {
			c.contentElement = u, F() !== document.body && (c.triggerElement.value = F());
		}), (e, n) => (o(), y(g(I), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: n[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: n[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: d(() => [E(g(te), t({
				id: g(c).contentId,
				ref: g(l),
				as: e.as,
				"as-child": e.asChild,
				present: i.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": g(c).descriptionId,
				"aria-labelledby": g(c).titleId,
				"data-state": g(J)(g(c).open.value)
			}, e.$attrs, {
				onDismiss: n[0] ||= (e) => g(c).onOpenChange(!1),
				onEscapeKeyDown: n[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: n[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: n[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: n[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: d(() => [a(e.$slots, "default")]),
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
}), ie = /* @__PURE__ */ T({
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
	setup(e, { emit: n }) {
		let r = e, i = n, s = V(), c = j(i), { forwardRef: l, currentElement: f } = k(), p = S(() => r.present ? f.value : void 0);
		re(p);
		let m = S(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return u(() => r.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (e, n) => (o(), y(X, t({
			...m.value,
			...g(c)
		}, {
			ref: g(l),
			present: e.present,
			"trap-focus": g(s).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), g(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: n[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: n[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), ae = /* @__PURE__ */ T({
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
	setup(e, { emit: n }) {
		let r = e, i = j(n);
		k();
		let s = V(), c = _(!1), l = _(!1), f = S(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return u(() => r.present, (e, t) => {
			!e && t && (c.value || s.triggerElement.value?.focus(), c.value = !1, l.value = !1);
		}), (e, n) => (o(), y(X, t({
			...f.value,
			...g(i)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (c.value || g(s).triggerElement.value?.focus(), e.preventDefault()), c.value = !1, l.value = !1;
			},
			onInteractOutside: n[1] ||= (e) => {
				e.defaultPrevented || (c.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
				let t = e.target;
				g(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
			}
		}), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), oe = /* @__PURE__ */ T({
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
	setup(e, { emit: n }) {
		let i = e, s = n, c = V(), l = j(s), { forwardRef: u } = k();
		return (e, n) => (o(), y(g(M), {
			present: e.forceMount || g(c).open.value,
			"force-mount": e.forceMount || !g(c).unmountOnHide.value
		}, {
			default: d(({ present: n }) => [g(c).modal.value ? r((o(), y(ie, t({
				key: 0,
				ref: g(u),
				present: g(c).unmountOnHide.value || n
			}, {
				...i,
				...g(l),
				...e.$attrs
			}), {
				default: d(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, g(c).unmountOnHide.value || n]]) : r((o(), y(ae, t({
				key: 1,
				ref: g(u),
				present: g(c).unmountOnHide.value || n
			}, {
				...i,
				...g(l),
				...e.$attrs
			}), {
				default: d(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[b, g(c).unmountOnHide.value || n]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), Z = /* @__PURE__ */ T({
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
		let n = e;
		k();
		let r = V();
		return (e, i) => (o(), y(g(A), t(n, { id: g(r).descriptionId }), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), se = /* @__PURE__ */ T({
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
		let t = e, n = V(), r = ne(t.present);
		return u(() => t.present, (e) => r.value = e), k(), (e, t) => (o(), y(g(A), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": g(n).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= h(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), ce = /* @__PURE__ */ T({
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
		let n = V(), { forwardRef: i } = k();
		return (e, s) => g(n)?.modal.value ? (o(), y(g(M), {
			key: 0,
			present: e.forceMount || g(n).open.value,
			"force-mount": e.forceMount || !g(n).unmountOnHide.value
		}, {
			default: d(({ present: o }) => [r(E(se, t(e.$attrs, {
				ref: g(i),
				as: e.as,
				"as-child": e.asChild,
				present: g(n).unmountOnHide.value || o
			}), {
				default: d(() => [a(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[b, g(n).unmountOnHide.value || o]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : v("v-if", !0);
	}
}), le = /* @__PURE__ */ T({
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
		let n = e, r = V();
		return k(), (e, i) => (o(), y(g(A), t(n, { id: g(r).titleId }), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Q = "data-reka-collection-item";
function ue(e = {}) {
	let { key: t = "", isProvider: n = !1 } = e, r = `${t}CollectionProvider`, a;
	if (n) {
		let e = _(/* @__PURE__ */ new Map());
		a = {
			collectionRef: _(),
			itemMap: e
		}, s(r, a);
	} else a = l(r);
	let o = (e = !1) => {
		let t = a.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${Q}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(a.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, c = /*#__PURE__*/ T({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = B();
			return u(i, () => {
				a.collectionRef.value = i.value;
			}), () => w(O, {
				ref: r,
				...n
			}, t);
		}
	}), d = /*#__PURE__*/ T({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: o } = B();
			return i((t) => {
				if (o.value) {
					let n = f(o.value);
					a.itemMap.value.set(n, {
						ref: o.value,
						value: e.value
					}), t(() => a.itemMap.value.delete(n));
				}
			}), () => w(O, {
				...n,
				[Q]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: o,
		reactiveItems: S(() => Array.from(a.itemMap.value.values())),
		itemMapSize: S(() => a.itemMap.value.size),
		CollectionSlot: c,
		CollectionItem: d
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var $ = /* @__PURE__ */ T({
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
		let n = e, { primitiveElement: r, currentElement: i } = B(), a = S(() => n.checked ?? n.value);
		return u(a, (e, t) => {
			if (!i.value) return;
			let n = i.value, r = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(r, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, i) => (o(), y(L, t({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...n,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), de = /* @__PURE__ */ T({
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
		let r = e, i = S(() => typeof r.value == "object" && Array.isArray(r.value) && r.value.length === 0 && r.required), a = S(() => typeof r.value == "string" || typeof r.value == "number" || typeof r.value == "boolean" || r.value === null || r.value === void 0 ? [{
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
		return (e, s) => (o(), p(C, null, [v(" We render single input if it's required "), i.value ? (o(), y($, t({ key: e.name }, {
			...r,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (o(!0), p(C, { key: 1 }, n(a.value, (n) => (o(), y($, t({ key: n.name }, { ref_for: !0 }, {
			...r,
			...e.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
});
//#endregion
//#region src/ui/components/_prop_utils.ts
function fe(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		r !== void 0 && (t[n] = r);
	}
	return t;
}
//#endregion
export { ce as a, Y as c, B as d, z as f, le as i, W as l, de as n, Z as o, R as p, ue as r, oe as s, fe as t, U as u };
