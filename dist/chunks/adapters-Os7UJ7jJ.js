import { n as e, t } from "./sha2-BGNex9vj.js";
import { b as n, c as r, d as i, g as a, h as o, i as s, m as c, r as l, t as u, u as d, v as f, y as p } from "./schemas-BjkyCQYG.js";
import { t as m } from "./ids-pPJWL4BL.js";
import { n as h } from "./common-C4qkl4E0.js";
import { n as g } from "./comfyui-DKuS9w2U.js";
import { c as _, o as v, s as y, t as b } from "./provider-BmQsAS1d.js";
import { a as ee, c as x, s as S } from "./novelai-CAMu2SDf.js";
import { i as te } from "./novelai_models-CXz0Nwhv.js";
import { t as C } from "./novelai_prompt_presets-Cxcc0ebv.js";
import { a as w, c as T, i as E, l as D, o as ne, r as O } from "./provider_transport-DWhnpnLx.js";
//#region ../../packages/contracts/src/providers/novelai_account.ts
var re = d().int().nonnegative(), ie = i({
	tier: d().int().min(0).max(3),
	active: s(),
	expiresAt: d().int().nonnegative(),
	trainingStepsLeft: i({
		fixedTrainingStepsLeft: re,
		purchasedTrainingSteps: re
	}),
	usage: i({
		percent: d(),
		purchasedPercent: d(),
		isNegative: s(),
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
function k(e, t) {
	let n = e.indexOf(","), r = e.startsWith("data:") ? n < 0 ? "" : e.slice(n + 1) : e;
	if (r.length === 0 || r.length % 4 == 1 || !/^[A-Za-z0-9+/]*={0,2}$/u.test(r)) throw N();
	let i;
	try {
		i = atob(r);
	} catch {
		throw N();
	}
	if (i.length === 0 || i.length > t) throw N();
	return Uint8Array.from(i, (e) => e.charCodeAt(0));
}
function A(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function se(e) {
	if (e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10) return "image/png";
	if (e.length >= 4 && e[0] === 255 && e[1] === 216 && e[2] === 255) return "image/jpeg";
	if (e.length >= 12 && e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80) return "image/webp";
}
function ce(n, r, i, a) {
	let o = se(n);
	if (o === void 0 || !a.includes(o)) throw N();
	let s = t(n), c = e(s), l = s.slice(0, 16);
	l[6] = (l[6] ?? 0) & 15 | 80, l[8] = (l[8] ?? 0) & 63 | 128;
	let u = e(l);
	return {
		asset_id: m.parse(`${u.slice(0, 8)}-${u.slice(8, 12)}-${u.slice(12, 16)}-${u.slice(16, 20)}-${u.slice(20)}`),
		media_type: o,
		byte_length: n.byteLength,
		sha256: c,
		...r === void 0 ? {} : { width: r },
		...i === void 0 ? {} : { height: i }
	};
}
function j(e, t, n, r) {
	return {
		asset: ce(e, t, n, r),
		bytes: e
	};
}
function M(e, t) {
	return t === void 0 ? e : {
		...e,
		seed: t
	};
}
function N() {
	return new w({
		code: "malformed_response",
		retryable: !1
	});
}
function P() {
	return new w({
		code: "invalid_request",
		retryable: !1
	});
}
//#endregion
//#region ../../packages/providers/src/multipart.ts
function le(e, t) {
	for (let t of Object.keys(e)) F(t);
	for (let e of t) if (F(e.field_name), F(e.file_name), !/^[a-z]+\/[a-z0-9.+-]+$/u.test(e.content_type)) throw P();
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
	throw P();
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
function F(e) {
	if (e.length === 0 || e.length > 128 || /["\r\n]/u.test(e)) throw P();
}
//#endregion
//#region ../../packages/providers/src/retry_policy.ts
var fe = 2, pe = 250, me = 1e4, he = 12e4, I = class {
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
function L(e, t) {
	if (e === null) return;
	let n = e.trim();
	if (/^\d+$/u.test(n)) {
		let e = Number(n);
		return Number.isSafeInteger(e) && e <= (2 ** 53 - 1) / 1e3 ? e * 1e3 : void 0;
	}
	let r = Date.parse(n);
	if (Number.isFinite(r)) return Math.max(0, r - t);
}
function R(e, t, n) {
	return z(e, async (e, n) => {
		try {
			return await t(e, n);
		} catch (e) {
			throw e instanceof ne ? new w({
				code: "provider_unavailable",
				retryable: !1
			}) : e instanceof DOMException && e.name === "TimeoutError" ? new w({
				code: "timed_out",
				retryable: !1
			}) : e;
		}
	}, n);
}
async function z(e, t, n) {
	let r = _e(n.max_retries, fe), i = B(n.base_delay_ms, pe), a = B(n.max_delay_ms, me), o = B(n.max_retry_after_ms, he);
	for (let s = 0;; s += 1) {
		if (n.signal.aborted) throw new w({
			code: "cancelled",
			retryable: !1
		});
		try {
			return await t(structuredClone(e), s);
		} catch (e) {
			let t = T(e, n.signal);
			if (!t.provider_error.retryable || s >= r) throw t;
			let c = Math.max(Math.min(t.provider_error.retry_after_ms ?? 0, o), ge(s, i, a, n.random));
			try {
				await n.clock.sleep(c, n.signal);
			} catch {
				throw new w({
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
function B(e, t) {
	return e === void 0 || !Number.isFinite(e) || e <= 0 ? t : e;
}
//#endregion
//#region ../../packages/providers/src/comfyui/workflow_renderer.ts
var ve = 500, ye = 16, be = 1e5, xe = 1e6, Se = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), V = o({
	node_id: a().trim().min(1).max(128),
	property: a().trim().min(1).max(128)
}), Ce = V.extend({ value_type: u([
	"string",
	"number",
	"boolean"
]) }), we = o({
	workflow_id: m,
	workflow: p(),
	bindings: o({
		prompt: V,
		negative_prompt: V.optional(),
		seed: V.optional(),
		output_count: V,
		lora_model: V.optional(),
		placeholders: c(a().trim().min(1).max(128), Ce).default({}),
		input_assets: c(a().trim().min(1).max(128), V).default({})
	})
});
function Te(e) {
	try {
		let t = we.parse(e);
		if (!U(t.workflow)) throw P();
		let n = Object.entries(t.workflow);
		if (n.length === 0 || n.length > ve) throw P();
		ke(t.workflow);
		let r = JSON.stringify(t.workflow);
		if (new TextEncoder().encode(r).byteLength > xe) throw P();
		let i = {};
		for (let [e, t] of n) {
			if (!W(e) || !U(t)) throw P();
			let n = t.class_type, r = t.inputs;
			if (typeof n != "string" || n.length === 0 || n.length > 256 || !U(r)) throw P();
			i[e] = t;
		}
		return {
			workflow_id: t.workflow_id,
			workflow: i,
			bindings: t.bindings
		};
	} catch (e) {
		throw e instanceof w ? e : P();
	}
}
function Ee(e, t) {
	let n = structuredClone(e.workflow);
	if (H(n, e.bindings.prompt, t.prompt, "string"), H(n, e.bindings.output_count, t.output_count, "number"), t.negative_prompt !== void 0) {
		if (e.bindings.negative_prompt === void 0) throw P();
		H(n, e.bindings.negative_prompt, t.negative_prompt, "string");
	}
	if (t.seed !== void 0) {
		if (e.bindings.seed === void 0) throw P();
		H(n, e.bindings.seed, t.seed, "number");
	}
	for (let [r, i] of Object.entries(t.placeholder_values)) {
		let t = e.bindings.placeholders[r];
		if (t === void 0 || typeof i !== t.value_type) throw P();
		H(n, t, i, t.value_type);
	}
	for (let [r, i] of Object.entries(t.input_asset_names)) {
		let t = e.bindings.input_assets[r];
		if (t === void 0) throw P();
		H(n, t, i, "string");
	}
	return Oe(n, e.bindings.lora_model, t.loras ?? []), n;
}
var De = "tavern_canvas_lora_";
function Oe(e, t, n) {
	if (n.length === 0) return;
	if (t === void 0 || !W(t.node_id) || !W(t.property)) throw P();
	let r = e[t.node_id], i = r?.inputs[t.property];
	if (r === void 0 || !Array.isArray(i)) throw P();
	n.forEach((t, n) => {
		let r = `${De}${n.toString()}`;
		if (Object.hasOwn(e, r)) throw P();
		e[r] = {
			class_type: "LoraLoaderModelOnly",
			inputs: {
				model: i,
				lora_name: t.lora_name,
				strength_model: t.strength
			}
		}, i = [r, 0];
	}), r.inputs[t.property] = i;
}
function H(e, t, n, r) {
	if (!W(t.node_id) || !W(t.property) || typeof n !== r) throw P();
	let i = e[t.node_id];
	if (i === void 0 || !U(i.inputs) || !Object.hasOwn(i.inputs, t.property)) throw P();
	i.inputs[t.property] = n;
}
function ke(e) {
	let t = [{
		value: e,
		depth: 0
	}], n = 0;
	for (; t.length > 0;) {
		let e = t.pop();
		if (e === void 0) break;
		if (n += 1, n > be || e.depth > ye) throw P();
		if (e.value === null) continue;
		let r = typeof e.value;
		if (r !== "string" && r !== "boolean") {
			if (r === "number") {
				if (!Number.isFinite(e.value)) throw P();
				continue;
			}
			if (Array.isArray(e.value)) {
				for (let n of e.value) t.push({
					value: n,
					depth: e.depth + 1
				});
				continue;
			}
			if (!U(e.value)) throw P();
			for (let [n, r] of Object.entries(e.value)) {
				if (!W(n)) throw P();
				t.push({
					value: r,
					depth: e.depth + 1
				});
			}
		}
	}
}
function U(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function W(e) {
	return e.length > 0 && e.length <= 256 && !Se.has(e);
}
//#endregion
//#region ../../packages/providers/src/comfyui/comfyui_adapter.ts
var Ae = o({
	profile_id: a().trim().min(1).max(128),
	provider_id: r("comfyui"),
	model_allowlist: l(a().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: l(u([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	workflow_allowlist: l(m).min(1).max(256),
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
}), je = i({
	prompt_id: a().trim().min(1).max(128),
	number: d(),
	node_errors: c(a(), p())
}), Me = i({
	name: a().trim().min(1).max(512),
	subfolder: a().max(512),
	type: u([
		"input",
		"output",
		"temp"
	])
}), Ne = o({ request: o({
	request_id: g.shape.request_id,
	output_count: g.shape.output_count,
	output_node_ids: g.shape.output_node_ids,
	seed: g.shape.seed
}) }), Pe = { next: Math.random }, Fe = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Ie = 3e6, Le = class {
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
		this.#e = e.workflow_store, this.#t = e.clock ?? new I(), this.#n = e.random ?? Pe;
	}
	validate_profile(e) {
		return Ae.parse(e);
	}
	async submit(e, t) {
		let n = Ue(t), r = K(e.profile);
		if (!r.workflow_allowlist.includes(n.workflow_id)) throw P();
		let i;
		try {
			i = Te(await this.#e.load(n.workflow_id));
		} catch {
			throw P();
		}
		if (i.workflow_id !== n.workflow_id) throw P();
		ze(i, n, Object.fromEntries(Object.keys(n.input_asset_bindings).map((e) => [e, "validated-input.png"])));
		let a = await Re(e, n, r, this.#t, this.#n), o = ze(i, n, a), s = new TextEncoder().encode(JSON.stringify({ prompt: o }));
		if (s.byteLength > Ie) throw P();
		let c = await G(e, n, {
			route: "/prompt",
			method: "POST",
			body: s,
			max_request_bytes: Ie,
			content_type: "application/json",
			accept: "application/json",
			max_response_bytes: r.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (c.body.byteLength > r.max_response_bytes) throw N();
		let l;
		try {
			l = je.parse(q(c.body));
		} catch {
			throw N();
		}
		if (Object.keys(l.node_errors).length > 0) throw P();
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
		if (t.state !== "pending") throw P();
		let n = Ne.safeParse(t.continuation);
		if (!n.success) throw P();
		let r = n.data.request, i = K(e.profile), a = await G(e, r, {
			route: `/history/${encodeURIComponent(t.submission_id)}`,
			method: "GET",
			accept: "application/json",
			max_response_bytes: i.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (a.body.byteLength > i.max_response_bytes) throw N();
		let o = q(a.body);
		if (!J(o)) throw N();
		let s = o[t.submission_id];
		if (s === void 0) return {
			state: "pending",
			poll_after_ms: 250
		};
		if (!J(s)) throw N();
		let c = s.status;
		if (!J(c)) throw N();
		if (c.status_str === "error") return {
			state: "failed",
			error: {
				code: "provider_unavailable",
				retryable: !1
			}
		};
		if (c.completed !== !0) return {
			state: "pending",
			poll_after_ms: 250
		};
		let l = s.outputs;
		if (!J(l)) throw N();
		let u = Be(l, r.output_node_ids, r.output_count);
		if (u.length !== r.output_count) throw N();
		let d = [], f = 0;
		for (let t of u) {
			let n = await G(e, r, {
				route: `/view?${new URLSearchParams({
					filename: t.filename,
					subfolder: t.subfolder,
					type: t.type
				}).toString()}`,
				method: "GET",
				max_response_bytes: i.max_response_bytes - f,
				signal: e.signal
			}, this.#t, this.#n, !0);
			if (f += n.body.byteLength, f > i.max_response_bytes) throw N();
			d.push(j(n.body, void 0, void 0, i.output_mime_type_allowlist));
		}
		return {
			state: "completed",
			result: b.parse(M({
				request_id: r.request_id,
				provider_id: "comfyui",
				assets: d.map(({ asset: e }) => e)
			}, r.seed)),
			output_assets: d
		};
	}
	async cancel(e, t) {
		if (t === void 0) throw P();
		if (t.state !== "pending") return;
		let n = K(e.profile), r = { request_id: t.submission_id }, i = await G(e, r, {
			route: "/queue",
			method: "GET",
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !0);
		if (i.body.byteLength > n.max_response_bytes) throw N();
		let a = q(i.body);
		if (!J(a)) throw N();
		let o = We(a.queue_running, t.submission_id), s = We(a.queue_pending, t.submission_id);
		o ? await G(e, r, {
			route: "/interrupt",
			method: "POST",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1) : s && await G(e, r, {
			route: "/queue",
			method: "POST",
			body: new TextEncoder().encode(JSON.stringify({ delete: [t.submission_id] })),
			max_request_bytes: O(n.max_input_asset_bytes),
			content_type: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, this.#t, this.#n, !1);
	}
};
async function Re(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of Object.entries(t.input_asset_bindings)) {
		let t = await e.assets.read(i, e.signal), s = t.bytes.byteLength;
		if (t.asset_id !== i || s > n.max_input_asset_bytes || s > n.max_input_asset_bytes - o) throw P();
		o += s, a.push({
			binding_name: r,
			asset: t
		});
	}
	let s = O(n.max_input_asset_bytes), c = {};
	for (let { binding_name: o, asset: l } of a) {
		let a = le({
			type: "input",
			overwrite: "true"
		}, [{
			field_name: "image",
			file_name: `${l.asset_id}.${Ge(l.media_type)}`,
			content_type: l.media_type,
			bytes: l.bytes
		}]), u = await G(e, t, {
			route: "/upload/image",
			method: "POST",
			body: a.body,
			max_request_bytes: s,
			content_type: a.content_type,
			accept: "application/json",
			max_response_bytes: n.max_response_bytes,
			signal: e.signal
		}, r, i, !1);
		if (u.body.byteLength > n.max_response_bytes) throw N();
		let d;
		try {
			d = Me.parse(q(u.body));
		} catch {
			throw N();
		}
		c[o] = d.subfolder.length === 0 ? d.name : `${d.subfolder}/${d.name}`;
	}
	return c;
}
function ze(e, t, n) {
	return Ee(e, {
		prompt: t.prompt,
		...t.negative_prompt === void 0 ? {} : { negative_prompt: t.negative_prompt },
		...t.seed === void 0 ? {} : { seed: t.seed },
		output_count: t.output_count,
		placeholder_values: t.placeholder_values,
		input_asset_names: n,
		...t.loras === void 0 ? {} : { loras: t.loras }
	});
}
function Be(e, t, n) {
	let r = [];
	for (let i of t) {
		let t = e[i];
		if (!J(t) || !Array.isArray(t.images) || t.images.length > n - r.length) throw N();
		for (let e of t.images) {
			if (!J(e) || typeof e.filename != "string" || typeof e.subfolder != "string" || typeof e.type != "string" || e.filename.length === 0 || e.filename.length > 512 || e.subfolder.length > 512 || ![
				"input",
				"output",
				"temp"
			].includes(e.type)) throw N();
			r.push({
				filename: e.filename,
				subfolder: e.subfolder,
				type: e.type
			});
		}
	}
	return r;
}
async function G(e, t, n, r, i, a) {
	let o = async (t, i) => {
		let a = r.now(), o = await e.transport.execute(n);
		return He(e, t.request_id, i, o, a, r), Ve(o, r), o;
	};
	if (a) return (n.method === "GET" ? z : R)(t, o, {
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
function Ve(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (e.status === 451) throw new w({
		code: "content_blocked",
		retryable: !1,
		status_code: 451
	});
	let n = L(e.headers["retry-after"] ?? null, t.now());
	throw new w(D(e.status, {
		recoverable: Fe.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function He(e, t, n, r, i, a) {
	e.log.write(E({
		provider_id: "comfyui",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function Ue(e) {
	let t = g.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function K(e) {
	let t = Ae.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function q(e) {
	try {
		return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
	} catch {
		throw N();
	}
}
function J(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function We(e, t) {
	return Array.isArray(e) && e.some((e) => Array.isArray(e) && e[1] === t);
}
function Ge(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/google_image/google_image_adapter.ts
var Ke = o({
	profile_id: a().trim().min(1).max(128),
	provider_id: r("google_image"),
	model_allowlist: l(_.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: l(u([
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
}), qe = i({
	id: a().min(1),
	model: a().min(1),
	status: u([
		"completed",
		"failed",
		"in_progress"
	]),
	error: i({
		code: a().optional(),
		message: a().optional()
	}).optional(),
	steps: l(i({
		type: a(),
		content: l(i({
			type: a(),
			mime_type: a().optional(),
			data: a().optional()
		})).optional()
	}))
}), Je = { next: Math.random }, Ye = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Xe = class {
	provider_id = "google_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new I(), this.#t = e.random ?? Je;
	}
	validate_profile(e) {
		return Ke.parse(e);
	}
	async submit(e, t) {
		let n = $e(t), r = et(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(n.output_mime_type)) throw P();
		let i = [{
			type: "text",
			text: n.negative_prompt === void 0 ? n.prompt : `${n.prompt}\n\nAvoid: ${n.negative_prompt}`
		}], a = 0;
		for (let t of n.reference_asset_ids) {
			let n = await e.assets.read(t, e.signal);
			if (n.asset_id !== t) throw P();
			let o = n.bytes.byteLength;
			if (o > r.max_input_asset_bytes || o > r.max_input_asset_bytes - a) throw P();
			a += o, i.push({
				type: "image",
				mime_type: n.media_type,
				data: A(n.bytes)
			});
		}
		let o = O(r.max_input_asset_bytes), s = new TextEncoder().encode(JSON.stringify({
			model: n.model_id,
			input: i,
			response_format: {
				type: "image",
				mime_type: n.output_mime_type,
				aspect_ratio: n.aspect_ratio,
				image_size: n.image_size
			}
		})), c = [], l = 0;
		for (let t = 0; t < n.output_count; t += 1) {
			let t = await R(n, async (t, n) => {
				let i = this.#e.now(), a = await e.transport.execute({
					route: "/v1beta/interactions",
					method: "POST",
					body: s,
					max_request_bytes: o,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes - l,
					signal: e.signal
				});
				return Qe(e, t.request_id, n, a, i, this.#e), Ze(a, this.#e), a;
			}, {
				signal: e.signal,
				clock: this.#e,
				random: this.#t
			});
			if (t.body.byteLength > r.max_response_bytes - l) throw N();
			let i;
			try {
				i = qe.parse(tt(t.body));
			} catch {
				throw N();
			}
			if (i.status === "failed") throw i.error?.code === "SAFETY" ? new w({
				code: "content_blocked",
				retryable: !1
			}) : new w({
				code: "provider_unavailable",
				retryable: !1
			});
			if (i.status !== "completed") throw N();
			let a = i.steps.flatMap((e) => e.type === "model_output" ? (e.content ?? []).filter((e) => e.type === "image" && typeof e.mime_type == "string" && typeof e.data == "string") : []);
			if (a.length !== 1) throw N();
			let u = a[0];
			if (u === void 0 || u.mime_type !== n.output_mime_type || u.data === void 0) throw N();
			let d = k(u.data, r.max_response_bytes - l);
			l += d.byteLength;
			let f = j(d, void 0, void 0, r.output_mime_type_allowlist);
			if (f.asset.media_type !== n.output_mime_type) throw N();
			c.push(f);
		}
		return {
			state: "completed",
			result: b.parse({
				request_id: n.request_id,
				provider_id: "google_image",
				assets: c.map(({ asset: e }) => e)
			}),
			output_assets: c
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw P();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function Ze(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	let n = L(e.headers["retry-after"] ?? null, t.now());
	throw new w(D(e.status, {
		recoverable: Ye.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function Qe(e, t, n, r, i, a) {
	e.log.write(E({
		provider_id: "google_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function $e(e) {
	let t = _.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function et(e) {
	let t = Ke.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function tt(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_mapping.ts
var nt = "nai-diffusion-5-curated", rt = {
	heavy: "heavy",
	light: "light",
	human_focus: "humanFocus",
	furry_focus: "furryFocus",
	none: "none"
}, it = [
	.1,
	.3,
	.5,
	.7,
	.9
], Y = {
	x: .5,
	y: .5
}, at = 63232, ot = 4294967295, st = {
	character: "character",
	style: "style",
	costume: "costume",
	character_and_style: "character&style"
};
function ct(e, t) {
	switch (e.action) {
		case "upscale": return {
			route: "/ai/upscale",
			body: {
				image: A(X(t, e.image_asset_id).bytes),
				model: nt,
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
				image: A(X(t, e.image_asset_id).bytes),
				...lt(e)
			}
		};
		case "generate":
		case "img2img":
		case "infill": return {
			route: "/ai/generate-image",
			body: dt(e, t)
		};
	}
}
function lt(e) {
	return e.tool === "emotion" ? {
		prompt: `${e.emotion ?? "neutral"};;${e.tool_prompt ?? ""}`,
		defry: e.defry ?? 0
	} : e.tool === "colorize" ? {
		prompt: e.tool_prompt ?? "",
		defry: e.defry ?? 0
	} : {};
}
function ut(e) {
	let t = te(e);
	if (t === null) throw P();
	return t.profile;
}
function dt(e, t) {
	let n = ut(e.model_id), r = e.action === "infill" ? n.inpainting_model_id ?? e.model_id : e.model_id;
	if (e.action === "infill" && n.inpainting_model_id === null || e.action === "img2img" && !n.img2img) throw P();
	let i = e.seed ?? 0, a = n.fixed_settings, o = ft(n, a?.sampler ?? e.sampler), s = a?.undesired_content_preset ?? e.undesired_content_preset, c = ht(n, e.prompt, e.quality_preset), l = gt(n, e.negative_prompt ?? "", s, e.prompt), u = mt(n, o, e.noise_schedule), d = {
		params_version: 4,
		width: e.width,
		height: e.height,
		scale: e.scale,
		sampler: o,
		steps: a?.steps ?? e.steps,
		n_samples: e.output_count,
		seed: i,
		ucPresetId: rt[s],
		qualityPresetId: e.quality_preset,
		negative_prompt: l,
		legacy: !1,
		legacy_v3_extend: !1,
		add_original_image: e.action !== "infill",
		image_format: "png",
		...n.cfg_rescale ? { cfg_rescale: e.cfg_rescale } : {},
		...u === null ? {} : { noise_schedule: u },
		...o === "k_euler_ancestral" && u !== null && u !== "native" ? {
			deliberate_euler_ancestral_bug: !1,
			prefer_brownian: !0
		} : {},
		...n.variety_sigma === null ? {} : { skip_cfg_above_sigma: e.variety_plus ? _t(n, e) : null },
		...n.smea ? {
			sm: e.action !== "img2img" && e.smea,
			sm_dyn: e.action !== "img2img" && e.smea && e.dyn
		} : { dynamic_thresholding: !1 },
		...bt(n, c, l, e.characters ?? []),
		...St(n, e, t),
		...Ct(n, e, t),
		...wt(e, t, i)
	};
	return {
		input: c,
		model: r,
		action: e.action,
		parameters: d,
		use_new_shared_trial: !0
	};
}
function ft(e, t) {
	return e.family !== "v3" && t === "ddim_v3" ? "k_euler_ancestral" : t;
}
function pt(e) {
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
function mt(e, t, n) {
	if (t === "ddim_v3") return null;
	switch (e.noise_schedule) {
		case "fixed_karras": return "karras";
		case "no_native": return n === "native" ? pt(t) : n;
		case "selectable": return n;
	}
}
function ht(e, t, n) {
	let r = n === "none" ? void 0 : C[e.prompt_presets].quality[n];
	return r === void 0 || r === "" ? t : t === "" ? r : `${t}, ${r}`;
}
function gt(e, t, n, r) {
	let i = C[e.prompt_presets].undesired_content[n] ?? "", a;
	if (e.family === "v3") {
		let e = n === "none" ? "" : i;
		a = t === "" ? i : e === "" ? t : `${e}, ${t}`;
	} else a = i === "" ? t : t === "" ? i : `${i}, ${t}`;
	return e.nsfw_negative_prefix && n !== "none" && i !== "" && !r.toLowerCase().includes("nsfw") ? a === "" ? "nsfw" : `nsfw, ${a}` : a;
}
function _t(e, t) {
	let n = 4 * Math.floor(t.width / 8) * Math.floor(t.height / 8);
	return (e.variety_sigma ?? 0) * Math.sqrt(n / at);
}
function vt(e) {
	return it.reduce((t, n) => Math.abs(n - e) < Math.abs(t - e) ? n : t);
}
function yt(e, t) {
	return t.center === void 0 ? Y : e.character_positions === "grid" ? {
		x: vt(t.center.x),
		y: vt(t.center.y)
	} : t.center;
}
function bt(e, t, n, r) {
	if (e.family === "v3") {
		if (r.length > 0) throw P();
		return {};
	}
	if (r.length > e.max_characters) throw P();
	let i = r.map((t) => yt(e, t)), a = e.character_positions !== "unsupported" && r.some((e) => e.center !== void 0);
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
function xt(e) {
	if (e.length <= 1) return e;
	let t = e.reduce((e, t) => e + Math.abs(t), 0);
	return t > 1 ? e.map((e) => e / t) : e;
}
function St(e, t, n) {
	let r = t.vibe_references ?? [];
	if (r.length === 0 || !x(t)) return {};
	if (e.vibe_transfer === "unsupported") throw P();
	let i = r.map((e) => e.strength), a = t.normalize_vibe_strengths === !1 ? i : xt(i);
	return e.vibe_transfer === "encoded" ? {
		reference_image_multiple: r.map((e) => {
			if (e.encoding === void 0) throw P();
			return e.encoding;
		}),
		reference_strength_multiple: a
	} : {
		reference_image_multiple: r.map((e) => A(X(n, e.asset_id).bytes)),
		reference_strength_multiple: a,
		reference_information_extracted_multiple: r.map((e) => e.information_extracted)
	};
}
function Ct(e, t, n) {
	let r = t.character_references ?? [];
	if (r.length === 0) return {};
	if (!e.character_reference) throw P();
	return {
		director_reference_images: r.map((e) => A(X(n, e.asset_id).bytes)),
		director_reference_descriptions: r.map((e) => ({
			caption: {
				base_caption: st[e.description],
				char_captions: []
			},
			legacy_uc: !1
		})),
		director_reference_information_extracted: r.map((e) => e.information_extracted),
		director_reference_strength_values: r.map((e) => e.strength),
		director_reference_secondary_strength_values: r.map((e) => 1 - e.fidelity)
	};
}
function wt(e, t, n) {
	switch (e.action) {
		case "generate": return {};
		case "img2img": return {
			image: A(X(t, e.image_asset_id).bytes),
			strength: e.strength,
			noise: e.noise,
			extra_noise_seed: n === 0 ? ot : n - 1,
			color_correct: !1
		};
		case "infill": return {
			image: A(X(t, e.image_asset_id).bytes),
			mask: A(X(t, e.mask_asset_id).bytes),
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
	if (n === void 0 || n.asset_id !== t) throw P();
	return n;
}
function Tt(e) {
	switch (e.action) {
		case "upscale":
		case "augment": return [e.image_asset_id];
		case "generate":
		case "img2img":
		case "infill": {
			let t = te(e.model_id)?.profile?.vibe_transfer === "raw_image" && x(e) ? (e.vibe_references ?? []).map((e) => e.asset_id) : [], n = (e.character_references ?? []).map((e) => e.asset_id), r = e.action === "img2img" ? [e.image_asset_id] : e.action === "infill" ? [e.image_asset_id, e.mask_asset_id] : [];
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
var Et = i({ images: l(i({
	image: a(),
	index: d().int().nonnegative(),
	seed: d().int().nonnegative()
})).min(1).max(4) });
async function Dt(e, t, n, r, i, a = ["image/png", "image/webp"]) {
	try {
		if (e.byteLength === 0 || e.byteLength > r) throw N();
		let o = t.toLowerCase(), s;
		if (o.startsWith("application/json")) s = Ot(e, r);
		else if (o.startsWith("application/zip") || o.startsWith("application/x-zip-compressed") || o.startsWith("application/octet-stream") || o.startsWith("binary/octet-stream")) s = { images: await kt(e, r, i) };
		else if (o.startsWith("multipart/")) s = { images: Mt(e, t, r, i) };
		else throw N();
		if (s.images.length !== n.output_count) throw N();
		let c = s.images.map((e) => j(e, n.width, n.height, a));
		return {
			result: b.parse(M({
				request_id: n.request_id,
				provider_id: "novelai",
				assets: c.map(({ asset: e }) => e)
			}, s.seed ?? n.seed)),
			output_assets: c
		};
	} catch (e) {
		throw e instanceof w ? e : N();
	}
}
function Ot(e, t) {
	let n = new TextDecoder("utf-8", { fatal: !0 }).decode(e), r = Et.parse(JSON.parse(n)).images;
	if (r.sort((e, t) => e.index - t.index), r.some((e, t) => e.index !== t)) throw N();
	let i = 0, a = r.map((e) => {
		let n = k(e.image, t - i);
		return i += n.byteLength, n;
	}), o = r[0]?.seed;
	return o === void 0 ? { images: a } : {
		images: a,
		seed: o
	};
}
async function kt(e, t, n) {
	let r = new DataView(e.buffer, e.byteOffset, e.byteLength), i = At(r), a = r.getUint16(i + 4, !0), o = r.getUint16(i + 6, !0), s = r.getUint16(i + 8, !0), c = r.getUint16(i + 10, !0), l = r.getUint32(i + 12, !0), u = r.getUint32(i + 16, !0);
	if (a !== 0 || o !== 0 || s !== c || c === 0 || c > n || u + l !== i) throw N();
	let d = new TextDecoder("utf-8", { fatal: !0 }), f = [], p = /* @__PURE__ */ new Set(), m = u, h = 0;
	for (let n = 0; n < c; n += 1) {
		if (Z(e, m, 46), r.getUint32(m, !0) !== 33639248) throw N();
		let n = r.getUint16(m + 8, !0), i = r.getUint16(m + 10, !0), a = r.getUint32(m + 16, !0), o = r.getUint32(m + 20, !0), s = r.getUint32(m + 24, !0), c = r.getUint16(m + 28, !0), l = r.getUint16(m + 30, !0), g = r.getUint16(m + 32, !0), _ = r.getUint16(m + 34, !0), v = r.getUint32(m + 42, !0);
		if (p.has(v)) throw N();
		p.add(v);
		let y = 46 + c + l + g;
		if (Z(e, m, y), n & 1 || _ !== 0 || i !== 0 && i !== 8 || s === 0 || s > t - h) throw N();
		let b = d.decode(e.subarray(m + 46, m + 46 + c));
		if (Pt(b), Z(e, v, 30), r.getUint32(v, !0) !== 67324752) throw N();
		let ee = r.getUint16(v + 6, !0), x = r.getUint16(v + 8, !0), S = r.getUint16(v + 26, !0), te = r.getUint16(v + 28, !0), C = d.decode(e.subarray(v + 30, v + 30 + S)), w = v + 30 + S + te;
		if (Z(e, w, o), ee !== n || x !== i || C !== b || w + o > u) throw N();
		let T = e.subarray(w, w + o), E = i === 0 ? Uint8Array.from(T) : await jt(T, s, t - h);
		if (E.byteLength !== s || It(E) !== a) throw N();
		f.push({
			name: b,
			bytes: E
		}), h += E.byteLength, m += y;
	}
	if (m !== u + l) throw N();
	return f.sort((e, t) => e.name < t.name ? -1 : +(e.name > t.name)), f.map((e) => e.bytes);
}
function At(e) {
	let t = Math.max(0, e.byteLength - 65557);
	for (let n = e.byteLength - 22; n >= t; --n) if (e.getUint32(n, !0) === 101010256) {
		let t = e.getUint16(n + 20, !0);
		if (n + 22 + t === e.byteLength) return n;
	}
	throw N();
}
async function jt(e, t, n) {
	let r = new Blob([Uint8Array.from(e)]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(), i = [], a = 0;
	for (;;) {
		let e = await r.read();
		if (e.done) break;
		if (a += e.value.byteLength, a > t || a > n) throw await r.cancel(), N();
		i.push(e.value);
	}
	return Ft(i, a);
}
function Mt(e, t, n, r) {
	let i = /boundary=(?:"([^"]{1,70})"|([!#$%&'*+.^_`|~0-9A-Za-z-]{1,70}))/iu.exec(t), a = i?.[1] ?? i?.[2];
	if (a === void 0) throw N();
	let o = new TextEncoder(), s = o.encode(`--${a}`), c = o.encode(`\r\n--${a}`), l = Uint8Array.of(13, 10, 13, 10), u = Uint8Array.of(13, 10), d = Uint8Array.of(45, 45), f = new TextDecoder("utf-8", { fatal: !0 }), p = [], m = 0, h = 0;
	for (;;) {
		if (Q(e, s, h) !== h) throw N();
		if (h += s.length, $(e, d, h)) break;
		if (!$(e, u, h)) throw N();
		h += u.length;
		let t = Q(e, l, h);
		if (t < 0 || t - h > 8192) throw N();
		let i = Nt(f.decode(e.subarray(h, t))), a = t + l.length, o = Q(e, c, a);
		if (o < 0 || o === a) throw N();
		let g = Uint8Array.from(e.subarray(a, o));
		if (m += g.byteLength, p.length >= r || m > n || ![
			"image/png",
			"image/jpeg",
			"image/webp"
		].includes(i)) throw N();
		p.push(g), h = o + 2;
	}
	if (p.length === 0) throw N();
	return p;
}
function Nt(e) {
	for (let t of e.split("\r\n")) {
		let e = t.indexOf(":");
		if (e > 0 && t.slice(0, e).trim().toLowerCase() === "content-type") return t.slice(e + 1).trim().toLowerCase().split(";", 1)[0] ?? "";
	}
	throw N();
}
function Pt(e) {
	if (e.length === 0 || e.length > 255 || e.includes("/") || e.includes("\\") || e.includes("\0") || e === "." || e === ".." || !/\.(?:png|jpe?g|webp)$/iu.test(e)) throw N();
}
function Z(e, t, n) {
	if (!Number.isSafeInteger(t) || !Number.isSafeInteger(n) || t < 0 || n < 0 || t + n > e.byteLength) throw N();
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
function Ft(e, t) {
	let n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function It(e) {
	let t = 4294967295;
	for (let n of e) {
		t ^= n;
		for (let e = 0; e < 8; e += 1) t = t >>> 1 ^ (t & 1 ? 3988292384 : 0);
	}
	return (t ^ 4294967295) >>> 0;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_adapter.ts
var Lt = {
	max_retries: 6,
	base_delay_ms: 2e3,
	max_delay_ms: 15e3
}, Rt = o({
	profile_id: a().trim().min(1).max(128),
	provider_id: r("novelai"),
	model_allowlist: l(a().trim().min(1).max(128)).min(1).max(32),
	output_mime_type_allowlist: l(u(["image/png", "image/webp"])).min(1).max(2),
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
}), zt = { next: Math.random }, Bt = class {
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
		this.#e = e.clock ?? new I(), this.#t = e.random ?? zt;
	}
	validate_profile(e) {
		return Rt.parse(e);
	}
	async submit(e, t) {
		let n = this.#n(Vt(t)), r = Ht(e.profile);
		if (S(n) && !r.model_allowlist.includes(n.model_id)) throw P();
		let i = await Ut(e, n, r.max_input_asset_bytes), a = O(r.max_input_asset_bytes), o = await R(n, async (t, n) => {
			let o = ct(t, i), s = this.#e.now(), c = await e.transport.execute({
				route: o.route,
				method: "POST",
				body: new TextEncoder().encode(JSON.stringify(o.body)),
				max_request_bytes: a,
				content_type: "application/json",
				accept: "application/json, application/zip, multipart/mixed",
				max_response_bytes: r.max_response_bytes,
				signal: e.signal
			});
			if (e.log.write(E({
				provider_id: this.provider_id,
				request_id: t.request_id,
				attempt: n,
				status_code: c.status,
				duration_ms: Math.max(0, this.#e.now() - s),
				byte_count: c.body.byteLength
			})), c.status === 451) throw new w({
				code: "content_blocked",
				retryable: !1,
				status_code: 451
			});
			if (c.status < 200 || c.status >= 300) {
				let e = L(c.headers["retry-after"] ?? null, this.#e.now());
				throw new w(D(c.status, {
					recoverable: !1,
					...e === void 0 ? {} : { retry_after_ms: e }
				}));
			}
			return c;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t,
			...Lt
		});
		return {
			state: "completed",
			...await Dt(o.body, o.headers["content-type"] ?? "", Wt(n), r.max_response_bytes, r.max_archive_entries, r.output_mime_type_allowlist)
		};
	}
	#n(e) {
		return !S(e) || e.seed !== void 0 ? e : {
			...e,
			seed: Math.floor(this.#t.next() * h)
		};
	}
	poll(e, t) {
		return Promise.reject(P());
	}
	cancel(e, t) {
		return Promise.reject(P());
	}
};
function Vt(e) {
	let t = ee.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function Ht(e) {
	let t = Rt.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
async function Ut(e, t, n) {
	let r = Tt(t), i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw P();
		a += o, i.set(t, r);
	}
	return i;
}
function Wt(e) {
	return S(e) ? {
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
var Gt = o({
	profile_id: a().trim().min(1).max(128),
	provider_id: r("openai_image"),
	model_allowlist: l(y.shape.model_id).min(1).max(32),
	output_mime_type_allowlist: l(u([
		"image/png",
		"image/jpeg",
		"image/webp"
	])).min(1).max(3),
	remote_asset_origin_allowlist: l(n()).max(32),
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
}), Kt = o({
	created: d().int().nonnegative().optional(),
	data: l(f([o({ b64_json: a().min(1) }), o({ url: n() })])).min(1).max(4),
	usage: p().optional()
}), qt = { next: Math.random }, Jt = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), Yt = class {
	provider_id = "openai_image";
	capabilities = /* @__PURE__ */ new Set(["text_to_image", "reference_image"]);
	#e;
	#t;
	constructor(e = {}) {
		this.#e = e.clock ?? new I(), this.#t = e.random ?? qt;
	}
	validate_profile(e) {
		return Gt.parse(e);
	}
	async submit(e, t) {
		let n = rn(t), r = an(e.profile);
		if (!r.model_allowlist.includes(n.model_id) || !r.output_mime_type_allowlist.includes(cn(n.output_format))) throw P();
		let i = O(r.max_input_asset_bytes), a = n.mode === "generate" ? Xt(n, e.signal, r.max_response_bytes, i) : await Zt(e, n, r.max_input_asset_bytes, r.max_response_bytes, i), o = await R(n, async (t, n) => {
			let r = this.#e.now(), i = await e.transport.execute(a);
			return nn(e, t.request_id, n, i, r, this.#e), en(i, this.#e), i;
		}, {
			signal: e.signal,
			clock: this.#e,
			random: this.#t
		});
		if (o.body.byteLength > r.max_response_bytes) throw N();
		let s;
		try {
			s = Kt.parse(on(o.body));
		} catch {
			throw N();
		}
		if (s.data.length !== n.output_count) throw N();
		let c = sn(n.size), l = [], u = 0;
		for (let t of s.data) {
			let i;
			if (i = "b64_json" in t ? k(t.b64_json, r.max_response_bytes - u) : await $t(e, t.url, r, r.max_response_bytes - u, n, this.#t, this.#e), u += i.byteLength, u > r.max_response_bytes) throw N();
			let a = j(i, c.width, c.height, r.output_mime_type_allowlist);
			if (a.asset.media_type !== cn(n.output_format)) throw N();
			l.push(a);
		}
		return {
			state: "completed",
			result: b.parse({
				request_id: n.request_id,
				provider_id: "openai_image",
				assets: l.map(({ asset: e }) => e)
			}),
			output_assets: l
		};
	}
	poll(e, t) {
		if (t.state !== "completed") throw P();
		return Promise.resolve(t);
	}
	cancel(e, t) {
		return Promise.resolve();
	}
};
function Xt(e, t, n, r) {
	let i = {
		model: e.model_id,
		prompt: Qt(e),
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
async function Zt(e, t, n, r, i) {
	let a = [], o = 0;
	for (let [r, i] of t.input_asset_ids.entries()) {
		let t = await e.assets.read(i, e.signal);
		if (t.asset_id !== i) throw P();
		let s = t.bytes.byteLength;
		if (s > n || s > n - o) throw P();
		o += s, a.push({
			field_name: "image[]",
			file_name: `input_${String(r)}.${ln(t.media_type)}`,
			content_type: t.media_type,
			bytes: t.bytes
		});
	}
	if (t.mask_asset_id !== void 0) {
		let r = await e.assets.read(t.mask_asset_id, e.signal);
		if (r.asset_id !== t.mask_asset_id) throw P();
		let i = r.bytes.byteLength;
		if (i > n || i > n - o) throw P();
		a.push({
			field_name: "mask",
			file_name: `mask.${ln(r.media_type)}`,
			content_type: r.media_type,
			bytes: r.bytes
		});
	}
	let s = le({
		model: t.model_id,
		prompt: Qt(t),
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
function Qt(e) {
	return e.negative_prompt === void 0 ? e.prompt : `${e.prompt}\n\nAvoid: ${e.negative_prompt}`;
}
async function $t(e, t, n, r, i, a, o) {
	let s;
	try {
		s = new URL(t);
	} catch {
		throw N();
	}
	let c = n.remote_asset_origin_allowlist.map((e) => new URL(e).origin), l = e.transport.fetch_remote_asset?.bind(e.transport);
	if (s.protocol !== "https:" || s.username.length > 0 || s.password.length > 0 || s.hash.length > 0 || !c.includes(s.origin) || l === void 0 || r <= 0) throw N();
	return z(i, async (t, n) => {
		let i = o.now(), a = await l({
			url: s.href,
			allowed_origins: c,
			max_bytes: r,
			signal: e.signal
		});
		if (nn(e, t.request_id, n, a, i, o), en(a, o), a.body.byteLength > r) throw N();
		return a.body;
	}, {
		signal: e.signal,
		clock: o,
		random: a
	});
}
function en(e, t) {
	if (e.status >= 200 && e.status < 300) return;
	if (tn(e)) throw new w({
		code: "content_blocked",
		retryable: !1,
		status_code: e.status
	});
	let n = L(e.headers["retry-after"] ?? null, t.now());
	throw new w(D(e.status, {
		recoverable: Jt.has(e.status),
		...n === void 0 ? {} : { retry_after_ms: n }
	}));
}
function tn(e) {
	if (e.status !== 400) return !1;
	try {
		let t = on(e.body);
		return typeof t == "object" && !!t && "error" in t && typeof t.error == "object" && t.error !== null && "code" in t.error && t.error.code === "content_policy_violation";
	} catch {
		return !1;
	}
}
function nn(e, t, n, r, i, a) {
	e.log.write(E({
		provider_id: "openai_image",
		request_id: t,
		attempt: n,
		status_code: r.status,
		duration_ms: Math.max(0, a.now() - i),
		byte_count: r.body.byteLength
	}));
}
function rn(e) {
	let t = y.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function an(e) {
	let t = Gt.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function on(e) {
	return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(e));
}
function sn(e) {
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
function cn(e) {
	return e === "jpeg" ? "image/jpeg" : e === "webp" ? "image/webp" : "image/png";
}
function ln(e) {
	return e === "image/jpeg" ? "jpg" : e === "image/webp" ? "webp" : "png";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_mapping.ts
function un(e, t) {
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
		image: A(mn(t, e.asset_id).bytes),
		module: e.module,
		model: e.model_id,
		weight: e.weight,
		guidance_start: e.guidance_start,
		guidance_end: e.guidance_end,
		...e.control_mode === void 0 ? {} : { control_mode: hn(e.control_mode) },
		...e.resize_mode === void 0 ? {} : { resize_mode: gn(e.resize_mode) }
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
		...dn(e, t),
		override_settings: i,
		override_settings_restore_afterwards: !0,
		...Object.keys(a).length === 0 ? {} : { alwayson_scripts: a }
	};
}
function dn(e, t) {
	return e.mode === "img2img" ? pn(e, t) : fn(e);
}
function fn(e) {
	if (e.mode !== "txt2img") throw P();
	return e.hires_fix === void 0 ? {} : {
		enable_hr: !0,
		hr_scale: e.hires_fix.scale,
		hr_upscaler: e.hires_fix.upscaler_id,
		hr_second_pass_steps: e.hires_fix.steps,
		denoising_strength: e.hires_fix.denoise_strength
	};
}
function pn(e, t) {
	if (e.mode !== "img2img") return {};
	if (e.hires_fix !== void 0 || e.denoise_strength === void 0) throw P();
	return {
		init_images: [A(mn(t, e.input_asset_id).bytes)],
		denoising_strength: e.denoise_strength
	};
}
function mn(e, t) {
	if (t === void 0) throw P();
	let n = e.get(t);
	if (n === void 0 || n.asset_id !== t) throw P();
	return n;
}
function hn(e) {
	return e === "prompt" ? "My prompt is more important" : e === "control" ? "ControlNet is more important" : "Balanced";
}
function gn(e) {
	return e === "crop_and_resize" ? "Scale to Fit (Inner Fit)" : e === "resize_and_fill" ? "Envelope (Outer Fit)" : "Just Resize";
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_response.ts
var _n = i({
	images: l(a()),
	info: a()
}), vn = i({ seed: d().int().nonnegative().optional() });
function yn(e, t, n, r = [
	"image/png",
	"image/jpeg",
	"image/webp"
]) {
	try {
		if (e.byteLength === 0 || e.byteLength > n) throw N();
		let i = new TextDecoder("utf-8", { fatal: !0 }).decode(e), a = _n.parse(JSON.parse(i)), { images: o } = a, s = a.info;
		if (o.length !== t.output_count) throw N();
		let c = t.hires_fix === void 0 ? t.width : Math.round(t.width * t.hires_fix.scale), l = t.hires_fix === void 0 ? t.height : Math.round(t.height * t.hires_fix.scale), u = 0, d = o.map((e) => {
			if (typeof e != "string") throw N();
			let t = k(e, n - u);
			return u += t.byteLength, j(t, c, l, r);
		}), f = bn(s);
		return {
			result: b.parse(M({
				request_id: t.request_id,
				provider_id: "sd_webui",
				assets: d.map(({ asset: e }) => e)
			}, f ?? t.seed)),
			output_assets: d
		};
	} catch (e) {
		throw e instanceof w ? e : N();
	}
}
function bn(e) {
	return vn.parse(JSON.parse(e)).seed;
}
//#endregion
//#region ../../packages/providers/src/sd_webui/sd_webui_adapter.ts
var xn = o({
	profile_id: a().trim().min(1).max(128),
	provider_id: r("sd_webui"),
	model_allowlist: l(a().trim().min(1).max(128)).min(1).max(128),
	vae_allowlist: l(a().trim().min(1).max(128)).max(128).default([]),
	adetailer_model_allowlist: l(a().trim().min(1).max(128)).max(128).default([]),
	controlnet_model_allowlist: l(a().trim().min(1).max(128)).max(128).default([]),
	output_mime_type_allowlist: l(u([
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
}), Sn = { next: Math.random }, Cn = /* @__PURE__ */ new Set([
	500,
	502,
	503,
	504
]), wn = class {
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
		this.#e = e.clock ?? new I(), this.#t = e.random ?? Sn;
	}
	validate_profile(e) {
		return xn.parse(e);
	}
	async submit(e, t) {
		let n = Tn(t), r = En(e.profile);
		Dn(r, n);
		let i = await On(e, n, r.max_input_asset_bytes), a = O(r.max_input_asset_bytes);
		return {
			state: "completed",
			...yn((await R(n, async (t, n) => {
				let o = un(t, i), s = t.mode === "txt2img" ? "/sdapi/v1/txt2img" : "/sdapi/v1/img2img", c = this.#e.now(), l = await e.transport.execute({
					route: s,
					method: "POST",
					body: new TextEncoder().encode(JSON.stringify(o)),
					max_request_bytes: a,
					content_type: "application/json",
					accept: "application/json",
					max_response_bytes: r.max_response_bytes,
					signal: e.signal
				});
				if (e.log.write(E({
					provider_id: this.provider_id,
					request_id: t.request_id,
					attempt: n,
					status_code: l.status,
					duration_ms: Math.max(0, this.#e.now() - c),
					byte_count: l.body.byteLength
				})), l.status === 451) throw new w({
					code: "content_blocked",
					retryable: !1,
					status_code: 451
				});
				if (l.status < 200 || l.status >= 300) {
					let e = L(l.headers["retry-after"] ?? null, this.#e.now());
					throw new w(D(l.status, {
						recoverable: Cn.has(l.status),
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
		return Promise.reject(P());
	}
	async cancel(e, t) {
		if (t !== void 0 && t.state !== "pending") return;
		let n = En(e.profile), r = await e.transport.execute({
			route: "/sdapi/v1/interrupt",
			method: "POST",
			signal: e.signal,
			max_response_bytes: n.max_response_bytes
		});
		if (r.status < 200 || r.status >= 300) throw new w(D(r.status));
	}
};
function Tn(e) {
	let t = v.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function En(e) {
	let t = xn.safeParse(e);
	if (!t.success) throw P();
	return t.data;
}
function Dn(e, t) {
	if (!e.model_allowlist.includes(t.model_id) || t.vae_id !== void 0 && !e.vae_allowlist.includes(t.vae_id)) throw P();
	for (let n of t.adetailer ?? []) if (!e.adetailer_model_allowlist.includes(n.model_id)) throw P();
	for (let n of t.controlnet ?? []) if (!e.controlnet_model_allowlist.includes(n.model_id)) throw P();
}
async function On(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	t.input_asset_id !== void 0 && r.add(t.input_asset_id);
	for (let e of t.controlnet ?? []) r.add(e.asset_id);
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let t of r) {
		let r = await e.assets.read(t, e.signal), o = r.bytes.byteLength;
		if (r.asset_id !== t || o > n || o > n - a) throw P();
		a += o, i.set(t, r);
	}
	return i;
}
//#endregion
//#region ../../packages/providers/src/novelai/novelai_client.ts
var kn = 65536, An = 8388608;
function jn(e) {
	if (e.status < 200 || e.status >= 300) throw new w(D(e.status, { recoverable: !1 }));
}
async function Mn(e, t) {
	let n = await e.execute({
		route: "/user/subscription",
		method: "GET",
		accept: "application/json",
		max_response_bytes: kn,
		signal: t
	});
	jn(n);
	try {
		return oe(JSON.parse(new TextDecoder().decode(n.body)));
	} catch {
		throw N();
	}
}
async function Nn(e, t) {
	if (t.image.byteLength === 0) throw P();
	let n = new TextEncoder().encode(JSON.stringify({
		image: A(t.image),
		information_extracted: t.information_extracted,
		model: t.model_id
	})), r = await e.execute({
		route: "/ai/encode-vibe",
		method: "POST",
		body: n,
		max_request_bytes: t.max_request_bytes,
		content_type: "application/json",
		accept: "application/octet-stream",
		max_response_bytes: An,
		signal: t.signal
	});
	if (jn(r), r.body.byteLength === 0) throw N();
	return A(r.body);
}
//#endregion
export { Le as ComfyUiAdapter, Xe as GoogleImageAdapter, Bt as NovelAiAdapter, Yt as OpenAiImageAdapter, wn as SdWebuiAdapter, Nn as encode_novelai_vibe, Mn as fetch_novelai_account };
