//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
function e(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
function t(t, n, r = "") {
	let i = e(t), a = t?.length, o = n !== void 0;
	if (!i || o && a !== n) {
		let e = r && `"${r}" `, s = o ? ` of length ${n}` : "", c = i ? `length=${a}` : `type=${typeof t}`, l = e + "expected Uint8Array" + s + ", got " + c;
		throw i ? RangeError(l) : TypeError(l);
	}
	return t;
}
function n(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function r(e, n) {
	t(e, void 0, "digestInto() output");
	let r = n.outputLen;
	if (e.length < r) throw RangeError("\"digestInto() output\" expected to be of length >=" + r);
}
function i(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function a(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function o(e, t) {
	return e << 32 - t | e >>> t;
}
var s = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", c = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function l(e) {
	if (t(e), s) return e.toHex();
	let n = "";
	for (let t = 0; t < e.length; t++) n += c[e[t]];
	return n;
}
function u(e) {
	if (typeof e != "string") throw TypeError("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function d(e, t = {}) {
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
var f = (e) => ({ oid: Uint8Array.from([
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
function p(e, t, n) {
	return e & t ^ ~e & n;
}
function m(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var h = class {
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
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = a(this.buffer);
	}
	update(e) {
		n(this), t(e);
		let { view: r, buffer: i, blockLen: o } = this, s = e.length;
		for (let t = 0; t < s;) {
			let n = Math.min(o - this.pos, s - t);
			if (n === o) {
				let n = a(e);
				for (; o <= s - t; t += o) this.process(n, t);
				continue;
			}
			i.set(e.subarray(t, t + n), this.pos), this.pos += n, t += n, this.pos === o && (this.process(r, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		n(this), r(e, this), this.finished = !0;
		let { buffer: t, view: o, blockLen: s, isLE: c } = this, { pos: l } = this;
		t[l++] = 128, i(this.buffer.subarray(l)), this.padOffset > s - l && (this.process(o, 0), l = 0);
		for (let e = l; e < s; e++) t[e] = 0;
		o.setBigUint64(s - 8, BigInt(this.length * 8), c), this.process(o, 0);
		let u = a(e), d = this.outputLen;
		if (d % 4) throw Error("_sha2: outputLen must be aligned to 32bit");
		let f = d / 4, p = this.get();
		if (f > p.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < f; e++) u.setUint32(4 * e, p[e], c);
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
}, g = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), _ = /* @__PURE__ */ Uint32Array.from([
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
]), v = /* @__PURE__ */ new Uint32Array(64), y = class extends h {
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
		for (let n = 0; n < 16; n++, t += 4) v[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = v[e - 15], n = v[e - 2], r = o(t, 7) ^ o(t, 18) ^ t >>> 3, i = o(n, 17) ^ o(n, 19) ^ n >>> 10;
			v[e] = i + v[e - 7] + r + v[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: s, F: c, G: l, H: u } = this;
		for (let e = 0; e < 64; e++) {
			let t = o(s, 6) ^ o(s, 11) ^ o(s, 25), d = u + t + p(s, c, l) + _[e] + v[e] | 0, f = (o(n, 2) ^ o(n, 13) ^ o(n, 22)) + m(n, r, i) | 0;
			u = l, l = c, c = s, s = a + d | 0, a = i, i = r, r = n, n = d + f | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, s = s + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(n, r, i, a, s, c, l, u);
	}
	roundClean() {
		i(v);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), i(this.buffer);
	}
}, b = class extends y {
	A = g[0] | 0;
	B = g[1] | 0;
	C = g[2] | 0;
	D = g[3] | 0;
	E = g[4] | 0;
	F = g[5] | 0;
	G = g[6] | 0;
	H = g[7] | 0;
	constructor() {
		super(32);
	}
}, x = /* @__PURE__ */ d(() => new b(), /* @__PURE__ */ f(1));
//#endregion
export { l as n, u as r, x as t };
