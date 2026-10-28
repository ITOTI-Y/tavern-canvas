import { r as e } from "./provider-C7olz4RN.js";
//#region ../../packages/providers/src/provider_error.ts
var t = class extends Error {
	provider_error;
	constructor(t) {
		super(`Provider operation failed: ${t.code}`), this.name = "ProviderAdapterError", this.provider_error = Object.freeze(e.parse(t));
	}
}, n = class extends Error {
	code;
	constructor(e, t, n) {
		super(t, n), this.name = "ProviderTransportBoundaryError", this.code = e;
	}
}, r = class extends Error {
	constructor(e) {
		super("Provider network request failed", e), this.name = "ProviderNetworkError";
	}
};
function i(t, n = {}) {
	let r, i = !1;
	return t === 401 || t === 402 || t === 403 ? r = "auth_failed" : t === 408 ? (r = "timed_out", i = !0) : t === 429 ? (r = "rate_limited", i = !0) : t >= 400 && t < 500 ? r = "invalid_request" : (r = "provider_unavailable", i = t >= 500 && t <= 599 && n.recoverable === !0), e.parse({
		code: r,
		retryable: i,
		status_code: t,
		...n.retry_after_ms === void 0 ? {} : { retry_after_ms: n.retry_after_ms }
	});
}
function a(e, i) {
	return i.aborted || o(e, "AbortError") ? new t({
		code: "cancelled",
		retryable: !1
	}) : e instanceof t ? e : o(e, "TimeoutError") ? new t({
		code: "timed_out",
		retryable: !0
	}) : e instanceof n && e.code === "configuration" ? new t({
		code: "not_configured",
		retryable: !1
	}) : e instanceof r ? new t({
		code: "provider_unavailable",
		retryable: !0
	}) : new t({
		code: "malformed_response",
		retryable: !1
	});
}
function o(e, t) {
	return e instanceof DOMException && e.name === t;
}
//#endregion
//#region ../../packages/providers/src/redaction.ts
var s = /* @__PURE__ */ new Set([
	"prompt",
	"negativeprompt",
	"scenedescription",
	"messages",
	"chatcontent",
	"secret",
	"apikey",
	"authorization",
	"xgoogapikey",
	"xapikey",
	"credential",
	"accesstoken",
	"plaintextvalue",
	"image",
	"images",
	"base64",
	"body",
	"upstreambody",
	"upstreamresponse",
	"upstreamresponsebody",
	"requestbody",
	"responsebody"
]);
function c(e) {
	return l(e, /* @__PURE__ */ new WeakMap());
}
function l(e, t) {
	if (typeof e != "object" || !e) return e;
	if (e instanceof Uint8Array) return { byte_length: e.byteLength };
	if (e instanceof Date) return e.toISOString();
	if (t.get(e) !== void 0) return "[Circular]";
	if (Array.isArray(e)) {
		let n = [];
		t.set(e, n);
		for (let r of e) n.push(l(r, t));
		return n;
	}
	let n = {};
	t.set(e, n);
	for (let [r, i] of Object.entries(e)) u(r) || (n[r] = l(i, t));
	return n;
}
function u(e) {
	let t = e.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
	return s.has(t) || (t.startsWith("upstream") || t.startsWith("request") || t.startsWith("response")) && t.endsWith("body");
}
//#endregion
//#region ../../packages/providers/src/provider_transport.ts
var d = 2e8, f = 1e8, p = 1e6;
function m(e) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > f) throw TypeError("Provider input asset byte limit is invalid");
	let t = Math.ceil(e / 3);
	return t > 4975e4 ? d : Math.min(d, t * 4 + p);
}
function h(e) {
	if (!e.startsWith("/") || e.startsWith("//") || e.includes("\\") || e.includes("#") || e.split(/[/?]/u).includes("..") || /^[a-z][a-z0-9+.-]*:/iu.test(e)) throw TypeError("Provider transport route must be a relative absolute-path reference");
}
//#endregion
export { t as a, a as c, c as i, i as l, h as n, r as o, m as r, n as s, d as t };
