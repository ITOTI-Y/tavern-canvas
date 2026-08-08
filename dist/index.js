import { $ as e, A as t, B as n, C as r, E as i, I as a, K as o, L as s, M as c, N as l, O as u, P as d, Q as f, R as p, S as m, U as h, _ as g, a as _, at as v, b as y, ct as b, d as x, et as S, ft as C, g as w, ht as T, it as E, j as D, k as ee, mt as te, n as ne, nt as O, p as k, pt as re, r as A, s as ie, st as ae, t as oe, u as se, ut as j, v as M, w as N, x as ce, y as le, z as P } from "./chunks/AppIcon-BpY-A4VH.js";
import { $ as ue, A as de, B as fe, C as pe, D as me, E as he, F as ge, G as _e, H as ve, I as ye, J as be, K as xe, L as Se, M as Ce, N as we, P as Te, Q as F, R as Ee, S as De, T as Oe, U as ke, V as Ae, W as je, X as Me, Y as Ne, Z as Pe, _ as Fe, a as Ie, at as I, b as Le, c as Re, ct as ze, d as Be, dt as L, et as R, f as Ve, ft as He, g as Ue, gt as We, h as Ge, ht as Ke, i as qe, it as Je, j as Ye, k as Xe, l as Ze, lt as z, m as Qe, mt as $e, nt as et, o as tt, ot as nt, p as rt, pt as it, q as at, r as ot, rt as st, s as ct, st as B, t as lt, tt as V, u as ut, ut as H, v as dt, w as ft, x as pt, y as mt, z as ht } from "./chunks/http_acknowledgment-Cg2RHuTs.js";
import { t as gt } from "./chunks/create_i18n-ijk1h_jt.js";
import { n as _t, r as vt, t as yt } from "./chunks/useTypeahead-DHbSip40.js";
import { t as bt } from "./chunks/chevron-up-BB8zEGvw.js";
import { $ as xt, A as St, B as Ct, C as wt, D as Tt, E as Et, H as Dt, L as Ot, M as kt, Q as At, T as jt, Z as Mt, _ as Nt, a as Pt, b as Ft, c as It, d as Lt, f as Rt, g as zt, h as Bt, i as Vt, j as Ht, k as Ut, l as Wt, m as Gt, n as Kt, p as qt, s as Jt, t as Yt, u as Xt, w as Zt, z as Qt } from "./chunks/PopperContent-_OEj_1Tb.js";
import { a as $t, i as en, n as tn, r as nn, t as rn } from "./chunks/TooltipTrigger-Cq_k30Ce.js";
import { t as an } from "./chunks/RovingFocusGroup-soVq9DTI.js";
var U = {
	shell: "_shell_1800z_8",
	top_bar: "_top_bar_1800z_57",
	top_bar_start: "_top_bar_start_1800z_68",
	top_bar_end: "_top_bar_end_1800z_69",
	top_bar_title: "_top_bar_title_1800z_76",
	icon_button: "_icon_button_1800z_84",
	rail: "_rail_1800z_100",
	rail_button: "_rail_button_1800z_111",
	tooltip_content: "_tooltip_content_1800z_130",
	workspace: "_workspace_1800z_138",
	workspace_placeholder: "_workspace_placeholder_1800z_145",
	inspector: "_inspector_1800z_154",
	inspector_resizer: "_inspector_resizer_1800z_162",
	inspector_panel: "_inspector_panel_1800z_175",
	inspector_header: "_inspector_header_1800z_183",
	inspector_body: "_inspector_body_1800z_192",
	inspector_selection_kind: "_inspector_selection_kind_1800z_200",
	inspector_selection: "_inspector_selection_1800z_200",
	bottom_nav: "_bottom_nav_1800z_226",
	bottom_nav_item: "_bottom_nav_item_1800z_234",
	bottom_nav_item_label: "_bottom_nav_item_label_1800z_250",
	more_menu_content: "_more_menu_content_1800z_258",
	more_menu_item: "_more_menu_item_1800z_266",
	sheet_overlay: "_sheet_overlay_1800z_281",
	sheet_content: "_sheet_content_1800z_288",
	sheet_handle: "_sheet_handle_1800z_302",
	sheet_header: "_sheet_header_1800z_314",
	sheet_body: "_sheet_body_1800z_323",
	task_strip: "_task_strip_1800z_41",
	task_strip_header: "_task_strip_header_1800z_339",
	task_strip_summary: "_task_strip_summary_1800z_347",
	task_strip_list: "_task_strip_list_1800z_356",
	task_chip: "_task_chip_1800z_363",
	task_chip_dot: "_task_chip_dot_1800z_375",
	task_chip_label: "_task_chip_label_1800z_395",
	skeleton_block: "_skeleton_block_1800z_402",
	partial_banner: "_partial_banner_1800z_407",
	state_screen: "_state_screen_1800z_419",
	state_screen_eyebrow: "_state_screen_eyebrow_1800z_431",
	state_screen_title: "_state_screen_title_1800z_435",
	state_screen_action: "_state_screen_action_1800z_439",
	state_screen_description: "_state_screen_description_1800z_449"
}, on = class {
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
}, sn = class {
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
}, cn = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new on(), n = new sn()) {
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
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
function ln(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
function un(e, t, n = "") {
	let r = ln(e), i = e?.length, a = t !== void 0;
	if (!r || a && i !== t) {
		let o = n && `"${n}" `, s = a ? ` of length ${t}` : "", c = r ? `length=${i}` : `type=${typeof e}`, l = o + "expected Uint8Array" + s + ", got " + c;
		throw r ? RangeError(l) : TypeError(l);
	}
	return e;
}
function dn(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function fn(e, t) {
	un(e, void 0, "digestInto() output");
	let n = t.outputLen;
	if (e.length < n) throw RangeError("\"digestInto() output\" expected to be of length >=" + n);
}
function pn(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function mn(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function hn(e, t) {
	return e << 32 - t | e >>> t;
}
var gn = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", _n = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function vn(e) {
	if (un(e), gn) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += _n[e[n]];
	return t;
}
function yn(e) {
	if (typeof e != "string") throw TypeError("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function bn(e, t = {}) {
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
var xn = (e) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	e
]) });
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_md.js
function Sn(e, t, n) {
	return e & t ^ ~e & n;
}
function Cn(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var wn = class {
	blockLen;
	outputLen;
	canXOF = !1;
	padOffset;
	isLE;
	buffer;
	view;
	finished = !1;
	length = 0;
	pos = 0;
	destroyed = !1;
	constructor(e, t, n, r) {
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = mn(this.buffer);
	}
	update(e) {
		dn(this), un(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = mn(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		dn(this), fn(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, pn(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		n.setBigUint64(r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = mn(e), s = this.outputLen;
		if (s % 4) throw Error("_sha2: outputLen must be aligned to 32bit");
		let c = s / 4, l = this.get();
		if (c > l.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneInto(e) {
		e ||= new this.constructor(), e.set(...this.get());
		let { blockLen: t, buffer: n, length: r, finished: i, destroyed: a, pos: o } = this;
		return e.destroyed = a, e.finished = i, e.length = r, e.pos = o, r % t && e.buffer.set(n), e;
	}
	clone() {
		return this._cloneInto();
	}
}, Tn = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), En = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), Dn = /* @__PURE__ */ new Uint32Array(64), On = class extends wn {
	constructor(e) {
		super(64, e, 8, !1);
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i, F: a, G: o, H: s } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s
		];
	}
	set(e, t, n, r, i, a, o, s) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = s | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) Dn[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Dn[e - 15], n = Dn[e - 2], r = hn(t, 7) ^ hn(t, 18) ^ t >>> 3, i = hn(n, 17) ^ hn(n, 19) ^ n >>> 10;
			Dn[e] = i + Dn[e - 7] + r + Dn[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = hn(o, 6) ^ hn(o, 11) ^ hn(o, 25), u = l + t + Sn(o, s, c) + En[e] + Dn[e] | 0, d = (hn(n, 2) ^ hn(n, 13) ^ hn(n, 22)) + Cn(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		pn(Dn);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), pn(this.buffer);
	}
}, kn = class extends On {
	A = Tn[0] | 0;
	B = Tn[1] | 0;
	C = Tn[2] | 0;
	D = Tn[3] | 0;
	E = Tn[4] | 0;
	F = Tn[5] | 0;
	G = Tn[6] | 0;
	H = Tn[7] | 0;
	constructor() {
		super(32);
	}
}, An = /* @__PURE__ */ bn(() => new kn(), /* @__PURE__ */ xn(1)), jn = "Canonical JSON accepts only JSON data";
function Mn() {
	throw TypeError(jn);
}
function Nn(e) {
	return typeof e == "number" && !Number.isFinite(e) ? Mn() : JSON.stringify(e);
}
function Pn(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return Nn(e);
	if (typeof e != "object") return Mn();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return Mn();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return Mn();
				n.push(Pn(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return Mn();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return Mn();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return Mn();
			a.push(`${Nn(n)}:${Pn(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function Fn(e) {
	return Pn(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var In = class {
	#e;
	constructor(e) {
		if (e === void 0 || typeof e.getRandomValues != "function") throw Error("Secure random generation is unavailable");
		this.#e = e;
	}
	bytes(e) {
		if (!Number.isInteger(e) || e < 1 || e > 65536) throw RangeError("Secure random byte length must be between 1 and 65536");
		let t = new Uint8Array(e);
		return this.#e.getRandomValues(t), t;
	}
};
function Ln(e) {
	return vn(An(yn(e)));
}
function Rn(e, t) {
	let n = Ln(Fn(e)), r = t.bytes(32);
	if (r.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: n,
		generation_anchor: Ln(`${n}${vn(r)}`)
	};
}
//#endregion
//#region ../../packages/core/src/generation/source_context.ts
var zn = H({
	schema_version: I(1),
	chat_id: L().min(1).max(512),
	active_swipes: R(ze({
		message_id: B().int().nonnegative(),
		swipe_id: B().int().nonnegative()
	})),
	messages: R(ze({
		message_id: B().int().nonnegative(),
		role: F([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: at,
		swipe_id: B().int().nonnegative().nullable()
	}))
}), Bn = class {
	#e;
	constructor(e = globalThis.crypto) {
		this.#e = e;
	}
	next() {
		return Pe.parse(this.#e.randomUUID());
	}
};
Object.freeze(We(xe, { target: "draft-07" }));
//#endregion
//#region ../../packages/core/src/generation/tool_policy.ts
var Vn = Object.freeze({
	tools: Object.freeze([]),
	tool_choice: "none"
}), Hn = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function Un(e) {
	let t = e.error === null ? null : Object.freeze({ ...e.error });
	return Object.freeze({
		job_id: e.job_id,
		request_id: e.request_id,
		request_digest: e.request_digest,
		generation_anchor: e.generation_anchor,
		source_anchor: e.source_anchor,
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: e.provider_id,
		arguments: Object.freeze({ ...e.arguments }),
		state: e.state,
		created_at: e.created_at,
		updated_at: e.updated_at,
		error: t,
		image_ids: Object.freeze([...e.image_ids])
	});
}
//#endregion
//#region ../../packages/core/src/jobs/job_executor.ts
var Wn = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(ht.parse(e));
	}
}, Gn = {
	queued: ["preparing", "cancelled"],
	preparing: [
		"submitting",
		"failed",
		"cancelled"
	],
	submitting: [
		"running",
		"completed",
		"failed",
		"cancelled"
	],
	running: [
		"completed",
		"failed",
		"cancelled"
	],
	completed: ["attached", "orphaned"],
	failed: [],
	cancelled: [],
	attached: [],
	orphaned: []
}, Kn = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function qn(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Gn[r].includes(t)) throw new Kn(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function Jn(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function Yn(e) {
	let t = at.parse(e.generation_anchor), n = Object.freeze(xe.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: Pe.parse(e.request_id),
		generation_anchor: t,
		source_anchor: at.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: fe.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function Xn(e) {
	return vn(An(yn(`${e.generation_anchor}${Fn(e.arguments)}`)));
}
function Zn(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function Qn(e) {
	return e instanceof Wn ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var $n = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = /* @__PURE__ */ new Map();
	#o = /* @__PURE__ */ new Map();
	#s = /* @__PURE__ */ new Map();
	#c = /* @__PURE__ */ new Map();
	#l = /* @__PURE__ */ new Map();
	#u = /* @__PURE__ */ new Map();
	#d = /* @__PURE__ */ new Set();
	#f = fe.options;
	#p = 0;
	#m = 0;
	#h = !1;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new Hn(), this.#i = Jn(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#f) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : Jn(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, []), this.#s.set(t, 0);
		}
	}
	enqueue(e) {
		let t = Yn(e), n = Xn(t);
		if (t.automatic) {
			let e = this.#l.get(n);
			if (e !== void 0) {
				let t = this.get(e);
				if (t !== null) return Promise.resolve(t);
			}
			let r = this.#u.get(n);
			if (r !== void 0) return r;
			let i = this.#_(t, n);
			this.#u.set(n, i);
			let a = () => {
				this.#u.get(n) === i && this.#u.delete(n);
			};
			return i.then(a, a), i;
		}
		return this.#_(t, n);
	}
	get(e) {
		let t = this.#c.get(e);
		return t === void 0 ? null : Un(t.job);
	}
	subscribe(e) {
		this.#d.add(e);
		let t = !1;
		return () => {
			t || (t = !0, this.#d.delete(e));
		};
	}
	async cancel(e) {
		let t = this.#c.get(e);
		if (t === void 0) throw Error(`Generation job ${e} does not exist`);
		if (t.job.state === "cancelled") return Un(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#w(t);
		let n = await this.#C(t, async () => (t.job.state !== "cancelled" && await this.#S(t, "cancelled"), Un(t.job)));
		return this.#v(), n;
	}
	mark_attached(e) {
		return this.#g(e, "attached");
	}
	mark_orphaned(e) {
		return this.#g(e, "orphaned");
	}
	#g(e, t) {
		let n = this.#c.get(e);
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#C(n, async () => (n.job.state !== t && await this.#S(n, t), Un(n.job)));
	}
	async #_(e, t) {
		let n = this.#r.now().toISOString(), r = {
			job_id: Me.parse(this.#n.next()),
			request_id: e.request_id,
			request_digest: t,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor,
			chat_id: e.chat_id,
			requested_swipe_id: e.requested_swipe_id,
			provider_id: e.provider_id,
			arguments: e.arguments,
			state: "queued",
			created_at: n,
			updated_at: n,
			error: null,
			image_ids: []
		}, i = Un(r);
		await this.#t.save(i);
		let a = {
			job: r,
			controller: new AbortController(),
			operation: Promise.resolve(),
			cancel_requested: !1,
			queued: !0
		};
		return this.#c.set(r.job_id, a), e.automatic && this.#l.set(t, r.job_id), this.#o.get(r.provider_id)?.push(a), this.#T(i), this.#v(), i;
	}
	#v() {
		this.#h || (this.#h = !0, queueMicrotask(() => {
			this.#h = !1, this.#y();
		}));
	}
	#y() {
		for (; this.#p < this.#i;) {
			let e = this.#b();
			if (e === null) return;
			let t = this.#o.get(e)?.shift();
			t !== void 0 && (t.queued = !1, this.#p += 1, this.#s.set(e, (this.#s.get(e) ?? 0) + 1), this.#x(t).finally(() => {
				--this.#p, this.#s.set(e, Math.max(0, (this.#s.get(e) ?? 1) - 1)), this.#v();
			}));
		}
	}
	#b() {
		for (let e = 0; e < this.#f.length; e += 1) {
			let t = (this.#m + e) % this.#f.length, n = this.#f[t];
			if (n === void 0) continue;
			let r = this.#o.get(n)?.length ?? 0, i = this.#s.get(n) ?? 0, a = this.#a.get(n) ?? 0;
			if (r > 0 && i < a) return this.#m = (t + 1) % this.#f.length, n;
		}
		return null;
	}
	async #x(e) {
		if (!await this.#C(e, async () => e.cancel_requested || (await this.#S(e, "preparing"), e.controller.signal.aborted) ? (await this.#S(e, "cancelled"), !1) : (await this.#S(e, "submitting"), !0)) || e.cancel_requested) return;
		let t = {
			signal: e.controller.signal,
			mark_running: async () => {
				await this.#C(e, async () => {
					!e.cancel_requested && e.job.state === "submitting" && await this.#S(e, "running");
				});
			}
		};
		try {
			let n = (await this.#e.execute(Un(e.job), t)).image_ids.map((e) => Ne.parse(e));
			if (n.length === 0) throw new Wn({
				code: "malformed_response",
				retryable: !1
			});
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = Zn(e.job);
				t.image_ids = n, await this.#S(e, "completed", t);
			});
		} catch (t) {
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = Zn(e.job);
				n.error = Qn(t), await this.#S(e, "failed", n);
			});
		}
	}
	async #S(e, t, n = Zn(e.job)) {
		qn(n, t, this.#r.now().toISOString());
		let r = Un(n);
		return await this.#t.save(r), e.job = n, this.#T(r), r;
	}
	#C(e, t) {
		let n = e.operation.then(t);
		return e.operation = n.then(() => void 0, () => void 0), n;
	}
	#w(e) {
		let t = this.#o.get(e.job.provider_id);
		if (t === void 0) return;
		let n = t.indexOf(e);
		n >= 0 && t.splice(n, 1), e.queued = !1;
	}
	#T(e) {
		for (let t of this.#d) t(e);
	}
};
//#endregion
//#region ../../packages/core/src/messages/message_binder.ts
function er(e) {
	return [...new Set(e)];
}
function tr(e, t) {
	return `${e}\u0000${String(t)}`;
}
function nr(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.has(t.image_id) || n.set(t.image_id, Object.freeze({ ...t }));
	for (let e of t) n.has(e) || n.set(e, Object.freeze({ image_id: e }));
	return Object.freeze([...n.values()]);
}
var rr = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	#i = /* @__PURE__ */ new Map();
	#a = /* @__PURE__ */ new Set();
	#o = /* @__PURE__ */ new Set();
	#s = null;
	#c = [];
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	start() {
		this.#c.length > 0 || (this.#c = [
			this.#e.subscribe((e) => {
				this.#u(e);
			}),
			this.#t.subscribe_final_assistant((e) => {
				this.#l(e);
			}),
			this.#t.subscribe_chat_change((e) => {
				this.#s = e.chat_id, this.#d();
			}),
			this.#t.subscribe_swipe_change((e) => {
				this.#s = e.chat_id, this.#i.set(tr(e.chat_id, e.message_id), e.swipe_id), this.#d();
			})
		]);
	}
	stop() {
		let e = this.#c.toReversed();
		this.#c = [];
		for (let t of e) t();
	}
	#l(e) {
		if (e.role !== "assistant" || !e.is_final || e.generation_anchor === null || e.source_anchor === null) return;
		let t = Object.freeze({
			chat_id: e.chat_id,
			message_id: e.message_id,
			swipe_id: e.swipe_id,
			generation_anchor: at.parse(e.generation_anchor),
			source_anchor: at.parse(e.source_anchor),
			request_ids: Object.freeze(er(e.request_ids.map((e) => Pe.parse(e))))
		});
		this.#n.set(t.generation_anchor, t), this.#s === null && (this.#s = t.chat_id);
		let n = tr(t.chat_id, t.message_id);
		this.#i.has(n) || this.#i.set(n, t.swipe_id), this.#d();
	}
	#u(e) {
		if (e.state === "completed") {
			this.#r.set(e.job_id, e), this.#f(e);
			return;
		}
		this.#r.delete(e.job_id), this.#o.delete(e.job_id);
	}
	#d() {
		for (let e of this.#r.values()) this.#f(e);
	}
	async #f(e) {
		if (this.#a.has(e.job_id)) {
			this.#o.add(e.job_id);
			return;
		}
		let t = this.#n.get(e.generation_anchor);
		if (t !== void 0) {
			if (t.chat_id !== e.chat_id || t.source_anchor !== e.source_anchor || t.swipe_id !== e.requested_swipe_id) {
				await this.#p(e.job_id);
				return;
			}
			if (this.#s === t.chat_id && this.#i.get(tr(t.chat_id, t.message_id)) === t.swipe_id) {
				this.#a.add(e.job_id);
				try {
					let n = await this.#t.find_target({
						chat_id: t.chat_id,
						message_id: t.message_id,
						swipe_id: t.swipe_id,
						generation_anchor: t.generation_anchor
					});
					if (n === null) {
						await this.#p(e.job_id);
						return;
					}
					if (n.metadata !== null && (n.metadata.generation_anchor !== t.generation_anchor || n.metadata.source_anchor !== t.source_anchor)) {
						await this.#p(e.job_id);
						return;
					}
					let r = er([
						...n.metadata?.request_ids ?? [],
						...t.request_ids,
						e.request_id
					]), i = er([...n.metadata?.image_ids ?? [], ...e.image_ids]), a = Object.freeze({
						chat_id: t.chat_id,
						message_id: t.message_id,
						swipe_id: t.swipe_id,
						metadata: pe.parse({
							schema_version: 1,
							generation_anchor: t.generation_anchor,
							source_anchor: t.source_anchor,
							request_ids: r,
							image_ids: i
						}),
						media: nr(n.media, e.image_ids)
					});
					await this.#t.update_target(a), await this.#e.mark_attached(e.job_id);
				} catch {} finally {
					if (this.#a.delete(e.job_id), this.#o.delete(e.job_id)) {
						let t = this.#e.get(e.job_id);
						t?.state === "completed" && this.#f(t);
					}
				}
			}
		}
	}
	async #p(e) {
		try {
			await this.#e.mark_orphaned(e);
		} catch {}
	}
};
//#endregion
//#region src/host/sillytavern_host.ts
function ir(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function ar(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
var or = {
	native_tool_manager: !1,
	main_generation_events: !1,
	message_swipe_metadata: !1,
	host_image_upload: !1
};
function sr(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function cr(e, t) {
	let n = sr(e, t);
	return n.ok && typeof n.value == "function";
}
function lr(e, t) {
	let n = sr(e, t);
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
function ur(e, t) {
	let n = lr(e, t);
	return n.ok && typeof n.value == "string" && n.value.trim().length > 0;
}
function dr(e) {
	let t = sr(e, "eventSource"), n = sr(e, "eventTypes");
	if (!t.ok || !ir(t.value) || !n.ok || !ir(n.value)) return !1;
	let r = n.value, i = sr(r, "GENERATION_STARTED"), a = sr(r, "GENERATION_STOPPED"), o = sr(r, "GENERATION_ENDED"), s = sr(r, "STREAM_TOKEN_RECEIVED");
	return cr(t.value, "on") && cr(t.value, "removeListener") && i.ok && typeof i.value == "string" && i.value.length > 0 && a.ok && typeof a.value == "string" && a.value.length > 0 && o.ok && typeof o.value == "string" && o.value.length > 0 && s.ok && typeof s.value == "string" && s.value.length > 0;
}
function fr(e) {
	let t = sr(e, "eventSource"), n = sr(e, "eventTypes");
	if (!t.ok || !ir(t.value) || !n.ok || !ir(n.value)) return !1;
	let r = sr(n.value, "CHAT_CHANGED"), i = sr(n.value, "MESSAGE_SWIPED");
	return cr(t.value, "on") && cr(t.value, "removeListener") && r.ok && typeof r.value == "string" && r.value.length > 0 && i.ok && typeof i.value == "string" && i.value.length > 0;
}
function pr(e) {
	let t = lr(e, "getRequestHeaders");
	if (!t.ok) return !1;
	try {
		return vr(t.value), !0;
	} catch {
		return !1;
	}
}
function mr(e, t) {
	if (!ir(e)) return { ...or };
	let n = lr(e, "getContext");
	if (!n.ok || !ir(n.value)) return { ...or };
	let r = n.value, i = ur(r, "getCurrentLocale"), a = ur(r, "getCurrentChatId");
	return {
		native_tool_manager: cr(r, "registerFunctionTool") && cr(r, "unregisterFunctionTool"),
		main_generation_events: i && dr(r),
		message_swipe_metadata: a && fr(r),
		host_image_upload: typeof t == "function" && pr(r)
	};
}
function hr(e, t) {
	let n = !1, r;
	for (let [i, a] of t.toReversed()) try {
		e.removeListener(i, a);
	} catch (e) {
		n || (n = !0, r = e);
	}
	return n ? {
		failed: !0,
		error: r
	} : { failed: !1 };
}
function gr(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function _r(e) {
	if (!ar(e)) throw Error("Image tool arguments must be a record");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("Image tool arguments could not be cloned");
	}
	if (!ar(t)) throw Error("Image tool arguments could not be cloned");
	return t;
}
function vr(e) {
	if (!ar(e)) throw Error("SillyTavern returned invalid request headers");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("SillyTavern returned invalid request headers");
	}
	if (!ar(t) || !Object.values(t).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return t;
}
var yr = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	get_locale() {
		return gr(this.#e.getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		return gr(this.#e.getCurrentChatId(), "SillyTavern returned an invalid active chat ID");
	}
	subscribe_generation(e) {
		let t = [
			[this.#e.eventTypes.GENERATION_STARTED, (...t) => {
				let n = t[0], r = t[2];
				typeof n == "string" && typeof r == "boolean" && e({
					phase: "started",
					generation_type: n,
					dry_run: r
				});
			}],
			[this.#e.eventTypes.GENERATION_STOPPED, () => {
				e({ phase: "stopped" });
			}],
			[this.#e.eventTypes.GENERATION_ENDED, (...t) => {
				let n = t[0];
				typeof n == "number" && e({
					phase: "ended",
					message_id: n
				});
			}]
		], n = [];
		try {
			for (let e of t) this.#e.eventSource.on(...e), n.push(e);
		} catch (e) {
			throw hr(this.#e.eventSource, n), e;
		}
		let r = !1;
		return () => {
			if (r) return;
			r = !0;
			let e = hr(this.#e.eventSource, n);
			if (e.failed) throw e.error;
		};
	}
	subscribe_generation_chunk(e) {
		let t = this.#e.eventTypes.STREAM_TOKEN_RECEIVED, n = "", r = (...t) => {
			let r = t[0];
			if (typeof r != "string") return;
			let i = r.startsWith(n) ? r.slice(n.length) : r;
			n = r, i.length > 0 && e(i);
		};
		this.#e.eventSource.on(t, r);
		let i = !1;
		return () => {
			i || (i = !0, this.#e.eventSource.removeListener(t, r));
		};
	}
	subscribe_chat_change(e) {
		let t = this.#e.eventTypes.CHAT_CHANGED, n = (...t) => {
			let n = t[0];
			typeof n == "string" && n.trim().length > 0 && e({ chat_id: n });
		};
		this.#e.eventSource.on(t, n);
		let r = !1;
		return () => {
			r || (r = !0, this.#e.eventSource.removeListener(t, n));
		};
	}
	subscribe_message_swiped(e) {
		let t = this.#e.eventTypes.MESSAGE_SWIPED, n = (...t) => {
			let n = t[0];
			typeof n == "number" && Number.isInteger(n) && n >= 0 && e({ message_id: n });
		};
		this.#e.eventSource.on(t, n);
		let r = !1;
		return () => {
			r || (r = !0, this.#e.eventSource.removeListener(t, n));
		};
	}
	register_image_tool(e) {
		this.#e.registerFunctionTool({
			name: e.name,
			displayName: e.display_name,
			description: e.description,
			parameters: structuredClone(e.parameters),
			action: async (t) => e.execute(_r(t)),
			stealth: e.stealth
		});
		let t = !1;
		return () => {
			t || (t = !0, this.#e.unregisterFunctionTool(e.name));
		};
	}
	async upload_image(e) {
		let t = await this.#t("/api/images/upload", {
			method: "POST",
			headers: vr(this.#e.getRequestHeaders()),
			body: JSON.stringify({
				image: e.image_base64,
				format: e.format,
				ch_name: e.character_name,
				filename: e.file_name.replaceAll(".", "_")
			})
		}), n;
		try {
			n = await t.json();
		} catch {
			throw t.ok ? Error("Host image upload returned an invalid response") : Error(`Host image upload failed with status ${String(t.status)}`);
		}
		if (!t.ok) throw ar(n) && typeof n.error == "string" && n.error.trim().length > 0 ? Error(n.error) : Error(`Host image upload failed with status ${String(t.status)}`);
		if (!ar(n) || typeof n.path != "string" || n.path.trim().length === 0) throw Error("Host image upload returned an invalid response");
		return { path: n.path };
	}
};
//#endregion
//#region src/host/tauritavern_host.ts
function br(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function xr(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Sr(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function Cr(e, t) {
	let n = Sr(e, t);
	return n.ok && typeof n.value == "function";
}
function wr(e, t) {
	let n = Sr(e, t);
	return n.ok && br(n.value) ? n.value : void 0;
}
function Tr(e) {
	let t = {
		tauri_chat_surface: !1,
		tauri_world_info_activation: !1
	};
	if (!br(e)) return t;
	let n = Sr(e, "abiVersion");
	if (!n.ok || n.value !== 1) return t;
	let r = wr(e, "api");
	if (r === void 0) return t;
	let i = wr(r, "chatSurface"), a = i === void 0 ? { ok: !1 } : Sr(i, "protocolVersion"), o = wr(r, "worldInfo");
	return {
		tauri_chat_surface: i !== void 0 && a.ok && a.value === 1 && Cr(i, "isManagedOwnershipRequired") && Cr(i, "registerParticipant"),
		tauri_world_info_activation: o !== void 0 && Cr(o, "getLastActivation") && Cr(o, "subscribeActivations")
	};
}
function Er(e, t = !0) {
	if (e === void 0 && t) return;
	let n;
	if (typeof e == "function") n = () => {
		Reflect.apply(e, void 0, []);
	};
	else if (br(e)) {
		let t = Sr(e, "dispose");
		if (!t.ok || typeof t.value != "function") throw Error("TauriTavern returned an invalid ChatSurface disposer");
		let r = t.value;
		n = () => {
			Reflect.apply(r, e, []);
		};
	} else throw Error("TauriTavern returned an invalid ChatSurface disposer");
	let r = !1;
	return () => {
		r || (r = !0, n());
	};
}
function Dr(e) {
	return {
		message_id: e.mesid,
		element: e.element,
		content: e.content,
		signal: e.signal
	};
}
function Or(e) {
	return e === "before" || e === "after" || e === "an_top" || e === "an_bottom" || e === "depth" || e === "em_top" || e === "em_bottom" || e === "outlet";
}
function kr() {
	throw Error("TauriTavern returned an invalid WorldInfo activation");
}
function Ar(e) {
	if (!xr(e)) return !1;
	let t = Sr(e, "entries");
	if (!t.ok) return !1;
	try {
		if (!Array.isArray(t.value)) return !1;
		for (let e = 0; e < t.value.length; e += 1) if (!xr(t.value[e])) return !1;
		return !0;
	} catch {
		return !1;
	}
}
function jr(e) {
	if (!Ar(e)) return kr();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return kr();
	}
	if (!xr(t)) return kr();
	let { timestampMs: n, trigger: r, entries: i } = t;
	if (typeof n != "number" || !Number.isFinite(n) || typeof r != "string" || r.length === 0 || !Array.isArray(i)) return kr();
	let a = [];
	for (let e of i) {
		if (!xr(e)) return kr();
		let { world: t, uid: n, displayName: r, constant: i, position: o } = e;
		if (typeof t != "string" || typeof n != "string" && (typeof n != "number" || !Number.isFinite(n)) || typeof r != "string" || typeof i != "boolean" || o !== void 0 && !Or(o)) return kr();
		a.push({
			world: t,
			uid: n,
			display_name: r,
			constant: i,
			...o === void 0 ? {} : { position: o }
		});
	}
	return {
		timestamp_ms: n,
		trigger: r,
		entries: a
	};
}
var Mr = class {
	#e;
	constructor(e) {
		this.#e = e;
	}
	register_chat_surface(e) {
		let t = this.#e.api?.chatSurface;
		if (t === void 0) throw Error("TauriTavern ChatSurface API is unavailable");
		let n = t.registerParticipant({
			id: e.id,
			protocolVersion: 1,
			...e.prepare_content === void 0 ? {} : { prepareContent: (t, n) => {
				e.prepare_content?.({
					message_id: t.mesid,
					content: t.content
				}, { claim: (e, t) => {
					n.claim(e, (e) => Er(t({
						message_id: e.mesid,
						source: e.source,
						element: e.element,
						content: e.content,
						signal: e.signal
					}), !1) ?? (() => void 0));
				} });
			} },
			...e.did_mount === void 0 ? {} : { didMount: (t) => Er(e.did_mount?.(Dr(t))) },
			...e.did_commit_content === void 0 ? {} : { didCommitContent: (t) => Er(e.did_commit_content?.(Dr(t))) }
		});
		if (!br(n)) throw Error("TauriTavern returned an invalid ChatSurface registration");
		let r = Sr(n, "fault");
		if (!r.ok || typeof r.value != "function") throw Error("TauriTavern returned an invalid ChatSurface registration");
		let i = r.value;
		return { report_fault: (e) => {
			Reflect.apply(i, n, [e]);
		} };
	}
	async get_last_world_info_activation() {
		let e = this.#e.api?.worldInfo;
		if (e === void 0) throw Error("TauriTavern WorldInfo activation API is unavailable");
		let t = await e.getLastActivation();
		return t === null ? null : jr(t);
	}
	async subscribe_world_info_activation(e) {
		let t = this.#e.api?.worldInfo;
		if (t === void 0) throw Error("TauriTavern WorldInfo activation API is unavailable");
		let n = await t.subscribeActivations((t) => {
			e(jr(t));
		});
		if (typeof n != "function") throw Error("TauriTavern returned an invalid WorldInfo unsubscribe");
		let r = !1;
		return async () => {
			r || (r = !0, await Reflect.apply(n, void 0, []));
		};
	}
};
async function Nr(e) {
	let t = Sr(e, "__TAURITAVERN__");
	if (!t.ok || !br(t.value)) return;
	let n = t.value, r = Sr(n, "abiVersion");
	if (!r.ok || r.value !== 1) return;
	let i = Sr(n, "ready");
	if (!i.ok) return;
	let a = i.value;
	if (a == null) {
		let t = Sr(e, "__TAURITAVERN_MAIN_READY__");
		if (!t.ok) return;
		a = t.value;
	}
	return await a, new Mr(n);
}
//#endregion
//#region src/host/tavern_helper_host.ts
var Pr = "tavern_canvas";
function Fr(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Ir(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Lr(e) {
	for (let t = 0; t < e.length; t += 1) if (!Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
function Rr(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function zr(e, t) {
	let n = Rr(e, t);
	return n.ok && typeof n.value == "function";
}
function Br(e) {
	let t = Rr(e, "getTavernHelperVersion");
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
function Vr(e) {
	return e === void 0 ? {
		detected: !1,
		version: { state: "missing" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	} : Fr(e) ? {
		detected: !0,
		version: Br(e),
		private_prompt_generation: zr(e, "generateRaw"),
		message_swipe_metadata: zr(e, "getChatMessages") && zr(e, "setChatMessages")
	} : {
		detected: !0,
		version: { state: "invalid" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	};
}
function Hr(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function Ur() {
	throw Error("TavernHelper returned invalid chat messages");
}
function Wr(e) {
	if (!Ir(e)) return Ur();
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o, swipes_data: s, swipes_info: c } = e;
	return !Number.isInteger(t) || typeof t != "number" || t < 0 || typeof n != "string" || !Hr(r) || typeof i != "boolean" || !Number.isInteger(a) || typeof a != "number" || !Array.isArray(o) || o.length === 0 || !Lr(o) || !o.every((e) => typeof e == "string") || !Array.isArray(s) || !Lr(s) || !s.every(Ir) || !Array.isArray(c) || !Lr(c) || !c.every(Ir) || s.length !== o.length || c.length !== o.length || a < 0 || a >= o.length ? Ur() : {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i,
		swipe_id: a,
		swipes: o,
		swipes_data: s,
		swipes_info: c
	};
}
function Gr(e) {
	try {
		if (!Array.isArray(e) || !Lr(e)) return !1;
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			if (!Ir(n)) return !1;
			let r = Rr(n, "swipes_data"), i = Rr(n, "swipes_info");
			if (!r.ok || !Array.isArray(r.value) || !Lr(r.value) || !r.value.every(Ir) || !i.ok || !Array.isArray(i.value) || !Lr(i.value) || !i.value.every(Ir)) return !1;
		}
		return !0;
	} catch {
		return !1;
	}
}
function Kr(e) {
	if (!Gr(e)) return Ur();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return Ur();
	}
	return !Array.isArray(t) || !Lr(t) ? Ur() : t.map(Wr);
}
function qr(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update metadata could not be cloned");
	}
}
function Jr(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update media could not be cloned");
	}
}
function Yr(e) {
	return {
		message_id: e.message_id,
		name: e.name,
		role: e.role,
		is_hidden: e.is_hidden,
		active_swipe_id: e.swipe_id,
		swipes: e.swipes.map((t, n) => ({
			swipe_id: n,
			content: t,
			data: e.swipes_data[n] ?? {},
			metadata: e.swipes_info[n] ?? {}
		}))
	};
}
var Xr = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async get_active_chat() {
		let e = Kr(this.#e.getChatMessages("0-{{lastMessageId}}", { include_swipes: !0 })), t = this.#t();
		if (typeof t != "string" || t.trim().length === 0) throw Error("TavernHelper returned an invalid active chat ID");
		return {
			chat_id: t,
			messages: e.map(Yr)
		};
	}
	async generate_private_prompt(e) {
		let t = {
			generation_id: e.generation_id,
			ordered_prompts: e.prompts.map((e) => ({ ...e })),
			should_silence: !0,
			should_stream: !1,
			tools: Vn.tools,
			tool_choice: Vn.tool_choice,
			...e.max_chat_history === void 0 ? {} : { max_chat_history: e.max_chat_history }
		}, n = await this.#e.generateRaw(t);
		if (typeof n != "string") throw Error("Private prompt generation returned structured tool calls");
		return n;
	}
	async update_message(e) {
		let t = Kr(this.#e.getChatMessages(e.message_id, { include_swipes: !0 })).find((t) => t.message_id === e.message_id);
		if (t === void 0) throw Error(`Host message ${String(e.message_id)} no longer exists`);
		if (!Number.isInteger(e.swipe_id) || e.swipe_id < 0 || e.swipe_id >= t.swipes.length) throw Error(`Host message ${String(e.message_id)} swipe ${String(e.swipe_id)} no longer exists`);
		let n = Jr(e.media), r = t.swipes.map((t, n) => n === e.swipe_id ? e.content : t), i = t.swipes_info.map((t, n) => n === e.swipe_id ? {
			...t,
			[Pr]: qr(e.metadata)
		} : t), a = t.swipes_data.map((t, r) => {
			if (r !== e.swipe_id) return t;
			let i = Ir(t.extra) ? t.extra : {};
			return {
				...t,
				extra: {
					...i,
					media: n
				}
			};
		});
		await this.#e.setChatMessages([{
			message_id: t.message_id,
			swipes: r,
			swipes_data: a,
			swipes_info: i
		}], { refresh: "affected" });
	}
}, Zr = "4.9.1", Qr = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function $r(e) {
	let t = Qr.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function ei(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function ti(e) {
	let t = $r(e), n = $r(Zr);
	return t === null || n === null ? "invalid" : ei(t, n) ? "supported" : "unsupported";
}
var ni = [
	"main_generation_events",
	"private_prompt_generation",
	"message_swipe_metadata",
	"host_image_upload",
	"tavern_helper"
];
function ri(e) {
	return {
		available: !1,
		reason: e
	};
}
function ii(e, t) {
	return e ? { available: !0 } : ri(t);
}
function ai(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function oi(e, t, n) {
	return {
		native_tool_manager: ii(t.native_tool_manager, "SillyTavern ToolManager API is unavailable"),
		main_generation_events: ii(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		private_prompt_generation: ii(e.private_prompt_generation, "TavernHelper.generateRaw is unavailable"),
		message_swipe_metadata: ii(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper message swipe API is unavailable"),
		host_image_upload: ii(t.host_image_upload, "SillyTavern image upload API is unavailable"),
		tavern_helper: ii(e.version.state === "available", "TavernHelper version API is unavailable"),
		tauri_chat_surface: ii(n.tauri_chat_surface, "TauriTavern ChatSurface API is unavailable"),
		tauri_world_info_activation: ii(n.tauri_world_info_activation, "TauriTavern WorldInfo activation API is unavailable"),
		gateway_protocol: ri("Gateway protocol is not connected")
	};
}
function si(e) {
	return ni.filter((t) => e[t]?.available !== !0);
}
function ci(e) {
	let t = Vr(ai(e, "TavernHelper")), n = oi(t, mr(ai(e, "SillyTavern"), ai(e, "fetch")), Tr(ai(e, "__TAURITAVERN__")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: si(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: si(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = ti(i);
	if (a === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	if (a === "unsupported") return {
		ready: !1,
		error_code: "helper_version_unsupported",
		missing_capabilities: ["tavern_helper"],
		current_version: i
	};
	let o = si(n);
	return o.length > 0 ? {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: o
	} : {
		ready: !0,
		matrix: n,
		helper_version: i
	};
}
//#endregion
//#region src/ui/controllers/unavailable_capabilities.ts
var li = "capability_not_implemented";
function W() {
	let e = /* @__PURE__ */ Error("No adapter wraps the real domain module for this capability yet (see task-1-report.md's \"future adapter layer\" note); bootstrap.ts uses this placeholder until one is wired in.");
	return Object.defineProperty(e, "code", { value: li }), Promise.reject(e);
}
function ui() {
	return () => {};
}
var di = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	reference: [],
	workflow: []
}, fi = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, pi = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
}, mi = {
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
function hi() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			submit: W,
			cancel: W,
			retry: W
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			save: W,
			remove: W,
			test_connection: W
		},
		llm_connections: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			save: W,
			remove: W,
			set_credential: W,
			clear_credential: W,
			test_connection: W
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			load_draft: W,
			save_draft: W,
			remove: W,
			bulk_remove: W,
			test_regex: W
		},
		assets: {
			load: () => Promise.resolve(di),
			subscribe: ui,
			save: W,
			remove: W,
			reorder: W
		},
		personas: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			save: W,
			remove: W
		},
		knowledge: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			save: W,
			set_enabled: W,
			remove: W,
			bulk_remove: W
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: ui,
			read_bytes: W,
			pin: W,
			detach_from_message: W,
			delete_record: W,
			bulk_delete: W
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			search: W,
			next_page: W,
			install: W,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(fi),
			subscribe: ui,
			test_connection: W,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: W
		},
		migration: {
			load: () => Promise.resolve(pi),
			subscribe: ui,
			retry: W,
			confirm_legacy_cleanup: W
		},
		settings: {
			load: () => Promise.resolve({
				settings: mi,
				vocabulary_update_channel: "bundled"
			}),
			subscribe: ui,
			update: W,
			acknowledge_http_origin: W,
			set_vocabulary_update_channel: W,
			export_archive: W,
			import_archive: W
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var gi = { status: "idle" }, _i = "capability_load_failed", vi = "command_failed", yi = /^[a-z][a-z0-9_]*$/u;
function bi(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && yi.test(t)) return { code: t };
	}
	return { code: t };
}
function G(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var xi = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function Si(e) {
	return e === "failed" ? "error" : "pending";
}
function Ci(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function wi(e) {
	return {
		id: e.job_id,
		label_code: Ci(e.state),
		status: Si(e.state),
		progress: e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null
	};
}
function Ti(e) {
	return e.filter((e) => xi.has(e.state)).map(wi);
}
function Ei(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: bi(e, vi)
		});
	}));
}
function Di(e, t, n) {
	return {
		route: e,
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		workbench: {
			profiles: [],
			active_profile_id: null,
			jobs: [],
			submit_command: gi
		},
		llm_connections: {
			connections: [],
			selected_connection_id: null
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: gi
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
			vocabulary_install_command: gi
		},
		library: {
			personas: [],
			knowledge: [],
			selected_knowledge_ids: []
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: gi
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			migration: null,
			connection_test_command: gi,
			support_bundle_command: gi
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			update_command: gi,
			migration_retry_command: gi
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var Oi = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = Di(e.initial_route ?? "workbench", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
		this.#o({
			workbench: {
				...this.#t.workbench,
				jobs: e
			},
			tasks: Ti(e)
		});
	}
	#l(e) {
		this.#o({ llm_connections: {
			...this.#t.llm_connections,
			...e
		} });
	}
	#u(e) {
		this.#o({ prompt: {
			...this.#t.prompt,
			...e
		} });
	}
	#d(e) {
		this.#o({ assets: {
			...this.#t.assets,
			...e
		} });
	}
	#f(e) {
		this.#o({ library: {
			...this.#t.library,
			...e
		} });
	}
	#p(e) {
		this.#o({ gallery: {
			...this.#t.gallery,
			...e
		} });
	}
	#m(e) {
		this.#o({ diagnostics: {
			...this.#t.diagnostics,
			...e
		} });
	}
	#h(e) {
		this.#o({ settings: {
			...this.#t.settings,
			...e
		} });
	}
	#g(e) {
		this.#o({ inspector: {
			...this.#t.inspector,
			...e
		} });
	}
	#_(e, t) {
		let n = new Set(this.#t.loading);
		t ? n.add(e) : n.delete(e), this.#o({ loading: n });
	}
	#v(e, t) {
		let n = new Map(this.#t.failures);
		t ? n.set(e, t) : n.delete(e), this.#o({ failures: n });
	}
	#y(e, t, n) {
		return this.#_(e, !0), t().then((t) => {
			this.#i || (n(t), this.#v(e, null));
		}).catch((t) => {
			this.#i || this.#v(e, bi(t, _i));
		}).finally(() => {
			this.#_(e, !1);
		});
	}
	#b(e) {
		this.#i || (e.type === "job_updated" ? this.#c(G(this.#t.workbench.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.workbench.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#x(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: G(this.#t.workbench.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#S(e) {
		this.#i || (e.type === "connection_upserted" ? this.#l({ connections: G(this.#t.llm_connections.connections, e.connection, (e) => e.id) }) : this.#l({ connections: this.#t.llm_connections.connections.filter((t) => t.id !== e.connection_id) }));
	}
	#C(e) {
		this.#i || (e.type === "preset_upserted" ? this.#u({ presets: G(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#u({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#w(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: G(this.#t.assets.records[t], e.asset, (e) => e.id)
			};
			this.#d({ records: n });
		} else {
			let t = {
				...this.#t.assets.records,
				[e.category]: this.#t.assets.records[e.category].filter((t) => t.id !== e.asset_id)
			};
			this.#d({ records: t });
		}
	}
	#T(e) {
		this.#i || (e.type === "persona_upserted" ? this.#f({ personas: this.#j(e.persona) }) : this.#f({ personas: this.#t.library.personas.filter((t) => t.id !== e.persona_id) }));
	}
	#E(e) {
		this.#i || (e.type === "entry_upserted" ? this.#f({ knowledge: G(this.#t.library.knowledge, e.entry, (e) => e.id) }) : this.#f({
			knowledge: this.#t.library.knowledge.filter((t) => t.id !== e.entry_id),
			selected_knowledge_ids: this.#t.library.selected_knowledge_ids.filter((t) => t !== e.entry_id)
		}));
	}
	#D(e) {
		this.#i || (e.type === "record_upserted" ? this.#p({ records: G(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#p({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
	}
	#O(e) {
		this.#i || this.#m({ timeline: [...this.#t.diagnostics.timeline, e.entry] });
	}
	#k(e) {
		this.#i || this.#m({ migration: e.snapshot });
	}
	#A(e) {
		this.#i || this.#h({ settings: e.settings });
	}
	async start() {
		this.#r = [
			this.#e.generation.subscribe((e) => {
				this.#b(e);
			}),
			this.#e.profiles.subscribe((e) => {
				this.#x(e);
			}),
			this.#e.llm_connections.subscribe((e) => {
				this.#S(e);
			}),
			this.#e.prompt_presets.subscribe((e) => {
				this.#C(e);
			}),
			this.#e.assets.subscribe((e) => {
				this.#w(e);
			}),
			this.#e.personas.subscribe((e) => {
				this.#T(e);
			}),
			this.#e.knowledge.subscribe((e) => {
				this.#E(e);
			}),
			this.#e.gallery.subscribe((e) => {
				this.#D(e);
			}),
			this.#e.diagnostics.subscribe((e) => {
				this.#O(e);
			}),
			this.#e.migration.subscribe((e) => {
				this.#k(e);
			}),
			this.#e.settings.subscribe((e) => {
				this.#A(e);
			})
		], await Promise.allSettled([
			this.#y("generation", () => this.#e.generation.load(), (e) => {
				this.#c(e);
			}),
			this.#y("profiles", () => this.#e.profiles.load(), (e) => {
				this.#s({
					profiles: e,
					active_profile_id: this.#t.workbench.active_profile_id ?? e[0]?.id ?? null
				});
			}),
			this.#y("llm_connections", () => this.#e.llm_connections.load(), (e) => {
				this.#l({
					connections: e,
					selected_connection_id: this.#t.llm_connections.selected_connection_id ?? e[0]?.id ?? null
				});
			}),
			this.#y("prompt_presets", () => this.#e.prompt_presets.load(), (e) => {
				this.#u({ presets: e });
			}),
			this.#y("assets", () => this.#e.assets.load(), (e) => {
				this.#d({ records: e });
			}),
			this.#y("personas", () => this.#e.personas.load(), (e) => {
				this.#f({ personas: e });
			}),
			this.#y("knowledge", () => this.#e.knowledge.load(), (e) => {
				this.#f({ knowledge: e });
			}),
			this.#y("gallery", () => this.#e.gallery.load(), (e) => {
				this.#p({ records: e });
			}),
			this.#y("vocabulary", () => this.#e.vocabulary.load(), (e) => {
				this.#d({ vocabulary_catalog: e });
			}),
			this.#y("diagnostics", () => this.#e.diagnostics.load(), (e) => {
				this.#m({ snapshot: e });
			}),
			this.#y("migration", () => this.#e.migration.load(), (e) => {
				this.#m({ migration: e });
			}),
			this.#y("settings", () => this.#e.settings.load(), (e) => {
				this.#h({
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
		this.#g({ width: e });
	}
	set_inspector_collapsed(e) {
		this.#g({ collapsed: e });
	}
	select_inspector_record(e) {
		this.#g({ selected_record: e });
	}
	submit_generation(e) {
		return Ei(() => this.#t.workbench.submit_command, (e) => {
			this.#s({ submit_command: e });
		}, async () => {
			let t = await this.#e.generation.submit(e);
			return this.#c(G(this.#t.workbench.jobs, t, (e) => e.job_id)), t;
		});
	}
	async cancel_generation(e) {
		let t = await this.#e.generation.cancel(e);
		this.#i || this.#c(G(this.#t.workbench.jobs, t, (e) => e.job_id));
	}
	async retry_generation(e) {
		let t = await this.#e.generation.retry(e);
		this.#i || this.#c(G(this.#t.workbench.jobs, t, (e) => e.job_id));
	}
	select_provider_profile(e) {
		this.#s({ active_profile_id: e });
	}
	async select_prompt_preset(e) {
		this.#u({ selected_preset_id: e });
		let t = await this.#e.prompt_presets.load_draft(e);
		this.#i || this.#u({ draft: t });
	}
	start_new_prompt_preset() {
		this.#u({
			selected_preset_id: null,
			draft: {
				id: null,
				display_name: "",
				group: null,
				fixed_positive_prompt: "",
				fixed_negative_prompt: "",
				replacement_rules: [],
				regex_rules: []
			}
		});
	}
	clear_prompt_draft() {
		this.#u({
			selected_preset_id: null,
			draft: null
		});
	}
	update_prompt_draft(e) {
		this.#t.prompt.draft && this.#u({ draft: {
			...this.#t.prompt.draft,
			...e
		} });
	}
	async remove_prompt_preset(e) {
		await this.#e.prompt_presets.remove(e), !this.#i && this.#u({
			presets: this.#t.prompt.presets.filter((t) => t.id !== e),
			selected_preset_id: this.#t.prompt.selected_preset_id === e ? null : this.#t.prompt.selected_preset_id,
			draft: this.#t.prompt.selected_preset_id === e ? null : this.#t.prompt.draft
		});
	}
	async bulk_remove_prompt_presets(e) {
		if (await this.#e.prompt_presets.bulk_remove(e), this.#i) return;
		let t = new Set(e);
		this.#u({
			presets: this.#t.prompt.presets.filter((e) => !t.has(e.id)),
			selected_preset_id: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.selected_preset_id,
			draft: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.draft
		});
	}
	test_prompt_regex(e, t) {
		return this.#e.prompt_presets.test_regex(e, t);
	}
	save_prompt_preset(e) {
		return Ei(() => this.#t.prompt.save_command, (e) => {
			this.#u({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#u({
				presets: G(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return Ei(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#d({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return Ei(() => this.#t.settings.update_command, (e) => {
			this.#h({ update_command: e });
		}, async () => {
			let t = await this.#e.settings.update(e);
			return this.#h({ settings: t }), t;
		});
	}
	test_diagnostics_connection() {
		return Ei(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#m({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return Ei(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#m({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	retry_migration() {
		return Ei(() => this.#t.settings.migration_retry_command, (e) => {
			this.#h({ migration_retry_command: e });
		}, async () => {
			let e = await this.#e.migration.retry();
			return this.#m({ migration: e }), e;
		});
	}
	async load_diagnostics_timeline() {
		let e = await this.#e.diagnostics.load_timeline();
		this.#i || this.#m({ timeline: e });
	}
	async save_provider_profile(e) {
		let t = await this.#e.profiles.save(e);
		return this.#i || this.#s({ profiles: G(this.#t.workbench.profiles, t, (e) => e.id) }), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e), this.#i || this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e) });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	acknowledge_http_origin(e) {
		return this.#e.settings.acknowledge_http_origin(e).then(() => this.#e.settings.load()).then((e) => {
			this.#i || this.#h({
				settings: e.settings,
				vocabulary_update_channel: e.vocabulary_update_channel
			});
		});
	}
	async set_vocabulary_update_channel(e) {
		await this.#e.settings.set_vocabulary_update_channel(e), this.#i || this.#h({ vocabulary_update_channel: e });
	}
	export_settings_archive() {
		return this.#e.settings.export_archive();
	}
	import_settings_archive(e) {
		return this.#e.settings.import_archive(e);
	}
	confirm_legacy_cleanup(e) {
		return this.#e.migration.confirm_legacy_cleanup(e).then(() => this.#e.migration.load()).then((e) => {
			this.#i || this.#m({ migration: e });
		});
	}
	set_active_asset_category(e) {
		this.#d({ active_category: e });
	}
	async save_asset(e, t) {
		let n = await this.#e.assets.save(e, t);
		this.#i || this.#d({ records: {
			...this.#t.assets.records,
			[e]: G(this.#t.assets.records[e], n, (e) => e.id)
		} });
	}
	async remove_asset(e, t) {
		await this.#e.assets.remove(e, t), !this.#i && this.#d({ records: {
			...this.#t.assets.records,
			[e]: this.#t.assets.records[e].filter((e) => e.id !== t)
		} });
	}
	async reorder_assets(e, t) {
		if (await this.#e.assets.reorder(e, t), this.#i) return;
		let n = new Map(this.#t.assets.records[e].map((e) => [e.id, e])), r = t.map((e) => n.get(e)).filter((e) => e !== void 0);
		this.#d({ records: {
			...this.#t.assets.records,
			[e]: r
		} });
	}
	search_vocabulary(e, t) {
		return this.#e.vocabulary.search(e, t);
	}
	load_more_vocabulary(e) {
		return this.#e.vocabulary.next_page(e);
	}
	async save_persona(e) {
		let t = await this.#e.personas.save(e);
		return this.#i || this.#f({ personas: this.#j(t) }), t;
	}
	async remove_persona(e) {
		await this.#e.personas.remove(e), this.#i || this.#f({ personas: this.#t.library.personas.filter((t) => t.id !== e) });
	}
	#j(e) {
		let t = G(this.#t.library.personas, e, (e) => e.id);
		return e.is_active ? t.map((t) => t.id === e.id || t.role !== e.role ? t : {
			...t,
			is_active: !1
		}) : t;
	}
	async save_knowledge_entry(e) {
		let t = await this.#e.knowledge.save(e);
		return this.#i || this.#f({ knowledge: G(this.#t.library.knowledge, t, (e) => e.id) }), t;
	}
	async set_knowledge_entry_enabled(e, t) {
		let n = await this.#e.knowledge.set_enabled(e, t);
		return this.#i || this.#f({ knowledge: G(this.#t.library.knowledge, n, (e) => e.id) }), n;
	}
	async remove_knowledge_entry(e) {
		await this.#e.knowledge.remove(e), this.#i || this.#M([e]);
	}
	set_knowledge_selection(e) {
		this.#f({ selected_knowledge_ids: [...e] });
	}
	async bulk_remove_knowledge_entries(e) {
		await this.#e.knowledge.bulk_remove(e), this.#i || this.#M(e);
	}
	#M(e) {
		let t = new Set(e);
		this.#f({
			knowledge: this.#t.library.knowledge.filter((e) => !t.has(e.id)),
			selected_knowledge_ids: this.#t.library.selected_knowledge_ids.filter((e) => !t.has(e))
		});
	}
	select_llm_connection(e) {
		this.#l({ selected_connection_id: e });
	}
	async save_llm_connection(e) {
		let t = await this.#e.llm_connections.save(e);
		return this.#i || this.#N(t), t;
	}
	async remove_llm_connection(e) {
		await this.#e.llm_connections.remove(e), !this.#i && this.#l({
			connections: this.#t.llm_connections.connections.filter((t) => t.id !== e),
			selected_connection_id: this.#t.llm_connections.selected_connection_id === e ? null : this.#t.llm_connections.selected_connection_id
		});
	}
	async set_llm_connection_credential(e, t) {
		let n = await this.#e.llm_connections.set_credential(e, t);
		return this.#i || this.#N(n), n;
	}
	async clear_llm_connection_credential(e) {
		let t = await this.#e.llm_connections.clear_credential(e);
		return this.#i || this.#N(t), t;
	}
	test_llm_connection(e) {
		return this.#e.llm_connections.test_connection(e);
	}
	#N(e) {
		let t = G(this.#t.llm_connections.connections, e, (e) => e.id);
		this.#l({ connections: e.is_default ? t.map((t) => t.id === e.id ? t : {
			...t,
			is_default: !1
		}) : t });
	}
	select_gallery_record(e) {
		this.#p({ selected_record_id: e });
	}
	read_gallery_bytes(e) {
		return this.#e.gallery.read_bytes(e);
	}
	async pin_gallery_record(e, t) {
		await this.#e.gallery.pin(e, t), !this.#i && this.#p({ records: this.#t.gallery.records.map((n) => n.id === e ? {
			...n,
			pinned: t
		} : n) });
	}
	async detach_gallery_record(e) {
		await this.#e.gallery.detach_from_message(e), !this.#i && this.#p({ records: this.#t.gallery.records.map((t) => t.id === e ? {
			...t,
			quarantined: !0
		} : t) });
	}
	async delete_gallery_record(e) {
		await this.#e.gallery.delete_record(e), !this.#i && this.#p({
			records: this.#t.gallery.records.filter((t) => t.id !== e),
			selected_record_id: this.#t.gallery.selected_record_id === e ? null : this.#t.gallery.selected_record_id
		});
	}
	bulk_delete_gallery_records(e) {
		return Ei(() => this.#t.gallery.bulk_delete_command, (e) => {
			this.#p({ bulk_delete_command: e });
		}, async () => {
			await this.#e.gallery.bulk_delete(e);
			let t = new Set(e);
			this.#p({
				records: this.#t.gallery.records.filter((e) => !t.has(e.id)),
				selected_record_id: this.#t.gallery.selected_record_id !== null && t.has(this.#t.gallery.selected_record_id) ? null : this.#t.gallery.selected_record_id
			});
		});
	}
};
function ki(e) {
	return new Oi(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function Ai(t) {
	let n = e(ki(t)), r = E(n.state), i = n.on_change(() => {
		r.value = n.state;
	});
	return n.start(), S(() => {
		i(), n.stop();
	}), {
		controller: n,
		state: r
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/activity.js
var ji = A("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), Mi = A("ellipsis", [
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
]), Ni = A("images", [
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
]), Pi = A("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]), Fi = A("layout-dashboard", [
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
]), Ii = A("library", [
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
]), Li = A("panel-right-close", [
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
]), Ri = A("panel-right-open", [
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
]), zi = A("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Bi = A("type", [
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
]), Vi = ["image", "video"], Hi = /^(?:blob:|data:image\/|data:video\/)/u, Ui = H({
	kind: F(Vi),
	url: L().min(1).refine((e) => Hi.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function Wi(e) {
	let t = Ui.safeParse(e);
	return t.success ? t.data : null;
}
function Gi(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: Wi(n)
	};
}
var Ki = 8;
function qi(e, t) {
	let n = Math.max(Ki, t.width - 56 - Ki), r = Math.max(Ki, t.height - 56 - Ki);
	return {
		x: Math.min(Math.max(e.x, Ki), n),
		y: Math.min(Math.max(e.y, Ki), r)
	};
}
function Ji(e) {
	return qi({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var Yi = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function Xi(e) {
	let t = Wi(e);
	return t !== null && t.kind === "image" ? t : null;
}
var Zi = class {
	#e;
	#t;
	#n = !1;
	#r = null;
	constructor(e) {
		this.#e = e, this.#t = this.#i();
	}
	get position() {
		return this.#t;
	}
	get dragging() {
		return this.#n;
	}
	begin_drag() {
		this.#n = !0, this.#r = this.#t;
	}
	drag_to(e) {
		this.#n && (this.#t = qi(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = Ji(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? Ji(t) : qi(e, t);
	}
}, Qi = "(min-width: 960px)";
function $i() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(Qi).matches;
}
function ea(e) {
	if (e !== void 0) return w(() => e);
	let t = O($i());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(Qi), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), S(() => {
			e.removeEventListener("change", n);
		});
	}
	return w(() => t.value ? "desktop" : "mobile");
}
var ta = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, na = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], ra = ["src"], ia = ["src"], aa = /* @__PURE__ */ N({
	__name: "FloatingEntry",
	props: {
		enabled: { type: Boolean },
		mediaState: { default: "idle" },
		mediaAssets: { default: () => ({}) },
		openLabel: { default: "Open TavernCanvas Studio" },
		positionStore: {},
		viewportOverride: {}
	},
	emits: ["open"],
	setup(t, { emit: n }) {
		let r = t, i = n, o = ea(r.viewportOverride);
		function s() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let u = new Zi({
			position_store: v(r.positionStore) ?? e(new Yi()),
			get_viewport: s,
			get_viewport_bucket: () => o.value
		}), d = O(u.position), f = O(u.dragging);
		function p() {
			d.value = u.position, f.value = u.dragging;
		}
		h(o, () => {
			u.reflow(), p();
		});
		function m() {
			u.reflow(), p();
		}
		l(() => {
			window.addEventListener("resize", m);
		}), c(() => {
			window.removeEventListener("resize", m);
		});
		let g = w(() => {
			let e = f.value ? "dragging" : r.mediaState;
			return e === "idle" ? {
				state: e,
				asset: Xi(r.mediaAssets.idle)
			} : Gi(r.mediaAssets, e);
		}), _ = !1;
		function b(e) {
			let t = e.currentTarget;
			if (!(t instanceof HTMLElement) || !e.isPrimary) return;
			let n = t;
			n.setPointerCapture(e.pointerId), u.begin_drag(), p();
			let r = {
				x: e.clientX,
				y: e.clientY
			}, i = u.position;
			function a(e) {
				u.drag_to({
					x: i.x + (e.clientX - r.x),
					y: i.y + (e.clientY - r.y)
				}), p();
			}
			function o() {
				n.removeEventListener("pointermove", a), n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", c), n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId);
				let { moved: t } = u.end_drag();
				p(), _ = t;
			}
			function s() {
				o();
			}
			function c() {
				o();
			}
			n.addEventListener("pointermove", a), n.addEventListener("pointerup", s), n.addEventListener("pointercancel", c);
		}
		function x() {
			if (_) {
				_ = !1;
				return;
			}
			i("open");
		}
		function S(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i("open"));
		}
		return (e, n) => t.enabled ? (a(), y("button", {
			key: 0,
			type: "button",
			class: C(["tc-interactive", [j(ta).floatingEntry, f.value && j(ta).floatingEntryDragging]]),
			style: te({
				left: `${d.value.x}px`,
				top: `${d.value.y}px`
			}),
			"aria-label": t.openLabel,
			"data-dragging": f.value,
			"data-media-state": g.value.state,
			onPointerdown: b,
			onClick: x,
			onKeydown: S
		}, [g.value.asset?.kind === "video" ? (a(), y("video", {
			key: 0,
			class: C(j(ta).floatingEntryMedia),
			src: g.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, ra)) : g.value.asset?.kind === "image" ? (a(), y("img", {
			key: 1,
			class: C(j(ta).floatingEntryMedia),
			src: g.value.asset.url,
			alt: ""
		}, null, 10, ia)) : (a(), M(oe, {
			key: 2,
			icon: j(Pi)
		}, null, 8, ["icon"]))], 46, na)) : le("", !0);
	}
}), oa = /* @__PURE__ */ N({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return s(xt, t.portalTarget), (e, t) => P(e.$slots, "default");
	}
}), sa = [
	"data-dragging",
	"aria-valuenow",
	"aria-label"
], ca = { class: "tc-tabular-nums" }, la = { key: 0 }, ua = 240, da = 720, fa = 16, pa = /* @__PURE__ */ N({
	__name: "ContextInspector",
	props: {
		width: {},
		selection: {}
	},
	emits: ["resize"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = _(), o = O(!1), s = w(() => {
			let e = n.selection;
			return e ? e.kind === "generation_job" ? i("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? i("common.inspector.selection.kind_gallery_record") : i("common.inspector.selection.kind_asset") : null;
		}), c = w(() => {
			let e = n.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), l = w(() => {
			let e = n.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return i("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return i("common.inspector.selection.intent_regenerate");
				case "edit": return i("common.inspector.selection.intent_edit");
				case "inpaint": return i("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		function u(e) {
			return Math.min(da, Math.max(ua, e));
		}
		function d(e) {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = e.clientX, i = n.width, a = e.pointerId, s = e.currentTarget;
			s.setPointerCapture(a), o.value = !0;
			function c(e) {
				let n = t - e.clientX;
				r("resize", u(i + n));
			}
			function l() {
				s.releasePointerCapture(a), s.removeEventListener("pointermove", c), s.removeEventListener("pointerup", l), s.removeEventListener("pointercancel", l), o.value = !1;
			}
			s.addEventListener("pointermove", c), s.addEventListener("pointerup", l), s.addEventListener("pointercancel", l);
		}
		function f(e) {
			e.key === "ArrowLeft" ? (e.preventDefault(), r("resize", u(n.width + fa))) : e.key === "ArrowRight" && (e.preventDefault(), r("resize", u(n.width - fa)));
		}
		return (t, r) => (a(), y("div", { class: C(j(U).inspector) }, [g("div", {
			role: "separator",
			"aria-orientation": "vertical",
			tabindex: "0",
			class: C(j(U).inspector_resizer),
			"data-dragging": o.value,
			"aria-valuenow": n.width,
			"aria-valuemin": ua,
			"aria-valuemax": da,
			"aria-label": j(i)("common.inspector.title"),
			onPointerdown: d,
			onKeydown: f
		}, null, 42, sa), g("div", { class: C(j(U).inspector_panel) }, [g("div", { class: C(j(U).inspector_header) }, [g("span", null, T(j(i)("common.inspector.title")), 1)], 2), g("div", { class: C(j(U).inspector_body) }, [e.selection ? (a(), y(k, { key: 0 }, [g("p", { class: C(j(U).inspector_selection_kind) }, T(s.value), 3), g("dl", { class: C(j(U).inspector_selection) }, [g("div", null, [g("dt", null, T(j(i)("common.inspector.selection.id_label")), 1), g("dd", ca, T(c.value), 1)]), l.value ? (a(), y("div", la, [g("dt", null, T(j(i)("common.inspector.selection.action_label")), 1), g("dd", null, T(l.value), 1)])) : le("", !0)], 2)], 64)) : (a(), y(k, { key: 1 }, [g("p", null, T(j(i)("common.inspector.empty_title")), 1), g("p", null, T(j(i)("common.inspector.empty_description")), 1)], 64))], 2)], 2)], 2));
	}
}), ma = ["INPUT", "TEXTAREA"];
function ha(e, t, n, r = {}) {
	if (!t || r.enableIgnoredElement && ma.includes(t.nodeName)) return null;
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
	return v || _ ? b = ga(y, t, {
		goForward: _ ? m : c === "ltr" ? d : f,
		loop: s
	}) : h ? b = y.at(0) || null : g && (b = y.at(-1) || null), u && b?.focus(), b;
}
function ga(e, t, n, r = e.includes(t) ? e.length : e.length + 1) {
	if (--r === 0) return null;
	let i = e.indexOf(t), a;
	if (a = i === -1 ? n.goForward ? 0 : e.length - 1 : n.goForward ? i + 1 : i - 1, !n.loop && (a < 0 || a >= e.length)) return null;
	let o = e[(a + e.length) % e.length];
	return o ? o.hasAttribute("disabled") && o.getAttribute("disabled") !== "false" ? ga(e, o, n, r) : o : null;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var _a = /* @__PURE__ */ N({
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
		return (e, n) => (a(), M(j(Vt), re(i(t)), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
});
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function va() {
	let e = O(!1);
	return l(() => {
		Ot("keydown", () => {
			e.value = !0;
		}, {
			capture: !0,
			passive: !0
		}), Ot(["pointerdown", "pointermove"], () => {
			e.value = !1;
		}, {
			capture: !0,
			passive: !0
		});
	}), e;
}
var ya = Dt(va), [ba, xa] = /*#__PURE__*/ At(["MenuRoot", "MenuSub"], "MenuContext"), [Sa, Ca] = /*#__PURE__*/ At("MenuRoot"), wa = /* @__PURE__ */ N({
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
		let n = e, r = t, { modal: i, dir: s } = ae(n), c = Ht(s), l = Ct(n, "open", r), u = O(), d = ya();
		return xa({
			open: l,
			onOpenChange: (e) => {
				l.value = e;
			},
			content: u,
			onContentChange: (e) => {
				u.value = e;
			}
		}), Ca({
			onClose: () => {
				l.value = !1;
			},
			isUsingKeyboardRef: d,
			dir: c,
			modal: i
		}), (e, t) => (a(), M(j(Pt), null, {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}));
	}
}), [Ta, Ea] = /*#__PURE__*/ At("MenuContent"), Da = /* @__PURE__ */ N({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ ee({
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
	}, { ...Yt }),
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
		let n = e, r = t, i = ba(), s = Sa(), { trapFocus: c, disableOutsidePointerEvents: l, loop: u } = ae(n);
		_t(), kt(l.value);
		let f = O(""), p = O(0), g = O(0), _ = O(null), v = O("right"), y = O(0), b = O(null), x = O(), { forwardRef: S, currentElement: C } = Ut(), { handleTypeaheadSearch: w } = yt(), T = O();
		function E(e) {
			let t = ha(e, T.value || Mt(), C.value, {
				loop: u.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !1,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			t && (T.value = t, t.scrollIntoView({ block: "nearest" }));
		}
		function D() {
			T.value && T.value.click();
		}
		let ee = O(), te = O();
		h(T, (e) => {
			if (te.value && (e === void 0 || e !== te.value.trigger.value)) {
				if (e === void 0) return;
				te.value.onOpenChange(!1), te.value = void 0;
			}
		}), h(C, (e) => {
			i.onContentChange(e);
		}), d(() => {
			window.clearTimeout(p.value);
		});
		function ne(e) {
			return v.value === _.value?.side && zt(e, _.value?.area);
		}
		async function k(e) {
			r("openAutoFocus", e), !e.defaultPrevented && (e.preventDefault(), C.value?.focus({ preventScroll: !0 }));
		}
		function re(e) {
			if (e.defaultPrevented) return;
			let t = e.target, n = t.closest("[data-reka-menu-content]") === e.currentTarget, r = ["input", "textarea"].includes(t.tagName.toLowerCase()), i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1, o = ha(e, Mt(), C.value, {
				loop: u.value,
				arrowKeyOptions: "vertical",
				dir: s?.dir.value,
				focus: !0,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (o) return o?.focus();
			if (e.code === "Space") return;
			let c = x.value?.getItems() ?? [];
			if (n && (e.key === "Tab" && s.modal.value && e.preventDefault(), !i && a && !r && w(e.key, c)), e.target !== C.value || !Wt.includes(e.key)) return;
			e.preventDefault();
			let l = [...c.map((e) => e.ref)];
			Lt.includes(e.key) && l.reverse(), qt(l);
		}
		function A(e) {
			e?.currentTarget?.contains?.(e.target) || (window.clearTimeout(p.value), f.value = "");
		}
		function ie(e) {
			if (!Bt(e)) return;
			let t = e.target, n = y.value !== e.clientX;
			if ((e?.currentTarget)?.contains(t) && n) {
				let t = e.clientX > y.value ? "right" : "left";
				v.value = t, y.value = e.clientX;
			}
		}
		function oe(e) {
			Bt(e) && ee.value && ee.value.focus();
		}
		return Ea({
			onItemEnter: (e) => !!ne(e),
			onItemLeave: (e) => ne(e) ? !0 : (["INPUT", "TEXTAREA"].includes(Mt()?.tagName || "") || C.value?.focus(), b.value = null, !1),
			onTriggerLeave: (e) => !!ne(e),
			searchRef: f,
			highlightedElement: T,
			onKeydownNavigation: E,
			onKeydownEnter: D,
			filterElement: ee,
			onFilterElementChange: (e) => {
				ee.value = e;
			},
			activeSubmenuContext: te,
			pointerGraceTimerRef: g,
			onPointerGraceIntentChange: (e) => {
				_.value = e;
			}
		}), (e, t) => (a(), M(j(Nt), {
			"as-child": "",
			trapped: j(c),
			onMountAutoFocus: k,
			onUnmountAutoFocus: t[7] ||= (e) => r("closeAutoFocus", e)
		}, {
			default: o(() => [m(j(Ft), {
				"as-child": "",
				"disable-outside-pointer-events": j(l),
				onEscapeKeyDown: t[2] ||= (e) => r("escapeKeyDown", e),
				onPointerDownOutside: t[3] ||= (e) => r("pointerDownOutside", e),
				onFocusOutside: t[4] ||= (e) => r("focusOutside", e),
				onInteractOutside: t[5] ||= (e) => r("interactOutside", e),
				onDismiss: t[6] ||= (e) => r("dismiss")
			}, {
				default: o(() => [m(j(an), {
					ref_key: "rovingFocusGroupRef",
					ref: x,
					"current-tab-stop-id": b.value,
					"onUpdate:currentTabStopId": t[0] ||= (e) => b.value = e,
					"as-child": "",
					orientation: "vertical",
					dir: j(s).dir.value,
					loop: j(u),
					onEntryFocus: t[1] ||= (e) => {
						r("entryFocus", e), j(s).isUsingKeyboardRef.value || e.preventDefault();
					}
				}, {
					default: o(() => [m(j(Kt), {
						ref: j(S),
						role: "menu",
						as: e.as,
						"as-child": e.asChild,
						"aria-orientation": "vertical",
						"data-reka-menu-content": "",
						"data-state": j(Gt)(j(i).open.value),
						dir: j(s).dir.value,
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
						onKeydown: re,
						onBlur: A,
						onPointermove: ie,
						onPointerenter: oe
					}, {
						default: o(() => [P(e.$slots, "default")]),
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
}), Oa = /* @__PURE__ */ N({
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
		let n = e, r = Ta(), { forwardRef: i, currentElement: s } = Ut(), { CollectionItem: c } = Jt(), l = O(!1), u = w(() => l.value || s.value != null && r.highlightedElement.value === s.value);
		async function d(e) {
			if (!(e.defaultPrevented || !Bt(e))) {
				if (n.disabled) r.onItemLeave(e);
				else if (!r.onItemEnter(e)) {
					let t = e.currentTarget;
					r.highlightedElement.value = t, ["INPUT", "TEXTAREA"].includes(Mt()?.tagName || "") || t.focus({ preventScroll: !0 });
				}
			}
		}
		async function f(e) {
			await D(), !e.defaultPrevented && Bt(e) && r.highlightedElement.value === s.value && !r.onItemLeave(e) && r.highlightedElement.value === s.value && (r.highlightedElement.value = void 0);
		}
		return (e, n) => (a(), M(j(c), { value: { textValue: e.textValue } }, {
			default: o(() => [m(j(wt), t({
				ref: j(i),
				role: "menuitem",
				tabindex: "-1"
			}, e.$attrs, {
				as: e.as,
				"as-child": e.asChild,
				"aria-disabled": e.disabled || void 0,
				"data-disabled": e.disabled ? "" : void 0,
				"data-highlighted": u.value ? "" : void 0,
				onPointermove: d,
				onPointerleave: f,
				onFocus: n[0] ||= async (t) => {
					await D(), !(t.defaultPrevented || e.disabled) && (l.value = !0, j(r).highlightedElement.value = t.currentTarget);
				},
				onBlur: n[1] ||= async (e) => {
					await D(), !e.defaultPrevented && (l.value = !1);
				}
			}), {
				default: o(() => [P(e.$slots, "default")]),
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
}), ka = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = e, i = n, { forwardRef: s, currentElement: c } = Ut(), l = Sa(), u = Ta(), d = O(!1);
		async function f() {
			let e = c.value;
			if (!r.disabled && e) {
				let e = new CustomEvent(Xt, {
					bubbles: !0,
					cancelable: !0
				});
				i("select", e), await D(), e.defaultPrevented ? d.value = !1 : l.onClose();
			}
		}
		return (e, n) => (a(), M(Oa, t(r, {
			ref: j(s),
			onClick: f,
			onPointerdown: n[0] ||= () => {
				d.value = !0;
			},
			onPointerup: n[1] ||= async (e) => {
				await D(), !e.defaultPrevented && (d.value || e.currentTarget?.click());
			},
			onKeydown: n[2] ||= async (t) => {
				let n = j(u).searchRef.value !== "";
				e.disabled || n && t.key === " " || j(Rt).includes(t.key) && (t.currentTarget?.click(), t.preventDefault());
			}
		}), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Aa = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = e, i = n, s = Tt(r, i), c = ba(), { forwardRef: l, currentElement: u } = Ut();
		return Et(u), (e, n) => (a(), M(Da, t(j(s), {
			ref: j(l),
			"trap-focus": j(c).open.value,
			"disable-outside-pointer-events": j(c).open.value,
			"disable-outside-scroll": !0,
			onDismiss: n[0] ||= (e) => j(c).onOpenChange(!1),
			onFocusOutside: n[1] ||= x((e) => i("focusOutside", e), ["prevent"])
		}), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, ["trap-focus", "disable-outside-pointer-events"]));
	}
}), ja = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = Tt(e, n), i = ba();
		return (e, n) => (a(), M(Da, t(j(r), {
			"trap-focus": !1,
			"disable-outside-pointer-events": !1,
			"disable-outside-scroll": !1,
			onDismiss: n[0] ||= (e) => j(i).onOpenChange(!1)
		}), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Ma = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = Tt(e, n), i = ba(), s = Sa();
		return (e, n) => (a(), M(j(Zt), { present: e.forceMount || j(i).open.value }, {
			default: o(() => [j(s).modal.value ? (a(), M(Aa, re(t({ key: 0 }, {
				...e.$attrs,
				...j(r)
			})), {
				default: o(() => [P(e.$slots, "default")]),
				_: 3
			}, 16)) : (a(), M(ja, re(t({ key: 1 }, {
				...e.$attrs,
				...j(r)
			})), {
				default: o(() => [P(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), Na = /* @__PURE__ */ N({
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
		return (e, n) => (a(), M(j(It), re(i(t)), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [Pa, Fa] = /*#__PURE__*/ At("DrawerProvider"), K = {
	swipeMovementX: "--drawer-swipe-movement-x",
	swipeMovementY: "--drawer-swipe-movement-y",
	snapPointOffset: "--drawer-snap-point-offset",
	height: "--drawer-height",
	frontmostHeight: "--drawer-frontmost-height",
	swipeProgress: "--drawer-swipe-progress",
	swipeStrength: "--drawer-swipe-strength",
	nestedDrawers: "--nested-drawers"
};
function Ia() {
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
function La(e, t, n) {
	switch (e) {
		case "up": return -n;
		case "down": return n;
		case "left": return -t;
		case "right": return t;
		default: return 0;
	}
}
var Ra = .2, za = 4, Ba = 80, Va = 360, Ha = .1, Ua = 1;
function Wa(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Ga(e) {
	let { direction: t, size: n, axisDelta: r, snapPointOffset: i, releaseVelocity: a } = e;
	if (!Number.isFinite(n) || n <= 0) return null;
	let o = 0;
	t === "down" || t === "right" ? o = i : (t === "up" || t === "left") && (o = -i);
	let s = o + r, c = t === "left" || t === "up" ? -s : s, l = Math.max(0, n - c);
	if (!Number.isFinite(l) || l <= 0) return null;
	let u = t === "left" || t === "up" ? -a : a;
	if (!Number.isFinite(u) || u <= Ra) return null;
	let d = Wa(l / Wa(u, Ra, za), Ba, Va);
	if (!Number.isFinite(d)) return null;
	let f = Wa(Ha + (d - Ba) / 280 * .9, Ha, Ua);
	return !Number.isFinite(f) || f <= 0 ? null : f;
}
var Ka = /matrix(?:3d)?\(([^)]+)\)/;
function qa(e) {
	let t = window.getComputedStyle(e).transform, n = 0, r = 0, i = 1;
	if (t && t !== "none") {
		let e = t.match(Ka);
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
var Ja = !1;
function Ya() {
	if (Ja || typeof CSS > "u" || !CSS.registerProperty) return;
	let e = [
		K.swipeMovementX,
		K.swipeMovementY,
		K.snapPointOffset
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
		name: K.swipeProgress,
		initialValue: "0"
	}, {
		name: K.swipeStrength,
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
	Ja = !0;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerRoot.js
var [Xa, Za] = /*#__PURE__*/ At("DrawerRoot"), Qa = /* @__PURE__ */ N({
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
		let n = e, r = t, i = O(n.defaultOpen), a = w({
			get: () => n.open ?? i.value,
			set: (e) => {
				i.value = e;
			}
		}), o = Ct(n, "snapPoint", r, {
			defaultValue: n.defaultSnapPoint ?? null,
			passive: n.snapPoint === void 0,
			eventName: "update:snapPoint"
		}), { modal: s, swipeDirection: c, snapPoints: l, snapToSequentialPoints: u } = ae(n), f = O(), p = O(), m = O(0), g = O(0), _ = O(!1), v = O(0), y = O(!1), b = O(!1), x = Ia(), S = Xa(null), C = Pa(null), T = jt(void 0, "reka-drawer-content"), E = jt(void 0, "reka-drawer-title"), D = jt(void 0, "reka-drawer-description");
		Za({
			open: a,
			modal: s,
			swipeDirection: c,
			snapPoints: l,
			activeSnapPoint: o,
			snapToSequentialPoints: u,
			popupHeight: m,
			frontmostHeight: g,
			hasNestedDrawer: _,
			nestedOpenDrawerCount: v,
			nestedSwiping: y,
			isSwiping: b,
			nestedSwipeProgressStore: x,
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
				m.value = e, C?.visualStateStore.set({ frontmostHeight: e });
			},
			onNestedFrontmostHeightChange(e) {
				g.value = e;
			},
			onNestedDrawerPresenceChange(e) {
				e ? v.value++ : v.value = Math.max(0, v.value - 1), _.value = v.value > 0, S?.notifyParentHasNestedDrawer?.(e);
			},
			onNestedSwipingChange(e) {
				y.value = e, S?.notifyParentSwipingChange?.(e);
			},
			onNestedSwipeProgressChange(e) {
				x.set(e), S?.notifyParentSwipeProgressChange?.(e), C?.visualStateStore.set({ swipeProgress: e });
			},
			onSwipingChange(e) {
				b.value = e;
			},
			notifyParentFrontmostHeight: S?.onNestedFrontmostHeightChange,
			notifyParentSwipingChange: S?.onNestedSwipingChange,
			notifyParentSwipeProgressChange: S?.onNestedSwipeProgressChange,
			notifyParentHasNestedDrawer: S?.onNestedDrawerPresenceChange,
			triggerElement: f,
			contentElement: p,
			contentId: T,
			titleId: E,
			descriptionId: D
		});
		function ee() {
			a.value && (i.value = !1, r("update:open", !1, { reason: "close-press" }));
		}
		return h(a, (e) => {
			e ? C?.setDrawerOpen(T, !0) : C?.setDrawerOpen(T, !1);
		}, { immediate: !0 }), d(() => {
			C?.removeDrawer(T);
		}), (e, t) => P(e.$slots, "default", {
			open: a.value,
			close: ee
		});
	}
}), $a = .5, eo = 300, to = 4, no = .5;
function ro(e, t, n) {
	let r = null;
	return typeof e == "number" ? r = e >= 0 && e <= 1 ? e * t : e : e.endsWith("rem") ? r = Number.parseFloat(e) * n : e.endsWith("px") && (r = Number.parseFloat(e)), r == null || !Number.isFinite(r) || r < 0 ? null : Math.round(r);
}
function io(e) {
	let { snapPoints: t, activeSnapPoint: n, popupHeight: r, viewportRef: i, onSnapPointChange: a } = e, o = O(typeof window < "u" ? window.innerHeight : 0), s = O(typeof document < "u" && Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
	typeof window < "u" && Ot(window, "resize", () => {
		o.value = window.innerHeight;
	});
	let c = w(() => {
		let e = t.value;
		if (!e || e.length === 0) return [];
		let n = o.value, i = s.value, a = r.value, c = [];
		for (let t of e) {
			let e = ro(t, n, i);
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
		let e = ro(n.value, o.value, s.value);
		return c.value.find((t) => t.value === n.value || e != null && Math.abs(t.height - e) <= 1);
	}
	let u = w(() => l()?.offset ?? null);
	function d(e, t, i, o) {
		let s = c.value;
		if (s.length === 0) return;
		let u = r.value, d = i === "up" || i === "down" ? t.y : t.x, f = i === "up" || i === "left" ? -d : d, p = l(), m = p?.offset ?? 0, h = Math.max(0, Math.min(u, m + e)), g = h;
		Math.abs(f) >= $a && (g = h + Math.max(-4, Math.min(to, f)) * eo);
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
			let i = Math.sign(e), o = Math.sign(f) === i && Math.abs(f) >= no, c = t[Math.max(0, Math.min(t.length - 1, r + i))];
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
var ao = 40, oo = 10, so = 1, co = 16, lo = 80, uo = "button,a,input,select,textarea,label,[role=\"button\"]";
function fo(e, t) {
	if (!e || e === document.body) return null;
	let n = window.getComputedStyle(e), r = t === "vertical" ? n.overflowY : n.overflowX;
	return (r === "auto" || r === "scroll") && (t === "vertical" ? e.scrollHeight > e.clientHeight : e.scrollWidth > e.clientWidth) ? e : fo(e.parentElement, t);
}
function po(e, t, n, r) {
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
function mo(e) {
	let { elementRef: t, directions: n, movementCssVars: r, swipeThreshold: i, canStart: a, onDismiss: o, onProgress: s, onCancel: c, onSwipeStart: l, onRelease: u, onSwipingChange: f } = e, p = w(() => b(n).includes("up") || b(n).includes("down")), m = w(() => b(n).includes("left") || b(n).includes("right")), g = w(() => b(n).includes("up")), _ = w(() => b(n).includes("down")), v = w(() => b(n).includes("left")), y = w(() => b(n).includes("right")), x = O(!1), S = O(void 0), C = O({
		x: 0,
		y: 0
	}), T = {
		x: 0,
		y: 0
	}, E, D = 0, ee = !1, te = !1, ne = !1, k = null, re = !1, A = null, ie = {
		width: 0,
		height: 0
	}, ae = 0, oe = null, se = {
		x: 0,
		y: 0
	}, j = null, M = null, N = !1;
	function ce(e, t) {
		return typeof i == "function" ? Math.max(0, i({
			element: e,
			direction: t
		})) : typeof i == "number" ? i : ao;
	}
	function le(e) {
		x.value !== e && (x.value = e, f?.(e));
	}
	function P(e, t) {
		if (oe && t > oe.time) {
			let n = Math.max(t - oe.time, co);
			se = {
				x: (e.x - oe.x) / n,
				y: (e.y - oe.y) / n
			};
		}
		oe = {
			x: e.x,
			y: e.y,
			time: t
		};
	}
	function ue(e, t, n) {
		e.style.setProperty(r.x, `${t}px`), e.style.setProperty(r.y, `${n}px`);
	}
	function de(e) {
		e.style.setProperty(r.x, "0px"), e.style.setProperty(r.y, "0px");
	}
	function fe() {
		le(!1), S.value = void 0, C.value = {
			x: 0,
			y: 0
		}, T = {
			x: 0,
			y: 0
		}, E = void 0, D = 0, ee = !1, te = !1, ne = !1, k = null, re = !1, A = null, ie = {
			width: 0,
			height: 0
		}, ae = 0, oe = null, se = {
			x: 0,
			y: 0
		}, j = null, M = null, N = !1;
	}
	function pe(e, t) {
		qa(e), T = t, k = t, ie = {
			width: e.offsetWidth,
			height: e.offsetHeight
		}, te = !0, ne = !0;
	}
	function me(e, t) {
		let n = (e) => e >= 0 ? e ** .5 : -(Math.abs(e) ** .5), r = (e, t, r) => !t && e < 0 || !r && e > 0 ? n(e) : e;
		return {
			x: m.value ? r(e, v.value, y.value) : n(e),
			y: p.value ? r(t, g.value, _.value) : n(t)
		};
	}
	function he(e, r, i) {
		let a = r.x - T.x, o = r.y - T.y;
		if (te) {
			te = !1;
			let e = Math.abs(a), t = Math.abs(o);
			j = p.value && m.value ? e > t ? "horizontal" : "vertical" : p.value ? "vertical" : "horizontal";
		}
		let c = j === "vertical" ? 0 : a, u = j === "horizontal" ? 0 : o, d = b(n).find((e) => La(e, c, u) > 0);
		if (ne && k) {
			if (!d) return;
			let e = La(d, r.x - k.x, r.y - k.y);
			if (Math.abs(e) < so) return;
			ne = !1, E = d, S.value = d, le(!0), l?.();
		}
		if (!x.value) return;
		let f = E ?? b(n)[0], h = La(f, c, u);
		ee || (D = Math.max(D, h), D > ao / 2 && D - h > oo && (ee = !0));
		let g = me(c, u);
		C.value = {
			x: g.x,
			y: g.y
		}, ue(e, g.x, g.y), P({
			x: g.x,
			y: g.y
		}, i);
		let _ = t.value;
		if (_) {
			let e = f === "up" || f === "down" ? ie.height || _.offsetHeight : ie.width || _.offsetWidth, t = ce(_, f), n = Math.min(1, Math.max(0, h / (e + t)));
			n !== ae && (ae = n, s?.(n, {
				deltaX: g.x,
				deltaY: g.y,
				direction: f
			}));
		}
	}
	function ge(e) {
		if (!x.value) {
			fe();
			return;
		}
		let t = La(E ?? b(n)[0], C.value.x, C.value.y), r = ce(e, E ?? b(n)[0]), i = performance.now(), a = (oe ? i - oe.time : Infinity) > lo ? {
			x: 0,
			y: 0
		} : se;
		if (u?.(a) !== !0) {
			let i = La(E ?? b(n)[0], a.x, a.y);
			!ee && (t >= r || i > .3) ? (e.setAttribute("data-swipe-dismissed", ""), o?.()) : (de(e), c?.());
		}
		fe();
	}
	function _e(n) {
		if (!b(e.enabled) || n.pointerType === "touch" || n.button !== 0 || a && !a() || n.target?.closest(uo)) return;
		let r = t.value;
		if (r) {
			pe(r, {
				x: n.clientX,
				y: n.clientY
			}), M = n.pointerId, N = !0;
			try {
				r.setPointerCapture(n.pointerId);
			} catch {}
		}
	}
	function ve(e) {
		if (!N || e.pointerId !== M) return;
		let n = t.value;
		n && e.buttons & 1 && he(n, {
			x: e.clientX,
			y: e.clientY
		}, e.timeStamp);
	}
	function ye(e) {
		if (!N || e.pointerId !== M) return;
		let n = t.value;
		n && ge(n);
	}
	function be(n) {
		if (!b(e.enabled) || a && !a()) return;
		let r = n.target;
		if (r?.closest(uo)) return;
		let i = t.value;
		if (!i) return;
		if (!e.ignoreScrollableAncestors) {
			let e = fo(r, p.value ? "vertical" : "horizontal");
			e && (re = !0, A = e);
		}
		let o = n.touches[0];
		o && pe(i, {
			x: o.clientX,
			y: o.clientY
		});
	}
	function xe(e) {
		let n = t.value;
		if (!n || !ne && !x.value) return;
		let r = e.touches[0];
		if (!r) return;
		let i = {
			x: r.clientX,
			y: r.clientY
		};
		if (re && ne && A) {
			let e = i.x - T.x, t = i.y - T.y, n = po(A, e, t, {
				hasVertical: p.value,
				hasHorizontal: m.value,
				allowUp: g.value,
				allowDown: _.value,
				allowLeft: v.value,
				allowRight: y.value
			});
			if (n === !1) {
				fe();
				return;
			}
			n === !0 && (re = !1, A = null);
		}
		let a = x.value;
		he(n, i, e.timeStamp), (a || x.value) && e.preventDefault();
	}
	function Se() {
		let e = t.value;
		e && ge(e);
	}
	let Ce = [];
	return h(() => t.value, (e) => {
		Ce.forEach((e) => e()), Ce.length = 0, e && Ce.push(Ot(e, "pointerdown", _e), Ot(e, "pointermove", ve), Ot(e, "pointerup", ye), Ot(e, "pointercancel", ye), Ot(e, "touchstart", be, { passive: !0 }), Ot(e, "touchmove", xe, { passive: !1 }), Ot(e, "touchend", Se), Ot(e, "touchcancel", Se));
	}, { immediate: !0 }), d(() => {
		Ce.forEach((e) => e()), Ce.length = 0, fe();
	}), {
		isSwiping: x,
		swipeDirection: S,
		dragOffset: C
	};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Drawer/DrawerContentImpl.js
var ho = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = e, i = n, s = Xa(), { forwardRef: c, currentElement: u } = Ut();
		Ya();
		let { activeSnapPointOffset: f, snapToNearest: p } = io({
			snapPoints: s.snapPoints,
			activeSnapPoint: s.activeSnapPoint,
			popupHeight: s.popupHeight,
			viewportRef: u,
			onSnapPointChange: (e) => {
				e === null ? s.onOpenChange(!1) : s.setActiveSnapPoint(e);
			}
		});
		function g() {
			let e = u.value;
			if (!e) return;
			let t = f.value;
			if (t != null) {
				let n = s.swipeDirection.value, r = n === "up" || n === "left" ? -t : t;
				e.style.setProperty(K.snapPointOffset, `${r}px`);
			} else e.style.setProperty(K.snapPointOffset, "0px");
		}
		h(f, g), Qt(u, ([e]) => {
			if (!e || s.hasNestedDrawer.value && s.popupHeight.value > 0) return;
			let t = e.contentRect.height;
			s.onPopupHeightChange(t), u.value?.style.setProperty(K.height, `${t}px`);
		}), h(() => s.frontmostHeight.value, (e) => {
			u.value?.style.setProperty(K.frontmostHeight, `${e}px`);
		});
		let _ = w(() => (s.snapPoints.value?.length ?? 0) > 0), v = w(() => {
			let e = s.swipeDirection.value;
			return _.value ? [e, {
				up: "down",
				down: "up",
				left: "right",
				right: "left"
			}[e]] : [e];
		}), y = {
			x: 0,
			y: 0
		}, { isSwiping: b, dragOffset: x } = mo({
			enabled: w(() => s.open.value),
			elementRef: u,
			directions: v,
			movementCssVars: {
				x: K.swipeMovementX,
				y: K.swipeMovementY
			},
			canStart: () => !s.nestedSwiping.value,
			onDismiss() {
				_.value || s.onOpenChange(!1, "swipe");
			},
			onRelease(e) {
				let t = u.value;
				if (t) {
					let n = s.swipeDirection.value, r = n === "left" || n === "right" ? t.offsetWidth : t.offsetHeight, i = n === "left" || n === "right" ? y.x : y.y, a = n === "left" || n === "right" ? e.x : e.y, o = Ga({
						direction: n,
						size: r,
						axisDelta: i,
						snapPointOffset: f.value ?? 0,
						releaseVelocity: a
					});
					o == null ? t.style.setProperty(K.swipeStrength, "1") : t.style.setProperty(K.swipeStrength, `${o}`);
				}
				if (_.value) {
					let n = s.swipeDirection.value, r = La(n, y.x, y.y);
					p(r, e, n, s.snapToSequentialPoints.value), t && (g(), t.style.setProperty(K.swipeMovementX, "0px"), t.style.setProperty(K.swipeMovementY, "0px"));
				}
				return _.value;
			},
			onSwipingChange(e) {
				s.onSwipingChange(e), s.onNestedSwipingChange(e);
			},
			onProgress(e, t) {
				t && (y = {
					x: t.deltaX,
					y: t.deltaY
				}), s.onNestedSwipeProgressChange(e);
			}
		}), S;
		function C() {
			b.value || (s.onOpenChange(!1, S ?? "outside-press"), S = void 0);
		}
		function T(e) {
			S = "escape-key", i("escapeKeyDown", e);
		}
		function E(e) {
			if (b.value) {
				e.preventDefault();
				return;
			}
			S = "outside-press", i("pointerDownOutside", e);
		}
		function D(e) {
			if (b.value) {
				e.preventDefault();
				return;
			}
			i("focusOutside", e);
		}
		function ee(e) {
			if (b.value) {
				e.preventDefault();
				return;
			}
			i("interactOutside", e);
		}
		let te;
		function ne() {
			te?.(), te = void 0;
		}
		h(() => s.open.value, (e) => {
			ne();
			let t = u.value;
			if (!t) {
				s.notifyOpenComplete(e);
				return;
			}
			let n = (n) => {
				n.target === t && (ne(), s.notifyOpenComplete(e));
			};
			t.addEventListener("transitionend", n), t.addEventListener("animationend", n), te = () => {
				t.removeEventListener("transitionend", n), t.removeEventListener("animationend", n);
			};
		});
		let O = w(() => {
			let e = {
				"data-state": s.open.value ? "open" : "closed",
				"data-swipe-direction": s.swipeDirection.value
			};
			return b.value && (e["data-swiping"] = ""), s.hasNestedDrawer.value && (e["data-nested-drawer-open"] = ""), e;
		});
		h(() => s.nestedOpenDrawerCount.value, (e) => {
			u.value?.style.setProperty(K.nestedDrawers, `${e}`);
		});
		let k;
		return l(() => {
			s.contentElement.value = u.value, s.notifyParentHasNestedDrawer?.(!0), u.value?.style.setProperty(K.nestedDrawers, `${s.nestedOpenDrawerCount.value}`), g(), k = s.nestedSwipeProgressStore.subscribe(() => {
				let e = s.nestedSwipeProgressStore.getSnapshot();
				u.value?.style.setProperty(K.swipeProgress, `${e}`);
			});
		}), d(() => {
			s.notifyParentHasNestedDrawer?.(!1), k?.(), ne();
		}), (e, n) => (a(), M(j(Nt), {
			"as-child": "",
			loop: "",
			trapped: r.trapFocus,
			onMountAutoFocus: n[0] ||= (e) => i("openAutoFocus", e),
			onUnmountAutoFocus: n[1] ||= (e) => i("closeAutoFocus", e)
		}, {
			default: o(() => [m(j(Ft), t({
				id: j(s).contentId,
				ref: j(c),
				as: e.as,
				"as-child": e.asChild,
				"disable-outside-pointer-events": e.disableOutsidePointerEvents,
				role: "dialog",
				"aria-describedby": j(s).descriptionId,
				"aria-labelledby": j(s).titleId
			}, {
				...O.value,
				...e.$attrs
			}, {
				onDismiss: C,
				onEscapeKeyDown: T,
				onFocusOutside: D,
				onInteractOutside: ee,
				onPointerDownOutside: E
			}), {
				default: o(() => [P(e.$slots, "default")]),
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
}), go = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = e, i = n, s = Xa(), c = St(i), { forwardRef: l, currentElement: u } = Ut(), d = O(!1), f = O(!1), p = w(() => s.modal.value === !0), m = w(() => s.modal.value === "trap-focus"), h = w(() => (p.value || m.value) && s.open.value), g = w(() => p.value ? u.value : void 0);
		Et(g);
		function _(e) {
			e.defaultPrevented || (d.value || s.triggerElement.value?.focus(), e.preventDefault()), d.value = !1, f.value = !1;
		}
		function v(e) {
			e.defaultPrevented || (d.value = !0, e.detail.originalEvent.type === "pointerdown" && (f.value = !0));
			let t = e.target;
			s.triggerElement.value?.contains(t) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && f.value && e.preventDefault();
		}
		return (e, n) => (a(), M(j(Zt), { present: e.forceMount || j(s).open.value }, {
			default: o(() => [p.value ? (a(), M(ho, t({
				key: 0,
				ref: j(l)
			}, {
				...r,
				...j(c),
				...e.$attrs
			}, {
				"trap-focus": h.value,
				"disable-outside-pointer-events": !0,
				onCloseAutoFocus: n[0] ||= (e) => {
					e.defaultPrevented || (e.preventDefault(), j(s).triggerElement.value?.focus());
				},
				onPointerDownOutside: n[1] ||= (e) => {
					let t = e.detail.originalEvent;
					(t.button === 2 || t.button === 0 && t.ctrlKey) && e.preventDefault();
				},
				onFocusOutside: n[2] ||= (e) => e.preventDefault()
			}), {
				default: o(() => [P(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"])) : (a(), M(ho, t({
				key: 1,
				ref: j(l)
			}, {
				...r,
				...j(c),
				...e.$attrs
			}, {
				"trap-focus": h.value,
				"disable-outside-pointer-events": !1,
				onCloseAutoFocus: _,
				onInteractOutside: v
			}), {
				default: o(() => [P(e.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]))]),
			_: 3
		}, 8, ["present"]));
	}
}), _o = /* @__PURE__ */ N({
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
		let n = e;
		Ut();
		let r = Xa();
		return (e, i) => (a(), M(j(wt), t(n, { id: j(r).descriptionId }), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), vo = /* @__PURE__ */ N({
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
		let n = e;
		Ut();
		let r = Xa();
		return (e, i) => (a(), M(j(wt), t(n, {
			"aria-hidden": "true",
			"data-state": j(r).open.value ? "open" : "closed"
		}), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, ["data-state"]));
	}
}), yo = /* @__PURE__ */ N({
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
		let n = Xa(), r = kt(n.open.value);
		h(() => n.open.value, (e) => {
			r.value = e;
		}, { immediate: !0 }), Ut();
		let i = w(() => {
			let e = {
				"data-state": n.open.value ? "open" : "closed",
				"data-swipe-direction": n.swipeDirection.value
			};
			return n.isSwiping.value && (e["data-swiping"] = ""), e;
		});
		return (e, n) => (a(), M(j(wt), t({
			as: e.as,
			"as-child": e.asChild
		}, i.value, { style: {
			pointerEvents: "auto",
			userSelect: "none",
			[j(K).swipeProgress]: "0",
			[j(K).swipeStrength]: "1"
		} }), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"style"
		]));
	}
}), bo = /* @__PURE__ */ N({
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
		let n = Xa(), r = !!n.notifyParentHasNestedDrawer, { forwardRef: i } = Ut();
		return (e, s) => j(n).modal.value && (!r || e.forceRender) ? (a(), M(j(Zt), {
			key: 0,
			present: e.forceMount || j(n).open.value
		}, {
			default: o(() => [m(yo, t(e.$attrs, {
				ref: j(i),
				as: e.as,
				"as-child": e.asChild
			}), {
				default: o(() => [P(e.$slots, "default")]),
				_: 3
			}, 16, ["as", "as-child"])]),
			_: 3
		}, 8, ["present"])) : le("v-if", !0);
	}
}), xo = /* @__PURE__ */ N({
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
		return (e, t) => (a(), M(j(It), re(i(e.$props)), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), So = /* @__PURE__ */ N({
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
		let n = e, r = Xa();
		return Ut(), (e, i) => (a(), M(j(wt), t(n, { id: j(r).titleId }), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, ["id"]));
	}
}), [Co, wo] = /*#__PURE__*/ At("DropdownMenuRoot"), To = /* @__PURE__ */ N({
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
		Ut();
		let i = Ct(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		}), s = O(), { modal: c, dir: l } = ae(n), u = Ht(l);
		return wo({
			open: i,
			onOpenChange: (e) => {
				i.value = e;
			},
			onOpenToggle: () => {
				i.value = !i.value;
			},
			triggerId: "",
			triggerElement: s,
			contentId: "",
			modal: c,
			dir: u
		}), (e, t) => (a(), M(j(wa), {
			open: j(i),
			"onUpdate:open": t[0] ||= (e) => f(i) ? i.value = e : null,
			dir: j(u),
			modal: j(c)
		}, {
			default: o(() => [P(e.$slots, "default", { open: j(i) })]),
			_: 3
		}, 8, [
			"open",
			"dir",
			"modal"
		]));
	}
}), Eo = /* @__PURE__ */ N({
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
	setup(e, { emit: n }) {
		let r = Tt(e, n);
		Ut();
		let i = Co(), s = O(!1);
		function c(e) {
			e.defaultPrevented || (s.value || setTimeout(() => {
				i.triggerElement.value?.focus();
			}, 0), s.value = !1, e.preventDefault());
		}
		return i.contentId ||= jt(void 0, "reka-dropdown-menu-content"), (e, n) => (a(), M(j(Ma), t(j(r), {
			id: j(i).contentId,
			"aria-labelledby": j(i)?.triggerId,
			style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			},
			onCloseAutoFocus: c,
			onInteractOutside: n[0] ||= (e) => {
				if (e.defaultPrevented) return;
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
				(!j(i).modal.value || r) && (s.value = !0), j(i).triggerElement.value?.contains(e.target) && e.preventDefault();
			}
		}), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16, ["id", "aria-labelledby"]));
	}
}), Do = /* @__PURE__ */ N({
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
		let n = e, r = St(t);
		return Ut(), (e, t) => (a(), M(j(ka), re(i({
			...n,
			...j(r)
		})), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), Oo = /* @__PURE__ */ N({
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
		return (e, n) => (a(), M(j(Na), re(i(t)), {
			default: o(() => [P(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), ko = /* @__PURE__ */ N({
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
		let t = e, n = Co(), { forwardRef: r, currentElement: i } = Ut();
		return l(() => {
			n.triggerElement = i;
		}), n.triggerId ||= jt(void 0, "reka-dropdown-menu-trigger"), (e, i) => (a(), M(j(_a), { "as-child": "" }, {
			default: o(() => [m(j(wt), {
				id: j(n).triggerId,
				ref: j(r),
				type: e.as === "button" ? "button" : void 0,
				"as-child": t.asChild,
				as: e.as,
				"aria-haspopup": "menu",
				"aria-expanded": j(n).open.value,
				"aria-controls": j(n).open.value ? j(n).contentId : void 0,
				"data-disabled": e.disabled ? "" : void 0,
				disabled: e.disabled,
				"data-state": j(n).open.value ? "open" : "closed",
				onClick: i[0] ||= async (t) => {
					!e.disabled && t.button === 0 && t.ctrlKey === !1 && (j(n)?.onOpenToggle(), await D(), j(n).open.value && t.preventDefault());
				},
				onKeydown: i[1] ||= se((t) => {
					e.disabled || (["Enter", " "].includes(t.key) && j(n).onOpenToggle(), t.key === "ArrowDown" && j(n).onOpenChange(!0), [
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
				default: o(() => [P(e.$slots, "default")]),
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
}), Ao = 1.75, jo = [
	{
		route: "workbench",
		icon: Fi,
		label_key: "nav.workbench"
	},
	{
		route: "prompt",
		icon: Bi,
		label_key: "nav.prompt"
	},
	{
		route: "assets",
		icon: Ii,
		label_key: "nav.assets"
	},
	{
		route: "gallery",
		icon: Ni,
		label_key: "nav.gallery"
	},
	{
		route: "diagnostics",
		icon: ji,
		label_key: "nav.diagnostics"
	},
	{
		route: "settings",
		icon: zi,
		label_key: "nav.settings"
	}
], Mo = [
	"workbench",
	"prompt",
	"assets",
	"gallery"
], No = ["diagnostics", "settings"];
function Po(e) {
	let t = jo.find((t) => t.route === e);
	if (t === void 0) throw Error(`No nav item registered for route "${e}"`);
	return t;
}
function Fo(e, t) {
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
function Io() {
	let e = u(xt);
	if (e === void 0) throw Error("No portal target was provided: every Reka portal must render inside the Shadow Root's dedicated portal element (see contracts/portal_keys.ts). Wrap this component tree in <PortalProvider>.");
	return e;
}
//#endregion
//#region src/ui/shell/DesktopIconRail.vue?vue&type=script&setup=true&lang.ts
var Lo = [
	"data-selected",
	"aria-current",
	"aria-label",
	"onClick"
], Ro = /* @__PURE__ */ N({
	__name: "DesktopIconRail",
	props: { route: {} },
	emits: ["select"],
	setup(e, { emit: t }) {
		let r = e, i = t, { t: s } = _(), c = Io(), l = w(() => jo.map((e) => ({
			...e,
			label: Fo(s, e.route)
		})));
		return (e, t) => (a(), M(j($t), { "delay-duration": 300 }, {
			default: o(() => [g("nav", { class: C(j(U).rail) }, [(a(!0), y(k, null, p(l.value, (e) => (a(), M(j(en), { key: e.route }, {
				default: o(() => [m(j(rn), { "as-child": "" }, {
					default: o(() => [g("button", {
						type: "button",
						class: C(["tc-interactive", j(U).rail_button]),
						"data-selected": e.route === r.route,
						"aria-current": e.route === r.route ? "page" : void 0,
						"aria-label": e.label,
						onClick: (t) => i("select", e.route)
					}, [(a(), M(n(e.icon), {
						size: 20,
						"stroke-width": j(Ao),
						"aria-hidden": "true"
					}, null, 8, ["stroke-width"]))], 10, Lo)]),
					_: 2
				}, 1024), m(j(tn), { to: j(c) }, {
					default: o(() => [m(j(nn), {
						class: C(j(U).tooltip_content),
						side: "right",
						"side-offset": 8
					}, {
						default: o(() => [ce(T(e.label), 1)]),
						_: 2
					}, 1032, ["class"])]),
					_: 2
				}, 1032, ["to"])]),
				_: 2
			}, 1024))), 128))], 2)]),
			_: 1
		}));
	}
}), zo = ["aria-label"], Bo = { class: "tc-tabular-nums" }, Vo = { key: 0 }, Ho = /* @__PURE__ */ N({
	__name: "InspectorSheet",
	props: {
		open: { type: Boolean },
		selection: {}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = _(), s = Io();
		function c() {
			r("update:open", !1);
		}
		function l(e) {
			let t = e.activeElement;
			return t?.shadowRoot ? l(t.shadowRoot) : t;
		}
		let u = null;
		h(() => n.open, (e) => {
			if (e) {
				let e = l(document);
				u = e instanceof HTMLElement ? e : null;
			}
		});
		function d(e) {
			e.preventDefault(), u?.focus(), u = null;
		}
		let f = w(() => {
			let e = n.selection;
			return e ? e.kind === "generation_job" ? i("common.inspector.selection.kind_generation_job") : e.kind === "gallery_record" ? i("common.inspector.selection.kind_gallery_record") : i("common.inspector.selection.kind_asset") : null;
		}), p = w(() => {
			let e = n.selection;
			return e ? e.kind === "generation_job" ? e.job_id : e.kind === "gallery_record" ? e.record_id : e.asset_id : null;
		}), v = w(() => {
			let e = n.selection;
			if (e?.kind !== "gallery_record") return null;
			switch (e.intent) {
				case "modify_prompt": return i("common.inspector.selection.intent_modify_prompt");
				case "regenerate": return i("common.inspector.selection.intent_regenerate");
				case "edit": return i("common.inspector.selection.intent_edit");
				case "inpaint": return i("common.inspector.selection.intent_inpaint");
				default: return null;
			}
		});
		return (t, n) => (a(), M(j(Qa), {
			open: e.open,
			modal: "",
			"swipe-direction": "down",
			"onUpdate:open": n[0] ||= (e) => r("update:open", e)
		}, {
			default: o(() => [m(j(xo), { to: j(s) }, {
				default: o(() => [m(j(bo), { class: C(j(U).sheet_overlay) }, null, 8, ["class"]), m(j(go), {
					class: C(j(U).sheet_content),
					"data-testid": "inspector-sheet",
					onCloseAutoFocus: d
				}, {
					default: o(() => [
						m(j(vo), { class: C(j(U).sheet_handle) }, null, 8, ["class"]),
						m(j(So), { class: "tc-visually-hidden" }, {
							default: o(() => [ce(T(j(i)("common.inspector.title")), 1)]),
							_: 1
						}),
						m(j(_o), { class: "tc-visually-hidden" }, {
							default: o(() => [ce(T(j(i)("common.inspector.empty_description")), 1)]),
							_: 1
						}),
						g("div", { class: C(j(U).sheet_header) }, [g("span", null, T(j(i)("common.inspector.title")), 1), g("button", {
							type: "button",
							class: C(["tc-interactive", j(U).icon_button]),
							"aria-label": j(i)("common.actions.close"),
							onClick: c
						}, [m(j(ne), {
							size: 18,
							"stroke-width": j(Ao),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])], 10, zo)], 2),
						g("div", { class: C(j(U).sheet_body) }, [e.selection ? (a(), y(k, { key: 0 }, [g("p", { class: C(j(U).inspector_selection_kind) }, T(f.value), 3), g("dl", { class: C(j(U).inspector_selection) }, [g("div", null, [g("dt", null, T(j(i)("common.inspector.selection.id_label")), 1), g("dd", Bo, T(p.value), 1)]), v.value ? (a(), y("div", Vo, [g("dt", null, T(j(i)("common.inspector.selection.action_label")), 1), g("dd", null, T(v.value), 1)])) : le("", !0)], 2)], 64)) : (a(), y(k, { key: 1 }, [g("p", null, T(j(i)("common.inspector.empty_title")), 1), g("p", null, T(j(i)("common.inspector.empty_description")), 1)], 64))], 2)
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		}, 8, ["open"]));
	}
}), Uo = [
	"data-selected",
	"aria-current",
	"onClick"
], Wo = ["data-selected", "aria-label"], Go = /* @__PURE__ */ N({
	__name: "MobileBottomNav",
	props: { route: {} },
	emits: ["select"],
	setup(e, { emit: t }) {
		let r = e, i = t, { t: s } = _(), c = Io(), l = w(() => Mo.map((e) => ({
			...Po(e),
			label: Fo(s, e)
		}))), u = w(() => No.map((e) => ({
			...Po(e),
			label: Fo(s, e)
		}))), d = w(() => No.includes(r.route)), f = w(() => s("nav.more"));
		function h(e) {
			i("select", e);
		}
		return (e, t) => (a(), y("nav", { class: C(j(U).bottom_nav) }, [(a(!0), y(k, null, p(l.value, (e) => (a(), y("button", {
			key: e.route,
			type: "button",
			class: C(["tc-interactive", j(U).bottom_nav_item]),
			"data-selected": e.route === r.route,
			"aria-current": e.route === r.route ? "page" : void 0,
			onClick: (t) => h(e.route)
		}, [(a(), M(n(e.icon), {
			size: 20,
			"stroke-width": j(Ao),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"])), g("span", { class: C(j(U).bottom_nav_item_label) }, T(e.label), 3)], 10, Uo))), 128)), m(j(To), null, {
			default: o(() => [m(j(ko), { "as-child": "" }, {
				default: o(() => [g("button", {
					type: "button",
					class: C(["tc-interactive", j(U).bottom_nav_item]),
					"data-selected": d.value,
					"aria-label": f.value,
					"data-testid": "mobile-more-trigger"
				}, [m(j(Mi), {
					size: 20,
					"stroke-width": j(Ao),
					"aria-hidden": "true"
				}, null, 8, ["stroke-width"]), g("span", { class: C(j(U).bottom_nav_item_label) }, T(f.value), 3)], 10, Wo)]),
				_: 1
			}), m(j(Oo), { to: j(c) }, {
				default: o(() => [m(j(Eo), {
					class: C(j(U).more_menu_content),
					side: "top",
					"side-offset": 8,
					align: "end"
				}, {
					default: o(() => [(a(!0), y(k, null, p(u.value, (e) => (a(), M(j(Do), {
						key: e.route,
						class: C(j(U).more_menu_item),
						onSelect: (t) => h(e.route)
					}, {
						default: o(() => [(a(), M(n(e.icon), {
							size: 16,
							"stroke-width": j(Ao),
							"aria-hidden": "true"
						}, null, 8, ["stroke-width"])), ce(" " + T(e.label), 1)]),
						_: 2
					}, 1032, ["class", "onSelect"]))), 128))]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["to"])]),
			_: 1
		})], 2));
	}
});
//#endregion
//#region src/ui/shell/use_generation_preview_urls.ts
function Ko(e, t) {
	let n = E({}), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
	function a(a) {
		a in n.value || r.has(a) || i.has(a) || (r.add(a), t.read_gallery_bytes(a).then((t) => {
			let r = e().gallery.records.find((e) => e.id === a)?.media_type, i = new Blob([new Uint8Array(t)], r ? { type: r } : {}), o = URL.createObjectURL(i);
			n.value = {
				...n.value,
				[a]: o
			};
		}).catch(() => {
			i.add(a);
		}).finally(() => {
			r.delete(a);
		}));
	}
	return h(() => e().workbench.jobs.flatMap((e) => e.completed_image_ids), (e) => {
		for (let t of e) a(t);
	}, { immediate: !0 }), S(() => {
		for (let e of Object.values(n.value)) URL.revokeObjectURL(e);
	}), n;
}
//#endregion
//#region src/ui/shell/StudioWorkspace.vue
var qo = /* @__PURE__ */ N({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = r(() => import("./chunks/WorkbenchView-BS2hnXMv.js")), n = r(() => import("./chunks/PromptView-CzcfWjzg.js")), i = r(() => import("./chunks/AssetsView-DyKNmfOo.js")), o = r(() => import("./chunks/GalleryView-Ba3I8i2Q.js")), s = r(() => import("./chunks/DiagnosticsView-DrJ1wPMP.js")), c = r(() => import("./chunks/SettingsView-CeAegH4D.js")), l = e, u = Ko(() => l.state, l.controller);
		function d(e, t) {
			return l.controller.test_prompt_regex(e, t);
		}
		return (e, r) => l.state.route === "workbench" ? (a(), M(j(t), {
			key: 0,
			state: l.state,
			"preview-urls": j(u),
			onSelectProfile: r[0] ||= (e) => l.controller.select_provider_profile(e),
			onSubmit: r[1] ||= (e) => void l.controller.submit_generation(e),
			onCancelJob: r[2] ||= (e) => void l.controller.cancel_generation(e),
			onRetryJob: r[3] ||= (e) => void l.controller.retry_generation(e),
			onOpenSettings: r[4] ||= (e) => l.controller.set_route("settings"),
			onConsumeInspectorSelection: r[5] ||= (e) => l.controller.select_inspector_record(null)
		}, null, 8, ["state", "preview-urls"])) : l.state.route === "prompt" ? (a(), M(j(n), {
			key: 1,
			state: l.state,
			"test-regex": d,
			onSelectPreset: r[6] ||= (e) => void l.controller.select_prompt_preset(e),
			onNewPreset: r[7] ||= (e) => l.controller.start_new_prompt_preset(),
			onBulkDeletePresets: r[8] ||= (e) => void l.controller.bulk_remove_prompt_presets(e),
			onUpdateDraft: r[9] ||= (e) => l.controller.update_prompt_draft(e),
			onSave: r[10] ||= (e) => void l.controller.save_prompt_preset(e)
		}, null, 8, ["state"])) : l.state.route === "assets" ? (a(), M(j(i), {
			key: 2,
			state: l.state,
			controller: l.controller
		}, null, 8, ["state", "controller"])) : l.state.route === "gallery" ? (a(), M(j(o), {
			key: 3,
			state: l.state,
			controller: l.controller
		}, null, 8, ["state", "controller"])) : l.state.route === "diagnostics" ? (a(), M(j(s), {
			key: 4,
			state: l.state,
			controller: l.controller
		}, null, 8, ["state", "controller"])) : (a(), M(j(c), {
			key: 5,
			state: l.state,
			controller: l.controller
		}, null, 8, ["state", "controller"]));
	}
}), Jo = ["aria-label", "aria-expanded"], Yo = ["data-status"], Xo = {
	key: 0,
	class: "tc-tabular-nums"
}, Zo = /* @__PURE__ */ N({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(e) {
		let t = e, { t: r, n: i } = _(), o = O(!0), s = {
			"status.loading": () => r("status.loading"),
			"status.empty": () => r("status.empty"),
			"status.partial": () => r("status.partial"),
			"status.error": () => r("status.error"),
			"status.disabled": () => r("status.disabled"),
			"status.success": () => r("status.success"),
			"status.pending": () => r("status.pending"),
			"status.running": () => r("status.running"),
			"status.cancelled": () => r("status.cancelled"),
			"status.completed": () => r("status.completed"),
			"status.failed": () => r("status.failed"),
			"status.retrying": () => r("status.retrying"),
			"status.online": () => r("status.online"),
			"status.offline": () => r("status.offline"),
			"status.connected": () => r("status.connected"),
			"status.blocked": () => r("status.blocked"),
			"status.unknown": () => r("status.unknown")
		};
		function c(e) {
			return s[e]?.() ?? e;
		}
		let l = w(() => o.value ? r("nav.task_strip_collapse") : r("nav.task_strip_expand"));
		function u() {
			o.value = !o.value;
		}
		return (e, s) => t.tasks.length > 0 ? (a(), y("div", {
			key: 0,
			class: C(j(U).task_strip)
		}, [g("div", { class: C(j(U).task_strip_header) }, [g("span", { class: C([j(U).task_strip_summary, "tc-tabular-nums"]) }, T(j(r)("nav.task_strip_count", t.tasks.length)), 3), g("button", {
			type: "button",
			class: C(["tc-interactive", j(U).icon_button]),
			"aria-label": l.value,
			"aria-expanded": o.value,
			onClick: u
		}, [(a(), M(n(o.value ? j(vt) : j(bt)), {
			size: 16,
			"stroke-width": j(Ao),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, Jo)], 2), o.value ? (a(), y("div", {
			key: 0,
			class: C(j(U).task_strip_list)
		}, [(a(!0), y(k, null, p(t.tasks, (e) => (a(), y("div", {
			key: e.id,
			class: C(j(U).task_chip)
		}, [
			g("span", {
				class: C(j(U).task_chip_dot),
				"data-status": e.status
			}, null, 10, Yo),
			g("span", { class: C(j(U).task_chip_label) }, T(c(e.label_code)), 3),
			e.progress === null ? le("", !0) : (a(), y("span", Xo, T(j(i)(e.progress, "percent")), 1))
		], 2))), 128))], 2)) : le("", !0)], 2)) : le("", !0);
	}
}), Qo = ["aria-label", "aria-pressed"], $o = /* @__PURE__ */ N({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean }
	},
	emits: ["set-inspector-collapsed"],
	setup(e, { emit: t }) {
		let r = e, i = t, { t: o } = _(), s = w(() => Fo(o, r.route)), c = w(() => r.inspectorCollapsed ? Ri : Li), l = w(() => r.inspectorCollapsed ? o("nav.inspector_expand") : o("nav.inspector_collapse"));
		function u() {
			i("set-inspector-collapsed", !r.inspectorCollapsed);
		}
		return (t, r) => (a(), y("header", { class: C(j(U).top_bar) }, [g("div", { class: C(j(U).top_bar_start) }, [g("span", { class: C(j(U).top_bar_title) }, T(s.value), 3)], 2), g("div", { class: C(j(U).top_bar_end) }, [g("button", {
			type: "button",
			class: C(["tc-interactive", j(U).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": l.value,
			"aria-pressed": !e.inspectorCollapsed,
			onClick: u
		}, [(a(), M(n(c.value), {
			size: 18,
			"stroke-width": j(Ao),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, Qo)], 2)], 2));
	}
}), es = ["data-viewport", "data-inspector-collapsed"], ts = ["aria-label"], ns = /* @__PURE__ */ N({
	__name: "StudioShell",
	props: {
		state: {},
		controller: {},
		viewport: {}
	},
	emits: [
		"select-route",
		"set-inspector-collapsed",
		"resize-inspector"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = _(), o = ea(n.viewport), s = w(() => n.state.loading.size > 0), c = w(() => n.state.failures.size > 0), l = w(() => ({ "--tc-inspector-width": `${String(n.state.inspector.width)}px` })), u = O(!1), d = w(() => o.value === "mobile" ? !u.value : n.state.inspector.collapsed);
		function f(e) {
			o.value === "mobile" && (u.value = !e), r("set-inspector-collapsed", e);
		}
		function p(e) {
			r("select-route", e);
		}
		return (e, t) => (a(), y("div", {
			class: C(j(U).shell),
			"data-viewport": j(o),
			"data-inspector-collapsed": j(o) === "desktop" ? n.state.inspector.collapsed : null,
			style: te(l.value)
		}, [
			m($o, {
				route: n.state.route,
				"inspector-collapsed": d.value,
				onSetInspectorCollapsed: f
			}, null, 8, ["route", "inspector-collapsed"]),
			j(o) === "desktop" ? (a(), M(Ro, {
				key: 0,
				route: n.state.route,
				onSelect: p
			}, null, 8, ["route"])) : le("", !0),
			g("main", {
				class: C(j(U).workspace),
				"data-testid": "workspace"
			}, [c.value ? (a(), y("div", {
				key: 0,
				class: C(j(U).partial_banner),
				"data-testid": "partial-banner"
			}, [g("div", null, [g("p", null, T(j(i)("app.partial_init.banner_title")), 1), g("p", null, T(j(i)("app.partial_init.banner_description")), 1)]), g("button", {
				type: "button",
				class: C(["tc-interactive", j(U).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: t[0] ||= (e) => p("diagnostics")
			}, T(j(Fo)(j(i), "diagnostics")), 3)], 2)) : le("", !0), s.value ? (a(), y("div", {
				key: 1,
				class: C(j(U).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": j(i)("status.loading")
			}, [
				g("div", {
					class: C(j(U).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				g("div", {
					class: C(j(U).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				g("div", {
					class: C(j(U).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, ts)) : (a(), M(qo, {
				key: 2,
				state: n.state,
				controller: n.controller
			}, null, 8, ["state", "controller"]))], 2),
			j(o) === "desktop" && !n.state.inspector.collapsed ? (a(), M(pa, {
				key: 1,
				width: n.state.inspector.width,
				selection: n.state.inspector.selected_record,
				onResize: t[1] ||= (e) => r("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : le("", !0),
			m(Zo, { tasks: n.state.tasks }, null, 8, ["tasks"]),
			j(o) === "mobile" ? (a(), M(Go, {
				key: 2,
				route: n.state.route,
				onSelect: p
			}, null, 8, ["route"])) : le("", !0),
			j(o) === "mobile" ? (a(), M(Ho, {
				key: 3,
				open: u.value,
				selection: n.state.inspector.selected_record,
				"onUpdate:open": t[2] ||= (e) => f(!e)
			}, null, 8, ["open", "selection"])) : le("", !0)
		], 14, es));
	}
}), rs = ["href"], is = /* @__PURE__ */ N({
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
		let t = e, { t: n } = _();
		function r() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let i = t.hostElement, s = r();
		i.dataset.colorMode = s;
		let c = w(() => t.probe.ready ? void 0 : t.probe.current_version), l = w(() => `${n("app.name")} ${n("app.version_label", { version: t.version })}`), u = t.status.state === "ready" ? Ai({
			capabilities: t.capabilities ?? hi(),
			initial_color_mode: s
		}) : null;
		u && h(() => u.state.value.color_mode, (e) => {
			i.dataset.colorMode = e;
		});
		function d(e) {
			u?.controller.set_route(e);
		}
		function f(e) {
			u?.controller.set_inspector_collapsed(e);
		}
		function p(e) {
			u?.controller.set_inspector_width(e);
		}
		function v() {
			window.location.reload();
		}
		let b = w(() => u?.state.value.settings.settings?.ui.optional_entry_enabled === !0), x = O(!1), S = w(() => !b.value || x.value);
		function E() {
			x.value = !x.value;
		}
		return (t, r) => (a(), M(oa, { "portal-target": e.portalTarget }, {
			default: o(() => [e.status.state === "blocked" ? (a(), y("div", {
				key: 0,
				class: C(j(U).state_screen),
				"data-startup-state": "blocked"
			}, [
				g("p", { class: C(j(U).state_screen_eyebrow) }, T(l.value), 3),
				g("h1", { class: C(j(U).state_screen_title) }, T(j(n)("app.unsupported_host.title")), 3),
				g("p", { class: C(j(U).state_screen_description) }, T(j(n)("app.unsupported_host.description", {
					required_version: j(Zr),
					current_version: c.value ?? j(n)("status.unknown")
				})), 3),
				g("a", {
					class: C(["tc-interactive", j(U).state_screen_action]),
					href: e.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, T(j(n)("app.unsupported_host.update_action")), 11, rs)
			], 2)) : e.status.state === "failed" ? (a(), y("div", {
				key: 1,
				class: C(j(U).state_screen),
				"data-startup-state": "failed"
			}, [
				g("p", { class: C(j(U).state_screen_eyebrow) }, T(l.value), 3),
				g("h1", { class: C(j(U).state_screen_title) }, T(j(n)("app.fatal_error.title")), 3),
				g("p", { class: C(j(U).state_screen_description) }, T(j(n)("app.fatal_error.description")), 3),
				g("button", {
					type: "button",
					class: C(["tc-interactive", j(U).state_screen_action]),
					onClick: v
				}, T(j(n)("app.fatal_error.reload_action")), 3)
			], 2)) : j(u) ? (a(), y(k, { key: 2 }, [S.value ? (a(), M(ns, {
				key: 0,
				state: j(u).state.value,
				controller: j(u).controller,
				onSelectRoute: d,
				onSetInspectorCollapsed: f,
				onResizeInspector: p
			}, null, 8, ["state", "controller"])) : le("", !0), m(aa, {
				enabled: b.value,
				"open-label": j(n)("app.name"),
				onOpen: E
			}, null, 8, ["enabled", "open-label"])], 64)) : le("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
});
//#endregion
//#region src/ui/create_shadow_root.ts
function as(e, t) {
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
//#region ../../packages/providers/src/provider_error.ts
var q = class extends Error {
	provider_error;
	constructor(e) {
		super(`Provider operation failed: ${e.code}`), this.name = "ProviderAdapterError", this.provider_error = Object.freeze(ht.parse(e));
	}
}, os = class extends Error {
	constructor(e) {
		super("Provider network request failed", e), this.name = "ProviderNetworkError";
	}
};
function ss(e, t = {}) {
	let n, r = !1;
	return e === 401 || e === 402 || e === 403 ? n = "auth_failed" : e === 408 ? (n = "timed_out", r = !0) : e === 429 ? (n = "rate_limited", r = !0) : e >= 400 && e < 500 ? n = "invalid_request" : (n = "provider_unavailable", r = e >= 500 && e <= 599 && t.recoverable === !0), ht.parse({
		code: n,
		retryable: r,
		status_code: e,
		...t.retry_after_ms === void 0 ? {} : { retry_after_ms: t.retry_after_ms }
	});
}
function cs(e, t) {
	return t.aborted || ls(e, "AbortError") ? new q({
		code: "cancelled",
		retryable: !1
	}) : e instanceof q ? e : ls(e, "TimeoutError") ? new q({
		code: "timed_out",
		retryable: !0
	}) : e instanceof os ? new q({
		code: "provider_unavailable",
		retryable: !0
	}) : new q({
		code: "malformed_response",
		retryable: !1
	});
}
function ls(e, t) {
	return e instanceof DOMException && e.name === t;
}
//#endregion
//#region ../../packages/providers/src/image_bytes.ts
function us(e, t) {
	let n = e.indexOf(","), r = e.startsWith("data:") ? n < 0 ? "" : e.slice(n + 1) : e;
	if (r.length === 0 || r.length % 4 == 1 || !/^[A-Za-z0-9+/]*={0,2}$/u.test(r)) throw J();
	let i;
	try {
		i = atob(r);
	} catch {
		throw J();
	}
	if (i.length === 0 || i.length > t) throw J();
	return Uint8Array.from(i, (e) => e.charCodeAt(0));
}
function ds(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function fs(e) {
	if (e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10) return "image/png";
	if (e.length >= 4 && e[0] === 255 && e[1] === 216 && e[2] === 255) return "image/jpeg";
	if (e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80) return "image/webp";
}
function ps(e, t, n, r) {
	let i = fs(e);
	if (i === void 0 || !r.includes(i)) throw J();
	let a = An(e), o = vn(a), s = a.slice(0, 16);
	s[6] = (s[6] ?? 0) & 15 | 80, s[8] = (s[8] ?? 0) & 63 | 128;
	let c = vn(s);
	return {
		asset_id: be.parse(`${c.slice(0, 8)}-${c.slice(8, 12)}-${c.slice(12, 16)}-${c.slice(16, 20)}-${c.slice(20)}`),
		media_type: i,
		byte_length: e.byteLength,
		sha256: o,
		...t === void 0 ? {} : { width: t },
		...n === void 0 ? {} : { height: n }
	};
}
function ms(e, t, n, r) {
	return {
		asset: ps(e, t, n, r),
		bytes: e
	};
}
function hs(e, t) {
	return t === void 0 ? e : {
		...e,
		seed: t
	};
}
function J() {
	return new q({
		code: "malformed_response",
		retryable: !1
	});
}
function Y() {
	return new q({
		code: "invalid_request",
		retryable: !1
	});
}
//#endregion
//#region ../../packages/providers/src/multipart.ts
function gs(e, t) {
	for (let t of Object.keys(e)) ys(t);
	for (let e of t) if (ys(e.field_name), ys(e.file_name), !/^[a-z]+\/[a-z0-9.+-]+$/u.test(e.content_type)) throw Y();
	let n = _s(e, t), r = new TextEncoder(), i = [];
	for (let [t, a] of Object.entries(e)) i.push(r.encode(`--${n}\r\nContent-Disposition: form-data; name="${t}"\r\n\r\n${a}\r\n`));
	for (let e of t) i.push(r.encode(`--${n}\r\nContent-Disposition: form-data; name="${e.field_name}"; filename="${e.file_name}"\r\nContent-Type: ${e.content_type}\r\n\r\n`), e.bytes, r.encode("\r\n"));
	i.push(r.encode(`--${n}--\r\n`));
	let a = i.reduce((e, t) => e + t.byteLength, 0), o = new Uint8Array(a), s = 0;
	for (let e of i) o.set(e, s), s += e.byteLength;
	return {
		content_type: `multipart/form-data; boundary=${n}`,
		body: o
	};
}
function _s(e, t) {
	for (let n = 0; n < 8; n += 1) {
		let n = `tavern-canvas-${globalThis.crypto.randomUUID()}`, r = new TextEncoder().encode(n);
		if (!(Object.entries(e).some(([e, t]) => e.includes(n) || t.includes(n)) || t.some((e) => e.field_name.includes(n) || e.file_name.includes(n) || e.content_type.includes(n) || vs(e.bytes, r)))) return n;
	}
	throw Y();
}
function vs(e, t) {
	if (t.byteLength === 0 || e.byteLength < t.byteLength) return !1;
	let n = e.byteLength - t.byteLength;
	for (let r = 0; r <= n; r += 1) {
		let n = !0;
		for (let i = 0; i < t.byteLength; i += 1) if (e[r + i] !== t[i]) {
			n = !1;
			break;
		}
		if (n) return !0;
	}
	return !1;
}
function ys(e) {
	if (e.length === 0 || e.length > 128 || /["\r\n]/u.test(e)) throw Y();
}
//#endregion
//#region ../../packages/providers/src/redaction.ts
var bs = /* @__PURE__ */ new Set([
	"prompt",
	"negativeprompt",
	"scenedescription",
	"messages",
	"chatcontent",
	"secret",
	"apikey",
	"authorization",
	"xgoogapikey",
	"xapikey",
	"credential",
	"accesstoken",
	"plaintextvalue",
	"image",
	"images",
	"base64",
	"body",
	"upstreambody",
	"upstreamresponse",
	"upstreamresponsebody",
	"requestbody",
	"responsebody"
]);
function xs(e) {
	return Ss(e, /* @__PURE__ */ new WeakMap());
}
function Ss(e, t) {
	if (typeof e != "object" || !e) return e;
	if (e instanceof Uint8Array) return { byte_length: e.byteLength };
	if (e instanceof Date) return e.toISOString();
	if (t.get(e) !== void 0) return "[Circular]";
	if (Array.isArray(e)) {
		let n = [];
		t.set(e, n);
		for (let r of e) n.push(Ss(r, t));
		return n;
	}
	let n = {};
	t.set(e, n);
	for (let [r, i] of Object.entries(e)) Cs(r) || (n[r] = Ss(i, t));
	return n;
}
function Cs(e) {
	let t = e.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
	return bs.has(t) || (t.startsWith("upstream") || t.startsWith("request") || t.startsWith("response")) && t.endsWith("body");
}
//#endregion
//#region ../../packages/providers/src/retry_policy.ts
var ws = 2, Ts = 250, Es = 1e4, Ds = 12e4, Os = class {
	now() {
		return Date.now();
	}
	sleep(e, t) {
		let { promise: n, resolve: r, reject: i } = Promise.withResolvers();
		if (t.aborted) return i(new DOMException("The retry was aborted", "AbortError")), n;
		let a = () => {
			clearTimeout(o), t.removeEventListener("abort", a), i(new DOMException("The retry was aborted", "AbortError"));
		}, o = setTimeout(() => {
			t.removeEventListener("abort", a), r(void 0);
		}, e);
		return t.addEventListener("abort", a, { once: !0 }), n;
	}
};
function ks(e, t) {
	if (e === null) return;
	let n = e.trim();
	if (/^\d+$/u.test(n)) {
		let e = Number(n);
		return Number.isSafeInteger(e) && e <= (2 ** 53 - 1) / 1e3 ? e * 1e3 : void 0;
	}
	let r = Date.parse(n);
	if (Number.isFinite(r)) return Math.max(0, r - t);
}
function As(e, t, n) {
	return js(e, async (e, n) => {
		try {
			return await t(e, n);
		} catch (e) {
			throw e instanceof os ? new q({
				code: "provider_unavailable",
				retryable: !1
			}) : e instanceof DOMException && e.name === "TimeoutError" ? new q({
				code: "timed_out",
				retryable: !1
			}) : e;
		}
	}, n);
}
async function js(e, t, n) {
	let r = Ns(n.max_retries, ws), i = Ps(n.base_delay_ms, Ts), a = Ps(n.max_delay_ms, Es), o = Ps(n.max_retry_after_ms, Ds);
	for (let s = 0;; s += 1) {
		if (n.signal.aborted) throw new q({
			code: "cancelled",
			retryable: !1
		});
		try {
			return await t(structuredClone(e), s);
		} catch (e) {
			let t = cs(e, n.signal);
			if (!t.provider_error.retryable || s >= r) throw t;
			let c = t.provider_error.retry_after_ms, l = c === void 0 ? Ms(s, i, a, n.random) : Math.min(c, o);
			try {
				await n.clock.sleep(l, n.signal);
			} catch {
				throw new q({
					code: "cancelled",
					retryable: !1
				});
			}
		}
	}
}
function Ms(e, t, n, r) {
	let i = r.next(), a = .5 + (Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : .5);
	return Math.min(n, Math.round(t * 2 ** e * a));
}
function Ns(e, t) {
	return e === void 0 || !Number.isInteger(e) || e < 0 ? t : e;
}
function Ps(e, t) {
	return e === void 0 || !Number.isFinite(e) || e <= 0 ? t : e;
}
//#endregion
//#region ../../packages/providers/src/provider_transport.ts
var Fs = 2e8, Is = 1e8, Ls = 1e6;
function Rs(e) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > Is) throw TypeError("Provider input asset byte limit is invalid");
	let t = Math.ceil(e / 3);
	return t > 4975e4 ? Fs : Math.min(Fs, t * 4 + Ls);
}
function zs(e) {
	if (!e.startsWith("/") || e.startsWith("//") || e.includes("\\") || e.includes("#") || e.split(/[/?]/u).includes("..") || /^[a-z][a-z0-9+.-]*:/iu.test(e)) throw TypeError("Provider transport route must be a relative absolute-path reference");
}
//#endregion
//#region ../../packages/providers/src/comfyui/workflow_renderer.ts
var Bs = 500, Vs = 16, Hs = 1e5, Us = 1e6, Ws = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), Gs = H({
	node_id: L().trim().min(1).max(128),
	property: L().trim().min(1).max(128)
}), Ks = Gs.extend({ value_type: F([
	"string",
	"number",
	"boolean"
]) }), qs = H({
	workflow_id: be,
	workflow: it(),
	bindings: H({
		prompt: Gs,
		negative_prompt: Gs.optional(),
		seed: Gs.optional(),
		output_count: Gs,
		placeholders: z(L().trim().min(1).max(128), Ks).default({}),
		input_assets: z(L().trim().min(1).max(128), Gs).default({})
	})
});
function Js(e) {
	try {
		let t = qs.parse(e);
		if (!Qs(t.workflow)) throw Y();
		let n = Object.entries(t.workflow);
		if (n.length === 0 || n.length > Bs) throw Y();
		Zs(t.workflow);
		let r = JSON.stringify(t.workflow);
		if (new TextEncoder().encode(r).byteLength > Us) throw Y();
		let i = {};
		for (let [e, t] of n) {
			if (!$s(e) || !Qs(t)) throw Y();
			let n = t.class_type, r = t.inputs;
			if (typeof n != "string" || n.length === 0 || n.length > 256 || !Qs(r)) throw Y();
			i[e] = t;
		}
		return {
			workflow_id: t.workflow_id,
			workflow: i,
			bindings: t.bindings
		};
	} catch (e) {
		throw e instanceof q ? e : Y();
	}
}
function Ys(e, t) {
	let n = structuredClone(e.workflow);
	if (Xs(n, e.bindings.prompt, t.prompt, "string"), Xs(n, e.bindings.output_count, t.output_count, "number"), t.negative_prompt !== void 0) {
		if (e.bindings.negative_prompt === void 0) throw Y();
		Xs(n, e.bindings.negative_prompt, t.negative_prompt, "string");
	}
	if (t.seed !== void 0) {
		if (e.bindings.seed === void 0) throw Y();
		Xs(n, e.bindings.seed, t.seed, "number");
	}
	for (let [r, i] of Object.entries(t.placeholder_values)) {
		let t = e.bindings.placeholders[r];
		if (t === void 0 || typeof i !== t.value_type) throw Y();
		Xs(n, t, i, t.value_type);
	}
	for (let [r, i] of Object.entries(t.input_asset_names)) {
		let t = e.bindings.input_assets[r];
		if (t === void 0) throw Y();
		Xs(n, t, i, "string");
	}
	return n;
}
function Xs(e, t, n, r) {
	if (!$s(t.node_id) || !$s(t.property) || typeof n !== r) throw Y();
	let i = e[t.node_id];
	if (i === void 0 || !Qs(i.inputs) || !Object.hasOwn(i.inputs, t.property)) throw Y();
	i.inputs[t.property] = n;
}
function Zs(e) {
	let t = [{
		value: e,
		depth: 0
	}], n = 0;
	for (; t.length > 0;) {
		let e = t.pop();
		if (e === void 0) break;
		if (n += 1, n > Hs || e.depth > Vs) throw Y();
		if (e.value === null) continue;
		let r = typeof e.value;
		if (r !== "string" && r !== "boolean") {
			if (r === "number") {
				if (!Number.isFinite(e.value)) throw Y();
				continue;
			}
			if (Array.isArray(e.value)) {
				for (let n of e.value) t.push({
					value: n,
					depth: e.depth + 1
				});
				continue;
			}
			if (!Qs(e.value)) throw Y();
			for (let [n, r] of Object.entries(e.value)) {
				if (!$s(n)) throw Y();
				t.push({
					value: r,
					depth: e.depth + 1
				});
			}
		}
	}
}
function Qs(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function $s(e) {
	return e.length > 0 && e.length <= 256 && !Ws.has(e);
}
//#endregion
//#region ../../packages/providers/src/comfyui/comfyui_adapter.ts
var ec = H({
	profile_id: L().trim().min(1).max(128),
	provider_id: I("comfyui"),
	model_allowlist: R(L().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: R(F([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	workflow_allowlist: R(be).min(1).max(256),
	max_response_bytes: B().int().positive().max(1e8),
	max_input_asset_bytes: B().int().positive().max(1e8)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"output_mime_type_allowlist",
		"workflow_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), tc = ze({
	prompt_id: L().trim().min(1).max(128),
	number: B(),
	node_errors: z(L(), it())
}), nc = ze({
	name: L().trim().min(1).max(512),
	subfolder: L().max(512),
	type: F([
		"input",
		"output",
		"temp"
	])
}), rc = H({ request: H({
	request_id: _e.shape.request_id,
	output_count: _e.shape.output_count,
	output_node_ids: _e.shape.output_node_ids,
	seed: _e.shape.seed
}) }), ic = { next: Math.random }, ac = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), oc = 3e6, sc = class {
	provider_id = "comfyui";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"reference_image",
		"cancel",
		"seed",
		"workflow"
	]);
	#e;
	#t;
	#n;
	constructor(e) {
		this.#e = e.workflow_store, this.#t = e.clock ?? new Os(), this.#n = e.random ?? ic;
	}
	validate_profile(e) {
		return ec.parse(e);
	}
	async submit(e, t) {
		let n = mc(t), r = hc(e.profile);
		if (!r.workflow_allowlist.includes(n.workflow_id)) throw Y();
		let i;
		try {
			i = Js(await this.#e.load(n.workflow_id));
		} catch {
			throw Y();
		}
		if (i.workflow_id !== n.workflow_id) throw Y();
		lc(i, n, Object.fromEntries(Object.keys(n.input_asset_bindings).map((e) => [e, "validated-input.png"])));
		let a = await cc(e, n, r, this.#t, this.#n), o = lc(i, n, a), s = new TextEncoder().encode(JSON.stringify({ prompt: o }));
		if (s.byteLength > oc) throw Y();
		let c = await dc(e, n, {
			route: "/prompt",
			method: "POST",
			body: s,
			max_request_bytes: oc,
			content_type: "application/json",
			accept: "application/json",
			max_response_bytes: r.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (c.body.byteLength > r.max_response_bytes) throw J();
		let l;
		try {
			l = tc.parse(gc(c.body));
		} catch {
			throw J();
		}
		if (Object.keys(l.node_errors).length > 0) throw Y();
		return {
			state: "pending",
			submission_id: l.prompt_id,
			continuation: { request: {
				request_id: n.request_id,
				output_count: n.output_count,
				output_node_ids: n.output_node_ids,
				seed: n.seed
			} }
		};
	}
	async poll(e, t) {
		if (t.state !== "pending") throw Y();
		let n = rc.safeParse(t.continuation);
		if (!n.success) throw Y();
		let r = n.data.request, i = hc(e.profile), a = await dc(e, r, {
			route: `/history/${encodeURIComponent(t.submission_id)}`,
			method: "GET",
			accept: "application/json",
			max_response_bytes: i.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (a.body.byteLength > i.max_response_bytes) throw J();
		let o = gc(a.body);
		if (!_c(o)) throw J();
		let s = o[t.submission_id];
		if (s === void 0) return {
			state: "pending",
			poll_after_ms: 250
		};
		if (!_c(s)) throw J();
		let c = s.status;
		if (!_c(c)) throw J();
		if (c.status_str === "error") return {
			state: "failed",
			error: {
				code: "provider_unavailable",
				retryable: !1
			}
		};
		if (c.completed !== !0) return {
			state: "pending",
			poll_after_ms: 250
		};
		let l = s.outputs;
		if (!_c(l)) throw J();
		let u = uc(l, r.output_node_ids, r.output_count);
		if (u.length !== r.output_count) throw J();
		let d = [], f = 0;
		for (let t of u) {
			let n = await dc(e, r, {
				route: `/view?${new URLSearchParams({
					filename: t.filename,
					subfolder: t.subfolder,
					type: t.type
				}).toString()}`,
				method: "GET",
				max_response_bytes: i.max_response_bytes - f,
				signal: e.signal
			}, this.#t, this.#n, !0);
			if (f += n.body.byteLength, f > i.max_response_bytes) throw J();
			d.push(ms(n.body, void 0, void 0, i.output_mime_type_allowlist));
		}
		return {
			state: "completed",
			result: Ee.parse(hs({
				request_id: r.request_id,
				provider_id: "comfyui",
				assets: d.map(({ asset: e }) => e)
			}, r.seed)),
			output_assets: d
		};
	}
	async cancel(e, t) {
		if (t === void 0) throw Y();
		if (t.state !== "pending") return;
		let n = hc(e.profile), r = { request_id: t.submission_id }, i = await dc(e, r, {
			route: "/queue",
			method: "GET",
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (i.body.byteLength > n.max_response_bytes) throw J();
		let a = gc(i.body);
		if (!_c(a)) throw J();
		let o = vc(a.queue_running, t.submission_id), s = vc(a.queue_pending, t.submission_id);
		o ? await dc(e, r, {
			route: "/interrupt",
			method: "POST",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1) : s && await dc(e, r, {
			route: "/queue",
			method: "POST",
			body: new TextEncoder().encode(JSON.stringify({ delete: [t.submission_id] })),
			max_request_bytes: Rs(n.max_input_asset_bytes),
			content_type: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1);
	}
};
async function cc(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of Object.entries(t.input_asset_bindings)) {
		let t = await e.assets.read(i, e.signal), s = t.bytes.byteLength;
		if (t.asset_id !== i || s > n.max_input_asset_bytes || s > n.max_input_asset_bytes - o) throw Y();
		o += s, a.push({
			binding_name: r,
			asset: t
		});
	}
	let s = Rs(n.max_input_asset_bytes), c = {};
	for (let { binding_name: o, asset: l } of a) {
		let a = gs({
			type: "input",
			overwrite: "true"
		}, [{
			field_name: "image",
			file_name: `${l.asset_id}.${yc(l.media_type)}`,
			content_type: l.media_type,
			bytes: l.bytes
		}]), u = await dc(e, t, {
			route: "/upload/image",
			method: "POST",
			body: a.body,
			max_request_bytes: s,
			content_type: a.content_type,
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, r, i, !1);
		if (u.body.byteLength > n.max_response_bytes) throw J();
		let d;
		try {
			d = nc.parse(gc(u.body));
		} catch {
			throw J();
		}
		c[o] = d.subfolder.length === 0 ? d.name : `${d.subfolder}/${d.name}`;
	}
	return c;
}
function lc(e, t, n) {
	return Ys(e, {
		prompt: t.prompt,
		...t.negative_prompt === void 0 ? {} : { negative_prompt: t.negative_prompt },
		...t.seed === void 0 ? {} : { seed: t.seed },
		output_count: t.output_count,
		placeholder_values: t.placeholder_values,
		input_asset_names: n
	});
}
function uc(e, t, n) {
	let r = [];
	for (let i of t) {
		let t = e[i];
		if (!_c(t) || !Array.isArray(t.images) || t.images.length > n - r.length) throw J();
		for (let e of t.images) {
			if (!_c(e) || typeof e.filename != "string" || typeof e.subfolder != "string" || typeof e.type != "string" || e.filename.length === 0 || e.filename.length > 512 || e.subfolder.length > 512 || ![
				"input",
				"output",
				"temp"
			].includes(e.type)) throw J();
			r.push({
				filename: e.filename,
				subfolder: e.subfolder,
				type: e.type
			});
		}
	}
	return r;
}
async function dc(e, t, n, r, i, a) {
	let o = async (t, i) => {
		let a = r.now(), o = await e.transport.execute(n);
		return pc(e, t.request_id, i, o, a, r), fc(o, r), o;
	};
	if (a) return (n.method === "GET" ? js : As)(t, o, {
		signal: e.signal,
		clock: r,
		random: i
	});
	try {
		return await o(t, 0);
	} catch (t) {
		throw cs(t, e.signal);
	}
}
function fc(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (e.status === 451) throw new q({
		code: "content_blocked",
		retryable: !1,
		status_code: 451
	});
	let n = ks(e.headers["retry-after"] ?? null, t.now());
	throw new q(ss(e.status, {
		recoverable: ac.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function pc(e, t, n, r, i, a) {
	e.log.write(xs({
		provider_id: "comfyui",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function mc(e) {
	let t = _e.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function hc(e) {
	let t = ec.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function gc(e) {
	try {
		return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
	} catch {
		throw J();
	}
}
function _c(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function vc(e, t) {
	return Array.isArray(e) && e.some((e) => Array.isArray(e) && e[1] === t);
}
function yc(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/google_image/google_image_adapter.ts
var bc = H({
	profile_id: L().trim().min(1).max(128),
	provider_id: I("google_image"),
	model_allowlist: R(je.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: R(F([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: B().int().positive().max(1e8),
	max_input_asset_bytes: B().int().positive().max(1e8)
}).check((e) => {
	for (let t of ["model_allowlist", "output_mime_type_allowlist"]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), xc = ze({
	id: L().min(1),
	model: L().min(1),
	status: F([
		"completed",
		"failed",
		"in_progress"
	]),
	error: ze({
		code: L().optional(),
		message: L().optional()
	}).optional(),
	steps: R(ze({
		type: L(),
		content: R(ze({
			type: L(),
			mime_type: L().optional(),
			data: L().optional()
		})).optional()
	}))
}), Sc = { next: Math.random }, Cc = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), wc = class {
	provider_id = "google_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new Os(), this.#t = e.random ?? Sc;
	}
	validate_profile(e) {
		return bc.parse(e);
	}
	async submit(e, t) {
		let n = Dc(t), r = Oc(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(n.output_mime_type)) throw Y();
		let i = [{
			type: "text",
			text: n.negative_prompt === void 0 ? n.prompt : `${n.prompt}\n\nAvoid: ${n.negative_prompt}`
		}], a = 0;
		for (let t of n.reference_asset_ids) {
			let n = await e.assets.read(t, e.signal);
			if (n.asset_id !== t) throw Y();
			let o = n.bytes.byteLength;
			if (o > r.max_input_asset_bytes || o > r.max_input_asset_bytes - a) throw Y();
			a += o, i.push({
				type: "image",
				mime_type: n.media_type,
				data: ds(n.bytes)
			});
		}
		let o = Rs(r.max_input_asset_bytes), s = new TextEncoder().encode(JSON.stringify({
			model: n.model_id,
			input: i,
			response_format: {
				type: "image",
				mime_type: n.output_mime_type,
				aspect_ratio: n.aspect_ratio,
				image_size: n.image_size
			}
		})), c = [], l = 0;
		for (let t = 0; t < n.output_count; t += 1) {
			let t = await As(n, async (t, n) => {
				let i = this.#e.now(), a = await e.transport.execute({
					route: "/v1beta/interactions",
					method: "POST",
					body: s,
					max_request_bytes: o,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes - l,
					signal: e.signal
				});
				return Ec(e, t.request_id, n, a, i, this.#e), Tc(a, this.#e), a;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			});
			if (t.body.byteLength > r.max_response_bytes - l) throw J();
			let i;
			try {
				i = xc.parse(kc(t.body));
			} catch {
				throw J();
			}
			if (i.status === "failed") throw i.error?.code === "SAFETY" ? new q({
				code: "content_blocked",
				retryable: !1
			}) : new q({
				code: "provider_unavailable",
				retryable: !1
			});
			if (i.status !== "completed") throw J();
			let a = i.steps.flatMap((e) => e.type === "model_output" ? (e.content ?? []).filter((e) => e.type === "image" && typeof e.mime_type == "string" && typeof e.data == "string") : []);
			if (a.length !== 1) throw J();
			let u = a[0];
			if (u === void 0 || u.mime_type !== n.output_mime_type || u.data === void 0) throw J();
			let d = us(u.data, r.max_response_bytes - l);
			l += d.byteLength;
			let f = ms(d, void 0, void 0, r.output_mime_type_allowlist);
			if (f.asset.media_type !== n.output_mime_type) throw J();
			c.push(f);
		}
		return {
			state: "completed",
			result: Ee.parse({
				request_id: n.request_id,
				provider_id: "google_image",
				assets: c.map(({ asset: e }) => e)
			}),
			output_assets: c
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw Y();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function Tc(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	let n = ks(e.headers["retry-after"] ?? null, t.now());
	throw new q(ss(e.status, {
		recoverable: Cc.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function Ec(e, t, n, r, i, a) {
	e.log.write(xs({
		provider_id: "google_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Dc(e) {
	let t = je.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function Oc(e) {
	let t = bc.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function kc(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_mapping.ts
function Ac(e, t) {
	let n = e.vibe_references ?? [], r = e.character_references ?? [];
	return {
		input: e.prompt,
		model: e.model_id,
		action: "generate",
		parameters: {
			params_version: 3,
			prompt: e.prompt,
			...e.negative_prompt === void 0 ? {} : { negative_prompt: e.negative_prompt },
			width: e.width,
			height: e.height,
			steps: e.steps,
			scale: e.scale,
			cfg_rescale: e.cfg_rescale,
			sampler: e.sampler,
			noise_schedule: e.noise_schedule,
			...e.seed === void 0 ? {} : { seed: e.seed },
			n_samples: e.output_count,
			qualityToggle: e.quality_toggle,
			ucPreset: Mc(e.undesired_content_preset),
			sm: e.smea,
			sm_dyn: e.dyn,
			...n.length === 0 ? {} : {
				reference_image_multiple: n.map((e) => ds(jc(t, e.asset_id).bytes)),
				reference_strength_multiple: n.map((e) => e.strength),
				reference_information_extracted_multiple: n.map((e) => e.information_extracted)
			},
			...r.length === 0 ? {} : {
				director_reference_images: r.map((e) => ds(jc(t, e.asset_id).bytes)),
				director_reference_descriptions: r.map((e) => ({
					caption: {
						base_caption: `character, ${e.prompt}`,
						char_captions: []
					},
					legacy_uc: !1,
					use_coords: !1,
					use_order: !0
				})),
				director_reference_strength_values: r.map((e) => e.strength),
				director_reference_secondary_strength_values: r.map((e) => e.strength),
				director_reference_information_extracted: r.map(() => 1)
			}
		}
	};
}
function jc(e, t) {
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw Y();
	return n;
}
function Mc(e) {
	return e === "light" ? 1 : e === "human_focus" ? 2 : e === "none" ? 3 : 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_response.ts
var Nc = ze({ images: R(ze({
	image: L(),
	index: B().int().nonnegative(),
	seed: B().int().nonnegative()
})).min(1).max(4) });
async function Pc(e, t, n, r, i, a = ["image/png", "image/webp"]) {
	try {
		if (e.byteLength === 0 || e.byteLength > r) throw J();
		let o = t.toLowerCase(), s;
		if (o.startsWith("application/json")) s = Fc(e, r);
		else if (o.startsWith("application/zip") || o.startsWith("application/x-zip-compressed")) s = { images: await Ic(e, r, i) };
		else if (o.startsWith("multipart/")) s = { images: zc(e, t, r, i) };
		else throw J();
		if (s.images.length !== n.output_count) throw J();
		let c = s.images.map((e) => ms(e, n.width, n.height, a));
		return {
			result: Ee.parse(hs({
				request_id: n.request_id,
				provider_id: "novelai",
				assets: c.map(({ asset: e }) => e)
			}, s.seed ?? n.seed)),
			output_assets: c
		};
	} catch (e) {
		throw e instanceof q ? e : J();
	}
}
function Fc(e, t) {
	let n = new TextDecoder("utf-8", { fatal: !0 }).decode(e), r = Nc.parse(JSON.parse(n)).images;
	if (r.sort((e, t) => e.index - t.index), r.some((e, t) => e.index !== t)) throw J();
	let i = 0, a = r.map((e) => {
		let n = us(e.image, t - i);
		return i += n.byteLength, n;
	}), o = r[0]?.seed;
	return o === void 0 ? { images: a } : {
		images: a,
		seed: o
	};
}
async function Ic(e, t, n) {
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = Lc(r), a = r.getUint16(i + 4, !0), o = r.getUint16(i + 6, !0), s = r.getUint16(i + 8, !0), c = r.getUint16(i + 10, !0), l = r.getUint32(i + 12, !0), u = r.getUint32(i + 16, !0);
	if (a !== 0 || o !== 0 || s !== c || c === 0 || c > n || u + l !== i) throw J();
	let d = new TextDecoder("utf-8", { fatal: !0 }), f = [], p = /* @__PURE__ */ new Set(), m = u, h = 0;
	for (let n = 0; n < c; n += 1) {
		if (Hc(e, m, 46), r.getUint32(m, !0) !== 33639248) throw J();
		let n = r.getUint16(m + 8, !0), i = r.getUint16(m + 10, !0), a = r.getUint32(m + 16, !0), o = r.getUint32(m + 20, !0), s = r.getUint32(m + 24, !0), c = r.getUint16(m + 28, !0), l = r.getUint16(m + 30, !0), g = r.getUint16(m + 32, !0), _ = r.getUint16(m + 34, !0), v = r.getUint32(m + 42, !0);
		if (p.has(v)) throw J();
		p.add(v);
		let y = 46 + c + l + g;
		if (Hc(e, m, y), n & 1 || _ !== 0 || i !== 0 && i !== 8 || s === 0 || s > t - h) throw J();
		let b = d.decode(e.subarray(m + 46, m + 46 + c));
		if (Vc(b), Hc(e, v, 30), r.getUint32(v, !0) !== 67324752) throw J();
		let x = r.getUint16(v + 6, !0), S = r.getUint16(v + 8, !0), C = r.getUint16(v + 26, !0), w = r.getUint16(v + 28, !0), T = d.decode(e.subarray(v + 30, v + 30 + C)), E = v + 30 + C + w;
		if (Hc(e, E, o), x !== n || S !== i || T !== b || E + o > u) throw J();
		let D = e.subarray(E, E + o), ee = i === 0 ? Uint8Array.from(D) : await Rc(D, s, t - h);
		if (ee.byteLength !== s || Kc(ee) !== a) throw J();
		f.push({
			name: b,
			bytes: ee
		}), h += ee.byteLength, m += y;
	}
	if (m !== u + l) throw J();
	return f.sort((e, t) => e.name < t.name ? -1 : +(e.name > t.name)), f.map((e) => e.bytes);
}
function Lc(e) {
	let t = Math.max(0, e.byteLength - 65557);
	for (let n = e.byteLength - 22; n >= t; --n) if (e.getUint32(n, !0) === 101010256) {
		let t = e.getUint16(n + 20, !0);
		if (n + 22 + t === e.byteLength) return n;
	}
	throw J();
}
async function Rc(e, t, n) {
	let r = new Blob([Uint8Array.from(e)]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(), i = [], a = 0;
	for (;;) {
		let e = await r.read();
		if (e.done) break;
		if (a += e.value.byteLength, a > t || a > n) throw await r.cancel(), J();
		i.push(e.value);
	}
	return Gc(i, a);
}
function zc(e, t, n, r) {
	let i = /boundary=(?:"([^"]{1,70})"|([!#$%&'*+.^_`|~0-9A-Za-z-]{1,70}))/iu.exec(t), a = i?.[1] ?? i?.[2];
	if (a === void 0) throw J();
	let o = new TextEncoder(), s = o.encode(`--${a}`), c = o.encode(`\r\n--${a}`), l = Uint8Array.of(13, 10, 13, 10), u = Uint8Array.of(13, 10), d = Uint8Array.of(45, 45), f = new TextDecoder("utf-8", { fatal: !0 }), p = [], m = 0, h = 0;
	for (;;) {
		if (Uc(e, s, h) !== h) throw J();
		if (h += s.length, Wc(e, d, h)) break;
		if (!Wc(e, u, h)) throw J();
		h += u.length;
		let t = Uc(e, l, h);
		if (t < 0 || t - h > 8192) throw J();
		let i = Bc(f.decode(e.subarray(h, t))), a = t + l.length, o = Uc(e, c, a);
		if (o < 0 || o === a) throw J();
		let g = Uint8Array.from(e.subarray(a, o));
		if (m += g.byteLength, p.length >= r || m > n || ![
			"image/png",
			"image/jpeg",
			"image/webp"
		].includes(i)) throw J();
		p.push(g), h = o + 2;
	}
	if (p.length === 0) throw J();
	return p;
}
function Bc(e) {
	for (let t of e.split("\r\n")) {
		let e = t.indexOf(":");
		if (e > 0 && t.slice(0, e).trim().toLowerCase() === "content-type") return t.slice(e + 1).trim().toLowerCase().split(";", 1)[0] ?? "";
	}
	throw J();
}
function Vc(e) {
	if (e.length === 0 || e.length > 255 || e.includes("/") || e.includes("\\") || e.includes("\0") || e === "." || e === ".." || !/\.(?:png|jpe?g|webp)$/iu.test(e)) throw J();
}
function Hc(e, t, n) {
	if (!Number.isSafeInteger(t) || !Number.isSafeInteger(n) || t < 0 || n < 0 || t + n > e.byteLength) throw J();
}
function Uc(e, t, n) {
	let r = e.length - t.length;
	for (let i = n; i <= r; i += 1) if (Wc(e, t, i)) return i;
	return -1;
}
function Wc(e, t, n) {
	if (n < 0 || n + t.length > e.length) return !1;
	for (let r = 0; r < t.length; r += 1) if (e[n + r] !== t[r]) return !1;
	return !0;
}
function Gc(e, t) {
	let n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function Kc(e) {
	let t = 4294967295;
	for (let n of e) {
		t ^= n;
		for (let e = 0; e < 8; e += 1) t = t >>> 1 ^ (t & 1 ? 3988292384 : 0);
	}
	return (t ^ 4294967295) >>> 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_adapter.ts
var qc = H({
	profile_id: L().trim().min(1).max(128),
	provider_id: I("novelai"),
	model_allowlist: R(L().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: R(F(["image/png", "image/webp"])).min(1).max(2),
	max_response_bytes: B().int().positive().max(1e8),
	max_archive_entries: B().int().min(1).max(32),
	max_input_asset_bytes: B().int().positive().max(1e8).default(2e7)
}).check((e) => {
	for (let t of ["model_allowlist", "output_mime_type_allowlist"]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), Jc = { next: Math.random }, Yc = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Xc = class {
	provider_id = "novelai";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"reference_image",
		"seed"
	]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new Os(), this.#t = e.random ?? Jc;
	}
	validate_profile(e) {
		return qc.parse(e);
	}
	async submit(e, t) {
		let n = Zc(t), r = Qc(e.profile);
		if (!r.model_allowlist.includes(n.model_id)) throw Y();
		let i = await $c(e, n, r.max_input_asset_bytes), a = Rs(r.max_input_asset_bytes), o = await As(n, async (t, n) => {
			let o = Ac(t, i), s = this.#e.now(), c = await e.transport.execute({
				route: "/ai/generate-image",
				method: "POST",
				body: new TextEncoder().encode(JSON.stringify(o)),
				max_request_bytes: a,
				content_type: "application/json",
				accept: "application/json, application/zip, multipart/mixed",
				max_response_bytes: r.max_response_bytes,
				signal: e.signal
			});
			if (e.log.write(xs({
				provider_id: this.provider_id,
				request_id: t.request_id,
				attempt: n,
				status_code: c.status,
				duration_ms: Math.max(0, this.#e.now() - s),
				byte_count: c.body.byteLength
			})), c.status === 451) throw new q({
				code: "content_blocked",
				retryable: !1,
				status_code: 451
			});
			if (c.status < 200 || c.status >= 300) {
				let e = ks(c.headers["retry-after"] ?? null, this.#e.now());
				throw new q(ss(c.status, {
					recoverable: Yc.has(c.status),
					...e === void 0 ? {} : { retry_after_ms: e }
				}));
			}
			return c;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		return {
			state: "completed",
			...await Pc(o.body, o.headers["content-type"] ?? "", n, r.max_response_bytes, r.max_archive_entries, r.output_mime_type_allowlist)
		};
	}
	poll(e, t) {
		return Promise.reject(Y());
	}
	cancel(e, t) {
		return Promise.reject(Y());
	}
};
function Zc(e) {
	let t = ke.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function Qc(e) {
	let t = qc.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
async function $c(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let e of t.vibe_references ?? []) r.add(e.asset_id);
	for (let e of t.character_references ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw Y();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
//#region ../../packages/providers/src/openai_image/openai_image_adapter.ts
var el = H({
	profile_id: L().trim().min(1).max(128),
	provider_id: I("openai_image"),
	model_allowlist: R(ve.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: R(F([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	remote_asset_origin_allowlist: R($e()).max(32),
	max_response_bytes: B().int().positive().max(1e8),
	max_input_asset_bytes: B().int().positive().max(1e8)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"output_mime_type_allowlist",
		"remote_asset_origin_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), tl = H({
	created: B().int().nonnegative().optional(),
	data: R(He([H({ b64_json: L().min(1) }), H({ url: $e() })])).min(1).max(4),
	usage: it().optional()
}), nl = { next: Math.random }, rl = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), il = class {
	provider_id = "openai_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new Os(), this.#t = e.random ?? nl;
	}
	validate_profile(e) {
		return el.parse(e);
	}
	async submit(e, t) {
		let n = fl(t), r = pl(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(gl(n.output_format))) throw Y();
		let i = Rs(r.max_input_asset_bytes), a = n.mode === "generate" ? al(n, e.signal, r.max_response_bytes, i) : await ol(e, n, r.max_input_asset_bytes, r.max_response_bytes, i), o = await As(n, async (t, n) => {
			let r = this.#e.now(), i = await e.transport.execute(a);
			return dl(e, t.request_id, n, i, r, this.#e), ll(i, this.#e), i;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		if (o.body.byteLength > r.max_response_bytes) throw J();
		let s;
		try {
			s = tl.parse(ml(o.body));
		} catch {
			throw J();
		}
		if (s.data.length !== n.output_count) throw J();
		let c = hl(n.size), l = [], u = 0;
		for (let t of s.data) {
			let i;
			if (i = "b64_json" in t ? us(t.b64_json, r.max_response_bytes - u) : await cl(e, t.url, r, r.max_response_bytes - u, n, this.#t, this.#e), u += i.byteLength, u > r.max_response_bytes) throw J();
			let a = ms(i, c.width, c.height, r.output_mime_type_allowlist);
			if (a.asset.media_type !== gl(n.output_format)) throw J();
			l.push(a);
		}
		return {
			state: "completed",
			result: Ee.parse({
				request_id: n.request_id,
				provider_id: "openai_image",
				assets: l.map(({ asset: e }) => e)
			}),
			output_assets: l
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw Y();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function al(e, t, n, r) {
	let i = {
		model: e.model_id,
		prompt: sl(e),
		n: e.output_count,
		size: e.size,
		quality: e.quality,
		background: e.background,
		output_format: e.output_format,
		...e.compression === void 0 ? {} : { output_compression: e.compression }
	};
	return {
		route: "/v1/images/generations",
		method: "POST",
		body: new TextEncoder().encode(JSON.stringify(i)),
		max_request_bytes: r,
		content_type: "application/json",
		accept: "application/json",
		max_response_bytes: n,
		signal: t
	};
}
async function ol(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of t.input_asset_ids.entries()) {
		let t = await e.assets.read(i, e.signal);
		if (t.asset_id !== i) throw Y();
		let s = t.bytes.byteLength;
		if (s > n || s > n - o) throw Y();
		o += s, a.push({
			field_name: "image[]",
			file_name: `input_${String(r)}.${_l(t.media_type)}`,
			content_type: t.media_type,
			bytes: t.bytes
		});
	}
	if (t.mask_asset_id !== void 0) {
		let r = await e.assets.read(t.mask_asset_id, e.signal);
		if (r.asset_id !== t.mask_asset_id) throw Y();
		let i = r.bytes.byteLength;
		if (i > n || i > n - o) throw Y();
		a.push({
			field_name: "mask",
			file_name: `mask.${_l(r.media_type)}`,
			content_type: r.media_type,
			bytes: r.bytes
		});
	}
	let s = gs({
		model: t.model_id,
		prompt: sl(t),
		n: String(t.output_count),
		size: t.size,
		quality: t.quality,
		background: t.background,
		output_format: t.output_format,
		...t.compression === void 0 ? {} : { output_compression: String(t.compression) }
	}, a);
	return {
		route: "/v1/images/edits",
		method: "POST",
		body: s.body,
		max_request_bytes: i,
		content_type: s.content_type,
		accept: "application/json",
		max_response_bytes: r,
		signal: e.signal
	};
}
function sl(e) {
	return e.negative_prompt === void 0 ? e.prompt : `${e.prompt}\n\nAvoid: ${e.negative_prompt}`;
}
async function cl(e, t, n, r, i, a, o) {
	let s;
	try {
		s = new URL(t);
	} catch {
		throw J();
	}
	let c = n.remote_asset_origin_allowlist.map((e) => new URL(e).origin), l = e.transport.fetch_remote_asset?.bind(e.transport);
	if (s.protocol !== "https:" || s.username.length > 0 || s.password.length > 0 || s.hash.length > 0 || !c.includes(s.origin) || l === void 0 || r <= 0) throw J();
	return js(i, async (t, n) => {
		let i = o.now(), a = await l({
			url: s.href,
			allowed_origins: c,
			max_bytes: r,
			signal: e.signal
		});
		if (dl(e, t.request_id, n, a, i, o), ll(a, o), a.body.byteLength > r) throw J();
		return a.body;
	}, {
		signal: e.signal,
		clock: o,
		random: a
	});
}
function ll(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (ul(e)) throw new q({
		code: "content_blocked",
		retryable: !1,
		status_code: e.status
	});
	let n = ks(e.headers["retry-after"] ?? null, t.now());
	throw new q(ss(e.status, {
		recoverable: rl.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function ul(e) {
	if (e.status !== 400) return !1;
	try {
		let t = ml(e.body);
		return typeof t == "object" && !!t && "error" in t && typeof t.error == "object" && t.error !== null && "code" in t.error && t.error.code === "content_policy_violation";
	} catch {
		return !1;
	}
}
function dl(e, t, n, r, i, a) {
	e.log.write(xs({
		provider_id: "openai_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function fl(e) {
	let t = ve.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function pl(e) {
	let t = el.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function ml(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
function hl(e) {
	if (e === "auto") return {
		width: void 0,
		height: void 0
	};
	let [t, n] = e.split("x").map(Number);
	return {
		width: t,
		height: n
	};
}
function gl(e) {
	return e === "jpeg" ? "image/jpeg" : e === "webp" ? "image/webp" : "image/png";
}
function _l(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_mapping.ts
function vl(e, t) {
	let n = (e.lora_tokens ?? []).map((e) => `<lora:${e.lora_id}:${String(e.weight)}>`).join(", "), r = n.length === 0 ? e.prompt : `${e.prompt}, ${n}`, i = { sd_model_checkpoint: e.model_id };
	e.vae_id !== void 0 && (i.sd_vae = e.vae_id);
	let a = {};
	return e.adetailer !== void 0 && e.adetailer.length > 0 && (a.ADetailer = { args: [
		!0,
		!1,
		...e.adetailer.map((e) => ({
			ad_model: e.model_id,
			...e.prompt === void 0 ? {} : { ad_prompt: e.prompt },
			...e.negative_prompt === void 0 ? {} : { ad_negative_prompt: e.negative_prompt },
			...e.confidence === void 0 ? {} : { ad_confidence: e.confidence },
			...e.mask_blur === void 0 ? {} : { ad_mask_blur: e.mask_blur },
			...e.denoise_strength === void 0 ? {} : { ad_denoising_strength: e.denoise_strength }
		}))
	] }), e.controlnet !== void 0 && e.controlnet.length > 0 && (a.controlnet = { args: e.controlnet.map((e) => ({
		enabled: !0,
		image: ds(Sl(t, e.asset_id).bytes),
		module: e.module,
		model: e.model_id,
		weight: e.weight,
		guidance_start: e.guidance_start,
		guidance_end: e.guidance_end,
		...e.control_mode === void 0 ? {} : { control_mode: Cl(e.control_mode) },
		...e.resize_mode === void 0 ? {} : { resize_mode: wl(e.resize_mode) }
	})) }), {
		prompt: r,
		...e.negative_prompt === void 0 ? {} : { negative_prompt: e.negative_prompt },
		batch_size: e.output_count,
		n_iter: 1,
		sampler_name: e.sampler,
		scheduler: e.scheduler,
		width: e.width,
		height: e.height,
		steps: e.steps,
		cfg_scale: e.cfg_scale,
		...e.seed === void 0 ? {} : { seed: e.seed },
		...yl(e, t),
		override_settings: i,
		override_settings_restore_afterwards: !0,
		...Object.keys(a).length === 0 ? {} : { alwayson_scripts: a }
	};
}
function yl(e, t) {
	return e.mode === "img2img" ? xl(e, t) : bl(e);
}
function bl(e) {
	if (e.mode !== "txt2img") throw Y();
	return e.hires_fix === void 0 ? {} : {
		enable_hr: !0,
		hr_scale: e.hires_fix.scale,
		hr_upscaler: e.hires_fix.upscaler_id,
		hr_second_pass_steps: e.hires_fix.steps,
		denoising_strength: e.hires_fix.denoise_strength
	};
}
function xl(e, t) {
	if (e.mode !== "img2img") return {};
	if (e.hires_fix !== void 0 || e.denoise_strength === void 0) throw Y();
	return {
		init_images: [ds(Sl(t, e.input_asset_id).bytes)],
		denoising_strength: e.denoise_strength
	};
}
function Sl(e, t) {
	if (t === void 0) throw Y();
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw Y();
	return n;
}
function Cl(e) {
	return e === "prompt" ? "My prompt is more important" : e === "control" ? "ControlNet is more important" : "Balanced";
}
function wl(e) {
	return e === "crop_and_resize" ? "Scale to Fit (Inner Fit)" : e === "resize_and_fill" ? "Envelope (Outer Fit)" : "Just Resize";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_response.ts
var Tl = ze({
	images: R(L()),
	info: L()
}), El = ze({ seed: B().int().nonnegative().optional() });
function Dl(e, t, n, r = [
	"image/png",
	"image/jpeg",
	"image/webp"
]) {
	try {
		if (e.byteLength === 0 || e.byteLength > n) throw J();
		let i = new TextDecoder("utf-8", { fatal: !0 }).decode(e), a = Tl.parse(JSON.parse(i)), { images: o } = a, s = a.info;
		if (o.length !== t.output_count) throw J();
		let c = t.hires_fix === void 0 ? t.width : Math.round(t.width * t.hires_fix.scale), l = t.hires_fix === void 0 ? t.height : Math.round(t.height * t.hires_fix.scale), u = 0, d = o.map((e) => {
			if (typeof e != "string") throw J();
			let t = us(e, n - u);
			return u += t.byteLength, ms(t, c, l, r);
		}), f = Ol(s);
		return {
			result: Ee.parse(hs({
				request_id: t.request_id,
				provider_id: "sd_webui",
				assets: d.map(({ asset: e }) => e)
			}, f ?? t.seed)),
			output_assets: d
		};
	} catch (e) {
		throw e instanceof q ? e : J();
	}
}
function Ol(e) {
	return El.parse(JSON.parse(e)).seed;
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_adapter.ts
var kl = H({
	profile_id: L().trim().min(1).max(128),
	provider_id: I("sd_webui"),
	model_allowlist: R(L().trim().min(1).max(128)).min(1).max(128),
	vae_allowlist: R(L().trim().min(1).max(128)).max(128).default([]),
	adetailer_model_allowlist: R(L().trim().min(1).max(128)).max(128).default([]),
	controlnet_model_allowlist: R(L().trim().min(1).max(128)).max(128).default([]),
	output_mime_type_allowlist: R(F([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: B().int().positive().max(1e8),
	max_input_asset_bytes: B().int().positive().max(1e8).default(2e7)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"vae_allowlist",
		"adetailer_model_allowlist",
		"controlnet_model_allowlist",
		"output_mime_type_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), Al = { next: Math.random }, jl = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Ml = class {
	provider_id = "sd_webui";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"image_to_image",
		"reference_image",
		"cancel",
		"seed"
	]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new Os(), this.#t = e.random ?? Al;
	}
	validate_profile(e) {
		return kl.parse(e);
	}
	async submit(e, t) {
		let n = Nl(t), r = Pl(e.profile);
		Fl(r, n);
		let i = await Il(e, n, r.max_input_asset_bytes), a = Rs(r.max_input_asset_bytes);
		return {
			state: "completed",
			...Dl((await As(n, async (t, n) => {
				let o = vl(t, i), s = t.mode === "txt2img" ? "/sdapi/v1/txt2img" : "/sdapi/v1/img2img", c = this.#e.now(), l = await e.transport.execute({
					route: s,
					method: "POST",
					body: new TextEncoder().encode(JSON.stringify(o)),
					max_request_bytes: a,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes,
					signal: e.signal
				});
				if (e.log.write(xs({
					provider_id: this.provider_id,
					request_id: t.request_id,
					attempt: n,
					status_code: l.status,
					duration_ms: Math.max(0, this.#e.now() - c),
					byte_count: l.body.byteLength
				})), l.status === 451) throw new q({
					code: "content_blocked",
					retryable: !1,
					status_code: 451
				});
				if (l.status < 200 || l.status >= 300) {
					let e = ks(l.headers["retry-after"] ?? null, this.#e.now());
					throw new q(ss(l.status, {
						recoverable: jl.has(l.status),
						...e === void 0 ? {} : { retry_after_ms: e }
					}));
				}
				return l;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			})).body, n, r.max_response_bytes, r.output_mime_type_allowlist)
		};
	}
	poll(e, t) {
		return Promise.reject(Y());
	}
	async cancel(e, t) {
		if (t !== void 0 && t.state !== "pending") return;
		let n = Pl(e.profile), r = await e.transport.execute({
			route: "/sdapi/v1/interrupt",
			method: "POST",
			signal: e.signal,
			max_response_bytes: n.max_response_bytes
		});
		if (r.status < 200 || r.status >= 300) throw new q(ss(r.status));
	}
};
function Nl(e) {
	let t = Ae.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function Pl(e) {
	let t = kl.safeParse(e);
	if (!t.success) throw Y();
	return t.data;
}
function Fl(e, t) {
	if (!e.model_allowlist.includes(t.model_id) || t.vae_id !== void 0 && !e.vae_allowlist.includes(t.vae_id)) throw Y();
	for (let n of t.adetailer ?? []) if (!e.adetailer_model_allowlist.includes(n.model_id)) throw Y();
	for (let n of t.controlnet ?? []) if (!e.controlnet_model_allowlist.includes(n.model_id)) throw Y();
}
async function Il(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	t.input_asset_id !== void 0 && r.add(t.input_asset_id);
	for (let e of t.controlnet ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw Y();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
//#region ../../packages/storage/src/database_schema.ts
var Ll = "tavern_canvas_v3", Rl = {
	provider_profiles: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"provider_id",
			"updated_at"
		],
		since_version: 1
	},
	prompt_presets: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	comfy_workflows: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	novelai_vibes: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	character_profiles: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	regex_rules: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	knowledge_entries: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"source_type",
			"updated_at"
		],
		since_version: 1
	},
	vocabularies: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	vocabulary_groups: {
		key_path: "record_key",
		indexes: ["namespace", "vocabulary_id"],
		since_version: 1
	},
	vocabulary_packages: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"data_version",
			"state"
		],
		since_version: 1
	},
	vocabulary_shards: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"data_version",
			"kind"
		],
		since_version: 1
	},
	image_records: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"sha256",
			"created_at",
			"last_accessed_at",
			"pinned"
		],
		since_version: 1
	},
	image_blobs: {
		key_path: "sha256",
		indexes: ["ref_count", "byte_length"],
		since_version: 1
	},
	generation_jobs: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"request_id",
			"request_digest",
			"state",
			"updated_at"
		],
		since_version: 1
	},
	migration_journal: {
		key_path: "migration_id",
		indexes: [
			"source_version",
			"state",
			"updated_at"
		],
		since_version: 1
	},
	legacy_preferences: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 2
	},
	llm_connections: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"provider_kind",
			"updated_at"
		],
		since_version: 3
	}
}, zl = Je(() => He([
	L(),
	B(),
	V(),
	ue(),
	R(zl),
	z(L(), zl)
])), Bl = L().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), Vl = L().regex(/^[a-f0-9]{64}$/u), Hl = Ke({ offset: !0 }), Ul = L().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), Wl = {
	schema_version: I(1),
	id: Bl,
	namespace: Ul,
	record_key: L().min(1),
	created_at: Hl,
	updated_at: Hl,
	payload: zl.optional()
};
function Gl(e) {
	return H({
		...Wl,
		...e
	});
}
var Kl = L().min(1).max(128), ql = He([B().int().nonnegative(), L().min(1).max(128)]), Jl = L().min(1).max(64), Yl = L().min(1).max(128), Xl = Gl({ provider_id: Kl }), Zl = Gl({}), Ql = Gl({}), $l = Gl({}), eu = Gl({}), tu = Gl({}), nu = Gl({ source_type: L().min(1).max(128) }), ru = Gl({}), iu = Gl({ vocabulary_id: Bl }), au = Gl({
	data_version: ql,
	state: Jl
}), ou = Gl({
	data_version: ql,
	kind: Yl
}), su = Gl({}), cu = Gl({
	provider_kind: L().min(1).max(64),
	credential_reference: L().min(1).max(256).regex(/^tavern_canvas:[A-Za-z0-9_.:-]+$/u).nullable()
}), lu = Gl({
	sha256: Vl,
	last_accessed_at: Hl,
	pinned: V()
}), uu = et((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), du = H({
	sha256: Vl,
	ref_count: B().int().nonnegative(),
	byte_length: B().int().nonnegative(),
	blob: uu
}), fu = H({
	generation_anchor: Vl,
	scene_description: L().trim().min(1).max(12e3),
	negative_constraints: L().trim().max(4e3).optional(),
	context_turns: B().int().min(0).max(12).optional(),
	style_preset_id: Bl.optional(),
	image_count: B().int().min(1).max(4).optional()
}), pu = H({
	code: F([
		"auth_failed",
		"rate_limited",
		"content_blocked",
		"invalid_request",
		"provider_unavailable",
		"timed_out",
		"cancelled",
		"malformed_response"
	]),
	retryable: V(),
	retry_after_ms: B().int().nonnegative().optional(),
	status_code: B().int().min(100).max(599).optional()
}), mu = Gl({
	request_id: Bl,
	request_digest: Vl,
	generation_anchor: Vl,
	source_anchor: Vl,
	chat_id: L().min(1).max(512),
	requested_swipe_id: B().int().nonnegative(),
	provider_id: Kl,
	arguments: fu,
	state: F([
		"queued",
		"preparing",
		"submitting",
		"running",
		"completed",
		"failed",
		"cancelled",
		"attached",
		"orphaned"
	]),
	error: pu.nullable(),
	image_ids: R(Bl),
	automatic: V().optional()
}), hu = H({
	migration_id: L().min(1).max(256),
	source_version: B().int().nonnegative(),
	state: L().min(1).max(64),
	updated_at: Hl,
	payload: zl.optional()
}), gu = {
	provider_profiles: Xl,
	prompt_presets: Zl,
	comfy_workflows: Ql,
	novelai_vibes: $l,
	character_profiles: eu,
	regex_rules: tu,
	knowledge_entries: nu,
	vocabularies: ru,
	vocabulary_groups: iu,
	vocabulary_packages: au,
	vocabulary_shards: ou,
	image_records: lu,
	generation_jobs: mu,
	legacy_preferences: su,
	llm_connections: cu
}, _u = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function vu(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) vu(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				vu(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function yu(e) {
	return vu(e, "payload", /* @__PURE__ */ new WeakSet()), zl.parse(e);
}
function bu(e) {
	let t = yu(e), n = (e, t) => {
		if (Array.isArray(e)) {
			e.forEach((e, r) => {
				n(e, `${t}[${String(r)}]`);
			});
			return;
		}
		if (typeof e == "object" && e) for (let [r, i] of Object.entries(e)) {
			let e = r.toLowerCase().replace(/[^a-z0-9]/gu, "");
			if (_u.test(e)) throw TypeError(`${t}.${r} contains a credential-like field`);
			n(i, `${t}.${r}`);
		}
	};
	n(t, "payload");
}
function xu(e, t, n) {
	if (Ul.parse(e), Bl.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function Su(e, t, n, r, i) {
	if (!(t >= 3)) for (let [n, r] of Object.entries(Rl)) {
		if (r.since_version <= t) continue;
		let i = e.createObjectStore(n, { keyPath: r.key_path });
		for (let e of r.indexes) i.createIndex(e, e);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/idb@8.0.3/node_modules/idb/build/index.js
var Cu = (e, t) => t.some((t) => e instanceof t), wu, Tu;
function Eu() {
	return wu ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function Du() {
	return Tu ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var Ou = /* @__PURE__ */ new WeakMap(), ku = /* @__PURE__ */ new WeakMap(), Au = /* @__PURE__ */ new WeakMap();
function ju(e) {
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("success", i), e.removeEventListener("error", a);
		}, i = () => {
			t(Lu(e.result)), r();
		}, a = () => {
			n(e.error), r();
		};
		e.addEventListener("success", i), e.addEventListener("error", a);
	});
	return Au.set(t, e), t;
}
function Mu(e) {
	if (Ou.has(e)) return;
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("complete", i), e.removeEventListener("error", a), e.removeEventListener("abort", a);
		}, i = () => {
			t(), r();
		}, a = () => {
			n(e.error || new DOMException("AbortError", "AbortError")), r();
		};
		e.addEventListener("complete", i), e.addEventListener("error", a), e.addEventListener("abort", a);
	});
	Ou.set(e, t);
}
var Nu = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return Ou.get(e);
			if (t === "store") return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return Lu(e[t]);
	},
	set(e, t, n) {
		return e[t] = n, !0;
	},
	has(e, t) {
		return e instanceof IDBTransaction && (t === "done" || t === "store") || t in e;
	}
};
function Pu(e) {
	Nu = e(Nu);
}
function Fu(e) {
	return Du().includes(e) ? function(...t) {
		return e.apply(Ru(this), t), Lu(this.request);
	} : function(...t) {
		return Lu(e.apply(Ru(this), t));
	};
}
function Iu(e) {
	return typeof e == "function" ? Fu(e) : (e instanceof IDBTransaction && Mu(e), Cu(e, Eu()) ? new Proxy(e, Nu) : e);
}
function Lu(e) {
	if (e instanceof IDBRequest) return ju(e);
	if (ku.has(e)) return ku.get(e);
	let t = Iu(e);
	return t !== e && (ku.set(e, t), Au.set(t, e)), t;
}
var Ru = (e) => Au.get(e);
function zu(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = Lu(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(Lu(o.result), e.oldVersion, e.newVersion, Lu(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
var Bu = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], Vu = [
	"put",
	"add",
	"delete",
	"clear"
], Hu = /* @__PURE__ */ new Map();
function Uu(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (Hu.get(t)) return Hu.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = Vu.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || Bu.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return Hu.set(t, a), a;
}
Pu((e) => ({
	...e,
	get: (t, n, r) => Uu(t, n) || e.get(t, n, r),
	has: (t, n) => !!Uu(t, n) || e.has(t, n)
}));
var Wu = [
	"continue",
	"continuePrimaryKey",
	"advance"
], Gu = {}, Ku = /* @__PURE__ */ new WeakMap(), qu = /* @__PURE__ */ new WeakMap(), Ju = { get(e, t) {
	if (!Wu.includes(t)) return e[t];
	let n = Gu[t];
	return n ||= Gu[t] = function(...e) {
		Ku.set(this, qu.get(this)[t](...e));
	}, n;
} };
async function* Yu(...e) {
	let t = this;
	if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t) return;
	t = t;
	let n = new Proxy(t, Ju);
	for (qu.set(n, t), Au.set(n, Ru(t)); t;) yield n, t = await (Ku.get(n) || t.continue()), Ku.delete(n);
}
function Xu(e, t) {
	return t === Symbol.asyncIterator && Cu(e, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || t === "iterate" && Cu(e, [IDBIndex, IDBObjectStore]);
}
Pu((e) => ({
	...e,
	get(t, n, r) {
		return Xu(t, n) ? Yu : e.get(t, n, r);
	},
	has(t, n) {
		return Xu(t, n) || e.has(t, n);
	}
}));
//#endregion
//#region ../../packages/storage/src/open_database.ts
var Zu = null, Qu = null;
function $u(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), Zu === i && (Zu = null));
	}, r = () => (n(), Promise.resolve()), i = e;
	return Object.defineProperty(i, "connection", {
		configurable: !1,
		enumerable: !1,
		value: i,
		writable: !1
	}), Object.defineProperty(i, "dispose", {
		configurable: !0,
		enumerable: !1,
		value: r,
		writable: !1
	}), e.addEventListener("versionchange", n), i;
}
function ed() {
	return Zu === null ? (Qu === null && (Qu = zu(Ll, 3, { upgrade: Su }).then((e) => {
		let t = $u(e);
		return Zu = t, t;
	}).finally(() => {
		Qu = null;
	})), Qu) : Promise.resolve(Zu);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function td(e, t, n) {
	let r = Array.isArray(e) ? await ed() : e, i, a;
	if (Array.isArray(e) ? (i = e, a = t) : (i = t, a = n), !Array.isArray(i)) throw TypeError("with_transaction requires store names");
	if (typeof a != "function") throw TypeError("with_transaction requires a callback");
	let o = r.transaction(i, "readwrite");
	try {
		let e = await a(o);
		return await o.done, e;
	} catch (e) {
		try {
			o.abort();
		} catch {}
		try {
			await o.done;
		} catch {}
		throw e;
	}
}
//#endregion
//#region ../../packages/storage/src/repository.ts
var X = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, nd = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, rd = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function id(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new X(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function ad(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function od(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var sd = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = gu[t], r = !1) {
		this.database = e, this.store_name = t, this.schema = n, this.rejects_provider_secrets = r;
	}
	async get(e, t, n) {
		let r = this.record_key(e, t);
		return this.run_read(n, async (e) => {
			let t = await this.store(e).get(r);
			return t === void 0 ? null : this.validate_loaded(t);
		});
	}
	async list(e, t) {
		let n = Ul.parse(e);
		return this.run_read(t, async (e) => {
			let t = (await this.store(e).index("namespace").getAll(n)).map((e) => this.validate_loaded(e));
			return t.sort((e, t) => e.id < t.id ? -1 : +(e.id > t.id)), t;
		});
	}
	async create(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			try {
				await this.store(e).add(r);
			} catch (e) {
				throw ad(e) ? new nd(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new rd(this.store_name, r.record_key);
			this.validate_loaded(n), await t.put(r);
		});
	}
	async put(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			await this.store(e).put(r);
		});
	}
	async delete(e, t, n) {
		let r = this.record_key(e, t);
		await this.run_write(n, async (e) => {
			await this.store(e).delete(r);
		});
	}
	store(e) {
		return e.objectStore(this.store_name);
	}
	record_key(e, t) {
		return `${Ul.parse(e)}:${Bl.parse(t)}`;
	}
	prepare_record(e, t) {
		let n = Ul.parse(e), r = id(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new X("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new X("Record id must be a UUID");
		let i = Bl.safeParse(r.id);
		if (!i.success) throw new X("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new X("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new X("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = yu(r.payload);
			} catch (e) {
				throw new X(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				bu(r.payload);
			} catch (e) {
				throw new X(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new X("Record failed schema validation", o.error.issues);
		return xu(o.data.namespace, o.data.id, o.data.record_key), id(o.data);
	}
	validate_loaded(e) {
		let t = id(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new X("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			yu(t.payload);
		} catch (e) {
			throw new X(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new X("Stored record failed schema validation", n.error.issues);
		try {
			xu(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && bu(n.data.payload);
		} catch (e) {
			throw new X(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return id(n.data);
	}
	async run_read(e, t) {
		if (e !== void 0) return t(e);
		let n = this.database.transaction(this.store_name, "readonly");
		try {
			let e = await t(n);
			return await n.done, e;
		} catch (e) {
			try {
				await n.done;
			} catch {}
			throw e;
		}
	}
	async run_write(e, t) {
		if (e !== void 0) return od(e), t(e);
		let n = this.database.transaction(this.store_name, "readwrite");
		try {
			let e = await t(n);
			return await n.done, e;
		} catch (e) {
			try {
				n.abort();
			} catch {}
			try {
				await n.done;
			} catch {}
			throw e;
		}
	}
}, cd = F([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), ld = H({
	chat_id: L().trim().min(1).max(512),
	message_id: L().trim().min(1).max(512),
	swipe_id: B().int().nonnegative()
}), ud = H({
	provider_id: fe,
	source_message: ld,
	generation_parameters: xe,
	media_type: cd,
	width: B().int().positive().optional(),
	height: B().int().positive().optional(),
	persisted_url: $e().max(2048).optional(),
	quarantined: V().default(!1),
	duration_ms: B().int().positive().optional(),
	poster_image_id: Bl.optional(),
	source_job_id: Bl.optional()
}), dd = lu.extend(ud.shape), fd = He([lu, dd]);
function pd(e) {
	return "media_type" in e;
}
var md = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], hd = [
	255,
	216,
	255
], gd = [
	82,
	73,
	70,
	70
], _d = [
	87,
	69,
	66,
	80
], vd = [
	102,
	116,
	121,
	112
];
function yd(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function bd(e) {
	if (yd(e, md)) return "image/png";
	if (yd(e, hd)) return "image/jpeg";
	if (yd(e, gd) && yd(e, _d, 8)) return "image/webp";
	if (yd(e, vd, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/job_repository.ts
var xd = class extends sd {
	constructor(e) {
		super(e, "generation_jobs", mu);
	}
};
function Sd(e) {
	return new xd(e);
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var Cd = class extends sd {
	constructor(e) {
		super(e, "provider_profiles", Xl, !0);
	}
}, wd = class extends sd {
	constructor(e) {
		super(e, "prompt_presets", Zl);
	}
}, Td = class extends sd {
	constructor(e) {
		super(e, "comfy_workflows", Ql);
	}
}, Ed = class extends sd {
	constructor(e) {
		super(e, "novelai_vibes", $l);
	}
}, Dd = class extends sd {
	constructor(e) {
		super(e, "character_profiles", eu);
	}
}, Od = class extends sd {
	constructor(e) {
		super(e, "regex_rules", tu);
	}
}, kd = class extends sd {
	constructor(e) {
		super(e, "knowledge_entries", nu);
	}
}, Ad = class extends sd {
	constructor(e) {
		super(e, "vocabularies", ru);
	}
}, jd = class extends sd {
	constructor(e) {
		super(e, "vocabulary_groups", iu);
	}
}, Md = class extends sd {
	constructor(e) {
		super(e, "vocabulary_packages", au);
	}
}, Nd = class extends sd {
	constructor(e) {
		super(e, "vocabulary_shards", ou);
	}
}, Pd = class extends sd {
	constructor(e) {
		super(e, "image_records", fd);
	}
}, Fd = class extends sd {
	constructor(e) {
		super(e, "legacy_preferences", su);
	}
}, Id = class extends sd {
	constructor(e) {
		super(e, "llm_connections", cu, !0);
	}
};
function Ld(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new X(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Rd(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function zd(e, t, n, r) {
	if (n !== void 0) return r(n);
	let i = e.transaction(t, "readonly");
	try {
		let e = await r(i);
		return await i.done, e;
	} catch (e) {
		try {
			await i.done;
		} catch {}
		throw e;
	}
}
async function Bd(e, t, n, r) {
	if (n !== void 0) {
		if (n.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
		return r(n);
	}
	let i = e.transaction(t, "readwrite");
	try {
		let e = await r(i);
		return await i.done, e;
	} catch (e) {
		try {
			i.abort();
		} catch {}
		try {
			await i.done;
		} catch {}
		throw e;
	}
}
var Vd = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = Vl.parse(e);
		return zd(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return zd(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw Rd(e) ? new nd("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new rd("image_blobs", n.sha256);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").put(n);
		});
	}
	async delete(e, t) {
		let n = Vl.parse(e);
		await Bd(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Ld(e), n = du.safeParse(t);
		if (!n.success) throw new X("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new X("Image blob byte_length does not match blob data");
		return Ld(n.data);
	}
	validate(e) {
		let t = Ld(e), n = du.safeParse(t);
		if (!n.success) throw new X("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new X("Stored image blob byte_length does not match blob data");
		return Ld(n.data);
	}
}, Hd = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = this.key(e);
		return zd(this.database, "migration_journal", t, async (e) => {
			let t = await e.objectStore("migration_journal").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return zd(this.database, "migration_journal", e, async (e) => (await e.objectStore("migration_journal").getAll()).map((e) => this.validate(e)).sort((e, t) => e.migration_id < t.migration_id ? -1 : +(e.migration_id > t.migration_id)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "migration_journal", t, async (e) => {
			try {
				await e.objectStore("migration_journal").add(n);
			} catch (e) {
				throw Rd(e) ? new nd("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new rd("migration_journal", n.migration_id);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Bd(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").put(n);
		});
	}
	async delete(e, t) {
		let n = this.key(e);
		await Bd(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").delete(n);
		});
	}
	key(e) {
		let t = hu.shape.migration_id.safeParse(e);
		if (!t.success) throw new X("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = Ld(e);
		if (t.payload !== void 0) try {
			t.payload = yu(t.payload);
		} catch (e) {
			throw new X(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = hu.safeParse(t);
		if (!n.success) throw new X("Migration journal failed schema validation", n.error.issues);
		return Ld(n.data);
	}
	validate(e) {
		let t = Ld(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			yu(t.payload);
		} catch (e) {
			throw new X(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = hu.safeParse(t);
		if (!n.success) throw new X("Stored migration journal failed schema validation", n.error.issues);
		return Ld(n.data);
	}
};
function Ud(e) {
	return {
		provider_profiles: new Cd(e),
		prompt_presets: new wd(e),
		comfy_workflows: new Td(e),
		novelai_vibes: new Ed(e),
		character_profiles: new Dd(e),
		regex_rules: new Od(e),
		knowledge_entries: new kd(e),
		vocabularies: new Ad(e),
		vocabulary_groups: new jd(e),
		vocabulary_packages: new Md(e),
		vocabulary_shards: new Nd(e),
		image_records: new Pd(e),
		image_blobs: new Vd(e),
		migration_journal: new Hd(e),
		generation_jobs: new xd(e),
		legacy_preferences: new Fd(e),
		llm_connections: new Id(e)
	};
}
//#endregion
//#region ../../packages/storage/src/images/image_store.ts
var Wd = ["image_records", "image_blobs"], Gd = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, Kd = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, qd = class extends sd {
	constructor(e) {
		super(e, "image_records", dd);
	}
};
async function Jd(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function Yd(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function Xd(e, t, n, r) {
	let i = bd(n);
	if (i === void 0 || i !== r) throw new Kd(r);
	let a = Vl.parse(vn(An(n))), o = await t.get(a, e);
	if (o === null) {
		let r = await Yd(e, a) + 1, o = {
			sha256: a,
			ref_count: r,
			byte_length: n.byteLength,
			blob: new Blob([new Uint8Array(n)], { type: i })
		};
		return await t.create(o, e), {
			sha256: a,
			byte_length: o.byte_length,
			media_type: i,
			ref_count: r
		};
	}
	let s = {
		...o,
		ref_count: o.ref_count + 1
	};
	return await t.put(s, e), {
		sha256: a,
		byte_length: o.byte_length,
		media_type: i,
		ref_count: s.ref_count
	};
}
async function Zd(e, t, n) {
	let r = Vl.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function Qd(e, t, n) {
	let r = Vl.parse(n), i = await t.get(r, e);
	if (i === null) return null;
	let a = await Jd(i.blob);
	if (vn(An(a)) !== r) throw new Gd(r);
	return a;
}
async function $d(e, t, n, r, i) {
	let a = await Xd(e, n, i.bytes, i.claimed_media_type), o = {
		schema_version: 1,
		id: i.id,
		namespace: r,
		record_key: `${r}:${i.id}`,
		created_at: i.created_at,
		updated_at: i.created_at,
		sha256: a.sha256,
		last_accessed_at: i.created_at,
		pinned: i.pinned ?? !1,
		...i.metadata,
		media_type: a.media_type,
		quarantined: !1
	};
	return await t.create(r, o, e), o;
}
async function ef(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new rd("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await Zd(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function tf(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = fd.safeParse(n);
		if (!r.success || !pd(r.data)) continue;
		let i = r.data;
		i.quarantined || await t.update(i.namespace, {
			...i,
			quarantined: !0
		}, e);
	}
}
async function nf(e, t, n) {
	let r = new qd(e), i = new Vd(e);
	return td(e, Wd, (e) => $d(e, r, i, t, n));
}
async function rf(e, t, n) {
	let r = new qd(e), i = new Vd(e);
	return td(e, Wd, (e) => ef(e, r, i, t, n));
}
async function af(e, t) {
	let n = new qd(e), r = new Vd(e), i = await td(e, Wd, async (e) => {
		try {
			return { bytes: await Qd(e, r, t) };
		} catch (t) {
			if (!(t instanceof Gd)) throw t;
			return await tf(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
//#region ../../packages/storage/src/archive/archive_manifest.ts
var of = "manifest.json", sf = "checksums.json", cf = "assets", lf = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;
function uf(e) {
	return `records/${e}.jsonl`;
}
var df = /* @__PURE__ */ new Set([
	of,
	sf,
	...Fe.map(uf)
]);
function ff(e) {
	return df.has(e) || mf(e) !== null;
}
function pf(e, t) {
	return `${cf}/${e}.${t}`;
}
function mf(e) {
	let t = lf.exec(e);
	if (t === null) return null;
	let [, n, r] = t;
	return n === void 0 || r === void 0 ? null : {
		sha256: n,
		extension: r
	};
}
var hf = [
	{
		extension: "png",
		bytes: [
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		]
	},
	{
		extension: "jpg",
		bytes: [
			255,
			216,
			255
		]
	},
	{
		extension: "gif",
		bytes: [
			71,
			73,
			70,
			56
		]
	}
];
function gf(e, t, n) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function _f(e) {
	for (let t of hf) if (gf(e, t.bytes, t.offset ?? 0)) return t.extension;
	return gf(e, [
		82,
		73,
		70,
		70
	], 0) && gf(e, [
		87,
		69,
		66,
		80
	], 8) ? "webp" : "bin";
}
function vf(e) {
	return vn(An(e));
}
function yf() {
	let e = {};
	for (let t of Fe) e[t] = 0;
	return e;
}
function bf(e) {
	return {
		format: Ue,
		schema_version: 1,
		extension_version: e.extension_version,
		created_at: e.created_at,
		record_counts: e.record_counts,
		asset_count: e.asset_count,
		excluded_secret_categories: [...Ge]
	};
}
//#endregion
//#region ../../packages/storage/src/archive/_zip_module.ts
var xf;
function Sf() {
	return xf ??= import("./chunks/zip.js-mUlaFE4p.js"), xf;
}
//#endregion
//#region ../../packages/storage/src/archive/export_archive.ts
var Cf = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "ArchiveExportError", this.reason = e;
	}
};
function wf(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function Tf(e) {
	if (e?.aborted === !0) throw new Cf("cancelled", "Export was cancelled");
}
async function Ef(e) {
	return typeof Blob < "u" && e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
}
async function Df(e) {
	let { database: t, namespace: n, extension_version: r, signal: i } = e, a = e.created_at ?? (/* @__PURE__ */ new Date()).toISOString(), o = Ud(t), s = new TextEncoder(), c = await Sf(), l = new c.ZipWriter(new c.BlobWriter("application/zip"), {
		level: 9,
		...i === void 0 ? {} : { signal: i }
	});
	try {
		let e = yf(), t = {};
		for (let r of Fe) {
			Tf(i);
			let a = await o[r].list(n), u = a.map((e) => JSON.stringify(e)).join("\n"), d = s.encode(a.length === 0 ? "" : `${u}\n`), f = uf(r);
			await l.add(f, new c.Uint8ArrayReader(d)), t[f] = {
				sha256: vf(d),
				byte_length: d.byteLength
			}, e[r] = a.length;
		}
		let u = await o.image_records.list(n), d = [...new Set(u.map((e) => e.sha256))].sort();
		for (let e of d) {
			Tf(i);
			let n = await o.image_blobs.get(e);
			if (n === null) throw new Cf("missing_asset_blob", `image_blobs is missing content referenced by image_records: ${e}`);
			let r = await Ef(n.blob), a = pf(e, _f(r));
			await l.add(a, new c.Uint8ArrayReader(r)), t[a] = {
				sha256: vf(r),
				byte_length: r.byteLength
			};
		}
		let f = bf({
			extension_version: r,
			created_at: a,
			record_counts: e,
			asset_count: d.length
		}), p = s.encode(JSON.stringify(f));
		await l.add(of, new c.Uint8ArrayReader(p)), t[of] = {
			sha256: vf(p),
			byte_length: p.byteLength
		};
		let m = s.encode(JSON.stringify(t));
		return await l.add(sf, new c.Uint8ArrayReader(m)), await l.close();
	} catch (e) {
		throw wf(e) || i?.aborted === !0 ? new Cf("cancelled", "Export was cancelled") : e;
	}
}
//#endregion
//#region ../../packages/storage/src/archive/import_archive.ts
var Z = class extends Error {
	reason;
	namespace;
	constructor(e, t, n) {
		super(t), this.name = "ArchiveImportError", this.reason = e, this.namespace = n;
	}
};
function Of(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function kf(e) {
	if (e?.aborted === !0) throw new Z("cancelled", "Import was cancelled");
}
async function Af(e) {
	let t = await Sf();
	return typeof Blob < "u" && e instanceof Blob ? new t.BlobReader(e) : new t.Uint8ArrayReader(new Uint8Array(e));
}
async function jf(e) {
	try {
		await e.close();
	} catch {}
}
async function Mf(e, t) {
	if (e.uncompressedSize > 536870912) throw new Z("size_limit_exceeded", `Entry exceeds the maximum allowed uncompressed size: ${e.filename}`);
	let n = await Sf();
	return e.getData(new n.Uint8ArrayWriter(), t === void 0 ? {} : { signal: t });
}
function Nf(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
async function Pf(e, t) {
	let n = e.get(of);
	if (n === void 0) throw new Z("missing_file", `Archive is missing ${of}`);
	let r = await Mf(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new Z("invalid_manifest", `${of} is not valid JSON`);
	}
	if (Nf(i) !== 1) throw new Z("unsupported_schema", "Archive declares an unsupported schema version");
	let a = mt.safeParse(i);
	if (!a.success) throw new Z("invalid_manifest", `${of} failed schema validation`);
	return {
		bytes: r,
		manifest: a.data
	};
}
async function Ff(e, t) {
	let n = e.get(sf);
	if (n === void 0) throw new Z("missing_file", `Archive is missing ${sf}`);
	let r = await Mf(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new Z("invalid_checksums", `${sf} is not valid JSON`);
	}
	let a = dt.safeParse(i);
	if (!a.success) throw new Z("invalid_checksums", `${sf} failed schema validation`);
	return a.data;
}
function If(e, t) {
	for (let n of Object.keys(t)) if (!e.has(n)) throw new Z("missing_file", `Archive is missing a file declared in ${sf}: ${n}`);
	for (let n of e.keys()) if (n !== "checksums.json" && !(n in t)) throw new Z("undeclared_file", `Archive contains a file not declared in ${sf}: ${n}`);
}
function Lf(e, t, n) {
	let r = n[e];
	if (r === void 0) throw new Z("missing_file", `${sf} has no entry for ${e}`);
	if (t.byteLength !== r.byte_length || vf(t) !== r.sha256) throw new Z("checksum_mismatch", `Checksum mismatch for ${e}`);
}
function Rf(e) {
	return e === "image_records" ? fd : gu[e];
}
function zf(e, t, n) {
	let r = new TextDecoder().decode(n);
	if (r.length === 0) return [];
	let i = Rf(e);
	return r.split("\n").filter((e) => e.length > 0).map((e, n) => {
		let r;
		try {
			r = JSON.parse(e);
		} catch {
			throw new Z("malformed_record", `${t}:${String(n + 1)} is not valid JSON`);
		}
		let a = i.safeParse(r);
		if (!a.success) throw new Z("invalid_record", `${t}:${String(n + 1)} failed schema validation`);
		return a.data;
	});
}
function Bf(e, t) {
	return {
		...e,
		namespace: t,
		record_key: `${t}:${e.id}`
	};
}
async function Vf(e, t, n, r, i) {
	let a = await e.get(t);
	if (a === null) {
		let a = bd(n), o = new Uint8Array(n);
		await e.create({
			sha256: t,
			ref_count: r,
			byte_length: n.byteLength,
			blob: a === void 0 ? new Blob([o]) : new Blob([o], { type: a })
		}), i.set(t, {
			created: !0,
			delta: r
		});
	} else await e.update({
		...a,
		ref_count: a.ref_count + r
	}), i.set(t, {
		created: !1,
		delta: r
	});
}
async function Hf(e, t, n) {
	for (let r of Fe) {
		let i = await t[r].list(n);
		i.length !== 0 && await td(e, [r], async (e) => {
			for (let a of i) await t[r].delete(n, a.id, e);
		});
	}
}
async function Uf(e, t) {
	for (let [n, r] of t) {
		if (r.created) {
			await e.delete(n);
			continue;
		}
		let t = await e.get(n);
		t !== null && await e.update({
			...t,
			ref_count: Math.max(0, t.ref_count - r.delta)
		});
	}
}
async function Wf(e) {
	let { database: t, signal: n } = e, r = await Sf(), i = await Af(e.archive), a = new r.ZipReader(i, n === void 0 ? {} : { signal: n }), o;
	try {
		o = await a.getEntries();
	} catch (e) {
		throw await jf(a), Of(e) || n?.aborted === !0 ? new Z("cancelled", "Import was cancelled") : new Z("invalid_input", `Archive could not be read: ${e instanceof Error ? e.message : String(e)}`);
	}
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		if (e.directory) throw await jf(a), new Z("unexpected_path", `Unexpected directory entry: ${e.filename}`);
		if (s.has(e.filename)) throw await jf(a), new Z("duplicate_path", `Duplicate path in archive: ${e.filename}`);
		if (!ff(e.filename)) throw await jf(a), new Z("unexpected_path", `Unexpected path in archive: ${e.filename}`);
		s.set(e.filename, e);
	}
	let c = `import:${crypto.randomUUID()}`, l = Ud(t), u = /* @__PURE__ */ new Map();
	try {
		let e = await Pf(s, n), r = await Ff(s, n);
		If(s, r), Lf(of, e.bytes, r);
		let i = e.manifest, o = yf(), d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
		for (let e of Fe) {
			kf(n);
			let i = uf(e), a = s.get(i);
			if (a === void 0) throw new Z("missing_file", `Archive is missing ${i}`);
			let u = await Mf(a, n);
			Lf(i, u, r);
			let m = zf(e, i, u);
			o[e] = m.length;
			let h = m.map((e) => Bf(e, c));
			if (await td(t, [e], async (t) => {
				for (let n of h) await l[e].create(c, n, t);
			}), e === "vocabularies") for (let e of h) d.add(e.id);
			else if (e === "vocabulary_groups") {
				for (let e of h) if (!d.has(e.vocabulary_id)) throw new Z("reference_mismatch", `vocabulary_groups ${e.id} references a missing vocabulary ${e.vocabulary_id}`);
			} else if (e === "image_records") for (let e of h) f.add(e.id), p.set(e.sha256, (p.get(e.sha256) ?? 0) + 1);
			else if (e === "generation_jobs") {
				for (let e of h) for (let t of e.image_ids) if (!f.has(t)) throw new Z("reference_mismatch", `generation_jobs ${e.id} references a missing image_record ${t}`);
			}
		}
		let m = 0, h = /* @__PURE__ */ new Set();
		for (let [e, t] of s) {
			let i = mf(e);
			if (i === null) continue;
			kf(n);
			let a = await Mf(t, n);
			if (Lf(e, a, r), vf(a) !== i.sha256) throw new Z("checksum_mismatch", `Asset content hash does not match its filename: ${e}`);
			let o = p.get(i.sha256);
			if (o === void 0) throw new Z("reference_mismatch", `Asset is not referenced by any image_record: ${e}`);
			await Vf(l.image_blobs, i.sha256, a, o, u), h.add(i.sha256), m += 1;
		}
		for (let e of p.keys()) if (!h.has(e)) throw new Z("missing_file", `image_records reference asset ${e} with no matching archive asset file`);
		for (let e of Fe) if (i.record_counts[e] !== o[e]) throw new Z("count_mismatch", `Declared record count for ${e} does not match the archive contents`);
		if (i.asset_count !== m) throw new Z("count_mismatch", "Declared asset count does not match the archive contents");
		let g = {
			migration_id: c,
			source_version: 1,
			state: "import_ready",
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: {
				record_counts: o,
				asset_count: m,
				extension_version: i.extension_version
			}
		};
		return await l.migration_journal.create(g), await jf(a), {
			namespace: c,
			manifest: i,
			asset_count: m
		};
	} catch (e) {
		throw await Hf(t, l, c), await Uf(l.image_blobs, u), await jf(a), e instanceof Z ? new Z(e.reason, e.message, c) : Of(e) || n?.aborted === !0 ? new Z("cancelled", "Import was cancelled", c) : new Z("invalid_input", `Archive could not be imported: ${e instanceof Error ? e.message : String(e)}`, c);
	}
}
//#endregion
//#region src/modules/media/chat_media_interactions.ts
function Gf(e) {
	return {
		available: !1,
		reason: e
	};
}
var Kf = class {
	capability = Gf("Standard SillyTavern host exposes no message-media gesture hook; use Gallery or the image parameters dialog instead.");
	subscribe(e) {
		return () => {};
	}
}, qf = class {
	capability = { available: !0 };
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	handle(e) {
		for (let t of [...this.#e]) t({
			image_id: e.image_id,
			gesture: e.action
		});
	}
}, Jf = 4, Yf = [
	102,
	116,
	121,
	112
];
function Xf(e) {
	return e.length < Jf + Yf.length ? !1 : Yf.every((t, n) => e[Jf + n] === t);
}
function Zf(e) {
	let t = e.slice(0, 16);
	t[6] = (t[6] ?? 0) & 15 | 80, t[8] = (t[8] ?? 0) & 63 | 128;
	let n = vn(t);
	return be.parse(`${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20)}`);
}
var Qf = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VideoAssetError", this.code = e;
	}
};
function $f(e, t) {
	if (!Xf(e)) throw new Qf("not_mp4", "Bytes do not carry an MP4 ftyp signature");
	let n = An(e);
	return {
		asset: {
			asset_id: Zf(n),
			media_type: "video/mp4",
			byte_length: e.byteLength,
			sha256: vn(n),
			...t === void 0 ? {} : { duration_ms: t }
		},
		bytes: e
	};
}
var ep = /src="([^"]+\.mp4[^"]*)"/u, tp = 2e6, np = 1e8, rp = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VideoGenerationError", this.code = e;
	}
};
async function ip(e, t, n) {
	let r = await e.execute({
		route: t.route,
		method: "POST",
		content_type: t.content_type,
		accept: "application/json",
		body: t.body,
		max_request_bytes: t.body.byteLength,
		max_response_bytes: tp,
		signal: n
	}), i = new TextDecoder().decode(r.body), a = ep.exec(i);
	if (a?.[1] === void 0) throw new rp("no_video_url", "Provider response carried no mp4 reference");
	if (e.fetch_remote_asset === void 0) throw new rp("fetch_failed", "Transport cannot fetch remote video assets");
	return $f((await e.fetch_remote_asset({
		url: a[1],
		allowed_origins: [new URL(a[1]).origin],
		max_bytes: np,
		signal: n
	})).body, void 0);
}
//#endregion
//#region src/modules/media/media_command_service.ts
var ap = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async save(e) {
		let t = Sd(this.#e), n = {
			schema_version: 1,
			id: e.job_id,
			namespace: this.#t,
			record_key: `${this.#t}:${e.job_id}`,
			created_at: e.created_at,
			updated_at: e.updated_at,
			request_id: e.request_id,
			request_digest: e.request_digest,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor,
			chat_id: e.chat_id,
			requested_swipe_id: e.requested_swipe_id,
			provider_id: e.provider_id,
			arguments: e.arguments,
			state: e.state,
			error: e.error,
			image_ids: [...e.image_ids]
		};
		await t.put(this.#t, n);
	}
}, op = class {
	#e = /* @__PURE__ */ new Map();
	register(e, t) {
		this.#e.set(e, t);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
}, sp = 1e3, cp = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new Wn({
			code: "invalid_request",
			retryable: !1
		});
		let r = n.kind === "video" ? await this.#n(n.request, t) : await this.#r(n.request, t);
		return { image_ids: await this.#i(e, r) };
	}
	async #n(e, t) {
		return await t.mark_running(), [await ip(this.#e.transport, e, t.signal)];
	}
	async #r(e, t) {
		let n = this.#e.adapters[e.provider_id];
		if (n === void 0) throw new Wn({
			code: "provider_unavailable",
			retryable: !1
		});
		let r = {
			profile: this.#e.profiles.resolve(e.provider_id),
			transport: this.#e.transport,
			assets: this.#e.assets,
			signal: t.signal,
			log: this.#e.log
		};
		await t.mark_running();
		let i = await n.submit(r, e);
		if (i.state === "completed") return i.output_assets;
		let a = i.poll_after_ms ?? sp;
		for (;;) {
			await this.#t(a);
			let e = await n.poll(r, i);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new Wn(e.error);
			a = e.poll_after_ms ?? a;
		}
	}
	async #i(e, t) {
		let n = this.#e.resolve_source_message(e), r = [];
		for (let i of t) {
			let t = this.#e.ids.next();
			await this.#e.store.put_image({
				id: t,
				bytes: i.bytes,
				claimed_media_type: i.asset.media_type,
				created_at: this.#e.clock.now(),
				metadata: {
					provider_id: e.provider_id,
					source_message: n,
					generation_parameters: e.arguments
				}
			}), r.push(t);
		}
		return r.map((e) => Ne.parse(e));
	}
};
async function lp(e, t, n) {
	return e.plans.register(n.request_id, {
		kind: "adapter",
		request: n
	}), up(e.queue, t, n.request_id, n.provider_id);
}
async function up(e, t, n, r) {
	let i = {
		request_id: n,
		generation_anchor: t.generation_anchor,
		source_anchor: t.source_anchor,
		chat_id: t.chat_id,
		requested_swipe_id: t.requested_swipe_id,
		provider_id: r,
		arguments: {
			generation_anchor: t.generation_anchor,
			scene_description: t.scene_description
		},
		automatic: !1
	};
	return e.enqueue(i);
}
function dp(e, t) {
	return e.queue.cancel(t);
}
//#endregion
//#region src/modules/tauri/chat_surface_module.ts
var fp = "data-tavern-canvas-image-id", pp = 500, mp = 8;
function hp(e) {
	let t = e.getAttribute(fp);
	if (t === null) return null;
	let n = Ne.safeParse(t);
	return n.success ? n.data : null;
}
function gp(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(`[${fp}]`);
	return t === null ? null : hp(t);
}
function _p(e, t) {
	return e instanceof Error ? e.message : t;
}
var vp = class {
	module_id = "tauri_chat_surface";
	requires = [];
	#e;
	#t;
	#n;
	#r = null;
	#i = {
		tauri_chat_surface_available: !1,
		reason: "not started"
	};
	constructor(e) {
		this.#e = e.globals, this.#t = e.port, this.#n = e.connect ?? Nr;
	}
	get diagnostics() {
		return this.#i;
	}
	async start() {
		if (this.#r !== null) return;
		let e;
		try {
			e = await this.#n(this.#e);
		} catch (e) {
			this.#i = {
				tauri_chat_surface_available: !1,
				reason: _p(e, "TauriTavern connection failed")
			};
			return;
		}
		if (e === void 0) {
			this.#i = {
				tauri_chat_surface_available: !1,
				reason: "TauriTavern is not present on this host"
			};
			return;
		}
		try {
			e.register_chat_surface(this.#a()), this.#r = e, this.#i = { tauri_chat_surface_available: !0 };
		} catch (e) {
			this.#i = {
				tauri_chat_surface_available: !1,
				reason: _p(e, "TauriTavern ChatSurface registration failed")
			};
		}
	}
	stop() {
		return this.#r = null, this.#i = {
			tauri_chat_surface_available: !1,
			reason: "stopped"
		}, Promise.resolve();
	}
	#a() {
		return {
			id: "tavern-canvas-chat-surface",
			did_mount: (e) => this.#o(e)
		};
	}
	#o(e) {
		let t = e.content, n = this.#t, r = e.message_id, i = null, a = null, o = null, s = !1;
		function c() {
			i !== null && (clearTimeout(i), i = null), a = null, o = null;
		}
		function l(e, t) {
			n.handle({
				action: e,
				image_id: t,
				message_id: r
			});
		}
		function u(e) {
			if (s) {
				s = !1;
				return;
			}
			let t = gp(e.target);
			t !== null && l("click", t);
		}
		function d(e) {
			let t = gp(e.target);
			t !== null && l("double_click", t);
		}
		function f(e) {
			let t = gp(e.target);
			t !== null && (e.preventDefault(), l("context", t));
		}
		function p(e) {
			let t = gp(e.target);
			t !== null && (a = {
				x: e.clientX,
				y: e.clientY
			}, o = t, s = !1, i = setTimeout(() => {
				o !== null && (s = !0, l("long_press", o));
			}, pp));
		}
		function m(e) {
			if (a === null) return;
			let t = Math.abs(e.clientX - a.x), n = Math.abs(e.clientY - a.y);
			(t > mp || n > mp) && c();
		}
		function h() {
			c();
		}
		function g() {
			c();
		}
		return t.addEventListener("click", u), t.addEventListener("dblclick", d), t.addEventListener("contextmenu", f), t.addEventListener("pointerdown", p), t.addEventListener("pointermove", m), t.addEventListener("pointerup", h), t.addEventListener("pointercancel", g), () => {
			c(), t.removeEventListener("click", u), t.removeEventListener("dblclick", d), t.removeEventListener("contextmenu", f), t.removeEventListener("pointerdown", p), t.removeEventListener("pointermove", m), t.removeEventListener("pointerup", h), t.removeEventListener("pointercancel", g);
		};
	}
}, yp = class extends TypeError {}, bp = class extends Error {
	path;
	constructor(e, t) {
		super(t), this.name = "PackageFetchError", this.path = e;
	}
}, xp = "manifest.json", Sp = 8388608;
function Cp(e) {
	let t;
	try {
		t = new URL(e.base_url);
	} catch {
		throw new yp(`Package source base_url is not a valid absolute URL: ${e.base_url}`);
	}
	if (e.kind === "https" && t.protocol !== "https:") throw new yp(`An HTTPS package source must use the https: scheme, got: ${t.protocol}`);
	return t.pathname.endsWith("/") || (t.pathname = `${t.pathname}/`), t.search = "", t.hash = "", t;
}
function wp(e, t) {
	return new URL(t, e);
}
async function Tp(e, t, n, r) {
	if (e === null) throw new bp(t, `Response for ${t} has no readable body`);
	let i = e.getReader(), a = [], o = 0;
	for (;;) {
		let { done: e, value: s } = await i.read();
		if (e) break;
		if (o += s.byteLength, o > n) throw await i.cancel("bounded_stream_exceeded").catch(() => void 0), new bp(t, `Response for ${t} exceeded the allowed ${String(n)}-byte bound`);
		a.push(s), r?.({
			downloaded_bytes: o,
			total_bytes: n
		});
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
function Ep(e, t = fetch) {
	let n = Cp(e);
	return {
		async fetch_manifest(e) {
			let r = await t(wp(n, xp), e === void 0 ? {} : { signal: e });
			if (!r.ok) throw new bp(xp, `Manifest request failed with status ${String(r.status)}`);
			let i = await Tp(r.body, xp, Sp), a;
			try {
				a = JSON.parse(new TextDecoder().decode(i));
			} catch {
				throw new bp(xp, "Manifest response is not valid JSON");
			}
			let o = ut.safeParse(a);
			if (!o.success) throw new bp(xp, "Manifest response failed schema validation");
			return o.data;
		},
		async fetch_shard_bytes(e, r) {
			let i = await t(wp(n, e), r.signal === void 0 ? {} : { signal: r.signal });
			if (!i.ok) throw new bp(e, `Shard request failed with status ${String(i.status)}: ${e}`);
			return Tp(i.body, e, r.max_bytes, r.on_progress);
		}
	};
}
new TextEncoder();
var Dp = 4096;
function Op(e, t, n) {
	let r = t, i = r + n, a = [], o = "";
	for (; r < i;) {
		let t = e[r++];
		if (!(t & 128)) a.push(t);
		else if ((t & 224) == 192) {
			let n = e[r++] & 63;
			a.push((t & 31) << 6 | n);
		} else if ((t & 240) == 224) {
			let n = e[r++] & 63, i = e[r++] & 63;
			a.push((t & 31) << 12 | n << 6 | i);
		} else if ((t & 248) == 240) {
			let n = e[r++] & 63, i = e[r++] & 63, o = e[r++] & 63, s = (t & 7) << 18 | n << 12 | i << 6 | o;
			s > 65535 && (s -= 65536, a.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), a.push(s);
		} else a.push(t);
		a.length >= Dp && (o += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (o += String.fromCharCode(...a)), o;
}
var kp = new TextDecoder(), Ap = 200;
function jp(e, t, n) {
	let r = e.subarray(t, t + n);
	return kp.decode(r);
}
function Mp(e, t, n) {
	return n > Ap ? jp(e, t, n) : Op(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var Np = class {
	type;
	data;
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, Pp = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
};
function Fp(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function Ip(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function Lp(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var Rp = 4294967295, zp = 17179869183;
function Bp({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= zp) if (t === 0 && e <= Rp) {
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = /* @__PURE__ */ new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	{
		let n = /* @__PURE__ */ new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), Fp(r, 4, e), n;
	}
}
function Vp(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function Hp(e) {
	return e instanceof Date ? Bp(Vp(e)) : null;
}
function Up(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	switch (e.byteLength) {
		case 4: return {
			sec: t.getUint32(0),
			nsec: 0
		};
		case 8: {
			let e = t.getUint32(0), n = t.getUint32(4);
			return {
				sec: (e & 3) * 4294967296 + n,
				nsec: e >>> 2
			};
		}
		case 12: return {
			sec: Ip(t, 4),
			nsec: t.getUint32(0)
		};
		default: throw new Pp(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function Wp(e) {
	let t = Up(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var Gp = {
	type: -1,
	encode: Hp,
	decode: Wp
}, Kp = class e {
	static defaultCodec = new e();
	__brand;
	builtInEncoders = [];
	builtInDecoders = [];
	encoders = [];
	decoders = [];
	constructor() {
		this.register(Gp);
	}
	register({ type: e, encode: t, decode: n }) {
		if (e >= 0) this.encoders[e] = t, this.decoders[e] = n;
		else {
			let r = -1 - e;
			this.builtInEncoders[r] = t, this.builtInDecoders[r] = n;
		}
	}
	tryToEncode(e, t) {
		for (let n = 0; n < this.builtInEncoders.length; n++) {
			let r = this.builtInEncoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new Np(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new Np(n, i);
			}
		}
		return e instanceof Np ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new Np(t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function qp(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function Jp(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : qp(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function Yp(e) {
	return `${e < 0 ? "-" : ""}0x${Math.abs(e).toString(16).padStart(2, "0")}`;
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var Xp = 16, Zp = 16, Qp = class {
	hit = 0;
	miss = 0;
	caches;
	maxKeyLength;
	maxLengthPerKey;
	constructor(e = Xp, t = Zp) {
		this.maxKeyLength = e, this.maxLengthPerKey = t, this.caches = [];
		for (let e = 0; e < this.maxKeyLength; e++) this.caches.push([]);
	}
	canBeCached(e) {
		return e > 0 && e <= this.maxKeyLength;
	}
	find(e, t, n) {
		let r = this.caches[n - 1];
		FIND_CHUNK: for (let i of r) {
			let r = i.bytes;
			for (let i = 0; i < n; i++) if (r[i] !== e[t + i]) continue FIND_CHUNK;
			return i.str;
		}
		return null;
	}
	store(e, t) {
		let n = this.caches[e.length - 1], r = {
			bytes: e,
			str: t
		};
		n.length >= this.maxLengthPerKey ? n[Math.random() * n.length | 0] = r : n.push(r);
	}
	decode(e, t, n) {
		let r = this.find(e, t, n);
		if (r != null) return this.hit++, r;
		this.miss++;
		let i = Op(e, t, n), a = Uint8Array.prototype.slice.call(e, t, t + n);
		return this.store(a, i), i;
	}
}, $p = "array", em = "map_key", tm = "map_value", nm = (e) => {
	if (typeof e == "string" || typeof e == "number") return e;
	throw new Pp("The type of key must be string or number but " + typeof e);
}, rm = class {
	stack = [];
	stackHeadPosition = -1;
	get length() {
		return this.stackHeadPosition + 1;
	}
	top() {
		return this.stack[this.stackHeadPosition];
	}
	pushArrayState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = $p, t.position = 0, t.size = e, t.array = Array(e);
	}
	pushMapState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = em, t.readCount = 0, t.size = e, t.map = {};
	}
	getUninitializedStateFromPool() {
		return this.stackHeadPosition++, this.stackHeadPosition === this.stack.length && this.stack.push({
			type: void 0,
			size: 0,
			array: void 0,
			position: 0,
			readCount: 0,
			map: void 0,
			key: null
		}), this.stack[this.stackHeadPosition];
	}
	release(e) {
		if (this.stack[this.stackHeadPosition] !== e) throw Error("Invalid stack state. Released state is not on top of the stack.");
		if (e.type === $p) {
			let t = e;
			t.size = 0, t.array = void 0, t.position = 0, t.type = void 0;
		}
		if (e.type === em || e.type === tm) {
			let t = e;
			t.size = 0, t.map = void 0, t.readCount = 0, t.type = void 0;
		}
		this.stackHeadPosition--;
	}
	reset() {
		this.stack.length = 0, this.stackHeadPosition = -1;
	}
}, im = -1, am = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)), om = new Uint8Array(am.buffer);
try {
	am.getInt8(0);
} catch (e) {
	if (!(e instanceof RangeError)) throw Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
var sm = /* @__PURE__ */ RangeError("Insufficient data"), cm = new Qp(), lm = class e {
	extensionCodec;
	context;
	useBigInt64;
	rawStrings;
	maxStrLength;
	maxBinLength;
	maxArrayLength;
	maxMapLength;
	maxExtLength;
	keyDecoder;
	mapKeyConverter;
	totalPos = 0;
	pos = 0;
	view = am;
	bytes = om;
	headByte = im;
	stack = new rm();
	entered = !1;
	constructor(e) {
		this.extensionCodec = e?.extensionCodec ?? Kp.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.rawStrings = e?.rawStrings ?? !1, this.maxStrLength = e?.maxStrLength ?? 4294967295, this.maxBinLength = e?.maxBinLength ?? 4294967295, this.maxArrayLength = e?.maxArrayLength ?? 4294967295, this.maxMapLength = e?.maxMapLength ?? 4294967295, this.maxExtLength = e?.maxExtLength ?? 4294967295, this.keyDecoder = e?.keyDecoder === void 0 ? cm : e.keyDecoder, this.mapKeyConverter = e?.mapKeyConverter ?? nm;
	}
	clone() {
		return new e({
			extensionCodec: this.extensionCodec,
			context: this.context,
			useBigInt64: this.useBigInt64,
			rawStrings: this.rawStrings,
			maxStrLength: this.maxStrLength,
			maxBinLength: this.maxBinLength,
			maxArrayLength: this.maxArrayLength,
			maxMapLength: this.maxMapLength,
			maxExtLength: this.maxExtLength,
			keyDecoder: this.keyDecoder
		});
	}
	reinitializeState() {
		this.totalPos = 0, this.headByte = im, this.stack.reset();
	}
	setBuffer(e) {
		let t = Jp(e);
		this.bytes = t, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength), this.pos = 0;
	}
	appendBuffer(e) {
		if (this.headByte === im && !this.hasRemaining(1)) this.setBuffer(e);
		else {
			let t = this.bytes.subarray(this.pos), n = Jp(e), r = new Uint8Array(t.length + n.length);
			r.set(t), r.set(n, t.length), this.setBuffer(r);
		}
	}
	hasRemaining(e) {
		return this.view.byteLength - this.pos >= e;
	}
	createExtraByteError(e) {
		let { view: t, pos: n } = this;
		return /* @__PURE__ */ RangeError(`Extra ${t.byteLength - n} of ${t.byteLength} byte(s) found at buffer[${e}]`);
	}
	decode(e) {
		if (this.entered) return this.clone().decode(e);
		try {
			this.entered = !0, this.reinitializeState(), this.setBuffer(e);
			let t = this.doDecodeSync();
			if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
			return t;
		} finally {
			this.entered = !1;
		}
	}
	*decodeMulti(e) {
		if (this.entered) {
			yield* this.clone().decodeMulti(e);
			return;
		}
		try {
			for (this.entered = !0, this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1);) yield this.doDecodeSync();
		} finally {
			this.entered = !1;
		}
	}
	async decodeAsync(e) {
		if (this.entered) return this.clone().decodeAsync(e);
		try {
			this.entered = !0;
			let t = !1, n;
			for await (let r of e) {
				if (t) throw this.entered = !1, this.createExtraByteError(this.totalPos);
				this.appendBuffer(r);
				try {
					n = this.doDecodeSync(), t = !0;
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
			if (t) {
				if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
				return n;
			}
			let { headByte: r, pos: i, totalPos: a } = this;
			throw RangeError(`Insufficient data in parsing ${Yp(r)} at ${a} (${i} in the current buffer)`);
		} finally {
			this.entered = !1;
		}
	}
	decodeArrayStream(e) {
		return this.decodeMultiAsync(e, !0);
	}
	decodeStream(e) {
		return this.decodeMultiAsync(e, !1);
	}
	async *decodeMultiAsync(e, t) {
		if (this.entered) {
			yield* this.clone().decodeMultiAsync(e, t);
			return;
		}
		try {
			this.entered = !0;
			let n = t, r = -1;
			for await (let i of e) {
				if (t && r === 0) throw this.createExtraByteError(this.totalPos);
				this.appendBuffer(i), n && (r = this.readArraySize(), n = !1, this.complete());
				try {
					for (; yield this.doDecodeSync(), --r !== 0;);
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
		} finally {
			this.entered = !1;
		}
	}
	doDecodeSync() {
		DECODE: for (;;) {
			let e = this.readHeadByte(), t;
			if (e >= 224) t = e - 256;
			else if (e < 192) if (e < 128) t = e;
			else if (e < 144) {
				let n = e - 128;
				if (n !== 0) {
					this.pushMapState(n), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e < 160) {
				let n = e - 144;
				if (n !== 0) {
					this.pushArrayState(n), this.complete();
					continue DECODE;
				}
				t = [];
			} else {
				let n = e - 160;
				t = this.decodeString(n, 0);
			}
			else if (e === 192) t = null;
			else if (e === 194) t = !1;
			else if (e === 195) t = !0;
			else if (e === 202) t = this.readF32();
			else if (e === 203) t = this.readF64();
			else if (e === 204) t = this.readU8();
			else if (e === 205) t = this.readU16();
			else if (e === 206) t = this.readU32();
			else if (e === 207) t = this.useBigInt64 ? this.readU64AsBigInt() : this.readU64();
			else if (e === 208) t = this.readI8();
			else if (e === 209) t = this.readI16();
			else if (e === 210) t = this.readI32();
			else if (e === 211) t = this.useBigInt64 ? this.readI64AsBigInt() : this.readI64();
			else if (e === 217) {
				let e = this.lookU8();
				t = this.decodeString(e, 1);
			} else if (e === 218) {
				let e = this.lookU16();
				t = this.decodeString(e, 2);
			} else if (e === 219) {
				let e = this.lookU32();
				t = this.decodeString(e, 4);
			} else if (e === 220) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				}
				t = [];
			} else if (e === 221) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				}
				t = [];
			} else if (e === 222) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e === 223) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e === 196) {
				let e = this.lookU8();
				t = this.decodeBinary(e, 1);
			} else if (e === 197) {
				let e = this.lookU16();
				t = this.decodeBinary(e, 2);
			} else if (e === 198) {
				let e = this.lookU32();
				t = this.decodeBinary(e, 4);
			} else if (e === 212) t = this.decodeExtension(1, 0);
			else if (e === 213) t = this.decodeExtension(2, 0);
			else if (e === 214) t = this.decodeExtension(4, 0);
			else if (e === 215) t = this.decodeExtension(8, 0);
			else if (e === 216) t = this.decodeExtension(16, 0);
			else if (e === 199) {
				let e = this.lookU8();
				t = this.decodeExtension(e, 1);
			} else if (e === 200) {
				let e = this.lookU16();
				t = this.decodeExtension(e, 2);
			} else if (e === 201) {
				let e = this.lookU32();
				t = this.decodeExtension(e, 4);
			} else throw new Pp(`Unrecognized type byte: ${Yp(e)}`);
			this.complete();
			let n = this.stack;
			for (; n.length > 0;) {
				let e = n.top();
				if (e.type === $p) if (e.array[e.position] = t, e.position++, e.position === e.size) t = e.array, n.release(e);
				else continue DECODE;
				else if (e.type === em) {
					if (t === "__proto__") throw new Pp("The key __proto__ is not allowed");
					e.key = this.mapKeyConverter(t), e.type = tm;
					continue DECODE;
				} else if (e.map[e.key] = t, e.readCount++, e.readCount === e.size) t = e.map, n.release(e);
				else {
					e.key = null, e.type = em;
					continue DECODE;
				}
			}
			return t;
		}
	}
	readHeadByte() {
		return this.headByte === im && (this.headByte = this.readU8()), this.headByte;
	}
	complete() {
		this.headByte = im;
	}
	readArraySize() {
		let e = this.readHeadByte();
		switch (e) {
			case 220: return this.readU16();
			case 221: return this.readU32();
			default:
				if (e < 160) return e - 144;
				throw new Pp(`Unrecognized array type byte: ${Yp(e)}`);
		}
	}
	pushMapState(e) {
		if (e > this.maxMapLength) throw new Pp(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
		this.stack.pushMapState(e);
	}
	pushArrayState(e) {
		if (e > this.maxArrayLength) throw new Pp(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
		this.stack.pushArrayState(e);
	}
	decodeString(e, t) {
		return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, t) : this.decodeBinary(e, t);
	}
	decodeUtf8String(e, t) {
		if (e > this.maxStrLength) throw new Pp(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
		if (this.bytes.byteLength < this.pos + t + e) throw sm;
		let n = this.pos + t, r;
		return r = this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? this.keyDecoder.decode(this.bytes, n, e) : Mp(this.bytes, n, e), this.pos += t + e, r;
	}
	stateIsMapKey() {
		return this.stack.length > 0 && this.stack.top().type === em;
	}
	decodeBinary(e, t) {
		if (e > this.maxBinLength) throw new Pp(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
		if (!this.hasRemaining(e + t)) throw sm;
		let n = this.pos + t, r = this.bytes.subarray(n, n + e);
		return this.pos += t + e, r;
	}
	decodeExtension(e, t) {
		if (e > this.maxExtLength) throw new Pp(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
		let n = this.view.getInt8(this.pos + t), r = this.decodeBinary(e, t + 1);
		return this.extensionCodec.decode(r, n, this.context);
	}
	lookU8() {
		return this.view.getUint8(this.pos);
	}
	lookU16() {
		return this.view.getUint16(this.pos);
	}
	lookU32() {
		return this.view.getUint32(this.pos);
	}
	readU8() {
		let e = this.view.getUint8(this.pos);
		return this.pos++, e;
	}
	readI8() {
		let e = this.view.getInt8(this.pos);
		return this.pos++, e;
	}
	readU16() {
		let e = this.view.getUint16(this.pos);
		return this.pos += 2, e;
	}
	readI16() {
		let e = this.view.getInt16(this.pos);
		return this.pos += 2, e;
	}
	readU32() {
		let e = this.view.getUint32(this.pos);
		return this.pos += 4, e;
	}
	readI32() {
		let e = this.view.getInt32(this.pos);
		return this.pos += 4, e;
	}
	readU64() {
		let e = Lp(this.view, this.pos);
		return this.pos += 8, e;
	}
	readI64() {
		let e = Ip(this.view, this.pos);
		return this.pos += 8, e;
	}
	readU64AsBigInt() {
		let e = this.view.getBigUint64(this.pos);
		return this.pos += 8, e;
	}
	readI64AsBigInt() {
		let e = this.view.getBigInt64(this.pos);
		return this.pos += 8, e;
	}
	readF32() {
		let e = this.view.getFloat32(this.pos);
		return this.pos += 4, e;
	}
	readF64() {
		let e = this.view.getFloat64(this.pos);
		return this.pos += 8, e;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function um(e, t) {
	return new lm(t).decode(e);
}
//#endregion
//#region ../../packages/vocabulary/src/package_verifier.ts
var dm = class extends Error {
	reason;
	path;
	constructor(e, t, n) {
		super(t), this.name = "PackageVerificationError", this.reason = e, this.path = n;
	}
}, fm = 128, pm = 65536, mm = 33554432;
function hm(e) {
	return Math.min(mm, Math.max(e * fm, pm));
}
function gm(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
function _m(e, t) {
	let [n, r] = vm(e), [i, a] = vm(t);
	for (let e = 0; e < 3; e += 1) {
		let t = n[e] ?? 0, r = i[e] ?? 0;
		if (t !== r) return t < r ? -1 : 1;
	}
	return r === void 0 && a === void 0 ? 0 : r === void 0 ? 1 : a === void 0 ? -1 : ym(r, a);
}
function vm(e) {
	let [t, n] = (e.split("+")[0] ?? e).split("-", 2), r = t.split(".").map((e) => Number.parseInt(e, 10));
	return [[
		r[0] ?? 0,
		r[1] ?? 0,
		r[2] ?? 0
	], n];
}
function ym(e, t) {
	let n = e.split("."), r = t.split("."), i = Math.max(n.length, r.length);
	for (let e = 0; e < i; e += 1) {
		let t = n[e], i = r[e];
		if (t === void 0) return -1;
		if (i === void 0) return 1;
		let a = /^\d+$/u.test(t), o = /^\d+$/u.test(i);
		if (a && o) {
			let e = Number.parseInt(t, 10) - Number.parseInt(i, 10);
			if (e !== 0) return e < 0 ? -1 : 1;
			continue;
		}
		if (a !== o) return a ? -1 : 1;
		if (t !== i) return t < i ? -1 : 1;
	}
	return 0;
}
var bm = nt({ kind: Ze });
function xm(e, t) {
	if (gm(e) !== 1) throw new dm("unsupported_schema", "Manifest declares an unsupported schema_version");
	let n = ut.safeParse(e);
	if (!n.success) throw new dm("invalid_manifest", "Manifest failed schema validation");
	let r = n.data;
	if (_m(t.current_extension_version, r.minimum_extension_version) < 0) throw new dm("extension_version_too_low", `Extension version ${t.current_extension_version} is below the package's minimum ${r.minimum_extension_version}`);
	let i = /* @__PURE__ */ new Set();
	for (let e of r.shards) {
		if (i.has(e.path)) throw new dm("duplicate_shard_path", `Duplicate shard path in manifest: ${e.path}`, e.path);
		i.add(e.path);
	}
	return r;
}
async function Sm(e, t) {
	let n = hm(t.byte_length), r = new Response(new Uint8Array(e)).body;
	if (r === null) throw new dm("corrupt_gzip", `No readable body for ${t.path}`, t.path);
	let i = r.pipeThrough(new DecompressionStream("gzip")).getReader(), a = [], o = 0;
	try {
		for (;;) {
			let { done: e, value: r } = await i.read();
			if (e) break;
			if (o += r.byteLength, o > n) throw await i.cancel("decompressed_size_exceeded").catch(() => void 0), new dm("decompressed_size_exceeded", `Decompressed size of ${t.path} exceeds the allowed bound`, t.path);
			a.push(r);
		}
	} catch (e) {
		throw e instanceof dm ? e : new dm("corrupt_gzip", `Corrupt gzip stream for ${t.path}: ${e instanceof Error ? e.message : String(e)}`, t.path);
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
async function Cm(e, t) {
	if (t.byteLength !== e.byte_length) throw new dm("byte_length_mismatch", `Declared byte_length ${String(e.byte_length)} does not match downloaded size ${String(t.byteLength)} for ${e.path}`, e.path);
	if (vn(An(t)) !== e.sha256) throw new dm("hash_mismatch", `SHA-256 mismatch for ${e.path}`, e.path);
	let n = await Sm(t, e), r;
	try {
		r = um(n);
	} catch (t) {
		throw new dm("corrupt_messagepack", `MessagePack decode failed for ${e.path}: ${t instanceof Error ? t.message : String(t)}`, e.path);
	}
	let i = bm.safeParse(r);
	if (!i.success) throw new dm("corrupt_messagepack", `Decoded shard content for ${e.path} is not a valid envelope`, e.path);
	if (i.data.kind !== e.kind) throw new dm("wrong_shard_kind", `Shard ${e.path} declares kind "${e.kind}" but content is "${i.data.kind}"`, e.path);
	return {
		entry: e,
		compressed_bytes: t
	};
}
var wm = /* @__PURE__ */ new Set([
	"staging",
	"ready",
	"active",
	"confirmed",
	"superseded",
	"failed"
]), Tm = /* @__PURE__ */ new Set(["active", "confirmed"]), Em = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageStoreError";
	}
};
function Dm(e) {
	if (!wm.has(e)) throw new Em(`Unknown vocabulary package state: ${e}`);
	return e;
}
function Om(e) {
	if (typeof e != "string") throw new Em(`Expected a semver data_version string, got a number: ${String(e)}`);
	return e;
}
var km = H({
	package_id: Be,
	changelog: L().min(1).max(4096),
	record_count: B().int().nonnegative(),
	compressed_size: B().int().nonnegative(),
	minimum_extension_version: Ve,
	shard_entries: R(rt),
	pinned: V(),
	confirmed_at: Hl.optional()
}), Am = H({
	package_record_id: L().min(1),
	shard_id: L().min(1),
	path: Qe,
	sha256: L().regex(/^[a-f0-9]{64}$/u),
	byte_length: B().int().nonnegative(),
	bytes_base64: L().min(1)
});
function jm(e) {
	let t = km.safeParse(e);
	if (!t.success) throw new Em("Stored vocabulary package payload failed validation");
	return t.data;
}
function Mm(e) {
	let t = Am.safeParse(e);
	if (!t.success) throw new Em("Stored vocabulary shard payload failed validation");
	return t.data;
}
function Nm(e) {
	return yu({
		package_id: e.package_id,
		changelog: e.changelog,
		record_count: e.record_count,
		compressed_size: e.compressed_size,
		minimum_extension_version: e.minimum_extension_version,
		shard_entries: e.shard_entries,
		pinned: e.pinned,
		...e.confirmed_at === void 0 ? {} : { confirmed_at: e.confirmed_at }
	});
}
function Pm(e) {
	return yu({ ...e });
}
function Fm(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function Im(e) {
	let t = atob(e);
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function Lm(e, t) {
	return {
		package_id: t.package_id,
		schema_version: 1,
		data_version: e,
		changelog: t.changelog,
		record_count: t.record_count,
		compressed_size: t.compressed_size,
		minimum_extension_version: t.minimum_extension_version,
		shards: [...t.shard_entries]
	};
}
function Rm(e) {
	let t = jm(e.payload);
	return {
		record_id: e.id,
		state: Dm(e.state),
		pinned: t.pinned,
		confirmed_at: t.confirmed_at,
		manifest: Lm(Om(e.data_version), t)
	};
}
var zm = class {
	database;
	namespace;
	packages;
	shards;
	shard_index_cache = null;
	cache_active_package;
	active_package_cache = void 0;
	constructor(e, t, n = {}) {
		this.database = e, this.namespace = t, this.packages = new Md(e), this.shards = new Nd(e), this.cache_active_package = n.cache_active_package ?? !1;
	}
	invalidate_caches() {
		this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async list_packages() {
		return (await this.packages.list(this.namespace)).map(Rm);
	}
	async find_active_or_confirmed() {
		if (this.cache_active_package && this.active_package_cache !== void 0) return this.active_package_cache;
		let e = (await this.list_packages()).find((e) => Tm.has(e.state)) ?? null;
		return this.active_package_cache = e, e;
	}
	invalidate_active_package_cache() {
		this.active_package_cache = void 0;
	}
	async create_staging_package(e) {
		let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = {
			schema_version: 1,
			id: n,
			namespace: this.namespace,
			record_key: `${this.namespace}:${n}`,
			created_at: t,
			updated_at: t,
			data_version: e.data_version,
			state: "staging",
			payload: Nm({
				package_id: e.package_id,
				changelog: e.changelog,
				record_count: e.record_count,
				compressed_size: e.compressed_size,
				minimum_extension_version: e.minimum_extension_version,
				shard_entries: e.shards,
				pinned: !1
			})
		};
		return await this.packages.create(this.namespace, r), this.invalidate_active_package_cache(), Rm(r);
	}
	async put_shard_content(e, t, n) {
		await this.create_shard_record(e, t, Fm(n));
	}
	async copy_shard(e, t, n) {
		let r = await this.find_shard_record(n, t.path);
		if (r === null) throw new Em(`No source shard to copy for path: ${t.path}`);
		if (r.payload.sha256 !== t.sha256) throw new Em(`Source shard content hash does not match the target manifest entry for ${t.path}`);
		await this.create_shard_record(e, t, r.payload.bytes_base64);
	}
	async mark_ready(e) {
		await this.transition_state(e, "ready");
	}
	async activate(e) {
		return td(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = null;
			for (let i of n) i.id !== e && Tm.has(Dm(i.state)) && (await this.packages.update(this.namespace, {
				...i,
				state: "superseded",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), r = i.id);
			let i = await this.require_record(e, t);
			return await this.packages.update(this.namespace, {
				...i,
				state: "active",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), this.invalidate_active_package_cache(), { superseded_id: r };
		});
	}
	async confirm(e) {
		let t = await this.require_record(e);
		if (Dm(t.state) !== "active") throw new Em(`Cannot confirm package ${e}: state is "${t.state}", not "active"`);
		await this.transition_state(e, "confirmed", { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
	}
	async reselect_prior_confirmed(e) {
		return td(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = n.filter((t) => t.id !== e).map((e) => ({
				record: e,
				payload: jm(e.payload)
			})).filter(({ record: e, payload: t }) => Dm(e.state) === "superseded" && t.confirmed_at !== void 0).sort((e, t) => (t.payload.confirmed_at ?? "").localeCompare(e.payload.confirmed_at ?? ""))[0], i = n.find((t) => t.id === e);
			if (i !== void 0 && await this.packages.update(this.namespace, {
				...i,
				state: "failed",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), this.invalidate_active_package_cache(), r === void 0) return null;
			let a = {
				...r.record,
				state: "confirmed",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			return await this.packages.update(this.namespace, a, t), Rm(a);
		});
	}
	async rollback_staging(e) {
		let t = await this.list_owned_shards(e);
		await td(this.database, ["vocabulary_packages", "vocabulary_shards"], async (n) => {
			for (let e of t) await this.shards.delete(this.namespace, e.id, n);
			await this.packages.delete(this.namespace, e, n);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async cleanup_stale() {
		let e = (await this.packages.list(this.namespace)).filter((e) => {
			let t = jm(e.payload), n = Dm(e.state);
			return (n === "superseded" || n === "failed") && !t.pinned;
		}), t = new Set(e.map((e) => e.id)), n = (await this.shards.list(this.namespace)).filter((e) => t.has(Mm(e.payload).package_record_id));
		return await td(this.database, ["vocabulary_packages", "vocabulary_shards"], async (t) => {
			for (let e of n) await this.shards.delete(this.namespace, e.id, t);
			for (let n of e) await this.packages.delete(this.namespace, n.id, t);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache(), { deleted_package_ids: [...t] };
	}
	async set_pinned(e, t) {
		let n = await this.require_record(e), r = jm(n.payload);
		await this.packages.update(this.namespace, {
			...n,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: Nm({
				...r,
				pinned: t
			})
		}), this.invalidate_active_package_cache();
	}
	async manifest() {
		let e = await this.find_active_or_confirmed();
		if (e === null) throw new Em(`No active vocabulary package in namespace: ${this.namespace}`);
		return e.manifest;
	}
	async shard_bytes(e) {
		let t = await this.find_active_or_confirmed();
		if (t === null) throw new Em(`No active vocabulary package in namespace: ${this.namespace}`);
		let n = await this.find_shard_record(t.record_id, e);
		if (n === null) throw new Em(`No shard bytes stored for path: ${e}`);
		let r = Im(n.payload.bytes_base64);
		if (r.byteLength !== n.payload.byte_length) throw new Em(`Stored shard bytes for ${e} do not match their recorded byte_length`);
		return r;
	}
	async create_shard_record(e, t, n) {
		let r = (/* @__PURE__ */ new Date()).toISOString(), i = crypto.randomUUID(), a = Ze.parse(t.kind), o = {
			schema_version: 1,
			id: i,
			namespace: this.namespace,
			record_key: `${this.namespace}:${i}`,
			created_at: r,
			updated_at: r,
			data_version: e.manifest.data_version,
			kind: a,
			payload: Pm({
				package_record_id: e.record_id,
				shard_id: t.shard_id,
				path: t.path,
				sha256: t.sha256,
				byte_length: t.byte_length,
				bytes_base64: n
			})
		};
		await this.shards.create(this.namespace, o), this.invalidate_shard_index_cache();
	}
	async list_owned_shards(e) {
		return (await this.shards.list(this.namespace)).filter((t) => Mm(t.payload).package_record_id === e);
	}
	async get_shard_index() {
		if (this.shard_index_cache === null) {
			let e = await this.shards.list(this.namespace), t = /* @__PURE__ */ new Map();
			for (let n of e) {
				let e = Mm(n.payload);
				t.set(`${e.package_record_id}:${e.path}`, n.id);
			}
			this.shard_index_cache = t;
		}
		return this.shard_index_cache;
	}
	invalidate_shard_index_cache() {
		this.shard_index_cache = null;
	}
	async find_shard_record(e, t) {
		let n = (await this.get_shard_index()).get(`${e}:${t}`);
		if (n === void 0) return null;
		let r = await this.shards.get(this.namespace, n);
		return r === null ? null : {
			record: r,
			payload: Mm(r.payload)
		};
	}
	async require_record(e, t) {
		let n = await this.packages.get(this.namespace, e, t);
		if (n === null) throw new Em(`No vocabulary package record ${e} in namespace ${this.namespace}`);
		return n;
	}
	async transition_state(e, t, n = {}) {
		let r = await this.require_record(e), i = jm(r.payload);
		await this.packages.update(this.namespace, {
			...r,
			state: t,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: Nm({
				...i,
				...n.confirmed_at === void 0 ? {} : { confirmed_at: n.confirmed_at }
			})
		}), this.invalidate_active_package_cache();
	}
}, Bm = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageUpdateError";
	}
}, Vm = 65536;
function Hm(e) {
	return e + Vm;
}
function Um(e, t) {
	if (e.data_version !== t.data_version || e.shards.length !== t.shards.length) return !1;
	let n = new Map(e.shards.map((e) => [e.path, e.sha256]));
	return t.shards.every((e) => n.get(e.path) === e.sha256);
}
function Wm(e, t) {
	let n = new Map(e?.manifest.shards.map((e) => [e.path, e.sha256]) ?? []);
	return t.shards.reduce((e, t) => n.get(t.path) === t.sha256 ? e : e + t.byte_length, 0);
}
function Gm(e) {
	if (e?.aborted === !0) throw new DOMException("Vocabulary package update was aborted", "AbortError");
}
var Km = class {
	store;
	client;
	current_extension_version;
	on_progress;
	tail = Promise.resolve();
	constructor(e) {
		this.store = new zm(e.database, e.namespace), this.client = e.client, this.current_extension_version = e.current_extension_version, this.on_progress = e.on_progress;
	}
	async update(e) {
		let t = this.tail.then(() => this.run_update(e), () => this.run_update(e));
		return this.tail = t.then(() => void 0, () => void 0), t;
	}
	async report_query_success() {
		let e = await this.store.find_active_or_confirmed();
		e !== null && e.state === "active" && await this.store.confirm(e.record_id);
	}
	async report_query_failure() {
		let e = await this.store.find_active_or_confirmed();
		return e === null || e.state !== "active" ? null : this.store.reselect_prior_confirmed(e.record_id);
	}
	async cleanup() {
		return this.store.cleanup_stale();
	}
	emit(e) {
		this.on_progress?.(e);
	}
	async run_update(e) {
		this.emit({ phase: "checking_manifest" }), Gm(e);
		let t = xm(await this.client.fetch_manifest(e), { current_extension_version: this.current_extension_version }), n = await this.store.find_active_or_confirmed();
		if (n !== null && Um(n.manifest, t)) return this.emit({
			phase: "up_to_date",
			data_version: t.data_version
		}), {
			outcome: "up_to_date",
			data_version: t.data_version
		};
		let r = await this.store.create_staging_package(t), i = Wm(n, t), a = 0;
		try {
			for (let o of t.shards) {
				if (Gm(e), n?.manifest.shards.find((e) => e.path === o.path)?.sha256 === o.sha256 && n !== null) {
					this.emit({
						phase: "reusing_shard",
						shard_path: o.path
					}), await this.store.copy_shard(r, o, n.record_id);
					continue;
				}
				let t = await this.client.fetch_shard_bytes(o.path, {
					max_bytes: Hm(o.byte_length),
					...e === void 0 ? {} : { signal: e },
					on_progress: (e) => {
						this.emit({
							phase: "downloading",
							shard_path: o.path,
							downloaded_bytes: a + e.downloaded_bytes,
							total_bytes: i
						});
					}
				});
				a += t.byteLength, this.emit({
					phase: "verifying",
					shard_path: o.path
				});
				let s = await Cm(o, t);
				await this.store.put_shard_content(r, s.entry, s.compressed_bytes);
			}
			return await this.store.mark_ready(r.record_id), this.emit({
				phase: "activating",
				data_version: t.data_version
			}), await this.store.activate(r.record_id), this.emit({
				phase: "complete",
				data_version: t.data_version
			}), {
				outcome: "updated",
				data_version: t.data_version,
				package_record_id: r.record_id
			};
		} catch (e) {
			await this.store.rollback_staging(r.record_id).catch(() => void 0);
			let t = e instanceof Error ? e.message : String(e);
			throw this.emit({
				phase: "rolled_back",
				reason: t
			}), e instanceof dm ? new Bm(`Vocabulary package update rejected a shard: ${t}`) : e instanceof DOMException && e.name === "AbortError" ? e : new Bm(`Vocabulary package update failed and was rolled back: ${t}`);
		}
	}
}, qm = 1048576, Jm = class extends TypeError {}, Ym = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogFetchError";
	}
}, Xm = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogValidationError";
	}
}, Zm = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogPlanError";
	}
};
function Qm(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw new Jm(`Catalog URL is not a valid absolute URL: ${e}`);
	}
	if (t.protocol !== "https:") throw new Jm(`Catalog URL must use the https: scheme, got: ${e}`);
	return t;
}
async function $m(e, t) {
	if (e === null) throw new Ym("Catalog response has no readable body");
	let n = e.getReader(), r = [], i = 0;
	for (;;) {
		let { done: e, value: a } = await n.read();
		if (e) break;
		if (i += a.byteLength, i > t) throw await n.cancel("bounded_stream_exceeded").catch(() => void 0), new Ym(`Catalog response exceeded the allowed ${String(t)}-byte bound`);
		r.push(a);
	}
	let a = new Uint8Array(i), o = 0;
	for (let e of r) a.set(e, o), o += e.byteLength;
	try {
		return JSON.parse(new TextDecoder().decode(a));
	} catch {
		throw new Ym("Catalog response is not valid JSON");
	}
}
function eh(e = {}) {
	let t = e.catalog_url ?? "https://huggingface.co/datasets/ITOTII/tavern-canvas-vocabulary/resolve/main/catalog.json";
	Qm(t);
	let n = e.fetch_impl ?? fetch, r = e.max_bytes ?? qm, i = e.ttl_ms ?? 0, a = null;
	async function o(e = {}) {
		if (a !== null && i > 0 && Date.now() - a.fetched_at_ms < i) return a.entries;
		let o = await n(t, e.signal === void 0 ? {} : { signal: e.signal });
		if (!o.ok) throw new Ym(`Catalog request failed with status ${String(o.status)}`);
		let s = await $m(o.body, r), c = ct.safeParse(s);
		if (!c.success) throw new Xm("Catalog response failed schema validation");
		return i > 0 && (a = {
			entries: c.data,
			fetched_at_ms: Date.now()
		}), c.data;
	}
	return {
		fetch_catalog: o,
		async list_supported_entries(e, t) {
			return (await o(t)).filter((t) => _m(e, t.min_extension_version) >= 0);
		}
	};
}
function th(e, t = {}) {
	if (e.bundled === !0) {
		if (t.bundled_base_url === void 0) throw new Zm(`Catalog entry "${e.package_id}" is bundled: a bundled_base_url is required to plan its install`);
		return {
			kind: "bundled",
			base_url: t.bundled_base_url
		};
	}
	if (e.base_url === null) throw new Zm(`Catalog entry "${e.package_id}" has no base_url and is not marked bundled`);
	return {
		kind: "https",
		base_url: e.base_url
	};
}
//#endregion
//#region ../../packages/vocabulary/src/catalog/catalog_install.ts
var nh = 8388608, rh = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "CatalogInstallError", this.reason = e;
	}
};
function ih(e) {
	let t = e.endsWith("/") ? e : `${e}/`;
	return new URL("manifest.json", t);
}
async function ah(e, t, n) {
	let r = await t(e, n === void 0 ? {} : { signal: n });
	if (!r.ok) throw new rh("manifest_fetch_failed", `Manifest request failed with status ${String(r.status)}: ${e.href}`);
	if (r.body === null) throw new rh("manifest_fetch_failed", `Manifest response for ${e.href} has no readable body`);
	let i = r.body.getReader(), a = [], o = 0;
	for (;;) {
		let { done: t, value: n } = await i.read();
		if (t) break;
		if (o += n.byteLength, o > nh) throw await i.cancel("bounded_stream_exceeded").catch(() => void 0), new rh("manifest_fetch_failed", `Manifest response for ${e.href} exceeded the allowed ${String(nh)}-byte bound`);
		a.push(n);
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
function oh(e, t) {
	let n;
	try {
		n = JSON.parse(new TextDecoder().decode(e));
	} catch {
		throw new rh("manifest_fetch_failed", `Manifest response for ${t} is not valid JSON`);
	}
	let r = ut.safeParse(n);
	if (!r.success) throw new rh("manifest_fetch_failed", `Manifest response for ${t} failed schema validation`);
	return r.data;
}
function sh(e, t) {
	return {
		fetch_manifest: () => Promise.resolve(t),
		fetch_shard_bytes: e.fetch_shard_bytes.bind(e)
	};
}
async function ch(e, t) {
	let n = th(e, t.bundled_base_url === void 0 ? {} : { bundled_base_url: t.bundled_base_url }), r = t.fetch_impl ?? fetch;
	t.on_progress?.({ phase: "verifying_catalog_manifest" });
	let i = await ah(ih(n.base_url), r, t.signal), a = vn(An(i));
	if (a !== e.manifest_sha256) throw new rh("manifest_hash_mismatch", `Fetched manifest hash ${a} does not match catalog entry hash ${e.manifest_sha256} for package ${e.package_id}`);
	let o = oh(i, e.package_id);
	if (o.package_id !== e.package_id) throw new rh("package_id_mismatch", `Catalog entry declares package_id ${e.package_id} but the fetched manifest declares ${o.package_id}`);
	if (o.data_version !== e.data_version) throw new rh("data_version_mismatch", `Catalog entry ${e.package_id} declares data_version ${e.data_version} but the fetched manifest declares ${o.data_version}`);
	let s = sh(Ep(n, r), o);
	return new Km({
		database: t.database,
		namespace: t.namespace,
		client: s,
		current_extension_version: t.current_extension_version,
		...t.on_progress === void 0 ? {} : { on_progress: t.on_progress }
	}).update(t.signal);
}
//#endregion
//#region src/modules/vocabulary/vocabulary_catalog_client.ts
var lh = "vocabulary", uh = class extends Error {
	constructor() {
		super("A vocabulary package install is already in progress on this client"), this.name = "CatalogInstallBusyError";
	}
}, dh = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = null;
	constructor(e) {
		this.#e = eh({
			...e.catalog_url === void 0 ? {} : { catalog_url: e.catalog_url },
			...e.fetch_impl === void 0 ? {} : { fetch_impl: e.fetch_impl },
			...e.ttl_ms === void 0 ? {} : { ttl_ms: e.ttl_ms }
		}), this.#t = e.current_extension_version, this.#n = e.bundled_base_url, this.#r = e.fetch_impl, this.#i = e.open_database_impl ?? ed;
	}
	list() {
		return this.#e.list_supported_entries(this.#t);
	}
	get installing() {
		return this.#a !== null;
	}
	async install(e, t) {
		if (this.#a !== null) throw new uh();
		let n = new AbortController();
		this.#a = n;
		try {
			return await ch(e, {
				database: await this.#i(),
				namespace: lh,
				current_extension_version: this.#t,
				signal: n.signal,
				...t === void 0 ? {} : { on_progress: t },
				...this.#n === void 0 ? {} : { bundled_base_url: this.#n },
				...this.#r === void 0 ? {} : { fetch_impl: this.#r }
			});
		} finally {
			this.#a = null;
		}
	}
	cancel() {
		this.#a?.abort();
	}
}, fh = 120, ph = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VocabularySearchError", this.code = e;
	}
};
function mh(e) {
	return new ph("cancelled", e);
}
var hh = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Map();
	#r = !1;
	#i = [];
	#a = !1;
	#o = null;
	#s = null;
	#c = 0;
	#l;
	#u = null;
	constructor(e) {
		this.#t = e.debounce_ms ?? fh, this.#e = e.create_worker(), this.#e.addEventListener("message", (e) => {
			this.#h(e.data);
		}), this.#l = crypto.randomUUID(), this.#y({
			type: "initialize",
			request_id: this.#l
		});
	}
	search(e, t = {}) {
		if (this.#a) return Promise.reject(mh("client disposed"));
		this.#f(), this.#c += 1;
		let n = this.#c;
		return new Promise((r, i) => {
			this.#s = {
				generation: n,
				request_id: null,
				reject: i
			}, this.#o = setTimeout(() => {
				this.#o = null, this.#d(n, e, t, r, i);
			}, this.#t);
		});
	}
	async next_page(e) {
		this.#p(), this.#r || await this.#m(), this.#p();
		let t = crypto.randomUUID();
		return new Promise((n, r) => {
			this.#n.set(t, {
				resolve: n,
				reject: r
			}), this.#y({
				type: "next_page",
				request_id: t,
				cursor: e
			});
		});
	}
	dispose() {
		if (this.#a) return;
		this.#a = !0, this.#o !== null && (clearTimeout(this.#o), this.#o = null);
		let e = mh("client disposed");
		for (let t of this.#n.values()) t.reject(e);
		this.#n.clear(), this.#s !== null && this.#s.request_id === null && this.#s.reject(e), this.#s = null;
		for (let e of this.#i) e.resolve();
		this.#i = [], this.#e.terminate();
	}
	async #d(e, t, n, r, i) {
		if (!this.#r) try {
			await this.#m();
		} catch (t) {
			e === this.#c && !this.#a && (this.#s?.generation === e && (this.#s = null), i(t));
			return;
		}
		if (e !== this.#c || this.#a) return;
		let a = crypto.randomUUID();
		this.#s = {
			generation: e,
			request_id: a,
			reject: i
		}, this.#n.set(a, {
			resolve: r,
			reject: i,
			...n.on_partial === void 0 ? {} : { on_partial: n.on_partial }
		}), this.#y({
			type: "query",
			request_id: a,
			query: t,
			...n.category === void 0 ? {} : { category: n.category }
		});
	}
	#f() {
		let e = this.#s;
		this.#s = null, this.#o !== null && (clearTimeout(this.#o), this.#o = null), e !== null && (e.request_id !== null && (this.#n.delete(e.request_id), this.#y({
			type: "cancel",
			request_id: crypto.randomUUID(),
			target_request_id: e.request_id
		})), e.reject(mh("superseded by a newer search")));
	}
	#p() {
		if (this.#a) throw mh("client disposed");
	}
	#m() {
		return this.#r || this.#a ? Promise.resolve() : this.#u === null ? new Promise((e, t) => {
			this.#i.push({
				resolve: e,
				reject: t
			});
		}) : Promise.reject(this.#u);
	}
	#h(e) {
		let t = Re.safeParse(e);
		if (!t.success) return;
		let n = t.data;
		if (n.type === "ready") {
			this.#r = !0, this.#_();
			return;
		}
		if (n.type === "error" && n.request_id === this.#l) {
			this.#u = new ph(n.code, n.message), this.#v(this.#u);
			return;
		}
		let r = this.#n.get(n.request_id);
		if (r !== void 0) switch (n.type) {
			case "partial_results":
				r.on_partial?.({
					results: n.results,
					next_cursor: null
				});
				return;
			case "progress": return;
			case "complete":
				this.#g(n.request_id), r.resolve({
					results: n.results,
					next_cursor: n.next_cursor
				});
				return;
			case "error":
				this.#g(n.request_id), r.reject(new ph(n.code, n.message));
				return;
		}
	}
	#g(e) {
		this.#n.delete(e), this.#s?.request_id === e && (this.#s = null);
	}
	#_() {
		let e = this.#i;
		this.#i = [];
		for (let t of e) t.resolve();
	}
	#v(e) {
		let t = this.#i;
		this.#i = [];
		for (let n of t) n.reject(e);
	}
	#y(e) {
		this.#e.postMessage(e);
	}
}, gh = "tavern_canvas", _h = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), vh = new Set(Object.keys(pt.shape)), yh = new Set(Object.keys(Le.shape)), bh = new Set(Object.keys(De.shape)), xh = {
	schema_version: 1,
	active_namespace: "primary",
	locale: "auto",
	active_provider_profile_id: null,
	global_concurrency: 4,
	auto_generation_enabled: !0,
	fallback_generation_enabled: !0,
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
function Sh(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ch() {
	return structuredClone(xh);
}
function wh(e) {
	return JSON.stringify(e);
}
function Th(e) {
	try {
		let t = wh(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function Eh(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = _h.has(i) ? "disallowed_category" : "unknown_field";
		r.push({
			path: e,
			code: a
		});
	}
}
function Dh(e, t, n, r, i) {
	let a = e.safeParse(t);
	return a.success ? a.data : (i.push({
		path: r,
		code: "invalid_value"
	}), n);
}
function Oh(e, t, n) {
	if (!Sh(e)) return e !== void 0 && n.push({
		path: t,
		code: "invalid_value"
	}), {};
	let { keyType: r, valueType: i } = Le.shape.http_acknowledgments, a = {};
	for (let [o, s] of Object.entries(e)) {
		let e = r.safeParse(o), c = i.safeParse(s);
		e.success && c.success ? a[e.data] = c.data : n.push({
			path: `${t}.${o}`,
			code: "invalid_value"
		});
	}
	return a;
}
function kh(e, t) {
	let n = xh.gateway;
	return Sh(e) ? (Eh(e, yh, "gateway", t), {
		endpoint: Dh(Le.shape.endpoint, e.endpoint, n.endpoint, "gateway.endpoint", t),
		token_secret_id: Dh(Le.shape.token_secret_id, e.token_secret_id, n.token_secret_id, "gateway.token_secret_id", t),
		http_acknowledgments: Oh(e.http_acknowledgments, "gateway.http_acknowledgments", t)
	}) : (e !== void 0 && t.push({
		path: "gateway",
		code: "invalid_value"
	}), { ...n });
}
function Ah(e, t) {
	let n = xh.ui;
	return Sh(e) ? (Eh(e, bh, "ui", t), {
		color_mode: Dh(De.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: Dh(De.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: Dh(De.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: Dh(De.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function jh(e, t) {
	if (e === void 0) return Ch();
	let n = Th(e);
	if (n === null || n > 65536) return t.push({
		path: gh,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), Ch();
	if (!Sh(e)) return t.push({
		path: gh,
		code: "invalid_value"
	}), Ch();
	Eh(e, vh, "", t);
	let r = xh;
	return {
		schema_version: Dh(pt.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: Dh(pt.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: Dh(pt.shape.locale, e.locale, r.locale, "locale", t),
		active_provider_profile_id: Dh(pt.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: Dh(pt.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: Dh(pt.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		fallback_generation_enabled: Dh(pt.shape.fallback_generation_enabled, e.fallback_generation_enabled, r.fallback_generation_enabled, "fallback_generation_enabled", t),
		gateway: kh(e.gateway, t),
		ui: Ah(e.ui, t)
	};
}
function Mh(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = jh(t[gh], i);
	t[gh] = a;
	let o = !1, s = !1;
	async function c() {
		o && (o = !1, await n());
	}
	function l() {
		s || (s = !0, r.schedule(async () => {
			s = !1, await c();
		}));
	}
	function u(e) {
		return a = e, t[gh] = a, o = !0, l(), a;
	}
	return {
		diagnostics: i,
		get_settings() {
			return a;
		},
		update_settings(e) {
			let t = {
				...a,
				...e
			};
			return u(pt.parse(t));
		},
		replace_settings(e) {
			return u(pt.parse(e));
		},
		flush: c,
		async stop() {
			await c();
		}
	};
}
//#endregion
//#region src/transport/host_proxy_transport.ts
var Nh = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function Ph(e) {
	try {
		if (!Ih(e)) throw Rh("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !Lh(a) || !Lh(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw Rh("Provider operation is invalid");
		if (zs(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw Rh("Provider operation is invalid");
		return {
			route: t,
			method: n,
			body: r,
			max_request_bytes: i,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
	} catch (e) {
		throw e instanceof Nh ? e : Rh("Provider operation is invalid", e);
	}
}
function Fh(e) {
	try {
		if (!Ih(e)) throw Rh("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw Rh("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(Ie);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw Rh("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof Nh ? e : Rh("Remote provider asset operation is invalid", e);
	}
}
function Ih(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Lh(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function Rh(e, t) {
	return new Nh("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/browser_fetch.ts
async function zh(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new os({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new Nh("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await Bh(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function Bh(e, t, n) {
	if (e === null) return /* @__PURE__ */ new Uint8Array();
	let r = e.getReader(), i = [], a = 0, o = !1;
	try {
		for (;;) {
			if (n?.aborted === !0) throw new DOMException("Provider request was aborted", "AbortError");
			let { done: e, value: s } = await r.read();
			if (e) {
				o = !0;
				break;
			}
			if (a += s.byteLength, a > t) throw new Nh("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof Nh ? e : new os({ cause: e });
	} finally {
		if (!o) try {
			await r.cancel();
		} catch {}
		r.releaseLock();
	}
	let s = new Uint8Array(a), c = 0;
	for (let e of i) s.set(e, c), c += e.byteLength;
	return s;
}
//#endregion
//#region src/transport/direct_cloud_transport.ts
var Vh = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = Ph(e), n = Wh(this.#e, t.route), r = await Gh(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await Uh(zh(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(xs({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = Fh(e);
		return zh(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Hh = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e.secrets, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	async execute(e) {
		let t = he(e.provider_kind);
		if (t === null) throw new Nh("configuration", "This LLM dialect has no direct route catalog entry");
		let n = Wh(t, e.route), r = await Gh(t, e.credential_reference, this.#e, e.body === void 0 ? { accept: "application/json" } : {
			"content-type": "application/json",
			accept: "application/json"
		}), i = await Uh(zh(this.#t, n, {
			method: e.method,
			...e.body === void 0 ? {} : { body: new Uint8Array(e.body).buffer },
			headers: r,
			signal: e.signal
		}, e.max_response_bytes));
		return {
			status: i.status,
			body: i.body
		};
	}
};
async function Uh(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof os ? new os() : e;
	}
}
function Wh(e, t) {
	try {
		return me(e, t);
	} catch (e) {
		throw e instanceof ft ? new Nh("configuration", e.message) : e;
	}
}
async function Gh(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new Nh("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new Nh("configuration", Kh(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function Kh(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from host secret storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var qh = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = Ie(e.base_url);
		} catch (e) {
			throw new Nh("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!qe(t)) throw new Nh("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = Ph(e);
		return zh(this.#t, `${this.#e}${t.route}`, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: {
				...t.content_type === void 0 ? {} : { "content-type": t.content_type },
				...t.accept === void 0 ? {} : { accept: t.accept }
			},
			signal: t.signal
		}, t.max_response_bytes);
	}
	fetch_remote_asset(e) {
		let t = Fh(e);
		return zh(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Jh = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function Yh(e) {
	if (e.gateway_endpoint !== null) {
		let t = Zh(e.gateway_endpoint);
		if (tt(t) && !ot(e.http_acknowledgments, t)) throw new Jh("Cleartext Gateway origin has not been acknowledged");
		return {
			kind: "gateway",
			endpoint: t
		};
	}
	if (e.tauri_provider_available) return { kind: "tauri" };
	if (e.sillytavern_available) return { kind: "host_proxy" };
	let t = Xh(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Zh(e.direct_provider_base_url);
		if (!qe(t)) throw new Jh("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new Jh("No provider transport is available");
}
function Xh(e) {
	if (e === null || Oe(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Jh("This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway");
	if (!e.secrets_readable) throw new Jh("This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Zh(e) {
	try {
		return Ie(e);
	} catch (e) {
		throw new Jh("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capability_resolution.ts
function Qh(e) {
	return {
		status: "available",
		value: e
	};
}
function $h(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function eg(e) {
	try {
		return Qh(e());
	} catch (e) {
		return $h(tg(e));
	}
}
function tg(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function ng(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var rg = "capability_unavailable";
function ig(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: rg }), t;
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function ag(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function og(e) {
	return ag(e.payload);
}
function sg(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function cg(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function lg(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function ug(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function dg(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function fg(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => fg(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = fg(i, n));
	return r;
}
var pg = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, mg = "No v3 store exists for this asset category yet; character, vibe and workflow assets are stored, the rest are not.", hg = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"reference",
	"workflow"
];
function gg(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit":
		case "lora":
		case "reference": return null;
	}
}
function _g(e, t) {
	let n = og(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: sg(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function vg(e, t) {
	let n = ug(og(e), "order", 2 ** 53 - 1), r = ug(og(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function yg(e) {
	let t = new pg();
	function n(t) {
		let n = gg(e.repositories, t);
		if (n === null) throw ig(mg);
		return n;
	}
	async function r(t) {
		let n = gg(e.repositories, t);
		return n === null ? [] : [...await n.list(e.namespace())].sort(vg).map((e) => _g(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(hg.map(async (e) => [e, await r(e)]));
			return Object.fromEntries(e);
		},
		subscribe: (e) => t.subscribe(e),
		async save(r, i) {
			let a = n(r), o = e.namespace(), s = await a.get(o, i.id), c = e.now(), l = {
				schema_version: 1,
				id: i.id,
				namespace: o,
				record_key: `${o}:${i.id}`,
				created_at: s?.created_at ?? c,
				updated_at: c,
				payload: fg({
					...i.payload,
					display_name: i.display_name
				})
			};
			await a.put(o, l);
			let u = _g(l, r);
			return t.emit({
				type: "asset_upserted",
				asset: u
			}), u;
		},
		async remove(r, i) {
			await n(r).delete(e.namespace(), i), t.emit({
				type: "asset_removed",
				category: r,
				asset_id: i
			});
		},
		async reorder(t, r) {
			let i = n(t), a = e.namespace(), o = e.now();
			for (let [e, t] of r.entries()) {
				let n = await i.get(a, t);
				n !== null && await i.put(a, {
					...n,
					updated_at: o,
					payload: fg({
						...og(n),
						order: e
					})
				});
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/diagnostics_capability.ts
var bg = 500, xg = class {
	#e = [];
	#t = new pg();
	#n = 0;
	get entries() {
		return this.#e;
	}
	subscribe(e) {
		return this.#t.subscribe(e);
	}
	append(e) {
		this.#n += 1;
		let t = {
			...e,
			event_id: `timeline-${String(this.#n)}`,
			occurred_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		this.#e.push(t), this.#e.length > bg && this.#e.shift(), this.#t.emit({
			type: "timeline_entry_appended",
			entry: t
		});
	}
	observe_jobs(e) {
		return e.subscribe((e) => {
			this.append({
				event_code: `generation.${e.state}`,
				module_id: "generation",
				generation_anchor: e.generation_anchor,
				request_id: e.request_id,
				job_id: e.job_id,
				provider_id: e.provider_id,
				error_code: e.error?.code ?? null
			});
		});
	}
};
function Sg(e) {
	return e === null ? {} : {
		schema_version: e.schema_version,
		locale: e.locale,
		global_concurrency: e.global_concurrency,
		auto_generation_enabled: e.auto_generation_enabled,
		fallback_generation_enabled: e.fallback_generation_enabled,
		gateway_configured: e.gateway.endpoint !== null,
		acknowledged_origin_count: Object.keys(e.gateway.http_acknowledgments).length,
		ui: e.ui
	};
}
function Cg(e) {
	async function t() {
		try {
			return await e.estimate_storage();
		} catch {
			return;
		}
	}
	return {
		async load() {
			let n = await t();
			return {
				capability_matrix: e.capability_matrix,
				helper_version: e.helper_version,
				protocol_version: null,
				storage_usage_bytes: n?.usage ?? null,
				storage_quota_bytes: n?.quota ?? null
			};
		},
		subscribe: (t) => e.timeline.subscribe(t),
		test_connection() {
			return e.probe_gateway === null ? Promise.resolve({
				status: "failed",
				code: "gateway_not_configured"
			}) : e.probe_gateway();
		},
		load_timeline: () => Promise.resolve(e.timeline.entries),
		export_support_bundle() {
			let t = e.timeline.entries, n = [...new Set(t.flatMap((e) => e.error_code === null ? [] : [e.error_code]))];
			return Promise.resolve({
				version: e.extension_version,
				capability_matrix: e.capability_matrix,
				redacted_settings: {
					...Sg(e.settings()),
					capability_resolutions: e.resolutions()
				},
				error_codes: n,
				timeline: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/gallery_capability.ts
function wg(e) {
	switch (e.media_type) {
		case "image/png":
		case "image/jpeg":
		case "image/webp": return e.media_type;
		case "video/mp4": return null;
	}
}
function Tg(e) {
	let t = wg(e);
	if (t === null) return null;
	let n = fe.parse(e.provider_id);
	return {
		id: e.id,
		provider_id: n,
		source_chat_id: e.source_message.chat_id,
		source_message_id: Number.parseInt(e.source_message.message_id, 10),
		media_type: t,
		width: e.width ?? null,
		height: e.height ?? null,
		pinned: e.pinned,
		quarantined: e.quarantined,
		created_at: e.created_at
	};
}
function Eg(e) {
	let t = new pg();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw ig(`Gallery record ${t} no longer exists`);
		return n;
	}
	async function r(n) {
		await e.repository.put(e.namespace(), n);
		let r = Tg(n);
		r !== null && t.emit({
			type: "record_upserted",
			record: r
		});
	}
	async function i(n) {
		await rf(e.database, e.namespace(), n), t.emit({
			type: "record_removed",
			record_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).flatMap((e) => {
				let t = Tg(e);
				return t === null ? [] : [t];
			});
		},
		subscribe: (e) => t.subscribe(e),
		async read_bytes(t) {
			let r = await n(t), i = await af(e.database, r.sha256);
			if (i === null) throw ig(`Gallery record ${t} has no stored bytes; the blob was evicted`);
			return i;
		},
		async pin(t, i) {
			await r({
				...await n(t),
				pinned: i,
				updated_at: e.now()
			});
		},
		async detach_from_message(t) {
			await r({
				...await n(t),
				quarantined: !0,
				updated_at: e.now()
			});
		},
		delete_record: i,
		async bulk_delete(e) {
			for (let t of e) await i(t);
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_capability.ts
function Dg(e) {
	return e.image_count ?? 1;
}
function Og(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: fe.parse(e.provider_id),
		state: e.state,
		image_count: Dg(e.arguments),
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function kg(e) {
	return {
		job_id: e.id,
		request_id: e.request_id,
		provider_id: fe.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function Ag(e) {
	let t = new pg(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: Og(e)
		});
	});
	async function r(t) {
		let r = await e.origin.resolve(), i = await lp({
			queue: e.queue,
			plans: e.plans
		}, {
			...r,
			scene_description: t.prompt
		}, t);
		return n.set(i.job_id, t), Og(i);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map(kg);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return Og(await dp({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw ig(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
			return r({
				...i,
				request_id: e.new_request_id()
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
function jg(e) {
	return zn.parse({
		schema_version: 1,
		chat_id: e.chat_id,
		active_swipes: e.messages.map((e) => ({
			message_id: e.message_id,
			swipe_id: e.active_swipe_id
		})),
		messages: e.messages.map((e) => ({
			message_id: e.message_id,
			role: e.role,
			content_sha256: vn(An(yn(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? ""))),
			swipe_id: e.active_swipe_id
		}))
	});
}
var Mg = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		let e = await this.#e.get_active_chat(), t = Rn(jg(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
}, Ng = 1e6, Pg = class extends Error {
	code = "unknown_llm_connection";
	constructor(e) {
		super(`Unknown LLM connection "${e}"`), this.name = "UnknownLlmConnectionError";
	}
}, Fg = class extends Error {
	code = "credential_probe_failed";
	constructor(e) {
		super(`credential_probe_failed: the vault did not confirm "${e}"`), this.name = "LlmCredentialProbeError";
	}
};
function Ig(e) {
	return e === 401 || e === 402 || e === 403 ? "auth_failed" : e === 429 ? "rate_limited" : e === 408 ? "timed_out" : e >= 400 && e < 500 ? "invalid_request" : "provider_unavailable";
}
function Lg(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		provider_kind: e.provider_kind,
		credential_reference: e.credential_reference,
		payload: {
			display_name: e.display_name,
			route: e.route,
			model_id: e.model_id,
			temperature: e.temperature,
			max_output_tokens: e.max_output_tokens,
			is_default: e.is_default
		}
	};
}
function Rg(e) {
	let t = e.payload ?? {};
	return Ye.parse({
		id: e.id,
		display_name: t.display_name,
		provider_kind: e.provider_kind,
		route: t.route,
		model_id: t.model_id,
		temperature: t.temperature,
		max_output_tokens: t.max_output_tokens,
		is_default: t.is_default,
		credential_reference: e.credential_reference,
		created_at: e.created_at,
		updated_at: e.updated_at
	});
}
var zg = class {
	#e;
	#t = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#e = e;
	}
	subscribe(e) {
		return this.#t.add(e), () => {
			this.#t.delete(e);
		};
	}
	async list() {
		return (await this.#e.repository.list(this.#e.namespace)).map(Rg);
	}
	async save(e) {
		let t = de.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
			...t,
			credential_reference: n?.credential_reference ?? null,
			created_at: n?.created_at ?? r,
			updated_at: r
		};
		return await this.#r(i, i.created_at), i.is_default && await this.#i(i.id, r), i;
	}
	async remove(e) {
		await this.#n(e), await this.#e.repository.delete(this.#e.namespace, e), this.#a({
			type: "connection_removed",
			connection_id: e
		});
	}
	async set_credential(e, t) {
		let n = await this.#n(e);
		if (t.trim().length === 0) throw TypeError("An LLM connection credential must not be blank");
		let r = we(this.#e.namespace, e);
		if (!this.#e.secrets.supports("llm_profile_api_key")) throw TypeError("The host secret vault does not accept LLM connection credentials");
		if (await this.#e.secrets.write_secret(r, t), !await this.#e.secrets.probe_secret(r).catch(() => !1)) throw new Fg(r);
		let i = {
			...n,
			credential_reference: r,
			updated_at: this.#e.clock()
		};
		return await this.#r(i, n.created_at), i;
	}
	async clear_credential(e) {
		let t = await this.#n(e), n = {
			...t,
			credential_reference: null,
			updated_at: this.#e.clock()
		};
		return await this.#r(n, t.created_at), n;
	}
	async test_connection(e) {
		let t = await this.#n(e), n = Date.now();
		try {
			let e = await this.#e.transport.execute({
				provider_kind: t.provider_kind,
				route: Bg(t.provider_kind),
				method: "GET",
				credential_reference: t.credential_reference,
				max_response_bytes: Ng,
				signal: AbortSignal.timeout(15e3)
			});
			return e.status < 200 || e.status >= 300 ? {
				status: "failed",
				code: Ig(e.status)
			} : {
				status: "success",
				latency_ms: Math.max(0, Date.now() - n),
				model_id: t.model_id
			};
		} catch {
			return {
				status: "failed",
				code: "provider_unavailable"
			};
		}
	}
	async #n(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		if (t === null) throw new Pg(e);
		return Rg(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, Lg(e, this.#e.namespace, t)), this.#a({
			type: "connection_upserted",
			connection: e
		});
	}
	async #i(e, t) {
		let n = await this.#e.repository.list(this.#e.namespace);
		for (let r of n) {
			if (r.id === e) continue;
			let n = Rg(r);
			n.is_default && await this.#r({
				...n,
				is_default: !1,
				updated_at: t
			}, n.created_at);
		}
	}
	#a(e) {
		for (let t of this.#t) t(e);
	}
};
function Bg(e) {
	return Xe[e].models_route;
}
//#endregion
//#region src/modules/library/knowledge_service.ts
var Vg = class extends Error {
	code = "unknown_knowledge_entry";
	constructor(e) {
		super(`Unknown knowledge entry "${e}"`), this.name = "UnknownKnowledgeEntryError";
	}
};
function Hg(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		source_type: e.source_type,
		payload: {
			title: e.title,
			content: e.content,
			keywords: [...e.keywords],
			priority: e.priority,
			enabled: e.enabled
		}
	};
}
function Ug(e) {
	let t = e.payload ?? {};
	return ge.parse({
		id: e.id,
		title: t.title,
		source_type: e.source_type,
		content: t.content,
		keywords: t.keywords,
		priority: t.priority,
		enabled: t.enabled,
		created_at: e.created_at,
		updated_at: e.updated_at
	});
}
var Wg = class {
	#e;
	#t = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#e = e;
	}
	subscribe(e) {
		return this.#t.add(e), () => {
			this.#t.delete(e);
		};
	}
	async list() {
		return (await this.#e.repository.list(this.#e.namespace)).map(Ug).sort((e, t) => t.priority - e.priority === 0 ? e.title.localeCompare(t.title) : t.priority - e.priority);
	}
	async save(e) {
		let t = Te.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
			...t,
			created_at: n?.created_at ?? r,
			updated_at: r
		};
		return await this.#r(i, i.created_at), i;
	}
	async set_enabled(e, t) {
		let n = await this.#n(e), r = {
			...n,
			enabled: t,
			updated_at: this.#e.clock()
		};
		return await this.#r(r, n.created_at), r;
	}
	async remove(e) {
		await this.#n(e), await this.#e.repository.delete(this.#e.namespace, e), this.#i({
			type: "entry_removed",
			entry_id: e
		});
	}
	async bulk_remove(e) {
		for (let t of e) await this.#e.repository.get(this.#e.namespace, t) !== null && (await this.#e.repository.delete(this.#e.namespace, t), this.#i({
			type: "entry_removed",
			entry_id: t
		}));
	}
	async #n(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		if (t === null) throw new Vg(e);
		return Ug(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, Hg(e, this.#e.namespace, t)), this.#i({
			type: "entry_upserted",
			entry: e
		});
	}
	#i(e) {
		for (let t of this.#t) t(e);
	}
}, Gg = "persona", Kg = class extends Error {
	code = "unknown_persona";
	constructor(e) {
		super(`Unknown persona "${e}"`), this.name = "UnknownPersonaError";
	}
};
function qg(e) {
	let t = e.payload;
	return typeof t == "object" && !!t && !Array.isArray(t) && t.record_kind === Gg;
}
function Jg(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		payload: {
			record_kind: Gg,
			display_name: e.display_name,
			role: e.role,
			description: e.description,
			greeting: e.greeting,
			avatar_image_id: e.avatar_image_id,
			is_active: e.is_active
		}
	};
}
function Yg(e) {
	let t = e.payload ?? {};
	return Se.parse({
		id: e.id,
		display_name: t.display_name,
		role: t.role,
		description: t.description,
		greeting: t.greeting,
		avatar_image_id: t.avatar_image_id,
		is_active: t.is_active,
		created_at: e.created_at,
		updated_at: e.updated_at
	});
}
var Xg = class {
	#e;
	#t = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#e = e;
	}
	subscribe(e) {
		return this.#t.add(e), () => {
			this.#t.delete(e);
		};
	}
	async list() {
		return (await this.#e.repository.list(this.#e.namespace)).filter(qg).map(Yg);
	}
	async save(e) {
		let t = ye.parse(e), n = await this.#r(t.id), r = this.#e.clock(), i = {
			...t,
			created_at: n?.created_at ?? r,
			updated_at: r
		};
		return await this.#i(i, i.created_at), i.is_active && await this.#a(i), i;
	}
	async remove(e) {
		await this.#n(e), await this.#e.repository.delete(this.#e.namespace, e), this.#o({
			type: "persona_removed",
			persona_id: e
		});
	}
	async #n(e) {
		let t = await this.#r(e);
		if (t === null) throw new Kg(e);
		return t;
	}
	async #r(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		return t === null || !qg(t) ? null : Yg(t);
	}
	async #i(e, t) {
		await this.#e.repository.put(this.#e.namespace, Jg(e, this.#e.namespace, t)), this.#o({
			type: "persona_upserted",
			persona: e
		});
	}
	async #a(e) {
		for (let t of await this.list()) t.id === e.id || t.role !== e.role || !t.is_active || await this.#i({
			...t,
			is_active: !1,
			updated_at: this.#e.clock()
		}, t.created_at);
	}
	#o(e) {
		for (let t of this.#t) t(e);
	}
};
//#endregion
//#region src/bootstrap/capabilities/library_capability.ts
function Zg(e) {
	let t = new zg(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		remove: (e) => t.remove(e),
		set_credential: (e, n) => t.set_credential(e, n),
		clear_credential: (e) => t.clear_credential(e),
		test_connection: (e) => t.test_connection(e)
	};
}
function Qg(e) {
	let t = new Xg(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		remove: (e) => t.remove(e)
	};
}
function $g(e) {
	let t = new Wg(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		set_enabled: (e, n) => t.set_enabled(e, n),
		remove: (e) => t.remove(e),
		bulk_remove: (e) => t.bulk_remove(e)
	};
}
//#endregion
//#region src/migration/migration_journal.ts
var e_ = "migration:", t_ = "migration:not_required", n_ = [
	"invalid_source",
	"unknown_setting_path",
	"converter_error",
	"missing_blob",
	"hash_mismatch",
	"count_mismatch",
	"secret_transfer_blocked",
	"switch_failed"
], r_ = H({
	path: L(),
	message: L()
}), i_ = H({
	reason: F(n_),
	message: L(),
	step: L()
}), a_ = {
	source_fingerprint: L().min(1),
	staging_namespace: L().min(1),
	started_at: L().min(1),
	completed_batches: R(L()),
	counts: z(L(), B().int().nonnegative()),
	image_hashes: R(L()),
	warnings: R(r_)
}, o_ = st("state", [
	H({
		state: I("inventory"),
		...a_
	}),
	H({
		state: I("copying"),
		...a_
	}),
	H({
		state: I("verifying"),
		...a_
	}),
	H({
		state: I("ready_to_switch"),
		...a_
	}),
	H({
		state: I("completed"),
		...a_
	}),
	H({
		state: I("failed"),
		...a_,
		failure: i_
	}),
	H({
		state: I("not_required"),
		checked_at: L().min(1)
	})
]);
function s_(e) {
	let t = new Hd(e);
	return {
		async load(e) {
			let n = await t.get(e);
			if (n === null) return null;
			let r = o_.safeParse(n.payload);
			if (!r.success) throw Error(`Migration journal "${e}" has a corrupt payload`);
			return {
				state: r.data.state,
				updated_at: n.updated_at,
				payload: r.data
			};
		},
		async save(e, n, r) {
			let i = await t.get(e), a = {
				migration_id: e,
				source_version: 2,
				state: n.state,
				updated_at: r,
				payload: yu(n)
			};
			if (i === null) {
				await t.create(a);
				return;
			}
			await t.update(a);
		}
	};
}
function c_(e) {
	return { async with_marker_transaction(t, n) {
		let r = new Hd(e), i = e.transaction(["migration_journal"], "readonly");
		try {
			let e = await r.get(t, i), a = await n({ get_marker: () => Promise.resolve(e === null ? null : {
				namespace: e.migration_id,
				state: e.state
			}) });
			return await i.done, a;
		} catch (e) {
			throw await i.done.catch(() => void 0), e;
		}
	} };
}
//#endregion
//#region ../../tools/v2_migration/src/conversion_result.ts
function l_(e, t) {
	return `${e}:${t}`;
}
function u_(e, t) {
	return {
		schema_version: 1,
		id: t,
		namespace: e.namespace,
		record_key: l_(e.namespace, t),
		created_at: e.migrated_at,
		updated_at: e.migrated_at
	};
}
var d_ = H({
	schema_version: I(1),
	id: Bl,
	namespace: Ul,
	record_key: L().min(1),
	created_at: Hl,
	updated_at: Hl
});
//#endregion
//#region ../../tools/v2_migration/src/inventory.ts
function f_(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function p_(e, t = []) {
	if (!f_(e)) return [];
	let n = [];
	for (let r of Object.keys(e)) {
		let i = [...t, r];
		n.push({
			segments: i,
			path: i.join(".")
		}), n.push(...p_(e[r], i));
	}
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/path_rules.ts
function m_(e, t) {
	let n = e.split("."), r = n.at(-1) === "**", i = r ? n.slice(0, -1) : n;
	if (!(r ? t.length >= i.length : t.length === i.length)) return null;
	let a = 0;
	for (let [e, n] of i.entries()) {
		if (n === "*") {
			a += 1;
			continue;
		}
		if (n !== t[e]) return null;
		a += 2;
	}
	return a;
}
function h_(e, t) {
	let n;
	for (let r of t) {
		let t = m_(r.pattern, e);
		t !== null && (n === void 0 || t > n.score) && (n = {
			rule: r,
			score: t
		});
	}
	return n?.rule;
}
//#endregion
//#region ../../tools/v2_migration/src/settings_path_registry.ts
function g_(e, t) {
	return {
		pattern: e,
		classification: "mapped",
		converter: t
	};
}
var __ = [
	["theme_id", "settings_converter"],
	["themes.**", "settings_converter"],
	["generate_btn_style", "settings_converter"],
	["image_frame_style", "settings_converter"],
	["collapse_style", "settings_converter"],
	["scriptEnabled", "settings_converter"],
	["helpTipsEnabled", "settings_converter"],
	["newlineFixEnabled", "settings_converter"],
	["aiAutonomousResolution", "settings_converter"],
	["addFurryDataset", "settings_converter"],
	["cache", "settings_converter"],
	["startTag", "settings_converter"],
	["endTag", "settings_converter"],
	["zidongdianji", "settings_converter"],
	["zidongdianji2", "settings_converter"],
	["longPressToEdit", "settings_converter"],
	["clickToPreview", "settings_converter"],
	["dbclike", "settings_converter"],
	["collapseImage", "settings_converter"],
	["cloudQueueGreeting", "settings_converter"],
	["showQueueGreeting", "settings_converter"],
	["displayMode", "settings_converter"],
	["heavyFrontendMode", "settings_converter"],
	["insertOriginalText", "settings_converter"],
	["tagthinkEcho", "settings_converter"],
	["historyKeepImageTag", "settings_converter"],
	["enablePregen", "settings_converter"],
	["autoLLMImageGen", "settings_converter"],
	["imageAlignment", "settings_converter"],
	["imageSizeScale", "settings_converter"],
	["imageGenInterval", "settings_converter"],
	["chatu8_code", "settings_converter"],
	["asr", "settings_converter"],
	["asr.enabled", "settings_converter"],
	["asr.asrServerUrl", "settings_converter"],
	["asr.mode", "settings_converter"],
	["asr.silenceTimeout", "settings_converter"],
	["asr.vadThreshold", "settings_converter"],
	["asr.maxKeepDuration", "settings_converter"],
	["asr.language", "settings_converter"],
	["asr.appendMode", "settings_converter"],
	["asr.autoSend", "settings_converter"],
	["asr.conversationMode", "settings_converter"],
	["imageGenStats", "settings_converter"],
	["imageGenStats.backends", "settings_converter"],
	["imageGenStats.backends.*", "settings_converter"],
	["imageGenStats.backends.*.success", "settings_converter"],
	["imageGenStats.backends.*.fail", "settings_converter"],
	["imageGenStats.total", "settings_converter"],
	["imageGenStats.total.success", "settings_converter"],
	["imageGenStats.total.fail", "settings_converter"],
	["imageGenStats.firstGenTime", "settings_converter"],
	["imageGenStats.lastGenTime", "settings_converter"],
	["imageGenStats.daily.**", "settings_converter"],
	["fabThemes.**", "settings_converter"],
	["chatu8_fab_theme", "settings_converter"],
	["enable_chatu8_fab", "settings_converter"],
	["enable_chatu8_desktop_pet", "settings_converter"],
	["chatu8_fab_bg_color", "settings_converter"],
	["chatu8_fab_icon_color", "settings_converter"],
	["chatu8_fab_opacity", "settings_converter"],
	["chatu8_fab_size", "settings_converter"],
	["chatu8_fab_size.desktop", "settings_converter"],
	["chatu8_fab_size.mobile", "settings_converter"],
	["chatu8_fab_position", "settings_converter"],
	["chatu8_fab_position.desktop", "settings_converter"],
	["chatu8_fab_position.desktop.top", "settings_converter"],
	["chatu8_fab_position.desktop.left", "settings_converter"],
	["chatu8_fab_position.mobile", "settings_converter"],
	["chatu8_fab_position.mobile.top", "settings_converter"],
	["chatu8_fab_position.mobile.left", "settings_converter"],
	["vocabulary_search_startswith", "settings_converter"],
	["vocabulary_search_limit", "settings_converter"],
	["vocabulary_search_sort", "settings_converter"],
	["jiuguanchucun", "settings_converter"],
	["convertToJpegStorage", "settings_converter"],
	["gestureEnabled", "settings_converter"],
	["clickTriggerEnabled", "settings_converter"],
	["gesture1", "settings_converter"],
	["gesture2", "settings_converter"],
	["gestureShowRecognition", "settings_converter"],
	["gestureShowTrail", "settings_converter"],
	["gestureTrailColor", "settings_converter"],
	["gestureMatchThreshold", "settings_converter"],
	["regexTestMode", "settings_converter"],
	["mode", "provider_converter"],
	["client", "provider_converter"],
	["sdUrl", "provider_converter"],
	["comfyuiUrl", "provider_converter"],
	["nai3Scale", "provider_converter"],
	["sdCfgScale", "provider_converter"],
	["sm", "provider_converter"],
	["dyn", "provider_converter"],
	["cfg_rescale", "provider_converter"],
	["sd_csteps", "provider_converter"],
	["sd_cwidth", "provider_converter"],
	["sd_cheight", "provider_converter"],
	["sd_cseed", "provider_converter"],
	["novelai_steps", "provider_converter"],
	["novelai_width", "provider_converter"],
	["novelai_height", "provider_converter"],
	["novelai_seed", "provider_converter"],
	["comfyui_steps", "provider_converter"],
	["comfyui_width", "provider_converter"],
	["comfyui_height", "provider_converter"],
	["comfyui_seed", "provider_converter"],
	["cfg_comfyui", "provider_converter"],
	["sd_cchatu_8_model", "provider_converter"],
	["sd_cchatu_8_vae", "provider_converter"],
	["sd_cchatu_8_scheduler", "provider_converter"],
	["sd_cchatu_8_upscaler", "provider_converter"],
	["sd_cupscale_factor", "provider_converter"],
	["sd_chires_fix", "provider_converter"],
	["sd_chires_steps", "provider_converter"],
	["sd_cdenoising_strength", "provider_converter"],
	["sd_cclip_skip", "provider_converter"],
	["sd_cadetailer", "provider_converter"],
	["restoreFaces", "provider_converter"],
	["sd_cchatu_8_samplerName", "provider_converter"],
	["comfyuisamplerName", "provider_converter"],
	["comfyuiCLIPName", "provider_converter"],
	["comfyui_scheduler", "provider_converter"],
	["comfyui_vae", "provider_converter"],
	["novelai_sampler", "provider_converter"],
	["nai3StylePerception", "provider_converter"],
	["nai3Deceisp", "provider_converter"],
	["nai3Variety", "provider_converter"],
	["Schedule", "provider_converter"],
	["MODEL_NAME", "provider_converter"],
	["c_fenwei", "provider_converter"],
	["c_xijie", "provider_converter"],
	["c_idquanzhong", "provider_converter"],
	["c_quanzhong", "provider_converter"],
	["ipa", "provider_converter"],
	["novelaimode", "provider_converter"],
	["novelaisite", "provider_converter"],
	["novelaiOtherSite", "provider_converter"],
	["enableCloudQueue", "provider_converter"],
	["cloudQueueUrl", "provider_converter"],
	["novelai_profiles.**", "provider_converter"],
	["novelai_profile_id", "provider_converter"],
	["comfyui_profiles.**", "provider_converter"],
	["comfyui_profile_id", "provider_converter"],
	["banana", "provider_converter"],
	["banana.apiUrl", "provider_converter"],
	["banana.model", "provider_converter"],
	["banana.editModel", "provider_converter"],
	["banana.videoModel", "provider_converter"],
	["banana.aspectRatio", "provider_converter"],
	["banana.imageSize", "provider_converter"],
	["banana.useGrokFormat", "provider_converter"],
	["banana.conversationPresetId", "provider_converter"],
	["banana.editPresetId", "provider_converter"],
	["banana.videoPresetId", "provider_converter"],
	["banana.conversationPresets.**", "provider_converter"],
	["banana.prompt_replace.**", "provider_converter"],
	["banana.prompt_replace_id", "provider_converter"],
	["bananaCharacterPresets.**", "provider_converter"],
	["bananaCharacterPresetId", "provider_converter"],
	["ai_temperature", "provider_converter"],
	["ai_top_p", "provider_converter"],
	["ai_presence_penalty", "provider_converter"],
	["ai_frequency_penalty", "provider_converter"],
	["ai_stream", "provider_converter"],
	["ai_private", "provider_converter"],
	["chatu8_ai_assistant", "provider_converter"],
	["chatu8_ai_assistant.api_url", "provider_converter"],
	["chatu8_ai_assistant.model", "provider_converter"],
	["chatu8_ai_assistant.bypass_proxy", "provider_converter"],
	["chatu8_ai_assistant.stream", "provider_converter"],
	["chatu8_ai_assistant.system_prompt", "provider_converter"],
	["llm_history_depth", "provider_converter"],
	["llm_profiles.**", "provider_converter"],
	["current_llm_profile", "provider_converter"],
	["llm_request_type_profiles.**", "provider_converter"],
	["current_llm_request_type_profile", "provider_converter"],
	["llm_request_type_configs", "provider_converter"],
	["llm_request_type_configs.*", "provider_converter"],
	["llm_request_type_configs.*.api_profile", "provider_converter"],
	["llm_request_type_configs.*.context_profile", "provider_converter"],
	["AI_use_coords", "provider_converter"],
	["characterAI", "prompt_converter"],
	["characterAI.model", "prompt_converter"],
	["characterAI.temperature", "prompt_converter"],
	["characterAI.systemPrompt", "prompt_converter"],
	["characterAI.lastPrompt", "prompt_converter"],
	["outfitAI", "prompt_converter"],
	["outfitAI.model", "prompt_converter"],
	["outfitAI.temperature", "prompt_converter"],
	["outfitAI.systemPrompt", "prompt_converter"],
	["outfitAI.lastPrompt", "prompt_converter"],
	["yushe.**", "prompt_converter"],
	["yusheid_sd", "prompt_converter"],
	["yusheid_novelai", "prompt_converter"],
	["yusheid_comfyui", "prompt_converter"],
	["randomYushe", "prompt_converter"],
	["prompt_replace.**", "prompt_converter"],
	["prompt_replace_id", "prompt_converter"],
	["regex_profiles.**", "prompt_converter"],
	["current_regex_profile", "prompt_converter"],
	["word_replacement_profiles.**", "prompt_converter"],
	["current_word_replacement_profile", "prompt_converter"],
	["AQT_sd", "prompt_converter"],
	["UCP_sd", "prompt_converter"],
	["AQT_novelai", "prompt_converter"],
	["UCP_novelai", "prompt_converter"],
	["AQT_comfyui", "prompt_converter"],
	["UCP_comfyui", "prompt_converter"],
	["ai_test_system", "prompt_converter"],
	["ai_test_user", "prompt_converter"],
	["ai_test_output", "prompt_converter"],
	["test_context_profiles.**", "prompt_converter"],
	["current_test_context_profile", "prompt_converter"],
	["translation_model", "prompt_converter"],
	["translation_system_prompt", "prompt_converter"],
	["defaultImageDemand", "prompt_converter"],
	["workers.**", "asset_converter"],
	["workerid", "asset_converter"],
	["worker", "asset_converter"],
	["editWorkerid", "asset_converter"],
	["editWorker", "asset_converter"],
	["weilin_lora_fix", "asset_converter"],
	["inpaint_denoise", "asset_converter"],
	["inpaint_brush_size", "asset_converter"],
	["inpaint_positive_prompt", "asset_converter"],
	["inpaint_negative_prompt", "asset_converter"],
	["vibePresets.**", "asset_converter"],
	["vibePresetId", "asset_converter"],
	["nai3VibeTransfer", "asset_converter"],
	["enableVibeGroupTransfer", "asset_converter"],
	["randomVibeGroup", "asset_converter"],
	["normalizeRefStrength", "asset_converter"],
	["nai3CharRef", "asset_converter"],
	["InformationExtracted", "asset_converter"],
	["ReferenceStrength", "asset_converter"],
	["vibeJiuguanchucun", "asset_converter"],
	["chatu8_fab_icon_image_id", "asset_converter"],
	["enable_chatu8_fab_video", "asset_converter"],
	["chatu8_fab_video_paths.**", "asset_converter"],
	["defaultCharDemand", "character_converter"],
	["personaProfiles", "character_converter"],
	["personaProfiles.presets.**", "character_converter"],
	["personaProfiles.currentPresetId", "character_converter"],
	["personaProfiles.enabled", "character_converter"],
	["personaProfiles.injectionMode", "character_converter"],
	["personaProfiles.currentUserPresetId", "character_converter"],
	["personaProfiles.userEnabled", "character_converter"],
	["personaProfiles.userInjectionMode", "character_converter"],
	["knowledgeBaseConfig", "knowledge_converter"],
	["knowledgeBaseConfig.enabled", "knowledge_converter"],
	["knowledgeBaseConfig.triggerDepth", "knowledge_converter"],
	["knowledgeBaseConfig.worldBookSelections.**", "knowledge_converter"],
	["knowledgeBaseConfig.worldEntrySelections.**", "knowledge_converter"],
	["worldBookEnabled", "knowledge_converter"],
	["worldBookList.**", "knowledge_converter"],
	["worldBookList_id", "knowledge_converter"],
	["worldBookConfig", "knowledge_converter"],
	["worldBookConfig.worldBookSelections.**", "knowledge_converter"],
	["worldBookConfig.worldEntrySelections.**", "knowledge_converter"],
	["jiuguanStorage.**", "gallery_converter"]
], v_ = [
	["st_chatu8_sd_auth", "sd_webui_auth"],
	["novelaiApi", "novelai_token"],
	["novelaiApi_id", "novelai_token"],
	["novelai_profiles.*.novelaiApi", "novelai_token"],
	["banana.apiKey", "banana_api_key"],
	["chatu8_ai_assistant.api_key", "chatu8_ai_assistant_api_key"],
	["llm_profiles.*.api_key", "llm_profile_api_key"],
	["ai_token", "legacy_ai_token"]
], y_ = [
	...__.map(([e, t]) => g_(e, t)),
	...v_.map(([e, t]) => ({
		pattern: e,
		classification: "deferred_secret_transfer",
		converter: "provider_converter",
		credential_kind: t
	})),
	{
		pattern: "cacheStorageMigrated",
		classification: "intentionally_obsolete",
		reason: "cache_completion_flag"
	},
	{
		pattern: "lastTab",
		classification: "intentionally_obsolete",
		reason: "old_ui_dom_state"
	}
];
//#endregion
//#region ../../tools/v2_migration/src/id_derivation.ts
function b_(e) {
	return vn(An(yn(e)));
}
function x_(e) {
	return vn(An(e));
}
function S_(e, t) {
	let n = new Uint8Array(t), r = 0, i = 0;
	for (; r < t;) {
		let a = An(yn(`${e}::${String(i)}`)), o = Math.min(a.length, t - r);
		n.set(a.subarray(0, o), r), r += o, i += 1;
	}
	return n;
}
var C_ = "0123456789abcdef";
function w_(e, t) {
	let n = e[t];
	if (n === void 0) throw RangeError(`Missing byte at index ${String(t)}`);
	return n;
}
function T_(e) {
	return C_.charAt(e >> 4) + C_.charAt(e & 15);
}
function Q(e) {
	let t = S_(e, 16);
	t[6] = w_(t, 6) & 15 | 80, t[8] = w_(t, 8) & 63 | 128;
	let n = Array.from(t, T_).join("");
	return `${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20, 32)}`;
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_coercion.ts
function E_(e, t = !1) {
	return typeof e == "boolean" ? e : e === "true" || e !== "false" && t;
}
function D_(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/payload_extraction.ts
function O_(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (r.classification !== "mapped" || r.converter !== t) continue;
		let [e] = r.pattern.split(".");
		e !== void 0 && n.add(e);
	}
	return [...n].toSorted();
}
function k_(e, t, n) {
	let r = {};
	for (let i of O_(t, n)) Object.hasOwn(e, i) && (r[i] = e[i]);
	return r;
}
function A_(e, t, n) {
	if (!f_(e)) return e;
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		let e = [...t, i];
		h_(e, n)?.classification !== "deferred_secret_transfer" && (r[i] = A_(a, e, n));
	}
	return r;
}
function j_(e) {
	return yu(e), e;
}
//#endregion
//#region ../../tools/v2_migration/src/converters/settings_converter.ts
var M_ = d_.extend({ payload: z(L(), it()) });
function N_(e, t) {
	let n = [
		{
			path: "locale",
			message: "v2 has no UI locale setting; defaulted to 'auto'."
		},
		{
			path: "global_concurrency",
			message: "v2 has no concurrency-limit setting; defaulted to 1."
		},
		{
			path: "active_provider_profile_id",
			message: `Unresolved; the migration runner must map v2 "mode" (${JSON.stringify(e.mode)}) to a provider_profiles id created by provider_converter.`
		},
		{
			path: "gateway",
			message: "v2 has no Gateway concept; defaulted to an unconfigured Gateway."
		},
		{
			path: "ui.color_mode",
			message: "v2's rich custom theme system (theme_id/themes/fabThemes) has no v3 color_mode equivalent; preserved verbatim in legacy_preferences instead of being mapped."
		},
		{
			path: "ui.inspector_width",
			message: "v2 has no inspector panel; defaulted to 360."
		}
	], r = pt.parse({
		schema_version: 1,
		active_namespace: t.namespace,
		locale: "auto",
		active_provider_profile_id: null,
		global_concurrency: 1,
		auto_generation_enabled: E_(e.autoLLMImageGen),
		fallback_generation_enabled: E_(e.enablePregen),
		gateway: {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		},
		ui: {
			color_mode: "system",
			inspector_width: 360,
			inspector_collapsed: !1,
			optional_entry_enabled: e.enable_chatu8_fab
		}
	}), i = Q(`${t.namespace}:legacy_preferences:settings_converter`), a = j_(k_(e, y_, "settings_converter"));
	return {
		settings: r,
		legacy_preferences: M_.parse({
			schema_version: 1,
			id: i,
			namespace: t.namespace,
			record_key: l_(t.namespace, i),
			created_at: t.migrated_at,
			updated_at: t.migrated_at,
			payload: a
		}),
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/provider_converter.ts
function P_(e, t, n, r) {
	return Xl.parse({
		...u_(e, t),
		provider_id: n,
		payload: j_(r)
	});
}
function F_(e, t) {
	let n = new Set(t);
	return Object.fromEntries(Object.entries(e).filter(([e]) => !n.has(e)));
}
function I_(e, t, n) {
	t.trim().length !== 0 && e.push({
		operation: "secret_transfer",
		plaintext_value: t,
		...n
	});
}
function L_(e, t) {
	let n = [], r = [], i = [], a = Q(`${t.namespace}:provider_converter:legacy_all`), o = A_(k_(e, y_, "provider_converter"), [], y_);
	i.push(P_(t, a, "legacy_all", o)), n.push({
		path: "mode",
		message: `v2 "mode" was ${JSON.stringify(e.mode)}; the migration runner resolves this to active_provider_profile_id.`
	});
	for (let [n, a] of Object.entries(e.novelai_profiles)) {
		let e = Q(`${t.namespace}:provider_converter:novelai:${n}`);
		i.push(P_(t, e, "novelai", F_(a, ["novelaiApi"]))), I_(r, a.novelaiApi, {
			credential_kind: "novelai_token",
			source_path: `novelai_profiles.${n}.novelaiApi`,
			provider_profile_id: e
		});
	}
	for (let [n, r] of Object.entries(e.comfyui_profiles)) {
		let e = Q(`${t.namespace}:provider_converter:comfyui:${n}`);
		i.push(P_(t, e, "comfyui", { ...r }));
	}
	for (let [n, a] of Object.entries(e.llm_profiles)) {
		let e = Q(`${t.namespace}:provider_converter:llm:${n}`);
		i.push(P_(t, e, "llm", F_(a, ["api_key"]))), I_(r, a.api_key, {
			credential_kind: "llm_profile_api_key",
			source_path: `llm_profiles.${n}.api_key`,
			provider_profile_id: e
		});
	}
	let s = Q(`${t.namespace}:provider_converter:openai_image:banana`);
	i.push(P_(t, s, "openai_image", {
		...F_(e.banana, ["apiKey"]),
		character_presets: e.bananaCharacterPresets,
		character_preset_id: e.bananaCharacterPresetId
	})), n.push({
		path: "banana",
		message: "v2 \"banana\" (Banana/Grok) used an OpenAI-compatible API; remapped to provider_id \"openai_image\"."
	}), I_(r, e.banana.apiKey, {
		credential_kind: "banana_api_key",
		source_path: "banana.apiKey",
		provider_profile_id: s
	});
	let c = Q(`${t.namespace}:provider_converter:llm:chatu8_ai_assistant`);
	return i.push(P_(t, c, "llm", F_(e.chatu8_ai_assistant, ["api_key"]))), I_(r, e.chatu8_ai_assistant.api_key, {
		credential_kind: "chatu8_ai_assistant_api_key",
		source_path: "chatu8_ai_assistant.api_key",
		provider_profile_id: c
	}), I_(r, e.st_chatu8_sd_auth, {
		credential_kind: "sd_webui_auth",
		source_path: "st_chatu8_sd_auth",
		provider_profile_id: a
	}), I_(r, e.novelaiApi, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi",
		provider_profile_id: a
	}), I_(r, e.novelaiApi_id, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi_id",
		provider_profile_id: a
	}), I_(r, e.ai_token, {
		credential_kind: "legacy_ai_token",
		source_path: "ai_token",
		provider_profile_id: a
	}), {
		records: i,
		warnings: n,
		secret_transfers: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/prompt_converter.ts
function R_(e, t, n) {
	return gu.prompt_presets.parse({
		...u_(e, t),
		payload: j_(n)
	});
}
function z_(e, t, n) {
	return gu.regex_rules.parse({
		...u_(e, t),
		payload: j_(n)
	});
}
function B_(e, t) {
	let n = [], r = [], i = [], a = Q(`${t.namespace}:prompt_converter:legacy_all`);
	r.push(R_(t, a, k_(e, y_, "prompt_converter")));
	for (let [n, i] of Object.entries(e.yushe)) {
		let e = Q(`${t.namespace}:prompt_converter:yushe:${n}`);
		r.push(R_(t, e, {
			kind: "yushe",
			name: n,
			...i
		}));
	}
	for (let [n, i] of Object.entries(e.test_context_profiles)) {
		let e = Q(`${t.namespace}:prompt_converter:test_context:${n}`);
		r.push(R_(t, e, {
			kind: "llm_test_context",
			name: n,
			...i
		}));
	}
	let o = Q(`${t.namespace}:prompt_converter:persona_ai_defaults`);
	r.push(R_(t, o, {
		kind: "llm_prompt_builder_defaults",
		characterAI: e.characterAI,
		outfitAI: e.outfitAI,
		translation_model: e.translation_model,
		translation_system_prompt: e.translation_system_prompt,
		ai_test_system: e.ai_test_system,
		ai_test_user: e.ai_test_user,
		ai_test_output: e.ai_test_output,
		defaultImageDemand: e.defaultImageDemand
	}));
	for (let [n, r] of Object.entries(e.prompt_replace)) {
		let e = Q(`${t.namespace}:prompt_converter:prompt_replace:${n}`);
		i.push(z_(t, e, {
			kind: "prompt_replace",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.regex_profiles)) {
		let e = Q(`${t.namespace}:prompt_converter:regex_profile:${n}`);
		i.push(z_(t, e, {
			kind: "regex_profile",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.word_replacement_profiles)) {
		let e = Q(`${t.namespace}:prompt_converter:word_replacement:${n}`);
		i.push(z_(t, e, {
			kind: "word_replacement",
			name: n,
			...r
		}));
	}
	return {
		prompt_presets: r,
		regex_rules: i,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/asset_converter.ts
function V_(e, t, n) {
	return gu.comfy_workflows.parse({
		...u_(e, t),
		payload: j_(n)
	});
}
function H_(e, t, n) {
	return gu.novelai_vibes.parse({
		...u_(e, t),
		payload: j_(n)
	});
}
function U_(e, t, n) {
	let r = [], i = [], a = [], o = [], s = Q(`${n.namespace}:asset_converter:legacy_all`);
	i.push(V_(n, s, k_(e, y_, "asset_converter")));
	for (let [t, r] of Object.entries(e.workers)) {
		let e = Q(`${n.namespace}:asset_converter:workers:${t}`);
		i.push(V_(n, e, {
			kind: "workflow",
			name: t,
			workflow_json: r
		}));
	}
	let c = Q(`${n.namespace}:asset_converter:edit_workflow`);
	i.push(V_(n, c, {
		kind: "edit_workflow",
		editWorkerid: e.editWorkerid,
		editWorker: e.editWorker
	}));
	let l = Q(`${n.namespace}:asset_converter:inpaint_defaults`);
	i.push(V_(n, l, {
		kind: "inpaint_lora_defaults",
		inpaint_denoise: e.inpaint_denoise,
		inpaint_brush_size: e.inpaint_brush_size,
		inpaint_positive_prompt: e.inpaint_positive_prompt,
		inpaint_negative_prompt: e.inpaint_negative_prompt,
		weilin_lora_fix: e.weilin_lora_fix
	}));
	for (let [t, r] of Object.entries(e.vibePresets)) {
		let e = Q(`${n.namespace}:asset_converter:vibe:${t}`);
		a.push(H_(n, e, {
			kind: "vibe_preset",
			name: t,
			...r
		}));
	}
	let u = Q(`${n.namespace}:asset_converter:vibe_defaults`);
	a.push(H_(n, u, {
		kind: "vibe_defaults",
		nai3VibeTransfer: e.nai3VibeTransfer,
		enableVibeGroupTransfer: e.enableVibeGroupTransfer,
		randomVibeGroup: e.randomVibeGroup,
		normalizeRefStrength: e.normalizeRefStrength,
		nai3CharRef: e.nai3CharRef,
		InformationExtracted: e.InformationExtracted,
		ReferenceStrength: e.ReferenceStrength,
		vibeJiuguanchucun: e.vibeJiuguanchucun
	}));
	for (let e of t?.config_images ?? []) {
		let t = D_(e.data_base64), r = x_(t), i = Q(`${n.namespace}:asset_converter:config_image:${e.id}`);
		o.push(lu.parse({
			...u_(n, i),
			sha256: r,
			last_accessed_at: n.migrated_at,
			pinned: !0,
			payload: j_({
				kind: "uploaded_configuration_image",
				legacy_id: e.id,
				byte_length: t.byteLength
			})
		}));
	}
	return t === void 0 && r.push({
		path: "chatu8_config_images.config_images",
		message: "No gallery database fixture supplied; uploaded configuration images were not converted."
	}), {
		comfy_workflows: i,
		novelai_vibes: a,
		image_records: o,
		warnings: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/character_converter.ts
function W_(e, t, n) {
	return gu.character_profiles.parse({
		...u_(e, t),
		payload: j_(n)
	});
}
function G_(e, t) {
	let n = [], r = [], i = Q(`${t.namespace}:character_converter:legacy_all`);
	r.push(W_(t, i, k_(e, y_, "character_converter")));
	let a = e.personaProfiles?.presets ?? {};
	for (let [e, n] of Object.entries(a)) {
		let i = Q(`${t.namespace}:character_converter:persona:${e}`);
		r.push(W_(t, i, {
			kind: "persona_preset",
			name: e,
			...n
		}));
	}
	return e.personaProfiles === void 0 && n.push({
		path: "personaProfiles",
		message: "v2 settings did not have personaProfiles initialized; no persona presets to convert."
	}), {
		character_profiles: r,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/knowledge_converter.ts
function K_(e, t, n, r) {
	return gu.knowledge_entries.parse({
		...u_(e, t),
		source_type: n,
		payload: j_(r)
	});
}
function q_(e, t) {
	let n = [], r = [], i = Q(`${t.namespace}:knowledge_converter:legacy_all`);
	r.push(K_(t, i, "legacy_all", k_(e, y_, "knowledge_converter")));
	let a = Q(`${t.namespace}:knowledge_converter:knowledge_base_config`);
	r.push(K_(t, a, "knowledge_base_config", e.knowledgeBaseConfig));
	for (let [n, i] of Object.entries(e.worldBookList)) {
		let a = Q(`${t.namespace}:knowledge_converter:builtin_world_book:${n}`);
		r.push(K_(t, a, "builtin_world_book", {
			name: n,
			enabled: e.worldBookEnabled,
			active_entry_id: e.worldBookList_id === n,
			...i
		}));
	}
	if (e.worldBookConfig !== void 0) {
		let n = Q(`${t.namespace}:knowledge_converter:send_data_world_book_config`);
		r.push(K_(t, n, "send_data_world_book_config", e.worldBookConfig));
	} else n.push({
		path: "worldBookConfig",
		message: "v2 settings did not have worldBookConfig initialized (send_data World Info was never opened)."
	});
	return {
		knowledge_entries: r,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/gallery_converter.ts
var J_ = "manual";
function Y_(e, t, n, r, i) {
	return lu.parse({
		...u_(e, t),
		sha256: n,
		last_accessed_at: e.migrated_at,
		pinned: !1,
		payload: {
			kind: r,
			...i
		}
	});
}
function X_(e, t, n, r, i, a, o) {
	if (r.data_base64 === void 0) {
		a.push({
			path: o,
			message: `Image ${r.uuid} has no resolved bytes; the migration runner must fetch it before this record can be converted.`
		});
		return;
	}
	let s = D_(r.data_base64), c = x_(s);
	return Y_(e, Q(`${e.namespace}:gallery_converter:${t}:${r.uuid}`), c, i, {
		tag_key: n,
		legacy_uuid: r.uuid,
		...r.path === void 0 ? {} : { host_path: r.path },
		...r.thumbnail_path === void 0 ? {} : { thumbnail_host_path: r.thumbnail_path },
		is_video: r.isVideo,
		original_url: r.originalUrl,
		byte_length: s.byteLength,
		generation_parameters: r.genParams ?? null
	});
}
function Z_(e, t, n) {
	let r = [], i = [], a = [], o = [];
	for (let [t, a] of Object.entries(e.jiuguanStorage)) for (let [e, o] of a.images.entries()) {
		let a = X_(n, "server", t, o, "server_metadata", r, `jiuguanStorage.${t}.images[${String(e)}]`);
		a !== void 0 && i.push(a);
	}
	for (let [e, a] of Object.entries(t?.tupianhuancun_metadata ?? {})) for (let [o, s] of a.images.entries()) {
		let a = s.data_base64 ?? (t?.tupianhuancun_blobs[s.uuid] === void 0 ? void 0 : t.tupianhuancun_blobs[s.uuid]), c = X_(n, "indexeddb", e, {
			...s,
			data_base64: a
		}, "indexeddb_blob", r, `chatu8_gallery.tupianhuancun.${e}.images[${String(o)}]`);
		c !== void 0 && i.push(c);
	}
	if (t === void 0) return r.push({
		path: "chatu8_gallery",
		message: "No gallery database fixture supplied; the IndexedDB tupianhuancun/vocabulary stores were not converted."
	}), {
		image_records: i,
		vocabularies: a,
		vocabulary_groups: o,
		warnings: r
	};
	let s = t.tags.filter((e) => e.fileName === J_), c = Q(`${n.namespace}:gallery_converter:manual_vocabulary`);
	a.push(gu.vocabularies.parse({
		...u_(n, c),
		payload: {
			kind: "manual_vocabulary",
			tags: s
		}
	}));
	let l = t.groups.filter((e) => e.fileName === J_), u = t.subgroups.filter((e) => e.fileName === J_);
	for (let e of l) {
		let t = Q(`${n.namespace}:gallery_converter:group:${e.id_index}`);
		o.push(gu.vocabulary_groups.parse({
			...u_(n, t),
			vocabulary_id: c,
			payload: {
				kind: "group",
				...e
			}
		}));
	}
	for (let e of u) {
		let t = Q(`${n.namespace}:gallery_converter:subgroup:${e.id_index}`);
		o.push(gu.vocabulary_groups.parse({
			...u_(n, t),
			vocabulary_id: c,
			payload: {
				kind: "subgroup",
				...e
			}
		}));
	}
	let d = t.tags.length - s.length;
	return d > 0 && r.push({
		path: "chatu8_gallery.tags",
		message: `Skipped ${String(d)} bundled (non-manual) tag row(s); the bundled vocabulary dataset ships with the extension and is not user data.`
	}), {
		image_records: i,
		vocabularies: a,
		vocabulary_groups: o,
		warnings: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converter_registry.ts
function Q_(e) {
	let t = [], n = [];
	for (let { segments: r, path: i } of p_(e)) {
		let e = h_(r, y_);
		e === void 0 ? n.push(i) : t.push({
			path: i,
			rule: e
		});
	}
	return {
		classified: t,
		unknown: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_schema.ts
var $ = He([
	L(),
	B(),
	V()
]), $_ = H({
	fixedPrompt: L(),
	fixedPrompt_end: L(),
	negativePrompt: L()
}), ev = H({
	model: L(),
	infoExtract: B(),
	strength: B(),
	imageId: L().nullable(),
	vibeDataId: L().nullable()
}), tv = H({
	beforeAfterRegex: L(),
	textRegex: L()
}), nv = H({
	textReplacement: L(),
	aiReplacement: L()
}), rv = H({ text: L() }), iv = H({
	bgColor: L(),
	iconColor: L(),
	opacity: B()
}), av = H({
	bgColor: L().optional(),
	textColor: L().optional(),
	accentColor: L().optional()
}), ov = H({
	novelaiApi: L(),
	novelaisite: L(),
	novelaiOtherSite: L(),
	enableCloudQueue: L(),
	cloudQueueUrl: L(),
	cloudQueueGreeting: L(),
	showQueueGreeting: L(),
	novelaimode: L(),
	novelai_sampler: L(),
	Schedule: L(),
	nai3Scale: L(),
	cfg_rescale: L(),
	AI_use_coords: L(),
	sm: L(),
	dyn: L(),
	nai3Variety: L(),
	nai3Deceisp: L(),
	enableVibeGroupTransfer: L(),
	randomVibeGroup: L(),
	normalizeRefStrength: L(),
	novelai_width: L(),
	novelai_height: L(),
	novelai_steps: L(),
	novelai_seed: L()
}), sv = H({
	workerid: L(),
	worker: L(),
	editWorkerid: L(),
	editWorker: L(),
	comfyuiUrl: L(),
	MODEL_NAME: L(),
	comfyuisamplerName: L(),
	comfyui_vae: L(),
	comfyui_scheduler: L(),
	comfyuiCLIPName: L(),
	comfyui_width: L(),
	comfyui_height: L(),
	comfyui_steps: L(),
	comfyui_seed: L(),
	cfg_comfyui: L()
}), cv = H({
	api_url: L(),
	api_key: L(),
	model: L(),
	temperature: B(),
	top_p: B(),
	max_tokens: B(),
	stream: V(),
	bypass_proxy: V()
}), lv = H({
	api_profile: L(),
	context_profile: L()
}), uv = {
	api_profile: "",
	context_profile: ""
}, dv = H({
	image_gen: lv,
	char_design: lv,
	char_display: lv,
	char_modify: lv,
	translation: lv,
	tag_modify: lv,
	ai_assistant: lv,
	persona_gen: lv,
	user_persona_gen: lv,
	chat_summary: lv
}), fv = {
	image_gen: uv,
	char_design: uv,
	char_display: uv,
	char_modify: uv,
	translation: uv,
	tag_modify: uv,
	ai_assistant: uv,
	persona_gen: uv,
	user_persona_gen: uv,
	chat_summary: uv
}, pv = H({
	id: L(),
	name: L(),
	role: F([
		"system",
		"user",
		"assistant"
	]),
	content: L(),
	enabled: V(),
	triggerMode: F(["always", "trigger"]),
	triggerWords: L(),
	andTriggerWords: L()
}), mv = H({ entries: R(pv) }), hv = H({
	user: H({
		text: L(),
		image: L()
	}),
	model: H({
		text: L(),
		image: L()
	})
}), gv = H({
	fixedPrompt: L(),
	postfixPrompt: L(),
	conversation: R(hv)
}), _v = H({
	triggers: L(),
	conversation: hv
}), vv = H({
	apiKey: L(),
	apiUrl: L(),
	model: L(),
	editModel: L(),
	videoModel: L(),
	aspectRatio: L(),
	imageSize: L(),
	useGrokFormat: L(),
	conversationPresetId: L(),
	editPresetId: L(),
	videoPresetId: L(),
	conversationPresets: z(L(), gv),
	prompt_replace: z(L(), rv),
	prompt_replace_id: L()
}), yv = {
	apiKey: "123456",
	apiUrl: "http://localhost:8008",
	model: "",
	editModel: "",
	videoModel: "",
	aspectRatio: "1:1",
	imageSize: "1024x1024",
	useGrokFormat: "false",
	conversationPresetId: "",
	editPresetId: "",
	videoPresetId: "",
	conversationPresets: {},
	prompt_replace: {},
	prompt_replace_id: ""
}, bv = H({
	api_url: L(),
	api_key: L(),
	model: L(),
	bypass_proxy: V(),
	stream: V(),
	system_prompt: L()
}), xv = {
	api_url: "",
	api_key: "",
	model: "mistral",
	bypass_proxy: !1,
	stream: !0,
	system_prompt: ""
}, Sv = H({
	enabled: V(),
	asrServerUrl: L(),
	mode: F(["vad", "ptt"]),
	silenceTimeout: B(),
	vadThreshold: B(),
	maxKeepDuration: B(),
	language: L(),
	appendMode: V(),
	autoSend: V(),
	conversationMode: V()
}), Cv = {
	enabled: !1,
	asrServerUrl: "https://qwen-qwen3-asr-demo.ms.show",
	mode: "vad",
	silenceTimeout: 1200,
	vadThreshold: .02,
	maxKeepDuration: 10,
	language: "auto",
	appendMode: !0,
	autoSend: !0,
	conversationMode: !1
}, wv = H({
	enabled: V(),
	triggerDepth: B(),
	worldBookSelections: z(L(), He([V(), I("force")])),
	worldEntrySelections: z(L(), z(L(), He([V(), I("force")])))
}), Tv = {
	enabled: !1,
	triggerDepth: 1,
	worldBookSelections: {},
	worldEntrySelections: {}
}, Ev = H({
	worldBookSelections: z(L(), He([V(), I("force")])),
	worldEntrySelections: z(L(), z(L(), He([V(), I("force")])))
}), Dv = H({
	backends: H({
		sd: H({
			success: B(),
			fail: B()
		}),
		comfyui: H({
			success: B(),
			fail: B()
		}),
		banana: H({
			success: B(),
			fail: B()
		}),
		novelai: H({
			success: B(),
			fail: B()
		})
	}),
	total: H({
		success: B(),
		fail: B()
	}),
	firstGenTime: B().nullable(),
	lastGenTime: B().nullable(),
	daily: z(L(), it())
}), Ov = {
	backends: {
		sd: {
			success: 0,
			fail: 0
		},
		comfyui: {
			success: 0,
			fail: 0
		},
		banana: {
			success: 0,
			fail: 0
		},
		novelai: {
			success: 0,
			fail: 0
		}
	},
	total: {
		success: 0,
		fail: 0
	},
	firstGenTime: null,
	lastGenTime: null,
	daily: {}
}, kv = H({
	presets: z(L(), z(L(), it())),
	currentPresetId: L().optional(),
	enabled: V().optional(),
	injectionMode: L().optional(),
	currentUserPresetId: L().optional(),
	userEnabled: V().optional(),
	userInjectionMode: L().optional()
}), Av = H({
	model: L(),
	temperature: B(),
	systemPrompt: L(),
	lastPrompt: L()
}), jv = {
	model: "mistral",
	temperature: .8,
	systemPrompt: "",
	lastPrompt: ""
}, Mv = ze({
	theme_id: L().default(""),
	themes: z(L(), av).default({}),
	generate_btn_style: L().default(""),
	image_frame_style: L().default(""),
	collapse_style: L().default(""),
	scriptEnabled: V().default(!1),
	helpTipsEnabled: $.default("true"),
	characterAI: Av.default(jv),
	outfitAI: Av.default(jv),
	newlineFixEnabled: $.default("true"),
	yushe: z(L(), $_).default({}),
	yusheid_sd: L().default(""),
	yusheid_novelai: L().default(""),
	yusheid_comfyui: L().default(""),
	randomYushe: $.default("false"),
	aiAutonomousResolution: V().default(!0),
	prompt_replace: z(L(), rv).default({}),
	prompt_replace_id: L().default(""),
	vibePresets: z(L(), ev).default({}),
	vibePresetId: L().default(""),
	regex_profiles: z(L(), tv).default({}),
	current_regex_profile: L().default(""),
	word_replacement_profiles: z(L(), nv).default({}),
	current_word_replacement_profile: L().default(""),
	regexTestMode: V().default(!1),
	mode: L().default("comfyui"),
	client: L().default("browser"),
	cache: L().default("1"),
	sdUrl: L().default("http://localhost:7860"),
	st_chatu8_sd_auth: L().default(""),
	comfyuiUrl: L().default("http://localhost:8188"),
	novelaiApi: L().default("000000"),
	novelaiApi_id: L().default("000000"),
	startTag: L().default("image###"),
	endTag: L().default("###"),
	nai3Scale: L().default("10"),
	sdCfgScale: L().default("7"),
	sm: L().default("true"),
	dyn: L().default("true"),
	cfg_rescale: L().default("0.18"),
	AQT_sd: L().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_sd: L().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	AQT_novelai: L().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_novelai: L().default("Heavy"),
	addFurryDataset: $.default("false"),
	AQT_comfyui: L().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_comfyui: L().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	sd_csteps: L().default("28"),
	sd_cwidth: L().default("1024"),
	sd_cheight: L().default("1024"),
	sd_cseed: L().default("-1"),
	novelai_steps: L().default("28"),
	novelai_width: L().default("1024"),
	novelai_height: L().default("1024"),
	novelai_seed: L().default("0"),
	comfyui_steps: L().default("28"),
	comfyui_width: L().default("1024"),
	comfyui_height: L().default("1024"),
	comfyui_seed: L().default("0"),
	inpaint_denoise: L().default("0.75"),
	weilin_lora_fix: $.default("false"),
	inpaint_brush_size: B().default(30),
	inpaint_positive_prompt: L().default(""),
	inpaint_negative_prompt: L().default(""),
	cfg_comfyui: L().default("6"),
	sd_cchatu_8_model: L().default(""),
	sd_cchatu_8_vae: L().default("Automatic"),
	sd_cchatu_8_scheduler: L().default(""),
	sd_cchatu_8_upscaler: L().default("Latent"),
	sd_cupscale_factor: L().default("1"),
	sd_chires_fix: L().default("false"),
	sd_chires_steps: L().default("0"),
	sd_cdenoising_strength: L().default("0.7"),
	sd_cclip_skip: L().default("2"),
	sd_cadetailer: L().default("false"),
	restoreFaces: L().default("false"),
	sd_cchatu_8_samplerName: L().default("DPM++ 2M"),
	comfyuisamplerName: L().default(""),
	comfyuiCLIPName: L().default(""),
	comfyui_scheduler: L().default(""),
	comfyui_vae: L().default(""),
	novelai_sampler: L().default("k_euler"),
	zidongdianji: $.default("false"),
	zidongdianji2: $.default("false"),
	longPressToEdit: $.default("false"),
	clickToPreview: $.default("true"),
	nai3VibeTransfer: $.default("false"),
	enableVibeGroupTransfer: $.default("false"),
	randomVibeGroup: $.default("false"),
	normalizeRefStrength: $.default("false"),
	nai3CharRef: $.default("false"),
	nai3StylePerception: $.default("false"),
	InformationExtracted: L().default("0.3"),
	ReferenceStrength: L().default("0.6"),
	nai3Deceisp: $.default("true"),
	nai3Variety: $.default("true"),
	Schedule: L().default("karras"),
	MODEL_NAME: L().default(""),
	c_fenwei: L().default("0.8"),
	c_xijie: L().default("0.8"),
	c_idquanzhong: L().default("1.10"),
	c_quanzhong: L().default("0.8"),
	ipa: L().default("STANDARD (medium strength)"),
	dbclike: $.default("false"),
	collapseImage: $.default("false"),
	workers: z(L(), L()).default({}),
	workerid: L().default(""),
	worker: L().default(""),
	editWorkerid: L().default(""),
	editWorker: L().default(""),
	novelaimode: L().default("nai-diffusion-4-5-full"),
	novelaisite: L().default(""),
	novelaiOtherSite: L().default("http://localhost:9696/get-new-token"),
	enableCloudQueue: $.default("false"),
	cloudQueueUrl: L().default("https://st-chatu-novelai-queue.hf.space"),
	cloudQueueGreeting: L().default(""),
	showQueueGreeting: $.default("true"),
	displayMode: L().default(""),
	heavyFrontendMode: $.default("false"),
	insertOriginalText: $.default("false"),
	tagthinkEcho: $.default("false"),
	historyKeepImageTag: V().default(!1),
	enablePregen: $.default("false"),
	autoLLMImageGen: $.default("false"),
	imageAlignment: L().default("center"),
	imageSizeScale: L().default("100"),
	imageGenInterval: B().default(100),
	ai_temperature: B().default(1),
	ai_top_p: B().default(1),
	ai_presence_penalty: B().default(0),
	ai_frequency_penalty: B().default(0),
	ai_stream: $.default("false"),
	ai_private: $.default("true"),
	ai_token: L().default(""),
	ai_test_system: L().default("You are a helpful assistant."),
	ai_test_user: L().default("What is the capital of France?"),
	ai_test_output: L().default(""),
	chatu8_ai_assistant: bv.default(xv),
	chatu8_code: L().default(""),
	asr: Sv.default(Cv),
	knowledgeBaseConfig: wv.default(Tv),
	llm_history_depth: B().default(2),
	imageGenStats: Dv.default(Ov),
	llm_profiles: z(L(), cv).default({}),
	current_llm_profile: L().default(""),
	llm_request_type_profiles: z(L(), dv).default({}),
	current_llm_request_type_profile: L().default(""),
	llm_request_type_configs: dv.default(fv),
	test_context_profiles: z(L(), mv).default({}),
	current_test_context_profile: L().default(""),
	translation_model: L().default("mistral"),
	translation_system_prompt: L().default(""),
	AI_use_coords: $.default("true"),
	fabThemes: z(L(), iv).default({}),
	chatu8_fab_theme: L().default(""),
	enable_chatu8_fab: V().default(!0),
	enable_chatu8_fab_video: V().default(!1),
	enable_chatu8_desktop_pet: V().default(!1),
	chatu8_fab_bg_color: L().default("#ADD8E6"),
	chatu8_fab_icon_color: L().default("#FFFFFF"),
	chatu8_fab_icon_image_id: L().default(""),
	chatu8_fab_opacity: B().default(1),
	chatu8_fab_size: H({
		desktop: B(),
		mobile: B()
	}).default({
		desktop: 50,
		mobile: 40
	}),
	chatu8_fab_position: H({
		desktop: H({
			top: L(),
			left: L()
		}),
		mobile: H({
			top: L(),
			left: L()
		})
	}).default({
		desktop: {
			top: "65vh",
			left: "20px"
		},
		mobile: {
			top: "80vh",
			left: "10px"
		}
	}),
	chatu8_fab_video_paths: H({
		idle: L(),
		dragging: L()
	}).default({
		idle: "",
		dragging: ""
	}),
	lastTab: L().default("main"),
	cacheStorageMigrated: V().default(!1),
	worldBookEnabled: $.default("false"),
	worldBookList: z(L(), H({ content: L() })).default({}),
	worldBookList_id: L().default(""),
	vocabulary_search_startswith: $.default("false"),
	vocabulary_search_limit: B().default(100),
	vocabulary_search_sort: L().default("hot_desc"),
	jiuguanchucun: $.default("false"),
	vibeJiuguanchucun: $.default("true"),
	convertToJpegStorage: $.default("false"),
	jiuguanStorage: z(L(), H({
		images: R(H({
			uuid: L(),
			path: L(),
			thumbnail_uuid: L(),
			thumbnail_path: L(),
			date: B(),
			isVideo: V(),
			originalUrl: L(),
			size: B(),
			thumbnail_size: B(),
			genParams: z(L(), it()).nullable().optional(),
			data_base64: L().optional()
		})),
		index: B(),
		change: L()
	})).default({}),
	banana: vv.default(yv),
	bananaCharacterPresets: z(L(), _v).default({}),
	bananaCharacterPresetId: L().default(""),
	gestureEnabled: V().default(!1),
	clickTriggerEnabled: V().default(!0),
	gesture1: R(L()).default([]),
	gesture2: R(L()).default([]),
	gestureShowRecognition: V().default(!0),
	gestureShowTrail: V().default(!0),
	gestureTrailColor: L().default("#00ff00"),
	gestureMatchThreshold: B().default(60),
	defaultCharDemand: L().default(""),
	defaultImageDemand: L().default(""),
	novelai_profiles: z(L(), ov).default({}),
	novelai_profile_id: L().default(""),
	comfyui_profiles: z(L(), sv).default({}),
	comfyui_profile_id: L().default(""),
	worldBookConfig: Ev.optional(),
	personaProfiles: kv.optional()
}), Nv = H({
	uuid: L().min(1),
	path: L().optional(),
	thumbnail_uuid: L().min(1).optional(),
	thumbnail_path: L().optional(),
	date: B().int().nonnegative(),
	isVideo: V(),
	originalUrl: L(),
	size: B().int().nonnegative(),
	thumbnail_size: B().int().nonnegative(),
	genParams: z(L(), it()).nullable().optional(),
	data_base64: L().min(1).optional()
}), Pv = H({
	images: R(Nv),
	index: B().int().nonnegative(),
	change: L()
}), Fv = H({
	id_index: L().min(1),
	fileName: L().min(1),
	name: L().min(1)
}), Iv = H({
	fileName: L().min(1),
	name: L().min(1),
	hot: B().int().optional()
}), Lv = H({
	id: L().min(1),
	data_base64: L().min(1),
	date: B().int().nonnegative()
}), Rv = H({
	tupianhuancun_metadata: z(L(), Pv),
	tupianhuancun_blobs: z(L(), L().min(1)),
	groups: R(Fv),
	subgroups: R(Fv),
	tags: R(Iv),
	config_images: R(Lv)
}), zv = H({
	tag: L().min(1),
	regex: L().optional(),
	locked: V().optional()
}), Bv = H({
	chat_id: L().min(1),
	message_id: B().int().nonnegative(),
	role: F([
		"user",
		"assistant",
		"system"
	]),
	mes: L(),
	swipe_id: B().int().nonnegative().nullable(),
	extra: H({
		images: z(L(), R(zv)).optional(),
		lockedTags: R(L()).optional()
	}).optional()
});
H({ messages: R(Bv) }), H({
	chatu8_uid: L().optional(),
	migration_flags: z(L(), L())
});
//#endregion
//#region src/storage/active_namespace.ts
var Vv = /* @__PURE__ */ new Set(["import_ready", "ready_to_switch"]);
async function Hv(e, t, n) {
	let r = await n.with_marker_transaction(t, (e) => e.get_marker());
	if (r === null) throw Error(`Namespace marker is missing for namespace "${t}"`);
	if (r.namespace !== t) throw Error(`Namespace marker belongs to "${r.namespace}", expected "${t}"`);
	if (!Vv.has(r.state)) throw Error(`Namespace "${t}" is not ready to switch (state: "${r.state}")`);
	let i = e.get_settings().active_namespace;
	e.update_settings({ active_namespace: t });
	try {
		await e.flush();
	} catch (t) {
		throw e.update_settings({ active_namespace: i }), t;
	}
	return t;
}
//#endregion
//#region src/migration/legacy_sources.ts
var Uv = 10;
function Wv(e) {
	return [...new Set(e.issues.map((e) => e.path.length > 0 ? e.path.join(".") : "(root)"))].slice(0, Uv).join(", ");
}
function Gv(e, t) {
	return {
		jiuguan_image_count: Object.values(e.jiuguanStorage).reduce((e, t) => e + t.images.length, 0),
		gallery_image_count: Object.values(t?.tupianhuancun_metadata ?? {}).reduce((e, t) => e + t.images.length, 0),
		config_image_count: t?.config_images.length ?? 0
	};
}
async function Kv(e) {
	let t = await e.read_settings();
	if (t == null) return { kind: "absent" };
	let n = await e.read_gallery_database(), r = b_(JSON.stringify({
		settings: t,
		gallery: n ?? null
	})), i = Q_(t);
	if (i.unknown.length > 0) return {
		kind: "unknown_paths",
		fingerprint: r,
		paths: i.unknown
	};
	if (!i.classified.some((e) => e.rule.classification === "mapped")) return {
		kind: "invalid",
		fingerprint: r,
		message: "Legacy settings classify to zero mapped v2 data paths; refusing to treat an effectively-empty object as a real v2 install"
	};
	let a = Mv.safeParse(t);
	if (!a.success) return {
		kind: "invalid",
		fingerprint: r,
		message: `Legacy settings failed schema validation: ${Wv(a.error)}`
	};
	let o;
	if (n != null) {
		let e = Rv.safeParse(n);
		if (!e.success) return {
			kind: "invalid",
			fingerprint: r,
			message: `Legacy gallery database failed schema validation: ${Wv(e.error)}`
		};
		o = e.data;
	}
	let s = a.data;
	return {
		kind: "present",
		settings: s,
		gallery: o,
		fingerprint: r,
		inventory: Gv(s, o)
	};
}
function qv(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
function Jv(e, t) {
	let n = /* @__PURE__ */ new Map(), r = (e) => {
		if (e === void 0) return;
		let t = qv(e);
		n.set(x_(t), t);
	};
	for (let t of Object.values(e.jiuguanStorage)) for (let e of t.images) r(e.data_base64);
	for (let e of Object.values(t?.tupianhuancun_metadata ?? {})) for (let n of e.images) r(n.data_base64 ?? t?.tupianhuancun_blobs[n.uuid]);
	for (let e of t?.config_images ?? []) r(e.data_base64);
	return n;
}
function Yv(e) {
	let t = "";
	for (let n of e) t += String.fromCharCode(n);
	return btoa(t);
}
async function Xv(e, t) {
	let n = Object.entries(e.jiuguanStorage);
	if (n.length === 0) return e;
	let r = {};
	for (let [e, i] of n) {
		let n = await Promise.all(i.images.map(async (e) => {
			if (e.data_base64 !== void 0) return e;
			let n = await t.resolve_host_image(e.path);
			return n === null ? e : {
				...e,
				data_base64: Yv(n)
			};
		}));
		r[e] = {
			...i,
			images: n
		};
	}
	return {
		...e,
		jiuguanStorage: r
	};
}
//#endregion
//#region src/migration/secret_transfer.ts
function Zv(e, t, n) {
	return `tavern_canvas:${e}:${t}:${n}`;
}
async function Qv(e, t, n) {
	let r = {
		credential_kind: e.credential_kind,
		provider_profile_id: e.provider_profile_id,
		source_path: e.source_path
	};
	if (n === null || !n.supports(e.credential_kind)) return {
		...r,
		status: "blocked",
		reason: "no_supported_destination"
	};
	let i = Zv(t, e.provider_profile_id, e.credential_kind);
	try {
		await n.write_secret(i, e.plaintext_value);
	} catch {
		return {
			...r,
			status: "blocked",
			reason: "write_failed"
		};
	}
	return await n.probe_secret(i).catch(() => !1) ? {
		...r,
		status: "transferred",
		reference: i
	} : {
		...r,
		status: "blocked",
		reason: "probe_failed"
	};
}
async function $v(e, t, n) {
	let r = [];
	for (let i of e) r.push(await Qv(i, t, n));
	return {
		records: r,
		blocked: r.some((e) => e.status === "blocked")
	};
}
//#endregion
//#region src/migration/migration_runner.ts
var ey = class extends Error {
	reason;
	step;
	constructor(e, t, n) {
		super(t), this.name = "ExpectedMigrationFailure", this.reason = e, this.step = n;
	}
}, ty = {
	novelai: (e) => e.novelai_profile_id,
	comfyui: (e) => e.comfyui_profile_id,
	llm: (e) => e.current_llm_profile
};
function ny(e, t, n) {
	if (e.mode === "banana") {
		let e = Q(`${t}:provider_converter:openai_image:banana`);
		return n.some((t) => t.id === e) ? e : null;
	}
	let r = ty[e.mode]?.(e);
	if (r == null) return null;
	let i = Q(`${t}:provider_converter:${e.mode}:${r}`);
	return n.some((e) => e.id === i) ? i : null;
}
function ry(e, t, n, r) {
	let i = {
		namespace: n,
		migrated_at: r
	}, a = N_(e, i), o = L_(e, i), s = B_(e, i), c = U_(e, t, i), l = G_(e, i), u = q_(e, i), d = Z_(e, t, i), f = ny(e, n, o.records), p = [
		...a.warnings,
		...o.warnings,
		...s.warnings,
		...c.warnings,
		...l.warnings,
		...u.warnings,
		...d.warnings
	];
	return {
		settings: {
			...a.settings,
			active_provider_profile_id: f
		},
		legacy_preferences_id: a.legacy_preferences.id,
		legacy_preferences_payload: a.legacy_preferences.payload,
		provider_profiles: o.records,
		secret_transfers: o.secret_transfers,
		prompt_presets: s.prompt_presets,
		regex_rules: s.regex_rules,
		comfy_workflows: c.comfy_workflows,
		novelai_vibes: c.novelai_vibes,
		character_profiles: l.character_profiles,
		knowledge_entries: u.knowledge_entries,
		asset_image_records: c.image_records,
		gallery_image_records: d.image_records,
		vocabularies: d.vocabularies,
		vocabulary_groups: d.vocabulary_groups,
		warnings: p
	};
}
async function iy(e, t, n, r, i) {
	let a = await t.image_records.get(n, r.id, e) !== null;
	if (await t.image_records.put(n, r, e), a) return;
	let o = i.get(r.sha256);
	if (o === void 0) throw new ey("missing_blob", `No resolved bytes for image ${r.id} (sha256 ${r.sha256})`, "assets_gallery");
	let s = await t.image_blobs.get(r.sha256, e);
	if (s === null) {
		let n = bd(o), i = new Uint8Array(o), a = {
			sha256: r.sha256,
			ref_count: 1,
			byte_length: o.byteLength,
			blob: n === void 0 ? new Blob([i]) : new Blob([i], { type: n })
		};
		await t.image_blobs.create(a, e);
		return;
	}
	await t.image_blobs.update({
		...s,
		ref_count: s.ref_count + 1
	}, e);
}
var ay = [
	"provider",
	"secrets",
	"prompts",
	"assets",
	"characters",
	"knowledge",
	"gallery",
	"settings"
];
async function oy(e, t) {
	let { database: n, namespace: r, plan: i, bytes_by_sha256: a, migrated_at: o } = t, s = Ud(n);
	switch (e) {
		case "provider": return td(n, ["provider_profiles"], async (e) => {
			for (let t of i.provider_profiles) await s.provider_profiles.put(r, t, e);
			return i.provider_profiles.length;
		});
		case "secrets": {
			if (t.settings.get_settings().gateway.endpoint !== null) return 0;
			let e = await $v(i.secret_transfers, r, t.secret_destination), n = e.records.find((e) => e.status === "blocked");
			if (n !== void 0) throw new ey("secret_transfer_blocked", `Secret transfer blocked for credential "${n.credential_kind}" (${n.reason}); configure SillyTavern secret storage or a Gateway profile and retry`, "secrets");
			return e.records.length;
		}
		case "prompts": return td(n, ["prompt_presets", "regex_rules"], async (e) => {
			for (let t of i.prompt_presets) await s.prompt_presets.put(r, t, e);
			for (let t of i.regex_rules) await s.regex_rules.put(r, t, e);
			return i.prompt_presets.length + i.regex_rules.length;
		});
		case "assets": return td(n, [
			"comfy_workflows",
			"novelai_vibes",
			"image_records",
			"image_blobs"
		], async (e) => {
			for (let t of i.comfy_workflows) await s.comfy_workflows.put(r, t, e);
			for (let t of i.novelai_vibes) await s.novelai_vibes.put(r, t, e);
			for (let t of i.asset_image_records) await iy(e, s, r, t, a);
			return i.comfy_workflows.length + i.novelai_vibes.length + i.asset_image_records.length;
		});
		case "characters": return td(n, ["character_profiles"], async (e) => {
			for (let t of i.character_profiles) await s.character_profiles.put(r, t, e);
			return i.character_profiles.length;
		});
		case "knowledge": return td(n, ["knowledge_entries"], async (e) => {
			for (let t of i.knowledge_entries) await s.knowledge_entries.put(r, t, e);
			return i.knowledge_entries.length;
		});
		case "gallery": return td(n, [
			"image_records",
			"image_blobs",
			"vocabularies",
			"vocabulary_groups"
		], async (e) => {
			for (let t of i.gallery_image_records) await iy(e, s, r, t, a);
			for (let t of i.vocabularies) await s.vocabularies.put(r, t, e);
			for (let t of i.vocabulary_groups) await s.vocabulary_groups.put(r, t, e);
			return i.gallery_image_records.length + i.vocabularies.length + i.vocabulary_groups.length;
		});
		case "settings": return td(n, ["legacy_preferences"], async (e) => (await s.legacy_preferences.put(r, {
			schema_version: 1,
			id: i.legacy_preferences_id,
			namespace: r,
			record_key: `${r}:${i.legacy_preferences_id}`,
			created_at: o,
			updated_at: o,
			payload: yu(i.legacy_preferences_payload)
		}, e), 1));
	}
}
async function sy(e, t, n, r) {
	let i = Ud(e), a = {
		provider_profiles: n.provider_profiles.length,
		prompt_presets: n.prompt_presets.length,
		regex_rules: n.regex_rules.length,
		comfy_workflows: n.comfy_workflows.length,
		novelai_vibes: n.novelai_vibes.length,
		character_profiles: n.character_profiles.length,
		knowledge_entries: n.knowledge_entries.length,
		image_records: n.asset_image_records.length + n.gallery_image_records.length,
		vocabularies: n.vocabularies.length,
		vocabulary_groups: n.vocabulary_groups.length,
		legacy_preferences: 1
	};
	for (let [e, n] of Object.entries(a)) {
		let r = (await i[e].list(t)).length;
		if (r !== n) throw new ey("count_mismatch", `Expected ${String(n)} record(s) in ${e}, found ${String(r)}`, "verifying");
	}
	if (n.asset_image_records.length !== r.config_image_count) throw new ey("count_mismatch", `Expected ${String(r.config_image_count)} config image record(s) per source inventory, converter produced ${String(n.asset_image_records.length)}`, "verifying");
	let o = r.jiuguan_image_count + r.gallery_image_count;
	if (n.gallery_image_records.length !== o) throw new ey("missing_blob", `Expected ${String(o)} gallery image record(s) per source inventory (jiuguan ${String(r.jiuguan_image_count)} + gallery ${String(r.gallery_image_count)}), converter produced ${String(n.gallery_image_records.length)}; some legacy images likely had no resolved bytes`, "verifying");
	let s = [...new Set([...n.asset_image_records, ...n.gallery_image_records].map((e) => e.sha256))];
	for (let e of s) {
		let t = await i.image_blobs.get(e);
		if (t === null) throw new ey("missing_blob", `Missing image_blobs entry for ${e}`, "verifying");
		if (x_(t.blob instanceof Blob ? new Uint8Array(await t.blob.arrayBuffer()) : new Uint8Array(t.blob)) !== e) throw new ey("hash_mismatch", `Stored blob ${e} no longer hashes to its key`, "verifying");
	}
	return s;
}
async function cy(e) {
	let { database: t, settings: n, legacy_source: r, image_resolver: i, secret_destination: a } = e, o = e.migrated_at ?? (/* @__PURE__ */ new Date()).toISOString(), s = s_(t), c = await Kv(r);
	if (c.kind === "absent") return await s.save(t_, {
		state: "not_required",
		checked_at: o
	}, o), { status: "not_required" };
	let l = `${e_}${Q(c.fingerprint)}`, u = await s.load(l);
	if (u !== null && u.payload.state === "completed") return {
		status: "completed",
		namespace: l,
		counts: u.payload.counts
	};
	let d = u !== null && u.payload.state !== "not_required" ? u.payload.started_at : o, f = new Set(u !== null && u.payload.state !== "not_required" ? u.payload.completed_batches : []), p = { ...u !== null && u.payload.state !== "not_required" ? u.payload.counts : {} }, m = null, h = u !== null && u.payload.state !== "not_required" ? u.payload.image_hashes : [], g = (e) => s.save(l, {
		state: e,
		source_fingerprint: c.fingerprint,
		staging_namespace: l,
		started_at: d,
		completed_batches: [...f],
		counts: { ...p },
		image_hashes: [...h],
		warnings: m === null ? [] : [...m.warnings]
	}, (/* @__PURE__ */ new Date()).toISOString()), _ = (e) => s.save(l, {
		state: "failed",
		source_fingerprint: c.fingerprint,
		staging_namespace: l,
		started_at: d,
		completed_batches: [...f],
		counts: { ...p },
		image_hashes: [...h],
		warnings: m === null ? [] : [...m.warnings],
		failure: e
	}, (/* @__PURE__ */ new Date()).toISOString());
	if (u === null && await g("inventory"), c.kind === "unknown_paths") {
		let e = {
			reason: "unknown_setting_path",
			message: `Unclassified v2 settings path(s): ${c.paths.join(", ")}`,
			step: "inventory"
		};
		return await _(e), {
			status: "failed",
			namespace: l,
			failure: e
		};
	}
	if (c.kind === "invalid") {
		let e = {
			reason: "invalid_source",
			message: c.message,
			step: "inventory"
		};
		return await _(e), {
			status: "failed",
			namespace: l,
			failure: e
		};
	}
	try {
		let e = await Xv(c.settings, i);
		try {
			m = ry(e, c.gallery, l, o);
		} catch (e) {
			throw e instanceof ey ? e : new ey("converter_error", e instanceof Error ? e.message : String(e), "convert");
		}
		let r = Jv(e, c.gallery);
		await g("copying");
		for (let e of ay) {
			if (f.has(e)) continue;
			let i = await oy(e, {
				database: t,
				namespace: l,
				plan: m,
				bytes_by_sha256: r,
				migrated_at: o,
				settings: n,
				secret_destination: a
			});
			f.add(e), p[e] = i, await g("copying");
		}
		await g("verifying"), h = await sy(t, l, m, c.inventory), await g("ready_to_switch");
		try {
			await Hv(n, l, c_(t));
		} catch (e) {
			throw new ey("switch_failed", e instanceof Error ? e.message : String(e), "switch");
		}
		try {
			let { schema_version: e, active_namespace: t, gateway: r, ...i } = m.settings;
			n.update_settings(i);
		} catch {}
		return await g("completed"), {
			status: "completed",
			namespace: l,
			counts: p
		};
	} catch (e) {
		if (!(e instanceof ey)) throw e;
		let t = {
			reason: e.reason,
			message: e.message,
			step: e.step
		};
		return await _(t), {
			status: "failed",
			namespace: l,
			failure: t
		};
	}
}
//#endregion
//#region src/bootstrap/capabilities/migration_capability.ts
var ly = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
};
function uy(e) {
	let t = new pg(), n = s_(e.database);
	async function r() {
		if (await n.load("migration:not_required") !== null) return ly;
		let e = await i();
		if (e === null) return ly;
		let t = ag(e.payload), r = ag(t.counts);
		return {
			state: e.state,
			counts: Object.fromEntries(Object.keys(r).map((e) => [e, ug(r, e, 0)])),
			warnings: dg(t, "warnings").flatMap((e) => {
				let t = ag(e).message;
				return typeof t == "string" ? [t] : [];
			}),
			failure_reason: typeof ag(t.failure).reason == "string" ? String(ag(t.failure).reason) : null,
			failure_message: typeof ag(t.failure).message == "string" ? String(ag(t.failure).message) : null
		};
	}
	async function i() {
		let t = (await e.database.getAll("migration_journal")).filter((e) => e.migration_id.startsWith(e_)).filter((e) => e.migration_id !== t_).sort((e, t) => e.updated_at < t.updated_at ? 1 : -1)[0];
		return t === void 0 ? null : {
			state: t.state,
			payload: t.payload
		};
	}
	return {
		load: r,
		subscribe: (e) => t.subscribe(e),
		async retry() {
			await cy({
				database: e.database,
				settings: e.settings,
				legacy_source: e.legacy_source,
				image_resolver: e.image_resolver,
				secret_destination: e.secrets
			});
			let n = await r();
			return t.emit({
				type: "state_changed",
				snapshot: n
			}), n;
		},
		confirm_legacy_cleanup() {
			return Promise.reject(ig("Legacy v2 data cleanup is not implemented; remove the v2 extension manually once the migration reports completed."));
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/profiles_capability.ts
var dy = "vault_key", fy = "provider_profile";
function py(e) {
	return {
		...ag(og(e)[fy]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function my(e) {
	let t = og(e);
	return {
		id: e.id,
		provider_id: fe.parse(e.provider_id),
		display_name: sg(t, "display_name", e.id),
		is_default: lg(t, "is_default", !1),
		updated_at: e.updated_at
	};
}
function hy(e) {
	let t = new pg();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw ig(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(my);
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				schema_version: 1,
				id: n.id,
				namespace: r,
				record_key: `${r}:${n.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: n.provider_id,
				payload: {
					...og(i ?? { payload: {} }),
					display_name: n.display_name,
					is_default: n.is_default,
					...n.secret_reference === null ? {} : { [dy]: n.secret_reference }
				}
			};
			await e.repository.put(r, o);
			let s = my(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async remove(n) {
			await e.repository.delete(e.namespace(), n), t.emit({
				type: "profile_removed",
				profile_id: n
			});
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = fe.parse(i.provider_id), o = e.adapters[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(py(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof q ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = og(i)[dy];
			return typeof s == "string" && e.secrets !== null && !await e.secrets.probe_secret(s) ? {
				status: "failed",
				error: {
					code: "auth_failed",
					retryable: !1
				}
			} : {
				status: "success",
				latency_ms: Date.now() - r
			};
		}
	};
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function gy(e, t) {
	try {
		let n = new RegExp(t.pattern, t.flags);
		return {
			text: e.replace(n, t.replacement),
			error: null
		};
	} catch (t) {
		return {
			text: e,
			error: t instanceof Error ? t.message : String(t)
		};
	}
}
function _y(e, t) {
	return gy(t, e).text;
}
//#endregion
//#region src/bootstrap/capabilities/prompt_presets_capability.ts
function vy(e) {
	let t = og(e);
	return {
		id: e.id,
		display_name: sg(t, "display_name", e.id),
		group: cg(t, "group"),
		updated_at: e.updated_at
	};
}
function yy(e) {
	return e.flatMap((e) => {
		let t = ag(e), n = cg(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: dg(t, "triggers").filter((e) => typeof e == "string"),
			replacement: sg(t, "replacement", "")
		}];
	});
}
function by(e) {
	return e.flatMap((e) => {
		let t = ag(e), n = cg(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: sg(t, "pattern", ""),
			flags: sg(t, "flags", ""),
			replacement: sg(t, "replacement", "")
		}];
	});
}
function xy(e) {
	let t = new pg();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(vy);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw ig(`Prompt preset ${t} no longer exists`);
			let r = og(n);
			return {
				id: n.id,
				display_name: sg(r, "display_name", n.id),
				group: cg(r, "group"),
				fixed_positive_prompt: sg(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: sg(r, "fixed_negative_prompt", ""),
				replacement_rules: yy(dg(r, "replacement_rules")),
				regex_rules: by(dg(r, "regex_rules"))
			};
		},
		async save_draft(n) {
			let r = e.namespace(), i = n.id ?? e.new_id(), a = await e.repository.get(r, i), o = e.now(), s = {
				schema_version: 1,
				id: i,
				namespace: r,
				record_key: `${r}:${i}`,
				created_at: a?.created_at ?? o,
				updated_at: o,
				payload: fg({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = vy(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(_y(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var Sy = class {
	#e = "bundled";
	get() {
		return this.#e;
	}
	set(e) {
		this.#e = e;
	}
};
function Cy(e) {
	if (e === null) throw ig("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function wy(e) {
	let t = new pg();
	function n() {
		return {
			settings: e.settings.get_settings(),
			vocabulary_update_channel: e.vocabulary_channel.get()
		};
	}
	function r(n) {
		let r = e.settings.update_settings(n);
		return t.emit({
			type: "settings_changed",
			settings: r
		}), r;
	}
	return {
		load: () => Promise.resolve(n()),
		subscribe: (e) => t.subscribe(e),
		update: (e) => Promise.resolve(r(e)),
		acknowledge_http_origin(t) {
			let n = e.settings.get_settings();
			return r({ gateway: {
				...n.gateway,
				http_acknowledgments: lt(n.gateway.http_acknowledgments, t, (/* @__PURE__ */ new Date()).toISOString())
			} }), e.settings.flush();
		},
		set_vocabulary_update_channel(t) {
			return e.vocabulary_channel.set(t), Promise.resolve();
		},
		export_archive: () => Df({
			database: Cy(e.database),
			namespace: e.settings.get_settings().active_namespace,
			extension_version: e.extension_version
		}),
		async import_archive(t) {
			await Wf({
				database: Cy(e.database),
				archive: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function Ty(e) {
	switch (e.phase) {
		case "verifying_catalog_manifest": return { phase: "verifying_catalog_manifest" };
		case "downloading": return {
			phase: "downloading",
			received_bytes: e.received_bytes ?? 0,
			total_bytes: e.total_bytes ?? 0
		};
		case "verifying_package": return { phase: "verifying_package" };
		case "installing": return { phase: "installing" };
		default: return null;
	}
}
function Ey(e) {
	let t = null;
	function n() {
		return t ??= e.create_client(), t;
	}
	function r() {
		t?.dispose(), t = null;
	}
	return {
		load: () => e.catalog.list(),
		search: (e, t) => n().search(e, t === void 0 ? {} : { category: t }),
		next_page: (e) => n().next_page(e),
		async install(t, n) {
			await e.catalog.install(t, (e) => {
				let t = Ty(e);
				t !== null && n?.(t);
			}), r();
		},
		cancel_install: () => {
			e.catalog.cancel();
		}
	};
}
//#endregion
//#region src/host/composite_host.ts
var Dy = class {
	capabilities;
	#e;
	#t;
	constructor(e, t, n) {
		this.capabilities = e, this.#e = t, this.#t = n;
	}
	get_locale() {
		return this.#t.get_locale();
	}
	get_active_chat() {
		return this.#e.get_active_chat();
	}
	subscribe_generation(e) {
		return this.#t.subscribe_generation(e);
	}
	subscribe_generation_chunk(e) {
		return this.#t.subscribe_generation_chunk(e);
	}
	subscribe_chat_change(e) {
		return this.#t.subscribe_chat_change(e);
	}
	subscribe_message_swiped(e) {
		return this.#t.subscribe_message_swiped(e);
	}
	register_image_tool(e) {
		return this.#t.register_image_tool(e);
	}
	generate_private_prompt(e) {
		return this.#e.generate_private_prompt(e);
	}
	update_message(e) {
		return this.#e.update_message(e);
	}
	upload_image(e) {
		return this.#t.upload_image(e);
	}
};
function Oy(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function ky(e) {
	let t = Oy(e, "SillyTavern"), n = Oy(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Ay(e, t) {
	let n = Oy(e, "TavernHelper"), r = Oy(e, "fetch"), i = ky(e), a = Vr(n), o = mr(Oy(e, "SillyTavern"), r);
	if (!a.detected || !a.message_swipe_metadata || !o.main_generation_events || i === void 0 || typeof r != "function") return null;
	let s = new yr(i, r);
	return new Dy(t, new Xr(n, () => s.get_active_chat_id()), s);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function jy(e) {
	return typeof e == "object" && !!e;
}
function My(e, t) {
	if (!jy(e)) return !1;
	let n = e[t];
	return Array.isArray(n) ? n.some((e) => jy(e) && e.active === !0) : !1;
}
var Ny = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: vr(this.#e.getRequestHeaders()),
			body: JSON.stringify({
				key: e,
				value: t,
				label: "TavernCanvas migrated credential"
			})
		});
		if (!n.ok) throw Error(`SillyTavern secret write failed with status ${String(n.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/read", {
			method: "POST",
			headers: vr(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return My(n, e);
	}
};
function Py(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Fy(e, t) {
	return !Py(e) || typeof t != "function" ? null : new Ny(e, t);
}
//#endregion
//#region src/host/sillytavern_secret_resolver.ts
var Iy = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, Ly = "SillyTavern refused to reveal the stored credential. Set allowKeysExposure to true in config.yaml to allow direct provider calls, or route this profile through the Gateway instead.", Ry = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve_secret(e) {
		if (!Ce.safeParse(e).success) throw new Iy("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/find", {
				method: "POST",
				headers: vr(this.#e.getRequestHeaders()),
				body: JSON.stringify({ key: e })
			});
		} catch {
			throw new Iy("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new Iy("not_exposed", Ly) : t.status === 404 ? new Iy("not_found", "The host vault holds no such credential") : new Iy("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new Iy("unavailable", "The host secret vault returned an unreadable response");
		}
		let r = typeof n == "object" && n ? n.value : void 0;
		if (typeof r != "string" || r.trim().length === 0) throw new Iy("not_found", "The host vault holds no such credential");
		return r;
	}
};
function zy(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function By(e, t) {
	return !zy(e) || typeof t != "function" ? null : new Ry(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
var Vy = "st-chatu8";
function Hy(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Uy(e) {
	let t = Hy(e, "SillyTavern"), n = Hy(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Wy(e) {
	let t = Uy(e), n = Hy(t, "extensionSettings"), r = Hy(t, "saveSettingsDebounced");
	return typeof n != "object" || !n || typeof r != "function" ? null : {
		extension_settings: n,
		save_settings: () => {
			Reflect.apply(r, t, []);
		},
		scheduler: { schedule(e) {
			queueMicrotask(() => {
				e();
			});
		} }
	};
}
function Gy(e) {
	return Fy(Uy(e), Hy(e, "fetch"));
}
function Ky(e) {
	return By(Uy(e), Hy(e, "fetch"));
}
function qy(e) {
	let t = Wy(e);
	return t === null ? null : {
		read_settings: () => Promise.resolve(t.extension_settings[Vy]),
		read_gallery_database: () => Promise.resolve(void 0)
	};
}
var Jy = { resolve_host_image: () => Promise.resolve(null) };
function Yy(e, t) {
	return Ay(e, t);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var Xy = "IndexedDB could not be opened, so nothing that persists records can be composed", Zy = "No usable SillyTavern + TavernHelper host pair was detected", Qy = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", $y = "This host exposes no secret vault that both stores and reveals a credential, so a text-LLM connection could not be authenticated";
function eb() {
	return navigator.storage.estimate();
}
function tb() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"/workers/vocabulary_worker.js",
		"" + import.meta.url
	), { type: "module" });
}
function nb(e) {
	let t = {
		novelai: new Xc(),
		sd_webui: new Ml(),
		openai_image: new il(),
		google_image: new wc()
	};
	if (e !== null) {
		let n = Ud(e);
		t.comfyui = new sc({ workflow_store: { async load(e) {
			return (await n.comfy_workflows.get("primary", e))?.payload;
		} } });
	}
	return t;
}
function rb(e, t) {
	let n = new qd(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await af(e, i.sha256);
		if (a === null) throw Error(`Source asset ${r} has no stored bytes`);
		if (i.media_type === "video/mp4") throw Error(`Source asset ${r} is a video and cannot be a provider input`);
		return {
			asset_id: r,
			media_type: i.media_type,
			bytes: a
		};
	} };
}
function ib(e) {
	return ud.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function ab(e, t) {
	return {
		async put_image(n) {
			return { id: (await nf(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: ib(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new qd(e).get(t(), n);
			if (r === null) return null;
			let i = await af(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
async function ob(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = hi(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(ng(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(ig(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = Yy(t, s), l = [], u = s.tauri_chat_surface?.available === !0 ? new qf() : new Kf();
	u instanceof qf && l.push(new vp({
		globals: t,
		port: u
	}));
	let d = null;
	try {
		d = await (e.open_storage ?? ed)();
	} catch {
		d = null;
	}
	let f = Wy(t), p = new Sy(), m = f === null ? null : Mh(f), h = () => m?.get_settings().active_namespace ?? "primary", g = () => (/* @__PURE__ */ new Date()).toISOString(), _ = Gy(t), v = Ky(t), y = d === null ? null : Ud(d), b = new xg(), x = nb(d), S = y === null || m === null ? null : await y.provider_profiles.get(h(), m.get_settings().active_provider_profile_id ?? "").catch(() => null), C = S === null ? {} : og(S), w = cg(C, "base_url"), T = S === null ? null : fe.safeParse(S.provider_id).data ?? null, E = T === null ? null : {
		provider_id: T,
		credential_reference: cg(C, dy),
		secrets_readable: v !== null
	}, D = o("settings", m === null ? $h(Qy) : eg(() => wy({
		settings: m,
		database: d,
		extension_version: n,
		vocabulary_channel: p
	})), r.settings), ee = o("profiles", y === null ? $h(Xy) : eg(() => hy({
		repository: y.provider_profiles,
		namespace: h,
		adapters: x,
		secrets: _,
		now: g
	})), r.profiles), te = o("llm_connections", y === null ? $h(Xy) : _ === null || v === null ? $h($y) : eg(() => Zg({
		repository: y.llm_connections,
		namespace: h(),
		secrets: _,
		transport: new Hh({
			secrets: v,
			...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
		}),
		clock: g
	})), r.llm_connections), ne = o("personas", y === null ? $h(Xy) : eg(() => Qg({
		repository: y.character_profiles,
		namespace: h(),
		clock: g
	})), r.personas), O = o("knowledge", y === null ? $h(Xy) : eg(() => $g({
		repository: y.knowledge_entries,
		namespace: h(),
		clock: g
	})), r.knowledge), k = o("prompt_presets", y === null ? $h(Xy) : eg(() => xy({
		repository: y.prompt_presets,
		namespace: h,
		now: g,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), re = o("assets", y === null ? $h(Xy) : eg(() => yg({
		repositories: y,
		namespace: h,
		now: g
	})), r.assets), A = o("gallery", d === null ? $h(Xy) : eg(() => Eg({
		database: d,
		repository: new qd(d),
		namespace: h,
		now: g
	})), r.gallery), ie = o("generation", d === null ? $h(Xy) : c === null ? $h(Zy) : eg(() => {
		let t = sb({
			gateway_endpoint: m?.get_settings().gateway.endpoint ?? null,
			http_acknowledgments: m?.get_settings().gateway.http_acknowledgments ?? {},
			tauri_provider_available: !1,
			sillytavern_available: !1,
			direct_provider_base_url: w,
			direct_cloud: E
		}, {
			secrets: v,
			...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
		}), n = new op(), r = new $n({
			executor: new cp({
				adapters: x,
				profiles: { resolve: (e) => {
					let t = x[e];
					if (t === void 0 || S === null) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(py(S));
				} },
				transport: t,
				assets: rb(d, h),
				log: { write: () => {} },
				plans: n,
				store: ab(d, h),
				ids: { next: () => crypto.randomUUID() },
				clock: { now: g },
				resolve_source_message: (e) => ({
					chat_id: e.chat_id,
					message_id: String(e.requested_swipe_id),
					swipe_id: e.requested_swipe_id
				})
			}),
			persistence: new ap(d, h()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new Hn(),
			global_concurrency: m?.get_settings().global_concurrency ?? 1
		});
		if (a.push(b.observe_jobs(r)), e.message_port != null) {
			let t = new rr(r, e.message_port);
			t.start(), a.push(() => {
				t.stop();
			});
		}
		let i = new Bn();
		return Ag({
			queue: r,
			plans: n,
			jobs: Ud(d).generation_jobs,
			namespace: h,
			origin: new Mg(c, new In(globalThis.crypto)),
			new_request_id: () => i.next()
		});
	}), r.generation), ae = e.create_vocabulary_worker === void 0 ? tb() : e.create_vocabulary_worker, oe = o("vocabulary", d === null ? $h(Xy) : ae === null ? $h("This host has no Worker constructor, so vocabulary search cannot run") : eg(() => Ey({
		catalog: new dh({
			current_extension_version: n,
			open_database_impl: () => Promise.resolve(d)
		}),
		create_client: () => new hh({ create_worker: ae })
	})), r.vocabulary), se = o("migration", d === null ? $h(Xy) : m === null ? $h(Qy) : eg(() => {
		let e = qy(t);
		if (e === null) throw Error(Qy);
		return uy({
			database: d,
			settings: m,
			legacy_source: e,
			image_resolver: Jy,
			secrets: _
		});
	}), r.migration);
	return {
		capabilities: {
			generation: ie,
			profiles: ee,
			prompt_presets: k,
			assets: re,
			gallery: A,
			vocabulary: oe,
			diagnostics: o("diagnostics", eg(() => Cg({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: b,
				resolutions: () => i,
				settings: () => m?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? eb,
				extension_version: n,
				probe_gateway: null
			})), r.diagnostics),
			migration: se,
			settings: D,
			llm_connections: te,
			personas: ne,
			knowledge: O
		},
		resolutions: i,
		host: c,
		chat_media: u,
		modules: l,
		async dispose() {
			for (let e of [...a].reverse()) try {
				await e();
			} catch {}
			await m?.stop();
		}
	};
}
function sb(e, t = { secrets: null }) {
	let n = Yh(e), r = t.fetch;
	switch (n.kind) {
		case "direct_cloud": {
			let e = Oe(n.provider_id);
			if (e === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${n.provider_id}`);
			return new Vh({
				catalog_entry: e,
				credential_reference: n.credential_reference,
				secrets: t.secrets,
				...r === void 0 ? {} : { fetch: r }
			});
		}
		case "local_direct": return new qh({
			base_url: n.endpoint,
			...r === void 0 ? {} : { fetch: r }
		});
		default: throw Error(`The selected ${n.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`);
	}
}
//#endregion
//#region src/bootstrap/startup_error.ts
var cb = "https://github.com/N0VI028/JS-Slash-Runner";
function lb(e) {
	if (e.ready) return {
		state: "ready",
		title: "TavernCanvas ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${Zr} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: cb
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `TavernCanvas could not verify the installed version. ${t}`,
			update_url: cb
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: cb
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: cb
		};
	}
}
function ub() {
	return {
		state: "failed",
		title: "TavernCanvas could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function db(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = ci(n), i, a, o = null, s = !1;
	try {
		o = await ob({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new cn([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = lb(r);
	else if (s) i = "failed", a = ub();
	else try {
		await c?.start_all(), i = "ready", a = lb(r);
	} catch {
		i = "failed", a = ub();
	}
	let l = as(t, e.stylesheet ?? ""), u = gt(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = ie(is, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities
	});
	f.use(u.i18n), f.onUnmount(() => {
		l.remove();
	});
	try {
		f.mount(l.app_element);
	} catch (e) {
		throw l.remove(), await c?.stop_all(), e;
	}
	let p = !1;
	return {
		state: i,
		probe: r,
		resolutions: o?.resolutions ?? [],
		async dispose() {
			if (p) return;
			p = !0;
			let t = [];
			try {
				f.unmount();
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
			l.remove();
			try {
				await o?.dispose();
			} catch (e) {
				t.push(e);
			}
			try {
				await c?.stop_all();
			} catch (e) {
				t.push(e);
			}
			if (t.length > 0) throw AggregateError(t, "TavernCanvas cleanup failed");
		}
	};
}
//#endregion
//#region src/ui/styles/tokens.css?inline
var fb = ":host{--tc-canvas:#f4f5f7;--tc-surface:#fff;--tc-surface-raised:#f8f9fb;--tc-text:#181a1f;--tc-text-muted:#616773;--tc-divider:#d8dce3;--tc-accent:#2457d6;--tc-accent-hover:#1f49b8;--tc-success:#16815d;--tc-warning:#9a6700;--tc-error:#c23838;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#111318;--tc-surface:#181b21;--tc-surface-raised:#20242b;--tc-text:#f4f5f7;--tc-text-muted:#aeb4bf;--tc-divider:#343a44;--tc-accent:#6f91ff;--tc-accent-hover:#7d9cff;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", pb = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);position:fixed;inset:0}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", mb = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", hb = "@keyframes _tc-icon-rotate_k9i16_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_k9i16_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_k9i16_42{width:28px;height:28px}._iconButtonMd_k9i16_47{width:32px;height:32px}._iconButtonLg_k9i16_52{width:40px;height:40px}._iconButton_k9i16_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_k9i16_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_k9i16_65{color:var(--tc-error)}._iconButtonDestructive_k9i16_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_k9i16_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_k9i16_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_k9i16_84:disabled{opacity:.5}._appButtonContent_k9i16_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_k9i16_107{visibility:hidden}._appButtonLabel_k9i16_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_k9i16_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_k9i16_118 svg{animation:_tc-icon-rotate_k9i16_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_k9i16_130{border-color:var(--tc-accent);color:var(--tc-accent)}._appButtonPrimary_k9i16_130:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonSecondary_k9i16_139{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_k9i16_139:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_k9i16_148{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_k9i16_148:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_k9i16_161{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_k9i16_170{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_k9i16_170:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_k9i16_170[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_k9i16_191{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_k9i16_202{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_k9i16_202[data-disabled]{cursor:not-allowed}._switchLabelGroup_k9i16_214{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_k9i16_214{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_k9i16_226{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_k9i16_232{border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);border-color:var(--tc-divider);flex:none;width:40px;height:24px;position:relative}._switchRoot_k9i16_232[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_k9i16_232:disabled{opacity:.5}._switchThumb_k9i16_251{border:1px solid var(--tc-text-muted);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;display:block;transform:translate(2px)}._switchThumb_k9i16_251[data-state=checked]{transform:translate(18px)}._numberStepper_k9i16_274{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_k9i16_283{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_k9i16_283:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_k9i16_283:disabled{color:var(--tc-text-muted)}._numberStepperInput_k9i16_301{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_k9i16_301:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_k9i16_320{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_k9i16_320:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_k9i16_320[data-placeholder]{color:var(--tc-text-muted)}._selectValue_k9i16_342{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_k9i16_351{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;overflow:hidden}._selectViewport_k9i16_360{padding:4px}._selectItem_k9i16_364{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;display:flex}._selectItem_k9i16_364[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_k9i16_364:focus-visible,._selectItem_k9i16_364:focus{outline-color:var(--tc-accent)}._selectItem_k9i16_364[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_k9i16_392{color:var(--tc-accent);display:inline-flex}._fieldGroup_k9i16_401{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_k9i16_407{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_k9i16_413{color:var(--tc-error)}._fieldGroupHint_k9i16_417{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_k9i16_424{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_k9i16_435{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_k9i16_442{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_k9i16_460{gap:16px}._dialogHeader_k9i16_464{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_k9i16_471{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_k9i16_478{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_k9i16_478:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_k9i16_491{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_k9i16_497{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_k9i16_503{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_k9i16_513{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_k9i16_524{fill:var(--tc-text)}._stateSurface_k9i16_532{flex-direction:column;display:flex}._stateSurfaceSkeleton_k9i16_537{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_k9i16_544{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_k9i16_550{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;display:flex}._stateSurfaceMessageText_k9i16_559{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_k9i16_566{color:var(--tc-error)}._stateSurfaceAction_k9i16_570{display:flex}._toastViewport_k9i16_578{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_k9i16_592{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_k9i16_603{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_k9i16_610{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_k9i16_616{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_k9i16_616:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_k9i16_631{border-color:var(--tc-success)}._toastSuccess_k9i16_631 ._toastTitle_k9i16_603{color:var(--tc-success)}._toastError_k9i16_639{border-color:var(--tc-error)}._toastError_k9i16_639 ._toastTitle_k9i16_603{color:var(--tc-error)}._virtualList_k9i16_651{position:relative;overflow-y:auto}._virtualListSizer_k9i16_656{width:100%;position:relative}._virtualListItem_k9i16_661{width:100%;position:absolute;top:0;left:0}", gb = "._paramsBody_1gvv4_10{flex-direction:column;gap:16px;display:flex}._paramsDimensionRow_1gvv4_16{gap:12px;display:flex}._paramsDimensionRow_1gvv4_16>*{flex:1}._paramsAspectRow_1gvv4_25{align-items:flex-end;gap:12px;display:flex}._paramsAspectField_1gvv4_31{flex:1}._editBody_1gvv4_37{flex-direction:column;gap:16px;display:flex}._editTextareaWrap_1gvv4_43{position:relative}._editHighlightLayer_1gvv4_47{color:#0000;white-space:pre-wrap;word-break:break-word;font:inherit;pointer-events:none;margin:0;padding:8px 10px;position:absolute;inset:0;overflow:hidden}._editHighlightMatch_1gvv4_60{border-radius:var(--tc-radius-status);background-color:color-mix(in srgb, var(--tc-accent) 22%, transparent)}._editTextarea_1gvv4_43{resize:vertical;border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);width:100%;min-height:96px;color:var(--tc-text);font:inherit;background-color:#0000;padding:8px 10px;line-height:1.5;position:relative}._editTextarea_1gvv4_43:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._editTagActions_1gvv4_84{gap:8px;display:flex}._editSubmenu_1gvv4_89{grid-template-columns:repeat(2,1fr);gap:8px;display:grid}._editFooter_1gvv4_95{justify-content:flex-end;gap:8px;display:flex}._inpaintDialogContent_1gvv4_107{width:min(90vw,720px)}._inpaintBody_1gvv4_111{flex-direction:column;gap:12px;width:100%;display:flex}._inpaintCanvasFrame_1gvv4_121{width:100%;aspect-ratio:var(--tc-inpaint-aspect,1);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);touch-action:none;position:relative;overflow:hidden}._inpaintCanvasFrame_1gvv4_121 canvas{width:100%;height:100%;position:absolute;inset:0}._inpaintToolbar_1gvv4_139{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._inpaintToolbarDivider_1gvv4_146{background-color:var(--tc-divider);align-self:stretch;width:1px;margin:0 4px}._inpaintBrushRow_1gvv4_153{align-items:center;gap:12px;display:flex}._inpaintBrushRow_1gvv4_153>*{flex:1}._inpaintPromptGrid_1gvv4_163{grid-template-columns:1fr 1fr;gap:12px;display:grid}._inpaintFooter_1gvv4_169{justify-content:flex-end;gap:8px;display:flex}._inpaintDimensionError_1gvv4_175{color:var(--tc-error);margin:0;font-size:12px}", _b = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", vb = "._shell_1800z_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1800z_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1800z_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1800z_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1800z_57{border-bottom:1px solid var(--tc-divider);grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:12px;display:flex}._top_bar_start_1800z_68,._top_bar_end_1800z_69{align-items:center;gap:4px;min-width:0;display:flex}._top_bar_title_1800z_76{white-space:nowrap;text-overflow:ellipsis;min-width:0;font-weight:600;overflow:hidden}._icon_button_1800z_84{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._icon_button_1800z_84[data-selected=true],._icon_button_1800z_84[aria-pressed=true]{color:var(--tc-accent)}._rail_1800z_100{border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:4px;padding-block:12px;display:flex;overflow-y:auto}._rail_button_1800z_111{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1800z_111[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1800z_130{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1800z_138{grid-area:workspace;min-width:0;min-height:0;overflow:auto}._workspace_placeholder_1800z_145{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_1800z_154{border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1800z_162{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1800z_162:hover,._inspector_resizer_1800z_162[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1800z_175{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1800z_183{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1800z_192{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_1800z_200{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_1800z_200{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_1800z_200 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_1800z_200 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_1800z_226{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1800z_234{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1800z_234[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1800z_250{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._more_menu_content_1800z_258{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);min-width:176px;padding:4px}._more_menu_item_1800z_266{color:var(--tc-text);border-radius:var(--tc-radius-field);align-items:center;gap:8px;padding:8px 10px;display:flex}._more_menu_item_1800z_266[data-highlighted]{color:var(--tc-accent);background-color:var(--tc-surface);outline:none}._sheet_overlay_1800z_281{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1800z_288{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1800z_302{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1800z_314{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1800z_323{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1800z_41{border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1800z_339{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1800z_347{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1800z_356{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1800z_363{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1800z_375{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1800z_375[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1800z_375[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1800z_375[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1800z_395{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1800z_402{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1800z_407{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1800z_419{background-color:var(--tc-canvas);height:100%;min-height:100dvh;color:var(--tc-text);flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex}._state_screen_eyebrow_1800z_431{color:var(--tc-text-muted)}._state_screen_title_1800z_435{max-width:56ch}._state_screen_action_1800z_439{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1800z_449{max-width:56ch;color:var(--tc-text-muted)}", yb = "._assetsView_1lx1r_10{flex-direction:column;gap:16px;height:100%;min-height:0;padding:16px;display:flex}._tabsList_1lx1r_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;gap:4px;padding-bottom:0;display:flex}._tabsTrigger_1lx1r_31{border-radius:var(--tc-radius-field) var(--tc-radius-field) 0 0;color:var(--tc-text-muted);transition:color var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out;background-color:#0000;border:1px solid #0000;border-bottom-width:2px;padding:8px 14px;font-size:13px;font-weight:500}._tabsTrigger_1lx1r_31:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._tabsTrigger_1lx1r_31[data-state=active]{color:var(--tc-accent);border-bottom-color:var(--tc-accent)}._tabsContent_1lx1r_55{flex:1;min-height:0;overflow-y:auto}._tabsContent_1lx1r_55:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._categoryList_1lx1r_70{flex-direction:column;gap:12px;display:flex}._categoryToolbar_1lx1r_76{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._searchInput_1lx1r_83{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);min-width:160px;color:var(--tc-text);flex:1;padding:8px 12px;font-size:13px}._searchInput_1lx1r_83:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reorderHint_1lx1r_99{color:var(--tc-text-muted);font-size:12px}._emptyDescription_1lx1r_104{color:var(--tc-text-muted);font-size:13px}._cardGrid_1lx1r_109{flex-direction:column;gap:8px;display:flex}._assetCard_1lx1r_115{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);align-items:center;gap:4px;padding:4px 8px 4px 4px;display:flex}._assetCard_1lx1r_115[data-dragging]{border-color:var(--tc-accent)}._dragHandle_1lx1r_129{color:var(--tc-text-muted);cursor:grab;flex:none;padding:4px;display:inline-flex}._assetCardMain_1lx1r_137{border-radius:var(--tc-radius-field);text-align:left;min-width:0;transition:background-color var(--tc-motion-fast) ease-out;background-color:#0000;flex-direction:column;flex:1;align-items:flex-start;gap:2px;padding:6px 8px;display:flex}._assetCardMain_1lx1r_137:hover{background-color:var(--tc-surface-raised)}._assetCardName_1lx1r_155{color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13px;font-weight:500;overflow:hidden}._assetCardSummary_1lx1r_165{color:var(--tc-text-muted);flex-wrap:wrap;gap:8px;font-size:12px;display:flex}._assetCardSummaryPart_1lx1r_173{white-space:nowrap}._assetCardActions_1lx1r_177{flex:none;align-items:center;gap:2px;display:flex}._form_1lx1r_188{flex-direction:column;gap:14px;display:flex}._textInput_1lx1r_194,._textArea_1lx1r_195{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;color:var(--tc-text);padding:8px 10px;font-family:inherit;font-size:13px}._textArea_1lx1r_195{resize:vertical;min-height:72px}._textInput_1lx1r_194:focus-visible,._textArea_1lx1r_195:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._formActions_1lx1r_217{justify-content:flex-end;gap:8px;display:flex}._vocabularyPanel_1lx1r_227{flex-direction:column;gap:20px;display:flex}._vocabularySearchRow_1lx1r_233{gap:8px;display:flex}._searchResultsList_1lx1r_238{flex-direction:column;gap:4px;display:flex}._searchResultRow_1lx1r_244{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 4px;display:flex}._searchResultTag_1lx1r_253{color:var(--tc-text);font-size:13px}._searchResultTranslation_1lx1r_258{color:var(--tc-text-muted);font-size:12px}._loadMoreRow_1lx1r_263{justify-content:center;padding-top:4px;display:flex}._sectionTitle_1lx1r_269{color:var(--tc-text);font-size:13px;font-weight:600}._catalogList_1lx1r_275{flex-direction:column;gap:8px;display:flex}._catalogEntry_1lx1r_281{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 4px;display:flex}._catalogEntryInfo_1lx1r_290{flex-direction:column;gap:2px;min-width:0;display:flex}._catalogEntryName_1lx1r_297{color:var(--tc-text);font-size:13px;font-weight:500}._catalogEntryMeta_1lx1r_303{color:var(--tc-text-muted);font-size:12px}._bundledBadge_1lx1r_308{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);align-items:center;padding:2px 6px;font-size:11px;display:inline-flex}._nsfwSection_1lx1r_318{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:8px 12px}._nsfwToggle_1lx1r_324{color:var(--tc-text-muted);background:0 0;align-items:center;gap:6px;padding:4px 0;font-size:12px;display:flex}._nsfwNotice_1lx1r_334{color:var(--tc-text-muted);padding:8px 0 0;font-size:12px}._installProgress_1lx1r_340{color:var(--tc-text-muted);font-size:12px}._workflowToolbarRow_1lx1r_349{flex-wrap:wrap;gap:8px;display:flex}._placeholderList_1lx1r_355{flex-direction:column;gap:8px;display:flex}._placeholderRow_1lx1r_361{align-items:center;gap:8px;display:flex}._placeholderKey_1lx1r_367{width:40%;color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;flex:none;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:hidden}._hiddenFileInput_1lx1r_378{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}", bb = "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}", xb = "._galleryView_zh0y1_10{flex-direction:column;gap:12px;height:100%;min-height:0;padding:16px;display:flex}._filterBar_zh0y1_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:16px;padding-bottom:12px;display:flex}._dateFilterLabel_zh0y1_32{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:flex}._dateInput_zh0y1_40{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);color:var(--tc-text);padding:4px 6px;font-size:12px}._cacheOccupancy_zh0y1_49{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._emptyDescription_zh0y1_55{color:var(--tc-text-muted);font-size:13px}._skeletonGrid_zh0y1_64{flex-wrap:wrap;gap:8px;display:flex}._skeletonTile_zh0y1_70{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);width:176px;height:176px}._gridContainer_zh0y1_81{flex:1;min-height:0}._gridRow_zh0y1_86{display:flex}._tile_zh0y1_90{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);flex:none;position:relative;overflow:hidden}._tile_zh0y1_90[data-selected]{outline:2px solid var(--tc-accent);outline-offset:-2px}._tileButton_zh0y1_103{width:100%;height:100%;padding:0;display:block}._tileSkeleton_zh0y1_110{background-color:var(--tc-surface-raised);position:absolute;inset:0}._tileImage_zh0y1_116{object-fit:cover;width:100%;height:100%;transition:opacity var(--tc-motion-normal) ease-out}._tileFallback_zh0y1_123{color:var(--tc-text-muted);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:8px;font-size:11px;display:flex;position:absolute;inset:0}._tilePinnedBadge_zh0y1_137{border-radius:var(--tc-radius-status);background-color:var(--tc-surface);color:var(--tc-accent);justify-content:center;align-items:center;padding:3px;display:inline-flex;position:absolute;top:6px;left:6px}._tileSelectToggle_zh0y1_150{border-radius:var(--tc-radius-status);border:1px solid var(--tc-surface);width:20px;height:20px;transition:background-color var(--tc-motion-fast) ease-out;background-color:#181a1f66;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:6px;right:6px}._tileSelectDot_zh0y1_165{border:1px solid var(--tc-surface);border-radius:50%;width:10px;height:10px}._tileSelectDot_zh0y1_165[data-checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._bulkActionBar_zh0y1_184{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding-top:12px;display:flex}._bulkActionCount_zh0y1_193{color:var(--tc-text);font-size:13px}._bulkActionButtons_zh0y1_198{align-items:center;gap:8px;display:flex}._previewOverlay_zh0y1_208{z-index:var(--tc-z-overlay);background-color:#111318b8;position:fixed;inset:0}._previewContent_zh0y1_215{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);display:flex;position:fixed;inset:16px;overflow:hidden}._previewLayout_zh0y1_225{width:100%;min-height:0;display:flex}._previewMain_zh0y1_231{flex-direction:column;flex:1;min-width:0;display:flex}._previewToolbar_zh0y1_238{border-bottom:1px solid var(--tc-divider);align-items:center;gap:4px;padding:8px;display:flex}._previewToolbarButton_zh0y1_246{border-radius:var(--tc-radius-field);width:32px;height:32px;color:var(--tc-text);justify-content:center;align-items:center;display:inline-flex}._previewToolbarButton_zh0y1_246:hover{background-color:var(--tc-surface-raised)}._previewToolbarSpacer_zh0y1_260{flex:1}._previewImageArea_zh0y1_264{flex:1;justify-content:center;align-items:center;gap:8px;min-height:0;padding:12px;display:flex;overflow:auto}._previewImageFrame_zh0y1_275{flex:1;justify-content:center;align-items:center;height:100%;min-height:0;display:flex;position:relative}._previewImage_zh0y1_264{border-radius:var(--tc-radius-image);object-fit:contain;touch-action:auto;max-width:100%;max-height:100%}._previewImageFallback_zh0y1_293{color:var(--tc-text-muted);justify-content:center;align-items:center;padding:24px;font-size:13px;display:flex}._previewNavButton_zh0y1_302{flex:none}._previewInspector_zh0y1_306{border-left:1px solid var(--tc-divider);flex:none;width:320px;max-width:40vw;padding:16px;overflow-y:auto}._metadataInspector_zh0y1_319{flex-direction:column;gap:12px;display:flex}._metadataTitle_zh0y1_325{color:var(--tc-text);font-size:14px;font-weight:600}._metadataOrphanNotice_zh0y1_331{color:var(--tc-warning);font-size:12px}._metadataList_zh0y1_336{flex-direction:column;gap:8px;display:flex}._metadataRow_zh0y1_342{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding-bottom:6px;font-size:12px;display:flex}._metadataRow_zh0y1_342 dt{color:var(--tc-text-muted)}._metadataRow_zh0y1_342 dd{color:var(--tc-text);margin:0}._metadataPrompt_zh0y1_360{white-space:pre-wrap;overflow-wrap:anywhere}._metadataEmpty_zh0y1_365{color:var(--tc-text-muted);font-size:12px}._metadataActions_zh0y1_370{flex-wrap:wrap;gap:8px;display:flex}._metadataActionsHint_zh0y1_376{color:var(--tc-text-muted);font-size:12px}@media (width<=959px){._previewContent_zh0y1_215{border-radius:0;inset:0}._previewLayout_zh0y1_225{flex-direction:column;overflow-y:auto}._previewMain_zh0y1_231{flex:none}._previewToolbar_zh0y1_238{z-index:1;background-color:var(--tc-surface);position:sticky;top:0}._previewImageArea_zh0y1_264{min-height:45vh}._previewInspector_zh0y1_306{border-left:none;border-top:1px solid var(--tc-divider);width:100%;max-width:100%}}", Sb = "._prompt_view_i5kyf_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_i5kyf_14{border-right:1px solid var(--tc-divider)}._editor_column_i5kyf_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_i5kyf_7{grid-template-columns:minmax(0,1fr)}._browser_column_i5kyf_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_i5kyf_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_i5kyf_48{font-weight:600}._icon_text_button_i5kyf_52{color:var(--tc-accent);align-items:center;gap:4px;display:inline-flex}._text_input_i5kyf_59{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_i5kyf_70{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_i5kyf_59:focus-visible,._text_input_narrow_i5kyf_70:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_i5kyf_87{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_i5kyf_87:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_i5kyf_107{flex-direction:column;display:flex}._search_input_i5kyf_112{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_i5kyf_122{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_i5kyf_131{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_i5kyf_141{flex-direction:column;display:flex}._preset_row_i5kyf_146{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_i5kyf_153{background-color:var(--tc-surface-raised)}._preset_name_button_i5kyf_157{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_i5kyf_169{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_i5kyf_169>:first-child{flex:auto}._prompt_builder_i5kyf_183{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._context_preview_i5kyf_191{flex-direction:column;gap:8px;padding:0 16px 12px;display:flex}._context_block_title_i5kyf_198{color:var(--tc-text-muted);margin-bottom:4px;font-size:12px}._context_list_i5kyf_204{margin:0;padding-left:16px}._quality_controls_i5kyf_211{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._switch_list_i5kyf_216{flex-direction:column;gap:4px;padding:0 16px 8px;display:flex}._replacement_rules_i5kyf_225,._regex_rules_i5kyf_226{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_i5kyf_231{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_i5kyf_231>:not(._rule_row_action_i5kyf_240){flex:140px}._rule_row_action_i5kyf_240{flex:none;align-items:center;gap:8px;display:flex}._test_result_i5kyf_253{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_i5kyf_260{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._test_panel_i5kyf_269{flex-direction:column;display:flex}._test_panel_body_i5kyf_277{flex-direction:column;gap:8px;padding:0 16px 16px;display:flex}._tools_disabled_note_i5kyf_284{color:var(--tc-text-muted);margin:0;font-size:12px}", Cb = "._view_sikhr_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_sikhr_14{flex-direction:column;min-width:0;display:flex}._section_header_sikhr_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_sikhr_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_sikhr_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_sikhr_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_sikhr_51{color:var(--tc-text);flex:none}._profile_row_sikhr_56{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_sikhr_65{flex-direction:column;gap:2px;min-width:0;display:flex}._profile_name_sikhr_72{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_sikhr_79{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_sikhr_87{flex:none;align-items:center;gap:6px;display:flex}._badge_sikhr_94{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_sikhr_103{flex-direction:column;gap:16px;display:flex}._status_text_sikhr_109{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_sikhr_109[data-tone=success]{color:var(--tc-success)}._status_text_sikhr_109[data-tone=warning]{color:var(--tc-warning)}._status_text_sikhr_109[data-tone=error]{color:var(--tc-error)}._risk_banner_sikhr_129{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_sikhr_129[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_sikhr_143{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_sikhr_129[data-severity=error] ._risk_banner_title_sikhr_143{color:var(--tc-error)}._risk_banner_description_sikhr_155{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_sikhr_162{align-items:center;gap:8px;display:flex}._acknowledged_note_sikhr_168{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_sikhr_176{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_sikhr_183{align-items:center;gap:12px;padding-top:8px;display:flex}._typed_confirm_input_sikhr_190{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._typed_confirm_input_sikhr_190:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}", wb = "._workbench_view_pr9le_8{grid-template-columns:minmax(0,1fr) minmax(280px,360px);gap:0;min-height:100%;display:grid}._main_column_pr9le_15{border-right:1px solid var(--tc-divider);flex-direction:column;min-width:0;display:flex}._side_column_pr9le_22{flex-direction:column;min-width:0;display:flex}@media (width<=959px){._workbench_view_pr9le_8{grid-template-columns:minmax(0,1fr)}._main_column_pr9le_15{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_pr9le_43{justify-content:space-between;align-items:baseline;gap:8px;padding:12px 16px 4px;display:flex}._section_title_pr9le_51{font-weight:600}._section_hint_pr9le_55{color:var(--tc-text-muted);font-size:12px}._inline_error_pr9le_60{color:var(--tc-error);margin:4px 16px 0;font-size:12px}._prompt_composer_pr9le_68{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:12px;padding:16px;display:flex}._prompt_textarea_pr9le_76{width:100%;min-height:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._prompt_textarea_pr9le_76:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reference_strip_pr9le_96{border-bottom:1px solid var(--tc-divider);padding-bottom:16px}._reference_empty_pr9le_101{flex-direction:column;align-items:flex-start;gap:8px;padding:8px 16px;display:flex}._reference_list_pr9le_109{flex-wrap:wrap;gap:8px;padding:8px 16px 0;display:flex}._reference_tile_pr9le_116{background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);flex-direction:column;gap:6px;width:132px;padding:8px;display:flex}._reference_tile_thumb_pr9le_127{height:72px;color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._reference_tile_name_pr9le_137{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._reference_tile_actions_pr9le_144{gap:2px;display:flex}._reference_tile_add_pr9le_149{justify-content:center;align-items:center;width:132px;display:flex}._reference_add_button_pr9le_156{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);align-items:center;gap:6px;padding:8px 12px;display:flex}._picker_list_pr9le_166{flex-direction:column;gap:4px;display:flex}._picker_item_pr9le_172{text-align:left;width:100%;color:var(--tc-text);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);padding:8px 10px}._submit_row_pr9le_183{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:8px 16px;padding:12px 16px;display:flex}._provider_summary_pr9le_194{border-bottom:1px solid var(--tc-divider);padding-bottom:12px}._text_action_button_pr9le_199{color:var(--tc-accent);align-items:center;gap:4px;display:inline-flex}._active_jobs_pr9le_208{flex:auto;min-height:0;padding-bottom:16px}._job_list_pr9le_214{flex-direction:column;display:flex}._job_row_pr9le_219{border-top:1px solid var(--tc-divider);flex-direction:column;gap:4px;padding:8px 16px;display:flex}._job_row_selected_pr9le_227{background-color:var(--tc-surface-raised)}._job_row_main_pr9le_231{text-align:left;align-items:center;gap:10px;width:100%;display:flex}._job_status_dot_pr9le_239{background-color:var(--tc-success);border-radius:50%;flex:none;width:6px;height:6px}._job_provider_pr9le_247{font-weight:600}._job_state_pr9le_251{color:var(--tc-text-muted);font-size:12px}._job_progress_pr9le_256{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._job_error_pr9le_262{color:var(--tc-error);margin:0;font-size:12px}._job_row_actions_pr9le_268{gap:4px;display:flex}._generation_inspector_pr9le_275{padding-bottom:16px}._inspector_field_list_pr9le_279{flex-direction:column;gap:6px;margin:0;padding:4px 16px;display:flex}._inspector_field_pr9le_279{justify-content:space-between;gap:12px;font-size:12px;display:flex}._inspector_field_pr9le_279 dt{color:var(--tc-text-muted)}._inspector_field_pr9le_279 dd{text-align:right;text-overflow:ellipsis;white-space:nowrap;margin:0;overflow:hidden}._inspector_actions_pr9le_306{align-items:center;gap:8px;padding:8px 16px;display:flex}._completion_preview_list_pr9le_313{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 16px;display:grid}._completion_preview_tile_pr9le_320{aspect-ratio:1;background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);overflow:hidden}._completion_preview_tile_pr9le_320 img{object-fit:cover;width:100%;height:100%}._completion_preview_placeholder_pr9le_333{width:100%;height:100%;color:var(--tc-text-muted);justify-content:center;align-items:center;display:flex}", Tb = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function Eb(e) {
	return e.replaceAll(Tb, (e, t) => new URL(t, import.meta.url).href);
}
//#endregion
//#region src/index.ts
var Db = db({
	stylesheet: Eb([
		fb,
		pb,
		mb,
		hb,
		_b,
		gb,
		vb,
		yb,
		xb,
		wb,
		Sb,
		bb,
		Cb
	].join("\n")),
	version: "3.0.0-alpha.1"
});
//#endregion
export { Db as bootstrap_handle };

//# sourceMappingURL=index.js.map