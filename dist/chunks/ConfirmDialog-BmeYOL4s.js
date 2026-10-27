import { A as e, C as t, D as n, I as r, N as i, O as a, T as o, W as s, _ as c, c as l, ct as u, dt as d, et as f, g as p, h as m, m as h, p as g, pt as _, ut as v, v as y, x as b, y as x } from "./vue-i18n-DUz2Gjn8.js";
import { t as S } from "./AppIcon-Cnhzrx9o.js";
import { i as C, r as w } from "./StateSurface-C9BHPFzJ.js";
import { t as T } from "./portal_keys-gQ1cWdMS.js";
import { M as E, c as D, l as O, t as k } from "./Teleport-CZ6NJvBB.js";
import { o as A } from "./PopperContent-8IQaFABb.js";
import { a as j, c as M, i as N, n as P, r as F, s as I } from "./Collection-DWsxNExQ.js";
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
	setup(e, { emit: t }) {
		let o = e, c = O(t);
		D();
		let d = f();
		return R({ onCancelElementChange: (e) => {
			d.value = e;
		} }), (e, t) => (i(), m(u(j), n({
			...o,
			...u(c)
		}, {
			role: "alertdialog",
			onPointerDownOutside: t[0] ||= l(() => {}, ["prevent"]),
			onInteractOutside: t[1] ||= l(() => {}, ["prevent"]),
			onOpenAutoFocus: t[2] ||= () => {
				a(() => {
					d.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(t) {
		let a = t, o = L(), { forwardRef: c, currentElement: l } = D();
		return e(() => {
			o.onCancelElementChange(l.value);
		}), (e, t) => (i(), m(u(I), n(a, { ref: u(c) }), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(e) {
		let n = e;
		return D(), (e, a) => (i(), m(u(N), d(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(e) {
		let n = e;
		return D(), (e, a) => (i(), m(u(F), d(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(e) {
		let n = e;
		return (e, a) => (i(), m(u(k), d(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(e, { emit: a }) {
		let o = A(e, a);
		return D(), (e, a) => (i(), m(u(M), n(u(o), { modal: !0 }), {
			default: s((n) => [r(e.$slots, "default", d(t(n)))]),
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
	setup(e) {
		let n = e;
		return D(), (e, a) => (i(), m(u(P), d(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
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
		}
	},
	emits: ["update:open", "confirm"],
	setup(e, { emit: n }) {
		let r = n;
		function a(e) {
			r("update:open", e);
		}
		function l() {
			r("confirm");
		}
		let f = o(T, void 0), b = g(() => f ? { to: f } : {});
		return (n, r) => (i(), m(u(W), {
			open: e.open,
			"onUpdate:open": a
		}, {
			default: s(() => [x(u(U), d(t(b.value)), {
				default: s(() => [x(u(H), { class: v(u(w).dialogOverlay) }, null, 8, ["class"]), x(u(z), { class: v([u(w).dialogContent, u(w).confirmDialogContent]) }, {
					default: s(() => [
						x(u(G), { class: v(u(w).dialogTitle) }, {
							default: s(() => [y(_(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						x(u(V), { class: v(u(w).dialogDescription) }, {
							default: s(() => [y(_(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						h("div", { class: v(u(w).confirmDialogActions) }, [x(u(B), {
							class: v(["tc-interactive", [u(w).appButton, u(w).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: s(() => [y(_(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), h("button", {
							type: "button",
							class: v(["tc-interactive", [u(w).appButton, u(w).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: l
						}, [h("span", {
							class: v([u(w).appButtonContent, e.pending && u(w).appButtonContentPending]),
							"aria-hidden": "true"
						}, [h("span", { class: v(u(w).appButtonLabel) }, _(e.confirmLabel), 3)], 2), e.pending ? (i(), c("span", {
							key: 0,
							class: v(u(w).appButtonSpinner),
							"aria-hidden": "true"
						}, [x(S, {
							icon: u(C),
							size: 16
						}, null, 8, ["icon"])], 2)) : p("", !0)], 10, K)], 2)
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
