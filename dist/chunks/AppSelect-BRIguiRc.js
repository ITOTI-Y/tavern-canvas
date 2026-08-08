import { $ as e, A as t, B as n, C as r, D as i, F as a, I as o, L as s, N as c, O as l, T as u, U as d, V as f, _ as p, c as m, d as h, dt as g, ft as _, g as v, h as y, it as b, j as x, lt as S, m as C, p as w, st as T, u as E, ut as D, v as O, x as k, y as A } from "./vue-i18n-CmRk7RjK.js";
import { t as j } from "./check-CFtAyris.js";
import { t as M } from "./chevron-down-CvI5L1EB.js";
import { r as N } from "./StateSurface-BqMfI2cI.js";
import { t as P } from "./AppIcon-B4b88cvE.js";
import { t as ee } from "./portal_keys-gQ1cWdMS.js";
import { A as te, _ as F, c as I, d as ne, g as re, i as L, j as R, k as z, n as ie, o as ae, p as oe, s as B, t as V } from "./Teleport-abGLK5Wv.js";
import { a as se, i as ce, o as le, t as ue } from "./FocusScope-DrI3mUpj.js";
import { a as de, c as fe, i as pe, n as me, o as he, s as H } from "./PopperContent-CWEcCerf.js";
import { n as ge, t as U } from "./useTypeahead-Cjsk7LCT.js";
import { t as W, u as _e } from "./_prop_utils-DuwFuJLL.js";
import { o as G, t as K } from "./Collection-DSmIzJYn.js";
import { t as ve } from "./VisuallyHidden-CukVafpV.js";
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
var Se = /* @__PURE__ */ k({
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
		return (e, n) => (c(), y(T(V), D(r(t)), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function Ce(t) {
	let n = ne({ nonce: e() });
	return w(() => t?.value || n.nonce?.value);
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
var De = ["value"], [Q, Oe] = /*#__PURE__*/ R("SelectRoot"), ke = /* @__PURE__ */ k({
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
		let r = t, s = n, { required: l, disabled: u, multiple: f, dir: m } = b(r), h = F(r, "modelValue", s, {
			defaultValue: r.defaultValue ?? (f.value ? [] : void 0),
			passive: r.modelValue === void 0,
			deep: !0
		}), g = F(r, "open", s, {
			defaultValue: r.defaultOpen,
			passive: r.open === void 0
		}), _ = e(), x = e(), S = e({
			x: 0,
			y: 0
		}), C = w(() => f.value && Array.isArray(h.value) ? h.value?.length === 0 : z(h.value));
		K({ isProvider: !0 });
		let D = fe(m), O = _e(_), k = e(/* @__PURE__ */ new Set()), A = w(() => Array.from(k.value).map((e) => e.value).join(";"));
		function j(e) {
			if (f.value) {
				let t = Array.isArray(h.value) ? [...h.value] : [], n = t.findIndex((t) => Z(t, e, r.by));
				n === -1 ? t.push(e) : t.splice(n, 1), h.value = [...t];
			} else h.value = e;
		}
		function M(e) {
			return Array.from(k.value).find((t) => X(e, t.value, r.by));
		}
		return Oe({
			triggerElement: _,
			onTriggerChange: (e) => {
				_.value = e;
			},
			valueElement: x,
			onValueElementChange: (e) => {
				x.value = e;
			},
			contentId: "",
			modelValue: h,
			onValueChange: j,
			by: r.by,
			open: g,
			multiple: f,
			required: l,
			onOpenChange: (e) => {
				g.value = e;
			},
			dir: D,
			triggerPointerDownPosRef: S,
			disabled: u,
			isEmptyModelValue: C,
			optionsSet: k,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && k.value.delete(t), k.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && k.value.delete(t);
			}
		}), (e, t) => (c(), y(T(de), null, {
			default: d(() => [o(e.$slots, "default", {
				modelValue: T(h),
				open: T(g)
			}), T(O) && e.name ? (c(), y(Ae, {
				key: A.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: T(f),
				required: T(l),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: T(u),
				value: T(h)
			}, {
				default: d(() => [T(z)(T(h)) ? (c(), p("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, De)) : v("v-if", !0), (c(!0), p(E, null, a(Array.from(k.value), (e) => (c(), p("option", i({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : v("v-if", !0)]),
			_: 3
		}));
	}
}), Ae = /* @__PURE__ */ k({
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
		let r = t, a = e(), s = Q();
		n(() => r.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && r && a.value) {
				let t = new Event("change", { bubbles: !0 });
				r.call(a.value, e), a.value.dispatchEvent(t);
			}
		});
		function l(e) {
			s.onValueChange(e.target.value);
		}
		return (e, t) => (c(), y(T(ve), { "as-child": "" }, {
			default: d(() => [C("select", i({
				ref_key: "selectElement",
				ref: a
			}, r, { onInput: l }), [o(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), je = /* @__PURE__ */ k({
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
	setup(e) {
		let t = H(e);
		return (e, n) => (c(), y(T(me), i(T(t), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Me = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, Ne] = /*#__PURE__*/ R("SelectContent"), Pe = /* @__PURE__ */ k({
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
	setup(t, { emit: r }) {
		let a = t, l = r, u = Q();
		ge(), se(a.bodyLock);
		let { CollectionSlot: p, getItems: h } = K(), g = e();
		ce(g);
		let { search: _, handleTypeaheadSearch: v } = U(), b = e(), x = e(), S = e(), C = e(!1), E = e(!1), D = e(!1);
		function O() {
			x.value && g.value && G([x.value, g.value]);
		}
		n(C, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: j } = u;
		f((e) => {
			if (!g.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (j.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (j.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : g.value?.contains(e.target) || k(!1), document.removeEventListener("pointermove", n), j.value = null);
			};
			j.value !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", r, {
				capture: !0,
				once: !0
			})), e(() => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", r, { capture: !0 });
			});
		});
		function M(e) {
			let t = e.ctrlKey || e.altKey || e.metaKey;
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && v(e.key, h()), [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) {
				let t = [...h().map((e) => e.ref)];
				if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
					let n = e.target, r = t.indexOf(n);
					t = t.slice(r + 1);
				}
				setTimeout(() => G(t)), e.preventDefault();
			}
		}
		let N = w(() => a.position === "popper" ? a : {}), P = H(N.value);
		return Ne({
			content: g,
			viewport: b,
			onViewportChange: (e) => {
				b.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !E.value && !n, i = X(u.modelValue.value, t, u.by);
				if (u.multiple.value) {
					if (D.value) return;
					(i || r) && (x.value = e, i && (D.value = !0));
				} else (i || r) && (x.value = e);
				r && (E.value = !0);
			},
			selectedItem: x,
			selectedItemText: S,
			onItemLeave: () => {
				g.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !E.value && !n;
				(X(u.modelValue.value, t, u.by) || r) && (S.value = e);
			},
			focusSelectedItem: O,
			position: a.position,
			isPositioned: C,
			searchRef: _
		}), (e, t) => (c(), y(T(p), null, {
			default: d(() => [A(T(ue), {
				"as-child": "",
				onMountAutoFocus: t[6] ||= m(() => {}, ["prevent"]),
				onUnmountAutoFocus: t[7] ||= (e) => {
					l("closeAutoFocus", e), !e.defaultPrevented && (T(u).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: d(() => [A(T(ie), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: t[2] ||= m(() => {}, ["prevent"]),
					onDismiss: t[3] ||= (e) => T(u).onOpenChange(!1),
					onEscapeKeyDown: t[4] ||= (e) => l("escapeKeyDown", e),
					onPointerDownOutside: t[5] ||= (e) => l("pointerDownOutside", e)
				}, {
					default: d(() => [(c(), y(s(e.position === "popper" ? je : Le), i({
						...e.$attrs,
						...T(P)
					}, {
						id: T(u).contentId,
						ref: (e) => {
							if (!e) return;
							let t = T(oe)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? g.value = t.firstElementChild : g.value = t;
						},
						role: "listbox",
						"data-state": T(u).open.value ? "open" : "closed",
						dir: T(u).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: t[0] ||= m(() => {}, ["prevent"]),
						onPlaced: t[1] ||= (e) => C.value = !0,
						onKeydown: M
					}), {
						default: d(() => [o(e.$slots, "default")]),
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
}), [Fe, Ie] = /*#__PURE__*/ R("SelectItemAlignedPosition"), Le = /* @__PURE__ */ k({
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
	setup(n, { emit: r }) {
		let a = n, s = r, { getItems: u } = K(), f = Q(), m = $(), h = e(!1), _ = e(!0), v = e(), { forwardRef: y, currentElement: b } = I(), { viewport: x, selectedItem: S, selectedItemText: C, focusSelectedItem: w } = m;
		function E() {
			if (f.triggerElement.value && f.valueElement.value && v.value && b.value && x?.value && S?.value && C?.value) {
				let e = f.triggerElement.value.getBoundingClientRect(), t = b.value.getBoundingClientRect(), n = f.valueElement.value.getBoundingClientRect(), r = C.value.getBoundingClientRect();
				if (f.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = J(a, 10, Math.max(10, l - c));
					v.value.style.minWidth = `${s}px`, v.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = J(a, 10, Math.max(10, l - c));
					v.value.style.minWidth = `${s}px`, v.value.style.right = `${u}px`;
				}
				let i = u().map((e) => e.ref), a = window.innerHeight - 20, o = x.value.scrollHeight, c = window.getComputedStyle(b.value), l = Number.parseInt(c.borderTopWidth, 10), d = Number.parseInt(c.paddingTop, 10), p = Number.parseInt(c.borderBottomWidth, 10), m = Number.parseInt(c.paddingBottom, 10), g = l + d + o + m + p, _ = Math.min(S.value.offsetHeight * 5, g), y = window.getComputedStyle(x.value), w = Number.parseInt(y.paddingTop, 10), T = Number.parseInt(y.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = a - E, O = S.value.offsetHeight / 2, k = S.value.offsetTop + O, A = l + d + k, j = g - A;
				if (A <= E) {
					let e = S.value === i.at(-1);
					v.value.style.bottom = "0px";
					let t = b.value.clientHeight - x.value.offsetTop - x.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + p);
					v.value.style.height = `${n}px`;
				} else {
					let e = S.value === i[0];
					v.value.style.top = "0px";
					let t = Math.max(E, l + x.value.offsetTop + (e ? w : 0) + O) + j;
					v.value.style.height = `${t}px`, x.value.scrollTop = A - E + x.value.offsetTop;
				}
				v.value.style.margin = "10px 0", v.value.style.minHeight = `${_}px`, v.value.style.maxHeight = `${a}px`, s("placed"), requestAnimationFrame(() => h.value = !0);
			}
		}
		let D = e("");
		t(async () => {
			await l(), E(), b.value && (D.value = window.getComputedStyle(b.value).zIndex);
		});
		function O(e) {
			e && _.value === !0 && (E(), w?.(), _.value = !1);
		}
		return re(f.triggerElement, () => {
			E();
		}), Ie({
			contentWrapper: v,
			shouldExpandOnScrollRef: h,
			onScrollButtonChange: O
		}), (e, t) => (c(), p("div", {
			ref_key: "contentWrapperElement",
			ref: v,
			style: g({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [A(T(L), i({
			ref: T(y),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...a
		}), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Re = /* @__PURE__ */ k({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return Oe(e.context), Ne(Me), (e, t) => o(e.$slots, "default");
	}
}), ze = { key: 1 }, Be = /* @__PURE__ */ k({
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
	setup(i, { emit: a }) {
		let s = i, l = he(s, a), u = Q(), f = e();
		t(() => {
			f.value = new DocumentFragment();
		});
		let m = e(), g = w(() => s.forceMount || u.open.value), _ = e(g.value), b;
		function S() {
			b &&= (clearTimeout(b), void 0);
		}
		return n(g, (e, t, n) => {
			S(), b = setTimeout(() => {
				_.value = g.value, b = void 0;
			}), n(S);
		}), x(S), (e, t) => g.value || _.value || m.value?.present ? (c(), y(T(ae), {
			key: 0,
			ref_key: "presenceRef",
			ref: m,
			present: g.value
		}, {
			default: d(() => [A(Pe, D(r({
				...T(l),
				...e.$attrs
			})), {
				default: d(() => [o(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : f.value ? (c(), p("div", ze, [(c(), y(h, { to: f.value }, [A(Re, { context: T(u) }, {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : v("v-if", !0);
	}
}), Ve = /* @__PURE__ */ k({
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
		return (e, t) => (c(), y(T(L), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: d(() => [o(e.$slots, "default", {}, () => [t[0] ||= O("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [He, Ue] = /*#__PURE__*/ R("SelectItem"), We = /* @__PURE__ */ k({
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
	setup(n, { emit: r }) {
		let i = n, a = r, { disabled: s } = b(i), u = Q(), f = $(), { forwardRef: p, currentElement: h } = I(), { CollectionItem: g } = K(), _ = w(() => X(u.modelValue?.value, i.value, u.by)), v = e(!1), x = e(i.textValue ?? ""), S = B(void 0, "reka-select-item-text");
		async function C(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: i.value
			};
			te("select.select", E, t);
		}
		async function E(e) {
			await l(), a("select", e), !e.defaultPrevented && (s.value || (u.onValueChange(i.value), u.multiple.value || u.onOpenChange(!1)));
		}
		async function D(e) {
			await l(), !e.defaultPrevented && (s.value ? f.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await l(), !e.defaultPrevented && e.currentTarget === le() && f.onItemLeave?.();
		}
		async function k(e) {
			await l(), !e.defaultPrevented && (f.searchRef?.value === "" || e.key !== " ") && (Te.includes(e.key) && C(e), e.key === " " && e.preventDefault());
		}
		if (i.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return t(() => {
			h.value && f.itemRefCallback(h.value, i.value, i.disabled);
		}), Ue({
			value: i.value,
			disabled: s,
			textId: S,
			isSelected: _,
			onItemTextChange: (e) => {
				x.value = ((x.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (c(), y(T(g), { value: { textValue: x.value } }, {
			default: d(() => [A(T(L), {
				ref: T(p),
				role: "option",
				"aria-labelledby": T(S),
				"data-highlighted": v.value ? "" : void 0,
				"aria-selected": _.value,
				"data-state": _.value ? "checked" : "unchecked",
				"aria-disabled": T(s) || void 0,
				"data-disabled": T(s) ? "" : void 0,
				tabindex: T(s) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => v.value = !0,
				onBlur: t[1] ||= (e) => v.value = !1,
				onPointerup: C,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= m(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: d(() => [o(e.$slots, "default")]),
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
}), Ge = /* @__PURE__ */ k({
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
	setup(e) {
		let t = e, n = He();
		return (e, r) => T(n).isSelected.value ? (c(), y(T(L), i({
			key: 0,
			"aria-hidden": "true"
		}, t), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16)) : v("v-if", !0);
	}
}), Ke = /* @__PURE__ */ k({
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
	setup(e) {
		let n = e, r = Q(), a = $(), s = He(), { forwardRef: l, currentElement: u } = I(), f = w(() => ({
			value: s.value,
			disabled: s.disabled.value,
			textContent: u.value?.textContent ?? s.value?.toString() ?? ""
		}));
		return t(() => {
			u.value && (s.onItemTextChange(u.value), a.itemTextRefCallback(u.value, s.value, s.disabled.value), r.onOptionAdd(f.value));
		}), x(() => {
			r.onOptionRemove(f.value);
		}), (e, t) => (c(), y(T(L), i({
			id: T(s).textId,
			ref: T(l)
		}, {
			...n,
			...e.$attrs
		}), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), qe = /* @__PURE__ */ k({
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
		return (e, n) => (c(), y(T(V), D(r(t)), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Je = /* @__PURE__ */ k({
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
		let n = e, r = Q(), { forwardRef: i, currentElement: a } = I(), s = w(() => r.disabled?.value || n.disabled);
		r.contentId ||= B(void 0, "reka-select-content"), t(() => {
			r.onTriggerChange(a.value);
		});
		let { getItems: l } = K(), { search: u, handleTypeaheadSearch: f, resetTypeahead: p } = U();
		function h() {
			s.value || (r.onOpenChange(!0), p());
		}
		function g(e) {
			h(), r.triggerPointerDownPosRef.value = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY)
			};
		}
		function _(e) {
			return e.button === 0 && e.ctrlKey === !1;
		}
		let v = !1;
		function b(e) {
			if (e.pointerType === "touch") return e.preventDefault();
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), _(e) && (g(e), v = !0);
		}
		function x(e) {
			_(e) && e.preventDefault();
		}
		function S(e) {
			v || e.currentTarget?.focus(), v = !1;
		}
		return (e, t) => (c(), y(T(pe), {
			"as-child": "",
			reference: e.reference
		}, {
			default: d(() => [A(T(L), {
				ref: T(i),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": T(r).contentId,
				"aria-expanded": T(r).open.value || !1,
				"aria-required": T(r).required?.value,
				"aria-autocomplete": "none",
				disabled: s.value,
				dir: T(r)?.dir.value,
				"data-state": T(r)?.open.value ? "open" : "closed",
				"data-disabled": s.value ? "" : void 0,
				"data-placeholder": T(Ee)(T(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: S,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: t[0] ||= m((e) => {
					e.pointerType === "touch" && g(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = T(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (T(f)(e.key, T(l)()), T(we).includes(e.key) && (h(), e.preventDefault()));
				}
			}, {
				default: d(() => [o(e.$slots, "default")]),
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
}), Ye = /* @__PURE__ */ k({
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
		let n = e, { forwardRef: r, currentElement: i } = I(), a = Q();
		t(() => {
			a.valueElement = i;
		});
		let s = w(() => {
			let e = [], t = Array.from(a.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, a.by));
			return e = Array.isArray(a.modelValue.value) ? a.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(a.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = w(() => s.value.length ? s.value.join(", ") : n.placeholder);
		return (e, t) => (c(), y(T(L), {
			ref: T(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": s.value.length ? void 0 : n.placeholder
		}, {
			default: d(() => [o(e.$slots, "default", {
				selectedLabel: s.value,
				modelValue: T(a).modelValue.value
			}, () => [O(_(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), Xe = /* @__PURE__ */ k({
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
	setup(n) {
		let r = n, { nonce: a } = b(r), s = Ce(a), l = $(), u = l.position === "item-aligned" ? Fe() : void 0, { forwardRef: f, currentElement: m } = I();
		t(() => {
			l?.onViewportChange(m.value);
		});
		let h = e(0);
		function g(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = u ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(h.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			h.value = t.scrollTop;
		}
		return (e, t) => (c(), p(E, null, [A(T(L), i({
			ref: T(f),
			"data-reka-select-viewport": "",
			role: "presentation"
		}, {
			...e.$attrs,
			...r
		}, {
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto"
			},
			onScroll: g
		}), {
			default: d(() => [o(e.$slots, "default")]),
			_: 3
		}, 16), A(T(L), {
			as: "style",
			nonce: T(s)
		}, {
			default: d(() => t[0] ||= [O(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), Ze = /* @__PURE__ */ k({
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
	setup(e, { emit: t }) {
		let n = e, o = t;
		function s(e) {
			o("update:modelValue", e);
		}
		let l = u(ee, void 0), f = w(() => l ? { to: l } : {}), m = w(() => W({
			id: n.id,
			"aria-describedby": n.describedBy,
			"aria-label": n.ariaLabel
		})), h = w(() => W({ modelValue: n.modelValue }));
		return (t, n) => (c(), y(T(ke), i(h.value, {
			disabled: e.disabled,
			"onUpdate:modelValue": s
		}), {
			default: d(() => [A(T(Je), i(m.value, { class: ["tc-interactive", T(N).selectTrigger] }), {
				default: d(() => [A(T(Ye), {
					class: S(T(N).selectValue),
					placeholder: e.placeholder
				}, null, 8, ["class", "placeholder"]), A(T(Ve), { "as-child": "" }, {
					default: d(() => [A(P, {
						icon: T(M),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), A(T(qe), D(r(f.value)), {
				default: d(() => [A(T(Be), {
					class: S(T(N).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: d(() => [A(T(Xe), { class: S(T(N).selectViewport) }, {
						default: d(() => [(c(!0), p(E, null, a(e.options, (e) => (c(), y(T(We), {
							key: e.value,
							class: S(T(N).selectItem),
							value: e.value
						}, {
							default: d(() => [A(T(Ke), null, {
								default: d(() => [O(_(e.label), 1)]),
								_: 2
							}, 1024), A(T(Ge), { class: S(T(N).selectItemIndicator) }, {
								default: d(() => [A(P, {
									icon: T(j),
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
