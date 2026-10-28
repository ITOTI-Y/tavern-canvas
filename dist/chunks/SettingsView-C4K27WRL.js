import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { a as t } from "./ids-stC4fUL8.js";
import { i as n, o as r } from "./novelai-Dh4UVw5r.js";
import { i, t as a } from "./novelai_models-CXz0Nwhv.js";
import { c as o, n as s, s as c, t as l } from "./http_origin-NLkLJD5s.js";
import { A as u, D as d, F as f, G as p, I as m, N as h, O as g, V as _, W as v, _ as y, a as b, at as x, b as S, c as C, ct as w, et as T, g as E, h as D, m as O, n as k, p as A, pt as j, s as M, u as N, ut as P, v as ee, x as F, y as I } from "./vue-i18n-DUz2Gjn8.js";
import { n as L, t as R } from "./AppIcon-Cnhzrx9o.js";
import { _ as z, a as B, b as te, g as V, h as H, i as U, n as W, o as G, r as ne, t as K, x as re, y as q } from "./AppSelect-CRHyq1ex.js";
import { a as ie, i as J, n as ae, o as oe, r as se, t as ce } from "./PromptTagChips-DuVZRo9M.js";
import { n as le, t as Y } from "./FieldGroup-5lMIUNw6.js";
import { n as ue } from "./deferred_stylesheets-BpS7LWkd.js";
import "./browser_secret_vault-CnTo7PwU.js";
import { n as de, t as fe } from "./novelai_request_defaults-B0sJ9ANr.js";
import { A as pe, C as me, M as he, _ as ge, c as _e, d as ve, i as ye, j as be, m as xe, p as Se, v as Ce, x as we } from "./Teleport-CZ6NJvBB.js";
import { o as Te } from "./FocusScope-DyrFWv3K.js";
import { c as Ee } from "./PopperContent-8IQaFABb.js";
import { n as De, t as Oe } from "./ConfirmDialog-CcAJItG1.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/cable.js
var ke = L("cable", [
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
function Ae(e) {
	let t = T(!1);
	function n() {
		t.value = !0;
	}
	function r(n) {
		g(() => {
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
function je() {
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
function Me(e) {
	let t = ve({ locale: T("en") });
	return A(() => e?.value || t.locale?.value || "en");
}
//#endregion
//#region ../../node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var Ne = /* @__PURE__ */ new Map(), Pe = !1;
try {
	Pe = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var Fe = !1;
try {
	Fe = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var Ie = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } }, Le = class {
	constructor(e, t = {}) {
		this.numberFormatter = Re(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		if (t = !Pe && this.options.signDisplay != null ? ze(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), this.options.style === "unit" && !Fe) {
			let { unit: e, unitDisplay: n = "short", locale: r } = this.resolvedOptions();
			if (!e) return t;
			let i = Ie[e]?.[n];
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
		return !Pe && this.options.signDisplay != null && (e = {
			...e,
			signDisplay: this.options.signDisplay
		}), !Fe && this.options.style === "unit" && (e = {
			...e,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		}), e;
	}
};
function Re(e, t = {}) {
	let { numberingSystem: n } = t;
	if (n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`), t.style === "unit" && !Fe) {
		let { unit: e, unitDisplay: n = "short" } = t;
		if (!e) throw Error("unit option must be provided with style: \"unit\"");
		if (!Ie[e]?.[n]) throw Error(`Unsupported unit ${e} with unitDisplay = ${n}`);
		t = {
			...t,
			style: "decimal"
		};
	}
	let r = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (Ne.has(r)) return Ne.get(r);
	let i = new Intl.NumberFormat(e, t);
	return Ne.set(r, i), i;
}
function ze(e, t, n) {
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
var Be = /* @__PURE__ */ RegExp("^.*\\(.*\\).*$"), Ve = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
], He = class {
	constructor(e, t = {}) {
		this.locale = e, this.options = t;
	}
	parse(e) {
		return We(this.locale, this.options, e).parse(e);
	}
	isValidPartialNumber(e, t, n) {
		return We(this.locale, this.options, e).isValidPartialNumber(e, t, n);
	}
	getNumberingSystem(e) {
		return We(this.locale, this.options, e).options.numberingSystem;
	}
}, Ue = /* @__PURE__ */ new Map();
function We(e, t, n) {
	let r = Ge(e, t);
	if (!e.includes("-nu-") && !r.isValidPartialNumber(n)) {
		for (let i of Ve) if (i !== r.options.numberingSystem) {
			let r = Ge(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + i, t);
			if (r.isValidPartialNumber(n)) return r;
		}
	}
	return r;
}
function Ge(e, t) {
	let n = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : ""), r = Ue.get(n);
	return r || (r = new Ke(e, t), Ue.set(n, r)), r;
}
var Ke = class {
	constructor(e, t = {}) {
		this.locale = e, t.roundingIncrement !== 1 && t.roundingIncrement != null && (t.maximumFractionDigits == null && t.minimumFractionDigits == null ? (t.maximumFractionDigits = 0, t.minimumFractionDigits = 0) : t.maximumFractionDigits == null ? t.maximumFractionDigits = t.minimumFractionDigits : t.minimumFractionDigits ??= t.maximumFractionDigits), this.formatter = new Intl.NumberFormat(e, t), this.options = this.formatter.resolvedOptions(), this.symbols = Ye(e, this.formatter, this.options, t), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
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
			return new He(this.locale, e).parse(new Le(this.locale, e).format(r));
		}
		return this.options.currencySign === "accounting" && Be.test(e) && (r = -1 * r), r;
	}
	sanitize(e) {
		let t = this.formatter.resolvedOptions().useGrouping;
		return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((t) => t.unit === e) ? this.symbols.noNumeralUnits.find((t) => t.unit === e).value.toString() : (e = e.replace(this.symbols.literals, ""), this.symbols.minusSign && (e = e.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (e = X(e, ",", this.symbols.decimal), e = X(e, "،", this.symbols.decimal)), this.symbols.group && t && (e = X(e, ".", this.symbols.group))), this.symbols.group === "’" && e.includes("'") && t && (e = X(e, "'", this.symbols.group)), this.symbols.group === "'" && e.includes("’") && t && (e = X(e, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && t && (e = X(e, " ", this.symbols.group), e = X(e, /\u00A0/g, this.symbols.group)), e);
	}
	isValidPartialNumber(e, t = -Infinity, n = Infinity) {
		let r = this.formatter.resolvedOptions().useGrouping;
		return e = this.sanitize(e), this.symbols.minusSign && e.startsWith(this.symbols.minusSign) && t < 0 ? e = e.slice(this.symbols.minusSign.length) : this.symbols.plusSign && e.startsWith(this.symbols.plusSign) && n > 0 && (e = e.slice(this.symbols.plusSign.length)), this.symbols.decimal && e.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && r && (e = X(e, this.symbols.group, "")), e = e.replace(this.symbols.numeral, ""), this.symbols.decimal && (e = e.replace(this.symbols.decimal, "")), e.length === 0);
	}
}, qe = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]), Je = [
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
function Ye(e, t, n, r) {
	let i = new Intl.NumberFormat(e, {
		...n,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: !0
	}), a = i.formatToParts(-10000.111), o = i.formatToParts(10000.111), s = Je.map((e) => i.formatToParts(e)), c = s.map((e, t) => {
		let n = e.find((e) => e.type === "unit");
		return n && !e.some((e) => e.type === "integer" || e.type === "fraction") ? {
			unit: n.value,
			value: Je[t]
		} : null;
	}).filter((e) => !!e), l = a.find((e) => e.type === "minusSign")?.value ?? "-", u = o.find((e) => e.type === "plusSign")?.value;
	!u && (r?.signDisplay === "exceptZero" || r?.signDisplay === "always") && (u = "+");
	let d = new Intl.NumberFormat(e, {
		...n,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((e) => e.type === "decimal")?.value, f = a.find((e) => e.type === "group")?.value, p = a.filter((e) => !qe.has(e.type)).map((e) => Xe(e.value)), m = s.flatMap((e) => e.filter((e) => !qe.has(e.type)).map((e) => Xe(e.value))), h = [.../* @__PURE__ */ new Set([...p, ...m])].sort((e, t) => t.length - e.length), g = h.length === 0 ? /* @__PURE__ */ RegExp("\\p{White_Space}|\\p{Cf}", "gu") : RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), _ = [...new Intl.NumberFormat(n.locale, { useGrouping: !1 }).format(9876543210)].reverse(), v = new Map(_.map((e, t) => [e, t])), y = RegExp(`[${_.join("")}]`, "g");
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
function Xe(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function Ze(e) {
	let { disabled: t } = e, n = T(), r = Ce(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = T(!1), l = A(() => Se(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return we && (xe(l || window, "pointerdown", u), xe(window, "pointerup", d), xe(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Qe(e, t = T({})) {
	return me(() => new Le(e.value, t.value));
}
function $e(e, t = T({})) {
	return me(() => new He(e.value, t.value));
}
function et(e, t, n) {
	let r = e === "+" ? t + n : t - n;
	if (t % 1 != 0 || n % 1 != 0) {
		let i = t.toString().split("."), a = n.toString().split("."), o = i[1] && i[1].length || 0, s = a[1] && a[1].length || 0, c = 10 ** Math.max(o, s);
		t = Math.round(t * c), n = Math.round(n * c), r = e === "+" ? t + n : t - n, r /= c;
	}
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [tt, nt] = /*#__PURE__*/ he("NumberFieldRoot"), rt = /* @__PURE__ */ F({
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
		let n = e, r = t, { disabled: i, readonly: a, disableWheelChange: o, invertWheelChange: s, min: c, max: l, step: u, stepSnapping: f, formatOptions: p, id: g, locale: _ } = x(n), y = ge(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { primitiveElement: b, currentElement: S } = H(), C = Me(_), O = z(S), k = T(), j = A(() => pe(y.value) || isNaN(y.value) ? !1 : N("decrease", y.value) >= y.value), M = A(() => pe(y.value) || isNaN(y.value) ? !1 : N("increase", y.value) <= y.value);
		function N(e, t, n = 1) {
			let r = u.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (f.value && !isNaN(r)) {
				let o = te(t, c.value, l.value, r);
				if (o === t) a = et(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : et("+", o, r) : o < t ? o : et("-", o, r);
					a = n > 1 ? et(i, s, r * (n - 1)) : s;
				}
			} else a = et(i, t, r * n);
			return K(a);
		}
		function P(e, t = 1) {
			if (n.focusOnChange && k.value?.focus(), n.disabled || n.readonly) return;
			let r = R.parse(k.value?.value ?? "");
			if (isNaN(r)) {
				y.value = K(c.value ?? 0);
				return;
			}
			y.value = N(e, r, t);
		}
		function ee(e = 1) {
			P("increase", e);
		}
		function F(e = 1) {
			P("decrease", e);
		}
		function I(e) {
			e === "min" && c.value !== void 0 ? y.value = K(c.value) : e === "max" && l.value !== void 0 && (y.value = K(l.value));
		}
		let L = Qe(C, p), R = $e(C, p), B = A(() => L.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), V = Qe(C, p), U = A(() => pe(y.value) || isNaN(y.value) ? "" : V.format(y.value));
		function W(e) {
			return R.isValidPartialNumber(e, c.value, l.value);
		}
		function ne(e) {
			k.value && (k.value.value = e);
		}
		function K(e) {
			let t;
			return t = u.value === void 0 || isNaN(u.value) || !f.value ? q(e, c.value, l.value) : te(e, c.value, l.value, u.value), t = R.parse(L.format(t)), t;
		}
		function re(e) {
			let t = R.parse(e);
			return y.value = isNaN(t) ? void 0 : K(t), e.length ? ne(U.value) : ne(e);
		}
		return nt({
			modelValue: y,
			handleDecrease: F,
			handleIncrease: ee,
			handleMinMaxValue: I,
			inputMode: B,
			inputEl: k,
			onInputElement: (e) => k.value = e,
			textValue: U,
			readonly: a,
			validate: W,
			applyInputValue: re,
			disabled: i,
			disableWheelChange: o,
			invertWheelChange: s,
			max: l,
			min: c,
			isDecreaseDisabled: j,
			isIncreaseDisabled: M,
			id: g
		}), (e, t) => (h(), D(w(ye), d(e.$attrs, {
			ref_key: "primitiveElement",
			ref: b,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": w(i) ? "" : void 0,
			"data-readonly": w(a) ? "" : void 0
		}), {
			default: v(() => [m(e.$slots, "default", {
				modelValue: w(y),
				textValue: U.value,
				readonly: w(a)
			}), w(O) && e.name ? (h(), D(w(G), {
				key: 0,
				type: "text",
				value: w(y),
				name: e.name,
				disabled: w(i),
				readonly: w(a),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : E("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), it = /* @__PURE__ */ F({
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
		let t = e, n = tt(), r = A(() => n.disabled?.value || n.readonly.value || t.disabled || n.isDecreaseDisabled.value), { primitiveElement: i, currentElement: a } = H(), { isPressed: o, onTrigger: s } = Ze({
			target: a,
			disabled: r
		});
		return s(() => {
			n.handleDecrease();
		}), (e, n) => (h(), D(w(ye), d(t, {
			ref_key: "primitiveElement",
			ref: i,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: w(o) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": w(o) ? "true" : void 0,
			onContextmenu: n[0] ||= C(() => {}, ["prevent"])
		}), {
			default: v(() => [m(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), at = /* @__PURE__ */ F({
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
		let t = e, n = tt(), r = A(() => n.disabled?.value || n.readonly.value || t.disabled || n.isIncreaseDisabled.value), { primitiveElement: i, currentElement: a } = H(), { isPressed: o, onTrigger: s } = Ze({
			target: a,
			disabled: r
		});
		return s(() => {
			n.handleIncrease();
		}), (e, n) => (h(), D(w(ye), d(t, {
			ref_key: "primitiveElement",
			ref: i,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: w(o) ? "none" : void 0 },
			disabled: r.value ? "" : void 0,
			"data-disabled": r.value ? "" : void 0,
			"data-pressed": w(o) ? "true" : void 0,
			onContextmenu: n[0] ||= C(() => {}, ["prevent"])
		}), {
			default: v(() => [m(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), ot = /* @__PURE__ */ F({
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
		let t = e, { primitiveElement: n, currentElement: r } = H(), i = tt(), a = je(), { isComposing: o, handleCompositionStart: s, handleCompositionEnd: c } = Ae();
		function l(e) {
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
		function f(e) {
			i.disableWheelChange.value || e.target === Te() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? i.invertWheelChange.value ? i.handleDecrease() : i.handleIncrease() : e.deltaY < 0 && (i.invertWheelChange.value ? i.handleIncrease() : i.handleDecrease())));
		}
		u(() => {
			i.onInputElement(r.value);
		});
		let p = T(i.textValue.value);
		_(() => i.textValue.value, () => {
			p.value = i.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function g() {
			requestAnimationFrame(() => {
				p.value = i.textValue.value;
			});
		}
		return (e, r) => (h(), D(w(ye), d(t, {
			id: w(i).id.value,
			ref_key: "primitiveElement",
			ref: n,
			value: p.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: w(i).inputMode.value,
			disabled: w(i).disabled.value ? "" : void 0,
			"data-disabled": w(i).disabled.value ? "" : void 0,
			readonly: w(i).readonly.value ? "" : void 0,
			"data-readonly": w(i).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": w(i).modelValue.value,
			"aria-valuemin": w(i).min.value,
			"aria-valuemax": w(i).max.value,
			onKeydown: l,
			onWheel: f,
			onBeforeinput: r[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				w(i).validate(n) || e.preventDefault();
			},
			onInput: r[1] ||= (e) => {
				let t = e.target;
				p.value = t.value;
			},
			onChange: g,
			onBlur: r[2] ||= (e) => w(i).applyInputValue(e.target?.value),
			onCompositionstart: w(s),
			onCompositionend: w(c)
		}), {
			default: v(() => [m(e.$slots, "default")]),
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
}), st = "radio.select";
function ct(e, t, n) {
	be(st, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var lt = /* @__PURE__ */ F({
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
		let n = e, r = t, i = ge(n, "checked", r, { passive: n.checked === void 0 }), { value: a } = x(n), { forwardRef: o, currentElement: s } = _e(), c = z(s), l = V(), u = A(() => n.id && s.value ? document.querySelector(`[for="${n.id}"]`)?.innerText ?? n.value : void 0);
		function f(e) {
			n.disabled || ct(e, n.value, (e) => {
				r("select", e), !e?.defaultPrevented && (i.value = !0, c.value && e.stopPropagation());
			});
		}
		return (e, t) => (h(), y(N, null, [I(w(ye), d({
			id: e.id,
			ref: w(o),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": w(i) ?? !1,
			"aria-label": u.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": w(i) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: w(a),
			required: e.required,
			name: e.name
		}, {
			...w(l),
			...e.$attrs
		}, { onClick: C(f, ["stop"]) }), {
			default: v(() => [m(e.$slots, "default", { checked: w(i) })]),
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
		]), w(c) && e.name ? (h(), D(w(G), d({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: w(a),
			checked: !!w(i),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, w(l)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : E("v-if", !0)], 64));
	}
}), [ut, dt] = /*#__PURE__*/ he("RadioGroupRoot"), ft = /* @__PURE__ */ F({
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
		let n = e, r = t, { forwardRef: i, currentElement: a } = _e(), o = ge(n, "modelValue", r, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: s, loop: c, orientation: l, name: u, required: d, dir: f } = x(n), p = Ee(f), g = z(a);
		return dt({
			modelValue: o,
			changeModelValue: (e) => {
				o.value = e;
			},
			disabled: s,
			loop: c,
			orientation: l,
			name: u?.value,
			required: d
		}), (e, t) => (h(), D(w(ie), {
			"as-child": "",
			orientation: w(l),
			dir: w(p),
			loop: w(c)
		}, {
			default: v(() => [I(w(ye), {
				ref: w(i),
				role: "radiogroup",
				"data-disabled": w(s) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": w(l),
				"aria-required": w(d),
				dir: w(p)
			}, {
				default: v(() => [m(e.$slots, "default", { modelValue: w(o) }), w(g) && w(u) ? (h(), D(w(G), {
					key: 0,
					required: w(d),
					disabled: w(s),
					value: w(o),
					name: w(u)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : E("v-if", !0)]),
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
}), [pt, mt] = /*#__PURE__*/ he("RadioGroupItem"), ht = /* @__PURE__ */ F({
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
		let n = e, r = t, { forwardRef: i, currentElement: a } = _e(), o = ut(), s = A(() => o.disabled.value || n.disabled), c = A(() => o.required.value || n.required), l = A(() => re(o.modelValue?.value, n.value));
		mt({
			disabled: s,
			checked: l
		});
		let u = T(!1), f = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		xe("keydown", (e) => {
			f.includes(e.key) && (u.value = !0);
		}), xe("keyup", () => {
			u.value = !1;
		});
		function p() {
			setTimeout(() => {
				u.value && a.value?.click();
			}, 0);
		}
		let g = V();
		return (e, t) => (h(), D(w(J), {
			checked: l.value,
			disabled: s.value,
			"as-child": "",
			focusable: !s.value,
			active: l.value
		}, {
			default: v(() => [I(lt, d({
				...w(g),
				...e.$attrs,
				...n
			}, {
				ref: w(i),
				checked: l.value,
				required: c.value,
				disabled: s.value,
				"onUpdate:checked": t[0] ||= (t) => w(o).changeModelValue(e.value),
				onSelect: t[1] ||= (e) => r("select", e),
				onKeydown: t[2] ||= M(C(() => {}, ["prevent"]), ["enter"]),
				onFocus: p
			}), {
				default: v(() => [m(e.$slots, "default", {
					checked: l.value,
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
}), Z = /* @__PURE__ */ F({
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
		return (t, n) => (h(), D(w(ft), {
			class: P(w(B).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": r
		}, {
			default: v(() => [(h(!0), y(N, null, f(e.options, (e) => (h(), D(w(ht), {
				key: e.value,
				class: P(["tc-interactive", w(B).segmentedControlItem]),
				value: e.value
			}, {
				default: v(() => [O("span", { class: P(w(B).segmentedControlItemLabel) }, j(e.label), 3)]),
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
}), Q = /* @__PURE__ */ F({
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
		let a = A(() => W({
			id: n.id,
			min: n.min,
			max: n.max
		})), o = A(() => W({
			"aria-label": n.label,
			"aria-describedby": n.describedBy
		}));
		return (t, n) => (h(), D(w(rt), d(a.value, {
			class: w(B).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": i
		}), {
			default: v(() => [
				I(w(it), {
					class: P(["tc-interactive", w(B).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: v(() => [I(R, {
						icon: w(oe),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				I(w(ot), d(o.value, { class: ["tc-tabular-nums", w(B).numberStepperInput] }), null, 16, ["class"]),
				I(w(at), {
					class: P(["tc-interactive", w(B).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: v(() => [I(R, {
						icon: w(le),
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
}), gt = {
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
ue("settings", "._view_1rqoj_7{flex-direction:column;gap:32px;width:min(100%,920px);margin:0 auto;padding:24px;display:flex}._onboarding_1rqoj_16{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px;display:grid}._onboarding_icon_1rqoj_25{width:48px;height:48px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._onboarding_label_1rqoj_37{color:var(--tc-accent);margin-bottom:4px;font-size:12px;font-weight:650}._onboarding_title_1rqoj_44{color:var(--tc-text);font-size:22px;font-weight:680;line-height:1.2}._onboarding_description_1rqoj_51{max-width:62ch;color:var(--tc-text-muted);margin-top:8px;line-height:1.55}@media (width<=639px){._view_1rqoj_7{gap:24px;padding:20px 16px}._onboarding_1rqoj_16{grid-template-columns:minmax(0,1fr);padding:20px}}._section_1rqoj_70{flex-direction:column;min-width:0;display:flex}._section_header_1rqoj_79{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;display:flex}._section_title_1rqoj_89{color:var(--tc-text);font-size:14px;font-weight:650}._row_1rqoj_95{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_1rqoj_104{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_1rqoj_112{color:var(--tc-text);flex:none}._profile_row_1rqoj_76{border-top:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_1rqoj_120{flex-direction:column;flex:12rem;gap:2px;min-width:0;display:flex}._profile_name_1rqoj_144{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_1rqoj_151{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_1rqoj_161{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;display:flex}._badge_1rqoj_169{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_1rqoj_178{flex-direction:column;gap:16px;display:flex}._status_text_1rqoj_184{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_1rqoj_184[data-tone=success]{color:var(--tc-success)}._status_text_1rqoj_184[data-tone=warning]{color:var(--tc-warning)}._status_text_1rqoj_184[data-tone=error]{color:var(--tc-error)}._risk_banner_1rqoj_204{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_1rqoj_204[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_1rqoj_218{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_1rqoj_204[data-severity=error] ._risk_banner_title_1rqoj_218{color:var(--tc-error)}._risk_banner_description_1rqoj_230{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_1rqoj_237{align-items:center;gap:8px;display:flex}._acknowledged_note_1rqoj_243{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_1rqoj_251{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_1rqoj_258{align-items:center;gap:12px;padding-top:8px;display:flex}._vault_mode_row_1rqoj_264{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;display:flex}._vault_mode_row_1rqoj_264 ._profile_meta_1rqoj_151{white-space:normal;text-overflow:clip;line-height:1.45;overflow:visible}._vault_controls_1rqoj_280{gap:14px;width:min(100%,520px);padding-top:16px;display:grid}._vault_controls_1rqoj_280>button{width:fit-content}._vault_unlocked_actions_1rqoj_291{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._text_input_1rqoj_298{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._text_area_1rqoj_308{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;min-height:72px;color:var(--tc-text);border-color:var(--tc-divider);font:inherit;resize:vertical;padding:8px 10px}._text_area_1rqoj_308:focus-visible,._text_input_1rqoj_298:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._layout_1rqoj_327{grid-template-columns:184px minmax(0,1fr);min-height:100%;display:grid}._section_nav_1rqoj_333{border-inline-end:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding:16px 8px;display:flex}._section_nav_item_1rqoj_341{border-radius:var(--tc-radius-field);color:var(--tc-text-muted);text-align:start;white-space:nowrap;padding:8px 12px}._section_nav_item_1rqoj_341[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised)}._section_content_1rqoj_354{min-width:0}@media (width<=767px){._layout_1rqoj_327{grid-template-columns:minmax(0,1fr)}._section_nav_1rqoj_333{border-inline-end:none;border-bottom:1px solid var(--tc-divider);flex-direction:row;padding:8px;overflow-x:auto}}._prompt_tag_row_1rqoj_372{flex-wrap:wrap;gap:6px;margin-top:4px;display:flex}");
var $ = gt, _t = /* @__PURE__ */ F({
	__name: "AppearanceSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = k(), r = {
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
		let a = A(() => [
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
		]), o = A(() => [
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
		return (t, r) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "appearance-settings"
		}, [O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(n)("settings.sections.appearance")), 3)], 2), O("div", { class: P(w($).form_grid) }, [
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.appearance.theme_label")), 3), I(Z, {
				"model-value": e.settings?.ui.color_mode ?? "system",
				options: a.value,
				label: w(n)("settings.appearance.theme_label"),
				"onUpdate:modelValue": s
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.appearance.language_label")), 3), I(Z, {
				"model-value": e.settings?.locale ?? "auto",
				options: o.value,
				label: w(n)("settings.appearance.language_label"),
				"onUpdate:modelValue": c
			}, null, 8, [
				"model-value",
				"options",
				"label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.appearance.inspector_width_label")), 3), I(Q, {
				"model-value": e.settings?.ui.inspector_width ?? 320,
				label: w(n)("settings.appearance.inspector_width_label"),
				min: 240,
				max: 720,
				step: 8,
				"increment-label": w(n)("common.actions.increase"),
				"decrement-label": w(n)("common.actions.decrease"),
				"onUpdate:modelValue": l
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			I(De, {
				"model-value": e.settings?.ui.optional_entry_enabled ?? !1,
				label: w(n)("settings.appearance.optional_entry_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": r[0] ||= (e) => i({ optional_entry_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])
		], 2)], 2));
	}
}), vt = ["data-tone"], yt = ["id", "aria-describedby"], bt = ["id", "aria-describedby"], xt = ["id", "aria-describedby"], St = /* @__PURE__ */ F({
	__name: "CredentialStorageSettings",
	props: {
		settings: {},
		vaultStatus: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = k(), r = T(""), i = T(""), a = T(!1), o = T(null), s = T(!1), c = A(() => [
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
		]), l = A({
			get: () => t.settings?.credential_storage_mode ?? "browser_device",
			set: (e) => {
				o.value = null, t.controller.update_settings({ credential_storage_mode: e }).catch(() => {
					o.value = n("errors.unexpected");
				});
			}
		}), u = A(() => {
			let e = { count: t.vaultStatus.secret_count };
			switch (t.vaultStatus.state) {
				case "unavailable": return n("settings.credential_storage.states.unavailable", e);
				case "error": return n("settings.credential_storage.states.error", e);
				case "uninitialized": return n("settings.credential_storage.states.uninitialized", e);
				case "locked": return n("settings.credential_storage.states.locked", e);
				case "unlocked": return n("settings.credential_storage.states.unlocked", e);
			}
		}), d = A(() => t.vaultStatus.state === "error" ? n("settings.credential_storage.error") : n("settings.credential_storage.unavailable"));
		function f() {
			r.value = "", i.value = "";
		}
		function m(e) {
			return r.value.length < 12 ? (o.value = n("settings.credential_storage.passphrase_too_short", { count: 12 }), !1) : e && r.value !== i.value ? (o.value = n("settings.credential_storage.passphrase_mismatch"), !1) : !0;
		}
		function g(e) {
			return typeof e == "object" && e && "code" in e && Reflect.get(e, "code") === "invalid_passphrase" ? n("settings.credential_storage.invalid_passphrase") : n("errors.unexpected");
		}
		async function _() {
			if (!(a.value || !m(!0))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.initialize_browser_secret_vault(r.value), await t.controller.update_settings({ credential_storage_mode: "browser_encrypted" }), f();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function x() {
			if (!(a.value || !m(!1))) {
				a.value = !0, o.value = null;
				try {
					await t.controller.unlock_browser_secret_vault(r.value), f();
				} catch (e) {
					o.value = g(e);
				} finally {
					a.value = !1;
				}
			}
		}
		async function S() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.lock_browser_secret_vault(), f();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		async function C() {
			if (!a.value) {
				a.value = !0, o.value = null;
				try {
					await t.controller.reset_browser_secret_vault(), s.value = !1, f();
				} catch {
					o.value = n("errors.unexpected");
				} finally {
					a.value = !1;
				}
			}
		}
		return (t, f) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "credential-storage-settings"
		}, [
			O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(n)("settings.sections.credential_storage")), 3), l.value === "browser_encrypted" ? (h(), y("span", {
				key: 0,
				class: P(w($).status_text),
				"data-tone": e.vaultStatus.state === "unlocked" ? "success" : void 0
			}, j(u.value), 11, vt)) : E("", !0)], 2),
			O("div", { class: P(w($).vault_mode_row) }, [O("div", { class: P(w($).profile_identity) }, [O("span", { class: P(w($).profile_name) }, j(w(n)("settings.credential_storage.mode_label")), 3), O("span", { class: P(w($).profile_meta) }, j(w(n)("settings.credential_storage.mode_hint")), 3)], 2), I(Z, {
				modelValue: l.value,
				"onUpdate:modelValue": f[0] ||= (e) => l.value = e,
				options: c.value,
				label: w(n)("settings.credential_storage.mode_label"),
				disabled: e.settings === null
			}, null, 8, [
				"modelValue",
				"options",
				"label",
				"disabled"
			])], 2),
			l.value === "browser_encrypted" ? (h(), y("div", {
				key: 0,
				class: P(w($).vault_controls)
			}, [e.vaultStatus.state === "unavailable" || e.vaultStatus.state === "error" ? (h(), y("p", {
				key: 0,
				class: P(w($).status_text),
				"data-tone": "error",
				role: "alert"
			}, j(d.value), 3)) : e.vaultStatus.state === "uninitialized" ? (h(), y(N, { key: 1 }, [
				I(Y, {
					label: w(n)("settings.credential_storage.passphrase_label"),
					hint: w(n)("settings.credential_storage.passphrase_hint", { count: w(12) }),
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": f[1] ||= (e) => r.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "browser-vault-passphrase"
					}, null, 10, yt), [[b, r.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				I(Y, {
					label: w(n)("settings.credential_storage.confirm_passphrase_label"),
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": f[2] ||= (e) => i.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "browser-vault-passphrase-confirmation"
					}, null, 10, bt), [[b, i.value]])]),
					_: 1
				}, 8, ["label"]),
				I(U, {
					label: w(n)("settings.credential_storage.initialize_action"),
					pending: a.value,
					onClick: _
				}, null, 8, ["label", "pending"])
			], 64)) : e.vaultStatus.state === "locked" ? (h(), y(N, { key: 2 }, [I(Y, {
				label: w(n)("settings.credential_storage.passphrase_label"),
				hint: w(n)("settings.credential_storage.unlock_hint"),
				required: ""
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": f[3] ||= (e) => r.value = e,
					type: "password",
					autocomplete: "current-password",
					"aria-describedby": t,
					class: P(w($).text_input),
					"data-testid": "browser-vault-passphrase",
					onKeydown: M(x, ["enter"])
				}, null, 42, xt), [[b, r.value]])]),
				_: 1
			}, 8, ["label", "hint"]), I(U, {
				label: w(n)("settings.credential_storage.unlock_action"),
				pending: a.value,
				onClick: x
			}, null, 8, ["label", "pending"])], 64)) : (h(), y("div", {
				key: 3,
				class: P(w($).vault_unlocked_actions)
			}, [I(U, {
				label: w(n)("settings.credential_storage.lock_action"),
				variant: "secondary",
				pending: a.value,
				onClick: S
			}, null, 8, ["label", "pending"]), I(U, {
				label: w(n)("settings.credential_storage.reset_action"),
				variant: "destructive",
				onClick: f[4] ||= (e) => s.value = !0
			}, null, 8, ["label"])], 2)), o.value ? (h(), y("p", {
				key: 4,
				class: P(w($).status_text),
				"data-tone": "error",
				role: "alert"
			}, j(o.value), 3)) : E("", !0)], 2)) : E("", !0),
			I(Oe, {
				open: s.value,
				title: w(n)("settings.credential_storage.reset_confirm_title"),
				description: w(n)("settings.credential_storage.reset_confirm_description"),
				"confirm-label": w(n)("settings.credential_storage.reset_action"),
				"cancel-label": w(n)("common.actions.cancel"),
				pending: a.value,
				"onUpdate:open": f[5] ||= (e) => s.value = e,
				onConfirm: C
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
}), Ct = ["aria-label"], wt = ["aria-label"], Tt = /* @__PURE__ */ F({
	__name: "DataSettings",
	props: {
		vocabularyUpdateChannel: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = k(), r = T(!1), i = [{
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
		let o = T(!1), s = T(!1), c = T(null), l = T(null), u = T(null);
		function d() {
			u.value?.click();
		}
		function f() {
			t.controller.cancel_vocabulary_import();
		}
		async function p(e) {
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
		let m = A(() => {
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
		}), g = T(!1), _ = T(null);
		async function v() {
			if (!g.value) {
				g.value = !0, _.value = null;
				try {
					let e = await t.controller.export_settings_archive(), n = URL.createObjectURL(e), r = document.createElement("a");
					r.href = n, r.download = "inkwell-archive.zip", r.click(), URL.revokeObjectURL(n);
				} catch {
					_.value = n("errors.unexpected");
				} finally {
					g.value = !1;
				}
			}
		}
		let b = T(!1), x = T(null), S = T(null);
		function C() {
			S.value?.click();
		}
		async function M(e) {
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
		return (t, l) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "data-settings"
		}, [O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(n)("settings.sections.data")), 3)], 2), O("div", { class: P(w($).form_grid) }, [
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.data.vocabulary_channel_label")), 3), I(Z, {
				"model-value": e.vocabularyUpdateChannel ?? "bundled",
				options: i,
				label: w(n)("settings.data.vocabulary_channel_label"),
				disabled: r.value,
				"onUpdate:modelValue": a
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			])], 2),
			O("div", { class: P(w($).actions_row) }, [
				I(U, {
					label: w(n)("settings.data.vocabulary_import.action"),
					variant: "secondary",
					pending: o.value,
					onClick: d
				}, null, 8, ["label", "pending"]),
				o.value ? (h(), D(U, {
					key: 0,
					label: w(n)("settings.data.vocabulary_import.cancel_action"),
					variant: "destructive",
					onClick: f
				}, null, 8, ["label"])) : E("", !0),
				O("input", {
					ref_key: "vocabulary_file_input",
					ref: u,
					type: "file",
					accept: ".json,.jsonl,.ndjson,application/json,application/x-ndjson",
					class: "tc-visually-hidden",
					"aria-label": w(n)("settings.data.vocabulary_import.action"),
					"data-testid": "vocabulary-import-input",
					onChange: p
				}, null, 40, Ct)
			], 2),
			O("p", { class: P(w($).description) }, j(w(n)("settings.data.vocabulary_import.description")), 3),
			m.value ? (h(), y("p", {
				key: 0,
				class: P([w($).status_text, w($).description]),
				"data-testid": "vocabulary-import-progress"
			}, j(m.value), 3)) : E("", !0),
			s.value ? (h(), y("p", {
				key: 1,
				class: P([w($).status_text, w($).description]),
				"data-tone": "success",
				"data-testid": "vocabulary-import-success"
			}, j(w(n)("settings.data.vocabulary_import.success")), 3)) : E("", !0),
			c.value ? (h(), y("p", {
				key: 2,
				class: P([w($).status_text, w($).description]),
				"data-tone": "error",
				"data-testid": "vocabulary-import-error"
			}, j(c.value), 3)) : E("", !0),
			O("div", { class: P(w($).actions_row) }, [
				I(U, {
					label: w(n)("settings.data.archive_export_action"),
					pending: g.value,
					onClick: v
				}, null, 8, ["label", "pending"]),
				I(U, {
					label: w(n)("settings.data.archive_import_action"),
					variant: "secondary",
					pending: b.value,
					onClick: C
				}, null, 8, ["label", "pending"]),
				O("input", {
					ref_key: "file_input",
					ref: S,
					type: "file",
					accept: ".zip,application/zip",
					class: "tc-visually-hidden",
					"aria-label": w(n)("settings.data.archive_import_action"),
					"data-testid": "archive-import-input",
					onChange: M
				}, null, 40, wt)
			], 2),
			O("p", { class: P(w($).description) }, j(w(n)("settings.data.archive_import_description")), 3),
			_.value ? (h(), y("p", {
				key: 3,
				class: P([w($).status_text, w($).description]),
				"data-tone": "error"
			}, j(_.value), 3)) : E("", !0),
			x.value ? (h(), y("p", {
				key: 4,
				class: P([w($).status_text, w($).description]),
				"data-tone": "error"
			}, j(x.value), 3)) : E("", !0)
		], 2)], 2));
	}
}), Et = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Dt = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Ot = ["id", "aria-describedby"], kt = ["id", "aria-describedby"], At = ["id", "aria-describedby"], jt = ["id", "aria-describedby"], Mt = ["id", "aria-describedby"], Nt = [
	"id",
	"aria-describedby",
	"disabled"
], Pt = [
	"id",
	"placeholder",
	"aria-describedby",
	"disabled"
], Ft = "in_use", It = "none", Lt = /* @__PURE__ */ F({
	__name: "IllustrationSettings",
	props: {
		settings: {},
		promptPresets: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = k(), r = A(() => t.settings?.illustration ?? null);
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
		let o = T(""), s = T(""), c = T(""), l = T(""), d = T(""), f = T(""), m = T(""), g = T("");
		_(r, (e) => {
			o.value = e === null || e.preset_name === Ft ? "" : e.preset_name, f.value = e?.wardrobe_model ?? "", m.value = e?.analysis_guidance ?? "", g.value = e?.wardrobe_guidance ?? "", e?.connection.kind === "proxy_preset" ? (s.value = e.connection.proxy_preset, c.value = e.connection.model ?? "") : e?.connection.kind === "custom" && (l.value = e.connection.api_url, d.value = e.connection.model);
		}, { immediate: !0 });
		function x() {
			a({ wardrobe_model: f.value.trim() || null });
		}
		function S() {
			a({ preset_name: o.value.trim() || Ft });
		}
		let C = A(() => [
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
		function D() {
			let e = s.value.trim();
			if (e === "") return null;
			let t = c.value.trim();
			return {
				kind: "proxy_preset",
				proxy_preset: e,
				model: t === "" ? null : t
			};
		}
		function M() {
			let e = l.value.trim(), t = d.value.trim();
			return t === "" || !URL.canParse(e) || !/^https?:$/u.test(new URL(e).protocol) ? null : {
				kind: "custom",
				api_url: e,
				model: t
			};
		}
		let ee = A(() => V.value === "custom" && l.value.trim() !== "" && M() === null);
		function F() {
			let e = M();
			e !== null && a({ connection: e });
		}
		let L = T(""), R = T("idle");
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
		let te = A(() => {
			switch (R.value) {
				case "saved": return n("settings.illustration.custom_key_saved");
				case "cleared": return n("settings.illustration.custom_key_cleared");
				case "failed": return n("settings.illustration.custom_key_failed");
				case "idle":
				case "saving": return "";
			}
		}), V = T(r.value?.connection.kind ?? "current");
		_(() => r.value?.connection.kind, (e) => {
			e !== void 0 && (V.value = e);
		});
		function H(e) {
			if (e === "current") V.value = "current", a({ connection: { kind: "current" } });
			else if (e === "proxy_preset") {
				V.value = "proxy_preset";
				let e = D();
				e !== null && a({ connection: e });
			} else e === "custom" && (V.value = "custom", F());
		}
		function W() {
			let e = D();
			e !== null && a({ connection: e });
		}
		let G = A(() => [{
			value: It,
			label: n("settings.illustration.prompt_preset_none")
		}, ...t.promptPresets.map((e) => ({
			value: e.id,
			label: e.display_name
		}))]);
		function ne(e) {
			a({ prompt_preset_id: t.promptPresets.find((t) => t.id === e)?.id ?? null });
		}
		let re = A(() => [
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
		]), q = T(r.value?.world_info.mode ?? "chat");
		_(() => r.value?.world_info.mode, (e) => {
			e !== void 0 && (q.value = e);
		});
		let ie = T([]), J = T(!1);
		async function ae() {
			try {
				ie.value = await t.controller.list_worldbooks(), J.value = !1;
			} catch {
				J.value = !0;
			}
		}
		u(() => {
			q.value === "worldbook" && ae();
		});
		let oe = A(() => r.value?.world_info.mode === "worldbook" ? r.value.world_info.worldbook : void 0), se = A(() => [.../* @__PURE__ */ new Set([...ie.value, ...oe.value === void 0 ? [] : [oe.value]])].map((e) => ({
			value: e,
			label: e
		})));
		function ce(e) {
			e === "chat" || e === "off" ? (q.value = e, a({ world_info: { mode: e } })) : e === "worldbook" && (q.value = e, ae());
		}
		function le(e) {
			a({ world_info: {
				mode: "worldbook",
				worldbook: e
			} });
		}
		return (t, u) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "illustration-settings"
		}, [O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(n)("settings.nav.illustration")), 3)], 2), O("div", { class: P(w($).form_grid) }, [
			I(De, {
				"model-value": e.settings?.auto_generation_enabled ?? !1,
				label: w(n)("settings.illustration.auto_generation_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": u[0] ||= (e) => i({ auto_generation_enabled: e })
			}, null, 8, [
				"model-value",
				"label",
				"disabled"
			]),
			O("p", { class: P(w($).description) }, j(w(n)("settings.illustration.auto_generation_hint")), 3),
			I(Y, {
				label: w(n)("settings.illustration.analysis_guidance_label"),
				hint: w(n)("settings.illustration.analysis_guidance_hint")
			}, {
				default: v(({ fieldId: t, describedBy: r }) => [p(O("textarea", {
					id: t,
					"onUpdate:modelValue": u[1] ||= (e) => m.value = e,
					rows: "3",
					maxlength: "2000",
					placeholder: w(n)("settings.illustration.analysis_guidance_placeholder"),
					"aria-describedby": r,
					class: P(w($).text_area),
					disabled: !e.settings,
					"data-testid": "analysis-guidance-input",
					onBlur: u[2] ||= (e) => a({ analysis_guidance: m.value.trim() })
				}, null, 42, Et), [[b, m.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			I(Y, {
				label: w(n)("settings.illustration.preset_label"),
				hint: w(n)("settings.illustration.preset_hint")
			}, {
				default: v(({ fieldId: t, describedBy: r }) => [p(O("input", {
					id: t,
					"onUpdate:modelValue": u[3] ||= (e) => o.value = e,
					type: "text",
					placeholder: w(n)("settings.illustration.preset_placeholder"),
					"aria-describedby": r,
					class: P(w($).text_input),
					disabled: !e.settings,
					"data-testid": "analysis-preset-input",
					onBlur: S
				}, null, 42, Dt), [[b, o.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.connection_label")), 3), I(Z, {
				"model-value": V.value,
				options: C.value,
				label: w(n)("settings.illustration.connection_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": H
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			V.value === "proxy_preset" ? (h(), y(N, { key: 0 }, [I(Y, {
				label: w(n)("settings.illustration.proxy_preset_label"),
				hint: w(n)("settings.illustration.proxy_preset_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": u[4] ||= (e) => s.value = e,
					type: "text",
					"aria-describedby": t,
					class: P(w($).text_input),
					"data-testid": "analysis-proxy-preset-input",
					onBlur: W
				}, null, 42, Ot), [[b, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]), I(Y, {
				label: w(n)("settings.illustration.proxy_model_label"),
				hint: w(n)("settings.illustration.proxy_model_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": u[5] ||= (e) => c.value = e,
					type: "text",
					"aria-describedby": t,
					class: P(w($).text_input),
					onBlur: W
				}, null, 42, kt), [[b, c.value]])]),
				_: 1
			}, 8, ["label", "hint"])], 64)) : E("", !0),
			V.value === "custom" ? (h(), y(N, { key: 1 }, [
				I(Y, {
					label: w(n)("settings.illustration.custom_url_label"),
					hint: w(n)("settings.illustration.custom_url_hint"),
					error: ee.value ? w(n)("settings.illustration.custom_invalid") : null
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": u[6] ||= (e) => l.value = e,
						type: "url",
						placeholder: "https://",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "analysis-custom-url-input",
						onBlur: F
					}, null, 42, At), [[b, l.value]])]),
					_: 1
				}, 8, [
					"label",
					"hint",
					"error"
				]),
				I(Y, { label: w(n)("settings.illustration.custom_model_label") }, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": u[7] ||= (e) => d.value = e,
						type: "text",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "analysis-custom-model-input",
						onBlur: F
					}, null, 42, jt), [[b, d.value]])]),
					_: 1
				}, 8, ["label"]),
				I(Y, {
					label: w(n)("settings.illustration.custom_key_label"),
					hint: w(n)("settings.illustration.custom_key_hint")
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": u[8] ||= (e) => L.value = e,
						type: "password",
						autocomplete: "off",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "analysis-custom-key-input"
					}, null, 10, Mt), [[b, L.value]])]),
					_: 1
				}, 8, ["label", "hint"]),
				O("div", { class: P(w($).actions_row) }, [
					I(U, {
						label: w(n)("settings.illustration.custom_key_save"),
						variant: "primary",
						pending: R.value === "saving",
						disabled: L.value.trim() === "",
						onClick: z
					}, null, 8, [
						"label",
						"pending",
						"disabled"
					]),
					I(U, {
						label: w(n)("settings.illustration.custom_key_clear"),
						onClick: B
					}, null, 8, ["label"]),
					O("span", {
						class: P(w($).status_text),
						role: "status"
					}, j(te.value), 3)
				], 2)
			], 64)) : E("", !0),
			I(Y, {
				label: w(n)("settings.illustration.wardrobe_model_label"),
				hint: V.value === "current" ? w(n)("settings.illustration.wardrobe_model_current_hint") : w(n)("settings.illustration.wardrobe_model_hint")
			}, {
				default: v(({ fieldId: t, describedBy: n }) => [p(O("input", {
					id: t,
					"onUpdate:modelValue": u[9] ||= (e) => f.value = e,
					type: "text",
					"aria-describedby": n,
					class: P(w($).text_input),
					disabled: !e.settings || V.value === "current",
					"data-testid": "wardrobe-model-input",
					onBlur: x
				}, null, 42, Nt), [[b, f.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			I(Y, {
				label: w(n)("settings.illustration.wardrobe_guidance_label"),
				hint: w(n)("settings.illustration.wardrobe_guidance_hint")
			}, {
				default: v(({ fieldId: t, describedBy: r }) => [p(O("textarea", {
					id: t,
					"onUpdate:modelValue": u[10] ||= (e) => g.value = e,
					rows: "3",
					maxlength: "2000",
					placeholder: w(n)("settings.illustration.wardrobe_guidance_placeholder"),
					"aria-describedby": r,
					class: P(w($).text_area),
					disabled: !e.settings,
					"data-testid": "wardrobe-guidance-input",
					onBlur: u[11] ||= (e) => a({ wardrobe_guidance: g.value.trim() })
				}, null, 42, Pt), [[b, g.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.chat_history_label")), 3), I(Q, {
				"model-value": r.value?.max_chat_history,
				label: w(n)("settings.illustration.chat_history_label"),
				min: 0,
				max: 20,
				"increment-label": w(n)("common.actions.increase"),
				"decrement-label": w(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": u[12] ||= (e) => a({ max_chat_history: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.world_info_label")), 3), I(Z, {
				"model-value": q.value,
				options: re.value,
				label: w(n)("settings.illustration.world_info_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ce
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			O("p", { class: P(w($).description) }, j(w(n)("settings.illustration.world_info_hint")), 3),
			q.value === "worldbook" ? (h(), y(N, { key: 2 }, [O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.worldbook_label")), 3), I(K, {
				"model-value": oe.value,
				options: se.value,
				placeholder: w(n)("settings.illustration.worldbook_placeholder"),
				"aria-label": w(n)("settings.illustration.worldbook_label"),
				"onUpdate:modelValue": le
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2), J.value ? (h(), y("p", {
				key: 0,
				class: P(w($).description),
				role: "alert"
			}, j(w(n)("settings.illustration.worldbook_unavailable")), 3)) : E("", !0)], 64)) : E("", !0),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.max_images_label")), 3), I(Q, {
				"model-value": r.value?.max_images_per_message,
				label: w(n)("settings.illustration.max_images_label"),
				min: 1,
				max: 8,
				"increment-label": w(n)("common.actions.increase"),
				"decrement-label": w(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": u[13] ||= (e) => a({ max_images_per_message: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.prompt_preset_label")), 3), I(K, {
				"model-value": r.value?.prompt_preset_id ?? It,
				options: G.value,
				placeholder: w(n)("settings.illustration.prompt_preset_label"),
				"aria-label": w(n)("settings.illustration.prompt_preset_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": ne
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label",
				"disabled"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.illustration.concurrency_label")), 3), I(Q, {
				"model-value": e.settings?.global_concurrency,
				label: w(n)("settings.illustration.concurrency_label"),
				min: 1,
				max: 4,
				"increment-label": w(n)("common.actions.increase"),
				"decrement-label": w(n)("common.actions.decrease"),
				disabled: !e.settings,
				"onUpdate:modelValue": u[14] ||= (e) => i({ global_concurrency: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label",
				"disabled"
			])], 2)
		], 2)], 2));
	}
}), Rt = {
	k_euler: "Euler",
	k_euler_ancestral: "Euler Ancestral",
	k_dpmpp_2s_ancestral: "DPM++ 2S Ancestral",
	k_dpmpp_2m_sde: "DPM++ 2M SDE",
	k_dpmpp_2m: "DPM++ 2M",
	k_dpmpp_sde: "DPM++ SDE",
	ddim_v3: "DDIM"
}, zt = {
	native: "Native",
	karras: "Karras",
	exponential: "Exponential",
	polyexponential: "Polyexponential"
};
function Bt(e, t) {
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
var Vt = "https://novelai.net/image", Ht = /* @__PURE__ */ F({
	__name: "NovelAiSettings",
	props: {
		profile: {},
		vibes: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: a, d: s } = k(), l = A(() => {
			let e = t.profile.model_id;
			return e != null && i(e) !== null ? e : fe;
		});
		function d() {
			if (t.profile.novelai_defaults !== null) return t.profile.novelai_defaults;
			let e = de(l.value);
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
		let p = T(d());
		_(() => t.profile.id, () => {
			p.value = d();
		});
		function m(e) {
			p.value = {
				...p.value,
				...e
			};
		}
		let g = A(() => c.safeParse(p.value).success ? null : a("settings.novelai.invalid_size")), v = A(() => {
			let e = i(l.value);
			return e === null ? [] : o(e.profile, p.value);
		}), b = T(null), x = T(null), S = T(!1), C = T(!1);
		async function M() {
			C.value = !0, x.value = null, S.value = !1;
			try {
				b.value = await t.controller.load_novelai_account();
			} catch (e) {
				S.value = e instanceof Error && e.name === "ProviderNetworkError", x.value = e instanceof Error ? e.message : String(e);
			} finally {
				C.value = !1;
			}
		}
		let F = T([]);
		u(async () => {
			try {
				F.value = (await t.controller.load_novelai_models()).filter((e) => e.profile.selectable);
			} catch {
				F.value = [];
			}
		});
		let L = A(() => F.value.map((e) => ({
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
				base_url: t.profile.base_url ?? null,
				is_default: t.profile.is_default,
				updated_at: t.profile.updated_at
			});
		}
		let z = r.options.map((e) => ({
			value: e,
			label: Rt[e]
		})), B = n.options.map((e) => ({
			value: e,
			label: zt[e]
		}));
		function te(e, t, n) {
			t.includes(n) && m({ [e]: n });
		}
		let V = A(() => t.vibes.filter((e) => typeof e.payload.image == "string" && (e.payload.provider === void 0 || e.payload.provider === "novelai")));
		function H(e, t) {
			let n = p.value.vibe_asset_ids.filter((t) => t !== e);
			m({ vibe_asset_ids: t ? [...n, e].slice(0, 16) : n });
		}
		let W = T("idle");
		async function G() {
			W.value = "saving";
			try {
				await t.controller.save_novelai_defaults(t.profile.id, p.value), W.value = "saved";
			} catch {
				W.value = "failed";
			}
		}
		return (t, i) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "novelai-settings"
		}, [O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(a)("settings.novelai.title", { name: e.profile.display_name })), 3)], 2), O("div", { class: P(w($).form_grid) }, [
			O("div", { class: P(w($).actions_row) }, [I(U, {
				label: w(a)("settings.novelai.refresh_account"),
				pending: C.value,
				onClick: M
			}, null, 8, ["label", "pending"]), b.value === null ? S.value ? (h(), y("span", {
				key: 1,
				class: P(w($).status_text),
				"data-testid": "novelai-account-unreachable"
			}, [ee(j(w(a)("settings.novelai.account_unreachable")) + " ", 1), O("a", {
				href: Vt,
				target: "_blank",
				rel: "noopener noreferrer"
			}, j(w(a)("settings.novelai.account_open_site")), 1)], 2)) : x.value === null ? E("", !0) : (h(), y("span", {
				key: 2,
				class: P(w($).status_text)
			}, j(x.value), 3)) : (h(), y("span", {
				key: 0,
				class: P(w($).status_text),
				"data-testid": "novelai-account"
			}, j(w(a)("settings.novelai.account_summary", {
				tier: b.value.tier,
				anlas: b.value.anlas,
				expires: w(s)(new Date(b.value.expires_at), "short_date")
			})), 3))], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.model_label")), 3), I(K, {
				"model-value": l.value,
				options: L.value,
				placeholder: l.value,
				"aria-label": w(a)("settings.novelai.model_label"),
				"onUpdate:modelValue": i[0] ||= (e) => void R(e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.width_label")), 3), I(Q, {
				"model-value": p.value.width,
				label: w(a)("settings.novelai.width_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": w(a)("common.actions.increase"),
				"decrement-label": w(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[1] ||= (e) => m({ width: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.height_label")), 3), I(Q, {
				"model-value": p.value.height,
				label: w(a)("settings.novelai.height_label"),
				min: 64,
				max: 2048,
				step: 64,
				"increment-label": w(a)("common.actions.increase"),
				"decrement-label": w(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[2] ||= (e) => m({ height: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.steps_label")), 3), I(Q, {
				"model-value": p.value.steps,
				label: w(a)("settings.novelai.steps_label"),
				min: 1,
				max: 50,
				"increment-label": w(a)("common.actions.increase"),
				"decrement-label": w(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[3] ||= (e) => m({ steps: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.scale_label")), 3), I(Q, {
				"model-value": p.value.scale,
				label: w(a)("settings.novelai.scale_label"),
				min: 0,
				max: 10,
				step: .1,
				"increment-label": w(a)("common.actions.increase"),
				"decrement-label": w(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[4] ||= (e) => m({ scale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.cfg_rescale_label")), 3), I(Q, {
				"model-value": p.value.cfg_rescale,
				label: w(a)("settings.novelai.cfg_rescale_label"),
				min: 0,
				max: 1,
				step: .02,
				"increment-label": w(a)("common.actions.increase"),
				"decrement-label": w(a)("common.actions.decrease"),
				"onUpdate:modelValue": i[5] ||= (e) => m({ cfg_rescale: e })
			}, null, 8, [
				"model-value",
				"label",
				"increment-label",
				"decrement-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.sampler_label")), 3), I(K, {
				"model-value": p.value.sampler,
				options: w(z),
				placeholder: w(a)("settings.novelai.sampler_label"),
				"aria-label": w(a)("settings.novelai.sampler_label"),
				"onUpdate:modelValue": i[6] ||= (e) => te("sampler", w(r).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(a)("settings.novelai.noise_schedule_label")), 3), I(K, {
				"model-value": p.value.noise_schedule,
				options: w(B),
				placeholder: w(a)("settings.novelai.noise_schedule_label"),
				"aria-label": w(a)("settings.novelai.noise_schedule_label"),
				"onUpdate:modelValue": i[7] ||= (e) => te("noise_schedule", w(n).options, e)
			}, null, 8, [
				"model-value",
				"options",
				"placeholder",
				"aria-label"
			])], 2),
			I(De, {
				"model-value": p.value.smea,
				label: w(a)("settings.novelai.smea_label"),
				"onUpdate:modelValue": i[8] ||= (e) => m({ smea: e })
			}, null, 8, ["model-value", "label"]),
			I(De, {
				"model-value": p.value.dyn,
				label: w(a)("settings.novelai.dyn_label"),
				"onUpdate:modelValue": i[9] ||= (e) => m({ dyn: e })
			}, null, 8, ["model-value", "label"]),
			I(De, {
				"model-value": p.value.variety_plus,
				label: w(a)("settings.novelai.variety_label"),
				"onUpdate:modelValue": i[10] ||= (e) => m({ variety_plus: e })
			}, null, 8, ["model-value", "label"]),
			O("h3", { class: P(w($).section_title) }, j(w(a)("settings.novelai.vibes_title")), 3),
			V.value.length === 0 ? (h(), y("p", {
				key: 0,
				class: P(w($).description)
			}, j(w(a)("settings.novelai.vibes_empty")), 3)) : E("", !0),
			(h(!0), y(N, null, f(V.value, (e) => (h(), D(se, {
				key: e.id,
				"model-value": p.value.vibe_asset_ids.includes(e.id),
				label: e.display_name,
				"onUpdate:modelValue": (t) => H(e.id, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]))), 128)),
			v.value.length > 0 ? (h(), y("div", {
				key: 1,
				class: P(w($).risk_banner),
				"data-testid": "novelai-ignored"
			}, [O("p", { class: P(w($).risk_banner_title) }, j(w(a)("settings.novelai.ignored_title")), 3), (h(!0), y(N, null, f(v.value, (e) => (h(), y("p", {
				key: e,
				class: P(w($).risk_banner_description)
			}, j(w(Bt)(w(a), e)), 3))), 128))], 2)) : E("", !0),
			g.value === null ? E("", !0) : (h(), y("p", {
				key: 2,
				class: P(w($).status_text),
				role: "alert"
			}, j(g.value), 3)),
			O("div", { class: P(w($).actions_row) }, [I(U, {
				label: w(a)("settings.novelai.save"),
				variant: "primary",
				pending: W.value === "saving",
				disabled: g.value !== null,
				onClick: G
			}, null, 8, [
				"label",
				"pending",
				"disabled"
			]), O("span", {
				class: P(w($).status_text),
				role: "status"
			}, j(W.value === "saved" ? w(a)("settings.novelai.saved") : W.value === "failed" ? w(a)("settings.novelai.save_failed") : ""), 3)], 2)
		], 2)], 2));
	}
}), Ut = [
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
];
function Wt(e, t) {
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
var Gt = ["id", "aria-describedby"], Kt = ["id", "aria-describedby"], qt = ["id", "aria-describedby"], Jt = ["id", "aria-describedby"], Yt = ["id", "aria-describedby"], Xt = "http://127.0.0.1:7860", Zt = "http://127.0.0.1:8188", Qt = /* @__PURE__ */ F({
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
		let { t: i } = k(), o = T(!1), c = T(null), u = T(!1), d = T(null), m = T(null), g = T(!1), _ = T(null), x = T(""), S = T(!1), C = T(null), M = T(/* @__PURE__ */ new Map()), ee = Ut.map((e) => ({
			value: e,
			label: Wt(i, e)
		})), F = A({
			get: () => c.value?.provider_id ?? "sd_webui",
			set: (e) => {
				c.value && (c.value.provider_id = e, c.value.workflow_id = "", c.value.base_url = e === "comfyui" ? Zt : Xt, e === "novelai" && !L.has(c.value.model_id) && (c.value.model_id = fe));
			}
		}), L = new Set(a.map((e) => e.model_id)), R = a.filter((e) => e.selectable).map((e) => ({
			value: e.model_id,
			label: e.display_name
		})), z = A(() => c.value?.provider_id === "sd_webui" || c.value?.provider_id === "comfyui");
		function B(e) {
			try {
				let t = s(e.trim());
				return l(t) ? t : null;
			} catch {
				return null;
			}
		}
		function te() {
			c.value = {
				id: crypto.randomUUID(),
				is_new: !0,
				provider_id: "sd_webui",
				display_name: "",
				model_id: "",
				workflow_id: "",
				base_url: Xt,
				is_default: n.profiles.length === 0
			}, d.value = null, o.value = !0;
		}
		function V(e) {
			c.value = {
				id: e.id,
				is_new: !1,
				provider_id: e.provider_id,
				display_name: e.display_name,
				model_id: e.model_id ?? "",
				workflow_id: e.workflow_id ?? "",
				base_url: e.base_url ?? "",
				is_default: e.is_default
			}, d.value = null, o.value = !0;
		}
		function H() {
			o.value = !1, c.value = null, d.value = null;
		}
		async function W() {
			let e = c.value;
			if (!e || u.value) return;
			let r = e.display_name.trim(), a = e.model_id.trim(), o = e.provider_id === "comfyui" ? t.safeParse(e.workflow_id.trim()) : null;
			if (r.length === 0 || a.length === 0 || e.provider_id === "comfyui" && o?.success !== !0) {
				d.value = i("errors.validation_required");
				return;
			}
			let s = z.value ? B(e.base_url) : null;
			if (z.value && s === null) {
				d.value = i("settings.provider_profiles.base_url_invalid");
				return;
			}
			u.value = !0, d.value = null;
			try {
				await n.controller.save_provider_profile({
					id: e.id,
					provider_id: e.provider_id,
					display_name: r,
					model_id: a,
					workflow_id: e.provider_id === "comfyui" && o?.success === !0 ? o.data : null,
					base_url: s,
					is_default: e.is_default,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}), H();
			} catch {
				d.value = i("errors.unexpected");
			} finally {
				u.value = !1;
			}
		}
		function G(e) {
			m.value = e;
		}
		async function re() {
			let e = m.value;
			if (!(!e || g.value)) {
				g.value = !0;
				try {
					await n.controller.remove_provider_profile(e.id), m.value = null;
				} finally {
					g.value = !1;
				}
			}
		}
		function q(e) {
			return e === "novelai" || e === "openai_image" || e === "google_image";
		}
		function ie(e) {
			_.value = e, x.value = "", C.value = null;
		}
		function J() {
			_.value = null, x.value = "", C.value = null;
		}
		async function oe() {
			let e = _.value;
			if (!(!e || S.value)) {
				if (x.value.trim().length === 0) {
					C.value = i("errors.validation_required");
					return;
				}
				S.value = !0, C.value = null;
				try {
					await n.controller.set_provider_profile_credential(e.id, x.value), J();
				} catch {
					C.value = i("settings.credential_storage.unlock_required");
				} finally {
					S.value = !1, x.value = "";
				}
			}
		}
		async function se(e) {
			try {
				await n.controller.clear_provider_profile_credential(e.id);
			} catch {
				_.value = e, x.value = "", C.value = i("settings.credential_storage.unlock_required");
			}
		}
		async function le(e) {
			M.value.set(e.id, {
				pending: !0,
				label: null
			}), M.value = new Map(M.value);
			try {
				let t = await n.controller.test_provider_profile_connection(e.id), r = t.status === "success" ? `${i("status.success")} · ${i("settings.provider_profiles.connection_test_latency", { ms: t.latency_ms })}` : i("settings.provider_profiles.connection_test_failed", { code: t.error.code });
				M.value.set(e.id, {
					pending: !1,
					label: r
				});
			} catch {
				M.value.set(e.id, {
					pending: !1,
					label: i("errors.unexpected")
				});
			}
			M.value = new Map(M.value);
		}
		return (t, n) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "provider-profiles"
		}, [
			O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(i)("settings.sections.provider_profiles")), 3), I(U, {
				label: w(i)("settings.provider_profiles.add_action"),
				variant: e.profiles.length === 0 ? "primary" : "secondary",
				onClick: te
			}, null, 8, ["label", "variant"])], 2),
			I(ne, {
				status: e.profiles.length === 0 ? "empty" : "ready",
				"empty-message": w(i)("settings.provider_profiles.empty_description")
			}, {
				default: v(() => [O("div", null, [(h(!0), y(N, null, f(e.profiles, (e) => (h(), y("div", {
					key: e.id,
					class: P(w($).profile_row),
					"data-testid": "provider-profile-row"
				}, [O("div", { class: P(w($).profile_identity) }, [
					O("span", { class: P(w($).profile_name) }, j(e.display_name), 3),
					O("span", { class: P(w($).profile_meta) }, j(w(Wt)(w(i), e.provider_id)), 3),
					q(e.provider_id) ? (h(), y("span", {
						key: 0,
						class: P(w($).profile_meta)
					}, j(e.credential_reference ? w(i)("settings.provider_profiles.credential_set") : w(i)("settings.provider_profiles.credential_unset")), 3)) : E("", !0),
					M.value.get(e.id)?.label ? (h(), y("span", {
						key: 1,
						class: P(w($).profile_meta),
						"data-testid": "profile-test-result"
					}, j(M.value.get(e.id)?.label), 3)) : E("", !0),
					O("div", { class: P(w($).prompt_tag_row) }, [I(ce, {
						port: r(e),
						kind: "quality"
					}, null, 8, ["port"]), I(ce, {
						port: r(e),
						kind: "undesired_content"
					}, null, 8, ["port"])], 2)
				], 2), O("div", { class: P(w($).profile_actions) }, [
					e.is_default ? (h(), y("span", {
						key: 0,
						class: P(w($).badge)
					}, j(w(i)("settings.provider_profiles.default_badge")), 3)) : E("", !0),
					I(U, {
						label: w(i)("settings.provider_profiles.connection_test_action"),
						variant: "secondary",
						pending: M.value.get(e.id)?.pending === !0,
						onClick: (t) => le(e)
					}, null, 8, [
						"label",
						"pending",
						"onClick"
					]),
					q(e.provider_id) ? (h(), D(U, {
						key: 1,
						label: w(i)("settings.provider_profiles.set_credential_action"),
						variant: "secondary",
						onClick: (t) => ie(e)
					}, null, 8, ["label", "onClick"])) : E("", !0),
					q(e.provider_id) && e.credential_reference !== null ? (h(), D(U, {
						key: 2,
						label: w(i)("settings.provider_profiles.clear_credential_action"),
						variant: "secondary",
						onClick: (t) => se(e)
					}, null, 8, ["label", "onClick"])) : E("", !0),
					I(U, {
						label: w(i)("common.actions.edit"),
						variant: "secondary",
						onClick: (t) => V(e)
					}, null, 8, ["label", "onClick"]),
					I(U, {
						label: w(i)("common.actions.delete"),
						variant: "destructive",
						onClick: (t) => G(e)
					}, null, 8, ["label", "onClick"])
				], 2)], 2))), 128))])]),
				_: 1
			}, 8, ["status", "empty-message"]),
			I(ae, {
				open: o.value,
				title: c.value?.is_new ? w(i)("settings.provider_profiles.dialog_add_title") : w(i)("settings.provider_profiles.dialog_edit_title"),
				"close-label": w(i)("common.actions.close"),
				"onUpdate:open": n[7] ||= (e) => !e && H()
			}, {
				default: v(() => [c.value ? (h(), y("div", {
					key: 0,
					class: P(w($).form_grid)
				}, [
					I(Y, {
						label: w(i)("common.labels.name"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
							id: e,
							"onUpdate:modelValue": n[0] ||= (e) => c.value.display_name = e,
							type: "text",
							"aria-describedby": t,
							class: P(w($).text_input)
						}, null, 10, Gt), [[b, c.value.display_name]])]),
						_: 1
					}, 8, ["label"]),
					I(Y, {
						label: w(i)("settings.provider_profiles.provider_label"),
						required: ""
					}, {
						default: v(({ fieldId: e }) => [I(K, {
							id: e,
							modelValue: F.value,
							"onUpdate:modelValue": n[1] ||= (e) => F.value = e,
							options: w(ee),
							placeholder: w(i)("settings.provider_profiles.provider_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"]),
					c.value.provider_id === "novelai" ? (h(), D(Y, {
						key: 0,
						label: w(i)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: v(({ fieldId: e }) => [I(K, {
							id: e,
							modelValue: c.value.model_id,
							"onUpdate:modelValue": n[2] ||= (e) => c.value.model_id = e,
							options: w(R),
							placeholder: w(i)("settings.provider_profiles.model_label")
						}, null, 8, [
							"id",
							"modelValue",
							"options",
							"placeholder"
						])]),
						_: 1
					}, 8, ["label"])) : (h(), D(Y, {
						key: 1,
						label: w(i)("settings.provider_profiles.model_label"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
							id: e,
							"onUpdate:modelValue": n[3] ||= (e) => c.value.model_id = e,
							type: "text",
							"aria-describedby": t,
							class: P(w($).text_input),
							"data-testid": "provider-model-input"
						}, null, 10, Kt), [[b, c.value.model_id]])]),
						_: 1
					}, 8, ["label"])),
					z.value ? (h(), D(Y, {
						key: 2,
						label: w(i)("settings.provider_profiles.base_url_label"),
						hint: c.value.provider_id === "comfyui" ? w(i)("settings.provider_profiles.base_url_hint_comfyui") : w(i)("settings.provider_profiles.base_url_hint_sd_webui"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
							id: e,
							"onUpdate:modelValue": n[4] ||= (e) => c.value.base_url = e,
							type: "url",
							"aria-describedby": t,
							class: P(w($).text_input),
							"data-testid": "provider-base-url-input"
						}, null, 10, qt), [[b, c.value.base_url]])]),
						_: 1
					}, 8, ["label", "hint"])) : E("", !0),
					c.value.provider_id === "comfyui" ? (h(), D(Y, {
						key: 3,
						label: w(i)("settings.provider_profiles.workflow_label"),
						required: ""
					}, {
						default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
							id: e,
							"onUpdate:modelValue": n[5] ||= (e) => c.value.workflow_id = e,
							type: "text",
							"aria-describedby": t,
							class: P(w($).text_input),
							"data-testid": "provider-workflow-input"
						}, null, 10, Jt), [[b, c.value.workflow_id]])]),
						_: 1
					}, 8, ["label"])) : E("", !0),
					I(De, {
						modelValue: c.value.is_default,
						"onUpdate:modelValue": n[6] ||= (e) => c.value.is_default = e,
						label: w(i)("settings.provider_profiles.set_default_action")
					}, null, 8, ["modelValue", "label"]),
					d.value ? (h(), y("p", {
						key: 4,
						class: P([w($).status_text, w($).description]),
						"data-tone": "error"
					}, j(d.value), 3)) : E("", !0),
					O("div", { class: P(w($).actions_row) }, [I(U, {
						label: w(i)("common.actions.save"),
						pending: u.value,
						onClick: W
					}, null, 8, ["label", "pending"]), I(U, {
						label: w(i)("common.actions.cancel"),
						variant: "secondary",
						onClick: H
					}, null, 8, ["label"])], 2)
				], 2)) : E("", !0)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"close-label"
			]),
			I(ae, {
				open: _.value !== null,
				title: w(i)("settings.provider_profiles.credential_dialog_title", { name: _.value?.display_name ?? "" }),
				description: w(i)("settings.provider_profiles.credential_dialog_description"),
				"close-label": w(i)("common.actions.close"),
				"onUpdate:open": n[9] ||= (e) => !e && J()
			}, {
				default: v(() => [O("div", { class: P(w($).form_grid) }, [I(Y, {
					label: w(i)("settings.provider_profiles.credential_label"),
					error: C.value,
					required: ""
				}, {
					default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
						id: e,
						"onUpdate:modelValue": n[8] ||= (e) => x.value = e,
						type: "password",
						autocomplete: "new-password",
						"aria-describedby": t,
						class: P(w($).text_input),
						"data-testid": "provider-credential-input"
					}, null, 10, Yt), [[b, x.value]])]),
					_: 1
				}, 8, ["label", "error"]), O("div", { class: P(w($).actions_row) }, [I(U, {
					label: w(i)("common.actions.save"),
					pending: S.value,
					onClick: oe
				}, null, 8, ["label", "pending"]), I(U, {
					label: w(i)("common.actions.cancel"),
					variant: "secondary",
					onClick: J
				}, null, 8, ["label"])], 2)], 2)]),
				_: 1
			}, 8, [
				"open",
				"title",
				"description",
				"close-label"
			]),
			I(Oe, {
				open: m.value !== null,
				title: w(i)("settings.provider_profiles.remove_confirm_title", { name: m.value?.display_name ?? "" }),
				description: w(i)("settings.provider_profiles.remove_confirm_description"),
				"confirm-label": w(i)("confirmations.destructive.default_confirm_action"),
				"cancel-label": w(i)("confirmations.destructive.default_cancel_action"),
				pending: g.value,
				"onUpdate:open": n[10] ||= (e) => !e && (m.value = null),
				onConfirm: re
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
}), $t = ["id", "aria-describedby"], en = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], tn = [
	"onUpdate:modelValue",
	"aria-label",
	"placeholder"
], nn = 200, rn = /* @__PURE__ */ F({
	__name: "TranslationSettings",
	props: {
		settings: {},
		controller: {}
	},
	setup(e) {
		let t = e, { t: n } = k(), r = A(() => t.settings?.translation ?? null);
		function i(e) {
			let n = r.value;
			return n === null ? Promise.resolve() : t.controller.update_settings({ translation: {
				...n,
				...e
			} });
		}
		let a = A(() => [{
			value: "free",
			label: n("settings.translation.endpoint_free")
		}, {
			value: "pro",
			label: n("settings.translation.endpoint_pro")
		}]);
		function o(e) {
			(e === "free" || e === "pro") && i({ deepl_endpoint: e });
		}
		let s = T(""), c = T("idle");
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
		async function u() {
			c.value = "saving";
			try {
				await t.controller.clear_deepl_key(), c.value = "cleared";
			} catch {
				c.value = "failed";
			}
		}
		let d = A(() => {
			switch (c.value) {
				case "saved": return n("settings.translation.key_saved");
				case "cleared": return n("settings.translation.key_cleared");
				case "failed": return n("settings.translation.key_failed");
				default: return "";
			}
		}), m = T([]);
		_(() => r.value?.glossary, (e) => {
			m.value = (e ?? []).map((e) => ({ ...e }));
		}, { immediate: !0 });
		function g() {
			m.value.length < nn && m.value.push({
				source: "",
				target: ""
			});
		}
		function x(e) {
			m.value.splice(e, 1);
		}
		function S() {
			i({ glossary: m.value.map((e) => ({
				source: e.source.trim(),
				target: e.target.trim()
			})).filter((e) => e.source !== "" && e.target !== "") });
		}
		return (t, i) => (h(), y("div", {
			class: P(w($).section),
			"data-testid": "translation-settings"
		}, [O("div", { class: P(w($).section_header) }, [O("h2", { class: P(w($).section_title) }, j(w(n)("settings.nav.translation")), 3)], 2), O("div", { class: P(w($).form_grid) }, [
			O("p", { class: P(w($).description) }, j(w(n)("settings.translation.description")), 3),
			I(Y, {
				label: w(n)("settings.translation.key_label"),
				hint: w(n)("settings.translation.key_hint")
			}, {
				default: v(({ fieldId: e, describedBy: t }) => [p(O("input", {
					id: e,
					"onUpdate:modelValue": i[0] ||= (e) => s.value = e,
					type: "password",
					autocomplete: "off",
					"aria-describedby": t,
					class: P(w($).text_input),
					"data-testid": "deepl-key-input"
				}, null, 10, $t), [[b, s.value]])]),
				_: 1
			}, 8, ["label", "hint"]),
			O("div", { class: P(w($).actions_row) }, [
				I(U, {
					label: w(n)("settings.translation.key_save"),
					variant: "primary",
					pending: c.value === "saving",
					disabled: s.value.trim() === "",
					onClick: l
				}, null, 8, [
					"label",
					"pending",
					"disabled"
				]),
				I(U, {
					label: w(n)("settings.translation.key_clear"),
					onClick: u
				}, null, 8, ["label"]),
				O("span", {
					class: P(w($).status_text),
					role: "status"
				}, j(d.value), 3)
			], 2),
			O("div", { class: P(w($).row) }, [O("span", { class: P(w($).row_label) }, j(w(n)("settings.translation.endpoint_label")), 3), I(Z, {
				"model-value": r.value?.deepl_endpoint ?? "free",
				options: a.value,
				label: w(n)("settings.translation.endpoint_label"),
				disabled: !e.settings,
				"onUpdate:modelValue": o
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"disabled"
			])], 2),
			O("h3", { class: P(w($).section_title) }, j(w(n)("settings.translation.glossary_title")), 3),
			O("p", { class: P(w($).description) }, j(w(n)("settings.translation.glossary_description")), 3),
			(h(!0), y(N, null, f(m.value, (e, t) => (h(), y("div", {
				key: t,
				class: P(w($).actions_row),
				"data-testid": "glossary-row"
			}, [
				p(O("input", {
					"onUpdate:modelValue": (t) => e.source = t,
					type: "text",
					maxlength: "32",
					"aria-label": w(n)("settings.translation.glossary_source"),
					placeholder: w(n)("settings.translation.glossary_source"),
					class: P(w($).text_input)
				}, null, 10, en), [[b, e.source]]),
				p(O("input", {
					"onUpdate:modelValue": (t) => e.target = t,
					type: "text",
					maxlength: "128",
					"aria-label": w(n)("settings.translation.glossary_target"),
					placeholder: w(n)("settings.translation.glossary_target"),
					class: P(w($).text_input)
				}, null, 10, tn), [[b, e.target]]),
				I(U, {
					label: w(n)("settings.translation.glossary_remove"),
					onClick: (e) => x(t)
				}, null, 8, ["label", "onClick"])
			], 2))), 128)),
			O("div", { class: P(w($).actions_row) }, [I(U, {
				label: w(n)("settings.translation.glossary_add"),
				disabled: m.value.length >= nn,
				onClick: g
			}, null, 8, ["label", "disabled"]), I(U, {
				label: w(n)("settings.translation.glossary_save"),
				variant: "primary",
				disabled: !e.settings,
				onClick: S
			}, null, 8, ["label", "disabled"])], 2)
		], 2)], 2));
	}
}), an = ["aria-label"], on = [
	"data-selected",
	"aria-current",
	"onClick"
], sn = { class: "tc-visually-hidden" }, cn = /*@__PURE__*/ F({
	__name: "SettingsView",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = S(() => import("./PromptView-CYUgEK0h.js")), n = S(() => import("./AssetsView-CwAo2OjZ.js")), r = S(() => import("./PromptTagPresetPanel-Bbp2PsAt.js")), i = S(() => import("./DiagnosticsView-BV7ghi7f.js")), a = e, { t: o } = k(), s = [
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
		let l = A(() => a.state.settings_section), u = A(() => a.state.generation.profiles.find((e) => e.id === a.state.generation.active_profile_id && e.provider_id === "novelai") ?? null);
		function d(e, t) {
			return a.controller.test_prompt_regex(e, t);
		}
		return (a, p) => (h(), y("div", {
			class: P(w($).layout),
			"data-testid": "settings-view"
		}, [O("nav", {
			class: P(w($).section_nav),
			"aria-label": w(o)("nav.settings")
		}, [(h(), y(N, null, f(s, (t) => O("button", {
			key: t,
			type: "button",
			class: P(["tc-interactive", w($).section_nav_item]),
			"data-selected": t === l.value,
			"aria-current": t === l.value ? "page" : void 0,
			onClick: (n) => e.controller.set_settings_section(t)
		}, j(c(t)), 11, on)), 64))], 10, an), O("div", { class: P(w($).section_content) }, [l.value === "prompts" ? (h(), y(N, { key: 0 }, [I(w(t), {
			state: e.state,
			"test-regex": d,
			onSelectPreset: p[0] ||= (t) => void e.controller.select_prompt_preset(t),
			onNewPreset: p[1] ||= (t) => e.controller.start_new_prompt_preset(),
			onBulkDeletePresets: p[2] ||= (t) => void e.controller.bulk_remove_prompt_presets(t),
			onUpdateDraft: p[3] ||= (t) => e.controller.update_prompt_draft(t),
			onSave: p[4] ||= (t) => void e.controller.save_prompt_preset(t)
		}, null, 8, ["state"]), I(w(r), {
			records: e.state.assets.records.prompt_tag,
			loading: e.state.loading.has("assets"),
			controller: e.controller
		}, null, 8, [
			"records",
			"loading",
			"controller"
		])], 64)) : l.value === "library" ? (h(), D(w(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : l.value === "diagnostics" ? (h(), D(w(i), {
			key: 2,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (h(), y("div", {
			key: 3,
			class: P(w($).view)
		}, [O("h1", sn, j(c(l.value)), 1), l.value === "illustration" ? (h(), D(Lt, {
			key: 0,
			settings: e.state.settings.settings,
			"prompt-presets": e.state.prompt.presets,
			controller: e.controller
		}, null, 8, [
			"settings",
			"prompt-presets",
			"controller"
		])) : l.value === "providers" ? (h(), y(N, { key: 1 }, [
			e.state.generation.profiles.length === 0 ? (h(), y("section", {
				key: 0,
				class: P(w($).onboarding),
				"data-testid": "settings-onboarding",
				"aria-labelledby": "settings-onboarding-title"
			}, [O("div", {
				class: P(w($).onboarding_icon),
				"aria-hidden": "true"
			}, [I(R, {
				icon: w(ke),
				size: 22
			}, null, 8, ["icon"])], 2), O("div", null, [
				O("p", { class: P(w($).onboarding_label) }, j(w(o)("settings.onboarding.label")), 3),
				O("h2", {
					id: "settings-onboarding-title",
					class: P(w($).onboarding_title)
				}, j(w(o)("settings.onboarding.title")), 3),
				O("p", { class: P(w($).onboarding_description) }, j(w(o)("settings.onboarding.description")), 3)
			])], 2)) : E("", !0),
			I(Qt, {
				profiles: e.state.generation.profiles,
				"prompt-tag-presets": e.state.assets.records.prompt_tag,
				controller: e.controller
			}, null, 8, [
				"profiles",
				"prompt-tag-presets",
				"controller"
			]),
			u.value === null ? E("", !0) : (h(), D(Ht, {
				key: 1,
				profile: u.value,
				vibes: e.state.assets.records.vibe,
				controller: e.controller
			}, null, 8, [
				"profile",
				"vibes",
				"controller"
			]))
		], 64)) : l.value === "translation" ? (h(), D(rn, {
			key: 2,
			settings: e.state.settings.settings,
			controller: e.controller
		}, null, 8, ["settings", "controller"])) : l.value === "general" ? (h(), y(N, { key: 3 }, [
			I(_t, {
				settings: e.state.settings.settings,
				controller: e.controller
			}, null, 8, ["settings", "controller"]),
			I(St, {
				settings: e.state.settings.settings,
				"vault-status": e.state.settings.browser_secret_vault,
				controller: e.controller
			}, null, 8, [
				"settings",
				"vault-status",
				"controller"
			]),
			I(Tt, {
				"vocabulary-update-channel": e.state.settings.vocabulary_update_channel,
				controller: e.controller
			}, null, 8, ["vocabulary-update-channel", "controller"])
		], 64)) : E("", !0)], 2))], 2)], 2));
	}
}), ln = /* @__PURE__ */ e({ default: () => un }), un = cn;
//#endregion
export { un as default, Q as n, Z as r, ln as t };
