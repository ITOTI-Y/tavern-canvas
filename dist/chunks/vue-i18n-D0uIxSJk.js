import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
//#region ../../node_modules/.pnpm/@vue+shared@3.5.40/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function t(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var n = {}, r = [], i = () => {}, a = () => !1, o = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), s = (e) => e.startsWith("onUpdate:"), c = Object.assign, l = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, u = Object.prototype.hasOwnProperty, d = (e, t) => u.call(e, t), f = Array.isArray, p = (e) => C(e) === "[object Map]", m = (e) => C(e) === "[object Set]", h = (e) => C(e) === "[object Date]", g = (e) => C(e) === "[object RegExp]", _ = (e) => typeof e == "function", v = (e) => typeof e == "string", y = (e) => typeof e == "symbol", b = (e) => typeof e == "object" && !!e, x = (e) => (b(e) || _(e)) && _(e.then) && _(e.catch), S = Object.prototype.toString, C = (e) => S.call(e), w = (e) => C(e).slice(8, -1), T = (e) => C(e) === "[object Object]", E = (e) => v(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, D = /* @__PURE__ */ t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), O = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ee = /-\w/g, k = O((e) => e.replace(ee, (e) => e.slice(1).toUpperCase())), te = /\B([A-Z])/g, A = O((e) => e.replace(te, "-$1").toLowerCase()), ne = O((e) => e.charAt(0).toUpperCase() + e.slice(1)), re = O((e) => e ? `on${ne(e)}` : ""), j = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, ae = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, oe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, se = (e) => {
	let t = v(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ce, le = () => ce ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, ue = /* @__PURE__ */ t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function de(e) {
	if (f(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = v(r) ? he(r) : de(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (v(e) || b(e)) return e;
}
var fe = /;(?![^(]*\))/g, pe = /:([^]+)/, me = /\/\*[^]*?\*\//g;
function he(e) {
	let t = {};
	return e.replace(me, "").split(fe).forEach((e) => {
		if (e) {
			let n = e.split(pe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function ge(e) {
	let t = "";
	if (v(e)) t = e;
	else if (f(e)) for (let n = 0; n < e.length; n++) {
		let r = ge(e[n]);
		r && (t += r + " ");
	}
	else if (b(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function _e(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !v(t) && (e.class = ge(t)), n && (e.style = de(n)), e;
}
var ve = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ye = /* @__PURE__ */ t(ve);
ve + "";
function be(e) {
	return !!e || e === "";
}
function xe(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Se(e[r], t[r]);
	return n;
}
function Se(e, t) {
	if (e === t) return !0;
	let n = h(e), r = h(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = y(e), r = y(t), n || r) return e === t;
	if (n = f(e), r = f(t), n || r) return n && r ? xe(e, t) : !1;
	if (n = b(e), r = b(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Se(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Ce(e, t) {
	return e.findIndex((e) => Se(e, t));
}
var we = (e) => !!(e && e.__v_isRef === !0), M = (e) => v(e) ? e : e == null ? "" : f(e) || b(e) && (e.toString === S || !_(e.toString)) ? we(e) ? M(e.value) : JSON.stringify(e, Te, 2) : String(e), Te = (e, t) => we(t) ? Te(e, t.value) : p(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ee(t, r) + " =>"] = n, e), {}) } : m(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ee(e)) } : y(t) ? Ee(t) : b(t) && !f(t) && !T(t) ? String(t) : t, Ee = (e, t = "") => y(e) ? `Symbol(${e.description ?? t})` : e;
function De(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+reactivity@3.5.40/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var N, Oe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && N && (N.active ? (this.parent = N, this.index = (N.scopes || (N.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = N;
			try {
				return N = this, e();
			} finally {
				N = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = N, N = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (N === this) N = this.prevScope;
			else {
				let e = N;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function ke(e) {
	return new Oe(e);
}
function Ae() {
	return N;
}
function je(e, t = !1) {
	N && N.cleanups.push(e);
}
var P, Me = /* @__PURE__ */ new WeakSet(), Ne = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, N && (N.active ? N.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Me.has(this) && (Me.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Le(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Qe(this), Be(this);
		let e = P, t = Je;
		P = this, Je = !0;
		try {
			return this.fn();
		} finally {
			Ve(this), P = e, Je = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) We(e);
			this.deps = this.depsTail = void 0, Qe(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Me.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		He(this) && this.run();
	}
	get dirty() {
		return He(this);
	}
}, Pe = 0, Fe, Ie;
function Le(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ie, Ie = e;
		return;
	}
	e.next = Fe, Fe = e;
}
function Re() {
	Pe++;
}
function ze() {
	if (--Pe > 0) return;
	if (Ie) {
		let e = Ie;
		for (Ie = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Fe;) {
		let t = Fe;
		for (Fe = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Be(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ve(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), We(r), Ge(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function He(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ue(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ue(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === $e) || (e.globalVersion = $e, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !He(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = P, r = Je;
	P = e, Je = !0;
	try {
		Be(e);
		let n = e.fn(e._value);
		(t.version === 0 || j(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		P = n, Je = r, Ve(e), e.flags &= -3;
	}
}
function We(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) We(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ge(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function Ke(e, t) {
	e.effect instanceof Ne && (e = e.effect.fn);
	let n = new Ne(e);
	t && c(n, t);
	try {
		n.run();
	} catch (e) {
		throw n.stop(), e;
	}
	let r = n.run.bind(n);
	return r.effect = n, r;
}
function qe(e) {
	e.effect.stop();
}
var Je = !0, Ye = [];
function Xe() {
	Ye.push(Je), Je = !1;
}
function Ze() {
	let e = Ye.pop();
	Je = e === void 0 || e;
}
function Qe(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = P;
		P = void 0;
		try {
			t();
		} finally {
			P = e;
		}
	}
}
var $e = 0, et = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, tt = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!P || !Je || P === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== P) t = this.activeLink = new et(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, nt(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = void 0, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, $e++, this.notify(e);
	}
	notify(e) {
		Re();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			ze();
		}
	}
};
function nt(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) nt(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var rt = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ Symbol(""), at = /* @__PURE__ */ Symbol(""), ot = /* @__PURE__ */ Symbol("");
function st(e, t, n) {
	if (Je && P) {
		let t = rt.get(e);
		t || rt.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new tt()), r.map = t, r.key = n), r.track();
	}
}
function ct(e, t, n, r, i, a) {
	let o = rt.get(e);
	if (!o) {
		$e++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Re(), t === "clear") o.forEach(s);
	else {
		let i = f(e), a = i && E(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ot || !y(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ot)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(it)), p(e) && s(o.get(at)));
				break;
			case "delete":
				i || (s(o.get(it)), p(e) && s(o.get(at)));
				break;
			case "set": p(e) && s(o.get(it));
		}
	}
	ze();
}
function lt(e, t) {
	let n = rt.get(e);
	return n && n.get(t);
}
function ut(e) {
	let t = /* @__PURE__ */ F(e);
	return t === e ? t : (st(t, "iterate", ot), /* @__PURE__ */ Qt(e) ? t : t.map(tn));
}
function dt(e) {
	return st(e = /* @__PURE__ */ F(e), "iterate", ot), e;
}
function ft(e, t) {
	return /* @__PURE__ */ Zt(e) ? nn(/* @__PURE__ */ Xt(e) ? tn(t) : t) : tn(t);
}
var pt = {
	__proto__: null,
	[Symbol.iterator]() {
		return mt(this, Symbol.iterator, (e) => ft(this, e));
	},
	concat(...e) {
		return ut(this).concat(...e.map((e) => f(e) ? ut(e) : e));
	},
	entries() {
		return mt(this, "entries", (e) => (e[1] = ft(this, e[1]), e));
	},
	every(e, t) {
		return gt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return gt(this, "filter", e, t, (e) => e.map((e) => ft(this, e)), arguments);
	},
	find(e, t) {
		return gt(this, "find", e, t, (e) => ft(this, e), arguments);
	},
	findIndex(e, t) {
		return gt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return gt(this, "findLast", e, t, (e) => ft(this, e), arguments);
	},
	findLastIndex(e, t) {
		return gt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return gt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return vt(this, "includes", e);
	},
	indexOf(...e) {
		return vt(this, "indexOf", e);
	},
	join(e) {
		return ut(this).join(e);
	},
	lastIndexOf(...e) {
		return vt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return gt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return yt(this, "pop");
	},
	push(...e) {
		return yt(this, "push", e);
	},
	reduce(e, ...t) {
		return _t(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return _t(this, "reduceRight", e, t);
	},
	shift() {
		return yt(this, "shift");
	},
	some(e, t) {
		return gt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return yt(this, "splice", e);
	},
	toReversed() {
		return ut(this).toReversed();
	},
	toSorted(e) {
		return ut(this).toSorted(e);
	},
	toSpliced(...e) {
		return ut(this).toSpliced(...e);
	},
	unshift(...e) {
		return yt(this, "unshift", e);
	},
	values() {
		return mt(this, "values", (e) => ft(this, e));
	}
};
function mt(e, t, n) {
	let r = dt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Qt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ht = Array.prototype;
function gt(e, t, n, r, i, a) {
	let o = dt(e), s = o !== e && !/* @__PURE__ */ Qt(e), c = o[t];
	if (c !== ht[t]) {
		let t = c.apply(e, a);
		return s ? tn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, ft(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function _t(e, t, n, r) {
	let i = dt(e), a = i !== e && !/* @__PURE__ */ Qt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = ft(e, t)), n.call(this, t, ft(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? ft(e, c) : c;
}
function vt(e, t, n) {
	let r = /* @__PURE__ */ F(e);
	st(r, "iterate", ot);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ $t(n[0]) ? (n[0] = /* @__PURE__ */ F(n[0]), r[t](...n)) : i;
}
function yt(e, t, n = []) {
	Xe(), Re();
	let r = (/* @__PURE__ */ F(e))[t].apply(e, n);
	return ze(), Ze(), r;
}
var bt = /* @__PURE__ */ t("__proto__,__v_isRef,__isVue"), xt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(y));
function St(e) {
	y(e) || (e = String(e));
	let t = /* @__PURE__ */ F(this);
	return st(t, "has", e), t.hasOwnProperty(e);
}
var Ct = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Ut : Ht : i ? Vt : Bt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = f(e);
		if (!r) {
			let e;
			if (a && (e = pt[t])) return e;
			if (t === "hasOwnProperty") return St;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ I(e) ? e : n);
		if ((y(t) ? xt.has(t) : bt(t)) || (r || st(e, "get", t), i)) return o;
		if (/* @__PURE__ */ I(o)) {
			let e = a && E(t) ? o : o.value;
			return r && b(e) ? /* @__PURE__ */ qt(e) : e;
		}
		return b(o) ? r ? /* @__PURE__ */ qt(o) : /* @__PURE__ */ Gt(o) : o;
	}
}, wt = class extends Ct {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = f(e) && E(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Zt(i);
			if (!/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (i = /* @__PURE__ */ F(i), n = /* @__PURE__ */ F(n)), !a && /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : d(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ I(e) ? e : r);
		return e === /* @__PURE__ */ F(r) && s && (o ? j(n, i) && ct(e, "set", t, n, i) : ct(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = d(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ct(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!y(t) || !xt.has(t)) && st(e, "has", t), n;
	}
	ownKeys(e) {
		return st(e, "iterate", f(e) ? "length" : it), Reflect.ownKeys(e);
	}
}, Tt = class extends Ct {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Et = /* @__PURE__ */ new wt(), Dt = /* @__PURE__ */ new Tt(), Ot = /* @__PURE__ */ new wt(!0), kt = /* @__PURE__ */ new Tt(!0), At = (e) => e, jt = (e) => Reflect.getPrototypeOf(e);
function Mt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ F(i), o = p(a), s = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? At : t ? nn : tn;
		return !t && st(a, "iterate", l ? at : it), c(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Nt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Pt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ F(r), a = /* @__PURE__ */ F(n);
			e || (j(n, a) && st(i, "get", n), st(i, "get", a));
			let { has: o } = jt(i), s = t ? At : e ? nn : tn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && st(/* @__PURE__ */ F(t), "iterate", it), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ F(n), i = /* @__PURE__ */ F(t);
			return e || (j(t, i) && st(r, "has", t), st(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ F(a), s = t ? At : e ? nn : tn;
			return !e && st(o, "iterate", it), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return c(n, e ? {
		add: Nt("add"),
		set: Nt("set"),
		delete: Nt("delete"),
		clear: Nt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ F(this), r = jt(n), i = /* @__PURE__ */ F(e), a = !t && !/* @__PURE__ */ Qt(e) && !/* @__PURE__ */ Zt(e) ? i : e;
			return r.has.call(n, a) || j(e, a) && r.has.call(n, e) || j(i, a) && r.has.call(n, i) || (n.add(a), ct(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (n = /* @__PURE__ */ F(n));
			let r = /* @__PURE__ */ F(this), { has: i, get: a } = jt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ F(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? j(n, s) && ct(r, "set", e, n, s) : ct(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ F(this), { has: n, get: r } = jt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ F(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ct(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ F(this), t = e.size !== 0, n = e.clear();
			return t && ct(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Mt(r, e, t);
	}), n;
}
function Ft(e, t) {
	let n = Pt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(d(n, r) && r in t ? n : t, r, i);
}
var It = { get: /* @__PURE__ */ Ft(!1, !1) }, Lt = { get: /* @__PURE__ */ Ft(!1, !0) }, Rt = { get: /* @__PURE__ */ Ft(!0, !1) }, zt = { get: /* @__PURE__ */ Ft(!0, !0) }, Bt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap();
function Wt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return /* @__PURE__ */ Zt(e) ? e : Yt(e, !1, Et, It, Bt);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return Yt(e, !1, Ot, Lt, Vt);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return Yt(e, !0, Dt, Rt, Ht);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !0, kt, zt, Ut);
}
function Yt(e, t, n, r, i) {
	if (!b(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Wt(w(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return /* @__PURE__ */ Zt(e) ? /* @__PURE__ */ Xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ F(t) : e;
}
function en(e) {
	return !d(e, "__v_skip") && Object.isExtensible(e) && ae(e, "__v_skip", !0), e;
}
var tn = (e) => b(e) ? /* @__PURE__ */ Gt(e) : e, nn = (e) => b(e) ? /* @__PURE__ */ qt(e) : e;
// @__NO_SIDE_EFFECTS__
function I(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return on(e, !1);
}
// @__NO_SIDE_EFFECTS__
function an(e) {
	return on(e, !0);
}
function on(e, t) {
	return /* @__PURE__ */ I(e) ? e : new sn(e, t);
}
var sn = class {
	constructor(e, t) {
		this.dep = new tt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ F(e), this._value = t ? e : tn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qt(e) || /* @__PURE__ */ Zt(e);
		e = n ? e : /* @__PURE__ */ F(e), j(e, t) && (this._rawValue = e, this._value = n ? e : tn(e), this.dep.trigger());
	}
};
function cn(e) {
	e.dep && e.dep.trigger();
}
function ln(e) {
	return /* @__PURE__ */ I(e) ? e.value : e;
}
function un(e) {
	return _(e) ? e() : ln(e);
}
var dn = {
	get: (e, t, n) => t === "__v_raw" ? e : ln(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function fn(e) {
	return /* @__PURE__ */ Xt(e) ? e : new Proxy(e, dn);
}
var pn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new tt(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function mn(e) {
	return new pn(e);
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
	let t = f(e) ? Array(e.length) : {};
	for (let n in e) t[n] = yn(e, n);
	return t;
}
var gn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = y(t) ? t : String(t), this._raw = /* @__PURE__ */ F(e);
		let r = !0, i = e;
		if (!f(e) || y(this._key) || !E(this._key)) do
			r = !/* @__PURE__ */ $t(i) || /* @__PURE__ */ Qt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = ln(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ I(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ I(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return lt(this._raw, this._key);
	}
}, _n = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function vn(e, t, n) {
	return /* @__PURE__ */ I(e) ? e : _(e) ? new _n(e) : b(e) && arguments.length > 1 ? yn(e, t, n) : /* @__PURE__ */ rn(e);
}
function yn(e, t, n) {
	return new gn(e, t, n);
}
var bn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new tt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = $e - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && P !== this) return Le(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ue(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function xn(e, t, n = !1) {
	let r, i;
	return _(e) ? r = e : (r = e.get, i = e.set), new bn(r, i, n);
}
var Sn = {
	GET: "get",
	HAS: "has",
	ITERATE: "iterate"
}, Cn = {
	SET: "set",
	ADD: "add",
	DELETE: "delete",
	CLEAR: "clear"
}, wn = {}, Tn = /* @__PURE__ */ new WeakMap(), En = void 0;
function Dn() {
	return En;
}
function On(e, t = !1, n = En) {
	if (n) {
		let t = Tn.get(n);
		t || Tn.set(n, t = []), t.push(e);
	}
}
function kn(e, t, r = n) {
	let { immediate: a, deep: o, once: s, scheduler: c, augmentJob: u, call: d } = r, p = (e) => o ? e : /* @__PURE__ */ Qt(e) || o === !1 || o === 0 ? An(e, 1) : An(e), m, h, g, v, y = !1, b = !1;
	if (/* @__PURE__ */ I(e) ? (h = () => e.value, y = /* @__PURE__ */ Qt(e)) : /* @__PURE__ */ Xt(e) ? (h = () => p(e), y = !0) : f(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Xt(e) || /* @__PURE__ */ Qt(e)), h = () => e.map((e) => {
		if (/* @__PURE__ */ I(e)) return e.value;
		if (/* @__PURE__ */ Xt(e)) return p(e);
		if (_(e)) return d ? d(e, 2) : e();
	})) : h = _(e) ? t ? d ? () => d(e, 2) : e : () => {
		if (g) {
			Xe();
			try {
				g();
			} finally {
				Ze();
			}
		}
		let t = En;
		En = m;
		try {
			return d ? d(e, 3, [v]) : e(v);
		} finally {
			En = t;
		}
	} : i, t && o) {
		let e = h, t = o === !0 ? Infinity : o;
		h = () => An(e(), t);
	}
	let x = Ae(), S = () => {
		m.stop(), x && x.active && l(x.effects, m);
	};
	if (s && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return S(), n;
		};
	}
	let C = b ? Array(e.length).fill(wn) : wn, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (t) {
			let n = m.run();
			if (e || o || y || (b ? n.some((e, t) => j(e, C[t])) : j(n, C))) {
				g && g();
				let e = En;
				En = m;
				try {
					let e = [
						n,
						C === wn ? void 0 : b && C[0] === wn ? [] : C,
						v
					];
					C = n, d ? d(t, 3, e) : t(...e);
				} finally {
					En = e;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Ne(h), m.scheduler = c ? () => c(w, !1) : w, v = (e) => On(e, !1, m), g = m.onStop = () => {
		let e = Tn.get(m);
		if (e) {
			if (d) d(e, 4);
			else for (let t of e) t();
			Tn.delete(m);
		}
	}, t ? a ? w(!0) : C = m.run() : c ? c(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function An(e, t = Infinity, n) {
	if (t <= 0 || !b(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ I(e)) An(e.value, t, n);
	else if (f(e)) for (let r = 0; r < e.length; r++) An(e[r], t, n);
	else if (m(e) || p(e)) e.forEach((e) => {
		An(e, t, n);
	});
	else if (T(e)) {
		for (let r in e) An(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && An(e[r], t, n);
	}
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-core@3.5.40/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var jn = [];
function Mn(e) {
	jn.push(e);
}
function Nn() {
	jn.pop();
}
function Pn(e, t) {}
var Fn = {
	SETUP_FUNCTION: 0,
	0: "SETUP_FUNCTION",
	RENDER_FUNCTION: 1,
	1: "RENDER_FUNCTION",
	NATIVE_EVENT_HANDLER: 5,
	5: "NATIVE_EVENT_HANDLER",
	COMPONENT_EVENT_HANDLER: 6,
	6: "COMPONENT_EVENT_HANDLER",
	VNODE_HOOK: 7,
	7: "VNODE_HOOK",
	DIRECTIVE_HOOK: 8,
	8: "DIRECTIVE_HOOK",
	TRANSITION_HOOK: 9,
	9: "TRANSITION_HOOK",
	APP_ERROR_HANDLER: 10,
	10: "APP_ERROR_HANDLER",
	APP_WARN_HANDLER: 11,
	11: "APP_WARN_HANDLER",
	FUNCTION_REF: 12,
	12: "FUNCTION_REF",
	ASYNC_COMPONENT_LOADER: 13,
	13: "ASYNC_COMPONENT_LOADER",
	SCHEDULER: 14,
	14: "SCHEDULER",
	COMPONENT_UPDATE: 15,
	15: "COMPONENT_UPDATE",
	APP_UNMOUNT_CLEANUP: 16,
	16: "APP_UNMOUNT_CLEANUP"
}, In = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function Ln(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		zn(e, t, n);
	}
}
function Rn(e, t, n, r) {
	if (_(e)) {
		let i = Ln(e, t, n, r);
		return i && x(i) && i.catch((e) => {
			zn(e, t, n);
		}), i;
	}
	if (f(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Rn(e[a], t, n, r));
		return i;
	}
}
function zn(e, t, r, i = !0) {
	let a = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || n;
	if (t) {
		let n = t.parent, i = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; n;) {
			let t = n.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, a) === !1) return;
			}
			n = n.parent;
		}
		if (o) {
			Xe(), Ln(o, null, 10, [
				e,
				i,
				a
			]), Ze();
			return;
		}
	}
	Bn(e, r, a, i, s);
}
function Bn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Vn = [], Hn = -1, Un = [], Wn = null, Gn = 0, Kn = /* @__PURE__ */ Promise.resolve(), qn = null;
function Jn(e) {
	let t = qn || Kn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yn(e) {
	let t = Hn + 1, n = Vn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Vn[r], a = tr(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Xn(e) {
	if (!(e.flags & 1)) {
		let t = tr(e), n = Vn[Vn.length - 1];
		!n || !(e.flags & 2) && t >= tr(n) ? Vn.push(e) : Vn.splice(Yn(t), 0, e), e.flags |= 1, Zn();
	}
}
function Zn() {
	qn ||= Kn.then(nr);
}
function Qn(e) {
	f(e) ? Un.push(...e) : Wn && e.id === -1 ? Wn.splice(Gn + 1, 0, e) : e.flags & 1 || (Un.push(e), e.flags |= 1), Zn();
}
function $n(e, t, n = Hn + 1) {
	for (; n < Vn.length; n++) {
		let t = Vn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			Vn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function er(e) {
	if (Un.length) {
		let e = [...new Set(Un)].sort((e, t) => tr(e) - tr(t));
		if (Un.length = 0, Wn) {
			Wn.push(...e);
			return;
		}
		for (Wn = e, Gn = 0; Gn < Wn.length; Gn++) {
			let e = Wn[Gn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Wn = null, Gn = 0;
	}
}
var tr = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function nr(e) {
	try {
		for (Hn = 0; Hn < Vn.length; Hn++) {
			let e = Vn[Hn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Ln(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Hn < Vn.length; Hn++) {
			let e = Vn[Hn];
			e && (e.flags &= -2);
		}
		Hn = -1, Vn.length = 0, er(e), qn = null, (Vn.length || Un.length) && nr(e);
	}
}
var rr, ir = [];
function ar(e, t) {
	rr = e, rr ? (rr.enabled = !0, ir.forEach(({ event: e, args: t }) => rr.emit(e, ...t)), ir = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		ar(e, t);
	}), setTimeout(() => {
		rr || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ir = []);
	}, 3e3)) : ir = [];
}
var L = null, or = null;
function sr(e) {
	let t = L;
	return L = e, or = e && e.type.__scopeId || null, t;
}
function cr(e) {
	or = e;
}
function lr() {
	or = null;
}
var ur = (e) => dr;
function dr(e, t = L, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ls(-1);
		let i = sr(t), a = is.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = is.length; e > a; e--) ss();
			sr(i), r._d && ls(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function fr(e, t) {
	if (L === null) return e;
	let r = Xs(L), i = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [a, o, s, c = n] = t[e];
		a && (_(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && An(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function pr(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Xe(), Rn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ze());
	}
}
function mr(e, t) {
	if (H) {
		let n = H.provides, r = H.parent && H.parent.provides;
		r === n && (n = H.provides = Object.create(r)), n[e] = t;
	}
}
function hr(e, t, n = !1) {
	let r = Ns();
	if (r || Qa) {
		let i = Qa ? Qa._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && _(t) ? t.call(r && r.proxy) : t;
	}
}
function gr() {
	return !!(Ns() || Qa);
}
var _r = /* @__PURE__ */ Symbol.for("v-scx"), vr = () => hr(_r);
function yr(e, t) {
	return Cr(e, null, t);
}
function br(e, t) {
	return Cr(e, null, { flush: "post" });
}
function xr(e, t) {
	return Cr(e, null, { flush: "sync" });
}
function Sr(e, t, n) {
	return Cr(e, t, n);
}
function Cr(e, t, r = n) {
	let { immediate: a, deep: o, flush: s, once: l } = r, u = c({}, r), d = t && a || !t && s !== "post", f;
	if (zs) {
		if (s === "sync") {
			let e = vr();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = i, e.resume = i, e.pause = i, e;
		}
	}
	let p = H;
	u.call = (e, t, n) => Rn(e, p, t, n);
	let m = !1;
	s === "post" ? u.scheduler = (e) => {
		R(e, p && p.suspense);
	} : s !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Xn(e);
	}), u.augmentJob = (e) => {
		t && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = kn(e, t, u);
	return zs && (f ? f.push(h) : d && h()), h;
}
function wr(e, t, n) {
	let r = this.proxy, i = v(e) ? e.includes(".") ? Tr(r, e) : () => r[e] : e.bind(r, r), a;
	_(t) ? a = t : (a = t.handler, n = t);
	let o = Is(this), s = Cr(i, a.bind(r), n);
	return o(), s;
}
function Tr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Er = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ Symbol("_vte"), Or = (e) => e.__isTeleport, kr = (e) => e && (e.disabled || e.disabled === ""), Ar = (e) => e && (e.defer || e.defer === ""), jr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Mr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Nr = (e, t) => {
	let n = e && e.to;
	return v(n) ? t ? t(n) : null : n;
}, Pr = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = kr(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = kr(e.props), r = e.target = Nr(e.props, m), a = zr(r, e, h, p);
			r && (o !== "svg" && jr(r) ? o = "svg" : o !== "mathml" && Mr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), Rr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Er.get(e) === t) {
					if (Er.delete(e), kr(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), Rr(e, !0);
					}
					x(e);
				}
			};
			Er.set(e, t), R(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Ar(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), Rr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Er.get(e);
			if (u) {
				u.flags |= 8, Er.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = kr(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || jr(p) ? o = "svg" : (o === "mathml" || Mr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Ro(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Fr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Nr(t.props, m);
				e && (t.target = e, Fr(t, e, null, l, 0));
			} else g && Fr(t, p, h, l, 1);
			Rr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = kr(f), m = a || !p, h = Er.get(e);
		if (h && (h.flags |= 8, Er.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Fr,
	hydrate: Ir
};
function Fr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Er.has(e) && (!d || kr(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Ir(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Nr(t.props, c), h = kr(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || zr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || zr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Rr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Lr = Pr;
function Rr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function zr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Dr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Br = /* @__PURE__ */ Symbol("_leaveCb"), Vr = /* @__PURE__ */ Symbol("_enterCb");
function Hr() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Ki(() => {
		e.isMounted = !0;
	}), Yi(() => {
		e.isUnmounting = !0;
	}), e;
}
var Ur = [Function, Array], Wr = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Ur,
	onEnter: Ur,
	onAfterEnter: Ur,
	onEnterCancelled: Ur,
	onBeforeLeave: Ur,
	onLeave: Ur,
	onAfterLeave: Ur,
	onLeaveCancelled: Ur,
	onBeforeAppear: Ur,
	onAppear: Ur,
	onAfterAppear: Ur,
	onAppearCancelled: Ur
}, Gr = (e) => {
	let t = e.subTree;
	return t.component ? Gr(t.component) : t;
}, Kr = {
	name: "BaseTransition",
	props: Wr,
	setup(e, { slots: t }) {
		let n = Ns(), r = Hr();
		return () => {
			let i = t.default && ei(t.default(), !0), a = i && i.length ? qr(i) : n.subTree ? ws() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ F(e), { mode: s } = o;
			if (r.isLeaving) return Zr(a);
			let c = Qr(a);
			if (!c) return Zr(a);
			let l = Xr(c, o, r, n, (e) => l = e);
			c.type !== B && $r(c, l);
			let u = n.subTree && Qr(n.subTree);
			if (u && u.type !== B && !ms(u, c) && Gr(n).type !== B) {
				let e = Xr(u, o, r, n);
				if ($r(u, e), s === "out-in" && c.type !== B) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Zr(a);
				s === "in-out" && c.type !== B ? e.delayLeave = (e, t, n) => {
					let i = Yr(r, u);
					i[String(u.key)] = u, e[Br] = () => {
						t(), e[Br] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function qr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== B) {
			t = n;
			break;
		}
	}
	return t;
}
var Jr = Kr;
function Yr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Xr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Yr(n, e), C = (e, t) => {
		e && Rn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), f(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Br] && t[Br](!0);
			let i = S[x];
			i && ms(e, i) && i.el[Br] && i.el[Br](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || d;
			else return;
			let s = !1;
			t[Vr] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Vr] = void 0);
			};
			let c = t[Vr].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Vr] && t[Vr](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Br] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Br] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Br].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Xr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function Zr(e) {
	if (Pi(e)) return e = xs(e), e.children = null, e;
}
function Qr(e) {
	if (!Pi(e)) return Or(e.type) && e.children ? qr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && _(n.default)) return n.default();
	}
}
function $r(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, $r(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ei(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === z ? (o.patchFlag & 128 && i++, r = r.concat(ei(o.children, t, s))) : (t || o.type !== B) && r.push(s == null ? o : xs(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function ti(e, t) {
	return _(e) ? /* @__PURE__ */ c({ name: e.name }, t, { setup: e }) : e;
}
function ni() {
	let e = Ns();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function ri(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function ii(e) {
	let t = Ns(), r = /* @__PURE__ */ an(null);
	if (t) {
		let i = t.refs === n ? t.refs = {} : t.refs;
		Object.defineProperty(i, e, {
			enumerable: !0,
			get: () => r.value,
			set: (e) => r.value = e
		});
	}
	return r;
}
function ai(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var oi = /* @__PURE__ */ new WeakMap();
function si(e, t, r, i, o = !1) {
	if (f(e)) {
		e.forEach((e, n) => si(e, t && (f(t) ? t[n] : t), r, i, o));
		return;
	}
	if (ji(i) && !o) {
		i.shapeFlag & 512 && i.type.__asyncResolved && i.component.subTree.component && si(e, t, r, i.component.subTree);
		return;
	}
	let s = i.shapeFlag & 4 ? Xs(i.component) : i.el, c = o ? null : s, { i: u, r: p } = e, m = t && t.r, h = u.refs === n ? u.refs = {} : u.refs, g = u.setupState, y = /* @__PURE__ */ F(g), b = g === n ? a : (e) => !ai(h, e) && d(y, e), x = (e, t) => !(t && ai(h, t));
	if (m != null && m !== p) {
		if (ci(t), v(m)) h[m] = null, b(m) && (g[m] = null);
		else if (/* @__PURE__ */ I(m)) {
			let e = t;
			x(m, e.k) && (m.value = null), e.k && (h[e.k] = null);
		}
	}
	if (_(p)) Ln(p, u, 12, [c, h]);
	else {
		let t = v(p), n = /* @__PURE__ */ I(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? g[p] : h[p] : x(p) || !e.k ? p.value : h[e.k];
					if (o) f(n) && l(n, s);
					else if (f(n)) n.includes(s) || n.push(s);
					else if (t) h[p] = [s], b(p) && (g[p] = h[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (h[e.k] = t);
					}
				} else t ? (h[p] = c, b(p) && (g[p] = c)) : n && (x(p, e.k) && (p.value = c), e.k && (h[e.k] = c));
			};
			if (c) {
				let t = () => {
					i(), oi.delete(e);
				};
				t.id = -1, oi.set(e, t), R(t, r);
			} else ci(e), i();
		}
	}
}
function ci(e) {
	let t = oi.get(e);
	t && (t.flags |= 8, oi.delete(e));
}
var li = !1, ui = () => {
	li ||= (console.error("Hydration completed but contains mismatches."), !0);
}, di = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", fi = (e) => e.namespaceURI.includes("MathML"), pi = (e) => {
	if (e.nodeType === 1) {
		if (di(e)) return "svg";
		if (fi(e)) return "mathml";
	}
}, mi = (e) => e.nodeType === 8;
function hi(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: s, remove: c, insert: l, createComment: u } } = e, d = (e, t) => {
		if (!t.hasChildNodes()) {
			n(null, e, t), er(), t._vnode = e;
			return;
		}
		f(t.firstChild, e, null, null, null), er(), t._vnode = e;
	}, f = (n, r, o, c, u, d = !1) => {
		d ||= !!r.dynamicChildren;
		let b = mi(n) && n.data === "[", x = () => g(n, r, o, c, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: T } = r, E = n.nodeType;
		r.el = n, T === -2 && (d = !1, r.dynamicChildren = null);
		let D = null;
		switch (S) {
			case ns:
				E === 3 ? (n.data !== r.children && (ui(), n.data = r.children), D = a(n)) : r.children === "" ? (l(r.el = i(""), s(n), n), D = n) : D = x();
				break;
			case B:
				y(n) ? (D = a(n), v(r.el = n.content.firstChild, n, o)) : D = E !== 8 || b ? x() : a(n);
				break;
			case rs:
				if (b && (n = a(n), E = n.nodeType), E === 1 || E === 3) {
					D = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = a(D);
					return b ? a(D) : D;
				}
				x();
				break;
			case z:
				D = b ? h(n, r, o, c, u, d) : x();
				break;
			default: if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, o, c, u, d);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = s(n);
				if (D = b ? _(n) : mi(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, o, c, pi(e), d), ji(r) && !r.type.__asyncResolved) {
					let t;
					b ? (t = V(z), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? Ss("") : V("div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, o, c, u, d, e, m) : x() : w & 128 && (D = r.type.hydrate(n, r, o, c, pi(s(n)), u, d, e, f));
		}
		return C != null && si(C, null, c, r), D;
	}, p = (e, t, n, i, a, s) => {
		s ||= !!t.dynamicChildren;
		let { type: l, dynamicProps: u, props: d, patchFlag: f, shapeFlag: p, dirs: h, transition: g } = t, _ = l === "input" || l === "option", b = !!u;
		if (_ || b || f !== -1) {
			h && pr(t, null, n, "created");
			let l = !1;
			if (y(e)) {
				l = Lo(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (l) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (p & 16 && !(d && (d.innerHTML || d.textContent))) {
				let r = m(e.firstChild, t, e, n, i, a, s);
				for (r && !vi(e, 1) && ui(); r;) {
					let e = r;
					r = r.nextSibling, c(e);
				}
			} else if (p & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (vi(e, 0) || ui(), e.textContent = t.children);
			}
			if (d) {
				if (_ || b || !s || f & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in d) (_ && (a.endsWith("value") || a === "indeterminate") || o(a) && !D(a) || a[0] === "." || t && !D(a) || u && u.includes(a)) && r(e, a, null, d[a], i, n);
				} else if (d.onClick) r(e, "onClick", null, d.onClick, void 0, n);
				else if (f & 4 && /* @__PURE__ */ Xt(d.style)) for (let e in d.style) d.style[e];
			}
			let x;
			(x = d && d.onVnodeBeforeMount) && ks(x, n, t), h && pr(t, null, n, "beforeMount"), ((x = d && d.onVnodeMounted) || h || l) && $o(() => {
				x && ks(x, n, t), l && g.enter(e), h && pr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, m = (e, t, r, o, s, c, u) => {
		u ||= !!t.dynamicChildren;
		let d = t.children, p = d.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? d[t] : d[t] = Ts(d[t]), g = h.type === ns;
			e ? (g && !u && t + 1 < p && Ts(d[t + 1]).type === ns && (l(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = f(e, h, o, s, c, u)) : g && !h.children ? l(h.el = i(""), r) : (m || (m = !0, vi(r, 1) || ui()), n(null, h, r, null, o, s, pi(r), c));
		}
		return e;
	}, h = (e, t, n, r, i, o) => {
		let { slotScopeIds: c } = t;
		c && (i = i ? i.concat(c) : c);
		let d = s(e), f = m(a(e), t, d, n, r, i, o);
		return f && mi(f) && f.data === "]" ? a(t.anchor = f) : (ui(), l(t.anchor = u("]"), d, f), f);
	}, g = (e, t, r, i, o, l) => {
		if (bi(e, t) || ui(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) c(n);
				else break;
			}
		}
		let u = a(e), d = s(e);
		return c(e), n(null, t, d, u, r, i, pi(d), o), r && (r.vnode.el = t.el, po(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && mi(e) && (e.data === t && r++, e.data === n)) {
			if (r === 0) return a(e);
			r--;
		}
		return e;
	}, v = (e, t, n) => {
		let r = t.parentNode;
		r && r.replaceChild(e, t);
		let i = n;
		for (; i;) i.vnode.el === t && (i.vnode.el = i.subTree.el = e), i = i.parent;
	}, y = (e) => e.nodeType === 1 && e.tagName === "TEMPLATE";
	return [d, f];
}
var gi = "data-allow-mismatch", _i = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function vi(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(gi);) e = e.parentElement;
	return yi(e && e.getAttribute(gi), t);
}
function yi(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(_i[t]);
	}
}
function bi(e, t) {
	return vi(e.parentElement, 1) || xi(e) || Si(t);
}
function xi(e) {
	return e.nodeType === 1 && yi(e.getAttribute(gi), 1);
}
function Si({ props: e }) {
	let t = e && e[gi];
	return typeof t == "string" && yi(t, 1);
}
var Ci = le().requestIdleCallback || ((e) => setTimeout(e, 1)), wi = le().cancelIdleCallback || ((e) => clearTimeout(e)), Ti = (e = 1e4) => (t) => {
	let n = Ci(t, { timeout: e });
	return () => wi(n);
};
function Ei(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Di = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e);
	return n((e) => {
		if (e instanceof Element) {
			if (Ei(e)) return t(), r.disconnect(), !1;
			r.observe(e);
		}
	}), () => r.disconnect();
}, Oi = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, ki = (e = []) => (t, n) => {
	v(e) && (e = [e]);
	let r = !1, i = (e) => {
		r || (r = !0, a(), t(), e.target.dispatchEvent(new e.constructor(e.type, e)));
	}, a = () => {
		n((t) => {
			for (let n of e) t.removeEventListener(n, i);
		});
	};
	return n((t) => {
		for (let n of e) t.addEventListener(n, i, { once: !0 });
	}), a;
};
function Ai(e, t) {
	if (mi(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (mi(r)) if (r.data === "]") {
				if (--n === 0) break;
			} else r.data === "[" && n++;
			r = r.nextSibling;
		}
	} else t(e);
}
var ji = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Mi(e) {
	_(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ ti({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Ai(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = H;
			if (ri(e), u) return () => Ni(u, e);
			let t = (t) => {
				l = null, zn(t, e, 13, !r);
			};
			if (s && e.suspense || zs) return p().then((t) => () => Ni(t, e)).catch((e) => (t(e), () => r ? V(r, { error: e }) : null));
			let a = /* @__PURE__ */ rn(!1), c = /* @__PURE__ */ rn(), d = /* @__PURE__ */ rn(!!i), f, m;
			return Xi(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Pi(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				if (e.isUnmounted) {
					l = null;
					return;
				}
				t(n), c.value = n;
			}), () => {
				if (a.value && u) return Ni(u, e);
				if (c.value && r) return V(r, { error: c.value });
				if (n && !d.value) return Ni(n, e);
			};
		}
	});
}
function Ni(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = V(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Pi = (e) => e.type.__isKeepAlive, Fi = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number]
	},
	setup(e, { slots: t }) {
		let n = Ns(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), R(() => {
				a.isDeactivated = !1, a.a && ie(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && ks(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = e.component;
			Vo(t.m), Vo(t.a), l(e, f, null, 1, s), R(() => {
				t.da && ie(t.da);
				let n = e.props && e.props.onVnodeUnmounted;
				n && ks(n, t.parent, e), t.isDeactivated = !0;
			}, s);
		};
		function p(e) {
			Vi(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = Zs(ji(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !ms(t, o)) ? p(t) : o && Vi(o), i.delete(e), a.delete(e);
		}
		Sr(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => Ii(e, t)), t && m((e) => !Ii(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			g != null && (Uo(n.subTree.type) ? R(() => {
				i.set(g, Hi(n.subTree));
			}, n.subTree.suspense) : i.set(g, Hi(n.subTree)));
		};
		return Ki(_), Ji(_), Yi(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = Hi(t);
				if (e.type === i.type && e.key === i.key) {
					Vi(i);
					let e = i.component.da;
					e && R(e, r);
					return;
				}
				p(e);
			});
		}), () => {
			if (g = null, !t.default) return o = null;
			let n = t.default(), r = n[0];
			if (n.length > 1) return o = null, n;
			if (!ps(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = Hi(r);
			if (s.type === B) return o = null, s;
			let c = s.type, l = Zs(ji(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !Ii(u, l)) || d && l && Ii(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = xs(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && $r(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, Uo(r.type) ? r : s;
		};
	}
};
function Ii(e, t) {
	return f(e) ? e.some((e) => Ii(e, t)) : v(e) ? e.split(",").includes(t) : g(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Li(e, t) {
	zi(e, "a", t);
}
function Ri(e, t) {
	zi(e, "da", t);
}
function zi(e, t, n = H) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Ui(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Pi(e.parent.vnode) && Bi(r, t, n, e), e = e.parent;
	}
}
function Bi(e, t, n, r) {
	let i = Ui(t, e, r, !0);
	Xi(() => {
		l(r[t], i);
	}, n);
}
function Vi(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function Hi(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function Ui(e, t, n = H, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Xe();
			let i = Is(n), a = Rn(t, n, e, r);
			return i(), Ze(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Wi = (e) => (t, n = H) => {
	(!zs || e === "sp") && Ui(e, (...e) => t(...e), n);
}, Gi = Wi("bm"), Ki = Wi("m"), qi = Wi("bu"), Ji = Wi("u"), Yi = Wi("bum"), Xi = Wi("um"), Zi = Wi("sp"), Qi = Wi("rtg"), $i = Wi("rtc");
function ea(e, t = H) {
	Ui("ec", e, t);
}
var ta = "components", na = "directives";
function ra(e, t) {
	return sa(ta, e, !0, t) || e;
}
var ia = /* @__PURE__ */ Symbol.for("v-ndc");
function aa(e) {
	return v(e) ? sa(ta, e, !1) || e : e || ia;
}
function oa(e) {
	return sa(na, e);
}
function sa(e, t, n = !0, r = !1) {
	let i = L || H;
	if (i) {
		let n = i.type;
		if (e === ta) {
			let e = Zs(n, !1);
			if (e && (e === t || e === k(t) || e === ne(k(t)))) return n;
		}
		let a = ca(i[e] || n[e], t) || ca(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function ca(e, t) {
	return e && (e[t] || e[k(t)] || e[ne(k(t))]);
}
function la(e, t, n, r) {
	let i, a = n && n[r], o = f(e);
	if (o || v(e)) {
		let n = o && /* @__PURE__ */ Xt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Qt(e), s = /* @__PURE__ */ Zt(e), e = dt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? nn(tn(e[n])) : tn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (b(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
function ua(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (f(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function da(e, t, n = {}, r, i, a) {
	if (L.ce || L.parent && ji(L.parent) && L.parent.ce) {
		let e = a != null && n.key == null ? c({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), os(), fs(z, null, [V("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = is.length;
	os();
	let l;
	try {
		let i = o && fa(o(n)), s = n.key || a || i && i.key;
		l = fs(z, { key: (s && !y(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = is.length; e > s; e--) ss();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), l;
}
function fa(e) {
	return e.some((e) => !ps(e) || !(e.type === B || e.type === z && !fa(e.children))) ? e : null;
}
function pa(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : re(r)] = e[r];
	return n;
}
var ma = (e) => e ? Rs(e) ? Xs(e) : ma(e.parent) : null, ha = /* @__PURE__ */ c(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ma(e.parent),
	$root: (e) => ma(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => za(e),
	$forceUpdate: (e) => e.f ||= () => {
		Xn(e.update);
	},
	$nextTick: (e) => e.n ||= Jn.bind(e.proxy),
	$watch: (e) => wr.bind(e)
}), ga = (e, t) => e !== n && !e.__isScriptSetup && d(e, t), _a = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (t[0] !== "$") {
			let e = s[t];
			if (e !== void 0) switch (e) {
				case 1: return i[t];
				case 2: return a[t];
				case 4: return r[t];
				case 3: return o[t];
			}
			else if (ga(i, t)) return s[t] = 1, i[t];
			else if (a !== n && d(a, t)) return s[t] = 2, a[t];
			else if (d(o, t)) return s[t] = 3, o[t];
			else if (r !== n && d(r, t)) return s[t] = 4, r[t];
			else Pa && (s[t] = 0);
		}
		let u = ha[t], f, p;
		if (u) return t === "$attrs" && st(e.attrs, "get", ""), u(e);
		if ((f = c.__cssModules) && (f = f[t])) return f;
		if (r !== n && d(r, t)) return s[t] = 4, r[t];
		if (p = l.config.globalProperties, d(p, t)) return p[t];
	},
	set({ _: e }, t, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return ga(a, t) ? (a[t] = r, !0) : i !== n && d(i, t) ? (i[t] = r, !0) : d(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = r, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== n && c[0] !== "$" && d(e, c) || ga(t, c) || d(o, c) || d(i, c) || d(ha, c) || d(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? d(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, va = /* @__PURE__ */ c({}, _a, {
	get(e, t) {
		if (t !== Symbol.unscopables) return _a.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !ue(t);
	}
});
function ya() {
	return null;
}
function ba() {
	return null;
}
function xa(e) {}
function Sa(e) {}
function Ca() {
	return null;
}
function wa() {}
function Ta(e, t) {
	return null;
}
function Ea() {
	return Oa("useSlots").slots;
}
function Da() {
	return Oa("useAttrs").attrs;
}
function Oa(e) {
	let t = Ns();
	return t.setupContext ||= Ys(t);
}
function ka(e) {
	return f(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Aa(e, t) {
	let n = ka(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? f(r) || _(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function ja(e, t) {
	return !e || !t ? e || t : f(e) && f(t) ? e.concat(t) : c({}, ka(e), ka(t));
}
function Ma(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Na(e) {
	let t = Ns(), n = zs, r = e();
	Ls(), n && Fs(!1);
	let i = () => {
		Is(t), n && Fs(!0);
	}, a = () => {
		Ns() !== t && t.scope.off(), Ls(), n && Fs(!1);
	};
	return x(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Pa = !0;
function Fa(e) {
	let t = za(e), n = e.proxy, r = e.ctx;
	Pa = !1, t.beforeCreate && La(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: d, beforeMount: p, mounted: m, beforeUpdate: h, updated: g, activated: v, deactivated: y, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: D, errorCaptured: O, serverPrefetch: ee, expose: k, inheritAttrs: te, components: A, directives: ne, filters: re } = t;
	if (u && Ia(u, r, null), s) for (let e in s) {
		let t = s[e];
		_(t) && (r[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		b(t) && (e.data = /* @__PURE__ */ Gt(t));
	}
	if (Pa = !0, o) for (let e in o) {
		let t = o[e], a = $s({
			get: _(t) ? t.bind(n, n) : _(t.get) ? t.get.bind(n, n) : i,
			set: !_(t) && _(t.set) ? t.set.bind(n) : i
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Ra(c[e], r, n, e);
	if (l) {
		let e = _(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			mr(t, e[t]);
		});
	}
	d && La(d, e, "c");
	function j(e, t) {
		f(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (j(Gi, p), j(Ki, m), j(qi, h), j(Ji, g), j(Li, v), j(Ri, y), j(ea, O), j($i, E), j(Qi, D), j(Yi, S), j(Xi, w), j(Zi, ee), f(k)) if (k.length) {
		let t = e.exposed ||= {};
		k.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === i && (e.render = T), te != null && (e.inheritAttrs = te), A && (e.components = A), ne && (e.directives = ne), ee && ri(e);
}
function Ia(e, t, n = i) {
	f(e) && (e = Wa(e));
	for (let n in e) {
		let r = e[n], i;
		i = b(r) ? "default" in r ? hr(r.from || n, r.default, !0) : hr(r.from || n) : hr(r), /* @__PURE__ */ I(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function La(e, t, n) {
	Rn(f(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ra(e, t, n, r) {
	let i = r.includes(".") ? Tr(n, r) : () => n[r];
	if (v(e)) {
		let n = t[e];
		_(n) && Sr(i, n);
	} else if (_(e)) Sr(i, e.bind(n));
	else if (b(e)) if (f(e)) e.forEach((e) => Ra(e, t, n, r));
	else {
		let r = _(e.handler) ? e.handler.bind(n) : t[e.handler];
		_(r) && Sr(i, r, e);
	}
}
function za(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ba(c, e, o, !0)), Ba(c, t, o)), b(t) && a.set(t, c), c;
}
function Ba(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ba(e, a, n, !0), i && i.forEach((t) => Ba(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Va[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Va = {
	data: Ha,
	props: qa,
	emits: qa,
	methods: Ka,
	computed: Ka,
	beforeCreate: Ga,
	created: Ga,
	beforeMount: Ga,
	mounted: Ga,
	beforeUpdate: Ga,
	updated: Ga,
	beforeDestroy: Ga,
	beforeUnmount: Ga,
	destroyed: Ga,
	unmounted: Ga,
	activated: Ga,
	deactivated: Ga,
	errorCaptured: Ga,
	serverPrefetch: Ga,
	components: Ka,
	directives: Ka,
	watch: Ja,
	provide: Ha,
	inject: Ua
};
function Ha(e, t) {
	return t ? e ? function() {
		return c(_(e) ? e.call(this, this) : e, _(t) ? t.call(this, this) : t);
	} : t : e;
}
function Ua(e, t) {
	return Ka(Wa(e), Wa(t));
}
function Wa(e) {
	if (f(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Ga(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Ka(e, t) {
	return e ? c(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function qa(e, t) {
	return e ? f(e) && f(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : c(/* @__PURE__ */ Object.create(null), ka(e), ka(t ?? {})) : t;
}
function Ja(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = c(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Ga(e[r], t[r]);
	return n;
}
function Ya() {
	return {
		app: null,
		config: {
			isNativeTag: a,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Xa = 0;
function Za(e, t) {
	return function(n, r = null) {
		_(n) || (n = c({}, n)), r != null && !b(r) && (r = null);
		let i = Ya(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, l = i.app = {
			_uid: Xa++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ic,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && _(e.install) ? (a.add(e), e.install(l, ...t)) : _(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, c) {
				if (!s) {
					let u = l._ceVNode || V(n, r);
					return u.appContext = i, c === !0 ? c = "svg" : c === !1 && (c = void 0), o && t ? t(u, a) : e(u, a, c), s = !0, l._container = a, a.__vue_app__ = l, Xs(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Rn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Qa;
				Qa = l;
				try {
					return e();
				} finally {
					Qa = t;
				}
			}
		};
		return l;
	};
}
var Qa = null;
function $a(e, t, r = n) {
	let i = Ns(), a = k(t), o = A(t), s = eo(e, a), c = mn((s, c) => {
		let l, u = n, d;
		return xr(() => {
			let t = e[a];
			j(l, t) && (l = t, c());
		}), {
			get() {
				return s(), r.get ? r.get(l) : l;
			},
			set(e) {
				let s = r.set ? r.set(e) : e;
				if (!j(s, l) && !(u !== n && j(e, u))) return;
				let f = i.vnode.props, p = !!(f && (t in f || a in f || o in f) && (`onUpdate:${t}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${t}`, s), j(e, u) && (j(e, s) && !j(s, d) || p && u !== n && !j(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || n : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var eo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${k(t)}Modifiers`] || e[`${A(t)}Modifiers`];
function to(e, t, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || n, a = r, o = t.startsWith("update:"), s = o && eo(i, t.slice(7));
	s && (s.trim && (a = r.map((e) => v(e) ? e.trim() : e)), s.number && (a = r.map(oe)));
	let c, l = i[c = re(t)] || i[c = re(k(t))];
	!l && o && (l = i[c = re(A(t))]), l && Rn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Rn(u, e, 6, a);
	}
}
var no = /* @__PURE__ */ new WeakMap();
function ro(e, t, n = !1) {
	let r = n ? no : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!_(e)) {
		let r = (e) => {
			let n = ro(e, t, !0);
			n && (s = !0, c(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (b(e) && r.set(e, null), null) : (f(a) ? a.forEach((e) => o[e] = null) : c(o, a), b(e) && r.set(e, o), o);
}
function io(e, t) {
	return !e || !o(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), d(e, t[0].toLowerCase() + t.slice(1)) || d(e, A(t)) || d(e, t));
}
function ao(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = sr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Ts(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = Ts(e.length > 1 ? e(f, {
				attrs: c,
				slots: o,
				emit: l
			}) : e(f, null)), y = t.props ? c : so(c);
		}
	} catch (t) {
		is.length = 0, zn(t, e, 1), v = V(B);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(s) && (y = co(y, a)), b = xs(b, y, !1, !0));
	}
	return n.dirs && (b = xs(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && $r(b, n.transition), v = b, sr(_), v;
}
function oo(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (ps(r)) {
			if (r.type !== B || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var so = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || o(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, co = (e, t) => {
	let n = {};
	for (let r in e) (!s(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function lo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? uo(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (fo(o, r, n) && !io(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || uo(r, o, l) : !!o;
	return !1;
}
function uo(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (fo(t, e, a) && !io(n, a)) return !0;
	}
	return !1;
}
function fo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && b(r) && b(i) ? !Se(r, i) : r !== i;
}
function po({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var mo = {}, ho = () => Object.create(mo), go = (e) => Object.getPrototypeOf(e) === mo;
function _o(e, t, n, r = !1) {
	let i = {}, a = ho();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), yo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Kt(i) : e.type.props ? i : a, e.attrs = a;
}
function vo(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ F(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (io(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (d(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = k(o);
					i[t] = bo(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		yo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !d(t, a) && ((r = A(a)) === a || !d(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = bo(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !d(t, e)) && (delete a[e], l = !0);
	}
	l && ct(e.attrs, "set", "");
}
function yo(e, t, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (t) for (let n in t) {
		if (D(n)) continue;
		let l = t[n], u;
		a && d(a, u = k(n)) ? !o || !o.includes(u) ? r[u] = l : (c ||= {})[u] = l : io(e.emitsOptions, n) || (!(n in i) || l !== i[n]) && (i[n] = l, s = !0);
	}
	if (o) {
		let t = /* @__PURE__ */ F(r), i = c || n;
		for (let n = 0; n < o.length; n++) {
			let s = o[n];
			r[s] = bo(a, t, s, i[s], e, !d(i, s));
		}
	}
	return s;
}
function bo(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = d(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && _(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Is(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === A(n)) && (r = !0));
	}
	return r;
}
var xo = /* @__PURE__ */ new WeakMap();
function So(e, t, i = !1) {
	let a = i ? xo : t.propsCache, o = a.get(e);
	if (o) return o;
	let s = e.props, l = {}, u = [], p = !1;
	if (!_(e)) {
		let n = (e) => {
			p = !0;
			let [n, r] = So(e, t, !0);
			c(l, n), r && u.push(...r);
		};
		!i && t.mixins.length && t.mixins.forEach(n), e.extends && n(e.extends), e.mixins && e.mixins.forEach(n);
	}
	if (!s && !p) return b(e) && a.set(e, r), r;
	if (f(s)) for (let e = 0; e < s.length; e++) {
		let t = k(s[e]);
		Co(t) && (l[t] = n);
	}
	else if (s) for (let e in s) {
		let t = k(e);
		if (Co(t)) {
			let n = s[e], r = l[t] = f(n) || _(n) ? { type: n } : c({}, n), i = r.type, a = !1, o = !0;
			if (f(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = _(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = _(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || d(r, "default")) && u.push(t);
		}
	}
	let m = [l, u];
	return b(e) && a.set(e, m), m;
}
function Co(e) {
	return e[0] !== "$" && !D(e);
}
var wo = (e) => e === "_" || e === "_ctx" || e === "$stable", To = (e) => f(e) ? e.map(Ts) : [Ts(e)], Eo = (e, t, n) => {
	if (t._n) return t;
	let r = dr((...e) => To(t(...e)), n);
	return r._c = !1, r;
}, Do = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (wo(n)) continue;
		let i = e[n];
		if (_(i)) t[n] = Eo(n, i, r);
		else if (i != null) {
			let e = To(i);
			t[n] = () => e;
		}
	}
}, Oo = (e, t) => {
	let n = To(t);
	e.slots.default = () => n;
}, ko = (e, t, n) => {
	for (let r in t) (n || !wo(r)) && (e[r] = t[r]);
}, Ao = (e, t, n) => {
	let r = e.slots = ho();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (ko(r, t, n), n && ae(r, "_", e, !0)) : Do(t, r);
	} else t && Oo(e, t);
}, jo = (e, t, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = n;
	if (i.shapeFlag & 32) {
		let e = t._;
		e ? r && e === 1 ? o = !1 : ko(a, t, r) : (o = !t.$stable, Do(t, a)), s = t;
	} else t && (Oo(e, t), s = { default: 1 });
	if (o) for (let e in a) !wo(e) && s[e] == null && delete a[e];
}, R = $o;
function Mo(e) {
	return Po(e);
}
function No(e) {
	return Po(e, hi);
}
function Po(e, t) {
	let a = le();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = i, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ms(e, t) && (r = _e(e), fe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case ns:
				y(e, t, n, r);
				break;
			case B:
				b(e, t, n, r);
				break;
			case rs:
				e ?? x(t, n, r, o);
				break;
			case z:
				A(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? ne(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, be);
		}
		u != null && i ? si(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && si(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ee(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && O(e.children, d, null, r, i, Fo(e, a), s, u), _ && pr(e, null, r, "created"), E(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !D(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ks(f, r, e);
		}
		_ && pr(e, null, r, "beforeMount");
		let v = Lo(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && R(() => {
			try {
				f && ks(f, r, e), v && g.enter(d), _ && pr(e, null, r, "mounted");
			} finally {}
		}, i);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Uo(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, O = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Es(e[l]) : Ts(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, ee = (e, t, r, i, a, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || n, h = t.props || n, g;
		if (r && Io(r, !1), (g = h.onVnodeBeforeUpdate) && ks(g, r, t, e), f && pr(t, e, r, "beforeUpdate"), r && Io(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? k(e.dynamicChildren, d, l, r, i, Fo(t, a), o) : s || se(e, t, l, null, r, i, Fo(t, a), o, !1), u > 0) {
			if (u & 16) te(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && te(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && R(() => {
			g && ks(g, r, t, e), f && pr(t, e, r, "updated");
		}, i);
	}, k = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === z || !ms(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, te = (e, t, r, i, a) => {
		if (t !== r) {
			if (t !== n) for (let n in t) !D(n) && !(n in r) && c(e, n, t[n], null, a, i);
			for (let n in r) {
				if (D(n)) continue;
				let o = r[n], s = t[n];
				o !== s && n !== "value" && c(e, n, s, o, a, i);
			}
			"value" in r && c(e, "value", t.value, r.value, a);
		}
	}, A = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), O(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (k(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ro(e, t, !0)) : se(e, t, n, f, i, a, s, c, l);
	}, ne = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : re(t, n, r, i, a, o, c) : j(e, t, c);
	}, re = (e, t, n, r, i, a, o) => {
		let s = e.component = Ms(e, r, i);
		if (Pi(e) && (s.ctx.renderer = be), Bs(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ae, o), !e.el) {
				let r = s.subTree = V(B);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ae(s, e, t, n, i, a, o);
	}, j = (e, t, n) => {
		let r = t.component = e.component;
		if (lo(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			oe(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ae = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Bo(e);
					if (n) {
						t && (t.el = c.el, oe(e, t, o)), n.asyncDep.then(() => {
							R(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Io(e, !1), t ? (t.el = c.el, oe(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ks(d, s, t, c), Io(e, !0);
				let f = ao(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), _e(p), e, i, a), t.el = f.el, u === null && po(e, f.el), r && R(r, i), (d = t.props && t.props.onVnodeUpdated) && R(() => ks(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = ji(t);
				if (Io(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && ks(o, d, t), Io(e, !0), s && Se) {
					let t = () => {
						e.subTree = ao(e), Se(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ao(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && R(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					R(() => ks(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && ji(d.vnode) && d.vnode.shapeFlag & 256) && e.a && R(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ne(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Xn(u), Io(e, !0), l();
	}, oe = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, vo(e, t.props, r, n), jo(e, t.children, n), Xe(), $n(e), Ze();
	}, se = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ue(l, d, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && O(d, n, r, i, a, o, s, c));
	}, ce = (e, t, n, i, a, o, s, c, l) => {
		e ||= r, t ||= r;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let r = t[p] = l ? Es(t[p]) : Ts(t[p]);
			v(e[p], r, n, null, a, o, s, c, l);
		}
		u > d ? ge(e, a, o, !0, !1, f) : O(t, n, i, a, o, s, c, l, f);
	}, ue = (e, t, n, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], i = t[u] = l ? Es(t[u]) : Ts(t[u]);
			if (ms(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], i = t[p] = l ? Es(t[p]) : Ts(t[p]);
			if (ms(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, r = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Es(t[u]) : Ts(t[u]), n, r, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) fe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Es(t[u]) : Ts(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					fe(r, a, o, !0);
					continue;
				}
				let i;
				if (r.key != null) i = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ms(r, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? fe(r, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(r, t[i], n, null, a, o, s, c, l), y++);
			}
			let w = x ? zo(C) : r;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, r = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ho(f) : i;
				C[u] === 0 ? v(null, r, n, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? de(r, n, p, 2) : _--);
			}
		}
	}, de = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			de(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, be);
			return;
		}
		if (c === z) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === rs) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.persisted && !a[Br] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), R(() => l.enter(a), i));
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				let e = a._isLeaving || !!a[Br];
				a._isLeaving && a[Br](!0), l.persisted && !e ? u() : r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, fe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Xe(), si(s, null, n, e, !0), Ze()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !ji(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ks(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && pr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, be, r) : l && !l.hasOnce && (a !== z || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === z && d & 384 || !i && u & 16) && ge(c, t, n), r && pe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && R(() => {
			_ && ks(_, t, e), h && pr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, pe = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === z) {
			me(n, r);
			return;
		}
		if (t === rs) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, me = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, he = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Vo(c), Vo(l), r && ie(r), i.stop(), a && (a.flags |= 8, fe(o, e, t, n)), s && R(s, t), R(() => {
			e.isUnmounted = !0;
		}, t);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Dr];
		return n ? h(n) : t;
	}, ve = !1, ye = (e, t, n) => {
		let r;
		e == null ? t._vnode && (fe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = !0, $n(r), er(), !1);
	}, be = {
		p: v,
		um: fe,
		m: de,
		r: pe,
		mt: re,
		mc: O,
		pc: se,
		pbc: k,
		n: _e,
		o: e
	}, xe, Se;
	return t && ([xe, Se] = t(be)), {
		render: ye,
		hydrate: xe,
		createApp: Za(ye, xe)
	};
}
function Fo({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Io({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Lo(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ro(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (f(r) && f(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Es(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ro(t, a)), a.type === ns && (a.patchFlag === -1 && (a = i[e] = Es(a)), a.el = t.el), a.type === B && !a.el && (a.el = t.el);
	}
}
function zo(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Bo(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Bo(t);
}
function Vo(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ho(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ho(t.subTree) : null;
}
var Uo = (e) => e.__isSuspense, Wo = 0, Go = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) qo(t, n, r, i, a, o, s, c, l);
		else {
			if (a && a.deps > 0 && !e.suspense.isInFallback) {
				t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
				return;
			}
			Jo(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: Xo,
	normalize: Zo
};
function Ko(e, t) {
	let n = e.props && e.props[t];
	_(n) && n();
}
function qo(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = Yo(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (Ko(e, "onPending"), Ko(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), es(f, e.ssFallback)) : f.resolve(!1, !0);
}
function Jo(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, ms(h, f) ? (c(h, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : g && (_ || (c(m, p, n, r, i, null, a, o, s), es(d, p)))) : (d.pendingId = Wo++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : (c(m, p, n, r, i, null, a, o, s), es(d, p))) : m && ms(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && ms(m, f)) c(m, f, n, r, i, d, a, o, s), es(d, f);
	else if (Ko(t, "onPending"), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : Wo++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e, pendingId: t } = d;
		e > 0 ? setTimeout(() => {
			d.pendingId === t && d.fallback(p);
		}, e) : e === 0 && d.fallback(p);
	}
}
function Yo(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = ts(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? se(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: Wo++,
		timeout: typeof y == "number" ? y : -1,
		activeBranch: null,
		isFallbackMountPending: !1,
		pendingBranch: null,
		isInFallback: !u,
		isHydrating: u,
		isUnmounted: !1,
		effects: [],
		resolve(e = !1, n = !1) {
			let { vnode: r, activeBranch: i, pendingBranch: o, pendingId: s, effects: c, parentComponent: l, container: u, isInFallback: d } = x, g = !1;
			if (x.isHydrating) x.isHydrating = !1;
			else if (!e) {
				g = i && o.transition && o.transition.mode === "out-in";
				let e = !1;
				g && (i.transition.afterLeave = () => {
					s === x.pendingId && (f(o, u, a === b && !e ? m(i) : a, 0), Qn(c), d && r.ssFallback && (r.ssFallback.el = null));
				}), i && !x.isFallbackMountPending && (h(i.el) === u && (a = m(i), e = !0), p(i, l, x, !0), !g && d && r.ssFallback && R(() => r.ssFallback.el = null, x)), g || f(o, u, a, 0);
			}
			x.isFallbackMountPending = !1, es(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = x.parent, S = !1;
			for (; y;) {
				if (y.pendingBranch) {
					y.effects.push(...c), S = !0;
					break;
				}
				y = y.parent;
			}
			!S && !g && Qn(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (t.deps--, t.deps === 0 && !n && t.resolve()), Ko(r, "onResolve");
		},
		fallback(e) {
			if (!x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			Ko(t, "onFallback");
			let o = m(n), l = () => {
				x.isFallbackMountPending = !1, x.isInFallback && (d(null, e, i, o, r, null, a, s, c), es(x, e));
			}, u = e.transition && e.transition.mode === "out-in";
			u && (x.isFallbackMountPending = !0, n.transition.afterLeave = l), x.isInFallback = !0, p(n, r, null, !0), u || l();
		},
		move(e, t, n) {
			x.activeBranch && f(x.activeBranch, e, t, n), x.container = e;
		},
		next() {
			return x.activeBranch && m(x.activeBranch);
		},
		registerDep(e, t, n) {
			let r = !!x.pendingBranch;
			r && x.deps++;
			let i = e.vnode.el;
			e.asyncDep.catch((t) => {
				zn(t, e, 0);
			}).then((a) => {
				if (e.isUnmounted || x.isUnmounted || x.pendingId !== e.suspenseId) return;
				Ls(), e.asyncResolved = !0;
				let { vnode: s } = e;
				Hs(e, a, !1), i && (s.el = i);
				let c = !i && e.subTree.el;
				t(e, s, h(i || e.subTree.el), i ? null : m(e.subTree), x, o, n), c && (s.placeholder = null, g(c)), po(e, s.el), r && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			x.isUnmounted = !0, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
		}
	};
	return x;
}
function Xo(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = Yo(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function Zo(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = Qo(r ? n.default : n), e.ssFallback = r ? Qo(n.fallback) : V(B);
}
function Qo(e) {
	let t;
	if (_(e)) {
		let n = cs && e._c;
		n && (e._d = !1, os()), e = e(), n && (e._d = !0, t = as, ss());
	}
	return f(e) && (e = oo(e)), e = Ts(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function $o(e, t) {
	t && t.pendingBranch ? f(e) ? t.effects.push(...e) : t.effects.push(e) : Qn(e);
}
function es(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, po(r, i));
}
function ts(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var z = /* @__PURE__ */ Symbol.for("v-fgt"), ns = /* @__PURE__ */ Symbol.for("v-txt"), B = /* @__PURE__ */ Symbol.for("v-cmt"), rs = /* @__PURE__ */ Symbol.for("v-stc"), is = [], as = null;
function os(e = !1) {
	is.push(as = e ? null : []);
}
function ss() {
	is.pop(), as = is[is.length - 1] || null;
}
var cs = 1;
function ls(e, t = !1) {
	cs += e, e < 0 && as && t && (as.hasOnce = !0);
}
function us(e) {
	return e.dynamicChildren = cs > 0 ? as || r : null, ss(), cs > 0 && as && as.push(e), e;
}
function ds(e, t, n, r, i, a) {
	return us(vs(e, t, n, r, i, a, !0));
}
function fs(e, t, n, r, i) {
	return us(V(e, t, n, r, i, !0));
}
function ps(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ms(e, t) {
	return e.type === t.type && e.key === t.key;
}
function hs(e) {}
var gs = ({ key: e }) => e ?? null, _s = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : v(e) || /* @__PURE__ */ I(e) || _(e) ? {
	i: L,
	r: e,
	k: t,
	f: !!n
} : e);
function vs(e, t = null, n = null, r = 0, i = null, a = e === z ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && gs(t),
		ref: t && _s(t),
		scopeId: or,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: L
	};
	return s ? (Ds(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= v(n) ? 8 : 16), cs > 0 && !o && as && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && as.push(c), c;
}
var V = ys;
function ys(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === ia) && (e = B), ps(e)) {
		let r = xs(e, t, !0);
		return n && Ds(r, n), cs > 0 && !a && as && (r.shapeFlag & 6 ? as[as.indexOf(e)] = r : as.push(r)), r.patchFlag = -2, r;
	}
	if (Qs(e) && (e = e.__vccOpts), t) {
		t = bs(t);
		let { class: e, style: n } = t;
		e && !v(e) && (t.class = ge(e)), b(n) && (/* @__PURE__ */ $t(n) && !f(n) && (n = c({}, n)), t.style = de(n));
	}
	let o = v(e) ? 1 : Uo(e) ? 128 : Or(e) ? 64 : b(e) ? 4 : _(e) ? 2 : 0;
	return vs(e, t, n, r, i, o, a, !0);
}
function bs(e) {
	return e ? /* @__PURE__ */ $t(e) || go(e) ? c({}, e) : e : null;
}
function xs(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Os(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && gs(l),
		ref: t && t.ref ? n && a ? f(a) ? a.concat(_s(t)) : [a, _s(t)] : _s(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== z ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && xs(e.ssContent),
		ssFallback: e.ssFallback && xs(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && $r(u, c.clone(u)), u;
}
function Ss(e = " ", t = 0) {
	return V(ns, null, e, t);
}
function Cs(e, t) {
	let n = V(rs, null, e);
	return n.staticCount = t, n;
}
function ws(e = "", t = !1) {
	return t ? (os(), fs(B, null, e)) : V(B, null, e);
}
function Ts(e) {
	return e == null || typeof e == "boolean" ? V(B) : f(e) ? V(z, null, e.slice()) : ps(e) ? Es(e) : V(ns, null, String(e));
}
function Es(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : xs(e);
}
function Ds(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (f(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), Ds(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !go(t) ? t._ctx = L : r === 3 && L && (L.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (_(t)) {
		if (r & 65) {
			Ds(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: L
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Ss(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function Os(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = ge([t.class, r.class]));
		else if (e === "style") t.style = de([t.style, r.style]);
		else if (o(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(f(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !s(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ks(e, t, n, r = null) {
	Rn(e, t, 7, [n, r]);
}
var As = Ya(), js = 0;
function Ms(e, t, r) {
	let i = e.type, a = (t ? t.appContext : e.appContext) || As, o = {
		uid: js++,
		vnode: e,
		type: i,
		parent: t,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Oe(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(a.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: So(i, a),
		emitsOptions: ro(i, a),
		emit: null,
		emitted: null,
		propsDefaults: n,
		inheritAttrs: i.inheritAttrs,
		ctx: n,
		data: n,
		props: n,
		attrs: n,
		slots: n,
		refs: n,
		setupState: n,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = to.bind(null, o), e.ce && e.ce(o), o;
}
var H = null, Ns = () => H || L, Ps, Fs;
{
	let e = le(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ps = t("__VUE_INSTANCE_SETTERS__", (e) => H = e), Fs = t("__VUE_SSR_SETTERS__", (e) => zs = e);
}
var Is = (e) => {
	let t = H;
	return Ps(e), e.scope.on(), () => {
		e.scope.off(), Ps(t);
	};
}, Ls = () => {
	H && H.scope.off(), Ps(null);
};
function Rs(e) {
	return e.vnode.shapeFlag & 4;
}
var zs = !1;
function Bs(e, t = !1, n = !1) {
	t && Fs(t);
	let { props: r, children: i } = e.vnode, a = Rs(e);
	_o(e, r, a, t), Ao(e, i, n || t);
	let o = a ? Vs(e, t) : void 0;
	return t && Fs(!1), o;
}
function Vs(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, _a);
	let { setup: r } = n;
	if (r) {
		Xe();
		let n = e.setupContext = r.length > 1 ? Ys(e) : null, i = Is(e), a = Ln(r, e, 0, [e.props, n]), o = x(a);
		if (Ze(), i(), (o || e.sp) && !ji(e) && ri(e), o) {
			if (a.then(Ls, Ls), t) return a.then((n) => {
				Hs(e, n, t);
			}).catch((t) => {
				zn(t, e, 0);
			});
			e.asyncDep = a;
		} else Hs(e, a, t);
	} else qs(e, t);
}
function Hs(e, t, n) {
	_(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : b(t) && (e.setupState = fn(t)), qs(e, n);
}
var Us, Ws;
function Gs(e) {
	Us = e, Ws = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, va));
	};
}
var Ks = () => !Us;
function qs(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Us && !r.render) {
			let t = r.template || za(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = c(c({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = Us(t, s);
			}
		}
		e.render = r.render || i, Ws && Ws(e);
	}
	{
		let t = Is(e);
		Xe();
		try {
			Fa(e);
		} finally {
			Ze(), t();
		}
	}
}
var Js = { get(e, t) {
	return st(e, "get", ""), e[t];
} };
function Ys(e) {
	return {
		attrs: new Proxy(e.attrs, Js),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Xs(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(fn(en(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in ha) return ha[n](e);
		},
		has(e, t) {
			return t in e || t in ha;
		}
	}) : e.proxy;
}
function Zs(e, t = !0) {
	return _(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Qs(e) {
	return _(e) && "__vccOpts" in e;
}
var $s = (e, t) => /* @__PURE__ */ xn(e, t, zs);
function ec(e, t, n) {
	try {
		ls(-1);
		let r = arguments.length;
		return r === 2 ? b(t) && !f(t) ? ps(t) ? V(e, null, [t]) : V(e, t) : V(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ps(n) && (n = [n]), V(e, t, n));
	} finally {
		ls(1);
	}
}
function tc() {}
function nc(e, t, n, r) {
	let i = n[r];
	if (i && rc(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function rc(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (j(n[e], t[e])) return !1;
	return cs > 0 && as && as.push(e), !0;
}
var ic = "3.5.40", ac = i, oc = In, sc = rr, cc = ar, lc = {
	createComponentInstance: Ms,
	setupComponent: Bs,
	renderComponentRoot: ao,
	setCurrentRenderingInstance: sr,
	isVNode: ps,
	normalizeVNode: Ts,
	getComponentPublicInstance: Xs,
	ensureValidVNode: fa,
	pushWarningContext: Mn,
	popWarningContext: Nn
}, uc = void 0, dc = typeof window < "u" && window.trustedTypes;
if (dc) try {
	uc = /* @__PURE__ */ dc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var fc = uc ? (e) => uc.createHTML(e) : (e) => e, pc = "http://www.w3.org/2000/svg", mc = "http://www.w3.org/1998/Math/MathML", hc = typeof document < "u" ? document : null, gc = hc && /* @__PURE__ */ hc.createElement("template"), _c = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? hc.createElementNS(pc, e) : t === "mathml" ? hc.createElementNS(mc, e) : n ? hc.createElement(e, { is: n }) : hc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => hc.createTextNode(e),
	createComment: (e) => hc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => hc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			gc.innerHTML = fc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = gc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, vc = "transition", yc = "animation", bc = /* @__PURE__ */ Symbol("_vtc"), xc = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Sc = /* @__PURE__ */ c({}, Wr, xc), Cc = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Sc, e))((e, { slots: t }) => ec(Jr, Ec(e), t)), wc = (e, t = []) => {
	f(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Tc = (e) => e ? f(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Ec(e) {
	let t = {};
	for (let n in e) n in xc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = s, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Dc(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Ac(e, t ? d : s), Ac(e, t ? u : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, Ac(e, f), Ac(e, m), Ac(e, p), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		wc(i, [t, o]), jc(() => {
			Ac(t, e ? l : a), kc(t, e ? d : s), Tc(i) || Nc(t, r, g, o);
		});
	};
	return c(t, {
		onBeforeEnter(e) {
			wc(v, [e]), kc(e, a), kc(e, o);
		},
		onBeforeAppear(e) {
			wc(C, [e]), kc(e, l), kc(e, u);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			kc(e, f), e._enterCancelled ? (kc(e, p), Lc(e)) : (Lc(e), kc(e, p)), jc(() => {
				e._isLeaving && (Ac(e, f), kc(e, m), Tc(x) || Nc(e, r, _, n));
			}), wc(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), wc(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), wc(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), wc(S, [e]);
		}
	});
}
function Dc(e) {
	if (e == null) return null;
	if (b(e)) return [Oc(e.enter), Oc(e.leave)];
	{
		let t = Oc(e);
		return [t, t];
	}
}
function Oc(e) {
	return se(e);
}
function kc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[bc] || (e[bc] = /* @__PURE__ */ new Set())).add(t);
}
function Ac(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[bc];
	n && (n.delete(t), n.size || (e[bc] = void 0));
}
function jc(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Mc = 0;
function Nc(e, t, n, r) {
	let i = e._endId = ++Mc, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Pc(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Pc(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${vc}Delay`), a = r(`${vc}Duration`), o = Fc(i, a), s = r(`${yc}Delay`), c = r(`${yc}Duration`), l = Fc(s, c), u = null, d = 0, f = 0;
	t === vc ? o > 0 && (u = vc, d = o, f = a.length) : t === yc ? l > 0 && (u = yc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? vc : yc : null, f = u ? u === vc ? a.length : c.length : 0);
	let p = u === vc && /\b(?:transform|all)(?:,|$)/.test(r(`${vc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Fc(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Ic(t) + Ic(e[n])));
}
function Ic(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Lc(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Rc(e, t, n) {
	let r = e[bc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var zc = /* @__PURE__ */ Symbol("_vod"), Bc = /* @__PURE__ */ Symbol("_vsh"), Vc = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[zc] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Hc(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Hc(e, !0), r.enter(e)) : r.leave(e, () => {
			Hc(e, !1);
		}) : Hc(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Hc(e, t);
	}
};
function Hc(e, t) {
	e.style.display = t ? e[zc] : "none", e[Bc] = !t;
}
function Uc() {
	Vc.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var Wc = /* @__PURE__ */ Symbol("");
function Gc(e) {
	let t = Ns();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => qc(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? qc(t.ce, r) : Kc(t.subTree, r), n(r);
	};
	qi(() => {
		Qn(r);
	}), Ki(() => {
		Sr(r, i, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), Xi(() => e.disconnect());
	});
}
function Kc(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			Kc(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) qc(e.el, t);
	else if (e.type === z) e.children.forEach((e) => Kc(e, t));
	else if (e.type === rs) {
		let { el: n, anchor: r } = e;
		for (; n && (qc(n, t), n !== r);) n = n.nextSibling;
	}
}
function qc(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = De(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[Wc] = r;
	}
}
var Jc = /(?:^|;)\s*display\s*:/;
function Yc(e, t, n) {
	let r = e.style, i = v(n), a = !1;
	if (n && !i) {
		if (t) if (v(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Zc(r, t, "");
		}
		else for (let e in t) n[e] ?? Zc(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Zc(r, i, "") : tl(e, i, !v(t) && t ? t[i] : void 0, o) || Zc(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Wc];
			e && (n += ";" + e), r.cssText = n, a = Jc.test(n);
		}
	} else t && e.removeAttribute("style");
	zc in e && (e[zc] = a ? r.display : "", e[Bc] && (r.display = "none"));
}
var Xc = /\s*!important$/;
function Zc(e, t, n) {
	if (f(n)) n.forEach((n) => Zc(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = el(e, t);
		Xc.test(n) ? e.setProperty(A(r), n.replace(Xc, ""), "important") : e[r] = n;
	}
}
var Qc = [
	"Webkit",
	"Moz",
	"ms"
], $c = {};
function el(e, t) {
	let n = $c[t];
	if (n) return n;
	let r = k(t);
	if (r !== "filter" && r in e) return $c[t] = r;
	r = ne(r);
	for (let n = 0; n < Qc.length; n++) {
		let i = Qc[n] + r;
		if (i in e) return $c[t] = i;
	}
	return t;
}
function tl(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && v(r) && n === r;
}
var nl = "http://www.w3.org/1999/xlink";
function rl(e, t, n, r, i, a = ye(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(nl, t.slice(6, t.length)) : e.setAttributeNS(nl, t, n) : n == null || a && !be(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : y(n) ? String(n) : n);
}
function il(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? fc(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = be(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function al(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ol(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var sl = /* @__PURE__ */ Symbol("_vei");
function cl(e, t, n, r, i = null) {
	let a = e[sl] || (e[sl] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = dl(t);
		r ? al(e, n, a[t] = hl(r, i), s) : o && (ol(e, n, o, s), a[t] = void 0);
	}
}
var ll = /(Once|Passive|Capture)$/, ul = /^on:?(?:Once|Passive|Capture)$/;
function dl(e) {
	let t, n;
	for (; (n = e.match(ll)) && !ul.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : A(e.slice(2)), t];
}
var fl = 0, pl = /* @__PURE__ */ Promise.resolve(), ml = () => fl ||= (pl.then(() => fl = 0), Date.now());
function hl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (f(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Rn(e, t, 5, a);
			}
		} else Rn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ml(), n;
}
var gl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, _l = (e, t, n, r, i, a) => {
	let c = i === "svg";
	t === "class" ? Rc(e, r, c) : t === "style" ? Yc(e, n, r) : o(t) ? s(t) || cl(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vl(e, t, r, c)) ? (il(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && rl(e, t, r, c, a, t !== "value")) : e._isVueCE && (yl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !v(r))) ? il(e, k(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), rl(e, t, r, c));
};
function vl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && gl(t) && _(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return gl(t) && v(n) ? !1 : t in e;
}
function yl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = k(t);
	return Array.isArray(n) ? n.some((e) => k(e) === r) : Object.keys(n).some((e) => k(e) === r);
}
var bl = {};
// @__NO_SIDE_EFFECTS__
function xl(e, t, n) {
	let r = /* @__PURE__ */ ti(e, t);
	T(r) && (r = c({}, r, t));
	class i extends wl {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Sl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ xl(e, t, mu)), Cl = typeof HTMLElement < "u" ? HTMLElement : class {}, wl = class e extends Cl {
	constructor(e, t = {}, n = pu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== pu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(c({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			this._pendingResolve = void 0, this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, Jn(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !f(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = se(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[k(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._mount(e);
		}, t = this._def.__asyncLoader;
		t ? this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}) : e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) d(this, e) || Object.defineProperty(this, e, { get: () => ln(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = f(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(k)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : bl, r = k(e);
		t && this._numberProps && this._numberProps[r] && (n = se(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === bl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(A(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(A(e), t + "") : t || this.removeAttribute(A(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), du(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = V(this._def, c(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, T(t[0]) ? c({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), A(e) !== e && t(A(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
};
function Tl(e) {
	let t = Ns();
	return t && t.ce || null;
}
function El() {
	let e = Tl();
	return e && e.shadowRoot;
}
function Dl(e = "$style") {
	{
		let t = Ns();
		if (!t) return n;
		let r = t.type.__cssModules;
		return r && r[e] || n;
	}
}
var Ol = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ Symbol("_moveCb"), jl = /* @__PURE__ */ Symbol("_enterCb"), Ml = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ c({}, Sc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Ns(), r = Hr(), i, a;
		return Ji(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!Ll(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(Nl), i.forEach(Pl);
			let r = i.filter(Fl);
			Lc(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				kc(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Al] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Al] = null, Ac(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ F(e), s = Ec(o), c = o.tag || z;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[Bc] && (i.push(t), $r(t, Xr(t, s, r, n)), Ol.set(t, Il(t.el)));
			}
			a = t.default ? ei(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && $r(t, Xr(t, s, r, n));
			}
			return V(c, null, a);
		};
	}
});
function Nl(e) {
	let t = e.el;
	t[Al] && t[Al](), t[jl] && t[jl]();
}
function Pl(e) {
	kl.set(e, Il(e.el));
}
function Fl(e) {
	let t = Ol.get(e), n = kl.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function Il(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function Ll(e, t, n) {
	let r = e.cloneNode(), i = e[bc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = Pc(r);
	return a.removeChild(r), o;
}
var Rl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return f(t) ? (e) => ie(t, e) : t;
};
function zl(e) {
	e.target.composing = !0;
}
function Bl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Vl = /* @__PURE__ */ Symbol("_assign");
function Hl(e, t, n) {
	return t && (e = e.trim()), n && (e = oe(e)), e;
}
var Ul = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Vl] = Rl(i);
		let a = r || i.props && i.props.type === "number";
		al(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Vl](Hl(e.value, n, a));
		}), (n || a) && al(e, "change", () => {
			e.value = Hl(e.value, n, a);
		}), t || (al(e, "compositionstart", zl), al(e, "compositionend", Bl), al(e, "change", Bl));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Vl] = Rl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? oe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Wl = {
	deep: !0,
	created(e, t, n) {
		e[Vl] = Rl(n), al(e, "change", () => {
			let t = e._modelValue, n = Yl(e), r = e.checked, i = e[Vl];
			if (f(t)) {
				let e = Ce(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (m(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Xl(e, r));
		});
	},
	mounted: Gl,
	beforeUpdate(e, t, n) {
		e[Vl] = Rl(n), Gl(e, t, n);
	}
};
function Gl(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (f(t)) i = Ce(t, r.props.value) > -1;
	else if (m(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Se(t, Xl(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Kl = {
	created(e, { value: t }, n) {
		e.checked = Se(t, n.props.value), e[Vl] = Rl(n), al(e, "change", () => {
			e[Vl](Yl(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Vl] = Rl(r), t !== n && (e.checked = Se(t, r.props.value));
	}
}, ql = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, al(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(Yl(e)) : Yl(e));
			e[Vl](e.multiple ? m(e._modelValue) ? new Set(t) : t : t[0]), e._assigning = !0, Jn(() => {
				e._assigning = !1;
			});
		}), e[Vl] = Rl(r);
	},
	mounted(e, { value: t }) {
		Jl(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Vl] = Rl(n);
	},
	updated(e, { value: t }) {
		e._assigning || Jl(e, t);
	}
};
function Jl(e, t) {
	let n = e.multiple, r = f(t);
	if (!(n && !r && !m(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Yl(a);
			if (n) if (r) {
				let e = typeof o;
				a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Ce(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Se(Yl(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Yl(e) {
	return "_value" in e ? e._value : e.value;
}
function Xl(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Zl = {
	created(e, t, n) {
		$l(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		$l(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		$l(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		$l(e, t, n, r, "updated");
	}
};
function Ql(e, t) {
	switch (e) {
		case "SELECT": return ql;
		case "TEXTAREA": return Ul;
		default: switch (t) {
			case "checkbox": return Wl;
			case "radio": return Kl;
			default: return Ul;
		}
	}
}
function $l(e, t, n, r, i) {
	let a = Ql(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function eu() {
	Ul.getSSRProps = ({ value: e }) => ({ value: e }), Kl.getSSRProps = ({ value: e }, t) => {
		if (t.props && Se(t.props.value, e)) return { checked: !0 };
	}, Wl.getSSRProps = ({ value: e }, t) => {
		if (f(e)) {
			if (t.props && Ce(e, t.props.value) > -1) return { checked: !0 };
		} else if (m(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, Zl.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = Ql(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var tu = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], nu = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => tu.some((n) => e[`${n}Key`] && !t.includes(n))
}, ru = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = nu[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, iu = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, au = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = A(n.key);
		if (t.some((e) => e === r || iu[e] === r)) return e(n);
	}));
}, ou = /* @__PURE__ */ c({ patchProp: _l }, _c), su, cu = !1;
function lu() {
	return su ||= Mo(ou);
}
function uu() {
	return su = cu ? su : No(ou), cu = !0, su;
}
var du = ((...e) => {
	lu().render(...e);
}), fu = ((...e) => {
	uu().hydrate(...e);
}), pu = ((...e) => {
	let t = lu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = gu(e);
		if (!r) return;
		let i = t._component;
		!_(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, hu(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), mu = ((...e) => {
	let t = uu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = gu(e);
		if (t) return n(t, !0, hu(t));
	}, t;
});
function hu(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function gu(e) {
	return v(e) ? document.querySelector(e) : e;
}
var _u = !1, vu = () => {
	_u || (_u = !0, eu(), Uc());
}, yu = /* @__PURE__ */ e({
	BaseTransition: () => Jr,
	BaseTransitionPropsValidators: () => Wr,
	Comment: () => B,
	DeprecationTypes: () => null,
	EffectScope: () => Oe,
	ErrorCodes: () => Fn,
	ErrorTypeStrings: () => oc,
	Fragment: () => z,
	KeepAlive: () => Fi,
	ReactiveEffect: () => Ne,
	Static: () => rs,
	Suspense: () => Go,
	Teleport: () => Lr,
	Text: () => ns,
	TrackOpTypes: () => Sn,
	Transition: () => Cc,
	TransitionGroup: () => Ml,
	TriggerOpTypes: () => Cn,
	VueElement: () => wl,
	assertNumber: () => Pn,
	callWithAsyncErrorHandling: () => Rn,
	callWithErrorHandling: () => Ln,
	camelize: () => k,
	capitalize: () => ne,
	cloneVNode: () => xs,
	compatUtils: () => null,
	compile: () => bu,
	computed: () => $s,
	createApp: () => pu,
	createBlock: () => fs,
	createCommentVNode: () => ws,
	createElementBlock: () => ds,
	createElementVNode: () => vs,
	createHydrationRenderer: () => No,
	createPropsRestProxy: () => Ma,
	createRenderer: () => Mo,
	createSSRApp: () => mu,
	createSlots: () => ua,
	createStaticVNode: () => Cs,
	createTextVNode: () => Ss,
	createVNode: () => V,
	customRef: () => mn,
	defineAsyncComponent: () => Mi,
	defineComponent: () => ti,
	defineCustomElement: () => xl,
	defineEmits: () => ba,
	defineExpose: () => xa,
	defineModel: () => wa,
	defineOptions: () => Sa,
	defineProps: () => ya,
	defineSSRCustomElement: () => Sl,
	defineSlots: () => Ca,
	devtools: () => sc,
	effect: () => Ke,
	effectScope: () => ke,
	getCurrentInstance: () => Ns,
	getCurrentScope: () => Ae,
	getCurrentWatcher: () => Dn,
	getTransitionRawChildren: () => ei,
	guardReactiveProps: () => bs,
	h: () => ec,
	handleError: () => zn,
	hasInjectionContext: () => gr,
	hydrate: () => fu,
	hydrateOnIdle: () => Ti,
	hydrateOnInteraction: () => ki,
	hydrateOnMediaQuery: () => Oi,
	hydrateOnVisible: () => Di,
	initCustomFormatter: () => tc,
	initDirectivesForSSR: () => vu,
	inject: () => hr,
	isMemoSame: () => rc,
	isProxy: () => $t,
	isReactive: () => Xt,
	isReadonly: () => Zt,
	isRef: () => I,
	isRuntimeOnly: () => Ks,
	isShallow: () => Qt,
	isVNode: () => ps,
	markRaw: () => en,
	mergeDefaults: () => Aa,
	mergeModels: () => ja,
	mergeProps: () => Os,
	nextTick: () => Jn,
	nodeOps: () => _c,
	normalizeClass: () => ge,
	normalizeProps: () => _e,
	normalizeStyle: () => de,
	onActivated: () => Li,
	onBeforeMount: () => Gi,
	onBeforeUnmount: () => Yi,
	onBeforeUpdate: () => qi,
	onDeactivated: () => Ri,
	onErrorCaptured: () => ea,
	onMounted: () => Ki,
	onRenderTracked: () => $i,
	onRenderTriggered: () => Qi,
	onScopeDispose: () => je,
	onServerPrefetch: () => Zi,
	onUnmounted: () => Xi,
	onUpdated: () => Ji,
	onWatcherCleanup: () => On,
	openBlock: () => os,
	patchProp: () => _l,
	popScopeId: () => lr,
	provide: () => mr,
	proxyRefs: () => fn,
	pushScopeId: () => cr,
	queuePostFlushCb: () => Qn,
	reactive: () => Gt,
	readonly: () => qt,
	ref: () => rn,
	registerRuntimeCompiler: () => Gs,
	render: () => du,
	renderList: () => la,
	renderSlot: () => da,
	resolveComponent: () => ra,
	resolveDirective: () => oa,
	resolveDynamicComponent: () => aa,
	resolveFilter: () => null,
	resolveTransitionHooks: () => Xr,
	setBlockTracking: () => ls,
	setDevtoolsHook: () => cc,
	setTransitionHooks: () => $r,
	shallowReactive: () => Kt,
	shallowReadonly: () => Jt,
	shallowRef: () => an,
	ssrContextKey: () => _r,
	ssrUtils: () => lc,
	stop: () => qe,
	toDisplayString: () => M,
	toHandlerKey: () => re,
	toHandlers: () => pa,
	toRaw: () => F,
	toRef: () => vn,
	toRefs: () => hn,
	toValue: () => un,
	transformVNodeArgs: () => hs,
	triggerRef: () => cn,
	unref: () => ln,
	useAttrs: () => Da,
	useCssModule: () => Dl,
	useCssVars: () => Gc,
	useHost: () => Tl,
	useId: () => ni,
	useModel: () => $a,
	useSSRContext: () => vr,
	useShadowRoot: () => El,
	useSlots: () => Ea,
	useTemplateRef: () => ii,
	useTransitionState: () => Hr,
	vModelCheckbox: () => Wl,
	vModelDynamic: () => Zl,
	vModelRadio: () => Kl,
	vModelSelect: () => ql,
	vModelText: () => Ul,
	vShow: () => Vc,
	version: () => ic,
	warn: () => ac,
	watch: () => Sr,
	watchEffect: () => yr,
	watchPostEffect: () => br,
	watchSyncEffect: () => xr,
	withAsyncContext: () => Na,
	withCtx: () => dr,
	withDefaults: () => Ta,
	withDirectives: () => fr,
	withKeys: () => au,
	withMemo: () => nc,
	withModifiers: () => ru,
	withScopeId: () => ur
}), bu = () => {}, xu = typeof window < "u", Su = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Cu = (e, t, n) => wu({
	l: e,
	k: t,
	s: n
}), wu = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), U = (e) => typeof e == "number" && isFinite(e), Tu = (e) => Fu(e) === "[object Date]", Eu = (e) => Fu(e) === "[object RegExp]", Du = (e) => Z(e) && Object.keys(e).length === 0, W = Object.assign, Ou = Object.create, G = (e = null) => Ou(e), ku, Au = () => ku ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : G(), ju = Object.prototype.hasOwnProperty;
function Mu(e, t) {
	return ju.call(e, t);
}
var K = Array.isArray, q = (e) => typeof e == "function", J = (e) => typeof e == "string", Y = (e) => typeof e == "boolean", X = (e) => typeof e == "object" && !!e, Nu = (e) => X(e) && q(e.then) && q(e.catch), Pu = Object.prototype.toString, Fu = (e) => Pu.call(e), Z = (e) => Fu(e) === "[object Object]", Iu = (e) => e == null ? "" : K(e) || Z(e) && e.toString === Pu ? JSON.stringify(e, null, 2) : String(e);
function Lu(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
function Ru(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
function zu(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Bu(e) {
	return e.replace(/&(?![a-z0-9#]{2,6};)/gi, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Vu = /^javascript:/i, Hu = /^(?:href|src|action|formaction)$/i, Uu = /&#(?:x([0-9a-f]+)|(\d+));?/gi, Wu = /&(?:Tab|NewLine);/g, Gu = /&colon;?/gi, Ku = /[\u0000-\u0020\u007f-\u009f]/g, qu = /(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i, Ju = /(^|[\s"'<>/])on(\w+\s*=)/gi, Yu = /(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;
function Xu(e, t, n) {
	let r = t || n;
	if (!r) return e;
	let i = Number.parseInt(r, t ? 16 : 10);
	return i <= 127 ? String.fromCharCode(i) : e;
}
function Zu(e) {
	let t = e.replace(Uu, Xu).replace(Wu, "").replace(Gu, ":").replace(Ku, "");
	return Vu.test(t);
}
function Qu(e) {
	let t = /url\s*\(/gi, n = "", r = 0, i;
	for (; (i = t.exec(e)) !== null;) {
		let a = i.index, o = t.lastIndex - 1, s = o + 1, c = 1, l = null;
		for (; s < e.length; s++) {
			let t = e[s];
			if (l) {
				t === l && (l = null);
				continue;
			}
			if (t === "\"" || t === "'") l = t;
			else if (t === "(") c++;
			else if (t === ")" && (c--, c === 0)) break;
		}
		if (c !== 0) break;
		let u = e.slice(o + 1, s).trim(), d = u.startsWith("\"") && u.endsWith("\"") || u.startsWith("'") && u.endsWith("'") ? u.slice(1, -1).trim() : u;
		n += e.slice(r, a), n += Zu(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function $u(e, t) {
	return Hu.test(e) && Zu(t) ? "about:blank" : Bu(e.toLowerCase() === "style" ? Qu(t) : t);
}
function ed(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${$u(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${$u(t, n)}'`), qu.test(e) && (e = e.replace(Ju, "$1&#111;n$2")), e = e.replace(Yu, (e, t, n, r) => Zu(r) ? `${t}${n}about:blank` : e), e;
}
var td = (e) => !X(e) || K(e);
function nd(e, t) {
	if (td(e) || td(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (X(e[r]) && !X(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : G()), td(t[r]) || td(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+message-compiler@11.4.8/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function rd(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function id(e, t, n) {
	let r = {
		start: e,
		end: t
	};
	return n != null && (r.source = n), r;
}
var Q = {
	EXPECTED_TOKEN: 1,
	INVALID_TOKEN_IN_PLACEHOLDER: 2,
	UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
	UNKNOWN_ESCAPE_SEQUENCE: 4,
	INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
	UNBALANCED_CLOSING_BRACE: 6,
	UNTERMINATED_CLOSING_BRACE: 7,
	EMPTY_PLACEHOLDER: 8,
	NOT_ALLOW_NEST_PLACEHOLDER: 9,
	INVALID_LINKED_FORMAT: 10,
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14,
	UNHANDLED_CODEGEN_NODE_TYPE: 15,
	UNHANDLED_MINIFIER_NODE_TYPE: 16
};
Q.EXPECTED_TOKEN, Q.INVALID_TOKEN_IN_PLACEHOLDER, Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, Q.UNKNOWN_ESCAPE_SEQUENCE, Q.INVALID_UNICODE_ESCAPE_SEQUENCE, Q.UNBALANCED_CLOSING_BRACE, Q.UNTERMINATED_CLOSING_BRACE, Q.EMPTY_PLACEHOLDER, Q.NOT_ALLOW_NEST_PLACEHOLDER, Q.INVALID_LINKED_FORMAT, Q.MUST_HAVE_MESSAGES_IN_PLURAL, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, Q.UNEXPECTED_EMPTY_LINKED_KEY, Q.UNEXPECTED_LEXICAL_ANALYSIS, Q.UNHANDLED_CODEGEN_NODE_TYPE, Q.UNHANDLED_MINIFIER_NODE_TYPE;
function ad(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = SyntaxError(String(e));
	return o.code = e, t && (o.location = t), o.domain = r, o;
}
function od(e) {
	throw e;
}
var sd = " ", cd = "\r", ld = "\n", ud = "\u2028", dd = "\u2029";
function fd(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === cd && t[e + 1] === ld, s = (e) => t[e] === ld, c = (e) => t[e] === dd, l = (e) => t[e] === ud, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? ld : t[e], g = () => h(n), _ = () => h(n + a);
	function v() {
		return a = 0, u(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n];
	}
	function y() {
		return o(n + a) && a++, a++, t[n + a];
	}
	function b() {
		n = 0, r = 1, i = 1, a = 0;
	}
	function x(e = 0) {
		a = e;
	}
	function S() {
		let e = n + a;
		for (; e !== n;) v();
		a = 0;
	}
	return {
		index: d,
		line: f,
		column: p,
		peekOffset: m,
		charAt: h,
		currentChar: g,
		currentPeek: _,
		next: v,
		peek: y,
		reset: b,
		resetPeek: x,
		skipToPeek: S
	};
}
var pd = void 0, md = "'", hd = "tokenizer";
function gd(e, t = {}) {
	let n = t.location !== !1, r = fd(e), i = () => r.index(), a = () => rd(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
		currentType: 13,
		offset: s,
		startLoc: o,
		endLoc: o,
		lastType: 13,
		lastOffset: s,
		lastStartLoc: o,
		lastEndLoc: o,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, l = () => c, { onError: u } = t;
	function d(e, t, r, ...i) {
		let a = l();
		if (t.column += r, t.offset += r, u) {
			let r = ad(e, n ? id(a.startLoc, t) : null, {
				domain: hd,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = id(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(Q.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === sd || e.currentPeek() === ld;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === pd) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === pd) return !1;
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function y(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function b(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = v(e.currentPeek() === "-" ? e.peek() : e.currentPeek());
		return e.resetPeek(), r;
	}
	function x(e, t) {
		let { currentType: n } = t;
		if (n !== 2) return !1;
		h(e);
		let r = e.currentPeek() === md;
		return e.resetPeek(), r;
	}
	function S(e, t) {
		let { currentType: n } = t;
		if (n !== 7) return !1;
		h(e);
		let r = e.currentPeek() === ".";
		return e.resetPeek(), r;
	}
	function C(e, t) {
		let { currentType: n } = t;
		if (n !== 8) return !1;
		h(e);
		let r = _(e.currentPeek());
		return e.resetPeek(), r;
	}
	function w(e, t) {
		let { currentType: n } = t;
		if (n !== 7 && n !== 11) return !1;
		h(e);
		let r = e.currentPeek() === ":";
		return e.resetPeek(), r;
	}
	function T(e, t) {
		let { currentType: n } = t;
		if (n !== 9) return !1;
		let r = () => {
			let t = e.currentPeek();
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === sd || !t ? !1 : t === ld ? (e.peek(), r()) : D(e, !1);
		}, i = r();
		return e.resetPeek(), i;
	}
	function E(e) {
		h(e);
		let t = e.currentPeek() === "|";
		return e.resetPeek(), t;
	}
	function D(e, t = !0) {
		let n = (t = !1, r = "") => {
			let i = e.currentPeek();
			return i === "{" || i === "@" || !i ? t : i === "|" ? r !== sd && r !== ld : i === sd ? (e.peek(), n(!0, sd)) : i !== ld || (e.peek(), n(!0, ld));
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function O(e, t) {
		let n = e.currentChar();
		if (n !== pd) return t(n) ? (e.next(), n) : null;
	}
	function ee(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function k(e) {
		return O(e, ee);
	}
	function te(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function A(e) {
		return O(e, te);
	}
	function ne(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function re(e) {
		return O(e, ne);
	}
	function j(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function ie(e) {
		return O(e, j);
	}
	function ae(e) {
		let t = "", n = "";
		for (; t = re(e);) n += t;
		return n;
	}
	function oe(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "\\") {
				let r = e.peek();
				r === "{" || r === "}" || r === "@" || r === "|" || r === "\\" ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
			} else if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			else if (n === sd || n === ld) if (D(e)) t += n, e.next();
			else if (E(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function se(e) {
		g(e);
		let t = "", n = "";
		for (; t = A(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== pd && r !== sd && r !== ld && r !== "　") {
			let t = me(e);
			return d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === pd && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function ce(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${ae(e)}`) : t += ae(e), e.currentChar() === pd && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function le(e) {
		return e !== md && e !== ld;
	}
	function ue(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = O(e, le);) n += t === "\\" ? de(e) : t;
		let r = e.currentChar();
		return r === ld || r === pd ? (d(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === ld && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function de(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return fe(e, t, 4);
			case "U": return fe(e, t, 6);
			default: return d(Q.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function fe(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = ie(e);
			if (!n) {
				d(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function pe(e) {
		return e !== "{" && e !== "}" && e !== sd && e !== ld;
	}
	function me(e) {
		g(e);
		let t = "", n = "";
		for (; t = O(e, pe);) n += t;
		return n;
	}
	function he(e) {
		let t = "", n = "";
		for (; t = k(e);) n += t;
		return n;
	}
	function ge(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === sd ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function _e(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function ve(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(Q.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(Q.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = ye(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (E(e)) return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, be(e, t);
				if (r = y(e, t)) return n = f(t, 4, se(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, ce(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, ue(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, me(e)), d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function ye(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === ld || i === sd) && d(Q.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return E(e) ? (r = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), ye(e, t)) : C(e, t) ? (g(e), f(t, 11, he(e))) : T(e, t) ? (g(e), i === "{" ? ve(e, t) || r : f(t, 10, ge(e))) : (n === 7 && d(Q.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, be(e, t));
		}
	}
	function be(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return ve(e, t) || p(t);
		if (t.inLinked) return ye(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return ve(e, t) || p(t);
			case "}": return d(Q.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return ye(e, t) || p(t);
			default:
				if (E(e)) return n = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (D(e)) return f(t, 0, oe(e));
		}
		return n;
	}
	function xe() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === pd ? f(c, 13) : be(r, c);
	}
	return {
		nextToken: xe,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var _d = "parser", vd = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, yd = /\\([\\@{}|])/g;
function bd(e, t) {
	return t;
}
function xd(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function Sd(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = ad(r, t ? id(i, s) : null, {
				domain: _d,
				args: o
			});
			n(e);
		}
	}
	function i(e, n, r) {
		let i = { type: e };
		return t && (i.start = n, i.end = n, i.loc = {
			start: r,
			end: r
		}), i;
	}
	function a(e, n, r, i) {
		t && (e.end = n, e.loc && (e.loc.end = r));
	}
	function o(e, t) {
		let n = e.context(), r = i(3, n.offset, n.startLoc);
		return r.value = t.replace(yd, bd), a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function s(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(5, n, r);
		return o.index = parseInt(t, 10), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function c(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(4, n, r);
		return o.key = t, e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function l(e, t) {
		let { lastOffset: n, lastStartLoc: r } = e.context(), o = i(9, n, r);
		return o.value = t.replace(vd, xd), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, Cd(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
			nextConsumeToken: t,
			node: c
		});
	}
	function d(e, t) {
		let n = e.context(), r = i(7, n.offset, n.startLoc);
		return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r;
	}
	function f(e) {
		let t = e.context(), n = i(6, t.offset, t.startLoc), o = e.nextToken();
		if (o.type === 8) {
			let t = u(e);
			n.modifier = t.node, o = t.nextConsumeToken || e.nextToken();
		}
		switch (o.type !== 9 && r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(o)), n.key = l(e, o.value || "");
				break;
			default: {
				r(e, Q.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
				let s = e.context(), c = i(7, s.offset, s.startLoc);
				return c.value = "", a(c, s.offset, s.startLoc), n.key = c, a(n, s.offset, s.startLoc), {
					nextConsumeToken: o,
					node: n
				};
			}
		}
		return a(n, e.currentOffset(), e.currentPosition()), { node: n };
	}
	function p(e) {
		let t = e.context(), n = i(2, t.currentType === 1 ? e.currentOffset() : t.offset, t.currentType === 1 ? t.endLoc : t.startLoc);
		n.items = [];
		let u = null;
		do {
			let i = u || e.nextToken();
			switch (u = null, i.type) {
				case 0:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Cd(i)), n.items.push(l(e, i.value || ""));
					break;
				case 7: {
					let t = f(e);
					n.items.push(t.node), u = t.nextConsumeToken || null;
					break;
				}
			}
		} while (t.currentType !== 13 && t.currentType !== 1);
		return a(n, t.currentType === 1 ? t.lastOffset : e.currentOffset(), t.currentType === 1 ? t.lastEndLoc : e.currentPosition()), n;
	}
	function m(e, t, n, o) {
		let s = e.context(), c = o.items.length === 0, l = i(1, t, n);
		l.cases = [], l.cases.push(o);
		do {
			let t = p(e);
			c ||= t.items.length === 0, l.cases.push(t);
		} while (s.currentType !== 13);
		return c && r(e, Q.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), a(l, e.currentOffset(), e.currentPosition()), l;
	}
	function h(e) {
		let t = e.context(), { offset: n, startLoc: r } = t, i = p(e);
		return t.currentType === 13 ? i : m(e, n, r, i);
	}
	function g(n) {
		let o = gd(n, W({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Q.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function Cd(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function wd(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function Td(e, t) {
	for (let n = 0; n < e.length; n++) Ed(e[n], t);
}
function Ed(e, t) {
	switch (e.type) {
		case 1:
			Td(e.cases, t), t.helper("plural");
			break;
		case 2:
			Td(e.items, t);
			break;
		case 6:
			Ed(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4: t.helper("interpolate"), t.helper("named");
	}
}
function Dd(e, t = {}) {
	let n = wd(e);
	n.helper("normalize"), e.body && Ed(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function Od(e) {
	let t = e.body;
	return t.type === 2 ? kd(t) : t.cases.forEach((e) => kd(e)), e;
}
function kd(e) {
	if (e.items.length === 1) {
		let t = e.items[0];
		(t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
	} else {
		let t = [];
		for (let n = 0; n < e.items.length; n++) {
			let r = e.items[n];
			if (r.type !== 3 && r.type !== 9 || r.value == null) break;
			t.push(r.value);
		}
		if (t.length === e.items.length) {
			e.static = Lu(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
function Ad(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			Ad(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) Ad(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) Ad(n[e]);
			t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			let t = e;
			t.value && (t.v = t.value, delete t.value);
			break;
		}
		case 6: {
			let t = e;
			Ad(t.key), t.k = t.key, delete t.key, t.modifier && (Ad(t.modifier), t.m = t.modifier, delete t.modifier);
			break;
		}
		case 5: {
			let t = e;
			t.i = t.index, delete t.index;
			break;
		}
		case 4: {
			let t = e;
			t.k = t.key, delete t.key;
			break;
		}
	}
	delete e.type;
}
function jd(e, t) {
	let { filename: n, breakLineCode: r, needIndent: i } = t, a = t.location !== !1, o = {
		filename: n,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode: r,
		needIndent: i,
		indentLevel: 0
	};
	a && e.loc && (o.source = e.loc.source);
	let s = () => o;
	function c(e, t) {
		o.code += e;
	}
	function l(e, t = !0) {
		let n = t ? r : "";
		c(i ? n + "  ".repeat(e) : n);
	}
	function u(e = !0) {
		let t = ++o.indentLevel;
		e && l(t);
	}
	function d(e = !0) {
		let t = --o.indentLevel;
		e && l(t);
	}
	function f() {
		l(o.indentLevel);
	}
	return {
		context: s,
		push: c,
		indent: u,
		deindent: d,
		newline: f,
		helper: (e) => `_${e}`,
		needIndent: () => o.needIndent
	};
}
function Md(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), Id(e, t.key), t.modifier ? (e.push(", "), Id(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Nd(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (Id(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function Pd(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (Id(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function Fd(e, t) {
	t.body ? Id(e, t.body) : e.push("null");
}
function Id(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			Fd(e, t);
			break;
		case 1:
			Pd(e, t);
			break;
		case 2:
			Nd(e, t);
			break;
		case 6:
			Md(e, t);
			break;
		case 8:
			e.push(JSON.stringify(t.value), t);
			break;
		case 7:
			e.push(JSON.stringify(t.value), t);
			break;
		case 5:
			e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
			break;
		case 4:
			e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
			break;
		case 9:
			e.push(JSON.stringify(t.value), t);
			break;
		case 3: e.push(JSON.stringify(t.value), t);
	}
}
var Ld = (e, t = {}) => {
	let n = J(t.mode) ? t.mode : "normal", r = J(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = jd(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${Lu(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), Id(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function Rd(e, t = {}) {
	let n = W({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = Sd(n).parse(e);
	return r ? (a && Od(o), i && Ad(o), {
		ast: o,
		code: ""
	}) : (Dd(o, n), Ld(o, n));
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+core-base@11.4.8/node_modules/@intlify/core-base/dist/core-base.mjs
function zd() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Au().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Au().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Bd(e) {
	return X(e) && Xd(e) === 0 && (Mu(e, "b") || Mu(e, "body"));
}
var Vd = ["b", "body"];
function Hd(e) {
	return rf(e, Vd);
}
var Ud = ["c", "cases"];
function Wd(e) {
	return rf(e, Ud, []);
}
var Gd = ["s", "static"];
function Kd(e) {
	return rf(e, Gd);
}
var qd = ["i", "items"];
function Jd(e) {
	return rf(e, qd, []);
}
var Yd = ["t", "type"];
function Xd(e) {
	return rf(e, Yd);
}
var Zd = ["v", "value"];
function Qd(e, t) {
	let n = rf(e, Zd);
	if (n != null) return n;
	throw of(t);
}
var $d = ["m", "modifier"];
function ef(e) {
	return rf(e, $d);
}
var tf = ["k", "key"];
function nf(e) {
	let t = rf(e, tf);
	if (t) return t;
	throw of(6);
}
function rf(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Mu(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var af = [
	...Vd,
	...Ud,
	...Gd,
	...qd,
	...tf,
	...$d,
	...Zd,
	...Yd
];
function of(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function sf(e) {
	return (t) => cf(t, e);
}
function cf(e, t) {
	let n = Hd(t);
	if (n == null) throw of(0);
	if (Xd(n) === 1) {
		let t = Wd(n);
		return e.plural(t.reduce((t, n) => [...t, lf(e, n)], []));
	}
	return lf(e, n);
}
function lf(e, t) {
	let n = Kd(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = Jd(t).reduce((t, n) => [...t, uf(e, n)], []);
		return e.normalize(n);
	}
}
function uf(e, t) {
	let n = Xd(t);
	switch (n) {
		case 3: return Qd(t, n);
		case 9: return Qd(t, n);
		case 4: {
			let r = t;
			if (Mu(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (Mu(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw of(n);
		}
		case 5: {
			let r = t;
			if (Mu(r, "i") && U(r.i)) return e.interpolate(e.list(r.i));
			if (Mu(r, "index") && U(r.index)) return e.interpolate(e.list(r.index));
			throw of(n);
		}
		case 6: {
			let n = t, r = ef(n), i = nf(n);
			return e.linked(uf(e, i), r ? uf(e, r) : void 0, e.type);
		}
		case 7: return Qd(t, n);
		case 8: return Qd(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var df = (e) => e, ff = G();
function pf(e, t = {}) {
	let n = !1, r = t.onError || od;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...Rd(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function mf(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && J(e)) {
		Y(t.warnHtmlMessage) && t.warnHtmlMessage;
		let n = (t.onCacheKey || df)(e), r = ff[n];
		if (r) return r;
		let { ast: i, detectError: a } = pf(e, {
			...t,
			location: !1,
			jit: !0
		}), o = sf(i);
		return a ? o : ff[n] = o;
	}
	{
		let t = e.cacheKey;
		return t ? ff[t] || (ff[t] = sf(e)) : sf(e);
	}
}
var hf = null;
function gf(e) {
	hf = e;
}
function _f(e, t, n) {
	hf && hf.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var vf = /* #__PURE__*/ yf("function:translate");
function yf(e) {
	return (t) => hf && hf.emit(e, t);
}
var bf = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function xf(e) {
	return ad(e, null, void 0);
}
bf.INVALID_ARGUMENT, bf.INVALID_DATE_ARGUMENT, bf.INVALID_ISO_DATE_ARGUMENT, bf.NOT_SUPPORT_NON_STRING_MESSAGE, bf.NOT_SUPPORT_LOCALE_PROMISE_VALUE, bf.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, bf.NOT_SUPPORT_LOCALE_TYPE;
function Sf(e, t) {
	return t.locale == null ? wf(e.locale) : wf(t.locale);
}
var Cf;
function wf(e) {
	if (J(e)) return e;
	if (q(e)) {
		if (e.resolvedOnce && Cf != null) return Cf;
		if (e.constructor.name === "Function") {
			let t = e();
			if (Nu(t)) throw xf(bf.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return Cf = t;
		}
		throw xf(bf.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	}
	throw xf(bf.NOT_SUPPORT_LOCALE_TYPE);
}
function Tf(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...K(t) ? t : X(t) ? Object.keys(t) : J(t) ? [t] : [n]])];
}
function Ef(e, t, n) {
	let r = J(n) ? n : Hf, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; K(e);) e = Df(a, e, t);
		let o = K(t) || !Z(t) ? t : t.default ? t.default : null;
		e = J(o) ? [o] : o, K(e) && Df(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function Df(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && Y(r); i++) {
		let a = t[i];
		J(a) && (r = Of(e, t[i], n));
	}
	return r;
}
function Of(e, t, n) {
	let r, i = t.split("-");
	do
		r = kf(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function kf(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (K(n) || Z(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var Af = [];
Af[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, Af[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, Af[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, Af[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, Af[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, Af[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, Af[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var jf = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Mf(e) {
	return jf.test(e);
}
function Nf(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Pf(e) {
	if (e == null) return "o";
	switch (e.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return e;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
function Ff(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Mf(t) ? Nf(t) : "*" + t;
}
function If(e) {
	let t = [], n = -1, r = 0, i = 0, a, o, s, c, l, u, d, f = [];
	f[0] = () => {
		o === void 0 ? o = s : o += s;
	}, f[1] = () => {
		o !== void 0 && (t.push(o), o = void 0);
	}, f[2] = () => {
		f[0](), i++;
	}, f[3] = () => {
		if (i > 0) i--, r = 4, f[0]();
		else {
			if (i = 0, o === void 0 || (o = Ff(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = Pf(a), d = Af[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var Lf = /* @__PURE__ */ new Map();
function Rf(e, t) {
	return X(e) ? e[t] : null;
}
function zf(e, t) {
	if (!X(e)) return null;
	let n = Lf.get(t);
	if (n || (n = If(t), n && Lf.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (af.includes(e) && Bd(i) || !X(i) || !Mu(i, e)) return null;
		let t = i[e];
		if (t === void 0 || q(i)) return null;
		i = t, a++;
	}
	return i;
}
var Bf = {
	NOT_FOUND_KEY: 1,
	FALLBACK_TO_TRANSLATE: 2,
	CANNOT_FORMAT_NUMBER: 3,
	FALLBACK_TO_NUMBER_FORMAT: 4,
	CANNOT_FORMAT_DATE: 5,
	FALLBACK_TO_DATE_FORMAT: 6,
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
	INVALID_NUMBER_ARGUMENT: 8,
	INVALID_DATE_ARGUMENT: 9
};
Bf.NOT_FOUND_KEY, Bf.FALLBACK_TO_TRANSLATE, Bf.CANNOT_FORMAT_NUMBER, Bf.FALLBACK_TO_NUMBER_FORMAT, Bf.CANNOT_FORMAT_DATE, Bf.FALLBACK_TO_DATE_FORMAT, Bf.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, Bf.INVALID_NUMBER_ARGUMENT, Bf.INVALID_DATE_ARGUMENT;
var Vf = "11.4.8", Hf = "en-US", Uf = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Wf() {
	return {
		upper: (e, t) => t === "text" && J(e) ? e.toUpperCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && J(e) ? e.toLowerCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && J(e) ? Uf(e) : t === "vnode" && X(e) && "__v_isVNode" in e ? Uf(e.children) : e
	};
}
var Gf;
function Kf(e) {
	Gf = e;
}
var qf;
function Jf(e) {
	qf = e;
}
var Yf;
function Xf(e) {
	Yf = e;
}
var Zf = null, Qf = /* @__NO_SIDE_EFFECTS__ */ () => Zf, $f = null, ep = (e) => {
	$f = e;
}, tp = () => $f, np = 0;
function rp(e = {}) {
	let t = q(e.onWarn) ? e.onWarn : Ru, n = J(e.version) ? e.version : Vf, r = J(e.locale) || q(e.locale) ? e.locale : Hf, i = q(r) ? Hf : r, a = K(e.fallbackLocale) || Z(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = Z(e.messages) ? e.messages : ip(i), s = Z(e.datetimeFormats) ? e.datetimeFormats : ip(i), c = Z(e.numberFormats) ? e.numberFormats : ip(i), l = W(G(), e.modifiers, Wf()), u = e.pluralRules || G(), d = q(e.missing) ? e.missing : null, f = Y(e.missingWarn) || Eu(e.missingWarn) ? e.missingWarn : !0, p = Y(e.fallbackWarn) || Eu(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = q(e.postTranslation) ? e.postTranslation : null, _ = Z(e.processor) ? e.processor : null, v = !Y(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = q(e.messageCompiler) ? e.messageCompiler : Gf, x = q(e.messageResolver) ? e.messageResolver : qf || Rf, S = q(e.localeFallbacker) ? e.localeFallbacker : Yf || Tf, C = X(e.fallbackContext) ? e.fallbackContext : void 0, w = e, T = X(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), E = X(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), D = X(w.__meta) ? w.__meta : {};
	np++;
	let O = {
		version: n,
		cid: np,
		locale: r,
		fallbackLocale: a,
		messages: o,
		modifiers: l,
		pluralRules: u,
		missing: d,
		missingWarn: f,
		fallbackWarn: p,
		fallbackFormat: m,
		unresolving: h,
		postTranslation: g,
		processor: _,
		warnHtmlMessage: v,
		escapeParameter: y,
		messageCompiler: b,
		messageResolver: x,
		localeFallbacker: S,
		fallbackContext: C,
		onWarn: t,
		__meta: D
	};
	return O.datetimeFormats = s, O.numberFormats = c, O.__datetimeFormatters = T, O.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && _f(O, n, D), O;
}
var ip = (e) => ({ [e]: G() });
function ap(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (a !== null) {
		let r = a(e, n, t, i);
		return J(r) ? r : t;
	}
	return t;
}
function op(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function sp(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function cp(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (sp(e, t[r])) return !0;
	return !1;
}
function lp(e, t, n, r, i, a, o) {
	let { fallbackLocale: s, localeFallbacker: c, onWarn: l } = e, u = c(e, s, n);
	for (let n = 0; n < u.length; n++) {
		let a = u[n], s = (r[a] || {})[t];
		if (Z(s) && J(a)) return a;
		ap(e, t, a, i, o);
	}
	return null;
}
function up(e, t, n) {
	let r = `${e}__${t}`;
	return Z(n) && !Du(n) && (r = `${r}__${JSON.stringify(n)}`), r;
}
function dp(e, t, n) {
	for (let r in n) {
		let n = `${t}__${r}`;
		for (let t of e.keys()) (t === n || t.startsWith(`${n}__`)) && e.delete(t);
	}
}
function fp(e, t, n, r) {
	let [, i, a, o] = e, s = n;
	return J(i) ? t.key = i : Z(i) && Object.keys(i).forEach((e) => {
		r.includes(e) ? s[e] = i[e] : t[e] = i[e];
	}), J(a) ? t.locale = a : Z(a) && (s = a), Z(o) && (s = o), s;
}
var pp = typeof Intl < "u";
pp && Intl.DateTimeFormat, pp && Intl.NumberFormat;
function mp(e, ...t) {
	let { datetimeFormats: n, unresolving: r, onWarn: i } = e, { __datetimeFormatters: a } = e;
	if (!J(t[0]) && !Tu(t[0]) && !U(t[0])) return "";
	let [o, s, c, l] = gp(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Sf(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.DateTimeFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = lp(e, o, p, n, u, d, "datetime format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = up(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.DateTimeFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var hp = [
	"localeMatcher",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"formatMatcher",
	"hour12",
	"timeZone",
	"dateStyle",
	"timeStyle",
	"calendar",
	"dayPeriod",
	"numberingSystem",
	"hourCycle",
	"fractionalSecondDigits"
];
function gp(...e) {
	let [t] = e, n = G(), r = G(), i;
	if (J(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw xf(bf.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		i = new Date(n);
		try {
			i.toISOString();
		} catch {
			throw xf(bf.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (Tu(t)) {
		if (isNaN(t.getTime())) throw xf(bf.INVALID_DATE_ARGUMENT);
		i = t;
	} else if (U(t)) i = t;
	else throw xf(bf.INVALID_ARGUMENT);
	let a = fp(e, n, r, hp);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function _p(e, t, n) {
	dp(e.__datetimeFormatters, t, n);
}
function vp(e, ...t) {
	let { numberFormats: n, unresolving: r, onWarn: i } = e, { __numberFormatters: a } = e;
	if (!U(t[0])) return "";
	let [o, s, c, l] = bp(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Sf(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.NumberFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = lp(e, o, p, n, u, d, "number format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = up(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.NumberFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var yp = [
	"localeMatcher",
	"style",
	"currency",
	"currencyDisplay",
	"currencySign",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"roundingMode",
	"roundingPriority",
	"roundingIncrement",
	"trailingZeroDisplay"
];
function bp(...e) {
	let [t] = e, n = G(), r = G();
	if (!U(t)) throw xf(bf.INVALID_ARGUMENT);
	let i = t, a = fp(e, n, r, yp);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function xp(e, t, n) {
	dp(e.__numberFormatters, t, n);
}
var Sp = (e) => e, Cp = (e) => "", wp = "text", Tp = (e) => e.length === 0 ? "" : Lu(e), Ep = Iu;
function Dp(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function Op(e) {
	let t = U(e.pluralIndex) ? e.pluralIndex : -1;
	return U(e.named?.count) ? e.named.count : U(e.named?.n) ? e.named.n : t;
}
function kp(e = {}) {
	let t = e.locale, n = Op(e), r = J(t) && q(e.pluralRules?.[t]) ? e.pluralRules[t] : Dp, i = r === Dp ? void 0 : Dp, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || G();
	U(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (q(e.messages) ? e.messages(t, !!n) : X(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : Cp);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : Sp, f = q(e.processor?.normalize) ? e.processor.normalize : Tp, p = q(e.processor?.interpolate) ? e.processor.interpolate : Ep, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? X(n) ? (a = n.modifier || a, i = n.type || i) : J(n) && (a = n || a) : t.length === 2 && (J(n) && (a = n || a), J(r) && (i = r || i));
			let o = u(e, !0)(m), s = o === "" || o === void 0 ? e : o, c = i === "vnode" && K(s) && a ? s[0] : s;
			return a ? d(a)(c, i) : c;
		},
		message: u,
		type: J(e.processor?.type) ? e.processor.type : wp,
		interpolate: p,
		normalize: f,
		values: W(G(), o, c)
	};
	return m;
}
var Ap = () => "", jp = (e) => q(e);
function Mp(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = Lp(...t), u = Y(l.missingWarn) ? l.missingWarn : e.missingWarn, d = Y(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = Y(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = J(l.default) || Y(l.default) ? Y(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (J(m) || q(m)), g = Sf(e, l);
	f && Np(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || G()
	] : Pp(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(J(b) || Bd(b) || jp(b)) && h && (b = m, x = b), !p && (!(J(b) || Bd(b) || jp(b)) || !J(v))) return i ? -1 : c;
	let S = !1, C = jp(b) ? b : Fp(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = Ip(e, C, kp(zp(e, v, y, l))), T = r ? r(w, c) : w;
	if (f && J(T) && (T = ed(T)), __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: J(c) ? c : jp(b) ? b.key : "",
			locale: v || (jp(b) ? b.locale : ""),
			format: J(b) ? b : jp(b) ? b.source : "",
			message: T
		};
		t.meta = W({}, e.__meta, /* @__PURE__ */ Qf() || {}), vf(t);
	}
	return T;
}
function Np(e) {
	K(e.list) ? e.list = e.list.map((e) => J(e) ? zu(e) : e) : X(e.named) && Object.keys(e.named).forEach((t) => {
		J(e.named[t]) && (e.named[t] = zu(e.named[t]));
	});
}
function Pp(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = G(), f, p = null;
	for (let n = 0; n < u.length && (f = u[n], d = o[f] || G(), (p = c(d, t)) === null && (p = d[t]), !(J(p) || Bd(p) || jp(p))); n++) if (!cp(f, u)) {
		let n = ap(e, t, f, a, "translate");
		n !== t && (p = n);
	}
	return [
		p,
		f,
		d
	];
}
function Fp(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (jp(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = o(r, Rp(e, n, i, r, s, a));
	return c.locale = n, c.key = t, c.source = r, c;
}
function Ip(e, t, n) {
	return t(n);
}
function Lp(...e) {
	let [t, n, r] = e, i = G();
	if (!J(t) && !U(t) && !jp(t) && !Bd(t)) throw xf(bf.INVALID_ARGUMENT);
	let a = U(t) ? String(t) : (jp(t), t);
	return U(n) ? i.plural = n : J(n) ? i.default = n : Z(n) && !Du(n) ? i.named = n : K(n) && (i.list = n), U(r) ? i.plural = r : J(r) ? i.default = r : Z(r) && W(i, r), [a, i];
}
function Rp(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (e) => {
			throw a && a(e), e;
		},
		onCacheKey: (e) => Cu(t, n, e)
	};
}
function zp(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = Pp(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (J(a) || Bd(a)) {
				let n = !1, i = Fp(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? Ap : i;
			}
			return jp(a) ? a : Ap;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), U(r.plural) && (d.pluralIndex = r.plural), d;
}
zd();
//#endregion
//#region ../../node_modules/.pnpm/vue-i18n@11.4.8_vue@3.5.40_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var Bp = "11.4.8";
function Vp() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Au().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Au().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Au().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Au().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var $ = {
	UNEXPECTED_RETURN_TYPE: 24,
	INVALID_ARGUMENT: 25,
	MUST_BE_CALL_SETUP_TOP: 26,
	NOT_INSTALLED: 27,
	REQUIRED_VALUE: 28,
	INVALID_VALUE: 29,
	CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
	NOT_INSTALLED_WITH_PROVIDE: 31,
	UNEXPECTED_ERROR: 32,
	NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function Hp(e, ...t) {
	return ad(e, null, void 0);
}
$.UNEXPECTED_RETURN_TYPE, $.INVALID_ARGUMENT, $.MUST_BE_CALL_SETUP_TOP, $.NOT_INSTALLED, $.UNEXPECTED_ERROR, $.REQUIRED_VALUE, $.INVALID_VALUE, $.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, $.NOT_INSTALLED_WITH_PROVIDE, $.NOT_COMPATIBLE_LEGACY_VUE_I18N, $.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
var Up = /* #__PURE__*/ Su("__translateVNode"), Wp = /* #__PURE__*/ Su("__datetimeParts"), Gp = /* #__PURE__*/ Su("__numberParts"), Kp = Su("__setPluralRules");
Su("__intlifyMeta");
var qp = /* #__PURE__*/ Su("__injectWithOption"), Jp = /* #__PURE__*/ Su("__dispose"), Yp = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
};
Yp.FALLBACK_TO_ROOT, Yp.NOT_FOUND_PARENT_SCOPE, Yp.IGNORE_OBJ_FLATTEN, Yp.DEPRECATE_LEGACY_MODE, Yp.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, Yp.DUPLICATE_USE_I18N_CALLING;
function Xp(e) {
	if (!X(e) || Bd(e)) return e;
	for (let t in e) if (Mu(e, t)) if (!t.includes(".")) X(e[t]) && Xp(e[t]);
	else {
		let n = t.split("."), r = n.length - 1, i = e, a = !1;
		for (let e = 0; e < r; e++) {
			if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
			if (n[e] in i || (i[n[e]] = G()), !X(i[n[e]])) {
				a = !0;
				break;
			}
			i = i[n[e]];
		}
		if (a || (Bd(i) ? af.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Bd(i)) {
			let e = i[n[r]];
			X(e) && Xp(e);
		}
	}
	return e;
}
function Zp(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = Z(n) ? n : K(r) ? G() : { [e]: G() };
	if (K(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || G(), nd(n, o[t])) : nd(n, o);
		} else J(e) && nd(JSON.parse(e), o);
	}), i == null && a) for (let e in o) Mu(o, e) && Xp(o[e]);
	return o;
}
function Qp(e) {
	return e.type;
}
function $p(e, t, n) {
	let r = X(t.messages) ? t.messages : G();
	"__i18nGlobal" in n && (r = Zp(e.locale.value, {
		messages: r,
		__i18n: n.__i18nGlobal
	}));
	let i = Object.keys(r);
	if (i.length && i.forEach((t) => {
		e.mergeLocaleMessage(t, r[t]);
	}), X(t.datetimeFormats)) {
		let n = Object.keys(t.datetimeFormats);
		n.length && n.forEach((n) => {
			e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
		});
	}
	if (X(t.numberFormats)) {
		let n = Object.keys(t.numberFormats);
		n.length && n.forEach((n) => {
			e.mergeNumberFormat(n, t.numberFormats[n]);
		});
	}
}
function em(e) {
	return V(ns, null, e, 0);
}
function tm() {
	let e = "currentInstance";
	return e in yu ? yu[e] : Ns();
}
var nm = () => [], rm = () => !1, im = 0;
function am(e) {
	return ((t, n, r, i) => e(n, r, tm() || void 0, i));
}
function om(e = {}) {
	let { __root: t, __injectWithOption: n } = e, r = t === void 0, i = e.flatJson, a = xu ? rn : an, o = !Y(e.inheritLocale) || e.inheritLocale, s = a(t && o ? t.locale.value : J(e.locale) ? e.locale : Hf), c = a(t && o ? t.fallbackLocale.value : J(e.fallbackLocale) || K(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value), l = a(Zp(s.value, e)), u = a(Z(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }), d = a(Z(e.numberFormats) ? e.numberFormats : { [s.value]: {} }), f = t ? t.missingWarn : Y(e.missingWarn) || Eu(e.missingWarn) ? e.missingWarn : !0, p = t ? t.fallbackWarn : Y(e.fallbackWarn) || Eu(e.fallbackWarn) ? e.fallbackWarn : !0, m = t ? t.fallbackRoot : !Y(e.fallbackRoot) || e.fallbackRoot, h = !!e.fallbackFormat, g = q(e.missing) ? e.missing : null, _ = q(e.missing) ? am(e.missing) : null, v = q(e.postTranslation) ? e.postTranslation : null, y = t ? t.warnHtmlMessage : !Y(e.warnHtmlMessage) || e.warnHtmlMessage, b = !!e.escapeParameter, x = t ? t.modifiers : Z(e.modifiers) ? e.modifiers : {}, S = e.pluralRules || t && t.pluralRules, C;
	C = (() => {
		r && ep(null);
		let t = {
			version: Bp,
			locale: s.value,
			fallbackLocale: c.value,
			messages: l.value,
			modifiers: x,
			pluralRules: S,
			missing: _ === null ? void 0 : _,
			missingWarn: f,
			fallbackWarn: p,
			fallbackFormat: h,
			unresolving: !0,
			postTranslation: v === null ? void 0 : v,
			warnHtmlMessage: y,
			escapeParameter: b,
			messageResolver: e.messageResolver,
			messageCompiler: e.messageCompiler,
			__meta: { framework: "vue" }
		};
		t.datetimeFormats = u.value, t.numberFormats = d.value, t.__datetimeFormatters = Z(C) ? C.__datetimeFormatters : void 0, t.__numberFormatters = Z(C) ? C.__numberFormatters : void 0;
		let n = rp(t);
		return r && ep(n), n;
	})(), op(C, s.value, c.value);
	function w() {
		return [
			s.value,
			c.value,
			l.value,
			u.value,
			d.value
		];
	}
	let T = $s({
		get: () => s.value,
		set: (e) => {
			C.locale = e, s.value = e;
		}
	}), E = $s({
		get: () => c.value,
		set: (e) => {
			C.fallbackLocale = e, c.value = e, op(C, s.value, e);
		}
	}), D = $s(() => l.value), O = /* #__PURE__*/ $s(() => u.value), ee = /* #__PURE__*/ $s(() => d.value);
	function k() {
		return q(v) ? v : null;
	}
	function te(e) {
		v = e, C.postTranslation = e;
	}
	function A() {
		return g;
	}
	function ne(e) {
		e !== null && (_ = am(e)), g = e, C.missing = _;
	}
	let re = (e, n, i, a, o, s) => {
		w();
		let c;
		try {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = t ? tp() : void 0), c = e(C);
		} finally {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = void 0);
		}
		if (i !== "translate exists" && U(c) && c === -1 || i === "translate exists" && !c) {
			let [e, r] = n();
			return t && m ? a(t) : o(e);
		}
		if (s(c)) return c;
		/* istanbul ignore next */
		throw Hp($.UNEXPECTED_RETURN_TYPE);
	};
	function j(...e) {
		return re((t) => Reflect.apply(Mp, null, [t, ...e]), () => Lp(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => J(e));
	}
	function ie(...e) {
		let [t, n, r] = e;
		if (r && !X(r)) throw Hp($.INVALID_ARGUMENT);
		return j(t, n, W({ resolvedMessage: !0 }, r || {}));
	}
	function ae(...e) {
		return re((t) => Reflect.apply(mp, null, [t, ...e]), () => gp(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => J(e) || K(e));
	}
	function oe(...e) {
		return re((t) => Reflect.apply(vp, null, [t, ...e]), () => bp(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => J(e) || K(e));
	}
	function se(e) {
		return e.map((e) => J(e) || U(e) || Y(e) ? em(String(e)) : e);
	}
	let ce = {
		normalize: se,
		interpolate: (e) => e,
		type: "vnode"
	};
	function le(...e) {
		return re((t) => {
			let n, r = t;
			try {
				r.processor = ce, n = Reflect.apply(Mp, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => Lp(...e), "translate", (t) => t[Up](...e), (e) => [em(e)], (e) => K(e));
	}
	function ue(...e) {
		return re((t) => Reflect.apply(vp, null, [t, ...e]), () => bp(...e), "number format", (t) => t[Gp](...e), nm, (e) => J(e) || K(e));
	}
	function de(...e) {
		return re((t) => Reflect.apply(mp, null, [t, ...e]), () => gp(...e), "datetime format", (t) => t[Wp](...e), nm, (e) => J(e) || K(e));
	}
	function fe(e) {
		S = e, C.pluralRules = S;
	}
	function pe(e, t) {
		return re(() => {
			if (!e) return !1;
			let n = J(t) ? t : s.value, r = J(t) ? [n] : Ef(C, c.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = ge(r[t]), i = C.messageResolver(n, e);
				if (i === null && (i = n[e]), Bd(i) || jp(i) || J(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), rm, (e) => Y(e));
	}
	function me(e) {
		let t = null, n = Ef(C, c.value, s.value);
		for (let r = 0; r < n.length; r++) {
			let i = l.value[n[r]] || {}, a = C.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function he(e) {
		return me(e) ?? (t && t.tm(e) || {});
	}
	function ge(e) {
		return l.value[e] || {};
	}
	function _e(e, t) {
		if (i) {
			let n = { [e]: t };
			for (let e in n) Mu(n, e) && Xp(n[e]);
			t = n[e];
		}
		l.value[e] = t, C.messages = l.value;
	}
	function ve(e, t) {
		l.value[e] = l.value[e] || {};
		let n = { [e]: t };
		if (i) for (let e in n) Mu(n, e) && Xp(n[e]);
		t = n[e], nd(t, l.value[e]), C.messages = l.value;
	}
	function ye(e) {
		return u.value[e] || {};
	}
	function be(e, t) {
		u.value[e] = t, C.datetimeFormats = u.value, _p(C, e, t);
	}
	function xe(e, t) {
		u.value[e] = W(u.value[e] || {}, t), C.datetimeFormats = u.value, _p(C, e, t);
	}
	function Se(e) {
		return d.value[e] || {};
	}
	function Ce(e, t) {
		d.value[e] = t, C.numberFormats = d.value, xp(C, e, t);
	}
	function we(e, t) {
		d.value[e] = W(d.value[e] || {}, t), C.numberFormats = d.value, xp(C, e, t);
	}
	im++, t && xu && (Sr(t.locale, (e) => {
		o && (s.value = e, C.locale = e, op(C, s.value, c.value));
	}), Sr(t.fallbackLocale, (e) => {
		o && (c.value = e, C.fallbackLocale = e, op(C, s.value, c.value));
	}));
	let M = {
		id: im,
		locale: T,
		fallbackLocale: E,
		get inheritLocale() {
			return o;
		},
		set inheritLocale(e) {
			o = e, e && t && (s.value = t.locale.value, c.value = t.fallbackLocale.value, op(C, s.value, c.value));
		},
		get availableLocales() {
			return Object.keys(l.value).sort();
		},
		messages: D,
		get modifiers() {
			return x;
		},
		get pluralRules() {
			return S || {};
		},
		get isGlobal() {
			return r;
		},
		get missingWarn() {
			return f;
		},
		set missingWarn(e) {
			f = e, C.missingWarn = f;
		},
		get fallbackWarn() {
			return p;
		},
		set fallbackWarn(e) {
			p = e, C.fallbackWarn = p;
		},
		get fallbackRoot() {
			return m;
		},
		set fallbackRoot(e) {
			m = e;
		},
		get fallbackFormat() {
			return h;
		},
		set fallbackFormat(e) {
			h = e, C.fallbackFormat = h;
		},
		get warnHtmlMessage() {
			return y;
		},
		set warnHtmlMessage(e) {
			y = e, C.warnHtmlMessage = e;
		},
		get escapeParameter() {
			return b;
		},
		set escapeParameter(e) {
			b = e, C.escapeParameter = e;
		},
		t: j,
		getLocaleMessage: ge,
		setLocaleMessage: _e,
		mergeLocaleMessage: ve,
		getPostTranslationHandler: k,
		setPostTranslationHandler: te,
		getMissingHandler: A,
		setMissingHandler: ne,
		[Kp]: fe
	};
	return M.datetimeFormats = O, M.numberFormats = ee, M.rt = ie, M.te = pe, M.tm = he, M.d = ae, M.n = oe, M.getDateTimeFormat = ye, M.setDateTimeFormat = be, M.mergeDateTimeFormat = xe, M.getNumberFormat = Se, M.setNumberFormat = Ce, M.mergeNumberFormat = we, M[qp] = n, M[Up] = le, M[Wp] = de, M[Gp] = ue, M;
}
function sm(e) {
	let t = J(e.locale) ? e.locale : Hf, n = J(e.fallbackLocale) || K(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = q(e.missing) ? e.missing : void 0, i = Y(e.silentTranslationWarn) || Eu(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = Y(e.silentFallbackWarn) || Eu(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, o = !Y(e.fallbackRoot) || e.fallbackRoot, s = !!e.formatFallbackMessages, c = Z(e.modifiers) ? e.modifiers : {}, l = e.pluralizationRules, u = q(e.postTranslation) ? e.postTranslation : void 0, d = !J(e.warnHtmlInMessage) || e.warnHtmlInMessage !== "off", f = !!e.escapeParameterHtml, p = !Y(e.sync) || e.sync, m = e.messages;
	if (Z(e.sharedMessages)) {
		let t = e.sharedMessages;
		m = Object.keys(t).reduce((e, n) => (W(e[n] || (e[n] = {}), t[n]), e), m || {});
	}
	let { __i18n: h, __root: g, __injectWithOption: _ } = e, v = e.datetimeFormats, y = e.numberFormats, b = e.flatJson;
	return {
		locale: t,
		fallbackLocale: n,
		messages: m,
		flatJson: b,
		datetimeFormats: v,
		numberFormats: y,
		missing: r,
		missingWarn: i,
		fallbackWarn: a,
		fallbackRoot: o,
		fallbackFormat: s,
		modifiers: c,
		pluralRules: l,
		postTranslation: u,
		warnHtmlMessage: d,
		escapeParameter: f,
		messageResolver: e.messageResolver,
		inheritLocale: p,
		__i18n: h,
		__root: g,
		__injectWithOption: _
	};
}
function cm(e = {}) {
	let t = om(sm(e)), { __extender: n } = e, r = {
		id: t.id,
		get locale() {
			return t.locale.value;
		},
		set locale(e) {
			t.locale.value = e;
		},
		get fallbackLocale() {
			return t.fallbackLocale.value;
		},
		set fallbackLocale(e) {
			t.fallbackLocale.value = e;
		},
		get messages() {
			return t.messages.value;
		},
		get datetimeFormats() {
			return t.datetimeFormats.value;
		},
		get numberFormats() {
			return t.numberFormats.value;
		},
		get availableLocales() {
			return t.availableLocales;
		},
		get missing() {
			return t.getMissingHandler();
		},
		set missing(e) {
			t.setMissingHandler(e);
		},
		get silentTranslationWarn() {
			return Y(t.missingWarn) ? !t.missingWarn : t.missingWarn;
		},
		set silentTranslationWarn(e) {
			t.missingWarn = Y(e) ? !e : e;
		},
		get silentFallbackWarn() {
			return Y(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn;
		},
		set silentFallbackWarn(e) {
			t.fallbackWarn = Y(e) ? !e : e;
		},
		get modifiers() {
			return t.modifiers;
		},
		get formatFallbackMessages() {
			return t.fallbackFormat;
		},
		set formatFallbackMessages(e) {
			t.fallbackFormat = e;
		},
		get postTranslation() {
			return t.getPostTranslationHandler();
		},
		set postTranslation(e) {
			t.setPostTranslationHandler(e);
		},
		get sync() {
			return t.inheritLocale;
		},
		set sync(e) {
			t.inheritLocale = e;
		},
		get warnHtmlInMessage() {
			return t.warnHtmlMessage ? "warn" : "off";
		},
		set warnHtmlInMessage(e) {
			t.warnHtmlMessage = e !== "off";
		},
		get escapeParameterHtml() {
			return t.escapeParameter;
		},
		set escapeParameterHtml(e) {
			t.escapeParameter = e;
		},
		get pluralizationRules() {
			return t.pluralRules || {};
		},
		__composer: t,
		t(...e) {
			return Reflect.apply(t.t, t, [...e]);
		},
		rt(...e) {
			return Reflect.apply(t.rt, t, [...e]);
		},
		te(e, n) {
			return t.te(e, n);
		},
		tm(e) {
			return t.tm(e);
		},
		getLocaleMessage(e) {
			return t.getLocaleMessage(e);
		},
		setLocaleMessage(e, n) {
			t.setLocaleMessage(e, n);
		},
		mergeLocaleMessage(e, n) {
			t.mergeLocaleMessage(e, n);
		},
		d(...e) {
			return Reflect.apply(t.d, t, [...e]);
		},
		getDateTimeFormat(e) {
			return t.getDateTimeFormat(e);
		},
		setDateTimeFormat(e, n) {
			t.setDateTimeFormat(e, n);
		},
		mergeDateTimeFormat(e, n) {
			t.mergeDateTimeFormat(e, n);
		},
		n(...e) {
			return Reflect.apply(t.n, t, [...e]);
		},
		getNumberFormat(e) {
			return t.getNumberFormat(e);
		},
		setNumberFormat(e, n) {
			t.setNumberFormat(e, n);
		},
		mergeNumberFormat(e, n) {
			t.mergeNumberFormat(e, n);
		}
	};
	return r.__extender = n, r;
}
function lm(e, t, n) {
	return {
		beforeCreate() {
			let r = tm();
			/* istanbul ignore if */
			if (!r) throw Hp($.UNEXPECTED_ERROR);
			let i = this.$options;
			if (i.i18n) {
				let r = i.i18n;
				if (i.__i18n && (r.__i18n = i.__i18n), r.__root = t, this === this.$root) this.$i18n = um(e, r);
				else {
					r.__injectWithOption = !0, r.__extender = n.__vueI18nExtend, this.$i18n = cm(r);
					let e = this.$i18n;
					e.__extender && (e.__disposer = e.__extender(this.$i18n));
				}
			} else if (i.__i18n) if (this === this.$root) this.$i18n = um(e, i);
			else {
				this.$i18n = cm({
					__i18n: i.__i18n,
					__injectWithOption: !0,
					__extender: n.__vueI18nExtend,
					__root: t
				});
				let e = this.$i18n;
				e.__extender && (e.__disposer = e.__extender(this.$i18n));
			}
			else this.$i18n = e;
			i.__i18nGlobal && $p(t, i, i), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = (e) => this.$i18n.tm(e), n.__setInstance(r, this.$i18n);
		},
		mounted() {},
		unmounted() {
			let e = tm();
			/* istanbul ignore if */
			if (!e) throw Hp($.UNEXPECTED_ERROR);
			let t = this.$i18n;
			t && (delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, t?.__disposer && (t.__disposer(), delete t.__disposer, delete t.__extender), n.__deleteInstance(e), delete this.$i18n);
		}
	};
}
function um(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Kp](t.pluralizationRules || e.pluralizationRules);
	let n = Zp(e.locale, {
		messages: t.messages,
		__i18n: t.__i18n
	});
	return Object.keys(n).forEach((t) => e.mergeLocaleMessage(t, n[t])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n) => e.mergeDateTimeFormat(n, t.datetimeFormats[n])), t.numberFormats && Object.keys(t.numberFormats).forEach((n) => e.mergeNumberFormat(n, t.numberFormats[n])), e;
}
var dm = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function fm({ slots: e }, t) {
	return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((e, t) => [...e, ...t.type === z ? t.children : [t]], []) : t.reduce((t, n) => {
		let r = e[n];
		return r && (t[n] = r()), t;
	}, G());
}
function pm() {
	return z;
}
var mm = /* @__PURE__ */ ti({
	name: "i18n-t",
	props: W({
		keypath: {
			type: String,
			required: !0
		},
		plural: {
			type: [Number, String],
			validator: (e) => U(e) || !isNaN(e)
		}
	}, dm),
	setup(e, t) {
		let { slots: n, attrs: r } = t, i = e.i18n || Tm({
			useScope: e.scope,
			__useComponent: !0
		});
		return () => {
			let a = () => {
				let r = Object.keys(n).filter((e) => e[0] !== "_"), a = G();
				e.locale && (a.locale = e.locale), e.plural !== void 0 && (a.plural = J(e.plural) ? +e.plural : e.plural);
				let o = fm(t, r);
				return i[Up](e.keypath, o, a);
			}, o = W(G(), r), s = J(e.tag) || X(e.tag) ? e.tag : pm();
			return X(s) ? ec(s, o, { default: a }) : ec(s, o, a());
		};
	}
});
function hm(e) {
	return K(e) && !J(e[0]);
}
function gm(e, t, n, r) {
	let { slots: i, attrs: a } = t;
	return () => {
		let t = () => {
			let t = { part: !0 }, a = G();
			e.locale && (t.locale = e.locale), J(e.format) ? t.key = e.format : X(e.format) && (J(e.format.key) && (t.key = e.format.key), a = Object.keys(e.format).reduce((t, r) => n.includes(r) ? W(G(), t, { [r]: e.format[r] }) : t, G()));
			let o = r(e.value, t, a), s = [t.key];
			return K(o) ? s = o.map((e, t) => {
				let n = i[e.type], r = n ? n({
					[e.type]: e.value,
					index: t,
					parts: o
				}) : [e.value];
				return hm(r) && (r[0].key = `${e.type}-${t}`), r;
			}) : J(o) && (s = [o]), s;
		}, o = W(G(), a), s = J(e.tag) || X(e.tag) ? e.tag : pm();
		return X(s) ? ec(s, o, { default: t }) : ec(s, o, t());
	};
}
var _m = /* @__PURE__ */ ti({
	name: "i18n-n",
	props: W({
		value: {
			type: Number,
			required: !0
		},
		format: { type: [String, Object] }
	}, dm),
	setup(e, t) {
		let n = e.i18n || Tm({
			useScope: e.scope,
			__useComponent: !0
		});
		return gm(e, t, yp, (...e) => n[Gp](...e));
	}
});
function vm(e, t) {
	let n = e;
	if (e.mode === "composition") return n.__getInstance(t) || e.global;
	{
		let r = n.__getInstance(t);
		return r == null ? e.global.__composer : r.__composer;
	}
}
function ym(e) {
	let t = (t) => {
		let { instance: n, value: r } = t;
		/* istanbul ignore if */
		if (!n || !n.$) throw Hp($.UNEXPECTED_ERROR);
		let i = vm(e, n.$), a = bm(r);
		return [Reflect.apply(i.t, i, [...xm(a)]), i];
	};
	return {
		created: (e, n) => {
			let [r, i] = t(n);
			xu && (e.__i18nWatcher = Sr(i.locale, () => {
				n.instance && n.instance.$forceUpdate();
			})), e.__composer = i, e.textContent = r;
		},
		unmounted: (e) => {
			xu && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer);
		},
		beforeUpdate: (e, { value: t }) => {
			if (e.__composer) {
				let n = e.__composer, r = bm(t);
				e.textContent = Reflect.apply(n.t, n, [...xm(r)]);
			}
		},
		getSSRProps: (e) => {
			let [n] = t(e);
			return { textContent: n };
		}
	};
}
function bm(e) {
	if (J(e)) return { path: e };
	if (Z(e)) {
		if (!("path" in e)) throw Hp($.REQUIRED_VALUE, "path");
		return e;
	}
	throw Hp($.INVALID_VALUE);
}
function xm(e) {
	let { path: t, locale: n, args: r, choice: i, plural: a } = e, o = {}, s = r || {};
	return J(n) && (o.locale = n), U(i) && (o.plural = i), U(a) && (o.plural = a), [
		t,
		s,
		o
	];
}
function Sm(e, t, ...n) {
	let r = Z(n[0]) ? n[0] : {};
	(!Y(r.globalInstall) || r.globalInstall) && ([mm.name, "I18nT"].forEach((t) => e.component(t, mm)), [_m.name, "I18nN"].forEach((t) => e.component(t, _m)), [Im.name, "I18nD"].forEach((t) => e.component(t, Im))), e.directive("t", ym(t));
}
var Cm = /* #__PURE__*/ Su("global-vue-i18n");
function wm(e = {}) {
	let t = __VUE_I18N_LEGACY_API__ && Y(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = !Y(e.globalInjection) || e.globalInjection, r = /* @__PURE__ */ new Map(), [i, a] = Em(e, t), o = /* #__PURE__*/ Su("");
	function s(e) {
		return r.get(e) || null;
	}
	function c(e, t) {
		r.set(e, t);
	}
	function l(e) {
		r.delete(e);
	}
	let u = {
		get mode() {
			return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition";
		},
		async install(e, ...r) {
			if (e.__VUE_I18N_SYMBOL__ = o, e.provide(e.__VUE_I18N_SYMBOL__, u), Z(r[0])) {
				let e = r[0];
				u.__composerExtend = e.__composerExtend, u.__vueI18nExtend = e.__vueI18nExtend;
			}
			let i = null;
			!t && n && (i = Fm(e, u.global)), __VUE_I18N_FULL_INSTALL__ && Sm(e, u, ...r), __VUE_I18N_LEGACY_API__ && t && e.mixin(lm(a, a.__composer, u));
			let s = e.unmount;
			e.unmount = () => {
				i && i(), u.dispose(), s();
			};
		},
		get global() {
			return a;
		},
		dispose() {
			i.stop();
		},
		__instances: r,
		__getInstance: s,
		__setInstance: c,
		__deleteInstance: l
	};
	return u;
}
function Tm(e = {}) {
	let t = tm();
	if (t == null) throw Hp($.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw Hp($.NOT_INSTALLED);
	let n = Dm(t), r = km(n), i = Qp(t), a = Om(e, i);
	if (a === "global") return $p(r, e, i), r;
	if (a === "parent") {
		let i = Am(n, t, e.__useComponent);
		return i ??= r, i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw Hp($.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = W({}, e);
		a.__root = Am(n, t) || r;
		let o = om(a);
		return i.__composerExtend && (o[Jp] = i.__composerExtend(o)), Ae() && je(() => {
			let e = o[Jp];
			e && (e(), delete o[Jp]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = W({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = om(n), o.__composerExtend && (s[Jp] = o.__composerExtend(s)), Mm(o, t, s), o.__setInstance(t, s);
	}
	return s;
}
function Em(e, t) {
	let n = ke(), r = __VUE_I18N_LEGACY_API__ && t ? n.run(() => cm(e)) : n.run(() => om(e));
	if (r == null) throw Hp($.UNEXPECTED_ERROR);
	return [n, r];
}
function Dm(e) {
	let t = hr(e.isCE ? Cm : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw Hp(e.isCE ? $.NOT_INSTALLED_WITH_PROVIDE : $.UNEXPECTED_ERROR);
	return t;
}
function Om(e, t) {
	return Du(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function km(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function Am(e, t, n = !1) {
	let r = null, i = t.root, a = jm(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[qp] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function jm(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Mm(e, t, n) {
	Ki(() => {}, t), Xi(() => {
		let r = n;
		e.__deleteInstance(t);
		let i = r[Jp];
		i && (i(), delete r[Jp]);
	}, t);
}
var Nm = [
	"locale",
	"fallbackLocale",
	"availableLocales"
], Pm = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function Fm(e, t) {
	let n = Object.create(null);
	return Nm.forEach((e) => {
		let r = Object.getOwnPropertyDescriptor(t, e);
		if (!r) throw Hp($.UNEXPECTED_ERROR);
		let i = /* @__PURE__ */ I(r.value) ? {
			get() {
				return r.value.value;
			},
			set(e) {
				r.value.value = e;
			}
		} : { get() {
			return r.get && r.get();
		} };
		Object.defineProperty(n, e, i);
	}), e.config.globalProperties.$i18n = n, Pm.forEach((n) => {
		let r = Object.getOwnPropertyDescriptor(t, n);
		if (!r || !r.value) throw Hp($.UNEXPECTED_ERROR);
		Object.defineProperty(e.config.globalProperties, `$${n}`, r);
	}), () => {
		delete e.config.globalProperties.$i18n, Pm.forEach((t) => {
			delete e.config.globalProperties[`$${t}`];
		});
	};
}
var Im = /* @__PURE__ */ ti({
	name: "i18n-d",
	props: W({
		value: {
			type: [Number, Date],
			required: !0
		},
		format: { type: [String, Object] }
	}, dm),
	setup(e, t) {
		let n = e.i18n || Tm({
			useScope: e.scope,
			__useComponent: !0
		});
		return gm(e, t, hp, (...e) => n[Wp](...e));
	}
});
if (Vp(), Kf(mf), Jf(zf), Xf(Ef), __INTLIFY_PROD_DEVTOOLS__) {
	let e = Au();
	e.__INTLIFY__ = !0, gf(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
//#endregion
export { rn as $, Ki as A, Sr as B, bs as C, Os as D, Aa as E, la as F, nc as G, br as H, da as I, Ae as J, mn as K, aa as L, Ji as M, os as N, Jn as O, mr as P, Gt as Q, pa as R, Ns as S, hr as T, dr as U, yr as V, fr as W, en as X, I as Y, je as Z, ds as _, Ul as a, un as at, Mi as b, ru as c, k as ct, Lr as d, de as dt, Jt as et, xs as f, M as ft, ws as g, fs as h, pu as i, hn as it, Xi as j, Yi as k, B as l, ge as lt, vs as m, Tm as n, F as nt, Vc as o, cn as ot, $s as p, re as pt, ke as q, yu as r, vn as rt, au as s, ln as st, wm as t, an as tt, z as u, _e as ut, Ss as v, ec as w, ti as x, V as y, ni as z };
