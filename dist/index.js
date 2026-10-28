import { t as e } from "./chunks/shell.module-DFs3Bhuc.js";
import { n as t, r as n, t as r } from "./chunks/sha2-BGNex9vj.js";
import { c as i, d as a, h as o, i as s, m as c, r as l, t as u, u as d } from "./chunks/schemas-DMBLWk59.js";
import { i as f, n as p, o as m, r as h } from "./chunks/ids-stC4fUL8.js";
import { n as g, t as _ } from "./chunks/generation-C8k9E8Cm.js";
import { l as v, n as y, o as b, r as x, s as S } from "./chunks/wardrobe_library-cpT1rkQA.js";
import { a as ee, i as C, r as w } from "./chunks/provider-ByHYrbSK.js";
import { a as te, i as T, n as ne, o as re, r as ie, s as ae, t as oe } from "./chunks/http_origin-NLkLJD5s.js";
import { A as E, F as se, H as ce, I as le, N as D, O as ue, P as de, Q as fe, V as pe, W as me, Z as he, _ as O, b as k, ct as A, et as j, ft as ge, g as M, h as N, i as _e, k as ve, m as P, n as ye, nt as be, p as F, pt as I, rt as xe, u as Se, ut as L, x as R, y as z } from "./chunks/vue-i18n-DUz2Gjn8.js";
import { t as Ce } from "./chunks/create_i18n-BSjBcZFg.js";
import { n as we, r as Te, t as Ee } from "./chunks/portal_keys-B9C82xtk.js";
import { n as De, t as Oe } from "./chunks/AppIcon-Cnhzrx9o.js";
import { t as ke } from "./chunks/chevron-down-Tu_8qTxg.js";
import { t as Ae } from "./chunks/chevron-up-D4TetO-M.js";
import { n as je } from "./chunks/route_nav-BrwZiRD4.js";
import { t as Me } from "./chunks/trash-2-B6ZXZcor.js";
import { t as Ne } from "./chunks/x-CDKrptQJ.js";
import { a as Pe, c as Fe, i as Ie, n as Le, o as Re, r as ze, s as Be, t as Ve } from "./chunks/analysis-D6fktgUF.js";
import { t as He } from "./chunks/deferred_stylesheets-BpS7LWkd.js";
import { a as Ue, i as We, m as Ge, s as Ke } from "./chunks/business_repositories-DyAWjr6U.js";
import { i as qe, n as Je, r as Ye, t as Xe } from "./chunks/image_store-fWHWODIB.js";
import { i as Ze, n as Qe, r as $e, t as et } from "./chunks/library_match-er4-CW2n.js";
import { n as tt, r as B, t as nt } from "./chunks/tag_normalizer-CEAU4497.js";
import { t as rt } from "./chunks/novelai_errors-Bve94MgO.js";
import { i as it, r as at } from "./chunks/browser_secret_vault-CnTo7PwU.js";
import { a as ot, i as st, n as ct, o as lt } from "./chunks/provider_transport-BuXjRit-.js";
import { t as ut } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
//#region ../../packages/core/src/capability_registry.ts
var dt = class {
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
}, ft = class {
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
}, pt = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new dt(), n = new ft()) {
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
}, mt = "Canonical JSON accepts only JSON data";
function ht() {
	throw TypeError(mt);
}
function gt(e) {
	return typeof e == "number" && !Number.isFinite(e) ? ht() : JSON.stringify(e);
}
function _t(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return gt(e);
	if (typeof e != "object") return ht();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return ht();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return ht();
				n.push(_t(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return ht();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return ht();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return ht();
			a.push(`${gt(n)}:${_t(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function vt(e) {
	return _t(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var yt = class {
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
function bt(e) {
	return t(r(n(e)));
}
function xt(e, n) {
	let r = bt(vt(e)), i = n.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: r,
		generation_anchor: bt(`${r}${t(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/direct_catalog.ts
var St = Object.freeze({}), Ct = {
	kind: "bearer",
	header: "authorization"
}, wt = Object.freeze({
	sd_webui: null,
	comfyui: null,
	novelai: {
		origin: "https://image.novelai.net",
		routes: [
			"/ai/generate-image",
			"/ai/encode-vibe",
			"/ai/upscale",
			"/ai/augment-image",
			"/user/subscription"
		],
		auth: Ct,
		required_headers: St
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: Ct,
		required_headers: St
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: St
	}
}), Tt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function Et(e) {
	return wt[e];
}
function Dt(e, t) {
	if (!e.routes.includes(t)) throw new Tt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var Ot = o().regex(/^[A-Za-z0-9_-]{8,32}$/u), kt = c({
	name: o().trim().min(1).max(120),
	prompt: o().trim().min(1).max(4e3),
	negative_prompt: o().max(4e3)
}), At = c({
	slot_id: Ot,
	paragraph: d().int().min(0),
	anchor: o().max(400),
	scene: o().max(2e3),
	characters: l(o().trim().min(1).max(120)).max(16),
	positive_prompt: o().max(8e3),
	negative_prompt: o().max(8e3),
	character_prompts: l(kt).max(16),
	image_ids: l(p),
	active_image_id: p.nullable(),
	pending_request_ids: l(f),
	last_error: o().max(500).nullable()
}), jt = c({
	schema_version: i(2),
	slots: l(At).max(16)
});
u(["quality", "undesired_content"]);
var Mt = c({
	enabled: s(),
	preset_id: o().trim().min(1).max(200)
}), Nt = c({
	quality: Mt,
	undesired_content: Mt
}), Pt = c({
	schema_version: i(1),
	chat_id: o().min(1).max(512),
	active_swipes: l(a({
		message_id: d().int().nonnegative(),
		swipe_id: d().int().nonnegative()
	})),
	messages: l(a({
		message_id: d().int().nonnegative(),
		role: u([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: g,
		swipe_id: d().int().nonnegative().nullable()
	}))
}), Ft = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function It(e) {
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
var Lt = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(w.parse(e));
	}
}, Rt = {
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
}, zt = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function Bt(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Rt[r].includes(t)) throw new zt(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function Vt(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function Ht(e) {
	let t = g.parse(e.generation_anchor), n = Object.freeze(_.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: f.parse(e.request_id),
		generation_anchor: t,
		source_anchor: g.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: C.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function Ut(e) {
	let i = `${e.generation_anchor}${vt(e.arguments)}`;
	return t(r(n(i)));
}
function Wt(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function Gt(e) {
	return e instanceof Lt ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var Kt = class {
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
	#d = /* @__PURE__ */ new Map();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	#m = C.options;
	#h = 0;
	#g = 0;
	#_ = !1;
	#v = null;
	#y = 0;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new Ft(), this.#i = Vt(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#m) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : Vt(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, e.provider_start_interval_ms?.[t] ?? 0), this.#c.set(t, []), this.#l.set(t, 0);
		}
	}
	enqueue(e) {
		let t = Ht(e), n = Ut(t);
		if (t.automatic) {
			let e = this.#d.get(n);
			if (e !== void 0) {
				let t = this.get(e);
				if (t !== null) return Promise.resolve(t);
			}
			let r = this.#f.get(n);
			if (r !== void 0) return r;
			let i = this.#x(t, n);
			this.#f.set(n, i);
			let a = () => {
				this.#f.get(n) === i && this.#f.delete(n);
			};
			return i.then(a, a), i;
		}
		return this.#x(t, n);
	}
	get(e) {
		let t = this.#u.get(e);
		return t === void 0 ? null : It(t.job);
	}
	subscribe(e) {
		this.#p.add(e);
		let t = !1;
		return () => {
			t || (t = !0, this.#p.delete(e));
		};
	}
	async cancel(e) {
		let t = this.#u.get(e);
		if (t === void 0) throw Error(`Generation job ${e} does not exist`);
		if (t.job.state === "cancelled") return It(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#k(t);
		let n = await this.#O(t, async () => (t.job.state !== "cancelled" && await this.#D(t, "cancelled"), It(t.job)));
		return this.#S(), n;
	}
	mark_attached(e) {
		return this.#b(e, "attached");
	}
	mark_orphaned(e) {
		return this.#b(e, "orphaned");
	}
	#b(e, t) {
		let n = this.#u.get(e);
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#O(n, async () => (n.job.state !== t && await this.#D(n, t), It(n.job)));
	}
	async #x(e, t) {
		let n = this.#r.now().toISOString(), r = {
			job_id: h.parse(this.#n.next()),
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
		}, i = It(r);
		await this.#t.save(i);
		let a = {
			job: r,
			controller: new AbortController(),
			operation: Promise.resolve(),
			cancel_requested: !1,
			queued: !0
		};
		return this.#u.set(r.job_id, a), e.automatic && this.#d.set(t, r.job_id), this.#c.get(r.provider_id)?.push(a), this.#A(i), this.#S(), i;
	}
	#S() {
		this.#_ || (this.#_ = !0, queueMicrotask(() => {
			this.#_ = !1, this.#C();
		}));
	}
	#C() {
		for (; this.#h < this.#i;) {
			let e = this.#w();
			if (e === null) return;
			let t = this.#c.get(e)?.shift();
			if (t === void 0) continue;
			t.queued = !1;
			let n = this.#o.get(e) ?? 0;
			n > 0 && this.#s.set(e, Date.now() + n), this.#h += 1, this.#l.set(e, (this.#l.get(e) ?? 0) + 1), this.#E(t).finally(() => {
				--this.#h, this.#l.set(e, Math.max(0, (this.#l.get(e) ?? 1) - 1)), this.#S();
			});
		}
	}
	#w() {
		let e = Date.now(), t = null;
		for (let n = 0; n < this.#m.length; n += 1) {
			let r = (this.#g + n) % this.#m.length, i = this.#m[r];
			if (i === void 0) continue;
			let a = this.#c.get(i)?.length ?? 0, o = this.#l.get(i) ?? 0, s = this.#a.get(i) ?? 0;
			if (a > 0 && o < s) {
				let n = this.#s.get(i) ?? 0;
				if (n > e) {
					t = Math.min(t ?? n, n);
					continue;
				}
				return this.#g = (r + 1) % this.#m.length, i;
			}
		}
		return t !== null && this.#T(t), null;
	}
	#T(e) {
		if (this.#v !== null) {
			if (this.#y <= e) return;
			clearTimeout(this.#v);
		}
		this.#y = e, this.#v = setTimeout(() => {
			this.#v = null, this.#C();
		}, Math.max(0, e - Date.now()));
	}
	async #E(e) {
		if (!await this.#O(e, async () => e.cancel_requested || (await this.#D(e, "preparing"), e.controller.signal.aborted) ? (await this.#D(e, "cancelled"), !1) : (await this.#D(e, "submitting"), !0)) || e.cancel_requested) return;
		let t = {
			signal: e.controller.signal,
			mark_running: async () => {
				await this.#O(e, async () => {
					!e.cancel_requested && e.job.state === "submitting" && await this.#D(e, "running");
				});
			}
		};
		try {
			let n = (await this.#e.execute(It(e.job), t)).image_ids.map((e) => p.parse(e));
			if (n.length === 0) throw new Lt({
				code: "malformed_response",
				retryable: !1
			});
			await this.#O(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = Wt(e.job);
				t.image_ids = n, await this.#D(e, "completed", t);
			});
		} catch (t) {
			await this.#O(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = Wt(e.job);
				n.error = Gt(t), await this.#D(e, "failed", n);
			});
		}
	}
	async #D(e, t, n = Wt(e.job)) {
		Bt(n, t, this.#r.now().toISOString());
		let r = It(n);
		return await this.#t.save(r), e.job = n, this.#A(r), r;
	}
	#O(e, t) {
		let n = e.operation.then(t);
		return e.operation = n.then(() => void 0, () => void 0), n;
	}
	#k(e) {
		let t = this.#c.get(e.job.provider_id);
		if (t === void 0) return;
		let n = t.indexOf(e);
		n >= 0 && t.splice(n, 1), e.queued = !1;
	}
	#A(e) {
		for (let t of this.#p) t(e);
	}
}, qt = "tavern_canvas", Jt = "tavern_canvas_wardrobe";
function Yt(e) {
	return e.bind(globalThis);
}
function Xt(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Zt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function V(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Qt(e, t) {
	let n = V(e, t);
	if (typeof n == "function") try {
		return Reflect.apply(n, e, []);
	} catch {
		return;
	}
}
function $t(e, t) {
	let n = V(e, "eventSource"), r = V(e, "eventTypes");
	return !Xt(n) || !Xt(r) ? !1 : typeof V(n, "on") == "function" && typeof V(n, "removeListener") == "function" && t.every((e) => {
		let t = V(r, e);
		return typeof t == "string" && t.length > 0;
	});
}
function en(e) {
	let t = Xt(e) ? Qt(e, "getContext") : void 0;
	if (!Xt(t)) return {
		main_generation_events: !1,
		message_swipe_metadata: !1
	};
	let n = Qt(t, "getCurrentLocale");
	return {
		main_generation_events: typeof n == "string" && n.trim().length > 0 && $t(t, [
			"GENERATION_STARTED",
			"GENERATION_STOPPED",
			"GENERATION_ENDED"
		]),
		message_swipe_metadata: typeof V(t, "getCurrentChatId") == "function" && Array.isArray(V(t, "chat")) && typeof V(t, "saveChat") == "function" && $t(t, [
			"CHAT_CHANGED",
			"MESSAGE_SWIPED",
			"MESSAGE_UPDATED",
			"MESSAGE_EDITED",
			"CHARACTER_MESSAGE_RENDERED",
			"MORE_MESSAGES_LOADED"
		])
	};
}
function tn(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function nn(e) {
	if (!Zt(e) || !Object.values(e).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return { ...e };
}
function rn(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
var an = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t.bind(globalThis);
	}
	get_locale() {
		return tn(this.#e().getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		let e = this.#e().getCurrentChatId();
		return typeof e == "string" && e.trim().length > 0 ? e : null;
	}
	#n(e) {
		let t = this.#e(), n = e.map(([e, n]) => [t.eventTypes[e], n]);
		for (let [e, r] of n) t.eventSource.on(e, r);
		let r = !1;
		return () => {
			if (!r) {
				r = !0;
				for (let [e, r] of n) t.eventSource.removeListener(e, r);
			}
		};
	}
	subscribe_generation(e) {
		return this.#n([
			["GENERATION_STARTED", (t, n, r) => {
				typeof t == "string" && typeof r == "boolean" && e({
					phase: "started",
					generation_type: t,
					dry_run: r
				});
			}],
			["GENERATION_STOPPED", () => {
				e({ phase: "stopped" });
			}],
			["GENERATION_ENDED", (t) => {
				let n = rn(t);
				n !== null && n > 0 && e({
					phase: "ended",
					message_id: n - 1
				});
			}]
		]);
	}
	subscribe_chat_change(e) {
		return this.#n([["CHAT_CHANGED", (t) => {
			typeof t == "string" && t.trim().length > 0 && e({ chat_id: t });
		}]]);
	}
	subscribe_message_rendered(e) {
		let t = (t) => {
			let n = rn(t);
			n !== null && e(n);
		};
		return this.#n([
			["CHARACTER_MESSAGE_RENDERED", t],
			["MESSAGE_UPDATED", t],
			["MESSAGE_EDITED", t],
			["MESSAGE_SWIPED", t]
		]);
	}
	subscribe_chat_rendered(e) {
		let t = () => {
			e();
		};
		return this.#n([["CHAT_CHANGED", t], ["MORE_MESSAGES_LOADED", t]]);
	}
	#r(e, t) {
		let n = this.#e();
		if (n.getCurrentChatId() !== e.chat_id) return null;
		let r = n.chat[e.message_id];
		if (r === void 0) return null;
		if ((r.swipe_id ?? 0) === e.swipe_id) return r.extra === void 0 && t && (r.extra = {}), r.extra ?? null;
		let i = r.swipe_info?.[e.swipe_id];
		return i == null ? null : (i.extra === void 0 && t && (i.extra = {}), i.extra ?? null);
	}
	read_swipe_record(e) {
		return this.#i(e, qt);
	}
	read_swipe_wardrobe(e) {
		return this.#i(e, Jt);
	}
	#i(e, t) {
		let n = this.#r(e, !1)?.[t];
		return n === void 0 ? null : structuredClone(n);
	}
	async translate_deepl(e, t, n) {
		let r = await this.#t("/api/translate/deepl", {
			method: "POST",
			headers: nn(this.#e().getRequestHeaders()),
			body: JSON.stringify({
				text: e,
				lang: t,
				endpoint: n
			})
		});
		if (r.status === 400) throw Error("No DeepL key is stored in SillyTavern; set it in Settings > Translation");
		if (!r.ok) throw Error(`DeepL translation failed with status ${String(r.status)}`);
		return r.text();
	}
	write_swipe_record(e, t) {
		return this.#a(e, qt, t);
	}
	write_swipe_wardrobe(e, t) {
		return this.#a(e, Jt, t);
	}
	async #a(e, t, n) {
		let r = this.#r(e, !0);
		if (r === null) throw Error(`Chat ${e.chat_id} message ${String(e.message_id)} swipe ${String(e.swipe_id)} is not available`);
		r[t] = structuredClone(n), await this.#e().saveChat();
	}
}, on = {
	message_swipe_metadata: ["getChatMessages", "setChatMessages"],
	preset_generation: [
		"generate",
		"stopGenerationById",
		"getWorldbookNames",
		"getWorldbook"
	],
	tavern_regex: [
		"getTavernRegexes",
		"replaceTavernRegexes",
		"retrieveDisplayedMessage"
	]
};
function sn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function cn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function ln(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function un(e, t) {
	return t.every((t) => typeof ln(e, t) == "function");
}
function dn(e) {
	let t;
	try {
		t = Reflect.get(e, "getTavernHelperVersion");
	} catch {
		return { state: "threw" };
	}
	if (typeof t != "function") return { state: "missing" };
	let n;
	try {
		n = Reflect.apply(t, e, []);
	} catch {
		return { state: "threw" };
	}
	return typeof n == "string" ? {
		state: "available",
		value: n
	} : { state: "invalid" };
}
function fn(e) {
	return sn(e) ? {
		detected: !0,
		version: dn(e),
		message_swipe_metadata: un(e, on.message_swipe_metadata),
		preset_generation: un(e, on.preset_generation),
		tavern_regex: un(e, on.tavern_regex)
	} : {
		detected: e !== void 0,
		version: e === void 0 ? { state: "missing" } : { state: "invalid" },
		message_swipe_metadata: !1,
		preset_generation: !1,
		tavern_regex: !1
	};
}
function pn(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function mn(e) {
	if (!cn(e)) throw Error("TavernHelper returned an invalid chat message");
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o } = e;
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || typeof n != "string" || !pn(r) || i !== void 0 && typeof i != "boolean" || typeof a != "number" || !Number.isInteger(a) || !Array.isArray(o) || !o.every((e) => typeof e == "string") || a < 0 || a >= o.length) throw Error(`TavernHelper returned an invalid chat message ${String(t)}`);
	return {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o
	};
}
function hn(e) {
	return {
		message_id: e.message_id,
		name: e.name,
		role: e.role,
		is_hidden: e.is_hidden,
		active_swipe_id: e.swipe_id,
		swipes: e.swipes.map((e, t) => ({
			swipe_id: t,
			content: e
		}))
	};
}
function gn(e) {
	if (typeof e == "string") return {
		content: e,
		reasoning: null
	};
	if (cn(e) && typeof e.content == "string") return {
		content: e.content,
		reasoning: typeof e.reasoning == "string" && e.reasoning.length > 0 ? e.reasoning : null
	};
	throw Error("TavernHelper.generate returned neither text nor a detailed result");
}
var _n = /* @__PURE__ */ new Set([
	"and_any",
	"and_all",
	"not_all",
	"not_any"
]), vn = /* @__PURE__ */ new Set([
	"constant",
	"selective",
	"vectorized"
]);
function yn(e) {
	if (!Array.isArray(e)) throw Error("TavernHelper returned invalid world info keys");
	return e.map((e) => {
		if (typeof e == "string") return e;
		if (e instanceof RegExp) return {
			source: e.source,
			flags: e.flags
		};
		throw Error("TavernHelper returned an invalid world info key");
	});
}
function bn(e) {
	if (!cn(e) || !cn(e.strategy) || !cn(e.position)) throw Error("TavernHelper returned an invalid world info entry");
	let { enabled: t, content: n, strategy: r, position: i } = e, a = r.keys_secondary, o = cn(a) ? a.logic ?? "and_any" : void 0;
	if (typeof t != "boolean" || typeof n != "string" || typeof r.type != "string" || !vn.has(r.type) || !cn(a) || typeof o != "string" || !_n.has(o) || typeof i.order != "number") throw Error("TavernHelper returned an invalid world info entry");
	return {
		enabled: t,
		strategy: r.type,
		keys: yn(r.keys),
		secondary_logic: o,
		secondary_keys: yn(a.keys),
		order: i.order,
		content: n
	};
}
function xn(e) {
	switch (e.kind) {
		case "current": return;
		case "proxy_preset": return e.model === null ? { proxy_preset: e.proxy_preset } : {
			proxy_preset: e.proxy_preset,
			model: e.model
		};
		case "custom": return {
			apiurl: e.api_url,
			key: e.api_key,
			model: e.model,
			source: e.source
		};
	}
}
function Sn(e) {
	return {
		id: e.id,
		script_name: e.script_name,
		enabled: !0,
		find_regex: e.find_regex,
		replace_string: e.replace_string,
		trim_strings: [],
		source: {
			user_input: !1,
			ai_output: !0,
			slash_command: !1,
			world_info: !1,
			reasoning: !1
		},
		destination: {
			display: e.destination === "display",
			prompt: e.destination === "prompt"
		},
		run_on_edit: !0,
		min_depth: null,
		max_depth: null
	};
}
function Cn(e, t) {
	return e.script_name === t.script_name && e.find_regex === t.find_regex && e.replace_string === t.replace_string && e.source.ai_output === t.source.ai_output && e.source.user_input === t.source.user_input && e.destination.display === t.destination.display && e.destination.prompt === t.destination.prompt && e.run_on_edit === t.run_on_edit;
}
var wn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	#n(e) {
		let t = this.#e.getChatMessages(e, { include_swipes: !0 });
		if (!Array.isArray(t)) throw Error("TavernHelper returned invalid chat messages");
		return t.map(mn);
	}
	get_active_chat() {
		let e = this.#n("0-{{lastMessageId}}");
		return Promise.resolve({
			chat_id: this.#t(),
			messages: e.map(hn)
		});
	}
	async replace_message_text(e, t, n) {
		let [r] = this.#n(e);
		return r?.swipes[r.swipe_id] === t && (await this.#e.setChatMessages([{
			message_id: e,
			message: n
		}], { refresh: "affected" }), !0);
	}
	async generate_with_preset(e) {
		let t = xn(e.connection);
		return gn(await this.#e.generate({
			generation_id: e.generation_id,
			preset_name: e.preset_name,
			user_input: e.user_input,
			max_chat_history: e.max_chat_history,
			should_silence: !0,
			should_stream: !1,
			should_return_reasoning: !0,
			...t === void 0 ? {} : { custom_api: t },
			...e.world_info.kind === "chat" ? {} : { overrides: {
				world_info_before: e.world_info.text,
				world_info_after: "",
				chat_history: { with_depth_entries: !1 }
			} },
			...e.json_schema === null ? {} : { json_schema: {
				...e.json_schema,
				strict: !0
			} },
			...e.image === null ? {} : { image: [e.image] }
		}));
	}
	list_worldbooks() {
		let e = this.#e.getWorldbookNames();
		if (!Array.isArray(e) || !e.every((e) => typeof e == "string")) throw Error("TavernHelper returned invalid world info book names");
		return e;
	}
	async read_worldbook(e) {
		let t = await this.#e.getWorldbook(e);
		if (!Array.isArray(t)) throw Error(`TavernHelper returned invalid entries for world info book ${e}`);
		return t.map(bn);
	}
	stop_generation(e) {
		this.#e.stopGenerationById(e);
	}
	async sync_regex_scripts(e) {
		let t = { type: "global" }, n = this.#e.getTavernRegexes(t), r = e.map(Sn).filter((e) => {
			let t = n.find((t) => t.id === e.id);
			return t === void 0 || !Cn(t, e);
		});
		if (r.length === 0) return !1;
		let i = n.filter((e) => !r.some((t) => t.id === e.id));
		return await this.#e.replaceTavernRegexes([...i, ...r], t), !0;
	}
	find_message_element(e) {
		return this.#e.retrieveDisplayedMessage(e).get(0) ?? null;
	}
}, Tn = "4.11.1", En = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function Dn(e) {
	let t = En.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function On(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function kn(e) {
	let t = Dn(e), n = Dn(Tn);
	return t === null || n === null ? "invalid" : On(t, n) ? "supported" : "unsupported";
}
var An = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function jn(e) {
	return {
		available: !1,
		reason: e
	};
}
function Mn(e, t) {
	return e ? { available: !0 } : jn(t);
}
function Nn(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Pn(e, t) {
	return {
		main_generation_events: Mn(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		preset_generation: Mn(e.preset_generation, "TavernHelper.generate, stopGenerationById or the world info functions are unavailable"),
		message_swipe_metadata: Mn(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper or SillyTavern chat message API is unavailable"),
		tavern_regex: Mn(e.tavern_regex, "TavernHelper regex or displayed message API is unavailable"),
		tavern_helper: Mn(e.version.state === "available", "TavernHelper version API is unavailable")
	};
}
function Fn(e) {
	return An.filter((t) => e[t]?.available !== !0);
}
function In(e) {
	let t = fn(Nn(e, "TavernHelper")), n = Pn(t, en(Nn(e, "SillyTavern")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: Fn(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: Fn(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = kn(i);
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
	let o = Fn(n);
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
var Ln = "capability_not_implemented";
function H() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: Ln }), Promise.reject(e);
}
function Rn() {
	return () => {};
}
var zn = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	workflow: [],
	prompt_tag: []
}, Bn = {
	capability_matrix: {},
	helper_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, Vn = {
	schema_version: 1,
	active_namespace: "default",
	locale: "auto",
	credential_storage_mode: "host",
	active_provider_profile_id: null,
	global_concurrency: 1,
	auto_generation_enabled: !1,
	vocabulary_update_channel: "bundled",
	illustration: {
		preset_name: "in_use",
		connection: { kind: "current" },
		max_chat_history: 4,
		max_images_per_message: 2,
		prompt_preset_id: null,
		world_info: { mode: "chat" },
		wardrobe_model: null,
		analysis_guidance: "",
		wardrobe_guidance: ""
	},
	translation: {
		deepl_endpoint: "free",
		glossary: []
	},
	ui: {
		color_mode: "system",
		inspector_width: 320,
		inspector_collapsed: !1,
		optional_entry_enabled: !1
	}
};
function Hn() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: Rn,
			submit: H,
			cancel: H,
			retry: H,
			dismiss: H
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: Rn,
			save: H,
			remove: H,
			test_connection: H,
			set_credential: H,
			clear_credential: H,
			save_novelai_defaults: H,
			save_prompt_tags: H
		},
		novelai: {
			get_account: H,
			load: () => Promise.resolve([]),
			refresh_models: H,
			estimate_cost: H
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: Rn,
			load_draft: H,
			save_draft: H,
			remove: H,
			bulk_remove: H,
			test_regex: H
		},
		assets: {
			load: () => Promise.resolve(zn),
			subscribe: Rn,
			save: H,
			remove: H,
			reorder: H
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: Rn,
			read_bytes: H,
			pin: H,
			detach_from_message: H,
			delete_record: H,
			reveal_source: H,
			bulk_delete: H
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			search: H,
			lookup: () => Promise.resolve(null),
			prepare: H,
			next_page: H,
			install: H,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(Bn),
			subscribe: Rn,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: H
		},
		settings: {
			load: () => Promise.resolve({
				settings: Vn,
				vocabulary_update_channel: "bundled",
				browser_secret_vault: {
					state: "unavailable",
					secret_count: 0
				}
			}),
			subscribe: Rn,
			update: H,
			set_analysis_key: H,
			list_worldbooks: H,
			clear_analysis_key: H,
			set_deepl_key: H,
			clear_deepl_key: H,
			initialize_browser_secret_vault: H,
			unlock_browser_secret_vault: H,
			lock_browser_secret_vault: H,
			reset_browser_secret_vault: H,
			set_vocabulary_update_channel: H,
			import_vocabulary_package: H,
			cancel_vocabulary_import: () => {},
			export_archive: H,
			import_archive: H
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var Un = { status: "idle" }, Wn = "capability_load_failed", Gn = "command_failed", Kn = /^[a-z][a-z0-9_]*$/u;
function qn(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && Kn.test(t)) return { code: t };
	}
	return { code: t };
}
function U(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var Jn = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function Yn(e) {
	return e === "failed" ? "error" : "pending";
}
function Xn(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function Zn(e) {
	return {
		id: e.job_id,
		label_code: Xn(e.state),
		status: Yn(e.state),
		progress: e.state !== "failed" && e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null,
		error: e.state === "failed" ? e.error?.code ?? null : null
	};
}
function Qn(e) {
	return e.filter((e) => Jn.has(e.state)).map(Zn);
}
function $n(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: qn(e, Gn)
		});
	}));
}
function er(e, t, n) {
	return {
		route: e,
		settings_section: "illustration",
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		generation: {
			profiles: [],
			active_profile_id: null,
			jobs: []
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: Un
		},
		assets: {
			active_category: "character",
			records: {
				character: [],
				outfit: [],
				lora: [],
				vibe: [],
				workflow: [],
				prompt_tag: []
			},
			vocabulary_catalog: [],
			vocabulary_install_command: Un
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: Un
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			support_bundle_command: Un
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: Un
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var tr = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = er(e.initial_route ?? "settings", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
		this.#o({ generation: {
			...this.#t.generation,
			...e
		} });
	}
	#c(e) {
		this.#o({
			generation: {
				...this.#t.generation,
				jobs: e
			},
			tasks: Qn(e)
		});
	}
	#l(e) {
		this.#o({ prompt: {
			...this.#t.prompt,
			...e
		} });
	}
	#u(e) {
		this.#o({ assets: {
			...this.#t.assets,
			...e
		} });
	}
	#d(e) {
		this.#o({ gallery: {
			...this.#t.gallery,
			...e
		} });
	}
	#f(e) {
		this.#o({ diagnostics: {
			...this.#t.diagnostics,
			...e
		} });
	}
	#p(e) {
		this.#o({ settings: {
			...this.#t.settings,
			...e
		} });
	}
	#m(e) {
		this.#o({ inspector: {
			...this.#t.inspector,
			...e
		} });
	}
	#h(e, t) {
		let n = new Set(this.#t.loading);
		t ? n.add(e) : n.delete(e), this.#o({ loading: n });
	}
	#g(e, t) {
		let n = new Map(this.#t.failures);
		t ? n.set(e, t) : n.delete(e), this.#o({ failures: n });
	}
	#_(e, t, n) {
		return this.#h(e, !0), t().then((t) => {
			this.#i || (n(t), this.#g(e, null));
		}).catch((t) => {
			this.#i || this.#g(e, qn(t, Wn));
		}).finally(() => {
			this.#h(e, !1);
		});
	}
	#v(e) {
		this.#i || (e.type === "job_updated" ? this.#c(U(this.#t.generation.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.generation.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#y(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: U(this.#t.generation.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.generation.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#b(e) {
		this.#i || (e.type === "preset_upserted" ? this.#l({ presets: U(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#l({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#x(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: U(this.#t.assets.records[t], e.asset, (e) => e.id)
			};
			this.#u({ records: n });
		} else {
			let t = {
				...this.#t.assets.records,
				[e.category]: this.#t.assets.records[e.category].filter((t) => t.id !== e.asset_id)
			};
			this.#u({ records: t });
		}
	}
	#S(e) {
		this.#i || (e.type === "record_upserted" ? this.#d({ records: U(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#d({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
	}
	#C(e) {
		this.#i || this.#f({ timeline: [...this.#t.diagnostics.timeline, e.entry] });
	}
	#w(e) {
		this.#i || this.#p({ settings: e.settings });
	}
	load_vocabulary_catalog() {
		return this.#_("vocabulary", () => this.#e.vocabulary.load(), (e) => {
			this.#u({ vocabulary_catalog: e });
		});
	}
	async start() {
		this.#r = [
			this.#e.generation.subscribe((e) => {
				this.#v(e);
			}),
			this.#e.profiles.subscribe((e) => {
				this.#y(e);
			}),
			this.#e.prompt_presets.subscribe((e) => {
				this.#b(e);
			}),
			this.#e.assets.subscribe((e) => {
				this.#x(e);
			}),
			this.#e.gallery.subscribe((e) => {
				this.#S(e);
			}),
			this.#e.diagnostics.subscribe((e) => {
				this.#C(e);
			}),
			this.#e.settings.subscribe((e) => {
				this.#w(e);
			})
		], await Promise.allSettled([
			...this.#T(),
			this.#_("diagnostics", () => this.#e.diagnostics.load(), (e) => {
				this.#f({ snapshot: e });
			}),
			this.#_("settings", () => this.#e.settings.load(), (e) => {
				this.#p({
					settings: e.settings,
					vocabulary_update_channel: e.vocabulary_update_channel,
					browser_secret_vault: e.browser_secret_vault
				});
			})
		]);
	}
	#T() {
		return [
			this.#_("generation", () => this.#e.generation.load(), (e) => {
				this.#c(e);
			}),
			this.#_("profiles", () => this.#e.profiles.load(), (e) => {
				this.#s({
					profiles: e,
					active_profile_id: this.#t.generation.active_profile_id ?? e[0]?.id ?? null
				});
			}),
			this.#_("prompt_presets", () => this.#e.prompt_presets.load(), (e) => {
				this.#l({ presets: e });
			}),
			this.#_("assets", () => this.#e.assets.load(), (e) => {
				this.#u({ records: e });
			}),
			this.#_("gallery", () => this.#e.gallery.load(), (e) => {
				this.#d({ records: e });
			})
		];
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
	set_settings_section(e) {
		this.#o({
			route: "settings",
			settings_section: e
		});
	}
	set_inspector_width(e) {
		this.#m({ width: e });
	}
	set_inspector_collapsed(e) {
		this.#m({ collapsed: e });
	}
	select_inspector_record(e) {
		this.#m({ selected_record: e });
	}
	async select_prompt_preset(e) {
		this.#l({ selected_preset_id: e });
		let t = await this.#e.prompt_presets.load_draft(e);
		this.#i || this.#l({ draft: t });
	}
	start_new_prompt_preset() {
		this.#l({
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
	update_prompt_draft(e) {
		this.#t.prompt.draft && this.#l({ draft: {
			...this.#t.prompt.draft,
			...e
		} });
	}
	async bulk_remove_prompt_presets(e) {
		if (await this.#e.prompt_presets.bulk_remove(e), this.#i) return;
		let t = new Set(e);
		this.#l({
			presets: this.#t.prompt.presets.filter((e) => !t.has(e.id)),
			selected_preset_id: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.selected_preset_id,
			draft: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.draft
		});
	}
	test_prompt_regex(e, t) {
		return this.#e.prompt_presets.test_regex(e, t);
	}
	save_prompt_preset(e) {
		return $n(() => this.#t.prompt.save_command, (e) => {
			this.#l({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#l({
				presets: U(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return $n(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#u({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return $n(() => this.#t.settings.update_command, (e) => {
			this.#p({ update_command: e });
		}, async () => {
			let t = await this.#e.settings.update(e);
			if (e.credential_storage_mode === void 0) return this.#p({ settings: t }), t;
			let [n, r] = await Promise.all([this.#e.settings.load(), this.#e.profiles.load()]);
			return this.#p({
				settings: n.settings,
				vocabulary_update_channel: n.vocabulary_update_channel,
				browser_secret_vault: n.browser_secret_vault
			}), this.#s({ profiles: r }), n.settings;
		});
	}
	export_support_bundle() {
		return $n(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#f({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	async load_diagnostics_timeline() {
		let e = await this.#e.diagnostics.load_timeline();
		this.#i || this.#f({ timeline: e });
	}
	async save_provider_profile(e) {
		let t = await this.#e.profiles.save(e), n = t.is_default || this.#t.generation.active_profile_id === null;
		return n && await this.#e.settings.update({ active_provider_profile_id: t.id }), this.#i || this.#s({
			profiles: U(this.#t.generation.profiles, t, (e) => e.id),
			...n ? { active_profile_id: t.id } : {}
		}), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e), this.#i || this.#s({ profiles: this.#t.generation.profiles.filter((t) => t.id !== e) });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	async set_provider_profile_credential(e, t) {
		let n = await this.#e.profiles.set_credential(e, t);
		return this.#i || this.#s({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#s({ profiles: U(this.#t.generation.profiles, t, (e) => e.id) }), t;
	}
	async save_novelai_defaults(e, t) {
		let n = await this.#e.profiles.save_novelai_defaults(e, t);
		return this.#i || this.#s({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async save_prompt_tags(e, t) {
		let n = await this.#e.profiles.save_prompt_tags(e, t);
		return this.#i || this.#s({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	load_novelai_account() {
		return this.#e.novelai.get_account();
	}
	load_novelai_models() {
		return this.#e.novelai.load();
	}
	set_deepl_key(e) {
		return this.#e.settings.set_deepl_key(e);
	}
	set_analysis_key(e) {
		return this.#e.settings.set_analysis_key(e);
	}
	list_worldbooks() {
		return this.#e.settings.list_worldbooks();
	}
	clear_analysis_key() {
		return this.#e.settings.clear_analysis_key();
	}
	clear_deepl_key() {
		return this.#e.settings.clear_deepl_key();
	}
	async initialize_browser_secret_vault(e) {
		let t = await this.#e.settings.initialize_browser_secret_vault(e);
		this.#i || this.#p({ browser_secret_vault: t });
	}
	async unlock_browser_secret_vault(e) {
		let t = await this.#e.settings.unlock_browser_secret_vault(e);
		this.#i || this.#p({ browser_secret_vault: t });
	}
	async lock_browser_secret_vault() {
		let e = await this.#e.settings.lock_browser_secret_vault();
		this.#i || this.#p({ browser_secret_vault: e });
	}
	async reset_browser_secret_vault() {
		let e = await this.#e.settings.reset_browser_secret_vault();
		this.#i || this.#p({ browser_secret_vault: e });
	}
	async set_vocabulary_update_channel(e) {
		await this.#e.settings.set_vocabulary_update_channel(e), this.#i || this.#p({ vocabulary_update_channel: e });
	}
	import_vocabulary_package(e, t) {
		return this.#e.settings.import_vocabulary_package(e, t);
	}
	cancel_vocabulary_import() {
		this.#e.settings.cancel_vocabulary_import();
	}
	export_settings_archive() {
		return this.#e.settings.export_archive();
	}
	async import_settings_archive(e) {
		await this.#e.settings.import_archive(e), await Promise.allSettled(this.#T());
	}
	set_active_asset_category(e) {
		this.#u({ active_category: e });
	}
	async save_asset(e, t) {
		let n = await this.#e.assets.save(e, t);
		this.#i || this.#u({ records: {
			...this.#t.assets.records,
			[e]: U(this.#t.assets.records[e], n, (e) => e.id)
		} });
	}
	async remove_asset(e, t) {
		await this.#e.assets.remove(e, t), !this.#i && this.#u({ records: {
			...this.#t.assets.records,
			[e]: this.#t.assets.records[e].filter((e) => e.id !== t)
		} });
	}
	async reorder_assets(e, t) {
		if (await this.#e.assets.reorder(e, t), this.#i) return;
		let n = new Map(this.#t.assets.records[e].map((e) => [e.id, e])), r = t.map((e) => n.get(e)).filter((e) => e !== void 0);
		this.#u({ records: {
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
	select_gallery_record(e) {
		this.#d({ selected_record_id: e });
	}
	reveal_gallery_source(e) {
		return this.#e.gallery.reveal_source(e);
	}
	read_gallery_bytes(e) {
		return this.#e.gallery.read_bytes(e);
	}
	async pin_gallery_record(e, t) {
		await this.#e.gallery.pin(e, t), !this.#i && this.#d({ records: this.#t.gallery.records.map((n) => n.id === e ? {
			...n,
			pinned: t
		} : n) });
	}
	async detach_gallery_record(e) {
		await this.#e.gallery.detach_from_message(e), !this.#i && this.#d({ records: this.#t.gallery.records.map((t) => t.id === e ? {
			...t,
			quarantined: !0
		} : t) });
	}
	async delete_gallery_record(e) {
		await this.#e.gallery.delete_record(e), !this.#i && this.#d({
			records: this.#t.gallery.records.filter((t) => t.id !== e),
			selected_record_id: this.#t.gallery.selected_record_id === e ? null : this.#t.gallery.selected_record_id
		});
	}
	async dismiss_failed_tasks() {
		let e = this.#t.generation.jobs.filter((e) => e.state === "failed");
		await this.#e.generation.dismiss(e.map((e) => e.job_id));
	}
	bulk_delete_gallery_records(e) {
		return $n(() => this.#t.gallery.bulk_delete_command, (e) => {
			this.#d({ bulk_delete_command: e });
		}, async () => {
			await this.#e.gallery.bulk_delete(e);
			let t = new Set(e);
			this.#d({
				records: this.#t.gallery.records.filter((e) => !t.has(e.id)),
				selected_record_id: this.#t.gallery.selected_record_id !== null && t.has(this.#t.gallery.selected_record_id) ? null : this.#t.gallery.selected_record_id
			});
		});
	}
};
function nr(e) {
	return new tr(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function rr(e) {
	let t = he(nr(e)), n = be(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), fe(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var ir = De("image", [
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
]), ar = De("panel-right-close", [
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
]), or = De("panel-right-open", [
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
]), sr = ["image", "video"], cr = /^(?:blob:|data:image\/|data:video\/)/u, lr = c({
	kind: u(sr),
	url: o().min(1).refine((e) => cr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function ur(e) {
	let t = lr.safeParse(e);
	return t.success ? t.data : null;
}
function dr(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: ur(n)
	};
}
var fr = 8;
function pr(e, t) {
	let n = Math.max(fr, t.width - 56 - fr), r = Math.max(fr, t.height - 56 - fr);
	return {
		x: Math.min(Math.max(e.x, fr), n),
		y: Math.min(Math.max(e.y, fr), r)
	};
}
function mr(e) {
	return pr({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var hr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function gr(e) {
	let t = ur(e);
	return t !== null && t.kind === "image" ? t : null;
}
var _r = class {
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
		this.#n && (this.#t = pr(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = mr(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? mr(t) : pr(e, t);
	}
}, vr = "(min-width: 960px)";
function yr() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(vr).matches;
}
function br(e) {
	if (e !== void 0) return F(() => e);
	let t = j(yr());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(vr), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), fe(() => {
			e.removeEventListener("change", n);
		});
	}
	return F(() => t.value ? "desktop" : "mobile");
}
var xr = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, Sr = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], Cr = ["src"], wr = ["src"], Tr = /* @__PURE__ */ R({
	__name: "FloatingEntry",
	props: {
		enabled: { type: Boolean },
		mediaState: { default: "idle" },
		mediaAssets: { default: () => ({}) },
		openLabel: { default: "Open Inkwell" },
		positionStore: { default: void 0 },
		viewportOverride: { default: void 0 }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = br(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new _r({
			position_store: xe(n.positionStore) ?? he(new hr()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = j(o.position), c = j(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		pe(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		E(() => {
			window.addEventListener("resize", u);
		}), ve(() => {
			window.removeEventListener("resize", u);
		});
		let d = F(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: gr(n.mediaAssets.idle)
			} : dr(n.mediaAssets, e);
		}), f = !1;
		function p(e) {
			let t = e.currentTarget;
			if (!(t instanceof HTMLElement) || !e.isPrimary) return;
			let n = t;
			n.setPointerCapture(e.pointerId), o.begin_drag(), l();
			let r = {
				x: e.clientX,
				y: e.clientY
			}, i = o.position;
			function a(e) {
				o.drag_to({
					x: i.x + (e.clientX - r.x),
					y: i.y + (e.clientY - r.y)
				}), l();
			}
			function s() {
				n.removeEventListener("pointermove", a), n.removeEventListener("pointerup", c), n.removeEventListener("pointercancel", u), n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId);
				let { moved: t } = o.end_drag();
				l(), f = t;
			}
			function c() {
				s();
			}
			function u() {
				s();
			}
			n.addEventListener("pointermove", a), n.addEventListener("pointerup", c), n.addEventListener("pointercancel", u);
		}
		function m() {
			if (f) {
				f = !1;
				return;
			}
			r("open");
		}
		function h(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), r("open"));
		}
		return (t, n) => e.enabled ? (D(), O("button", {
			key: 0,
			type: "button",
			class: L(["tc-interactive", [A(xr).floatingEntry, c.value && A(xr).floatingEntryDragging]]),
			style: ge({
				left: `${s.value.x}px`,
				top: `${s.value.y}px`
			}),
			"aria-label": e.openLabel,
			"data-testid": "floating-entry",
			"data-dragging": c.value,
			"data-media-state": d.value.state,
			"data-shadow-role": "entry",
			onPointerdown: p,
			onClick: m,
			onKeydown: h
		}, [d.value.asset?.kind === "video" ? (D(), O("video", {
			key: 0,
			class: L(A(xr).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, Cr)) : d.value.asset?.kind === "image" ? (D(), O("img", {
			key: 1,
			class: L(A(xr).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, wr)) : (D(), N(Oe, {
			key: 2,
			icon: A(ir)
		}, null, 8, ["icon"]))], 46, Sr)) : M("", !0);
	}
}), Er = "data-tavern-canvas-menu-entry";
function Dr(e, t) {
	let n = j(!1), r = null;
	return E(() => {
		let i = document.getElementById("extensionsMenu");
		if (i === null) return;
		i.querySelector(`[${Er}]`)?.remove(), r = document.createElement("div"), r.className = "list-group-item flex-container flexGap5 interactable", r.setAttribute(Er, ""), r.setAttribute("role", "button"), r.tabIndex = 0;
		let a = document.createElement("div");
		a.className = "extensionsMenuExtensionButton", a.append(Fe(document));
		let o = document.createElement("span");
		ce(() => {
			o.textContent = e();
		}), r.append(a, o), r.addEventListener("click", t), i.append(r), n.value = !0;
	}), ve(() => {
		r?.remove();
	}), n;
}
//#endregion
//#region src/ui/experience/use_host_entry_points.ts
var Or = "data-tavern-canvas-settings", kr = "inkwell", Ar = !1;
function jr(e, t) {
	if (Ar) return;
	let n = globalThis.SillyTavern?.getContext?.(), r = n?.SlashCommand?.fromProps?.({
		name: kr,
		helpString: e,
		returns: "nothing",
		callback: () => (t(), "")
	});
	r !== void 0 && n?.SlashCommandParser?.addCommandObject !== void 0 && (n.SlashCommandParser.addCommandObject(r), Ar = !0);
}
function Mr(e, t) {
	let n = null;
	E(() => {
		jr(e.description(), t);
		let r = document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
		if (r === null) return;
		r.querySelector(`[${Or}]`)?.remove(), n = document.createElement("div"), n.setAttribute(Or, ""), n.className = "flex-container flexFlowColumn flexGap5";
		let i = document.createElement("b"), a = document.createElement("small"), o = document.createElement("div");
		ce(() => {
			i.textContent = e.name(), a.textContent = e.description(), o.textContent = e.open();
		}), o.className = "menu_button interactable", o.setAttribute("role", "button"), o.tabIndex = 0, o.addEventListener("click", t), o.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t());
		}), n.append(i, a, o), r.append(n);
	}), ve(() => {
		n?.remove();
	});
}
function Nr(e, t, n) {
	let r = Math.max(20, t.width - n.width - 20), i = Math.max(20, t.height - n.height - 20);
	return {
		x: Math.min(Math.max(e.x, 20), r),
		y: Math.min(Math.max(e.y, 20), i)
	};
}
function Pr(e, t) {
	return Nr({
		x: e.width - t.width - 20,
		y: 64
	}, e, t);
}
var Fr = {
	window: "_window_1rdvc_1",
	"floating-window-enter": "_floating-window-enter_1rdvc_1"
}, Ir = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], Lr = /* @__PURE__ */ R({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = j(null), r = j({
			x: 0,
			y: 0
		}), i = j(!1), a = j(!1);
		function o() {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		function s(e) {
			let t = e.getBoundingClientRect();
			return {
				width: t.width,
				height: t.height
			};
		}
		function c() {
			let e = n.value;
			if (e === null || window.innerWidth < 960) return;
			let t = o(), a = s(e);
			r.value = i.value ? Nr(r.value, t, a) : Pr(t, a), i.value = !0;
		}
		function l(e) {
			let t = n.value, i = e.target;
			if (t === null || !(i instanceof Element) || !e.isPrimary || e.button !== 0 || window.innerWidth < 960 || i.closest("[data-window-drag-handle]") === null || i.closest("button, a, input, select, textarea, [role='button']") !== null) return;
			let c = t;
			e.preventDefault(), c.setPointerCapture(e.pointerId), a.value = !0;
			let l = {
				x: e.clientX,
				y: e.clientY
			}, u = r.value;
			function d(e) {
				r.value = Nr({
					x: u.x + e.clientX - l.x,
					y: u.y + e.clientY - l.y
				}, o(), s(c));
			}
			function f() {
				c.removeEventListener("pointermove", d), c.removeEventListener("pointerup", p), c.removeEventListener("pointercancel", m), c.hasPointerCapture(e.pointerId) && c.releasePointerCapture(e.pointerId), a.value = !1;
			}
			function p() {
				f();
			}
			function m() {
				f();
			}
			c.addEventListener("pointermove", d), c.addEventListener("pointerup", p), c.addEventListener("pointercancel", m);
		}
		function u() {
			c();
		}
		return E(() => {
			window.addEventListener("resize", u), ue(c);
		}), ve(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (D(), O("section", {
			ref_key: "window_element",
			ref: n,
			class: L(A(Fr).window),
			style: ge({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [le(e.$slots, "default")], 46, Ir));
	}
}), Rr = /* @__PURE__ */ R({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return de(we, t.portalTarget), (e, t) => le(e.$slots, "default");
	}
}), zr = /* @__PURE__ */ R({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = k(() => import("./chunks/GalleryView-BVygqVjd.js")), n = k(() => import("./chunks/SettingsView-BWl78LhW.js").then((e) => e.t));
		return (r, i) => e.state.route === "gallery" ? (D(), N(A(t), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (D(), N(A(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), Br = ["aria-label", "title"], Vr = ["aria-label", "aria-expanded"], Hr = ["data-status"], Ur = {
	key: 0,
	class: "tc-tabular-nums"
}, Wr = /* @__PURE__ */ R({
	__name: "TaskStrip",
	props: { tasks: {} },
	emits: ["clear-failed"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a, n: o } = ye(), s = j(!0), c = {
			"status.loading": () => a("status.loading"),
			"status.empty": () => a("status.empty"),
			"status.partial": () => a("status.partial"),
			"status.error": () => a("status.error"),
			"status.disabled": () => a("status.disabled"),
			"status.success": () => a("status.success"),
			"status.pending": () => a("status.pending"),
			"status.running": () => a("status.running"),
			"status.cancelled": () => a("status.cancelled"),
			"status.completed": () => a("status.completed"),
			"status.failed": () => a("status.failed"),
			"status.retrying": () => a("status.retrying"),
			"status.online": () => a("status.online"),
			"status.offline": () => a("status.offline"),
			"status.connected": () => a("status.connected"),
			"status.blocked": () => a("status.blocked"),
			"status.unknown": () => a("status.unknown")
		};
		function l(e) {
			return c[e]?.() ?? e;
		}
		function u(e) {
			let t = l(e.label_code);
			return e.error === null ? t : t + a("nav.task_strip_error", { reason: Be(a, e.error) });
		}
		let d = F(() => r.tasks.some((e) => e.status === "error")), f = F(() => s.value ? a("nav.task_strip_collapse") : a("nav.task_strip_expand"));
		function p() {
			s.value = !s.value;
		}
		return (t, n) => r.tasks.length > 0 ? (D(), O("div", {
			key: 0,
			class: L(A(e).task_strip)
		}, [P("div", { class: L(A(e).task_strip_header) }, [
			P("span", { class: L([A(e).task_strip_summary, "tc-tabular-nums"]) }, I(A(a)("nav.task_strip_count", r.tasks.length)), 3),
			d.value ? (D(), O("button", {
				key: 0,
				type: "button",
				class: L(["tc-interactive", A(e).icon_button]),
				"aria-label": A(a)("nav.task_strip_clear_failed"),
				title: A(a)("nav.task_strip_clear_failed"),
				"data-testid": "task-strip-clear-failed",
				onClick: n[0] ||= (e) => i("clear-failed")
			}, [z(Oe, {
				icon: A(Me),
				size: 16
			}, null, 8, ["icon"])], 10, Br)) : M("", !0),
			P("button", {
				type: "button",
				class: L(["tc-interactive", A(e).icon_button]),
				"aria-label": f.value,
				"aria-expanded": s.value,
				onClick: p
			}, [z(Oe, {
				icon: s.value ? A(ke) : A(Ae),
				size: 16
			}, null, 8, ["icon"])], 10, Vr)
		], 2), s.value ? (D(), O("div", {
			key: 0,
			class: L(A(e).task_strip_list)
		}, [(D(!0), O(Se, null, se(r.tasks, (t) => (D(), O("div", {
			key: t.id,
			class: L(A(e).task_chip)
		}, [
			P("span", {
				class: L(A(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, Hr),
			P("span", { class: L(A(e).task_chip_label) }, I(u(t)), 3),
			t.progress === null ? M("", !0) : (D(), O("span", Ur, I(A(o)(t.progress, "percent")), 1))
		], 2))), 128))], 2)) : M("", !0)], 2)) : M("", !0);
	}
}), Gr = ["aria-label", "aria-pressed"], Kr = ["aria-label", "title"], qr = /* @__PURE__ */ R({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean },
		inspectorAvailable: { type: Boolean }
	},
	emits: ["set-inspector-collapsed", "close"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = ye(), o = F(() => je(a, r.route)), s = F(() => r.inspectorCollapsed ? or : ar), c = F(() => r.inspectorCollapsed ? a("nav.inspector_expand") : a("nav.inspector_collapse"));
		function l() {
			i("set-inspector-collapsed", !r.inspectorCollapsed);
		}
		return (n, r) => (D(), O("header", {
			class: L(A(e).top_bar),
			"data-window-drag-handle": ""
		}, [P("div", { class: L(A(e).top_bar_start) }, [
			P("span", { class: L(A(e).top_bar_brand) }, I(A(a)("app.name")), 3),
			P("span", {
				class: L(A(e).top_bar_divider),
				"aria-hidden": "true"
			}, "/", 2),
			P("span", { class: L(A(e).top_bar_title) }, I(o.value), 3)
		], 2), P("div", { class: L(A(e).top_bar_end) }, [t.inspectorAvailable ? (D(), O("button", {
			key: 0,
			type: "button",
			class: L(["tc-interactive", A(e).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": c.value,
			"aria-pressed": !t.inspectorCollapsed,
			onClick: l
		}, [z(Oe, {
			icon: s.value,
			size: 18
		}, null, 8, ["icon"])], 10, Gr)) : M("", !0), P("button", {
			type: "button",
			class: L(["tc-interactive", [A(e).icon_button, A(e).close_button]]),
			"data-testid": "studio-close",
			"aria-label": A(a)("common.close"),
			title: A(a)("common.close"),
			onClick: r[0] ||= (e) => i("close")
		}, [z(Oe, {
			icon: A(Ne),
			size: 18
		}, null, 8, ["icon"])], 10, Kr)], 2)], 2));
	}
}), Jr = ["data-viewport", "data-inspector-collapsed"], Yr = ["aria-label"], Xr = /* @__PURE__ */ R({
	__name: "StudioShell",
	props: {
		state: {},
		controller: {},
		viewport: {}
	},
	emits: [
		"select-route",
		"set-inspector-collapsed",
		"resize-inspector",
		"close"
	],
	setup(t, { emit: n }) {
		let r = k(() => import("./chunks/ContextInspector-DlT2UO3O.js")), i = k(() => import("./chunks/DesktopIconRail-Ch3QGygM.js")), a = k(() => import("./chunks/InspectorSheet-CTK9Tyf8.js")), o = k(() => import("./chunks/MobileBottomNav-BUyAs2d3.js")), s = t, c = n, { t: l } = ye(), u = br(s.viewport), d = /* @__PURE__ */ new Set(["vocabulary"]), f = F(() => [...s.state.loading].some((e) => !d.has(e))), p = F(() => s.state.failures.size > 0), m = F(() => ({ "--tc-inspector-width": `${String(s.state.inspector.width)}px` })), h = j(!1), g = F(() => s.state.route === "gallery" || s.state.settings_section === "library"), _ = F(() => !g.value || s.state.inspector.collapsed), v = F(() => u.value === "mobile" ? !h.value : _.value);
		function y(e) {
			u.value === "mobile" && (h.value = !e), c("set-inspector-collapsed", e);
		}
		function b(e) {
			c("select-route", e);
		}
		return (t, n) => (D(), O("div", {
			class: L(A(e).shell),
			"data-viewport": A(u),
			"data-inspector-collapsed": A(u) === "desktop" ? _.value : null,
			style: ge(m.value)
		}, [
			z(qr, {
				route: s.state.route,
				"inspector-collapsed": v.value,
				"inspector-available": g.value,
				onSetInspectorCollapsed: y,
				onClose: n[0] ||= (e) => c("close")
			}, null, 8, [
				"route",
				"inspector-collapsed",
				"inspector-available"
			]),
			A(u) === "desktop" ? (D(), N(A(i), {
				key: 0,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : M("", !0),
			P("main", {
				class: L(A(e).workspace),
				"data-testid": "workspace"
			}, [p.value ? (D(), O("div", {
				key: 0,
				class: L(A(e).partial_banner),
				"data-testid": "partial-banner"
			}, [P("div", null, [P("p", null, I(A(l)("app.partial_init.banner_title")), 1), P("p", null, I(A(l)("app.partial_init.banner_description")), 1)]), P("button", {
				type: "button",
				class: L(["tc-interactive", A(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: n[1] ||= (e) => s.controller.set_settings_section("diagnostics")
			}, I(A(l)("settings.nav.diagnostics")), 3)], 2)) : M("", !0), f.value ? (D(), O("div", {
				key: 1,
				class: L(A(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": A(l)("status.loading")
			}, [
				P("div", {
					class: L(A(e).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				P("div", {
					class: L(A(e).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				P("div", {
					class: L(A(e).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, Yr)) : (D(), N(zr, {
				key: 2,
				state: s.state,
				controller: s.controller
			}, null, 8, ["state", "controller"]))], 2),
			A(u) === "desktop" && g.value && !s.state.inspector.collapsed ? (D(), N(A(r), {
				key: 1,
				width: s.state.inspector.width,
				selection: s.state.inspector.selected_record,
				onResize: n[2] ||= (e) => c("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : M("", !0),
			z(Wr, {
				tasks: s.state.tasks,
				onClearFailed: n[3] ||= () => void s.controller.dismiss_failed_tasks()
			}, null, 8, ["tasks"]),
			A(u) === "mobile" ? (D(), N(A(o), {
				key: 2,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : M("", !0),
			A(u) === "mobile" && g.value ? (D(), N(A(a), {
				key: 3,
				open: h.value,
				selection: s.state.inspector.selected_record,
				"onUpdate:open": n[4] ||= (e) => y(!e)
			}, null, 8, ["open", "selection"])) : M("", !0)
		], 14, Jr));
	}
}), Zr = ["href"], Qr = /* @__PURE__ */ R({
	__name: "AppRoot",
	props: {
		status: {},
		probe: {},
		version: {},
		portalTarget: {},
		hostElement: {},
		capabilities: {},
		host: {},
		illustrations: {},
		translator: {}
	},
	setup(t) {
		let n = t, r = k(() => import("./chunks/ChatLayer-DnJhJr3Y.js")), { t: i } = ye();
		function a() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let o = n.hostElement, s = a();
		o.dataset.colorMode = s;
		let c = F(() => n.probe.ready ? void 0 : n.probe.current_version), l = F(() => `${i("app.name")} ${i("app.version_label", { version: n.version })}`), u = n.status.state === "ready" ? rr({
			capabilities: n.capabilities ?? Hn(),
			initial_color_mode: s
		}) : null, d = u === null ? null : n.host ?? null, f = j(d?.get_active_chat_id() ?? null), p = d?.subscribe_chat_change((e) => {
			f.value = e.chat_id;
		});
		ve(() => p?.()), de(Ee, f);
		let m = u === null ? null : n.illustrations ?? null, h = n.capabilities?.gallery;
		de(Te, m === null || h === void 0 ? null : {
			async generate(e) {
				let t = await m.generate_image({
					...e,
					character_prompts: []
				});
				return new Blob([new Uint8Array(await h.read_bytes(t))]);
			},
			read_outfit: (e) => m.read_outfit(e),
			read_character: (e) => m.read_character(e)
		});
		let g = F(() => {
			let e = u?.state.value, t = e?.settings.settings?.active_provider_profile_id ?? null;
			return {
				profile: e?.generation.profiles.find((e) => e.id === t) ?? null,
				custom_presets: e?.assets.records.prompt_tag ?? [],
				save: (e, t) => u === null ? Promise.resolve() : u.controller.save_prompt_tags(e, t)
			};
		});
		u && pe(() => u.state.value.color_mode, (e) => {
			o.dataset.colorMode = e;
		});
		function _(e) {
			u?.controller.set_route(e);
		}
		function v(e) {
			u?.controller.set_inspector_collapsed(e);
		}
		function y(e) {
			u?.controller.set_inspector_width(e);
		}
		function b() {
			window.location.reload();
		}
		let x = j(!1), S = F(() => x.value), ee = Dr(() => i("app.name"), w);
		Mr({
			name: () => i("app.name"),
			description: () => i("app.entry_description"),
			open: () => i("app.open_action")
		}, w);
		let C = F(() => !ee.value || u?.state.value.settings.settings?.ui.optional_entry_enabled === !0);
		pe(S, (e) => {
			o.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function w() {
			x.value = !0;
		}
		function te() {
			x.value = !1;
		}
		return (n, a) => (D(), N(Rr, { "portal-target": t.portalTarget }, {
			default: me(() => [t.status.state === "blocked" ? (D(), O("div", {
				key: 0,
				class: L(A(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				P("p", { class: L(A(e).state_screen_eyebrow) }, I(l.value), 3),
				P("h1", { class: L(A(e).state_screen_title) }, I(A(i)("app.unsupported_host.title")), 3),
				P("p", { class: L(A(e).state_screen_description) }, I(A(i)("app.unsupported_host.description", {
					required_version: A(Tn),
					current_version: c.value ?? A(i)("status.unknown")
				})), 3),
				P("a", {
					class: L(["tc-interactive", A(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, I(A(i)("app.unsupported_host.update_action")), 11, Zr)
			], 2)) : t.status.state === "failed" ? (D(), O("div", {
				key: 1,
				class: L(A(e).state_screen),
				"data-startup-state": "failed"
			}, [
				P("p", { class: L(A(e).state_screen_eyebrow) }, I(l.value), 3),
				P("h1", { class: L(A(e).state_screen_title) }, I(A(i)("app.fatal_error.title")), 3),
				P("p", { class: L(A(e).state_screen_description) }, I(A(i)("app.fatal_error.description")), 3),
				P("button", {
					type: "button",
					class: L(["tc-interactive", A(e).state_screen_action]),
					onClick: b
				}, I(A(i)("app.fatal_error.reload_action")), 3)
			], 2)) : A(u) ? (D(), O(Se, { key: 2 }, [
				S.value ? (D(), N(Lr, {
					key: 0,
					label: A(i)("app.name")
				}, {
					default: me(() => [z(Xr, {
						state: A(u).state.value,
						controller: A(u).controller,
						onSelectRoute: _,
						onSetInspectorCollapsed: v,
						onResizeInspector: y,
						onClose: te
					}, null, 8, ["state", "controller"])]),
					_: 1
				}, 8, ["label"])) : M("", !0),
				z(Tr, {
					enabled: C.value && !S.value,
					"open-label": A(i)("app.name"),
					onOpen: w
				}, null, 8, ["enabled", "open-label"]),
				t.host && A(m) && t.capabilities ? (D(), N(A(r), {
					key: 1,
					host: t.host,
					service: A(m),
					gallery: t.capabilities.gallery,
					novelai: t.capabilities.novelai,
					translator: t.translator ?? null,
					"prompt-tags": g.value
				}, null, 8, [
					"host",
					"service",
					"gallery",
					"novelai",
					"translator",
					"prompt-tags"
				])) : M("", !0)
			], 64)) : M("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
}), $r = "._slot_cjg26_3{max-width:min(100%,512px);color:var(--SmartThemeBodyColor,inherit);font-size:calc(var(--mainFontSize,1rem) * .9);margin:.5em 0}._frame_cjg26_10{border:1px solid var(--SmartThemeBorderColor,#80808066);background:var(--SmartThemeBlurTintColor,#00000026);border-radius:10px;position:relative;overflow:hidden}._image_cjg26_18{cursor:zoom-in;width:100%;height:auto;display:block}._placeholder_cjg26_25{text-align:center;opacity:.85;flex-direction:column;justify-content:center;align-items:center;gap:.5em;min-height:96px;padding:1em;display:flex}._error_cjg26_37{color:var(--SmartThemeQuoteColor,#e06c75)}._toolbar_cjg26_41{flex-wrap:wrap;align-items:center;gap:.25em;margin-top:.35em;display:flex}._counter_cjg26_49{font-variant-numeric:tabular-nums;opacity:.75;margin-inline-end:auto}._button_cjg26_55{border:1px solid var(--SmartThemeBorderColor,#80808066);color:inherit;font:inherit;cursor:pointer;background:0 0;border-radius:6px;align-items:center;gap:.35em;padding:.2em .6em;display:inline-flex}._button_cjg26_55:hover:not(:disabled){background:var(--SmartThemeBlurTintColor,#80808026)}._button_cjg26_55:disabled{cursor:default;opacity:.5}._skeleton_cjg26_77{opacity:.2;background:currentColor;border-radius:4px;width:60%;height:.8em;animation:1.4s ease-in-out infinite _pulse_cjg26_1}._notice_cjg26_86{border-inline-start:3px solid var(--SmartThemeQuoteColor,#e06c75);background:var(--SmartThemeBlurTintColor,#0000001a);font-size:calc(var(--mainFontSize,1rem) * .85);margin:.5em 0;padding:.5em .75em}._excerpt_cjg26_94{white-space:pre-wrap;opacity:.8;max-height:8em;margin:.35em 0 0;font-family:monospace;overflow:auto}@keyframes _pulse_cjg26_1{50%{opacity:.45}}@media (prefers-reduced-motion:reduce){._skeleton_cjg26_77{animation:none}}._lightbox_cjg26_115{z-index:9999;cursor:zoom-out;background:#000c;justify-content:center;align-items:center;padding:2vmin;display:flex;position:fixed;inset:0}._lightbox_cjg26_115 img{object-fit:contain;max-width:100%;max-height:100%}._notice_actions_cjg26_133{gap:.35em;margin-top:.35em;display:flex}", ei = "tavern-canvas-chat-style";
function ti(e) {
	e.getElementById(ei)?.remove();
	let t = e.createElement("style");
	return t.id = ei, t.textContent = $r, e.head.append(t), () => {
		t.remove();
	};
}
//#endregion
//#region src/ui/create_shadow_root.ts
function ni(e, t) {
	e.getElementById("tavern-canvas-root")?.remove();
	let n = e.createElement("div");
	n.id = "tavern-canvas-root";
	let r = n.attachShadow({ mode: "open" }), i = e.createElement("style");
	i.textContent = t, r.append(i);
	let a = e.createElement("div");
	a.dataset.shadowRole = "app", r.append(a);
	let o = e.createElement("div");
	o.dataset.shadowRole = "portal", r.append(o), e.body.append(n);
	let s = He(r);
	return {
		host_element: n,
		shadow_root: r,
		app_element: a,
		portal_element: o,
		remove() {
			s(), n.remove();
		}
	};
}
//#endregion
//#region src/modules/media/media_command_service.ts
var ri = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async save(e) {
		let t = Ue(this.#e), n = {
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
}, ii = class {
	#e = /* @__PURE__ */ new Map();
	register(e) {
		this.#e.set(e.request_id, e);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
};
async function ai(e, t, n) {
	let r = e.resolve_source_message(t), i = [];
	for (let a of n) {
		let n = e.ids.next();
		await e.store.put_image({
			id: n,
			bytes: a.bytes,
			claimed_media_type: a.media_type,
			created_at: e.clock.now(),
			metadata: {
				provider_id: t.provider_id,
				source_message: r,
				generation_parameters: t.arguments
			}
		}), i.push(n);
	}
	return i.map((e) => p.parse(e));
}
var oi = 1e3;
function si(e) {
	if (e instanceof Error && "provider_error" in e) {
		let t = w.safeParse(e.provider_error);
		if (t.success && t.data.code === "rate_limited") return new Lt(t.data);
	}
	return null;
}
var ci = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new Lt({
			code: "invalid_request",
			retryable: !1
		});
		let r;
		try {
			r = await this.#n(n, t);
		} catch (e) {
			throw si(e) ?? e;
		}
		let i = await this.#r(n, r);
		return { image_ids: await this.#i(e, i) };
	}
	async #n(e, t) {
		let n = (await this.#e.load_adapters())[e.provider_id];
		if (n === void 0) throw new Lt({
			code: "provider_unavailable",
			retryable: !1
		});
		let r = {
			profile: await this.#e.profiles.resolve(e.provider_id),
			transport: this.#e.transport,
			assets: this.#e.assets,
			signal: t.signal,
			log: this.#e.log
		};
		await t.mark_running();
		let i = await n.submit(r, e);
		if (i.state === "completed") return i.output_assets;
		let a = i.poll_after_ms ?? oi;
		for (;;) {
			await this.#t(a);
			let e = await n.poll(r, i);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new Lt(e.error);
			a = e.poll_after_ms ?? a;
		}
	}
	#r(e, t) {
		return this.#e.postprocess === void 0 ? Promise.resolve(t) : this.#e.postprocess(e, t);
	}
	#i(e, t) {
		return ai(this.#e, e, t.map((e) => ({
			bytes: e.bytes,
			media_type: e.asset.media_type
		})));
	}
};
async function li(e, t, n) {
	return e.plans.register(n), ui(e.queue, t, n.request_id, n.provider_id);
}
async function ui(e, t, n, r) {
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
function di(e, t) {
	return e.queue.cancel(t);
}
//#endregion
//#region src/modules/illustration/slot_markers.ts
var fi = "[A-Za-z0-9_-]{8,32}", pi = RegExp(`<!--tc-image:(${fi})-->`, "gu");
function mi(e) {
	return `<!--tc-image:${e}-->`;
}
var hi = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${fi})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${fi}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function gi(e) {
	return [...e.matchAll(pi)].map((e) => e[1] ?? "");
}
function _i(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || gi(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function vi(e, t) {
	let n = _i(e), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = n[e.paragraph];
		if (t === void 0) throw RangeError(`Paragraph ${String(e.paragraph)} does not exist`);
		let i = r.get(t.line) ?? [];
		i.push(mi(e.slot_id)), r.set(t.line, i);
	}
	return e.split("\n").flatMap((e, t) => [e, ...r.get(t) ?? []]).join("\n");
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function yi(e, t) {
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
function bi(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = yi(n, e);
		n = t.text, t.error !== null && r.push({
			rule_id: e.id,
			error: t.error
		});
	}
	return {
		text: n,
		failures: r
	};
}
function xi(e, t) {
	return yi(t, e).text;
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
var Si = /^(?:\d+)?(girl|boy|other)s?$/u;
function Ci(e) {
	let t = null, n = [];
	for (let r of e.split(",")) {
		let e = Si.exec(tt(r).toLowerCase());
		e === null ? n.push(r) : t ??= e[1];
	}
	return {
		subject: t,
		rest: B(n)
	};
}
function wi(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function Ti(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(tt(t), e.replacement);
	return B(e.split(",").map((e) => n.get(tt(e)) ?? e));
}
function Ei(e, t) {
	if (t === null) return nt(e);
	let n = Ti(e, t.replacement_rules);
	return nt(bi(n, t.regex_rules).text);
}
function Di(e, t) {
	return B(b.filter((e) => e !== "expression" || !t).flatMap((t) => e.appearance[t]));
}
function Oi(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return B(e.split(",").filter((e) => {
		let t = tt(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function ki(e) {
	let t = e.library.characters, n = [], r = /* @__PURE__ */ new Set(), i = (i, a) => {
		let o = t[i];
		if (o === void 0 || r.has(o.character.id)) return;
		r.add(o.character.id);
		let s = Ci(Oi(a, e.library.outfit_names));
		n.push({
			name: o.character.name,
			subject: o.character.subject === "other" ? s.subject ?? "other" : o.character.subject,
			prompt: B([
				Di(o.character, s.rest !== ""),
				B(o.outfit_tags),
				s.rest
			]),
			negative_prompt: B(o.character.excluded_traits)
		});
	};
	for (let r of e.characters) {
		let e = t.findIndex((e) => Qe(e.character, r.name));
		if (e !== -1) {
			i(e, r.tags);
			continue;
		}
		let a = Ci(r.tags);
		(a.subject !== null || a.rest !== "") && n.push({
			name: r.name,
			subject: a.subject,
			prompt: a.rest,
			negative_prompt: ""
		});
	}
	return t.forEach((e, t) => {
		i(t, "");
	}), n;
}
function Ai(e) {
	let t = e.preset, n = ki(e), r = nt(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: Ei(B([t?.fixed_positive_prompt, e.scene_tags]), t),
		negative_prompt: r,
		character_prompts: []
	};
	let i = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: Ei(B([
			t?.fixed_positive_prompt,
			wi(i),
			Ci(e.scene_tags).rest
		]), t),
		negative_prompt: r,
		character_prompts: n.flatMap((e) => {
			let n = Ei(B([e.subject, e.prompt]), t);
			return n === "" ? [] : [{
				name: e.name,
				prompt: n,
				negative_prompt: nt(e.negative_prompt)
			}];
		})
	};
}
//#endregion
//#region src/modules/illustration/worldbook.ts
function ji(e, t) {
	return typeof e == "string" ? Ze(t, e) : new RegExp(e.source, e.flags.replace("g", "")).test(t);
}
function Mi(e, t) {
	if (e.secondary_keys.length === 0) return !0;
	let n = e.secondary_keys.map((e) => ji(e, t));
	switch (e.secondary_logic) {
		case "and_any": return n.some(Boolean);
		case "and_all": return n.every(Boolean);
		case "not_all": return !n.every(Boolean);
		case "not_any": return !n.some(Boolean);
	}
}
function Ni(e, t) {
	return e.filter((e) => e.enabled && e.content.trim() !== "" && (e.strategy === "constant" || e.strategy === "selective" && e.keys.some((e) => ji(e, t)) && Mi(e, t))).sort((e, t) => e.order - t.order).map((e) => e.content.trim()).join("\n\n");
}
//#endregion
//#region src/modules/illustration/illustration_service.ts
var Pi = 3, Fi = 2e3, Ii = class extends Error {
	constructor(e) {
		super(`Message ${String(e)} changed while it was being analyzed`), this.name = "MessageChangedError";
	}
}, Li = /* @__PURE__ */ new Set([
	"normal",
	"swipe",
	"regenerate",
	"continue"
]);
async function Ri(e, t) {
	switch (e.kind) {
		case "current": return { kind: "current" };
		case "proxy_preset": return {
			kind: "proxy_preset",
			proxy_preset: e.proxy_preset,
			model: e.model
		};
		case "custom": return {
			kind: "custom",
			api_url: e.api_url,
			api_key: await t(),
			model: e.model,
			source: "openai"
		};
	}
}
async function zi(e, t, n) {
	switch (e.mode) {
		case "chat": return { kind: "chat" };
		case "off": return {
			kind: "replace",
			text: ""
		};
		case "worldbook": return {
			kind: "replace",
			text: Ni(await n.read_worldbook(e.worldbook), t)
		};
	}
}
async function Bi(e, t, n, r) {
	let i = e.settings(), a = i.wardrobe_model, o = a === null || i.connection.kind === "current" ? i.connection : {
		...i.connection,
		model: a
	};
	return (await e.host.generate_with_preset({
		generation_id: e.new_generation_id(),
		preset_name: i.preset_name,
		user_input: t,
		max_chat_history: 0,
		connection: await Ri(o, e.resolve_analysis_key),
		json_schema: n,
		world_info: {
			kind: "replace",
			text: ""
		},
		image: r
	})).content;
}
function Vi(e) {
	return (t, n) => Bi(e, [t, ...Re(e.settings().wardrobe_guidance)].join("\n"), n, null);
}
async function Hi(e, t) {
	let { attach_character_prompts: n } = await import("./chunks/character_prompts-BRu7L7wm.js");
	return n(e, t);
}
function Ui(e) {
	return (e instanceof Error ? e.message : String(e)).slice(0, 500);
}
var Wi = class {
	#e;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Set();
	#r = /* @__PURE__ */ new Set();
	#i = null;
	#a = [];
	constructor(e) {
		this.#e = e;
	}
	start() {
		this.#a.length > 0 || (this.#a = [this.#e.host.subscribe_generation((e) => {
			this.#h(e);
		}), this.#e.jobs.subscribe((e) => {
			this.#m(e);
		})]);
	}
	stop() {
		for (let e of this.#a.splice(0)) e();
	}
	subscribe(e) {
		return this.#n.add(e), () => {
			this.#n.delete(e);
		};
	}
	read(e) {
		let t = jt.safeParse(this.#e.host.read_swipe_record(e));
		return t.success ? t.data : null;
	}
	is_pending(e) {
		return this.#t.has(e);
	}
	source_of(e) {
		return this.#t.get(e)?.location ?? null;
	}
	async active_location(e) {
		let t = await this.#e.host.get_active_chat(), n = t.messages.find((t) => t.message_id === e);
		if (n === void 0) throw Error(`Message ${String(e)} is not in the active chat`);
		return {
			chat_id: t.chat_id,
			message_id: e,
			swipe_id: n.active_swipe_id
		};
	}
	async analyze(e) {
		let t = await this.#e.host.get_active_chat(), n = t.messages.find((t) => t.message_id === e);
		if (n?.role !== "assistant") throw Error(`Message ${String(e)} is not an assistant reply`);
		let r = {
			chat_id: t.chat_id,
			message_id: e,
			swipe_id: n.active_swipe_id
		}, i = this.read(r);
		if (i !== null) return i;
		let a = `${r.chat_id}:${String(e)}:${String(r.swipe_id)}`;
		if (this.#r.has(a)) throw Error(`Message ${String(e)} is already being analyzed`);
		this.#r.add(a), this.#_({
			type: "analysis_started",
			location: r
		});
		try {
			let e = await this.#o(r, n.swipes[r.swipe_id]?.content ?? "");
			return this.#_({
				type: "slots_changed",
				location: r
			}), e;
		} catch (e) {
			throw this.#_({
				type: "analysis_failed",
				location: r,
				message: Ui(e),
				excerpt: e instanceof Le ? e.excerpt : null
			}), e;
		} finally {
			this.#r.delete(a);
		}
	}
	async illustrate(e) {
		(await this.analyze(e)).slots.length > 0 && await this.generate_missing(await this.active_location(e));
	}
	auto_generation_enabled() {
		return this.#e.auto_generation_enabled();
	}
	async #o(e, t) {
		let n = _i(t), r = this.#e.settings(), i = {
			schema_version: 2,
			slots: []
		};
		if (n.length > 0) {
			let a = await this.#g(e), o = await this.#e.prompt_context(e.chat_id), s = await this.#s(t, ze(n, r.max_images_per_message, o.library, r.analysis_guidance), (e) => Pe(e, n.length, r.max_images_per_message));
			i.slots.push(...this.#c(n, s, o, a));
		}
		if (await this.#e.host.write_swipe_record(e, i), i.slots.length > 0) {
			let n = vi(t, i.slots.map((e) => ({
				paragraph: e.paragraph,
				slot_id: e.slot_id
			})));
			if (!await this.#e.host.replace_message_text(e.message_id, t, n)) throw await this.#e.host.write_swipe_record(e, null), new Ii(e.message_id);
		}
		return i;
	}
	async #s(e, t, n) {
		let r = this.#e.settings(), i = await Ri(r.connection, this.#e.resolve_analysis_key), a = await zi(r.world_info, e, this.#e.host);
		for (let e = 1;; e += 1) try {
			return n((await this.#e.host.generate_with_preset({
				generation_id: this.#e.new_generation_id(),
				preset_name: r.preset_name,
				user_input: t,
				max_chat_history: r.max_chat_history,
				connection: i,
				json_schema: Ve,
				world_info: a,
				image: null
			})).content);
		} catch (t) {
			if (e >= Pi) throw t;
			await this.#e.wait(Fi * e);
		}
	}
	#c(e, t, n, r) {
		return t.map((t) => {
			let i = $e(`${e[t.paragraph]?.text ?? ""}\n${t.scene}`, t.characters.map((e) => e.name), n.library, r), a = Ai({
				preset: n.preset,
				library: i,
				characters: t.characters,
				scene_tags: t.tags
			});
			return {
				slot_id: this.#e.new_slot_id(),
				paragraph: t.paragraph,
				anchor: (e[t.paragraph]?.text ?? "").slice(0, 400),
				scene: t.scene,
				characters: [.../* @__PURE__ */ new Set([...t.characters.map((e) => e.name), ...i.characters.map((e) => e.character.name)])],
				positive_prompt: a.positive_prompt,
				negative_prompt: a.negative_prompt,
				character_prompts: [...a.character_prompts],
				image_ids: [],
				active_image_id: null,
				pending_request_ids: [],
				last_error: null
			};
		});
	}
	async #l(e) {
		let t = await this.#e.host.get_active_chat(), n = t.messages.find((t) => t.message_id === e.message_id);
		if (t.chat_id !== e.chat_id || n?.active_swipe_id !== e.swipe_id) throw new Ii(e.message_id);
		return n.swipes[e.swipe_id]?.content ?? "";
	}
	async open_paragraphs(e) {
		let t = new Set(this.read(e)?.slots.map((e) => e.paragraph) ?? []);
		return _i(await this.#l(e)).filter((e) => !t.has(e.index));
	}
	async add_paragraphs(e, t) {
		let n = await this.#l(e), r = _i(n), i = this.read(e), a = new Set(i?.slots.map((e) => e.paragraph) ?? []), o = [...new Set(t)].filter((e) => e < r.length && !a.has(e)).sort((e, t) => e - t);
		if (o.length === 0) return [];
		let s = this.#e.settings(), c = await this.#g(e), l = await this.#e.prompt_context(e.chat_id), u = await this.#s(n, Ie(r, o, l.library, s.analysis_guidance), (e) => Pe(e, r.length, r.length)), d = new Map(u.map((e) => [e.paragraph, e])), f = this.#c(r, o.map((e) => d.get(e) ?? {
			paragraph: e,
			scene: (r[e]?.text ?? "").slice(0, 120),
			tags: "",
			characters: []
		}), l, c);
		await this.#e.host.write_swipe_record(e, {
			schema_version: 2,
			slots: [...i?.slots ?? [], ...f]
		});
		let p = vi(n, f.map((e) => ({
			paragraph: e.paragraph,
			slot_id: e.slot_id
		})));
		if (!await this.#e.host.replace_message_text(e.message_id, n, p)) throw await this.#e.host.write_swipe_record(e, i), new Ii(e.message_id);
		return this.#_({
			type: "slots_changed",
			location: e
		}), f;
	}
	preview_request(e, t, n) {
		let r = this.#f(e, t);
		return this.#u(n ?? r);
	}
	async #u(e) {
		return Hi(await this.#e.build_request(e), e.character_prompts);
	}
	async generate_image(e) {
		let t = await this.#u(e), n = /* @__PURE__ */ new Map(), r = null, i = null, a = this.#e.jobs.subscribe((e) => {
			(e.state === "completed" || e.state === "failed" || e.state === "cancelled") && (e.request_id === r ? i?.(e) : n.set(e.request_id, e));
		});
		try {
			let e = await this.#e.submit(t);
			r = e;
			let a = n.get(e) ?? await new Promise((e) => {
				i = e;
			}), o = a.state === "completed" ? a.image_ids.at(-1) : void 0;
			if (o === void 0) throw Error(a.state === "cancelled" ? "cancelled" : a.error?.code ?? "failed");
			return await this.#e.jobs.mark_attached(a.job_id), o;
		} finally {
			a();
		}
	}
	async read_outfit(e) {
		let { OUTFIT_FROM_IMAGE_INPUT: t, OUTFIT_FROM_IMAGE_JSON_SCHEMA: n, parse_outfit_from_image: r } = await import("./chunks/outfit_from_image-BtYfc1zN.js");
		return r(await Bi(this.#e, t, n, e));
	}
	async read_character(e) {
		let { CHARACTER_FROM_IMAGE_INPUT: t, CHARACTER_FROM_IMAGE_JSON_SCHEMA: n, parse_character_from_image: r } = await import("./chunks/character_from_image-rujotflJ.js");
		return r(await Bi(this.#e, t, n, e));
	}
	async generate(e, t, n) {
		let r = this.#f(e, t), i = {
			positive_prompt: n?.positive_prompt ?? r.positive_prompt,
			negative_prompt: n?.negative_prompt ?? r.negative_prompt,
			character_prompts: n?.character_prompts ?? r.character_prompts
		};
		await this.#d(e, t, () => this.#u(i), (e) => ({
			...e,
			positive_prompt: i.positive_prompt,
			negative_prompt: i.negative_prompt,
			character_prompts: i.character_prompts.map((e) => ({
				name: e.name,
				prompt: e.prompt,
				negative_prompt: e.negative_prompt
			}))
		}));
	}
	can_edit() {
		return this.#e.edits_available();
	}
	preview_edit(e) {
		return this.#e.build_edit_request(e);
	}
	async edit(e, t, n) {
		let r = this.#f(e, t), i = n.kind === "img2img" || n.kind === "inpaint" ? r.character_prompts : [];
		await this.#d(e, t, async () => Hi(await this.#e.build_edit_request(n), i));
	}
	async #d(e, t, n, r = (e) => e) {
		let i;
		try {
			i = await this.#e.submit(await n());
		} catch (n) {
			throw await this.#p(e, t, (e) => ({
				...e,
				last_error: Ui(n)
			})), n;
		}
		this.#t.set(i, {
			location: e,
			slot_id: t
		}), await this.#p(e, t, (e) => ({
			...r(e),
			pending_request_ids: [...e.pending_request_ids, i],
			last_error: null
		}));
	}
	async generate_missing(e) {
		let t = this.read(e);
		for (let n of t?.slots ?? []) {
			let t = n.pending_request_ids.some((e) => this.#t.has(e));
			n.image_ids.length === 0 && !t && await this.generate(e, n.slot_id);
		}
	}
	select_image(e, t, n) {
		return this.#p(e, t, (e) => {
			let r = e.image_ids.find((e) => e === n);
			if (r === void 0) throw Error(`Image ${n} does not belong to slot ${t}`);
			return {
				...e,
				active_image_id: r
			};
		});
	}
	#f(e, t) {
		let n = this.read(e)?.slots.find((e) => e.slot_id === t);
		if (n === void 0) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		return n;
	}
	async #p(e, t, n) {
		let r = this.read(e);
		if (r === null || !r.slots.some((e) => e.slot_id === t)) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		await this.#e.host.write_swipe_record(e, {
			...r,
			slots: r.slots.map((e) => e.slot_id === t ? n(e) : e)
		}), this.#_({
			type: "slots_changed",
			location: e
		});
	}
	async #m(e) {
		let t = this.#t.get(e.request_id);
		if (t === void 0) return;
		let n = e.state === "completed";
		if (!n && e.state !== "failed" && e.state !== "cancelled") return;
		this.#t.delete(e.request_id);
		let r = (t) => ({
			...t,
			pending_request_ids: t.pending_request_ids.filter((t) => t !== e.request_id)
		});
		try {
			await this.#p(t.location, t.slot_id, (t) => n ? {
				...r(t),
				image_ids: [...t.image_ids, ...e.image_ids],
				active_image_id: e.image_ids.at(-1) ?? t.active_image_id
			} : {
				...r(t),
				last_error: e.state === "cancelled" ? "cancelled" : e.error?.code ?? "failed"
			}), n && await this.#e.jobs.mark_attached(e.job_id);
		} catch {
			n && await this.#e.jobs.mark_orphaned(e.job_id);
		}
	}
	#h(e) {
		if (e.phase === "started") {
			this.#i = e.dry_run ? null : e.generation_type;
			return;
		}
		if (e.phase === "stopped") {
			this.#i = null;
			return;
		}
		let t = this.#i;
		this.#i = null, !(t === null || !Li.has(t)) && this.active_location(e.message_id).then(async (n) => {
			t === "swipe" && (await this.#e.host.write_swipe_record(n, null), await this.#e.host.write_swipe_wardrobe(n, null)), await this.#g(n), this.#e.auto_generation_enabled() && await this.illustrate(e.message_id);
		}).catch(() => {});
	}
	async #g(e) {
		let t = this.#e.wardrobe.read(e);
		if (t !== null) return t;
		try {
			return await this.#e.wardrobe.update(e.message_id);
		} catch (t) {
			return this.#_({
				type: "wardrobe_failed",
				location: e,
				message: Ui(t)
			}), this.#e.wardrobe.current(e.message_id);
		}
	}
	async wardrobe_view(e) {
		let [t, n] = await Promise.all([this.#e.prompt_context(e.chat_id), this.#e.wardrobe.current(e.message_id)]);
		return {
			library: t.library,
			snapshot: n
		};
	}
	set_wearing(e, t) {
		return this.#e.wardrobe.set_wearing(e, t);
	}
	#_(e) {
		for (let t of this.#n) t(e);
	}
};
//#endregion
//#region src/modules/wardrobe/wardrobe_library_port.ts
function Gi(e) {
	return {
		async load(t) {
			return x(await e.load(), t);
		},
		async create_character(t, n) {
			await e.save("character", {
				id: t.id,
				category: "character",
				record_key: "",
				display_name: t.name,
				payload: {
					aliases: y(t.aliases),
					subject: t.subject,
					...Object.fromEntries(b.map((e) => [e, y(t.appearance[e] ?? [])])),
					excluded_traits: "",
					default_outfit_id: t.default_outfit_id ?? "",
					origin: "analysis",
					locked_fields: "",
					chat_id: n.chat_id,
					created_from_message_id: n.message_id
				}
			});
		},
		async create_outfit(t, n) {
			await e.save("outfit", {
				id: t.id,
				category: "outfit",
				record_key: "",
				display_name: t.name,
				payload: {
					character_id: t.character_id,
					...Object.fromEntries(S.map((e) => [e, y(t.slots[e] ?? [])])),
					origin: "analysis",
					chat_id: n
				}
			});
		},
		async add_appearance(t) {
			let n = (await e.load()).character.find((e) => e.id === t.character_id);
			if (n === void 0) return;
			let r = Object.fromEntries(Object.entries(t.slots).map(([e, t]) => [e, y(t)]));
			await e.save("character", {
				...n,
				payload: {
					...n.payload,
					...r,
					...t.subject === null ? {} : { subject: t.subject }
				}
			});
		}
	};
}
//#endregion
//#region src/modules/wardrobe/wardrobe_service.ts
function Ki(e, t) {
	let n = e.messages.find((e) => e.message_id === t);
	return n === void 0 ? null : {
		chat_id: e.chat_id,
		message_id: t,
		swipe_id: n.active_swipe_id
	};
}
var qi = class {
	#e;
	#t = /* @__PURE__ */ new Map();
	constructor(e) {
		this.#e = e;
	}
	read(e) {
		let t = v.safeParse(this.#e.host.read_swipe_wardrobe(e));
		return t.success ? t.data.wearing : null;
	}
	inherited(e, t) {
		let n = e.messages.filter((e) => e.message_id < t && e.role === "assistant").sort((e, t) => t.message_id - e.message_id);
		for (let t of n) {
			let n = this.read({
				chat_id: e.chat_id,
				message_id: t.message_id,
				swipe_id: t.active_swipe_id
			});
			if (n !== null) return n;
		}
		return [];
	}
	async current(e) {
		let t = await this.#e.host.get_active_chat(), n = Ki(t, e);
		return (n === null ? null : this.read(n)) ?? this.inherited(t, e);
	}
	update(e) {
		return this.#e.host.get_active_chat().then(async (t) => {
			let n = Ki(t, e);
			if (n === null) throw Error(`Message ${String(e)} is not in the active chat`);
			let r = `${n.chat_id}:${String(e)}:${String(n.swipe_id)}`, i = this.#t.get(r);
			if (i !== void 0) return i;
			let a = this.#n(t, n).finally(() => this.#t.delete(r));
			return this.#t.set(r, a), a;
		});
	}
	async #n(e, t) {
		let n = e.messages.find((e) => e.message_id === t.message_id)?.swipes[t.swipe_id]?.content ?? "", r = [...e.messages].filter((e) => e.message_id < t.message_id).reverse().find((e) => e.role === "user")?.swipes.at(0)?.content ?? null, i = this.inherited(e, t.message_id), [a, { apply_scene_update: o, build_scene_update_input: s, characters_needing_outfit: c, parse_scene_update: l, scene_update_json_schema: u }] = await Promise.all([this.#e.library.load(t.chat_id), import("./chunks/scene_update-DXMm_fSD.js")]), d = c(n, i, a), f = o(l(await this.#e.run(s(r, n, i, a), u(d.map((e) => e.id)))), i, a, this.#e.new_id);
		for (let e of f.new_outfits) await this.#e.library.create_outfit(e, t.chat_id);
		for (let e of f.new_characters) await this.#e.library.create_character(e, t);
		for (let e of f.appearance_additions) await this.#e.library.add_appearance(e);
		return await this.#r(t, f.wearing), f.wearing;
	}
	async set_wearing(e, t) {
		let n = await this.#e.host.get_active_chat(), r = this.read(e) ?? this.inherited(n, e.message_id);
		await this.#r(e, [...r.filter((e) => e.character_id !== t.character_id), t]);
	}
	#r(e, t) {
		return this.#e.host.write_swipe_wardrobe(e, v.parse({
			schema_version: 1,
			wearing: t
		}));
	}
}, Ji = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
function Yi() {
	return [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))].map((e) => Ji[e % 64] ?? "_").join("");
}
async function Xi(e, t) {
	return Zi(await e.load(), t);
}
function Zi(e, t) {
	let n = (e) => typeof e == "string" ? e.trim() : "";
	return {
		...x(e, t),
		loras: e.lora.flatMap((e) => {
			let t = n(e.payload.character_id);
			return t === "" ? [] : [{
				file_name: n(e.payload.file_name),
				weight: typeof e.payload.weight == "number" ? e.payload.weight : 1,
				trigger_words: n(e.payload.trigger_words),
				character_id: t
			}];
		})
	};
}
async function Qi(e, t, n, r) {
	let [i, a] = await Promise.all([n === null ? null : e.load_draft(n), Xi(t, r)]);
	return {
		preset: i,
		library: a
	};
}
var $i = class {
	module_id = "illustrations";
	requires = [];
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	get regex_error() {
		return this.#n;
	}
	async start() {
		try {
			await this.#t.sync_regex_scripts(hi), this.#n = null;
		} catch (e) {
			this.#n = e instanceof Error ? e.message : String(e);
		}
		this.#e.start();
	}
	stop() {
		return this.#e.stop(), Promise.resolve();
	}
}, ea = /[぀-ヿ㐀-鿿豈-﫿]/u, ta = /[,，、]/u;
function na(e) {
	return e.split(ta).map((e) => e.trim()).filter((e) => e.length > 0);
}
function ra(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function ia(e) {
	let t = e.trim().replace(/^-?[\d.]+::/u, "").replace(/::$/u, ""), n = /^\((.+):[\d.]+\)$/u.exec(t);
	for (n?.[1] !== void 0 && (t = n[1]); /^[{[].*[}\]]$/u.test(t);) t = t.slice(1, -1);
	return t.trim().toLowerCase();
}
function aa(e) {
	return e.trim().replace(/[.。]+$/u, "").toLowerCase();
}
async function oa(e, t) {
	let n = na(e);
	return (await Promise.all(n.map(async (e) => {
		if (!ea.test(e)) return e;
		let n = t.glossary.find((t) => ra(t.source, e));
		return n === void 0 ? await t.find_tag(e) ?? aa(await t.deepl(e, "EN-US")) : n.target;
	}))).join(", ");
}
async function sa(e, t) {
	let n = na(e);
	return (await Promise.all(n.map(async (e) => {
		if (ea.test(e)) return e;
		let n = ia(e), r = t.glossary.find((e) => ra(e.target, n));
		return r === void 0 ? await t.find_translation(n) ?? (await t.deepl(n, "ZH")).trim() : r.source;
	}))).join("，");
}
//#endregion
//#region src/modules/translation/prompt_translator.ts
var ca = 10;
function la(e) {
	let t = e.translation?.split("-")[0]?.trim() ?? "";
	return t === "" ? null : t;
}
function ua(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	async function r(n) {
		let r = t.get(n);
		if (r !== void 0) return r;
		let i;
		try {
			i = await e.vocabulary.lookup(n);
		} catch {
			return null;
		}
		return i === null ? null : (t.set(n, i.results), i.results);
	}
	function i(t, r) {
		let i = `${r}\n${t}`, a = n.get(i);
		return a === void 0 && (a = e.host.translate_deepl(t, r, e.settings().deepl_endpoint), a.catch(() => n.delete(i)), n.set(i, a)), a;
	}
	function a() {
		return {
			glossary: e.settings().glossary,
			async find_tag(e) {
				return ((await r(e))?.find((e) => e.match_kind === "translation"))?.display_text.replaceAll("_", " ") ?? null;
			},
			async find_translation(e) {
				let t = (await r(e))?.find((e) => e.match_kind === "exact");
				return t === void 0 ? null : la(t);
			},
			deepl: i
		};
	}
	return {
		to_tags: (e) => oa(e, a()),
		read_in_chinese: (e) => sa(e, a()),
		async suggest(t) {
			let n;
			try {
				n = await e.vocabulary.lookup(t.trim());
			} catch {
				return [];
			}
			return n === null ? null : n.results.slice(0, ca).map((e) => ({
				tag: e.display_text.replaceAll("_", " "),
				translation: la(e),
				popularity: e.popularity
			}));
		},
		prepare: () => e.vocabulary.prepare()
	};
}
//#endregion
//#region src/storage/sillytavern_settings.ts
var da = "tavern_canvas", fa = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), pa = /* @__PURE__ */ new Set(["gateway"]), ma = /* @__PURE__ */ new Set([...Object.keys(T.shape), ...pa]), ha = new Set(Object.keys(te.shape)), ga = {
	schema_version: 1,
	active_namespace: "primary",
	locale: "auto",
	credential_storage_mode: "browser_device",
	active_provider_profile_id: null,
	global_concurrency: 4,
	auto_generation_enabled: !0,
	vocabulary_update_channel: "bundled",
	illustration: {
		preset_name: "in_use",
		connection: { kind: "current" },
		max_chat_history: 4,
		max_images_per_message: 2,
		prompt_preset_id: null,
		world_info: { mode: "chat" },
		wardrobe_model: null,
		analysis_guidance: "",
		wardrobe_guidance: ""
	},
	translation: {
		deepl_endpoint: "free",
		glossary: []
	},
	ui: {
		color_mode: "system",
		inspector_width: 320,
		inspector_collapsed: !1,
		optional_entry_enabled: !1
	}
};
function _a(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function va() {
	return structuredClone(ga);
}
function ya(e) {
	return JSON.stringify(e);
}
function ba(e) {
	try {
		let t = ya(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function xa(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = fa.has(i) ? "disallowed_category" : "unknown_field";
		r.push({
			path: e,
			code: a
		});
	}
}
function W(e, t, n, r, i) {
	let a = e.safeParse(t);
	return a.success ? a.data : (i.push({
		path: r,
		code: "invalid_value"
	}), n);
}
function Sa(e, t) {
	let n = ga.ui;
	return _a(e) ? (xa(e, ha, "ui", t), {
		color_mode: W(te.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: W(te.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: W(te.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: W(te.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function Ca(e, t) {
	if (e === void 0) return va();
	let n = ba(e);
	if (n === null || n > 65536) return t.push({
		path: da,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), va();
	if (!_a(e)) return t.push({
		path: da,
		code: "invalid_value"
	}), va();
	xa(e, ma, "", t);
	let r = ga;
	return {
		schema_version: W(T.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: W(T.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: W(T.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: W(ie, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: W(T.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: W(T.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: W(T.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		vocabulary_update_channel: W(T.shape.vocabulary_update_channel, e.vocabulary_update_channel, r.vocabulary_update_channel, "vocabulary_update_channel", t),
		illustration: e.illustration === void 0 ? structuredClone(r.illustration) : W(T.shape.illustration, e.illustration, structuredClone(r.illustration), "illustration", t),
		translation: e.translation === void 0 ? structuredClone(r.translation) : W(T.shape.translation, e.translation, structuredClone(r.translation), "translation", t),
		ui: Sa(e.ui, t)
	};
}
function wa(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = Ca(t[da], i);
	t[da] = a;
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
		return a = e, t[da] = a, o = !0, l(), a;
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
			return u(T.parse(t));
		},
		replace_settings(e) {
			return u(T.parse(e));
		},
		flush: c,
		async stop() {
			await c();
		}
	};
}
//#endregion
//#region src/host/sillytavern_secret_resolver.ts
var G = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, Ta = "The host refused to reveal the stored credential. Switch credential storage to This device in Settings > General and enter the key again, or allow key exposure in the host (allowKeysExposure in SillyTavern's config.yaml).", Ea = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = Yt(t);
	}
	async resolve_secret(e) {
		if (!m.safeParse(e).success) throw new G("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: nn(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new G("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new G("not_exposed", Ta) : t.status === 404 ? new G("not_found", "The host vault holds no such credential") : new G("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new G("unavailable", "The host secret vault returned an unreadable response");
		}
		let r;
		if (typeof n == "object" && n && !Array.isArray(n) && e in n && (r = Reflect.get(n, e)), typeof r != "string" || r.trim().length === 0) throw new G("not_found", "The host vault holds no such credential");
		return r;
	}
};
function Da(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Oa(e, t) {
	return !Da(e) || typeof t != "function" ? null : new Ea(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var ka = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.mode, this.#t = e.host_destination, this.#n = e.host_resolver, this.#r = e.browser_vault, this.#i = e.device_vault;
	}
	get has_destination() {
		return this.#t !== null || this.#r !== null || this.#i !== null;
	}
	get has_resolver() {
		return this.#n !== null || this.#r !== null || this.#i !== null;
	}
	supports(e) {
		return this.#a()?.supports(e) ?? !1;
	}
	async write_secret(e, t) {
		let n = this.#a();
		if (n === null) throw Error(`${this.#s()} credential storage is unavailable`);
		return n.write_secret(e, t);
	}
	async delete_secret(e) {
		let t = this.#a();
		if (t === null) throw Error(`${this.#s()} credential storage is unavailable`);
		if (t.delete_secret === void 0) throw Error(`${this.#s()} credential storage does not support deletion`);
		return t.delete_secret(e);
	}
	async probe_secret(e) {
		let t = this.#a();
		return t !== null && t.probe_secret(e);
	}
	async resolve_secret(e) {
		let t = this.#o();
		if (t === null) throw new G("unsupported_host", `${this.#s()} credential storage cannot reveal credentials`);
		return t.resolve_secret(e);
	}
	#a() {
		switch (this.#e()) {
			case "browser_device": return this.#i;
			case "browser_encrypted": return this.#r;
			case "host": return this.#t;
		}
	}
	#o() {
		switch (this.#e()) {
			case "browser_device": return this.#i;
			case "browser_encrypted": return this.#r;
			case "host": return this.#n;
		}
	}
	#s() {
		switch (this.#e()) {
			case "browser_device": return "Device";
			case "browser_encrypted": return "Encrypted browser";
			case "host": return "Host";
		}
	}
}, K = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function Aa(e) {
	try {
		if (!Ma(e)) throw q("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !Na(a) || !Na(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw q("Provider operation is invalid");
		if (ct(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw q("Provider operation is invalid");
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
		throw e instanceof K ? e : q("Provider operation is invalid", e);
	}
}
function ja(e) {
	try {
		if (!Ma(e)) throw q("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw q("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(ne);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw q("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof K ? e : q("Remote provider asset operation is invalid", e);
	}
}
function Ma(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Na(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function q(e, t) {
	return new K("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/browser_fetch.ts
async function Pa(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new lt({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new K("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await Fa(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function Fa(e, t, n) {
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
			if (a += s.byteLength, a > t) throw new K("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof K ? e : new lt({ cause: e });
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
var Ia = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = Aa(e), n = Ra(this.#e, t.route), r = await za(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await La(Pa(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(st({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = ja(e);
		return Pa(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
};
async function La(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof lt ? new lt() : e;
	}
}
function Ra(e, t) {
	try {
		return Dt(e, t);
	} catch (e) {
		throw e instanceof Tt ? new K("configuration", e.message) : e;
	}
}
async function za(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new K("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new K("configuration", Ba(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function Ba(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var Va = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = ne(e.base_url);
		} catch (e) {
			throw new K("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!oe(t)) throw new K("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = Aa(e);
		return Pa(this.#t, `${this.#e}${t.route}`, {
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
		let t = ja(e);
		return Pa(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Ha = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function Ua(e) {
	let t = Wa(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Ga(e.direct_provider_base_url);
		if (!oe(t)) throw new Ha("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new Ha("No provider transport is available");
}
function Wa(e) {
	if (e === null || Et(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Ha("This provider needs a stored credential before it can be called directly; set one on the active profile");
	if (!e.secrets_readable) throw new Ha("This host cannot reveal stored credentials, so a direct provider call is impossible; switch the credential storage to this device");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Ga(e) {
	try {
		return ne(e);
	} catch (e) {
		throw new Ha("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function Ka(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function J(e) {
	return Ka(e.payload);
}
function Y(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function qa(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function Ja(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function Ya(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function Xa(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function X(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => X(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = X(i, n));
	return r;
}
var Za = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, Qa = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"workflow",
	"prompt_tag"
];
function $a(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit": return e.outfit_profiles;
		case "lora": return e.lora_profiles;
		case "prompt_tag": return e.prompt_tag_presets;
	}
}
function eo(e, t) {
	let n = J(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: Y(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function to(e, t) {
	let n = Ya(J(e), "order", 2 ** 53 - 1), r = Ya(J(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function no(e) {
	let t = new Za();
	async function n(t) {
		return [...await $a(e.repositories, t).list(e.namespace())].sort(to).map((e) => eo(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(Qa.map(async (e) => [e, await n(e)]));
			return Object.fromEntries(e);
		},
		subscribe: (e) => t.subscribe(e),
		async save(n, r) {
			let i = $a(e.repositories, n), a = e.namespace(), o = await i.get(a, r.id), s = e.now(), c = o === null ? Math.max(-1, ...(await i.list(a)).map((e) => Ya(J(e), "order", -1))) + 1 : Ya(J(o), "order", 2 ** 53 - 1), l = {
				schema_version: 1,
				id: r.id,
				namespace: a,
				record_key: `${a}:${r.id}`,
				created_at: o?.created_at ?? s,
				updated_at: s,
				payload: X({
					...r.payload,
					display_name: r.display_name,
					...c === 2 ** 53 - 1 ? {} : { order: c }
				})
			};
			await i.put(a, l);
			let u = eo(l, n);
			return t.emit({
				type: "asset_upserted",
				asset: u
			}), u;
		},
		async remove(n, r) {
			await $a(e.repositories, n).delete(e.namespace(), r), t.emit({
				type: "asset_removed",
				category: n,
				asset_id: r
			});
		},
		async reorder(t, n) {
			let r = $a(e.repositories, t), i = e.namespace(), a = e.now();
			for (let [e, t] of n.entries()) {
				let n = await r.get(i, t);
				n !== null && await r.put(i, {
					...n,
					updated_at: a,
					payload: X({
						...J(n),
						order: e
					})
				});
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/diagnostics_capability.ts
var ro = 500, io = class {
	#e = [];
	#t = new Za();
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
		this.#e.push(t), this.#e.length > ro && this.#e.shift(), this.#t.emit({
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
function ao(e) {
	return e === null ? {} : {
		schema_version: e.schema_version,
		locale: e.locale,
		global_concurrency: e.global_concurrency,
		auto_generation_enabled: e.auto_generation_enabled,
		ui: e.ui
	};
}
function oo(e) {
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
				storage_usage_bytes: n?.usage ?? null,
				storage_quota_bytes: n?.quota ?? null
			};
		},
		subscribe: (t) => e.timeline.subscribe(t),
		load_timeline: () => Promise.resolve(e.timeline.entries),
		export_support_bundle() {
			let t = e.timeline.entries, n = [...new Set(t.flatMap((e) => e.error_code === null ? [] : [e.error_code]))];
			return Promise.resolve({
				version: e.extension_version,
				capability_matrix: e.capability_matrix,
				redacted_settings: {
					...ao(e.settings()),
					capability_resolutions: e.resolutions()
				},
				error_codes: n,
				timeline: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capability_resolution.ts
function so(e) {
	return {
		status: "available",
		value: e
	};
}
function Z(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function Q(e) {
	try {
		return so(e());
	} catch (e) {
		return Z(co(e));
	}
}
function co(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function lo(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var uo = "capability_unavailable";
function $(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: uo }), t;
}
//#endregion
//#region src/bootstrap/capabilities/gallery_capability.ts
function fo(e) {
	switch (e.media_type) {
		case "image/png":
		case "image/jpeg":
		case "image/webp": return e.media_type;
		case "video/mp4": return null;
	}
}
function po(e) {
	let t = fo(e);
	if (t === null) return null;
	let n = C.parse(e.provider_id);
	return {
		id: e.id,
		provider_id: n,
		source_chat_id: e.source_message?.chat_id ?? null,
		source_message_id: e.source_message === null ? null : Number.parseInt(e.source_message.message_id, 10),
		media_type: t,
		width: e.width ?? null,
		height: e.height ?? null,
		pinned: e.pinned,
		quarantined: e.quarantined,
		created_at: e.created_at
	};
}
function mo(e) {
	let t = new Za();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw $(`Gallery record ${t} no longer exists`);
		return n;
	}
	async function r(n) {
		await e.repository.put(e.namespace(), n);
		let r = po(n);
		r !== null && t.emit({
			type: "record_upserted",
			record: r
		});
	}
	async function i(n) {
		await Je(e.database, e.namespace(), n), t.emit({
			type: "record_removed",
			record_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).flatMap((e) => {
				let t = po(e);
				return t === null ? [] : [t];
			});
		},
		subscribe: (e) => t.subscribe(e),
		async read_bytes(t) {
			let r = await n(t), i = await qe(e.database, r.sha256);
			if (i === null) throw $(`Gallery record ${t} has no stored bytes; the blob was evicted`);
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
		async reveal_source(t) {
			let r = (await n(t)).source_message;
			return r === null || e.reveal_message === null ? "not_found" : e.reveal_message(r.chat_id, Number.parseInt(r.message_id, 10));
		},
		delete_record: i,
		async bulk_delete(e) {
			for (let t of e) await i(t);
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_capability.ts
function ho(e) {
	return e.image_count ?? 1;
}
function go(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: C.parse(e.provider_id),
		state: e.state,
		image_count: ho(e.arguments),
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function _o(e) {
	return {
		job_id: e.id,
		request_id: e.request_id,
		provider_id: C.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function vo(e) {
	let t = new Za(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: go(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await li({
			queue: e.queue,
			plans: e.plans
		}, {
			...i,
			scene_description: r.prompt
		}, r);
		return n.set(a.job_id, r), go(a);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map(_o);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return go(await di({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw $(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
			return r({
				...i,
				request_id: e.new_request_id()
			});
		},
		async dismiss(n) {
			for (let r of n) {
				let n = await e.jobs.get(e.namespace(), r);
				(n?.state === "failed" || n?.state === "cancelled") && (await e.jobs.delete(e.namespace(), r), t.emit({
					type: "job_removed",
					job_id: r
				}));
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/novelai_capability.ts
var yo = 3e4, bo = 12e4, xo = 3e4;
function So(e) {
	return {
		load: async () => (await e()).list_models(),
		get_account: async () => (await e()).get_account(AbortSignal.timeout(yo)),
		refresh_models: async () => (await e()).refresh_models(AbortSignal.timeout(bo)),
		estimate_cost: async (t) => (await e()).estimate_cost(t, AbortSignal.timeout(xo))
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
function Co(e) {
	return Pt.parse({
		schema_version: 1,
		chat_id: e.chat_id,
		active_swipes: e.messages.map((e) => ({
			message_id: e.message_id,
			swipe_id: e.active_swipe_id
		})),
		messages: e.messages.map((e) => ({
			message_id: e.message_id,
			role: e.role,
			content_sha256: t(r(n(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? ""))),
			swipe_id: e.active_swipe_id
		}))
	});
}
var wo = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		let e = await this.#e.get_active_chat(), t = xt(Co(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
}, To = "vault_key", Eo = "novelai_defaults", Do = "prompt_tags", Oo = "provider_profile", ko = 2e7, Ao = "base_url";
function jo(e) {
	return e === "sd_webui" || e === "comfyui";
}
function Mo(e) {
	let t = ne(e);
	if (!oe(t)) throw TypeError("A local provider address must be a loopback address");
	return t;
}
function No(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function Po(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: ko,
		max_input_asset_bytes: ko,
		...t?.provider_id === e.provider_id ? Ka(J(t)[Oo]) : {},
		model_allowlist: [e.model_id.trim()]
	};
	switch (e.provider_id) {
		case "sd_webui": return {
			vae_allowlist: [],
			adetailer_model_allowlist: [],
			controlnet_model_allowlist: [],
			...n
		};
		case "novelai": return {
			max_archive_entries: 8,
			...n
		};
		case "comfyui": return {
			...n,
			workflow_allowlist: e.workflow_id === null ? [] : [e.workflow_id]
		};
		case "openai_image": return {
			remote_asset_origin_allowlist: [],
			...n
		};
		case "google_image": return n;
	}
}
function Fo(e) {
	return {
		...Ka(J(e)[Oo]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function Io(e) {
	let t = J(e), n = Ka(t[Oo]);
	return {
		id: e.id,
		provider_id: C.parse(e.provider_id),
		display_name: Y(t, "display_name", e.id),
		model_id: No(Xa(n, "model_allowlist")),
		workflow_id: No(Xa(n, "workflow_allowlist")),
		base_url: typeof t[Ao] == "string" ? t[Ao] : null,
		is_default: Ja(t, "is_default", !1),
		credential_reference: typeof t.vault_key == "string" ? t[To] : null,
		updated_at: e.updated_at,
		novelai_defaults: Ro(e),
		prompt_tags: Lo(e)
	};
}
function Lo(e) {
	let t = Nt.safeParse(J(e)[Do]);
	return t.success ? t.data : null;
}
function Ro(e) {
	let t = ae.safeParse(J(e)[Eo]);
	return t.success ? t.data : null;
}
function zo(e) {
	let t = new Za();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw $(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			let t = await e.repository.list(e.namespace());
			return Promise.all(t.map(async (t) => {
				let n = Io(t);
				return n.credential_reference === null ? n : await e.credential_present(n.credential_reference).catch(() => !1) === !1 ? {
					...n,
					credential_reference: null
				} : n;
			}));
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				...J(i ?? { payload: {} }),
				display_name: n.display_name,
				is_default: n.is_default,
				[Oo]: X(Po(n, i))
			};
			i !== null && i.provider_id !== n.provider_id && Reflect.deleteProperty(o, To), jo(n.provider_id) && n.base_url !== null ? o[Ao] = Mo(n.base_url) : Reflect.deleteProperty(o, Ao);
			let s = {
				schema_version: 1,
				id: n.id,
				namespace: r,
				record_key: `${r}:${n.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: n.provider_id,
				payload: X(o)
			}, c = (await e.load_adapters())[n.provider_id];
			if (c === void 0) throw $(`Provider ${n.provider_id} is unavailable`);
			c.validate_profile(Fo(s)), await e.repository.put(r, s);
			let l = Io(s);
			return t.emit({
				type: "profile_upserted",
				profile: l
			}), l;
		},
		async remove(n) {
			await e.repository.delete(e.namespace(), n), t.emit({
				type: "profile_removed",
				profile_id: n
			});
		},
		async set_credential(r, i) {
			if (i.trim().length === 0) throw TypeError("A provider credential must not be blank");
			if (e.secrets === null) throw $("The selected credential storage backend is unavailable");
			let a = await n(r), o = ee(a.namespace, r);
			await e.secrets.write_secret(o, i);
			let s = {
				...a,
				updated_at: e.now(),
				payload: X({
					...J(a),
					[To]: o
				})
			};
			await e.repository.put(a.namespace, s);
			let c = Io(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async save_novelai_defaults(r, i) {
			let a = await n(r);
			if (a.provider_id !== "novelai") throw TypeError(`Provider profile ${r} is not a NovelAI profile`);
			let o = {
				...a,
				updated_at: e.now(),
				payload: X({
					...J(a),
					[Eo]: ae.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Io(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async save_prompt_tags(r, i) {
			let a = await n(r), o = {
				...a,
				updated_at: e.now(),
				payload: X({
					...J(a),
					[Do]: Nt.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Io(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async clear_credential(r) {
			let i = await n(r), a = { ...J(i) }, o = a[To];
			Reflect.deleteProperty(a, To), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: X(a)
			};
			await e.repository.put(i.namespace, s);
			let c = Io(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = C.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(Fo(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof ot ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = J(i)[To];
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
//#region src/bootstrap/capabilities/prompt_presets_capability.ts
function Bo(e) {
	let t = J(e);
	return {
		id: e.id,
		display_name: Y(t, "display_name", e.id),
		group: qa(t, "group"),
		updated_at: e.updated_at
	};
}
function Vo(e) {
	return e.flatMap((e) => {
		let t = Ka(e), n = qa(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: Xa(t, "triggers").filter((e) => typeof e == "string"),
			replacement: Y(t, "replacement", "")
		}];
	});
}
function Ho(e) {
	return e.flatMap((e) => {
		let t = Ka(e), n = qa(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: Y(t, "pattern", ""),
			flags: Y(t, "flags", ""),
			replacement: Y(t, "replacement", "")
		}];
	});
}
function Uo(e) {
	let t = new Za();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(Bo);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw $(`Prompt preset ${t} no longer exists`);
			let r = J(n);
			return {
				id: n.id,
				display_name: Y(r, "display_name", n.id),
				group: qa(r, "group"),
				fixed_positive_prompt: Y(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: Y(r, "fixed_negative_prompt", ""),
				replacement_rules: Vo(Xa(r, "replacement_rules")),
				regex_rules: Ho(Xa(r, "regex_rules"))
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
				payload: X({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = Bo(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(xi(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var Wo = "The selected credential storage backend is unavailable", Go = "SillyTavern's secret store is unreachable from this page", Ko = "deepl", qo = "Listing world info books needs JS-Slash-Runner";
function Jo(e) {
	if (e === null) throw $("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function Yo(e) {
	let t = new Za(), n = null;
	async function r() {
		let t = e.settings.get_settings(), n;
		return n = e.browser_secret_vault === null ? {
			state: "unavailable",
			secret_count: 0
		} : t.credential_storage_mode === "browser_encrypted" ? await e.browser_secret_vault.status().catch(() => ({
			state: "error",
			secret_count: 0
		})) : {
			state: "uninitialized",
			secret_count: 0
		}, {
			settings: t,
			vocabulary_update_channel: t.vocabulary_update_channel,
			browser_secret_vault: n
		};
	}
	function i(n) {
		let r = e.settings.update_settings(n);
		return t.emit({
			type: "settings_changed",
			settings: r
		}), r;
	}
	return {
		load: r,
		subscribe: (e) => t.subscribe(e),
		update: (e) => Promise.resolve(i(e)),
		async set_analysis_key(t) {
			if (t.trim().length === 0) throw TypeError("An API key must not be blank");
			if (e.secrets === null) throw $(Wo);
			await e.secrets.write_secret(re(e.settings.get_settings().active_namespace), t.trim());
		},
		list_worldbooks() {
			return e.list_worldbooks === null ? Promise.reject($(qo)) : Promise.resolve(e.list_worldbooks());
		},
		async clear_analysis_key() {
			if (e.secrets?.delete_secret === void 0) throw $(Wo);
			await e.secrets.delete_secret(re(e.settings.get_settings().active_namespace));
		},
		async set_deepl_key(t) {
			if (e.host_secrets === null) throw $(Go);
			await e.host_secrets.write_secret(Ko, t.trim());
		},
		async clear_deepl_key() {
			if (e.host_secrets?.delete_secret === void 0) throw $(Go);
			await e.host_secrets.delete_secret(Ko);
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw $(Wo);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw $(Wo);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw $(Wo);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw $(Wo);
			return e.browser_secret_vault.reset();
		},
		set_vocabulary_update_channel(t) {
			return i({ vocabulary_update_channel: t }), e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new ut("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-DUAjpQ0v.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-BclDxEi6.js");
			return t({
				database: Jo(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-BclDxEi6.js");
			await n({
				database: Jo(e.database),
				archive: t,
				namespace: e.settings.get_settings().active_namespace
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function Xo(e) {
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
function Zo(e) {
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
		async lookup(e) {
			let t = await i();
			return t.is_ready || t.has_failed ? t.lookup(e) : null;
		},
		async prepare() {
			await (await i()).ready();
		},
		async next_page(e) {
			return (await i()).next_page(e);
		},
		async install(e, t) {
			await (await r()).install(e, (e) => {
				let n = Xo(e);
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
//#region src/host/chat_surface.ts
var Qo = "tavern-canvas/illustration-slots", $o = class {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Set();
	#n = !1;
	get active() {
		return this.#n;
	}
	activate() {
		this.#n = !0;
	}
	commit(e) {
		return this.#e.set(e.mesid, e), this.#r({
			type: "committed",
			mount: e
		}), () => {
			this.#e.get(e.mesid) === e && this.#e.delete(e.mesid), this.#r({
				type: "released",
				mesid: e.mesid
			});
		};
	}
	mounted() {
		return [...this.#e.values()];
	}
	subscribe(e) {
		return this.#t.add(e), () => {
			this.#t.delete(e);
		};
	}
	#r(e) {
		for (let t of this.#t) try {
			t(e);
		} catch (e) {
			console.error("[TavernCanvas] chat surface listener failed", e);
		}
	}
};
function es(e) {
	let t = e?.__TAURITAVERN__?.api?.chatSurface;
	if (typeof t != "object" || !t) return null;
	let n = t;
	return typeof n.isManagedOwnershipRequired == "function" && typeof n.registerParticipant == "function" ? n : null;
}
function ts(e, t) {
	let n = es(e);
	return n === null || !n.isManagedOwnershipRequired() ? !1 : (n.registerParticipant({
		id: Qo,
		protocolVersion: 1,
		didCommitContent: ({ mesid: e, element: n, content: r }) => t.commit({
			mesid: e,
			element: n,
			content: r
		})
	}), t.activate(), !0);
}
var ns = new $o(), rs = class {
	capabilities;
	#e;
	#t;
	#n;
	constructor(e, t, n, r) {
		this.capabilities = e, this.#e = t, this.#t = n, this.#n = r;
	}
	get_locale() {
		return this.#t.get_locale();
	}
	get_active_chat_id() {
		return this.#t.get_active_chat_id();
	}
	get_active_chat() {
		return this.#e.get_active_chat();
	}
	subscribe_generation(e) {
		return this.#t.subscribe_generation(e);
	}
	subscribe_chat_change(e) {
		return this.#t.subscribe_chat_change(e);
	}
	subscribe_message_rendered(e) {
		let t = this.#t.subscribe_message_rendered(e), n = this.#n?.subscribe((t) => {
			t.type === "committed" && e(t.mount.mesid);
		});
		return () => {
			t(), n?.();
		};
	}
	subscribe_message_released(e) {
		return this.#n?.subscribe((t) => {
			t.type === "released" && e(t.mesid);
		}) ?? (() => {});
	}
	subscribe_chat_rendered(e) {
		return this.#t.subscribe_chat_rendered(e);
	}
	find_message_element(e) {
		return this.#e.find_message_element(e);
	}
	read_swipe_record(e) {
		return this.#t.read_swipe_record(e);
	}
	write_swipe_record(e, t) {
		return this.#t.write_swipe_record(e, t);
	}
	read_swipe_wardrobe(e) {
		return this.#t.read_swipe_wardrobe(e);
	}
	write_swipe_wardrobe(e, t) {
		return this.#t.write_swipe_wardrobe(e, t);
	}
	replace_message_text(e, t, n) {
		return this.#e.replace_message_text(e, t, n);
	}
	generate_with_preset(e) {
		return this.#e.generate_with_preset(e);
	}
	list_worldbooks() {
		return this.#e.list_worldbooks();
	}
	read_worldbook(e) {
		return this.#e.read_worldbook(e);
	}
	stop_generation(e) {
		this.#e.stop_generation(e);
	}
	sync_regex_scripts(e) {
		return this.#e.sync_regex_scripts(e);
	}
	translate_deepl(e, t, n) {
		return this.#t.translate_deepl(e, t, n);
	}
};
function is(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function as(e, t, n) {
	let r = is(e, "TavernHelper"), i = is(e, "SillyTavern"), a = is(e, "fetch"), o = fn(r), s = en(i);
	if (!o.message_swipe_metadata || !o.preset_generation || !o.tavern_regex || !s.main_generation_events || !s.message_swipe_metadata || typeof a != "function") return null;
	let c = new an(() => i.getContext(), a);
	return new rs(t, new wn(r, () => {
		let e = c.get_active_chat_id();
		if (e === null) throw Error("No chat is open");
		return e;
	}), c, n);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function os(e) {
	return typeof e == "object" && !!e;
}
function ss(e, t) {
	if (!os(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var cs = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = Yt(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: nn(this.#e.getRequestHeaders()),
			body: JSON.stringify({
				key: e,
				value: t,
				label: "Inkwell"
			})
		});
		if (!n.ok) throw Error(`SillyTavern secret write failed with status ${String(n.status)}`);
	}
	async delete_secret(e) {
		let t = await this.#t("/api/secrets/delete", {
			method: "POST",
			headers: nn(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: nn(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return ss(n, e);
	}
};
function ls(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function us(e, t) {
	return !ls(e) || typeof t != "function" ? null : new cs(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
function ds(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function fs(e) {
	let t = ds(e, "SillyTavern"), n = ds(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function ps(e) {
	let t = fs(e), n = ds(t, "extensionSettings"), r = ds(t, "saveSettingsDebounced");
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
function ms(e) {
	return us(fs(e), ds(e, "fetch"));
}
function hs(e) {
	return Oa(fs(e), ds(e, "fetch"));
}
function gs(e, t) {
	return as(e, t, ns.active ? ns : null);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var _s = "IndexedDB could not be opened, so nothing that persists records can be composed", vs = "No usable SillyTavern + TavernHelper host pair was detected", ys = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair";
function bs() {
	return navigator.storage.estimate();
}
function xs() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"" + new URL("workers/vocabulary_worker.js", import.meta.url).href,
		"" + import.meta.url
	), { type: "module" });
}
async function Ss(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-DapvaHuj.js"), o = {
		novelai: new r(),
		sd_webui: new a(),
		openai_image: new i(),
		google_image: new n()
	};
	if (e !== null) {
		let n = We(e);
		o.comfyui = new t({ workflow_store: { async load(e) {
			return (await n.comfy_workflows.get("primary", e))?.payload;
		} } });
	}
	return o;
}
function Cs(e, t) {
	let n = new Xe(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await qe(e, i.sha256);
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
	return Ke.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function Ts(e, t) {
	return {
		async put_image(n) {
			return { id: (await Ye(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: ws(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new Xe(e).get(t(), n);
			if (r === null) return null;
			let i = await qe(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
async function Es(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = Hn(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(lo(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject($(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = gs(t, s), l = [], u = null;
	try {
		u = await (e.open_storage ?? Ge)();
	} catch {
		u = null;
	}
	let d = ps(t), p = d === null ? null : wa(d), m = () => p?.get_settings().active_namespace ?? "primary", h = () => (/* @__PURE__ */ new Date()).toISOString(), _ = ms(t), v = hs(t), y;
	try {
		y = (e.create_browser_secret_vault ?? at)(t);
	} catch {
		y = null;
	}
	y !== null && a.push(() => y.close());
	let b = it(t);
	b !== null && a.push(() => b.close());
	let x = new ka({
		mode: () => p?.get_settings().credential_storage_mode ?? "host",
		host_destination: _,
		host_resolver: v,
		browser_vault: y,
		device_vault: b
	}), S = x.has_destination ? x : null, ee = x.has_resolver ? x : null, C = u === null ? null : We(u), w = new io(), te = null, T = () => te ??= Ss(u), ne = null, ie = async () => {
		if (C === null || p === null) return null;
		let e = p.get_settings().active_provider_profile_id, t = e === null ? null : await C.provider_profiles.get(m(), e).catch(() => null), n = t === null ? null : js(t, ee !== null);
		return ne = n?.provider_id ?? null, n;
	};
	await ie();
	let ae = async () => {
		let e = await ie();
		if (e === null) throw Error("No provider profile is active; choose one in Settings");
		return e;
	}, oe = null, E = C === null || u === null ? null : () => oe ??= import("./chunks/novelai_runtime-D-Nfd5pk.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: C.novelai_vibe_encodings,
		provider_inputs: C.provider_input_assets,
		namespace: m,
		gallery_assets: Cs(u, m),
		transport: () => Ms(async () => Ns((await ie())?.direct_cloud ?? null, ee, e.provider_fetch)),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), se = E === null || u === null ? null : { async read(e, t) {
		try {
			return await Cs(u, m).read(e, t);
		} catch {
			return (await E()).assets.read(e, t);
		}
	} }, ce = E === null ? null : async (e) => e.provider_id === "novelai" ? (await E()).prepare(e, AbortSignal.timeout(Os)) : e, le = o("novelai", E === null ? Z(_s) : Q(() => So(async () => (await E()).service)), r.novelai), D = o("settings", p === null ? Z(ys) : Q(() => Yo({
		settings: p,
		database: u,
		extension_version: n,
		secrets: S,
		browser_secret_vault: y,
		host_secrets: _,
		list_worldbooks: c === null ? null : () => c.list_worldbooks()
	})), r.settings), ue = o("profiles", C === null ? Z(_s) : Q(() => zo({
		repository: C.provider_profiles,
		namespace: m,
		load_adapters: T,
		secrets: S,
		credential_present: async (e) => S === null || (p?.get_settings().credential_storage_mode ?? "host") === "host" ? null : S.probe_secret(e),
		now: h
	})), r.profiles), de = o("prompt_presets", C === null ? Z(_s) : Q(() => Uo({
		repository: C.prompt_presets,
		namespace: m,
		now: h,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), fe = o("assets", C === null ? Z(_s) : Q(() => no({
		repositories: C,
		namespace: m,
		now: h
	})), r.assets), pe = o("gallery", u === null ? Z(_s) : Q(() => mo({
		database: u,
		repository: new Xe(u),
		namespace: m,
		now: h,
		reveal_message: c === null ? null : (e, t) => {
			if (c.get_active_chat_id() !== e) return "other_chat";
			let n = c.find_message_element(t)?.closest(".mes");
			return n == null ? "not_found" : (n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), "revealed");
		}
	})), r.gallery), me = null, he = o("generation", u === null ? Z(_s) : c === null ? Z(vs) : Q(() => {
		let t = (e) => Ua({
			direct_provider_base_url: e?.base_url ?? null,
			direct_cloud: e?.direct_cloud ?? null
		}), n = new ii(), r = new Kt({
			executor: new ci({
				store: Ts(u, m),
				ids: { next: () => crypto.randomUUID() },
				clock: { now: h },
				resolve_source_message: (e) => {
					let t = me?.source_of(e.request_id) ?? null;
					return t === null ? null : {
						chat_id: t.chat_id,
						message_id: String(t.message_id),
						swipe_id: t.swipe_id
					};
				},
				load_adapters: T,
				profiles: { resolve: async (e) => {
					let t = (await T())[e], n = await ie();
					if (t === void 0 || n?.provider_id !== e) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(Fo(n.record));
				} },
				transport: Ms(async () => Ds(t(await ie()), {
					secrets: ee,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				})),
				assets: se ?? Cs(u, m),
				...E === null ? {} : { postprocess: async (e, t) => e.provider_id === "novelai" && e.action === "infill" ? (await E()).finish(e, t, AbortSignal.timeout(Os)) : t },
				log: { write: () => {} },
				plans: n
			}),
			persistence: new ri(u, m()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new Ft(),
			global_concurrency: p?.get_settings().global_concurrency ?? 1,
			provider_start_interval_ms: ks
		});
		a.push(w.observe_jobs(r));
		let i = vo({
			queue: r,
			plans: n,
			jobs: We(u).generation_jobs,
			namespace: m,
			origin: new wo(c, new yt(globalThis.crypto)),
			new_request_id: () => f.parse(crypto.randomUUID()),
			...ce === null ? {} : { prepare_request: ce }
		});
		if (p !== null) {
			let e = () => ee === null ? Promise.reject(Error(As)) : ee.resolve_secret(re(p.get_settings().active_namespace));
			me = new Wi({
				host: c,
				settings: () => p.get_settings().illustration,
				auto_generation_enabled: () => p.get_settings().auto_generation_enabled,
				prompt_context: (e) => Qi(de, fe, p.get_settings().illustration.prompt_preset_id, e),
				wardrobe: new qi({
					host: c,
					library: Gi(fe),
					run: Vi({
						host: c,
						settings: () => p.get_settings().illustration,
						resolve_analysis_key: e,
						new_generation_id: () => crypto.randomUUID()
					}),
					new_id: () => crypto.randomUUID()
				}),
				async build_request({ positive_prompt: e, negative_prompt: t, character_prompts: n }) {
					let r = await ae(), [{ build_generation_request: i }, a, o, s] = await Promise.all([
						import("./chunks/build_generation_request-BbaXLzyG.js"),
						import("./chunks/character_assets-C_vsqVcv.js"),
						import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r),
						fe.load()
					]), l = Zi(s, c.get_active_chat_id()), u = (e) => o.inject_prompt_tags(e, o.effective_prompt_tags({
						provider_id: r.provider_id,
						model_id: r.model_id,
						prompt_tags: Lo(r.record)
					}), o.prompt_tag_presets(s.prompt_tag)), d = et(n.map((e) => e.name), l), p = a.attach_character_loras(await i({
						provider_id: r.provider_id,
						positive_prompt: e,
						negative_prompt: t,
						image_count: 1,
						references: [],
						...r.model_id === null ? {} : { model_id: r.model_id }
					}, f.parse(crypto.randomUUID())), d, l.loras);
					if (p.provider_id !== "novelai" || p.action !== "generate" || E === null || C === null) return u(p);
					let [{ apply_novelai_defaults: h }, { reference_image_bytes: g }, _] = await Promise.all([
						import("./chunks/novelai_profile_defaults-CKb8rSMX.js"),
						import("./chunks/reference_image-DYyYuujP.js").then((e) => e.n),
						E()
					]), v = Ro(r.record), y = v === null ? p : await h(p, v, {
						store_input: (e) => _.store_input(e),
						async load_vibe(e) {
							let t = await C.novelai_vibes.get(m(), e), n = t === null ? {} : J(t);
							return typeof n.image == "string" ? {
								image_bytes: g(n.image),
								strength: Ya(n, "strength", .6),
								information_extracted: Ya(n, "information_extracted", 1)
							} : null;
						}
					});
					return u(await a.attach_character_references(y, d, { store_reference: (e) => _.store_input(g(e)) }));
				},
				async build_edit_request(e) {
					let t = await ie();
					if (t?.provider_id !== "novelai" || E === null) throw Error("Quick edits need an active NovelAI provider profile");
					let [{ build_novelai_edit_request: n }, { compute_generation_anchor: r }, { DEFAULT_NOVELAI_MODEL_ID: i }, a, o] = await Promise.all([
						import("./chunks/slot_edits-DnXBLx1W.js"),
						import("./chunks/build_generation_request-BbaXLzyG.js"),
						import("./chunks/novelai_request_defaults-B0sJ9ANr.js").then((e) => e.r),
						import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r),
						fe.load()
					]), s = (e) => a.inject_prompt_tags(e, a.effective_prompt_tags({
						provider_id: t.provider_id,
						model_id: t.model_id,
						prompt_tags: Lo(t.record)
					}), a.prompt_tag_presets(o.prompt_tag)), c = f.parse(crypto.randomUUID()), l = {
						request_id: c,
						generation_anchor: g.parse(await r(c)),
						model_id: t.model_id ?? i
					};
					if (e.kind !== "inpaint") return s(n(e, l));
					let u = await E();
					return s(n(e, {
						...l,
						mask_asset_id: await u.store_input(e.mask_png)
					}));
				},
				edits_available: () => ne === "novelai",
				resolve_analysis_key: e,
				async submit(e) {
					let n = await ae();
					return t(n), (await i.submit({
						profile_id: n.record.id,
						request: e
					})).request_id;
				},
				jobs: r,
				new_slot_id: Yi,
				new_generation_id: () => crypto.randomUUID(),
				wait: (e) => new Promise((t) => setTimeout(t, e))
			}), l.push(new $i(me, c));
		}
		return i;
	}), r.generation), O = e.create_vocabulary_worker === void 0 ? xs() : e.create_vocabulary_worker, k = o("vocabulary", u === null ? Z(_s) : O === null ? Z("This host has no Worker constructor, so vocabulary search cannot run") : Q(() => Zo({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-Duxf8as5.js");
			return new e({
				current_extension_version: n,
				open_database_impl: () => Promise.resolve(u)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-CCQkWkkk.js");
			return new e({ create_worker: O });
		}
	})), r.vocabulary);
	return {
		capabilities: {
			generation: he,
			profiles: ue,
			prompt_presets: de,
			assets: fe,
			gallery: pe,
			vocabulary: k,
			diagnostics: o("diagnostics", Q(() => oo({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: w,
				resolutions: () => i,
				settings: () => p?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? bs,
				extension_version: n
			})), r.diagnostics),
			settings: D,
			novelai: le
		},
		resolutions: i,
		host: c,
		illustrations: me,
		translator: c === null || p === null ? null : ua({
			host: c,
			settings: () => p.get_settings().translation,
			vocabulary: k
		}),
		modules: l,
		async dispose() {
			for (let e of [...a].reverse()) try {
				await e();
			} catch {}
			await p?.stop();
		}
	};
}
function Ds(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = Et(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new Ia({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new Va({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
	}
}
var Os = 12e4, ks = { novelai: 1500 }, As = "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";
function js(e, t) {
	let n = C.safeParse(e.provider_id).data;
	if (n === void 0) return null;
	let r = J(e);
	return {
		record: e,
		provider_id: n,
		model_id: Xa(Ka(r.provider_profile), "model_allowlist").find((e) => typeof e == "string") ?? null,
		base_url: qa(r, "base_url"),
		direct_cloud: {
			provider_id: n,
			credential_reference: qa(r, To),
			secrets_readable: t
		}
	};
}
function Ms(e) {
	return {
		async execute(t) {
			return (await e()).execute(t);
		},
		async fetch_remote_asset(t) {
			let n = await e();
			if (n.fetch_remote_asset === void 0) throw Error("The active provider transport cannot fetch remote assets");
			return n.fetch_remote_asset(t);
		}
	};
}
function Ns(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new rt("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new rt("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new rt("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return Ds({
		kind: "direct_cloud",
		provider_id: "novelai",
		credential_reference: e.credential_reference
	}, {
		secrets: t,
		...n === void 0 ? {} : { fetch: n }
	});
}
//#endregion
//#region src/bootstrap/startup_error.ts
var Ps = "https://github.com/N0VI028/JS-Slash-Runner";
function Fs(e) {
	if (e.ready) return {
		state: "ready",
		title: "Inkwell ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${Tn} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: Ps
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `Inkwell could not verify the installed version. ${t}`,
			update_url: Ps
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: Ps
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: Ps
		};
	}
}
function Is() {
	return {
		state: "failed",
		title: "Inkwell could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function Ls(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = In(n), i, a, o = null, s = !1;
	try {
		o = await Es({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new pt([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = Fs(r);
	else if (s) i = "failed", a = Is();
	else try {
		await c?.start_all(), i = "ready", a = Fs(r);
	} catch {
		i = "failed", a = Is();
	}
	let l = ni(t, e.stylesheet ?? ""), u = Ce(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = _e(Qr, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities,
		host: o?.host ? he(o.host) : null,
		illustrations: o?.illustrations ? he(o.illustrations) : null,
		translator: o?.translator ?? null
	}), p = ti(t);
	f.use(u.i18n), f.onUnmount(() => {
		l.remove(), p();
	});
	try {
		f.mount(l.app_element);
	} catch (e) {
		throw l.remove(), await c?.stop_all(), e;
	}
	let m = !1;
	return {
		state: i,
		probe: r,
		resolutions: o?.resolutions ?? [],
		async dispose() {
			if (m) return;
			m = !0;
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
//#region src/bootstrap/host_readiness.ts
function Rs(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function zs(e) {
	let t = Rs(e, "SillyTavern"), n = Rs(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = Rs(r, "eventSource"), a = Rs(Rs(r, "eventTypes"), "APP_READY"), o = Rs(i, "on"), s = Rs(i, "removeListener");
	if (typeof a != "string" || typeof o != "function") return Promise.resolve();
	let { promise: c, resolve: l } = Promise.withResolvers(), u = !1, d = () => {
		if (!u) {
			if (u = !0, typeof s == "function") try {
				Reflect.apply(s, i, [a, d]);
			} catch {}
			l(void 0);
		}
	};
	try {
		Reflect.apply(o, i, [a, d]);
	} catch {
		d();
	}
	return c;
}
//#endregion
//#region src/ui/styles/tokens.css?inline
var Bs = ":host{--tc-canvas:#edf0f5;--tc-surface:#fff;--tc-surface-raised:#f3f6fa;--tc-text:#141923;--tc-text-muted:#596578;--tc-divider:#ccd4df;--tc-accent:#2f5af5;--tc-accent-hover:#244bd6;--tc-on-accent:#fff;--tc-success:#157b59;--tc-warning:#946100;--tc-error:#c23838;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#080b10;--tc-surface:#10151c;--tc-surface-raised:#181f29;--tc-text:#f5f7fa;--tc-text-muted:#9ca8b8;--tc-divider:#2b3441;--tc-accent:#7898ff;--tc-accent-hover:#8aa6ff;--tc-on-accent:#080b10;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", Vs = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", Hs = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", Us = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", Ws = "._window_1rdvc_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid color-mix(in srgb, var(--tc-divider) 78%, var(--tc-text) 22%);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;border-radius:12px;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1rdvc_1;position:fixed;top:0;left:0;overflow:hidden;box-shadow:0 32px 96px #080b104d,0 8px 28px #080b102e}._window_1rdvc_1[data-positioned=false]{visibility:hidden}._window_1rdvc_1[data-dragging=true]{-webkit-user-select:none;user-select:none;box-shadow:0 40px 112px #080b105c,0 12px 36px #080b1038}@keyframes _floating-window-enter_1rdvc_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1rdvc_1{border-radius:10px;width:auto;height:auto;min-height:0;inset:8px;transform:none}._window_1rdvc_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1rdvc_1{animation:none}}", Gs = "._shell_1b5w2_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1b5w2_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1b5w2_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1b5w2_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1b5w2_57{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);cursor:move;touch-action:none;grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:16px;display:flex}._top_bar_start_1b5w2_71,._top_bar_end_1b5w2_72{align-items:center;gap:8px;min-width:0;display:flex}._top_bar_brand_1b5w2_79{color:var(--tc-text);flex:none;font-size:13px;font-weight:650}._top_bar_divider_1b5w2_86{color:var(--tc-divider);flex:none}._top_bar_title_1b5w2_91{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-weight:500;overflow:hidden}._icon_button_1b5w2_100{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._shell_1b5w2_8[data-viewport=mobile] ._top_bar_1b5w2_57{cursor:default;touch-action:auto}._icon_button_1b5w2_100._close_button_1b5w2_116:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_1b5w2_100[data-selected=true],._icon_button_1b5w2_100[aria-pressed=true]{color:var(--tc-accent)}._rail_1b5w2_126{background-color:var(--tc-surface);border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:6px;padding:12px 8px;display:flex;overflow:hidden auto}._rail_button_1b5w2_139{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1b5w2_139[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1b5w2_158{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1b5w2_166{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_1b5w2_176{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_1b5w2_185{background-color:var(--tc-surface);border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1b5w2_194{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1b5w2_194:hover,._inspector_resizer_1b5w2_194[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1b5w2_207{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1b5w2_215{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1b5w2_224{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_1b5w2_232{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_1b5w2_232{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_1b5w2_232 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_1b5w2_232 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_1b5w2_258{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1b5w2_267{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1b5w2_267[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1b5w2_283{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._sheet_overlay_1b5w2_291{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1b5w2_298{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1b5w2_312{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1b5w2_324{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1b5w2_333{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1b5w2_41{background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1b5w2_350{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1b5w2_358{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1b5w2_367{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1b5w2_374{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1b5w2_386{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1b5w2_386[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1b5w2_386[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1b5w2_386[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1b5w2_406{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1b5w2_413{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1b5w2_418{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1b5w2_430{width:min(560px,100vw - 40px);max-height:calc(100dvh - 40px);color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid var(--tc-divider);border-radius:12px;flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex;position:fixed;top:20px;right:20px;overflow:auto;box-shadow:0 20px 56px #11131838}._state_screen_eyebrow_1b5w2_449{color:var(--tc-text-muted)}._state_screen_title_1b5w2_453{max-width:56ch}._state_screen_action_1b5w2_457{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1b5w2_467{max-width:56ch;color:var(--tc-text-muted)}", Ks = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function qs(e) {
	return e.replaceAll(Ks, (e, t) => new URL(t, import.meta.url).href);
}
var Js = qs([
	Bs,
	Vs,
	Hs,
	Us,
	Ws,
	Gs
].join("\n"));
//#endregion
//#region src/index.ts
function Ys() {
	ts(globalThis, ns);
}
var Xs = zs(globalThis).then(() => Ls({
	stylesheet: Js,
	version: "3.0.0"
}));
//#endregion
export { Xs as bootstrap_handle, Ys as register_chat_surface };
