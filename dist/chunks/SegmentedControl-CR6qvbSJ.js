import { A as e, D as t, F as n, I as r, N as i, O as a, V as o, W as s, _ as c, at as l, c as u, ct as d, et as f, g as p, h as m, j as h, m as g, p as _, pt as v, s as y, u as b, ut as x, x as S, y as C } from "./vue-i18n-DUz2Gjn8.js";
import { r as w } from "./StateSurface-Bo_sA18G.js";
import { a as T } from "./AppSelect-CJ-1Hi5_.js";
import { A as E, _ as D, c as O, i as k, j as A, m as j, s as M } from "./Teleport-C7mDSUEl.js";
import { c as N } from "./PopperContent-7a56nwZP.js";
import { r as P, u as F } from "./_prop_utils-DtjJGT5O.js";
import { n as I } from "./AppSwitch-w_KIxpNZ.js";
import { t as L } from "./Collection-5SRQOk3F.js";
import { a as R, i as z, n as B, r as V, t as H } from "./RovingFocusGroup-CK-2q3kn.js";
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
	setup(t) {
		let n = t, c = B(), l = M(), u = _(() => n.tabStopId || l), f = _(() => c.currentTabStopId.value === u.value), { getItems: p, CollectionItem: g } = L();
		e(() => {
			n.focusable && c.onFocusableItemAdd();
		}), h(() => {
			n.focusable && c.onFocusableItemRemove();
		}), o(() => n.focusable, (e, t) => {
			e !== t && (e ? c.onFocusableItemAdd() : c.onFocusableItemRemove());
		});
		function v(e) {
			if (e.key === "Tab" && e.shiftKey) {
				c.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = z(e, c.orientation.value, c.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !n.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let r = [...p().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") r.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && r.reverse();
					let n = r.indexOf(e.currentTarget);
					r = c.loop.value ? R(r, n + 1) : r.slice(n + 1);
				}
				a(() => V(r));
			}
		}
		return (e, t) => (i(), m(d(g), null, {
			default: s(() => [C(d(k), {
				tabindex: f.value ? 0 : -1,
				"data-orientation": d(c).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? d(c).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => d(c).onItemFocus(u.value),
				onKeydown: v
			}, {
				default: s(() => [r(e.$slots, "default")]),
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
	setup(e, { emit: n }) {
		let a = e, o = n, f = D(a, "checked", o, { passive: a.checked === void 0 }), { value: h } = l(a), { forwardRef: g, currentElement: v } = O(), y = F(v), x = I(), S = _(() => a.id && v.value ? document.querySelector(`[for="${a.id}"]`)?.innerText ?? a.value : void 0);
		function w(e) {
			a.disabled || G(e, a.value, (e) => {
				o("select", e), !e?.defaultPrevented && (f.value = !0, y.value && e.stopPropagation());
			});
		}
		return (e, n) => (i(), c(b, null, [C(d(k), t({
			id: e.id,
			ref: d(g),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": d(f) ?? !1,
			"aria-label": S.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": d(f) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: d(h),
			required: e.required,
			name: e.name
		}, {
			...d(x),
			...e.$attrs
		}, { onClick: u(w, ["stop"]) }), {
			default: s(() => [r(e.$slots, "default", { checked: d(f) })]),
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
		]), d(y) && e.name ? (i(), m(d(P), t({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: d(h),
			checked: !!d(f),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, d(x)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : p("v-if", !0)], 64));
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
		let n = e, a = t, { forwardRef: o, currentElement: c } = O(), u = D(n, "modelValue", a, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: f, loop: h, orientation: g, name: _, required: v, dir: y } = l(n), b = N(y), x = F(c);
		return J({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			disabled: f,
			loop: h,
			orientation: g,
			name: _?.value,
			required: v
		}), (e, t) => (i(), m(d(H), {
			"as-child": "",
			orientation: d(g),
			dir: d(b),
			loop: d(h)
		}, {
			default: s(() => [C(d(k), {
				ref: d(o),
				role: "radiogroup",
				"data-disabled": d(f) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": d(g),
				"aria-required": d(v),
				dir: d(b)
			}, {
				default: s(() => [r(e.$slots, "default", { modelValue: d(u) }), d(x) && d(_) ? (i(), m(d(P), {
					key: 0,
					required: d(v),
					disabled: d(f),
					value: d(u),
					name: d(_)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : p("v-if", !0)]),
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
	setup(e, { emit: n }) {
		let a = e, o = n, { forwardRef: c, currentElement: l } = O(), p = q(), h = _(() => p.disabled.value || a.disabled), g = _(() => p.required.value || a.required), v = _(() => T(p.modelValue?.value, a.value));
		Z({
			disabled: h,
			checked: v
		});
		let b = f(!1), x = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		j("keydown", (e) => {
			x.includes(e.key) && (b.value = !0);
		}), j("keyup", () => {
			b.value = !1;
		});
		function S() {
			setTimeout(() => {
				b.value && l.value?.click();
			}, 0);
		}
		let w = I();
		return (e, n) => (i(), m(d(U), {
			checked: v.value,
			disabled: h.value,
			"as-child": "",
			focusable: !h.value,
			active: v.value
		}, {
			default: s(() => [C(K, t({
				...d(w),
				...e.$attrs,
				...a
			}, {
				ref: d(c),
				checked: v.value,
				required: g.value,
				disabled: h.value,
				"onUpdate:checked": n[0] ||= (t) => d(p).changeModelValue(e.value),
				onSelect: n[1] ||= (e) => o("select", e),
				onKeydown: n[2] ||= y(u(() => {}, ["prevent"]), ["enter"]),
				onFocus: S
			}), {
				default: s(() => [r(e.$slots, "default", {
					checked: v.value,
					required: g.value,
					disabled: h.value
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
		let r = t;
		function a(e) {
			r("update:modelValue", e);
		}
		return (t, r) => (i(), m(d(Y), {
			class: x(d(w).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": a
		}, {
			default: s(() => [(i(!0), c(b, null, n(e.options, (e) => (i(), m(d(Q), {
				key: e.value,
				class: x(["tc-interactive", d(w).segmentedControlItem]),
				value: e.value
			}, {
				default: s(() => [g("span", { class: x(d(w).segmentedControlItemLabel) }, v(e.label), 3)]),
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
