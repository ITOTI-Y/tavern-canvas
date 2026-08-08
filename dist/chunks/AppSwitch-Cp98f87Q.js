import { A as e, I as t, K as n, S as r, T as i, _ as a, b as o, d as s, ft as c, g as l, ht as u, p as d, st as f, u as p, ut as m, v as h, w as g, y as _, z as v } from "./AppIcon-BpY-A4VH.js";
import { r as y } from "./StateSurface-CNBIMTjV.js";
import { B as b, C as x, Q as S, k as C } from "./PopperContent-_OEj_1Tb.js";
import { r as w, t as T, u as E } from "./_prop_utils-CoKBy72F.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function D() {
	let e = i()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchRoot.js
var [O, k] = /*#__PURE__*/ S("SwitchRoot"), A = /* @__PURE__ */ g({
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
	setup(i, { emit: a }) {
		let c = i, u = a, { disabled: g } = f(c), y = b(c, "modelValue", u, {
			defaultValue: c.defaultValue ?? c.falseValue,
			passive: c.modelValue === void 0
		}), S = l(() => y.value === c.trueValue);
		function T() {
			g.value || (y.value = S.value ? c.falseValue : c.trueValue);
		}
		let { forwardRef: O, currentElement: A } = C(), j = E(A), M = D(), N = l(() => c.id && A.value ? document.querySelector(`[for="${c.id}"]`)?.innerText : void 0);
		return k({
			checked: S,
			toggleCheck: T,
			disabled: g
		}), (i, a) => (t(), o(d, null, [r(m(x), e({
			id: i.id,
			ref: m(O),
			role: "switch",
			type: i.as === "button" ? "button" : void 0,
			value: i.value,
			"aria-label": i.$attrs["aria-label"] || N.value,
			"aria-checked": S.value,
			"aria-required": i.required,
			"data-state": S.value ? "checked" : "unchecked",
			"data-disabled": m(g) ? "" : void 0,
			"as-child": i.asChild,
			as: i.as,
			disabled: m(g)
		}, {
			...m(M),
			...i.$attrs
		}, {
			onClick: T,
			onKeydown: p(s(T, ["prevent"]), ["enter"])
		}), {
			default: n(() => [v(i.$slots, "default", {
				modelValue: m(y),
				checked: S.value
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
		]), m(j) && i.name ? (t(), h(m(w), e({
			key: 0,
			type: "checkbox",
			name: i.name,
			disabled: m(g),
			required: i.required,
			value: i.value,
			checked: S.value
		}, m(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : _("v-if", !0)], 64));
	}
}), j = /* @__PURE__ */ g({
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
		return C(), (e, i) => (t(), h(m(x), {
			"data-state": m(r).checked.value ? "checked" : "unchecked",
			"data-disabled": m(r).disabled.value ? "" : void 0,
			"as-child": e.asChild,
			as: e.as
		}, {
			default: n(() => [v(e.$slots, "default")]),
			_: 3
		}, 8, [
			"data-state",
			"data-disabled",
			"as-child",
			"as"
		]));
	}
}), M = ["data-disabled"], N = /* @__PURE__ */ g({
	__name: "AppSwitch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		description: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {},
		describedBy: {}
	},
	emits: ["update:modelValue"],
	setup(i, { emit: s }) {
		let d = i, f = s;
		function p(e) {
			f("update:modelValue", e);
		}
		let h = l(() => T({
			id: d.id,
			"aria-describedby": d.describedBy
		}));
		return (s, l) => (t(), o("label", {
			class: c(m(y).switchRow),
			"data-disabled": i.disabled ? "" : void 0
		}, [a("span", { class: c(m(y).switchLabelGroup) }, [a("span", { class: c(m(y).switchLabel) }, u(i.label), 3), i.description ? (t(), o("span", {
			key: 0,
			class: c(m(y).switchDescription)
		}, u(i.description), 3)) : _("", !0)], 2), r(m(A), e(h.value, {
			class: ["tc-interactive", m(y).switchRoot],
			"model-value": i.modelValue,
			disabled: i.disabled,
			"onUpdate:modelValue": p
		}), {
			default: n(() => [r(m(j), { class: c(m(y).switchThumb) }, null, 8, ["class"])]),
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

//# sourceMappingURL=AppSwitch-Cp98f87Q.js.map