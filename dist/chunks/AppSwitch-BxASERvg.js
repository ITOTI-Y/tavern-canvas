import { D as e, I as t, N as n, S as r, U as i, _ as a, c as o, ft as s, g as c, h as l, it as u, lt as d, m as f, p, s as m, st as h, u as g, x as _, y as v } from "./vue-i18n-D0uIxSJk.js";
import { r as y } from "./StateSurface-C7mKA32L.js";
import { _ as b, c as x, i as S, j as C } from "./Teleport-CfSgxnHY.js";
import { r as w, t as T, u as E } from "./_prop_utils-Cr0BV-r1.js";
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
	setup(r, { emit: s }) {
		let d = r, f = s, { disabled: _ } = u(d), y = b(d, "modelValue", f, {
			defaultValue: d.defaultValue ?? d.falseValue,
			passive: d.modelValue === void 0
		}), C = p(() => y.value === d.trueValue);
		function T() {
			_.value || (y.value = C.value ? d.falseValue : d.trueValue);
		}
		let { forwardRef: O, currentElement: A } = x(), j = E(A), M = D(), N = p(() => d.id && A.value ? document.querySelector(`[for="${d.id}"]`)?.innerText : void 0);
		return k({
			checked: C,
			toggleCheck: T,
			disabled: _
		}), (r, s) => (n(), a(g, null, [v(h(S), e({
			id: r.id,
			ref: h(O),
			role: "switch",
			type: r.as === "button" ? "button" : void 0,
			value: r.value,
			"aria-label": r.$attrs["aria-label"] || N.value,
			"aria-checked": C.value,
			"aria-required": r.required,
			"data-state": C.value ? "checked" : "unchecked",
			"data-disabled": h(_) ? "" : void 0,
			"as-child": r.asChild,
			as: r.as,
			disabled: h(_)
		}, {
			...h(M),
			...r.$attrs
		}, {
			onClick: T,
			onKeydown: m(o(T, ["prevent"]), ["enter"])
		}), {
			default: i(() => [t(r.$slots, "default", {
				modelValue: h(y),
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
		]), h(j) && r.name ? (n(), l(h(w), e({
			key: 0,
			type: "checkbox",
			name: r.name,
			disabled: h(_),
			required: r.required,
			value: r.value,
			checked: C.value
		}, h(M)), null, 16, [
			"name",
			"disabled",
			"required",
			"value",
			"checked"
		])) : c("v-if", !0)], 64));
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
		return x(), (e, a) => (n(), l(h(S), {
			"data-state": h(r).checked.value ? "checked" : "unchecked",
			"data-disabled": h(r).disabled.value ? "" : void 0,
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
		let o = t, l = r;
		function u(e) {
			l("update:modelValue", e);
		}
		let m = p(() => T({
			id: o.id,
			"aria-describedby": o.describedBy
		}));
		return (r, o) => (n(), a("label", {
			class: d(h(y).switchRow),
			"data-disabled": t.disabled ? "" : void 0
		}, [f("span", { class: d(h(y).switchLabelGroup) }, [f("span", { class: d(h(y).switchLabel) }, s(t.label), 3), t.description ? (n(), a("span", {
			key: 0,
			class: d(h(y).switchDescription)
		}, s(t.description), 3)) : c("", !0)], 2), v(h(A), e(m.value, {
			class: ["tc-interactive", h(y).switchRoot],
			"model-value": t.modelValue,
			disabled: t.disabled,
			"onUpdate:modelValue": u
		}), {
			default: i(() => [v(h(j), { class: d(h(y).switchThumb) }, null, 8, ["class"])]),
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
