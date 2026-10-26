import { A as e, C as t, D as n, F as r, H as i, I as a, L as o, N as s, O as c, T as l, V as u, W as d, _ as f, at as p, c as m, ct as h, d as g, dt as _, et as v, ft as y, g as b, h as x, j as S, m as C, p as w, pt as T, u as E, ut as D, v as O, x as k, y as A } from "./vue-i18n-DUz2Gjn8.js";
import { t as j } from "./AppIcon-Cnhzrx9o.js";
import { t as M } from "./check-BhrVRbkS.js";
import { t as ee } from "./chevron-down-Tu_8qTxg.js";
import { r as N } from "./StateSurface-Bo_sA18G.js";
import { t as te } from "./portal_keys-gQ1cWdMS.js";
import { A as ne, _ as re, c as P, d as ie, g as ae, i as F, j as I, k as L, n as oe, o as se, p as ce, s as R, t as z, w as le, x as ue } from "./Teleport-C7mDSUEl.js";
import { a as de, i as fe, o as B, t as pe } from "./FocusScope-B2vRGnoX.js";
import { a as me, c as he, i as ge, o as _e, r as ve, s as V, t as ye } from "./PopperContent-a3U-C0mc.js";
import { c as H, p as be, r as U, t as W } from "./_prop_utils-BsJwfjAZ.js";
//#region ../../node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function G(e) {
	return typeof e == "string" ? `'${e}'` : new xe().serialize(e);
}
var xe = /*@__PURE__*/ function() {
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
function K(e, t) {
	return e === t || G(e) === G(t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
function q(e, t = -Infinity, n = Infinity) {
	return Math.min(n, Math.max(t, e));
}
function J(e, t) {
	let n = e, r = t.toString(), i = r.indexOf("."), a = i >= 0 ? r.length - i : 0;
	if (a > 0) {
		let e = 10 ** a;
		n = Math.round(n * e) / e;
	}
	return n;
}
function Se(e, t, n, r) {
	t = Number(t), n = Number(n);
	let i = (e - (Number.isNaN(t) ? 0 : t)) % r, a = J(Math.abs(i) * 2 >= r ? e + Math.sign(i) * (r - Math.abs(i)) : e - i, r);
	return Number.isNaN(t) ? !Number.isNaN(n) && a > n && (a = Math.floor(J(n / r, r)) * r) : a < t ? a = t : !Number.isNaN(n) && a > n && (a = t + Math.floor(J((n - t) / r, r)) * r), a = J(a, r), a;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var Y = 0;
function Ce() {
	i((e) => {
		if (!ue) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? we()), document.body.insertAdjacentElement("beforeend", t[1] ?? we()), Y++, e(() => {
			Y === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), Y--;
		});
	});
}
function we() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function Te(e) {
	let t = le("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = B(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = De(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function Ee(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function De(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Ee(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var Oe = /* @__PURE__ */ k({
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
		return (e, r) => (s(), x(h(z), _(t(n)), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function ke(e) {
	let t = ie({ nonce: v() });
	return w(() => e?.value || t.nonce?.value);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var Ae = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], je = [" ", "Enter"];
function X(e, t, n) {
	return e === void 0 ? !1 : Array.isArray(e) ? e.some((e) => Z(e, t, n)) : Z(e, t, n);
}
function Z(e, t, n) {
	return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : K(e, t);
}
function Me(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var Ne = ["value"], [Q, Pe] = /*#__PURE__*/ I("SelectRoot"), Fe = /* @__PURE__ */ k({
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
		let i = e, o = t, { required: c, disabled: l, multiple: u, dir: m } = p(i), g = re(i, "modelValue", o, {
			defaultValue: i.defaultValue ?? (u.value ? [] : void 0),
			passive: i.modelValue === void 0,
			deep: !0
		}), _ = re(i, "open", o, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		}), y = v(), S = v(), C = v({
			x: 0,
			y: 0
		}), T = w(() => u.value && Array.isArray(g.value) ? g.value?.length === 0 : L(g.value));
		U({ isProvider: !0 });
		let D = he(m), O = be(y), k = v(/* @__PURE__ */ new Set()), A = w(() => Array.from(k.value).map((e) => e.value).join(";"));
		function j(e) {
			if (u.value) {
				let t = Array.isArray(g.value) ? [...g.value] : [], n = t.findIndex((t) => Z(t, e, i.by));
				n === -1 ? t.push(e) : t.splice(n, 1), g.value = [...t];
			} else g.value = e;
		}
		function M(e) {
			return Array.from(k.value).find((t) => X(e, t.value, i.by));
		}
		return Pe({
			triggerElement: y,
			onTriggerChange: (e) => {
				y.value = e;
			},
			valueElement: S,
			onValueElementChange: (e) => {
				S.value = e;
			},
			contentId: "",
			modelValue: g,
			onValueChange: j,
			by: i.by,
			open: _,
			multiple: u,
			required: c,
			onOpenChange: (e) => {
				_.value = e;
			},
			dir: D,
			triggerPointerDownPosRef: C,
			disabled: l,
			isEmptyModelValue: T,
			optionsSet: k,
			onOptionAdd: (e) => {
				let t = M(e.value);
				t && k.value.delete(t), k.value.add(e);
			},
			onOptionRemove: (e) => {
				let t = M(e.value);
				t && k.value.delete(t);
			}
		}), (e, t) => (s(), x(h(ge), null, {
			default: d(() => [a(e.$slots, "default", {
				modelValue: h(g),
				open: h(_)
			}), h(O) && e.name ? (s(), x(Ie, {
				key: A.value,
				"aria-hidden": "true",
				tabindex: "-1",
				multiple: h(u),
				required: h(c),
				name: e.name,
				autocomplete: e.autocomplete,
				disabled: h(l),
				value: h(g)
			}, {
				default: d(() => [h(L)(h(g)) ? (s(), f("option", {
					key: 0,
					value: e.nullableValue
				}, null, 8, Ne)) : b("v-if", !0), (s(!0), f(E, null, r(Array.from(k.value), (e) => (s(), f("option", n({ key: e.value ?? "" }, { ref_for: !0 }, e), null, 16))), 128))]),
				_: 1
			}, 8, [
				"multiple",
				"required",
				"name",
				"autocomplete",
				"disabled",
				"value"
			])) : b("v-if", !0)]),
			_: 3
		}));
	}
}), Ie = /* @__PURE__ */ k({
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
		let t = e, r = v(), i = Q();
		u(() => t.value, (e, t) => {
			let n = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(n, "value").set;
			if (e !== t && i && r.value) {
				let t = new Event("change", { bubbles: !0 });
				i.call(r.value, e), r.value.dispatchEvent(t);
			}
		});
		function o(e) {
			i.onValueChange(e.target.value);
		}
		return (e, i) => (s(), x(h(me), { "as-child": "" }, {
			default: d(() => [C("select", n({
				ref_key: "selectElement",
				ref: r
			}, t, { onInput: o }), [a(e.$slots, "default")], 16)]),
			_: 3
		}));
	}
}), Le = /* @__PURE__ */ k({
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
		return (e, r) => (s(), x(h(ye), n(h(t), { style: {
			boxSizing: "border-box",
			"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-select-content-available-width": "var(--reka-popper-available-width)",
			"--reka-select-content-available-height": "var(--reka-popper-available-height)",
			"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
		} }), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Re = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
}, [$, ze] = /*#__PURE__*/ I("SelectContent"), Be = /* @__PURE__ */ k({
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
		let r = e, c = t, l = Q();
		Ce(), de(r.bodyLock);
		let { CollectionSlot: f, getItems: p } = U(), g = v();
		fe(g);
		let { search: _, handleTypeaheadSearch: y } = Te(), b = v(), S = v(), C = v(), T = v(!1), E = v(!1), D = v(!1);
		function O() {
			S.value && g.value && H([S.value, g.value]);
		}
		u(T, () => {
			O();
		});
		let { onOpenChange: k, triggerPointerDownPosRef: j } = l;
		i((e) => {
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
			if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && y(e.key, p()), [
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
		let ee = w(() => r.position === "popper" ? r : {}), N = V(ee.value);
		return ze({
			content: g,
			viewport: b,
			onViewportChange: (e) => {
				b.value = e;
			},
			itemRefCallback: (e, t, n) => {
				let r = !E.value && !n, i = X(l.modelValue.value, t, l.by);
				if (l.multiple.value) {
					if (D.value) return;
					(i || r) && (S.value = e, i && (D.value = !0));
				} else (i || r) && (S.value = e);
				r && (E.value = !0);
			},
			selectedItem: S,
			selectedItemText: C,
			onItemLeave: () => {
				g.value?.focus();
			},
			itemTextRefCallback: (e, t, n) => {
				let r = !E.value && !n;
				(X(l.modelValue.value, t, l.by) || r) && (C.value = e);
			},
			focusSelectedItem: O,
			position: r.position,
			isPositioned: T,
			searchRef: _
		}), (e, t) => (s(), x(h(f), null, {
			default: d(() => [A(h(pe), {
				"as-child": "",
				onMountAutoFocus: t[6] ||= m(() => {}, ["prevent"]),
				onUnmountAutoFocus: t[7] ||= (e) => {
					c("closeAutoFocus", e), !e.defaultPrevented && (h(l).triggerElement.value?.focus({ preventScroll: !0 }), e.preventDefault());
				}
			}, {
				default: d(() => [A(h(oe), {
					"as-child": "",
					"disable-outside-pointer-events": e.disableOutsidePointerEvents,
					onFocusOutside: t[2] ||= m(() => {}, ["prevent"]),
					onDismiss: t[3] ||= (e) => h(l).onOpenChange(!1),
					onEscapeKeyDown: t[4] ||= (e) => c("escapeKeyDown", e),
					onPointerDownOutside: t[5] ||= (e) => c("pointerDownOutside", e)
				}, {
					default: d(() => [(s(), x(o(e.position === "popper" ? Le : Ue), n({
						...e.$attrs,
						...h(N)
					}, {
						id: h(l).contentId,
						ref: (e) => {
							if (!e) return;
							let t = h(ce)(e);
							t?.hasAttribute("data-reka-popper-content-wrapper") ? g.value = t.firstElementChild : g.value = t;
						},
						role: "listbox",
						"data-state": h(l).open.value ? "open" : "closed",
						dir: h(l).dir.value,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none"
						},
						onContextmenu: t[0] ||= m(() => {}, ["prevent"]),
						onPlaced: t[1] ||= (e) => T.value = !0,
						onKeydown: M
					}), {
						default: d(() => [a(e.$slots, "default")]),
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
}), [Ve, He] = /*#__PURE__*/ I("SelectItemAlignedPosition"), Ue = /* @__PURE__ */ k({
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
		let i = t, o = r, { getItems: l } = U(), u = Q(), p = $(), m = v(!1), g = v(!0), _ = v(), { forwardRef: b, currentElement: x } = P(), { viewport: S, selectedItem: C, selectedItemText: w, focusSelectedItem: T } = p;
		function E() {
			if (u.triggerElement.value && u.valueElement.value && _.value && x.value && S?.value && C?.value && w?.value) {
				let e = u.triggerElement.value.getBoundingClientRect(), t = x.value.getBoundingClientRect(), n = u.valueElement.value.getBoundingClientRect(), r = w.value.getBoundingClientRect();
				if (u.dir.value !== "rtl") {
					let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = q(a, 10, Math.max(10, l - c));
					_.value.style.minWidth = `${s}px`, _.value.style.left = `${u}px`;
				} else {
					let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), l = window.innerWidth - 10, u = q(a, 10, Math.max(10, l - c));
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
		let D = v("");
		e(async () => {
			await c(), E(), x.value && (D.value = window.getComputedStyle(x.value).zIndex);
		});
		function O(e) {
			e && g.value === !0 && (E(), T?.(), g.value = !1);
		}
		return ae(u.triggerElement, () => {
			E();
		}), He({
			contentWrapper: _,
			shouldExpandOnScrollRef: m,
			onScrollButtonChange: O
		}), (e, t) => (s(), f("div", {
			ref_key: "contentWrapperElement",
			ref: _,
			style: y({
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: D.value
			})
		}, [A(h(F), n({
			ref: h(b),
			style: {
				boxSizing: "border-box",
				maxHeight: "100%"
			}
		}, {
			...e.$attrs,
			...i
		}), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)], 4));
	}
}), We = /* @__PURE__ */ k({
	inheritAttrs: !1,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return Pe(e.context), ze(Re), (e, t) => a(e.$slots, "default");
	}
}), Ge = { key: 1 }, Ke = /* @__PURE__ */ k({
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
		let i = n, o = _e(i, r), c = Q(), l = v();
		e(() => {
			l.value = new DocumentFragment();
		});
		let p = v(), m = w(() => i.forceMount || c.open.value), y = v(m.value), C;
		function T() {
			C &&= (clearTimeout(C), void 0);
		}
		return u(m, (e, t, n) => {
			T(), C = setTimeout(() => {
				y.value = m.value, C = void 0;
			}), n(T);
		}), S(T), (e, n) => m.value || y.value || p.value?.present ? (s(), x(h(se), {
			key: 0,
			ref_key: "presenceRef",
			ref: p,
			present: m.value
		}, {
			default: d(() => [A(Be, _(t({
				...h(o),
				...e.$attrs
			})), {
				default: d(() => [a(e.$slots, "default")]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["present"])) : l.value ? (s(), f("div", Ge, [(s(), x(g, { to: l.value }, [A(We, { context: h(c) }, {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 8, ["context"])], 8, ["to"]))])) : b("v-if", !0);
	}
}), qe = /* @__PURE__ */ k({
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
		return (e, t) => (s(), x(h(F), {
			"aria-hidden": "true",
			as: e.as,
			"as-child": e.asChild
		}, {
			default: d(() => [a(e.$slots, "default", {}, () => [t[0] ||= O("▼")])]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), [Je, Ye] = /*#__PURE__*/ I("SelectItem"), Xe = /* @__PURE__ */ k({
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
		let r = t, i = n, { disabled: o } = p(r), l = Q(), u = $(), { forwardRef: f, currentElement: g } = P(), { CollectionItem: _ } = U(), y = w(() => X(l.modelValue?.value, r.value, l.by)), b = v(!1), S = v(r.textValue ?? ""), C = R(void 0, "reka-select-item-text");
		async function T(e) {
			if (e.defaultPrevented) return;
			let t = {
				originalEvent: e,
				value: r.value
			};
			ne("select.select", E, t);
		}
		async function E(e) {
			await c(), i("select", e), !e.defaultPrevented && (o.value || (l.onValueChange(r.value), l.multiple.value || l.onOpenChange(!1)));
		}
		async function D(e) {
			await c(), !e.defaultPrevented && (o.value ? u.onItemLeave?.() : e.currentTarget?.focus({ preventScroll: !0 }));
		}
		async function O(e) {
			await c(), !e.defaultPrevented && e.currentTarget === B() && u.onItemLeave?.();
		}
		async function k(e) {
			await c(), !e.defaultPrevented && (u.searchRef?.value === "" || e.key !== " ") && (je.includes(e.key) && T(e), e.key === " " && e.preventDefault());
		}
		if (r.value === "") throw Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		return e(() => {
			g.value && u.itemRefCallback(g.value, r.value, r.disabled);
		}), Ye({
			value: r.value,
			disabled: o,
			textId: C,
			isSelected: y,
			onItemTextChange: (e) => {
				S.value = ((S.value || e?.textContent) ?? "").trim();
			}
		}), (e, t) => (s(), x(h(_), { value: { textValue: S.value } }, {
			default: d(() => [A(h(F), {
				ref: h(f),
				role: "option",
				"aria-labelledby": h(C),
				"data-highlighted": b.value ? "" : void 0,
				"aria-selected": y.value,
				"data-state": y.value ? "checked" : "unchecked",
				"aria-disabled": h(o) || void 0,
				"data-disabled": h(o) ? "" : void 0,
				tabindex: h(o) ? void 0 : -1,
				as: e.as,
				"as-child": e.asChild,
				onFocus: t[0] ||= (e) => b.value = !0,
				onBlur: t[1] ||= (e) => b.value = !1,
				onPointerup: T,
				onPointerdown: t[2] ||= (e) => {
					e.currentTarget.focus({ preventScroll: !0 });
				},
				onTouchend: t[3] ||= m(() => {}, ["prevent", "stop"]),
				onPointermove: D,
				onPointerleave: O,
				onKeydown: k
			}, {
				default: d(() => [a(e.$slots, "default")]),
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
}), Ze = /* @__PURE__ */ k({
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
		let t = e, r = Je();
		return (e, i) => h(r).isSelected.value ? (s(), x(h(F), n({
			key: 0,
			"aria-hidden": "true"
		}, t), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16)) : b("v-if", !0);
	}
}), Qe = /* @__PURE__ */ k({
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
		let r = t, i = Q(), o = $(), c = Je(), { forwardRef: l, currentElement: u } = P(), f = w(() => ({
			value: c.value,
			disabled: c.disabled.value,
			textContent: u.value?.textContent ?? c.value?.toString() ?? ""
		}));
		return e(() => {
			u.value && (c.onItemTextChange(u.value), o.itemTextRefCallback(u.value, c.value, c.disabled.value), i.onOptionAdd(f.value));
		}), S(() => {
			i.onOptionRemove(f.value);
		}), (e, t) => (s(), x(h(F), n({
			id: h(c).textId,
			ref: h(l)
		}, {
			...r,
			...e.$attrs
		}), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), $e = /* @__PURE__ */ k({
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
		return (e, r) => (s(), x(h(z), _(t(n)), {
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), et = /* @__PURE__ */ k({
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
		let n = t, r = Q(), { forwardRef: i, currentElement: o } = P(), c = w(() => r.disabled?.value || n.disabled);
		r.contentId ||= R(void 0, "reka-select-content"), e(() => {
			r.onTriggerChange(o.value);
		});
		let { getItems: l } = U(), { search: u, handleTypeaheadSearch: f, resetTypeahead: p } = Te();
		function g() {
			c.value || (r.onOpenChange(!0), p());
		}
		function _(e) {
			g(), r.triggerPointerDownPosRef.value = {
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
		function S(e) {
			v(e) && e.preventDefault();
		}
		function C(e) {
			y || e.currentTarget?.focus(), y = !1;
		}
		return (e, t) => (s(), x(h(ve), {
			"as-child": "",
			reference: e.reference
		}, {
			default: d(() => [A(h(F), {
				ref: h(i),
				role: "combobox",
				type: e.as === "button" ? "button" : void 0,
				"aria-controls": h(r).contentId,
				"aria-expanded": h(r).open.value || !1,
				"aria-required": h(r).required?.value,
				"aria-autocomplete": "none",
				disabled: c.value,
				dir: h(r)?.dir.value,
				"data-state": h(r)?.open.value ? "open" : "closed",
				"data-disabled": c.value ? "" : void 0,
				"data-placeholder": h(Me)(h(r).modelValue?.value) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				onClick: C,
				onPointerdown: b,
				onMousedown: S,
				onPointerup: t[0] ||= m((e) => {
					e.pointerType === "touch" && _(e);
				}, ["prevent"]),
				onKeydown: t[1] ||= (e) => {
					let t = h(u) !== "";
					!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && t && e.key === " " || (h(f)(e.key, h(l)()), h(Ae).includes(e.key) && (g(), e.preventDefault()));
				}
			}, {
				default: d(() => [a(e.$slots, "default")]),
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
}), tt = /* @__PURE__ */ k({
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
		let n = t, { forwardRef: r, currentElement: i } = P(), o = Q();
		e(() => {
			o.valueElement = i;
		});
		let c = w(() => {
			let e = [], t = Array.from(o.optionsSet.value), n = (e) => t.find((t) => X(e, t.value, o.by));
			return e = Array.isArray(o.modelValue.value) ? o.modelValue.value.map((e) => n(e)?.textContent ?? "") : [n(o.modelValue.value)?.textContent ?? ""], e.filter(Boolean);
		}), l = w(() => c.value.length ? c.value.join(", ") : n.placeholder);
		return (e, t) => (s(), x(h(F), {
			ref: h(r),
			as: e.as,
			"as-child": e.asChild,
			style: { pointerEvents: "none" },
			"data-placeholder": c.value.length ? void 0 : n.placeholder
		}, {
			default: d(() => [a(e.$slots, "default", {
				selectedLabel: c.value,
				modelValue: h(o).modelValue.value
			}, () => [O(T(l.value), 1)])]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"data-placeholder"
		]));
	}
}), nt = /* @__PURE__ */ k({
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
		let r = t, { nonce: i } = p(r), o = ke(i), c = $(), l = c.position === "item-aligned" ? Ve() : void 0, { forwardRef: u, currentElement: m } = P();
		e(() => {
			c?.onViewportChange(m.value);
		});
		let g = v(0);
		function _(e) {
			let t = e.currentTarget, { shouldExpandOnScrollRef: n, contentWrapper: r } = l ?? {};
			if (n?.value && r?.value) {
				let e = Math.abs(g.value - t.scrollTop);
				if (e > 0) {
					let n = window.innerHeight - 20, i = Number.parseFloat(r.value.style.minHeight), a = Number.parseFloat(r.value.style.height), o = Math.max(i, a);
					if (o < n) {
						let i = o + e, a = Math.min(n, i), s = i - a;
						r.value.style.height = `${a}px`, r.value.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, r.value.style.justifyContent = "flex-end");
					}
				}
			}
			g.value = t.scrollTop;
		}
		return (e, t) => (s(), f(E, null, [A(h(F), n({
			ref: h(u),
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
			default: d(() => [a(e.$slots, "default")]),
			_: 3
		}, 16), A(h(F), {
			as: "style",
			nonce: h(o)
		}, {
			default: d(() => t[0] ||= [O(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")]),
			_: 1,
			__: [0]
		}, 8, ["nonce"])], 64));
	}
}), rt = /* @__PURE__ */ k({
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
		let u = l(te, void 0), p = w(() => u ? { to: u } : {}), m = w(() => W({
			id: a.id,
			"aria-describedby": a.describedBy,
			"aria-label": a.ariaLabel
		})), g = w(() => W({ modelValue: a.modelValue }));
		return (i, a) => (s(), x(h(Fe), n(g.value, {
			disabled: e.disabled,
			"onUpdate:modelValue": c
		}), {
			default: d(() => [A(h(et), n(m.value, { class: ["tc-interactive", h(N).selectTrigger] }), {
				default: d(() => [A(h(tt), {
					class: D(h(N).selectValue),
					placeholder: e.placeholder
				}, null, 8, ["class", "placeholder"]), A(h(qe), { "as-child": "" }, {
					default: d(() => [A(j, {
						icon: h(ee),
						size: 16
					}, null, 8, ["icon"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["class"]), A(h($e), _(t(p.value)), {
				default: d(() => [A(h(Ke), {
					class: D(h(N).selectContent),
					"side-offset": 4,
					position: "popper"
				}, {
					default: d(() => [A(h(nt), { class: D(h(N).selectViewport) }, {
						default: d(() => [(s(!0), f(E, null, r(e.options, (e) => (s(), x(h(Xe), {
							key: e.value,
							class: D(h(N).selectItem),
							value: e.value
						}, {
							default: d(() => [A(h(Qe), { class: D(h(N).selectItemText) }, {
								default: d(() => [O(T(e.label), 1)]),
								_: 2
							}, 1032, ["class"]), A(h(Ze), { class: D(h(N).selectItemIndicator) }, {
								default: d(() => [A(j, {
									icon: h(M),
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
export { K as a, Se as i, Oe as n, q as r, rt as t };
