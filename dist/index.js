import { t as e } from "./chunks/shell.module-bsdu70fJ.js";
import { n as t, r as n, t as r } from "./chunks/sha2-BGNex9vj.js";
import { c as i, d as a, h as o, i as s, m as c, r as l, t as u, u as d } from "./chunks/schemas-DMBLWk59.js";
import { i as f, n as p, o as m, r as h } from "./chunks/ids-stC4fUL8.js";
import { n as g, t as ee } from "./chunks/generation-C8k9E8Cm.js";
import { l as _, n as v, o as y, r as te, s as ne } from "./chunks/wardrobe_library-cpT1rkQA.js";
import { a as b, i as x, r as re } from "./chunks/provider-B-m_0o6I.js";
import { a as ie, c as S, i as ae, l as oe, n as C, o as w, r as se, s as T, t as ce, u as le } from "./chunks/http_origin-XzGYW1kD.js";
import { $ as ue, A as de, F as fe, G as pe, H as E, L as me, O as he, P as D, Q as ge, U as _e, _ as O, b as ve, dt as k, g as ye, h as be, i as xe, it as Se, j as Ce, lt as A, m as j, mt as M, n as we, p as Te, pt as Ee, rt as De, tt as N, u as Oe, x as ke, y as Ae } from "./chunks/vue-i18n-L-BrQRnK.js";
import { t as je } from "./chunks/create_i18n-Cq2ADEap.js";
import { i as Me, n as Ne, r as Pe, t as Fe } from "./chunks/portal_keys-DthxrmWp.js";
import { t as Ie } from "./chunks/AppIcon-DkyxvN8k.js";
import { t as Le } from "./chunks/use_shell_viewport-Yd0oBRFR.js";
import { a as Re, c as ze, i as Be, l as Ve, n as He, o as Ue, r as We, s as Ge, t as Ke, u as qe } from "./chunks/analysis-C1J50ZrG.js";
import { t as Je } from "./chunks/deferred_stylesheets-BpS7LWkd.js";
import { c as Ye, h as Xe, i as Ze, o as Qe } from "./chunks/business_repositories-DrZf-uG8.js";
import { a as $e, c as et, i as tt, n as nt, o as rt, r as it, t as at } from "./chunks/image_store-D1qjzarC.js";
import { a as ot, i as st, n as ct, r as lt } from "./chunks/model_json-DNK3Va6h.js";
import { a as ut, i as dt, n as ft, o as pt, s as P } from "./chunks/provider_transport-ftw8OZD2.js";
import { n as mt, r as F, t as ht } from "./chunks/tag_normalizer-CEAU4497.js";
import { i as gt, r as _t } from "./chunks/browser_secret_vault-CnTo7PwU.js";
import { t as vt } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
import { t as yt } from "./chunks/novelai_errors-Bve94MgO.js";
//#region ../../packages/core/src/capability_registry.ts
var bt = class {
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
}, xt = class {
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
}, St = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new bt(), n = new xt()) {
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
}, Ct = "Canonical JSON accepts only JSON data";
function I() {
	throw TypeError(Ct);
}
function wt(e) {
	return typeof e == "number" && !Number.isFinite(e) ? I() : JSON.stringify(e);
}
function Tt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return wt(e);
	if (typeof e != "object") return I();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return I();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return I();
				n.push(Tt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return I();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return I();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return I();
			a.push(`${wt(n)}:${Tt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function Et(e) {
	return Tt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var Dt = class {
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
function Ot(e) {
	return t(r(n(e)));
}
function kt(e, n) {
	let r = Ot(Et(e)), i = n.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: r,
		generation_anchor: Ot(`${r}${t(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/direct_catalog.ts
var At = Object.freeze({}), jt = {
	kind: "bearer",
	header: "authorization"
}, Mt = Object.freeze({
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
		auth: jt,
		required_headers: At
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: jt,
		required_headers: At
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: At
	}
}), Nt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function Pt(e) {
	return Mt[e];
}
function Ft(e, t) {
	if (!e.routes.includes(t)) throw new Nt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var It = o().regex(/^[A-Za-z0-9_-]{8,32}$/u), Lt = c({
	name: o().trim().min(1).max(120),
	prompt: o().trim().min(1).max(4e3),
	negative_prompt: o().max(4e3)
}), Rt = c({
	slot_id: It,
	paragraph: d().int().min(0),
	anchor: o().max(400),
	scene: o().max(2e3),
	characters: l(o().trim().min(1).max(120)).max(16),
	positive_prompt: o().max(8e3),
	negative_prompt: o().max(8e3),
	character_prompts: l(Lt).max(16),
	image_ids: l(p),
	active_image_id: p.nullable(),
	pending_request_ids: l(f),
	last_error: o().max(500).nullable()
}), zt = c({
	schema_version: i(2),
	slots: l(Rt).max(16)
});
u(["quality", "undesired_content"]);
var Bt = c({
	enabled: s(),
	preset_id: o().trim().min(1).max(200)
}), Vt = c({
	quality: Bt,
	undesired_content: Bt
}), Ht = c({
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
}), Ut = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function L(e) {
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
var R = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(re.parse(e));
	}
}, Wt = {
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
}, Gt = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function Kt(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!Wt[r].includes(t)) throw new Gt(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function qt(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function Jt(e) {
	let t = g.parse(e.generation_anchor), n = Object.freeze(ee.parse(e.arguments));
	if (n.generation_anchor !== t) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: f.parse(e.request_id),
		generation_anchor: t,
		source_anchor: g.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: x.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function Yt(e) {
	let i = `${e.generation_anchor}${Et(e.arguments)}`;
	return t(r(n(i)));
}
function Xt(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
var Zt = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled"
]);
function Qt(e) {
	return e instanceof R ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var $t = class {
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
	#m = x.options;
	#h = 0;
	#g = 0;
	#_ = !1;
	#v = null;
	#y = 0;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new Ut(), this.#i = qt(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#m) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : qt(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, e.provider_start_interval_ms?.[t] ?? 0), this.#c.set(t, []), this.#l.set(t, 0);
		}
	}
	enqueue(e) {
		let t = Jt(e), n = Yt(t);
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
		return t === void 0 ? null : L(t.job);
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
		if (t.job.state === "cancelled") return L(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#A(t);
		let n = await this.#k(t, async () => (t.job.state !== "cancelled" && await this.#D(t, "cancelled"), L(t.job)));
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
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#k(n, async () => (n.job.state !== t && await this.#D(n, t), L(n.job)));
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
		}, i = L(r);
		await this.#t.save(i);
		let a = {
			job: r,
			controller: new AbortController(),
			operation: Promise.resolve(),
			cancel_requested: !1,
			queued: !0
		};
		return this.#u.set(r.job_id, a), e.automatic && this.#d.set(t, r.job_id), this.#c.get(r.provider_id)?.push(a), this.#j(i), this.#S(), i;
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
			n > 0 && this.#s.set(e, Date.now() + n), this.#h += 1, this.#l.set(e, (this.#l.get(e) ?? 0) + 1), this.#E(t).catch(() => {
				this.#O(t);
			}).finally(() => {
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
		if (!await this.#k(e, async () => e.cancel_requested || (await this.#D(e, "preparing"), e.controller.signal.aborted) ? (await this.#D(e, "cancelled"), !1) : (await this.#D(e, "submitting"), !0)) || e.cancel_requested) return;
		let t = {
			signal: e.controller.signal,
			mark_running: async () => {
				await this.#k(e, async () => {
					!e.cancel_requested && e.job.state === "submitting" && await this.#D(e, "running");
				});
			}
		};
		try {
			let n = (await this.#e.execute(L(e.job), t)).image_ids.map((e) => p.parse(e));
			if (n.length === 0) throw new R({
				code: "malformed_response",
				retryable: !1
			});
			await this.#k(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = Xt(e.job);
				t.image_ids = n, await this.#D(e, "completed", t);
			});
		} catch (t) {
			await this.#k(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = Xt(e.job);
				n.error = Qt(t), await this.#D(e, "failed", n);
			});
		}
	}
	async #D(e, t, n = Xt(e.job)) {
		Kt(n, t, this.#r.now().toISOString());
		let r = L(n);
		try {
			await this.#t.save(r);
		} catch (e) {
			if (!Zt.has(t)) throw e;
		}
		return e.job = n, this.#j(r), r;
	}
	#O(e) {
		if (Zt.has(e.job.state)) return;
		let t = Xt(e.job);
		t.state = "failed", t.updated_at = this.#r.now().toISOString(), t.error = {
			code: "storage_failed",
			retryable: !1
		}, e.job = t;
		let n = L(t);
		this.#j(n), this.#t.save(n).catch(() => void 0);
	}
	#k(e, t) {
		let n = e.operation.then(t);
		return e.operation = n.then(() => void 0, () => void 0), n;
	}
	#A(e) {
		let t = this.#c.get(e.job.provider_id);
		if (t === void 0) return;
		let n = t.indexOf(e);
		n >= 0 && t.splice(n, 1), e.queued = !1;
	}
	#j(e) {
		for (let t of this.#p) t(e);
	}
}, en = "tavern_canvas", tn = "tavern_canvas_wardrobe";
function nn(e) {
	return e.bind(globalThis);
}
function rn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function an(e) {
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
function on(e, t) {
	let n = z(e, t);
	if (typeof n == "function") try {
		return Reflect.apply(n, e, []);
	} catch {
		return;
	}
}
function sn(e, t) {
	let n = z(e, "eventSource"), r = z(e, "eventTypes");
	return !rn(n) || !rn(r) ? !1 : typeof z(n, "on") == "function" && typeof z(n, "removeListener") == "function" && t.every((e) => {
		let t = z(r, e);
		return typeof t == "string" && t.length > 0;
	});
}
function cn(e) {
	let t = rn(e) ? on(e, "getContext") : void 0;
	if (!rn(t)) return {
		main_generation_events: !1,
		message_swipe_metadata: !1
	};
	let n = on(t, "getCurrentLocale");
	return {
		main_generation_events: typeof n == "string" && n.trim().length > 0 && sn(t, [
			"GENERATION_STARTED",
			"GENERATION_STOPPED",
			"GENERATION_ENDED"
		]),
		message_swipe_metadata: typeof z(t, "getCurrentChatId") == "function" && Array.isArray(z(t, "chat")) && typeof z(t, "saveChat") == "function" && sn(t, [
			"CHAT_CHANGED",
			"MESSAGE_SWIPED",
			"MESSAGE_UPDATED",
			"MESSAGE_EDITED",
			"CHARACTER_MESSAGE_RENDERED",
			"MORE_MESSAGES_LOADED"
		])
	};
}
function ln(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function un(e) {
	if (!an(e) || !Object.values(e).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return { ...e };
}
function dn(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
var fn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t.bind(globalThis);
	}
	get_locale() {
		return ln(this.#e().getCurrentLocale(), "SillyTavern returned an invalid locale");
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
				let n = dn(t);
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
			let n = dn(t);
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
		return this.#i(e, en);
	}
	read_swipe_wardrobe(e) {
		return this.#i(e, tn);
	}
	#i(e, t) {
		let n = this.#r(e, !1)?.[t];
		return n === void 0 ? null : structuredClone(n);
	}
	async translate_deepl(e, t, n) {
		let r = await this.#t("/api/translate/deepl", {
			method: "POST",
			headers: un(this.#e().getRequestHeaders()),
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
		return this.#a(e, en, t);
	}
	write_swipe_wardrobe(e, t) {
		return this.#a(e, tn, t);
	}
	async #a(e, t, n) {
		let r = this.#r(e, !0);
		if (r === null) throw Error(`Chat ${e.chat_id} message ${String(e.message_id)} swipe ${String(e.swipe_id)} is not available`);
		r[t] = structuredClone(n), await this.#e().saveChat();
	}
}, pn = {
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
function mn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function B(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function hn(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function gn(e, t) {
	return t.every((t) => typeof hn(e, t) == "function");
}
function _n(e) {
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
function vn(e) {
	return mn(e) ? {
		detected: !0,
		version: _n(e),
		message_swipe_metadata: gn(e, pn.message_swipe_metadata),
		preset_generation: gn(e, pn.preset_generation),
		tavern_regex: gn(e, pn.tavern_regex)
	} : {
		detected: e !== void 0,
		version: e === void 0 ? { state: "missing" } : { state: "invalid" },
		message_swipe_metadata: !1,
		preset_generation: !1,
		tavern_regex: !1
	};
}
function yn(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function bn(e) {
	if (!B(e)) throw Error("TavernHelper returned an invalid chat message");
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o } = e;
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || typeof n != "string" || !yn(r) || i !== void 0 && typeof i != "boolean" || typeof a != "number" || !Number.isInteger(a) || !Array.isArray(o) || !o.every((e) => typeof e == "string") || a < 0 || a >= o.length) throw Error(`TavernHelper returned an invalid chat message ${String(t)}`);
	return {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o
	};
}
function xn(e) {
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
function Sn(e) {
	if (typeof e == "string") return {
		content: e,
		reasoning: null
	};
	if (B(e) && typeof e.content == "string") return {
		content: e.content,
		reasoning: typeof e.reasoning == "string" && e.reasoning.length > 0 ? e.reasoning : null
	};
	throw Error("TavernHelper.generate returned neither text nor a detailed result");
}
var Cn = /* @__PURE__ */ new Set([
	"and_any",
	"and_all",
	"not_all",
	"not_any"
]), wn = /* @__PURE__ */ new Set([
	"constant",
	"selective",
	"vectorized"
]);
function Tn(e) {
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
function En(e) {
	if (!B(e) || !B(e.strategy) || !B(e.position)) throw Error("TavernHelper returned an invalid world info entry");
	let { enabled: t, content: n, strategy: r, position: i } = e, a = r.keys_secondary, o = B(a) ? a.logic ?? "and_any" : void 0;
	if (typeof t != "boolean" || typeof n != "string" || typeof r.type != "string" || !wn.has(r.type) || !B(a) || typeof o != "string" || !Cn.has(o) || typeof i.order != "number") throw Error("TavernHelper returned an invalid world info entry");
	return {
		enabled: t,
		strategy: r.type,
		keys: Tn(r.keys),
		secondary_logic: o,
		secondary_keys: Tn(a.keys),
		order: i.order,
		content: n
	};
}
function Dn(e) {
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
function On(e) {
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
function kn(e, t) {
	return e.script_name === t.script_name && e.find_regex === t.find_regex && e.replace_string === t.replace_string && e.source.ai_output === t.source.ai_output && e.source.user_input === t.source.user_input && e.destination.display === t.destination.display && e.destination.prompt === t.destination.prompt && e.run_on_edit === t.run_on_edit;
}
var An = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	#n(e) {
		let t = this.#e.getChatMessages(e, { include_swipes: !0 });
		if (!Array.isArray(t)) throw Error("TavernHelper returned invalid chat messages");
		return t.map(bn);
	}
	get_active_swipe_id(e) {
		return this.#n(e)[0]?.swipe_id ?? null;
	}
	get_active_chat() {
		let e = this.#n("0-{{lastMessageId}}");
		return Promise.resolve({
			chat_id: this.#t(),
			messages: e.map(xn)
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
		let t = Dn(e.connection);
		return Sn(await this.#e.generate({
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
		return t.map(En);
	}
	stop_generation(e) {
		this.#e.stopGenerationById(e);
	}
	async sync_regex_scripts(e) {
		let t = { type: "global" }, n = this.#e.getTavernRegexes(t), r = e.map(On).filter((e) => {
			let t = n.find((t) => t.id === e.id);
			return t === void 0 || !kn(t, e);
		});
		if (r.length === 0) return !1;
		let i = n.filter((e) => !r.some((t) => t.id === e.id));
		return await this.#e.replaceTavernRegexes([...i, ...r], t), !0;
	}
	find_message_element(e) {
		return this.#e.retrieveDisplayedMessage(e).get(0) ?? null;
	}
}, jn = "4.11.1", Mn = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function Nn(e) {
	let t = Mn.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function Pn(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function Fn(e) {
	let t = Nn(e), n = Nn(jn);
	return t === null || n === null ? "invalid" : Pn(t, n) ? "supported" : "unsupported";
}
var In = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function Ln(e) {
	return {
		available: !1,
		reason: e
	};
}
function Rn(e, t) {
	return e ? { available: !0 } : Ln(t);
}
function zn(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Bn(e, t) {
	return {
		main_generation_events: Rn(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		preset_generation: Rn(e.preset_generation, "TavernHelper.generate, stopGenerationById or the world info functions are unavailable"),
		message_swipe_metadata: Rn(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper or SillyTavern chat message API is unavailable"),
		tavern_regex: Rn(e.tavern_regex, "TavernHelper regex or displayed message API is unavailable"),
		tavern_helper: Rn(e.version.state === "available", "TavernHelper version API is unavailable")
	};
}
function Vn(e) {
	return In.filter((t) => e[t]?.available !== !0);
}
function Hn(e) {
	let t = vn(zn(e, "TavernHelper")), n = Bn(t, cn(zn(e, "SillyTavern")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: Vn(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: Vn(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = Fn(i);
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
	let o = Vn(n);
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
var Un = "capability_not_implemented";
function V() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: Un }), Promise.reject(e);
}
function H() {
	return () => {};
}
var Wn = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	workflow: [],
	prompt_tag: []
}, Gn = {
	capability_matrix: {},
	helper_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, Kn = {
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
function qn() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: H,
			submit: V,
			cancel: V,
			retry: V,
			dismiss: V
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: H,
			save: V,
			remove: V,
			test_connection: V,
			set_credential: V,
			clear_credential: V,
			save_novelai_defaults: V,
			save_prompt_tags: V
		},
		novelai: {
			get_account: V,
			load: () => Promise.resolve([]),
			refresh_models: V,
			estimate_cost: V
		},
		prompt_presets: {
			load: () => Promise.resolve([]),
			subscribe: H,
			load_draft: V,
			save_draft: V,
			remove: V,
			bulk_remove: V,
			test_regex: V
		},
		assets: {
			load: () => Promise.resolve(Wn),
			subscribe: H,
			save: V,
			remove: V,
			reorder: V
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: H,
			read_bytes: V,
			read_thumbnail: V,
			pin: V,
			detach_from_message: V,
			delete_record: V,
			reveal_source: V,
			bulk_delete: V
		},
		vocabulary: {
			load: () => Promise.resolve([]),
			installed: V,
			search: V,
			lookup: () => Promise.resolve(null),
			prepare: V,
			next_page: V,
			install: V,
			cancel_install: () => {}
		},
		diagnostics: {
			load: () => Promise.resolve(Gn),
			subscribe: H,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: V
		},
		settings: {
			load: () => Promise.resolve({
				settings: Kn,
				vocabulary_update_channel: "bundled",
				browser_secret_vault: {
					state: "unavailable",
					secret_count: 0
				}
			}),
			subscribe: H,
			update: V,
			set_analysis_key: V,
			list_worldbooks: V,
			clear_analysis_key: V,
			set_deepl_key: V,
			clear_deepl_key: V,
			initialize_browser_secret_vault: V,
			unlock_browser_secret_vault: V,
			lock_browser_secret_vault: V,
			reset_browser_secret_vault: V,
			set_vocabulary_update_channel: V,
			import_vocabulary_package: V,
			cancel_vocabulary_import: () => {},
			export_archive: V,
			import_archive: V
		}
	};
}
//#endregion
//#region src/ui/contracts/view_models.ts
var Jn = { status: "idle" }, Yn = "capability_load_failed", Xn = "command_failed", Zn = /^[a-z][a-z0-9_]*$/u;
function Qn(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && Zn.test(t)) return { code: t };
	}
	return { code: t };
}
function U(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var $n = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function er(e) {
	return e === "failed" ? "error" : "pending";
}
function tr(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function nr(e) {
	return {
		id: e.job_id,
		label_code: tr(e.state),
		status: er(e.state),
		progress: e.state !== "failed" && e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null,
		error: e.state === "failed" ? e.error?.code ?? null : null
	};
}
function rr(e) {
	return e.filter((e) => $n.has(e.state)).map(nr);
}
function ir(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: Qn(e, Xn)
		});
	}));
}
function ar(e, t, n) {
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
			save_command: Jn
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
			vocabulary_install_command: Jn
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: Jn
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			support_bundle_command: Jn
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: Jn
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
function or(e, t) {
	let n = t.type === "job_updated" ? U(e.generation.jobs, t.job, (e) => e.job_id) : e.generation.jobs.filter((e) => e.job_id !== t.job_id);
	return {
		generation: {
			...e.generation,
			jobs: n
		},
		tasks: rr(n)
	};
}
function sr(e, t) {
	let n = t.type === "profile_upserted" ? U(e.generation.profiles, t.profile, (e) => e.id) : e.generation.profiles.filter((e) => e.id !== t.profile_id);
	return { generation: {
		...e.generation,
		profiles: n
	} };
}
function cr(e, t) {
	let n = t.type === "preset_upserted" ? U(e.prompt.presets, t.preset, (e) => e.id) : e.prompt.presets.filter((e) => e.id !== t.preset_id);
	return { prompt: {
		...e.prompt,
		presets: n
	} };
}
function lr(e, t) {
	let n = t.type === "asset_upserted" ? {
		...e.assets.records,
		[t.asset.category]: U(e.assets.records[t.asset.category], t.asset, (e) => e.id)
	} : {
		...e.assets.records,
		[t.category]: e.assets.records[t.category].filter((e) => e.id !== t.asset_id)
	};
	return { assets: {
		...e.assets,
		records: n
	} };
}
function ur(e, t) {
	let n = t.type === "record_upserted" ? U(e.gallery.records, t.record, (e) => e.id) : e.gallery.records.filter((e) => e.id !== t.record_id);
	return { gallery: {
		...e.gallery,
		records: n
	} };
}
function dr(e, t) {
	return { diagnostics: {
		...e.diagnostics,
		timeline: [...e.diagnostics.timeline, t.entry]
	} };
}
function fr(e, t) {
	return { settings: {
		...e.settings,
		settings: t.settings
	} };
}
//#endregion
//#region src/ui/controllers/studio_controller.ts
var pr = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	#a = Promise.resolve();
	constructor(e) {
		this.#e = e.capabilities, this.#t = ar(e.initial_route ?? "settings", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
	}
	get state() {
		return this.#t;
	}
	on_change(e) {
		return this.#n.add(e), () => {
			this.#n.delete(e);
		};
	}
	#o() {
		for (let e of this.#n) e();
	}
	#s(e) {
		this.#t = {
			...this.#t,
			...e
		}, this.#o();
	}
	#c(e) {
		this.#s({ generation: {
			...this.#t.generation,
			...e
		} });
	}
	#l(e) {
		this.#s({
			generation: {
				...this.#t.generation,
				jobs: e
			},
			tasks: rr(e)
		});
	}
	#u(e) {
		this.#s({ prompt: {
			...this.#t.prompt,
			...e
		} });
	}
	#d(e) {
		this.#s({ assets: {
			...this.#t.assets,
			...e
		} });
	}
	#f(e) {
		this.#s({ gallery: {
			...this.#t.gallery,
			...e
		} });
	}
	#p(e) {
		this.#s({ diagnostics: {
			...this.#t.diagnostics,
			...e
		} });
	}
	#m(e) {
		this.#s({ settings: {
			...this.#t.settings,
			...e
		} });
	}
	#h(e) {
		this.#s({ inspector: {
			...this.#t.inspector,
			...e
		} });
	}
	#g(e, t) {
		let n = new Set(this.#t.loading);
		t ? n.add(e) : n.delete(e), this.#s({ loading: n });
	}
	#_(e, t) {
		let n = new Map(this.#t.failures);
		t ? n.set(e, t) : n.delete(e), this.#s({ failures: n });
	}
	#v(e, t, n) {
		return this.#g(e, !0), t().then((t) => {
			this.#i || (n(t), this.#_(e, null));
		}).catch((t) => {
			this.#i || this.#_(e, Qn(t, Yn));
		}).finally(() => {
			this.#g(e, !1);
		});
	}
	#y(e) {
		this.#i || this.#s(or(this.#t, e));
	}
	#b(e) {
		this.#i || this.#s(sr(this.#t, e));
	}
	#x(e) {
		this.#i || this.#s(cr(this.#t, e));
	}
	#S(e) {
		this.#i || this.#s(lr(this.#t, e));
	}
	#C(e) {
		this.#i || this.#s(ur(this.#t, e));
	}
	#w(e) {
		this.#i || this.#s(dr(this.#t, e));
	}
	#T(e) {
		this.#i || this.#s(fr(this.#t, e));
	}
	load_vocabulary_catalog() {
		return this.#v("vocabulary", () => this.#e.vocabulary.load(), (e) => {
			this.#d({ vocabulary_catalog: e });
		});
	}
	async start() {
		this.#r = [
			this.#e.generation.subscribe((e) => {
				this.#y(e);
			}),
			this.#e.profiles.subscribe((e) => {
				this.#b(e);
			}),
			this.#e.prompt_presets.subscribe((e) => {
				this.#x(e);
			}),
			this.#e.assets.subscribe((e) => {
				this.#S(e);
			}),
			this.#e.gallery.subscribe((e) => {
				this.#C(e);
			}),
			this.#e.diagnostics.subscribe((e) => {
				this.#w(e);
			}),
			this.#e.settings.subscribe((e) => {
				this.#T(e);
			})
		], await Promise.allSettled([
			...this.#E(),
			this.#v("diagnostics", () => this.#e.diagnostics.load(), (e) => {
				this.#p({ snapshot: e });
			}),
			this.#v("settings", () => this.#e.settings.load(), (e) => {
				this.#m({
					settings: e.settings,
					vocabulary_update_channel: e.vocabulary_update_channel,
					browser_secret_vault: e.browser_secret_vault
				});
			})
		]);
	}
	#E() {
		return [
			this.#v("generation", () => this.#e.generation.load(), (e) => {
				this.#l(e);
			}),
			this.#v("profiles", () => this.#e.profiles.load(), (e) => {
				this.#c({
					profiles: e,
					active_profile_id: this.#t.generation.active_profile_id ?? e[0]?.id ?? null
				});
			}),
			this.#v("prompt_presets", () => this.#e.prompt_presets.load(), (e) => {
				this.#u({ presets: e });
			}),
			this.#v("assets", () => this.#e.assets.load(), (e) => {
				this.#d({ records: e });
			}),
			this.#v("gallery", () => this.#e.gallery.load(), (e) => {
				this.#f({ records: e });
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
		this.#s({ route: e });
	}
	set_settings_section(e) {
		this.#s({
			route: "settings",
			settings_section: e
		});
	}
	set_inspector_width(e) {
		this.#h({ width: e });
	}
	set_inspector_collapsed(e) {
		this.#h({ collapsed: e });
	}
	select_inspector_record(e) {
		this.#h({ selected_record: e });
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
	update_prompt_draft(e) {
		this.#t.prompt.draft && this.#u({ draft: {
			...this.#t.prompt.draft,
			...e
		} });
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
		return ir(() => this.#t.prompt.save_command, (e) => {
			this.#u({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#u({
				presets: U(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return ir(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#d({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		let t = this.#a.then(() => this.#D(e));
		return this.#a = t, t;
	}
	async #D(e) {
		this.#m({ update_command: { status: "pending" } });
		try {
			let t = await this.#O(e);
			this.#m({ update_command: {
				status: "success",
				result: t
			} });
		} catch (e) {
			this.#m({ update_command: {
				status: "error",
				failure: Qn(e, Xn)
			} });
		}
	}
	async #O(e) {
		let t = await this.#e.settings.update(e);
		if (e.credential_storage_mode === void 0) return this.#m({ settings: t }), t;
		let [n, r] = await Promise.all([this.#e.settings.load(), this.#e.profiles.load()]);
		return this.#m({
			settings: n.settings,
			vocabulary_update_channel: n.vocabulary_update_channel,
			browser_secret_vault: n.browser_secret_vault
		}), this.#c({ profiles: r }), n.settings;
	}
	export_support_bundle() {
		return ir(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#p({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	async load_diagnostics_timeline() {
		let e = await this.#e.diagnostics.load_timeline();
		this.#i || this.#p({ timeline: e });
	}
	async save_provider_profile(e) {
		let t = await this.#e.profiles.save(e), n = t.is_default || this.#t.generation.active_profile_id === null;
		return n && await this.#e.settings.update({ active_provider_profile_id: t.id }), this.#i || this.#c({
			profiles: U(this.#t.generation.profiles, t, (e) => e.id),
			...n ? { active_profile_id: t.id } : {}
		}), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e), this.#i || this.#c({ profiles: this.#t.generation.profiles.filter((t) => t.id !== e) });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	async set_provider_profile_credential(e, t) {
		let n = await this.#e.profiles.set_credential(e, t);
		return this.#i || this.#c({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#c({ profiles: U(this.#t.generation.profiles, t, (e) => e.id) }), t;
	}
	async save_novelai_defaults(e, t) {
		let n = await this.#e.profiles.save_novelai_defaults(e, t);
		return this.#i || this.#c({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async save_prompt_tags(e, t) {
		let n = await this.#e.profiles.save_prompt_tags(e, t);
		return this.#i || this.#c({ profiles: U(this.#t.generation.profiles, n, (e) => e.id) }), n;
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
		this.#i || this.#m({ browser_secret_vault: t });
	}
	async unlock_browser_secret_vault(e) {
		let t = await this.#e.settings.unlock_browser_secret_vault(e);
		this.#i || this.#m({ browser_secret_vault: t });
	}
	async lock_browser_secret_vault() {
		let e = await this.#e.settings.lock_browser_secret_vault();
		this.#i || this.#m({ browser_secret_vault: e });
	}
	async reset_browser_secret_vault() {
		let e = await this.#e.settings.reset_browser_secret_vault();
		this.#i || this.#m({ browser_secret_vault: e });
	}
	async set_vocabulary_update_channel(e) {
		await this.#e.settings.set_vocabulary_update_channel(e), this.#i || this.#m({ vocabulary_update_channel: e });
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
		await this.#e.settings.import_archive(e), await Promise.allSettled(this.#E());
	}
	set_active_asset_category(e) {
		this.#d({ active_category: e });
	}
	async save_asset(e, t) {
		let n = await this.#e.assets.save(e, t);
		this.#i || this.#d({ records: {
			...this.#t.assets.records,
			[e]: U(this.#t.assets.records[e], n, (e) => e.id)
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
	load_installed_vocabulary() {
		return this.#e.vocabulary.installed();
	}
	load_more_vocabulary(e) {
		return this.#e.vocabulary.next_page(e);
	}
	select_gallery_record(e) {
		this.#f({ selected_record_id: e });
	}
	reveal_gallery_source(e) {
		return this.#e.gallery.reveal_source(e);
	}
	read_gallery_bytes(e) {
		return this.#e.gallery.read_bytes(e);
	}
	read_gallery_thumbnail(e) {
		return this.#e.gallery.read_thumbnail(e);
	}
	async pin_gallery_record(e, t) {
		await this.#e.gallery.pin(e, t), !this.#i && this.#f({ records: this.#t.gallery.records.map((n) => n.id === e ? {
			...n,
			pinned: t
		} : n) });
	}
	async detach_gallery_record(e) {
		await this.#e.gallery.detach_from_message(e), !this.#i && this.#f({ records: this.#t.gallery.records.map((t) => t.id === e ? {
			...t,
			quarantined: !0
		} : t) });
	}
	async delete_gallery_record(e) {
		await this.#e.gallery.delete_record(e), !this.#i && this.#f({
			records: this.#t.gallery.records.filter((t) => t.id !== e),
			selected_record_id: this.#t.gallery.selected_record_id === e ? null : this.#t.gallery.selected_record_id
		});
	}
	async dismiss_failed_tasks() {
		let e = this.#t.generation.jobs.filter((e) => e.state === "failed");
		await this.#e.generation.dismiss(e.map((e) => e.job_id));
	}
	bulk_delete_gallery_records(e) {
		return ir(() => this.#t.gallery.bulk_delete_command, (e) => {
			this.#f({ bulk_delete_command: e });
		}, async () => {
			await this.#e.gallery.bulk_delete(e);
			let t = new Set(e);
			this.#f({
				records: this.#t.gallery.records.filter((e) => !t.has(e.id)),
				selected_record_id: this.#t.gallery.selected_record_id !== null && t.has(this.#t.gallery.selected_record_id) ? null : this.#t.gallery.selected_record_id
			});
		});
	}
};
function mr(e) {
	return new pr(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function hr(e) {
	let t = ge(mr(e)), n = De(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), ue(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region src/modules/experience/media_state_player.ts
var gr = ["image", "video"], _r = /^(?:blob:|data:image\/|data:video\/)/u, vr = c({
	kind: u(gr),
	url: o().min(1).refine((e) => _r.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function yr(e) {
	let t = vr.safeParse(e);
	return t.success ? t.data : null;
}
function br(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: yr(n)
	};
}
var xr = 8;
function Sr(e, t) {
	let n = Math.max(xr, t.width - 56 - xr), r = Math.max(xr, t.height - 56 - xr);
	return {
		x: Math.min(Math.max(e.x, xr), n),
		y: Math.min(Math.max(e.y, xr), r)
	};
}
function Cr(e) {
	return Sr({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var wr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function Tr(e) {
	let t = yr(e);
	return t !== null && t.kind === "image" ? t : null;
}
var Er = class {
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
		this.#n && (this.#t = Sr(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = Cr(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? Cr(t) : Sr(e, t);
	}
}, Dr = {
	floatingEntry: "_floatingEntry_1bpar_9",
	floatingEntryDragging: "_floatingEntryDragging_1bpar_34",
	floatingEntryMedia: "_floatingEntryMedia_1bpar_38"
}, Or = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], kr = ["src"], Ar = ["src"], jr = /* @__PURE__ */ ke({
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
		let n = e, r = t, i = Le(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new Er({
			position_store: Se(n.positionStore) ?? ge(new wr()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = N(o.position), c = N(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		E(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		Ce(() => {
			window.addEventListener("resize", u);
		}), de(() => {
			window.removeEventListener("resize", u);
		});
		let d = Te(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: Tr(n.mediaAssets.idle)
			} : br(n.mediaAssets, e);
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
			class: k(["tc-interactive", [A(Dr).floatingEntry, c.value && A(Dr).floatingEntryDragging]]),
			style: Ee({
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
			class: k(A(Dr).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, kr)) : d.value.asset?.kind === "image" ? (D(), O("img", {
			key: 1,
			class: k(A(Dr).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, Ar)) : (D(), be(Ie, {
			key: 2,
			icon: A(se)
		}, null, 8, ["icon"]))], 46, Or)) : ye("", !0);
	}
}), Mr = "data-tavern-canvas-menu-entry";
function Nr(e, t) {
	let n = N(!1), r = null;
	return Ce(() => {
		let i = document.getElementById("extensionsMenu");
		if (i === null) return;
		i.querySelector(`[${Mr}]`)?.remove(), r = document.createElement("div"), r.className = "list-group-item flex-container flexGap5 interactable", r.setAttribute(Mr, ""), r.setAttribute("role", "button"), r.tabIndex = 0;
		let a = document.createElement("div");
		a.className = "extensionsMenuExtensionButton", a.append(qe(document));
		let o = document.createElement("span");
		_e(() => {
			o.textContent = e();
		}), r.append(a, o), r.addEventListener("click", t), i.append(r), n.value = !0;
	}), de(() => {
		r?.remove();
	}), n;
}
//#endregion
//#region src/host/slash_command.ts
var Pr = "inkwell", Fr = !1;
function Ir(e, t) {
	if (Fr) return;
	let n = globalThis.SillyTavern?.getContext?.(), r = n?.SlashCommand?.fromProps?.({
		name: Pr,
		helpString: e,
		returns: "nothing",
		callback: () => (t(), "")
	});
	r !== void 0 && n?.SlashCommandParser?.addCommandObject !== void 0 && (n.SlashCommandParser.addCommandObject(r), Fr = !0);
}
//#endregion
//#region src/ui/experience/use_host_entry_points.ts
var Lr = "data-tavern-canvas-settings";
function Rr(e, t) {
	let n = null;
	Ce(() => {
		Ir(e.description(), t);
		let r = document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
		if (r === null) return;
		r.querySelector(`[${Lr}]`)?.remove(), n = document.createElement("div"), n.setAttribute(Lr, ""), n.className = "flex-container flexFlowColumn flexGap5";
		let i = document.createElement("b"), a = document.createElement("small"), o = document.createElement("div");
		_e(() => {
			i.textContent = e.name(), a.textContent = e.description(), o.textContent = e.open();
		}), o.className = "menu_button interactable", o.setAttribute("role", "button"), o.tabIndex = 0, o.addEventListener("click", t), o.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t());
		}), n.append(i, a, o), r.append(n);
	}), de(() => {
		n?.remove();
	});
}
function zr(e, t, n) {
	let r = Math.max(20, t.width - n.width - 20), i = Math.max(20, t.height - n.height - 20);
	return {
		x: Math.min(Math.max(e.x, 20), r),
		y: Math.min(Math.max(e.y, 20), i)
	};
}
function Br(e, t) {
	return zr({
		x: e.width - t.width - 20,
		y: 64
	}, e, t);
}
var Vr = {
	window: "_window_1jfap_1",
	"floating-window-enter": "_floating-window-enter_1jfap_1"
}, Hr = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], Ur = /* @__PURE__ */ ke({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = N(null), r = N({
			x: 0,
			y: 0
		}), i = N(!1), a = N(!1);
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
			r.value = i.value ? zr(r.value, t, a) : Br(t, a), i.value = !0;
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
				r.value = zr({
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
		return Ce(() => {
			window.addEventListener("resize", u), he(c);
		}), de(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (D(), O("section", {
			ref_key: "window_element",
			ref: n,
			class: k(A(Vr).window),
			style: Ee({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [me(e.$slots, "default")], 46, Hr));
	}
}), Wr = /* @__PURE__ */ ke({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return fe(Ne, t.portalTarget), (e, t) => me(e.$slots, "default");
	}
}), Gr = ["href"], Kr = /* @__PURE__ */ ke({
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
		let n = t, r = ve(() => import("./chunks/ChatLayer-C38N2ee8.js")), i = ve(() => import("./chunks/StudioShell-86oeV_8F.js")), { t: a } = we();
		function o() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let s = n.hostElement, c = o();
		s.dataset.colorMode = c;
		let l = Te(() => n.probe.ready ? void 0 : n.probe.current_version), u = Te(() => `${a("app.name")} ${a("app.version_label", { version: n.version })}`), d = n.status.state === "ready" ? hr({
			capabilities: n.capabilities ?? qn(),
			initial_color_mode: c
		}) : null, f = d === null ? null : n.host ?? null, p = N(f?.get_active_chat_id() ?? null), m = f?.subscribe_chat_change((e) => {
			p.value = e.chat_id;
		});
		de(() => m?.()), fe(Fe, p), fe(Me, n.translator ?? null);
		let h = d === null ? null : n.illustrations ?? null, g = n.capabilities?.gallery;
		fe(Pe, h === null || g === void 0 ? null : {
			async generate(e) {
				let t = await h.generate_image({
					...e,
					character_prompts: []
				});
				return new Blob([new Uint8Array(await g.read_bytes(t))]);
			},
			read_outfit: (e) => h.read_outfit(e),
			read_character: (e) => h.read_character(e)
		});
		let ee = Te(() => {
			let e = d?.state.value, t = e?.settings.settings?.active_provider_profile_id ?? null;
			return {
				profile: e?.generation.profiles.find((e) => e.id === t) ?? null,
				custom_presets: e?.assets.records.prompt_tag ?? [],
				save: (e, t) => d === null ? Promise.resolve() : d.controller.save_prompt_tags(e, t)
			};
		}), _ = N(c), v = typeof window > "u" || typeof window.matchMedia != "function" ? null : window.matchMedia("(prefers-color-scheme: dark)");
		function y(e) {
			_.value = e.matches ? "dark" : "light";
		}
		v?.addEventListener("change", y), de(() => v?.removeEventListener("change", y));
		let te = Te(() => {
			let e = d?.state.value.settings.settings?.ui.color_mode ?? "system";
			return e === "system" ? _.value : e;
		});
		E(te, (e) => {
			s.dataset.colorMode = e;
		});
		function ne(e) {
			d?.controller.set_route(e);
		}
		function b(e) {
			d?.controller.set_inspector_collapsed(e);
		}
		function x(e) {
			d?.controller.set_inspector_width(e);
		}
		function re() {
			window.location.reload();
		}
		let ie = N(!1), S = Te(() => ie.value), ae = Nr(() => a("app.name"), C);
		Rr({
			name: () => a("app.name"),
			description: () => a("app.entry_description"),
			open: () => a("app.open_action")
		}, C);
		let oe = Te(() => !ae.value || d?.state.value.settings.settings?.ui.optional_entry_enabled === !0);
		E(S, (e) => {
			s.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function C() {
			ie.value = !0;
		}
		function w() {
			ie.value = !1;
		}
		return (n, o) => (D(), be(Wr, { "portal-target": t.portalTarget }, {
			default: pe(() => [t.status.state === "blocked" ? (D(), O("div", {
				key: 0,
				class: k(A(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				j("p", { class: k(A(e).state_screen_eyebrow) }, M(u.value), 3),
				j("h1", { class: k(A(e).state_screen_title) }, M(A(a)("app.unsupported_host.title")), 3),
				j("p", { class: k(A(e).state_screen_description) }, M(A(a)("app.unsupported_host.description", {
					required_version: A(jn),
					current_version: l.value ?? A(a)("status.unknown")
				})), 3),
				j("a", {
					class: k(["tc-interactive", A(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, M(A(a)("app.unsupported_host.update_action")), 11, Gr)
			], 2)) : t.status.state === "failed" ? (D(), O("div", {
				key: 1,
				class: k(A(e).state_screen),
				"data-startup-state": "failed"
			}, [
				j("p", { class: k(A(e).state_screen_eyebrow) }, M(u.value), 3),
				j("h1", { class: k(A(e).state_screen_title) }, M(A(a)("app.fatal_error.title")), 3),
				j("p", { class: k(A(e).state_screen_description) }, M(A(a)("app.fatal_error.description")), 3),
				j("pre", {
					class: k(A(e).state_screen_detail),
					"data-testid": "startup-error-detail"
				}, M(t.status.detail), 3),
				j("button", {
					type: "button",
					class: k(["tc-interactive", A(e).state_screen_action]),
					onClick: re
				}, M(A(a)("app.fatal_error.reload_action")), 3)
			], 2)) : A(d) ? (D(), O(Oe, { key: 2 }, [
				S.value ? (D(), be(Ur, {
					key: 0,
					label: A(a)("app.name")
				}, {
					default: pe(() => [Ae(A(i), {
						state: A(d).state.value,
						controller: A(d).controller,
						onSelectRoute: ne,
						onSetInspectorCollapsed: b,
						onResizeInspector: x,
						onClose: w
					}, null, 8, ["state", "controller"])]),
					_: 1
				}, 8, ["label"])) : ye("", !0),
				Ae(jr, {
					enabled: oe.value && !S.value,
					"open-label": A(a)("app.name"),
					onOpen: C
				}, null, 8, ["enabled", "open-label"]),
				t.host && A(h) && t.capabilities ? (D(), be(A(r), {
					key: 1,
					host: t.host,
					service: A(h),
					gallery: t.capabilities.gallery,
					novelai: t.capabilities.novelai,
					translator: t.translator ?? null,
					"prompt-tags": ee.value
				}, null, 8, [
					"host",
					"service",
					"gallery",
					"novelai",
					"translator",
					"prompt-tags"
				])) : ye("", !0)
			], 64)) : ye("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
}), qr = "._slot_lzfdp_7,._notice_lzfdp_8,._lightbox_lzfdp_9,._paragraph_action_lzfdp_10{--tc-space-0-5:2px;--tc-space-1:4px;--tc-space-1-5:6px;--tc-space-2:8px;--tc-space-3:12px;--tc-control-height-sm:28px;--tc-control-padding-x-sm:12px;--tc-control-gap:6px;--tc-radius-control:999px;--tc-radius-image:6px;--tc-radius-popover:16px;--tc-motion-fast:.14s;--tc-marker:#f6d743;--tc-on-marker:#17171a}._slot_lzfdp_7{gap:var(--tc-space-1);margin:var(--tc-space-2) 0;max-width:min(100%,560px);color:var(--SmartThemeBodyColor,inherit);font-size:calc(var(--mainFontSize,1rem) * .9);grid-template-columns:minmax(0,1fr);display:grid}._frame_lzfdp_39{border-radius:var(--tc-radius-image);background:var(--SmartThemeBlurTintColor,#00000026);position:relative;overflow:hidden}._image_lzfdp_46{cursor:zoom-in;width:100%;height:auto;display:block}._placeholder_lzfdp_53{aspect-ratio:3/2;justify-content:center;align-items:center;gap:var(--tc-space-2);padding:var(--tc-space-3);text-align:center;opacity:.85;flex-direction:column;display:flex}._error_lzfdp_65{color:var(--SmartThemeQuoteColor,#e06c75)}._toolbar_lzfdp_69{align-items:center;gap:var(--tc-space-0-5);flex-wrap:wrap;display:flex}._status_lzfdp_76{font-size:.95em}._pager_lzfdp_80{align-items:center;gap:var(--tc-space-0-5);display:inline-flex}._counter_lzfdp_86{font-variant-numeric:tabular-nums;text-align:center;opacity:.75;min-width:3.2em;font-size:.85em}._scene_lzfdp_94{white-space:nowrap;text-overflow:ellipsis;opacity:.75;flex:8em;min-width:0;font-size:.85em;overflow:hidden}._actions_lzfdp_104{align-items:center;gap:var(--tc-space-0-5);margin-left:auto;display:inline-flex}._more_lzfdp_111{position:relative}._menu_lzfdp_115{right:0;bottom:calc(100% + var(--tc-space-1));z-index:3;min-width:10em;padding:var(--tc-space-1);border-radius:var(--tc-radius-popover);background:var(--SmartThemeChatTintColor,Canvas);display:grid;position:absolute;box-shadow:0 8px 24px #00000040}._menu_item_lzfdp_128{height:var(--tc-control-height-sm);padding:0 var(--tc-space-3);border-radius:var(--tc-radius-control);color:inherit;font:inherit;text-align:start;white-space:nowrap;cursor:pointer;background:0 0;border:0}._menu_item_lzfdp_128:hover:not(:disabled),._menu_item_lzfdp_128:focus-visible{background:#8080802e;outline:none}._menu_item_lzfdp_128:disabled{cursor:default;opacity:.5}._button_lzfdp_153{justify-content:center;align-items:center;gap:var(--tc-control-gap);min-width:var(--tc-control-height-sm);height:var(--tc-control-height-sm);padding:0 var(--tc-control-padding-x-sm);border-radius:var(--tc-radius-control);color:inherit;font:inherit;white-space:nowrap;cursor:pointer;transition:background-color var(--tc-motion-fast) ease;background:0 0;border:0;display:inline-flex}._button_lzfdp_153:hover:not(:disabled){background:var(--SmartThemeBlurTintColor,#80808026)}._icon_button_lzfdp_176{width:var(--tc-control-height-sm);padding:0}._button_lzfdp_153:focus-visible{outline-offset:1px;outline:2px solid}._button_lzfdp_153:disabled{cursor:default;opacity:.5}._skeleton_lzfdp_191{border-radius:var(--tc-radius-control);opacity:.2;background:currentColor;width:60%;height:.8em;animation:1.4s ease-in-out infinite _pulse_lzfdp_1}._notice_lzfdp_8{margin:var(--tc-space-2) 0;padding:var(--tc-space-2) var(--tc-space-3);border-inline-start:3px solid var(--SmartThemeQuoteColor,#e06c75);border-radius:0 var(--tc-radius-image) var(--tc-radius-image) 0;background:var(--SmartThemeBlurTintColor,#0000001a);font-size:calc(var(--mainFontSize,1rem) * .85)}._excerpt_lzfdp_209{margin:var(--tc-space-1-5) 0 0;white-space:pre-wrap;opacity:.8;max-height:8em;font-family:monospace;overflow:auto}@keyframes _pulse_lzfdp_1{50%{opacity:.45}}@media (prefers-reduced-motion:reduce){._skeleton_lzfdp_191{animation:none}}._lightbox_lzfdp_9{z-index:9999;cursor:zoom-out;background:#000c;justify-content:center;align-items:center;padding:2vmin;display:flex;position:fixed;inset:0}._lightbox_lzfdp_9 img{object-fit:contain;max-width:100%;max-height:100%}._notice_actions_lzfdp_248{gap:var(--tc-space-0-5);margin-top:var(--tc-space-1-5);flex-wrap:wrap;display:flex}@media (width<=600px){._scene_lzfdp_94{flex-basis:100%;order:-1}._button_label_lzfdp_262{clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}._actions_lzfdp_104 ._button_lzfdp_153{width:var(--tc-control-height-sm);padding:0}}._paragraph_action_lzfdp_10{z-index:50;justify-content:center;align-items:center;gap:var(--tc-control-gap);height:var(--tc-control-height-sm);min-width:var(--tc-control-height-sm);border-radius:var(--tc-radius-control);background:var(--tc-marker);color:var(--tc-on-marker);font:inherit;font-size:calc(var(--mainFontSize,1rem) * .85);cursor:pointer;border:0;padding:0;display:inline-flex;position:fixed;box-shadow:0 2px 6px #0003}._paragraph_action_lzfdp_10[data-kind=selection],._paragraph_action_lzfdp_10[data-kind=status]{padding:0 var(--tc-control-padding-x-sm);color:#fafaf7;background:#17171a;box-shadow:0 6px 18px #00000040}._paragraph_action_lzfdp_10[data-kind=selection]{transform:translate(-50%, calc(-100% - var(--tc-space-2)))}._paragraph_action_lzfdp_10[data-kind=status]{cursor:default;transform:translate(-100%)}._paragraph_action_lzfdp_10:focus-visible{outline-offset:2px;outline:2px solid}._paragraph_highlight_lzfdp_326{background:#f6d7432e;border-radius:4px;box-shadow:0 0 0 4px #f6d7432e}", Jr = "tavern-canvas-chat-style";
function Yr(e) {
	e.getElementById(Jr)?.remove();
	let t = e.createElement("style");
	return t.id = Jr, t.textContent = qr, e.head.append(t), () => {
		t.remove();
	};
}
//#endregion
//#region src/ui/create_shadow_root.ts
function Xr(e, t) {
	e.getElementById("tavern-canvas-root")?.remove();
	let n = e.createElement("div");
	n.id = "tavern-canvas-root";
	let r = n.attachShadow({ mode: "open" }), i = e.createElement("style");
	i.textContent = t, r.append(i);
	let a = e.createElement("div");
	a.dataset.shadowRole = "app", r.append(a);
	let o = e.createElement("div");
	o.dataset.shadowRole = "portal", r.append(o), e.body.append(n);
	let s = Je(r);
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
//#region src/modules/illustration/worldbook.ts
function Zr(e, t) {
	return typeof e == "string" ? ot(t, e) : new RegExp(e.source, e.flags.replace("g", "")).test(t);
}
function Qr(e, t) {
	if (e.secondary_keys.length === 0) return !0;
	let n = e.secondary_keys.map((e) => Zr(e, t));
	switch (e.secondary_logic) {
		case "and_any": return n.some(Boolean);
		case "and_all": return n.every(Boolean);
		case "not_all": return !n.every(Boolean);
		case "not_any": return !n.some(Boolean);
	}
}
function $r(e, t) {
	return e.filter((e) => e.enabled && e.content.trim() !== "" && (e.strategy === "constant" || e.strategy === "selective" && e.keys.some((e) => Zr(e, t)) && Qr(e, t))).sort((e, t) => e.order - t.order).map((e) => e.content.trim()).join("\n\n");
}
//#endregion
//#region src/modules/illustration/analysis_requests.ts
var ei = 3, ti = 2e3, ni = 18e4, ri = class extends Error {
	reason;
	constructor(e) {
		super(e === "cancelled" ? "Analysis was cancelled" : "Analysis timed out"), this.name = "AnalysisStoppedError", this.reason = e;
	}
};
async function ii(e, t, n, r) {
	let i, a = () => {}, o = new Promise((n, o) => {
		let s = (n) => {
			e.stop_generation(t), o(new ri(n));
		};
		a = () => {
			s("cancelled");
		}, i = setTimeout(() => {
			s("timed_out");
		}, ni), r.addEventListener("abort", a, { once: !0 });
	});
	try {
		return await Promise.race([n, o]);
	} finally {
		clearTimeout(i), r.removeEventListener("abort", a);
	}
}
async function ai(e, t) {
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
async function oi(e, t, n) {
	switch (e.mode) {
		case "chat": return { kind: "chat" };
		case "off": return {
			kind: "replace",
			text: ""
		};
		case "worldbook": return {
			kind: "replace",
			text: $r(await n.read_worldbook(e.worldbook), t)
		};
	}
}
async function si(e, t, n, r) {
	let i = e.settings(), a = i.wardrobe_model, o = a === null || i.connection.kind === "current" ? i.connection : {
		...i.connection,
		model: a
	};
	return (await e.host.generate_with_preset({
		generation_id: e.new_generation_id(),
		preset_name: i.preset_name,
		user_input: t,
		max_chat_history: 0,
		connection: await ai(o, e.resolve_analysis_key),
		json_schema: n,
		world_info: {
			kind: "replace",
			text: ""
		},
		image: r
	})).content;
}
function ci(e) {
	return (t, n) => si(e, [t, ...Ve(e.settings().wardrobe_guidance)].join("\n"), n, null);
}
async function li(e, t, n, r) {
	let i = e.settings(), a = await ai(i.connection, e.resolve_analysis_key), o = await oi(i.world_info, t, e.host);
	for (let t = 1;; t += 1) {
		if (r.aborted) throw new ri("cancelled");
		let s = e.new_generation_id();
		try {
			let t = await ii(e.host, s, e.host.generate_with_preset({
				generation_id: s,
				preset_name: i.preset_name,
				user_input: n.user_input,
				max_chat_history: i.max_chat_history,
				connection: a,
				json_schema: n.json_schema,
				world_info: o,
				image: null
			}), r);
			return n.parse(t.content);
		} catch (n) {
			if (t >= ei || n instanceof ri) throw n;
			await e.wait(ti * t);
		}
	}
}
//#endregion
//#region src/modules/media/media_command_service.ts
var ui = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async save(e) {
		let t = Qe(this.#e), n = {
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
}, di = class {
	#e = /* @__PURE__ */ new Map();
	register(e) {
		this.#e.set(e.request_id, e);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
};
async function fi(e, t, n) {
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
var pi = 1e3;
function mi(e) {
	if (e instanceof P) return new R({
		code: e.code === "configuration" ? "not_configured" : "malformed_response",
		retryable: !1
	});
	if (e instanceof Error && "provider_error" in e) {
		let t = re.safeParse(e.provider_error);
		if (t.success) return new R(t.data);
	}
	return e;
}
var hi = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new R({
			code: "invalid_request",
			retryable: !1
		});
		let r;
		try {
			r = await this.#n(n, t);
		} catch (e) {
			throw mi(e);
		}
		let i = await this.#r(n, r), a;
		try {
			a = await this.#i(e, i);
		} catch {
			throw new R({
				code: "storage_failed",
				retryable: !1
			});
		}
		return { image_ids: a };
	}
	async #n(e, t) {
		let n = (await this.#e.load_adapters())[e.provider_id];
		if (n === void 0) throw new R({
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
		let a = i.poll_after_ms ?? pi;
		for (;;) {
			await this.#t(a);
			let e = await n.poll(r, i);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new R(e.error);
			a = e.poll_after_ms ?? a;
		}
	}
	#r(e, t) {
		return this.#e.postprocess === void 0 ? Promise.resolve(t) : this.#e.postprocess(e, t);
	}
	#i(e, t) {
		return fi(this.#e, e, t.map((e) => ({
			bytes: e.bytes,
			media_type: e.asset.media_type
		})));
	}
};
async function gi(e, t, n) {
	return e.plans.register(n), _i(e.queue, t, n.request_id, n.provider_id);
}
async function _i(e, t, n, r) {
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
function vi(e, t) {
	return e.queue.cancel(t);
}
//#endregion
//#region src/modules/illustration/slot_markers.ts
var yi = "[A-Za-z0-9_-]{8,32}", bi = RegExp(`<!--tc-image:(${yi})-->`, "gu");
function xi(e) {
	return `<!--tc-image:${e}-->`;
}
var Si = [{
	id: "tavern-canvas-image-slot-display",
	script_name: "Inkwell image slot (display)",
	find_regex: `/<!--tc-image:(${yi})-->/g`,
	replace_string: "<div class=\"tavern-canvas-slot\" data-tc-slot=\"$1\"></div>",
	destination: "display"
}, {
	id: "tavern-canvas-image-slot-prompt",
	script_name: "Inkwell image slot (prompt)",
	find_regex: `/\\n?<!--tc-image:${yi}-->/g`,
	replace_string: "",
	destination: "prompt"
}];
function Ci(e) {
	return [...e.matchAll(bi)].map((e) => e[1] ?? "");
}
function wi(e) {
	return e.toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
}
function Ti(e, t) {
	let n = wi(t);
	if (n.length === 0) return null;
	let r = e.map((e) => wi(e.text));
	for (let t of [
		24,
		12,
		6
	]) {
		let i = n.slice(0, t), a = r.findIndex((e) => e.includes(i));
		if (a !== -1) return e[a]?.index ?? null;
	}
	return null;
}
function Ei(e) {
	let t = [], n = !1;
	return e.split("\n").forEach((e, r) => {
		let i = e.trim();
		if (i.startsWith("```")) {
			n = !n;
			return;
		}
		n || i.length === 0 || Ci(i).length > 0 || t.push({
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
		i.push(xi(e.slot_id)), r.set(t.line, i);
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
//#region src/modules/illustration/slot_prompt.ts
var ji = /^(?:\d+)?(girl|boy|other)s?$/u;
function Mi(e) {
	let t = null, n = [];
	for (let r of e.split(",")) {
		let e = ji.exec(mt(r).toLowerCase());
		e === null ? n.push(r) : t ??= e[1];
	}
	return {
		subject: t,
		rest: F(n)
	};
}
function Ni(e) {
	return [
		"girl",
		"boy",
		"other"
	].map((t) => {
		let n = e.filter((e) => e === t).length;
		return n === 0 ? "" : n === 1 ? `1${t}` : `${String(n)}${t}s`;
	}).filter((e) => e !== "").join(", ");
}
function Pi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.triggers) n.set(mt(t), e.replacement);
	return F(e.split(",").map((e) => n.get(mt(e)) ?? e));
}
function Fi(e, t) {
	if (t === null) return ht(e);
	let n = Pi(e, t.replacement_rules);
	return ht(ki(n, t.regex_rules).text);
}
function Ii(e, t) {
	return F(y.filter((e) => e !== "expression" || !t).flatMap((t) => e.appearance[t]));
}
function Li(e, t) {
	let n = new Set(t.map((e) => e.trim().toLowerCase()));
	return F(e.split(",").filter((e) => {
		let t = mt(e).toLowerCase().replace(/^wearing\s+/u, "");
		return !n.has(t);
	}));
}
function Ri(e) {
	let t = e.library.characters, n = [], r = /* @__PURE__ */ new Set(), i = (i, a) => {
		let o = t[i];
		if (o === void 0 || r.has(o.character.id)) return;
		r.add(o.character.id);
		let s = Mi(Li(a, e.library.outfit_names));
		n.push({
			name: o.character.name,
			subject: o.character.subject === "other" ? s.subject ?? "other" : o.character.subject,
			prompt: F([
				Ii(o.character, s.rest !== ""),
				F(o.outfit_tags),
				s.rest
			]),
			negative_prompt: F(o.character.excluded_traits)
		});
	};
	for (let r of e.characters) {
		let e = t.findIndex((e) => lt(e.character, r.name));
		if (e !== -1) {
			i(e, r.tags);
			continue;
		}
		let a = Mi(r.tags);
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
function zi(e) {
	let t = e.preset, n = Ri(e), r = ht(t?.fixed_negative_prompt ?? "");
	if (n.length === 0) return {
		positive_prompt: Fi(F([t?.fixed_positive_prompt, e.scene_tags]), t),
		negative_prompt: r,
		character_prompts: []
	};
	let i = n.flatMap((e) => e.subject === null ? [] : [e.subject]);
	return {
		positive_prompt: Fi(F([
			t?.fixed_positive_prompt,
			Ni(i),
			Mi(e.scene_tags).rest
		]), t),
		negative_prompt: r,
		character_prompts: n.flatMap((e) => {
			let n = Fi(F([e.subject, e.prompt]), t);
			return n === "" ? [] : [{
				name: e.name,
				prompt: n,
				negative_prompt: ht(e.negative_prompt)
			}];
		})
	};
}
//#endregion
//#region src/modules/illustration/proposal_slots.ts
function Bi(e, t, n, r, i) {
	return t.map((t) => {
		let a = st(`${e[t.paragraph]?.text ?? ""}\n${t.scene}`, t.characters.map((e) => e.name), n.library, r), o = zi({
			preset: n.preset,
			library: a,
			characters: t.characters,
			scene_tags: t.tags
		});
		return {
			slot_id: i(),
			paragraph: t.paragraph,
			anchor: (e[t.paragraph]?.text ?? "").slice(0, 400),
			scene: t.scene,
			characters: [.../* @__PURE__ */ new Set([...t.characters.map((e) => e.name), ...a.characters.map((e) => e.character.name)])],
			positive_prompt: o.positive_prompt,
			negative_prompt: o.negative_prompt,
			character_prompts: [...o.character_prompts],
			image_ids: [],
			active_image_id: null,
			pending_request_ids: [],
			last_error: null
		};
	});
}
//#endregion
//#region src/modules/illustration/illustration_service.ts
var Vi = class extends Error {
	constructor(e) {
		super(`Message ${String(e)} changed while it was being analyzed`), this.name = "MessageChangedError";
	}
}, Hi = /* @__PURE__ */ new Set([
	"normal",
	"swipe",
	"regenerate",
	"continue"
]);
async function Ui(e, t) {
	let { attach_character_prompts: n } = await import("./chunks/character_prompts-BRu7L7wm.js");
	return n(e, t);
}
function Wi(e) {
	return e instanceof P && e.code === "configuration" ? "not_configured" : e instanceof He ? "analysis_unparsable" : e instanceof ri ? e.reason : e instanceof Vi ? "message_changed" : (e instanceof Error ? e.message : String(e)).slice(0, 500);
}
var Gi = class {
	#e;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Set();
	#r = /* @__PURE__ */ new Map();
	#i = null;
	#a = [];
	constructor(e) {
		this.#e = e;
	}
	start() {
		this.#a.length > 0 || (this.#a = [this.#e.host.subscribe_generation((e) => {
			this.#p(e);
		}), this.#e.jobs.subscribe((e) => {
			this.#f(e);
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
		let t = zt.safeParse(this.#e.host.read_swipe_record(e));
		return t.success ? t.data : null;
	}
	is_pending(e) {
		return this.#t.has(e);
	}
	source_of(e) {
		return this.#t.get(e)?.location ?? null;
	}
	active_location(e) {
		let t = this.#e.host.get_active_chat_id(), n = t === null ? null : this.#e.host.get_active_swipe_id(e);
		return t === null || n === null ? Promise.reject(/* @__PURE__ */ Error(`Message ${String(e)} is not in the active chat`)) : Promise.resolve({
			chat_id: t,
			message_id: e,
			swipe_id: n
		});
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
		let o = new AbortController();
		this.#r.set(a, o), this.#g({
			type: "analysis_started",
			location: r
		});
		try {
			let e = await this.#o(r, n.swipes[r.swipe_id]?.content ?? "", o.signal);
			return this.#g({
				type: "slots_changed",
				location: r
			}), e;
		} catch (e) {
			throw e instanceof ri && e.reason === "cancelled" ? (this.#g({
				type: "analysis_cancelled",
				location: r
			}), e) : (this.#g({
				type: "analysis_failed",
				location: r,
				message: Wi(e),
				excerpt: e instanceof He ? e.excerpt : null
			}), e);
		} finally {
			this.#r.delete(a);
		}
	}
	cancel_analysis(e) {
		for (let [t, n] of this.#r) t.split(":").at(-2) === String(e) && n.abort();
	}
	async illustrate(e) {
		(await this.analyze(e)).slots.length > 0 && await this.generate_missing(await this.active_location(e));
	}
	auto_generation_enabled() {
		return this.#e.auto_generation_enabled();
	}
	async #o(e, t, n) {
		let r = Ei(t), i = this.#e.settings(), a = {
			schema_version: 2,
			slots: []
		};
		if (r.length > 0) {
			let o = this.#e.wardrobe.read(e) === null ? await this.#e.wardrobe.prepare_update(e) : null, s = await this.#e.prompt_context(e.chat_id), c = Be(r, i.max_images_per_message, s.library, i.analysis_guidance), l = (e) => Ge(e, r.length, i.max_images_per_message), { proposals: u, wardrobe_reply: d } = await li(this.#e, t, o === null ? {
				user_input: c,
				json_schema: Ke,
				parse: (e) => ({
					proposals: l(e),
					wardrobe_reply: null
				})
			} : {
				user_input: [
					c,
					"",
					o.input,
					...Ve(i.wardrobe_guidance),
					"",
					We
				].join("\n"),
				json_schema: Ue(o.json_schema),
				parse: (e) => ({
					proposals: l(e),
					wardrobe_reply: ze(e)
				})
			}, n), f = o === null ? await this.#h(e) : await this.#m(e, o, d);
			a.slots.push(...Bi(r, u, s, f, this.#e.new_slot_id));
		}
		if (await this.#e.host.write_swipe_record(e, a), a.slots.length > 0) {
			let n = Di(t, a.slots.map((e) => ({
				paragraph: e.paragraph,
				slot_id: e.slot_id
			})));
			if (!await this.#e.host.replace_message_text(e.message_id, t, n)) throw await this.#e.host.write_swipe_record(e, null), new Vi(e.message_id);
		}
		return a;
	}
	async #s(e) {
		let t = await this.#e.host.get_active_chat(), n = t.messages.find((t) => t.message_id === e.message_id);
		if (t.chat_id !== e.chat_id || n?.active_swipe_id !== e.swipe_id) throw new Vi(e.message_id);
		return n.swipes[e.swipe_id]?.content ?? "";
	}
	async paragraph_index_of(e, t) {
		let n = await this.active_location(e);
		return Ti(Ei(await this.#s(n)), t);
	}
	async illustrate_paragraph(e, t) {
		let n = await this.active_location(e), r = this.read(n)?.slots.find((e) => e.paragraph === t) ?? (await this.add_paragraphs(n, [t]))[0];
		if (r === void 0) throw RangeError(`Message ${String(e)} has no paragraph ${String(t)}`);
		return await this.generate(n, r.slot_id), r.slot_id;
	}
	async open_paragraphs(e) {
		let t = new Set(this.read(e)?.slots.map((e) => e.paragraph) ?? []);
		return Ei(await this.#s(e)).filter((e) => !t.has(e.index));
	}
	async add_paragraphs(e, t) {
		let n = await this.#s(e), r = Ei(n), i = this.read(e), a = new Set(i?.slots.map((e) => e.paragraph) ?? []), o = [...new Set(t)].filter((e) => e < r.length && !a.has(e)).sort((e, t) => e - t);
		if (o.length === 0) return [];
		let s = this.#e.settings(), c = await this.#h(e), l = await this.#e.prompt_context(e.chat_id), u = await li(this.#e, n, {
			user_input: Re(r, o, l.library, s.analysis_guidance),
			json_schema: Ke,
			parse: (e) => Ge(e, r.length, r.length)
		}, new AbortController().signal), d = new Map(u.map((e) => [e.paragraph, e])), f = Bi(r, o.map((e) => d.get(e) ?? {
			paragraph: e,
			scene: (r[e]?.text ?? "").slice(0, 120),
			tags: "",
			characters: []
		}), l, c, this.#e.new_slot_id);
		await this.#e.host.write_swipe_record(e, {
			schema_version: 2,
			slots: [...i?.slots ?? [], ...f]
		});
		let p = Di(n, f.map((e) => ({
			paragraph: e.paragraph,
			slot_id: e.slot_id
		})));
		if (!await this.#e.host.replace_message_text(e.message_id, n, p)) throw await this.#e.host.write_swipe_record(e, i), new Vi(e.message_id);
		return this.#g({
			type: "slots_changed",
			location: e
		}), f;
	}
	preview_request(e, t, n) {
		let r = this.#u(e, t);
		return this.#c(n ?? r);
	}
	async #c(e) {
		return Ui(await this.#e.build_request(e), e.character_prompts);
	}
	async generate_image(e) {
		let t = await this.#c(e), n = /* @__PURE__ */ new Map(), r = null, i = null, a = this.#e.jobs.subscribe((e) => {
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
		let { OUTFIT_FROM_IMAGE_INPUT: t, OUTFIT_FROM_IMAGE_JSON_SCHEMA: n, parse_outfit_from_image: r } = await import("./chunks/outfit_from_image-CVVCtwe6.js");
		return r(await si(this.#e, t, n, e));
	}
	async read_character(e) {
		let { CHARACTER_FROM_IMAGE_INPUT: t, CHARACTER_FROM_IMAGE_JSON_SCHEMA: n, parse_character_from_image: r } = await import("./chunks/character_from_image-CVgB9fk-.js");
		return r(await si(this.#e, t, n, e));
	}
	async generate(e, t, n) {
		let r = this.#u(e, t), i = {
			positive_prompt: n?.positive_prompt ?? r.positive_prompt,
			negative_prompt: n?.negative_prompt ?? r.negative_prompt,
			character_prompts: n?.character_prompts ?? r.character_prompts
		};
		await this.#l(e, t, () => this.#c(i), (e) => ({
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
		let r = this.#u(e, t), i = n.kind === "img2img" || n.kind === "inpaint" ? r.character_prompts : [];
		await this.#l(e, t, async () => Ui(await this.#e.build_edit_request(n), i));
	}
	async #l(e, t, n, r = (e) => e) {
		let i;
		try {
			i = await this.#e.submit(await n());
		} catch (n) {
			throw await this.#d(e, t, (e) => ({
				...e,
				last_error: Wi(n)
			})), n;
		}
		this.#t.set(i, {
			location: e,
			slot_id: t
		}), await this.#d(e, t, (e) => ({
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
		return this.#d(e, t, (e) => {
			let r = e.image_ids.find((e) => e === n);
			if (r === void 0) throw Error(`Image ${n} does not belong to slot ${t}`);
			return {
				...e,
				active_image_id: r
			};
		});
	}
	#u(e, t) {
		let n = this.read(e)?.slots.find((e) => e.slot_id === t);
		if (n === void 0) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		return n;
	}
	async #d(e, t, n) {
		let r = this.read(e);
		if (r === null || !r.slots.some((e) => e.slot_id === t)) throw Error(`Slot ${t} is not on message ${String(e.message_id)}`);
		await this.#e.host.write_swipe_record(e, {
			...r,
			slots: r.slots.map((e) => e.slot_id === t ? n(e) : e)
		}), this.#g({
			type: "slots_changed",
			location: e
		});
	}
	async #f(e) {
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
			await this.#d(t.location, t.slot_id, (t) => n ? {
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
	#p(e) {
		if (e.phase === "started") {
			this.#i = e.dry_run ? null : e.generation_type;
			return;
		}
		if (e.phase === "stopped") {
			this.#i = null;
			return;
		}
		let t = this.#i;
		this.#i = null, !(t === null || !Hi.has(t)) && this.active_location(e.message_id).then(async (n) => {
			t === "swipe" && (await this.#e.host.write_swipe_record(n, null), await this.#e.host.write_swipe_wardrobe(n, null)), this.#e.auto_generation_enabled() ? await this.illustrate(e.message_id) : await this.#h(n);
		}).catch(() => {});
	}
	async #m(e, t, n) {
		try {
			if (n === null) throw Error("The analysis reply contains no wardrobe object");
			return await t.apply(n);
		} catch (t) {
			return this.#g({
				type: "wardrobe_failed",
				location: e,
				message: Wi(t)
			}), this.#e.wardrobe.current(e.message_id);
		}
	}
	async #h(e) {
		let t = this.#e.wardrobe.read(e);
		if (t !== null) return t;
		try {
			return await this.#e.wardrobe.update(e.message_id);
		} catch (t) {
			return this.#g({
				type: "wardrobe_failed",
				location: e,
				message: Wi(t)
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
	#g(e) {
		for (let t of this.#n) t(e);
	}
};
//#endregion
//#region src/modules/wardrobe/wardrobe_library_port.ts
function Ki(e) {
	return {
		async load(t) {
			return te(await e.load(), t);
		},
		async create_character(t, n) {
			await e.save("character", {
				id: t.id,
				category: "character",
				record_key: "",
				display_name: t.name,
				payload: {
					aliases: v(t.aliases),
					subject: t.subject,
					...Object.fromEntries(y.map((e) => [e, v(t.appearance[e] ?? [])])),
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
					...Object.fromEntries(ne.map((e) => [e, v(t.slots[e] ?? [])])),
					origin: "analysis",
					chat_id: n
				}
			});
		},
		async add_appearance(t) {
			let n = (await e.load()).character.find((e) => e.id === t.character_id);
			if (n === void 0) return;
			let r = Object.fromEntries(Object.entries(t.slots).map(([e, t]) => [e, v(t)]));
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
function qi(e, t) {
	let n = e.messages.find((e) => e.message_id === t);
	return n === void 0 ? null : {
		chat_id: e.chat_id,
		message_id: t,
		swipe_id: n.active_swipe_id
	};
}
var Ji = class {
	#e;
	#t = /* @__PURE__ */ new Map();
	constructor(e) {
		this.#e = e;
	}
	read(e) {
		let t = _.safeParse(this.#e.host.read_swipe_wardrobe(e));
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
		let t = await this.#e.host.get_active_chat(), n = qi(t, e);
		return (n === null ? null : this.read(n)) ?? this.inherited(t, e);
	}
	update(e) {
		return this.#e.host.get_active_chat().then(async (t) => {
			let n = qi(t, e);
			if (n === null) throw Error(`Message ${String(e)} is not in the active chat`);
			let r = `${n.chat_id}:${String(e)}:${String(n.swipe_id)}`, i = this.#t.get(r);
			if (i !== void 0) return i;
			let a = this.#n(t, n).finally(() => this.#t.delete(r));
			return this.#t.set(r, a), a;
		});
	}
	async prepare_update(e) {
		return this.#r(await this.#e.host.get_active_chat(), e);
	}
	async #n(e, t) {
		let n = await this.#r(e, t);
		return n.apply(await this.#e.run(n.input, n.json_schema));
	}
	async #r(e, t) {
		let n = e.messages.find((e) => e.message_id === t.message_id)?.swipes[t.swipe_id]?.content ?? "", r = [...e.messages].filter((e) => e.message_id < t.message_id).reverse().find((e) => e.role === "user")?.swipes.at(0)?.content ?? null, i = this.inherited(e, t.message_id), [a, { apply_scene_update: o, build_scene_update_input: s, characters_needing_outfit: c, parse_scene_update: l, scene_update_json_schema: u }] = await Promise.all([this.#e.library.load(t.chat_id), import("./chunks/scene_update-DO2qPdJL.js")]), d = c(n, i, a);
		return {
			input: s(r, n, i, a),
			json_schema: u(d.map((e) => e.id)),
			apply: async (e) => {
				let n = o(l(e), i, a, this.#e.new_id);
				for (let e of n.new_outfits) await this.#e.library.create_outfit(e, t.chat_id);
				for (let e of n.new_characters) await this.#e.library.create_character(e, t);
				for (let e of n.appearance_additions) await this.#e.library.add_appearance(e);
				return await this.#i(t, n.wearing), n.wearing;
			}
		};
	}
	async set_wearing(e, t) {
		let n = await this.#e.host.get_active_chat(), r = this.read(e) ?? this.inherited(n, e.message_id);
		await this.#i(e, [...r.filter((e) => e.character_id !== t.character_id), t]);
	}
	#i(e, t) {
		return this.#e.host.write_swipe_wardrobe(e, _.parse({
			schema_version: 1,
			wearing: t
		}));
	}
}, Yi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
function Xi() {
	return [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))].map((e) => Yi[e % 64] ?? "_").join("");
}
async function Zi(e, t) {
	return Qi(await e.load(), t);
}
function Qi(e, t) {
	let n = (e) => typeof e == "string" ? e.trim() : "";
	return {
		...te(e, t),
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
async function $i(e, t, n, r) {
	let [i, a] = await Promise.all([n === null ? null : e.load_draft(n), Zi(t, r)]);
	return {
		preset: i,
		library: a
	};
}
var ea = class {
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
			await this.#t.sync_regex_scripts(Si), this.#n = null;
		} catch (e) {
			this.#n = e instanceof Error ? e.message : String(e);
		}
		this.#e.start();
	}
	stop() {
		return this.#e.stop(), Promise.resolve();
	}
}, ta = /[぀-ヿ㐀-鿿豈-﫿]/u, na = /[,，、]/u;
function ra(e) {
	return e.split(na).map((e) => e.trim()).filter((e) => e.length > 0);
}
function ia(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function aa(e) {
	let t = e.trim().replace(/^-?[\d.]+::/u, "").replace(/::$/u, ""), n = /^\((.+):[\d.]+\)$/u.exec(t);
	for (n?.[1] !== void 0 && (t = n[1]); /^[{[].*[}\]]$/u.test(t);) t = t.slice(1, -1);
	return t.trim().toLowerCase();
}
function oa(e) {
	return e.trim().replace(/[.。]+$/u, "").toLowerCase();
}
async function sa(e, t) {
	let n = ra(e);
	return (await Promise.all(n.map(async (e) => {
		if (!ta.test(e)) return e;
		let n = t.glossary.find((t) => ia(t.source, e));
		return n === void 0 ? await t.find_tag(e) ?? oa(await t.deepl(e, "EN-US")) : n.target;
	}))).join(", ");
}
async function ca(e, t) {
	let n = ra(e);
	return (await Promise.all(n.map(async (e) => {
		if (ta.test(e)) return e;
		let n = aa(e), r = t.glossary.find((e) => ia(e.target, n));
		return r === void 0 ? await t.find_translation(n) ?? (await t.deepl(n, "ZH")).trim() : r.source;
	}))).join("，");
}
//#endregion
//#region src/modules/translation/prompt_translator.ts
var la = 10;
function ua(e) {
	let t = e.translation?.split("-")[0]?.trim() ?? "";
	return t === "" ? null : t;
}
function da(e) {
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
				return t === void 0 ? null : ua(t);
			},
			deepl: i
		};
	}
	return {
		to_tags: (e) => sa(e, a()),
		read_in_chinese: (e) => ca(e, a()),
		async suggest(t) {
			let n;
			try {
				n = await e.vocabulary.lookup(t.trim());
			} catch {
				return [];
			}
			return n === null ? null : n.results.slice(0, la).map((e) => ({
				tag: e.display_text.replaceAll("_", " "),
				translation: ua(e),
				popularity: e.popularity
			}));
		},
		prepare: () => e.vocabulary.prepare()
	};
}
//#endregion
//#region src/storage/sillytavern_settings.ts
var fa = "tavern_canvas", pa = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), ma = /* @__PURE__ */ new Set(["gateway"]), ha = /* @__PURE__ */ new Set([...Object.keys(w.shape), ...ma]), ga = new Set(Object.keys(T.shape)), _a = {
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
function va(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ya() {
	return structuredClone(_a);
}
function ba(e) {
	return JSON.stringify(e);
}
function xa(e) {
	try {
		let t = ba(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function Sa(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = pa.has(i) ? "disallowed_category" : "unknown_field";
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
function Ca(e, t, n, r, i) {
	if (!va(t)) return t !== void 0 && i.push({
		path: r,
		code: "invalid_value"
	}), structuredClone(n);
	Sa(t, new Set(Object.keys(e)), r, i);
	let a = {};
	for (let o of Object.keys(e)) a[o] = W(e[o], t[o], structuredClone(n[o]), `${r}.${o}`, i);
	return a;
}
function wa(e, t) {
	let n = _a.ui;
	return va(e) ? (Sa(e, ga, "ui", t), {
		color_mode: W(T.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: W(T.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: W(T.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: W(T.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function Ta(e, t) {
	if (e === void 0) return ya();
	let n = xa(e);
	if (n === null || n > 65536) return t.push({
		path: fa,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), ya();
	if (!va(e)) return t.push({
		path: fa,
		code: "invalid_value"
	}), ya();
	Sa(e, ha, "", t);
	let r = _a;
	return {
		schema_version: W(w.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: W(w.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: W(w.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: W(ae, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: W(w.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: W(w.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: W(w.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		vocabulary_update_channel: W(w.shape.vocabulary_update_channel, e.vocabulary_update_channel, r.vocabulary_update_channel, "vocabulary_update_channel", t),
		illustration: Ca(ie.shape, e.illustration, r.illustration, "illustration", t),
		translation: Ca(S.shape, e.translation, r.translation, "translation", t),
		ui: wa(e.ui, t)
	};
}
function Ea(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = Ta(t[fa], i);
	t[fa] = a;
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
		return a = e, t[fa] = a, o = !0, l(), a;
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
var G = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, Da = "The host refused to reveal the stored credential. Switch credential storage to This device in Settings > General and enter the key again, or allow key exposure in the host (allowKeysExposure in SillyTavern's config.yaml).", Oa = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = nn(t);
	}
	async resolve_secret(e) {
		if (!m.safeParse(e).success) throw new G("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: un(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new G("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new G("not_exposed", Da) : t.status === 404 ? new G("not_found", "The host vault holds no such credential") : new G("unavailable", `The host secret vault answered with status ${String(t.status)}`);
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
function ka(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Aa(e, t) {
	return !ka(e) || typeof t != "function" ? null : new Oa(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var ja = class {
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
}, Ma = class extends P {
	constructor(e, t) {
		super("configuration", e, t), this.name = "TransportConfigurationError";
	}
};
function Na(e) {
	let t = Pa(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = Fa(e.direct_provider_base_url);
		if (!ce(t)) throw new Ma("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new Ma("No provider transport is available");
}
function Pa(e) {
	if (e === null || Pt(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Ma("This provider needs a stored credential before it can be called directly; set one on the active profile");
	if (!e.secrets_readable) throw new Ma("This host cannot reveal stored credentials, so a direct provider call is impossible; switch the credential storage to this device");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Fa(e) {
	try {
		return C(e);
	} catch (e) {
		throw new Ma("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function K(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function q(e) {
	return K(e.payload);
}
function J(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function Ia(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function La(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function Ra(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function za(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function Y(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => Y(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = Y(i, n));
	return r;
}
var Ba = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, Va = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"workflow",
	"prompt_tag"
];
function Ha(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit": return e.outfit_profiles;
		case "lora": return e.lora_profiles;
		case "prompt_tag": return e.prompt_tag_presets;
	}
}
function Ua(e, t) {
	let n = q(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: J(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function Wa(e, t) {
	let n = Ra(q(e), "order", 2 ** 53 - 1), r = Ra(q(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function Ga(e) {
	let t = new Ba();
	async function n(t) {
		return [...await Ha(e.repositories, t).list(e.namespace())].sort(Wa).map((e) => Ua(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(Va.map(async (e) => [e, await n(e)]));
			return Object.fromEntries(e);
		},
		subscribe: (e) => t.subscribe(e),
		async save(n, r) {
			let i = Ha(e.repositories, n), a = e.namespace(), o = await i.get(a, r.id), s = e.now(), c = o === null ? Math.max(-1, ...(await i.list(a)).map((e) => Ra(q(e), "order", -1))) + 1 : Ra(q(o), "order", 2 ** 53 - 1), l = {
				schema_version: 1,
				id: r.id,
				namespace: a,
				record_key: `${a}:${r.id}`,
				created_at: o?.created_at ?? s,
				updated_at: s,
				payload: Y({
					...r.payload,
					display_name: r.display_name,
					...c === 2 ** 53 - 1 ? {} : { order: c }
				})
			};
			await i.put(a, l);
			let u = Ua(l, n);
			return t.emit({
				type: "asset_upserted",
				asset: u
			}), u;
		},
		async remove(n, r) {
			await Ha(e.repositories, n).delete(e.namespace(), r), t.emit({
				type: "asset_removed",
				category: n,
				asset_id: r
			});
		},
		async reorder(t, n) {
			let r = Ha(e.repositories, t), i = e.namespace(), a = e.now();
			for (let [e, t] of n.entries()) {
				let n = await r.get(i, t);
				n !== null && await r.put(i, {
					...n,
					updated_at: a,
					payload: Y({
						...q(n),
						order: e
					})
				});
			}
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/diagnostics_capability.ts
var Ka = 500, qa = class {
	#e = [];
	#t = new Ba();
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
		this.#e.push(t), this.#e.length > Ka && this.#e.shift(), this.#t.emit({
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
function Ja(e) {
	return e === null ? {} : {
		schema_version: e.schema_version,
		locale: e.locale,
		global_concurrency: e.global_concurrency,
		auto_generation_enabled: e.auto_generation_enabled,
		ui: e.ui
	};
}
function Ya(e) {
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
					...Ja(e.settings()),
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
function Xa(e) {
	return {
		status: "available",
		value: e
	};
}
function X(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function Z(e) {
	try {
		return Xa(e());
	} catch (e) {
		return X(Za(e));
	}
}
function Za(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function Qa(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var $a = "capability_unavailable";
function Q(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: $a }), t;
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
	let n = x.parse(e.provider_id);
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
function no(e) {
	let t = new Ba();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Q(`Gallery record ${t} no longer exists`);
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
		await nt(e.database, e.namespace(), n), t.emit({
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
			let r = await n(t), i = await $e(e.database, r.sha256);
			if (i === null) throw Q(`Gallery record ${t} has no stored bytes; the blob was evicted`);
			return i;
		},
		async read_thumbnail(t) {
			let i = await n(t), a = await rt(e.database, i.sha256);
			if (a !== null && i.width !== void 0) return a.bytes;
			let o = await $e(e.database, i.sha256);
			if (o === null) throw Q(`Gallery record ${t} has no stored bytes; the blob was evicted`);
			let s = i.width === void 0 ? et(o) : null;
			if (s !== null && await r({
				...i,
				...s
			}), a !== null) return a.bytes;
			let c = await e.make_thumbnail(o, i.media_type);
			return await tt(e.database, i.sha256, c, "image/webp"), c;
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
function ro(e) {
	return e.image_count ?? 1;
}
function io(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: x.parse(e.provider_id),
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
		provider_id: x.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
var oo = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running"
]);
async function so(e, t, n) {
	for (let r of await e.list(t)) oo.has(r.state) && await e.put(t, {
		...r,
		state: "failed",
		error: {
			code: "interrupted",
			retryable: !1
		},
		updated_at: n
	});
}
function co(e) {
	let t = new Ba(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: io(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await gi({
			queue: e.queue,
			plans: e.plans
		}, {
			...i,
			scene_description: r.prompt
		}, r);
		return n.set(a.job_id, r), io(a);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map(ao);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return io(await vi({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw Q(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
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
//#region src/bootstrap/page_lock.ts
var lo = "inkwell:page:";
async function uo(e, t) {
	if (e === void 0) return {
		sole_page: !0,
		release: () => {}
	};
	let n = `${lo}${t}`, r = () => {};
	await new Promise((t) => {
		e.request(n, () => new Promise((e) => {
			r = e, t();
		}));
	});
	let { held: i = [] } = await e.query();
	return {
		sole_page: !i.some((e) => e.name !== n && e.name?.startsWith(lo) === !0),
		release: r
	};
}
//#endregion
//#region src/bootstrap/capabilities/novelai_capability.ts
var fo = 3e4, po = 12e4, mo = 3e4;
function ho(e) {
	return {
		load: async () => (await e()).list_models(),
		get_account: async () => (await e()).get_account(AbortSignal.timeout(fo)),
		refresh_models: async () => (await e()).refresh_models(AbortSignal.timeout(po)),
		estimate_cost: async (t) => (await e()).estimate_cost(t, AbortSignal.timeout(mo))
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
var go = "inkwell:library";
function _o(e) {
	return Ht.parse({
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
var vo = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		if (this.#e.get_active_chat_id() === null) return this.#n();
		let e = await this.#e.get_active_chat(), t = kt(_o(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
	#n() {
		let e = kt(Ht.parse({
			schema_version: 1,
			chat_id: go,
			active_swipes: [],
			messages: []
		}), this.#t);
		return {
			chat_id: go,
			requested_swipe_id: 0,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor
		};
	}
}, yo = "vault_key", bo = "novelai_defaults", xo = "prompt_tags", So = "provider_profile", Co = 2e7, wo = "base_url";
function To(e) {
	return e === "sd_webui" || e === "comfyui";
}
function Eo(e) {
	let t = C(e);
	if (!ce(t)) throw TypeError("A local provider address must be a loopback address");
	return t;
}
function Do(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function Oo(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: Co,
		max_input_asset_bytes: Co,
		...t?.provider_id === e.provider_id ? K(q(t)[So]) : {},
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
function ko(e) {
	return {
		...K(q(e)[So]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function Ao(e) {
	let t = q(e), n = K(t[So]);
	return {
		id: e.id,
		provider_id: x.parse(e.provider_id),
		display_name: J(t, "display_name", e.id),
		model_id: Do(za(n, "model_allowlist")),
		workflow_id: Do(za(n, "workflow_allowlist")),
		base_url: typeof t[wo] == "string" ? t[wo] : null,
		is_default: La(t, "is_default", !1),
		credential_reference: typeof t.vault_key == "string" ? t[yo] : null,
		updated_at: e.updated_at,
		novelai_defaults: Mo(e),
		prompt_tags: jo(e)
	};
}
function jo(e) {
	let t = Vt.safeParse(q(e)[xo]);
	return t.success ? t.data : null;
}
function Mo(e) {
	let t = le.safeParse(q(e)[bo]);
	return t.success ? t.data : null;
}
function No(e) {
	let t = new Ba();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw Q(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			let t = await e.repository.list(e.namespace());
			return Promise.all(t.map(async (t) => {
				let n = Ao(t);
				return n.credential_reference === null ? n : await e.credential_present(n.credential_reference).catch(() => !1) === !1 ? {
					...n,
					credential_reference: null
				} : n;
			}));
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				...q(i ?? { payload: {} }),
				display_name: n.display_name,
				is_default: n.is_default,
				[So]: Y(Oo(n, i))
			};
			i !== null && i.provider_id !== n.provider_id && Reflect.deleteProperty(o, yo), To(n.provider_id) && n.base_url !== null ? o[wo] = Eo(n.base_url) : Reflect.deleteProperty(o, wo);
			let s = {
				schema_version: 1,
				id: n.id,
				namespace: r,
				record_key: `${r}:${n.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: n.provider_id,
				payload: Y(o)
			}, c = (await e.load_adapters())[n.provider_id];
			if (c === void 0) throw Q(`Provider ${n.provider_id} is unavailable`);
			c.validate_profile(ko(s)), await e.repository.put(r, s);
			let l = Ao(s);
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
			if (e.secrets === null) throw Q("The selected credential storage backend is unavailable");
			let a = await n(r), o = b(a.namespace, r);
			await e.secrets.write_secret(o, i);
			let s = {
				...a,
				updated_at: e.now(),
				payload: Y({
					...q(a),
					[yo]: o
				})
			};
			await e.repository.put(a.namespace, s);
			let c = Ao(s);
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
				payload: Y({
					...q(a),
					[bo]: le.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Ao(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async save_prompt_tags(r, i) {
			let a = await n(r), o = {
				...a,
				updated_at: e.now(),
				payload: Y({
					...q(a),
					[xo]: Vt.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Ao(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async clear_credential(r) {
			let i = await n(r), a = { ...q(i) }, o = a[yo];
			Reflect.deleteProperty(a, yo), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: Y(a)
			};
			await e.repository.put(i.namespace, s);
			let c = Ao(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = x.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(ko(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof ut ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = q(i)[yo];
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
function Po(e) {
	let t = q(e);
	return {
		id: e.id,
		display_name: J(t, "display_name", e.id),
		group: Ia(t, "group"),
		updated_at: e.updated_at
	};
}
function Fo(e) {
	return e.flatMap((e) => {
		let t = K(e), n = Ia(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: za(t, "triggers").filter((e) => typeof e == "string"),
			replacement: J(t, "replacement", "")
		}];
	});
}
function Io(e) {
	return e.flatMap((e) => {
		let t = K(e), n = Ia(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: J(t, "pattern", ""),
			flags: J(t, "flags", ""),
			replacement: J(t, "replacement", "")
		}];
	});
}
function Lo(e) {
	let t = new Ba();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(Po);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw Q(`Prompt preset ${t} no longer exists`);
			let r = q(n);
			return {
				id: n.id,
				display_name: J(r, "display_name", n.id),
				group: Ia(r, "group"),
				fixed_positive_prompt: J(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: J(r, "fixed_negative_prompt", ""),
				replacement_rules: Fo(za(r, "replacement_rules")),
				regex_rules: Io(za(r, "regex_rules"))
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
				payload: Y({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = Po(s);
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
var Ro = "The selected credential storage backend is unavailable", zo = "SillyTavern's secret store is unreachable from this page", Bo = "deepl", Vo = "Listing world info books needs JS-Slash-Runner";
function Ho(e) {
	if (e === null) throw Q("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function Uo(e) {
	let t = new Ba(), n = null;
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
			if (e.secrets === null) throw Q(Ro);
			await e.secrets.write_secret(oe(e.settings.get_settings().active_namespace), t.trim());
		},
		list_worldbooks() {
			return e.list_worldbooks === null ? Promise.reject(Q(Vo)) : Promise.resolve(e.list_worldbooks());
		},
		async clear_analysis_key() {
			if (e.secrets?.delete_secret === void 0) throw Q(Ro);
			await e.secrets.delete_secret(oe(e.settings.get_settings().active_namespace));
		},
		async set_deepl_key(t) {
			if (e.host_secrets === null) throw Q(zo);
			await e.host_secrets.write_secret(Bo, t.trim());
		},
		async clear_deepl_key() {
			if (e.host_secrets?.delete_secret === void 0) throw Q(zo);
			await e.host_secrets.delete_secret(Bo);
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Q(Ro);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw Q(Ro);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Q(Ro);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw Q(Ro);
			return e.browser_secret_vault.reset();
		},
		set_vocabulary_update_channel(t) {
			return i({ vocabulary_update_channel: t }), e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new vt("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-CirR5JG_.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-DT8NRrC6.js");
			return t({
				database: Ho(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-DT8NRrC6.js");
			await n({
				database: Ho(e.database),
				archive: t,
				namespace: e.settings.get_settings().active_namespace
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function Wo(e) {
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
function Go(e) {
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
		async installed() {
			return await (await i()).ready(), e.read_active_package();
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
				let n = Wo(e);
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
//#region src/bootstrap/image_store_ports.ts
var Ko = 384;
async function qo(e, t) {
	let n = await createImageBitmap(new Blob([new Uint8Array(e)], { type: t })), r = Math.min(1, Ko / Math.max(n.width, n.height)), i = new OffscreenCanvas(Math.max(1, Math.round(n.width * r)), Math.max(1, Math.round(n.height * r))), a = i.getContext("2d");
	if (a === null) throw n.close(), Error("This browser cannot draw thumbnails");
	a.drawImage(n, 0, 0, i.width, i.height), n.close();
	let o = await i.convertToBlob({
		type: "image/webp",
		quality: .82
	});
	return new Uint8Array(await o.arrayBuffer());
}
async function Jo(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-DmcUjKNa.js"), o = {
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
function Yo(e, t) {
	let n = new at(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await $e(e, i.sha256);
		if (a === null) throw Error(`Source asset ${r} has no stored bytes`);
		if (i.media_type === "video/mp4") throw Error(`Source asset ${r} is a video and cannot be a provider input`);
		return {
			asset_id: r,
			media_type: i.media_type,
			bytes: a
		};
	} };
}
function Xo(e) {
	return Ye.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function Zo(e, t) {
	return {
		async put_image(n) {
			return { id: (await it(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: Xo(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new at(e).get(t(), n);
			if (r === null) return null;
			let i = await $e(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
//#endregion
//#region src/bootstrap/illustration_requests.ts
async function Qo(e, t) {
	let n = await import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r), r = n.effective_prompt_tags({
		provider_id: e.provider_id,
		model_id: e.model_id,
		prompt_tags: jo(e.record)
	}), i = n.prompt_tag_presets(t);
	return (e) => n.inject_prompt_tags(e, r, i);
}
function $o(e) {
	return {
		async build_request({ positive_prompt: t, negative_prompt: n, character_prompts: r }) {
			let i = await e.require_active_profile(), [{ build_generation_request: a }, o, s] = await Promise.all([
				import("./chunks/build_generation_request-BbaXLzyG.js"),
				import("./chunks/character_assets-C_vsqVcv.js"),
				e.assets.load()
			]), c = await Qo(i, s.prompt_tag), l = Qi(s, e.active_chat_id()), u = ct(r.map((e) => e.name), l), d = o.attach_character_loras(await a({
				provider_id: i.provider_id,
				positive_prompt: t,
				negative_prompt: n,
				image_count: 1,
				references: [],
				...i.model_id === null ? {} : { model_id: i.model_id }
			}, f.parse(crypto.randomUUID())), u, l.loras), p = e.novelai;
			if (d.provider_id !== "novelai" || d.action !== "generate" || p === null) return c(d);
			let [{ apply_novelai_defaults: m }, { reference_image_bytes: h }, g] = await Promise.all([
				import("./chunks/novelai_profile_defaults-CKb8rSMX.js"),
				import("./chunks/reference_image-B8V-aXPW.js").then((e) => e.r),
				p.load_runtime()
			]), ee = Mo(i.record), _ = ee === null ? d : await m(d, ee, {
				store_input: (e) => g.store_input(e),
				async load_vibe(t) {
					let n = await p.repositories.novelai_vibes.get(e.namespace(), t), r = n === null ? {} : q(n);
					return typeof r.image == "string" ? {
						image_bytes: h(r.image),
						strength: Ra(r, "strength", .6),
						information_extracted: Ra(r, "information_extracted", 1)
					} : null;
				}
			});
			return c(await o.attach_character_references(_, u, { store_reference: (e) => g.store_input(h(e)) }));
		},
		async build_edit_request(t) {
			let n = await e.read_active_profile();
			if (n?.provider_id !== "novelai" || e.novelai === null) throw Error("Quick edits need an active NovelAI provider profile");
			let [{ build_novelai_edit_request: r }, { compute_generation_anchor: i }, { DEFAULT_NOVELAI_MODEL_ID: a }, o] = await Promise.all([
				import("./chunks/slot_edits-DnXBLx1W.js"),
				import("./chunks/build_generation_request-BbaXLzyG.js"),
				import("./chunks/novelai_request_defaults-B0sJ9ANr.js").then((e) => e.r),
				e.assets.load()
			]), s = await Qo(n, o.prompt_tag), c = f.parse(crypto.randomUUID()), l = {
				request_id: c,
				generation_anchor: g.parse(await i(c)),
				model_id: n.model_id ?? a
			};
			if (t.kind !== "inpaint") return s(r(t, l));
			let u = await e.novelai.load_runtime();
			return s(r(t, {
				...l,
				mask_asset_id: await u.store_input(t.mask_png)
			}));
		}
	};
}
//#endregion
//#region src/transport/browser_fetch.ts
async function es(e, t, n, r) {
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
		throw new P("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await ts(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function ts(e, t, n) {
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
			if (a += s.byteLength, a > t) throw new P("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof P ? e : new pt({ cause: e });
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
//#region src/transport/provider_operations.ts
function ns(e) {
	try {
		if (!is(e)) throw $("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !as(a) || !as(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw $("Provider operation is invalid");
		if (ft(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw $("Provider operation is invalid");
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
		throw e instanceof P ? e : $("Provider operation is invalid", e);
	}
}
function rs(e) {
	try {
		if (!is(e)) throw $("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw $("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(C);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw $("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof P ? e : $("Remote provider asset operation is invalid", e);
	}
}
function is(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function as(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function $(e, t) {
	return new P("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/direct_cloud_transport.ts
var os = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = ns(e), n = cs(this.#e, t.route), r = await ls(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await ss(es(this.#r, n, {
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
		let t = rs(e);
		return es(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
};
async function ss(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof pt ? new pt() : e;
	}
}
function cs(e, t) {
	try {
		return Ft(e, t);
	} catch (e) {
		throw e instanceof Nt ? new P("configuration", e.message) : e;
	}
}
async function ls(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new P("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new P("configuration", us(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function us(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var ds = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = C(e.base_url);
		} catch (e) {
			throw new P("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!ce(t)) throw new P("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = ns(e);
		return es(this.#t, `${this.#e}${t.route}`, {
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
		let t = rs(e);
		return es(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
};
//#endregion
//#region src/bootstrap/provider_transports.ts
function fs(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = Pt(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new os({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new ds({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
	}
}
function ps(e, t) {
	let n = x.safeParse(e.provider_id).data;
	if (n === void 0) return null;
	let r = q(e);
	return {
		record: e,
		provider_id: n,
		model_id: za(K(r.provider_profile), "model_allowlist").find((e) => typeof e == "string") ?? null,
		base_url: Ia(r, "base_url"),
		direct_cloud: {
			provider_id: n,
			credential_reference: Ia(r, yo),
			secrets_readable: t
		}
	};
}
function ms(e) {
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
function hs(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new yt("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new yt("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new yt("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return fs({
		kind: "direct_cloud",
		provider_id: "novelai",
		credential_reference: e.credential_reference
	}, {
		secrets: t,
		...n === void 0 ? {} : { fetch: n }
	});
}
//#endregion
//#region src/host/chat_surface.ts
var gs = "tavern-canvas/illustration-slots", _s = class {
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
function vs(e) {
	let t = e?.__TAURITAVERN__?.api?.chatSurface;
	if (typeof t != "object" || !t) return null;
	let n = t;
	return typeof n.isManagedOwnershipRequired == "function" && typeof n.registerParticipant == "function" ? n : null;
}
function ys(e, t) {
	let n = vs(e);
	return n === null || !n.isManagedOwnershipRequired() ? !1 : (n.registerParticipant({
		id: gs,
		protocolVersion: 1,
		didCommitContent: ({ mesid: e, element: n, content: r }) => t.commit({
			mesid: e,
			element: n,
			content: r
		})
	}), t.activate(), !0);
}
var bs = new _s(), xs = class {
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
	get_active_swipe_id(e) {
		return this.#e.get_active_swipe_id(e);
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
function Ss(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Cs(e, t, n) {
	let r = Ss(e, "TavernHelper"), i = Ss(e, "SillyTavern"), a = Ss(e, "fetch"), o = vn(r), s = cn(i);
	if (!o.message_swipe_metadata || !o.preset_generation || !o.tavern_regex || !s.main_generation_events || !s.message_swipe_metadata || typeof a != "function") return null;
	let c = new fn(() => i.getContext(), a);
	return new xs(t, new An(r, () => {
		let e = c.get_active_chat_id();
		if (e === null) throw Error("No chat is open");
		return e;
	}), c, n);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function ws(e) {
	return typeof e == "object" && !!e;
}
function Ts(e, t) {
	if (!ws(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var Es = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = nn(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: un(this.#e.getRequestHeaders()),
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
			headers: un(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: un(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return Ts(n, e);
	}
};
function Ds(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Os(e, t) {
	return !Ds(e) || typeof t != "function" ? null : new Es(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
function ks(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function As(e) {
	let t = ks(e, "SillyTavern"), n = ks(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function js(e) {
	let t = As(e), n = ks(t, "extensionSettings"), r = ks(t, "saveSettingsDebounced");
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
function Ms(e) {
	return Os(As(e), ks(e, "fetch"));
}
function Ns(e) {
	return Aa(As(e), ks(e, "fetch"));
}
function Ps(e, t) {
	return Cs(e, t, bs.active ? bs : null);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var Fs = "IndexedDB could not be opened, so nothing that persists records can be composed", Is = "No usable SillyTavern + TavernHelper host pair was detected", Ls = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", Rs = 12e4, zs = { novelai: 1500 }, Bs = "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";
function Vs() {
	return navigator.storage.estimate();
}
function Hs() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"" + new URL("workers/vocabulary_worker.js", import.meta.url).href,
		"" + import.meta.url
	), { type: "module" });
}
async function Us(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = qn(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(Qa(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(Q(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = Ps(t, s), l = [], u = null;
	try {
		u = await (e.open_storage ?? Xe)();
	} catch {
		u = null;
	}
	let d = js(t), p = d === null ? null : Ea(d), m = () => p?.get_settings().active_namespace ?? "primary", h = () => (/* @__PURE__ */ new Date()).toISOString(), g = Ms(t), ee = Ns(t), _;
	try {
		_ = (e.create_browser_secret_vault ?? _t)(t);
	} catch {
		_ = null;
	}
	_ !== null && a.push(() => _.close());
	let v = gt(t);
	v !== null && a.push(() => v.close());
	let y = new ja({
		mode: () => p?.get_settings().credential_storage_mode ?? "host",
		host_destination: g,
		host_resolver: ee,
		browser_vault: _,
		device_vault: v
	}), te = y.has_destination ? y : null, ne = y.has_resolver ? y : null, b = u === null ? null : Ze(u), x = await uo(t.navigator?.locks, crypto.randomUUID());
	a.push(() => {
		x.release();
	}), b !== null && x.sole_page && await so(b.generation_jobs, m(), h());
	let re = new qa(), ie = null, S = () => ie ??= Jo(u), ae = null, C = async () => {
		if (b === null || p === null) return null;
		let e = p.get_settings().active_provider_profile_id, t = e === null ? null : await b.provider_profiles.get(m(), e).catch(() => null), n = t === null ? null : ps(t, ne !== null);
		return ae = n?.provider_id ?? null, n;
	};
	await C();
	let w = async () => {
		let e = await C();
		if (e === null) throw Error("No provider profile is active; choose one in Settings");
		return e;
	}, se = null, T = b === null || u === null ? null : () => se ??= import("./chunks/novelai_runtime-D77u_P9t.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: b.novelai_vibe_encodings,
		provider_inputs: b.provider_input_assets,
		namespace: m,
		gallery_assets: Yo(u, m),
		transport: () => ms(async () => hs((await C())?.direct_cloud ?? null, ne, e.provider_fetch)),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), ce = T === null || u === null ? null : { async read(e, t) {
		try {
			return await Yo(u, m).read(e, t);
		} catch {
			return (await T()).assets.read(e, t);
		}
	} }, le = T === null ? null : async (e) => e.provider_id === "novelai" ? (await T()).prepare(e, AbortSignal.timeout(Rs)) : e, ue = o("novelai", T === null ? X(Fs) : Z(() => ho(async () => (await T()).service)), r.novelai), de = o("settings", p === null ? X(Ls) : Z(() => Uo({
		settings: p,
		database: u,
		extension_version: n,
		secrets: te,
		browser_secret_vault: _,
		host_secrets: g,
		list_worldbooks: c === null ? null : () => c.list_worldbooks()
	})), r.settings), fe = o("profiles", b === null ? X(Fs) : Z(() => No({
		repository: b.provider_profiles,
		namespace: m,
		load_adapters: S,
		secrets: te,
		credential_present: async (e) => te === null || (p?.get_settings().credential_storage_mode ?? "host") === "host" ? null : te.probe_secret(e),
		now: h
	})), r.profiles), pe = o("prompt_presets", b === null ? X(Fs) : Z(() => Lo({
		repository: b.prompt_presets,
		namespace: m,
		now: h,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), E = o("assets", b === null ? X(Fs) : Z(() => Ga({
		repositories: b,
		namespace: m,
		now: h
	})), r.assets), me = o("gallery", u === null ? X(Fs) : Z(() => no({
		database: u,
		repository: new at(u),
		namespace: m,
		now: h,
		make_thumbnail: qo,
		reveal_message: c === null ? null : (e, t) => {
			if (c.get_active_chat_id() !== e) return "other_chat";
			let n = c.find_message_element(t)?.closest(".mes");
			return n == null ? "not_found" : (n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), "revealed");
		}
	})), r.gallery), he = null, D = o("generation", u === null ? X(Fs) : c === null ? X(Is) : Z(() => {
		let t = (e) => Na({
			direct_provider_base_url: e?.base_url ?? null,
			direct_cloud: e?.direct_cloud ?? null
		}), n = new di(), r = new $t({
			executor: new hi({
				store: Zo(u, m),
				ids: { next: () => crypto.randomUUID() },
				clock: { now: h },
				resolve_source_message: (e) => {
					let t = he?.source_of(e.request_id) ?? null;
					return t === null ? null : {
						chat_id: t.chat_id,
						message_id: String(t.message_id),
						swipe_id: t.swipe_id
					};
				},
				load_adapters: S,
				profiles: { resolve: async (e) => {
					let t = (await S())[e], n = await C();
					if (t === void 0 || n?.provider_id !== e) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(ko(n.record));
				} },
				transport: ms(async () => fs(t(await C()), {
					secrets: ne,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				})),
				assets: ce ?? Yo(u, m),
				...T === null ? {} : { postprocess: async (e, t) => e.provider_id === "novelai" && e.action === "infill" ? (await T()).finish(e, t, AbortSignal.timeout(Rs)) : t },
				log: { write: () => {} },
				plans: n
			}),
			persistence: new ui(u, m()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new Ut(),
			global_concurrency: p?.get_settings().global_concurrency ?? 1,
			provider_start_interval_ms: zs
		});
		a.push(re.observe_jobs(r));
		let i = co({
			queue: r,
			plans: n,
			jobs: Ze(u).generation_jobs,
			namespace: m,
			origin: new vo(c, new Dt(globalThis.crypto)),
			new_request_id: () => f.parse(crypto.randomUUID()),
			...le === null ? {} : { prepare_request: le }
		});
		if (p !== null) {
			let e = () => ne === null ? Promise.reject(/* @__PURE__ */ Error(Bs)) : ne.resolve_secret(oe(p.get_settings().active_namespace));
			he = new Gi({
				host: c,
				settings: () => p.get_settings().illustration,
				auto_generation_enabled: () => p.get_settings().auto_generation_enabled,
				prompt_context: (e) => $i(pe, E, p.get_settings().illustration.prompt_preset_id, e),
				wardrobe: new Ji({
					host: c,
					library: Ki(E),
					run: ci({
						host: c,
						settings: () => p.get_settings().illustration,
						resolve_analysis_key: e,
						new_generation_id: () => crypto.randomUUID()
					}),
					new_id: () => crypto.randomUUID()
				}),
				...$o({
					assets: E,
					active_chat_id: () => c.get_active_chat_id(),
					read_active_profile: C,
					require_active_profile: w,
					novelai: T === null || b === null ? null : {
						load_runtime: T,
						repositories: b
					},
					namespace: m
				}),
				edits_available: () => ae === "novelai",
				resolve_analysis_key: e,
				async submit(e) {
					let n = await w();
					return t(n), (await i.submit({
						profile_id: n.record.id,
						request: e
					})).request_id;
				},
				jobs: r,
				new_slot_id: Xi,
				new_generation_id: () => crypto.randomUUID(),
				wait: (e) => new Promise((t) => setTimeout(t, e))
			}), l.push(new ea(he, c));
		}
		return i;
	}), r.generation), ge = e.create_vocabulary_worker === void 0 ? Hs() : e.create_vocabulary_worker, _e = o("vocabulary", u === null ? X(Fs) : ge === null ? X("This host has no Worker constructor, so vocabulary search cannot run") : Z(() => Go({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-Coxefh5a.js");
			return new e({
				current_extension_version: n,
				open_database_impl: () => Promise.resolve(u)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-CCQkWkkk.js");
			return new e({ create_worker: ge });
		},
		async read_active_package() {
			let { VocabularyPackageStore: e } = await import("./chunks/src-sXd_ofe_.js").then((e) => e.t), t = await new e(u, "vocabulary").find_active_or_confirmed();
			return t === null ? null : {
				package_id: t.manifest.package_id,
				data_version: t.manifest.data_version,
				record_count: t.manifest.record_count
			};
		}
	})), r.vocabulary);
	return {
		capabilities: {
			generation: D,
			profiles: fe,
			prompt_presets: pe,
			assets: E,
			gallery: me,
			vocabulary: _e,
			diagnostics: o("diagnostics", Z(() => Ya({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: re,
				resolutions: () => i,
				settings: () => p?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? Vs,
				extension_version: n
			})), r.diagnostics),
			settings: de,
			novelai: ue
		},
		resolutions: i,
		host: c,
		illustrations: he,
		translator: c === null || p === null ? null : da({
			host: c,
			settings: () => p.get_settings().translation,
			vocabulary: _e
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
//#endregion
//#region src/bootstrap/startup_error.ts
var Ws = "https://github.com/N0VI028/JS-Slash-Runner";
function Gs(e) {
	if (e.ready) return {
		state: "ready",
		title: "Inkwell ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${jn} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: Ws
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `Inkwell could not verify the installed version. ${t}`,
			update_url: Ws
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: Ws
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: Ws
		};
	}
}
function Ks(e) {
	return {
		state: "failed",
		title: "Inkwell could not start",
		message: "Runtime initialization failed.",
		detail: e instanceof Error ? `${e.name}: ${e.message}` : String(e)
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function qs(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = Hn(n), i, a, o = null, s = null;
	try {
		o = await Us({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch (e) {
		console.error("[Inkwell] Startup failed while composing capabilities", e), s = e ?? /* @__PURE__ */ Error("Composition failed");
	}
	let c = r.ready ? new St([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = Gs(r);
	else if (s !== null) i = "failed", a = Ks(s);
	else try {
		await c?.start_all(), i = "ready", a = Gs(r);
	} catch (e) {
		console.error("[Inkwell] Startup failed while starting runtime modules", e), i = "failed", a = Ks(e);
	}
	let l = Xr(t, e.stylesheet ?? ""), u = je(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null), f = () => {
		try {
			return o?.host?.get_locale() ?? navigator.language;
		} catch {
			return navigator.language;
		}
	};
	u.apply_locale(d ?? "auto", f());
	let p = o?.capabilities.settings.subscribe((e) => {
		u.apply_locale(e.settings.locale, f());
	}), m = xe(Kr, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities,
		host: o?.host ? ge(o.host) : null,
		illustrations: o?.illustrations ? ge(o.illustrations) : null,
		translator: o?.translator ?? null
	});
	m.config.errorHandler = (e, t, n) => {
		console.error(`[Inkwell] Unhandled error in ${n}`, e);
	};
	let h = Yr(t);
	m.use(u.i18n), m.onUnmount(() => {
		p?.(), l.remove(), h();
	});
	try {
		m.mount(l.app_element);
	} catch (e) {
		throw l.remove(), await c?.stop_all(), e;
	}
	let g = !1;
	return {
		state: i,
		probe: r,
		resolutions: o?.resolutions ?? [],
		async dispose() {
			if (g) return;
			g = !0;
			let t = [];
			try {
				m.unmount();
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
function Js(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Ys(e) {
	let t = Js(e, "SillyTavern"), n = Js(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = Js(r, "eventSource"), a = Js(Js(r, "eventTypes"), "APP_READY"), o = Js(i, "on"), s = Js(i, "removeListener");
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
var Xs = ":host{--tc-space-0-5:2px;--tc-space-1:4px;--tc-space-1-5:6px;--tc-space-2:8px;--tc-space-3:12px;--tc-space-4:16px;--tc-space-5:20px;--tc-space-6:24px;--tc-space-8:32px;--tc-space-10:40px;--tc-font-family:\"Geist\", system-ui, \"Noto Sans CJK SC\", \"Microsoft YaHei\", sans-serif;--tc-font-mono:\"Geist Mono\", ui-monospace, \"Cascadia Mono\", Consolas, monospace;--tc-font-size-xs:12px;--tc-font-size-sm:13px;--tc-font-size-md:14px;--tc-font-size-lg:17px;--tc-font-size-xl:26px;--tc-line-height-xs:16px;--tc-line-height-sm:20px;--tc-line-height-md:22px;--tc-line-height-lg:24px;--tc-line-height-xl:32px;--tc-font-weight-regular:400;--tc-font-weight-medium:500;--tc-font-weight-semibold:650;--tc-label-font-size:13px;--tc-control-height-sm:28px;--tc-control-height-md:36px;--tc-control-height-lg:44px;--tc-control-padding-x-sm:12px;--tc-control-padding-x-md:16px;--tc-control-padding-x-lg:20px;--tc-control-gap:6px;--tc-control-font-size:14px;--tc-field-padding-x:16px;--tc-icon-size:16px;--tc-icon-size-sm:15px;--tc-chip-height:26px;--tc-chip-height-sm:22px;--tc-chip-padding-x:10px;--tc-check-size:18px;--tc-switch-width:44px;--tc-switch-height:26px;--tc-radius-window:20px;--tc-radius-window-narrow:0;--tc-radius-panel:16px;--tc-radius-card:16px;--tc-radius-control:999px;--tc-radius-field:999px;--tc-radius-textarea:16px;--tc-radius-taginput:18px;--tc-radius-chip:999px;--tc-radius-check:6px;--tc-radius-image:6px;--tc-radius-status:999px;--tc-radius-popover:16px;--tc-radius-option:999px;--tc-radius-bar:999px;--tc-field-gap:8px;--tc-form-row-gap:24px;--tc-group-gap:40px;--tc-panel-padding:28px;--tc-nav-width:200px;--tc-form-max-width:600px;--tc-inspector-width:360px;--tc-card-min:250px;--tc-tile-min:168px;--tc-tile-gap:10px;--tc-topbar-height:60px;--tc-bottomnav-height:60px;--tc-canvas:#f4f4f2;--tc-surface:#fff;--tc-surface-raised:#ededea;--tc-surface-sunken:#e6e6e2;--tc-field-bg:#fff;--tc-text:#17171a;--tc-text-muted:#5a5a61;--tc-text-placeholder:#7a7a81;--tc-divider:#e0e0db;--tc-border-field:#8d8d94;--tc-accent:#17171a;--tc-accent-hover:#35353b;--tc-on-accent:#fafaf7;--tc-accent-soft:#fbefb4;--tc-accent-text:#17171a;--tc-accent-border:#e2c53a;--tc-focus:#17171a;--tc-marker:#f6d743;--tc-on-marker:#17171a;--tc-success:#1d7a4a;--tc-warning:#8a5a00;--tc-error:#c0362c;--tc-success-on-inverse:#6fe0a6;--tc-error-soft:#fbe9e6;--tc-switch-off:#a5a5ab;--tc-switch-thumb:#fff;--tc-chip-bg:#ededea;--tc-selection:#fae58a;--tc-para-hover:#f7f3dc;--tc-shadow:#17171a1f;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);font-family:var(--tc-font-family);font-size:var(--tc-font-size-md);line-height:var(--tc-line-height-md)}:host([data-color-mode=dark]){--tc-canvas:#131315;--tc-surface:#1b1b1e;--tc-surface-raised:#252528;--tc-surface-sunken:#0d0d0f;--tc-field-bg:#161618;--tc-text:#f1f1ed;--tc-text-muted:#a4a4ab;--tc-text-placeholder:#85858c;--tc-divider:#2e2e33;--tc-border-field:#66666e;--tc-accent:#f1f1ed;--tc-accent-hover:#fafaf7;--tc-on-accent:#131315;--tc-accent-soft:#3a3214;--tc-accent-text:#f6e08a;--tc-accent-border:#8a7424;--tc-focus:#f1f1ed;--tc-marker:#e8c93f;--tc-on-marker:#131315;--tc-success:#5fd39a;--tc-warning:#ecbd55;--tc-error:#ff8a7f;--tc-success-on-inverse:#1d7a4a;--tc-error-soft:#3b1b19;--tc-switch-off:#55555c;--tc-switch-thumb:#131315;--tc-chip-bg:#29292d;--tc-selection:#5a4b16;--tc-para-hover:#23211a;--tc-shadow:#00000080}@media (pointer:coarse){:host{--tc-control-height-sm:36px;--tc-control-height-md:44px;--tc-control-height-lg:48px;--tc-control-font-size:15px;--tc-chip-height:30px;--tc-check-size:20px}}", Zs = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", Qs = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-field{width:100%;min-width:0;height:var(--tc-control-height-md);padding:0 var(--tc-field-padding-x);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-field);background-color:var(--tc-field-bg);color:var(--tc-text);font-family:inherit;font-size:var(--tc-control-font-size);line-height:var(--tc-line-height-md);transition:background-color var(--tc-motion-fast) ease}.tc-field-multiline{height:auto;min-height:calc(var(--tc-line-height-md) * 2 + var(--tc-control-height-md));padding-block:calc((var(--tc-control-height-md) - var(--tc-line-height-md)) / 2 - 1px);border-radius:var(--tc-radius-textarea);resize:vertical;display:block}.tc-field::placeholder{color:var(--tc-text-placeholder)}.tc-field:focus,.tc-field:focus-visible{outline:2px solid var(--tc-focus);outline-offset:-1px;border-color:#0000}.tc-field[aria-invalid=true]{border-color:var(--tc-error)}.tc-field:disabled{opacity:.5;cursor:not-allowed}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", $s = "._floatingEntry_1bpar_9{background-color:var(--tc-surface);width:56px;height:56px;box-shadow:0 0 0 1px var(--tc-divider), 0 8px 24px var(--tc-shadow);color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1bpar_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1bpar_34{cursor:grabbing}._floatingEntryMedia_1bpar_38{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", ec = "._window_1jfap_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border-radius:var(--tc-radius-window);box-shadow:0 0 0 1px var(--tc-divider), 0 18px 50px var(--tc-shadow);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1jfap_1;position:fixed;top:0;left:0;overflow:hidden}._window_1jfap_1[data-positioned=false]{visibility:hidden}._window_1jfap_1[data-dragging=true]{box-shadow:0 0 0 1px var(--tc-divider), 0 24px 64px var(--tc-shadow);-webkit-user-select:none;user-select:none}@keyframes _floating-window-enter_1jfap_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1jfap_1{border-radius:var(--tc-radius-window-narrow);width:auto;height:auto;min-height:0;inset:0;transform:none}._window_1jfap_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1jfap_1{animation:none}}", tc = "._shell_12ped_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_12ped_8[data-viewport=desktop]{grid-template-columns:minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:var(--tc-topbar-height) minmax(0, 1fr);grid-template-areas:\"topbar topbar\"\"workspace inspector\"}._shell_12ped_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:minmax(0,1fr) 0}._shell_12ped_8[data-viewport=mobile]{grid-template-columns:minmax(0,1fr);grid-template-rows:var(--tc-topbar-height) minmax(0, 1fr) var(--tc-bottomnav-height);grid-template-areas:\"topbar\"\"workspace\"\"bottomnav\";height:100dvh}._top_bar_12ped_51{align-items:center;gap:var(--tc-space-3);min-width:0;padding-inline:var(--tc-space-5) var(--tc-space-3);background-color:var(--tc-canvas);cursor:move;touch-action:none;grid-area:topbar;display:flex}._top_bar_end_12ped_63{align-items:center;gap:var(--tc-space-1);min-width:0;margin-left:auto;display:flex}._top_tabs_12ped_71{gap:var(--tc-space-1);margin-left:var(--tc-space-3);display:flex}._top_tab_12ped_71{align-items:center;gap:var(--tc-control-gap);height:var(--tc-control-height-md);padding-inline:var(--tc-control-padding-x-md);border-radius:var(--tc-radius-control);color:var(--tc-text-muted);font-size:var(--tc-control-font-size);font-weight:var(--tc-font-weight-medium);display:inline-flex}._top_tab_12ped_71:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._top_tab_12ped_71[aria-current=page],._top_tab_12ped_71[aria-current=page]:hover{color:var(--tc-on-marker);background-color:var(--tc-marker)}._task_pill_12ped_100{align-items:center;gap:var(--tc-space-1);height:var(--tc-control-height-sm);padding-inline:var(--tc-space-2);border-radius:var(--tc-radius-control);color:var(--tc-text-muted);background-color:var(--tc-surface-raised);font-size:var(--tc-font-size-sm);display:inline-flex}._task_pill_12ped_100:hover{color:var(--tc-text)}._task_pill_spin_12ped_116{animation:_tc-icon-rotate_12ped_1 var(--tc-motion-normal) linear infinite}._shell_12ped_8[data-viewport=mobile] ._task_pill_label_12ped_120{display:none}._task_popover_12ped_124{z-index:var(--tc-z-overlay);width:min(360px, calc(100vw - var(--tc-space-8)));background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-popover);max-height:60dvh;box-shadow:0 12px 32px var(--tc-shadow);overflow:auto}._top_bar_brand_12ped_135{align-items:center;gap:var(--tc-space-2);color:var(--tc-text);font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);flex:none;display:inline-flex}._top_bar_brand_mark_12ped_145{width:var(--tc-control-height-sm);height:var(--tc-control-height-sm);border-radius:var(--tc-radius-control);background-color:var(--tc-marker);color:var(--tc-on-marker);place-items:center;display:inline-grid}._icon_button_12ped_155{width:var(--tc-control-height-md);height:var(--tc-control-height-md);color:var(--tc-text-muted);border-radius:var(--tc-radius-control);flex:none;justify-content:center;align-items:center;display:flex}._icon_button_12ped_155:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._shell_12ped_8[data-viewport=mobile] ._top_bar_12ped_51{cursor:default;touch-action:auto;padding-inline:var(--tc-space-4) var(--tc-space-2)}._icon_button_12ped_155._close_button_12ped_177:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_12ped_155[data-selected=true],._icon_button_12ped_155[aria-pressed=true]{color:var(--tc-text)}._tooltip_content_12ped_187{padding:var(--tc-space-1) var(--tc-space-3);font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);color:var(--tc-canvas);background-color:var(--tc-text);border-radius:var(--tc-radius-popover)}._workspace_12ped_196{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_12ped_206{min-height:240px;padding:var(--tc-panel-padding);flex-direction:column;justify-content:center;align-items:flex-start;display:flex}._inspector_12ped_216{min-width:0;margin:0 var(--tc-space-4) var(--tc-space-4) 0;background-color:var(--tc-surface);border-radius:var(--tc-radius-panel);box-shadow:0 0 0 1px var(--tc-divider);grid-area:inspector;display:flex;overflow:hidden}._inspector_resizer_12ped_227{width:var(--tc-space-1);cursor:col-resize;touch-action:none;background-color:#0000;flex:none}._inspector_resizer_12ped_227:hover,._inspector_resizer_12ped_227[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_12ped_240{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_12ped_248{justify-content:space-between;align-items:center;gap:var(--tc-space-2);min-height:var(--tc-topbar-height);padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-2) var(--tc-space-4);color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg);flex:none;display:flex}._inspector_body_12ped_262{min-height:0;padding:0 var(--tc-space-4) var(--tc-space-4);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);flex:auto;overflow:auto}._inspector_selection_kind_12ped_272{margin:0 0 var(--tc-space-2);color:var(--tc-text);font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold)}._inspector_selection_12ped_272{gap:var(--tc-space-2);flex-direction:column;margin:0;display:flex}._inspector_selection_12ped_272 dt{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._inspector_selection_12ped_272 dd{color:var(--tc-text);font-size:var(--tc-font-size-sm);overflow-wrap:anywhere;margin:0}._bottom_nav_12ped_298{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_12ped_307{justify-content:center;align-items:center;gap:var(--tc-space-0-5);min-width:0;padding-block:var(--tc-space-1);color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;display:flex}._bottom_nav_item_12ped_307>svg{box-sizing:content-box;padding:var(--tc-space-0-5) var(--tc-space-3);border-radius:var(--tc-radius-control)}._bottom_nav_item_12ped_307[data-selected=true]{color:var(--tc-text);font-weight:var(--tc-font-weight-medium)}._bottom_nav_item_12ped_307[data-selected=true]>svg{color:var(--tc-on-marker);background-color:var(--tc-marker)}._bottom_nav_item_label_12ped_335{max-width:100%;font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._sheet_overlay_12ped_344{background-color:var(--tc-media-scrim);position:fixed;inset:0}._sheet_content_12ped_350{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-radius:var(--tc-radius-panel) var(--tc-radius-panel) 0 0;box-shadow:0 -8px 24px var(--tc-shadow);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_12ped_365{width:var(--tc-space-8);height:var(--tc-space-1);margin:var(--tc-space-2) auto;background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none}._sheet_header_12ped_376{justify-content:space-between;align-items:center;gap:var(--tc-space-2);padding:var(--tc-space-1) var(--tc-space-2) var(--tc-space-2) var(--tc-space-4);color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);flex:none;display:flex}._sheet_body_12ped_388{min-height:0;padding:0 var(--tc-space-4) var(--tc-space-4);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);flex:auto;overflow:auto}._task_strip_12ped_397{flex-direction:column;min-width:0;display:flex}._task_strip_header_12ped_403{align-items:center;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1) var(--tc-space-4);flex:none;display:flex}._task_strip_summary_12ped_411{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;text-overflow:ellipsis;margin-right:auto;overflow:hidden}._task_strip_list_12ped_422{gap:var(--tc-space-1);padding:0 var(--tc-space-3) var(--tc-space-3);flex-direction:column;display:flex}._task_chip_12ped_429{align-items:center;gap:var(--tc-space-1-5);height:var(--tc-control-height-sm);padding-inline:var(--tc-space-2);color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-control);font-size:var(--tc-font-size-sm);flex:none;display:flex}._task_chip_dot_12ped_442{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_12ped_442[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_12ped_442[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_12ped_442[data-status=error]{background-color:var(--tc-error)}._task_chip_label_12ped_462{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._skeleton_block_12ped_468{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-status)}._skeleton_title_12ped_473{width:40%;height:var(--tc-space-5)}._skeleton_line_12ped_478{width:90%;height:var(--tc-space-3);margin-top:var(--tc-space-3)}._skeleton_line_short_12ped_484{width:75%;height:var(--tc-space-3);margin-top:var(--tc-space-2)}._partial_banner_12ped_490{justify-content:space-between;align-items:center;gap:var(--tc-space-2) var(--tc-space-3);margin:0 var(--tc-space-4) var(--tc-space-2);padding:var(--tc-space-1) var(--tc-space-1) var(--tc-space-1) var(--tc-space-4);color:var(--tc-warning);background-color:var(--tc-surface);border-radius:var(--tc-radius-bar);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);flex-wrap:wrap;flex:none;display:flex}._state_screen_12ped_506{top:var(--tc-space-5);right:var(--tc-space-5);justify-content:center;align-items:flex-start;gap:var(--tc-space-2);width:min(560px, calc(100vw - 2 * var(--tc-space-5)));max-height:calc(100dvh - 2 * var(--tc-space-5));padding:var(--tc-space-8);color:var(--tc-text);background-color:var(--tc-canvas);border-radius:var(--tc-radius-window);box-shadow:0 0 0 1px var(--tc-divider), 0 18px 50px var(--tc-shadow);flex-direction:column;display:flex;position:fixed;overflow:auto}._state_screen_eyebrow_12ped_527{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm)}._state_screen_title_12ped_532{max-width:56ch;font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg)}._state_screen_action_12ped_539{height:var(--tc-control-height-md);margin-top:var(--tc-space-3);padding:0 var(--tc-control-padding-x-md);color:var(--tc-on-accent);background-color:var(--tc-accent);border-radius:var(--tc-radius-control);font-size:var(--tc-control-font-size);font-weight:var(--tc-font-weight-medium);align-items:center;display:inline-flex}._state_screen_action_12ped_539:hover{background-color:var(--tc-accent-hover)}._state_screen_detail_12ped_556{max-width:100%;padding:var(--tc-space-3) var(--tc-space-4);border-radius:var(--tc-radius-card);background:var(--tc-surface-raised);color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);white-space:pre-wrap;-webkit-user-select:text;user-select:text;margin:0;overflow-x:auto}._state_screen_description_12ped_570{max-width:56ch;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm)}", nc = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function rc(e) {
	return e.replaceAll(nc, (e, t) => new URL(t, import.meta.url).href);
}
var ic = rc([
	Xs,
	Zs,
	Qs,
	$s,
	ec,
	tc
].join("\n"));
//#endregion
//#region src/index.ts
function ac() {
	ys(globalThis, bs);
}
var oc = Ys(globalThis).then(() => qs({
	stylesheet: ic,
	version: "3.0.0"
}));
//#endregion
export { oc as bootstrap_handle, ac as register_chat_surface };
