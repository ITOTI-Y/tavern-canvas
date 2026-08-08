import { A as e, E as t, I as n, K as r, N as i, O as a, S as o, U as s, _ as c, d as l, ft as u, g as d, ht as f, j as p, n as m, nt as h, pt as g, r as _, st as v, t as y, ut as b, v as x, w as S, x as C, y as ee, z as w } from "./AppIcon-BpY-A4VH.js";
import { r as T } from "./StateSurface-CNBIMTjV.js";
import { n as E } from "./FieldGroup-BPi4aGE9.js";
import { $ as D, B as te, C as O, I as k, L as A, P as j, Q as M, S as N, U as P, V as F, W as I, Y as L, Z as ne } from "./PopperContent-_OEj_1Tb.js";
import { i as R, n as z, r as re } from "./AppSelect-YiC8A59f.js";
import { a as B, c as V, i as ie, l as ae, o as H, r as oe, s as U, t as W, u as se } from "./_prop_utils-CoKBy72F.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/minus.js
var G = _("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function K(e) {
	let t = h(!1);
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
	let t = j({ locale: h("en") });
	return d(() => e?.value || t.locale?.value || "en");
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
	let { disabled: t } = e, n = h(), r = F(), i = () => window.clearTimeout(n.value), a = (e) => {
		i(), !t.value && (r.trigger(), n.value = window.setTimeout(() => {
			a(60);
		}, e));
	}, o = () => {
		a(400);
	}, s = () => {
		i();
	}, c = h(!1), l = d(() => k(e.target)), u = (e) => {
		e.button !== 0 || c.value || (e.preventDefault(), c.value = !0, o());
	}, f = () => {
		c.value = !1, s();
	};
	return P && (A(l || window, "pointerdown", u), A(window, "pointerup", f), A(window, "pointercancel", f)), {
		isPressed: c,
		onTrigger: r.on
	};
}
function Te(e, t = h({})) {
	return I(() => new de(e.value, t.value));
}
function Ee(e, t = h({})) {
	return I(() => new ge(e.value, t.value));
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
var [$, De] = /*#__PURE__*/ M("NumberFieldRoot"), Oe = /* @__PURE__ */ S({
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
	setup(t, { emit: i }) {
		let a = t, o = i, { disabled: s, readonly: c, disableWheelChange: l, invertWheelChange: u, min: f, max: p, step: m, stepSnapping: g, formatOptions: _, id: y, locale: S } = v(a), C = te(a, "modelValue", o, {
			defaultValue: a.defaultValue,
			passive: a.modelValue === void 0
		}), { primitiveElement: T, currentElement: E } = N(), D = le(S), k = se(E), A = h(), j = d(() => L(C.value) || isNaN(C.value) ? !1 : P("decrease", C.value) >= C.value), M = d(() => L(C.value) || isNaN(C.value) ? !1 : P("increase", C.value) <= C.value);
		function P(e, t, n = 1) {
			let r = m.value ?? 1, i = e === "increase" ? "+" : "-", a;
			if (g.value && !isNaN(r)) {
				let o = R(t, f.value, p.value, r);
				if (o === t) a = Q(i, t, r * n);
				else {
					let s = e === "increase" ? o > t ? o : Q("+", o, r) : o < t ? o : Q("-", o, r);
					a = n > 1 ? Q(i, s, r * (n - 1)) : s;
				}
			} else a = Q(i, t, r * n);
			return G(a);
		}
		function F(e, t = 1) {
			if (a.focusOnChange && A.value?.focus(), a.disabled || a.readonly) return;
			let n = V.parse(A.value?.value ?? "");
			if (isNaN(n)) {
				C.value = G(f.value ?? 0);
				return;
			}
			C.value = P(e, n, t);
		}
		function I(e = 1) {
			F("increase", e);
		}
		function ne(e = 1) {
			F("decrease", e);
		}
		function z(e) {
			e === "min" && f.value !== void 0 ? C.value = G(f.value) : e === "max" && p.value !== void 0 && (C.value = G(p.value));
		}
		let B = Te(D, _), V = Ee(D, _), ie = d(() => B.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), ae = Te(D, _), H = d(() => L(C.value) || isNaN(C.value) ? "" : ae.format(C.value));
		function U(e) {
			return V.isValidPartialNumber(e, f.value, p.value);
		}
		function W(e) {
			A.value && (A.value.value = e);
		}
		function G(e) {
			let t;
			return t = m.value === void 0 || isNaN(m.value) || !g.value ? re(e, f.value, p.value) : R(e, f.value, p.value, m.value), t = V.parse(B.format(t)), t;
		}
		function K(e) {
			let t = V.parse(e);
			return C.value = isNaN(t) ? void 0 : G(t), e.length ? W(H.value) : W(e);
		}
		return De({
			modelValue: C,
			handleDecrease: ne,
			handleIncrease: I,
			handleMinMaxValue: z,
			inputMode: ie,
			inputEl: A,
			onInputElement: (e) => A.value = e,
			textValue: H,
			readonly: c,
			validate: U,
			applyInputValue: K,
			disabled: s,
			disableWheelChange: l,
			invertWheelChange: u,
			max: p,
			min: f,
			isDecreaseDisabled: j,
			isIncreaseDisabled: M,
			id: y
		}), (t, i) => (n(), x(b(O), e(t.$attrs, {
			ref_key: "primitiveElement",
			ref: T,
			role: "group",
			as: t.as,
			"as-child": t.asChild,
			"data-disabled": b(s) ? "" : void 0,
			"data-readonly": b(c) ? "" : void 0
		}), {
			default: r(() => [w(t.$slots, "default", {
				modelValue: b(C),
				textValue: H.value,
				readonly: b(c)
			}), b(k) && t.name ? (n(), x(b(oe), {
				key: 0,
				type: "text",
				value: b(C),
				name: t.name,
				disabled: b(s),
				readonly: b(c),
				required: t.required
			}, null, 8, [
				"value",
				"name",
				"disabled",
				"readonly",
				"required"
			])) : ee("v-if", !0)]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"data-disabled",
			"data-readonly"
		]));
	}
}), ke = /* @__PURE__ */ S({
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
		let i = t, a = $(), o = d(() => a.disabled?.value || a.readonly.value || i.disabled || a.isDecreaseDisabled.value), { primitiveElement: s, currentElement: c } = N(), { isPressed: u, onTrigger: f } = we({
			target: c,
			disabled: o
		});
		return f(() => {
			a.handleDecrease();
		}), (t, a) => (n(), x(b(O), e(i, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Decrease",
			type: t.as === "button" ? "button" : void 0,
			style: { userSelect: b(u) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": b(u) ? "true" : void 0,
			onContextmenu: a[0] ||= l(() => {}, ["prevent"])
		}), {
			default: r(() => [w(t.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), Ae = /* @__PURE__ */ S({
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
		let i = t, a = $(), o = d(() => a.disabled?.value || a.readonly.value || i.disabled || a.isIncreaseDisabled.value), { primitiveElement: s, currentElement: c } = N(), { isPressed: u, onTrigger: f } = we({
			target: c,
			disabled: o
		});
		return f(() => {
			a.handleIncrease();
		}), (t, a) => (n(), x(b(O), e(i, {
			ref_key: "primitiveElement",
			ref: s,
			tabindex: "-1",
			"aria-label": "Increase",
			type: t.as === "button" ? "button" : void 0,
			style: { userSelect: b(u) ? "none" : void 0 },
			disabled: o.value ? "" : void 0,
			"data-disabled": o.value ? "" : void 0,
			"data-pressed": b(u) ? "true" : void 0,
			onContextmenu: a[0] ||= l(() => {}, ["prevent"])
		}), {
			default: r(() => [w(t.$slots, "default")]),
			_: 3
		}, 16, [
			"type",
			"style",
			"disabled",
			"data-disabled",
			"data-pressed"
		]));
	}
}), je = /* @__PURE__ */ S({
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
		let a = t, { primitiveElement: o, currentElement: c } = N(), l = $(), u = ce(), { isComposing: d, handleCompositionStart: f, handleCompositionEnd: p } = K();
		function m(e) {
			if (!(d.value || e.isComposing)) switch (e.key) {
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
		function g(e) {
			l.disableWheelChange.value || e.target === ne() && (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || (e.preventDefault(), e.deltaY > 0 ? l.invertWheelChange.value ? l.handleDecrease() : l.handleIncrease() : e.deltaY < 0 && (l.invertWheelChange.value ? l.handleIncrease() : l.handleDecrease())));
		}
		i(() => {
			l.onInputElement(c.value);
		});
		let _ = h(l.textValue.value);
		s(() => l.textValue.value, () => {
			_.value = l.textValue.value;
		}, {
			immediate: !0,
			deep: !0
		});
		function v() {
			requestAnimationFrame(() => {
				_.value = l.textValue.value;
			});
		}
		return (t, i) => (n(), x(b(O), e(a, {
			id: b(l).id.value,
			ref_key: "primitiveElement",
			ref: o,
			value: _.value,
			role: "spinbutton",
			type: "text",
			tabindex: "0",
			inputmode: b(l).inputMode.value,
			disabled: b(l).disabled.value ? "" : void 0,
			"data-disabled": b(l).disabled.value ? "" : void 0,
			readonly: b(l).readonly.value ? "" : void 0,
			"data-readonly": b(l).readonly.value ? "" : void 0,
			autocomplete: "off",
			autocorrect: "off",
			spellcheck: "false",
			"aria-roledescription": "Number field",
			"aria-valuenow": b(l).modelValue.value,
			"aria-valuemin": b(l).min.value,
			"aria-valuemax": b(l).max.value,
			onKeydown: m,
			onWheel: g,
			onBeforeinput: i[0] ||= (e) => {
				if (e.isComposing) return;
				let t = e.target, n = t.value.slice(0, t.selectionStart ?? void 0) + (e.data ?? "") + t.value.slice(t.selectionEnd ?? void 0);
				b(l).validate(n) || e.preventDefault();
			},
			onInput: i[1] ||= (e) => {
				let t = e.target;
				_.value = t.value;
			},
			onChange: v,
			onBlur: i[2] ||= (e) => b(l).applyInputValue(e.target?.value),
			onCompositionstart: b(f),
			onCompositionend: b(p)
		}), {
			default: r(() => [w(t.$slots, "default")]),
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
}), Me = /* @__PURE__ */ S({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(e, { emit: i }) {
		let s = i;
		function l(e) {
			s("update:open", e);
		}
		let p = a(D, void 0), h = d(() => p ? { to: p } : {});
		return (i, a) => (n(), x(b(ae), {
			open: e.open,
			"onUpdate:open": l
		}, {
			default: r(() => [o(b(z), g(t(h.value)), {
				default: r(() => [o(b(B), { class: u(b(T).dialogOverlay) }, null, 8, ["class"]), o(b(U), { class: u(b(T).dialogContent) }, {
					default: r(() => [
						c("header", { class: u(b(T).dialogHeader) }, [o(b(ie), { class: u(b(T).dialogTitle) }, {
							default: r(() => [C(f(e.title), 1)]),
							_: 1
						}, 8, ["class"]), o(b(V), {
							class: u(["tc-interactive", b(T).dialogClose]),
							"aria-label": e.closeLabel
						}, {
							default: r(() => [o(y, {
								icon: b(m),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						e.description ? (n(), x(b(H), {
							key: 0,
							class: u(b(T).dialogDescription)
						}, {
							default: r(() => [C(f(e.description), 1)]),
							_: 1
						}, 8, ["class"])) : ee("", !0),
						c("div", { class: u(b(T).dialogBody) }, [w(i.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
}), Ne = /* @__PURE__ */ S({
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
	setup(t, { emit: i }) {
		let a = t, s = i;
		function c(e) {
			s("update:modelValue", e);
		}
		let l = d(() => W({
			id: a.id,
			min: a.min,
			max: a.max
		})), f = d(() => W({
			"aria-label": a.label,
			"aria-describedby": a.describedBy
		}));
		return (i, a) => (n(), x(b(Oe), e(l.value, {
			class: b(T).numberStepper,
			"model-value": t.modelValue ?? null,
			step: t.step,
			disabled: t.disabled,
			"onUpdate:modelValue": c
		}), {
			default: r(() => [
				o(b(ke), {
					class: u(["tc-interactive", b(T).numberStepperButton]),
					"aria-label": t.decrementLabel
				}, {
					default: r(() => [o(y, {
						icon: b(G),
						size: 14
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, ["class", "aria-label"]),
				o(b(je), e(f.value, { class: ["tc-tabular-nums", b(T).numberStepperInput] }), null, 16, ["class"]),
				o(b(Ae), {
					class: u(["tc-interactive", b(T).numberStepperButton]),
					"aria-label": t.incrementLabel
				}, {
					default: r(() => [o(y, {
						icon: b(E),
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

//# sourceMappingURL=NumberStepper-BcQ97MQl.js.map