import { n as e, t } from "./sha2-BGNex9vj.js";
import { B as n, I as r, J as i, L as a, N as o, R as s, W as c, X as l, at as u, ct as d, it as f, lt as p, ot as m, rt as h, st as g, tt as _, ut as v, z as y } from "./src-BPUc1ma2.js";
import { a as b, c as x, i as S, o as C, r as w, s as T } from "./provider_transport-VhDfpyWP.js";
//#region ../../packages/providers/src/image_bytes.ts
function E(e, t) {
	let n = e.indexOf(","), r = e.startsWith("data:") ? n < 0 ? "" : e.slice(n + 1) : e;
	if (r.length === 0 || r.length % 4 == 1 || !/^[A-Za-z0-9+/]*={0,2}$/u.test(r)) throw j();
	let i;
	try {
		i = atob(r);
	} catch {
		throw j();
	}
	if (i.length === 0 || i.length > t) throw j();
	return Uint8Array.from(i, (e) => e.charCodeAt(0));
}
function D(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function O(e) {
	if (e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10) return "image/png";
	if (e.length >= 4 && e[0] === 255 && e[1] === 216 && e[2] === 255) return "image/jpeg";
	if (e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80) return "image/webp";
}
function ee(n, r, i, a) {
	let o = O(n);
	if (o === void 0 || !a.includes(o)) throw j();
	let s = t(n), l = e(s), u = s.slice(0, 16);
	u[6] = (u[6] ?? 0) & 15 | 80, u[8] = (u[8] ?? 0) & 63 | 128;
	let d = e(u);
	return {
		asset_id: c.parse(`${d.slice(0, 8)}-${d.slice(8, 12)}-${d.slice(12, 16)}-${d.slice(16, 20)}-${d.slice(20)}`),
		media_type: o,
		byte_length: n.byteLength,
		sha256: l,
		...r === void 0 ? {} : { width: r },
		...i === void 0 ? {} : { height: i }
	};
}
function k(e, t, n, r) {
	return {
		asset: ee(e, t, n, r),
		bytes: e
	};
}
function A(e, t) {
	return t === void 0 ? e : {
		...e,
		seed: t
	};
}
function j() {
	return new b({
		code: "malformed_response",
		retryable: !1
	});
}
function M() {
	return new b({
		code: "invalid_request",
		retryable: !1
	});
}
//#endregion
//#region ../../packages/providers/src/multipart.ts
function te(e, t) {
	for (let t of Object.keys(e)) N(t);
	for (let e of t) if (N(e.field_name), N(e.file_name), !/^[a-z]+\/[a-z0-9.+-]+$/u.test(e.content_type)) throw M();
	let n = ne(e, t), r = new TextEncoder(), i = [];
	for (let [t, a] of Object.entries(e)) i.push(r.encode(`--${n}\r\nContent-Disposition: form-data; name="${t}"\r\n\r\n${a}\r\n`));
	for (let e of t) i.push(r.encode(`--${n}\r\nContent-Disposition: form-data; name="${e.field_name}"; filename="${e.file_name}"\r\nContent-Type: ${e.content_type}\r\n\r\n`), e.bytes, r.encode("\r\n"));
	i.push(r.encode(`--${n}--\r\n`));
	let a = i.reduce((e, t) => e + t.byteLength, 0), o = new Uint8Array(a), s = 0;
	for (let e of i) o.set(e, s), s += e.byteLength;
	return {
		content_type: `multipart/form-data; boundary=${n}`,
		body: o
	};
}
function ne(e, t) {
	for (let n = 0; n < 8; n += 1) {
		let n = `tavern-canvas-${globalThis.crypto.randomUUID()}`, r = new TextEncoder().encode(n);
		if (!(Object.entries(e).some(([e, t]) => e.includes(n) || t.includes(n)) || t.some((e) => e.field_name.includes(n) || e.file_name.includes(n) || e.content_type.includes(n) || re(e.bytes, r)))) return n;
	}
	throw M();
}
function re(e, t) {
	if (t.byteLength === 0 || e.byteLength < t.byteLength) return !1;
	let n = e.byteLength - t.byteLength;
	for (let r = 0; r <= n; r += 1) {
		let n = !0;
		for (let i = 0; i < t.byteLength; i += 1) if (e[r + i] !== t[i]) {
			n = !1;
			break;
		}
		if (n) return !0;
	}
	return !1;
}
function N(e) {
	if (e.length === 0 || e.length > 128 || /["\r\n]/u.test(e)) throw M();
}
//#endregion
//#region ../../packages/providers/src/retry_policy.ts
var ie = 2, ae = 250, oe = 1e4, se = 12e4, P = class {
	now() {
		return Date.now();
	}
	sleep(e, t) {
		let { promise: n, resolve: r, reject: i } = Promise.withResolvers();
		if (t.aborted) return i(new DOMException("The retry was aborted", "AbortError")), n;
		let a = () => {
			clearTimeout(o), t.removeEventListener("abort", a), i(new DOMException("The retry was aborted", "AbortError"));
		}, o = setTimeout(() => {
			t.removeEventListener("abort", a), r(void 0);
		}, e);
		return t.addEventListener("abort", a, { once: !0 }), n;
	}
};
function F(e, t) {
	if (e === null) return;
	let n = e.trim();
	if (/^\d+$/u.test(n)) {
		let e = Number(n);
		return Number.isSafeInteger(e) && e <= (2 ** 53 - 1) / 1e3 ? e * 1e3 : void 0;
	}
	let r = Date.parse(n);
	if (Number.isFinite(r)) return Math.max(0, r - t);
}
function I(e, t, n) {
	return L(e, async (e, n) => {
		try {
			return await t(e, n);
		} catch (e) {
			throw e instanceof C ? new b({
				code: "provider_unavailable",
				retryable: !1
			}) : e instanceof DOMException && e.name === "TimeoutError" ? new b({
				code: "timed_out",
				retryable: !1
			}) : e;
		}
	}, n);
}
async function L(e, t, n) {
	let r = le(n.max_retries, ie), i = R(n.base_delay_ms, ae), a = R(n.max_delay_ms, oe), o = R(n.max_retry_after_ms, se);
	for (let s = 0;; s += 1) {
		if (n.signal.aborted) throw new b({
			code: "cancelled",
			retryable: !1
		});
		try {
			return await t(structuredClone(e), s);
		} catch (e) {
			let t = T(e, n.signal);
			if (!t.provider_error.retryable || s >= r) throw t;
			let c = t.provider_error.retry_after_ms, l = c === void 0 ? ce(s, i, a, n.random) : Math.min(c, o);
			try {
				await n.clock.sleep(l, n.signal);
			} catch {
				throw new b({
					code: "cancelled",
					retryable: !1
				});
			}
		}
	}
}
function ce(e, t, n, r) {
	let i = r.next(), a = .5 + (Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : .5);
	return Math.min(n, Math.round(t * 2 ** e * a));
}
function le(e, t) {
	return e === void 0 || !Number.isInteger(e) || e < 0 ? t : e;
}
function R(e, t) {
	return e === void 0 || !Number.isFinite(e) || e <= 0 ? t : e;
}
//#endregion
//#region ../../packages/providers/src/comfyui/workflow_renderer.ts
var ue = 500, de = 16, fe = 1e5, pe = 1e6, me = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), z = m({
	node_id: g().trim().min(1).max(128),
	property: g().trim().min(1).max(128)
}), he = z.extend({ value_type: i([
	"string",
	"number",
	"boolean"
]) }), ge = m({
	workflow_id: c,
	workflow: p(),
	bindings: m({
		prompt: z,
		negative_prompt: z.optional(),
		seed: z.optional(),
		output_count: z,
		placeholders: u(g().trim().min(1).max(128), he).default({}),
		input_assets: u(g().trim().min(1).max(128), z).default({})
	})
});
function _e(e) {
	try {
		let t = ge.parse(e);
		if (!V(t.workflow)) throw M();
		let n = Object.entries(t.workflow);
		if (n.length === 0 || n.length > ue) throw M();
		ye(t.workflow);
		let r = JSON.stringify(t.workflow);
		if (new TextEncoder().encode(r).byteLength > pe) throw M();
		let i = {};
		for (let [e, t] of n) {
			if (!H(e) || !V(t)) throw M();
			let n = t.class_type, r = t.inputs;
			if (typeof n != "string" || n.length === 0 || n.length > 256 || !V(r)) throw M();
			i[e] = t;
		}
		return {
			workflow_id: t.workflow_id,
			workflow: i,
			bindings: t.bindings
		};
	} catch (e) {
		throw e instanceof b ? e : M();
	}
}
function ve(e, t) {
	let n = structuredClone(e.workflow);
	if (B(n, e.bindings.prompt, t.prompt, "string"), B(n, e.bindings.output_count, t.output_count, "number"), t.negative_prompt !== void 0) {
		if (e.bindings.negative_prompt === void 0) throw M();
		B(n, e.bindings.negative_prompt, t.negative_prompt, "string");
	}
	if (t.seed !== void 0) {
		if (e.bindings.seed === void 0) throw M();
		B(n, e.bindings.seed, t.seed, "number");
	}
	for (let [r, i] of Object.entries(t.placeholder_values)) {
		let t = e.bindings.placeholders[r];
		if (t === void 0 || typeof i !== t.value_type) throw M();
		B(n, t, i, t.value_type);
	}
	for (let [r, i] of Object.entries(t.input_asset_names)) {
		let t = e.bindings.input_assets[r];
		if (t === void 0) throw M();
		B(n, t, i, "string");
	}
	return n;
}
function B(e, t, n, r) {
	if (!H(t.node_id) || !H(t.property) || typeof n !== r) throw M();
	let i = e[t.node_id];
	if (i === void 0 || !V(i.inputs) || !Object.hasOwn(i.inputs, t.property)) throw M();
	i.inputs[t.property] = n;
}
function ye(e) {
	let t = [{
		value: e,
		depth: 0
	}], n = 0;
	for (; t.length > 0;) {
		let e = t.pop();
		if (e === void 0) break;
		if (n += 1, n > fe || e.depth > de) throw M();
		if (e.value === null) continue;
		let r = typeof e.value;
		if (r !== "string" && r !== "boolean") {
			if (r === "number") {
				if (!Number.isFinite(e.value)) throw M();
				continue;
			}
			if (Array.isArray(e.value)) {
				for (let n of e.value) t.push({
					value: n,
					depth: e.depth + 1
				});
				continue;
			}
			if (!V(e.value)) throw M();
			for (let [n, r] of Object.entries(e.value)) {
				if (!H(n)) throw M();
				t.push({
					value: r,
					depth: e.depth + 1
				});
			}
		}
	}
}
function V(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function H(e) {
	return e.length > 0 && e.length <= 256 && !me.has(e);
}
//#endregion
//#region ../../packages/providers/src/comfyui/comfyui_adapter.ts
var be = m({
	profile_id: g().trim().min(1).max(128),
	provider_id: _("comfyui"),
	model_allowlist: l(g().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: l(i([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	workflow_allowlist: l(c).min(1).max(256),
	max_response_bytes: h().int().positive().max(1e8),
	max_input_asset_bytes: h().int().positive().max(1e8)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"output_mime_type_allowlist",
		"workflow_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), xe = f({
	prompt_id: g().trim().min(1).max(128),
	number: h(),
	node_errors: u(g(), p())
}), Se = f({
	name: g().trim().min(1).max(512),
	subfolder: g().max(512),
	type: i([
		"input",
		"output",
		"temp"
	])
}), Ce = m({ request: m({
	request_id: n.shape.request_id,
	output_count: n.shape.output_count,
	output_node_ids: n.shape.output_node_ids,
	seed: n.shape.seed
}) }), we = { next: Math.random }, Te = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), U = 3e6, Ee = class {
	provider_id = "comfyui";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"reference_image",
		"cancel",
		"seed",
		"workflow"
	]);
	#e;
	#t;
	#n;
	constructor(e) {
		this.#e = e.workflow_store, this.#t = e.clock ?? new P(), this.#n = e.random ?? we;
	}
	validate_profile(e) {
		return be.parse(e);
	}
	async submit(e, t) {
		let n = Me(t), r = G(e.profile);
		if (!r.workflow_allowlist.includes(n.workflow_id)) throw M();
		let i;
		try {
			i = _e(await this.#e.load(n.workflow_id));
		} catch {
			throw M();
		}
		if (i.workflow_id !== n.workflow_id) throw M();
		Oe(i, n, Object.fromEntries(Object.keys(n.input_asset_bindings).map((e) => [e, "validated-input.png"])));
		let a = await De(e, n, r, this.#t, this.#n), o = Oe(i, n, a), s = new TextEncoder().encode(JSON.stringify({ prompt: o }));
		if (s.byteLength > U) throw M();
		let c = await W(e, n, {
			route: "/prompt",
			method: "POST",
			body: s,
			max_request_bytes: U,
			content_type: "application/json",
			accept: "application/json",
			max_response_bytes: r.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (c.body.byteLength > r.max_response_bytes) throw j();
		let l;
		try {
			l = xe.parse(K(c.body));
		} catch {
			throw j();
		}
		if (Object.keys(l.node_errors).length > 0) throw M();
		return {
			state: "pending",
			submission_id: l.prompt_id,
			continuation: { request: {
				request_id: n.request_id,
				output_count: n.output_count,
				output_node_ids: n.output_node_ids,
				seed: n.seed
			} }
		};
	}
	async poll(e, t) {
		if (t.state !== "pending") throw M();
		let n = Ce.safeParse(t.continuation);
		if (!n.success) throw M();
		let r = n.data.request, i = G(e.profile), a = await W(e, r, {
			route: `/history/${encodeURIComponent(t.submission_id)}`,
			method: "GET",
			accept: "application/json",
			max_response_bytes: i.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (a.body.byteLength > i.max_response_bytes) throw j();
		let s = K(a.body);
		if (!q(s)) throw j();
		let c = s[t.submission_id];
		if (c === void 0) return {
			state: "pending",
			poll_after_ms: 250
		};
		if (!q(c)) throw j();
		let l = c.status;
		if (!q(l)) throw j();
		if (l.status_str === "error") return {
			state: "failed",
			error: {
				code: "provider_unavailable",
				retryable: !1
			}
		};
		if (l.completed !== !0) return {
			state: "pending",
			poll_after_ms: 250
		};
		let u = c.outputs;
		if (!q(u)) throw j();
		let d = ke(u, r.output_node_ids, r.output_count);
		if (d.length !== r.output_count) throw j();
		let f = [], p = 0;
		for (let t of d) {
			let n = await W(e, r, {
				route: `/view?${new URLSearchParams({
					filename: t.filename,
					subfolder: t.subfolder,
					type: t.type
				}).toString()}`,
				method: "GET",
				max_response_bytes: i.max_response_bytes - p,
				signal: e.signal
			}, this.#t, this.#n, !0);
			if (p += n.body.byteLength, p > i.max_response_bytes) throw j();
			f.push(k(n.body, void 0, void 0, i.output_mime_type_allowlist));
		}
		return {
			state: "completed",
			result: o.parse(A({
				request_id: r.request_id,
				provider_id: "comfyui",
				assets: f.map(({ asset: e }) => e)
			}, r.seed)),
			output_assets: f
		};
	}
	async cancel(e, t) {
		if (t === void 0) throw M();
		if (t.state !== "pending") return;
		let n = G(e.profile), r = { request_id: t.submission_id }, i = await W(e, r, {
			route: "/queue",
			method: "GET",
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (i.body.byteLength > n.max_response_bytes) throw j();
		let a = K(i.body);
		if (!q(a)) throw j();
		let o = Ne(a.queue_running, t.submission_id), s = Ne(a.queue_pending, t.submission_id);
		o ? await W(e, r, {
			route: "/interrupt",
			method: "POST",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1) : s && await W(e, r, {
			route: "/queue",
			method: "POST",
			body: new TextEncoder().encode(JSON.stringify({ delete: [t.submission_id] })),
			max_request_bytes: w(n.max_input_asset_bytes),
			content_type: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1);
	}
};
async function De(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of Object.entries(t.input_asset_bindings)) {
		let t = await e.assets.read(i, e.signal), s = t.bytes.byteLength;
		if (t.asset_id !== i || s > n.max_input_asset_bytes || s > n.max_input_asset_bytes - o) throw M();
		o += s, a.push({
			binding_name: r,
			asset: t
		});
	}
	let s = w(n.max_input_asset_bytes), c = {};
	for (let { binding_name: o, asset: l } of a) {
		let a = te({
			type: "input",
			overwrite: "true"
		}, [{
			field_name: "image",
			file_name: `${l.asset_id}.${Pe(l.media_type)}`,
			content_type: l.media_type,
			bytes: l.bytes
		}]), u = await W(e, t, {
			route: "/upload/image",
			method: "POST",
			body: a.body,
			max_request_bytes: s,
			content_type: a.content_type,
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, r, i, !1);
		if (u.body.byteLength > n.max_response_bytes) throw j();
		let d;
		try {
			d = Se.parse(K(u.body));
		} catch {
			throw j();
		}
		c[o] = d.subfolder.length === 0 ? d.name : `${d.subfolder}/${d.name}`;
	}
	return c;
}
function Oe(e, t, n) {
	return ve(e, {
		prompt: t.prompt,
		...t.negative_prompt === void 0 ? {} : { negative_prompt: t.negative_prompt },
		...t.seed === void 0 ? {} : { seed: t.seed },
		output_count: t.output_count,
		placeholder_values: t.placeholder_values,
		input_asset_names: n
	});
}
function ke(e, t, n) {
	let r = [];
	for (let i of t) {
		let t = e[i];
		if (!q(t) || !Array.isArray(t.images) || t.images.length > n - r.length) throw j();
		for (let e of t.images) {
			if (!q(e) || typeof e.filename != "string" || typeof e.subfolder != "string" || typeof e.type != "string" || e.filename.length === 0 || e.filename.length > 512 || e.subfolder.length > 512 || ![
				"input",
				"output",
				"temp"
			].includes(e.type)) throw j();
			r.push({
				filename: e.filename,
				subfolder: e.subfolder,
				type: e.type
			});
		}
	}
	return r;
}
async function W(e, t, n, r, i, a) {
	let o = async (t, i) => {
		let a = r.now(), o = await e.transport.execute(n);
		return je(e, t.request_id, i, o, a, r), Ae(o, r), o;
	};
	if (a) return (n.method === "GET" ? L : I)(t, o, {
		signal: e.signal,
		clock: r,
		random: i
	});
	try {
		return await o(t, 0);
	} catch (t) {
		throw T(t, e.signal);
	}
}
function Ae(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (e.status === 451) throw new b({
		code: "content_blocked",
		retryable: !1,
		status_code: 451
	});
	let n = F(e.headers["retry-after"] ?? null, t.now());
	throw new b(x(e.status, {
		recoverable: Te.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function je(e, t, n, r, i, a) {
	e.log.write(S({
		provider_id: "comfyui",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Me(e) {
	let t = n.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function G(e) {
	let t = be.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function K(e) {
	try {
		return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
	} catch {
		throw j();
	}
}
function q(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ne(e, t) {
	return Array.isArray(e) && e.some((e) => Array.isArray(e) && e[1] === t);
}
function Pe(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/google_image/google_image_adapter.ts
var J = m({
	profile_id: g().trim().min(1).max(128),
	provider_id: _("google_image"),
	model_allowlist: l(y.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: l(i([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: h().int().positive().max(1e8),
	max_input_asset_bytes: h().int().positive().max(1e8)
}).check((e) => {
	for (let t of ["model_allowlist", "output_mime_type_allowlist"]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), Fe = f({
	id: g().min(1),
	model: g().min(1),
	status: i([
		"completed",
		"failed",
		"in_progress"
	]),
	error: f({
		code: g().optional(),
		message: g().optional()
	}).optional(),
	steps: l(f({
		type: g(),
		content: l(f({
			type: g(),
			mime_type: g().optional(),
			data: g().optional()
		})).optional()
	}))
}), Ie = { next: Math.random }, Le = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Re = class {
	provider_id = "google_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new P(), this.#t = e.random ?? Ie;
	}
	validate_profile(e) {
		return J.parse(e);
	}
	async submit(e, t) {
		let n = Ve(t), r = He(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(n.output_mime_type)) throw M();
		let i = [{
			type: "text",
			text: n.negative_prompt === void 0 ? n.prompt : `${n.prompt}\n\nAvoid: ${n.negative_prompt}`
		}], a = 0;
		for (let t of n.reference_asset_ids) {
			let n = await e.assets.read(t, e.signal);
			if (n.asset_id !== t) throw M();
			let o = n.bytes.byteLength;
			if (o > r.max_input_asset_bytes || o > r.max_input_asset_bytes - a) throw M();
			a += o, i.push({
				type: "image",
				mime_type: n.media_type,
				data: D(n.bytes)
			});
		}
		let s = w(r.max_input_asset_bytes), c = new TextEncoder().encode(JSON.stringify({
			model: n.model_id,
			input: i,
			response_format: {
				type: "image",
				mime_type: n.output_mime_type,
				aspect_ratio: n.aspect_ratio,
				image_size: n.image_size
			}
		})), l = [], u = 0;
		for (let t = 0; t < n.output_count; t += 1) {
			let t = await I(n, async (t, n) => {
				let i = this.#e.now(), a = await e.transport.execute({
					route: "/v1beta/interactions",
					method: "POST",
					body: c,
					max_request_bytes: s,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes - u,
					signal: e.signal
				});
				return Be(e, t.request_id, n, a, i, this.#e), ze(a, this.#e), a;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			});
			if (t.body.byteLength > r.max_response_bytes - u) throw j();
			let i;
			try {
				i = Fe.parse(Ue(t.body));
			} catch {
				throw j();
			}
			if (i.status === "failed") throw i.error?.code === "SAFETY" ? new b({
				code: "content_blocked",
				retryable: !1
			}) : new b({
				code: "provider_unavailable",
				retryable: !1
			});
			if (i.status !== "completed") throw j();
			let a = i.steps.flatMap((e) => e.type === "model_output" ? (e.content ?? []).filter((e) => e.type === "image" && typeof e.mime_type == "string" && typeof e.data == "string") : []);
			if (a.length !== 1) throw j();
			let o = a[0];
			if (o === void 0 || o.mime_type !== n.output_mime_type || o.data === void 0) throw j();
			let d = E(o.data, r.max_response_bytes - u);
			u += d.byteLength;
			let f = k(d, void 0, void 0, r.output_mime_type_allowlist);
			if (f.asset.media_type !== n.output_mime_type) throw j();
			l.push(f);
		}
		return {
			state: "completed",
			result: o.parse({
				request_id: n.request_id,
				provider_id: "google_image",
				assets: l.map(({ asset: e }) => e)
			}),
			output_assets: l
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw M();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function ze(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	let n = F(e.headers["retry-after"] ?? null, t.now());
	throw new b(x(e.status, {
		recoverable: Le.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function Be(e, t, n, r, i, a) {
	e.log.write(S({
		provider_id: "google_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Ve(e) {
	let t = y.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function He(e) {
	let t = J.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function Ue(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_mapping.ts
function We(e, t) {
	let n = e.vibe_references ?? [], r = e.character_references ?? [];
	return {
		input: e.prompt,
		model: e.model_id,
		action: "generate",
		parameters: {
			params_version: 3,
			prompt: e.prompt,
			...e.negative_prompt === void 0 ? {} : { negative_prompt: e.negative_prompt },
			width: e.width,
			height: e.height,
			steps: e.steps,
			scale: e.scale,
			cfg_rescale: e.cfg_rescale,
			sampler: e.sampler,
			noise_schedule: e.noise_schedule,
			...e.seed === void 0 ? {} : { seed: e.seed },
			n_samples: e.output_count,
			qualityToggle: e.quality_toggle,
			ucPreset: Ge(e.undesired_content_preset),
			sm: e.smea,
			sm_dyn: e.dyn,
			...n.length === 0 ? {} : {
				reference_image_multiple: n.map((e) => D(Y(t, e.asset_id).bytes)),
				reference_strength_multiple: n.map((e) => e.strength),
				reference_information_extracted_multiple: n.map((e) => e.information_extracted)
			},
			...r.length === 0 ? {} : {
				director_reference_images: r.map((e) => D(Y(t, e.asset_id).bytes)),
				director_reference_descriptions: r.map((e) => ({
					caption: {
						base_caption: `character, ${e.prompt}`,
						char_captions: []
					},
					legacy_uc: !1,
					use_coords: !1,
					use_order: !0
				})),
				director_reference_strength_values: r.map((e) => e.strength),
				director_reference_secondary_strength_values: r.map((e) => e.strength),
				director_reference_information_extracted: r.map(() => 1)
			}
		}
	};
}
function Y(e, t) {
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw M();
	return n;
}
function Ge(e) {
	return e === "light" ? 1 : e === "human_focus" ? 2 : e === "none" ? 3 : 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_response.ts
var Ke = f({ images: l(f({
	image: g(),
	index: h().int().nonnegative(),
	seed: h().int().nonnegative()
})).min(1).max(4) });
async function qe(e, t, n, r, i, a = ["image/png", "image/webp"]) {
	try {
		if (e.byteLength === 0 || e.byteLength > r) throw j();
		let s = t.toLowerCase(), c;
		if (s.startsWith("application/json")) c = Je(e, r);
		else if (s.startsWith("application/zip") || s.startsWith("application/x-zip-compressed")) c = { images: await Ye(e, r, i) };
		else if (s.startsWith("multipart/")) c = { images: Qe(e, t, r, i) };
		else throw j();
		if (c.images.length !== n.output_count) throw j();
		let l = c.images.map((e) => k(e, n.width, n.height, a));
		return {
			result: o.parse(A({
				request_id: n.request_id,
				provider_id: "novelai",
				assets: l.map(({ asset: e }) => e)
			}, c.seed ?? n.seed)),
			output_assets: l
		};
	} catch (e) {
		throw e instanceof b ? e : j();
	}
}
function Je(e, t) {
	let n = new TextDecoder("utf-8", { fatal: !0 }).decode(e), r = Ke.parse(JSON.parse(n)).images;
	if (r.sort((e, t) => e.index - t.index), r.some((e, t) => e.index !== t)) throw j();
	let i = 0, a = r.map((e) => {
		let n = E(e.image, t - i);
		return i += n.byteLength, n;
	}), o = r[0]?.seed;
	return o === void 0 ? { images: a } : {
		images: a,
		seed: o
	};
}
async function Ye(e, t, n) {
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = Xe(r), a = r.getUint16(i + 4, !0), o = r.getUint16(i + 6, !0), s = r.getUint16(i + 8, !0), c = r.getUint16(i + 10, !0), l = r.getUint32(i + 12, !0), u = r.getUint32(i + 16, !0);
	if (a !== 0 || o !== 0 || s !== c || c === 0 || c > n || u + l !== i) throw j();
	let d = new TextDecoder("utf-8", { fatal: !0 }), f = [], p = /* @__PURE__ */ new Set(), m = u, h = 0;
	for (let n = 0; n < c; n += 1) {
		if (X(e, m, 46), r.getUint32(m, !0) !== 33639248) throw j();
		let n = r.getUint16(m + 8, !0), i = r.getUint16(m + 10, !0), a = r.getUint32(m + 16, !0), o = r.getUint32(m + 20, !0), s = r.getUint32(m + 24, !0), c = r.getUint16(m + 28, !0), l = r.getUint16(m + 30, !0), g = r.getUint16(m + 32, !0), _ = r.getUint16(m + 34, !0), v = r.getUint32(m + 42, !0);
		if (p.has(v)) throw j();
		p.add(v);
		let y = 46 + c + l + g;
		if (X(e, m, y), n & 1 || _ !== 0 || i !== 0 && i !== 8 || s === 0 || s > t - h) throw j();
		let b = d.decode(e.subarray(m + 46, m + 46 + c));
		if (et(b), X(e, v, 30), r.getUint32(v, !0) !== 67324752) throw j();
		let x = r.getUint16(v + 6, !0), S = r.getUint16(v + 8, !0), C = r.getUint16(v + 26, !0), w = r.getUint16(v + 28, !0), T = d.decode(e.subarray(v + 30, v + 30 + C)), E = v + 30 + C + w;
		if (X(e, E, o), x !== n || S !== i || T !== b || E + o > u) throw j();
		let D = e.subarray(E, E + o), O = i === 0 ? Uint8Array.from(D) : await Ze(D, s, t - h);
		if (O.byteLength !== s || nt(O) !== a) throw j();
		f.push({
			name: b,
			bytes: O
		}), h += O.byteLength, m += y;
	}
	if (m !== u + l) throw j();
	return f.sort((e, t) => e.name < t.name ? -1 : +(e.name > t.name)), f.map((e) => e.bytes);
}
function Xe(e) {
	let t = Math.max(0, e.byteLength - 65557);
	for (let n = e.byteLength - 22; n >= t; --n) if (e.getUint32(n, !0) === 101010256) {
		let t = e.getUint16(n + 20, !0);
		if (n + 22 + t === e.byteLength) return n;
	}
	throw j();
}
async function Ze(e, t, n) {
	let r = new Blob([Uint8Array.from(e)]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(), i = [], a = 0;
	for (;;) {
		let e = await r.read();
		if (e.done) break;
		if (a += e.value.byteLength, a > t || a > n) throw await r.cancel(), j();
		i.push(e.value);
	}
	return tt(i, a);
}
function Qe(e, t, n, r) {
	let i = /boundary=(?:"([^"]{1,70})"|([!#$%&'*+.^_`|~0-9A-Za-z-]{1,70}))/iu.exec(t), a = i?.[1] ?? i?.[2];
	if (a === void 0) throw j();
	let o = new TextEncoder(), s = o.encode(`--${a}`), c = o.encode(`\r\n--${a}`), l = Uint8Array.of(13, 10, 13, 10), u = Uint8Array.of(13, 10), d = Uint8Array.of(45, 45), f = new TextDecoder("utf-8", { fatal: !0 }), p = [], m = 0, h = 0;
	for (;;) {
		if (Z(e, s, h) !== h) throw j();
		if (h += s.length, Q(e, d, h)) break;
		if (!Q(e, u, h)) throw j();
		h += u.length;
		let t = Z(e, l, h);
		if (t < 0 || t - h > 8192) throw j();
		let i = $e(f.decode(e.subarray(h, t))), a = t + l.length, o = Z(e, c, a);
		if (o < 0 || o === a) throw j();
		let g = Uint8Array.from(e.subarray(a, o));
		if (m += g.byteLength, p.length >= r || m > n || ![
			"image/png",
			"image/jpeg",
			"image/webp"
		].includes(i)) throw j();
		p.push(g), h = o + 2;
	}
	if (p.length === 0) throw j();
	return p;
}
function $e(e) {
	for (let t of e.split("\r\n")) {
		let e = t.indexOf(":");
		if (e > 0 && t.slice(0, e).trim().toLowerCase() === "content-type") return t.slice(e + 1).trim().toLowerCase().split(";", 1)[0] ?? "";
	}
	throw j();
}
function et(e) {
	if (e.length === 0 || e.length > 255 || e.includes("/") || e.includes("\\") || e.includes("\0") || e === "." || e === ".." || !/\.(?:png|jpe?g|webp)$/iu.test(e)) throw j();
}
function X(e, t, n) {
	if (!Number.isSafeInteger(t) || !Number.isSafeInteger(n) || t < 0 || n < 0 || t + n > e.byteLength) throw j();
}
function Z(e, t, n) {
	let r = e.length - t.length;
	for (let i = n; i <= r; i += 1) if (Q(e, t, i)) return i;
	return -1;
}
function Q(e, t, n) {
	if (n < 0 || n + t.length > e.length) return !1;
	for (let r = 0; r < t.length; r += 1) if (e[n + r] !== t[r]) return !1;
	return !0;
}
function tt(e, t) {
	let n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function nt(e) {
	let t = 4294967295;
	for (let n of e) {
		t ^= n;
		for (let e = 0; e < 8; e += 1) t = t >>> 1 ^ (t & 1 ? 3988292384 : 0);
	}
	return (t ^ 4294967295) >>> 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_adapter.ts
var rt = m({
	profile_id: g().trim().min(1).max(128),
	provider_id: _("novelai"),
	model_allowlist: l(g().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: l(i(["image/png", "image/webp"])).min(1).max(2),
	max_response_bytes: h().int().positive().max(1e8),
	max_archive_entries: h().int().min(1).max(32),
	max_input_asset_bytes: h().int().positive().max(1e8).default(2e7)
}).check((e) => {
	for (let t of ["model_allowlist", "output_mime_type_allowlist"]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), it = { next: Math.random }, at = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), ot = class {
	provider_id = "novelai";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"reference_image",
		"seed"
	]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new P(), this.#t = e.random ?? it;
	}
	validate_profile(e) {
		return rt.parse(e);
	}
	async submit(e, t) {
		let n = st(t), r = ct(e.profile);
		if (!r.model_allowlist.includes(n.model_id)) throw M();
		let i = await lt(e, n, r.max_input_asset_bytes), a = w(r.max_input_asset_bytes), o = await I(n, async (t, n) => {
			let o = We(t, i), s = this.#e.now(), c = await e.transport.execute({
				route: "/ai/generate-image",
				method: "POST",
				body: new TextEncoder().encode(JSON.stringify(o)),
				max_request_bytes: a,
				content_type: "application/json",
				accept: "application/json, application/zip, multipart/mixed",
				max_response_bytes: r.max_response_bytes,
				signal: e.signal
			});
			if (e.log.write(S({
				provider_id: this.provider_id,
				request_id: t.request_id,
				attempt: n,
				status_code: c.status,
				duration_ms: Math.max(0, this.#e.now() - s),
				byte_count: c.body.byteLength
			})), c.status === 451) throw new b({
				code: "content_blocked",
				retryable: !1,
				status_code: 451
			});
			if (c.status < 200 || c.status >= 300) {
				let e = F(c.headers["retry-after"] ?? null, this.#e.now());
				throw new b(x(c.status, {
					recoverable: at.has(c.status),
					...e === void 0 ? {} : { retry_after_ms: e }
				}));
			}
			return c;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		return {
			state: "completed",
			...await qe(o.body, o.headers["content-type"] ?? "", n, r.max_response_bytes, r.max_archive_entries, r.output_mime_type_allowlist)
		};
	}
	poll(e, t) {
		return Promise.reject(M());
	}
	cancel(e, t) {
		return Promise.reject(M());
	}
};
function st(e) {
	let t = s.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function ct(e) {
	let t = rt.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
async function lt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let e of t.vibe_references ?? []) r.add(e.asset_id);
	for (let e of t.character_references ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw M();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
//#region ../../packages/providers/src/openai_image/openai_image_adapter.ts
var ut = m({
	profile_id: g().trim().min(1).max(128),
	provider_id: _("openai_image"),
	model_allowlist: l(a.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: l(i([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	remote_asset_origin_allowlist: l(v()).max(32),
	max_response_bytes: h().int().positive().max(1e8),
	max_input_asset_bytes: h().int().positive().max(1e8)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"output_mime_type_allowlist",
		"remote_asset_origin_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), dt = m({
	created: h().int().nonnegative().optional(),
	data: l(d([m({ b64_json: g().min(1) }), m({ url: v() })])).min(1).max(4),
	usage: p().optional()
}), ft = { next: Math.random }, pt = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), mt = class {
	provider_id = "openai_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new P(), this.#t = e.random ?? ft;
	}
	validate_profile(e) {
		return ut.parse(e);
	}
	async submit(e, t) {
		let n = xt(t), r = St(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(Tt(n.output_format))) throw M();
		let i = w(r.max_input_asset_bytes), a = n.mode === "generate" ? ht(n, e.signal, r.max_response_bytes, i) : await gt(e, n, r.max_input_asset_bytes, r.max_response_bytes, i), s = await I(n, async (t, n) => {
			let r = this.#e.now(), i = await e.transport.execute(a);
			return $(e, t.request_id, n, i, r, this.#e), yt(i, this.#e), i;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		if (s.body.byteLength > r.max_response_bytes) throw j();
		let c;
		try {
			c = dt.parse(Ct(s.body));
		} catch {
			throw j();
		}
		if (c.data.length !== n.output_count) throw j();
		let l = wt(n.size), u = [], d = 0;
		for (let t of c.data) {
			let i;
			if (i = "b64_json" in t ? E(t.b64_json, r.max_response_bytes - d) : await vt(e, t.url, r, r.max_response_bytes - d, n, this.#t, this.#e), d += i.byteLength, d > r.max_response_bytes) throw j();
			let a = k(i, l.width, l.height, r.output_mime_type_allowlist);
			if (a.asset.media_type !== Tt(n.output_format)) throw j();
			u.push(a);
		}
		return {
			state: "completed",
			result: o.parse({
				request_id: n.request_id,
				provider_id: "openai_image",
				assets: u.map(({ asset: e }) => e)
			}),
			output_assets: u
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw M();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function ht(e, t, n, r) {
	let i = {
		model: e.model_id,
		prompt: _t(e),
		n: e.output_count,
		size: e.size,
		quality: e.quality,
		background: e.background,
		output_format: e.output_format,
		...e.compression === void 0 ? {} : { output_compression: e.compression }
	};
	return {
		route: "/v1/images/generations",
		method: "POST",
		body: new TextEncoder().encode(JSON.stringify(i)),
		max_request_bytes: r,
		content_type: "application/json",
		accept: "application/json",
		max_response_bytes: n,
		signal: t
	};
}
async function gt(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of t.input_asset_ids.entries()) {
		let t = await e.assets.read(i, e.signal);
		if (t.asset_id !== i) throw M();
		let s = t.bytes.byteLength;
		if (s > n || s > n - o) throw M();
		o += s, a.push({
			field_name: "image[]",
			file_name: `input_${String(r)}.${Et(t.media_type)}`,
			content_type: t.media_type,
			bytes: t.bytes
		});
	}
	if (t.mask_asset_id !== void 0) {
		let r = await e.assets.read(t.mask_asset_id, e.signal);
		if (r.asset_id !== t.mask_asset_id) throw M();
		let i = r.bytes.byteLength;
		if (i > n || i > n - o) throw M();
		a.push({
			field_name: "mask",
			file_name: `mask.${Et(r.media_type)}`,
			content_type: r.media_type,
			bytes: r.bytes
		});
	}
	let s = te({
		model: t.model_id,
		prompt: _t(t),
		n: String(t.output_count),
		size: t.size,
		quality: t.quality,
		background: t.background,
		output_format: t.output_format,
		...t.compression === void 0 ? {} : { output_compression: String(t.compression) }
	}, a);
	return {
		route: "/v1/images/edits",
		method: "POST",
		body: s.body,
		max_request_bytes: i,
		content_type: s.content_type,
		accept: "application/json",
		max_response_bytes: r,
		signal: e.signal
	};
}
function _t(e) {
	return e.negative_prompt === void 0 ? e.prompt : `${e.prompt}\n\nAvoid: ${e.negative_prompt}`;
}
async function vt(e, t, n, r, i, a, o) {
	let s;
	try {
		s = new URL(t);
	} catch {
		throw j();
	}
	let c = n.remote_asset_origin_allowlist.map((e) => new URL(e).origin), l = e.transport.fetch_remote_asset?.bind(e.transport);
	if (s.protocol !== "https:" || s.username.length > 0 || s.password.length > 0 || s.hash.length > 0 || !c.includes(s.origin) || l === void 0 || r <= 0) throw j();
	return L(i, async (t, n) => {
		let i = o.now(), a = await l({
			url: s.href,
			allowed_origins: c,
			max_bytes: r,
			signal: e.signal
		});
		if ($(e, t.request_id, n, a, i, o), yt(a, o), a.body.byteLength > r) throw j();
		return a.body;
	}, {
		signal: e.signal,
		clock: o,
		random: a
	});
}
function yt(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (bt(e)) throw new b({
		code: "content_blocked",
		retryable: !1,
		status_code: e.status
	});
	let n = F(e.headers["retry-after"] ?? null, t.now());
	throw new b(x(e.status, {
		recoverable: pt.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function bt(e) {
	if (e.status !== 400) return !1;
	try {
		let t = Ct(e.body);
		return typeof t == "object" && !!t && "error" in t && typeof t.error == "object" && t.error !== null && "code" in t.error && t.error.code === "content_policy_violation";
	} catch {
		return !1;
	}
}
function $(e, t, n, r, i, a) {
	e.log.write(S({
		provider_id: "openai_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function xt(e) {
	let t = a.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function St(e) {
	let t = ut.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function Ct(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
function wt(e) {
	if (e === "auto") return {
		width: void 0,
		height: void 0
	};
	let [t, n] = e.split("x").map(Number);
	return {
		width: t,
		height: n
	};
}
function Tt(e) {
	return e === "jpeg" ? "image/jpeg" : e === "webp" ? "image/webp" : "image/png";
}
function Et(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_mapping.ts
function Dt(e, t) {
	let n = (e.lora_tokens ?? []).map((e) => `<lora:${e.lora_id}:${String(e.weight)}>`).join(", "), r = n.length === 0 ? e.prompt : `${e.prompt}, ${n}`, i = { sd_model_checkpoint: e.model_id };
	e.vae_id !== void 0 && (i.sd_vae = e.vae_id);
	let a = {};
	return e.adetailer !== void 0 && e.adetailer.length > 0 && (a.ADetailer = { args: [
		!0,
		!1,
		...e.adetailer.map((e) => ({
			ad_model: e.model_id,
			...e.prompt === void 0 ? {} : { ad_prompt: e.prompt },
			...e.negative_prompt === void 0 ? {} : { ad_negative_prompt: e.negative_prompt },
			...e.confidence === void 0 ? {} : { ad_confidence: e.confidence },
			...e.mask_blur === void 0 ? {} : { ad_mask_blur: e.mask_blur },
			...e.denoise_strength === void 0 ? {} : { ad_denoising_strength: e.denoise_strength }
		}))
	] }), e.controlnet !== void 0 && e.controlnet.length > 0 && (a.controlnet = { args: e.controlnet.map((e) => ({
		enabled: !0,
		image: D(jt(t, e.asset_id).bytes),
		module: e.module,
		model: e.model_id,
		weight: e.weight,
		guidance_start: e.guidance_start,
		guidance_end: e.guidance_end,
		...e.control_mode === void 0 ? {} : { control_mode: Mt(e.control_mode) },
		...e.resize_mode === void 0 ? {} : { resize_mode: Nt(e.resize_mode) }
	})) }), {
		prompt: r,
		...e.negative_prompt === void 0 ? {} : { negative_prompt: e.negative_prompt },
		batch_size: e.output_count,
		n_iter: 1,
		sampler_name: e.sampler,
		scheduler: e.scheduler,
		width: e.width,
		height: e.height,
		steps: e.steps,
		cfg_scale: e.cfg_scale,
		...e.seed === void 0 ? {} : { seed: e.seed },
		...Ot(e, t),
		override_settings: i,
		override_settings_restore_afterwards: !0,
		...Object.keys(a).length === 0 ? {} : { alwayson_scripts: a }
	};
}
function Ot(e, t) {
	return e.mode === "img2img" ? At(e, t) : kt(e);
}
function kt(e) {
	if (e.mode !== "txt2img") throw M();
	return e.hires_fix === void 0 ? {} : {
		enable_hr: !0,
		hr_scale: e.hires_fix.scale,
		hr_upscaler: e.hires_fix.upscaler_id,
		hr_second_pass_steps: e.hires_fix.steps,
		denoising_strength: e.hires_fix.denoise_strength
	};
}
function At(e, t) {
	if (e.mode !== "img2img") return {};
	if (e.hires_fix !== void 0 || e.denoise_strength === void 0) throw M();
	return {
		init_images: [D(jt(t, e.input_asset_id).bytes)],
		denoising_strength: e.denoise_strength
	};
}
function jt(e, t) {
	if (t === void 0) throw M();
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw M();
	return n;
}
function Mt(e) {
	return e === "prompt" ? "My prompt is more important" : e === "control" ? "ControlNet is more important" : "Balanced";
}
function Nt(e) {
	return e === "crop_and_resize" ? "Scale to Fit (Inner Fit)" : e === "resize_and_fill" ? "Envelope (Outer Fit)" : "Just Resize";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_response.ts
var Pt = f({
	images: l(g()),
	info: g()
}), Ft = f({ seed: h().int().nonnegative().optional() });
function It(e, t, n, r = [
	"image/png",
	"image/jpeg",
	"image/webp"
]) {
	try {
		if (e.byteLength === 0 || e.byteLength > n) throw j();
		let i = new TextDecoder("utf-8", { fatal: !0 }).decode(e), a = Pt.parse(JSON.parse(i)), { images: s } = a, c = a.info;
		if (s.length !== t.output_count) throw j();
		let l = t.hires_fix === void 0 ? t.width : Math.round(t.width * t.hires_fix.scale), u = t.hires_fix === void 0 ? t.height : Math.round(t.height * t.hires_fix.scale), d = 0, f = s.map((e) => {
			if (typeof e != "string") throw j();
			let t = E(e, n - d);
			return d += t.byteLength, k(t, l, u, r);
		}), p = Lt(c);
		return {
			result: o.parse(A({
				request_id: t.request_id,
				provider_id: "sd_webui",
				assets: f.map(({ asset: e }) => e)
			}, p ?? t.seed)),
			output_assets: f
		};
	} catch (e) {
		throw e instanceof b ? e : j();
	}
}
function Lt(e) {
	return Ft.parse(JSON.parse(e)).seed;
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_adapter.ts
var Rt = m({
	profile_id: g().trim().min(1).max(128),
	provider_id: _("sd_webui"),
	model_allowlist: l(g().trim().min(1).max(128)).min(1).max(128),
	vae_allowlist: l(g().trim().min(1).max(128)).max(128).default([]),
	adetailer_model_allowlist: l(g().trim().min(1).max(128)).max(128).default([]),
	controlnet_model_allowlist: l(g().trim().min(1).max(128)).max(128).default([]),
	output_mime_type_allowlist: l(i([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: h().int().positive().max(1e8),
	max_input_asset_bytes: h().int().positive().max(1e8).default(2e7)
}).check((e) => {
	for (let t of [
		"model_allowlist",
		"vae_allowlist",
		"adetailer_model_allowlist",
		"controlnet_model_allowlist",
		"output_mime_type_allowlist"
	]) {
		let n = e.value[t];
		new Set(n).size !== n.length && e.issues.push({
			code: "custom",
			input: n,
			message: `${t} must not contain duplicates`,
			path: [t]
		});
	}
}), zt = { next: Math.random }, Bt = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Vt = class {
	provider_id = "sd_webui";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"image_to_image",
		"reference_image",
		"cancel",
		"seed"
	]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new P(), this.#t = e.random ?? zt;
	}
	validate_profile(e) {
		return Rt.parse(e);
	}
	async submit(e, t) {
		let n = Ht(t), r = Ut(e.profile);
		Wt(r, n);
		let i = await Gt(e, n, r.max_input_asset_bytes), a = w(r.max_input_asset_bytes);
		return {
			state: "completed",
			...It((await I(n, async (t, n) => {
				let o = Dt(t, i), s = t.mode === "txt2img" ? "/sdapi/v1/txt2img" : "/sdapi/v1/img2img", c = this.#e.now(), l = await e.transport.execute({
					route: s,
					method: "POST",
					body: new TextEncoder().encode(JSON.stringify(o)),
					max_request_bytes: a,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes,
					signal: e.signal
				});
				if (e.log.write(S({
					provider_id: this.provider_id,
					request_id: t.request_id,
					attempt: n,
					status_code: l.status,
					duration_ms: Math.max(0, this.#e.now() - c),
					byte_count: l.body.byteLength
				})), l.status === 451) throw new b({
					code: "content_blocked",
					retryable: !1,
					status_code: 451
				});
				if (l.status < 200 || l.status >= 300) {
					let e = F(l.headers["retry-after"] ?? null, this.#e.now());
					throw new b(x(l.status, {
						recoverable: Bt.has(l.status),
						...e === void 0 ? {} : { retry_after_ms: e }
					}));
				}
				return l;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			})).body, n, r.max_response_bytes, r.output_mime_type_allowlist)
		};
	}
	poll(e, t) {
		return Promise.reject(M());
	}
	async cancel(e, t) {
		if (t !== void 0 && t.state !== "pending") return;
		let n = Ut(e.profile), r = await e.transport.execute({
			route: "/sdapi/v1/interrupt",
			method: "POST",
			signal: e.signal,
			max_response_bytes: n.max_response_bytes
		});
		if (r.status < 200 || r.status >= 300) throw new b(x(r.status));
	}
};
function Ht(e) {
	let t = r.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function Ut(e) {
	let t = Rt.safeParse(e);
	if (!t.success) throw M();
	return t.data;
}
function Wt(e, t) {
	if (!e.model_allowlist.includes(t.model_id) || t.vae_id !== void 0 && !e.vae_allowlist.includes(t.vae_id)) throw M();
	for (let n of t.adetailer ?? []) if (!e.adetailer_model_allowlist.includes(n.model_id)) throw M();
	for (let n of t.controlnet ?? []) if (!e.controlnet_model_allowlist.includes(n.model_id)) throw M();
}
async function Gt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	t.input_asset_id !== void 0 && r.add(t.input_asset_id);
	for (let e of t.controlnet ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw M();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
export { Ee as ComfyUiAdapter, Re as GoogleImageAdapter, ot as NovelAiAdapter, mt as OpenAiImageAdapter, Vt as SdWebuiAdapter };
