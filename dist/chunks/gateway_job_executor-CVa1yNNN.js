import { a as e, i as t, r as n, t as r } from "./provider-ChWi4KfU.js";
import { E as i, b as a, g as o, i as s, l as c, m as l, n as u, r as d } from "./ids-CQF5rr2J.js";
import { t as f } from "./generation-Ck4v0g3Y.js";
import { a as p, s as m } from "./media_command_service-CLDKjice.js";
import { a as h, o as ee, r as g } from "./http_acknowledgment-BICa1SvS.js";
var _ = l("1.0"), v = a({
	protocol_version: _,
	request: r
}), y = a({
	protocol_version: _,
	job_id: d,
	request_id: s,
	provider_id: e,
	state: f,
	image_ids: c(u).optional(),
	error: t.optional()
}), b = a({
	protocol_version: _,
	job_id: d,
	sequence: o().int().positive(),
	state: f,
	occurred_at: i({ offset: !1 }),
	image_ids: c(u).optional(),
	error: t.optional()
}), x = a({
	provider_id: e,
	capabilities: c(n)
}), S = a({
	max_concurrency: o().int().positive(),
	max_image_count: o().int().min(1).max(4),
	max_request_bytes: o().int().positive()
}), C = a({
	protocol_version: _,
	providers: c(x),
	limits: S
}), w = 2e6, T = 2e7, E = 64e3, D = 1, O = 250, k = 5e3, A = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled",
	"attached",
	"orphaned"
]), j = class extends Error {
	code;
	status_code;
	constructor(e, t, n = {}) {
		super(t, n), this.name = "GatewayTransportError", this.code = e, this.status_code = n.status_code;
	}
}, M = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "GatewayProtocolError";
	}
}, N = class {
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
function P(e) {
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
		if (this.#e = h(e.endpoint), ee(this.#e) && !g(e.http_acknowledgments ?? {}, this.#e)) throw new j("configuration", "Cleartext Gateway origin has not been acknowledged");
		if (e.access_token.length === 0 || e.access_token.length > 4096 || P(e.access_token)) throw new j("configuration", "Gateway access token is invalid");
		this.#t = e.access_token, this.#n = e.fetch ?? globalThis.fetch.bind(globalThis), this.#r = e.clock ?? new N();
	}
	async get_capabilities(e) {
		let t = await this.#a("/v1/capabilities", {
			method: "GET",
			signal: e
		});
		V(t);
		let n = C.safeParse(t);
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
		if (n.providers.find((t) => t.provider_id === e.provider_id) === void 0 || e.output_count > n.limits.max_image_count) throw new j("configuration", "Gateway does not support the requested provider operation");
		let r = v.parse({
			protocol_version: "1.0",
			request: e
		}), i = new TextEncoder().encode(JSON.stringify(r));
		if (i.byteLength > n.limits.max_request_bytes) throw new j("configuration", "Gateway request exceeds the advertised byte limit");
		let a = B(await this.#a("/v1/jobs", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: i,
			signal: t
		}));
		if (a.request_id !== e.request_id || a.provider_id !== e.provider_id) throw new M("Gateway job does not match the submitted request");
		return a;
	}
	async observe(e, t) {
		K(t.signal);
		let n = B(e);
		if (U(n.state)) return n;
		let r = 0;
		for (let e = 0; e <= D; e += 1) {
			try {
				for await (let e of this.#i(n.job_id, r, t.signal)) if (!(e.sequence <= r) && (r = e.sequence, t.on_event?.(e), U(e.state))) return H(n, e);
			} catch (e) {
				if (!(e instanceof j) || !W(e)) throw e;
				K(t.signal);
			}
			e < D && await this.#r.sleep(O, t.signal);
		}
		let i = O;
		for (;;) {
			await this.#r.sleep(i, t.signal);
			let e;
			try {
				e = B(await this.#a(`/v1/jobs/${n.job_id}`, {
					method: "GET",
					signal: t.signal
				}));
			} catch (e) {
				if (e instanceof M || e instanceof j && !W(e)) throw e;
				K(t.signal), i = Math.min(k, i * 2);
				continue;
			}
			if (e.job_id !== n.job_id || e.request_id !== n.request_id || e.provider_id !== n.provider_id) throw new M("Gateway poll response changed job identity");
			if (U(e.state)) return e;
			i = Math.min(k, i * 2);
		}
	}
	async cancel(e, t) {
		await this.#o(`/v1/jobs/${e}`, {
			method: "DELETE",
			signal: t
		});
	}
	async fetch_asset(e, t) {
		let n = await this.#o(`/v1/assets/${u.parse(e)}/content`, {
			method: "GET",
			signal: t
		}), r = Y(n.headers.get("content-type") ?? "");
		if (r === "") throw await Z(n), new M("Gateway asset response declares no media type");
		return {
			media_type: r,
			bytes: await z(n, T, t)
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
		if (!X(r.headers.get("content-type") ?? "", "text/event-stream")) throw await Z(r), new M("Gateway event stream has an invalid content type");
		if (r.body === null) throw new M("Gateway event stream has no body");
		for await (let t of I(r.body, n)) {
			let n;
			try {
				n = JSON.parse(t.data);
			} catch (e) {
				throw new M("Gateway event contains invalid JSON", { cause: e });
			}
			V(n);
			let r = b.safeParse(n);
			if (!r.success) throw new M("Gateway event has an invalid schema", { cause: r.error });
			if (r.data.job_id !== e || t.id !== String(r.data.sequence)) throw new M("Gateway event identity is invalid");
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
		if (!X(n.headers.get("content-type") ?? "", "application/json")) throw await Z(n), new M("Gateway JSON response has an invalid content type");
		let r = await z(n, w, t.signal);
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
			throw t.signal?.aborted ? q(e) : new j("provider_unavailable", "Gateway request failed", { cause: e });
		}
		if (n.status < 200 || n.status >= 300) throw await Z(n), new j("http_error", `Gateway returned HTTP ${String(n.status)}`, { status_code: n.status });
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
				throw new M("Gateway SSE stream is not valid UTF-8", { cause: e });
			}
			s && u.length > 0 && (u.codePointAt(0) === 65279 && (u = u.slice(1)), s = !1);
			let d = L(u, c);
			a += d.text, c = d.ended_with_cr;
			let f = a.indexOf("\n\n");
			for (; f >= 0;) {
				let e = a.slice(0, f);
				if (i.encode(e).byteLength > E) throw new M("Gateway SSE event exceeds the byte limit");
				a = a.slice(f + 2);
				let t = R(e);
				t !== void 0 && (yield t), f = a.indexOf("\n\n");
			}
			if (i.encode(a).byteLength > E) throw new M("Gateway SSE event exceeds the byte limit");
			if (e) {
				if (a.trim().length > 0) throw new M("Gateway SSE event is incomplete");
				o = !0;
				return;
			}
		}
	} catch (e) {
		throw t.aborted ? q(e) : e instanceof M || e instanceof j ? e : new j("provider_unavailable", "Gateway event stream failed", { cause: e });
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
		if (t === void 0 || !/^\d+$/u.test(t)) throw new M("Gateway SSE event ID is invalid");
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
		throw n?.aborted === !0 ? q(e) : e instanceof j ? e : new j("provider_unavailable", "Gateway response body failed while streaming", { cause: e });
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
	let t = y.safeParse(e);
	if (!t.success) throw J(t.error);
	return t.data;
}
function V(e) {
	if (typeof e != "object" || !e || !("protocol_version" in e) || e.protocol_version !== "1.0") throw new M("Gateway protocol must be 1.0");
}
function H(e, t) {
	return y.parse({
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
	return A.has(e);
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
	return new j("cancelled", "Gateway request was cancelled", { cause: e });
}
function J(e) {
	return new j("malformed_response", "Gateway response is malformed", { cause: e });
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
		if (n === void 0 || n.kind !== "adapter") throw new m({
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
			}), i = await r.submit(n.request, t.signal);
		} catch (e) {
			throw $(e);
		}
		await t.mark_running();
		try {
			let n = await r.observe(i, { signal: t.signal });
			return { image_ids: await this.#n(r, e, n, t.signal) };
		} catch (e) {
			throw t.signal.aborted && await ne(r, i), e instanceof m ? e : $(e);
		}
	}
	async #t() {
		try {
			return await this.#e.access_token();
		} catch {
			throw new m({
				code: "auth_failed",
				retryable: !1
			});
		}
	}
	async #n(e, t, n, r) {
		if (n.state === "failed") throw new m(n.error ?? {
			code: "provider_unavailable",
			retryable: !1
		});
		if (n.state === "cancelled") throw new m({
			code: "cancelled",
			retryable: !1
		});
		let i = n.image_ids ?? [];
		if (i.length === 0) throw new m({
			code: "malformed_response",
			retryable: !1
		});
		let a = [];
		for (let t of i) a.push(await e.fetch_asset(t, r));
		return p(this.#e, t, a);
	}
};
async function ne(e, t) {
	try {
		await e.cancel(t.job_id, AbortSignal.timeout(Q));
	} catch {}
}
function $(e) {
	return e instanceof m ? e : e instanceof M ? new m({
		code: "malformed_response",
		retryable: !1
	}) : e instanceof j ? new m(re(e)) : new m({
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
