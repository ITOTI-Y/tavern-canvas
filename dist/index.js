import { t as e } from "./chunks/shell.module-DFs3Bhuc.js";
import { n as t, r as n, t as r } from "./chunks/sha2-BGNex9vj.js";
import { _ as i, b as a, g as o, i as s, l as c, m as l, n as u, o as d, r as f, s as p, u as m, y as h } from "./chunks/ids-DjWg1HG8.js";
import { n as g, r as _ } from "./chunks/generation-CPQjBKML.js";
import { o as v, s as y } from "./chunks/provider-WzlC6WOR.js";
import { t as b } from "./chunks/novelai_defaults-lLxSb566.js";
import { a as x, c as S, d as ee, f as te, i as C, l as w, o as ne, r as re, s as ie, t as ae, u as oe } from "./chunks/http_acknowledgment-DGpvRi1i.js";
import { i as se, n as ce, o as T, r as le, s as ue, t as de } from "./chunks/media_command_service-pC9pJzuj.js";
import { A as fe, F as pe, H as me, I as he, N as E, O as ge, P as _e, Q as ve, V as ye, W as be, Z as xe, _ as D, b as Se, ct as O, et as k, ft as Ce, g as A, h as j, i as we, k as Te, m as M, n as Ee, nt as De, p as N, pt as P, rt as Oe, u as ke, ut as F, x as I, y as Ae } from "./chunks/vue-i18n-DUz2Gjn8.js";
import { t as je } from "./chunks/create_i18n-CK1c6SPb.js";
import { n as Me, t as Ne } from "./chunks/AppIcon-Cnhzrx9o.js";
import { t as Pe } from "./chunks/chevron-down-Tu_8qTxg.js";
import { t as Fe } from "./chunks/chevron-up-D4TetO-M.js";
import { n as Ie } from "./chunks/route_nav-BrwZiRD4.js";
import { t as Le } from "./chunks/x-CDKrptQJ.js";
import { a as Re, i as ze, n as Be, r as Ve, t as He } from "./chunks/analysis-D_QhEnPQ.js";
import { t as Ue } from "./chunks/portal_keys-gQ1cWdMS.js";
import { d as We, i as Ge, o as Ke } from "./chunks/business_repositories-NHR0YTS4.js";
import { i as qe, n as Je, r as Ye, t as Xe } from "./chunks/image_store-DQgZDuLh.js";
import { n as Ze, r as Qe, t as $e } from "./chunks/tag_normalizer-CEAU4497.js";
import { t as et } from "./chunks/novelai_errors-Bve94MgO.js";
import { i as tt, r as nt } from "./chunks/browser_secret_vault-DhuOFaGV.js";
import { a as rt, i as it, n as at, o as ot } from "./chunks/provider_transport-C8Uv9AW4.js";
import { t as st } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
//#region ../../packages/core/src/capability_registry.ts
var ct = class {
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
}, lt = class {
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
}, ut = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new ct(), n = new lt()) {
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
}, dt = "Canonical JSON accepts only JSON data";
function L() {
	throw TypeError(dt);
}
function ft(e) {
	return typeof e == "number" && !Number.isFinite(e) ? L() : JSON.stringify(e);
}
function pt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return ft(e);
	if (typeof e != "object") return L();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return L();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return L();
				n.push(pt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return L();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return L();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return L();
			a.push(`${ft(n)}:${pt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function mt(e) {
	return pt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var ht = class {
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
function gt(e) {
	return t(r(n(e)));
}
function _t(e, n) {
	let r = gt(mt(e)), i = n.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: r,
		generation_anchor: gt(`${r}${t(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/direct_catalog.ts
var vt = Object.freeze({}), yt = {
	kind: "bearer",
	header: "authorization"
}, bt = Object.freeze({
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
		auth: yt,
		required_headers: vt
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: yt,
		required_headers: vt
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: vt
	}
}), xt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function St(e) {
	return bt[e];
}
function Ct(e, t) {
	if (!e.routes.includes(t)) throw new xt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var wt = a().regex(/^[A-Za-z0-9_-]{8,32}$/u), Tt = h({
	name: a().trim().min(1).max(120),
	prompt: a().trim().min(1).max(4e3),
	negative_prompt: a().max(4e3)
}), Et = h({
	slot_id: wt,
	paragraph: o().int().min(0),
	anchor: a().max(400),
	scene: a().max(2e3),
	characters: c(a().trim().min(1).max(120)).max(16),
	positive_prompt: a().max(8e3),
	negative_prompt: a().max(8e3),
	character_prompts: c(Tt).max(16),
	image_ids: c(u),
	active_image_id: u.nullable(),
	pending_request_ids: c(s),
	last_error: a().max(500).nullable()
}), Dt = h({
	schema_version: l(2),
	slots: c(Et).max(16)
});
p(["quality", "undesired_content"]);
var Ot = h({
	enabled: m(),
	preset_id: a().trim().min(1).max(200)
}), kt = h({
	quality: Ot,
	undesired_content: Ot
}), At = h({
	schema_version: l(1),
	chat_id: a().min(1).max(512),
	active_swipes: c(i({
		message_id: o().int().nonnegative(),
		swipe_id: o().int().nonnegative()
	})),
	messages: c(i({
		message_id: o().int().nonnegative(),
		role: p([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: _,
		swipe_id: o().int().nonnegative().nullable()
	}))
}), jt = class {
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
var Mt = {
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
}, Nt = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function Pt(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Mt[r].includes(t)) throw new Nt(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function Ft(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function It(e) {
	let t = _.parse(e.generation_anchor), n = Object.freeze(g.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: s.parse(e.request_id),
		generation_anchor: t,
		source_anchor: _.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: v.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function Lt(e) {
	let i = `${e.generation_anchor}${mt(e.arguments)}`;
	return t(r(n(i)));
}
function Rt(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function zt(e) {
	return e instanceof ue ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var Bt = class {
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
	#f = v.options;
	#p = 0;
	#m = 0;
	#h = !1;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new jt(), this.#i = Ft(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#f) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : Ft(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, []), this.#s.set(t, 0);
		}
	}
	enqueue(e) {
		let t = It(e), n = Lt(t);
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
			job_id: f.parse(this.#n.next()),
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
			let n = (await this.#e.execute(R(e.job), t)).image_ids.map((e) => u.parse(e));
			if (n.length === 0) throw new ue({
				code: "malformed_response",
				retryable: !1
			});
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = Rt(e.job);
				t.image_ids = n, await this.#S(e, "completed", t);
			});
		} catch (t) {
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = Rt(e.job);
				n.error = zt(t), await this.#S(e, "failed", n);
			});
		}
	}
	async #S(e, t, n = Rt(e.job)) {
		Pt(n, t, this.#r.now().toISOString());
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
}, Vt = "tavern_canvas";
function Ht(e) {
	return e.bind(globalThis);
}
function Ut(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Wt(e) {
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
function Gt(e, t) {
	let n = z(e, t);
	if (typeof n == "function") try {
		return Reflect.apply(n, e, []);
	} catch {
		return;
	}
}
function Kt(e, t) {
	let n = z(e, "eventSource"), r = z(e, "eventTypes");
	return !Ut(n) || !Ut(r) ? !1 : typeof z(n, "on") == "function" && typeof z(n, "removeListener") == "function" && t.every((e) => {
		let t = z(r, e);
		return typeof t == "string" && t.length > 0;
	});
}
function qt(e) {
	let t = Ut(e) ? Gt(e, "getContext") : void 0;
	if (!Ut(t)) return {
		main_generation_events: !1,
		message_swipe_metadata: !1
	};
	let n = Gt(t, "getCurrentLocale");
	return {
		main_generation_events: typeof n == "string" && n.trim().length > 0 && Kt(t, [
			"GENERATION_STARTED",
			"GENERATION_STOPPED",
			"GENERATION_ENDED"
		]),
		message_swipe_metadata: typeof z(t, "getCurrentChatId") == "function" && Array.isArray(z(t, "chat")) && typeof z(t, "saveChat") == "function" && Kt(t, [
			"CHAT_CHANGED",
			"MESSAGE_SWIPED",
			"MESSAGE_UPDATED",
			"MESSAGE_EDITED",
			"CHARACTER_MESSAGE_RENDERED",
			"MORE_MESSAGES_LOADED"
		])
	};
}
function Jt(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function Yt(e) {
	if (!Wt(e) || !Object.values(e).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return { ...e };
}
function Xt(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
var Zt = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t.bind(globalThis);
	}
	get_locale() {
		return Jt(this.#e().getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		return Jt(this.#e().getCurrentChatId(), "SillyTavern returned an invalid active chat ID");
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
				let n = Xt(t);
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
			let n = Xt(t);
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
		let t = this.#r(e, !1)?.[Vt];
		return t === void 0 ? null : structuredClone(t);
	}
	async translate_deepl(e, t, n) {
		let r = await this.#t("/api/translate/deepl", {
			method: "POST",
			headers: Yt(this.#e().getRequestHeaders()),
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
		n[Vt] = structuredClone(t), await this.#e().saveChat();
	}
}, Qt = {
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
function $t(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function en(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function tn(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function nn(e, t) {
	return t.every((t) => typeof tn(e, t) == "function");
}
function rn(e) {
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
function an(e) {
	return $t(e) ? {
		detected: !0,
		version: rn(e),
		message_swipe_metadata: nn(e, Qt.message_swipe_metadata),
		preset_generation: nn(e, Qt.preset_generation),
		tavern_regex: nn(e, Qt.tavern_regex)
	} : {
		detected: e !== void 0,
		version: e === void 0 ? { state: "missing" } : { state: "invalid" },
		message_swipe_metadata: !1,
		preset_generation: !1,
		tavern_regex: !1
	};
}
function on(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function sn(e) {
	if (!en(e)) throw Error("TavernHelper returned an invalid chat message");
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o } = e;
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || typeof n != "string" || !on(r) || i !== void 0 && typeof i != "boolean" || typeof a != "number" || !Number.isInteger(a) || !Array.isArray(o) || !o.every((e) => typeof e == "string") || a < 0 || a >= o.length) throw Error(`TavernHelper returned an invalid chat message ${String(t)}`);
	return {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o
	};
}
function cn(e) {
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
function ln(e) {
	if (typeof e == "string") return {
		content: e,
		reasoning: null
	};
	if (en(e) && typeof e.content == "string") return {
		content: e.content,
		reasoning: typeof e.reasoning == "string" && e.reasoning.length > 0 ? e.reasoning : null
	};
	throw Error("TavernHelper.generate returned neither text nor a detailed result");
}
var un = /* @__PURE__ */ new Set([
	"and_any",
	"and_all",
	"not_all",
	"not_any"
]), dn = /* @__PURE__ */ new Set([
	"constant",
	"selective",
	"vectorized"
]);
function fn(e) {
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
function pn(e) {
	if (!en(e) || !en(e.strategy) || !en(e.position)) throw Error("TavernHelper returned an invalid world info entry");
	let { enabled: t, content: n, strategy: r, position: i } = e, a = r.keys_secondary, o = en(a) ? a.logic ?? "and_any" : void 0;
	if (typeof t != "boolean" || typeof n != "string" || typeof r.type != "string" || !dn.has(r.type) || !en(a) || typeof o != "string" || !un.has(o) || typeof i.order != "number") throw Error("TavernHelper returned an invalid world info entry");
	return {
		enabled: t,
		strategy: r.type,
		keys: fn(r.keys),
		secondary_logic: o,
		secondary_keys: fn(a.keys),
		order: i.order,
		content: n
	};
}
function mn(e) {
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
function hn(e) {
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
function gn(e, t) {
	return e.script_name === t.script_name && e.find_regex === t.find_regex && e.replace_string === t.replace_string && e.source.ai_output === t.source.ai_output && e.source.user_input === t.source.user_input && e.destination.display === t.destination.display && e.destination.prompt === t.destination.prompt && e.run_on_edit === t.run_on_edit;
}
var _n = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	#n(e) {
		let t = this.#e.getChatMessages(e, { include_swipes: !0 });
		if (!Array.isArray(t)) throw Error("TavernHelper returned invalid chat messages");
		return t.map(sn);
	}
	get_active_chat() {
		let e = this.#n("0-{{lastMessageId}}");
		return Promise.resolve({
			chat_id: this.#t(),
			messages: e.map(cn)
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
		let t = mn(e.connection);
		return ln(await this.#e.generate({
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
			} }
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
		return t.map(pn);
	}
	stop_generation(e) {
		this.#e.stopGenerationById(e);
	}
	async sync_regex_scripts(e) {
		let t = { type: "global" }, n = this.#e.getTavernRegexes(t), r = e.map(hn).filter((e) => {
			let t = n.find((t) => t.id === e.id);
			return t === void 0 || !gn(t, e);
		});
		if (r.length === 0) return !1;
		let i = n.filter((e) => !r.some((t) => t.id === e.id));
		return await this.#e.replaceTavernRegexes([...i, ...r], t), !0;
	}
	find_message_element(e) {
		return this.#e.retrieveDisplayedMessage(e).get(0) ?? null;
	}
}, vn = "4.11.1", yn = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function bn(e) {
	let t = yn.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function xn(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function Sn(e) {
	let t = bn(e), n = bn(vn);
	return t === null || n === null ? "invalid" : xn(t, n) ? "supported" : "unsupported";
}
var Cn = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function wn(e) {
	return {
		available: !1,
		reason: e
	};
}
function Tn(e, t) {
	return e ? { available: !0 } : wn(t);
}
function En(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Dn(e, t) {
	return {
		main_generation_events: Tn(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		preset_generation: Tn(e.preset_generation, "TavernHelper.generate, stopGenerationById or the world info functions are unavailable"),
		message_swipe_metadata: Tn(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper or SillyTavern chat message API is unavailable"),
		tavern_regex: Tn(e.tavern_regex, "TavernHelper regex or displayed message API is unavailable"),
		tavern_helper: Tn(e.version.state === "available", "TavernHelper version API is unavailable"),
		gateway_protocol: wn("Gateway protocol is not connected")
	};
}
function On(e) {
	return Cn.filter((t) => e[t]?.available !== !0);
}
function kn(e) {
	let t = an(En(e, "TavernHelper")), n = Dn(t, qt(En(e, "SillyTavern")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: On(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: On(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = Sn(i);
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
	let o = On(n);
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
var An = "capability_not_implemented";
function B() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: An }), Promise.reject(e);
}
function jn() {
	return () => {};
}
var Mn = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	workflow: [],
	prompt_tag: []
}, Nn = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, Pn = {
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
		world_info: { mode: "chat" }
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
function Fn() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: jn,
			submit: B,
			cancel: B,
			retry: B
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: jn,
			save: B,
			remove: B,
			test_connection: B,
			set_credential: B,
			clear_credential: B,
			save_novelai_defaults: B,
			save_prompt_tags: B
		},
		novelai: {
			get_account: B,
			load: () => Promise.resolve([]),
			refresh_models: B,
			estimate_cost: B
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: jn,
			load_draft: B,
			save_draft: B,
			remove: B,
			bulk_remove: B,
			test_regex: B
		},
		assets: {
			load: () => Promise.resolve(Mn),
			subscribe: jn,
			save: B,
			remove: B,
			reorder: B
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: jn,
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
			load: () => Promise.resolve(Nn),
			subscribe: jn,
			test_connection: B,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: B
		},
		settings: {
			load: () => Promise.resolve({
				settings: Pn,
				vocabulary_update_channel: "bundled",
				browser_secret_vault: {
					state: "unavailable",
					secret_count: 0
				}
			}),
			subscribe: jn,
			update: B,
			acknowledge_http_origin: B,
			set_gateway_token: B,
			clear_gateway_token: B,
			set_analysis_key: B,
			list_worldbooks: B,
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
var In = { status: "idle" }, Ln = "capability_load_failed", Rn = "command_failed", zn = /^[a-z][a-z0-9_]*$/u;
function Bn(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && zn.test(t)) return { code: t };
	}
	return { code: t };
}
function V(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var Vn = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function Hn(e) {
	return e === "failed" ? "error" : "pending";
}
function Un(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function Wn(e) {
	return {
		id: e.job_id,
		label_code: Un(e.state),
		status: Hn(e.state),
		progress: e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null
	};
}
function Gn(e) {
	return e.filter((e) => Vn.has(e.state)).map(Wn);
}
function Kn(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: Bn(e, Rn)
		});
	}));
}
function qn(e, t, n) {
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
			save_command: In
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
			vocabulary_install_command: In
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: In
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			connection_test_command: In,
			support_bundle_command: In
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: In
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var Jn = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = qn(e.initial_route ?? "settings", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
			tasks: Gn(e)
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
			this.#i || this.#g(e, Bn(t, Ln));
		}).finally(() => {
			this.#h(e, !1);
		});
	}
	#v(e) {
		this.#i || (e.type === "job_updated" ? this.#c(V(this.#t.generation.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.generation.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#y(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: V(this.#t.generation.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.generation.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#b(e) {
		this.#i || (e.type === "preset_upserted" ? this.#l({ presets: V(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#l({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#x(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: V(this.#t.assets.records[t], e.asset, (e) => e.id)
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
		this.#i || (e.type === "record_upserted" ? this.#d({ records: V(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#d({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
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
		return Kn(() => this.#t.prompt.save_command, (e) => {
			this.#l({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#l({
				presets: V(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return Kn(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#u({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return Kn(() => this.#t.settings.update_command, (e) => {
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
	test_diagnostics_connection() {
		return Kn(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#f({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return Kn(() => this.#t.diagnostics.support_bundle_command, (e) => {
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
			profiles: V(this.#t.generation.profiles, t, (e) => e.id),
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
		return this.#i || this.#s({ profiles: V(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#s({ profiles: V(this.#t.generation.profiles, t, (e) => e.id) }), t;
	}
	async save_novelai_defaults(e, t) {
		let n = await this.#e.profiles.save_novelai_defaults(e, t);
		return this.#i || this.#s({ profiles: V(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async save_prompt_tags(e, t) {
		let n = await this.#e.profiles.save_prompt_tags(e, t);
		return this.#i || this.#s({ profiles: V(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	load_novelai_account() {
		return this.#e.novelai.get_account();
	}
	load_novelai_models() {
		return this.#e.novelai.load();
	}
	acknowledge_http_origin(e) {
		return this.#E(this.#e.settings.acknowledge_http_origin(e));
	}
	set_gateway_token(e) {
		return this.#E(this.#e.settings.set_gateway_token(e));
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
	clear_gateway_token() {
		return this.#E(this.#e.settings.clear_gateway_token());
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
	async #E(e) {
		await e;
		let t = await this.#e.settings.load();
		this.#i || this.#p({
			settings: t.settings,
			vocabulary_update_channel: t.vocabulary_update_channel,
			browser_secret_vault: t.browser_secret_vault
		});
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
			[e]: V(this.#t.assets.records[e], n, (e) => e.id)
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
	bulk_delete_gallery_records(e) {
		return Kn(() => this.#t.gallery.bulk_delete_command, (e) => {
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
function Yn(e) {
	return new Jn(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function Xn(e) {
	let t = xe(Yn(e)), n = De(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), ve(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var Zn = Me("image", [
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
]), Qn = Me("panel-right-close", [
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
]), $n = Me("panel-right-open", [
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
]), er = ["image", "video"], tr = /^(?:blob:|data:image\/|data:video\/)/u, nr = h({
	kind: p(er),
	url: a().min(1).refine((e) => tr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function rr(e) {
	let t = nr.safeParse(e);
	return t.success ? t.data : null;
}
function ir(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: rr(n)
	};
}
var ar = 8;
function or(e, t) {
	let n = Math.max(ar, t.width - 56 - ar), r = Math.max(ar, t.height - 56 - ar);
	return {
		x: Math.min(Math.max(e.x, ar), n),
		y: Math.min(Math.max(e.y, ar), r)
	};
}
function sr(e) {
	return or({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var cr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function lr(e) {
	let t = rr(e);
	return t !== null && t.kind === "image" ? t : null;
}
var ur = class {
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
		this.#n && (this.#t = or(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = sr(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? sr(t) : or(e, t);
	}
}, dr = "(min-width: 960px)";
function fr() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(dr).matches;
}
function pr(e) {
	if (e !== void 0) return N(() => e);
	let t = k(fr());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(dr), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), ve(() => {
			e.removeEventListener("change", n);
		});
	}
	return N(() => t.value ? "desktop" : "mobile");
}
var mr = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, hr = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], gr = ["src"], _r = ["src"], vr = /* @__PURE__ */ I({
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
		let n = e, r = t, i = pr(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new ur({
			position_store: Oe(n.positionStore) ?? xe(new cr()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = k(o.position), c = k(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		ye(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		fe(() => {
			window.addEventListener("resize", u);
		}), Te(() => {
			window.removeEventListener("resize", u);
		});
		let d = N(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: lr(n.mediaAssets.idle)
			} : ir(n.mediaAssets, e);
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
			class: F(["tc-interactive", [O(mr).floatingEntry, c.value && O(mr).floatingEntryDragging]]),
			style: Ce({
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
			class: F(O(mr).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, gr)) : d.value.asset?.kind === "image" ? (E(), D("img", {
			key: 1,
			class: F(O(mr).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, _r)) : (E(), j(Ne, {
			key: 2,
			icon: O(Zn)
		}, null, 8, ["icon"]))], 46, hr)) : A("", !0);
	}
}), yr = "data-tavern-canvas-menu-entry";
function br(e, t) {
	let n = k(!1), r = null;
	return fe(() => {
		let i = document.getElementById("extensionsMenu");
		if (i === null) return;
		i.querySelector(`[${yr}]`)?.remove(), r = document.createElement("div"), r.className = "list-group-item flex-container flexGap5 interactable", r.setAttribute(yr, ""), r.setAttribute("role", "button"), r.tabIndex = 0;
		let a = document.createElement("div");
		a.className = "extensionsMenuExtensionButton", a.append(Re(document));
		let o = document.createElement("span");
		me(() => {
			o.textContent = e();
		}), r.append(a, o), r.addEventListener("click", t), i.append(r), n.value = !0;
	}), Te(() => {
		r?.remove();
	}), n;
}
//#endregion
//#region src/ui/experience/use_host_entry_points.ts
var xr = "data-tavern-canvas-settings", Sr = "inkwell", Cr = !1;
function wr(e, t) {
	if (Cr) return;
	let n = globalThis.SillyTavern?.getContext?.(), r = n?.SlashCommand?.fromProps?.({
		name: Sr,
		helpString: e,
		returns: "nothing",
		callback: () => (t(), "")
	});
	r !== void 0 && n?.SlashCommandParser?.addCommandObject !== void 0 && (n.SlashCommandParser.addCommandObject(r), Cr = !0);
}
function Tr(e, t) {
	let n = null;
	fe(() => {
		wr(e.description(), t);
		let r = document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
		if (r === null) return;
		r.querySelector(`[${xr}]`)?.remove(), n = document.createElement("div"), n.setAttribute(xr, ""), n.className = "flex-container flexFlowColumn flexGap5";
		let i = document.createElement("b"), a = document.createElement("small"), o = document.createElement("div");
		me(() => {
			i.textContent = e.name(), a.textContent = e.description(), o.textContent = e.open();
		}), o.className = "menu_button interactable", o.setAttribute("role", "button"), o.tabIndex = 0, o.addEventListener("click", t), o.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t());
		}), n.append(i, a, o), r.append(n);
	}), Te(() => {
		n?.remove();
	});
}
function Er(e, t, n) {
	let r = Math.max(20, t.width - n.width - 20), i = Math.max(20, t.height - n.height - 20);
	return {
		x: Math.min(Math.max(e.x, 20), r),
		y: Math.min(Math.max(e.y, 20), i)
	};
}
function Dr(e, t) {
	return Er({
		x: e.width - t.width - 20,
		y: 64
	}, e, t);
}
var Or = {
	window: "_window_1rdvc_1",
	"floating-window-enter": "_floating-window-enter_1rdvc_1"
}, kr = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], Ar = /* @__PURE__ */ I({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = k(null), r = k({
			x: 0,
			y: 0
		}), i = k(!1), a = k(!1);
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
			r.value = i.value ? Er(r.value, t, a) : Dr(t, a), i.value = !0;
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
				r.value = Er({
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
		return fe(() => {
			window.addEventListener("resize", u), ge(c);
		}), Te(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (E(), D("section", {
			ref_key: "window_element",
			ref: n,
			class: F(O(Or).window),
			style: Ce({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [he(e.$slots, "default")], 46, kr));
	}
}), jr = /* @__PURE__ */ I({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return _e(Ue, t.portalTarget), (e, t) => he(e.$slots, "default");
	}
}), Mr = /* @__PURE__ */ I({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = Se(() => import("./chunks/GalleryView-Bb2bsxth.js")), n = Se(() => import("./chunks/SettingsView-DUcdkPKi.js"));
		return (r, i) => e.state.route === "gallery" ? (E(), j(O(t), {
			key: 0,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"])) : (E(), j(O(n), {
			key: 1,
			state: e.state,
			controller: e.controller
		}, null, 8, ["state", "controller"]));
	}
}), Nr = ["aria-label", "aria-expanded"], Pr = ["data-status"], Fr = {
	key: 0,
	class: "tc-tabular-nums"
}, Ir = /* @__PURE__ */ I({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(t) {
		let n = t, { t: r, n: i } = Ee(), a = k(!0), o = {
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
		let c = N(() => a.value ? r("nav.task_strip_collapse") : r("nav.task_strip_expand"));
		function l() {
			a.value = !a.value;
		}
		return (t, o) => n.tasks.length > 0 ? (E(), D("div", {
			key: 0,
			class: F(O(e).task_strip)
		}, [M("div", { class: F(O(e).task_strip_header) }, [M("span", { class: F([O(e).task_strip_summary, "tc-tabular-nums"]) }, P(O(r)("nav.task_strip_count", n.tasks.length)), 3), M("button", {
			type: "button",
			class: F(["tc-interactive", O(e).icon_button]),
			"aria-label": c.value,
			"aria-expanded": a.value,
			onClick: l
		}, [Ae(Ne, {
			icon: a.value ? O(Pe) : O(Fe),
			size: 16
		}, null, 8, ["icon"])], 10, Nr)], 2), a.value ? (E(), D("div", {
			key: 0,
			class: F(O(e).task_strip_list)
		}, [(E(!0), D(ke, null, pe(n.tasks, (t) => (E(), D("div", {
			key: t.id,
			class: F(O(e).task_chip)
		}, [
			M("span", {
				class: F(O(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, Pr),
			M("span", { class: F(O(e).task_chip_label) }, P(s(t.label_code)), 3),
			t.progress === null ? A("", !0) : (E(), D("span", Fr, P(O(i)(t.progress, "percent")), 1))
		], 2))), 128))], 2)) : A("", !0)], 2)) : A("", !0);
	}
}), Lr = ["aria-label", "aria-pressed"], Rr = ["aria-label", "title"], zr = /* @__PURE__ */ I({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean },
		inspectorAvailable: { type: Boolean }
	},
	emits: ["set-inspector-collapsed", "close"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = Ee(), o = N(() => Ie(a, r.route)), s = N(() => r.inspectorCollapsed ? $n : Qn), c = N(() => r.inspectorCollapsed ? a("nav.inspector_expand") : a("nav.inspector_collapse"));
		function l() {
			i("set-inspector-collapsed", !r.inspectorCollapsed);
		}
		return (n, r) => (E(), D("header", {
			class: F(O(e).top_bar),
			"data-window-drag-handle": ""
		}, [M("div", { class: F(O(e).top_bar_start) }, [
			M("span", { class: F(O(e).top_bar_brand) }, P(O(a)("app.name")), 3),
			M("span", {
				class: F(O(e).top_bar_divider),
				"aria-hidden": "true"
			}, "/", 2),
			M("span", { class: F(O(e).top_bar_title) }, P(o.value), 3)
		], 2), M("div", { class: F(O(e).top_bar_end) }, [t.inspectorAvailable ? (E(), D("button", {
			key: 0,
			type: "button",
			class: F(["tc-interactive", O(e).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": c.value,
			"aria-pressed": !t.inspectorCollapsed,
			onClick: l
		}, [Ae(Ne, {
			icon: s.value,
			size: 18
		}, null, 8, ["icon"])], 10, Lr)) : A("", !0), M("button", {
			type: "button",
			class: F(["tc-interactive", [O(e).icon_button, O(e).close_button]]),
			"data-testid": "studio-close",
			"aria-label": O(a)("common.close"),
			title: O(a)("common.close"),
			onClick: r[0] ||= (e) => i("close")
		}, [Ae(Ne, {
			icon: O(Le),
			size: 18
		}, null, 8, ["icon"])], 10, Rr)], 2)], 2));
	}
}), Br = ["data-viewport", "data-inspector-collapsed"], Vr = ["aria-label"], Hr = /* @__PURE__ */ I({
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
		let r = Se(() => import("./chunks/ContextInspector-DlT2UO3O.js")), i = Se(() => import("./chunks/DesktopIconRail-CBsXJJYK.js")), a = Se(() => import("./chunks/InspectorSheet-C1b5Fc5d.js")), o = Se(() => import("./chunks/MobileBottomNav-BUyAs2d3.js")), s = t, c = n, { t: l } = Ee(), u = pr(s.viewport), d = /* @__PURE__ */ new Set(["vocabulary"]), f = N(() => [...s.state.loading].some((e) => !d.has(e))), p = N(() => s.state.failures.size > 0), m = N(() => ({ "--tc-inspector-width": `${String(s.state.inspector.width)}px` })), h = k(!1), g = N(() => s.state.route === "gallery" || s.state.settings_section === "library"), _ = N(() => !g.value || s.state.inspector.collapsed), v = N(() => u.value === "mobile" ? !h.value : _.value);
		function y(e) {
			u.value === "mobile" && (h.value = !e), c("set-inspector-collapsed", e);
		}
		function b(e) {
			c("select-route", e);
		}
		return (t, n) => (E(), D("div", {
			class: F(O(e).shell),
			"data-viewport": O(u),
			"data-inspector-collapsed": O(u) === "desktop" ? _.value : null,
			style: Ce(m.value)
		}, [
			Ae(zr, {
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
			O(u) === "desktop" ? (E(), j(O(i), {
				key: 0,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : A("", !0),
			M("main", {
				class: F(O(e).workspace),
				"data-testid": "workspace"
			}, [p.value ? (E(), D("div", {
				key: 0,
				class: F(O(e).partial_banner),
				"data-testid": "partial-banner"
			}, [M("div", null, [M("p", null, P(O(l)("app.partial_init.banner_title")), 1), M("p", null, P(O(l)("app.partial_init.banner_description")), 1)]), M("button", {
				type: "button",
				class: F(["tc-interactive", O(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: n[1] ||= (e) => s.controller.set_settings_section("diagnostics")
			}, P(O(l)("settings.nav.diagnostics")), 3)], 2)) : A("", !0), f.value ? (E(), D("div", {
				key: 1,
				class: F(O(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": O(l)("status.loading")
			}, [
				M("div", {
					class: F(O(e).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				M("div", {
					class: F(O(e).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				M("div", {
					class: F(O(e).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, Vr)) : (E(), j(Mr, {
				key: 2,
				state: s.state,
				controller: s.controller
			}, null, 8, ["state", "controller"]))], 2),
			O(u) === "desktop" && g.value && !s.state.inspector.collapsed ? (E(), j(O(r), {
				key: 1,
				width: s.state.inspector.width,
				selection: s.state.inspector.selected_record,
				onResize: n[2] ||= (e) => c("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : A("", !0),
			Ae(Ir, { tasks: s.state.tasks }, null, 8, ["tasks"]),
			O(u) === "mobile" ? (E(), j(O(o), {
				key: 2,
				route: s.state.route,
				onSelect: b
			}, null, 8, ["route"])) : A("", !0),
			O(u) === "mobile" && g.value ? (E(), j(O(a), {
				key: 3,
				open: h.value,
				selection: s.state.inspector.selected_record,
				"onUpdate:open": n[3] ||= (e) => y(!e)
			}, null, 8, ["open", "selection"])) : A("", !0)
		], 14, Br));
	}
}), Ur = ["href"], Wr = /* @__PURE__ */ I({
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
		let n = t, r = Se(() => import("./chunks/ChatLayer-D_xiw9JF.js")), { t: i } = Ee();
		function a() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let o = n.hostElement, s = a();
		o.dataset.colorMode = s;
		let c = N(() => n.probe.ready ? void 0 : n.probe.current_version), l = N(() => `${i("app.name")} ${i("app.version_label", { version: n.version })}`), u = n.status.state === "ready" ? Xn({
			capabilities: n.capabilities ?? Fn(),
			initial_color_mode: s
		}) : null, d = N(() => {
			let e = u?.state.value, t = e?.settings.settings?.active_provider_profile_id ?? null;
			return {
				profile: e?.generation.profiles.find((e) => e.id === t) ?? null,
				custom_presets: e?.assets.records.prompt_tag ?? [],
				save: (e, t) => u === null ? Promise.resolve() : u.controller.save_prompt_tags(e, t)
			};
		});
		u && ye(() => u.state.value.color_mode, (e) => {
			o.dataset.colorMode = e;
		});
		function f(e) {
			u?.controller.set_route(e);
		}
		function p(e) {
			u?.controller.set_inspector_collapsed(e);
		}
		function m(e) {
			u?.controller.set_inspector_width(e);
		}
		function h() {
			window.location.reload();
		}
		let g = k(!1), _ = N(() => g.value), v = br(() => i("app.name"), b);
		Tr({
			name: () => i("app.name"),
			description: () => i("app.entry_description"),
			open: () => i("app.open_action")
		}, b);
		let y = N(() => !v.value || u?.state.value.settings.settings?.ui.optional_entry_enabled === !0);
		ye(_, (e) => {
			o.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function b() {
			g.value = !0;
		}
		function x() {
			g.value = !1;
		}
		return (n, a) => (E(), j(jr, { "portal-target": t.portalTarget }, {
			default: be(() => [t.status.state === "blocked" ? (E(), D("div", {
				key: 0,
				class: F(O(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				M("p", { class: F(O(e).state_screen_eyebrow) }, P(l.value), 3),
				M("h1", { class: F(O(e).state_screen_title) }, P(O(i)("app.unsupported_host.title")), 3),
				M("p", { class: F(O(e).state_screen_description) }, P(O(i)("app.unsupported_host.description", {
					required_version: O(vn),
					current_version: c.value ?? O(i)("status.unknown")
				})), 3),
				M("a", {
					class: F(["tc-interactive", O(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, P(O(i)("app.unsupported_host.update_action")), 11, Ur)
			], 2)) : t.status.state === "failed" ? (E(), D("div", {
				key: 1,
				class: F(O(e).state_screen),
				"data-startup-state": "failed"
			}, [
				M("p", { class: F(O(e).state_screen_eyebrow) }, P(l.value), 3),
				M("h1", { class: F(O(e).state_screen_title) }, P(O(i)("app.fatal_error.title")), 3),
				M("p", { class: F(O(e).state_screen_description) }, P(O(i)("app.fatal_error.description")), 3),
				M("button", {
					type: "button",
					class: F(["tc-interactive", O(e).state_screen_action]),
					onClick: h
				}, P(O(i)("app.fatal_error.reload_action")), 3)
			], 2)) : O(u) ? (E(), D(ke, { key: 2 }, [
				_.value ? (E(), j(Ar, {
					key: 0,
					label: O(i)("app.name")
				}, {
					default: be(() => [Ae(Hr, {
						state: O(u).state.value,
						controller: O(u).controller,
						onSelectRoute: f,
						onSetInspectorCollapsed: p,
						onResizeInspector: m,
						onClose: x
					}, null, 8, ["state", "controller"])]),
					_: 1
				}, 8, ["label"])) : A("", !0),
				Ae(vr, {
					enabled: y.value && !_.value,
					"open-label": O(i)("app.name"),
					onOpen: b
				}, null, 8, ["enabled", "open-label"]),
				t.host && t.illustrations && t.capabilities ? (E(), j(O(r), {
					key: 1,
					host: t.host,
					service: t.illustrations,
					gallery: t.capabilities.gallery,
					novelai: t.capabilities.novelai,
					translator: t.translator ?? null,
					"prompt-tags": d.value
				}, null, 8, [
					"host",
					"service",
					"gallery",
					"novelai",
					"translator",
					"prompt-tags"
				])) : A("", !0)
			], 64)) : A("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
}), Gr = "._slot_cjg26_3{max-width:min(100%,512px);color:var(--SmartThemeBodyColor,inherit);font-size:calc(var(--mainFontSize,1rem) * .9);margin:.5em 0}._frame_cjg26_10{border:1px solid var(--SmartThemeBorderColor,#80808066);background:var(--SmartThemeBlurTintColor,#00000026);border-radius:10px;position:relative;overflow:hidden}._image_cjg26_18{cursor:zoom-in;width:100%;height:auto;display:block}._placeholder_cjg26_25{text-align:center;opacity:.85;flex-direction:column;justify-content:center;align-items:center;gap:.5em;min-height:96px;padding:1em;display:flex}._error_cjg26_37{color:var(--SmartThemeQuoteColor,#e06c75)}._toolbar_cjg26_41{flex-wrap:wrap;align-items:center;gap:.25em;margin-top:.35em;display:flex}._counter_cjg26_49{font-variant-numeric:tabular-nums;opacity:.75;margin-inline-end:auto}._button_cjg26_55{border:1px solid var(--SmartThemeBorderColor,#80808066);color:inherit;font:inherit;cursor:pointer;background:0 0;border-radius:6px;align-items:center;gap:.35em;padding:.2em .6em;display:inline-flex}._button_cjg26_55:hover:not(:disabled){background:var(--SmartThemeBlurTintColor,#80808026)}._button_cjg26_55:disabled{cursor:default;opacity:.5}._skeleton_cjg26_77{opacity:.2;background:currentColor;border-radius:4px;width:60%;height:.8em;animation:1.4s ease-in-out infinite _pulse_cjg26_1}._notice_cjg26_86{border-inline-start:3px solid var(--SmartThemeQuoteColor,#e06c75);background:var(--SmartThemeBlurTintColor,#0000001a);font-size:calc(var(--mainFontSize,1rem) * .85);margin:.5em 0;padding:.5em .75em}._excerpt_cjg26_94{white-space:pre-wrap;opacity:.8;max-height:8em;margin:.35em 0 0;font-family:monospace;overflow:auto}@keyframes _pulse_cjg26_1{50%{opacity:.45}}@media (prefers-reduced-motion:reduce){._skeleton_cjg26_77{animation:none}}._lightbox_cjg26_115{z-index:9999;cursor:zoom-out;background:#000c;justify-content:center;align-items:center;padding:2vmin;display:flex;position:fixed;inset:0}._lightbox_cjg26_115 img{object-fit:contain;max-width:100%;max-height:100%}._notice_actions_cjg26_133{gap:.35em;margin-top:.35em;display:flex}", Kr = "tavern-canvas-chat-style";
function qr(e) {
	e.getElementById(Kr)?.remove();
	let t = e.createElement("style");
	return t.id = Kr, t.textContent = Gr, e.head.append(t), () => {
		t.remove();
	};
}
//#endregion
//#region src/ui/create_shadow_root.ts
function Jr(e, t) {
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
//#region src/modules/illustration/slot_markers.ts
var Yr = "[A-Za-z0-9_-]{8,32}", Xr = RegExp(`<!--tc-image:(${Yr})-->`, "gu");
function Zr(e) {
	return `<!--tc-image:${e}-->`;
}
var Qr = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${Yr})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${Yr}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function $r(e) {
	return [...e.matchAll(Xr)].map((e) => e[1] ?? "");
}
function ei(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || $r(i).length > 0 || t.push({
			index: t.length,
			text: i,
			line: r
		});
	}), t;
}
function ti(e, t) {
	let n = ei(e), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = n[e.paragraph];
		if (t === void 0) throw RangeError(`Paragraph ${String(e.paragraph)} does not exist`);
		let i = r.get(t.line) ?? [];
		i.push(Zr(e.slot_id)), r.set(t.line, i);
	}
	return e.split("\n").flatMap((e, t) => [e, ...r.get(t) ?? []]).join("\n");
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function ni(e, t) {
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
function ri(e, t) {
	let n = e, r = [];
	for (let e of t) {
		let t = ni(n, e);
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
function ii(e, t) {
	return ni(t, e).text;
}
//#endregion
//#region src/modules/illustration/slot_prompt.ts
var ai = /^(?:\d+)?(girl|boy|other)s?$/u;
function oi(e) {
	let t = null, n = [];
	for (let r of e.split(",")) {
		let e = ai.exec(Ze(r).toLowerCase());
		e === null ? n.push(r) : t ??= e[1];
	}
	return {
		subject: t,
		rest: Qe(n)
	};
}
function si(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function ci(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function li(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(Ze(t), e.replacement);
	return Qe(e.split(",").map((e) => n.get(Ze(e)) ?? e));
}
function ui(e, t) {
	if (t === null) return $e(e);
	let n = li(e, t.replacement_rules);
	return $e(ri(n, t.regex_rules).text);
}
function di(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return Qe(e.split(",").filter((e) => {
		let t = Ze(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function fi(e) {
	let t = e.library.characters, n = [], r = /* @__PURE__ */ new Set(), i = (i, a) => {
		let o = t[i];
		if (o === void 0 || r.has(o.character.id)) return;
		r.add(o.character.id);
		let s = oi(o.character.appearance), c = oi(di(a, e.library.outfit_names));
		n.push({
			name: o.character.name,
			subject: s.subject ?? c.subject,
			prompt: Qe([
				s.rest,
				o.outfit?.description,
				c.rest
			]),
			negative_prompt: o.character.excluded_traits
		});
	};
	for (let r of e.characters) {
		let e = t.findIndex((e) => ci(e.character.name, r.name));
		if (e !== -1) {
			i(e, r.tags);
			continue;
		}
		let a = oi(r.tags);
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
function pi(e) {
	let t = e.preset, n = fi(e), r = e.library.loose_outfits.map((e) => e.description), i = $e(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: ui(Qe([
			t?.fixed_positive_prompt,
			...r,
			e.scene_tags
		]), t),
		negative_prompt: i,
		character_prompts: []
	};
	let a = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: ui(Qe([
			t?.fixed_positive_prompt,
			si(a),
			...r,
			oi(e.scene_tags).rest
		]), t),
		negative_prompt: i,
		character_prompts: n.flatMap((e) => {
			let n = ui(Qe([e.subject, e.prompt]), t);
			return n === "" ? [] : [{
				name: e.name,
				prompt: n,
				negative_prompt: $e(e.negative_prompt)
			}];
		})
	};
}
//#endregion
//#region src/modules/illustration/library_match.ts
var mi = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
function hi(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function gi(e, t) {
	let n = t.trim();
	return n === "" ? !1 : mi.test(n) ? e.toLowerCase().includes(n.toLowerCase()) : RegExp(`(?<![\\p{L}\\p{N}])${hi(n)}(?![\\p{L}\\p{N}])`, "iu").test(e);
}
function _i(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function vi(e, t) {
	return e.flatMap((e) => {
		let n = t.characters.find((t) => _i(t.name, e));
		return n === void 0 ? [] : [n];
	});
}
function yi(e, t, n) {
	let r = n.outfits.filter((t) => gi(e, t.name)), i = n.characters.filter((n) => gi(e, n.name) || t.some((e) => _i(e, n.name))).map((e) => ({
		character: e,
		outfit: r.find((t) => t.character_id === e.id) ?? n.outfits.find((t) => t.character_id === e.id) ?? null
	})), a = new Set(i.map((e) => e.outfit?.id));
	return {
		characters: i,
		loose_outfits: r.filter((e) => !a.has(e.id)),
		outfit_names: n.outfits.map((e) => e.name)
	};
}
//#endregion
//#region src/modules/illustration/worldbook.ts
function bi(e, t) {
	return typeof e == "string" ? gi(t, e) : new RegExp(e.source, e.flags.replace("g", "")).test(t);
}
function xi(e, t) {
	if (e.secondary_keys.length === 0) return !0;
	let n = e.secondary_keys.map((e) => bi(e, t));
	switch (e.secondary_logic) {
		case "and_any": return n.some(Boolean);
		case "and_all": return n.every(Boolean);
		case "not_all": return !n.every(Boolean);
		case "not_any": return !n.some(Boolean);
	}
}
function Si(e, t) {
	return e.filter((e) => e.enabled && e.content.trim() !== "" && (e.strategy === "constant" || e.strategy === "selective" && e.keys.some((e) => bi(e, t)) && xi(e, t))).sort((e, t) => e.order - t.order).map((e) => e.content.trim()).join("\n\n");
}
//#endregion
//#region src/modules/illustration/illustration_service.ts
var Ci = class extends Error {
	constructor(e) {
		super(`Message ${String(e)} changed while it was being analyzed`), this.name = "MessageChangedError";
	}
}, wi = /* @__PURE__ */ new Set([
	"normal",
	"swipe",
	"regenerate",
	"continue"
]);
async function Ti(e, t) {
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
async function Ei(e, t, n) {
	switch (e.mode) {
		case "chat": return { kind: "chat" };
		case "off": return {
			kind: "replace",
			text: ""
		};
		case "worldbook": return {
			kind: "replace",
			text: Si(await n.read_worldbook(e.worldbook), t)
		};
	}
}
async function Di(e, t) {
	let { attach_character_prompts: n } = await import("./chunks/character_prompts-BRu7L7wm.js");
	return n(e, t);
}
function Oi(e) {
	return (e instanceof Error ? e.message : String(e)).slice(0, 500);
}
var ki = class {
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
			this.#f(e);
		}), this.#e.jobs.subscribe((e) => {
			this.#d(e);
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
		let t = Dt.safeParse(this.#e.host.read_swipe_record(e));
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
		this.#r.add(a), this.#p({
			type: "analysis_started",
			location: r
		});
		try {
			let e = await this.#o(r, n.swipes[r.swipe_id]?.content ?? "");
			return this.#p({
				type: "slots_changed",
				location: r
			}), e;
		} catch (e) {
			throw this.#p({
				type: "analysis_failed",
				location: r,
				message: Oi(e),
				excerpt: e instanceof Be ? e.excerpt : null
			}), e;
		} finally {
			this.#r.delete(a);
		}
	}
	async #o(e, t) {
		let n = ei(t), r = this.#e.settings(), i = {
			schema_version: 2,
			slots: []
		};
		if (n.length > 0) {
			let e = await this.#e.prompt_context(), a = await this.#e.host.generate_with_preset({
				generation_id: this.#e.new_generation_id(),
				preset_name: r.preset_name,
				user_input: Ve(n, r.max_images_per_message, e.library),
				max_chat_history: r.max_chat_history,
				connection: await Ti(r.connection, this.#e.resolve_analysis_key),
				json_schema: He,
				world_info: await Ei(r.world_info, t, this.#e.host)
			}), o = ze(a.content, n.length, r.max_images_per_message);
			i.slots.push(...o.map((t) => {
				let r = yi(`${n[t.paragraph]?.text ?? ""}\n${t.scene}`, t.characters.map((e) => e.name), e.library), i = pi({
					preset: e.preset,
					library: r,
					characters: t.characters,
					scene_tags: t.tags
				});
				return {
					slot_id: this.#e.new_slot_id(),
					paragraph: t.paragraph,
					anchor: (n[t.paragraph]?.text ?? "").slice(0, 400),
					scene: t.scene,
					characters: [.../* @__PURE__ */ new Set([...t.characters.map((e) => e.name), ...r.characters.map((e) => e.character.name)])],
					positive_prompt: i.positive_prompt,
					negative_prompt: i.negative_prompt,
					character_prompts: [...i.character_prompts],
					image_ids: [],
					active_image_id: null,
					pending_request_ids: [],
					last_error: null
				};
			}));
		}
		if (await this.#e.host.write_swipe_record(e, i), i.slots.length > 0) {
			let n = ti(t, i.slots.map((e) => ({
				paragraph: e.paragraph,
				slot_id: e.slot_id
			})));
			if (!await this.#e.host.replace_message_text(e.message_id, t, n)) throw await this.#e.host.write_swipe_record(e, null), new Ci(e.message_id);
		}
		return i;
	}
	preview_request(e, t, n) {
		let r = this.#l(e, t);
		return this.#s(n ?? r);
	}
	async #s(e) {
		return Di(await this.#e.build_request(e), e.character_prompts);
	}
	async generate(e, t, n) {
		let r = this.#l(e, t), i = {
			positive_prompt: n?.positive_prompt ?? r.positive_prompt,
			negative_prompt: n?.negative_prompt ?? r.negative_prompt,
			character_prompts: n?.character_prompts ?? r.character_prompts
		};
		await this.#c(e, t, () => this.#s(i), (e) => ({
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
		let r = this.#l(e, t), i = n.kind === "img2img" || n.kind === "inpaint" ? r.character_prompts : [];
		await this.#c(e, t, async () => Di(await this.#e.build_edit_request(n), i));
	}
	async #c(e, t, n, r = (e) => e) {
		let i;
		try {
			i = await this.#e.submit(await n());
		} catch (n) {
			throw await this.#u(e, t, (e) => ({
				...e,
				last_error: Oi(n)
			})), n;
		}
		this.#t.set(i, {
			location: e,
			slot_id: t
		}), await this.#u(e, t, (e) => ({
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
		return this.#u(e, t, (e) => {
			let r = e.image_ids.find((e) => e === n);
			if (r === void 0) throw Error(`Image ${n} does not belong to slot ${t}`);
			return {
				...e,
				active_image_id: r
			};
		});
	}
	#l(e, t) {
		let n = this.read(e)?.slots.find((e) => e.slot_id === t);
		if (n === void 0) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		return n;
	}
	async #u(e, t, n) {
		let r = this.read(e);
		if (r === null || !r.slots.some((e) => e.slot_id === t)) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		await this.#e.host.write_swipe_record(e, {
			...r,
			slots: r.slots.map((e) => e.slot_id === t ? n(e) : e)
		}), this.#p({
			type: "slots_changed",
			location: e
		});
	}
	async #d(e) {
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
			await this.#u(t.location, t.slot_id, (t) => n ? {
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
	#f(e) {
		if (e.phase === "started") {
			this.#i = e.dry_run ? null : e.generation_type;
			return;
		}
		if (e.phase === "stopped") {
			this.#i = null;
			return;
		}
		let t = this.#i;
		this.#i = null, !(t === null || !wi.has(t) || !this.#e.auto_generation_enabled()) && this.analyze(e.message_id).then(async (t) => {
			t.slots.length > 0 && await this.generate_missing(await this.active_location(e.message_id));
		}).catch(() => {});
	}
	#p(e) {
		for (let t of this.#n) t(e);
	}
}, Ai = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
function ji() {
	return [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))].map((e) => Ai[e % 64] ?? "_").join("");
}
function Mi(e) {
	let { reference_image: t, reference_send: n, reference_mode: r } = e;
	return typeof t != "string" || t === "" || n !== 1 ? null : r === "img2img" || r === "precise" ? {
		image: t,
		mode: r
	} : {
		image: t,
		mode: "vibe"
	};
}
async function Ni(e) {
	return Pi(await e.load());
}
function Pi(e) {
	let t = (e) => typeof e == "string" ? e.trim() : "";
	return {
		characters: e.character.map((e) => ({
			id: e.id,
			name: e.display_name,
			appearance: t(e.payload.appearance),
			excluded_traits: t(e.payload.excluded_traits),
			reference: Mi(e.payload)
		})),
		outfits: e.outfit.map((e) => ({
			id: e.id,
			name: e.display_name,
			description: t(e.payload.description),
			character_id: t(e.payload.character_id) || null
		})),
		loras: e.lora.flatMap((e) => {
			let n = t(e.payload.character_id);
			return n === "" ? [] : [{
				file_name: t(e.payload.file_name),
				weight: typeof e.payload.weight == "number" ? e.payload.weight : 1,
				trigger_words: t(e.payload.trigger_words),
				character_id: n
			}];
		})
	};
}
async function Fi(e, t, n) {
	let [r, i] = await Promise.all([n === null ? null : e.load_draft(n), Ni(t)]);
	return {
		preset: r,
		library: i
	};
}
var Ii = class {
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
			await this.#t.sync_regex_scripts(Qr), this.#n = null;
		} catch (e) {
			this.#n = e instanceof Error ? e.message : String(e);
		}
		this.#e.start();
	}
	stop() {
		return this.#e.stop(), Promise.resolve();
	}
}, Li = /[぀-ヿ㐀-鿿豈-﫿]/u, Ri = /[,，、]/u;
function zi(e) {
	return e.split(Ri).map((e) => e.trim()).filter((e) => e.length > 0);
}
function Bi(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function Vi(e) {
	let t = e.trim().replace(/^-?[\d.]+::/u, "").replace(/::$/u, ""), n = /^\((.+):[\d.]+\)$/u.exec(t);
	for (n?.[1] !== void 0 && (t = n[1]); /^[{[].*[}\]]$/u.test(t);) t = t.slice(1, -1);
	return t.trim().toLowerCase();
}
function Hi(e) {
	return e.trim().replace(/[.。]+$/u, "").toLowerCase();
}
async function Ui(e, t) {
	let n = zi(e);
	return (await Promise.all(n.map(async (e) => {
		if (!Li.test(e)) return e;
		let n = t.glossary.find((t) => Bi(t.source, e));
		return n === void 0 ? await t.find_tag(e) ?? Hi(await t.deepl(e, "EN-US")) : n.target;
	}))).join(", ");
}
async function Wi(e, t) {
	let n = zi(e);
	return (await Promise.all(n.map(async (e) => {
		if (Li.test(e)) return e;
		let n = Vi(e), r = t.glossary.find((e) => Bi(e.target, n));
		return r === void 0 ? await t.find_translation(n) ?? (await t.deepl(n, "ZH")).trim() : r.source;
	}))).join("，");
}
//#endregion
//#region src/modules/translation/prompt_translator.ts
function Gi(e) {
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
		to_tags: (e) => Ui(e, n()),
		read_in_chinese: (e) => Wi(e, n())
	};
}
//#endregion
//#region src/storage/sillytavern_settings.ts
var Ki = "tavern_canvas", qi = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), Ji = new Set(Object.keys(w.shape)), Yi = new Set(Object.keys(S.shape)), Xi = new Set(Object.keys(oe.shape)), Zi = {
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
		world_info: { mode: "chat" }
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
function Qi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function $i() {
	return structuredClone(Zi);
}
function ea(e) {
	return JSON.stringify(e);
}
function ta(e) {
	try {
		let t = ea(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function na(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = qi.has(i) ? "disallowed_category" : "unknown_field";
		r.push({
			path: e,
			code: a
		});
	}
}
function H(e, t, n, r, i) {
	let a = e.safeParse(t);
	return a.success ? a.data : (i.push({
		path: r,
		code: "invalid_value"
	}), n);
}
function ra(e, t, n) {
	if (!Qi(e)) return e !== void 0 && n.push({
		path: t,
		code: "invalid_value"
	}), {};
	let { keyType: r, valueType: i } = S.shape.http_acknowledgments, a = {};
	for (let [o, s] of Object.entries(e)) {
		let e = r.safeParse(o), c = i.safeParse(s);
		e.success && c.success ? a[e.data] = c.data : n.push({
			path: `${t}.${o}`,
			code: "invalid_value"
		});
	}
	return a;
}
function ia(e, t) {
	let n = Zi.gateway;
	return Qi(e) ? (na(e, Yi, "gateway", t), {
		endpoint: H(S.shape.endpoint, e.endpoint, n.endpoint, "gateway.endpoint", t),
		token_secret_id: H(S.shape.token_secret_id, e.token_secret_id, n.token_secret_id, "gateway.token_secret_id", t),
		http_acknowledgments: ra(e.http_acknowledgments, "gateway.http_acknowledgments", t)
	}) : (e !== void 0 && t.push({
		path: "gateway",
		code: "invalid_value"
	}), { ...n });
}
function aa(e, t) {
	let n = Zi.ui;
	return Qi(e) ? (na(e, Xi, "ui", t), {
		color_mode: H(oe.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: H(oe.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: H(oe.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: H(oe.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function oa(e, t) {
	if (e === void 0) return $i();
	let n = ta(e);
	if (n === null || n > 65536) return t.push({
		path: Ki,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), $i();
	if (!Qi(e)) return t.push({
		path: Ki,
		code: "invalid_value"
	}), $i();
	na(e, Ji, "", t);
	let r = Zi;
	return {
		schema_version: H(w.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: H(w.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: H(w.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: H(ie, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: H(w.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: H(w.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: H(w.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		vocabulary_update_channel: H(w.shape.vocabulary_update_channel, e.vocabulary_update_channel, r.vocabulary_update_channel, "vocabulary_update_channel", t),
		illustration: e.illustration === void 0 ? structuredClone(r.illustration) : H(w.shape.illustration, e.illustration, structuredClone(r.illustration), "illustration", t),
		translation: e.translation === void 0 ? structuredClone(r.translation) : H(w.shape.translation, e.translation, structuredClone(r.translation), "translation", t),
		gateway: ia(e.gateway, t),
		ui: aa(e.ui, t)
	};
}
function sa(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = oa(t[Ki], i);
	t[Ki] = a;
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
		return a = e, t[Ki] = a, o = !0, l(), a;
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
var U = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, ca = "The host refused to reveal the stored credential. Switch credential storage to This device in Settings > General and enter the key again, or allow key exposure in the host (allowKeysExposure in SillyTavern's config.yaml).", la = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = Ht(t);
	}
	async resolve_secret(e) {
		if (!d.safeParse(e).success) throw new U("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: Yt(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new U("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new U("not_exposed", ca) : t.status === 404 ? new U("not_found", "The host vault holds no such credential") : new U("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new U("unavailable", "The host secret vault returned an unreadable response");
		}
		let r;
		if (typeof n == "object" && n && !Array.isArray(n) && e in n && (r = Reflect.get(n, e)), typeof r != "string" || r.trim().length === 0) throw new U("not_found", "The host vault holds no such credential");
		return r;
	}
};
function ua(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function da(e, t) {
	return !ua(e) || typeof t != "function" ? null : new la(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var fa = class {
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
		if (t === null) throw new U("unsupported_host", `${this.#s()} credential storage cannot reveal credentials`);
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
}, W = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function pa(e) {
	try {
		if (!ha(e)) throw G("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !ga(a) || !ga(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw G("Provider operation is invalid");
		if (at(t), r === void 0) return {
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
function ma(e) {
	try {
		if (!ha(e)) throw G("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw G("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(x);
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
function ha(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function ga(e) {
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
async function _a(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new ot({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new W("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await va(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function va(e, t, n) {
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
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof W ? e : new ot({ cause: e });
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
var ya = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = pa(e), n = xa(this.#e, t.route), r = await Sa(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await ba(_a(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(it({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = ma(e);
		return _a(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
};
async function ba(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof ot ? new ot() : e;
	}
}
function xa(e, t) {
	try {
		return Ct(e, t);
	} catch (e) {
		throw e instanceof xt ? new W("configuration", e.message) : e;
	}
}
async function Sa(e, t, n, r) {
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
		throw new W("configuration", Ca(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function Ca(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var wa = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = x(e.base_url);
		} catch (e) {
			throw new W("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!C(t)) throw new W("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = pa(e);
		return _a(this.#t, `${this.#e}${t.route}`, {
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
		let t = ma(e);
		return _a(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Ta = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function Ea(e) {
	if (e.gateway_endpoint !== null) {
		let t = Oa(e.gateway_endpoint);
		if (ne(t) && !re(e.http_acknowledgments, t)) throw new Ta("Cleartext Gateway origin has not been acknowledged");
		return {
			kind: "gateway",
			endpoint: t
		};
	}
	let t = Da(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Oa(e.direct_provider_base_url);
		if (!C(t)) throw new Ta("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new Ta("No provider transport is available");
}
function Da(e) {
	if (e === null || St(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Ta("This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway");
	if (!e.secrets_readable) throw new Ta("This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Oa(e) {
	try {
		return x(e);
	} catch (e) {
		throw new Ta("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function ka(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function K(e) {
	return ka(e.payload);
}
function q(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function Aa(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function ja(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function Ma(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function Na(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function J(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => J(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = J(i, n));
	return r;
}
var Pa = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, Fa = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"workflow",
	"prompt_tag"
];
function Ia(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit": return e.outfit_profiles;
		case "lora": return e.lora_profiles;
		case "prompt_tag": return e.prompt_tag_presets;
	}
}
function La(e, t) {
	let n = K(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: q(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function Ra(e, t) {
	let n = Ma(K(e), "order", 2 ** 53 - 1), r = Ma(K(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function za(e) {
	let t = new Pa();
	async function n(t) {
		return [...await Ia(e.repositories, t).list(e.namespace())].sort(Ra).map((e) => La(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(Fa.map(async (e) => [e, await n(e)]));
			return Object.fromEntries(e);
		},
		subscribe: (e) => t.subscribe(e),
		async save(n, r) {
			let i = Ia(e.repositories, n), a = e.namespace(), o = await i.get(a, r.id), s = e.now(), c = o === null ? Math.max(-1, ...(await i.list(a)).map((e) => Ma(K(e), "order", -1))) + 1 : Ma(K(o), "order", 2 ** 53 - 1), l = {
				schema_version: 1,
				id: r.id,
				namespace: a,
				record_key: `${a}:${r.id}`,
				created_at: o?.created_at ?? s,
				updated_at: s,
				payload: J({
					...r.payload,
					display_name: r.display_name,
					...c === 2 ** 53 - 1 ? {} : { order: c }
				})
			};
			await i.put(a, l);
			let u = La(l, n);
			return t.emit({
				type: "asset_upserted",
				asset: u
			}), u;
		},
		async remove(n, r) {
			await Ia(e.repositories, n).delete(e.namespace(), r), t.emit({
				type: "asset_removed",
				category: n,
				asset_id: r
			});
		},
		async reorder(t, n) {
			let r = Ia(e.repositories, t), i = e.namespace(), a = e.now();
			for (let [e, t] of n.entries()) {
				let n = await r.get(i, t);
				n !== null && await r.put(i, {
					...n,
					updated_at: a,
					payload: J({
						...K(n),
						order: e
					})
				});
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/diagnostics_capability.ts
var Ba = 500, Va = class {
	#e = [];
	#t = new Pa();
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
		this.#e.push(t), this.#e.length > Ba && this.#e.shift(), this.#t.emit({
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
function Ha(e) {
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
function Ua(e) {
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
					...Ha(e.settings()),
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
function Wa(e) {
	return {
		status: "available",
		value: e
	};
}
function Y(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function X(e) {
	try {
		return Wa(e());
	} catch (e) {
		return Y(Ga(e));
	}
}
function Ga(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function Ka(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var qa = "capability_unavailable";
function Z(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: qa }), t;
}
//#endregion
//#region src/bootstrap/capabilities/gallery_capability.ts
function Ja(e) {
	switch (e.media_type) {
		case "image/png":
		case "image/jpeg":
		case "image/webp": return e.media_type;
		case "video/mp4": return null;
	}
}
function Ya(e) {
	let t = Ja(e);
	if (t === null) return null;
	let n = v.parse(e.provider_id);
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
function Xa(e) {
	let t = new Pa();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Z(`Gallery record ${t} no longer exists`);
		return n;
	}
	async function r(n) {
		await e.repository.put(e.namespace(), n);
		let r = Ya(n);
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
				let t = Ya(e);
				return t === null ? [] : [t];
			});
		},
		subscribe: (e) => t.subscribe(e),
		async read_bytes(t) {
			let r = await n(t), i = await qe(e.database, r.sha256);
			if (i === null) throw Z(`Gallery record ${t} has no stored bytes; the blob was evicted`);
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
function Za(e) {
	return e.image_count ?? 1;
}
function Qa(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: v.parse(e.provider_id),
		state: e.state,
		image_count: Za(e.arguments),
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function $a(e) {
	return {
		job_id: e.id,
		request_id: e.request_id,
		provider_id: v.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function eo(e) {
	let t = new Pa(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: Qa(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await T({
			queue: e.queue,
			plans: e.plans
		}, {
			...i,
			scene_description: r.prompt
		}, r);
		return n.set(a.job_id, r), Qa(a);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map($a);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return Qa(await se({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw Z(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
			return r({
				...i,
				request_id: e.new_request_id()
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/novelai_capability.ts
var to = 3e4, no = 12e4, ro = 3e4;
function io(e) {
	return {
		load: async () => (await e()).list_models(),
		get_account: async () => (await e()).get_account(AbortSignal.timeout(to)),
		refresh_models: async () => (await e()).refresh_models(AbortSignal.timeout(no)),
		estimate_cost: async (t) => (await e()).estimate_cost(t, AbortSignal.timeout(ro))
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
function ao(e) {
	return At.parse({
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
var oo = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		let e = await this.#e.get_active_chat(), t = _t(ao(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
}, so = "vault_key", co = "novelai_defaults", lo = "prompt_tags", uo = "provider_profile", fo = 2e7;
function po(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function mo(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: fo,
		max_input_asset_bytes: fo,
		...t?.provider_id === e.provider_id ? ka(K(t)[uo]) : {},
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
function ho(e) {
	return {
		...ka(K(e)[uo]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function go(e) {
	let t = K(e), n = ka(t[uo]);
	return {
		id: e.id,
		provider_id: v.parse(e.provider_id),
		display_name: q(t, "display_name", e.id),
		model_id: po(Na(n, "model_allowlist")),
		workflow_id: po(Na(n, "workflow_allowlist")),
		is_default: ja(t, "is_default", !1),
		credential_reference: typeof t.vault_key == "string" ? t[so] : null,
		updated_at: e.updated_at,
		novelai_defaults: vo(e),
		prompt_tags: _o(e)
	};
}
function _o(e) {
	let t = kt.safeParse(K(e)[lo]);
	return t.success ? t.data : null;
}
function vo(e) {
	let t = b.safeParse(K(e)[co]);
	return t.success ? t.data : null;
}
function yo(e) {
	let t = new Pa();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Z(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			let t = await e.repository.list(e.namespace());
			return Promise.all(t.map(async (t) => {
				let n = go(t);
				return n.credential_reference === null ? n : await e.credential_present(n.credential_reference).catch(() => !1) === !1 ? {
					...n,
					credential_reference: null
				} : n;
			}));
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				...K(i ?? { payload: {} }),
				display_name: n.display_name,
				is_default: n.is_default,
				[uo]: J(mo(n, i))
			};
			i !== null && i.provider_id !== n.provider_id && Reflect.deleteProperty(o, so);
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
			if (c === void 0) throw Z(`Provider ${n.provider_id} is unavailable`);
			c.validate_profile(ho(s)), await e.repository.put(r, s);
			let l = go(s);
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
			if (e.secrets === null) throw Z("The selected credential storage backend is unavailable");
			let a = await n(r), o = y(a.namespace, r);
			await e.secrets.write_secret(o, i);
			let s = {
				...a,
				updated_at: e.now(),
				payload: J({
					...K(a),
					[so]: o
				})
			};
			await e.repository.put(a.namespace, s);
			let c = go(s);
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
				payload: J({
					...K(a),
					[co]: b.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = go(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async save_prompt_tags(r, i) {
			let a = await n(r), o = {
				...a,
				updated_at: e.now(),
				payload: J({
					...K(a),
					[lo]: kt.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = go(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async clear_credential(r) {
			let i = await n(r), a = { ...K(i) }, o = a[so];
			Reflect.deleteProperty(a, so), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: J(a)
			};
			await e.repository.put(i.namespace, s);
			let c = go(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = v.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(ho(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof rt ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = K(i)[so];
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
function bo(e) {
	let t = K(e);
	return {
		id: e.id,
		display_name: q(t, "display_name", e.id),
		group: Aa(t, "group"),
		updated_at: e.updated_at
	};
}
function xo(e) {
	return e.flatMap((e) => {
		let t = ka(e), n = Aa(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: Na(t, "triggers").filter((e) => typeof e == "string"),
			replacement: q(t, "replacement", "")
		}];
	});
}
function So(e) {
	return e.flatMap((e) => {
		let t = ka(e), n = Aa(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: q(t, "pattern", ""),
			flags: q(t, "flags", ""),
			replacement: q(t, "replacement", "")
		}];
	});
}
function Co(e) {
	let t = new Pa();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(bo);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw Z(`Prompt preset ${t} no longer exists`);
			let r = K(n);
			return {
				id: n.id,
				display_name: q(r, "display_name", n.id),
				group: Aa(r, "group"),
				fixed_positive_prompt: q(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: q(r, "fixed_negative_prompt", ""),
				replacement_rules: xo(Na(r, "replacement_rules")),
				regex_rules: So(Na(r, "regex_rules"))
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
				payload: J({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = bo(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(ii(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var Q = "The selected credential storage backend is unavailable", wo = "SillyTavern's secret store is unreachable from this page", To = "deepl", Eo = "Listing world info books needs JS-Slash-Runner";
function Do(e) {
	if (e === null) throw Z("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function Oo(e) {
	let t = new Pa(), n = null;
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
				http_acknowledgments: ae(n.gateway.http_acknowledgments, t, (/* @__PURE__ */ new Date()).toISOString())
			} }), e.settings.flush();
		},
		async set_gateway_token(t) {
			if (t.trim().length === 0) throw TypeError("A Gateway token must not be blank");
			if (e.secrets === null) throw Z(Q);
			let n = e.settings.get_settings(), r = te(n.active_namespace);
			return await e.secrets.write_secret(r, t), i({ gateway: {
				...n.gateway,
				token_secret_id: r
			} }), e.settings.flush();
		},
		async set_analysis_key(t) {
			if (t.trim().length === 0) throw TypeError("An API key must not be blank");
			if (e.secrets === null) throw Z(Q);
			await e.secrets.write_secret(ee(e.settings.get_settings().active_namespace), t.trim());
		},
		list_worldbooks() {
			return e.list_worldbooks === null ? Promise.reject(Z(Eo)) : Promise.resolve(e.list_worldbooks());
		},
		async clear_analysis_key() {
			if (e.secrets?.delete_secret === void 0) throw Z(Q);
			await e.secrets.delete_secret(ee(e.settings.get_settings().active_namespace));
		},
		async set_deepl_key(t) {
			if (e.host_secrets === null) throw Z(wo);
			await e.host_secrets.write_secret(To, t.trim());
		},
		async clear_deepl_key() {
			if (e.host_secrets?.delete_secret === void 0) throw Z(wo);
			await e.host_secrets.delete_secret(To);
		},
		async clear_gateway_token() {
			let t = e.settings.get_settings(), n = t.gateway.token_secret_id;
			return n !== null && await e.secrets?.delete_secret?.(n), i({ gateway: {
				...t.gateway,
				token_secret_id: null
			} }), e.settings.flush();
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Z(Q);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Z(Q);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Z(Q);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Z(Q);
			return e.browser_secret_vault.reset();
		},
		set_vocabulary_update_channel(t) {
			return i({ vocabulary_update_channel: t }), e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new st("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-DWLvBeyQ.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-Ci_TsQjp.js");
			return t({
				database: Do(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-Ci_TsQjp.js");
			await n({
				database: Do(e.database),
				archive: t,
				namespace: e.settings.get_settings().active_namespace
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function ko(e) {
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
function Ao(e) {
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
				let n = ko(e);
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
var jo = "tavern-canvas/illustration-slots", Mo = class {
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
function No(e) {
	let t = e?.__TAURITAVERN__?.api?.chatSurface;
	if (typeof t != "object" || !t) return null;
	let n = t;
	return typeof n.isManagedOwnershipRequired == "function" && typeof n.registerParticipant == "function" ? n : null;
}
function Po(e, t) {
	let n = No(e);
	return n === null || !n.isManagedOwnershipRequired() ? !1 : (n.registerParticipant({
		id: jo,
		protocolVersion: 1,
		didCommitContent: ({ mesid: e, element: n, content: r }) => t.commit({
			mesid: e,
			element: n,
			content: r
		})
	}), t.activate(), !0);
}
var Fo = new Mo(), Io = class {
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
function Lo(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Ro(e, t, n) {
	let r = Lo(e, "TavernHelper"), i = Lo(e, "SillyTavern"), a = Lo(e, "fetch"), o = an(r), s = qt(i);
	if (!o.message_swipe_metadata || !o.preset_generation || !o.tavern_regex || !s.main_generation_events || !s.message_swipe_metadata || typeof a != "function") return null;
	let c = new Zt(() => i.getContext(), a);
	return new Io(t, new _n(r, () => c.get_active_chat_id()), c, n);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function zo(e) {
	return typeof e == "object" && !!e;
}
function Bo(e, t) {
	if (!zo(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var Vo = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = Ht(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: Yt(this.#e.getRequestHeaders()),
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
			headers: Yt(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: Yt(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return Bo(n, e);
	}
};
function Ho(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Uo(e, t) {
	return !Ho(e) || typeof t != "function" ? null : new Vo(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
function Wo(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Go(e) {
	let t = Wo(e, "SillyTavern"), n = Wo(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Ko(e) {
	let t = Go(e), n = Wo(t, "extensionSettings"), r = Wo(t, "saveSettingsDebounced");
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
function qo(e) {
	return Uo(Go(e), Wo(e, "fetch"));
}
function Jo(e) {
	return da(Go(e), Wo(e, "fetch"));
}
function Yo(e, t) {
	return Ro(e, t, Fo.active ? Fo : null);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var Xo = "IndexedDB could not be opened, so nothing that persists records can be composed", Zo = "No usable SillyTavern + TavernHelper host pair was detected", Qo = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair";
function $o() {
	return navigator.storage.estimate();
}
function es() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"/workers/vocabulary_worker.js",
		"" + import.meta.url
	), { type: "module" });
}
async function ts(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-DW2-o2Va.js"), o = {
		novelai: new r(),
		sd_webui: new a(),
		openai_image: new i(),
		google_image: new n()
	};
	if (e !== null) {
		let n = Ge(e);
		o.comfyui = new t({ workflow_store: { async load(e) {
			return (await n.comfy_workflows.get("primary", e))?.payload;
		} } });
	}
	return o;
}
function ns(e, t) {
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
function rs(e) {
	return Ke.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function is(e, t) {
	return {
		async put_image(n) {
			return { id: (await Ye(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: rs(n.metadata)
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
async function as(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = Fn(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(Ka(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(Z(r))
		};
	}
	let c = e.probe.ready ? e.probe.matrix : {}, l = Yo(t, c), u = [], d = null;
	try {
		d = await (e.open_storage ?? We)();
	} catch {
		d = null;
	}
	let f = Ko(t), p = f === null ? null : sa(f), m = () => p?.get_settings().active_namespace ?? "primary", h = () => (/* @__PURE__ */ new Date()).toISOString(), g = qo(t), v = Jo(t), y;
	try {
		y = (e.create_browser_secret_vault ?? nt)(t);
	} catch {
		y = null;
	}
	y !== null && a.push(() => y.close());
	let b = tt(t);
	b !== null && a.push(() => b.close());
	let x = new fa({
		mode: () => p?.get_settings().credential_storage_mode ?? "host",
		host_destination: g,
		host_resolver: v,
		browser_vault: y,
		device_vault: b
	}), S = x.has_destination ? x : null, te = x.has_resolver ? x : null, C = d === null ? null : Ge(d), w = new Va(), ne = null, re = () => ne ??= ts(d), ie = null, ae = async () => {
		if (C === null || p === null) return null;
		let e = p.get_settings().active_provider_profile_id, t = e === null ? null : await C.provider_profiles.get(m(), e).catch(() => null), n = t === null ? null : ls(t, te !== null);
		return ie = n?.provider_id ?? null, n;
	};
	await ae();
	let oe = async () => {
		let e = await ae();
		if (e === null) throw Error("No provider profile is active; choose one in Settings");
		return e;
	}, se = null, T = C === null || d === null ? null : () => se ??= import("./chunks/novelai_runtime-BqG3ecoF.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: C.novelai_vibe_encodings,
		provider_inputs: C.provider_input_assets,
		namespace: m,
		gallery_assets: ns(d, m),
		transport: () => us(async () => ds((await ae())?.direct_cloud ?? null, te, e.provider_fetch)),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), ue = T === null || d === null ? null : { async read(e, t) {
		try {
			return await ns(d, m).read(e, t);
		} catch {
			return (await T()).assets.read(e, t);
		}
	} }, fe = T === null ? null : async (e) => e.provider_id === "novelai" ? (await T()).prepare(e, AbortSignal.timeout(ss)) : e, pe = o("novelai", T === null ? Y(Xo) : X(() => io(async () => (await T()).service)), r.novelai), me = o("settings", p === null ? Y(Qo) : X(() => Oo({
		settings: p,
		database: d,
		extension_version: n,
		secrets: S,
		browser_secret_vault: y,
		host_secrets: g,
		list_worldbooks: l === null ? null : () => l.list_worldbooks()
	})), r.settings), he = o("profiles", C === null ? Y(Xo) : X(() => yo({
		repository: C.provider_profiles,
		namespace: m,
		load_adapters: re,
		secrets: S,
		credential_present: async (e) => S === null || (p?.get_settings().credential_storage_mode ?? "host") === "host" ? null : S.probe_secret(e),
		now: h
	})), r.profiles), E = o("prompt_presets", C === null ? Y(Xo) : X(() => Co({
		repository: C.prompt_presets,
		namespace: m,
		now: h,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), ge = o("assets", C === null ? Y(Xo) : X(() => za({
		repositories: C,
		namespace: m,
		now: h
	})), r.assets), _e = o("gallery", d === null ? Y(Xo) : X(() => Xa({
		database: d,
		repository: new Xe(d),
		namespace: m,
		now: h,
		reveal_message: l === null ? null : (e, t) => {
			if (l.get_active_chat_id() !== e) return "other_chat";
			let n = l.find_message_element(t)?.closest(".mes");
			return n == null ? "not_found" : (n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), "revealed");
		}
	})), r.gallery), ve = null, ye = o("generation", d === null ? Y(Xo) : l === null ? Y(Zo) : X(() => {
		let t = p?.get_settings().gateway ?? null, n = (e) => Ea({
			gateway_endpoint: t?.endpoint ?? null,
			http_acknowledgments: t?.http_acknowledgments ?? {},
			direct_provider_base_url: e?.base_url ?? null,
			direct_cloud: e?.direct_cloud ?? null
		}), r = t?.endpoint == null ? null : n(null), i = new ce(), o = {
			store: is(d, m),
			ids: { next: () => crypto.randomUUID() },
			clock: { now: h },
			resolve_source_message: (e) => {
				let t = ve?.source_of(e.request_id) ?? null;
				return t === null ? null : {
					chat_id: t.chat_id,
					message_id: String(t.message_id),
					swipe_id: t.swipe_id
				};
			}
		}, c = new Bt({
			executor: r?.kind === "gateway" ? hs({
				...o,
				endpoint: r.endpoint,
				http_acknowledgments: t?.http_acknowledgments ?? {},
				access_token: ms(t?.token_secret_id ?? null, te),
				plans: i,
				...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
			}) : new le({
				...o,
				load_adapters: re,
				profiles: { resolve: async (e) => {
					let t = (await re())[e], n = await ae();
					if (t === void 0 || n?.provider_id !== e) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(ho(n.record));
				} },
				transport: us(async () => os(n(await ae()), {
					secrets: te,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				})),
				assets: ue ?? ns(d, m),
				...T === null ? {} : { postprocess: async (e, t) => e.provider_id === "novelai" && e.action === "infill" ? (await T()).finish(e, t, AbortSignal.timeout(ss)) : t },
				log: { write: () => {} },
				plans: i
			}),
			persistence: new de(d, m()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new jt(),
			global_concurrency: p?.get_settings().global_concurrency ?? 1
		});
		a.push(w.observe_jobs(c));
		let f = eo({
			queue: c,
			plans: i,
			jobs: Ge(d).generation_jobs,
			namespace: m,
			origin: new oo(l, new ht(globalThis.crypto)),
			new_request_id: () => s.parse(crypto.randomUUID()),
			...fe === null ? {} : { prepare_request: fe }
		});
		return p !== null && (ve = new ki({
			host: l,
			settings: () => p.get_settings().illustration,
			auto_generation_enabled: () => p.get_settings().auto_generation_enabled,
			prompt_context: () => Fi(E, ge, p.get_settings().illustration.prompt_preset_id),
			async build_request({ positive_prompt: e, negative_prompt: t, character_prompts: n }) {
				let r = await oe(), [{ build_generation_request: i }, a, o, c] = await Promise.all([
					import("./chunks/build_generation_request-BbaXLzyG.js"),
					import("./chunks/character_assets-C_vsqVcv.js"),
					import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r),
					ge.load()
				]), l = Pi(c), u = (e) => o.inject_prompt_tags(e, o.effective_prompt_tags({
					provider_id: r.provider_id,
					model_id: r.model_id,
					prompt_tags: _o(r.record)
				}), o.prompt_tag_presets(c.prompt_tag)), d = vi(n.map((e) => e.name), l), f = a.attach_character_loras(await i({
					provider_id: r.provider_id,
					positive_prompt: e,
					negative_prompt: t,
					image_count: 1,
					references: [],
					...r.model_id === null ? {} : { model_id: r.model_id }
				}, s.parse(crypto.randomUUID())), d, l.loras);
				if (f.provider_id !== "novelai" || f.action !== "generate" || T === null || C === null) return u(f);
				let [{ apply_novelai_defaults: p }, { reference_image_bytes: h }, g] = await Promise.all([
					import("./chunks/novelai_profile_defaults-CKb8rSMX.js"),
					import("./chunks/reference_image-DYyYuujP.js").then((e) => e.n),
					T()
				]), _ = vo(r.record), v = _ === null ? f : await p(f, _, {
					store_input: (e) => g.store_input(e),
					async load_vibe(e) {
						let t = await C.novelai_vibes.get(m(), e), n = t === null ? {} : K(t);
						return typeof n.image == "string" ? {
							image_bytes: h(n.image),
							strength: Ma(n, "strength", .6),
							information_extracted: Ma(n, "information_extracted", 1)
						} : null;
					}
				});
				return u(await a.attach_character_references(v, d, { store_reference: (e) => g.store_input(h(e)) }));
			},
			async build_edit_request(e) {
				let t = await ae();
				if (t?.provider_id !== "novelai" || T === null) throw Error("Quick edits need an active NovelAI provider profile");
				let [{ build_novelai_edit_request: n }, { compute_generation_anchor: r }, { DEFAULT_NOVELAI_MODEL_ID: i }, a, o] = await Promise.all([
					import("./chunks/slot_edits-C3je5LXd.js"),
					import("./chunks/build_generation_request-BbaXLzyG.js"),
					import("./chunks/novelai_request_defaults-B0sJ9ANr.js").then((e) => e.r),
					import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r),
					ge.load()
				]), c = (e) => a.inject_prompt_tags(e, a.effective_prompt_tags({
					provider_id: t.provider_id,
					model_id: t.model_id,
					prompt_tags: _o(t.record)
				}), a.prompt_tag_presets(o.prompt_tag)), l = s.parse(crypto.randomUUID()), u = {
					request_id: l,
					generation_anchor: _.parse(await r(l)),
					model_id: t.model_id ?? i
				};
				if (e.kind !== "inpaint") return c(n(e, u));
				let d = await T();
				return c(n(e, {
					...u,
					mask_asset_id: await d.store_input(e.mask_png)
				}));
			},
			edits_available: () => ie === "novelai",
			resolve_analysis_key() {
				if (te === null) throw Error(cs);
				return te.resolve_secret(ee(p.get_settings().active_namespace));
			},
			async submit(e) {
				let t = await oe();
				return n(t), (await f.submit({
					profile_id: t.record.id,
					request: e
				})).request_id;
			},
			jobs: c,
			new_slot_id: ji,
			new_generation_id: () => crypto.randomUUID()
		}), u.push(new Ii(ve, l))), f;
	}), r.generation), be = e.create_vocabulary_worker === void 0 ? es() : e.create_vocabulary_worker, xe = o("vocabulary", d === null ? Y(Xo) : be === null ? Y("This host has no Worker constructor, so vocabulary search cannot run") : X(() => Ao({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-CP8T0tPf.js");
			return new e({
				current_extension_version: n,
				open_database_impl: () => Promise.resolve(d)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-CosQgzEr.js");
			return new e({ create_worker: be });
		}
	})), r.vocabulary);
	return {
		capabilities: {
			generation: ye,
			profiles: he,
			prompt_presets: E,
			assets: ge,
			gallery: _e,
			vocabulary: xe,
			diagnostics: o("diagnostics", X(() => Ua({
				capability_matrix: c,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: w,
				resolutions: () => i,
				settings: () => p?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? $o,
				extension_version: n,
				probe_gateway: null
			})), r.diagnostics),
			settings: me,
			novelai: pe
		},
		resolutions: i,
		host: l,
		illustrations: ve,
		translator: l === null || p === null ? null : Gi({
			host: l,
			settings: () => p.get_settings().translation,
			vocabulary: xe
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
function os(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = St(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new ya({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new wa({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
		default: throw Error(`The selected ${e.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`);
	}
}
var ss = 12e4, cs = "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";
function ls(e, t) {
	let n = v.safeParse(e.provider_id).data;
	if (n === void 0) return null;
	let r = K(e);
	return {
		record: e,
		provider_id: n,
		model_id: Na(ka(r.provider_profile), "model_allowlist").find((e) => typeof e == "string") ?? null,
		base_url: Aa(r, "base_url"),
		direct_cloud: {
			provider_id: n,
			credential_reference: Aa(r, so),
			secrets_readable: t
		}
	};
}
function us(e) {
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
function ds(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new et("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new et("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new et("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return os({
		kind: "direct_cloud",
		provider_id: "novelai",
		credential_reference: e.credential_reference
	}, {
		secrets: t,
		...n === void 0 ? {} : { fetch: n }
	});
}
var fs = "A Gateway endpoint is configured but no Gateway access token is stored; set one in Settings > Gateway, or clear the endpoint to generate directly", ps = "This host cannot reveal stored credentials, so the Gateway access token cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml, or clear the Gateway endpoint to generate directly";
function ms(e, t) {
	if (e === null) throw Error(fs);
	if (t === null) throw Error(ps);
	return () => t.resolve_secret(e);
}
function hs(e) {
	let t = null;
	return { async execute(n, r) {
		let { GatewayJobExecutor: i } = await (t ??= import("./chunks/gateway_job_executor-CDaQAtpn.js"));
		return new i(e).execute(n, r);
	} };
}
//#endregion
//#region src/bootstrap/startup_error.ts
var gs = "https://github.com/N0VI028/JS-Slash-Runner";
function _s(e) {
	if (e.ready) return {
		state: "ready",
		title: "Inkwell ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${vn} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: gs
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `Inkwell could not verify the installed version. ${t}`,
			update_url: gs
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: gs
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: gs
		};
	}
}
function vs() {
	return {
		state: "failed",
		title: "Inkwell could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function ys(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = kn(n), i, a, o = null, s = !1;
	try {
		o = await as({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new ut([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = _s(r);
	else if (s) i = "failed", a = vs();
	else try {
		await c?.start_all(), i = "ready", a = _s(r);
	} catch {
		i = "failed", a = vs();
	}
	let l = Jr(t, e.stylesheet ?? ""), u = je(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = we(Wr, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities,
		host: o?.host ? xe(o.host) : null,
		illustrations: o?.illustrations ? xe(o.illustrations) : null,
		translator: o?.translator ?? null
	}), p = qr(t);
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
function $(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function bs(e) {
	let t = $(e, "SillyTavern"), n = $(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = $(r, "eventSource"), a = $($(r, "eventTypes"), "APP_READY"), o = $(i, "on"), s = $(i, "removeListener");
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
var xs = ":host{--tc-canvas:#edf0f5;--tc-surface:#fff;--tc-surface-raised:#f3f6fa;--tc-text:#141923;--tc-text-muted:#596578;--tc-divider:#ccd4df;--tc-accent:#2f5af5;--tc-accent-hover:#244bd6;--tc-on-accent:#fff;--tc-success:#157b59;--tc-warning:#946100;--tc-error:#c23838;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#080b10;--tc-surface:#10151c;--tc-surface-raised:#181f29;--tc-text:#f5f7fa;--tc-text-muted:#9ca8b8;--tc-divider:#2b3441;--tc-accent:#7898ff;--tc-accent-hover:#8aa6ff;--tc-on-accent:#080b10;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", Ss = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", Cs = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", ws = "@keyframes _tc-icon-rotate_4cnmf_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_4cnmf_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_4cnmf_42{width:28px;height:28px}._iconButtonMd_4cnmf_47{width:32px;height:32px}._iconButtonLg_4cnmf_52{width:40px;height:40px}._iconButton_4cnmf_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_4cnmf_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_4cnmf_65{color:var(--tc-error)}._iconButtonDestructive_4cnmf_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_4cnmf_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_4cnmf_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_4cnmf_84:disabled{opacity:.5}._appButtonContent_4cnmf_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_4cnmf_107{visibility:hidden}._appButtonLabel_4cnmf_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_4cnmf_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_4cnmf_118 svg{animation:_tc-icon-rotate_4cnmf_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_4cnmf_136{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent)}._appButtonPrimary_4cnmf_136:hover:not(:disabled){background-color:var(--tc-accent-hover);border-color:var(--tc-accent-hover)}._appButtonSecondary_4cnmf_147{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_4cnmf_147:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_4cnmf_156{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_4cnmf_156:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_4cnmf_169{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_4cnmf_178{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_4cnmf_178:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_4cnmf_178[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_4cnmf_199{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_4cnmf_210{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_4cnmf_210[data-disabled]{cursor:not-allowed}._switchLabelGroup_4cnmf_222{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_4cnmf_222{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_4cnmf_234{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_4cnmf_247{background-color:var(--tc-surface-raised);border-color:var(--tc-text-muted);border-radius:999px;flex:none;width:40px;height:24px;position:relative}._switchRoot_4cnmf_247[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_4cnmf_247:disabled{opacity:.5}._switchThumb_4cnmf_266{border:1px solid var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;border-radius:50%;display:block;transform:translate(2px)}._switchThumb_4cnmf_266[data-state=checked]{border-color:var(--tc-accent);transform:translate(18px)}._checkboxRow_4cnmf_293{cursor:pointer;align-items:center;gap:8px;display:inline-flex}._checkboxRow_4cnmf_293[data-disabled]{cursor:not-allowed}._checkboxBox_4cnmf_311{border-radius:var(--tc-radius-status);border-color:var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;color:var(--tc-on-accent);transition:background-color var(--tc-motion-fast) ease-out;flex:none;justify-content:center;align-items:center;display:inline-flex}._checkboxBox_4cnmf_311[data-state=checked],._checkboxBox_4cnmf_311[data-state=indeterminate]{border-color:var(--tc-accent);background-color:var(--tc-accent)}._checkboxBox_4cnmf_311:disabled{opacity:.5}._checkboxIndicator_4cnmf_335{justify-content:center;align-items:center;display:inline-flex}._checkboxLabel_4cnmf_341{color:var(--tc-text);overflow-wrap:anywhere}._numberStepper_4cnmf_355{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-self:start;align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_4cnmf_365{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_4cnmf_365:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_4cnmf_365:disabled{color:var(--tc-text-muted)}._numberStepperInput_4cnmf_383{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_4cnmf_383:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_4cnmf_402{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_4cnmf_402:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_4cnmf_402[data-placeholder]{color:var(--tc-text-muted)}._selectValue_4cnmf_424{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_4cnmf_433{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;width:var(--reka-select-trigger-width);max-width:var(--reka-select-content-available-width);overflow:hidden}._selectViewport_4cnmf_444{padding:4px}._selectItem_4cnmf_448{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding:6px 8px;display:flex}._selectItemText_4cnmf_461{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectItem_4cnmf_448[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_4cnmf_448:focus-visible,._selectItem_4cnmf_448:focus{outline-color:var(--tc-accent)}._selectItem_4cnmf_448[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_4cnmf_483{color:var(--tc-accent);flex-shrink:0;display:inline-flex}._fieldGroup_4cnmf_493{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_4cnmf_499{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_4cnmf_505{color:var(--tc-error)}._fieldGroupHint_4cnmf_509{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_4cnmf_516{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_4cnmf_527{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_4cnmf_534{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_4cnmf_552{gap:16px}._dialogHeader_4cnmf_556{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_4cnmf_563{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_4cnmf_570{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_4cnmf_570:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_4cnmf_583{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_4cnmf_589{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_4cnmf_595{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_4cnmf_605{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_4cnmf_616{fill:var(--tc-text)}._stateSurface_4cnmf_624{flex-direction:column;padding:4px 0;display:flex}._stateSurfaceSkeleton_4cnmf_630{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_4cnmf_637{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_4cnmf_643{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;padding:16px;display:flex}._stateSurfaceMessageGroup_4cnmf_656{flex-direction:column;gap:4px;display:flex}._stateSurfaceMessageTitle_4cnmf_662{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:500}._stateSurfaceMessageText_4cnmf_670{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_4cnmf_677{color:var(--tc-error)}._stateSurfaceAction_4cnmf_681{display:flex}._toastViewport_4cnmf_689{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_4cnmf_703{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_4cnmf_714{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_4cnmf_721{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_4cnmf_727{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_4cnmf_727:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_4cnmf_742{border-color:var(--tc-success)}._toastSuccess_4cnmf_742 ._toastTitle_4cnmf_714{color:var(--tc-success)}._toastError_4cnmf_750{border-color:var(--tc-error)}._toastError_4cnmf_750 ._toastTitle_4cnmf_714{color:var(--tc-error)}._virtualList_4cnmf_762{position:relative;overflow-y:auto}._virtualListSizer_4cnmf_767{width:100%;position:relative}._virtualListItem_4cnmf_772{width:100%;position:absolute;top:0;left:0}._promptTagChip_4cnmf_783{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);max-width:100%;color:var(--tc-text-muted);align-items:stretch;font-size:12px;display:inline-flex}._promptTagChip_4cnmf_783[data-enabled]{color:var(--tc-text)}._promptTagTrigger_4cnmf_798{min-width:0;color:inherit;white-space:nowrap;text-overflow:ellipsis;background:0 0;border:0;padding:4px 8px;overflow:hidden}._promptTagToggle_4cnmf_809{border:0;border-left:1px solid var(--tc-divider);color:var(--tc-text-muted);background:0 0;align-items:center;padding:0 6px;display:inline-flex}._promptTagToggle_4cnmf_809[aria-pressed=true]{color:var(--tc-accent)}._promptTagContent_4cnmf_823{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:min(420px,90vw);max-height:360px;padding:4px;overflow-y:auto}._promptTagGroup_4cnmf_834+._promptTagGroup_4cnmf_834{border-top:1px solid var(--tc-divider);margin-top:4px}._promptTagGroupTitle_4cnmf_839{color:var(--tc-text-muted);margin:0;padding:6px 8px 2px;font-size:12px;font-weight:600}._promptTagOption_4cnmf_847{border-radius:var(--tc-radius-status);width:100%;color:var(--tc-text);text-align:left;background:0 0;border:0;flex-direction:column;gap:2px;padding:6px 8px;display:flex}._promptTagOption_4cnmf_847:hover,._promptTagOption_4cnmf_847[aria-pressed=true]{background-color:var(--tc-surface-raised)}._promptTagOptionLabel_4cnmf_865{align-items:center;gap:4px;font-size:13px;display:inline-flex}._promptTagOptionText_4cnmf_872{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._promptTagOptionTextClamped_4cnmf_878{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}", Ts = "._body_x0blj_1{flex-direction:column;gap:16px;max-height:min(70vh,720px);display:flex;overflow-y:auto}._slot_x0blj_9{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._anchor_x0blj_19{border-inline-start:2px solid var(--tc-divider);color:var(--tc-text-muted);margin:0;padding-inline-start:10px;font-size:13px}._scene_x0blj_27{margin:0;font-size:14px}._label_x0blj_32{color:var(--tc-text-muted);flex-direction:column;gap:4px;font-size:13px;display:flex}._prompt_x0blj_40{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background:var(--tc-surface);min-height:72px;color:var(--tc-text);font:inherit;resize:vertical;padding:8px;font-size:13px}._meta_x0blj_52{color:var(--tc-text-muted);flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:13px;display:flex}._error_x0blj_61{color:var(--tc-error);margin:0}._excerpt_x0blj_66{border-radius:var(--tc-radius-field);background:var(--tc-surface-raised);white-space:pre-wrap;max-height:160px;margin:0;padding:8px;font-family:monospace;font-size:12px;overflow:auto}._footer_x0blj_78{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;display:flex}._total_x0blj_86{color:var(--tc-text-muted);margin-inline-end:auto;font-size:13px}._chips_x0blj_92{justify-content:flex-end;margin-top:-4px;display:flex}", Es = "._inpaintDialogContent_677ep_13{width:min(90vw,720px)}._inpaintBody_677ep_17{flex-direction:column;gap:12px;width:100%;display:flex}._inpaintCanvasFrame_677ep_27{width:100%;aspect-ratio:var(--tc-inpaint-aspect,1);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);touch-action:none;position:relative;overflow:hidden}._inpaintCanvasFrame_677ep_27 canvas{width:100%;height:100%;position:absolute;inset:0}._inpaintToolbar_677ep_45{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._inpaintToolbarDivider_677ep_52{background-color:var(--tc-divider);align-self:stretch;width:1px;margin:0 4px}._inpaintBrushRow_677ep_59{align-items:center;gap:12px;display:flex}._inpaintBrushRow_677ep_59>*{flex:1}._inpaintPromptGrid_677ep_69{grid-template-columns:1fr 1fr;gap:12px;display:grid}._inpaintFooter_677ep_75{justify-content:flex-end;gap:8px;display:flex}._inpaintDimensionError_677ep_81{color:var(--tc-error);margin:0;font-size:12px}", Ds = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", Os = "._window_1rdvc_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid color-mix(in srgb, var(--tc-divider) 78%, var(--tc-text) 22%);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;border-radius:12px;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1rdvc_1;position:fixed;top:0;left:0;overflow:hidden;box-shadow:0 32px 96px #080b104d,0 8px 28px #080b102e}._window_1rdvc_1[data-positioned=false]{visibility:hidden}._window_1rdvc_1[data-dragging=true]{-webkit-user-select:none;user-select:none;box-shadow:0 40px 112px #080b105c,0 12px 36px #080b1038}@keyframes _floating-window-enter_1rdvc_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1rdvc_1{border-radius:10px;width:auto;height:auto;min-height:0;inset:8px;transform:none}._window_1rdvc_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1rdvc_1{animation:none}}", ks = "._shell_1b5w2_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_1b5w2_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_1b5w2_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_1b5w2_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_1b5w2_57{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);cursor:move;touch-action:none;grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:16px;display:flex}._top_bar_start_1b5w2_71,._top_bar_end_1b5w2_72{align-items:center;gap:8px;min-width:0;display:flex}._top_bar_brand_1b5w2_79{color:var(--tc-text);flex:none;font-size:13px;font-weight:650}._top_bar_divider_1b5w2_86{color:var(--tc-divider);flex:none}._top_bar_title_1b5w2_91{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-weight:500;overflow:hidden}._icon_button_1b5w2_100{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._shell_1b5w2_8[data-viewport=mobile] ._top_bar_1b5w2_57{cursor:default;touch-action:auto}._icon_button_1b5w2_100._close_button_1b5w2_116:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_1b5w2_100[data-selected=true],._icon_button_1b5w2_100[aria-pressed=true]{color:var(--tc-accent)}._rail_1b5w2_126{background-color:var(--tc-surface);border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:6px;padding:12px 8px;display:flex;overflow:hidden auto}._rail_button_1b5w2_139{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_1b5w2_139[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_1b5w2_158{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_1b5w2_166{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_1b5w2_176{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_1b5w2_185{background-color:var(--tc-surface);border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_1b5w2_194{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_1b5w2_194:hover,._inspector_resizer_1b5w2_194[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_1b5w2_207{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_1b5w2_215{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_1b5w2_224{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_1b5w2_232{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_1b5w2_232{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_1b5w2_232 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_1b5w2_232 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_1b5w2_258{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_1b5w2_267{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_1b5w2_267[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_1b5w2_283{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._sheet_overlay_1b5w2_291{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_1b5w2_298{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_1b5w2_312{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_1b5w2_324{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_1b5w2_333{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_1b5w2_41{background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_1b5w2_350{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_1b5w2_358{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_1b5w2_367{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_1b5w2_374{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_1b5w2_386{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_1b5w2_386[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_1b5w2_386[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_1b5w2_386[data-status=error]{background-color:var(--tc-error)}._task_chip_label_1b5w2_406{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_1b5w2_413{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_1b5w2_418{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_1b5w2_430{width:min(560px,100vw - 40px);max-height:calc(100dvh - 40px);color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid var(--tc-divider);border-radius:12px;flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex;position:fixed;top:20px;right:20px;overflow:auto;box-shadow:0 20px 56px #11131838}._state_screen_eyebrow_1b5w2_449{color:var(--tc-text-muted)}._state_screen_title_1b5w2_453{max-width:56ch}._state_screen_action_1b5w2_457{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_1b5w2_467{max-width:56ch;color:var(--tc-text-muted)}", As = "._assetsView_10uyv_10{flex-direction:column;gap:16px;height:100%;min-height:0;padding:16px;display:flex}._tabsList_10uyv_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;gap:4px;padding-bottom:0;display:flex}._tabsTrigger_10uyv_31{border-radius:var(--tc-radius-field) var(--tc-radius-field) 0 0;color:var(--tc-text-muted);transition:color var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out;background-color:#0000;border:1px solid #0000;border-bottom-width:2px;padding:8px 14px;font-size:13px;font-weight:500}._tabsTrigger_10uyv_31:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._tabsTrigger_10uyv_31[data-state=active]{color:var(--tc-accent);border-bottom-color:var(--tc-accent)}._tabsContent_10uyv_55{flex:1;min-height:0;overflow-y:auto}._tabsContent_10uyv_55:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._categoryList_10uyv_70{flex-direction:column;gap:12px;padding:12px 0;display:flex}._categoryToolbar_10uyv_77{flex-wrap:wrap;align-items:center;gap:12px;display:flex}._searchInput_10uyv_84{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);min-width:160px;color:var(--tc-text);flex:1;padding:8px 12px;font-size:13px}._searchInput_10uyv_84:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reorderHint_10uyv_100{color:var(--tc-text-muted);font-size:12px}._emptyDescription_10uyv_105{color:var(--tc-text-muted);font-size:13px}._cardGrid_10uyv_110{flex-direction:column;gap:8px;display:flex}._assetCard_10uyv_120{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);flex-wrap:wrap;align-items:center;gap:8px;padding:6px 8px;display:flex}._assetCard_10uyv_120[data-dragging]{border-color:var(--tc-accent)}._dragHandle_10uyv_135{color:var(--tc-text-muted);cursor:grab;flex:none;padding:4px;display:inline-flex}._assetCardMain_10uyv_147{border-radius:var(--tc-radius-field);text-align:left;min-width:0;transition:background-color var(--tc-motion-fast) ease-out;background-color:#0000;flex-direction:column;flex:160px;align-items:flex-start;gap:2px;padding:2px 4px;display:flex}._assetCardMain_10uyv_147:hover{background-color:var(--tc-surface-raised)}._assetCardName_10uyv_165{color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13px;font-weight:500;overflow:hidden}._assetCardSummary_10uyv_175{color:var(--tc-text-muted);flex-wrap:wrap;gap:8px;font-size:12px;display:flex}._assetCardSummaryPart_10uyv_183{white-space:nowrap}._assetCardActions_10uyv_187{flex:none;align-items:center;gap:8px;margin-left:auto;display:flex}._form_10uyv_199{flex-direction:column;gap:14px;display:flex}._textInput_10uyv_205,._textArea_10uyv_206{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;color:var(--tc-text);padding:8px 10px;font-family:inherit;font-size:13px}._textArea_10uyv_206{resize:vertical;min-height:72px}._textInput_10uyv_205:focus-visible,._textArea_10uyv_206:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._formError_10uyv_228{color:var(--tc-error);margin:0;font-size:12px}._formActions_10uyv_234{justify-content:flex-end;gap:8px;display:flex}._vocabularyPanel_10uyv_244{flex-direction:column;gap:20px;display:flex}._vocabularySearchRow_10uyv_250{gap:8px;display:flex}._searchResultsList_10uyv_255{flex-direction:column;gap:4px;display:flex}._searchResultRow_10uyv_261{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 4px;display:flex}._searchResultTag_10uyv_270{color:var(--tc-text);font-size:13px}._searchResultTranslation_10uyv_275{color:var(--tc-text-muted);font-size:12px}._loadMoreRow_10uyv_280{justify-content:center;padding-top:4px;display:flex}._sectionTitle_10uyv_286{color:var(--tc-text);font-size:13px;font-weight:600}._catalogList_10uyv_292{flex-direction:column;gap:8px;display:flex}._catalogEntry_10uyv_298{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 4px;display:flex}._catalogEntryInfo_10uyv_307{flex-direction:column;gap:2px;min-width:0;display:flex}._catalogEntryName_10uyv_314{color:var(--tc-text);font-size:13px;font-weight:500}._catalogEntryMeta_10uyv_320{color:var(--tc-text-muted);font-size:12px}._bundledBadge_10uyv_325{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);align-items:center;padding:2px 6px;font-size:11px;display:inline-flex}._nsfwSection_10uyv_335{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:8px 12px}._nsfwToggle_10uyv_341{color:var(--tc-text-muted);background:0 0;align-items:center;gap:6px;padding:4px 0;font-size:12px;display:flex}._nsfwNotice_10uyv_351{color:var(--tc-text-muted);padding:8px 0 0;font-size:12px}._installProgress_10uyv_357{color:var(--tc-text-muted);font-size:12px}._workflowToolbarRow_10uyv_366{flex-wrap:wrap;gap:8px;display:flex}._placeholderList_10uyv_372{flex-direction:column;gap:8px;display:flex}._placeholderRow_10uyv_378{align-items:center;gap:8px;display:flex}._placeholderKey_10uyv_384{width:40%;color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;flex:none;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:hidden}._hiddenFileInput_10uyv_395{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}._reference_thumbnail_10uyv_407{border-radius:var(--tc-radius-image);object-fit:contain;max-width:160px;max-height:160px;margin-bottom:8px;display:block}", js = "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}", Ms = "._galleryView_1wzts_10{flex-direction:column;gap:12px;height:100%;min-height:0;padding:16px;display:flex}._filterBar_1wzts_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:16px;padding-bottom:12px;display:flex}._dateFilterLabel_1wzts_32{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:flex}._dateInput_1wzts_43{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);color:var(--tc-text);padding:6px 8px;font-size:12px}._cacheOccupancy_1wzts_52{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._emptyDescription_1wzts_58{color:var(--tc-text-muted);font-size:13px}._skeletonGrid_1wzts_67{flex-wrap:wrap;gap:8px;display:flex}._skeletonTile_1wzts_73{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);width:176px;height:176px}._gridContainer_1wzts_84{flex:1;min-height:0}._gridRow_1wzts_89{display:flex}._tile_1wzts_93{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);flex:none;position:relative;overflow:hidden}._tile_1wzts_93[data-selected]{outline:2px solid var(--tc-accent);outline-offset:-2px}._tileButton_1wzts_106{width:100%;height:100%;padding:0;display:block}._tileSkeleton_1wzts_113{background-color:var(--tc-surface-raised);position:absolute;inset:0}._tileImage_1wzts_119{object-fit:cover;width:100%;height:100%;transition:opacity var(--tc-motion-normal) ease-out}._tileFallback_1wzts_126{color:var(--tc-text-muted);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:8px;font-size:11px;display:flex;position:absolute;inset:0}._tilePinnedBadge_1wzts_144{border-radius:var(--tc-radius-status);background-color:var(--tc-media-scrim);color:var(--tc-media-ink);justify-content:center;align-items:center;padding:3px;display:inline-flex;position:absolute;top:6px;left:6px}._tileSelectToggle_1wzts_157{border-radius:var(--tc-radius-status);border:1px solid var(--tc-media-ink);background-color:var(--tc-media-scrim);width:20px;height:20px;color:var(--tc-media-ink);transition:background-color var(--tc-motion-fast) ease-out;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:6px;right:6px}._tileSelectToggle_1wzts_157[data-checked]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._bulkActionBar_1wzts_184{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding-top:12px;display:flex}._bulkActionCount_1wzts_193{color:var(--tc-text);font-size:13px}._bulkActionButtons_1wzts_198{align-items:center;gap:8px;display:flex}._previewOverlay_1wzts_208{z-index:var(--tc-z-overlay);background-color:#111318b8;position:fixed;inset:0}._previewContent_1wzts_215{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);display:flex;position:fixed;inset:16px;overflow:hidden}._previewLayout_1wzts_225{width:100%;min-height:0;display:flex}._previewMain_1wzts_231{flex-direction:column;flex:1;min-width:0;display:flex}._previewToolbar_1wzts_238{border-bottom:1px solid var(--tc-divider);align-items:center;gap:4px;padding:8px;display:flex}._previewToolbarButton_1wzts_246{border-radius:var(--tc-radius-field);width:32px;height:32px;color:var(--tc-text);justify-content:center;align-items:center;display:inline-flex}._previewToolbarButton_1wzts_246:hover{background-color:var(--tc-surface-raised)}._previewToolbarSpacer_1wzts_260{flex:1}._previewImageArea_1wzts_264{flex:1;justify-content:center;align-items:center;gap:8px;min-height:0;padding:12px;display:flex;overflow:auto}._previewImageFrame_1wzts_275{flex:1;justify-content:center;align-items:center;height:100%;min-height:0;display:flex;position:relative}._previewImage_1wzts_264{border-radius:var(--tc-radius-image);object-fit:contain;touch-action:auto;max-width:100%;max-height:100%}._previewImageFallback_1wzts_293{color:var(--tc-text-muted);justify-content:center;align-items:center;padding:24px;font-size:13px;display:flex}._previewNavButton_1wzts_302{flex:none}._previewInspector_1wzts_306{border-left:1px solid var(--tc-divider);flex:none;width:320px;max-width:40vw;padding:16px;overflow-y:auto}._metadataInspector_1wzts_319{flex-direction:column;gap:12px;display:flex}._metadataTitle_1wzts_325{color:var(--tc-text);font-size:14px;font-weight:600}._metadataOrphanNotice_1wzts_331{color:var(--tc-warning);font-size:12px}._metadataList_1wzts_336{flex-direction:column;gap:8px;display:flex}._metadataRow_1wzts_342{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding-bottom:6px;font-size:12px;display:flex}._metadataRow_1wzts_342 dt{color:var(--tc-text-muted)}._metadataRow_1wzts_342 dd{color:var(--tc-text);margin:0}._metadataPrompt_1wzts_360{white-space:pre-wrap;overflow-wrap:anywhere}._metadataEmpty_1wzts_365{color:var(--tc-text-muted);font-size:12px}._metadataActions_1wzts_370{flex-wrap:wrap;gap:8px;display:flex}._metadataActionsHint_1wzts_376{color:var(--tc-text-muted);font-size:12px}@media (width<=959px){._previewContent_1wzts_215{border-radius:0;inset:0}._previewLayout_1wzts_225{flex-direction:column;overflow-y:auto}._previewMain_1wzts_231{flex:none}._previewToolbar_1wzts_238{z-index:1;background-color:var(--tc-surface);position:sticky;top:0}._previewImageArea_1wzts_264{min-height:45vh}._previewInspector_1wzts_306{border-left:none;border-top:1px solid var(--tc-divider);width:100%;max-width:100%}}", Ns = "._prompt_view_1vzr5_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_1vzr5_14{border-right:1px solid var(--tc-divider)}._editor_column_1vzr5_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_1vzr5_7{grid-template-columns:minmax(0,1fr)}._browser_column_1vzr5_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_1vzr5_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_1vzr5_48{font-weight:600}._icon_text_button_1vzr5_55{color:var(--tc-accent);align-items:center;gap:4px;padding:1px 6px;display:inline-flex}._text_input_1vzr5_63{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_1vzr5_74{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_1vzr5_63:focus-visible,._text_input_narrow_1vzr5_74:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_1vzr5_91{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_1vzr5_91:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_1vzr5_111{flex-direction:column;display:flex}._search_input_1vzr5_116{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_1vzr5_126{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_1vzr5_135{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_1vzr5_145{flex-direction:column;display:flex}._preset_row_1vzr5_150{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_1vzr5_157{background-color:var(--tc-surface-raised)}._preset_name_button_1vzr5_161{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_1vzr5_173{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_1vzr5_173>:first-child{flex:auto}._prompt_builder_1vzr5_187{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._replacement_rules_1vzr5_197,._regex_rules_1vzr5_198{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_1vzr5_203{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_1vzr5_203>:not(._rule_row_action_1vzr5_212){flex:140px}._rule_row_action_1vzr5_212{flex:none;align-items:center;gap:8px;display:flex}._test_result_1vzr5_225{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_1vzr5_232{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._prompt_tag_panel_1vzr5_241{border-top:1px solid var(--tc-divider);padding-bottom:16px}._prompt_tag_description_1vzr5_246{color:var(--tc-text-muted);margin:0;padding:0 16px 8px;font-size:12px}", Ps = "._view_recet_7{flex-direction:column;gap:32px;width:min(100%,920px);margin:0 auto;padding:24px;display:flex}._onboarding_recet_16{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px;display:grid}._onboarding_icon_recet_25{width:48px;height:48px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._onboarding_label_recet_37{color:var(--tc-accent);margin-bottom:4px;font-size:12px;font-weight:650}._onboarding_title_recet_44{color:var(--tc-text);font-size:22px;font-weight:680;line-height:1.2}._onboarding_description_recet_51{max-width:62ch;color:var(--tc-text-muted);margin-top:8px;line-height:1.55}@media (width<=639px){._view_recet_7{gap:24px;padding:20px 16px}._onboarding_recet_16{grid-template-columns:minmax(0,1fr);padding:20px}}._section_recet_70{flex-direction:column;min-width:0;display:flex}._section_header_recet_79{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;display:flex}._section_title_recet_89{color:var(--tc-text);font-size:14px;font-weight:650}._row_recet_95{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_recet_104{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_recet_112{color:var(--tc-text);flex:none}._profile_row_recet_76{border-top:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_recet_120{flex-direction:column;flex:12rem;gap:2px;min-width:0;display:flex}._profile_name_recet_144{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_recet_151{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_recet_161{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;display:flex}._badge_recet_169{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_recet_178{flex-direction:column;gap:16px;display:flex}._status_text_recet_184{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_recet_184[data-tone=success]{color:var(--tc-success)}._status_text_recet_184[data-tone=warning]{color:var(--tc-warning)}._status_text_recet_184[data-tone=error]{color:var(--tc-error)}._risk_banner_recet_204{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_recet_204[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_recet_218{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_recet_204[data-severity=error] ._risk_banner_title_recet_218{color:var(--tc-error)}._risk_banner_description_recet_230{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_recet_237{align-items:center;gap:8px;display:flex}._acknowledged_note_recet_243{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_recet_251{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_recet_258{align-items:center;gap:12px;padding-top:8px;display:flex}._vault_mode_row_recet_264{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;display:flex}._vault_mode_row_recet_264 ._profile_meta_recet_151{white-space:normal;text-overflow:clip;line-height:1.45;overflow:visible}._vault_controls_recet_280{gap:14px;width:min(100%,520px);padding-top:16px;display:grid}._vault_controls_recet_280>button{width:fit-content}._vault_unlocked_actions_recet_291{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._text_input_recet_298{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._text_input_recet_298:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._layout_recet_314{grid-template-columns:184px minmax(0,1fr);min-height:100%;display:grid}._section_nav_recet_320{border-inline-end:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding:16px 8px;display:flex}._section_nav_item_recet_328{border-radius:var(--tc-radius-field);color:var(--tc-text-muted);text-align:start;white-space:nowrap;padding:8px 12px}._section_nav_item_recet_328[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised)}._section_content_recet_341{min-width:0}@media (width<=767px){._layout_recet_314{grid-template-columns:minmax(0,1fr)}._section_nav_recet_320{border-inline-end:none;border-bottom:1px solid var(--tc-divider);flex-direction:row;padding:8px;overflow-x:auto}}._prompt_tag_row_recet_359{flex-wrap:wrap;gap:6px;margin-top:4px;display:flex}", Fs = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function Is(e) {
	return e.replaceAll(Fs, (e, t) => new URL(t, import.meta.url).href);
}
var Ls = Is([
	xs,
	Ss,
	Cs,
	ws,
	Ds,
	Es,
	Ts,
	Os,
	ks,
	As,
	Ms,
	Ns,
	js,
	Ps
].join("\n"));
//#endregion
//#region src/index.ts
function Rs() {
	Po(globalThis, Fo);
}
var zs = bs(globalThis).then(() => ys({
	stylesheet: Ls,
	version: "3.0.0"
}));
//#endregion
export { zs as bootstrap_handle, Rs as register_chat_surface };
