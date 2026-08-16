import { B as e, H as t, V as n, nt as r, z as i } from "./src-B1pCVwkN.js";
import { a, s as o } from "./media_command_service-sG67r8ea.js";
import { a as s, o as c, r as l } from "./http_acknowledgment-DLBLdIzO.js";
//#region src/transport/gateway_transport.ts
var u = 2e6, d = 2e7, f = 64e3, p = 1, m = 250, h = 5e3, g = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled",
	"attached",
	"orphaned"
]), _ = class extends Error {
	code;
	status_code;
	constructor(e, t, n = {}) {
		super(t, n), this.name = "GatewayTransportError", this.code = e, this.status_code = n.status_code;
	}
}, v = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "GatewayProtocolError";
	}
}, y = class {
	sleep(e, t) {
		return new Promise((n, r) => {
			if (t.aborted) {
				r(N());
				return;
			}
			let i = () => {
				clearTimeout(a), t.removeEventListener("abort", i), r(N());
			}, a = setTimeout(() => {
				t.removeEventListener("abort", i), n();
			}, e);
			t.addEventListener("abort", i, { once: !0 });
		});
	}
};
function b(e) {
	for (let t of e) {
		let e = t.codePointAt(0);
		if (e !== void 0 && (e <= 31 || e === 127)) return !0;
	}
	return !1;
}
var x = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		if (this.#e = s(e.endpoint), c(this.#e) && !l(e.http_acknowledgments ?? {}, this.#e)) throw new _("configuration", "Cleartext Gateway origin has not been acknowledged");
		if (e.access_token.length === 0 || e.access_token.length > 4096 || b(e.access_token)) throw new _("configuration", "Gateway access token is invalid");
		this.#t = e.access_token, this.#n = e.fetch ?? globalThis.fetch.bind(globalThis), this.#r = e.clock ?? new y();
	}
	async get_capabilities(e) {
		let t = await this.#a("/v1/capabilities", {
			method: "GET",
			signal: e
		});
		D(t);
		let n = i.safeParse(t);
		if (!n.success) throw P(n.error);
		return n.data;
	}
	async run(e, t) {
		let n = await this.submit(e, t.signal);
		return this.observe(n, t);
	}
	async submit(t, n) {
		M(n);
		let r = await this.get_capabilities(n);
		if (r.providers.find((e) => e.provider_id === t.provider_id) === void 0 || t.output_count > r.limits.max_image_count) throw new _("configuration", "Gateway does not support the requested provider operation");
		let i = e.parse({
			protocol_version: "1.0",
			request: t
		}), a = new TextEncoder().encode(JSON.stringify(i));
		if (a.byteLength > r.limits.max_request_bytes) throw new _("configuration", "Gateway request exceeds the advertised byte limit");
		let o = E(await this.#a("/v1/jobs", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: a,
			signal: n
		}));
		if (o.request_id !== t.request_id || o.provider_id !== t.provider_id) throw new v("Gateway job does not match the submitted request");
		return o;
	}
	async observe(e, t) {
		M(t.signal);
		let n = E(e);
		if (k(n.state)) return n;
		let r = 0;
		for (let e = 0; e <= p; e += 1) {
			try {
				for await (let e of this.#i(n.job_id, r, t.signal)) if (!(e.sequence <= r) && (r = e.sequence, t.on_event?.(e), k(e.state))) return O(n, e);
			} catch (e) {
				if (!(e instanceof _) || !A(e)) throw e;
				M(t.signal);
			}
			e < p && await this.#r.sleep(m, t.signal);
		}
		let i = m;
		for (;;) {
			await this.#r.sleep(i, t.signal);
			let e;
			try {
				e = E(await this.#a(`/v1/jobs/${n.job_id}`, {
					method: "GET",
					signal: t.signal
				}));
			} catch (e) {
				if (e instanceof v || e instanceof _ && !A(e)) throw e;
				M(t.signal), i = Math.min(h, i * 2);
				continue;
			}
			if (e.job_id !== n.job_id || e.request_id !== n.request_id || e.provider_id !== n.provider_id) throw new v("Gateway poll response changed job identity");
			if (k(e.state)) return e;
			i = Math.min(h, i * 2);
		}
	}
	async cancel(e, t) {
		await this.#o(`/v1/jobs/${e}`, {
			method: "DELETE",
			signal: t
		});
	}
	async fetch_asset(e, t) {
		let n = await this.#o(`/v1/assets/${r.parse(e)}/content`, {
			method: "GET",
			signal: t
		}), i = F(n.headers.get("content-type") ?? "");
		if (i === "") throw await L(n), new v("Gateway asset response declares no media type");
		return {
			media_type: i,
			bytes: await T(n, d, t)
		};
	}
	async *#i(e, t, r) {
		let i = await this.#o(`/v1/jobs/${e}/events`, {
			method: "GET",
			headers: t === 0 ? { accept: "text/event-stream" } : {
				accept: "text/event-stream",
				"last-event-id": String(t)
			},
			signal: r
		});
		if (!I(i.headers.get("content-type") ?? "", "text/event-stream")) throw await L(i), new v("Gateway event stream has an invalid content type");
		if (i.body === null) throw new v("Gateway event stream has no body");
		for await (let t of S(i.body, r)) {
			let r;
			try {
				r = JSON.parse(t.data);
			} catch (e) {
				throw new v("Gateway event contains invalid JSON", { cause: e });
			}
			D(r);
			let i = n.safeParse(r);
			if (!i.success) throw new v("Gateway event has an invalid schema", { cause: i.error });
			if (i.data.job_id !== e || t.id !== String(i.data.sequence)) throw new v("Gateway event identity is invalid");
			yield i.data;
		}
	}
	async #a(e, t) {
		let n = await this.#o(e, {
			...t,
			headers: {
				accept: "application/json",
				...j(t.headers)
			}
		});
		if (!I(n.headers.get("content-type") ?? "", "application/json")) throw await L(n), new v("Gateway JSON response has an invalid content type");
		let r = await T(n, u, t.signal);
		try {
			return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r));
		} catch (e) {
			throw P(e);
		}
	}
	async #o(e, t) {
		M(t.signal);
		let n;
		try {
			n = await this.#n(`${this.#e}${e}`, {
				...t,
				cache: "no-store",
				credentials: "omit",
				redirect: "error",
				headers: {
					authorization: `Bearer ${this.#t}`,
					...j(t.headers)
				}
			});
		} catch (e) {
			throw t.signal?.aborted ? N(e) : new _("provider_unavailable", "Gateway request failed", { cause: e });
		}
		if (n.status < 200 || n.status >= 300) throw await L(n), new _("http_error", `Gateway returned HTTP ${String(n.status)}`, { status_code: n.status });
		return n;
	}
};
async function* S(e, t) {
	let n = e.getReader(), r = new TextDecoder("utf-8", { fatal: !0 }), i = new TextEncoder(), a = "", o = !1, s = !0, c = !1;
	try {
		for (;;) {
			M(t);
			let { done: e, value: l } = await n.read(), u;
			try {
				u = e ? r.decode() : r.decode(l, { stream: !0 });
			} catch (e) {
				throw new v("Gateway SSE stream is not valid UTF-8", { cause: e });
			}
			s && u.length > 0 && (u.codePointAt(0) === 65279 && (u = u.slice(1)), s = !1);
			let d = C(u, c);
			a += d.text, c = d.ended_with_cr;
			let p = a.indexOf("\n\n");
			for (; p >= 0;) {
				let e = a.slice(0, p);
				if (i.encode(e).byteLength > f) throw new v("Gateway SSE event exceeds the byte limit");
				a = a.slice(p + 2);
				let t = w(e);
				t !== void 0 && (yield t), p = a.indexOf("\n\n");
			}
			if (i.encode(a).byteLength > f) throw new v("Gateway SSE event exceeds the byte limit");
			if (e) {
				if (a.trim().length > 0) throw new v("Gateway SSE event is incomplete");
				o = !0;
				return;
			}
		}
	} catch (e) {
		throw t.aborted ? N(e) : e instanceof v || e instanceof _ ? e : new _("provider_unavailable", "Gateway event stream failed", { cause: e });
	} finally {
		if (!o) try {
			await n.cancel();
		} catch {}
		n.releaseLock();
	}
}
function C(e, t) {
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
function w(e) {
	let t, n = [];
	for (let r of e.split("\n")) {
		if (r.startsWith(":")) continue;
		let e = r.indexOf(":"), i = e < 0 ? r : r.slice(0, e), a = e < 0 ? "" : r.slice(e + 1);
		a.startsWith(" ") && (a = a.slice(1)), i === "id" ? t = a : i === "data" && n.push(a);
	}
	if (n.length !== 0) {
		if (t === void 0 || !/^\d+$/u.test(t)) throw new v("Gateway SSE event ID is invalid");
		return {
			id: t,
			data: n.join("\n")
		};
	}
}
async function T(e, t, n) {
	let r = Number(e.headers.get("content-length"));
	if (Number.isFinite(r) && r > t) {
		if (e.body !== null) try {
			await e.body.cancel();
		} catch {}
		throw P();
	}
	if (e.body === null) return /* @__PURE__ */ new Uint8Array();
	let i = e.body.getReader(), a = [], o = 0, s = !1;
	try {
		for (;;) {
			M(n);
			let { done: e, value: r } = await i.read();
			if (e) {
				s = !0;
				break;
			}
			if (o += r.byteLength, o > t) throw P();
			a.push(r);
		}
	} catch (e) {
		throw n?.aborted === !0 ? N(e) : e instanceof _ ? e : new _("provider_unavailable", "Gateway response body failed while streaming", { cause: e });
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
function E(e) {
	D(e);
	let n = t.safeParse(e);
	if (!n.success) throw P(n.error);
	return n.data;
}
function D(e) {
	if (typeof e != "object" || !e || !("protocol_version" in e) || e.protocol_version !== "1.0") throw new v("Gateway protocol must be 1.0");
}
function O(e, n) {
	return t.parse({
		protocol_version: "1.0",
		job_id: e.job_id,
		request_id: e.request_id,
		provider_id: e.provider_id,
		state: n.state,
		...n.image_ids === void 0 ? {} : { image_ids: n.image_ids },
		...n.error === void 0 ? {} : { error: n.error }
	});
}
function k(e) {
	return g.has(e);
}
function A(e) {
	return e.code === "provider_unavailable" || e.status_code === 408 || e.status_code === 429 || e.status_code !== void 0 && e.status_code >= 500 && e.status_code <= 599;
}
function j(e) {
	return Object.fromEntries(new Headers(e).entries());
}
function M(e) {
	if (e?.aborted === !0) throw N(e.reason);
}
function N(e) {
	return new _("cancelled", "Gateway request was cancelled", { cause: e });
}
function P(e) {
	return new _("malformed_response", "Gateway response is malformed", { cause: e });
}
function F(e) {
	return e.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}
function I(e, t) {
	return F(e) === t;
}
async function L(e) {
	if (e.body !== null) try {
		await e.body.cancel();
	} catch {}
}
//#endregion
//#region src/transport/gateway_job_executor.ts
var R = 5e3, z = class {
	#e;
	constructor(e) {
		this.#e = e;
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0 || n.kind !== "adapter") throw new o({
			code: "invalid_request",
			retryable: !1
		});
		let r, i;
		try {
			r = new x({
				endpoint: this.#e.endpoint,
				access_token: await this.#t(),
				http_acknowledgments: this.#e.http_acknowledgments,
				...this.#e.fetch === void 0 ? {} : { fetch: this.#e.fetch }
			}), i = await r.submit(n.request, t.signal);
		} catch (e) {
			throw V(e);
		}
		await t.mark_running();
		try {
			let n = await r.observe(i, { signal: t.signal });
			return { image_ids: await this.#n(r, e, n, t.signal) };
		} catch (e) {
			throw t.signal.aborted && await B(r, i), e instanceof o ? e : V(e);
		}
	}
	async #t() {
		try {
			return await this.#e.access_token();
		} catch {
			throw new o({
				code: "auth_failed",
				retryable: !1
			});
		}
	}
	async #n(e, t, n, r) {
		if (n.state === "failed") throw new o(n.error ?? {
			code: "provider_unavailable",
			retryable: !1
		});
		if (n.state === "cancelled") throw new o({
			code: "cancelled",
			retryable: !1
		});
		let i = n.image_ids ?? [];
		if (i.length === 0) throw new o({
			code: "malformed_response",
			retryable: !1
		});
		let s = [];
		for (let t of i) s.push(await e.fetch_asset(t, r));
		return a(this.#e, t, s);
	}
};
async function B(e, t) {
	try {
		await e.cancel(t.job_id, AbortSignal.timeout(R));
	} catch {}
}
function V(e) {
	return e instanceof o ? e : e instanceof v ? new o({
		code: "malformed_response",
		retryable: !1
	}) : e instanceof _ ? new o(H(e)) : new o({
		code: "provider_unavailable",
		retryable: !1
	});
}
function H(e) {
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
			...U(e.status_code),
			...t
		};
	}
}
function U(e) {
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
export { z as GatewayJobExecutor };
