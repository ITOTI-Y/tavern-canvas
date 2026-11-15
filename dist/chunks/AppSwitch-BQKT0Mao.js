import { I as e, J as t, S as n, _ as r, _t as i, b as a, c as o, d as s, ft as c, g as l, h as u, k as d, l as f, lt as p, m, mt as h, v as g, z as _ } from "./vue-i18n-BQWz_HuU.js";
import { t as v } from "./components_styles-Cab5IILs.js";
import { a as y, i as b } from "./AppCheckbox-CHqNg9ZG.js";
import { r as x, t as S } from "./_prop_utils-BQHilWOI.js";
import { P as C, S as w, f as T, s as E } from "./Teleport-B2amidH8.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchRoot.js
var [D, O] = /*#__PURE__*/ C("SwitchRoot"), k = /* @__PURE__ */ n({
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
	setup(n, { emit: i }) {
		let u = n, h = i, { disabled: v } = p(u), S = w(u, "modelValue", h, {
			defaultValue: u.defaultValue ?? u.falseValue,
			passive: u.modelValue === void 0
		}), C = m(() => S.value === u.trueValue);
		function D() {
			v.value || (S.value = C.value ? u.falseValue : u.trueValue);
		}
		let { forwardRef: k, currentElement: A } = T(), j = x(A), M = y(), N = m(() => u.id && A.value ? document.querySelector(`[for="${u.id}"]`)?.innerText : void 0);
		return O({
			checked: C,
			toggleCheck: D,
			disabled: v
		}), (n, i) => (e(), g(s, null, [a(c(E), d({
			id: n.id,
			ref: c(k),
			role: "switch",
			type: n.as === "button" ? "button" : void 0,
			value: n.value,
			"aria-label": n.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": n.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": c(v) ? "" : void 0,
			"as-child": n.asChild,
			as: n.as,
			disabled: c(v)
		}, {
			...c(M),
			...n.$attrs
		}, {
			onClick: D,
			onKeydown: o(f(D, ["prevent"]), ["enter"])
		}), {
			default: t(() => [_(n.$slots, "default", {
				modelValue: c(S),
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
		]), c(j) && n.name ? (e(), l(c(b), d({
			key: 0,
			type: "checkbox",
			name: n.name,
			disabled: c(v),
			required: n.required,
			value: n.value,
			checked: C.value
		}, c(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : r("v-if", !0)], 64));
	}
}), A = /* @__PURE__ */ n({
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
	setup(n) {
		let r = D();
		return T(), (n, i) => (e(), l(c(E), {
			"data-state": c(r).checked.value ? "checked" : "unchecked",
			"data-disabled": c(r).disabled.value ? "" : void 0,
			"as-child": n.asChild,
			as: n.as
		}, {
			default: t(() => [_(n.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), j = ["data-disabled"], M = /* @__PURE__ */ n({
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
	setup(n, { emit: o }) {
		let s = n, l = o;
		function f(e) {
			l("update:modelValue", e);
		}
		let p = m(() => S({
			id: s.id,
			"aria-describedby": s.describedBy,
			"aria-label": s.labelHidden ? s.label : void 0
		}));
		return (o, s) => (e(), g("label", {
			class: h(c(v).switchRow),
			"data-disabled": n.disabled ? "" : void 0
		}, [n.labelHidden ? r("", !0) : (e(), g("span", {
			key: 0,
			class: h(c(v).switchLabelGroup)
		}, [u("span", { class: h(c(v).switchLabel) }, i(n.label), 3), n.description ? (e(), g("span", {
			key: 0,
			class: h(c(v).switchDescription)
		}, i(n.description), 3)) : r("", !0)], 2)), a(c(k), d(p.value, {
			class: ["tc-interactive", c(v).switchRoot],
			"model-value": n.modelValue,
			disabled: n.disabled,
			"onUpdate:modelValue": f
		}), {
			default: t(() => [a(c(A), { class: h(c(v).switchThumb) }, null, 8, ["class"])]),
			_: 1
		}, 16, [
			"class",
			"model-value",
			"disabled"
		])], 10, j));
	}
});
//#endregion
export { M as t };
