//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function e(e) {
	let t = e.length, n = 0, r = 0;
	for (; r < t;) {
		let i = e.charCodeAt(r++);
		if (!(i & 4294967168)) {
			n++;
			continue;
		}
		if (!(i & 4294965248)) n += 2;
		else {
			if (i >= 55296 && i <= 56319 && r < t) {
				let t = e.charCodeAt(r);
				(t & 64512) == 56320 && (++r, i = ((i & 1023) << 10) + (t & 1023) + 65536);
			}
			i & 4294901760 ? n += 4 : n += 3;
		}
	}
	return n;
}
function t(e, t, n) {
	let r = e.length, i = n, a = 0;
	for (; a < r;) {
		let n = e.charCodeAt(a++);
		if (!(n & 4294967168)) {
			t[i++] = n;
			continue;
		}
		if (!(n & 4294965248)) t[i++] = n >> 6 & 31 | 192;
		else {
			if (n >= 55296 && n <= 56319 && a < r) {
				let t = e.charCodeAt(a);
				(t & 64512) == 56320 && (++a, n = ((n & 1023) << 10) + (t & 1023) + 65536);
			}
			n & 4294901760 ? (t[i++] = n >> 18 & 7 | 240, t[i++] = n >> 12 & 63 | 128, t[i++] = n >> 6 & 63 | 128) : (t[i++] = n >> 12 & 15 | 224, t[i++] = n >> 6 & 63 | 128);
		}
		t[i++] = n & 63 | 128;
	}
}
var n = new TextEncoder(), r = 50;
function i(e, t, r) {
	n.encodeInto(e, t.subarray(r));
}
function a(e, n, a) {
	e.length > r ? i(e, n, a) : t(e, n, a);
}
var o = 4096;
function s(e, t, n) {
	let r = t, i = r + n, a = [], s = "";
	for (; r < i;) {
		let t = e[r++];
		if (!(t & 128)) a.push(t);
		else if ((t & 224) == 192) {
			let n = e[r++] & 63;
			a.push((t & 31) << 6 | n);
		} else if ((t & 240) == 224) {
			let n = e[r++] & 63, i = e[r++] & 63;
			a.push((t & 31) << 12 | n << 6 | i);
		} else if ((t & 248) == 240) {
			let n = e[r++] & 63, i = e[r++] & 63, o = e[r++] & 63, s = (t & 7) << 18 | n << 12 | i << 6 | o;
			s > 65535 && (s -= 65536, a.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), a.push(s);
		} else a.push(t);
		a.length >= o && (s += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (s += String.fromCharCode(...a)), s;
}
var c = new TextDecoder(), l = 200;
function u(e, t, n) {
	let r = e.subarray(t, t + n);
	return c.decode(r);
}
function d(e, t, n) {
	return n > l ? u(e, t, n) : s(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var f = class {
	type;
	data;
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, p = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
}, m = 4294967295;
function h(e, t, n) {
	let r = n / 4294967296, i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function g(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function _(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function v(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var y = 4294967295, b = 17179869183;
function x({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= b) if (t === 0 && e <= y) {
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = /* @__PURE__ */ new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	{
		let n = /* @__PURE__ */ new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), g(r, 4, e), n;
	}
}
function S(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function C(e) {
	return e instanceof Date ? x(S(e)) : null;
}
function w(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	switch (e.byteLength) {
		case 4: return {
			sec: t.getUint32(0),
			nsec: 0
		};
		case 8: {
			let e = t.getUint32(0), n = t.getUint32(4);
			return {
				sec: (e & 3) * 4294967296 + n,
				nsec: e >>> 2
			};
		}
		case 12: return {
			sec: _(t, 4),
			nsec: t.getUint32(0)
		};
		default: throw new p(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function T(e) {
	let t = w(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var E = {
	type: -1,
	encode: C,
	decode: T
}, D = class e {
	static defaultCodec = new e();
	__brand;
	builtInEncoders = [];
	builtInDecoders = [];
	encoders = [];
	decoders = [];
	constructor() {
		this.register(E);
	}
	register({ type: e, encode: t, decode: n }) {
		if (e >= 0) this.encoders[e] = t, this.decoders[e] = n;
		else {
			let r = -1 - e;
			this.builtInEncoders[r] = t, this.builtInDecoders[r] = n;
		}
	}
	tryToEncode(e, t) {
		for (let n = 0; n < this.builtInEncoders.length; n++) {
			let r = this.builtInEncoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new f(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new f(n, i);
			}
		}
		return e instanceof f ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new f(t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function O(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function k(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : O(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
//#endregion
export { v as a, p as c, s as d, a as f, _ as i, e as l, D as n, g as o, m as r, h as s, k as t, d as u };
