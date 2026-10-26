import { C as e, T as t, b as n, f as r, g as i, i as a, l as o, m as s, o as c, s as l, t as u, u as d, x as f, y as p } from "./ids-CQF5rr2J.js";
import { i as m } from "./generation-Ck4v0g3Y.js";
import { a as h, c as g, l as _, n as v, s as y } from "./novelai-Dkv1N5Ct.js";
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
function b(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
function x(e, t, n = "") {
	let r = b(e), i = e?.length, a = t !== void 0;
	if (!r || a && i !== t) {
		let o = n && `"${n}" `, s = a ? ` of length ${t}` : "", c = r ? `length=${i}` : `type=${typeof e}`, l = o + "expected Uint8Array" + s + ", got " + c;
		throw r ? RangeError(l) : TypeError(l);
	}
	return e;
}
function S(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function C(e, t) {
	x(e, void 0, "digestInto() output");
	let n = t.outputLen;
	if (e.length < n) throw RangeError("\"digestInto() output\" expected to be of length >=" + n);
}
function w(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function T(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function E(e, t) {
	return e << 32 - t | e >>> t;
}
var D = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", O = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function k(e) {
	if (x(e), D) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += O[e[n]];
	return t;
}
function A(e) {
	if (typeof e != "string") throw TypeError("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function j(e, t = {}) {
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
var M = (e) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	e
]) });
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_md.js
function N(e, t, n) {
	return e & t ^ ~e & n;
}
function P(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var F = class {
	blockLen;
	outputLen;
	canXOF = !1;
	padOffset;
	isLE;
	buffer;
	view;
	finished = !1;
	length = 0;
	pos = 0;
	destroyed = !1;
	constructor(e, t, n, r) {
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = T(this.buffer);
	}
	update(e) {
		S(this), x(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = T(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		S(this), C(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, w(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		n.setBigUint64(r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = T(e), s = this.outputLen;
		if (s % 4) throw Error("_sha2: outputLen must be aligned to 32bit");
		let c = s / 4, l = this.get();
		if (c > l.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneInto(e) {
		e ||= new this.constructor(), e.set(...this.get());
		let { blockLen: t, buffer: n, length: r, finished: i, destroyed: a, pos: o } = this;
		return e.destroyed = a, e.finished = i, e.length = r, e.pos = o, r % t && e.buffer.set(n), e;
	}
	clone() {
		return this._cloneInto();
	}
}, I = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), L = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), R = /* @__PURE__ */ new Uint32Array(64), z = class extends F {
	constructor(e) {
		super(64, e, 8, !1);
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i, F: a, G: o, H: s } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s
		];
	}
	set(e, t, n, r, i, a, o, s) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = s | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) R[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = R[e - 15], n = R[e - 2], r = E(t, 7) ^ E(t, 18) ^ t >>> 3, i = E(n, 17) ^ E(n, 19) ^ n >>> 10;
			R[e] = i + R[e - 7] + r + R[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = E(o, 6) ^ E(o, 11) ^ E(o, 25), u = l + t + N(o, s, c) + L[e] + R[e] | 0, d = (E(n, 2) ^ E(n, 13) ^ E(n, 22)) + P(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		w(R);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), w(this.buffer);
	}
}, B = class extends z {
	A = I[0] | 0;
	B = I[1] | 0;
	C = I[2] | 0;
	D = I[3] | 0;
	E = I[4] | 0;
	F = I[5] | 0;
	G = I[6] | 0;
	H = I[7] | 0;
	constructor() {
		super(32);
	}
}, V = /* @__PURE__ */ j(() => new B(), /* @__PURE__ */ M(1)), H = e([
	f().max(4e3),
	i(),
	d()
]), U = p(g, H).check((e) => {
	Object.keys(e.value).length > 64 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "placeholder_values must contain at most 64 entries"
	});
}), W = p(g, u).check((e) => {
	Object.keys(e.value).length > 16 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "input_asset_bindings must contain at most 16 entries"
	});
}), G = n({
	provider_id: s("comfyui"),
	...h,
	workflow_id: u,
	placeholder_values: U,
	input_asset_bindings: W,
	output_node_ids: o(g).min(1).max(16),
	seed: _.optional()
}).check((e) => {
	new Set(e.value.output_node_ids).size !== e.value.output_node_ids.length && e.issues.push({
		code: "custom",
		input: e.value.output_node_ids,
		message: "output_node_ids must not contain duplicates",
		path: ["output_node_ids"]
	});
}), K = n({
	provider_id: s("google_image"),
	...h,
	model_id: l([
		"gemini-2.5-flash-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-image",
		"gemini-3.1-flash-image"
	]),
	reference_asset_ids: o(u).max(14),
	aspect_ratio: l([
		"1:1",
		"2:3",
		"3:2",
		"3:4",
		"4:3",
		"4:5",
		"5:4",
		"9:16",
		"16:9",
		"21:9"
	]),
	image_size: l([
		"1K",
		"2K",
		"4K"
	]),
	output_mime_type: l([
		"image/png",
		"image/jpeg",
		"image/webp"
	])
}), q = n({
	provider_id: s("openai_image"),
	...h,
	mode: l(["generate", "edit"]),
	model_id: l([
		"gpt-image-1",
		"gpt-image-1-mini",
		"gpt-image-1.5",
		"gpt-image-2",
		"gpt-image-2-2026-04-21",
		"chatgpt-image-latest"
	]),
	size: l([
		"auto",
		"1024x1024",
		"1536x1024",
		"1024x1536"
	]),
	quality: l([
		"auto",
		"low",
		"medium",
		"high"
	]),
	background: l([
		"auto",
		"opaque",
		"transparent"
	]),
	output_format: l([
		"png",
		"jpeg",
		"webp"
	]),
	compression: i().int().min(0).max(100).optional(),
	input_asset_ids: o(u).max(16),
	mask_asset_id: u.optional()
}).check((e) => {
	e.value.mode === "edit" && e.value.input_asset_ids.length === 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "edit mode requires at least one input asset",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.input_asset_ids.length > 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "generate mode does not accept input assets",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.mask_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.mask_asset_id,
		message: "generate mode does not accept a mask asset",
		path: ["mask_asset_id"]
	}), e.value.output_format === "png" && e.value.compression !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.compression,
		message: "compression applies only to jpeg and webp output",
		path: ["compression"]
	});
}), J = n({
	scale: i().min(1).max(4),
	upscaler_id: g,
	steps: i().int().min(1).max(150),
	denoise_strength: i().min(0).max(1)
}), Y = n({
	model_id: g,
	prompt: f().trim().max(4e3).optional(),
	negative_prompt: f().trim().max(4e3).optional(),
	confidence: i().min(0).max(1).optional(),
	mask_blur: i().int().min(0).max(64).optional(),
	denoise_strength: i().min(0).max(1).optional()
}), X = n({
	asset_id: u,
	model_id: g,
	module: g,
	weight: i().min(0).max(2),
	guidance_start: i().min(0).max(1),
	guidance_end: i().min(0).max(1),
	control_mode: l([
		"balanced",
		"prompt",
		"control"
	]).optional(),
	resize_mode: l([
		"resize",
		"crop_and_resize",
		"resize_and_fill"
	]).optional()
}).check((e) => {
	e.value.guidance_start > e.value.guidance_end && e.issues.push({
		code: "custom",
		input: e.value,
		message: "guidance_start must not exceed guidance_end",
		path: ["guidance_start"]
	});
}), Z = n({
	lora_id: g,
	weight: i().min(-2).max(2)
}), Q = n({
	provider_id: s("sd_webui"),
	...h,
	mode: l(["txt2img", "img2img"]),
	model_id: g,
	vae_id: g.optional(),
	sampler: g,
	scheduler: g,
	width: y,
	height: y,
	steps: i().int().min(1).max(150),
	cfg_scale: i().min(0).max(30),
	seed: _.optional(),
	input_asset_id: u.optional(),
	denoise_strength: i().min(0).max(1).optional(),
	hires_fix: J.optional(),
	adetailer: o(Y).max(4).optional(),
	controlnet: o(X).max(4).optional(),
	lora_tokens: o(Z).max(16).optional()
}).check((e) => {
	let t = e.value.mode === "img2img";
	t && e.value.hires_fix !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.hires_fix,
		message: "img2img does not accept hires_fix",
		path: ["hires_fix"]
	}), t && e.value.input_asset_id === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires input_asset_id",
		path: ["input_asset_id"]
	}), t && e.value.denoise_strength === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires denoise_strength",
		path: ["denoise_strength"]
	}), !t && e.value.input_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_id,
		message: "txt2img does not accept input_asset_id",
		path: ["input_asset_id"]
	}), !t && e.value.denoise_strength !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.denoise_strength,
		message: "txt2img does not accept denoise_strength",
		path: ["denoise_strength"]
	});
}), $ = l([
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
]), ee = "provider_api_key";
function te(e, t) {
	return c.parse(`tavern_canvas:${e}:${t}:${ee}`);
}
var ne = l([
	"text_to_image",
	"image_to_image",
	"reference_image",
	"progress",
	"cancel",
	"seed",
	"workflow",
	"streaming_result"
]), re = l([
	"auth_failed",
	"rate_limited",
	"content_blocked",
	"invalid_request",
	"provider_unavailable",
	"timed_out",
	"cancelled",
	"malformed_response"
]), ie = n({
	code: re,
	retryable: d(),
	retry_after_ms: i().int().nonnegative().optional(),
	status_code: i().int().min(100).max(599).optional()
});
n({
	provider_id: $,
	...h
});
var ae = r("provider_id", [
	Q,
	v,
	G,
	q,
	K
]), oe = n({
	asset_id: u,
	media_type: l([
		"image/png",
		"image/jpeg",
		"image/webp",
		"video/mp4"
	]),
	byte_length: i().int().positive().max(1e8),
	sha256: m,
	width: i().int().positive().optional(),
	height: i().int().positive().optional(),
	duration_ms: i().int().positive().optional(),
	persisted_url: t().optional()
}), se = n({
	request_id: a,
	provider_id: $,
	assets: o(oe).min(1).max(4),
	seed: _.optional()
});
//#endregion
export { $ as a, q as c, V as d, k as f, ie as i, K as l, se as n, te as o, A as p, ne as r, Q as s, ae as t, G as u };
