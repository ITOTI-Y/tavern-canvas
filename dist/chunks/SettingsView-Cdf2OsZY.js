import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { a as t } from "./ids-stC4fUL8.js";
import { i as n, o as r } from "./novelai-Dh4UVw5r.js";
import { i, t as a } from "./novelai_models-CXz0Nwhv.js";
import { n as o, t as s } from "./novelai_defaults-BD3ZB_Lo.js";
import { A as c, D as l, F as u, G as d, I as f, N as p, O as m, V as h, W as g, _, a as v, at as y, b, c as x, ct as S, et as C, g as w, h as T, m as E, n as D, p as O, pt as k, s as A, u as j, ut as M, v as N, x as P, y as F } from "./vue-i18n-DUz2Gjn8.js";
import { n as ee, t as I } from "./AppIcon-Cnhzrx9o.js";
import { _ as L, a as R, b as z, g as B, h as V, i as H, n as U, o as W, r as G, t as K, x as te, y as ne } from "./AppSelect-CRHyq1ex.js";
import { a as q, i as J, n as re, o as ie, r as ae, t as oe } from "./PromptTagChips-DuVZRo9M.js";
import { n as se, t as Y } from "./FieldGroup-5lMIUNw6.js";
import { n as ce } from "./deferred_stylesheets-BpS7LWkd.js";
import "./browser_secret_vault-CnTo7PwU.js";
import { n as le, t as ue } from "./novelai_request_defaults-B0sJ9ANr.js";
import { A as de, C as fe, M as pe, _ as me, c as he, d as ge, i as _e, j as ve, m as ye, p as be, v as xe, x as Se } from "./Teleport-CZ6NJvBB.js";
import { o as Ce } from "./FocusScope-DyrFWv3K.js";
import { c as we } from "./PopperContent-8IQaFABb.js";
import { n as Te, t as Ee } from "./ConfirmDialog-CcAJItG1.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var De = ee("cable", [
	["path", {
		d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z",
		key: "trhst0"
	}],
	["path", {
		d: "M17 21v-2",
		key: "ds4u3f"
	}],
	["path", {
		d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10",
		key: "1mo9zo"
	}],
	["path", {
		d: "M21 21v-2",
		key: "eo0ou"
	}],
	["path", {
		d: "M3 5V3",
		key: "1k5hjh"
	}],
	["path", {
		d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z",
		key: "1dd30t"
	}],
	["path", {
		d: "M7 5V3",
		key: "1t1388"
	}]
]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function Oe(e) {
	let t = C(!1);
	function n() {
		t.value = !0;
	}
	function r(n) {
		m(() => {
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
function ke() {
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
function Ae(e) {
	let t = ge({ locale: C("en") });
	return O(() => e?.value || t.locale?.value || "en");
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var je = /* @__PURE__ */ new Map(), Me = !1;
try {
	Me = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var Ne = !1;
try {
	Ne = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var Pe = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } }, Fe = class {
	constructor(e, t = {}) {
		this.numberFormatter = Ie(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		if (t = !Me && this.options.signDisplay != null ? Le(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), this.options.style === "unit" && !Ne) {
			let { unit: e, unitDisplay: n = "short", locale: r } = this.resolvedOptions();
			if (!e) return t;
			let i = Pe[e]?.[n];
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
		return !Me && this.options.signDisplay != null && (e = {
			...e,
			signDisplay: this.options.signDisplay
		}), !Ne && this.options.style === "unit" && (e = {
			...e,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		}), e;
	}
};
function Ie(e, t = {}) {
	let { numberingSystem: n } = t;
	if (n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`), t.style === "unit" && !Ne) {
		let { unit: e, unitDisplay: n = "short" } = t;
		if (!e) throw Error("unit option must be provided with style: \"unit\"");
		if (!Pe[e]?.[n]) throw Error(`Unsupported unit ${e} with unitDisplay = ${n}`);
		t = {
			...t,
			style: "decimal"
		};
	}
	let r = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (je.has(r)) return je.get(r);
	let i = new Intl.NumberFormat(e, t);
	return je.set(r, i), i;
}
function Le(e, t, n) {
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
var Re = /* @__PURE__ */ RegExp("^.*\\(.*\\).*$"), ze = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
], Be = class {
	constructor(e, t = {}) {
		this.locale = e, this.options = t;
	}
	parse(e) {
		return He(this.locale, this.options, e).parse(e);
	}
	isValidPartialNumber(e, t, n) {
		return He(this.locale, this.options, e).isValidPartialNumber(e, t, n);
	}
	getNumberingSystem(e) {
		return He(this.locale, this.options, e).options.numberingSystem;
	}
}, Ve = /* @__PURE__ */ new Map();
function He(e, t, n) {
	let r = Ue(e, t);
	if (!e.includes("-nu-") && !r.isValidPartialNumber(n)) {
		for (let i of ze) if (i !== r.options.numberingSystem) {
			let r = Ue(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + i, t);
			if (r.isValidPartialNumber(n)) return r;
		}
	}
	return r;
}
function Ue(e, t) {
	let n = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : ""), r = Ve.get(n);
	return r || (r = new We(e, t), Ve.set(n, r)), r;
}
var We = class {
	constructor(e, t = {}) {
		this.locale = e, t.roundingIncrement !== 1 && t.roundingIncrement != null && (t.maximumFractionDigits == null && t.minimumFractionDigits == null ? (t.maximumFractionDigits = 0, t.minimumFractionDigits = 0) : t.maximumFractionDigits == null ? t.maximumFractionDigits = t.minimumFractionDigits : t.minimumFractionDigits ??= t.maximumFractionDigits), this.formatter = new Intl.NumberFormat(e, t), this.options = this.formatter.resolvedOptions(), this.symbols = qe(e, this.formatter, this.options, t), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
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
			return new Be(this.locale, e).parse(new Fe(this.locale, e).format(r));
		}
		return this.options.currencySign === "accounting" && Re.test(e) && (r = -1 * r), r;
	}
	sanitize(e) {
		let t = this.formatter.resolvedOptions().useGrouping;
		return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((t) => t.unit === e) ? this.symbols.noNumeralUnits.find((t) => t.unit === e).value.toString() : (e = e.replace(this.symbols.literals, ""), this.symbols.minusSign && (e = e.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (e = X(e, ",", this.symbols.decimal), e = X(e, "،", this.symbols.decimal)), this.symbols.group && t && (e = X(e, ".", this.symbols.group))), this.symbols.group === "’" && e.includes("'") && t && (e = X(e, "'", this.symbols.group)), this.symbols.group === "'" && e.includes("’") && t && (e = X(e, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && t && (e = X(e, " ", this.symbols.group), e = X(e, /\u00A0/g, this.symbols.group)), e);
	}
	isValidPartialNumber(e, t = -Infinity, n = Infinity) {
		let r = this.formatter.resolvedOptions().useGrouping;
		return e = this.sanitize(e), this.symbols.minusSign && e.startsWith(this.symbols.minusSign) && t < 0 ? e = e.slice(this.symbols.minusSign.length) : this.symbols.plusSign && e.startsWith(this.symbols.plusSign) && n > 0 && (e = e.slice(this.symbols.plusSign.length)), this.symbols.decimal && e.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && r && (e = X(e, this.symbols.group, "")), e = e.replace(this.symbols.numeral, ""), this.symbols.decimal && (e = e.replace(this.symbols.decimal, "")), e.length === 0);
	}
}, Ge = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]), Ke = [
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
function qe(e, t, n, r) {
	let i = new Intl.NumberFormat(e, {
		...n,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: !0
	}), a = i.formatToParts(-10000.111), o = i.formatToParts(10000.111), s = Ke.map((e) => i.formatToParts(e)), c = s.map((e, t) => {
		let n = e.find((e) => e.type === "unit");
		return n && !e.some((e) => e.type === "integer" || e.type === "fraction") ? {
			unit: n.value,
			value: Ke[t]
		} : null;
	}).filter((e) => !!e), l = a.find((e) => e.type === "minusSign")?.value ?? "-", u = o.find((e) => e.type === "plusSign")?.value;
	!u && (r?.signDisplay === "exceptZero" || r?.signDisplay === "always") && (u = "+");
	let d = new Intl.NumberFormat(e, {
		...n,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((e) => e.type === "decimal")?.value, f = a.find((e) => e.type === "group")?.value, p = a.filter((e) => !Ge.has(e.type)).map((e) => Je(e.value)), m = s.flatMap((e) => e.filter((e) => !Ge.has(e.type)).map((e) => Je(e.value))), h = [.../* @__PURE__ */ new Set([...p, ...m])].sort((e, t) => t.length - e.length), g = h.length === 0 ? /* @__PURE__ */ RegExp("\\p{White_Space}|\\p{Cf}", "gu") : RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), _ = [...new Intl.NumberFormat(n.locale, { useGrouping: !1 }).format(9876543210)].reverse(), v = new Map(_.map((e, t) => [e, t])), y = RegExp(`[${_.join("")}]`, "g");
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
function X(e, t, n) {
	return e.replaceAll ? e.replaceAll(t, n) : e.split(t).join(n);
}
function Je(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function Ye(e) {
	let { disabled: t } = e, n = C(), r = xe(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = C(!1), l = O(() => be(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return Se && (ye(l || window, "pointerdown", u), ye(window, "pointerup", d), ye(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Xe(e, t = C({})) {
	return fe(() => new Fe(e.value, t.value));
}
function Ze(e, t = C({})) {
	return fe(() => new Be(e.value, t.value));
}
function Qe(e, t, n) {
	let r = e === "+" ? t + n : t - n;
	if (t % 1 != 0 || n % 1 != 0) {
		let i = t.toString().split("."), a = n.toString().split("."), o = i[1] && i[1].length || 0, s = a[1] && a[1].length || 0, c = 10 ** Math.max(o, s);
		t = Math.round(t * c), n = Math.round(n * c), r = e === "+" ? t + n : t - n, r /= c;
	}
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [$e, et] = /*#__PURE__*/ pe("NumberFieldRoot"), tt = /* @__PURE__ */ P({
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
		let n = e, r = t, { disabled: i, readonly: a, disableWheelChange: o, invertWheelChange: s, min: c, max: u, step: d, stepSnapping: m, formatOptions: h, id: _, locale: v } = y(n), b = me(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { primitiveElement: x, currentElement: E } = V(), D = Ae(v), k = L(E), A = C(), j = O(() => de(b.value) || isNaN(b.value) ? !1 : N("decrease", b.value) >= b.value), M = O(() => de(b.value) || isNaN(b.value) ? !1 : N("increase", b.value) <= b.value);
		function N(e, t, n = 1) {
			let r = d.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (m.value && !isNaN(r)) {
				let o = z(t, c.value, u.value, r);
				if (o === t) a = Qe(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Qe("+", o, r) : o < t ? o : Qe("-", o, r);
					a = n > 1 ? Qe(i, s, r * (n - 1)) : s;
				}
			} else a = Qe(i, t, r * n);
			return q(a);
		}
		function P(e, t = 1) {
			if (n.focusOnChange && A.value?.focus(), n.disabled || n.readonly) return;
			let r = B.parse(A.value?.value ?? "");
			if (isNaN(r)) {
				b.value = q(c.value ?? 0);
				return;
			}
			b.value = N(e, r, t);
		}
		function F(e = 1) {
			P("increase", e);
		}
		function ee(e = 1) {
			P("decrease", e);
		}
		function I(e) {
			e === "min" && c.value !== void 0 ? b.value = q(c.value) : e === "max" && u.value !== void 0 && (b.value = q(u.value));
		}
		let R = Xe(D, h), B = Ze(D, h), H = O(() => R.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), U = Xe(D, h), G = O(() => de(b.value) || isNaN(b.value) ? "" : U.format(b.value));
		function K(e) {
			return B.isValidPartialNumber(e, c.value, u.value);
		}
		function te(e) {
			A.value && (A.value.value = e);
		}
		function q(e) {
			let t;
			return t = d.value === void 0 || isNaN(d.value) || !m.value ? ne(e, c.value, u.value) : z(e, c.value, u.value, d.value), t = B.parse(R.format(t)), t;
		}
		function J(e) {
			let t = B.parse(e);
			return b.value = isNaN(t) ? void 0 : q(t), e.length ? te(G.value) : te(e);
		}
		return et({
			modelValue: b,
			handleDecrease: ee,
			handleIncrease: F,
			handleMinMaxValue: I,
			inputMode: H,
			inputEl: A,
			onInputElement: (e) => A.value = e,
			textValue: G,
			readonly: a,
			validate: K,
			applyInputValue: J,
			disabled: i,
			disableWheelChange: o,
			invertWheelChange: s,
			max: u,
			min: c,
			isDecreaseDisabled: j,
			isIncreaseDisabled: M,
			id: _
		}), (e, t) => (p(), T(S(_e), l(e.$attrs, {
			ref_key: "primitiveElement",
			ref: x,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": S(i) ? "" : void 0,
			"data-readonly": S(a) ? "" : void 0
		}), {
			default: g(() => [f(e.$slots, "default", {
				modelValue: S(b),
				textValue: G.value,
				readonly: S(a)
			}), S(k) && e.name ? (p(), T(S(W), {
				key: 0,
				type: "text",
				value: S(b),
				name: e.name,
				disabled: S(i),
				readonly: S(a),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : w("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), nt = /* @__PURE__ */ P({
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
		let t = e, n = $e(), r = O(() => n.disabled?.value || n.readonly.value || t.disabled || n.isDecreaseDisabled.value), { primitiveElement: i, currentElement: a } = V(), { isPressed: o, onTrigger: s } = Ye({
			target: a,
			disabled: r
		});
		return s(() => {
			n.handleDecrease();
		}), (e, n) => (p(), T(S(_e), l(t, {
			ref_key: "primitiveElement",
			ref: i,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: S(o) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": S(o) ? "true" : void 0,
			onContextmenu: n[0] ||= x(() => {}, ["prevent"])
		}), {
			default: g(() => [f(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), rt = /* @__PURE__ */ P({
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
		let t = e, n = $e(), r = O(() => n.disabled?.value || n.readonly.value || t.disabled || n.isIncreaseDisabled.value), { primitiveElement: i, currentElement: a } = V(), { isPressed: o, onTrigger: s } = Ye({
			target: a,
			disabled: r
		});
		return s(() => {
			n.handleIncrease();
		}), (e, n) => (p(), T(S(_e), l(t, {
			ref_key: "primitiveElement",
			ref: i,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: S(o) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": S(o) ? "true" : void 0,
			onContextmenu: n[0] ||= x(() => {}, ["prevent"])
		}), {
			default: g(() => [f(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), it = /* @__PURE__ */ P({
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
	setup(e) {
		let t = e, { primitiveElement: n, currentElement: r } = V(), i = $e(), a = ke(), { isComposing: o, handleCompositionStart: s, handleCompositionEnd: u } = Oe();
		function d(e) {
			if (!(o.value || e.isComposing)) switch (e.key) {
				case a.ARROW_UP:
					e.preventDefault(), i.handleIncrease();
					break;
				case a.ARROW_DOWN:
					e.preventDefault(), i.handleDecrease();
					break;
				case a.PAGE_UP:
					e.preventDefault(), i.handleIncrease(10);
					break;
				case a.PAGE_DOWN:
					e.preventDefault(), i.handleDecrease(10);
					break;
				case a.HOME:
					e.preventDefault(), i.handleMinMaxValue("min");
					break;
				case a.END:
					e.preventDefault(), i.handleMinMaxValue("max");
					break;
				case a.ENTER: i.applyInputValue(e.target?.value);
			}
		}
		function m(e) {
			i.disableWheelChange.value || e.target === Ce() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? i.invertWheelChange.value ? i.handleDecrease() : i.handleIncrease() : e.deltaY < 0 && (i.invertWheelChange.value ? i.handleIncrease() : i.handleDecrease())));
		}
		c(() => {
			i.onInputElement(r.value);
		});
		let _ = C(i.textValue.value);
		h(() => i.textValue.value, () => {
			_.value = i.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function v() {
			requestAnimationFrame(() => {
				_.value = i.textValue.value;
			});
		}
		return (e, r) => (p(), T(S(_e), l(t, {
			id: S(i).id.value,
			ref_key: "primitiveElement",
			ref: n,
			value: _.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: S(i).inputMode.value,
			disabled: S(i).disabled.value ? "" : void 0,
			"data-disabled": S(i).disabled.value ? "" : void 0,
			readonly: S(i).readonly.value ? "" : void 0,
			"data-readonly": S(i).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": S(i).modelValue.value,
			"aria-valuemin": S(i).min.value,
			"aria-valuemax": S(i).max.value,
			onKeydown: d,
			onWheel: m,
			onBeforeinput: r[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				S(i).validate(n) || e.preventDefault();
			},
			onInput: r[1] ||= (e) => {
				let t = e.target;
				_.value = t.value;
			},
			onChange: v,
			onBlur: r[2] ||= (e) => S(i).applyInputValue(e.target?.value),
			onCompositionstart: S(s),
			onCompositionend: S(u)
		}), {
			default: g(() => [f(e.$slots, "default")]),
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
}), at = "radio.select";
function ot(e, t, n) {
	ve(at, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var st = /* @__PURE__ */ P({
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
		let n = e, r = t, i = me(n, "checked", r, { passive: n.checked === void 0 }), { value: a } = y(n), { forwardRef: o, currentElement: s } = he(), c = L(s), u = B(), d = O(() => n.id && s.value ? document.querySelector(`[for="${n.id}"]`)?.innerText ?? n.value : void 0);
		function m(e) {
			n.disabled || ot(e, n.value, (e) => {
				r("select", e), !e?.defaultPrevented && (i.value = !0, c.value && e.stopPropagation());
			});
		}
		return (e, t) => (p(), _(j, null, [F(S(_e), l({
			id: e.id,
			ref: S(o),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": S(i) ?? !1,
			"aria-label": d.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": S(i) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: S(a),
			required: e.required,
			name: e.name
		}, {
			...S(u),
			...e.$attrs
		}, { onClick: x(m, ["stop"]) }), {
			default: g(() => [f(e.$slots, "default", { checked: S(i) })]),
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
		]), S(c) && e.name ? (p(), T(S(W), l({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: S(a),
			checked: !!S(i),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, S(u)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : w("v-if", !0)], 64));
	}
}), [ct, lt] = /*#__PURE__*/ pe("RadioGroupRoot"), ut = /* @__PURE__ */ P({
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
		let n = e, r = t, { forwardRef: i, currentElement: a } = he(), o = me(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: s, loop: c, orientation: l, name: u, required: d, dir: m } = y(n), h = we(m), _ = L(a);
		return lt({
			modelValue: o,
			changeModelValue: (e) => {
				o.value = e;
			},
			disabled: s,
			loop: c,
			orientation: l,
			name: u?.value,
			required: d
		}), (e, t) => (p(), T(S(q), {
			"as-child": "",
			orientation: S(l),
			dir: S(h),
			loop: S(c)
		}, {
			default: g(() => [F(S(_e), {
				ref: S(i),
				role: "radiogroup",
				"data-disabled": S(s) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": S(l),
				"aria-required": S(d),
				dir: S(h)
			}, {
				default: g(() => [f(e.$slots, "default", { modelValue: S(o) }), S(_) && S(u) ? (p(), T(S(W), {
					key: 0,
					required: S(d),
					disabled: S(s),
					value: S(o),
					name: S(u)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : w("v-if", !0)]),
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
}), [dt, ft] = /*#__PURE__*/ pe("RadioGroupItem"), pt = /* @__PURE__ */ P({
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
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: a } = he(), o = ct(), s = O(() => o.disabled.value || n.disabled), c = O(() => o.required.value || n.required), u = O(() => te(o.modelValue?.value, n.value));
		ft({
			disabled: s,
			checked: u
		});
		let d = C(!1), m = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		ye("keydown", (e) => {
			m.includes(e.key) && (d.value = !0);
		}), ye("keyup", () => {
			d.value = !1;
		});
		function h() {
			setTimeout(() => {
				d.value && a.value?.click();
			}, 0);
		}
		let _ = B();
		return (e, t) => (p(), T(S(J), {
			checked: u.value,
			disabled: s.value,
			"as-child": "",
			focusable: !s.value,
			active: u.value
		}, {
			default: g(() => [F(st, l({
				...S(_),
				...e.$attrs,
				...n
			}, {
				ref: S(i),
				checked: u.value,
				required: c.value,
				disabled: s.value,
				"onUpdate:checked": t[0] ||= (t) => S(o).changeModelValue(e.value),
				onSelect: t[1] ||= (e) => r("select", e),
				onKeydown: t[2] ||= A(x(() => {}, ["prevent"]), ["enter"]),
				onFocus: h
			}), {
				default: g(() => [f(e.$slots, "default", {
					checked: u.value,
					required: c.value,
					disabled: s.value
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
}), Z = /* @__PURE__ */ P({
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
		return (t, n) => (p(), T(S(ut), {
			class: M(S(R).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": r
		}, {
			default: g(() => [(p(!0), _(j, null, u(e.options, (e) => (p(), T(S(pt), {
				key: e.value,
				class: M(["tc-interactive", S(R).segmentedControlItem]),
				value: e.value
			}, {
				default: g(() => [E("span", { class: M(S(R).segmentedControlItemLabel) }, k(e.label), 3)]),
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
}), Q = /* @__PURE__ */ P({
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
		let n = e, r = t;
		function i(e) {
			r("update:modelValue", e);
		}
		let a = O(() => U({
			id: n.id,
			min: n.min,
			max: n.max
		})), o = O(() => U({
			"aria-label": n.label,
			"aria-describedby": n.describedBy
		}));
		return (t, n) => (p(), T(S(tt), l(a.value, {
			class: S(R).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": i
		}), {
			default: g(() => [
				F(S(nt), {
					class: M(["tc-interactive", S(R).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: g(() => [F(I, {
						icon: S(ie),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				F(S(it), l(o.value, { class: ["tc-tabular-nums", S(R).numberStepperInput] }), null, 16, ["class"]),
				F(S(rt), {
					class: M(["tc-interactive", S(R).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: g(() => [F(I, {
						icon: S(se),
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
}), mt = {
	view: "_view_1rqoj_7",
	onboarding: "_onboarding_1rqoj_16",
	onboarding_icon: "_onboarding_icon_1rqoj_25",
	onboarding_label: "_onboarding_label_1rqoj_37",
	onboarding_title: "_onboarding_title_1rqoj_44",
	onboarding_description: "_onboarding_description_1rqoj_51",
	section: "_section_1rqoj_70",
	section_header: "_section_header_1rqoj_79",
	section_title: "_section_title_1rqoj_89",
	row: "_row_1rqoj_95",
	row_label: "_row_label_1rqoj_104",
	row_value: "_row_value_1rqoj_112",
	profile_row: "_profile_row_1rqoj_76",
	profile_identity: "_profile_identity_1rqoj_120",
	profile_name: "_profile_name_1rqoj_144",
	profile_meta: "_profile_meta_1rqoj_151",
	profile_actions: "_profile_actions_1rqoj_161",
	badge: "_badge_1rqoj_169",
	form_grid: "_form_grid_1rqoj_178",
	status_text: "_status_text_1rqoj_184",
	risk_banner: "_risk_banner_1rqoj_204",
	risk_banner_title: "_risk_banner_title_1rqoj_218",
	risk_banner_description: "_risk_banner_description_1rqoj_230",
	risk_banner_actions: "_risk_banner_actions_1rqoj_237",
	acknowledged_note: "_acknowledged_note_1rqoj_243",
	description: "_description_1rqoj_251",
	actions_row: "_actions_row_1rqoj_258",
	vault_mode_row: "_vault_mode_row_1rqoj_264",
	vault_controls: "_vault_controls_1rqoj_280",
	vault_unlocked_actions: "_vault_unlocked_actions_1rqoj_291",
	text_input: "_text_input_1rqoj_298",
	text_area: "_text_area_1rqoj_308",
	layout: "_layout_1rqoj_327",
	section_nav: "_section_nav_1rqoj_333",
	section_nav_item: "_section_nav_item_1rqoj_341",
	section_content: "_section_content_1rqoj_354",
	prompt_tag_row: "_prompt_tag_row_1rqoj_372"
};
//#endregion
//#region src/ui/views/settings/settings_styles.ts
ce("settings", "._view_1rqoj_7{flex-direction:column;gap:32px;width:min(100%,920px);margin:0 auto;padding:24px;display:flex}._onboarding_1rqoj_16{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px;display:grid}._onboarding_icon_1rqoj_25{width:48px;height:48px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._onboarding_label_1rqoj_37{color:var(--tc-accent);margin-bottom:4px;font-size:12px;font-weight:650}._onboarding_title_1rqoj_44{color:var(--tc-text);font-size:22px;font-weight:680;line-height:1.2}._onboarding_description_1rqoj_51{max-width:62ch;color:var(--tc-text-muted);margin-top:8px;line-height:1.55}@media (width<=639px){._view_1rqoj_7{gap:24px;padding:20px 16px}._onboarding_1rqoj_16{grid-template-columns:minmax(0,1fr);padding:20px}}._section_1rqoj_70{flex-direction:column;min-width:0;display:flex}._section_header_1rqoj_79{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;display:flex}._section_title_1rqoj_89{color:var(--tc-text);font-size:14px;font-weight:650}._row_1rqoj_95{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_1rqoj_104{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_1rqoj_112{color:var(--tc-text);flex:none}._profile_row_1rqoj_76{border-top:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_1rqoj_120{flex-direction:column;flex:12rem;gap:2px;min-width:0;display:flex}._profile_name_1rqoj_144{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_1rqoj_151{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_1rqoj_161{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;display:flex}._badge_1rqoj_169{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_1rqoj_178{flex-direction:column;gap:16px;display:flex}._status_text_1rqoj_184{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_1rqoj_184[data-tone=success]{color:var(--tc-success)}._status_text_1rqoj_184[data-tone=warning]{color:var(--tc-warning)}._status_text_1rqoj_184[data-tone=error]{color:var(--tc-error)}._risk_banner_1rqoj_204{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_1rqoj_204[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_1rqoj_218{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_1rqoj_204[data-severity=error] ._risk_banner_title_1rqoj_218{color:var(--tc-error)}._risk_banner_description_1rqoj_230{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_1rqoj_237{align-items:center;gap:8px;display:flex}._acknowledged_note_1rqoj_243{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_1rqoj_251{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_1rqoj_258{align-items:center;gap:12px;padding-top:8px;display:flex}._vault_mode_row_1rqoj_264{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;display:flex}._vault_mode_row_1rqoj_264 ._profile_meta_1rqoj_151{white-space:normal;text-overflow:clip;line-height:1.45;overflow:visible}._vault_controls_1rqoj_280{gap:14px;width:min(100%,520px);padding-top:16px;display:grid}._vault_controls_1rqoj_280>button{width:fit-content}._vault_unlocked_actions_1rqoj_291{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._text_input_1rqoj_298{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._text_area_1rqoj_308{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;min-height:72px;color:var(--tc-text);border-color:var(--tc-divider);font:inherit;resize:vertical;padding:8px 10px}._text_area_1rqoj_308:focus-visible,._text_input_1rqoj_298:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._layout_1rqoj_327{grid-template-columns:184px minmax(0,1fr);min-height:100%;display:grid}._section_nav_1rqoj_333{border-inline-end:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding:16px 8px;display:flex}._section_nav_item_1rqoj_341{border-radius:var(--tc-radius-field);color:var(--tc-text-muted);text-align:start;white-space:nowrap;padding:8px 12px}._section_nav_item_1rqoj_341[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised)}._section_content_1rqoj_354{min-width:0}@media (width<=767px){._layout_1rqoj_327{grid-template-columns:minmax(0,1fr)}._section_nav_1rqoj_333{border-inline-end:none;border-bottom:1px solid var(--tc-divider);flex-direction:row;padding:8px;overflow-x:auto}}._prompt_tag_row_1rqoj_372{flex-wrap:wrap;gap:6px;margin-top:4px;display:flex}");
var $ = mt, ht = /* @__PURE__ */ P({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = {
			color_mode: "system",
			inspector_width: 320,
			inspector_collapsed: !1,
			optional_entry_enabled: !1
		};
		function i(e) {
			t.controller.update_settings({ ui: {
				...t.settings?.ui ?? r,
				...e
			} });
		}
		let a = O(() => [
			{
				value: "system",
				label: n("settings.appearance.theme_system")
			},
			{
				value: "light",
				label: n("settings.appearance.theme_light")
			},
			{
				value: "dark",
				label: n("settings.appearance.theme_dark")
			}
		]), o = O(() => [
			{
				value: "auto",
				label: n("settings.appearance.language_auto")
			},
			{
				value: "zh-CN",
				label: n("settings.appearance.language_zh_cn")
			},
			{
				value: "en",
				label: n("settings.appearance.language_en")
			}
		]);
		function s(e) {
			(e === "system" || e === "light" || e === "dark") && i({ color_mode: e });
		}
		function c(e) {
			(e === "auto" || e === "zh-CN" || e === "en") && t.controller.update_settings({ locale: e });
		}
		function l(e) {
			t.controller.set_inspector_width(e), i({ inspector_width: e });
		}
		return (t, r) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "appearance-settings"
		}, [E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(n)("settings.sections.appearance")), 3)], 2), E("div", { class: M(S($).form_grid) }, [
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.appearance.theme_label")), 3), F(Z, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: S(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.appearance.language_label")), 3), F(Z, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: S(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.appearance.inspector_width_label")), 3), F(Q, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: S(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			F(Te, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: S(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), gt = ["data-tone"], _t = ["id", "aria-describedby"], vt = ["id", "aria-describedby"], yt = ["id", "aria-describedby"], bt = /* @__PURE__ */ P({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = C(""), i = C(""), a = C(!1), o = C(null), s = C(!1), c = O(() => [
			{
				value: "browser_device",
				label: n("settings.credential_storage.modes.browser_device")
			},
			{
				value: "host",
				label: n("settings.credential_storage.modes.host")
			},
			{
				value: "browser_encrypted",
				label: n("settings.credential_storage.modes.browser_encrypted")
			}
		]), l = O({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = O(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), f = O(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function m() {
			r.value = "", i.value = "";
		}
		function h(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function y(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function b() {
			if (!(a.value || !h(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), m();
				} catch (e) {
					o.value = y(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function x() {
			if (!(a.value || !h(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), m();
				} catch (e) {
					o.value = y(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function T() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), m();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		async function N() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.reset_browser_secret_vault(), s.value = !1, m();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		return (t, m) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "credential-storage-settings"
		}, [
			E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (p(), _("span", {
				key: 0,
				class: M(S($).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, k(u.value), 11, gt)) : w("", !0)], 2),
			E("div", { class: M(S($).vault_mode_row) }, [E("div", { class: M(S($).profile_identity) }, [E("span", { class: M(S($).profile_name) }, k(S(n)("settings.credential_storage.mode_label")), 3), E("span", { class: M(S($).profile_meta) }, k(S(n)("settings.credential_storage.mode_hint")), 3)], 2), F(Z, {
				modelValue: l.value,
				"onUpdate:modelValue": m[0] ||= (e) => l.value = e,
				options: c.value,
				label: S(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (p(), _("div", {
				key: 0,
				class: M(S($).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (p(), _("p", {
				key: 0,
				class: M(S($).status_text),
				"data-tone": "error",
				role: "alert"
			}, k(f.value), 3)) : e.vaultStatus.state === "uninitialized" ? (p(), _(j, { key: 1 }, [
				F(Y, {
					label: S(n)("settings.credential_storage.passphrase_label"),
					hint: S(n)("settings.credential_storage.passphrase_hint", { count: S(12) }),
					required: ""
				}, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": m[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, _t), [[v, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				F(Y, {
					label: S(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": m[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, vt), [[v, i.value]])]),
					_: 1
				}, 8, ["label"]),
				F(H, {
					label: S(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: b
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (p(), _(j, { key: 2 }, [F(Y, {
				label: S(n)("settings.credential_storage.passphrase_label"),
				hint: S(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
					id: e,
					"onUpdate:modelValue": m[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: M(S($).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: A(x, ["enter"])
				}, null, 42, yt), [[v, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), F(H, {
				label: S(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: x
			}, null, 8, ["label", "pending"])], 64)) : (p(), _("div", {
				key: 3,
				class: M(S($).vault_unlocked_actions)
			}, [F(H, {
				label: S(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: T
			}, null, 8, ["label", "pending"]), F(H, {
				label: S(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: m[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (p(), _("p", {
				key: 4,
				class: M(S($).status_text),
				"data-tone": "error",
				role: "alert"
			}, k(o.value), 3)) : w("", !0)], 2)) : w("", !0),
			F(Ee, {
				open: s.value,
				title: S(n)("settings.credential_storage.reset_confirm_title"),
				description: S(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": S(n)("settings.credential_storage.reset_action"),
				"cancel-label": S(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": m[5] ||= (e) => s.value = e,
				onConfirm: N
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), xt = ["aria-label"], St = ["aria-label"], Ct = /* @__PURE__ */ P({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = C(!1), i = [{
			value: "bundled",
			label: n("settings.data.vocabulary_channel_bundled")
		}, {
			value: "remote",
			label: n("settings.data.vocabulary_channel_https")
		}];
		async function a(e) {
			if (!(e !== "bundled" && e !== "remote" || r.value)) {
				r.value = !0;
				try {
					await t.controller.set_vocabulary_update_channel(e);
				} finally {
					r.value = !1;
				}
			}
		}
		let o = C(!1), s = C(!1), c = C(null), l = C(null), u = C(null);
		function d() {
			u.value?.click();
		}
		function f() {
			t.controller.cancel_vocabulary_import();
		}
		async function m(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || o.value)) {
				o.value = !0, s.value = !1, c.value = null, l.value = null;
				try {
					await t.controller.import_vocabulary_package(i, (e) => {
						l.value = e;
					}), s.value = !0;
				} catch (e) {
					let t = typeof e == "object" && e && "code" in e && typeof e.code == "string" ? e.code : "vocabulary_import_failed";
					c.value = n("settings.data.vocabulary_import_error", { code: t });
				} finally {
					o.value = !1;
				}
			}
		}
		let h = O(() => {
			let e = l.value;
			if (e === null) return null;
			switch (e.phase) {
				case "reading": return n("settings.data.vocabulary_import.progress_reading", {
					received: e.received_bytes,
					total: e.total_bytes
				});
				case "batch": return n("settings.data.vocabulary_import.progress_batch", {
					current: e.batch_index + 1,
					total: e.batch_count
				});
				case "indexing": return n("settings.data.vocabulary_import.progress_indexing");
				case "staging_shard": return n("settings.data.vocabulary_import.progress_staging", {
					current: e.shard_index + 1,
					total: e.shard_count
				});
				case "activating": return n("settings.data.vocabulary_import.progress_activating");
				case "complete": return n("settings.data.vocabulary_import.progress_complete", { count: e.record_count });
				case "cancelled": return n("settings.data.vocabulary_import.progress_cancelled");
			}
		}), g = C(!1), v = C(null);
		async function y() {
			if (!g.value) {
				g.value = !0, v.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					v.value = n("errors.unexpected");
				} finally {
					g.value = !1;
				}
			}
		}
		let b = C(!1), x = C(null), A = C(null);
		function j() {
			A.value?.click();
		}
		async function N(e) {
			let r = e.target, i = r.files?.[0];
			if (r.value = "", !(!i || b.value)) {
				b.value = !0, x.value = null;
				try {
					await t.controller.import_settings_archive(i);
				} catch {
					x.value = n("errors.unexpected");
				} finally {
					b.value = !1;
				}
			}
		}
		return (t, l) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "data-settings"
		}, [E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(n)("settings.sections.data")), 3)], 2), E("div", { class: M(S($).form_grid) }, [
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.data.vocabulary_channel_label")), 3), F(Z, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: S(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			E("div", { class: M(S($).actions_row) }, [
				F(H, {
					label: S(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (p(), T(H, {
					key: 0,
					label: S(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : w("", !0),
				E("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": S(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: m
				}, null, 40, xt)
			], 2),
			E("p", { class: M(S($).description) }, k(S(n)("settings.data.vocabulary_import.description")), 3),
			h.value ? (p(), _("p", {
				key: 0,
				class: M([S($).status_text, S($).description]),
				"data-testid": "vocabulary-import-progress"
			}, k(h.value), 3)) : w("", !0),
			s.value ? (p(), _("p", {
				key: 1,
				class: M([S($).status_text, S($).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, k(S(n)("settings.data.vocabulary_import.success")), 3)) : w("", !0),
			c.value ? (p(), _("p", {
				key: 2,
				class: M([S($).status_text, S($).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, k(c.value), 3)) : w("", !0),
			E("div", { class: M(S($).actions_row) }, [
				F(H, {
					label: S(n)("settings.data.archive_export_action"),
					pending: g.value,
					onClick: y
				}, null, 8, ["label", "pending"]),
				F(H, {
					label: S(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: b.value,
					onClick: j
				}, null, 8, ["label", "pending"]),
				E("input", {
					ref_key: "file_input",
					ref: A,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": S(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: N
				}, null, 40, St)
			], 2),
			E("p", { class: M(S($).description) }, k(S(n)("settings.data.archive_import_description")), 3),
			v.value ? (p(), _("p", {
				key: 3,
				class: M([S($).status_text, S($).description]),
				"data-tone": "error"
			}, k(v.value), 3)) : w("", !0),
			x.value ? (p(), _("p", {
				key: 4,
				class: M([S($).status_text, S($).description]),
				"data-tone": "error"
			}, k(x.value), 3)) : w("", !0)
		], 2)], 2));
	}
}), wt = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Tt = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Et = ["id", "aria-describedby"], Dt = ["id", "aria-describedby"], Ot = ["id", "aria-describedby"], kt = ["id", "aria-describedby"], At = ["id", "aria-describedby"], jt = [
	"id",
	"aria-describedby",
	"disabled"
], Mt = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Nt = "in_use", Pt = "none", Ft = /* @__PURE__ */ P({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = O(() => t.settings?.illustration ?? null);
		function i(e) {
			t.controller.update_settings(e);
		}
		function a(e) {
			let t = r.value;
			t !== null && i({ illustration: {
				...t,
				...e
			} });
		}
		let o = C(""), s = C(""), l = C(""), u = C(""), f = C(""), m = C(""), y = C(""), b = C("");
		h(r, (e) => {
			o.value = e === null || e.preset_name === Nt ? "" : e.preset_name, m.value = e?.wardrobe_model ?? "", y.value = e?.analysis_guidance ?? "", b.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (s.value = e.connection.proxy_preset, l.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (u.value = e.connection.api_url, f.value = e.connection.model);
		}, { immediate: !0 });
		function x() {
			a({ wardrobe_model: m.value.trim() || null });
		}
		function T() {
			a({ preset_name: o.value.trim() || Nt });
		}
		let A = O(() => [
			{
				value: "current",
				label: n("settings.illustration.connection_current")
			},
			{
				value: "proxy_preset",
				label: n("settings.illustration.connection_proxy_preset")
			},
			{
				value: "custom",
				label: n("settings.illustration.connection_custom")
			}
		]);
		function N() {
			let e = s.value.trim();
			if (e === "") return null;
			let t = l.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function P() {
			let e = u.value.trim(), t = f.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let ee = O(() => U.value === "custom" && u.value.trim() !== "" && P() === null);
		function I() {
			let e = P();
			e !== null && a({ connection: e });
		}
		let L = C(""), R = C("idle");
		async function z() {
			let e = L.value.trim();
			if (e !== "") {
				R.value = "saving";
				try {
					await t.controller.set_analysis_key(e), L.value = "", R.value = "saved";
				} catch {
					R.value = "failed";
				}
			}
		}
		async function B() {
			R.value = "saving";
			try {
				await t.controller.clear_analysis_key(), R.value = "cleared";
			} catch {
				R.value = "failed";
			}
		}
		let V = O(() => {
			switch (R.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), U = C(r.value?.connection.kind ?? "current");
		h(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (U.value = e);
		});
		function W(e) {
			if (e === "current") U.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				U.value = "proxy_preset";
				let e = N();
				e !== null && a({ connection: e });
			} else e === "custom" && (U.value = "custom", I());
		}
		function G() {
			let e = N();
			e !== null && a({ connection: e });
		}
		let te = O(() => [{
			value: Pt,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function ne(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let q = O(() => [
			{
				value: "chat",
				label: n("settings.illustration.world_info_chat")
			},
			{
				value: "worldbook",
				label: n("settings.illustration.world_info_worldbook")
			},
			{
				value: "off",
				label: n("settings.illustration.world_info_off")
			}
		]), J = C(r.value?.world_info.mode ?? "chat");
		h(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (J.value = e);
		});
		let re = C([]), ie = C(!1);
		async function ae() {
			try {
				re.value = await t.controller.list_worldbooks(), ie.value = !1;
			} catch {
				ie.value = !0;
			}
		}
		c(() => {
			J.value === "worldbook" && ae();
		});
		let oe = O(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbook : void 0), se = O(() => [.../* @__PURE__ */ new Set([...re.value, ...oe.value === void 0 ? [] : [oe.value]])].map((e) => ({
			value: e,
			label: e
		})));
		function ce(e) {
			e === "chat" || e === "off" ? (J.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (J.value = e, ae());
		}
		function le(e) {
			a({ world_info: {
				mode: "worldbook",
				worldbook: e
			} });
		}
		return (t, c) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "illustration-settings"
		}, [E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(n)("settings.nav.illustration")), 3)], 2), E("div", { class: M(S($).form_grid) }, [
			F(Te, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: S(n)("settings.illustration.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": c[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			E("p", { class: M(S($).description) }, k(S(n)("settings.illustration.auto_generation_hint")), 3),
			F(Y, {
				label: S(n)("settings.illustration.analysis_guidance_label"),
				hint: S(n)("settings.illustration.analysis_guidance_hint")
			}, {
				default: g(({ fieldId: t, describedBy: r }) => [d(E("textarea", {
					id: t,
					"onUpdate:modelValue": c[1] ||= (e) => y.value = e,
					rows: "3",
					maxlength: "2000",
					placeholder: S(n)("settings.illustration.analysis_guidance_placeholder"),
					"aria-describedby": r,
					class: M(S($).text_area),
					disabled: !e.settings,
					"data-testid": "analysis-guidance-input",
					onBlur: c[2] ||= (e) => a({ analysis_guidance: y.value.trim() })
				}, null, 42, wt), [[v, y.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			F(Y, {
				label: S(n)("settings.illustration.preset_label"),
				hint: S(n)("settings.illustration.preset_hint")
			}, {
				default: g(({ fieldId: t, describedBy: r }) => [d(E("input", {
					id: t,
					"onUpdate:modelValue": c[3] ||= (e) => o.value = e,
					type: "text",
					placeholder: S(n)("settings.illustration.preset_placeholder"),
					"aria-describedby": r,
					class: M(S($).text_input),
					disabled: !e.settings,
					"data-testid": "analysis-preset-input",
					onBlur: T
				}, null, 42, Tt), [[v, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.connection_label")), 3), F(Z, {
				"model-value": U.value,
				options: A.value,
				label: S(n)("settings.illustration.connection_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": W
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			U.value === "proxy_preset" ? (p(), _(j, { key: 0 }, [F(Y, {
				label: S(n)("settings.illustration.proxy_preset_label"),
				hint: S(n)("settings.illustration.proxy_preset_hint")
			}, {
				default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
					id: e,
					"onUpdate:modelValue": c[4] ||= (e) => s.value = e,
					type: "text",
					"aria-describedby": t,
					class: M(S($).text_input),
					"data-testid": "analysis-proxy-preset-input",
					onBlur: G
				}, null, 42, Et), [[v, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]), F(Y, {
				label: S(n)("settings.illustration.proxy_model_label"),
				hint: S(n)("settings.illustration.proxy_model_hint")
			}, {
				default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
					id: e,
					"onUpdate:modelValue": c[5] ||= (e) => l.value = e,
					type: "text",
					"aria-describedby": t,
					class: M(S($).text_input),
					onBlur: G
				}, null, 42, Dt), [[v, l.value]])]),
				_: 1
			}, 8, ["label", "hint"])], 64)) : w("", !0),
			U.value === "custom" ? (p(), _(j, { key: 1 }, [
				F(Y, {
					label: S(n)("settings.illustration.custom_url_label"),
					hint: S(n)("settings.illustration.custom_url_hint"),
					error: ee.value ? S(n)("settings.illustration.custom_invalid") : null
				}, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": c[6] ||= (e) => u.value = e,
						type: "url",
						placeholder: "https://",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "analysis-custom-url-input",
						onBlur: I
					}, null, 42, Ot), [[v, u.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]),
				F(Y, { label: S(n)("settings.illustration.custom_model_label") }, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": c[7] ||= (e) => f.value = e,
						type: "text",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "analysis-custom-model-input",
						onBlur: I
					}, null, 42, kt), [[v, f.value]])]),
					_: 1
				}, 8, ["label"]),
				F(Y, {
					label: S(n)("settings.illustration.custom_key_label"),
					hint: S(n)("settings.illustration.custom_key_hint")
				}, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": c[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "analysis-custom-key-input"
					}, null, 10, At), [[v, L.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				E("div", { class: M(S($).actions_row) }, [
					F(H, {
						label: S(n)("settings.illustration.custom_key_save"),
						variant: "primary",
						pending: R.value === "saving",
						disabled: L.value.trim() === "",
						onClick: z
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					]),
					F(H, {
						label: S(n)("settings.illustration.custom_key_clear"),
						onClick: B
					}, null, 8, ["label"]),
					E("span", {
						class: M(S($).status_text),
						role: "status"
					}, k(V.value), 3)
				], 2)
			], 64)) : w("", !0),
			F(Y, {
				label: S(n)("settings.illustration.wardrobe_model_label"),
				hint: U.value === "current" ? S(n)("settings.illustration.wardrobe_model_current_hint") : S(n)("settings.illustration.wardrobe_model_hint")
			}, {
				default: g(({ fieldId: t, describedBy: n }) => [d(E("input", {
					id: t,
					"onUpdate:modelValue": c[9] ||= (e) => m.value = e,
					type: "text",
					"aria-describedby": n,
					class: M(S($).text_input),
					disabled: !e.settings || U.value === "current",
					"data-testid": "wardrobe-model-input",
					onBlur: x
				}, null, 42, jt), [[v, m.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			F(Y, {
				label: S(n)("settings.illustration.wardrobe_guidance_label"),
				hint: S(n)("settings.illustration.wardrobe_guidance_hint")
			}, {
				default: g(({ fieldId: t, describedBy: r }) => [d(E("textarea", {
					id: t,
					"onUpdate:modelValue": c[10] ||= (e) => b.value = e,
					rows: "3",
					maxlength: "2000",
					placeholder: S(n)("settings.illustration.wardrobe_guidance_placeholder"),
					"aria-describedby": r,
					class: M(S($).text_area),
					disabled: !e.settings,
					"data-testid": "wardrobe-guidance-input",
					onBlur: c[11] ||= (e) => a({ wardrobe_guidance: b.value.trim() })
				}, null, 42, Mt), [[v, b.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.chat_history_label")), 3), F(Q, {
				"model-value": r.value?.max_chat_history,
				label: S(n)("settings.illustration.chat_history_label"),
				min: 0,
				max: 20,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": c[12] ||= (e) => a({ max_chat_history: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.world_info_label")), 3), F(Z, {
				"model-value": J.value,
				options: q.value,
				label: S(n)("settings.illustration.world_info_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ce
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			E("p", { class: M(S($).description) }, k(S(n)("settings.illustration.world_info_hint")), 3),
			J.value === "worldbook" ? (p(), _(j, { key: 2 }, [E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.worldbook_label")), 3), F(K, {
				"model-value": oe.value,
				options: se.value,
				placeholder: S(n)("settings.illustration.worldbook_placeholder"),
				"aria-label": S(n)("settings.illustration.worldbook_label"),
				"onUpdate:modelValue": le
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), ie.value ? (p(), _("p", {
				key: 0,
				class: M(S($).description),
				role: "alert"
			}, k(S(n)("settings.illustration.worldbook_unavailable")), 3)) : w("", !0)], 64)) : w("", !0),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.max_images_label")), 3), F(Q, {
				"model-value": r.value?.max_images_per_message,
				label: S(n)("settings.illustration.max_images_label"),
				min: 1,
				max: 8,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": c[13] ||= (e) => a({ max_images_per_message: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.prompt_preset_label")), 3), F(K, {
				"model-value": r.value?.prompt_preset_id ?? Pt,
				options: te.value,
				placeholder: S(n)("settings.illustration.prompt_preset_label"),
				"aria-label": S(n)("settings.illustration.prompt_preset_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ne
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label",
				"disabled"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.illustration.concurrency_label")), 3), F(Q, {
				"model-value": e.settings?.global_concurrency,
				label: S(n)("settings.illustration.concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": S(n)("common.actions.increase"),
				"decrement-label": S(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": c[14] ||= (e) => i({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2)
		], 2)], 2));
	}
}), It = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, Lt = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Rt(e, t) {
	switch (t) {
		case "vibe_transfer": return e("settings.novelai.ignored_vibe_transfer");
		case "smea": return e("settings.novelai.ignored_smea");
		case "cfg_rescale": return e("settings.novelai.ignored_cfg_rescale");
		case "variety_plus": return e("settings.novelai.ignored_variety_plus");
		case "sampler": return e("settings.novelai.ignored_sampler");
		case "steps": return e("settings.novelai.ignored_steps");
	}
}
//#endregion
//#region src/ui/views/settings/NovelAiSettings.vue?vue&type=script&setup=true&lang.ts
var zt = "https://novelai.net/image", Bt = /* @__PURE__ */ P({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: a, d: l } = D(), d = O(() => {
			let e = t.profile.model_id;
			return e != null && i(e) !== null ? e : ue;
		});
		function f() {
			if (t.profile.novelai_defaults !== null) return t.profile.novelai_defaults;
			let e = le(d.value);
			return {
				width: e.width,
				height: e.height,
				steps: e.steps,
				scale: e.scale,
				cfg_rescale: e.cfg_rescale,
				sampler: e.sampler,
				noise_schedule: e.noise_schedule,
				smea: e.smea,
				dyn: e.dyn,
				variety_plus: e.variety_plus,
				vibe_asset_ids: []
			};
		}
		let m = C(f());
		h(() => t.profile.id, () => {
			m.value = f();
		});
		function g(e) {
			m.value = {
				...m.value,
				...e
			};
		}
		let v = O(() => s.safeParse(m.value).success ? null : a("settings.novelai.invalid_size")), y = O(() => {
			let e = i(d.value);
			return e === null ? [] : o(e.profile, m.value);
		}), b = C(null), x = C(null), A = C(!1), P = C(!1);
		async function ee() {
			P.value = !0, x.value = null, A.value = !1;
			try {
				b.value = await t.controller.load_novelai_account();
			} catch (e) {
				A.value = e instanceof Error && e.name === "ProviderNetworkError", x.value = e instanceof Error ? e.message : String(e);
			} finally {
				P.value = !1;
			}
		}
		let I = C([]);
		c(async () => {
			try {
				I.value = (await t.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				I.value = [];
			}
		});
		let L = O(() => I.value.map((e) => ({
			value: e.profile.model_id,
			label: e.profile.display_name
		})));
		async function R(e) {
			await t.controller.save_provider_profile({
				id: t.profile.id,
				provider_id: t.profile.provider_id,
				display_name: t.profile.display_name,
				model_id: e,
				workflow_id: t.profile.workflow_id ?? null,
				is_default: t.profile.is_default,
				updated_at: t.profile.updated_at
			});
		}
		let z = r.options.map((e) => ({
			value: e,
			label: It[e]
		})), B = n.options.map((e) => ({
			value: e,
			label: Lt[e]
		}));
		function V(e, t, n) {
			t.includes(n) && g({ [e]: n });
		}
		let U = O(() => t.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function W(e, t) {
			let n = m.value.vibe_asset_ids.filter((t) => t !== e);
			g({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let G = C("idle");
		async function te() {
			G.value = "saving";
			try {
				await t.controller.save_novelai_defaults(t.profile.id, m.value), G.value = "saved";
			} catch {
				G.value = "failed";
			}
		}
		return (t, i) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "novelai-settings"
		}, [E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(a)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), E("div", { class: M(S($).form_grid) }, [
			E("div", { class: M(S($).actions_row) }, [F(H, {
				label: S(a)("settings.novelai.refresh_account"),
				pending: P.value,
				onClick: ee
			}, null, 8, ["label", "pending"]), b.value === null ? A.value ? (p(), _("span", {
				key: 1,
				class: M(S($).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [N(k(S(a)("settings.novelai.account_unreachable")) + " ", 1), E("a", {
				href: zt,
				target: "_blank",
				rel: "noopener noreferrer"
			}, k(S(a)("settings.novelai.account_open_site")), 1)], 2)) : x.value === null ? w("", !0) : (p(), _("span", {
				key: 2,
				class: M(S($).status_text)
			}, k(x.value), 3)) : (p(), _("span", {
				key: 0,
				class: M(S($).status_text),
				"data-testid": "novelai-account"
			}, k(S(a)("settings.novelai.account_summary", {
				tier: b.value.tier,
				anlas: b.value.anlas,
				expires: S(l)(new Date(b.value.expires_at), "short_date")
			})), 3))], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.model_label")), 3), F(K, {
				"model-value": d.value,
				options: L.value,
				placeholder: d.value,
				"aria-label": S(a)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void R(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.width_label")), 3), F(Q, {
				"model-value": m.value.width,
				label: S(a)("settings.novelai.width_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": S(a)("common.actions.increase"),
				"decrement-label": S(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[1] ||= (e) => g({ width: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.height_label")), 3), F(Q, {
				"model-value": m.value.height,
				label: S(a)("settings.novelai.height_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": S(a)("common.actions.increase"),
				"decrement-label": S(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[2] ||= (e) => g({ height: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.steps_label")), 3), F(Q, {
				"model-value": m.value.steps,
				label: S(a)("settings.novelai.steps_label"),
				min: 1,
				max: 50,
				"increment-label": S(a)("common.actions.increase"),
				"decrement-label": S(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[3] ||= (e) => g({ steps: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.scale_label")), 3), F(Q, {
				"model-value": m.value.scale,
				label: S(a)("settings.novelai.scale_label"),
				min: 0,
				max: 10,
				step: .1,
				"increment-label": S(a)("common.actions.increase"),
				"decrement-label": S(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[4] ||= (e) => g({ scale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.cfg_rescale_label")), 3), F(Q, {
				"model-value": m.value.cfg_rescale,
				label: S(a)("settings.novelai.cfg_rescale_label"),
				min: 0,
				max: 1,
				step: .02,
				"increment-label": S(a)("common.actions.increase"),
				"decrement-label": S(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[5] ||= (e) => g({ cfg_rescale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.sampler_label")), 3), F(K, {
				"model-value": m.value.sampler,
				options: S(z),
				placeholder: S(a)("settings.novelai.sampler_label"),
				"aria-label": S(a)("settings.novelai.sampler_label"),
				"onUpdate:modelValue": i[6] ||= (e) => V("sampler", S(r).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(a)("settings.novelai.noise_schedule_label")), 3), F(K, {
				"model-value": m.value.noise_schedule,
				options: S(B),
				placeholder: S(a)("settings.novelai.noise_schedule_label"),
				"aria-label": S(a)("settings.novelai.noise_schedule_label"),
				"onUpdate:modelValue": i[7] ||= (e) => V("noise_schedule", S(n).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			F(Te, {
				"model-value": m.value.smea,
				label: S(a)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[8] ||= (e) => g({ smea: e })
			}, null, 8, ["model-value", "label"]),
			F(Te, {
				"model-value": m.value.dyn,
				label: S(a)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[9] ||= (e) => g({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			F(Te, {
				"model-value": m.value.variety_plus,
				label: S(a)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[10] ||= (e) => g({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			E("h3", { class: M(S($).section_title) }, k(S(a)("settings.novelai.vibes_title")), 3),
			U.value.length === 0 ? (p(), _("p", {
				key: 0,
				class: M(S($).description)
			}, k(S(a)("settings.novelai.vibes_empty")), 3)) : w("", !0),
			(p(!0), _(j, null, u(U.value, (e) => (p(), T(ae, {
				key: e.id,
				"model-value": m.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => W(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			y.value.length > 0 ? (p(), _("div", {
				key: 1,
				class: M(S($).risk_banner),
				"data-testid": "novelai-ignored"
			}, [E("p", { class: M(S($).risk_banner_title) }, k(S(a)("settings.novelai.ignored_title")), 3), (p(!0), _(j, null, u(y.value, (e) => (p(), _("p", {
				key: e,
				class: M(S($).risk_banner_description)
			}, k(S(Rt)(S(a), e)), 3))), 128))], 2)) : w("", !0),
			v.value === null ? w("", !0) : (p(), _("p", {
				key: 2,
				class: M(S($).status_text),
				role: "alert"
			}, k(v.value), 3)),
			E("div", { class: M(S($).actions_row) }, [F(H, {
				label: S(a)("settings.novelai.save"),
				variant: "primary",
				pending: G.value === "saving",
				disabled: v.value !== null,
				onClick: te
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), E("span", {
				class: M(S($).status_text),
				role: "status"
			}, k(G.value === "saved" ? S(a)("settings.novelai.saved") : G.value === "failed" ? S(a)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Vt = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Ht(e, t) {
	switch (t) {
		case "sd_webui": return e("settings.provider_profiles.provider_types.sd_webui");
		case "novelai": return e("settings.provider_profiles.provider_types.novelai");
		case "comfyui": return e("settings.provider_profiles.provider_types.comfyui");
		case "openai_image": return e("settings.provider_profiles.provider_types.openai_image");
		case "google_image": return e("settings.provider_profiles.provider_types.google_image");
	}
}
//#endregion
//#region src/ui/views/settings/ProviderProfiles.vue?vue&type=script&setup=true&lang.ts
var Ut = ["id", "aria-describedby"], Wt = ["id", "aria-describedby"], Gt = ["id", "aria-describedby"], Kt = ["id", "aria-describedby"], qt = /* @__PURE__ */ P({
	__name: "ProviderProfiles",
	props: {
		profiles: {},
		promptTagPresets: {},
		controller: {}
	},
	setup(e) {
		let n = e;
		function r(e) {
			return {
				profile: e,
				custom_presets: n.promptTagPresets,
				save: (e, t) => n.controller.save_prompt_tags(e, t)
			};
		}
		let { t: i } = D(), o = C(!1), s = C(null), c = C(!1), l = C(null), f = C(null), m = C(!1), h = C(null), y = C(""), b = C(!1), x = C(null), A = C(/* @__PURE__ */ new Map()), N = Vt.map((e) => ({
			value: e,
			label: Ht(i, e)
		})), P = O({
			get: () => s.value?.provider_id ?? "sd_webui",
			set: (e) => {
				s.value && (s.value.provider_id = e, s.value.workflow_id = "", e === "novelai" && !ee.has(s.value.model_id) && (s.value.model_id = ue));
			}
		}), ee = new Set(a.map((e) => e.model_id)), I = a.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		}));
		function L() {
			s.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				is_default: n.profiles.length === 0
			}, l.value = null, o.value = !0;
		}
		function R(e) {
			s.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				is_default: e.is_default
			}, l.value = null, o.value = !0;
		}
		function z() {
			o.value = !1, s.value = null, l.value = null;
		}
		async function B() {
			let e = s.value;
			if (!e || c.value) return;
			let r = e.display_name.trim(), a = e.model_id.trim(), o = e.provider_id === "comfyui" ? t.safeParse(e.workflow_id.trim()) : null;
			if (r.length === 0 || a.length === 0 || e.provider_id === "comfyui" && o?.success !== !0) {
				l.value = i("errors.validation_required");
				return;
			}
			c.value = !0, l.value = null;
			try {
				await n.controller.save_provider_profile({
					id: e.id,
					provider_id: e.provider_id,
					display_name: r,
					model_id: a,
					workflow_id: e.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					is_default: e.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), z();
			} catch {
				l.value = i("errors.unexpected");
			} finally {
				c.value = !1;
			}
		}
		function V(e) {
			f.value = e;
		}
		async function U() {
			let e = f.value;
			if (!(!e || m.value)) {
				m.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), f.value = null;
				} finally {
					m.value = !1;
				}
			}
		}
		function W(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function te(e) {
			h.value = e, y.value = "", x.value = null;
		}
		function ne() {
			h.value = null, y.value = "", x.value = null;
		}
		async function q() {
			let e = h.value;
			if (!(!e || b.value)) {
				if (y.value.trim().length === 0) {
					x.value = i("errors.validation_required");
					return;
				}
				b.value = !0, x.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, y.value), ne();
				} catch {
					x.value = i("settings.credential_storage.unlock_required");
				} finally {
					b.value = !1, y.value = "";
				}
			}
		}
		async function J(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				h.value = e, y.value = "", x.value = i("settings.credential_storage.unlock_required");
			}
		}
		async function ie(e) {
			A.value.set(e.id, {
				pending: !0,
				label: null
			}), A.value = new Map(A.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${i("status.success")} · ${i("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : i("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				A.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				A.value.set(e.id, {
					pending: !1,
					label: i("errors.unexpected")
				});
			}
			A.value = new Map(A.value);
		}
		return (t, n) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "provider-profiles"
		}, [
			E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(i)("settings.sections.provider_profiles")), 3), F(H, {
				label: S(i)("settings.provider_profiles.add_action"),
				variant: e.profiles.length === 0 ? "primary" : "secondary",
				onClick: L
			}, null, 8, ["label", "variant"])], 2),
			F(G, {
				status: e.profiles.length === 0 ? "empty" : "ready",
				"empty-message": S(i)("settings.provider_profiles.empty_description")
			}, {
				default: g(() => [E("div", null, [(p(!0), _(j, null, u(e.profiles, (e) => (p(), _("div", {
					key: e.id,
					class: M(S($).profile_row),
					"data-testid": "provider-profile-row"
				}, [E("div", { class: M(S($).profile_identity) }, [
					E("span", { class: M(S($).profile_name) }, k(e.display_name), 3),
					E("span", { class: M(S($).profile_meta) }, k(S(Ht)(S(i), e.provider_id)), 3),
					W(e.provider_id) ? (p(), _("span", {
						key: 0,
						class: M(S($).profile_meta)
					}, k(e.credential_reference ? S(i)("settings.provider_profiles.credential_set") : S(i)("settings.provider_profiles.credential_unset")), 3)) : w("", !0),
					A.value.get(e.id)?.label ? (p(), _("span", {
						key: 1,
						class: M(S($).profile_meta),
						"data-testid": "profile-test-result"
					}, k(A.value.get(e.id)?.label), 3)) : w("", !0),
					E("div", { class: M(S($).prompt_tag_row) }, [F(oe, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), F(oe, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), E("div", { class: M(S($).profile_actions) }, [
					e.is_default ? (p(), _("span", {
						key: 0,
						class: M(S($).badge)
					}, k(S(i)("settings.provider_profiles.default_badge")), 3)) : w("", !0),
					F(H, {
						label: S(i)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: A.value.get(e.id)?.pending === !0,
						onClick: (t) => ie(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					W(e.provider_id) ? (p(), T(H, {
						key: 1,
						label: S(i)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => te(e)
					}, null, 8, ["label", "onClick"])) : w("", !0),
					W(e.provider_id) && e.credential_reference !== null ? (p(), T(H, {
						key: 2,
						label: S(i)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => J(e)
					}, null, 8, ["label", "onClick"])) : w("", !0),
					F(H, {
						label: S(i)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => R(e)
					}, null, 8, ["label", "onClick"]),
					F(H, {
						label: S(i)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => V(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			F(re, {
				open: o.value,
				title: s.value?.is_new ? S(i)("settings.provider_profiles.dialog_add_title") : S(i)("settings.provider_profiles.dialog_edit_title"),
				"close-label": S(i)("common.actions.close"),
				"onUpdate:open": n[6] ||= (e) => !e && z()
			}, {
				default: g(() => [s.value ? (p(), _("div", {
					key: 0,
					class: M(S($).form_grid)
				}, [
					F(Y, {
						label: S(i)("common.labels.name"),
						required: ""
					}, {
						default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => s.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: M(S($).text_input)
						}, null, 10, Ut), [[v, s.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					F(Y, {
						label: S(i)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: g(({ fieldId: e }) => [F(K, {
							id: e,
							modelValue: P.value,
							"onUpdate:modelValue": n[1] ||= (e) => P.value = e,
							options: S(N),
							placeholder: S(i)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					s.value.provider_id === "novelai" ? (p(), T(Y, {
						key: 0,
						label: S(i)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: g(({ fieldId: e }) => [F(K, {
							id: e,
							modelValue: s.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => s.value.model_id = e,
							options: S(I),
							placeholder: S(i)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (p(), T(Y, {
						key: 1,
						label: S(i)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => s.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: M(S($).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Wt), [[v, s.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					s.value.provider_id === "comfyui" ? (p(), T(Y, {
						key: 2,
						label: S(i)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => s.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: M(S($).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Gt), [[v, s.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : w("", !0),
					F(Te, {
						modelValue: s.value.is_default,
						"onUpdate:modelValue": n[5] ||= (e) => s.value.is_default = e,
						label: S(i)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					l.value ? (p(), _("p", {
						key: 3,
						class: M([S($).status_text, S($).description]),
						"data-tone": "error"
					}, k(l.value), 3)) : w("", !0),
					E("div", { class: M(S($).actions_row) }, [F(H, {
						label: S(i)("common.actions.save"),
						pending: c.value,
						onClick: B
					}, null, 8, ["label", "pending"]), F(H, {
						label: S(i)("common.actions.cancel"),
						variant: "secondary",
						onClick: z
					}, null, 8, ["label"])], 2)
				], 2)) : w("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			F(re, {
				open: h.value !== null,
				title: S(i)("settings.provider_profiles.credential_dialog_title", { name: h.value?.display_name ?? "" }),
				description: S(i)("settings.provider_profiles.credential_dialog_description"),
				"close-label": S(i)("common.actions.close"),
				"onUpdate:open": n[8] ||= (e) => !e && ne()
			}, {
				default: g(() => [E("div", { class: M(S($).form_grid) }, [F(Y, {
					label: S(i)("settings.provider_profiles.credential_label"),
					error: x.value,
					required: ""
				}, {
					default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
						id: e,
						"onUpdate:modelValue": n[7] ||= (e) => y.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: M(S($).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Kt), [[v, y.value]])]),
					_: 1
				}, 8, ["label", "error"]), E("div", { class: M(S($).actions_row) }, [F(H, {
					label: S(i)("common.actions.save"),
					pending: b.value,
					onClick: q
				}, null, 8, ["label", "pending"]), F(H, {
					label: S(i)("common.actions.cancel"),
					variant: "secondary",
					onClick: ne
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			F(Ee, {
				open: f.value !== null,
				title: S(i)("settings.provider_profiles.remove_confirm_title", { name: f.value?.display_name ?? "" }),
				description: S(i)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": S(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": S(i)("confirmations.destructive.default_cancel_action"),
				pending: m.value,
				"onUpdate:open": n[9] ||= (e) => !e && (f.value = null),
				onConfirm: U
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label",
				"cancel-label",
				"pending"
			])
		], 2));
	}
}), Jt = ["id", "aria-describedby"], Yt = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Xt = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], Zt = 200, Qt = /* @__PURE__ */ P({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = D(), r = O(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = O(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = C(""), c = C("idle");
		async function l() {
			let e = s.value.trim();
			if (e !== "") {
				c.value = "saving";
				try {
					await t.controller.set_deepl_key(e), s.value = "", c.value = "saved";
				} catch {
					c.value = "failed";
				}
			}
		}
		async function f() {
			c.value = "saving";
			try {
				await t.controller.clear_deepl_key(), c.value = "cleared";
			} catch {
				c.value = "failed";
			}
		}
		let m = O(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), y = C([]);
		h(() => r.value?.glossary, (e) => {
			y.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function b() {
			y.value.length < Zt && y.value.push({
				source: "",
				target: ""
			});
		}
		function x(e) {
			y.value.splice(e, 1);
		}
		function w() {
			i({ glossary: y.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (p(), _("div", {
			class: M(S($).section),
			"data-testid": "translation-settings"
		}, [E("div", { class: M(S($).section_header) }, [E("h2", { class: M(S($).section_title) }, k(S(n)("settings.nav.translation")), 3)], 2), E("div", { class: M(S($).form_grid) }, [
			E("p", { class: M(S($).description) }, k(S(n)("settings.translation.description")), 3),
			F(Y, {
				label: S(n)("settings.translation.key_label"),
				hint: S(n)("settings.translation.key_hint")
			}, {
				default: g(({ fieldId: e, describedBy: t }) => [d(E("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: M(S($).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, Jt), [[v, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			E("div", { class: M(S($).actions_row) }, [
				F(H, {
					label: S(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				F(H, {
					label: S(n)("settings.translation.key_clear"),
					onClick: f
				}, null, 8, ["label"]),
				E("span", {
					class: M(S($).status_text),
					role: "status"
				}, k(m.value), 3)
			], 2),
			E("div", { class: M(S($).row) }, [E("span", { class: M(S($).row_label) }, k(S(n)("settings.translation.endpoint_label")), 3), F(Z, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: S(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			E("h3", { class: M(S($).section_title) }, k(S(n)("settings.translation.glossary_title")), 3),
			E("p", { class: M(S($).description) }, k(S(n)("settings.translation.glossary_description")), 3),
			(p(!0), _(j, null, u(y.value, (e, t) => (p(), _("div", {
				key: t,
				class: M(S($).actions_row),
				"data-testid": "glossary-row"
			}, [
				d(E("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": S(n)("settings.translation.glossary_source"),
					placeholder: S(n)("settings.translation.glossary_source"),
					class: M(S($).text_input)
				}, null, 10, Yt), [[v, e.source]]),
				d(E("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": S(n)("settings.translation.glossary_target"),
					placeholder: S(n)("settings.translation.glossary_target"),
					class: M(S($).text_input)
				}, null, 10, Xt), [[v, e.target]]),
				F(H, {
					label: S(n)("settings.translation.glossary_remove"),
					onClick: (e) => x(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			E("div", { class: M(S($).actions_row) }, [F(H, {
				label: S(n)("settings.translation.glossary_add"),
				disabled: y.value.length >= Zt,
				onClick: b
			}, null, 8, ["label", "disabled"]), F(H, {
				label: S(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: w
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), $t = ["aria-label"], en = [
	"data-selected",
	"aria-current",
	"onClick"
], tn = { class: "tc-visually-hidden" }, nn = /*@__PURE__*/ P({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = b(() => import("./PromptView-CYUgEK0h.js")), n = b(() => import("./AssetsView-DKXCDSLI.js")), r = b(() => import("./PromptTagPresetPanel-BRAfsP6B.js")), i = b(() => import("./DiagnosticsView-Dz1ikxEk.js")), a = e, { t: o } = D(), s = [
			"illustration",
			"providers",
			"translation",
			"prompts",
			"library",
			"general",
			"diagnostics"
		];
		function c(e) {
			switch (e) {
				case "illustration": return o("settings.nav.illustration");
				case "providers": return o("settings.nav.providers");
				case "translation": return o("settings.nav.translation");
				case "prompts": return o("settings.nav.prompts");
				case "library": return o("settings.nav.library");
				case "general": return o("settings.nav.general");
				case "diagnostics": return o("settings.nav.diagnostics");
			}
		}
		let l = O(() => a.state.settings_section), d = O(() => a.state.generation.profiles.find((e) => e.id === a.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function f(e, t) {
			return a.controller.test_prompt_regex(e, t);
		}
		return (a, m) => (p(), _("div", {
			class: M(S($).layout),
			"data-testid": "settings-view"
		}, [E("nav", {
			class: M(S($).section_nav),
			"aria-label": S(o)("nav.settings")
		}, [(p(), _(j, null, u(s, (t) => E("button", {
			key: t,
			type: "button",
			class: M(["tc-interactive", S($).section_nav_item]),
			"data-selected": t === l.value,
			"aria-current": t === l.value ? "page" : void 0,
			onClick: (n) => e.controller.set_settings_section(t)
		}, k(c(t)), 11, en)), 64))], 10, $t), E("div", { class: M(S($).section_content) }, [l.value === "prompts" ? (p(), _(j, { key: 0 }, [F(S(t), {
			state: e.state,
			"test-regex": f,
			onSelectPreset: m[0] ||= (t) => void e.controller.select_prompt_preset(t),
			onNewPreset: m[1] ||= (t) => e.controller.start_new_prompt_preset(),
			onBulkDeletePresets: m[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
			onUpdateDraft: m[3] ||= (t) => e.controller.update_prompt_draft(t),
			onSave: m[4] ||= (t) => void e.controller.save_prompt_preset(t)
		}, null, 8, ["state"]), F(S(r), {
			records: e.state.assets.records.prompt_tag,
			loading: e.state.loading.has("assets"),
			controller: e.controller
		}, null, 8, [
			"records",
			"loading",
			"controller"
		])], 64)) : l.value === "library" ? (p(), T(S(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : l.value === "diagnostics" ? (p(), T(S(i), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (p(), _("div", {
			key: 3,
			class: M(S($).view)
		}, [E("h1", tn, k(c(l.value)), 1), l.value === "illustration" ? (p(), T(Ft, {
			key: 0,
			settings: e.state.settings.settings,
			"prompt-presets": e.state.prompt.presets,
			controller: e.controller
		}, null, 8, [
			"settings",
			"prompt-presets",
			"controller"
		])) : l.value === "providers" ? (p(), _(j, { key: 1 }, [
			e.state.generation.profiles.length === 0 ? (p(), _("section", {
				key: 0,
				class: M(S($).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [E("div", {
				class: M(S($).onboarding_icon),
				"aria-hidden": "true"
			}, [F(I, {
				icon: S(De),
				size: 22
			}, null, 8, ["icon"])], 2), E("div", null, [
				E("p", { class: M(S($).onboarding_label) }, k(S(o)("settings.onboarding.label")), 3),
				E("h2", {
					id: "settings-onboarding-title",
					class: M(S($).onboarding_title)
				}, k(S(o)("settings.onboarding.title")), 3),
				E("p", { class: M(S($).onboarding_description) }, k(S(o)("settings.onboarding.description")), 3)
			])], 2)) : w("", !0),
			F(qt, {
				profiles: e.state.generation.profiles,
				"prompt-tag-presets": e.state.assets.records.prompt_tag,
				controller: e.controller
			}, null, 8, [
				"profiles",
				"prompt-tag-presets",
				"controller"
			]),
			d.value === null ? w("", !0) : (p(), T(Bt, {
				key: 1,
				profile: d.value,
				vibes: e.state.assets.records.vibe,
				controller: e.controller
			}, null, 8, [
				"profile",
				"vibes",
				"controller"
			]))
		], 64)) : l.value === "translation" ? (p(), T(Qt, {
			key: 2,
			settings: e.state.settings.settings,
			controller: e.controller
		}, null, 8, ["settings", "controller"])) : l.value === "general" ? (p(), _(j, { key: 3 }, [
			F(ht, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			F(bt, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			F(Ct, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				controller: e.controller
			}, null, 8, ["vocabulary-update-channel", "controller"])
		], 64)) : w("", !0)], 2))], 2)], 2));
	}
}), rn = /* @__PURE__ */ e({ default: () => an }), an = nn;
//#endregion
export { an as default, Q as n, Z as r, rn as t };
