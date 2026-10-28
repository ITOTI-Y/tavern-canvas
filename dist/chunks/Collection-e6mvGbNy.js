import { D as e, F as t, G as n, H as r, K as i, L as a, P as o, Q as s, T as c, U as l, c as u, g as d, h as f, j as p, lt as m, o as h, ot as g, p as _, tt as v, w as y, x as b, y as x } from "./vue-i18n-L-BrQRnK.js";
import { N as S, P as C, S as ee, a as w, c as T, d as E, f as D, l as O, m as k, n as A, p as j, s as M, u as N, v as P } from "./Teleport-CquQcgiX.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function F() {
	let e = v();
	return {
		primitiveElement: e,
		currentElement: _(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : P(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [I, L] = /*#__PURE__*/ C("DialogRoot"), R = /* @__PURE__ */ b({
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
		}), i = v(), o = v(), { modal: s, unmountOnHide: c } = g(n);
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
			triggerElement: i,
			contentElement: o
		}), (e, t) => a(e.$slots, "default", {
			open: m(r),
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
	setup(t) {
		let r = t;
		D();
		let i = I();
		return (t, s) => (o(), f(m(M), e(r, {
			type: t.as === "button" ? "button" : void 0,
			onClick: s[0] ||= (e) => m(i).onOpenChange(!1)
		}), {
			default: n(() => [a(t.$slots, "default")]),
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
	let t = S();
	for (let n of e) if (n === t || (n.focus(), S() !== t)) return;
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
	setup(t, { emit: r }) {
		let i = t, s = r, c = I(), { forwardRef: l, currentElement: u } = D();
		return c.titleId ||= N(void 0, "reka-dialog-title"), c.descriptionId ||= N(void 0, "reka-dialog-description"), p(() => {
			c.contentElement = u, S() !== document.body && (c.triggerElement.value = S());
		}), (t, r) => (o(), f(m(A), {
			"as-child": "",
			loop: "",
			trapped: i.trapFocus,
			present: i.present,
			onMountAutoFocus: r[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: r[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: n(() => [x(m(w), e({
				id: m(c).contentId,
				ref: m(l),
				as: t.as,
				"as-child": t.asChild,
				present: i.present,
				"disable-outside-pointer-events": t.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": m(c).descriptionId,
				"aria-labelledby": m(c).titleId,
				"data-state": m(U)(m(c).open.value)
			}, t.$attrs, {
				onDismiss: r[0] ||= (e) => m(c).onOpenChange(!1),
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
	setup(t, { emit: i }) {
		let s = t, c = i, l = I(), u = j(c), { forwardRef: d, currentElement: p } = D(), h = _(() => s.present ? p.value : void 0);
		E(h);
		let g = _(() => {
			let { present: e, ...t } = s;
			return t;
		});
		return r(() => s.present, (e, t) => {
			!e && t && l.triggerElement.value?.focus();
		}), (t, r) => (o(), f(G, e({
			...g.value,
			...m(u)
		}, {
			ref: m(d),
			present: t.present,
			"trap-focus": m(l).open.value,
			"disable-outside-pointer-events": s.disableOutsidePointerEvents,
			onCloseAutoFocus: r[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), m(l).triggerElement.value?.focus());
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
	setup(t, { emit: i }) {
		let s = t, c = j(i);
		D();
		let l = I(), u = v(!1), d = v(!1), p = _(() => {
			let { present: e, ...t } = s;
			return t;
		});
		return r(() => s.present, (e, t) => {
			!e && t && (u.value || l.triggerElement.value?.focus(), u.value = !1, d.value = !1);
		}), (t, r) => (o(), f(G, e({
			...p.value,
			...m(c)
		}, {
			present: t.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: r[0] ||= (e) => {
				e.defaultPrevented || (u.value || m(l).triggerElement.value?.focus(), e.preventDefault()), u.value = !1, d.value = !1;
			},
			onInteractOutside: r[1] ||= (e) => {
				e.defaultPrevented || (u.value = !0, e.detail.originalEvent.type === "pointerdown" && (d.value = !0));
				let t = e.target;
				m(l).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && d.value && e.preventDefault();
			}
		}), {
			default: n(() => [a(t.$slots, "default")]),
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
	setup(t, { emit: r }) {
		let s = t, c = r, l = I(), u = j(c), { forwardRef: d } = D();
		return (t, r) => (o(), f(m(O), {
			present: t.forceMount || m(l).open.value,
			"force-mount": t.forceMount || !m(l).unmountOnHide.value
		}, {
			default: n(({ present: r }) => [m(l).modal.value ? i((o(), f(K, e({
				key: 0,
				ref: m(d),
				present: m(l).unmountOnHide.value || r
			}, {
				...s,
				...m(u),
				...t.$attrs
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[h, m(l).unmountOnHide.value || r]]) : i((o(), f(q, e({
				key: 1,
				ref: m(d),
				present: m(l).unmountOnHide.value || r
			}, {
				...s,
				...m(u),
				...t.$attrs
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[h, m(l).unmountOnHide.value || r]])]),
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
	setup(t) {
		let r = t;
		D();
		let i = I();
		return (t, s) => (o(), f(m(M), e(r, { id: m(i).descriptionId }), {
			default: n(() => [a(t.$slots, "default")]),
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
		let t = e, i = I(), s = k(t.present);
		return r(() => t.present, (e) => s.value = e), D(), (e, t) => (o(), f(m(M), {
			as: e.as,
			"as-child": e.asChild,
			"data-state": m(i).open.value ? "open" : "closed",
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
	setup(t) {
		let r = I(), { forwardRef: s } = D();
		return (t, c) => m(r)?.modal.value ? (o(), f(m(O), {
			key: 0,
			present: t.forceMount || m(r).open.value,
			"force-mount": t.forceMount || !m(r).unmountOnHide.value
		}, {
			default: n(({ present: o }) => [i(x(X, e(t.$attrs, {
				ref: m(s),
				as: t.as,
				"as-child": t.asChild,
				present: m(r).unmountOnHide.value || o
			}), {
				default: n(() => [a(t.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[h, m(r).unmountOnHide.value || o]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : d("v-if", !0);
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
	setup(t) {
		let r = t, i = I();
		return D(), (t, s) => (o(), f(m(M), e(r, { id: m(i).titleId }), {
			default: n(() => [a(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $ = "data-reka-collection-item";
function te(e = {}) {
	let { key: n = "", isProvider: i = !1 } = e, a = `${n}CollectionProvider`, o;
	if (i) {
		let e = v(/* @__PURE__ */ new Map());
		o = {
			collectionRef: v(),
			itemMap: e
		}, t(a, o);
	} else o = c(a);
	let u = (e = !1) => {
		let t = o.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${$}]`)), r = new Map(n.map((e, t) => [e, t])), i = Array.from(o.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? i : i.filter((e) => e.ref.dataset.disabled !== "");
	}, d = /*#__PURE__*/ b({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: i, currentElement: a } = F();
			return r(a, () => {
				o.collectionRef.value = a.value;
			}), () => y(T, {
				ref: i,
				...n
			}, t);
		}
	}), f = /*#__PURE__*/ b({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: i } = F();
			return l((t) => {
				if (i.value) {
					let n = s(i.value);
					o.itemMap.value.set(n, {
						ref: i.value,
						value: e.value
					}), t(() => o.itemMap.value.delete(n));
				}
			}), () => y(T, {
				...n,
				[$]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: u,
		reactiveItems: _(() => Array.from(o.itemMap.value.values())),
		itemMapSize: _(() => o.itemMap.value.size),
		CollectionSlot: d,
		CollectionItem: f
	};
}
//#endregion
export { J as a, R as c, Y as i, F as l, Q as n, W as o, Z as r, z as s, te as t };
