//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, r = {
	shell: "_shell_1dcce_8",
	top_bar: "_top_bar_1dcce_52",
	top_bar_start: "_top_bar_start_1dcce_63",
	top_bar_end: "_top_bar_end_1dcce_64",
	top_bar_title: "_top_bar_title_1dcce_71",
	icon_button: "_icon_button_1dcce_79",
	rail: "_rail_1dcce_95",
	rail_button: "_rail_button_1dcce_106",
	tooltip_content: "_tooltip_content_1dcce_125",
	workspace: "_workspace_1dcce_133",
	workspace_placeholder: "_workspace_placeholder_1dcce_140",
	workspace_placeholder_title: "_workspace_placeholder_title_1dcce_149",
	workspace_placeholder_description: "_workspace_placeholder_description_1dcce_153",
	inspector: "_inspector_1dcce_158",
	inspector_resizer: "_inspector_resizer_1dcce_166",
	inspector_panel: "_inspector_panel_1dcce_179",
	inspector_header: "_inspector_header_1dcce_187",
	inspector_body: "_inspector_body_1dcce_196",
	bottom_nav: "_bottom_nav_1dcce_204",
	bottom_nav_item: "_bottom_nav_item_1dcce_212",
	bottom_nav_item_label: "_bottom_nav_item_label_1dcce_228",
	more_menu_content: "_more_menu_content_1dcce_236",
	more_menu_item: "_more_menu_item_1dcce_244",
	sheet_overlay: "_sheet_overlay_1dcce_259",
	sheet_content: "_sheet_content_1dcce_266",
	sheet_handle: "_sheet_handle_1dcce_280",
	sheet_header: "_sheet_header_1dcce_292",
	sheet_body: "_sheet_body_1dcce_301",
	task_strip: "_task_strip_1dcce_309",
	task_strip_header: "_task_strip_header_1dcce_317",
	task_strip_summary: "_task_strip_summary_1dcce_325",
	task_strip_list: "_task_strip_list_1dcce_334",
	task_chip: "_task_chip_1dcce_341",
	task_chip_dot: "_task_chip_dot_1dcce_353",
	task_chip_label: "_task_chip_label_1dcce_373",
	skeleton_block: "_skeleton_block_1dcce_380",
	partial_banner: "_partial_banner_1dcce_385",
	state_screen: "_state_screen_1dcce_397",
	state_screen_eyebrow: "_state_screen_eyebrow_1dcce_409",
	state_screen_title: "_state_screen_title_1dcce_413",
	state_screen_action: "_state_screen_action_1dcce_417",
	state_screen_description: "_state_screen_description_1dcce_427"
}, i = class {
	#e = /* @__PURE__ */ new Map();
	register(e, t, n) {
		let r = this.#e.get(e);
		if (r !== void 0) throw Error(`Capability "${e}" is already owned by module "${r.owner_module_id}"; module "${t}" cannot register it`);
		this.#e.set(e, {
			owner_module_id: t,
			value: n
		});
	}
	has(e) {
		return this.#e.has(e);
	}
	get(e) {
		return this.#e.get(e)?.value;
	}
	require(e) {
		let t = this.#e.get(e);
		if (t === void 0) throw Error(`Required capability "${e}" is not registered`);
		return t.value;
	}
	remove_by_owner(e) {
		for (let [t, n] of this.#e) n.owner_module_id === e && this.#e.delete(t);
	}
}, a = class {
	#e = /* @__PURE__ */ new Map();
	subscribe(e, t) {
		let n = this.#e.get(e);
		n === void 0 && (n = /* @__PURE__ */ new Set(), this.#e.set(e, n));
		let r = (e) => t(e);
		return n.add(r), () => {
			n.delete(r), n.size === 0 && this.#e.get(e) === n && this.#e.delete(e);
		};
	}
	async publish(e) {
		let t = this.#e.get(e.event_type);
		if (t === void 0) return [];
		let n = [...t], r = [];
		for (let [t, i] of n.entries()) try {
			await i(e);
		} catch (n) {
			r.push({
				event_id: e.event_id,
				event_type: e.event_type,
				subscriber_index: t,
				error: n
			});
		}
		return r;
	}
}, o = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new i(), n = new a()) {
		for (let t of e) {
			if (this.#e.has(t.module_id)) throw Error(`Module "${t.module_id}" is registered more than once`);
			this.#e.set(t.module_id, t);
		}
		this.#t = {
			capabilities: t,
			events: n
		};
	}
	get state() {
		return this.#r;
	}
	async start_all() {
		if (this.#r === "started") return;
		if (this.#r !== "idle") throw Error(`Cannot start modules while runtime state is "${this.#r}"`);
		this.#r = "starting";
		let e;
		try {
			let t = this.#i();
			for (let n of t) e = n, await n.start(this.#t), this.#n.push(n), e = void 0;
			this.#r = "started";
		} catch (t) {
			e !== void 0 && this.#t.capabilities.remove_by_owner(e.module_id);
			let n = await this.#a();
			throw this.#r = "failed", n.length > 0 ? AggregateError([t, ...n], "Module startup and rollback failed", { cause: t }) : t;
		}
	}
	async stop_all() {
		if (this.#r === "stopped") return;
		if (this.#r === "idle") {
			this.#r = "stopped";
			return;
		}
		if (this.#r === "failed" && this.#n.length === 0) return;
		if (this.#r !== "started" && this.#r !== "failed") throw Error(`Cannot stop modules while runtime state is "${this.#r}"`);
		let e = this.#r === "failed";
		this.#r = "stopping";
		let t = await this.#a();
		if (this.#r = e || t.length > 0 ? "failed" : "stopped", t.length > 0) throw AggregateError(t, "One or more modules failed to stop");
	}
	#i() {
		let e = [];
		for (let t of this.#e.values()) for (let n of t.requires) this.#e.has(n) || e.push(`${t.module_id} -> ${n}`);
		let t = /* @__PURE__ */ new Map(), n = [], r = [], i = [], a = (e) => {
			let o = t.get(e.module_id);
			if (o !== "visited") {
				if (o === "visiting") {
					let t = n.indexOf(e.module_id);
					r.push([...n.slice(t), e.module_id].join(" -> "));
					return;
				}
				t.set(e.module_id, "visiting"), n.push(e.module_id);
				for (let t of e.requires) {
					let e = this.#e.get(t);
					e !== void 0 && a(e);
				}
				n.pop(), t.set(e.module_id, "visited"), i.push(e);
			}
		};
		for (let e of this.#e.values()) a(e);
		if (e.length > 0 || r.length > 0) {
			let t = [];
			throw e.length > 0 && t.push(`Missing dependencies: ${e.join(", ")}`), r.length > 0 && t.push(`Dependency cycles: ${r.join(", ")}`), Error(`Module preflight failed. ${t.join(". ")}`);
		}
		return i;
	}
	async #a() {
		let e = [];
		for (let t = this.#n.length - 1; t >= 0; --t) {
			let n = this.#n[t];
			if (n !== void 0) try {
				await n.stop();
			} catch (t) {
				e.push(t);
			} finally {
				this.#t.capabilities.remove_by_owner(n.module_id);
			}
		}
		return this.#n.length = 0, e;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@vue+shared@3.5.40/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function s(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var c = {}, l = [], u = () => {}, d = () => !1, f = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), p = (e) => e.startsWith("onUpdate:"), m = Object.assign, h = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, g = Object.prototype.hasOwnProperty, _ = (e, t) => g.call(e, t), v = Array.isArray, y = (e) => k(e) === "[object Map]", b = (e) => k(e) === "[object Set]", x = (e) => k(e) === "[object Date]", S = (e) => k(e) === "[object RegExp]", C = (e) => typeof e == "function", w = (e) => typeof e == "string", T = (e) => typeof e == "symbol", E = (e) => typeof e == "object" && !!e, D = (e) => (E(e) || C(e)) && C(e.then) && C(e.catch), O = Object.prototype.toString, k = (e) => O.call(e), ee = (e) => k(e).slice(8, -1), te = (e) => k(e) === "[object Object]", ne = (e) => w(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, re = /* @__PURE__ */ s(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ie = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ae = /-\w/g, A = ie((e) => e.replace(ae, (e) => e.slice(1).toUpperCase())), oe = /\B([A-Z])/g, se = ie((e) => e.replace(oe, "-$1").toLowerCase()), ce = ie((e) => e.charAt(0).toUpperCase() + e.slice(1)), le = ie((e) => e ? `on${ce(e)}` : ""), ue = (e, t) => !Object.is(e, t), de = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, fe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, pe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, me = (e) => {
	let t = w(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, he, ge = () => he ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, _e = /* @__PURE__ */ s("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function ve(e) {
	if (v(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = w(r) ? Se(r) : ve(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (w(e) || E(e)) return e;
}
var ye = /;(?![^(]*\))/g, be = /:([^]+)/, xe = /\/\*[^]*?\*\//g;
function Se(e) {
	let t = {};
	return e.replace(xe, "").split(ye).forEach((e) => {
		if (e) {
			let n = e.split(be);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function j(e) {
	let t = "";
	if (w(e)) t = e;
	else if (v(e)) for (let n = 0; n < e.length; n++) {
		let r = j(e[n]);
		r && (t += r + " ");
	}
	else if (E(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function Ce(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !w(t) && (e.class = j(t)), n && (e.style = ve(n)), e;
}
var we = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Te = /* @__PURE__ */ s(we);
we + "";
function Ee(e) {
	return !!e || e === "";
}
function De(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Oe(e[r], t[r]);
	return n;
}
function Oe(e, t) {
	if (e === t) return !0;
	let n = x(e), r = x(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = T(e), r = T(t), n || r) return e === t;
	if (n = v(e), r = v(t), n || r) return n && r ? De(e, t) : !1;
	if (n = E(e), r = E(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Oe(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function ke(e, t) {
	return e.findIndex((e) => Oe(e, t));
}
var Ae = (e) => !!(e && e.__v_isRef === !0), M = (e) => w(e) ? e : e == null ? "" : v(e) || E(e) && (e.toString === O || !C(e.toString)) ? Ae(e) ? M(e.value) : JSON.stringify(e, je, 2) : String(e), je = (e, t) => Ae(t) ? je(e, t.value) : y(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Me(t, r) + " =>"] = n, e), {}) } : b(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Me(e)) } : T(t) ? Me(t) : E(t) && !v(t) && !te(t) ? String(t) : t, Me = (e, t = "") => T(e) ? `Symbol(${e.description ?? t})` : e;
function Ne(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+reactivity@3.5.40/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var Pe, Fe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Pe && (Pe.active ? (this.parent = Pe, this.index = (Pe.scopes || (Pe.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = Pe;
			try {
				return Pe = this, e();
			} finally {
				Pe = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Pe, Pe = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Pe === this) Pe = this.prevScope;
			else {
				let e = Pe;
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
function Ie(e) {
	return new Fe(e);
}
function Le() {
	return Pe;
}
function Re(e, t = !1) {
	Pe && Pe.cleanups.push(e);
}
var N, ze = /* @__PURE__ */ new WeakSet(), Be = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pe && (Pe.active ? Pe.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, ze.has(this) && (ze.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || We(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, at(this), qe(this);
		let e = N, t = tt;
		N = this, tt = !0;
		try {
			return this.fn();
		} finally {
			Je(this), N = e, tt = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ze(e);
			this.deps = this.depsTail = void 0, at(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? ze.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ye(this) && this.run();
	}
	get dirty() {
		return Ye(this);
	}
}, Ve = 0, He, Ue;
function We(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ue, Ue = e;
		return;
	}
	e.next = He, He = e;
}
function Ge() {
	Ve++;
}
function Ke() {
	if (--Ve > 0) return;
	if (Ue) {
		let e = Ue;
		for (Ue = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; He;) {
		let t = He;
		for (He = void 0; t;) {
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
function qe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Je(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ze(r), Qe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ye(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Xe(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Xe(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ot) || (e.globalVersion = ot, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ye(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = N, r = tt;
	N = e, tt = !0;
	try {
		qe(e);
		let n = e.fn(e._value);
		(t.version === 0 || ue(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		N = n, tt = r, Je(e), e.flags &= -3;
	}
}
function Ze(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ze(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Qe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function $e(e, t) {
	e.effect instanceof Be && (e = e.effect.fn);
	let n = new Be(e);
	t && m(n, t);
	try {
		n.run();
	} catch (e) {
		throw n.stop(), e;
	}
	let r = n.run.bind(n);
	return r.effect = n, r;
}
function et(e) {
	e.effect.stop();
}
var tt = !0, nt = [];
function rt() {
	nt.push(tt), tt = !1;
}
function it() {
	let e = nt.pop();
	tt = e === void 0 || e;
}
function at(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = N;
		N = void 0;
		try {
			t();
		} finally {
			N = e;
		}
	}
}
var ot = 0, st = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, ct = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!N || !tt || N === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== N) t = this.activeLink = new st(N, this), N.deps ? (t.prevDep = N.depsTail, N.depsTail.nextDep = t, N.depsTail = t) : N.deps = N.depsTail = t, lt(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = N.depsTail, t.nextDep = void 0, N.depsTail.nextDep = t, N.depsTail = t, N.deps === t && (N.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, ot++, this.notify(e);
	}
	notify(e) {
		Ge();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ke();
		}
	}
};
function lt(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) lt(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var ut = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ Symbol(""), ft = /* @__PURE__ */ Symbol(""), pt = /* @__PURE__ */ Symbol("");
function mt(e, t, n) {
	if (tt && N) {
		let t = ut.get(e);
		t || ut.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new ct()), r.map = t, r.key = n), r.track();
	}
}
function ht(e, t, n, r, i, a) {
	let o = ut.get(e);
	if (!o) {
		ot++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ge(), t === "clear") o.forEach(s);
	else {
		let i = v(e), a = i && ne(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === pt || !T(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(pt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(dt)), y(e) && s(o.get(ft)));
				break;
			case "delete":
				i || (s(o.get(dt)), y(e) && s(o.get(ft)));
				break;
			case "set": y(e) && s(o.get(dt));
		}
	}
	Ke();
}
function gt(e, t) {
	let n = ut.get(e);
	return n && n.get(t);
}
function _t(e) {
	let t = /* @__PURE__ */ P(e);
	return t === e ? t : (mt(t, "iterate", pt), /* @__PURE__ */ on(e) ? t : t.map(ln));
}
function vt(e) {
	return mt(e = /* @__PURE__ */ P(e), "iterate", pt), e;
}
function yt(e, t) {
	return /* @__PURE__ */ an(e) ? un(/* @__PURE__ */ rn(e) ? ln(t) : t) : ln(t);
}
var bt = {
	__proto__: null,
	[Symbol.iterator]() {
		return xt(this, Symbol.iterator, (e) => yt(this, e));
	},
	concat(...e) {
		return _t(this).concat(...e.map((e) => v(e) ? _t(e) : e));
	},
	entries() {
		return xt(this, "entries", (e) => (e[1] = yt(this, e[1]), e));
	},
	every(e, t) {
		return Ct(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Ct(this, "filter", e, t, (e) => e.map((e) => yt(this, e)), arguments);
	},
	find(e, t) {
		return Ct(this, "find", e, t, (e) => yt(this, e), arguments);
	},
	findIndex(e, t) {
		return Ct(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Ct(this, "findLast", e, t, (e) => yt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Ct(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Ct(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return Tt(this, "includes", e);
	},
	indexOf(...e) {
		return Tt(this, "indexOf", e);
	},
	join(e) {
		return _t(this).join(e);
	},
	lastIndexOf(...e) {
		return Tt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Ct(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Et(this, "pop");
	},
	push(...e) {
		return Et(this, "push", e);
	},
	reduce(e, ...t) {
		return wt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return wt(this, "reduceRight", e, t);
	},
	shift() {
		return Et(this, "shift");
	},
	some(e, t) {
		return Ct(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Et(this, "splice", e);
	},
	toReversed() {
		return _t(this).toReversed();
	},
	toSorted(e) {
		return _t(this).toSorted(e);
	},
	toSpliced(...e) {
		return _t(this).toSpliced(...e);
	},
	unshift(...e) {
		return Et(this, "unshift", e);
	},
	values() {
		return xt(this, "values", (e) => yt(this, e));
	}
};
function xt(e, t, n) {
	let r = vt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ on(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var St = Array.prototype;
function Ct(e, t, n, r, i, a) {
	let o = vt(e), s = o !== e && !/* @__PURE__ */ on(e), c = o[t];
	if (c !== St[t]) {
		let t = c.apply(e, a);
		return s ? ln(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, yt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function wt(e, t, n, r) {
	let i = vt(e), a = i !== e && !/* @__PURE__ */ on(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = yt(e, t)), n.call(this, t, yt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? yt(e, c) : c;
}
function Tt(e, t, n) {
	let r = /* @__PURE__ */ P(e);
	mt(r, "iterate", pt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ sn(n[0]) ? (n[0] = /* @__PURE__ */ P(n[0]), r[t](...n)) : i;
}
function Et(e, t, n = []) {
	rt(), Ge();
	let r = (/* @__PURE__ */ P(e))[t].apply(e, n);
	return Ke(), it(), r;
}
var Dt = /* @__PURE__ */ s("__proto__,__v_isRef,__isVue"), Ot = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(T));
function kt(e) {
	T(e) || (e = String(e));
	let t = /* @__PURE__ */ P(this);
	return mt(t, "has", e), t.hasOwnProperty(e);
}
var At = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Xt : Yt : i ? Jt : qt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = v(e);
		if (!r) {
			let e;
			if (a && (e = bt[t])) return e;
			if (t === "hasOwnProperty") return kt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ dn(e) ? e : n);
		if ((T(t) ? Ot.has(t) : Dt(t)) || (r || mt(e, "get", t), i)) return o;
		if (/* @__PURE__ */ dn(o)) {
			let e = a && ne(t) ? o : o.value;
			return r && E(e) ? /* @__PURE__ */ en(e) : e;
		}
		return E(o) ? r ? /* @__PURE__ */ en(o) : /* @__PURE__ */ Qt(o) : o;
	}
}, jt = class extends At {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = v(e) && ne(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ an(i);
			if (!/* @__PURE__ */ on(n) && !/* @__PURE__ */ an(n) && (i = /* @__PURE__ */ P(i), n = /* @__PURE__ */ P(n)), !a && /* @__PURE__ */ dn(i) && !/* @__PURE__ */ dn(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : _(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ dn(e) ? e : r);
		return e === /* @__PURE__ */ P(r) && s && (o ? ue(n, i) && ht(e, "set", t, n, i) : ht(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = _(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ht(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!T(t) || !Ot.has(t)) && mt(e, "has", t), n;
	}
	ownKeys(e) {
		return mt(e, "iterate", v(e) ? "length" : dt), Reflect.ownKeys(e);
	}
}, Mt = class extends At {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Nt = /* @__PURE__ */ new jt(), Pt = /* @__PURE__ */ new Mt(), Ft = /* @__PURE__ */ new jt(!0), It = /* @__PURE__ */ new Mt(!0), Lt = (e) => e, Rt = (e) => Reflect.getPrototypeOf(e);
function zt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ P(i), o = y(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Lt : t ? un : ln;
		return !t && mt(a, "iterate", c ? ft : dt), m(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Bt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Vt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ P(r), a = /* @__PURE__ */ P(n);
			e || (ue(n, a) && mt(i, "get", n), mt(i, "get", a));
			let { has: o } = Rt(i), s = t ? Lt : e ? un : ln;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && mt(/* @__PURE__ */ P(t), "iterate", dt), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ P(n), i = /* @__PURE__ */ P(t);
			return e || (ue(t, i) && mt(r, "has", t), mt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ P(a), s = t ? Lt : e ? un : ln;
			return !e && mt(o, "iterate", dt), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return m(n, e ? {
		add: Bt("add"),
		set: Bt("set"),
		delete: Bt("delete"),
		clear: Bt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ P(this), r = Rt(n), i = /* @__PURE__ */ P(e), a = !t && !/* @__PURE__ */ on(e) && !/* @__PURE__ */ an(e) ? i : e;
			return r.has.call(n, a) || ue(e, a) && r.has.call(n, e) || ue(i, a) && r.has.call(n, i) || (n.add(a), ht(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ on(n) && !/* @__PURE__ */ an(n) && (n = /* @__PURE__ */ P(n));
			let r = /* @__PURE__ */ P(this), { has: i, get: a } = Rt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ P(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? ue(n, s) && ht(r, "set", e, n, s) : ht(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ P(this), { has: n, get: r } = Rt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ P(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ht(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ P(this), t = e.size !== 0, n = e.clear();
			return t && ht(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = zt(r, e, t);
	}), n;
}
function Ht(e, t) {
	let n = Vt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(_(n, r) && r in t ? n : t, r, i);
}
var Ut = { get: /* @__PURE__ */ Ht(!1, !1) }, Wt = { get: /* @__PURE__ */ Ht(!1, !0) }, Gt = { get: /* @__PURE__ */ Ht(!0, !1) }, Kt = { get: /* @__PURE__ */ Ht(!0, !0) }, qt = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap();
function Zt(e) {
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
function Qt(e) {
	return /* @__PURE__ */ an(e) ? e : nn(e, !1, Nt, Ut, qt);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return nn(e, !1, Ft, Wt, Jt);
}
// @__NO_SIDE_EFFECTS__
function en(e) {
	return nn(e, !0, Pt, Gt, Yt);
}
// @__NO_SIDE_EFFECTS__
function tn(e) {
	return nn(e, !0, It, Kt, Xt);
}
function nn(e, t, n, r, i) {
	if (!E(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Zt(ee(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return /* @__PURE__ */ an(e) ? /* @__PURE__ */ rn(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function an(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function on(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function P(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ P(t) : e;
}
function cn(e) {
	return !_(e, "__v_skip") && Object.isExtensible(e) && fe(e, "__v_skip", !0), e;
}
var ln = (e) => E(e) ? /* @__PURE__ */ Qt(e) : e, un = (e) => E(e) ? /* @__PURE__ */ en(e) : e;
// @__NO_SIDE_EFFECTS__
function dn(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	return pn(e, !1);
}
// @__NO_SIDE_EFFECTS__
function fn(e) {
	return pn(e, !0);
}
function pn(e, t) {
	return /* @__PURE__ */ dn(e) ? e : new mn(e, t);
}
var mn = class {
	constructor(e, t) {
		this.dep = new ct(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ P(e), this._value = t ? e : ln(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ on(e) || /* @__PURE__ */ an(e);
		e = n ? e : /* @__PURE__ */ P(e), ue(e, t) && (this._rawValue = e, this._value = n ? e : ln(e), this.dep.trigger());
	}
};
function hn(e) {
	e.dep && e.dep.trigger();
}
function I(e) {
	return /* @__PURE__ */ dn(e) ? e.value : e;
}
function L(e) {
	return C(e) ? e() : I(e);
}
var gn = {
	get: (e, t, n) => t === "__v_raw" ? e : I(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ dn(i) && !/* @__PURE__ */ dn(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function _n(e) {
	return /* @__PURE__ */ rn(e) ? e : new Proxy(e, gn);
}
var vn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new ct(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function yn(e) {
	return new vn(e);
}
// @__NO_SIDE_EFFECTS__
function bn(e) {
	let t = v(e) ? Array(e.length) : {};
	for (let n in e) t[n] = wn(e, n);
	return t;
}
var xn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = T(t) ? t : String(t), this._raw = /* @__PURE__ */ P(e);
		let r = !0, i = e;
		if (!v(e) || T(this._key) || !ne(this._key)) do
			r = !/* @__PURE__ */ sn(i) || /* @__PURE__ */ on(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = I(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ dn(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ dn(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return gt(this._raw, this._key);
	}
}, Sn = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function Cn(e, t, n) {
	return /* @__PURE__ */ dn(e) ? e : C(e) ? new Sn(e) : E(e) && arguments.length > 1 ? wn(e, t, n) : /* @__PURE__ */ F(e);
}
function wn(e, t, n) {
	return new xn(e, t, n);
}
var Tn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new ct(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ot - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && N !== this) return We(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Xe(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function En(e, t, n = !1) {
	let r, i;
	return C(e) ? r = e : (r = e.get, i = e.set), new Tn(r, i, n);
}
var Dn = {
	GET: "get",
	HAS: "has",
	ITERATE: "iterate"
}, On = {
	SET: "set",
	ADD: "add",
	DELETE: "delete",
	CLEAR: "clear"
}, kn = {}, An = /* @__PURE__ */ new WeakMap(), jn = void 0;
function Mn() {
	return jn;
}
function Nn(e, t = !1, n = jn) {
	if (n) {
		let t = An.get(n);
		t || An.set(n, t = []), t.push(e);
	}
}
function Pn(e, t, n = c) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: l } = n, d = (e) => i ? e : /* @__PURE__ */ on(e) || i === !1 || i === 0 ? Fn(e, 1) : Fn(e), f, p, m, g, _ = !1, y = !1;
	if (/* @__PURE__ */ dn(e) ? (p = () => e.value, _ = /* @__PURE__ */ on(e)) : /* @__PURE__ */ rn(e) ? (p = () => d(e), _ = !0) : v(e) ? (y = !0, _ = e.some((e) => /* @__PURE__ */ rn(e) || /* @__PURE__ */ on(e)), p = () => e.map((e) => {
		if (/* @__PURE__ */ dn(e)) return e.value;
		if (/* @__PURE__ */ rn(e)) return d(e);
		if (C(e)) return l ? l(e, 2) : e();
	})) : p = C(e) ? t ? l ? () => l(e, 2) : e : () => {
		if (m) {
			rt();
			try {
				m();
			} finally {
				it();
			}
		}
		let t = jn;
		jn = f;
		try {
			return l ? l(e, 3, [g]) : e(g);
		} finally {
			jn = t;
		}
	} : u, t && i) {
		let e = p, t = i === !0 ? Infinity : i;
		p = () => Fn(e(), t);
	}
	let b = Le(), x = () => {
		f.stop(), b && b.active && h(b.effects, f);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return x(), n;
		};
	}
	let S = y ? Array(e.length).fill(kn) : kn, w = (e) => {
		if (!(!(f.flags & 1) || !f.dirty && !e)) if (t) {
			let n = f.run();
			if (e || i || _ || (y ? n.some((e, t) => ue(e, S[t])) : ue(n, S))) {
				m && m();
				let e = jn;
				jn = f;
				try {
					let e = [
						n,
						S === kn ? void 0 : y && S[0] === kn ? [] : S,
						g
					];
					S = n, l ? l(t, 3, e) : t(...e);
				} finally {
					jn = e;
				}
			}
		} else f.run();
	};
	return s && s(w), f = new Be(p), f.scheduler = o ? () => o(w, !1) : w, g = (e) => Nn(e, !1, f), m = f.onStop = () => {
		let e = An.get(f);
		if (e) {
			if (l) l(e, 4);
			else for (let t of e) t();
			An.delete(f);
		}
	}, t ? r ? w(!0) : S = f.run() : o ? o(w.bind(null, !0), !0) : f.run(), x.pause = f.pause.bind(f), x.resume = f.resume.bind(f), x.stop = x, x;
}
function Fn(e, t = Infinity, n) {
	if (t <= 0 || !E(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ dn(e)) Fn(e.value, t, n);
	else if (v(e)) for (let r = 0; r < e.length; r++) Fn(e[r], t, n);
	else if (b(e) || y(e)) e.forEach((e) => {
		Fn(e, t, n);
	});
	else if (te(e)) {
		for (let r in e) Fn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Fn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-core@3.5.40/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var In = [];
function Ln(e) {
	In.push(e);
}
function Rn() {
	In.pop();
}
function zn(e, t) {}
var Bn = {
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
}, Vn = {
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
function Hn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Wn(e, t, n);
	}
}
function Un(e, t, n, r) {
	if (C(e)) {
		let i = Hn(e, t, n, r);
		return i && D(i) && i.catch((e) => {
			Wn(e, t, n);
		}), i;
	}
	if (v(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Un(e[a], t, n, r));
		return i;
	}
}
function Wn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || c;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			rt(), Hn(a, null, 10, [
				e,
				i,
				o
			]), it();
			return;
		}
	}
	Gn(e, n, i, r, o);
}
function Gn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Kn = [], qn = -1, Jn = [], Yn = null, Xn = 0, Zn = /* @__PURE__ */ Promise.resolve(), Qn = null;
function $n(e) {
	let t = Qn || Zn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
	let t = qn + 1, n = Kn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Kn[r], a = or(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function tr(e) {
	if (!(e.flags & 1)) {
		let t = or(e), n = Kn[Kn.length - 1];
		!n || !(e.flags & 2) && t >= or(n) ? Kn.push(e) : Kn.splice(er(t), 0, e), e.flags |= 1, nr();
	}
}
function nr() {
	Qn ||= Zn.then(sr);
}
function rr(e) {
	v(e) ? Jn.push(...e) : Yn && e.id === -1 ? Yn.splice(Xn + 1, 0, e) : e.flags & 1 || (Jn.push(e), e.flags |= 1), nr();
}
function ir(e, t, n = qn + 1) {
	for (; n < Kn.length; n++) {
		let t = Kn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			Kn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function ar(e) {
	if (Jn.length) {
		let e = [...new Set(Jn)].sort((e, t) => or(e) - or(t));
		if (Jn.length = 0, Yn) {
			Yn.push(...e);
			return;
		}
		for (Yn = e, Xn = 0; Xn < Yn.length; Xn++) {
			let e = Yn[Xn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Yn = null, Xn = 0;
	}
}
var or = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function sr(e) {
	try {
		for (qn = 0; qn < Kn.length; qn++) {
			let e = Kn[qn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Hn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; qn < Kn.length; qn++) {
			let e = Kn[qn];
			e && (e.flags &= -2);
		}
		qn = -1, Kn.length = 0, ar(e), Qn = null, (Kn.length || Jn.length) && sr(e);
	}
}
var cr, lr = [];
function ur(e, t) {
	cr = e, cr ? (cr.enabled = !0, lr.forEach(({ event: e, args: t }) => cr.emit(e, ...t)), lr = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		ur(e, t);
	}), setTimeout(() => {
		cr || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, lr = []);
	}, 3e3)) : lr = [];
}
var dr = null, fr = null;
function pr(e) {
	let t = dr;
	return dr = e, fr = e && e.type.__scopeId || null, t;
}
function mr(e) {
	fr = e;
}
function hr() {
	fr = null;
}
var gr = (e) => R;
function R(e, t = dr, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ps(-1);
		let i = pr(t), a = ls.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ls.length; e > a; e--) ds();
			pr(i), r._d && ps(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function _r(e, t) {
	if (dr === null) return e;
	let n = $s(dr), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = c] = t[e];
		i && (C(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Fn(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function vr(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (rt(), Un(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), it());
	}
}
function yr(e, t) {
	if (Fs) {
		let n = Fs.provides, r = Fs.parent && Fs.parent.provides;
		r === n && (n = Fs.provides = Object.create(r)), n[e] = t;
	}
}
function br(e, t, n = !1) {
	let r = Is();
	if (r || eo) {
		let i = eo ? eo._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && C(t) ? t.call(r && r.proxy) : t;
	}
}
function xr() {
	return !!(Is() || eo);
}
var Sr = /* @__PURE__ */ Symbol.for("v-scx"), Cr = () => br(Sr);
function wr(e, t) {
	return Dr(e, null, t);
}
function Tr(e, t) {
	return Dr(e, null, { flush: "post" });
}
function Er(e, t) {
	return Dr(e, null, { flush: "sync" });
}
function z(e, t, n) {
	return Dr(e, t, n);
}
function Dr(e, t, n = c) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = m({}, n), l = t && r || !t && a !== "post", d;
	if (Hs) {
		if (a === "sync") {
			let e = Cr();
			d = e.__watcherHandles ||= [];
		} else if (!l) {
			let e = () => {};
			return e.stop = u, e.resume = u, e.pause = u, e;
		}
	}
	let f = Fs;
	s.call = (e, t, n) => Un(e, f, t, n);
	let p = !1;
	a === "post" ? s.scheduler = (e) => {
		Po(e, f && f.suspense);
	} : a !== "sync" && (p = !0, s.scheduler = (e, t) => {
		t ? e() : tr(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), p && (e.flags |= 2, f && (e.id = f.uid, e.i = f));
	};
	let h = Pn(e, t, s);
	return Hs && (d ? d.push(h) : l && h()), h;
}
function Or(e, t, n) {
	let r = this.proxy, i = w(e) ? e.includes(".") ? kr(r, e) : () => r[e] : e.bind(r, r), a;
	C(t) ? a = t : (a = t.handler, n = t);
	let o = zs(this), s = Dr(i, a.bind(r), n);
	return o(), s;
}
function kr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Ar = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ Symbol("_vte"), Mr = (e) => e.__isTeleport, Nr = (e) => e && (e.disabled || e.disabled === ""), Pr = (e) => e && (e.defer || e.defer === ""), Fr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ir = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Lr = (e, t) => {
	let n = e && e.to;
	return w(n) ? t ? t(n) : null : n;
}, Rr = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Nr(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Nr(e.props), r = e.target = Lr(e.props, m), a = Ur(r, e, h, p);
			r && (o !== "svg" && Fr(r) ? o = "svg" : o !== "mathml" && Ir(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), Hr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Ar.get(e) === t) {
					if (Ar.delete(e), Nr(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), Hr(e, !0);
					}
					x(e);
				}
			};
			Ar.set(e, t), Po(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Pr(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), Hr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Ar.get(e);
			if (u) {
				u.flags |= 8, Ar.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Nr(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Fr(p) ? o = "svg" : (o === "mathml" || Ir(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Vo(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : zr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Lr(t.props, m);
				e && (t.target = e, zr(t, e, null, l, 0));
			} else g && zr(t, p, h, l, 1);
			Hr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = Nr(f), m = a || !p, h = Ar.get(e);
		if (h && (h.flags |= 8, Ar.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: zr,
	hydrate: Br
};
function zr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Ar.has(e) && (!d || Nr(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Br(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
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
	let m = t.target = Lr(t.props, c), h = Nr(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Ur(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Ur(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Hr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Vr = Rr;
function Hr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Ur(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[jr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Wr = /* @__PURE__ */ Symbol("_leaveCb"), Gr = /* @__PURE__ */ Symbol("_enterCb");
function Kr() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Yi(() => {
		e.isMounted = !0;
	}), Qi(() => {
		e.isUnmounting = !0;
	}), e;
}
var qr = [Function, Array], Jr = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: qr,
	onEnter: qr,
	onAfterEnter: qr,
	onEnterCancelled: qr,
	onBeforeLeave: qr,
	onLeave: qr,
	onAfterLeave: qr,
	onLeaveCancelled: qr,
	onBeforeAppear: qr,
	onAppear: qr,
	onAfterAppear: qr,
	onAppearCancelled: qr
}, Yr = (e) => {
	let t = e.subTree;
	return t.component ? Yr(t.component) : t;
}, Xr = {
	name: "BaseTransition",
	props: Jr,
	setup(e, { slots: t }) {
		let n = Is(), r = Kr();
		return () => {
			let i = t.default && ii(t.default(), !0), a = i && i.length ? Zr(i) : n.subTree ? Es() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ P(e), { mode: s } = o;
			if (r.isLeaving) return ti(a);
			let c = ni(a);
			if (!c) return ti(a);
			let l = ei(c, o, r, n, (e) => l = e);
			c.type !== ss && ri(c, l);
			let u = n.subTree && ni(n.subTree);
			if (u && u.type !== ss && !_s(u, c) && Yr(n).type !== ss) {
				let e = ei(u, o, r, n);
				if (ri(u, e), s === "out-in" && c.type !== ss) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, ti(a);
				s === "in-out" && c.type !== ss ? e.delayLeave = (e, t, n) => {
					let i = $r(r, u);
					i[String(u.key)] = u, e[Wr] = () => {
						t(), e[Wr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Zr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== ss) {
			t = n;
			break;
		}
	}
	return t;
}
var Qr = Xr;
function $r(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function ei(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: p, onAfterLeave: m, onLeaveCancelled: h, onBeforeAppear: g, onAppear: _, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = $r(n, e), C = (e, t) => {
		e && Un(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), v(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = g || c;
			else return;
			t[Wr] && t[Wr](!0);
			let i = S[x];
			i && _s(e, i) && i.el[Wr] && i.el[Wr](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) if (a) r = _ || l, i = y || u, o = b || d;
			else return;
			let s = !1;
			t[Gr] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Gr] = void 0);
			};
			let c = t[Gr].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Gr] && t[Gr](!0), n.isUnmounting) return r();
			C(f, [t]);
			let a = !1;
			t[Wr] = (n) => {
				a || (a = !0, r(), C(n ? h : m, [t]), t[Wr] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Wr].bind(null, !1);
			S[i] = e, p ? w(p, [t, o]) : o();
		},
		clone(e) {
			let a = ei(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function ti(e) {
	if (Li(e)) return e = Cs(e), e.children = null, e;
}
function ni(e) {
	if (!Li(e)) return Mr(e.type) && e.children ? Zr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && C(n.default)) return n.default();
	}
}
function ri(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ri(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ii(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === as ? (o.patchFlag & 128 && i++, r = r.concat(ii(o.children, t, s))) : (t || o.type !== ss) && r.push(s == null ? o : Cs(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
	return C(e) ? /* @__PURE__ */ m({ name: e.name }, t, { setup: e }) : e;
}
function ai() {
	let e = Is();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function oi(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function si(e) {
	let t = Is(), n = /* @__PURE__ */ fn(null);
	if (t) {
		let r = t.refs === c ? t.refs = {} : t.refs;
		Object.defineProperty(r, e, {
			enumerable: !0,
			get: () => n.value,
			set: (e) => n.value = e
		});
	}
	return n;
}
function ci(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var li = /* @__PURE__ */ new WeakMap();
function ui(e, t, n, r, i = !1) {
	if (v(e)) {
		e.forEach((e, a) => ui(e, t && (v(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Pi(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ui(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? $s(r.component) : r.el, o = i ? null : a, { i: s, r: l } = e, u = t && t.r, f = s.refs === c ? s.refs = {} : s.refs, p = s.setupState, m = /* @__PURE__ */ P(p), g = p === c ? d : (e) => !ci(f, e) && _(m, e), y = (e, t) => !(t && ci(f, t));
	if (u != null && u !== l) {
		if (di(t), w(u)) f[u] = null, g(u) && (p[u] = null);
		else if (/* @__PURE__ */ dn(u)) {
			let e = t;
			y(u, e.k) && (u.value = null), e.k && (f[e.k] = null);
		}
	}
	if (C(l)) Hn(l, s, 12, [o, f]);
	else {
		let t = w(l), r = /* @__PURE__ */ dn(l);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? g(l) ? p[l] : f[l] : y(l) || !e.k ? l.value : f[e.k];
					if (i) v(n) && h(n, a);
					else if (v(n)) n.includes(a) || n.push(a);
					else if (t) f[l] = [a], g(l) && (p[l] = f[l]);
					else {
						let t = [a];
						y(l, e.k) && (l.value = t), e.k && (f[e.k] = t);
					}
				} else t ? (f[l] = o, g(l) && (p[l] = o)) : r && (y(l, e.k) && (l.value = o), e.k && (f[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), li.delete(e);
				};
				t.id = -1, li.set(e, t), Po(t, n);
			} else di(e), s();
		}
	}
}
function di(e) {
	let t = li.get(e);
	t && (t.flags |= 8, li.delete(e));
}
var fi = !1, pi = () => {
	fi ||= (console.error("Hydration completed but contains mismatches."), !0);
}, mi = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", hi = (e) => e.namespaceURI.includes("MathML"), gi = (e) => {
	if (e.nodeType === 1) {
		if (mi(e)) return "svg";
		if (hi(e)) return "mathml";
	}
}, _i = (e) => e.nodeType === 8;
function vi(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: o, remove: s, insert: c, createComment: l } } = e, u = (e, t) => {
		if (!t.hasChildNodes()) {
			n(null, e, t), ar(), t._vnode = e;
			return;
		}
		d(t.firstChild, e, null, null, null), ar(), t._vnode = e;
	}, d = (n, r, s, l, u, f = !1) => {
		f ||= !!r.dynamicChildren;
		let b = _i(n) && n.data === "[", x = () => g(n, r, s, l, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: T } = r, E = n.nodeType;
		r.el = n, T === -2 && (f = !1, r.dynamicChildren = null);
		let D = null;
		switch (S) {
			case os:
				E === 3 ? (n.data !== r.children && (pi(), n.data = r.children), D = a(n)) : r.children === "" ? (c(r.el = i(""), o(n), n), D = n) : D = x();
				break;
			case ss:
				y(n) ? (D = a(n), v(r.el = n.content.firstChild, n, s)) : D = E !== 8 || b ? x() : a(n);
				break;
			case cs:
				if (b && (n = a(n), E = n.nodeType), E === 1 || E === 3) {
					D = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = a(D);
					return b ? a(D) : D;
				}
				x();
				break;
			case as:
				D = b ? h(n, r, s, l, u, f) : x();
				break;
			default: if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, s, l, u, f);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = o(n);
				if (D = b ? _(n) : _i(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, s, l, gi(e), f), Pi(r) && !r.type.__asyncResolved) {
					let t;
					b ? (t = G(as), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? ws("") : G("div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, s, l, u, f, e, m) : x() : w & 128 && (D = r.type.hydrate(n, r, s, l, gi(o(n)), u, f, e, d));
		}
		return C != null && ui(C, null, l, r), D;
	}, p = (e, t, n, i, a, o) => {
		o ||= !!t.dynamicChildren;
		let { type: c, dynamicProps: l, props: u, patchFlag: d, shapeFlag: p, dirs: h, transition: g } = t, _ = c === "input" || c === "option", b = !!l;
		if (_ || b || d !== -1) {
			h && vr(t, null, n, "created");
			let c = !1;
			if (y(e)) {
				c = Bo(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (c) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (p & 16 && !(u && (u.innerHTML || u.textContent))) {
				let r = m(e.firstChild, t, e, n, i, a, o);
				for (r && !xi(e, 1) && pi(); r;) {
					let e = r;
					r = r.nextSibling, s(e);
				}
			} else if (p & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (xi(e, 0) || pi(), e.textContent = t.children);
			}
			if (u) {
				if (_ || b || !o || d & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in u) (_ && (a.endsWith("value") || a === "indeterminate") || f(a) && !re(a) || a[0] === "." || t && !re(a) || l && l.includes(a)) && r(e, a, null, u[a], i, n);
				} else if (u.onClick) r(e, "onClick", null, u.onClick, void 0, n);
				else if (d & 4 && /* @__PURE__ */ rn(u.style)) for (let e in u.style) u.style[e];
			}
			let x;
			(x = u && u.onVnodeBeforeMount) && js(x, n, t), h && vr(t, null, n, "beforeMount"), ((x = u && u.onVnodeMounted) || h || c) && ns(() => {
				x && js(x, n, t), c && g.enter(e), h && vr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, m = (e, t, r, o, s, l, u) => {
		u ||= !!t.dynamicChildren;
		let f = t.children, p = f.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? f[t] : f[t] = Ds(f[t]), g = h.type === os;
			e ? (g && !u && t + 1 < p && Ds(f[t + 1]).type === os && (c(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = d(e, h, o, s, l, u)) : g && !h.children ? c(h.el = i(""), r) : (m || (m = !0, xi(r, 1) || pi()), n(null, h, r, null, o, s, gi(r), l));
		}
		return e;
	}, h = (e, t, n, r, i, s) => {
		let { slotScopeIds: u } = t;
		u && (i = i ? i.concat(u) : u);
		let d = o(e), f = m(a(e), t, d, n, r, i, s);
		return f && _i(f) && f.data === "]" ? a(t.anchor = f) : (pi(), c(t.anchor = l("]"), d, f), f);
	}, g = (e, t, r, i, c, l) => {
		if (Ci(e, t) || pi(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) s(n);
				else break;
			}
		}
		let u = a(e), d = o(e);
		return s(e), n(null, t, d, u, r, i, gi(d), c), r && (r.vnode.el = t.el, ho(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && _i(e) && (e.data === t && r++, e.data === n)) {
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
	return [u, d];
}
var yi = "data-allow-mismatch", bi = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function xi(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(yi);) e = e.parentElement;
	return Si(e && e.getAttribute(yi), t);
}
function Si(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(bi[t]);
	}
}
function Ci(e, t) {
	return xi(e.parentElement, 1) || wi(e) || Ti(t);
}
function wi(e) {
	return e.nodeType === 1 && Si(e.getAttribute(yi), 1);
}
function Ti({ props: e }) {
	let t = e && e[yi];
	return typeof t == "string" && Si(t, 1);
}
var Ei = ge().requestIdleCallback || ((e) => setTimeout(e, 1)), Di = ge().cancelIdleCallback || ((e) => clearTimeout(e)), Oi = (e = 1e4) => (t) => {
	let n = Ei(t, { timeout: e });
	return () => Di(n);
};
function ki(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Ai = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e);
	return n((e) => {
		if (e instanceof Element) {
			if (ki(e)) return t(), r.disconnect(), !1;
			r.observe(e);
		}
	}), () => r.disconnect();
}, ji = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, Mi = (e = []) => (t, n) => {
	w(e) && (e = [e]);
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
function Ni(e, t) {
	if (_i(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (_i(r)) if (r.data === "]") {
				if (--n === 0) break;
			} else r.data === "[" && n++;
			r = r.nextSibling;
		}
	} else t(e);
}
var Pi = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Fi(e) {
	C(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ B({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Ni(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = Fs;
			if (oi(e), u) return () => Ii(u, e);
			let t = (t) => {
				l = null, Wn(t, e, 13, !r);
			};
			if (s && e.suspense || Hs) return p().then((t) => () => Ii(t, e)).catch((e) => (t(e), () => r ? G(r, { error: e }) : null));
			let a = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(!!i), f, m;
			return $i(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Li(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				if (e.isUnmounted) {
					l = null;
					return;
				}
				t(n), c.value = n;
			}), () => {
				if (a.value && u) return Ii(u, e);
				if (c.value && r) return G(r, { error: c.value });
				if (n && !d.value) return Ii(n, e);
			};
		}
	});
}
function Ii(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = G(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Li = (e) => e.type.__isKeepAlive, Ri = {
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
		let n = Is(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), Po(() => {
				a.isDeactivated = !1, a.a && de(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && js(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = e.component;
			Wo(t.m), Wo(t.a), l(e, f, null, 1, s), Po(() => {
				t.da && de(t.da);
				let n = e.props && e.props.onVnodeUnmounted;
				n && js(n, t.parent, e), t.isDeactivated = !0;
			}, s);
		};
		function p(e) {
			Wi(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = ec(Pi(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !_s(t, o)) ? p(t) : o && Wi(o), i.delete(e), a.delete(e);
		}
		z(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => zi(e, t)), t && m((e) => !zi(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			g != null && (Ko(n.subTree.type) ? Po(() => {
				i.set(g, Gi(n.subTree));
			}, n.subTree.suspense) : i.set(g, Gi(n.subTree)));
		};
		return Yi(_), Zi(_), Qi(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = Gi(t);
				if (e.type === i.type && e.key === i.key) {
					Wi(i);
					let e = i.component.da;
					e && Po(e, r);
					return;
				}
				p(e);
			});
		}), () => {
			if (g = null, !t.default) return o = null;
			let n = t.default(), r = n[0];
			if (n.length > 1) return o = null, n;
			if (!gs(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = Gi(r);
			if (s.type === ss) return o = null, s;
			let c = s.type, l = ec(Pi(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !zi(u, l)) || d && l && zi(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = Cs(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && ri(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, Ko(r.type) ? r : s;
		};
	}
};
function zi(e, t) {
	return v(e) ? e.some((e) => zi(e, t)) : w(e) ? e.split(",").includes(t) : S(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Bi(e, t) {
	Hi(e, "a", t);
}
function Vi(e, t) {
	Hi(e, "da", t);
}
function Hi(e, t, n = Fs) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Ki(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Li(e.parent.vnode) && Ui(r, t, n, e), e = e.parent;
	}
}
function Ui(e, t, n, r) {
	let i = Ki(t, e, r, !0);
	$i(() => {
		h(r[t], i);
	}, n);
}
function Wi(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function Gi(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function Ki(e, t, n = Fs, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			rt();
			let i = zs(n), a = Un(t, n, e, r);
			return i(), it(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var qi = (e) => (t, n = Fs) => {
	(!Hs || e === "sp") && Ki(e, (...e) => t(...e), n);
}, Ji = qi("bm"), Yi = qi("m"), Xi = qi("bu"), Zi = qi("u"), Qi = qi("bum"), $i = qi("um"), ea = qi("sp"), ta = qi("rtg"), na = qi("rtc");
function ra(e, t = Fs) {
	Ki("ec", e, t);
}
var ia = "components", aa = "directives";
function oa(e, t) {
	return ua(ia, e, !0, t) || e;
}
var sa = /* @__PURE__ */ Symbol.for("v-ndc");
function ca(e) {
	return w(e) ? ua(ia, e, !1) || e : e || sa;
}
function la(e) {
	return ua(aa, e);
}
function ua(e, t, n = !0, r = !1) {
	let i = dr || Fs;
	if (i) {
		let n = i.type;
		if (e === ia) {
			let e = ec(n, !1);
			if (e && (e === t || e === A(t) || e === ce(A(t)))) return n;
		}
		let a = da(i[e] || n[e], t) || da(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function da(e, t) {
	return e && (e[t] || e[A(t)] || e[ce(A(t))]);
}
function fa(e, t, n, r) {
	let i, a = n && n[r], o = v(e);
	if (o || w(e)) {
		let n = o && /* @__PURE__ */ rn(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ on(e), s = /* @__PURE__ */ an(e), e = vt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? un(ln(e[n])) : ln(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (E(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
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
function pa(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (v(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function V(e, t, n = {}, r, i, a) {
	if (dr.ce || dr.parent && Pi(dr.parent) && dr.parent.ce) {
		let e = a != null && n.key == null ? m({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), H(), U(as, null, [G("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = ls.length;
	H();
	let c;
	try {
		let i = o && ma(o(n)), s = n.key || a || i && i.key;
		c = U(as, { key: (s && !T(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = ls.length; e > s; e--) ds();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function ma(e) {
	return e.some((e) => !gs(e) || !(e.type === ss || e.type === as && !ma(e.children))) ? e : null;
}
function ha(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : le(r)] = e[r];
	return n;
}
var ga = (e) => e ? Vs(e) ? $s(e) : ga(e.parent) : null, _a = /* @__PURE__ */ m(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ga(e.parent),
	$root: (e) => ga(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Va(e),
	$forceUpdate: (e) => e.f ||= () => {
		tr(e.update);
	},
	$nextTick: (e) => e.n ||= $n.bind(e.proxy),
	$watch: (e) => Or.bind(e)
}), va = (e, t) => e !== c && !e.__isScriptSetup && _(e, t), ya = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: l } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (va(r, t)) return o[t] = 1, r[t];
			else if (i !== c && _(i, t)) return o[t] = 2, i[t];
			else if (_(a, t)) return o[t] = 3, a[t];
			else if (n !== c && _(n, t)) return o[t] = 4, n[t];
			else Ia && (o[t] = 0);
		}
		let u = _a[t], d, f;
		if (u) return t === "$attrs" && mt(e.attrs, "get", ""), u(e);
		if ((d = s.__cssModules) && (d = d[t])) return d;
		if (n !== c && _(n, t)) return o[t] = 4, n[t];
		if (f = l.config.globalProperties, _(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return va(i, t) ? (i[t] = n, !0) : r !== c && _(r, t) ? (r[t] = n, !0) : _(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let l;
		return !!(n[s] || e !== c && s[0] !== "$" && _(e, s) || va(t, s) || _(a, s) || _(r, s) || _(_a, s) || _(i.config.globalProperties, s) || (l = o.__cssModules) && l[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? _(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, ba = /* @__PURE__ */ m({}, ya, {
	get(e, t) {
		if (t !== Symbol.unscopables) return ya.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !_e(t);
	}
});
function xa() {
	return null;
}
function Sa() {
	return null;
}
function Ca(e) {}
function wa(e) {}
function Ta() {
	return null;
}
function Ea() {}
function Da(e, t) {
	return null;
}
function Oa() {
	return Aa("useSlots").slots;
}
function ka() {
	return Aa("useAttrs").attrs;
}
function Aa(e) {
	let t = Is();
	return t.setupContext ||= Qs(t);
}
function ja(e) {
	return v(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Ma(e, t) {
	let n = ja(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? v(r) || C(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function Na(e, t) {
	return !e || !t ? e || t : v(e) && v(t) ? e.concat(t) : m({}, ja(e), ja(t));
}
function Pa(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Fa(e) {
	let t = Is(), n = Hs, r = e();
	Bs(), n && Rs(!1);
	let i = () => {
		zs(t), n && Rs(!0);
	}, a = () => {
		Is() !== t && t.scope.off(), Bs(), n && Rs(!1);
	};
	return D(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Ia = !0;
function La(e) {
	let t = Va(e), n = e.proxy, r = e.ctx;
	Ia = !1, t.beforeCreate && za(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: d, beforeMount: f, mounted: p, beforeUpdate: m, updated: h, activated: g, deactivated: _, beforeDestroy: y, beforeUnmount: b, destroyed: x, unmounted: S, render: w, renderTracked: T, renderTriggered: D, errorCaptured: O, serverPrefetch: k, expose: ee, inheritAttrs: te, components: ne, directives: re, filters: ie } = t;
	if (l && Ra(l, r, null), o) for (let e in o) {
		let t = o[e];
		C(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		E(t) && (e.data = /* @__PURE__ */ Qt(t));
	}
	if (Ia = !0, a) for (let e in a) {
		let t = a[e], i = K({
			get: C(t) ? t.bind(n, n) : C(t.get) ? t.get.bind(n, n) : u,
			set: !C(t) && C(t.set) ? t.set.bind(n) : u
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) Ba(s[e], r, n, e);
	if (c) {
		let e = C(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			yr(t, e[t]);
		});
	}
	d && za(d, e, "c");
	function ae(e, t) {
		v(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (ae(Ji, f), ae(Yi, p), ae(Xi, m), ae(Zi, h), ae(Bi, g), ae(Vi, _), ae(ra, O), ae(na, T), ae(ta, D), ae(Qi, b), ae($i, S), ae(ea, k), v(ee)) if (ee.length) {
		let t = e.exposed ||= {};
		ee.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	w && e.render === u && (e.render = w), te != null && (e.inheritAttrs = te), ne && (e.components = ne), re && (e.directives = re), k && oi(e);
}
function Ra(e, t, n = u) {
	v(e) && (e = Ka(e));
	for (let n in e) {
		let r = e[n], i;
		i = E(r) ? "default" in r ? br(r.from || n, r.default, !0) : br(r.from || n) : br(r), /* @__PURE__ */ dn(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function za(e, t, n) {
	Un(v(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ba(e, t, n, r) {
	let i = r.includes(".") ? kr(n, r) : () => n[r];
	if (w(e)) {
		let n = t[e];
		C(n) && z(i, n);
	} else if (C(e)) z(i, e.bind(n));
	else if (E(e)) if (v(e)) e.forEach((e) => Ba(e, t, n, r));
	else {
		let r = C(e.handler) ? e.handler.bind(n) : t[e.handler];
		C(r) && z(i, r, e);
	}
}
function Va(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ha(c, e, o, !0)), Ha(c, t, o)), E(t) && a.set(t, c), c;
}
function Ha(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ha(e, a, n, !0), i && i.forEach((t) => Ha(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ua[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ua = {
	data: Wa,
	props: Ya,
	emits: Ya,
	methods: Ja,
	computed: Ja,
	beforeCreate: qa,
	created: qa,
	beforeMount: qa,
	mounted: qa,
	beforeUpdate: qa,
	updated: qa,
	beforeDestroy: qa,
	beforeUnmount: qa,
	destroyed: qa,
	unmounted: qa,
	activated: qa,
	deactivated: qa,
	errorCaptured: qa,
	serverPrefetch: qa,
	components: Ja,
	directives: Ja,
	watch: Xa,
	provide: Wa,
	inject: Ga
};
function Wa(e, t) {
	return t ? e ? function() {
		return m(C(e) ? e.call(this, this) : e, C(t) ? t.call(this, this) : t);
	} : t : e;
}
function Ga(e, t) {
	return Ja(Ka(e), Ka(t));
}
function Ka(e) {
	if (v(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function qa(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Ja(e, t) {
	return e ? m(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ya(e, t) {
	return e ? v(e) && v(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : m(/* @__PURE__ */ Object.create(null), ja(e), ja(t ?? {})) : t;
}
function Xa(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = m(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = qa(e[r], t[r]);
	return n;
}
function Za() {
	return {
		app: null,
		config: {
			isNativeTag: d,
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
var Qa = 0;
function $a(e, t) {
	return function(n, r = null) {
		C(n) || (n = m({}, n)), r != null && !E(r) && (r = null);
		let i = Za(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Qa++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: oc,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && C(e.install) ? (a.add(e), e.install(c, ...t)) : C(e) && (a.add(e), e(c, ...t))), c;
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
					let u = c._ceVNode || G(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, $s(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Un(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = eo;
				eo = c;
				try {
					return e();
				} finally {
					eo = t;
				}
			}
		};
		return c;
	};
}
var eo = null;
function to(e, t, n = c) {
	let r = Is(), i = A(t), a = se(t), o = no(e, i), s = yn((o, s) => {
		let l, u = c, d;
		return Er(() => {
			let t = e[i];
			ue(l, t) && (l = t, s());
		}), {
			get() {
				return o(), n.get ? n.get(l) : l;
			},
			set(e) {
				let o = n.set ? n.set(e) : e;
				if (!ue(o, l) && !(u !== c && ue(e, u))) return;
				let f = r.vnode.props, p = !!(f && (t in f || i in f || a in f) && (`onUpdate:${t}` in f || `onUpdate:${i}` in f || `onUpdate:${a}` in f));
				p || (l = e, s()), r.emit(`update:${t}`, o), ue(e, u) && (ue(e, o) && !ue(o, d) || p && u !== c && !ue(o, l)) && s(), u = e, d = o;
			}
		};
	});
	return s[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? o || c : s,
				done: !1
			} : { done: !0 };
		} };
	}, s;
}
var no = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${A(t)}Modifiers`] || e[`${se(t)}Modifiers`];
function ro(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || c, i = n, a = t.startsWith("update:"), o = a && no(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => w(e) ? e.trim() : e)), o.number && (i = n.map(pe)));
	let s, l = r[s = le(t)] || r[s = le(A(t))];
	!l && a && (l = r[s = le(se(t))]), l && Un(l, e, 6, i);
	let u = r[s + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Un(u, e, 6, i);
	}
}
var io = /* @__PURE__ */ new WeakMap();
function ao(e, t, n = !1) {
	let r = n ? io : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!C(e)) {
		let r = (e) => {
			let n = ao(e, t, !0);
			n && (s = !0, m(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (E(e) && r.set(e, null), null) : (v(a) ? a.forEach((e) => o[e] = null) : m(o, a), E(e) && r.set(e, o), o);
}
function oo(e, t) {
	return !e || !f(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), _(e, t[0].toLowerCase() + t.slice(1)) || _(e, se(t)) || _(e, t));
}
function so(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: m, ctx: h, inheritAttrs: g } = e, _ = pr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Ds(l.call(t, e, u, d, m, f, h)), y = s;
		} else {
			let e = t;
			v = Ds(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), y = t.props ? s : lo(s);
		}
	} catch (t) {
		ls.length = 0, Wn(t, e, 1), v = G(ss);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(p) && (y = uo(y, a)), b = Cs(b, y, !1, !0));
	}
	return n.dirs && (b = Cs(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ri(b, n.transition), v = b, pr(_), v;
}
function co(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (gs(r)) {
			if (r.type !== ss || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var lo = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || f(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, uo = (e, t) => {
	let n = {};
	for (let r in e) (!p(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function fo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? po(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (mo(o, r, n) && !oo(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || po(r, o, l) : !!o;
	return !1;
}
function po(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (mo(t, e, a) && !oo(n, a)) return !0;
	}
	return !1;
}
function mo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && E(r) && E(i) ? !Oe(r, i) : r !== i;
}
function ho({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var go = {}, _o = () => Object.create(go), vo = (e) => Object.getPrototypeOf(e) === go;
function yo(e, t, n, r = !1) {
	let i = {}, a = _o();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), xo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ $t(i) : e.type.props ? i : a, e.attrs = a;
}
function bo(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ P(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (oo(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (_(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = A(o);
					i[t] = So(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		xo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !_(t, a) && ((r = se(a)) === a || !_(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = So(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !_(t, e)) && (delete a[e], l = !0);
	}
	l && ht(e.attrs, "set", "");
}
function xo(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (re(c)) continue;
		let l = t[c], u;
		i && _(i, u = A(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : oo(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ P(n), r = s || c;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = So(i, t, s, r[s], e, !_(r, s));
		}
	}
	return o;
}
function So(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = _(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && C(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = zs(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === se(n)) && (r = !0));
	}
	return r;
}
var Co = /* @__PURE__ */ new WeakMap();
function wo(e, t, n = !1) {
	let r = n ? Co : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], u = !1;
	if (!C(e)) {
		let r = (e) => {
			u = !0;
			let [n, r] = wo(e, t, !0);
			m(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !u) return E(e) && r.set(e, l), l;
	if (v(a)) for (let e = 0; e < a.length; e++) {
		let t = A(a[e]);
		To(t) && (o[t] = c);
	}
	else if (a) for (let e in a) {
		let t = A(e);
		if (To(t)) {
			let n = a[e], r = o[t] = v(n) || C(n) ? { type: n } : m({}, n), i = r.type, c = !1, l = !0;
			if (v(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = C(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = C(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || _(r, "default")) && s.push(t);
		}
	}
	let d = [o, s];
	return E(e) && r.set(e, d), d;
}
function To(e) {
	return e[0] !== "$" && !re(e);
}
var Eo = (e) => e === "_" || e === "_ctx" || e === "$stable", Do = (e) => v(e) ? e.map(Ds) : [Ds(e)], Oo = (e, t, n) => {
	if (t._n) return t;
	let r = R((...e) => Do(t(...e)), n);
	return r._c = !1, r;
}, ko = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Eo(n)) continue;
		let i = e[n];
		if (C(i)) t[n] = Oo(n, i, r);
		else if (i != null) {
			let e = Do(i);
			t[n] = () => e;
		}
	}
}, Ao = (e, t) => {
	let n = Do(t);
	e.slots.default = () => n;
}, jo = (e, t, n) => {
	for (let r in t) (n || !Eo(r)) && (e[r] = t[r]);
}, Mo = (e, t, n) => {
	let r = e.slots = _o();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (jo(r, t, n), n && fe(r, "_", e, !0)) : ko(t, r);
	} else t && Ao(e, t);
}, No = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = c;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : jo(i, t, n) : (a = !t.$stable, ko(t, i)), o = t;
	} else t && (Ao(e, t), o = { default: 1 });
	if (a) for (let e in i) !Eo(e) && o[e] == null && delete i[e];
}, Po = ns;
function Fo(e) {
	return Lo(e);
}
function Io(e) {
	return Lo(e, vi);
}
function Lo(e, t) {
	let n = ge();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = u, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !_s(e, t) && (r = ve(e), fe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case os:
				y(e, t, n, r);
				break;
			case ss:
				b(e, t, n, r);
				break;
			case cs:
				e ?? x(t, n, r, o);
				break;
			case as:
				te(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? ne(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, xe);
		}
		u != null && i ? ui(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && ui(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = d(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), O(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, s, c, l, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = o(e.type, c, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, i, s, Ro(e, c), l, u), _ && vr(e, null, i, "created"), E(d, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !re(e) && a(d, e, null, m[e], c, i);
			"value" in m && a(d, "value", null, m.value, c), (f = m.onVnodeBeforeMount) && js(f, i, e);
		}
		_ && vr(e, null, i, "beforeMount");
		let v = Bo(s, g);
		v && g.beforeEnter(d), r(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Po(() => {
			try {
				f && js(f, i, e), v && g.enter(d), _ && vr(e, null, i, "mounted");
			} finally {}
		}, s);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Ko(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Os(e[l]) : Ds(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, O = (e, t, n, r, i, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || c, h = t.props || c, g;
		if (n && zo(n, !1), (g = h.onVnodeBeforeUpdate) && js(g, n, t, e), f && vr(t, e, n, "beforeUpdate"), n && zo(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? k(e.dynamicChildren, d, l, n, r, Ro(t, i), o) : s || se(e, t, l, null, n, r, Ro(t, i), o, !1), u > 0) {
			if (u & 16) ee(l, m, h, n, i);
			else if (u & 2 && m.class !== h.class && a(l, "class", null, h.class, i), u & 4 && a(l, "style", m.style, h.style, i), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = m[r], s = h[r];
					(s !== o || r === "value") && a(l, r, o, s, i, n);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && ee(l, m, h, n, i);
		((g = h.onVnodeUpdated) || f) && Po(() => {
			g && js(g, n, t, e), f && vr(t, e, n, "updated");
		}, r);
	}, k = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === as || !_s(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, ee = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== c) for (let o in t) !re(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (re(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, te = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (k(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Vo(e, t, !0)) : se(e, t, n, f, a, o, c, l, u);
	}, ne = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ie(t, n, r, i, a, o, c) : ae(e, t, c);
	}, ie = (e, t, n, r, i, a, o) => {
		let s = e.component = Ps(e, r, i);
		if (Li(e) && (s.ctx.renderer = xe), Us(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, A, o), !e.el) {
				let r = s.subTree = G(ss);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else A(s, e, t, n, i, a, o);
	}, ae = (e, t, n) => {
		let r = t.component = e.component;
		if (fo(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			oe(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, A = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Uo(e);
					if (n) {
						t && (t.el = c.el, oe(e, t, o)), n.asyncDep.then(() => {
							Po(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				zo(e, !1), t ? (t.el = c.el, oe(e, t, o)) : t = c, n && de(n), (d = t.props && t.props.onVnodeBeforeUpdate) && js(d, s, t, c), zo(e, !0);
				let f = so(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ve(p), e, i, a), t.el = f.el, u === null && ho(e, f.el), r && Po(r, i), (d = t.props && t.props.onVnodeUpdated) && Po(() => js(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Pi(t);
				if (zo(e, !1), l && de(l), !m && (o = c && c.onVnodeBeforeMount) && js(o, d, t), zo(e, !0), s && j) {
					let t = () => {
						e.subTree = so(e), j(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = so(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Po(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Po(() => js(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Pi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Po(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Be(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => tr(u), zo(e, !0), l();
	}, oe = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, bo(e, t.props, r, n), No(e, t.children, n), rt(), ir(e), it();
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
		m & 8 ? (u & 16 && _e(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? le(l, d, n, r, i, a, o, s, c) : _e(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, ce = (e, t, n, r, i, a, o, s, c) => {
		e ||= l, t ||= l;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let r = t[p] = c ? Os(t[p]) : Ds(t[p]);
			v(e[p], r, n, null, i, a, o, s, c);
		}
		u > d ? _e(e, i, a, !0, !1, f) : D(t, n, r, i, a, o, s, c, f);
	}, le = (e, t, n, r, i, a, o, s, c) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], l = t[u] = c ? Os(t[u]) : Ds(t[u]);
			if (_s(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], l = t[p] = c ? Os(t[p]) : Ds(t[p]);
			if (_s(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, l = e < d ? t[e].el : r;
				for (; u <= p;) v(null, t[u] = c ? Os(t[u]) : Ds(t[u]), n, l, i, a, o, s, c), u++;
			}
		} else if (u > p) for (; u <= f;) fe(e[u], i, a, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = c ? Os(t[u]) : Ds(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					fe(r, i, a, !0);
					continue;
				}
				let l;
				if (r.key != null) l = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && _s(r, t[_])) {
					l = _;
					break;
				}
				l === void 0 ? fe(r, i, a, !0) : (C[l - h] = u + 1, l >= S ? S = l : x = !0, v(r, t[l], n, null, i, a, o, s, c), y++);
			}
			let w = x ? Ho(C) : l;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, l = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Go(f) : r;
				C[u] === 0 ? v(null, l, n, p, i, a, o, s, c) : x && (_ < 0 || u !== w[_] ? ue(l, n, p, 2) : _--);
			}
		}
	}, ue = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			ue(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, xe);
			return;
		}
		if (c === as) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) ue(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === cs) {
			S(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[Wr] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), Po(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[Wr];
				s._isLeaving && s[Wr](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, fe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (rt(), ui(s, null, n, e, !0), it()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Pi(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && js(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && vr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, xe, r) : l && !l.hasOnce && (a !== as || d > 0 && d & 64) ? _e(l, t, n, !1, !0) : (a === as && d & 384 || !i && u & 16) && _e(c, t, n), r && pe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Po(() => {
			_ && js(_, t, e), h && vr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, pe = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === as) {
			me(n, r);
			return;
		}
		if (t === cs) {
			C(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, me = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, he = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Wo(c), Wo(l), r && de(r), i.stop(), a && (a.flags |= 8, fe(o, e, t, n)), s && Po(s, t), Po(() => {
			e.isUnmounted = !0;
		}, t);
	}, _e = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
	}, ve = (e) => {
		if (e.shapeFlag & 6) return ve(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[jr];
		return n ? h(n) : t;
	}, ye = !1, be = (e, t, n) => {
		let r;
		e == null ? t._vnode && (fe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ye ||= (ye = !0, ir(r), ar(), !1);
	}, xe = {
		p: v,
		um: fe,
		m: ue,
		r: pe,
		mt: ie,
		mc: D,
		pc: se,
		pbc: k,
		n: ve,
		o: e
	}, Se, j;
	return t && ([Se, j] = t(xe)), {
		render: be,
		hydrate: Se,
		createApp: $a(be, Se)
	};
}
function Ro({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function zo({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bo(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vo(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (v(r) && v(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Os(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Vo(t, a)), a.type === os && (a.patchFlag === -1 && (a = i[e] = Os(a)), a.el = t.el), a.type === ss && !a.el && (a.el = t.el);
	}
}
function Ho(e) {
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
function Uo(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Uo(t);
}
function Wo(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Go(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Go(t.subTree) : null;
}
var Ko = (e) => e.__isSuspense, qo = 0, Jo = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) Xo(t, n, r, i, a, o, s, c, l);
		else {
			if (a && a.deps > 0 && !e.suspense.isInFallback) {
				t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
				return;
			}
			Zo(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: $o,
	normalize: es
};
function Yo(e, t) {
	let n = e.props && e.props[t];
	C(n) && n();
}
function Xo(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = Qo(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (Yo(e, "onPending"), Yo(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), rs(f, e.ssFallback)) : f.resolve(!1, !0);
}
function Zo(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, _s(h, f) ? (c(h, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : g && (_ || (c(m, p, n, r, i, null, a, o, s), rs(d, p)))) : (d.pendingId = qo++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : (c(m, p, n, r, i, null, a, o, s), rs(d, p))) : m && _s(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && _s(m, f)) c(m, f, n, r, i, d, a, o, s), rs(d, f);
	else if (Yo(t, "onPending"), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : qo++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e, pendingId: t } = d;
		e > 0 ? setTimeout(() => {
			d.pendingId === t && d.fallback(p);
		}, e) : e === 0 && d.fallback(p);
	}
}
function Qo(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = is(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? me(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: qo++,
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
					s === x.pendingId && (f(o, u, a === b && !e ? m(i) : a, 0), rr(c), d && r.ssFallback && (r.ssFallback.el = null));
				}), i && !x.isFallbackMountPending && (h(i.el) === u && (a = m(i), e = !0), p(i, l, x, !0), !g && d && r.ssFallback && Po(() => r.ssFallback.el = null, x)), g || f(o, u, a, 0);
			}
			x.isFallbackMountPending = !1, rs(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = x.parent, S = !1;
			for (; y;) {
				if (y.pendingBranch) {
					y.effects.push(...c), S = !0;
					break;
				}
				y = y.parent;
			}
			!S && !g && rr(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (t.deps--, t.deps === 0 && !n && t.resolve()), Yo(r, "onResolve");
		},
		fallback(e) {
			if (!x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			Yo(t, "onFallback");
			let o = m(n), l = () => {
				x.isFallbackMountPending = !1, x.isInFallback && (d(null, e, i, o, r, null, a, s, c), rs(x, e));
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
				Wn(t, e, 0);
			}).then((a) => {
				if (e.isUnmounted || x.isUnmounted || x.pendingId !== e.suspenseId) return;
				Bs(), e.asyncResolved = !0;
				let { vnode: s } = e;
				Gs(e, a, !1), i && (s.el = i);
				let c = !i && e.subTree.el;
				t(e, s, h(i || e.subTree.el), i ? null : m(e.subTree), x, o, n), c && (s.placeholder = null, g(c)), ho(e, s.el), r && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			x.isUnmounted = !0, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
		}
	};
	return x;
}
function $o(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = Qo(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function es(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = ts(r ? n.default : n), e.ssFallback = r ? ts(n.fallback) : G(ss);
}
function ts(e) {
	let t;
	if (C(e)) {
		let n = fs && e._c;
		n && (e._d = !1, H()), e = e(), n && (e._d = !0, t = us, ds());
	}
	return v(e) && (e = co(e)), e = Ds(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function ns(e, t) {
	t && t.pendingBranch ? v(e) ? t.effects.push(...e) : t.effects.push(e) : rr(e);
}
function rs(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, ho(r, i));
}
function is(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var as = /* @__PURE__ */ Symbol.for("v-fgt"), os = /* @__PURE__ */ Symbol.for("v-txt"), ss = /* @__PURE__ */ Symbol.for("v-cmt"), cs = /* @__PURE__ */ Symbol.for("v-stc"), ls = [], us = null;
function H(e = !1) {
	ls.push(us = e ? null : []);
}
function ds() {
	ls.pop(), us = ls[ls.length - 1] || null;
}
var fs = 1;
function ps(e, t = !1) {
	fs += e, e < 0 && us && t && (us.hasOnce = !0);
}
function ms(e) {
	return e.dynamicChildren = fs > 0 ? us || l : null, ds(), fs > 0 && us && us.push(e), e;
}
function hs(e, t, n, r, i, a) {
	return ms(W(e, t, n, r, i, a, !0));
}
function U(e, t, n, r, i) {
	return ms(G(e, t, n, r, i, !0));
}
function gs(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function _s(e, t) {
	return e.type === t.type && e.key === t.key;
}
function vs(e) {}
var ys = ({ key: e }) => e ?? null, bs = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : w(e) || /* @__PURE__ */ dn(e) || C(e) ? {
	i: dr,
	r: e,
	k: t,
	f: !!n
} : e);
function W(e, t = null, n = null, r = 0, i = null, a = e === as ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ys(t),
		ref: t && bs(t),
		scopeId: fr,
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
		ctx: dr
	};
	return s ? (ks(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= w(n) ? 8 : 16), fs > 0 && !o && us && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && us.push(c), c;
}
var G = xs;
function xs(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === sa) && (e = ss), gs(e)) {
		let r = Cs(e, t, !0);
		return n && ks(r, n), fs > 0 && !a && us && (r.shapeFlag & 6 ? us[us.indexOf(e)] = r : us.push(r)), r.patchFlag = -2, r;
	}
	if (tc(e) && (e = e.__vccOpts), t) {
		t = Ss(t);
		let { class: e, style: n } = t;
		e && !w(e) && (t.class = j(e)), E(n) && (/* @__PURE__ */ sn(n) && !v(n) && (n = m({}, n)), t.style = ve(n));
	}
	let o = w(e) ? 1 : Ko(e) ? 128 : Mr(e) ? 64 : E(e) ? 4 : C(e) ? 2 : 0;
	return W(e, t, n, r, i, o, a, !0);
}
function Ss(e) {
	return e ? /* @__PURE__ */ sn(e) || vo(e) ? m({}, e) : e : null;
}
function Cs(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? As(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ys(l),
		ref: t && t.ref ? n && a ? v(a) ? a.concat(bs(t)) : [a, bs(t)] : bs(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== as ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Cs(e.ssContent),
		ssFallback: e.ssFallback && Cs(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ri(u, c.clone(u)), u;
}
function ws(e = " ", t = 0) {
	return G(os, null, e, t);
}
function Ts(e, t) {
	let n = G(cs, null, e);
	return n.staticCount = t, n;
}
function Es(e = "", t = !1) {
	return t ? (H(), U(ss, null, e)) : G(ss, null, e);
}
function Ds(e) {
	return e == null || typeof e == "boolean" ? G(ss) : v(e) ? G(as, null, e.slice()) : gs(e) ? Os(e) : G(os, null, String(e));
}
function Os(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Cs(e);
}
function ks(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (v(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ks(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !vo(t) ? t._ctx = dr : r === 3 && dr && (dr.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (C(t)) {
		if (r & 65) {
			ks(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: dr
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [ws(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function As(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = j([t.class, r.class]));
		else if (e === "style") t.style = ve([t.style, r.style]);
		else if (f(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(v(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !p(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function js(e, t, n, r = null) {
	Un(e, t, 7, [n, r]);
}
var Ms = Za(), Ns = 0;
function Ps(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Ms, a = {
		uid: Ns++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Fe(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: wo(r, i),
		emitsOptions: ao(r, i),
		emit: null,
		emitted: null,
		propsDefaults: c,
		inheritAttrs: r.inheritAttrs,
		ctx: c,
		data: c,
		props: c,
		attrs: c,
		slots: c,
		refs: c,
		setupState: c,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ro.bind(null, a), e.ce && e.ce(a), a;
}
var Fs = null, Is = () => Fs || dr, Ls, Rs;
{
	let e = ge(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ls = t("__VUE_INSTANCE_SETTERS__", (e) => Fs = e), Rs = t("__VUE_SSR_SETTERS__", (e) => Hs = e);
}
var zs = (e) => {
	let t = Fs;
	return Ls(e), e.scope.on(), () => {
		e.scope.off(), Ls(t);
	};
}, Bs = () => {
	Fs && Fs.scope.off(), Ls(null);
};
function Vs(e) {
	return e.vnode.shapeFlag & 4;
}
var Hs = !1;
function Us(e, t = !1, n = !1) {
	t && Rs(t);
	let { props: r, children: i } = e.vnode, a = Vs(e);
	yo(e, r, a, t), Mo(e, i, n || t);
	let o = a ? Ws(e, t) : void 0;
	return t && Rs(!1), o;
}
function Ws(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ya);
	let { setup: r } = n;
	if (r) {
		rt();
		let n = e.setupContext = r.length > 1 ? Qs(e) : null, i = zs(e), a = Hn(r, e, 0, [e.props, n]), o = D(a);
		if (it(), i(), (o || e.sp) && !Pi(e) && oi(e), o) {
			if (a.then(Bs, Bs), t) return a.then((n) => {
				Gs(e, n, t);
			}).catch((t) => {
				Wn(t, e, 0);
			});
			e.asyncDep = a;
		} else Gs(e, a, t);
	} else Xs(e, t);
}
function Gs(e, t, n) {
	C(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : E(t) && (e.setupState = _n(t)), Xs(e, n);
}
var Ks, qs;
function Js(e) {
	Ks = e, qs = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, ba));
	};
}
var Ys = () => !Ks;
function Xs(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Ks && !r.render) {
			let t = r.template || Va(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = m(m({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = Ks(t, s);
			}
		}
		e.render = r.render || u, qs && qs(e);
	}
	{
		let t = zs(e);
		rt();
		try {
			La(e);
		} finally {
			it(), t();
		}
	}
}
var Zs = { get(e, t) {
	return mt(e, "get", ""), e[t];
} };
function Qs(e) {
	return {
		attrs: new Proxy(e.attrs, Zs),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function $s(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(_n(cn(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in _a) return _a[n](e);
		},
		has(e, t) {
			return t in e || t in _a;
		}
	}) : e.proxy;
}
function ec(e, t = !0) {
	return C(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function tc(e) {
	return C(e) && "__vccOpts" in e;
}
var K = (e, t) => /* @__PURE__ */ En(e, t, Hs);
function nc(e, t, n) {
	try {
		ps(-1);
		let r = arguments.length;
		return r === 2 ? E(t) && !v(t) ? gs(t) ? G(e, null, [t]) : G(e, t) : G(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && gs(n) && (n = [n]), G(e, t, n));
	} finally {
		ps(1);
	}
}
function rc() {}
function ic(e, t, n, r) {
	let i = n[r];
	if (i && ac(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function ac(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (ue(n[e], t[e])) return !1;
	return fs > 0 && us && us.push(e), !0;
}
var oc = "3.5.40", sc = u, cc = Vn, lc = cr, uc = ur, dc = {
	createComponentInstance: Ps,
	setupComponent: Us,
	renderComponentRoot: so,
	setCurrentRenderingInstance: pr,
	isVNode: gs,
	normalizeVNode: Ds,
	getComponentPublicInstance: $s,
	ensureValidVNode: ma,
	pushWarningContext: Ln,
	popWarningContext: Rn
}, fc = void 0, pc = typeof window < "u" && window.trustedTypes;
if (pc) try {
	fc = /* @__PURE__ */ pc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var mc = fc ? (e) => fc.createHTML(e) : (e) => e, hc = "http://www.w3.org/2000/svg", gc = "http://www.w3.org/1998/Math/MathML", _c = typeof document < "u" ? document : null, vc = _c && /* @__PURE__ */ _c.createElement("template"), yc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? _c.createElementNS(hc, e) : t === "mathml" ? _c.createElementNS(gc, e) : n ? _c.createElement(e, { is: n }) : _c.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => _c.createTextNode(e),
	createComment: (e) => _c.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => _c.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			vc.innerHTML = mc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = vc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, bc = "transition", xc = "animation", Sc = /* @__PURE__ */ Symbol("_vtc"), Cc = {
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
}, wc = /* @__PURE__ */ m({}, Jr, Cc), Tc = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = wc, e))((e, { slots: t }) => nc(Qr, Oc(e), t)), Ec = (e, t = []) => {
	v(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Dc = (e) => e ? v(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Oc(e) {
	let t = {};
	for (let n in e) n in Cc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: f = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, h = kc(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Mc(e, t ? u : s), Mc(e, t ? l : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, Mc(e, d), Mc(e, p), Mc(e, f), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Ec(i, [t, o]), Nc(() => {
			Mc(t, e ? c : a), jc(t, e ? u : s), Dc(i) || Fc(t, r, g, o);
		});
	};
	return m(t, {
		onBeforeEnter(e) {
			Ec(v, [e]), jc(e, a), jc(e, o);
		},
		onBeforeAppear(e) {
			Ec(C, [e]), jc(e, c), jc(e, l);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			jc(e, d), e._enterCancelled ? (jc(e, f), zc(e)) : (zc(e), jc(e, f)), Nc(() => {
				e._isLeaving && (Mc(e, d), jc(e, p), Dc(x) || Fc(e, r, _, n));
			}), Ec(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Ec(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Ec(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), Ec(S, [e]);
		}
	});
}
function kc(e) {
	if (e == null) return null;
	if (E(e)) return [Ac(e.enter), Ac(e.leave)];
	{
		let t = Ac(e);
		return [t, t];
	}
}
function Ac(e) {
	return me(e);
}
function jc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Sc] || (e[Sc] = /* @__PURE__ */ new Set())).add(t);
}
function Mc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Sc];
	n && (n.delete(t), n.size || (e[Sc] = void 0));
}
function Nc(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Pc = 0;
function Fc(e, t, n, r) {
	let i = e._endId = ++Pc, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Ic(e, t);
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
function Ic(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${bc}Delay`), a = r(`${bc}Duration`), o = Lc(i, a), s = r(`${xc}Delay`), c = r(`${xc}Duration`), l = Lc(s, c), u = null, d = 0, f = 0;
	t === bc ? o > 0 && (u = bc, d = o, f = a.length) : t === xc ? l > 0 && (u = xc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? bc : xc : null, f = u ? u === bc ? a.length : c.length : 0);
	let p = u === bc && /\b(?:transform|all)(?:,|$)/.test(r(`${bc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Lc(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Rc(t) + Rc(e[n])));
}
function Rc(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function zc(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Bc(e, t, n) {
	let r = e[Sc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Vc = /* @__PURE__ */ Symbol("_vod"), Hc = /* @__PURE__ */ Symbol("_vsh"), Uc = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[Vc] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Wc(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Wc(e, !0), r.enter(e)) : r.leave(e, () => {
			Wc(e, !1);
		}) : Wc(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Wc(e, t);
	}
};
function Wc(e, t) {
	e.style.display = t ? e[Vc] : "none", e[Hc] = !t;
}
function Gc() {
	Uc.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var Kc = /* @__PURE__ */ Symbol("");
function qc(e) {
	let t = Is();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => Yc(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? Yc(t.ce, r) : Jc(t.subTree, r), n(r);
	};
	Xi(() => {
		rr(r);
	}), Yi(() => {
		z(r, u, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), $i(() => e.disconnect());
	});
}
function Jc(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			Jc(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) Yc(e.el, t);
	else if (e.type === as) e.children.forEach((e) => Jc(e, t));
	else if (e.type === cs) {
		let { el: n, anchor: r } = e;
		for (; n && (Yc(n, t), n !== r);) n = n.nextSibling;
	}
}
function Yc(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = Ne(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[Kc] = r;
	}
}
var Xc = /(?:^|;)\s*display\s*:/;
function Zc(e, t, n) {
	let r = e.style, i = w(n), a = !1;
	if (n && !i) {
		if (t) if (w(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? $c(r, t, "");
		}
		else for (let e in t) n[e] ?? $c(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? $c(r, i, "") : rl(e, i, !w(t) && t ? t[i] : void 0, o) || $c(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Kc];
			e && (n += ";" + e), r.cssText = n, a = Xc.test(n);
		}
	} else t && e.removeAttribute("style");
	Vc in e && (e[Vc] = a ? r.display : "", e[Hc] && (r.display = "none"));
}
var Qc = /\s*!important$/;
function $c(e, t, n) {
	if (v(n)) n.forEach((n) => $c(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = nl(e, t);
		Qc.test(n) ? e.setProperty(se(r), n.replace(Qc, ""), "important") : e[r] = n;
	}
}
var el = [
	"Webkit",
	"Moz",
	"ms"
], tl = {};
function nl(e, t) {
	let n = tl[t];
	if (n) return n;
	let r = A(t);
	if (r !== "filter" && r in e) return tl[t] = r;
	r = ce(r);
	for (let n = 0; n < el.length; n++) {
		let i = el[n] + r;
		if (i in e) return tl[t] = i;
	}
	return t;
}
function rl(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && w(r) && n === r;
}
var il = "http://www.w3.org/1999/xlink";
function al(e, t, n, r, i, a = Te(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(il, t.slice(6, t.length)) : e.setAttributeNS(il, t, n) : n == null || a && !Ee(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : T(n) ? String(n) : n);
}
function ol(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? mc(n) : n);
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
		r === "boolean" ? n = Ee(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function sl(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function cl(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ll = /* @__PURE__ */ Symbol("_vei");
function ul(e, t, n, r, i = null) {
	let a = e[ll] || (e[ll] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = pl(t);
		r ? sl(e, n, a[t] = _l(r, i), s) : o && (cl(e, n, o, s), a[t] = void 0);
	}
}
var dl = /(Once|Passive|Capture)$/, fl = /^on:?(?:Once|Passive|Capture)$/;
function pl(e) {
	let t, n;
	for (; (n = e.match(dl)) && !fl.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : se(e.slice(2)), t];
}
var ml = 0, hl = /* @__PURE__ */ Promise.resolve(), gl = () => ml ||= (hl.then(() => ml = 0), Date.now());
function _l(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (v(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Un(e, t, 5, a);
			}
		} else Un(r, t, 5, [e]);
	};
	return n.value = e, n.attached = gl(), n;
}
var vl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Bc(e, r, o) : t === "style" ? Zc(e, n, r) : f(t) ? p(t) || ul(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : bl(e, t, r, o)) ? (ol(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && al(e, t, r, o, a, t !== "value")) : e._isVueCE && (xl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !w(r))) ? ol(e, A(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), al(e, t, r, o));
};
function bl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && vl(t) && C(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return vl(t) && w(n) ? !1 : t in e;
}
function xl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = A(t);
	return Array.isArray(n) ? n.some((e) => A(e) === r) : Object.keys(n).some((e) => A(e) === r);
}
var Sl = {};
// @__NO_SIDE_EFFECTS__
function Cl(e, t, n) {
	let r = /* @__PURE__ */ B(e, t);
	te(r) && (r = m({}, r, t));
	class i extends El {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var wl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ Cl(e, t, gu)), Tl = typeof HTMLElement < "u" ? HTMLElement : class {}, El = class e extends Tl {
	constructor(e, t = {}, n = hu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== hu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(m({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
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
		this._connected = !1, $n(() => {
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
			if (n && !v(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = me(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[A(e)] = !0);
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
		if (t) for (let e in t) _(this, e) || Object.defineProperty(this, e, { get: () => I(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = v(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(A)) Object.defineProperty(this, e, {
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
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Sl, r = A(e);
		t && this._numberProps && this._numberProps[r] && (n = me(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === Sl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(se(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(se(e), t + "") : t || this.removeAttribute(se(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), pu(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = G(this._def, m(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, te(t[0]) ? m({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), se(e) !== e && t(se(e), n);
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
function Dl(e) {
	let t = Is();
	return t && t.ce || null;
}
function Ol() {
	let e = Dl();
	return e && e.shadowRoot;
}
function kl(e = "$style") {
	{
		let t = Is();
		if (!t) return c;
		let n = t.type.__cssModules;
		return n && n[e] || c;
	}
}
var Al = /* @__PURE__ */ new WeakMap(), jl = /* @__PURE__ */ new WeakMap(), Ml = /* @__PURE__ */ Symbol("_moveCb"), Nl = /* @__PURE__ */ Symbol("_enterCb"), Pl = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ m({}, wc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Is(), r = Kr(), i, a;
		return Zi(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!zl(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(Fl), i.forEach(Il);
			let r = i.filter(Ll);
			zc(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				jc(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Ml] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Ml] = null, Mc(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ P(e), s = Oc(o), c = o.tag || as;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[Hc] && (i.push(t), ri(t, ei(t, s, r, n)), Al.set(t, Rl(t.el)));
			}
			a = t.default ? ii(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && ri(t, ei(t, s, r, n));
			}
			return G(c, null, a);
		};
	}
});
function Fl(e) {
	let t = e.el;
	t[Ml] && t[Ml](), t[Nl] && t[Nl]();
}
function Il(e) {
	jl.set(e, Rl(e.el));
}
function Ll(e) {
	let t = Al.get(e), n = jl.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function Rl(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function zl(e, t, n) {
	let r = e.cloneNode(), i = e[Sc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = Ic(r);
	return a.removeChild(r), o;
}
var Bl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return v(t) ? (e) => de(t, e) : t;
};
function Vl(e) {
	e.target.composing = !0;
}
function Hl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ul = /* @__PURE__ */ Symbol("_assign");
function Wl(e, t, n) {
	return t && (e = e.trim()), n && (e = pe(e)), e;
}
var Gl = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Ul] = Bl(i);
		let a = r || i.props && i.props.type === "number";
		sl(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Ul](Wl(e.value, n, a));
		}), (n || a) && sl(e, "change", () => {
			e.value = Wl(e.value, n, a);
		}), t || (sl(e, "compositionstart", Vl), sl(e, "compositionend", Hl), sl(e, "change", Hl));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Ul] = Bl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? pe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Kl = {
	deep: !0,
	created(e, t, n) {
		e[Ul] = Bl(n), sl(e, "change", () => {
			let t = e._modelValue, n = Zl(e), r = e.checked, i = e[Ul];
			if (v(t)) {
				let e = ke(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (b(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Ql(e, r));
		});
	},
	mounted: ql,
	beforeUpdate(e, t, n) {
		e[Ul] = Bl(n), ql(e, t, n);
	}
};
function ql(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (v(t)) i = ke(t, r.props.value) > -1;
	else if (b(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Oe(t, Ql(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Jl = {
	created(e, { value: t }, n) {
		e.checked = Oe(t, n.props.value), e[Ul] = Bl(n), sl(e, "change", () => {
			e[Ul](Zl(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Ul] = Bl(r), t !== n && (e.checked = Oe(t, r.props.value));
	}
}, Yl = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, sl(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? pe(Zl(e)) : Zl(e));
			e[Ul](e.multiple ? b(e._modelValue) ? new Set(t) : t : t[0]), e._assigning = !0, $n(() => {
				e._assigning = !1;
			});
		}), e[Ul] = Bl(r);
	},
	mounted(e, { value: t }) {
		Xl(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Ul] = Bl(n);
	},
	updated(e, { value: t }) {
		e._assigning || Xl(e, t);
	}
};
function Xl(e, t) {
	let n = e.multiple, r = v(t);
	if (!(n && !r && !b(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Zl(a);
			if (n) if (r) {
				let e = typeof o;
				a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : ke(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Oe(Zl(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Zl(e) {
	return "_value" in e ? e._value : e.value;
}
function Ql(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var $l = {
	created(e, t, n) {
		tu(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		tu(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		tu(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		tu(e, t, n, r, "updated");
	}
};
function eu(e, t) {
	switch (e) {
		case "SELECT": return Yl;
		case "TEXTAREA": return Gl;
		default: switch (t) {
			case "checkbox": return Kl;
			case "radio": return Jl;
			default: return Gl;
		}
	}
}
function tu(e, t, n, r, i) {
	let a = eu(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function nu() {
	Gl.getSSRProps = ({ value: e }) => ({ value: e }), Jl.getSSRProps = ({ value: e }, t) => {
		if (t.props && Oe(t.props.value, e)) return { checked: !0 };
	}, Kl.getSSRProps = ({ value: e }, t) => {
		if (v(e)) {
			if (t.props && ke(e, t.props.value) > -1) return { checked: !0 };
		} else if (b(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, $l.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = eu(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var ru = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], iu = {
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
	exact: (e, t) => ru.some((n) => e[`${n}Key`] && !t.includes(n))
}, au = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = iu[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, ou = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, su = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = se(n.key);
		if (t.some((e) => e === r || ou[e] === r)) return e(n);
	}));
}, cu = /* @__PURE__ */ m({ patchProp: yl }, yc), lu, uu = !1;
function du() {
	return lu ||= Fo(cu);
}
function fu() {
	return lu = uu ? lu : Io(cu), uu = !0, lu;
}
var pu = ((...e) => {
	du().render(...e);
}), mu = ((...e) => {
	fu().hydrate(...e);
}), hu = ((...e) => {
	let t = du().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = vu(e);
		if (!r) return;
		let i = t._component;
		!C(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, _u(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), gu = ((...e) => {
	let t = fu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = vu(e);
		if (t) return n(t, !0, _u(t));
	}, t;
});
function _u(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function vu(e) {
	return w(e) ? document.querySelector(e) : e;
}
var yu = !1, bu = () => {
	yu || (yu = !0, nu(), Gc());
}, xu = /* @__PURE__ */ n({
	BaseTransition: () => Qr,
	BaseTransitionPropsValidators: () => Jr,
	Comment: () => ss,
	DeprecationTypes: () => null,
	EffectScope: () => Fe,
	ErrorCodes: () => Bn,
	ErrorTypeStrings: () => cc,
	Fragment: () => as,
	KeepAlive: () => Ri,
	ReactiveEffect: () => Be,
	Static: () => cs,
	Suspense: () => Jo,
	Teleport: () => Vr,
	Text: () => os,
	TrackOpTypes: () => Dn,
	Transition: () => Tc,
	TransitionGroup: () => Pl,
	TriggerOpTypes: () => On,
	VueElement: () => El,
	assertNumber: () => zn,
	callWithAsyncErrorHandling: () => Un,
	callWithErrorHandling: () => Hn,
	camelize: () => A,
	capitalize: () => ce,
	cloneVNode: () => Cs,
	compatUtils: () => null,
	compile: () => Su,
	computed: () => K,
	createApp: () => hu,
	createBlock: () => U,
	createCommentVNode: () => Es,
	createElementBlock: () => hs,
	createElementVNode: () => W,
	createHydrationRenderer: () => Io,
	createPropsRestProxy: () => Pa,
	createRenderer: () => Fo,
	createSSRApp: () => gu,
	createSlots: () => pa,
	createStaticVNode: () => Ts,
	createTextVNode: () => ws,
	createVNode: () => G,
	customRef: () => yn,
	defineAsyncComponent: () => Fi,
	defineComponent: () => B,
	defineCustomElement: () => Cl,
	defineEmits: () => Sa,
	defineExpose: () => Ca,
	defineModel: () => Ea,
	defineOptions: () => wa,
	defineProps: () => xa,
	defineSSRCustomElement: () => wl,
	defineSlots: () => Ta,
	devtools: () => lc,
	effect: () => $e,
	effectScope: () => Ie,
	getCurrentInstance: () => Is,
	getCurrentScope: () => Le,
	getCurrentWatcher: () => Mn,
	getTransitionRawChildren: () => ii,
	guardReactiveProps: () => Ss,
	h: () => nc,
	handleError: () => Wn,
	hasInjectionContext: () => xr,
	hydrate: () => mu,
	hydrateOnIdle: () => Oi,
	hydrateOnInteraction: () => Mi,
	hydrateOnMediaQuery: () => ji,
	hydrateOnVisible: () => Ai,
	initCustomFormatter: () => rc,
	initDirectivesForSSR: () => bu,
	inject: () => br,
	isMemoSame: () => ac,
	isProxy: () => sn,
	isReactive: () => rn,
	isReadonly: () => an,
	isRef: () => dn,
	isRuntimeOnly: () => Ys,
	isShallow: () => on,
	isVNode: () => gs,
	markRaw: () => cn,
	mergeDefaults: () => Ma,
	mergeModels: () => Na,
	mergeProps: () => As,
	nextTick: () => $n,
	nodeOps: () => yc,
	normalizeClass: () => j,
	normalizeProps: () => Ce,
	normalizeStyle: () => ve,
	onActivated: () => Bi,
	onBeforeMount: () => Ji,
	onBeforeUnmount: () => Qi,
	onBeforeUpdate: () => Xi,
	onDeactivated: () => Vi,
	onErrorCaptured: () => ra,
	onMounted: () => Yi,
	onRenderTracked: () => na,
	onRenderTriggered: () => ta,
	onScopeDispose: () => Re,
	onServerPrefetch: () => ea,
	onUnmounted: () => $i,
	onUpdated: () => Zi,
	onWatcherCleanup: () => Nn,
	openBlock: () => H,
	patchProp: () => yl,
	popScopeId: () => hr,
	provide: () => yr,
	proxyRefs: () => _n,
	pushScopeId: () => mr,
	queuePostFlushCb: () => rr,
	reactive: () => Qt,
	readonly: () => en,
	ref: () => F,
	registerRuntimeCompiler: () => Js,
	render: () => pu,
	renderList: () => fa,
	renderSlot: () => V,
	resolveComponent: () => oa,
	resolveDirective: () => la,
	resolveDynamicComponent: () => ca,
	resolveFilter: () => null,
	resolveTransitionHooks: () => ei,
	setBlockTracking: () => ps,
	setDevtoolsHook: () => uc,
	setTransitionHooks: () => ri,
	shallowReactive: () => $t,
	shallowReadonly: () => tn,
	shallowRef: () => fn,
	ssrContextKey: () => Sr,
	ssrUtils: () => dc,
	stop: () => et,
	toDisplayString: () => M,
	toHandlerKey: () => le,
	toHandlers: () => ha,
	toRaw: () => P,
	toRef: () => Cn,
	toRefs: () => bn,
	toValue: () => L,
	transformVNodeArgs: () => vs,
	triggerRef: () => hn,
	unref: () => I,
	useAttrs: () => ka,
	useCssModule: () => kl,
	useCssVars: () => qc,
	useHost: () => Dl,
	useId: () => ai,
	useModel: () => to,
	useSSRContext: () => Cr,
	useShadowRoot: () => Ol,
	useSlots: () => Oa,
	useTemplateRef: () => si,
	useTransitionState: () => Kr,
	vModelCheckbox: () => Kl,
	vModelDynamic: () => $l,
	vModelRadio: () => Jl,
	vModelSelect: () => Yl,
	vModelText: () => Gl,
	vShow: () => Uc,
	version: () => oc,
	warn: () => sc,
	watch: () => z,
	watchEffect: () => wr,
	watchPostEffect: () => Tr,
	watchSyncEffect: () => Er,
	withAsyncContext: () => Fa,
	withCtx: () => R,
	withDefaults: () => Da,
	withDirectives: () => _r,
	withKeys: () => su,
	withMemo: () => ic,
	withModifiers: () => au,
	withScopeId: () => gr
}), Su = () => {}, Cu = /* @__PURE__ */ t(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 
		/* istanbul ignore next */ 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), wu = /* @__PURE__ */ t(((e, t) => {
	t.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), Tu = /* @__PURE__ */ t(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = Cu(), a = wu();
	e = t.exports = {};
	var o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = "[a-zA-Z0-9-]", p = [
		["\\s", 1],
		["\\d", i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? "g" : void 0), s[i] = new RegExp(r, n ? "g" : void 0);
	};
	h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), h("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${f}+`), h("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h("FULL", `^${c[u.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h("LOOSE", `^${c[u.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[u.COERCE], !0), h("COERCERTLFULL", c[u.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", h("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", h("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), Eu = /* @__PURE__ */ t(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), Du = /* @__PURE__ */ t(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), Ou = /* @__PURE__ */ t(((e, t) => {
	var n = wu(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = Cu(), { safeRe: a, t: o } = Tu(), s = Eu(), { compareIdentifiers: c } = Du(), l = (e, t) => {
		let n = t.split(".");
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (c(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			this.prerelease = l[4] ? l[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = l[5] ? l[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), l(this.prerelease, t)) {
							let e = this.prerelease[t.split(".").length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), ku = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), Au = /* @__PURE__ */ t(((e, t) => {
	var n = ku();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), ju = /* @__PURE__ */ t(((e, t) => {
	var n = ku();
	t.exports = (e, t) => {
		let r = n(e.trim().replace(/^[=v]+/, ""), t);
		return r ? r.version : null;
	};
})), Mu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t, r, i, a) => {
		typeof r == "string" && (a = i, i = r, r = void 0);
		try {
			return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
		} catch {
			return null;
		}
	};
})), Nu = /* @__PURE__ */ t(((e, t) => {
	var n = ku();
	t.exports = (e, t) => {
		let r = n(e, null, !0), i = n(t, null, !0), a = r.compare(i);
		if (a === 0) return null;
		let o = a > 0, s = o ? r : i, c = o ? i : r, l = !!s.prerelease.length;
		if (c.prerelease.length && !l) {
			if (!c.patch && !c.minor) return "major";
			if (c.compareMain(s) === 0) return c.minor && !c.patch ? "minor" : "patch";
		}
		let u = l ? "pre" : "";
		return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? "prerelease" : u + "patch" : u + "minor" : u + "major";
	};
})), Pu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t) => new n(e, t).major;
})), Fu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t) => new n(e, t).minor;
})), Iu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t) => new n(e, t).patch;
})), Lu = /* @__PURE__ */ t(((e, t) => {
	var n = ku();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r && r.prerelease.length ? r.prerelease : null;
	};
})), Ru = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
})), zu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(t, e, r);
})), Bu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t) => n(e, t, !0);
})), Vu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou();
	t.exports = (e, t, r) => {
		let i = new n(e, r), a = new n(t, r);
		return i.compare(a) || i.compareBuild(a);
	};
})), Hu = /* @__PURE__ */ t(((e, t) => {
	var n = Vu();
	t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
})), Uu = /* @__PURE__ */ t(((e, t) => {
	var n = Vu();
	t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
})), Wu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) > 0;
})), Gu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) < 0;
})), Ku = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) === 0;
})), qu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) !== 0;
})), Ju = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) >= 0;
})), Yu = /* @__PURE__ */ t(((e, t) => {
	var n = Ru();
	t.exports = (e, t, r) => n(e, t, r) <= 0;
})), Xu = /* @__PURE__ */ t(((e, t) => {
	var n = Ku(), r = qu(), i = Wu(), a = Ju(), o = Gu(), s = Yu();
	t.exports = (e, t, c, l) => {
		switch (t) {
			case "===": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e === c;
			case "!==": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e !== c;
			case "":
			case "=":
			case "==": return n(e, c, l);
			case "!=": return r(e, c, l);
			case ">": return i(e, c, l);
			case ">=": return a(e, c, l);
			case "<": return o(e, c, l);
			case "<=": return s(e, c, l);
			default: throw TypeError(`Invalid operator: ${t}`);
		}
	};
})), Zu = /* @__PURE__ */ t(((e, t) => {
	var n = Ou(), r = ku(), { safeRe: i, t: a } = Tu();
	t.exports = (e, t) => {
		if (e instanceof n) return e;
		if (typeof e == "number" && (e = String(e)), typeof e != "string") return null;
		t ||= {};
		let o = null;
		if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
		else {
			let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL], r;
			for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);) (!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
			n.lastIndex = -1;
		}
		if (o === null) return null;
		let s = o[2];
		return r(`${s}.${o[3] || "0"}.${o[4] || "0"}${t.includePrerelease && o[5] ? `-${o[5]}` : ""}${t.includePrerelease && o[6] ? `+${o[6]}` : ""}`, t);
	};
})), Qu = /* @__PURE__ */ t(((e, t) => {
	var n = ku(), r = Cu(), i = Ou(), a = (e, t, n) => {
		if (!r.RELEASE_TYPES.includes(t)) return null;
		let i = o(e, n);
		return i && s(i, t);
	}, o = (e, t) => n(e instanceof i ? e.version : e, t), s = (e, t) => {
		if (c(t)) return e.version;
		switch (e.prerelease = [], t) {
			case "major":
				e.minor = 0, e.patch = 0;
				break;
			case "minor": e.patch = 0;
		}
		return e.format();
	}, c = (e) => e.startsWith("pre");
	t.exports = a;
})), $u = /* @__PURE__ */ t(((e, t) => {
	t.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(e) {
			let t = this.map.get(e);
			if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t;
		}
		delete(e) {
			return this.map.delete(e);
		}
		set(e, t) {
			if (!this.delete(e) && t !== void 0) {
				if (this.map.size >= this.max) {
					let e = this.map.keys().next().value;
					this.delete(e);
				}
				this.map.set(e, t);
			}
			return this;
		}
	};
})), ed = /* @__PURE__ */ t(((e, t) => {
	var n = /\s+/g;
	t.exports = class e {
		constructor(t, r) {
			if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
			if (t instanceof a) return this.raw = t.value, this.set = [[t]], this.formatted = void 0, this;
			if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, " "), this.set = this.raw.split("||").map((e) => this.parseRange(e.trim())).filter((e) => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let e = this.set[0];
				if (this.set = this.set.filter((e) => !_(e[0])), this.set.length === 0) this.set = [e];
				else if (this.set.length > 1) {
					for (let e of this.set) if (e.length === 1 && v(e[0])) {
						this.set = [e];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let e = 0; e < this.set.length; e++) {
					e > 0 && (this.formatted += "||");
					let t = this.set[e];
					for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += " "), this.formatted += t[e].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(e) {
			e = e.replace(g, "");
			let t = ((this.options.includePrerelease && m) | (this.options.loose && h)) + ":" + e, n = r.get(t);
			if (n) return n;
			let i = this.options.loose, s = i ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
			e = e.replace(s, te(this.options.includePrerelease)), o("hyphen replace", e), e = e.replace(c[u.COMPARATORTRIM], d), o("comparator trim", e), e = e.replace(c[u.TILDETRIM], f), o("tilde trim", e), e = e.replace(c[u.CARETTRIM], p), o("caret trim", e);
			let l = e.split(" ").map((e) => b(e, this.options)).join(" ").split(/\s+/).map((e) => ee(e, this.options));
			i && (l = l.filter((e) => (o("loose invalid filter", e, this.options), !!e.match(c[u.COMPARATORLOOSE])))), o("range list", l);
			let v = /* @__PURE__ */ new Map(), y = l.map((e) => new a(e, this.options));
			for (let e of y) {
				if (_(e)) return [e];
				v.set(e.value, e);
			}
			v.size > 1 && v.has("") && v.delete("");
			let x = [...v.values()];
			return r.set(t, x), x;
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Range is required");
			return this.set.some((e) => y(e, n) && t.set.some((t) => y(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))));
		}
		test(e) {
			if (!e) return !1;
			if (typeof e == "string") try {
				e = new s(e, this.options);
			} catch {
				return !1;
			}
			for (let t = 0; t < this.set.length; t++) if (ne(this.set[t], e, this.options)) return !0;
			return !1;
		}
	};
	var r = new ($u())(), i = Eu(), a = td(), o = wu(), s = Ou(), { safeRe: c, src: l, t: u, comparatorTrimReplace: d, tildeTrimReplace: f, caretTrimReplace: p } = Tu(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: h } = Cu(), g = new RegExp(l[u.BUILD], "g"), _ = (e) => e.value === "<0.0.0-0", v = (e) => e.value === "", y = (e, t) => {
		let n = !0, r = e.slice(), i = r.pop();
		for (; n && r.length;) n = r.every((e) => i.intersects(e, t)), i = r.pop();
		return n;
	}, b = (e, t) => (e = e.replace(c[u.BUILD], ""), o("comp", e, t), e = T(e, t), o("caret", e), e = C(e, t), o("tildes", e), e = D(e, t), o("xrange", e), e = k(e, t), o("stars", e), e), x = (e) => !e || e.toLowerCase() === "x" || e === "*", S = (e, t, n) => x(e) && !x(t) || x(t) && n && !x(n), C = (e, t) => e.trim().split(/\s+/).map((e) => w(e, t)).join(" "), w = (e, t) => {
		let n = t.loose ? c[u.TILDELOOSE] : c[u.TILDE], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("tilde", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : s ? (o("replaceTilde pr", s), c = `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0`) : c = `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0`, o("tilde return", c), c;
		});
	}, T = (e, t) => e.trim().split(/\s+/).map((e) => E(e, t)).join(" "), E = (e, t) => {
		o("caret", e, t);
		let n = t.loose ? c[u.CARETLOOSE] : c[u.CARET], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("caret", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = n === "0" ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0` : s ? (o("replaceCaret pr", s), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`) : (o("no pr"), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`), o("caret return", c), c;
		});
	}, D = (e, t) => (o("replaceXRanges", e, t), e.split(/\s+/).map((e) => O(e, t)).join(" ")), O = (e, t) => {
		e = e.trim();
		let n = t.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
		return e.replace(n, (n, r, i, a, s, c) => {
			if (o("xRange", e, n, r, i, a, s, c), S(i, a, s)) return e;
			let l = x(i), u = l || x(a), d = u || x(s), f = d;
			return r === "=" && f && (r = ""), c = t.includePrerelease ? "-0" : "", l ? n = r === ">" || r === "<" ? "<0.0.0-0" : "*" : r && f ? (u && (a = 0), s = 0, r === ">" ? (r = ">=", u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === "<=" && (r = "<", u ? i = +i + 1 : a = +a + 1), r === "<" && (c = "-0"), n = `${r + i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i + 1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`), o("xRange return", n), n;
		});
	}, k = (e, t) => (o("replaceStars", e, t), e.trim().replace(c[u.STAR], "")), ee = (e, t) => (o("replaceGTE0", e, t), e.trim().replace(c[t.includePrerelease ? u.GTE0PRE : u.GTE0], "")), te = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = x(r) ? "" : x(i) ? `>=${r}.0.0${e ? "-0" : ""}` : x(a) ? `>=${r}.${i}.0${e ? "-0" : ""}` : o ? `>=${n}` : `>=${n}${e ? "-0" : ""}`, c = x(l) ? "" : x(u) ? `<${+l + 1}.0.0-0` : x(d) ? `<${l}.${+u + 1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d + 1}-0` : `<=${c}`, `${n} ${c}`.trim()), ne = (e, t, n) => {
		for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
		if (t.prerelease.length && !n.includePrerelease) {
			for (let n = 0; n < e.length; n++) if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
				let r = e[n].semver;
				if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), td = /* @__PURE__ */ t(((e, t) => {
	var n = Symbol("SemVer ANY");
	t.exports = class e {
		static get ANY() {
			return n;
		}
		constructor(t, i) {
			if (i = r(i), t instanceof e) {
				if (t.loose === !!i.loose) return t;
				t = t.value;
			}
			t = t.trim().split(/\s+/).join(" "), s("comparator", t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.value = this.semver === n ? "" : this.operator + this.semver.version, s("comp", this);
		}
		parse(e) {
			let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR], r = e.match(t);
			if (!r) throw TypeError(`Invalid comparator: ${e}`);
			this.operator = r[1] === void 0 ? "" : r[1], this.operator === "=" && (this.operator = ""), this.semver = r[2] ? new c(r[2], this.options.loose) : n;
		}
		toString() {
			return this.value;
		}
		test(e) {
			if (s("Comparator.test", e, this.options.loose), this.semver === n || e === n) return !0;
			if (typeof e == "string") try {
				e = new c(e, this.options);
			} catch {
				return !1;
			}
			return o(e, this.operator, this.semver, this.options);
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" || new l(t.value, n).test(this.value) : t.operator === "" ? t.value === "" || new l(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || o(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || o(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
		}
	};
	var r = Eu(), { safeRe: i, t: a } = Tu(), o = Xu(), s = wu(), c = Ou(), l = ed();
})), nd = /* @__PURE__ */ t(((e, t) => {
	var n = ed();
	t.exports = (e, t, r) => {
		try {
			t = new n(t, r);
		} catch {
			return !1;
		}
		return t.test(e);
	};
})), rd = /* @__PURE__ */ t(((e, t) => {
	var n = ed();
	t.exports = (e, t) => new n(e, t).set.map((e) => e.map((e) => e.value).join(" ").trim().split(" "));
})), id = /* @__PURE__ */ t(((e, t) => {
	var n = Ou(), r = ed();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i));
		}), a;
	};
})), ad = /* @__PURE__ */ t(((e, t) => {
	var n = Ou(), r = ed();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i));
		}), a;
	};
})), od = /* @__PURE__ */ t(((e, t) => {
	var n = Ou(), r = ed(), i = Wu();
	t.exports = (e, t) => {
		e = new r(e, t);
		let a = new n("0.0.0");
		if (e.test(a) || (a = new n("0.0.0-0"), e.test(a))) return a;
		a = null;
		for (let t = 0; t < e.set.length; ++t) {
			let r = e.set[t], o = null;
			r.forEach((e) => {
				let t = new n(e.semver.version);
				switch (e.operator) {
					case ">": t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
					case "":
					case ">=":
						(!o || i(t, o)) && (o = t);
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw Error(`Unexpected operation: ${e.operator}`);
				}
			}), o && (!a || i(a, o)) && (a = o);
		}
		return a && e.test(a) ? a : null;
	};
})), sd = /* @__PURE__ */ t(((e, t) => {
	var n = ed();
	t.exports = (e, t) => {
		try {
			return new n(e, t).range || "*";
		} catch {
			return null;
		}
	};
})), cd = /* @__PURE__ */ t(((e, t) => {
	var n = Ou(), r = td(), { ANY: i } = r, a = ed(), o = nd(), s = Wu(), c = Gu(), l = Yu(), u = Ju();
	t.exports = (e, t, d, f) => {
		e = new n(e, f), t = new a(t, f);
		let p, m, h, g, _;
		switch (d) {
			case ">":
				p = s, m = l, h = c, g = ">", _ = ">=";
				break;
			case "<":
				p = c, m = u, h = s, g = "<", _ = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (o(e, t, f)) return !1;
		for (let n = 0; n < t.set.length; ++n) {
			let a = t.set[n], o = null, s = null;
			if (a.forEach((e) => {
				e.semver === i && (e = new r(">=0.0.0")), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e);
			}), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1;
		}
		return !0;
	};
})), ld = /* @__PURE__ */ t(((e, t) => {
	var n = cd();
	t.exports = (e, t, r) => n(e, t, ">", r);
})), ud = /* @__PURE__ */ t(((e, t) => {
	var n = cd();
	t.exports = (e, t, r) => n(e, t, "<", r);
})), dd = /* @__PURE__ */ t(((e, t) => {
	var n = ed();
	t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r));
})), fd = /* @__PURE__ */ t(((e, t) => {
	var n = nd(), r = Ru();
	t.exports = (e, t, i) => {
		let a = [], o = null, s = null, c = e.sort((e, t) => r(e, t, i));
		for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
		o && a.push([o, null]);
		let l = [];
		for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push("*") : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
		let u = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
		return u.length < d.length ? u : t;
	};
})), pd = /* @__PURE__ */ t(((e, t) => {
	var n = ed(), r = td(), { ANY: i } = r, a = nd(), o = Ru(), s = (e, t, r = {}) => {
		if (e === t) return !0;
		e = new n(e, r), t = new n(t, r);
		let i = !1;
		OUTER: for (let n of e.set) {
			for (let e of t.set) {
				let t = u(n, e, r);
				if (i ||= t !== null, t) continue OUTER;
			}
			if (i) return !1;
		}
		return !0;
	}, c = [new r(">=0.0.0-0")], l = [new r(">=0.0.0")], u = (e, t, n) => {
		if (e === t) return !0;
		if (e.length === 1 && e[0].semver === i) {
			if (t.length === 1 && t[0].semver === i) return !0;
			e = n.includePrerelease ? c : l;
		}
		if (t.length === 1 && t[0].semver === i) {
			if (n.includePrerelease) return !0;
			t = l;
		}
		let r = /* @__PURE__ */ new Set(), s, u;
		for (let t of e) t.operator === ">" || t.operator === ">=" ? s = d(s, t, n) : t.operator === "<" || t.operator === "<=" ? u = f(u, t, n) : r.add(t.semver);
		if (r.size > 1) return null;
		let p;
		if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== ">=" || u.operator !== "<="))) return null;
		for (let e of r) {
			if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
			for (let r of t) if (!a(e, String(r), n)) return !1;
			return !0;
		}
		let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1, y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
		v && v.prerelease.length === 1 && u.operator === "<" && v.prerelease[0] === 0 && (v = !1);
		for (let e of t) {
			if (_ = _ || e.operator === ">" || e.operator === ">=", g = g || e.operator === "<" || e.operator === "<=", s) {
				if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === ">" || e.operator === ">=") {
					if (m = d(s, e, n), m === e && m !== s) return !1;
				} else if (s.operator === ">=" && !e.test(s.semver)) return !1;
			}
			if (u) {
				if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === "<" || e.operator === "<=") {
					if (h = f(u, e, n), h === e && h !== u) return !1;
				} else if (u.operator === "<=" && !e.test(u.semver)) return !1;
			}
			if (!e.operator && (u || s) && p !== 0) return !1;
		}
		return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v);
	}, d = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
	}, f = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
	};
	t.exports = s;
})), md = (/* @__PURE__ */ t(((e, t) => {
	var n = Tu(), r = Cu(), i = Ou(), a = Du();
	t.exports = {
		parse: ku(),
		valid: Au(),
		clean: ju(),
		inc: Mu(),
		diff: Nu(),
		major: Pu(),
		minor: Fu(),
		patch: Iu(),
		prerelease: Lu(),
		compare: Ru(),
		rcompare: zu(),
		compareLoose: Bu(),
		compareBuild: Vu(),
		sort: Hu(),
		rsort: Uu(),
		gt: Wu(),
		lt: Gu(),
		eq: Ku(),
		neq: qu(),
		gte: Ju(),
		lte: Yu(),
		cmp: Xu(),
		coerce: Zu(),
		truncate: Qu(),
		Comparator: td(),
		Range: ed(),
		satisfies: nd(),
		toComparators: rd(),
		maxSatisfying: id(),
		minSatisfying: ad(),
		minVersion: od(),
		validRange: sd(),
		outside: cd(),
		gtr: ld(),
		ltr: ud(),
		intersects: dd(),
		simplifyRange: fd(),
		subset: pd(),
		SemVer: i,
		re: n.re,
		src: n.src,
		tokens: n.t,
		SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: r.RELEASE_TYPES,
		compareIdentifiers: a.compareIdentifiers,
		rcompareIdentifiers: a.rcompareIdentifiers
	};
})))();
function hd(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function gd(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
var _d = {
	native_tool_manager: !1,
	main_generation_events: !1,
	message_swipe_metadata: !1,
	host_image_upload: !1
};
function vd(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function yd(e, t) {
	let n = vd(e, t);
	return n.ok && typeof n.value == "function";
}
function bd(e, t) {
	let n = vd(e, t);
	if (!n.ok || typeof n.value != "function") return { ok: !1 };
	try {
		return {
			ok: !0,
			value: Reflect.apply(n.value, e, [])
		};
	} catch {
		return { ok: !1 };
	}
}
function xd(e, t) {
	let n = bd(e, t);
	return n.ok && typeof n.value == "string" && n.value.trim().length > 0;
}
function Sd(e) {
	let t = vd(e, "eventSource"), n = vd(e, "eventTypes");
	if (!t.ok || !hd(t.value) || !n.ok || !hd(n.value)) return !1;
	let r = n.value, i = vd(r, "GENERATION_STARTED"), a = vd(r, "GENERATION_STOPPED"), o = vd(r, "GENERATION_ENDED"), s = vd(r, "STREAM_TOKEN_RECEIVED");
	return yd(t.value, "on") && yd(t.value, "removeListener") && i.ok && typeof i.value == "string" && i.value.length > 0 && a.ok && typeof a.value == "string" && a.value.length > 0 && o.ok && typeof o.value == "string" && o.value.length > 0 && s.ok && typeof s.value == "string" && s.value.length > 0;
}
function Cd(e) {
	let t = vd(e, "eventSource"), n = vd(e, "eventTypes");
	if (!t.ok || !hd(t.value) || !n.ok || !hd(n.value)) return !1;
	let r = vd(n.value, "CHAT_CHANGED"), i = vd(n.value, "MESSAGE_SWIPED");
	return yd(t.value, "on") && yd(t.value, "removeListener") && r.ok && typeof r.value == "string" && r.value.length > 0 && i.ok && typeof i.value == "string" && i.value.length > 0;
}
function wd(e) {
	let t = bd(e, "getRequestHeaders");
	if (!t.ok) return !1;
	try {
		return Ed(t.value), !0;
	} catch {
		return !1;
	}
}
function Td(e, t) {
	if (!hd(e)) return { ..._d };
	let n = bd(e, "getContext");
	if (!n.ok || !hd(n.value)) return { ..._d };
	let r = n.value, i = xd(r, "getCurrentLocale"), a = xd(r, "getCurrentChatId");
	return {
		native_tool_manager: yd(r, "registerFunctionTool") && yd(r, "unregisterFunctionTool"),
		main_generation_events: i && Sd(r),
		message_swipe_metadata: a && Cd(r),
		host_image_upload: typeof t == "function" && wd(r)
	};
}
function Ed(e) {
	if (!gd(e)) throw Error("SillyTavern returned invalid request headers");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("SillyTavern returned invalid request headers");
	}
	if (!gd(t) || !Object.values(t).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return t;
}
//#endregion
//#region src/host/tauritavern_host.ts
function Dd(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Od(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function kd(e, t) {
	let n = Od(e, t);
	return n.ok && typeof n.value == "function";
}
function Ad(e, t) {
	let n = Od(e, t);
	return n.ok && Dd(n.value) ? n.value : void 0;
}
function jd(e) {
	let t = {
		tauri_chat_surface: !1,
		tauri_world_info_activation: !1
	};
	if (!Dd(e)) return t;
	let n = Od(e, "abiVersion");
	if (!n.ok || n.value !== 1) return t;
	let r = Ad(e, "api");
	if (r === void 0) return t;
	let i = Ad(r, "chatSurface"), a = i === void 0 ? { ok: !1 } : Od(i, "protocolVersion"), o = Ad(r, "worldInfo");
	return {
		tauri_chat_surface: i !== void 0 && a.ok && a.value === 1 && kd(i, "isManagedOwnershipRequired") && kd(i, "registerParticipant"),
		tauri_world_info_activation: o !== void 0 && kd(o, "getLastActivation") && kd(o, "subscribeActivations")
	};
}
//#endregion
//#region src/host/tavern_helper_host.ts
function Md(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Nd(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function Pd(e, t) {
	let n = Nd(e, t);
	return n.ok && typeof n.value == "function";
}
function Fd(e) {
	let t = Nd(e, "getTavernHelperVersion");
	if (!t.ok) return { state: "threw" };
	if (typeof t.value != "function") return { state: "missing" };
	let n;
	try {
		n = Reflect.apply(t.value, e, []);
	} catch {
		return { state: "threw" };
	}
	return typeof n == "string" ? {
		state: "available",
		value: n
	} : { state: "invalid" };
}
function Id(e) {
	return e === void 0 ? {
		detected: !1,
		version: { state: "missing" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	} : Md(e) ? {
		detected: !0,
		version: Fd(e),
		private_prompt_generation: Pd(e, "generateRaw"),
		message_swipe_metadata: Pd(e, "getChatMessages") && Pd(e, "setChatMessages")
	} : {
		detected: !0,
		version: { state: "invalid" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	};
}
//#endregion
//#region src/host/capability_probe.ts
var Ld = "4.9.1", Rd = [
	"main_generation_events",
	"private_prompt_generation",
	"message_swipe_metadata",
	"host_image_upload",
	"tavern_helper"
];
function zd(e) {
	return {
		available: !1,
		reason: e
	};
}
function Bd(e, t) {
	return e ? { available: !0 } : zd(t);
}
function Vd(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Hd(e, t, n) {
	return {
		native_tool_manager: Bd(t.native_tool_manager, "SillyTavern ToolManager API is unavailable"),
		main_generation_events: Bd(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		private_prompt_generation: Bd(e.private_prompt_generation, "TavernHelper.generateRaw is unavailable"),
		message_swipe_metadata: Bd(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper message swipe API is unavailable"),
		host_image_upload: Bd(t.host_image_upload, "SillyTavern image upload API is unavailable"),
		tavern_helper: Bd(e.version.state === "available", "TavernHelper version API is unavailable"),
		tauri_chat_surface: Bd(n.tauri_chat_surface, "TauriTavern ChatSurface API is unavailable"),
		tauri_world_info_activation: Bd(n.tauri_world_info_activation, "TauriTavern WorldInfo activation API is unavailable"),
		gateway_protocol: zd("Gateway protocol is not connected")
	};
}
function Ud(e) {
	return Rd.filter((t) => e[t]?.available !== !0);
}
function Wd(e) {
	let t = Id(Vd(e, "TavernHelper")), n = Hd(t, Td(Vd(e, "SillyTavern"), Vd(e, "fetch")), jd(Vd(e, "__TAURITAVERN__")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: Ud(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: Ud(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value;
	if ((0, md.valid)(i) === null) return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	if (!(0, md.gte)(i, "4.9.1")) return {
		ready: !1,
		error_code: "helper_version_unsupported",
		missing_capabilities: ["tavern_helper"],
		current_version: i
	};
	let a = Ud(n);
	return a.length > 0 ? {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: a
	} : {
		ready: !0,
		matrix: n,
		helper_version: i
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+shared@11.4.8/node_modules/@intlify/shared/dist/shared.mjs
var Gd = typeof window < "u", Kd = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), qd = (e, t, n) => Jd({
	l: e,
	k: t,
	s: n
}), Jd = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Yd = (e) => typeof e == "number" && isFinite(e), Xd = (e) => uf(e) === "[object Date]", Zd = (e) => uf(e) === "[object RegExp]", Qd = (e) => Z(e) && Object.keys(e).length === 0, $d = Object.assign, ef = Object.create, q = (e = null) => ef(e), tf, nf = () => tf ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : q(), rf = Object.prototype.hasOwnProperty;
function af(e, t) {
	return rf.call(e, t);
}
var of = Array.isArray, sf = (e) => typeof e == "function", J = (e) => typeof e == "string", Y = (e) => typeof e == "boolean", X = (e) => typeof e == "object" && !!e, cf = (e) => X(e) && sf(e.then) && sf(e.catch), lf = Object.prototype.toString, uf = (e) => lf.call(e), Z = (e) => uf(e) === "[object Object]", df = (e) => e == null ? "" : of(e) || Z(e) && e.toString === lf ? JSON.stringify(e, null, 2) : String(e);
function ff(e, t = "") {
	return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, "");
}
function pf(e, t) {
	typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
function mf(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function hf(e) {
	return e.replace(/&(?![a-z0-9#]{2,6};)/gi, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var gf = /^javascript:/i, _f = /^(?:href|src|action|formaction)$/i, vf = /&#(?:x([0-9a-f]+)|(\d+));?/gi, yf = /&(?:Tab|NewLine);/g, bf = /&colon;?/gi, xf = /[\u0000-\u0020\u007f-\u009f]/g, Sf = /(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i, Cf = /(^|[\s"'<>/])on(\w+\s*=)/gi, wf = /(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;
function Tf(e, t, n) {
	let r = t || n;
	if (!r) return e;
	let i = Number.parseInt(r, t ? 16 : 10);
	return i <= 127 ? String.fromCharCode(i) : e;
}
function Ef(e) {
	let t = e.replace(vf, Tf).replace(yf, "").replace(bf, ":").replace(xf, "");
	return gf.test(t);
}
function Df(e) {
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
		n += e.slice(r, a), n += Ef(d) ? "url(about:blank)" : e.slice(a, s + 1), r = s + 1;
	}
	return n + e.slice(r);
}
function Of(e, t) {
	return _f.test(e) && Ef(t) ? "about:blank" : hf(e.toLowerCase() === "style" ? Df(t) : t);
}
function kf(e) {
	return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${Of(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${Of(t, n)}'`), Sf.test(e) && (e = e.replace(Cf, "$1&#111;n$2")), e = e.replace(wf, (e, t, n, r) => Ef(r) ? `${t}${n}about:blank` : e), e;
}
var Af = (e) => !X(e) || of(e);
function jf(e, t) {
	if (Af(e) || Af(t)) throw Error("Invalid value");
	let n = [{
		src: e,
		des: t
	}];
	for (; n.length;) {
		let { src: e, des: t } = n.pop();
		Object.keys(e).forEach((r) => {
			r !== "__proto__" && (X(e[r]) && !X(t[r]) && (t[r] = Array.isArray(e[r]) ? [] : q()), Af(t[r]) || Af(e[r]) ? t[r] = e[r] : n.push({
				src: e[r],
				des: t[r]
			}));
		});
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+message-compiler@11.4.8/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
function Mf(e, t, n) {
	return {
		line: e,
		column: t,
		offset: n
	};
}
function Nf(e, t, n) {
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
function Pf(e, t, n = {}) {
	let { domain: r, messages: i, args: a } = n, o = SyntaxError(String(e));
	return o.code = e, t && (o.location = t), o.domain = r, o;
}
function Ff(e) {
	throw e;
}
var If = " ", Lf = "\r", Rf = "\n", zf = "\u2028", Bf = "\u2029";
function Vf(e) {
	let t = e, n = 0, r = 1, i = 1, a = 0, o = (e) => t[e] === Lf && t[e + 1] === Rf, s = (e) => t[e] === Rf, c = (e) => t[e] === Bf, l = (e) => t[e] === zf, u = (e) => o(e) || s(e) || c(e) || l(e), d = () => n, f = () => r, p = () => i, m = () => a, h = (e) => o(e) || c(e) || l(e) ? Rf : t[e], g = () => h(n), _ = () => h(n + a);
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
var Hf = void 0, Uf = "'", Wf = "tokenizer";
function Gf(e, t = {}) {
	let n = t.location !== !1, r = Vf(e), i = () => r.index(), a = () => Mf(r.line(), r.column(), r.index()), o = a(), s = i(), c = {
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
			let r = Pf(e, n ? Nf(a.startLoc, t) : null, {
				domain: Wf,
				args: i
			});
			u(r);
		}
	}
	function f(e, t, r) {
		e.endLoc = a(), e.currentType = t;
		let i = { type: t };
		return n && (i.loc = Nf(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
	}
	let p = (e) => f(e, 13);
	function m(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(Q.EXPECTED_TOKEN, a(), 0, t), "");
	}
	function h(e) {
		let t = "";
		for (; e.currentPeek() === If || e.currentPeek() === Rf;) t += e.currentPeek(), e.peek();
		return t;
	}
	function g(e) {
		let t = h(e);
		return e.skipToPeek(), t;
	}
	function _(e) {
		if (e === Hf) return !1;
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
	}
	function v(e) {
		if (e === Hf) return !1;
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
		let r = e.currentPeek() === Uf;
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
			return t === "{" ? _(e.peek()) : t === "@" || t === "|" || t === ":" || t === "." || t === If || !t ? !1 : t === Rf ? (e.peek(), r()) : D(e, !1);
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
			return i === "{" || i === "@" || !i ? t : i === "|" ? r !== If && r !== Rf : i === If ? (e.peek(), n(!0, If)) : i !== Rf || (e.peek(), n(!0, Rf));
		}, r = n();
		return t && e.resetPeek(), r;
	}
	function O(e, t) {
		let n = e.currentChar();
		if (n !== Hf) return t(n) ? (e.next(), n) : null;
	}
	function k(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
	}
	function ee(e) {
		return O(e, k);
	}
	function te(e) {
		let t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
	}
	function ne(e) {
		return O(e, te);
	}
	function re(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57;
	}
	function ie(e) {
		return O(e, re);
	}
	function ae(e) {
		let t = e.charCodeAt(0);
		return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
	}
	function A(e) {
		return O(e, ae);
	}
	function oe(e) {
		let t = "", n = "";
		for (; t = ie(e);) n += t;
		return n;
	}
	function se(e) {
		let t = "";
		for (;;) {
			let n = e.currentChar();
			if (n === "\\") {
				let r = e.peek();
				r === "{" || r === "}" || r === "@" || r === "|" || r === "\\" ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
			} else if (n === "{" || n === "}" || n === "@" || n === "|" || !n) break;
			else if (n === If || n === Rf) if (D(e)) t += n, e.next();
			else if (E(e)) break;
			else t += n, e.next();
			else t += n, e.next();
		}
		return t;
	}
	function ce(e) {
		g(e);
		let t = "", n = "";
		for (; t = ne(e);) n += t;
		let r = e.currentChar();
		if (r && r !== "}" && r !== Hf && r !== If && r !== Rf && r !== "　") {
			let t = he(e);
			return d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
		}
		return e.currentChar() === Hf && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
	}
	function le(e) {
		g(e);
		let t = "";
		return e.currentChar() === "-" ? (e.next(), t += `-${oe(e)}`) : t += oe(e), e.currentChar() === Hf && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
	}
	function ue(e) {
		return e !== Uf && e !== Rf;
	}
	function de(e) {
		g(e), m(e, "'");
		let t = "", n = "";
		for (; t = O(e, ue);) n += t === "\\" ? fe(e) : t;
		let r = e.currentChar();
		return r === Rf || r === Hf ? (d(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === Rf && (e.next(), m(e, "'")), n) : (m(e, "'"), n);
	}
	function fe(e) {
		let t = e.currentChar();
		switch (t) {
			case "\\":
			case "'": return e.next(), `\\${t}`;
			case "u": return pe(e, t, 4);
			case "U": return pe(e, t, 6);
			default: return d(Q.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), "";
		}
	}
	function pe(e, t, n) {
		m(e, t);
		let r = "";
		for (let i = 0; i < n; i++) {
			let n = A(e);
			if (!n) {
				d(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
				break;
			}
			r += n;
		}
		return `\\${t}${r}`;
	}
	function me(e) {
		return e !== "{" && e !== "}" && e !== If && e !== Rf;
	}
	function he(e) {
		g(e);
		let t = "", n = "";
		for (; t = O(e, me);) n += t;
		return n;
	}
	function ge(e) {
		let t = "", n = "";
		for (; t = ee(e);) n += t;
		return n;
	}
	function _e(e) {
		let t = (n) => {
			let r = e.currentChar();
			return r === "{" || r === "@" || r === "|" || r === "(" || r === ")" || !r || r === If ? n : (n += r, e.next(), t(n));
		};
		return t("");
	}
	function ve(e) {
		g(e);
		let t = m(e, "|");
		return g(e), t;
	}
	function ye(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case "{": return t.braceNest >= 1 && d(Q.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}": return t.braceNest > 0 && t.currentType === 2 && d(Q.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = !1), n;
			case "@": return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = be(e, t) || p(t), t.braceNest = 0, n;
			default: {
				let r = !0, i = !0, o = !0;
				if (E(e)) return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, ve(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, xe(e, t);
				if (r = y(e, t)) return n = f(t, 4, ce(e)), g(e), n;
				if (i = b(e, t)) return n = f(t, 5, le(e)), g(e), n;
				if (o = x(e, t)) return n = f(t, 6, de(e)), g(e), n;
				if (!r && !i && !o) return n = f(t, 12, he(e)), d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
				break;
			}
		}
		return n;
	}
	function be(e, t) {
		let { currentType: n } = t, r = null, i = e.currentChar();
		switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === Rf || i === If) && d(Q.INVALID_LINKED_FORMAT, a(), 0), i) {
			case "@": return e.next(), r = f(t, 7, "@"), t.inLinked = !0, r;
			case ".": return g(e), e.next(), f(t, 8, ".");
			case ":": return g(e), e.next(), f(t, 9, ":");
			default: return E(e) ? (r = f(t, 1, ve(e)), t.braceNest = 0, t.inLinked = !1, r) : S(e, t) || w(e, t) ? (g(e), be(e, t)) : C(e, t) ? (g(e), f(t, 11, ge(e))) : T(e, t) ? (g(e), i === "{" ? ye(e, t) || r : f(t, 10, _e(e))) : (n === 7 && d(Q.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, xe(e, t));
		}
	}
	function xe(e, t) {
		let n = { type: 13 };
		if (t.braceNest > 0) return ye(e, t) || p(t);
		if (t.inLinked) return be(e, t) || p(t);
		switch (e.currentChar()) {
			case "{": return ye(e, t) || p(t);
			case "}": return d(Q.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, "}");
			case "@": return be(e, t) || p(t);
			default:
				if (E(e)) return n = f(t, 1, ve(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (D(e)) return f(t, 0, se(e));
		}
		return n;
	}
	function Se() {
		let { currentType: e, offset: t, startLoc: n, endLoc: o } = c;
		return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === Hf ? f(c, 13) : xe(r, c);
	}
	return {
		nextToken: Se,
		currentOffset: i,
		currentPosition: a,
		context: l
	};
}
var Kf = "parser", qf = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g, Jf = /\\([\\@{}|])/g;
function Yf(e, t) {
	return t;
}
function Xf(e, t, n) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\'": return "'";
		default: {
			let e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�";
		}
	}
}
function Zf(e = {}) {
	let t = e.location !== !1, { onError: n } = e;
	function r(e, r, i, a, ...o) {
		let s = e.currentPosition();
		if (s.offset += a, s.column += a, n) {
			let e = Pf(r, t ? Nf(i, s) : null, {
				domain: Kf,
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
		return r.value = t.replace(Jf, Yf), a(r, e.currentOffset(), e.currentPosition()), r;
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
		return o.value = t.replace(qf, Xf), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
	}
	function u(e) {
		let t = e.nextToken(), n = e.context(), { lastOffset: o, lastStartLoc: s } = n, c = i(8, o, s);
		return t.type === 11 ? (t.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, Qf(t)), c.value = t.value || "", a(c, e.currentOffset(), e.currentPosition()), { node: c }) : (r(e, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = "", a(c, o, s), {
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
		switch (o.type !== 9 && r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
			case 10:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(o)), n.key = d(e, o.value || "");
				break;
			case 4:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(o)), n.key = c(e, o.value || "");
				break;
			case 5:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(o)), n.key = s(e, o.value || "");
				break;
			case 6:
				o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(o)), n.key = l(e, o.value || "");
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
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(i)), n.items.push(o(e, i.value || ""));
					break;
				case 5:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(i)), n.items.push(s(e, i.value || ""));
					break;
				case 4:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(i)), n.items.push(c(e, i.value || ""));
					break;
				case 6:
					i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, Qf(i)), n.items.push(l(e, i.value || ""));
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
		let o = Gf(n, $d({}, e)), s = o.context(), c = i(0, s.offset, s.startLoc);
		return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Q.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ""), a(c, o.currentOffset(), o.currentPosition()), c;
	}
	return { parse: g };
}
function Qf(e) {
	if (e.type === 13) return "EOF";
	let t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function $f(e, t = {}) {
	let n = {
		ast: e,
		helpers: /* @__PURE__ */ new Set()
	};
	return {
		context: () => n,
		helper: (e) => (n.helpers.add(e), e)
	};
}
function ep(e, t) {
	for (let n = 0; n < e.length; n++) tp(e[n], t);
}
function tp(e, t) {
	switch (e.type) {
		case 1:
			ep(e.cases, t), t.helper("plural");
			break;
		case 2:
			ep(e.items, t);
			break;
		case 6:
			tp(e.key, t), t.helper("linked"), t.helper("type");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4: t.helper("interpolate"), t.helper("named");
	}
}
function np(e, t = {}) {
	let n = $f(e);
	n.helper("normalize"), e.body && tp(e.body, n);
	let r = n.context();
	e.helpers = Array.from(r.helpers);
}
function rp(e) {
	let t = e.body;
	return t.type === 2 ? ip(t) : t.cases.forEach((e) => ip(e)), e;
}
function ip(e) {
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
			e.static = ff(t);
			for (let t = 0; t < e.items.length; t++) {
				let n = e.items[t];
				(n.type === 3 || n.type === 9) && delete n.value;
			}
		}
	}
}
function ap(e) {
	switch (e.t = e.type, e.type) {
		case 0: {
			let t = e;
			ap(t.body), t.b = t.body, delete t.body;
			break;
		}
		case 1: {
			let t = e, n = t.cases;
			for (let e = 0; e < n.length; e++) ap(n[e]);
			t.c = n, delete t.cases;
			break;
		}
		case 2: {
			let t = e, n = t.items;
			for (let e = 0; e < n.length; e++) ap(n[e]);
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
			ap(t.key), t.k = t.key, delete t.key, t.modifier && (ap(t.modifier), t.m = t.modifier, delete t.modifier);
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
function op(e, t) {
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
function sp(e, t) {
	let { helper: n } = e;
	e.push(`${n("linked")}(`), dp(e, t.key), t.modifier ? (e.push(", "), dp(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function cp(e, t) {
	let { helper: n, needIndent: r } = e;
	e.push(`${n("normalize")}([`), e.indent(r());
	let i = t.items.length;
	for (let n = 0; n < i && (dp(e, t.items[n]), n !== i - 1); n++) e.push(", ");
	e.deindent(r()), e.push("])");
}
function lp(e, t) {
	let { helper: n, needIndent: r } = e;
	if (t.cases.length > 1) {
		e.push(`${n("plural")}([`), e.indent(r());
		let i = t.cases.length;
		for (let n = 0; n < i && (dp(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
		e.deindent(r()), e.push("])");
	}
}
function up(e, t) {
	t.body ? dp(e, t.body) : e.push("null");
}
function dp(e, t) {
	let { helper: n } = e;
	switch (t.type) {
		case 0:
			up(e, t);
			break;
		case 1:
			lp(e, t);
			break;
		case 2:
			cp(e, t);
			break;
		case 6:
			sp(e, t);
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
var fp = (e, t = {}) => {
	let n = J(t.mode) ? t.mode : "normal", r = J(t.filename) ? t.filename : "message.intl";
	t.sourceMap;
	let i = t.breakLineCode == null ? n === "arrow" ? ";" : "\n" : t.breakLineCode, a = t.needIndent ? t.needIndent : n !== "arrow", o = e.helpers || [], s = op(e, {
		filename: r,
		breakLineCode: i,
		needIndent: a
	});
	s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push(`const { ${ff(o.map((e) => `${e}: _${e}`), ", ")} } = ctx`), s.newline()), s.push("return "), dp(s, e), s.deindent(a), s.push("}"), delete e.helpers;
	let { code: c, map: l } = s.context();
	return {
		ast: e,
		code: c,
		map: l ? l.toJSON() : void 0
	};
};
function pp(e, t = {}) {
	let n = $d({}, t), r = !!n.jit, i = !!n.minify, a = n.optimize == null || n.optimize, o = Zf(n).parse(e);
	return r ? (a && rp(o), i && ap(o), {
		ast: o,
		code: ""
	}) : (np(o, n), fp(o, n));
}
//#endregion
//#region ../../node_modules/.pnpm/@intlify+core-base@11.4.8/node_modules/@intlify/core-base/dist/core-base.mjs
function mp() {
	typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (nf().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (nf().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function hp(e) {
	return X(e) && Tp(e) === 0 && (af(e, "b") || af(e, "body"));
}
var gp = ["b", "body"];
function _p(e) {
	return Mp(e, gp);
}
var vp = ["c", "cases"];
function yp(e) {
	return Mp(e, vp, []);
}
var bp = ["s", "static"];
function xp(e) {
	return Mp(e, bp);
}
var Sp = ["i", "items"];
function Cp(e) {
	return Mp(e, Sp, []);
}
var wp = ["t", "type"];
function Tp(e) {
	return Mp(e, wp);
}
var Ep = ["v", "value"];
function Dp(e, t) {
	let n = Mp(e, Ep);
	if (n != null) return n;
	throw Pp(t);
}
var Op = ["m", "modifier"];
function kp(e) {
	return Mp(e, Op);
}
var Ap = ["k", "key"];
function jp(e) {
	let t = Mp(e, Ap);
	if (t) return t;
	throw Pp(6);
}
function Mp(e, t, n) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (af(e, r) && e[r] != null) return e[r];
	}
	return n;
}
var Np = [
	...gp,
	...vp,
	...bp,
	...Sp,
	...Ap,
	...Op,
	...Ep,
	...wp
];
function Pp(e) {
	return /* @__PURE__ */ Error(`unhandled node type: ${e}`);
}
function Fp(e) {
	return (t) => Ip(t, e);
}
function Ip(e, t) {
	let n = _p(t);
	if (n == null) throw Pp(0);
	if (Tp(n) === 1) {
		let t = yp(n);
		return e.plural(t.reduce((t, n) => [...t, Lp(e, n)], []));
	}
	return Lp(e, n);
}
function Lp(e, t) {
	let n = xp(t);
	if (n != null) return e.type === "text" ? n : e.normalize([n]);
	{
		let n = Cp(t).reduce((t, n) => [...t, Rp(e, n)], []);
		return e.normalize(n);
	}
}
function Rp(e, t) {
	let n = Tp(t);
	switch (n) {
		case 3: return Dp(t, n);
		case 9: return Dp(t, n);
		case 4: {
			let r = t;
			if (af(r, "k") && r.k) return e.interpolate(e.named(r.k));
			if (af(r, "key") && r.key) return e.interpolate(e.named(r.key));
			throw Pp(n);
		}
		case 5: {
			let r = t;
			if (af(r, "i") && Yd(r.i)) return e.interpolate(e.list(r.i));
			if (af(r, "index") && Yd(r.index)) return e.interpolate(e.list(r.index));
			throw Pp(n);
		}
		case 6: {
			let n = t, r = kp(n), i = jp(n);
			return e.linked(Rp(e, i), r ? Rp(e, r) : void 0, e.type);
		}
		case 7: return Dp(t, n);
		case 8: return Dp(t, n);
		default: throw Error(`unhandled node on format message part: ${n}`);
	}
}
var zp = (e) => e, Bp = q();
function Vp(e, t = {}) {
	let n = !1, r = t.onError || Ff;
	return t.onError = (e) => {
		n = !0, r(e);
	}, {
		...pp(e, t),
		detectError: n
	};
}
/* #__NO_SIDE_EFFECTS__ */
function Hp(e, t) {
	if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && J(e)) {
		Y(t.warnHtmlMessage) && t.warnHtmlMessage;
		let n = (t.onCacheKey || zp)(e), r = Bp[n];
		if (r) return r;
		let { ast: i, detectError: a } = Vp(e, {
			...t,
			location: !1,
			jit: !0
		}), o = Fp(i);
		return a ? o : Bp[n] = o;
	}
	{
		let t = e.cacheKey;
		return t ? Bp[t] || (Bp[t] = Fp(e)) : Fp(e);
	}
}
var Up = null;
function Wp(e) {
	Up = e;
}
function Gp(e, t, n) {
	Up && Up.emit("i18n:init", {
		timestamp: Date.now(),
		i18n: e,
		version: t,
		meta: n
	});
}
var Kp = /* #__PURE__*/ qp("function:translate");
function qp(e) {
	return (t) => Up && Up.emit(e, t);
}
var Jp = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function Yp(e) {
	return Pf(e, null, void 0);
}
Jp.INVALID_ARGUMENT, Jp.INVALID_DATE_ARGUMENT, Jp.INVALID_ISO_DATE_ARGUMENT, Jp.NOT_SUPPORT_NON_STRING_MESSAGE, Jp.NOT_SUPPORT_LOCALE_PROMISE_VALUE, Jp.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, Jp.NOT_SUPPORT_LOCALE_TYPE;
function Xp(e, t) {
	return t.locale == null ? Qp(e.locale) : Qp(t.locale);
}
var Zp;
function Qp(e) {
	if (J(e)) return e;
	if (sf(e)) {
		if (e.resolvedOnce && Zp != null) return Zp;
		if (e.constructor.name === "Function") {
			let t = e();
			if (cf(t)) throw Yp(Jp.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return Zp = t;
		}
		throw Yp(Jp.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	}
	throw Yp(Jp.NOT_SUPPORT_LOCALE_TYPE);
}
function $p(e, t, n) {
	return [.../* @__PURE__ */ new Set([n, ...of(t) ? t : X(t) ? Object.keys(t) : J(t) ? [t] : [n]])];
}
function em(e, t, n) {
	let r = J(n) ? n : gm, i = e;
	i.__localeChainCache ||= /* @__PURE__ */ new Map();
	let a = i.__localeChainCache.get(r);
	if (!a) {
		a = [];
		let e = [n];
		for (; of(e);) e = tm(a, e, t);
		let o = of(t) || !Z(t) ? t : t.default ? t.default : null;
		e = J(o) ? [o] : o, of(e) && tm(a, e, !1), i.__localeChainCache.set(r, a);
	}
	return a;
}
function tm(e, t, n) {
	let r = !0;
	for (let i = 0; i < t.length && Y(r); i++) {
		let a = t[i];
		J(a) && (r = nm(e, t[i], n));
	}
	return r;
}
function nm(e, t, n) {
	let r, i = t.split("-");
	do
		r = rm(e, i.join("-"), n), i.splice(-1, 1);
	while (i.length && r === !0);
	return r;
}
function rm(e, t, n) {
	let r = !1;
	if (!e.includes(t) && (r = !0, t)) {
		r = t[t.length - 1] !== "!";
		let i = t.replace(/!/g, "");
		e.push(i), (of(n) || Z(n)) && n[i] && (r = n[i]);
	}
	return r;
}
var im = [];
im[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, im[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, im[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, im[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, im[4] = {
	"'": [5, 0],
	"\"": [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, im[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, im[6] = {
	"\"": [4, 0],
	o: 8,
	l: [6, 0]
};
var am = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function om(e) {
	return am.test(e);
}
function sm(e) {
	let t = e.charCodeAt(0);
	return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function cm(e) {
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
function lm(e) {
	let t = e.trim();
	return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : om(t) ? sm(t) : "*" + t;
}
function um(e) {
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
			if (i = 0, o === void 0 || (o = lm(o), o === !1)) return !1;
			f[1]();
		}
	};
	function p() {
		let t = e[n + 1];
		if (r === 5 && t === "'" || r === 6 && t === "\"") return n++, s = "\\" + t, f[0](), !0;
	}
	for (; r !== null;) if (n++, a = e[n], !(a === "\\" && p())) {
		if (c = cm(a), d = im[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = f[l[1]], u && (s = a, u() === !1)))) return;
		if (r === 7) return t;
	}
}
var dm = /* @__PURE__ */ new Map();
function fm(e, t) {
	return X(e) ? e[t] : null;
}
function pm(e, t) {
	if (!X(e)) return null;
	let n = dm.get(t);
	if (n || (n = um(t), n && dm.set(t, n)), !n) return null;
	let r = n.length, i = e, a = 0;
	for (; a < r;) {
		let e = n[a];
		if (Np.includes(e) && hp(i) || !X(i) || !af(i, e)) return null;
		let t = i[e];
		if (t === void 0 || sf(i)) return null;
		i = t, a++;
	}
	return i;
}
var mm = {
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
mm.NOT_FOUND_KEY, mm.FALLBACK_TO_TRANSLATE, mm.CANNOT_FORMAT_NUMBER, mm.FALLBACK_TO_NUMBER_FORMAT, mm.CANNOT_FORMAT_DATE, mm.FALLBACK_TO_DATE_FORMAT, mm.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, mm.INVALID_NUMBER_ARGUMENT, mm.INVALID_DATE_ARGUMENT;
var hm = "11.4.8", gm = "en-US", _m = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function vm() {
	return {
		upper: (e, t) => t === "text" && J(e) ? e.toUpperCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
		lower: (e, t) => t === "text" && J(e) ? e.toLowerCase() : t === "vnode" && X(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
		capitalize: (e, t) => t === "text" && J(e) ? _m(e) : t === "vnode" && X(e) && "__v_isVNode" in e ? _m(e.children) : e
	};
}
var ym;
function bm(e) {
	ym = e;
}
var xm;
function Sm(e) {
	xm = e;
}
var Cm;
function wm(e) {
	Cm = e;
}
var Tm = null, Em = /* @__NO_SIDE_EFFECTS__ */ () => Tm, Dm = null, Om = (e) => {
	Dm = e;
}, km = () => Dm, Am = 0;
function jm(e = {}) {
	let t = sf(e.onWarn) ? e.onWarn : pf, n = J(e.version) ? e.version : hm, r = J(e.locale) || sf(e.locale) ? e.locale : gm, i = sf(r) ? gm : r, a = of(e.fallbackLocale) || Z(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i, o = Z(e.messages) ? e.messages : Mm(i), s = Z(e.datetimeFormats) ? e.datetimeFormats : Mm(i), c = Z(e.numberFormats) ? e.numberFormats : Mm(i), l = $d(q(), e.modifiers, vm()), u = e.pluralRules || q(), d = sf(e.missing) ? e.missing : null, f = Y(e.missingWarn) || Zd(e.missingWarn) ? e.missingWarn : !0, p = Y(e.fallbackWarn) || Zd(e.fallbackWarn) ? e.fallbackWarn : !0, m = !!e.fallbackFormat, h = !!e.unresolving, g = sf(e.postTranslation) ? e.postTranslation : null, _ = Z(e.processor) ? e.processor : null, v = !Y(e.warnHtmlMessage) || e.warnHtmlMessage, y = !!e.escapeParameter, b = sf(e.messageCompiler) ? e.messageCompiler : ym, x = sf(e.messageResolver) ? e.messageResolver : xm || fm, S = sf(e.localeFallbacker) ? e.localeFallbacker : Cm || $p, C = X(e.fallbackContext) ? e.fallbackContext : void 0, w = e, T = X(w.__datetimeFormatters) ? w.__datetimeFormatters : /* @__PURE__ */ new Map(), E = X(w.__numberFormatters) ? w.__numberFormatters : /* @__PURE__ */ new Map(), D = X(w.__meta) ? w.__meta : {};
	Am++;
	let O = {
		version: n,
		cid: Am,
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
	return O.datetimeFormats = s, O.numberFormats = c, O.__datetimeFormatters = T, O.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && Gp(O, n, D), O;
}
var Mm = (e) => ({ [e]: q() });
function Nm(e, t, n, r, i) {
	let { missing: a, onWarn: o } = e;
	if (a !== null) {
		let r = a(e, n, t, i);
		return J(r) ? r : t;
	}
	return t;
}
function Pm(e, t, n) {
	let r = e;
	r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Fm(e, t) {
	return e !== t && e.split("-")[0] === t.split("-")[0];
}
function Im(e, t) {
	let n = t.indexOf(e);
	if (n === -1) return !1;
	for (let r = n + 1; r < t.length; r++) if (Fm(e, t[r])) return !0;
	return !1;
}
function Lm(e, t, n, r, i, a, o) {
	let { fallbackLocale: s, localeFallbacker: c, onWarn: l } = e, u = c(e, s, n);
	for (let n = 0; n < u.length; n++) {
		let a = u[n], s = (r[a] || {})[t];
		if (Z(s) && J(a)) return a;
		Nm(e, t, a, i, o);
	}
	return null;
}
function Rm(e, t, n) {
	let r = `${e}__${t}`;
	return Z(n) && !Qd(n) && (r = `${r}__${JSON.stringify(n)}`), r;
}
function zm(e, t, n) {
	for (let r in n) {
		let n = `${t}__${r}`;
		for (let t of e.keys()) (t === n || t.startsWith(`${n}__`)) && e.delete(t);
	}
}
function Bm(e, t, n, r) {
	let [, i, a, o] = e, s = n;
	return J(i) ? t.key = i : Z(i) && Object.keys(i).forEach((e) => {
		r.includes(e) ? s[e] = i[e] : t[e] = i[e];
	}), J(a) ? t.locale = a : Z(a) && (s = a), Z(o) && (s = o), s;
}
var Vm = typeof Intl < "u";
Vm && Intl.DateTimeFormat, Vm && Intl.NumberFormat;
function Hm(e, ...t) {
	let { datetimeFormats: n, unresolving: r, onWarn: i } = e, { __datetimeFormatters: a } = e;
	if (!J(t[0]) && !Xd(t[0]) && !Yd(t[0])) return "";
	let [o, s, c, l] = Wm(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Xp(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.DateTimeFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = Lm(e, o, p, n, u, d, "datetime format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = Rm(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.DateTimeFormat(m, $d({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var Um = [
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
function Wm(...e) {
	let [t] = e, n = q(), r = q(), i;
	if (J(t)) {
		let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!e) throw Yp(Jp.INVALID_ISO_DATE_ARGUMENT);
		let n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
		i = new Date(n);
		try {
			i.toISOString();
		} catch {
			throw Yp(Jp.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (Xd(t)) {
		if (isNaN(t.getTime())) throw Yp(Jp.INVALID_DATE_ARGUMENT);
		i = t;
	} else if (Yd(t)) i = t;
	else throw Yp(Jp.INVALID_ARGUMENT);
	let a = Bm(e, n, r, Um);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function Gm(e, t, n) {
	zm(e.__datetimeFormatters, t, n);
}
function Km(e, ...t) {
	let { numberFormats: n, unresolving: r, onWarn: i } = e, { __numberFormatters: a } = e;
	if (!Yd(t[0])) return "";
	let [o, s, c, l] = Jm(...t), u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn, d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, f = !!c.part, p = Xp(e, c);
	if (!J(o) || o === "") {
		let e = new Intl.NumberFormat(p.replace(/!/g, ""), l);
		return f ? e.formatToParts(s) : e.format(s);
	}
	let m = Lm(e, o, p, n, u, d, "number format");
	if (!J(m)) return r ? -1 : o;
	let h = n[m][o], g = Rm(m, o, l), _ = a.get(g);
	return _ || (_ = new Intl.NumberFormat(m, $d({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var qm = [
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
function Jm(...e) {
	let [t] = e, n = q(), r = q();
	if (!Yd(t)) throw Yp(Jp.INVALID_ARGUMENT);
	let i = t, a = Bm(e, n, r, qm);
	return [
		n.key || "",
		i,
		n,
		a
	];
}
function Ym(e, t, n) {
	zm(e.__numberFormatters, t, n);
}
var Xm = (e) => e, Zm = (e) => "", Qm = "text", $m = (e) => e.length === 0 ? "" : ff(e), eh = df;
function th(e, t) {
	return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function nh(e) {
	let t = Yd(e.pluralIndex) ? e.pluralIndex : -1;
	return Yd(e.named?.count) ? e.named.count : Yd(e.named?.n) ? e.named.n : t;
}
function rh(e = {}) {
	let t = e.locale, n = nh(e), r = J(t) && sf(e.pluralRules?.[t]) ? e.pluralRules[t] : th, i = r === th ? void 0 : th, a = (e) => e[r(n, e.length, i)], o = e.list || [], s = (e) => o[e], c = e.named || q();
	Yd(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
	let l = (e) => c[e];
	function u(t, n) {
		return (sf(e.messages) ? e.messages(t, !!n) : X(e.messages) ? e.messages[t] : !1) || (e.parent ? e.parent.message(t) : Zm);
	}
	let d = (t) => e.modifiers ? e.modifiers[t] : Xm, f = sf(e.processor?.normalize) ? e.processor.normalize : $m, p = sf(e.processor?.interpolate) ? e.processor.interpolate : eh, m = {
		list: s,
		named: l,
		plural: a,
		linked: (e, ...t) => {
			let [n, r] = t, i = "text", a = "";
			t.length === 1 ? X(n) ? (a = n.modifier || a, i = n.type || i) : J(n) && (a = n || a) : t.length === 2 && (J(n) && (a = n || a), J(r) && (i = r || i));
			let o = u(e, !0)(m), s = o === "" || o === void 0 ? e : o, c = i === "vnode" && of(s) && a ? s[0] : s;
			return a ? d(a)(c, i) : c;
		},
		message: u,
		type: J(e.processor?.type) ? e.processor.type : Qm,
		interpolate: p,
		normalize: f,
		values: $d(q(), o, c)
	};
	return m;
}
var ih = () => "", ah = (e) => sf(e);
function oh(e, ...t) {
	let { fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: a, fallbackLocale: o, messages: s } = e, [c, l] = dh(...t), u = Y(l.missingWarn) ? l.missingWarn : e.missingWarn, d = Y(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, f = Y(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, p = !!l.resolvedMessage, m = J(l.default) || Y(l.default) ? Y(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null, h = n || m != null && (J(m) || sf(m)), g = Xp(e, l);
	f && sh(l);
	let [_, v, y] = p ? [
		c,
		g,
		s[g] || q()
	] : ch(e, c, g, o, d, u), b = _, x = c;
	if (!p && !(J(b) || hp(b) || ah(b)) && h && (b = m, x = b), !p && (!(J(b) || hp(b) || ah(b)) || !J(v))) return i ? -1 : c;
	let S = !1, C = ah(b) ? b : lh(e, c, v, b, x, () => {
		S = !0;
	});
	if (S) return b;
	let w = uh(e, C, rh(ph(e, v, y, l))), T = r ? r(w, c) : w;
	if (f && J(T) && (T = kf(T)), __INTLIFY_PROD_DEVTOOLS__) {
		let t = {
			timestamp: Date.now(),
			key: J(c) ? c : ah(b) ? b.key : "",
			locale: v || (ah(b) ? b.locale : ""),
			format: J(b) ? b : ah(b) ? b.source : "",
			message: T
		};
		t.meta = $d({}, e.__meta, /* @__PURE__ */ Em() || {}), Kp(t);
	}
	return T;
}
function sh(e) {
	of(e.list) ? e.list = e.list.map((e) => J(e) ? mf(e) : e) : X(e.named) && Object.keys(e.named).forEach((t) => {
		J(e.named[t]) && (e.named[t] = mf(e.named[t]));
	});
}
function ch(e, t, n, r, i, a) {
	let { messages: o, onWarn: s, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n), d = q(), f, p = null;
	for (let n = 0; n < u.length && (f = u[n], d = o[f] || q(), (p = c(d, t)) === null && (p = d[t]), !(J(p) || hp(p) || ah(p))); n++) if (!Im(f, u)) {
		let n = Nm(e, t, f, a, "translate");
		n !== t && (p = n);
	}
	return [
		p,
		f,
		d
	];
}
function lh(e, t, n, r, i, a) {
	let { messageCompiler: o, warnHtmlMessage: s } = e;
	if (ah(r)) {
		let e = r;
		return e.locale = e.locale || n, e.key = e.key || t, e;
	}
	if (o == null) {
		let e = (() => r);
		return e.locale = n, e.key = t, e;
	}
	let c = o(r, fh(e, n, i, r, s, a));
	return c.locale = n, c.key = t, c.source = r, c;
}
function uh(e, t, n) {
	return t(n);
}
function dh(...e) {
	let [t, n, r] = e, i = q();
	if (!J(t) && !Yd(t) && !ah(t) && !hp(t)) throw Yp(Jp.INVALID_ARGUMENT);
	let a = Yd(t) ? String(t) : (ah(t), t);
	return Yd(n) ? i.plural = n : J(n) ? i.default = n : Z(n) && !Qd(n) ? i.named = n : of(n) && (i.list = n), Yd(r) ? i.plural = r : J(r) ? i.default = r : Z(r) && $d(i, r), [a, i];
}
function fh(e, t, n, r, i, a) {
	return {
		locale: t,
		key: n,
		warnHtmlMessage: i,
		onError: (e) => {
			throw a && a(e), e;
		},
		onCacheKey: (e) => qd(t, n, e)
	};
}
function ph(e, t, n, r) {
	let { modifiers: i, pluralRules: a, messageResolver: o, fallbackLocale: s, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, d = {
		locale: t,
		modifiers: i,
		pluralRules: a,
		messages: (r, i) => {
			let a = o(n, r);
			if (a == null && (u || i)) {
				let [n, , i] = ch(u || e, r, t, s, c, l);
				a = n ?? o(i, r);
			}
			if (J(a) || hp(a)) {
				let n = !1, i = lh(e, r, t, a, r, () => {
					n = !0;
				});
				return n ? ih : i;
			}
			return ah(a) ? a : ih;
		}
	};
	return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), Yd(r.plural) && (d.pluralIndex = r.plural), d;
}
mp();
//#endregion
//#region ../../node_modules/.pnpm/vue-i18n@11.4.8_vue@3.5.40_typescript@6.0.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
var mh = "11.4.8";
function hh() {
	typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (nf().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (nf().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (nf().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (nf().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
var gh = {
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
function _h(e, ...t) {
	return Pf(e, null, void 0);
}
gh.UNEXPECTED_RETURN_TYPE, gh.INVALID_ARGUMENT, gh.MUST_BE_CALL_SETUP_TOP, gh.NOT_INSTALLED, gh.UNEXPECTED_ERROR, gh.REQUIRED_VALUE, gh.INVALID_VALUE, gh.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, gh.NOT_INSTALLED_WITH_PROVIDE, gh.NOT_COMPATIBLE_LEGACY_VUE_I18N, gh.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
var vh = /* #__PURE__*/ Kd("__translateVNode"), yh = /* #__PURE__*/ Kd("__datetimeParts"), bh = /* #__PURE__*/ Kd("__numberParts"), xh = Kd("__setPluralRules");
Kd("__intlifyMeta");
var Sh = /* #__PURE__*/ Kd("__injectWithOption"), Ch = /* #__PURE__*/ Kd("__dispose"), wh = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	DEPRECATE_LEGACY_MODE: 13,
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
};
wh.FALLBACK_TO_ROOT, wh.NOT_FOUND_PARENT_SCOPE, wh.IGNORE_OBJ_FLATTEN, wh.DEPRECATE_LEGACY_MODE, wh.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, wh.DUPLICATE_USE_I18N_CALLING;
function Th(e) {
	if (!X(e) || hp(e)) return e;
	for (let t in e) if (af(e, t)) if (!t.includes(".")) X(e[t]) && Th(e[t]);
	else {
		let n = t.split("."), r = n.length - 1, i = e, a = !1;
		for (let e = 0; e < r; e++) {
			if (n[e] === "__proto__") throw Error(`unsafe key: ${n[e]}`);
			if (n[e] in i || (i[n[e]] = q()), !X(i[n[e]])) {
				a = !0;
				break;
			}
			i = i[n[e]];
		}
		if (a || (hp(i) ? Np.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !hp(i)) {
			let e = i[n[r]];
			X(e) && Th(e);
		}
	}
	return e;
}
function Eh(e, t) {
	let { messages: n, __i18n: r, messageResolver: i, flatJson: a } = t, o = Z(n) ? n : of(r) ? q() : { [e]: q() };
	if (of(r) && r.forEach((e) => {
		if ("locale" in e && "resource" in e) {
			let { locale: t, resource: n } = e;
			t ? (o[t] = o[t] || q(), jf(n, o[t])) : jf(n, o);
		} else J(e) && jf(JSON.parse(e), o);
	}), i == null && a) for (let e in o) af(o, e) && Th(o[e]);
	return o;
}
function Dh(e) {
	return e.type;
}
function Oh(e, t, n) {
	let r = X(t.messages) ? t.messages : q();
	"__i18nGlobal" in n && (r = Eh(e.locale.value, {
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
function kh(e) {
	return G(os, null, e, 0);
}
function Ah() {
	let e = "currentInstance";
	return e in xu ? xu[e] : Is();
}
var jh = () => [], Mh = () => !1, Nh = 0;
function Ph(e) {
	return ((t, n, r, i) => e(n, r, Ah() || void 0, i));
}
function Fh(e = {}) {
	let { __root: t, __injectWithOption: n } = e, r = t === void 0, i = e.flatJson, a = Gd ? F : fn, o = !Y(e.inheritLocale) || e.inheritLocale, s = a(t && o ? t.locale.value : J(e.locale) ? e.locale : gm), c = a(t && o ? t.fallbackLocale.value : J(e.fallbackLocale) || of(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value), l = a(Eh(s.value, e)), u = a(Z(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }), d = a(Z(e.numberFormats) ? e.numberFormats : { [s.value]: {} }), f = t ? t.missingWarn : Y(e.missingWarn) || Zd(e.missingWarn) ? e.missingWarn : !0, p = t ? t.fallbackWarn : Y(e.fallbackWarn) || Zd(e.fallbackWarn) ? e.fallbackWarn : !0, m = t ? t.fallbackRoot : !Y(e.fallbackRoot) || e.fallbackRoot, h = !!e.fallbackFormat, g = sf(e.missing) ? e.missing : null, _ = sf(e.missing) ? Ph(e.missing) : null, v = sf(e.postTranslation) ? e.postTranslation : null, y = t ? t.warnHtmlMessage : !Y(e.warnHtmlMessage) || e.warnHtmlMessage, b = !!e.escapeParameter, x = t ? t.modifiers : Z(e.modifiers) ? e.modifiers : {}, S = e.pluralRules || t && t.pluralRules, C;
	C = (() => {
		r && Om(null);
		let t = {
			version: mh,
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
		let n = jm(t);
		return r && Om(n), n;
	})(), Pm(C, s.value, c.value);
	function w() {
		return [
			s.value,
			c.value,
			l.value,
			u.value,
			d.value
		];
	}
	let T = K({
		get: () => s.value,
		set: (e) => {
			C.locale = e, s.value = e;
		}
	}), E = K({
		get: () => c.value,
		set: (e) => {
			C.fallbackLocale = e, c.value = e, Pm(C, s.value, e);
		}
	}), D = K(() => l.value), O = /* #__PURE__*/ K(() => u.value), k = /* #__PURE__*/ K(() => d.value);
	function ee() {
		return sf(v) ? v : null;
	}
	function te(e) {
		v = e, C.postTranslation = e;
	}
	function ne() {
		return g;
	}
	function re(e) {
		e !== null && (_ = Ph(e)), g = e, C.missing = _;
	}
	let ie = (e, n, i, a, o, s) => {
		w();
		let c;
		try {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = t ? km() : void 0), c = e(C);
		} finally {
			__INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = void 0);
		}
		if (i !== "translate exists" && Yd(c) && c === -1 || i === "translate exists" && !c) {
			let [e, r] = n();
			return t && m ? a(t) : o(e);
		}
		if (s(c)) return c;
		/* istanbul ignore next */
		throw _h(gh.UNEXPECTED_RETURN_TYPE);
	};
	function ae(...e) {
		return ie((t) => Reflect.apply(oh, null, [t, ...e]), () => dh(...e), "translate", (t) => Reflect.apply(t.t, t, [...e]), (e) => e, (e) => J(e));
	}
	function A(...e) {
		let [t, n, r] = e;
		if (r && !X(r)) throw _h(gh.INVALID_ARGUMENT);
		return ae(t, n, $d({ resolvedMessage: !0 }, r || {}));
	}
	function oe(...e) {
		return ie((t) => Reflect.apply(Hm, null, [t, ...e]), () => Wm(...e), "datetime format", (t) => Reflect.apply(t.d, t, [...e]), () => "", (e) => J(e) || of(e));
	}
	function se(...e) {
		return ie((t) => Reflect.apply(Km, null, [t, ...e]), () => Jm(...e), "number format", (t) => Reflect.apply(t.n, t, [...e]), () => "", (e) => J(e) || of(e));
	}
	function ce(e) {
		return e.map((e) => J(e) || Yd(e) || Y(e) ? kh(String(e)) : e);
	}
	let le = {
		normalize: ce,
		interpolate: (e) => e,
		type: "vnode"
	};
	function ue(...e) {
		return ie((t) => {
			let n, r = t;
			try {
				r.processor = le, n = Reflect.apply(oh, null, [r, ...e]);
			} finally {
				r.processor = null;
			}
			return n;
		}, () => dh(...e), "translate", (t) => t[vh](...e), (e) => [kh(e)], (e) => of(e));
	}
	function de(...e) {
		return ie((t) => Reflect.apply(Km, null, [t, ...e]), () => Jm(...e), "number format", (t) => t[bh](...e), jh, (e) => J(e) || of(e));
	}
	function fe(...e) {
		return ie((t) => Reflect.apply(Hm, null, [t, ...e]), () => Wm(...e), "datetime format", (t) => t[yh](...e), jh, (e) => J(e) || of(e));
	}
	function pe(e) {
		S = e, C.pluralRules = S;
	}
	function me(e, t) {
		return ie(() => {
			if (!e) return !1;
			let n = J(t) ? t : s.value, r = J(t) ? [n] : em(C, c.value, n);
			for (let t = 0; t < r.length; t++) {
				let n = _e(r[t]), i = C.messageResolver(n, e);
				if (i === null && (i = n[e]), hp(i) || ah(i) || J(i)) return !0;
			}
			return !1;
		}, () => [e], "translate exists", (n) => Reflect.apply(n.te, n, [e, t]), Mh, (e) => Y(e));
	}
	function he(e) {
		let t = null, n = em(C, c.value, s.value);
		for (let r = 0; r < n.length; r++) {
			let i = l.value[n[r]] || {}, a = C.messageResolver(i, e);
			if (a != null) {
				t = a;
				break;
			}
		}
		return t;
	}
	function ge(e) {
		return he(e) ?? (t && t.tm(e) || {});
	}
	function _e(e) {
		return l.value[e] || {};
	}
	function ve(e, t) {
		if (i) {
			let n = { [e]: t };
			for (let e in n) af(n, e) && Th(n[e]);
			t = n[e];
		}
		l.value[e] = t, C.messages = l.value;
	}
	function ye(e, t) {
		l.value[e] = l.value[e] || {};
		let n = { [e]: t };
		if (i) for (let e in n) af(n, e) && Th(n[e]);
		t = n[e], jf(t, l.value[e]), C.messages = l.value;
	}
	function be(e) {
		return u.value[e] || {};
	}
	function xe(e, t) {
		u.value[e] = t, C.datetimeFormats = u.value, Gm(C, e, t);
	}
	function Se(e, t) {
		u.value[e] = $d(u.value[e] || {}, t), C.datetimeFormats = u.value, Gm(C, e, t);
	}
	function j(e) {
		return d.value[e] || {};
	}
	function Ce(e, t) {
		d.value[e] = t, C.numberFormats = d.value, Ym(C, e, t);
	}
	function we(e, t) {
		d.value[e] = $d(d.value[e] || {}, t), C.numberFormats = d.value, Ym(C, e, t);
	}
	Nh++, t && Gd && (z(t.locale, (e) => {
		o && (s.value = e, C.locale = e, Pm(C, s.value, c.value));
	}), z(t.fallbackLocale, (e) => {
		o && (c.value = e, C.fallbackLocale = e, Pm(C, s.value, c.value));
	}));
	let Te = {
		id: Nh,
		locale: T,
		fallbackLocale: E,
		get inheritLocale() {
			return o;
		},
		set inheritLocale(e) {
			o = e, e && t && (s.value = t.locale.value, c.value = t.fallbackLocale.value, Pm(C, s.value, c.value));
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
		t: ae,
		getLocaleMessage: _e,
		setLocaleMessage: ve,
		mergeLocaleMessage: ye,
		getPostTranslationHandler: ee,
		setPostTranslationHandler: te,
		getMissingHandler: ne,
		setMissingHandler: re,
		[xh]: pe
	};
	return Te.datetimeFormats = O, Te.numberFormats = k, Te.rt = A, Te.te = me, Te.tm = ge, Te.d = oe, Te.n = se, Te.getDateTimeFormat = be, Te.setDateTimeFormat = xe, Te.mergeDateTimeFormat = Se, Te.getNumberFormat = j, Te.setNumberFormat = Ce, Te.mergeNumberFormat = we, Te[Sh] = n, Te[vh] = ue, Te[yh] = fe, Te[bh] = de, Te;
}
function Ih(e) {
	let t = J(e.locale) ? e.locale : gm, n = J(e.fallbackLocale) || of(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = sf(e.missing) ? e.missing : void 0, i = Y(e.silentTranslationWarn) || Zd(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = Y(e.silentFallbackWarn) || Zd(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, o = !Y(e.fallbackRoot) || e.fallbackRoot, s = !!e.formatFallbackMessages, c = Z(e.modifiers) ? e.modifiers : {}, l = e.pluralizationRules, u = sf(e.postTranslation) ? e.postTranslation : void 0, d = !J(e.warnHtmlInMessage) || e.warnHtmlInMessage !== "off", f = !!e.escapeParameterHtml, p = !Y(e.sync) || e.sync, m = e.messages;
	if (Z(e.sharedMessages)) {
		let t = e.sharedMessages;
		m = Object.keys(t).reduce((e, n) => ($d(e[n] || (e[n] = {}), t[n]), e), m || {});
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
function Lh(e = {}) {
	let t = Fh(Ih(e)), { __extender: n } = e, r = {
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
function Rh(e, t, n) {
	return {
		beforeCreate() {
			let r = Ah();
			/* istanbul ignore if */
			if (!r) throw _h(gh.UNEXPECTED_ERROR);
			let i = this.$options;
			if (i.i18n) {
				let r = i.i18n;
				if (i.__i18n && (r.__i18n = i.__i18n), r.__root = t, this === this.$root) this.$i18n = zh(e, r);
				else {
					r.__injectWithOption = !0, r.__extender = n.__vueI18nExtend, this.$i18n = Lh(r);
					let e = this.$i18n;
					e.__extender && (e.__disposer = e.__extender(this.$i18n));
				}
			} else if (i.__i18n) if (this === this.$root) this.$i18n = zh(e, i);
			else {
				this.$i18n = Lh({
					__i18n: i.__i18n,
					__injectWithOption: !0,
					__extender: n.__vueI18nExtend,
					__root: t
				});
				let e = this.$i18n;
				e.__extender && (e.__disposer = e.__extender(this.$i18n));
			}
			else this.$i18n = e;
			i.__i18nGlobal && Oh(t, i, i), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = (e) => this.$i18n.tm(e), n.__setInstance(r, this.$i18n);
		},
		mounted() {},
		unmounted() {
			let e = Ah();
			/* istanbul ignore if */
			if (!e) throw _h(gh.UNEXPECTED_ERROR);
			let t = this.$i18n;
			t && (delete this.$t, delete this.$rt, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, t?.__disposer && (t.__disposer(), delete t.__disposer, delete t.__extender), n.__deleteInstance(e), delete this.$i18n);
		}
	};
}
function zh(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[xh](t.pluralizationRules || e.pluralizationRules);
	let n = Eh(e.locale, {
		messages: t.messages,
		__i18n: t.__i18n
	});
	return Object.keys(n).forEach((t) => e.mergeLocaleMessage(t, n[t])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n) => e.mergeDateTimeFormat(n, t.datetimeFormats[n])), t.numberFormats && Object.keys(t.numberFormats).forEach((n) => e.mergeNumberFormat(n, t.numberFormats[n])), e;
}
var Bh = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (e) => e === "parent" || e === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function Vh({ slots: e }, t) {
	return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((e, t) => [...e, ...t.type === as ? t.children : [t]], []) : t.reduce((t, n) => {
		let r = e[n];
		return r && (t[n] = r()), t;
	}, q());
}
function Hh() {
	return as;
}
var Uh = /* @__PURE__ */ B({
	name: "i18n-t",
	props: $d({
		keypath: {
			type: String,
			required: !0
		},
		plural: {
			type: [Number, String],
			validator: (e) => Yd(e) || !isNaN(e)
		}
	}, Bh),
	setup(e, t) {
		let { slots: n, attrs: r } = t, i = e.i18n || eg({
			useScope: e.scope,
			__useComponent: !0
		});
		return () => {
			let a = () => {
				let r = Object.keys(n).filter((e) => e[0] !== "_"), a = q();
				e.locale && (a.locale = e.locale), e.plural !== void 0 && (a.plural = J(e.plural) ? +e.plural : e.plural);
				let o = Vh(t, r);
				return i[vh](e.keypath, o, a);
			}, o = $d(q(), r), s = J(e.tag) || X(e.tag) ? e.tag : Hh();
			return X(s) ? nc(s, o, { default: a }) : nc(s, o, a());
		};
	}
});
function Wh(e) {
	return of(e) && !J(e[0]);
}
function Gh(e, t, n, r) {
	let { slots: i, attrs: a } = t;
	return () => {
		let t = () => {
			let t = { part: !0 }, a = q();
			e.locale && (t.locale = e.locale), J(e.format) ? t.key = e.format : X(e.format) && (J(e.format.key) && (t.key = e.format.key), a = Object.keys(e.format).reduce((t, r) => n.includes(r) ? $d(q(), t, { [r]: e.format[r] }) : t, q()));
			let o = r(e.value, t, a), s = [t.key];
			return of(o) ? s = o.map((e, t) => {
				let n = i[e.type], r = n ? n({
					[e.type]: e.value,
					index: t,
					parts: o
				}) : [e.value];
				return Wh(r) && (r[0].key = `${e.type}-${t}`), r;
			}) : J(o) && (s = [o]), s;
		}, o = $d(q(), a), s = J(e.tag) || X(e.tag) ? e.tag : Hh();
		return X(s) ? nc(s, o, { default: t }) : nc(s, o, t());
	};
}
var Kh = /* @__PURE__ */ B({
	name: "i18n-n",
	props: $d({
		value: {
			type: Number,
			required: !0
		},
		format: { type: [String, Object] }
	}, Bh),
	setup(e, t) {
		let n = e.i18n || eg({
			useScope: e.scope,
			__useComponent: !0
		});
		return Gh(e, t, qm, (...e) => n[bh](...e));
	}
});
function qh(e, t) {
	let n = e;
	if (e.mode === "composition") return n.__getInstance(t) || e.global;
	{
		let r = n.__getInstance(t);
		return r == null ? e.global.__composer : r.__composer;
	}
}
function Jh(e) {
	let t = (t) => {
		let { instance: n, value: r } = t;
		/* istanbul ignore if */
		if (!n || !n.$) throw _h(gh.UNEXPECTED_ERROR);
		let i = qh(e, n.$), a = Yh(r);
		return [Reflect.apply(i.t, i, [...Xh(a)]), i];
	};
	return {
		created: (e, n) => {
			let [r, i] = t(n);
			Gd && (e.__i18nWatcher = z(i.locale, () => {
				n.instance && n.instance.$forceUpdate();
			})), e.__composer = i, e.textContent = r;
		},
		unmounted: (e) => {
			Gd && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer);
		},
		beforeUpdate: (e, { value: t }) => {
			if (e.__composer) {
				let n = e.__composer, r = Yh(t);
				e.textContent = Reflect.apply(n.t, n, [...Xh(r)]);
			}
		},
		getSSRProps: (e) => {
			let [n] = t(e);
			return { textContent: n };
		}
	};
}
function Yh(e) {
	if (J(e)) return { path: e };
	if (Z(e)) {
		if (!("path" in e)) throw _h(gh.REQUIRED_VALUE, "path");
		return e;
	}
	throw _h(gh.INVALID_VALUE);
}
function Xh(e) {
	let { path: t, locale: n, args: r, choice: i, plural: a } = e, o = {}, s = r || {};
	return J(n) && (o.locale = n), Yd(i) && (o.plural = i), Yd(a) && (o.plural = a), [
		t,
		s,
		o
	];
}
function Zh(e, t, ...n) {
	let r = Z(n[0]) ? n[0] : {};
	(!Y(r.globalInstall) || r.globalInstall) && ([Uh.name, "I18nT"].forEach((t) => e.component(t, Uh)), [Kh.name, "I18nN"].forEach((t) => e.component(t, Kh)), [dg.name, "I18nD"].forEach((t) => e.component(t, dg))), e.directive("t", Jh(t));
}
var Qh = /* #__PURE__*/ Kd("global-vue-i18n");
function $h(e = {}) {
	let t = __VUE_I18N_LEGACY_API__ && Y(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, n = !Y(e.globalInjection) || e.globalInjection, r = /* @__PURE__ */ new Map(), [i, a] = tg(e, t), o = /* #__PURE__*/ Kd("");
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
			!t && n && (i = ug(e, u.global)), __VUE_I18N_FULL_INSTALL__ && Zh(e, u, ...r), __VUE_I18N_LEGACY_API__ && t && e.mixin(Rh(a, a.__composer, u));
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
function eg(e = {}) {
	let t = Ah();
	if (t == null) throw _h(gh.MUST_BE_CALL_SETUP_TOP);
	if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw _h(gh.NOT_INSTALLED);
	let n = ng(t), r = ig(n), i = Dh(t), a = rg(e, i);
	if (a === "global") return Oh(r, e, i), r;
	if (a === "parent") {
		let i = ag(n, t, e.__useComponent);
		return i ??= r, i;
	}
	if (a === "isolated") {
		if (n.mode !== "composition") throw _h(gh.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		let i = n, a = $d({}, e);
		a.__root = ag(n, t) || r;
		let o = Fh(a);
		return i.__composerExtend && (o[Ch] = i.__composerExtend(o)), Le() && Re(() => {
			let e = o[Ch];
			e && (e(), delete o[Ch]);
		}), o;
	}
	let o = n, s = o.__getInstance(t);
	if (s == null) {
		let n = $d({}, e);
		"__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = Fh(n), o.__composerExtend && (s[Ch] = o.__composerExtend(s)), sg(o, t, s), o.__setInstance(t, s);
	}
	return s;
}
function tg(e, t) {
	let n = Ie(), r = __VUE_I18N_LEGACY_API__ && t ? n.run(() => Lh(e)) : n.run(() => Fh(e));
	if (r == null) throw _h(gh.UNEXPECTED_ERROR);
	return [n, r];
}
function ng(e) {
	let t = br(e.isCE ? Qh : e.appContext.app.__VUE_I18N_SYMBOL__);
	/* istanbul ignore if */
	if (!t) throw _h(e.isCE ? gh.NOT_INSTALLED_WITH_PROVIDE : gh.UNEXPECTED_ERROR);
	return t;
}
function rg(e, t) {
	return Qd(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function ig(e) {
	return e.mode === "composition" ? e.global : e.global.__composer;
}
function ag(e, t, n = !1) {
	let r = null, i = t.root, a = og(t, n);
	for (; a != null;) {
		let t = e;
		if (e.mode === "composition") r = t.__getInstance(a);
		else if (__VUE_I18N_LEGACY_API__) {
			let e = t.__getInstance(a);
			e != null && (r = e.__composer, n && r && !r[Sh] && (r = null));
		}
		if (r != null || i === a) break;
		a = a.parent;
	}
	return r;
}
function og(e, t = !1) {
	return e == null ? null : t && e.vnode.ctx || e.parent;
}
function sg(e, t, n) {
	Yi(() => {}, t), $i(() => {
		let r = n;
		e.__deleteInstance(t);
		let i = r[Ch];
		i && (i(), delete r[Ch]);
	}, t);
}
var cg = [
	"locale",
	"fallbackLocale",
	"availableLocales"
], lg = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function ug(e, t) {
	let n = Object.create(null);
	return cg.forEach((e) => {
		let r = Object.getOwnPropertyDescriptor(t, e);
		if (!r) throw _h(gh.UNEXPECTED_ERROR);
		let i = /* @__PURE__ */ dn(r.value) ? {
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
	}), e.config.globalProperties.$i18n = n, lg.forEach((n) => {
		let r = Object.getOwnPropertyDescriptor(t, n);
		if (!r || !r.value) throw _h(gh.UNEXPECTED_ERROR);
		Object.defineProperty(e.config.globalProperties, `$${n}`, r);
	}), () => {
		delete e.config.globalProperties.$i18n, lg.forEach((t) => {
			delete e.config.globalProperties[`$${t}`];
		});
	};
}
var dg = /* @__PURE__ */ B({
	name: "i18n-d",
	props: $d({
		value: {
			type: [Number, Date],
			required: !0
		},
		format: { type: [String, Object] }
	}, Bh),
	setup(e, t) {
		let n = e.i18n || eg({
			useScope: e.scope,
			__useComponent: !0
		});
		return Gh(e, t, Um, (...e) => n[yh](...e));
	}
});
if (hh(), bm(Hp), Sm(pm), wm(em), __INTLIFY_PROD_DEVTOOLS__) {
	let e = nf();
	e.__INTLIFY__ = !0, Wp(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
//#endregion
//#region src/i18n/locale_resolution.ts
var fg = "locale_load_failed", pg = /* @__PURE__ */ new Set([
	"zh-cn",
	"zh-sg",
	"zh-hans"
]);
function mg(e) {
	let t = e.trim().toLowerCase().replaceAll("_", "-");
	return pg.has(t) ? "zh-CN" : "en";
}
function hg(e, t) {
	return e === "auto" ? mg(t) : e;
}
async function gg(e, t, n) {
	if (t === "en" || e.availableLocales.includes(t)) return e.locale.value = t, { locale: t };
	let r = n[t];
	if (r === void 0) return e.locale.value = "en", {
		locale: "en",
		error_code: fg
	};
	try {
		let n = await r();
		return e.setLocaleMessage(t, n), e.locale.value = t, { locale: t };
	} catch {
		return e.locale.value = "en", {
			locale: "en",
			error_code: fg
		};
	}
}
var _g = {
	app: {
		name: "TavernCanvas",
		tagline: "Bilingual image generation workbench for SillyTavern",
		version_label: "Version {version}",
		startup: {
			loading_title: "Starting TavernCanvas",
			loading_description: "Connecting to JS Slash Runner and loading your workspace."
		},
		unsupported_host: {
			title: "JS Slash Runner update required",
			description: "TavernCanvas needs JS Slash Runner {required_version} or newer. The installed version is {current_version}.",
			update_action: "Open update instructions"
		},
		fatal_error: {
			title: "TavernCanvas could not start",
			description: "Runtime initialization failed. Reload SillyTavern, then check Diagnostics for details.",
			reload_action: "Reload SillyTavern"
		},
		partial_init: {
			banner_title: "Running with limited functionality",
			banner_description: "Some data failed to load. Retry from Diagnostics or continue with what's available."
		}
	},
	nav: {
		workbench: "Workbench",
		prompt: "Prompt",
		assets: "Assets",
		gallery: "Gallery",
		diagnostics: "Diagnostics",
		settings: "Settings",
		more: "More",
		inspector_expand: "Expand inspector",
		inspector_collapse: "Collapse inspector",
		task_strip_expand: "Show running tasks",
		task_strip_collapse: "Hide running tasks",
		task_strip_count: "{n} task running | {n} tasks running"
	},
	common: {
		actions: {
			save: "Save",
			cancel: "Cancel",
			close: "Close",
			confirm: "Confirm",
			delete: "Delete",
			retry: "Retry",
			copy: "Copy",
			copied: "Copied",
			download: "Download",
			search: "Search",
			filter: "Filter",
			clear: "Clear",
			select_all: "Select all",
			deselect_all: "Deselect all",
			continue: "Continue",
			back: "Back",
			next: "Next",
			import: "Import",
			export: "Export",
			edit: "Edit",
			duplicate: "Duplicate",
			regenerate: "Regenerate"
		},
		labels: {
			name: "Name",
			description: "Description",
			status: "Status",
			type: "Type",
			size: "Size",
			created_at: "Created",
			updated_at: "Updated"
		},
		inspector: {
			title: "Inspector",
			empty_title: "Nothing selected",
			empty_description: "Select a job, image, or asset to see its details here."
		},
		workspace_unavailable: "This workspace isn't available yet."
	},
	status: {
		loading: "Loading",
		empty: "Empty",
		partial: "Partial",
		error: "Error",
		disabled: "Disabled",
		success: "Success",
		pending: "Pending",
		running: "Running",
		cancelled: "Cancelled",
		completed: "Completed",
		failed: "Failed",
		retrying: "Retrying",
		online: "Online",
		offline: "Offline",
		connected: "Connected",
		blocked: "Blocked",
		unknown: "Unknown"
	},
	workbench: {
		prompt_composer: {
			positive_label: "Positive prompt",
			positive_placeholder: "Describe what the image should contain",
			negative_label: "Negative prompt",
			negative_placeholder: "Describe what to avoid",
			image_count_label: "Image count"
		},
		reference_strip: {
			title: "Reference images",
			empty_title: "No reference images yet",
			empty_description: "Add up to 4 reference images from Assets or your device to guide generation.",
			add_action: "Add reference",
			remove_action: "Remove reference"
		},
		provider_summary: {
			title: "Provider",
			no_profile_title: "No provider profile selected",
			no_profile_description: "Choose a provider profile in Settings to enable generation.",
			open_settings_action: "Open provider settings"
		},
		active_jobs: {
			title: "Active jobs",
			active_count: "{n} job running | {n} jobs running",
			empty_title: "No jobs running",
			empty_description: "Submit a generation request to see progress here.",
			cancel_action: "Cancel job",
			cancel_confirm_title: "Cancel this job?",
			cancel_confirm_description: "The provider request for {provider} stops immediately and cannot be resumed."
		},
		generation_inspector: {
			title: "Generation parameters",
			seed_label: "Seed",
			steps_label: "Steps",
			sampler_label: "Sampler",
			model_label: "Model"
		},
		submit: {
			action: "Generate",
			validation: {
				profile_required: "Select a provider profile before generating.",
				prompt_required: "Enter a positive prompt before generating.",
				image_count_range: "Choose between 1 and 4 images."
			}
		},
		retry_action: "Retry generation"
	},
	provider: {
		connection_test: {
			action: "Test connection",
			testing: "Testing connection",
			success: "Connection succeeded",
			failed: "Connection failed"
		},
		credentials: { not_stored_locally: "The token is kept in host secret storage and never appears in TavernCanvas UI or exports." },
		concurrency_label: "Concurrent requests",
		fallback_enabled_label: "Fall back to the next provider profile on failure",
		errors: {
			auth_failed: "{provider} rejected the credentials. Check the token in provider settings.",
			rate_limited: "{provider} is rate limiting requests. Retry after a short wait.",
			content_blocked: "{provider} blocked this request under its content policy.",
			invalid_request: "{provider} rejected the request parameters: {message}",
			provider_unavailable: "{provider} is unreachable right now.",
			timed_out: "{provider} did not respond in time.",
			cancelled: "The request to {provider} was cancelled.",
			malformed_response: "{provider} returned a response TavernCanvas could not parse."
		}
	},
	prompt: {
		preset_browser: {
			title: "Presets",
			search_placeholder: "Search presets",
			empty_title: "No presets yet",
			empty_description: "Create a preset from the prompt builder to reuse it across generations.",
			bulk_delete_action: "Delete selected",
			bulk_delete_confirm_title: "Delete {n} preset? | Delete {n} presets?",
			bulk_delete_confirm_description: "This removes the selected presets permanently and cannot be undone."
		},
		fixed_prompts: {
			positive_label: "Fixed positive prompt",
			negative_label: "Fixed negative prompt"
		},
		quality_controls: {
			ucp_label: "Universal Composition Prompt",
			aqt_label: "Auto Quality Tags"
		},
		replacement_rules: {
			title: "Replacement rules",
			add_action: "Add rule",
			trigger_label: "Trigger",
			replacement_label: "Replacement",
			empty_title: "No replacement rules yet",
			empty_description: "Add a rule to substitute matched text before it reaches the provider."
		},
		regex_rules: {
			title: "Regex rules",
			pattern_label: "Pattern",
			test_input_label: "Test text",
			test_action: "Test pattern",
			invalid_pattern: "This is not a valid regular expression: {message}"
		},
		builder: {
			title: "Prompt builder",
			context_preview_title: "Context preview",
			world_info_label: "World Info",
			user_persona_label: "User persona",
			character_context_label: "Character context"
		},
		test_panel: {
			title: "Private prompt test",
			run_action: "Run test",
			tools_disabled_note: "Tools are disabled for this test run.",
			running: "Running the prompt against the private LLM channel",
			result_title: "Result"
		}
	},
	assets: {
		tabs: {
			vocabulary: "Vocabulary",
			characters: "Characters",
			outfits: "Outfits",
			lora: "LoRA",
			vibe: "Vibe",
			reference: "Reference",
			workflow: "Workflow"
		},
		vocabulary: {
			search_placeholder: "Search tags",
			empty_title: "No vocabulary loaded yet",
			empty_description: "Install a vocabulary package from the update channel to search and insert tags.",
			tag_count: "{n} tag | {n} tags",
			update_action: "Check for updates",
			import_action: "Import package"
		},
		characters: {
			empty_title: "No characters saved yet",
			empty_description: "Create a character profile to reuse names, appearance, and context across prompts.",
			add_action: "Add character"
		},
		outfits: {
			empty_title: "No outfits saved yet",
			empty_description: "Add an outfit to a character to reuse it across generations.",
			add_action: "Add outfit"
		},
		lora: {
			empty_title: "No LoRA metadata yet",
			empty_description: "Add a LoRA entry to track its trigger words and recommended weight.",
			add_action: "Add LoRA",
			weight_label: "Weight",
			trigger_words_label: "Trigger words"
		},
		vibe: {
			empty_title: "No vibe or reference groups yet",
			empty_description: "Add a NovelAI vibe transfer group or a Google reference group to reuse across requests.",
			add_action: "Add group"
		},
		reference: {
			empty_title: "No reference images saved yet",
			empty_description: "Save a reference image here to reuse it across generations.",
			add_action: "Add reference"
		},
		workflow: {
			empty_title: "No ComfyUI workflows imported yet",
			empty_description: "Import a workflow JSON file to map its placeholders to TavernCanvas inputs.",
			import_action: "Import workflow",
			placeholder_scan_action: "Scan placeholders",
			edit_action: "Edit workflow"
		},
		random_selection_action: "Pick random",
		reorder_hint: "Drag to reorder",
		delete_confirm_title: "Delete {name}?",
		delete_confirm_description: "This removes it from your asset library permanently and cannot be undone."
	},
	gallery: {
		empty_title: "No generated images yet",
		empty_description: "Generate an image from the Workbench to see it here.",
		filters: {
			title: "Filters",
			provider_label: "Provider",
			date_range_label: "Date range",
			pinned_only_label: "Pinned only",
			orphaned_only_label: "Orphaned only"
		},
		orphan_label: "Not attached to any message",
		cache_occupancy: {
			label: "Local cache usage",
			description: "{used} of {limit} used"
		},
		thumbnail_failed: "Thumbnail unavailable",
		metadata_inspector: {
			title: "Parameters",
			seed_label: "Seed",
			provider_label: "Provider",
			model_label: "Model",
			prompt_label: "Prompt",
			copy_action: "Copy parameters",
			copied_toast: "Parameters copied",
			modify_prompt_action: "Modify prompt",
			regenerate_action: "Regenerate",
			edit_action: "Edit image",
			inpaint_action: "Inpaint",
			source_message_action: "Go to source message"
		},
		selection: {
			selected_count: "{n} image selected | {n} images selected",
			download_action: "Download selected",
			delete_action: "Delete selected",
			delete_confirm_title: "Delete {n} image? | Delete {n} images?",
			delete_confirm_description: "This removes the selected images and their files permanently and cannot be undone.",
			detach_action: "Detach from message",
			detach_confirm_title: "Detach {n} image from this message? | Detach {n} images from this message?",
			detach_confirm_description: "The image stays in Gallery but is no longer linked to this message."
		},
		pin_action: "Pin",
		unpin_action: "Unpin",
		download_action: "Download"
	},
	diagnostics: {
		capability_matrix: {
			title: "Capability matrix",
			available: "Available",
			unavailable: "Unavailable",
			capabilities: {
				native_tool_manager: "Native tool manager",
				main_generation_events: "Main generation events",
				private_prompt_generation: "Private prompt generation",
				message_swipe_metadata: "Message swipe metadata",
				host_image_upload: "Host image upload",
				tavern_helper: "JS Slash Runner",
				tauri_chat_surface: "Tauri chat surface",
				tauri_world_info_activation: "Tauri World Info activation",
				gateway_protocol: "Gateway protocol"
			}
		},
		versions: {
			title: "Versions",
			helper_label: "JS Slash Runner",
			host_label: "SillyTavern",
			protocol_label: "Gateway protocol"
		},
		connection_tests: {
			title: "Connection tests",
			run_action: "Run tests",
			running: "Running connection tests"
		},
		task_timeline: {
			title: "Task timeline",
			empty_title: "No tasks recorded yet",
			empty_description: "Generation, migration, and sync activity appear here as they run.",
			error_code_label: "Error code"
		},
		migration_status: { title: "Migration" },
		storage_usage: {
			title: "Storage",
			estimate_label: "Estimated usage",
			quota_label: "Quota",
			quota_unavailable: "Storage estimate is unavailable on this host.",
			quota_high_pressure: "Storage usage is close to the browser quota. Free space in Gallery or Assets.",
			cache_references_label: "Cached references"
		},
		support_bundle: {
			title: "Support bundle",
			description: "Includes the version, capability matrix, redacted settings, error codes, and task timeline. It never includes prompts, message content, secrets, or image names.",
			export_action: "Export support bundle"
		}
	},
	settings: {
		sections: {
			provider_profiles: "Provider profiles",
			gateway: "Gateway",
			automation: "Automation",
			appearance: "Appearance",
			data: "Data"
		},
		provider_profiles: {
			empty_title: "No provider profiles yet",
			empty_description: "Add a provider profile to connect an image generation backend.",
			add_action: "Add provider profile",
			connection_test_action: "Test connection"
		},
		gateway: {
			endpoint_label: "Gateway endpoint",
			protocol_label: "Protocol",
			detect_action: "Detect protocol",
			token_secret_label: "Token secret reference",
			auto_generate_action: "Generate token"
		},
		http_risk: {
			warning_title: "This connection is not encrypted",
			warning_description_local: "{origin} uses plain HTTP on a loopback or private network. Traffic stays on your local network but is not encrypted.",
			error_description_public: "{origin} uses plain HTTP on a public or unrecognized host. The token, prompts, and images travel in plaintext and can be intercepted.",
			disclosure: "The token, prompts, and images travel in plaintext over this connection.",
			continue_action: "Continue anyway",
			acknowledged_label: "Acknowledged for this origin"
		},
		automation: {
			auto_generation_label: "Generate automatically after each message",
			fallback_generation_label: "Fall back to the next provider profile on failure",
			global_concurrency_label: "Global concurrent requests",
			provider_concurrency_label: "Per-provider concurrent requests"
		},
		appearance: {
			theme_label: "Theme",
			theme_system: "Match system",
			theme_light: "Light",
			theme_dark: "Dark",
			language_label: "Language",
			language_auto: "Match SillyTavern",
			language_zh_cn: "Simplified Chinese",
			language_en: "English",
			inspector_width_label: "Inspector width",
			optional_entry_label: "Show optional entry point in the extensions menu"
		},
		data: {
			vocabulary_channel_label: "Vocabulary update channel",
			vocabulary_channel_bundled: "Bundled baseline",
			vocabulary_channel_https: "Remote update channel",
			archive_export_action: "Export archive",
			archive_import_action: "Import archive",
			archive_import_description: "Importing merges records from the archive into this namespace. It never deletes existing data.",
			migration_retry_action: "Retry migration",
			migration_report_action: "View migration report",
			manual_cleanup: {
				title: "Remove legacy v2 data",
				description: "Only available after a verified migration or archive. This never runs automatically.",
				record_summary: "{count} record, {bytes} | {count} records, {bytes}",
				confirm_action: "Delete legacy data"
			}
		}
	},
	migration: {
		journal: {
			inventory: "Scanning legacy data",
			copying: "Copying records",
			verifying: "Verifying copied data",
			ready_to_switch: "Ready to switch to the new namespace",
			completed: "Migration completed",
			failed: "Migration failed",
			not_required: "No migration needed"
		},
		failure_reasons: {
			invalid_source: "The legacy source data is invalid or corrupted.",
			unknown_setting_path: "A legacy setting path is not recognized.",
			converter_error: "A record failed to convert: {message}",
			missing_blob: "An image file referenced by legacy data is missing.",
			hash_mismatch: "A copied file does not match its expected checksum.",
			count_mismatch: "The copied record count does not match the source count.",
			secret_transfer_blocked: "The provider token could not be transferred securely.",
			switch_failed: "Switching to the new namespace failed after copying."
		},
		retry_action: "Retry migration",
		report_action: "View report",
		record_count: "{n} record | {n} records",
		never_auto_deletes: "TavernCanvas never deletes your legacy data automatically."
	},
	errors: {
		network: "TavernCanvas could not reach the network.",
		capability_blocked: "This action needs {capability}, which is unavailable on the current host.",
		validation_required: "This field is required.",
		storage_quota_exceeded: "The browser storage quota is full. Free space in Gallery or Assets.",
		locale_load_failed: "The Simplified Chinese language pack failed to load. Showing English instead.",
		gateway_incompatible: "The Gateway at {origin} reports an incompatible protocol version.",
		gateway_offline: "The Gateway at {origin} is not reachable.",
		image_upload_failed: "Uploading {file_name} to the host failed.",
		generation_failed: "Generation failed: {message}",
		unexpected: "Something went wrong. Check Diagnostics for details."
	},
	confirmations: {
		destructive: {
			default_confirm_action: "Delete",
			default_cancel_action: "Cancel",
			irreversible_note: "This action cannot be undone."
		},
		typed_confirmation: {
			label: "Type {phrase} to confirm",
			placeholder: "Type the confirmation phrase",
			mismatch: "The typed text does not match {phrase}."
		},
		discard_unsaved: {
			title: "Discard unsaved changes?",
			description: "Your edits are not saved yet. Leaving now discards them.",
			stay_action: "Keep editing",
			discard_action: "Discard changes"
		}
	}
}, vg = { "zh-CN": async () => (await import("./chunks/zh_cn-B6QTc0VG.js")).zh_cn_messages }, yg = {
	decimal: {
		style: "decimal",
		maximumFractionDigits: 2
	},
	percent: {
		style: "percent",
		maximumFractionDigits: 1
	}
}, bg = {
	short_date: {
		year: "numeric",
		month: "short",
		day: "numeric"
	},
	short_time: {
		hour: "2-digit",
		minute: "2-digit"
	}
}, xg = {
	legacy: !1,
	locale: "en",
	fallbackLocale: "en",
	messages: { en: _g },
	numberFormats: {
		en: yg,
		"zh-CN": yg
	},
	datetimeFormats: {
		en: bg,
		"zh-CN": bg
	}
};
function Sg() {
	let e = $h(xg);
	async function t(t, n) {
		let r = hg(t, n);
		return gg(e.global, r, vg);
	}
	return {
		i18n: e,
		apply_locale: t
	};
}
//#endregion
//#region src/ui/controllers/unavailable_capabilities.ts
var Cg = "capability_not_implemented";
function $() {
	let e = /* @__PURE__ */ Error("No adapter wraps the real domain module for this capability yet (see task-1-report.md's \"future adapter layer\" note); bootstrap.ts uses this placeholder until one is wired in.");
	return Object.defineProperty(e, "code", { value: Cg }), Promise.reject(e);
}
function wg() {
	return () => {};
}
var Tg = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	reference: [],
	workflow: []
}, Eg = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, Dg = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
}, Og = {
	schema_version: 1,
	active_namespace: "default",
	locale: "auto",
	active_provider_profile_id: null,
	global_concurrency: 1,
	auto_generation_enabled: !1,
	fallback_generation_enabled: !1,
	gateway: {
		endpoint: null,
		token_secret_id: null,
		http_acknowledgments: {}
	},
	ui: {
		color_mode: "system",
		inspector_width: 320,
		inspector_collapsed: !1,
		optional_entry_enabled: !1
	}
};
function kg() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: wg,
			submit: $,
			cancel: $,
			retry: $
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: wg,
			save: $,
			remove: $,
			test_connection: $
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: wg,
			load_draft: $,
			save_draft: $,
			remove: $,
			bulk_remove: $,
			test_regex: $
		},
		assets: {
			load: () => Promise.resolve(Tg),
			subscribe: wg,
			save: $,
			remove: $,
			reorder: $
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: wg,
			read_bytes: $,
			pin: $,
			detach_from_message: $,
			delete_record: $,
			bulk_delete: $
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			search: $,
			next_page: $,
			install: $,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(Eg),
			subscribe: wg,
			test_connection: $,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: $
		},
		migration: {
			load: () => Promise.resolve(Dg),
			subscribe: wg,
			retry: $,
			confirm_legacy_cleanup: $
		},
		settings: {
			load: () => Promise.resolve({
				settings: Og,
				vocabulary_update_channel: "bundled"
			}),
			subscribe: wg,
			update: $,
			acknowledge_http_origin: $,
			set_vocabulary_update_channel: $,
			export_archive: $,
			import_archive: $
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var Ag = { status: "idle" }, jg = "capability_load_failed", Mg = "command_failed", Ng = /^[a-z][a-z0-9_]*$/u;
function Pg(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && Ng.test(t)) return { code: t };
	}
	return { code: t };
}
function Fg(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
function Ig(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: Pg(e, Mg)
		});
	}));
}
function Lg(e, t, n) {
	return {
		route: e,
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		workbench: {
			profiles: [],
			active_profile_id: null,
			jobs: [],
			submit_command: Ag
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: Ag
		},
		assets: {
			active_category: "character",
			records: {
				character: [],
				outfit: [],
				lora: [],
				vibe: [],
				reference: [],
				workflow: []
			},
			vocabulary_catalog: [],
			vocabulary_install_command: Ag
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: Ag
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			migration: null,
			connection_test_command: Ag,
			support_bundle_command: Ag
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			update_command: Ag,
			migration_retry_command: Ag
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var Rg = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = Lg(e.initial_route ?? "workbench", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
	}
	get state() {
		return this.#t;
	}
	on_change(e) {
		return this.#n.add(e), () => {
			this.#n.delete(e);
		};
	}
	#a() {
		for (let e of this.#n) e();
	}
	#o(e) {
		this.#t = {
			...this.#t,
			...e
		}, this.#a();
	}
	#s(e) {
		this.#o({ workbench: {
			...this.#t.workbench,
			...e
		} });
	}
	#c(e) {
		this.#o({ prompt: {
			...this.#t.prompt,
			...e
		} });
	}
	#l(e) {
		this.#o({ assets: {
			...this.#t.assets,
			...e
		} });
	}
	#u(e) {
		this.#o({ gallery: {
			...this.#t.gallery,
			...e
		} });
	}
	#d(e) {
		this.#o({ diagnostics: {
			...this.#t.diagnostics,
			...e
		} });
	}
	#f(e) {
		this.#o({ settings: {
			...this.#t.settings,
			...e
		} });
	}
	#p(e) {
		this.#o({ inspector: {
			...this.#t.inspector,
			...e
		} });
	}
	#m(e, t) {
		let n = new Set(this.#t.loading);
		t ? n.add(e) : n.delete(e), this.#o({ loading: n });
	}
	#h(e, t) {
		let n = new Map(this.#t.failures);
		t ? n.set(e, t) : n.delete(e), this.#o({ failures: n });
	}
	#g(e, t, n) {
		return this.#m(e, !0), t().then((t) => {
			this.#i || (n(t), this.#h(e, null));
		}).catch((t) => {
			this.#i || this.#h(e, Pg(t, jg));
		}).finally(() => {
			this.#m(e, !1);
		});
	}
	#_(e) {
		this.#i || (e.type === "job_updated" ? this.#s({ jobs: Fg(this.#t.workbench.jobs, e.job, (e) => e.job_id) }) : this.#s({ jobs: this.#t.workbench.jobs.filter((t) => t.job_id !== e.job_id) }));
	}
	#v(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: Fg(this.#t.workbench.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#y(e) {
		this.#i || (e.type === "preset_upserted" ? this.#c({ presets: Fg(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#c({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#b(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: Fg(this.#t.assets.records[t], e.asset, (e) => e.id)
			};
			this.#l({ records: n });
		} else {
			let t = {
				...this.#t.assets.records,
				[e.category]: this.#t.assets.records[e.category].filter((t) => t.id !== e.asset_id)
			};
			this.#l({ records: t });
		}
	}
	#x(e) {
		this.#i || (e.type === "record_upserted" ? this.#u({ records: Fg(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#u({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
	}
	#S(e) {
		this.#i || this.#d({ timeline: [...this.#t.diagnostics.timeline, e.entry] });
	}
	#C(e) {
		this.#i || this.#d({ migration: e.snapshot });
	}
	#w(e) {
		this.#i || this.#f({ settings: e.settings });
	}
	async start() {
		this.#r = [
			this.#e.generation.subscribe((e) => {
				this.#_(e);
			}),
			this.#e.profiles.subscribe((e) => {
				this.#v(e);
			}),
			this.#e.prompt_presets.subscribe((e) => {
				this.#y(e);
			}),
			this.#e.assets.subscribe((e) => {
				this.#b(e);
			}),
			this.#e.gallery.subscribe((e) => {
				this.#x(e);
			}),
			this.#e.diagnostics.subscribe((e) => {
				this.#S(e);
			}),
			this.#e.migration.subscribe((e) => {
				this.#C(e);
			}),
			this.#e.settings.subscribe((e) => {
				this.#w(e);
			})
		], await Promise.allSettled([
			this.#g("generation", () => this.#e.generation.load(), (e) => {
				this.#s({ jobs: e });
			}),
			this.#g("profiles", () => this.#e.profiles.load(), (e) => {
				this.#s({
					profiles: e,
					active_profile_id: this.#t.workbench.active_profile_id ?? e[0]?.id ?? null
				});
			}),
			this.#g("prompt_presets", () => this.#e.prompt_presets.load(), (e) => {
				this.#c({ presets: e });
			}),
			this.#g("assets", () => this.#e.assets.load(), (e) => {
				this.#l({ records: e });
			}),
			this.#g("gallery", () => this.#e.gallery.load(), (e) => {
				this.#u({ records: e });
			}),
			this.#g("vocabulary", () => this.#e.vocabulary.load(), (e) => {
				this.#l({ vocabulary_catalog: e });
			}),
			this.#g("diagnostics", () => this.#e.diagnostics.load(), (e) => {
				this.#d({ snapshot: e });
			}),
			this.#g("migration", () => this.#e.migration.load(), (e) => {
				this.#d({ migration: e });
			}),
			this.#g("settings", () => this.#e.settings.load(), (e) => {
				this.#f({
					settings: e.settings,
					vocabulary_update_channel: e.vocabulary_update_channel
				});
			})
		]);
	}
	stop() {
		this.#i = !0;
		let e = [];
		for (let t of [...this.#r].reverse()) try {
			t();
		} catch (t) {
			e.push(t);
		}
		return this.#r = [], e.length > 0 ? Promise.reject(AggregateError(e, "Studio controller cleanup failed")) : Promise.resolve();
	}
	set_route(e) {
		this.#o({ route: e });
	}
	set_color_mode(e) {
		this.#o({ color_mode: e });
	}
	set_inspector_width(e) {
		this.#p({ width: e });
	}
	set_inspector_collapsed(e) {
		this.#p({ collapsed: e });
	}
	select_inspector_record(e) {
		this.#p({ selected_record: e });
	}
	submit_generation(e) {
		return Ig(() => this.#t.workbench.submit_command, (e) => {
			this.#s({ submit_command: e });
		}, async () => {
			let t = await this.#e.generation.submit(e);
			return this.#s({ jobs: Fg(this.#t.workbench.jobs, t, (e) => e.job_id) }), t;
		});
	}
	async cancel_generation(e) {
		let t = await this.#e.generation.cancel(e);
		this.#s({ jobs: Fg(this.#t.workbench.jobs, t, (e) => e.job_id) });
	}
	async retry_generation(e) {
		let t = await this.#e.generation.retry(e);
		this.#s({ jobs: Fg(this.#t.workbench.jobs, t, (e) => e.job_id) });
	}
	save_prompt_preset(e) {
		return Ig(() => this.#t.prompt.save_command, (e) => {
			this.#c({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#c({
				presets: Fg(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e) {
		return Ig(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#l({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e));
	}
	update_settings(e) {
		return Ig(() => this.#t.settings.update_command, (e) => {
			this.#f({ update_command: e });
		}, async () => {
			let t = await this.#e.settings.update(e);
			return this.#f({ settings: t }), t;
		});
	}
	test_diagnostics_connection() {
		return Ig(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#d({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return Ig(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#d({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	retry_migration() {
		return Ig(() => this.#t.settings.migration_retry_command, (e) => {
			this.#f({ migration_retry_command: e });
		}, async () => {
			let e = await this.#e.migration.retry();
			return this.#d({ migration: e }), e;
		});
	}
};
function zg(e) {
	return new Rg(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function Bg(e) {
	let t = zg(e), n = /* @__PURE__ */ fn(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), Re(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region src/ui/contracts/portal_keys.ts
var Vg = Symbol("tavern-canvas-portal-target"), Hg = /* @__PURE__ */ B({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return yr(Vg, t.portalTarget), (e, t) => V(e.$slots, "default");
	}
}), Ug = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], Wg = 240, Gg = 720, Kg = 16, qg = /* @__PURE__ */ B({
	__name: "ContextInspector",
	props: { width: {} },
	emits: ["resize"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = /* @__PURE__ */ F(!1);
		function s(e) {
			return Math.min(Gg, Math.max(Wg, e));
		}
		function c(e) {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = e.clientX, r = n.width, a = e.pointerId, c = e.currentTarget;
			c.setPointerCapture(a), o.value = !0;
			function l(e) {
				let n = t - e.clientX;
				i("resize", s(r + n));
			}
			function u() {
				c.releasePointerCapture(a), c.removeEventListener("pointermove", l), c.removeEventListener("pointerup", u), c.removeEventListener("pointercancel", u), o.value = !1;
			}
			c.addEventListener("pointermove", l), c.addEventListener("pointerup", u), c.addEventListener("pointercancel", u);
		}
		function l(e) {
			e.key === "ArrowLeft" ? (e.preventDefault(), i("resize", s(n.width + Kg))) : e.key === "ArrowRight" && (e.preventDefault(), i("resize", s(n.width - Kg)));
		}
		return (e, t) => (H(), hs("div", { class: j(I(r).inspector) }, [W("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: j(I(r).inspector_resizer),
			"data-dragging": o.value,
			"aria-valuenow": n.width,
			"aria-valuemin": Wg,
			"aria-valuemax": Gg,
			"aria-label": I(a)("common.inspector.title"),
			onPointerdown: c,
			onKeydown: l
		}, null, 42, Ug), W("div", { class: j(I(r).inspector_panel) }, [W("div", { class: j(I(r).inspector_header) }, [W("span", null, M(I(a)("common.inspector.title")), 1)], 2), W("div", { class: j(I(r).inspector_body) }, [W("p", null, M(I(a)("common.inspector.empty_title")), 1), W("p", null, M(I(a)("common.inspector.empty_description")), 1)], 2)], 2)], 2));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
function Jg(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = br(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (yr(r, e), e)];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function Yg() {
	let e = document.activeElement;
	if (e == null) return null;
	for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function Xg(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function Zg(e) {
	return e == null;
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
function Qg(e, t) {
	return Le() ? (Re(e, t), !0) : !1;
}
function $g() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return Qg(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
function e_(e) {
	let t = !1, n, r = Ie(!0);
	return ((...i) => (t ||= (n = r.run(() => e(...i)), !0), n));
}
var t_ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var n_ = (e) => e !== void 0, r_ = Object.prototype.toString, i_ = (e) => r_.call(e) === "[object Object]", a_ = /* #__PURE__ */ o_();
function o_() {
	var e, t;
	return t_ && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function s_(e) {
	return Array.isArray(e) ? e : [e];
}
function c_(e) {
	return e || Is();
}
function l_(e) {
	if (!t_) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = Ie(!0), n = r.run(() => e(...a))), Qg(i), n));
}
function u_(e, t = 1e4) {
	return yn((n, r) => {
		let i = L(e), a, o = () => setTimeout(() => {
			i = L(e), r();
		}, L(t));
		return Qg(() => {
			clearTimeout(a);
		}), {
			get() {
				return n(), i;
			},
			set(e) {
				i = e, r(), clearTimeout(a), a = o();
			}
		};
	});
}
function d_(e, t) {
	c_(t) && Qi(e, t);
}
function f_(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = /* @__PURE__ */ fn(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, L(t));
	}
	return r && (a.value = !0, t_ && l()), Qg(c), {
		isPending: /* @__PURE__ */ tn(a),
		start: l,
		stop: c
	};
}
function p_(e, t, n) {
	return z(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.40_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
var m_ = t_ ? window : void 0;
t_ && window.document, t_ && window.navigator, t_ && window.location;
function h_(e) {
	let t = L(e);
	return t?.$el ?? t;
}
function g_(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = K(() => {
		let t = s_(L(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return p_(() => [
		n.value?.map((e) => h_(e)) ?? [m_].filter((e) => e != null),
		s_(L(n.value ? e[1] : e[0])),
		s_(I(n.value ? e[2] : e[1])),
		L(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = i_(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function __() {
	let e = /* @__PURE__ */ fn(!1), t = Is();
	return t && Yi(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function v_(e) {
	let t = __();
	return K(() => (t.value, !!e()));
}
function y_(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function b_(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = m_, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = y_(t);
	return g_(i, a, (e) => {
		e.repeat && L(s) || c(e) && n(e);
	}, o);
}
function x_(e) {
	return JSON.parse(JSON.stringify(e));
}
function S_(e, t, n = {}) {
	let { window: r = m_, ...i } = n, a, o = /* @__PURE__ */ v_(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = z(K(() => {
		let t = L(e);
		return Array.isArray(t) ? t.map((e) => h_(e)) : [h_(t)];
	}), (e) => {
		if (s(), o.value && r) {
			a = new ResizeObserver(t);
			for (let t of e) t && a.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), l = () => {
		s(), c();
	};
	return Qg(l), {
		isSupported: o,
		stop: l
	};
}
function C_(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: d } = r, f = Is(), p = n || f?.emit || (f == null || (i = f.$emit) == null ? void 0 : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(f?.proxy)), m = c;
	t ||= "modelValue", m ||= `update:${t.toString()}`;
	let h = (e) => o ? typeof o == "function" ? o(e) : x_(e) : e, g = () => n_(e[t]) ? h(e[t]) : u, _ = (e) => {
		d ? d(e) && p(m, e) : p(m, e);
	};
	if (s) {
		let n = /* @__PURE__ */ F(g()), r = !1;
		return z(() => e[t], (e) => {
			r || (r = !0, n.value = h(e), $n(() => r = !1));
		}), z(n, (n) => {
			!r && (n !== e[t] || l) && _(n);
		}, { deep: l }), n;
	}
	return K({
		get() {
			return g();
		},
		set(e) {
			_(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function w_(e) {
	return e ? e.flatMap((e) => e.type === as ? w_(e.children) : [e]) : [];
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useArrowNavigation.js
var T_ = ["INPUT", "TEXTAREA"];
function E_(e, t, n, r = {}) {
	if (!t || r.enableIgnoredElement && T_.includes(t.nodeName)) return null;
	let { arrowKeyOptions: i = "both", attributeName: a = "[data-reka-collection-item]", itemsArray: o = [], loop: s = !0, dir: c = "ltr", preventScroll: l = !0, focus: u = !1 } = r, [d, f, p, m, h, g] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	], _ = p || m, v = d || f;
	if (!h && !g && (!_ && !v || i === "vertical" && v || i === "horizontal" && _)) return null;
	let y = n ? Array.from(n.querySelectorAll(a)) : o;
	if (!y.length) return null;
	l && e.preventDefault();
	let b = null;
	return v || _ ? b = D_(y, t, {
		goForward: _ ? m : c === "ltr" ? d : f,
		loop: s
	}) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function D_(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
	if (--r === 0) return null;
	let i = e.indexOf(t), a;
	if (a = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (a < 0 || a >= e.length)) return null;
	let o = e[(a + e.length) % e.length];
	return o ? o.hasAttribute("disabled") && o.getAttribute("disabled") !== "false" ? D_(e, o, n, r) : o : null;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [O_, k_] = /*#__PURE__*/ Jg("ConfigProvider");
//#endregion
//#region ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function A_(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function j_(e, t, n = ".", r) {
	if (!A_(t)) return j_(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : A_(a) && A_(i[t]) ? j_(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function M_(e) {
	return (...t) => t.reduce((t, n) => j_(t, n, "", e), {});
}
var N_ = M_(), P_ = l_(() => {
	let e = /* @__PURE__ */ F(/* @__PURE__ */ new Map()), t = /* @__PURE__ */ F(), n = K(() => {
		for (let t of e.value.values()) if (t) return !0;
		return !1;
	}), r = O_({ scrollBody: /* @__PURE__ */ F(!0) }), i = null, a = () => {
		document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", a_ && i?.(), t.value = void 0;
	};
	return z(n, (e, o) => {
		if (!t_) return;
		if (!e) {
			o && a();
			return;
		}
		t.value === void 0 && (t.value = document.body.style.overflow);
		let s = window.innerWidth - document.documentElement.clientWidth, c = {
			padding: s,
			margin: 0
		}, l = r.scrollBody?.value ? typeof r.scrollBody.value == "object" ? N_({
			padding: r.scrollBody.value.padding === !0 ? s : r.scrollBody.value.padding,
			margin: r.scrollBody.value.margin === !0 ? s : r.scrollBody.value.margin
		}, c) : c : {
			padding: 0,
			margin: 0
		};
		s > 0 && (document.body.style.paddingRight = typeof l.padding == "number" ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == "number" ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), a_ && (i = g_(document, "touchmove", (e) => L_(e), { passive: !1 })), $n(() => {
			n.value && (document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden");
		});
	}, {
		immediate: !0,
		flush: "sync"
	}), e;
});
function F_(e) {
	let t = Math.random().toString(36).substring(2, 7), n = P_();
	n.value.set(t, e ?? !1);
	let r = K({
		get: () => n.value.get(t) ?? !1,
		set: (e) => n.value.set(t, e)
	});
	return d_(() => {
		n.value.delete(t);
	}), r;
}
function I_(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !(t instanceof Element) || t.tagName === "BODY" ? !1 : I_(t);
	}
}
function L_(e) {
	let t = e || window.event, n = t.target;
	return n instanceof Element && I_(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
function R_(e) {
	let t = O_({ dir: /* @__PURE__ */ F("ltr") });
	return K(() => e?.value || t.dir?.value || "ltr");
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
function z_(e) {
	let t = Is(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[le(A(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var B_ = 0;
function V_() {
	wr((e) => {
		if (!t_) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? H_()), document.body.insertAdjacentElement("beforeend", t[1] ?? H_()), B_++, e(() => {
			B_ === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), B_--;
		});
	});
}
function H_() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function U_() {
	let e = Is(), t = /* @__PURE__ */ F(), n = K(() => r());
	Zi(() => {
		n.value !== r() && hn(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : h_(t);
	}
	let i = Object.assign({}, e.exposed), a = {};
	for (let t in e.props) Object.defineProperty(a, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
		enumerable: !0,
		configurable: !0,
		get: () => i[e]
	});
	Object.defineProperty(a, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = a;
	function o(n) {
		if (t.value = n, n && (Object.defineProperty(a, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, a);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: o,
		currentRef: t,
		currentElement: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardProps.js
function W_(e) {
	let t = Is(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = /* @__PURE__ */ Cn(e);
	return K(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[A(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function G_(e, t) {
	let n = W_(e), r = t ? z_(t) : {};
	return K(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function K_(e, t) {
	let n = u_(!1, 300);
	Qg(() => {
		n.value = !1;
	});
	let r = /* @__PURE__ */ F(null), i = $g();
	function a() {
		r.value = null, n.value = !1;
	}
	function o(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = J_(a, q_(a, i.getBoundingClientRect()), 1), s = Y_(t.getBoundingClientRect()), c = Z_([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return wr((n) => {
		if (e.value && t.value) {
			let r = (e) => o(e, t.value), i = (t) => o(t, e.value);
			e.value.addEventListener("pointerleave", r), t.value.addEventListener("pointerleave", i), n(() => {
				e.value?.removeEventListener("pointerleave", r), t.value?.removeEventListener("pointerleave", i);
			});
		}
	}), wr((n) => {
		if (r.value) {
			let o = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let o = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(o) || t.value?.contains(o), l = !X_(s, r.value), u = !!o.closest("[data-grace-area-trigger]");
				c ? a() : (l || u) && (a(), i.trigger());
			};
			e.value?.ownerDocument.addEventListener("pointermove", o), n(() => e.value?.ownerDocument.removeEventListener("pointermove", o));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: i.on
	};
}
function q_(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function J_(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right": r.push({
			x: e.x - n,
			y: e.y - n
		}, {
			x: e.x - n,
			y: e.y + n
		});
	}
	return r;
}
function Y_(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function X_(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function Z_(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), Q_(t);
}
function Q_(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t.at(-1), n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n.at(-1), t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
//#endregion
//#region ../../node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var $_ = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, ev = /* @__PURE__ */ new WeakMap(), tv = /* @__PURE__ */ new WeakMap(), nv = {}, rv = 0, iv = function(e) {
	return e && (e.host || iv(e.parentNode));
}, av = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = iv(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, ov = function(e, t, n, r) {
	var i = av(t, Array.isArray(e) ? e : [e]);
	nv[n] || (nv[n] = /* @__PURE__ */ new WeakMap());
	var a = nv[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (ev.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				ev.set(e, c), a.set(e, l), o.push(e), c === 1 && i && tv.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), rv++, function() {
		o.forEach(function(e) {
			var t = ev.get(e) - 1, i = a.get(e) - 1;
			ev.set(e, t), a.set(e, i), t || (tv.has(e) || e.removeAttribute(r), tv.delete(e)), i || e.removeAttribute(n);
		}), rv--, rv || (ev = /* @__PURE__ */ new WeakMap(), ev = /* @__PURE__ */ new WeakMap(), tv = /* @__PURE__ */ new WeakMap(), nv = {});
	};
}, sv = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || $_(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), ov(r, i, n, "aria-hidden")) : function() {
		return null;
	};
};
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
function cv(e) {
	let t;
	z(() => h_(e), (e) => {
		let n = !1;
		try {
			n = !!e?.closest("[popover]:not(:popover-open)");
		} catch {}
		e && !n ? t = sv(e) : t && t();
	}), $i(() => {
		t && t();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var lv = 0;
function uv(e, t = "reka") {
	if (e) return e;
	let n, r = O_({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in xu ? ai?.() : `${++lv}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSize.js
function dv(e) {
	let t = /* @__PURE__ */ F(), n = K(() => t.value?.width ?? 0), r = K(() => t.value?.height ?? 0), i;
	return Yi(() => {
		let n = h_(e);
		n ? (t.value = {
			width: n.offsetWidth,
			height: n.offsetHeight
		}, i = new ResizeObserver((e) => {
			if (!Array.isArray(e) || !e.length) return;
			let r = e[0], i, a;
			if ("borderBoxSize" in r) {
				let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
				i = t.inlineSize, a = t.blockSize;
			} else i = n.offsetWidth, a = n.offsetHeight;
			t.value = {
				width: i,
				height: a
			};
		}), i.observe(n, { box: "border-box" })) : t.value = void 0;
	}), $i(() => {
		i?.disconnect(), i = void 0;
	}), {
		width: n,
		height: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
function fv(e, t) {
	let n = /* @__PURE__ */ F(e);
	function r(e) {
		return t[n.value][e] ?? n.value;
	}
	return {
		state: n,
		dispatch: (e) => {
			n.value = r(e);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function pv(e) {
	let t = u_("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = Yg(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), i = n.find((t) => t.ref === e), a = hv(n.map((e) => e.textValue), t.value, i?.textValue), o = n.find((e) => e.textValue === a);
				return o && o.ref.focus(), o?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function mv(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function hv(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = mv(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/usePresence.js
function gv(e, t) {
	let n = /* @__PURE__ */ F({}), r = /* @__PURE__ */ F("none"), i = /* @__PURE__ */ F(e), a = e.value ? "mounted" : "unmounted", o, s = t.value?.ownerDocument.defaultView ?? m_, { state: c, dispatch: l } = fv(a, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	}), u = (e) => {
		if (t_) {
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	z(e, async (e, i) => {
		let a = i !== e;
		if (await $n(), a) {
			let a = r.value, o = _v(t.value);
			e ? (l("MOUNT"), u("enter"), o === "none" && u("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : i && a !== o ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
		}
	}, { immediate: !0 });
	let d = (e) => {
		let n = _v(t.value), r = n.includes(CSS.escape(e.animationName)), a = c.value === "mounted" ? "enter" : "leave";
		if (e.target === t.value && r && (u(`after-${a}`), l("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", o = s?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		e.target === t.value && n === "none" && l("ANIMATION_END");
	}, f = (e) => {
		e.target === t.value && (r.value = _v(t.value));
	}, p = z(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", f), e.addEventListener("animationcancel", d), e.addEventListener("animationend", d)) : (l("ANIMATION_END"), o !== void 0 && s?.clearTimeout(o), t?.removeEventListener("animationstart", f), t?.removeEventListener("animationcancel", d), t?.removeEventListener("animationend", d));
	}, { immediate: !0 }), m = z(c, () => {
		let e = _v(t.value);
		r.value = c.value === "mounted" ? e : "none";
	});
	return $i(() => {
		p(), m(), t.value && (t.value.removeEventListener("animationstart", f), t.value.removeEventListener("animationcancel", d), t.value.removeEventListener("animationend", d)), o !== void 0 && s?.clearTimeout(o);
	}), { isPresent: K(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function _v(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var vv = /*#__PURE__*/ B({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: !0
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(e, { slots: t, expose: n }) {
		let { present: r, forceMount: i } = /* @__PURE__ */ bn(e), a = /* @__PURE__ */ F(), { isPresent: o } = gv(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = w_(s || []);
		let c = Is();
		if (s && s?.length > 1) {
			let e = c?.parent?.type.name ? `<${c.parent.type.name} />` : "component";
			throw Error([
				`Detected an invalid children for \`${e}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
		}
		return () => i.value || r.value || o.value ? nc(t.default({ present: o.value })[0], { ref: (e) => {
			let t = h_(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), yv = /*#__PURE__*/ B({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = w_(n.default()), r = e.findIndex((e) => e.type !== ss);
			if (r === -1) return e;
			let i = e[r];
			delete i.props?.ref;
			let a = i.props ? As(t, i.props) : t, o = Cs({
				...i,
				props: {}
			}, a);
			return e.length === 1 ? o : (e[r] = o, e);
		};
	}
}), bv = [
	"area",
	"img",
	"input"
], xv = /*#__PURE__*/ B({
	name: "Primitive",
	inheritAttrs: !1,
	props: {
		asChild: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(e, { attrs: t, slots: n }) {
		let r = e.asChild ? "template" : e.as;
		return typeof r == "string" && bv.includes(r) ? () => nc(r, t) : r === "template" ? () => nc(yv, t, { default: n.default }) : () => nc(e.as, t, { default: n.default });
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function Sv() {
	let e = /* @__PURE__ */ F();
	return {
		primitiveElement: e,
		currentElement: K(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : h_(e))
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/utils.js
var Cv = "dismissableLayer.pointerDownOutside", wv = "dismissableLayer.focusOutside";
function Tv(e, t) {
	if (!(t instanceof Element)) return !1;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function Ev(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(() => {});
	return wr((o) => {
		if (!t_ || !L(n)) return;
		let s = async (n) => {
			let o = n.target;
			if (!(!t?.value || !o)) {
				if (Tv(t.value, o)) {
					i.value = !1;
					return;
				}
				if (n.target && !i.value) {
					let t = { originalEvent: n };
					function i() {
						Xg(Cv, e, t);
					}
					n.pointerType === "touch" ? (r.removeEventListener("click", a.value), a.value = i, r.addEventListener("click", a.value, { once: !0 })) : i();
				} else r.removeEventListener("click", a.value);
				i.value = !1;
			}
		}, c = window.setTimeout(() => {
			r.addEventListener("pointerdown", s);
		}, 0);
		o(() => {
			window.clearTimeout(c), r.removeEventListener("pointerdown", s), r.removeEventListener("click", a.value);
		});
	}), { onPointerDownCapture: () => {
		L(n) && (i.value = !0);
	} };
}
function Dv(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = /* @__PURE__ */ F(!1);
	return wr((a) => {
		if (!t_ || !L(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await $n(), await $n();
			let r = n.target;
			!t.value || !r || Tv(t.value, r) || n.target && !i.value && Xg(wv, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), a(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			L(n) && (i.value = !0);
		},
		onBlurCapture: () => {
			L(n) && (i.value = !1);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var Ov = /*#__PURE__*/ Qt({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
}), kv = /* @__PURE__ */ B({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
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
			required: !1
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: a } = U_(), o = K(() => a.value?.ownerDocument ?? globalThis.document), s = K(() => Ov.layersRoot), c = K(() => a.value ? Array.from(s.value).indexOf(a.value) : -1), l = K(() => Ov.layersWithOutsidePointerEventsDisabled.size > 0), u = K(() => {
			let e = Array.from(s.value), [t] = [...Ov.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return c.value >= n;
		}), d = Ev(async (e) => {
			let t = [...Ov.branches].some((t) => t?.contains(e.target));
			!n.present || !u.value || t || (r("pointerDownOutside", e), r("interactOutside", e), await $n(), e.defaultPrevented || r("dismiss"));
		}, a), f = Dv((e) => {
			let t = [...Ov.branches].some((t) => t?.contains(e.target));
			!n.present || t || (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, a);
		return b_("Escape", (e) => {
			n.present && c.value === s.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), z([
			a,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			!e || !n || t && (Ov.layersWithOutsidePointerEventsDisabled.size === 0 && (Ov.originalBodyPointerEvents = o.value.body.style.pointerEvents, o.value.body.style.pointerEvents = "none"), Ov.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				Ov.layersWithOutsidePointerEventsDisabled.delete(e), Ov.layersWithOutsidePointerEventsDisabled.size === 0 && !Zg(Ov.originalBodyPointerEvents) && (o.value.body.style.pointerEvents = Ov.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), z([a, () => n.present], ([e, t], n, r) => {
			!e || !t || (s.value.add(e), r(() => {
				s.value.delete(e);
			}));
		}, { immediate: !0 }), wr((e) => {
			e(() => {
				a.value && (s.value.delete(a.value), Ov.layersWithOutsidePointerEventsDisabled.delete(a.value));
			});
		}), (e, t) => (H(), U(I(xv), {
			ref: I(i),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: ve({ pointerEvents: l.value ? u.value ? "auto" : "none" : void 0 }),
			onFocusCapture: I(f).onFocusCapture,
			onBlurCapture: I(f).onBlurCapture,
			onPointerdownCapture: I(d).onPointerDownCapture
		}, {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as-child",
			"as",
			"style",
			"onFocusCapture",
			"onBlurCapture",
			"onPointerdownCapture"
		]));
	}
}), Av = e_(() => /* @__PURE__ */ F([]));
function jv() {
	let e = Av();
	return {
		add(t) {
			let n = e.value[0];
			t !== n && n?.pause(), e.value = Mv(e.value, t), e.value.unshift(t);
		},
		remove(t) {
			e.value = Mv(e.value, t), e.value[0]?.resume();
		}
	};
}
function Mv(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var Nv = "focusScope.autoFocusOnMount", Pv = "focusScope.autoFocusOnUnmount", Fv = {
	bubbles: !1,
	cancelable: !0
};
function Iv(e, { select: t = !1 } = {}) {
	let n = Yg();
	for (let r of e) if (Hv(r, { select: t }), Yg() !== n) return !0;
}
function Lv(e) {
	let t = Rv(e);
	return [zv(t, e), zv(t.reverse(), e)];
}
function Rv(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function zv(e, t) {
	for (let n of e) if (!Bv(n, { upTo: t })) return n;
}
function Bv(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Vv(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Hv(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = Yg();
		e.focus({ preventScroll: !0 }), e !== n && Vv(e) && t && e.select();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var Uv = /* @__PURE__ */ B({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: !1,
			default: !1
		},
		trapped: {
			type: Boolean,
			required: !1,
			default: !1
		},
		present: {
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
		}
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(e, { emit: t }) {
		let n = e, r = t, { currentRef: i, currentElement: a } = U_(), o = /* @__PURE__ */ F(null), s = jv(), c = /*#__PURE__*/ Qt({
			paused: !1,
			pause() {
				this.paused = !0;
			},
			resume() {
				this.paused = !1;
			}
		});
		wr((e) => {
			if (!t_) return;
			let t = a.value;
			if (!n.trapped) return;
			function r(e) {
				if (c.paused || !t) return;
				let n = e.target;
				t.contains(n) ? o.value = n : Hv(o.value, { select: !0 });
			}
			function i(e) {
				if (c.paused || !t) return;
				let n = e.relatedTarget;
				n !== null && (t.contains(n) || Hv(o.value, { select: !0 }));
			}
			function s(e) {
				let n = o.value;
				n !== null && e.some((e) => e.removedNodes.length > 0) && (t.contains(n) || Hv(t));
			}
			document.addEventListener("focusin", r), document.addEventListener("focusout", i);
			let l = new MutationObserver(s);
			t && l.observe(t, {
				childList: !0,
				subtree: !0
			}), e(() => {
				document.removeEventListener("focusin", r), document.removeEventListener("focusout", i), l.disconnect();
			});
		});
		function l(e, t) {
			let n = new CustomEvent(Nv, Fv), i = (e) => r("mountAutoFocus", e);
			e.addEventListener(Nv, i), e.dispatchEvent(n), e.removeEventListener(Nv, i), n.defaultPrevented || (Iv(Rv(e), { select: !0 }), Yg() === t && Hv(e));
		}
		wr(async (e) => {
			let t = a.value;
			if (await $n(), !t) return;
			n.present !== !1 && s.add(c);
			let i = Yg();
			!t.contains(i) && n.present !== !1 && l(t, i), e(() => {
				let e = new CustomEvent(Pv, Fv), n = (e) => {
					r("unmountAutoFocus", e);
				};
				t.addEventListener(Pv, n), t.dispatchEvent(e), t.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
					e.defaultPrevented || Hv(i ?? document.body, { select: !0 }), t.removeEventListener(Pv, n), s.remove(c), t.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		}), z(() => n.present, async (e, t) => {
			if (!t_) return;
			if (e === !1 && t === !0) {
				s.remove(c);
				return;
			}
			if (e !== !0 || t !== !1) return;
			s.add(c), await $n();
			let n = a.value;
			if (!n) return;
			let r = Yg();
			n.contains(r) || l(n, r);
		});
		function u(e) {
			if (!n.loop && !n.trapped || c.paused) return;
			let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, r = Yg();
			if (t && r) {
				let t = e.currentTarget, [i, a] = Lv(t);
				i && a ? !e.shiftKey && r === a ? (e.preventDefault(), n.loop && Hv(i, { select: !0 })) : e.shiftKey && r === i && (e.preventDefault(), n.loop && Hv(a, { select: !0 })) : r === t && e.preventDefault();
			}
		}
		return (e, t) => (H(), U(I(xv), {
			ref_key: "currentRef",
			ref: i,
			tabindex: "-1",
			"as-child": e.asChild,
			as: e.as,
			onKeydown: u
		}, {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 8, ["as-child", "as"]));
	}
}), Wv = "menu.itemSelect", Gv = ["Enter", " "], Kv = [
	"ArrowDown",
	"PageUp",
	"Home"
], qv = [
	"ArrowUp",
	"PageDown",
	"End"
], Jv = [...Kv, ...qv];
[...Gv], [...Gv];
function Yv(e) {
	return e ? "open" : "closed";
}
function Xv(e) {
	let t = Yg();
	for (let n of e) if (n === t || (n.focus(), Yg() !== t)) return;
}
function Zv(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function Qv(e, t) {
	return t ? Zv({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function $v(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Teleport/Teleport.js
var ey = /* @__PURE__ */ B({
	__name: "Teleport",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e, n = O_({}), r = K(() => t.to ?? n.teleportTo?.value ?? "body"), i = __();
		return (e, t) => I(i) || e.forceMount ? (H(), U(Vr, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [V(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : Es("v-if", !0);
	}
}), ty = "data-reka-collection-item";
function ny(e = {}) {
	let { key: t = "", isProvider: n = !1 } = e, r = `${t}CollectionProvider`, i;
	n ? (i = {
		collectionRef: /* @__PURE__ */ F(),
		itemMap: /* @__PURE__ */ F(/* @__PURE__ */ new Map())
	}, yr(r, i)) : i = br(r);
	let a = (e = !1) => {
		let t = i.collectionRef.value;
		if (!t) return [];
		let n = Array.from(t.querySelectorAll(`[${ty}]`)), r = new Map(n.map((e, t) => [e, t])), a = Array.from(i.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
		return e ? a : a.filter((e) => e.ref.dataset.disabled !== "");
	}, o = /*#__PURE__*/ B({
		name: "CollectionSlot",
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: a } = Sv();
			return z(a, () => {
				i.collectionRef.value = a.value;
			}), () => nc(yv, {
				ref: r,
				...n
			}, t);
		}
	}), s = /*#__PURE__*/ B({
		name: "CollectionItem",
		inheritAttrs: !1,
		props: { value: { validator: () => !0 } },
		setup(e, { slots: t, attrs: n }) {
			let { primitiveElement: r, currentElement: a } = Sv();
			return wr((t) => {
				if (a.value) {
					let n = cn(a.value);
					i.itemMap.value.set(n, {
						ref: a.value,
						value: e.value
					}), t(() => i.itemMap.value.delete(n));
				}
			}), () => nc(yv, {
				...n,
				[ty]: "",
				ref: r
			}, t);
		}
	});
	return {
		getItems: a,
		reactiveItems: K(() => Array.from(i.itemMap.value.values())),
		itemMapSize: K(() => i.itemMap.value.size),
		CollectionSlot: o,
		CollectionItem: s
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var ry = /* @__PURE__ */ B({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		return (e, t) => (H(), U(I(xv), {
			as: e.as,
			"as-child": e.asChild,
			"aria-hidden": e.feature === "focusable" || e.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": e.feature === "fully-hidden" ? "" : void 0,
			tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), iy = "rovingFocusGroup.onEntryFocus", ay = {
	bubbles: !1,
	cancelable: !0
};
function oy(e, t = !1) {
	let n = Yg();
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), Yg() !== n)) return;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperRoot.js
var [sy, cy] = /*#__PURE__*/ Jg("PopperRoot"), ly = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "PopperRoot",
	setup(e) {
		let t = /* @__PURE__ */ F();
		return cy({
			anchor: t,
			onAnchorChange: (e) => t.value = e
		}), (e, t) => V(e.$slots, "default");
	}
}), uy = /* @__PURE__ */ B({
	__name: "PopperAnchor",
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
		let t = e, { forwardRef: n, currentElement: r } = U_(), i = sy();
		return Tr(() => {
			i.onAnchorChange(t.reference ?? r.value);
		}), (e, t) => (H(), U(I(xv), {
			ref: I(n),
			as: e.as,
			"as-child": e.asChild
		}, {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/utils.js
function dy(e) {
	return e !== null;
}
function fy(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = py(n), u = {
				start: e.dir === "rtl" ? "100%" : "0%",
				center: "50%",
				end: e.dir === "rtl" ? "0%" : "100%"
			}[l], d = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], f = (i.arrow?.x ?? 0) + o / 2, p = (i.arrow?.y ?? 0) + s / 2, m = "", h = "";
			return c === "bottom" ? (m = a ? u : `${f}px`, h = `${-s}px`) : c === "top" ? (m = a ? u : `${f}px`, h = `${r.floating.height + s}px`) : c === "right" ? (m = `${-s}px`, h = a ? d : `${p}px`) : c === "left" && (m = `${r.floating.width + s}px`, h = a ? d : `${p}px`), { data: {
				x: m,
				y: h
			} };
		}
	};
}
function py(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var my = [
	"top",
	"right",
	"bottom",
	"left"
], hy = Math.min, gy = Math.max, _y = Math.round, vy = Math.floor, yy = (e) => ({
	x: e,
	y: e
}), by = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function xy(e, t, n) {
	return gy(e, hy(t, n));
}
function Sy(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Cy(e) {
	return e.split("-")[0];
}
function wy(e) {
	return e.split("-")[1];
}
function Ty(e) {
	return e === "x" ? "y" : "x";
}
function Ey(e) {
	return e === "y" ? "height" : "width";
}
function Dy(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Oy(e) {
	return Ty(Dy(e));
}
function ky(e, t, n) {
	n === void 0 && (n = !1);
	let r = wy(e), i = Oy(e), a = Ey(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Ry(o)), [o, Ry(o)];
}
function Ay(e) {
	let t = Ry(e);
	return [
		jy(e),
		t,
		jy(t)
	];
}
function jy(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var My = ["left", "right"], Ny = ["right", "left"], Py = ["top", "bottom"], Fy = ["bottom", "top"];
function Iy(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Ny : My : t ? My : Ny;
		case "left":
		case "right": return t ? Py : Fy;
		default: return [];
	}
}
function Ly(e, t, n, r) {
	let i = wy(e), a = Iy(Cy(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(jy)))), a;
}
function Ry(e) {
	let t = Cy(e);
	return by[t] + e.slice(t.length);
}
function zy(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function By(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : zy(e);
}
function Vy(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Hy(e, t, n) {
	let { reference: r, floating: i } = e, a = Dy(t), o = Oy(t), s = Ey(o), c = Cy(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = wy(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Uy(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Sy(t, e), p = By(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Vy(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Vy(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Wy = 50, Gy = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Uy
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Hy(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Wy && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Hy(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Ky = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Sy(e, t) || {};
		if (l == null) return {};
		let d = By(u), f = {
			x: n,
			y: r
		}, p = Oy(i), m = Ey(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = hy(d[_], T), D = hy(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, ee = xy(E, k, O), te = !c.arrow && wy(i) != null && k !== ee && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, ne = te ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + ne,
			data: {
				[p]: ee,
				centerOffset: k - ee - ne,
				...te && { alignmentOffset: ne }
			},
			reset: te
		};
	}
}), qy = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Sy(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Cy(r), _ = Dy(o), v = Cy(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Ry(o)] : Ay(o)), x = p !== "none";
			!d && x && b.push(...Ly(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ky(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Dy(t) || T.every((e) => Dy(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Dy(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Jy(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Yy(e) {
	return my.some((t) => e[t] >= 0);
}
var Xy = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Sy(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Jy(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Yy(e)
					} };
				}
				case "escaped": {
					let e = Jy(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Yy(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Zy = /*#__PURE__*/ new Set(["left", "top"]);
async function Qy(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Cy(n), s = wy(n), c = Dy(n) === "y", l = Zy.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Sy(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var $y = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Qy(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, eb = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Sy(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Dy(i), p = Ty(f), m = u[p], h = u[f], g = (e, t) => xy(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, tb = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Sy(e, t), u = {
				x: n,
				y: r
			}, d = Dy(i), f = Ty(d), p = u[f], m = u[d], h = Sy(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Zy.has(Cy(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, nb = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Sy(e, t), c = await i.detectOverflow(t, s), l = Cy(n), u = wy(n), d = Dy(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = hy(p - c[m], g), y = hy(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * gy(c.left, c.right) : S = p - 2 * gy(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function rb() {
	return typeof window < "u";
}
function ib(e) {
	return sb(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ab(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ob(e) {
	return ((sb(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function sb(e) {
	return rb() ? e instanceof Node || e instanceof ab(e).Node : !1;
}
function cb(e) {
	return rb() ? e instanceof Element || e instanceof ab(e).Element : !1;
}
function lb(e) {
	return rb() ? e instanceof HTMLElement || e instanceof ab(e).HTMLElement : !1;
}
function ub(e) {
	return !rb() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ab(e).ShadowRoot;
}
function db(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Sb(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function fb(e) {
	return /^(table|td|th)$/.test(ib(e));
}
function pb(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var mb = /transform|translate|scale|rotate|perspective|filter/, hb = /paint|layout|strict|content/, gb = (e) => !!e && e !== "none", _b;
function vb(e) {
	let t = cb(e) ? Sb(e) : e;
	return gb(t.transform) || gb(t.translate) || gb(t.scale) || gb(t.rotate) || gb(t.perspective) || !bb() && (gb(t.backdropFilter) || gb(t.filter)) || mb.test(t.willChange || "") || hb.test(t.contain || "");
}
function yb(e) {
	let t = wb(e);
	for (; lb(t) && !xb(t);) {
		if (vb(t)) return t;
		if (pb(t)) return null;
		t = wb(t);
	}
	return null;
}
function bb() {
	return _b ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), _b;
}
function xb(e) {
	return /^(html|body|#document)$/.test(ib(e));
}
function Sb(e) {
	return ab(e).getComputedStyle(e);
}
function Cb(e) {
	return cb(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function wb(e) {
	if (ib(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || ub(e) && e.host || ob(e);
	return ub(t) ? t.host : t;
}
function Tb(e) {
	let t = wb(e);
	return xb(t) ? (e.ownerDocument || e).body : lb(t) && db(t) ? t : Tb(t);
}
function Eb(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Tb(e), i = r === e.ownerDocument?.body, a = ab(r);
	if (i) {
		let e = Db(a);
		return t.concat(a, a.visualViewport || [], db(r) ? r : [], e && n ? Eb(e) : []);
	}
	return t.concat(r, Eb(r, [], n));
}
function Db(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ob(e) {
	let t = Sb(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = lb(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = _y(n) !== a || _y(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function kb(e) {
	return cb(e) ? e : e.contextElement;
}
function Ab(e) {
	let t = kb(e);
	if (!lb(t)) return yy(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ob(t), o = (a ? _y(n.width) : n.width) / r, s = (a ? _y(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var jb = /*#__PURE__*/ yy(0);
function Mb(e) {
	let t = ab(e);
	return !bb() || !t.visualViewport ? jb : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Nb(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === ab(e);
}
function Pb(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = kb(e), o = yy(1);
	t && (r ? cb(r) && (o = Ab(r)) : o = Ab(e));
	let s = Nb(a, n, r) ? Mb(a) : yy(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = ab(a), t = cb(r) ? ab(r) : r, n = e, i = Db(n);
		for (; i && t !== n;) {
			let e = Ab(i), t = i.getBoundingClientRect(), r = Sb(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = ab(i), i = Db(n);
		}
	}
	return Vy({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Fb(e, t) {
	let n = Cb(e).scrollLeft;
	return t ? t.left + n : Pb(ob(e)).left + n;
}
function Ib(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Fb(e, n),
		y: n.top + t.scrollTop
	};
}
function Lb(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = ob(r), s = t ? pb(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = yy(1), u = yy(0), d = lb(r);
	if ((d || !a) && ((ib(r) !== "body" || db(o)) && (c = Cb(r)), d)) {
		let e = Pb(r);
		l = Ab(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ib(o, c) : yy(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Rb(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function zb(e) {
	let t = Cb(e), n = e.ownerDocument.body, r = gy(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = gy(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Fb(e), o = -t.scrollTop;
	return Sb(n).direction === "rtl" && (a += gy(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Bb = 25;
function Vb(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = ab(e), a = ob(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !bb() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Fb(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Bb && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Hb(e, t) {
	let n = Pb(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ab(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Ub(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Vb(e, n, t);
	else if (t === "document") r = zb(ob(e));
	else if (cb(t)) r = Hb(t, n);
	else {
		let n = Mb(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Vy(r);
}
function Wb(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Eb(e, [], !1).filter((e) => cb(e) && ib(e) !== "body"), i = null, a = Sb(e).position === "fixed", o = a ? wb(e) : e;
	for (; cb(o) && !xb(o);) {
		let e = Sb(o), t = vb(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = wb(o);
	}
	return t.set(e, r), r;
}
function Gb(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? pb(t) ? [] : Wb(t, this._c) : [].concat(n), r], o = Ub(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Ub(t, a[e], i);
		s = gy(n.top, s), c = hy(n.right, c), l = hy(n.bottom, l), u = gy(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Kb(e) {
	let { width: t, height: n } = Ob(e);
	return {
		width: t,
		height: n
	};
}
function qb(e, t, n) {
	let r = lb(t), i = ob(t), a = n === "fixed", o = Pb(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = yy(0);
	if ((r || !a) && ((ib(t) !== "body" || db(i)) && (s = Cb(t)), r)) {
		let e = Pb(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Fb(i));
	let l = i && !r && !a ? Ib(i, s) : yy(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Jb(e) {
	return Sb(e).position === "static";
}
function Yb(e, t) {
	if (!lb(e) || Sb(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return ob(e) === n && (n = n.ownerDocument.body), n;
}
function Xb(e, t) {
	let n = ab(e);
	if (pb(e)) return n;
	if (!lb(e)) {
		let t = wb(e);
		for (; t && !xb(t);) {
			if (cb(t) && !Jb(t)) return t;
			t = wb(t);
		}
		return n;
	}
	let r = Yb(e, t);
	for (; r && fb(r) && Jb(r);) r = Yb(r, t);
	return r && xb(r) && Jb(r) && !vb(r) ? n : r || yb(e) || n;
}
var Zb = async function(e) {
	let t = this.getOffsetParent || Xb, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: qb(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Qb(e) {
	return Sb(e).direction === "rtl";
}
var $b = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Lb,
	getDocumentElement: ob,
	getClippingRect: Gb,
	getOffsetParent: Xb,
	getElementRects: Zb,
	getClientRects: Rb,
	getDimensions: Kb,
	getScale: Ab,
	isElement: cb,
	isRTL: Qb
};
function ex(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function tx(e, t, n) {
	let r = null, i, a = ob(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = vy(d), h = vy(a.clientWidth - (u + f)), g = vy(a.clientHeight - (d + p)), _ = vy(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: gy(0, hy(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ex(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = ab(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function nx(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = kb(e), u = i || a ? [...l ? Eb(l) : [], ...t ? Eb(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? tx(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Pb(e) : null;
	c && g();
	function g() {
		let t = Pb(e);
		h && !ex(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var rx = $y, ix = eb, ax = qy, ox = nb, sx = Xy, cx = Ky, lx = tb, ux = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...$b,
		...i.platform,
		_c: r
	};
	return Gy(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.40_typescript@6.0.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function dx(e) {
	return typeof e == "object" && !!e && "$el" in e;
}
function fx(e) {
	if (dx(e)) {
		let t = e.$el;
		return sb(t) && ib(t) === "#comment" ? null : t;
	}
	return e;
}
function px(e) {
	return typeof e == "function" ? e() : I(e);
}
function mx(e) {
	return {
		name: "arrow",
		options: e,
		fn(t) {
			let n = fx(px(e.element));
			return n == null ? {} : cx({
				element: n,
				padding: e.padding
			}).fn(t);
		}
	};
}
function hx(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function gx(e, t) {
	let n = hx(e);
	return Math.round(t * n) / n;
}
function _x(e, t, n) {
	n === void 0 && (n = {});
	let r = n.whileElementsMounted, i = K(() => px(n.open) ?? !0), a = K(() => px(n.middleware)), o = K(() => px(n.placement) ?? "bottom"), s = K(() => px(n.strategy) ?? "absolute"), c = K(() => px(n.transform) ?? !0), l = K(() => fx(e.value)), u = K(() => fx(t.value)), d = /* @__PURE__ */ F(0), f = /* @__PURE__ */ F(0), p = /* @__PURE__ */ F(s.value), m = /* @__PURE__ */ F(o.value), h = /* @__PURE__ */ fn({}), g = /* @__PURE__ */ F(!1), _ = K(() => {
		let e = {
			position: p.value,
			left: "0",
			top: "0"
		};
		if (!u.value) return e;
		let t = gx(u.value, d.value), n = gx(u.value, f.value);
		return c.value ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...hx(u.value) >= 1.5 && { willChange: "transform" }
		} : {
			position: p.value,
			left: t + "px",
			top: n + "px"
		};
	}), v;
	function y() {
		if (l.value == null || u.value == null) return;
		let e = i.value;
		ux(l.value, u.value, {
			middleware: a.value,
			placement: o.value,
			strategy: s.value
		}).then((t) => {
			d.value = t.x, f.value = t.y, p.value = t.strategy, m.value = t.placement, h.value = t.middlewareData, g.value = e !== !1;
		});
	}
	function b() {
		typeof v == "function" && (v(), v = void 0);
	}
	function x() {
		if (b(), r === void 0) {
			y();
			return;
		}
		if (l.value != null && u.value != null) {
			v = r(l.value, u.value, y);
			return;
		}
	}
	function S() {
		i.value || (g.value = !1);
	}
	return z([
		a,
		o,
		s,
		i
	], y, { flush: "sync" }), z([l, u], x, { flush: "sync" }), z(i, S, { flush: "sync" }), Le() && Re(b), {
		x: /* @__PURE__ */ tn(d),
		y: /* @__PURE__ */ tn(f),
		strategy: /* @__PURE__ */ tn(p),
		placement: /* @__PURE__ */ tn(m),
		middlewareData: /* @__PURE__ */ tn(h),
		isPositioned: /* @__PURE__ */ tn(g),
		floatingStyles: _,
		update: y
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperContent.js
var vx = ["dir"], yx = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: !0,
	align: "center",
	alignOffset: 0,
	alignFlip: !0,
	arrowPadding: 0,
	hideShiftedArrow: !0,
	avoidCollisions: !0,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: !1,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: !1
}, [bx, xx] = /*#__PURE__*/ Jg("PopperContent"), Sx = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "PopperContent",
	props: /* @__PURE__ */ Ma({
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
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
	}, { ...yx }),
	emits: ["placed"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = sy(), { forwardRef: a, currentElement: o } = U_(), s = R_(K(() => n.dir)), c = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), { width: u, height: d } = dv(l), f = K(() => n.side + (n.align === "center" ? "" : `-${n.align}`)), p = K(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...n.collisionPadding
		}), m = K(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), h = K(() => ({
			padding: p.value,
			boundary: m.value.filter(dy),
			altBoundary: m.value.length > 0
		})), g = K(() => ({
			mainAxis: n.sideFlip,
			crossAxis: n.alignFlip
		})), _ = K(() => [
			rx({
				mainAxis: n.sideOffset + d.value,
				alignmentAxis: n.alignOffset
			}),
			n.prioritizePosition && n.avoidCollisions && ax({
				...h.value,
				...g.value
			}),
			n.avoidCollisions && ix({
				mainAxis: !0,
				crossAxis: !!n.prioritizePosition,
				limiter: n.sticky === "partial" ? lx() : void 0,
				...h.value
			}),
			!n.prioritizePosition && n.avoidCollisions && ax({
				...h.value,
				...g.value
			}),
			ox({
				...h.value,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--reka-popper-available-width", `${n}px`), o.setProperty("--reka-popper-available-height", `${r}px`), o.setProperty("--reka-popper-anchor-width", `${i}px`), o.setProperty("--reka-popper-anchor-height", `${a}px`);
				}
			}),
			l.value && mx({
				element: l.value,
				padding: n.arrowPadding
			}),
			fy({
				arrowWidth: u.value,
				arrowHeight: d.value,
				dir: s.value
			}),
			n.hideWhenDetached && sx({
				strategy: "referenceHidden",
				...h.value
			})
		]), { floatingStyles: v, placement: y, isPositioned: b, middlewareData: x, update: S } = _x(K(() => n.reference ?? i.anchor.value), c, {
			strategy: n.positionStrategy,
			placement: f,
			whileElementsMounted: (...e) => nx(...e, {
				layoutShift: !n.disableUpdateOnLayoutShift,
				animationFrame: n.updatePositionStrategy === "always"
			}),
			middleware: _
		}), C = K(() => py(y.value)[0]), w = K(() => py(y.value)[1]);
		Tr(() => {
			b.value && r("placed");
		});
		let T = K(() => {
			let e = x.value.arrow?.centerOffset !== 0;
			return n.hideShiftedArrow && e;
		}), E = /* @__PURE__ */ F("");
		return wr(() => {
			o.value && (E.value = window.getComputedStyle(o.value).zIndex);
		}), xx({
			placedSide: C,
			onArrowChange: (e) => l.value = e,
			arrowX: K(() => x.value.arrow?.x ?? 0),
			arrowY: K(() => x.value.arrow?.y ?? 0),
			shouldHideArrow: T
		}), (e, t) => (H(), hs("div", {
			ref_key: "floatingRef",
			ref: c,
			"data-reka-popper-content-wrapper": "",
			dir: I(s),
			style: ve({
				...I(v),
				transform: I(b) ? I(v).transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: E.value,
				"--reka-popper-transform-origin": [I(x).transformOrigin?.x, I(x).transformOrigin?.y].join(" "),
				...I(x).hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			})
		}, [n.memoDependencies ? ic([
			n.asChild,
			n.as,
			C.value,
			w.value,
			I(b),
			...Object.values(e.$attrs),
			...n.memoDependencies
		], () => (H(), U(I(xv), As({
			key: 0,
			ref: I(a)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": C.value,
			"data-align": w.value,
			style: { animation: I(b) ? void 0 : "none" }
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"style"
		])), t, 0) : (H(), U(I(xv), As({
			key: 1,
			ref: I(a)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": C.value,
			"data-align": w.value,
			dir: I(s),
			style: { animation: I(b) ? void 0 : "none" }
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"dir",
			"style"
		]))], 12, vx));
	}
}), [Cx, wx] = /*#__PURE__*/ Jg("RovingFocusGroup"), Tx = /* @__PURE__ */ B({
	__name: "RovingFocusGroup",
	props: {
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
			default: !1
		},
		currentTabStopId: {
			type: [String, null],
			required: !1
		},
		defaultCurrentTabStopId: {
			type: String,
			required: !1
		},
		preventScrollOnEntryFocus: {
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
			required: !1
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, { loop: a, orientation: o, dir: s } = /* @__PURE__ */ bn(r), c = R_(s), l = C_(r, "currentTabStopId", i, {
			defaultValue: r.defaultCurrentTabStopId,
			passive: r.currentTabStopId === void 0
		}), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(0), { getItems: p, CollectionSlot: m } = ny({ isProvider: !0 });
		function h(e) {
			let t = !d.value;
			if (e.currentTarget && e.target === e.currentTarget && t && !u.value) {
				let t = new CustomEvent(iy, ay);
				if (e.currentTarget.dispatchEvent(t), i("entryFocus", t), !t.defaultPrevented) {
					let e = p().map((e) => e.ref).filter((e) => e.dataset.disabled !== "");
					oy([
						e.find((e) => e.getAttribute("data-active") === ""),
						e.find((e) => e.getAttribute("data-highlighted") === ""),
						e.find((e) => e.id === l.value),
						...e
					].filter(Boolean), r.preventScrollOnEntryFocus);
				}
			}
			d.value = !1;
		}
		function g() {
			setTimeout(() => {
				d.value = !1;
			}, 1);
		}
		return t({ getItems: p }), wx({
			loop: a,
			dir: c,
			orientation: o,
			currentTabStopId: l,
			onItemFocus: (e) => {
				l.value = e;
			},
			onItemShiftTab: () => {
				u.value = !0;
			},
			onFocusableItemAdd: () => {
				f.value++;
			},
			onFocusableItemRemove: () => {
				f.value--;
			}
		}), (e, t) => (H(), U(I(m), null, {
			default: R(() => [G(I(xv), {
				tabindex: u.value || f.value === 0 ? -1 : 0,
				"data-orientation": I(o),
				as: e.as,
				"as-child": e.asChild,
				dir: I(c),
				style: { outline: "none" },
				onMousedown: t[0] ||= (e) => d.value = !0,
				onMouseup: g,
				onFocus: h,
				onBlur: t[1] ||= (e) => u.value = !1
			}, {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 8, [
				"tabindex",
				"data-orientation",
				"as",
				"as-child",
				"dir"
			])]),
			_: 3
		}));
	}
}), Ex = /* @__PURE__ */ B({
	__name: "MenuAnchor",
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
		let t = e;
		return (e, n) => (H(), U(I(uy), Ce(Ss(t)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function Dx() {
	let e = /* @__PURE__ */ F(!1);
	return Yi(() => {
		g_("keydown", () => {
			e.value = !0;
		}, {
			capture: !0,
			passive: !0
		}), g_(["pointerdown", "pointermove"], () => {
			e.value = !1;
		}, {
			capture: !0,
			passive: !0
		});
	}), e;
}
var Ox = l_(Dx), [kx, Ax] = /*#__PURE__*/ Jg(["MenuRoot", "MenuSub"], "MenuContext"), [jx, Mx] = /*#__PURE__*/ Jg("MenuRoot"), Nx = /* @__PURE__ */ B({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: !1
		},
		dir: {
			type: String,
			required: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { modal: i, dir: a } = /* @__PURE__ */ bn(n), o = R_(a), s = C_(n, "open", r), c = /* @__PURE__ */ F(), l = Ox();
		return Ax({
			open: s,
			onOpenChange: (e) => {
				s.value = e;
			},
			content: c,
			onContentChange: (e) => {
				c.value = e;
			}
		}), Mx({
			onClose: () => {
				s.value = !1;
			},
			isUsingKeyboardRef: l,
			dir: o,
			modal: i
		}), (e, t) => (H(), U(I(ly), null, {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Px, Fx] = /*#__PURE__*/ Jg("MenuContent"), Ix = /* @__PURE__ */ B({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ Ma({
		loop: {
			type: Boolean,
			required: !1
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1
		},
		disableOutsideScroll: {
			type: Boolean,
			required: !1
		},
		trapFocus: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
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
	}, { ...yx }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = kx(), a = jx(), { trapFocus: o, disableOutsidePointerEvents: s, loop: c } = /* @__PURE__ */ bn(n);
		V_(), F_(s.value);
		let l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(0), d = /* @__PURE__ */ F(0), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F("right"), m = /* @__PURE__ */ F(0), h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(), { forwardRef: _, currentElement: v } = U_(), { handleTypeaheadSearch: y } = pv(), b = /* @__PURE__ */ F();
		function x(e) {
			let t = E_(e, b.value || Yg(), v.value, {
				loop: c.value,
				arrowKeyOptions: "vertical",
				dir: a?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (b.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function S() {
			b.value && b.value.click();
		}
		let C = /* @__PURE__ */ F(), w = /* @__PURE__ */ F();
		z(b, (e) => {
			if (w.value && (e === void 0 || e !== w.value.trigger.value)) {
				if (e === void 0) return;
				w.value.onOpenChange(!1), w.value = void 0;
			}
		}), z(v, (e) => {
			i.onContentChange(e);
		}), $i(() => {
			window.clearTimeout(u.value);
		});
		function T(e) {
			return p.value === f.value?.side && Qv(e, f.value?.area);
		}
		async function E(e) {
			r("openAutoFocus", e), !e.defaultPrevented && (e.preventDefault(), v.value?.focus({ preventScroll: !0 }));
		}
		function D(e) {
			if (e.defaultPrevented) return;
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, o = e.key.length === 1, s = E_(e, Yg(), v.value, {
				loop: c.value,
				arrowKeyOptions: "vertical",
				dir: a?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (s) return s?.focus();
			if (e.code === "Space") return;
			let l = g.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && a.modal.value && e.preventDefault(), !i && o && !r && y(e.key, l)), e.target !== v.value || !Jv.includes(e.key)) return;
			e.preventDefault();
			let u = [...l.map((e) => e.ref)];
			qv.includes(e.key) && u.reverse(), Xv(u);
		}
		function O(e) {
			e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(u.value), l.value = "");
		}
		function k(e) {
			if (!$v(e)) return;
			let t = e.target, n = m.value !== e.clientX;
			if ((e?.currentTarget)?.contains(t) && n) {
				let t = e.clientX > m.value ? "right" : "left";
				p.value = t, m.value = e.clientX;
			}
		}
		function ee(e) {
			$v(e) && C.value && C.value.focus();
		}
		return Fx({
			onItemEnter: (e) => !!T(e),
			onItemLeave: (e) => T(e) ? !0 : (["INPUT", "TEXTAREA"].includes(Yg()?.tagName || "") || v.value?.focus(), h.value = null, !1),
			onTriggerLeave: (e) => !!T(e),
			searchRef: l,
			highlightedElement: b,
			onKeydownNavigation: x,
			onKeydownEnter: S,
			filterElement: C,
			onFilterElementChange: (e) => {
				C.value = e;
			},
			activeSubmenuContext: w,
			pointerGraceTimerRef: d,
			onPointerGraceIntentChange: (e) => {
				f.value = e;
			}
		}), (e, t) => (H(), U(I(Uv), {
			"as-child": "",
			trapped: I(o),
			onMountAutoFocus: E,
			onUnmountAutoFocus: t[7] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: R(() => [G(I(kv), {
				"as-child": "",
				"disable-outside-pointer-events": I(s),
				onEscapeKeyDown: t[2] ||= (e) => r("escapeKeyDown", e),
				onPointerDownOutside: t[3] ||= (e) => r("pointerDownOutside", e),
				onFocusOutside: t[4] ||= (e) => r("focusOutside", e),
				onInteractOutside: t[5] ||= (e) => r("interactOutside", e),
				onDismiss: t[6] ||= (e) => r("dismiss")
			}, {
				default: R(() => [G(I(Tx), {
					ref_key: "rovingFocusGroupRef",
					ref: g,
					"current-tab-stop-id": h.value,
					"onUpdate:currentTabStopId": t[0] ||= (e) => h.value = e,
					"as-child": "",
					orientation: "vertical",
					dir: I(a).dir.value,
					loop: I(c),
					onEntryFocus: t[1] ||= (e) => {
						r("entryFocus", e), I(a).isUsingKeyboardRef.value || e.preventDefault();
					}
				}, {
					default: R(() => [G(I(Sx), {
						ref: I(_),
						role: "menu",
						as: e.as,
						"as-child": e.asChild,
						"aria-orientation": "vertical",
						"data-reka-menu-content": "",
						"data-state": I(Yv)(I(i).open.value),
						dir: I(a).dir.value,
						side: e.side,
						"side-offset": e.sideOffset,
						align: e.align,
						"align-offset": e.alignOffset,
						"avoid-collisions": e.avoidCollisions,
						"collision-boundary": e.collisionBoundary,
						"collision-padding": e.collisionPadding,
						"arrow-padding": e.arrowPadding,
						"prioritize-position": e.prioritizePosition,
						"position-strategy": e.positionStrategy,
						"update-position-strategy": e.updatePositionStrategy,
						sticky: e.sticky,
						"hide-when-detached": e.hideWhenDetached,
						reference: e.reference,
						onKeydown: D,
						onBlur: O,
						onPointermove: k,
						onPointerenter: ee
					}, {
						default: R(() => [V(e.$slots, "default")]),
						_: 3
					}, 8, [
						"as",
						"as-child",
						"data-state",
						"dir",
						"side",
						"side-offset",
						"align",
						"align-offset",
						"avoid-collisions",
						"collision-boundary",
						"collision-padding",
						"arrow-padding",
						"prioritize-position",
						"position-strategy",
						"update-position-strategy",
						"sticky",
						"hide-when-detached",
						"reference"
					])]),
					_: 3
				}, 8, [
					"current-tab-stop-id",
					"dir",
					"loop"
				])]),
				_: 3
			}, 8, ["disable-outside-pointer-events"])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), Lx = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
			type: String,
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
		let t = e, n = Px(), { forwardRef: r, currentElement: i } = U_(), { CollectionItem: a } = ny(), o = /* @__PURE__ */ F(!1), s = K(() => o.value || i.value != null && n.highlightedElement.value === i.value);
		async function c(e) {
			if (!(e.defaultPrevented || !$v(e))) {
				if (t.disabled) n.onItemLeave(e);
				else if (!n.onItemEnter(e)) {
					let t = e.currentTarget;
					n.highlightedElement.value = t, ["INPUT", "TEXTAREA"].includes(Yg()?.tagName || "") || t.focus({ preventScroll: !0 });
				}
			}
		}
		async function l(e) {
			await $n(), !e.defaultPrevented && $v(e) && n.highlightedElement.value === i.value && !n.onItemLeave(e) && n.highlightedElement.value === i.value && (n.highlightedElement.value = void 0);
		}
		return (e, t) => (H(), U(I(a), { value: { textValue: e.textValue } }, {
			default: R(() => [G(I(xv), As({
				ref: I(r),
				role: "menuitem",
				tabindex: "-1"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"aria-disabled": e.disabled || void 0,
				"data-disabled": e.disabled ? "" : void 0,
				"data-highlighted": s.value ? "" : void 0,
				onPointermove: c,
				onPointerleave: l,
				onFocus: t[0] ||= async (t) => {
					await $n(), !(t.defaultPrevented || e.disabled) && (o.value = !0, I(n).highlightedElement.value = t.currentTarget);
				},
				onBlur: t[1] ||= async (e) => {
					await $n(), !e.defaultPrevented && (o.value = !1);
				}
			}), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"aria-disabled",
				"data-disabled",
				"data-highlighted"
			])]),
			_: 3
		}, 8, ["value"]));
	}
}), Rx = /* @__PURE__ */ B({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: a } = U_(), o = jx(), s = Px(), c = /* @__PURE__ */ F(!1);
		async function l() {
			let e = a.value;
			if (!n.disabled && e) {
				let e = new CustomEvent(Wv, {
					bubbles: !0,
					cancelable: !0
				});
				r("select", e), await $n(), e.defaultPrevented ? c.value = !1 : o.onClose();
			}
		}
		return (e, t) => (H(), U(Lx, As(n, {
			ref: I(i),
			onClick: l,
			onPointerdown: t[0] ||= () => {
				c.value = !0;
			},
			onPointerup: t[1] ||= async (e) => {
				await $n(), !e.defaultPrevented && (c.value || e.currentTarget?.click());
			},
			onKeydown: t[2] ||= async (t) => {
				let n = I(s).searchRef.value !== "";
				e.disabled || n && t.key === " " || I(Gv).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
			}
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), zx = /* @__PURE__ */ B({
	__name: "MenuRootContentModal",
	props: {
		loop: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = G_(n, r), a = kx(), { forwardRef: o, currentElement: s } = U_();
		return cv(s), (e, t) => (H(), U(Ix, As(I(i), {
			ref: I(o),
			"trap-focus": I(a).open.value,
			"disable-outside-pointer-events": I(a).open.value,
			"disable-outside-scroll": !0,
			onDismiss: t[0] ||= (e) => I(a).onOpenChange(!1),
			onFocusOutside: t[1] ||= au((e) => r("focusOutside", e), ["prevent"])
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus", "disable-outside-pointer-events"]));
	}
}), Bx = /* @__PURE__ */ B({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = G_(e, t), r = kx();
		return (e, t) => (H(), U(Ix, As(I(n), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: t[0] ||= (e) => I(r).onOpenChange(!1)
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Vx = /* @__PURE__ */ B({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		loop: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = G_(e, t), r = kx(), i = jx();
		return (e, t) => (H(), U(I(vv), { present: e.forceMount || I(r).open.value }, {
			default: R(() => [I(i).modal.value ? (H(), U(zx, Ce(As({ key: 0 }, {
				...e.$attrs,
				...I(n)
			})), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16)) : (H(), U(Bx, Ce(As({ key: 1 }, {
				...e.$attrs,
				...I(n)
			})), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Hx = /* @__PURE__ */ B({
	__name: "MenuPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (H(), U(I(ey), Ce(Ss(t)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Ux, Wx] = /*#__PURE__*/ Jg("DrawerProvider"), Gx = {
	swipeMovementX: "--drawer-swipe-movement-x",
	swipeMovementY: "--drawer-swipe-movement-y",
	snapPointOffset: "--drawer-snap-point-offset",
	height: "--drawer-height",
	frontmostHeight: "--drawer-frontmost-height",
	swipeProgress: "--drawer-swipe-progress",
	swipeStrength: "--drawer-swipe-strength",
	nestedDrawers: "--nested-drawers"
};
function Kx() {
	let e = 0, t = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => e,
		subscribe(e) {
			return t.add(e), () => t.delete(e);
		},
		set(n) {
			n !== e && (e = n, t.forEach((e) => e()));
		}
	};
}
function qx(e, t, n) {
	switch (e) {
		case "up": return -n;
		case "down": return n;
		case "left": return -t;
		case "right": return t;
		default: return 0;
	}
}
var Jx = .2, Yx = 4, Xx = 80, Zx = 360, Qx = .1, $x = 1;
function eS(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function tS(e) {
	let { direction: t, size: n, axisDelta: r, snapPointOffset: i, releaseVelocity: a } = e;
	if (!Number.isFinite(n) || n <= 0) return null;
	let o = 0;
	t === "down" || t === "right" ? o = i : (t === "up" || t === "left") && (o = -i);
	let s = o + r, c = t === "left" || t === "up" ? -s : s, l = Math.max(0, n - c);
	if (!Number.isFinite(l) || l <= 0) return null;
	let u = t === "left" || t === "up" ? -a : a;
	if (!Number.isFinite(u) || u <= Jx) return null;
	let d = eS(l / eS(u, Jx, Yx), Xx, Zx);
	if (!Number.isFinite(d)) return null;
	let f = eS(Qx + (d - Xx) / 280 * .9, Qx, $x);
	return !Number.isFinite(f) || f <= 0 ? null : f;
}
var nS = /matrix(?:3d)?\(([^)]+)\)/;
function rS(e) {
	let t = window.getComputedStyle(e).transform, n = 0, r = 0, i = 1;
	if (t && t !== "none") {
		let e = t.match(nS);
		if (e) {
			let t = e[1].split(", ").map(Number);
			t.length === 6 ? (n = t[4], r = t[5], i = Math.sqrt(t[0] * t[0] + t[1] * t[1])) : t.length === 16 && (n = t[12], r = t[13], i = t[0]);
		}
	}
	return {
		x: n,
		y: r,
		scale: i
	};
}
var iS = !1;
function aS() {
	if (iS || typeof CSS > "u" || !CSS.registerProperty) return;
	let e = [
		Gx.swipeMovementX,
		Gx.swipeMovementY,
		Gx.snapPointOffset
	];
	for (let t of e) try {
		CSS.registerProperty({
			name: t,
			syntax: "<length>",
			inherits: !1,
			initialValue: "0px"
		});
	} catch {}
	let t = [{
		name: Gx.swipeProgress,
		initialValue: "0"
	}, {
		name: Gx.swipeStrength,
		initialValue: "1"
	}];
	for (let { name: e, initialValue: n } of t) try {
		CSS.registerProperty({
			name: e,
			syntax: "<number>",
			inherits: !1,
			initialValue: n
		});
	} catch {}
	iS = !0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerRoot.js
var [oS, sS] = /*#__PURE__*/ Jg("DrawerRoot"), cS = /* @__PURE__ */ B({
	__name: "DrawerRoot",
	props: {
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		modal: {
			type: [Boolean, String],
			required: !1,
			default: !0
		},
		swipeDirection: {
			type: String,
			required: !1,
			default: "down"
		},
		snapPoints: {
			type: Array,
			required: !1,
			default: void 0
		},
		snapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: !1,
			default: void 0
		},
		defaultSnapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: !1,
			default: void 0
		},
		snapToSequentialPoints: {
			type: Boolean,
			required: !1,
			default: !1
		}
	},
	emits: [
		"update:open",
		"update:openComplete",
		"update:snapPoint"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ F(n.defaultOpen), a = K({
			get: () => n.open ?? i.value,
			set: (e) => {
				i.value = e;
			}
		}), o = C_(n, "snapPoint", r, {
			defaultValue: n.defaultSnapPoint ?? null,
			passive: n.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: s, swipeDirection: c, snapPoints: l, snapToSequentialPoints: u } = /* @__PURE__ */ bn(n), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(0), m = /* @__PURE__ */ F(0), h = /* @__PURE__ */ F(!1), g = /* @__PURE__ */ F(0), _ = /* @__PURE__ */ F(!1), v = /* @__PURE__ */ F(!1), y = Kx(), b = oS(null), x = Ux(null), S = uv(void 0, "reka-drawer-content"), C = uv(void 0, "reka-drawer-title"), w = uv(void 0, "reka-drawer-description");
		sS({
			open: a,
			modal: s,
			swipeDirection: c,
			snapPoints: l,
			activeSnapPoint: o,
			snapToSequentialPoints: u,
			popupHeight: p,
			frontmostHeight: m,
			hasNestedDrawer: h,
			nestedOpenDrawerCount: g,
			nestedSwiping: _,
			isSwiping: v,
			nestedSwipeProgressStore: y,
			onOpenChange(e, t) {
				if (a.value === e) return;
				let n = t ? { reason: t } : void 0;
				i.value = e, r("update:open", e, n);
			},
			notifyOpenComplete(e) {
				r("update:openComplete", e);
			},
			setActiveSnapPoint(e) {
				o.value = e;
			},
			onPopupHeightChange(e) {
				p.value = e, x?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				m.value = e;
			},
			onNestedDrawerPresenceChange(e) {
				e ? g.value++ : g.value = Math.max(0, g.value - 1), h.value = g.value > 0, b?.notifyParentHasNestedDrawer?.(e);
			},
			onNestedSwipingChange(e) {
				_.value = e, b?.notifyParentSwipingChange?.(e);
			},
			onNestedSwipeProgressChange(e) {
				y.set(e), b?.notifyParentSwipeProgressChange?.(e), x?.visualStateStore.set({ swipeProgress: e });
			},
			onSwipingChange(e) {
				v.value = e;
			},
			notifyParentFrontmostHeight: b?.onNestedFrontmostHeightChange,
			notifyParentSwipingChange: b?.onNestedSwipingChange,
			notifyParentSwipeProgressChange: b?.onNestedSwipeProgressChange,
			notifyParentHasNestedDrawer: b?.onNestedDrawerPresenceChange,
			triggerElement: d,
			contentElement: f,
			contentId: S,
			titleId: C,
			descriptionId: w
		});
		function T() {
			a.value && (i.value = !1, r("update:open", !1, { reason: "close-press" }));
		}
		return z(a, (e) => {
			e ? x?.setDrawerOpen(S, !0) : x?.setDrawerOpen(S, !1);
		}, { immediate: !0 }), $i(() => {
			x?.removeDrawer(S);
		}), (e, t) => V(e.$slots, "default", {
			open: a.value,
			close: T
		});
	}
}), lS = .5, uS = 300, dS = 4, fS = .5;
function pS(e, t, n) {
	let r = null;
	return typeof e == "number" ? r = e >= 0 && e <= 1 ? e * t : e : e.endsWith("rem") ? r = Number.parseFloat(e) * n : e.endsWith("px") && (r = Number.parseFloat(e)), r == null || !Number.isFinite(r) || r < 0 ? null : Math.round(r);
}
function mS(e) {
	let { snapPoints: t, activeSnapPoint: n, popupHeight: r, viewportRef: i, onSnapPointChange: a } = e, o = /* @__PURE__ */ F(typeof window < "u" ? window.innerHeight : 0), s = /* @__PURE__ */ F(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && g_(window, "resize", () => {
		o.value = window.innerHeight;
	});
	let c = K(() => {
		let e = t.value;
		if (!e || e.length === 0) return [];
		let n = o.value, i = s.value, a = r.value, c = [];
		for (let t of e) {
			let e = pS(t, n, i);
			if (e == null || c.some((t) => Math.abs(t.height - e) <= 1)) continue;
			let r = Math.min(e, Math.min(a, n));
			c.push({
				value: t,
				height: r,
				offset: Math.max(0, a - r)
			});
		}
		return c.sort((e, t) => e.height - t.height);
	});
	function l() {
		if (!n.value || c.value.length === 0) return;
		let e = pS(n.value, o.value, s.value);
		return c.value.find((t) => t.value === n.value || e != null && Math.abs(t.height - e) <= 1);
	}
	let u = K(() => l()?.offset ?? null);
	function d(e, t, i, o) {
		let s = c.value;
		if (s.length === 0) return;
		let u = r.value, d = i === "up" || i === "down" ? t.y : t.x, f = i === "up" || i === "left" ? -d : d, p = l(), m = p?.offset ?? 0, h = Math.max(0, Math.min(u, m + e)), g = h;
		Math.abs(f) >= lS && (g = h + Math.max(-4, Math.min(dS, f)) * uS);
		let _ = s[0], v = Math.abs(g - _.offset);
		for (let e of s) {
			let t = Math.abs(g - e.offset);
			t < v && (_ = e, v = t);
		}
		if (Math.abs(g - u) < v) {
			a(null);
			return;
		}
		if (o) {
			let t = [...s].sort((e, t) => e.offset - t.offset), r = p ? t.indexOf(p) : -1;
			if (r < 0) {
				a(_.value);
				return;
			}
			let i = Math.sign(e), o = Math.sign(f) === i && Math.abs(f) >= fS, c = t[Math.max(0, Math.min(t.length - 1, r + i))];
			if (o) {
				a(c.value);
				return;
			}
			let l = i > 0 ? g > c.offset : g < c.offset;
			a(l ? c.value : n.value ?? _.value);
			return;
		}
		a(_.value);
	}
	return {
		resolvedSnapPoints: c,
		activeSnapPointOffset: u,
		viewportHeight: o,
		snapToNearest: d
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/composables/useSwipeDismiss.js
var hS = 40, gS = 10, _S = 1, vS = 16, yS = 80, bS = "button,a,input,select,textarea,label,[role=\"button\"]";
function xS(e, t) {
	if (!e || e === document.body) return null;
	let n = window.getComputedStyle(e), r = t === "vertical" ? n.overflowY : n.overflowX;
	return (r === "auto" || r === "scroll") && (t === "vertical" ? e.scrollHeight > e.clientHeight : e.scrollWidth > e.clientWidth) ? e : xS(e.parentElement, t);
}
function SS(e, t, n, r) {
	let i = Math.abs(t), a = Math.abs(n);
	if (r.hasVertical && n !== 0 && (!r.hasHorizontal || a >= i)) {
		let t = Math.max(0, e.scrollHeight - e.clientHeight), i = e.scrollTop <= 0, a = e.scrollTop >= t, o = n > 0, s = n < 0, c = o && i && r.allowDown, l = s && a && r.allowUp;
		return c || l;
	}
	if (r.hasHorizontal && t !== 0 && (!r.hasVertical || i > a)) {
		let n = Math.max(0, e.scrollWidth - e.clientWidth), i = e.scrollLeft <= 0, a = e.scrollLeft >= n, o = t > 0, s = t < 0, c = o && i && r.allowRight, l = s && a && r.allowLeft;
		return c || l;
	}
	return null;
}
function CS(e) {
	let { elementRef: t, directions: n, movementCssVars: r, swipeThreshold: i, canStart: a, onDismiss: o, onProgress: s, onCancel: c, onSwipeStart: l, onRelease: u, onSwipingChange: d } = e, f = K(() => L(n).includes("up") || L(n).includes("down")), p = K(() => L(n).includes("left") || L(n).includes("right")), m = K(() => L(n).includes("up")), h = K(() => L(n).includes("down")), g = K(() => L(n).includes("left")), _ = K(() => L(n).includes("right")), v = /* @__PURE__ */ F(!1), y = /* @__PURE__ */ F(void 0), b = /* @__PURE__ */ F({
		x: 0,
		y: 0
	}), x = {
		x: 0,
		y: 0
	}, S, C = 0, w = !1, T = !1, E = !1, D = null, O = !1, k = null, ee = {
		width: 0,
		height: 0
	}, te = 0, ne = null, re = {
		x: 0,
		y: 0
	}, ie = null, ae = null, A = !1;
	function oe(e, t) {
		return typeof i == "function" ? Math.max(0, i({
			element: e,
			direction: t
		})) : typeof i == "number" ? i : hS;
	}
	function se(e) {
		v.value !== e && (v.value = e, d?.(e));
	}
	function ce(e, t) {
		if (ne && t > ne.time) {
			let n = Math.max(t - ne.time, vS);
			re = {
				x: (e.x - ne.x) / n,
				y: (e.y - ne.y) / n
			};
		}
		ne = {
			x: e.x,
			y: e.y,
			time: t
		};
	}
	function le(e, t, n) {
		e.style.setProperty(r.x, `${t}px`), e.style.setProperty(r.y, `${n}px`);
	}
	function ue(e) {
		e.style.setProperty(r.x, "0px"), e.style.setProperty(r.y, "0px");
	}
	function de() {
		se(!1), y.value = void 0, b.value = {
			x: 0,
			y: 0
		}, x = {
			x: 0,
			y: 0
		}, S = void 0, C = 0, w = !1, T = !1, E = !1, D = null, O = !1, k = null, ee = {
			width: 0,
			height: 0
		}, te = 0, ne = null, re = {
			x: 0,
			y: 0
		}, ie = null, ae = null, A = !1;
	}
	function fe(e, t) {
		rS(e), x = t, D = t, ee = {
			width: e.offsetWidth,
			height: e.offsetHeight
		}, T = !0, E = !0;
	}
	function pe(e, t) {
		let n = (e) => e >= 0 ? e ** .5 : -(Math.abs(e) ** .5), r = (e, t, r) => !t && e < 0 || !r && e > 0 ? n(e) : e;
		return {
			x: p.value ? r(e, g.value, _.value) : n(e),
			y: f.value ? r(t, m.value, h.value) : n(t)
		};
	}
	function me(e, r, i) {
		let a = r.x - x.x, o = r.y - x.y;
		if (T) {
			T = !1;
			let e = Math.abs(a), t = Math.abs(o);
			ie = f.value && p.value ? e > t ? "horizontal" : "vertical" : f.value ? "vertical" : "horizontal";
		}
		let c = ie === "vertical" ? 0 : a, u = ie === "horizontal" ? 0 : o, d = L(n).find((e) => qx(e, c, u) > 0);
		if (E && D) {
			if (!d) return;
			let e = qx(d, r.x - D.x, r.y - D.y);
			if (Math.abs(e) < _S) return;
			E = !1, S = d, y.value = d, se(!0), l?.();
		}
		if (!v.value) return;
		let m = S ?? L(n)[0], h = qx(m, c, u);
		w || (C = Math.max(C, h), C > hS / 2 && C - h > gS && (w = !0));
		let g = pe(c, u);
		b.value = {
			x: g.x,
			y: g.y
		}, le(e, g.x, g.y), ce({
			x: g.x,
			y: g.y
		}, i);
		let _ = t.value;
		if (_) {
			let e = m === "up" || m === "down" ? ee.height || _.offsetHeight : ee.width || _.offsetWidth, t = oe(_, m), n = Math.min(1, Math.max(0, h / (e + t)));
			n !== te && (te = n, s?.(n, {
				deltaX: g.x,
				deltaY: g.y,
				direction: m
			}));
		}
	}
	function he(e) {
		if (!v.value) {
			de();
			return;
		}
		let t = qx(S ?? L(n)[0], b.value.x, b.value.y), r = oe(e, S ?? L(n)[0]), i = performance.now(), a = (ne ? i - ne.time : Infinity) > yS ? {
			x: 0,
			y: 0
		} : re;
		if (u?.(a) !== !0) {
			let i = qx(S ?? L(n)[0], a.x, a.y);
			!w && (t >= r || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), o?.()) : (ue(e), c?.());
		}
		de();
	}
	function ge(n) {
		if (!L(e.enabled) || n.pointerType === "touch" || n.button !== 0 || a && !a() || n.target?.closest(bS)) return;
		let r = t.value;
		if (r) {
			fe(r, {
				x: n.clientX,
				y: n.clientY
			}), ae = n.pointerId, A = !0;
			try {
				r.setPointerCapture(n.pointerId);
			} catch {}
		}
	}
	function _e(e) {
		if (!A || e.pointerId !== ae) return;
		let n = t.value;
		n && e.buttons & 1 && me(n, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ve(e) {
		if (!A || e.pointerId !== ae) return;
		let n = t.value;
		n && he(n);
	}
	function ye(n) {
		if (!L(e.enabled) || a && !a()) return;
		let r = n.target;
		if (r?.closest(bS)) return;
		let i = t.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = xS(r, f.value ? "vertical" : "horizontal");
			e && (O = !0, k = e);
		}
		let o = n.touches[0];
		o && fe(i, {
			x: o.clientX,
			y: o.clientY
		});
	}
	function be(e) {
		let n = t.value;
		if (!n || !E && !v.value) return;
		let r = e.touches[0];
		if (!r) return;
		let i = {
			x: r.clientX,
			y: r.clientY
		};
		if (O && E && k) {
			let e = i.x - x.x, t = i.y - x.y, n = SS(k, e, t, {
				hasVertical: f.value,
				hasHorizontal: p.value,
				allowUp: m.value,
				allowDown: h.value,
				allowLeft: g.value,
				allowRight: _.value
			});
			if (n === !1) {
				de();
				return;
			}
			n === !0 && (O = !1, k = null);
		}
		let a = v.value;
		me(n, i, e.timeStamp), (a || v.value) && e.preventDefault();
	}
	function xe() {
		let e = t.value;
		e && he(e);
	}
	let Se = [];
	return z(() => t.value, (e) => {
		Se.forEach((e) => e()), Se.length = 0, e && Se.push(g_(e, "pointerdown", ge), g_(e, "pointermove", _e), g_(e, "pointerup", ve), g_(e, "pointercancel", ve), g_(e, "touchstart", ye, { passive: !0 }), g_(e, "touchmove", be, { passive: !1 }), g_(e, "touchend", xe), g_(e, "touchcancel", xe));
	}, { immediate: !0 }), $i(() => {
		Se.forEach((e) => e()), Se.length = 0, de();
	}), {
		isSwiping: v,
		swipeDirection: y,
		dragOffset: b
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerContentImpl.js
var wS = /* @__PURE__ */ B({
	__name: "DrawerContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: !1
		},
		initialFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		finalFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = oS(), { forwardRef: a, currentElement: o } = U_();
		aS();
		let { activeSnapPointOffset: s, snapToNearest: c } = mS({
			snapPoints: i.snapPoints,
			activeSnapPoint: i.activeSnapPoint,
			popupHeight: i.popupHeight,
			viewportRef: o,
			onSnapPointChange: (e) => {
				e === null ? i.onOpenChange(!1) : i.setActiveSnapPoint(e);
			}
		});
		function l() {
			let e = o.value;
			if (!e) return;
			let t = s.value;
			if (t != null) {
				let n = i.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(Gx.snapPointOffset, `${r}px`);
			} else e.style.setProperty(Gx.snapPointOffset, "0px");
		}
		z(s, l), S_(o, ([e]) => {
			if (!e || i.hasNestedDrawer.value && i.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			i.onPopupHeightChange(t), o.value?.style.setProperty(Gx.height, `${t}px`);
		}), z(() => i.frontmostHeight.value, (e) => {
			o.value?.style.setProperty(Gx.frontmostHeight, `${e}px`);
		});
		let u = K(() => (i.snapPoints.value?.length ?? 0) > 0), d = K(() => {
			let e = i.swipeDirection.value;
			return u.value ? [e, {
				up: "down",
				down: "up",
				left: "right",
				right: "left"
			}[e]] : [e];
		}), f = {
			x: 0,
			y: 0
		}, { isSwiping: p, dragOffset: m } = CS({
			enabled: K(() => i.open.value),
			elementRef: o,
			directions: d,
			movementCssVars: {
				x: Gx.swipeMovementX,
				y: Gx.swipeMovementY
			},
			canStart: () => !i.nestedSwiping.value,
			onDismiss() {
				u.value || i.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = o.value;
				if (t) {
					let n = i.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, a = n === "left" || n === "right" ? f.x : f.y, o = n === "left" || n === "right" ? e.x : e.y, c = tS({
						direction: n,
						size: r,
						axisDelta: a,
						snapPointOffset: s.value ?? 0,
						releaseVelocity: o
					});
					c == null ? t.style.setProperty(Gx.swipeStrength, "1") : t.style.setProperty(Gx.swipeStrength, `${c}`);
				}
				if (u.value) {
					let n = i.swipeDirection.value, r = qx(n, f.x, f.y);
					c(r, e, n, i.snapToSequentialPoints.value), t && (l(), t.style.setProperty(Gx.swipeMovementX, "0px"), t.style.setProperty(Gx.swipeMovementY, "0px"));
				}
				return u.value;
			},
			onSwipingChange(e) {
				i.onSwipingChange(e), i.onNestedSwipingChange(e);
			},
			onProgress(e, t) {
				t && (f = {
					x: t.deltaX,
					y: t.deltaY
				}), i.onNestedSwipeProgressChange(e);
			}
		}), h;
		function g() {
			p.value || (i.onOpenChange(!1, h ?? "outside-press"), h = void 0);
		}
		function _(e) {
			h = "escape-key", r("escapeKeyDown", e);
		}
		function v(e) {
			if (p.value) {
				e.preventDefault();
				return;
			}
			h = "outside-press", r("pointerDownOutside", e);
		}
		function y(e) {
			if (p.value) {
				e.preventDefault();
				return;
			}
			r("focusOutside", e);
		}
		function b(e) {
			if (p.value) {
				e.preventDefault();
				return;
			}
			r("interactOutside", e);
		}
		let x;
		function S() {
			x?.(), x = void 0;
		}
		z(() => i.open.value, (e) => {
			S();
			let t = o.value;
			if (!t) {
				i.notifyOpenComplete(e);
				return;
			}
			let n = (n) => {
				n.target === t && (S(), i.notifyOpenComplete(e));
			};
			t.addEventListener("transitionend", n), t.addEventListener("animationend", n), x = () => {
				t.removeEventListener("transitionend", n), t.removeEventListener("animationend", n);
			};
		});
		let C = K(() => {
			let e = {
				"data-state": i.open.value ? "open" : "closed",
				"data-swipe-direction": i.swipeDirection.value
			};
			return p.value && (e["data-swiping"] = ""), i.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		z(() => i.nestedOpenDrawerCount.value, (e) => {
			o.value?.style.setProperty(Gx.nestedDrawers, `${e}`);
		});
		let w;
		return Yi(() => {
			i.contentElement.value = o.value, i.notifyParentHasNestedDrawer?.(!0), o.value?.style.setProperty(Gx.nestedDrawers, `${i.nestedOpenDrawerCount.value}`), l(), w = i.nestedSwipeProgressStore.subscribe(() => {
				let e = i.nestedSwipeProgressStore.getSnapshot();
				o.value?.style.setProperty(Gx.swipeProgress, `${e}`);
			});
		}), $i(() => {
			i.notifyParentHasNestedDrawer?.(!1), w?.(), S();
		}), (e, t) => (H(), U(I(Uv), {
			"as-child": "",
			loop: "",
			trapped: n.trapFocus,
			onMountAutoFocus: t[0] ||= (e) => r("openAutoFocus", e),
			onUnmountAutoFocus: t[1] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: R(() => [G(I(kv), As({
				id: I(i).contentId,
				ref: I(a),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": I(i).descriptionId,
				"aria-labelledby": I(i).titleId
			}, {
				...C.value,
				...e.$attrs
			}, {
				onDismiss: g,
				onEscapeKeyDown: _,
				onFocusOutside: y,
				onInteractOutside: b,
				onPointerDownOutside: v
			}), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"as",
				"as-child",
				"disable-outside-pointer-events",
				"aria-describedby",
				"aria-labelledby"
			])]),
			_: 3
		}, 8, ["trapped"]));
	}
}), TS = /* @__PURE__ */ B({
	__name: "DrawerContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		initialFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		finalFocus: {
			type: [Boolean, null],
			required: !1,
			skipCheck: !0
		},
		disableOutsidePointerEvents: {
			type: Boolean,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = oS(), a = z_(r), { forwardRef: o, currentElement: s } = U_(), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(!1), u = K(() => i.modal.value === !0), d = K(() => i.modal.value === "trap-focus"), f = K(() => (u.value || d.value) && i.open.value);
		cv(K(() => u.value ? s.value : void 0));
		function p(e) {
			e.defaultPrevented || (c.value || i.triggerElement.value?.focus(), e.preventDefault()), c.value = !1, l.value = !1;
		}
		function m(e) {
			e.defaultPrevented || (c.value = !0, e.detail.originalEvent.type === "pointerdown" && (l.value = !0));
			let t = e.target;
			i.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && l.value && e.preventDefault();
		}
		return (e, t) => (H(), U(I(vv), { present: e.forceMount || I(i).open.value }, {
			default: R(() => [u.value ? (H(), U(wS, As({
				key: 0,
				ref: I(o)
			}, {
				...n,
				...I(a),
				...e.$attrs
			}, {
				"trap-focus": f.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: t[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), I(i).triggerElement.value?.focus());
				},
				onPointerDownOutside: t[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: t[2] ||= (e) => e.preventDefault()
			}), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (H(), U(wS, As({
				key: 1,
				ref: I(o)
			}, {
				...n,
				...I(a),
				...e.$attrs
			}, {
				"trap-focus": f.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: p,
				onInteractOutside: m
			}), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]))]),
			_: 3
		}, 8, ["present"]));
	}
}), ES = /* @__PURE__ */ B({
	__name: "DrawerDescription",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "p"
		}
	},
	setup(e) {
		let t = e;
		U_();
		let n = oS();
		return (e, r) => (H(), U(I(xv), As(t, { id: I(n).descriptionId }), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), DS = /* @__PURE__ */ B({
	__name: "DrawerHandle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "div"
		}
	},
	setup(e) {
		let t = e;
		U_();
		let n = oS();
		return (e, r) => (H(), U(I(xv), As(t, {
			"aria-hidden": "true",
			"data-state": I(n).open.value ? "open" : "closed"
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, ["data-state"]));
	}
}), OS = /* @__PURE__ */ B({
	__name: "DrawerOverlayImpl",
	props: {
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
		let t = oS(), n = F_(t.open.value);
		z(() => t.open.value, (e) => {
			n.value = e;
		}, { immediate: !0 }), U_();
		let r = K(() => {
			let e = {
				"data-state": t.open.value ? "open" : "closed",
				"data-swipe-direction": t.swipeDirection.value
			};
			return t.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, t) => (H(), U(I(xv), As({
			as: e.as,
			"as-child": e.asChild
		}, r.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[I(Gx).swipeProgress]: "0",
			[I(Gx).swipeStrength]: "1"
		} }), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"style"
		]));
	}
}), kS = /* @__PURE__ */ B({
	__name: "DrawerOverlay",
	props: {
		forceMount: {
			type: Boolean,
			required: !1,
			default: !1
		},
		forceRender: {
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
			required: !1
		}
	},
	setup(e) {
		let t = oS(), n = !!t.notifyParentHasNestedDrawer, { forwardRef: r } = U_();
		return (e, i) => I(t).modal.value && (!n || e.forceRender) ? (H(), U(I(vv), {
			key: 0,
			present: e.forceMount || I(t).open.value
		}, {
			default: R(() => [G(OS, As(e.$attrs, {
				ref: I(r),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : Es("v-if", !0);
	}
}), AS = /* @__PURE__ */ B({
	__name: "DrawerPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		return (e, t) => (H(), U(I(ey), Ce(Ss(e.$props)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), jS = /* @__PURE__ */ B({
	__name: "DrawerTitle",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "h2"
		}
	},
	setup(e) {
		let t = e, n = oS();
		return U_(), (e, r) => (H(), U(I(xv), As(t, { id: I(n).titleId }), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), [MS, NS] = /*#__PURE__*/ Jg("DropdownMenuRoot"), PS = /* @__PURE__ */ B({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		dir: {
			type: String,
			required: !1
		},
		modal: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		U_();
		let i = C_(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), a = /* @__PURE__ */ F(), { modal: o, dir: s } = /* @__PURE__ */ bn(n), c = R_(s);
		return NS({
			open: i,
			onOpenChange: (e) => {
				i.value = e;
			},
			onOpenToggle: () => {
				i.value = !i.value;
			},
			triggerId: "",
			triggerElement: a,
			contentId: "",
			modal: o,
			dir: c
		}), (e, t) => (H(), U(I(Nx), {
			open: I(i),
			"onUpdate:open": t[0] ||= (e) => /* @__PURE__ */ dn(i) ? i.value = e : null,
			dir: I(c),
			modal: I(o)
		}, {
			default: R(() => [V(e.$slots, "default", { open: I(i) })]),
			_: 3
		}, 8, [
			"open",
			"dir",
			"modal"
		]));
	}
}), FS = /* @__PURE__ */ B({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		loop: {
			type: Boolean,
			required: !1
		},
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(e, { emit: t }) {
		let n = G_(e, t);
		U_();
		let r = MS(), i = /* @__PURE__ */ F(!1);
		function a(e) {
			e.defaultPrevented || (i.value || setTimeout(() => {
				r.triggerElement.value?.focus();
			}, 0), i.value = !1, e.preventDefault());
		}
		return r.contentId ||= uv(void 0, "reka-dropdown-menu-content"), (e, t) => (H(), U(I(Vx), As(I(n), {
			id: I(r).contentId,
			"aria-labelledby": I(r)?.triggerId,
			style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			},
			onCloseAutoFocus: a,
			onInteractOutside: t[0] ||= (e) => {
				if (e.defaultPrevented) return;
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, a = t.button === 2 || n;
				(!I(r).modal.value || a) && (i.value = !0), I(r).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16, ["id", "aria-labelledby"]));
	}
}), IS = /* @__PURE__ */ B({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: !1
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, r = z_(t);
		return U_(), (e, t) => (H(), U(I(Rx), Ce(Ss({
			...n,
			...I(r)
		})), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), LS = /* @__PURE__ */ B({
	__name: "DropdownMenuPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (H(), U(I(Hx), Ce(Ss(t)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), RS = /* @__PURE__ */ B({
	__name: "DropdownMenuTrigger",
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
		let t = e, n = MS(), { forwardRef: r, currentElement: i } = U_();
		return Yi(() => {
			n.triggerElement = i;
		}), n.triggerId ||= uv(void 0, "reka-dropdown-menu-trigger"), (e, i) => (H(), U(I(Ex), { "as-child": "" }, {
			default: R(() => [G(I(xv), {
				id: I(n).triggerId,
				ref: I(r),
				type: e.as === "button" ? "button" : void 0,
				"as-child": t.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": I(n).open.value,
				"aria-controls": I(n).open.value ? I(n).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": I(n).open.value ? "open" : "closed",
				onClick: i[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (I(n)?.onOpenToggle(), await $n(), I(n).open.value && t.preventDefault());
				},
				onKeydown: i[1] ||= su((t) => {
					e.disabled || (["Enter", " "].includes(t.key) && I(n).onOpenToggle(), t.key === "ArrowDown" && I(n).onOpenChange(!0), [
						"Enter",
						" ",
						"ArrowDown"
					].includes(t.key) && t.preventDefault());
				}, [
					"enter",
					"space",
					"arrow-down"
				])
			}, {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"as-child",
				"as",
				"aria-expanded",
				"aria-controls",
				"data-disabled",
				"disabled",
				"data-state"
			])]),
			_: 3
		}));
	}
}), [zS, BS] = /*#__PURE__*/ Jg("TooltipProvider"), VS = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "TooltipProvider",
	props: {
		delayDuration: {
			type: Number,
			required: !1,
			default: 700
		},
		skipDelayDuration: {
			type: Number,
			required: !1,
			default: 300
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: !1
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: !1
		},
		content: {
			type: Object,
			required: !1
		}
	},
	setup(e) {
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: i, ignoreNonKeyboardFocus: a, disabled: o, content: s } = /* @__PURE__ */ bn(e);
		U_();
		let c = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F(!1), { start: u, stop: d } = f_(() => {
			c.value = !0;
		}, n, { immediate: !1 });
		return BS({
			isOpenDelayed: c,
			delayDuration: t,
			onOpen() {
				d(), c.value = !1;
			},
			onClose() {
				u();
			},
			isPointerInTransitRef: l,
			disableHoverableContent: r,
			disableClosingTrigger: i,
			disabled: o,
			ignoreNonKeyboardFocus: a,
			content: s
		}), (e, t) => V(e.$slots, "default");
	}
}), HS = "tooltip.open", [US, WS] = /*#__PURE__*/ Jg("TooltipRoot"), GS = /* @__PURE__ */ B({
	__name: "TooltipRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		delayDuration: {
			type: Number,
			required: !1,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		U_();
		let i = zS(), a = K(() => n.disableHoverableContent ?? i.disableHoverableContent.value), o = K(() => n.disableClosingTrigger ?? i.disableClosingTrigger.value), s = K(() => n.disabled ?? i.disabled.value), c = K(() => n.delayDuration ?? i.delayDuration.value), l = K(() => n.ignoreNonKeyboardFocus ?? i.ignoreNonKeyboardFocus.value), u = C_(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		z(u, (e) => {
			i.onClose && (e ? (i.onOpen(), document.dispatchEvent(new CustomEvent(HS))) : i.onClose());
		});
		let d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(), p = K(() => u.value ? d.value ? "delayed-open" : "instant-open" : "closed"), { start: m, stop: h } = f_(() => {
			d.value = !0, u.value = !0;
		}, c, { immediate: !1 });
		function g() {
			h(), d.value = !1, u.value = !0;
		}
		function _() {
			h(), u.value = !1;
		}
		function v() {
			m();
		}
		return WS({
			contentId: "",
			open: u,
			stateAttribute: p,
			trigger: f,
			onTriggerChange(e) {
				f.value = e;
			},
			onTriggerEnter() {
				i.isOpenDelayed.value ? v() : g();
			},
			onTriggerLeave() {
				a.value ? _() : h();
			},
			onOpen: g,
			onClose: _,
			disableHoverableContent: a,
			disableClosingTrigger: o,
			disabled: s,
			ignoreNonKeyboardFocus: l
		}), (e, t) => (H(), U(I(ly), null, {
			default: R(() => [V(e.$slots, "default", { open: I(u) })]),
			_: 3
		}));
	}
}), KS = /* @__PURE__ */ B({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = US(), a = zS(), { forwardRef: o, currentElement: s } = U_(), c = K(() => n.ariaLabel || s.value?.textContent), l = K(() => {
			let { ariaLabel: e, ...t } = n;
			return N_(t, a.content.value ?? {}, {
				side: "top",
				sideOffset: 0,
				align: "center",
				avoidCollisions: !0,
				collisionBoundary: [],
				collisionPadding: 0,
				arrowPadding: 0,
				sticky: "partial",
				hideWhenDetached: !1
			});
		});
		return Yi(() => {
			g_(window, "scroll", (e) => {
				e.target?.contains(i.trigger.value) && i.onClose();
			}, { capture: !0 }), g_(window, HS, i.onClose);
		}), (e, t) => (H(), U(I(kv), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => r("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				I(i).disableClosingTrigger.value && I(i).trigger.value?.contains(e.target) && e.preventDefault(), r("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= au(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => I(i).onClose()
		}, {
			default: R(() => [G(I(Sx), As({
				ref: I(o),
				"data-state": I(i).stateAttribute.value
			}, {
				...e.$attrs,
				...l.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: R(() => [V(e.$slots, "default"), G(I(ry), {
					id: I(i).contentId,
					role: "tooltip"
				}, {
					default: R(() => [ws(M(c.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), qS = /* @__PURE__ */ B({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	setup(e) {
		let t = W_(e), { forwardRef: n, currentElement: r } = U_(), { trigger: i, onClose: a } = US(), o = zS(), { isPointerInTransit: s, onPointerExit: c } = K_(i, r);
		return o.isPointerInTransitRef = s, c(() => {
			a();
		}), (e, r) => (H(), U(KS, As({ ref: I(n) }, I(t)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), JS = /* @__PURE__ */ B({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = US(), a = G_(n, r), { forwardRef: o } = U_();
		return (e, t) => (H(), U(I(vv), { present: e.forceMount || I(i).open.value }, {
			default: R(() => [(H(), U(ca(I(i).disableHoverableContent.value ? KS : qS), As({ ref: I(o) }, I(a)), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), YS = /* @__PURE__ */ B({
	__name: "TooltipPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (H(), U(I(ey), Ce(Ss(t)), {
			default: R(() => [V(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), XS = /* @__PURE__ */ B({
	__name: "TooltipTrigger",
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
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, n = US(), r = zS();
		n.contentId ||= uv(void 0, "reka-tooltip-content");
		let { forwardRef: i, currentElement: a } = U_(), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(!1), c = K(() => n.disabled.value ? {} : {
			click: h,
			focus: p,
			pointermove: d,
			pointerleave: f,
			pointerdown: u,
			blur: m
		});
		Yi(() => {
			n.onTriggerChange(a.value);
		});
		function l() {
			setTimeout(() => {
				o.value = !1;
			}, 1);
		}
		function u() {
			n.open && !n.disableClosingTrigger.value && n.onClose(), o.value = !0, document.addEventListener("pointerup", l, { once: !0 });
		}
		function d(e) {
			e.pointerType !== "touch" && !s.value && !r.isPointerInTransitRef.value && (n.onTriggerEnter(), s.value = !0);
		}
		function f() {
			n.onTriggerLeave(), s.value = !1;
		}
		function p(e) {
			o.value || n.ignoreNonKeyboardFocus.value && !e.target.matches?.(":focus-visible") || n.onOpen();
		}
		function m() {
			n.onClose();
		}
		function h() {
			n.disableClosingTrigger.value || n.onClose();
		}
		return (e, r) => (H(), U(I(uy), {
			"as-child": "",
			reference: e.reference
		}, {
			default: R(() => [G(I(xv), As({
				ref: I(i),
				"aria-describedby": I(n).open.value ? I(n).contentId : void 0,
				"data-state": I(n).stateAttribute.value,
				as: e.as,
				"as-child": t.asChild,
				"data-grace-area-trigger": ""
			}, ha(c.value)), {
				default: R(() => [V(e.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-describedby",
				"data-state",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), ZS = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, QS = (e) => e === "", $S = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), eC = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), tC = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), nC = (e) => {
	let t = tC(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, rC = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, iC = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o = rC.width, color: s = rC.stroke, ...c }, { slots: l }) => nc("svg", {
	...rC,
	...c,
	width: o,
	height: o,
	stroke: s,
	"stroke-width": QS(n) || QS(r) || n === !0 || r === !0 ? Number(i || a || rC["stroke-width"]) * 24 / Number(o) : i || a || rC["stroke-width"],
	class: $S("lucide", c.class, ...e ? [`lucide-${eC(nC(e))}-icon`, `lucide-${eC(e)}`] : ["lucide-icon"]),
	...!l.default && !ZS(c) && { "aria-hidden": "true" }
}, [...t.map((e) => nc(...e)), ...l.default ? [l.default()] : []]), aC = (e, t) => (n, { slots: r, attrs: i }) => nc(iC, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r), oC = aC("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), sC = aC("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), cC = aC("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), lC = aC("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), uC = aC("images", [
	["path", {
		d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",
		key: "9kzy35"
	}],
	["path", {
		d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",
		key: "1t0f0t"
	}],
	["circle", {
		cx: "13",
		cy: "7",
		r: "1",
		fill: "currentColor",
		key: "1obus6"
	}],
	["rect", {
		x: "8",
		y: "2",
		width: "14",
		height: "14",
		rx: "2",
		key: "1gvhby"
	}]
]), dC = aC("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), fC = aC("library", [
	["path", {
		d: "m16 6 4 14",
		key: "ji33uf"
	}],
	["path", {
		d: "M12 6v14",
		key: "1n7gus"
	}],
	["path", {
		d: "M8 8v12",
		key: "1gg7y9"
	}],
	["path", {
		d: "M4 4v16",
		key: "6qkkli"
	}]
]), pC = aC("panel-right-close", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M15 3v18",
		key: "14nvp0"
	}],
	["path", {
		d: "m8 9 3 3-3 3",
		key: "12hl5m"
	}]
]), mC = aC("panel-right-open", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M15 3v18",
		key: "14nvp0"
	}],
	["path", {
		d: "m10 15-3-3 3-3",
		key: "1pgupc"
	}]
]), hC = aC("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), gC = aC("type", [
	["path", {
		d: "M12 4v16",
		key: "1654pz"
	}],
	["path", {
		d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
		key: "e0r10z"
	}],
	["path", {
		d: "M9 20h6",
		key: "s66wpe"
	}]
]), _C = aC("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), vC = 1.75, yC = [
	{
		route: "workbench",
		icon: dC,
		label_key: "nav.workbench"
	},
	{
		route: "prompt",
		icon: gC,
		label_key: "nav.prompt"
	},
	{
		route: "assets",
		icon: fC,
		label_key: "nav.assets"
	},
	{
		route: "gallery",
		icon: uC,
		label_key: "nav.gallery"
	},
	{
		route: "diagnostics",
		icon: oC,
		label_key: "nav.diagnostics"
	},
	{
		route: "settings",
		icon: hC,
		label_key: "nav.settings"
	}
], bC = [
	"workbench",
	"prompt",
	"assets",
	"gallery"
], xC = ["diagnostics", "settings"];
function SC(e) {
	let t = yC.find((t) => t.route === e);
	if (t === void 0) throw Error(`No nav item registered for route "${e}"`);
	return t;
}
function CC(e, t) {
	switch (t) {
		case "workbench": return e("nav.workbench");
		case "prompt": return e("nav.prompt");
		case "assets": return e("nav.assets");
		case "gallery": return e("nav.gallery");
		case "diagnostics": return e("nav.diagnostics");
		case "settings": return e("nav.settings");
	}
}
//#endregion
//#region src/ui/shell/use_portal_target.ts
function wC() {
	let e = br(Vg);
	if (e === void 0) throw Error("No portal target was provided: every Reka portal must render inside the Shadow Root's dedicated portal element (see contracts/portal_keys.ts). Wrap this component tree in <PortalProvider>.");
	return e;
}
//#endregion
//#region src/ui/shell/DesktopIconRail.vue?vue&type=script&setup=true&lang.ts
var TC = [
	"data-selected",
	"aria-current",
	"aria-label",
	"onClick"
], EC = /* @__PURE__ */ B({
	__name: "DesktopIconRail",
	props: { route: {} },
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = wC(), s = K(() => yC.map((e) => ({
			...e,
			label: CC(a, e.route)
		})));
		return (e, t) => (H(), U(I(VS), { "delay-duration": 300 }, {
			default: R(() => [W("nav", { class: j(I(r).rail) }, [(H(!0), hs(as, null, fa(s.value, (e) => (H(), U(I(GS), { key: e.route }, {
				default: R(() => [G(I(XS), { "as-child": "" }, {
					default: R(() => [W("button", {
						type: "button",
						class: j(["tc-interactive", I(r).rail_button]),
						"data-selected": e.route === n.route,
						"aria-current": e.route === n.route ? "page" : void 0,
						"aria-label": e.label,
						onClick: (t) => i("select", e.route)
					}, [(H(), U(ca(e.icon), {
						size: 20,
						"stroke-width": I(vC),
						"aria-hidden": "true"
					}, null, 8, ["stroke-width"]))], 10, TC)]),
					_: 2
				}, 1024), G(I(YS), { to: I(o) }, {
					default: R(() => [G(I(JS), {
						class: j(I(r).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: R(() => [ws(M(e.label), 1)]),
						_: 2
					}, 1032, ["class"])]),
					_: 2
				}, 1032, ["to"])]),
				_: 2
			}, 1024))), 128))], 2)]),
			_: 1
		}));
	}
}), DC = ["aria-label"], OC = /* @__PURE__ */ B({
	__name: "InspectorSheet",
	props: { open: { type: Boolean } },
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = wC();
		function s() {
			i("update:open", !1);
		}
		function c(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? c(t.shadowRoot) : t;
		}
		let l = null;
		z(() => n.open, (e) => {
			if (e) {
				let e = c(document);
				l = e instanceof HTMLElement ? e : null;
			}
		});
		function u(e) {
			e.preventDefault(), l?.focus(), l = null;
		}
		return (t, n) => (H(), U(I(cS), {
			open: e.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": n[0] ||= (e) => i("update:open", e)
		}, {
			default: R(() => [G(I(AS), { to: I(o) }, {
				default: R(() => [G(I(kS), { class: j(I(r).sheet_overlay) }, null, 8, ["class"]), G(I(TS), {
					class: j(I(r).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: u
				}, {
					default: R(() => [
						G(I(DS), { class: j(I(r).sheet_handle) }, null, 8, ["class"]),
						G(I(jS), { class: "tc-visually-hidden" }, {
							default: R(() => [ws(M(I(a)("common.inspector.title")), 1)]),
							_: 1
						}),
						G(I(ES), { class: "tc-visually-hidden" }, {
							default: R(() => [ws(M(I(a)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						W("div", { class: j(I(r).sheet_header) }, [W("span", null, M(I(a)("common.inspector.title")), 1), W("button", {
							type: "button",
							class: j(["tc-interactive", I(r).icon_button]),
							"aria-label": I(a)("common.actions.close"),
							onClick: s
						}, [G(I(_C), {
							size: 18,
							"stroke-width": I(vC),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])], 10, DC)], 2),
						W("div", { class: j(I(r).sheet_body) }, [W("p", null, M(I(a)("common.inspector.empty_title")), 1), W("p", null, M(I(a)("common.inspector.empty_description")), 1)], 2)
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		}, 8, ["open"]));
	}
}), kC = [
	"data-selected",
	"aria-current",
	"onClick"
], AC = ["data-selected", "aria-label"], jC = /* @__PURE__ */ B({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = wC(), s = K(() => bC.map((e) => ({
			...SC(e),
			label: CC(a, e)
		}))), c = K(() => xC.map((e) => ({
			...SC(e),
			label: CC(a, e)
		}))), l = K(() => xC.includes(n.route)), u = K(() => a("nav.more"));
		function d(e) {
			i("select", e);
		}
		return (e, t) => (H(), hs("nav", { class: j(I(r).bottom_nav) }, [(H(!0), hs(as, null, fa(s.value, (e) => (H(), hs("button", {
			key: e.route,
			type: "button",
			class: j(["tc-interactive", I(r).bottom_nav_item]),
			"data-selected": e.route === n.route,
			"aria-current": e.route === n.route ? "page" : void 0,
			onClick: (t) => d(e.route)
		}, [(H(), U(ca(e.icon), {
			size: 20,
			"stroke-width": I(vC),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"])), W("span", { class: j(I(r).bottom_nav_item_label) }, M(e.label), 3)], 10, kC))), 128)), G(I(PS), null, {
			default: R(() => [G(I(RS), { "as-child": "" }, {
				default: R(() => [W("button", {
					type: "button",
					class: j(["tc-interactive", I(r).bottom_nav_item]),
					"data-selected": l.value,
					"aria-label": u.value,
					"data-testid": "mobile-more-trigger"
				}, [G(I(lC), {
					size: 20,
					"stroke-width": I(vC),
					"aria-hidden": "true"
				}, null, 8, ["stroke-width"]), W("span", { class: j(I(r).bottom_nav_item_label) }, M(u.value), 3)], 10, AC)]),
				_: 1
			}), G(I(LS), { to: I(o) }, {
				default: R(() => [G(I(FS), {
					class: j(I(r).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: R(() => [(H(!0), hs(as, null, fa(c.value, (e) => (H(), U(I(IS), {
						key: e.route,
						class: j(I(r).more_menu_item),
						onSelect: (t) => d(e.route)
					}, {
						default: R(() => [(H(), U(ca(e.icon), {
							size: 16,
							"stroke-width": I(vC),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])), ws(" " + M(e.label), 1)]),
						_: 2
					}, 1032, ["class", "onSelect"]))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		})], 2));
	}
}), MC = ["aria-label", "aria-expanded"], NC = ["data-status"], PC = {
	key: 0,
	class: "tc-tabular-nums"
}, FC = /* @__PURE__ */ B({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(e) {
		let t = e, { t: n, n: i } = eg(), a = /* @__PURE__ */ F(!0), o = K(() => a.value ? n("nav.task_strip_collapse") : n("nav.task_strip_expand"));
		function s() {
			a.value = !a.value;
		}
		return (e, c) => t.tasks.length > 0 ? (H(), hs("div", {
			key: 0,
			class: j(I(r).task_strip)
		}, [W("div", { class: j(I(r).task_strip_header) }, [W("span", { class: j([I(r).task_strip_summary, "tc-tabular-nums"]) }, M(I(n)("nav.task_strip_count", t.tasks.length)), 3), W("button", {
			type: "button",
			class: j(["tc-interactive", I(r).icon_button]),
			"aria-label": o.value,
			"aria-expanded": a.value,
			onClick: s
		}, [(H(), U(ca(a.value ? I(sC) : I(cC)), {
			size: 16,
			"stroke-width": I(vC),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, MC)], 2), a.value ? (H(), hs("div", {
			key: 0,
			class: j(I(r).task_strip_list)
		}, [(H(!0), hs(as, null, fa(t.tasks, (e) => (H(), hs("div", {
			key: e.id,
			class: j(I(r).task_chip)
		}, [
			W("span", {
				class: j(I(r).task_chip_dot),
				"data-status": e.status
			}, null, 10, NC),
			W("span", { class: j(I(r).task_chip_label) }, M(I(n)(e.label_code)), 3),
			e.progress === null ? Es("", !0) : (H(), hs("span", PC, M(I(i)(e.progress, "percent")), 1))
		], 2))), 128))], 2)) : Es("", !0)], 2)) : Es("", !0);
	}
}), IC = ["aria-label", "aria-pressed"], LC = /* @__PURE__ */ B({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean }
	},
	emits: ["set-inspector-collapsed"],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = K(() => CC(a, n.route)), s = K(() => n.inspectorCollapsed ? mC : pC), c = K(() => n.inspectorCollapsed ? a("nav.inspector_expand") : a("nav.inspector_collapse"));
		function l() {
			i("set-inspector-collapsed", !n.inspectorCollapsed);
		}
		return (t, n) => (H(), hs("header", { class: j(I(r).top_bar) }, [W("div", { class: j(I(r).top_bar_start) }, [W("span", { class: j(I(r).top_bar_title) }, M(o.value), 3)], 2), W("div", { class: j(I(r).top_bar_end) }, [W("button", {
			type: "button",
			class: j(["tc-interactive", I(r).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": c.value,
			"aria-pressed": !e.inspectorCollapsed,
			onClick: l
		}, [(H(), U(ca(s.value), {
			size: 18,
			"stroke-width": I(vC),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, IC)], 2)], 2));
	}
}), RC = "(min-width: 960px)";
function zC() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(RC).matches;
}
function BC(e) {
	if (e !== void 0) return K(() => e);
	let t = /* @__PURE__ */ F(zC());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(RC), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), Re(() => {
			e.removeEventListener("change", n);
		});
	}
	return K(() => t.value ? "desktop" : "mobile");
}
//#endregion
//#region src/ui/shell/StudioShell.vue?vue&type=script&setup=true&lang.ts
var VC = ["data-viewport", "data-inspector-collapsed"], HC = ["aria-label"], UC = /* @__PURE__ */ B({
	__name: "StudioShell",
	props: {
		state: {},
		viewport: {}
	},
	emits: [
		"select-route",
		"set-inspector-collapsed",
		"resize-inspector"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: a } = eg(), o = BC(n.viewport), s = K(() => n.state.loading.size > 0), c = K(() => n.state.failures.size > 0), l = K(() => CC(a, n.state.route)), u = K(() => ({ "--tc-inspector-width": `${String(n.state.inspector.width)}px` })), d = /* @__PURE__ */ F(!1), f = K(() => o.value === "mobile" ? !d.value : n.state.inspector.collapsed);
		function p(e) {
			o.value === "mobile" && (d.value = !e), i("set-inspector-collapsed", e);
		}
		function m(e) {
			i("select-route", e);
		}
		return (e, t) => (H(), hs("div", {
			class: j(I(r).shell),
			"data-viewport": I(o),
			"data-inspector-collapsed": I(o) === "desktop" ? n.state.inspector.collapsed : null,
			style: ve(u.value)
		}, [
			G(LC, {
				route: n.state.route,
				"inspector-collapsed": f.value,
				onSetInspectorCollapsed: p
			}, null, 8, ["route", "inspector-collapsed"]),
			I(o) === "desktop" ? (H(), U(EC, {
				key: 0,
				route: n.state.route,
				onSelect: m
			}, null, 8, ["route"])) : Es("", !0),
			W("main", {
				class: j(I(r).workspace),
				"data-testid": "workspace"
			}, [c.value ? (H(), hs("div", {
				key: 0,
				class: j(I(r).partial_banner),
				"data-testid": "partial-banner"
			}, [W("div", null, [W("p", null, M(I(a)("app.partial_init.banner_title")), 1), W("p", null, M(I(a)("app.partial_init.banner_description")), 1)]), W("button", {
				type: "button",
				class: j(["tc-interactive", I(r).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: t[0] ||= (e) => m("diagnostics")
			}, M(I(CC)(I(a), "diagnostics")), 3)], 2)) : Es("", !0), s.value ? (H(), hs("div", {
				key: 1,
				class: j(I(r).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": I(a)("status.loading")
			}, [
				W("div", {
					class: j(I(r).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				W("div", {
					class: j(I(r).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				W("div", {
					class: j(I(r).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, HC)) : (H(), hs("div", {
				key: 2,
				class: j(I(r).workspace_placeholder),
				"data-testid": "workspace-placeholder"
			}, [W("p", { class: j(I(r).workspace_placeholder_title) }, M(l.value), 3), W("p", { class: j(I(r).workspace_placeholder_description) }, M(I(a)("common.workspace_unavailable")), 3)], 2))], 2),
			I(o) === "desktop" && !n.state.inspector.collapsed ? (H(), U(qg, {
				key: 1,
				width: n.state.inspector.width,
				onResize: t[1] ||= (e) => i("resize-inspector", e)
			}, null, 8, ["width"])) : Es("", !0),
			G(FC, { tasks: n.state.tasks }, null, 8, ["tasks"]),
			I(o) === "mobile" ? (H(), U(jC, {
				key: 2,
				route: n.state.route,
				onSelect: m
			}, null, 8, ["route"])) : Es("", !0),
			I(o) === "mobile" ? (H(), U(OC, {
				key: 3,
				open: d.value,
				"onUpdate:open": t[2] ||= (e) => p(!e)
			}, null, 8, ["open"])) : Es("", !0)
		], 14, VC));
	}
}), WC = ["href"], GC = /* @__PURE__ */ B({
	__name: "AppRoot",
	props: {
		status: {},
		probe: {},
		version: {},
		portalTarget: {},
		hostElement: {},
		capabilities: {}
	},
	setup(e) {
		let t = e, { t: n } = eg();
		function i() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let a = t.hostElement, o = i();
		a.dataset.colorMode = o;
		let s = K(() => t.probe.ready ? void 0 : t.probe.current_version), c = K(() => `${n("app.name")} ${n("app.version_label", { version: t.version })}`), l = t.status.state === "ready" ? Bg({
			capabilities: t.capabilities ?? kg(),
			initial_color_mode: o
		}) : null;
		l && z(() => l.state.value.color_mode, (e) => {
			a.dataset.colorMode = e;
		});
		function u(e) {
			l?.controller.set_route(e);
		}
		function d(e) {
			l?.controller.set_inspector_collapsed(e);
		}
		function f(e) {
			l?.controller.set_inspector_width(e);
		}
		function p() {
			window.location.reload();
		}
		return (t, i) => (H(), U(Hg, { "portal-target": e.portalTarget }, {
			default: R(() => [e.status.state === "blocked" ? (H(), hs("div", {
				key: 0,
				class: j(I(r).state_screen),
				"data-startup-state": "blocked"
			}, [
				W("p", { class: j(I(r).state_screen_eyebrow) }, M(c.value), 3),
				W("h1", { class: j(I(r).state_screen_title) }, M(I(n)("app.unsupported_host.title")), 3),
				W("p", { class: j(I(r).state_screen_description) }, M(I(n)("app.unsupported_host.description", {
					required_version: I(Ld),
					current_version: s.value ?? I(n)("status.unknown")
				})), 3),
				W("a", {
					class: j(["tc-interactive", I(r).state_screen_action]),
					href: e.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, M(I(n)("app.unsupported_host.update_action")), 11, WC)
			], 2)) : e.status.state === "failed" ? (H(), hs("div", {
				key: 1,
				class: j(I(r).state_screen),
				"data-startup-state": "failed"
			}, [
				W("p", { class: j(I(r).state_screen_eyebrow) }, M(c.value), 3),
				W("h1", { class: j(I(r).state_screen_title) }, M(I(n)("app.fatal_error.title")), 3),
				W("p", { class: j(I(r).state_screen_description) }, M(I(n)("app.fatal_error.description")), 3),
				W("button", {
					type: "button",
					class: j(["tc-interactive", I(r).state_screen_action]),
					onClick: p
				}, M(I(n)("app.fatal_error.reload_action")), 3)
			], 2)) : I(l) ? (H(), U(UC, {
				key: 2,
				state: I(l).state.value,
				onSelectRoute: u,
				onSetInspectorCollapsed: d,
				onResizeInspector: f
			}, null, 8, ["state"])) : Es("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
});
//#endregion
//#region src/ui/create_shadow_root.ts
function KC(e, t) {
	e.getElementById("tavern-canvas-root")?.remove();
	let n = e.createElement("div");
	n.id = "tavern-canvas-root";
	let r = n.attachShadow({ mode: "open" }), i = e.createElement("style");
	i.textContent = t, r.append(i);
	let a = e.createElement("div");
	a.dataset.shadowRole = "app", r.append(a);
	let o = e.createElement("div");
	return o.dataset.shadowRole = "portal", r.append(o), e.body.append(n), {
		host_element: n,
		shadow_root: r,
		app_element: a,
		portal_element: o,
		remove() {
			n.remove();
		}
	};
}
//#endregion
//#region src/bootstrap/startup_error.ts
var qC = "https://github.com/N0VI028/JS-Slash-Runner";
function JC(e) {
	if (e.ready) return {
		state: "ready",
		title: "TavernCanvas ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${Ld} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: qC
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `TavernCanvas could not verify the installed version. ${t}`,
			update_url: qC
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: qC
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: qC
		};
	}
}
function YC() {
	return {
		state: "failed",
		title: "TavernCanvas could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function XC(e = {}) {
	let t = e.document ?? document, n = Wd(e.globals ?? globalThis), r = n.ready ? new o(e.modules ?? []) : void 0, i, a;
	if (!n.ready) i = "blocked", a = JC(n);
	else try {
		await r?.start_all(), i = "ready", a = JC(n);
	} catch {
		i = "failed", a = YC();
	}
	let s = KC(t, e.stylesheet ?? ""), c = Sg();
	c.apply_locale("auto", typeof navigator > "u" ? "en" : navigator.language);
	let l = hu(GC, {
		status: a,
		probe: n,
		version: e.version ?? "development",
		portalTarget: s.portal_element,
		hostElement: s.host_element,
		capabilities: kg()
	});
	l.use(c.i18n), l.onUnmount(() => {
		s.remove();
	});
	try {
		l.mount(s.app_element);
	} catch (e) {
		throw s.remove(), await r?.stop_all(), e;
	}
	let u = !1;
	return {
		state: i,
		probe: n,
		async dispose() {
			if (u) return;
			u = !0;
			let t = [];
			try {
				l.unmount();
			} catch (e) {
				t.push(e);
			}
			for (let n of e.owned_resources?.subscriptions ?? []) try {
				n();
			} catch (e) {
				t.push(e);
			}
			for (let n of e.owned_resources?.object_urls ?? []) try {
				URL.revokeObjectURL(n);
			} catch (e) {
				t.push(e);
			}
			s.remove();
			try {
				await r?.stop_all();
			} catch (e) {
				t.push(e);
			}
			if (t.length > 0) throw AggregateError(t, "TavernCanvas cleanup failed");
		}
	};
}
//#endregion
//#region src/ui/styles/tokens.css?inline
var ZC = ":host{--tc-canvas:#f4f5f7;--tc-surface:#fff;--tc-surface-raised:#f8f9fb;--tc-text:#181a1f;--tc-text-muted:#616773;--tc-divider:#d8dce3;--tc-accent:#2457d6;--tc-accent-hover:#1f49b8;--tc-success:#16815d;--tc-warning:#9a6700;--tc-error:#c23838;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#111318;--tc-surface:#181b21;--tc-surface-raised:#20242b;--tc-text:#f4f5f7;--tc-text-muted:#aeb4bf;--tc-divider:#343a44;--tc-accent:#6f91ff;--tc-accent-hover:#7d9cff;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", QC = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);position:fixed;inset:0}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", $C = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", ew = "._shell_1dcce_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1dcce_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1dcce_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1dcce_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1dcce_52{border-bottom:1px solid var(--tc-divider);grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:12px;display:flex}._top_bar_start_1dcce_63,._top_bar_end_1dcce_64{align-items:center;gap:4px;min-width:0;display:flex}._top_bar_title_1dcce_71{white-space:nowrap;text-overflow:ellipsis;min-width:0;font-weight:600;overflow:hidden}._icon_button_1dcce_79{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._icon_button_1dcce_79[data-selected=true],._icon_button_1dcce_79[aria-pressed=true]{color:var(--tc-accent)}._rail_1dcce_95{border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:4px;padding-block:12px;display:flex;overflow-y:auto}._rail_button_1dcce_106{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1dcce_106[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1dcce_125{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1dcce_133{grid-area:workspace;min-width:0;min-height:0;overflow:auto}._workspace_placeholder_1dcce_140{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._workspace_placeholder_title_1dcce_149{font-weight:600}._workspace_placeholder_description_1dcce_153{max-width:48ch;color:var(--tc-text-muted)}._inspector_1dcce_158{border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1dcce_166{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1dcce_166:hover,._inspector_resizer_1dcce_166[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1dcce_179{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1dcce_187{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1dcce_196{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._bottom_nav_1dcce_204{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1dcce_212{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1dcce_212[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1dcce_228{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._more_menu_content_1dcce_236{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);min-width:176px;padding:4px}._more_menu_item_1dcce_244{color:var(--tc-text);border-radius:var(--tc-radius-field);align-items:center;gap:8px;padding:8px 10px;display:flex}._more_menu_item_1dcce_244[data-highlighted]{color:var(--tc-accent);background-color:var(--tc-surface);outline:none}._sheet_overlay_1dcce_259{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1dcce_266{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1dcce_280{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1dcce_292{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1dcce_301{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1dcce_309{border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1dcce_317{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1dcce_325{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1dcce_334{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1dcce_341{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1dcce_353{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1dcce_353[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1dcce_353[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1dcce_353[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1dcce_373{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1dcce_380{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1dcce_385{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1dcce_397{background-color:var(--tc-canvas);height:100%;min-height:100dvh;color:var(--tc-text);flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex}._state_screen_eyebrow_1dcce_409{color:var(--tc-text-muted)}._state_screen_title_1dcce_413{max-width:56ch}._state_screen_action_1dcce_417{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1dcce_427{max-width:56ch;color:var(--tc-text-muted)}", tw = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function nw(e) {
	return e.replaceAll(tw, (e, t) => new URL(t, import.meta.url).href);
}
//#endregion
//#region src/index.ts
var rw = XC({
	stylesheet: nw([
		ZC,
		QC,
		$C,
		ew
	].join("\n")),
	version: "3.0.0-alpha.1"
});
//#endregion
export { rw as bootstrap_handle };

//# sourceMappingURL=index.js.map