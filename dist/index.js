import { t as e } from "./chunks/shell.module-Bh7Ylo2p.js";
import { a as t, d as n, f as r, o as i, p as a } from "./chunks/provider-ChWi4KfU.js";
import { D as o, E as s, _ as c, a as l, b as u, g as d, i as f, l as p, m, n as h, o as g, r as ee, s as te, u as _, x as v } from "./chunks/ids-CQF5rr2J.js";
import { i as y, n as ne, r as b } from "./chunks/generation-Ck4v0g3Y.js";
import { a as re, i as ie, n as ae, r as oe } from "./chunks/llm_connection-BJrh9qUU.js";
import { a as x, i as S, n as se, o as ce, t as le } from "./chunks/settings-CBjQWJ8F.js";
import { i as ue, n as de, o as fe, r as pe, s as me, t as he } from "./chunks/media_command_service-CLDKjice.js";
import { A as C, F as ge, I as _e, N as w, O as ve, P as ye, Q as be, V as xe, W as Se, Z as Ce, _ as T, b as E, ct as D, et as O, ft as we, g as k, h as A, i as Te, k as Ee, m as j, n as De, nt as Oe, p as M, pt as N, rt as ke, u as Ae, ut as P, x as je, y as Me } from "./chunks/vue-i18n-DUz2Gjn8.js";
import { t as Ne } from "./chunks/create_i18n-BJ1cTRr9.js";
import { n as Pe, t as Fe } from "./chunks/AppIcon-Cnhzrx9o.js";
import { a as Ie } from "./chunks/route_nav-hvhq2rfa.js";
import { t as Le } from "./chunks/chevron-down-Tu_8qTxg.js";
import { t as Re } from "./chunks/chevron-up-D4TetO-M.js";
import { t as ze } from "./chunks/x-CDKrptQJ.js";
import { t as Be } from "./chunks/portal_keys-gQ1cWdMS.js";
import { a as Ve, r as He, w as Ue } from "./chunks/job_repository-BCVJs26r.js";
import { a as We, c as Ge, d as Ke, f as qe, l as Je, o as Ye, s as Xe, t as Ze, u as Qe } from "./chunks/business_repositories-Cv2ukFwX.js";
import { t as $e } from "./chunks/novelai_errors-Bve94MgO.js";
import { r as et } from "./chunks/browser_secret_vault-_O6KgM_S.js";
import { a as tt, i as nt, n as rt, o as it } from "./chunks/provider_transport-Cq9_eXR7.js";
import { a as at, i as ot, o as st, r as ct, t as lt } from "./chunks/http_acknowledgment-BICa1SvS.js";
import { n as ut, r as dt, t as ft } from "./chunks/migration_journal-DJrA1Suw.js";
import { t as pt } from "./chunks/_vocabulary_import_error-BOxujgW3.js";
//#region ../../packages/core/src/capability_registry.ts
var mt = class {
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
}, ht = class {
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
}, gt = class {
	#e = /* @__PURE__ */ new Map();
	#t;
	#n = [];
	#r = "idle";
	constructor(e, t = new mt(), n = new ht()) {
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
}, _t = "Canonical JSON accepts only JSON data";
function vt() {
	throw TypeError(_t);
}
function yt(e) {
	return typeof e == "number" && !Number.isFinite(e) ? vt() : JSON.stringify(e);
}
function bt(e, t) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return yt(e);
	if (typeof e != "object") return vt();
	if (t.has(e)) throw TypeError("Canonical JSON cannot encode cyclic data");
	t.add(e);
	try {
		if (Array.isArray(e)) {
			if (Reflect.ownKeys(e).some((t) => typeof t != "string" || t !== "length" && (!/^\d+$/u.test(t) || Number(t) >= e.length || String(Number(t)) !== t))) return vt();
			let n = [];
			for (let r = 0; r < e.length; r += 1) {
				if (!Object.prototype.hasOwnProperty.call(e, r)) return vt();
				n.push(bt(e[r], t));
			}
			return `[${n.join(",")}]`;
		}
		let n = Object.getPrototypeOf(e);
		if (n !== Object.prototype && n !== null) return vt();
		let r = Reflect.ownKeys(e);
		if (r.some((e) => typeof e != "string")) return vt();
		let i = r.toSorted(), a = [];
		for (let n of i) {
			let r = Object.getOwnPropertyDescriptor(e, n);
			if (r === void 0 || !r.enumerable || !("value" in r)) return vt();
			a.push(`${yt(n)}:${bt(r.value, t)}`);
		}
		return `{${a.join(",")}}`;
	} finally {
		t.delete(e);
	}
}
function xt(e) {
	return bt(e, /* @__PURE__ */ new WeakSet());
}
//#endregion
//#region ../../packages/core/src/generation/anchors.ts
var St = class {
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
function Ct(e) {
	return r(n(a(e)));
}
function wt(e, t) {
	let n = Ct(xt(e)), i = t.bytes(32);
	if (i.length !== 32) throw Error("Random source must return exactly 32 bytes");
	return {
		source_anchor: n,
		generation_anchor: Ct(`${n}${r(i)}`)
	};
}
//#endregion
//#region ../../packages/contracts/src/library.ts
var Tt = te(["user", "assistant"]), Et = {
	id: l,
	display_name: v().trim().min(1).max(120),
	role: Tt,
	description: v().trim().max(8e3),
	greeting: v().trim().max(4e3),
	avatar_image_id: h.nullable(),
	is_active: _()
}, Dt = u(Et), Ot = u({
	...Et,
	created_at: s({ offset: !0 }),
	updated_at: s({ offset: !0 })
}), kt = te([
	"manual",
	"imported",
	"character"
]), At = {
	id: l,
	title: v().trim().min(1).max(200),
	source_type: kt,
	content: v().trim().min(1).max(5e4),
	keywords: p(v().trim().min(1).max(80)).max(64).refine((e) => new Set(e).size === e.length, "keywords must not repeat"),
	priority: d().int().min(0).max(1e3),
	enabled: _()
}, jt = u(At), Mt = u({
	...At,
	created_at: s({ offset: !0 }),
	updated_at: s({ offset: !0 })
}), Nt = Object.freeze({}), Pt = {
	kind: "bearer",
	header: "authorization"
}, Ft = Object.freeze({
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
		auth: Pt,
		required_headers: Nt
	},
	openai_image: {
		origin: "https://api.openai.com",
		routes: ["/v1/images/generations", "/v1/images/edits"],
		auth: Pt,
		required_headers: Nt
	},
	google_image: {
		origin: "https://generativelanguage.googleapis.com",
		routes: ["/v1beta/interactions"],
		auth: {
			kind: "api_key",
			header: "x-goog-api-key"
		},
		required_headers: Nt
	}
});
function It(e) {
	let t = ae[e];
	return Object.freeze([...t.completion_routes, t.models_route]);
}
var Lt = Object.freeze({
	openai_compatible: {
		origin: "https://api.openai.com",
		routes: It("openai_compatible"),
		auth: Pt,
		required_headers: Nt
	},
	anthropic: {
		origin: "https://api.anthropic.com",
		routes: It("anthropic"),
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
		routes: It("google_generative"),
		auth: Pt,
		required_headers: Nt
	},
	ollama: {
		origin: "http://127.0.0.1:11434",
		routes: It("ollama"),
		auth: { kind: "none" },
		required_headers: Nt
	}
}), Rt = class extends Error {
	code = "direct_route_rejected";
	constructor() {
		super("The requested destination is not in the provider route catalog"), this.name = "DirectRouteRejectedError";
	}
};
function zt(e) {
	return Ft[e];
}
function Bt(e) {
	return Lt[e];
}
function Vt(e, t) {
	if (!e.routes.includes(t)) throw new Rt();
	return `${e.origin}${t}`;
}
//#endregion
//#region ../../packages/contracts/src/message.ts
var Ht = u({
	schema_version: m(1),
	generation_anchor: y,
	source_anchor: y,
	request_ids: p(f),
	image_ids: p(h)
}).check((e) => {
	new Set(e.value.request_ids).size !== e.value.request_ids.length && e.issues.push({
		code: "custom",
		input: e.value.request_ids,
		message: "request_ids must not contain duplicates",
		path: ["request_ids"]
	}), new Set(e.value.image_ids).size !== e.value.image_ids.length && e.issues.push({
		code: "custom",
		input: e.value.image_ids,
		message: "image_ids must not contain duplicates",
		path: ["image_ids"]
	});
}), Ut = u({
	schema_version: m(1),
	chat_id: v().min(1).max(512),
	active_swipes: p(c({
		message_id: d().int().nonnegative(),
		swipe_id: d().int().nonnegative()
	})),
	messages: p(c({
		message_id: d().int().nonnegative(),
		role: te([
			"user",
			"assistant",
			"system"
		]),
		content_sha256: y,
		swipe_id: d().int().nonnegative().nullable()
	}))
}), Wt = "<!-- tavern-canvas:image ", Gt = "-->";
function Kt(e) {
	let t = e.codePointAt(0);
	return t === void 0 ? 0 : t <= 127 ? 1 : t <= 2047 ? 2 : t <= 65535 ? 3 : 4;
}
function qt(e, t) {
	if (t.length !== 1 || e.length === 0) return !1;
	let n = e.charCodeAt(e.length - 1), r = t.charCodeAt(0);
	return n >= 55296 && n <= 56319 && r >= 56320 && r <= 57343;
}
function Jt(e) {
	return e.endsWith("--") ? 2 : +!!e.endsWith("-");
}
function Yt(e, t = []) {
	return Object.freeze({
		cleaned_text: e,
		requests: Object.freeze(t)
	});
}
var Xt = class {
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
		if (!this.#t) return Yt(e);
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
		return Yt(t.join(""), n);
	}
	finish() {
		if (this.#s || (this.#s = !0, !this.#t)) return Yt("");
		let e = this.#n === "text" ? this.#r : "";
		return this.#f(), Yt(e);
	}
	#c(e, t) {
		for (this.#r += e; !Wt.startsWith(this.#r);) {
			let e = this.#r.codePointAt(0);
			if (e === void 0) break;
			let n = String.fromCodePoint(e);
			t.push(n), this.#r = this.#r.slice(n.length);
		}
		this.#r === Wt && (this.#r = "", this.#n = "candidate");
	}
	#l(e, t) {
		let n = qt(this.#i, e);
		if (this.#i += e, this.#a += n ? 1 : Kt(e), this.#i.endsWith(Gt)) {
			let e = this.#i.slice(0, -3);
			if (this.#a - 3 <= 16384) {
				let n = this.#d(e);
				n !== null && t.push(n);
			}
			this.#i = "", this.#a = 0, this.#n = "text";
			return;
		}
		let r = Jt(this.#i);
		this.#a - r > 16384 && (this.#i = "", this.#a = 0, this.#n = "discarding", this.#o = "");
	}
	#u(e) {
		for (this.#o += e; !Gt.startsWith(this.#o) && this.#o[0] !== void 0;) this.#o = this.#o.slice(1);
		this.#o === Gt && (this.#o = "", this.#n = "text");
	}
	#d(e) {
		let t;
		try {
			t = JSON.parse(e);
		} catch {
			return null;
		}
		let n = b.safeParse(t);
		return !n.success || n.data.generation_anchor !== this.#e ? null : Object.freeze(n.data);
	}
	#f() {
		this.#r = "", this.#i = "", this.#a = 0, this.#o = "";
	}
}, Zt = 9e5, F = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "GenerationSessionError", this.code = e;
	}
};
function Qt(e) {
	let t = Ut.parse(e);
	for (let e of t.active_swipes) Object.freeze(e);
	for (let e of t.messages) Object.freeze(e);
	return Object.freeze(t.active_swipes), Object.freeze(t.messages), Object.freeze(t);
}
var $t = class {
	#e;
	#t;
	#n;
	#r = /* @__PURE__ */ new Map();
	#i = /* @__PURE__ */ new Map();
	constructor(e, t = { now: () => /* @__PURE__ */ new Date() }, n = Zt) {
		if (!Number.isFinite(n) || n < 0) throw RangeError("Session retention must be a nonnegative finite duration");
		this.#e = e, this.#t = t, this.#n = n;
	}
	open(e) {
		if (!Number.isInteger(e.depth) || e.depth < 0) throw new F("invalid_depth", "Generation depth must be a nonnegative integer");
		let t = this.#r.get(e.host_root_generation_id);
		if (t !== void 0) {
			if (this.#a(t)) throw new F("expired", `Generation session for root "${e.host_root_generation_id}" has expired`);
			return t.session;
		}
		if (e.depth !== 0) throw new F("missing", `Root generation session "${e.host_root_generation_id}" does not exist`);
		let n = Qt(e.source_context), r = wt(n, this.#e), i = /* @__PURE__ */ new Set(), a = {
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
		if (n === void 0) throw new F("missing", `Generation session "${t}" does not exist`);
		if (n.session.host_root_generation_id !== e) throw new F("mismatched", `Generation anchor "${t}" does not belong to root "${e}"`);
		if (this.#a(n)) throw new F("expired", `Generation session "${t}" has expired`);
		return n.session;
	}
	complete(e) {
		let t = this.#r.get(e);
		if (t === void 0) throw new F("missing", `Root generation session "${e}" does not exist`);
		return t.session.completed_at ??= this.#t.now().toISOString(), t.session;
	}
	add_request(e, t) {
		let n = this.#i.get(e);
		if (n === void 0) throw new F("missing", `Generation session "${e}" does not exist`);
		if (this.#a(n)) throw new F("expired", `Generation session "${e}" has expired`);
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
}, en = class {
	#e;
	constructor(e = globalThis.crypto) {
		this.#e = e;
	}
	next() {
		return f.parse(this.#e.randomUUID());
	}
}, tn = Object.freeze(o(b, { target: "draft-07" })), nn = class {
	definition = Object.freeze({
		name: "request_image",
		display_name: "Request image",
		description: "Queue an image generation request for the current TavernCanvas generation session.",
		stealth: !1,
		parameters: tn
	});
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		this.#e = e, this.#t = t, this.#n = n;
	}
	execute(e, t) {
		let n = Object.freeze(b.parse(t)), r = this.#e.require_actionable(e, n.generation_anchor), i = f.parse(this.#t.next()), a = Object.freeze({
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
}, rn = Object.freeze({
	tools: Object.freeze([]),
	tool_choice: "none"
});
function an(e, t) {
	let n = ne.parse(e), r = y.parse(t), i = n === "native_tool", a = i ? `Use image generation only when visual content would materially support the response. When appropriate, call request_image with generation_anchor "${r}" before writing final assistant text.` : `When image generation is appropriate, emit this exact hidden comment before writing final assistant text: <!-- tavern-canvas:image {"generation_anchor":"${r}","scene_description":"<text>"} -->`;
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
		private_prompt: rn
	});
}
//#endregion
//#region ../../packages/core/src/jobs/generation_job.ts
var on = class {
	now() {
		return /* @__PURE__ */ new Date();
	}
};
function sn(e) {
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
var cn = {
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
}, ln = class extends Error {
	code = "invalid_generation_job_transition";
	job_id;
	prior_state;
	attempted_state;
	constructor(e, t, n) {
		super(`Job ${e} cannot transition from ${t} to ${n}`), this.name = "GenerationJobTransitionError", this.job_id = e, this.prior_state = t, this.attempted_state = n;
	}
};
function un(e, t, n) {
	let r = e.state;
	if (r !== "cancelled" || t !== "cancelled") {
		if (!cn[r].includes(t)) throw new ln(e.job_id, r, t);
		e.state = t, e.updated_at = n;
	}
}
function dn(e, t) {
	if (!Number.isInteger(e) || e < 1) throw RangeError(`${t} must be a positive integer`);
	return e;
}
function fn(e) {
	let n = y.parse(e.generation_anchor), r = Object.freeze(b.parse(e.arguments));
	if (r.generation_anchor !== n) throw TypeError("Image job arguments must use the job generation anchor");
	if (e.chat_id.trim().length === 0) throw TypeError("Image job chat ID must not be empty");
	if (!Number.isInteger(e.requested_swipe_id) || e.requested_swipe_id < 0) throw RangeError("Image job requested swipe ID must be a non-negative integer");
	return {
		request_id: f.parse(e.request_id),
		generation_anchor: n,
		source_anchor: y.parse(e.source_anchor),
		chat_id: e.chat_id,
		requested_swipe_id: e.requested_swipe_id,
		provider_id: t.parse(e.provider_id),
		arguments: r,
		automatic: e.automatic
	};
}
function pn(e) {
	let t = `${e.generation_anchor}${xt(e.arguments)}`;
	return r(n(a(t)));
}
function mn(e) {
	return {
		...e,
		arguments: { ...e.arguments },
		error: e.error === null ? null : { ...e.error },
		image_ids: [...e.image_ids]
	};
}
function hn(e) {
	return e instanceof me ? { ...e.provider_error } : {
		code: "provider_unavailable",
		retryable: !1
	};
}
var gn = class {
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
	#f = t.options;
	#p = 0;
	#m = 0;
	#h = !1;
	constructor(e) {
		this.#e = e.executor, this.#t = e.persistence, this.#n = e.job_id_source, this.#r = e.time_source ?? new on(), this.#i = dn(e.global_concurrency ?? 4, "Global job concurrency");
		for (let t of this.#f) {
			let n = e.provider_concurrency?.[t], r = n === void 0 ? this.#i : dn(n, `Concurrency for ${t}`);
			this.#a.set(t, r), this.#o.set(t, []), this.#s.set(t, 0);
		}
	}
	enqueue(e) {
		let t = fn(e), n = pn(t);
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
		return t === void 0 ? null : sn(t.job);
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
		if (t.job.state === "cancelled") return sn(t.job);
		t.cancel_requested = !0, t.controller.abort(), t.queued && this.#w(t);
		let n = await this.#C(t, async () => (t.job.state !== "cancelled" && await this.#S(t, "cancelled"), sn(t.job)));
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
		return n === void 0 ? Promise.reject(/* @__PURE__ */ Error(`Generation job ${e} does not exist`)) : this.#C(n, async () => (n.job.state !== t && await this.#S(n, t), sn(n.job)));
	}
	async #_(e, t) {
		let n = this.#r.now().toISOString(), r = {
			job_id: ee.parse(this.#n.next()),
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
		}, i = sn(r);
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
			let n = (await this.#e.execute(sn(e.job), t)).image_ids.map((e) => h.parse(e));
			if (n.length === 0) throw new me({
				code: "malformed_response",
				retryable: !1
			});
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let t = mn(e.job);
				t.image_ids = n, await this.#S(e, "completed", t);
			});
		} catch (t) {
			await this.#C(e, async () => {
				if (e.cancel_requested || e.job.state === "cancelled") return;
				let n = mn(e.job);
				n.error = hn(t), await this.#S(e, "failed", n);
			});
		}
	}
	async #S(e, t, n = mn(e.job)) {
		un(n, t, this.#r.now().toISOString());
		let r = sn(n);
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
function _n(e) {
	return [...new Set(e)];
}
function vn(e, t) {
	return `${e}\u0000${String(t)}`;
}
function yn(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.has(t.image_id) || n.set(t.image_id, Object.freeze({ ...t }));
	for (let e of t) n.has(e) || n.set(e, Object.freeze({ image_id: e }));
	return Object.freeze([...n.values()]);
}
var bn = class {
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
				this.#s = e.chat_id, this.#i.set(vn(e.chat_id, e.message_id), e.swipe_id), this.#d();
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
			generation_anchor: y.parse(e.generation_anchor),
			source_anchor: y.parse(e.source_anchor),
			request_ids: Object.freeze(_n(e.request_ids.map((e) => f.parse(e))))
		});
		this.#n.set(t.generation_anchor, t), this.#s === null && (this.#s = t.chat_id);
		let n = vn(t.chat_id, t.message_id);
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
			if (this.#s === t.chat_id && this.#i.get(vn(t.chat_id, t.message_id)) === t.swipe_id) {
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
					let r = _n([
						...n.metadata?.request_ids ?? [],
						...t.request_ids,
						e.request_id
					]), i = _n([...n.metadata?.image_ids ?? [], ...e.image_ids]), a = Object.freeze({
						chat_id: t.chat_id,
						message_id: t.message_id,
						swipe_id: t.swipe_id,
						metadata: Ht.parse({
							schema_version: 1,
							generation_anchor: t.generation_anchor,
							source_anchor: t.source_anchor,
							request_ids: r,
							image_ids: i
						}),
						media: yn(n.media, e.image_ids)
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
}, xn = "tavern_canvas_image_trigger", Sn = {
	none: -1,
	in_chat: 1
}, Cn = { system: 0 };
function wn(e) {
	return e.bind(globalThis);
}
function Tn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function En(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
var Dn = {
	native_tool_manager: !1,
	main_generation_events: !1,
	message_swipe_metadata: !1,
	host_image_upload: !1
};
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
function L(e, t) {
	let n = I(e, t);
	return n.ok && typeof n.value == "function";
}
function On(e, t) {
	let n = I(e, t);
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
function kn(e, t) {
	let n = On(e, t);
	return n.ok && typeof n.value == "string" && n.value.trim().length > 0;
}
function An(e) {
	let t = I(e, "eventSource"), n = I(e, "eventTypes");
	if (!t.ok || !Tn(t.value) || !n.ok || !Tn(n.value)) return !1;
	let r = n.value, i = I(r, "GENERATION_STARTED"), a = I(r, "GENERATION_STOPPED"), o = I(r, "GENERATION_ENDED"), s = I(r, "STREAM_TOKEN_RECEIVED");
	return L(t.value, "on") && L(t.value, "removeListener") && i.ok && typeof i.value == "string" && i.value.length > 0 && a.ok && typeof a.value == "string" && a.value.length > 0 && o.ok && typeof o.value == "string" && o.value.length > 0 && s.ok && typeof s.value == "string" && s.value.length > 0;
}
function jn(e) {
	let t = I(e, "eventSource"), n = I(e, "eventTypes");
	if (!t.ok || !Tn(t.value) || !n.ok || !Tn(n.value)) return !1;
	let r = I(n.value, "CHAT_CHANGED"), i = I(n.value, "MESSAGE_SWIPED");
	return L(t.value, "on") && L(t.value, "removeListener") && r.ok && typeof r.value == "string" && r.value.length > 0 && i.ok && typeof i.value == "string" && i.value.length > 0;
}
function Mn(e) {
	let t = On(e, "getRequestHeaders");
	if (!t.ok) return !1;
	try {
		return Ln(t.value), !0;
	} catch {
		return !1;
	}
}
function Nn(e, t) {
	if (!Tn(e)) return { ...Dn };
	let n = On(e, "getContext");
	if (!n.ok || !Tn(n.value)) return { ...Dn };
	let r = n.value, i = kn(r, "getCurrentLocale"), a = L(r, "getCurrentChatId");
	return {
		native_tool_manager: L(r, "registerFunctionTool") && L(r, "unregisterFunctionTool"),
		main_generation_events: i && An(r),
		message_swipe_metadata: a && jn(r),
		host_image_upload: typeof t == "function" && Mn(r)
	};
}
function Pn(e, t) {
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
function Fn(e, t) {
	if (typeof e != "string" || e.trim().length === 0) throw Error(t);
	return e;
}
function In(e) {
	if (!En(e)) throw Error("Image tool arguments must be a record");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("Image tool arguments could not be cloned");
	}
	if (!En(t)) throw Error("Image tool arguments could not be cloned");
	return t;
}
function Ln(e) {
	if (!En(e)) throw Error("SillyTavern returned invalid request headers");
	let t;
	try {
		t = structuredClone(e);
	} catch {
		throw Error("SillyTavern returned invalid request headers");
	}
	if (!En(t) || !Object.values(t).every((e) => typeof e == "string")) throw Error("SillyTavern returned invalid request headers");
	return t;
}
var Rn = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = wn(t);
	}
	can_use_native_tools() {
		if (!(L(this.#e, "registerFunctionTool") && L(this.#e, "unregisterFunctionTool"))) return !1;
		let e = On(this.#e, "isToolCallingSupported");
		return e.ok && e.value === !0;
	}
	get_locale() {
		return Fn(this.#e.getCurrentLocale(), "SillyTavern returned an invalid locale");
	}
	get_active_chat_id() {
		return Fn(this.#e.getCurrentChatId(), "SillyTavern returned an invalid active chat ID");
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
				typeof n == "number" && Number.isInteger(n) && n > 0 && e({
					phase: "ended",
					message_id: n - 1
				});
			}]
		], n = [];
		try {
			for (let e of t) this.#e.eventSource.on(...e), n.push(e);
		} catch (e) {
			throw Pn(this.#e.eventSource, n), e;
		}
		let r = !1;
		return () => {
			if (r) return;
			r = !0;
			let e = Pn(this.#e.eventSource, n);
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
			action: async (t) => e.execute(In(t)),
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
			xn,
			e?.content ?? "",
			e === null ? Sn.none : Sn.in_chat,
			e?.depth ?? 0,
			e?.scan_world_info ?? !1,
			Cn.system
		]);
	}
	async upload_image(e) {
		let t = await this.#t("/api/images/upload", {
			method: "POST",
			headers: Ln(this.#e.getRequestHeaders()),
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
		if (!t.ok) throw En(n) && typeof n.error == "string" && n.error.trim().length > 0 ? Error(n.error) : Error(`Host image upload failed with status ${String(t.status)}`);
		if (!En(n) || typeof n.path != "string" || n.path.trim().length === 0) throw Error("Host image upload returned an invalid response");
		return { path: n.path };
	}
};
//#endregion
//#region src/host/tauritavern_host.ts
function zn(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Bn(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function R(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function Vn(e, t) {
	let n = R(e, t);
	return n.ok && typeof n.value == "function";
}
function Hn(e, t) {
	let n = R(e, t);
	return n.ok && zn(n.value) ? n.value : void 0;
}
function Un(e) {
	let t = {
		tauri_chat_surface: !1,
		tauri_world_info_activation: !1
	};
	if (!zn(e)) return t;
	let n = R(e, "abiVersion");
	if (!n.ok || n.value !== 1) return t;
	let r = Hn(e, "api");
	if (r === void 0) return t;
	let i = Hn(r, "chatSurface"), a = i === void 0 ? { ok: !1 } : R(i, "protocolVersion"), o = Hn(r, "worldInfo");
	return {
		tauri_chat_surface: i !== void 0 && a.ok && a.value === 1 && Vn(i, "isManagedOwnershipRequired") && Vn(i, "registerParticipant"),
		tauri_world_info_activation: o !== void 0 && Vn(o, "getLastActivation") && Vn(o, "subscribeActivations")
	};
}
function Wn(e, t = !0) {
	if (e === void 0 && t) return;
	let n;
	if (typeof e == "function") n = () => {
		Reflect.apply(e, void 0, []);
	};
	else if (zn(e)) {
		let t = R(e, "dispose");
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
function Gn(e) {
	return {
		message_id: e.mesid,
		element: e.element,
		content: e.content,
		signal: e.signal
	};
}
function Kn(e) {
	return e === "before" || e === "after" || e === "an_top" || e === "an_bottom" || e === "depth" || e === "em_top" || e === "em_bottom" || e === "outlet";
}
function qn() {
	throw Error("TauriTavern returned an invalid WorldInfo activation");
}
function Jn(e) {
	if (!Bn(e)) return !1;
	let t = R(e, "entries");
	if (!t.ok) return !1;
	try {
		if (!Array.isArray(t.value)) return !1;
		for (let e = 0; e < t.value.length; e += 1) if (!Bn(t.value[e])) return !1;
		return !0;
	} catch {
		return !1;
	}
}
function Yn(e) {
	if (!Jn(e)) return qn();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return qn();
	}
	if (!Bn(t)) return qn();
	let { timestampMs: n, trigger: r, entries: i } = t;
	if (typeof n != "number" || !Number.isFinite(n) || typeof r != "string" || r.length === 0 || !Array.isArray(i)) return qn();
	let a = [];
	for (let e of i) {
		if (!Bn(e)) return qn();
		let { world: t, uid: n, displayName: r, constant: i, position: o } = e;
		if (typeof t != "string" || typeof n != "string" && (typeof n != "number" || !Number.isFinite(n)) || typeof r != "string" || typeof i != "boolean" || o !== void 0 && !Kn(o)) return qn();
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
var Xn = class {
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
					n.claim(e, (e) => Wn(t({
						message_id: e.mesid,
						source: e.source,
						element: e.element,
						content: e.content,
						signal: e.signal
					}), !1) ?? (() => void 0));
				} });
			} },
			...e.did_mount === void 0 ? {} : { didMount: (t) => Wn(e.did_mount?.(Gn(t))) },
			...e.did_commit_content === void 0 ? {} : { didCommitContent: (t) => Wn(e.did_commit_content?.(Gn(t))) }
		});
		if (!zn(n)) throw Error("TauriTavern returned an invalid ChatSurface registration");
		let r = R(n, "fault");
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
		return t === null ? null : Yn(t);
	}
	async subscribe_world_info_activation(e) {
		let t = this.#e.api?.worldInfo;
		if (t === void 0) throw Error("TauriTavern WorldInfo activation API is unavailable");
		let n = await t.subscribeActivations((t) => {
			e(Yn(t));
		});
		if (typeof n != "function") throw Error("TauriTavern returned an invalid WorldInfo unsubscribe");
		let r = !1;
		return async () => {
			r || (r = !0, await Reflect.apply(n, void 0, []));
		};
	}
};
async function Zn(e) {
	let t = R(e, "__TAURITAVERN__");
	if (!t.ok || !zn(t.value)) return;
	let n = t.value, r = R(n, "abiVersion");
	if (!r.ok || r.value !== 1) return;
	let i = R(n, "ready");
	if (!i.ok) return;
	let a = i.value;
	if (a == null) {
		let t = R(e, "__TAURITAVERN_MAIN_READY__");
		if (!t.ok) return;
		a = t.value;
	}
	return await a, new Xn(n);
}
//#endregion
//#region src/host/tavern_helper_host.ts
var Qn = "tavern_canvas";
function $n(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function er(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function tr(e) {
	for (let t = 0; t < e.length; t += 1) if (!Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}
function nr(e, t) {
	try {
		return {
			ok: !0,
			value: Reflect.get(e, t)
		};
	} catch {
		return { ok: !1 };
	}
}
function rr(e, t) {
	let n = nr(e, t);
	return n.ok && typeof n.value == "function";
}
function ir(e) {
	let t = nr(e, "getTavernHelperVersion");
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
function ar(e) {
	return e === void 0 ? {
		detected: !1,
		version: { state: "missing" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	} : $n(e) ? {
		detected: !0,
		version: ir(e),
		private_prompt_generation: rr(e, "generateRaw"),
		message_swipe_metadata: rr(e, "getChatMessages") && rr(e, "setChatMessages")
	} : {
		detected: !0,
		version: { state: "invalid" },
		private_prompt_generation: !1,
		message_swipe_metadata: !1
	};
}
function or(e) {
	return e === "system" || e === "assistant" || e === "user";
}
function sr() {
	throw Error("TavernHelper returned invalid chat messages");
}
function cr(e) {
	if (!er(e)) return sr();
	let { message_id: t, name: n, role: r, is_hidden: i, swipe_id: a, swipes: o, swipes_data: s, swipes_info: c } = e;
	return !Number.isInteger(t) || typeof t != "number" || t < 0 || typeof n != "string" || !or(r) || i !== void 0 && typeof i != "boolean" || !Number.isInteger(a) || typeof a != "number" || !Array.isArray(o) || o.length === 0 || !tr(o) || !o.every((e) => typeof e == "string") || !Array.isArray(s) || !tr(s) || !s.every(er) || !Array.isArray(c) || !tr(c) || !c.every(er) || s.length !== o.length || c.length !== o.length || a < 0 || a >= o.length ? sr() : {
		message_id: t,
		name: n,
		role: r,
		is_hidden: i ?? !1,
		swipe_id: a,
		swipes: o,
		swipes_data: s,
		swipes_info: c
	};
}
function lr(e) {
	try {
		if (!Array.isArray(e) || !tr(e)) return !1;
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			if (!er(n)) return !1;
			let r = nr(n, "swipes_data"), i = nr(n, "swipes_info");
			if (!r.ok || !Array.isArray(r.value) || !tr(r.value) || !r.value.every(er) || !i.ok || !Array.isArray(i.value) || !tr(i.value) || !i.value.every(er)) return !1;
		}
		return !0;
	} catch {
		return !1;
	}
}
function ur(e) {
	if (!lr(e)) return sr();
	let t;
	try {
		t = structuredClone(e);
	} catch {
		return sr();
	}
	return !Array.isArray(t) || !tr(t) ? sr() : t.map(cr);
}
function dr(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update metadata could not be cloned");
	}
}
function fr(e) {
	try {
		return structuredClone(e);
	} catch {
		throw Error("TavernHelper message update media could not be cloned");
	}
}
function pr(e) {
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
var mr = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async get_active_chat() {
		let e = ur(this.#e.getChatMessages("0-{{lastMessageId}}", { include_swipes: !0 })), t = this.#t();
		if (typeof t != "string" || t.trim().length === 0) throw Error("TavernHelper returned an invalid active chat ID");
		return {
			chat_id: t,
			messages: e.map(pr)
		};
	}
	async generate_private_prompt(e) {
		let t = {
			generation_id: e.generation_id,
			ordered_prompts: e.prompts.map((e) => ({ ...e })),
			should_silence: !0,
			should_stream: !1,
			tools: rn.tools,
			tool_choice: rn.tool_choice,
			...e.max_chat_history === void 0 ? {} : { max_chat_history: e.max_chat_history }
		}, n = await this.#e.generateRaw(t);
		if (typeof n != "string") throw Error("Private prompt generation returned structured tool calls");
		return n;
	}
	async update_message(e) {
		let t = ur(this.#e.getChatMessages(e.message_id, { include_swipes: !0 })).find((t) => t.message_id === e.message_id);
		if (t === void 0) throw Error(`Host message ${String(e.message_id)} no longer exists`);
		if (!Number.isInteger(e.swipe_id) || e.swipe_id < 0 || e.swipe_id >= t.swipes.length) throw Error(`Host message ${String(e.message_id)} swipe ${String(e.swipe_id)} no longer exists`);
		let n = fr(e.media), r = t.swipes.map((t, n) => n === e.swipe_id ? e.content : t), i = t.swipes_info.map((t, n) => n === e.swipe_id ? {
			...t,
			[Qn]: dr(e.metadata)
		} : t), a = t.swipes_data.map((t, r) => {
			if (r !== e.swipe_id) return t;
			let i = er(t.extra) ? t.extra : {};
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
}, hr = "4.9.1", gr = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/u;
function _r(e) {
	let t = gr.exec(e.trim());
	if (t === null) return null;
	let [, n, r, i, a] = t;
	return {
		major: Number(n),
		minor: Number(r),
		patch: Number(i),
		prerelease: a ?? null
	};
}
function vr(e, t) {
	let n = e.major - t.major || e.minor - t.minor || e.patch - t.patch;
	return n === 0 ? e.prerelease === null : n > 0;
}
function yr(e) {
	let t = _r(e), n = _r(hr);
	return t === null || n === null ? "invalid" : vr(t, n) ? "supported" : "unsupported";
}
var br = [
	"main_generation_events",
	"private_prompt_generation",
	"message_swipe_metadata",
	"host_image_upload",
	"tavern_helper"
];
function xr(e) {
	return {
		available: !1,
		reason: e
	};
}
function z(e, t) {
	return e ? { available: !0 } : xr(t);
}
function Sr(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Cr(e, t, n) {
	return {
		native_tool_manager: z(t.native_tool_manager, "SillyTavern ToolManager API is unavailable"),
		main_generation_events: z(t.main_generation_events, "SillyTavern generation event API is unavailable"),
		private_prompt_generation: z(e.private_prompt_generation, "TavernHelper.generateRaw is unavailable"),
		message_swipe_metadata: z(e.message_swipe_metadata && t.message_swipe_metadata, "TavernHelper message swipe API is unavailable"),
		host_image_upload: z(t.host_image_upload, "SillyTavern image upload API is unavailable"),
		tavern_helper: z(e.version.state === "available", "TavernHelper version API is unavailable"),
		tauri_chat_surface: z(n.tauri_chat_surface, "TauriTavern ChatSurface API is unavailable"),
		tauri_world_info_activation: z(n.tauri_world_info_activation, "TauriTavern WorldInfo activation API is unavailable"),
		gateway_protocol: xr("Gateway protocol is not connected")
	};
}
function wr(e) {
	return br.filter((t) => e[t]?.available !== !0);
}
function Tr(e) {
	let t = ar(Sr(e, "TavernHelper")), n = Cr(t, Nn(Sr(e, "SillyTavern"), Sr(e, "fetch")), Un(Sr(e, "__TAURITAVERN__")));
	if (!t.detected) return {
		ready: !1,
		error_code: "tavern_helper_missing",
		missing_capabilities: wr(n)
	};
	let r = t.version;
	if (r.state === "missing" || r.state === "threw") return {
		ready: !1,
		error_code: "helper_api_incomplete",
		missing_capabilities: wr(n)
	};
	if (r.state === "invalid") return {
		ready: !1,
		error_code: "helper_version_invalid",
		missing_capabilities: ["tavern_helper"]
	};
	let i = r.value, a = yr(i);
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
	let o = wr(n);
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
var Er = "capability_not_implemented";
function B() {
	let e = /* @__PURE__ */ Error("This capability is not available in the current host");
	return Object.defineProperty(e, "code", { value: Er }), Promise.reject(e);
}
function V() {
	return () => {};
}
var Dr = {
	character: [],
	outfit: [],
	lora: [],
	vibe: [],
	reference: [],
	workflow: []
}, Or = {
	capability_matrix: {},
	helper_version: null,
	protocol_version: null,
	storage_usage_bytes: null,
	storage_quota_bytes: null
}, kr = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
}, Ar = {
	schema_version: 1,
	active_namespace: "default",
	locale: "auto",
	credential_storage_mode: "host",
	active_provider_profile_id: null,
	global_concurrency: 1,
	auto_generation_enabled: !1,
	fallback_generation_enabled: !1,
	vocabulary_update_channel: "bundled",
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
function jr() {
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
			clear_credential: B
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
			load: () => Promise.resolve(Dr),
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
			load: () => Promise.resolve(Or),
			subscribe: V,
			test_connection: B,
			load_timeline: () => Promise.resolve([]),
			export_support_bundle: B
		},
		migration: {
			load: () => Promise.resolve(kr),
			subscribe: V,
			retry: B,
			confirm_legacy_cleanup: B
		},
		settings: {
			load: () => Promise.resolve({
				settings: Ar,
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
var H = { status: "idle" }, Mr = "capability_load_failed", Nr = "command_failed", Pr = /^[a-z][a-z0-9_]*$/u;
function Fr(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && Pr.test(t)) return { code: t };
	}
	return { code: t };
}
function U(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var Ir = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function Lr(e) {
	return e === "failed" ? "error" : "pending";
}
function Rr(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function zr(e) {
	return {
		id: e.job_id,
		label_code: Rr(e.state),
		status: Lr(e.state),
		progress: e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null
	};
}
function Br(e) {
	return e.filter((e) => Ir.has(e.state)).map(zr);
}
function Vr(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: Fr(e, Nr)
		});
	}));
}
function Hr(e, t, n) {
	return {
		route: e,
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		workbench: {
			profiles: [],
			active_profile_id: null,
			jobs: [],
			submit_command: H
		},
		llm_connections: {
			connections: [],
			selected_connection_id: null
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: H
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
			vocabulary_install_command: H
		},
		library: {
			personas: [],
			knowledge: [],
			selected_knowledge_ids: []
		},
		gallery: {
			records: [],
			selected_record_id: null,
			bulk_delete_command: H
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			migration: null,
			connection_test_command: H,
			support_bundle_command: H
		},
		settings: {
			settings: null,
			vocabulary_update_channel: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: H,
			migration_retry_command: H
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: []
	};
}
var Ur = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	constructor(e) {
		this.#e = e.capabilities, this.#t = Hr(e.initial_route ?? "workbench", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
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
			tasks: Br(e)
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
			this.#i || this.#v(e, Fr(t, Mr));
		}).finally(() => {
			this.#_(e, !1);
		});
	}
	#b(e) {
		this.#i || (e.type === "job_updated" ? this.#c(U(this.#t.workbench.jobs, e.job, (e) => e.job_id)) : this.#c(this.#t.workbench.jobs.filter((t) => t.job_id !== e.job_id)));
	}
	#x(e) {
		this.#i || (e.type === "profile_upserted" ? this.#s({ profiles: U(this.#t.workbench.profiles, e.profile, (e) => e.id) }) : this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e.profile_id) }));
	}
	#S(e) {
		this.#i || (e.type === "connection_upserted" ? this.#l({ connections: U(this.#t.llm_connections.connections, e.connection, (e) => e.id) }) : this.#l({ connections: this.#t.llm_connections.connections.filter((t) => t.id !== e.connection_id) }));
	}
	#C(e) {
		this.#i || (e.type === "preset_upserted" ? this.#u({ presets: U(this.#t.prompt.presets, e.preset, (e) => e.id) }) : this.#u({ presets: this.#t.prompt.presets.filter((t) => t.id !== e.preset_id) }));
	}
	#w(e) {
		if (!this.#i) if (e.type === "asset_upserted") {
			let { category: t } = e.asset, n = {
				...this.#t.assets.records,
				[t]: U(this.#t.assets.records[t], e.asset, (e) => e.id)
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
		this.#i || (e.type === "entry_upserted" ? this.#f({ knowledge: U(this.#t.library.knowledge, e.entry, (e) => e.id) }) : this.#f({
			knowledge: this.#t.library.knowledge.filter((t) => t.id !== e.entry_id),
			selected_knowledge_ids: this.#t.library.selected_knowledge_ids.filter((t) => t !== e.entry_id)
		}));
	}
	#D(e) {
		this.#i || (e.type === "record_upserted" ? this.#p({ records: U(this.#t.gallery.records, e.record, (e) => e.id) }) : this.#p({ records: this.#t.gallery.records.filter((t) => t.id !== e.record_id) }));
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
		return Vr(() => this.#t.workbench.submit_command, (e) => {
			this.#s({ submit_command: e });
		}, async () => {
			let t = await this.#e.generation.submit(e);
			return this.#c(U(this.#t.workbench.jobs, t, (e) => e.job_id)), t;
		});
	}
	async cancel_generation(e) {
		let t = await this.#e.generation.cancel(e);
		this.#i || this.#c(U(this.#t.workbench.jobs, t, (e) => e.job_id));
	}
	async retry_generation(e) {
		let t = await this.#e.generation.retry(e);
		this.#i || this.#c(U(this.#t.workbench.jobs, t, (e) => e.job_id));
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
		return Vr(() => this.#t.prompt.save_command, (e) => {
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
		return Vr(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#d({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		return Vr(() => this.#t.settings.update_command, (e) => {
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
		return Vr(() => this.#t.diagnostics.connection_test_command, (e) => {
			this.#m({ connection_test_command: e });
		}, () => this.#e.diagnostics.test_connection());
	}
	export_support_bundle() {
		return Vr(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#m({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	retry_migration() {
		return Vr(() => this.#t.settings.migration_retry_command, (e) => {
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
		let t = await this.#e.profiles.save(e), n = t.is_default || this.#t.workbench.active_profile_id === null;
		return n && await this.#e.settings.update({ active_provider_profile_id: t.id }), this.#i || this.#s({
			profiles: U(this.#t.workbench.profiles, t, (e) => e.id),
			...n ? { active_profile_id: t.id } : {}
		}), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e), this.#i || this.#s({ profiles: this.#t.workbench.profiles.filter((t) => t.id !== e) });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	async set_provider_profile_credential(e, t) {
		let n = await this.#e.profiles.set_credential(e, t);
		return this.#i || this.#s({ profiles: U(this.#t.workbench.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#s({ profiles: U(this.#t.workbench.profiles, t, (e) => e.id) }), t;
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
	async #j(e) {
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
		let t = U(this.#t.library.personas, e, (e) => e.id);
		return e.is_active ? t.map((t) => t.id === e.id || t.role !== e.role ? t : {
			...t,
			is_active: !1
		}) : t;
	}
	async save_knowledge_entry(e) {
		let t = await this.#e.knowledge.save(e);
		return this.#i || this.#f({ knowledge: U(this.#t.library.knowledge, t, (e) => e.id) }), t;
	}
	async set_knowledge_entry_enabled(e, t) {
		let n = await this.#e.knowledge.set_enabled(e, t);
		return this.#i || this.#f({ knowledge: U(this.#t.library.knowledge, n, (e) => e.id) }), n;
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
		let t = U(this.#t.llm_connections.connections, e, (e) => e.id);
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
		return Vr(() => this.#t.gallery.bulk_delete_command, (e) => {
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
function Wr(e) {
	return new Ur(e);
}
//#endregion
//#region src/ui/controllers/use_studio_controller.ts
function Gr(e) {
	let t = Ce(Wr(e)), n = Oe(t.state), r = t.on_change(() => {
		n.value = t.state;
	});
	return t.start(), be(() => {
		r(), t.stop();
	}), {
		controller: t,
		state: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var Kr = Pe("image", [
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
]), qr = Pe("panel-right-close", [
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
]), Jr = Pe("panel-right-open", [
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
]), Yr = ["image", "video"], Xr = /^(?:blob:|data:image\/|data:video\/)/u, Zr = u({
	kind: te(Yr),
	url: v().min(1).refine((e) => Xr.test(e), { message: "Media asset URL must be a local blob: or data: URI, not a remote address" })
});
function Qr(e) {
	let t = Zr.safeParse(e);
	return t.success ? t.data : null;
}
function $r(e, t) {
	let n = e[t];
	return n === void 0 ? {
		state: t,
		asset: null
	} : {
		state: t,
		asset: Qr(n)
	};
}
var ei = 8;
function ti(e, t) {
	let n = Math.max(ei, t.width - 56 - ei), r = Math.max(ei, t.height - 56 - ei);
	return {
		x: Math.min(Math.max(e.x, ei), n),
		y: Math.min(Math.max(e.y, ei), r)
	};
}
function ni(e) {
	return ti({
		x: (e.width - 56) / 2,
		y: (e.height - 56) / 2
	}, e);
}
var ri = class {
	#e = /* @__PURE__ */ new Map();
	get(e) {
		return this.#e.get(e) ?? null;
	}
	set(e, t) {
		this.#e.set(e, t);
	}
};
function ii(e) {
	let t = Qr(e);
	return t !== null && t.kind === "image" ? t : null;
}
var ai = class {
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
		this.#n && (this.#t = ti(e, this.#e.get_viewport()));
	}
	end_drag() {
		let e = this.#n, t = this.#r;
		if (this.#n = !1, this.#r = null, !e || (this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t), t === null)) return { moved: !1 };
		let n = Math.abs(this.#t.x - t.x), r = Math.abs(this.#t.y - t.y);
		return { moved: n > 4 || r > 4 };
	}
	reset_position() {
		this.#t = ni(this.#e.get_viewport()), this.#e.position_store.set(this.#e.get_viewport_bucket(), this.#t);
	}
	reflow() {
		this.#t = this.#i();
	}
	#i() {
		let e = this.#e.position_store.get(this.#e.get_viewport_bucket()), t = this.#e.get_viewport();
		return e === null ? ni(t) : ti(e, t);
	}
}, oi = "(min-width: 960px)";
function si() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(oi).matches;
}
function ci(e) {
	if (e !== void 0) return M(() => e);
	let t = O(si());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(oi), n = (e) => {
			t.value = e.matches;
		};
		e.addEventListener("change", n), be(() => {
			e.removeEventListener("change", n);
		});
	}
	return M(() => t.value ? "desktop" : "mobile");
}
var li = {
	floatingEntry: "_floatingEntry_1k9dx_9",
	floatingEntryDragging: "_floatingEntryDragging_1k9dx_31",
	floatingEntryMedia: "_floatingEntryMedia_1k9dx_35"
}, ui = [
	"aria-label",
	"data-dragging",
	"data-media-state"
], di = ["src"], fi = ["src"], pi = /* @__PURE__ */ je({
	__name: "FloatingEntry",
	props: {
		enabled: { type: Boolean },
		mediaState: { default: "idle" },
		mediaAssets: { default: () => ({}) },
		openLabel: { default: "Open TavernCanvas Studio" },
		positionStore: { default: void 0 },
		viewportOverride: { default: void 0 }
	},
	emits: ["open"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ci(n.viewportOverride);
		function a() {
			return typeof window > "u" ? {
				width: 1280,
				height: 800
			} : {
				width: window.innerWidth,
				height: window.innerHeight
			};
		}
		let o = new ai({
			position_store: ke(n.positionStore) ?? Ce(new ri()),
			get_viewport: a,
			get_viewport_bucket: () => i.value
		}), s = O(o.position), c = O(o.dragging);
		function l() {
			s.value = o.position, c.value = o.dragging;
		}
		xe(i, () => {
			o.reflow(), l();
		});
		function u() {
			o.reflow(), l();
		}
		C(() => {
			window.addEventListener("resize", u);
		}), Ee(() => {
			window.removeEventListener("resize", u);
		});
		let d = M(() => {
			let e = c.value ? "dragging" : n.mediaState;
			return e === "idle" ? {
				state: e,
				asset: ii(n.mediaAssets.idle)
			} : $r(n.mediaAssets, e);
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
		return (t, n) => e.enabled ? (w(), T("button", {
			key: 0,
			type: "button",
			class: P(["tc-interactive", [D(li).floatingEntry, c.value && D(li).floatingEntryDragging]]),
			style: we({
				left: `${s.value.x}px`,
				top: `${s.value.y}px`
			}),
			"aria-label": e.openLabel,
			"data-dragging": c.value,
			"data-media-state": d.value.state,
			"data-shadow-role": "entry",
			onPointerdown: p,
			onClick: m,
			onKeydown: h
		}, [d.value.asset?.kind === "video" ? (w(), T("video", {
			key: 0,
			class: P(D(li).floatingEntryMedia),
			src: d.value.asset.url,
			autoplay: "",
			muted: "",
			loop: "",
			playsinline: ""
		}, null, 10, di)) : d.value.asset?.kind === "image" ? (w(), T("img", {
			key: 1,
			class: P(D(li).floatingEntryMedia),
			src: d.value.asset.url,
			alt: ""
		}, null, 10, fi)) : (w(), A(Fe, {
			key: 2,
			icon: D(Kr)
		}, null, 8, ["icon"]))], 46, ui)) : k("", !0);
	}
});
function mi(e, t, n) {
	let r = Math.max(20, t.width - n.width - 20), i = Math.max(20, t.height - n.height - 20);
	return {
		x: Math.min(Math.max(e.x, 20), r),
		y: Math.min(Math.max(e.y, 20), i)
	};
}
function hi(e, t) {
	return mi({
		x: e.width - t.width - 20,
		y: 64
	}, e, t);
}
var gi = {
	window: "_window_1rdvc_1",
	"floating-window-enter": "_floating-window-enter_1rdvc_1"
}, _i = [
	"aria-label",
	"data-positioned",
	"data-dragging"
], vi = /* @__PURE__ */ je({
	__name: "FloatingStudioWindow",
	props: { label: {} },
	setup(e) {
		let t = e, n = O(null), r = O({
			x: 0,
			y: 0
		}), i = O(!1), a = O(!1);
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
			r.value = i.value ? mi(r.value, t, a) : hi(t, a), i.value = !0;
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
				r.value = mi({
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
		return C(() => {
			window.addEventListener("resize", u), ve(c);
		}), Ee(() => {
			window.removeEventListener("resize", u);
		}), (e, o) => (w(), T("section", {
			ref_key: "window_element",
			ref: n,
			class: P(D(gi).window),
			style: we({
				"--tc-floating-window-x": `${r.value.x}px`,
				"--tc-floating-window-y": `${r.value.y}px`
			}),
			"aria-label": t.label,
			"data-positioned": i.value,
			"data-dragging": a.value,
			"data-window-role": "studio",
			role: "dialog",
			onPointerdown: l
		}, [_e(e.$slots, "default")], 46, _i));
	}
}), yi = /* @__PURE__ */ je({
	__name: "PortalProvider",
	props: { portalTarget: {} },
	setup(e) {
		let t = e;
		if (t.portalTarget === document.body) throw Error("PortalProvider must never receive document.body as the portal target -- pass the Shadow Root's dedicated [data-shadow-role=\"portal\"] element instead.");
		return ye(Be, t.portalTarget), (e, t) => _e(e.$slots, "default");
	}
});
//#endregion
//#region src/ui/shell/use_generation_preview_urls.ts
function bi(e, t) {
	let n = Oe({}), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
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
	return xe(() => e().workbench.jobs.flatMap((e) => e.completed_image_ids), (e) => {
		for (let t of e) a(t);
	}, { immediate: !0 }), be(() => {
		for (let e of Object.values(n.value)) URL.revokeObjectURL(e);
	}), n;
}
//#endregion
//#region src/ui/shell/StudioWorkspace.vue
var xi = /* @__PURE__ */ je({
	__name: "StudioWorkspace",
	props: {
		state: {},
		controller: {}
	},
	setup(e) {
		let t = E(() => import("./chunks/WorkbenchView-BGuYcMkm.js")), n = E(() => import("./chunks/PromptView-CFcqgRgh.js")), r = E(() => import("./chunks/AssetsView-DTiiaXtm.js")), i = E(() => import("./chunks/GalleryView-RGHFplEu.js")), a = E(() => import("./chunks/DiagnosticsView-Cyv9k-bi.js")), o = E(() => import("./chunks/SettingsView-BpZezWKB.js")), s = e, c = bi(() => s.state, s.controller);
		function l(e, t) {
			return s.controller.test_prompt_regex(e, t);
		}
		return (e, u) => s.state.route === "workbench" ? (w(), A(D(t), {
			key: 0,
			state: s.state,
			"preview-urls": D(c),
			onSelectProfile: u[0] ||= (e) => void s.controller.select_provider_profile(e),
			onSubmit: u[1] ||= (e) => void s.controller.submit_generation(e),
			onCancelJob: u[2] ||= (e) => void s.controller.cancel_generation(e),
			onRetryJob: u[3] ||= (e) => void s.controller.retry_generation(e),
			onOpenSettings: u[4] ||= (e) => s.controller.set_route("settings"),
			onConsumeInspectorSelection: u[5] ||= (e) => s.controller.select_inspector_record(null)
		}, null, 8, ["state", "preview-urls"])) : s.state.route === "prompt" ? (w(), A(D(n), {
			key: 1,
			state: s.state,
			"test-regex": l,
			onSelectPreset: u[6] ||= (e) => void s.controller.select_prompt_preset(e),
			onNewPreset: u[7] ||= (e) => s.controller.start_new_prompt_preset(),
			onBulkDeletePresets: u[8] ||= (e) => void s.controller.bulk_remove_prompt_presets(e),
			onUpdateDraft: u[9] ||= (e) => s.controller.update_prompt_draft(e),
			onSave: u[10] ||= (e) => void s.controller.save_prompt_preset(e)
		}, null, 8, ["state"])) : s.state.route === "assets" ? (w(), A(D(r), {
			key: 2,
			state: s.state,
			controller: s.controller
		}, null, 8, ["state", "controller"])) : s.state.route === "gallery" ? (w(), A(D(i), {
			key: 3,
			state: s.state,
			controller: s.controller
		}, null, 8, ["state", "controller"])) : s.state.route === "diagnostics" ? (w(), A(D(a), {
			key: 4,
			state: s.state,
			controller: s.controller
		}, null, 8, ["state", "controller"])) : (w(), A(D(o), {
			key: 5,
			state: s.state,
			controller: s.controller
		}, null, 8, ["state", "controller"]));
	}
}), Si = ["aria-label", "aria-expanded"], Ci = ["data-status"], wi = {
	key: 0,
	class: "tc-tabular-nums"
}, Ti = /* @__PURE__ */ je({
	__name: "TaskStrip",
	props: { tasks: {} },
	setup(t) {
		let n = t, { t: r, n: i } = De(), a = O(!0), o = {
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
		let c = M(() => a.value ? r("nav.task_strip_collapse") : r("nav.task_strip_expand"));
		function l() {
			a.value = !a.value;
		}
		return (t, o) => n.tasks.length > 0 ? (w(), T("div", {
			key: 0,
			class: P(D(e).task_strip)
		}, [j("div", { class: P(D(e).task_strip_header) }, [j("span", { class: P([D(e).task_strip_summary, "tc-tabular-nums"]) }, N(D(r)("nav.task_strip_count", n.tasks.length)), 3), j("button", {
			type: "button",
			class: P(["tc-interactive", D(e).icon_button]),
			"aria-label": c.value,
			"aria-expanded": a.value,
			onClick: l
		}, [Me(Fe, {
			icon: a.value ? D(Le) : D(Re),
			size: 16
		}, null, 8, ["icon"])], 10, Si)], 2), a.value ? (w(), T("div", {
			key: 0,
			class: P(D(e).task_strip_list)
		}, [(w(!0), T(Ae, null, ge(n.tasks, (t) => (w(), T("div", {
			key: t.id,
			class: P(D(e).task_chip)
		}, [
			j("span", {
				class: P(D(e).task_chip_dot),
				"data-status": t.status
			}, null, 10, Ci),
			j("span", { class: P(D(e).task_chip_label) }, N(s(t.label_code)), 3),
			t.progress === null ? k("", !0) : (w(), T("span", wi, N(D(i)(t.progress, "percent")), 1))
		], 2))), 128))], 2)) : k("", !0)], 2)) : k("", !0);
	}
}), Ei = ["aria-label", "aria-pressed"], Di = ["aria-label", "title"], Oi = /* @__PURE__ */ je({
	__name: "TopCommandBar",
	props: {
		route: {},
		inspectorCollapsed: { type: Boolean },
		inspectorAvailable: { type: Boolean }
	},
	emits: ["set-inspector-collapsed", "close"],
	setup(t, { emit: n }) {
		let r = t, i = n, { t: a } = De(), o = M(() => Ie(a, r.route)), s = M(() => r.inspectorCollapsed ? Jr : qr), c = M(() => r.inspectorCollapsed ? a("nav.inspector_expand") : a("nav.inspector_collapse"));
		function l() {
			i("set-inspector-collapsed", !r.inspectorCollapsed);
		}
		return (n, r) => (w(), T("header", {
			class: P(D(e).top_bar),
			"data-window-drag-handle": ""
		}, [j("div", { class: P(D(e).top_bar_start) }, [
			j("span", { class: P(D(e).top_bar_brand) }, N(D(a)("app.name")), 3),
			j("span", {
				class: P(D(e).top_bar_divider),
				"aria-hidden": "true"
			}, "/", 2),
			j("span", { class: P(D(e).top_bar_title) }, N(o.value), 3)
		], 2), j("div", { class: P(D(e).top_bar_end) }, [t.inspectorAvailable ? (w(), T("button", {
			key: 0,
			type: "button",
			class: P(["tc-interactive", D(e).icon_button]),
			"data-testid": "inspector-toggle",
			"aria-label": c.value,
			"aria-pressed": !t.inspectorCollapsed,
			onClick: l
		}, [Me(Fe, {
			icon: s.value,
			size: 18
		}, null, 8, ["icon"])], 10, Ei)) : k("", !0), j("button", {
			type: "button",
			class: P(["tc-interactive", [D(e).icon_button, D(e).close_button]]),
			"data-testid": "studio-close",
			"aria-label": D(a)("common.close"),
			title: D(a)("common.close"),
			onClick: r[0] ||= (e) => i("close")
		}, [Me(Fe, {
			icon: D(ze),
			size: 18
		}, null, 8, ["icon"])], 10, Di)], 2)], 2));
	}
}), ki = ["data-viewport", "data-inspector-collapsed"], Ai = ["aria-label"], ji = /* @__PURE__ */ je({
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
		let r = E(() => import("./chunks/ContextInspector-DmGCbgoz.js")), i = E(() => import("./chunks/DesktopIconRail-Bn1LP58w.js")), a = E(() => import("./chunks/InspectorSheet-DwRe5GKr.js")), o = E(() => import("./chunks/MobileBottomNav-DtmpLEpS.js")), s = t, c = n, { t: l } = De(), u = ci(s.viewport), d = /* @__PURE__ */ new Set(["vocabulary"]), f = M(() => [...s.state.loading].some((e) => !d.has(e))), p = M(() => s.state.failures.size > 0), m = M(() => ({ "--tc-inspector-width": `${String(s.state.inspector.width)}px` })), h = O(!1), g = M(() => s.state.route !== "workbench"), ee = M(() => !g.value || s.state.inspector.collapsed), te = M(() => u.value === "mobile" ? !h.value : ee.value);
		function _(e) {
			u.value === "mobile" && (h.value = !e), c("set-inspector-collapsed", e);
		}
		function v(e) {
			c("select-route", e);
		}
		return (t, n) => (w(), T("div", {
			class: P(D(e).shell),
			"data-viewport": D(u),
			"data-inspector-collapsed": D(u) === "desktop" ? ee.value : null,
			style: we(m.value)
		}, [
			Me(Oi, {
				route: s.state.route,
				"inspector-collapsed": te.value,
				"inspector-available": g.value,
				onSetInspectorCollapsed: _,
				onClose: n[0] ||= (e) => c("close")
			}, null, 8, [
				"route",
				"inspector-collapsed",
				"inspector-available"
			]),
			D(u) === "desktop" ? (w(), A(D(i), {
				key: 0,
				route: s.state.route,
				onSelect: v
			}, null, 8, ["route"])) : k("", !0),
			j("main", {
				class: P(D(e).workspace),
				"data-testid": "workspace"
			}, [p.value ? (w(), T("div", {
				key: 0,
				class: P(D(e).partial_banner),
				"data-testid": "partial-banner"
			}, [j("div", null, [j("p", null, N(D(l)("app.partial_init.banner_title")), 1), j("p", null, N(D(l)("app.partial_init.banner_description")), 1)]), j("button", {
				type: "button",
				class: P(["tc-interactive", D(e).icon_button]),
				"data-testid": "partial-banner-diagnostics",
				onClick: n[1] ||= (e) => v("diagnostics")
			}, N(D(Ie)(D(l), "diagnostics")), 3)], 2)) : k("", !0), f.value ? (w(), T("div", {
				key: 1,
				class: P(D(e).workspace_placeholder),
				"data-testid": "workspace-skeleton",
				role: "status",
				"aria-label": D(l)("status.loading")
			}, [
				j("div", {
					class: P(D(e).skeleton_block),
					style: {
						width: "40%",
						height: "20px"
					}
				}, null, 2),
				j("div", {
					class: P(D(e).skeleton_block),
					style: {
						width: "90%",
						height: "14px",
						"margin-top": "12px"
					}
				}, null, 2),
				j("div", {
					class: P(D(e).skeleton_block),
					style: {
						width: "75%",
						height: "14px",
						"margin-top": "8px"
					}
				}, null, 2)
			], 10, Ai)) : (w(), A(xi, {
				key: 2,
				state: s.state,
				controller: s.controller
			}, null, 8, ["state", "controller"]))], 2),
			D(u) === "desktop" && g.value && !s.state.inspector.collapsed ? (w(), A(D(r), {
				key: 1,
				width: s.state.inspector.width,
				selection: s.state.inspector.selected_record,
				onResize: n[2] ||= (e) => c("resize-inspector", e)
			}, null, 8, ["width", "selection"])) : k("", !0),
			Me(Ti, { tasks: s.state.tasks }, null, 8, ["tasks"]),
			D(u) === "mobile" ? (w(), A(D(o), {
				key: 2,
				route: s.state.route,
				onSelect: v
			}, null, 8, ["route"])) : k("", !0),
			D(u) === "mobile" && g.value ? (w(), A(D(a), {
				key: 3,
				open: h.value,
				selection: s.state.inspector.selected_record,
				"onUpdate:open": n[3] ||= (e) => _(!e)
			}, null, 8, ["open", "selection"])) : k("", !0)
		], 14, ki));
	}
}), Mi = ["href"], Ni = /* @__PURE__ */ je({
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
		let n = t, { t: r } = De();
		function i() {
			return typeof window > "u" || typeof window.matchMedia != "function" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		let a = n.hostElement, o = i();
		a.dataset.colorMode = o;
		let s = M(() => n.probe.ready ? void 0 : n.probe.current_version), c = M(() => `${r("app.name")} ${r("app.version_label", { version: n.version })}`), l = n.status.state === "ready" ? Gr({
			capabilities: n.capabilities ?? jr(),
			initial_color_mode: o
		}) : null;
		l && xe(() => l.state.value.color_mode, (e) => {
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
		let m = M(() => l?.state.value.settings.settings?.ui.optional_entry_enabled === !0), h = O(!m.value), g = M(() => h.value);
		xe(m, (e, t) => {
			e && !t ? h.value = !1 : !e && t && (h.value = !0);
		}), xe(g, (e) => {
			a.dataset.surfaceMode = e ? "studio" : "entry";
		}, { immediate: !0 });
		function ee() {
			h.value = !0;
		}
		function te() {
			h.value = !1;
		}
		return (n, i) => (w(), A(yi, { "portal-target": t.portalTarget }, {
			default: Se(() => [t.status.state === "blocked" ? (w(), T("div", {
				key: 0,
				class: P(D(e).state_screen),
				"data-startup-state": "blocked"
			}, [
				j("p", { class: P(D(e).state_screen_eyebrow) }, N(c.value), 3),
				j("h1", { class: P(D(e).state_screen_title) }, N(D(r)("app.unsupported_host.title")), 3),
				j("p", { class: P(D(e).state_screen_description) }, N(D(r)("app.unsupported_host.description", {
					required_version: D(hr),
					current_version: s.value ?? D(r)("status.unknown")
				})), 3),
				j("a", {
					class: P(["tc-interactive", D(e).state_screen_action]),
					href: t.status.update_url,
					target: "_blank",
					rel: "noreferrer"
				}, N(D(r)("app.unsupported_host.update_action")), 11, Mi)
			], 2)) : t.status.state === "failed" ? (w(), T("div", {
				key: 1,
				class: P(D(e).state_screen),
				"data-startup-state": "failed"
			}, [
				j("p", { class: P(D(e).state_screen_eyebrow) }, N(c.value), 3),
				j("h1", { class: P(D(e).state_screen_title) }, N(D(r)("app.fatal_error.title")), 3),
				j("p", { class: P(D(e).state_screen_description) }, N(D(r)("app.fatal_error.description")), 3),
				j("button", {
					type: "button",
					class: P(["tc-interactive", D(e).state_screen_action]),
					onClick: p
				}, N(D(r)("app.fatal_error.reload_action")), 3)
			], 2)) : D(l) ? (w(), T(Ae, { key: 2 }, [g.value ? (w(), A(vi, {
				key: 0,
				label: D(r)("app.name")
			}, {
				default: Se(() => [Me(ji, {
					state: D(l).state.value,
					controller: D(l).controller,
					onSelectRoute: u,
					onSetInspectorCollapsed: d,
					onResizeInspector: f,
					onClose: te
				}, null, 8, ["state", "controller"])]),
				_: 1
			}, 8, ["label"])) : k("", !0), Me(pi, {
				enabled: !g.value,
				"open-label": D(r)("app.name"),
				onOpen: ee
			}, null, 8, ["enabled", "open-label"])], 64)) : k("", !0)]),
			_: 1
		}, 8, ["portal-target"]));
	}
});
//#endregion
//#region src/ui/create_shadow_root.ts
function Pi(e, t) {
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
var Fi = ["image_records", "image_blobs"], Ii = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, Li = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, Ri = class extends He {
	constructor(e) {
		super(e, "image_records", Ye);
	}
};
async function zi(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function Bi(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function Vi(e, t, i, a) {
	let o = Je(i);
	if (o === void 0 || o !== a) throw new Li(a);
	let s = Ue.parse(r(n(i))), c = await t.get(s, e);
	if (c === null) {
		let n = await Bi(e, s) + 1, r = {
			sha256: s,
			ref_count: n,
			byte_length: i.byteLength,
			blob: new Blob([new Uint8Array(i)], { type: o })
		};
		return await t.create(r, e), {
			sha256: s,
			byte_length: r.byte_length,
			media_type: o,
			ref_count: n
		};
	}
	let l = {
		...c,
		ref_count: c.ref_count + 1
	};
	return await t.put(l, e), {
		sha256: s,
		byte_length: c.byte_length,
		media_type: o,
		ref_count: l.ref_count
	};
}
async function Hi(e, t, n) {
	let r = Ue.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function Ui(e, t, i) {
	let a = Ue.parse(i), o = await t.get(a, e);
	if (o === null) return null;
	let s = await zi(o.blob);
	if (r(n(s)) !== a) throw new Ii(a);
	return s;
}
async function Wi(e, t, n, r, i) {
	let a = await Vi(e, n, i.bytes, i.claimed_media_type), o = {
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
async function Gi(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new Ve("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await Hi(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function Ki(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = Ge.safeParse(n);
		if (!r.success || !Qe(r.data)) continue;
		let i = r.data;
		i.quarantined || await t.update(i.namespace, {
			...i,
			quarantined: !0
		}, e);
	}
}
async function qi(e, t, n) {
	let r = new Ri(e), i = new Ze(e);
	return Ke(e, Fi, (e) => Wi(e, r, i, t, n));
}
async function Ji(e, t, n) {
	let r = new Ri(e), i = new Ze(e);
	return Ke(e, Fi, (e) => Gi(e, r, i, t, n));
}
async function Yi(e, t) {
	let n = new Ri(e), r = new Ze(e), i = await Ke(e, Fi, async (e) => {
		try {
			return { bytes: await Ui(e, r, t) };
		} catch (t) {
			if (!(t instanceof Ii)) throw t;
			return await Ki(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
//#region src/modules/media/chat_media_interactions.ts
function Xi(e) {
	return {
		available: !1,
		reason: e
	};
}
var Zi = class {
	capability = Xi("Standard SillyTavern host exposes no message-media gesture hook; use Gallery or the image parameters dialog instead.");
	subscribe(e) {
		return () => {};
	}
}, Qi = class {
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
function $i(e) {
	return Ut.parse({
		schema_version: 1,
		chat_id: e.chat_id,
		active_swipes: e.messages.map((e) => ({
			message_id: e.message_id,
			swipe_id: e.active_swipe_id
		})),
		messages: e.messages.map((e) => ({
			message_id: e.message_id,
			role: e.role,
			content_sha256: r(n(a(e.swipes.find((t) => t.swipe_id === e.active_swipe_id)?.content ?? ""))),
			swipe_id: e.active_swipe_id
		}))
	});
}
var ea = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async resolve() {
		let e = await this.#e.get_active_chat(), t = wt($i(e), this.#t), n = e.messages.at(-1);
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
function ta(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function na(e, t) {
	return e.find((e) => e.message_id === t) ?? null;
}
function ra(e, t) {
	return e.swipes.find((e) => e.swipe_id === t) ?? null;
}
function ia(e) {
	let t = e.metadata[Qn];
	if (t === void 0) return null;
	let n = Ht.safeParse(t);
	return n.success ? n.data : null;
}
function aa(e) {
	let t = e.data.extra;
	if (!ta(t) || !Array.isArray(t.media)) return [];
	let n = [];
	for (let e of t.media) {
		if (!ta(e)) continue;
		let t = h.safeParse(e.image_id);
		t.success && n.push(Object.freeze({
			...e,
			image_id: t.data
		}));
	}
	return Object.freeze(n);
}
var oa = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async find_target(e) {
		let t = await this.#e.get_active_chat();
		if (t.chat_id !== e.chat_id) return null;
		let n = na(t.messages, e.message_id);
		if (n === null) return null;
		let r = ra(n, e.swipe_id);
		if (r === null) return null;
		let i = ia(r);
		return i !== null && i.generation_anchor !== e.generation_anchor ? null : Object.freeze({
			chat_id: t.chat_id,
			message_id: n.message_id,
			swipe_id: r.swipe_id,
			generation_anchor: i?.generation_anchor ?? e.generation_anchor,
			metadata: i,
			media: aa(r)
		});
	}
	async update_target(e) {
		let t = await this.#e.get_active_chat();
		if (t.chat_id !== e.chat_id) throw Error(`Host chat ${e.chat_id} is not active`);
		let n = na(t.messages, e.message_id), r = n === null ? null : ra(n, e.swipe_id);
		if (n === null || r === null) throw Error(`Host message ${String(e.message_id)} swipe ${String(e.swipe_id)} no longer exists`);
		let i = ia(r);
		if (i !== null && i.generation_anchor !== e.metadata.generation_anchor) throw Error("Host message generation anchor changed before attachment");
		await this.#e.update_message({
			message_id: n.message_id,
			swipe_id: r.swipe_id,
			content: r.content,
			metadata: Ht.parse(e.metadata),
			media: e.media.map((e) => ({ ...e }))
		});
	}
	subscribe_final_assistant(e) {
		let t = !0, n = this.#e.subscribe_generation((n) => {
			if (n.phase !== "ended") return;
			let r = this.#t.resolve(n.message_id);
			r !== null && this.#e.get_active_chat().then((i) => {
				if (!t) return;
				let a = na(i.messages, n.message_id);
				a !== null && e({
					chat_id: i.chat_id,
					message_id: a.message_id,
					swipe_id: a.active_swipe_id,
					role: a.role,
					is_final: a.role === "assistant" && !a.is_hidden,
					generation_anchor: y.parse(r.generation_anchor),
					source_anchor: y.parse(r.source_anchor),
					request_ids: r.request_ids.map((e) => f.parse(e))
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
				let i = na(r.messages, n.message_id);
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
}, sa = Object.freeze({
	chat_id: "",
	messages: Object.freeze([])
});
function ca(e, t) {
	let n = t.messages.at(-1);
	if (n === void 0) return 0;
	switch (e) {
		case "swipe": return n.swipes.length;
		case "continue": return n.active_swipe_id;
		default: return 0;
	}
}
var la = class {
	#e;
	#t;
	#n;
	#r;
	#i = /* @__PURE__ */ new Map();
	#a = sa;
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
			requested_swipe_id: ca(e.generation_type, this.#a)
		}), t;
	}
	complete(e) {
		this.#t.complete(e.host_root_generation_id);
	}
	resolve(e) {
		let t = this.#o;
		return t === null ? null : {
			generation_anchor: y.parse(t.generation_anchor),
			source_anchor: y.parse(t.source_anchor),
			request_ids: [...t.request_ids].map((e) => f.parse(e))
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
			source_context: $i(this.#a)
		}), this.#s = !1, this.#p());
	}
	#p() {
		let e = this.#o;
		if (e === null || !this.#r()) {
			this.#e.set_trigger_injection(null);
			return;
		}
		let t = this.#e.can_use_native_tools() ? "native_tool" : "fallback_comment";
		this.#e.set_trigger_injection(an(t, e.generation_anchor).host_injection);
	}
}, ua = class {
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
}, da = class {
	#e;
	constructor(e) {
		this.#e = e;
	}
	enqueue(e) {
		let t = this.#e.provider_id();
		if (t === null) throw Error("No provider profile is active, so an automatic image cannot be generated");
		let n = this.#e.targets.target(e.generation_anchor);
		if (n === null) throw Error(`Generation anchor ${e.generation_anchor} has no chat target to attach to`);
		let r = this.#e.model_id();
		import("./chunks/build_generation_request-CEm_MXO4.js").then((e) => e.n).then(({ build_provider_request: i }) => {
			let a = i({
				provider_id: t,
				positive_prompt: e.arguments.scene_description,
				negative_prompt: e.arguments.negative_constraints ?? "",
				image_count: e.arguments.image_count ?? 1,
				references: [],
				...r === null ? {} : { model_id: r }
			}, e.request_id, e.generation_anchor);
			return this.#e.plans.register(e.request_id, {
				kind: "adapter",
				request: a
			}), this.#e.queue.enqueue({
				request_id: e.request_id,
				generation_anchor: e.generation_anchor,
				source_anchor: e.source_anchor,
				chat_id: n.chat_id,
				requested_swipe_id: n.requested_swipe_id,
				provider_id: t,
				arguments: e.arguments,
				automatic: !0
			});
		}).catch(() => {
			this.#e.plans.take(e.request_id);
		});
	}
}, fa = class {
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
				let t = e.message_id, n = this.#t.active_session;
				queueMicrotask(() => {
					this.#i(t, n);
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
	async #i(e, t) {
		let n = this.#n;
		if (this.#n = "", n.length === 0 || t === null) return;
		let r;
		try {
			let i = (await this.#e.get_active_chat()).messages.find((t) => t.message_id === e);
			if (r = i?.swipes.find((e) => e.swipe_id === i.active_swipe_id), r === void 0 || !r.content.includes("<!-- tavern-canvas:image ")) return;
			await this.#e.update_message({
				message_id: e,
				swipe_id: r.swipe_id,
				content: n,
				metadata: Ht.parse({
					schema_version: 1,
					generation_anchor: t.generation_anchor,
					source_anchor: t.source_anchor,
					request_ids: [...t.request_ids],
					image_ids: []
				}),
				media: aa(r).map((e) => ({ ...e }))
			});
		} catch {}
	}
};
//#endregion
//#region src/modules/generation/generation_trigger_module.ts
function pa(e) {
	if (e.length > 0) throw AggregateError(e, "Generation trigger cleanup failed");
}
var ma = class {
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
		return pa(e), Promise.resolve();
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
			if (this.#e.can_use_native_tools()) {
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
			let e = new Xt(t.generation_anchor, this.#i()), n = this.#e.subscribe_generation_chunk((n) => {
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
		pa(t);
	}
}, ha = "data-tavern-canvas-image-id", ga = 500, _a = 8;
function va(e) {
	let t = e.getAttribute(ha);
	if (t === null) return null;
	let n = h.safeParse(t);
	return n.success ? n.data : null;
}
function ya(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(`[${ha}]`);
	return t === null ? null : va(t);
}
function ba(e, t) {
	return e instanceof Error ? e.message : t;
}
var xa = class {
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
		this.#e = e.globals, this.#t = e.port, this.#n = e.connect ?? Zn;
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
				reason: ba(e, "TauriTavern connection failed")
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
				reason: ba(e, "TauriTavern ChatSurface registration failed")
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
			let t = ya(e.target);
			t !== null && l("click", t);
		}
		function d(e) {
			let t = ya(e.target);
			t !== null && l("double_click", t);
		}
		function f(e) {
			let t = ya(e.target);
			t !== null && (e.preventDefault(), l("context", t));
		}
		function p(e) {
			let t = ya(e.target);
			t !== null && (a = {
				x: e.clientX,
				y: e.clientY
			}, o = t, s = !1, i = setTimeout(() => {
				o !== null && (s = !0, l("long_press", o));
			}, ga));
		}
		function m(e) {
			if (a === null) return;
			let t = Math.abs(e.clientX - a.x), n = Math.abs(e.clientY - a.y);
			(t > _a || n > _a) && c();
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
function Sa(e, t) {
	return e instanceof Error ? e.message : t;
}
var Ca = class {
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
		this.#e = e.globals, this.#t = e.connect ?? Zn;
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
				reason: Sa(e, "TauriTavern connection failed")
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
				reason: Sa(e, "TauriTavern WorldInfo activation subscription failed")
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
}, wa = "tavern_canvas", Ta = /* @__PURE__ */ new Set([
	"profiles",
	"workflows",
	"image_data",
	"vocabulary_data",
	"logs"
]), Ea = new Set(Object.keys(S.shape)), Da = new Set(Object.keys(se.shape)), Oa = new Set(Object.keys(x.shape)), ka = {
	schema_version: 1,
	active_namespace: "primary",
	locale: "auto",
	credential_storage_mode: "host",
	active_provider_profile_id: null,
	global_concurrency: 4,
	auto_generation_enabled: !0,
	fallback_generation_enabled: !0,
	vocabulary_update_channel: "bundled",
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
function Aa(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ja() {
	return structuredClone(ka);
}
function Ma(e) {
	return JSON.stringify(e);
}
function Na(e) {
	try {
		let t = Ma(e);
		return t === void 0 ? 0 : new TextEncoder().encode(t).length;
	} catch {
		return null;
	}
}
function Pa(e, t, n, r) {
	for (let i of Object.keys(e)) {
		if (t.has(i)) continue;
		let e = n === "" ? i : `${n}.${i}`, a = Ta.has(i) ? "disallowed_category" : "unknown_field";
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
function Fa(e, t, n) {
	if (!Aa(e)) return e !== void 0 && n.push({
		path: t,
		code: "invalid_value"
	}), {};
	let { keyType: r, valueType: i } = se.shape.http_acknowledgments, a = {};
	for (let [o, s] of Object.entries(e)) {
		let e = r.safeParse(o), c = i.safeParse(s);
		e.success && c.success ? a[e.data] = c.data : n.push({
			path: `${t}.${o}`,
			code: "invalid_value"
		});
	}
	return a;
}
function Ia(e, t) {
	let n = ka.gateway;
	return Aa(e) ? (Pa(e, Da, "gateway", t), {
		endpoint: W(se.shape.endpoint, e.endpoint, n.endpoint, "gateway.endpoint", t),
		token_secret_id: W(se.shape.token_secret_id, e.token_secret_id, n.token_secret_id, "gateway.token_secret_id", t),
		http_acknowledgments: Fa(e.http_acknowledgments, "gateway.http_acknowledgments", t)
	}) : (e !== void 0 && t.push({
		path: "gateway",
		code: "invalid_value"
	}), { ...n });
}
function La(e, t) {
	let n = ka.ui;
	return Aa(e) ? (Pa(e, Oa, "ui", t), {
		color_mode: W(x.shape.color_mode, e.color_mode, n.color_mode, "ui.color_mode", t),
		inspector_width: W(x.shape.inspector_width, e.inspector_width, n.inspector_width, "ui.inspector_width", t),
		inspector_collapsed: W(x.shape.inspector_collapsed, e.inspector_collapsed, n.inspector_collapsed, "ui.inspector_collapsed", t),
		optional_entry_enabled: W(x.shape.optional_entry_enabled, e.optional_entry_enabled, n.optional_entry_enabled, "ui.optional_entry_enabled", t)
	}) : (e !== void 0 && t.push({
		path: "ui",
		code: "invalid_value"
	}), { ...n });
}
function Ra(e, t) {
	if (e === void 0) return ja();
	let n = Na(e);
	if (n === null || n > 65536) return t.push({
		path: wa,
		code: n === null ? "invalid_value" : "serialized_size_exceeded"
	}), ja();
	if (!Aa(e)) return t.push({
		path: wa,
		code: "invalid_value"
	}), ja();
	Pa(e, Ea, "", t);
	let r = ka;
	return {
		schema_version: W(S.shape.schema_version, e.schema_version, r.schema_version, "schema_version", t),
		active_namespace: W(S.shape.active_namespace, e.active_namespace, r.active_namespace, "active_namespace", t),
		locale: W(S.shape.locale, e.locale, r.locale, "locale", t),
		credential_storage_mode: W(le, e.credential_storage_mode, r.credential_storage_mode, "credential_storage_mode", t),
		active_provider_profile_id: W(S.shape.active_provider_profile_id, e.active_provider_profile_id, r.active_provider_profile_id, "active_provider_profile_id", t),
		global_concurrency: W(S.shape.global_concurrency, e.global_concurrency, r.global_concurrency, "global_concurrency", t),
		auto_generation_enabled: W(S.shape.auto_generation_enabled, e.auto_generation_enabled, r.auto_generation_enabled, "auto_generation_enabled", t),
		fallback_generation_enabled: W(S.shape.fallback_generation_enabled, e.fallback_generation_enabled, r.fallback_generation_enabled, "fallback_generation_enabled", t),
		vocabulary_update_channel: W(S.shape.vocabulary_update_channel, e.vocabulary_update_channel, r.vocabulary_update_channel, "vocabulary_update_channel", t),
		gateway: Ia(e.gateway, t),
		ui: La(e.ui, t)
	};
}
function za(e) {
	let { extension_settings: t, save_settings: n, scheduler: r } = e, i = [], a = Ra(t[wa], i);
	t[wa] = a;
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
		return a = e, t[wa] = a, o = !0, l(), a;
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
			return u(S.parse(t));
		},
		replace_settings(e) {
			return u(S.parse(e));
		},
		flush: c,
		async stop() {
			await c();
		}
	};
}
//#endregion
//#region src/host/sillytavern_secret_resolver.ts
var Ba = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "SecretResolutionError", this.code = e;
	}
}, Va = "SillyTavern refused to reveal the stored credential. Set allowKeysExposure to true in config.yaml to allow direct provider calls, or route this profile through the Gateway instead.", Ha = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = wn(t);
	}
	async resolve_secret(e) {
		if (!g.safeParse(e).success) throw new Ba("invalid_reference", "A provider credential must be named by a tavern_canvas: vault reference");
		let t;
		try {
			t = await this.#t("/api/secrets/view", {
				method: "POST",
				headers: Ln(this.#e.getRequestHeaders()),
				body: JSON.stringify({})
			});
		} catch {
			throw new Ba("unavailable", "The host secret vault could not be reached");
		}
		if (!t.ok) throw t.status === 403 ? new Ba("not_exposed", Va) : t.status === 404 ? new Ba("not_found", "The host vault holds no such credential") : new Ba("unavailable", `The host secret vault answered with status ${String(t.status)}`);
		let n;
		try {
			n = await t.json();
		} catch {
			throw new Ba("unavailable", "The host secret vault returned an unreadable response");
		}
		let r;
		if (typeof n == "object" && n && !Array.isArray(n) && e in n && (r = Reflect.get(n, e)), typeof r != "string" || r.trim().length === 0) throw new Ba("not_found", "The host vault holds no such credential");
		return r;
	}
};
function Ua(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Wa(e, t) {
	return !Ua(e) || typeof t != "function" ? null : new Ha(e, t);
}
//#endregion
//#region src/host/secret_backend_router.ts
var Ga = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		this.#e = e.mode, this.#t = e.host_destination, this.#n = e.host_resolver, this.#r = e.browser_vault;
	}
	get has_destination() {
		return this.#t !== null || this.#r !== null;
	}
	get has_resolver() {
		return this.#n !== null || this.#r !== null;
	}
	supports(e) {
		return this.#i()?.supports(e) ?? !1;
	}
	async write_secret(e, t) {
		let n = this.#i();
		if (n === null) throw Error(`${this.#o()} credential storage is unavailable`);
		return n.write_secret(e, t);
	}
	async delete_secret(e) {
		let t = this.#i();
		if (t === null) throw Error(`${this.#o()} credential storage is unavailable`);
		if (t.delete_secret === void 0) throw Error(`${this.#o()} credential storage does not support deletion`);
		return t.delete_secret(e);
	}
	async probe_secret(e) {
		let t = this.#i();
		return t !== null && t.probe_secret(e);
	}
	async resolve_secret(e) {
		let t = this.#a();
		if (t === null) throw new Ba("unsupported_host", `${this.#o()} credential storage cannot reveal credentials`);
		return t.resolve_secret(e);
	}
	#i() {
		return this.#e() === "browser_encrypted" ? this.#r : this.#t;
	}
	#a() {
		return this.#e() === "browser_encrypted" ? this.#r : this.#n;
	}
	#o() {
		return this.#e() === "browser_encrypted" ? "Encrypted browser" : "Host";
	}
}, G = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
};
function Ka(e) {
	try {
		if (!Ja(e)) throw Xa("Provider operation is invalid");
		let { route: t, method: n, body: r, max_request_bytes: i, content_type: a, accept: o, max_response_bytes: s, signal: c } = e, l = r === void 0 ? i === void 0 : typeof i == "number" && Number.isSafeInteger(i) && i > 0 && i <= 2e8;
		if (typeof t != "string" || n !== "GET" && n !== "POST" && n !== "DELETE" || r !== void 0 && !(r instanceof Uint8Array) || r !== void 0 && r instanceof Uint8Array && typeof i == "number" && r.byteLength > i || !l || !Ya(a) || !Ya(o) || typeof s != "number" || !Number.isSafeInteger(s) || s <= 0 || !(c instanceof AbortSignal) || c.aborted) throw Xa("Provider operation is invalid");
		if (rt(t), r === void 0) return {
			route: t,
			method: n,
			...a === void 0 ? {} : { content_type: a },
			...o === void 0 ? {} : { accept: o },
			max_response_bytes: s,
			signal: c
		};
		if (!(r instanceof Uint8Array) || typeof i != "number") throw Xa("Provider operation is invalid");
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
		throw e instanceof G ? e : Xa("Provider operation is invalid", e);
	}
}
function qa(e) {
	try {
		if (!Ja(e)) throw Xa("Remote provider asset operation is invalid");
		let { url: t, allowed_origins: n, max_bytes: r, signal: i } = e;
		if (typeof t != "string" || !Array.isArray(n) || n.length === 0 || !n.every((e) => typeof e == "string") || typeof r != "number" || !Number.isSafeInteger(r) || r <= 0 || !(i instanceof AbortSignal) || i.aborted) throw Xa("Remote provider asset operation is invalid");
		let a = new URL(t), o = n.map(at);
		if (a.protocol !== "https:" || a.username.length > 0 || a.password.length > 0 || a.hash.length > 0 || !o.includes(a.origin)) throw Xa("Remote provider asset URL is not allowlisted");
		return {
			url: a.href,
			allowed_origins: Object.freeze(o),
			max_bytes: r,
			signal: i
		};
	} catch (e) {
		throw e instanceof G ? e : Xa("Remote provider asset operation is invalid", e);
	}
}
function Ja(e) {
	if (typeof e != "object" || !e) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function Ya(e) {
	if (e === void 0) return !0;
	if (typeof e != "string" || e.length === 0 || e.length > 1024) return !1;
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !1;
	}
	return !0;
}
function Xa(e, t) {
	return new G("configuration", e, t === void 0 ? void 0 : { cause: t });
}
//#endregion
//#region src/transport/browser_fetch.ts
async function Za(e, t, n, r) {
	let i;
	try {
		i = await e(t, {
			...n,
			cache: "no-store",
			credentials: "omit",
			redirect: "error"
		});
	} catch (e) {
		throw n.signal?.aborted ? new DOMException("Provider request was aborted", "AbortError") : new it({ cause: e });
	}
	let a = Number(i.headers.get("content-length"));
	if (Number.isFinite(a) && a > r) {
		if (i.body !== null) try {
			await i.body.cancel();
		} catch {}
		throw new G("malformed_response", "Provider response exceeds the byte limit");
	}
	let o = await Qa(i.body, r, n.signal);
	return {
		status: i.status,
		headers: Object.fromEntries(i.headers.entries()),
		body: o
	};
}
async function Qa(e, t, n) {
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
		throw n?.aborted === !0 ? new DOMException("Provider request was aborted", "AbortError") : e instanceof G ? e : new it({ cause: e });
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
var $a = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = e.catalog_entry, this.#t = e.credential_reference, this.#n = e.secrets, this.#r = e.fetch ?? globalThis.fetch.bind(globalThis), this.#i = e.log ?? null;
	}
	async execute(e) {
		let t = Ka(e), n = no(this.#e, t.route), r = await ro(this.#e, this.#t, this.#n, {
			...t.content_type === void 0 ? {} : { "content-type": t.content_type },
			...t.accept === void 0 ? {} : { accept: t.accept }
		}), i = Date.now(), a = await to(Za(this.#r, n, {
			method: t.method,
			...t.body === void 0 ? {} : { body: new Uint8Array(t.body).buffer },
			headers: r,
			signal: t.signal
		}, t.max_response_bytes));
		return this.#i?.write(nt({
			route: t.route,
			method: t.method,
			status_code: a.status,
			duration_ms: Date.now() - i,
			byte_length: a.body.byteLength,
			headers: r
		})), a;
	}
	async fetch_remote_asset(e) {
		let t = qa(e);
		return Za(this.#r, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, eo = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e.secrets, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	async execute(e) {
		let t = Bt(e.provider_kind);
		if (t === null) throw new G("configuration", "This LLM dialect has no direct route catalog entry");
		let n = no(t, e.route), r = await ro(t, e.credential_reference, this.#e, e.body === void 0 ? { accept: "application/json" } : {
			"content-type": "application/json",
			accept: "application/json"
		}), i = await to(Za(this.#t, n, {
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
async function to(e) {
	try {
		return await e;
	} catch (e) {
		throw e instanceof it ? new it() : e;
	}
}
function no(e, t) {
	try {
		return Vt(e, t);
	} catch (e) {
		throw e instanceof Rt ? new G("configuration", e.message) : e;
	}
}
async function ro(e, t, n, r) {
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
		throw new G("configuration", io(e));
	}
	return i[e.auth.header] = e.auth.kind === "bearer" ? `Bearer ${a}` : a, i;
}
function io(e) {
	return e instanceof Error && e.name === "SecretResolutionError" && e.message.trim() !== "" ? e.message : "The stored provider credential could not be resolved from the selected credential storage";
}
//#endregion
//#region src/transport/local_direct_transport.ts
var ao = class {
	#e;
	#t;
	constructor(e) {
		let t;
		try {
			t = at(e.base_url);
		} catch (e) {
			throw new G("configuration", "Direct provider base URL is invalid", { cause: e });
		}
		if (!ot(t)) throw new G("configuration", "Direct provider base URL must use a loopback address");
		this.#e = t, this.#t = e.fetch ?? globalThis.fetch.bind(globalThis);
	}
	execute(e) {
		let t = Ka(e);
		return Za(this.#t, `${this.#e}${t.route}`, {
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
		let t = qa(e);
		return Za(this.#t, t.url, {
			method: "GET",
			signal: t.signal
		}, t.max_bytes);
	}
}, oo = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "TransportConfigurationError";
	}
};
function so(e) {
	if (e.gateway_endpoint !== null) {
		let t = lo(e.gateway_endpoint);
		if (st(t) && !ct(e.http_acknowledgments, t)) throw new oo("Cleartext Gateway origin has not been acknowledged");
		return {
			kind: "gateway",
			endpoint: t
		};
	}
	if (e.tauri_provider_available) return { kind: "tauri" };
	if (e.sillytavern_available) return { kind: "host_proxy" };
	let t = co(e.direct_cloud);
	if (t !== null) return t;
	if (e.direct_provider_base_url !== null) {
		let t = lo(e.direct_provider_base_url);
		if (!ot(t)) throw new oo("Direct provider endpoint must use a loopback address");
		return {
			kind: "local_direct",
			endpoint: t
		};
	}
	throw new oo("No provider transport is available");
}
function co(e) {
	if (e === null || zt(e.provider_id) === null) return null;
	if (e.credential_reference === null) throw new oo("This provider needs a stored credential before it can be called directly; set one on the active profile or configure a Gateway");
	if (!e.secrets_readable) throw new oo("This host cannot reveal stored credentials, so a direct provider call is impossible; configure a Gateway instead");
	return {
		kind: "direct_cloud",
		provider_id: e.provider_id,
		credential_reference: e.credential_reference
	};
}
function lo(e) {
	try {
		return at(e);
	} catch (e) {
		throw new oo("Transport endpoint is invalid", { cause: e });
	}
}
//#endregion
//#region src/bootstrap/capability_resolution.ts
function uo(e) {
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
		return uo(e());
	} catch (e) {
		return K(fo(e));
	}
}
function fo(e) {
	return e instanceof Error && e.message.trim() !== "" ? e.message : "Capability construction failed";
}
function po(e, t) {
	return {
		capability_id: e,
		status: t.status,
		reason: t.status === "unavailable" ? t.reason : null
	};
}
var mo = "capability_unavailable";
function J(e) {
	let t = Error(e);
	return Object.defineProperty(t, "code", { value: mo }), t;
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
function ho(e, t) {
	let n = e[t];
	return typeof n == "string" ? n : null;
}
function go(e, t, n) {
	let r = e[t];
	return typeof r == "boolean" ? r : n;
}
function _o(e, t, n) {
	let r = e[t];
	return typeof r == "number" && Number.isFinite(r) ? r : n;
}
function vo(e, t) {
	let n = e[t];
	return Array.isArray(n) ? n : [];
}
function yo(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e != "object") return null;
	if (t.has(e)) throw TypeError("Record payload contains a cycle");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return e.map((e) => yo(e, n));
	let r = {};
	for (let [t, i] of Object.entries(e)) i !== void 0 && (r[t] = yo(i, n));
	return r;
}
var bo = class {
	#e = /* @__PURE__ */ new Set();
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	emit(e) {
		for (let t of [...this.#e]) t(e);
	}
}, xo = "No v3 store exists for this asset category yet; character, vibe and workflow assets are stored, the rest are not.", So = [
	"character",
	"outfit",
	"lora",
	"vibe",
	"reference",
	"workflow"
];
function Co(e, t) {
	switch (t) {
		case "character": return e.character_profiles;
		case "vibe": return e.novelai_vibes;
		case "workflow": return e.comfy_workflows;
		case "outfit":
		case "lora":
		case "reference": return null;
	}
}
function wo(e, t) {
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
function To(e, t) {
	let n = _o(X(e), "order", 2 ** 53 - 1), r = _o(X(t), "order", 2 ** 53 - 1);
	return n === r ? e.id < t.id ? -1 : +(e.id > t.id) : n - r;
}
function Eo(e) {
	let t = new bo();
	function n(t) {
		let n = Co(e.repositories, t);
		if (n === null) throw J(xo);
		return n;
	}
	async function r(t) {
		let n = Co(e.repositories, t);
		return n === null ? [] : [...await n.list(e.namespace())].sort(To).map((e) => wo(e, t));
	}
	return {
		async load() {
			let e = await Promise.all(So.map(async (e) => [e, await r(e)]));
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
				payload: yo({
					...i.payload,
					display_name: i.display_name
				})
			};
			await a.put(o, l);
			let u = wo(l, r);
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
					payload: yo({
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
var Do = 500, Oo = class {
	#e = [];
	#t = new bo();
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
		this.#e.push(t), this.#e.length > Do && this.#e.shift(), this.#t.emit({
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
function ko(e) {
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
function Ao(e) {
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
					...ko(e.settings()),
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
function jo(e) {
	switch (e.media_type) {
		case "image/png":
		case "image/jpeg":
		case "image/webp": return e.media_type;
		case "video/mp4": return null;
	}
}
function Mo(e) {
	let n = jo(e);
	if (n === null) return null;
	let r = t.parse(e.provider_id);
	return {
		id: e.id,
		provider_id: r,
		source_chat_id: e.source_message.chat_id,
		source_message_id: Number.parseInt(e.source_message.message_id, 10),
		media_type: n,
		width: e.width ?? null,
		height: e.height ?? null,
		pinned: e.pinned,
		quarantined: e.quarantined,
		created_at: e.created_at
	};
}
function No(e) {
	let t = new bo();
	async function n(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw J(`Gallery record ${t} no longer exists`);
		return n;
	}
	async function r(n) {
		await e.repository.put(e.namespace(), n);
		let r = Mo(n);
		r !== null && t.emit({
			type: "record_upserted",
			record: r
		});
	}
	async function i(n) {
		await Ji(e.database, e.namespace(), n), t.emit({
			type: "record_removed",
			record_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).flatMap((e) => {
				let t = Mo(e);
				return t === null ? [] : [t];
			});
		},
		subscribe: (e) => t.subscribe(e),
		async read_bytes(t) {
			let r = await n(t), i = await Yi(e.database, r.sha256);
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
function Po(e) {
	return e.image_count ?? 1;
}
function Fo(e) {
	return {
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: t.parse(e.provider_id),
		state: e.state,
		image_count: Po(e.arguments),
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function Io(e) {
	return {
		job_id: e.id,
		request_id: e.request_id,
		provider_id: t.parse(e.provider_id),
		state: e.state,
		image_count: e.arguments.image_count ?? 1,
		completed_image_ids: e.image_ids,
		error: e.error,
		submitted_at: e.created_at
	};
}
function Lo(e) {
	let t = new bo(), n = /* @__PURE__ */ new Map();
	e.queue.subscribe((e) => {
		t.emit({
			type: "job_updated",
			job: Fo(e)
		});
	});
	async function r(t) {
		let r = e.prepare_request === void 0 ? t : await e.prepare_request(t), i = await e.origin.resolve(), a = await fe({
			queue: e.queue,
			plans: e.plans
		}, {
			...i,
			scene_description: r.prompt
		}, r);
		return n.set(a.job_id, r), Fo(a);
	}
	return {
		async load() {
			return (await e.jobs.list(e.namespace())).map(Io);
		},
		subscribe: (e) => t.subscribe(e),
		submit: (e) => r(e.request),
		async cancel(t) {
			return Fo(await ue({
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
//#region src/bootstrap/capabilities/novelai_capability.ts
var Ro = 3e4, zo = 12e4, Bo = 3e4;
function Vo(e) {
	return {
		load: async () => (await e()).list_models(),
		get_account: async () => (await e()).get_account(AbortSignal.timeout(Ro)),
		refresh_models: async () => (await e()).refresh_models(AbortSignal.timeout(zo)),
		estimate_cost: async (t) => (await e()).estimate_cost(t, AbortSignal.timeout(Bo))
	};
}
//#endregion
//#region src/modules/llm/llm_connection_service.ts
var Ho = 1e6, Uo = class extends Error {
	code = "unknown_llm_connection";
	constructor(e) {
		super(`Unknown LLM connection "${e}"`), this.name = "UnknownLlmConnectionError";
	}
}, Wo = class extends Error {
	code = "credential_probe_failed";
	constructor(e) {
		super(`credential_probe_failed: the vault did not confirm "${e}"`), this.name = "LlmCredentialProbeError";
	}
};
function Go(e) {
	return e === 401 || e === 402 || e === 403 ? "auth_failed" : e === 429 ? "rate_limited" : e === 408 ? "timed_out" : e >= 400 && e < 500 ? "invalid_request" : "provider_unavailable";
}
function Ko(e, t, n) {
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
function qo(e) {
	let t = e.payload ?? {};
	return ie.parse({
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
var Jo = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(qo);
	}
	async save(e) {
		let t = oe.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		let r = re(this.#e.namespace, e);
		if (!this.#e.secrets.supports("llm_profile_api_key")) throw TypeError("The host secret vault does not accept LLM connection credentials");
		if (await this.#e.secrets.write_secret(r, t), !await this.#e.secrets.probe_secret(r).catch(() => !1)) throw new Wo(r);
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
				route: Yo(t.provider_kind),
				method: "GET",
				credential_reference: t.credential_reference,
				max_response_bytes: Ho,
				signal: AbortSignal.timeout(15e3)
			});
			return e.status < 200 || e.status >= 300 ? {
				status: "failed",
				code: Go(e.status)
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
		if (t === null) throw new Uo(e);
		return qo(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, Ko(e, this.#e.namespace, t)), this.#a({
			type: "connection_upserted",
			connection: e
		});
	}
	async #i(e, t) {
		let n = await this.#e.repository.list(this.#e.namespace);
		for (let r of n) {
			if (r.id === e) continue;
			let n = qo(r);
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
function Yo(e) {
	return ae[e].models_route;
}
//#endregion
//#region src/modules/library/knowledge_service.ts
var Xo = class extends Error {
	code = "unknown_knowledge_entry";
	constructor(e) {
		super(`Unknown knowledge entry "${e}"`), this.name = "UnknownKnowledgeEntryError";
	}
};
function Zo(e, t, n) {
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
function Qo(e) {
	let t = e.payload ?? {};
	return Mt.parse({
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
var $o = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).map(Qo).sort((e, t) => t.priority - e.priority === 0 ? e.title.localeCompare(t.title) : t.priority - e.priority);
	}
	async save(e) {
		let t = jt.parse(e), n = await this.#e.repository.get(this.#e.namespace, t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new Xo(e);
		return Qo(t);
	}
	async #r(e, t) {
		await this.#e.repository.put(this.#e.namespace, Zo(e, this.#e.namespace, t)), this.#i({
			type: "entry_upserted",
			entry: e
		});
	}
	#i(e) {
		for (let t of this.#t) t(e);
	}
}, es = "persona", ts = class extends Error {
	code = "unknown_persona";
	constructor(e) {
		super(`Unknown persona "${e}"`), this.name = "UnknownPersonaError";
	}
};
function ns(e) {
	let t = e.payload;
	return typeof t == "object" && !!t && !Array.isArray(t) && t.record_kind === es;
}
function rs(e, t, n) {
	return {
		schema_version: 1,
		id: e.id,
		namespace: t,
		record_key: `${t}:${e.id}`,
		created_at: n,
		updated_at: e.updated_at,
		payload: {
			record_kind: es,
			display_name: e.display_name,
			role: e.role,
			description: e.description,
			greeting: e.greeting,
			avatar_image_id: e.avatar_image_id,
			is_active: e.is_active
		}
	};
}
function is(e) {
	let t = e.payload ?? {};
	return Ot.parse({
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
var as = class {
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
		return (await this.#e.repository.list(this.#e.namespace)).filter(ns).map(is);
	}
	async save(e) {
		let t = Dt.parse(e), n = await this.#r(t.id), r = this.#e.clock(), i = {
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
		if (t === null) throw new ts(e);
		return t;
	}
	async #r(e) {
		let t = await this.#e.repository.get(this.#e.namespace, e);
		return t === null || !ns(t) ? null : is(t);
	}
	async #i(e, t) {
		await this.#e.repository.put(this.#e.namespace, rs(e, this.#e.namespace, t)), this.#o({
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
function os(e) {
	let t = new Jo(e);
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
function ss(e) {
	let t = new as(e);
	return {
		load: () => t.list(),
		subscribe: (e) => t.subscribe(e),
		save: (e) => t.save(e),
		remove: (e) => t.remove(e)
	};
}
function cs(e) {
	let t = new $o(e);
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
var ls = {
	state: "not_required",
	counts: {},
	warnings: [],
	failure_reason: null,
	failure_message: null
};
function us(e) {
	let t = new bo(), n = dt(e.database);
	async function r() {
		if (await n.load("migration:not_required") !== null) return ls;
		let e = await i();
		if (e === null) return ls;
		let t = Y(e.payload), r = Y(t.counts);
		return {
			state: e.state,
			counts: Object.fromEntries(Object.keys(r).map((e) => [e, _o(r, e, 0)])),
			warnings: vo(t, "warnings").flatMap((e) => {
				let t = Y(e).message;
				return typeof t == "string" ? [t] : [];
			}),
			failure_reason: typeof Y(t.failure).reason == "string" ? String(Y(t.failure).reason) : null,
			failure_message: typeof Y(t.failure).message == "string" ? String(Y(t.failure).message) : null
		};
	}
	async function i() {
		let t = (await e.database.getAll("migration_journal")).filter((e) => e.migration_id.startsWith(ft)).filter((e) => e.migration_id !== ut).sort((e, t) => e.updated_at < t.updated_at ? 1 : -1)[0];
		return t === void 0 ? null : {
			state: t.state,
			payload: t.payload
		};
	}
	return {
		load: r,
		subscribe: (e) => t.subscribe(e),
		async retry() {
			let { run_migration: n } = await import("./chunks/migration_runner-hUp9WRxZ.js");
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
var ds = "vault_key", fs = "provider_profile", ps = 2e7;
function ms(e) {
	let t = e[0];
	return typeof t == "string" && t.trim().length > 0 ? t : null;
}
function hs(e, t) {
	let n = {
		output_mime_type_allowlist: ["image/png"],
		max_response_bytes: ps,
		max_input_asset_bytes: ps,
		...t?.provider_id === e.provider_id ? Y(X(t)[fs]) : {},
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
function gs(e) {
	return {
		...Y(X(e)[fs]),
		profile_id: e.id,
		provider_id: e.provider_id
	};
}
function _s(e) {
	let n = X(e), r = Y(n[fs]);
	return {
		id: e.id,
		provider_id: t.parse(e.provider_id),
		display_name: Z(n, "display_name", e.id),
		model_id: ms(vo(r, "model_allowlist")),
		workflow_id: ms(vo(r, "workflow_allowlist")),
		is_default: go(n, "is_default", !1),
		credential_reference: typeof n.vault_key == "string" ? n[ds] : null,
		updated_at: e.updated_at
	};
}
function vs(e) {
	let n = new bo();
	async function r(t) {
		let n = await e.repository.get(e.namespace(), t);
		if (n === null) throw J(`Provider profile ${t} no longer exists`);
		return n;
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(_s);
		},
		subscribe: (e) => n.subscribe(e),
		async save(t) {
			let r = e.namespace(), i = await e.repository.get(r, t.id), a = e.now(), o = {
				...X(i ?? { payload: {} }),
				display_name: t.display_name,
				is_default: t.is_default,
				[fs]: yo(hs(t, i))
			};
			i !== null && i.provider_id !== t.provider_id && Reflect.deleteProperty(o, ds);
			let s = {
				schema_version: 1,
				id: t.id,
				namespace: r,
				record_key: `${r}:${t.id}`,
				created_at: i?.created_at ?? a,
				updated_at: a,
				provider_id: t.provider_id,
				payload: o
			}, c = (await e.load_adapters())[t.provider_id];
			if (c === void 0) throw J(`Provider ${t.provider_id} is unavailable`);
			c.validate_profile(gs(s)), await e.repository.put(r, s);
			let l = _s(s);
			return n.emit({
				type: "profile_upserted",
				profile: l
			}), l;
		},
		async remove(t) {
			await e.repository.delete(e.namespace(), t), n.emit({
				type: "profile_removed",
				profile_id: t
			});
		},
		async set_credential(t, a) {
			if (a.trim().length === 0) throw TypeError("A provider credential must not be blank");
			if (e.secrets === null) throw J("The selected credential storage backend is unavailable");
			let o = await r(t), s = i(o.namespace, t);
			await e.secrets.write_secret(s, a);
			let c = {
				...o,
				updated_at: e.now(),
				payload: yo({
					...X(o),
					[ds]: s
				})
			};
			await e.repository.put(o.namespace, c);
			let l = _s(c);
			return n.emit({
				type: "profile_upserted",
				profile: l
			}), l;
		},
		async clear_credential(t) {
			let i = await r(t), a = { ...X(i) }, o = a[ds];
			Reflect.deleteProperty(a, ds), typeof o == "string" && await e.secrets?.delete_secret?.(o);
			let s = {
				...i,
				updated_at: e.now(),
				payload: yo(a)
			};
			await e.repository.put(i.namespace, s);
			let c = _s(s);
			return n.emit({
				type: "profile_upserted",
				profile: c
			}), c;
		},
		async test_connection(n) {
			let i = Date.now(), a = await r(n), o = t.parse(a.provider_id), s = (await e.load_adapters())[o];
			if (s === void 0) return {
				status: "failed",
				error: {
					code: "provider_unavailable",
					retryable: !1
				}
			};
			try {
				s.validate_profile(gs(a));
			} catch (e) {
				return {
					status: "failed",
					error: e instanceof tt ? e.provider_error : {
						code: "invalid_request",
						retryable: !1
					}
				};
			}
			let c = X(a)[ds];
			return typeof c == "string" && e.secrets !== null && !await e.secrets.probe_secret(c) ? {
				status: "failed",
				error: {
					code: "auth_failed",
					retryable: !1
				}
			} : {
				status: "success",
				latency_ms: Date.now() - i
			};
		}
	};
}
//#endregion
//#region src/modules/prompt/regex_transform.ts
function ys(e, t) {
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
function bs(e, t) {
	return ys(t, e).text;
}
//#endregion
//#region src/bootstrap/capabilities/prompt_presets_capability.ts
function xs(e) {
	let t = X(e);
	return {
		id: e.id,
		display_name: Z(t, "display_name", e.id),
		group: ho(t, "group"),
		updated_at: e.updated_at
	};
}
function Ss(e) {
	return e.flatMap((e) => {
		let t = Y(e), n = ho(t, "id");
		return n === null ? [] : [{
			id: n,
			triggers: vo(t, "triggers").filter((e) => typeof e == "string"),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function Cs(e) {
	return e.flatMap((e) => {
		let t = Y(e), n = ho(t, "id");
		return n === null ? [] : [{
			id: n,
			pattern: Z(t, "pattern", ""),
			flags: Z(t, "flags", ""),
			replacement: Z(t, "replacement", "")
		}];
	});
}
function ws(e) {
	let t = new bo();
	async function n(n) {
		await e.repository.delete(e.namespace(), n), t.emit({
			type: "preset_removed",
			preset_id: n
		});
	}
	return {
		async load() {
			return (await e.repository.list(e.namespace())).map(xs);
		},
		subscribe: (e) => t.subscribe(e),
		async load_draft(t) {
			let n = await e.repository.get(e.namespace(), t);
			if (n === null) throw J(`Prompt preset ${t} no longer exists`);
			let r = X(n);
			return {
				id: n.id,
				display_name: Z(r, "display_name", n.id),
				group: ho(r, "group"),
				fixed_positive_prompt: Z(r, "fixed_positive_prompt", ""),
				fixed_negative_prompt: Z(r, "fixed_negative_prompt", ""),
				replacement_rules: Ss(vo(r, "replacement_rules")),
				regex_rules: Cs(vo(r, "regex_rules"))
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
				payload: yo({
					display_name: n.display_name,
					group: n.group,
					fixed_positive_prompt: n.fixed_positive_prompt,
					fixed_negative_prompt: n.fixed_negative_prompt,
					replacement_rules: n.replacement_rules,
					regex_rules: n.regex_rules
				})
			};
			await e.repository.put(r, s);
			let c = xs(s);
			return t.emit({
				type: "preset_upserted",
				preset: c
			}), c;
		},
		remove: n,
		async bulk_remove(e) {
			for (let t of e) await n(t);
		},
		test_regex: (e, t) => Promise.resolve(bs(e, t))
	};
}
//#endregion
//#region src/bootstrap/capabilities/settings_capability.ts
var Ts = "The selected credential storage backend is unavailable";
function Es(e) {
	if (e === null) throw J("Archive import and export need IndexedDB, which is unavailable on this host");
	return e;
}
function Ds(e) {
	let t = new bo(), n = null;
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
				http_acknowledgments: lt(n.gateway.http_acknowledgments, t, (/* @__PURE__ */ new Date()).toISOString())
			} }), e.settings.flush();
		},
		async set_gateway_token(t) {
			if (t.trim().length === 0) throw TypeError("A Gateway token must not be blank");
			if (e.secrets === null) throw J(Ts);
			let n = e.settings.get_settings(), r = ce(n.active_namespace);
			return await e.secrets.write_secret(r, t), i({ gateway: {
				...n.gateway,
				token_secret_id: r
			} }), e.settings.flush();
		},
		async clear_gateway_token() {
			let t = e.settings.get_settings(), n = t.gateway.token_secret_id;
			return n !== null && await e.secrets?.delete_secret?.(n), i({ gateway: {
				...t.gateway,
				token_secret_id: null
			} }), e.settings.flush();
		},
		async initialize_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw J(Ts);
			return e.browser_secret_vault.initialize(t);
		},
		async unlock_browser_secret_vault(t) {
			if (e.browser_secret_vault === null) throw J(Ts);
			return e.browser_secret_vault.unlock(t);
		},
		async lock_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw J(Ts);
			return e.browser_secret_vault.lock();
		},
		async reset_browser_secret_vault() {
			if (e.browser_secret_vault === null) throw J(Ts);
			return e.browser_secret_vault.reset();
		},
		set_vocabulary_update_channel(t) {
			return i({ vocabulary_update_channel: t }), e.settings.flush();
		},
		async import_vocabulary_package(t, r) {
			if (n !== null) throw new pt("vocabulary_import_busy", "A vocabulary import is already in progress");
			let i = {
				cancelled: !1,
				cancel() {
					i.cancelled = !0;
				}
			}, a = null;
			n = i;
			try {
				let { start_vocabulary_import: o } = await import("./chunks/vocabulary_import-CsOZm_mn.js");
				a = o(e.database, t, r), n = a, i.cancelled && a.cancel(), await a.completed;
			} finally {
				(n === i || n === a) && (n = null);
			}
		},
		cancel_vocabulary_import() {
			n?.cancel();
		},
		async export_archive() {
			let { export_archive: t } = await import("./chunks/archive-BnlBRR76.js");
			return t({
				database: Es(e.database),
				namespace: e.settings.get_settings().active_namespace,
				extension_version: e.extension_version
			});
		},
		async import_archive(t) {
			let { import_archive: n } = await import("./chunks/archive-BnlBRR76.js");
			await n({
				database: Es(e.database),
				archive: t
			});
		}
	};
}
//#endregion
//#region src/bootstrap/capabilities/vocabulary_capability.ts
function Os(e) {
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
function ks(e) {
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
				let n = Os(e);
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
var As = class {
	capabilities;
	#e;
	#t;
	constructor(e, t, n) {
		this.capabilities = e, this.#e = t, this.#t = n;
	}
	can_use_native_tools() {
		return this.capabilities.native_tool_manager?.available === !0 && this.#t.can_use_native_tools();
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
function js(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Ms(e) {
	let t = js(e, "SillyTavern"), n = js(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Ns(e, t) {
	let n = js(e, "TavernHelper"), r = js(e, "fetch"), i = Ms(e), a = ar(n), o = Nn(js(e, "SillyTavern"), r);
	if (!a.detected || !a.message_swipe_metadata || !o.main_generation_events || i === void 0 || typeof r != "function") return null;
	let s = new Rn(i, r);
	return new As(t, new mr(n, () => s.get_active_chat_id()), s);
}
//#endregion
//#region src/host/sillytavern_secret_destination.ts
function Ps(e) {
	return typeof e == "object" && !!e;
}
function Fs(e, t) {
	if (!Ps(e)) return !1;
	let n = e[t];
	return typeof n == "string" && n.length > 0;
}
var Is = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = wn(t);
	}
	supports(e) {
		return !0;
	}
	async write_secret(e, t) {
		let n = await this.#t("/api/secrets/write", {
			method: "POST",
			headers: Ln(this.#e.getRequestHeaders()),
			body: JSON.stringify({
				key: e,
				value: t,
				label: "TavernCanvas migrated credential"
			})
		});
		if (!n.ok) throw Error(`SillyTavern secret write failed with status ${String(n.status)}`);
	}
	async delete_secret(e) {
		let t = await this.#t("/api/secrets/delete", {
			method: "POST",
			headers: Ln(this.#e.getRequestHeaders()),
			body: JSON.stringify({ key: e })
		});
		if (!t.ok) throw Error(`SillyTavern secret deletion failed with status ${String(t.status)}`);
	}
	async probe_secret(e) {
		let t = await this.#t("/api/secrets/view", {
			method: "POST",
			headers: Ln(this.#e.getRequestHeaders()),
			body: JSON.stringify({})
		});
		if (!t.ok) return !1;
		let n;
		try {
			n = await t.json();
		} catch {
			return !1;
		}
		return Fs(n, e);
	}
};
function Ls(e) {
	return (typeof e == "object" && !!e || typeof e == "function") && typeof e.getRequestHeaders == "function";
}
function Rs(e, t) {
	return !Ls(e) || typeof t != "function" ? null : new Is(e, t);
}
//#endregion
//#region src/bootstrap/host_environment.ts
var zs = "st-chatu8";
function Q(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function Bs(e, t = "") {
	return typeof e == "string" ? e : t;
}
async function Vs(e) {
	let t = Q(e, "arrayBuffer");
	if (typeof t != "function") return null;
	try {
		let n = await t.call(e);
		if (Object.prototype.toString.call(n) === "[object ArrayBuffer]") return new Uint8Array(n.slice(0));
		if (ArrayBuffer.isView(n)) return new Uint8Array(n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength));
	} catch {
		return null;
	}
	return null;
}
function Hs(e) {
	let t = Q(e, "SillyTavern"), n = Q(t, "getContext");
	if (typeof n == "function") try {
		return Reflect.apply(n, t, []);
	} catch {
		return;
	}
}
function Us(e) {
	let t = Hs(e), n = Q(t, "extensionSettings"), r = Q(t, "saveSettingsDebounced");
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
function Ws(e) {
	return Rs(Hs(e), Q(e, "fetch"));
}
function Gs(e) {
	return Wa(Hs(e), Q(e, "fetch"));
}
function Ks(e) {
	let t = Us(e);
	return t === null ? null : {
		read_settings: () => Promise.resolve(t.extension_settings[zs]),
		read_gallery_database: async () => {
			let { read_legacy_gallery_database: t } = await import("./chunks/legacy_gallery_source-C4-rJJ5G.js");
			return t(e);
		}
	};
}
function qs(e) {
	let t = Q(e, "location") ?? Q(globalThis, "location"), n = Bs(Q(t, "origin")), r = Bs(Q(t, "href"), n.length > 0 && n !== "null" ? `${n}/` : "");
	if (r.length === 0 || n.length === 0 || n === "null") return null;
	let i;
	try {
		i = new URL(n).origin;
	} catch {
		return null;
	}
	return i === "null" ? null : {
		href: r,
		origin: i
	};
}
function Js(e) {
	let t = e;
	for (let e = 0; e < 3; e += 1) try {
		let e = decodeURIComponent(t);
		if (e === t) break;
		t = e;
	} catch {
		return !0;
	}
	return t.includes("\\") || t.includes("\0") ? !0 : t.split("/").some((e) => e === "." || e === "..");
}
function Ys(e) {
	if (e.length >= 8 && e.subarray(0, 8).every((e, t) => e === [
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	][t]) || e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255 || e.length >= 6 && (e[0] === 71 && e[1] === 73 && e[2] === 70 && e[3] === 56 && (e[4] === 55 || e[4] === 57) && e[5] === 97 || e[0] === 66 && e[1] === 77) || e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 || e.length >= 4 && (e[0] === 73 && e[1] === 73 && e[2] === 42 && e[3] === 0 || e[0] === 77 && e[1] === 77 && e[2] === 0 && e[3] === 42) || e.length >= 12 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && ([
		97,
		118,
		105,
		102
	].every((t, n) => e[8 + n] === t) || [
		97,
		118,
		105,
		115
	].every((t, n) => e[8 + n] === t) || [
		104,
		101,
		105,
		99
	].every((t, n) => e[8 + n] === t) || [
		109,
		105,
		102,
		49
	].every((t, n) => e[8 + n] === t))) return !0;
	let t = new TextDecoder().decode(e.subarray(0, 256)).trimStart().toLowerCase();
	return t.startsWith("<svg") || t.startsWith("<?xml") && t.includes("<svg");
}
function Xs(e) {
	let t = Q(e, "fetch") ?? Q(globalThis, "fetch"), n = qs(e);
	return typeof t != "function" || n === null ? null : { async resolve_host_image(r) {
		if (typeof r != "string" || r.trim().length === 0 || r.includes("\\") || Js(r)) return null;
		let i, a;
		try {
			i = new URL(n.href), a = new URL(r, i);
		} catch {
			return null;
		}
		if (a.protocol !== "http:" && a.protocol !== "https:" || a.origin !== n.origin || a.username.length > 0 || a.password.length > 0 || Js(a.pathname)) return null;
		let o = t, s;
		try {
			s = await o.call(e, a.href, { credentials: "same-origin" });
		} catch {
			return null;
		}
		if (typeof s != "object" || !s) return null;
		let c = Q(s, "status"), l = typeof c == "number" ? c : void 0, u = Q(s, "ok");
		if (!(l === void 0 ? u === !0 : l >= 200 && l < 300 && u !== !1)) return null;
		let d = Q(s, "headers"), f = Q(d, "get"), p = typeof f == "function" ? Bs(f.call(d, "content-type")).split(";", 1)[0]?.trim().toLowerCase() : void 0;
		if (p !== void 0 && p.length > 0 && !p.startsWith("image/")) return null;
		let m = await Vs(s);
		return m !== null && m.length > 0 && Ys(m) ? m : null;
	} };
}
function Zs(e, t) {
	return Ns(e, t);
}
//#endregion
//#region src/bootstrap/compose_capabilities.ts
var $ = "IndexedDB could not be opened, so nothing that persists records can be composed", Qs = "No usable SillyTavern + TavernHelper host pair was detected", $s = "SillyTavern's context exposes no extensionSettings/saveSettingsDebounced pair", ec = "The selected credential storage backend cannot both store and reveal a credential";
function tc() {
	return navigator.storage.estimate();
}
function nc() {
	return typeof Worker > "u" ? null : () => new Worker(new URL(
		/* @vite-ignore */
		"/workers/vocabulary_worker.js",
		"" + import.meta.url
	), { type: "module" });
}
async function rc(e) {
	let { ComfyUiAdapter: t, GoogleImageAdapter: n, NovelAiAdapter: r, OpenAiImageAdapter: i, SdWebuiAdapter: a } = await import("./chunks/adapters-CcVZKObZ.js"), o = {
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
function ic(e, t) {
	let n = new Ri(e);
	return { async read(r) {
		let i = await n.get(t(), r);
		if (i === null) throw Error(`Source asset ${r} is not in the image store`);
		let a = await Yi(e, i.sha256);
		if (a === null) throw Error(`Source asset ${r} has no stored bytes`);
		if (i.media_type === "video/mp4") throw Error(`Source asset ${r} is a video and cannot be a provider input`);
		return {
			asset_id: r,
			media_type: i.media_type,
			bytes: a
		};
	} };
}
function ac(e) {
	return Xe.omit({
		media_type: !0,
		quarantined: !0
	}).parse(e);
}
function oc(e) {
	let t = vo(Y(e.provider_profile), "model_allowlist")[0];
	return typeof t == "string" && t.length > 0 ? t : null;
}
function sc(e, t) {
	return {
		async put_image(n) {
			return { id: (await qi(e, t(), {
				id: n.id,
				bytes: n.bytes,
				claimed_media_type: n.claimed_media_type,
				created_at: n.created_at,
				metadata: ac(n.metadata)
			})).id };
		},
		async read_image(n) {
			let r = await new Ri(e).get(t(), n);
			if (r === null) return null;
			let i = await Yi(e, r.sha256);
			return i === null ? null : {
				bytes: i,
				media_type: r.media_type
			};
		}
	};
}
async function cc(e) {
	let n = e.globals ?? globalThis, r = e.extension_version ?? "development", i = jr(), a = [], o = [];
	function s(e, t, n) {
		if (a.push(po(e, t)), t.status === "available") return t.value;
		let r = t.reason;
		return {
			...n,
			load: () => Promise.reject(J(r))
		};
	}
	let c = e.probe.ready ? e.probe.matrix : {}, l = Zs(n, c), u = [], d = c.tauri_chat_surface?.available === !0 ? new Qi() : new Zi();
	d instanceof Qi && u.push(new xa({
		globals: n,
		port: d
	})), c.tauri_world_info_activation?.available === !0 && u.push(new Ca({ globals: n }));
	let f = null;
	try {
		f = await (e.open_storage ?? qe)();
	} catch {
		f = null;
	}
	let p = Us(n), m = p === null ? null : za(p), h = () => m?.get_settings().active_namespace ?? "primary", g = () => (/* @__PURE__ */ new Date()).toISOString(), ee = Ws(n), te = Gs(n), _;
	try {
		_ = (e.create_browser_secret_vault ?? et)(n);
	} catch {
		_ = null;
	}
	_ !== null && o.push(() => _.close());
	let v = new Ga({
		mode: () => m?.get_settings().credential_storage_mode ?? "host",
		host_destination: ee,
		host_resolver: te,
		browser_vault: _
	}), y = v.has_destination ? v : null, ne = v.has_resolver ? v : null, b = f === null ? null : We(f), re = new Oo(), ie = null, ae = () => ie ??= rc(f), oe = () => m?.get_settings().auto_generation_enabled ?? !1, x = l === null ? null : new la({
		host: l,
		sessions: new $t(new St(globalThis.crypto)),
		new_root_id: () => crypto.randomUUID(),
		is_auto_generation_enabled: oe
	}), S = b === null || m === null ? null : await b.provider_profiles.get(h(), m.get_settings().active_provider_profile_id ?? "").catch(() => null), se = S === null ? {} : X(S), ce = ho(se, "base_url"), le = oc(se), ue = S === null ? null : t.safeParse(S.provider_id).data ?? null, fe = ue === null ? null : {
		provider_id: ue,
		credential_reference: ho(se, ds),
		secrets_readable: ne !== null
	}, me = null, C = b === null || f === null ? null : () => me ??= import("./chunks/novelai_runtime-D8nwtT_x.js").then((t) => t.create_novelai_runtime({
		vibe_encodings: b.novelai_vibe_encodings,
		provider_inputs: b.provider_input_assets,
		namespace: h,
		gallery_assets: ic(f, h),
		transport: () => dc(fe, ne, e.provider_fetch),
		fetch: e.provider_fetch ?? globalThis.fetch.bind(globalThis)
	})), ge = C === null || f === null ? null : { async read(e, t) {
		try {
			return await ic(f, h).read(e, t);
		} catch {
			return (await C()).assets.read(e, t);
		}
	} }, _e = C === null ? null : async (e) => e.provider_id === "novelai" ? (await C()).prepare(e, AbortSignal.timeout(uc)) : e, w = s("novelai", C === null ? K($) : q(() => Vo(async () => (await C()).service)), i.novelai), ve = s("settings", m === null ? K($s) : q(() => Ds({
		settings: m,
		database: f,
		extension_version: r,
		secrets: y,
		browser_secret_vault: _
	})), i.settings), ye = s("profiles", b === null ? K($) : q(() => vs({
		repository: b.provider_profiles,
		namespace: h,
		load_adapters: ae,
		secrets: y,
		now: g
	})), i.profiles), be = s("llm_connections", b === null ? K($) : y === null || ne === null ? K(ec) : q(() => os({
		repository: b.llm_connections,
		namespace: h(),
		secrets: y,
		transport: new eo({
			secrets: ne,
			...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
		}),
		clock: g
	})), i.llm_connections), xe = s("personas", b === null ? K($) : q(() => ss({
		repository: b.character_profiles,
		namespace: h(),
		clock: g
	})), i.personas), Se = s("knowledge", b === null ? K($) : q(() => cs({
		repository: b.knowledge_entries,
		namespace: h(),
		clock: g
	})), i.knowledge), Ce = s("prompt_presets", b === null ? K($) : q(() => ws({
		repository: b.prompt_presets,
		namespace: h,
		now: g,
		new_id: () => crypto.randomUUID()
	})), i.prompt_presets), T = s("assets", b === null ? K($) : q(() => Eo({
		repositories: b,
		namespace: h,
		now: g
	})), i.assets), E = s("gallery", f === null ? K($) : q(() => No({
		database: f,
		repository: new Ri(f),
		namespace: h,
		now: g
	})), i.gallery);
	function D(e, t, n) {
		if (l === null) return;
		let r = new fa({
			host: l,
			sessions: n
		});
		u.push(new ua(n, r), new ma({
			host: l,
			request_image_tool: new nn(n.registry, new en(), new da({
				queue: e,
				plans: t,
				targets: n,
				provider_id: () => ue,
				model_id: () => le
			})),
			session_port: n,
			fallback_text_sink: r,
			is_auto_generation_enabled: oe
		}));
	}
	let O = s("generation", f === null ? K($) : l === null ? K(Qs) : q(() => {
		let t = m?.get_settings().gateway ?? null, n = so({
			gateway_endpoint: t?.endpoint ?? null,
			http_acknowledgments: t?.http_acknowledgments ?? {},
			tauri_provider_available: !1,
			sillytavern_available: !1,
			direct_provider_base_url: ce,
			direct_cloud: fe
		}), r = new de(), i = {
			store: sc(f, h),
			ids: { next: () => crypto.randomUUID() },
			clock: { now: g },
			resolve_source_message: (e) => ({
				chat_id: e.chat_id,
				message_id: String(e.requested_swipe_id),
				swipe_id: e.requested_swipe_id
			})
		}, a = new gn({
			executor: n.kind === "gateway" ? hc({
				...i,
				endpoint: n.endpoint,
				http_acknowledgments: t?.http_acknowledgments ?? {},
				access_token: mc(t?.token_secret_id ?? null, ne),
				plans: r,
				...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
			}) : new pe({
				...i,
				load_adapters: ae,
				profiles: { resolve: async (e) => {
					let t = (await ae())[e];
					if (t === void 0 || S === null) throw Error(`No stored provider profile is active for ${e}`);
					return t.validate_profile(gs(S));
				} },
				transport: lc(n, {
					secrets: ne,
					...e.provider_fetch === void 0 ? {} : { fetch: e.provider_fetch }
				}),
				assets: ge ?? ic(f, h),
				log: { write: () => {} },
				plans: r
			}),
			persistence: new he(f, h()),
			job_id_source: { next: () => crypto.randomUUID() },
			time_source: new on(),
			global_concurrency: m?.get_settings().global_concurrency ?? 1
		});
		o.push(re.observe_jobs(a));
		let s = e.message_port ?? (x === null ? null : new oa(l, x));
		if (s !== null) {
			let e = new bn(a, s);
			e.start(), o.push(() => {
				e.stop();
			});
		}
		x !== null && D(a, r, x);
		let c = new en();
		return Lo({
			queue: a,
			plans: r,
			jobs: We(f).generation_jobs,
			namespace: h,
			origin: new ea(l, new St(globalThis.crypto)),
			new_request_id: () => c.next(),
			..._e === null ? {} : { prepare_request: _e }
		});
	}), i.generation), we = e.create_vocabulary_worker === void 0 ? nc() : e.create_vocabulary_worker, k = s("vocabulary", f === null ? K($) : we === null ? K("This host has no Worker constructor, so vocabulary search cannot run") : q(() => ks({
		async load_catalog() {
			let { VocabularyCatalogClient: e } = await import("./chunks/vocabulary_catalog_client-C_WrDzSb.js");
			return new e({
				current_extension_version: r,
				open_database_impl: () => Promise.resolve(f)
			});
		},
		async create_client() {
			let { VocabularyClient: e } = await import("./chunks/vocabulary_client-Cna9mbEf.js");
			return new e({ create_worker: we });
		}
	})), i.vocabulary), A = s("migration", f === null ? K($) : m === null ? K($s) : q(() => {
		let e = Ks(n);
		if (e === null) throw Error($s);
		let t = Xs(n);
		if (t === null) throw Error("This host exposes no same-origin fetch boundary for legacy image migration");
		return us({
			database: f,
			settings: m,
			legacy_source: e,
			image_resolver: t,
			secrets: y
		});
	}), i.migration);
	return {
		capabilities: {
			generation: O,
			profiles: ye,
			prompt_presets: Ce,
			assets: T,
			gallery: E,
			vocabulary: k,
			diagnostics: s("diagnostics", q(() => Ao({
				capability_matrix: c,
				helper_version: e.probe.ready ? e.probe.helper_version : null,
				timeline: re,
				resolutions: () => a,
				settings: () => m?.get_settings() ?? null,
				estimate_storage: e.estimate_storage ?? tc,
				extension_version: r,
				probe_gateway: null
			})), i.diagnostics),
			migration: A,
			settings: ve,
			llm_connections: be,
			novelai: w,
			personas: xe,
			knowledge: Se
		},
		resolutions: a,
		host: l,
		chat_media: d,
		modules: u,
		async dispose() {
			for (let e of [...o].reverse()) try {
				await e();
			} catch {}
			await m?.stop();
		}
	};
}
function lc(e, t = { secrets: null }) {
	let n = t.fetch;
	switch (e.kind) {
		case "direct_cloud": {
			let r = zt(e.provider_id);
			if (r === null || t.secrets === null) throw Error(`No direct route catalog entry and host credential resolver pair exists for ${e.provider_id}`);
			return new $a({
				catalog_entry: r,
				credential_reference: e.credential_reference,
				secrets: t.secrets,
				...n === void 0 ? {} : { fetch: n }
			});
		}
		case "local_direct": return new ao({
			base_url: e.endpoint,
			...n === void 0 ? {} : { fetch: n }
		});
		default: throw Error(`The selected ${e.kind} transport cannot drive the job executor; configure a loopback provider endpoint or a credentialed cloud profile`);
	}
}
var uc = 12e4;
function dc(e, t, n) {
	if (e === null || e.provider_id !== "novelai") throw new $e("The active provider profile is not a NovelAI profile");
	if (e.credential_reference === null) throw new $e("The active NovelAI profile has no stored token; set one in Settings > Providers");
	if (!e.secrets_readable || t === null) throw new $e("This host cannot reveal stored credentials; enable allowKeysExposure in SillyTavern's config.yaml");
	return lc({
		kind: "direct_cloud",
		provider_id: "novelai",
		credential_reference: e.credential_reference
	}, {
		secrets: t,
		...n === void 0 ? {} : { fetch: n }
	});
}
var fc = "A Gateway endpoint is configured but no Gateway access token is stored; set one in Settings > Gateway, or clear the endpoint to generate directly", pc = "This host cannot reveal stored credentials, so the Gateway access token cannot be read back; enable allowKeysExposure in SillyTavern's config.yaml, or clear the Gateway endpoint to generate directly";
function mc(e, t) {
	if (e === null) throw Error(fc);
	if (t === null) throw Error(pc);
	return () => t.resolve_secret(e);
}
function hc(e) {
	let t = null;
	return { async execute(n, r) {
		let { GatewayJobExecutor: i } = await (t ??= import("./chunks/gateway_job_executor-CVa1yNNN.js"));
		return new i(e).execute(n, r);
	} };
}
//#endregion
//#region src/bootstrap/startup_error.ts
var gc = "https://github.com/N0VI028/JS-Slash-Runner";
function _c(e) {
	if (e.ready) return {
		state: "ready",
		title: "TavernCanvas ready",
		message: `Connected through JS Slash Runner ${e.helper_version}.`
	};
	let t = `JS Slash Runner ${hr} or newer is required.`;
	switch (e.error_code) {
		case "tavern_helper_missing": return {
			state: "blocked",
			title: "JS Slash Runner is required",
			message: t,
			update_url: gc
		};
		case "helper_version_invalid": return {
			state: "blocked",
			title: "JS Slash Runner version is invalid",
			message: `TavernCanvas could not verify the installed version. ${t}`,
			update_url: gc
		};
		case "helper_version_unsupported": return {
			state: "blocked",
			title: "Update JS Slash Runner",
			message: t,
			update_url: gc
		};
		case "helper_api_incomplete": return {
			state: "blocked",
			title: "JS Slash Runner API is incomplete",
			message: `Required public capabilities are unavailable. ${t}`,
			update_url: gc
		};
	}
}
function vc() {
	return {
		state: "failed",
		title: "TavernCanvas could not start",
		message: "Runtime initialization failed. Reload SillyTavern after checking extension diagnostics."
	};
}
//#endregion
//#region src/bootstrap/bootstrap.ts
async function yc(e = {}) {
	let t = e.document ?? document, n = e.globals ?? globalThis, r = Tr(n), i, a, o = null, s = !1;
	try {
		o = await cc({
			...e.composition,
			probe: r,
			globals: n,
			extension_version: e.version ?? "development"
		});
	} catch {
		s = !0;
	}
	let c = r.ready ? new gt([...e.modules ?? [], ...o?.modules ?? []]) : void 0;
	if (!r.ready) i = "blocked", a = _c(r);
	else if (s) i = "failed", a = vc();
	else try {
		await c?.start_all(), i = "ready", a = _c(r);
	} catch {
		i = "failed", a = vc();
	}
	let l = Pi(t, e.stylesheet ?? ""), u = Ne(), d = await o?.capabilities.settings.load().then((e) => e.settings.locale).catch(() => null);
	u.apply_locale(d ?? "auto", typeof navigator > "u" ? "en" : navigator.language);
	let f = Te(Ni, {
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
//#region src/bootstrap/host_readiness.ts
function bc(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function xc(e) {
	let t = bc(e, "SillyTavern"), n = bc(t, "getContext");
	if (typeof n != "function") return Promise.resolve();
	let r;
	try {
		r = Reflect.apply(n, t, []);
	} catch {
		return Promise.resolve();
	}
	let i = bc(r, "eventSource"), a = bc(bc(r, "eventTypes"), "APP_READY"), o = bc(i, "on"), s = bc(i, "removeListener");
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
var Sc = ":host{--tc-canvas:#edf0f5;--tc-surface:#fff;--tc-surface-raised:#f3f6fa;--tc-text:#141923;--tc-text-muted:#596578;--tc-divider:#ccd4df;--tc-accent:#2f5af5;--tc-accent-hover:#244bd6;--tc-on-accent:#fff;--tc-success:#157b59;--tc-warning:#946100;--tc-error:#c23838;--tc-media-scrim:#1113189e;--tc-media-ink:#fff;--tc-radius-panel:0;--tc-radius-field:6px;--tc-radius-image:8px;--tc-radius-status:4px;--tc-motion-fast:.14s;--tc-motion-normal:.18s;--tc-motion-slow:.22s;--tc-z-shell-sticky:10;--tc-z-inspector-sheet:20;--tc-z-overlay:30;--tc-z-toast:40;--tc-z-host:2147480000;color:var(--tc-text);background:var(--tc-canvas);letter-spacing:0;font-family:Geist,system-ui,Noto Sans CJK SC,Microsoft YaHei,sans-serif;font-size:14px}:host([data-color-mode=dark]){--tc-canvas:#080b10;--tc-surface:#10151c;--tc-surface-raised:#181f29;--tc-text:#f5f7fa;--tc-text-muted:#9ca8b8;--tc-divider:#2b3441;--tc-accent:#7898ff;--tc-accent-hover:#8aa6ff;--tc-on-accent:#080b10;--tc-success:#45c995;--tc-warning:#e8b44e;--tc-error:#ff7b7b}", Cc = "@font-face{font-family:Geist;src:url(__TAVERN_CANVAS_ASSET_URL__geist_variable.woff2__)format(\"woff2\");font-weight:100 900;font-style:normal;font-display:swap}:host{z-index:var(--tc-z-host);pointer-events:none;background:0 0;position:fixed;inset:0}:host [data-window-role=studio],:host [data-startup-state],:host [data-shadow-role=entry],:host [data-shadow-role=portal]>*{pointer-events:auto}*,:before,:after{box-sizing:border-box}*{margin:0}[data-shadow-role=app],[data-shadow-role=portal]{font-family:inherit;font-size:inherit;color:inherit;line-height:1.5}[data-shadow-role=app]{width:100%;height:100%}img,svg{max-width:100%;display:block}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;background:0 0;border:none;padding:0}button:disabled{cursor:not-allowed}ul,ol{padding:0;list-style:none}a{color:inherit}@media (prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}", wc = ".tc-tabular-nums{font-variant-numeric:tabular-nums}.tc-visually-hidden{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tc-interactive{transition:transform var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out, color var(--tc-motion-fast) ease-out;border:1px solid #0000}.tc-interactive:active{transform:scale(.97)}.tc-interactive:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}.tc-z-shell-sticky{z-index:var(--tc-z-shell-sticky)}.tc-z-inspector-sheet{z-index:var(--tc-z-inspector-sheet)}.tc-z-overlay{z-index:var(--tc-z-overlay)}.tc-z-toast{z-index:var(--tc-z-toast)}", Tc = "@keyframes _tc-icon-rotate_1r8sc_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._iconButton_1r8sc_32{border-radius:var(--tc-radius-field);color:var(--tc-text);background-color:#0000;flex:none;justify-content:center;align-items:center;display:inline-flex}._iconButtonSm_1r8sc_42{width:28px;height:28px}._iconButtonMd_1r8sc_47{width:32px;height:32px}._iconButtonLg_1r8sc_52{width:40px;height:40px}._iconButton_1r8sc_32:hover:not(:disabled){background-color:var(--tc-surface-raised)}._iconButton_1r8sc_32:disabled{color:var(--tc-text-muted)}._iconButtonDestructive_1r8sc_65{color:var(--tc-error)}._iconButtonDestructive_1r8sc_65:hover:not(:disabled){background-color:var(--tc-surface-raised);border-color:var(--tc-error)}._iconButtonPressed_1r8sc_74{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._appButton_1r8sc_84{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);justify-content:center;align-items:center;height:36px;padding:0 16px;font-weight:500;display:inline-flex;position:relative}._appButton_1r8sc_84:disabled{opacity:.5}._appButtonContent_1r8sc_100{align-items:center;gap:8px;min-width:0;display:inline-flex}._appButtonContentPending_1r8sc_107{visibility:hidden}._appButtonLabel_1r8sc_111{white-space:nowrap;text-overflow:ellipsis;max-width:240px;overflow:hidden}._appButtonSpinner_1r8sc_118{justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:0}._appButtonSpinner_1r8sc_118 svg{animation:_tc-icon-rotate_1r8sc_1 var(--tc-motion-normal) linear infinite}._appButtonPrimary_1r8sc_136{border-color:var(--tc-accent);background-color:var(--tc-accent);color:var(--tc-on-accent)}._appButtonPrimary_1r8sc_136:hover:not(:disabled){background-color:var(--tc-accent-hover);border-color:var(--tc-accent-hover)}._appButtonSecondary_1r8sc_147{border-color:var(--tc-divider);color:var(--tc-text)}._appButtonSecondary_1r8sc_147:hover:not(:disabled){background-color:var(--tc-surface-raised)}._appButtonDestructive_1r8sc_156{border-color:var(--tc-error);color:var(--tc-error)}._appButtonDestructive_1r8sc_156:hover:not(:disabled){background-color:var(--tc-surface-raised)}._segmentedControl_1r8sc_169{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);gap:2px;padding:2px;display:inline-flex}._segmentedControlItem_1r8sc_178{border-radius:var(--tc-radius-status);height:28px;color:var(--tc-text-muted);background-color:#0000;justify-content:center;align-items:center;padding:0 12px;display:inline-flex}._segmentedControlItem_1r8sc_178:hover:not([data-disabled]){background-color:var(--tc-surface-raised)}._segmentedControlItem_1r8sc_178[data-state=checked]{background-color:var(--tc-surface-raised);border-color:var(--tc-accent);color:var(--tc-accent)}._segmentedControlItemLabel_1r8sc_199{white-space:nowrap;text-overflow:ellipsis;max-width:160px;overflow:hidden}._switchRow_1r8sc_210{cursor:pointer;justify-content:space-between;align-items:center;gap:16px;display:flex}._switchRow_1r8sc_210[data-disabled]{cursor:not-allowed}._switchLabelGroup_1r8sc_222{flex-direction:column;gap:2px;min-width:0;display:flex}._switchLabel_1r8sc_222{color:var(--tc-text);overflow-wrap:anywhere}._switchDescription_1r8sc_234{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._switchRoot_1r8sc_247{background-color:var(--tc-surface-raised);border-color:var(--tc-text-muted);border-radius:999px;flex:none;width:40px;height:24px;position:relative}._switchRoot_1r8sc_247[data-state=checked]{background-color:var(--tc-accent);border-color:var(--tc-accent)}._switchRoot_1r8sc_247:disabled{opacity:.5}._switchThumb_1r8sc_266{border:1px solid var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;transition:transform var(--tc-motion-fast) ease-out;border-radius:50%;display:block;transform:translate(2px)}._switchThumb_1r8sc_266[data-state=checked]{border-color:var(--tc-accent);transform:translate(18px)}._checkboxRow_1r8sc_293{cursor:pointer;align-items:center;gap:8px;display:inline-flex}._checkboxRow_1r8sc_293[data-disabled]{cursor:not-allowed}._checkboxBox_1r8sc_311{border-radius:var(--tc-radius-status);border-color:var(--tc-text-muted);background-color:var(--tc-surface);width:18px;height:18px;color:var(--tc-on-accent);transition:background-color var(--tc-motion-fast) ease-out;flex:none;justify-content:center;align-items:center;display:inline-flex}._checkboxBox_1r8sc_311[data-state=checked],._checkboxBox_1r8sc_311[data-state=indeterminate]{border-color:var(--tc-accent);background-color:var(--tc-accent)}._checkboxBox_1r8sc_311:disabled{opacity:.5}._checkboxIndicator_1r8sc_335{justify-content:center;align-items:center;display:inline-flex}._checkboxLabel_1r8sc_341{color:var(--tc-text);overflow-wrap:anywhere}._numberStepper_1r8sc_355{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);align-self:start;align-items:stretch;height:32px;display:inline-flex;overflow:hidden}._numberStepperButton_1r8sc_365{background-color:var(--tc-surface);width:28px;color:var(--tc-text);border-radius:0;justify-content:center;align-items:center;display:inline-flex}._numberStepperButton_1r8sc_365:hover:not(:disabled){background-color:var(--tc-surface-raised)}._numberStepperButton_1r8sc_365:disabled{color:var(--tc-text-muted)}._numberStepperInput_1r8sc_383{border:none;border-left:1px solid var(--tc-divider);border-right:1px solid var(--tc-divider);background-color:var(--tc-surface);width:56px;color:var(--tc-text);text-align:center}._numberStepperInput_1r8sc_383:focus-visible{outline:2px solid var(--tc-accent);outline-offset:-2px}._selectTrigger_1r8sc_402{border-radius:var(--tc-radius-field);border-color:var(--tc-divider);background-color:var(--tc-surface);min-width:160px;height:32px;color:var(--tc-text);justify-content:space-between;align-items:center;gap:8px;padding:0 10px;display:inline-flex}._selectTrigger_1r8sc_402:hover:not(:disabled){background-color:var(--tc-surface-raised)}._selectTrigger_1r8sc_402[data-placeholder]{color:var(--tc-text-muted)}._selectValue_1r8sc_424{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectContent_1r8sc_433{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);max-height:320px;width:var(--reka-select-trigger-width);max-width:var(--reka-select-content-available-width);overflow:hidden}._selectViewport_1r8sc_444{padding:4px}._selectItem_1r8sc_448{border-radius:var(--tc-radius-status);color:var(--tc-text);outline-offset:-2px;outline:2px solid #0000;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding:6px 8px;display:flex}._selectItemText_1r8sc_461{white-space:nowrap;text-overflow:ellipsis;text-align:left;flex:1;min-width:0;overflow:hidden}._selectItem_1r8sc_448[data-highlighted]{background-color:var(--tc-surface-raised)}._selectItem_1r8sc_448:focus-visible,._selectItem_1r8sc_448:focus{outline-color:var(--tc-accent)}._selectItem_1r8sc_448[data-disabled]{color:var(--tc-text-muted)}._selectItemIndicator_1r8sc_483{color:var(--tc-accent);flex-shrink:0;display:inline-flex}._fieldGroup_1r8sc_493{flex-direction:column;gap:6px;display:flex}._fieldGroupLabel_1r8sc_499{color:var(--tc-text);font-size:13px;font-weight:500}._fieldGroupRequired_1r8sc_505{color:var(--tc-error)}._fieldGroupHint_1r8sc_509{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._fieldGroupError_1r8sc_516{color:var(--tc-error);overflow-wrap:anywhere;margin:0;font-size:12px}._dialogOverlay_1r8sc_527{z-index:var(--tc-z-overlay);background-color:#1113187a;position:fixed;inset:0}._dialogContent_1r8sc_534{z-index:var(--tc-z-overlay);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);flex-direction:column;gap:12px;width:min(480px,100vw - 32px);max-height:calc(100vh - 64px);padding:20px;display:flex;position:fixed;top:50%;left:50%;overflow-y:auto;transform:translate(-50%,-50%)}._confirmDialogContent_1r8sc_552{gap:16px}._dialogHeader_1r8sc_556{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}._dialogTitle_1r8sc_563{color:var(--tc-text);overflow-wrap:anywhere;font-size:16px;font-weight:600}._dialogClose_1r8sc_570{border-radius:var(--tc-radius-field);width:28px;height:28px;color:var(--tc-text-muted);flex:none}._dialogClose_1r8sc_570:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._dialogDescription_1r8sc_583{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:13px}._dialogBody_1r8sc_589{flex-direction:column;gap:12px;display:flex}._confirmDialogActions_1r8sc_595{justify-content:flex-end;gap:8px;display:flex}._tooltipContent_1r8sc_605{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-status);background-color:var(--tc-text);max-width:240px;color:var(--tc-canvas);overflow-wrap:anywhere;padding:6px 10px;font-size:12px}._tooltipArrow_1r8sc_616{fill:var(--tc-text)}._stateSurface_1r8sc_624{flex-direction:column;padding:4px 0;display:flex}._stateSurfaceSkeleton_1r8sc_630{flex-direction:column;gap:8px;padding:4px 0;display:flex}._skeletonBlock_1r8sc_637{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);height:12px}._stateSurfaceMessage_1r8sc_643{flex-direction:column;flex:1;justify-content:center;align-items:flex-start;gap:12px;padding:16px;display:flex}._stateSurfaceMessageGroup_1r8sc_656{flex-direction:column;gap:4px;display:flex}._stateSurfaceMessageTitle_1r8sc_662{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:500}._stateSurfaceMessageText_1r8sc_670{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:13px}._stateSurfaceErrorText_1r8sc_677{color:var(--tc-error)}._stateSurfaceAction_1r8sc_681{display:flex}._toastViewport_1r8sc_689{z-index:var(--tc-z-toast);flex-direction:column;gap:8px;width:320px;max-width:calc(100vw - 32px);margin:0;padding:0;display:flex;position:fixed;bottom:16px;right:16px}._toastRoot_1r8sc_703{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-status);background-color:var(--tc-surface);flex-direction:column;gap:4px;padding:12px 36px 12px 12px;display:flex;position:relative}._toastTitle_1r8sc_714{color:var(--tc-text);overflow-wrap:anywhere;font-size:13px;font-weight:600}._toastDescription_1r8sc_721{color:var(--tc-text-muted);overflow-wrap:anywhere;font-size:12px}._toastClose_1r8sc_727{border-radius:var(--tc-radius-status);width:22px;height:22px;color:var(--tc-text-muted);position:absolute;top:8px;right:8px}._toastClose_1r8sc_727:hover{background-color:var(--tc-surface-raised);color:var(--tc-text)}._toastSuccess_1r8sc_742{border-color:var(--tc-success)}._toastSuccess_1r8sc_742 ._toastTitle_1r8sc_714{color:var(--tc-success)}._toastError_1r8sc_750{border-color:var(--tc-error)}._toastError_1r8sc_750 ._toastTitle_1r8sc_714{color:var(--tc-error)}._virtualList_1r8sc_762{position:relative;overflow-y:auto}._virtualListSizer_1r8sc_767{width:100%;position:relative}._virtualListItem_1r8sc_772{width:100%;position:absolute;top:0;left:0}", Ec = "._paramsBody_1gvv4_10{flex-direction:column;gap:16px;display:flex}._paramsDimensionRow_1gvv4_16{gap:12px;display:flex}._paramsDimensionRow_1gvv4_16>*{flex:1}._paramsAspectRow_1gvv4_25{align-items:flex-end;gap:12px;display:flex}._paramsAspectField_1gvv4_31{flex:1}._editBody_1gvv4_37{flex-direction:column;gap:16px;display:flex}._editTextareaWrap_1gvv4_43{position:relative}._editHighlightLayer_1gvv4_47{color:#0000;white-space:pre-wrap;word-break:break-word;font:inherit;pointer-events:none;margin:0;padding:8px 10px;position:absolute;inset:0;overflow:hidden}._editHighlightMatch_1gvv4_60{border-radius:var(--tc-radius-status);background-color:color-mix(in srgb, var(--tc-accent) 22%, transparent)}._editTextarea_1gvv4_43{resize:vertical;border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);width:100%;min-height:96px;color:var(--tc-text);font:inherit;background-color:#0000;padding:8px 10px;line-height:1.5;position:relative}._editTextarea_1gvv4_43:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._editTagActions_1gvv4_84{gap:8px;display:flex}._editSubmenu_1gvv4_89{grid-template-columns:repeat(2,1fr);gap:8px;display:grid}._editFooter_1gvv4_95{justify-content:flex-end;gap:8px;display:flex}._inpaintDialogContent_1gvv4_107{width:min(90vw,720px)}._inpaintBody_1gvv4_111{flex-direction:column;gap:12px;width:100%;display:flex}._inpaintCanvasFrame_1gvv4_121{width:100%;aspect-ratio:var(--tc-inpaint-aspect,1);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);touch-action:none;position:relative;overflow:hidden}._inpaintCanvasFrame_1gvv4_121 canvas{width:100%;height:100%;position:absolute;inset:0}._inpaintToolbar_1gvv4_139{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._inpaintToolbarDivider_1gvv4_146{background-color:var(--tc-divider);align-self:stretch;width:1px;margin:0 4px}._inpaintBrushRow_1gvv4_153{align-items:center;gap:12px;display:flex}._inpaintBrushRow_1gvv4_153>*{flex:1}._inpaintPromptGrid_1gvv4_163{grid-template-columns:1fr 1fr;gap:12px;display:grid}._inpaintFooter_1gvv4_169{justify-content:flex-end;gap:8px;display:flex}._inpaintDimensionError_1gvv4_175{color:var(--tc-error);margin:0;font-size:12px}", Dc = "._floatingEntry_1k9dx_9{background-color:var(--tc-surface);width:56px;height:56px;color:var(--tc-text);cursor:grab;touch-action:none;z-index:var(--tc-z-shell-sticky);border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:fixed;top:0;left:0}._floatingEntry_1k9dx_9:hover:not(:disabled){background-color:var(--tc-surface-raised)}._floatingEntryDragging_1k9dx_31{cursor:grabbing}._floatingEntryMedia_1k9dx_35{object-fit:cover;pointer-events:none;border-radius:50%;width:100%;height:100%}", Oc = "._window_1rdvc_1{width:min(1180px,100vw - 40px);height:min(780px,100dvh - 80px);min-height:560px;color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid color-mix(in srgb, var(--tc-divider) 78%, var(--tc-text) 22%);transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0);pointer-events:auto;isolation:isolate;border-radius:12px;animation:.18s cubic-bezier(.2,.8,.2,1) _floating-window-enter_1rdvc_1;position:fixed;top:0;left:0;overflow:hidden;box-shadow:0 32px 96px #080b104d,0 8px 28px #080b102e}._window_1rdvc_1[data-positioned=false]{visibility:hidden}._window_1rdvc_1[data-dragging=true]{-webkit-user-select:none;user-select:none;box-shadow:0 40px 112px #080b105c,0 12px 36px #080b1038}@keyframes _floating-window-enter_1rdvc_1{0%{opacity:0;transform:translate3d(var(--tc-floating-window-x,20px), calc(var(--tc-floating-window-y,64px) + 8px), 0) scale(.985)}to{opacity:1;transform:translate3d(var(--tc-floating-window-x,20px), var(--tc-floating-window-y,64px), 0) scale(1)}}@media (width<=959px){._window_1rdvc_1{border-radius:10px;width:auto;height:auto;min-height:0;inset:8px;transform:none}._window_1rdvc_1[data-positioned=false]{visibility:visible}}@media (prefers-reduced-motion:reduce){._window_1rdvc_1{animation:none}}", kc = "._shell_n4gcm_8{background-color:var(--tc-canvas);width:100%;height:100%;min-height:0;color:var(--tc-text);display:grid;position:relative;overflow:hidden}._shell_n4gcm_8[data-viewport=desktop]{grid-template-columns:64px minmax(0, 1fr) clamp(320px, var(--tc-inspector-width,320px), 400px);grid-template-rows:56px minmax(0,1fr) auto;grid-template-areas:\"topbar topbar topbar\"\"rail workspace inspector\"\"taskstrip taskstrip taskstrip\"}._shell_n4gcm_8[data-viewport=desktop][data-inspector-collapsed=true]{grid-template-columns:64px minmax(0,1fr) 0}._shell_n4gcm_8[data-viewport=mobile]{grid-template:\"topbar\"56px\"workspace\"minmax(0,1fr)\"taskstrip\"\"bottomnav\"64px/minmax(0,1fr);height:100dvh}._top_bar_n4gcm_57{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);cursor:move;touch-action:none;grid-area:topbar;justify-content:space-between;align-items:center;gap:8px;min-width:0;padding-inline:16px;display:flex}._top_bar_start_n4gcm_71,._top_bar_end_n4gcm_72{align-items:center;gap:8px;min-width:0;display:flex}._top_bar_brand_n4gcm_79{color:var(--tc-text);flex:none;font-size:13px;font-weight:650}._top_bar_divider_n4gcm_86{color:var(--tc-divider);flex:none}._top_bar_title_n4gcm_91{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-weight:500;overflow:hidden}._icon_button_n4gcm_100{width:32px;height:32px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);flex:none;justify-content:center;align-items:center;display:flex}._shell_n4gcm_8[data-viewport=mobile] ._top_bar_n4gcm_57{cursor:default;touch-action:auto}._icon_button_n4gcm_100._close_button_n4gcm_116:hover{color:var(--tc-on-accent);background-color:var(--tc-error)}._icon_button_n4gcm_100[data-selected=true],._icon_button_n4gcm_100[aria-pressed=true]{color:var(--tc-accent)}._rail_n4gcm_126{background-color:var(--tc-surface);border-right:1px solid var(--tc-divider);flex-direction:column;grid-area:rail;align-items:center;gap:6px;padding:12px 8px;display:flex;overflow-y:auto}._rail_button_n4gcm_138{width:48px;height:48px;color:var(--tc-text-muted);border-radius:var(--tc-radius-field);border-left:2px solid #0000;justify-content:center;align-items:center;padding:4px;display:flex;position:relative}._rail_button_n4gcm_138[data-selected=true]{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._tooltip_content_n4gcm_157{color:var(--tc-surface);background-color:var(--tc-text);border-radius:var(--tc-radius-field);padding:4px 8px;font-size:12px}._workspace_n4gcm_165{background-color:var(--tc-canvas);grid-area:workspace;min-width:0;min-height:0;overflow:auto;container:studio-workspace/inline-size}._workspace_placeholder_n4gcm_175{flex-direction:column;justify-content:center;align-items:flex-start;min-height:240px;padding:24px;display:flex}._inspector_n4gcm_184{background-color:var(--tc-surface);border-left:1px solid var(--tc-divider);grid-area:inspector;min-width:0;display:flex;overflow:hidden}._inspector_resizer_n4gcm_193{cursor:col-resize;touch-action:none;background-color:#0000;flex:none;width:4px}._inspector_resizer_n4gcm_193:hover,._inspector_resizer_n4gcm_193[data-dragging=true]{background-color:var(--tc-divider)}._inspector_panel_n4gcm_206{flex-direction:column;flex:auto;min-width:0;display:flex;overflow:hidden}._inspector_header_n4gcm_214{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:12px;display:flex}._inspector_body_n4gcm_223{min-height:0;color:var(--tc-text-muted);flex:auto;padding:12px;overflow:auto}._inspector_selection_kind_n4gcm_231{color:var(--tc-text);margin:0 0 8px;font-size:13px;font-weight:600}._inspector_selection_n4gcm_231{flex-direction:column;gap:8px;margin:0;display:flex}._inspector_selection_n4gcm_231 dt{color:var(--tc-text-muted);font-size:12px}._inspector_selection_n4gcm_231 dd{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:13px}._bottom_nav_n4gcm_257{min-height:0;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);grid-area:bottomnav;display:flex}._bottom_nav_item_n4gcm_266{min-width:0;color:var(--tc-text-muted);flex-direction:column;flex:1 1 0;justify-content:center;align-items:center;gap:2px;padding-block:6px;display:flex}._bottom_nav_item_n4gcm_266[data-selected=true]{color:var(--tc-accent)}._bottom_nav_item_label_n4gcm_282{white-space:nowrap;text-overflow:ellipsis;max-width:100%;font-size:10px;overflow:hidden}._more_menu_content_n4gcm_290{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);min-width:176px;padding:4px}._more_menu_item_n4gcm_298{color:var(--tc-text);border-radius:var(--tc-radius-field);align-items:center;gap:8px;padding:8px 10px;display:flex}._more_menu_item_n4gcm_298[data-highlighted]{color:var(--tc-accent);background-color:var(--tc-surface);outline:none}._sheet_overlay_n4gcm_313{background-color:var(--tc-text);opacity:.32;position:fixed;inset:0}._sheet_content_n4gcm_320{width:100%;max-height:80dvh;padding-bottom:env(safe-area-inset-bottom,0px);background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;display:flex;position:fixed;bottom:0;left:0;right:0}._sheet_handle_n4gcm_334{background-color:var(--tc-text-muted);border-radius:var(--tc-radius-status);flex:none;width:32px;height:4px;margin:8px auto}._sheet_header_n4gcm_346{border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;padding:4px 16px 12px;display:flex}._sheet_body_n4gcm_355{min-height:0;color:var(--tc-text-muted);flex:auto;padding:16px;overflow:auto}._task_strip_n4gcm_41{background-color:var(--tc-surface);border-top:1px solid var(--tc-divider);flex-direction:column;grid-area:taskstrip;min-width:0;display:flex}._task_strip_header_n4gcm_372{flex:none;justify-content:space-between;align-items:center;padding:6px 12px;display:flex}._task_strip_summary_n4gcm_380{font-variant-numeric:tabular-nums;min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._task_strip_list_n4gcm_389{gap:8px;padding:0 12px 8px;display:flex;overflow-x:auto}._task_chip_n4gcm_396{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);flex:none;align-items:center;gap:6px;max-width:220px;height:28px;padding-inline:8px;display:flex}._task_chip_dot_n4gcm_408{background-color:var(--tc-text-muted);border-radius:50%;flex:none;width:6px;height:6px}._task_chip_dot_n4gcm_408[data-status=pending]{background-color:var(--tc-text-muted)}._task_chip_dot_n4gcm_408[data-status=success]{background-color:var(--tc-success)}._task_chip_dot_n4gcm_408[data-status=error]{background-color:var(--tc-error)}._task_chip_label_n4gcm_428{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._skeleton_block_n4gcm_435{background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field)}._partial_banner_n4gcm_440{color:var(--tc-warning);background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex:none;justify-content:space-between;align-items:center;gap:12px;padding:8px 12px;display:flex}._state_screen_n4gcm_452{width:min(560px,100vw - 40px);max-height:calc(100dvh - 40px);color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid var(--tc-divider);border-radius:12px;flex-direction:column;justify-content:center;align-items:flex-start;padding:32px;display:flex;position:fixed;top:20px;right:20px;overflow:auto;box-shadow:0 20px 56px #11131838}._state_screen_eyebrow_n4gcm_471{color:var(--tc-text-muted)}._state_screen_title_n4gcm_475{max-width:56ch}._state_screen_action_n4gcm_479{color:var(--tc-surface);background-color:var(--tc-accent);border-radius:var(--tc-radius-field);align-items:center;margin-top:20px;padding:8px 16px;display:inline-flex}._state_screen_description_n4gcm_489{max-width:56ch;color:var(--tc-text-muted)}", Ac = "._assetsView_s3c58_10{flex-direction:column;gap:16px;height:100%;min-height:0;padding:16px;display:flex}._tabsList_s3c58_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;gap:4px;padding-bottom:0;display:flex}._tabsTrigger_s3c58_31{border-radius:var(--tc-radius-field) var(--tc-radius-field) 0 0;color:var(--tc-text-muted);transition:color var(--tc-motion-fast) ease-out, background-color var(--tc-motion-fast) ease-out;background-color:#0000;border:1px solid #0000;border-bottom-width:2px;padding:8px 14px;font-size:13px;font-weight:500}._tabsTrigger_s3c58_31:hover{color:var(--tc-text);background-color:var(--tc-surface-raised)}._tabsTrigger_s3c58_31[data-state=active]{color:var(--tc-accent);border-bottom-color:var(--tc-accent)}._tabsContent_s3c58_55{flex:1;min-height:0;overflow-y:auto}._tabsContent_s3c58_55:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}._categoryList_s3c58_70{flex-direction:column;gap:12px;padding:12px 0;display:flex}._categoryToolbar_s3c58_77{flex-wrap:wrap;align-items:center;gap:12px;display:flex}._searchInput_s3c58_84{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);min-width:160px;color:var(--tc-text);flex:1;padding:8px 12px;font-size:13px}._searchInput_s3c58_84:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reorderHint_s3c58_100{color:var(--tc-text-muted);font-size:12px}._emptyDescription_s3c58_105{color:var(--tc-text-muted);font-size:13px}._cardGrid_s3c58_110{flex-direction:column;gap:8px;display:flex}._assetCard_s3c58_120{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);flex-wrap:wrap;align-items:center;gap:8px;padding:6px 8px;display:flex}._assetCard_s3c58_120[data-dragging]{border-color:var(--tc-accent)}._dragHandle_s3c58_135{color:var(--tc-text-muted);cursor:grab;flex:none;padding:4px;display:inline-flex}._assetCardMain_s3c58_147{border-radius:var(--tc-radius-field);text-align:left;min-width:0;transition:background-color var(--tc-motion-fast) ease-out;background-color:#0000;flex-direction:column;flex:160px;align-items:flex-start;gap:2px;padding:2px 4px;display:flex}._assetCardMain_s3c58_147:hover{background-color:var(--tc-surface-raised)}._assetCardName_s3c58_165{color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13px;font-weight:500;overflow:hidden}._assetCardSummary_s3c58_175{color:var(--tc-text-muted);flex-wrap:wrap;gap:8px;font-size:12px;display:flex}._assetCardSummaryPart_s3c58_183{white-space:nowrap}._assetCardActions_s3c58_187{flex:none;align-items:center;gap:8px;margin-left:auto;display:flex}._form_s3c58_199{flex-direction:column;gap:14px;display:flex}._textInput_s3c58_205,._textArea_s3c58_206{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;color:var(--tc-text);padding:8px 10px;font-family:inherit;font-size:13px}._textArea_s3c58_206{resize:vertical;min-height:72px}._textInput_s3c58_205:focus-visible,._textArea_s3c58_206:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._formActions_s3c58_228{justify-content:flex-end;gap:8px;display:flex}._vocabularyPanel_s3c58_238{flex-direction:column;gap:20px;display:flex}._vocabularySearchRow_s3c58_244{gap:8px;display:flex}._searchResultsList_s3c58_249{flex-direction:column;gap:4px;display:flex}._searchResultRow_s3c58_255{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:baseline;gap:12px;padding:8px 4px;display:flex}._searchResultTag_s3c58_264{color:var(--tc-text);font-size:13px}._searchResultTranslation_s3c58_269{color:var(--tc-text-muted);font-size:12px}._loadMoreRow_s3c58_274{justify-content:center;padding-top:4px;display:flex}._sectionTitle_s3c58_280{color:var(--tc-text);font-size:13px;font-weight:600}._catalogList_s3c58_286{flex-direction:column;gap:8px;display:flex}._catalogEntry_s3c58_292{border-bottom:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 4px;display:flex}._catalogEntryInfo_s3c58_301{flex-direction:column;gap:2px;min-width:0;display:flex}._catalogEntryName_s3c58_308{color:var(--tc-text);font-size:13px;font-weight:500}._catalogEntryMeta_s3c58_314{color:var(--tc-text-muted);font-size:12px}._bundledBadge_s3c58_319{border-radius:var(--tc-radius-status);background-color:var(--tc-surface-raised);color:var(--tc-text-muted);align-items:center;padding:2px 6px;font-size:11px;display:inline-flex}._nsfwSection_s3c58_329{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:8px 12px}._nsfwToggle_s3c58_335{color:var(--tc-text-muted);background:0 0;align-items:center;gap:6px;padding:4px 0;font-size:12px;display:flex}._nsfwNotice_s3c58_345{color:var(--tc-text-muted);padding:8px 0 0;font-size:12px}._installProgress_s3c58_351{color:var(--tc-text-muted);font-size:12px}._workflowToolbarRow_s3c58_360{flex-wrap:wrap;gap:8px;display:flex}._placeholderList_s3c58_366{flex-direction:column;gap:8px;display:flex}._placeholderRow_s3c58_372{align-items:center;gap:8px;display:flex}._placeholderKey_s3c58_378{width:40%;color:var(--tc-text);text-overflow:ellipsis;white-space:nowrap;flex:none;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:hidden}._hiddenFileInput_s3c58_389{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}", jc = "._view_t20r4_7{flex-direction:column;gap:24px;padding:16px;display:flex}._section_t20r4_14{flex-direction:column;min-width:0;display:flex}._section_header_t20r4_20{justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px;display:flex}._section_title_t20r4_28{color:var(--tc-text);font-size:13px;font-weight:600}._row_t20r4_34{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:8px 0;display:flex}._row_label_t20r4_43{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_t20r4_51{color:var(--tc-text);flex:none}._status_text_t20r4_56{color:var(--tc-text-muted);align-items:center;gap:6px;display:inline-flex}._status_text_t20r4_56[data-tone=success]{color:var(--tc-success)}._status_text_t20r4_56[data-tone=warning]{color:var(--tc-warning)}._status_text_t20r4_56[data-tone=error]{color:var(--tc-error)}._timeline_list_t20r4_75{border-top:1px solid var(--tc-divider)}._timeline_row_t20r4_79{border-bottom:1px solid var(--tc-divider);grid-template-columns:92px 1fr 1fr minmax(0,1.4fr);align-items:center;gap:12px;height:100%;padding:0 4px;font-size:12px;display:grid}._timeline_cell_t20r4_90{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._timeline_header_t20r4_97{color:var(--tc-text-muted);text-transform:uppercase;font-size:11px;font-weight:600}._timeline_header_t20r4_97 ._timeline_cell_t20r4_90{color:inherit}._timeline_code_t20r4_108{color:var(--tc-text);font-family:ui-monospace,SFMono-Regular,Consolas,monospace}._timeline_error_t20r4_113{color:var(--tc-error)}._warning_list_t20r4_117{flex-direction:column;gap:4px;padding:8px 0 0;display:flex}._warning_item_t20r4_124{color:var(--tc-warning);overflow-wrap:anywhere;font-size:12px}._actions_row_t20r4_130{align-items:center;gap:12px;padding-top:8px;display:flex}._description_t20r4_137{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}", Mc = "._galleryView_1wzts_10{flex-direction:column;gap:12px;height:100%;min-height:0;padding:16px;display:flex}._filterBar_1wzts_23{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:16px;padding-bottom:12px;display:flex}._dateFilterLabel_1wzts_32{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:flex}._dateInput_1wzts_43{border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);background-color:var(--tc-surface);color:var(--tc-text);padding:6px 8px;font-size:12px}._cacheOccupancy_1wzts_52{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._emptyDescription_1wzts_58{color:var(--tc-text-muted);font-size:13px}._skeletonGrid_1wzts_67{flex-wrap:wrap;gap:8px;display:flex}._skeletonTile_1wzts_73{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);width:176px;height:176px}._gridContainer_1wzts_84{flex:1;min-height:0}._gridRow_1wzts_89{display:flex}._tile_1wzts_93{border-radius:var(--tc-radius-image);background-color:var(--tc-surface-raised);flex:none;position:relative;overflow:hidden}._tile_1wzts_93[data-selected]{outline:2px solid var(--tc-accent);outline-offset:-2px}._tileButton_1wzts_106{width:100%;height:100%;padding:0;display:block}._tileSkeleton_1wzts_113{background-color:var(--tc-surface-raised);position:absolute;inset:0}._tileImage_1wzts_119{object-fit:cover;width:100%;height:100%;transition:opacity var(--tc-motion-normal) ease-out}._tileFallback_1wzts_126{color:var(--tc-text-muted);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:8px;font-size:11px;display:flex;position:absolute;inset:0}._tilePinnedBadge_1wzts_144{border-radius:var(--tc-radius-status);background-color:var(--tc-media-scrim);color:var(--tc-media-ink);justify-content:center;align-items:center;padding:3px;display:inline-flex;position:absolute;top:6px;left:6px}._tileSelectToggle_1wzts_157{border-radius:var(--tc-radius-status);border:1px solid var(--tc-media-ink);background-color:var(--tc-media-scrim);width:20px;height:20px;color:var(--tc-media-ink);transition:background-color var(--tc-motion-fast) ease-out;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:6px;right:6px}._tileSelectToggle_1wzts_157[data-checked]{background-color:var(--tc-accent);color:var(--tc-on-accent)}._bulkActionBar_1wzts_184{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding-top:12px;display:flex}._bulkActionCount_1wzts_193{color:var(--tc-text);font-size:13px}._bulkActionButtons_1wzts_198{align-items:center;gap:8px;display:flex}._previewOverlay_1wzts_208{z-index:var(--tc-z-overlay);background-color:#111318b8;position:fixed;inset:0}._previewContent_1wzts_215{z-index:var(--tc-z-overlay);border-radius:var(--tc-radius-panel);background-color:var(--tc-surface);display:flex;position:fixed;inset:16px;overflow:hidden}._previewLayout_1wzts_225{width:100%;min-height:0;display:flex}._previewMain_1wzts_231{flex-direction:column;flex:1;min-width:0;display:flex}._previewToolbar_1wzts_238{border-bottom:1px solid var(--tc-divider);align-items:center;gap:4px;padding:8px;display:flex}._previewToolbarButton_1wzts_246{border-radius:var(--tc-radius-field);width:32px;height:32px;color:var(--tc-text);justify-content:center;align-items:center;display:inline-flex}._previewToolbarButton_1wzts_246:hover{background-color:var(--tc-surface-raised)}._previewToolbarSpacer_1wzts_260{flex:1}._previewImageArea_1wzts_264{flex:1;justify-content:center;align-items:center;gap:8px;min-height:0;padding:12px;display:flex;overflow:auto}._previewImageFrame_1wzts_275{flex:1;justify-content:center;align-items:center;height:100%;min-height:0;display:flex;position:relative}._previewImage_1wzts_264{border-radius:var(--tc-radius-image);object-fit:contain;touch-action:auto;max-width:100%;max-height:100%}._previewImageFallback_1wzts_293{color:var(--tc-text-muted);justify-content:center;align-items:center;padding:24px;font-size:13px;display:flex}._previewNavButton_1wzts_302{flex:none}._previewInspector_1wzts_306{border-left:1px solid var(--tc-divider);flex:none;width:320px;max-width:40vw;padding:16px;overflow-y:auto}._metadataInspector_1wzts_319{flex-direction:column;gap:12px;display:flex}._metadataTitle_1wzts_325{color:var(--tc-text);font-size:14px;font-weight:600}._metadataOrphanNotice_1wzts_331{color:var(--tc-warning);font-size:12px}._metadataList_1wzts_336{flex-direction:column;gap:8px;display:flex}._metadataRow_1wzts_342{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:2px;padding-bottom:6px;font-size:12px;display:flex}._metadataRow_1wzts_342 dt{color:var(--tc-text-muted)}._metadataRow_1wzts_342 dd{color:var(--tc-text);margin:0}._metadataPrompt_1wzts_360{white-space:pre-wrap;overflow-wrap:anywhere}._metadataEmpty_1wzts_365{color:var(--tc-text-muted);font-size:12px}._metadataActions_1wzts_370{flex-wrap:wrap;gap:8px;display:flex}._metadataActionsHint_1wzts_376{color:var(--tc-text-muted);font-size:12px}@media (width<=959px){._previewContent_1wzts_215{border-radius:0;inset:0}._previewLayout_1wzts_225{flex-direction:column;overflow-y:auto}._previewMain_1wzts_231{flex:none}._previewToolbar_1wzts_238{z-index:1;background-color:var(--tc-surface);position:sticky;top:0}._previewImageArea_1wzts_264{min-height:45vh}._previewInspector_1wzts_306{border-left:none;border-top:1px solid var(--tc-divider);width:100%;max-width:100%}}", Nc = "._prompt_view_1d2kr_7{grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;min-height:100%;display:grid}._browser_column_1d2kr_14{border-right:1px solid var(--tc-divider)}._editor_column_1d2kr_18{flex-direction:column;min-width:0;padding-bottom:24px;display:flex}@media (width<=959px){._prompt_view_1d2kr_7{grid-template-columns:minmax(0,1fr)}._browser_column_1d2kr_14{border-right:none;border-bottom:1px solid var(--tc-divider)}}._section_header_1d2kr_40{justify-content:space-between;align-items:center;gap:8px;padding:12px 16px 4px;display:flex}._section_title_1d2kr_48{font-weight:600}._icon_text_button_1d2kr_55{color:var(--tc-accent);align-items:center;gap:4px;padding:1px 6px;display:inline-flex}._text_input_1d2kr_63{width:100%;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_narrow_1d2kr_74{width:64px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);padding:6px 8px;font-family:inherit;font-size:13px}._text_input_1d2kr_63:focus-visible,._text_input_narrow_1d2kr_74:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._textarea_1d2kr_91{width:100%;min-height:56px;color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:8px 10px;font-family:inherit;font-size:14px}._textarea_1d2kr_91:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._preset_browser_1d2kr_111{flex-direction:column;display:flex}._search_input_1d2kr_116{color:var(--tc-text);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 8px;font-size:13px}._bulk_delete_button_1d2kr_126{color:var(--tc-error);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);margin:0 16px 8px;padding:6px 10px;font-size:12px}._group_header_1d2kr_135{color:var(--tc-text-muted);border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;display:flex}._preset_list_1d2kr_145{flex-direction:column;display:flex}._preset_row_1d2kr_150{align-items:center;gap:8px;padding:4px 16px;display:flex}._preset_row_selected_1d2kr_157{background-color:var(--tc-surface-raised)}._preset_name_button_1d2kr_161{text-align:left;text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;padding:4px 0;overflow:hidden}._name_row_1d2kr_173{border-bottom:1px solid var(--tc-divider);align-items:flex-end;gap:12px;padding:12px 16px;display:flex}._name_row_1d2kr_173>:first-child{flex:auto}._prompt_builder_1d2kr_187{border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:8px;padding-bottom:8px;display:flex}._context_preview_1d2kr_195{flex-direction:column;gap:8px;padding:0 16px 12px;display:flex}._context_block_title_1d2kr_202{color:var(--tc-text-muted);margin-bottom:4px;font-size:12px}._context_list_1d2kr_208{margin:0;padding-left:16px}._quality_controls_1d2kr_215{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._switch_list_1d2kr_220{flex-direction:column;gap:4px;padding:0 16px 8px;display:flex}._replacement_rules_1d2kr_229,._regex_rules_1d2kr_230{border-bottom:1px solid var(--tc-divider);padding-bottom:8px}._rule_row_1d2kr_235{border-top:1px solid var(--tc-divider);flex-wrap:wrap;align-items:flex-end;gap:8px;padding:8px 16px;display:flex}._rule_row_1d2kr_235>:not(._rule_row_action_1d2kr_244){flex:140px}._rule_row_action_1d2kr_244{flex:none;align-items:center;gap:8px;display:flex}._test_result_1d2kr_257{color:var(--tc-success);flex-basis:100%;margin:0;font-size:12px}._test_result_error_1d2kr_264{color:var(--tc-error);flex-basis:100%;margin:0;font-size:12px}._test_panel_1d2kr_273{flex-direction:column;display:flex}._test_panel_body_1d2kr_281{flex-direction:column;gap:8px;padding:0 16px 16px;display:flex}._tools_disabled_note_1d2kr_288{color:var(--tc-text-muted);margin:0;font-size:12px}", Pc = "._view_19ffo_7{flex-direction:column;gap:32px;width:min(100%,920px);margin:0 auto;padding:24px;display:flex}._onboarding_19ffo_16{background-color:var(--tc-surface-raised);border:1px solid var(--tc-divider);grid-template-columns:48px minmax(0,1fr);gap:16px;padding:24px;display:grid}._onboarding_icon_19ffo_25{width:48px;height:48px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._onboarding_label_19ffo_37{color:var(--tc-accent);margin-bottom:4px;font-size:12px;font-weight:650}._onboarding_title_19ffo_44{color:var(--tc-text);font-size:22px;font-weight:680;line-height:1.2}._onboarding_description_19ffo_51{max-width:62ch;color:var(--tc-text-muted);margin-top:8px;line-height:1.55}@media (width<=639px){._view_19ffo_7{gap:24px;padding:20px 16px}._onboarding_19ffo_16{grid-template-columns:minmax(0,1fr);padding:20px}}._section_19ffo_70{flex-direction:column;min-width:0;display:flex}._section_header_19ffo_79{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;display:flex}._section_title_19ffo_89{color:var(--tc-text);font-size:14px;font-weight:650}._row_19ffo_95{border-top:1px solid var(--tc-divider);justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._row_label_19ffo_104{min-width:0;color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._row_value_19ffo_112{color:var(--tc-text);flex:none}._profile_row_19ffo_76{border-top:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;display:flex}._profile_identity_19ffo_120{flex-direction:column;flex:12rem;gap:2px;min-width:0;display:flex}._profile_name_19ffo_144{color:var(--tc-text);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._profile_meta_19ffo_151{color:var(--tc-text-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._profile_actions_19ffo_161{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;display:flex}._badge_19ffo_169{border:1px solid var(--tc-accent);border-radius:var(--tc-radius-status);color:var(--tc-accent);flex:none;padding:2px 8px;font-size:11px}._form_grid_19ffo_178{flex-direction:column;gap:16px;display:flex}._status_text_19ffo_184{color:var(--tc-text-muted);align-items:center;gap:6px;font-size:12px;display:inline-flex}._status_text_19ffo_184[data-tone=success]{color:var(--tc-success)}._status_text_19ffo_184[data-tone=warning]{color:var(--tc-warning)}._status_text_19ffo_184[data-tone=error]{color:var(--tc-error)}._risk_banner_19ffo_204{border:1px solid var(--tc-warning);border-radius:var(--tc-radius-field);background-color:var(--tc-surface-raised);flex-direction:column;gap:8px;padding:12px;display:flex}._risk_banner_19ffo_204[data-severity=error]{border-color:var(--tc-error)}._risk_banner_title_19ffo_218{color:var(--tc-warning);align-items:center;gap:6px;font-weight:600;display:flex}._risk_banner_19ffo_204[data-severity=error] ._risk_banner_title_19ffo_218{color:var(--tc-error)}._risk_banner_description_19ffo_230{color:var(--tc-text);overflow-wrap:anywhere;margin:0;font-size:12px}._risk_banner_actions_19ffo_237{align-items:center;gap:8px;display:flex}._acknowledged_note_19ffo_243{color:var(--tc-success);align-items:center;gap:6px;font-size:12px;display:flex}._description_19ffo_251{color:var(--tc-text-muted);overflow-wrap:anywhere;margin:0;font-size:12px}._actions_row_19ffo_258{align-items:center;gap:12px;padding-top:8px;display:flex}._vault_mode_row_19ffo_264{border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;display:flex}._vault_mode_row_19ffo_264 ._profile_meta_19ffo_151{white-space:normal;text-overflow:clip;line-height:1.45;overflow:visible}._vault_controls_19ffo_280{gap:14px;width:min(100%,520px);padding-top:16px;display:grid}._vault_controls_19ffo_280>button{width:fit-content}._vault_unlocked_actions_19ffo_291{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._typed_confirm_input_19ffo_298{border-radius:var(--tc-radius-field);background-color:var(--tc-surface);width:100%;height:36px;color:var(--tc-text);border-color:var(--tc-divider);padding:0 10px}._typed_confirm_input_19ffo_298:focus-visible{outline:2px solid var(--tc-accent);outline-offset:2px}", Fc = "._workbench_view_10r88_8{background-color:var(--tc-canvas);grid-template-columns:minmax(0,1fr) minmax(260px,320px);gap:0;min-height:100%;display:grid}._workbench_view_setup_10r88_16{grid-template-columns:minmax(0,1fr)}._setup_panel_10r88_20{grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);align-items:center;gap:40px;min-height:100%;padding:48px;display:grid}._setup_intro_10r88_29{flex-direction:column;align-items:flex-start;max-width:560px;display:flex}._setup_icon_10r88_36{width:56px;height:56px;color:var(--tc-accent);background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;margin-bottom:24px;display:flex}._setup_label_10r88_49{color:var(--tc-accent);margin-bottom:8px;font-size:12px;font-weight:650}._setup_title_10r88_56{max-width:18ch;color:var(--tc-text);font-size:32px;font-weight:680;line-height:1.12}._setup_description_10r88_64{max-width:52ch;color:var(--tc-text-muted);margin:16px 0 24px;font-size:15px;line-height:1.65}._setup_steps_10r88_72{background-color:var(--tc-surface);border:1px solid var(--tc-divider)}._setup_step_10r88_72{border-top:1px solid var(--tc-divider);grid-template-columns:32px minmax(0,1fr);gap:14px;padding:20px;display:grid}._setup_step_10r88_72:first-child{border-top:none}._setup_step_index_10r88_89{width:28px;height:28px;color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-status);font-variant-numeric:tabular-nums;justify-content:center;align-items:center;font-size:12px;font-weight:650;display:flex}._setup_step_active_10r88_103 ._setup_step_index_10r88_89{color:var(--tc-on-accent);background-color:var(--tc-accent)}._setup_step_title_10r88_108{color:var(--tc-text);font-size:14px;font-weight:600}._setup_step_description_10r88_114{color:var(--tc-text-muted);margin-top:4px;font-size:12px;line-height:1.55}._main_column_10r88_121{background-color:var(--tc-surface);border-right:1px solid var(--tc-divider);flex-direction:column;min-width:0;display:flex}._side_column_10r88_129{background-color:var(--tc-surface);flex-direction:column;min-width:0;display:flex}@container studio-workspace (width<=760px){._workbench_view_10r88_8{grid-template-columns:minmax(0,1fr)}._main_column_10r88_121{border-right:none}._side_column_10r88_129{border-top:1px solid var(--tc-divider)}._setup_panel_10r88_20{grid-template-columns:minmax(0,1fr);align-content:center;gap:28px;padding:32px}}@container studio-workspace (width<=520px){._setup_panel_10r88_20{padding:24px 20px}._setup_title_10r88_56{font-size:28px}._provider_summary_10r88_168{grid-template-columns:minmax(0,1fr);gap:8px}}._section_header_10r88_174{justify-content:space-between;align-items:baseline;gap:12px;padding:16px 20px 6px;display:flex}._section_title_10r88_182{color:var(--tc-text);font-size:13px;font-weight:650}._section_hint_10r88_188{color:var(--tc-text-muted);font-size:12px}._inline_error_10r88_193{color:var(--tc-error);margin:4px 16px 0;font-size:12px}._prompt_composer_10r88_201{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);flex-direction:column;gap:16px;padding:20px;display:flex}._prompt_textarea_10r88_210{width:100%;min-height:80px;color:var(--tc-text);background-color:var(--tc-canvas);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-field);resize:vertical;padding:10px 12px;font-family:inherit;font-size:14px;line-height:1.55}._prompt_textarea_10r88_210:focus-visible{outline:2px solid var(--tc-accent);outline-offset:1px}._reference_strip_10r88_231{background-color:var(--tc-surface);border-bottom:1px solid var(--tc-divider);padding-bottom:20px}._reference_empty_10r88_237{flex-direction:column;align-items:flex-start;gap:8px;padding:8px 16px;display:flex}._reference_list_10r88_245{flex-wrap:wrap;gap:8px;padding:8px 16px 0;display:flex}._reference_tile_10r88_252{background-color:var(--tc-surface);border:1px solid var(--tc-divider);border-radius:var(--tc-radius-image);flex-direction:column;gap:6px;width:132px;padding:8px;display:flex}._reference_tile_thumb_10r88_263{height:72px;color:var(--tc-text-muted);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);justify-content:center;align-items:center;display:flex}._reference_tile_name_10r88_273{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}._reference_tile_actions_10r88_280{gap:2px;display:flex}._reference_tile_add_10r88_285{justify-content:center;align-items:center;width:132px;display:flex}._reference_add_button_10r88_292{color:var(--tc-accent);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);align-items:center;gap:6px;padding:8px 12px;display:flex}._picker_list_10r88_302{flex-direction:column;gap:4px;display:flex}._picker_item_10r88_308{text-align:left;width:100%;color:var(--tc-text);background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-field);padding:8px 10px}._submit_row_10r88_319{background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);flex-wrap:wrap;align-items:center;gap:8px 16px;padding:14px 20px;display:flex}._provider_summary_10r88_168{background-color:var(--tc-surface-raised);border-bottom:1px solid var(--tc-divider);grid-template-columns:auto minmax(180px,1fr);align-items:center;gap:16px;padding:12px 20px;display:grid}._provider_content_10r88_341{min-width:0;padding:0}._provider_summary_10r88_168 ._section_header_10r88_174{padding:0}._provider_content_10r88_341 [role=combobox]{width:100%}._text_action_button_10r88_354{color:var(--tc-accent);align-items:center;gap:4px;display:inline-flex}._active_jobs_10r88_363{background-color:var(--tc-surface);flex:auto;min-height:0;padding-bottom:20px}._job_list_10r88_370{flex-direction:column;display:flex}._job_row_10r88_375{border-top:1px solid var(--tc-divider);border-left:2px solid #0000;flex-direction:column;gap:6px;padding:10px 20px 10px 18px;display:flex}._job_row_selected_10r88_384{background-color:var(--tc-surface-raised);border-left-color:var(--tc-accent)}._job_row_main_10r88_393{text-align:left;align-items:center;gap:10px;width:100%;padding:0;display:flex}._job_status_dot_10r88_402{background-color:var(--tc-success);border-radius:50%;flex:none;width:6px;height:6px}._job_provider_10r88_410{font-weight:600}._job_state_10r88_414{color:var(--tc-text-muted);font-size:12px}._job_progress_10r88_419{color:var(--tc-text-muted);margin-left:auto;font-size:12px}._job_error_10r88_425{color:var(--tc-error);margin:0;font-size:12px}._job_row_actions_10r88_431{gap:4px;display:flex}._generation_inspector_10r88_438{background-color:var(--tc-surface);min-height:100%;padding-bottom:20px}._inspector_field_list_10r88_444{flex-direction:column;gap:6px;margin:0;padding:4px 16px;display:flex}._inspector_field_10r88_444{justify-content:space-between;gap:12px;font-size:12px;display:flex}._inspector_field_10r88_444 dt{color:var(--tc-text-muted)}._inspector_field_10r88_444 dd{text-align:right;text-overflow:ellipsis;white-space:nowrap;margin:0;overflow:hidden}._inspector_actions_10r88_471{align-items:center;gap:8px;padding:8px 16px;display:flex}._completion_preview_list_10r88_478{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 16px;display:grid}._completion_preview_tile_10r88_485{aspect-ratio:1;background-color:var(--tc-surface-raised);border-radius:var(--tc-radius-image);overflow:hidden}._completion_preview_tile_10r88_485 img{object-fit:cover;width:100%;height:100%}._completion_preview_placeholder_10r88_498{width:100%;height:100%;color:var(--tc-text-muted);justify-content:center;align-items:center;display:flex}", Ic = /__TAVERN_CANVAS_ASSET_URL__(.*?)__/gu;
function Lc(e) {
	return e.replaceAll(Ic, (e, t) => new URL(t, import.meta.url).href);
}
var Rc = Lc([
	Sc,
	Cc,
	wc,
	Tc,
	Dc,
	Ec,
	Oc,
	kc,
	Ac,
	Mc,
	Fc,
	Nc,
	jc,
	Pc
].join("\n")), zc = xc(globalThis).then(() => yc({
	stylesheet: Rc,
	version: "3.0.0"
}));
//#endregion
export { zc as bootstrap_handle };
