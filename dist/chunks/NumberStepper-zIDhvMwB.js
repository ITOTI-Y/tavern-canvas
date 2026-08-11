import { A as e, C as t, D as n, I as r, N as i, O as a, T as o, V as s, W as c, at as l, c as u, ct as d, dt as f, et as p, g as m, h, m as g, p as _, pt as v, ut as y, v as b, x, y as S } from "./vue-i18n-DUz2Gjn8.js";
import { n as ee, t as C } from "./AppIcon-Cnhzrx9o.js";
import { r as w } from "./StateSurface-Bo_sA18G.js";
import { n as T } from "./FieldGroup-LDtWeac7.js";
import { t as E } from "./x-CDKrptQJ.js";
import { t as D } from "./portal_keys-gQ1cWdMS.js";
import { i as te, n as O, r as ne } from "./AppSelect-CJ-1Hi5_.js";
import { C as k, _ as re, d as A, i as j, j as M, k as N, m as P, p as F, v as ie, x as I } from "./Teleport-C7mDSUEl.js";
import { o as L } from "./FocusScope-B2vRGnoX.js";
import { a as R, c as z, i as B, l as V, o as H, r as ae, s as U, t as W, u as oe } from "./_prop_utils-DtjJGT5O.js";
import { u as G } from "./Collection-5SRQOk3F.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var K = ee("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function se(e) {
	let t = p(!1);
	function n() {
		t.value = !0;
	}
	function r(n) {
		a(() => {
			t.value = !1, e?.(n);
		});
	}
	return {
		isComposing: t,
		handleCompositionStart: n,
		handleCompositionEnd: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useKbd.js
function ce() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useLocale.js
function le(e) {
	let t = A({ locale: p("en") });
	return _(() => e?.value || t.locale?.value || "en");
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var q = /* @__PURE__ */ new Map(), J = !1;
try {
	J = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var Y = !1;
try {
	Y = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var ue = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } }, de = class {
	constructor(e, t = {}) {
		this.numberFormatter = fe(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		if (t = !J && this.options.signDisplay != null ? pe(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), this.options.style === "unit" && !Y) {
			let { unit: e, unitDisplay: n = "short", locale: r } = this.resolvedOptions();
			if (!e) return t;
			let i = ue[e]?.[n];
			t += i[r] || i.default;
		}
		return t;
	}
	formatToParts(e) {
		return this.numberFormatter.formatToParts(e);
	}
	formatRange(e, t) {
		if (typeof this.numberFormatter.formatRange == "function") return this.numberFormatter.formatRange(e, t);
		if (t < e) throw RangeError("End date must be >= start date");
		return `${this.format(e)} \u{2013} ${this.format(t)}`;
	}
	formatRangeToParts(e, t) {
		if (typeof this.numberFormatter.formatRangeToParts == "function") return this.numberFormatter.formatRangeToParts(e, t);
		if (t < e) throw RangeError("End date must be >= start date");
		let n = this.numberFormatter.formatToParts(e), r = this.numberFormatter.formatToParts(t);
		return [
			...n.map((e) => ({
				...e,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...r.map((e) => ({
				...e,
				source: "endRange"
			}))
		];
	}
	resolvedOptions() {
		let e = this.numberFormatter.resolvedOptions();
		return !J && this.options.signDisplay != null && (e = {
			...e,
			signDisplay: this.options.signDisplay
		}), !Y && this.options.style === "unit" && (e = {
			...e,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		}), e;
	}
};
function fe(e, t = {}) {
	let { numberingSystem: n } = t;
	if (n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`), t.style === "unit" && !Y) {
		let { unit: e, unitDisplay: n = "short" } = t;
		if (!e) throw Error("unit option must be provided with style: \"unit\"");
		if (!ue[e]?.[n]) throw Error(`Unsupported unit ${e} with unitDisplay = ${n}`);
		t = {
			...t,
			style: "decimal"
		};
	}
	let r = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (q.has(r)) return q.get(r);
	let i = new Intl.NumberFormat(e, t);
	return q.set(r, i), i;
}
function pe(e, t, n) {
	if (t === "auto") return e.format(n);
	if (t === "never") return e.format(Math.abs(n));
	{
		let r = !1;
		if (t === "always" ? r = n > 0 || Object.is(n, 0) : t === "exceptZero" && (Object.is(n, -0) || Object.is(n, 0) ? n = Math.abs(n) : r = n > 0), r) {
			let t = e.format(-n), r = e.format(n), i = t.replace(r, "").replace(/\u200e|\u061C/, "");
			return [...i].length !== 1 && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), t.replace(r, "!!!").replace(i, "+").replace("!!!", r);
		}
		return e.format(n);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberParser.mjs
var me = /* @__PURE__ */ RegExp("^.*\\(.*\\).*$"), he = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
], ge = class {
	constructor(e, t = {}) {
		this.locale = e, this.options = t;
	}
	parse(e) {
		return X(this.locale, this.options, e).parse(e);
	}
	isValidPartialNumber(e, t, n) {
		return X(this.locale, this.options, e).isValidPartialNumber(e, t, n);
	}
	getNumberingSystem(e) {
		return X(this.locale, this.options, e).options.numberingSystem;
	}
}, _e = /* @__PURE__ */ new Map();
function X(e, t, n) {
	let r = ve(e, t);
	if (!e.includes("-nu-") && !r.isValidPartialNumber(n)) {
		for (let i of he) if (i !== r.options.numberingSystem) {
			let r = ve(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + i, t);
			if (r.isValidPartialNumber(n)) return r;
		}
	}
	return r;
}
function ve(e, t) {
	let n = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : ""), r = _e.get(n);
	return r || (r = new ye(e, t), _e.set(n, r)), r;
}
var ye = class {
	constructor(e, t = {}) {
		this.locale = e, t.roundingIncrement !== 1 && t.roundingIncrement != null && (t.maximumFractionDigits == null && t.minimumFractionDigits == null ? (t.maximumFractionDigits = 0, t.minimumFractionDigits = 0) : t.maximumFractionDigits == null ? t.maximumFractionDigits = t.minimumFractionDigits : t.minimumFractionDigits ??= t.maximumFractionDigits), this.formatter = new Intl.NumberFormat(e, t), this.options = this.formatter.resolvedOptions(), this.symbols = Se(e, this.formatter, this.options, t), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
	}
	parse(e) {
		let t = this.formatter.resolvedOptions().useGrouping, n = this.sanitize(e);
		if (!t && this.symbols.group && n.includes(this.symbols.group)) return NaN;
		if (this.symbols.group && (n = n.replaceAll(this.symbols.group, "")), this.symbols.decimal && (n = n.replace(this.symbols.decimal, ".")), this.symbols.minusSign && (n = n.replace(this.symbols.minusSign, "-")), n = n.replace(this.symbols.numeral, this.symbols.index), this.options.style === "percent") {
			let e = n.indexOf("-");
			n = n.replace("-", ""), n = n.replace("+", "");
			let t = n.indexOf(".");
			t === -1 && (t = n.length), n = n.replace(".", ""), n = t - 2 == 0 ? `0.${n}` : t - 2 == -1 ? `0.0${n}` : t - 2 == -2 ? "0.00" : `${n.slice(0, t - 2)}.${n.slice(t - 2)}`, e > -1 && (n = `-${n}`);
		}
		let r = n ? +n : NaN;
		if (isNaN(r)) return NaN;
		if (this.options.style === "percent") {
			let e = {
				...this.options,
				style: "decimal",
				minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
				maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
			};
			return new ge(this.locale, e).parse(new de(this.locale, e).format(r));
		}
		return this.options.currencySign === "accounting" && me.test(e) && (r = -1 * r), r;
	}
	sanitize(e) {
		let t = this.formatter.resolvedOptions().useGrouping;
		return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((t) => t.unit === e) ? this.symbols.noNumeralUnits.find((t) => t.unit === e).value.toString() : (e = e.replace(this.symbols.literals, ""), this.symbols.minusSign && (e = e.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (e = Z(e, ",", this.symbols.decimal), e = Z(e, "،", this.symbols.decimal)), this.symbols.group && t && (e = Z(e, ".", this.symbols.group))), this.symbols.group === "’" && e.includes("'") && t && (e = Z(e, "'", this.symbols.group)), this.symbols.group === "'" && e.includes("’") && t && (e = Z(e, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && t && (e = Z(e, " ", this.symbols.group), e = Z(e, /\u00A0/g, this.symbols.group)), e);
	}
	isValidPartialNumber(e, t = -Infinity, n = Infinity) {
		let r = this.formatter.resolvedOptions().useGrouping;
		return e = this.sanitize(e), this.symbols.minusSign && e.startsWith(this.symbols.minusSign) && t < 0 ? e = e.slice(this.symbols.minusSign.length) : this.symbols.plusSign && e.startsWith(this.symbols.plusSign) && n > 0 && (e = e.slice(this.symbols.plusSign.length)), this.symbols.decimal && e.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && r && (e = Z(e, this.symbols.group, "")), e = e.replace(this.symbols.numeral, ""), this.symbols.decimal && (e = e.replace(this.symbols.decimal, "")), e.length === 0);
	}
}, be = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]), xe = [
	0,
	4,
	2,
	1,
	11,
	20,
	3,
	7,
	100,
	21,
	.1,
	1.1
];
function Se(e, t, n, r) {
	let i = new Intl.NumberFormat(e, {
		...n,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: !0
	}), a = i.formatToParts(-10000.111), o = i.formatToParts(10000.111), s = xe.map((e) => i.formatToParts(e)), c = s.map((e, t) => {
		let n = e.find((e) => e.type === "unit");
		return n && !e.some((e) => e.type === "integer" || e.type === "fraction") ? {
			unit: n.value,
			value: xe[t]
		} : null;
	}).filter((e) => !!e), l = a.find((e) => e.type === "minusSign")?.value ?? "-", u = o.find((e) => e.type === "plusSign")?.value;
	!u && (r?.signDisplay === "exceptZero" || r?.signDisplay === "always") && (u = "+");
	let d = new Intl.NumberFormat(e, {
		...n,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((e) => e.type === "decimal")?.value, f = a.find((e) => e.type === "group")?.value, p = a.filter((e) => !be.has(e.type)).map((e) => Ce(e.value)), m = s.flatMap((e) => e.filter((e) => !be.has(e.type)).map((e) => Ce(e.value))), h = [.../* @__PURE__ */ new Set([...p, ...m])].sort((e, t) => t.length - e.length), g = h.length === 0 ? /* @__PURE__ */ RegExp("\\p{White_Space}|\\p{Cf}", "gu") : RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), _ = [...new Intl.NumberFormat(n.locale, { useGrouping: !1 }).format(9876543210)].reverse(), v = new Map(_.map((e, t) => [e, t])), y = RegExp(`[${_.join("")}]`, "g");
	return {
		minusSign: l,
		plusSign: u,
		decimal: d,
		group: f,
		literals: g,
		numeral: y,
		numerals: _,
		index: (e) => String(v.get(e)),
		noNumeralUnits: c
	};
}
function Z(e, t, n) {
	return e.replaceAll ? e.replaceAll(t, n) : e.split(t).join(n);
}
function Ce(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function we(e) {
	let { disabled: t } = e, n = p(), r = ie(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = p(!1), l = _(() => F(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return I && (P(l || window, "pointerdown", u), P(window, "pointerup", d), P(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Te(e, t = p({})) {
	return k(() => new de(e.value, t.value));
}
function Ee(e, t = p({})) {
	return k(() => new ge(e.value, t.value));
}
function Q(e, t, n) {
	let r = e === "+" ? t + n : t - n;
	if (t % 1 != 0 || n % 1 != 0) {
		let i = t.toString().split("."), a = n.toString().split("."), o = i[1] && i[1].length || 0, s = a[1] && a[1].length || 0, c = 10 ** Math.max(o, s);
		t = Math.round(t * c), n = Math.round(n * c), r = e === "+" ? t + n : t - n, r /= c;
	}
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [$, De] = /*#__PURE__*/ M("NumberFieldRoot"), Oe = /* @__PURE__ */ x({
	inheritAttrs: !1,
	__name: "NumberFieldRoot",
	props: {
		defaultValue: {
			type: Number,
			required: !1,
			default: void 0
		},
		modelValue: {
			type: [Number, null],
			required: !1
		},
		min: {
			type: Number,
			required: !1
		},
		max: {
			type: Number,
			required: !1
		},
		step: {
			type: Number,
			required: !1,
			default: 1
		},
		stepSnapping: {
			type: Boolean,
			required: !1,
			default: !0
		},
		focusOnChange: {
			type: Boolean,
			required: !1,
			default: !0
		},
		formatOptions: {
			type: null,
			required: !1
		},
		locale: {
			type: String,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		readonly: {
			type: Boolean,
			required: !1
		},
		disableWheelChange: {
			type: Boolean,
			required: !1
		},
		invertWheelChange: {
			type: Boolean,
			required: !1
		},
		id: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "div"
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
		let a = e, o = t, { disabled: s, readonly: u, disableWheelChange: f, invertWheelChange: g, min: v, max: y, step: b, stepSnapping: x, formatOptions: S, id: ee, locale: C } = l(a), w = re(a, "modelValue", o, {
			defaultValue: a.defaultValue,
			passive: a.modelValue === void 0
		}), { primitiveElement: T, currentElement: E } = G(), D = le(C), O = oe(E), k = p(), A = _(() => N(w.value) || isNaN(w.value) ? !1 : P("decrease", w.value) >= w.value), M = _(() => N(w.value) || isNaN(w.value) ? !1 : P("increase", w.value) <= w.value);
		function P(e, t, n = 1) {
			let r = b.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (x.value && !isNaN(r)) {
				let o = te(t, v.value, y.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return K(a);
		}
		function F(e, t = 1) {
			if (a.focusOnChange && k.value?.focus(), a.disabled || a.readonly) return;
			let n = z.parse(k.value?.value ?? "");
			if (isNaN(n)) {
				w.value = K(v.value ?? 0);
				return;
			}
			w.value = P(e, n, t);
		}
		function ie(e = 1) {
			F("increase", e);
		}
		function I(e = 1) {
			F("decrease", e);
		}
		function L(e) {
			e === "min" && v.value !== void 0 ? w.value = K(v.value) : e === "max" && y.value !== void 0 && (w.value = K(y.value));
		}
		let R = Te(D, S), z = Ee(D, S), B = _(() => R.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), V = Te(D, S), H = _(() => N(w.value) || isNaN(w.value) ? "" : V.format(w.value));
		function U(e) {
			return z.isValidPartialNumber(e, v.value, y.value);
		}
		function W(e) {
			k.value && (k.value.value = e);
		}
		function K(e) {
			let t;
			return t = b.value === void 0 || isNaN(b.value) || !x.value ? ne(e, v.value, y.value) : te(e, v.value, y.value, b.value), t = z.parse(R.format(t)), t;
		}
		function se(e) {
			let t = z.parse(e);
			return w.value = isNaN(t) ? void 0 : K(t), e.length ? W(H.value) : W(e);
		}
		return De({
			modelValue: w,
			handleDecrease: I,
			handleIncrease: ie,
			handleMinMaxValue: L,
			inputMode: B,
			inputEl: k,
			onInputElement: (e) => k.value = e,
			textValue: H,
			readonly: u,
			validate: U,
			applyInputValue: se,
			disabled: s,
			disableWheelChange: f,
			invertWheelChange: g,
			max: y,
			min: v,
			isDecreaseDisabled: A,
			isIncreaseDisabled: M,
			id: ee
		}), (e, t) => (i(), h(d(j), n(e.$attrs, {
			ref_key: "primitiveElement",
			ref: T,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": d(s) ? "" : void 0,
			"data-readonly": d(u) ? "" : void 0
		}), {
			default: c(() => [r(e.$slots, "default", {
				modelValue: d(w),
				textValue: H.value,
				readonly: d(u)
			}), d(O) && e.name ? (i(), h(d(ae), {
				key: 0,
				type: "text",
				value: d(w),
				name: e.name,
				disabled: d(s),
				readonly: d(u),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : m("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), ke = /* @__PURE__ */ x({
	__name: "NumberFieldDecrement",
	props: {
		disabled: {
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
			default: "button"
		}
	},
	setup(e) {
		let t = e, a = $(), o = _(() => a.disabled?.value || a.readonly.value || t.disabled || a.isDecreaseDisabled.value), { primitiveElement: s, currentElement: l } = G(), { isPressed: f, onTrigger: p } = we({
			target: l,
			disabled: o
		});
		return p(() => {
			a.handleDecrease();
		}), (e, a) => (i(), h(d(j), n(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: d(f) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": d(f) ? "true" : void 0,
			onContextmenu: a[0] ||= u(() => {}, ["prevent"])
		}), {
			default: c(() => [r(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Ae = /* @__PURE__ */ x({
	__name: "NumberFieldIncrement",
	props: {
		disabled: {
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
			default: "button"
		}
	},
	setup(e) {
		let t = e, a = $(), o = _(() => a.disabled?.value || a.readonly.value || t.disabled || a.isIncreaseDisabled.value), { primitiveElement: s, currentElement: l } = G(), { isPressed: f, onTrigger: p } = we({
			target: l,
			disabled: o
		});
		return p(() => {
			a.handleIncrease();
		}), (e, a) => (i(), h(d(j), n(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: d(f) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": d(f) ? "true" : void 0,
			onContextmenu: a[0] ||= u(() => {}, ["prevent"])
		}), {
			default: c(() => [r(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), je = /* @__PURE__ */ x({
	__name: "NumberFieldInput",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "input"
		}
	},
	setup(t) {
		let a = t, { primitiveElement: o, currentElement: l } = G(), u = $(), f = ce(), { isComposing: m, handleCompositionStart: g, handleCompositionEnd: _ } = se();
		function v(e) {
			if (!(m.value || e.isComposing)) switch (e.key) {
				case f.ARROW_UP:
					e.preventDefault(), u.handleIncrease();
					break;
				case f.ARROW_DOWN:
					e.preventDefault(), u.handleDecrease();
					break;
				case f.PAGE_UP:
					e.preventDefault(), u.handleIncrease(10);
					break;
				case f.PAGE_DOWN:
					e.preventDefault(), u.handleDecrease(10);
					break;
				case f.HOME:
					e.preventDefault(), u.handleMinMaxValue("min");
					break;
				case f.END:
					e.preventDefault(), u.handleMinMaxValue("max");
					break;
				case f.ENTER: u.applyInputValue(e.target?.value);
			}
		}
		function y(e) {
			u.disableWheelChange.value || e.target === L() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? u.invertWheelChange.value ? u.handleDecrease() : u.handleIncrease() : e.deltaY < 0 && (u.invertWheelChange.value ? u.handleIncrease() : u.handleDecrease())));
		}
		e(() => {
			u.onInputElement(l.value);
		});
		let b = p(u.textValue.value);
		s(() => u.textValue.value, () => {
			b.value = u.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function x() {
			requestAnimationFrame(() => {
				b.value = u.textValue.value;
			});
		}
		return (e, t) => (i(), h(d(j), n(a, {
			id: d(u).id.value,
			ref_key: "primitiveElement",
			ref: o,
			value: b.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: d(u).inputMode.value,
			disabled: d(u).disabled.value ? "" : void 0,
			"data-disabled": d(u).disabled.value ? "" : void 0,
			readonly: d(u).readonly.value ? "" : void 0,
			"data-readonly": d(u).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": d(u).modelValue.value,
			"aria-valuemin": d(u).min.value,
			"aria-valuemax": d(u).max.value,
			onKeydown: v,
			onWheel: y,
			onBeforeinput: t[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				d(u).validate(n) || e.preventDefault();
			},
			onInput: t[1] ||= (e) => {
				let t = e.target;
				b.value = t.value;
			},
			onChange: x,
			onBlur: t[2] ||= (e) => d(u).applyInputValue(e.target?.value),
			onCompositionstart: d(g),
			onCompositionend: d(_)
		}), {
			default: c(() => [r(e.$slots, "default")]),
			_: 3
		}, 16, [
			"id",
			"value",
			"inputmode",
			"disabled",
			"data-disabled",
			"readonly",
			"data-readonly",
			"aria-valuenow",
			"aria-valuemin",
			"aria-valuemax",
			"onCompositionstart",
			"onCompositionend"
		]));
	}
}), Me = /* @__PURE__ */ x({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(e, { emit: n }) {
		let a = n;
		function s(e) {
			a("update:open", e);
		}
		let l = o(D, void 0), u = _(() => l ? { to: l } : {});
		return (n, a) => (i(), h(d(V), {
			open: e.open,
			"onUpdate:open": s
		}, {
			default: c(() => [S(d(O), f(t(u.value)), {
				default: c(() => [S(d(R), { class: y(d(w).dialogOverlay) }, null, 8, ["class"]), S(d(U), { class: y(d(w).dialogContent) }, {
					default: c(() => [
						g("header", { class: y(d(w).dialogHeader) }, [S(d(B), { class: y(d(w).dialogTitle) }, {
							default: c(() => [b(v(e.title), 1)]),
							_: 1
						}, 8, ["class"]), S(d(z), {
							class: y(["tc-interactive", d(w).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: c(() => [S(C, {
								icon: d(E),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (i(), h(d(H), {
							key: 0,
							class: y(d(w).dialogDescription)
						}, {
							default: c(() => [b(v(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : m("", !0),
						g("div", { class: y(d(w).dialogBody) }, [r(n.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
}), Ne = /* @__PURE__ */ x({
	__name: "NumberStepper",
	props: {
		modelValue: {},
		label: {},
		incrementLabel: {},
		decrementLabel: {},
		min: { default: void 0 },
		max: { default: void 0 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: { default: void 0 },
		describedBy: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let r = e, a = t;
		function o(e) {
			a("update:modelValue", e);
		}
		let s = _(() => W({
			id: r.id,
			min: r.min,
			max: r.max
		})), l = _(() => W({
			"aria-label": r.label,
			"aria-describedby": r.describedBy
		}));
		return (t, r) => (i(), h(d(Oe), n(s.value, {
			class: d(w).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": o
		}), {
			default: c(() => [
				S(d(ke), {
					class: y(["tc-interactive", d(w).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: c(() => [S(C, {
						icon: d(K),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				S(d(je), n(l.value, { class: ["tc-tabular-nums", d(w).numberStepperInput] }), null, 16, ["class"]),
				S(d(Ae), {
					class: y(["tc-interactive", d(w).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: c(() => [S(C, {
						icon: d(T),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"])
			]),
			_: 1
		}, 16, [
			"class",
			"model-value",
			"step",
			"disabled"
		]));
	}
});
//#endregion
export { Me as n, K as r, Ne as t };
