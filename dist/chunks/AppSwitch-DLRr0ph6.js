import { F as e, O as t, R as n, _ as r, c as i, ct as a, dt as o, g as s, gt as c, h as l, m as u, p as d, pt as f, q as p, s as m, u as h, x as g, y as _ } from "./vue-i18n-XoxYzLIP.js";
import { t as v } from "./components_styles-COPsMRS_.js";
import { a as y, i as b } from "./AppCheckbox-Doh1RgAx.js";
import { r as x, t as S } from "./_prop_utils-CvImpN6J.js";
import { P as C, S as w, f as T, s as E } from "./Teleport-zHbQRGnp.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchRoot.js
var [D, O] = /*#__PURE__*/ C("SwitchRoot"), k = /* @__PURE__ */ g({
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
	setup(c, { emit: u }) {
		let f = c, g = u, { disabled: v } = a(f), S = w(f, "modelValue", g, {
			defaultValue: f.defaultValue ?? f.falseValue,
			passive: f.modelValue === void 0
		}), C = d(() => S.value === f.trueValue);
		function D() {
			v.value || (S.value = C.value ? f.falseValue : f.trueValue);
		}
		let { forwardRef: k, currentElement: A } = T(), j = x(A), M = y(), N = d(() => f.id && A.value ? document.querySelector(`[for="${f.id}"]`)?.innerText : void 0);
		return O({
			checked: C,
			toggleCheck: D,
			disabled: v
		}), (a, c) => (e(), r(h, null, [_(o(E), t({
			id: a.id,
			ref: o(k),
			role: "switch",
			type: a.as === "button" ? "button" : void 0,
			value: a.value,
			"aria-label": a.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": a.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": o(v) ? "" : void 0,
			"as-child": a.asChild,
			as: a.as,
			disabled: o(v)
		}, {
			...o(M),
			...a.$attrs
		}, {
			onClick: D,
			onKeydown: m(i(D, ["prevent"]), ["enter"])
		}), {
			default: p(() => [n(a.$slots, "default", {
				modelValue: o(S),
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
		]), o(j) && a.name ? (e(), l(o(b), t({
			key: 0,
			type: "checkbox",
			name: a.name,
			disabled: o(v),
			required: a.required,
			value: a.value,
			checked: C.value
		}, o(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : s("v-if", !0)], 64));
	}
}), A = /* @__PURE__ */ g({
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
	setup(t) {
		let r = D();
		return T(), (t, i) => (e(), l(o(E), {
			"data-state": o(r).checked.value ? "checked" : "unchecked",
			"data-disabled": o(r).disabled.value ? "" : void 0,
			"as-child": t.asChild,
			as: t.as
		}, {
			default: p(() => [n(t.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), j = ["data-disabled"], M = /* @__PURE__ */ g({
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
	setup(n, { emit: i }) {
		let a = n, l = i;
		function m(e) {
			l("update:modelValue", e);
		}
		let h = d(() => S({
			id: a.id,
			"aria-describedby": a.describedBy,
			"aria-label": a.labelHidden ? a.label : void 0
		}));
		return (i, a) => (e(), r("label", {
			class: f(o(v).switchRow),
			"data-disabled": n.disabled ? "" : void 0
		}, [n.labelHidden ? s("", !0) : (e(), r("span", {
			key: 0,
			class: f(o(v).switchLabelGroup)
		}, [u("span", { class: f(o(v).switchLabel) }, c(n.label), 3), n.description ? (e(), r("span", {
			key: 0,
			class: f(o(v).switchDescription)
		}, c(n.description), 3)) : s("", !0)], 2)), _(o(k), t(h.value, {
			class: ["tc-interactive", o(v).switchRoot],
			"model-value": n.modelValue,
			disabled: n.disabled,
			"onUpdate:modelValue": m
		}), {
			default: p(() => [_(o(A), { class: f(o(v).switchThumb) }, null, 8, ["class"])]),
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
