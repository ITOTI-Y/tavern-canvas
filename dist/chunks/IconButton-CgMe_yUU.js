import { F as e, J as t, M as n, O as r, R as i, W as a, c as o, ct as s, dt as c, g as l, h as u, m as d, o as f, p, pt as m, q as h, rt as g, x as _, y as v } from "./vue-i18n-XoxYzLIP.js";
import { t as y } from "./AppIcon-DD754F_c.js";
import { t as b } from "./components_styles-CTlfgDU5.js";
import { N as x, P as S, S as C, a as w, d as T, f as E, l as D, m as O, n as k, p as A, s as j, u as M } from "./Teleport-zHbQRGnp.js";
import { t as N } from "./AppTooltip-D3BiEM01.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [P, F] = /*#__PURE__*/ S("DialogRoot"), I = /* @__PURE__ */ _({
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
		let n = e, r = C(n, "open", t, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), a = g(), o = g(), { modal: l, unmountOnHide: u } = s(n);
		return F({
			open: r,
			modal: l,
			unmountOnHide: u,
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
			open: c(r),
			close: () => r.value = !1
		});
	}
}), L = /* @__PURE__ */ _({
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
		E();
		let a = P();
		return (t, o) => (e(), u(c(j), r(n, {
			type: t.as === "button" ? "button" : void 0,
			onClick: o[0] ||= (e) => c(a).onOpenChange(!1)
		}), {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 16, ["type"]));
	}
}), R = ["Enter", " "], z = [
	"ArrowDown",
	"PageUp",
	"Home"
], B = [
	"ArrowUp",
	"PageDown",
	"End"
];
[...z, ...B], [...R], [...R];
function V(e) {
	return e ? "open" : "closed";
}
function H(e) {
	let t = x();
	for (let n of e) if (n === t || (n.focus(), x() !== t)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var U = /* @__PURE__ */ _({
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
		let o = t, s = a, l = P(), { forwardRef: d, currentElement: f } = E();
		return l.titleId ||= M(void 0, "reka-dialog-title"), l.descriptionId ||= M(void 0, "reka-dialog-description"), n(() => {
			l.contentElement = f, x() !== document.body && (l.triggerElement.value = x());
		}), (t, n) => (e(), u(c(k), {
			"as-child": "",
			loop: "",
			trapped: o.trapFocus,
			present: o.present,
			onMountAutoFocus: n[5] ||= (e) => s("openAutoFocus", e),
			onUnmountAutoFocus: n[6] ||= (e) => s("closeAutoFocus", e)
		}, {
			default: h(() => [v(c(w), r({
				id: c(l).contentId,
				ref: c(d),
				as: t.as,
				"as-child": t.asChild,
				present: o.present,
				"disable-outside-pointer-events": t.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": c(l).descriptionId,
				"aria-labelledby": c(l).titleId,
				"data-state": c(V)(c(l).open.value)
			}, t.$attrs, {
				onDismiss: n[0] ||= (e) => c(l).onOpenChange(!1),
				onEscapeKeyDown: n[1] ||= (e) => s("escapeKeyDown", e),
				onFocusOutside: n[2] ||= (e) => s("focusOutside", e),
				onInteractOutside: n[3] ||= (e) => s("interactOutside", e),
				onPointerDownOutside: n[4] ||= (e) => s("pointerDownOutside", e)
			}), {
				default: h(() => [i(t.$slots, "default")]),
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
}), W = /* @__PURE__ */ _({
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
		let o = t, s = n, l = P(), d = A(s), { forwardRef: f, currentElement: m } = E(), g = p(() => o.present ? m.value : void 0);
		T(g);
		let _ = p(() => {
			let { present: e, ...t } = o;
			return t;
		});
		return a(() => o.present, (e, t) => {
			!e && t && l.triggerElement.value?.focus();
		}), (t, n) => (e(), u(U, r({
			..._.value,
			...c(d)
		}, {
			ref: c(f),
			present: t.present,
			"trap-focus": c(l).open.value,
			"disable-outside-pointer-events": o.disableOutsidePointerEvents,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (e.preventDefault(), c(l).triggerElement.value?.focus());
			},
			onPointerDownOutside: n[1] ||= (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				(t.button === 2 || n) && e.preventDefault();
			},
			onFocusOutside: n[2] ||= (e) => {
				e.preventDefault();
			}
		}), {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 16, [
			"present",
			"trap-focus",
			"disable-outside-pointer-events"
		]));
	}
}), G = /* @__PURE__ */ _({
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
		let o = t, s = A(n);
		E();
		let l = P(), d = g(!1), f = g(!1), m = p(() => {
			let { present: e, ...t } = o;
			return t;
		});
		return a(() => o.present, (e, t) => {
			!e && t && (d.value || l.triggerElement.value?.focus(), d.value = !1, f.value = !1);
		}), (t, n) => (e(), u(U, r({
			...m.value,
			...c(s)
		}, {
			present: t.present,
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			onCloseAutoFocus: n[0] ||= (e) => {
				e.defaultPrevented || (d.value || c(l).triggerElement.value?.focus(), e.preventDefault()), d.value = !1, f.value = !1;
			},
			onInteractOutside: n[1] ||= (e) => {
				e.defaultPrevented || (d.value = !0, e.detail.originalEvent.type === "pointerdown" && (f.value = !0));
				let t = e.target;
				c(l).triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && f.value && e.preventDefault();
			}
		}), {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 16, ["present"]));
	}
}), K = /* @__PURE__ */ _({
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
	setup(n, { emit: a }) {
		let o = n, s = a, l = P(), d = A(s), { forwardRef: p } = E();
		return (n, a) => (e(), u(c(D), {
			present: n.forceMount || c(l).open.value,
			"force-mount": n.forceMount || !c(l).unmountOnHide.value
		}, {
			default: h(({ present: a }) => [c(l).modal.value ? t((e(), u(W, r({
				key: 0,
				ref: c(p),
				present: c(l).unmountOnHide.value || a
			}, {
				...o,
				...c(d),
				...n.$attrs
			}), {
				default: h(() => [i(n.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[f, c(l).unmountOnHide.value || a]]) : t((e(), u(G, r({
				key: 1,
				ref: c(p),
				present: c(l).unmountOnHide.value || a
			}, {
				...o,
				...c(d),
				...n.$attrs
			}), {
				default: h(() => [i(n.$slots, "default")]),
				_: 2
			}, 1040, ["present"])), [[f, c(l).unmountOnHide.value || a]])]),
			_: 3
		}, 8, ["present", "force-mount"]));
	}
}), q = /* @__PURE__ */ _({
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
		E();
		let a = P();
		return (t, o) => (e(), u(c(j), r(n, { id: c(a).descriptionId }), {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), J = /* @__PURE__ */ _({
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
		let n = t, r = P(), s = O(n.present);
		return a(() => n.present, (e) => s.value = e), E(), (t, n) => (e(), u(c(j), {
			as: t.as,
			"as-child": t.asChild,
			"data-state": c(r).open.value ? "open" : "closed",
			style: { "pointer-events": "auto" },
			onPointerdown: n[0] ||= o(() => {}, [
				"left",
				"self",
				"prevent"
			])
		}, {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-state"
		]));
	}
}), Y = /* @__PURE__ */ _({
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
	setup(n) {
		let a = P(), { forwardRef: o } = E();
		return (n, s) => c(a)?.modal.value ? (e(), u(c(D), {
			key: 0,
			present: n.forceMount || c(a).open.value,
			"force-mount": n.forceMount || !c(a).unmountOnHide.value
		}, {
			default: h(({ present: e }) => [t(v(J, r(n.$attrs, {
				ref: c(o),
				as: n.as,
				"as-child": n.asChild,
				present: c(a).unmountOnHide.value || e
			}), {
				default: h(() => [i(n.$slots, "default")]),
				_: 2
			}, 1040, [
				"as",
				"as-child",
				"present"
			]), [[f, c(a).unmountOnHide.value || e]])]),
			_: 3
		}, 8, ["present", "force-mount"])) : l("v-if", !0);
	}
}), X = /* @__PURE__ */ _({
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
		let n = t, a = P();
		return E(), (t, o) => (e(), u(c(j), r(n, { id: c(a).titleId }), {
			default: h(() => [i(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), Z = [
	"aria-label",
	"aria-pressed",
	"disabled"
], Q = /* @__PURE__ */ _({
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
			sm: b.iconButtonSm,
			md: b.iconButtonMd,
			lg: b.iconButtonLg
		}, o = {
			sm: 16,
			md: 18,
			lg: 22
		}, s = p(() => a[r.size]), l = p(() => o[r.size]);
		function f(e) {
			r.disabled || i("click", e);
		}
		return (n, r) => (e(), u(N, { content: t.tooltip ?? t.label }, {
			default: h(() => [d("button", {
				type: "button",
				class: m(["tc-interactive", [
					c(b).iconButton,
					s.value,
					t.destructive && c(b).iconButtonDestructive,
					t.pressed === !0 && c(b).iconButtonPressed
				]]),
				"aria-label": t.label,
				"aria-pressed": t.pressed === null ? void 0 : t.pressed,
				disabled: t.disabled,
				onClick: f
			}, [v(y, {
				icon: t.icon,
				size: l.value
			}, null, 8, ["icon", "size"])], 10, Z)]),
			_: 1
		}, 8, ["content"]));
	}
});
//#endregion
export { K as a, I as c, q as i, X as n, H as o, Y as r, L as s, Q as t };
