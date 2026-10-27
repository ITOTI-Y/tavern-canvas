import { A as e, D as t, F as n, I as r, N as i, O as a, V as o, W as s, _ as c, at as l, c as u, ct as d, et as f, g as p, h as m, m as h, p as g, pt as _, s as v, u as y, ut as b, x, y as S } from "./vue-i18n-DUz2Gjn8.js";
import { t as C } from "./AppIcon-Cnhzrx9o.js";
import { r as w } from "./StateSurface-Bo_sA18G.js";
import { a as T, i as E, r as D } from "./AppDialog-BizR-VGE.js";
import { n as O } from "./FieldGroup-LDtWeac7.js";
import { a as k, c as ee, l as A, n as j, o as M, r as N, s as te } from "./AppSelect-CIW6ICNh.js";
import { A as ne, C as P, _ as F, c as I, d as re, i as L, j as R, k as z, m as B, p as V, v as H, x as ie } from "./Teleport-C7mDSUEl.js";
import { o as ae } from "./FocusScope-B2vRGnoX.js";
import { c as U } from "./PopperContent-a3U-C0mc.js";
import { l as W } from "./Collection-C3W7ausR.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function G(e) {
	let t = f(!1);
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
	let t = re({ locale: f("en") });
	return g(() => e?.value || t.locale?.value || "en");
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
	let { disabled: t } = e, n = f(), r = H(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = f(!1), l = g(() => V(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return ie && (B(l || window, "pointerdown", u), B(window, "pointerup", d), B(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Se(e, t = f({})) {
	return P(() => new ce(e.value, t.value));
}
function Ce(e, t = f({})) {
	return P(() => new pe(e.value, t.value));
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
var [$, we] = /*#__PURE__*/ R("NumberFieldRoot"), Te = /* @__PURE__ */ x({
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
	setup(e, { emit: n }) {
		let a = e, o = n, { disabled: c, readonly: u, disableWheelChange: h, invertWheelChange: _, min: v, max: y, step: b, stepSnapping: x, formatOptions: S, id: C, locale: w } = l(a), T = F(a, "modelValue", o, {
			defaultValue: a.defaultValue,
			passive: a.modelValue === void 0
		}), { primitiveElement: E, currentElement: D } = W(), O = oe(w), k = M(D), A = f(), j = g(() => z(T.value) || isNaN(T.value) ? !1 : P("decrease", T.value) >= T.value), ne = g(() => z(T.value) || isNaN(T.value) ? !1 : P("increase", T.value) <= T.value);
		function P(e, t, n = 1) {
			let r = b.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (x.value && !isNaN(r)) {
				let o = ee(t, v.value, y.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return q(a);
		}
		function I(e, t = 1) {
			if (a.focusOnChange && A.value?.focus(), a.disabled || a.readonly) return;
			let n = H.parse(A.value?.value ?? "");
			if (isNaN(n)) {
				T.value = q(v.value ?? 0);
				return;
			}
			T.value = P(e, n, t);
		}
		function re(e = 1) {
			I("increase", e);
		}
		function R(e = 1) {
			I("decrease", e);
		}
		function B(e) {
			e === "min" && v.value !== void 0 ? T.value = q(v.value) : e === "max" && y.value !== void 0 && (T.value = q(y.value));
		}
		let V = Se(O, S), H = Ce(O, S), ie = g(() => V.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), ae = Se(O, S), U = g(() => z(T.value) || isNaN(T.value) ? "" : ae.format(T.value));
		function G(e) {
			return H.isValidPartialNumber(e, v.value, y.value);
		}
		function K(e) {
			A.value && (A.value.value = e);
		}
		function q(e) {
			let t;
			return t = b.value === void 0 || isNaN(b.value) || !x.value ? te(e, v.value, y.value) : ee(e, v.value, y.value, b.value), t = H.parse(V.format(t)), t;
		}
		function J(e) {
			let t = H.parse(e);
			return T.value = isNaN(t) ? void 0 : q(t), e.length ? K(U.value) : K(e);
		}
		return we({
			modelValue: T,
			handleDecrease: R,
			handleIncrease: re,
			handleMinMaxValue: B,
			inputMode: ie,
			inputEl: A,
			onInputElement: (e) => A.value = e,
			textValue: U,
			readonly: u,
			validate: G,
			applyInputValue: J,
			disabled: c,
			disableWheelChange: h,
			invertWheelChange: _,
			max: y,
			min: v,
			isDecreaseDisabled: j,
			isIncreaseDisabled: ne,
			id: C
		}), (e, n) => (i(), m(d(L), t(e.$attrs, {
			ref_key: "primitiveElement",
			ref: E,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": d(c) ? "" : void 0,
			"data-readonly": d(u) ? "" : void 0
		}), {
			default: s(() => [r(e.$slots, "default", {
				modelValue: d(T),
				textValue: U.value,
				readonly: d(u)
			}), d(k) && e.name ? (i(), m(d(N), {
				key: 0,
				type: "text",
				value: d(T),
				name: e.name,
				disabled: d(c),
				readonly: d(u),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : p("v-if", !0)]),
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
	setup(e) {
		let n = e, a = $(), o = g(() => a.disabled?.value || a.readonly.value || n.disabled || a.isDecreaseDisabled.value), { primitiveElement: c, currentElement: l } = W(), { isPressed: f, onTrigger: p } = xe({
			target: l,
			disabled: o
		});
		return p(() => {
			a.handleDecrease();
		}), (e, a) => (i(), m(d(L), t(n, {
			ref_key: "primitiveElement",
			ref: c,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: d(f) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": d(f) ? "true" : void 0,
			onContextmenu: a[0] ||= u(() => {}, ["prevent"])
		}), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(e) {
		let n = e, a = $(), o = g(() => a.disabled?.value || a.readonly.value || n.disabled || a.isIncreaseDisabled.value), { primitiveElement: c, currentElement: l } = W(), { isPressed: f, onTrigger: p } = xe({
			target: l,
			disabled: o
		});
		return p(() => {
			a.handleIncrease();
		}), (e, a) => (i(), m(d(L), t(n, {
			ref_key: "primitiveElement",
			ref: c,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: d(f) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": d(f) ? "true" : void 0,
			onContextmenu: a[0] ||= u(() => {}, ["prevent"])
		}), {
			default: s(() => [r(e.$slots, "default")]),
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
	setup(n) {
		let a = n, { primitiveElement: c, currentElement: l } = W(), u = $(), p = K(), { isComposing: h, handleCompositionStart: g, handleCompositionEnd: _ } = G();
		function v(e) {
			if (!(h.value || e.isComposing)) switch (e.key) {
				case p.ARROW_UP:
					e.preventDefault(), u.handleIncrease();
					break;
				case p.ARROW_DOWN:
					e.preventDefault(), u.handleDecrease();
					break;
				case p.PAGE_UP:
					e.preventDefault(), u.handleIncrease(10);
					break;
				case p.PAGE_DOWN:
					e.preventDefault(), u.handleDecrease(10);
					break;
				case p.HOME:
					e.preventDefault(), u.handleMinMaxValue("min");
					break;
				case p.END:
					e.preventDefault(), u.handleMinMaxValue("max");
					break;
				case p.ENTER: u.applyInputValue(e.target?.value);
			}
		}
		function y(e) {
			u.disableWheelChange.value || e.target === ae() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? u.invertWheelChange.value ? u.handleDecrease() : u.handleIncrease() : e.deltaY < 0 && (u.invertWheelChange.value ? u.handleIncrease() : u.handleDecrease())));
		}
		e(() => {
			u.onInputElement(l.value);
		});
		let b = f(u.textValue.value);
		o(() => u.textValue.value, () => {
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
		return (e, n) => (i(), m(d(L), t(a, {
			id: d(u).id.value,
			ref_key: "primitiveElement",
			ref: c,
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
			onBeforeinput: n[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				d(u).validate(n) || e.preventDefault();
			},
			onInput: n[1] ||= (e) => {
				let t = e.target;
				b.value = t.value;
			},
			onChange: x,
			onBlur: n[2] ||= (e) => d(u).applyInputValue(e.target?.value),
			onCompositionstart: d(g),
			onCompositionend: d(_)
		}), {
			default: s(() => [r(e.$slots, "default")]),
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
	ne(ke, n, {
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
	setup(e, { emit: n }) {
		let a = e, o = n, f = F(a, "checked", o, { passive: a.checked === void 0 }), { value: h } = l(a), { forwardRef: _, currentElement: v } = I(), b = M(v), x = k(), C = g(() => a.id && v.value ? document.querySelector(`[for="${a.id}"]`)?.innerText ?? a.value : void 0);
		function w(e) {
			a.disabled || Ae(e, a.value, (e) => {
				o("select", e), !e?.defaultPrevented && (f.value = !0, b.value && e.stopPropagation());
			});
		}
		return (e, n) => (i(), c(y, null, [S(d(L), t({
			id: e.id,
			ref: d(_),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": d(f) ?? !1,
			"aria-label": C.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": d(f) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: d(h),
			required: e.required,
			name: e.name
		}, {
			...d(x),
			...e.$attrs
		}, { onClick: u(w, ["stop"]) }), {
			default: s(() => [r(e.$slots, "default", { checked: d(f) })]),
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
		]), d(b) && e.name ? (i(), m(d(N), t({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: d(h),
			checked: !!d(f),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, d(x)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : p("v-if", !0)], 64));
	}
}), [Me, Ne] = /*#__PURE__*/ R("RadioGroupRoot"), Pe = /* @__PURE__ */ x({
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
		let n = e, a = t, { forwardRef: o, currentElement: c } = I(), u = F(n, "modelValue", a, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: f, loop: h, orientation: g, name: _, required: v, dir: y } = l(n), b = U(y), x = M(c);
		return Ne({
			modelValue: u,
			changeModelValue: (e) => {
				u.value = e;
			},
			disabled: f,
			loop: h,
			orientation: g,
			name: _?.value,
			required: v
		}), (e, t) => (i(), m(d(E), {
			"as-child": "",
			orientation: d(g),
			dir: d(b),
			loop: d(h)
		}, {
			default: s(() => [S(d(L), {
				ref: d(o),
				role: "radiogroup",
				"data-disabled": d(f) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": d(g),
				"aria-required": d(v),
				dir: d(b)
			}, {
				default: s(() => [r(e.$slots, "default", { modelValue: d(u) }), d(x) && d(_) ? (i(), m(d(N), {
					key: 0,
					required: d(v),
					disabled: d(f),
					value: d(u),
					name: d(_)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : p("v-if", !0)]),
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
}), [Fe, Ie] = /*#__PURE__*/ R("RadioGroupItem"), Le = /* @__PURE__ */ x({
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
	setup(e, { emit: n }) {
		let a = e, o = n, { forwardRef: c, currentElement: l } = I(), p = Me(), h = g(() => p.disabled.value || a.disabled), _ = g(() => p.required.value || a.required), y = g(() => A(p.modelValue?.value, a.value));
		Ie({
			disabled: h,
			checked: y
		});
		let b = f(!1), x = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		B("keydown", (e) => {
			x.includes(e.key) && (b.value = !0);
		}), B("keyup", () => {
			b.value = !1;
		});
		function C() {
			setTimeout(() => {
				b.value && l.value?.click();
			}, 0);
		}
		let w = k();
		return (e, n) => (i(), m(d(D), {
			checked: y.value,
			disabled: h.value,
			"as-child": "",
			focusable: !h.value,
			active: y.value
		}, {
			default: s(() => [S(je, t({
				...d(w),
				...e.$attrs,
				...a
			}, {
				ref: d(c),
				checked: y.value,
				required: _.value,
				disabled: h.value,
				"onUpdate:checked": n[0] ||= (t) => d(p).changeModelValue(e.value),
				onSelect: n[1] ||= (e) => o("select", e),
				onKeydown: n[2] ||= v(u(() => {}, ["prevent"]), ["enter"]),
				onFocus: C
			}), {
				default: s(() => [r(e.$slots, "default", {
					checked: y.value,
					required: _.value,
					disabled: h.value
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
	setup(e, { emit: t }) {
		let r = t;
		function a(e) {
			r("update:modelValue", e);
		}
		return (t, r) => (i(), m(d(Pe), {
			class: b(d(w).segmentedControl),
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": a
		}, {
			default: s(() => [(i(!0), c(y, null, n(e.options, (e) => (i(), m(d(Le), {
				key: e.value,
				class: b(["tc-interactive", d(w).segmentedControlItem]),
				value: e.value
			}, {
				default: s(() => [h("span", { class: b(d(w).segmentedControlItemLabel) }, _(e.label), 3)]),
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
	setup(e, { emit: n }) {
		let r = e, a = n;
		function o(e) {
			a("update:modelValue", e);
		}
		let c = g(() => j({
			id: r.id,
			min: r.min,
			max: r.max
		})), l = g(() => j({
			"aria-label": r.label,
			"aria-describedby": r.describedBy
		}));
		return (n, r) => (i(), m(d(Te), t(c.value, {
			class: d(w).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": o
		}), {
			default: s(() => [
				S(d(Ee), {
					class: b(["tc-interactive", d(w).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: s(() => [S(C, {
						icon: d(T),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				S(d(Oe), t(l.value, { class: ["tc-tabular-nums", d(w).numberStepperInput] }), null, 16, ["class"]),
				S(d(De), {
					class: b(["tc-interactive", d(w).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: s(() => [S(C, {
						icon: d(O),
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
