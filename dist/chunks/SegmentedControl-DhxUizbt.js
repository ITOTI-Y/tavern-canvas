import { A as e, I as t, K as n, N as r, P as i, R as a, S as o, U as s, _ as c, b as l, d as u, ft as d, g as f, ht as p, j as m, nt as h, p as g, st as _, u as v, ut as y, v as b, w as x, y as S, z as C } from "./AppIcon-BpY-A4VH.js";
import { r as w } from "./StateSurface-CNBIMTjV.js";
import { B as T, C as E, L as D, Q as O, T as k, X as A, j, k as M, s as N } from "./PopperContent-_OEj_1Tb.js";
import { a as P } from "./AppSelect-YiC8A59f.js";
import { r as F, u as I } from "./_prop_utils-CoKBy72F.js";
import { n as L } from "./AppSwitch-Cp98f87Q.js";
import { a as R, i as z, n as B, r as V, t as H } from "./RovingFocusGroup-soVq9DTI.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusItem.js
var U = /* @__PURE__ */ x({
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
		let a = e, c = B(), l = k(), u = f(() => a.tabStopId || l), d = f(() => c.currentTabStopId.value === u.value), { getItems: p, CollectionItem: h } = N();
		r(() => {
			a.focusable && c.onFocusableItemAdd();
		}), i(() => {
			a.focusable && c.onFocusableItemRemove();
		}), s(() => a.focusable, (e, t) => {
			e !== t && (e ? c.onFocusableItemAdd() : c.onFocusableItemRemove());
		});
		function g(e) {
			if (e.key === "Tab" && e.shiftKey) {
				c.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = z(e, c.orientation.value, c.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !a.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let n = [...p().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") n.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && n.reverse();
					let r = n.indexOf(e.currentTarget);
					n = c.loop.value ? R(n, r + 1) : n.slice(r + 1);
				}
				m(() => V(n));
			}
		}
		return (e, r) => (t(), b(y(h), null, {
			default: n(() => [o(y(E), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": y(c).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: r[0] ||= (t) => {
					e.focusable ? y(c).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: r[1] ||= (e) => y(c).onItemFocus(u.value),
				onKeydown: g
			}, {
				default: n(() => [C(e.$slots, "default")]),
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
	A(W, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var K = /* @__PURE__ */ x({
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
	setup(r, { emit: i }) {
		let a = r, s = i, c = T(a, "checked", s, { passive: a.checked === void 0 }), { value: d } = _(a), { forwardRef: p, currentElement: m } = M(), h = I(m), v = L(), x = f(() => a.id && m.value ? document.querySelector(`[for="${a.id}"]`)?.innerText ?? a.value : void 0);
		function w(e) {
			a.disabled || G(e, a.value, (e) => {
				s("select", e), !e?.defaultPrevented && (c.value = !0, h.value && e.stopPropagation());
			});
		}
		return (r, i) => (t(), l(g, null, [o(y(E), e({
			id: r.id,
			ref: y(p),
			role: "radio",
			type: r.as === "button" ? "button" : void 0,
			as: r.as,
			"aria-checked": y(c) ?? !1,
			"aria-label": x.value,
			"as-child": r.asChild,
			disabled: r.disabled ? "" : void 0,
			"data-state": y(c) ? "checked" : "unchecked",
			"data-disabled": r.disabled ? "" : void 0,
			value: y(d),
			required: r.required,
			name: r.name
		}, {
			...y(v),
			...r.$attrs
		}, { onClick: u(w, ["stop"]) }), {
			default: n(() => [C(r.$slots, "default", { checked: y(c) })]),
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
		]), y(h) && r.name ? (t(), b(y(F), e({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: y(d),
			checked: !!y(c),
			name: r.name,
			disabled: r.disabled,
			required: r.required
		}, y(v)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : S("v-if", !0)], 64));
	}
}), [q, J] = /*#__PURE__*/ O("RadioGroupRoot"), Y = /* @__PURE__ */ x({
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
	setup(e, { emit: r }) {
		let i = e, a = r, { forwardRef: s, currentElement: c } = M(), l = T(i, "modelValue", a, {
			defaultValue: i.defaultValue,
			passive: i.modelValue === void 0
		}), { disabled: u, loop: d, orientation: f, name: p, required: m, dir: h } = _(i), g = j(h), v = I(c);
		return J({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			disabled: u,
			loop: d,
			orientation: f,
			name: p?.value,
			required: m
		}), (e, r) => (t(), b(y(H), {
			"as-child": "",
			orientation: y(f),
			dir: y(g),
			loop: y(d)
		}, {
			default: n(() => [o(y(E), {
				ref: y(s),
				role: "radiogroup",
				"data-disabled": y(u) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": y(f),
				"aria-required": y(m),
				dir: y(g)
			}, {
				default: n(() => [C(e.$slots, "default", { modelValue: y(l) }), y(v) && y(p) ? (t(), b(y(F), {
					key: 0,
					required: y(m),
					disabled: y(u),
					value: y(l),
					name: y(p)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : S("v-if", !0)]),
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
}), [X, Z] = /*#__PURE__*/ O("RadioGroupItem"), Q = /* @__PURE__ */ x({
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
	setup(r, { emit: i }) {
		let a = r, s = i, { forwardRef: c, currentElement: l } = M(), d = q(), p = f(() => d.disabled.value || a.disabled), m = f(() => d.required.value || a.required), g = f(() => P(d.modelValue?.value, a.value));
		Z({
			disabled: p,
			checked: g
		});
		let _ = h(!1), x = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		D("keydown", (e) => {
			x.includes(e.key) && (_.value = !0);
		}), D("keyup", () => {
			_.value = !1;
		});
		function S() {
			setTimeout(() => {
				_.value && l.value?.click();
			}, 0);
		}
		let w = L();
		return (r, i) => (t(), b(y(U), {
			checked: g.value,
			disabled: p.value,
			"as-child": "",
			focusable: !p.value,
			active: g.value
		}, {
			default: n(() => [o(K, e({
				...y(w),
				...r.$attrs,
				...a
			}, {
				ref: y(c),
				checked: g.value,
				required: m.value,
				disabled: p.value,
				"onUpdate:checked": i[0] ||= (e) => y(d).changeModelValue(r.value),
				onSelect: i[1] ||= (e) => s("select", e),
				onKeydown: i[2] ||= v(u(() => {}, ["prevent"]), ["enter"]),
				onFocus: S
			}), {
				default: n(() => [C(r.$slots, "default", {
					checked: g.value,
					required: m.value,
					disabled: p.value
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
}), $ = /* @__PURE__ */ x({
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
	setup(e, { emit: r }) {
		let i = r;
		function o(e) {
			i("update:modelValue", e);
		}
		return (r, i) => (t(), b(y(Y), {
			class: d(y(w).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": o
		}, {
			default: n(() => [(t(!0), l(g, null, a(e.options, (e) => (t(), b(y(Q), {
				key: e.value,
				class: d(["tc-interactive", y(w).segmentedControlItem]),
				value: e.value
			}, {
				default: n(() => [c("span", { class: d(y(w).segmentedControlItemLabel) }, p(e.label), 3)]),
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

//# sourceMappingURL=SegmentedControl-DhxUizbt.js.map