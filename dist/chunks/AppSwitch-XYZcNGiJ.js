import { D as e, I as t, N as n, W as r, _ as i, at as a, c as o, ct as s, g as c, h as l, m as u, p as d, pt as f, s as p, u as m, ut as h, x as g, y as _ } from "./vue-i18n-DUz2Gjn8.js";
import { r as v } from "./StateSurface-B-7A6AcN.js";
import { a as y, i as b, n as x, t as S } from "./_prop_utils-CqbCYIc0.js";
import { M as C, _ as w, c as T, i as E } from "./Teleport-CZ6NJvBB.js";
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
	setup(u, { emit: f }) {
		let h = u, g = f, { disabled: v } = a(h), S = w(h, "modelValue", g, {
			defaultValue: h.defaultValue ?? h.falseValue,
			passive: h.modelValue === void 0
		}), C = d(() => S.value === h.trueValue);
		function D() {
			v.value || (S.value = C.value ? h.falseValue : h.trueValue);
		}
		let { forwardRef: k, currentElement: A } = T(), j = y(A), M = b(), N = d(() => h.id && A.value ? document.querySelector(`[for="${h.id}"]`)?.innerText : void 0);
		return O({
			checked: C,
			toggleCheck: D,
			disabled: v
		}), (a, u) => (n(), i(m, null, [_(s(E), e({
			id: a.id,
			ref: s(k),
			role: "switch",
			type: a.as === "button" ? "button" : void 0,
			value: a.value,
			"aria-label": a.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": a.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": s(v) ? "" : void 0,
			"as-child": a.asChild,
			as: a.as,
			disabled: s(v)
		}, {
			...s(M),
			...a.$attrs
		}, {
			onClick: D,
			onKeydown: p(o(D, ["prevent"]), ["enter"])
		}), {
			default: r(() => [t(a.$slots, "default", {
				modelValue: s(S),
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
		]), s(j) && a.name ? (n(), l(s(x), e({
			key: 0,
			type: "checkbox",
			name: a.name,
			disabled: s(v),
			required: a.required,
			value: a.value,
			checked: C.value
		}, s(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : c("v-if", !0)], 64));
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
		return T(), (e, a) => (n(), l(s(E), {
			"data-state": s(i).checked.value ? "checked" : "unchecked",
			"data-disabled": s(i).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: r(() => [t(e.$slots, "default")]),
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
	setup(t, { emit: a }) {
		let o = t, l = a;
		function p(e) {
			l("update:modelValue", e);
		}
		let m = d(() => S({
			id: o.id,
			"aria-describedby": o.describedBy,
			"aria-label": o.labelHidden ? o.label : void 0
		}));
		return (a, o) => (n(), i("label", {
			class: h(s(v).switchRow),
			"data-disabled": t.disabled ? "" : void 0
		}, [t.labelHidden ? c("", !0) : (n(), i("span", {
			key: 0,
			class: h(s(v).switchLabelGroup)
		}, [u("span", { class: h(s(v).switchLabel) }, f(t.label), 3), t.description ? (n(), i("span", {
			key: 0,
			class: h(s(v).switchDescription)
		}, f(t.description), 3)) : c("", !0)], 2)), _(s(k), e(m.value, {
			class: ["tc-interactive", s(v).switchRoot],
			"model-value": t.modelValue,
			disabled: t.disabled,
			"onUpdate:modelValue": p
		}), {
			default: r(() => [_(s(A), { class: h(s(v).switchThumb) }, null, 8, ["class"])]),
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
