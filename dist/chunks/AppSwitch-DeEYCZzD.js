import { D as e, G as t, L as n, P as r, _ as i, c as a, dt as o, g as s, h as c, lt as l, m as u, mt as d, ot as f, p, s as m, u as h, x as g, y as _ } from "./vue-i18n-L-BrQRnK.js";
import { n as v } from "./AppIcon-DkyxvN8k.js";
import { t as y } from "./components_styles-DHX8irr3.js";
import { a as b, i as x } from "./AppCheckbox-qcV3D_N_.js";
import { n as S, t as C } from "./_prop_utils-O1SzpV_h.js";
import { P as w, S as T, f as E, s as D } from "./Teleport-CquQcgiX.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/scan-search.js
var O = v("scan-search", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m16 16-1.9-1.9",
		key: "1dq9hf"
	}]
]), [k, A] = /*#__PURE__*/ w("SwitchRoot"), j = /* @__PURE__ */ g({
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
		let d = o, g = u, { disabled: v } = f(d), y = T(d, "modelValue", g, {
			defaultValue: d.defaultValue ?? d.falseValue,
			passive: d.modelValue === void 0
		}), C = p(() => y.value === d.trueValue);
		function w() {
			v.value || (y.value = C.value ? d.falseValue : d.trueValue);
		}
		let { forwardRef: O, currentElement: k } = E(), j = S(k), M = b(), N = p(() => d.id && k.value ? document.querySelector(`[for="${d.id}"]`)?.innerText : void 0);
		return A({
			checked: C,
			toggleCheck: w,
			disabled: v
		}), (o, u) => (r(), i(h, null, [_(l(D), e({
			id: o.id,
			ref: l(O),
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
			onClick: w,
			onKeydown: m(a(w, ["prevent"]), ["enter"])
		}), {
			default: t(() => [n(o.$slots, "default", {
				modelValue: l(y),
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
		]), l(j) && o.name ? (r(), c(l(x), e({
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
}), M = /* @__PURE__ */ g({
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
		let i = k();
		return E(), (e, a) => (r(), c(l(D), {
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
}), N = ["data-disabled"], P = /* @__PURE__ */ g({
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
		let h = p(() => C({
			id: c.id,
			"aria-describedby": c.describedBy,
			"aria-label": c.labelHidden ? c.label : void 0
		}));
		return (a, c) => (r(), i("label", {
			class: o(l(y).switchRow),
			"data-disabled": n.disabled ? "" : void 0
		}, [n.labelHidden ? s("", !0) : (r(), i("span", {
			key: 0,
			class: o(l(y).switchLabelGroup)
		}, [u("span", { class: o(l(y).switchLabel) }, d(n.label), 3), n.description ? (r(), i("span", {
			key: 0,
			class: o(l(y).switchDescription)
		}, d(n.description), 3)) : s("", !0)], 2)), _(l(j), e(h.value, {
			class: ["tc-interactive", l(y).switchRoot],
			"model-value": n.modelValue,
			disabled: n.disabled,
			"onUpdate:modelValue": m
		}), {
			default: t(() => [_(l(M), { class: o(l(y).switchThumb) }, null, 8, ["class"])]),
			_: 1
		}, 16, [
			"class",
			"model-value",
			"disabled"
		])], 10, N));
	}
});
//#endregion
export { O as n, P as t };
