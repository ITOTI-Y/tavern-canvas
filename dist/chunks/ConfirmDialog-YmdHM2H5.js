import { C as e, F as t, M as n, O as r, R as i, T as a, _ as o, c as s, dt as c, g as l, gt as u, h as d, k as f, m as p, mt as m, p as h, pt as g, q as _, rt as v, v as y, x as b, y as x } from "./vue-i18n-XoxYzLIP.js";
import { r as S } from "./portal_keys-CIBE-_PC.js";
import { t as C } from "./AppIcon-DD754F_c.js";
import { n as w, t as T } from "./components_styles-COPsMRS_.js";
import { P as E, f as D, p as O, t as k } from "./Teleport-zHbQRGnp.js";
import { c as A } from "./AppTooltip-BeFYZwud.js";
import { a as j, c as M, i as N, n as P, r as F, s as I } from "./IconButton-B3DZhN69.js";
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
	setup(e, { emit: n }) {
		let a = e, o = O(n);
		D();
		let l = v();
		return R({ onCancelElementChange: (e) => {
			l.value = e;
		} }), (e, n) => (t(), d(c(j), r({
			...a,
			...c(o)
		}, {
			role: "alertdialog",
			onPointerDownOutside: n[0] ||= s(() => {}, ["prevent"]),
			onInteractOutside: n[1] ||= s(() => {}, ["prevent"]),
			onOpenAutoFocus: n[2] ||= () => {
				f(() => {
					l.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: _(() => [i(e.$slots, "default")]),
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
		let a = e, o = L(), { forwardRef: s, currentElement: l } = D();
		return n(() => {
			o.onCancelElementChange(l.value);
		}), (e, n) => (t(), d(c(I), r(a, { ref: c(s) }), {
			default: _(() => [i(e.$slots, "default")]),
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
	setup(n) {
		let r = n;
		return D(), (n, a) => (t(), d(c(N), m(e(r)), {
			default: _(() => [i(n.$slots, "default")]),
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
	setup(n) {
		let r = n;
		return D(), (n, a) => (t(), d(c(F), m(e(r)), {
			default: _(() => [i(n.$slots, "default")]),
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
	setup(n) {
		let r = n;
		return (n, a) => (t(), d(c(k), m(e(r)), {
			default: _(() => [i(n.$slots, "default")]),
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
	setup(n, { emit: a }) {
		let o = A(n, a);
		return D(), (n, a) => (t(), d(c(M), r(c(o), { modal: !0 }), {
			default: _((t) => [i(n.$slots, "default", m(e(t)))]),
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
	setup(n) {
		let r = n;
		return D(), (n, a) => (t(), d(c(P), m(e(r)), {
			default: _(() => [i(n.$slots, "default")]),
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
	setup(n, { emit: r }) {
		let i = r;
		function s(e) {
			i("update:open", e);
		}
		function f() {
			i("confirm");
		}
		let v = a(S, void 0), b = h(() => v ? { to: v } : {});
		return (r, i) => (t(), d(c(W), {
			open: n.open,
			"onUpdate:open": s
		}, {
			default: _(() => [x(c(U), m(e(b.value)), {
				default: _(() => [x(c(H), { class: g(c(T).dialogOverlay) }, null, 8, ["class"]), x(c(z), { class: g([c(T).dialogContent, c(T).confirmDialogContent]) }, {
					default: _(() => [
						x(c(G), { class: g(c(T).dialogTitle) }, {
							default: _(() => [y(u(n.title), 1)]),
							_: 1
						}, 8, ["class"]),
						x(c(V), { class: g(c(T).dialogDescription) }, {
							default: _(() => [y(u(n.description), 1)]),
							_: 1
						}, 8, ["class"]),
						p("div", { class: g(c(T).confirmDialogActions) }, [x(c(B), {
							class: g(["tc-interactive", [c(T).appButton, c(T).appButtonSecondary]]),
							disabled: n.pending
						}, {
							default: _(() => [y(u(n.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), p("button", {
							type: "button",
							class: g(["tc-interactive", [c(T).appButton, n.destructive ? c(T).appButtonDestructive : c(T).appButtonPrimary]]),
							disabled: n.pending,
							"aria-busy": n.pending,
							"aria-label": n.confirmLabel,
							onClick: f
						}, [p("span", {
							class: g([c(T).appButtonContent, n.pending && c(T).appButtonContentPending]),
							"aria-hidden": "true"
						}, [p("span", { class: g(c(T).appButtonLabel) }, u(n.confirmLabel), 3)], 2), n.pending ? (t(), o("span", {
							key: 0,
							class: g(c(T).appButtonSpinner),
							"aria-hidden": "true"
						}, [x(C, {
							icon: c(w),
							size: 16
						}, null, 8, ["icon"])], 2)) : l("", !0)], 10, K)], 2)
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
