import { D as e, G as t, L as n, P as r, _ as i, c as a, dt as o, g as s, h as c, lt as l, m as u, mt as d, ot as f, p, s as m, u as h, x as g, y as _ } from "./vue-i18n-L-BrQRnK.js";
import { t as v } from "./components_styles-DHX8irr3.js";
import { i as y, n as b, r as x, t as S } from "./_prop_utils-vFiFbBPl.js";
import { P as C, S as w, f as T, s as E } from "./Teleport-CquQcgiX.js";
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
	setup(o, { emit: u }) {
		let d = o, g = u, { disabled: v } = f(d), S = w(d, "modelValue", g, {
			defaultValue: d.defaultValue ?? d.falseValue,
			passive: d.modelValue === void 0
		}), C = p(() => S.value === d.trueValue);
		function D() {
			v.value || (S.value = C.value ? d.falseValue : d.trueValue);
		}
		let { forwardRef: k, currentElement: A } = T(), j = y(A), M = x(), N = p(() => d.id && A.value ? document.querySelector(`[for="${d.id}"]`)?.innerText : void 0);
		return O({
			checked: C,
			toggleCheck: D,
			disabled: v
		}), (o, u) => (r(), i(h, null, [_(l(E), e({
			id: o.id,
			ref: l(k),
			role: "switch",
			type: o.as === "button" ? "button" : void 0,
			value: o.value,
			"aria-label": o.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": o.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": l(v) ? "" : void 0,
			"as-child": o.asChild,
			as: o.as,
			disabled: l(v)
		}, {
			...l(M),
			...o.$attrs
		}, {
			onClick: D,
			onKeydown: m(a(D, ["prevent"]), ["enter"])
		}), {
			default: t(() => [n(o.$slots, "default", {
				modelValue: l(S),
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
		]), l(j) && o.name ? (r(), c(l(b), e({
			key: 0,
			type: "checkbox",
			name: o.name,
			disabled: l(v),
			required: o.required,
			value: o.value,
			checked: C.value
		}, l(M)), null, 16, [
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
	setup(e) {
		let i = D();
		return T(), (e, a) => (r(), c(l(E), {
			"data-state": l(i).checked.value ? "checked" : "unchecked",
			"data-disabled": l(i).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: t(() => [n(e.$slots, "default")]),
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
	setup(n, { emit: a }) {
		let c = n, f = a;
		function m(e) {
			f("update:modelValue", e);
		}
		let h = p(() => S({
			id: c.id,
			"aria-describedby": c.describedBy,
			"aria-label": c.labelHidden ? c.label : void 0
		}));
		return (a, c) => (r(), i("label", {
			class: o(l(v).switchRow),
			"data-disabled": n.disabled ? "" : void 0
		}, [n.labelHidden ? s("", !0) : (r(), i("span", {
			key: 0,
			class: o(l(v).switchLabelGroup)
		}, [u("span", { class: o(l(v).switchLabel) }, d(n.label), 3), n.description ? (r(), i("span", {
			key: 0,
			class: o(l(v).switchDescription)
		}, d(n.description), 3)) : s("", !0)], 2)), _(l(k), e(h.value, {
			class: ["tc-interactive", l(v).switchRoot],
			"model-value": n.modelValue,
			disabled: n.disabled,
			"onUpdate:modelValue": m
		}), {
			default: t(() => [_(l(A), { class: o(l(v).switchThumb) }, null, 8, ["class"])]),
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
