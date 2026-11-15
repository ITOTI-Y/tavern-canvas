import { A as e, E as t, I as n, J as r, N as i, S as a, _ as o, _t as s, b as c, ft as l, g as u, h as d, ht as f, it as p, k as m, l as h, m as g, mt as _, v, w as y, y as b, z as x } from "./vue-i18n-BQWz_HuU.js";
import { n as S } from "./portal_keys-DthxrmWp.js";
import { t as C } from "./AppIcon-B1iv8vRB.js";
import { n as w, t as T } from "./components_styles-Cab5IILs.js";
import { P as E, f as D, p as O, t as k } from "./Teleport-B2amidH8.js";
import { o as A } from "./AppTooltip-DuggrS-8.js";
import { a as j, c as M, i as N, l as P, o as F, r as I } from "./IconButton-DbYdD8bu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/AlertDialog/AlertDialogContent.js
var [L, R] = /*#__PURE__*/ E("AlertDialogContent"), z = /* @__PURE__ */ a({
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
	setup(t, { emit: i }) {
		let a = t, o = O(i);
		D();
		let s = p();
		return R({ onCancelElementChange: (e) => {
			s.value = e;
		} }), (t, i) => (n(), u(l(F), m({
			...a,
			...l(o)
		}, {
			role: "alertdialog",
			onPointerDownOutside: i[0] ||= h(() => {}, ["prevent"]),
			onInteractOutside: i[1] ||= h(() => {}, ["prevent"]),
			onOpenAutoFocus: i[2] ||= () => {
				e(() => {
					s.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: r(() => [x(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), B = /* @__PURE__ */ a({
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
		let t = e, a = L(), { forwardRef: o, currentElement: s } = D();
		return i(() => {
			a.onCancelElementChange(s.value);
		}), (e, i) => (n(), u(l(M), m(t, { ref: l(o) }), {
			default: r(() => [x(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), V = /* @__PURE__ */ a({
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
		return D(), (e, i) => (n(), u(l(j), f(y(t)), {
			default: r(() => [x(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), H = /* @__PURE__ */ a({
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
		return D(), (e, i) => (n(), u(l(N), f(y(t)), {
			default: r(() => [x(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), U = /* @__PURE__ */ a({
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
		return (e, i) => (n(), u(l(k), f(y(t)), {
			default: r(() => [x(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), W = /* @__PURE__ */ a({
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
		let i = A(e, t);
		return D(), (e, t) => (n(), u(l(P), m(l(i), { modal: !0 }), {
			default: r((t) => [x(e.$slots, "default", f(y(t)))]),
			_: 3
		}, 16));
	}
}), G = /* @__PURE__ */ a({
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
		return D(), (e, i) => (n(), u(l(I), f(y(t)), {
			default: r(() => [x(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), K = [
	"disabled",
	"aria-busy",
	"aria-label"
], q = /* @__PURE__ */ a({
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
	setup(e, { emit: i }) {
		let a = i;
		function p(e) {
			a("update:open", e);
		}
		function m() {
			a("confirm");
		}
		let h = t(S, void 0), x = g(() => h ? { to: h } : {});
		return (t, i) => (n(), u(l(W), {
			open: e.open,
			"onUpdate:open": p
		}, {
			default: r(() => [c(l(U), f(y(x.value)), {
				default: r(() => [c(l(H), { class: _(l(T).dialogOverlay) }, null, 8, ["class"]), c(l(z), { class: _([l(T).dialogContent, l(T).confirmDialogContent]) }, {
					default: r(() => [
						c(l(G), { class: _(l(T).dialogTitle) }, {
							default: r(() => [b(s(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						c(l(V), { class: _(l(T).dialogDescription) }, {
							default: r(() => [b(s(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						d("div", { class: _(l(T).confirmDialogActions) }, [c(l(B), {
							class: _(["tc-interactive", [l(T).appButton, l(T).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: r(() => [b(s(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), d("button", {
							type: "button",
							class: _(["tc-interactive", [l(T).appButton, e.destructive ? l(T).appButtonDestructive : l(T).appButtonPrimary]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: m
						}, [d("span", {
							class: _([l(T).appButtonContent, e.pending && l(T).appButtonContentPending]),
							"aria-hidden": "true"
						}, [d("span", { class: _(l(T).appButtonLabel) }, s(e.confirmLabel), 3)], 2), e.pending ? (n(), v("span", {
							key: 0,
							class: _(l(T).appButtonSpinner),
							"aria-hidden": "true"
						}, [c(C, {
							icon: l(w),
							size: 16
						}, null, 8, ["icon"])], 2)) : o("", !0)], 10, K)], 2)
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
