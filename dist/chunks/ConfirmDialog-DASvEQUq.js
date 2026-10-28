import { C as e, D as t, G as n, L as r, O as i, P as a, T as o, _ as s, c, dt as l, ft as u, g as d, h as f, j as p, lt as m, m as h, mt as g, p as _, tt as v, v as y, x as b, y as x } from "./vue-i18n-L-BrQRnK.js";
import { n as S } from "./portal_keys-DthxrmWp.js";
import { t as C } from "./AppIcon-DkyxvN8k.js";
import { n as w, t as T } from "./components_styles-DHX8irr3.js";
import { P as E, f as D, p as O, t as k } from "./Teleport-CquQcgiX.js";
import { o as A } from "./PopperContent-BPSDCuaj.js";
import { a as j, c as M, i as N, n as P, r as F, s as I } from "./Collection-e6mvGbNy.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/AlertDialog/AlertDialogContent.js
var [L, R] = /*#__PURE__*/ E("AlertDialogContent"), z = /* @__PURE__ */ b({
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
	setup(e, { emit: o }) {
		let s = e, l = O(o);
		D();
		let u = v();
		return R({ onCancelElementChange: (e) => {
			u.value = e;
		} }), (e, o) => (a(), f(m(j), t({
			...s,
			...m(l)
		}, {
			role: "alertdialog",
			onPointerDownOutside: o[0] ||= c(() => {}, ["prevent"]),
			onInteractOutside: o[1] ||= c(() => {}, ["prevent"]),
			onOpenAutoFocus: o[2] ||= () => {
				i(() => {
					u.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: n(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), B = /* @__PURE__ */ b({
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
		let i = e, o = L(), { forwardRef: s, currentElement: c } = D();
		return p(() => {
			o.onCancelElementChange(c.value);
		}), (e, o) => (a(), f(m(I), t(i, { ref: m(s) }), {
			default: n(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), V = /* @__PURE__ */ b({
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
	setup(t) {
		let i = t;
		return D(), (t, o) => (a(), f(m(N), u(e(i)), {
			default: n(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), H = /* @__PURE__ */ b({
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
	setup(t) {
		let i = t;
		return D(), (t, o) => (a(), f(m(F), u(e(i)), {
			default: n(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), U = /* @__PURE__ */ b({
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
	setup(t) {
		let i = t;
		return (t, o) => (a(), f(m(k), u(e(i)), {
			default: n(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), W = /* @__PURE__ */ b({
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
	setup(i, { emit: o }) {
		let s = A(i, o);
		return D(), (i, o) => (a(), f(m(M), t(m(s), { modal: !0 }), {
			default: n((t) => [r(i.$slots, "default", u(e(t)))]),
			_: 3
		}, 16));
	}
}), G = /* @__PURE__ */ b({
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
	setup(t) {
		let i = t;
		return D(), (t, o) => (a(), f(m(P), u(e(i)), {
			default: n(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), K = [
	"disabled",
	"aria-busy",
	"aria-label"
], q = /* @__PURE__ */ b({
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
		},
		destructive: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["update:open", "confirm"],
	setup(t, { emit: r }) {
		let i = r;
		function c(e) {
			i("update:open", e);
		}
		function p() {
			i("confirm");
		}
		let v = o(S, void 0), b = _(() => v ? { to: v } : {});
		return (r, i) => (a(), f(m(W), {
			open: t.open,
			"onUpdate:open": c
		}, {
			default: n(() => [x(m(U), u(e(b.value)), {
				default: n(() => [x(m(H), { class: l(m(T).dialogOverlay) }, null, 8, ["class"]), x(m(z), { class: l([m(T).dialogContent, m(T).confirmDialogContent]) }, {
					default: n(() => [
						x(m(G), { class: l(m(T).dialogTitle) }, {
							default: n(() => [y(g(t.title), 1)]),
							_: 1
						}, 8, ["class"]),
						x(m(V), { class: l(m(T).dialogDescription) }, {
							default: n(() => [y(g(t.description), 1)]),
							_: 1
						}, 8, ["class"]),
						h("div", { class: l(m(T).confirmDialogActions) }, [x(m(B), {
							class: l(["tc-interactive", [m(T).appButton, m(T).appButtonSecondary]]),
							disabled: t.pending
						}, {
							default: n(() => [y(g(t.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), h("button", {
							type: "button",
							class: l(["tc-interactive", [m(T).appButton, t.destructive ? m(T).appButtonDestructive : m(T).appButtonPrimary]]),
							disabled: t.pending,
							"aria-busy": t.pending,
							"aria-label": t.confirmLabel,
							onClick: p
						}, [h("span", {
							class: l([m(T).appButtonContent, t.pending && m(T).appButtonContentPending]),
							"aria-hidden": "true"
						}, [h("span", { class: l(m(T).appButtonLabel) }, g(t.confirmLabel), 3)], 2), t.pending ? (a(), s("span", {
							key: 0,
							class: l(m(T).appButtonSpinner),
							"aria-hidden": "true"
						}, [x(C, {
							icon: m(w),
							size: 16
						}, null, 8, ["icon"])], 2)) : d("", !0)], 10, K)], 2)
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
export { q as t };
