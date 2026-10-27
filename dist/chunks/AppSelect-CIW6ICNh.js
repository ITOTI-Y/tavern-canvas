import { A as e, C as t, D as n, F as r, H as i, I as a, L as o, N as s, O as c, S as l, T as u, V as d, W as f, _ as p, at as m, c as h, ct as g, d as _, dt as v, et as y, ft as b, g as x, h as S, j as C, m as w, ot as T, p as E, pt as D, u as O, ut as k, v as A, x as j, y as M } from "./vue-i18n-DUz2Gjn8.js";
import { t as N } from "./AppIcon-Cnhzrx9o.js";
import { t as ee } from "./check-BhrVRbkS.js";
import { t as te } from "./chevron-down-Tu_8qTxg.js";
import { r as P } from "./StateSurface-Bo_sA18G.js";
import { t as ne } from "./portal_keys-gQ1cWdMS.js";
import { A as re, _ as F, c as I, d as ie, g as ae, i as L, j as R, k as oe, n as se, o as ce, p as le, s as ue, t as de, w as fe, x as pe } from "./Teleport-C7mDSUEl.js";
import { a as me, i as he, o as z, t as ge } from "./FocusScope-B2vRGnoX.js";
import { a as B, c as _e, i as ve, o as ye, r as be, s as V, t as xe } from "./PopperContent-a3U-C0mc.js";
import { l as Se, o as H, t as U } from "./Collection-C3W7ausR.js";
//#region ../../node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function W(e) {
	return typeof e == "string" ? `'${e}'` : new Ce().serialize(e);
}
var Ce = /*@__PURE__*/ function() {
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
function G(e, t) {
	return e === t || W(e) === W(t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
function K(e, t = -Infinity, n = Infinity) {
	return Math.min(n, Math.max(t, e));
}
function q(e, t) {
	let n = e, r = t.toString(), i = r.indexOf("."), a = i >= 0 ? r.length - i : 0;
	if (a > 0) {
		let e = 10 ** a;
		n = Math.round(n * e) / e;
	}
	return n;
}
function we(e, t, n, r) {
	t = Number(t), n = Number(n);
	let i = (e - (Number.isNaN(t) ? 0 : t)) % r, a = q(Math.abs(i) * 2 >= r ? e + Math.sign(i) * (r - Math.abs(i)) : e - i, r);
	return Number.isNaN(t) ? !Number.isNaN(n) && a > n && (a = Math.floor(q(n / r, r)) * r) : a < t ? a = t : !Number.isNaN(n) && a > n && (a = t + Math.floor(q((n - t) / r, r)) * r), a = q(a, r), a;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var J = 0;
function Te() {
	i((e) => {
		if (!pe) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? Ee()), document.body.insertAdjacentElement("beforeend", t[1] ?? Ee()), J++, e(() => {
			J === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), J--;
		});
	});
}
function Ee() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function De(e) {
	return E(() => !T(e) || !!le(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function Oe() {
	let e = l()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function ke(e) {
	let t = fe("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = z(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = je(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function Ae(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function je(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Ae(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var Me = /* @__PURE__ */ j({
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
		let n = e;
		return (e, r) => (s(), S(g(de), v(t(n)), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ne = /* @__PURE__ */ j({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, { primitiveElement: r, currentElement: i } = Se(), a = E(() => t.checked ?? t.value);
		return d(a, (e, t) => {
			if (!i.value) return;
			let n = i.value, r = window.HTMLInputElement.prototype, a = Object.getOwnPropertyDescriptor(r, "value").set;
			if (a && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				a.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, i) => (s(), S(B, n({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...t,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), Pe = /* @__PURE__ */ j({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let t = e, i = E(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), a = E(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
			name: t.name,
			value: t.value
		}] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((e, n) => typeof e == "object" ? Object.entries(e).map(([e, r]) => ({
			name: `${t.name}[${n}][${e}]`,
			value: r
		})) : {
			name: `${t.name}[${n}]`,
			value: e
		}) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([e, n]) => ({
			name: `${t.name}[${e}]`,
			value: n
		})) : []);
		return (e, o) => (s(), p(O, null, [x(" We render single input if it's required "), i.value ? (s(), S(Ne, n({ key: e.name }, {
			...t,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (s(!0), p(O, { key: 1 }, r(a.value, (r) => (s(), S(Ne, n({ key: r.name }, { ref_for: !0 }, {
			...t,
			...e.$attrs
		}, {
			name: r.name,
			value: r.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function Fe(e) {
	let t = ie({ nonce: y() });
	return E(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var Ie = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Le = [" ", "Enter"];
function Y(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => X(e, t, n)) : X(e, t, n);
}
function X(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : G(e, t);
}
function Re(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var ze = ["value"], [Z, Be] = /*#__PURE__*/ R("SelectRoot"), Ve = /* @__PURE__ */ j({
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
	setup(e, { emit: t }) {
		let i = e, o = t, { required: c, disabled: l, multiple: u, dir: d } = m(i), h = F(i, "modelValue", o, {
			defaultValue: i.defaultValue ?? (u.value ? [] : void 0),
			passive: i.modelValue === void 0,
			deep: !0
		}), _ = F(i, "open", o, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		}), v = y(), b = y(), C = y({
			x: 0,
			y: 0
		}), w = E(() => u.value && Array.isArray(h.value) ? h.value?.length === 0 : oe(h.value));
		U({ isProvider: !0 });
		let T = _e(d), D = De(v), k = y(/* @__PURE__ */ new Set()), A = E(() => Array.from(k.value).map((e) => e.value).join(";"));
		function j(e) {
			if (u.value) {
				let t = Array.isArray(h.value) ? [...h.value] : [], n = t.findIndex((t) => X(t, e, i.by));
				n === -1 ? t.push(e) : t.splice(n, 1), h.value = [...t];
			} else h.value = e;
		}
		function M(e) {
			return Array.from(k.value).find((t) => Y(e, t.value, i.by));
		}
		return Be({
			triggerElement: v,
			onTriggerChange: (e) => {
				v.value = e;
			},
			valueElement: b,
			onValueElementChange: (e) => {
				b.value = e;
			},
			contentId: "",
			modelValue: h,
			onValueChange: j,
			by: i.by,
			open: _,
			multiple: u,
			required: c,
			onOpenChange: (e) => {
				_.value = e;
			},
			dir: T,
			triggerPointerDownPosRef: C,
			disabled: l,
			isEmptyModelValue: w,
			optionsSet: k,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && k.value.delete(t), k.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && k.value.delete(t);
			}
		}), (e, t) => (s(), S(g(ve), null, {
			default: f(() => [a(e.$slots, "default", {
				modelValue: g(h),
				open: g(_)
			}), g(D) && e.name ? (s(), S(He, {
				key: A.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: g(u),
				required: g(c),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: g(l),
				value: g(h)
			}, {
				default: f(() => [g(oe)(g(h)) ? (s(), p("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, ze)) : x("v-if", !0), (s(!0), p(O, null, r(Array.from(k.value), (e) => (s(), p("option", n({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : x("v-if", !0)]),
			_: 3
		}));
	}
}), He = /* @__PURE__ */ j({
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
	setup(e) {
		let t = e, r = y(), i = Z();
		d(() => t.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && i && r.value) {
				let t = new Event("change", { bubbles: !0 });
				i.call(r.value, e), r.value.dispatchEvent(t);
			}
		});
		function o(e) {
			i.onValueChange(e.target.value);
		}
		return (e, i) => (s(), S(g(B), { "as-child": "" }, {
			default: f(() => [w("select", n({
				ref_key: "selectElement",
				ref: r
			}, t, { onInput: o }), [a(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), Ue = /* @__PURE__ */ j({
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
		let t = V(e);
		return (e, r) => (s(), S(g(xe), n(g(t), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), We = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [Q, Ge] = /*#__PURE__*/ R("SelectContent"), Ke = /* @__PURE__ */ j({
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
	setup(e, { emit: t }) {
		let r = e, c = t, l = Z();
		Te(), me(r.bodyLock);
		let { CollectionSlot: u, getItems: p } = U(), m = y();
		he(m);
		let { search: _, handleTypeaheadSearch: v } = ke(), b = y(), x = y(), C = y(), w = y(!1), T = y(!1), D = y(!1);
		function O() {
			x.value && m.value && H([x.value, m.value]);
		}
		d(w, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: A } = l;
		i((e) => {
			if (!m.value) return;
			let t = {
				x: 0,
				y: 0
			}, n = (e) => {
				t = {
					x: Math.abs(Math.round(e.pageX) - (A.value?.x ?? 0)),
					y: Math.abs(Math.round(e.pageY) - (A.value?.y ?? 0))
				};
			}, r = (e) => {
				e.pointerType !== "touch" && (t.x <= 10 && t.y <= 10 ? e.preventDefault() : m.value?.contains(e.target) || k(!1), document.removeEventListener("pointermove", n), A.value = null);
			};
			A.value !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", r, {
				capture: !0,
				once: !0
			})), e(() => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", r, { capture: !0 });
			});
		});
		function j(e) {
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
				setTimeout(() => H(t)), e.preventDefault();
			}
		}
		let N = E(() => r.position === "popper" ? r : {}), ee = V(N.value);
		return Ge({
			content: m,
			viewport: b,
			onViewportChange: (e) => {
				b.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !T.value && !n, i = Y(l.modelValue.value, t, l.by);
				if (l.multiple.value) {
					if (D.value) return;
					(i || r) && (x.value = e, i && (D.value = !0));
				} else (i || r) && (x.value = e);
				r && (T.value = !0);
			},
			selectedItem: x,
			selectedItemText: C,
			onItemLeave: () => {
				m.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !T.value && !n;
				(Y(l.modelValue.value, t, l.by) || r) && (C.value = e);
			},
			focusSelectedItem: O,
			position: r.position,
			isPositioned: w,
			searchRef: _
		}), (e, t) => (s(), S(g(u), null, {
			default: f(() => [M(g(ge), {
				"as-child": "",
				onMountAutoFocus: t[6] ||= h(() => {}, ["prevent"]),
				onUnmountAutoFocus: t[7] ||= (e) => {
					c("closeAutoFocus", e), !e.defaultPrevented && (g(l).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: f(() => [M(g(se), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: t[2] ||= h(() => {}, ["prevent"]),
					onDismiss: t[3] ||= (e) => g(l).onOpenChange(!1),
					onEscapeKeyDown: t[4] ||= (e) => c("escapeKeyDown", e),
					onPointerDownOutside: t[5] ||= (e) => c("pointerDownOutside", e)
				}, {
					default: f(() => [(s(), S(o(e.position === "popper" ? Ue : Ye), n({
						...e.$attrs,
						...g(ee)
					}, {
						id: g(l).contentId,
						ref: (e) => {
							if (!e) return;
							let t = g(le)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? m.value = t.firstElementChild : m.value = t;
						},
						role: "listbox",
						"data-state": g(l).open.value ? "open" : "closed",
						dir: g(l).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: t[0] ||= h(() => {}, ["prevent"]),
						onPlaced: t[1] ||= (e) => w.value = !0,
						onKeydown: j
					}), {
						default: f(() => [a(e.$slots, "default")]),
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
}), [qe, Je] = /*#__PURE__*/ R("SelectItemAlignedPosition"), Ye = /* @__PURE__ */ j({
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
	setup(t, { emit: r }) {
		let i = t, o = r, { getItems: l } = U(), u = Z(), d = Q(), m = y(!1), h = y(!0), _ = y(), { forwardRef: v, currentElement: x } = I(), { viewport: S, selectedItem: C, selectedItemText: w, focusSelectedItem: T } = d;
		function E() {
			if (u.triggerElement.value && u.valueElement.value && _.value && x.value && S?.value && C?.value && w?.value) {
				let e = u.triggerElement.value.getBoundingClientRect(), t = x.value.getBoundingClientRect(), n = u.valueElement.value.getBoundingClientRect(), r = w.value.getBoundingClientRect();
				if (u.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = K(a, 10, Math.max(10, l - c));
					_.value.style.minWidth = `${s}px`, _.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = K(a, 10, Math.max(10, l - c));
					_.value.style.minWidth = `${s}px`, _.value.style.right = `${u}px`;
				}
				let i = l().map((e) => e.ref), a = window.innerHeight - 20, s = S.value.scrollHeight, c = window.getComputedStyle(x.value), d = Number.parseInt(c.borderTopWidth, 10), f = Number.parseInt(c.paddingTop, 10), p = Number.parseInt(c.borderBottomWidth, 10), h = Number.parseInt(c.paddingBottom, 10), g = d + f + s + h + p, v = Math.min(C.value.offsetHeight * 5, g), y = window.getComputedStyle(S.value), b = Number.parseInt(y.paddingTop, 10), T = Number.parseInt(y.paddingBottom, 10), E = e.top + e.height / 2 - 10, D = a - E, O = C.value.offsetHeight / 2, k = C.value.offsetTop + O, A = d + f + k, j = g - A;
				if (A <= E) {
					let e = C.value === i.at(-1);
					_.value.style.bottom = "0px";
					let t = x.value.clientHeight - S.value.offsetTop - S.value.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + p);
					_.value.style.height = `${n}px`;
				} else {
					let e = C.value === i[0];
					_.value.style.top = "0px";
					let t = Math.max(E, d + S.value.offsetTop + (e ? b : 0) + O) + j;
					_.value.style.height = `${t}px`, S.value.scrollTop = A - E + S.value.offsetTop;
				}
				_.value.style.margin = "10px 0", _.value.style.minHeight = `${v}px`, _.value.style.maxHeight = `${a}px`, o("placed"), requestAnimationFrame(() => m.value = !0);
			}
		}
		let D = y("");
		e(async () => {
			await c(), E(), x.value && (D.value = window.getComputedStyle(x.value).zIndex);
		});
		function O(e) {
			e && h.value === !0 && (E(), T?.(), h.value = !1);
		}
		return ae(u.triggerElement, () => {
			E();
		}), Je({
			contentWrapper: _,
			shouldExpandOnScrollRef: m,
			onScrollButtonChange: O
		}), (e, t) => (s(), p("div", {
			ref_key: "contentWrapperElement",
			ref: _,
			style: b({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [M(g(L), n({
			ref: g(v),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...i
		}), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), Xe = /* @__PURE__ */ j({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return Be(e.context), Ge(We), (e, t) => a(e.$slots, "default");
	}
}), Ze = { key: 1 }, Qe = /* @__PURE__ */ j({
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
	setup(n, { emit: r }) {
		let i = n, o = ye(i, r), c = Z(), l = y();
		e(() => {
			l.value = new DocumentFragment();
		});
		let u = y(), m = E(() => i.forceMount || c.open.value), h = y(m.value), b;
		function w() {
			b &&= (clearTimeout(b), void 0);
		}
		return d(m, (e, t, n) => {
			w(), b = setTimeout(() => {
				h.value = m.value, b = void 0;
			}), n(w);
		}), C(w), (e, n) => m.value || h.value || u.value?.present ? (s(), S(g(ce), {
			key: 0,
			ref_key: "presenceRef",
			ref: u,
			present: m.value
		}, {
			default: f(() => [M(Ke, v(t({
				...g(o),
				...e.$attrs
			})), {
				default: f(() => [a(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : l.value ? (s(), p("div", Ze, [(s(), S(_, { to: l.value }, [M(Xe, { context: g(c) }, {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : x("v-if", !0);
	}
}), $e = /* @__PURE__ */ j({
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
		return (e, t) => (s(), S(g(L), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: f(() => [a(e.$slots, "default", {}, () => [t[0] ||= A("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [et, tt] = /*#__PURE__*/ R("SelectItem"), nt = /* @__PURE__ */ j({
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
	setup(t, { emit: n }) {
		let r = t, i = n, { disabled: o } = m(r), l = Z(), u = Q(), { forwardRef: d, currentElement: p } = I(), { CollectionItem: _ } = U(), v = E(() => Y(l.modelValue?.value, r.value, l.by)), b = y(!1), x = y(r.textValue ?? ""), C = ue(void 0, "reka-select-item-text");
		async function w(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			re("select.select", T, t);
		}
		async function T(e) {
			await c(), i("select", e), !e.defaultPrevented && (o.value || (l.onValueChange(r.value), l.multiple.value || l.onOpenChange(!1)));
		}
		async function D(e) {
			await c(), !e.defaultPrevented && (o.value ? u.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await c(), !e.defaultPrevented && e.currentTarget === z() && u.onItemLeave?.();
		}
		async function k(e) {
			await c(), !e.defaultPrevented && (u.searchRef?.value === "" || e.key !== " ") && (Le.includes(e.key) && w(e), e.key === " " && e.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return e(() => {
			p.value && u.itemRefCallback(p.value, r.value, r.disabled);
		}), tt({
			value: r.value,
			disabled: o,
			textId: C,
			isSelected: v,
			onItemTextChange: (e) => {
				x.value = ((x.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (s(), S(g(_), { value: { textValue: x.value } }, {
			default: f(() => [M(g(L), {
				ref: g(d),
				role: "option",
				"aria-labelledby": g(C),
				"data-highlighted": b.value ? "" : void 0,
				"aria-selected": v.value,
				"data-state": v.value ? "checked" : "unchecked",
				"aria-disabled": g(o) || void 0,
				"data-disabled": g(o) ? "" : void 0,
				tabindex: g(o) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => b.value = !0,
				onBlur: t[1] ||= (e) => b.value = !1,
				onPointerup: w,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= h(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: f(() => [a(e.$slots, "default")]),
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
}), rt = /* @__PURE__ */ j({
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
		let t = e, r = et();
		return (e, i) => g(r).isSelected.value ? (s(), S(g(L), n({
			key: 0,
			"aria-hidden": "true"
		}, t), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)) : x("v-if", !0);
	}
}), it = /* @__PURE__ */ j({
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
		let r = t, i = Z(), o = Q(), c = et(), { forwardRef: l, currentElement: u } = I(), d = E(() => ({
			value: c.value,
			disabled: c.disabled.value,
			textContent: u.value?.textContent ?? c.value?.toString() ?? ""
		}));
		return e(() => {
			u.value && (c.onItemTextChange(u.value), o.itemTextRefCallback(u.value, c.value, c.disabled.value), i.onOptionAdd(d.value));
		}), C(() => {
			i.onOptionRemove(d.value);
		}), (e, t) => (s(), S(g(L), n({
			id: g(c).textId,
			ref: g(l)
		}, {
			...r,
			...e.$attrs
		}), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), at = /* @__PURE__ */ j({
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
		let n = e;
		return (e, r) => (s(), S(g(de), v(t(n)), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ot = /* @__PURE__ */ j({
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
	setup(t) {
		let n = t, r = Z(), { forwardRef: i, currentElement: o } = I(), c = E(() => r.disabled?.value || n.disabled);
		r.contentId ||= ue(void 0, "reka-select-content"), e(() => {
			r.onTriggerChange(o.value);
		});
		let { getItems: l } = U(), { search: u, handleTypeaheadSearch: d, resetTypeahead: p } = ke();
		function m() {
			c.value || (r.onOpenChange(!0), p());
		}
		function _(e) {
			m(), r.triggerPointerDownPosRef.value = {
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
		function C(e) {
			y || e.currentTarget?.focus(), y = !1;
		}
		return (e, t) => (s(), S(g(be), {
			"as-child": "",
			reference: e.reference
		}, {
			default: f(() => [M(g(L), {
				ref: g(i),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": g(r).contentId,
				"aria-expanded": g(r).open.value || !1,
				"aria-required": g(r).required?.value,
				"aria-autocomplete": "none",
				disabled: c.value,
				dir: g(r)?.dir.value,
				"data-state": g(r)?.open.value ? "open" : "closed",
				"data-disabled": c.value ? "" : void 0,
				"data-placeholder": g(Re)(g(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: C,
				onPointerdown: b,
				onMousedown: x,
				onPointerup: t[0] ||= h((e) => {
					e.pointerType === "touch" && _(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = g(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (g(d)(e.key, g(l)()), g(Ie).includes(e.key) && (m(), e.preventDefault()));
				}
			}, {
				default: f(() => [a(e.$slots, "default")]),
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
}), st = /* @__PURE__ */ j({
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
	setup(t) {
		let n = t, { forwardRef: r, currentElement: i } = I(), o = Z();
		e(() => {
			o.valueElement = i;
		});
		let c = E(() => {
			let e = [], t = Array.from(o.optionsSet.value), n = (e) => t.find((t) => Y(e, t.value, o.by));
			return e = Array.isArray(o.modelValue.value) ? o.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(o.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = E(() => c.value.length ? c.value.join(", ") : n.placeholder);
		return (e, t) => (s(), S(g(L), {
			ref: g(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": c.value.length ? void 0 : n.placeholder
		}, {
			default: f(() => [a(e.$slots, "default", {
				selectedLabel: c.value,
				modelValue: g(o).modelValue.value
			}, () => [A(D(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), ct = /* @__PURE__ */ j({
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
		let r = t, { nonce: i } = m(r), o = Fe(i), c = Q(), l = c.position === "item-aligned" ? qe() : void 0, { forwardRef: u, currentElement: d } = I();
		e(() => {
			c?.onViewportChange(d.value);
		});
		let h = y(0);
		function _(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = l ?? {};
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
		return (e, t) => (s(), p(O, null, [M(g(L), n({
			ref: g(u),
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
			onScroll: _
		}), {
			default: f(() => [a(e.$slots, "default")]),
			_: 3
		}, 16), M(g(L), {
			as: "style",
			nonce: g(o)
		}, {
			default: f(() => t[0] ||= [A(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
});
//#endregion
//#region src/ui/components/_prop_utils.ts
function $(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		r !== void 0 && (t[n] = r);
	}
	return t;
}
//#endregion
//#region src/ui/components/AppSelect.vue
var lt = /* @__PURE__ */ j({
	__name: "AppSelect",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: { default: void 0 },
		describedBy: { default: void 0 },
		ariaLabel: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: i }) {
		let a = e, o = i;
		function c(e) {
			o("update:modelValue", e);
		}
		let l = u(ne, void 0), d = E(() => l ? { to: l } : {}), m = E(() => $({
			id: a.id,
			"aria-describedby": a.describedBy,
			"aria-label": a.ariaLabel
		})), h = E(() => $({ modelValue: a.modelValue }));
		return (i, a) => (s(), S(g(Ve), n(h.value, {
			disabled: e.disabled,
			"onUpdate:modelValue": c
		}), {
			default: f(() => [M(g(ot), n(m.value, { class: ["tc-interactive", g(P).selectTrigger] }), {
				default: f(() => [M(g(st), {
					class: k(g(P).selectValue),
					placeholder: e.placeholder
				}, null, 8, ["class", "placeholder"]), M(g($e), { "as-child": "" }, {
					default: f(() => [M(N, {
						icon: g(te),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), M(g(at), v(t(d.value)), {
				default: f(() => [M(g(Qe), {
					class: k(g(P).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: f(() => [M(g(ct), { class: k(g(P).selectViewport) }, {
						default: f(() => [(s(!0), p(O, null, r(e.options, (e) => (s(), S(g(nt), {
							key: e.value,
							class: k(g(P).selectItem),
							value: e.value
						}, {
							default: f(() => [M(g(it), { class: k(g(P).selectItemText) }, {
								default: f(() => [A(D(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), M(g(rt), { class: k(g(P).selectItemIndicator) }, {
								default: f(() => [M(N, {
									icon: g(ee),
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
export { Oe as a, we as c, Me as i, G as l, $ as n, De as o, Pe as r, K as s, lt as t };
