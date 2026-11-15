import { A as e, G as t, I as n, J as r, N as i, R as a, S as o, _ as s, _t as c, b as l, c as u, d, ft as f, g as p, h as m, it as h, k as g, l as _, lt as v, m as y, mt as b, v as x, z as S } from "./vue-i18n-BQWz_HuU.js";
import { t as C } from "./AppIcon-B1iv8vRB.js";
import { t as w } from "./components_styles-Cab5IILs.js";
import { a as T, i as E, n as ee, o as D, r as O } from "./AppCheckbox-CHqNg9ZG.js";
import { n as k } from "./FieldGroup-B4bm8x77.js";
import { a as te, i as ne, o as A, r as j, t as M } from "./_prop_utils-BQHilWOI.js";
import { C as re, M as N, N as P, P as F, S as I, T as L, f as R, g as z, j as B, s as V, v as H, w as ie, y as U } from "./Teleport-B2amidH8.js";
import { c as W } from "./AppTooltip-DuggrS-8.js";
import { u as G } from "./IconButton-DbYdD8bu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function ae(t) {
	let n = h(!1);
	function r() {
		n.value = !0;
	}
	function i(r) {
		e(() => {
			n.value = !1, t?.(r);
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
	let t = z({ locale: h("en") });
	return y(() => e?.value || t.locale?.value || "en");
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
	let { disabled: t } = e, n = h(), r = re(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = h(!1), l = y(() => H(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return ie && (U(l || window, "pointerdown", u), U(window, "pointerup", d), U(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Se(e, t = h({})) {
	return L(() => new ce(e.value, t.value));
}
function Ce(e, t = h({})) {
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
var [$, we] = /*#__PURE__*/ F("NumberFieldRoot"), Te = /* @__PURE__ */ o({
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
		let i = e, a = t, { disabled: o, readonly: c, disableWheelChange: l, invertWheelChange: u, min: d, max: m, step: _, stepSnapping: b, formatOptions: x, id: C, locale: w } = v(i), T = I(i, "modelValue", a, {
			defaultValue: i.defaultValue,
			passive: i.modelValue === void 0
		}), { primitiveElement: ee, currentElement: D } = G(), O = oe(w), k = j(D), A = h(), M = y(() => B(T.value) || isNaN(T.value) ? !1 : N("decrease", T.value) >= T.value), re = y(() => B(T.value) || isNaN(T.value) ? !1 : N("increase", T.value) <= T.value);
		function N(e, t, n = 1) {
			let r = _.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (b.value && !isNaN(r)) {
				let o = te(t, d.value, m.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return q(a);
		}
		function P(e, t = 1) {
			if (i.focusOnChange && A.value?.focus(), i.disabled || i.readonly) return;
			let n = H.parse(A.value?.value ?? "");
			if (isNaN(n)) {
				T.value = q(d.value ?? 0);
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
			e === "min" && d.value !== void 0 ? T.value = q(d.value) : e === "max" && m.value !== void 0 && (T.value = q(m.value));
		}
		let z = Se(O, x), H = Ce(O, x), ie = y(() => z.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), U = Se(O, x), W = y(() => B(T.value) || isNaN(T.value) ? "" : U.format(T.value));
		function ae(e) {
			return H.isValidPartialNumber(e, d.value, m.value);
		}
		function K(e) {
			A.value && (A.value.value = e);
		}
		function q(e) {
			let t;
			return t = _.value === void 0 || isNaN(_.value) || !b.value ? ne(e, d.value, m.value) : te(e, d.value, m.value, _.value), t = H.parse(z.format(t)), t;
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
			readonly: c,
			validate: ae,
			applyInputValue: J,
			disabled: o,
			disableWheelChange: l,
			invertWheelChange: u,
			max: m,
			min: d,
			isDecreaseDisabled: M,
			isIncreaseDisabled: re,
			id: C
		}), (e, t) => (n(), p(f(V), g(e.$attrs, {
			ref_key: "primitiveElement",
			ref: ee,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": f(o) ? "" : void 0,
			"data-readonly": f(c) ? "" : void 0
		}), {
			default: r(() => [S(e.$slots, "default", {
				modelValue: f(T),
				textValue: W.value,
				readonly: f(c)
			}), f(k) && e.name ? (n(), p(f(E), {
				key: 0,
				type: "text",
				value: f(T),
				name: e.name,
				disabled: f(o),
				readonly: f(c),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : s("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), Ee = /* @__PURE__ */ o({
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
		let t = e, i = $(), a = y(() => i.disabled?.value || i.readonly.value || t.disabled || i.isDecreaseDisabled.value), { primitiveElement: o, currentElement: s } = G(), { isPressed: c, onTrigger: l } = xe({
			target: s,
			disabled: a
		});
		return l(() => {
			i.handleDecrease();
		}), (e, i) => (n(), p(f(V), g(t, {
			ref_key: "primitiveElement",
			ref: o,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: f(c) ? "none" : void 0 },
			disabled: a.value ? "" : void 0,
			"data-disabled": a.value ? "" : void 0,
			"data-pressed": f(c) ? "true" : void 0,
			onContextmenu: i[0] ||= _(() => {}, ["prevent"])
		}), {
			default: r(() => [S(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), De = /* @__PURE__ */ o({
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
		let t = e, i = $(), a = y(() => i.disabled?.value || i.readonly.value || t.disabled || i.isIncreaseDisabled.value), { primitiveElement: o, currentElement: s } = G(), { isPressed: c, onTrigger: l } = xe({
			target: s,
			disabled: a
		});
		return l(() => {
			i.handleIncrease();
		}), (e, i) => (n(), p(f(V), g(t, {
			ref_key: "primitiveElement",
			ref: o,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: f(c) ? "none" : void 0 },
			disabled: a.value ? "" : void 0,
			"data-disabled": a.value ? "" : void 0,
			"data-pressed": f(c) ? "true" : void 0,
			onContextmenu: i[0] ||= _(() => {}, ["prevent"])
		}), {
			default: r(() => [S(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Oe = /* @__PURE__ */ o({
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
		let a = e, { primitiveElement: o, currentElement: s } = G(), c = $(), l = K(), { isComposing: u, handleCompositionStart: d, handleCompositionEnd: m } = ae();
		function _(e) {
			if (!(u.value || e.isComposing)) switch (e.key) {
				case l.ARROW_UP:
					e.preventDefault(), c.handleIncrease();
					break;
				case l.ARROW_DOWN:
					e.preventDefault(), c.handleDecrease();
					break;
				case l.PAGE_UP:
					e.preventDefault(), c.handleIncrease(10);
					break;
				case l.PAGE_DOWN:
					e.preventDefault(), c.handleDecrease(10);
					break;
				case l.HOME:
					e.preventDefault(), c.handleMinMaxValue("min");
					break;
				case l.END:
					e.preventDefault(), c.handleMinMaxValue("max");
					break;
				case l.ENTER: c.applyInputValue(e.target?.value);
			}
		}
		function v(e) {
			c.disableWheelChange.value || e.target === P() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? c.invertWheelChange.value ? c.handleDecrease() : c.handleIncrease() : e.deltaY < 0 && (c.invertWheelChange.value ? c.handleIncrease() : c.handleDecrease())));
		}
		i(() => {
			c.onInputElement(s.value);
		});
		let y = h(c.textValue.value);
		t(() => c.textValue.value, () => {
			y.value = c.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function b() {
			requestAnimationFrame(() => {
				y.value = c.textValue.value;
			});
		}
		return (e, t) => (n(), p(f(V), g(a, {
			id: f(c).id.value,
			ref_key: "primitiveElement",
			ref: o,
			value: y.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: f(c).inputMode.value,
			disabled: f(c).disabled.value ? "" : void 0,
			"data-disabled": f(c).disabled.value ? "" : void 0,
			readonly: f(c).readonly.value ? "" : void 0,
			"data-readonly": f(c).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": f(c).modelValue.value,
			"aria-valuemin": f(c).min.value,
			"aria-valuemax": f(c).max.value,
			onKeydown: _,
			onWheel: v,
			onBeforeinput: t[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				f(c).validate(n) || e.preventDefault();
			},
			onInput: t[1] ||= (e) => {
				let t = e.target;
				y.value = t.value;
			},
			onChange: b,
			onBlur: t[2] ||= (e) => f(c).applyInputValue(e.target?.value),
			onCompositionstart: f(d),
			onCompositionend: f(m)
		}), {
			default: r(() => [S(e.$slots, "default")]),
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
var je = /* @__PURE__ */ o({
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
		let i = e, a = t, o = I(i, "checked", a, { passive: i.checked === void 0 }), { value: c } = v(i), { forwardRef: u, currentElement: m } = R(), h = j(m), b = T(), C = y(() => i.id && m.value ? document.querySelector(`[for="${i.id}"]`)?.innerText ?? i.value : void 0);
		function w(e) {
			i.disabled || Ae(e, i.value, (e) => {
				a("select", e), !e?.defaultPrevented && (o.value = !0, h.value && e.stopPropagation());
			});
		}
		return (e, t) => (n(), x(d, null, [l(f(V), g({
			id: e.id,
			ref: f(u),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": f(o) ?? !1,
			"aria-label": C.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": f(o) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: f(c),
			required: e.required,
			name: e.name
		}, {
			...f(b),
			...e.$attrs
		}, { onClick: _(w, ["stop"]) }), {
			default: r(() => [S(e.$slots, "default", { checked: f(o) })]),
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
		]), f(h) && e.name ? (n(), p(f(E), g({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: f(c),
			checked: !!f(o),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, f(b)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : s("v-if", !0)], 64));
	}
}), [Me, Ne] = /*#__PURE__*/ F("RadioGroupRoot"), Pe = /* @__PURE__ */ o({
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
		let i = e, a = t, { forwardRef: o, currentElement: c } = R(), u = I(i, "modelValue", a, {
			defaultValue: i.defaultValue,
			passive: i.modelValue === void 0
		}), { disabled: d, loop: m, orientation: h, name: g, required: _, dir: y } = v(i), b = W(y), x = j(c);
		return Ne({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			disabled: d,
			loop: m,
			orientation: h,
			name: g?.value,
			required: _
		}), (e, t) => (n(), p(f(O), {
			"as-child": "",
			orientation: f(h),
			dir: f(b),
			loop: f(m)
		}, {
			default: r(() => [l(f(V), {
				ref: f(o),
				role: "radiogroup",
				"data-disabled": f(d) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": f(h),
				"aria-required": f(_),
				dir: f(b)
			}, {
				default: r(() => [S(e.$slots, "default", { modelValue: f(u) }), f(x) && f(g) ? (n(), p(f(E), {
					key: 0,
					required: f(_),
					disabled: f(d),
					value: f(u),
					name: f(g)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : s("v-if", !0)]),
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
}), [Fe, Ie] = /*#__PURE__*/ F("RadioGroupItem"), Le = /* @__PURE__ */ o({
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
		let i = e, a = t, { forwardRef: o, currentElement: s } = R(), c = Me(), d = y(() => c.disabled.value || i.disabled), m = y(() => c.required.value || i.required), v = y(() => A(c.modelValue?.value, i.value));
		Ie({
			disabled: d,
			checked: v
		});
		let b = h(!1), x = [
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
				b.value && s.value?.click();
			}, 0);
		}
		let w = T();
		return (e, t) => (n(), p(f(ee), {
			checked: v.value,
			disabled: d.value,
			"as-child": "",
			focusable: !d.value,
			active: v.value
		}, {
			default: r(() => [l(je, g({
				...f(w),
				...e.$attrs,
				...i
			}, {
				ref: f(o),
				checked: v.value,
				required: m.value,
				disabled: d.value,
				"onUpdate:checked": t[0] ||= (t) => f(c).changeModelValue(e.value),
				onSelect: t[1] ||= (e) => a("select", e),
				onKeydown: t[2] ||= u(_(() => {}, ["prevent"]), ["enter"]),
				onFocus: C
			}), {
				default: r(() => [S(e.$slots, "default", {
					checked: v.value,
					required: m.value,
					disabled: d.value
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
}), Re = /* @__PURE__ */ o({
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
		let i = t;
		function o(e) {
			i("update:modelValue", e);
		}
		return (t, i) => (n(), p(f(Pe), {
			class: b(f(w).segmentedControl),
			"data-layout": e.options.some((e) => e.label.length > 6) ? "hug" : "fill",
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": o
		}, {
			default: r(() => [(n(!0), x(d, null, a(e.options, (e) => (n(), p(f(Le), {
				key: e.value,
				class: b(["tc-interactive", f(w).segmentedControlItem]),
				value: e.value
			}, {
				default: r(() => [m("span", { class: b(f(w).segmentedControlItemLabel) }, c(e.label), 3)]),
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
}), ze = /* @__PURE__ */ o({
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
		let i = e, a = t;
		function o(e) {
			a("update:modelValue", e);
		}
		let s = y(() => M({
			id: i.id,
			min: i.min,
			max: i.max
		})), c = y(() => M({
			"aria-label": i.label,
			"aria-describedby": i.describedBy
		}));
		return (t, i) => (n(), p(f(Te), g(s.value, {
			class: f(w).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": o
		}), {
			default: r(() => [
				l(f(Ee), {
					class: b(["tc-interactive", f(w).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: r(() => [l(C, {
						icon: f(D),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				l(f(Oe), g(c.value, { class: ["tc-tabular-nums", f(w).numberStepperInput] }), null, 16, ["class"]),
				l(f(De), {
					class: b(["tc-interactive", f(w).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: r(() => [l(C, {
						icon: f(k),
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
