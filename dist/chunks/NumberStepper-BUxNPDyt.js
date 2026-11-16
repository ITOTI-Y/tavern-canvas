import { F as e, L as t, M as n, O as r, R as i, W as a, _ as o, c as s, ct as c, dt as l, g as u, gt as d, h as f, k as p, m, p as h, pt as g, q as _, rt as v, s as y, u as b, x, y as S } from "./vue-i18n-XoxYzLIP.js";
import { t as C } from "./AppIcon-DD754F_c.js";
import { t as w } from "./components_styles-BXC5Dc_L.js";
import { a as T, i as E, n as ee, o as D, r as O } from "./AppCheckbox-mwSAcdjr.js";
import { n as k } from "./FieldGroup-D8VsaFMT.js";
import { a as te, i as ne, o as A, r as j, t as M } from "./_prop_utils-CvImpN6J.js";
import { C as re, M as N, N as P, P as F, S as I, T as L, f as R, g as z, j as B, s as V, v as H, w as ie, y as U } from "./Teleport-zHbQRGnp.js";
import { c as W } from "./AppTooltip-CmgWxKYL.js";
import { u as G } from "./IconButton-CPI-A0bT.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function ae(e) {
	let t = v(!1);
	function n() {
		t.value = !0;
	}
	function r(n) {
		p(() => {
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
	let t = z({ locale: v("en") });
	return h(() => e?.value || t.locale?.value || "en");
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
	let { disabled: t } = e, n = v(), r = re(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = v(!1), l = h(() => H(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return ie && (U(l || window, "pointerdown", u), U(window, "pointerup", d), U(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Se(e, t = v({})) {
	return L(() => new ce(e.value, t.value));
}
function Ce(e, t = v({})) {
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
	setup(t, { emit: n }) {
		let a = t, o = n, { disabled: s, readonly: d, disableWheelChange: p, invertWheelChange: m, min: g, max: y, step: b, stepSnapping: x, formatOptions: S, id: C, locale: w } = c(a), T = I(a, "modelValue", o, {
			defaultValue: a.defaultValue,
			passive: a.modelValue === void 0
		}), { primitiveElement: ee, currentElement: D } = G(), O = oe(w), k = j(D), A = v(), M = h(() => B(T.value) || isNaN(T.value) ? !1 : N("decrease", T.value) >= T.value), re = h(() => B(T.value) || isNaN(T.value) ? !1 : N("increase", T.value) <= T.value);
		function N(e, t, n = 1) {
			let r = b.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (x.value && !isNaN(r)) {
				let o = te(t, g.value, y.value, r);
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
				T.value = q(g.value ?? 0);
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
			e === "min" && g.value !== void 0 ? T.value = q(g.value) : e === "max" && y.value !== void 0 && (T.value = q(y.value));
		}
		let z = Se(O, S), H = Ce(O, S), ie = h(() => z.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), U = Se(O, S), W = h(() => B(T.value) || isNaN(T.value) ? "" : U.format(T.value));
		function ae(e) {
			return H.isValidPartialNumber(e, g.value, y.value);
		}
		function K(e) {
			A.value && (A.value.value = e);
		}
		function q(e) {
			let t;
			return t = b.value === void 0 || isNaN(b.value) || !x.value ? ne(e, g.value, y.value) : te(e, g.value, y.value, b.value), t = H.parse(z.format(t)), t;
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
			readonly: d,
			validate: ae,
			applyInputValue: J,
			disabled: s,
			disableWheelChange: p,
			invertWheelChange: m,
			max: y,
			min: g,
			isDecreaseDisabled: M,
			isIncreaseDisabled: re,
			id: C
		}), (t, n) => (e(), f(l(V), r(t.$attrs, {
			ref_key: "primitiveElement",
			ref: ee,
			role: "group",
			as: t.as,
			"as-child": t.asChild,
			"data-disabled": l(s) ? "" : void 0,
			"data-readonly": l(d) ? "" : void 0
		}), {
			default: _(() => [i(t.$slots, "default", {
				modelValue: l(T),
				textValue: W.value,
				readonly: l(d)
			}), l(k) && t.name ? (e(), f(l(E), {
				key: 0,
				type: "text",
				value: l(T),
				name: t.name,
				disabled: l(s),
				readonly: l(d),
				required: t.required
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
	setup(t) {
		let n = t, a = $(), o = h(() => a.disabled?.value || a.readonly.value || n.disabled || a.isDecreaseDisabled.value), { primitiveElement: c, currentElement: u } = G(), { isPressed: d, onTrigger: p } = xe({
			target: u,
			disabled: o
		});
		return p(() => {
			a.handleDecrease();
		}), (t, a) => (e(), f(l(V), r(n, {
			ref_key: "primitiveElement",
			ref: c,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: t.as === "button" ? "button" : void 0,
			style: { userSelect: l(d) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": l(d) ? "true" : void 0,
			onContextmenu: a[0] ||= s(() => {}, ["prevent"])
		}), {
			default: _(() => [i(t.$slots, "default")]),
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
	setup(t) {
		let n = t, a = $(), o = h(() => a.disabled?.value || a.readonly.value || n.disabled || a.isIncreaseDisabled.value), { primitiveElement: c, currentElement: u } = G(), { isPressed: d, onTrigger: p } = xe({
			target: u,
			disabled: o
		});
		return p(() => {
			a.handleIncrease();
		}), (t, a) => (e(), f(l(V), r(n, {
			ref_key: "primitiveElement",
			ref: c,
			tabindex: "-1",
			"aria-label": "Increase",
			type: t.as === "button" ? "button" : void 0,
			style: { userSelect: l(d) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": l(d) ? "true" : void 0,
			onContextmenu: a[0] ||= s(() => {}, ["prevent"])
		}), {
			default: _(() => [i(t.$slots, "default")]),
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
	setup(t) {
		let o = t, { primitiveElement: s, currentElement: c } = G(), u = $(), d = K(), { isComposing: p, handleCompositionStart: m, handleCompositionEnd: h } = ae();
		function g(e) {
			if (!(p.value || e.isComposing)) switch (e.key) {
				case d.ARROW_UP:
					e.preventDefault(), u.handleIncrease();
					break;
				case d.ARROW_DOWN:
					e.preventDefault(), u.handleDecrease();
					break;
				case d.PAGE_UP:
					e.preventDefault(), u.handleIncrease(10);
					break;
				case d.PAGE_DOWN:
					e.preventDefault(), u.handleDecrease(10);
					break;
				case d.HOME:
					e.preventDefault(), u.handleMinMaxValue("min");
					break;
				case d.END:
					e.preventDefault(), u.handleMinMaxValue("max");
					break;
				case d.ENTER: u.applyInputValue(e.target?.value);
			}
		}
		function y(e) {
			u.disableWheelChange.value || e.target === P() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? u.invertWheelChange.value ? u.handleDecrease() : u.handleIncrease() : e.deltaY < 0 && (u.invertWheelChange.value ? u.handleIncrease() : u.handleDecrease())));
		}
		n(() => {
			u.onInputElement(c.value);
		});
		let b = v(u.textValue.value);
		a(() => u.textValue.value, () => {
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
		return (t, n) => (e(), f(l(V), r(o, {
			id: l(u).id.value,
			ref_key: "primitiveElement",
			ref: s,
			value: b.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: l(u).inputMode.value,
			disabled: l(u).disabled.value ? "" : void 0,
			"data-disabled": l(u).disabled.value ? "" : void 0,
			readonly: l(u).readonly.value ? "" : void 0,
			"data-readonly": l(u).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": l(u).modelValue.value,
			"aria-valuemin": l(u).min.value,
			"aria-valuemax": l(u).max.value,
			onKeydown: g,
			onWheel: y,
			onBeforeinput: n[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				l(u).validate(n) || e.preventDefault();
			},
			onInput: n[1] ||= (e) => {
				let t = e.target;
				b.value = t.value;
			},
			onChange: x,
			onBlur: n[2] ||= (e) => l(u).applyInputValue(e.target?.value),
			onCompositionstart: l(m),
			onCompositionend: l(h)
		}), {
			default: _(() => [i(t.$slots, "default")]),
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
	setup(t, { emit: n }) {
		let a = t, d = n, p = I(a, "checked", d, { passive: a.checked === void 0 }), { value: m } = c(a), { forwardRef: g, currentElement: v } = R(), y = j(v), x = T(), C = h(() => a.id && v.value ? document.querySelector(`[for="${a.id}"]`)?.innerText ?? a.value : void 0);
		function w(e) {
			a.disabled || Ae(e, a.value, (e) => {
				d("select", e), !e?.defaultPrevented && (p.value = !0, y.value && e.stopPropagation());
			});
		}
		return (t, n) => (e(), o(b, null, [S(l(V), r({
			id: t.id,
			ref: l(g),
			role: "radio",
			type: t.as === "button" ? "button" : void 0,
			as: t.as,
			"aria-checked": l(p) ?? !1,
			"aria-label": C.value,
			"as-child": t.asChild,
			disabled: t.disabled ? "" : void 0,
			"data-state": l(p) ? "checked" : "unchecked",
			"data-disabled": t.disabled ? "" : void 0,
			value: l(m),
			required: t.required,
			name: t.name
		}, {
			...l(x),
			...t.$attrs
		}, { onClick: s(w, ["stop"]) }), {
			default: _(() => [i(t.$slots, "default", { checked: l(p) })]),
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
		]), l(y) && t.name ? (e(), f(l(E), r({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: l(m),
			checked: !!l(p),
			name: t.name,
			disabled: t.disabled,
			required: t.required
		}, l(x)), null, 16, [
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
	setup(t, { emit: n }) {
		let r = t, a = n, { forwardRef: o, currentElement: s } = R(), d = I(r, "modelValue", a, {
			defaultValue: r.defaultValue,
			passive: r.modelValue === void 0
		}), { disabled: p, loop: m, orientation: h, name: g, required: v, dir: y } = c(r), b = W(y), x = j(s);
		return Ne({
			modelValue: d,
			changeModelValue: (e) => {
				d.value = e;
			},
			disabled: p,
			loop: m,
			orientation: h,
			name: g?.value,
			required: v
		}), (t, n) => (e(), f(l(O), {
			"as-child": "",
			orientation: l(h),
			dir: l(b),
			loop: l(m)
		}, {
			default: _(() => [S(l(V), {
				ref: l(o),
				role: "radiogroup",
				"data-disabled": l(p) ? "" : void 0,
				"as-child": t.asChild,
				as: t.as,
				"aria-orientation": l(h),
				"aria-required": l(v),
				dir: l(b)
			}, {
				default: _(() => [i(t.$slots, "default", { modelValue: l(d) }), l(x) && l(g) ? (e(), f(l(E), {
					key: 0,
					required: l(v),
					disabled: l(p),
					value: l(d),
					name: l(g)
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
	setup(t, { emit: n }) {
		let a = t, o = n, { forwardRef: c, currentElement: u } = R(), d = Me(), p = h(() => d.disabled.value || a.disabled), m = h(() => d.required.value || a.required), g = h(() => A(d.modelValue?.value, a.value));
		Ie({
			disabled: p,
			checked: g
		});
		let b = v(!1), x = [
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
		return (t, n) => (e(), f(l(ee), {
			checked: g.value,
			disabled: p.value,
			"as-child": "",
			focusable: !p.value,
			active: g.value
		}, {
			default: _(() => [S(je, r({
				...l(w),
				...t.$attrs,
				...a
			}, {
				ref: l(c),
				checked: g.value,
				required: m.value,
				disabled: p.value,
				"onUpdate:checked": n[0] ||= (e) => l(d).changeModelValue(t.value),
				onSelect: n[1] ||= (e) => o("select", e),
				onKeydown: n[2] ||= y(s(() => {}, ["prevent"]), ["enter"]),
				onFocus: C
			}), {
				default: _(() => [i(t.$slots, "default", {
					checked: g.value,
					required: m.value,
					disabled: p.value
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
	setup(n, { emit: r }) {
		let i = r;
		function a(e) {
			i("update:modelValue", e);
		}
		return (r, i) => (e(), f(l(Pe), {
			class: g(l(w).segmentedControl),
			"data-layout": n.options.some((e) => e.label.length > 6) ? "hug" : "fill",
			"model-value": n.modelValue,
			disabled: n.disabled,
			orientation: "horizontal",
			"aria-label": n.label,
			"onUpdate:modelValue": a
		}, {
			default: _(() => [(e(!0), o(b, null, t(n.options, (t) => (e(), f(l(Le), {
				key: t.value,
				class: g(["tc-interactive", l(w).segmentedControlItem]),
				value: t.value
			}, {
				default: _(() => [m("span", { class: g(l(w).segmentedControlItemLabel) }, d(t.label), 3)]),
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
	setup(t, { emit: n }) {
		let i = t, a = n;
		function o(e) {
			a("update:modelValue", e);
		}
		let s = h(() => M({
			id: i.id,
			min: i.min,
			max: i.max
		})), c = h(() => M({
			"aria-label": i.label,
			"aria-describedby": i.describedBy
		}));
		return (n, i) => (e(), f(l(Te), r(s.value, {
			class: l(w).numberStepper,
			"model-value": t.modelValue ?? null,
			step: t.step,
			disabled: t.disabled,
			"onUpdate:modelValue": o
		}), {
			default: _(() => [
				S(l(Ee), {
					class: g(["tc-interactive", l(w).numberStepperButton]),
					"aria-label": t.decrementLabel
				}, {
					default: _(() => [S(C, {
						icon: l(D),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				S(l(Oe), r(c.value, { class: ["tc-tabular-nums", l(w).numberStepperInput] }), null, 16, ["class"]),
				S(l(De), {
					class: g(["tc-interactive", l(w).numberStepperButton]),
					"aria-label": t.incrementLabel
				}, {
					default: _(() => [S(C, {
						icon: l(k),
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
