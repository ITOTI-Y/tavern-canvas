import { D as e, F as t, G as n, H as r, K as i, L as a, P as o, Q as s, T as c, U as l, c as u, dt as d, g as f, h as p, j as m, lt as h, m as g, o as _, ot as v, p as y, tt as b, w as x, x as S, y as C } from "./vue-i18n-L-BrQRnK.js";
import { t as w } from "./AppIcon-DkyxvN8k.js";
import { t as T } from "./components_styles-cMkBAg-0.js";
import { N as E, P as D, S as ee, a as O, c as k, d as A, f as j, l as M, m as N, n as P, p as F, s as I, u as L, v as R } from "./Teleport-CquQcgiX.js";
import { t as z } from "./AppTooltip-CrGQyPAP.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function B() {
	let e = b();
	return {
		primitiveElement: e,
		currentElement: y(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : R(e))
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
		}), i = b(), o = b(), { modal: s, unmountOnHide: c } = v(n);
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
			open: h(r),
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
		let r = t;
		j();
		let i = V();
		return (t, s) => (o(), p(h(I), e(r, {
			type: t.as === "button" ? "button" : void 0,
			onClick: s[0] ||= (e) => h(i).onOpenChange(!1)
		}), {
			default: n(() => [a(t.$slots, "default")]),
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
	setup(t, { emit: r }) {
		let i = t, s = r, c = V(), { forwardRef: l, currentElement: u } = j();
		return c.titleId ||= L(void 0, "reka-dialog-title"), c.descriptionId ||= L(void 0, "reka-dialog-description"), m(() => {
			c.contentElement = u, E() !== document.body && (c.triggerElement.value = E());
		}), (t, r) => (o(), p(h(P), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: r[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: r[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: n(() => [C(h(O), e({
				id: h(c).contentId,
				ref: h(l),
				as: t.as,
				"as-child": t.asChild,
				present: i.present,
				"disable-outside-pointer-events": t.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": h(c).descriptionId,
				"aria-labelledby": h(c).titleId,
				"data-state": h(J)(h(c).open.value)
			}, t.$attrs, {
				onDismiss: r[0] ||= (e) => h(c).onOpenChange(!1),
				onEscapeKeyDown: r[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: r[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: r[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: r[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: n(() => [a(t.$slots, "default")]),
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
	setup(t, { emit: i }) {
		let s = t, c = i, l = V(), u = F(c), { forwardRef: d, currentElement: f } = j(), m = y(() => s.present ? f.value : void 0);
		A(m);
		let g = y(() => {
			let { present: e, ...t } = s;
			return t;
		});
		return r(() => s.present, (e, t) => {
			!e && t && l.triggerElement.value?.focus();
		}), (t, r) => (o(), p(X, e({
			...g.value,
			...h(u)
		}, {
			ref: h(d),
			present: t.present,
			"trap-focus": h(l).open.value,
			"disable-outside-pointer-events": s.disableOutsidePointerEvents,
			onCloseAutoFocus: r[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), h(l).triggerElement.value?.focus());
			},
			onPointerDownOutside: r[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: r[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: n(() => [a(t.$slots, "default")]),
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
	setup(t, { emit: i }) {
		let s = t, c = F(i);
		j();
		let l = V(), u = b(!1), d = b(!1), f = y(() => {
			let { present: e, ...t } = s;
			return t;
		});
		return r(() => s.present, (e, t) => {
			!e && t && (u.value || l.triggerElement.value?.focus(), u.value = !1, d.value = !1);
		}), (t, r) => (o(), p(X, e({
			...f.value,
			...h(c)
		}, {
			present: t.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: r[0] ||= (e) => {
				e.defaultPrevented || (u.value || h(l).triggerElement.value?.focus(), e.preventDefault()), u.value = !1, d.value = !1;
			},
			onInteractOutside: r[1] ||= (e) => {
				e.defaultPrevented || (u.value = !0, e.detail.originalEvent.type === "pointerdown" && (d.value = !0));
				let t = e.target;
				h(l).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && d.value && e.preventDefault();
			}
		}), {
			default: n(() => [a(t.$slots, "default")]),
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
	setup(t, { emit: r }) {
		let s = t, c = r, l = V(), u = F(c), { forwardRef: d } = j();
		return (t, r) => (o(), p(h(M), {
			present: t.forceMount || h(l).open.value,
			"force-mount": t.forceMount || !h(l).unmountOnHide.value
		}, {
			default: n(({ present: r }) => [h(l).modal.value ? i((o(), p(Z, e({
				key: 0,
				ref: h(d),
				present: h(l).unmountOnHide.value || r
			}, {
				...s,
				...h(u),
				...t.$attrs
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, h(l).unmountOnHide.value || r]]) : i((o(), p(Q, e({
				key: 1,
				ref: h(d),
				present: h(l).unmountOnHide.value || r
			}, {
				...s,
				...h(u),
				...t.$attrs
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, h(l).unmountOnHide.value || r]])]),
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
		let r = t;
		j();
		let i = V();
		return (t, s) => (o(), p(h(I), e(r, { id: h(i).descriptionId }), {
			default: n(() => [a(t.$slots, "default")]),
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
	setup(e) {
		let t = e, i = V(), s = N(t.present);
		return r(() => t.present, (e) => s.value = e), j(), (e, t) => (o(), p(h(I), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": h(i).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= u(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: n(() => [a(e.$slots, "default")]),
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
		let r = V(), { forwardRef: s } = j();
		return (t, c) => h(r)?.modal.value ? (o(), p(h(M), {
			key: 0,
			present: t.forceMount || h(r).open.value,
			"force-mount": t.forceMount || !h(r).unmountOnHide.value
		}, {
			default: n(({ present: o }) => [i(C(re, e(t.$attrs, {
				ref: h(s),
				as: t.as,
				"as-child": t.asChild,
				present: h(r).unmountOnHide.value || o
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[_, h(r).unmountOnHide.value || o]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : f("v-if", !0);
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
		let r = t, i = V();
		return j(), (t, s) => (o(), p(h(I), e(r, { id: h(i).titleId }), {
			default: n(() => [a(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $ = "data-reka-collection-item";
function oe(e = {}) {
	let { key: n = "", isProvider: i = !1 } = e, a = `${n}CollectionProvider`, o;
	if (i) {
		let e = b(/* @__PURE__ */ new Map());
		o = {
			collectionRef: b(),
			itemMap: e
		}, t(a, o);
	} else o = c(a);
	let u = (e = !1) => {
		let t = o.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${$}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(o.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, d = /*#__PURE__*/ S({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: i, currentElement: a } = B();
			return r(a, () => {
				o.collectionRef.value = a.value;
			}), () => x(k, {
				ref: i,
				...n
			}, t);
		}
	}), f = /*#__PURE__*/ S({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = B();
			return l((t) => {
				if (i.value) {
					let n = s(i.value);
					o.itemMap.value.set(n, {
						ref: i.value,
						value: e.value
					}), t(() => o.itemMap.value.delete(n));
				}
			}), () => x(k, {
				...n,
				[$]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: u,
		reactiveItems: y(() => Array.from(o.itemMap.value.values())),
		itemMapSize: y(() => o.itemMap.value.size),
		CollectionSlot: d,
		CollectionItem: f
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
	setup(e, { emit: t }) {
		let r = e, i = t, a = {
			sm: T.iconButtonSm,
			md: T.iconButtonMd,
			lg: T.iconButtonLg
		}, s = {
			sm: 16,
			md: 18,
			lg: 22
		}, c = y(() => a[r.size]), l = y(() => s[r.size]);
		function u(e) {
			r.disabled || i("click", e);
		}
		return (t, r) => (o(), p(z, { content: e.tooltip ?? e.label }, {
			default: n(() => [g("button", {
				type: "button",
				class: d(["tc-interactive", [
					h(T).iconButton,
					c.value,
					e.destructive && h(T).iconButtonDestructive,
					e.pressed === !0 && h(T).iconButtonPressed
				]]),
				"aria-label": e.label,
				"aria-pressed": e.pressed === null ? void 0 : e.pressed,
				disabled: e.disabled,
				onClick: u
			}, [C(w, {
				icon: e.icon,
				size: l.value
			}, null, 8, ["icon", "size"])], 10, se)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { ne as a, W as c, ie as i, U as l, oe as n, te as o, ae as r, Y as s, ce as t, B as u };
