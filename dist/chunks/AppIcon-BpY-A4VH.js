//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
//#endregion
//#region ../../node_modules/.pnpm/@vue+shared@3.5.40/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function n(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var r = {}, i = [], a = () => {}, o = () => !1, s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), c = (e) => e.startsWith("onUpdate:"), l = Object.assign, u = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, d = Object.prototype.hasOwnProperty, f = (e, t) => d.call(e, t), p = Array.isArray, m = (e) => w(e) === "[object Map]", h = (e) => w(e) === "[object Set]", g = (e) => w(e) === "[object Date]", _ = (e) => w(e) === "[object RegExp]", v = (e) => typeof e == "function", y = (e) => typeof e == "string", b = (e) => typeof e == "symbol", x = (e) => typeof e == "object" && !!e, S = (e) => (x(e) || v(e)) && v(e.then) && v(e.catch), C = Object.prototype.toString, w = (e) => C.call(e), ee = (e) => w(e).slice(8, -1), T = (e) => w(e) === "[object Object]", E = (e) => y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, D = /* @__PURE__ */ n(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, O = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, k = te((e) => e.replace(re, "-$1").toLowerCase()), ie = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), A = te((e) => e ? `on${ie(e)}` : ""), j = (e, t) => !Object.is(e, t), ae = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, oe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, se = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce = (e) => {
	let t = y(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, le, ue = () => le ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, de = /* @__PURE__ */ n("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function M(e) {
	if (p(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = y(r) ? he(r) : M(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (y(e) || x(e)) return e;
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
	if (y(e)) t = e;
	else if (p(e)) for (let n = 0; n < e.length; n++) {
		let r = ge(e[n]);
		r && (t += r + " ");
	}
	else if (x(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function _e(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !y(t) && (e.class = ge(t)), n && (e.style = M(n)), e;
}
var ve = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ye = /* @__PURE__ */ n(ve);
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
	let n = g(e), r = g(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = b(e), r = b(t), n || r) return e === t;
	if (n = p(e), r = p(t), n || r) return n && r ? xe(e, t) : !1;
	if (n = x(e), r = x(t), n || r) {
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
var N = (e) => !!(e && e.__v_isRef === !0), we = (e) => y(e) ? e : e == null ? "" : p(e) || x(e) && (e.toString === C || !v(e.toString)) ? N(e) ? we(e.value) : JSON.stringify(e, Te, 2) : String(e), Te = (e, t) => N(t) ? Te(e, t.value) : m(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ee(t, r) + " =>"] = n, e), {}) } : h(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ee(e)) } : b(t) ? Ee(t) : x(t) && !p(t) && !T(t) ? String(t) : t, Ee = (e, t = "") => b(e) ? `Symbol(${e.description ?? t})` : e;
function De(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+reactivity@3.5.40/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var P, Oe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && P && (P.active ? (this.parent = P, this.index = (P.scopes || (P.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = P;
			try {
				return P = this, e();
			} finally {
				P = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = P, P = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (P === this) P = this.prevScope;
			else {
				let e = P;
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
	return P;
}
function je(e, t = !1) {
	P && P.cleanups.push(e);
}
var F, Me = /* @__PURE__ */ new WeakSet(), Ne = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, P && (P.active ? P.effects.push(this) : this.flags &= -2);
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
		let e = F, t = Je;
		F = this, Je = !0;
		try {
			return this.fn();
		} finally {
			Ve(this), F = e, Je = t, this.flags &= -3;
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
	let t = e.dep, n = F, r = Je;
	F = e, Je = !0;
	try {
		Be(e);
		let n = e.fn(e._value);
		(t.version === 0 || j(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		F = n, Je = r, Ve(e), e.flags &= -3;
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
	t && l(n, t);
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
		let e = F;
		F = void 0;
		try {
			t();
		} finally {
			F = e;
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
		if (!F || !Je || F === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== F) t = this.activeLink = new et(F, this), F.deps ? (t.prevDep = F.depsTail, F.depsTail.nextDep = t, F.depsTail = t) : F.deps = F.depsTail = t, nt(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = F.depsTail, t.nextDep = void 0, F.depsTail.nextDep = t, F.depsTail = t, F.deps === t && (F.deps = e);
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
	if (Je && F) {
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
		let i = p(e), a = i && E(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ot || !b(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ot)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(it)), m(e) && s(o.get(at)));
				break;
			case "delete":
				i || (s(o.get(it)), m(e) && s(o.get(at)));
				break;
			case "set": m(e) && s(o.get(it));
		}
	}
	ze();
}
function lt(e, t) {
	let n = rt.get(e);
	return n && n.get(t);
}
function ut(e) {
	let t = /* @__PURE__ */ I(e);
	return t === e ? t : (st(t, "iterate", ot), /* @__PURE__ */ Qt(e) ? t : t.map(tn));
}
function dt(e) {
	return st(e = /* @__PURE__ */ I(e), "iterate", ot), e;
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
		return ut(this).concat(...e.map((e) => p(e) ? ut(e) : e));
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
	let r = /* @__PURE__ */ I(e);
	st(r, "iterate", ot);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ $t(n[0]) ? (n[0] = /* @__PURE__ */ I(n[0]), r[t](...n)) : i;
}
function yt(e, t, n = []) {
	Xe(), Re();
	let r = (/* @__PURE__ */ I(e))[t].apply(e, n);
	return ze(), Ze(), r;
}
var bt = /* @__PURE__ */ n("__proto__,__v_isRef,__isVue"), xt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(b));
function St(e) {
	b(e) || (e = String(e));
	let t = /* @__PURE__ */ I(this);
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
		let a = p(e);
		if (!r) {
			let e;
			if (a && (e = pt[t])) return e;
			if (t === "hasOwnProperty") return St;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ L(e) ? e : n);
		if ((b(t) ? xt.has(t) : bt(t)) || (r || st(e, "get", t), i)) return o;
		if (/* @__PURE__ */ L(o)) {
			let e = a && E(t) ? o : o.value;
			return r && x(e) ? /* @__PURE__ */ qt(e) : e;
		}
		return x(o) ? r ? /* @__PURE__ */ qt(o) : /* @__PURE__ */ Gt(o) : o;
	}
}, wt = class extends Ct {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = p(e) && E(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Zt(i);
			if (!/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (i = /* @__PURE__ */ I(i), n = /* @__PURE__ */ I(n)), !a && /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : f(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ L(e) ? e : r);
		return e === /* @__PURE__ */ I(r) && s && (o ? j(n, i) && ct(e, "set", t, n, i) : ct(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = f(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ct(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!b(t) || !xt.has(t)) && st(e, "has", t), n;
	}
	ownKeys(e) {
		return st(e, "iterate", p(e) ? "length" : it), Reflect.ownKeys(e);
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
		let i = this.__v_raw, a = /* @__PURE__ */ I(i), o = m(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = i[e](...r), d = n ? At : t ? nn : tn;
		return !t && st(a, "iterate", c ? at : it), l(Object.create(u), { next() {
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
			let r = this.__v_raw, i = /* @__PURE__ */ I(r), a = /* @__PURE__ */ I(n);
			e || (j(n, a) && st(i, "get", n), st(i, "get", a));
			let { has: o } = jt(i), s = t ? At : e ? nn : tn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && st(/* @__PURE__ */ I(t), "iterate", it), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ I(n), i = /* @__PURE__ */ I(t);
			return e || (j(t, i) && st(r, "has", t), st(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ I(a), s = t ? At : e ? nn : tn;
			return !e && st(o, "iterate", it), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return l(n, e ? {
		add: Nt("add"),
		set: Nt("set"),
		delete: Nt("delete"),
		clear: Nt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ I(this), r = jt(n), i = /* @__PURE__ */ I(e), a = !t && !/* @__PURE__ */ Qt(e) && !/* @__PURE__ */ Zt(e) ? i : e;
			return r.has.call(n, a) || j(e, a) && r.has.call(n, e) || j(i, a) && r.has.call(n, i) || (n.add(a), ct(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (n = /* @__PURE__ */ I(n));
			let r = /* @__PURE__ */ I(this), { has: i, get: a } = jt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ I(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? j(n, s) && ct(r, "set", e, n, s) : ct(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ I(this), { has: n, get: r } = jt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ I(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ct(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ I(this), t = e.size !== 0, n = e.clear();
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
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(f(n, r) && r in t ? n : t, r, i);
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
	if (!x(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Wt(ee(e));
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
function I(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ I(t) : e;
}
function en(e) {
	return !f(e, "__v_skip") && Object.isExtensible(e) && oe(e, "__v_skip", !0), e;
}
var tn = (e) => x(e) ? /* @__PURE__ */ Gt(e) : e, nn = (e) => x(e) ? /* @__PURE__ */ qt(e) : e;
// @__NO_SIDE_EFFECTS__
function L(e) {
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
	return /* @__PURE__ */ L(e) ? e : new sn(e, t);
}
var sn = class {
	constructor(e, t) {
		this.dep = new tt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ I(e), this._value = t ? e : tn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qt(e) || /* @__PURE__ */ Zt(e);
		e = n ? e : /* @__PURE__ */ I(e), j(e, t) && (this._rawValue = e, this._value = n ? e : tn(e), this.dep.trigger());
	}
};
function cn(e) {
	e.dep && e.dep.trigger();
}
function ln(e) {
	return /* @__PURE__ */ L(e) ? e.value : e;
}
function un(e) {
	return v(e) ? e() : ln(e);
}
var dn = {
	get: (e, t, n) => t === "__v_raw" ? e : ln(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ L(i) && !/* @__PURE__ */ L(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
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
	let t = p(e) ? Array(e.length) : {};
	for (let n in e) t[n] = yn(e, n);
	return t;
}
var gn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = b(t) ? t : String(t), this._raw = /* @__PURE__ */ I(e);
		let r = !0, i = e;
		if (!p(e) || b(this._key) || !E(this._key)) do
			r = !/* @__PURE__ */ $t(i) || /* @__PURE__ */ Qt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = ln(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ L(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ L(t)) {
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
	return /* @__PURE__ */ L(e) ? e : v(e) ? new _n(e) : x(e) && arguments.length > 1 ? yn(e, t, n) : /* @__PURE__ */ rn(e);
}
function yn(e, t, n) {
	return new gn(e, t, n);
}
var bn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new tt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = $e - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && F !== this) return Le(this, !0), !0;
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
	return v(e) ? r = e : (r = e.get, i = e.set), new bn(r, i, n);
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
function kn(e, t, n = r) {
	let { immediate: i, deep: o, once: s, scheduler: c, augmentJob: l, call: d } = n, f = (e) => o ? e : /* @__PURE__ */ Qt(e) || o === !1 || o === 0 ? An(e, 1) : An(e), m, h, g, _, y = !1, b = !1;
	if (/* @__PURE__ */ L(e) ? (h = () => e.value, y = /* @__PURE__ */ Qt(e)) : /* @__PURE__ */ Xt(e) ? (h = () => f(e), y = !0) : p(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Xt(e) || /* @__PURE__ */ Qt(e)), h = () => e.map((e) => {
		if (/* @__PURE__ */ L(e)) return e.value;
		if (/* @__PURE__ */ Xt(e)) return f(e);
		if (v(e)) return d ? d(e, 2) : e();
	})) : h = v(e) ? t ? d ? () => d(e, 2) : e : () => {
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
			return d ? d(e, 3, [_]) : e(_);
		} finally {
			En = t;
		}
	} : a, t && o) {
		let e = h, t = o === !0 ? Infinity : o;
		h = () => An(e(), t);
	}
	let x = Ae(), S = () => {
		m.stop(), x && x.active && u(x.effects, m);
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
						_
					];
					C = n, d ? d(t, 3, e) : t(...e);
				} finally {
					En = e;
				}
			}
		} else m.run();
	};
	return l && l(w), m = new Ne(h), m.scheduler = c ? () => c(w, !1) : w, _ = (e) => On(e, !1, m), g = m.onStop = () => {
		let e = Tn.get(m);
		if (e) {
			if (d) d(e, 4);
			else for (let t of e) t();
			Tn.delete(m);
		}
	}, t ? i ? w(!0) : C = m.run() : c ? c(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function An(e, t = Infinity, n) {
	if (t <= 0 || !x(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ L(e)) An(e.value, t, n);
	else if (p(e)) for (let r = 0; r < e.length; r++) An(e[r], t, n);
	else if (h(e) || m(e)) e.forEach((e) => {
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
	if (v(e)) {
		let i = Ln(e, t, n, r);
		return i && S(i) && i.catch((e) => {
			zn(e, t, n);
		}), i;
	}
	if (p(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Rn(e[a], t, n, r));
		return i;
	}
}
function zn(e, t, n, i = !0) {
	let a = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || r;
	if (t) {
		let r = t.parent, i = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, a) === !1) return;
			}
			r = r.parent;
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
	Bn(e, n, a, i, s);
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
	p(e) ? Un.push(...e) : Wn && e.id === -1 ? Wn.splice(Gn + 1, 0, e) : e.flags & 1 || (Un.push(e), e.flags |= 1), Zn();
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
var or = null, sr = null;
function cr(e) {
	let t = or;
	return or = e, sr = e && e.type.__scopeId || null, t;
}
function lr(e) {
	sr = e;
}
function ur() {
	sr = null;
}
var dr = (e) => fr;
function fr(e, t = or, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && us(-1);
		let i = cr(t), a = as.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = as.length; e > a; e--) cs();
			cr(i), r._d && us(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function pr(e, t) {
	if (or === null) return e;
	let n = Zs(or), i = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [a, o, s, c = r] = t[e];
		a && (v(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && An(o), i.push({
			dir: a,
			instance: n,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function mr(e, t, n, r) {
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
function hr(e, t) {
	if (H) {
		let n = H.provides, r = H.parent && H.parent.provides;
		r === n && (n = H.provides = Object.create(r)), n[e] = t;
	}
}
function gr(e, t, n = !1) {
	let r = Ps();
	if (r || $a) {
		let i = $a ? $a._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && v(t) ? t.call(r && r.proxy) : t;
	}
}
function _r() {
	return !!(Ps() || $a);
}
var vr = /* @__PURE__ */ Symbol.for("v-scx"), yr = () => gr(vr);
function br(e, t) {
	return wr(e, null, t);
}
function xr(e, t) {
	return wr(e, null, { flush: "post" });
}
function Sr(e, t) {
	return wr(e, null, { flush: "sync" });
}
function Cr(e, t, n) {
	return wr(e, t, n);
}
function wr(e, t, n = r) {
	let { immediate: i, deep: o, flush: s, once: c } = n, u = l({}, n), d = t && i || !t && s !== "post", f;
	if (Bs) {
		if (s === "sync") {
			let e = yr();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = a, e.resume = a, e.pause = a, e;
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
	return Bs && (f ? f.push(h) : d && h()), h;
}
function Tr(e, t, n) {
	let r = this.proxy, i = y(e) ? e.includes(".") ? Er(r, e) : () => r[e] : e.bind(r, r), a;
	v(t) ? a = t : (a = t.handler, n = t);
	let o = Ls(this), s = wr(i, a.bind(r), n);
	return o(), s;
}
function Er(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Dr = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ Symbol("_vte"), kr = (e) => e.__isTeleport, Ar = (e) => e && (e.disabled || e.disabled === ""), jr = (e) => e && (e.defer || e.defer === ""), Mr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Nr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Pr = (e, t) => {
	let n = e && e.to;
	return y(n) ? t ? t(n) : null : n;
}, Fr = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Ar(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Ar(e.props), r = e.target = Pr(e.props, m), a = Br(r, e, h, p);
			r && (o !== "svg" && Mr(r) ? o = "svg" : o !== "mathml" && Nr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), zr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Dr.get(e) === t) {
					if (Dr.delete(e), Ar(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), zr(e, !0);
					}
					x(e);
				}
			};
			Dr.set(e, t), R(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), jr(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), zr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Dr.get(e);
			if (u) {
				u.flags |= 8, Dr.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Ar(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Mr(p) ? o = "svg" : (o === "mathml" || Nr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), zo(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Ir(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Pr(t.props, m);
				e && (t.target = e, Ir(t, e, null, l, 0));
			} else g && Ir(t, p, h, l, 1);
			zr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = Ar(f), m = a || !p, h = Dr.get(e);
		if (h && (h.flags |= 8, Dr.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Ir,
	hydrate: Lr
};
function Ir(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Dr.has(e) && (!d || Ar(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Lr(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
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
	let m = t.target = Pr(t.props, c), h = Ar(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Br(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Br(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), zr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Rr = Fr;
function zr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Br(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Or] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Vr = /* @__PURE__ */ Symbol("_leaveCb"), Hr = /* @__PURE__ */ Symbol("_enterCb");
function Ur() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return qi(() => {
		e.isMounted = !0;
	}), Xi(() => {
		e.isUnmounting = !0;
	}), e;
}
var Wr = [Function, Array], Gr = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Wr,
	onEnter: Wr,
	onAfterEnter: Wr,
	onEnterCancelled: Wr,
	onBeforeLeave: Wr,
	onLeave: Wr,
	onAfterLeave: Wr,
	onLeaveCancelled: Wr,
	onBeforeAppear: Wr,
	onAppear: Wr,
	onAfterAppear: Wr,
	onAppearCancelled: Wr
}, Kr = (e) => {
	let t = e.subTree;
	return t.component ? Kr(t.component) : t;
}, qr = {
	name: "BaseTransition",
	props: Gr,
	setup(e, { slots: t }) {
		let n = Ps(), r = Ur();
		return () => {
			let i = t.default && ti(t.default(), !0), a = i && i.length ? Jr(i) : n.subTree ? Ts() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ I(e), { mode: s } = o;
			if (r.isLeaving) return Qr(a);
			let c = $r(a);
			if (!c) return Qr(a);
			let l = Zr(c, o, r, n, (e) => l = e);
			c.type !== B && ei(c, l);
			let u = n.subTree && $r(n.subTree);
			if (u && u.type !== B && !hs(u, c) && Kr(n).type !== B) {
				let e = Zr(u, o, r, n);
				if (ei(u, e), s === "out-in" && c.type !== B) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Qr(a);
				s === "in-out" && c.type !== B ? e.delayLeave = (e, t, n) => {
					let i = Xr(r, u);
					i[String(u.key)] = u, e[Vr] = () => {
						t(), e[Vr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Jr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== B) {
			t = n;
			break;
		}
	}
	return t;
}
var Yr = qr;
function Xr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Zr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Xr(n, e), C = (e, t) => {
		e && Rn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), p(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, ee = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Vr] && t[Vr](!0);
			let i = S[x];
			i && hs(e, i) && i.el[Vr] && i.el[Vr](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || d;
			else return;
			let s = !1;
			t[Hr] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), ee.delayedLeave && ee.delayedLeave(), t[Hr] = void 0);
			};
			let c = t[Hr].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Hr] && t[Hr](!0), n.isUnmounting) return r();
			C(f, [t]);
			let a = !1;
			t[Vr] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Vr] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Vr].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Zr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return ee;
}
function Qr(e) {
	if (Fi(e)) return e = Ss(e), e.children = null, e;
}
function $r(e) {
	if (!Fi(e)) return kr(e.type) && e.children ? Jr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && v(n.default)) return n.default();
	}
}
function ei(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ei(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ti(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === z ? (o.patchFlag & 128 && i++, r = r.concat(ti(o.children, t, s))) : (t || o.type !== B) && r.push(s == null ? o : Ss(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function ni(e, t) {
	return v(e) ? /* @__PURE__ */ l({ name: e.name }, t, { setup: e }) : e;
}
function ri() {
	let e = Ps();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function ii(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function ai(e) {
	let t = Ps(), n = /* @__PURE__ */ an(null);
	if (t) {
		let i = t.refs === r ? t.refs = {} : t.refs;
		Object.defineProperty(i, e, {
			enumerable: !0,
			get: () => n.value,
			set: (e) => n.value = e
		});
	}
	return n;
}
function oi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var si = /* @__PURE__ */ new WeakMap();
function ci(e, t, n, i, a = !1) {
	if (p(e)) {
		e.forEach((e, r) => ci(e, t && (p(t) ? t[r] : t), n, i, a));
		return;
	}
	if (Mi(i) && !a) {
		i.shapeFlag & 512 && i.type.__asyncResolved && i.component.subTree.component && ci(e, t, n, i.component.subTree);
		return;
	}
	let s = i.shapeFlag & 4 ? Zs(i.component) : i.el, c = a ? null : s, { i: l, r: d } = e, m = t && t.r, h = l.refs === r ? l.refs = {} : l.refs, g = l.setupState, _ = /* @__PURE__ */ I(g), b = g === r ? o : (e) => !oi(h, e) && f(_, e), x = (e, t) => !(t && oi(h, t));
	if (m != null && m !== d) {
		if (li(t), y(m)) h[m] = null, b(m) && (g[m] = null);
		else if (/* @__PURE__ */ L(m)) {
			let e = t;
			x(m, e.k) && (m.value = null), e.k && (h[e.k] = null);
		}
	}
	if (v(d)) Ln(d, l, 12, [c, h]);
	else {
		let t = y(d), r = /* @__PURE__ */ L(d);
		if (t || r) {
			let i = () => {
				if (e.f) {
					let n = t ? b(d) ? g[d] : h[d] : x(d) || !e.k ? d.value : h[e.k];
					if (a) p(n) && u(n, s);
					else if (p(n)) n.includes(s) || n.push(s);
					else if (t) h[d] = [s], b(d) && (g[d] = h[d]);
					else {
						let t = [s];
						x(d, e.k) && (d.value = t), e.k && (h[e.k] = t);
					}
				} else t ? (h[d] = c, b(d) && (g[d] = c)) : r && (x(d, e.k) && (d.value = c), e.k && (h[e.k] = c));
			};
			if (c) {
				let t = () => {
					i(), si.delete(e);
				};
				t.id = -1, si.set(e, t), R(t, n);
			} else li(e), i();
		}
	}
}
function li(e) {
	let t = si.get(e);
	t && (t.flags |= 8, si.delete(e));
}
var ui = !1, di = () => {
	ui ||= (console.error("Hydration completed but contains mismatches."), !0);
}, fi = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", pi = (e) => e.namespaceURI.includes("MathML"), mi = (e) => {
	if (e.nodeType === 1) {
		if (fi(e)) return "svg";
		if (pi(e)) return "mathml";
	}
}, hi = (e) => e.nodeType === 8;
function gi(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: o, remove: c, insert: l, createComment: u } } = e, d = (e, t) => {
		if (!t.hasChildNodes()) {
			n(null, e, t), er(), t._vnode = e;
			return;
		}
		f(t.firstChild, e, null, null, null), er(), t._vnode = e;
	}, f = (n, r, s, c, u, d = !1) => {
		d ||= !!r.dynamicChildren;
		let b = hi(n) && n.data === "[", x = () => g(n, r, s, c, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: ee } = r, T = n.nodeType;
		r.el = n, ee === -2 && (d = !1, r.dynamicChildren = null);
		let E = null;
		switch (S) {
			case rs:
				T === 3 ? (n.data !== r.children && (di(), n.data = r.children), E = a(n)) : r.children === "" ? (l(r.el = i(""), o(n), n), E = n) : E = x();
				break;
			case B:
				y(n) ? (E = a(n), v(r.el = n.content.firstChild, n, s)) : E = T !== 8 || b ? x() : a(n);
				break;
			case is:
				if (b && (n = a(n), T = n.nodeType), T === 1 || T === 3) {
					E = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += E.nodeType === 1 ? E.outerHTML : E.data), t === r.staticCount - 1 && (r.anchor = E), E = a(E);
					return b ? a(E) : E;
				}
				x();
				break;
			case z:
				E = b ? h(n, r, s, c, u, d) : x();
				break;
			default: if (w & 1) E = (T !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, s, c, u, d);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = o(n);
				if (E = b ? _(n) : hi(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, s, c, mi(e), d), Mi(r) && !r.type.__asyncResolved) {
					let t;
					b ? (t = V(z), t.anchor = E ? E.previousSibling : e.lastChild) : t = n.nodeType === 3 ? Cs("") : V("div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? E = T === 8 ? r.type.hydrate(n, r, s, c, u, d, e, m) : x() : w & 128 && (E = r.type.hydrate(n, r, s, c, mi(o(n)), u, d, e, f));
		}
		return C != null && ci(C, null, c, r), E;
	}, p = (e, t, n, i, a, o) => {
		o ||= !!t.dynamicChildren;
		let { type: l, dynamicProps: u, props: d, patchFlag: f, shapeFlag: p, dirs: h, transition: g } = t, _ = l === "input" || l === "option", b = !!u;
		if (_ || b || f !== -1) {
			h && mr(t, null, n, "created");
			let l = !1;
			if (y(e)) {
				l = Ro(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (l) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (p & 16 && !(d && (d.innerHTML || d.textContent))) {
				let r = m(e.firstChild, t, e, n, i, a, o);
				for (r && !yi(e, 1) && di(); r;) {
					let e = r;
					r = r.nextSibling, c(e);
				}
			} else if (p & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (yi(e, 0) || di(), e.textContent = t.children);
			}
			if (d) {
				if (_ || b || !o || f & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in d) (_ && (a.endsWith("value") || a === "indeterminate") || s(a) && !D(a) || a[0] === "." || t && !D(a) || u && u.includes(a)) && r(e, a, null, d[a], i, n);
				} else if (d.onClick) r(e, "onClick", null, d.onClick, void 0, n);
				else if (f & 4 && /* @__PURE__ */ Xt(d.style)) for (let e in d.style) d.style[e];
			}
			let x;
			(x = d && d.onVnodeBeforeMount) && As(x, n, t), h && mr(t, null, n, "beforeMount"), ((x = d && d.onVnodeMounted) || h || l) && es(() => {
				x && As(x, n, t), l && g.enter(e), h && mr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, m = (e, t, r, o, s, c, u) => {
		u ||= !!t.dynamicChildren;
		let d = t.children, p = d.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? d[t] : d[t] = Es(d[t]), g = h.type === rs;
			e ? (g && !u && t + 1 < p && Es(d[t + 1]).type === rs && (l(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = f(e, h, o, s, c, u)) : g && !h.children ? l(h.el = i(""), r) : (m || (m = !0, yi(r, 1) || di()), n(null, h, r, null, o, s, mi(r), c));
		}
		return e;
	}, h = (e, t, n, r, i, s) => {
		let { slotScopeIds: c } = t;
		c && (i = i ? i.concat(c) : c);
		let d = o(e), f = m(a(e), t, d, n, r, i, s);
		return f && hi(f) && f.data === "]" ? a(t.anchor = f) : (di(), l(t.anchor = u("]"), d, f), f);
	}, g = (e, t, r, i, s, l) => {
		if (xi(e, t) || di(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) c(n);
				else break;
			}
		}
		let u = a(e), d = o(e);
		return c(e), n(null, t, d, u, r, i, mi(d), s), r && (r.vnode.el = t.el, mo(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && hi(e) && (e.data === t && r++, e.data === n)) {
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
var _i = "data-allow-mismatch", vi = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function yi(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(_i);) e = e.parentElement;
	return bi(e && e.getAttribute(_i), t);
}
function bi(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(vi[t]);
	}
}
function xi(e, t) {
	return yi(e.parentElement, 1) || Si(e) || Ci(t);
}
function Si(e) {
	return e.nodeType === 1 && bi(e.getAttribute(_i), 1);
}
function Ci({ props: e }) {
	let t = e && e[_i];
	return typeof t == "string" && bi(t, 1);
}
var wi = ue().requestIdleCallback || ((e) => setTimeout(e, 1)), Ti = ue().cancelIdleCallback || ((e) => clearTimeout(e)), Ei = (e = 1e4) => (t) => {
	let n = wi(t, { timeout: e });
	return () => Ti(n);
};
function Di(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Oi = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e);
	return n((e) => {
		if (e instanceof Element) {
			if (Di(e)) return t(), r.disconnect(), !1;
			r.observe(e);
		}
	}), () => r.disconnect();
}, ki = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, Ai = (e = []) => (t, n) => {
	y(e) && (e = [e]);
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
function ji(e, t) {
	if (hi(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (hi(r)) if (r.data === "]") {
				if (--n === 0) break;
			} else r.data === "[" && n++;
			r = r.nextSibling;
		}
	} else t(e);
}
var Mi = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Ni(e) {
	v(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ ni({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => ji(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = H;
			if (ii(e), u) return () => Pi(u, e);
			let t = (t) => {
				l = null, zn(t, e, 13, !r);
			};
			if (s && e.suspense || Bs) return p().then((t) => () => Pi(t, e)).catch((e) => (t(e), () => r ? V(r, { error: e }) : null));
			let a = /* @__PURE__ */ rn(!1), c = /* @__PURE__ */ rn(), d = /* @__PURE__ */ rn(!!i), f, m;
			return Zi(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Fi(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				if (e.isUnmounted) {
					l = null;
					return;
				}
				t(n), c.value = n;
			}), () => {
				if (a.value && u) return Pi(u, e);
				if (c.value && r) return V(r, { error: c.value });
				if (n && !d.value) return Pi(n, e);
			};
		}
	});
}
function Pi(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = V(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Fi = (e) => e.type.__isKeepAlive, Ii = {
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
		let n = Ps(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), R(() => {
				a.isDeactivated = !1, a.a && ae(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && As(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = e.component;
			Ho(t.m), Ho(t.a), l(e, f, null, 1, s), R(() => {
				t.da && ae(t.da);
				let n = e.props && e.props.onVnodeUnmounted;
				n && As(n, t.parent, e), t.isDeactivated = !0;
			}, s);
		};
		function p(e) {
			Hi(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = Qs(Mi(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !hs(t, o)) ? p(t) : o && Hi(o), i.delete(e), a.delete(e);
		}
		Cr(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => Li(e, t)), t && m((e) => !Li(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			g != null && (Wo(n.subTree.type) ? R(() => {
				i.set(g, Ui(n.subTree));
			}, n.subTree.suspense) : i.set(g, Ui(n.subTree)));
		};
		return qi(_), Yi(_), Xi(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = Ui(t);
				if (e.type === i.type && e.key === i.key) {
					Hi(i);
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
			if (!ms(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = Ui(r);
			if (s.type === B) return o = null, s;
			let c = s.type, l = Qs(Mi(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !Li(u, l)) || d && l && Li(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = Ss(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && ei(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, Wo(r.type) ? r : s;
		};
	}
};
function Li(e, t) {
	return p(e) ? e.some((e) => Li(e, t)) : y(e) ? e.split(",").includes(t) : _(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Ri(e, t) {
	Bi(e, "a", t);
}
function zi(e, t) {
	Bi(e, "da", t);
}
function Bi(e, t, n = H) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Wi(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Fi(e.parent.vnode) && Vi(r, t, n, e), e = e.parent;
	}
}
function Vi(e, t, n, r) {
	let i = Wi(t, e, r, !0);
	Zi(() => {
		u(r[t], i);
	}, n);
}
function Hi(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function Ui(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function Wi(e, t, n = H, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Xe();
			let i = Ls(n), a = Rn(t, n, e, r);
			return i(), Ze(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Gi = (e) => (t, n = H) => {
	(!Bs || e === "sp") && Wi(e, (...e) => t(...e), n);
}, Ki = Gi("bm"), qi = Gi("m"), Ji = Gi("bu"), Yi = Gi("u"), Xi = Gi("bum"), Zi = Gi("um"), Qi = Gi("sp"), $i = Gi("rtg"), ea = Gi("rtc");
function ta(e, t = H) {
	Wi("ec", e, t);
}
var na = "components", ra = "directives";
function ia(e, t) {
	return ca(na, e, !0, t) || e;
}
var aa = /* @__PURE__ */ Symbol.for("v-ndc");
function oa(e) {
	return y(e) ? ca(na, e, !1) || e : e || aa;
}
function sa(e) {
	return ca(ra, e);
}
function ca(e, t, n = !0, r = !1) {
	let i = or || H;
	if (i) {
		let n = i.type;
		if (e === na) {
			let e = Qs(n, !1);
			if (e && (e === t || e === O(t) || e === ie(O(t)))) return n;
		}
		let a = la(i[e] || n[e], t) || la(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function la(e, t) {
	return e && (e[t] || e[O(t)] || e[ie(O(t))]);
}
function ua(e, t, n, r) {
	let i, a = n && n[r], o = p(e);
	if (o || y(e)) {
		let n = o && /* @__PURE__ */ Xt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Qt(e), s = /* @__PURE__ */ Zt(e), e = dt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? nn(tn(e[n])) : tn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (x(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
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
function da(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (p(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function fa(e, t, n = {}, r, i, a) {
	if (or.ce || or.parent && Mi(or.parent) && or.parent.ce) {
		let e = a != null && n.key == null ? l({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), ss(), ps(z, null, [V("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = as.length;
	ss();
	let c;
	try {
		let i = o && pa(o(n)), s = n.key || a || i && i.key;
		c = ps(z, { key: (s && !b(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = as.length; e > s; e--) cs();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function pa(e) {
	return e.some((e) => !ms(e) || !(e.type === B || e.type === z && !pa(e.children))) ? e : null;
}
function ma(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : A(r)] = e[r];
	return n;
}
var ha = (e) => e ? zs(e) ? Zs(e) : ha(e.parent) : null, ga = /* @__PURE__ */ l(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ha(e.parent),
	$root: (e) => ha(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ba(e),
	$forceUpdate: (e) => e.f ||= () => {
		Xn(e.update);
	},
	$nextTick: (e) => e.n ||= Jn.bind(e.proxy),
	$watch: (e) => Tr.bind(e)
}), _a = (e, t) => e !== r && !e.__isScriptSetup && f(e, t), va = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (t[0] !== "$") {
			let e = s[t];
			if (e !== void 0) switch (e) {
				case 1: return i[t];
				case 2: return a[t];
				case 4: return n[t];
				case 3: return o[t];
			}
			else if (_a(i, t)) return s[t] = 1, i[t];
			else if (a !== r && f(a, t)) return s[t] = 2, a[t];
			else if (f(o, t)) return s[t] = 3, o[t];
			else if (n !== r && f(n, t)) return s[t] = 4, n[t];
			else Fa && (s[t] = 0);
		}
		let u = ga[t], d, p;
		if (u) return t === "$attrs" && st(e.attrs, "get", ""), u(e);
		if ((d = c.__cssModules) && (d = d[t])) return d;
		if (n !== r && f(n, t)) return s[t] = 4, n[t];
		if (p = l.config.globalProperties, f(p, t)) return p[t];
	},
	set({ _: e }, t, n) {
		let { data: i, setupState: a, ctx: o } = e;
		return _a(a, t) ? (a[t] = n, !0) : i !== r && f(i, t) ? (i[t] = n, !0) : f(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(n[c] || e !== r && c[0] !== "$" && f(e, c) || _a(t, c) || f(o, c) || f(i, c) || f(ga, c) || f(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? f(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, ya = /* @__PURE__ */ l({}, va, {
	get(e, t) {
		if (t !== Symbol.unscopables) return va.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !de(t);
	}
});
function ba() {
	return null;
}
function xa() {
	return null;
}
function Sa(e) {}
function Ca(e) {}
function wa() {
	return null;
}
function Ta() {}
function Ea(e, t) {
	return null;
}
function Da() {
	return ka("useSlots").slots;
}
function Oa() {
	return ka("useAttrs").attrs;
}
function ka(e) {
	let t = Ps();
	return t.setupContext ||= Xs(t);
}
function Aa(e) {
	return p(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function ja(e, t) {
	let n = Aa(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? p(r) || v(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function Ma(e, t) {
	return !e || !t ? e || t : p(e) && p(t) ? e.concat(t) : l({}, Aa(e), Aa(t));
}
function Na(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Pa(e) {
	let t = Ps(), n = Bs, r = e();
	Rs(), n && Is(!1);
	let i = () => {
		Ls(t), n && Is(!0);
	}, a = () => {
		Ps() !== t && t.scope.off(), Rs(), n && Is(!1);
	};
	return S(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Fa = !0;
function Ia(e) {
	let t = Ba(e), n = e.proxy, r = e.ctx;
	Fa = !1, t.beforeCreate && Ra(t.beforeCreate, e, "bc");
	let { data: i, computed: o, methods: s, watch: c, provide: l, inject: u, created: d, beforeMount: f, mounted: m, beforeUpdate: h, updated: g, activated: _, deactivated: y, beforeDestroy: b, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: T, renderTriggered: E, errorCaptured: D, serverPrefetch: te, expose: ne, inheritAttrs: O, components: re, directives: k, filters: ie } = t;
	if (u && La(u, r, null), s) for (let e in s) {
		let t = s[e];
		v(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		x(t) && (e.data = /* @__PURE__ */ Gt(t));
	}
	if (Fa = !0, o) for (let e in o) {
		let t = o[e], i = ec({
			get: v(t) ? t.bind(n, n) : v(t.get) ? t.get.bind(n, n) : a,
			set: !v(t) && v(t.set) ? t.set.bind(n) : a
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (c) for (let e in c) za(c[e], r, n, e);
	if (l) {
		let e = v(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			hr(t, e[t]);
		});
	}
	d && Ra(d, e, "c");
	function A(e, t) {
		p(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (A(Ki, f), A(qi, m), A(Ji, h), A(Yi, g), A(Ri, _), A(zi, y), A(ta, D), A(ea, T), A($i, E), A(Xi, S), A(Zi, w), A(Qi, te), p(ne)) if (ne.length) {
		let t = e.exposed ||= {};
		ne.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === a && (e.render = ee), O != null && (e.inheritAttrs = O), re && (e.components = re), k && (e.directives = k), te && ii(e);
}
function La(e, t, n = a) {
	p(e) && (e = Ga(e));
	for (let n in e) {
		let r = e[n], i;
		i = x(r) ? "default" in r ? gr(r.from || n, r.default, !0) : gr(r.from || n) : gr(r), /* @__PURE__ */ L(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Ra(e, t, n) {
	Rn(p(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function za(e, t, n, r) {
	let i = r.includes(".") ? Er(n, r) : () => n[r];
	if (y(e)) {
		let n = t[e];
		v(n) && Cr(i, n);
	} else if (v(e)) Cr(i, e.bind(n));
	else if (x(e)) if (p(e)) e.forEach((e) => za(e, t, n, r));
	else {
		let r = v(e.handler) ? e.handler.bind(n) : t[e.handler];
		v(r) && Cr(i, r, e);
	}
}
function Ba(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Va(c, e, o, !0)), Va(c, t, o)), x(t) && a.set(t, c), c;
}
function Va(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Va(e, a, n, !0), i && i.forEach((t) => Va(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ha[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ha = {
	data: Ua,
	props: Ja,
	emits: Ja,
	methods: qa,
	computed: qa,
	beforeCreate: Ka,
	created: Ka,
	beforeMount: Ka,
	mounted: Ka,
	beforeUpdate: Ka,
	updated: Ka,
	beforeDestroy: Ka,
	beforeUnmount: Ka,
	destroyed: Ka,
	unmounted: Ka,
	activated: Ka,
	deactivated: Ka,
	errorCaptured: Ka,
	serverPrefetch: Ka,
	components: qa,
	directives: qa,
	watch: Ya,
	provide: Ua,
	inject: Wa
};
function Ua(e, t) {
	return t ? e ? function() {
		return l(v(e) ? e.call(this, this) : e, v(t) ? t.call(this, this) : t);
	} : t : e;
}
function Wa(e, t) {
	return qa(Ga(e), Ga(t));
}
function Ga(e) {
	if (p(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Ka(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function qa(e, t) {
	return e ? l(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ja(e, t) {
	return e ? p(e) && p(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : l(/* @__PURE__ */ Object.create(null), Aa(e), Aa(t ?? {})) : t;
}
function Ya(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = l(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Ka(e[r], t[r]);
	return n;
}
function Xa() {
	return {
		app: null,
		config: {
			isNativeTag: o,
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
var Za = 0;
function Qa(e, t) {
	return function(n, r = null) {
		v(n) || (n = l({}, n)), r != null && !x(r) && (r = null);
		let i = Xa(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Za++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ac,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && v(e.install) ? (a.add(e), e.install(c, ...t)) : v(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || V(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Zs(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Rn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = $a;
				$a = c;
				try {
					return e();
				} finally {
					$a = t;
				}
			}
		};
		return c;
	};
}
var $a = null;
function eo(e, t, n = r) {
	let i = Ps(), a = O(t), o = k(t), s = to(e, a), c = mn((s, c) => {
		let l, u = r, d;
		return Sr(() => {
			let t = e[a];
			j(l, t) && (l = t, c());
		}), {
			get() {
				return s(), n.get ? n.get(l) : l;
			},
			set(e) {
				let s = n.set ? n.set(e) : e;
				if (!j(s, l) && !(u !== r && j(e, u))) return;
				let f = i.vnode.props, p = !!(f && (t in f || a in f || o in f) && (`onUpdate:${t}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${t}`, s), j(e, u) && (j(e, s) && !j(s, d) || p && u !== r && !j(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || r : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var to = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${O(t)}Modifiers`] || e[`${k(t)}Modifiers`];
function no(e, t, ...n) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || r, a = n, o = t.startsWith("update:"), s = o && to(i, t.slice(7));
	s && (s.trim && (a = n.map((e) => y(e) ? e.trim() : e)), s.number && (a = n.map(se)));
	let c, l = i[c = A(t)] || i[c = A(O(t))];
	!l && o && (l = i[c = A(k(t))]), l && Rn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Rn(u, e, 6, a);
	}
}
var ro = /* @__PURE__ */ new WeakMap();
function io(e, t, n = !1) {
	let r = n ? ro : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!v(e)) {
		let r = (e) => {
			let n = io(e, t, !0);
			n && (s = !0, l(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (x(e) && r.set(e, null), null) : (p(a) ? a.forEach((e) => o[e] = null) : l(o, a), x(e) && r.set(e, o), o);
}
function ao(e, t) {
	return !e || !s(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), f(e, t[0].toLowerCase() + t.slice(1)) || f(e, k(t)) || f(e, t));
}
function oo(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = cr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Es(u.call(t, e, d, f, m, p, h)), y = s;
		} else {
			let e = t;
			v = Es(e.length > 1 ? e(f, {
				attrs: s,
				slots: o,
				emit: l
			}) : e(f, null)), y = t.props ? s : co(s);
		}
	} catch (t) {
		as.length = 0, zn(t, e, 1), v = V(B);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(c) && (y = lo(y, a)), b = Ss(b, y, !1, !0));
	}
	return n.dirs && (b = Ss(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ei(b, n.transition), v = b, cr(_), v;
}
function so(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (ms(r)) {
			if (r.type !== B || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var co = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || s(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, lo = (e, t) => {
	let n = {};
	for (let r in e) (!c(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function uo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? fo(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (po(o, r, n) && !ao(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || fo(r, o, l) : !!o;
	return !1;
}
function fo(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (po(t, e, a) && !ao(n, a)) return !0;
	}
	return !1;
}
function po(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && x(r) && x(i) ? !Se(r, i) : r !== i;
}
function mo({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var ho = {}, go = () => Object.create(ho), _o = (e) => Object.getPrototypeOf(e) === ho;
function vo(e, t, n, r = !1) {
	let i = {}, a = go();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), bo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Kt(i) : e.type.props ? i : a, e.attrs = a;
}
function yo(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ I(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ao(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (f(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = O(o);
					i[t] = xo(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		bo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !f(t, a) && ((r = k(a)) === a || !f(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = xo(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !f(t, e)) && (delete a[e], l = !0);
	}
	l && ct(e.attrs, "set", "");
}
function bo(e, t, n, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (t) for (let r in t) {
		if (D(r)) continue;
		let l = t[r], u;
		a && f(a, u = O(r)) ? !o || !o.includes(u) ? n[u] = l : (c ||= {})[u] = l : ao(e.emitsOptions, r) || (!(r in i) || l !== i[r]) && (i[r] = l, s = !0);
	}
	if (o) {
		let t = /* @__PURE__ */ I(n), i = c || r;
		for (let r = 0; r < o.length; r++) {
			let s = o[r];
			n[s] = xo(a, t, s, i[s], e, !f(i, s));
		}
	}
	return s;
}
function xo(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = f(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && v(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ls(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === k(n)) && (r = !0));
	}
	return r;
}
var So = /* @__PURE__ */ new WeakMap();
function Co(e, t, n = !1) {
	let a = n ? So : t.propsCache, o = a.get(e);
	if (o) return o;
	let s = e.props, c = {}, u = [], d = !1;
	if (!v(e)) {
		let r = (e) => {
			d = !0;
			let [n, r] = Co(e, t, !0);
			l(c, n), r && u.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!s && !d) return x(e) && a.set(e, i), i;
	if (p(s)) for (let e = 0; e < s.length; e++) {
		let t = O(s[e]);
		wo(t) && (c[t] = r);
	}
	else if (s) for (let e in s) {
		let t = O(e);
		if (wo(t)) {
			let n = s[e], r = c[t] = p(n) || v(n) ? { type: n } : l({}, n), i = r.type, a = !1, o = !0;
			if (p(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = v(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = v(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || f(r, "default")) && u.push(t);
		}
	}
	let m = [c, u];
	return x(e) && a.set(e, m), m;
}
function wo(e) {
	return e[0] !== "$" && !D(e);
}
var To = (e) => e === "_" || e === "_ctx" || e === "$stable", Eo = (e) => p(e) ? e.map(Es) : [Es(e)], Do = (e, t, n) => {
	if (t._n) return t;
	let r = fr((...e) => Eo(t(...e)), n);
	return r._c = !1, r;
}, Oo = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (To(n)) continue;
		let i = e[n];
		if (v(i)) t[n] = Do(n, i, r);
		else if (i != null) {
			let e = Eo(i);
			t[n] = () => e;
		}
	}
}, ko = (e, t) => {
	let n = Eo(t);
	e.slots.default = () => n;
}, Ao = (e, t, n) => {
	for (let r in t) (n || !To(r)) && (e[r] = t[r]);
}, jo = (e, t, n) => {
	let r = e.slots = go();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ao(r, t, n), n && oe(r, "_", e, !0)) : Oo(t, r);
	} else t && ko(e, t);
}, Mo = (e, t, n) => {
	let { vnode: i, slots: a } = e, o = !0, s = r;
	if (i.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? o = !1 : Ao(a, t, n) : (o = !t.$stable, Oo(t, a)), s = t;
	} else t && (ko(e, t), s = { default: 1 });
	if (o) for (let e in a) !To(e) && s[e] == null && delete a[e];
}, R = es;
function No(e) {
	return Fo(e);
}
function Po(e) {
	return Fo(e, gi);
}
function Fo(e, t) {
	let n = ue();
	n.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = a, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !hs(e, t) && (r = ge(e), M(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case rs:
				y(e, t, n, r);
				break;
			case B:
				b(e, t, n, r);
				break;
			case is:
				e ?? x(t, n, r, o);
				break;
			case z:
				re(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? k(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ye);
		}
		u != null && i ? ci(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && ci(e.ref, null, a, e, !0);
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
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, Io(e, a), s, u), _ && mr(e, null, r, "created"), T(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !D(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && As(f, r, e);
		}
		_ && mr(e, null, r, "beforeMount");
		let v = Ro(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && R(() => {
			try {
				f && As(f, r, e), v && g.enter(d), _ && mr(e, null, r, "mounted");
			} finally {}
		}, i);
	}, T = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Wo(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				T(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Ds(e[l]) : Es(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, te = (e, t, n, i, a, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || r, h = t.props || r, g;
		if (n && Lo(n, !1), (g = h.onVnodeBeforeUpdate) && As(g, n, t, e), f && mr(t, e, n, "beforeUpdate"), n && Lo(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? ne(e.dynamicChildren, d, l, n, i, Io(t, a), o) : s || se(e, t, l, null, n, i, Io(t, a), o, !1), u > 0) {
			if (u & 16) O(l, m, h, n, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], i = m[r], o = h[r];
					(o !== i || r === "value") && c(l, r, i, o, a, n);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && O(l, m, h, n, a);
		((g = h.onVnodeUpdated) || f) && R(() => {
			g && As(g, n, t, e), f && mr(t, e, n, "updated");
		}, i);
	}, ne = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === z || !hs(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, O = (e, t, n, i, a) => {
		if (t !== n) {
			if (t !== r) for (let r in t) !D(r) && !(r in n) && c(e, r, t[r], null, a, i);
			for (let r in n) {
				if (D(r)) continue;
				let o = n[r], s = t[r];
				o !== s && r !== "value" && c(e, r, s, o, a, i);
			}
			"value" in n && c(e, "value", t.value, n.value, a);
		}
	}, re = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ne(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && zo(e, t, !0)) : se(e, t, n, f, i, a, s, c, l);
	}, k = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ie(t, n, r, i, a, o, c) : A(e, t, c);
	}, ie = (e, t, n, r, i, a, o) => {
		let s = e.component = Ns(e, r, i);
		if (Fi(e) && (s.ctx.renderer = ye), Vs(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, j, o), !e.el) {
				let r = s.subTree = V(B);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else j(s, e, t, n, i, a, o);
	}, A = (e, t, n) => {
		let r = t.component = e.component;
		if (uo(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			oe(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, j = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Vo(e);
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
				Lo(e, !1), t ? (t.el = c.el, oe(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && As(d, s, t, c), Lo(e, !0);
				let f = oo(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ge(p), e, i, a), t.el = f.el, u === null && mo(e, f.el), r && R(r, i), (d = t.props && t.props.onVnodeUpdated) && R(() => As(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Mi(t);
				if (Lo(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && As(o, d, t), Lo(e, !0), s && xe) {
					let t = () => {
						e.subTree = oo(e), xe(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = oo(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && R(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					R(() => As(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Mi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && R(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ne(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Xn(u), Lo(e, !0), l();
	}, oe = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, yo(e, t.props, r, n), Mo(e, t.children, n), Xe(), $n(e), Ze();
	}, se = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				le(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && he(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? le(l, d, n, r, i, a, o, s, c) : he(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, ce = (e, t, n, r, a, o, s, c, l) => {
		e ||= i, t ||= i;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let r = t[p] = l ? Ds(t[p]) : Es(t[p]);
			v(e[p], r, n, null, a, o, s, c, l);
		}
		u > d ? he(e, a, o, !0, !1, f) : E(t, n, r, a, o, s, c, l, f);
	}, le = (e, t, n, r, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], i = t[u] = l ? Ds(t[u]) : Es(t[u]);
			if (hs(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], i = t[p] = l ? Ds(t[p]) : Es(t[p]);
			if (hs(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, i = e < d ? t[e].el : r;
				for (; u <= p;) v(null, t[u] = l ? Ds(t[u]) : Es(t[u]), n, i, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) M(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Ds(t[u]) : Es(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					M(r, a, o, !0);
					continue;
				}
				let i;
				if (r.key != null) i = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && hs(r, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? M(r, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(r, t[i], n, null, a, o, s, c, l), y++);
			}
			let w = x ? Bo(C) : i;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, i = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Uo(f) : r;
				C[u] === 0 ? v(null, i, n, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? de(i, n, p, 2) : _--);
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
			c.move(e, t, n, ye);
			return;
		}
		if (c === z) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === is) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.persisted && !a[Vr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), R(() => l.enter(a), i));
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				let e = a._isLeaving || !!a[Vr];
				a._isLeaving && a[Vr](!0), l.persisted && !e ? u() : r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, M = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Xe(), ci(s, null, n, e, !0), Ze()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Mi(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && As(_, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && mr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ye, r) : l && !l.hasOnce && (a !== z || d > 0 && d & 64) ? he(l, t, n, !1, !0) : (a === z && d & 384 || !i && u & 16) && he(c, t, n), r && fe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && R(() => {
			_ && As(_, t, e), h && mr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, fe = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === z) {
			pe(n, r);
			return;
		}
		if (t === is) {
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
	}, pe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ho(c), Ho(l), r && ae(r), i.stop(), a && (a.flags |= 8, M(o, e, t, n)), s && R(s, t), R(() => {
			e.isUnmounted = !0;
		}, t);
	}, he = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) M(e[o], t, n, r, i);
	}, ge = (e) => {
		if (e.shapeFlag & 6) return ge(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Or];
		return n ? h(n) : t;
	}, _e = !1, ve = (e, t, n) => {
		let r;
		e == null ? t._vnode && (M(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, _e ||= (_e = !0, $n(r), er(), !1);
	}, ye = {
		p: v,
		um: M,
		m: de,
		r: fe,
		mt: ie,
		mc: E,
		pc: se,
		pbc: ne,
		n: ge,
		o: e
	}, be, xe;
	return t && ([be, xe] = t(ye)), {
		render: ve,
		hydrate: be,
		createApp: Qa(ve, be)
	};
}
function Io({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Lo({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ro(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function zo(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (p(r) && p(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Ds(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && zo(t, a)), a.type === rs && (a.patchFlag === -1 && (a = i[e] = Ds(a)), a.el = t.el), a.type === B && !a.el && (a.el = t.el);
	}
}
function Bo(e) {
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
function Vo(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Vo(t);
}
function Ho(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Uo(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Uo(t.subTree) : null;
}
var Wo = (e) => e.__isSuspense, Go = 0, Ko = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) Jo(t, n, r, i, a, o, s, c, l);
		else {
			if (a && a.deps > 0 && !e.suspense.isInFallback) {
				t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
				return;
			}
			Yo(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: Zo,
	normalize: Qo
};
function qo(e, t) {
	let n = e.props && e.props[t];
	v(n) && n();
}
function Jo(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = Xo(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (qo(e, "onPending"), qo(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), ts(f, e.ssFallback)) : f.resolve(!1, !0);
}
function Yo(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, hs(h, f) ? (c(h, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : g && (_ || (c(m, p, n, r, i, null, a, o, s), ts(d, p)))) : (d.pendingId = Go++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : (c(m, p, n, r, i, null, a, o, s), ts(d, p))) : m && hs(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && hs(m, f)) c(m, f, n, r, i, d, a, o, s), ts(d, f);
	else if (qo(t, "onPending"), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : Go++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e, pendingId: t } = d;
		e > 0 ? setTimeout(() => {
			d.pendingId === t && d.fallback(p);
		}, e) : e === 0 && d.fallback(p);
	}
}
function Xo(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = ns(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? ce(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: Go++,
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
			x.isFallbackMountPending = !1, ts(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = x.parent, S = !1;
			for (; y;) {
				if (y.pendingBranch) {
					y.effects.push(...c), S = !0;
					break;
				}
				y = y.parent;
			}
			!S && !g && Qn(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (t.deps--, t.deps === 0 && !n && t.resolve()), qo(r, "onResolve");
		},
		fallback(e) {
			if (!x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			qo(t, "onFallback");
			let o = m(n), l = () => {
				x.isFallbackMountPending = !1, x.isInFallback && (d(null, e, i, o, r, null, a, s, c), ts(x, e));
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
				Rs(), e.asyncResolved = !0;
				let { vnode: s } = e;
				Us(e, a, !1), i && (s.el = i);
				let c = !i && e.subTree.el;
				t(e, s, h(i || e.subTree.el), i ? null : m(e.subTree), x, o, n), c && (s.placeholder = null, g(c)), mo(e, s.el), r && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			x.isUnmounted = !0, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
		}
	};
	return x;
}
function Zo(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = Xo(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function Qo(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = $o(r ? n.default : n), e.ssFallback = r ? $o(n.fallback) : V(B);
}
function $o(e) {
	let t;
	if (v(e)) {
		let n = ls && e._c;
		n && (e._d = !1, ss()), e = e(), n && (e._d = !0, t = os, cs());
	}
	return p(e) && (e = so(e)), e = Es(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function es(e, t) {
	t && t.pendingBranch ? p(e) ? t.effects.push(...e) : t.effects.push(e) : Qn(e);
}
function ts(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, mo(r, i));
}
function ns(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var z = /* @__PURE__ */ Symbol.for("v-fgt"), rs = /* @__PURE__ */ Symbol.for("v-txt"), B = /* @__PURE__ */ Symbol.for("v-cmt"), is = /* @__PURE__ */ Symbol.for("v-stc"), as = [], os = null;
function ss(e = !1) {
	as.push(os = e ? null : []);
}
function cs() {
	as.pop(), os = as[as.length - 1] || null;
}
var ls = 1;
function us(e, t = !1) {
	ls += e, e < 0 && os && t && (os.hasOnce = !0);
}
function ds(e) {
	return e.dynamicChildren = ls > 0 ? os || i : null, cs(), ls > 0 && os && os.push(e), e;
}
function fs(e, t, n, r, i, a) {
	return ds(ys(e, t, n, r, i, a, !0));
}
function ps(e, t, n, r, i) {
	return ds(V(e, t, n, r, i, !0));
}
function ms(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function hs(e, t) {
	return e.type === t.type && e.key === t.key;
}
function gs(e) {}
var _s = ({ key: e }) => e ?? null, vs = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : y(e) || /* @__PURE__ */ L(e) || v(e) ? {
	i: or,
	r: e,
	k: t,
	f: !!n
} : e);
function ys(e, t = null, n = null, r = 0, i = null, a = e === z ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && _s(t),
		ref: t && vs(t),
		scopeId: sr,
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
		ctx: or
	};
	return s ? (Os(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= y(n) ? 8 : 16), ls > 0 && !o && os && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && os.push(c), c;
}
var V = bs;
function bs(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === aa) && (e = B), ms(e)) {
		let r = Ss(e, t, !0);
		return n && Os(r, n), ls > 0 && !a && os && (r.shapeFlag & 6 ? os[os.indexOf(e)] = r : os.push(r)), r.patchFlag = -2, r;
	}
	if ($s(e) && (e = e.__vccOpts), t) {
		t = xs(t);
		let { class: e, style: n } = t;
		e && !y(e) && (t.class = ge(e)), x(n) && (/* @__PURE__ */ $t(n) && !p(n) && (n = l({}, n)), t.style = M(n));
	}
	let o = y(e) ? 1 : Wo(e) ? 128 : kr(e) ? 64 : x(e) ? 4 : v(e) ? 2 : 0;
	return ys(e, t, n, r, i, o, a, !0);
}
function xs(e) {
	return e ? /* @__PURE__ */ $t(e) || _o(e) ? l({}, e) : e : null;
}
function Ss(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ks(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && _s(l),
		ref: t && t.ref ? n && a ? p(a) ? a.concat(vs(t)) : [a, vs(t)] : vs(t) : a,
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
		ssContent: e.ssContent && Ss(e.ssContent),
		ssFallback: e.ssFallback && Ss(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ei(u, c.clone(u)), u;
}
function Cs(e = " ", t = 0) {
	return V(rs, null, e, t);
}
function ws(e, t) {
	let n = V(is, null, e);
	return n.staticCount = t, n;
}
function Ts(e = "", t = !1) {
	return t ? (ss(), ps(B, null, e)) : V(B, null, e);
}
function Es(e) {
	return e == null || typeof e == "boolean" ? V(B) : p(e) ? V(z, null, e.slice()) : ms(e) ? Ds(e) : V(rs, null, String(e));
}
function Ds(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ss(e);
}
function Os(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (p(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), Os(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !_o(t) ? t._ctx = or : r === 3 && or && (or.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (v(t)) {
		if (r & 65) {
			Os(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: or
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Cs(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function ks(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = ge([t.class, r.class]));
		else if (e === "style") t.style = M([t.style, r.style]);
		else if (s(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(p(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !c(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function As(e, t, n, r = null) {
	Rn(e, t, 7, [n, r]);
}
var js = Xa(), Ms = 0;
function Ns(e, t, n) {
	let i = e.type, a = (t ? t.appContext : e.appContext) || js, o = {
		uid: Ms++,
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
		propsOptions: Co(i, a),
		emitsOptions: io(i, a),
		emit: null,
		emitted: null,
		propsDefaults: r,
		inheritAttrs: i.inheritAttrs,
		ctx: r,
		data: r,
		props: r,
		attrs: r,
		slots: r,
		refs: r,
		setupState: r,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
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
	return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = no.bind(null, o), e.ce && e.ce(o), o;
}
var H = null, Ps = () => H || or, Fs, Is;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Fs = t("__VUE_INSTANCE_SETTERS__", (e) => H = e), Is = t("__VUE_SSR_SETTERS__", (e) => Bs = e);
}
var Ls = (e) => {
	let t = H;
	return Fs(e), e.scope.on(), () => {
		e.scope.off(), Fs(t);
	};
}, Rs = () => {
	H && H.scope.off(), Fs(null);
};
function zs(e) {
	return e.vnode.shapeFlag & 4;
}
var Bs = !1;
function Vs(e, t = !1, n = !1) {
	t && Is(t);
	let { props: r, children: i } = e.vnode, a = zs(e);
	vo(e, r, a, t), jo(e, i, n || t);
	let o = a ? Hs(e, t) : void 0;
	return t && Is(!1), o;
}
function Hs(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, va);
	let { setup: r } = n;
	if (r) {
		Xe();
		let n = e.setupContext = r.length > 1 ? Xs(e) : null, i = Ls(e), a = Ln(r, e, 0, [e.props, n]), o = S(a);
		if (Ze(), i(), (o || e.sp) && !Mi(e) && ii(e), o) {
			if (a.then(Rs, Rs), t) return a.then((n) => {
				Us(e, n, t);
			}).catch((t) => {
				zn(t, e, 0);
			});
			e.asyncDep = a;
		} else Us(e, a, t);
	} else Js(e, t);
}
function Us(e, t, n) {
	v(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : x(t) && (e.setupState = fn(t)), Js(e, n);
}
var Ws, Gs;
function Ks(e) {
	Ws = e, Gs = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, ya));
	};
}
var qs = () => !Ws;
function Js(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Ws && !r.render) {
			let t = r.template || Ba(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = l(l({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = Ws(t, s);
			}
		}
		e.render = r.render || a, Gs && Gs(e);
	}
	{
		let t = Ls(e);
		Xe();
		try {
			Ia(e);
		} finally {
			Ze(), t();
		}
	}
}
var Ys = { get(e, t) {
	return st(e, "get", ""), e[t];
} };
function Xs(e) {
	return {
		attrs: new Proxy(e.attrs, Ys),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Zs(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(fn(en(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in ga) return ga[n](e);
		},
		has(e, t) {
			return t in e || t in ga;
		}
	}) : e.proxy;
}
function Qs(e, t = !0) {
	return v(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function $s(e) {
	return v(e) && "__vccOpts" in e;
}
var ec = (e, t) => /* @__PURE__ */ xn(e, t, Bs);
function tc(e, t, n) {
	try {
		us(-1);
		let r = arguments.length;
		return r === 2 ? x(t) && !p(t) ? ms(t) ? V(e, null, [t]) : V(e, t) : V(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ms(n) && (n = [n]), V(e, t, n));
	} finally {
		us(1);
	}
}
function nc() {}
function rc(e, t, n, r) {
	let i = n[r];
	if (i && ic(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function ic(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (j(n[e], t[e])) return !1;
	return ls > 0 && os && os.push(e), !0;
}
var ac = "3.5.40", oc = a, sc = In, cc = rr, lc = ar, uc = {
	createComponentInstance: Ns,
	setupComponent: Vs,
	renderComponentRoot: oo,
	setCurrentRenderingInstance: cr,
	isVNode: ms,
	normalizeVNode: Es,
	getComponentPublicInstance: Zs,
	ensureValidVNode: pa,
	pushWarningContext: Mn,
	popWarningContext: Nn
}, dc = void 0, fc = typeof window < "u" && window.trustedTypes;
if (fc) try {
	dc = /* @__PURE__ */ fc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var pc = dc ? (e) => dc.createHTML(e) : (e) => e, mc = "http://www.w3.org/2000/svg", hc = "http://www.w3.org/1998/Math/MathML", gc = typeof document < "u" ? document : null, _c = gc && /* @__PURE__ */ gc.createElement("template"), vc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? gc.createElementNS(mc, e) : t === "mathml" ? gc.createElementNS(hc, e) : n ? gc.createElement(e, { is: n }) : gc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => gc.createTextNode(e),
	createComment: (e) => gc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => gc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			_c.innerHTML = pc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = _c.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, yc = "transition", bc = "animation", xc = /* @__PURE__ */ Symbol("_vtc"), Sc = {
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
}, Cc = /* @__PURE__ */ l({}, Gr, Sc), wc = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Cc, e))((e, { slots: t }) => tc(Yr, Dc(e), t)), Tc = (e, t = []) => {
	p(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Ec = (e) => e ? p(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Dc(e) {
	let t = {};
	for (let n in e) n in Sc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: u = o, appearToClass: d = s, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Oc(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: ee = b } = t, T = (e, t, n, r) => {
		e._enterCancelled = r, jc(e, t ? d : s), jc(e, t ? u : o), n && n();
	}, E = (e, t) => {
		e._isLeaving = !1, jc(e, f), jc(e, m), jc(e, p), t && t();
	}, D = (e) => (t, n) => {
		let i = e ? w : y, o = () => T(t, e, n);
		Tc(i, [t, o]), Mc(() => {
			jc(t, e ? c : a), Ac(t, e ? d : s), Ec(i) || Pc(t, r, g, o);
		});
	};
	return l(t, {
		onBeforeEnter(e) {
			Tc(v, [e]), Ac(e, a), Ac(e, o);
		},
		onBeforeAppear(e) {
			Tc(C, [e]), Ac(e, c), Ac(e, u);
		},
		onEnter: D(!1),
		onAppear: D(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => E(e, t);
			Ac(e, f), e._enterCancelled ? (Ac(e, p), Rc(e)) : (Rc(e), Ac(e, p)), Mc(() => {
				e._isLeaving && (jc(e, f), Ac(e, m), Ec(x) || Pc(e, r, _, n));
			}), Tc(x, [e, n]);
		},
		onEnterCancelled(e) {
			T(e, !1, void 0, !0), Tc(b, [e]);
		},
		onAppearCancelled(e) {
			T(e, !0, void 0, !0), Tc(ee, [e]);
		},
		onLeaveCancelled(e) {
			E(e), Tc(S, [e]);
		}
	});
}
function Oc(e) {
	if (e == null) return null;
	if (x(e)) return [kc(e.enter), kc(e.leave)];
	{
		let t = kc(e);
		return [t, t];
	}
}
function kc(e) {
	return ce(e);
}
function Ac(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[xc] || (e[xc] = /* @__PURE__ */ new Set())).add(t);
}
function jc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[xc];
	n && (n.delete(t), n.size || (e[xc] = void 0));
}
function Mc(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Nc = 0;
function Pc(e, t, n, r) {
	let i = e._endId = ++Nc, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Fc(e, t);
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
function Fc(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${yc}Delay`), a = r(`${yc}Duration`), o = Ic(i, a), s = r(`${bc}Delay`), c = r(`${bc}Duration`), l = Ic(s, c), u = null, d = 0, f = 0;
	t === yc ? o > 0 && (u = yc, d = o, f = a.length) : t === bc ? l > 0 && (u = bc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? yc : bc : null, f = u ? u === yc ? a.length : c.length : 0);
	let p = u === yc && /\b(?:transform|all)(?:,|$)/.test(r(`${yc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Ic(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Lc(t) + Lc(e[n])));
}
function Lc(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Rc(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function zc(e, t, n) {
	let r = e[xc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Bc = /* @__PURE__ */ Symbol("_vod"), Vc = /* @__PURE__ */ Symbol("_vsh"), Hc = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[Bc] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Uc(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Uc(e, !0), r.enter(e)) : r.leave(e, () => {
			Uc(e, !1);
		}) : Uc(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Uc(e, t);
	}
};
function Uc(e, t) {
	e.style.display = t ? e[Bc] : "none", e[Vc] = !t;
}
function Wc() {
	Hc.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var Gc = /* @__PURE__ */ Symbol("");
function Kc(e) {
	let t = Ps();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => Jc(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? Jc(t.ce, r) : qc(t.subTree, r), n(r);
	};
	Ji(() => {
		Qn(r);
	}), qi(() => {
		Cr(r, a, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), Zi(() => e.disconnect());
	});
}
function qc(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			qc(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) Jc(e.el, t);
	else if (e.type === z) e.children.forEach((e) => qc(e, t));
	else if (e.type === is) {
		let { el: n, anchor: r } = e;
		for (; n && (Jc(n, t), n !== r);) n = n.nextSibling;
	}
}
function Jc(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = De(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[Gc] = r;
	}
}
var Yc = /(?:^|;)\s*display\s*:/;
function Xc(e, t, n) {
	let r = e.style, i = y(n), a = !1;
	if (n && !i) {
		if (t) if (y(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Qc(r, t, "");
		}
		else for (let e in t) n[e] ?? Qc(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Qc(r, i, "") : nl(e, i, !y(t) && t ? t[i] : void 0, o) || Qc(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Gc];
			e && (n += ";" + e), r.cssText = n, a = Yc.test(n);
		}
	} else t && e.removeAttribute("style");
	Bc in e && (e[Bc] = a ? r.display : "", e[Vc] && (r.display = "none"));
}
var Zc = /\s*!important$/;
function Qc(e, t, n) {
	if (p(n)) n.forEach((n) => Qc(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = tl(e, t);
		Zc.test(n) ? e.setProperty(k(r), n.replace(Zc, ""), "important") : e[r] = n;
	}
}
var $c = [
	"Webkit",
	"Moz",
	"ms"
], el = {};
function tl(e, t) {
	let n = el[t];
	if (n) return n;
	let r = O(t);
	if (r !== "filter" && r in e) return el[t] = r;
	r = ie(r);
	for (let n = 0; n < $c.length; n++) {
		let i = $c[n] + r;
		if (i in e) return el[t] = i;
	}
	return t;
}
function nl(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && y(r) && n === r;
}
var rl = "http://www.w3.org/1999/xlink";
function il(e, t, n, r, i, a = ye(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(rl, t.slice(6, t.length)) : e.setAttributeNS(rl, t, n) : n == null || a && !be(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : b(n) ? String(n) : n);
}
function al(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? pc(n) : n);
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
function ol(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function sl(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var cl = /* @__PURE__ */ Symbol("_vei");
function ll(e, t, n, r, i = null) {
	let a = e[cl] || (e[cl] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = fl(t);
		r ? ol(e, n, a[t] = gl(r, i), s) : o && (sl(e, n, o, s), a[t] = void 0);
	}
}
var ul = /(Once|Passive|Capture)$/, dl = /^on:?(?:Once|Passive|Capture)$/;
function fl(e) {
	let t, n;
	for (; (n = e.match(ul)) && !dl.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : k(e.slice(2)), t];
}
var pl = 0, ml = /* @__PURE__ */ Promise.resolve(), hl = () => pl ||= (ml.then(() => pl = 0), Date.now());
function gl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (p(r)) {
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
	return n.value = e, n.attached = hl(), n;
}
var _l = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, vl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? zc(e, r, o) : t === "style" ? Xc(e, n, r) : s(t) ? c(t) || ll(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : yl(e, t, r, o)) ? (al(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && il(e, t, r, o, a, t !== "value")) : e._isVueCE && (bl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !y(r))) ? al(e, O(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), il(e, t, r, o));
};
function yl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && _l(t) && v(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return _l(t) && y(n) ? !1 : t in e;
}
function bl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = O(t);
	return Array.isArray(n) ? n.some((e) => O(e) === r) : Object.keys(n).some((e) => O(e) === r);
}
var xl = {};
// @__NO_SIDE_EFFECTS__
function Sl(e, t, n) {
	let r = /* @__PURE__ */ ni(e, t);
	T(r) && (r = l({}, r, t));
	class i extends Tl {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Cl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ Sl(e, t, hu)), wl = typeof HTMLElement < "u" ? HTMLElement : class {}, Tl = class e extends wl {
	constructor(e, t = {}, n = mu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== mu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(l({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
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
			if (n && !p(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = ce(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[O(e)] = !0);
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
		if (t) for (let e in t) f(this, e) || Object.defineProperty(this, e, { get: () => ln(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = p(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(O)) Object.defineProperty(this, e, {
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
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : xl, r = O(e);
		t && this._numberProps && this._numberProps[r] && (n = ce(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === xl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(k(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(k(e), t + "") : t || this.removeAttribute(k(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), fu(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = V(this._def, l(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, T(t[0]) ? l({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), k(e) !== e && t(k(e), n);
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
function El(e) {
	let t = Ps();
	return t && t.ce || null;
}
function Dl() {
	let e = El();
	return e && e.shadowRoot;
}
function Ol(e = "$style") {
	{
		let t = Ps();
		if (!t) return r;
		let n = t.type.__cssModules;
		return n && n[e] || r;
	}
}
var kl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakMap(), jl = /* @__PURE__ */ Symbol("_moveCb"), Ml = /* @__PURE__ */ Symbol("_enterCb"), Nl = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ l({}, Cc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Ps(), r = Ur(), i, a;
		return Yi(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!Rl(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(Pl), i.forEach(Fl);
			let r = i.filter(Il);
			Rc(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				Ac(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[jl] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[jl] = null, jc(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ I(e), s = Dc(o), c = o.tag || z;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[Vc] && (i.push(t), ei(t, Zr(t, s, r, n)), kl.set(t, Ll(t.el)));
			}
			a = t.default ? ti(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && ei(t, Zr(t, s, r, n));
			}
			return V(c, null, a);
		};
	}
});
function Pl(e) {
	let t = e.el;
	t[jl] && t[jl](), t[Ml] && t[Ml]();
}
function Fl(e) {
	Al.set(e, Ll(e.el));
}
function Il(e) {
	let t = kl.get(e), n = Al.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function Ll(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function Rl(e, t, n) {
	let r = e.cloneNode(), i = e[xc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = Fc(r);
	return a.removeChild(r), o;
}
var zl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return p(t) ? (e) => ae(t, e) : t;
};
function Bl(e) {
	e.target.composing = !0;
}
function Vl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Hl = /* @__PURE__ */ Symbol("_assign");
function Ul(e, t, n) {
	return t && (e = e.trim()), n && (e = se(e)), e;
}
var Wl = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Hl] = zl(i);
		let a = r || i.props && i.props.type === "number";
		ol(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Hl](Ul(e.value, n, a));
		}), (n || a) && ol(e, "change", () => {
			e.value = Ul(e.value, n, a);
		}), t || (ol(e, "compositionstart", Bl), ol(e, "compositionend", Vl), ol(e, "change", Vl));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Hl] = zl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? se(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Gl = {
	deep: !0,
	created(e, t, n) {
		e[Hl] = zl(n), ol(e, "change", () => {
			let t = e._modelValue, n = Xl(e), r = e.checked, i = e[Hl];
			if (p(t)) {
				let e = Ce(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (h(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Zl(e, r));
		});
	},
	mounted: Kl,
	beforeUpdate(e, t, n) {
		e[Hl] = zl(n), Kl(e, t, n);
	}
};
function Kl(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (p(t)) i = Ce(t, r.props.value) > -1;
	else if (h(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Se(t, Zl(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var ql = {
	created(e, { value: t }, n) {
		e.checked = Se(t, n.props.value), e[Hl] = zl(n), ol(e, "change", () => {
			e[Hl](Xl(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Hl] = zl(r), t !== n && (e.checked = Se(t, r.props.value));
	}
}, Jl = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, ol(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(Xl(e)) : Xl(e));
			e[Hl](e.multiple ? h(e._modelValue) ? new Set(t) : t : t[0]), e._assigning = !0, Jn(() => {
				e._assigning = !1;
			});
		}), e[Hl] = zl(r);
	},
	mounted(e, { value: t }) {
		Yl(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Hl] = zl(n);
	},
	updated(e, { value: t }) {
		e._assigning || Yl(e, t);
	}
};
function Yl(e, t) {
	let n = e.multiple, r = p(t);
	if (!(n && !r && !h(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Xl(a);
			if (n) if (r) {
				let e = typeof o;
				a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Ce(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Se(Xl(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Xl(e) {
	return "_value" in e ? e._value : e.value;
}
function Zl(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ql = {
	created(e, t, n) {
		eu(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		eu(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		eu(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		eu(e, t, n, r, "updated");
	}
};
function $l(e, t) {
	switch (e) {
		case "SELECT": return Jl;
		case "TEXTAREA": return Wl;
		default: switch (t) {
			case "checkbox": return Gl;
			case "radio": return ql;
			default: return Wl;
		}
	}
}
function eu(e, t, n, r, i) {
	let a = $l(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function tu() {
	Wl.getSSRProps = ({ value: e }) => ({ value: e }), ql.getSSRProps = ({ value: e }, t) => {
		if (t.props && Se(t.props.value, e)) return { checked: !0 };
	}, Gl.getSSRProps = ({ value: e }, t) => {
		if (p(e)) {
			if (t.props && Ce(e, t.props.value) > -1) return { checked: !0 };
		} else if (h(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, Ql.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = $l(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var nu = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], ru = {
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
	exact: (e, t) => nu.some((n) => e[`${n}Key`] && !t.includes(n))
}, iu = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = ru[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, au = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, ou = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = k(n.key);
		if (t.some((e) => e === r || au[e] === r)) return e(n);
	}));
}, su = /* @__PURE__ */ l({ patchProp: vl }, vc), cu, lu = !1;
function uu() {
	return cu ||= No(su);
}
function du() {
	return cu = lu ? cu : Po(su), lu = !0, cu;
}
var fu = ((...e) => {
	uu().render(...e);
}), pu = ((...e) => {
	du().hydrate(...e);
}), mu = ((...e) => {
	let t = uu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = _u(e);
		if (!r) return;
		let i = t._component;
		!v(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, gu(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), hu = ((...e) => {
	let t = du().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = _u(e);
		if (t) return n(t, !0, gu(t));
	}, t;
});
function gu(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function _u(e) {
	return y(e) ? document.querySelector(e) : e;
}
var vu = !1, yu = () => {
	vu || (vu = !0, tu(), Wc());
}, bu = /* @__PURE__ */ t({
	BaseTransition: () => Yr,
	BaseTransitionPropsValidators: () => Gr,
	Comment: () => B,
	DeprecationTypes: () => null,
	EffectScope: () => Oe,
	ErrorCodes: () => Fn,
	ErrorTypeStrings: () => sc,
	Fragment: () => z,
	KeepAlive: () => Ii,
	ReactiveEffect: () => Ne,
	Static: () => is,
	Suspense: () => Ko,
	Teleport: () => Rr,
	Text: () => rs,
	TrackOpTypes: () => Sn,
	Transition: () => wc,
	TransitionGroup: () => Nl,
	TriggerOpTypes: () => Cn,
	VueElement: () => Tl,
	assertNumber: () => Pn,
	callWithAsyncErrorHandling: () => Rn,
	callWithErrorHandling: () => Ln,
	camelize: () => O,
	capitalize: () => ie,
	cloneVNode: () => Ss,
	compatUtils: () => null,
	compile: () => xu,
	computed: () => ec,
	createApp: () => mu,
	createBlock: () => ps,
	createCommentVNode: () => Ts,
	createElementBlock: () => fs,
	createElementVNode: () => ys,
	createHydrationRenderer: () => Po,
	createPropsRestProxy: () => Na,
	createRenderer: () => No,
	createSSRApp: () => hu,
	createSlots: () => da,
	createStaticVNode: () => ws,
	createTextVNode: () => Cs,
	createVNode: () => V,
	customRef: () => mn,
	defineAsyncComponent: () => Ni,
	defineComponent: () => ni,
	defineCustomElement: () => Sl,
	defineEmits: () => xa,
	defineExpose: () => Sa,
	defineModel: () => Ta,
	defineOptions: () => Ca,
	defineProps: () => ba,
	defineSSRCustomElement: () => Cl,
	defineSlots: () => wa,
	devtools: () => cc,
	effect: () => Ke,
	effectScope: () => ke,
	getCurrentInstance: () => Ps,
	getCurrentScope: () => Ae,
	getCurrentWatcher: () => Dn,
	getTransitionRawChildren: () => ti,
	guardReactiveProps: () => xs,
	h: () => tc,
	handleError: () => zn,
	hasInjectionContext: () => _r,
	hydrate: () => pu,
	hydrateOnIdle: () => Ei,
	hydrateOnInteraction: () => Ai,
	hydrateOnMediaQuery: () => ki,
	hydrateOnVisible: () => Oi,
	initCustomFormatter: () => nc,
	initDirectivesForSSR: () => yu,
	inject: () => gr,
	isMemoSame: () => ic,
	isProxy: () => $t,
	isReactive: () => Xt,
	isReadonly: () => Zt,
	isRef: () => L,
	isRuntimeOnly: () => qs,
	isShallow: () => Qt,
	isVNode: () => ms,
	markRaw: () => en,
	mergeDefaults: () => ja,
	mergeModels: () => Ma,
	mergeProps: () => ks,
	nextTick: () => Jn,
	nodeOps: () => vc,
	normalizeClass: () => ge,
	normalizeProps: () => _e,
	normalizeStyle: () => M,
	onActivated: () => Ri,
	onBeforeMount: () => Ki,
	onBeforeUnmount: () => Xi,
	onBeforeUpdate: () => Ji,
	onDeactivated: () => zi,
	onErrorCaptured: () => ta,
	onMounted: () => qi,
	onRenderTracked: () => ea,
	onRenderTriggered: () => $i,
	onScopeDispose: () => je,
	onServerPrefetch: () => Qi,
	onUnmounted: () => Zi,
	onUpdated: () => Yi,
	onWatcherCleanup: () => On,
	openBlock: () => ss,
	patchProp: () => vl,
	popScopeId: () => ur,
	provide: () => hr,
	proxyRefs: () => fn,
	pushScopeId: () => lr,
	queuePostFlushCb: () => Qn,
	reactive: () => Gt,
	readonly: () => qt,
	ref: () => rn,
	registerRuntimeCompiler: () => Ks,
	render: () => fu,
	renderList: () => ua,
	renderSlot: () => fa,
	resolveComponent: () => ia,
	resolveDirective: () => sa,
	resolveDynamicComponent: () => oa,
	resolveFilter: () => null,
	resolveTransitionHooks: () => Zr,
	setBlockTracking: () => us,
	setDevtoolsHook: () => lc,
	setTransitionHooks: () => ei,
	shallowReactive: () => Kt,
	shallowReadonly: () => Jt,
	shallowRef: () => an,
	ssrContextKey: () => vr,
	ssrUtils: () => uc,
	stop: () => qe,
	toDisplayString: () => we,
	toHandlerKey: () => A,
	toHandlers: () => ma,
	toRaw: () => I,
	toRef: () => vn,
	toRefs: () => hn,
	toValue: () => un,
	transformVNodeArgs: () => gs,
	triggerRef: () => cn,
	unref: () => ln,
	useAttrs: () => Oa,
	useCssModule: () => Ol,
	useCssVars: () => Kc,
	useHost: () => El,
	useId: () => ri,
	useModel: () => eo,
	useSSRContext: () => yr,
	useShadowRoot: () => Dl,
	useSlots: () => Da,
	useTemplateRef: () => ai,
	useTransitionState: () => Ur,
	vModelCheckbox: () => Gl,
	vModelDynamic: () => Ql,
	vModelRadio: () => ql,
	vModelSelect: () => Jl,
	vModelText: () => Wl,
	vShow: () => Hc,
	version: () => ac,
	warn: () => oc,
	watch: () => Cr,
	watchEffect: () => br,
	watchPostEffect: () => xr,
	watchSyncEffect: () => Sr,
	withAsyncContext: () => Pa,
	withCtx: () => fr,
	withDefaults: () => Ea,
	withDirectives: () => pr,
	withKeys: () => ou,
	withMemo: () => rc,
	withModifiers: () => iu,
	withScopeId: () => dr
}), xu = () => {}, Su = typeof window < "u", Cu = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), wu = (e, t, n) => Tu({
	l: e,
	k: t,
	s: n
}), Tu = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), U = (e) => typeof e == "number" && isFinite(e), Eu = (e) => Iu(e) === "[object Date]", Du = (e) => Iu(e) === "[object RegExp]", Ou = (e) => Z(e) && Object.keys(e).length === 0, W = Object.assign, ku = Object.create, G = (e = null) => ku(e), Au, ju = () => Au ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : G(), Mu = Object.prototype.hasOwnProperty;
function Nu(e, t) {
	return Mu.call(e, t);
}
var K = Array.isArray, q = (e) => typeof e == "function", J = (e) => typeof e == "string", Y = (e) => typeof e == "boolean", X = (e) => typeof e == "object" && !!e, Pu = (e) => X(e) && q(e.then) && q(e.catch), Fu = Object.prototype.toString, Iu = (e) => Fu.call(e), Z = (e) => Iu(e) === "[object Object]", Lu = (e) => e == null ? "" : K(e) || Z(e) && e.toString === Fu ? JSON.stringify(e, null, 2) : String(e);
function Ru(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
function zu(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
function Bu(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Vu(e) {
	return e.replace(/&(?![a-z0-9#]{2,6};)/gi, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Hu = /^javascript:/i, Uu = /^(?:href|src|action|formaction)$/i, Wu = /&#(?:x([0-9a-f]+)|(\d+));?/gi, Gu = /&(?:Tab|NewLine);/g, Ku = /&colon;?/gi, qu = /[\u0000-\u0020\u007f-\u009f]/g, Ju = /(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i, Yu = /(^|[\s"'<>/])on(\w+\s*=)/gi, Xu = /(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;
function Zu(e, t, n) {
	let r = t || n;
	if (!r) return e;
	let i = Number.parseInt(r, t ? 16 : 10);
	return i <= 127 ? String.fromCharCode(i) : e;
}
function Qu(e) {
	let t = e.replace(Wu, Zu).replace(Gu, "").replace(Ku, ":").replace(qu, "");
	return Hu.test(t);
}
function $u(e) {
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
		n += e.slice(r, a), n += Qu(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function ed(e, t) {
	return Uu.test(e) && Qu(t) ? "about:blank" : Vu(e.toLowerCase() === "style" ? $u(t) : t);
}
function td(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${ed(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${ed(t, n)}'`), Ju.test(e) && (e = e.replace(Yu, "$1&#111;n$2")), e = e.replace(Xu, (e, t, n, r) => Qu(r) ? `${t}${n}about:blank` : e), e;
}
var nd = (e) => !X(e) || K(e);
function rd(e, t) {
	if (nd(e) || nd(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (X(e[r]) && !X(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : G()), nd(t[r]) || nd(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+message-compiler@11.4.8/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function id(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function ad(e, t, n) {
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
function od(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = SyntaxError(String(e));
	return o.code = e, t && (o.location = t), o.domain = r, o;
}
function sd(e) {
	throw e;
}
var cd = " ", ld = "\r", ud = "\n", dd = "\u2028", fd = "\u2029";
function pd(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === ld && t[e + 1] === ud, s = (e) => t[e] === ud, c = (e) => t[e] === fd, l = (e) => t[e] === dd, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? ud : t[e], g = () => h(n), _ = () => h(n + a);
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
var md = void 0, hd = "'", gd = "tokenizer";
function _d(e, t = {}) {
	let n = t.location !== !1, r = pd(e), i = () => r.index(), a = () => id(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
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
			let r = od(e, n ? ad(a.startLoc, t) : null, {
				domain: gd,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = ad(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(Q.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === cd || e.currentPeek() === ud;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === md) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === md) return !1;
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
		let r = e.currentPeek() === hd;
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
	function ee(e, t) {
		let { currentType: n } = t;
		if (n !== 9) return !1;
		let r = () => {
			let t = e.currentPeek();
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === cd || !t ? !1 : t === ud ? (e.peek(), r()) : E(e, !1);
		}, i = r();
		return e.resetPeek(), i;
	}
	function T(e) {
		h(e);
		let t = e.currentPeek() === "|";
		return e.resetPeek(), t;
	}
	function E(e, t = !0) {
		let n = (t = !1, r = "") => {
			let i = e.currentPeek();
			return i === "{" || i === "@" || !i ? t : i === "|" ? r !== cd && r !== ud : i === cd ? (e.peek(), n(!0, cd)) : i !== ud || (e.peek(), n(!0, ud));
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function D(e, t) {
		let n = e.currentChar();
		if (n !== md) return t(n) ? (e.next(), n) : null;
	}
	function te(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function ne(e) {
		return D(e, te);
	}
	function O(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function re(e) {
		return D(e, O);
	}
	function k(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function ie(e) {
		return D(e, k);
	}
	function A(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function j(e) {
		return D(e, A);
	}
	function ae(e) {
		let t = "", n = "";
		for (; t = ie(e);) n += t;
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
			else if (n === cd || n === ud) if (E(e)) t += n, e.next();
			else if (T(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function se(e) {
		g(e);
		let t = "", n = "";
		for (; t = re(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== md && r !== cd && r !== ud && r !== "　") {
			let t = pe(e);
			return d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === md && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function ce(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${ae(e)}`) : t += ae(e), e.currentChar() === md && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function le(e) {
		return e !== hd && e !== ud;
	}
	function ue(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = D(e, le);) n += t === "\\" ? de(e) : t;
		let r = e.currentChar();
		return r === ud || r === md ? (d(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === ud && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function de(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return M(e, t, 4);
			case "U": return M(e, t, 6);
			default: return d(Q.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function M(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = j(e);
			if (!n) {
				d(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function fe(e) {
		return e !== "{" && e !== "}" && e !== cd && e !== ud;
	}
	function pe(e) {
		g(e);
		let t = "", n = "";
		for (; t = D(e, fe);) n += t;
		return n;
	}
	function me(e) {
		let t = "", n = "";
		for (; t = ne(e);) n += t;
		return n;
	}
	function he(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === cd ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function ge(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function _e(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(Q.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(Q.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = ve(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (T(e)) return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, ge(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, ye(e, t);
				if (r = y(e, t)) return n = f(t, 4, se(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, ce(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, ue(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, pe(e)), d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function ve(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === ud || i === cd) && d(Q.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return T(e) ? (r = f(t, 1, ge(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), ve(e, t)) : C(e, t) ? (g(e), f(t, 11, me(e))) : ee(e, t) ? (g(e), i === "{" ? _e(e, t) || r : f(t, 10, he(e))) : (n === 7 && d(Q.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, ye(e, t));
		}
	}
	function ye(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return _e(e, t) || p(t);
		if (t.inLinked) return ve(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return _e(e, t) || p(t);
			case "}": return d(Q.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return ve(e, t) || p(t);
			default:
				if (T(e)) return n = f(t, 1, ge(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (E(e)) return f(t, 0, oe(e));
		}
		return n;
	}
	function be() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === md ? f(c, 13) : ye(r, c);
	}
	return {
		nextToken: be,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var vd = "parser", yd = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, bd = /\\([\\@{}|])/g;
function xd(e, t) {
	return t;
}
function Sd(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function Cd(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = od(r, t ? ad(i, s) : null, {
				domain: vd,
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
		return r.value = t.replace(bd, xd), a(r, e.currentOffset(), e.currentPosition()), r;
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
		return o.value = t.replace(yd, Sd), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, wd(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
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
		switch (o.type !== 9 && r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(o)), n.key = l(e, o.value || "");
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
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, wd(i)), n.items.push(l(e, i.value || ""));
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
		let o = _d(n, W({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Q.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function wd(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Td(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function Ed(e, t) {
	for (let n = 0; n < e.length; n++) Dd(e[n], t);
}
function Dd(e, t) {
	switch (e.type) {
		case 1:
			Ed(e.cases, t), t.helper("plural");
			break;
		case 2:
			Ed(e.items, t);
			break;
		case 6:
			Dd(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4: t.helper("interpolate"), t.helper("named");
	}
}
function Od(e, t = {}) {
	let n = Td(e);
	n.helper("normalize"), e.body && Dd(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function kd(e) {
	let t = e.body;
	return t.type === 2 ? Ad(t) : t.cases.forEach((e) => Ad(e)), e;
}
function Ad(e) {
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
			e.static = Ru(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
function jd(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			jd(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) jd(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) jd(n[e]);
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
			jd(t.key), t.k = t.key, delete t.key, t.modifier && (jd(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Md(e, t) {
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
function Nd(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), Ld(e, t.key), t.modifier ? (e.push(", "), Ld(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Pd(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (Ld(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function Fd(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (Ld(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function Id(e, t) {
	t.body ? Ld(e, t.body) : e.push("null");
}
function Ld(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			Id(e, t);
			break;
		case 1:
			Fd(e, t);
			break;
		case 2:
			Pd(e, t);
			break;
		case 6:
			Nd(e, t);
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
var Rd = (e, t = {}) => {
	let n = J(t.mode) ? t.mode : "normal", r = J(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = Md(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${Ru(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), Ld(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function zd(e, t = {}) {
	let n = W({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = Cd(n).parse(e);
	return r ? (a && kd(o), i && jd(o), {
		ast: o,
		code: ""
	}) : (Od(o, n), Rd(o, n));
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+core-base@11.4.8/node_modules/@intlify/core-base/dist/core-base.mjs
function Bd() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ju().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ju().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Vd(e) {
	return X(e) && Zd(e) === 0 && (Nu(e, "b") || Nu(e, "body"));
}
var Hd = ["b", "body"];
function Ud(e) {
	return af(e, Hd);
}
var Wd = ["c", "cases"];
function Gd(e) {
	return af(e, Wd, []);
}
var Kd = ["s", "static"];
function qd(e) {
	return af(e, Kd);
}
var Jd = ["i", "items"];
function Yd(e) {
	return af(e, Jd, []);
}
var Xd = ["t", "type"];
function Zd(e) {
	return af(e, Xd);
}
var Qd = ["v", "value"];
function $d(e, t) {
	let n = af(e, Qd);
	if (n != null) return n;
	throw sf(t);
}
var ef = ["m", "modifier"];
function tf(e) {
	return af(e, ef);
}
var nf = ["k", "key"];
function rf(e) {
	let t = af(e, nf);
	if (t) return t;
	throw sf(6);
}
function af(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Nu(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var of = [
	...Hd,
	...Wd,
	...Kd,
	...Jd,
	...nf,
	...ef,
	...Qd,
	...Xd
];
function sf(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function cf(e) {
	return (t) => lf(t, e);
}
function lf(e, t) {
	let n = Ud(t);
	if (n == null) throw sf(0);
	if (Zd(n) === 1) {
		let t = Gd(n);
		return e.plural(t.reduce((t, n) => [...t, uf(e, n)], []));
	}
	return uf(e, n);
}
function uf(e, t) {
	let n = qd(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = Yd(t).reduce((t, n) => [...t, df(e, n)], []);
		return e.normalize(n);
	}
}
function df(e, t) {
	let n = Zd(t);
	switch (n) {
		case 3: return $d(t, n);
		case 9: return $d(t, n);
		case 4: {
			let r = t;
			if (Nu(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (Nu(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw sf(n);
		}
		case 5: {
			let r = t;
			if (Nu(r, "i") && U(r.i)) return e.interpolate(e.list(r.i));
			if (Nu(r, "index") && U(r.index)) return e.interpolate(e.list(r.index));
			throw sf(n);
		}
		case 6: {
			let n = t, r = tf(n), i = rf(n);
			return e.linked(df(e, i), r ? df(e, r) : void 0, e.type);
		}
		case 7: return $d(t, n);
		case 8: return $d(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var ff = (e) => e, pf = G();
function mf(e, t = {}) {
	let n = !1, r = t.onError || sd;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...zd(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function hf(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && J(e)) {
		Y(t.warnHtmlMessage) && t.warnHtmlMessage;
		let n = (t.onCacheKey || ff)(e), r = pf[n];
		if (r) return r;
		let { ast: i, detectError: a } = mf(e, {
			...t,
			location: !1,
			jit: !0
		}), o = cf(i);
		return a ? o : pf[n] = o;
	}
	{
		let t = e.cacheKey;
		return t ? pf[t] || (pf[t] = cf(e)) : cf(e);
	}
}
var gf = null;
function _f(e) {
	gf = e;
}
function vf(e, t, n) {
	gf && gf.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var yf = /* #__PURE__*/ bf("function:translate");
function bf(e) {
	return (t) => gf && gf.emit(e, t);
}
var xf = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function Sf(e) {
	return od(e, null, void 0);
}
xf.INVALID_ARGUMENT, xf.INVALID_DATE_ARGUMENT, xf.INVALID_ISO_DATE_ARGUMENT, xf.NOT_SUPPORT_NON_STRING_MESSAGE, xf.NOT_SUPPORT_LOCALE_PROMISE_VALUE, xf.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, xf.NOT_SUPPORT_LOCALE_TYPE;
function Cf(e, t) {
	return t.locale == null ? Tf(e.locale) : Tf(t.locale);
}
var wf;
function Tf(e) {
	if (J(e)) return e;
	if (q(e)) {
		if (e.resolvedOnce && wf != null) return wf;
		if (e.constructor.name === "Function") {
			let t = e();
			if (Pu(t)) throw Sf(xf.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return wf = t;
		}
		throw Sf(xf.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	}
	throw Sf(xf.NOT_SUPPORT_LOCALE_TYPE);
}
function Ef(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...K(t) ? t : X(t) ? Object.keys(t) : J(t) ? [t] : [n]])];
}
function Df(e, t, n) {
	let r = J(n) ? n : Uf, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; K(e);) e = Of(a, e, t);
		let o = K(t) || !Z(t) ? t : t.default ? t.default : null;
		e = J(o) ? [o] : o, K(e) && Of(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function Of(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && Y(r); i++) {
		let a = t[i];
		J(a) && (r = kf(e, t[i], n));
	}
	return r;
}
function kf(e, t, n) {
	let r, i = t.split("-");
	do
		r = Af(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function Af(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (K(n) || Z(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var jf = [];
jf[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, jf[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, jf[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, jf[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, jf[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, jf[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, jf[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var Mf = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Nf(e) {
	return Mf.test(e);
}
function Pf(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Ff(e) {
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
function If(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Nf(t) ? Pf(t) : "*" + t;
}
function Lf(e) {
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
			if (i = 0, o === void 0 || (o = If(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = Ff(a), d = jf[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var Rf = /* @__PURE__ */ new Map();
function zf(e, t) {
	return X(e) ? e[t] : null;
}
function Bf(e, t) {
	if (!X(e)) return null;
	let n = Rf.get(t);
	if (n || (n = Lf(t), n && Rf.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (of.includes(e) && Vd(i) || !X(i) || !Nu(i, e)) return null;
		let t = i[e];
		if (t === void 0 || q(i)) return null;
		i = t, a++;
	}
	return i;
}
var Vf = {
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
Vf.NOT_FOUND_KEY, Vf.FALLBACK_TO_TRANSLATE, Vf.CANNOT_FORMAT_NUMBER, Vf.FALLBACK_TO_NUMBER_FORMAT, Vf.CANNOT_FORMAT_DATE, Vf.FALLBACK_TO_DATE_FORMAT, Vf.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, Vf.INVALID_NUMBER_ARGUMENT, Vf.INVALID_DATE_ARGUMENT;
var Hf = "11.4.8", Uf = "en-US", Wf = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Gf() {
	return {
		upper: (e, t) => t === "text" && J(e) ? e.toUpperCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && J(e) ? e.toLowerCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && J(e) ? Wf(e) : t === "vnode" && X(e) && "__v_isVNode" in e ? Wf(e.children) : e
	};
}
var Kf;
function qf(e) {
	Kf = e;
}
var Jf;
function Yf(e) {
	Jf = e;
}
var Xf;
function Zf(e) {
	Xf = e;
}
var Qf = null, $f = /* @__NO_SIDE_EFFECTS__ */ () => Qf, ep = null, tp = (e) => {
	ep = e;
}, np = () => ep, rp = 0;
function ip(e = {}) {
	let t = q(e.onWarn) ? e.onWarn : zu, n = J(e.version) ? e.version : Hf, r = J(e.locale) || q(e.locale) ? e.locale : Uf, i = q(r) ? Uf : r, a = K(e.fallbackLocale) || Z(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = Z(e.messages) ? e.messages : ap(i), s = Z(e.datetimeFormats) ? e.datetimeFormats : ap(i), c = Z(e.numberFormats) ? e.numberFormats : ap(i), l = W(G(), e.modifiers, Gf()), u = e.pluralRules || G(), d = q(e.missing) ? e.missing : null, f = Y(e.missingWarn) || Du(e.missingWarn) ? e.missingWarn : !0, p = Y(e.fallbackWarn) || Du(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = q(e.postTranslation) ? e.postTranslation : null, _ = Z(e.processor) ? e.processor : null, v = !Y(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = q(e.messageCompiler) ? e.messageCompiler : Kf, x = q(e.messageResolver) ? e.messageResolver : Jf || zf, S = q(e.localeFallbacker) ? e.localeFallbacker : Xf || Ef, C = X(e.fallbackContext) ? e.fallbackContext : void 0, w = e, ee = X(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), T = X(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), E = X(w.__meta) ? w.__meta : {};
	rp++;
	let D = {
		version: n,
		cid: rp,
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
		__meta: E
	};
	return D.datetimeFormats = s, D.numberFormats = c, D.__datetimeFormatters = ee, D.__numberFormatters = T, __INTLIFY_PROD_DEVTOOLS__ && vf(D, n, E), D;
}
var ap = (e) => ({ [e]: G() });
function op(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (a !== null) {
		let r = a(e, n, t, i);
		return J(r) ? r : t;
	}
	return t;
}
function sp(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function cp(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function lp(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (cp(e, t[r])) return !0;
	return !1;
}
function up(e, t, n, r, i, a, o) {
	let { fallbackLocale: s, localeFallbacker: c, onWarn: l } = e, u = c(e, s, n);
	for (let n = 0; n < u.length; n++) {
		let a = u[n], s = (r[a] || {})[t];
		if (Z(s) && J(a)) return a;
		op(e, t, a, i, o);
	}
	return null;
}
function dp(e, t, n) {
	let r = `${e}__${t}`;
	return Z(n) && !Ou(n) && (r = `${r}__${JSON.stringify(n)}`), r;
}
function fp(e, t, n) {
	for (let r in n) {
		let n = `${t}__${r}`;
		for (let t of e.keys()) (t === n || t.startsWith(`${n}__`)) && e.delete(t);
	}
}
function pp(e, t, n, r) {
	let [, i, a, o] = e, s = n;
	return J(i) ? t.key = i : Z(i) && Object.keys(i).forEach((e) => {
		r.includes(e) ? s[e] = i[e] : t[e] = i[e];
	}), J(a) ? t.locale = a : Z(a) && (s = a), Z(o) && (s = o), s;
}
var mp = typeof Intl < "u";
mp && Intl.DateTimeFormat, mp && Intl.NumberFormat;
function hp(e, ...t) {
	let { datetimeFormats: n, unresolving: r, onWarn: i } = e, { __datetimeFormatters: a } = e;
	if (!J(t[0]) && !Eu(t[0]) && !U(t[0])) return "";
	let [o, s, c, l] = _p(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Cf(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.DateTimeFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = up(e, o, p, n, u, d, "datetime format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = dp(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.DateTimeFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var gp = [
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
function _p(...e) {
	let [t] = e, n = G(), r = G(), i;
	if (J(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw Sf(xf.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		i = new Date(n);
		try {
			i.toISOString();
		} catch {
			throw Sf(xf.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (Eu(t)) {
		if (isNaN(t.getTime())) throw Sf(xf.INVALID_DATE_ARGUMENT);
		i = t;
	} else if (U(t)) i = t;
	else throw Sf(xf.INVALID_ARGUMENT);
	let a = pp(e, n, r, gp);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function vp(e, t, n) {
	fp(e.__datetimeFormatters, t, n);
}
function yp(e, ...t) {
	let { numberFormats: n, unresolving: r, onWarn: i } = e, { __numberFormatters: a } = e;
	if (!U(t[0])) return "";
	let [o, s, c, l] = xp(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Cf(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.NumberFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = up(e, o, p, n, u, d, "number format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = dp(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.NumberFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var bp = [
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
function xp(...e) {
	let [t] = e, n = G(), r = G();
	if (!U(t)) throw Sf(xf.INVALID_ARGUMENT);
	let i = t, a = pp(e, n, r, bp);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function Sp(e, t, n) {
	fp(e.__numberFormatters, t, n);
}
var Cp = (e) => e, wp = (e) => "", Tp = "text", Ep = (e) => e.length === 0 ? "" : Ru(e), Dp = Lu;
function Op(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function kp(e) {
	let t = U(e.pluralIndex) ? e.pluralIndex : -1;
	return U(e.named?.count) ? e.named.count : U(e.named?.n) ? e.named.n : t;
}
function Ap(e = {}) {
	let t = e.locale, n = kp(e), r = J(t) && q(e.pluralRules?.[t]) ? e.pluralRules[t] : Op, i = r === Op ? void 0 : Op, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || G();
	U(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (q(e.messages) ? e.messages(t, !!n) : X(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : wp);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : Cp, f = q(e.processor?.normalize) ? e.processor.normalize : Ep, p = q(e.processor?.interpolate) ? e.processor.interpolate : Dp, m = {
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
		type: J(e.processor?.type) ? e.processor.type : Tp,
		interpolate: p,
		normalize: f,
		values: W(G(), o, c)
	};
	return m;
}
var jp = () => "", Mp = (e) => q(e);
function Np(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = Rp(...t), u = Y(l.missingWarn) ? l.missingWarn : e.missingWarn, d = Y(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = Y(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = J(l.default) || Y(l.default) ? Y(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (J(m) || q(m)), g = Cf(e, l);
	f && Pp(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || G()
	] : Fp(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(J(b) || Vd(b) || Mp(b)) && h && (b = m, x = b), !p && (!(J(b) || Vd(b) || Mp(b)) || !J(v))) return i ? -1 : c;
	let S = !1, C = Mp(b) ? b : Ip(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = Lp(e, C, Ap(Bp(e, v, y, l))), ee = r ? r(w, c) : w;
	if (f && J(ee) && (ee = td(ee)), __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: J(c) ? c : Mp(b) ? b.key : "",
			locale: v || (Mp(b) ? b.locale : ""),
			format: J(b) ? b : Mp(b) ? b.source : "",
			message: ee
		};
		t.meta = W({}, e.__meta, /* @__PURE__ */ $f() || {}), yf(t);
	}
	return ee;
}
function Pp(e) {
	K(e.list) ? e.list = e.list.map((e) => J(e) ? Bu(e) : e) : X(e.named) && Object.keys(e.named).forEach((t) => {
		J(e.named[t]) && (e.named[t] = Bu(e.named[t]));
	});
}
function Fp(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = G(), f, p = null;
	for (let n = 0; n < u.length && (f = u[n], d = o[f] || G(), (p = c(d, t)) === null && (p = d[t]), !(J(p) || Vd(p) || Mp(p))); n++) if (!lp(f, u)) {
		let n = op(e, t, f, a, "translate");
		n !== t && (p = n);
	}
	return [
		p,
		f,
		d
	];
}
function Ip(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (Mp(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = o(r, zp(e, n, i, r, s, a));
	return c.locale = n, c.key = t, c.source = r, c;
}
function Lp(e, t, n) {
	return t(n);
}
function Rp(...e) {
	let [t, n, r] = e, i = G();
	if (!J(t) && !U(t) && !Mp(t) && !Vd(t)) throw Sf(xf.INVALID_ARGUMENT);
	let a = U(t) ? String(t) : (Mp(t), t);
	return U(n) ? i.plural = n : J(n) ? i.default = n : Z(n) && !Ou(n) ? i.named = n : K(n) && (i.list = n), U(r) ? i.plural = r : J(r) ? i.default = r : Z(r) && W(i, r), [a, i];
}
function zp(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (e) => {
			throw a && a(e), e;
		},
		onCacheKey: (e) => wu(t, n, e)
	};
}
function Bp(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = Fp(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (J(a) || Vd(a)) {
				let n = !1, i = Ip(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? jp : i;
			}
			return Mp(a) ? a : jp;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), U(r.plural) && (d.pluralIndex = r.plural), d;
}
Bd();
//#endregion
//#region ../../node_modules/.pnpm/vue-i18n@11.4.8_vue@3.5.40_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var Vp = "11.4.8";
function Hp() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (ju().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (ju().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ju().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ju().__INTLIFY_PROD_DEVTOOLS__ = !1);
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
function Up(e, ...t) {
	return od(e, null, void 0);
}
$.UNEXPECTED_RETURN_TYPE, $.INVALID_ARGUMENT, $.MUST_BE_CALL_SETUP_TOP, $.NOT_INSTALLED, $.UNEXPECTED_ERROR, $.REQUIRED_VALUE, $.INVALID_VALUE, $.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, $.NOT_INSTALLED_WITH_PROVIDE, $.NOT_COMPATIBLE_LEGACY_VUE_I18N, $.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
var Wp = /* #__PURE__*/ Cu("__translateVNode"), Gp = /* #__PURE__*/ Cu("__datetimeParts"), Kp = /* #__PURE__*/ Cu("__numberParts"), qp = Cu("__setPluralRules");
Cu("__intlifyMeta");
var Jp = /* #__PURE__*/ Cu("__injectWithOption"), Yp = /* #__PURE__*/ Cu("__dispose"), Xp = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
};
Xp.FALLBACK_TO_ROOT, Xp.NOT_FOUND_PARENT_SCOPE, Xp.IGNORE_OBJ_FLATTEN, Xp.DEPRECATE_LEGACY_MODE, Xp.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, Xp.DUPLICATE_USE_I18N_CALLING;
function Zp(e) {
	if (!X(e) || Vd(e)) return e;
	for (let t in e) if (Nu(e, t)) if (!t.includes(".")) X(e[t]) && Zp(e[t]);
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
		if (a || (Vd(i) ? of.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Vd(i)) {
			let e = i[n[r]];
			X(e) && Zp(e);
		}
	}
	return e;
}
function Qp(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = Z(n) ? n : K(r) ? G() : { [e]: G() };
	if (K(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || G(), rd(n, o[t])) : rd(n, o);
		} else J(e) && rd(JSON.parse(e), o);
	}), i == null && a) for (let e in o) Nu(o, e) && Zp(o[e]);
	return o;
}
function $p(e) {
	return e.type;
}
function em(e, t, n) {
	let r = X(t.messages) ? t.messages : G();
	"__i18nGlobal" in n && (r = Qp(e.locale.value, {
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
function tm(e) {
	return V(rs, null, e, 0);
}
function nm() {
	let e = "currentInstance";
	return e in bu ? bu[e] : Ps();
}
var rm = () => [], im = () => !1, am = 0;
function om(e) {
	return ((t, n, r, i) => e(n, r, nm() || void 0, i));
}
function sm(e = {}) {
	let { __root: t, __injectWithOption: n } = e, r = t === void 0, i = e.flatJson, a = Su ? rn : an, o = !Y(e.inheritLocale) || e.inheritLocale, s = a(t && o ? t.locale.value : J(e.locale) ? e.locale : Uf), c = a(t && o ? t.fallbackLocale.value : J(e.fallbackLocale) || K(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value), l = a(Qp(s.value, e)), u = a(Z(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }), d = a(Z(e.numberFormats) ? e.numberFormats : { [s.value]: {} }), f = t ? t.missingWarn : Y(e.missingWarn) || Du(e.missingWarn) ? e.missingWarn : !0, p = t ? t.fallbackWarn : Y(e.fallbackWarn) || Du(e.fallbackWarn) ? e.fallbackWarn : !0, m = t ? t.fallbackRoot : !Y(e.fallbackRoot) || e.fallbackRoot, h = !!e.fallbackFormat, g = q(e.missing) ? e.missing : null, _ = q(e.missing) ? om(e.missing) : null, v = q(e.postTranslation) ? e.postTranslation : null, y = t ? t.warnHtmlMessage : !Y(e.warnHtmlMessage) || e.warnHtmlMessage, b = !!e.escapeParameter, x = t ? t.modifiers : Z(e.modifiers) ? e.modifiers : {}, S = e.pluralRules || t && t.pluralRules, C;
	C = (() => {
		r && tp(null);
		let t = {
			version: Vp,
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
		let n = ip(t);
		return r && tp(n), n;
	})(), sp(C, s.value, c.value);
	function w() {
		return [
			s.value,
			c.value,
			l.value,
			u.value,
			d.value
		];
	}
	let ee = ec({
		get: () => s.value,
		set: (e) => {
			C.locale = e, s.value = e;
		}
	}), T = ec({
		get: () => c.value,
		set: (e) => {
			C.fallbackLocale = e, c.value = e, sp(C, s.value, e);
		}
	}), E = ec(() => l.value), D = /* #__PURE__*/ ec(() => u.value), te = /* #__PURE__*/ ec(() => d.value);
	function ne() {
		return q(v) ? v : null;
	}
	function O(e) {
		v = e, C.postTranslation = e;
	}
	function re() {
		return g;
	}
	function k(e) {
		e !== null && (_ = om(e)), g = e, C.missing = _;
	}
	let ie = (e, n, i, a, o, s) => {
		w();
		let c;
		try {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = t ? np() : void 0), c = e(C);
		} finally {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = void 0);
		}
		if (i !== "translate exists" && U(c) && c === -1 || i === "translate exists" && !c) {
			let [e, r] = n();
			return t && m ? a(t) : o(e);
		}
		if (s(c)) return c;
		/* istanbul ignore next */
		throw Up($.UNEXPECTED_RETURN_TYPE);
	};
	function A(...e) {
		return ie((t) => Reflect.apply(Np, null, [t, ...e]), () => Rp(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => J(e));
	}
	function j(...e) {
		let [t, n, r] = e;
		if (r && !X(r)) throw Up($.INVALID_ARGUMENT);
		return A(t, n, W({ resolvedMessage: !0 }, r || {}));
	}
	function ae(...e) {
		return ie((t) => Reflect.apply(hp, null, [t, ...e]), () => _p(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => J(e) || K(e));
	}
	function oe(...e) {
		return ie((t) => Reflect.apply(yp, null, [t, ...e]), () => xp(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => J(e) || K(e));
	}
	function se(e) {
		return e.map((e) => J(e) || U(e) || Y(e) ? tm(String(e)) : e);
	}
	let ce = {
		normalize: se,
		interpolate: (e) => e,
		type: "vnode"
	};
	function le(...e) {
		return ie((t) => {
			let n, r = t;
			try {
				r.processor = ce, n = Reflect.apply(Np, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => Rp(...e), "translate", (t) => t[Wp](...e), (e) => [tm(e)], (e) => K(e));
	}
	function ue(...e) {
		return ie((t) => Reflect.apply(yp, null, [t, ...e]), () => xp(...e), "number format", (t) => t[Kp](...e), rm, (e) => J(e) || K(e));
	}
	function de(...e) {
		return ie((t) => Reflect.apply(hp, null, [t, ...e]), () => _p(...e), "datetime format", (t) => t[Gp](...e), rm, (e) => J(e) || K(e));
	}
	function M(e) {
		S = e, C.pluralRules = S;
	}
	function fe(e, t) {
		return ie(() => {
			if (!e) return !1;
			let n = J(t) ? t : s.value, r = J(t) ? [n] : Df(C, c.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = he(r[t]), i = C.messageResolver(n, e);
				if (i === null && (i = n[e]), Vd(i) || Mp(i) || J(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), im, (e) => Y(e));
	}
	function pe(e) {
		let t = null, n = Df(C, c.value, s.value);
		for (let r = 0; r < n.length; r++) {
			let i = l.value[n[r]] || {}, a = C.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function me(e) {
		return pe(e) ?? (t && t.tm(e) || {});
	}
	function he(e) {
		return l.value[e] || {};
	}
	function ge(e, t) {
		if (i) {
			let n = { [e]: t };
			for (let e in n) Nu(n, e) && Zp(n[e]);
			t = n[e];
		}
		l.value[e] = t, C.messages = l.value;
	}
	function _e(e, t) {
		l.value[e] = l.value[e] || {};
		let n = { [e]: t };
		if (i) for (let e in n) Nu(n, e) && Zp(n[e]);
		t = n[e], rd(t, l.value[e]), C.messages = l.value;
	}
	function ve(e) {
		return u.value[e] || {};
	}
	function ye(e, t) {
		u.value[e] = t, C.datetimeFormats = u.value, vp(C, e, t);
	}
	function be(e, t) {
		u.value[e] = W(u.value[e] || {}, t), C.datetimeFormats = u.value, vp(C, e, t);
	}
	function xe(e) {
		return d.value[e] || {};
	}
	function Se(e, t) {
		d.value[e] = t, C.numberFormats = d.value, Sp(C, e, t);
	}
	function Ce(e, t) {
		d.value[e] = W(d.value[e] || {}, t), C.numberFormats = d.value, Sp(C, e, t);
	}
	am++, t && Su && (Cr(t.locale, (e) => {
		o && (s.value = e, C.locale = e, sp(C, s.value, c.value));
	}), Cr(t.fallbackLocale, (e) => {
		o && (c.value = e, C.fallbackLocale = e, sp(C, s.value, c.value));
	}));
	let N = {
		id: am,
		locale: ee,
		fallbackLocale: T,
		get inheritLocale() {
			return o;
		},
		set inheritLocale(e) {
			o = e, e && t && (s.value = t.locale.value, c.value = t.fallbackLocale.value, sp(C, s.value, c.value));
		},
		get availableLocales() {
			return Object.keys(l.value).sort();
		},
		messages: E,
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
		t: A,
		getLocaleMessage: he,
		setLocaleMessage: ge,
		mergeLocaleMessage: _e,
		getPostTranslationHandler: ne,
		setPostTranslationHandler: O,
		getMissingHandler: re,
		setMissingHandler: k,
		[qp]: M
	};
	return N.datetimeFormats = D, N.numberFormats = te, N.rt = j, N.te = fe, N.tm = me, N.d = ae, N.n = oe, N.getDateTimeFormat = ve, N.setDateTimeFormat = ye, N.mergeDateTimeFormat = be, N.getNumberFormat = xe, N.setNumberFormat = Se, N.mergeNumberFormat = Ce, N[Jp] = n, N[Wp] = le, N[Gp] = de, N[Kp] = ue, N;
}
function cm(e) {
	let t = J(e.locale) ? e.locale : Uf, n = J(e.fallbackLocale) || K(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = q(e.missing) ? e.missing : void 0, i = Y(e.silentTranslationWarn) || Du(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = Y(e.silentFallbackWarn) || Du(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, o = !Y(e.fallbackRoot) || e.fallbackRoot, s = !!e.formatFallbackMessages, c = Z(e.modifiers) ? e.modifiers : {}, l = e.pluralizationRules, u = q(e.postTranslation) ? e.postTranslation : void 0, d = !J(e.warnHtmlInMessage) || e.warnHtmlInMessage !== "off", f = !!e.escapeParameterHtml, p = !Y(e.sync) || e.sync, m = e.messages;
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
function lm(e = {}) {
	let t = sm(cm(e)), { __extender: n } = e, r = {
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
function um(e, t, n) {
	return {
		beforeCreate() {
			let r = nm();
			/* istanbul ignore if */
			if (!r) throw Up($.UNEXPECTED_ERROR);
			let i = this.$options;
			if (i.i18n) {
				let r = i.i18n;
				if (i.__i18n && (r.__i18n = i.__i18n), r.__root = t, this === this.$root) this.$i18n = dm(e, r);
				else {
					r.__injectWithOption = !0, r.__extender = n.__vueI18nExtend, this.$i18n = lm(r);
					let e = this.$i18n;
					e.__extender && (e.__disposer = e.__extender(this.$i18n));
				}
			} else if (i.__i18n) if (this === this.$root) this.$i18n = dm(e, i);
			else {
				this.$i18n = lm({
					__i18n: i.__i18n,
					__injectWithOption: !0,
					__extender: n.__vueI18nExtend,
					__root: t
				});
				let e = this.$i18n;
				e.__extender && (e.__disposer = e.__extender(this.$i18n));
			}
			else this.$i18n = e;
			i.__i18nGlobal && em(t, i, i), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = (e) => this.$i18n.tm(e), n.__setInstance(r, this.$i18n);
		},
		mounted() {},
		unmounted() {
			let e = nm();
			/* istanbul ignore if */
			if (!e) throw Up($.UNEXPECTED_ERROR);
			let t = this.$i18n;
			t && (delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, t?.__disposer && (t.__disposer(), delete t.__disposer, delete t.__extender), n.__deleteInstance(e), delete this.$i18n);
		}
	};
}
function dm(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[qp](t.pluralizationRules || e.pluralizationRules);
	let n = Qp(e.locale, {
		messages: t.messages,
		__i18n: t.__i18n
	});
	return Object.keys(n).forEach((t) => e.mergeLocaleMessage(t, n[t])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n) => e.mergeDateTimeFormat(n, t.datetimeFormats[n])), t.numberFormats && Object.keys(t.numberFormats).forEach((n) => e.mergeNumberFormat(n, t.numberFormats[n])), e;
}
var fm = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function pm({ slots: e }, t) {
	return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((e, t) => [...e, ...t.type === z ? t.children : [t]], []) : t.reduce((t, n) => {
		let r = e[n];
		return r && (t[n] = r()), t;
	}, G());
}
function mm() {
	return z;
}
var hm = /* @__PURE__ */ ni({
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
	}, fm),
	setup(e, t) {
		let { slots: n, attrs: r } = t, i = e.i18n || Em({
			useScope: e.scope,
			__useComponent: !0
		});
		return () => {
			let a = () => {
				let r = Object.keys(n).filter((e) => e[0] !== "_"), a = G();
				e.locale && (a.locale = e.locale), e.plural !== void 0 && (a.plural = J(e.plural) ? +e.plural : e.plural);
				let o = pm(t, r);
				return i[Wp](e.keypath, o, a);
			}, o = W(G(), r), s = J(e.tag) || X(e.tag) ? e.tag : mm();
			return X(s) ? tc(s, o, { default: a }) : tc(s, o, a());
		};
	}
});
function gm(e) {
	return K(e) && !J(e[0]);
}
function _m(e, t, n, r) {
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
				return gm(r) && (r[0].key = `${e.type}-${t}`), r;
			}) : J(o) && (s = [o]), s;
		}, o = W(G(), a), s = J(e.tag) || X(e.tag) ? e.tag : mm();
		return X(s) ? tc(s, o, { default: t }) : tc(s, o, t());
	};
}
var vm = /* @__PURE__ */ ni({
	name: "i18n-n",
	props: W({
		value: {
			type: Number,
			required: !0
		},
		format: { type: [String, Object] }
	}, fm),
	setup(e, t) {
		let n = e.i18n || Em({
			useScope: e.scope,
			__useComponent: !0
		});
		return _m(e, t, bp, (...e) => n[Kp](...e));
	}
});
function ym(e, t) {
	let n = e;
	if (e.mode === "composition") return n.__getInstance(t) || e.global;
	{
		let r = n.__getInstance(t);
		return r == null ? e.global.__composer : r.__composer;
	}
}
function bm(e) {
	let t = (t) => {
		let { instance: n, value: r } = t;
		/* istanbul ignore if */
		if (!n || !n.$) throw Up($.UNEXPECTED_ERROR);
		let i = ym(e, n.$), a = xm(r);
		return [Reflect.apply(i.t, i, [...Sm(a)]), i];
	};
	return {
		created: (e, n) => {
			let [r, i] = t(n);
			Su && (e.__i18nWatcher = Cr(i.locale, () => {
				n.instance && n.instance.$forceUpdate();
			})), e.__composer = i, e.textContent = r;
		},
		unmounted: (e) => {
			Su && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer);
		},
		beforeUpdate: (e, { value: t }) => {
			if (e.__composer) {
				let n = e.__composer, r = xm(t);
				e.textContent = Reflect.apply(n.t, n, [...Sm(r)]);
			}
		},
		getSSRProps: (e) => {
			let [n] = t(e);
			return { textContent: n };
		}
	};
}
function xm(e) {
	if (J(e)) return { path: e };
	if (Z(e)) {
		if (!("path" in e)) throw Up($.REQUIRED_VALUE, "path");
		return e;
	}
	throw Up($.INVALID_VALUE);
}
function Sm(e) {
	let { path: t, locale: n, args: r, choice: i, plural: a } = e, o = {}, s = r || {};
	return J(n) && (o.locale = n), U(i) && (o.plural = i), U(a) && (o.plural = a), [
		t,
		s,
		o
	];
}
function Cm(e, t, ...n) {
	let r = Z(n[0]) ? n[0] : {};
	(!Y(r.globalInstall) || r.globalInstall) && ([hm.name, "I18nT"].forEach((t) => e.component(t, hm)), [vm.name, "I18nN"].forEach((t) => e.component(t, vm)), [Lm.name, "I18nD"].forEach((t) => e.component(t, Lm))), e.directive("t", bm(t));
}
var wm = /* #__PURE__*/ Cu("global-vue-i18n");
function Tm(e = {}) {
	let t = __VUE_I18N_LEGACY_API__ && Y(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = !Y(e.globalInjection) || e.globalInjection, r = /* @__PURE__ */ new Map(), [i, a] = Dm(e, t), o = /* #__PURE__*/ Cu("");
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
			!t && n && (i = Im(e, u.global)), __VUE_I18N_FULL_INSTALL__ && Cm(e, u, ...r), __VUE_I18N_LEGACY_API__ && t && e.mixin(um(a, a.__composer, u));
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
function Em(e = {}) {
	let t = nm();
	if (t == null) throw Up($.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw Up($.NOT_INSTALLED);
	let n = Om(t), r = Am(n), i = $p(t), a = km(e, i);
	if (a === "global") return em(r, e, i), r;
	if (a === "parent") {
		let i = jm(n, t, e.__useComponent);
		return i ??= r, i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw Up($.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = W({}, e);
		a.__root = jm(n, t) || r;
		let o = sm(a);
		return i.__composerExtend && (o[Yp] = i.__composerExtend(o)), Ae() && je(() => {
			let e = o[Yp];
			e && (e(), delete o[Yp]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = W({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = sm(n), o.__composerExtend && (s[Yp] = o.__composerExtend(s)), Nm(o, t, s), o.__setInstance(t, s);
	}
	return s;
}
function Dm(e, t) {
	let n = ke(), r = __VUE_I18N_LEGACY_API__ && t ? n.run(() => lm(e)) : n.run(() => sm(e));
	if (r == null) throw Up($.UNEXPECTED_ERROR);
	return [n, r];
}
function Om(e) {
	let t = gr(e.isCE ? wm : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw Up(e.isCE ? $.NOT_INSTALLED_WITH_PROVIDE : $.UNEXPECTED_ERROR);
	return t;
}
function km(e, t) {
	return Ou(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Am(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function jm(e, t, n = !1) {
	let r = null, i = t.root, a = Mm(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[Jp] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function Mm(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Nm(e, t, n) {
	qi(() => {}, t), Zi(() => {
		let r = n;
		e.__deleteInstance(t);
		let i = r[Yp];
		i && (i(), delete r[Yp]);
	}, t);
}
var Pm = [
	"locale",
	"fallbackLocale",
	"availableLocales"
], Fm = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function Im(e, t) {
	let n = Object.create(null);
	return Pm.forEach((e) => {
		let r = Object.getOwnPropertyDescriptor(t, e);
		if (!r) throw Up($.UNEXPECTED_ERROR);
		let i = /* @__PURE__ */ L(r.value) ? {
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
	}), e.config.globalProperties.$i18n = n, Fm.forEach((n) => {
		let r = Object.getOwnPropertyDescriptor(t, n);
		if (!r || !r.value) throw Up($.UNEXPECTED_ERROR);
		Object.defineProperty(e.config.globalProperties, `$${n}`, r);
	}), () => {
		delete e.config.globalProperties.$i18n, Fm.forEach((t) => {
			delete e.config.globalProperties[`$${t}`];
		});
	};
}
var Lm = /* @__PURE__ */ ni({
	name: "i18n-d",
	props: W({
		value: {
			type: [Number, Date],
			required: !0
		},
		format: { type: [String, Object] }
	}, fm),
	setup(e, t) {
		let n = e.i18n || Em({
			useScope: e.scope,
			__useComponent: !0
		});
		return _m(e, t, gp, (...e) => n[Gp](...e));
	}
});
if (Hp(), qf(hf), Yf(Bf), Zf(Df), __INTLIFY_PROD_DEVTOOLS__) {
	let e = ju();
	e.__INTLIFY__ = !0, _f(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/shared/src/utils/hasA11yProp.js
var Rm = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, zm = (e) => e === "", Bm = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Vm = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Hm = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Um = (e) => {
	let t = Hm(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Wm = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, Gm = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o = Wm.width, color: s = Wm.stroke, ...c }, { slots: l }) => tc("svg", {
	...Wm,
	...c,
	width: o,
	height: o,
	stroke: s,
	"stroke-width": zm(n) || zm(r) || n === !0 || r === !0 ? Number(i || a || Wm["stroke-width"]) * 24 / Number(o) : i || a || Wm["stroke-width"],
	class: Bm("lucide", c.class, ...e ? [`lucide-${Vm(Um(e))}-icon`, `lucide-${Vm(e)}`] : ["lucide-icon"]),
	...!l.default && !Rm(c) && { "aria-hidden": "true" }
}, [...t.map((e) => tc(...e)), ...l.default ? [l.default()] : []]), Km = (e, t) => (n, { slots: r, attrs: i }) => tc(Gm, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r), qm = Km("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), Jm = 1.75, Ym = /* @__PURE__ */ ni({
	__name: "AppIcon",
	props: {
		icon: {},
		size: { default: 20 },
		label: {}
	},
	setup(e) {
		return (t, n) => (ss(), ps(oa(e.icon), {
			size: e.size,
			"stroke-width": Jm,
			role: e.label ? "img" : void 0,
			"aria-label": e.label,
			"aria-hidden": e.label ? void 0 : "true"
		}, null, 8, [
			"size",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
});
//#endregion
export { en as $, ks as A, oa as B, Ni as C, tc as D, xs as E, Yi as F, xr as G, ri as H, ss as I, rc as J, fr as K, hr as L, Xi as M, qi as N, gr as O, Zi as P, L as Q, ua as R, V as S, Ps as T, Cr as U, ma as V, br as W, ke as X, mn as Y, Ae as Z, ys as _, Em as a, I as at, fs as b, Wl as c, un as ct, iu as d, O as dt, je as et, B as f, ge as ft, ec as g, A as gt, Ss as h, we as ht, Tm as i, an as it, Jn as j, ja as k, Hc as l, cn as lt, Rr as m, M as mt, qm as n, rn as nt, bu as o, vn as ot, z as p, _e as pt, pr as q, Km as r, Jt as rt, mu as s, hn as st, Ym as t, Gt as tt, ou as u, ln as ut, ps as v, ni as w, Cs as x, Ts as y, fa as z };

//# sourceMappingURL=AppIcon-BpY-A4VH.js.map