//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var e;
function t(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var n = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, r = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(e = globalThis).__zod_globalConfig ?? (e.__zod_globalConfig = {});
var i = globalThis.__zod_globalConfig;
function a(e) {
	return e && Object.assign(i, e), i;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function o(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function s(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function c(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function l(e) {
	return e == null;
}
function u(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function d(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var ee = /* @__PURE__*/ Symbol("evaluating");
function f(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== ee) return r === void 0 && (r = ee, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function p(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function m(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function te(e) {
	return JSON.stringify(e);
}
function ne(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var re = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function h(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var ie = /* @__PURE__*/ c(() => {
	if (i.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function g(e) {
	if (h(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return h(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ae(e) {
	return g(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var oe = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function _(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function v(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function y(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function se(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var ce = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function le(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return v(e, m(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return p(this, "shape", e), e;
		},
		checks: []
	}));
}
function ue(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return v(e, m(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return p(this, "shape", r), r;
		},
		checks: []
	}));
}
function de(e, t) {
	if (!g(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return v(e, m(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return p(this, "shape", n), n;
	} }));
}
function fe(e, t) {
	if (!g(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return v(e, m(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return p(this, "shape", n), n;
	} }));
}
function pe(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return v(e, m(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return p(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function me(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return v(t, m(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return p(this, "shape", i), i;
		},
		checks: []
	}));
}
function he(e, t, n) {
	return v(t, m(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return p(this, "shape", i), i;
	} }));
}
function b(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function ge(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function x(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function _e(e) {
	return typeof e == "string" ? e : e?.message;
}
function S(e, t, n) {
	let r = e.message ? e.message : _e(e.inst?._zod.def?.error?.(e)) ?? _e(t?.error?.(e)) ?? _e(n.customError?.(e)) ?? _e(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function ve(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function C(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
var ye = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, s, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, be = t("$ZodError", ye), xe = t("$ZodError", ye, { Parent: Error });
function Se(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Ce(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i];
					i === e.length - 1 ? (r[n] = r[n] || { _errors: [] }, r[n]._errors.push(t(a))) : r[n] = r[n] || { _errors: [] }, r = r[n], i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
var we = (e) => (t, r, i, o) => {
	let s = i ? {
		...i,
		async: !1
	} : { async: !1 }, c = t._zod.run({
		value: r,
		issues: []
	}, s);
	if (c instanceof Promise) throw new n();
	if (c.issues.length) {
		let t = new ((o?.Err) ?? e)(c.issues.map((e) => S(e, s, a())));
		throw re(t, o?.callee), t;
	}
	return c.value;
}, Te = (e) => async (t, n, r, i) => {
	let o = r ? {
		...r,
		async: !0
	} : { async: !0 }, s = t._zod.run({
		value: n,
		issues: []
	}, o);
	if (s instanceof Promise && (s = await s), s.issues.length) {
		let t = new ((i?.Err) ?? e)(s.issues.map((e) => S(e, o, a())));
		throw re(t, i?.callee), t;
	}
	return s.value;
}, Ee = (e) => (t, r, i) => {
	let o = i ? {
		...i,
		async: !1
	} : { async: !1 }, s = t._zod.run({
		value: r,
		issues: []
	}, o);
	if (s instanceof Promise) throw new n();
	return s.issues.length ? {
		success: !1,
		error: new (e ?? be)(s.issues.map((e) => S(e, o, a())))
	} : {
		success: !0,
		data: s.value
	};
}, De = /* @__PURE__*/ Ee(xe), Oe = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, i);
	return o instanceof Promise && (o = await o), o.issues.length ? {
		success: !1,
		error: new e(o.issues.map((e) => S(e, i, a())))
	} : {
		success: !0,
		data: o.value
	};
}, ke = /* @__PURE__*/ Oe(xe), Ae = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return we(e)(t, n, i);
}, je = (e) => (t, n, r) => we(e)(t, n, r), Me = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Te(e)(t, n, i);
}, Ne = (e) => async (t, n, r) => Te(e)(t, n, r), Pe = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ee(e)(t, n, i);
}, Fe = (e) => (t, n, r) => Ee(e)(t, n, r), Ie = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Oe(e)(t, n, i);
}, Le = (e) => async (t, n, r) => Oe(e)(t, n, r), Re = /^[cC][0-9a-z]{6,}$/, ze = /^[0-9a-z]+$/, Be = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Ve = /^[0-9a-vA-V]{20}$/, He = /^[A-Za-z0-9]{27}$/, Ue = /^[a-zA-Z0-9_-]{21}$/, We = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ge = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ke = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, qe = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Je = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Ye() {
	return new RegExp(Je, "u");
}
var Xe = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ze = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Qe = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, $e = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, et = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, tt = /^[A-Za-z0-9_-]*$/, nt = /^https?$/, rt = /^\+[1-9]\d{6,14}$/, it = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", at = /*@__PURE__*/ RegExp(`^${it}$`);
function ot(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function st(e) {
	return RegExp(`^${ot(e)}$`);
}
function ct(e) {
	let t = ot({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${it}T(?:${r})$`);
}
var lt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, ut = /^-?\d+$/, dt = /^-?\d+(?:\.\d+)?$/, ft = /^(?:true|false)$/i, pt = /^null$/i, mt = /^[^A-Z]*$/, ht = /^[^a-z]*$/, w = /*@__PURE__*/ t("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), gt = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, _t = /*@__PURE__*/ t("$ZodCheckLessThan", (e, t) => {
	w.init(e, t);
	let n = gt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), vt = /*@__PURE__*/ t("$ZodCheckGreaterThan", (e, t) => {
	w.init(e, t);
	let n = gt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), yt = /*@__PURE__*/ t("$ZodCheckMultipleOf", (e, t) => {
	w.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : d(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), bt = /*@__PURE__*/ t("$ZodCheckNumberFormat", (e, t) => {
	w.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = ce[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = ut);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), xt = /*@__PURE__*/ t("$ZodCheckMaxLength", (e, t) => {
	var n;
	w.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !l(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = ve(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), St = /*@__PURE__*/ t("$ZodCheckMinLength", (e, t) => {
	var n;
	w.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !l(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = ve(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Ct = /*@__PURE__*/ t("$ZodCheckLengthEquals", (e, t) => {
	var n;
	w.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !l(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = ve(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), wt = /*@__PURE__*/ t("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	w.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Tt = /*@__PURE__*/ t("$ZodCheckRegex", (e, t) => {
	wt.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /*@__PURE__*/ t("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= mt, wt.init(e, t);
}), Dt = /*@__PURE__*/ t("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= ht, wt.init(e, t);
}), Ot = /*@__PURE__*/ t("$ZodCheckIncludes", (e, t) => {
	w.init(e, t);
	let n = _(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), kt = /*@__PURE__*/ t("$ZodCheckStartsWith", (e, t) => {
	w.init(e, t);
	let n = RegExp(`^${_(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), At = /*@__PURE__*/ t("$ZodCheckEndsWith", (e, t) => {
	w.init(e, t);
	let n = RegExp(`.*${_(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), jt = /*@__PURE__*/ t("$ZodCheckOverwrite", (e, t) => {
	w.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Mt = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, Nt = {
	major: 4,
	minor: 4,
	patch: 3
}, T = /*@__PURE__*/ t("$ZodType", (e, t) => {
	var r;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Nt;
	let i = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && i.unshift(e);
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, r) => {
			let i = b(e), a;
			for (let o of t) {
				if (o._zod.def.when) {
					if (ge(e) || !o._zod.def.when(e)) continue;
				} else if (i) continue;
				let t = e.issues.length, s = o._zod.check(e);
				if (s instanceof Promise && r?.async === !1) throw new n();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, e.issues.length !== t && (i ||= b(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					i ||= b(e, t);
				}
			}
			return a ? a.then(() => e) : e;
		}, r = (r, a, o) => {
			if (b(r)) return r.aborted = !0, r;
			let s = t(a, i, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new n();
				return s.then((t) => e._zod.parse(t, o));
			}
			return e._zod.parse(s, o);
		};
		e._zod.run = (a, o) => {
			if (o.skipChecks) return e._zod.parse(a, o);
			if (o.direction === "backward") {
				let t = e._zod.parse({
					value: a.value,
					issues: []
				}, {
					...o,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => r(e, a, o)) : r(t, a, o);
			}
			let s = e._zod.parse(a, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new n();
				return s.then((e) => t(e, i, o));
			}
			return t(s, i, o);
		};
	}
	f(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = De(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return ke(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Pt = /*@__PURE__*/ t("$ZodString", (e, t) => {
	T.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? lt(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), E = /*@__PURE__*/ t("$ZodStringFormat", (e, t) => {
	wt.init(e, t), Pt.init(e, t);
}), Ft = /*@__PURE__*/ t("$ZodGUID", (e, t) => {
	t.pattern ??= Ge, E.init(e, t);
}), It = /*@__PURE__*/ t("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= Ke(e);
	} else t.pattern ??= Ke();
	E.init(e, t);
}), Lt = /*@__PURE__*/ t("$ZodEmail", (e, t) => {
	t.pattern ??= qe, E.init(e, t);
}), Rt = /*@__PURE__*/ t("$ZodURL", (e, t) => {
	E.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === nt.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), n.value = t.normalize ? i.href : r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), zt = /*@__PURE__*/ t("$ZodEmoji", (e, t) => {
	t.pattern ??= Ye(), E.init(e, t);
}), Bt = /*@__PURE__*/ t("$ZodNanoID", (e, t) => {
	t.pattern ??= Ue, E.init(e, t);
}), Vt = /*@__PURE__*/ t("$ZodCUID", (e, t) => {
	t.pattern ??= Re, E.init(e, t);
}), Ht = /*@__PURE__*/ t("$ZodCUID2", (e, t) => {
	t.pattern ??= ze, E.init(e, t);
}), Ut = /*@__PURE__*/ t("$ZodULID", (e, t) => {
	t.pattern ??= Be, E.init(e, t);
}), Wt = /*@__PURE__*/ t("$ZodXID", (e, t) => {
	t.pattern ??= Ve, E.init(e, t);
}), Gt = /*@__PURE__*/ t("$ZodKSUID", (e, t) => {
	t.pattern ??= He, E.init(e, t);
}), Kt = /*@__PURE__*/ t("$ZodISODateTime", (e, t) => {
	t.pattern ??= ct(t), E.init(e, t);
}), qt = /*@__PURE__*/ t("$ZodISODate", (e, t) => {
	t.pattern ??= at, E.init(e, t);
}), Jt = /*@__PURE__*/ t("$ZodISOTime", (e, t) => {
	t.pattern ??= st(t), E.init(e, t);
}), Yt = /*@__PURE__*/ t("$ZodISODuration", (e, t) => {
	t.pattern ??= We, E.init(e, t);
}), Xt = /*@__PURE__*/ t("$ZodIPv4", (e, t) => {
	t.pattern ??= Xe, E.init(e, t), e._zod.bag.format = "ipv4";
}), Zt = /*@__PURE__*/ t("$ZodIPv6", (e, t) => {
	t.pattern ??= Ze, E.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Qt = /*@__PURE__*/ t("$ZodCIDRv4", (e, t) => {
	t.pattern ??= Qe, E.init(e, t);
}), $t = /*@__PURE__*/ t("$ZodCIDRv6", (e, t) => {
	t.pattern ??= $e, E.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function en(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var tn = /*@__PURE__*/ t("$ZodBase64", (e, t) => {
	t.pattern ??= et, E.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		en(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function nn(e) {
	if (!tt.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return en(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var rn = /*@__PURE__*/ t("$ZodBase64URL", (e, t) => {
	t.pattern ??= tt, E.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		nn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), an = /*@__PURE__*/ t("$ZodE164", (e, t) => {
	t.pattern ??= rt, E.init(e, t);
});
function on(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var sn = /*@__PURE__*/ t("$ZodJWT", (e, t) => {
	E.init(e, t), e._zod.check = (n) => {
		on(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), cn = /*@__PURE__*/ t("$ZodNumber", (e, t) => {
	T.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? dt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), ln = /*@__PURE__*/ t("$ZodNumberFormat", (e, t) => {
	bt.init(e, t), cn.init(e, t);
}), un = /*@__PURE__*/ t("$ZodBoolean", (e, t) => {
	T.init(e, t), e._zod.pattern = ft, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), dn = /*@__PURE__*/ t("$ZodNull", (e, t) => {
	T.init(e, t), e._zod.pattern = pt, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), fn = /*@__PURE__*/ t("$ZodUnknown", (e, t) => {
	T.init(e, t), e._zod.parse = (e) => e;
}), pn = /*@__PURE__*/ t("$ZodNever", (e, t) => {
	T.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function mn(e, t, n) {
	e.issues.length && t.issues.push(...x(n, e.issues)), t.value[n] = e.value;
}
var hn = /*@__PURE__*/ t("$ZodArray", (e, t) => {
	T.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => mn(t, n, e))) : mn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function gn(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...x(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function _n(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = se(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function vn(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === "optional", d = c.optout === "optional";
	for (let i in t) {
		if (i === "__proto__" || s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => gn(e, n, i, t, u, d))) : gn(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var yn = /*@__PURE__*/ t("$ZodObject", (e, t) => {
	if (T.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = c(() => _n(t));
	f(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = h, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === "optional", i = n._zod.optout === "optional", a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => gn(n, t, e, s, r, i))) : gn(a, t, e, s, r, i);
		}
		return i ? vn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), bn = /*@__PURE__*/ t("$ZodObjectJIT", (e, t) => {
	yn.init(e, t);
	let n = e._zod.parse, r = c(() => _n(t)), a = (e) => {
		let t = new Mt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = te(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = te(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), c && l ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : c ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, o, s = h, l = !i.jitless, u = l && ie.value, d = t.catchall, ee;
	e._zod.parse = (i, c) => {
		ee ??= r.value;
		let f = i.value;
		return s(f) ? l && u && c?.async === !1 && c.jitless !== !0 ? (o ||= a(t.shape), i = o(i, c), d ? vn([], f, i, c, ee, e) : i) : n(i, c) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: f,
			inst: e
		}), i);
	};
});
function xn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !b(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => S(e, r, a())))
	}), t);
}
var Sn = /*@__PURE__*/ t("$ZodUnion", (e, t) => {
	T.init(e, t), f(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), f(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), f(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), f(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => u(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => xn(t, r, e, i)) : xn(o, r, e, i);
	};
}), Cn = /*@__PURE__*/ t("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, Sn.init(e, t);
	let n = e._zod.parse;
	f(e._zod, "propValues", () => {
		let e = {};
		for (let n of t.options) {
			let r = n._zod.propValues;
			if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
			for (let [t, n] of Object.entries(r)) {
				e[t] || (e[t] = /* @__PURE__ */ new Set());
				for (let r of n) e[t].add(r);
			}
		}
		return e;
	});
	let r = c(() => {
		let e = t.options, n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r._zod.propValues?.[t.discriminator];
			if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
			for (let t of e) {
				if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
				n.set(t, r);
			}
		}
		return n;
	});
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!h(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = r.value.get(o?.[t.discriminator]);
		return s ? s._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), wn = /*@__PURE__*/ t("$ZodIntersection", (e, t) => {
	T.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => En(e, t, n)) : En(e, i, a);
	};
});
function Tn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (g(e) && g(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Tn(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Tn(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function En(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), b(e)) return e;
	let o = Tn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Dn = /*@__PURE__*/ t("$ZodTuple", (e, t) => {
	T.init(e, t);
	let n = t.items;
	e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			input: a,
			inst: e,
			expected: "tuple",
			code: "invalid_type"
		}), r;
		r.value = [];
		let o = [], s = On(n, "optin"), c = On(n, "optout");
		if (!t.rest) {
			if (a.length < s) return r.issues.push({
				code: "too_small",
				minimum: s,
				inclusive: !0,
				input: a,
				inst: e,
				origin: "array"
			}), r;
			a.length > n.length && r.issues.push({
				code: "too_big",
				maximum: n.length,
				inclusive: !0,
				input: a,
				inst: e,
				origin: "array"
			});
		}
		let l = Array(n.length);
		for (let e = 0; e < n.length; e++) {
			let t = n[e]._zod.run({
				value: a[e],
				issues: []
			}, i);
			t instanceof Promise ? o.push(t.then((t) => {
				l[e] = t;
			})) : l[e] = t;
		}
		if (t.rest) {
			let e = n.length - 1, s = a.slice(n.length);
			for (let n of s) {
				e++;
				let a = t.rest._zod.run({
					value: n,
					issues: []
				}, i);
				a instanceof Promise ? o.push(a.then((t) => kn(t, r, e))) : kn(a, r, e);
			}
		}
		return o.length ? Promise.all(o).then(() => An(l, r, n, a, c)) : An(l, r, n, a, c);
	};
});
function On(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (e[n]._zod[t] !== "optional") return n + 1;
	return 0;
}
function kn(e, t, n) {
	e.issues.length && t.issues.push(...x(n, e.issues)), t.value[n] = e.value;
}
function An(e, t, n, r, i) {
	for (let a = 0; a < n.length; a++) {
		let n = e[a], o = a < r.length;
		if (n.issues.length) {
			if (!o && a >= i) {
				t.value.length = a;
				break;
			}
			t.issues.push(...x(a, n.issues));
		}
		t.value[a] = n.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
var jn = /*@__PURE__*/ t("$ZodRecord", (e, t) => {
	T.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!g(i)) return n.issues.push({
			expected: "record",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		let o = [], s = t.keyType._zod.values;
		if (s) {
			n.value = {};
			let c = /* @__PURE__ */ new Set();
			for (let l of s) if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
				c.add(typeof l == "number" ? l.toString() : l);
				let s = t.keyType._zod.run({
					value: l,
					issues: []
				}, r);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => S(e, r, a())),
						input: l,
						path: [l],
						inst: e
					});
					continue;
				}
				let u = s.value, d = t.valueType._zod.run({
					value: i[l],
					issues: []
				}, r);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && n.issues.push(...x(l, e.issues)), n.value[u] = e.value;
				})) : (d.issues.length && n.issues.push(...x(l, d.issues)), n.value[u] = d.value);
			}
			let l;
			for (let e in i) c.has(e) || (l ??= [], l.push(e));
			l && l.length > 0 && n.issues.push({
				code: "unrecognized_keys",
				input: i,
				inst: e,
				keys: l
			});
		} else {
			n.value = {};
			for (let s of Reflect.ownKeys(i)) {
				if (s === "__proto__" || !Object.prototype.propertyIsEnumerable.call(i, s)) continue;
				let c = t.keyType._zod.run({
					value: s,
					issues: []
				}, r);
				if (c instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof s == "string" && dt.test(s) && c.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(s),
						issues: []
					}, r);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (c = e);
				}
				if (c.issues.length) {
					t.mode === "loose" ? n.value[s] = i[s] : n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: c.issues.map((e) => S(e, r, a())),
						input: s,
						path: [s],
						inst: e
					});
					continue;
				}
				let l = t.valueType._zod.run({
					value: i[s],
					issues: []
				}, r);
				l instanceof Promise ? o.push(l.then((e) => {
					e.issues.length && n.issues.push(...x(s, e.issues)), n.value[c.value] = e.value;
				})) : (l.issues.length && n.issues.push(...x(s, l.issues)), n.value[c.value] = l.value);
			}
		}
		return o.length ? Promise.all(o).then(() => n) : n;
	};
}), Mn = /*@__PURE__*/ t("$ZodEnum", (e, t) => {
	T.init(e, t);
	let n = o(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => oe.has(typeof e)).map((e) => typeof e == "string" ? _(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Nn = /*@__PURE__*/ t("$ZodLiteral", (e, t) => {
	if (T.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? _(e) : e ? _(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Pn = /*@__PURE__*/ t("$ZodTransform", (e, t) => {
	T.init(e, t), e._zod.optin = "optional", e._zod.parse = (i, a) => {
		if (a.direction === "backward") throw new r(e.constructor.name);
		let o = t.transform(i.value, i);
		if (a.async) return (o instanceof Promise ? o : Promise.resolve(o)).then((e) => (i.value = e, i.fallback = !0, i));
		if (o instanceof Promise) throw new n();
		return i.value = o, i.fallback = !0, i;
	};
});
function Fn(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var In = /*@__PURE__*/ t("$ZodOptional", (e, t) => {
	T.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", f(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), f(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${u(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => Fn(e, r)) : Fn(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Ln = /*@__PURE__*/ t("$ZodExactOptional", (e, t) => {
	In.init(e, t), f(e._zod, "values", () => t.innerType._zod.values), f(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Rn = /*@__PURE__*/ t("$ZodNullable", (e, t) => {
	T.init(e, t), f(e._zod, "optin", () => t.innerType._zod.optin), f(e._zod, "optout", () => t.innerType._zod.optout), f(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${u(e.source)}|null)$`) : void 0;
	}), f(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), zn = /*@__PURE__*/ t("$ZodDefault", (e, t) => {
	T.init(e, t), e._zod.optin = "optional", f(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Bn(e, t)) : Bn(r, t);
	};
});
function Bn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Vn = /*@__PURE__*/ t("$ZodPrefault", (e, t) => {
	T.init(e, t), e._zod.optin = "optional", f(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Hn = /*@__PURE__*/ t("$ZodNonOptional", (e, t) => {
	T.init(e, t), f(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Un(t, e)) : Un(i, e);
	};
});
function Un(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Wn = /*@__PURE__*/ t("$ZodCatch", (e, t) => {
	T.init(e, t), e._zod.optin = "optional", f(e._zod, "optout", () => t.innerType._zod.optout), f(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => S(e, n, a())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => S(e, n, a())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), Gn = /*@__PURE__*/ t("$ZodPipe", (e, t) => {
	T.init(e, t), f(e._zod, "values", () => t.in._zod.values), f(e._zod, "optin", () => t.in._zod.optin), f(e._zod, "optout", () => t.out._zod.optout), f(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Kn(e, t.in, n)) : Kn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Kn(e, t.out, n)) : Kn(r, t.out, n);
	};
});
function Kn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var qn = /*@__PURE__*/ t("$ZodReadonly", (e, t) => {
	T.init(e, t), f(e._zod, "propValues", () => t.innerType._zod.propValues), f(e._zod, "values", () => t.innerType._zod.values), f(e._zod, "optin", () => t.innerType?._zod?.optin), f(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Jn) : Jn(r);
	};
});
function Jn(e) {
	return e.value = Object.freeze(e.value), e;
}
var Yn = /*@__PURE__*/ t("$ZodLazy", (e, t) => {
	T.init(e, t), f(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), f(e._zod, "pattern", () => e._zod.innerType?._zod?.pattern), f(e._zod, "propValues", () => e._zod.innerType?._zod?.propValues), f(e._zod, "optin", () => e._zod.innerType?._zod?.optin ?? void 0), f(e._zod, "optout", () => e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), Xn = /*@__PURE__*/ t("$ZodCustom", (e, t) => {
	w.init(e, t), T.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Zn(t, n, r, e));
		Zn(i, n, r, e);
	};
});
function Zn(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(C(e));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
var Qn, $n = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function er() {
	return new $n();
}
(Qn = globalThis).__zod_globalRegistry ?? (Qn.__zod_globalRegistry = er());
var tr = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function nr(e, t) {
	return new e({
		type: "string",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new e({
		type: "boolean",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
	return new e({
		type: "null",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Nr(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new e({
		type: "never",
		...y(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t) {
	return new _t({
		check: "less_than",
		...y(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t) {
	return new _t({
		check: "less_than",
		...y(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t) {
	return new vt({
		check: "greater_than",
		...y(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new vt({
		check: "greater_than",
		...y(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new yt({
		check: "multiple_of",
		...y(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new xt({
		check: "max_length",
		...y(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t) {
	return new St({
		check: "min_length",
		...y(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t) {
	return new Ct({
		check: "length_equals",
		...y(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ur(e, t) {
	return new Tt({
		check: "string_format",
		format: "regex",
		...y(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Wr(e) {
	return new Et({
		check: "string_format",
		format: "lowercase",
		...y(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Gr(e) {
	return new Dt({
		check: "string_format",
		format: "uppercase",
		...y(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t) {
	return new Ot({
		check: "string_format",
		format: "includes",
		...y(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function qr(e, t) {
	return new kt({
		check: "string_format",
		format: "starts_with",
		...y(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Jr(e, t) {
	return new At({
		check: "string_format",
		format: "ends_with",
		...y(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function D(e) {
	return new jt({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yr(e) {
	return /* @__PURE__ */ D((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Xr() {
	return /* @__PURE__ */ D((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Zr() {
	return /* @__PURE__ */ D((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Qr() {
	return /* @__PURE__ */ D((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function $r() {
	return /* @__PURE__ */ D((e) => ne(e));
}
// @__NO_SIDE_EFFECTS__
function ei(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...y(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ti(e, t, n) {
	let r = y(n);
	return r.abort ??= !0, new e({
		type: "custom",
		check: "custom",
		fn: t,
		...r
	});
}
// @__NO_SIDE_EFFECTS__
function ni(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...y(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ri(e, t) {
	let n = /* @__PURE__ */ ii((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(C(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(C(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function ii(e, t) {
	let n = new w({
		check: "custom",
		...y(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function ai(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? tr,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function O(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, O(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && k(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function oi(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function si(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, o[e.defId] = e.def);
	}
	e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: li(t, "input", e.processors),
					output: li(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function k(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return k(r.element, n);
	if (r.type === "set") return k(r.valueType, n);
	if (r.type === "lazy") return k(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return k(r.innerType, n);
	if (r.type === "intersection") return k(r.left, n) || k(r.right, n);
	if (r.type === "record" || r.type === "map") return k(r.keyType, n) || k(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : k(r.in, n) || k(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (k(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (k(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (k(e, n)) return !0;
		return !!(r.rest && k(r.rest, n));
	}
	return !1;
}
var ci = (e, t = {}) => (n) => {
	let r = ai({
		...n,
		processors: t
	});
	return O(e, r), oi(r, e), si(r, e);
}, li = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = ai({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return O(e, o), oi(o, e), si(o, e);
}, ui = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, di = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = ui[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, fi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), ee = typeof l == "number" && l <= (o ?? Infinity), f = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? f ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), ee ? f ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, pi = (e, t, n, r) => {
	n.type = "boolean";
}, mi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("BigInt cannot be represented in JSON Schema");
}, hi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Symbols cannot be represented in JSON Schema");
}, gi = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, _i = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Undefined cannot be represented in JSON Schema");
}, vi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Void cannot be represented in JSON Schema");
}, yi = (e, t, n, r) => {
	n.not = {};
}, bi = (e, t, n, r) => {}, xi = (e, t, n, r) => {}, Si = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Date cannot be represented in JSON Schema");
}, Ci = (e, t, n, r) => {
	let i = e._zod.def, a = o(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, wi = (e, t, n, r) => {
	let i = e._zod.def, a = [];
	for (let e of i.values) if (e === void 0) {
		if (t.unrepresentable === "throw") throw Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof e == "bigint") {
		if (t.unrepresentable === "throw") throw Error("BigInt literals cannot be represented in JSON Schema");
		a.push(Number(e));
	} else a.push(e);
	if (a.length !== 0) if (a.length === 1) {
		let e = a[0];
		n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
	} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
}, Ti = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("NaN cannot be represented in JSON Schema");
}, Ei = (e, t, n, r) => {
	let i = n, a = e._zod.pattern;
	if (!a) throw Error("Pattern not found in template literal");
	i.type = "string", i.pattern = a.source;
}, Di = (e, t, n, r) => {
	let i = n, a = {
		type: "string",
		format: "binary",
		contentEncoding: "binary"
	}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
	o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
}, Oi = (e, t, n, r) => {
	n.type = "boolean";
}, ki = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, Ai = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Function types cannot be represented in JSON Schema");
}, ji = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, Mi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Map cannot be represented in JSON Schema");
}, Ni = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Set cannot be represented in JSON Schema");
}, Pi = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = O(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, Fi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = O(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = O(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Ii = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => O(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Li = (e, t, n, r) => {
	let i = e._zod.def, a = O(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = O(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Ri = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "array";
	let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => O(e, t, {
		...r,
		path: [
			...r.path,
			o,
			n
		]
	})), l = a.rest ? O(a.rest, t, {
		...r,
		path: [
			...r.path,
			s,
			...t.target === "openapi-3.0" ? [a.items.length] : []
		]
	}) : null;
	t.target === "draft-2020-12" ? (i.prefixItems = c, l && (i.items = l)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), i.minItems = c.length, l || (i.maxItems = c.length)) : (i.items = c, l && (i.additionalItems = l));
	let { minimum: u, maximum: d } = e._zod.bag;
	typeof u == "number" && (i.minItems = u), typeof d == "number" && (i.maxItems = d);
}, zi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = O(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = O(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = O(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, Bi = (e, t, n, r) => {
	let i = e._zod.def, a = O(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Vi = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Hi = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Ui = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Wi = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, Gi = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	O(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Ki = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, qi = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ji = (e, t, n, r) => {
	let i = e._zod.def;
	O(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Yi = (e, t, n, r) => {
	let i = e._zod.innerType;
	O(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Xi = {
	string: di,
	number: fi,
	boolean: pi,
	bigint: mi,
	symbol: hi,
	null: gi,
	undefined: _i,
	void: vi,
	never: yi,
	any: bi,
	unknown: xi,
	date: Si,
	enum: Ci,
	literal: wi,
	nan: Ti,
	template_literal: Ei,
	file: Di,
	success: Oi,
	custom: ki,
	function: Ai,
	transform: ji,
	map: Mi,
	set: Ni,
	array: Pi,
	object: Fi,
	union: Ii,
	intersection: Li,
	tuple: Ri,
	record: zi,
	nullable: Bi,
	nonoptional: Vi,
	default: Hi,
	prefault: Ui,
	catch: Wi,
	pipe: Gi,
	readonly: Ki,
	promise: qi,
	optional: Ji,
	lazy: Yi
};
function Zi(e, t) {
	if ("_idmap" in e) {
		let n = e, r = ai({
			...t,
			processors: Xi
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			O(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			oi(r, n), a[t] = si(r, n);
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = ai({
		...t,
		processors: Xi
	});
	return O(e, n), oi(n, e), si(n, e);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
var Qi = /*@__PURE__*/ t("ZodISODateTime", (e, t) => {
	Kt.init(e, t), F.init(e, t);
});
function A(e) {
	return /* @__PURE__ */ Tr(Qi, e);
}
var $i = /*@__PURE__*/ t("ZodISODate", (e, t) => {
	qt.init(e, t), F.init(e, t);
});
function ea(e) {
	return /* @__PURE__ */ Er($i, e);
}
var ta = /*@__PURE__*/ t("ZodISOTime", (e, t) => {
	Jt.init(e, t), F.init(e, t);
});
function na(e) {
	return /* @__PURE__ */ Dr(ta, e);
}
var ra = /*@__PURE__*/ t("ZodISODuration", (e, t) => {
	Yt.init(e, t), F.init(e, t);
});
function ia(e) {
	return /* @__PURE__ */ Or(ra, e);
}
var j = /*@__PURE__*/ t("ZodError", (e, t) => {
	be.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Ce(e, t) },
		flatten: { value: (t) => Se(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, s, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, s, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), aa = /* @__PURE__ */ we(j), oa = /* @__PURE__ */ Te(j), sa = /* @__PURE__ */ Ee(j), ca = /* @__PURE__ */ Oe(j), la = /* @__PURE__ */ Ae(j), ua = /* @__PURE__ */ je(j), da = /* @__PURE__ */ Me(j), fa = /* @__PURE__ */ Ne(j), pa = /* @__PURE__ */ Pe(j), ma = /* @__PURE__ */ Fe(j), ha = /* @__PURE__ */ Ie(j), ga = /* @__PURE__ */ Le(j), _a = /* @__PURE__ */ new WeakMap();
function M(e, t, n) {
	let r = Object.getPrototypeOf(e), i = _a.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), _a.set(r, i)), !i.has(t)) {
		i.add(t);
		for (let e in n) {
			let t = n[e];
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !1,
				get() {
					let n = t.bind(this);
					return Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: n
					}), n;
				},
				set(t) {
					Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: t
					});
				}
			});
		}
	}
}
var N = /*@__PURE__*/ t("ZodType", (e, t) => (T.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: li(e, "input"),
	output: li(e, "output")
} }), e.toJSONSchema = ci(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => aa(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => sa(e, t, n), e.parseAsync = async (t, n) => oa(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => ca(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => la(e, t, n), e.decode = (t, n) => ua(e, t, n), e.encodeAsync = async (t, n) => da(e, t, n), e.decodeAsync = async (t, n) => fa(e, t, n), e.safeEncode = (t, n) => pa(e, t, n), e.safeDecode = (t, n) => ma(e, t, n), e.safeEncodeAsync = async (t, n) => ha(e, t, n), e.safeDecodeAsync = async (t, n) => ga(e, t, n), M(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(m(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return v(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Io(e, t));
	},
	superRefine(e, t) {
		return this.check(Lo(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ D(e));
	},
	optional() {
		return ho(this);
	},
	exactOptional() {
		return _o(this);
	},
	nullable() {
		return yo(this);
	},
	nullish() {
		return ho(yo(this));
	},
	nonoptional(e) {
		return To(this, e);
	},
	array() {
		return R(this);
	},
	or(e) {
		return no([this, e]);
	},
	and(e) {
		return ao(this, e);
	},
	transform(e) {
		return ko(this, po(e));
	},
	default(e) {
		return xo(this, e);
	},
	prefault(e) {
		return Co(this, e);
	},
	catch(e) {
		return Do(this, e);
	},
	pipe(e) {
		return ko(this, e);
	},
	readonly() {
		return jo(this);
	},
	describe(e) {
		let t = this.clone();
		return tr.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return tr.get(this);
		let t = this.clone();
		return tr.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e) {
		return e(this);
	}
}), Object.defineProperty(e, "description", {
	get() {
		return tr.get(e)?.description;
	},
	configurable: !0
}), e)), va = /*@__PURE__*/ t("_ZodString", (e, t) => {
	Pt.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => di(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, M(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ Ur(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ Kr(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ qr(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ Jr(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Vr(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ Br(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Hr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Vr(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Wr(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ Gr(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Xr());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Yr(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ Zr());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Qr());
		},
		slugify() {
			return this.check(/* @__PURE__ */ $r());
		}
	});
}), ya = /*@__PURE__*/ t("ZodString", (e, t) => {
	Pt.init(e, t), va.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ rr(ba, t)), e.url = (t) => e.check(/* @__PURE__ */ lr(wa, t)), e.jwt = (t) => e.check(/* @__PURE__ */ wr(Ba, t)), e.emoji = (t) => e.check(/* @__PURE__ */ ur(Ea, t)), e.guid = (t) => e.check(/* @__PURE__ */ ir(xa, t)), e.uuid = (t) => e.check(/* @__PURE__ */ ar(Sa, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ or(Sa, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ sr(Sa, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ cr(Sa, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ dr(Da, t)), e.guid = (t) => e.check(/* @__PURE__ */ ir(xa, t)), e.cuid = (t) => e.check(/* @__PURE__ */ fr(Oa, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ pr(ka, t)), e.ulid = (t) => e.check(/* @__PURE__ */ mr(Aa, t)), e.base64 = (t) => e.check(/* @__PURE__ */ xr(La, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Sr(Ra, t)), e.xid = (t) => e.check(/* @__PURE__ */ hr(ja, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ gr(Ma, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ _r(Na, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ vr(Pa, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ yr(Fa, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ br(Ia, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Cr(za, t)), e.datetime = (t) => e.check(A(t)), e.date = (t) => e.check(ea(t)), e.time = (t) => e.check(na(t)), e.duration = (t) => e.check(ia(t));
});
function P(e) {
	return /* @__PURE__ */ nr(ya, e);
}
var F = /*@__PURE__*/ t("ZodStringFormat", (e, t) => {
	E.init(e, t), va.init(e, t);
}), ba = /*@__PURE__*/ t("ZodEmail", (e, t) => {
	Lt.init(e, t), F.init(e, t);
}), xa = /*@__PURE__*/ t("ZodGUID", (e, t) => {
	Ft.init(e, t), F.init(e, t);
}), Sa = /*@__PURE__*/ t("ZodUUID", (e, t) => {
	It.init(e, t), F.init(e, t);
});
function Ca(e) {
	return /* @__PURE__ */ ar(Sa, e);
}
var wa = /*@__PURE__*/ t("ZodURL", (e, t) => {
	Rt.init(e, t), F.init(e, t);
});
function Ta(e) {
	return /* @__PURE__ */ lr(wa, e);
}
var Ea = /*@__PURE__*/ t("ZodEmoji", (e, t) => {
	zt.init(e, t), F.init(e, t);
}), Da = /*@__PURE__*/ t("ZodNanoID", (e, t) => {
	Bt.init(e, t), F.init(e, t);
}), Oa = /*@__PURE__*/ t("ZodCUID", (e, t) => {
	Vt.init(e, t), F.init(e, t);
}), ka = /*@__PURE__*/ t("ZodCUID2", (e, t) => {
	Ht.init(e, t), F.init(e, t);
}), Aa = /*@__PURE__*/ t("ZodULID", (e, t) => {
	Ut.init(e, t), F.init(e, t);
}), ja = /*@__PURE__*/ t("ZodXID", (e, t) => {
	Wt.init(e, t), F.init(e, t);
}), Ma = /*@__PURE__*/ t("ZodKSUID", (e, t) => {
	Gt.init(e, t), F.init(e, t);
}), Na = /*@__PURE__*/ t("ZodIPv4", (e, t) => {
	Xt.init(e, t), F.init(e, t);
}), Pa = /*@__PURE__*/ t("ZodIPv6", (e, t) => {
	Zt.init(e, t), F.init(e, t);
}), Fa = /*@__PURE__*/ t("ZodCIDRv4", (e, t) => {
	Qt.init(e, t), F.init(e, t);
}), Ia = /*@__PURE__*/ t("ZodCIDRv6", (e, t) => {
	$t.init(e, t), F.init(e, t);
}), La = /*@__PURE__*/ t("ZodBase64", (e, t) => {
	tn.init(e, t), F.init(e, t);
}), Ra = /*@__PURE__*/ t("ZodBase64URL", (e, t) => {
	rn.init(e, t), F.init(e, t);
}), za = /*@__PURE__*/ t("ZodE164", (e, t) => {
	an.init(e, t), F.init(e, t);
}), Ba = /*@__PURE__*/ t("ZodJWT", (e, t) => {
	sn.init(e, t), F.init(e, t);
}), Va = /*@__PURE__*/ t("ZodNumber", (e, t) => {
	cn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => fi(e, t, n, r), M(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ Lr(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ Fr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ Ir(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Ir(e, t));
		},
		int(e) {
			return this.check(Ua(e));
		},
		safe(e) {
			return this.check(Ua(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ Lr(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Rr(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ Fr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ Ir(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ zr(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ zr(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function I(e) {
	return /* @__PURE__ */ kr(Va, e);
}
var Ha = /*@__PURE__*/ t("ZodNumberFormat", (e, t) => {
	ln.init(e, t), Va.init(e, t);
});
function Ua(e) {
	return /* @__PURE__ */ Ar(Ha, e);
}
var Wa = /*@__PURE__*/ t("ZodBoolean", (e, t) => {
	un.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => pi(e, t, n, r);
});
function L(e) {
	return /* @__PURE__ */ jr(Wa, e);
}
var Ga = /*@__PURE__*/ t("ZodNull", (e, t) => {
	dn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => gi(e, t, n, r);
});
function Ka(e) {
	return /* @__PURE__ */ Mr(Ga, e);
}
var qa = /*@__PURE__*/ t("ZodUnknown", (e, t) => {
	fn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Ja() {
	return /* @__PURE__ */ Nr(qa);
}
var Ya = /*@__PURE__*/ t("ZodNever", (e, t) => {
	pn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r);
});
function Xa(e) {
	return /* @__PURE__ */ Pr(Ya, e);
}
var Za = /*@__PURE__*/ t("ZodArray", (e, t) => {
	hn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pi(e, t, n, r), e.element = t.element, M(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ Vr(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Vr(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Hr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function R(e, t) {
	return /* @__PURE__ */ ei(Za, e, t);
}
var Qa = /*@__PURE__*/ t("ZodObject", (e, t) => {
	bn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), f(e, "shape", () => t.shape), M(e, "ZodObject", {
		keyof() {
			return H(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: Ja()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Ja()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: Xa()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return de(this, e);
		},
		safeExtend(e) {
			return fe(this, e);
		},
		merge(e) {
			return pe(this, e);
		},
		pick(e) {
			return le(this, e);
		},
		omit(e) {
			return ue(this, e);
		},
		partial(...e) {
			return me(mo, this, e[0]);
		},
		required(...e) {
			return he(wo, this, e[0]);
		}
	});
});
function $a(e, t) {
	return new Qa({
		type: "object",
		shape: e ?? {},
		...y(t)
	});
}
function z(e, t) {
	return new Qa({
		type: "object",
		shape: e,
		catchall: Xa(),
		...y(t)
	});
}
function eo(e, t) {
	return new Qa({
		type: "object",
		shape: e,
		catchall: Ja(),
		...y(t)
	});
}
var to = /*@__PURE__*/ t("ZodUnion", (e, t) => {
	Sn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ii(e, t, n, r), e.options = t.options;
});
function no(e, t) {
	return new to({
		type: "union",
		options: e,
		...y(t)
	});
}
var ro = /*@__PURE__*/ t("ZodDiscriminatedUnion", (e, t) => {
	to.init(e, t), Cn.init(e, t);
});
function B(e, t, n) {
	return new ro({
		type: "union",
		options: t,
		discriminator: e,
		...y(n)
	});
}
var io = /*@__PURE__*/ t("ZodIntersection", (e, t) => {
	wn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Li(e, t, n, r);
});
function ao(e, t) {
	return new io({
		type: "intersection",
		left: e,
		right: t
	});
}
var oo = /*@__PURE__*/ t("ZodTuple", (e, t) => {
	Dn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ri(e, t, n, r), e.rest = (t) => e.clone({
		...e._zod.def,
		rest: t
	});
});
function so(e, t, n) {
	let r = t instanceof T;
	return new oo({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...y(r ? n : t)
	});
}
var co = /*@__PURE__*/ t("ZodRecord", (e, t) => {
	jn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => zi(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function V(e, t, n) {
	return !t || !t._zod ? new co({
		type: "record",
		keyType: P(),
		valueType: e,
		...y(t)
	}) : new co({
		type: "record",
		keyType: e,
		valueType: t,
		...y(n)
	});
}
var lo = /*@__PURE__*/ t("ZodEnum", (e, t) => {
	Mn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new lo({
			...t,
			checks: [],
			...y(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new lo({
			...t,
			checks: [],
			...y(r),
			entries: i
		});
	};
});
function H(e, t) {
	return new lo({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...y(t)
	});
}
var uo = /*@__PURE__*/ t("ZodLiteral", (e, t) => {
	Nn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function U(e, t) {
	return new uo({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...y(t)
	});
}
var fo = /*@__PURE__*/ t("ZodTransform", (e, t) => {
	Pn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e._zod.parse = (n, i) => {
		if (i.direction === "backward") throw new r(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(C(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(C(t));
			}
		};
		let a = t.transform(n.value, n);
		return a instanceof Promise ? a.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = a, n.fallback = !0, n);
	};
});
function po(e) {
	return new fo({
		type: "transform",
		transform: e
	});
}
var mo = /*@__PURE__*/ t("ZodOptional", (e, t) => {
	In.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ho(e) {
	return new mo({
		type: "optional",
		innerType: e
	});
}
var go = /*@__PURE__*/ t("ZodExactOptional", (e, t) => {
	Ln.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function _o(e) {
	return new go({
		type: "optional",
		innerType: e
	});
}
var vo = /*@__PURE__*/ t("ZodNullable", (e, t) => {
	Rn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function yo(e) {
	return new vo({
		type: "nullable",
		innerType: e
	});
}
var bo = /*@__PURE__*/ t("ZodDefault", (e, t) => {
	zn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function xo(e, t) {
	return new bo({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var So = /*@__PURE__*/ t("ZodPrefault", (e, t) => {
	Vn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ui(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Co(e, t) {
	return new So({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ae(t);
		}
	});
}
var wo = /*@__PURE__*/ t("ZodNonOptional", (e, t) => {
	Hn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function To(e, t) {
	return new wo({
		type: "nonoptional",
		innerType: e,
		...y(t)
	});
}
var Eo = /*@__PURE__*/ t("ZodCatch", (e, t) => {
	Wn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Do(e, t) {
	return new Eo({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var Oo = /*@__PURE__*/ t("ZodPipe", (e, t) => {
	Gn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gi(e, t, n, r), e.in = t.in, e.out = t.out;
});
function ko(e, t) {
	return new Oo({
		type: "pipe",
		in: e,
		out: t
	});
}
var Ao = /*@__PURE__*/ t("ZodReadonly", (e, t) => {
	qn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ki(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function jo(e) {
	return new Ao({
		type: "readonly",
		innerType: e
	});
}
var Mo = /*@__PURE__*/ t("ZodLazy", (e, t) => {
	Yn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yi(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function No(e) {
	return new Mo({
		type: "lazy",
		getter: e
	});
}
var Po = /*@__PURE__*/ t("ZodCustom", (e, t) => {
	Xn.init(e, t), N.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r);
});
function Fo(e, t) {
	return /* @__PURE__ */ ti(Po, e ?? (() => !0), t);
}
function Io(e, t = {}) {
	return /* @__PURE__ */ ni(Po, e, t);
}
function Lo(e, t) {
	return /* @__PURE__ */ ri(e, t);
}
V(P().regex(/^[a-z][a-z0-9_]*$/u).max(100), z({
	available: L(),
	reason: P().trim().min(1).max(200).optional()
}));
var W = Ca().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), G = W, K = W, q = W, Ro = W, zo = P().min(1).max(256).regex(/^tavern_canvas:[A-Za-z0-9_.:-]+$/u), J = P().regex(/^[a-f0-9]{64}$/u), Bo = z({
	generation_anchor: J,
	scene_description: P().trim().min(1).max(12e3),
	negative_constraints: P().trim().max(4e3).optional(),
	context_turns: I().int().min(0).max(12).optional(),
	style_preset_id: W.optional(),
	image_count: I().int().min(1).max(4).optional()
}), Vo = H([
	"queued",
	"preparing",
	"submitting",
	"running",
	"completed",
	"failed",
	"cancelled",
	"attached",
	"orphaned"
]), Ho = H(["native_tool", "fallback_comment"]), Uo = 4294967295, Y = P().trim().min(1).max(128).regex(/^[A-Za-z0-9][A-Za-z0-9+._/ -]*$/u), Wo = I().int().min(0).max(Uo), Go = I().int().min(64).max(4096).multipleOf(8), X = {
	request_id: G,
	generation_anchor: J,
	prompt: P().trim().min(1).max(12e3),
	negative_prompt: P().trim().max(4e3).optional(),
	output_count: I().int().min(1).max(4)
}, Ko = V(Y, no([
	P().max(4e3),
	I(),
	L()
])).check((e) => {
	Object.keys(e.value).length > 64 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "placeholder_values must contain at most 64 entries"
	});
}), qo = V(Y, q).check((e) => {
	Object.keys(e.value).length > 16 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "input_asset_bindings must contain at most 16 entries"
	});
}), Jo = z({
	provider_id: U("comfyui"),
	...X,
	workflow_id: q,
	placeholder_values: Ko,
	input_asset_bindings: qo,
	output_node_ids: R(Y).min(1).max(16),
	seed: Wo.optional()
}).check((e) => {
	new Set(e.value.output_node_ids).size !== e.value.output_node_ids.length && e.issues.push({
		code: "custom",
		input: e.value.output_node_ids,
		message: "output_node_ids must not contain duplicates",
		path: ["output_node_ids"]
	});
}), Yo = z({
	provider_id: U("google_image"),
	...X,
	model_id: H([
		"gemini-2.5-flash-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-image",
		"gemini-3.1-flash-image"
	]),
	reference_asset_ids: R(q).max(14),
	aspect_ratio: H([
		"1:1",
		"2:3",
		"3:2",
		"3:4",
		"4:3",
		"4:5",
		"5:4",
		"9:16",
		"16:9",
		"21:9"
	]),
	image_size: H([
		"1K",
		"2K",
		"4K"
	]),
	output_mime_type: H([
		"image/png",
		"image/jpeg",
		"image/webp"
	])
}), Xo = I().int().min(64).max(2048).multipleOf(64), Zo = z({
	asset_id: q,
	strength: I().min(0).max(1),
	information_extracted: I().min(0).max(1)
}), Qo = z({
	asset_id: q,
	prompt: P().trim().min(1).max(4e3),
	strength: I().min(0).max(1)
}), $o = z({
	provider_id: U("novelai"),
	...X,
	model_id: Y,
	sampler: H([
		"k_euler",
		"k_euler_ancestral",
		"k_dpmpp_2m",
		"k_dpmpp_sde",
		"ddim_v3"
	]),
	width: Xo,
	height: Xo,
	steps: I().int().min(1).max(50),
	scale: I().min(0).max(30),
	cfg_rescale: I().min(0).max(1),
	noise_schedule: H([
		"native",
		"karras",
		"exponential",
		"polyexponential"
	]),
	seed: Wo.optional(),
	quality_toggle: L(),
	undesired_content_preset: H([
		"heavy",
		"light",
		"human_focus",
		"none"
	]),
	smea: L(),
	dyn: L(),
	vibe_references: R(Zo).max(4).optional(),
	character_references: R(Qo).max(6).optional(),
	action: H(["generate", "infill"]).optional(),
	image_asset_id: q.optional(),
	mask_asset_id: q.optional(),
	inpaint_strength: I().min(0).max(1).optional()
}).check((e) => {
	let t = e.value.action === "infill";
	t && (e.value.image_asset_id === void 0 || e.value.mask_asset_id === void 0) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "infill requires both image_asset_id and mask_asset_id",
		path: ["action"]
	}), !t && e.value.image_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.image_asset_id,
		message: "image_asset_id only applies to the infill action",
		path: ["image_asset_id"]
	}), !t && e.value.mask_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.mask_asset_id,
		message: "mask_asset_id only applies to the infill action",
		path: ["mask_asset_id"]
	}), !t && e.value.inpaint_strength !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.inpaint_strength,
		message: "inpaint_strength only applies to the infill action",
		path: ["inpaint_strength"]
	});
}), es = z({
	provider_id: U("openai_image"),
	...X,
	mode: H(["generate", "edit"]),
	model_id: H([
		"gpt-image-1",
		"gpt-image-1-mini",
		"gpt-image-1.5",
		"gpt-image-2",
		"gpt-image-2-2026-04-21",
		"chatgpt-image-latest"
	]),
	size: H([
		"auto",
		"1024x1024",
		"1536x1024",
		"1024x1536"
	]),
	quality: H([
		"auto",
		"low",
		"medium",
		"high"
	]),
	background: H([
		"auto",
		"opaque",
		"transparent"
	]),
	output_format: H([
		"png",
		"jpeg",
		"webp"
	]),
	compression: I().int().min(0).max(100).optional(),
	input_asset_ids: R(q).max(16),
	mask_asset_id: q.optional()
}).check((e) => {
	e.value.mode === "edit" && e.value.input_asset_ids.length === 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "edit mode requires at least one input asset",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.input_asset_ids.length > 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "generate mode does not accept input assets",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.mask_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.mask_asset_id,
		message: "generate mode does not accept a mask asset",
		path: ["mask_asset_id"]
	}), e.value.output_format === "png" && e.value.compression !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.compression,
		message: "compression applies only to jpeg and webp output",
		path: ["compression"]
	});
}), ts = z({
	scale: I().min(1).max(4),
	upscaler_id: Y,
	steps: I().int().min(1).max(150),
	denoise_strength: I().min(0).max(1)
}), ns = z({
	model_id: Y,
	prompt: P().trim().max(4e3).optional(),
	negative_prompt: P().trim().max(4e3).optional(),
	confidence: I().min(0).max(1).optional(),
	mask_blur: I().int().min(0).max(64).optional(),
	denoise_strength: I().min(0).max(1).optional()
}), rs = z({
	asset_id: q,
	model_id: Y,
	module: Y,
	weight: I().min(0).max(2),
	guidance_start: I().min(0).max(1),
	guidance_end: I().min(0).max(1),
	control_mode: H([
		"balanced",
		"prompt",
		"control"
	]).optional(),
	resize_mode: H([
		"resize",
		"crop_and_resize",
		"resize_and_fill"
	]).optional()
}).check((e) => {
	e.value.guidance_start > e.value.guidance_end && e.issues.push({
		code: "custom",
		input: e.value,
		message: "guidance_start must not exceed guidance_end",
		path: ["guidance_start"]
	});
}), is = z({
	lora_id: Y,
	weight: I().min(-2).max(2)
}), as = z({
	provider_id: U("sd_webui"),
	...X,
	mode: H(["txt2img", "img2img"]),
	model_id: Y,
	vae_id: Y.optional(),
	sampler: Y,
	scheduler: Y,
	width: Go,
	height: Go,
	steps: I().int().min(1).max(150),
	cfg_scale: I().min(0).max(30),
	seed: Wo.optional(),
	input_asset_id: q.optional(),
	denoise_strength: I().min(0).max(1).optional(),
	hires_fix: ts.optional(),
	adetailer: R(ns).max(4).optional(),
	controlnet: R(rs).max(4).optional(),
	lora_tokens: R(is).max(16).optional()
}).check((e) => {
	let t = e.value.mode === "img2img";
	t && e.value.hires_fix !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.hires_fix,
		message: "img2img does not accept hires_fix",
		path: ["hires_fix"]
	}), t && e.value.input_asset_id === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires input_asset_id",
		path: ["input_asset_id"]
	}), t && e.value.denoise_strength === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires denoise_strength",
		path: ["denoise_strength"]
	}), !t && e.value.input_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_id,
		message: "txt2img does not accept input_asset_id",
		path: ["input_asset_id"]
	}), !t && e.value.denoise_strength !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.denoise_strength,
		message: "txt2img does not accept denoise_strength",
		path: ["denoise_strength"]
	});
}), Z = H([
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
]), os = H([
	"text_to_image",
	"image_to_image",
	"reference_image",
	"progress",
	"cancel",
	"seed",
	"workflow",
	"streaming_result"
]), ss = z({
	code: H([
		"auth_failed",
		"rate_limited",
		"content_blocked",
		"invalid_request",
		"provider_unavailable",
		"timed_out",
		"cancelled",
		"malformed_response"
	]),
	retryable: L(),
	retry_after_ms: I().int().nonnegative().optional(),
	status_code: I().int().min(100).max(599).optional()
});
z({
	provider_id: Z,
	...X
});
var cs = B("provider_id", [
	as,
	$o,
	Jo,
	es,
	Yo
]), ls = z({
	request_id: G,
	provider_id: Z,
	assets: R(z({
		asset_id: q,
		media_type: H([
			"image/png",
			"image/jpeg",
			"image/webp",
			"video/mp4"
		]),
		byte_length: I().int().positive().max(1e8),
		sha256: J,
		width: I().int().positive().optional(),
		height: I().int().positive().optional(),
		duration_ms: I().int().positive().optional(),
		persisted_url: Ta().optional()
	})).min(1).max(4),
	seed: Wo.optional()
}), us = U("1.0"), ds = z({
	protocol_version: us,
	request: cs
}), fs = z({
	protocol_version: us,
	job_id: Ro,
	request_id: G,
	provider_id: Z,
	state: Vo,
	image_ids: R(K).optional(),
	error: ss.optional()
}), ps = z({
	protocol_version: us,
	job_id: Ro,
	sequence: I().int().positive(),
	state: Vo,
	occurred_at: A({ offset: !1 }),
	image_ids: R(K).optional(),
	error: ss.optional()
}), ms = z({
	provider_id: Z,
	capabilities: R(os)
}), hs = z({
	max_concurrency: I().int().positive(),
	max_image_count: I().int().min(1).max(4),
	max_request_bytes: I().int().positive()
}), gs = z({
	protocol_version: us,
	providers: R(ms),
	limits: hs
}), _s = H(["user", "assistant"]), vs = {
	id: W,
	display_name: P().trim().min(1).max(120),
	role: _s,
	description: P().trim().max(8e3),
	greeting: P().trim().max(4e3),
	avatar_image_id: K.nullable(),
	is_active: L()
}, ys = z(vs), bs = z({
	...vs,
	created_at: A({ offset: !0 }),
	updated_at: A({ offset: !0 })
}), xs = H([
	"manual",
	"imported",
	"character"
]), Ss = {
	id: W,
	title: P().trim().min(1).max(200),
	source_type: xs,
	content: P().trim().min(1).max(5e4),
	keywords: R(P().trim().min(1).max(80)).max(64).refine((e) => new Set(e).size === e.length, "keywords must not repeat"),
	priority: I().int().min(0).max(1e3),
	enabled: L()
}, Cs = z(Ss), ws = z({
	...Ss,
	created_at: A({ offset: !0 }),
	updated_at: A({ offset: !0 })
}), Ts = H([
	"openai_compatible",
	"anthropic",
	"google_generative",
	"ollama"
]), Es = {
	openai_compatible: {
		completion_routes: ["/v1/chat/completions", "/chat/completions"],
		models_route: "/v1/models"
	},
	anthropic: {
		completion_routes: ["/v1/messages"],
		models_route: "/v1/models"
	},
	google_generative: {
		completion_routes: ["/v1beta/openai/chat/completions"],
		models_route: "/v1beta/openai/models"
	},
	ollama: {
		completion_routes: ["/api/chat"],
		models_route: "/api/tags"
	}
};
function Ds(e) {
	return e.startsWith("/") && !e.startsWith("//") && !e.includes("\\") && !e.includes("#") && !e.split(/[/?]/u).includes("..") && !/^[a-z][a-z0-9+.-]*:/iu.test(e);
}
function Os(e, t) {
	return Ds(t) && Es[e].completion_routes.includes(t);
}
var ks = "llm_profile_api_key";
function As(e, t) {
	return `tavern_canvas:${e}:${t}:${ks}`;
}
var js = {
	id: W,
	display_name: P().trim().min(1).max(120),
	provider_kind: Ts,
	route: P().min(1).max(256),
	model_id: P().trim().min(1).max(200),
	temperature: I().min(0).max(2),
	max_output_tokens: I().int().min(1).max(2e5),
	is_default: L()
}, Ms = "route must be one of the selected provider kind's catalog routes";
function Ns(e) {
	return {
		code: "custom",
		input: e,
		path: ["route"],
		message: Ms
	};
}
var Ps = z(js).check((e) => {
	Os(e.value.provider_kind, e.value.route) || e.issues.push(Ns(e.value.route));
}), Fs = z({
	...js,
	credential_reference: zo.nullable(),
	created_at: A({ offset: !0 }),
	updated_at: A({ offset: !0 })
}).check((e) => {
	Os(e.value.provider_kind, e.value.route) || e.issues.push(Ns(e.value.route));
}), Q = Object.freeze({}), Is = {
	kind: "bearer",
	header: "authorization"
}, Ls = Object.freeze({
	sd_webui: null,
	comfyui: null,
	novelai: {
		origin: "https://image.novelai.net",
		routes: ["/ai/generate-image"],
		auth: Is,
		required_headers: Q
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: Is,
		required_headers: Q
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: Q
	}
});
function Rs(e) {
	let t = Es[e];
	return Object.freeze([...t.completion_routes, t.models_route]);
}
var zs = Object.freeze({
	openai_compatible: {
		origin: "https://api.openai.com",
		routes: Rs("openai_compatible"),
		auth: Is,
		required_headers: Q
	},
	anthropic: {
		origin: "https://api.anthropic.com",
		routes: Rs("anthropic"),
		auth: {
			kind: "api_key",
			header: "x-api-key"
		},
		required_headers: Object.freeze({
			"anthropic-version": "2023-06-01",
			"anthropic-dangerous-direct-browser-access": "true"
		})
	},
	google_generative: {
		origin: "https://generativelanguage.googleapis.com",
		routes: Rs("google_generative"),
		auth: Is,
		required_headers: Q
	},
	ollama: {
		origin: "http://127.0.0.1:11434",
		routes: Rs("ollama"),
		auth: { kind: "none" },
		required_headers: Q
	}
}), Bs = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function Vs(e) {
	return Ls[e];
}
function Hs(e) {
	return zs[e];
}
function Us(e, t) {
	if (!e.routes.includes(t)) throw new Bs();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var Ws = z({
	schema_version: U(1),
	generation_anchor: J,
	source_anchor: J,
	request_ids: R(G),
	image_ids: R(K)
}).check((e) => {
	new Set(e.value.request_ids).size !== e.value.request_ids.length && e.issues.push({
		code: "custom",
		input: e.value.request_ids,
		message: "request_ids must not contain duplicates",
		path: ["request_ids"]
	}), new Set(e.value.image_ids).size !== e.value.image_ids.length && e.issues.push({
		code: "custom",
		input: e.value.image_ids,
		message: "image_ids must not contain duplicates",
		path: ["image_ids"]
	});
}), Gs = Ta().check((e) => {
	if (!URL.canParse(e.value)) return;
	let t = new URL(e.value);
	(t.protocol !== "http:" && t.protocol !== "https:" || t.origin !== e.value) && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Expected a normalized HTTP or HTTPS origin"
	});
}), Ks = z({
	endpoint: Gs.nullable(),
	token_secret_id: P().min(1).nullable(),
	http_acknowledgments: V(Gs, A({ offset: !1 }))
}), qs = "gateway_access_token";
function Js(e) {
	return zo.parse(`tavern_canvas:${e}:${qs}`);
}
var Ys = P().min(1).max(128).refine((e) => e === e.trim(), "active_namespace must not have surrounding whitespace"), Xs = z({
	color_mode: H([
		"system",
		"light",
		"dark"
	]),
	inspector_width: I().int().min(240).max(720),
	inspector_collapsed: L(),
	optional_entry_enabled: L()
}), Zs = z({
	schema_version: U(1),
	active_namespace: Ys,
	locale: H([
		"auto",
		"zh-CN",
		"en"
	]),
	active_provider_profile_id: W.nullable(),
	global_concurrency: I().int().min(1).max(4),
	auto_generation_enabled: L(),
	fallback_generation_enabled: L(),
	gateway: Ks,
	ui: Xs
}), Qs = "tavern-canvas-archive", $s = [
	"provider_profiles",
	"prompt_presets",
	"comfy_workflows",
	"novelai_vibes",
	"character_profiles",
	"regex_rules",
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"image_records",
	"generation_jobs",
	"legacy_preferences"
], ec = H($s), tc = [
	"gateway_token",
	"provider_credentials",
	"logs",
	"support_bundles",
	"host_secrets"
], nc = H(tc), rc = z({
	format: U(Qs),
	schema_version: U(1),
	extension_version: P().trim().min(1).max(64),
	created_at: A({ offset: !0 }),
	record_counts: V(ec, I().int().nonnegative()),
	asset_count: I().int().nonnegative(),
	excluded_secret_categories: R(nc)
}), ic = z({
	sha256: P().regex(/^[a-f0-9]{64}$/u),
	byte_length: I().int().nonnegative()
}), ac = V(P(), ic), oc = I().int().nonnegative(), sc = P().trim().max(64), cc = I().int().nonnegative(), lc = H([
	"prefix",
	"alias",
	"trigram",
	"detail",
	"hot"
]);
function uc(e) {
	return e.normalize("NFKC").replace(/_/gu, " ").toLowerCase().replace(/\s+/gu, " ").trim();
}
var dc = z({
	record_id: I().int().nonnegative(),
	tag: P().trim().min(1).max(256),
	translation: P().trim().max(512).optional(),
	aliases: R(P().trim().min(1).max(256)).max(32).default([]),
	category: P().trim().max(64).optional(),
	popularity: I().int().nonnegative().default(0),
	description: P().trim().max(4096).optional()
});
R(dc).check((e) => {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	e.value.forEach((r, i) => {
		t.has(r.record_id) && e.issues.push({
			code: "custom",
			input: r.record_id,
			message: `duplicate record_id: ${String(r.record_id)}`,
			path: [i, "record_id"]
		}), t.add(r.record_id);
		let a = uc(r.tag);
		n.has(a) && e.issues.push({
			code: "custom",
			input: r.tag,
			message: `duplicate normalized tag: ${a}`,
			path: [i, "tag"]
		}), n.add(a);
	});
});
var $ = P().regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/u), fc = P().trim().min(1).max(128).regex(/^[a-z][a-z0-9_-]*$/u), pc = /\.\./u, mc = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/u, hc = P().trim().min(1).max(512).refine((e) => !pc.test(e) && mc.test(e), "must be a safe relative path: letters, digits, '.', '_', '-', and '/' segments only, no scheme, no traversal"), gc = z({
	shard_id: P().min(1).max(128),
	package_id: fc,
	kind: lc,
	path: hc,
	sha256: J,
	byte_length: I().int().nonnegative()
}), _c = z({
	package_id: fc,
	schema_version: U(1),
	data_version: $,
	changelog: P().trim().min(1).max(4096),
	record_count: I().int().nonnegative(),
	compressed_size: I().int().nonnegative(),
	minimum_extension_version: $,
	shards: R(gc).min(1).max(5e4)
}).check((e) => {
	let t = /* @__PURE__ */ new Set();
	e.value.shards.forEach((n, r) => {
		t.has(n.shard_id) && e.issues.push({
			code: "custom",
			input: n.shard_id,
			message: `duplicate shard_id: ${n.shard_id}`,
			path: [
				"shards",
				r,
				"shard_id"
			]
		}), t.add(n.shard_id), n.package_id !== e.value.package_id && e.issues.push({
			code: "custom",
			input: n.package_id,
			message: "shard package_id must match manifest package_id",
			path: [
				"shards",
				r,
				"package_id"
			]
		});
	});
}), vc = 50, yc = H([
	"exact",
	"hot",
	"prefix",
	"alias",
	"translation",
	"trigram"
]), bc = z({
	record_id: oc,
	display_text: P().trim().min(1).max(512),
	category: sc.optional(),
	popularity: cc,
	match_kind: yc,
	score: I().nonnegative()
}), xc = H(["tavern_canvas_jsonl", "legacy_v2"]), Sc = P().trim().min(1).max(512);
B("type", [
	z({
		type: U("initialize"),
		request_id: G
	}),
	z({
		type: U("query"),
		request_id: G,
		query: P().trim().max(256),
		category: sc.optional()
	}),
	z({
		type: U("next_page"),
		request_id: G,
		cursor: Sc
	}),
	z({
		type: U("cancel"),
		request_id: G,
		target_request_id: G
	}),
	z({
		type: U("import_source"),
		request_id: G,
		format: xc,
		batch_index: I().int().nonnegative(),
		batch_count: I().int().positive(),
		payload: P().min(1).max(8388608)
	}),
	z({
		type: U("dispose"),
		request_id: G
	})
]);
var Cc = z({
	type: U("ready"),
	package_id: fc,
	data_version: $,
	record_count: I().int().nonnegative()
}), wc = z({
	type: U("partial_results"),
	request_id: G,
	results: R(bc).max(vc)
}), Tc = z({
	type: U("complete"),
	request_id: G,
	results: R(bc).max(vc),
	next_cursor: Sc.nullable()
}), Ec = z({
	type: U("progress"),
	request_id: G,
	phase: P().trim().min(1).max(64),
	processed: I().int().nonnegative(),
	total: I().int().positive()
}), Dc = H([
	"cancelled",
	"invalid_request",
	"not_ready",
	"package_unavailable",
	"import_failed",
	"internal_error"
]), Oc = B("type", [
	Cc,
	wc,
	Tc,
	Ec,
	z({
		type: U("error"),
		request_id: G,
		code: Dc,
		message: P().trim().min(1).max(1024)
	})
]), kc = P().trim().min(2).max(16).regex(/^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/u), Ac = z({
	en: P().trim().min(1).max(128),
	"zh-CN": P().trim().min(1).max(128)
}), jc = z({
	en: P().trim().min(1).max(1024),
	"zh-CN": P().trim().min(1).max(1024)
}), Mc = Ta().check((e) => {
	URL.canParse(e.value) && new URL(e.value).protocol !== "https:" && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Catalog entry base_url must use the https: scheme"
	});
}), Nc = R(z({
	package_id: fc,
	display_name: Ac,
	description: jc,
	data_version: $,
	record_count: I().int().nonnegative(),
	compressed_bytes: I().int().nonnegative(),
	manifest_sha256: J,
	languages: R(kc).min(1).max(16),
	min_extension_version: $,
	base_url: Mc.nullable(),
	bundled: L().optional(),
	updated_at: A({ offset: !1 })
}).check((e) => {
	e.value.bundled !== !0 && e.value.base_url === null && e.issues.push({
		code: "custom",
		input: e.value.base_url,
		message: "base_url must be a non-null https URL unless the entry is bundled",
		path: ["base_url"]
	});
})).min(1).max(500).check((e) => {
	let t = /* @__PURE__ */ new Set();
	e.value.forEach((n, r) => {
		t.has(n.package_id) && e.issues.push({
			code: "custom",
			input: n.package_id,
			message: `duplicate package_id: ${n.package_id}`,
			path: [r, "package_id"]
		}), t.add(n.package_id);
	});
}), Pc = 4096, Fc = 1e3, Ic = so([
	P().trim().min(1).max(512),
	oc,
	cc
]), Lc = z({
	kind: U("prefix"),
	entries: R(Ic)
}), Rc = z({
	kind: U("alias"),
	entries: R(Ic)
}), zc = R(I().int()).min(1).check((e) => {
	e.value.forEach((t, n) => {
		if (n === 0) {
			t < 0 && e.issues.push({
				code: "custom",
				input: t,
				message: "first delta must be a nonnegative record_id",
				path: [n]
			});
			return;
		}
		t < 1 && e.issues.push({
			code: "custom",
			input: t,
			message: "subsequent deltas must be positive",
			path: [n]
		});
	});
}), Bc = so([P().trim().min(1).max(24), zc]);
B("kind", [
	Lc,
	Rc,
	z({
		kind: U("trigram"),
		entries: R(Bc)
	}),
	z({
		kind: U("detail"),
		start_id: oc,
		records: R(dc).min(1).max(Pc)
	}),
	z({
		kind: U("hot"),
		global: R(oc).max(Fc),
		by_category: V(sc, R(oc).max(500))
	})
]);
//#endregion
export { H as $, ws as A, as as B, Us as C, Fs as D, Ps as E, ps as F, Ho as G, $o as H, fs as I, q as J, Bo as K, ls as L, bs as M, gs as N, As as O, ds as P, zo as Q, ss as R, Hs as S, Es as T, Yo as U, es as V, Jo as W, Ro as X, K as Y, G as Z, Xs as _, Zi as _t, fc as a, No as at, Bs as b, hc as c, I as ct, $s as d, z as dt, Ka as et, ac as f, P as ft, Zs as g, A as gt, Gs as h, Ta as ht, _c as i, B as it, ys as j, Cs as k, tc as l, $a as lt, Ks as m, Ja as mt, Oc as n, L as nt, $ as o, U as ot, rc as p, no as pt, J as q, lc as r, Fo as rt, gc as s, eo as st, Nc as t, R as tt, Qs as u, V as ut, Js as v, ks as w, Vs as x, Ws as y, Z as z };
