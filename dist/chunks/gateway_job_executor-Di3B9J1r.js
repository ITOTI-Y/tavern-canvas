import { c as e, m as t, r as n, u as r, x as i } from "./schemas-DMBLWk59.js";
import { i as a, n as o, r as s } from "./ids-stC4fUL8.js";
import { t as c } from "./generation-D3I1cvL5.js";
import { a as l, o as u, r as d, t as f } from "./provider-Ctw4medr.js";
import { a as p, o as m, r as h } from "./http_acknowledgment-DvPfaNgR.js";
import { a as g, s as _ } from "./media_command_service-U2z67TUK.js";
var v = e("1.0"), y = t({
	protocol_version: v,
	request: f
}), b = t({
	protocol_version: v,
	job_id: s,
	request_id: a,
	provider_id: u,
	state: c,
	image_ids: n(o).optional(),
	error: l.optional()
}), x = t({
	protocol_version: v,
	job_id: s,
	sequence: r().int().positive(),
	state: c,
	occurred_at: i({ offset: !1 }),
	image_ids: n(o).optional(),
	error: l.optional()
}), S = t({
	provider_id: u,
	capabilities: n(d)
}), C = t({
	max_concurrency: r().int().positive(),
	max_image_count: r().int().min(1).max(4),
	max_request_bytes: r().int().positive()
}), w = t({
	protocol_version: v,
	providers: n(S),
	limits: C
}), T = 2e6, E = 2e7, D = 64e3, O = 1, k = 250, A = 5e3, j = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled",
	"attached",
	"orphaned"
]), M = class extends Error {
	code;
	status_code;
	constructor(e, t, n = {}) {
		super(t, n), this.name = "GatewayTransportError", this.code = e, this.status_code = n.status_code;
	}
}, N = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "GatewayProtocolError";
	}
}, P = class {
	sleep(e, t) {
		return new Promise((n, r) => {
			if (t.aborted) {
				r(q());
				return;
			}
			let i = () => {
				clearTimeout(a), t.removeEventListener("abort", i), r(q());
			}, a = setTimeout(() => {
				t.removeEventListener("abort", i), n();
			}, e);
			t.addEventListener("abort", i, { once: !0 });
		});
	}
};
function ee(e) {
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !0;
	}
	return !1;
}
var F = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		if (this.#e = p(e.endpoint), m(this.#e) && !h(e.http_acknowledgments ?? {}, this.#e)) throw new M("configuration", "Cleartext Gateway origin has not been acknowledged");
		if (e.access_token.length === 0 || e.access_token.length > 4096 || ee(e.access_token)) throw new M("configuration", "Gateway access token is invalid");
		this.#t = e.access_token, this.#n = e.fetch ?? globalThis.fetch.bind(globalThis), this.#r = e.clock ?? new P();
	}
	async get_capabilities(e) {
		let t = await this.#a("/v1/capabilities", {
			method: "GET",
			signal: e
		});
		V(t);
		let n = w.safeParse(t);
		if (!n.success) throw J(n.error);
		return n.data;
	}
	async run(e, t) {
		let n = await this.submit(e, t.signal);
		return this.observe(n, t);
	}
	async submit(e, t) {
		K(t);
		let n = await this.get_capabilities(t);
		if (n.providers.find((t) => t.provider_id === e.provider_id) === void 0 || e.output_count > n.limits.max_image_count) throw new M("configuration", "Gateway does not support the requested provider operation");
		let r = y.parse({
			protocol_version: "1.0",
			request: e
		}), i = new TextEncoder().encode(JSON.stringify(r));
		if (i.byteLength > n.limits.max_request_bytes) throw new M("configuration", "Gateway request exceeds the advertised byte limit");
		let a = B(await this.#a("/v1/jobs", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: i,
			signal: t
		}));
		if (a.request_id !== e.request_id || a.provider_id !== e.provider_id) throw new N("Gateway job does not match the submitted request");
		return a;
	}
	async observe(e, t) {
		K(t.signal);
		let n = B(e);
		if (U(n.state)) return n;
		let r = 0;
		for (let e = 0; e <= O; e += 1) {
			try {
				for await (let e of this.#i(n.job_id, r, t.signal)) if (!(e.sequence <= r) && (r = e.sequence, t.on_event?.(e), U(e.state))) return H(n, e);
			} catch (e) {
				if (!(e instanceof M) || !W(e)) throw e;
				K(t.signal);
			}
			e < O && await this.#r.sleep(k, t.signal);
		}
		let i = k;
		for (;;) {
			await this.#r.sleep(i, t.signal);
			let e;
			try {
				e = B(await this.#a(`/v1/jobs/${n.job_id}`, {
					method: "GET",
					signal: t.signal
				}));
			} catch (e) {
				if (e instanceof N || e instanceof M && !W(e)) throw e;
				K(t.signal), i = Math.min(A, i * 2);
				continue;
			}
			if (e.job_id !== n.job_id || e.request_id !== n.request_id || e.provider_id !== n.provider_id) throw new N("Gateway poll response changed job identity");
			if (U(e.state)) return e;
			i = Math.min(A, i * 2);
		}
	}
	async cancel(e, t) {
		await this.#o(`/v1/jobs/${e}`, {
			method: "DELETE",
			signal: t
		});
	}
	async fetch_asset(e, t) {
		let n = await this.#o(`/v1/assets/${o.parse(e)}/content`, {
			method: "GET",
			signal: t
		}), r = Y(n.headers.get("content-type") ?? "");
		if (r === "") throw await Z(n), new N("Gateway asset response declares no media type");
		return {
			media_type: r,
			bytes: await z(n, E, t)
		};
	}
	async *#i(e, t, n) {
		let r = await this.#o(`/v1/jobs/${e}/events`, {
			method: "GET",
			headers: t === 0 ? { accept: "text/event-stream" } : {
				accept: "text/event-stream",
				"last-event-id": String(t)
			},
			signal: n
		});
		if (!X(r.headers.get("content-type") ?? "", "text/event-stream")) throw await Z(r), new N("Gateway event stream has an invalid content type");
		if (r.body === null) throw new N("Gateway event stream has no body");
		for await (let t of I(r.body, n)) {
			let n;
			try {
				n = JSON.parse(t.data);
			} catch (e) {
				throw new N("Gateway event contains invalid JSON", { cause: e });
			}
			V(n);
			let r = x.safeParse(n);
			if (!r.success) throw new N("Gateway event has an invalid schema", { cause: r.error });
			if (r.data.job_id !== e || t.id !== String(r.data.sequence)) throw new N("Gateway event identity is invalid");
			yield r.data;
		}
	}
	async #a(e, t) {
		let n = await this.#o(e, {
			...t,
			headers: {
				accept: "application/json",
				...G(t.headers)
			}
		});
		if (!X(n.headers.get("content-type") ?? "", "application/json")) throw await Z(n), new N("Gateway JSON response has an invalid content type");
		let r = await z(n, T, t.signal);
		try {
			return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r));
		} catch (e) {
			throw J(e);
		}
	}
	async #o(e, t) {
		K(t.signal);
		let n;
		try {
			n = await this.#n(`${this.#e}${e}`, {
				...t,
				cache: "no-store",
				credentials: "omit",
				redirect: "error",
				headers: {
					authorization: `Bearer ${this.#t}`,
					...G(t.headers)
				}
			});
		} catch (e) {
			throw t.signal?.aborted ? q(e) : new M("provider_unavailable", "Gateway request failed", { cause: e });
		}
		if (n.status < 200 || n.status >= 300) throw await Z(n), new M("http_error", `Gateway returned HTTP ${String(n.status)}`, { status_code: n.status });
		return n;
	}
};
async function* I(e, t) {
	let n = e.getReader(), r = new TextDecoder("utf-8", { fatal: !0 }), i = new TextEncoder(), a = "", o = !1, s = !0, c = !1;
	try {
		for (;;) {
			K(t);
			let { done: e, value: l } = await n.read(), u;
			try {
				u = e ? r.decode() : r.decode(l, { stream: !0 });
			} catch (e) {
				throw new N("Gateway SSE stream is not valid UTF-8", { cause: e });
			}
			s && u.length > 0 && (u.codePointAt(0) === 65279 && (u = u.slice(1)), s = !1);
			let d = L(u, c);
			a += d.text, c = d.ended_with_cr;
			let f = a.indexOf("\n\n");
			for (; f >= 0;) {
				let e = a.slice(0, f);
				if (i.encode(e).byteLength > D) throw new N("Gateway SSE event exceeds the byte limit");
				a = a.slice(f + 2);
				let t = R(e);
				t !== void 0 && (yield t), f = a.indexOf("\n\n");
			}
			if (i.encode(a).byteLength > D) throw new N("Gateway SSE event exceeds the byte limit");
			if (e) {
				if (a.trim().length > 0) throw new N("Gateway SSE event is incomplete");
				o = !0;
				return;
			}
		}
	} catch (e) {
		throw t.aborted ? q(e) : e instanceof N || e instanceof M ? e : new M("provider_unavailable", "Gateway event stream failed", { cause: e });
	} finally {
		if (!o) try {
			await n.cancel();
		} catch {}
		n.releaseLock();
	}
}
function L(e, t) {
	if (e.length === 0) return {
		text: "",
		ended_with_cr: t
	};
	let n = t && e.startsWith("\n") ? e.slice(1) : e;
	return {
		text: n.replaceAll("\r\n", "\n").replaceAll("\r", "\n"),
		ended_with_cr: n.endsWith("\r")
	};
}
function R(e) {
	let t, n = [];
	for (let r of e.split("\n")) {
		if (r.startsWith(":")) continue;
		let e = r.indexOf(":"), i = e < 0 ? r : r.slice(0, e), a = e < 0 ? "" : r.slice(e + 1);
		a.startsWith(" ") && (a = a.slice(1)), i === "id" ? t = a : i === "data" && n.push(a);
	}
	if (n.length !== 0) {
		if (t === void 0 || !/^\d+$/u.test(t)) throw new N("Gateway SSE event ID is invalid");
		return {
			id: t,
			data: n.join("\n")
		};
	}
}
async function z(e, t, n) {
	let r = Number(e.headers.get("content-length"));
	if (Number.isFinite(r) && r > t) {
		if (e.body !== null) try {
			await e.body.cancel();
		} catch {}
		throw J();
	}
	if (e.body === null) return /* @__PURE__ */ new Uint8Array();
	let i = e.body.getReader(), a = [], o = 0, s = !1;
	try {
		for (;;) {
			K(n);
			let { done: e, value: r } = await i.read();
			if (e) {
				s = !0;
				break;
			}
			if (o += r.byteLength, o > t) throw J();
			a.push(r);
		}
	} catch (e) {
		throw n?.aborted === !0 ? q(e) : e instanceof M ? e : new M("provider_unavailable", "Gateway response body failed while streaming", { cause: e });
	} finally {
		if (!s) try {
			await i.cancel();
		} catch {}
		i.releaseLock();
	}
	let c = new Uint8Array(o), l = 0;
	for (let e of a) c.set(e, l), l += e.byteLength;
	return c;
}
function B(e) {
	V(e);
	let t = b.safeParse(e);
	if (!t.success) throw J(t.error);
	return t.data;
}
function V(e) {
	if (typeof e != "object" || !e || !("protocol_version" in e) || e.protocol_version !== "1.0") throw new N("Gateway protocol must be 1.0");
}
function H(e, t) {
	return b.parse({
		protocol_version: "1.0",
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: e.provider_id,
		state: t.state,
		...t.image_ids === void 0 ? {} : { image_ids: t.image_ids },
		...t.error === void 0 ? {} : { error: t.error }
	});
}
function U(e) {
	return j.has(e);
}
function W(e) {
	return e.code === "provider_unavailable" || e.status_code === 408 || e.status_code === 429 || e.status_code !== void 0 && e.status_code >= 500 && e.status_code <= 599;
}
function G(e) {
	return Object.fromEntries(new Headers(e).entries());
}
function K(e) {
	if (e?.aborted === !0) throw q(e.reason);
}
function q(e) {
	return new M("cancelled", "Gateway request was cancelled", { cause: e });
}
function J(e) {
	return new M("malformed_response", "Gateway response is malformed", { cause: e });
}
function Y(e) {
	return e.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}
function X(e, t) {
	return Y(e) === t;
}
async function Z(e) {
	if (e.body !== null) try {
		await e.body.cancel();
	} catch {}
}
//#endregion
//#region src/transport/gateway_job_executor.ts
var Q = 5e3, te = class {
	#e;
	constructor(e) {
		this.#e = e;
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new _({
			code: "invalid_request",
			retryable: !1
		});
		let r, i;
		try {
			r = new F({
				endpoint: this.#e.endpoint,
				access_token: await this.#t(),
				http_acknowledgments: this.#e.http_acknowledgments,
				...this.#e.fetch === void 0 ? {} : { fetch: this.#e.fetch }
			}), i = await r.submit(n, t.signal);
		} catch (e) {
			throw $(e);
		}
		await t.mark_running();
		try {
			let n = await r.observe(i, { signal: t.signal });
			return { image_ids: await this.#n(r, e, n, t.signal) };
		} catch (e) {
			throw t.signal.aborted && await ne(r, i), e instanceof _ ? e : $(e);
		}
	}
	async #t() {
		try {
			return await this.#e.access_token();
		} catch {
			throw new _({
				code: "auth_failed",
				retryable: !1
			});
		}
	}
	async #n(e, t, n, r) {
		if (n.state === "failed") throw new _(n.error ?? {
			code: "provider_unavailable",
			retryable: !1
		});
		if (n.state === "cancelled") throw new _({
			code: "cancelled",
			retryable: !1
		});
		let i = n.image_ids ?? [];
		if (i.length === 0) throw new _({
			code: "malformed_response",
			retryable: !1
		});
		let a = [];
		for (let t of i) a.push(await e.fetch_asset(t, r));
		return g(this.#e, t, a);
	}
};
async function ne(e, t) {
	try {
		await e.cancel(t.job_id, AbortSignal.timeout(Q));
	} catch {}
}
function $(e) {
	return e instanceof _ ? e : e instanceof N ? new _({
		code: "malformed_response",
		retryable: !1
	}) : e instanceof M ? new _(re(e)) : new _({
		code: "provider_unavailable",
		retryable: !1
	});
}
function re(e) {
	let t = e.status_code === void 0 ? {} : { status_code: e.status_code };
	switch (e.code) {
		case "cancelled": return {
			code: "cancelled",
			retryable: !1
		};
		case "configuration": return {
			code: "invalid_request",
			retryable: !1
		};
		case "malformed_response": return {
			code: "malformed_response",
			retryable: !1
		};
		case "provider_unavailable": return {
			code: "provider_unavailable",
			retryable: !0
		};
		case "http_error": return {
			...ie(e.status_code),
			...t
		};
	}
}
function ie(e) {
	return e === 401 || e === 403 ? {
		code: "auth_failed",
		retryable: !1
	} : e === 408 ? {
		code: "timed_out",
		retryable: !0
	} : e === 429 ? {
		code: "rate_limited",
		retryable: !0
	} : e !== void 0 && e >= 500 ? {
		code: "provider_unavailable",
		retryable: !0
	} : {
		code: "invalid_request",
		retryable: !1
	};
}
//#endregion
export { te as GatewayJobExecutor };
