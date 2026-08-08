import { A as e, B as t, E as n, I as r, K as i, N as a, O as o, P as s, R as c, S as l, U as u, W as d, _ as f, b as p, d as m, ft as h, g, ht as _, j as v, m as y, mt as b, nt as x, p as S, pt as C, st as w, t as T, ut as E, v as D, w as O, x as k, y as A, z as j } from "./AppIcon-BpY-A4VH.js";
import { t as M } from "./check-deKde2R4.js";
import { n as ee, r as N, t as P } from "./useTypeahead-DHbSip40.js";
import { r as F } from "./StateSurface-CNBIMTjV.js";
import { $ as te, B as I, C as L, D as ne, E as re, I as ie, M as ae, O as R, P as oe, Q as z, T as B, X as se, Y as V, Z as ce, _ as le, a as ue, b as de, c as H, i as fe, j as pe, k as U, n as me, o as he, p as W, s as G, w as ge, z as _e } from "./PopperContent-_OEj_1Tb.js";
import { t as K, u as ve } from "./_prop_utils-CoKBy72F.js";
//#region ../../node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function q(e) {
	return typeof e == "string" ? `'${e}'` : new ye().serialize(e);
}
var ye = /*@__PURE__*/ function() {
	class e {
		#e = /* @__PURE__ */ new Map();
		compare(e, t) {
			let n = typeof e, r = typeof t;
			return n === "string" && r === "string" ? e.localeCompare(t) : n === "number" && r === "number" ? e - t : String.prototype.localeCompare.call(this.serialize(e, !0), this.serialize(t, !0));
		}
		serialize(e, t) {
			if (e === null) return "null";
			switch (typeof e) {
				case "string": return t ? e : `'${e}'`;
				case "bigint": return `${e}n`;
				case "object": return this.$object(e);
				case "function": return this.$function(e);
			}
			return String(e);
		}
		serializeObject(e) {
			let t = Object.prototype.toString.call(e);
			if (t !== "[object Object]") return this.serializeBuiltInType(t.length < 10 ? `unknown:${t}` : t.slice(8, -1), e);
			let n = e.constructor, r = n === Object || n === void 0 ? "" : n.name;
			if (r !== "" && globalThis[r] === n) return this.serializeBuiltInType(r, e);
			if (typeof e.toJSON == "function") {
				let t = e.toJSON();
				return r + (typeof t == "object" && t ? this.$object(t) : `(${this.serialize(t)})`);
			}
			return this.serializeObjectEntries(r, Object.entries(e));
		}
		serializeBuiltInType(e, t) {
			let n = this["$" + e];
			if (n) return n.call(this, t);
			if (typeof t?.entries == "function") return this.serializeObjectEntries(e, t.entries());
			throw Error(`Cannot serialize ${e}`);
		}
		serializeObjectEntries(e, t) {
			let n = Array.from(t).sort((e, t) => this.compare(e[0], t[0])), r = `${e}{`;
			for (let e = 0; e < n.length; e++) {
				let [t, i] = n[e];
				r += `${this.serialize(t, !0)}:${this.serialize(i)}`, e < n.length - 1 && (r += ",");
			}
			return r + "}";
		}
		$object(e) {
			let t = this.#e.get(e);
			return t === void 0 && (this.#e.set(e, `#${this.#e.size}`), t = this.serializeObject(e), this.#e.set(e, t)), t;
		}
		$function(e) {
			let t = Function.prototype.toString.call(e);
			return t.slice(-15) === "[native code] }" ? `${e.name || ""}()[native]` : `${e.name}(${e.length})${t.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(e) {
			let t = "[";
			for (let n = 0; n < e.length; n++) t += this.serialize(e[n]), n < e.length - 1 && (t += ",");
			return t + "]";
		}
		$Date(e) {
			try {
				return `Date(${e.toISOString()})`;
			} catch {
				return "Date(null)";
			}
		}
		$ArrayBuffer(e) {
			return `ArrayBuffer[${new Uint8Array(e).join(",")}]`;
		}
		$Set(e) {
			return `Set${this.$Array(Array.from(e).sort((e, t) => this.compare(e, t)))}`;
		}
		$Map(e) {
			return this.serializeObjectEntries("Map", e.entries());
		}
	}
	for (let t of [
		"Error",
		"RegExp",
		"URL"
	]) e.prototype["$" + t] = function(e) {
		return `${t}(${e})`;
	};
	for (let t of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join(",")}]`;
	};
	for (let t of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join("n,")}${e.length > 0 ? "n" : ""}]`;
	};
	return e;
}();
function be(e, t) {
	return e === t || q(e) === q(t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
function J(e, t = -Infinity, n = Infinity) {
	return Math.min(n, Math.max(t, e));
}
function Y(e, t) {
	let n = e, r = t.toString(), i = r.indexOf("."), a = i >= 0 ? r.length - i : 0;
	if (a > 0) {
		let e = 10 ** a;
		n = Math.round(n * e) / e;
	}
	return n;
}
function xe(e, t, n, r) {
	t = Number(t), n = Number(n);
	let i = (e - (Number.isNaN(t) ? 0 : t)) % r, a = Y(Math.abs(i) * 2 >= r ? e + Math.sign(i) * (r - Math.abs(i)) : e - i, r);
	return Number.isNaN(t) ? !Number.isNaN(n) && a > n && (a = Math.floor(Y(n / r, r)) * r) : a < t ? a = t : !Number.isNaN(n) && a > n && (a = t + Math.floor(Y((n - t) / r, r)) * r), a = Y(a, r), a;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var Se = /* @__PURE__ */ O({
	__name: "DialogPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, a) => (r(), D(E(H), C(n(t)), {
			default: i(() => [j(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function Ce(e) {
	let t = oe({ nonce: x() });
	return g(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var we = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Te = [" ", "Enter"];
function X(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => Z(e, t, n)) : Z(e, t, n);
}
function Z(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : be(e, t);
}
function Ee(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var De = ["value"], [Q, Oe] = /*#__PURE__*/ z("SelectRoot"), ke = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1
		},
		defaultValue: {
			type: null,
			required: !1
		},
		modelValue: {
			type: null,
			required: !1,
			default: void 0
		},
		nullableValue: {
			type: String,
			required: !1,
			default: ""
		},
		by: {
			type: [String, Function],
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		multiple: {
			type: Boolean,
			required: !1
		},
		autocomplete: {
			type: String,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
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
	emits: ["update:modelValue", "update:open"],
	setup(t, { emit: n }) {
		let a = t, o = n, { required: s, disabled: l, multiple: u, dir: d } = w(a), f = I(a, "modelValue", o, {
			defaultValue: a.defaultValue ?? (u.value ? [] : void 0),
			passive: a.modelValue === void 0,
			deep: !0
		}), m = I(a, "open", o, {
			defaultValue: a.defaultOpen,
			passive: a.open === void 0
		}), h = x(), _ = x(), v = x({
			x: 0,
			y: 0
		}), y = g(() => u.value && Array.isArray(f.value) ? f.value?.length === 0 : V(f.value));
		G({ isProvider: !0 });
		let b = pe(d), C = ve(h), T = x(/* @__PURE__ */ new Set()), O = g(() => Array.from(T.value).map((e) => e.value).join(";"));
		function k(e) {
			if (u.value) {
				let t = Array.isArray(f.value) ? [...f.value] : [], n = t.findIndex((t) => Z(t, e, a.by));
				n === -1 ? t.push(e) : t.splice(n, 1), f.value = [...t];
			} else f.value = e;
		}
		function M(e) {
			return Array.from(T.value).find((t) => X(e, t.value, a.by));
		}
		return Oe({
			triggerElement: h,
			onTriggerChange: (e) => {
				h.value = e;
			},
			valueElement: _,
			onValueElementChange: (e) => {
				_.value = e;
			},
			contentId: "",
			modelValue: f,
			onValueChange: k,
			by: a.by,
			open: m,
			multiple: u,
			required: s,
			onOpenChange: (e) => {
				m.value = e;
			},
			dir: b,
			triggerPointerDownPosRef: v,
			disabled: l,
			isEmptyModelValue: y,
			optionsSet: T,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && T.value.delete(t), T.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && T.value.delete(t);
			}
		}), (t, n) => (r(), D(E(ue), null, {
			default: i(() => [j(t.$slots, "default", {
				modelValue: E(f),
				open: E(m)
			}), E(C) && t.name ? (r(), D(Ae, {
				key: O.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: E(u),
				required: E(s),
				name: t.name,
				autocomplete: t.autocomplete,
				disabled: E(l),
				value: E(f)
			}, {
				default: i(() => [E(V)(E(f)) ? (r(), p("option", {
					key: 0,
					value: t.nullableValue
				}, null, 8, De)) : A("v-if", !0), (r(!0), p(S, null, c(Array.from(T.value), (t) => (r(), p("option", e({ key: t.value ?? "" }, { ref_for: !0 }, t), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : A("v-if", !0)]),
			_: 3
		}));
	}
}), Ae = /* @__PURE__ */ O({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: !1
		},
		autofocus: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		form: {
			type: String,
			required: !1
		},
		multiple: {
			type: Boolean,
			required: !1
		},
		name: {
			type: String,
			required: !1
		},
		required: {
			type: Boolean,
			required: !1
		},
		size: {
			type: Number,
			required: !1
		},
		value: {
			type: null,
			required: !1
		}
	},
	setup(t) {
		let n = t, a = x(), o = Q();
		u(() => n.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && r && a.value) {
				let t = new Event("change", { bubbles: !0 });
				r.call(a.value, e), a.value.dispatchEvent(t);
			}
		});
		function s(e) {
			o.onValueChange(e.target.value);
		}
		return (t, o) => (r(), D(E(he), { "as-child": "" }, {
			default: i(() => [f("select", e({
				ref_key: "selectElement",
				ref: a
			}, n, { onInput: s }), [j(t.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), je = /* @__PURE__ */ O({
	__name: "SelectPopperPosition",
	props: {
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1,
			default: 10
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
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
	setup(t) {
		let n = R(t);
		return (t, a) => (r(), D(E(me), e(E(n), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: i(() => [j(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Me = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, Ne] = /*#__PURE__*/ z("SelectContent"), Pe = /* @__PURE__ */ O({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: !1,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: !1,
			default: !0
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(n, { emit: a }) {
		let o = n, s = a, c = Q();
		ee(), ae(o.bodyLock);
		let { CollectionSlot: f, getItems: p } = G(), h = x();
		re(h);
		let { search: _, handleTypeaheadSearch: v } = P(), y = x(), b = x(), S = x(), C = x(!1), w = x(!1), T = x(!1);
		function O() {
			b.value && h.value && W([b.value, h.value]);
		}
		u(C, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: A } = c;
		d((e) => {
			if (!h.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (A.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (A.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : h.value?.contains(e.target) || k(!1), document.removeEventListener("pointermove", n), A.value = null);
			};
			A.value !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", r, {
				capture: !0,
				once: !0
			})), e(() => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", r, { capture: !0 });
			});
		});
		function M(e) {
			let t = e.ctrlKey || e.altKey || e.metaKey;
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && v(e.key, p()), [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) {
				let t = [...p().map((e) => e.ref)];
				if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
					let n = e.target, r = t.indexOf(n);
					t = t.slice(r + 1);
				}
				setTimeout(() => W(t)), e.preventDefault();
			}
		}
		let N = g(() => o.position === "popper" ? o : {}), F = R(N.value);
		return Ne({
			content: h,
			viewport: y,
			onViewportChange: (e) => {
				y.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !w.value && !n, i = X(c.modelValue.value, t, c.by);
				if (c.multiple.value) {
					if (T.value) return;
					(i || r) && (b.value = e, i && (T.value = !0));
				} else (i || r) && (b.value = e);
				r && (w.value = !0);
			},
			selectedItem: b,
			selectedItemText: S,
			onItemLeave: () => {
				h.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !w.value && !n;
				(X(c.modelValue.value, t, c.by) || r) && (S.value = e);
			},
			focusSelectedItem: O,
			position: o.position,
			isPositioned: C,
			searchRef: _
		}), (n, a) => (r(), D(E(f), null, {
			default: i(() => [l(E(le), {
				"as-child": "",
				onMountAutoFocus: a[6] ||= m(() => {}, ["prevent"]),
				onUnmountAutoFocus: a[7] ||= (e) => {
					s("closeAutoFocus", e), !e.defaultPrevented && (E(c).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: i(() => [l(E(de), {
					"as-child": "",
					"disable-outside-pointer-events": n.disableOutsidePointerEvents,
					onFocusOutside: a[2] ||= m(() => {}, ["prevent"]),
					onDismiss: a[3] ||= (e) => E(c).onOpenChange(!1),
					onEscapeKeyDown: a[4] ||= (e) => s("escapeKeyDown", e),
					onPointerDownOutside: a[5] ||= (e) => s("pointerDownOutside", e)
				}, {
					default: i(() => [(r(), D(t(n.position === "popper" ? je : Le), e({
						...n.$attrs,
						...E(F)
					}, {
						id: E(c).contentId,
						ref: (e) => {
							if (!e) return;
							let t = E(ie)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? h.value = t.firstElementChild : h.value = t;
						},
						role: "listbox",
						"data-state": E(c).open.value ? "open" : "closed",
						dir: E(c).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: a[0] ||= m(() => {}, ["prevent"]),
						onPlaced: a[1] ||= (e) => C.value = !0,
						onKeydown: M
					}), {
						default: i(() => [j(n.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"dir",
						"onKeydown"
					]))]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			})]),
			_: 3
		}));
	}
}), [Fe, Ie] = /*#__PURE__*/ z("SelectItemAlignedPosition"), Le = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectItemAlignedPosition",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	emits: ["placed"],
	setup(t, { emit: n }) {
		let o = t, s = n, { getItems: c } = G(), u = Q(), d = $(), f = x(!1), m = x(!0), h = x(), { forwardRef: g, currentElement: _ } = U(), { viewport: y, selectedItem: S, selectedItemText: C, focusSelectedItem: w } = d;
		function T() {
			if (u.triggerElement.value && u.valueElement.value && h.value && _.value && y?.value && S?.value && C?.value) {
				let e = u.triggerElement.value.getBoundingClientRect(), t = _.value.getBoundingClientRect(), n = u.valueElement.value.getBoundingClientRect(), r = C.value.getBoundingClientRect();
				if (u.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = J(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = J(a, 10, Math.max(10, l - c));
					h.value.style.minWidth = `${s}px`, h.value.style.right = `${u}px`;
				}
				let i = c().map((e) => e.ref), a = window.innerHeight - 20, o = y.value.scrollHeight, l = window.getComputedStyle(_.value), d = Number.parseInt(l.borderTopWidth, 10), p = Number.parseInt(l.paddingTop, 10), m = Number.parseInt(l.borderBottomWidth, 10), g = Number.parseInt(l.paddingBottom, 10), v = d + p + o + g + m, b = Math.min(S.value.offsetHeight * 5, v), x = window.getComputedStyle(y.value), w = Number.parseInt(x.paddingTop, 10), T = Number.parseInt(x.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = a - E, O = S.value.offsetHeight / 2, k = S.value.offsetTop + O, A = d + p + k, j = v - A;
				if (A <= E) {
					let e = S.value === i.at(-1);
					h.value.style.bottom = "0px";
					let t = _.value.clientHeight - y.value.offsetTop - y.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + m);
					h.value.style.height = `${n}px`;
				} else {
					let e = S.value === i[0];
					h.value.style.top = "0px";
					let t = Math.max(E, d + y.value.offsetTop + (e ? w : 0) + O) + j;
					h.value.style.height = `${t}px`, y.value.scrollTop = A - E + y.value.offsetTop;
				}
				h.value.style.margin = "10px 0", h.value.style.minHeight = `${b}px`, h.value.style.maxHeight = `${a}px`, s("placed"), requestAnimationFrame(() => f.value = !0);
			}
		}
		let D = x("");
		a(async () => {
			await v(), T(), _.value && (D.value = window.getComputedStyle(_.value).zIndex);
		});
		function O(e) {
			e && m.value === !0 && (T(), w?.(), m.value = !1);
		}
		return _e(u.triggerElement, () => {
			T();
		}), Ie({
			contentWrapper: h,
			shouldExpandOnScrollRef: f,
			onScrollButtonChange: O
		}), (t, n) => (r(), p("div", {
			ref_key: "contentWrapperElement",
			ref: h,
			style: b({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [l(E(L), e({
			ref: E(g),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...t.$attrs,
			...o
		}), {
			default: i(() => [j(t.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Re = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return Oe(e.context), Ne(Me), (e, t) => j(e.$slots, "default");
	}
}), ze = { key: 1 }, Be = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		position: {
			type: String,
			required: !1
		},
		bodyLock: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(e, { emit: t }) {
		let o = e, c = ne(o, t), d = Q(), f = x();
		a(() => {
			f.value = new DocumentFragment();
		});
		let m = x(), h = g(() => o.forceMount || d.open.value), _ = x(h.value), v;
		function b() {
			v &&= (clearTimeout(v), void 0);
		}
		return u(h, (e, t, n) => {
			b(), v = setTimeout(() => {
				_.value = h.value, v = void 0;
			}), n(b);
		}), s(b), (e, t) => h.value || _.value || m.value?.present ? (r(), D(E(ge), {
			key: 0,
			ref_key: "presenceRef",
			ref: m,
			present: h.value
		}, {
			default: i(() => [l(Pe, C(n({
				...E(c),
				...e.$attrs
			})), {
				default: i(() => [j(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : f.value ? (r(), p("div", ze, [(r(), D(y, { to: f.value }, [l(Re, { context: E(d) }, {
			default: i(() => [j(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : A("v-if", !0);
	}
}), Ve = /* @__PURE__ */ O({
	__name: "SelectIcon",
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
		return (e, t) => (r(), D(E(L), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: i(() => [j(e.$slots, "default", {}, () => [t[0] ||= k("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [He, Ue] = /*#__PURE__*/ z("SelectItem"), We = /* @__PURE__ */ O({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: !0
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
			type: String,
			required: !1
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
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, o = t, { disabled: s } = w(n), c = Q(), u = $(), { forwardRef: d, currentElement: f } = U(), { CollectionItem: p } = G(), h = g(() => X(c.modelValue?.value, n.value, c.by)), _ = x(!1), y = x(n.textValue ?? ""), b = B(void 0, "reka-select-item-text");
		async function S(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: n.value
			};
			se("select.select", C, t);
		}
		async function C(e) {
			await v(), o("select", e), !e.defaultPrevented && (s.value || (c.onValueChange(n.value), c.multiple.value || c.onOpenChange(!1)));
		}
		async function T(e) {
			await v(), !e.defaultPrevented && (s.value ? u.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await v(), !e.defaultPrevented && e.currentTarget === ce() && u.onItemLeave?.();
		}
		async function k(e) {
			await v(), !e.defaultPrevented && (u.searchRef?.value === "" || e.key !== " ") && (Te.includes(e.key) && S(e), e.key === " " && e.preventDefault());
		}
		if (n.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return a(() => {
			f.value && u.itemRefCallback(f.value, n.value, n.disabled);
		}), Ue({
			value: n.value,
			disabled: s,
			textId: b,
			isSelected: h,
			onItemTextChange: (e) => {
				y.value = ((y.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (r(), D(E(p), { value: { textValue: y.value } }, {
			default: i(() => [l(E(L), {
				ref: E(d),
				role: "option",
				"aria-labelledby": E(b),
				"data-highlighted": _.value ? "" : void 0,
				"aria-selected": h.value,
				"data-state": h.value ? "checked" : "unchecked",
				"aria-disabled": E(s) || void 0,
				"data-disabled": E(s) ? "" : void 0,
				tabindex: E(s) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => _.value = !0,
				onBlur: t[1] ||= (e) => _.value = !1,
				onPointerup: S,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= m(() => {}, ["prevent", "stop"]),
				onPointermove: T,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: i(() => [j(e.$slots, "default")]),
				_: 3
			}, 8, [
				"aria-labelledby",
				"data-highlighted",
				"aria-selected",
				"data-state",
				"aria-disabled",
				"data-disabled",
				"tabindex",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["value"]));
	}
}), Ge = /* @__PURE__ */ O({
	__name: "SelectItemIndicator",
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
	setup(t) {
		let n = t, a = He();
		return (t, o) => E(a).isSelected.value ? (r(), D(E(L), e({
			key: 0,
			"aria-hidden": "true"
		}, n), {
			default: i(() => [j(t.$slots, "default")]),
			_: 3
		}, 16)) : A("v-if", !0);
	}
}), Ke = /* @__PURE__ */ O({
	inheritAttrs: !1,
	__name: "SelectItemText",
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
	setup(t) {
		let n = t, o = Q(), c = $(), l = He(), { forwardRef: u, currentElement: d } = U(), f = g(() => ({
			value: l.value,
			disabled: l.disabled.value,
			textContent: d.value?.textContent ?? l.value?.toString() ?? ""
		}));
		return a(() => {
			d.value && (l.onItemTextChange(d.value), c.itemTextRefCallback(d.value, l.value, l.disabled.value), o.onOptionAdd(f.value));
		}), s(() => {
			o.onOptionRemove(f.value);
		}), (t, a) => (r(), D(E(L), e({
			id: E(l).textId,
			ref: E(u)
		}, {
			...n,
			...t.$attrs
		}), {
			default: i(() => [j(t.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), qe = /* @__PURE__ */ O({
	__name: "SelectPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, a) => (r(), D(E(H), C(n(t)), {
			default: i(() => [j(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Je = /* @__PURE__ */ O({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, n = Q(), { forwardRef: o, currentElement: s } = U(), c = g(() => n.disabled?.value || t.disabled);
		n.contentId ||= B(void 0, "reka-select-content"), a(() => {
			n.onTriggerChange(s.value);
		});
		let { getItems: u } = G(), { search: d, handleTypeaheadSearch: f, resetTypeahead: p } = P();
		function h() {
			c.value || (n.onOpenChange(!0), p());
		}
		function _(e) {
			h(), n.triggerPointerDownPosRef.value = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY)
			};
		}
		function v(e) {
			return e.button === 0 && e.ctrlKey === !1;
		}
		let y = !1;
		function b(e) {
			if (e.pointerType === "touch") return e.preventDefault();
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), v(e) && (_(e), y = !0);
		}
		function x(e) {
			v(e) && e.preventDefault();
		}
		function S(e) {
			y || e.currentTarget?.focus(), y = !1;
		}
		return (e, t) => (r(), D(E(fe), {
			"as-child": "",
			reference: e.reference
		}, {
			default: i(() => [l(E(L), {
				ref: E(o),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": E(n).contentId,
				"aria-expanded": E(n).open.value || !1,
				"aria-required": E(n).required?.value,
				"aria-autocomplete": "none",
				disabled: c.value,
				dir: E(n)?.dir.value,
				"data-state": E(n)?.open.value ? "open" : "closed",
				"data-disabled": c.value ? "" : void 0,
				"data-placeholder": E(Ee)(E(n).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: S,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: t[0] ||= m((e) => {
					e.pointerType === "touch" && _(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = E(d) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (E(f)(e.key, E(u)()), E(we).includes(e.key) && (h(), e.preventDefault()));
				}
			}, {
				default: i(() => [j(e.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"aria-controls",
				"aria-expanded",
				"aria-required",
				"disabled",
				"dir",
				"data-state",
				"data-disabled",
				"data-placeholder",
				"as-child",
				"as"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), Ye = /* @__PURE__ */ O({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: !1,
			default: ""
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
		let t = e, { forwardRef: n, currentElement: o } = U(), s = Q();
		a(() => {
			s.valueElement = o;
		});
		let c = g(() => {
			let e = [], t = Array.from(s.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, s.by));
			return e = Array.isArray(s.modelValue.value) ? s.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(s.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = g(() => c.value.length ? c.value.join(", ") : t.placeholder);
		return (e, a) => (r(), D(E(L), {
			ref: E(n),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": c.value.length ? void 0 : t.placeholder
		}, {
			default: i(() => [j(e.$slots, "default", {
				selectedLabel: c.value,
				modelValue: E(s).modelValue.value
			}, () => [k(_(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Xe = /* @__PURE__ */ O({
	__name: "SelectViewport",
	props: {
		nonce: {
			type: String,
			required: !1
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
	setup(t) {
		let n = t, { nonce: o } = w(n), s = Ce(o), c = $(), u = c.position === "item-aligned" ? Fe() : void 0, { forwardRef: d, currentElement: f } = U();
		a(() => {
			c?.onViewportChange(f.value);
		});
		let m = x(0);
		function h(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = u ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(m.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			m.value = t.scrollTop;
		}
		return (t, a) => (r(), p(S, null, [l(E(L), e({
			ref: E(d),
			"data-reka-select-viewport": "",
			role: "presentation"
		}, {
			...t.$attrs,
			...n
		}, {
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			},
			onScroll: h
		}), {
			default: i(() => [j(t.$slots, "default")]),
			_: 3
		}, 16), l(E(L), {
			as: "style",
			nonce: E(s)
		}, {
			default: i(() => a[0] ||= [k(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Ze = /* @__PURE__ */ O({
	__name: "AppSelect",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {},
		describedBy: {},
		ariaLabel: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: a }) {
		let s = t, u = a;
		function d(e) {
			u("update:modelValue", e);
		}
		let f = o(te, void 0), m = g(() => f ? { to: f } : {}), v = g(() => K({
			id: s.id,
			"aria-describedby": s.describedBy,
			"aria-label": s.ariaLabel
		})), y = g(() => K({ modelValue: s.modelValue }));
		return (a, o) => (r(), D(E(ke), e(y.value, {
			disabled: t.disabled,
			"onUpdate:modelValue": d
		}), {
			default: i(() => [l(E(Je), e(v.value, { class: ["tc-interactive", E(F).selectTrigger] }), {
				default: i(() => [l(E(Ye), {
					class: h(E(F).selectValue),
					placeholder: t.placeholder
				}, null, 8, ["class", "placeholder"]), l(E(Ve), { "as-child": "" }, {
					default: i(() => [l(T, {
						icon: E(N),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), l(E(qe), C(n(m.value)), {
				default: i(() => [l(E(Be), {
					class: h(E(F).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: i(() => [l(E(Xe), { class: h(E(F).selectViewport) }, {
						default: i(() => [(r(!0), p(S, null, c(t.options, (e) => (r(), D(E(We), {
							key: e.value,
							class: h(E(F).selectItem),
							value: e.value
						}, {
							default: i(() => [l(E(Ke), null, {
								default: i(() => [k(_(e.label), 1)]),
								_: 2
							}, 1024), l(E(Ge), { class: h(E(F).selectItemIndicator) }, {
								default: i(() => [l(T, {
									icon: E(M),
									size: 14
								}, null, 8, ["icon"])]),
								_: 1
							}, 8, ["class"])]),
							_: 2
						}, 1032, ["class", "value"]))), 128))]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 16, ["disabled"]));
	}
});
//#endregion
export { be as a, xe as i, Se as n, J as r, Ze as t };

//# sourceMappingURL=AppSelect-YiC8A59f.js.map