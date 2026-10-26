import { t as e } from "./chunks/shell.module-DFs3Bhuc.js";
import { n as t, r as n, t as r } from "./chunks/sha2-BGNex9vj.js";
import { T as i, _ as a, a as o, b as s, g as c, i as l, l as u, m as d, n as f, o as p, r as m, s as h, u as g, y as _ } from "./chunks/ids-DjWg1HG8.js";
import { n as v, r as y } from "./chunks/generation-CPQjBKML.js";
import { o as b, s as ee } from "./chunks/provider-Bp1QeoG9.js";
import { a as te, i as x, n as S, o as ne, r as re } from "./chunks/llm_connection-DZhYUypM.js";
import { a as ie, c as ae, d as oe, f as C, i as se, l as w, o as T, r as ce, s as le, t as ue, u as de } from "./chunks/http_acknowledgment-BvXuB_ad.js";
import { i as fe, n as pe, o as me, r as he, s as ge, t as _e } from "./chunks/media_command_service-DiA8Hw0M.js";
import { A as ve, F as ye, H as be, I as xe, N as E, O as Se, P as Ce, Q as we, V as Te, W as Ee, Z as De, _ as D, b as O, ct as k, et as A, ft as Oe, g as j, h as M, i as ke, k as Ae, m as N, n as je, nt as Me, p as P, pt as F, rt as Ne, u as Pe, ut as I, x as L, y as Fe } from "./chunks/vue-i18n-DUz2Gjn8.js";
import { t as Ie } from "./chunks/create_i18n-D3HWOpDA.js";
import { n as Le, t as Re } from "./chunks/AppIcon-Cnhzrx9o.js";
import { t as ze } from "./chunks/chevron-down-Tu_8qTxg.js";
import { t as Be } from "./chunks/chevron-up-D4TetO-M.js";
import { n as Ve } from "./chunks/route_nav-BrwZiRD4.js";
import { t as He } from "./chunks/x-CDKrptQJ.js";
import { a as Ue, i as We, n as Ge, r as Ke, t as qe } from "./chunks/analysis-B2zsRnlh.js";
import { t as Je } from "./chunks/portal_keys-gQ1cWdMS.js";
import { C as Ye, a as Xe, r as Ze } from "./chunks/job_repository-Du1AatS8.js";
import { a as Qe, c as $e, d as et, i as tt, l as nt, o as rt, s as it, t as at, u as ot } from "./chunks/business_repositories-Du28FQIk.js";
import { t as st } from "./chunks/novelai_errors-Bve94MgO.js";
import { i as ct, r as lt } from "./chunks/browser_secret_vault-DhuOFaGV.js";
import { a as ut, i as dt, n as ft, o as pt } from "./chunks/provider_transport-DxRVhJ6l.js";
import { t as mt } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
//#region ../../packages/core/src/capability_registry.ts
var ht = class {
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
}, gt = class {
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
}, _t = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new ht(), n = new gt()) {
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
}, vt = "Canonical JSON accepts only JSON data";
function yt() {
	throw TypeError(vt);
}
function bt(e) {
	return typeof e == "number" && !Number.isFinite(e) ? yt() : JSON.stringify(e);
}
function xt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return bt(e);
	if (typeof e != "object") return yt();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return yt();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return yt();
				n.push(xt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return yt();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return yt();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return yt();
			a.push(`${bt(n)}:${xt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function St(e) {
	return xt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var Ct = class {
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
function wt(e) {
	return t(r(n(e)));
}
function Tt(e, n) {
	let r = wt(St(e)), i = n.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: r,
		generation_anchor: wt(`${r}${t(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/library.ts
var Et = h(["user", "assistant"]), Dt = {
	id: o,
	display_name: s().trim().min(1).max(120),
	role: Et,
	description: s().trim().max(8e3),
	greeting: s().trim().max(4e3),
	avatar_image_id: f.nullable(),
	is_active: g()
}, Ot = _(Dt), kt = _({
	...Dt,
	created_at: i({ offset: !0 }),
	updated_at: i({ offset: !0 })
}), At = h([
	"manual",
	"imported",
	"character"
]), jt = {
	id: o,
	title: s().trim().min(1).max(200),
	source_type: At,
	content: s().trim().min(1).max(5e4),
	keywords: u(s().trim().min(1).max(80)).max(64).refine((e) => new Set(e).size === e.length, "keywords must not repeat"),
	priority: c().int().min(0).max(1e3),
	enabled: g()
}, Mt = _(jt), Nt = _({
	...jt,
	created_at: i({ offset: !0 }),
	updated_at: i({ offset: !0 })
}), Pt = Object.freeze({}), Ft = {
	kind: "bearer",
	header: "authorization"
}, It = Object.freeze({
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
		auth: Ft,
		required_headers: Pt
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: Ft,
		required_headers: Pt
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: Pt
	}
});
function Lt(e) {
	let t = S[e];
	return Object.freeze([...t.completion_routes, t.models_route]);
}
var Rt = Object.freeze({
	openai_compatible: {
		origin: "https://api.openai.com",
		routes: Lt("openai_compatible"),
		auth: Ft,
		required_headers: Pt
	},
	anthropic: {
		origin: "https://api.anthropic.com",
		routes: Lt("anthropic"),
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
		routes: Lt("google_generative"),
		auth: Ft,
		required_headers: Pt
	},
	ollama: {
		origin: "http://127.0.0.1:11434",
		routes: Lt("ollama"),
		auth: { kind: "none" },
		required_headers: Pt
	}
}), zt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function Bt(e) {
	return It[e];
}
function Vt(e) {
	return Rt[e];
}
function Ht(e, t) {
	if (!e.routes.includes(t)) throw new zt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var Ut = s().regex(/^[A-Za-z0-9_-]{8,32}$/u), Wt = _({
	slot_id: Ut,
	paragraph: c().int().min(0),
	anchor: s().max(400),
	scene: s().max(2e3),
	characters: u(s().trim().min(1).max(120)).max(16),
	positive_prompt: s().max(8e3),
	negative_prompt: s().max(8e3),
	image_ids: u(f),
	active_image_id: f.nullable(),
	pending_request_ids: u(l),
	last_error: s().max(500).nullable()
}), Gt = _({
	schema_version: d(2),
	slots: u(Wt).max(16)
}), Kt = _({
	schema_version: d(1),
	chat_id: s().min(1).max(512),
	active_swipes: u(a({
		message_id: c().int().nonnegative(),
		swipe_id: c().int().nonnegative()
	})),
	messages: u(a({
		message_id: c().int().nonnegative(),
		role: h([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: y,
		swipe_id: c().int().nonnegative().nullable()
	}))
}), qt = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function R(e) {
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
var Jt = {
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
}, Yt = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function Xt(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Jt[r].includes(t)) throw new Yt(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function Zt(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function Qt(e) {
	let t = y.parse(e.generation_anchor), n = Object.freeze(v.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: l.parse(e.request_id),
		generation_anchor: t,
		source_anchor: y.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: b.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function $t(e) {
	let i = `${e.generation_anchor}${St(e.arguments)}`;
	return t(r(n(i)));
}
function en(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function tn(e) {
	return e instanceof ge ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var nn = class {
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
	#f = b.options;
	#p = 0;
	#m = 0;
	#h = !1;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new qt(), this.#i = Zt(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#f) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : Zt(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, []), this.#s.set(t, 0);
		}
	}
	enqueue(e) {
		let t = Qt(e), n = $t(t);
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
		return t === void 0 ? null : R(t.job);
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
		if (t.job.state === "cancelled") return R(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#w(t);
		let n = await this.#C(t, async () => (t.job.state !== "cancelled" && await this.#S(t, "cancelled"), R(t.job)));
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
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#C(n, async () => (n.job.state !== t && await this.#S(n, t), R(n.job)));
	}
	async #_(e, t) {
		let n = this.#r.now().toISOString(), r = {
			job_id: m.parse(this.#n.next()),
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
		}, i = R(r);
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
			let n = (await this.#e.execute(R(e.job), t)).image_ids.map((e) => f.parse(e));
			if (n.length === 0) throw new ge({
				code: "malformed_response",
				retryable: !1
			});
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = en(e.job);
				t.image_ids = n, await this.#S(e, "completed", t);
			});
		} catch (t) {
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = en(e.job);
				n.error = tn(t), await this.#S(e, "failed", n);
			});
		}
	}
	async #S(e, t, n = en(e.job)) {
		Xt(n, t, this.#r.now().toISOString());
		let r = R(n);
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
}, rn = "tavern_canvas";
function an(e) {
	return e.bind(globalThis);
}
function on(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function sn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function z(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function cn(e, t) {
	let n = z(e, t);
	if (typeof n == "function") try {
		return Reflect.apply(n, e, []);
	} catch {
		return;
	}
}
function ln(e, t) {
	let n = z(e, "eventSource"), r = z(e, "eventTypes");
	return !on(n) || !on(r) ? !1 : typeof z(n, "on") == "function" && typeof z(n, "removeListener") == "function" && t.every((e) => {
		let t = z(r, e);
		return typeof t == "string" && t.length > 0;
	});
}
function un(e) {
	let t = on(e) ? cn(e, "getContext") : void 0;
	if (!on(t)) return {
		main_generation_events: !1,
		message_swipe_metadata: !1
	};
	let n = cn(t, "getCurrentLocale");
	return {
		main_generation_events: typeof n == "string" && n.trim().length > 0 && ln(t, [
			"GENERATION_STARTED",
			"GENERATION_STOPPED",
			"GENERATION_ENDED"
		]),
		message_swipe_metadata: typeof z(t, "getCurrentChatId") == "function" && Array.isArray(z(t, "chat")) && typeof z(t, "saveChat") == "function" && ln(t, [
			"CHAT_CHANGED",
			"MESSAGE_SWIPED",
			"MESSAGE_UPDATED",
			"MESSAGE_EDITED",
			"CHARACTER_MESSAGE_RENDERED",
			"MORE_MESSAGES_LOADED"
		])
	};
}
function dn(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function fn(e) {
	if (!sn(e) || !Object.values(e).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return { ...e };
}
function pn(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
var mn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t.bind(globalThis);
	}
	get_locale() {
		return dn(this.#e().getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		return dn(this.#e().getCurrentChatId(), "SillyTavern returned an invalid active chat ID");
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
				let n = pn(t);
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
			let n = pn(t);
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
		let t = this.#r(e, !1)?.[rn];
		return t === void 0 ? null : structuredClone(t);
	}
	async translate_deepl(e, t, n) {
		let r = await this.#t("/api/translate/deepl", {
			method: "POST",
			headers: fn(this.#e().getRequestHeaders()),
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
	async write_swipe_record(e, t) {
		let n = this.#r(e, !0);
		if (n === null) throw Error(`Chat ${e.chat_id} message ${String(e.message_id)} swipe ${String(e.swipe_id)} is not available`);
		n[rn] = structuredClone(t), await this.#e().saveChat();
	}
}, hn = {
	message_swipe_metadata: ["getChatMessages", "setChatMessages"],
	preset_generation: ["generate", "stopGenerationById"],
	tavern_regex: [
		"getTavernRegexes",
		"replaceTavernRegexes",
		"retrieveDisplayedMessage"
	]
};
function gn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function _n(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function vn(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function yn(e, t) {
	return t.every((t) => typeof vn(e, t) == "function");
}
function bn(e) {
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
function xn(e) {
	return gn(e) ? {
		detected: !0,
		version: bn(e),
		message_swipe_metadata: yn(e, hn.message_swipe_metadata),
		preset_generation: yn(e, hn.preset_generation),
		tavern_regex: yn(e, hn.tavern_regex)
	} : {
		detected: e !== void 0,
		version: e === void 0 ? { state: "missing" } : { state: "invalid" },
		message_swipe_metadata: !1,
		preset_generation: !1,
		tavern_regex: !1
	};
}
function Sn(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function Cn(e) {
	if (!_n(e)) throw Error("TavernHelper returned an invalid chat message");
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o } = e;
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || typeof n != "string" || !Sn(r) || i !== void 0 && typeof i != "boolean" || typeof a != "number" || !Number.isInteger(a) || !Array.isArray(o) || !o.every((e) => typeof e == "string") || a < 0 || a >= o.length) throw Error(`TavernHelper returned an invalid chat message ${String(t)}`);
	return {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o
	};
}
function wn(e) {
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
function Tn(e) {
	if (typeof e == "string") return {
		content: e,
		reasoning: null
	};
	if (_n(e) && typeof e.content == "string") return {
		content: e.content,
		reasoning: typeof e.reasoning == "string" && e.reasoning.length > 0 ? e.reasoning : null
	};
	throw Error("TavernHelper.generate returned neither text nor a detailed result");
}
function En(e) {
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
function Dn(e) {
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
function On(e, t) {
	return e.script_name === t.script_name && e.find_regex === t.find_regex && e.replace_string === t.replace_string && e.source.ai_output === t.source.ai_output && e.source.user_input === t.source.user_input && e.destination.display === t.destination.display && e.destination.prompt === t.destination.prompt && e.run_on_edit === t.run_on_edit;
}
var kn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	#n(e) {
		let t = this.#e.getChatMessages(e, { include_swipes: !0 });
		if (!Array.isArray(t)) throw Error("TavernHelper returned invalid chat messages");
		return t.map(Cn);
	}
	get_active_chat() {
		let e = this.#n("0-{{lastMessageId}}");
		return Promise.resolve({
			chat_id: this.#t(),
			messages: e.map(wn)
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
		let t = En(e.connection);
		return Tn(await this.#e.generate({
			generation_id: e.generation_id,
			preset_name: e.preset_name,
			user_input: e.user_input,
			max_chat_history: e.max_chat_history,
			should_silence: !0,
			should_stream: !1,
			should_return_reasoning: !0,
			...t === void 0 ? {} : { custom_api: t },
			...e.json_schema === null ? {} : { json_schema: {
				...e.json_schema,
				strict: !0
			} }
		}));
	}
	stop_generation(e) {
		this.#e.stopGenerationById(e);
	}
	async sync_regex_scripts(e) {
		let t = { type: "global" }, n = this.#e.getTavernRegexes(t), r = e.map(Dn).filter((e) => {
			let t = n.find((t) => t.id === e.id);
			return t === void 0 || !On(t, e);
		});
		if (r.length === 0) return !1;
		let i = n.filter((e) => !r.some((t) => t.id === e.id));
		return await this.#e.replaceTavernRegexes([...i, ...r], t), !0;
	}
	find_message_element(e) {
		return this.#e.retrieveDisplayedMessage(e).get(0) ?? null;
	}
}, An = "4.11.1", jn = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function Mn(e) {
	let t = jn.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function Nn(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function Pn(e) {
	let t = Mn(e), n = Mn(An);
	return t === null || n === null ? "invalid" : Nn(t, n) ? "supported" : "unsupported";
}
var Fn = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function In(e) {
	return {
		available: !1,
		reason: e
	};
}
function Ln(e, t) {
	return e ? { available: !0 } : In(t);
}
function Rn(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function zn(e, t) {
	return {
		main_generation_events: Ln(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		preset_generation: Ln(e.preset_generation, "TavernHelper.generate or stopGenerationById is unavailable"),
		message_swipe_metadata: Ln(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper or SillyTavern chat message API is unavailable"),
		tavern_regex: Ln(e.tavern_regex, "TavernHelper regex or displayed message API is unavailable"),
		tavern_helper: Ln(e.version.state === "available", "TavernHelper version API is unavailable"),
		gateway_protocol: In("Gateway protocol is not connected")
	};
}
function Bn(e) {
	return Fn.filter((t) => e[t]?.available !== !0);
}
function Vn(e) {
	let t = xn(Rn(e, "TavernHelper")), n = zn(t, un(Rn(e, "SillyTavern")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: Bn(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: Bn(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = Pn(i);
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
	let o = Bn(n);
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
var Hn = "capability_not_implemented";
function B() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: Hn }), Promise.reject(e);
}
function V() {
	return () => {};
}
var Un = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	reference: [],
	workflow: []
}, Wn = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, Gn = {
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
		prompt_preset_id: null
	},
	translation: {
		deepl_endpoint: "free",
		glossary: []
	},
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
function Kn() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: V,
			submit: B,
			cancel: B,
			retry: B
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: V,
			save: B,
			remove: B,
			test_connection: B,
			set_credential: B,
			clear_credential: B,
			save_novelai_defaults: B
		},
		llm_connections: {
			load: () => Promise.resolve([]),
			subscribe: V,
			save: B,
			remove: B,
			set_credential: B,
			clear_credential: B,
			test_connection: B
		},
		novelai: {
			get_account: B,
			load: () => Promise.resolve([]),
			refresh_models: B,
			estimate_cost: B
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: V,
			load_draft: B,
			save_draft: B,
			remove: B,
			bulk_remove: B,
			test_regex: B
		},
		assets: {
			load: () => Promise.resolve(Un),
			subscribe: V,
			save: B,
			remove: B,
			reorder: B
		},
		personas: {
			load: () => Promise.resolve([]),
			subscribe: V,
			save: B,
			remove: B
		},
		knowledge: {
			load: () => Promise.resolve([]),
			subscribe: V,
			save: B,
			set_enabled: B,
			remove: B,
			bulk_remove: B
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: V,
			read_bytes: B,
			pin: B,
			detach_from_message: B,
			delete_record: B,
			reveal_source: B,
			bulk_delete: B
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			search: B,
			next_page: B,
			install: B,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(Wn),
			subscribe: V,
			test_connection: B,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: B
		},
		settings: {
			load: () => Promise.resolve({
				settings: Gn,
				vocabulary_update_channel: "bundled",
				browser_secret_vault: {
					state: "unavailable",
					secret_count: 0
				}
			}),
			subscribe: V,
			update: B,
			acknowledge_http_origin: B,
			set_gateway_token: B,
			clear_gateway_token: B,
			set_analysis_key: B,
			clear_analysis_key: B,
			set_deepl_key: B,
			clear_deepl_key: B,
			initialize_browser_secret_vault: B,
			unlock_browser_secret_vault: B,
			lock_browser_secret_vault: B,
			reset_browser_secret_vault: B,
			set_vocabulary_update_channel: B,
			import_vocabulary_package: B,
			cancel_vocabulary_import: () => {},
			export_archive: B,
			import_archive: B
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var qn = { status: "idle" }, Jn = "capability_load_failed", Yn = "command_failed", Xn = /^[a-z][a-z0-9_]*$/u;
function Zn(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && Xn.test(t)) return { code: t };
	}
	return { code: t };
}
function H(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var Qn = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function $n(e) {
	return e === "failed" ? "error" : "pending";
}
function er(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function tr(e) {
	return {
		id: e.job_id,
		label_code: er(e.state),
		status: $n(e.state),
		progress: e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null
	};
}
function nr(e) {
	return e.filter((e) => Qn.has(e.state)).map(tr);
}
function rr(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: Zn(e, Yn)
		});
	}));
}
function ir(e, t, n) {
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
		llm_connections: {
			connections: [],
			selected_connection_id: null
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: qn
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
			vocabulary_install_command: qn
		},
		library: {
			personas: [],
			knowledge: [],
			selected_knowledge_ids: []
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: qn
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			connection_test_command: qn,
			support_bundle_command: qn
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: qn
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var ar = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = ir(e.initial_route ?? "settings", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
			tasks: nr(e)
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
			this.#i || this.#v(e, Zn(t, Jn));
		}).finally(() => {
			this.#_(e, !1);
		});
	}
	#b(e) {
		this.#i || (e.type === "job_updated" ? this.#c(H(this.#t.generation.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.generation.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#x(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: H(this.#t.generation.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.generation.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#S(e) {
		this.#i || (e.type === "connection_upserted" ? this.#l({ connections: H(this.#t.llm_connections.connections, e.connection, (e) => e.id) }) : this.#l({ connections: this.#t.llm_connections.connections.filter((t) => t.id !== e.connection_id) }));
	}
	#C(e) {
		this.#i || (e.type === "preset_upserted" ? this.#u({ presets: H(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#u({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#w(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: H(this.#t.assets.records[t], e.asset, (e) => e.id)
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
		this.#i || (e.type === "entry_upserted" ? this.#f({ knowledge: H(this.#t.library.knowledge, e.entry, (e) => e.id) }) : this.#f({
			knowledge: this.#t.library.knowledge.filter((t) => t.id !== e.entry_id),
			selected_knowledge_ids: this.#t.library.selected_knowledge_ids.filter((t) => t !== e.entry_id)
		}));
	}
	#D(e) {
		this.#i || (e.type === "record_upserted" ? this.#p({ records: H(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#p({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
	}
	#O(e) {
		this.#i || this.#m({ timeline: [...this.#t.diagnostics.timeline, e.entry] });
	}
	#k(e) {
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
			this.#e.settings.subscribe((e) => {
				this.#k(e);
			})
		], await Promise.allSettled([
			this.#y("generation", () => this.#e.generation.load(), (e) => {
				this.#c(e);
			}),
			this.#y("profiles", () => this.#e.profiles.load(), (e) => {
				this.#s({
					profiles: e,
					active_profile_id: this.#t.generation.active_profile_id ?? e[0]?.id ?? null
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
			this.#y("settings", () => this.#e.settings.load(), (e) => {
				this.#h({
					settings: e.settings,
					vocabulary_update_channel: e.vocabulary_update_channel,
					browser_secret_vault: e.browser_secret_vault
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
	set_settings_section(e) {
		this.#o({
			route: "settings",
			settings_section: e
		});
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
	async select_provider_profile(e) {
		await this.#e.settings.update({ active_provider_profile_id: e }), this.#i || this.#s({ active_profile_id: e });
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
		return rr(() => this.#t.prompt.save_command, (e) => {
			this.#u({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#u({
				presets: H(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return rr(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#d({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return rr(() => this.#t.settings.update_command, (e) => {
			this.#h({ update_command: e });
		}, async () => {
			let t = await this.#e.settings.update(e);
			if (e.credential_storage_mode === void 0) return this.#h({ settings: t }), t;
			let n = await this.#e.settings.load();
			return this.#h({
				settings: n.settings,
				vocabulary_update_channel: n.vocabulary_update_channel,
				browser_secret_vault: n.browser_secret_vault
			}), n.settings;
		});
	}
	test_diagnostics_connection() {
		return rr(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#m({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return rr(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#m({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	async load_diagnostics_timeline() {
		let e = await this.#e.diagnostics.load_timeline();
		this.#i || this.#m({ timeline: e });
	}
	async save_provider_profile(e) {
		let t = await this.#e.profiles.save(e), n = t.is_default || this.#t.generation.active_profile_id === null;
		return n && await this.#e.settings.update({ active_provider_profile_id: t.id }), this.#i || this.#s({
			profiles: H(this.#t.generation.profiles, t, (e) => e.id),
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
		return this.#i || this.#s({ profiles: H(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#s({ profiles: H(this.#t.generation.profiles, t, (e) => e.id) }), t;
	}
	async save_novelai_defaults(e, t) {
		let n = await this.#e.profiles.save_novelai_defaults(e, t);
		return this.#i || this.#s({ profiles: H(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	load_novelai_account() {
		return this.#e.novelai.get_account();
	}
	load_novelai_models() {
		return this.#e.novelai.load();
	}
	acknowledge_http_origin(e) {
		return this.#A(this.#e.settings.acknowledge_http_origin(e));
	}
	set_gateway_token(e) {
		return this.#A(this.#e.settings.set_gateway_token(e));
	}
	set_deepl_key(e) {
		return this.#e.settings.set_deepl_key(e);
	}
	set_analysis_key(e) {
		return this.#e.settings.set_analysis_key(e);
	}
	clear_analysis_key() {
		return this.#e.settings.clear_analysis_key();
	}
	clear_deepl_key() {
		return this.#e.settings.clear_deepl_key();
	}
	clear_gateway_token() {
		return this.#A(this.#e.settings.clear_gateway_token());
	}
	async initialize_browser_secret_vault(e) {
		let t = await this.#e.settings.initialize_browser_secret_vault(e);
		this.#i || this.#h({ browser_secret_vault: t });
	}
	async unlock_browser_secret_vault(e) {
		let t = await this.#e.settings.unlock_browser_secret_vault(e);
		this.#i || this.#h({ browser_secret_vault: t });
	}
	async lock_browser_secret_vault() {
		let e = await this.#e.settings.lock_browser_secret_vault();
		this.#i || this.#h({ browser_secret_vault: e });
	}
	async reset_browser_secret_vault() {
		let e = await this.#e.settings.reset_browser_secret_vault();
		this.#i || this.#h({ browser_secret_vault: e });
	}
	async #A(e) {
		await e;
		let t = await this.#e.settings.load();
		this.#i || this.#h({
			settings: t.settings,
			vocabulary_update_channel: t.vocabulary_update_channel,
			browser_secret_vault: t.browser_secret_vault
		});
	}
	async set_vocabulary_update_channel(e) {
		await this.#e.settings.set_vocabulary_update_channel(e), this.#i || this.#h({ vocabulary_update_channel: e });
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
	import_settings_archive(e) {
		return this.#e.settings.import_archive(e);
	}
	set_active_asset_category(e) {
		this.#d({ active_category: e });
	}
	async save_asset(e, t) {
		let n = await this.#e.assets.save(e, t);
		this.#i || this.#d({ records: {
			...this.#t.assets.records,
			[e]: H(this.#t.assets.records[e], n, (e) => e.id)
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
		let t = H(this.#t.library.personas, e, (e) => e.id);
		return e.is_active ? t.map((t) => t.id === e.id || t.role !== e.role ? t : {
			...t,
			is_active: !1
		}) : t;
	}
	async save_knowledge_entry(e) {
		let t = await this.#e.knowledge.save(e);
		return this.#i || this.#f({ knowledge: H(this.#t.library.knowledge, t, (e) => e.id) }), t;
	}
	async set_knowledge_entry_enabled(e, t) {
		let n = await this.#e.knowledge.set_enabled(e, t);
		return this.#i || this.#f({ knowledge: H(this.#t.library.knowledge, n, (e) => e.id) }), n;
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
		let t = H(this.#t.llm_connections.connections, e, (e) => e.id);
		this.#l({ connections: e.is_default ? t.map((t) => t.id === e.id ? t : {
			...t,
			is_default: !1
		}) : t });
	}
	select_gallery_record(e) {
		this.#p({ selected_record_id: e });
	}
	reveal_gallery_source(e) {
		return this.#e.gallery.reveal_source(e);
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
		return rr(() => this.#t.gallery.bulk_delete_command, (e) => {
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
function or(e) {
	return new ar(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function sr(e) {
	let t = De(or(e)), n = Me(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), we(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var cr = Le("image", [
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
]), lr = Le("panel-right-close", [
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
]), ur = Le("panel-right-open", [
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
]), dr = ["image", "video"], fr = /^(?:blob:|data:image\/|data:video\/)/u, pr = _({
	kind: h(dr),
	url: s().min(1).refine((e) => fr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function mr(e) {
	let t = pr.safeParse(e);
	return t.success ? t.data : null;
}
function hr(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: mr(n)
	};
}
var gr = 8;
function _r(e, t) {
	let n = Math.max(gr, t.width - 56 - gr), r = Math.max(gr, t.height - 56 - gr);
	return {
		x: Math.min(Math.max(e.x, gr), n),
		y: Math.min(Math.max(e.y, gr), r)
	};
}
function vr(e) {
	return _r({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var yr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function br(e) {
	let t = mr(e);
	return t !== null && t.kind === "image" ? t : null;
}
var xr = class {
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
		this.#n && (this.#t = _r(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = vr(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? vr(t) : _r(e, t);
	}
}, Sr = "(min-width: 960px)";
function Cr() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(Sr).matches;
}
function wr(e) {
	if (e !== void 0) return P(() => e);
	let t = A(Cr());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(Sr), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), we(() => {
			e.removeEventListener("change", n);
		});
	}
	return P(() => t.value ? "desktop" : "mobile");
}
var Tr = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, Er = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], Dr = ["src"], Or = ["src"], kr = /* @__PURE__ */ L({
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
		let n = e, r = t, i = wr(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new xr({
			position_store: Ne(n.positionStore) ?? De(new yr()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = A(o.position), c = A(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		Te(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		ve(() => {
			window.addEventListener("resize", u);
		}), Ae(() => {
			window.removeEventListener("resize", u);
		});
		let d = P(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: br(n.mediaAssets.idle)
			} : hr(n.mediaAssets, e);
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
		return (t, n) => e.enabled ? (E(), D("button", {
			key: 0,
			type: "button",
			class: I(["tc-interactive", [k(Tr).floatingEntry, c.value && k(Tr).floatingEntryDragging]]),
			style: Oe({
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
		}, [d.value.asset?.kind === "video" ? (E(), D("video", {
			key: 0,
			class: I(k(Tr).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, Dr)) : d.value.asset?.kind === "image" ? (E(), D("img", {
			key: 1,
			class: I(k(Tr).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, Or)) : (E(), M(Re, {
			key: 2,
			icon: k(cr)
		}, null, 8, ["icon"]))], 46, Er)) : j("", !0);
	}
}), Ar = "data-tavern-canvas-menu-entry";
function jr(e, t) {
	let n = A(!1), r = null;
	return ve(() => {
		let i = document.getElementById("extensionsMenu");
		if (i === null) return;
		i.querySelector(`[${Ar}]`)?.remove(), r = document.createElement("div"), r.className = "list-group-item flex-container flexGap5 interactable", r.setAttribute(Ar, ""), r.setAttribute("role", "button"), r.tabIndex = 0;
		let a = document.createElement("div");
		a.className = "extensionsMenuExtensionButton", a.append(Ue(document));
		let o = document.createElement("span");
		be(() => {
			o.textContent = e();
		}), r.append(a, o), r.addEventListener("click", t), i.append(r), n.value = !0;
	}), Ae(() => {
		r?.remove();
	}), n;
}
//#endregion
//#region src/ui/experience/use_host_entry_points.ts
var Mr = "data-tavern-canvas-settings", Nr = "inkwell", Pr = !1;
function Fr(e, t) {
	if (Pr) return;
	let n = globalThis.SillyTavern?.getContext?.(), r = n?.SlashCommand?.fromProps?.({
		name: Nr,
		helpString: e,
		returns: "nothing",
		callback: () => (t(), "")
	});
	r !== void 0 && n?.SlashCommandParser?.addCommandObject !== void 0 && (n.SlashCommandParser.addCommandObject(r), Pr = !0);
}
function Ir(e, t) {
	let n = null;
	ve(() => {
		Fr(e.description(), t);
		let r = document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
		if (r === null) return;
		r.querySelector(`[${Mr}]`)?.remove(), n = document.createElement("div"), n.setAttribute(Mr, ""), n.className = "flex-container flexFlowColumn flexGap5";
		let i = document.createElement("b"), a = document.createElement("small"), o = document.createElement("div");
		be(() => {
			i.textContent = e.name(), a.textContent = e.description(), o.textContent = e.open();
		}), o.className = "menu_button interactable", o.setAttribute("role", "button"), o.tabIndex = 0, o.addEventListener("click", t), o.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t());
		}), n.append(i, a, o), r.append(n);
	}), Ae(() => {
		n?.remove();
	});
}
function Lr(e, t, n) {
	let r = Math.max(20, t.width - n.width - 20), i = Math.max(20, t.height - n.height - 20);
	return {
		x: Math.min(Math.max(e.x, 20), r),
		y: Math.min(Math.max(e.y, 20), i)
	};
}
function Rr(e, t) {
	return Lr({
		x: e.width - t.width - 20,
		y: 64
	}, e, t);
}
var zr = {
	window: "_window_1rdvc_1",
	"floating-window-enter": "_floating-window-enter_1rdvc_1"
}, Br = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], Vr = /* @__PURE__ */ L({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = A(null), r = A({
			x: 0,
			y: 0
		}), i = A(!1), a = A(!1);
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
			r.value = i.value ? Lr(r.value, t, a) : Rr(t, a), i.value = !0;
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
				r.value = Lr({
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
		return ve(() => {
			window.addEventListener("resize", u), Se(c);
		}), Ae(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (E(), D("section", {
			ref_key: "window_element",
			ref: n,
			class: I(k(zr).window),
			style: Oe({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [xe(e.$slots, "default")], 46, Br));
	}
}), Hr = /* @__PURE__ */ L({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return Ce(Je, t.portalTarget), (e, t) => xe(e.$slots, "default");
	}
}), Ur = /* @__PURE__ */ L({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = O(() => import("./chunks/GalleryView-BJNKCt44.js")), n = O(() => import("./chunks/SettingsView-BC31n3Ej.js"));
		return (r, i) => e.state.route === "gallery" ? (E(), M(k(t), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (E(), M(k(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), Wr = ["aria-label", "aria-expanded"], Gr = ["data-status"], Kr = {
	key: 0,
	class: "tc-tabular-nums"
}, qr = /* @__PURE__ */ L({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(t) {
		let n = t, { t: r, n: i } = je(), a = A(!0), o = {
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
		function s(e) {
			return o[e]?.() ?? e;
		}
		let c = P(() => a.value ? r("nav.task_strip_collapse") : r("nav.task_strip_expand"));
		function l() {
			a.value = !a.value;
		}
		return (t, o) => n.tasks.length > 0 ? (E(), D("div", {
			key: 0,
			class: I(k(e).task_strip)
		}, [N("div", { class: I(k(e).task_strip_header) }, [N("span", { class: I([k(e).task_strip_summary, "tc-tabular-nums"]) }, F(k(r)("nav.task_strip_count", n.tasks.length)), 3), N("button", {
			type: "button",
			class: I(["tc-interactive", k(e).icon_button]),
			"aria-label": c.value,
			"aria-expanded": a.value,
			onClick: l
		}, [Fe(Re, {
			icon: a.value ? k(ze) : k(Be),
			size: 16
		}, null, 8, ["icon"])], 10, Wr)], 2), a.value ? (E(), D("div", {
			key: 0,
			class: I(k(e).task_strip_list)
		}, [(E(!0), D(Pe, null, ye(n.tasks, (t) => (E(), D("div", {
			key: t.id,
			class: I(k(e).task_chip)
		}, [
			N("span", {
				class: I(k(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, Gr),
			N("span", { class: I(k(e).task_chip_label) }, F(s(t.label_code)), 3),
			t.progress === null ? j("", !0) : (E(), D("span", Kr, F(k(i)(t.progress, "percent")), 1))
		], 2))), 128))], 2)) : j("", !0)], 2)) : j("", !0);
	}
}), Jr = ["aria-label", "aria-pressed"], Yr = ["aria-label", "title"], Xr = /* @__PURE__ */ L({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean },
		inspectorAvailable: { type: Boolean }
	},
	emits: ["set-inspector-collapsed", "close"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = je(), o = P(() => Ve(a, r.route)), s = P(() => r.inspectorCollapsed ? ur : lr), c = P(() => r.inspectorCollapsed ? a("nav.inspector_expand") : a("nav.inspector_collapse"));
		function l() {
			i("set-inspector-collapsed", !r.inspectorCollapsed);
		}
		return (n, r) => (E(), D("header", {
			class: I(k(e).top_bar),
			"data-window-drag-handle": ""
		}, [N("div", { class: I(k(e).top_bar_start) }, [
			N("span", { class: I(k(e).top_bar_brand) }, F(k(a)("app.name")), 3),
			N("span", {
				class: I(k(e).top_bar_divider),
				"aria-hidden": "true"
			}, "/", 2),
			N("span", { class: I(k(e).top_bar_title) }, F(o.value), 3)
		], 2), N("div", { class: I(k(e).top_bar_end) }, [t.inspectorAvailable ? (E(), D("button", {
			key: 0,
			type: "button",
			class: I(["tc-interactive", k(e).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": c.value,
			"aria-pressed": !t.inspectorCollapsed,
			onClick: l
		}, [Fe(Re, {
			icon: s.value,
			size: 18
		}, null, 8, ["icon"])], 10, Jr)) : j("", !0), N("button", {
			type: "button",
			class: I(["tc-interactive", [k(e).icon_button, k(e).close_button]]),
			"data-testid": "studio-close",
			"aria-label": k(a)("common.close"),
			title: k(a)("common.close"),
			onClick: r[0] ||= (e) => i("close")
		}, [Fe(Re, {
			icon: k(He),
			size: 18
		}, null, 8, ["icon"])], 10, Yr)], 2)], 2));
	}
}), Zr = ["data-viewport", "data-inspector-collapsed"], Qr = ["aria-label"], $r = /* @__PURE__ */ L({
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
		let r = O(() => import("./chunks/ContextInspector-CjXtAYIf.js")), i = O(() => import("./chunks/DesktopIconRail-Dgh3ByvL.js")), a = O(() => import("./chunks/InspectorSheet-CFMo3cq-.js")), o = O(() => import("./chunks/MobileBottomNav-BUyAs2d3.js")), s = t, c = n, { t: l } = je(), u = wr(s.viewport), d = /* @__PURE__ */ new Set(["vocabulary"]), f = P(() => [...s.state.loading].some((e) => !d.has(e))), p = P(() => s.state.failures.size > 0), m = P(() => ({ "--tc-inspector-width": `${String(s.state.inspector.width)}px` })), h = A(!1), g = P(() => s.state.route === "gallery" || s.state.settings_section === "library"), _ = P(() => !g.value || s.state.inspector.collapsed), v = P(() => u.value === "mobile" ? !h.value : _.value);
		function y(e) {
			u.value === "mobile" && (h.value = !e), c("set-inspector-collapsed", e);
		}
		function b(e) {
			c("select-route", e);
		}
		return (t, n) => (E(), D("div", {
			class: I(k(e).shell),
			"data-viewport": k(u),
			"data-inspector-collapsed": k(u) === "desktop" ? _.value : null,
			style: Oe(m.value)
		}, [
			Fe(Xr, {
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
			k(u) === "desktop" ? (E(), M(k(i), {
				key: 0,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : j("", !0),
			N("main", {
				class: I(k(e).workspace),
				"data-testid": "workspace"
			}, [p.value ? (E(), D("div", {
				key: 0,
				class: I(k(e).partial_banner),
				"data-testid": "partial-banner"
			}, [N("div", null, [N("p", null, F(k(l)("app.partial_init.banner_title")), 1), N("p", null, F(k(l)("app.partial_init.banner_description")), 1)]), N("button", {
				type: "button",
				class: I(["tc-interactive", k(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: n[1] ||= (e) => s.controller.set_settings_section("diagnostics")
			}, F(k(l)("settings.nav.diagnostics")), 3)], 2)) : j("", !0), f.value ? (E(), D("div", {
				key: 1,
				class: I(k(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": k(l)("status.loading")
			}, [
				N("div", {
					class: I(k(e).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				N("div", {
					class: I(k(e).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				N("div", {
					class: I(k(e).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, Qr)) : (E(), M(Ur, {
				key: 2,
				state: s.state,
				controller: s.controller
			}, null, 8, ["state", "controller"]))], 2),
			k(u) === "desktop" && g.value && !s.state.inspector.collapsed ? (E(), M(k(r), {
				key: 1,
				width: s.state.inspector.width,
				selection: s.state.inspector.selected_record,
				onResize: n[2] ||= (e) => c("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : j("", !0),
			Fe(qr, { tasks: s.state.tasks }, null, 8, ["tasks"]),
			k(u) === "mobile" ? (E(), M(k(o), {
				key: 2,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : j("", !0),
			k(u) === "mobile" && g.value ? (E(), M(k(a), {
				key: 3,
				open: h.value,
				selection: s.state.inspector.selected_record,
				"onUpdate:open": n[3] ||= (e) => y(!e)
			}, null, 8, ["open", "selection"])) : j("", !0)
		], 14, Zr));
	}
}), ei = ["href"], ti = /* @__PURE__ */ L({
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
		let n = t, r = O(() => import("./chunks/ChatLayer-Cv4TeQw9.js")), { t: i } = je();
		function a() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let o = n.hostElement, s = a();
		o.dataset.colorMode = s;
		let c = P(() => n.probe.ready ? void 0 : n.probe.current_version), l = P(() => `${i("app.name")} ${i("app.version_label", { version: n.version })}`), u = n.status.state === "ready" ? sr({
			capabilities: n.capabilities ?? Kn(),
			initial_color_mode: s
		}) : null;
		u && Te(() => u.state.value.color_mode, (e) => {
			o.dataset.colorMode = e;
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
		function m() {
			window.location.reload();
		}
		let h = A(!1), g = P(() => h.value), _ = jr(() => i("app.name"), y);
		Ir({
			name: () => i("app.name"),
			description: () => i("app.entry_description"),
			open: () => i("app.open_action")
		}, y);
		let v = P(() => !_.value || u?.state.value.settings.settings?.ui.optional_entry_enabled === !0);
		Te(g, (e) => {
			o.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function y() {
			h.value = !0;
		}
		function b() {
			h.value = !1;
		}
		return (n, a) => (E(), M(Hr, { "portal-target": t.portalTarget }, {
			default: Ee(() => [t.status.state === "blocked" ? (E(), D("div", {
				key: 0,
				class: I(k(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				N("p", { class: I(k(e).state_screen_eyebrow) }, F(l.value), 3),
				N("h1", { class: I(k(e).state_screen_title) }, F(k(i)("app.unsupported_host.title")), 3),
				N("p", { class: I(k(e).state_screen_description) }, F(k(i)("app.unsupported_host.description", {
					required_version: k(An),
					current_version: c.value ?? k(i)("status.unknown")
				})), 3),
				N("a", {
					class: I(["tc-interactive", k(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, F(k(i)("app.unsupported_host.update_action")), 11, ei)
			], 2)) : t.status.state === "failed" ? (E(), D("div", {
				key: 1,
				class: I(k(e).state_screen),
				"data-startup-state": "failed"
			}, [
				N("p", { class: I(k(e).state_screen_eyebrow) }, F(l.value), 3),
				N("h1", { class: I(k(e).state_screen_title) }, F(k(i)("app.fatal_error.title")), 3),
				N("p", { class: I(k(e).state_screen_description) }, F(k(i)("app.fatal_error.description")), 3),
				N("button", {
					type: "button",
					class: I(["tc-interactive", k(e).state_screen_action]),
					onClick: m
				}, F(k(i)("app.fatal_error.reload_action")), 3)
			], 2)) : k(u) ? (E(), D(Pe, { key: 2 }, [
				g.value ? (E(), M(Vr, {
					key: 0,
					label: k(i)("app.name")
				}, {
					default: Ee(() => [Fe($r, {
						state: k(u).state.value,
						controller: k(u).controller,
						onSelectRoute: d,
						onSetInspectorCollapsed: f,
						onResizeInspector: p,
						onClose: b
					}, null, 8, ["state", "controller"])]),
					_: 1
				}, 8, ["label"])) : j("", !0),
				Fe(kr, {
					enabled: v.value && !g.value,
					"open-label": k(i)("app.name"),
					onOpen: y
				}, null, 8, ["enabled", "open-label"]),
				t.host && t.illustrations && t.capabilities ? (E(), M(k(r), {
					key: 1,
					host: t.host,
					service: t.illustrations,
					gallery: t.capabilities.gallery,
					novelai: t.capabilities.novelai,
					translator: t.translator ?? null
				}, null, 8, [
					"host",
					"service",
					"gallery",
					"novelai",
					"translator"
				])) : j("", !0)
			], 64)) : j("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
}), ni = "._slot_cjg26_3{max-width:min(100%,512px);color:var(--SmartThemeBodyColor,inherit);font-size:calc(var(--mainFontSize,1rem) * .9);margin:.5em 0}._frame_cjg26_10{border:1px solid var(--SmartThemeBorderColor,#80808066);background:var(--SmartThemeBlurTintColor,#00000026);border-radius:10px;position:relative;overflow:hidden}._image_cjg26_18{cursor:zoom-in;width:100%;height:auto;display:block}._placeholder_cjg26_25{text-align:center;opacity:.85;flex-direction:column;justify-content:center;align-items:center;gap:.5em;min-height:96px;padding:1em;display:flex}._error_cjg26_37{color:var(--SmartThemeQuoteColor,#e06c75)}._toolbar_cjg26_41{flex-wrap:wrap;align-items:center;gap:.25em;margin-top:.35em;display:flex}._counter_cjg26_49{font-variant-numeric:tabular-nums;opacity:.75;margin-inline-end:auto}._button_cjg26_55{border:1px solid var(--SmartThemeBorderColor,#80808066);color:inherit;font:inherit;cursor:pointer;background:0 0;border-radius:6px;align-items:center;gap:.35em;padding:.2em .6em;display:inline-flex}._button_cjg26_55:hover:not(:disabled){background:var(--SmartThemeBlurTintColor,#80808026)}._button_cjg26_55:disabled{cursor:default;opacity:.5}._skeleton_cjg26_77{opacity:.2;background:currentColor;border-radius:4px;width:60%;height:.8em;animation:1.4s ease-in-out infinite _pulse_cjg26_1}._notice_cjg26_86{border-inline-start:3px solid var(--SmartThemeQuoteColor,#e06c75);background:var(--SmartThemeBlurTintColor,#0000001a);font-size:calc(var(--mainFontSize,1rem) * .85);margin:.5em 0;padding:.5em .75em}._excerpt_cjg26_94{white-space:pre-wrap;opacity:.8;max-height:8em;margin:.35em 0 0;font-family:monospace;overflow:auto}@keyframes _pulse_cjg26_1{50%{opacity:.45}}@media (prefers-reduced-motion:reduce){._skeleton_cjg26_77{animation:none}}._lightbox_cjg26_115{z-index:9999;cursor:zoom-out;background:#000c;justify-content:center;align-items:center;padding:2vmin;display:flex;position:fixed;inset:0}._lightbox_cjg26_115 img{object-fit:contain;max-width:100%;max-height:100%}._notice_actions_cjg26_133{gap:.35em;margin-top:.35em;display:flex}", ri = "tavern-canvas-chat-style";
function ii(e) {
	e.getElementById(ri)?.remove();
	let t = e.createElement("style");
	return t.id = ri, t.textContent = ni, e.head.append(t), () => {
		t.remove();
	};
}
//#endregion
//#region src/ui/create_shadow_root.ts
function ai(e, t) {
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
var oi = ["image_records", "image_blobs"], si = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, ci = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, li = class extends Ze {
	constructor(e) {
		super(e, "image_records", Qe);
	}
};
async function ui(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function di(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function fi(e, n, i, a) {
	let o = $e(i);
	if (o === void 0 || o !== a) throw new ci(a);
	let s = Ye.parse(t(r(i))), c = await n.get(s, e);
	if (c === null) {
		let t = await di(e, s) + 1, r = {
			sha256: s,
			ref_count: t,
			byte_length: i.byteLength,
			blob: new Blob([new Uint8Array(i)], { type: o })
		};
		return await n.create(r, e), {
			sha256: s,
			byte_length: r.byte_length,
			media_type: o,
			ref_count: t
		};
	}
	let l = {
		...c,
		ref_count: c.ref_count + 1
	};
	return await n.put(l, e), {
		sha256: s,
		byte_length: c.byte_length,
		media_type: o,
		ref_count: l.ref_count
	};
}
async function pi(e, t, n) {
	let r = Ye.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function mi(e, n, i) {
	let a = Ye.parse(i), o = await n.get(a, e);
	if (o === null) return null;
	let s = await ui(o.blob);
	if (t(r(s)) !== a) throw new si(a);
	return s;
}
async function hi(e, t, n, r, i) {
	let a = await fi(e, n, i.bytes, i.claimed_media_type), o = {
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
async function gi(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new Xe("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await pi(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function _i(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = it.safeParse(n);
		if (!r.success || !nt(r.data)) continue;
		let i = r.data;
		i.quarantined || await t.update(i.namespace, {
			...i,
			quarantined: !0
		}, e);
	}
}
async function vi(e, t, n) {
	let r = new li(e), i = new at(e);
	return ot(e, oi, (e) => hi(e, r, i, t, n));
}
async function yi(e, t, n) {
	let r = new li(e), i = new at(e);
	return ot(e, oi, (e) => gi(e, r, i, t, n));
}
async function bi(e, t) {
	let n = new li(e), r = new at(e), i = await ot(e, oi, async (e) => {
		try {
			return { bytes: await mi(e, r, t) };
		} catch (t) {
			if (!(t instanceof si)) throw t;
			return await _i(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
//#region src/modules/illustration/slot_markers.ts
var xi = "[A-Za-z0-9_-]{8,32}", Si = RegExp(`<!--tc-image:(${xi})-->`, "gu");
function Ci(e) {
	return `<!--tc-image:${e}-->`;
}
var wi = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${xi})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${xi}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function Ti(e) {
	return [...e.matchAll(Si)].map((e) => e[1] ?? "");
}
function Ei(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || Ti(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function Di(e, t) {
	let n = Ei(e), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = n[e.paragraph];
		if (t === void 0) throw RangeError(`Paragraph ${String(e.paragraph)} does not exist`);
		let i = r.get(t.line) ?? [];
		i.push(Ci(e.slot_id)), r.set(t.line, i);
	}
	return e.split("\n").flatMap((e, t) => [e, ...r.get(t) ?? []]).join("\n");
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function Oi(e, t) {
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
function ki(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = Oi(n, e);
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
function Ai(e, t) {
	return Oi(t, e).text;
}
//#endregion
//#region src/modules/prompt/tag_normalizer.ts
var ji = /\$([^$]+)\$/g, Mi = /^[([{<]+/, Ni = /[)\]}>]+$/, Pi = /^[\d.]+::/, Fi = /::$/, Ii = /:(?:\d*\.\d+|\d+)$/;
function Li(e) {
	let t = e.toLowerCase(), n;
	do
		n = t, t = t.replace(Mi, ""), t = t.replace(Ni, ""), t = t.replace(Pi, ""), t = t.replace(Fi, ""), t = t.replace(Ii, ""), t = t.trim();
	while (t !== n);
	return t;
}
function Ri(e) {
	return e.toLowerCase() !== Li(e);
}
function zi(e) {
	return e.map((e) => e?.trim() ?? "").filter((e) => e.length > 0).join(", ");
}
function Bi(e) {
	if (!e) return "";
	let t = [], n = e.replace(ji, (e) => (t.push(e), `__ST_JSON_TAG_${String(t.length - 1)}__`)).split(",").map((e) => e.trim()).filter((e) => e.length > 0);
	if (n.length === 0) return "";
	let r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let n = e.replace(/__ST_JSON_TAG_(\d+)__/g, (e, n) => t[Number(n)] ?? ""), i = Li(n), a = r.get(i);
		if (a === void 0) {
			r.set(i, n);
			continue;
		}
		!Ri(a) && Ri(n) && r.set(i, n);
	}
	return Array.from(r.values()).join(", ");
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
function Vi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(Li(t), e.replacement);
	return zi(e.split(",").map((e) => n.get(Li(e)) ?? e));
}
function Hi(e) {
	let t = e.characters.flatMap((t) => {
		let n = e.appearances.find((e) => e.name.trim().toLowerCase() === t.trim().toLowerCase());
		return n === void 0 ? [] : [n.appearance];
	}), n = e.preset, r = zi([
		n?.fixed_positive_prompt,
		...t,
		e.scene_tags
	]), i = n === null ? r : Vi(r, n.replacement_rules);
	return {
		positive_prompt: Bi(n === null ? i : ki(i, n.regex_rules).text),
		negative_prompt: Bi(n?.fixed_negative_prompt ?? "")
	};
}
//#endregion
//#region src/modules/illustration/illustration_service.ts
var Ui = class extends Error {
	constructor(e) {
		super(`Message ${String(e)} changed while it was being analyzed`), this.name = "MessageChangedError";
	}
}, Wi = /* @__PURE__ */ new Set([
	"normal",
	"swipe",
	"regenerate",
	"continue"
]);
async function Gi(e, t) {
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
function Ki(e) {
	return (e instanceof Error ? e.message : String(e)).slice(0, 500);
}
var qi = class {
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
			this.#d(e);
		}), this.#e.jobs.subscribe((e) => {
			this.#u(e);
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
		let t = Gt.safeParse(this.#e.host.read_swipe_record(e));
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
		this.#r.add(a), this.#f({
			type: "analysis_started",
			location: r
		});
		try {
			let e = await this.#o(r, n.swipes[r.swipe_id]?.content ?? "");
			return this.#f({
				type: "slots_changed",
				location: r
			}), e;
		} catch (e) {
			throw this.#f({
				type: "analysis_failed",
				location: r,
				message: Ki(e),
				excerpt: e instanceof Ge ? e.excerpt : null
			}), e;
		} finally {
			this.#r.delete(a);
		}
	}
	async #o(e, t) {
		let n = Ei(t), r = this.#e.settings(), i = {
			schema_version: 2,
			slots: []
		};
		if (n.length > 0) {
			let e = await this.#e.host.generate_with_preset({
				generation_id: this.#e.new_generation_id(),
				preset_name: r.preset_name,
				user_input: Ke(n, r.max_images_per_message),
				max_chat_history: r.max_chat_history,
				connection: await Gi(r.connection, this.#e.resolve_analysis_key),
				json_schema: qe
			}), t = We(e.content, n.length, r.max_images_per_message), a = await this.#e.prompt_context();
			i.slots.push(...t.map((e) => {
				let t = Hi({
					preset: a.preset,
					characters: e.characters,
					appearances: a.appearances,
					scene_tags: e.tags
				});
				return {
					slot_id: this.#e.new_slot_id(),
					paragraph: e.paragraph,
					anchor: (n[e.paragraph]?.text ?? "").slice(0, 400),
					scene: e.scene,
					characters: [...e.characters],
					positive_prompt: t.positive_prompt,
					negative_prompt: t.negative_prompt,
					image_ids: [],
					active_image_id: null,
					pending_request_ids: [],
					last_error: null
				};
			}));
		}
		if (await this.#e.host.write_swipe_record(e, i), i.slots.length > 0) {
			let n = Di(t, i.slots.map((e) => ({
				paragraph: e.paragraph,
				slot_id: e.slot_id
			})));
			if (!await this.#e.host.replace_message_text(e.message_id, t, n)) throw await this.#e.host.write_swipe_record(e, null), new Ui(e.message_id);
		}
		return i;
	}
	preview_request(e, t, n) {
		let r = this.#c(e, t);
		return this.#e.build_request(n ?? r);
	}
	async generate(e, t, n) {
		let r = this.#c(e, t), i = n?.positive_prompt ?? r.positive_prompt, a = n?.negative_prompt ?? r.negative_prompt;
		await this.#s(e, t, () => this.#e.build_request({
			positive_prompt: i,
			negative_prompt: a
		}), (e) => ({
			...e,
			positive_prompt: i,
			negative_prompt: a
		}));
	}
	can_edit() {
		return this.#e.edits_available();
	}
	preview_edit(e) {
		return this.#e.build_edit_request(e);
	}
	async edit(e, t, n) {
		this.#c(e, t), await this.#s(e, t, () => this.#e.build_edit_request(n));
	}
	async #s(e, t, n, r = (e) => e) {
		let i;
		try {
			i = await this.#e.submit(await n());
		} catch (n) {
			throw await this.#l(e, t, (e) => ({
				...e,
				last_error: Ki(n)
			})), n;
		}
		this.#t.set(i, {
			location: e,
			slot_id: t
		}), await this.#l(e, t, (e) => ({
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
		return this.#l(e, t, (e) => {
			let r = e.image_ids.find((e) => e === n);
			if (r === void 0) throw Error(`Image ${n} does not belong to slot ${t}`);
			return {
				...e,
				active_image_id: r
			};
		});
	}
	#c(e, t) {
		let n = this.read(e)?.slots.find((e) => e.slot_id === t);
		if (n === void 0) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		return n;
	}
	async #l(e, t, n) {
		let r = this.read(e);
		if (r === null || !r.slots.some((e) => e.slot_id === t)) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		await this.#e.host.write_swipe_record(e, {
			...r,
			slots: r.slots.map((e) => e.slot_id === t ? n(e) : e)
		}), this.#f({
			type: "slots_changed",
			location: e
		});
	}
	async #u(e) {
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
			await this.#l(t.location, t.slot_id, (t) => n ? {
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
	#d(e) {
		if (e.phase === "started") {
			this.#i = e.dry_run ? null : e.generation_type;
			return;
		}
		if (e.phase === "stopped") {
			this.#i = null;
			return;
		}
		let t = this.#i;
		this.#i = null, !(t === null || !Wi.has(t) || !this.#e.auto_generation_enabled()) && this.analyze(e.message_id).then(async (t) => {
			t.slots.length > 0 && await this.generate_missing(await this.active_location(e.message_id));
		}).catch(() => {});
	}
	#f(e) {
		for (let t of this.#n) t(e);
	}
}, Ji = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
function Yi() {
	return [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))].map((e) => Ji[e % 64] ?? "_").join("");
}
async function Xi(e, t, n) {
	let [r, i] = await Promise.all([n === null ? null : e.load_draft(n), t.load()]);
	return {
		preset: r,
		appearances: i.character.flatMap((e) => {
			let t = e.payload.appearance;
			return typeof t == "string" && t.trim().length > 0 ? [{
				name: e.display_name,
				appearance: t
			}] : [];
		})
	};
}
var Zi = class {
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
			await this.#t.sync_regex_scripts(wi), this.#n = null;
		} catch (e) {
			this.#n = e instanceof Error ? e.message : String(e);
		}
		this.#e.start();
	}
	stop() {
		return this.#e.stop(), Promise.resolve();
	}
}, Qi = /[぀-ヿ㐀-鿿豈-﫿]/u, $i = /[,，、]/u;
function ea(e) {
	return e.split($i).map((e) => e.trim()).filter((e) => e.length > 0);
}
function ta(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function na(e) {
	let t = e.trim().replace(/^-?[\d.]+::/u, "").replace(/::$/u, ""), n = /^\((.+):[\d.]+\)$/u.exec(t);
	for (n?.[1] !== void 0 && (t = n[1]); /^[{[].*[}\]]$/u.test(t);) t = t.slice(1, -1);
	return t.trim().toLowerCase();
}
function ra(e) {
	return e.trim().replace(/[.。]+$/u, "").toLowerCase();
}
async function ia(e, t) {
	let n = ea(e);
	return (await Promise.all(n.map(async (e) => {
		if (!Qi.test(e)) return e;
		let n = t.glossary.find((t) => ta(t.source, e));
		return n === void 0 ? await t.find_tag(e) ?? ra(await t.deepl(e, "EN-US")) : n.target;
	}))).join(", ");
}
async function aa(e, t) {
	let n = ea(e);
	return (await Promise.all(n.map(async (e) => {
		if (Qi.test(e)) return e;
		let n = na(e), r = t.glossary.find((e) => ta(e.target, n));
		return r === void 0 ? await t.find_translation(n) ?? (await t.deepl(n, "ZH")).trim() : r.source;
	}))).join("，");
}
//#endregion
//#region src/modules/translation/prompt_translator.ts
function oa(e) {
	async function t(t) {
		try {
			return (await e.vocabulary.search(t)).results;
		} catch {
			return [];
		}
	}
	function n() {
		let n = e.settings();
		return {
			glossary: n.glossary,
			async find_tag(e) {
				return (await t(e)).find((e) => e.match_kind === "translation")?.display_text.replaceAll("_", " ") ?? null;
			},
			async find_translation(e) {
				return (await t(e)).find((e) => e.match_kind === "exact")?.translation ?? null;
			},
			deepl: (t, r) => e.host.translate_deepl(t, r, n.deepl_endpoint)
		};
	}
	return {
		to_tags: (e) => ia(e, n()),
		read_in_chinese: (e) => aa(e, n())
	};
}
//#endregion
//#region src/storage/sillytavern_settings.ts
var sa = "tavern_canvas", ca = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), la = new Set(Object.keys(w.shape)), ua = new Set(Object.keys(ae.shape)), da = new Set(Object.keys(de.shape)), fa = {
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
		prompt_preset_id: null
	},
	translation: {
		deepl_endpoint: "free",
		glossary: []
	},
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
function pa(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ma() {
	return structuredClone(fa);
}
function ha(e) {
	return JSON.stringify(e);
}
function ga(e) {
	try {
		let t = ha(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function _a(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = ca.has(i) ? "disallowed_category" : "unknown_field";
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
function va(e, t, n) {
	if (!pa(e)) return e !== void 0 && n.push({
		path: t,
		code: "invalid_value"
	}), {};
	let { keyType: r, valueType: i } = ae.shape.http_acknowledgments, a = {};
	for (let [o, s] of Object.entries(e)) {
		let e = r.safeParse(o), c = i.safeParse(s);
		e.success && c.success ? a[e.data] = c.data : n.push({
			path: `${t}.${o}`,
			code: "invalid_value"
		});
	}
	return a;
}
function ya(e, t) {
	let n = fa.gateway;
	return pa(e) ? (_a(e, ua, "gateway", t), {
		endpoint: U(ae.shape.endpoint, e.endpoint, n.endpoint, "gateway.endpoint", t),
		token_secret_id: U(ae.shape.token_secret_id, e.token_secret_id, n.token_secret_id, "gateway.token_secret_id", t),
		http_acknowledgments: va(e.http_acknowledgments, "gateway.http_acknowledgments", t)
	}) : (e !== void 0 && t.push({
		path: "gateway",
		code: "invalid_value"
	}), { ...n });
}
function ba(e, t) {
	let n = fa.ui;
	return pa(e) ? (_a(e, da, "ui", t), {
		color_mode: U(de.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: U(de.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: U(de.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: U(de.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function xa(e, t) {
	if (e === void 0) return ma();
	let n = ga(e);
	if (n === null || n > 65536) return t.push({
		path: sa,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), ma();
	if (!pa(e)) return t.push({
		path: sa,
		code: "invalid_value"
	}), ma();
	_a(e, la, "", t);
	let r = fa;
	return {
		schema_version: U(w.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: U(w.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: U(w.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: U(le, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: U(w.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: U(w.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: U(w.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		vocabulary_update_channel: U(w.shape.vocabulary_update_channel, e.vocabulary_update_channel, r.vocabulary_update_channel, "vocabulary_update_channel", t),
		illustration: e.illustration === void 0 ? structuredClone(r.illustration) : U(w.shape.illustration, e.illustration, structuredClone(r.illustration), "illustration", t),
		translation: e.translation === void 0 ? structuredClone(r.translation) : U(w.shape.translation, e.translation, structuredClone(r.translation), "translation", t),
		gateway: ya(e.gateway, t),
		ui: ba(e.ui, t)
	};
}
function Sa(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = xa(t[sa], i);
	t[sa] = a;
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
		return a = e, t[sa] = a, o = !0, l(), a;
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
			return u(w.parse(t));
		},
		replace_settings(e) {
			return u(w.parse(e));
		},
		flush: c,
		async stop() {
			await c();
		}
	};
}
//#endregion
//#region src/host/sillytavern_secret_resolver.ts
var W = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, Ca = "The host refused to reveal the stored credential. Switch credential storage to This device in Settings > General and enter the key again, or allow key exposure in the host (allowKeysExposure in SillyTavern's config.yaml).", wa = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = an(t);
	}
	async resolve_secret(e) {
		if (!p.safeParse(e).success) throw new W("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: fn(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new W("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new W("not_exposed", Ca) : t.status === 404 ? new W("not_found", "The host vault holds no such credential") : new W("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new W("unavailable", "The host secret vault returned an unreadable response");
		}
		let r;
		if (typeof n == "object" && n && !Array.isArray(n) && e in n && (r = Reflect.get(n, e)), typeof r != "string" || r.trim().length === 0) throw new W("not_found", "The host vault holds no such credential");
		return r;
	}
};
function Ta(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Ea(e, t) {
	return !Ta(e) || typeof t != "function" ? null : new wa(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var Da = class {
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
		if (t === null) throw new W("unsupported_host", `${this.#s()} credential storage cannot reveal credentials`);
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
}, G = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function Oa(e) {
	try {
		if (!Aa(e)) throw K("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !ja(a) || !ja(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw K("Provider operation is invalid");
		if (ft(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw K("Provider operation is invalid");
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
		throw e instanceof G ? e : K("Provider operation is invalid", e);
	}
}
function ka(e) {
	try {
		if (!Aa(e)) throw K("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw K("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(ie);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw K("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof G ? e : K("Remote provider asset operation is invalid", e);
	}
}
function Aa(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function ja(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function K(e, t) {
	return new G("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/browser_fetch.ts
async function Ma(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new pt({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new G("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await Na(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function Na(e, t, n) {
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
			if (a += s.byteLength, a > t) throw new G("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof G ? e : new pt({ cause: e });
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
var Pa = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = Oa(e), n = La(this.#e, t.route), r = await Ra(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await Ia(Ma(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(dt({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = ka(e);
		return Ma(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Fa = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e.secrets, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	async execute(e) {
		let t = Vt(e.provider_kind);
		if (t === null) throw new G("configuration", "This LLM dialect has no direct route catalog entry");
		let n = La(t, e.route), r = await Ra(t, e.credential_reference, this.#e, e.body === void 0 ? { accept: "application/json" } : {
			"content-type": "application/json",
			accept: "application/json"
		}), i = await Ia(Ma(this.#t, n, {
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
async function Ia(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof pt ? new pt() : e;
	}
}
function La(e, t) {
	try {
		return Ht(e, t);
	} catch (e) {
		throw e instanceof zt ? new G("configuration", e.message) : e;
	}
}
async function Ra(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new G("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new G("configuration", za(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function za(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var Ba = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = ie(e.base_url);
		} catch (e) {
			throw new G("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!se(t)) throw new G("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = Oa(e);
		return Ma(this.#t, `${this.#e}${t.route}`, {
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
		let t = ka(e);
		return Ma(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Va = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function Ha(e) {
	if (e.gateway_endpoint !== null) {
		let t = Wa(e.gateway_endpoint);
		if (T(t) && !ce(e.http_acknowledgments, t)) throw new Va("Cleartext Gateway origin has not been acknowledged");
		return {
			kind: "gateway",
			endpoint: t
		};
	}
	if (e.tauri_provider_available) return { kind: "tauri" };
	if (e.sillytavern_available) return { kind: "host_proxy" };
	let t = Ua(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Wa(e.direct_provider_base_url);
		if (!se(t)) throw new Va("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new Va("No provider transport is available");
}
function Ua(e) {
	if (e === null || Bt(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Va("This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway");
	if (!e.secrets_readable) throw new Va("This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Wa(e) {
	try {
		return ie(e);
	} catch (e) {
		throw new Va("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capability_resolution.ts
function Ga(e) {
	return {
		status: "available",
		value: e
	};
}
function q(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function J(e) {
	try {
		return Ga(e());
	} catch (e) {
		return q(Ka(e));
	}
}
function Ka(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function qa(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var Ja = "capability_unavailable";
function Y(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: Ja }), t;
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function Ya(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function X(e) {
	return Ya(e.payload);
}
function Z(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function Xa(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function Za(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function Qa(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function $a(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function Q(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => Q(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = Q(i, n));
	return r;
}
var eo = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, to = "No v3 store exists for this asset category yet; character, vibe and workflow assets are stored, the rest are not.", no = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"reference",
	"workflow"
];
function ro(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit":
		case "lora":
		case "reference": return null;
	}
}
function io(e, t) {
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
function ao(e, t) {
	let n = Qa(X(e), "order", 2 ** 53 - 1), r = Qa(X(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function oo(e) {
	let t = new eo();
	function n(t) {
		let n = ro(e.repositories, t);
		if (n === null) throw Y(to);
		return n;
	}
	async function r(t) {
		let n = ro(e.repositories, t);
		return n === null ? [] : [...await n.list(e.namespace())].sort(ao).map((e) => io(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(no.map(async (e) => [e, await r(e)]));
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
				payload: Q({
					...i.payload,
					display_name: i.display_name
				})
			};
			await a.put(o, l);
			let u = io(l, r);
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
					payload: Q({
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
var so = 500, co = class {
	#e = [];
	#t = new eo();
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
		this.#e.push(t), this.#e.length > so && this.#e.shift(), this.#t.emit({
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
function lo(e) {
	return e === null ? {} : {
		schema_version: e.schema_version,
		locale: e.locale,
		global_concurrency: e.global_concurrency,
		auto_generation_enabled: e.auto_generation_enabled,
		gateway_configured: e.gateway.endpoint !== null,
		acknowledged_origin_count: Object.keys(e.gateway.http_acknowledgments).length,
		ui: e.ui
	};
}
function uo(e) {
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
					...lo(e.settings()),
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
	let n = b.parse(e.provider_id);
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
	let t = new eo();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Y(`Gallery record ${t} no longer exists`);
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
		await yi(e.database, e.namespace(), n), t.emit({
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
			let r = await n(t), i = await bi(e.database, r.sha256);
			if (i === null) throw Y(`Gallery record ${t} has no stored bytes; the blob was evicted`);
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
		provider_id: b.parse(e.provider_id),
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
		provider_id: b.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function vo(e) {
	let t = new eo(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: go(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await me({
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
			return go(await fe({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw Y(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
			return r({
				...i,
				request_id: e.new_request_id()
			});
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
	return Kt.parse({
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
		let e = await this.#e.get_active_chat(), t = Tt(Co(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
}, To = 1e6, Eo = class extends Error {
	code = "unknown_llm_connection";
	constructor(e) {
		super(`Unknown LLM connection "${e}"`), this.name = "UnknownLlmConnectionError";
	}
}, Do = class extends Error {
	code = "credential_probe_failed";
	constructor(e) {
		super(`credential_probe_failed: the vault did not confirm "${e}"`), this.name = "LlmCredentialProbeError";
	}
};
function Oo(e) {
	return e === 401 || e === 402 || e === 403 ? "auth_failed" : e === 429 ? "rate_limited" : e === 408 ? "timed_out" : e >= 400 && e < 500 ? "invalid_request" : "provider_unavailable";
}
function ko(e, t, n) {
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
function Ao(e) {
	let t = e.payload ?? {};
	return x.parse({
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
var jo = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(Ao);
	}
	async save(e) {
		let t = re.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		let r = te(this.#e.namespace, e);
		if (!this.#e.secrets.supports("llm_profile_api_key")) throw TypeError("The host secret vault does not accept LLM connection credentials");
		if (await this.#e.secrets.write_secret(r, t), !await this.#e.secrets.probe_secret(r).catch(() => !1)) throw new Do(r);
		let i = {
			...n,
			credential_reference: r,
			updated_at: this.#e.clock()
		};
		return await this.#r(i, n.created_at), i;
	}
	async clear_credential(e) {
		let t = await this.#n(e);
		t.credential_reference !== null && await this.#e.secrets.delete_secret?.(t.credential_reference);
		let n = {
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
				route: Mo(t.provider_kind),
				method: "GET",
				credential_reference: t.credential_reference,
				max_response_bytes: To,
				signal: AbortSignal.timeout(15e3)
			});
			return e.status < 200 || e.status >= 300 ? {
				status: "failed",
				code: Oo(e.status)
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
		if (t === null) throw new Eo(e);
		return Ao(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, ko(e, this.#e.namespace, t)), this.#a({
			type: "connection_upserted",
			connection: e
		});
	}
	async #i(e, t) {
		let n = await this.#e.repository.list(this.#e.namespace);
		for (let r of n) {
			if (r.id === e) continue;
			let n = Ao(r);
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
function Mo(e) {
	return S[e].models_route;
}
//#endregion
//#region src/modules/library/knowledge_service.ts
var No = class extends Error {
	code = "unknown_knowledge_entry";
	constructor(e) {
		super(`Unknown knowledge entry "${e}"`), this.name = "UnknownKnowledgeEntryError";
	}
};
function Po(e, t, n) {
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
function Fo(e) {
	let t = e.payload ?? {};
	return Nt.parse({
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
var Io = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(Fo).sort((e, t) => t.priority - e.priority === 0 ? e.title.localeCompare(t.title) : t.priority - e.priority);
	}
	async save(e) {
		let t = Mt.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new No(e);
		return Fo(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, Po(e, this.#e.namespace, t)), this.#i({
			type: "entry_upserted",
			entry: e
		});
	}
	#i(e) {
		for (let t of this.#t) t(e);
	}
}, Lo = "persona", Ro = class extends Error {
	code = "unknown_persona";
	constructor(e) {
		super(`Unknown persona "${e}"`), this.name = "UnknownPersonaError";
	}
};
function zo(e) {
	let t = e.payload;
	return typeof t == "object" && !!t && !Array.isArray(t) && t.record_kind === Lo;
}
function Bo(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		payload: {
			record_kind: Lo,
			display_name: e.display_name,
			role: e.role,
			description: e.description,
			greeting: e.greeting,
			avatar_image_id: e.avatar_image_id,
			is_active: e.is_active
		}
	};
}
function Vo(e) {
	let t = e.payload ?? {};
	return kt.parse({
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
var Ho = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).filter(zo).map(Vo);
	}
	async save(e) {
		let t = Ot.parse(e), n = await this.#r(t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new Ro(e);
		return t;
	}
	async #r(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		return t === null || !zo(t) ? null : Vo(t);
	}
	async #i(e, t) {
		await this.#e.repository.put(this.#e.namespace, Bo(e, this.#e.namespace, t)), this.#o({
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
function Uo(e) {
	let t = new jo(e);
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
function Wo(e) {
	let t = new Ho(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		remove: (e) => t.remove(e)
	};
}
function Go(e) {
	let t = new Io(e);
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
//#region src/bootstrap/capabilities/profiles_capability.ts
var Ko = "vault_key", qo = "novelai_defaults", Jo = "provider_profile", Yo = 2e7;
function Xo(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function Zo(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: Yo,
		max_input_asset_bytes: Yo,
		...t?.provider_id === e.provider_id ? Ya(X(t)[Jo]) : {},
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
function Qo(e) {
	return {
		...Ya(X(e)[Jo]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function $o(e) {
	let t = X(e), n = Ya(t[Jo]);
	return {
		id: e.id,
		provider_id: b.parse(e.provider_id),
		display_name: Z(t, "display_name", e.id),
		model_id: Xo($a(n, "model_allowlist")),
		workflow_id: Xo($a(n, "workflow_allowlist")),
		is_default: Za(t, "is_default", !1),
		credential_reference: typeof t.vault_key == "string" ? t[Ko] : null,
		updated_at: e.updated_at,
		novelai_defaults: es(e)
	};
}
function es(e) {
	let t = ne.safeParse(X(e)[qo]);
	return t.success ? t.data : null;
}
function ts(e) {
	let t = new eo();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Y(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map($o);
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				...X(i ?? { payload: {} }),
				display_name: n.display_name,
				is_default: n.is_default,
				[Jo]: Q(Zo(n, i))
			};
			i !== null && i.provider_id !== n.provider_id && Reflect.deleteProperty(o, Ko);
			let s = {
				schema_version: 1,
				id: n.id,
				namespace: r,
				record_key: `${r}:${n.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: n.provider_id,
				payload: o
			}, c = (await e.load_adapters())[n.provider_id];
			if (c === void 0) throw Y(`Provider ${n.provider_id} is unavailable`);
			c.validate_profile(Qo(s)), await e.repository.put(r, s);
			let l = $o(s);
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
			if (e.secrets === null) throw Y("The selected credential storage backend is unavailable");
			let a = await n(r), o = ee(a.namespace, r);
			await e.secrets.write_secret(o, i);
			let s = {
				...a,
				updated_at: e.now(),
				payload: Q({
					...X(a),
					[Ko]: o
				})
			};
			await e.repository.put(a.namespace, s);
			let c = $o(s);
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
				payload: Q({
					...X(a),
					[qo]: ne.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = $o(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async clear_credential(r) {
			let i = await n(r), a = { ...X(i) }, o = a[Ko];
			Reflect.deleteProperty(a, Ko), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: Q(a)
			};
			await e.repository.put(i.namespace, s);
			let c = $o(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = b.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(Qo(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof ut ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = X(i)[Ko];
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
function ns(e) {
	let t = X(e);
	return {
		id: e.id,
		display_name: Z(t, "display_name", e.id),
		group: Xa(t, "group"),
		updated_at: e.updated_at
	};
}
function rs(e) {
	return e.flatMap((e) => {
		let t = Ya(e), n = Xa(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: $a(t, "triggers").filter((e) => typeof e == "string"),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function is(e) {
	return e.flatMap((e) => {
		let t = Ya(e), n = Xa(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: Z(t, "pattern", ""),
			flags: Z(t, "flags", ""),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function as(e) {
	let t = new eo();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(ns);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw Y(`Prompt preset ${t} no longer exists`);
			let r = X(n);
			return {
				id: n.id,
				display_name: Z(r, "display_name", n.id),
				group: Xa(r, "group"),
				fixed_positive_prompt: Z(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: Z(r, "fixed_negative_prompt", ""),
				replacement_rules: rs($a(r, "replacement_rules")),
				regex_rules: is($a(r, "regex_rules"))
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
				payload: Q({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = ns(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(Ai(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var os = "The selected credential storage backend is unavailable", ss = "SillyTavern's secret store is unreachable from this page", cs = "deepl";
function ls(e) {
	if (e === null) throw Y("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function us(e) {
	let t = new eo(), n = null;
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
		acknowledge_http_origin(t) {
			let n = e.settings.get_settings();
			return i({ gateway: {
				...n.gateway,
				http_acknowledgments: ue(n.gateway.http_acknowledgments, t, (/* @__PURE__ */ new Date()).toISOString())
			} }), e.settings.flush();
		},
		async set_gateway_token(t) {
			if (t.trim().length === 0) throw TypeError("A Gateway token must not be blank");
			if (e.secrets === null) throw Y(os);
			let n = e.settings.get_settings(), r = C(n.active_namespace);
			return await e.secrets.write_secret(r, t), i({ gateway: {
				...n.gateway,
				token_secret_id: r
			} }), e.settings.flush();
		},
		async set_analysis_key(t) {
			if (t.trim().length === 0) throw TypeError("An API key must not be blank");
			if (e.secrets === null) throw Y(os);
			await e.secrets.write_secret(oe(e.settings.get_settings().active_namespace), t.trim());
		},
		async clear_analysis_key() {
			if (e.secrets?.delete_secret === void 0) throw Y(os);
			await e.secrets.delete_secret(oe(e.settings.get_settings().active_namespace));
		},
		async set_deepl_key(t) {
			if (e.host_secrets === null) throw Y(ss);
			await e.host_secrets.write_secret(cs, t.trim());
		},
		async clear_deepl_key() {
			if (e.host_secrets?.delete_secret === void 0) throw Y(ss);
			await e.host_secrets.delete_secret(cs);
		},
		async clear_gateway_token() {
			let t = e.settings.get_settings(), n = t.gateway.token_secret_id;
			return n !== null && await e.secrets?.delete_secret?.(n), i({ gateway: {
				...t.gateway,
				token_secret_id: null
			} }), e.settings.flush();
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Y(os);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Y(os);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Y(os);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Y(os);
			return e.browser_secret_vault.reset();
		},
		set_vocabulary_update_channel(t) {
			return i({ vocabulary_update_channel: t }), e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new mt("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-C2MVw-Sm.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-OdNFCxLk.js");
			return t({
				database: ls(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-OdNFCxLk.js");
			await n({
				database: ls(e.database),
				archive: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function ds(e) {
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
function fs(e) {
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
				let n = ds(e);
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
var ps = "tavern-canvas/illustration-slots", ms = class {
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
function hs(e) {
	let t = e?.__TAURITAVERN__?.api?.chatSurface;
	if (typeof t != "object" || !t) return null;
	let n = t;
	return typeof n.isManagedOwnershipRequired == "function" && typeof n.registerParticipant == "function" ? n : null;
}
function gs(e, t) {
	let n = hs(e);
	return n === null || !n.isManagedOwnershipRequired() ? !1 : (n.registerParticipant({
		id: ps,
		protocolVersion: 1,
		didCommitContent: ({ mesid: e, element: n, content: r }) => t.commit({
			mesid: e,
			element: n,
			content: r
		})
	}), t.activate(), !0);
}
var _s = new ms(), vs = class {
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
	replace_message_text(e, t, n) {
		return this.#e.replace_message_text(e, t, n);
	}
	generate_with_preset(e) {
		return this.#e.generate_with_preset(e);
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
function ys(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function bs(e, t, n) {
	let r = ys(e, "TavernHelper"), i = ys(e, "SillyTavern"), a = ys(e, "fetch"), o = xn(r), s = un(i);
	if (!o.message_swipe_metadata || !o.preset_generation || !o.tavern_regex || !s.main_generation_events || !s.message_swipe_metadata || typeof a != "function") return null;
	let c = new mn(() => i.getContext(), a);
	return new vs(t, new kn(r, () => c.get_active_chat_id()), c, n);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function xs(e) {
	return typeof e == "object" && !!e;
}
function Ss(e, t) {
	if (!xs(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var Cs = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = an(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: fn(this.#e.getRequestHeaders()),
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
			headers: fn(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: fn(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return Ss(n, e);
	}
};
function ws(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Ts(e, t) {
	return !ws(e) || typeof t != "function" ? null : new Cs(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
function Es(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Ds(e) {
	let t = Es(e, "SillyTavern"), n = Es(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Os(e) {
	let t = Ds(e), n = Es(t, "extensionSettings"), r = Es(t, "saveSettingsDebounced");
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
function ks(e) {
	return Ts(Ds(e), Es(e, "fetch"));
}
function As(e) {
	return Ea(Ds(e), Es(e, "fetch"));
}
function js(e, t) {
	return bs(e, t, _s.active ? _s : null);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var $ = "IndexedDB could not be opened, so nothing that persists records can be composed", Ms = "No usable SillyTavern + TavernHelper host pair was detected", Ns = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", Ps = "The selected credential storage backend cannot both store and reveal a credential";
function Fs() {
	return navigator.storage.estimate();
}
function Is() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"/workers/vocabulary_worker.js",
		"" + import.meta.url
	), { type: "module" });
}
async function Ls(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-Dz5kwPco.js"), o = {
		novelai: new r(),
		sd_webui: new a(),
		openai_image: new i(),
		google_image: new n()
	};
	if (e !== null) {
		let n = tt(e);
		o.comfyui = new t({ workflow_store: { async load(e) {
			return (await n.comfy_workflows.get("primary", e))?.payload;
		} } });
	}
	return o;
}
function Rs(e, t) {
	let n = new li(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await bi(e, i.sha256);
		if (a === null) throw Error(`Source asset ${r} has no stored bytes`);
		if (i.media_type === "video/mp4") throw Error(`Source asset ${r} is a video and cannot be a provider input`);
		return {
			asset_id: r,
			media_type: i.media_type,
			bytes: a
		};
	} };
}
function zs(e) {
	return rt.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function Bs(e, t) {
	return {
		async put_image(n) {
			return { id: (await vi(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: zs(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new li(e).get(t(), n);
			if (r === null) return null;
			let i = await bi(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
async function Vs(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = Kn(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(qa(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(Y(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = js(t, s), u = [], d = null;
	try {
		d = await (e.open_storage ?? et)();
	} catch {
		d = null;
	}
	let f = Os(t), p = f === null ? null : Sa(f), m = () => p?.get_settings().active_namespace ?? "primary", h = () => (/* @__PURE__ */ new Date()).toISOString(), g = ks(t), _ = As(t), v;
	try {
		v = (e.create_browser_secret_vault ?? lt)(t);
	} catch {
		v = null;
	}
	v !== null && a.push(() => v.close());
	let b = ct(t);
	b !== null && a.push(() => b.close());
	let ee = new Da({
		mode: () => p?.get_settings().credential_storage_mode ?? "host",
		host_destination: g,
		host_resolver: _,
		browser_vault: v,
		device_vault: b
	}), te = ee.has_destination ? ee : null, x = ee.has_resolver ? ee : null, S = d === null ? null : tt(d), ne = new co(), re = null, ie = () => re ??= Ls(d), ae = null, C = async () => {
		if (S === null || p === null) return null;
		let e = p.get_settings().active_provider_profile_id, t = e === null ? null : await S.provider_profiles.get(m(), e).catch(() => null), n = t === null ? null : Gs(t, x !== null);
		return ae = n?.provider_id ?? null, n;
	};
	await C();
	let se = async () => {
		let e = await C();
		if (e === null) throw Error("No provider profile is active; choose one in Settings");
		return e;
	}, w = null, T = S === null || d === null ? null : () => w ??= import("./chunks/novelai_runtime-d2bzGs5j.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: S.novelai_vibe_encodings,
		provider_inputs: S.provider_input_assets,
		namespace: m,
		gallery_assets: Rs(d, m),
		transport: () => Ks(async () => qs((await C())?.direct_cloud ?? null, x, e.provider_fetch)),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), ce = T === null || d === null ? null : { async read(e, t) {
		try {
			return await Rs(d, m).read(e, t);
		} catch {
			return (await T()).assets.read(e, t);
		}
	} }, le = T === null ? null : async (e) => e.provider_id === "novelai" ? (await T()).prepare(e, AbortSignal.timeout(Us)) : e, ue = o("novelai", T === null ? q($) : J(() => So(async () => (await T()).service)), r.novelai), de = o("settings", p === null ? q(Ns) : J(() => us({
		settings: p,
		database: d,
		extension_version: n,
		secrets: te,
		browser_secret_vault: v,
		host_secrets: g
	})), r.settings), fe = o("profiles", S === null ? q($) : J(() => ts({
		repository: S.provider_profiles,
		namespace: m,
		load_adapters: ie,
		secrets: te,
		now: h
	})), r.profiles), me = o("llm_connections", S === null ? q($) : te === null || x === null ? q(Ps) : J(() => Uo({
		repository: S.llm_connections,
		namespace: m(),
		secrets: te,
		transport: new Fa({
			secrets: x,
			...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
		}),
		clock: h
	})), r.llm_connections), ge = o("personas", S === null ? q($) : J(() => Wo({
		repository: S.character_profiles,
		namespace: m(),
		clock: h
	})), r.personas), ve = o("knowledge", S === null ? q($) : J(() => Go({
		repository: S.knowledge_entries,
		namespace: m(),
		clock: h
	})), r.knowledge), ye = o("prompt_presets", S === null ? q($) : J(() => as({
		repository: S.prompt_presets,
		namespace: m,
		now: h,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), be = o("assets", S === null ? q($) : J(() => oo({
		repositories: S,
		namespace: m,
		now: h
	})), r.assets), xe = o("gallery", d === null ? q($) : J(() => mo({
		database: d,
		repository: new li(d),
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
	})), r.gallery), E = null, Se = o("generation", d === null ? q($) : c === null ? q(Ms) : J(() => {
		let t = p?.get_settings().gateway ?? null, n = (e) => Ha({
			gateway_endpoint: t?.endpoint ?? null,
			http_acknowledgments: t?.http_acknowledgments ?? {},
			tauri_provider_available: !1,
			sillytavern_available: !1,
			direct_provider_base_url: e?.base_url ?? null,
			direct_cloud: e?.direct_cloud ?? null
		}), r = t?.endpoint == null ? null : n(null), i = new pe(), o = {
			store: Bs(d, m),
			ids: { next: () => crypto.randomUUID() },
			clock: { now: h },
			resolve_source_message: (e) => {
				let t = E?.source_of(e.request_id) ?? null;
				return t === null ? null : {
					chat_id: t.chat_id,
					message_id: String(t.message_id),
					swipe_id: t.swipe_id
				};
			}
		}, s = new nn({
			executor: r?.kind === "gateway" ? Zs({
				...o,
				endpoint: r.endpoint,
				http_acknowledgments: t?.http_acknowledgments ?? {},
				access_token: Xs(t?.token_secret_id ?? null, x),
				plans: i,
				...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
			}) : new he({
				...o,
				load_adapters: ie,
				profiles: { resolve: async (e) => {
					let t = (await ie())[e], n = await C();
					if (t === void 0 || n?.provider_id !== e) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(Qo(n.record));
				} },
				transport: Ks(async () => Hs(n(await C()), {
					secrets: x,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				})),
				assets: ce ?? Rs(d, m),
				...T === null ? {} : { postprocess: async (e, t) => e.provider_id === "novelai" && e.action === "infill" ? (await T()).finish(e, t, AbortSignal.timeout(Us)) : t },
				log: { write: () => {} },
				plans: i
			}),
			persistence: new _e(d, m()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new qt(),
			global_concurrency: p?.get_settings().global_concurrency ?? 1
		});
		a.push(ne.observe_jobs(s));
		let f = vo({
			queue: s,
			plans: i,
			jobs: tt(d).generation_jobs,
			namespace: m,
			origin: new wo(c, new Ct(globalThis.crypto)),
			new_request_id: () => l.parse(crypto.randomUUID()),
			...le === null ? {} : { prepare_request: le }
		});
		return p !== null && (E = new qi({
			host: c,
			settings: () => p.get_settings().illustration,
			auto_generation_enabled: () => p.get_settings().auto_generation_enabled,
			prompt_context: () => Xi(ye, be, p.get_settings().illustration.prompt_preset_id),
			async build_request({ positive_prompt: e, negative_prompt: t }) {
				let n = await se(), { build_generation_request: r } = await import("./chunks/build_generation_request-CGC_P-3d.js"), i = await r({
					provider_id: n.provider_id,
					positive_prompt: e,
					negative_prompt: t,
					image_count: 1,
					references: [],
					...n.model_id === null ? {} : { model_id: n.model_id }
				}, l.parse(crypto.randomUUID()));
				if (i.provider_id !== "novelai" || i.action !== "generate" || T === null || S === null) return i;
				let a = es(n.record);
				if (a === null) return i;
				let [{ apply_novelai_defaults: o }, { reference_image_bytes: s }, c] = await Promise.all([
					import("./chunks/novelai_profile_defaults-CKb8rSMX.js"),
					import("./chunks/reference_image-DYyYuujP.js").then((e) => e.n),
					T()
				]);
				return o(i, a, {
					store_input: (e) => c.store_input(e),
					async load_vibe(e) {
						let t = await S.novelai_vibes.get(m(), e), n = t === null ? {} : X(t);
						return typeof n.image == "string" ? {
							image_bytes: s(n.image),
							strength: Qa(n, "strength", .6),
							information_extracted: Qa(n, "information_extracted", 1)
						} : null;
					}
				});
			},
			async build_edit_request(e) {
				let t = await C();
				if (t?.provider_id !== "novelai" || T === null) throw Error("Quick edits need an active NovelAI provider profile");
				let { build_novelai_edit_request: n } = await import("./chunks/slot_edits-3VJQNgS6.js"), [{ compute_generation_anchor: r }, { DEFAULT_NOVELAI_MODEL_ID: i }] = await Promise.all([import("./chunks/build_generation_request-CGC_P-3d.js"), import("./chunks/novelai_request_defaults-B4CHIiJ8.js").then((e) => e.r)]), a = l.parse(crypto.randomUUID()), o = {
					request_id: a,
					generation_anchor: y.parse(await r(a)),
					model_id: t.model_id ?? i
				};
				if (e.kind !== "inpaint") return n(e, o);
				let s = await T();
				return n(e, {
					...o,
					mask_asset_id: await s.store_input(e.mask_png)
				});
			},
			edits_available: () => ae === "novelai",
			resolve_analysis_key() {
				if (x === null) throw Error(Ws);
				return x.resolve_secret(oe(p.get_settings().active_namespace));
			},
			async submit(e) {
				let t = await se();
				return n(t), (await f.submit({
					profile_id: t.record.id,
					request: e
				})).request_id;
			},
			jobs: s,
			new_slot_id: Yi,
			new_generation_id: () => crypto.randomUUID()
		}), u.push(new Zi(E, c))), f;
	}), r.generation), Ce = e.create_vocabulary_worker === void 0 ? Is() : e.create_vocabulary_worker, we = o("vocabulary", d === null ? q($) : Ce === null ? q("This host has no Worker constructor, so vocabulary search cannot run") : J(() => fs({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-cB-Fnhkp.js");
			return new e({
				current_extension_version: n,
				open_database_impl: () => Promise.resolve(d)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-CosQgzEr.js");
			return new e({ create_worker: Ce });
		}
	})), r.vocabulary);
	return {
		capabilities: {
			generation: Se,
			profiles: fe,
			prompt_presets: ye,
			assets: be,
			gallery: xe,
			vocabulary: we,
			diagnostics: o("diagnostics", J(() => uo({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: ne,
				resolutions: () => i,
				settings: () => p?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? Fs,
				extension_version: n,
				probe_gateway: null
			})), r.diagnostics),
			settings: de,
			llm_connections: me,
			novelai: ue,
			personas: ge,
			knowledge: ve
		},
		resolutions: i,
		host: c,
		illustrations: E,
		translator: c === null || p === null ? null : oa({
			host: c,
			settings: () => p.get_settings().translation,
			vocabulary: we
		}),
		modules: u,
		async dispose() {
			for (let e of [...a].reverse()) try {
				await e();
			} catch {}
			await p?.stop();
		}
	};
}
function Hs(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = Bt(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new Pa({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new Ba({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
		default: throw Error(`The selected ${e.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`);
	}
}
var Us = 12e4, Ws = "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";
function Gs(e, t) {
	let n = b.safeParse(e.provider_id).data;
	if (n === void 0) return null;
	let r = X(e);
	return {
		record: e,
		provider_id: n,
		model_id: $a(Ya(r.provider_profile), "model_allowlist").find((e) => typeof e == "string") ?? null,
		base_url: Xa(r, "base_url"),
		direct_cloud: {
			provider_id: n,
			credential_reference: Xa(r, Ko),
			secrets_readable: t
		}
	};
}
function Ks(e) {
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
function qs(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new st("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new st("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new st("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return Hs({
		kind: "direct_cloud",
		provider_id: "novelai",
		credential_reference: e.credential_reference
	}, {
		secrets: t,
		...n === void 0 ? {} : { fetch: n }
	});
}
var Js = "A Gateway endpoint is configured but no Gateway access token is stored; set one in Settings > Gateway, or clear the endpoint to generate directly", Ys = "This host cannot reveal stored credentials, so the Gateway access token cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml, or clear the Gateway endpoint to generate directly";
function Xs(e, t) {
	if (e === null) throw Error(Js);
	if (t === null) throw Error(Ys);
	return () => t.resolve_secret(e);
}
function Zs(e) {
	let t = null;
	return { async execute(n, r) {
		let { GatewayJobExecutor: i } = await (t ??= import("./chunks/gateway_job_executor-DFkVc7ub.js"));
		return new i(e).execute(n, r);
	} };
}
//#endregion
//#region src/bootstrap/startup_error.ts
var Qs = "https://github.com/N0VI028/JS-Slash-Runner";
function $s(e) {
	if (e.ready) return {
		state: "ready",
		title: "Inkwell ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${An} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: Qs
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `Inkwell could not verify the installed version. ${t}`,
			update_url: Qs
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: Qs
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: Qs
		};
	}
}
function ec() {
	return {
		state: "failed",
		title: "Inkwell could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function tc(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = Vn(n), i, a, o = null, s = !1;
	try {
		o = await Vs({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new _t([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = $s(r);
	else if (s) i = "failed", a = ec();
	else try {
		await c?.start_all(), i = "ready", a = $s(r);
	} catch {
		i = "failed", a = ec();
	}
	let l = ai(t, e.stylesheet ?? ""), u = Ie(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = ke(ti, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities,
		host: o?.host ? De(o.host) : null,
		illustrations: o?.illustrations ? De(o.illustrations) : null,
		translator: o?.translator ?? null
	}), p = ii(t);
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
function nc(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function rc(e) {
	let t = nc(e, "SillyTavern"), n = nc(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = nc(r, "eventSource"), a = nc(nc(r, "eventTypes"), "APP_READY"), o = nc(i, "on"), s = nc(i, "removeListener");
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
var ic = ":host{--tc-canvas:#edf0f5;--tc-surface:#fff;--tc-surface-raised:#f3f6fa;--tc-text:#141923;--tc-text-muted:#596578;--tc-divider:#ccd4df;--tc-accent:#2f5af5;--tc-accent-hover:#244bd6;--tc-on-accent:#fff;--tc-success:#157b59;--tc-warning:#946100;--tc-error:#c23838;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#080b10;--tc-surface:#10151c;--tc-surface-raised:#181f29;--tc-text:#f5f7fa;--tc-text-muted:#9ca8b8;--tc-divider:#2b3441;--tc-accent:#7898ff;--tc-accent-hover:#8aa6ff;--tc-on-accent:#080b10;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", ac = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", oc = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", sc = "@keyframes _tc-icon-rotate_1r8sc_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_1r8sc_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_1r8sc_42{width:28px;height:28px}._iconButtonMd_1r8sc_47{width:32px;height:32px}._iconButtonLg_1r8sc_52{width:40px;height:40px}._iconButton_1r8sc_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_1r8sc_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_1r8sc_65{color:var(--tc-error)}._iconButtonDestructive_1r8sc_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_1r8sc_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_1r8sc_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_1r8sc_84:disabled{opacity:.5}._appButtonContent_1r8sc_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_1r8sc_107{visibility:hidden}._appButtonLabel_1r8sc_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_1r8sc_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_1r8sc_118 svg{animation:_tc-icon-rotate_1r8sc_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_1r8sc_136{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent)}._appButtonPrimary_1r8sc_136:hover:not(:disabled){background-color:var(--tc-accent-hover);border-color:var(--tc-accent-hover)}._appButtonSecondary_1r8sc_147{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_1r8sc_147:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_1r8sc_156{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_1r8sc_156:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_1r8sc_169{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_1r8sc_178{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_1r8sc_178:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_1r8sc_178[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_1r8sc_199{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_1r8sc_210{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_1r8sc_210[data-disabled]{cursor:not-allowed}._switchLabelGroup_1r8sc_222{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_1r8sc_222{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_1r8sc_234{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_1r8sc_247{background-color:var(--tc-surface-raised);border-color:var(--tc-text-muted);border-radius:999px;flex:none;width:40px;height:24px;position:relative}._switchRoot_1r8sc_247[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_1r8sc_247:disabled{opacity:.5}._switchThumb_1r8sc_266{border:1px solid var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;border-radius:50%;display:block;transform:translate(2px)}._switchThumb_1r8sc_266[data-state=checked]{border-color:var(--tc-accent);transform:translate(18px)}._checkboxRow_1r8sc_293{cursor:pointer;align-items:center;gap:8px;display:inline-flex}._checkboxRow_1r8sc_293[data-disabled]{cursor:not-allowed}._checkboxBox_1r8sc_311{border-radius:var(--tc-radius-status);border-color:var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;color:var(--tc-on-accent);transition:background-color var(--tc-motion-fast) ease-out;flex:none;justify-content:center;align-items:center;display:inline-flex}._checkboxBox_1r8sc_311[data-state=checked],._checkboxBox_1r8sc_311[data-state=indeterminate]{border-color:var(--tc-accent);background-color:var(--tc-accent)}._checkboxBox_1r8sc_311:disabled{opacity:.5}._checkboxIndicator_1r8sc_335{justify-content:center;align-items:center;display:inline-flex}._checkboxLabel_1r8sc_341{color:var(--tc-text);overflow-wrap:anywhere}._numberStepper_1r8sc_355{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-self:start;align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_1r8sc_365{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_1r8sc_365:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_1r8sc_365:disabled{color:var(--tc-text-muted)}._numberStepperInput_1r8sc_383{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_1r8sc_383:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_1r8sc_402{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_1r8sc_402:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_1r8sc_402[data-placeholder]{color:var(--tc-text-muted)}._selectValue_1r8sc_424{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_1r8sc_433{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;width:var(--reka-select-trigger-width);max-width:var(--reka-select-content-available-width);overflow:hidden}._selectViewport_1r8sc_444{padding:4px}._selectItem_1r8sc_448{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding:6px 8px;display:flex}._selectItemText_1r8sc_461{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectItem_1r8sc_448[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_1r8sc_448:focus-visible,._selectItem_1r8sc_448:focus{outline-color:var(--tc-accent)}._selectItem_1r8sc_448[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_1r8sc_483{color:var(--tc-accent);flex-shrink:0;display:inline-flex}._fieldGroup_1r8sc_493{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_1r8sc_499{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_1r8sc_505{color:var(--tc-error)}._fieldGroupHint_1r8sc_509{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_1r8sc_516{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_1r8sc_527{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_1r8sc_534{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_1r8sc_552{gap:16px}._dialogHeader_1r8sc_556{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_1r8sc_563{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_1r8sc_570{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_1r8sc_570:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_1r8sc_583{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_1r8sc_589{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_1r8sc_595{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_1r8sc_605{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_1r8sc_616{fill:var(--tc-text)}._stateSurface_1r8sc_624{flex-direction:column;padding:4px 0;display:flex}._stateSurfaceSkeleton_1r8sc_630{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_1r8sc_637{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_1r8sc_643{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;padding:16px;display:flex}._stateSurfaceMessageGroup_1r8sc_656{flex-direction:column;gap:4px;display:flex}._stateSurfaceMessageTitle_1r8sc_662{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:500}._stateSurfaceMessageText_1r8sc_670{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_1r8sc_677{color:var(--tc-error)}._stateSurfaceAction_1r8sc_681{display:flex}._toastViewport_1r8sc_689{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_1r8sc_703{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_1r8sc_714{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_1r8sc_721{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_1r8sc_727{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_1r8sc_727:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_1r8sc_742{border-color:var(--tc-success)}._toastSuccess_1r8sc_742 ._toastTitle_1r8sc_714{color:var(--tc-success)}._toastError_1r8sc_750{border-color:var(--tc-error)}._toastError_1r8sc_750 ._toastTitle_1r8sc_714{color:var(--tc-error)}._virtualList_1r8sc_762{position:relative;overflow-y:auto}._virtualListSizer_1r8sc_767{width:100%;position:relative}._virtualListItem_1r8sc_772{width:100%;position:absolute;top:0;left:0}", cc = "._body_p8k7z_1{flex-direction:column;gap:16px;max-height:min(70vh,720px);display:flex;overflow-y:auto}._slot_p8k7z_9{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._anchor_p8k7z_19{border-inline-start:2px solid var(--tc-divider);color:var(--tc-text-muted);margin:0;padding-inline-start:10px;font-size:13px}._scene_p8k7z_27{margin:0;font-size:14px}._label_p8k7z_32{color:var(--tc-text-muted);flex-direction:column;gap:4px;font-size:13px;display:flex}._prompt_p8k7z_40{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background:var(--tc-surface);min-height:72px;color:var(--tc-text);font:inherit;resize:vertical;padding:8px;font-size:13px}._meta_p8k7z_52{color:var(--tc-text-muted);flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:13px;display:flex}._error_p8k7z_61{color:var(--tc-error);margin:0}._excerpt_p8k7z_66{border-radius:var(--tc-radius-field);background:var(--tc-surface-raised);white-space:pre-wrap;max-height:160px;margin:0;padding:8px;font-family:monospace;font-size:12px;overflow:auto}._footer_p8k7z_78{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;display:flex}._total_p8k7z_86{color:var(--tc-text-muted);margin-inline-end:auto;font-size:13px}", lc = "._paramsBody_1gvv4_10{flex-direction:column;gap:16px;display:flex}._paramsDimensionRow_1gvv4_16{gap:12px;display:flex}._paramsDimensionRow_1gvv4_16>*{flex:1}._paramsAspectRow_1gvv4_25{align-items:flex-end;gap:12px;display:flex}._paramsAspectField_1gvv4_31{flex:1}._editBody_1gvv4_37{flex-direction:column;gap:16px;display:flex}._editTextareaWrap_1gvv4_43{position:relative}._editHighlightLayer_1gvv4_47{color:#0000;white-space:pre-wrap;word-break:break-word;font:inherit;pointer-events:none;margin:0;padding:8px 10px;position:absolute;inset:0;overflow:hidden}._editHighlightMatch_1gvv4_60{border-radius:var(--tc-radius-status);background-color:color-mix(in srgb, var(--tc-accent) 22%, transparent)}._editTextarea_1gvv4_43{resize:vertical;border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);width:100%;min-height:96px;color:var(--tc-text);font:inherit;background-color:#0000;padding:8px 10px;line-height:1.5;position:relative}._editTextarea_1gvv4_43:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._editTagActions_1gvv4_84{gap:8px;display:flex}._editSubmenu_1gvv4_89{grid-template-columns:repeat(2,1fr);gap:8px;display:grid}._editFooter_1gvv4_95{justify-content:flex-end;gap:8px;display:flex}._inpaintDialogContent_1gvv4_107{width:min(90vw,720px)}._inpaintBody_1gvv4_111{flex-direction:column;gap:12px;width:100%;display:flex}._inpaintCanvasFrame_1gvv4_121{width:100%;aspect-ratio:var(--tc-inpaint-aspect,1);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);touch-action:none;position:relative;overflow:hidden}._inpaintCanvasFrame_1gvv4_121 canvas{width:100%;height:100%;position:absolute;inset:0}._inpaintToolbar_1gvv4_139{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._inpaintToolbarDivider_1gvv4_146{background-color:var(--tc-divider);align-self:stretch;width:1px;margin:0 4px}._inpaintBrushRow_1gvv4_153{align-items:center;gap:12px;display:flex}._inpaintBrushRow_1gvv4_153>*{flex:1}._inpaintPromptGrid_1gvv4_163{grid-template-columns:1fr 1fr;gap:12px;display:grid}._inpaintFooter_1gvv4_169{justify-content:flex-end;gap:8px;display:flex}._inpaintDimensionError_1gvv4_175{color:var(--tc-error);margin:0;font-size:12px}", uc = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", dc = "._window_1rdvc_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid color-mix(in srgb, var(--tc-divider) 78%, var(--tc-text) 22%);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;border-radius:12px;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1rdvc_1;position:fixed;top:0;left:0;overflow:hidden;box-shadow:0 32px 96px #080b104d,0 8px 28px #080b102e}._window_1rdvc_1[data-positioned=false]{visibility:hidden}._window_1rdvc_1[data-dragging=true]{-webkit-user-select:none;user-select:none;box-shadow:0 40px 112px #080b105c,0 12px 36px #080b1038}@keyframes _floating-window-enter_1rdvc_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1rdvc_1{border-radius:10px;width:auto;height:auto;min-height:0;inset:8px;transform:none}._window_1rdvc_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1rdvc_1{animation:none}}", fc = "._shell_1b5w2_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1b5w2_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1b5w2_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1b5w2_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1b5w2_57{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);cursor:move;touch-action:none;grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:16px;display:flex}._top_bar_start_1b5w2_71,._top_bar_end_1b5w2_72{align-items:center;gap:8px;min-width:0;display:flex}._top_bar_brand_1b5w2_79{color:var(--tc-text);flex:none;font-size:13px;font-weight:650}._top_bar_divider_1b5w2_86{color:var(--tc-divider);flex:none}._top_bar_title_1b5w2_91{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-weight:500;overflow:hidden}._icon_button_1b5w2_100{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._shell_1b5w2_8[data-viewport=mobile] ._top_bar_1b5w2_57{cursor:default;touch-action:auto}._icon_button_1b5w2_100._close_button_1b5w2_116:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_1b5w2_100[data-selected=true],._icon_button_1b5w2_100[aria-pressed=true]{color:var(--tc-accent)}._rail_1b5w2_126{background-color:var(--tc-surface);border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:6px;padding:12px 8px;display:flex;overflow:hidden auto}._rail_button_1b5w2_139{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1b5w2_139[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1b5w2_158{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1b5w2_166{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_1b5w2_176{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_1b5w2_185{background-color:var(--tc-surface);border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1b5w2_194{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1b5w2_194:hover,._inspector_resizer_1b5w2_194[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1b5w2_207{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1b5w2_215{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1b5w2_224{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_1b5w2_232{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_1b5w2_232{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_1b5w2_232 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_1b5w2_232 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_1b5w2_258{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1b5w2_267{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1b5w2_267[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1b5w2_283{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._sheet_overlay_1b5w2_291{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1b5w2_298{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1b5w2_312{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1b5w2_324{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1b5w2_333{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1b5w2_41{background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1b5w2_350{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1b5w2_358{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1b5w2_367{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1b5w2_374{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1b5w2_386{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1b5w2_386[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1b5w2_386[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1b5w2_386[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1b5w2_406{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1b5w2_413{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1b5w2_418{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1b5w2_430{width:min(560px,100vw - 40px);max-height:calc(100dvh - 40px);color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid var(--tc-divider);border-radius:12px;flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex;position:fixed;top:20px;right:20px;overflow:auto;box-shadow:0 20px 56px #11131838}._state_screen_eyebrow_1b5w2_449{color:var(--tc-text-muted)}._state_screen_title_1b5w2_453{max-width:56ch}._state_screen_action_1b5w2_457{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1b5w2_467{max-width:56ch;color:var(--tc-text-muted)}", pc = "._assetsView_1fpd5_10{flex-direction:column;gap:16px;height:100%;min-height:0;padding:16px;display:flex}._tabsList_1fpd5_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;gap:4px;padding-bottom:0;display:flex}._tabsTrigger_1fpd5_31{border-radius:var(--tc-radius-field) var(--tc-radius-field) 0 0;color:var(--tc-text-muted);transition:color var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out;background-color:#0000;border:1px solid #0000;border-bottom-width:2px;padding:8px 14px;font-size:13px;font-weight:500}._tabsTrigger_1fpd5_31:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._tabsTrigger_1fpd5_31[data-state=active]{color:var(--tc-accent);border-bottom-color:var(--tc-accent)}._tabsContent_1fpd5_55{flex:1;min-height:0;overflow-y:auto}._tabsContent_1fpd5_55:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._categoryList_1fpd5_70{flex-direction:column;gap:12px;padding:12px 0;display:flex}._categoryToolbar_1fpd5_77{flex-wrap:wrap;align-items:center;gap:12px;display:flex}._searchInput_1fpd5_84{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);min-width:160px;color:var(--tc-text);flex:1;padding:8px 12px;font-size:13px}._searchInput_1fpd5_84:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reorderHint_1fpd5_100{color:var(--tc-text-muted);font-size:12px}._emptyDescription_1fpd5_105{color:var(--tc-text-muted);font-size:13px}._cardGrid_1fpd5_110{flex-direction:column;gap:8px;display:flex}._assetCard_1fpd5_120{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);flex-wrap:wrap;align-items:center;gap:8px;padding:6px 8px;display:flex}._assetCard_1fpd5_120[data-dragging]{border-color:var(--tc-accent)}._dragHandle_1fpd5_135{color:var(--tc-text-muted);cursor:grab;flex:none;padding:4px;display:inline-flex}._assetCardMain_1fpd5_147{border-radius:var(--tc-radius-field);text-align:left;min-width:0;transition:background-color var(--tc-motion-fast) ease-out;background-color:#0000;flex-direction:column;flex:160px;align-items:flex-start;gap:2px;padding:2px 4px;display:flex}._assetCardMain_1fpd5_147:hover{background-color:var(--tc-surface-raised)}._assetCardName_1fpd5_165{color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13px;font-weight:500;overflow:hidden}._assetCardSummary_1fpd5_175{color:var(--tc-text-muted);flex-wrap:wrap;gap:8px;font-size:12px;display:flex}._assetCardSummaryPart_1fpd5_183{white-space:nowrap}._assetCardActions_1fpd5_187{flex:none;align-items:center;gap:8px;margin-left:auto;display:flex}._form_1fpd5_199{flex-direction:column;gap:14px;display:flex}._textInput_1fpd5_205,._textArea_1fpd5_206{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;color:var(--tc-text);padding:8px 10px;font-family:inherit;font-size:13px}._textArea_1fpd5_206{resize:vertical;min-height:72px}._textInput_1fpd5_205:focus-visible,._textArea_1fpd5_206:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._formActions_1fpd5_228{justify-content:flex-end;gap:8px;display:flex}._vocabularyPanel_1fpd5_238{flex-direction:column;gap:20px;display:flex}._vocabularySearchRow_1fpd5_244{gap:8px;display:flex}._searchResultsList_1fpd5_249{flex-direction:column;gap:4px;display:flex}._searchResultRow_1fpd5_255{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 4px;display:flex}._searchResultTag_1fpd5_264{color:var(--tc-text);font-size:13px}._searchResultTranslation_1fpd5_269{color:var(--tc-text-muted);font-size:12px}._loadMoreRow_1fpd5_274{justify-content:center;padding-top:4px;display:flex}._sectionTitle_1fpd5_280{color:var(--tc-text);font-size:13px;font-weight:600}._catalogList_1fpd5_286{flex-direction:column;gap:8px;display:flex}._catalogEntry_1fpd5_292{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 4px;display:flex}._catalogEntryInfo_1fpd5_301{flex-direction:column;gap:2px;min-width:0;display:flex}._catalogEntryName_1fpd5_308{color:var(--tc-text);font-size:13px;font-weight:500}._catalogEntryMeta_1fpd5_314{color:var(--tc-text-muted);font-size:12px}._bundledBadge_1fpd5_319{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);align-items:center;padding:2px 6px;font-size:11px;display:inline-flex}._nsfwSection_1fpd5_329{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:8px 12px}._nsfwToggle_1fpd5_335{color:var(--tc-text-muted);background:0 0;align-items:center;gap:6px;padding:4px 0;font-size:12px;display:flex}._nsfwNotice_1fpd5_345{color:var(--tc-text-muted);padding:8px 0 0;font-size:12px}._installProgress_1fpd5_351{color:var(--tc-text-muted);font-size:12px}._workflowToolbarRow_1fpd5_360{flex-wrap:wrap;gap:8px;display:flex}._placeholderList_1fpd5_366{flex-direction:column;gap:8px;display:flex}._placeholderRow_1fpd5_372{align-items:center;gap:8px;display:flex}._placeholderKey_1fpd5_378{width:40%;color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;flex:none;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:hidden}._hiddenFileInput_1fpd5_389{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}._reference_thumbnail_1fpd5_401{border-radius:var(--tc-radius-image);object-fit:contain;max-width:160px;max-height:160px;margin-bottom:8px;display:block}", mc = "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}", hc = "._galleryView_1wzts_10{flex-direction:column;gap:12px;height:100%;min-height:0;padding:16px;display:flex}._filterBar_1wzts_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:16px;padding-bottom:12px;display:flex}._dateFilterLabel_1wzts_32{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:flex}._dateInput_1wzts_43{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);color:var(--tc-text);padding:6px 8px;font-size:12px}._cacheOccupancy_1wzts_52{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._emptyDescription_1wzts_58{color:var(--tc-text-muted);font-size:13px}._skeletonGrid_1wzts_67{flex-wrap:wrap;gap:8px;display:flex}._skeletonTile_1wzts_73{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);width:176px;height:176px}._gridContainer_1wzts_84{flex:1;min-height:0}._gridRow_1wzts_89{display:flex}._tile_1wzts_93{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);flex:none;position:relative;overflow:hidden}._tile_1wzts_93[data-selected]{outline:2px solid var(--tc-accent);outline-offset:-2px}._tileButton_1wzts_106{width:100%;height:100%;padding:0;display:block}._tileSkeleton_1wzts_113{background-color:var(--tc-surface-raised);position:absolute;inset:0}._tileImage_1wzts_119{object-fit:cover;width:100%;height:100%;transition:opacity var(--tc-motion-normal) ease-out}._tileFallback_1wzts_126{color:var(--tc-text-muted);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:8px;font-size:11px;display:flex;position:absolute;inset:0}._tilePinnedBadge_1wzts_144{border-radius:var(--tc-radius-status);background-color:var(--tc-media-scrim);color:var(--tc-media-ink);justify-content:center;align-items:center;padding:3px;display:inline-flex;position:absolute;top:6px;left:6px}._tileSelectToggle_1wzts_157{border-radius:var(--tc-radius-status);border:1px solid var(--tc-media-ink);background-color:var(--tc-media-scrim);width:20px;height:20px;color:var(--tc-media-ink);transition:background-color var(--tc-motion-fast) ease-out;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:6px;right:6px}._tileSelectToggle_1wzts_157[data-checked]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._bulkActionBar_1wzts_184{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding-top:12px;display:flex}._bulkActionCount_1wzts_193{color:var(--tc-text);font-size:13px}._bulkActionButtons_1wzts_198{align-items:center;gap:8px;display:flex}._previewOverlay_1wzts_208{z-index:var(--tc-z-overlay);background-color:#111318b8;position:fixed;inset:0}._previewContent_1wzts_215{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);display:flex;position:fixed;inset:16px;overflow:hidden}._previewLayout_1wzts_225{width:100%;min-height:0;display:flex}._previewMain_1wzts_231{flex-direction:column;flex:1;min-width:0;display:flex}._previewToolbar_1wzts_238{border-bottom:1px solid var(--tc-divider);align-items:center;gap:4px;padding:8px;display:flex}._previewToolbarButton_1wzts_246{border-radius:var(--tc-radius-field);width:32px;height:32px;color:var(--tc-text);justify-content:center;align-items:center;display:inline-flex}._previewToolbarButton_1wzts_246:hover{background-color:var(--tc-surface-raised)}._previewToolbarSpacer_1wzts_260{flex:1}._previewImageArea_1wzts_264{flex:1;justify-content:center;align-items:center;gap:8px;min-height:0;padding:12px;display:flex;overflow:auto}._previewImageFrame_1wzts_275{flex:1;justify-content:center;align-items:center;height:100%;min-height:0;display:flex;position:relative}._previewImage_1wzts_264{border-radius:var(--tc-radius-image);object-fit:contain;touch-action:auto;max-width:100%;max-height:100%}._previewImageFallback_1wzts_293{color:var(--tc-text-muted);justify-content:center;align-items:center;padding:24px;font-size:13px;display:flex}._previewNavButton_1wzts_302{flex:none}._previewInspector_1wzts_306{border-left:1px solid var(--tc-divider);flex:none;width:320px;max-width:40vw;padding:16px;overflow-y:auto}._metadataInspector_1wzts_319{flex-direction:column;gap:12px;display:flex}._metadataTitle_1wzts_325{color:var(--tc-text);font-size:14px;font-weight:600}._metadataOrphanNotice_1wzts_331{color:var(--tc-warning);font-size:12px}._metadataList_1wzts_336{flex-direction:column;gap:8px;display:flex}._metadataRow_1wzts_342{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding-bottom:6px;font-size:12px;display:flex}._metadataRow_1wzts_342 dt{color:var(--tc-text-muted)}._metadataRow_1wzts_342 dd{color:var(--tc-text);margin:0}._metadataPrompt_1wzts_360{white-space:pre-wrap;overflow-wrap:anywhere}._metadataEmpty_1wzts_365{color:var(--tc-text-muted);font-size:12px}._metadataActions_1wzts_370{flex-wrap:wrap;gap:8px;display:flex}._metadataActionsHint_1wzts_376{color:var(--tc-text-muted);font-size:12px}@media (width<=959px){._previewContent_1wzts_215{border-radius:0;inset:0}._previewLayout_1wzts_225{flex-direction:column;overflow-y:auto}._previewMain_1wzts_231{flex:none}._previewToolbar_1wzts_238{z-index:1;background-color:var(--tc-surface);position:sticky;top:0}._previewImageArea_1wzts_264{min-height:45vh}._previewInspector_1wzts_306{border-left:none;border-top:1px solid var(--tc-divider);width:100%;max-width:100%}}", gc = "._prompt_view_1d2kr_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_1d2kr_14{border-right:1px solid var(--tc-divider)}._editor_column_1d2kr_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_1d2kr_7{grid-template-columns:minmax(0,1fr)}._browser_column_1d2kr_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_1d2kr_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_1d2kr_48{font-weight:600}._icon_text_button_1d2kr_55{color:var(--tc-accent);align-items:center;gap:4px;padding:1px 6px;display:inline-flex}._text_input_1d2kr_63{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_1d2kr_74{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_1d2kr_63:focus-visible,._text_input_narrow_1d2kr_74:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_1d2kr_91{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_1d2kr_91:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_1d2kr_111{flex-direction:column;display:flex}._search_input_1d2kr_116{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_1d2kr_126{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_1d2kr_135{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_1d2kr_145{flex-direction:column;display:flex}._preset_row_1d2kr_150{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_1d2kr_157{background-color:var(--tc-surface-raised)}._preset_name_button_1d2kr_161{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_1d2kr_173{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_1d2kr_173>:first-child{flex:auto}._prompt_builder_1d2kr_187{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._context_preview_1d2kr_195{flex-direction:column;gap:8px;padding:0 16px 12px;display:flex}._context_block_title_1d2kr_202{color:var(--tc-text-muted);margin-bottom:4px;font-size:12px}._context_list_1d2kr_208{margin:0;padding-left:16px}._quality_controls_1d2kr_215{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._switch_list_1d2kr_220{flex-direction:column;gap:4px;padding:0 16px 8px;display:flex}._replacement_rules_1d2kr_229,._regex_rules_1d2kr_230{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_1d2kr_235{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_1d2kr_235>:not(._rule_row_action_1d2kr_244){flex:140px}._rule_row_action_1d2kr_244{flex:none;align-items:center;gap:8px;display:flex}._test_result_1d2kr_257{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_1d2kr_264{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._test_panel_1d2kr_273{flex-direction:column;display:flex}._test_panel_body_1d2kr_281{flex-direction:column;gap:8px;padding:0 16px 16px;display:flex}._tools_disabled_note_1d2kr_288{color:var(--tc-text-muted);margin:0;font-size:12px}", _c = "._view_q4cbg_7{flex-direction:column;gap:32px;width:min(100%,920px);margin:0 auto;padding:24px;display:flex}._onboarding_q4cbg_16{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px;display:grid}._onboarding_icon_q4cbg_25{width:48px;height:48px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._onboarding_label_q4cbg_37{color:var(--tc-accent);margin-bottom:4px;font-size:12px;font-weight:650}._onboarding_title_q4cbg_44{color:var(--tc-text);font-size:22px;font-weight:680;line-height:1.2}._onboarding_description_q4cbg_51{max-width:62ch;color:var(--tc-text-muted);margin-top:8px;line-height:1.55}@media (width<=639px){._view_q4cbg_7{gap:24px;padding:20px 16px}._onboarding_q4cbg_16{grid-template-columns:minmax(0,1fr);padding:20px}}._section_q4cbg_70{flex-direction:column;min-width:0;display:flex}._section_header_q4cbg_79{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;display:flex}._section_title_q4cbg_89{color:var(--tc-text);font-size:14px;font-weight:650}._row_q4cbg_95{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_q4cbg_104{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_q4cbg_112{color:var(--tc-text);flex:none}._profile_row_q4cbg_76{border-top:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_q4cbg_120{flex-direction:column;flex:12rem;gap:2px;min-width:0;display:flex}._profile_name_q4cbg_144{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_q4cbg_151{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_q4cbg_161{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;display:flex}._badge_q4cbg_169{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_q4cbg_178{flex-direction:column;gap:16px;display:flex}._status_text_q4cbg_184{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_q4cbg_184[data-tone=success]{color:var(--tc-success)}._status_text_q4cbg_184[data-tone=warning]{color:var(--tc-warning)}._status_text_q4cbg_184[data-tone=error]{color:var(--tc-error)}._risk_banner_q4cbg_204{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_q4cbg_204[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_q4cbg_218{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_q4cbg_204[data-severity=error] ._risk_banner_title_q4cbg_218{color:var(--tc-error)}._risk_banner_description_q4cbg_230{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_q4cbg_237{align-items:center;gap:8px;display:flex}._acknowledged_note_q4cbg_243{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_q4cbg_251{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_q4cbg_258{align-items:center;gap:12px;padding-top:8px;display:flex}._vault_mode_row_q4cbg_264{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;display:flex}._vault_mode_row_q4cbg_264 ._profile_meta_q4cbg_151{white-space:normal;text-overflow:clip;line-height:1.45;overflow:visible}._vault_controls_q4cbg_280{gap:14px;width:min(100%,520px);padding-top:16px;display:grid}._vault_controls_q4cbg_280>button{width:fit-content}._vault_unlocked_actions_q4cbg_291{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._text_input_q4cbg_298{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._text_input_q4cbg_298:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._layout_q4cbg_314{grid-template-columns:184px minmax(0,1fr);min-height:100%;display:grid}._section_nav_q4cbg_320{border-inline-end:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding:16px 8px;display:flex}._section_nav_item_q4cbg_328{border-radius:var(--tc-radius-field);color:var(--tc-text-muted);text-align:start;white-space:nowrap;padding:8px 12px}._section_nav_item_q4cbg_328[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised)}._section_content_q4cbg_341{min-width:0}@media (width<=767px){._layout_q4cbg_314{grid-template-columns:minmax(0,1fr)}._section_nav_q4cbg_320{border-inline-end:none;border-bottom:1px solid var(--tc-divider);flex-direction:row;padding:8px;overflow-x:auto}}", vc = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function yc(e) {
	return e.replaceAll(vc, (e, t) => new URL(t, import.meta.url).href);
}
var bc = yc([
	ic,
	ac,
	oc,
	sc,
	uc,
	lc,
	cc,
	dc,
	fc,
	pc,
	hc,
	gc,
	mc,
	_c
].join("\n"));
//#endregion
//#region src/index.ts
function xc() {
	gs(globalThis, _s);
}
var Sc = rc(globalThis).then(() => tc({
	stylesheet: bc,
	version: "3.0.0"
}));
//#endregion
export { Sc as bootstrap_handle, xc as register_chat_surface };
