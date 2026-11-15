import { E as e, G as t, I as n, J as r, K as i, L as a, N as o, S as s, T as c, Y as l, _ as u, b as d, ft as f, g as p, h as m, it as h, k as g, l as _, lt as v, m as y, mt as b, s as x, tt as S, z as C } from "./vue-i18n-BQWz_HuU.js";
import { t as ee } from "./AppIcon-B1iv8vRB.js";
import { t as w } from "./components_styles-Cab5IILs.js";
import { N as T, P as E, S as D, a as O, c as k, d as A, f as j, l as M, m as N, n as P, p as F, s as I, u as L, v as R } from "./Teleport-B2amidH8.js";
import { t as z } from "./AppTooltip-DuggrS-8.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function B() {
	let e = h();
	return {
		primitiveElement: e,
		currentElement: y(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : R(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [V, H] = /*#__PURE__*/ E("DialogRoot"), U = /* @__PURE__ */ s({
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
		}), i = h(), a = h(), { modal: o, unmountOnHide: s } = v(n);
		return H({
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
		}), (e, t) => C(e.$slots, "default", {
			open: f(r),
			close: () => r.value = !1
		});
	}
}), W = /* @__PURE__ */ s({
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
		j();
		let i = V();
		return (e, a) => (n(), p(f(I), g(t, {
			type: e.as === "button" ? "button" : void 0,
			onClick: a[0] ||= (e) => f(i).onOpenChange(!1)
		}), {
			default: r(() => [C(e.$slots, "default")]),
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
	let t = T();
	for (let n of e) if (n === t || (n.focus(), T() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var X = /* @__PURE__ */ s({
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
	setup(e, { emit: t }) {
		let i = e, a = t, s = V(), { forwardRef: c, currentElement: l } = j();
		return s.titleId ||= L(void 0, "reka-dialog-title"), s.descriptionId ||= L(void 0, "reka-dialog-description"), o(() => {
			s.contentElement = l, T() !== document.body && (s.triggerElement.value = T());
		}), (e, t) => (n(), p(f(P), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: t[5] ||= (e) => a("openAutoFocus", e),
			onUnmountAutoFocus: t[6] ||= (e) => a("closeAutoFocus", e)
		}, {
			default: r(() => [d(f(O), g({
				id: f(s).contentId,
				ref: f(c),
				as: e.as,
				"as-child": e.asChild,
				present: i.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": f(s).descriptionId,
				"aria-labelledby": f(s).titleId,
				"data-state": f(J)(f(s).open.value)
			}, e.$attrs, {
				onDismiss: t[0] ||= (e) => f(s).onOpenChange(!1),
				onEscapeKeyDown: t[1] ||= (e) => a("escapeKeyDown", e),
				onFocusOutside: t[2] ||= (e) => a("focusOutside", e),
				onInteractOutside: t[3] ||= (e) => a("interactOutside", e),
				onPointerDownOutside: t[4] ||= (e) => a("pointerDownOutside", e)
			}), {
				default: r(() => [C(e.$slots, "default")]),
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
}), Z = /* @__PURE__ */ s({
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
	setup(e, { emit: i }) {
		let a = e, o = i, s = V(), c = F(o), { forwardRef: l, currentElement: u } = j(), d = y(() => a.present ? u.value : void 0);
		A(d);
		let m = y(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return t(() => a.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (e, t) => (n(), p(X, g({
			...m.value,
			...f(c)
		}, {
			ref: f(l),
			present: e.present,
			"trap-focus": f(s).open.value,
			"disable-outside-pointer-events": a.disableOutsidePointerEvents,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), f(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: t[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: t[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: r(() => [C(e.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), Q = /* @__PURE__ */ s({
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
	setup(e, { emit: i }) {
		let a = e, o = F(i);
		j();
		let s = V(), c = h(!1), l = h(!1), u = y(() => {
			let { present: e, ...t } = a;
			return t;
		});
		return t(() => a.present, (e, t) => {
			!e && t && (c.value || s.triggerElement.value?.focus(), c.value = !1, l.value = !1);
		}), (e, t) => (n(), p(X, g({
			...u.value,
			...f(o)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: t[0] ||= (e) => {
				e.defaultPrevented || (c.value || f(s).triggerElement.value?.focus(), e.preventDefault()), c.value = !1, l.value = !1;
			},
			onInteractOutside: t[1] ||= (e) => {
				e.defaultPrevented || (c.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
				let t = e.target;
				f(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
			}
		}), {
			default: r(() => [C(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), te = /* @__PURE__ */ s({
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
		let i = e, a = t, o = V(), s = F(a), { forwardRef: c } = j();
		return (e, t) => (n(), p(f(M), {
			present: e.forceMount || f(o).open.value,
			"force-mount": e.forceMount || !f(o).unmountOnHide.value
		}, {
			default: r(({ present: t }) => [f(o).modal.value ? l((n(), p(Z, g({
				key: 0,
				ref: f(c),
				present: f(o).unmountOnHide.value || t
			}, {
				...i,
				...f(s),
				...e.$attrs
			}), {
				default: r(() => [C(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[x, f(o).unmountOnHide.value || t]]) : l((n(), p(Q, g({
				key: 1,
				ref: f(c),
				present: f(o).unmountOnHide.value || t
			}, {
				...i,
				...f(s),
				...e.$attrs
			}), {
				default: r(() => [C(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[x, f(o).unmountOnHide.value || t]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), ne = /* @__PURE__ */ s({
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
		j();
		let i = V();
		return (e, a) => (n(), p(f(I), g(t, { id: f(i).descriptionId }), {
			default: r(() => [C(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), re = /* @__PURE__ */ s({
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
		let i = e, a = V(), o = N(i.present);
		return t(() => i.present, (e) => o.value = e), j(), (e, t) => (n(), p(f(I), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": f(a).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= _(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: r(() => [C(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), ie = /* @__PURE__ */ s({
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
		let t = V(), { forwardRef: i } = j();
		return (e, a) => f(t)?.modal.value ? (n(), p(f(M), {
			key: 0,
			present: e.forceMount || f(t).open.value,
			"force-mount": e.forceMount || !f(t).unmountOnHide.value
		}, {
			default: r(({ present: n }) => [l(d(re, g(e.$attrs, {
				ref: f(i),
				as: e.as,
				"as-child": e.asChild,
				present: f(t).unmountOnHide.value || n
			}), {
				default: r(() => [C(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[x, f(t).unmountOnHide.value || n]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : u("v-if", !0);
	}
}), ae = /* @__PURE__ */ s({
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
		let t = e, i = V();
		return j(), (e, a) => (n(), p(f(I), g(t, { id: f(i).titleId }), {
			default: r(() => [C(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $ = "data-reka-collection-item";
function oe(n = {}) {
	let { key: r = "", isProvider: o = !1 } = n, l = `${r}CollectionProvider`, u;
	if (o) {
		let e = h(/* @__PURE__ */ new Map());
		u = {
			collectionRef: h(),
			itemMap: e
		}, a(l, u);
	} else u = e(l);
	let d = (e = !1) => {
		let t = u.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${$}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(u.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, f = /*#__PURE__*/ s({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: n, attrs: r }) {
			let { primitiveElement: i, currentElement: a } = B();
			return t(a, () => {
				u.collectionRef.value = a.value;
			}), () => c(k, {
				ref: i,
				...r
			}, n);
		}
	}), p = /*#__PURE__*/ s({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: a } = B();
			return i((t) => {
				if (a.value) {
					let n = S(a.value);
					u.itemMap.value.set(n, {
						ref: a.value,
						value: e.value
					}), t(() => u.itemMap.value.delete(n));
				}
			}), () => c(k, {
				...n,
				[$]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: d,
		reactiveItems: y(() => Array.from(u.itemMap.value.values())),
		itemMapSize: y(() => u.itemMap.value.size),
		CollectionSlot: f,
		CollectionItem: p
	};
}
//#endregion
//#region src/ui/components/IconButton.vue?vue&type=script&setup=true&lang.ts
var se = [
	"aria-label",
	"aria-pressed",
	"disabled"
], ce = /* @__PURE__ */ s({
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
		let i = e, a = t, o = {
			sm: w.iconButtonSm,
			md: w.iconButtonMd,
			lg: w.iconButtonLg
		}, s = {
			sm: 16,
			md: 18,
			lg: 22
		}, c = y(() => o[i.size]), l = y(() => s[i.size]);
		function u(e) {
			i.disabled || a("click", e);
		}
		return (t, i) => (n(), p(z, { content: e.tooltip ?? e.label }, {
			default: r(() => [m("button", {
				type: "button",
				class: b(["tc-interactive", [
					f(w).iconButton,
					c.value,
					e.destructive && f(w).iconButtonDestructive,
					e.pressed === !0 && f(w).iconButtonPressed
				]]),
				"aria-label": e.label,
				"aria-pressed": e.pressed === null ? void 0 : e.pressed,
				disabled: e.disabled,
				onClick: u
			}, [d(ee, {
				icon: e.icon,
				size: l.value
			}, null, 8, ["icon", "size"])], 10, se)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { ne as a, W as c, ie as i, U as l, oe as n, te as o, ae as r, Y as s, ce as t, B as u };
