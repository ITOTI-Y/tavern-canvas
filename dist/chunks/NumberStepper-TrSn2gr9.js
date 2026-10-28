import { D as e, G as t, H as n, I as r, L as i, O as a, P as o, _ as s, c, dt as l, g as u, h as d, j as f, lt as p, m, mt as h, ot as g, p as _, s as v, tt as y, u as b, x, y as S } from "./vue-i18n-L-BrQRnK.js";
import { t as C } from "./AppIcon-DkyxvN8k.js";
import { t as w } from "./components_styles-DfkKC2VR.js";
import { a as T, i as E, n as ee, o as D, r as O } from "./AppCheckbox-Cgz54uQV.js";
import { n as k } from "./FieldGroup-C0diPHlP.js";
import { a as te, i as ne, o as A, r as j, t as M } from "./_prop_utils-DgoYzKlR.js";
import { C as re, M as N, N as P, P as F, S as I, T as L, f as R, g as z, j as B, s as V, v as H, w as ie, y as U } from "./Teleport-CquQcgiX.js";
import { c as W } from "./AppTooltip-Bay48E5d.js";
import { u as G } from "./IconButton-Co--h1UV.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function ae(e) {
	let t = y(!1);
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
function K() {
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
function oe(e) {
	let t = z({ locale: y("en") });
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
var se = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } }, ce = class {
	constructor(e, t = {}) {
		this.numberFormatter = le(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		if (t = !J && this.options.signDisplay != null ? ue(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), this.options.style === "unit" && !Y) {
			let { unit: e, unitDisplay: n = "short", locale: r } = this.resolvedOptions();
			if (!e) return t;
			let i = se[e]?.[n];
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
function le(e, t = {}) {
	let { numberingSystem: n } = t;
	if (n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`), t.style === "unit" && !Y) {
		let { unit: e, unitDisplay: n = "short" } = t;
		if (!e) throw Error("unit option must be provided with style: \"unit\"");
		if (!se[e]?.[n]) throw Error(`Unsupported unit ${e} with unitDisplay = ${n}`);
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
function ue(e, t, n) {
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
var de = /* @__PURE__ */ RegExp("^.*\\(.*\\).*$"), fe = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
], pe = class {
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
}, me = /* @__PURE__ */ new Map();
function X(e, t, n) {
	let r = he(e, t);
	if (!e.includes("-nu-") && !r.isValidPartialNumber(n)) {
		for (let i of fe) if (i !== r.options.numberingSystem) {
			let r = he(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + i, t);
			if (r.isValidPartialNumber(n)) return r;
		}
	}
	return r;
}
function he(e, t) {
	let n = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : ""), r = me.get(n);
	return r || (r = new ge(e, t), me.set(n, r)), r;
}
var ge = class {
	constructor(e, t = {}) {
		this.locale = e, t.roundingIncrement !== 1 && t.roundingIncrement != null && (t.maximumFractionDigits == null && t.minimumFractionDigits == null ? (t.maximumFractionDigits = 0, t.minimumFractionDigits = 0) : t.maximumFractionDigits == null ? t.maximumFractionDigits = t.minimumFractionDigits : t.minimumFractionDigits ??= t.maximumFractionDigits), this.formatter = new Intl.NumberFormat(e, t), this.options = this.formatter.resolvedOptions(), this.symbols = ye(e, this.formatter, this.options, t), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
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
			return new pe(this.locale, e).parse(new ce(this.locale, e).format(r));
		}
		return this.options.currencySign === "accounting" && de.test(e) && (r = -1 * r), r;
	}
	sanitize(e) {
		let t = this.formatter.resolvedOptions().useGrouping;
		return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((t) => t.unit === e) ? this.symbols.noNumeralUnits.find((t) => t.unit === e).value.toString() : (e = e.replace(this.symbols.literals, ""), this.symbols.minusSign && (e = e.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (e = Z(e, ",", this.symbols.decimal), e = Z(e, "،", this.symbols.decimal)), this.symbols.group && t && (e = Z(e, ".", this.symbols.group))), this.symbols.group === "’" && e.includes("'") && t && (e = Z(e, "'", this.symbols.group)), this.symbols.group === "'" && e.includes("’") && t && (e = Z(e, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && t && (e = Z(e, " ", this.symbols.group), e = Z(e, /\u00A0/g, this.symbols.group)), e);
	}
	isValidPartialNumber(e, t = -Infinity, n = Infinity) {
		let r = this.formatter.resolvedOptions().useGrouping;
		return e = this.sanitize(e), this.symbols.minusSign && e.startsWith(this.symbols.minusSign) && t < 0 ? e = e.slice(this.symbols.minusSign.length) : this.symbols.plusSign && e.startsWith(this.symbols.plusSign) && n > 0 && (e = e.slice(this.symbols.plusSign.length)), this.symbols.decimal && e.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && r && (e = Z(e, this.symbols.group, "")), e = e.replace(this.symbols.numeral, ""), this.symbols.decimal && (e = e.replace(this.symbols.decimal, "")), e.length === 0);
	}
}, _e = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]), ve = [
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
function ye(e, t, n, r) {
	let i = new Intl.NumberFormat(e, {
		...n,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: !0
	}), a = i.formatToParts(-10000.111), o = i.formatToParts(10000.111), s = ve.map((e) => i.formatToParts(e)), c = s.map((e, t) => {
		let n = e.find((e) => e.type === "unit");
		return n && !e.some((e) => e.type === "integer" || e.type === "fraction") ? {
			unit: n.value,
			value: ve[t]
		} : null;
	}).filter((e) => !!e), l = a.find((e) => e.type === "minusSign")?.value ?? "-", u = o.find((e) => e.type === "plusSign")?.value;
	!u && (r?.signDisplay === "exceptZero" || r?.signDisplay === "always") && (u = "+");
	let d = new Intl.NumberFormat(e, {
		...n,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((e) => e.type === "decimal")?.value, f = a.find((e) => e.type === "group")?.value, p = a.filter((e) => !_e.has(e.type)).map((e) => be(e.value)), m = s.flatMap((e) => e.filter((e) => !_e.has(e.type)).map((e) => be(e.value))), h = [.../* @__PURE__ */ new Set([...p, ...m])].sort((e, t) => t.length - e.length), g = h.length === 0 ? /* @__PURE__ */ RegExp("\\p{White_Space}|\\p{Cf}", "gu") : RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), _ = [...new Intl.NumberFormat(n.locale, { useGrouping: !1 }).format(9876543210)].reverse(), v = new Map(_.map((e, t) => [e, t])), y = RegExp(`[${_.join("")}]`, "g");
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
function be(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function xe(e) {
	let { disabled: t } = e, n = y(), r = re(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = y(!1), l = _(() => H(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return ie && (U(l || window, "pointerdown", u), U(window, "pointerup", d), U(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Se(e, t = y({})) {
	return L(() => new ce(e.value, t.value));
}
function Ce(e, t = y({})) {
	return L(() => new pe(e.value, t.value));
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
var [$, we] = /*#__PURE__*/ F("NumberFieldRoot"), Te = /* @__PURE__ */ x({
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
	setup(n, { emit: r }) {
		let a = n, s = r, { disabled: c, readonly: l, disableWheelChange: f, invertWheelChange: m, min: h, max: v, step: b, stepSnapping: x, formatOptions: S, id: C, locale: w } = g(a), T = I(a, "modelValue", s, {
			defaultValue: a.defaultValue,
			passive: a.modelValue === void 0
		}), { primitiveElement: ee, currentElement: D } = G(), O = oe(w), k = j(D), A = y(), M = _(() => B(T.value) || isNaN(T.value) ? !1 : N("decrease", T.value) >= T.value), re = _(() => B(T.value) || isNaN(T.value) ? !1 : N("increase", T.value) <= T.value);
		function N(e, t, n = 1) {
			let r = b.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (x.value && !isNaN(r)) {
				let o = te(t, h.value, v.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return q(a);
		}
		function P(e, t = 1) {
			if (a.focusOnChange && A.value?.focus(), a.disabled || a.readonly) return;
			let n = H.parse(A.value?.value ?? "");
			if (isNaN(n)) {
				T.value = q(h.value ?? 0);
				return;
			}
			T.value = N(e, n, t);
		}
		function F(e = 1) {
			P("increase", e);
		}
		function L(e = 1) {
			P("decrease", e);
		}
		function R(e) {
			e === "min" && h.value !== void 0 ? T.value = q(h.value) : e === "max" && v.value !== void 0 && (T.value = q(v.value));
		}
		let z = Se(O, S), H = Ce(O, S), ie = _(() => z.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), U = Se(O, S), W = _(() => B(T.value) || isNaN(T.value) ? "" : U.format(T.value));
		function ae(e) {
			return H.isValidPartialNumber(e, h.value, v.value);
		}
		function K(e) {
			A.value && (A.value.value = e);
		}
		function q(e) {
			let t;
			return t = b.value === void 0 || isNaN(b.value) || !x.value ? ne(e, h.value, v.value) : te(e, h.value, v.value, b.value), t = H.parse(z.format(t)), t;
		}
		function J(e) {
			let t = H.parse(e);
			return T.value = isNaN(t) ? void 0 : q(t), e.length ? K(W.value) : K(e);
		}
		return we({
			modelValue: T,
			handleDecrease: L,
			handleIncrease: F,
			handleMinMaxValue: R,
			inputMode: ie,
			inputEl: A,
			onInputElement: (e) => A.value = e,
			textValue: W,
			readonly: l,
			validate: ae,
			applyInputValue: J,
			disabled: c,
			disableWheelChange: f,
			invertWheelChange: m,
			max: v,
			min: h,
			isDecreaseDisabled: M,
			isIncreaseDisabled: re,
			id: C
		}), (n, r) => (o(), d(p(V), e(n.$attrs, {
			ref_key: "primitiveElement",
			ref: ee,
			role: "group",
			as: n.as,
			"as-child": n.asChild,
			"data-disabled": p(c) ? "" : void 0,
			"data-readonly": p(l) ? "" : void 0
		}), {
			default: t(() => [i(n.$slots, "default", {
				modelValue: p(T),
				textValue: W.value,
				readonly: p(l)
			}), p(k) && n.name ? (o(), d(p(E), {
				key: 0,
				type: "text",
				value: p(T),
				name: n.name,
				disabled: p(c),
				readonly: p(l),
				required: n.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : u("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), Ee = /* @__PURE__ */ x({
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
	setup(n) {
		let r = n, a = $(), s = _(() => a.disabled?.value || a.readonly.value || r.disabled || a.isDecreaseDisabled.value), { primitiveElement: l, currentElement: u } = G(), { isPressed: f, onTrigger: m } = xe({
			target: u,
			disabled: s
		});
		return m(() => {
			a.handleDecrease();
		}), (n, a) => (o(), d(p(V), e(r, {
			ref_key: "primitiveElement",
			ref: l,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: n.as === "button" ? "button" : void 0,
			style: { userSelect: p(f) ? "none" : void 0 },
			disabled: s.value ? "" : void 0,
			"data-disabled": s.value ? "" : void 0,
			"data-pressed": p(f) ? "true" : void 0,
			onContextmenu: a[0] ||= c(() => {}, ["prevent"])
		}), {
			default: t(() => [i(n.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), De = /* @__PURE__ */ x({
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
	setup(n) {
		let r = n, a = $(), s = _(() => a.disabled?.value || a.readonly.value || r.disabled || a.isIncreaseDisabled.value), { primitiveElement: l, currentElement: u } = G(), { isPressed: f, onTrigger: m } = xe({
			target: u,
			disabled: s
		});
		return m(() => {
			a.handleIncrease();
		}), (n, a) => (o(), d(p(V), e(r, {
			ref_key: "primitiveElement",
			ref: l,
			tabindex: "-1",
			"aria-label": "Increase",
			type: n.as === "button" ? "button" : void 0,
			style: { userSelect: p(f) ? "none" : void 0 },
			disabled: s.value ? "" : void 0,
			"data-disabled": s.value ? "" : void 0,
			"data-pressed": p(f) ? "true" : void 0,
			onContextmenu: a[0] ||= c(() => {}, ["prevent"])
		}), {
			default: t(() => [i(n.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Oe = /* @__PURE__ */ x({
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
		let a = r, { primitiveElement: s, currentElement: c } = G(), l = $(), u = K(), { isComposing: m, handleCompositionStart: h, handleCompositionEnd: g } = ae();
		function _(e) {
			if (!(m.value || e.isComposing)) switch (e.key) {
				case u.ARROW_UP:
					e.preventDefault(), l.handleIncrease();
					break;
				case u.ARROW_DOWN:
					e.preventDefault(), l.handleDecrease();
					break;
				case u.PAGE_UP:
					e.preventDefault(), l.handleIncrease(10);
					break;
				case u.PAGE_DOWN:
					e.preventDefault(), l.handleDecrease(10);
					break;
				case u.HOME:
					e.preventDefault(), l.handleMinMaxValue("min");
					break;
				case u.END:
					e.preventDefault(), l.handleMinMaxValue("max");
					break;
				case u.ENTER: l.applyInputValue(e.target?.value);
			}
		}
		function v(e) {
			l.disableWheelChange.value || e.target === P() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? l.invertWheelChange.value ? l.handleDecrease() : l.handleIncrease() : e.deltaY < 0 && (l.invertWheelChange.value ? l.handleIncrease() : l.handleDecrease())));
		}
		f(() => {
			l.onInputElement(c.value);
		});
		let b = y(l.textValue.value);
		n(() => l.textValue.value, () => {
			b.value = l.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function x() {
			requestAnimationFrame(() => {
				b.value = l.textValue.value;
			});
		}
		return (n, r) => (o(), d(p(V), e(a, {
			id: p(l).id.value,
			ref_key: "primitiveElement",
			ref: s,
			value: b.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: p(l).inputMode.value,
			disabled: p(l).disabled.value ? "" : void 0,
			"data-disabled": p(l).disabled.value ? "" : void 0,
			readonly: p(l).readonly.value ? "" : void 0,
			"data-readonly": p(l).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": p(l).modelValue.value,
			"aria-valuemin": p(l).min.value,
			"aria-valuemax": p(l).max.value,
			onKeydown: _,
			onWheel: v,
			onBeforeinput: r[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				p(l).validate(n) || e.preventDefault();
			},
			onInput: r[1] ||= (e) => {
				let t = e.target;
				b.value = t.value;
			},
			onChange: x,
			onBlur: r[2] ||= (e) => p(l).applyInputValue(e.target?.value),
			onCompositionstart: p(h),
			onCompositionend: p(g)
		}), {
			default: t(() => [i(n.$slots, "default")]),
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
}), ke = "radio.select";
function Ae(e, t, n) {
	N(ke, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var je = /* @__PURE__ */ x({
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
	setup(n, { emit: r }) {
		let a = n, l = r, f = I(a, "checked", l, { passive: a.checked === void 0 }), { value: m } = g(a), { forwardRef: h, currentElement: v } = R(), y = j(v), x = T(), C = _(() => a.id && v.value ? document.querySelector(`[for="${a.id}"]`)?.innerText ?? a.value : void 0);
		function w(e) {
			a.disabled || Ae(e, a.value, (e) => {
				l("select", e), !e?.defaultPrevented && (f.value = !0, y.value && e.stopPropagation());
			});
		}
		return (n, r) => (o(), s(b, null, [S(p(V), e({
			id: n.id,
			ref: p(h),
			role: "radio",
			type: n.as === "button" ? "button" : void 0,
			as: n.as,
			"aria-checked": p(f) ?? !1,
			"aria-label": C.value,
			"as-child": n.asChild,
			disabled: n.disabled ? "" : void 0,
			"data-state": p(f) ? "checked" : "unchecked",
			"data-disabled": n.disabled ? "" : void 0,
			value: p(m),
			required: n.required,
			name: n.name
		}, {
			...p(x),
			...n.$attrs
		}, { onClick: c(w, ["stop"]) }), {
			default: t(() => [i(n.$slots, "default", { checked: p(f) })]),
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
		]), p(y) && n.name ? (o(), d(p(E), e({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: p(m),
			checked: !!p(f),
			name: n.name,
			disabled: n.disabled,
			required: n.required
		}, p(x)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : u("v-if", !0)], 64));
	}
}), [Me, Ne] = /*#__PURE__*/ F("RadioGroupRoot"), Pe = /* @__PURE__ */ x({
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
	setup(e, { emit: n }) {
		let r = e, a = n, { forwardRef: s, currentElement: c } = R(), l = I(r, "modelValue", a, {
			defaultValue: r.defaultValue,
			passive: r.modelValue === void 0
		}), { disabled: f, loop: m, orientation: h, name: _, required: v, dir: y } = g(r), b = W(y), x = j(c);
		return Ne({
			modelValue: l,
			changeModelValue: (e) => {
				l.value = e;
			},
			disabled: f,
			loop: m,
			orientation: h,
			name: _?.value,
			required: v
		}), (e, n) => (o(), d(p(O), {
			"as-child": "",
			orientation: p(h),
			dir: p(b),
			loop: p(m)
		}, {
			default: t(() => [S(p(V), {
				ref: p(s),
				role: "radiogroup",
				"data-disabled": p(f) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": p(h),
				"aria-required": p(v),
				dir: p(b)
			}, {
				default: t(() => [i(e.$slots, "default", { modelValue: p(l) }), p(x) && p(_) ? (o(), d(p(E), {
					key: 0,
					required: p(v),
					disabled: p(f),
					value: p(l),
					name: p(_)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : u("v-if", !0)]),
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
}), [Fe, Ie] = /*#__PURE__*/ F("RadioGroupItem"), Le = /* @__PURE__ */ x({
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
	setup(n, { emit: r }) {
		let a = n, s = r, { forwardRef: l, currentElement: u } = R(), f = Me(), m = _(() => f.disabled.value || a.disabled), h = _(() => f.required.value || a.required), g = _(() => A(f.modelValue?.value, a.value));
		Ie({
			disabled: m,
			checked: g
		});
		let b = y(!1), x = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		U("keydown", (e) => {
			x.includes(e.key) && (b.value = !0);
		}), U("keyup", () => {
			b.value = !1;
		});
		function C() {
			setTimeout(() => {
				b.value && u.value?.click();
			}, 0);
		}
		let w = T();
		return (n, r) => (o(), d(p(ee), {
			checked: g.value,
			disabled: m.value,
			"as-child": "",
			focusable: !m.value,
			active: g.value
		}, {
			default: t(() => [S(je, e({
				...p(w),
				...n.$attrs,
				...a
			}, {
				ref: p(l),
				checked: g.value,
				required: h.value,
				disabled: m.value,
				"onUpdate:checked": r[0] ||= (e) => p(f).changeModelValue(n.value),
				onSelect: r[1] ||= (e) => s("select", e),
				onKeydown: r[2] ||= v(c(() => {}, ["prevent"]), ["enter"]),
				onFocus: C
			}), {
				default: t(() => [i(n.$slots, "default", {
					checked: g.value,
					required: h.value,
					disabled: m.value
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
}), Re = /* @__PURE__ */ x({
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
	setup(e, { emit: n }) {
		let i = n;
		function a(e) {
			i("update:modelValue", e);
		}
		return (n, i) => (o(), d(p(Pe), {
			class: l(p(w).segmentedControl),
			"data-layout": e.options.some((e) => e.label.length > 6) ? "hug" : "fill",
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": a
		}, {
			default: t(() => [(o(!0), s(b, null, r(e.options, (e) => (o(), d(p(Le), {
				key: e.value,
				class: l(["tc-interactive", p(w).segmentedControlItem]),
				value: e.value
			}, {
				default: t(() => [m("span", { class: l(p(w).segmentedControlItemLabel) }, h(e.label), 3)]),
				_: 2
			}, 1032, ["class", "value"]))), 128))]),
			_: 1
		}, 8, [
			"class",
			"data-layout",
			"model-value",
			"disabled",
			"aria-label"
		]));
	}
}), ze = /* @__PURE__ */ x({
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
	setup(n, { emit: r }) {
		let i = n, a = r;
		function s(e) {
			a("update:modelValue", e);
		}
		let c = _(() => M({
			id: i.id,
			min: i.min,
			max: i.max
		})), u = _(() => M({
			"aria-label": i.label,
			"aria-describedby": i.describedBy
		}));
		return (r, i) => (o(), d(p(Te), e(c.value, {
			class: p(w).numberStepper,
			"model-value": n.modelValue ?? null,
			step: n.step,
			disabled: n.disabled,
			"onUpdate:modelValue": s
		}), {
			default: t(() => [
				S(p(Ee), {
					class: l(["tc-interactive", p(w).numberStepperButton]),
					"aria-label": n.decrementLabel
				}, {
					default: t(() => [S(C, {
						icon: p(D),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				S(p(Oe), e(u.value, { class: ["tc-tabular-nums", p(w).numberStepperInput] }), null, 16, ["class"]),
				S(p(De), {
					class: l(["tc-interactive", p(w).numberStepperButton]),
					"aria-label": n.incrementLabel
				}, {
					default: t(() => [S(C, {
						icon: p(k),
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
export { Re as n, ze as t };
