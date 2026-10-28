import { n as e, t } from "./sha2-BGNex9vj.js";
import { h as n, i as r, l as i, m as a, r as o, u as s, x as c, y as l } from "./schemas-DMBLWk59.js";
import { n as u } from "./generation-C8k9E8Cm.js";
import { c as d, i as ee, n as f, r as p } from "./vocabulary-BfEyI-lw.js";
import { m } from "./business_repositories-DyAWjr6U.js";
import { a as h, d as g, f as _, l as v, n as y, o as te, r as ne, t as re } from "./package_store-BzGRz-no.js";
//#region ../../packages/contracts/src/vocabulary_catalog.ts
var ie = n().trim().min(2).max(16).regex(/^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/u), ae = a({
	en: n().trim().min(1).max(128),
	"zh-CN": n().trim().min(1).max(128)
}), oe = a({
	en: n().trim().min(1).max(1024),
	"zh-CN": n().trim().min(1).max(1024)
}), se = l().check((e) => {
	URL.canParse(e.value) && new URL(e.value).protocol !== "https:" && e.issues.push({
		code: "custom",
		input: e.value,
		message: "Catalog entry base_url must use the https: scheme"
	});
}), b = a({
	package_id: ee,
	display_name: ae,
	description: oe,
	data_version: d,
	record_count: s().int().nonnegative(),
	compressed_bytes: s().int().nonnegative(),
	manifest_sha256: u,
	languages: o(ie).min(1).max(16),
	min_extension_version: d,
	base_url: se.nullable(),
	bundled: r().optional(),
	updated_at: c({ offset: !1 })
}).check((e) => {
	e.value.bundled !== !0 && e.value.base_url === null && e.issues.push({
		code: "custom",
		input: e.value.base_url,
		message: "base_url must be a non-null https URL unless the entry is bundled",
		path: ["base_url"]
	});
}), x = o(b).min(1).max(500).check((e) => {
	let t = /* @__PURE__ */ new Set();
	e.value.forEach((n, r) => {
		t.has(n.package_id) && e.issues.push({
			code: "custom",
			input: n.package_id,
			message: `duplicate package_id: ${n.package_id}`,
			path: [r, "package_id"]
		}), t.add(n.package_id);
	});
}), S = class extends TypeError {}, C = class extends Error {
	path;
	constructor(e, t) {
		super(t), this.name = "PackageFetchError", this.path = e;
	}
}, w = "manifest.json", ce = 8388608;
function le(e) {
	let t;
	try {
		t = new URL(e.base_url);
	} catch {
		throw new S(`Package source base_url is not a valid absolute URL: ${e.base_url}`);
	}
	if (e.kind === "https" && t.protocol !== "https:") throw new S(`An HTTPS package source must use the https: scheme, got: ${t.protocol}`);
	return t.pathname.endsWith("/") || (t.pathname = `${t.pathname}/`), t.search = "", t.hash = "", t;
}
function T(e, t) {
	return new URL(t, e);
}
async function E(e, t, n, r) {
	if (e === null) throw new C(t, `Response for ${t} has no readable body`);
	let i = e.getReader(), a = [], o = 0;
	for (;;) {
		let { done: e, value: s } = await i.read();
		if (e) break;
		if (o += s.byteLength, o > n) throw await i.cancel("bounded_stream_exceeded").catch(() => void 0), new C(t, `Response for ${t} exceeded the allowed ${String(n)}-byte bound`);
		a.push(s), r?.({
			downloaded_bytes: o,
			total_bytes: n
		});
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
function ue(e, t = fetch) {
	let n = le(e);
	return {
		async fetch_manifest(e) {
			let r = await t(T(n, w), e === void 0 ? {} : { signal: e });
			if (!r.ok) throw new C(w, `Manifest request failed with status ${String(r.status)}`);
			let i = await E(r.body, w, ce), a;
			try {
				a = JSON.parse(new TextDecoder().decode(i));
			} catch {
				throw new C(w, "Manifest response is not valid JSON");
			}
			let o = p.safeParse(a);
			if (!o.success) throw new C(w, "Manifest response failed schema validation");
			return o.data;
		},
		async fetch_shard_bytes(e, r) {
			let i = await t(T(n, e), r.signal === void 0 ? {} : { signal: r.signal });
			if (!i.ok) throw new C(e, `Shard request failed with status ${String(i.status)}: ${e}`);
			return E(i.body, e, r.max_bytes, r.on_progress);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function D(e) {
	return `${e < 0 ? "-" : ""}0x${Math.abs(e).toString(16).padStart(2, "0")}`;
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var O = 16, k = 16, A = class {
	hit = 0;
	miss = 0;
	caches;
	maxKeyLength;
	maxLengthPerKey;
	constructor(e = O, t = k) {
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
		let i = _(e, t, n), a = Uint8Array.prototype.slice.call(e, t, t + n);
		return this.store(a, i), i;
	}
}, j = "array", M = "map_key", N = "map_value", P = (e) => {
	if (typeof e == "string" || typeof e == "number") return e;
	throw new v("The type of key must be string or number but " + typeof e);
}, F = class {
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
		t.type = j, t.position = 0, t.size = e, t.array = Array(e);
	}
	pushMapState(e) {
		let t = this.getUninitializedStateFromPool();
		t.type = M, t.readCount = 0, t.size = e, t.map = {};
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
		if (e.type === j) {
			let t = e;
			t.size = 0, t.array = void 0, t.position = 0, t.type = void 0;
		}
		if (e.type === M || e.type === N) {
			let t = e;
			t.size = 0, t.map = void 0, t.readCount = 0, t.type = void 0;
		}
		this.stackHeadPosition--;
	}
	reset() {
		this.stack.length = 0, this.stackHeadPosition = -1;
	}
}, I = -1, L = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)), R = new Uint8Array(L.buffer);
try {
	L.getInt8(0);
} catch (e) {
	if (!(e instanceof RangeError)) throw Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
var z = /* @__PURE__ */ RangeError("Insufficient data"), B = new A(), V = class e {
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
	view = L;
	bytes = R;
	headByte = I;
	stack = new F();
	entered = !1;
	constructor(e) {
		this.extensionCodec = e?.extensionCodec ?? ne.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.rawStrings = e?.rawStrings ?? !1, this.maxStrLength = e?.maxStrLength ?? 4294967295, this.maxBinLength = e?.maxBinLength ?? 4294967295, this.maxArrayLength = e?.maxArrayLength ?? 4294967295, this.maxMapLength = e?.maxMapLength ?? 4294967295, this.maxExtLength = e?.maxExtLength ?? 4294967295, this.keyDecoder = e?.keyDecoder === void 0 ? B : e.keyDecoder, this.mapKeyConverter = e?.mapKeyConverter ?? P;
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
		this.totalPos = 0, this.headByte = I, this.stack.reset();
	}
	setBuffer(e) {
		let t = y(e);
		this.bytes = t, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength), this.pos = 0;
	}
	appendBuffer(e) {
		if (this.headByte === I && !this.hasRemaining(1)) this.setBuffer(e);
		else {
			let t = this.bytes.subarray(this.pos), n = y(e), r = new Uint8Array(t.length + n.length);
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
			throw RangeError(`Insufficient data in parsing ${D(r)} at ${a} (${i} in the current buffer)`);
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
			} else throw new v(`Unrecognized type byte: ${D(e)}`);
			this.complete();
			let n = this.stack;
			for (; n.length > 0;) {
				let e = n.top();
				if (e.type === j) if (e.array[e.position] = t, e.position++, e.position === e.size) t = e.array, n.release(e);
				else continue DECODE;
				else if (e.type === M) {
					if (t === "__proto__") throw new v("The key __proto__ is not allowed");
					e.key = this.mapKeyConverter(t), e.type = N;
					continue DECODE;
				} else if (e.map[e.key] = t, e.readCount++, e.readCount === e.size) t = e.map, n.release(e);
				else {
					e.key = null, e.type = M;
					continue DECODE;
				}
			}
			return t;
		}
	}
	readHeadByte() {
		return this.headByte === I && (this.headByte = this.readU8()), this.headByte;
	}
	complete() {
		this.headByte = I;
	}
	readArraySize() {
		let e = this.readHeadByte();
		switch (e) {
			case 220: return this.readU16();
			case 221: return this.readU32();
			default:
				if (e < 160) return e - 144;
				throw new v(`Unrecognized array type byte: ${D(e)}`);
		}
	}
	pushMapState(e) {
		if (e > this.maxMapLength) throw new v(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
		this.stack.pushMapState(e);
	}
	pushArrayState(e) {
		if (e > this.maxArrayLength) throw new v(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
		this.stack.pushArrayState(e);
	}
	decodeString(e, t) {
		return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, t) : this.decodeBinary(e, t);
	}
	decodeUtf8String(e, t) {
		if (e > this.maxStrLength) throw new v(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
		if (this.bytes.byteLength < this.pos + t + e) throw z;
		let n = this.pos + t, r;
		return r = this.stateIsMapKey() && this.keyDecoder?.canBeCached(e) ? this.keyDecoder.decode(this.bytes, n, e) : g(this.bytes, n, e), this.pos += t + e, r;
	}
	stateIsMapKey() {
		return this.stack.length > 0 && this.stack.top().type === M;
	}
	decodeBinary(e, t) {
		if (e > this.maxBinLength) throw new v(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
		if (!this.hasRemaining(e + t)) throw z;
		let n = this.pos + t, r = this.bytes.subarray(n, n + e);
		return this.pos += t + e, r;
	}
	decodeExtension(e, t) {
		if (e > this.maxExtLength) throw new v(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
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
		let e = te(this.view, this.pos);
		return this.pos += 8, e;
	}
	readI64() {
		let e = h(this.view, this.pos);
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
function H(e, t) {
	return new V(t).decode(e);
}
//#endregion
//#region ../../packages/vocabulary/src/package_verifier.ts
var U = class extends Error {
	reason;
	path;
	constructor(e, t, n) {
		super(t), this.name = "PackageVerificationError", this.reason = e, this.path = n;
	}
}, de = 128, fe = 65536, pe = 33554432;
function W(e) {
	return Math.min(pe, Math.max(e * de, fe));
}
function me(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
function G(e, t) {
	let [n, r] = K(e), [i, a] = K(t);
	for (let e = 0; e < 3; e += 1) {
		let t = n[e] ?? 0, r = i[e] ?? 0;
		if (t !== r) return t < r ? -1 : 1;
	}
	return r === void 0 && a === void 0 ? 0 : r === void 0 ? 1 : a === void 0 ? -1 : he(r, a);
}
function K(e) {
	let [t, n] = (e.split("+")[0] ?? e).split("-", 2), r = t.split(".").map((e) => Number.parseInt(e, 10));
	return [[
		r[0] ?? 0,
		r[1] ?? 0,
		r[2] ?? 0
	], n];
}
function he(e, t) {
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
var ge = i({ kind: f });
function _e(e, t) {
	if (me(e) !== 1) throw new U("unsupported_schema", "Manifest declares an unsupported schema_version");
	let n = p.safeParse(e);
	if (!n.success) throw new U("invalid_manifest", "Manifest failed schema validation");
	let r = n.data;
	if (G(t.current_extension_version, r.minimum_extension_version) < 0) throw new U("extension_version_too_low", `Extension version ${t.current_extension_version} is below the package's minimum ${r.minimum_extension_version}`);
	let i = /* @__PURE__ */ new Set();
	for (let e of r.shards) {
		if (i.has(e.path)) throw new U("duplicate_shard_path", `Duplicate shard path in manifest: ${e.path}`, e.path);
		i.add(e.path);
	}
	return r;
}
async function ve(e, t) {
	let n = W(t.byte_length), r = new Response(new Uint8Array(e)).body;
	if (r === null) throw new U("corrupt_gzip", `No readable body for ${t.path}`, t.path);
	let i = r.pipeThrough(new DecompressionStream("gzip")).getReader(), a = [], o = 0;
	try {
		for (;;) {
			let { done: e, value: r } = await i.read();
			if (e) break;
			if (o += r.byteLength, o > n) throw await i.cancel("decompressed_size_exceeded").catch(() => void 0), new U("decompressed_size_exceeded", `Decompressed size of ${t.path} exceeds the allowed bound`, t.path);
			a.push(r);
		}
	} catch (e) {
		throw e instanceof U ? e : new U("corrupt_gzip", `Corrupt gzip stream for ${t.path}: ${e instanceof Error ? e.message : String(e)}`, t.path);
	}
	let s = new Uint8Array(o), c = 0;
	for (let e of a) s.set(e, c), c += e.byteLength;
	return s;
}
async function ye(n, r) {
	if (r.byteLength !== n.byte_length) throw new U("byte_length_mismatch", `Declared byte_length ${String(n.byte_length)} does not match downloaded size ${String(r.byteLength)} for ${n.path}`, n.path);
	if (e(t(r)) !== n.sha256) throw new U("hash_mismatch", `SHA-256 mismatch for ${n.path}`, n.path);
	let i = await ve(r, n), a;
	try {
		a = H(i);
	} catch (e) {
		throw new U("corrupt_messagepack", `MessagePack decode failed for ${n.path}: ${e instanceof Error ? e.message : String(e)}`, n.path);
	}
	let o = ge.safeParse(a);
	if (!o.success) throw new U("corrupt_messagepack", `Decoded shard content for ${n.path} is not a valid envelope`, n.path);
	if (o.data.kind !== n.kind) throw new U("wrong_shard_kind", `Shard ${n.path} declares kind "${n.kind}" but content is "${o.data.kind}"`, n.path);
	return {
		entry: n,
		compressed_bytes: r
	};
}
//#endregion
//#region ../../packages/vocabulary/src/package_updater.ts
var q = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageUpdateError";
	}
}, be = 65536;
function xe(e) {
	return e + be;
}
function Se(e, t) {
	if (e.data_version !== t.data_version || e.shards.length !== t.shards.length) return !1;
	let n = new Map(e.shards.map((e) => [e.path, e.sha256]));
	return t.shards.every((e) => n.get(e.path) === e.sha256);
}
function Ce(e, t) {
	let n = new Map(e?.manifest.shards.map((e) => [e.path, e.sha256]) ?? []);
	return t.shards.reduce((e, t) => n.get(t.path) === t.sha256 ? e : e + t.byte_length, 0);
}
function J(e) {
	if (e?.aborted === !0) throw new DOMException("Vocabulary package update was aborted", "AbortError");
}
var we = class {
	store;
	client;
	current_extension_version;
	on_progress;
	tail = Promise.resolve();
	constructor(e) {
		this.store = new re(e.database, e.namespace), this.client = e.client, this.current_extension_version = e.current_extension_version, this.on_progress = e.on_progress;
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
		let t = _e(await this.client.fetch_manifest(e), { current_extension_version: this.current_extension_version }), n = await this.store.find_active_or_confirmed();
		if (n !== null && Se(n.manifest, t)) return this.emit({
			phase: "up_to_date",
			data_version: t.data_version
		}), {
			outcome: "up_to_date",
			data_version: t.data_version
		};
		let r = await this.store.create_staging_package(t), i = Ce(n, t), a = 0;
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
					max_bytes: xe(o.byte_length),
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
				let s = await ye(o, t);
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
			}), e instanceof U ? new q(`Vocabulary package update rejected a shard: ${t}`) : e instanceof DOMException && e.name === "AbortError" ? e : new q(`Vocabulary package update failed and was rolled back: ${t}`);
		}
	}
}, Te = 1048576, Y = class extends TypeError {}, X = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogFetchError";
	}
}, Ee = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogValidationError";
	}
}, Z = class extends Error {
	constructor(e) {
		super(e), this.name = "CatalogPlanError";
	}
};
function De(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw new Y(`Catalog URL is not a valid absolute URL: ${e}`);
	}
	if (t.protocol !== "https:") throw new Y(`Catalog URL must use the https: scheme, got: ${e}`);
	return t;
}
async function Oe(e, t) {
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
function ke(e = {}) {
	let t = e.catalog_url ?? "https://huggingface.co/datasets/ITOTIY/tavern-canvas-vocabulary/resolve/main/catalog.json";
	De(t);
	let n = e.fetch_impl ?? fetch, r = e.max_bytes ?? Te, i = e.ttl_ms ?? 0, a = null;
	async function o(e = {}) {
		if (a !== null && i > 0 && Date.now() - a.fetched_at_ms < i) return a.entries;
		let o = await n(t, e.signal === void 0 ? {} : { signal: e.signal });
		if (!o.ok) throw new X(`Catalog request failed with status ${String(o.status)}`);
		let s = await Oe(o.body, r), c = x.safeParse(s);
		if (!c.success) throw new Ee("Catalog response failed schema validation");
		return i > 0 && (a = {
			entries: c.data,
			fetched_at_ms: Date.now()
		}), c.data;
	}
	return {
		fetch_catalog: o,
		async list_supported_entries(e, t) {
			return (await o(t)).filter((t) => G(e, t.min_extension_version) >= 0);
		}
	};
}
function Ae(e, t = {}) {
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
function je(e) {
	let t = e.endsWith("/") ? e : `${e}/`;
	return new URL("manifest.json", t);
}
async function Me(e, t, n) {
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
function Ne(e, t) {
	let n;
	try {
		n = JSON.parse(new TextDecoder().decode(e));
	} catch {
		throw new $("manifest_fetch_failed", `Manifest response for ${t} is not valid JSON`);
	}
	let r = p.safeParse(n);
	if (!r.success) throw new $("manifest_fetch_failed", `Manifest response for ${t} failed schema validation`);
	return r.data;
}
function Pe(e, t) {
	return {
		fetch_manifest: () => Promise.resolve(t),
		fetch_shard_bytes: e.fetch_shard_bytes.bind(e)
	};
}
async function Fe(n, r) {
	let i = Ae(n, r.bundled_base_url === void 0 ? {} : { bundled_base_url: r.bundled_base_url }), a = r.fetch_impl ?? fetch;
	r.on_progress?.({ phase: "verifying_catalog_manifest" });
	let o = await Me(je(i.base_url), a, r.signal), s = e(t(o));
	if (s !== n.manifest_sha256) throw new $("manifest_hash_mismatch", `Fetched manifest hash ${s} does not match catalog entry hash ${n.manifest_sha256} for package ${n.package_id}`);
	let c = Ne(o, n.package_id);
	if (c.package_id !== n.package_id) throw new $("package_id_mismatch", `Catalog entry declares package_id ${n.package_id} but the fetched manifest declares ${c.package_id}`);
	if (c.data_version !== n.data_version) throw new $("data_version_mismatch", `Catalog entry ${n.package_id} declares data_version ${n.data_version} but the fetched manifest declares ${c.data_version}`);
	let l = Pe(ue(i, a), c);
	return new we({
		database: r.database,
		namespace: r.namespace,
		client: l,
		current_extension_version: r.current_extension_version,
		...r.on_progress === void 0 ? {} : { on_progress: r.on_progress }
	}).update(r.signal);
}
//#endregion
//#region src/modules/vocabulary/vocabulary_catalog_client.ts
var Ie = "vocabulary", Le = class extends Error {
	constructor() {
		super("A vocabulary package install is already in progress on this client"), this.name = "CatalogInstallBusyError";
	}
}, Re = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = null;
	constructor(e) {
		this.#e = ke({
			...e.catalog_url === void 0 ? {} : { catalog_url: e.catalog_url },
			...e.fetch_impl === void 0 ? {} : { fetch_impl: e.fetch_impl },
			...e.ttl_ms === void 0 ? {} : { ttl_ms: e.ttl_ms }
		}), this.#t = e.current_extension_version, this.#n = e.bundled_base_url, this.#r = e.fetch_impl, this.#i = e.open_database_impl ?? m;
	}
	list() {
		return this.#e.list_supported_entries(this.#t);
	}
	get installing() {
		return this.#a !== null;
	}
	async install(e, t) {
		if (this.#a !== null) throw new Le();
		let n = new AbortController();
		this.#a = n;
		try {
			return await Fe(e, {
				database: await this.#i(),
				namespace: Ie,
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
export { Re as VocabularyCatalogClient };
