import { n as e, t } from "./sha2-BGNex9vj.js";
import { a as n, c as r, ct as i, dt as a, ft as o, i as s, nt as c, o as l, r as u, s as ee, st as te, t as ne, tt as re } from "./src-CpgRWEjb.js";
import { C as ie, k as d } from "./job_repository-CcjjS_PI.js";
import { d as f, f as ae, i as p, r as oe } from "./business_repositories-CDvcbNGU.js";
//#region ../../packages/vocabulary/src/package_client.ts
var m = class extends TypeError {}, h = class extends Error {
	path;
	constructor(e, t) {
		super(t), this.name = "PackageFetchError", this.path = e;
	}
}, g = "manifest.json", se = 8388608;
function ce(e) {
	let t;
	try {
		t = new URL(e.base_url);
	} catch {
		throw new m(`Package source base_url is not a valid absolute URL: ${e.base_url}`);
	}
	if (e.kind === "https" && t.protocol !== "https:") throw new m(`An HTTPS package source must use the https: scheme, got: ${t.protocol}`);
	return t.pathname.endsWith("/") || (t.pathname = `${t.pathname}/`), t.search = "", t.hash = "", t;
}
function _(e, t) {
	return new URL(t, e);
}
async function v(e, t, n, r) {
	if (e === null) throw new h(t, `Response for ${t} has no readable body`);
	let i = e.getReader(), a = [], o = 0;
	for (;;) {
		let { done: e, value: s } = await i.read();
		if (e) break;
		if (o += s.byteLength, o > n) throw await i.cancel("bounded_stream_exceeded").catch(() => void 0), new h(t, `Response for ${t} exceeded the allowed ${String(n)}-byte bound`);
		a.push(s), r?.({
			downloaded_bytes: o,
			total_bytes: n
		});
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
function y(e, t = fetch) {
	let n = ce(e);
	return {
		async fetch_manifest(e) {
			let r = await t(_(n, g), e === void 0 ? {} : { signal: e });
			if (!r.ok) throw new h(g, `Manifest request failed with status ${String(r.status)}`);
			let i = await v(r.body, g, se), a;
			try {
				a = JSON.parse(new TextDecoder().decode(i));
			} catch {
				throw new h(g, "Manifest response is not valid JSON");
			}
			let o = s.safeParse(a);
			if (!o.success) throw new h(g, "Manifest response failed schema validation");
			return o.data;
		},
		async fetch_shard_bytes(e, r) {
			let i = await t(_(n, e), r.signal === void 0 ? {} : { signal: r.signal });
			if (!i.ok) throw new h(e, `Shard request failed with status ${String(i.status)}: ${e}`);
			return v(i.body, e, r.max_bytes, r.on_progress);
		}
	};
}
new TextEncoder();
var le = 4096;
function b(e, t, n) {
	let r = t, i = r + n, a = [], o = "";
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
		a.length >= le && (o += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (o += String.fromCharCode(...a)), o;
}
var ue = new TextDecoder(), de = 200;
function fe(e, t, n) {
	let r = e.subarray(t, t + n);
	return ue.decode(r);
}
function pe(e, t, n) {
	return n > de ? fe(e, t, n) : b(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var x = class {
	type;
	data;
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, S = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
};
function me(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function C(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function he(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var ge = 4294967295, _e = 17179869183;
function ve({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= _e) if (t === 0 && e <= ge) {
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = /* @__PURE__ */ new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	{
		let n = /* @__PURE__ */ new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), me(r, 4, e), n;
	}
}
function ye(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function be(e) {
	return e instanceof Date ? ve(ye(e)) : null;
}
function xe(e) {
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
			sec: C(t, 4),
			nsec: t.getUint32(0)
		};
		default: throw new S(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function Se(e) {
	let t = xe(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var Ce = {
	type: -1,
	encode: be,
	decode: Se
}, we = class e {
	static defaultCodec = new e();
	__brand;
	builtInEncoders = [];
	builtInDecoders = [];
	encoders = [];
	decoders = [];
	constructor() {
		this.register(Ce);
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
				if (i != null) return new x(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new x(n, i);
			}
		}
		return e instanceof x ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new x(t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function w(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function T(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : w(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function E(e) {
	return `${e < 0 ? "-" : ""}0x${Math.abs(e).toString(16).padStart(2, "0")}`;
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var D = 16, O = 16, k = class {
	hit = 0;
	miss = 0;
	caches;
	maxKeyLength;
	maxLengthPerKey;
	constructor(e = D, t = O) {
		this.maxKeyLength = e, this.maxLengthPerKey = t, this.caches = [];
		for (let e = 0; e < this.maxKeyLength; e++) this.caches.push([]);
	}
	canBeCached(e) {
		return e > 0 && e <= this.maxKeyLength;
	}
	find(e, t, n) {
		let r = this.caches[n - 1];
		FIND_CHUNK: for (let i of r) {
			let r = i.bytes;
			for (let i = 0; i < n; i++) if (r[i] !== e[t + i]) continue FIND_CHUNK;
			return i.str;
		}
		return null;
	}
	store(e, t) {
		let n = this.caches[e.length - 1], r = {
			bytes: e,
			str: t
		};
		n.length >= this.maxLengthPerKey ? n[Math.random() * n.length | 0] = r : n.push(r);
	}
	decode(e, t, n) {
		let r = this.find(e, t, n);
		if (r != null) return this.hit++, r;
		this.miss++;
		let i = b(e, t, n), a = Uint8Array.prototype.slice.call(e, t, t + n);
		return this.store(a, i), i;
	}
}, A = "array", j = "map_key", M = "map_value", Te = (e) => {
	if (typeof e == "string" || typeof e == "number") return e;
	throw new S("The type of key must be string or number but " + typeof e);
}, Ee = class {
	stack = [];
	stackHeadPosition = -1;
	get length() {
		return this.stackHeadPosition + 1;
	}
	top() {
		return this.stack[this.stackHeadPosition];
	}
	pushArrayState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = A, t.position = 0, t.size = e, t.array = Array(e);
	}
	pushMapState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = j, t.readCount = 0, t.size = e, t.map = {};
	}
	getUninitializedStateFromPool() {
		return this.stackHeadPosition++, this.stackHeadPosition === this.stack.length && this.stack.push({
			type: void 0,
			size: 0,
			array: void 0,
			position: 0,
			readCount: 0,
			map: void 0,
			key: null
		}), this.stack[this.stackHeadPosition];
	}
	release(e) {
		if (this.stack[this.stackHeadPosition] !== e) throw Error("Invalid stack state. Released state is not on top of the stack.");
		if (e.type === A) {
			let t = e;
			t.size = 0, t.array = void 0, t.position = 0, t.type = void 0;
		}
		if (e.type === j || e.type === M) {
			let t = e;
			t.size = 0, t.map = void 0, t.readCount = 0, t.type = void 0;
		}
		this.stackHeadPosition--;
	}
	reset() {
		this.stack.length = 0, this.stackHeadPosition = -1;
	}
}, N = -1, P = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)), De = new Uint8Array(P.buffer);
try {
	P.getInt8(0);
} catch (e) {
	if (!(e instanceof RangeError)) throw Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
var F = /* @__PURE__ */ RangeError("Insufficient data"), Oe = new k(), ke = class e {
	extensionCodec;
	context;
	useBigInt64;
	rawStrings;
	maxStrLength;
	maxBinLength;
	maxArrayLength;
	maxMapLength;
	maxExtLength;
	keyDecoder;
	mapKeyConverter;
	totalPos = 0;
	pos = 0;
	view = P;
	bytes = De;
	headByte = N;
	stack = new Ee();
	entered = !1;
	constructor(e) {
		this.extensionCodec = e?.extensionCodec ?? we.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.rawStrings = e?.rawStrings ?? !1, this.maxStrLength = e?.maxStrLength ?? 4294967295, this.maxBinLength = e?.maxBinLength ?? 4294967295, this.maxArrayLength = e?.maxArrayLength ?? 4294967295, this.maxMapLength = e?.maxMapLength ?? 4294967295, this.maxExtLength = e?.maxExtLength ?? 4294967295, this.keyDecoder = e?.keyDecoder === void 0 ? Oe : e.keyDecoder, this.mapKeyConverter = e?.mapKeyConverter ?? Te;
	}
	clone() {
		return new e({
			extensionCodec: this.extensionCodec,
			context: this.context,
			useBigInt64: this.useBigInt64,
			rawStrings: this.rawStrings,
			maxStrLength: this.maxStrLength,
			maxBinLength: this.maxBinLength,
			maxArrayLength: this.maxArrayLength,
			maxMapLength: this.maxMapLength,
			maxExtLength: this.maxExtLength,
			keyDecoder: this.keyDecoder
		});
	}
	reinitializeState() {
		this.totalPos = 0, this.headByte = N, this.stack.reset();
	}
	setBuffer(e) {
		let t = T(e);
		this.bytes = t, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength), this.pos = 0;
	}
	appendBuffer(e) {
		if (this.headByte === N && !this.hasRemaining(1)) this.setBuffer(e);
		else {
			let t = this.bytes.subarray(this.pos), n = T(e), r = new Uint8Array(t.length + n.length);
			r.set(t), r.set(n, t.length), this.setBuffer(r);
		}
	}
	hasRemaining(e) {
		return this.view.byteLength - this.pos >= e;
	}
	createExtraByteError(e) {
		let { view: t, pos: n } = this;
		return /* @__PURE__ */ RangeError(`Extra ${t.byteLength - n} of ${t.byteLength} byte(s) found at buffer[${e}]`);
	}
	decode(e) {
		if (this.entered) return this.clone().decode(e);
		try {
			this.entered = !0, this.reinitializeState(), this.setBuffer(e);
			let t = this.doDecodeSync();
			if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
			return t;
		} finally {
			this.entered = !1;
		}
	}
	*decodeMulti(e) {
		if (this.entered) {
			yield* this.clone().decodeMulti(e);
			return;
		}
		try {
			for (this.entered = !0, this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1);) yield this.doDecodeSync();
		} finally {
			this.entered = !1;
		}
	}
	async decodeAsync(e) {
		if (this.entered) return this.clone().decodeAsync(e);
		try {
			this.entered = !0;
			let t = !1, n;
			for await (let r of e) {
				if (t) throw this.entered = !1, this.createExtraByteError(this.totalPos);
				this.appendBuffer(r);
				try {
					n = this.doDecodeSync(), t = !0;
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
			if (t) {
				if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
				return n;
			}
			let { headByte: r, pos: i, totalPos: a } = this;
			throw RangeError(`Insufficient data in parsing ${E(r)} at ${a} (${i} in the current buffer)`);
		} finally {
			this.entered = !1;
		}
	}
	decodeArrayStream(e) {
		return this.decodeMultiAsync(e, !0);
	}
	decodeStream(e) {
		return this.decodeMultiAsync(e, !1);
	}
	async *decodeMultiAsync(e, t) {
		if (this.entered) {
			yield* this.clone().decodeMultiAsync(e, t);
			return;
		}
		try {
			this.entered = !0;
			let n = t, r = -1;
			for await (let i of e) {
				if (t && r === 0) throw this.createExtraByteError(this.totalPos);
				this.appendBuffer(i), n && (r = this.readArraySize(), n = !1, this.complete());
				try {
					for (; yield this.doDecodeSync(), --r !== 0;);
				} catch (e) {
					if (!(e instanceof RangeError)) throw e;
				}
				this.totalPos += this.pos;
			}
		} finally {
			this.entered = !1;
		}
	}
	doDecodeSync() {
		DECODE: for (;;) {
			let e = this.readHeadByte(), t;
			if (e >= 224) t = e - 256;
			else if (e < 192) if (e < 128) t = e;
			else if (e < 144) {
				let n = e - 128;
				if (n !== 0) {
					this.pushMapState(n), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e < 160) {
				let n = e - 144;
				if (n !== 0) {
					this.pushArrayState(n), this.complete();
					continue DECODE;
				}
				t = [];
			} else {
				let n = e - 160;
				t = this.decodeString(n, 0);
			}
			else if (e === 192) t = null;
			else if (e === 194) t = !1;
			else if (e === 195) t = !0;
			else if (e === 202) t = this.readF32();
			else if (e === 203) t = this.readF64();
			else if (e === 204) t = this.readU8();
			else if (e === 205) t = this.readU16();
			else if (e === 206) t = this.readU32();
			else if (e === 207) t = this.useBigInt64 ? this.readU64AsBigInt() : this.readU64();
			else if (e === 208) t = this.readI8();
			else if (e === 209) t = this.readI16();
			else if (e === 210) t = this.readI32();
			else if (e === 211) t = this.useBigInt64 ? this.readI64AsBigInt() : this.readI64();
			else if (e === 217) {
				let e = this.lookU8();
				t = this.decodeString(e, 1);
			} else if (e === 218) {
				let e = this.lookU16();
				t = this.decodeString(e, 2);
			} else if (e === 219) {
				let e = this.lookU32();
				t = this.decodeString(e, 4);
			} else if (e === 220) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				}
				t = [];
			} else if (e === 221) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushArrayState(e), this.complete();
					continue DECODE;
				}
				t = [];
			} else if (e === 222) {
				let e = this.readU16();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e === 223) {
				let e = this.readU32();
				if (e !== 0) {
					this.pushMapState(e), this.complete();
					continue DECODE;
				}
				t = {};
			} else if (e === 196) {
				let e = this.lookU8();
				t = this.decodeBinary(e, 1);
			} else if (e === 197) {
				let e = this.lookU16();
				t = this.decodeBinary(e, 2);
			} else if (e === 198) {
				let e = this.lookU32();
				t = this.decodeBinary(e, 4);
			} else if (e === 212) t = this.decodeExtension(1, 0);
			else if (e === 213) t = this.decodeExtension(2, 0);
			else if (e === 214) t = this.decodeExtension(4, 0);
			else if (e === 215) t = this.decodeExtension(8, 0);
			else if (e === 216) t = this.decodeExtension(16, 0);
			else if (e === 199) {
				let e = this.lookU8();
				t = this.decodeExtension(e, 1);
			} else if (e === 200) {
				let e = this.lookU16();
				t = this.decodeExtension(e, 2);
			} else if (e === 201) {
				let e = this.lookU32();
				t = this.decodeExtension(e, 4);
			} else throw new S(`Unrecognized type byte: ${E(e)}`);
			this.complete();
			let n = this.stack;
			for (; n.length > 0;) {
				let e = n.top();
				if (e.type === A) if (e.array[e.position] = t, e.position++, e.position === e.size) t = e.array, n.release(e);
				else continue DECODE;
				else if (e.type === j) {
					if (t === "__proto__") throw new S("The key __proto__ is not allowed");
					e.key = this.mapKeyConverter(t), e.type = M;
					continue DECODE;
				} else if (e.map[e.key] = t, e.readCount++, e.readCount === e.size) t = e.map, n.release(e);
				else {
					e.key = null, e.type = j;
					continue DECODE;
				}
			}
			return t;
		}
	}
	readHeadByte() {
		return this.headByte === N && (this.headByte = this.readU8()), this.headByte;
	}
	complete() {
		this.headByte = N;
	}
	readArraySize() {
		let e = this.readHeadByte();
		switch (e) {
			case 220: return this.readU16();
			case 221: return this.readU32();
			default:
				if (e < 160) return e - 144;
				throw new S(`Unrecognized array type byte: ${E(e)}`);
		}
	}
	pushMapState(e) {
		if (e > this.maxMapLength) throw new S(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
		this.stack.pushMapState(e);
	}
	pushArrayState(e) {
		if (e > this.maxArrayLength) throw new S(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
		this.stack.pushArrayState(e);
	}
	decodeString(e, t) {
		return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, t) : this.decodeBinary(e, t);
	}
	decodeUtf8String(e, t) {
		if (e > this.maxStrLength) throw new S(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
		if (this.bytes.byteLength < this.pos + t + e) throw F;
		let n = this.pos + t, r;
		return r = this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? this.keyDecoder.decode(this.bytes, n, e) : pe(this.bytes, n, e), this.pos += t + e, r;
	}
	stateIsMapKey() {
		return this.stack.length > 0 && this.stack.top().type === j;
	}
	decodeBinary(e, t) {
		if (e > this.maxBinLength) throw new S(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
		if (!this.hasRemaining(e + t)) throw F;
		let n = this.pos + t, r = this.bytes.subarray(n, n + e);
		return this.pos += t + e, r;
	}
	decodeExtension(e, t) {
		if (e > this.maxExtLength) throw new S(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
		let n = this.view.getInt8(this.pos + t), r = this.decodeBinary(e, t + 1);
		return this.extensionCodec.decode(r, n, this.context);
	}
	lookU8() {
		return this.view.getUint8(this.pos);
	}
	lookU16() {
		return this.view.getUint16(this.pos);
	}
	lookU32() {
		return this.view.getUint32(this.pos);
	}
	readU8() {
		let e = this.view.getUint8(this.pos);
		return this.pos++, e;
	}
	readI8() {
		let e = this.view.getInt8(this.pos);
		return this.pos++, e;
	}
	readU16() {
		let e = this.view.getUint16(this.pos);
		return this.pos += 2, e;
	}
	readI16() {
		let e = this.view.getInt16(this.pos);
		return this.pos += 2, e;
	}
	readU32() {
		let e = this.view.getUint32(this.pos);
		return this.pos += 4, e;
	}
	readI32() {
		let e = this.view.getInt32(this.pos);
		return this.pos += 4, e;
	}
	readU64() {
		let e = he(this.view, this.pos);
		return this.pos += 8, e;
	}
	readI64() {
		let e = C(this.view, this.pos);
		return this.pos += 8, e;
	}
	readU64AsBigInt() {
		let e = this.view.getBigUint64(this.pos);
		return this.pos += 8, e;
	}
	readI64AsBigInt() {
		let e = this.view.getBigInt64(this.pos);
		return this.pos += 8, e;
	}
	readF32() {
		let e = this.view.getFloat32(this.pos);
		return this.pos += 4, e;
	}
	readF64() {
		let e = this.view.getFloat64(this.pos);
		return this.pos += 8, e;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function Ae(e, t) {
	return new ke(t).decode(e);
}
//#endregion
//#region ../../packages/vocabulary/src/package_verifier.ts
var I = class extends Error {
	reason;
	path;
	constructor(e, t, n) {
		super(t), this.name = "PackageVerificationError", this.reason = e, this.path = n;
	}
}, je = 128, Me = 65536, Ne = 33554432;
function L(e) {
	return Math.min(Ne, Math.max(e * je, Me));
}
function Pe(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
function R(e, t) {
	let [n, r] = z(e), [i, a] = z(t);
	for (let e = 0; e < 3; e += 1) {
		let t = n[e] ?? 0, r = i[e] ?? 0;
		if (t !== r) return t < r ? -1 : 1;
	}
	return r === void 0 && a === void 0 ? 0 : r === void 0 ? 1 : a === void 0 ? -1 : Fe(r, a);
}
function z(e) {
	let [t, n] = (e.split("+")[0] ?? e).split("-", 2), r = t.split(".").map((e) => Number.parseInt(e, 10));
	return [[
		r[0] ?? 0,
		r[1] ?? 0,
		r[2] ?? 0
	], n];
}
function Fe(e, t) {
	let n = e.split("."), r = t.split("."), i = Math.max(n.length, r.length);
	for (let e = 0; e < i; e += 1) {
		let t = n[e], i = r[e];
		if (t === void 0) return -1;
		if (i === void 0) return 1;
		let a = /^\d+$/u.test(t), o = /^\d+$/u.test(i);
		if (a && o) {
			let e = Number.parseInt(t, 10) - Number.parseInt(i, 10);
			if (e !== 0) return e < 0 ? -1 : 1;
			continue;
		}
		if (a !== o) return a ? -1 : 1;
		if (t !== i) return t < i ? -1 : 1;
	}
	return 0;
}
var Ie = te({ kind: u });
function Le(e, t) {
	if (Pe(e) !== 1) throw new I("unsupported_schema", "Manifest declares an unsupported schema_version");
	let n = s.safeParse(e);
	if (!n.success) throw new I("invalid_manifest", "Manifest failed schema validation");
	let r = n.data;
	if (R(t.current_extension_version, r.minimum_extension_version) < 0) throw new I("extension_version_too_low", `Extension version ${t.current_extension_version} is below the package's minimum ${r.minimum_extension_version}`);
	let i = /* @__PURE__ */ new Set();
	for (let e of r.shards) {
		if (i.has(e.path)) throw new I("duplicate_shard_path", `Duplicate shard path in manifest: ${e.path}`, e.path);
		i.add(e.path);
	}
	return r;
}
async function Re(e, t) {
	let n = L(t.byte_length), r = new Response(new Uint8Array(e)).body;
	if (r === null) throw new I("corrupt_gzip", `No readable body for ${t.path}`, t.path);
	let i = r.pipeThrough(new DecompressionStream("gzip")).getReader(), a = [], o = 0;
	try {
		for (;;) {
			let { done: e, value: r } = await i.read();
			if (e) break;
			if (o += r.byteLength, o > n) throw await i.cancel("decompressed_size_exceeded").catch(() => void 0), new I("decompressed_size_exceeded", `Decompressed size of ${t.path} exceeds the allowed bound`, t.path);
			a.push(r);
		}
	} catch (e) {
		throw e instanceof I ? e : new I("corrupt_gzip", `Corrupt gzip stream for ${t.path}: ${e instanceof Error ? e.message : String(e)}`, t.path);
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
async function ze(n, r) {
	if (r.byteLength !== n.byte_length) throw new I("byte_length_mismatch", `Declared byte_length ${String(n.byte_length)} does not match downloaded size ${String(r.byteLength)} for ${n.path}`, n.path);
	if (e(t(r)) !== n.sha256) throw new I("hash_mismatch", `SHA-256 mismatch for ${n.path}`, n.path);
	let i = await Re(r, n), a;
	try {
		a = Ae(i);
	} catch (e) {
		throw new I("corrupt_messagepack", `MessagePack decode failed for ${n.path}: ${e instanceof Error ? e.message : String(e)}`, n.path);
	}
	let o = Ie.safeParse(a);
	if (!o.success) throw new I("corrupt_messagepack", `Decoded shard content for ${n.path} is not a valid envelope`, n.path);
	if (o.data.kind !== n.kind) throw new I("wrong_shard_kind", `Shard ${n.path} declares kind "${n.kind}" but content is "${o.data.kind}"`, n.path);
	return {
		entry: n,
		compressed_bytes: r
	};
}
var Be = /* @__PURE__ */ new Set([
	"staging",
	"ready",
	"active",
	"confirmed",
	"superseded",
	"failed"
]), B = /* @__PURE__ */ new Set(["active", "confirmed"]), V = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageStoreError";
	}
};
function H(e) {
	if (!Be.has(e)) throw new V(`Unknown vocabulary package state: ${e}`);
	return e;
}
function Ve(e) {
	if (typeof e != "string") throw new V(`Expected a semver data_version string, got a number: ${String(e)}`);
	return e;
}
var He = a({
	package_id: n,
	changelog: o().min(1).max(4096),
	record_count: i().int().nonnegative(),
	compressed_size: i().int().nonnegative(),
	minimum_extension_version: l,
	shard_entries: re(ee),
	pinned: c(),
	confirmed_at: ie.optional()
}), Ue = a({
	package_record_id: o().min(1),
	shard_id: o().min(1),
	path: r,
	sha256: o().regex(/^[a-f0-9]{64}$/u),
	byte_length: i().int().nonnegative(),
	bytes_base64: o().min(1)
});
function U(e) {
	let t = He.safeParse(e);
	if (!t.success) throw new V("Stored vocabulary package payload failed validation");
	return t.data;
}
function W(e) {
	let t = Ue.safeParse(e);
	if (!t.success) throw new V("Stored vocabulary shard payload failed validation");
	return t.data;
}
function G(e) {
	return d({
		package_id: e.package_id,
		changelog: e.changelog,
		record_count: e.record_count,
		compressed_size: e.compressed_size,
		minimum_extension_version: e.minimum_extension_version,
		shard_entries: e.shard_entries,
		pinned: e.pinned,
		...e.confirmed_at === void 0 ? {} : { confirmed_at: e.confirmed_at }
	});
}
function We(e) {
	return d({ ...e });
}
function Ge(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function Ke(e) {
	let t = atob(e);
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function qe(e, t) {
	return {
		package_id: t.package_id,
		schema_version: 1,
		data_version: e,
		changelog: t.changelog,
		record_count: t.record_count,
		compressed_size: t.compressed_size,
		minimum_extension_version: t.minimum_extension_version,
		shards: [...t.shard_entries]
	};
}
function K(e) {
	let t = U(e.payload);
	return {
		record_id: e.id,
		state: H(e.state),
		pinned: t.pinned,
		confirmed_at: t.confirmed_at,
		manifest: qe(Ve(e.data_version), t)
	};
}
var Je = class {
	database;
	namespace;
	packages;
	shards;
	shard_index_cache = null;
	cache_active_package;
	active_package_cache = void 0;
	constructor(e, t, n = {}) {
		this.database = e, this.namespace = t, this.packages = new oe(e), this.shards = new p(e), this.cache_active_package = n.cache_active_package ?? !1;
	}
	invalidate_caches() {
		this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async list_packages() {
		return (await this.packages.list(this.namespace)).map(K);
	}
	async find_active_or_confirmed() {
		if (this.cache_active_package && this.active_package_cache !== void 0) return this.active_package_cache;
		let e = (await this.list_packages()).find((e) => B.has(e.state)) ?? null;
		return this.active_package_cache = e, e;
	}
	invalidate_active_package_cache() {
		this.active_package_cache = void 0;
	}
	async create_staging_package(e) {
		let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = {
			schema_version: 1,
			id: n,
			namespace: this.namespace,
			record_key: `${this.namespace}:${n}`,
			created_at: t,
			updated_at: t,
			data_version: e.data_version,
			state: "staging",
			payload: G({
				package_id: e.package_id,
				changelog: e.changelog,
				record_count: e.record_count,
				compressed_size: e.compressed_size,
				minimum_extension_version: e.minimum_extension_version,
				shard_entries: e.shards,
				pinned: !1
			})
		};
		return await this.packages.create(this.namespace, r), this.invalidate_active_package_cache(), K(r);
	}
	async put_shard_content(e, t, n) {
		await this.create_shard_record(e, t, Ge(n));
	}
	async copy_shard(e, t, n) {
		let r = await this.find_shard_record(n, t.path);
		if (r === null) throw new V(`No source shard to copy for path: ${t.path}`);
		if (r.payload.sha256 !== t.sha256) throw new V(`Source shard content hash does not match the target manifest entry for ${t.path}`);
		await this.create_shard_record(e, t, r.payload.bytes_base64);
	}
	async mark_ready(e) {
		await this.transition_state(e, "ready");
	}
	async activate(e) {
		return f(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = null;
			for (let i of n) i.id !== e && B.has(H(i.state)) && (await this.packages.update(this.namespace, {
				...i,
				state: "superseded",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), r = i.id);
			let i = await this.require_record(e, t);
			return await this.packages.update(this.namespace, {
				...i,
				state: "active",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), this.invalidate_active_package_cache(), { superseded_id: r };
		});
	}
	async confirm(e) {
		let t = await this.require_record(e);
		if (H(t.state) !== "active") throw new V(`Cannot confirm package ${e}: state is "${t.state}", not "active"`);
		await this.transition_state(e, "confirmed", { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
	}
	async reselect_prior_confirmed(e) {
		return f(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = n.filter((t) => t.id !== e).map((e) => ({
				record: e,
				payload: U(e.payload)
			})).filter(({ record: e, payload: t }) => H(e.state) === "superseded" && t.confirmed_at !== void 0).sort((e, t) => (t.payload.confirmed_at ?? "").localeCompare(e.payload.confirmed_at ?? ""))[0], i = n.find((t) => t.id === e);
			if (i !== void 0 && await this.packages.update(this.namespace, {
				...i,
				state: "failed",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}, t), this.invalidate_active_package_cache(), r === void 0) return null;
			let a = {
				...r.record,
				state: "confirmed",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			return await this.packages.update(this.namespace, a, t), K(a);
		});
	}
	async rollback_staging(e) {
		let t = await this.list_owned_shards(e);
		await f(this.database, ["vocabulary_packages", "vocabulary_shards"], async (n) => {
			for (let e of t) await this.shards.delete(this.namespace, e.id, n);
			await this.packages.delete(this.namespace, e, n);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async cleanup_stale() {
		let e = (await this.packages.list(this.namespace)).filter((e) => {
			let t = U(e.payload), n = H(e.state);
			return (n === "superseded" || n === "failed") && !t.pinned;
		}), t = new Set(e.map((e) => e.id)), n = (await this.shards.list(this.namespace)).filter((e) => t.has(W(e.payload).package_record_id));
		return await f(this.database, ["vocabulary_packages", "vocabulary_shards"], async (t) => {
			for (let e of n) await this.shards.delete(this.namespace, e.id, t);
			for (let n of e) await this.packages.delete(this.namespace, n.id, t);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache(), { deleted_package_ids: [...t] };
	}
	async set_pinned(e, t) {
		let n = await this.require_record(e), r = U(n.payload);
		await this.packages.update(this.namespace, {
			...n,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: G({
				...r,
				pinned: t
			})
		}), this.invalidate_active_package_cache();
	}
	async manifest() {
		let e = await this.find_active_or_confirmed();
		if (e === null) throw new V(`No active vocabulary package in namespace: ${this.namespace}`);
		return e.manifest;
	}
	async shard_bytes(e) {
		let t = await this.find_active_or_confirmed();
		if (t === null) throw new V(`No active vocabulary package in namespace: ${this.namespace}`);
		let n = await this.find_shard_record(t.record_id, e);
		if (n === null) throw new V(`No shard bytes stored for path: ${e}`);
		let r = Ke(n.payload.bytes_base64);
		if (r.byteLength !== n.payload.byte_length) throw new V(`Stored shard bytes for ${e} do not match their recorded byte_length`);
		return r;
	}
	async create_shard_record(e, t, n) {
		let r = (/* @__PURE__ */ new Date()).toISOString(), i = crypto.randomUUID(), a = u.parse(t.kind), o = {
			schema_version: 1,
			id: i,
			namespace: this.namespace,
			record_key: `${this.namespace}:${i}`,
			created_at: r,
			updated_at: r,
			data_version: e.manifest.data_version,
			kind: a,
			payload: We({
				package_record_id: e.record_id,
				shard_id: t.shard_id,
				path: t.path,
				sha256: t.sha256,
				byte_length: t.byte_length,
				bytes_base64: n
			})
		};
		await this.shards.create(this.namespace, o), this.invalidate_shard_index_cache();
	}
	async list_owned_shards(e) {
		return (await this.shards.list(this.namespace)).filter((t) => W(t.payload).package_record_id === e);
	}
	async get_shard_index() {
		if (this.shard_index_cache === null) {
			let e = await this.shards.list(this.namespace), t = /* @__PURE__ */ new Map();
			for (let n of e) {
				let e = W(n.payload);
				t.set(`${e.package_record_id}:${e.path}`, n.id);
			}
			this.shard_index_cache = t;
		}
		return this.shard_index_cache;
	}
	invalidate_shard_index_cache() {
		this.shard_index_cache = null;
	}
	async find_shard_record(e, t) {
		let n = (await this.get_shard_index()).get(`${e}:${t}`);
		if (n === void 0) return null;
		let r = await this.shards.get(this.namespace, n);
		return r === null ? null : {
			record: r,
			payload: W(r.payload)
		};
	}
	async require_record(e, t) {
		let n = await this.packages.get(this.namespace, e, t);
		if (n === null) throw new V(`No vocabulary package record ${e} in namespace ${this.namespace}`);
		return n;
	}
	async transition_state(e, t, n = {}) {
		let r = await this.require_record(e), i = U(r.payload);
		await this.packages.update(this.namespace, {
			...r,
			state: t,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: G({
				...i,
				...n.confirmed_at === void 0 ? {} : { confirmed_at: n.confirmed_at }
			})
		}), this.invalidate_active_package_cache();
	}
}, q = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageUpdateError";
	}
}, Ye = 65536;
function Xe(e) {
	return e + Ye;
}
function Ze(e, t) {
	if (e.data_version !== t.data_version || e.shards.length !== t.shards.length) return !1;
	let n = new Map(e.shards.map((e) => [e.path, e.sha256]));
	return t.shards.every((e) => n.get(e.path) === e.sha256);
}
function Qe(e, t) {
	let n = new Map(e?.manifest.shards.map((e) => [e.path, e.sha256]) ?? []);
	return t.shards.reduce((e, t) => n.get(t.path) === t.sha256 ? e : e + t.byte_length, 0);
}
function J(e) {
	if (e?.aborted === !0) throw new DOMException("Vocabulary package update was aborted", "AbortError");
}
var $e = class {
	store;
	client;
	current_extension_version;
	on_progress;
	tail = Promise.resolve();
	constructor(e) {
		this.store = new Je(e.database, e.namespace), this.client = e.client, this.current_extension_version = e.current_extension_version, this.on_progress = e.on_progress;
	}
	async update(e) {
		let t = this.tail.then(() => this.run_update(e), () => this.run_update(e));
		return this.tail = t.then(() => void 0, () => void 0), t;
	}
	async report_query_success() {
		let e = await this.store.find_active_or_confirmed();
		e !== null && e.state === "active" && await this.store.confirm(e.record_id);
	}
	async report_query_failure() {
		let e = await this.store.find_active_or_confirmed();
		return e === null || e.state !== "active" ? null : this.store.reselect_prior_confirmed(e.record_id);
	}
	async cleanup() {
		return this.store.cleanup_stale();
	}
	emit(e) {
		this.on_progress?.(e);
	}
	async run_update(e) {
		this.emit({ phase: "checking_manifest" }), J(e);
		let t = Le(await this.client.fetch_manifest(e), { current_extension_version: this.current_extension_version }), n = await this.store.find_active_or_confirmed();
		if (n !== null && Ze(n.manifest, t)) return this.emit({
			phase: "up_to_date",
			data_version: t.data_version
		}), {
			outcome: "up_to_date",
			data_version: t.data_version
		};
		let r = await this.store.create_staging_package(t), i = Qe(n, t), a = 0;
		try {
			for (let o of t.shards) {
				if (J(e), n?.manifest.shards.find((e) => e.path === o.path)?.sha256 === o.sha256 && n !== null) {
					this.emit({
						phase: "reusing_shard",
						shard_path: o.path
					}), await this.store.copy_shard(r, o, n.record_id);
					continue;
				}
				let t = await this.client.fetch_shard_bytes(o.path, {
					max_bytes: Xe(o.byte_length),
					...e === void 0 ? {} : { signal: e },
					on_progress: (e) => {
						this.emit({
							phase: "downloading",
							shard_path: o.path,
							downloaded_bytes: a + e.downloaded_bytes,
							total_bytes: i
						});
					}
				});
				a += t.byteLength, this.emit({
					phase: "verifying",
					shard_path: o.path
				});
				let s = await ze(o, t);
				await this.store.put_shard_content(r, s.entry, s.compressed_bytes);
			}
			return await this.store.mark_ready(r.record_id), this.emit({
				phase: "activating",
				data_version: t.data_version
			}), await this.store.activate(r.record_id), this.emit({
				phase: "complete",
				data_version: t.data_version
			}), {
				outcome: "updated",
				data_version: t.data_version,
				package_record_id: r.record_id
			};
		} catch (e) {
			await this.store.rollback_staging(r.record_id).catch(() => void 0);
			let t = e instanceof Error ? e.message : String(e);
			throw this.emit({
				phase: "rolled_back",
				reason: t
			}), e instanceof I ? new q(`Vocabulary package update rejected a shard: ${t}`) : e instanceof DOMException && e.name === "AbortError" ? e : new q(`Vocabulary package update failed and was rolled back: ${t}`);
		}
	}
}, et = 1048576, Y = class extends TypeError {}, X = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogFetchError";
	}
}, tt = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogValidationError";
	}
}, Z = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogPlanError";
	}
};
function nt(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw new Y(`Catalog URL is not a valid absolute URL: ${e}`);
	}
	if (t.protocol !== "https:") throw new Y(`Catalog URL must use the https: scheme, got: ${e}`);
	return t;
}
async function rt(e, t) {
	if (e === null) throw new X("Catalog response has no readable body");
	let n = e.getReader(), r = [], i = 0;
	for (;;) {
		let { done: e, value: a } = await n.read();
		if (e) break;
		if (i += a.byteLength, i > t) throw await n.cancel("bounded_stream_exceeded").catch(() => void 0), new X(`Catalog response exceeded the allowed ${String(t)}-byte bound`);
		r.push(a);
	}
	let a = new Uint8Array(i), o = 0;
	for (let e of r) a.set(e, o), o += e.byteLength;
	try {
		return JSON.parse(new TextDecoder().decode(a));
	} catch {
		throw new X("Catalog response is not valid JSON");
	}
}
function it(e = {}) {
	let t = e.catalog_url ?? "https://huggingface.co/datasets/ITOTII/tavern-canvas-vocabulary/resolve/main/catalog.json";
	nt(t);
	let n = e.fetch_impl ?? fetch, r = e.max_bytes ?? et, i = e.ttl_ms ?? 0, a = null;
	async function o(e = {}) {
		if (a !== null && i > 0 && Date.now() - a.fetched_at_ms < i) return a.entries;
		let o = await n(t, e.signal === void 0 ? {} : { signal: e.signal });
		if (!o.ok) throw new X(`Catalog request failed with status ${String(o.status)}`);
		let s = await rt(o.body, r), c = ne.safeParse(s);
		if (!c.success) throw new tt("Catalog response failed schema validation");
		return i > 0 && (a = {
			entries: c.data,
			fetched_at_ms: Date.now()
		}), c.data;
	}
	return {
		fetch_catalog: o,
		async list_supported_entries(e, t) {
			return (await o(t)).filter((t) => R(e, t.min_extension_version) >= 0);
		}
	};
}
function at(e, t = {}) {
	if (e.bundled === !0) {
		if (t.bundled_base_url === void 0) throw new Z(`Catalog entry "${e.package_id}" is bundled: a bundled_base_url is required to plan its install`);
		return {
			kind: "bundled",
			base_url: t.bundled_base_url
		};
	}
	if (e.base_url === null) throw new Z(`Catalog entry "${e.package_id}" has no base_url and is not marked bundled`);
	return {
		kind: "https",
		base_url: e.base_url
	};
}
//#endregion
//#region ../../packages/vocabulary/src/catalog/catalog_install.ts
var Q = 8388608, $ = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "CatalogInstallError", this.reason = e;
	}
};
function ot(e) {
	let t = e.endsWith("/") ? e : `${e}/`;
	return new URL("manifest.json", t);
}
async function st(e, t, n) {
	let r = await t(e, n === void 0 ? {} : { signal: n });
	if (!r.ok) throw new $("manifest_fetch_failed", `Manifest request failed with status ${String(r.status)}: ${e.href}`);
	if (r.body === null) throw new $("manifest_fetch_failed", `Manifest response for ${e.href} has no readable body`);
	let i = r.body.getReader(), a = [], o = 0;
	for (;;) {
		let { done: t, value: n } = await i.read();
		if (t) break;
		if (o += n.byteLength, o > Q) throw await i.cancel("bounded_stream_exceeded").catch(() => void 0), new $("manifest_fetch_failed", `Manifest response for ${e.href} exceeded the allowed ${String(Q)}-byte bound`);
		a.push(n);
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
function ct(e, t) {
	let n;
	try {
		n = JSON.parse(new TextDecoder().decode(e));
	} catch {
		throw new $("manifest_fetch_failed", `Manifest response for ${t} is not valid JSON`);
	}
	let r = s.safeParse(n);
	if (!r.success) throw new $("manifest_fetch_failed", `Manifest response for ${t} failed schema validation`);
	return r.data;
}
function lt(e, t) {
	return {
		fetch_manifest: () => Promise.resolve(t),
		fetch_shard_bytes: e.fetch_shard_bytes.bind(e)
	};
}
async function ut(n, r) {
	let i = at(n, r.bundled_base_url === void 0 ? {} : { bundled_base_url: r.bundled_base_url }), a = r.fetch_impl ?? fetch;
	r.on_progress?.({ phase: "verifying_catalog_manifest" });
	let o = await st(ot(i.base_url), a, r.signal), s = e(t(o));
	if (s !== n.manifest_sha256) throw new $("manifest_hash_mismatch", `Fetched manifest hash ${s} does not match catalog entry hash ${n.manifest_sha256} for package ${n.package_id}`);
	let c = ct(o, n.package_id);
	if (c.package_id !== n.package_id) throw new $("package_id_mismatch", `Catalog entry declares package_id ${n.package_id} but the fetched manifest declares ${c.package_id}`);
	if (c.data_version !== n.data_version) throw new $("data_version_mismatch", `Catalog entry ${n.package_id} declares data_version ${n.data_version} but the fetched manifest declares ${c.data_version}`);
	let l = lt(y(i, a), c);
	return new $e({
		database: r.database,
		namespace: r.namespace,
		client: l,
		current_extension_version: r.current_extension_version,
		...r.on_progress === void 0 ? {} : { on_progress: r.on_progress }
	}).update(r.signal);
}
//#endregion
//#region src/modules/vocabulary/vocabulary_catalog_client.ts
var dt = "vocabulary", ft = class extends Error {
	constructor() {
		super("A vocabulary package install is already in progress on this client"), this.name = "CatalogInstallBusyError";
	}
}, pt = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = null;
	constructor(e) {
		this.#e = it({
			...e.catalog_url === void 0 ? {} : { catalog_url: e.catalog_url },
			...e.fetch_impl === void 0 ? {} : { fetch_impl: e.fetch_impl },
			...e.ttl_ms === void 0 ? {} : { ttl_ms: e.ttl_ms }
		}), this.#t = e.current_extension_version, this.#n = e.bundled_base_url, this.#r = e.fetch_impl, this.#i = e.open_database_impl ?? ae;
	}
	list() {
		return this.#e.list_supported_entries(this.#t);
	}
	get installing() {
		return this.#a !== null;
	}
	async install(e, t) {
		if (this.#a !== null) throw new ft();
		let n = new AbortController();
		this.#a = n;
		try {
			return await ut(e, {
				database: await this.#i(),
				namespace: dt,
				current_extension_version: this.#t,
				signal: n.signal,
				...t === void 0 ? {} : { on_progress: t },
				...this.#n === void 0 ? {} : { bundled_base_url: this.#n },
				...this.#r === void 0 ? {} : { fetch_impl: this.#r }
			});
		} finally {
			this.#a = null;
		}
	}
	cancel() {
		this.#a?.abort();
	}
};
//#endregion
export { pt as VocabularyCatalogClient };
