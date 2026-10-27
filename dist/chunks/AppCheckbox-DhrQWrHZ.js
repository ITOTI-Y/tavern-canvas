import { D as e, I as t, L as n, N as r, W as i, _ as a, c as o, ct as s, g as c, h as l, p as u, pt as d, s as f, u as p, ut as m, x as h, y as g, z as _ } from "./vue-i18n-DUz2Gjn8.js";
import { t as v } from "./AppIcon-Cnhzrx9o.js";
import { t as y } from "./check-BhrVRbkS.js";
import { r as b } from "./StateSurface-C9BHPFzJ.js";
import { i as x, n as S } from "./AppDialog-DAUL3Hew.js";
import { a as C, c as w, i as T, n as E } from "./_prop_utils-CqbCYIc0.js";
import { A as D, M as O, _ as k, c as A, i as j, o as M } from "./Teleport-CZ6NJvBB.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function N(e, t) {
	return D(e) ? !1 : Array.isArray(e) ? e.some((e) => w(e, t)) : w(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxGroupRoot.js
var [P, F] = /*#__PURE__*/ O("CheckboxGroupRoot");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function I(e) {
	return e === "indeterminate";
}
function L(e) {
	return I(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [R, z] = /*#__PURE__*/ O("CheckboxRoot"), B = /* @__PURE__ */ h({
	inheritAttrs: !1,
	__name: "CheckboxRoot",
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
		value: {
			type: null,
			required: !1,
			default: "on"
		},
		id: {
			type: String,
			required: !1
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
	setup(d, { emit: m }) {
		let h = d, g = m, { forwardRef: v, currentElement: y } = A(), b = P(null), x = k(h, "modelValue", g, {
			defaultValue: h.defaultValue ?? h.falseValue,
			passive: h.modelValue === void 0
		}), O = u(() => b?.disabled.value || h.disabled), M = u(() => w(x.value, h.trueValue)), F = u(() => D(b?.modelValue.value) ? x.value === "indeterminate" ? "indeterminate" : M.value : N(b.modelValue.value, h.value));
		function R() {
			if (D(b?.modelValue.value)) x.value === "indeterminate" ? x.value = h.trueValue : x.value = M.value ? h.falseValue : h.trueValue;
			else {
				let e = [...b.modelValue.value || []];
				if (N(e, h.value)) {
					let t = e.findIndex((e) => w(e, h.value));
					e.splice(t, 1);
				} else e.push(h.value);
				b.modelValue.value = e;
			}
		}
		let B = C(y), V = T(), H = _(), U = u(() => {
			if (!H["aria-label"]) return h.id && y.value ? document.querySelector(`[for="${h.id}"]`)?.innerText : void 0;
		});
		return z({
			disabled: O,
			state: F
		}), (u, d) => (r(), a(p, null, [(r(), l(n(s(b)?.rovingFocus.value ? s(S) : s(j)), e({
			...u.$attrs,
			...s(V)
		}, {
			id: u.id,
			ref: s(v),
			role: "checkbox",
			"as-child": u.asChild,
			as: u.as,
			type: u.as === "button" ? "button" : void 0,
			"aria-checked": s(I)(F.value) ? "mixed" : F.value,
			"aria-required": u.required,
			"aria-label": u.$attrs["aria-label"] || U.value,
			"data-state": s(L)(F.value),
			"data-disabled": O.value ? "" : void 0,
			disabled: O.value,
			focusable: s(b)?.rovingFocus.value ? !O.value : void 0,
			onKeydown: f(o(() => {}, ["prevent"]), ["enter"]),
			onClick: R
		}), {
			default: i(() => [t(u.$slots, "default", {
				modelValue: s(x),
				state: F.value
			})]),
			_: 3
		}, 16, [
			"id",
			"as-child",
			"as",
			"type",
			"aria-checked",
			"aria-required",
			"aria-label",
			"data-state",
			"data-disabled",
			"disabled",
			"focusable",
			"onKeydown"
		])), s(B) && u.name && !s(b) ? (r(), l(s(E), e({
			key: 0,
			type: "checkbox",
			checked: !!F.value,
			name: u.name,
			value: u.value,
			disabled: O.value,
			required: u.required
		}, s(V)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : c("v-if", !0)], 64));
	}
}), V = /* @__PURE__ */ h({
	__name: "CheckboxIndicator",
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
			required: !1,
			default: "span"
		}
	},
	setup(n) {
		let { forwardRef: a } = A(), o = R();
		return (n, c) => (r(), l(s(M), { present: n.forceMount || s(I)(s(o).state.value) || s(o).state.value === !0 }, {
			default: i(() => [g(s(j), e({
				ref: s(a),
				"data-state": s(L)(s(o).state.value),
				"data-disabled": s(o).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": n.asChild,
				as: n.as
			}, n.$attrs), {
				default: i(() => [t(n.$slots, "default")]),
				_: 3
			}, 16, [
				"data-state",
				"data-disabled",
				"as-child",
				"as"
			])]),
			_: 3
		}, 8, ["present"]));
	}
}), H = ["data-disabled"], U = /* @__PURE__ */ h({
	__name: "AppCheckbox",
	props: {
		modelValue: { type: [Boolean, String] },
		label: {},
		labelHidden: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t;
		function o(e) {
			n("update:modelValue", e === !0);
		}
		return (t, n) => (r(), a("label", {
			class: m(s(b).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [g(s(B), {
			class: m(["tc-interactive", s(b).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": o
		}, {
			default: i(() => [g(s(V), { class: m(s(b).checkboxIndicator) }, {
				default: i(() => [g(v, {
					icon: e.modelValue === "indeterminate" ? s(x) : s(y),
					size: 14
				}, null, 8, ["icon"])]),
				_: 1
			}, 8, ["class"])]),
			_: 1
		}, 8, [
			"class",
			"model-value",
			"disabled",
			"aria-label"
		]), e.labelHidden ? c("", !0) : (r(), a("span", {
			key: 0,
			class: m(s(b).checkboxLabel)
		}, d(e.label), 3))], 10, H));
	}
});
//#endregion
export { U as t };
