import { A as e, D as t, G as n, H as r, I as i, N as a, P as o, T as s, V as c, W as l, Z as u, at as d, c as f, ct as p, et as m, g as h, h as g, o as _, p as v, w as y, x as b, y as x } from "./vue-i18n-DUz2Gjn8.js";
import { _ as S, a as C, c as w, i as T, j as E, l as D, n as ee, o as O, p as k, s as A } from "./Teleport-C7mDSUEl.js";
import { a as j, i as M, o as N, t as P } from "./FocusScope-B2vRGnoX.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function F() {
	let e = m();
	return {
		primitiveElement: e,
		currentElement: v(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : k(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [I, L] = /*#__PURE__*/ E("DialogRoot"), R = /* @__PURE__ */ b({
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
		let n = e, r = S(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), a = m(), o = m(), { modal: s, unmountOnHide: c } = d(n);
		return L({
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
			triggerElement: a,
			contentElement: o
		}), (e, t) => i(e.$slots, "default", {
			open: p(r),
			close: () => r.value = !1
		});
	}
}), z = /* @__PURE__ */ b({
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
		w();
		let r = I();
		return (e, o) => (a(), g(p(T), t(n, {
			type: e.as === "button" ? "button" : void 0,
			onClick: o[0] ||= (e) => p(r).onOpenChange(!1)
		}), {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), B = ["Enter", " "], V = [
	"ArrowDown",
	"PageUp",
	"Home"
], H = [
	"ArrowUp",
	"PageDown",
	"End"
];
[...V, ...H], [...B], [...B];
function U(e) {
	return e ? "open" : "closed";
}
function W(e) {
	let t = N();
	for (let n of e) if (n === t || (n.focus(), N() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var G = /* @__PURE__ */ b({
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
		let o = n, s = r, c = I(), { forwardRef: u, currentElement: d } = w();
		return c.titleId ||= A(void 0, "reka-dialog-title"), c.descriptionId ||= A(void 0, "reka-dialog-description"), e(() => {
			c.contentElement = d, N() !== document.body && (c.triggerElement.value = N());
		}), (e, n) => (a(), g(p(P), {
			"as-child": "",
			loop: "",
			trapped: o.trapFocus,
			present: o.present,
			onMountAutoFocus: n[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: n[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: l(() => [x(p(ee), t({
				id: p(c).contentId,
				ref: p(u),
				as: e.as,
				"as-child": e.asChild,
				present: o.present,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": p(c).descriptionId,
				"aria-labelledby": p(c).titleId,
				"data-state": p(U)(p(c).open.value)
			}, e.$attrs, {
				onDismiss: n[0] ||= (e) => p(c).onOpenChange(!1),
				onEscapeKeyDown: n[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: n[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: n[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: n[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: l(() => [i(e.$slots, "default")]),
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
}), K = /* @__PURE__ */ b({
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
		let r = e, o = n, s = I(), u = D(o), { forwardRef: d, currentElement: f } = w(), m = v(() => r.present ? f.value : void 0);
		M(m);
		let h = v(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return c(() => r.present, (e, t) => {
			!e && t && s.triggerElement.value?.focus();
		}), (e, n) => (a(), g(G, t({
			...h.value,
			...p(u)
		}, {
			ref: p(d),
			present: e.present,
			"trap-focus": p(s).open.value,
			"disable-outside-pointer-events": r.disableOutsidePointerEvents,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), p(s).triggerElement.value?.focus());
			},
			onPointerDownOutside: n[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: n[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), q = /* @__PURE__ */ b({
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
		let r = e, o = D(n);
		w();
		let s = I(), u = m(!1), d = m(!1), f = v(() => {
			let { present: e, ...t } = r;
			return t;
		});
		return c(() => r.present, (e, t) => {
			!e && t && (u.value || s.triggerElement.value?.focus(), u.value = !1, d.value = !1);
		}), (e, n) => (a(), g(G, t({
			...f.value,
			...p(o)
		}, {
			present: e.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (u.value || p(s).triggerElement.value?.focus(), e.preventDefault()), u.value = !1, d.value = !1;
			},
			onInteractOutside: n[1] ||= (e) => {
				e.defaultPrevented || (u.value = !0, e.detail.originalEvent.type === "pointerdown" && (d.value = !0));
				let t = e.target;
				p(s).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && d.value && e.preventDefault();
			}
		}), {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), J = /* @__PURE__ */ b({
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
	setup(e, { emit: r }) {
		let o = e, s = r, c = I(), u = D(s), { forwardRef: d } = w();
		return (e, r) => (a(), g(p(O), {
			present: e.forceMount || p(c).open.value,
			"force-mount": e.forceMount || !p(c).unmountOnHide.value
		}, {
			default: l(({ present: r }) => [p(c).modal.value ? n((a(), g(K, t({
				key: 0,
				ref: p(d),
				present: p(c).unmountOnHide.value || r
			}, {
				...o,
				...p(u),
				...e.$attrs
			}), {
				default: l(() => [i(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, p(c).unmountOnHide.value || r]]) : n((a(), g(q, t({
				key: 1,
				ref: p(d),
				present: p(c).unmountOnHide.value || r
			}, {
				...o,
				...p(u),
				...e.$attrs
			}), {
				default: l(() => [i(e.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[_, p(c).unmountOnHide.value || r]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), Y = /* @__PURE__ */ b({
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
		w();
		let r = I();
		return (e, o) => (a(), g(p(T), t(n, { id: p(r).descriptionId }), {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), X = /* @__PURE__ */ b({
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
		let t = e, n = I(), r = j(t.present);
		return c(() => t.present, (e) => r.value = e), w(), (e, t) => (a(), g(p(T), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": p(n).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: t[0] ||= f(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), Z = /* @__PURE__ */ b({
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
		let r = I(), { forwardRef: o } = w();
		return (e, s) => p(r)?.modal.value ? (a(), g(p(O), {
			key: 0,
			present: e.forceMount || p(r).open.value,
			"force-mount": e.forceMount || !p(r).unmountOnHide.value
		}, {
			default: l(({ present: a }) => [n(x(X, t(e.$attrs, {
				ref: p(o),
				as: e.as,
				"as-child": e.asChild,
				present: p(r).unmountOnHide.value || a
			}), {
				default: l(() => [i(e.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[_, p(r).unmountOnHide.value || a]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : h("v-if", !0);
	}
}), Q = /* @__PURE__ */ b({
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
		let n = e, r = I();
		return w(), (e, o) => (a(), g(p(T), t(n, { id: p(r).titleId }), {
			default: l(() => [i(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $ = "data-reka-collection-item";
function te(e = {}) {
	let { key: t = "", isProvider: n = !1 } = e, i = `${t}CollectionProvider`, a;
	if (n) {
		let e = m(/* @__PURE__ */ new Map());
		a = {
			collectionRef: m(),
			itemMap: e
		}, o(i, a);
	} else a = s(i);
	let l = (e = !1) => {
		let t = a.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${$}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(a.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, d = /*#__PURE__*/ b({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = F();
			return c(i, () => {
				a.collectionRef.value = i.value;
			}), () => y(C, {
				ref: r,
				...n
			}, t);
		}
	}), f = /*#__PURE__*/ b({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: i, currentElement: o } = F();
			return r((t) => {
				if (o.value) {
					let n = u(o.value);
					a.itemMap.value.set(n, {
						ref: o.value,
						value: e.value
					}), t(() => a.itemMap.value.delete(n));
				}
			}), () => y(C, {
				...n,
				[$]: "",
				ref: i
			}, t);
		}
	});
	return {
		getItems: l,
		reactiveItems: v(() => Array.from(a.itemMap.value.values())),
		itemMapSize: v(() => a.itemMap.value.size),
		CollectionSlot: d,
		CollectionItem: f
	};
}
//#endregion
export { J as a, R as c, Y as i, F as l, Q as n, W as o, Z as r, z as s, te as t };
