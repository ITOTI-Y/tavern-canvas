import { A as e, C as t, D as n, I as r, N as i, O as a, T as o, W as s, _ as c, at as l, c as u, ct as d, dt as f, et as p, g as m, h, m as g, p as _, pt as v, s as y, u as b, ut as x, v as S, x as C, y as w } from "./vue-i18n-DUz2Gjn8.js";
import { t as T } from "./AppIcon-Cnhzrx9o.js";
import { i as E, r as D } from "./StateSurface-Bo_sA18G.js";
import { t as O } from "./portal_keys-gQ1cWdMS.js";
import { _ as k, c as A, i as j, j as M, l as N, t as P } from "./Teleport-C7mDSUEl.js";
import { o as F } from "./PopperContent-a3U-C0mc.js";
import { a as I, f as L, i as R, l as z, n as B, o as V, p as H, s as U, t as W, u as G } from "./_prop_utils-BsJwfjAZ.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/AlertDialog/AlertDialogContent.js
var [ee, K] = /*#__PURE__*/ M("AlertDialogContent"), q = /* @__PURE__ */ C({
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
		let o = e, c = N(t);
		A();
		let l = p();
		return K({ onCancelElementChange: (e) => {
			l.value = e;
		} }), (e, t) => (i(), h(d(U), n({
			...o,
			...d(c)
		}, {
			role: "alertdialog",
			onPointerDownOutside: t[0] ||= u(() => {}, ["prevent"]),
			onInteractOutside: t[1] ||= u(() => {}, ["prevent"]),
			onOpenAutoFocus: t[2] ||= () => {
				a(() => {
					l.value?.focus({ preventScroll: !0 });
				});
			}
		}), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), J = /* @__PURE__ */ C({
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
		let a = t, o = ee(), { forwardRef: c, currentElement: l } = A();
		return e(() => {
			o.onCancelElementChange(l.value);
		}), (e, t) => (i(), h(d(z), n(a, { ref: d(c) }), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Y = /* @__PURE__ */ C({
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
		return A(), (e, a) => (i(), h(d(V), f(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), X = /* @__PURE__ */ C({
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
		return A(), (e, a) => (i(), h(d(I), f(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Z = /* @__PURE__ */ C({
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
		return (e, a) => (i(), h(d(P), f(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Q = /* @__PURE__ */ C({
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
		let o = F(e, a);
		return A(), (e, a) => (i(), h(d(G), n(d(o), { modal: !0 }), {
			default: s((n) => [r(e.$slots, "default", f(t(n)))]),
			_: 3
		}, 16));
	}
}), $ = /* @__PURE__ */ C({
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
		return A(), (e, a) => (i(), h(d(R), f(t(n)), {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [te, ne] = /*#__PURE__*/ M("SwitchRoot"), re = /* @__PURE__ */ C({
	inheritAttrs: !1,
	__name: "SwitchRoot",
	props: {
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		id: {
			type: String,
			required: !1
		},
		value: {
			type: String,
			required: !1,
			default: "on"
		},
		trueValue: {
			type: null,
			required: !1,
			default: () => !0
		},
		falseValue: {
			type: null,
			required: !1,
			default: () => !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let a = e, o = t, { disabled: f } = l(a), p = k(a, "modelValue", o, {
			defaultValue: a.defaultValue ?? a.falseValue,
			passive: a.modelValue === void 0
		}), g = _(() => p.value === a.trueValue);
		function v() {
			f.value || (p.value = g.value ? a.falseValue : a.trueValue);
		}
		let { forwardRef: x, currentElement: S } = A(), C = H(S), T = L(), E = _(() => a.id && S.value ? document.querySelector(`[for="${a.id}"]`)?.innerText : void 0);
		return ne({
			checked: g,
			toggleCheck: v,
			disabled: f
		}), (e, t) => (i(), c(b, null, [w(d(j), n({
			id: e.id,
			ref: d(x),
			role: "switch",
			type: e.as === "button" ? "button" : void 0,
			value: e.value,
			"aria-label": e.$attrs["aria-label"] || E.value,
			"aria-checked": g.value,
			"aria-required": e.required,
			"data-state": g.value ? "checked" : "unchecked",
			"data-disabled": d(f) ? "" : void 0,
			"as-child": e.asChild,
			as: e.as,
			disabled: d(f)
		}, {
			...d(T),
			...e.$attrs
		}, {
			onClick: v,
			onKeydown: y(u(v, ["prevent"]), ["enter"])
		}), {
			default: s(() => [r(e.$slots, "default", {
				modelValue: d(p),
				checked: g.value
			})]),
			_: 3
		}, 16, [
			"id",
			"type",
			"value",
			"aria-label",
			"aria-checked",
			"aria-required",
			"data-state",
			"data-disabled",
			"as-child",
			"as",
			"disabled",
			"onKeydown"
		]), d(C) && e.name ? (i(), h(d(B), n({
			key: 0,
			type: "checkbox",
			name: e.name,
			disabled: d(f),
			required: e.required,
			value: e.value,
			checked: g.value
		}, d(T)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : m("v-if", !0)], 64));
	}
}), ie = /* @__PURE__ */ C({
	__name: "SwitchThumb",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		let t = te();
		return A(), (e, n) => (i(), h(d(j), {
			"data-state": d(t).checked.value ? "checked" : "unchecked",
			"data-disabled": d(t).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: s(() => [r(e.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), ae = [
	"disabled",
	"aria-busy",
	"aria-label"
], oe = /* @__PURE__ */ C({
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
		let u = o(O, void 0), p = _(() => u ? { to: u } : {});
		return (n, r) => (i(), h(d(Q), {
			open: e.open,
			"onUpdate:open": a
		}, {
			default: s(() => [w(d(Z), f(t(p.value)), {
				default: s(() => [w(d(X), { class: x(d(D).dialogOverlay) }, null, 8, ["class"]), w(d(q), { class: x([d(D).dialogContent, d(D).confirmDialogContent]) }, {
					default: s(() => [
						w(d($), { class: x(d(D).dialogTitle) }, {
							default: s(() => [S(v(e.title), 1)]),
							_: 1
						}, 8, ["class"]),
						w(d(Y), { class: x(d(D).dialogDescription) }, {
							default: s(() => [S(v(e.description), 1)]),
							_: 1
						}, 8, ["class"]),
						g("div", { class: x(d(D).confirmDialogActions) }, [w(d(J), {
							class: x(["tc-interactive", [d(D).appButton, d(D).appButtonSecondary]]),
							disabled: e.pending
						}, {
							default: s(() => [S(v(e.cancelLabel), 1)]),
							_: 1
						}, 8, ["class", "disabled"]), g("button", {
							type: "button",
							class: x(["tc-interactive", [d(D).appButton, d(D).appButtonDestructive]]),
							disabled: e.pending,
							"aria-busy": e.pending,
							"aria-label": e.confirmLabel,
							onClick: l
						}, [g("span", {
							class: x([d(D).appButtonContent, e.pending && d(D).appButtonContentPending]),
							"aria-hidden": "true"
						}, [g("span", { class: x(d(D).appButtonLabel) }, v(e.confirmLabel), 3)], 2), e.pending ? (i(), c("span", {
							key: 0,
							class: x(d(D).appButtonSpinner),
							"aria-hidden": "true"
						}, [w(T, {
							icon: d(E),
							size: 16
						}, null, 8, ["icon"])], 2)) : m("", !0)], 10, ae)], 2)
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"]));
	}
}), se = ["data-disabled"], ce = /* @__PURE__ */ C({
	__name: "AppSwitch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		labelHidden: {
			type: Boolean,
			default: !1
		},
		description: { default: void 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: { default: void 0 },
		describedBy: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, a = t;
		function o(e) {
			a("update:modelValue", e);
		}
		let l = _(() => W({
			id: r.id,
			"aria-describedby": r.describedBy,
			"aria-label": r.labelHidden ? r.label : void 0
		}));
		return (t, r) => (i(), c("label", {
			class: x(d(D).switchRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [e.labelHidden ? m("", !0) : (i(), c("span", {
			key: 0,
			class: x(d(D).switchLabelGroup)
		}, [g("span", { class: x(d(D).switchLabel) }, v(e.label), 3), e.description ? (i(), c("span", {
			key: 0,
			class: x(d(D).switchDescription)
		}, v(e.description), 3)) : m("", !0)], 2)), w(d(re), n(l.value, {
			class: ["tc-interactive", d(D).switchRoot],
			"model-value": e.modelValue,
			disabled: e.disabled,
			"onUpdate:modelValue": o
		}), {
			default: s(() => [w(d(ie), { class: x(d(D).switchThumb) }, null, 8, ["class"])]),
			_: 1
		}, 16, [
			"class",
			"model-value",
			"disabled"
		])], 10, se));
	}
});
//#endregion
export { oe as n, ce as t };
