import { c as e, d as t, f as n, l as r, n as i, s as a, u as o } from "./provider-ChWi4KfU.js";
import { C as s, T as c, _ as l, b as u, g as d, l as f, m as p, s as m, t as h, u as g, w as _, x as v, y } from "./ids-CQF5rr2J.js";
import { i as b, n as ee, o as te, r as x } from "./novelai-Dkv1N5Ct.js";
import { r as S } from "./novelai_models-CWhnujYI.js";
import { a as C, c as w, i as T, o as E, r as D, s as ne } from "./provider_transport-Cq9_eXR7.js";
//#region ../../packages/contracts/src/providers/novelai_account.ts
var re = d().int().nonnegative(), ie = l({
	tier: d().int().min(0).max(3),
	active: g(),
	expiresAt: d().int().nonnegative(),
	trainingStepsLeft: l({
		fixedTrainingStepsLeft: re,
		purchasedTrainingSteps: re
	}),
	usage: l({
		percent: d(),
		purchasedPercent: d(),
		isNegative: g(),
		timeUntilNextPercent: d().nonnegative()
	}).optional()
}), ae = [
	"paper",
	"tablet",
	"scroll",
	"opus"
];
function oe(e) {
	let t = ie.parse(e), n = t.trainingStepsLeft.fixedTrainingStepsLeft, r = t.trainingStepsLeft.purchasedTrainingSteps;
	return {
		tier: ae[t.tier] ?? "paper",
		tier_level: t.tier,
		active: t.active,
		expires_at: (/* @__PURE__ */ new Date(t.expiresAt * 1e3)).toISOString(),
		anlas: n + r,
		fixed_anlas: n,
		purchased_anlas: r,
		usage: t.usage === void 0 ? null : {
			percent: t.usage.percent,
			purchased_percent: t.usage.purchasedPercent,
			is_negative: t.usage.isNegative,
			time_until_next_percent: t.usage.timeUntilNextPercent
		}
	};
}
//#endregion
//#region ../../packages/providers/src/image_bytes.ts
function O(e, t) {
	let n = e.indexOf(","), r = e.startsWith("data:") ? n < 0 ? "" : e.slice(n + 1) : e;
	if (r.length === 0 || r.length % 4 == 1 || !/^[A-Za-z0-9+/]*={0,2}$/u.test(r)) throw M();
	let i;
	try {
		i = atob(r);
	} catch {
		throw M();
	}
	if (i.length === 0 || i.length > t) throw M();
	return Uint8Array.from(i, (e) => e.charCodeAt(0));
}
function k(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function se(e) {
	if (e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10) return "image/png";
	if (e.length >= 4 && e[0] === 255 && e[1] === 216 && e[2] === 255) return "image/jpeg";
	if (e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80) return "image/webp";
}
function ce(e, r, i, a) {
	let o = se(e);
	if (o === void 0 || !a.includes(o)) throw M();
	let s = t(e), c = n(s), l = s.slice(0, 16);
	l[6] = (l[6] ?? 0) & 15 | 80, l[8] = (l[8] ?? 0) & 63 | 128;
	let u = n(l);
	return {
		asset_id: h.parse(`${u.slice(0, 8)}-${u.slice(8, 12)}-${u.slice(12, 16)}-${u.slice(16, 20)}-${u.slice(20)}`),
		media_type: o,
		byte_length: e.byteLength,
		sha256: c,
		...r === void 0 ? {} : { width: r },
		...i === void 0 ? {} : { height: i }
	};
}
function A(e, t, n, r) {
	return {
		asset: ce(e, t, n, r),
		bytes: e
	};
}
function j(e, t) {
	return t === void 0 ? e : {
		...e,
		seed: t
	};
}
function M() {
	return new C({
		code: "malformed_response",
		retryable: !1
	});
}
function N() {
	return new C({
		code: "invalid_request",
		retryable: !1
	});
}
//#endregion
//#region ../../packages/providers/src/multipart.ts
function le(e, t) {
	for (let t of Object.keys(e)) P(t);
	for (let e of t) if (P(e.field_name), P(e.file_name), !/^[a-z]+\/[a-z0-9.+-]+$/u.test(e.content_type)) throw N();
	let n = ue(e, t), r = new TextEncoder(), i = [];
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
function ue(e, t) {
	for (let n = 0; n < 8; n += 1) {
		let n = `tavern-canvas-${globalThis.crypto.randomUUID()}`, r = new TextEncoder().encode(n);
		if (!(Object.entries(e).some(([e, t]) => e.includes(n) || t.includes(n)) || t.some((e) => e.field_name.includes(n) || e.file_name.includes(n) || e.content_type.includes(n) || de(e.bytes, r)))) return n;
	}
	throw N();
}
function de(e, t) {
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
function P(e) {
	if (e.length === 0 || e.length > 128 || /["\r\n]/u.test(e)) throw N();
}
//#endregion
//#region ../../packages/providers/src/retry_policy.ts
var fe = 2, pe = 250, me = 1e4, he = 12e4, F = class {
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
function I(e, t) {
	if (e === null) return;
	let n = e.trim();
	if (/^\d+$/u.test(n)) {
		let e = Number(n);
		return Number.isSafeInteger(e) && e <= (2 ** 53 - 1) / 1e3 ? e * 1e3 : void 0;
	}
	let r = Date.parse(n);
	if (Number.isFinite(r)) return Math.max(0, r - t);
}
function L(e, t, n) {
	return R(e, async (e, n) => {
		try {
			return await t(e, n);
		} catch (e) {
			throw e instanceof E ? new C({
				code: "provider_unavailable",
				retryable: !1
			}) : e instanceof DOMException && e.name === "TimeoutError" ? new C({
				code: "timed_out",
				retryable: !1
			}) : e;
		}
	}, n);
}
async function R(e, t, n) {
	let r = _e(n.max_retries, fe), i = z(n.base_delay_ms, pe), a = z(n.max_delay_ms, me), o = z(n.max_retry_after_ms, he);
	for (let s = 0;; s += 1) {
		if (n.signal.aborted) throw new C({
			code: "cancelled",
			retryable: !1
		});
		try {
			return await t(structuredClone(e), s);
		} catch (e) {
			let t = ne(e, n.signal);
			if (!t.provider_error.retryable || s >= r) throw t;
			let c = t.provider_error.retry_after_ms, l = c === void 0 ? ge(s, i, a, n.random) : Math.min(c, o);
			try {
				await n.clock.sleep(l, n.signal);
			} catch {
				throw new C({
					code: "cancelled",
					retryable: !1
				});
			}
		}
	}
}
function ge(e, t, n, r) {
	let i = r.next(), a = .5 + (Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : .5);
	return Math.min(n, Math.round(t * 2 ** e * a));
}
function _e(e, t) {
	return e === void 0 || !Number.isInteger(e) || e < 0 ? t : e;
}
function z(e, t) {
	return e === void 0 || !Number.isFinite(e) || e <= 0 ? t : e;
}
//#endregion
//#region ../../packages/providers/src/comfyui/workflow_renderer.ts
var ve = 500, ye = 16, be = 1e5, xe = 1e6, Se = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), B = u({
	node_id: v().trim().min(1).max(128),
	property: v().trim().min(1).max(128)
}), Ce = B.extend({ value_type: m([
	"string",
	"number",
	"boolean"
]) }), we = u({
	workflow_id: h,
	workflow: _(),
	bindings: u({
		prompt: B,
		negative_prompt: B.optional(),
		seed: B.optional(),
		output_count: B,
		placeholders: y(v().trim().min(1).max(128), Ce).default({}),
		input_assets: y(v().trim().min(1).max(128), B).default({})
	})
});
function Te(e) {
	try {
		let t = we.parse(e);
		if (!H(t.workflow)) throw N();
		let n = Object.entries(t.workflow);
		if (n.length === 0 || n.length > ve) throw N();
		De(t.workflow);
		let r = JSON.stringify(t.workflow);
		if (new TextEncoder().encode(r).byteLength > xe) throw N();
		let i = {};
		for (let [e, t] of n) {
			if (!U(e) || !H(t)) throw N();
			let n = t.class_type, r = t.inputs;
			if (typeof n != "string" || n.length === 0 || n.length > 256 || !H(r)) throw N();
			i[e] = t;
		}
		return {
			workflow_id: t.workflow_id,
			workflow: i,
			bindings: t.bindings
		};
	} catch (e) {
		throw e instanceof C ? e : N();
	}
}
function Ee(e, t) {
	let n = structuredClone(e.workflow);
	if (V(n, e.bindings.prompt, t.prompt, "string"), V(n, e.bindings.output_count, t.output_count, "number"), t.negative_prompt !== void 0) {
		if (e.bindings.negative_prompt === void 0) throw N();
		V(n, e.bindings.negative_prompt, t.negative_prompt, "string");
	}
	if (t.seed !== void 0) {
		if (e.bindings.seed === void 0) throw N();
		V(n, e.bindings.seed, t.seed, "number");
	}
	for (let [r, i] of Object.entries(t.placeholder_values)) {
		let t = e.bindings.placeholders[r];
		if (t === void 0 || typeof i !== t.value_type) throw N();
		V(n, t, i, t.value_type);
	}
	for (let [r, i] of Object.entries(t.input_asset_names)) {
		let t = e.bindings.input_assets[r];
		if (t === void 0) throw N();
		V(n, t, i, "string");
	}
	return n;
}
function V(e, t, n, r) {
	if (!U(t.node_id) || !U(t.property) || typeof n !== r) throw N();
	let i = e[t.node_id];
	if (i === void 0 || !H(i.inputs) || !Object.hasOwn(i.inputs, t.property)) throw N();
	i.inputs[t.property] = n;
}
function De(e) {
	let t = [{
		value: e,
		depth: 0
	}], n = 0;
	for (; t.length > 0;) {
		let e = t.pop();
		if (e === void 0) break;
		if (n += 1, n > be || e.depth > ye) throw N();
		if (e.value === null) continue;
		let r = typeof e.value;
		if (r !== "string" && r !== "boolean") {
			if (r === "number") {
				if (!Number.isFinite(e.value)) throw N();
				continue;
			}
			if (Array.isArray(e.value)) {
				for (let n of e.value) t.push({
					value: n,
					depth: e.depth + 1
				});
				continue;
			}
			if (!H(e.value)) throw N();
			for (let [n, r] of Object.entries(e.value)) {
				if (!U(n)) throw N();
				t.push({
					value: r,
					depth: e.depth + 1
				});
			}
		}
	}
}
function H(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function U(e) {
	return e.length > 0 && e.length <= 256 && !Se.has(e);
}
//#endregion
//#region ../../packages/providers/src/comfyui/comfyui_adapter.ts
var Oe = u({
	profile_id: v().trim().min(1).max(128),
	provider_id: p("comfyui"),
	model_allowlist: f(v().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: f(m([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	workflow_allowlist: f(h).min(1).max(256),
	max_response_bytes: d().int().positive().max(1e8),
	max_input_asset_bytes: d().int().positive().max(1e8)
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
}), ke = l({
	prompt_id: v().trim().min(1).max(128),
	number: d(),
	node_errors: y(v(), _())
}), Ae = l({
	name: v().trim().min(1).max(512),
	subfolder: v().max(512),
	type: m([
		"input",
		"output",
		"temp"
	])
}), je = u({ request: u({
	request_id: o.shape.request_id,
	output_count: o.shape.output_count,
	output_node_ids: o.shape.output_node_ids,
	seed: o.shape.seed
}) }), Me = { next: Math.random }, Ne = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Pe = 3e6, Fe = class {
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
		this.#e = e.workflow_store, this.#t = e.clock ?? new F(), this.#n = e.random ?? Me;
	}
	validate_profile(e) {
		return Oe.parse(e);
	}
	async submit(e, t) {
		let n = Ve(t), r = G(e.profile);
		if (!r.workflow_allowlist.includes(n.workflow_id)) throw N();
		let i;
		try {
			i = Te(await this.#e.load(n.workflow_id));
		} catch {
			throw N();
		}
		if (i.workflow_id !== n.workflow_id) throw N();
		Le(i, n, Object.fromEntries(Object.keys(n.input_asset_bindings).map((e) => [e, "validated-input.png"])));
		let a = await Ie(e, n, r, this.#t, this.#n), o = Le(i, n, a), s = new TextEncoder().encode(JSON.stringify({ prompt: o }));
		if (s.byteLength > Pe) throw N();
		let c = await W(e, n, {
			route: "/prompt",
			method: "POST",
			body: s,
			max_request_bytes: Pe,
			content_type: "application/json",
			accept: "application/json",
			max_response_bytes: r.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (c.body.byteLength > r.max_response_bytes) throw M();
		let l;
		try {
			l = ke.parse(K(c.body));
		} catch {
			throw M();
		}
		if (Object.keys(l.node_errors).length > 0) throw N();
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
		if (t.state !== "pending") throw N();
		let n = je.safeParse(t.continuation);
		if (!n.success) throw N();
		let r = n.data.request, a = G(e.profile), o = await W(e, r, {
			route: `/history/${encodeURIComponent(t.submission_id)}`,
			method: "GET",
			accept: "application/json",
			max_response_bytes: a.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (o.body.byteLength > a.max_response_bytes) throw M();
		let s = K(o.body);
		if (!q(s)) throw M();
		let c = s[t.submission_id];
		if (c === void 0) return {
			state: "pending",
			poll_after_ms: 250
		};
		if (!q(c)) throw M();
		let l = c.status;
		if (!q(l)) throw M();
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
		if (!q(u)) throw M();
		let d = Re(u, r.output_node_ids, r.output_count);
		if (d.length !== r.output_count) throw M();
		let f = [], p = 0;
		for (let t of d) {
			let n = await W(e, r, {
				route: `/view?${new URLSearchParams({
					filename: t.filename,
					subfolder: t.subfolder,
					type: t.type
				}).toString()}`,
				method: "GET",
				max_response_bytes: a.max_response_bytes - p,
				signal: e.signal
			}, this.#t, this.#n, !0);
			if (p += n.body.byteLength, p > a.max_response_bytes) throw M();
			f.push(A(n.body, void 0, void 0, a.output_mime_type_allowlist));
		}
		return {
			state: "completed",
			result: i.parse(j({
				request_id: r.request_id,
				provider_id: "comfyui",
				assets: f.map(({ asset: e }) => e)
			}, r.seed)),
			output_assets: f
		};
	}
	async cancel(e, t) {
		if (t === void 0) throw N();
		if (t.state !== "pending") return;
		let n = G(e.profile), r = { request_id: t.submission_id }, i = await W(e, r, {
			route: "/queue",
			method: "GET",
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (i.body.byteLength > n.max_response_bytes) throw M();
		let a = K(i.body);
		if (!q(a)) throw M();
		let o = He(a.queue_running, t.submission_id), s = He(a.queue_pending, t.submission_id);
		o ? await W(e, r, {
			route: "/interrupt",
			method: "POST",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1) : s && await W(e, r, {
			route: "/queue",
			method: "POST",
			body: new TextEncoder().encode(JSON.stringify({ delete: [t.submission_id] })),
			max_request_bytes: D(n.max_input_asset_bytes),
			content_type: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1);
	}
};
async function Ie(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of Object.entries(t.input_asset_bindings)) {
		let t = await e.assets.read(i, e.signal), s = t.bytes.byteLength;
		if (t.asset_id !== i || s > n.max_input_asset_bytes || s > n.max_input_asset_bytes - o) throw N();
		o += s, a.push({
			binding_name: r,
			asset: t
		});
	}
	let s = D(n.max_input_asset_bytes), c = {};
	for (let { binding_name: o, asset: l } of a) {
		let a = le({
			type: "input",
			overwrite: "true"
		}, [{
			field_name: "image",
			file_name: `${l.asset_id}.${Ue(l.media_type)}`,
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
		if (u.body.byteLength > n.max_response_bytes) throw M();
		let d;
		try {
			d = Ae.parse(K(u.body));
		} catch {
			throw M();
		}
		c[o] = d.subfolder.length === 0 ? d.name : `${d.subfolder}/${d.name}`;
	}
	return c;
}
function Le(e, t, n) {
	return Ee(e, {
		prompt: t.prompt,
		...t.negative_prompt === void 0 ? {} : { negative_prompt: t.negative_prompt },
		...t.seed === void 0 ? {} : { seed: t.seed },
		output_count: t.output_count,
		placeholder_values: t.placeholder_values,
		input_asset_names: n
	});
}
function Re(e, t, n) {
	let r = [];
	for (let i of t) {
		let t = e[i];
		if (!q(t) || !Array.isArray(t.images) || t.images.length > n - r.length) throw M();
		for (let e of t.images) {
			if (!q(e) || typeof e.filename != "string" || typeof e.subfolder != "string" || typeof e.type != "string" || e.filename.length === 0 || e.filename.length > 512 || e.subfolder.length > 512 || ![
				"input",
				"output",
				"temp"
			].includes(e.type)) throw M();
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
		return Be(e, t.request_id, i, o, a, r), ze(o, r), o;
	};
	if (a) return (n.method === "GET" ? R : L)(t, o, {
		signal: e.signal,
		clock: r,
		random: i
	});
	try {
		return await o(t, 0);
	} catch (t) {
		throw ne(t, e.signal);
	}
}
function ze(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (e.status === 451) throw new C({
		code: "content_blocked",
		retryable: !1,
		status_code: 451
	});
	let n = I(e.headers["retry-after"] ?? null, t.now());
	throw new C(w(e.status, {
		recoverable: Ne.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function Be(e, t, n, r, i, a) {
	e.log.write(T({
		provider_id: "comfyui",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Ve(e) {
	let t = o.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function G(e) {
	let t = Oe.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function K(e) {
	try {
		return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
	} catch {
		throw M();
	}
}
function q(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function He(e, t) {
	return Array.isArray(e) && e.some((e) => Array.isArray(e) && e[1] === t);
}
function Ue(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/google_image/google_image_adapter.ts
var We = u({
	profile_id: v().trim().min(1).max(128),
	provider_id: p("google_image"),
	model_allowlist: f(r.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: f(m([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: d().int().positive().max(1e8),
	max_input_asset_bytes: d().int().positive().max(1e8)
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
}), Ge = l({
	id: v().min(1),
	model: v().min(1),
	status: m([
		"completed",
		"failed",
		"in_progress"
	]),
	error: l({
		code: v().optional(),
		message: v().optional()
	}).optional(),
	steps: f(l({
		type: v(),
		content: f(l({
			type: v(),
			mime_type: v().optional(),
			data: v().optional()
		})).optional()
	}))
}), Ke = { next: Math.random }, qe = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Je = class {
	provider_id = "google_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new F(), this.#t = e.random ?? Ke;
	}
	validate_profile(e) {
		return We.parse(e);
	}
	async submit(e, t) {
		let n = Ze(t), r = Qe(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(n.output_mime_type)) throw N();
		let a = [{
			type: "text",
			text: n.negative_prompt === void 0 ? n.prompt : `${n.prompt}\n\nAvoid: ${n.negative_prompt}`
		}], o = 0;
		for (let t of n.reference_asset_ids) {
			let n = await e.assets.read(t, e.signal);
			if (n.asset_id !== t) throw N();
			let i = n.bytes.byteLength;
			if (i > r.max_input_asset_bytes || i > r.max_input_asset_bytes - o) throw N();
			o += i, a.push({
				type: "image",
				mime_type: n.media_type,
				data: k(n.bytes)
			});
		}
		let s = D(r.max_input_asset_bytes), c = new TextEncoder().encode(JSON.stringify({
			model: n.model_id,
			input: a,
			response_format: {
				type: "image",
				mime_type: n.output_mime_type,
				aspect_ratio: n.aspect_ratio,
				image_size: n.image_size
			}
		})), l = [], u = 0;
		for (let t = 0; t < n.output_count; t += 1) {
			let t = await L(n, async (t, n) => {
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
				return Xe(e, t.request_id, n, a, i, this.#e), Ye(a, this.#e), a;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			});
			if (t.body.byteLength > r.max_response_bytes - u) throw M();
			let i;
			try {
				i = Ge.parse($e(t.body));
			} catch {
				throw M();
			}
			if (i.status === "failed") throw i.error?.code === "SAFETY" ? new C({
				code: "content_blocked",
				retryable: !1
			}) : new C({
				code: "provider_unavailable",
				retryable: !1
			});
			if (i.status !== "completed") throw M();
			let a = i.steps.flatMap((e) => e.type === "model_output" ? (e.content ?? []).filter((e) => e.type === "image" && typeof e.mime_type == "string" && typeof e.data == "string") : []);
			if (a.length !== 1) throw M();
			let o = a[0];
			if (o === void 0 || o.mime_type !== n.output_mime_type || o.data === void 0) throw M();
			let d = O(o.data, r.max_response_bytes - u);
			u += d.byteLength;
			let f = A(d, void 0, void 0, r.output_mime_type_allowlist);
			if (f.asset.media_type !== n.output_mime_type) throw M();
			l.push(f);
		}
		return {
			state: "completed",
			result: i.parse({
				request_id: n.request_id,
				provider_id: "google_image",
				assets: l.map(({ asset: e }) => e)
			}),
			output_assets: l
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw N();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function Ye(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	let n = I(e.headers["retry-after"] ?? null, t.now());
	throw new C(w(e.status, {
		recoverable: qe.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function Xe(e, t, n, r, i, a) {
	e.log.write(T({
		provider_id: "google_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Ze(e) {
	let t = r.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function Qe(e) {
	let t = We.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function $e(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_prompt_presets.ts
var et = {
	heavy: "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]",
	light: "lowres, jpeg artifacts, worst quality, watermark, blurry, very displeasing",
	human_focus: "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], bad anatomy, bad hands, @_@, mismatched pupils, heart-shaped pupils, glowing eyes",
	none: "lowres"
}, tt = {
	heavy: "{{worst quality}}, [displeasing], {unusual pupils}, guide lines, {{unfinished}}, {bad}, url, artist name, {{tall image}}, mosaic, {sketch page}, comic panel, impact (font), [dated], {logo}, ych, {what}, {where is your god now}, {distorted text}, repeated text, {floating head}, {1994}, {widescreen}, absolutely everyone, sequence, {compression artifacts}, hard translated, {cropped}, {commissioner name}, unknown text, high contrast",
	light: "{worst quality}, guide lines, unfinished, bad, url, tall image, widescreen, compression artifacts, unknown text",
	none: "lowres"
}, nt = {
	heavy: "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, logo, dated, signature, multiple views, gigantic breasts, white blank page, blank page",
	light: "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, logo, dated, signature, white blank page, blank page",
	none: ""
}, rt = {
	heavy: "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, white blank page, blank page",
	light: "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, white blank page, blank page",
	none: ""
}, it = {
	heavy: "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, negative space, blank page",
	light: "blurry, lowres, upscaled, artistic error, scan artifacts, jpeg artifacts, logo, too many watermarks, negative space, blank page",
	human_focus: "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, bad anatomy, bad hands, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, @_@, mismatched pupils, glowing eyes, negative space, blank page",
	none: ""
}, at = "{worst quality}, distracting watermark, unfinished, bad quality, {widescreen}, upscale, {sequence}, {{grandfathered content}}, blurred foreground, chromatic aberration, sketch, everyone, [sketch background], simple, [flat colors], ych (character), outline, multiple scenes, [[horror (theme)]], comic", J = "lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page", ot = {
	heavy: J,
	light: "lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page",
	furry_focus: at,
	human_focus: `${J}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
	none: ""
}, st = {
	heavy: J,
	light: "lowres, bad hands, bad anatomy, artistic error, sepia, white haze, worst quality, very displeasing, jpeg artifacts, 0::ai-generated::",
	furry_focus: at,
	human_focus: `${J}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
	none: ""
}, ct = {
	v3: {
		quality: { standard: "best quality, amazing quality, very aesthetic, absurdres" },
		undesired_content: et
	},
	furry_v3: {
		quality: { standard: "{best quality}, {amazing quality}" },
		undesired_content: tt
	},
	v4_curated: {
		quality: { standard: "rating:general, best quality, very aesthetic, absurdres" },
		undesired_content: nt
	},
	v4_full: {
		quality: { standard: "no text, best quality, very aesthetic, absurdres" },
		undesired_content: rt
	},
	v4_5_curated: {
		quality: { standard: "very aesthetic, masterpiece, no text, -0.8::feet::, rating:general" },
		undesired_content: it
	},
	v4_5_full: {
		quality: { standard: "very aesthetic, masterpiece, no text" },
		undesired_content: ot
	},
	v5: {
		quality: {
			standard: "very aesthetic, masterpiece, no text",
			light: "very aesthetic, amazing quality, no text"
		},
		undesired_content: st
	}
}, lt = "nai-diffusion-5-curated", ut = {
	heavy: "heavy",
	light: "light",
	human_focus: "humanFocus",
	furry_focus: "furryFocus",
	none: "none"
}, dt = [
	.1,
	.3,
	.5,
	.7,
	.9
], Y = {
	x: .5,
	y: .5
}, ft = 63232, pt = 4294967295, mt = {
	character: "character",
	style: "style",
	costume: "costume",
	character_and_style: "character&style"
};
function ht(e, t) {
	switch (e.action) {
		case "upscale": return {
			route: "/ai/upscale",
			body: {
				image: k(X(t, e.image_asset_id).bytes),
				model: lt,
				declared_blur_sigma: 0
			}
		};
		case "augment": return {
			route: "/ai/augment-image",
			body: {
				req_type: e.tool,
				use_new_shared_trial: !0,
				width: e.width,
				height: e.height,
				image: k(X(t, e.image_asset_id).bytes),
				...gt(e)
			}
		};
		case "generate":
		case "img2img":
		case "infill": return {
			route: "/ai/generate-image",
			body: vt(e, t)
		};
	}
}
function gt(e) {
	return e.tool === "emotion" ? {
		prompt: `${e.emotion ?? "neutral"};;${e.tool_prompt ?? ""}`,
		defry: e.defry ?? 0
	} : e.tool === "colorize" ? {
		prompt: e.tool_prompt ?? "",
		defry: e.defry ?? 0
	} : {};
}
function _t(e) {
	let t = S(e);
	if (t === null) throw N();
	return t.profile;
}
function vt(e, t) {
	let n = _t(e.model_id), r = e.action === "infill" ? n.inpainting_model_id ?? e.model_id : e.model_id;
	if (e.action === "infill" && n.inpainting_model_id === null || e.action === "img2img" && !n.img2img) throw N();
	let i = e.seed ?? 0, a = n.fixed_settings, o = yt(n, a?.sampler ?? e.sampler), s = a?.undesired_content_preset ?? e.undesired_content_preset, c = St(n, e.prompt, e.quality_preset), l = Ct(n, e.negative_prompt ?? "", s, e.prompt), u = xt(n, o, e.noise_schedule), d = {
		params_version: 4,
		width: e.width,
		height: e.height,
		scale: e.scale,
		sampler: o,
		steps: a?.steps ?? e.steps,
		n_samples: e.output_count,
		seed: i,
		ucPresetId: ut[s],
		qualityPresetId: e.quality_preset,
		negative_prompt: l,
		legacy: !1,
		legacy_v3_extend: !1,
		add_original_image: !0,
		image_format: "png",
		...n.cfg_rescale ? { cfg_rescale: e.cfg_rescale } : {},
		...u === null ? {} : { noise_schedule: u },
		...o === "k_euler_ancestral" && u !== null && u !== "native" ? {
			deliberate_euler_ancestral_bug: !1,
			prefer_brownian: !0
		} : {},
		...n.variety_sigma === null ? {} : { skip_cfg_above_sigma: e.variety_plus ? wt(n, e) : null },
		...n.smea ? {
			sm: e.action !== "img2img" && e.smea,
			sm_dyn: e.action !== "img2img" && e.smea && e.dyn
		} : { dynamic_thresholding: !1 },
		...Dt(n, c, l, e.characters ?? []),
		...kt(n, e, t),
		...At(n, e, t),
		...jt(e, t, i)
	};
	return {
		input: c,
		model: r,
		action: e.action,
		parameters: d,
		use_new_shared_trial: !0
	};
}
function yt(e, t) {
	return e.family !== "v3" && t === "ddim_v3" ? "k_euler_ancestral" : t;
}
function bt(e) {
	switch (e) {
		case "k_dpmpp_2m": return "exponential";
		case "ddim_v3": return "native";
		case "k_euler":
		case "k_euler_ancestral":
		case "k_dpmpp_sde":
		case "k_dpmpp_2s_ancestral":
		case "k_dpmpp_2m_sde": return "karras";
	}
}
function xt(e, t, n) {
	if (t === "ddim_v3") return null;
	switch (e.noise_schedule) {
		case "fixed_karras": return "karras";
		case "no_native": return n === "native" ? bt(t) : n;
		case "selectable": return n;
	}
}
function St(e, t, n) {
	let r = n === "none" ? void 0 : ct[e.prompt_presets].quality[n];
	return r === void 0 || r === "" ? t : t === "" ? r : `${t}, ${r}`;
}
function Ct(e, t, n, r) {
	let i = ct[e.prompt_presets].undesired_content[n] ?? "", a;
	if (e.family === "v3") {
		let e = n === "none" ? "" : i;
		a = t === "" ? i : e === "" ? t : `${e}, ${t}`;
	} else a = i === "" ? t : t === "" ? i : `${i}, ${t}`;
	return e.nsfw_negative_prefix && n !== "none" && i !== "" && !r.toLowerCase().includes("nsfw") ? a === "" ? "nsfw" : `nsfw, ${a}` : a;
}
function wt(e, t) {
	let n = 4 * Math.floor(t.width / 8) * Math.floor(t.height / 8);
	return (e.variety_sigma ?? 0) * Math.sqrt(n / ft);
}
function Tt(e) {
	return dt.reduce((t, n) => Math.abs(n - e) < Math.abs(t - e) ? n : t);
}
function Et(e, t) {
	return t.center === void 0 ? Y : e.character_positions === "grid" ? {
		x: Tt(t.center.x),
		y: Tt(t.center.y)
	} : t.center;
}
function Dt(e, t, n, r) {
	if (e.family === "v3") {
		if (r.length > 0) throw N();
		return {};
	}
	if (r.length > e.max_characters) throw N();
	let i = r.map((t) => Et(e, t)), a = e.character_positions !== "unsupported" && r.some((e) => e.center !== void 0);
	return {
		v4_prompt: {
			caption: {
				base_caption: t,
				char_captions: r.map((e, t) => ({
					char_caption: e.prompt,
					centers: [i[t] ?? Y]
				}))
			},
			use_coords: a,
			use_order: !0
		},
		v4_negative_prompt: {
			caption: {
				base_caption: n,
				char_captions: r.map((e, t) => ({
					char_caption: e.negative_prompt ?? "",
					centers: [i[t] ?? Y]
				}))
			},
			legacy_uc: e.legacy_uc
		},
		characterPrompts: r.map((e, t) => ({
			prompt: e.prompt,
			uc: e.negative_prompt ?? "",
			center: i[t] ?? Y,
			enabled: !0
		}))
	};
}
function Ot(e) {
	if (e.length <= 1) return e;
	let t = e.reduce((e, t) => e + Math.abs(t), 0);
	return t > 1 ? e.map((e) => e / t) : e;
}
function kt(e, t, n) {
	let r = t.vibe_references ?? [];
	if (r.length === 0 || !b(t)) return {};
	if (e.vibe_transfer === "unsupported") throw N();
	let i = r.map((e) => e.strength), a = t.normalize_vibe_strengths === !1 ? i : Ot(i);
	return e.vibe_transfer === "encoded" ? {
		reference_image_multiple: r.map((e) => {
			if (e.encoding === void 0) throw N();
			return e.encoding;
		}),
		reference_strength_multiple: a
	} : {
		reference_image_multiple: r.map((e) => k(X(n, e.asset_id).bytes)),
		reference_strength_multiple: a,
		reference_information_extracted_multiple: r.map((e) => e.information_extracted)
	};
}
function At(e, t, n) {
	let r = t.character_references ?? [];
	if (r.length === 0) return {};
	if (!e.character_reference) throw N();
	return {
		director_reference_images: r.map((e) => k(X(n, e.asset_id).bytes)),
		director_reference_descriptions: r.map((e) => ({
			caption: {
				base_caption: mt[e.description],
				char_captions: []
			},
			legacy_uc: !1
		})),
		director_reference_information_extracted: r.map((e) => e.information_extracted),
		director_reference_strength_values: r.map((e) => e.strength),
		director_reference_secondary_strength_values: r.map((e) => 1 - e.fidelity)
	};
}
function jt(e, t, n) {
	switch (e.action) {
		case "generate": return {};
		case "img2img": return {
			image: k(X(t, e.image_asset_id).bytes),
			strength: e.strength,
			noise: e.noise,
			extra_noise_seed: n === 0 ? pt : n - 1,
			color_correct: !1
		};
		case "infill": return {
			image: k(X(t, e.image_asset_id).bytes),
			mask: k(X(t, e.mask_asset_id).bytes),
			inpaintImg2ImgStrength: e.inpaint_strength,
			...e.inpaint_strength === 1 ? {} : { img2img: {
				strength: e.inpaint_strength,
				color_correct: !0
			} }
		};
	}
}
function X(e, t) {
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw N();
	return n;
}
function Mt(e) {
	switch (e.action) {
		case "upscale":
		case "augment": return [e.image_asset_id];
		case "generate":
		case "img2img":
		case "infill": {
			let t = S(e.model_id)?.profile?.vibe_transfer === "raw_image" && b(e) ? (e.vibe_references ?? []).map((e) => e.asset_id) : [], n = (e.character_references ?? []).map((e) => e.asset_id), r = e.action === "img2img" ? [e.image_asset_id] : e.action === "infill" ? [e.image_asset_id, e.mask_asset_id] : [];
			return [.../* @__PURE__ */ new Set([
				...r,
				...t,
				...n
			])];
		}
	}
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_response.ts
var Nt = l({ images: f(l({
	image: v(),
	index: d().int().nonnegative(),
	seed: d().int().nonnegative()
})).min(1).max(4) });
async function Pt(e, t, n, r, a, o = ["image/png", "image/webp"]) {
	try {
		if (e.byteLength === 0 || e.byteLength > r) throw M();
		let s = t.toLowerCase(), c;
		if (s.startsWith("application/json")) c = Ft(e, r);
		else if (s.startsWith("application/zip") || s.startsWith("application/x-zip-compressed") || s.startsWith("application/octet-stream") || s.startsWith("binary/octet-stream")) c = { images: await It(e, r, a) };
		else if (s.startsWith("multipart/")) c = { images: zt(e, t, r, a) };
		else throw M();
		if (c.images.length !== n.output_count) throw M();
		let l = c.images.map((e) => A(e, n.width, n.height, o));
		return {
			result: i.parse(j({
				request_id: n.request_id,
				provider_id: "novelai",
				assets: l.map(({ asset: e }) => e)
			}, c.seed ?? n.seed)),
			output_assets: l
		};
	} catch (e) {
		throw e instanceof C ? e : M();
	}
}
function Ft(e, t) {
	let n = new TextDecoder("utf-8", { fatal: !0 }).decode(e), r = Nt.parse(JSON.parse(n)).images;
	if (r.sort((e, t) => e.index - t.index), r.some((e, t) => e.index !== t)) throw M();
	let i = 0, a = r.map((e) => {
		let n = O(e.image, t - i);
		return i += n.byteLength, n;
	}), o = r[0]?.seed;
	return o === void 0 ? { images: a } : {
		images: a,
		seed: o
	};
}
async function It(e, t, n) {
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = Lt(r), a = r.getUint16(i + 4, !0), o = r.getUint16(i + 6, !0), s = r.getUint16(i + 8, !0), c = r.getUint16(i + 10, !0), l = r.getUint32(i + 12, !0), u = r.getUint32(i + 16, !0);
	if (a !== 0 || o !== 0 || s !== c || c === 0 || c > n || u + l !== i) throw M();
	let d = new TextDecoder("utf-8", { fatal: !0 }), f = [], p = /* @__PURE__ */ new Set(), m = u, h = 0;
	for (let n = 0; n < c; n += 1) {
		if (Z(e, m, 46), r.getUint32(m, !0) !== 33639248) throw M();
		let n = r.getUint16(m + 8, !0), i = r.getUint16(m + 10, !0), a = r.getUint32(m + 16, !0), o = r.getUint32(m + 20, !0), s = r.getUint32(m + 24, !0), c = r.getUint16(m + 28, !0), l = r.getUint16(m + 30, !0), g = r.getUint16(m + 32, !0), _ = r.getUint16(m + 34, !0), v = r.getUint32(m + 42, !0);
		if (p.has(v)) throw M();
		p.add(v);
		let y = 46 + c + l + g;
		if (Z(e, m, y), n & 1 || _ !== 0 || i !== 0 && i !== 8 || s === 0 || s > t - h) throw M();
		let b = d.decode(e.subarray(m + 46, m + 46 + c));
		if (Vt(b), Z(e, v, 30), r.getUint32(v, !0) !== 67324752) throw M();
		let ee = r.getUint16(v + 6, !0), te = r.getUint16(v + 8, !0), x = r.getUint16(v + 26, !0), S = r.getUint16(v + 28, !0), C = d.decode(e.subarray(v + 30, v + 30 + x)), w = v + 30 + x + S;
		if (Z(e, w, o), ee !== n || te !== i || C !== b || w + o > u) throw M();
		let T = e.subarray(w, w + o), E = i === 0 ? Uint8Array.from(T) : await Rt(T, s, t - h);
		if (E.byteLength !== s || Ut(E) !== a) throw M();
		f.push({
			name: b,
			bytes: E
		}), h += E.byteLength, m += y;
	}
	if (m !== u + l) throw M();
	return f.sort((e, t) => e.name < t.name ? -1 : +(e.name > t.name)), f.map((e) => e.bytes);
}
function Lt(e) {
	let t = Math.max(0, e.byteLength - 65557);
	for (let n = e.byteLength - 22; n >= t; --n) if (e.getUint32(n, !0) === 101010256) {
		let t = e.getUint16(n + 20, !0);
		if (n + 22 + t === e.byteLength) return n;
	}
	throw M();
}
async function Rt(e, t, n) {
	let r = new Blob([Uint8Array.from(e)]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(), i = [], a = 0;
	for (;;) {
		let e = await r.read();
		if (e.done) break;
		if (a += e.value.byteLength, a > t || a > n) throw await r.cancel(), M();
		i.push(e.value);
	}
	return Ht(i, a);
}
function zt(e, t, n, r) {
	let i = /boundary=(?:"([^"]{1,70})"|([!#$%&'*+.^_`|~0-9A-Za-z-]{1,70}))/iu.exec(t), a = i?.[1] ?? i?.[2];
	if (a === void 0) throw M();
	let o = new TextEncoder(), s = o.encode(`--${a}`), c = o.encode(`\r\n--${a}`), l = Uint8Array.of(13, 10, 13, 10), u = Uint8Array.of(13, 10), d = Uint8Array.of(45, 45), f = new TextDecoder("utf-8", { fatal: !0 }), p = [], m = 0, h = 0;
	for (;;) {
		if (Q(e, s, h) !== h) throw M();
		if (h += s.length, $(e, d, h)) break;
		if (!$(e, u, h)) throw M();
		h += u.length;
		let t = Q(e, l, h);
		if (t < 0 || t - h > 8192) throw M();
		let i = Bt(f.decode(e.subarray(h, t))), a = t + l.length, o = Q(e, c, a);
		if (o < 0 || o === a) throw M();
		let g = Uint8Array.from(e.subarray(a, o));
		if (m += g.byteLength, p.length >= r || m > n || ![
			"image/png",
			"image/jpeg",
			"image/webp"
		].includes(i)) throw M();
		p.push(g), h = o + 2;
	}
	if (p.length === 0) throw M();
	return p;
}
function Bt(e) {
	for (let t of e.split("\r\n")) {
		let e = t.indexOf(":");
		if (e > 0 && t.slice(0, e).trim().toLowerCase() === "content-type") return t.slice(e + 1).trim().toLowerCase().split(";", 1)[0] ?? "";
	}
	throw M();
}
function Vt(e) {
	if (e.length === 0 || e.length > 255 || e.includes("/") || e.includes("\\") || e.includes("\0") || e === "." || e === ".." || !/\.(?:png|jpe?g|webp)$/iu.test(e)) throw M();
}
function Z(e, t, n) {
	if (!Number.isSafeInteger(t) || !Number.isSafeInteger(n) || t < 0 || n < 0 || t + n > e.byteLength) throw M();
}
function Q(e, t, n) {
	let r = e.length - t.length;
	for (let i = n; i <= r; i += 1) if ($(e, t, i)) return i;
	return -1;
}
function $(e, t, n) {
	if (n < 0 || n + t.length > e.length) return !1;
	for (let r = 0; r < t.length; r += 1) if (e[n + r] !== t[r]) return !1;
	return !0;
}
function Ht(e, t) {
	let n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function Ut(e) {
	let t = 4294967295;
	for (let n of e) {
		t ^= n;
		for (let e = 0; e < 8; e += 1) t = t >>> 1 ^ (t & 1 ? 3988292384 : 0);
	}
	return (t ^ 4294967295) >>> 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_adapter.ts
var Wt = u({
	profile_id: v().trim().min(1).max(128),
	provider_id: p("novelai"),
	model_allowlist: f(v().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: f(m(["image/png", "image/webp"])).min(1).max(2),
	max_response_bytes: d().int().positive().max(1e8),
	max_archive_entries: d().int().min(1).max(32),
	max_input_asset_bytes: d().int().positive().max(1e8).default(2e7)
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
}), Gt = { next: Math.random }, Kt = class {
	provider_id = "novelai";
	capabilities = /* @__PURE__ */ new Set([
		"text_to_image",
		"image_to_image",
		"reference_image",
		"seed"
	]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new F(), this.#t = e.random ?? Gt;
	}
	validate_profile(e) {
		return Wt.parse(e);
	}
	async submit(e, t) {
		let n = this.#n(qt(t)), r = Jt(e.profile);
		if (x(n) && !r.model_allowlist.includes(n.model_id)) throw N();
		let i = await Yt(e, n, r.max_input_asset_bytes), a = D(r.max_input_asset_bytes), o = await L(n, async (t, n) => {
			let o = ht(t, i), s = this.#e.now(), c = await e.transport.execute({
				route: o.route,
				method: "POST",
				body: new TextEncoder().encode(JSON.stringify(o.body)),
				max_request_bytes: a,
				content_type: "application/json",
				accept: "application/json, application/zip, multipart/mixed",
				max_response_bytes: r.max_response_bytes,
				signal: e.signal
			});
			if (e.log.write(T({
				provider_id: this.provider_id,
				request_id: t.request_id,
				attempt: n,
				status_code: c.status,
				duration_ms: Math.max(0, this.#e.now() - s),
				byte_count: c.body.byteLength
			})), c.status === 451) throw new C({
				code: "content_blocked",
				retryable: !1,
				status_code: 451
			});
			if (c.status < 200 || c.status >= 300) {
				let e = I(c.headers["retry-after"] ?? null, this.#e.now());
				throw new C(w(c.status, {
					recoverable: !1,
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
			...await Pt(o.body, o.headers["content-type"] ?? "", Xt(n), r.max_response_bytes, r.max_archive_entries, r.output_mime_type_allowlist)
		};
	}
	#n(e) {
		return !x(e) || e.seed !== void 0 ? e : {
			...e,
			seed: Math.floor(this.#t.next() * te)
		};
	}
	poll(e, t) {
		return Promise.reject(N());
	}
	cancel(e, t) {
		return Promise.reject(N());
	}
};
function qt(e) {
	let t = ee.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function Jt(e) {
	let t = Wt.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
async function Yt(e, t, n) {
	let r = Mt(t), i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw N();
		a += o, i.set(t, r);
	}
	return i;
}
function Xt(e) {
	return x(e) ? {
		request_id: e.request_id,
		output_count: e.output_count,
		width: e.width,
		height: e.height,
		...e.seed === void 0 ? {} : { seed: e.seed }
	} : {
		request_id: e.request_id,
		output_count: 1
	};
}
//#endregion
//#region ../../packages/providers/src/openai_image/openai_image_adapter.ts
var Zt = u({
	profile_id: v().trim().min(1).max(128),
	provider_id: p("openai_image"),
	model_allowlist: f(e.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: f(m([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	remote_asset_origin_allowlist: f(c()).max(32),
	max_response_bytes: d().int().positive().max(1e8),
	max_input_asset_bytes: d().int().positive().max(1e8)
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
}), Qt = u({
	created: d().int().nonnegative().optional(),
	data: f(s([u({ b64_json: v().min(1) }), u({ url: c() })])).min(1).max(4),
	usage: _().optional()
}), $t = { next: Math.random }, en = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), tn = class {
	provider_id = "openai_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new F(), this.#t = e.random ?? $t;
	}
	validate_profile(e) {
		return Zt.parse(e);
	}
	async submit(e, t) {
		let n = un(t), r = dn(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(mn(n.output_format))) throw N();
		let a = D(r.max_input_asset_bytes), o = n.mode === "generate" ? nn(n, e.signal, r.max_response_bytes, a) : await rn(e, n, r.max_input_asset_bytes, r.max_response_bytes, a), s = await L(n, async (t, n) => {
			let r = this.#e.now(), i = await e.transport.execute(o);
			return ln(e, t.request_id, n, i, r, this.#e), sn(i, this.#e), i;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		if (s.body.byteLength > r.max_response_bytes) throw M();
		let c;
		try {
			c = Qt.parse(fn(s.body));
		} catch {
			throw M();
		}
		if (c.data.length !== n.output_count) throw M();
		let l = pn(n.size), u = [], d = 0;
		for (let t of c.data) {
			let i;
			if (i = "b64_json" in t ? O(t.b64_json, r.max_response_bytes - d) : await on(e, t.url, r, r.max_response_bytes - d, n, this.#t, this.#e), d += i.byteLength, d > r.max_response_bytes) throw M();
			let a = A(i, l.width, l.height, r.output_mime_type_allowlist);
			if (a.asset.media_type !== mn(n.output_format)) throw M();
			u.push(a);
		}
		return {
			state: "completed",
			result: i.parse({
				request_id: n.request_id,
				provider_id: "openai_image",
				assets: u.map(({ asset: e }) => e)
			}),
			output_assets: u
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw N();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function nn(e, t, n, r) {
	let i = {
		model: e.model_id,
		prompt: an(e),
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
async function rn(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of t.input_asset_ids.entries()) {
		let t = await e.assets.read(i, e.signal);
		if (t.asset_id !== i) throw N();
		let s = t.bytes.byteLength;
		if (s > n || s > n - o) throw N();
		o += s, a.push({
			field_name: "image[]",
			file_name: `input_${String(r)}.${hn(t.media_type)}`,
			content_type: t.media_type,
			bytes: t.bytes
		});
	}
	if (t.mask_asset_id !== void 0) {
		let r = await e.assets.read(t.mask_asset_id, e.signal);
		if (r.asset_id !== t.mask_asset_id) throw N();
		let i = r.bytes.byteLength;
		if (i > n || i > n - o) throw N();
		a.push({
			field_name: "mask",
			file_name: `mask.${hn(r.media_type)}`,
			content_type: r.media_type,
			bytes: r.bytes
		});
	}
	let s = le({
		model: t.model_id,
		prompt: an(t),
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
function an(e) {
	return e.negative_prompt === void 0 ? e.prompt : `${e.prompt}\n\nAvoid: ${e.negative_prompt}`;
}
async function on(e, t, n, r, i, a, o) {
	let s;
	try {
		s = new URL(t);
	} catch {
		throw M();
	}
	let c = n.remote_asset_origin_allowlist.map((e) => new URL(e).origin), l = e.transport.fetch_remote_asset?.bind(e.transport);
	if (s.protocol !== "https:" || s.username.length > 0 || s.password.length > 0 || s.hash.length > 0 || !c.includes(s.origin) || l === void 0 || r <= 0) throw M();
	return R(i, async (t, n) => {
		let i = o.now(), a = await l({
			url: s.href,
			allowed_origins: c,
			max_bytes: r,
			signal: e.signal
		});
		if (ln(e, t.request_id, n, a, i, o), sn(a, o), a.body.byteLength > r) throw M();
		return a.body;
	}, {
		signal: e.signal,
		clock: o,
		random: a
	});
}
function sn(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (cn(e)) throw new C({
		code: "content_blocked",
		retryable: !1,
		status_code: e.status
	});
	let n = I(e.headers["retry-after"] ?? null, t.now());
	throw new C(w(e.status, {
		recoverable: en.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function cn(e) {
	if (e.status !== 400) return !1;
	try {
		let t = fn(e.body);
		return typeof t == "object" && !!t && "error" in t && typeof t.error == "object" && t.error !== null && "code" in t.error && t.error.code === "content_policy_violation";
	} catch {
		return !1;
	}
}
function ln(e, t, n, r, i, a) {
	e.log.write(T({
		provider_id: "openai_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function un(t) {
	let n = e.safeParse(t);
	if (!n.success) throw N();
	return n.data;
}
function dn(e) {
	let t = Zt.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function fn(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
function pn(e) {
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
function mn(e) {
	return e === "jpeg" ? "image/jpeg" : e === "webp" ? "image/webp" : "image/png";
}
function hn(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_mapping.ts
function gn(e, t) {
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
		image: k(bn(t, e.asset_id).bytes),
		module: e.module,
		model: e.model_id,
		weight: e.weight,
		guidance_start: e.guidance_start,
		guidance_end: e.guidance_end,
		...e.control_mode === void 0 ? {} : { control_mode: xn(e.control_mode) },
		...e.resize_mode === void 0 ? {} : { resize_mode: Sn(e.resize_mode) }
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
		..._n(e, t),
		override_settings: i,
		override_settings_restore_afterwards: !0,
		...Object.keys(a).length === 0 ? {} : { alwayson_scripts: a }
	};
}
function _n(e, t) {
	return e.mode === "img2img" ? yn(e, t) : vn(e);
}
function vn(e) {
	if (e.mode !== "txt2img") throw N();
	return e.hires_fix === void 0 ? {} : {
		enable_hr: !0,
		hr_scale: e.hires_fix.scale,
		hr_upscaler: e.hires_fix.upscaler_id,
		hr_second_pass_steps: e.hires_fix.steps,
		denoising_strength: e.hires_fix.denoise_strength
	};
}
function yn(e, t) {
	if (e.mode !== "img2img") return {};
	if (e.hires_fix !== void 0 || e.denoise_strength === void 0) throw N();
	return {
		init_images: [k(bn(t, e.input_asset_id).bytes)],
		denoising_strength: e.denoise_strength
	};
}
function bn(e, t) {
	if (t === void 0) throw N();
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw N();
	return n;
}
function xn(e) {
	return e === "prompt" ? "My prompt is more important" : e === "control" ? "ControlNet is more important" : "Balanced";
}
function Sn(e) {
	return e === "crop_and_resize" ? "Scale to Fit (Inner Fit)" : e === "resize_and_fill" ? "Envelope (Outer Fit)" : "Just Resize";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_response.ts
var Cn = l({
	images: f(v()),
	info: v()
}), wn = l({ seed: d().int().nonnegative().optional() });
function Tn(e, t, n, r = [
	"image/png",
	"image/jpeg",
	"image/webp"
]) {
	try {
		if (e.byteLength === 0 || e.byteLength > n) throw M();
		let a = new TextDecoder("utf-8", { fatal: !0 }).decode(e), o = Cn.parse(JSON.parse(a)), { images: s } = o, c = o.info;
		if (s.length !== t.output_count) throw M();
		let l = t.hires_fix === void 0 ? t.width : Math.round(t.width * t.hires_fix.scale), u = t.hires_fix === void 0 ? t.height : Math.round(t.height * t.hires_fix.scale), d = 0, f = s.map((e) => {
			if (typeof e != "string") throw M();
			let t = O(e, n - d);
			return d += t.byteLength, A(t, l, u, r);
		}), p = En(c);
		return {
			result: i.parse(j({
				request_id: t.request_id,
				provider_id: "sd_webui",
				assets: f.map(({ asset: e }) => e)
			}, p ?? t.seed)),
			output_assets: f
		};
	} catch (e) {
		throw e instanceof C ? e : M();
	}
}
function En(e) {
	return wn.parse(JSON.parse(e)).seed;
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_adapter.ts
var Dn = u({
	profile_id: v().trim().min(1).max(128),
	provider_id: p("sd_webui"),
	model_allowlist: f(v().trim().min(1).max(128)).min(1).max(128),
	vae_allowlist: f(v().trim().min(1).max(128)).max(128).default([]),
	adetailer_model_allowlist: f(v().trim().min(1).max(128)).max(128).default([]),
	controlnet_model_allowlist: f(v().trim().min(1).max(128)).max(128).default([]),
	output_mime_type_allowlist: f(m([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	max_response_bytes: d().int().positive().max(1e8),
	max_input_asset_bytes: d().int().positive().max(1e8).default(2e7)
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
}), On = { next: Math.random }, kn = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), An = class {
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
		this.#e = e.clock ?? new F(), this.#t = e.random ?? On;
	}
	validate_profile(e) {
		return Dn.parse(e);
	}
	async submit(e, t) {
		let n = jn(t), r = Mn(e.profile);
		Nn(r, n);
		let i = await Pn(e, n, r.max_input_asset_bytes), a = D(r.max_input_asset_bytes);
		return {
			state: "completed",
			...Tn((await L(n, async (t, n) => {
				let o = gn(t, i), s = t.mode === "txt2img" ? "/sdapi/v1/txt2img" : "/sdapi/v1/img2img", c = this.#e.now(), l = await e.transport.execute({
					route: s,
					method: "POST",
					body: new TextEncoder().encode(JSON.stringify(o)),
					max_request_bytes: a,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes,
					signal: e.signal
				});
				if (e.log.write(T({
					provider_id: this.provider_id,
					request_id: t.request_id,
					attempt: n,
					status_code: l.status,
					duration_ms: Math.max(0, this.#e.now() - c),
					byte_count: l.body.byteLength
				})), l.status === 451) throw new C({
					code: "content_blocked",
					retryable: !1,
					status_code: 451
				});
				if (l.status < 200 || l.status >= 300) {
					let e = I(l.headers["retry-after"] ?? null, this.#e.now());
					throw new C(w(l.status, {
						recoverable: kn.has(l.status),
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
		return Promise.reject(N());
	}
	async cancel(e, t) {
		if (t !== void 0 && t.state !== "pending") return;
		let n = Mn(e.profile), r = await e.transport.execute({
			route: "/sdapi/v1/interrupt",
			method: "POST",
			signal: e.signal,
			max_response_bytes: n.max_response_bytes
		});
		if (r.status < 200 || r.status >= 300) throw new C(w(r.status));
	}
};
function jn(e) {
	let t = a.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function Mn(e) {
	let t = Dn.safeParse(e);
	if (!t.success) throw N();
	return t.data;
}
function Nn(e, t) {
	if (!e.model_allowlist.includes(t.model_id) || t.vae_id !== void 0 && !e.vae_allowlist.includes(t.vae_id)) throw N();
	for (let n of t.adetailer ?? []) if (!e.adetailer_model_allowlist.includes(n.model_id)) throw N();
	for (let n of t.controlnet ?? []) if (!e.controlnet_model_allowlist.includes(n.model_id)) throw N();
}
async function Pn(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	t.input_asset_id !== void 0 && r.add(t.input_asset_id);
	for (let e of t.controlnet ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw N();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_client.ts
var Fn = 65536, In = 8388608;
function Ln(e) {
	if (e.status < 200 || e.status >= 300) throw new C(w(e.status, { recoverable: !1 }));
}
async function Rn(e, t) {
	let n = await e.execute({
		route: "/user/subscription",
		method: "GET",
		accept: "application/json",
		max_response_bytes: Fn,
		signal: t
	});
	Ln(n);
	try {
		return oe(JSON.parse(new TextDecoder().decode(n.body)));
	} catch {
		throw M();
	}
}
async function zn(e, t) {
	if (t.image.byteLength === 0) throw N();
	let n = new TextEncoder().encode(JSON.stringify({
		image: k(t.image),
		information_extracted: t.information_extracted,
		model: t.model_id
	})), r = await e.execute({
		route: "/ai/encode-vibe",
		method: "POST",
		body: n,
		max_request_bytes: t.max_request_bytes,
		content_type: "application/json",
		accept: "application/octet-stream",
		max_response_bytes: In,
		signal: t.signal
	});
	if (Ln(r), r.body.byteLength === 0) throw M();
	return k(r.body);
}
//#endregion
export { Fe as ComfyUiAdapter, Je as GoogleImageAdapter, Kt as NovelAiAdapter, tn as OpenAiImageAdapter, An as SdWebuiAdapter, zn as encode_novelai_vibe, Rn as fetch_novelai_account };
