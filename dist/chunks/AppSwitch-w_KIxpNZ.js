import { D as e, I as t, N as n, S as r, W as i, _ as a, at as o, c as s, ct as c, g as l, h as u, m as d, p as f, pt as p, s as m, u as h, ut as g, x as _, y as v } from "./vue-i18n-DUz2Gjn8.js";
import { r as y } from "./StateSurface-Bo_sA18G.js";
import { _ as b, c as x, i as S, j as C } from "./Teleport-C7mDSUEl.js";
import { r as w, t as T, u as E } from "./_prop_utils-DtjJGT5O.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function D() {
	let e = r()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchRoot.js
var [O, k] = /*#__PURE__*/ C("SwitchRoot"), A = /* @__PURE__ */ _({
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
	setup(r, { emit: d }) {
		let p = r, g = d, { disabled: _ } = o(p), y = b(p, "modelValue", g, {
			defaultValue: p.defaultValue ?? p.falseValue,
			passive: p.modelValue === void 0
		}), C = f(() => y.value === p.trueValue);
		function T() {
			_.value || (y.value = C.value ? p.falseValue : p.trueValue);
		}
		let { forwardRef: O, currentElement: A } = x(), j = E(A), M = D(), N = f(() => p.id && A.value ? document.querySelector(`[for="${p.id}"]`)?.innerText : void 0);
		return k({
			checked: C,
			toggleCheck: T,
			disabled: _
		}), (r, o) => (n(), a(h, null, [v(c(S), e({
			id: r.id,
			ref: c(O),
			role: "switch",
			type: r.as === "button" ? "button" : void 0,
			value: r.value,
			"aria-label": r.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": r.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": c(_) ? "" : void 0,
			"as-child": r.asChild,
			as: r.as,
			disabled: c(_)
		}, {
			...c(M),
			...r.$attrs
		}, {
			onClick: T,
			onKeydown: m(s(T, ["prevent"]), ["enter"])
		}), {
			default: i(() => [t(r.$slots, "default", {
				modelValue: c(y),
				checked: C.value
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
		]), c(j) && r.name ? (n(), u(c(w), e({
			key: 0,
			type: "checkbox",
			name: r.name,
			disabled: c(_),
			required: r.required,
			value: r.value,
			checked: C.value
		}, c(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : l("v-if", !0)], 64));
	}
}), j = /* @__PURE__ */ _({
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
		let r = O();
		return x(), (e, a) => (n(), u(c(S), {
			"data-state": c(r).checked.value ? "checked" : "unchecked",
			"data-disabled": c(r).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: i(() => [t(e.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), M = ["data-disabled"], N = /* @__PURE__ */ _({
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
	setup(t, { emit: r }) {
		let o = t, s = r;
		function u(e) {
			s("update:modelValue", e);
		}
		let m = f(() => T({
			id: o.id,
			"aria-describedby": o.describedBy,
			"aria-label": o.labelHidden ? o.label : void 0
		}));
		return (r, o) => (n(), a("label", {
			class: g(c(y).switchRow),
			"data-disabled": t.disabled ? "" : void 0
		}, [t.labelHidden ? l("", !0) : (n(), a("span", {
			key: 0,
			class: g(c(y).switchLabelGroup)
		}, [d("span", { class: g(c(y).switchLabel) }, p(t.label), 3), t.description ? (n(), a("span", {
			key: 0,
			class: g(c(y).switchDescription)
		}, p(t.description), 3)) : l("", !0)], 2)), v(c(A), e(m.value, {
			class: ["tc-interactive", c(y).switchRoot],
			"model-value": t.modelValue,
			disabled: t.disabled,
			"onUpdate:modelValue": u
		}), {
			default: i(() => [v(c(j), { class: g(c(y).switchThumb) }, null, 8, ["class"])]),
			_: 1
		}, 16, [
			"class",
			"model-value",
			"disabled"
		])], 10, M));
	}
});
//#endregion
export { D as n, N as t };
