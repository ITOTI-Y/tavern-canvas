import { $ as e, A as t, B as n, D as r, F as i, I as a, N as o, O as s, U as c, _ as l, c as u, ft as d, g as f, h as p, it as m, j as h, lt as g, m as _, p as v, s as y, st as b, u as x, x as S, y as C } from "./vue-i18n-D0uIxSJk.js";
import { r as w } from "./StateSurface-BEQHm_62.js";
import { a as T } from "./AppSelect-FH6QY0f8.js";
import { A as E, _ as D, c as O, i as k, j as A, m as j, s as M } from "./Teleport-CfSgxnHY.js";
import { c as N } from "./PopperContent-K7T6sb7Y.js";
import { r as P, u as F } from "./_prop_utils-xadmv5JU.js";
import { n as I } from "./AppSwitch-DMAmbdlY.js";
import { t as L } from "./Collection-CsTPApsC.js";
import { a as R, i as z, n as B, r as V, t as H } from "./RovingFocusGroup-BDSC0leT.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusItem.js
var U = /* @__PURE__ */ S({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: !1
		},
		focusable: {
			type: Boolean,
			required: !1,
			default: !0
		},
		active: {
			type: Boolean,
			required: !1
		},
		allowShiftKey: {
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
	setup(e) {
		let r = e, i = B(), l = M(), u = v(() => r.tabStopId || l), d = v(() => i.currentTabStopId.value === u.value), { getItems: f, CollectionItem: m } = L();
		t(() => {
			r.focusable && i.onFocusableItemAdd();
		}), h(() => {
			r.focusable && i.onFocusableItemRemove();
		}), n(() => r.focusable, (e, t) => {
			e !== t && (e ? i.onFocusableItemAdd() : i.onFocusableItemRemove());
		});
		function g(e) {
			if (e.key === "Tab" && e.shiftKey) {
				i.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = z(e, i.orientation.value, i.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !r.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let n = [...f().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") n.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && n.reverse();
					let r = n.indexOf(e.currentTarget);
					n = i.loop.value ? R(n, r + 1) : n.slice(r + 1);
				}
				s(() => V(n));
			}
		}
		return (e, t) => (o(), p(b(m), null, {
			default: c(() => [C(b(k), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": b(i).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? b(i).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => b(i).onItemFocus(u.value),
				onKeydown: g
			}, {
				default: c(() => [a(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"data-active",
				"data-disabled",
				"as",
				"as-child"
			])]),
			_: 3
		}));
	}
}), W = "radio.select";
function G(e, t, n) {
	E(W, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var K = /* @__PURE__ */ S({
	inheritAttrs: !1,
	__name: "Radio",
	props: {
		id: {
			type: String,
			required: !1
		},
		value: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		checked: {
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
	emits: ["update:checked", "select"],
	setup(e, { emit: t }) {
		let n = e, i = t, s = D(n, "checked", i, { passive: n.checked === void 0 }), { value: d } = m(n), { forwardRef: h, currentElement: g } = O(), _ = F(g), y = I(), S = v(() => n.id && g.value ? document.querySelector(`[for="${n.id}"]`)?.innerText ?? n.value : void 0);
		function w(e) {
			n.disabled || G(e, n.value, (e) => {
				i("select", e), !e?.defaultPrevented && (s.value = !0, _.value && e.stopPropagation());
			});
		}
		return (e, t) => (o(), l(x, null, [C(b(k), r({
			id: e.id,
			ref: b(h),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": b(s) ?? !1,
			"aria-label": S.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": b(s) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: b(d),
			required: e.required,
			name: e.name
		}, {
			...b(y),
			...e.$attrs
		}, { onClick: u(w, ["stop"]) }), {
			default: c(() => [a(e.$slots, "default", { checked: b(s) })]),
			_: 3
		}, 16, [
			"id",
			"type",
			"as",
			"aria-checked",
			"aria-label",
			"as-child",
			"disabled",
			"data-state",
			"data-disabled",
			"value",
			"required",
			"name"
		]), b(_) && e.name ? (o(), p(b(P), r({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: b(d),
			checked: !!b(s),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, b(y)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : f("v-if", !0)], 64));
	}
}), [q, J] = /*#__PURE__*/ A("RadioGroupRoot"), Y = /* @__PURE__ */ S({
	__name: "RadioGroupRoot",
	props: {
		modelValue: {
			type: null,
			required: !1
		},
		defaultValue: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
		},
		orientation: {
			type: String,
			required: !1,
			default: void 0
		},
		dir: {
			type: String,
			required: !1
		},
		loop: {
			type: Boolean,
			required: !1,
			default: !0
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: s } = O(), l = D(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: u, loop: d, orientation: h, name: g, required: _, dir: v } = m(n), y = N(v), x = F(s);
		return J({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			disabled: u,
			loop: d,
			orientation: h,
			name: g?.value,
			required: _
		}), (e, t) => (o(), p(b(H), {
			"as-child": "",
			orientation: b(h),
			dir: b(y),
			loop: b(d)
		}, {
			default: c(() => [C(b(k), {
				ref: b(i),
				role: "radiogroup",
				"data-disabled": b(u) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": b(h),
				"aria-required": b(_),
				dir: b(y)
			}, {
				default: c(() => [a(e.$slots, "default", { modelValue: b(l) }), b(x) && b(g) ? (o(), p(b(P), {
					key: 0,
					required: b(_),
					disabled: b(u),
					value: b(l),
					name: b(g)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : f("v-if", !0)]),
				_: 3
			}, 8, [
				"data-disabled",
				"as-child",
				"as",
				"aria-orientation",
				"aria-required",
				"dir"
			])]),
			_: 3
		}, 8, [
			"orientation",
			"dir",
			"loop"
		]));
	}
}), [X, Z] = /*#__PURE__*/ A("RadioGroupItem"), Q = /* @__PURE__ */ S({
	inheritAttrs: !1,
	__name: "RadioGroupItem",
	props: {
		id: {
			type: String,
			required: !1
		},
		value: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: !1
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
	emits: ["select"],
	setup(t, { emit: n }) {
		let i = t, s = n, { forwardRef: l, currentElement: d } = O(), f = q(), m = v(() => f.disabled.value || i.disabled), h = v(() => f.required.value || i.required), g = v(() => T(f.modelValue?.value, i.value));
		Z({
			disabled: m,
			checked: g
		});
		let _ = e(!1), x = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		j("keydown", (e) => {
			x.includes(e.key) && (_.value = !0);
		}), j("keyup", () => {
			_.value = !1;
		});
		function S() {
			setTimeout(() => {
				_.value && d.value?.click();
			}, 0);
		}
		let w = I();
		return (e, t) => (o(), p(b(U), {
			checked: g.value,
			disabled: m.value,
			"as-child": "",
			focusable: !m.value,
			active: g.value
		}, {
			default: c(() => [C(K, r({
				...b(w),
				...e.$attrs,
				...i
			}, {
				ref: b(l),
				checked: g.value,
				required: h.value,
				disabled: m.value,
				"onUpdate:checked": t[0] ||= (t) => b(f).changeModelValue(e.value),
				onSelect: t[1] ||= (e) => s("select", e),
				onKeydown: t[2] ||= y(u(() => {}, ["prevent"]), ["enter"]),
				onFocus: S
			}), {
				default: c(() => [a(e.$slots, "default", {
					checked: g.value,
					required: h.value,
					disabled: m.value
				})]),
				_: 3
			}, 16, [
				"checked",
				"required",
				"disabled"
			])]),
			_: 3
		}, 8, [
			"checked",
			"disabled",
			"focusable",
			"active"
		]));
	}
}), $ = /* @__PURE__ */ S({
	__name: "SegmentedControl",
	props: {
		modelValue: {},
		options: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			n("update:modelValue", e);
		}
		return (t, n) => (o(), p(b(Y), {
			class: g(b(w).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": r
		}, {
			default: c(() => [(o(!0), l(x, null, i(e.options, (e) => (o(), p(b(Q), {
				key: e.value,
				class: g(["tc-interactive", b(w).segmentedControlItem]),
				value: e.value
			}, {
				default: c(() => [_("span", { class: g(b(w).segmentedControlItemLabel) }, d(e.label), 3)]),
				_: 2
			}, 1032, ["class", "value"]))), 128))]),
			_: 1
		}, 8, [
			"class",
			"model-value",
			"disabled",
			"aria-label"
		]));
	}
});
//#endregion
export { U as n, $ as t };
