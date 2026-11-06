import { A as e, C as t, D as n, G as r, H as i, I as a, L as o, M as s, O as c, P as l, T as u, V as d, _ as f, c as p, dt as m, ft as h, g, h as _, j as v, k as y, lt as b, m as x, mt as S, n as ee, ot as C, p as w, s as T, tt as E, u as D, v as O, x as k, y as A } from "./vue-i18n-L-BrQRnK.js";
import { i as te, n as j } from "./portal_keys-DthxrmWp.js";
import { t as M } from "./AppIcon-DkyxvN8k.js";
import { t as N } from "./components_styles-D-hVkM2e.js";
import { a as P, i as F, n as I, o as L, r as R } from "./AppCheckbox-COGvwvBT.js";
import { n as z } from "./FieldGroup-DUIzuG3F.js";
import { t as ne } from "./x-D7Ry5i_D.js";
import { a as B, i as V, o as H, r as re, t as U } from "./_prop_utils-DgoYzKlR.js";
import { C as W, M as G, N as K, P as q, S as ie, T as ae, f as J, g as oe, j as Y, s as X, v as se, w as ce, y as Z } from "./Teleport-CquQcgiX.js";
import { c as le, r as ue } from "./AppTooltip-LLSm3ZqS.js";
import { u as de } from "./IconButton-DsFRFlSI.js";
import { i as fe, n as pe, r as me, t as he } from "./PopoverPortal-CT9mA2k4.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function ge(e) {
	let t = E(!1);
	function n() {
		t.value = !0;
	}
	function r(n) {
		c(() => {
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
function _e() {
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
function ve(e) {
	let t = oe({ locale: E("en") });
	return w(() => e?.value || t.locale?.value || "en");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var ye = /* @__PURE__ */ k({
	__name: "PopoverAnchor",
	props: {
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
			required: !1
		}
	},
	setup(e) {
		let n = e;
		J();
		let i = fe();
		return y(() => {
			i.hasCustomAnchor.value = !0;
		}), s(() => {
			i.hasCustomAnchor.value = !1;
		}), (e, i) => (l(), _(b(ue), h(t(n)), {
			default: r(() => [o(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), be = /* @__PURE__ */ new Map(), xe = !1;
try {
	xe = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var Se = !1;
try {
	Se = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var Ce = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } }, we = class {
	constructor(e, t = {}) {
		this.numberFormatter = Te(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		if (t = !xe && this.options.signDisplay != null ? Ee(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), this.options.style === "unit" && !Se) {
			let { unit: e, unitDisplay: n = "short", locale: r } = this.resolvedOptions();
			if (!e) return t;
			let i = Ce[e]?.[n];
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
		return !xe && this.options.signDisplay != null && (e = {
			...e,
			signDisplay: this.options.signDisplay
		}), !Se && this.options.style === "unit" && (e = {
			...e,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		}), e;
	}
};
function Te(e, t = {}) {
	let { numberingSystem: n } = t;
	if (n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`), t.style === "unit" && !Se) {
		let { unit: e, unitDisplay: n = "short" } = t;
		if (!e) throw Error("unit option must be provided with style: \"unit\"");
		if (!Ce[e]?.[n]) throw Error(`Unsupported unit ${e} with unitDisplay = ${n}`);
		t = {
			...t,
			style: "decimal"
		};
	}
	let r = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (be.has(r)) return be.get(r);
	let i = new Intl.NumberFormat(e, t);
	return be.set(r, i), i;
}
function Ee(e, t, n) {
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
var De = /* @__PURE__ */ RegExp("^.*\\(.*\\).*$"), Oe = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
], ke = class {
	constructor(e, t = {}) {
		this.locale = e, this.options = t;
	}
	parse(e) {
		return je(this.locale, this.options, e).parse(e);
	}
	isValidPartialNumber(e, t, n) {
		return je(this.locale, this.options, e).isValidPartialNumber(e, t, n);
	}
	getNumberingSystem(e) {
		return je(this.locale, this.options, e).options.numberingSystem;
	}
}, Ae = /* @__PURE__ */ new Map();
function je(e, t, n) {
	let r = Me(e, t);
	if (!e.includes("-nu-") && !r.isValidPartialNumber(n)) {
		for (let i of Oe) if (i !== r.options.numberingSystem) {
			let r = Me(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + i, t);
			if (r.isValidPartialNumber(n)) return r;
		}
	}
	return r;
}
function Me(e, t) {
	let n = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : ""), r = Ae.get(n);
	return r || (r = new Ne(e, t), Ae.set(n, r)), r;
}
var Ne = class {
	constructor(e, t = {}) {
		this.locale = e, t.roundingIncrement !== 1 && t.roundingIncrement != null && (t.maximumFractionDigits == null && t.minimumFractionDigits == null ? (t.maximumFractionDigits = 0, t.minimumFractionDigits = 0) : t.maximumFractionDigits == null ? t.maximumFractionDigits = t.minimumFractionDigits : t.minimumFractionDigits ??= t.maximumFractionDigits), this.formatter = new Intl.NumberFormat(e, t), this.options = this.formatter.resolvedOptions(), this.symbols = Ie(e, this.formatter, this.options, t), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
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
			return new ke(this.locale, e).parse(new we(this.locale, e).format(r));
		}
		return this.options.currencySign === "accounting" && De.test(e) && (r = -1 * r), r;
	}
	sanitize(e) {
		let t = this.formatter.resolvedOptions().useGrouping;
		return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((t) => t.unit === e) ? this.symbols.noNumeralUnits.find((t) => t.unit === e).value.toString() : (e = e.replace(this.symbols.literals, ""), this.symbols.minusSign && (e = e.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (e = Q(e, ",", this.symbols.decimal), e = Q(e, "،", this.symbols.decimal)), this.symbols.group && t && (e = Q(e, ".", this.symbols.group))), this.symbols.group === "’" && e.includes("'") && t && (e = Q(e, "'", this.symbols.group)), this.symbols.group === "'" && e.includes("’") && t && (e = Q(e, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && t && (e = Q(e, " ", this.symbols.group), e = Q(e, /\u00A0/g, this.symbols.group)), e);
	}
	isValidPartialNumber(e, t = -Infinity, n = Infinity) {
		let r = this.formatter.resolvedOptions().useGrouping;
		return e = this.sanitize(e), this.symbols.minusSign && e.startsWith(this.symbols.minusSign) && t < 0 ? e = e.slice(this.symbols.minusSign.length) : this.symbols.plusSign && e.startsWith(this.symbols.plusSign) && n > 0 && (e = e.slice(this.symbols.plusSign.length)), this.symbols.decimal && e.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && r && (e = Q(e, this.symbols.group, "")), e = e.replace(this.symbols.numeral, ""), this.symbols.decimal && (e = e.replace(this.symbols.decimal, "")), e.length === 0);
	}
}, Pe = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]), Fe = [
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
function Ie(e, t, n, r) {
	let i = new Intl.NumberFormat(e, {
		...n,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: !0
	}), a = i.formatToParts(-10000.111), o = i.formatToParts(10000.111), s = Fe.map((e) => i.formatToParts(e)), c = s.map((e, t) => {
		let n = e.find((e) => e.type === "unit");
		return n && !e.some((e) => e.type === "integer" || e.type === "fraction") ? {
			unit: n.value,
			value: Fe[t]
		} : null;
	}).filter((e) => !!e), l = a.find((e) => e.type === "minusSign")?.value ?? "-", u = o.find((e) => e.type === "plusSign")?.value;
	!u && (r?.signDisplay === "exceptZero" || r?.signDisplay === "always") && (u = "+");
	let d = new Intl.NumberFormat(e, {
		...n,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((e) => e.type === "decimal")?.value, f = a.find((e) => e.type === "group")?.value, p = a.filter((e) => !Pe.has(e.type)).map((e) => Le(e.value)), m = s.flatMap((e) => e.filter((e) => !Pe.has(e.type)).map((e) => Le(e.value))), h = [.../* @__PURE__ */ new Set([...p, ...m])].sort((e, t) => t.length - e.length), g = h.length === 0 ? /* @__PURE__ */ RegExp("\\p{White_Space}|\\p{Cf}", "gu") : RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), _ = [...new Intl.NumberFormat(n.locale, { useGrouping: !1 }).format(9876543210)].reverse(), v = new Map(_.map((e, t) => [e, t])), y = RegExp(`[${_.join("")}]`, "g");
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
function Q(e, t, n) {
	return e.replaceAll ? e.replaceAll(t, n) : e.split(t).join(n);
}
function Le(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function Re(e) {
	let { disabled: t } = e, n = E(), r = W(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = E(!1), l = w(() => se(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, d = () => {
		c.value = !1, s();
	};
	return ce && (Z(l || window, "pointerdown", u), Z(window, "pointerup", d), Z(window, "pointercancel", d)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function ze(e, t = E({})) {
	return ae(() => new we(e.value, t.value));
}
function Be(e, t = E({})) {
	return ae(() => new ke(e.value, t.value));
}
function $(e, t, n) {
	let r = e === "+" ? t + n : t - n;
	if (t % 1 != 0 || n % 1 != 0) {
		let i = t.toString().split("."), a = n.toString().split("."), o = i[1] && i[1].length || 0, s = a[1] && a[1].length || 0, c = 10 ** Math.max(o, s);
		t = Math.round(t * c), n = Math.round(n * c), r = e === "+" ? t + n : t - n, r /= c;
	}
	return r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [Ve, He] = /*#__PURE__*/ q("NumberFieldRoot"), Ue = /* @__PURE__ */ k({
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
		let i = e, a = t, { disabled: s, readonly: c, disableWheelChange: u, invertWheelChange: d, min: f, max: p, step: m, stepSnapping: h, formatOptions: v, id: y, locale: x } = C(i), S = ie(i, "modelValue", a, {
			defaultValue: i.defaultValue,
			passive: i.modelValue === void 0
		}), { primitiveElement: ee, currentElement: T } = de(), D = ve(x), O = re(T), k = E(), A = w(() => Y(S.value) || isNaN(S.value) ? !1 : j("decrease", S.value) >= S.value), te = w(() => Y(S.value) || isNaN(S.value) ? !1 : j("increase", S.value) <= S.value);
		function j(e, t, n = 1) {
			let r = m.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (h.value && !isNaN(r)) {
				let o = B(t, f.value, p.value, r);
				if (o === t) a = $(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : $("+", o, r) : o < t ? o : $("-", o, r);
					a = n > 1 ? $(i, s, r * (n - 1)) : s;
				}
			} else a = $(i, t, r * n);
			return G(a);
		}
		function M(e, t = 1) {
			if (i.focusOnChange && k.value?.focus(), i.disabled || i.readonly) return;
			let n = R.parse(k.value?.value ?? "");
			if (isNaN(n)) {
				S.value = G(f.value ?? 0);
				return;
			}
			S.value = j(e, n, t);
		}
		function N(e = 1) {
			M("increase", e);
		}
		function P(e = 1) {
			M("decrease", e);
		}
		function I(e) {
			e === "min" && f.value !== void 0 ? S.value = G(f.value) : e === "max" && p.value !== void 0 && (S.value = G(p.value));
		}
		let L = ze(D, v), R = Be(D, v), z = w(() => L.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), ne = ze(D, v), H = w(() => Y(S.value) || isNaN(S.value) ? "" : ne.format(S.value));
		function U(e) {
			return R.isValidPartialNumber(e, f.value, p.value);
		}
		function W(e) {
			k.value && (k.value.value = e);
		}
		function G(e) {
			let t;
			return t = m.value === void 0 || isNaN(m.value) || !h.value ? V(e, f.value, p.value) : B(e, f.value, p.value, m.value), t = R.parse(L.format(t)), t;
		}
		function K(e) {
			let t = R.parse(e);
			return S.value = isNaN(t) ? void 0 : G(t), e.length ? W(H.value) : W(e);
		}
		return He({
			modelValue: S,
			handleDecrease: P,
			handleIncrease: N,
			handleMinMaxValue: I,
			inputMode: z,
			inputEl: k,
			onInputElement: (e) => k.value = e,
			textValue: H,
			readonly: c,
			validate: U,
			applyInputValue: K,
			disabled: s,
			disableWheelChange: u,
			invertWheelChange: d,
			max: p,
			min: f,
			isDecreaseDisabled: A,
			isIncreaseDisabled: te,
			id: y
		}), (e, t) => (l(), _(b(X), n(e.$attrs, {
			ref_key: "primitiveElement",
			ref: ee,
			role: "group",
			as: e.as,
			"as-child": e.asChild,
			"data-disabled": b(s) ? "" : void 0,
			"data-readonly": b(c) ? "" : void 0
		}), {
			default: r(() => [o(e.$slots, "default", {
				modelValue: b(S),
				textValue: H.value,
				readonly: b(c)
			}), b(O) && e.name ? (l(), _(b(F), {
				key: 0,
				type: "text",
				value: b(S),
				name: e.name,
				disabled: b(s),
				readonly: b(c),
				required: e.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : g("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), We = /* @__PURE__ */ k({
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
		let t = e, i = Ve(), a = w(() => i.disabled?.value || i.readonly.value || t.disabled || i.isDecreaseDisabled.value), { primitiveElement: s, currentElement: c } = de(), { isPressed: u, onTrigger: d } = Re({
			target: c,
			disabled: a
		});
		return d(() => {
			i.handleDecrease();
		}), (e, i) => (l(), _(b(X), n(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: b(u) ? "none" : void 0 },
			disabled: a.value ? "" : void 0,
			"data-disabled": a.value ? "" : void 0,
			"data-pressed": b(u) ? "true" : void 0,
			onContextmenu: i[0] ||= p(() => {}, ["prevent"])
		}), {
			default: r(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Ge = /* @__PURE__ */ k({
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
		let t = e, i = Ve(), a = w(() => i.disabled?.value || i.readonly.value || t.disabled || i.isIncreaseDisabled.value), { primitiveElement: s, currentElement: c } = de(), { isPressed: u, onTrigger: d } = Re({
			target: c,
			disabled: a
		});
		return d(() => {
			i.handleIncrease();
		}), (e, i) => (l(), _(b(X), n(t, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Increase",
			type: e.as === "button" ? "button" : void 0,
			style: { userSelect: b(u) ? "none" : void 0 },
			disabled: a.value ? "" : void 0,
			"data-disabled": a.value ? "" : void 0,
			"data-pressed": b(u) ? "true" : void 0,
			onContextmenu: i[0] ||= p(() => {}, ["prevent"])
		}), {
			default: r(() => [o(e.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Ke = /* @__PURE__ */ k({
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
		let t = e, { primitiveElement: a, currentElement: s } = de(), c = Ve(), u = _e(), { isComposing: d, handleCompositionStart: f, handleCompositionEnd: p } = ge();
		function m(e) {
			if (!(d.value || e.isComposing)) switch (e.key) {
				case u.ARROW_UP:
					e.preventDefault(), c.handleIncrease();
					break;
				case u.ARROW_DOWN:
					e.preventDefault(), c.handleDecrease();
					break;
				case u.PAGE_UP:
					e.preventDefault(), c.handleIncrease(10);
					break;
				case u.PAGE_DOWN:
					e.preventDefault(), c.handleDecrease(10);
					break;
				case u.HOME:
					e.preventDefault(), c.handleMinMaxValue("min");
					break;
				case u.END:
					e.preventDefault(), c.handleMinMaxValue("max");
					break;
				case u.ENTER: c.applyInputValue(e.target?.value);
			}
		}
		function h(e) {
			c.disableWheelChange.value || e.target === K() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? c.invertWheelChange.value ? c.handleDecrease() : c.handleIncrease() : e.deltaY < 0 && (c.invertWheelChange.value ? c.handleIncrease() : c.handleDecrease())));
		}
		v(() => {
			c.onInputElement(s.value);
		});
		let g = E(c.textValue.value);
		i(() => c.textValue.value, () => {
			g.value = c.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function y() {
			requestAnimationFrame(() => {
				g.value = c.textValue.value;
			});
		}
		return (e, i) => (l(), _(b(X), n(t, {
			id: b(c).id.value,
			ref_key: "primitiveElement",
			ref: a,
			value: g.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: b(c).inputMode.value,
			disabled: b(c).disabled.value ? "" : void 0,
			"data-disabled": b(c).disabled.value ? "" : void 0,
			readonly: b(c).readonly.value ? "" : void 0,
			"data-readonly": b(c).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": b(c).modelValue.value,
			"aria-valuemin": b(c).min.value,
			"aria-valuemax": b(c).max.value,
			onKeydown: m,
			onWheel: h,
			onBeforeinput: i[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				b(c).validate(n) || e.preventDefault();
			},
			onInput: i[1] ||= (e) => {
				let t = e.target;
				g.value = t.value;
			},
			onChange: y,
			onBlur: i[2] ||= (e) => b(c).applyInputValue(e.target?.value),
			onCompositionstart: b(f),
			onCompositionend: b(p)
		}), {
			default: r(() => [o(e.$slots, "default")]),
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
}), qe = "radio.select";
function Je(e, t, n) {
	G(qe, n, {
		originalEvent: e,
		value: t
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var Ye = /* @__PURE__ */ k({
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
		let i = e, a = t, s = ie(i, "checked", a, { passive: i.checked === void 0 }), { value: c } = C(i), { forwardRef: u, currentElement: d } = J(), m = re(d), h = P(), v = w(() => i.id && d.value ? document.querySelector(`[for="${i.id}"]`)?.innerText ?? i.value : void 0);
		function y(e) {
			i.disabled || Je(e, i.value, (e) => {
				a("select", e), !e?.defaultPrevented && (s.value = !0, m.value && e.stopPropagation());
			});
		}
		return (e, t) => (l(), f(D, null, [A(b(X), n({
			id: e.id,
			ref: b(u),
			role: "radio",
			type: e.as === "button" ? "button" : void 0,
			as: e.as,
			"aria-checked": b(s) ?? !1,
			"aria-label": v.value,
			"as-child": e.asChild,
			disabled: e.disabled ? "" : void 0,
			"data-state": b(s) ? "checked" : "unchecked",
			"data-disabled": e.disabled ? "" : void 0,
			value: b(c),
			required: e.required,
			name: e.name
		}, {
			...b(h),
			...e.$attrs
		}, { onClick: p(y, ["stop"]) }), {
			default: r(() => [o(e.$slots, "default", { checked: b(s) })]),
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
		]), b(m) && e.name ? (l(), _(b(F), n({
			key: 0,
			type: "radio",
			tabindex: "-1",
			value: b(c),
			checked: !!b(s),
			name: e.name,
			disabled: e.disabled,
			required: e.required
		}, b(h)), null, 16, [
			"value",
			"checked",
			"name",
			"disabled",
			"required"
		])) : g("v-if", !0)], 64));
	}
}), [Xe, Ze] = /*#__PURE__*/ q("RadioGroupRoot"), Qe = /* @__PURE__ */ k({
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
		let n = e, i = t, { forwardRef: a, currentElement: s } = J(), c = ie(n, "modelValue", i, {
			defaultValue: n.defaultValue,
			passive: n.modelValue === void 0
		}), { disabled: u, loop: d, orientation: f, name: p, required: m, dir: h } = C(n), v = le(h), y = re(s);
		return Ze({
			modelValue: c,
			changeModelValue: (e) => {
				c.value = e;
			},
			disabled: u,
			loop: d,
			orientation: f,
			name: p?.value,
			required: m
		}), (e, t) => (l(), _(b(R), {
			"as-child": "",
			orientation: b(f),
			dir: b(v),
			loop: b(d)
		}, {
			default: r(() => [A(b(X), {
				ref: b(a),
				role: "radiogroup",
				"data-disabled": b(u) ? "" : void 0,
				"as-child": e.asChild,
				as: e.as,
				"aria-orientation": b(f),
				"aria-required": b(m),
				dir: b(v)
			}, {
				default: r(() => [o(e.$slots, "default", { modelValue: b(c) }), b(y) && b(p) ? (l(), _(b(F), {
					key: 0,
					required: b(m),
					disabled: b(u),
					value: b(c),
					name: b(p)
				}, null, 8, [
					"required",
					"disabled",
					"value",
					"name"
				])) : g("v-if", !0)]),
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
}), [$e, et] = /*#__PURE__*/ q("RadioGroupItem"), tt = /* @__PURE__ */ k({
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
		let i = e, a = t, { forwardRef: s, currentElement: c } = J(), u = Xe(), d = w(() => u.disabled.value || i.disabled), f = w(() => u.required.value || i.required), m = w(() => H(u.modelValue?.value, i.value));
		et({
			disabled: d,
			checked: m
		});
		let h = E(!1), g = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		Z("keydown", (e) => {
			g.includes(e.key) && (h.value = !0);
		}), Z("keyup", () => {
			h.value = !1;
		});
		function v() {
			setTimeout(() => {
				h.value && c.value?.click();
			}, 0);
		}
		let y = P();
		return (e, t) => (l(), _(b(I), {
			checked: m.value,
			disabled: d.value,
			"as-child": "",
			focusable: !d.value,
			active: m.value
		}, {
			default: r(() => [A(Ye, n({
				...b(y),
				...e.$attrs,
				...i
			}, {
				ref: b(s),
				checked: m.value,
				required: f.value,
				disabled: d.value,
				"onUpdate:checked": t[0] ||= (t) => b(u).changeModelValue(e.value),
				onSelect: t[1] ||= (e) => a("select", e),
				onKeydown: t[2] ||= T(p(() => {}, ["prevent"]), ["enter"]),
				onFocus: v
			}), {
				default: r(() => [o(e.$slots, "default", {
					checked: m.value,
					required: f.value,
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
}), nt = /* @__PURE__ */ k({
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
		function i(e) {
			n("update:modelValue", e);
		}
		return (t, n) => (l(), _(b(Qe), {
			class: m(b(N).segmentedControl),
			"data-layout": e.options.some((e) => e.label.length > 6) ? "hug" : "fill",
			"model-value": e.modelValue,
			disabled: e.disabled,
			orientation: "horizontal",
			"aria-label": e.label,
			"onUpdate:modelValue": i
		}, {
			default: r(() => [(l(!0), f(D, null, a(e.options, (e) => (l(), _(b(tt), {
				key: e.value,
				class: m(["tc-interactive", b(N).segmentedControlItem]),
				value: e.value
			}, {
				default: r(() => [x("span", { class: m(b(N).segmentedControlItemLabel) }, S(e.label), 3)]),
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
}), rt = /* @__PURE__ */ k({
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
		let s = w(() => U({
			id: i.id,
			min: i.min,
			max: i.max
		})), c = w(() => U({
			"aria-label": i.label,
			"aria-describedby": i.describedBy
		}));
		return (t, i) => (l(), _(b(Ue), n(s.value, {
			class: b(N).numberStepper,
			"model-value": e.modelValue ?? null,
			step: e.step,
			disabled: e.disabled,
			"onUpdate:modelValue": o
		}), {
			default: r(() => [
				A(b(We), {
					class: m(["tc-interactive", b(N).numberStepperButton]),
					"aria-label": e.decrementLabel
				}, {
					default: r(() => [A(M, {
						icon: b(L),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				A(b(Ke), n(c.value, { class: ["tc-tabular-nums", b(N).numberStepperInput] }), null, 16, ["class"]),
				A(b(Ge), {
					class: m(["tc-interactive", b(N).numberStepperButton]),
					"aria-label": e.incrementLabel
				}, {
					default: r(() => [A(M, {
						icon: b(z),
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
}), it = ["aria-label", "onClick"], at = [
	"id",
	"value",
	"placeholder",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-describedby"
], ot = ["aria-label"], st = [
	"id",
	"aria-selected",
	"onMousedown",
	"onMousemove"
], ct = 150, lt = /* @__PURE__ */ k({
	__name: "TagInput",
	props: {
		modelValue: {},
		id: { default: void 0 },
		describedBy: { default: void 0 }
	},
	emits: ["update:modelValue"],
	setup(n, { emit: i }) {
		let o = /[,，]/u, s = /[぀-ヿ㐀-鿿豈-﫿]/u, c = n, g = i, { t: v, locale: y } = ee(), C = u(te, null), T = u(j, void 0), k = w(() => T ? { to: T } : {}), P = `${d()}-suggestions`, F = E(null), I = E(""), L = E([]), R = E(0), z = null, B = 0, V = w(() => [...new Set(c.modelValue.split(o).map((e) => e.trim()).filter((e) => e !== ""))]), H = w(() => L.value.length > 0), re = w(() => new Intl.NumberFormat(y.value, {
			notation: "compact",
			maximumFractionDigits: 1
		}));
		function U(e) {
			g("update:modelValue", [...new Set(e)].join(", "));
		}
		function W(e) {
			let t = e.map((e) => e.trim()).filter((e) => e !== "");
			t.length > 0 && U([...V.value, ...t]);
		}
		function G(e) {
			U(V.value.filter((t) => t !== e)), F.value?.focus();
		}
		function K() {
			B += 1, z !== null && (clearTimeout(z), z = null), L.value = [], R.value = 0;
		}
		function q() {
			let e = I.value.trim(), t = s.test(e) ? e.length >= 1 : e.length >= 2;
			if (C === null || !t) {
				K();
				return;
			}
			z !== null && clearTimeout(z);
			let n = ++B;
			z = setTimeout(() => {
				C.suggest(e).then((e) => {
					n === B && (L.value = (e ?? []).filter((e) => !V.value.includes(e.tag)), R.value = 0);
				});
			}, ct);
		}
		function ie(e) {
			let t = e.target.value.split(o), n = t.pop() ?? "";
			W(t), I.value = t.length > 0 ? n.trimStart() : n, q();
		}
		function ae() {
			W([I.value]), I.value = "", K();
		}
		function J(e) {
			let t = L.value[e];
			t !== void 0 && (W([t.tag]), I.value = "", K(), F.value?.focus());
		}
		function oe(e) {
			let t = L.value.length;
			if ((e.key === "ArrowDown" || e.key === "ArrowUp") && t > 0) {
				e.preventDefault();
				let n = e.key === "ArrowDown" ? 1 : -1;
				R.value = (R.value + n + t) % t;
			} else e.key === "Enter" ? (e.preventDefault(), t > 0 ? J(R.value) : ae()) : e.key === "Escape" && t > 0 ? (e.stopPropagation(), K()) : e.key === "Backspace" && I.value === "" && V.value.length > 0 && U(V.value.slice(0, -1));
		}
		function Y(e) {
			let t = I.value.trim().toLowerCase();
			return e.toLowerCase().startsWith(t) && t !== "" ? [e.slice(0, t.length), e.slice(t.length)] : ["", e];
		}
		function X(e) {
			e.target instanceof Node && F.value?.parentElement?.contains(e.target) && e.preventDefault();
		}
		return e(K), (e, i) => (l(), _(b(me), {
			open: H.value,
			"onUpdate:open": i[4] ||= (e) => !e && K()
		}, {
			default: r(() => [A(b(ye), { "as-child": "" }, {
				default: r(() => [x("div", {
					class: m(b(N).tagInput),
					onClick: i[0] ||= p((e) => F.value?.focus(), ["self"])
				}, [(l(!0), f(D, null, a(V.value, (e) => (l(), f("span", {
					key: e,
					class: m(b(N).tagInputChip)
				}, [O(S(e) + " ", 1), x("button", {
					type: "button",
					class: m(["tc-interactive", b(N).tagInputRemove]),
					"aria-label": b(v)("common.tag_input.remove", { tag: e }),
					onClick: (t) => G(e)
				}, [A(M, {
					icon: b(ne),
					size: 12
				}, null, 8, ["icon"])], 10, it)], 2))), 128)), x("input", {
					id: n.id,
					ref_key: "input",
					ref: F,
					value: I.value,
					type: "text",
					autocomplete: "off",
					class: m(b(N).tagInputField),
					placeholder: b(v)("common.tag_input.placeholder"),
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-expanded": H.value,
					"aria-controls": H.value ? P : void 0,
					"aria-activedescendant": H.value ? `${P}-${R.value}` : void 0,
					"aria-describedby": n.describedBy,
					onInput: ie,
					onKeydown: oe,
					onBlur: ae
				}, null, 42, at)], 2)]),
				_: 1
			}), A(b(he), h(t(k.value)), {
				default: r(() => [A(b(pe), {
					class: m(b(N).tagInputPopover),
					side: "bottom",
					align: "start",
					"side-offset": 4,
					onOpenAutoFocus: i[1] ||= p(() => {}, ["prevent"]),
					onCloseAutoFocus: i[2] ||= p(() => {}, ["prevent"]),
					onPointerDownOutside: X,
					onFocusOutside: i[3] ||= p(() => {}, ["prevent"])
				}, {
					default: r(() => [x("ul", {
						id: P,
						role: "listbox",
						"aria-label": b(v)("common.tag_input.suggestions_label"),
						class: m(b(N).tagInputList)
					}, [(l(!0), f(D, null, a(L.value, (e, t) => (l(), f("li", {
						id: `${P}-${t}`,
						key: e.tag,
						role: "option",
						"aria-selected": t === R.value,
						class: m(b(N).tagInputOption),
						onMousedown: p((e) => J(t), ["prevent"]),
						onMousemove: (e) => R.value = t
					}, [
						x("span", { class: m(b(N).tagInputOptionTag) }, [x("b", null, S(Y(e.tag)[0]), 1), O(S(Y(e.tag)[1]), 1)], 2),
						x("span", { class: m(b(N).tagInputOptionTranslation) }, S(e.translation ?? ""), 3),
						x("span", { class: m([b(N).tagInputOptionCount, "tc-tabular-nums"]) }, S(re.value.format(e.popularity)), 3)
					], 42, st))), 128))], 10, ot), x("div", {
						class: m(b(N).tagInputHints),
						"aria-hidden": "true"
					}, [
						x("span", null, [
							i[5] ||= x("kbd", null, "↑", -1),
							i[6] ||= O(),
							i[7] ||= x("kbd", null, "↓", -1),
							O(" " + S(b(v)("common.tag_input.hint_select")), 1)
						]),
						x("span", null, [i[8] ||= x("kbd", null, "Enter", -1), O(" " + S(b(v)("common.tag_input.hint_add")), 1)]),
						x("span", null, [i[9] ||= x("kbd", null, "Esc", -1), O(" " + S(b(v)("common.tag_input.hint_close")), 1)])
					], 2)]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"]));
	}
});
//#endregion
export { rt as n, nt as r, lt as t };
