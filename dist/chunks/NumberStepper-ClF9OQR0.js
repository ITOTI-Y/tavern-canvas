import { $ as e, A as t, B as n, C as r, D as i, I as a, N as o, O as s, T as c, U as l, c as u, ft as d, g as f, h as p, it as m, lt as h, m as g, p as _, st as v, ut as y, v as b, x, y as S } from "./vue-i18n-CmRk7RjK.js";
import { t as ee } from "./createLucideIcon-DAbI7E00.js";
import { r as C } from "./StateSurface-BqMfI2cI.js";
import { n as w } from "./FieldGroup-FjrngN50.js";
import { t as T } from "./x-Cb9a7voE.js";
import { t as E } from "./AppIcon-B4b88cvE.js";
import { t as D } from "./portal_keys-gQ1cWdMS.js";
import { i as te, n as O, r as ne } from "./AppSelect-BRIguiRc.js";
import { C as k, _ as re, d as A, i as j, j as M, k as N, m as P, p as F, v as ie, x as I } from "./Teleport-abGLK5Wv.js";
import { o as L } from "./FocusScope-DrI3mUpj.js";
import { a as R, c as z, i as B, l as V, o as H, r as ae, s as U, t as W, u as oe } from "./_prop_utils-DuwFuJLL.js";
import { u as G } from "./Collection-DSmIzJYn.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var K = ee("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function se(t) {
	let n = e(!1);
	function r() {
		n.value = !0;
	}
	function i(e) {
		s(() => {
			n.value = !1, t?.(e);
		});
	}
	return {
		isComposing: n,
		handleCompositionStart: r,
		handleCompositionEnd: i
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
function le(t) {
	let n = A({ locale: e("en") });
	return _(() => t?.value || n.locale?.value || "en");
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
function we(t) {
	let { disabled: n } = t, r = e(), i = ie(), a = () => window.clearTimeout(r.value), o = (e) => {
		a(), !n.value && (i.trigger(), r.value = window.setTimeout(() => {
			o(60);
		}, e));
	}, s = () => {
		o(400);
	}, c = () => {
		a();
	}, l = e(!1), u = _(() => F(t.target)), d = (e) => {
		e.button !== 0 || l.value || (e.preventDefault(), l.value = !0, s());
	}, f = () => {
		l.value = !1, c();
	};
	return I && (P(u || window, "pointerdown", d), P(window, "pointerup", f), P(window, "pointercancel", f)), {
		isPressed: l,
		onTrigger: i.on
	};
}
function Te(t, n = e({})) {
	return k(() => new de(t.value, n.value));
}
function Ee(t, n = e({})) {
	return k(() => new ge(t.value, n.value));
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
	setup(t, { emit: n }) {
		let r = t, s = n, { disabled: c, readonly: u, disableWheelChange: d, invertWheelChange: h, min: g, max: y, step: b, stepSnapping: x, formatOptions: S, id: ee, locale: C } = m(r), w = re(r, "modelValue", s, {
			defaultValue: r.defaultValue,
			passive: r.modelValue === void 0
		}), { primitiveElement: T, currentElement: E } = G(), D = le(C), O = oe(E), k = e(), A = _(() => N(w.value) || isNaN(w.value) ? !1 : P("decrease", w.value) >= w.value), M = _(() => N(w.value) || isNaN(w.value) ? !1 : P("increase", w.value) <= w.value);
		function P(e, t, n = 1) {
			let r = b.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (x.value && !isNaN(r)) {
				let o = te(t, g.value, y.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return K(a);
		}
		function F(e, t = 1) {
			if (r.focusOnChange && k.value?.focus(), r.disabled || r.readonly) return;
			let n = z.parse(k.value?.value ?? "");
			if (isNaN(n)) {
				w.value = K(g.value ?? 0);
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
			e === "min" && g.value !== void 0 ? w.value = K(g.value) : e === "max" && y.value !== void 0 && (w.value = K(y.value));
		}
		let R = Te(D, S), z = Ee(D, S), B = _(() => R.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), V = Te(D, S), H = _(() => N(w.value) || isNaN(w.value) ? "" : V.format(w.value));
		function U(e) {
			return z.isValidPartialNumber(e, g.value, y.value);
		}
		function W(e) {
			k.value && (k.value.value = e);
		}
		function K(e) {
			let t;
			return t = b.value === void 0 || isNaN(b.value) || !x.value ? ne(e, g.value, y.value) : te(e, g.value, y.value, b.value), t = z.parse(R.format(t)), t;
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
			disabled: c,
			disableWheelChange: d,
			invertWheelChange: h,
			max: y,
			min: g,
			isDecreaseDisabled: A,
			isIncreaseDisabled: M,
			id: ee
		}), (e, t) => (o(), p(v(j), i(e.$attrs, {
			ref_key: "primitiveElement",
			ref: T,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": v(c) ? "" : void 0,
			"data-readonly": v(u) ? "" : void 0
		}), {
			default: l(() => [a(e.$slots, "default", {
				modelValue: v(w),
				textValue: H.value,
				readonly: v(u)
			}), v(O) && e.name ? (o(), p(v(ae), {
				key: 0,
				type: "text",
				value: v(w),
				name: e.name,
				disabled: v(c),
				readonly: v(u),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : f("v-if", !0)]),
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
		let t = e, n = $(), r = _(() => n.disabled?.value || n.readonly.value || t.disabled || n.isDecreaseDisabled.value), { primitiveElement: s, currentElement: c } = G(), { isPressed: d, onTrigger: f } = we({
			target: c,
			disabled: r
		});
		return f(() => {
			n.handleDecrease();
		}), (e, n) => (o(), p(v(j), i(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: v(d) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": v(d) ? "true" : void 0,
			onContextmenu: n[0] ||= u(() => {}, ["prevent"])
		}), {
			default: l(() => [a(e.$slots, "default")]),
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
		let t = e, n = $(), r = _(() => n.disabled?.value || n.readonly.value || t.disabled || n.isIncreaseDisabled.value), { primitiveElement: s, currentElement: c } = G(), { isPressed: d, onTrigger: f } = we({
			target: c,
			disabled: r
		});
		return f(() => {
			n.handleIncrease();
		}), (e, n) => (o(), p(v(j), i(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: v(d) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": v(d) ? "true" : void 0,
			onContextmenu: n[0] ||= u(() => {}, ["prevent"])
		}), {
			default: l(() => [a(e.$slots, "default")]),
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
	setup(r) {
		let s = r, { primitiveElement: c, currentElement: u } = G(), d = $(), f = ce(), { isComposing: m, handleCompositionStart: h, handleCompositionEnd: g } = se();
		function _(e) {
			if (!(m.value || e.isComposing)) switch (e.key) {
				case f.ARROW_UP:
					e.preventDefault(), d.handleIncrease();
					break;
				case f.ARROW_DOWN:
					e.preventDefault(), d.handleDecrease();
					break;
				case f.PAGE_UP:
					e.preventDefault(), d.handleIncrease(10);
					break;
				case f.PAGE_DOWN:
					e.preventDefault(), d.handleDecrease(10);
					break;
				case f.HOME:
					e.preventDefault(), d.handleMinMaxValue("min");
					break;
				case f.END:
					e.preventDefault(), d.handleMinMaxValue("max");
					break;
				case f.ENTER: d.applyInputValue(e.target?.value);
			}
		}
		function y(e) {
			d.disableWheelChange.value || e.target === L() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? d.invertWheelChange.value ? d.handleDecrease() : d.handleIncrease() : e.deltaY < 0 && (d.invertWheelChange.value ? d.handleIncrease() : d.handleDecrease())));
		}
		t(() => {
			d.onInputElement(u.value);
		});
		let b = e(d.textValue.value);
		n(() => d.textValue.value, () => {
			b.value = d.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function x() {
			requestAnimationFrame(() => {
				b.value = d.textValue.value;
			});
		}
		return (e, t) => (o(), p(v(j), i(s, {
			id: v(d).id.value,
			ref_key: "primitiveElement",
			ref: c,
			value: b.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: v(d).inputMode.value,
			disabled: v(d).disabled.value ? "" : void 0,
			"data-disabled": v(d).disabled.value ? "" : void 0,
			readonly: v(d).readonly.value ? "" : void 0,
			"data-readonly": v(d).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": v(d).modelValue.value,
			"aria-valuemin": v(d).min.value,
			"aria-valuemax": v(d).max.value,
			onKeydown: _,
			onWheel: y,
			onBeforeinput: t[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				v(d).validate(n) || e.preventDefault();
			},
			onInput: t[1] ||= (e) => {
				let t = e.target;
				b.value = t.value;
			},
			onChange: x,
			onBlur: t[2] ||= (e) => v(d).applyInputValue(e.target?.value),
			onCompositionstart: v(h),
			onCompositionend: v(g)
		}), {
			default: l(() => [a(e.$slots, "default")]),
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
	setup(e, { emit: t }) {
		let n = t;
		function i(e) {
			n("update:open", e);
		}
		let s = c(D, void 0), u = _(() => s ? { to: s } : {});
		return (t, n) => (o(), p(v(V), {
			open: e.open,
			"onUpdate:open": i
		}, {
			default: l(() => [S(v(O), y(r(u.value)), {
				default: l(() => [S(v(R), { class: h(v(C).dialogOverlay) }, null, 8, ["class"]), S(v(U), { class: h(v(C).dialogContent) }, {
					default: l(() => [
						g("header", { class: h(v(C).dialogHeader) }, [S(v(B), { class: h(v(C).dialogTitle) }, {
							default: l(() => [b(d(e.title), 1)]),
							_: 1
						}, 8, ["class"]), S(v(z), {
							class: h(["tc-interactive", v(C).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: l(() => [S(E, {
								icon: v(T),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (o(), p(v(H), {
							key: 0,
							class: h(v(C).dialogDescription)
						}, {
							default: l(() => [b(d(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : f("", !0),
						g("div", { class: h(v(C).dialogBody) }, [a(t.$slots, "default")], 2)
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
		min: {},
		max: {},
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {},
		describedBy: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function a(e) {
			r("update:modelValue", e);
		}
		let s = _(() => W({
			id: n.id,
			min: n.min,
			max: n.max
		})), c = _(() => W({
			"aria-label": n.label,
			"aria-describedby": n.describedBy
		}));
		return (t, n) => (o(), p(v(Oe), i(s.value, {
			class: v(C).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": a
		}), {
			default: l(() => [
				S(v(ke), {
					class: h(["tc-interactive", v(C).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: l(() => [S(E, {
						icon: v(K),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				S(v(je), i(c.value, { class: ["tc-tabular-nums", v(C).numberStepperInput] }), null, 16, ["class"]),
				S(v(Ae), {
					class: h(["tc-interactive", v(C).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: l(() => [S(E, {
						icon: v(w),
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
export { Me as n, Ne as t };
