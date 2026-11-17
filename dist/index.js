import { t as e } from "./chunks/shell.module-Bkh0ofYg.js";
import { n as t, r as n, t as r } from "./chunks/sha2-BGNex9vj.js";
import { c as i, d as a, g as o, h as s, i as c, r as l, t as u, u as d } from "./chunks/schemas-BjkyCQYG.js";
import { i as f, n as p, o as m, r as h } from "./chunks/ids-pPJWL4BL.js";
import { n as g, t as _ } from "./chunks/generation-CxBPzqgd.js";
import { l as v, n as y, o as b, r as x, s as S } from "./chunks/wardrobe_library-D08dVzPC.js";
import { a as C, i as w, r as ee } from "./chunks/provider-BmQsAS1d.js";
import { a as te, i as ne, n as re, r as T } from "./chunks/server_inspection-BTxqOeen.js";
import { a as E, c as ie, d as ae, l as D, n as oe, o as se, r as ce, s as le, t as ue, u as de } from "./chunks/settings-Dljuq0-Y.js";
import { F as O, G as fe, I as k, M as pe, R as me, W as he, _ as ge, at as _e, b as ve, dt as A, et as ye, g as be, gt as j, h as xe, ht as Se, i as Ce, j as we, k as Te, m as M, n as Ee, ot as De, p as Oe, pt as N, q as ke, rt as P, tt as Ae, u as je, x as Me, y as Ne } from "./chunks/vue-i18n-XoxYzLIP.js";
import { i as Pe, n as Fe, r as Ie, t as Le } from "./chunks/opening_port-B4OJlvY6.js";
import { t as Re } from "./chunks/create_i18n-DHLiNjVN.js";
import { a as ze, i as Be, r as Ve, t as He } from "./chunks/portal_keys-CIBE-_PC.js";
import { t as Ue } from "./chunks/creation_port-CiZWBydV.js";
import { r as We, t as Ge } from "./chunks/use_shell_viewport-SYgqjvre.js";
import { t as Ke } from "./chunks/AppIcon-DD754F_c.js";
import { t as qe } from "./chunks/host_image_icon-CySMeJr8.js";
import { t as Je } from "./chunks/deferred_stylesheets-DhfsdqPo.js";
import { c as Ye, h as Xe, i as Ze, o as Qe } from "./chunks/business_repositories-MS2bjSGp.js";
import { a as $e, c as et, i as tt, n as nt, o as rt, r as it, t as at } from "./chunks/image_store-BlN2h5tG.js";
import { n as ot, t as st } from "./chunks/analysis_error-DyAzoHE3.js";
import { a as ct, i as lt, n as ut, o as dt, r as ft, s as pt, t as mt } from "./chunks/proposal_slots-Cw_x3nL5.js";
import { t as ht } from "./chunks/user_guidance-Bx38WM6V.js";
import { i as gt, t as _t } from "./chunks/library_match-C6UXduZZ.js";
import { a as vt, i as yt, n as bt, o as xt, s as F } from "./chunks/provider_transport-DWhnpnLx.js";
import { i as St, r as Ct } from "./chunks/browser_secret_vault-Cl9sZA7g.js";
import { d as wt, h as Tt, o as Et, t as Dt, u as Ot } from "./chunks/workflow_mapping-BBTT75pE.js";
import { t as kt } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
import { t as At } from "./chunks/novelai_errors-Bve94MgO.js";
//#region ../../packages/core/src/capability_registry.ts
var jt = class {
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
}, Mt = class {
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
}, Nt = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new jt(), n = new Mt()) {
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
}, Pt = "Canonical JSON accepts only JSON data";
function Ft() {
	throw TypeError(Pt);
}
function It(e) {
	return typeof e == "number" && !Number.isFinite(e) ? Ft() : JSON.stringify(e);
}
function Lt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return It(e);
	if (typeof e != "object") return Ft();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return Ft();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return Ft();
				n.push(Lt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return Ft();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return Ft();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return Ft();
			a.push(`${It(n)}:${Lt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function Rt(e) {
	return Lt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var zt = class {
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
function Bt(e) {
	return t(r(n(e)));
}
function Vt(e, n) {
	let r = Bt(Rt(e)), i = n.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: r,
		generation_anchor: Bt(`${r}${t(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/direct_catalog.ts
var Ht = Object.freeze({}), Ut = {
	kind: "bearer",
	header: "authorization"
}, Wt = Object.freeze({
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
		auth: Ut,
		required_headers: Ht
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: Ut,
		required_headers: Ht
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: Ht
	}
}), Gt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function Kt(e) {
	return Wt[e];
}
function qt(e, t) {
	if (!e.routes.includes(t)) throw new Gt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var Jt = o().regex(/^[A-Za-z0-9_-]{8,32}$/u), Yt = s({
	x: d().min(0).max(1),
	y: d().min(0).max(1)
}), Xt = s({
	name: o().trim().min(1).max(120),
	prompt: o().trim().min(1).max(4e3),
	negative_prompt: o().max(4e3),
	center: Yt.optional()
}), Zt = s({
	slot_id: Jt,
	paragraph: d().int().min(0),
	anchor: o().max(400),
	scene: o().max(2e3),
	characters: l(o().trim().min(1).max(120)).max(16),
	positive_prompt: o().max(8e3),
	negative_prompt: o().max(8e3),
	character_prompts: l(Xt).max(16),
	size: s({
		width: d().int().min(64).max(2048),
		height: d().int().min(64).max(2048)
	}).optional(),
	image_ids: l(p),
	active_image_id: p.nullable(),
	pending_request_ids: l(f),
	last_error: o().max(500).nullable()
}), Qt = s({
	schema_version: i(2),
	slots: l(Zt).max(16)
});
u(["quality", "undesired_content"]);
var $t = s({
	enabled: c(),
	preset_id: o().trim().min(1).max(200)
}), en = s({
	quality: $t,
	undesired_content: $t
}), tn = s({
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
}), nn = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function I(e) {
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
var L = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(ee.parse(e));
	}
}, rn = {
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
}, an = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function on(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!rn[r].includes(t)) throw new an(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function sn(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function cn(e) {
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
		provider_id: w.parse(e.provider_id),
		arguments: n,
		automatic: e.automatic
	};
}
function ln(e) {
	let i = `${e.generation_anchor}${Rt(e.arguments)}`;
	return t(r(n(i)));
}
function un(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
var dn = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled"
]);
function fn(e) {
	return e instanceof L ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var pn = class {
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
	#m = w.options;
	#h = 0;
	#g = 0;
	#_ = !1;
	#v = null;
	#y = 0;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new nn(), this.#i = sn(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#m) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : sn(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, e.provider_start_interval_ms?.[t] ?? 0), this.#c.set(t, []), this.#l.set(t, 0);
		}
	}
	enqueue(e) {
		let t = cn(e), n = ln(t);
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
		return t === void 0 ? null : I(t.job);
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
		if (t.job.state === "cancelled") return I(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#A(t);
		let n = await this.#k(t, async () => (t.job.state !== "cancelled" && await this.#D(t, "cancelled"), I(t.job)));
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
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#k(n, async () => (n.job.state !== t && await this.#D(n, t), I(n.job)));
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
		}, i = I(r);
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
			let n = (await this.#e.execute(I(e.job), t)).image_ids.map((e) => p.parse(e));
			if (n.length === 0) throw new L({
				code: "malformed_response",
				retryable: !1
			});
			await this.#k(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = un(e.job);
				t.image_ids = n, await this.#D(e, "completed", t);
			});
		} catch (t) {
			await this.#k(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = un(e.job);
				n.error = fn(t), await this.#D(e, "failed", n);
			});
		}
	}
	async #D(e, t, n = un(e.job)) {
		on(n, t, this.#r.now().toISOString());
		let r = I(n);
		try {
			await this.#t.save(r);
		} catch (e) {
			if (!dn.has(t)) throw e;
		}
		return e.job = n, this.#j(r), r;
	}
	#O(e) {
		if (dn.has(e.job.state)) return;
		let t = un(e.job);
		t.state = "failed", t.updated_at = this.#r.now().toISOString(), t.error = {
			code: "storage_failed",
			retryable: !1
		}, e.job = t;
		let n = I(t);
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
}, mn = "tavern_canvas", hn = "tavern_canvas_wardrobe", gn = "advanced_preset";
function _n(e, t) {
	if (typeof e != "object" || !e) return null;
	let n = e[t];
	return typeof n == "string" && n.trim() !== "" ? n.trim() : null;
}
function vn(e) {
	if (typeof e != "object" || !e) return null;
	let t = e, n = t.structures;
	if (t.v !== 1 || typeof n != "object" || !n) return null;
	let r = n.status, i = n.synopsis, a = {
		date: _n(r, "date"),
		time: _n(r, "time") ?? _n(i, "time"),
		location: _n(r, "location") ?? _n(i, "location")
	};
	return a.date === null && a.time === null && a.location === null ? null : a;
}
var yn = "js_generation_started", bn = { makersuite: "google_model" };
function xn(e) {
	return e.bind(globalThis);
}
function Sn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function R(e) {
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
function Cn(e, t) {
	let n = z(e, t);
	if (typeof n == "function") try {
		return Reflect.apply(n, e, []);
	} catch {
		return;
	}
}
function wn(e, t) {
	let n = z(e, "eventSource"), r = z(e, "eventTypes");
	return !Sn(n) || !Sn(r) ? !1 : typeof z(n, "on") == "function" && typeof z(n, "removeListener") == "function" && t.every((e) => {
		let t = z(r, e);
		return typeof t == "string" && t.length > 0;
	});
}
function Tn(e) {
	let t = Sn(e) ? Cn(e, "getContext") : void 0;
	if (!Sn(t)) return {
		main_generation_events: !1,
		message_swipe_metadata: !1
	};
	let n = Cn(t, "getCurrentLocale");
	return {
		main_generation_events: typeof n == "string" && n.trim().length > 0 && wn(t, [
			"GENERATION_STARTED",
			"GENERATION_STOPPED",
			"GENERATION_ENDED"
		]),
		message_swipe_metadata: typeof z(t, "getCurrentChatId") == "function" && Array.isArray(z(t, "chat")) && typeof z(t, "saveChat") == "function" && wn(t, [
			"CHAT_CHANGED",
			"MESSAGE_SWIPED",
			"MESSAGE_UPDATED",
			"MESSAGE_EDITED",
			"CHARACTER_MESSAGE_RENDERED",
			"MORE_MESSAGES_LOADED"
		])
	};
}
function En(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function Dn(e) {
	if (!R(e) || !Object.values(e).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return { ...e };
}
function On(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
var kn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t.bind(globalThis);
	}
	get_locale() {
		return En(this.#e().getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		let e = this.#e().getCurrentChatId();
		return typeof e == "string" && e.trim().length > 0 ? e : null;
	}
	chat_completion_target() {
		let e = this.#e(), t = e.chatCompletionSettings;
		if (e.mainApi !== "openai" || typeof t != "object" || !t) return null;
		let n = t, r = n.chat_completion_source;
		if (typeof r != "string") return null;
		let i = n[bn[r] ?? `${r}_model`];
		return {
			source: r,
			model: typeof i == "string" ? i : ""
		};
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
	adjust_request(e, t) {
		let n = this.#e(), r = n.eventTypes.CHAT_COMPLETION_SETTINGS_READY, i = !1, a = (t) => {
			i = t === e;
		}, o = (e) => {
			i && R(e) && (i = !1, t.native && delete e.__ap_gen_id, t.reasoning_effort !== null && (e.reasoning_effort = t.reasoning_effort));
		};
		return n.eventSource.on(yn, a), n.eventSource.on(r, o), () => {
			n.eventSource.removeListener(yn, a), n.eventSource.removeListener(r, o);
		};
	}
	prevent_world_info_recursion(e) {
		let t = this.#e(), n = t.eventTypes.WORLDINFO_ENTRIES_LOADED;
		if (n === void 0) return () => {};
		let r = (t) => {
			let n = e();
			if (!(n.size === 0 || !R(t))) {
				for (let e of Object.values(t)) if (Array.isArray(e)) for (let t of e) R(t) && typeof t.world == "string" && n.has(t.world) && (t.preventRecursion = !0);
			}
		};
		return t.eventSource.on(n, r), () => {
			t.eventSource.removeListener(n, r);
		};
	}
	inject_world_info_slims(e) {
		let t = this.#e(), n = t.eventTypes, r = n.WORLDINFO_ENTRIES_LOADED, i = n.WORLDINFO_SCAN_DONE;
		if (r === void 0 || i === void 0) return () => {};
		let a = /* @__PURE__ */ new Map(), o = (e, t) => `${e}\u0000${String(t)}`, s = (e) => {
			if (a = /* @__PURE__ */ new Map(), R(e)) for (let t of Object.values(e)) for (let e of Array.isArray(t) ? t : []) R(e) && typeof e.world == "string" && typeof e.uid == "number" && typeof e.content == "string" && Pe(e.content) && a.set(o(e.world, e.uid), Fe(e.content));
		}, c = (t) => {
			if (!R(t) || t.isFinal !== !0 || !R(t.activated)) return;
			let n = t.activated.entries;
			if (!(n instanceof Map)) return;
			let r = this.#e().substituteParams ?? ((e) => e);
			for (let t of n.values()) {
				if (!R(t) || typeof t.world != "string" || typeof t.uid != "number") continue;
				let n = a.get(o(t.world, t.uid)), i = n === void 0 ? null : e(t.world, t.uid, n);
				i !== null && (t.content = r(i));
			}
		};
		return t.eventSource.on(r, s), t.eventSource.on(i, c), () => {
			t.eventSource.removeListener(r, s), t.eventSource.removeListener(i, c);
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
				let n = On(t);
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
			let n = On(t);
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
		return this.#i(e, mn);
	}
	read_swipe_wardrobe(e) {
		return this.#i(e, hn);
	}
	read_story_status(e) {
		return vn(this.#r(e, !1)?.[gn]);
	}
	#i(e, t) {
		let n = this.#r(e, !1)?.[t];
		return n === void 0 ? null : structuredClone(n);
	}
	async translate_deepl(e, t, n) {
		let r = await this.#t("/api/translate/deepl", {
			method: "POST",
			headers: Dn(this.#e().getRequestHeaders()),
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
		return this.#a(e, mn, t);
	}
	write_swipe_wardrobe(e, t) {
		return this.#a(e, hn, t);
	}
	async #a(e, t, n) {
		let r = this.#r(e, !0);
		if (r === null) throw Error(`Chat ${e.chat_id} message ${String(e.message_id)} swipe ${String(e.swipe_id)} is not available`);
		r[t] = structuredClone(n), await this.#e().saveChat();
	}
}, An = {
	message_swipe_metadata: ["getChatMessages", "setChatMessages"],
	preset_generation: [
		"generate",
		"generateRaw",
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
function jn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function B(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function Mn(e, t) {
	try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Nn(e, t) {
	return t.every((t) => typeof Mn(e, t) == "function");
}
function Pn(e) {
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
function Fn(e) {
	return jn(e) ? {
		detected: !0,
		version: Pn(e),
		message_swipe_metadata: Nn(e, An.message_swipe_metadata),
		preset_generation: Nn(e, An.preset_generation),
		tavern_regex: Nn(e, An.tavern_regex)
	} : {
		detected: e !== void 0,
		version: e === void 0 ? { state: "missing" } : { state: "invalid" },
		message_swipe_metadata: !1,
		preset_generation: !1,
		tavern_regex: !1
	};
}
function In(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function Ln(e) {
	if (!B(e)) throw Error("TavernHelper returned an invalid chat message");
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o } = e;
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || typeof n != "string" || !In(r) || i !== void 0 && typeof i != "boolean" || typeof a != "number" || !Number.isInteger(a) || !Array.isArray(o) || !o.every((e) => typeof e == "string") || a < 0 || a >= o.length) throw Error(`TavernHelper returned an invalid chat message ${String(t)}`);
	return {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o
	};
}
function Rn(e) {
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
function zn(e) {
	return Array.isArray(e) ? e.flatMap((e) => {
		let t = B(e) && B(e.function) ? e.function : null;
		return t !== null && typeof t.name == "string" && typeof t.arguments == "string" ? [{
			name: t.name,
			arguments: t.arguments
		}] : [];
	}) : [];
}
function Bn(e) {
	if (typeof e == "string") return {
		content: e,
		reasoning: null,
		tool_calls: []
	};
	if (B(e) && typeof e.content == "string") return {
		content: e.content,
		reasoning: typeof e.reasoning == "string" && e.reasoning.length > 0 ? e.reasoning : null,
		tool_calls: zn(e.tool_calls)
	};
	throw Error("TavernHelper.generate returned neither text nor a detailed result");
}
var Vn = /* @__PURE__ */ new Set([
	"and_any",
	"and_all",
	"not_all",
	"not_any"
]), Hn = /* @__PURE__ */ new Set([
	"constant",
	"selective",
	"vectorized"
]);
function Un(e) {
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
function Wn(e) {
	if (!B(e) || !B(e.strategy) || !B(e.position)) throw Error("TavernHelper returned an invalid world info entry");
	let { enabled: t, content: n, strategy: r, position: i } = e, a = r.keys_secondary, o = B(a) ? a.logic ?? "and_any" : void 0;
	if (typeof t != "boolean" || typeof n != "string" || typeof r.type != "string" || !Hn.has(r.type) || !B(a) || typeof o != "string" || !Vn.has(o) || typeof i.order != "number") throw Error("TavernHelper returned an invalid world info entry");
	return {
		enabled: t,
		strategy: r.type,
		keys: Un(r.keys),
		secondary_logic: o,
		secondary_keys: Un(a.keys),
		order: i.order,
		content: n
	};
}
function Gn(e) {
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
function Kn(e) {
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
function qn(e, t) {
	return e.script_name === t.script_name && e.find_regex === t.find_regex && e.replace_string === t.replace_string && e.source.ai_output === t.source.ai_output && e.source.user_input === t.source.user_input && e.destination.display === t.destination.display && e.destination.prompt === t.destination.prompt && e.run_on_edit === t.run_on_edit;
}
var Jn = class {
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		this.#e = e, this.#t = t, this.#n = n;
	}
	#r(e) {
		let t = this.#e.getChatMessages(e, { include_swipes: !0 });
		if (!Array.isArray(t)) throw Error("TavernHelper returned invalid chat messages");
		return t.map(Ln);
	}
	get_active_swipe_id(e) {
		return this.#r(e)[0]?.swipe_id ?? null;
	}
	get_active_chat() {
		let e = this.#r("0-{{lastMessageId}}");
		return Promise.resolve({
			chat_id: this.#t(),
			messages: e.map(Rn)
		});
	}
	async replace_message_text(e, t, n) {
		let [r] = this.#r(e);
		return r?.swipes[r.swipe_id] === t && (await this.#e.setChatMessages([{
			message_id: e,
			message: n
		}], { refresh: "affected" }), !0);
	}
	async generate_with_preset(e) {
		let t = Gn(e.connection), n = e.world_info.kind === "replace", r = {
			generation_id: e.generation_id,
			user_input: e.user_input,
			should_silence: !0,
			should_stream: !1,
			should_return_reasoning: !0,
			...t === void 0 ? {} : { custom_api: t },
			overrides: {
				...n ? {
					world_info_before: e.world_info.text,
					world_info_after: ""
				} : {},
				chat_history: {
					...n ? { with_depth_entries: !1 } : {},
					prompts: [...e.chat_history, {
						role: "system",
						content: e.instructions
					}]
				}
			},
			...e.tools === void 0 ? e.json_schema === null ? {} : { json_schema: {
				...e.json_schema,
				strict: !0
			} } : {
				tools: e.tools.tools.map((e) => ({
					type: "function",
					function: e
				})),
				tool_choice: e.tools.choice === "required" ? "required" : {
					type: "function",
					function: { name: e.tools.choice.name }
				}
			},
			...e.image === null ? {} : { image: [e.image] }
		}, i = this.#n();
		return Bn(await this.#i(e, r).finally(() => {
			i.restore();
		}));
	}
	#i(e, t) {
		return e.preset.kind === "builtin" ? this.#e.generateRaw({
			...t,
			ordered_prompts: [
				...e.preset.preamble,
				"world_info_before",
				"persona_description",
				"char_description",
				"char_personality",
				"scenario",
				"world_info_after",
				"chat_history",
				"user_input"
			]
		}) : this.#e.generate({
			...t,
			preset_name: e.preset.name
		});
	}
	list_worldbooks() {
		let e = this.#e.getWorldbookNames();
		if (!Array.isArray(e) || !e.every((e) => typeof e == "string")) throw Error("TavernHelper returned invalid world info book names");
		return e;
	}
	async read_worldbook(e) {
		let t = await this.#e.getWorldbook(e);
		if (!Array.isArray(t)) throw Error(`TavernHelper returned invalid entries for world info book ${e}`);
		return t.map(Wn);
	}
	stop_generation(e) {
		this.#e.stopGenerationById(e);
	}
	async sync_regex_scripts(e) {
		let t = { type: "global" }, n = this.#e.getTavernRegexes(t), r = e.map(Kn).filter((e) => {
			let t = n.find((t) => t.id === e.id);
			return t === void 0 || !qn(t, e);
		});
		if (r.length === 0) return !1;
		let i = n.filter((e) => !r.some((t) => t.id === e.id));
		return await this.#e.replaceTavernRegexes([...i, ...r], t), !0;
	}
	find_message_element(e) {
		return this.#e.retrieveDisplayedMessage(e).get(0) ?? null;
	}
}, Yn = "4.11.1", Xn = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function Zn(e) {
	let t = Xn.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function Qn(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function $n(e) {
	let t = Zn(e), n = Zn(Yn);
	return t === null || n === null ? "invalid" : Qn(t, n) ? "supported" : "unsupported";
}
var er = [
	"main_generation_events",
	"preset_generation",
	"message_swipe_metadata",
	"tavern_regex",
	"tavern_helper"
];
function tr(e) {
	return {
		available: !1,
		reason: e
	};
}
function nr(e, t) {
	return e ? { available: !0 } : tr(t);
}
function rr(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function ir(e, t) {
	return {
		main_generation_events: nr(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		preset_generation: nr(e.preset_generation, "TavernHelper.generate, stopGenerationById or the world info functions are unavailable"),
		message_swipe_metadata: nr(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper or SillyTavern chat message API is unavailable"),
		tavern_regex: nr(e.tavern_regex, "TavernHelper regex or displayed message API is unavailable"),
		tavern_helper: nr(e.version.state === "available", "TavernHelper version API is unavailable")
	};
}
function ar(e) {
	return er.filter((t) => e[t]?.available !== !0);
}
function or(e) {
	let t = Fn(rr(e, "TavernHelper")), n = ir(t, Tn(rr(e, "SillyTavern")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: ar(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: ar(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = $n(i);
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
	let o = ar(n);
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
var sr = "capability_not_implemented";
function V() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: sr }), Promise.reject(e);
}
function cr() {
	return () => {};
}
var lr = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	workflow: [],
	prompt_tag: [],
	creation: [],
	opening: []
}, ur = {
	capability_matrix: {},
	helper_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, dr = {
	schema_version: 1,
	active_namespace: "default",
	locale: "auto",
	credential_storage_mode: "host",
	active_provider_profile_id: null,
	global_concurrency: 1,
	auto_generation_enabled: !1,
	vocabulary_remote: {
		catalog_url: "",
		token_saved: !1
	},
	illustration: {
		preset_source: "builtin",
		preset_name: "in_use",
		connection: { kind: "current" },
		max_chat_history: 4,
		max_images_per_message: 2,
		prompt_preset_id: null,
		world_info: { mode: "chat" },
		wardrobe_model: null,
		analysis_guidance: "",
		wardrobe_guidance: "",
		strip: oe,
		size_sets: [],
		size_set_id: null,
		size_set_by_chat: {},
		structured_output: "auto",
		analysis_reasoning: "preset"
	},
	world_info_overrides: {
		no_recursion_books: [],
		slim_books: [],
		slim_guidance: ""
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
function fr() {
	return {
		generation: {
			load: () => Promise.resolve([]),
			subscribe: cr,
			submit: V,
			cancel: V,
			retry: V,
			dismiss: V
		},
		profiles: {
			load: () => Promise.resolve([]),
			subscribe: cr,
			save: V,
			remove: V,
			test_connection: V,
			inspect_comfyui: V,
			list_comfyui_workflows: V,
			read_comfyui_workflow: V,
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
			subscribe: cr,
			load_draft: V,
			save_draft: V,
			remove: V,
			bulk_remove: V,
			test_regex: V
		},
		assets: {
			load: () => Promise.resolve(lr),
			subscribe: cr,
			save: V,
			remove: V,
			reorder: V
		},
		gallery: {
			load: () => Promise.resolve([]),
			subscribe: cr,
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
			load: () => Promise.resolve(ur),
			subscribe: cr,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: V
		},
		settings: {
			load: () => Promise.resolve({
				settings: dr,
				browser_secret_vault: {
					state: "unavailable",
					secret_count: 0
				}
			}),
			subscribe: cr,
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
			set_vocabulary_token: V,
			clear_vocabulary_token: V,
			import_vocabulary_package: V,
			cancel_vocabulary_import: () => {},
			export_archive: V,
			import_archive: V
		}
	};
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function pr(e) {
	let t = ye(We(e)), n = _e(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), Ae(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region src/modules/experience/media_state_player.ts
var mr = ["image", "video"], hr = /^(?:blob:|data:image\/|data:video\/)/u, gr = s({
	kind: u(mr),
	url: o().min(1).refine((e) => hr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function _r(e) {
	let t = gr.safeParse(e);
	return t.success ? t.data : null;
}
function vr(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: _r(n)
	};
}
var yr = 8;
function br(e, t) {
	let n = Math.max(yr, t.width - 56 - yr), r = Math.max(yr, t.height - 56 - yr);
	return {
		x: Math.min(Math.max(e.x, yr), n),
		y: Math.min(Math.max(e.y, yr), r)
	};
}
function xr(e) {
	return br({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var Sr = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function Cr(e) {
	let t = _r(e);
	return t !== null && t.kind === "image" ? t : null;
}
var wr = class {
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
		this.#n && (this.#t = br(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = xr(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? xr(t) : br(e, t);
	}
}, Tr = {
	floatingEntry: "_floatingEntry_1bpar_9",
	floatingEntryDragging: "_floatingEntryDragging_1bpar_34",
	floatingEntryMedia: "_floatingEntryMedia_1bpar_38"
}, Er = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], Dr = ["src"], Or = ["src"], kr = /* @__PURE__ */ Me({
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
		let n = e, r = t, i = Ge(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new wr({
			position_store: De(n.positionStore) ?? ye(new Sr()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = P(o.position), c = P(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		he(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		pe(() => {
			window.addEventListener("resize", u);
		}), we(() => {
			window.removeEventListener("resize", u);
		});
		let d = Oe(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: Cr(n.mediaAssets.idle)
			} : vr(n.mediaAssets, e);
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
		return (t, n) => e.enabled ? (O(), ge("button", {
			key: 0,
			type: "button",
			class: N(["tc-interactive", [A(Tr).floatingEntry, c.value && A(Tr).floatingEntryDragging]]),
			style: Se({
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
		}, [d.value.asset?.kind === "video" ? (O(), ge("video", {
			key: 0,
			class: N(A(Tr).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, Dr)) : d.value.asset?.kind === "image" ? (O(), ge("img", {
			key: 1,
			class: N(A(Tr).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, Or)) : (O(), xe(Ke, {
			key: 2,
			icon: A(ne)
		}, null, 8, ["icon"]))], 46, Er)) : be("", !0);
	}
}), Ar = "data-tavern-canvas-menu-entry";
function jr(e, t) {
	let n = P(!1), r = null;
	return pe(() => {
		let i = document.getElementById("extensionsMenu");
		if (i === null) return;
		i.querySelector(`[${Ar}]`)?.remove(), r = document.createElement("div"), r.className = "list-group-item flex-container flexGap5 interactable", r.setAttribute(Ar, ""), r.setAttribute("role", "button"), r.tabIndex = 0;
		let a = document.createElement("div");
		a.className = "extensionsMenuExtensionButton", a.append(qe(document));
		let o = document.createElement("span");
		fe(() => {
			o.textContent = e();
		}), r.append(a, o), r.addEventListener("click", t), i.append(r), n.value = !0;
	}), we(() => {
		r?.remove();
	}), n;
}
//#endregion
//#region src/host/slash_command.ts
var Mr = "inkwell", Nr = !1;
function Pr(e, t) {
	if (Nr) return;
	let n = globalThis.SillyTavern?.getContext?.(), r = n?.SlashCommand?.fromProps?.({
		name: Mr,
		helpString: e,
		returns: "nothing",
		callback: () => (t(), "")
	});
	r !== void 0 && n?.SlashCommandParser?.addCommandObject !== void 0 && (n.SlashCommandParser.addCommandObject(r), Nr = !0);
}
//#endregion
//#region src/ui/experience/use_host_entry_points.ts
var Fr = "data-tavern-canvas-settings";
function Ir(e, t) {
	let n = null;
	pe(() => {
		Pr(e.description(), t);
		let r = document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
		if (r === null) return;
		r.querySelector(`[${Fr}]`)?.remove(), n = document.createElement("div"), n.setAttribute(Fr, ""), n.className = "flex-container flexFlowColumn flexGap5";
		let i = document.createElement("b"), a = document.createElement("small"), o = document.createElement("div");
		fe(() => {
			i.textContent = e.name(), a.textContent = e.description(), o.textContent = e.open();
		}), o.className = "menu_button interactable", o.setAttribute("role", "button"), o.tabIndex = 0, o.addEventListener("click", t), o.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t());
		}), n.append(i, a, o), r.append(n);
	}), we(() => {
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
	window: "_window_1jfap_1",
	"floating-window-enter": "_floating-window-enter_1jfap_1"
}, Br = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], Vr = /* @__PURE__ */ Me({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = P(null), r = P({
			x: 0,
			y: 0
		}), i = P(!1), a = P(!1);
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
		return pe(() => {
			window.addEventListener("resize", u), Te(c);
		}), we(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (O(), ge("section", {
			ref_key: "window_element",
			ref: n,
			class: N(A(zr).window),
			style: Se({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [me(e.$slots, "default")], 46, Br));
	}
}), Hr = "[role=\"listbox\"], [role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"]";
function Ur(e) {
	let t = e.ownerDocument;
	function n(t) {
		let n = [...e.querySelectorAll(Hr)];
		if (n.length === 0) return;
		let r = t.composedPath();
		n.some((e) => r.includes(e)) || t.preventDefault();
	}
	let r = {
		capture: !0,
		passive: !1
	};
	return t.addEventListener("wheel", n, r), t.addEventListener("touchmove", n, r), () => {
		t.removeEventListener("wheel", n, r), t.removeEventListener("touchmove", n, r);
	};
}
//#endregion
//#region src/ui/shell/PortalProvider.vue
var Wr = /* @__PURE__ */ Me({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return k(Ve, t.portalTarget), we(Ur(t.portalTarget)), (e, t) => me(e.$slots, "default");
	}
}), Gr = ["href"], Kr = /* @__PURE__ */ Me({
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
		translator: {},
		creation: {},
		opening: {}
	},
	setup(t) {
		let n = t, r = ve(() => import("./chunks/ChatLayer-COxGHcPp.js")), i = ve(() => import("./chunks/StudioShell-Ml3abeld.js")), { t: a } = Ee();
		function o() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let s = n.hostElement, c = o();
		s.dataset.colorMode = c;
		let l = Oe(() => n.probe.ready ? void 0 : n.probe.current_version), u = Oe(() => `${a("app.name")} ${a("app.version_label", { version: n.version })}`), d = n.status.state === "ready" ? pr({
			capabilities: n.capabilities ?? fr(),
			initial_color_mode: c
		}) : null, f = d === null ? null : n.host ?? null, p = P(f?.get_active_chat_id() ?? null), m = f?.subscribe_chat_change((e) => {
			p.value = e.chat_id;
		});
		we(() => m?.()), k(He, p), k(ze, n.translator ?? null);
		let h = d === null ? null : n.illustrations ?? null, g = n.capabilities?.gallery;
		k(Be, h === null || g === void 0 ? null : {
			async generate(e) {
				let t = await h.generate_image({
					...e,
					character_prompts: []
				});
				return new Blob([new Uint8Array(await g.read_bytes(t))]);
			},
			read_outfit: (e) => h.read_outfit(e),
			read_character: (e) => h.read_character(e)
		}), k(Ue, n.creation ?? (h === null ? null : {
			plan_story: (e, t) => h.plan_story(e, t),
			strip_messages: () => h.strip_messages(),
			plan_strip: (e, t, n) => h.plan_strip(e, t, n),
			generate: (e) => h.generate_image(e)
		})), k(Le, n.opening ?? (h === null ? null : {
			request: (e, t, n) => h.request_opening(e, t, n),
			request_lean: (e, t, n) => h.request_lean(e, t, n),
			host: async () => (await import("./chunks/tavern_helper_opening-Dz71HCVG.js")).create_opening_host(globalThis)
		}));
		let _ = Oe(() => {
			let e = d?.state.value, t = e?.settings.settings?.active_provider_profile_id ?? null;
			return {
				profile: e?.generation.profiles.find((e) => e.id === t) ?? null,
				custom_presets: e?.assets.records.prompt_tag ?? [],
				save: (e, t) => d === null ? Promise.resolve() : d.controller.save_prompt_tags(e, t)
			};
		}), v = P(c), y = typeof window > "u" || typeof window.matchMedia != "function" ? null : window.matchMedia("(prefers-color-scheme: dark)");
		function b(e) {
			v.value = e.matches ? "dark" : "light";
		}
		y?.addEventListener("change", b), we(() => y?.removeEventListener("change", b));
		let x = Oe(() => {
			let e = d?.state.value.settings.settings?.ui.color_mode ?? "system";
			return e === "system" ? v.value : e;
		});
		he(x, (e) => {
			s.dataset.colorMode = e;
		});
		function S(e) {
			d?.controller.set_route(e);
		}
		function C(e) {
			d?.controller.set_inspector_collapsed(e);
		}
		function w(e) {
			d?.controller.set_inspector_width(e);
		}
		function ee() {
			window.location.reload();
		}
		let te = P(!1), ne = Oe(() => te.value), re = jr(() => a("app.name"), E);
		Ir({
			name: () => a("app.name"),
			description: () => a("app.entry_description"),
			open: () => a("app.open_action")
		}, E);
		let T = Oe(() => !re.value || d?.state.value.settings.settings?.ui.optional_entry_enabled === !0);
		he(ne, (e) => {
			s.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function E() {
			te.value = !0;
		}
		function ie() {
			te.value = !1;
		}
		return (n, o) => (O(), xe(Wr, { "portal-target": t.portalTarget }, {
			default: ke(() => [t.status.state === "blocked" ? (O(), ge("div", {
				key: 0,
				class: N(A(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				M("p", { class: N(A(e).state_screen_eyebrow) }, j(u.value), 3),
				M("h1", { class: N(A(e).state_screen_title) }, j(A(a)("app.unsupported_host.title")), 3),
				M("p", { class: N(A(e).state_screen_description) }, j(A(a)("app.unsupported_host.description", {
					required_version: A(Yn),
					current_version: l.value ?? A(a)("status.unknown")
				})), 3),
				M("a", {
					class: N(["tc-interactive", A(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, j(A(a)("app.unsupported_host.update_action")), 11, Gr)
			], 2)) : t.status.state === "failed" ? (O(), ge("div", {
				key: 1,
				class: N(A(e).state_screen),
				"data-startup-state": "failed"
			}, [
				M("p", { class: N(A(e).state_screen_eyebrow) }, j(u.value), 3),
				M("h1", { class: N(A(e).state_screen_title) }, j(A(a)("app.fatal_error.title")), 3),
				M("p", { class: N(A(e).state_screen_description) }, j(A(a)("app.fatal_error.description")), 3),
				M("pre", {
					class: N(A(e).state_screen_detail),
					"data-testid": "startup-error-detail"
				}, j(t.status.detail), 3),
				M("button", {
					type: "button",
					class: N(["tc-interactive", A(e).state_screen_action]),
					onClick: ee
				}, j(A(a)("app.fatal_error.reload_action")), 3)
			], 2)) : A(d) ? (O(), ge(je, { key: 2 }, [
				ne.value ? (O(), xe(Vr, {
					key: 0,
					label: A(a)("app.name")
				}, {
					default: ke(() => [Ne(A(i), {
						state: A(d).state.value,
						controller: A(d).controller,
						onSelectRoute: S,
						onSetInspectorCollapsed: C,
						onResizeInspector: w,
						onClose: ie
					}, null, 8, ["state", "controller"])]),
					_: 1
				}, 8, ["label"])) : be("", !0),
				Ne(kr, {
					enabled: T.value && !ne.value,
					"open-label": A(a)("app.name"),
					onOpen: E
				}, null, 8, ["enabled", "open-label"]),
				t.host && A(h) && t.capabilities ? (O(), xe(A(r), {
					key: 1,
					host: t.host,
					service: A(h),
					gallery: t.capabilities.gallery,
					novelai: t.capabilities.novelai,
					translator: t.translator ?? null,
					"prompt-tags": _.value
				}, null, 8, [
					"host",
					"service",
					"gallery",
					"novelai",
					"translator",
					"prompt-tags"
				])) : be("", !0)
			], 64)) : be("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
}), qr = "._slot_1stbq_7,._notice_1stbq_8,._lightbox_1stbq_9,._paragraph_action_1stbq_10{--tc-space-0-5:2px;--tc-space-1:4px;--tc-space-1-5:6px;--tc-space-2:8px;--tc-space-3:12px;--tc-control-height-sm:28px;--tc-control-padding-x-sm:12px;--tc-control-gap:6px;--tc-radius-control:999px;--tc-radius-image:6px;--tc-radius-popover:16px;--tc-motion-fast:.14s;--tc-marker:#f6d743;--tc-on-marker:#17171a}._slot_1stbq_7{gap:var(--tc-space-1);margin:var(--tc-space-2) auto;max-width:min(100%,560px);color:var(--SmartThemeBodyColor,inherit);font-size:calc(var(--mainFontSize,1rem) * .9);grid-template-columns:minmax(0,1fr);display:grid}._frame_1stbq_39{border-radius:var(--tc-radius-image);background:var(--SmartThemeBlurTintColor,#00000026);position:relative;overflow:hidden}._image_1stbq_46{cursor:zoom-in;width:100%;height:auto;display:block}._placeholder_1stbq_53{aspect-ratio:3/2;justify-content:center;align-items:center;gap:var(--tc-space-2);padding:var(--tc-space-3);text-align:center;opacity:.85;flex-direction:column;display:flex}._error_1stbq_65{color:var(--SmartThemeQuoteColor,#e06c75)}._toolbar_1stbq_69{align-items:center;gap:var(--tc-space-0-5);flex-wrap:wrap;display:flex}._status_1stbq_76{font-size:.95em}._pager_1stbq_80{align-items:center;gap:var(--tc-space-0-5);display:inline-flex}._counter_1stbq_86{font-variant-numeric:tabular-nums;text-align:center;opacity:.75;min-width:3.2em;font-size:.85em}._scene_1stbq_94{white-space:nowrap;text-overflow:ellipsis;opacity:.75;flex:8em;min-width:0;font-size:.85em;overflow:hidden}._actions_1stbq_104{align-items:center;gap:var(--tc-space-0-5);margin-left:auto;display:inline-flex}._more_1stbq_111{position:relative}._menu_1stbq_115{right:0;bottom:calc(100% + var(--tc-space-1));z-index:3;min-width:10em;padding:var(--tc-space-1);border-radius:var(--tc-radius-popover);background:var(--SmartThemeChatTintColor,Canvas);display:grid;position:absolute;box-shadow:0 8px 24px #00000040}._menu_item_1stbq_128{height:var(--tc-control-height-sm);padding:0 var(--tc-space-3);border-radius:var(--tc-radius-control);color:inherit;font:inherit;text-align:start;white-space:nowrap;cursor:pointer;background:0 0;border:0}._menu_item_1stbq_128:hover:not(:disabled),._menu_item_1stbq_128:focus-visible{background:#8080802e;outline:none}._menu_item_1stbq_128:disabled{cursor:default;opacity:.5}._button_1stbq_153{justify-content:center;align-items:center;gap:var(--tc-control-gap);min-width:var(--tc-control-height-sm);height:var(--tc-control-height-sm);padding:0 var(--tc-control-padding-x-sm);border-radius:var(--tc-radius-control);color:inherit;font:inherit;white-space:nowrap;cursor:pointer;transition:background-color var(--tc-motion-fast) ease;background:0 0;border:0;display:inline-flex}._button_1stbq_153:hover:not(:disabled){background:var(--SmartThemeBlurTintColor,#80808026)}._icon_button_1stbq_176{width:var(--tc-control-height-sm);padding:0}._button_1stbq_153:focus-visible{outline-offset:1px;outline:2px solid}._button_1stbq_153:disabled{cursor:default;opacity:.5}._skeleton_1stbq_191{border-radius:var(--tc-radius-control);opacity:.2;background:currentColor;width:60%;height:.8em;animation:1.4s ease-in-out infinite _pulse_1stbq_1}._notice_1stbq_8{margin:var(--tc-space-2) 0;padding:var(--tc-space-2) var(--tc-space-3);border-inline-start:3px solid var(--SmartThemeQuoteColor,#e06c75);border-radius:0 var(--tc-radius-image) var(--tc-radius-image) 0;background:var(--SmartThemeBlurTintColor,#0000001a);font-size:calc(var(--mainFontSize,1rem) * .85)}._excerpt_1stbq_209{margin:var(--tc-space-1-5) 0 0;white-space:pre-wrap;opacity:.8;max-height:8em;font-family:monospace;overflow:auto}@keyframes _pulse_1stbq_1{50%{opacity:.45}}@media (prefers-reduced-motion:reduce){._skeleton_1stbq_191{animation:none}}._lightbox_1stbq_9{z-index:9999;cursor:zoom-out;background:#000c;justify-content:center;align-items:center;padding:2vmin;display:flex;position:fixed;inset:0}._lightbox_1stbq_9 img{object-fit:contain;max-width:100%;max-height:100%}._notice_actions_1stbq_248{gap:var(--tc-space-0-5);margin-top:var(--tc-space-1-5);flex-wrap:wrap;display:flex}@media (width<=600px){._scene_1stbq_94{flex-basis:100%;order:-1}._button_label_1stbq_262{clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}._actions_1stbq_104 ._button_1stbq_153{width:var(--tc-control-height-sm);padding:0}}._paragraph_action_1stbq_10{z-index:50;justify-content:center;align-items:center;gap:var(--tc-control-gap);height:var(--tc-control-height-sm);min-width:var(--tc-control-height-sm);border-radius:var(--tc-radius-control);background:var(--tc-marker);color:var(--tc-on-marker);font:inherit;font-size:calc(var(--mainFontSize,1rem) * .85);cursor:pointer;border:0;padding:0;display:inline-flex;position:fixed;box-shadow:0 2px 6px #0003}._paragraph_action_1stbq_10[data-kind=selection],._paragraph_action_1stbq_10[data-kind=status]{padding:0 var(--tc-control-padding-x-sm);color:#fafaf7;background:#17171a;box-shadow:0 6px 18px #00000040}._paragraph_action_1stbq_10[data-kind=selection]{transform:translate(-50%, calc(-100% - var(--tc-space-2)))}._paragraph_action_1stbq_10[data-kind=status]{cursor:default;transform:translate(-100%)}._paragraph_action_1stbq_10:focus-visible{outline-offset:2px;outline:2px solid}._paragraph_highlight_1stbq_326{background:#f6d7432e;border-radius:4px;box-shadow:0 0 0 4px #f6d7432e}", Jr = "tavern-canvas-chat-style";
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
//#region src/modules/world_info/world_info_overrides_module.ts
var Zr = class {
	module_id = "world_info_overrides";
	requires = [];
	#e;
	#t;
	#n;
	#r = [];
	constructor(e, t, n) {
		this.#e = e, this.#t = t, this.#n = n;
	}
	start() {
		return this.#r = [this.#e.prevent_world_info_recursion(() => new Set(this.#t().no_recursion_books)), this.#e.inject_world_info_slims((e, t, n) => this.#t().slim_books.includes(e) ? this.#n.lookup(e, t, n) : null)], Promise.resolve();
	}
	stop() {
		for (let e of this.#r) e();
		return this.#r = [], Promise.resolve();
	}
}, Qr = /* @__PURE__ */ new Set([
	"openai",
	"claude",
	"openrouter",
	"makersuite",
	"vertexai",
	"azure_openai",
	"custom",
	"deepseek",
	"xai"
]), $r = /* @__PURE__ */ new Set();
function ei(e, t) {
	return {
		tools: [{
			name: e.name,
			description: "Submit the result.",
			parameters: e.value
		}],
		choice: { name: e.name },
		parse: (n, r) => t(n.find((t) => t.name === e.name)?.arguments ?? r)
	};
}
function ti(e) {
	return {
		tools: e.tools,
		choice: e.choice
	};
}
function ni(e, t) {
	if (t.kind === "custom") return `custom:${t.api_url}:${t.model}`;
	let n = e.chat_completion_target?.() ?? null;
	return n === null || !Qr.has(n.source) ? null : t.kind === "proxy_preset" ? `proxy:${t.proxy_preset}:${t.model ?? n.model}` : `${n.source}:${n.model}`;
}
function ri(e, t) {
	return e === "tools" || t !== null && !$r.has(t);
}
function ii(e) {
	e !== null && $r.add(e);
}
//#endregion
//#region src/modules/illustration/worldbook.ts
function ai(e, t) {
	return typeof e == "string" ? gt(t, e) : new RegExp(e.source, e.flags.replace("g", "")).test(t);
}
function oi(e, t) {
	if (e.secondary_keys.length === 0) return !0;
	let n = e.secondary_keys.map((e) => ai(e, t));
	switch (e.secondary_logic) {
		case "and_any": return n.some(Boolean);
		case "and_all": return n.every(Boolean);
		case "not_all": return !n.every(Boolean);
		case "not_any": return !n.some(Boolean);
	}
}
function si(e, t) {
	return e.filter((e) => e.enabled && e.content.trim() !== "" && (e.strategy === "constant" || e.strategy === "selective" && e.keys.some((e) => ai(e, t)) && oi(e, t))).sort((e, t) => e.order - t.order).map((e) => e.content.trim()).join("\n\n");
}
//#endregion
//#region src/modules/illustration/analysis_requests.ts
var ci = 3;
function li(e, t, n) {
	return n <= 1 ? [] : e.messages.filter((e) => e.message_id < t && !e.is_hidden && e.role !== "system").slice(-(n - 1)).map((e) => ({
		role: e.role === "user" ? "user" : "assistant",
		content: pt(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? "")
	}));
}
function ui(e) {
	let t = e.messages.findLast((e) => e.role === "user")?.name.trim() ?? "";
	return t === "" ? null : t;
}
var di = 2e3, fi = 18e4;
async function pi(e, t, n, r) {
	let i, a = () => {}, o = new Promise((n, o) => {
		let s = (n) => {
			e.stop_generation(t), o(new ot(n));
		};
		a = () => {
			s("cancelled");
		}, i = setTimeout(() => {
			s("timed_out");
		}, fi), r.addEventListener("abort", a, { once: !0 });
	});
	try {
		return await Promise.race([n, o]);
	} finally {
		clearTimeout(i), r.removeEventListener("abort", a);
	}
}
var mi = [
	"You read an interactive story and answer requests about its pictures and characters for an anime image model.",
	"The story is fiction written for adult readers and may contain violence or sexual content. Describe what the story shows accurately and completely, in the format the request asks for.",
	"Answer only through the provided tool or the requested format, with no other text."
].join("\n");
function hi(e) {
	return e === null ? "Answer the request above with only the JSON object it asks for." : e.choice === "required" ? "Answer the request above by calling the provided tools." : `Answer the request above by calling ${e.choice.name}.`;
}
function gi(e) {
	return e.preset_source === "builtin" ? {
		kind: "builtin",
		preamble: [{
			role: "system",
			content: mi
		}]
	} : {
		kind: "sillytavern",
		name: e.preset_name
	};
}
async function _i(e, t) {
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
async function vi(e, t, n) {
	switch (e.mode) {
		case "chat": return { kind: "chat" };
		case "off": return {
			kind: "replace",
			text: ""
		};
		case "worldbook": return {
			kind: "replace",
			text: si((await Promise.all(e.worldbooks.map((e) => n.read_worldbook(e)))).flat(), t)
		};
	}
}
async function yi(e, t, n, r) {
	let i = e.settings(), a = i.wardrobe_model, o = await _i(a === null || i.connection.kind === "current" ? i.connection : {
		...i.connection,
		model: a
	}, e.resolve_analysis_key), s = ni(e.host, o), c = ei(n, (e) => e), l = "", u = async (a) => {
		l = e.new_generation_id();
		let s = await e.host.generate_with_preset({
			generation_id: l,
			preset: gi(i),
			instructions: t,
			user_input: hi(a ? c : null),
			chat_history: [],
			connection: o,
			json_schema: a ? null : n,
			...a ? { tools: ti(c) } : {},
			world_info: {
				kind: "replace",
				text: ""
			},
			image: r,
			reasoning: i.analysis_reasoning
		});
		return a ? c.parse(s.tool_calls ?? [], s.content) : s.content;
	};
	if (!ri(i.structured_output, s)) return u(!1);
	try {
		let t = await u(!0);
		return e.on_attempt?.("tools", "ok", l), t;
	} catch (t) {
		if (i.structured_output !== "auto") throw e.on_attempt?.("tools", "failed", l), t;
		e.on_attempt?.("tools", "fallback", l);
		let n = await u(!1);
		return ii(s), n;
	}
}
function bi(e) {
	return (t, n) => yi(e, [t, ...ht(e.settings().wardrobe_guidance)].join("\n"), n, null);
}
async function xi(e, t, n, r, i = {}) {
	let a = e.settings(), o = await _i(a.connection, e.resolve_analysis_key), s = await vi(i.world_info ?? a.world_info, t, e.host), c = ni(e.host, o), l = n.tools ?? ei(n.json_schema, n.parse), u = i.preamble === void 0 ? gi(a) : {
		kind: "builtin",
		preamble: i.preamble
	}, d = !1;
	for (let t = 1;;) {
		if (r.aborted) throw new ot("cancelled");
		let i = !d && ri(a.structured_output, c), f = i ? "tools" : "json_schema", p = e.new_generation_id();
		try {
			let t = await pi(e.host, p, e.host.generate_with_preset({
				generation_id: p,
				preset: u,
				instructions: i ? l.user_input ?? n.user_input : n.user_input,
				user_input: hi(i ? l : null),
				chat_history: n.history,
				connection: o,
				json_schema: i ? null : n.json_schema,
				...i ? { tools: ti(l) } : {},
				world_info: s,
				image: null,
				reasoning: a.analysis_reasoning
			}), r), m = i ? l.parse(t.tool_calls ?? [], t.content) : n.parse(t.content);
			return d && ii(c), e.on_attempt?.(f, "ok", p), m;
		} catch (n) {
			if (n instanceof ot) throw n;
			if (i && a.structured_output === "auto") {
				d = !0, e.on_attempt?.(f, "fallback", p);
				continue;
			}
			if (e.on_attempt?.(f, "failed", p), t >= ci) throw n;
			await e.wait(di * t), t += 1;
		}
	}
}
//#endregion
//#region src/modules/media/media_command_service.ts
var Si = class {
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
}, Ci = class {
	#e = /* @__PURE__ */ new Map();
	register(e) {
		this.#e.set(e.request_id, e);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
};
async function wi(e, t, n) {
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
var Ti = 1e3;
function Ei(e) {
	if (e instanceof F) return new L({
		code: e.code === "configuration" ? "not_configured" : "malformed_response",
		retryable: !1
	});
	if (e instanceof Error && "provider_error" in e) {
		let t = ee.safeParse(e.provider_error);
		if (t.success) return new L(t.data);
	}
	return e;
}
var Di = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new L({
			code: "invalid_request",
			retryable: !1
		});
		let r;
		try {
			r = await this.#n(n, t);
		} catch (e) {
			throw Ei(e);
		}
		let i = await this.#r(n, r), a;
		try {
			a = await this.#i(e, i);
		} catch {
			throw new L({
				code: "storage_failed",
				retryable: !1
			});
		}
		return { image_ids: a };
	}
	async #n(e, t) {
		let n = (await this.#e.load_adapters())[e.provider_id];
		if (n === void 0) throw new L({
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
		let a = i.poll_after_ms ?? Ti;
		for (;;) {
			await this.#t(a);
			let e = await n.poll(r, i);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new L(e.error);
			a = e.poll_after_ms ?? a;
		}
	}
	#r(e, t) {
		return this.#e.postprocess === void 0 ? Promise.resolve(t) : this.#e.postprocess(e, t);
	}
	#i(e, t) {
		return wi(this.#e, e, t.map((e) => ({
			bytes: e.bytes,
			media_type: e.asset.media_type
		})));
	}
};
async function Oi(e, t, n) {
	return e.plans.register(n), ki(e.queue, t, n.request_id, n.provider_id);
}
async function ki(e, t, n, r) {
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
function Ai(e, t) {
	return e.queue.cancel(t);
}
//#endregion
//#region src/modules/illustration/illustration_service.ts
function ji(e) {
	return e === void 0 ? {} : { size: {
		width: e.width,
		height: e.height
	} };
}
var Mi = class extends Error {
	constructor(e) {
		super(`Message ${String(e)} changed while it was being analyzed`), this.name = "MessageChangedError";
	}
}, Ni = 6, Pi = /* @__PURE__ */ new Set([
	"normal",
	"swipe",
	"regenerate",
	"continue"
]);
async function Fi(e, t) {
	let { attach_character_prompts: n } = await import("./chunks/character_prompts-Bjhqww0Z.js");
	return n(e, t);
}
function Ii(e) {
	return e instanceof F && e.code === "configuration" ? "not_configured" : e instanceof st ? "analysis_unparsable" : e instanceof ot ? e.reason : e instanceof Mi ? "message_changed" : (e instanceof Error ? e.message : String(e)).slice(0, 500);
}
var Li = class {
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
		let t = Qt.safeParse(this.#e.host.read_swipe_record(e));
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
			throw e instanceof ot && e.reason === "cancelled" ? (this.#g({
				type: "analysis_cancelled",
				location: r
			}), e) : (this.#g({
				type: "analysis_failed",
				location: r,
				message: Ii(e),
				excerpt: e instanceof st ? e.excerpt : null
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
		let r = dt(t), i = this.#e.settings(), a = {
			schema_version: 2,
			slots: []
		};
		if (r.length > 0) {
			let o = await this.#e.host.get_active_chat(), s = li(o, e.message_id, i.max_chat_history), c = this.#e.wardrobe.read(e) === null ? await this.#e.wardrobe.prepare_update(e, !0) : null, l = await this.#e.prompt_context(e.chat_id), { build_analysis_input: u } = await import("./chunks/analysis_prompts-_Jz2j0kt.js").then((e) => e.t), { analysis_json_schema: d, combined_analysis_json_schema: f, COMBINED_REPLY_FORMAT: p, COMBINED_TOOLS_FORMAT: m, ILLUSTRATIONS_TOOL: h, parse_analysis_output: g, WARDROBE_TOOL: _, wardrobe_reply_of: v } = await import("./chunks/analysis-CKVJQdqT.js").then((e) => e.i), { active_sizes: y } = await import("./chunks/size_choice-BAuN1-V0.js").then((e) => e.r), b = y(i, e.chat_id), x = u(r, i.max_images_per_message, l.library, i.analysis_guidance, ui(o), b), S = (e) => g(e, r.length, i.max_images_per_message, b), { proposals: C, wardrobe_reply: w } = await xi(this.#e, t, c === null ? {
				user_input: x,
				history: s,
				json_schema: d(b),
				parse: (e) => ({
					proposals: S(e),
					wardrobe_reply: null
				})
			} : {
				user_input: [
					x,
					"",
					c.input,
					...ht(i.wardrobe_guidance),
					"",
					p
				].join("\n"),
				history: s,
				json_schema: f(c.json_schema, d(b)),
				parse: (e) => ({
					proposals: S(e),
					wardrobe_reply: v(e)
				}),
				tools: {
					tools: [{
						name: h,
						description: "Submit the pictures chosen for this reply.",
						parameters: d(b).value
					}, {
						name: _,
						description: "Submit the wardrobe update.",
						parameters: c.json_schema.value
					}],
					choice: "required",
					user_input: [
						x,
						"",
						c.input,
						...ht(i.wardrobe_guidance),
						"",
						m
					].join("\n"),
					parse: (e, t) => {
						let n = e.find((e) => e.name === h), r = e.find((e) => e.name === _);
						return {
							proposals: S(n?.arguments ?? t),
							wardrobe_reply: r?.arguments ?? (n === void 0 ? v(t) : null)
						};
					}
				}
			}, n), ee = c === null ? await this.#h(e) : await this.#m(e, c, w);
			a.slots.push(...mt(r, C, l, ee, this.#e.new_slot_id));
		}
		if (await this.#e.host.write_swipe_record(e, a), a.slots.length > 0) {
			let n = lt(t, a.slots.map((e) => ({
				paragraph: e.paragraph,
				slot_id: e.slot_id
			})));
			if (!await this.#e.host.replace_message_text(e.message_id, t, n)) throw await this.#e.host.write_swipe_record(e, null), new Mi(e.message_id);
		}
		return a;
	}
	async #s(e) {
		let t = await this.#e.host.get_active_chat(), n = t.messages.find((t) => t.message_id === e.message_id);
		if (t.chat_id !== e.chat_id || n?.active_swipe_id !== e.swipe_id) throw new Mi(e.message_id);
		return n.swipes[e.swipe_id]?.content ?? "";
	}
	async paragraph_index_of(e, t) {
		let n = await this.active_location(e);
		return ct(dt(await this.#s(n)), t);
	}
	async illustrate_paragraph(e, t) {
		let n = await this.active_location(e), r = this.read(n)?.slots.find((e) => e.paragraph === t) ?? (await this.add_paragraphs(n, [t]))[0];
		if (r === void 0) throw RangeError(`Message ${String(e)} has no paragraph ${String(t)}`);
		return await this.generate(n, r.slot_id), r.slot_id;
	}
	async open_paragraphs(e) {
		let t = new Set(this.read(e)?.slots.map((e) => e.paragraph) ?? []);
		return dt(await this.#s(e)).filter((e) => !t.has(e.index));
	}
	async add_paragraphs(e, t) {
		let n = await this.#s(e), r = dt(n), i = this.read(e), a = new Set(i?.slots.map((e) => e.paragraph) ?? []), o = [...new Set(t)].filter((e) => e < r.length && !a.has(e)).sort((e, t) => e - t);
		if (o.length === 0) return [];
		let s = this.#e.settings(), c = await this.#h(e), l = await this.#e.prompt_context(e.chat_id), u = await this.#e.host.get_active_chat(), { build_chosen_paragraphs_input: d } = await import("./chunks/analysis_prompts-_Jz2j0kt.js").then((e) => e.t), { analysis_json_schema: f, parse_analysis_output: p } = await import("./chunks/analysis-CKVJQdqT.js").then((e) => e.i), { active_sizes: m } = await import("./chunks/size_choice-BAuN1-V0.js").then((e) => e.r), h = m(s, e.chat_id), g = await xi(this.#e, n, {
			user_input: d(r, o, l.library, s.analysis_guidance, ui(u), h),
			history: li(u, e.message_id, s.max_chat_history),
			json_schema: f(h),
			parse: (e) => p(e, r.length, r.length, h)
		}, new AbortController().signal), _ = new Map(g.map((e) => [e.paragraph, e])), v = mt(r, o.map((e) => _.get(e) ?? {
			paragraph: e,
			scene: (r[e]?.text ?? "").slice(0, 120),
			caption: "",
			tags: "",
			characters: []
		}), l, c, this.#e.new_slot_id);
		await this.#e.host.write_swipe_record(e, {
			schema_version: 2,
			slots: [...i?.slots ?? [], ...v]
		});
		let y = lt(n, v.map((e) => ({
			paragraph: e.paragraph,
			slot_id: e.slot_id
		})));
		if (!await this.#e.host.replace_message_text(e.message_id, n, y)) throw await this.#e.host.write_swipe_record(e, i), new Mi(e.message_id);
		return this.#g({
			type: "slots_changed",
			location: e
		}), v;
	}
	preview_request(e, t, n) {
		let r = this.#u(e, t), i = n ?? r;
		return this.#c({
			positive_prompt: i.positive_prompt,
			negative_prompt: i.negative_prompt,
			character_prompts: i.character_prompts,
			...ji(n?.size ?? r.size)
		});
	}
	async #c(e) {
		return Fi(await this.#e.build_request(e), e.character_prompts);
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
	async plan_story(e, t) {
		let n = await import("./chunks/creation_planning-BLBqCgZt.js").then((e) => e.n), r = dt(e), i = await this.#e.prompt_context(null), a = this.#e.settings(), { active_sizes: o } = await import("./chunks/size_choice-BAuN1-V0.js").then((e) => e.r), s = o(a, null), c = await xi(this.#e, e, {
			user_input: n.build_scene_input("story", r, Ni, i, a.analysis_guidance, null, !1, s),
			history: [],
			json_schema: n.scene_json_schema(s),
			parse: (e) => n.parse_scene_output(e, r.length, Ni, !1, s)
		}, new AbortController().signal, { world_info: t.length === 0 ? { mode: "off" } : {
			mode: "worldbook",
			worldbooks: [...t]
		} });
		return n.scenes_from_plans(r, c, i, [], this.#e.new_slot_id);
	}
	request_opening(e, t, n) {
		let r = this.#e.settings(), { connection: i } = t, a = {
			...r,
			preset_source: "sillytavern",
			preset_name: t.preset_name,
			analysis_reasoning: "preset",
			connection: i.kind === "analysis" ? r.connection : i.kind === "current" ? { kind: "current" } : {
				kind: "proxy_preset",
				proxy_preset: i.proxy_preset,
				model: null
			}
		}, { worldbooks: o } = t;
		return xi({
			...this.#e,
			settings: () => a
		}, t.text, {
			...e,
			history: []
		}, n, { world_info: o.length === 0 ? { mode: "off" } : {
			mode: "worldbook",
			worldbooks: [...o]
		} });
	}
	request_lean(e, t, n) {
		return xi(this.#e, "", {
			...e,
			history: []
		}, n, {
			world_info: { mode: "off" },
			preamble: t
		});
	}
	async strip_messages() {
		let e = await this.#e.host.get_active_chat();
		return {
			chat_id: e.chat_id,
			messages: e.messages.filter((e) => !e.is_hidden && e.role !== "system").map((e) => ({
				message_id: e.message_id,
				name: e.name,
				is_user: e.role === "user",
				text: e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? ""
			}))
		};
	}
	async plan_strip(e, t, n) {
		let r = await import("./chunks/creation_planning-BLBqCgZt.js").then((e) => e.n), { chat_id: i, messages: a } = await this.strip_messages(), o = a.filter((n) => n.message_id >= e && n.message_id <= t), s = r.strip_paragraphs(o), c = s.map((e) => e.text).join("\n"), l = this.#e.settings(), u = await this.#e.prompt_context(i), { active_sizes: d } = await import("./chunks/size_choice-BAuN1-V0.js").then((e) => e.r), f = d(l, i), p = o.at(-1), m = p === void 0 ? [] : await this.#h(await this.active_location(p.message_id)), h = await xi(this.#e, c, {
			user_input: r.build_scene_input("strip", s, n, u, l.analysis_guidance, a.find((e) => e.is_user)?.name ?? null, l.strip.symbol_bubbles, f),
			history: [],
			json_schema: r.scene_json_schema(f),
			parse: (e) => r.parse_scene_output(e, s.length, n, l.strip.symbol_bubbles, f)
		}, new AbortController().signal);
		return r.scenes_from_plans(s, h, u, m, this.#e.new_slot_id);
	}
	async read_outfit(e) {
		let { OUTFIT_FROM_IMAGE_INPUT: t, OUTFIT_FROM_IMAGE_JSON_SCHEMA: n, parse_outfit_from_image: r } = await import("./chunks/outfit_from_image-8QSWi_w1.js");
		return r(await yi(this.#e, t, n, e));
	}
	async read_character(e) {
		let { CHARACTER_FROM_IMAGE_INPUT: t, CHARACTER_FROM_IMAGE_JSON_SCHEMA: n, parse_character_from_image: r } = await import("./chunks/character_from_image-xJTKRs-r.js"), i = await yi(this.#e, t, n, e);
		return this.#e.wardrobe.check_character(r(i));
	}
	async generate(e, t, n) {
		let r = this.#u(e, t), i = {
			positive_prompt: n?.positive_prompt ?? r.positive_prompt,
			negative_prompt: n?.negative_prompt ?? r.negative_prompt,
			character_prompts: n?.character_prompts ?? r.character_prompts,
			...ji(n?.size ?? r.size)
		};
		await this.#l(e, t, () => this.#c(i), (e) => ({
			...e,
			positive_prompt: i.positive_prompt,
			negative_prompt: i.negative_prompt,
			character_prompts: i.character_prompts.map((e) => ({
				name: e.name,
				prompt: e.prompt,
				negative_prompt: e.negative_prompt,
				...e.center === void 0 ? {} : { center: {
					x: e.center.x,
					y: e.center.y
				} }
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
		await this.#l(e, t, async () => Fi(await this.#e.build_edit_request(n), i));
	}
	async #l(e, t, n, r = (e) => e) {
		let i;
		try {
			i = await this.#e.submit(await n());
		} catch (n) {
			throw await this.#d(e, t, (e) => ({
				...e,
				last_error: Ii(n)
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
		this.#i = null, !(t === null || !Pi.has(t)) && this.active_location(e.message_id).then(async (n) => {
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
				message: Ii(t)
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
				message: Ii(t)
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
function Ri(e) {
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
var zi = 6e3;
function Bi(e) {
	return pt(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? "");
}
function Vi(e) {
	return [[e.date, e.time].filter((e) => e !== null).join(" "), e.location === null ? "" : `at ${e.location}`].filter((e) => e !== "").join(" ");
}
function Hi(e, t) {
	let n = e.messages.find((e) => e.message_id === t);
	return n === void 0 ? null : {
		chat_id: e.chat_id,
		message_id: t,
		swipe_id: n.active_swipe_id
	};
}
var Ui = class {
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
		return this.#n(e, t).snapshot;
	}
	#n(e, t) {
		let n = e.messages.filter((e) => e.message_id < t && e.role === "assistant").sort((e, t) => t.message_id - e.message_id);
		for (let t of n) {
			let n = this.read({
				chat_id: e.chat_id,
				message_id: t.message_id,
				swipe_id: t.active_swipe_id
			});
			if (n !== null) return {
				snapshot: n,
				message_id: t.message_id
			};
		}
		return {
			snapshot: [],
			message_id: null
		};
	}
	async current(e) {
		let t = await this.#e.host.get_active_chat(), n = Hi(t, e);
		return (n === null ? null : this.read(n)) ?? this.inherited(t, e);
	}
	update(e) {
		return this.#e.host.get_active_chat().then(async (t) => {
			let n = Hi(t, e);
			if (n === null) throw Error(`Message ${String(e)} is not in the active chat`);
			let r = `${n.chat_id}:${String(e)}:${String(n.swipe_id)}`, i = this.#t.get(r);
			if (i !== void 0) return i;
			let a = this.#r(t, n).finally(() => this.#t.delete(r));
			return this.#t.set(r, a), a;
		});
	}
	async prepare_update(e, t) {
		return this.#i(await this.#e.host.get_active_chat(), e, t);
	}
	async #r(e, t) {
		let n = await this.#i(e, t, !1);
		return n.apply(await this.#e.run(n.input, n.json_schema));
	}
	async #i(e, t, n) {
		let r = e.messages.find((e) => e.message_id === t.message_id), i = pt(r?.swipes[t.swipe_id]?.content ?? ""), a = e.messages.filter((e) => e.message_id < t.message_id && !e.is_hidden && e.role !== "system"), o = a.findLast((e) => e.role === "user"), s = this.#n(e, t.message_id), c = s.snapshot, l = a.filter((e) => (s.message_id === null || e.message_id > s.message_id) && e !== o).slice(-8).map((e) => ({
			name: e.name,
			text: Bi(e)
		}));
		for (; l.reduce((e, t) => e + t.text.length, 0) > zi;) l.shift();
		let u = s.message_id === null ? null : Hi(e, s.message_id), d = u === null ? null : this.#e.host.read_story_status(u), f = this.#e.host.read_story_status(t), p = d === null || f === null || Vi(d) === Vi(f) ? null : {
			from: Vi(d),
			to: Vi(f)
		}, [m, { apply_scene_update: h, build_scene_update_input: g, characters_needing_outfit: _, parse_scene_update: v, scene_update_json_schema: y }] = await Promise.all([this.#e.library.load(t.chat_id), import("./chunks/scene_update-BG8abQmG.js")]), b = _(i, c, m);
		return {
			input: g({
				earlier: l,
				user_message: o === void 0 ? null : Bi(o),
				reply: i,
				reply_shown_above: n,
				viewer: ui(e),
				since: p
			}, c, m),
			json_schema: y(b.map((e) => e.id)),
			apply: async (e) => {
				let n = h(v(e), c, m, this.#e.new_id);
				for (let e of n.new_outfits) await this.#e.library.create_outfit(e, t.chat_id);
				for (let e of n.new_characters) await this.#e.library.create_character({
					...e,
					appearance: await this.#a(e.appearance, e.name)
				}, t);
				for (let e of n.appearance_additions) {
					let t = m.characters.find((t) => t.id === e.character_id)?.name ?? "", n = await this.#a(e.slots, t);
					(Object.keys(n).length > 0 || e.subject !== null) && await this.#e.library.add_appearance({
						...e,
						slots: n
					});
				}
				return await this.#o(t, n.wearing), n.wearing;
			}
		};
	}
	async #a(e, t) {
		let { character: n, ...r } = e;
		if (n === void 0) return r;
		let i = await this.#e.character_tags(n, t);
		return i.length === 0 ? r : {
			character: i,
			...r
		};
	}
	async check_character(e) {
		return {
			...e,
			appearance: await this.#a(e.appearance, "")
		};
	}
	async set_wearing(e, t) {
		let n = await this.#e.host.get_active_chat(), r = this.read(e) ?? this.inherited(n, e.message_id);
		await this.#o(e, [...r.filter((e) => e.character_id !== t.character_id), t]);
	}
	#o(e, t) {
		return this.#e.host.write_swipe_wardrobe(e, v.parse({
			schema_version: 1,
			wearing: t
		}));
	}
}, Wi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
function Gi() {
	return [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))].map((e) => Wi[e % 64] ?? "_").join("");
}
async function Ki(e, t) {
	return qi(await e.load(), t);
}
function qi(e, t) {
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
async function Ji(e, t, n, r) {
	let [i, a] = await Promise.all([n === null ? null : e.load_draft(n), Ki(t, r)]);
	return {
		preset: i,
		library: a
	};
}
var Yi = class {
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
			await this.#t.sync_regex_scripts(ft), this.#n = null;
		} catch (e) {
			this.#n = e instanceof Error ? e.message : String(e);
		}
		this.#e.start();
	}
	stop() {
		return this.#e.stop(), Promise.resolve();
	}
}, Xi = /[぀-ヿ㐀-鿿豈-﫿]/u, Zi = /[,，、]/u;
function Qi(e) {
	return e.split(Zi).map((e) => e.trim()).filter((e) => e.length > 0);
}
function $i(e, t) {
	return e.trim().toLowerCase() === t.trim().toLowerCase();
}
function ea(e) {
	let t = e.trim().replace(/^-?[\d.]+::/u, "").replace(/::$/u, ""), n = /^\((.+):[\d.]+\)$/u.exec(t);
	for (n?.[1] !== void 0 && (t = n[1]); /^[{[].*[}\]]$/u.test(t);) t = t.slice(1, -1);
	return t.trim().toLowerCase();
}
function ta(e) {
	return e.trim().replace(/[.。]+$/u, "").toLowerCase();
}
async function na(e, t) {
	let n = Qi(e);
	return (await Promise.all(n.map(async (e) => {
		if (!Xi.test(e)) return e;
		let n = t.glossary.find((t) => $i(t.source, e));
		return n === void 0 ? await t.find_tag(e) ?? ta(await t.deepl(e, "EN-US")) : n.target;
	}))).join(", ");
}
async function ra(e, t) {
	let n = Qi(e);
	return (await Promise.all(n.map(async (e) => {
		if (Xi.test(e)) return e;
		let n = ea(e), r = t.glossary.find((e) => $i(e.target, n));
		return r === void 0 ? await t.find_translation(n) ?? (await t.deepl(n, "ZH")).trim() : r.source;
	}))).join("，");
}
//#endregion
//#region src/modules/translation/prompt_translator.ts
var ia = 10;
function aa(e) {
	let t = e.translation?.split("-")[0]?.trim() ?? "";
	return t === "" ? null : t;
}
function oa(e) {
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
				return t === void 0 ? null : aa(t);
			},
			deepl: i
		};
	}
	return {
		to_tags: (e) => na(e, a()),
		read_in_chinese: (e) => ra(e, a()),
		async suggest(t) {
			let n;
			try {
				n = await e.vocabulary.lookup(t.trim());
			} catch {
				return [];
			}
			return n === null ? null : n.results.slice(0, ia).map((e) => ({
				tag: e.display_text.replaceAll("_", " "),
				translation: aa(e),
				popularity: e.popularity
			}));
		},
		prepare: () => e.vocabulary.prepare()
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
]), la = /* @__PURE__ */ new Set(["gateway", "vocabulary_update_channel"]), ua = /* @__PURE__ */ new Set([...Object.keys(E.shape), ...la]), da = new Set(Object.keys(se.shape)), fa = {
	schema_version: 1,
	active_namespace: "primary",
	locale: "auto",
	credential_storage_mode: "browser_device",
	active_provider_profile_id: null,
	global_concurrency: 4,
	auto_generation_enabled: !0,
	vocabulary_remote: {
		catalog_url: "",
		token_saved: !1
	},
	illustration: {
		preset_source: "builtin",
		preset_name: "in_use",
		connection: { kind: "current" },
		max_chat_history: 4,
		max_images_per_message: 2,
		prompt_preset_id: null,
		world_info: { mode: "chat" },
		wardrobe_model: null,
		analysis_guidance: "",
		wardrobe_guidance: "",
		strip: oe,
		size_sets: [],
		size_set_id: null,
		size_set_by_chat: {},
		structured_output: "auto",
		analysis_reasoning: "preset"
	},
	world_info_overrides: {
		no_recursion_books: [],
		slim_books: [],
		slim_guidance: ""
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
function H(e, t, n, r, i) {
	let a = e.safeParse(t);
	return a.success ? a.data : (i.push({
		path: r,
		code: "invalid_value"
	}), n);
}
function va(e, t, n, r, i) {
	if (!pa(t)) return t !== void 0 && i.push({
		path: r,
		code: "invalid_value"
	}), structuredClone(n);
	_a(t, new Set(Object.keys(e)), r, i);
	let a = {};
	for (let o of Object.keys(e)) a[o] = H(e[o], t[o], structuredClone(n[o]), `${r}.${o}`, i);
	return a;
}
function ya(e, t) {
	let n = fa.ui;
	return pa(e) ? (_a(e, da, "ui", t), {
		color_mode: H(se.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: H(se.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: H(se.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: H(se.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function ba(e, t) {
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
	_a(e, ua, "", t);
	let r = fa;
	return {
		schema_version: H(E.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: H(E.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: H(E.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: H(ue, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: H(E.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: H(E.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: H(E.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		vocabulary_remote: va(D.shape, e.vocabulary_remote, r.vocabulary_remote, "vocabulary_remote", t),
		illustration: va(ce.shape, e.illustration, r.illustration, "illustration", t),
		translation: va(le.shape, e.translation, r.translation, "translation", t),
		world_info_overrides: va(de.shape, e.world_info_overrides, r.world_info_overrides, "world_info_overrides", t),
		ui: ya(e.ui, t)
	};
}
function xa(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = ba(t[sa], i);
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
			return u(E.parse(t));
		},
		replace_settings(e) {
			return u(E.parse(e));
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
}, Sa = "The host refused to reveal the stored credential. Switch credential storage to This device in Settings > General and enter the key again, or allow key exposure in the host (allowKeysExposure in SillyTavern's config.yaml).", Ca = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = xn(t);
	}
	async resolve_secret(e) {
		if (!m.safeParse(e).success) throw new U("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: Dn(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new U("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new U("not_exposed", Sa) : t.status === 404 ? new U("not_found", "The host vault holds no such credential") : new U("unavailable", `The host secret vault answered with status ${String(t.status)}`);
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
function wa(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Ta(e, t) {
	return !wa(e) || typeof t != "function" ? null : new Ca(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var Ea = class {
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
}, Da = class extends F {
	constructor(e, t) {
		super("configuration", e, t), this.name = "TransportConfigurationError";
	}
};
function Oa(e) {
	let t = ka(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) return {
		kind: "local_direct",
		endpoint: Aa(e.direct_provider_base_url)
	};
	throw new Da("No provider transport is available");
}
function ka(e) {
	if (e === null || Kt(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new Da("This provider needs a stored credential before it can be called directly; set one on the active profile");
	if (!e.secrets_readable) throw new Da("This host cannot reveal stored credentials, so a direct provider call is impossible; switch the credential storage to this device");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function Aa(e) {
	try {
		return T(e);
	} catch (e) {
		throw new Da("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capabilities/_records.ts
function W(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? {} : e;
}
function G(e) {
	return W(e.payload);
}
function K(e, t, n) {
	let r = e[t];
	return typeof r == "string" ? r : n;
}
function ja(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function Ma(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function Na(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function q(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => q(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = q(i, n));
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
	"prompt_tag",
	"creation",
	"opening"
];
function Ia(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit": return e.outfit_profiles;
		case "lora": return e.lora_profiles;
		case "prompt_tag": return e.prompt_tag_presets;
		case "creation": return e.creation_records;
		case "opening": return e.opening_records;
	}
}
function La(e, t) {
	let n = G(e);
	return {
		id: e.id,
		category: t,
		record_key: e.record_key,
		display_name: K(n, "display_name", e.id),
		updated_at: e.updated_at,
		payload: n
	};
}
function Ra(e, t) {
	let n = Ma(G(e), "order", 2 ** 53 - 1), r = Ma(G(t), "order", 2 ** 53 - 1);
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
			let i = Ia(e.repositories, n), a = e.namespace(), o = await i.get(a, r.id), s = e.now(), c = o === null ? Math.max(-1, ...(await i.list(a)).map((e) => Ma(G(e), "order", -1))) + 1 : Ma(G(o), "order", 2 ** 53 - 1), l = {
				schema_version: 1,
				id: r.id,
				namespace: a,
				record_key: `${a}:${r.id}`,
				created_at: o?.created_at ?? s,
				updated_at: s,
				payload: q({
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
					payload: q({
						...G(n),
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
function J(e) {
	return {
		status: "unavailable",
		reason: e
	};
}
function Y(e) {
	try {
		return Wa(e());
	} catch (e) {
		return J(Ga(e));
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
function X(e) {
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
	let n = w.parse(e.provider_id);
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
		if (n === null) throw X(`Gallery record ${t} no longer exists`);
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
		await nt(e.database, e.namespace(), n), t.emit({
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
			let r = await n(t), i = await $e(e.database, r.sha256);
			if (i === null) throw X(`Gallery record ${t} has no stored bytes; the blob was evicted`);
			return i;
		},
		async read_thumbnail(t) {
			let i = await n(t), a = await rt(e.database, i.sha256);
			if (a !== null && i.width !== void 0) return a.bytes;
			let o = await $e(e.database, i.sha256);
			if (o === null) throw X(`Gallery record ${t} has no stored bytes; the blob was evicted`);
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
function Za(e) {
	return e.image_count ?? 1;
}
function Qa(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: w.parse(e.provider_id),
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
		provider_id: w.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
var eo = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running"
]);
async function to(e, t, n) {
	for (let r of await e.list(t)) eo.has(r.state) && await e.put(t, {
		...r,
		state: "failed",
		error: {
			code: "interrupted",
			retryable: !1
		},
		updated_at: n
	});
}
function no(e) {
	let t = new Pa(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: Qa(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await Oi({
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
			return Qa(await Ai({
				queue: e.queue,
				plans: e.plans
			}, t));
		},
		retry(t) {
			let i = n.get(t);
			if (i === void 0) throw X(`Generation job ${t} was not submitted in this session, so its request cannot be replayed`);
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
var ro = "inkwell:page:";
async function io(e, t) {
	if (e === void 0) return {
		sole_page: !0,
		release: () => {}
	};
	let n = `${ro}${t}`, r = () => {};
	await new Promise((t) => {
		e.request(n, () => new Promise((e) => {
			r = e, t();
		}));
	});
	let { held: i = [] } = await e.query();
	return {
		sole_page: !i.some((e) => e.name !== n && e.name?.startsWith(ro) === !0),
		release: r
	};
}
//#endregion
//#region src/bootstrap/capabilities/novelai_capability.ts
var ao = 3e4, oo = 12e4, so = 3e4;
function co(e) {
	return {
		load: async () => (await e()).list_models(),
		get_account: async () => (await e()).get_account(AbortSignal.timeout(ao)),
		refresh_models: async () => (await e()).refresh_models(AbortSignal.timeout(oo)),
		estimate_cost: async (t) => (await e()).estimate_cost(t, AbortSignal.timeout(so))
	};
}
//#endregion
//#region src/bootstrap/capabilities/generation_context.ts
var lo = "inkwell:library";
function uo(e) {
	return tn.parse({
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
var fo = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		if (this.#e.get_active_chat_id() === null) return this.#n();
		let e = await this.#e.get_active_chat(), t = Vt(uo(e), this.#t), n = e.messages.at(-1);
		return {
			chat_id: e.chat_id,
			requested_swipe_id: n?.active_swipe_id ?? 0,
			generation_anchor: t.generation_anchor,
			source_anchor: t.source_anchor
		};
	}
	#n() {
		let e = Vt(tn.parse({
			schema_version: 1,
			chat_id: lo,
			active_swipes: [],
			messages: []
		}), this.#t);
		return {
			chat_id: lo,
			requested_swipe_id: 0,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor
		};
	}
}, po = class extends Error {
	constructor(e) {
		super(e), this.name = "WorkflowConversionError";
	}
}, mo = /* @__PURE__ */ new Set([
	"Note",
	"MarkdownNote",
	"Reroute",
	"PrimitiveNode"
]), ho = 2, go = 4, _o = /* @__PURE__ */ new Set([
	"INT",
	"FLOAT",
	"STRING",
	"BOOLEAN",
	"COMBO"
]);
function Z(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function vo(e) {
	let t = Z(e) ? e.input : null;
	return Z(t) ? [t.required, t.optional].flatMap((e) => Z(e) ? Object.entries(e).flatMap(([e, t]) => Array.isArray(t) ? [[e, t]] : []) : []) : [];
}
function yo(e) {
	let [t] = e;
	return Array.isArray(t) || typeof t == "string" && _o.has(t);
}
function bo(e, t) {
	let [n, r] = t, i = Z(r) && r.control_after_generate === !0 || n === "INT" && (e === "seed" || e === "noise_seed"), a = Z(r) && r.image_upload === !0;
	return +!!i + +!!a;
}
function xo(e, t) {
	if (!Z(e) || !Array.isArray(e.nodes) || !Array.isArray(e.links)) throw new po("The file is not a ComfyUI editor workflow");
	let n = Z(e.definitions) ? e.definitions : null;
	if (Array.isArray(n?.subgraphs) && n.subgraphs.length > 0) throw new po("The workflow contains subgraphs; save it with Export (API) in ComfyUI instead");
	let r = new Map(e.nodes.map((e) => [String(e.id), e])), i = new Map(e.links.map((e) => [e[0], e])), a = (e, t = 0) => {
		let n = e === null ? void 0 : i.get(e), o = n === void 0 ? void 0 : r.get(String(n[1]));
		if (n === void 0 || o === void 0 || t > 32) return { kind: "none" };
		if (o.type === "PrimitiveNode") {
			let e = o.widgets_values;
			return {
				kind: "value",
				value: Array.isArray(e) ? e[0] : void 0
			};
		}
		if (o.type === "Reroute") return a(o.inputs?.[0]?.link ?? null, t + 1);
		if (o.mode === ho) return { kind: "none" };
		if (o.mode === go) {
			let e = o.inputs?.find((e) => e.link !== null && e.type === n[5]);
			return a(e?.link ?? null, t + 1);
		}
		return {
			kind: "link",
			node_id: String(o.id),
			slot: n[2]
		};
	}, o = /* @__PURE__ */ new Set(), s = {};
	for (let [e, n] of r) {
		if (mo.has(n.type) || n.mode === ho || n.mode === go) continue;
		let r = t.get(n.type);
		if (r === void 0) {
			[...i.values()].some((t) => String(t[1]) === e) && o.add(n.type);
			continue;
		}
		let c = n.widgets_values ?? [], l = 0, u = {};
		for (let [e, t] of vo(r)) {
			let r = yo(t), i = n.inputs?.find((t) => t.name === e)?.link ?? null, o;
			if (Array.isArray(c) ? (o = r ? c[l] : void 0, r && (l += 1 + bo(e, t))) : o = c[e], i !== null) {
				let t = a(i);
				t.kind === "link" ? u[e] = [t.node_id, t.slot] : t.kind === "value" ? u[e] = t.value : r && o !== void 0 && (u[e] = o);
			} else r && o !== void 0 && (u[e] = o);
		}
		s[e] = {
			class_type: n.type,
			inputs: u,
			_meta: { title: n.title ?? n.type }
		};
	}
	if (o.size > 0) throw new po(`The server does not have these node types: ${[...o].join(", ")}`);
	if (Object.keys(s).length === 0) throw new po("The workflow has no nodes the server can run");
	return s;
}
function So(e) {
	return !Z(e) || !Array.isArray(e.nodes) ? [] : [...new Set(e.nodes.map((e) => e.type).filter((e) => typeof e == "string" && !mo.has(e)))];
}
function Co(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function wo(e) {
	return `/api/userdata/${encodeURIComponent(`workflows/${e}`)}`;
}
function To(e) {
	if (Co(e) && Array.isArray(e.nodes) && Array.isArray(e.links)) return "editor";
	try {
		return Ot(JSON.stringify(e)), "api";
	} catch (e) {
		if (e instanceof Et) return "unreadable";
		throw e;
	}
}
async function Eo(e) {
	let t = await e("/api/userdata?dir=workflows&recurse=true&split=false");
	if (!Array.isArray(t)) throw Error("ComfyUI returned an invalid workflow list");
	let n = t.filter((e) => typeof e == "string" && e.toLowerCase().endsWith(".json")).map((e) => e.replaceAll("\\", "/")).sort((e, t) => e.localeCompare(t)).slice(0, 200);
	return Promise.all(n.map(async (t) => {
		try {
			return {
				path: t,
				format: To(await e(wo(t)))
			};
		} catch {
			return {
				path: t,
				format: "unreadable"
			};
		}
	}));
}
async function Do(e, t) {
	let n = await e(wo(t));
	if (To(n) !== "editor") {
		let e = JSON.stringify(n, null, 2);
		return Ot(e), e;
	}
	let r = /* @__PURE__ */ new Map();
	for (let t of So(n)) {
		let n = await e(`/object_info/${encodeURIComponent(t)}`);
		Co(n) && n[t] !== void 0 && r.set(t, n[t]);
	}
	return JSON.stringify(xo(n, r), null, 2);
}
//#endregion
//#region src/transport/browser_fetch.ts
async function Oo(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new xt({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new F("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await ko(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function ko(e, t, n) {
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
			if (a += s.byteLength, a > t) throw new F("malformed_response", "Provider response exceeds the byte limit");
			i.push(s);
		}
	} catch (e) {
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof F ? e : new xt({ cause: e });
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
function Ao(e) {
	try {
		if (!Mo(e)) throw Q("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !No(a) || !No(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw Q("Provider operation is invalid");
		if (bt(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw Q("Provider operation is invalid");
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
		throw e instanceof F ? e : Q("Provider operation is invalid", e);
	}
}
function jo(e) {
	try {
		if (!Mo(e)) throw Q("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw Q("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(T);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw Q("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof F ? e : Q("Remote provider asset operation is invalid", e);
	}
}
function Mo(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function No(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function Q(e, t) {
	return new F("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/local_direct_transport.ts
var Po = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = T(e.base_url);
		} catch (e) {
			throw new F("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = Ao(e);
		return Oo(this.#t, `${this.#e}${t.route}`, {
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
		let t = jo(e);
		return Oo(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, Fo = "vault_key", Io = "novelai_defaults", Lo = "prompt_tags", Ro = "comfyui_defaults", zo = "provider_profile", Bo = 15e3, Vo = 5e6;
function Ho(e, t) {
	let n = new Po({
		base_url: e,
		...t === void 0 ? {} : { fetch: t }
	});
	return async (e) => {
		let t = await n.execute({
			route: e,
			method: "GET",
			accept: "application/json",
			max_response_bytes: Vo,
			signal: AbortSignal.timeout(Bo)
		});
		if (t.status !== 200) throw Error(`ComfyUI answered ${e} with status ${t.status.toString()}`);
		return JSON.parse(new TextDecoder().decode(t.body));
	};
}
var Uo = 2e7, Wo = "base_url";
function Go(e) {
	return e === "sd_webui" || e === "comfyui";
}
function Ko(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function qo(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: Uo,
		max_input_asset_bytes: Uo,
		...t?.provider_id === e.provider_id ? W(G(t)[zo]) : {},
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
function Jo(e) {
	return {
		...W(G(e)[zo]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function Yo(e) {
	let t = G(e), n = W(t[zo]);
	return {
		id: e.id,
		provider_id: w.parse(e.provider_id),
		display_name: K(t, "display_name", e.id),
		model_id: Ko(Na(n, "model_allowlist")),
		workflow_id: Ko(Na(n, "workflow_allowlist")),
		base_url: typeof t[Wo] == "string" ? t[Wo] : null,
		credential_reference: typeof t.vault_key == "string" ? t[Fo] : null,
		updated_at: e.updated_at,
		novelai_defaults: $o(e),
		prompt_tags: Qo(e),
		comfyui_defaults: e.provider_id === "comfyui" ? Xo(e) : null
	};
}
function Xo(e) {
	let t = Dt.safeParse(G(e)[Ro]);
	return t.success ? t.data : {};
}
function Zo(e) {
	return Ko(Na(W(G(e)[zo]), "workflow_allowlist"));
}
function Qo(e) {
	let t = en.safeParse(G(e)[Lo]);
	return t.success ? t.data : null;
}
function $o(e) {
	let t = te.safeParse(G(e)[Io]);
	return t.success ? t.data : null;
}
function es(e) {
	let t = new Pa();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw X(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			let t = await e.repository.list(e.namespace());
			return Promise.all(t.map(async (t) => {
				let n = Yo(t);
				return n.credential_reference === null ? n : await e.credential_present(n.credential_reference).catch(() => !1) === !1 ? {
					...n,
					credential_reference: null
				} : n;
			}));
		},
		subscribe: (e) => t.subscribe(e),
		async save(n) {
			let r = e.namespace(), i = await e.repository.get(r, n.id), a = e.now(), o = {
				...G(i ?? { payload: {} }),
				display_name: n.display_name,
				[zo]: q(qo(n, i))
			};
			i !== null && i.provider_id !== n.provider_id && Reflect.deleteProperty(o, Fo), n.provider_id === "comfyui" ? o[Ro] = Dt.parse(n.comfyui_defaults ?? {}) : Reflect.deleteProperty(o, Ro), Go(n.provider_id) && n.base_url !== null ? o[Wo] = T(n.base_url) : Reflect.deleteProperty(o, Wo);
			let s = {
				schema_version: 1,
				id: n.id,
				namespace: r,
				record_key: `${r}:${n.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: n.provider_id,
				payload: q(o)
			}, c = (await e.load_adapters())[n.provider_id];
			if (c === void 0) throw X(`Provider ${n.provider_id} is unavailable`);
			c.validate_profile(Jo(s)), await e.repository.put(r, s);
			let l = Yo(s);
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
			if (e.secrets === null) throw X("The selected credential storage backend is unavailable");
			let a = await n(r), o = C(a.namespace, r);
			await e.secrets.write_secret(o, i);
			let s = {
				...a,
				updated_at: e.now(),
				payload: q({
					...G(a),
					[Fo]: o
				})
			};
			await e.repository.put(a.namespace, s);
			let c = Yo(s);
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
				payload: q({
					...G(a),
					[Io]: te.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Yo(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async save_prompt_tags(r, i) {
			let a = await n(r), o = {
				...a,
				updated_at: e.now(),
				payload: q({
					...G(a),
					[Lo]: en.parse(i)
				})
			};
			await e.repository.put(a.namespace, o);
			let s = Yo(o);
			return t.emit({
				type: "profile_upserted",
				profile: s
			}), s;
		},
		async clear_credential(r) {
			let i = await n(r), a = { ...G(i) }, o = a[Fo];
			Reflect.deleteProperty(a, Fo), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: q(a)
			};
			await e.repository.put(i.namespace, s);
			let c = Yo(s);
			return t.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(t) {
			let r = Date.now(), i = await n(t), a = w.parse(i.provider_id), o = (await e.load_adapters())[a];
			if (o === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				o.validate_profile(Jo(i));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof vt ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let s = G(i)[Fo];
			if (typeof s == "string" && e.secrets !== null && !await e.secrets.probe_secret(s)) return {
				status: "failed",
				error: {
					code: "auth_failed",
					retryable: !1
				}
			};
			let c = G(i)[Wo];
			if (a === "comfyui" && typeof c == "string") try {
				await Ho(c, e.fetch)("/system_stats");
			} catch {
				return {
					status: "failed",
					error: {
						code: "provider_unavailable",
						retryable: !0
					}
				};
			}
			return {
				status: "success",
				latency_ms: Date.now() - r
			};
		},
		list_comfyui_workflows(t) {
			return Eo(Ho(t, e.fetch));
		},
		read_comfyui_workflow(t, n) {
			return Do(Ho(t, e.fetch), n);
		},
		async inspect_comfyui({ base_url: t, workflow_id: n }) {
			let r = n === null ? null : await e.load_workflow(n);
			return re(Ho(t, e.fetch), r === null ? null : wt(r));
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/prompt_presets_capability.ts
function ts(e) {
	let t = G(e);
	return {
		id: e.id,
		display_name: K(t, "display_name", e.id),
		group: ja(t, "group"),
		updated_at: e.updated_at
	};
}
function ns(e) {
	return e.flatMap((e) => {
		let t = W(e), n = ja(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: Na(t, "triggers").filter((e) => typeof e == "string"),
			replacement: K(t, "replacement", "")
		}];
	});
}
function rs(e) {
	return e.flatMap((e) => {
		let t = W(e), n = ja(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: K(t, "pattern", ""),
			flags: K(t, "flags", ""),
			replacement: K(t, "replacement", "")
		}];
	});
}
function is(e) {
	let t = new Pa();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(ts);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw X(`Prompt preset ${t} no longer exists`);
			let r = G(n);
			return {
				id: n.id,
				display_name: K(r, "display_name", n.id),
				group: ja(r, "group"),
				fixed_positive_prompt: K(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: K(r, "fixed_negative_prompt", ""),
				replacement_rules: ns(Na(r, "replacement_rules")),
				regex_rules: rs(Na(r, "regex_rules"))
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
				payload: q({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = ts(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(ut(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var $ = "The selected credential storage backend is unavailable", as = "SillyTavern's secret store is unreachable from this page", os = "deepl", ss = "Listing world info books needs JS-Slash-Runner";
function cs(e) {
	if (e === null) throw X("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function ls(e) {
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
	function a(t) {
		i({ vocabulary_remote: {
			...e.settings.get_settings().vocabulary_remote,
			token_saved: t
		} });
	}
	return {
		load: r,
		subscribe: (e) => t.subscribe(e),
		update: (e) => Promise.resolve(i(e)),
		async set_analysis_key(t) {
			if (t.trim().length === 0) throw TypeError("An API key must not be blank");
			if (e.secrets === null) throw X($);
			await e.secrets.write_secret(ae(e.settings.get_settings().active_namespace), t.trim());
		},
		list_worldbooks() {
			return e.list_worldbooks === null ? Promise.reject(X(ss)) : Promise.resolve(e.list_worldbooks());
		},
		async clear_analysis_key() {
			if (e.secrets?.delete_secret === void 0) throw X($);
			await e.secrets.delete_secret(ae(e.settings.get_settings().active_namespace));
		},
		async set_deepl_key(t) {
			if (e.host_secrets === null) throw X(as);
			await e.host_secrets.write_secret(os, t.trim());
		},
		async clear_deepl_key() {
			if (e.host_secrets?.delete_secret === void 0) throw X(as);
			await e.host_secrets.delete_secret(os);
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw X($);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw X($);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw X($);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw X($);
			return e.browser_secret_vault.reset();
		},
		async set_vocabulary_token(t) {
			if (t.trim().length === 0) throw TypeError("A Hugging Face token must not be blank");
			if (e.secrets === null) throw X($);
			await e.secrets.write_secret(ie, t.trim()), a(!0), await e.settings.flush();
		},
		async clear_vocabulary_token() {
			if (e.secrets?.delete_secret === void 0) throw X($);
			await e.secrets.delete_secret(ie), a(!1), await e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new kt("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-BmorKwfF.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-CNBi0J13.js");
			return t({
				database: cs(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-CNBi0J13.js");
			await n({
				database: cs(e.database),
				archive: t,
				namespace: e.settings.get_settings().active_namespace
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function us(e) {
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
function ds(e) {
	let t = null, n = null;
	function r() {
		return n ??= e.create_client();
	}
	function i() {
		let e = n;
		n = null, e?.then((e) => {
			e.dispose();
		});
	}
	return {
		async load() {
			return (await e.load_catalog()).list();
		},
		async installed() {
			return await (await r()).ready(), e.read_active_package();
		},
		async search(e, t) {
			return (await r()).search(e, t === void 0 ? {} : { category: t });
		},
		async lookup(e) {
			let t = await r();
			return t.is_ready || t.has_failed ? t.lookup(e) : null;
		},
		async prepare() {
			await (await r()).ready();
		},
		async next_page(e) {
			return (await r()).next_page(e);
		},
		async install(n, r) {
			let a = await e.load_catalog();
			t = a;
			try {
				await a.install(n, (e) => {
					let t = us(e);
					t !== null && r?.(t);
				});
			} finally {
				t = null;
			}
			i();
		},
		cancel_install: () => {
			t?.cancel();
		}
	};
}
//#endregion
//#region src/bootstrap/image_store_ports.ts
var fs = 384;
async function ps(e, t) {
	let n = await createImageBitmap(new Blob([new Uint8Array(e)], { type: t })), r = Math.min(1, fs / Math.max(n.width, n.height)), i = new OffscreenCanvas(Math.max(1, Math.round(n.width * r)), Math.max(1, Math.round(n.height * r))), a = i.getContext("2d");
	if (a === null) throw n.close(), Error("This browser cannot draw thumbnails");
	a.drawImage(n, 0, 0, i.width, i.height), n.close();
	let o = await i.convertToBlob({
		type: "image/webp",
		quality: .82
	});
	return new Uint8Array(await o.arrayBuffer());
}
async function ms(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-C82ktQKU.js"), o = {
		novelai: new r(),
		sd_webui: new a(),
		openai_image: new i(),
		google_image: new n()
	};
	if (e !== null) {
		let n = Ze(e);
		o.comfyui = new t({ workflow_store: { async load(e) {
			let t = await n.comfy_workflows.get("primary", e);
			return t === null ? void 0 : Tt(e, wt(G(t)));
		} } });
	}
	return o;
}
function hs(e, t) {
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
function gs(e) {
	return Ye.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function _s(e, t) {
	return {
		async put_image(n) {
			return { id: (await it(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: gs(n.metadata)
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
async function vs(e, t) {
	let n = await import("./chunks/prompt_tags-CAoIz8Hm.js").then((e) => e.r), r = n.effective_prompt_tags({
		provider_id: e.provider_id,
		model_id: e.model_id,
		prompt_tags: Qo(e.record)
	}), i = n.prompt_tag_presets(t);
	return (e) => n.inject_prompt_tags(e, r, i);
}
function ys(e, t) {
	if (t === void 0) return e;
	if (e.provider_id === "comfyui") {
		let n = e.placeholder_values;
		return "width" in n && "height" in n ? {
			...e,
			placeholder_values: {
				...n,
				width: t.width,
				height: t.height
			}
		} : e;
	}
	return "width" in e ? {
		...e,
		width: t.width,
		height: t.height
	} : e;
}
async function bs(e, t) {
	if (e.provider_id !== "comfyui") return;
	let n = Zo(e.record), r = t.find((e) => e.id === n);
	if (r === void 0) return;
	let { read_mapped_workflow: i } = await import("./chunks/workflow_mapping-BBTT75pE.js").then((e) => e._);
	return {
		workflow_id: r.id,
		mapped: i(r.payload),
		defaults: Xo(e.record)
	};
}
function xs(e, t) {
	if (e.provider_id !== "comfyui" || t?.mapped.mapping.inputs.negative_prompt !== void 0) return e;
	let n = { ...e };
	return Reflect.deleteProperty(n, "negative_prompt"), n;
}
function Ss(e) {
	return {
		async build_request({ positive_prompt: t, negative_prompt: n, character_prompts: r, size: i }) {
			let a = await e.require_active_profile(), [{ build_generation_request: o }, s, c] = await Promise.all([
				import("./chunks/build_generation_request-CmwHwEaC.js"),
				import("./chunks/character_assets-BY_CipWs.js"),
				e.assets.load()
			]), l = await vs(a, c.prompt_tag), u = qi(c, e.active_chat_id()), d = _t(r.map((e) => e.name), u), p = await bs(a, c.workflow), m = s.attach_character_loras(await o({
				provider_id: a.provider_id,
				positive_prompt: t,
				negative_prompt: n,
				image_count: 1,
				references: [],
				...a.model_id === null ? {} : { model_id: a.model_id },
				...p === void 0 ? {} : { comfyui: p }
			}, f.parse(crypto.randomUUID())), d, u.loras), h = e.novelai;
			if (m.provider_id !== "novelai" || m.action !== "generate" || h === null) return xs(l(ys(m, i)), p);
			let [{ apply_novelai_defaults: g }, { reference_image_bytes: _ }, v] = await Promise.all([
				import("./chunks/novelai_profile_defaults-CKb8rSMX.js"),
				import("./chunks/reference_image-B8V-aXPW.js").then((e) => e.r),
				h.load_runtime()
			]), y = $o(a.record), b = y === null ? m : await g(m, y, {
				store_input: (e) => v.store_input(e),
				async load_vibe(t) {
					let n = await h.repositories.novelai_vibes.get(e.namespace(), t), r = n === null ? {} : G(n);
					return typeof r.image == "string" ? {
						image_bytes: _(r.image),
						strength: Ma(r, "strength", .6),
						information_extracted: Ma(r, "information_extracted", 1)
					} : null;
				}
			});
			return l(ys(await s.attach_character_references(b, d, { store_reference: (e) => v.store_input(_(e)) }), i));
		},
		async build_edit_request(t) {
			let n = await e.read_active_profile();
			if (n?.provider_id !== "novelai" || e.novelai === null) throw Error("Quick edits need an active NovelAI provider profile");
			let [{ build_novelai_edit_request: r }, { compute_generation_anchor: i }, { DEFAULT_NOVELAI_MODEL_ID: a }, o] = await Promise.all([
				import("./chunks/slot_edits-DhrBVhDc.js"),
				import("./chunks/build_generation_request-CmwHwEaC.js"),
				import("./chunks/novelai_request_defaults-DmJSc0ed.js").then((e) => e.r),
				e.assets.load()
			]), s = await vs(n, o.prompt_tag), c = f.parse(crypto.randomUUID()), l = {
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
//#region src/transport/direct_cloud_transport.ts
var Cs = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = Ao(e), n = Ts(this.#e, t.route), r = await Es(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await ws(Oo(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(yt({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = jo(e);
		return Oo(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
};
async function ws(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof xt ? new xt() : e;
	}
}
function Ts(e, t) {
	try {
		return qt(e, t);
	} catch (e) {
		throw e instanceof Gt ? new F("configuration", e.message) : e;
	}
}
async function Es(e, t, n, r) {
	let i = {
		...r,
		...e.required_headers
	};
	if (e.auth.kind === "none") return i;
	if (t === null) throw new F("configuration", "This provider requires a stored credential; the active profile names no vault reference");
	let a;
	try {
		a = await n.resolve_secret(t);
	} catch (e) {
		throw new F("configuration", Ds(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function Ds(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/bootstrap/provider_transports.ts
function Os(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = Kt(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new Cs({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new Po({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
	}
}
function ks(e, t) {
	let n = w.safeParse(e.provider_id).data;
	if (n === void 0) return null;
	let r = G(e);
	return {
		record: e,
		provider_id: n,
		model_id: Na(W(r.provider_profile), "model_allowlist").find((e) => typeof e == "string") ?? null,
		base_url: ja(r, "base_url"),
		direct_cloud: {
			provider_id: n,
			credential_reference: ja(r, Fo),
			secrets_readable: t
		}
	};
}
function As(e) {
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
function js(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new At("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new At("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new At("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return Os({
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
var Ms = "tavern-canvas/illustration-slots", Ns = class {
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
function Ps(e) {
	let t = e?.__TAURITAVERN__?.api?.chatSurface;
	if (typeof t != "object" || !t) return null;
	let n = t;
	return typeof n.isManagedOwnershipRequired == "function" && typeof n.registerParticipant == "function" ? n : null;
}
function Fs(e, t) {
	let n = Ps(e);
	return n === null || !n.isManagedOwnershipRequired() ? !1 : (n.registerParticipant({
		id: Ms,
		protocolVersion: 1,
		didCommitContent: ({ mesid: e, element: n, content: r }) => t.commit({
			mesid: e,
			element: n,
			content: r
		})
	}), t.activate(), !0);
}
var Is = new Ns();
//#endregion
//#region src/host/world_info_timers.ts
function Ls(e) {
	let t = e(), n = t.chatMetadata, r = t.getCurrentChatId(), i = t.chat.length, a = n?.timedWorldInfo === void 0 ? void 0 : structuredClone(n.timedWorldInfo);
	return { restore() {
		let t = e();
		n !== void 0 && t.chatMetadata === n && t.getCurrentChatId() === r && t.chat.length === i && (a === void 0 ? delete n.timedWorldInfo : n.timedWorldInfo = a);
	} };
}
//#endregion
//#region src/host/composite_host.ts
var Rs = class {
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
	chat_completion_target() {
		return this.#t.chat_completion_target();
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
	read_story_status(e) {
		return this.#t.read_story_status(e);
	}
	write_swipe_wardrobe(e, t) {
		return this.#t.write_swipe_wardrobe(e, t);
	}
	replace_message_text(e, t, n) {
		return this.#e.replace_message_text(e, t, n);
	}
	async generate_with_preset(e) {
		let t = {
			native: e.tools !== void 0,
			reasoning_effort: e.reasoning === "min" ? "min" : null
		};
		if (!t.native && t.reasoning_effort === null) return this.#e.generate_with_preset(e);
		let n = this.#t.adjust_request(e.generation_id, t);
		try {
			return await this.#e.generate_with_preset(e);
		} finally {
			n();
		}
	}
	list_worldbooks() {
		return this.#e.list_worldbooks();
	}
	prevent_world_info_recursion(e) {
		return this.#t.prevent_world_info_recursion(e);
	}
	inject_world_info_slims(e) {
		return this.#t.inject_world_info_slims(e);
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
function zs(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Bs(e, t, n) {
	let r = zs(e, "TavernHelper"), i = zs(e, "SillyTavern"), a = zs(e, "fetch"), o = Fn(r), s = Tn(i);
	if (!o.message_swipe_metadata || !o.preset_generation || !o.tavern_regex || !s.main_generation_events || !s.message_swipe_metadata || typeof a != "function") return null;
	let c = () => i.getContext(), l = new kn(c, a);
	return new Rs(t, new Jn(r, () => {
		let e = l.get_active_chat_id();
		if (e === null) throw Error("no_chat_open");
		return e;
	}, () => Ls(c)), l, n);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function Vs(e) {
	return typeof e == "object" && !!e;
}
function Hs(e, t) {
	if (!Vs(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var Us = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = xn(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: Dn(this.#e.getRequestHeaders()),
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
			headers: Dn(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: Dn(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return Hs(n, e);
	}
};
function Ws(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Gs(e, t) {
	return !Ws(e) || typeof t != "function" ? null : new Us(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
function Ks(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function qs(e) {
	let t = Ks(e, "SillyTavern"), n = Ks(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Js(e) {
	let t = qs(e), n = Ks(t, "extensionSettings"), r = Ks(t, "saveSettingsDebounced");
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
function Ys(e) {
	return Gs(qs(e), Ks(e, "fetch"));
}
function Xs(e) {
	return Ta(qs(e), Ks(e, "fetch"));
}
function Zs(e, t) {
	return Bs(e, t, Is.active ? Is : null);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var Qs = "IndexedDB could not be opened, so nothing that persists records can be composed", $s = "No usable SillyTavern + TavernHelper host pair was detected", ec = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", tc = 12e4, nc = { novelai: 1500 }, rc = "This host cannot reveal stored credentials, so the analysis API key cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml or switch credential storage to the encrypted browser vault";
function ic() {
	return navigator.storage.estimate();
}
function ac() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"" + new URL("workers/vocabulary_worker.js", import.meta.url).href,
		"" + import.meta.url
	), { type: "module" });
}
async function oc(e) {
	let t = e.globals ?? globalThis, n = e.extension_version ?? "development", r = fr(), i = [], a = [];
	function o(e, t, n) {
		if (i.push(Ka(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(X(r))
		};
	}
	let s = e.probe.ready ? e.probe.matrix : {}, c = Zs(t, s), l = [], u = null;
	try {
		u = await (e.open_storage ?? Xe)();
	} catch {
		u = null;
	}
	let d = Js(t), p = d === null ? null : xa(d), m = () => p?.get_settings().active_namespace ?? "primary", h = () => (/* @__PURE__ */ new Date()).toISOString(), g = Ys(t), _ = Xs(t), v;
	try {
		v = (e.create_browser_secret_vault ?? Ct)(t);
	} catch {
		v = null;
	}
	v !== null && a.push(() => v.close());
	let y = St(t);
	y !== null && a.push(() => y.close());
	let b = new Ea({
		mode: () => p?.get_settings().credential_storage_mode ?? "host",
		host_destination: g,
		host_resolver: _,
		browser_vault: v,
		device_vault: y
	}), x = b.has_destination ? b : null, S = b.has_resolver ? b : null, C = u === null ? null : Ze(u), w = await io(t.navigator?.locks, crypto.randomUUID());
	a.push(() => {
		w.release();
	}), C !== null && w.sole_page && await to(C.generation_jobs, m(), h());
	let ee = new Va(), te = null, ne = () => te ??= ms(u), re = null, T = async () => {
		if (C === null || p === null) return null;
		let e = p.get_settings().active_provider_profile_id, t = e === null ? null : await C.provider_profiles.get(m(), e).catch(() => null), n = t === null ? null : ks(t, S !== null);
		return re = n?.provider_id ?? null, n;
	};
	await T();
	let E = async () => {
		let e = await T();
		if (e === null) throw Error("No provider profile is active; choose one in Settings");
		return e;
	}, ie = null, D = C === null || u === null ? null : () => ie ??= import("./chunks/novelai_runtime-CRliMFX0.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: C.novelai_vibe_encodings,
		provider_inputs: C.provider_input_assets,
		namespace: m,
		gallery_assets: hs(u, m),
		transport: () => As(async () => js((await T())?.direct_cloud ?? null, S, e.provider_fetch)),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), oe = D === null || u === null ? null : { async read(e, t) {
		try {
			return await hs(u, m).read(e, t);
		} catch {
			return (await D()).assets.read(e, t);
		}
	} }, se = D === null ? null : async (e) => e.provider_id === "novelai" ? (await D()).prepare(e, AbortSignal.timeout(tc)) : e, ce = o("novelai", D === null ? J(Qs) : Y(() => co(async () => (await D()).service)), r.novelai), le = o("settings", p === null ? J(ec) : Y(() => ls({
		settings: p,
		database: u,
		extension_version: n,
		secrets: x,
		browser_secret_vault: v,
		host_secrets: g,
		list_worldbooks: c === null ? null : () => c.list_worldbooks()
	})), r.settings), ue = o("profiles", C === null ? J(Qs) : Y(() => es({
		repository: C.provider_profiles,
		namespace: m,
		load_adapters: ne,
		secrets: x,
		credential_present: async (e) => x === null || (p?.get_settings().credential_storage_mode ?? "host") === "host" ? null : x.probe_secret(e),
		async load_workflow(e) {
			let t = await C.comfy_workflows.get(m(), e);
			return t === null ? null : G(t);
		},
		...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch },
		now: h
	})), r.profiles), de = o("prompt_presets", C === null ? J(Qs) : Y(() => is({
		repository: C.prompt_presets,
		namespace: m,
		now: h,
		new_id: () => crypto.randomUUID()
	})), r.prompt_presets), O = o("assets", C === null ? J(Qs) : Y(() => za({
		repositories: C,
		namespace: m,
		now: h
	})), r.assets), fe = o("gallery", u === null ? J(Qs) : Y(() => Xa({
		database: u,
		repository: new at(u),
		namespace: m,
		now: h,
		make_thumbnail: ps,
		reveal_message: c === null ? null : (e, t) => {
			if (c.get_active_chat_id() !== e) return "other_chat";
			let n = c.find_message_element(t)?.closest(".mes");
			return n == null ? "not_found" : (n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), "revealed");
		}
	})), r.gallery), k = null, pe = o("generation", u === null ? J(Qs) : c === null ? J($s) : Y(() => {
		let t = (e) => Oa({
			direct_provider_base_url: e?.base_url ?? null,
			direct_cloud: e?.direct_cloud ?? null
		}), n = new Ci(), r = new pn({
			executor: new Di({
				store: _s(u, m),
				ids: { next: () => crypto.randomUUID() },
				clock: { now: h },
				resolve_source_message: (e) => {
					let t = k?.source_of(e.request_id) ?? null;
					return t === null ? null : {
						chat_id: t.chat_id,
						message_id: String(t.message_id),
						swipe_id: t.swipe_id
					};
				},
				load_adapters: ne,
				profiles: { resolve: async (e) => {
					let t = (await ne())[e], n = await T();
					if (t === void 0 || n?.provider_id !== e) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(Jo(n.record));
				} },
				transport: As(async () => Os(t(await T()), {
					secrets: S,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				})),
				assets: oe ?? hs(u, m),
				...D === null ? {} : { postprocess: async (e, t) => e.provider_id === "novelai" && e.action === "infill" ? (await D()).finish(e, t, AbortSignal.timeout(tc)) : t },
				log: { write: () => {} },
				plans: n
			}),
			persistence: new Si(u, m()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new nn(),
			global_concurrency: p?.get_settings().global_concurrency ?? 1,
			provider_start_interval_ms: nc
		});
		a.push(ee.observe_jobs(r));
		let i = no({
			queue: r,
			plans: n,
			jobs: Ze(u).generation_jobs,
			namespace: m,
			origin: new fo(c, new zt(globalThis.crypto)),
			new_request_id: () => f.parse(crypto.randomUUID()),
			...se === null ? {} : { prepare_request: se }
		});
		if (p !== null) {
			let e = () => S === null ? Promise.reject(/* @__PURE__ */ Error(rc)) : S.resolve_secret(ae(p.get_settings().active_namespace)), n = (e, t, n) => {
				ee.append({
					event_code: `analysis.${e}.${t}`,
					module_id: "analysis",
					generation_anchor: null,
					request_id: n,
					job_id: null,
					provider_id: null,
					error_code: null
				});
			};
			k = new Li({
				host: c,
				on_attempt: n,
				settings: () => p.get_settings().illustration,
				auto_generation_enabled: () => p.get_settings().auto_generation_enabled,
				prompt_context: (e) => Ji(de, O, p.get_settings().illustration.prompt_preset_id, e),
				wardrobe: new Ui({
					host: c,
					library: Ri(O),
					run: bi({
						host: c,
						settings: () => p.get_settings().illustration,
						resolve_analysis_key: e,
						new_generation_id: () => crypto.randomUUID(),
						on_attempt: n
					}),
					new_id: () => crypto.randomUUID(),
					async character_tags(e, t) {
						let { resolve_character_tags: n } = await import("./chunks/character_tags-Czk8pQ_n.js");
						return n(e, t, async (e) => {
							try {
								return (await he.lookup(e))?.results ?? null;
							} catch {
								return null;
							}
						});
					}
				}),
				...Ss({
					assets: O,
					active_chat_id: () => c.get_active_chat_id(),
					read_active_profile: T,
					require_active_profile: E,
					novelai: D === null || C === null ? null : {
						load_runtime: D,
						repositories: C
					},
					namespace: m
				}),
				edits_available: () => re === "novelai",
				resolve_analysis_key: e,
				async submit(e) {
					let n = await E();
					return t(n), (await i.submit({
						profile_id: n.record.id,
						request: e
					})).request_id;
				},
				jobs: r,
				new_slot_id: Gi,
				new_generation_id: () => crypto.randomUUID(),
				wait: (e) => new Promise((t) => setTimeout(t, e))
			}), l.push(new Yi(k, c)), l.push(new Zr(c, () => p.get_settings().world_info_overrides, Ie(globalThis.localStorage)));
		}
		return i;
	}), r.generation), me = e.create_vocabulary_worker === void 0 ? ac() : e.create_vocabulary_worker, he = o("vocabulary", u === null ? J(Qs) : me === null ? J("This host has no Worker constructor, so vocabulary search cannot run") : Y(() => ds({
		async load_catalog() {
			let { open_vocabulary_catalog: e } = await import("./chunks/vocabulary_catalog_client-BZ1cwDFj.js");
			return e({
				current_extension_version: n,
				remote: p?.get_settings().vocabulary_remote ?? {
					catalog_url: "",
					token_saved: !1
				},
				secrets: S,
				open_database_impl: () => Promise.resolve(u)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-CAuTgQKw.js");
			return new e({ create_worker: me });
		},
		async read_active_package() {
			let { VocabularyPackageStore: e } = await import("./chunks/src-Ca2VX4ee.js").then((e) => e.t), t = await new e(u, "vocabulary").find_active_or_confirmed();
			return t === null ? null : {
				package_id: t.manifest.package_id,
				data_version: t.manifest.data_version,
				record_count: t.manifest.record_count
			};
		}
	})), r.vocabulary);
	return {
		capabilities: {
			generation: pe,
			profiles: ue,
			prompt_presets: de,
			assets: O,
			gallery: fe,
			vocabulary: he,
			diagnostics: o("diagnostics", Y(() => Ua({
				capability_matrix: s,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: ee,
				resolutions: () => i,
				settings: () => p?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? ic,
				extension_version: n
			})), r.diagnostics),
			settings: le,
			novelai: ce
		},
		resolutions: i,
		host: c,
		illustrations: k,
		translator: c === null || p === null ? null : oa({
			host: c,
			settings: () => p.get_settings().translation,
			vocabulary: he
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
var sc = "https://github.com/N0VI028/JS-Slash-Runner";
function cc(e) {
	if (e.ready) return {
		state: "ready",
		title: "Inkwell ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${Yn} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: sc
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `Inkwell could not verify the installed version. ${t}`,
			update_url: sc
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: sc
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: sc
		};
	}
}
function lc(e) {
	return {
		state: "failed",
		title: "Inkwell could not start",
		message: "Runtime initialization failed.",
		detail: e instanceof Error ? `${e.name}: ${e.message}` : String(e)
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function uc(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = or(n), i, a, o = null, s = null;
	try {
		o = await oc({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch (e) {
		console.error("[Inkwell] Startup failed while composing capabilities", e), s = e ?? /* @__PURE__ */ Error("Composition failed");
	}
	let c = r.ready ? new Nt([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = cc(r);
	else if (s !== null) i = "failed", a = lc(s);
	else try {
		await c?.start_all(), i = "ready", a = cc(r);
	} catch (e) {
		console.error("[Inkwell] Startup failed while starting runtime modules", e), i = "failed", a = lc(e);
	}
	let l = Xr(t, e.stylesheet ?? ""), u = Re(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null), f = () => {
		try {
			return o?.host?.get_locale() ?? navigator.language;
		} catch {
			return navigator.language;
		}
	};
	u.apply_locale(d ?? "auto", f());
	let p = o?.capabilities.settings.subscribe((e) => {
		u.apply_locale(e.settings.locale, f());
	}), m = Ce(Kr, {
		status: a,
		probe: r,
		version: e.version ?? "development",
		portalTarget: l.portal_element,
		hostElement: l.host_element,
		capabilities: o?.capabilities,
		host: o?.host ? ye(o.host) : null,
		illustrations: o?.illustrations ? ye(o.illustrations) : null,
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
function dc(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function fc(e) {
	let t = dc(e, "SillyTavern"), n = dc(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = dc(r, "eventSource"), a = dc(dc(r, "eventTypes"), "APP_READY"), o = dc(i, "on"), s = dc(i, "removeListener");
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
var pc = ":host{--tc-space-0-5:2px;--tc-space-1:4px;--tc-space-1-5:6px;--tc-space-2:8px;--tc-space-3:12px;--tc-space-4:16px;--tc-space-5:20px;--tc-space-6:24px;--tc-space-8:32px;--tc-space-10:40px;--tc-font-family:\"Geist\", system-ui, \"Noto Sans CJK SC\", \"Microsoft YaHei\", sans-serif;--tc-font-mono:\"Geist Mono\", ui-monospace, \"Cascadia Mono\", Consolas, monospace;--tc-font-size-xs:12px;--tc-font-size-sm:13px;--tc-font-size-md:14px;--tc-font-size-lg:17px;--tc-font-size-xl:26px;--tc-line-height-xs:16px;--tc-line-height-sm:20px;--tc-line-height-md:22px;--tc-line-height-lg:24px;--tc-line-height-xl:32px;--tc-font-weight-regular:400;--tc-font-weight-medium:500;--tc-font-weight-semibold:650;--tc-label-font-size:13px;--tc-control-height-sm:28px;--tc-control-height-md:36px;--tc-control-height-lg:44px;--tc-control-padding-x-sm:12px;--tc-control-padding-x-md:16px;--tc-control-padding-x-lg:20px;--tc-control-gap:6px;--tc-control-font-size:14px;--tc-field-padding-x:16px;--tc-icon-size:16px;--tc-icon-size-sm:15px;--tc-chip-height:26px;--tc-chip-height-sm:22px;--tc-chip-padding-x:10px;--tc-check-size:18px;--tc-switch-width:44px;--tc-switch-height:26px;--tc-radius-window:20px;--tc-radius-window-narrow:0;--tc-radius-panel:16px;--tc-radius-card:16px;--tc-radius-control:999px;--tc-radius-field:999px;--tc-radius-textarea:16px;--tc-radius-taginput:18px;--tc-radius-chip:999px;--tc-radius-check:6px;--tc-radius-image:6px;--tc-radius-status:999px;--tc-radius-popover:16px;--tc-radius-option:999px;--tc-radius-bar:999px;--tc-field-gap:8px;--tc-form-row-gap:24px;--tc-group-gap:40px;--tc-panel-padding:28px;--tc-nav-width:200px;--tc-form-max-width:600px;--tc-inspector-width:360px;--tc-card-min:250px;--tc-tile-min:168px;--tc-tile-gap:10px;--tc-topbar-height:60px;--tc-bottomnav-height:60px;--tc-canvas:#f4f4f2;--tc-surface:#fff;--tc-surface-raised:#ededea;--tc-surface-sunken:#e6e6e2;--tc-field-bg:#fff;--tc-text:#17171a;--tc-text-muted:#5a5a61;--tc-text-placeholder:#7a7a81;--tc-divider:#e0e0db;--tc-border-field:#8d8d94;--tc-accent:#17171a;--tc-accent-hover:#35353b;--tc-on-accent:#fafaf7;--tc-accent-soft:#fbefb4;--tc-accent-text:#17171a;--tc-accent-border:#e2c53a;--tc-focus:#17171a;--tc-marker:#f6d743;--tc-on-marker:#17171a;--tc-success:#1d7a4a;--tc-warning:#8a5a00;--tc-error:#c0362c;--tc-success-on-inverse:#6fe0a6;--tc-error-soft:#fbe9e6;--tc-switch-off:#a5a5ab;--tc-switch-thumb:#fff;--tc-chip-bg:#ededea;--tc-selection:#fae58a;--tc-para-hover:#f7f3dc;--tc-shadow:#17171a1f;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);font-family:var(--tc-font-family);font-size:var(--tc-font-size-md);line-height:var(--tc-line-height-md)}:host([data-color-mode=dark]){--tc-canvas:#131315;--tc-surface:#1b1b1e;--tc-surface-raised:#252528;--tc-surface-sunken:#0d0d0f;--tc-field-bg:#161618;--tc-text:#f1f1ed;--tc-text-muted:#a4a4ab;--tc-text-placeholder:#85858c;--tc-divider:#2e2e33;--tc-border-field:#66666e;--tc-accent:#f1f1ed;--tc-accent-hover:#fafaf7;--tc-on-accent:#131315;--tc-accent-soft:#3a3214;--tc-accent-text:#f6e08a;--tc-accent-border:#8a7424;--tc-focus:#f1f1ed;--tc-marker:#e8c93f;--tc-on-marker:#131315;--tc-success:#5fd39a;--tc-warning:#ecbd55;--tc-error:#ff8a7f;--tc-success-on-inverse:#1d7a4a;--tc-error-soft:#3b1b19;--tc-switch-off:#55555c;--tc-switch-thumb:#131315;--tc-chip-bg:#29292d;--tc-selection:#5a4b16;--tc-para-hover:#23211a;--tc-shadow:#00000080}@media (pointer:coarse){:host{--tc-control-height-sm:36px;--tc-control-height-md:44px;--tc-control-height-lg:48px;--tc-control-font-size:15px;--tc-chip-height:30px;--tc-check-size:20px}}", mc = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", hc = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-field{width:100%;min-width:0;height:var(--tc-control-height-md);padding:0 var(--tc-field-padding-x);border:1px solid var(--tc-border-field);border-radius:var(--tc-radius-field);background-color:var(--tc-field-bg);color:var(--tc-text);font-family:inherit;font-size:var(--tc-control-font-size);line-height:var(--tc-line-height-md);transition:background-color var(--tc-motion-fast) ease}.tc-field-multiline{height:auto;min-height:calc(var(--tc-line-height-md) * 2 + var(--tc-control-height-md));padding-block:calc((var(--tc-control-height-md) - var(--tc-line-height-md)) / 2 - 1px);border-radius:var(--tc-radius-textarea);resize:vertical;display:block}.tc-field::placeholder{color:var(--tc-text-placeholder)}.tc-field:focus,.tc-field:focus-visible{outline:2px solid var(--tc-focus);outline-offset:-1px;border-color:#0000}.tc-field[aria-invalid=true]{border-color:var(--tc-error)}.tc-field:disabled{opacity:.5;cursor:not-allowed}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", gc = "._floatingEntry_1bpar_9{background-color:var(--tc-surface);width:56px;height:56px;box-shadow:0 0 0 1px var(--tc-divider), 0 8px 24px var(--tc-shadow);color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1bpar_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1bpar_34{cursor:grabbing}._floatingEntryMedia_1bpar_38{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", _c = "._window_1jfap_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border-radius:var(--tc-radius-window);box-shadow:0 0 0 1px var(--tc-divider), 0 18px 50px var(--tc-shadow);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1jfap_1;position:fixed;top:0;left:0;overflow:hidden}._window_1jfap_1[data-positioned=false]{visibility:hidden}._window_1jfap_1[data-dragging=true]{box-shadow:0 0 0 1px var(--tc-divider), 0 24px 64px var(--tc-shadow);-webkit-user-select:none;user-select:none}@keyframes _floating-window-enter_1jfap_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1jfap_1{border-radius:var(--tc-radius-window-narrow);width:auto;height:auto;min-height:0;inset:0;transform:none}._window_1jfap_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1jfap_1{animation:none}}", vc = "._shell_spgmj_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_spgmj_8[data-viewport=desktop]{grid-template-columns:minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:var(--tc-topbar-height) minmax(0, 1fr);grid-template-areas:\"topbar topbar\"\"workspace inspector\"}._shell_spgmj_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:minmax(0,1fr) 0}._shell_spgmj_8[data-viewport=mobile]{grid-template-columns:minmax(0,1fr);grid-template-rows:var(--tc-topbar-height) minmax(0, 1fr) var(--tc-bottomnav-height);grid-template-areas:\"topbar\"\"workspace\"\"bottomnav\";height:100dvh}._top_bar_spgmj_51{align-items:center;gap:var(--tc-space-3);min-width:0;padding-inline:var(--tc-space-5) var(--tc-space-3);background-color:var(--tc-canvas);cursor:move;touch-action:none;grid-area:topbar;display:flex}._top_bar_end_spgmj_63{align-items:center;gap:var(--tc-space-1);min-width:0;margin-left:auto;display:flex}._top_tabs_spgmj_71{gap:var(--tc-space-1);margin-left:var(--tc-space-3);display:flex}._top_tab_spgmj_71{align-items:center;gap:var(--tc-control-gap);height:var(--tc-control-height-md);padding-inline:var(--tc-control-padding-x-md);border-radius:var(--tc-radius-control);color:var(--tc-text-muted);font-size:var(--tc-control-font-size);font-weight:var(--tc-font-weight-medium);display:inline-flex}._top_tab_spgmj_71:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._top_tab_spgmj_71[aria-current=page],._top_tab_spgmj_71[aria-current=page]:hover{color:var(--tc-on-marker);background-color:var(--tc-marker)}._task_pill_spgmj_100{align-items:center;gap:var(--tc-space-1);height:var(--tc-control-height-sm);padding-inline:var(--tc-space-2);border-radius:var(--tc-radius-control);color:var(--tc-text-muted);background-color:var(--tc-surface-raised);font-size:var(--tc-font-size-sm);display:inline-flex}._task_pill_spgmj_100:hover{color:var(--tc-text)}._task_pill_spin_spgmj_116{animation:_tc-icon-rotate_spgmj_1 var(--tc-motion-normal) linear infinite}._shell_spgmj_8[data-viewport=mobile] ._task_pill_label_spgmj_120{display:none}._task_popover_spgmj_124{z-index:var(--tc-z-overlay);width:min(360px, calc(100vw - var(--tc-space-8)));overscroll-behavior:contain;background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-popover);max-height:60dvh;box-shadow:0 12px 32px var(--tc-shadow);overflow:auto}._top_bar_brand_spgmj_136{align-items:center;gap:var(--tc-space-2);color:var(--tc-text);font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold);flex:none;display:inline-flex}._top_bar_brand_mark_spgmj_146{width:var(--tc-control-height-sm);height:var(--tc-control-height-sm);border-radius:var(--tc-radius-control);background-color:var(--tc-marker);color:var(--tc-on-marker);place-items:center;display:inline-grid}._icon_button_spgmj_156{width:var(--tc-control-height-md);height:var(--tc-control-height-md);color:var(--tc-text-muted);border-radius:var(--tc-radius-control);flex:none;justify-content:center;align-items:center;display:flex}._icon_button_spgmj_156:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._shell_spgmj_8[data-viewport=mobile] ._top_bar_spgmj_51{cursor:default;touch-action:auto;padding-inline:var(--tc-space-4) var(--tc-space-2)}._icon_button_spgmj_156._close_button_spgmj_178:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_spgmj_156[data-selected=true],._icon_button_spgmj_156[aria-pressed=true]{color:var(--tc-text)}._tooltip_content_spgmj_188{padding:var(--tc-space-1) var(--tc-space-3);font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);color:var(--tc-canvas);background-color:var(--tc-text);border-radius:var(--tc-radius-popover)}._workspace_spgmj_197{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_spgmj_207{min-height:240px;padding:var(--tc-panel-padding);flex-direction:column;justify-content:center;align-items:flex-start;display:flex}._inspector_spgmj_217{min-width:0;margin:0 var(--tc-space-4) var(--tc-space-4) 0;background-color:var(--tc-surface);border-radius:var(--tc-radius-panel);box-shadow:0 0 0 1px var(--tc-divider);grid-area:inspector;display:flex;overflow:hidden}._inspector_resizer_spgmj_228{width:var(--tc-space-1);cursor:col-resize;touch-action:none;background-color:#0000;flex:none}._inspector_resizer_spgmj_228:hover,._inspector_resizer_spgmj_228[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_spgmj_241{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_spgmj_249{justify-content:space-between;align-items:center;gap:var(--tc-space-2);min-height:var(--tc-topbar-height);padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-2) var(--tc-space-4);color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg);flex:none;display:flex}._inspector_body_spgmj_263{min-height:0;padding:0 var(--tc-space-4) var(--tc-space-4);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm);flex:auto;overflow:auto}._inspector_selection_kind_spgmj_273{margin:0 0 var(--tc-space-2);color:var(--tc-text);font-size:var(--tc-font-size-md);font-weight:var(--tc-font-weight-semibold)}._inspector_selection_spgmj_273{gap:var(--tc-space-2);flex-direction:column;margin:0;display:flex}._inspector_selection_spgmj_273 dt{color:var(--tc-text-muted);font-size:var(--tc-font-size-xs)}._inspector_selection_spgmj_273 dd{color:var(--tc-text);font-size:var(--tc-font-size-sm);overflow-wrap:anywhere;margin:0}._bottom_nav_spgmj_299{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_spgmj_308{justify-content:center;align-items:center;gap:var(--tc-space-0-5);min-width:0;padding-block:var(--tc-space-1);color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;display:flex}._bottom_nav_item_spgmj_308>svg{box-sizing:content-box;padding:var(--tc-space-0-5) var(--tc-space-3);border-radius:var(--tc-radius-control)}._bottom_nav_item_spgmj_308[data-selected=true]{color:var(--tc-text);font-weight:var(--tc-font-weight-medium)}._bottom_nav_item_spgmj_308[data-selected=true]>svg{color:var(--tc-on-marker);background-color:var(--tc-marker)}._bottom_nav_item_label_spgmj_336{max-width:100%;font-size:var(--tc-font-size-xs);line-height:var(--tc-line-height-xs);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._sheet_overlay_spgmj_345{background-color:var(--tc-media-scrim);position:fixed;inset:0}._sheet_content_spgmj_351{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-radius:var(--tc-radius-panel) var(--tc-radius-panel) 0 0;box-shadow:0 -8px 24px var(--tc-shadow);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_spgmj_366{width:var(--tc-space-8);height:var(--tc-space-1);margin:var(--tc-space-2) auto;background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none}._sheet_header_spgmj_377{justify-content:space-between;align-items:center;gap:var(--tc-space-2);padding:var(--tc-space-1) var(--tc-space-2) var(--tc-space-2) var(--tc-space-4);color:var(--tc-text);font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);flex:none;display:flex}._sheet_body_spgmj_389{min-height:0;padding:0 var(--tc-space-4) var(--tc-space-4);color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);flex:auto;overflow:auto}._task_strip_spgmj_398{flex-direction:column;min-width:0;display:flex}._task_strip_header_spgmj_404{align-items:center;gap:var(--tc-space-1);padding:var(--tc-space-2) var(--tc-space-2) var(--tc-space-1) var(--tc-space-4);flex:none;display:flex}._task_strip_summary_spgmj_412{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);white-space:nowrap;text-overflow:ellipsis;margin-right:auto;overflow:hidden}._task_strip_list_spgmj_423{gap:var(--tc-space-1);padding:0 var(--tc-space-3) var(--tc-space-3);flex-direction:column;display:flex}._task_chip_spgmj_430{align-items:center;gap:var(--tc-space-1-5);height:var(--tc-control-height-sm);padding-inline:var(--tc-space-2);color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-control);font-size:var(--tc-font-size-sm);flex:none;display:flex}._task_chip_dot_spgmj_443{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_spgmj_443[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_spgmj_443[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_spgmj_443[data-status=error]{background-color:var(--tc-error)}._task_chip_label_spgmj_463{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._skeleton_block_spgmj_469{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-status)}._skeleton_title_spgmj_474{width:40%;height:var(--tc-space-5)}._skeleton_line_spgmj_479{width:90%;height:var(--tc-space-3);margin-top:var(--tc-space-3)}._skeleton_line_short_spgmj_485{width:75%;height:var(--tc-space-3);margin-top:var(--tc-space-2)}._partial_banner_spgmj_491{justify-content:space-between;align-items:center;gap:var(--tc-space-2) var(--tc-space-3);margin:0 var(--tc-space-4) var(--tc-space-2);padding:var(--tc-space-1) var(--tc-space-1) var(--tc-space-1) var(--tc-space-4);color:var(--tc-warning);background-color:var(--tc-surface);border-radius:var(--tc-radius-bar);box-shadow:0 0 0 1px var(--tc-divider);font-size:var(--tc-font-size-sm);flex-wrap:wrap;flex:none;display:flex}._state_screen_spgmj_507{top:var(--tc-space-5);right:var(--tc-space-5);justify-content:center;align-items:flex-start;gap:var(--tc-space-2);width:min(560px, calc(100vw - 2 * var(--tc-space-5)));max-height:calc(100dvh - 2 * var(--tc-space-5));padding:var(--tc-space-8);color:var(--tc-text);background-color:var(--tc-canvas);border-radius:var(--tc-radius-window);box-shadow:0 0 0 1px var(--tc-divider), 0 18px 50px var(--tc-shadow);flex-direction:column;display:flex;position:fixed;overflow:auto}._state_screen_eyebrow_spgmj_528{color:var(--tc-text-muted);font-size:var(--tc-font-size-sm)}._state_screen_title_spgmj_533{max-width:56ch;font-size:var(--tc-font-size-lg);font-weight:var(--tc-font-weight-semibold);line-height:var(--tc-line-height-lg)}._state_screen_action_spgmj_540{height:var(--tc-control-height-md);margin-top:var(--tc-space-3);padding:0 var(--tc-control-padding-x-md);color:var(--tc-on-accent);background-color:var(--tc-accent);border-radius:var(--tc-radius-control);font-size:var(--tc-control-font-size);font-weight:var(--tc-font-weight-medium);align-items:center;display:inline-flex}._state_screen_action_spgmj_540:hover{background-color:var(--tc-accent-hover)}._state_screen_detail_spgmj_557{max-width:100%;padding:var(--tc-space-3) var(--tc-space-4);border-radius:var(--tc-radius-card);background:var(--tc-surface-raised);color:var(--tc-text-muted);font-family:var(--tc-font-mono);font-size:var(--tc-font-size-xs);white-space:pre-wrap;-webkit-user-select:text;user-select:text;margin:0;overflow-x:auto}._state_screen_description_spgmj_571{max-width:56ch;color:var(--tc-text-muted);font-size:var(--tc-font-size-sm);line-height:var(--tc-line-height-sm)}", yc = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function bc(e) {
	return e.replaceAll(yc, (e, t) => new URL(t, import.meta.url).href);
}
var xc = bc([
	pc,
	mc,
	hc,
	gc,
	_c,
	vc
].join("\n"));
//#endregion
//#region src/index.ts
function Sc() {
	Fs(globalThis, Is);
}
var Cc = fc(globalThis).then(() => uc({
	stylesheet: xc,
	version: "3.0.0"
}));
//#endregion
export { Cc as bootstrap_handle, Sc as register_chat_surface };
