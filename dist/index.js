import { $ as e, A as t, B as n, F as r, I as i, L as a, N as o, P as s, U as c, X as l, Z as u, _ as d, b as f, dt as p, ft as m, g as h, h as g, i as _, k as v, lt as y, m as b, n as ee, nt as te, p as x, st as S, tt as C, u as w, x as T, y as ne } from "./chunks/vue-i18n-CmRk7RjK.js";
import { t as E } from "./chunks/shell.module-vwMcpviy.js";
import { n as D, r as re, t as O } from "./chunks/sha2-BGNex9vj.js";
import { $ as ie, A as ae, C as oe, D as se, E as ce, G as le, K as ue, M as de, O as fe, Q as pe, S as me, T as he, X as ge, Y as _e, Z as ve, _ as ye, _t as be, b as xe, ct as Se, dt as Ce, ft as we, g as k, j as Te, k as Ee, lt as De, m as Oe, ot as ke, q as A, tt as Ae, v as je, x as Me, y as Ne, z as j } from "./chunks/src-CpgRWEjb.js";
import { i as Pe, n as Fe, o as Ie, r as Le, s as Re, t as ze } from "./chunks/media_command_service-BBe6qnjJ.js";
import { t as Be } from "./chunks/create_i18n-DJm3ksCY.js";
import { t as Ve } from "./chunks/createLucideIcon-DAbI7E00.js";
import { o as He, t as Ue } from "./chunks/route_nav-CAxsCBUg.js";
import { t as We } from "./chunks/chevron-down-CvI5L1EB.js";
import { t as Ge } from "./chunks/chevron-up-D_L3-oTI.js";
import { t as Ke } from "./chunks/AppIcon-B4b88cvE.js";
import { t as qe } from "./chunks/portal_keys-gQ1cWdMS.js";
import { S as Je, a as Ye, r as Xe } from "./chunks/job_repository-CcjjS_PI.js";
import { a as Ze, c as Qe, d as $e, f as et, l as tt, o as nt, s as rt, t as it, u as at } from "./chunks/business_repositories-CDvcbNGU.js";
import { n as ot } from "./chunks/build_generation_request-BJrIrpcE.js";
import { a as st, i as ct, n as lt, o as ut } from "./chunks/provider_transport-Cd3j7X3I.js";
import { a as dt, i as ft, o as pt, r as mt, t as ht } from "./chunks/http_acknowledgment-Wv2rzaKN.js";
import { n as gt, r as _t, t as vt } from "./chunks/migration_journal-DS3R567y.js";
//#region ../../packages/core/src/capability_registry.ts
var yt = class {
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
}, bt = class {
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
}, xt = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new yt(), n = new bt()) {
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
}, St = "Canonical JSON accepts only JSON data";
function M() {
	throw TypeError(St);
}
function Ct(e) {
	return typeof e == "number" && !Number.isFinite(e) ? M() : JSON.stringify(e);
}
function wt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return Ct(e);
	if (typeof e != "object") return M();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return M();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return M();
				n.push(wt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return M();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return M();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return M();
			a.push(`${Ct(n)}:${wt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function Tt(e) {
	return wt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var Et = class {
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
function Dt(e) {
	return D(O(re(e)));
}
function Ot(e, t) {
	let n = Dt(Tt(e)), r = t.bytes(32);
	if (r.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: n,
		generation_anchor: Dt(`${n}${D(r)}`)
	};
}
//#endregion
//#region ../../packages/core/src/generation/source_context.ts
var kt = Ce({
	schema_version: ke(1),
	chat_id: we().min(1).max(512),
	active_swipes: Ae(De({
		message_id: Se().int().nonnegative(),
		swipe_id: Se().int().nonnegative()
	})),
	messages: Ae(De({
		message_id: Se().int().nonnegative(),
		role: ie([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: A,
		swipe_id: Se().int().nonnegative().nullable()
	}))
}), At = "<!-- tavern-canvas:image ", jt = "-->";
function Mt(e) {
	let t = e.codePointAt(0);
	return t === void 0 ? 0 : t <= 127 ? 1 : t <= 2047 ? 2 : t <= 65535 ? 3 : 4;
}
function Nt(e, t) {
	if (t.length !== 1 || e.length === 0) return !1;
	let n = e.charCodeAt(e.length - 1), r = t.charCodeAt(0);
	return n >= 55296 && n <= 56319 && r >= 56320 && r <= 57343;
}
function Pt(e) {
	return e.endsWith("--") ? 2 : +!!e.endsWith("-");
}
function Ft(e, t = []) {
	return Object.freeze({
		cleaned_text: e,
		requests: Object.freeze(t)
	});
}
var It = class {
	#e;
	#t;
	#n = "text";
	#r = "";
	#i = "";
	#a = 0;
	#o = "";
	#s = !1;
	constructor(e, t = !0) {
		this.#e = e, this.#t = t;
	}
	get buffered_bytes() {
		return this.#n === "candidate" ? this.#a : new TextEncoder().encode(this.#n === "text" ? this.#r : this.#o).byteLength;
	}
	push(e) {
		if (this.#s) throw Error("Cannot push fallback stream content after finish");
		if (!this.#t) return Ft(e);
		let t = [], n = [];
		for (let r of e) switch (this.#n) {
			case "text":
				this.#c(r, t);
				break;
			case "candidate":
				this.#l(r, n);
				break;
			case "discarding": this.#u(r);
		}
		return Ft(t.join(""), n);
	}
	finish() {
		if (this.#s || (this.#s = !0, !this.#t)) return Ft("");
		let e = this.#n === "text" ? this.#r : "";
		return this.#f(), Ft(e);
	}
	#c(e, t) {
		for (this.#r += e; !At.startsWith(this.#r);) {
			let e = this.#r.codePointAt(0);
			if (e === void 0) break;
			let n = String.fromCodePoint(e);
			t.push(n), this.#r = this.#r.slice(n.length);
		}
		this.#r === At && (this.#r = "", this.#n = "candidate");
	}
	#l(e, t) {
		let n = Nt(this.#i, e);
		if (this.#i += e, this.#a += n ? 1 : Mt(e), this.#i.endsWith(jt)) {
			let e = this.#i.slice(0, -3);
			if (this.#a - 3 <= 16384) {
				let n = this.#d(e);
				n !== null && t.push(n);
			}
			this.#i = "", this.#a = 0, this.#n = "text";
			return;
		}
		let r = Pt(this.#i);
		this.#a - r > 16384 && (this.#i = "", this.#a = 0, this.#n = "discarding", this.#o = "");
	}
	#u(e) {
		for (this.#o += e; !jt.startsWith(this.#o) && this.#o[0] !== void 0;) this.#o = this.#o.slice(1);
		this.#o === jt && (this.#o = "", this.#n = "text");
	}
	#d(e) {
		let t;
		try {
			t = JSON.parse(e);
		} catch {
			return null;
		}
		let n = ue.safeParse(t);
		return !n.success || n.data.generation_anchor !== this.#e ? null : Object.freeze(n.data);
	}
	#f() {
		this.#r = "", this.#i = "", this.#a = 0, this.#o = "";
	}
}, Lt = 9e5, N = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "GenerationSessionError", this.code = e;
	}
};
function Rt(e) {
	let t = kt.parse(e);
	for (let e of t.active_swipes) Object.freeze(e);
	for (let e of t.messages) Object.freeze(e);
	return Object.freeze(t.active_swipes), Object.freeze(t.messages), Object.freeze(t);
}
var zt = class {
	#e;
	#t;
	#n;
	#r = /* @__PURE__ */ new Map();
	#i = /* @__PURE__ */ new Map();
	constructor(e, t = { now: () => /* @__PURE__ */ new Date() }, n = Lt) {
		if (!Number.isFinite(n) || n < 0) throw RangeError("Session retention must be a nonnegative finite duration");
		this.#e = e, this.#t = t, this.#n = n;
	}
	open(e) {
		if (!Number.isInteger(e.depth) || e.depth < 0) throw new N("invalid_depth", "Generation depth must be a nonnegative integer");
		let t = this.#r.get(e.host_root_generation_id);
		if (t !== void 0) {
			if (this.#a(t)) throw new N("expired", `Generation session for root "${e.host_root_generation_id}" has expired`);
			return t.session;
		}
		if (e.depth !== 0) throw new N("missing", `Root generation session "${e.host_root_generation_id}" does not exist`);
		let n = Rt(e.source_context), r = Ot(n, this.#e), i = /* @__PURE__ */ new Set(), a = {
			session_id: r.generation_anchor,
			host_root_generation_id: e.host_root_generation_id,
			chat_id: n.chat_id,
			source_context: n,
			source_anchor: r.source_anchor,
			generation_anchor: r.generation_anchor,
			started_at: this.#t.now().toISOString(),
			request_ids: i,
			completed_at: null
		}, o = {
			session: a,
			request_ids: i,
			active_request_ids: /* @__PURE__ */ new Set()
		};
		return this.#r.set(a.host_root_generation_id, o), this.#i.set(a.generation_anchor, o), a;
	}
	get_by_anchor(e) {
		let t = this.#i.get(e);
		if (!(t === void 0 || this.#a(t) && t.active_request_ids.size === 0)) return t.session;
	}
	require_actionable(e, t) {
		let n = this.#i.get(t);
		if (n === void 0) throw new N("missing", `Generation session "${t}" does not exist`);
		if (n.session.host_root_generation_id !== e) throw new N("mismatched", `Generation anchor "${t}" does not belong to root "${e}"`);
		if (this.#a(n)) throw new N("expired", `Generation session "${t}" has expired`);
		return n.session;
	}
	complete(e) {
		let t = this.#r.get(e);
		if (t === void 0) throw new N("missing", `Root generation session "${e}" does not exist`);
		return t.session.completed_at ??= this.#t.now().toISOString(), t.session;
	}
	add_request(e, t) {
		let n = this.#i.get(e);
		if (n === void 0) throw new N("missing", `Generation session "${e}" does not exist`);
		if (this.#a(n)) throw new N("expired", `Generation session "${e}" has expired`);
		if (t.length === 0) throw TypeError("Generation request ID must not be empty");
		n.request_ids.add(t), n.active_request_ids.add(t);
	}
	settle_request(e, t) {
		this.#i.get(e)?.active_request_ids.delete(t);
	}
	cleanup() {
		let e = 0;
		for (let [t, n] of this.#i) this.#a(n) && n.active_request_ids.size === 0 && (this.#i.delete(t), this.#r.delete(n.session.host_root_generation_id), e += 1);
		return e;
	}
	#a(e) {
		if (e.session.completed_at === null) return !1;
		let t = Date.parse(e.session.completed_at) + this.#n;
		return this.#t.now().getTime() >= t;
	}
}, Bt = class {
	#e;
	constructor(e = globalThis.crypto) {
		this.#e = e;
	}
	next() {
		return ve.parse(this.#e.randomUUID());
	}
}, Vt = Object.freeze(be(ue, { target: "draft-07" })), Ht = class {
	definition = Object.freeze({
		name: "request_image",
		display_name: "Request image",
		description: "Queue an image generation request for the current TavernCanvas generation session.",
		stealth: !1,
		parameters: Vt
	});
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		this.#e = e, this.#t = t, this.#n = n;
	}
	execute(e, t) {
		let n = Object.freeze(ue.parse(t)), r = this.#e.require_actionable(e, n.generation_anchor), i = ve.parse(this.#t.next()), a = Object.freeze({
			request_id: i,
			host_root_generation_id: e,
			generation_anchor: r.generation_anchor,
			source_anchor: r.source_anchor,
			source_context: r.source_context,
			arguments: n
		});
		return this.#n.enqueue(a), this.#e.add_request(r.generation_anchor, i), Object.freeze({
			status: "queued",
			request_id: i,
			generation_anchor: r.generation_anchor
		});
	}
}, Ut = Object.freeze({
	tools: Object.freeze([]),
	tool_choice: "none"
});
function Wt(e, t) {
	let n = le.parse(e), r = A.parse(t), i = n === "native_tool", a = i ? `Use image generation only when visual content would materially support the response. When appropriate, call request_image with generation_anchor "${r}" before writing final assistant text.` : `When image generation is appropriate, emit this exact hidden comment before writing final assistant text: <!-- tavern-canvas:image {"generation_anchor":"${r}","scene_description":"<text>"} -->`;
	return Object.freeze({
		mode: n,
		register_native_tool: i,
		host_injection: Object.freeze({
			position: "in_chat",
			depth: 0,
			role: "system",
			scan_world_info: !1,
			content: a
		}),
		private_prompt: Ut
	});
}
//#endregion
//#region ../../packages/core/src/jobs/generation_job.ts
var Gt = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function P(e) {
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
//#region ../../packages/core/src/jobs/job_state_machine.ts
var Kt = {
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
}, qt = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function Jt(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Kt[r].includes(t)) throw new qt(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function Yt(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function Xt(e) {
	let t = A.parse(e.generation_anchor), n = Object.freeze(ue.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: ve.parse(e.request_id),
		generation_anchor: t,
		source_anchor: A.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: j.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function Zt(e) {
	let t = `${e.generation_anchor}${Tt(e.arguments)}`;
	return D(O(re(t)));
}
function Qt(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function $t(e) {
	return e instanceof Re ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var en = class {
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
	#f = j.options;
	#p = 0;
	#m = 0;
	#h = !1;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new Gt(), this.#i = Yt(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#f) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : Yt(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, []), this.#s.set(t, 0);
		}
	}
	enqueue(e) {
		let t = Xt(e), n = Zt(t);
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
		return t === void 0 ? null : P(t.job);
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
		if (t.job.state === "cancelled") return P(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#w(t);
		let n = await this.#C(t, async () => (t.job.state !== "cancelled" && await this.#S(t, "cancelled"), P(t.job)));
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
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#C(n, async () => (n.job.state !== t && await this.#S(n, t), P(n.job)));
	}
	async #_(e, t) {
		let n = this.#r.now().toISOString(), r = {
			job_id: ge.parse(this.#n.next()),
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
		}, i = P(r);
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
			let n = (await this.#e.execute(P(e.job), t)).image_ids.map((e) => _e.parse(e));
			if (n.length === 0) throw new Re({
				code: "malformed_response",
				retryable: !1
			});
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = Qt(e.job);
				t.image_ids = n, await this.#S(e, "completed", t);
			});
		} catch (t) {
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = Qt(e.job);
				n.error = $t(t), await this.#S(e, "failed", n);
			});
		}
	}
	async #S(e, t, n = Qt(e.job)) {
		Jt(n, t, this.#r.now().toISOString());
		let r = P(n);
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
function tn(e) {
	return [...new Set(e)];
}
function nn(e, t) {
	return `${e}\u0000${String(t)}`;
}
function rn(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.has(t.image_id) || n.set(t.image_id, Object.freeze({ ...t }));
	for (let e of t) n.has(e) || n.set(e, Object.freeze({ image_id: e }));
	return Object.freeze([...n.values()]);
}
var an = class {
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
				this.#s = e.chat_id, this.#i.set(nn(e.chat_id, e.message_id), e.swipe_id), this.#d();
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
			generation_anchor: A.parse(e.generation_anchor),
			source_anchor: A.parse(e.source_anchor),
			request_ids: Object.freeze(tn(e.request_ids.map((e) => ve.parse(e))))
		});
		this.#n.set(t.generation_anchor, t), this.#s === null && (this.#s = t.chat_id);
		let n = nn(t.chat_id, t.message_id);
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
			if (this.#s === t.chat_id && this.#i.get(nn(t.chat_id, t.message_id)) === t.swipe_id) {
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
					let r = tn([
						...n.metadata?.request_ids ?? [],
						...t.request_ids,
						e.request_id
					]), i = tn([...n.metadata?.image_ids ?? [], ...e.image_ids]), a = Object.freeze({
						chat_id: t.chat_id,
						message_id: t.message_id,
						swipe_id: t.swipe_id,
						metadata: Ne.parse({
							schema_version: 1,
							generation_anchor: t.generation_anchor,
							source_anchor: t.source_anchor,
							request_ids: r,
							image_ids: i
						}),
						media: rn(n.media, e.image_ids)
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
}, on = "tavern_canvas_image_trigger", sn = {
	none: -1,
	in_chat: 1
}, cn = { system: 0 };
function ln(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function un(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
var dn = {
	native_tool_manager: !1,
	main_generation_events: !1,
	message_swipe_metadata: !1,
	host_image_upload: !1
};
function F(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function fn(e, t) {
	let n = F(e, t);
	return n.ok && typeof n.value == "function";
}
function pn(e, t) {
	let n = F(e, t);
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
function mn(e, t) {
	let n = pn(e, t);
	return n.ok && typeof n.value == "string" && n.value.trim().length > 0;
}
function hn(e) {
	let t = F(e, "eventSource"), n = F(e, "eventTypes");
	if (!t.ok || !ln(t.value) || !n.ok || !ln(n.value)) return !1;
	let r = n.value, i = F(r, "GENERATION_STARTED"), a = F(r, "GENERATION_STOPPED"), o = F(r, "GENERATION_ENDED"), s = F(r, "STREAM_TOKEN_RECEIVED");
	return fn(t.value, "on") && fn(t.value, "removeListener") && i.ok && typeof i.value == "string" && i.value.length > 0 && a.ok && typeof a.value == "string" && a.value.length > 0 && o.ok && typeof o.value == "string" && o.value.length > 0 && s.ok && typeof s.value == "string" && s.value.length > 0;
}
function gn(e) {
	let t = F(e, "eventSource"), n = F(e, "eventTypes");
	if (!t.ok || !ln(t.value) || !n.ok || !ln(n.value)) return !1;
	let r = F(n.value, "CHAT_CHANGED"), i = F(n.value, "MESSAGE_SWIPED");
	return fn(t.value, "on") && fn(t.value, "removeListener") && r.ok && typeof r.value == "string" && r.value.length > 0 && i.ok && typeof i.value == "string" && i.value.length > 0;
}
function _n(e) {
	let t = pn(e, "getRequestHeaders");
	if (!t.ok) return !1;
	try {
		return Sn(t.value), !0;
	} catch {
		return !1;
	}
}
function vn(e, t) {
	if (!ln(e)) return { ...dn };
	let n = pn(e, "getContext");
	if (!n.ok || !ln(n.value)) return { ...dn };
	let r = n.value, i = mn(r, "getCurrentLocale"), a = mn(r, "getCurrentChatId");
	return {
		native_tool_manager: fn(r, "registerFunctionTool") && fn(r, "unregisterFunctionTool"),
		main_generation_events: i && hn(r),
		message_swipe_metadata: a && gn(r),
		host_image_upload: typeof t == "function" && _n(r)
	};
}
function yn(e, t) {
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
function bn(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function xn(e) {
	if (!un(e)) throw Error("Image tool arguments must be a record");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("Image tool arguments could not be cloned");
	}
	if (!un(t)) throw Error("Image tool arguments could not be cloned");
	return t;
}
function Sn(e) {
	if (!un(e)) throw Error("SillyTavern returned invalid request headers");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("SillyTavern returned invalid request headers");
	}
	if (!un(t) || !Object.values(t).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return t;
}
var Cn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	get_locale() {
		return bn(this.#e.getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		return bn(this.#e.getCurrentChatId(), "SillyTavern returned an invalid active chat ID");
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
			throw yn(this.#e.eventSource, n), e;
		}
		let r = !1;
		return () => {
			if (r) return;
			r = !0;
			let e = yn(this.#e.eventSource, n);
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
			action: async (t) => e.execute(xn(t)),
			stealth: e.stealth
		});
		let t = !1;
		return () => {
			t || (t = !0, this.#e.unregisterFunctionTool(e.name));
		};
	}
	set_trigger_injection(e) {
		let t = this.#e.setExtensionPrompt;
		t !== void 0 && Reflect.apply(t, this.#e, [
			on,
			e?.content ?? "",
			e === null ? sn.none : sn.in_chat,
			e?.depth ?? 0,
			e?.scan_world_info ?? !1,
			cn.system
		]);
	}
	async upload_image(e) {
		let t = await this.#t("/api/images/upload", {
			method: "POST",
			headers: Sn(this.#e.getRequestHeaders()),
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
		if (!t.ok) throw un(n) && typeof n.error == "string" && n.error.trim().length > 0 ? Error(n.error) : Error(`Host image upload failed with status ${String(t.status)}`);
		if (!un(n) || typeof n.path != "string" || n.path.trim().length === 0) throw Error("Host image upload returned an invalid response");
		return { path: n.path };
	}
};
//#endregion
//#region src/host/tauritavern_host.ts
function wn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Tn(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function I(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function En(e, t) {
	let n = I(e, t);
	return n.ok && typeof n.value == "function";
}
function Dn(e, t) {
	let n = I(e, t);
	return n.ok && wn(n.value) ? n.value : void 0;
}
function On(e) {
	let t = {
		tauri_chat_surface: !1,
		tauri_world_info_activation: !1
	};
	if (!wn(e)) return t;
	let n = I(e, "abiVersion");
	if (!n.ok || n.value !== 1) return t;
	let r = Dn(e, "api");
	if (r === void 0) return t;
	let i = Dn(r, "chatSurface"), a = i === void 0 ? { ok: !1 } : I(i, "protocolVersion"), o = Dn(r, "worldInfo");
	return {
		tauri_chat_surface: i !== void 0 && a.ok && a.value === 1 && En(i, "isManagedOwnershipRequired") && En(i, "registerParticipant"),
		tauri_world_info_activation: o !== void 0 && En(o, "getLastActivation") && En(o, "subscribeActivations")
	};
}
function kn(e, t = !0) {
	if (e === void 0 && t) return;
	let n;
	if (typeof e == "function") n = () => {
		Reflect.apply(e, void 0, []);
	};
	else if (wn(e)) {
		let t = I(e, "dispose");
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
function An(e) {
	return {
		message_id: e.mesid,
		element: e.element,
		content: e.content,
		signal: e.signal
	};
}
function jn(e) {
	return e === "before" || e === "after" || e === "an_top" || e === "an_bottom" || e === "depth" || e === "em_top" || e === "em_bottom" || e === "outlet";
}
function Mn() {
	throw Error("TauriTavern returned an invalid WorldInfo activation");
}
function Nn(e) {
	if (!Tn(e)) return !1;
	let t = I(e, "entries");
	if (!t.ok) return !1;
	try {
		if (!Array.isArray(t.value)) return !1;
		for (let e = 0; e < t.value.length; e += 1) if (!Tn(t.value[e])) return !1;
		return !0;
	} catch {
		return !1;
	}
}
function Pn(e) {
	if (!Nn(e)) return Mn();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return Mn();
	}
	if (!Tn(t)) return Mn();
	let { timestampMs: n, trigger: r, entries: i } = t;
	if (typeof n != "number" || !Number.isFinite(n) || typeof r != "string" || r.length === 0 || !Array.isArray(i)) return Mn();
	let a = [];
	for (let e of i) {
		if (!Tn(e)) return Mn();
		let { world: t, uid: n, displayName: r, constant: i, position: o } = e;
		if (typeof t != "string" || typeof n != "string" && (typeof n != "number" || !Number.isFinite(n)) || typeof r != "string" || typeof i != "boolean" || o !== void 0 && !jn(o)) return Mn();
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
var Fn = class {
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
					n.claim(e, (e) => kn(t({
						message_id: e.mesid,
						source: e.source,
						element: e.element,
						content: e.content,
						signal: e.signal
					}), !1) ?? (() => void 0));
				} });
			} },
			...e.did_mount === void 0 ? {} : { didMount: (t) => kn(e.did_mount?.(An(t))) },
			...e.did_commit_content === void 0 ? {} : { didCommitContent: (t) => kn(e.did_commit_content?.(An(t))) }
		});
		if (!wn(n)) throw Error("TauriTavern returned an invalid ChatSurface registration");
		let r = I(n, "fault");
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
		return t === null ? null : Pn(t);
	}
	async subscribe_world_info_activation(e) {
		let t = this.#e.api?.worldInfo;
		if (t === void 0) throw Error("TauriTavern WorldInfo activation API is unavailable");
		let n = await t.subscribeActivations((t) => {
			e(Pn(t));
		});
		if (typeof n != "function") throw Error("TauriTavern returned an invalid WorldInfo unsubscribe");
		let r = !1;
		return async () => {
			r || (r = !0, await Reflect.apply(n, void 0, []));
		};
	}
};
async function In(e) {
	let t = I(e, "__TAURITAVERN__");
	if (!t.ok || !wn(t.value)) return;
	let n = t.value, r = I(n, "abiVersion");
	if (!r.ok || r.value !== 1) return;
	let i = I(n, "ready");
	if (!i.ok) return;
	let a = i.value;
	if (a == null) {
		let t = I(e, "__TAURITAVERN_MAIN_READY__");
		if (!t.ok) return;
		a = t.value;
	}
	return await a, new Fn(n);
}
//#endregion
//#region src/host/tavern_helper_host.ts
var Ln = "tavern_canvas";
function Rn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function zn(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Bn(e) {
	for (let t = 0; t < e.length; t += 1) if (!Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
function Vn(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function Hn(e, t) {
	let n = Vn(e, t);
	return n.ok && typeof n.value == "function";
}
function Un(e) {
	let t = Vn(e, "getTavernHelperVersion");
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
function Wn(e) {
	return e === void 0 ? {
		detected: !1,
		version: { state: "missing" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	} : Rn(e) ? {
		detected: !0,
		version: Un(e),
		private_prompt_generation: Hn(e, "generateRaw"),
		message_swipe_metadata: Hn(e, "getChatMessages") && Hn(e, "setChatMessages")
	} : {
		detected: !0,
		version: { state: "invalid" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	};
}
function Gn(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function Kn() {
	throw Error("TavernHelper returned invalid chat messages");
}
function qn(e) {
	if (!zn(e)) return Kn();
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o, swipes_data: s, swipes_info: c } = e;
	return !Number.isInteger(t) || typeof t != "number" || t < 0 || typeof n != "string" || !Gn(r) || typeof i != "boolean" || !Number.isInteger(a) || typeof a != "number" || !Array.isArray(o) || o.length === 0 || !Bn(o) || !o.every((e) => typeof e == "string") || !Array.isArray(s) || !Bn(s) || !s.every(zn) || !Array.isArray(c) || !Bn(c) || !c.every(zn) || s.length !== o.length || c.length !== o.length || a < 0 || a >= o.length ? Kn() : {
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
function Jn(e) {
	try {
		if (!Array.isArray(e) || !Bn(e)) return !1;
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			if (!zn(n)) return !1;
			let r = Vn(n, "swipes_data"), i = Vn(n, "swipes_info");
			if (!r.ok || !Array.isArray(r.value) || !Bn(r.value) || !r.value.every(zn) || !i.ok || !Array.isArray(i.value) || !Bn(i.value) || !i.value.every(zn)) return !1;
		}
		return !0;
	} catch {
		return !1;
	}
}
function Yn(e) {
	if (!Jn(e)) return Kn();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return Kn();
	}
	return !Array.isArray(t) || !Bn(t) ? Kn() : t.map(qn);
}
function Xn(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update metadata could not be cloned");
	}
}
function Zn(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update media could not be cloned");
	}
}
function Qn(e) {
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
var $n = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async get_active_chat() {
		let e = Yn(this.#e.getChatMessages("0-{{lastMessageId}}", { include_swipes: !0 })), t = this.#t();
		if (typeof t != "string" || t.trim().length === 0) throw Error("TavernHelper returned an invalid active chat ID");
		return {
			chat_id: t,
			messages: e.map(Qn)
		};
	}
	async generate_private_prompt(e) {
		let t = {
			generation_id: e.generation_id,
			ordered_prompts: e.prompts.map((e) => ({ ...e })),
			should_silence: !0,
			should_stream: !1,
			tools: Ut.tools,
			tool_choice: Ut.tool_choice,
			...e.max_chat_history === void 0 ? {} : { max_chat_history: e.max_chat_history }
		}, n = await this.#e.generateRaw(t);
		if (typeof n != "string") throw Error("Private prompt generation returned structured tool calls");
		return n;
	}
	async update_message(e) {
		let t = Yn(this.#e.getChatMessages(e.message_id, { include_swipes: !0 })).find((t) => t.message_id === e.message_id);
		if (t === void 0) throw Error(`Host message ${String(e.message_id)} no longer exists`);
		if (!Number.isInteger(e.swipe_id) || e.swipe_id < 0 || e.swipe_id >= t.swipes.length) throw Error(`Host message ${String(e.message_id)} swipe ${String(e.swipe_id)} no longer exists`);
		let n = Zn(e.media), r = t.swipes.map((t, n) => n === e.swipe_id ? e.content : t), i = t.swipes_info.map((t, n) => n === e.swipe_id ? {
			...t,
			[Ln]: Xn(e.metadata)
		} : t), a = t.swipes_data.map((t, r) => {
			if (r !== e.swipe_id) return t;
			let i = zn(t.extra) ? t.extra : {};
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
}, er = "4.9.1", tr = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function nr(e) {
	let t = tr.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function rr(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function ir(e) {
	let t = nr(e), n = nr(er);
	return t === null || n === null ? "invalid" : rr(t, n) ? "supported" : "unsupported";
}
var ar = [
	"main_generation_events",
	"private_prompt_generation",
	"message_swipe_metadata",
	"host_image_upload",
	"tavern_helper"
];
function or(e) {
	return {
		available: !1,
		reason: e
	};
}
function L(e, t) {
	return e ? { available: !0 } : or(t);
}
function sr(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function cr(e, t, n) {
	return {
		native_tool_manager: L(t.native_tool_manager, "SillyTavern ToolManager API is unavailable"),
		main_generation_events: L(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		private_prompt_generation: L(e.private_prompt_generation, "TavernHelper.generateRaw is unavailable"),
		message_swipe_metadata: L(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper message swipe API is unavailable"),
		host_image_upload: L(t.host_image_upload, "SillyTavern image upload API is unavailable"),
		tavern_helper: L(e.version.state === "available", "TavernHelper version API is unavailable"),
		tauri_chat_surface: L(n.tauri_chat_surface, "TauriTavern ChatSurface API is unavailable"),
		tauri_world_info_activation: L(n.tauri_world_info_activation, "TauriTavern WorldInfo activation API is unavailable"),
		gateway_protocol: or("Gateway protocol is not connected")
	};
}
function lr(e) {
	return ar.filter((t) => e[t]?.available !== !0);
}
function ur(e) {
	let t = Wn(sr(e, "TavernHelper")), n = cr(t, vn(sr(e, "SillyTavern"), sr(e, "fetch")), On(sr(e, "__TAURITAVERN__")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: lr(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: lr(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = ir(i);
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
	let o = lr(n);
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
var dr = "capability_not_implemented";
function R() {
	let e = /* @__PURE__ */ Error("No adapter wraps the real domain module for this capability yet (see task-1-report.md's \"future adapter layer\" note); bootstrap.ts uses this placeholder until one is wired in.");
	return Object.defineProperty(e, "code", { value: dr }), Promise.reject(e);
}
function z() {
	return () => {};
}
var fr = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	reference: [],
	workflow: []
}, pr = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, mr = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
}, hr = {
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
function gr() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: z,
			submit: R,
			cancel: R,
			retry: R
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: z,
			save: R,
			remove: R,
			test_connection: R
		},
		llm_connections: {
			load: () => Promise.resolve([]),
			subscribe: z,
			save: R,
			remove: R,
			set_credential: R,
			clear_credential: R,
			test_connection: R
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: z,
			load_draft: R,
			save_draft: R,
			remove: R,
			bulk_remove: R,
			test_regex: R
		},
		assets: {
			load: () => Promise.resolve(fr),
			subscribe: z,
			save: R,
			remove: R,
			reorder: R
		},
		personas: {
			load: () => Promise.resolve([]),
			subscribe: z,
			save: R,
			remove: R
		},
		knowledge: {
			load: () => Promise.resolve([]),
			subscribe: z,
			save: R,
			set_enabled: R,
			remove: R,
			bulk_remove: R
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: z,
			read_bytes: R,
			pin: R,
			detach_from_message: R,
			delete_record: R,
			bulk_delete: R
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			search: R,
			next_page: R,
			install: R,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(pr),
			subscribe: z,
			test_connection: R,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: R
		},
		migration: {
			load: () => Promise.resolve(mr),
			subscribe: z,
			retry: R,
			confirm_legacy_cleanup: R
		},
		settings: {
			load: () => Promise.resolve({
				settings: hr,
				vocabulary_update_channel: "bundled"
			}),
			subscribe: z,
			update: R,
			acknowledge_http_origin: R,
			set_gateway_token: R,
			clear_gateway_token: R,
			set_vocabulary_update_channel: R,
			export_archive: R,
			import_archive: R
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var B = { status: "idle" }, _r = "capability_load_failed", vr = "command_failed", yr = /^[a-z][a-z0-9_]*$/u;
function br(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && yr.test(t)) return { code: t };
	}
	return { code: t };
}
function V(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var xr = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function Sr(e) {
	return e === "failed" ? "error" : "pending";
}
function Cr(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function wr(e) {
	return {
		id: e.job_id,
		label_code: Cr(e.state),
		status: Sr(e.state),
		progress: e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null
	};
}
function Tr(e) {
	return e.filter((e) => xr.has(e.state)).map(wr);
}
function H(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: br(e, vr)
		});
	}));
}
function Er(e, t, n) {
	return {
		route: e,
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		workbench: {
			profiles: [],
			active_profile_id: null,
			jobs: [],
			submit_command: B
		},
		llm_connections: {
			connections: [],
			selected_connection_id: null
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: B
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
			vocabulary_install_command: B
		},
		library: {
			personas: [],
			knowledge: [],
			selected_knowledge_ids: []
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: B
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			migration: null,
			connection_test_command: B,
			support_bundle_command: B
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			update_command: B,
			migration_retry_command: B
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var Dr = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = Er(e.initial_route ?? "workbench", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
			tasks: Tr(e)
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
			this.#i || this.#v(e, br(t, _r));
		}).finally(() => {
			this.#_(e, !1);
		});
	}
	#b(e) {
		this.#i || (e.type === "job_updated" ? this.#c(V(this.#t.workbench.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.workbench.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#x(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: V(this.#t.workbench.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#S(e) {
		this.#i || (e.type === "connection_upserted" ? this.#l({ connections: V(this.#t.llm_connections.connections, e.connection, (e) => e.id) }) : this.#l({ connections: this.#t.llm_connections.connections.filter((t) => t.id !== e.connection_id) }));
	}
	#C(e) {
		this.#i || (e.type === "preset_upserted" ? this.#u({ presets: V(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#u({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#w(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: V(this.#t.assets.records[t], e.asset, (e) => e.id)
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
		this.#i || (e.type === "persona_upserted" ? this.#f({ personas: this.#M(e.persona) }) : this.#f({ personas: this.#t.library.personas.filter((t) => t.id !== e.persona_id) }));
	}
	#E(e) {
		this.#i || (e.type === "entry_upserted" ? this.#f({ knowledge: V(this.#t.library.knowledge, e.entry, (e) => e.id) }) : this.#f({
			knowledge: this.#t.library.knowledge.filter((t) => t.id !== e.entry_id),
			selected_knowledge_ids: this.#t.library.selected_knowledge_ids.filter((t) => t !== e.entry_id)
		}));
	}
	#D(e) {
		this.#i || (e.type === "record_upserted" ? this.#p({ records: V(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#p({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
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
	load_vocabulary_catalog() {
		return this.#y("vocabulary", () => this.#e.vocabulary.load(), (e) => {
			this.#d({ vocabulary_catalog: e });
		});
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
		return H(() => this.#t.workbench.submit_command, (e) => {
			this.#s({ submit_command: e });
		}, async () => {
			let t = await this.#e.generation.submit(e);
			return this.#c(V(this.#t.workbench.jobs, t, (e) => e.job_id)), t;
		});
	}
	async cancel_generation(e) {
		let t = await this.#e.generation.cancel(e);
		this.#i || this.#c(V(this.#t.workbench.jobs, t, (e) => e.job_id));
	}
	async retry_generation(e) {
		let t = await this.#e.generation.retry(e);
		this.#i || this.#c(V(this.#t.workbench.jobs, t, (e) => e.job_id));
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
		return H(() => this.#t.prompt.save_command, (e) => {
			this.#u({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#u({
				presets: V(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return H(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#d({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return H(() => this.#t.settings.update_command, (e) => {
			this.#h({ update_command: e });
		}, async () => {
			let t = await this.#e.settings.update(e);
			return this.#h({ settings: t }), t;
		});
	}
	test_diagnostics_connection() {
		return H(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#m({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return H(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#m({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	retry_migration() {
		return H(() => this.#t.settings.migration_retry_command, (e) => {
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
		return this.#i || this.#s({ profiles: V(this.#t.workbench.profiles, t, (e) => e.id) }), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e), this.#i || this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e) });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	acknowledge_http_origin(e) {
		return this.#j(this.#e.settings.acknowledge_http_origin(e));
	}
	set_gateway_token(e) {
		return this.#j(this.#e.settings.set_gateway_token(e));
	}
	clear_gateway_token() {
		return this.#j(this.#e.settings.clear_gateway_token());
	}
	async #j(e) {
		await e;
		let t = await this.#e.settings.load();
		this.#i || this.#h({
			settings: t.settings,
			vocabulary_update_channel: t.vocabulary_update_channel
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
			[e]: V(this.#t.assets.records[e], n, (e) => e.id)
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
		return this.#i || this.#f({ personas: this.#M(t) }), t;
	}
	async remove_persona(e) {
		await this.#e.personas.remove(e), this.#i || this.#f({ personas: this.#t.library.personas.filter((t) => t.id !== e) });
	}
	#M(e) {
		let t = V(this.#t.library.personas, e, (e) => e.id);
		return e.is_active ? t.map((t) => t.id === e.id || t.role !== e.role ? t : {
			...t,
			is_active: !1
		}) : t;
	}
	async save_knowledge_entry(e) {
		let t = await this.#e.knowledge.save(e);
		return this.#i || this.#f({ knowledge: V(this.#t.library.knowledge, t, (e) => e.id) }), t;
	}
	async set_knowledge_entry_enabled(e, t) {
		let n = await this.#e.knowledge.set_enabled(e, t);
		return this.#i || this.#f({ knowledge: V(this.#t.library.knowledge, n, (e) => e.id) }), n;
	}
	async remove_knowledge_entry(e) {
		await this.#e.knowledge.remove(e), this.#i || this.#N([e]);
	}
	set_knowledge_selection(e) {
		this.#f({ selected_knowledge_ids: [...e] });
	}
	async bulk_remove_knowledge_entries(e) {
		await this.#e.knowledge.bulk_remove(e), this.#i || this.#N(e);
	}
	#N(e) {
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
		return this.#i || this.#P(t), t;
	}
	async remove_llm_connection(e) {
		await this.#e.llm_connections.remove(e), !this.#i && this.#l({
			connections: this.#t.llm_connections.connections.filter((t) => t.id !== e),
			selected_connection_id: this.#t.llm_connections.selected_connection_id === e ? null : this.#t.llm_connections.selected_connection_id
		});
	}
	async set_llm_connection_credential(e, t) {
		let n = await this.#e.llm_connections.set_credential(e, t);
		return this.#i || this.#P(n), n;
	}
	async clear_llm_connection_credential(e) {
		let t = await this.#e.llm_connections.clear_credential(e);
		return this.#i || this.#P(t), t;
	}
	test_llm_connection(e) {
		return this.#e.llm_connections.test_connection(e);
	}
	#P(e) {
		let t = V(this.#t.llm_connections.connections, e, (e) => e.id);
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
		return H(() => this.#t.gallery.bulk_delete_command, (e) => {
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
function Or(e) {
	return new Dr(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function kr(e) {
	let t = l(Or(e)), n = C(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), u(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var Ar = Ve("image", [
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
]), jr = Ve("panel-right-close", [
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
]), Mr = Ve("panel-right-open", [
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
]), Nr = ["image", "video"], Pr = /^(?:blob:|data:image\/|data:video\/)/u, Fr = Ce({
	kind: ie(Nr),
	url: we().min(1).refine((e) => Pr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function Ir(e) {
	let t = Fr.safeParse(e);
	return t.success ? t.data : null;
}
function Lr(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: Ir(n)
	};
}
var Rr = 8;
function zr(e, t) {
	let n = Math.max(Rr, t.width - 56 - Rr), r = Math.max(Rr, t.height - 56 - Rr);
	return {
		x: Math.min(Math.max(e.x, Rr), n),
		y: Math.min(Math.max(e.y, Rr), r)
	};
}
function Br(e) {
	return zr({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var Vr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function Hr(e) {
	let t = Ir(e);
	return t !== null && t.kind === "image" ? t : null;
}
var Ur = class {
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
		this.#n && (this.#t = zr(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = Br(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? Br(t) : zr(e, t);
	}
}, Wr = "(min-width: 960px)";
function Gr() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(Wr).matches;
}
function Kr(t) {
	if (t !== void 0) return x(() => t);
	let n = e(Gr());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(Wr), t = (e) => {
			n.value = e.matches;
		};
		e.addEventListener("change", t), u(() => {
			e.removeEventListener("change", t);
		});
	}
	return x(() => n.value ? "desktop" : "mobile");
}
var qr = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, Jr = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], Yr = ["src"], Xr = ["src"], Zr = /* @__PURE__ */ T({
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
	setup(r, { emit: i }) {
		let a = r, s = i, c = Kr(a.viewportOverride);
		function u() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let f = new Ur({
			position_store: te(a.positionStore) ?? l(new Vr()),
			get_viewport: u,
			get_viewport_bucket: () => c.value
		}), m = e(f.position), _ = e(f.dragging);
		function b() {
			m.value = f.position, _.value = f.dragging;
		}
		n(c, () => {
			f.reflow(), b();
		});
		function ee() {
			f.reflow(), b();
		}
		t(() => {
			window.addEventListener("resize", ee);
		}), v(() => {
			window.removeEventListener("resize", ee);
		});
		let C = x(() => {
			let e = _.value ? "dragging" : a.mediaState;
			return e === "idle" ? {
				state: e,
				asset: Hr(a.mediaAssets.idle)
			} : Lr(a.mediaAssets, e);
		}), w = !1;
		function T(e) {
			let t = e.currentTarget;
			if (!(t instanceof HTMLElement) || !e.isPrimary) return;
			let n = t;
			n.setPointerCapture(e.pointerId), f.begin_drag(), b();
			let r = {
				x: e.clientX,
				y: e.clientY
			}, i = f.position;
			function a(e) {
				f.drag_to({
					x: i.x + (e.clientX - r.x),
					y: i.y + (e.clientY - r.y)
				}), b();
			}
			function o() {
				n.removeEventListener("pointermove", a), n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", c), n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId);
				let { moved: t } = f.end_drag();
				b(), w = t;
			}
			function s() {
				o();
			}
			function c() {
				o();
			}
			n.addEventListener("pointermove", a), n.addEventListener("pointerup", s), n.addEventListener("pointercancel", c);
		}
		function ne() {
			if (w) {
				w = !1;
				return;
			}
			s("open");
		}
		function E(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), s("open"));
		}
		return (e, t) => r.enabled ? (o(), d("button", {
			key: 0,
			type: "button",
			class: y(["tc-interactive", [S(qr).floatingEntry, _.value && S(qr).floatingEntryDragging]]),
			style: p({
				left: `${m.value.x}px`,
				top: `${m.value.y}px`
			}),
			"aria-label": r.openLabel,
			"data-dragging": _.value,
			"data-media-state": C.value.state,
			onPointerdown: T,
			onClick: ne,
			onKeydown: E
		}, [C.value.asset?.kind === "video" ? (o(), d("video", {
			key: 0,
			class: y(S(qr).floatingEntryMedia),
			src: C.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, Yr)) : C.value.asset?.kind === "image" ? (o(), d("img", {
			key: 1,
			class: y(S(qr).floatingEntryMedia),
			src: C.value.asset.url,
			alt: ""
		}, null, 10, Xr)) : (o(), g(Ke, {
			key: 2,
			icon: S(Ar)
		}, null, 8, ["icon"]))], 46, Jr)) : h("", !0);
	}
}), Qr = /* @__PURE__ */ T({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return s(qe, t.portalTarget), (e, t) => i(e.$slots, "default");
	}
});
//#endregion
//#region src/ui/shell/use_generation_preview_urls.ts
function $r(e, t) {
	let r = C({}), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
	function o(n) {
		n in r.value || i.has(n) || a.has(n) || (i.add(n), t.read_gallery_bytes(n).then((t) => {
			let i = e().gallery.records.find((e) => e.id === n)?.media_type, a = new Blob([new Uint8Array(t)], i ? { type: i } : {}), o = URL.createObjectURL(a);
			r.value = {
				...r.value,
				[n]: o
			};
		}).catch(() => {
			a.add(n);
		}).finally(() => {
			i.delete(n);
		}));
	}
	return n(() => e().workbench.jobs.flatMap((e) => e.completed_image_ids), (e) => {
		for (let t of e) o(t);
	}, { immediate: !0 }), u(() => {
		for (let e of Object.values(r.value)) URL.revokeObjectURL(e);
	}), r;
}
//#endregion
//#region src/ui/shell/StudioWorkspace.vue
var ei = /* @__PURE__ */ T({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = f(() => import("./chunks/WorkbenchView-CpWmaMba.js")), n = f(() => import("./chunks/PromptView-DNGzGiB2.js")), r = f(() => import("./chunks/AssetsView-xg43heSG.js")), i = f(() => import("./chunks/GalleryView-B9PntShg.js")), a = f(() => import("./chunks/DiagnosticsView-1-ull3bM.js")), s = f(() => import("./chunks/SettingsView-CQdyAWRx.js")), c = e, l = $r(() => c.state, c.controller);
		function u(e, t) {
			return c.controller.test_prompt_regex(e, t);
		}
		return (e, d) => c.state.route === "workbench" ? (o(), g(S(t), {
			key: 0,
			state: c.state,
			"preview-urls": S(l),
			onSelectProfile: d[0] ||= (e) => c.controller.select_provider_profile(e),
			onSubmit: d[1] ||= (e) => void c.controller.submit_generation(e),
			onCancelJob: d[2] ||= (e) => void c.controller.cancel_generation(e),
			onRetryJob: d[3] ||= (e) => void c.controller.retry_generation(e),
			onOpenSettings: d[4] ||= (e) => c.controller.set_route("settings"),
			onConsumeInspectorSelection: d[5] ||= (e) => c.controller.select_inspector_record(null)
		}, null, 8, ["state", "preview-urls"])) : c.state.route === "prompt" ? (o(), g(S(n), {
			key: 1,
			state: c.state,
			"test-regex": u,
			onSelectPreset: d[6] ||= (e) => void c.controller.select_prompt_preset(e),
			onNewPreset: d[7] ||= (e) => c.controller.start_new_prompt_preset(),
			onBulkDeletePresets: d[8] ||= (e) => void c.controller.bulk_remove_prompt_presets(e),
			onUpdateDraft: d[9] ||= (e) => c.controller.update_prompt_draft(e),
			onSave: d[10] ||= (e) => void c.controller.save_prompt_preset(e)
		}, null, 8, ["state"])) : c.state.route === "assets" ? (o(), g(S(r), {
			key: 2,
			state: c.state,
			controller: c.controller
		}, null, 8, ["state", "controller"])) : c.state.route === "gallery" ? (o(), g(S(i), {
			key: 3,
			state: c.state,
			controller: c.controller
		}, null, 8, ["state", "controller"])) : c.state.route === "diagnostics" ? (o(), g(S(a), {
			key: 4,
			state: c.state,
			controller: c.controller
		}, null, 8, ["state", "controller"])) : (o(), g(S(s), {
			key: 5,
			state: c.state,
			controller: c.controller
		}, null, 8, ["state", "controller"]));
	}
}), ti = ["aria-label", "aria-expanded"], ni = ["data-status"], ri = {
	key: 0,
	class: "tc-tabular-nums"
}, ii = /* @__PURE__ */ T({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(t) {
		let n = t, { t: i, n: s } = ee(), c = e(!0), l = {
			"status.loading": () => i("status.loading"),
			"status.empty": () => i("status.empty"),
			"status.partial": () => i("status.partial"),
			"status.error": () => i("status.error"),
			"status.disabled": () => i("status.disabled"),
			"status.success": () => i("status.success"),
			"status.pending": () => i("status.pending"),
			"status.running": () => i("status.running"),
			"status.cancelled": () => i("status.cancelled"),
			"status.completed": () => i("status.completed"),
			"status.failed": () => i("status.failed"),
			"status.retrying": () => i("status.retrying"),
			"status.online": () => i("status.online"),
			"status.offline": () => i("status.offline"),
			"status.connected": () => i("status.connected"),
			"status.blocked": () => i("status.blocked"),
			"status.unknown": () => i("status.unknown")
		};
		function u(e) {
			return l[e]?.() ?? e;
		}
		let f = x(() => c.value ? i("nav.task_strip_collapse") : i("nav.task_strip_expand"));
		function p() {
			c.value = !c.value;
		}
		return (e, t) => n.tasks.length > 0 ? (o(), d("div", {
			key: 0,
			class: y(S(E).task_strip)
		}, [b("div", { class: y(S(E).task_strip_header) }, [b("span", { class: y([S(E).task_strip_summary, "tc-tabular-nums"]) }, m(S(i)("nav.task_strip_count", n.tasks.length)), 3), b("button", {
			type: "button",
			class: y(["tc-interactive", S(E).icon_button]),
			"aria-label": f.value,
			"aria-expanded": c.value,
			onClick: p
		}, [(o(), g(a(c.value ? S(We) : S(Ge)), {
			size: 16,
			"stroke-width": S(Ue),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, ti)], 2), c.value ? (o(), d("div", {
			key: 0,
			class: y(S(E).task_strip_list)
		}, [(o(!0), d(w, null, r(n.tasks, (e) => (o(), d("div", {
			key: e.id,
			class: y(S(E).task_chip)
		}, [
			b("span", {
				class: y(S(E).task_chip_dot),
				"data-status": e.status
			}, null, 10, ni),
			b("span", { class: y(S(E).task_chip_label) }, m(u(e.label_code)), 3),
			e.progress === null ? h("", !0) : (o(), d("span", ri, m(S(s)(e.progress, "percent")), 1))
		], 2))), 128))], 2)) : h("", !0)], 2)) : h("", !0);
	}
}), ai = ["aria-label", "aria-pressed"], oi = /* @__PURE__ */ T({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean }
	},
	emits: ["set-inspector-collapsed"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = ee(), s = x(() => He(i, n.route)), c = x(() => n.inspectorCollapsed ? Mr : jr), l = x(() => n.inspectorCollapsed ? i("nav.inspector_expand") : i("nav.inspector_collapse"));
		function u() {
			r("set-inspector-collapsed", !n.inspectorCollapsed);
		}
		return (t, n) => (o(), d("header", { class: y(S(E).top_bar) }, [b("div", { class: y(S(E).top_bar_start) }, [b("span", { class: y(S(E).top_bar_title) }, m(s.value), 3)], 2), b("div", { class: y(S(E).top_bar_end) }, [b("button", {
			type: "button",
			class: y(["tc-interactive", S(E).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": l.value,
			"aria-pressed": !e.inspectorCollapsed,
			onClick: u
		}, [(o(), g(a(c.value), {
			size: 18,
			"stroke-width": S(Ue),
			"aria-hidden": "true"
		}, null, 8, ["stroke-width"]))], 10, ai)], 2)], 2));
	}
}), si = ["data-viewport", "data-inspector-collapsed"], ci = ["aria-label"], li = /* @__PURE__ */ T({
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
	setup(t, { emit: n }) {
		let r = f(() => import("./chunks/ContextInspector-BNI2Gi-b.js")), i = f(() => import("./chunks/DesktopIconRail-DC21W_0G.js")), a = f(() => import("./chunks/InspectorSheet-Jo31g5T_.js")), s = f(() => import("./chunks/MobileBottomNav-CyIk0bT_.js")), c = t, l = n, { t: u } = ee(), _ = Kr(c.viewport), v = /* @__PURE__ */ new Set(["vocabulary"]), te = x(() => [...c.state.loading].some((e) => !v.has(e))), C = x(() => c.state.failures.size > 0), w = x(() => ({ "--tc-inspector-width": `${String(c.state.inspector.width)}px` })), T = e(!1), D = x(() => _.value === "mobile" ? !T.value : c.state.inspector.collapsed);
		function re(e) {
			_.value === "mobile" && (T.value = !e), l("set-inspector-collapsed", e);
		}
		function O(e) {
			l("select-route", e);
		}
		return (e, t) => (o(), d("div", {
			class: y(S(E).shell),
			"data-viewport": S(_),
			"data-inspector-collapsed": S(_) === "desktop" ? c.state.inspector.collapsed : null,
			style: p(w.value)
		}, [
			ne(oi, {
				route: c.state.route,
				"inspector-collapsed": D.value,
				onSetInspectorCollapsed: re
			}, null, 8, ["route", "inspector-collapsed"]),
			S(_) === "desktop" ? (o(), g(S(i), {
				key: 0,
				route: c.state.route,
				onSelect: O
			}, null, 8, ["route"])) : h("", !0),
			b("main", {
				class: y(S(E).workspace),
				"data-testid": "workspace"
			}, [C.value ? (o(), d("div", {
				key: 0,
				class: y(S(E).partial_banner),
				"data-testid": "partial-banner"
			}, [b("div", null, [b("p", null, m(S(u)("app.partial_init.banner_title")), 1), b("p", null, m(S(u)("app.partial_init.banner_description")), 1)]), b("button", {
				type: "button",
				class: y(["tc-interactive", S(E).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: t[0] ||= (e) => O("diagnostics")
			}, m(S(He)(S(u), "diagnostics")), 3)], 2)) : h("", !0), te.value ? (o(), d("div", {
				key: 1,
				class: y(S(E).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": S(u)("status.loading")
			}, [
				b("div", {
					class: y(S(E).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				b("div", {
					class: y(S(E).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				b("div", {
					class: y(S(E).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, ci)) : (o(), g(ei, {
				key: 2,
				state: c.state,
				controller: c.controller
			}, null, 8, ["state", "controller"]))], 2),
			S(_) === "desktop" && !c.state.inspector.collapsed ? (o(), g(S(r), {
				key: 1,
				width: c.state.inspector.width,
				selection: c.state.inspector.selected_record,
				onResize: t[1] ||= (e) => l("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : h("", !0),
			ne(ii, { tasks: c.state.tasks }, null, 8, ["tasks"]),
			S(_) === "mobile" ? (o(), g(S(s), {
				key: 2,
				route: c.state.route,
				onSelect: O
			}, null, 8, ["route"])) : h("", !0),
			S(_) === "mobile" ? (o(), g(S(a), {
				key: 3,
				open: T.value,
				selection: c.state.inspector.selected_record,
				"onUpdate:open": t[2] ||= (e) => re(!e)
			}, null, 8, ["open", "selection"])) : h("", !0)
		], 14, si));
	}
}), ui = ["href"], di = /* @__PURE__ */ T({
	__name: "AppRoot",
	props: {
		status: {},
		probe: {},
		version: {},
		portalTarget: {},
		hostElement: {},
		capabilities: {}
	},
	setup(t) {
		let r = t, { t: i } = ee();
		function a() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let s = r.hostElement, l = a();
		s.dataset.colorMode = l;
		let u = x(() => r.probe.ready ? void 0 : r.probe.current_version), f = x(() => `${i("app.name")} ${i("app.version_label", { version: r.version })}`), p = r.status.state === "ready" ? kr({
			capabilities: r.capabilities ?? gr(),
			initial_color_mode: l
		}) : null;
		p && n(() => p.state.value.color_mode, (e) => {
			s.dataset.colorMode = e;
		});
		function _(e) {
			p?.controller.set_route(e);
		}
		function v(e) {
			p?.controller.set_inspector_collapsed(e);
		}
		function te(e) {
			p?.controller.set_inspector_width(e);
		}
		function C() {
			window.location.reload();
		}
		let T = x(() => p?.state.value.settings.settings?.ui.optional_entry_enabled === !0), D = e(!1), re = x(() => !T.value || D.value);
		function O() {
			D.value = !D.value;
		}
		return (e, n) => (o(), g(Qr, { "portal-target": t.portalTarget }, {
			default: c(() => [t.status.state === "blocked" ? (o(), d("div", {
				key: 0,
				class: y(S(E).state_screen),
				"data-startup-state": "blocked"
			}, [
				b("p", { class: y(S(E).state_screen_eyebrow) }, m(f.value), 3),
				b("h1", { class: y(S(E).state_screen_title) }, m(S(i)("app.unsupported_host.title")), 3),
				b("p", { class: y(S(E).state_screen_description) }, m(S(i)("app.unsupported_host.description", {
					required_version: S(er),
					current_version: u.value ?? S(i)("status.unknown")
				})), 3),
				b("a", {
					class: y(["tc-interactive", S(E).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, m(S(i)("app.unsupported_host.update_action")), 11, ui)
			], 2)) : t.status.state === "failed" ? (o(), d("div", {
				key: 1,
				class: y(S(E).state_screen),
				"data-startup-state": "failed"
			}, [
				b("p", { class: y(S(E).state_screen_eyebrow) }, m(f.value), 3),
				b("h1", { class: y(S(E).state_screen_title) }, m(S(i)("app.fatal_error.title")), 3),
				b("p", { class: y(S(E).state_screen_description) }, m(S(i)("app.fatal_error.description")), 3),
				b("button", {
					type: "button",
					class: y(["tc-interactive", S(E).state_screen_action]),
					onClick: C
				}, m(S(i)("app.fatal_error.reload_action")), 3)
			], 2)) : S(p) ? (o(), d(w, { key: 2 }, [re.value ? (o(), g(li, {
				key: 0,
				state: S(p).state.value,
				controller: S(p).controller,
				onSelectRoute: _,
				onSetInspectorCollapsed: v,
				onResizeInspector: te
			}, null, 8, ["state", "controller"])) : h("", !0), ne(Zr, {
				enabled: T.value,
				"open-label": S(i)("app.name"),
				onOpen: O
			}, null, 8, ["enabled", "open-label"])], 64)) : h("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
});
//#endregion
//#region src/ui/create_shadow_root.ts
function fi(e, t) {
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
//#region ../../packages/storage/src/images/image_store.ts
var pi = ["image_records", "image_blobs"], mi = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, hi = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, gi = class extends Xe {
	constructor(e) {
		super(e, "image_records", nt);
	}
};
async function _i(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function vi(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function yi(e, t, n, r) {
	let i = tt(n);
	if (i === void 0 || i !== r) throw new hi(r);
	let a = Je.parse(D(O(n))), o = await t.get(a, e);
	if (o === null) {
		let r = await vi(e, a) + 1, o = {
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
async function bi(e, t, n) {
	let r = Je.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function xi(e, t, n) {
	let r = Je.parse(n), i = await t.get(r, e);
	if (i === null) return null;
	let a = await _i(i.blob);
	if (D(O(a)) !== r) throw new mi(r);
	return a;
}
async function Si(e, t, n, r, i) {
	let a = await yi(e, n, i.bytes, i.claimed_media_type), o = {
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
async function Ci(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new Ye("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await bi(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function wi(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = Qe.safeParse(n);
		if (!r.success || !at(r.data)) continue;
		let i = r.data;
		i.quarantined || await t.update(i.namespace, {
			...i,
			quarantined: !0
		}, e);
	}
}
async function Ti(e, t, n) {
	let r = new gi(e), i = new it(e);
	return $e(e, pi, (e) => Si(e, r, i, t, n));
}
async function Ei(e, t, n) {
	let r = new gi(e), i = new it(e);
	return $e(e, pi, (e) => Ci(e, r, i, t, n));
}
async function Di(e, t) {
	let n = new gi(e), r = new it(e), i = await $e(e, pi, async (e) => {
		try {
			return { bytes: await xi(e, r, t) };
		} catch (t) {
			if (!(t instanceof mi)) throw t;
			return await wi(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
//#region src/modules/media/chat_media_interactions.ts
function Oi(e) {
	return {
		available: !1,
		reason: e
	};
}
var ki = class {
	capability = Oi("Standard SillyTavern host exposes no message-media gesture hook; use Gallery or the image parameters dialog instead.");
	subscribe(e) {
		return () => {};
	}
}, Ai = class {
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
};
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
function ji(e) {
	return kt.parse({
		schema_version: 1,
		chat_id: e.chat_id,
		active_swipes: e.messages.map((e) => ({
			message_id: e.message_id,
			swipe_id: e.active_swipe_id
		})),
		messages: e.messages.map((e) => ({
			message_id: e.message_id,
			role: e.role,
			content_sha256: D(O(re(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? ""))),
			swipe_id: e.active_swipe_id
		}))
	});
}
var Mi = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		let e = await this.#e.get_active_chat(), t = Ot(ji(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
};
//#endregion
//#region src/modules/generation/message_binding_module.ts
function Ni(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Pi(e, t) {
	return e.find((e) => e.message_id === t) ?? null;
}
function Fi(e, t) {
	return e.swipes.find((e) => e.swipe_id === t) ?? null;
}
function Ii(e) {
	let t = e.metadata[Ln];
	if (t === void 0) return null;
	let n = Ne.safeParse(t);
	return n.success ? n.data : null;
}
function Li(e) {
	let t = e.data.extra;
	if (!Ni(t) || !Array.isArray(t.media)) return [];
	let n = [];
	for (let e of t.media) {
		if (!Ni(e)) continue;
		let t = _e.safeParse(e.image_id);
		t.success && n.push(Object.freeze({
			...e,
			image_id: t.data
		}));
	}
	return Object.freeze(n);
}
var Ri = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async find_target(e) {
		let t = await this.#e.get_active_chat();
		if (t.chat_id !== e.chat_id) return null;
		let n = Pi(t.messages, e.message_id);
		if (n === null) return null;
		let r = Fi(n, e.swipe_id);
		if (r === null) return null;
		let i = Ii(r);
		return i !== null && i.generation_anchor !== e.generation_anchor ? null : Object.freeze({
			chat_id: t.chat_id,
			message_id: n.message_id,
			swipe_id: r.swipe_id,
			generation_anchor: i?.generation_anchor ?? e.generation_anchor,
			metadata: i,
			media: Li(r)
		});
	}
	async update_target(e) {
		let t = await this.#e.get_active_chat();
		if (t.chat_id !== e.chat_id) throw Error(`Host chat ${e.chat_id} is not active`);
		let n = Pi(t.messages, e.message_id), r = n === null ? null : Fi(n, e.swipe_id);
		if (n === null || r === null) throw Error(`Host message ${String(e.message_id)} swipe ${String(e.swipe_id)} no longer exists`);
		let i = Ii(r);
		if (i !== null && i.generation_anchor !== e.metadata.generation_anchor) throw Error("Host message generation anchor changed before attachment");
		await this.#e.update_message({
			message_id: n.message_id,
			swipe_id: r.swipe_id,
			content: r.content,
			metadata: Ne.parse(e.metadata),
			media: e.media.map((e) => ({ ...e }))
		});
	}
	subscribe_final_assistant(e) {
		let t = !0, n = this.#e.subscribe_generation((n) => {
			if (n.phase !== "ended") return;
			let r = this.#t.resolve(n.message_id);
			r !== null && this.#e.get_active_chat().then((i) => {
				if (!t) return;
				let a = Pi(i.messages, n.message_id);
				a !== null && e({
					chat_id: i.chat_id,
					message_id: a.message_id,
					swipe_id: a.active_swipe_id,
					role: a.role,
					is_final: a.role === "assistant" && !a.is_hidden,
					generation_anchor: A.parse(r.generation_anchor),
					source_anchor: A.parse(r.source_anchor),
					request_ids: r.request_ids.map((e) => ve.parse(e))
				});
			});
		});
		return () => {
			t && (t = !1, n());
		};
	}
	subscribe_chat_change(e) {
		return this.#e.subscribe_chat_change(e);
	}
	subscribe_swipe_change(e) {
		let t = !0, n = this.#e.subscribe_message_swiped((n) => {
			this.#e.get_active_chat().then((r) => {
				if (!t) return;
				let i = Pi(r.messages, n.message_id);
				i !== null && e({
					chat_id: r.chat_id,
					message_id: i.message_id,
					swipe_id: i.active_swipe_id
				});
			});
		});
		return () => {
			t && (t = !1, n());
		};
	}
}, zi = Object.freeze({
	chat_id: "",
	messages: Object.freeze([])
});
function Bi(e, t) {
	let n = t.messages.at(-1);
	if (n === void 0) return 0;
	switch (e) {
		case "swipe": return n.swipes.length;
		case "continue": return n.active_swipe_id;
		default: return 0;
	}
}
var Vi = class {
	#e;
	#t;
	#n;
	#r;
	#i = /* @__PURE__ */ new Map();
	#a = zi;
	#o = null;
	#s = !0;
	#c = [];
	constructor(e) {
		this.#e = e.host, this.#t = e.sessions, this.#n = e.new_root_id, this.#r = e.is_auto_generation_enabled;
	}
	start() {
		this.#c.length > 0 || (this.#c = [this.#e.subscribe_generation((e) => {
			this.#l(e);
		}), this.#e.subscribe_chat_change(() => {
			this.#s = !0, this.#d();
		})], this.#d());
	}
	stop() {
		let e = this.#c.toReversed();
		this.#c = [];
		for (let t of e) t();
		this.#i.clear(), this.#s = !0, this.#e.set_trigger_injection(null);
	}
	begin(e) {
		(this.#o === null || this.#s) && this.#f();
		let t = this.#o;
		if (t === null) throw Error("A generation session could not be opened for this turn");
		return this.#i.set(t.generation_anchor, {
			chat_id: t.chat_id,
			requested_swipe_id: Bi(e.generation_type, this.#a)
		}), t;
	}
	complete(e) {
		this.#t.complete(e.host_root_generation_id);
	}
	resolve(e) {
		let t = this.#o;
		return t === null ? null : {
			generation_anchor: A.parse(t.generation_anchor),
			source_anchor: A.parse(t.source_anchor),
			request_ids: [...t.request_ids].map((e) => ve.parse(e))
		};
	}
	target(e) {
		return this.#i.get(e) ?? null;
	}
	get active_session() {
		return this.#o;
	}
	get registry() {
		return this.#t;
	}
	#l(e) {
		if (e.phase !== "started") {
			if (e.phase === "stopped") {
				this.#u();
				return;
			}
			this.#e.get_active_chat().then((t) => {
				this.#a = t;
				let n = t.messages.find((t) => t.message_id === e.message_id);
				n?.role === "assistant" && !n.is_hidden && this.#u();
			}).catch(() => {
				this.#u();
			});
		}
	}
	#u() {
		this.#s || (this.#s = !0, this.#d());
	}
	async #d() {
		try {
			this.#a = await this.#e.get_active_chat();
		} catch {}
		this.#f();
	}
	#f() {
		this.#a.chat_id !== "" && (this.#o = this.#t.open({
			depth: 0,
			host_root_generation_id: this.#n(),
			source_context: ji(this.#a)
		}), this.#s = !1, this.#p());
	}
	#p() {
		let e = this.#o;
		if (e === null || !this.#r()) {
			this.#e.set_trigger_injection(null);
			return;
		}
		let t = this.#e.capabilities.native_tool_manager?.available === !0 ? "native_tool" : "fallback_comment";
		this.#e.set_trigger_injection(Wt(t, e.generation_anchor).host_injection);
	}
}, Hi = class {
	module_id = "automatic_generation_session";
	requires = [];
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	start() {
		return this.#e.start(), this.#t.start(), Promise.resolve();
	}
	stop() {
		return this.#t.stop(), this.#e.stop(), Promise.resolve();
	}
}, Ui = class {
	#e;
	constructor(e) {
		this.#e = e;
	}
	enqueue(e) {
		let t = this.#e.provider_id();
		if (t === null) throw Error("No provider profile is active, so an automatic image cannot be generated");
		let n = this.#e.targets.target(e.generation_anchor);
		if (n === null) throw Error(`Generation anchor ${e.generation_anchor} has no chat target to attach to`);
		let r = this.#e.model_id(), i = ot({
			provider_id: t,
			positive_prompt: e.arguments.scene_description,
			negative_prompt: e.arguments.negative_constraints ?? "",
			image_count: e.arguments.image_count ?? 1,
			references: [],
			...r === null ? {} : { model_id: r }
		}, e.request_id, e.generation_anchor);
		this.#e.plans.register(e.request_id, {
			kind: "adapter",
			request: i
		}), this.#e.queue.enqueue({
			request_id: e.request_id,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor,
			chat_id: n.chat_id,
			requested_swipe_id: n.requested_swipe_id,
			provider_id: t,
			arguments: e.arguments,
			automatic: !0
		}).catch(() => {
			this.#e.plans.take(e.request_id);
		});
	}
}, Wi = class {
	#e;
	#t;
	#n = "";
	#r = null;
	constructor(e) {
		this.#e = e.host, this.#t = e.sessions;
	}
	start() {
		this.#r ??= this.#e.subscribe_generation((e) => {
			if (e.phase === "started") {
				this.#n = "";
				return;
			}
			if (e.phase === "ended") {
				let t = e.message_id;
				queueMicrotask(() => {
					this.#i(t);
				});
			}
		});
	}
	stop() {
		let e = this.#r;
		this.#r = null, this.#n = "", e?.();
	}
	append(e) {
		this.#n += e;
	}
	async #i(e) {
		let t = this.#n;
		this.#n = "";
		let n = this.#t.active_session;
		if (t.length === 0 || n === null) return;
		let r;
		try {
			let i = (await this.#e.get_active_chat()).messages.find((t) => t.message_id === e);
			if (r = i?.swipes.find((e) => e.swipe_id === i.active_swipe_id), r === void 0 || !r.content.includes("<!-- tavern-canvas:image ")) return;
			await this.#e.update_message({
				message_id: e,
				swipe_id: r.swipe_id,
				content: t,
				metadata: Ne.parse({
					schema_version: 1,
					generation_anchor: n.generation_anchor,
					source_anchor: n.source_anchor,
					request_ids: [...n.request_ids],
					image_ids: []
				}),
				media: Li(r).map((e) => ({ ...e }))
			});
		} catch {}
	}
};
//#endregion
//#region src/modules/generation/generation_trigger_module.ts
function Gi(e) {
	if (e.length > 0) throw AggregateError(e, "Generation trigger cleanup failed");
}
var Ki = class {
	module_id = "generation_trigger";
	requires = [];
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	constructor(e) {
		this.#e = e.host, this.#t = e.request_image_tool, this.#n = e.session_port, this.#r = e.fallback_text_sink, this.#i = e.is_auto_generation_enabled;
	}
	start() {
		return this.#a === null && (this.#a = this.#e.subscribe_generation((e) => {
			this.#s(e);
		})), Promise.resolve();
	}
	stop() {
		let e = [], t = this.#a;
		if (this.#a = null, t !== null) try {
			t();
		} catch (t) {
			e.push(t);
		}
		try {
			this.#l();
		} catch (t) {
			e.push(t);
		}
		return Gi(e), Promise.resolve();
	}
	#s(e) {
		if (e.phase === "started") {
			e.dry_run || this.#c(e);
			return;
		}
		this.#l();
	}
	#c(e) {
		this.#l();
		let t = this.#n.begin(e);
		try {
			if (this.#e.capabilities.native_tool_manager?.available === !0) {
				let e = this.#t.definition, n = {
					name: e.name,
					display_name: e.display_name,
					description: e.description,
					parameters: e.parameters,
					stealth: e.stealth,
					execute: (e) => JSON.stringify(this.#t.execute(t.host_root_generation_id, e))
				};
				this.#o = {
					session: t,
					dispose_trigger: this.#e.register_image_tool(n),
					parser: null
				};
				return;
			}
			let e = new It(t.generation_anchor, this.#i()), n = this.#e.subscribe_generation_chunk((n) => {
				let r = e.push(n);
				this.#r.append(r.cleaned_text);
				for (let e of r.requests) this.#t.execute(t.host_root_generation_id, e);
			});
			this.#o = {
				session: t,
				dispose_trigger: n,
				parser: e
			};
		} catch (e) {
			throw this.#n.complete(t), e;
		}
	}
	#l() {
		let e = this.#o;
		if (e === null) return;
		this.#o = null;
		let t = [];
		try {
			e.dispose_trigger();
		} catch (e) {
			t.push(e);
		}
		if (e.parser !== null) try {
			this.#r.append(e.parser.finish().cleaned_text);
		} catch (e) {
			t.push(e);
		}
		try {
			this.#n.complete(e.session);
		} catch (e) {
			t.push(e);
		}
		Gi(t);
	}
}, qi = "data-tavern-canvas-image-id", Ji = 500, Yi = 8;
function Xi(e) {
	let t = e.getAttribute(qi);
	if (t === null) return null;
	let n = _e.safeParse(t);
	return n.success ? n.data : null;
}
function Zi(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(`[${qi}]`);
	return t === null ? null : Xi(t);
}
function Qi(e, t) {
	return e instanceof Error ? e.message : t;
}
var $i = class {
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
		this.#e = e.globals, this.#t = e.port, this.#n = e.connect ?? In;
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
				reason: Qi(e, "TauriTavern connection failed")
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
				reason: Qi(e, "TauriTavern ChatSurface registration failed")
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
			let t = Zi(e.target);
			t !== null && l("click", t);
		}
		function d(e) {
			let t = Zi(e.target);
			t !== null && l("double_click", t);
		}
		function f(e) {
			let t = Zi(e.target);
			t !== null && (e.preventDefault(), l("context", t));
		}
		function p(e) {
			let t = Zi(e.target);
			t !== null && (a = {
				x: e.clientX,
				y: e.clientY
			}, o = t, s = !1, i = setTimeout(() => {
				o !== null && (s = !0, l("long_press", o));
			}, Ji));
		}
		function m(e) {
			if (a === null) return;
			let t = Math.abs(e.clientX - a.x), n = Math.abs(e.clientY - a.y);
			(t > Yi || n > Yi) && c();
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
};
//#endregion
//#region src/modules/tauri/world_info_activation_module.ts
function ea(e, t) {
	return e instanceof Error ? e.message : t;
}
var ta = class {
	module_id = "tauri_world_info_activation";
	requires = [];
	#e;
	#t;
	#n = null;
	#r = {
		tauri_world_info_activation_available: !1,
		reason: "not started"
	};
	#i = /* @__PURE__ */ new Set();
	#a = null;
	#o = null;
	constructor(e) {
		this.#e = e.globals, this.#t = e.connect ?? In;
	}
	get diagnostics() {
		return this.#r;
	}
	async start() {
		if (this.#n === null) {
			if (this.#o !== null) {
				await this.#o;
				return;
			}
			this.#o = this.#s();
			try {
				await this.#o;
			} finally {
				this.#o = null;
			}
		}
	}
	async #s() {
		let e;
		try {
			e = await this.#t(this.#e);
		} catch (e) {
			this.#r = {
				tauri_world_info_activation_available: !1,
				reason: ea(e, "TauriTavern connection failed")
			};
			return;
		}
		if (e === void 0) {
			this.#r = {
				tauri_world_info_activation_available: !1,
				reason: "TauriTavern is not present on this host"
			};
			return;
		}
		try {
			this.#a = await e.subscribe_world_info_activation((e) => {
				for (let t of this.#i) t(e);
			}), this.#n = e, this.#r = { tauri_world_info_activation_available: !0 };
		} catch (e) {
			this.#r = {
				tauri_world_info_activation_available: !1,
				reason: ea(e, "TauriTavern WorldInfo activation subscription failed")
			};
		}
	}
	async stop() {
		let e = this.#a;
		this.#a = null, this.#n = null, this.#r = {
			tauri_world_info_activation_available: !1,
			reason: "stopped"
		}, e !== null && await e();
	}
	async get_last_activation() {
		return this.#n === null ? null : this.#n.get_last_world_info_activation();
	}
	subscribe(e) {
		return this.#i.add(e), () => {
			this.#i.delete(e);
		};
	}
}, na = "tavern_canvas", ra = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), ia = new Set(Object.keys(k.shape)), aa = new Set(Object.keys(Oe.shape)), oa = new Set(Object.keys(ye.shape)), sa = {
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
function ca(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function la() {
	return structuredClone(sa);
}
function ua(e) {
	return JSON.stringify(e);
}
function da(e) {
	try {
		let t = ua(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function fa(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = ra.has(i) ? "disallowed_category" : "unknown_field";
		r.push({
			path: e,
			code: a
		});
	}
}
function U(e, t, n, r, i) {
	let a = e.safeParse(t);
	return a.success ? a.data : (i.push({
		path: r,
		code: "invalid_value"
	}), n);
}
function pa(e, t, n) {
	if (!ca(e)) return e !== void 0 && n.push({
		path: t,
		code: "invalid_value"
	}), {};
	let { keyType: r, valueType: i } = Oe.shape.http_acknowledgments, a = {};
	for (let [o, s] of Object.entries(e)) {
		let e = r.safeParse(o), c = i.safeParse(s);
		e.success && c.success ? a[e.data] = c.data : n.push({
			path: `${t}.${o}`,
			code: "invalid_value"
		});
	}
	return a;
}
function ma(e, t) {
	let n = sa.gateway;
	return ca(e) ? (fa(e, aa, "gateway", t), {
		endpoint: U(Oe.shape.endpoint, e.endpoint, n.endpoint, "gateway.endpoint", t),
		token_secret_id: U(Oe.shape.token_secret_id, e.token_secret_id, n.token_secret_id, "gateway.token_secret_id", t),
		http_acknowledgments: pa(e.http_acknowledgments, "gateway.http_acknowledgments", t)
	}) : (e !== void 0 && t.push({
		path: "gateway",
		code: "invalid_value"
	}), { ...n });
}
function ha(e, t) {
	let n = sa.ui;
	return ca(e) ? (fa(e, oa, "ui", t), {
		color_mode: U(ye.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: U(ye.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: U(ye.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: U(ye.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function ga(e, t) {
	if (e === void 0) return la();
	let n = da(e);
	if (n === null || n > 65536) return t.push({
		path: na,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), la();
	if (!ca(e)) return t.push({
		path: na,
		code: "invalid_value"
	}), la();
	fa(e, ia, "", t);
	let r = sa;
	return {
		schema_version: U(k.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: U(k.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: U(k.shape.locale, e.locale, r.locale, "locale", t),
		active_provider_profile_id: U(k.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: U(k.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: U(k.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		fallback_generation_enabled: U(k.shape.fallback_generation_enabled, e.fallback_generation_enabled, r.fallback_generation_enabled, "fallback_generation_enabled", t),
		gateway: ma(e.gateway, t),
		ui: ha(e.ui, t)
	};
}
function _a(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = ga(t[na], i);
	t[na] = a;
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
		return a = e, t[na] = a, o = !0, l(), a;
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
			return u(k.parse(t));
		},
		replace_settings(e) {
			return u(k.parse(e));
		},
		flush: c,
		async stop() {
			await c();
		}
	};
}
//#endregion
//#region src/transport/host_proxy_transport.ts
var W = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function va(e) {
	try {
		if (!ba(e)) throw G("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !xa(a) || !xa(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw G("Provider operation is invalid");
		if (lt(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw G("Provider operation is invalid");
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
		throw e instanceof W ? e : G("Provider operation is invalid", e);
	}
}
function ya(e) {
	try {
		if (!ba(e)) throw G("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw G("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(dt);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw G("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof W ? e : G("Remote provider asset operation is invalid", e);
	}
}
function ba(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function xa(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function G(e, t) {
	return new W("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/browser_fetch.ts
async function Sa(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new ut({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new W("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await Ca(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function Ca(e, t, n) {
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
			if (a += s.byteLength, a > t) throw new W("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof W ? e : new ut({ cause: e });
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
var wa = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = va(e), n = Da(this.#e, t.route), r = await Oa(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await Ea(Sa(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(ct({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = ya(e);
		return Sa(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Ta = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e.secrets, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	async execute(e) {
		let t = me(e.provider_kind);
		if (t === null) throw new W("configuration", "This LLM dialect has no direct route catalog entry");
		let n = Da(t, e.route), r = await Oa(t, e.credential_reference, this.#e, e.body === void 0 ? { accept: "application/json" } : {
			"content-type": "application/json",
			accept: "application/json"
		}), i = await Ea(Sa(this.#t, n, {
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
async function Ea(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof ut ? new ut() : e;
	}
}
function Da(e, t) {
	try {
		return oe(e, t);
	} catch (e) {
		throw e instanceof xe ? new W("configuration", e.message) : e;
	}
}
async function Oa(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new W("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new W("configuration", ka(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function ka(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from host secret storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var Aa = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = dt(e.base_url);
		} catch (e) {
			throw new W("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!ft(t)) throw new W("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = va(e);
		return Sa(this.#t, `${this.#e}${t.route}`, {
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
		let t = ya(e);
		return Sa(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, ja = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function Ma(e) {
	if (e.gateway_endpoint !== null) {
		let t = Pa(e.gateway_endpoint);
		if (pt(t) && !mt(e.http_acknowledgments, t)) throw new ja("Cleartext Gateway origin has not been acknowledged");
		return {
			kind: "gateway",
			endpoint: t
		};
	}
	if (e.tauri_provider_available) return { kind: "tauri" };
	if (e.sillytavern_available) return { kind: "host_proxy" };
	let t = Na(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Pa(e.direct_provider_base_url);
		if (!ft(t)) throw new ja("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new ja("No provider transport is available");
}
function Na(e) {
	if (e === null || Me(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new ja("This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway");
	if (!e.secrets_readable) throw new ja("This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Pa(e) {
	try {
		return dt(e);
	} catch (e) {
		throw new ja("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capability_resolution.ts
function Fa(e) {
	return {
		status: "available",
		value: e
	};
}
function K(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function q(e) {
	try {
		return Fa(e());
	} catch (e) {
		return K(Ia(e));
	}
}
function Ia(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function La(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var Ra = "capability_unavailable";
function J(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: Ra }), t;
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function Y(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function X(e) {
	return Y(e.payload);
}
function Z(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function za(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function Ba(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function Va(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function Ha(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function Ua(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => Ua(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = Ua(i, n));
	return r;
}
var Q = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, Wa = "No v3 store exists for this asset category yet; character, vibe and workflow assets are stored, the rest are not.", Ga = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"reference",
	"workflow"
];
function Ka(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit":
		case "lora":
		case "reference": return null;
	}
}
function qa(e, t) {
	let n = X(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: Z(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function Ja(e, t) {
	let n = Va(X(e), "order", 2 ** 53 - 1), r = Va(X(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function Ya(e) {
	let t = new Q();
	function n(t) {
		let n = Ka(e.repositories, t);
		if (n === null) throw J(Wa);
		return n;
	}
	async function r(t) {
		let n = Ka(e.repositories, t);
		return n === null ? [] : [...await n.list(e.namespace())].sort(Ja).map((e) => qa(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(Ga.map(async (e) => [e, await r(e)]));
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
				payload: Ua({
					...i.payload,
					display_name: i.display_name
				})
			};
			await a.put(o, l);
			let u = qa(l, r);
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
					payload: Ua({
						...X(n),
						order: e
					})
				});
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/diagnostics_capability.ts
var Xa = 500, Za = class {
	#e = [];
	#t = new Q();
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
		this.#e.push(t), this.#e.length > Xa && this.#e.shift(), this.#t.emit({
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
function Qa(e) {
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
function $a(e) {
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
					...Qa(e.settings()),
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
function eo(e) {
	switch (e.media_type) {
		case "image/png":
		case "image/jpeg":
		case "image/webp": return e.media_type;
		case "video/mp4": return null;
	}
}
function to(e) {
	let t = eo(e);
	if (t === null) return null;
	let n = j.parse(e.provider_id);
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
function no(e) {
	let t = new Q();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw J(`Gallery record ${t} no longer exists`);
		return n;
	}
	async function r(n) {
		await e.repository.put(e.namespace(), n);
		let r = to(n);
		r !== null && t.emit({
			type: "record_upserted",
			record: r
		});
	}
	async function i(n) {
		await Ei(e.database, e.namespace(), n), t.emit({
			type: "record_removed",
			record_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).flatMap((e) => {
				let t = to(e);
				return t === null ? [] : [t];
			});
		},
		subscribe: (e) => t.subscribe(e),
		async read_bytes(t) {
			let r = await n(t), i = await Di(e.database, r.sha256);
			if (i === null) throw J(`Gallery record ${t} has no stored bytes; the blob was evicted`);
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
function ro(e) {
	return e.image_count ?? 1;
}
function io(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: j.parse(e.provider_id),
		state: e.state,
		image_count: ro(e.arguments),
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function ao(e) {
	return {
		job_id: e.id,
		request_id: e.request_id,
		provider_id: j.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function oo(e) {
	let t = new Q(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: io(e)
		});
	});
	async function r(t) {
		let r = await e.origin.resolve(), i = await Ie({
			queue: e.queue,
			plans: e.plans
		}, {
			...r,
			scene_description: t.prompt
		}, t);
		return n.set(i.job_id, t), io(i);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map(ao);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return io(await Pe({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw J(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
			return r({
				...i,
				request_id: e.new_request_id()
			});
		}
	};
}
//#endregion
//#region src/modules/llm/llm_connection_service.ts
var so = 1e6, co = class extends Error {
	code = "unknown_llm_connection";
	constructor(e) {
		super(`Unknown LLM connection "${e}"`), this.name = "UnknownLlmConnectionError";
	}
}, lo = class extends Error {
	code = "credential_probe_failed";
	constructor(e) {
		super(`credential_probe_failed: the vault did not confirm "${e}"`), this.name = "LlmCredentialProbeError";
	}
};
function uo(e) {
	return e === 401 || e === 402 || e === 403 ? "auth_failed" : e === 429 ? "rate_limited" : e === 408 ? "timed_out" : e >= 400 && e < 500 ? "invalid_request" : "provider_unavailable";
}
function fo(e, t, n) {
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
function po(e) {
	let t = e.payload ?? {};
	return se.parse({
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
var mo = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(po);
	}
	async save(e) {
		let t = ce.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		let r = fe(this.#e.namespace, e);
		if (!this.#e.secrets.supports("llm_profile_api_key")) throw TypeError("The host secret vault does not accept LLM connection credentials");
		if (await this.#e.secrets.write_secret(r, t), !await this.#e.secrets.probe_secret(r).catch(() => !1)) throw new lo(r);
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
				route: ho(t.provider_kind),
				method: "GET",
				credential_reference: t.credential_reference,
				max_response_bytes: so,
				signal: AbortSignal.timeout(15e3)
			});
			return e.status < 200 || e.status >= 300 ? {
				status: "failed",
				code: uo(e.status)
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
		if (t === null) throw new co(e);
		return po(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, fo(e, this.#e.namespace, t)), this.#a({
			type: "connection_upserted",
			connection: e
		});
	}
	async #i(e, t) {
		let n = await this.#e.repository.list(this.#e.namespace);
		for (let r of n) {
			if (r.id === e) continue;
			let n = po(r);
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
function ho(e) {
	return he[e].models_route;
}
//#endregion
//#region src/modules/library/knowledge_service.ts
var go = class extends Error {
	code = "unknown_knowledge_entry";
	constructor(e) {
		super(`Unknown knowledge entry "${e}"`), this.name = "UnknownKnowledgeEntryError";
	}
};
function _o(e, t, n) {
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
function vo(e) {
	let t = e.payload ?? {};
	return ae.parse({
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
var yo = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(vo).sort((e, t) => t.priority - e.priority === 0 ? e.title.localeCompare(t.title) : t.priority - e.priority);
	}
	async save(e) {
		let t = Ee.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new go(e);
		return vo(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, _o(e, this.#e.namespace, t)), this.#i({
			type: "entry_upserted",
			entry: e
		});
	}
	#i(e) {
		for (let t of this.#t) t(e);
	}
}, bo = "persona", xo = class extends Error {
	code = "unknown_persona";
	constructor(e) {
		super(`Unknown persona "${e}"`), this.name = "UnknownPersonaError";
	}
};
function So(e) {
	let t = e.payload;
	return typeof t == "object" && !!t && !Array.isArray(t) && t.record_kind === bo;
}
function Co(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		payload: {
			record_kind: bo,
			display_name: e.display_name,
			role: e.role,
			description: e.description,
			greeting: e.greeting,
			avatar_image_id: e.avatar_image_id,
			is_active: e.is_active
		}
	};
}
function wo(e) {
	let t = e.payload ?? {};
	return de.parse({
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
var To = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).filter(So).map(wo);
	}
	async save(e) {
		let t = Te.parse(e), n = await this.#r(t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new xo(e);
		return t;
	}
	async #r(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		return t === null || !So(t) ? null : wo(t);
	}
	async #i(e, t) {
		await this.#e.repository.put(this.#e.namespace, Co(e, this.#e.namespace, t)), this.#o({
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
function Eo(e) {
	let t = new mo(e);
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
function Do(e) {
	let t = new To(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		remove: (e) => t.remove(e)
	};
}
function Oo(e) {
	let t = new yo(e);
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
//#region src/bootstrap/capabilities/migration_capability.ts
var ko = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
};
function Ao(e) {
	let t = new Q(), n = _t(e.database);
	async function r() {
		if (await n.load("migration:not_required") !== null) return ko;
		let e = await i();
		if (e === null) return ko;
		let t = Y(e.payload), r = Y(t.counts);
		return {
			state: e.state,
			counts: Object.fromEntries(Object.keys(r).map((e) => [e, Va(r, e, 0)])),
			warnings: Ha(t, "warnings").flatMap((e) => {
				let t = Y(e).message;
				return typeof t == "string" ? [t] : [];
			}),
			failure_reason: typeof Y(t.failure).reason == "string" ? String(Y(t.failure).reason) : null,
			failure_message: typeof Y(t.failure).message == "string" ? String(Y(t.failure).message) : null
		};
	}
	async function i() {
		let t = (await e.database.getAll("migration_journal")).filter((e) => e.migration_id.startsWith(vt)).filter((e) => e.migration_id !== gt).sort((e, t) => e.updated_at < t.updated_at ? 1 : -1)[0];
		return t === void 0 ? null : {
			state: t.state,
			payload: t.payload
		};
	}
	return {
		load: r,
		subscribe: (e) => t.subscribe(e),
		async retry() {
			let { run_migration: n } = await import("./chunks/migration_runner-BXVEP4ly.js");
			await n({
				database: e.database,
				settings: e.settings,
				legacy_source: e.legacy_source,
				image_resolver: e.image_resolver,
				secret_destination: e.secrets
			});
			let i = await r();
			return t.emit({
				type: "state_changed",
				snapshot: i
			}), i;
		},
		confirm_legacy_cleanup() {
			return Promise.reject(J("Legacy v2 data cleanup is not implemented; remove the v2 extension manually once the migration reports completed."));
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/profiles_capability.ts
var jo = "vault_key", Mo = "provider_profile";
function No(e) {
	return {
		...Y(X(e)[Mo]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function Po(e) {
	let t = X(e);
	return {
		id: e.id,
		provider_id: j.parse(e.provider_id),
		display_name: Z(t, "display_name", e.id),
		is_default: Ba(t, "is_default", !1),
		updated_at: e.updated_at
	};
}
function Fo(e) {
	let t = new Q();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw J(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(Po);
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
					...X(i ?? { payload: {} }),
					display_name: n.display_name,
					is_default: n.is_default,
					...n.secret_reference === null ? {} : { [jo]: n.secret_reference }
				}
			};
			await e.repository.put(r, o);
			let s = Po(o);
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
			let r = Date.now(), i = await n(t), a = j.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(No(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof st ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = X(i)[jo];
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
function Io(e, t) {
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
function Lo(e, t) {
	return Io(t, e).text;
}
//#endregion
//#region src/bootstrap/capabilities/prompt_presets_capability.ts
function Ro(e) {
	let t = X(e);
	return {
		id: e.id,
		display_name: Z(t, "display_name", e.id),
		group: za(t, "group"),
		updated_at: e.updated_at
	};
}
function zo(e) {
	return e.flatMap((e) => {
		let t = Y(e), n = za(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: Ha(t, "triggers").filter((e) => typeof e == "string"),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function Bo(e) {
	return e.flatMap((e) => {
		let t = Y(e), n = za(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: Z(t, "pattern", ""),
			flags: Z(t, "flags", ""),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function Vo(e) {
	let t = new Q();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(Ro);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw J(`Prompt preset ${t} no longer exists`);
			let r = X(n);
			return {
				id: n.id,
				display_name: Z(r, "display_name", n.id),
				group: za(r, "group"),
				fixed_positive_prompt: Z(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: Z(r, "fixed_negative_prompt", ""),
				replacement_rules: zo(Ha(r, "replacement_rules")),
				regex_rules: Bo(Ha(r, "regex_rules"))
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
				payload: Ua({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = Ro(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(Lo(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var Ho = class {
	#e = "bundled";
	get() {
		return this.#e;
	}
	set(e) {
		this.#e = e;
	}
}, Uo = "This host exposes no secret vault, so a Gateway token cannot be stored anywhere but the page";
function Wo(e) {
	if (e === null) throw J("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function Go(e) {
	let t = new Q();
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
				http_acknowledgments: ht(n.gateway.http_acknowledgments, t, (/* @__PURE__ */ new Date()).toISOString())
			} }), e.settings.flush();
		},
		async set_gateway_token(t) {
			if (e.secrets === null) throw J(Uo);
			let n = e.settings.get_settings(), i = je(n.active_namespace);
			return await e.secrets.write_secret(i, t), r({ gateway: {
				...n.gateway,
				token_secret_id: i
			} }), e.settings.flush();
		},
		clear_gateway_token() {
			return r({ gateway: {
				...e.settings.get_settings().gateway,
				token_secret_id: null
			} }), e.settings.flush();
		},
		set_vocabulary_update_channel(t) {
			return e.vocabulary_channel.set(t), Promise.resolve();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-DGfrfvR1.js");
			return t({
				database: Wo(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-DGfrfvR1.js");
			await n({
				database: Wo(e.database),
				archive: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function Ko(e) {
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
function qo(e) {
	let t = null, n = null;
	function r() {
		return t ??= e.load_catalog();
	}
	function i() {
		return n ??= e.create_client();
	}
	function a() {
		let e = n;
		n = null, e?.then((e) => {
			e.dispose();
		});
	}
	return {
		async load() {
			return (await r()).list();
		},
		async search(e, t) {
			return (await i()).search(e, t === void 0 ? {} : { category: t });
		},
		async next_page(e) {
			return (await i()).next_page(e);
		},
		async install(e, t) {
			await (await r()).install(e, (e) => {
				let n = Ko(e);
				n !== null && t?.(n);
			}), a();
		},
		cancel_install: () => {
			t?.then((e) => {
				e.cancel();
			});
		}
	};
}
//#endregion
//#region src/host/composite_host.ts
var Jo = class {
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
	set_trigger_injection(e) {
		this.#t.set_trigger_injection(e);
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
function Yo(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Xo(e) {
	let t = Yo(e, "SillyTavern"), n = Yo(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Zo(e, t) {
	let n = Yo(e, "TavernHelper"), r = Yo(e, "fetch"), i = Xo(e), a = Wn(n), o = vn(Yo(e, "SillyTavern"), r);
	if (!a.detected || !a.message_swipe_metadata || !o.main_generation_events || i === void 0 || typeof r != "function") return null;
	let s = new Cn(i, r);
	return new Jo(t, new $n(n, () => s.get_active_chat_id()), s);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function Qo(e) {
	return typeof e == "object" && !!e;
}
function $o(e, t) {
	if (!Qo(e)) return !1;
	let n = e[t];
	return Array.isArray(n) ? n.some((e) => Qo(e) && e.active === !0) : !1;
}
var es = class {
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
			headers: Sn(this.#e.getRequestHeaders()),
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
			headers: Sn(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return $o(n, e);
	}
};
function ts(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function ns(e, t) {
	return !ts(e) || typeof t != "function" ? null : new es(e, t);
}
//#endregion
//#region src/host/sillytavern_secret_resolver.ts
var rs = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, is = "SillyTavern refused to reveal the stored credential. Set allowKeysExposure to true in config.yaml to allow direct provider calls, or route this profile through the Gateway instead.", as = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve_secret(e) {
		if (!pe.safeParse(e).success) throw new rs("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/find", {
				method: "POST",
				headers: Sn(this.#e.getRequestHeaders()),
				body: JSON.stringify({ key: e })
			});
		} catch {
			throw new rs("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new rs("not_exposed", is) : t.status === 404 ? new rs("not_found", "The host vault holds no such credential") : new rs("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new rs("unavailable", "The host secret vault returned an unreadable response");
		}
		let r = typeof n == "object" && n ? n.value : void 0;
		if (typeof r != "string" || r.trim().length === 0) throw new rs("not_found", "The host vault holds no such credential");
		return r;
	}
};
function os(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function ss(e, t) {
	return !os(e) || typeof t != "function" ? null : new as(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
var cs = "st-chatu8";
function ls(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function us(e) {
	let t = ls(e, "SillyTavern"), n = ls(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function ds(e) {
	let t = us(e), n = ls(t, "extensionSettings"), r = ls(t, "saveSettingsDebounced");
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
function fs(e) {
	return ns(us(e), ls(e, "fetch"));
}
function ps(e) {
	return ss(us(e), ls(e, "fetch"));
}
function ms(e) {
	let t = ds(e);
	return t === null ? null : {
		read_settings: () => Promise.resolve(t.extension_settings[cs]),
		read_gallery_database: () => Promise.resolve(void 0)
	};
}
var hs = { resolve_host_image: () => Promise.resolve(null) };
function gs(e, t) {
	return Zo(e, t);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var $ = "IndexedDB could not be opened, so nothing that persists records can be composed", _s = "No usable SillyTavern + TavernHelper host pair was detected", vs = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", ys = "This host exposes no secret vault that both stores and reveals a credential, so a text-LLM connection could not be authenticated";
function bs() {
	return navigator.storage.estimate();
}
function xs() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"/workers/vocabulary_worker.js",
		"" + import.meta.url
	), { type: "module" });
}
async function Ss(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-DAD_BA41.js"), o = {
		novelai: new r(),
		sd_webui: new a(),
		openai_image: new i(),
		google_image: new n()
	};
	if (e !== null) {
		let n = Ze(e);
		o.comfyui = new t({ workflow_store: { async load(e) {
			return (await n.comfy_workflows.get("primary", e))?.payload;
		} } });
	}
	return o;
}
function Cs(e, t) {
	let n = new gi(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await Di(e, i.sha256);
		if (a === null) throw Error(`Source asset ${r} has no stored bytes`);
		if (i.media_type === "video/mp4") throw Error(`Source asset ${r} is a video and cannot be a provider input`);
		return {
			asset_id: r,
			media_type: i.media_type,
			bytes: a
		};
	} };
}
function ws(e) {
	return rt.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function Ts(e) {
	let t = Ha(Y(e.provider_profile), "model_allowlist")[0];
	return typeof t == "string" && t.length > 0 ? t : null;
}
function Es(e, t) {
	return {
		async put_image(n) {
			return { id: (await Ti(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: ws(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new gi(e).get(t(), n);
			if (r === null) return null;
			let i = await Di(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
async function Ds(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = gr(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(La(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(J(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = gs(t, s), l = [], u = s.tauri_chat_surface?.available === !0 ? new Ai() : new ki();
	u instanceof Ai && l.push(new $i({
		globals: t,
		port: u
	})), s.tauri_world_info_activation?.available === !0 && l.push(new ta({ globals: t }));
	let d = null;
	try {
		d = await (e.open_storage ?? et)();
	} catch {
		d = null;
	}
	let f = ds(t), p = new Ho(), m = f === null ? null : _a(f), h = () => m?.get_settings().active_namespace ?? "primary", g = () => (/* @__PURE__ */ new Date()).toISOString(), _ = fs(t), v = ps(t), y = d === null ? null : Ze(d), b = new Za(), ee = null, te = () => ee ??= Ss(d), x = () => m?.get_settings().auto_generation_enabled ?? !1, S = c === null ? null : new Vi({
		host: c,
		sessions: new zt(new Et(globalThis.crypto)),
		new_root_id: () => crypto.randomUUID(),
		is_auto_generation_enabled: x
	}), C = y === null || m === null ? null : await y.provider_profiles.get(h(), m.get_settings().active_provider_profile_id ?? "").catch(() => null), w = C === null ? {} : X(C), T = za(w, "base_url"), ne = Ts(w), E = C === null ? null : j.safeParse(C.provider_id).data ?? null, D = E === null ? null : {
		provider_id: E,
		credential_reference: za(w, jo),
		secrets_readable: v !== null
	}, re = o("settings", m === null ? K(vs) : q(() => Go({
		settings: m,
		database: d,
		extension_version: n,
		vocabulary_channel: p,
		secrets: _
	})), r.settings), O = o("profiles", y === null ? K($) : q(() => Fo({
		repository: y.provider_profiles,
		namespace: h,
		load_adapters: te,
		secrets: _,
		now: g
	})), r.profiles), ie = o("llm_connections", y === null ? K($) : _ === null || v === null ? K(ys) : q(() => Eo({
		repository: y.llm_connections,
		namespace: h(),
		secrets: _,
		transport: new Ta({
			secrets: v,
			...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
		}),
		clock: g
	})), r.llm_connections), ae = o("personas", y === null ? K($) : q(() => Do({
		repository: y.character_profiles,
		namespace: h(),
		clock: g
	})), r.personas), oe = o("knowledge", y === null ? K($) : q(() => Oo({
		repository: y.knowledge_entries,
		namespace: h(),
		clock: g
	})), r.knowledge), se = o("prompt_presets", y === null ? K($) : q(() => Vo({
		repository: y.prompt_presets,
		namespace: h,
		now: g,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), ce = o("assets", y === null ? K($) : q(() => Ya({
		repositories: y,
		namespace: h,
		now: g
	})), r.assets), le = o("gallery", d === null ? K($) : q(() => no({
		database: d,
		repository: new gi(d),
		namespace: h,
		now: g
	})), r.gallery);
	function ue(e, t, n) {
		if (c === null) return;
		let r = new Wi({
			host: c,
			sessions: n
		});
		l.push(new Hi(n, r), new Ki({
			host: c,
			request_image_tool: new Ht(n.registry, new Bt(), new Ui({
				queue: e,
				plans: t,
				targets: n,
				provider_id: () => E,
				model_id: () => ne
			})),
			session_port: n,
			fallback_text_sink: r,
			is_auto_generation_enabled: x
		}));
	}
	let de = o("generation", d === null ? K($) : c === null ? K(_s) : q(() => {
		let t = m?.get_settings().gateway ?? null, n = Ma({
			gateway_endpoint: t?.endpoint ?? null,
			http_acknowledgments: t?.http_acknowledgments ?? {},
			tauri_provider_available: !1,
			sillytavern_available: !1,
			direct_provider_base_url: T,
			direct_cloud: D
		}), r = new Fe(), i = {
			store: Es(d, h),
			ids: { next: () => crypto.randomUUID() },
			clock: { now: g },
			resolve_source_message: (e) => ({
				chat_id: e.chat_id,
				message_id: String(e.requested_swipe_id),
				swipe_id: e.requested_swipe_id
			})
		}, o = new en({
			executor: n.kind === "gateway" ? Ms({
				...i,
				endpoint: n.endpoint,
				http_acknowledgments: t?.http_acknowledgments ?? {},
				access_token: js(t?.token_secret_id ?? null, v),
				plans: r,
				...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
			}) : new Le({
				...i,
				load_adapters: te,
				profiles: { resolve: async (e) => {
					let t = (await te())[e];
					if (t === void 0 || C === null) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(No(C));
				} },
				transport: Os(n, {
					secrets: v,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				}),
				assets: Cs(d, h),
				log: { write: () => {} },
				plans: r
			}),
			persistence: new ze(d, h()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new Gt(),
			global_concurrency: m?.get_settings().global_concurrency ?? 1
		});
		a.push(b.observe_jobs(o));
		let s = e.message_port ?? (S === null ? null : new Ri(c, S));
		if (s !== null) {
			let e = new an(o, s);
			e.start(), a.push(() => {
				e.stop();
			});
		}
		S !== null && ue(o, r, S);
		let l = new Bt();
		return oo({
			queue: o,
			plans: r,
			jobs: Ze(d).generation_jobs,
			namespace: h,
			origin: new Mi(c, new Et(globalThis.crypto)),
			new_request_id: () => l.next()
		});
	}), r.generation), fe = e.create_vocabulary_worker === void 0 ? xs() : e.create_vocabulary_worker, pe = o("vocabulary", d === null ? K($) : fe === null ? K("This host has no Worker constructor, so vocabulary search cannot run") : q(() => qo({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-BYMGmM49.js");
			return new e({
				current_extension_version: n,
				open_database_impl: () => Promise.resolve(d)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-DjFC_xSW.js");
			return new e({ create_worker: fe });
		}
	})), r.vocabulary), me = o("migration", d === null ? K($) : m === null ? K(vs) : q(() => {
		let e = ms(t);
		if (e === null) throw Error(vs);
		return Ao({
			database: d,
			settings: m,
			legacy_source: e,
			image_resolver: hs,
			secrets: _
		});
	}), r.migration);
	return {
		capabilities: {
			generation: de,
			profiles: O,
			prompt_presets: se,
			assets: ce,
			gallery: le,
			vocabulary: pe,
			diagnostics: o("diagnostics", q(() => $a({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: b,
				resolutions: () => i,
				settings: () => m?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? bs,
				extension_version: n,
				probe_gateway: null
			})), r.diagnostics),
			migration: me,
			settings: re,
			llm_connections: ie,
			personas: ae,
			knowledge: oe
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
function Os(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = Me(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new wa({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new Aa({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
		default: throw Error(`The selected ${e.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`);
	}
}
var ks = "A Gateway endpoint is configured but no Gateway access token is stored; set one in Settings > Gateway, or clear the endpoint to generate directly", As = "This host cannot reveal stored credentials, so the Gateway access token cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml, or clear the Gateway endpoint to generate directly";
function js(e, t) {
	if (e === null) throw Error(ks);
	if (t === null) throw Error(As);
	return () => t.resolve_secret(e);
}
function Ms(e) {
	let t = null;
	return { async execute(n, r) {
		let { GatewayJobExecutor: i } = await (t ??= import("./chunks/gateway_job_executor-Cu4TpfHn.js"));
		return new i(e).execute(n, r);
	} };
}
//#endregion
//#region src/bootstrap/startup_error.ts
var Ns = "https://github.com/N0VI028/JS-Slash-Runner";
function Ps(e) {
	if (e.ready) return {
		state: "ready",
		title: "TavernCanvas ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${er} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: Ns
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `TavernCanvas could not verify the installed version. ${t}`,
			update_url: Ns
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: Ns
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: Ns
		};
	}
}
function Fs() {
	return {
		state: "failed",
		title: "TavernCanvas could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function Is(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = ur(n), i, a, o = null, s = !1;
	try {
		o = await Ds({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new xt([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = Ps(r);
	else if (s) i = "failed", a = Fs();
	else try {
		await c?.start_all(), i = "ready", a = Ps(r);
	} catch {
		i = "failed", a = Fs();
	}
	let l = fi(t, e.stylesheet ?? ""), u = Be(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = _(di, {
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
var Ls = ":host{--tc-canvas:#f4f5f7;--tc-surface:#fff;--tc-surface-raised:#f8f9fb;--tc-text:#181a1f;--tc-text-muted:#616773;--tc-divider:#d8dce3;--tc-accent:#2457d6;--tc-accent-hover:#1f49b8;--tc-success:#16815d;--tc-warning:#9a6700;--tc-error:#c23838;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#111318;--tc-surface:#181b21;--tc-surface-raised:#20242b;--tc-text:#f4f5f7;--tc-text-muted:#aeb4bf;--tc-divider:#343a44;--tc-accent:#6f91ff;--tc-accent-hover:#7d9cff;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", Rs = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);position:fixed;inset:0}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", zs = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", Bs = "@keyframes _tc-icon-rotate_k9i16_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_k9i16_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_k9i16_42{width:28px;height:28px}._iconButtonMd_k9i16_47{width:32px;height:32px}._iconButtonLg_k9i16_52{width:40px;height:40px}._iconButton_k9i16_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_k9i16_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_k9i16_65{color:var(--tc-error)}._iconButtonDestructive_k9i16_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_k9i16_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_k9i16_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_k9i16_84:disabled{opacity:.5}._appButtonContent_k9i16_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_k9i16_107{visibility:hidden}._appButtonLabel_k9i16_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_k9i16_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_k9i16_118 svg{animation:_tc-icon-rotate_k9i16_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_k9i16_130{border-color:var(--tc-accent);color:var(--tc-accent)}._appButtonPrimary_k9i16_130:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonSecondary_k9i16_139{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_k9i16_139:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_k9i16_148{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_k9i16_148:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_k9i16_161{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_k9i16_170{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_k9i16_170:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_k9i16_170[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_k9i16_191{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_k9i16_202{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_k9i16_202[data-disabled]{cursor:not-allowed}._switchLabelGroup_k9i16_214{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_k9i16_214{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_k9i16_226{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_k9i16_232{border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);border-color:var(--tc-divider);flex:none;width:40px;height:24px;position:relative}._switchRoot_k9i16_232[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_k9i16_232:disabled{opacity:.5}._switchThumb_k9i16_251{border:1px solid var(--tc-text-muted);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;display:block;transform:translate(2px)}._switchThumb_k9i16_251[data-state=checked]{transform:translate(18px)}._numberStepper_k9i16_274{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_k9i16_283{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_k9i16_283:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_k9i16_283:disabled{color:var(--tc-text-muted)}._numberStepperInput_k9i16_301{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_k9i16_301:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_k9i16_320{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_k9i16_320:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_k9i16_320[data-placeholder]{color:var(--tc-text-muted)}._selectValue_k9i16_342{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_k9i16_351{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;overflow:hidden}._selectViewport_k9i16_360{padding:4px}._selectItem_k9i16_364{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;display:flex}._selectItem_k9i16_364[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_k9i16_364:focus-visible,._selectItem_k9i16_364:focus{outline-color:var(--tc-accent)}._selectItem_k9i16_364[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_k9i16_392{color:var(--tc-accent);display:inline-flex}._fieldGroup_k9i16_401{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_k9i16_407{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_k9i16_413{color:var(--tc-error)}._fieldGroupHint_k9i16_417{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_k9i16_424{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_k9i16_435{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_k9i16_442{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_k9i16_460{gap:16px}._dialogHeader_k9i16_464{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_k9i16_471{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_k9i16_478{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_k9i16_478:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_k9i16_491{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_k9i16_497{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_k9i16_503{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_k9i16_513{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_k9i16_524{fill:var(--tc-text)}._stateSurface_k9i16_532{flex-direction:column;display:flex}._stateSurfaceSkeleton_k9i16_537{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_k9i16_544{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_k9i16_550{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;display:flex}._stateSurfaceMessageText_k9i16_559{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_k9i16_566{color:var(--tc-error)}._stateSurfaceAction_k9i16_570{display:flex}._toastViewport_k9i16_578{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_k9i16_592{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_k9i16_603{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_k9i16_610{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_k9i16_616{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_k9i16_616:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_k9i16_631{border-color:var(--tc-success)}._toastSuccess_k9i16_631 ._toastTitle_k9i16_603{color:var(--tc-success)}._toastError_k9i16_639{border-color:var(--tc-error)}._toastError_k9i16_639 ._toastTitle_k9i16_603{color:var(--tc-error)}._virtualList_k9i16_651{position:relative;overflow-y:auto}._virtualListSizer_k9i16_656{width:100%;position:relative}._virtualListItem_k9i16_661{width:100%;position:absolute;top:0;left:0}", Vs = "._paramsBody_1gvv4_10{flex-direction:column;gap:16px;display:flex}._paramsDimensionRow_1gvv4_16{gap:12px;display:flex}._paramsDimensionRow_1gvv4_16>*{flex:1}._paramsAspectRow_1gvv4_25{align-items:flex-end;gap:12px;display:flex}._paramsAspectField_1gvv4_31{flex:1}._editBody_1gvv4_37{flex-direction:column;gap:16px;display:flex}._editTextareaWrap_1gvv4_43{position:relative}._editHighlightLayer_1gvv4_47{color:#0000;white-space:pre-wrap;word-break:break-word;font:inherit;pointer-events:none;margin:0;padding:8px 10px;position:absolute;inset:0;overflow:hidden}._editHighlightMatch_1gvv4_60{border-radius:var(--tc-radius-status);background-color:color-mix(in srgb, var(--tc-accent) 22%, transparent)}._editTextarea_1gvv4_43{resize:vertical;border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);width:100%;min-height:96px;color:var(--tc-text);font:inherit;background-color:#0000;padding:8px 10px;line-height:1.5;position:relative}._editTextarea_1gvv4_43:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._editTagActions_1gvv4_84{gap:8px;display:flex}._editSubmenu_1gvv4_89{grid-template-columns:repeat(2,1fr);gap:8px;display:grid}._editFooter_1gvv4_95{justify-content:flex-end;gap:8px;display:flex}._inpaintDialogContent_1gvv4_107{width:min(90vw,720px)}._inpaintBody_1gvv4_111{flex-direction:column;gap:12px;width:100%;display:flex}._inpaintCanvasFrame_1gvv4_121{width:100%;aspect-ratio:var(--tc-inpaint-aspect,1);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);touch-action:none;position:relative;overflow:hidden}._inpaintCanvasFrame_1gvv4_121 canvas{width:100%;height:100%;position:absolute;inset:0}._inpaintToolbar_1gvv4_139{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._inpaintToolbarDivider_1gvv4_146{background-color:var(--tc-divider);align-self:stretch;width:1px;margin:0 4px}._inpaintBrushRow_1gvv4_153{align-items:center;gap:12px;display:flex}._inpaintBrushRow_1gvv4_153>*{flex:1}._inpaintPromptGrid_1gvv4_163{grid-template-columns:1fr 1fr;gap:12px;display:grid}._inpaintFooter_1gvv4_169{justify-content:flex-end;gap:8px;display:flex}._inpaintDimensionError_1gvv4_175{color:var(--tc-error);margin:0;font-size:12px}", Hs = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", Us = "._shell_1800z_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1800z_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1800z_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1800z_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1800z_57{border-bottom:1px solid var(--tc-divider);grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:12px;display:flex}._top_bar_start_1800z_68,._top_bar_end_1800z_69{align-items:center;gap:4px;min-width:0;display:flex}._top_bar_title_1800z_76{white-space:nowrap;text-overflow:ellipsis;min-width:0;font-weight:600;overflow:hidden}._icon_button_1800z_84{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._icon_button_1800z_84[data-selected=true],._icon_button_1800z_84[aria-pressed=true]{color:var(--tc-accent)}._rail_1800z_100{border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:4px;padding-block:12px;display:flex;overflow-y:auto}._rail_button_1800z_111{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1800z_111[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1800z_130{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1800z_138{grid-area:workspace;min-width:0;min-height:0;overflow:auto}._workspace_placeholder_1800z_145{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_1800z_154{border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1800z_162{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1800z_162:hover,._inspector_resizer_1800z_162[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1800z_175{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1800z_183{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1800z_192{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_1800z_200{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_1800z_200{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_1800z_200 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_1800z_200 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_1800z_226{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1800z_234{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1800z_234[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1800z_250{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._more_menu_content_1800z_258{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);min-width:176px;padding:4px}._more_menu_item_1800z_266{color:var(--tc-text);border-radius:var(--tc-radius-field);align-items:center;gap:8px;padding:8px 10px;display:flex}._more_menu_item_1800z_266[data-highlighted]{color:var(--tc-accent);background-color:var(--tc-surface);outline:none}._sheet_overlay_1800z_281{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1800z_288{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1800z_302{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1800z_314{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1800z_323{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1800z_41{border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1800z_339{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1800z_347{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1800z_356{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1800z_363{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1800z_375{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1800z_375[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1800z_375[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1800z_375[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1800z_395{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1800z_402{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1800z_407{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1800z_419{background-color:var(--tc-canvas);height:100%;min-height:100dvh;color:var(--tc-text);flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex}._state_screen_eyebrow_1800z_431{color:var(--tc-text-muted)}._state_screen_title_1800z_435{max-width:56ch}._state_screen_action_1800z_439{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1800z_449{max-width:56ch;color:var(--tc-text-muted)}", Ws = "._assetsView_1lx1r_10{flex-direction:column;gap:16px;height:100%;min-height:0;padding:16px;display:flex}._tabsList_1lx1r_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;gap:4px;padding-bottom:0;display:flex}._tabsTrigger_1lx1r_31{border-radius:var(--tc-radius-field) var(--tc-radius-field) 0 0;color:var(--tc-text-muted);transition:color var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out;background-color:#0000;border:1px solid #0000;border-bottom-width:2px;padding:8px 14px;font-size:13px;font-weight:500}._tabsTrigger_1lx1r_31:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._tabsTrigger_1lx1r_31[data-state=active]{color:var(--tc-accent);border-bottom-color:var(--tc-accent)}._tabsContent_1lx1r_55{flex:1;min-height:0;overflow-y:auto}._tabsContent_1lx1r_55:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._categoryList_1lx1r_70{flex-direction:column;gap:12px;display:flex}._categoryToolbar_1lx1r_76{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._searchInput_1lx1r_83{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);min-width:160px;color:var(--tc-text);flex:1;padding:8px 12px;font-size:13px}._searchInput_1lx1r_83:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reorderHint_1lx1r_99{color:var(--tc-text-muted);font-size:12px}._emptyDescription_1lx1r_104{color:var(--tc-text-muted);font-size:13px}._cardGrid_1lx1r_109{flex-direction:column;gap:8px;display:flex}._assetCard_1lx1r_115{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);align-items:center;gap:4px;padding:4px 8px 4px 4px;display:flex}._assetCard_1lx1r_115[data-dragging]{border-color:var(--tc-accent)}._dragHandle_1lx1r_129{color:var(--tc-text-muted);cursor:grab;flex:none;padding:4px;display:inline-flex}._assetCardMain_1lx1r_137{border-radius:var(--tc-radius-field);text-align:left;min-width:0;transition:background-color var(--tc-motion-fast) ease-out;background-color:#0000;flex-direction:column;flex:1;align-items:flex-start;gap:2px;padding:6px 8px;display:flex}._assetCardMain_1lx1r_137:hover{background-color:var(--tc-surface-raised)}._assetCardName_1lx1r_155{color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13px;font-weight:500;overflow:hidden}._assetCardSummary_1lx1r_165{color:var(--tc-text-muted);flex-wrap:wrap;gap:8px;font-size:12px;display:flex}._assetCardSummaryPart_1lx1r_173{white-space:nowrap}._assetCardActions_1lx1r_177{flex:none;align-items:center;gap:2px;display:flex}._form_1lx1r_188{flex-direction:column;gap:14px;display:flex}._textInput_1lx1r_194,._textArea_1lx1r_195{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;color:var(--tc-text);padding:8px 10px;font-family:inherit;font-size:13px}._textArea_1lx1r_195{resize:vertical;min-height:72px}._textInput_1lx1r_194:focus-visible,._textArea_1lx1r_195:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._formActions_1lx1r_217{justify-content:flex-end;gap:8px;display:flex}._vocabularyPanel_1lx1r_227{flex-direction:column;gap:20px;display:flex}._vocabularySearchRow_1lx1r_233{gap:8px;display:flex}._searchResultsList_1lx1r_238{flex-direction:column;gap:4px;display:flex}._searchResultRow_1lx1r_244{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 4px;display:flex}._searchResultTag_1lx1r_253{color:var(--tc-text);font-size:13px}._searchResultTranslation_1lx1r_258{color:var(--tc-text-muted);font-size:12px}._loadMoreRow_1lx1r_263{justify-content:center;padding-top:4px;display:flex}._sectionTitle_1lx1r_269{color:var(--tc-text);font-size:13px;font-weight:600}._catalogList_1lx1r_275{flex-direction:column;gap:8px;display:flex}._catalogEntry_1lx1r_281{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 4px;display:flex}._catalogEntryInfo_1lx1r_290{flex-direction:column;gap:2px;min-width:0;display:flex}._catalogEntryName_1lx1r_297{color:var(--tc-text);font-size:13px;font-weight:500}._catalogEntryMeta_1lx1r_303{color:var(--tc-text-muted);font-size:12px}._bundledBadge_1lx1r_308{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);align-items:center;padding:2px 6px;font-size:11px;display:inline-flex}._nsfwSection_1lx1r_318{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:8px 12px}._nsfwToggle_1lx1r_324{color:var(--tc-text-muted);background:0 0;align-items:center;gap:6px;padding:4px 0;font-size:12px;display:flex}._nsfwNotice_1lx1r_334{color:var(--tc-text-muted);padding:8px 0 0;font-size:12px}._installProgress_1lx1r_340{color:var(--tc-text-muted);font-size:12px}._workflowToolbarRow_1lx1r_349{flex-wrap:wrap;gap:8px;display:flex}._placeholderList_1lx1r_355{flex-direction:column;gap:8px;display:flex}._placeholderRow_1lx1r_361{align-items:center;gap:8px;display:flex}._placeholderKey_1lx1r_367{width:40%;color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;flex:none;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:hidden}._hiddenFileInput_1lx1r_378{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}", Gs = "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}", Ks = "._galleryView_zh0y1_10{flex-direction:column;gap:12px;height:100%;min-height:0;padding:16px;display:flex}._filterBar_zh0y1_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:16px;padding-bottom:12px;display:flex}._dateFilterLabel_zh0y1_32{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:flex}._dateInput_zh0y1_40{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);color:var(--tc-text);padding:4px 6px;font-size:12px}._cacheOccupancy_zh0y1_49{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._emptyDescription_zh0y1_55{color:var(--tc-text-muted);font-size:13px}._skeletonGrid_zh0y1_64{flex-wrap:wrap;gap:8px;display:flex}._skeletonTile_zh0y1_70{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);width:176px;height:176px}._gridContainer_zh0y1_81{flex:1;min-height:0}._gridRow_zh0y1_86{display:flex}._tile_zh0y1_90{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);flex:none;position:relative;overflow:hidden}._tile_zh0y1_90[data-selected]{outline:2px solid var(--tc-accent);outline-offset:-2px}._tileButton_zh0y1_103{width:100%;height:100%;padding:0;display:block}._tileSkeleton_zh0y1_110{background-color:var(--tc-surface-raised);position:absolute;inset:0}._tileImage_zh0y1_116{object-fit:cover;width:100%;height:100%;transition:opacity var(--tc-motion-normal) ease-out}._tileFallback_zh0y1_123{color:var(--tc-text-muted);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:8px;font-size:11px;display:flex;position:absolute;inset:0}._tilePinnedBadge_zh0y1_137{border-radius:var(--tc-radius-status);background-color:var(--tc-surface);color:var(--tc-accent);justify-content:center;align-items:center;padding:3px;display:inline-flex;position:absolute;top:6px;left:6px}._tileSelectToggle_zh0y1_150{border-radius:var(--tc-radius-status);border:1px solid var(--tc-surface);width:20px;height:20px;transition:background-color var(--tc-motion-fast) ease-out;background-color:#181a1f66;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:6px;right:6px}._tileSelectDot_zh0y1_165{border:1px solid var(--tc-surface);border-radius:50%;width:10px;height:10px}._tileSelectDot_zh0y1_165[data-checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._bulkActionBar_zh0y1_184{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding-top:12px;display:flex}._bulkActionCount_zh0y1_193{color:var(--tc-text);font-size:13px}._bulkActionButtons_zh0y1_198{align-items:center;gap:8px;display:flex}._previewOverlay_zh0y1_208{z-index:var(--tc-z-overlay);background-color:#111318b8;position:fixed;inset:0}._previewContent_zh0y1_215{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);display:flex;position:fixed;inset:16px;overflow:hidden}._previewLayout_zh0y1_225{width:100%;min-height:0;display:flex}._previewMain_zh0y1_231{flex-direction:column;flex:1;min-width:0;display:flex}._previewToolbar_zh0y1_238{border-bottom:1px solid var(--tc-divider);align-items:center;gap:4px;padding:8px;display:flex}._previewToolbarButton_zh0y1_246{border-radius:var(--tc-radius-field);width:32px;height:32px;color:var(--tc-text);justify-content:center;align-items:center;display:inline-flex}._previewToolbarButton_zh0y1_246:hover{background-color:var(--tc-surface-raised)}._previewToolbarSpacer_zh0y1_260{flex:1}._previewImageArea_zh0y1_264{flex:1;justify-content:center;align-items:center;gap:8px;min-height:0;padding:12px;display:flex;overflow:auto}._previewImageFrame_zh0y1_275{flex:1;justify-content:center;align-items:center;height:100%;min-height:0;display:flex;position:relative}._previewImage_zh0y1_264{border-radius:var(--tc-radius-image);object-fit:contain;touch-action:auto;max-width:100%;max-height:100%}._previewImageFallback_zh0y1_293{color:var(--tc-text-muted);justify-content:center;align-items:center;padding:24px;font-size:13px;display:flex}._previewNavButton_zh0y1_302{flex:none}._previewInspector_zh0y1_306{border-left:1px solid var(--tc-divider);flex:none;width:320px;max-width:40vw;padding:16px;overflow-y:auto}._metadataInspector_zh0y1_319{flex-direction:column;gap:12px;display:flex}._metadataTitle_zh0y1_325{color:var(--tc-text);font-size:14px;font-weight:600}._metadataOrphanNotice_zh0y1_331{color:var(--tc-warning);font-size:12px}._metadataList_zh0y1_336{flex-direction:column;gap:8px;display:flex}._metadataRow_zh0y1_342{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding-bottom:6px;font-size:12px;display:flex}._metadataRow_zh0y1_342 dt{color:var(--tc-text-muted)}._metadataRow_zh0y1_342 dd{color:var(--tc-text);margin:0}._metadataPrompt_zh0y1_360{white-space:pre-wrap;overflow-wrap:anywhere}._metadataEmpty_zh0y1_365{color:var(--tc-text-muted);font-size:12px}._metadataActions_zh0y1_370{flex-wrap:wrap;gap:8px;display:flex}._metadataActionsHint_zh0y1_376{color:var(--tc-text-muted);font-size:12px}@media (width<=959px){._previewContent_zh0y1_215{border-radius:0;inset:0}._previewLayout_zh0y1_225{flex-direction:column;overflow-y:auto}._previewMain_zh0y1_231{flex:none}._previewToolbar_zh0y1_238{z-index:1;background-color:var(--tc-surface);position:sticky;top:0}._previewImageArea_zh0y1_264{min-height:45vh}._previewInspector_zh0y1_306{border-left:none;border-top:1px solid var(--tc-divider);width:100%;max-width:100%}}", qs = "._prompt_view_i5kyf_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_i5kyf_14{border-right:1px solid var(--tc-divider)}._editor_column_i5kyf_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_i5kyf_7{grid-template-columns:minmax(0,1fr)}._browser_column_i5kyf_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_i5kyf_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_i5kyf_48{font-weight:600}._icon_text_button_i5kyf_52{color:var(--tc-accent);align-items:center;gap:4px;display:inline-flex}._text_input_i5kyf_59{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_i5kyf_70{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_i5kyf_59:focus-visible,._text_input_narrow_i5kyf_70:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_i5kyf_87{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_i5kyf_87:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_i5kyf_107{flex-direction:column;display:flex}._search_input_i5kyf_112{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_i5kyf_122{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_i5kyf_131{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_i5kyf_141{flex-direction:column;display:flex}._preset_row_i5kyf_146{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_i5kyf_153{background-color:var(--tc-surface-raised)}._preset_name_button_i5kyf_157{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_i5kyf_169{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_i5kyf_169>:first-child{flex:auto}._prompt_builder_i5kyf_183{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._context_preview_i5kyf_191{flex-direction:column;gap:8px;padding:0 16px 12px;display:flex}._context_block_title_i5kyf_198{color:var(--tc-text-muted);margin-bottom:4px;font-size:12px}._context_list_i5kyf_204{margin:0;padding-left:16px}._quality_controls_i5kyf_211{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._switch_list_i5kyf_216{flex-direction:column;gap:4px;padding:0 16px 8px;display:flex}._replacement_rules_i5kyf_225,._regex_rules_i5kyf_226{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_i5kyf_231{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_i5kyf_231>:not(._rule_row_action_i5kyf_240){flex:140px}._rule_row_action_i5kyf_240{flex:none;align-items:center;gap:8px;display:flex}._test_result_i5kyf_253{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_i5kyf_260{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._test_panel_i5kyf_269{flex-direction:column;display:flex}._test_panel_body_i5kyf_277{flex-direction:column;gap:8px;padding:0 16px 16px;display:flex}._tools_disabled_note_i5kyf_284{color:var(--tc-text-muted);margin:0;font-size:12px}", Js = "._view_sikhr_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_sikhr_14{flex-direction:column;min-width:0;display:flex}._section_header_sikhr_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_sikhr_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_sikhr_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_sikhr_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_sikhr_51{color:var(--tc-text);flex:none}._profile_row_sikhr_56{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_sikhr_65{flex-direction:column;gap:2px;min-width:0;display:flex}._profile_name_sikhr_72{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_sikhr_79{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_sikhr_87{flex:none;align-items:center;gap:6px;display:flex}._badge_sikhr_94{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_sikhr_103{flex-direction:column;gap:16px;display:flex}._status_text_sikhr_109{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_sikhr_109[data-tone=success]{color:var(--tc-success)}._status_text_sikhr_109[data-tone=warning]{color:var(--tc-warning)}._status_text_sikhr_109[data-tone=error]{color:var(--tc-error)}._risk_banner_sikhr_129{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_sikhr_129[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_sikhr_143{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_sikhr_129[data-severity=error] ._risk_banner_title_sikhr_143{color:var(--tc-error)}._risk_banner_description_sikhr_155{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_sikhr_162{align-items:center;gap:8px;display:flex}._acknowledged_note_sikhr_168{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_sikhr_176{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_sikhr_183{align-items:center;gap:12px;padding-top:8px;display:flex}._typed_confirm_input_sikhr_190{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._typed_confirm_input_sikhr_190:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}", Ys = "._workbench_view_pr9le_8{grid-template-columns:minmax(0,1fr) minmax(280px,360px);gap:0;min-height:100%;display:grid}._main_column_pr9le_15{border-right:1px solid var(--tc-divider);flex-direction:column;min-width:0;display:flex}._side_column_pr9le_22{flex-direction:column;min-width:0;display:flex}@media (width<=959px){._workbench_view_pr9le_8{grid-template-columns:minmax(0,1fr)}._main_column_pr9le_15{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_pr9le_43{justify-content:space-between;align-items:baseline;gap:8px;padding:12px 16px 4px;display:flex}._section_title_pr9le_51{font-weight:600}._section_hint_pr9le_55{color:var(--tc-text-muted);font-size:12px}._inline_error_pr9le_60{color:var(--tc-error);margin:4px 16px 0;font-size:12px}._prompt_composer_pr9le_68{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:12px;padding:16px;display:flex}._prompt_textarea_pr9le_76{width:100%;min-height:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._prompt_textarea_pr9le_76:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reference_strip_pr9le_96{border-bottom:1px solid var(--tc-divider);padding-bottom:16px}._reference_empty_pr9le_101{flex-direction:column;align-items:flex-start;gap:8px;padding:8px 16px;display:flex}._reference_list_pr9le_109{flex-wrap:wrap;gap:8px;padding:8px 16px 0;display:flex}._reference_tile_pr9le_116{background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);flex-direction:column;gap:6px;width:132px;padding:8px;display:flex}._reference_tile_thumb_pr9le_127{height:72px;color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._reference_tile_name_pr9le_137{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._reference_tile_actions_pr9le_144{gap:2px;display:flex}._reference_tile_add_pr9le_149{justify-content:center;align-items:center;width:132px;display:flex}._reference_add_button_pr9le_156{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);align-items:center;gap:6px;padding:8px 12px;display:flex}._picker_list_pr9le_166{flex-direction:column;gap:4px;display:flex}._picker_item_pr9le_172{text-align:left;width:100%;color:var(--tc-text);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);padding:8px 10px}._submit_row_pr9le_183{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:8px 16px;padding:12px 16px;display:flex}._provider_summary_pr9le_194{border-bottom:1px solid var(--tc-divider);padding-bottom:12px}._text_action_button_pr9le_199{color:var(--tc-accent);align-items:center;gap:4px;display:inline-flex}._active_jobs_pr9le_208{flex:auto;min-height:0;padding-bottom:16px}._job_list_pr9le_214{flex-direction:column;display:flex}._job_row_pr9le_219{border-top:1px solid var(--tc-divider);flex-direction:column;gap:4px;padding:8px 16px;display:flex}._job_row_selected_pr9le_227{background-color:var(--tc-surface-raised)}._job_row_main_pr9le_231{text-align:left;align-items:center;gap:10px;width:100%;display:flex}._job_status_dot_pr9le_239{background-color:var(--tc-success);border-radius:50%;flex:none;width:6px;height:6px}._job_provider_pr9le_247{font-weight:600}._job_state_pr9le_251{color:var(--tc-text-muted);font-size:12px}._job_progress_pr9le_256{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._job_error_pr9le_262{color:var(--tc-error);margin:0;font-size:12px}._job_row_actions_pr9le_268{gap:4px;display:flex}._generation_inspector_pr9le_275{padding-bottom:16px}._inspector_field_list_pr9le_279{flex-direction:column;gap:6px;margin:0;padding:4px 16px;display:flex}._inspector_field_pr9le_279{justify-content:space-between;gap:12px;font-size:12px;display:flex}._inspector_field_pr9le_279 dt{color:var(--tc-text-muted)}._inspector_field_pr9le_279 dd{text-align:right;text-overflow:ellipsis;white-space:nowrap;margin:0;overflow:hidden}._inspector_actions_pr9le_306{align-items:center;gap:8px;padding:8px 16px;display:flex}._completion_preview_list_pr9le_313{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 16px;display:grid}._completion_preview_tile_pr9le_320{aspect-ratio:1;background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);overflow:hidden}._completion_preview_tile_pr9le_320 img{object-fit:cover;width:100%;height:100%}._completion_preview_placeholder_pr9le_333{width:100%;height:100%;color:var(--tc-text-muted);justify-content:center;align-items:center;display:flex}", Xs = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function Zs(e) {
	return e.replaceAll(Xs, (e, t) => new URL(t, import.meta.url).href);
}
//#endregion
//#region src/index.ts
var Qs = Is({
	stylesheet: Zs([
		Ls,
		Rs,
		zs,
		Bs,
		Hs,
		Vs,
		Us,
		Ws,
		Ks,
		Ys,
		qs,
		Gs,
		Js
	].join("\n")),
	version: "3.0.0"
});
//#endregion
export { Qs as bootstrap_handle };
