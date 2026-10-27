import { A as e, C as t, D as n, I as r, L as i, N as a, O as o, T as s, V as c, W as l, _ as u, at as d, c as f, ct as p, dt as m, et as h, g, h as _, j as v, m as y, p as b, pt as x, s as S, u as C, ut as w, v as T, x as E, y as D, z as ee } from "./vue-i18n-DUz2Gjn8.js";
import { n as O, t as k } from "./AppIcon-Cnhzrx9o.js";
import { t as A } from "./check-BhrVRbkS.js";
import { r as j } from "./StateSurface-Bo_sA18G.js";
import { t as M } from "./x-CDKrptQJ.js";
import { t as te } from "./portal_keys-gQ1cWdMS.js";
import { a as ne, i as re, l as N, o as ie, r as ae } from "./AppSelect-CIW6ICNh.js";
import { _ as P, c as F, i as I, j as L, k as R, o as oe, s as se } from "./Teleport-C7mDSUEl.js";
import { o as z } from "./FocusScope-B2vRGnoX.js";
import { c as B } from "./PopperContent-a3U-C0mc.js";
import { a as V, c as H, i as U, n as W, r as G, s as K, t as q } from "./Collection-C3W7ausR.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var J = O("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
function Y(e, t) {
	return R(e) ? !1 : Array.isArray(e) ? e.some((e) => N(e, t)) : N(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var ce = "rovingFocusGroup.onEntryFocus", le = {
	bubbles: !1,
	cancelable: !0
}, ue = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function de(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function fe(e, t, n) {
	let r = de(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return ue[r];
}
function X(e, t = !1) {
	let n = z();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), z() !== n)) return;
}
function pe(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [me, he] = /*#__PURE__*/ L("RovingFocusGroup"), ge = /* @__PURE__ */ E({
	__name: "RovingFocusGroup",
	props: {
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
			default: !1
		},
		currentTabStopId: {
			type: [String, null],
			required: !1
		},
		defaultCurrentTabStopId: {
			type: String,
			required: !1
		},
		preventScrollOnEntryFocus: {
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
			required: !1
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(e, { expose: t, emit: n }) {
		let i = e, o = n, { loop: s, orientation: c, dir: u } = d(i), f = B(u), m = P(i, "currentTabStopId", o, {
			defaultValue: i.defaultCurrentTabStopId,
			passive: i.currentTabStopId === void 0
		}), g = h(!1), v = h(!1), y = h(0), { getItems: b, CollectionSlot: x } = q({ isProvider: !0 });
		function S(e) {
			let t = !v.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !g.value) {
				let t = new CustomEvent(ce, le);
				if (e.currentTarget.dispatchEvent(t), o("entryFocus", t), !t.defaultPrevented) {
					let e = b().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					X([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === m.value),
						...e
					].filter(Boolean), i.preventScrollOnEntryFocus);
				}
			}
			v.value = !1;
		}
		function C() {
			setTimeout(() => {
				v.value = !1;
			}, 1);
		}
		return t({ getItems: b }), he({
			loop: s,
			dir: f,
			orientation: c,
			currentTabStopId: m,
			onItemFocus: (e) => {
				m.value = e;
			},
			onItemShiftTab: () => {
				g.value = !0;
			},
			onFocusableItemAdd: () => {
				y.value++;
			},
			onFocusableItemRemove: () => {
				y.value--;
			}
		}), (e, t) => (a(), _(p(x), null, {
			default: l(() => [D(p(I), {
				tabindex: g.value || y.value === 0 ? -1 : 0,
				"data-orientation": p(c),
				as: e.as,
				"as-child": e.asChild,
				dir: p(f),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => v.value = !0,
				onMouseup: C,
				onFocus: S,
				onBlur: t[1] ||= (e) => g.value = !1
			}, {
				default: l(() => [r(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"as",
				"as-child",
				"dir"
			])]),
			_: 3
		}));
	}
}), Z = /* @__PURE__ */ E({
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
		let n = t, i = me(), s = se(), u = b(() => n.tabStopId || s), d = b(() => i.currentTabStopId.value === u.value), { getItems: f, CollectionItem: m } = q();
		e(() => {
			n.focusable && i.onFocusableItemAdd();
		}), v(() => {
			n.focusable && i.onFocusableItemRemove();
		}), c(() => n.focusable, (e, t) => {
			e !== t && (e ? i.onFocusableItemAdd() : i.onFocusableItemRemove());
		});
		function h(e) {
			if (e.key === "Tab" && e.shiftKey) {
				i.onItemShiftTab();
				return;
			}
			if (e.target !== e.currentTarget) return;
			let t = fe(e, i.orientation.value, i.dir.value);
			if (t !== void 0) {
				if (e.metaKey || e.ctrlKey || e.altKey || !n.allowShiftKey && e.shiftKey) return;
				e.preventDefault();
				let r = [...f().map((e) => e.ref).filter((e) => e.dataset.disabled !== "")];
				if (t === "last") r.reverse();
				else if (t === "prev" || t === "next") {
					t === "prev" && r.reverse();
					let n = r.indexOf(e.currentTarget);
					r = i.loop.value ? pe(r, n + 1) : r.slice(n + 1);
				}
				o(() => X(r));
			}
		}
		return (e, t) => (a(), _(p(m), null, {
			default: l(() => [D(p(I), {
				tabindex: d.value ? 0 : -1,
				"data-orientation": p(i).orientation.value,
				"data-active": e.active ? "" : void 0,
				"data-disabled": e.focusable ? void 0 : "",
				as: e.as,
				"as-child": e.asChild,
				onMousedown: t[0] ||= (t) => {
					e.focusable ? p(i).onItemFocus(u.value) : t.preventDefault();
				},
				onFocus: t[1] ||= (e) => p(i).onItemFocus(u.value),
				onKeydown: h
			}, {
				default: l(() => [r(e.$slots, "default")]),
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
}), [_e, ve] = /*#__PURE__*/ L("CheckboxGroupRoot");
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function Q(e) {
	return e === "indeterminate";
}
function $(e) {
	return Q(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [ye, be] = /*#__PURE__*/ L("CheckboxRoot"), xe = /* @__PURE__ */ E({
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
	setup(e, { emit: t }) {
		let o = e, s = t, { forwardRef: c, currentElement: d } = F(), m = _e(null), h = P(o, "modelValue", s, {
			defaultValue: o.defaultValue ?? o.falseValue,
			passive: o.modelValue === void 0
		}), v = b(() => m?.disabled.value || o.disabled), y = b(() => N(h.value, o.trueValue)), x = b(() => R(m?.modelValue.value) ? h.value === "indeterminate" ? "indeterminate" : y.value : Y(m.modelValue.value, o.value));
		function w() {
			if (R(m?.modelValue.value)) h.value === "indeterminate" ? h.value = o.trueValue : h.value = y.value ? o.falseValue : o.trueValue;
			else {
				let e = [...m.modelValue.value || []];
				if (Y(e, o.value)) {
					let t = e.findIndex((e) => N(e, o.value));
					e.splice(t, 1);
				} else e.push(o.value);
				m.modelValue.value = e;
			}
		}
		let T = ie(d), E = ne(), D = ee(), O = b(() => {
			if (!D["aria-label"]) return o.id && d.value ? document.querySelector(`[for="${o.id}"]`)?.innerText : void 0;
		});
		return be({
			disabled: v,
			state: x
		}), (e, t) => (a(), u(C, null, [(a(), _(i(p(m)?.rovingFocus.value ? p(Z) : p(I)), n({
			...e.$attrs,
			...p(E)
		}, {
			id: e.id,
			ref: p(c),
			role: "checkbox",
			"as-child": e.asChild,
			as: e.as,
			type: e.as === "button" ? "button" : void 0,
			"aria-checked": p(Q)(x.value) ? "mixed" : x.value,
			"aria-required": e.required,
			"aria-label": e.$attrs["aria-label"] || O.value,
			"data-state": p($)(x.value),
			"data-disabled": v.value ? "" : void 0,
			disabled: v.value,
			focusable: p(m)?.rovingFocus.value ? !v.value : void 0,
			onKeydown: S(f(() => {}, ["prevent"]), ["enter"]),
			onClick: w
		}), {
			default: l(() => [r(e.$slots, "default", {
				modelValue: p(h),
				state: x.value
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
		])), p(T) && e.name && !p(m) ? (a(), _(p(ae), n({
			key: 0,
			type: "checkbox",
			checked: !!x.value,
			name: e.name,
			value: e.value,
			disabled: v.value,
			required: e.required
		}, p(E)), null, 16, [
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		])) : g("v-if", !0)], 64));
	}
}), Se = /* @__PURE__ */ E({
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
	setup(e) {
		let { forwardRef: t } = F(), i = ye();
		return (e, o) => (a(), _(p(oe), { present: e.forceMount || p(Q)(p(i).state.value) || p(i).state.value === !0 }, {
			default: l(() => [D(p(I), n({
				ref: p(t),
				"data-state": p($)(p(i).state.value),
				"data-disabled": p(i).disabled.value ? "" : void 0,
				style: { pointerEvents: "none" },
				"as-child": e.asChild,
				as: e.as
			}, e.$attrs), {
				default: l(() => [r(e.$slots, "default")]),
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
}), Ce = ["data-disabled"], we = /* @__PURE__ */ E({
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
		function r(e) {
			n("update:modelValue", e === !0);
		}
		return (t, n) => (a(), u("label", {
			class: w(p(j).checkboxRow),
			"data-disabled": e.disabled ? "" : void 0
		}, [D(p(xe), {
			class: w(["tc-interactive", p(j).checkboxBox]),
			"model-value": e.modelValue,
			disabled: e.disabled,
			"aria-label": e.labelHidden ? e.label : void 0,
			"onUpdate:modelValue": r
		}, {
			default: l(() => [D(p(Se), { class: w(p(j).checkboxIndicator) }, {
				default: l(() => [D(k, {
					icon: e.modelValue === "indeterminate" ? p(J) : p(A),
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
		]), e.labelHidden ? g("", !0) : (a(), u("span", {
			key: 0,
			class: w(p(j).checkboxLabel)
		}, x(e.label), 3))], 10, Ce));
	}
}), Te = /* @__PURE__ */ E({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(e, { emit: n }) {
		let i = n;
		function o(e) {
			i("update:open", e);
		}
		let c = s(te, void 0), u = b(() => c ? { to: c } : {});
		return (n, i) => (a(), _(p(H), {
			open: e.open,
			"onUpdate:open": o
		}, {
			default: l(() => [D(p(re), m(t(u.value)), {
				default: l(() => [D(p(G), { class: w(p(j).dialogOverlay) }, null, 8, ["class"]), D(p(V), { class: w(p(j).dialogContent) }, {
					default: l(() => [
						y("header", { class: w(p(j).dialogHeader) }, [D(p(W), { class: w(p(j).dialogTitle) }, {
							default: l(() => [T(x(e.title), 1)]),
							_: 1
						}, 8, ["class"]), D(p(K), {
							class: w(["tc-interactive", p(j).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: l(() => [D(k, {
								icon: p(M),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (a(), _(p(U), {
							key: 0,
							class: w(p(j).dialogDescription)
						}, {
							default: l(() => [T(x(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : g("", !0),
						y("div", { class: w(p(j).dialogBody) }, [r(n.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
});
//#endregion
export { J as a, ge as i, we as n, Z as r, Te as t };
