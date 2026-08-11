import { n as e, r as t } from "./rolldown-runtime-B0aSnxlc.js";
import { n, t as r } from "./sha2-BGNex9vj.js";
import { c as i, ct as a, d as o, f as s, ht as c, l, mt as u, n as ee, o as te, p as d, r as ne, s as re, st as f, t as p, u as ie, vt as m, yt as h } from "./src-CLzfjths.js";
import { C as ae, k as g } from "./job_repository-DB1y8cIh.js";
import { d as _, i as oe, r as se } from "./business_repositories-cGxFpOW9.js";
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function ce(e) {
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
function le(e, t, n) {
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
var ue = new TextEncoder(), v = 50;
function de(e, t, n) {
	ue.encodeInto(e, t.subarray(n));
}
function fe(e, t, n) {
	e.length > v ? de(e, t, n) : le(e, t, n);
}
var pe = 4096;
function y(e, t, n) {
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
		a.length >= pe && (o += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (o += String.fromCharCode(...a)), o;
}
var me = new TextDecoder(), he = 200;
function ge(e, t, n) {
	let r = e.subarray(t, t + n);
	return me.decode(r);
}
function _e(e, t, n) {
	return n > he ? ge(e, t, n) : y(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var b = class {
	type;
	data;
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, x = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
}, ve = 4294967295;
function ye(e, t, n) {
	let r = n / 4294967296, i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function S(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function C(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function be(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var xe = 4294967295, Se = 17179869183;
function Ce({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= Se) if (t === 0 && e <= xe) {
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = /* @__PURE__ */ new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	{
		let n = /* @__PURE__ */ new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), S(r, 4, e), n;
	}
}
function we(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function w(e) {
	return e instanceof Date ? Ce(we(e)) : null;
}
function T(e) {
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
		default: throw new x(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function E(e) {
	let t = T(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var D = {
	type: -1,
	encode: w,
	decode: E
}, O = class e {
	static defaultCodec = new e();
	__brand;
	builtInEncoders = [];
	builtInDecoders = [];
	encoders = [];
	decoders = [];
	constructor() {
		this.register(D);
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
				if (i != null) return new b(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new b(n, i);
			}
		}
		return e instanceof b ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new b(t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function k(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function A(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : k(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
var Te = class e {
	extensionCodec;
	context;
	useBigInt64;
	maxDepth;
	initialBufferSize;
	sortKeys;
	forceFloat32;
	ignoreUndefined;
	forceIntegerToFloat;
	pos;
	view;
	bytes;
	entered = !1;
	constructor(e) {
		this.extensionCodec = e?.extensionCodec ?? O.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? 100, this.initialBufferSize = e?.initialBufferSize ?? 2048, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
	}
	clone() {
		return new e({
			extensionCodec: this.extensionCodec,
			context: this.context,
			useBigInt64: this.useBigInt64,
			maxDepth: this.maxDepth,
			initialBufferSize: this.initialBufferSize,
			sortKeys: this.sortKeys,
			forceFloat32: this.forceFloat32,
			ignoreUndefined: this.ignoreUndefined,
			forceIntegerToFloat: this.forceIntegerToFloat
		});
	}
	reinitializeState() {
		this.pos = 0;
	}
	encodeSharedRef(e) {
		if (this.entered) return this.clone().encodeSharedRef(e);
		try {
			return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
		} finally {
			this.entered = !1;
		}
	}
	encode(e) {
		if (this.entered) return this.clone().encode(e);
		try {
			return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
		} finally {
			this.entered = !1;
		}
	}
	doEncode(e, t) {
		if (t > this.maxDepth) throw Error(`Too deep objects in depth ${t}`);
		e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e) : this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.useBigInt64 && typeof e == "bigint" ? this.encodeBigInt64(e) : this.encodeObject(e, t);
	}
	ensureBufferSizeToWrite(e) {
		let t = this.pos + e;
		this.view.byteLength < t && this.resizeBuffer(t * 2);
	}
	resizeBuffer(e) {
		let t = new ArrayBuffer(e), n = new Uint8Array(t), r = new DataView(t);
		n.set(this.bytes), this.view = r, this.bytes = n;
	}
	encodeNil() {
		this.writeU8(192);
	}
	encodeBoolean(e) {
		e === !1 ? this.writeU8(194) : this.writeU8(195);
	}
	encodeNumber(e) {
		!this.forceIntegerToFloat && Number.isSafeInteger(e) ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(211), this.writeI64(e)) : this.encodeNumberAsFloat(e);
	}
	encodeNumberAsFloat(e) {
		this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
	}
	encodeBigInt64(e) {
		e >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e)) : (this.writeU8(211), this.writeBigInt64(e));
	}
	writeStringHeader(e) {
		if (e < 32) this.writeU8(160 + e);
		else if (e < 256) this.writeU8(217), this.writeU8(e);
		else if (e < 65536) this.writeU8(218), this.writeU16(e);
		else if (e < 4294967296) this.writeU8(219), this.writeU32(e);
		else throw Error(`Too long string: ${e} bytes in UTF-8`);
	}
	encodeString(e) {
		let t = ce(e);
		this.ensureBufferSizeToWrite(5 + t), this.writeStringHeader(t), fe(e, this.bytes, this.pos), this.pos += t;
	}
	encodeObject(e, t) {
		let n = this.extensionCodec.tryToEncode(e, this.context);
		if (n != null) this.encodeExtension(n);
		else if (Array.isArray(e)) this.encodeArray(e, t);
		else if (ArrayBuffer.isView(e)) this.encodeBinary(e);
		else if (typeof e == "object") this.encodeMap(e, t);
		else throw Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
	}
	encodeBinary(e) {
		let t = e.byteLength;
		if (t < 256) this.writeU8(196), this.writeU8(t);
		else if (t < 65536) this.writeU8(197), this.writeU16(t);
		else if (t < 4294967296) this.writeU8(198), this.writeU32(t);
		else throw Error(`Too large binary: ${t}`);
		let n = A(e);
		this.writeU8a(n);
	}
	encodeArray(e, t) {
		let n = e.length;
		if (n < 16) this.writeU8(144 + n);
		else if (n < 65536) this.writeU8(220), this.writeU16(n);
		else if (n < 4294967296) this.writeU8(221), this.writeU32(n);
		else throw Error(`Too large array: ${n}`);
		for (let n of e) this.doEncode(n, t + 1);
	}
	countWithoutUndefined(e, t) {
		let n = 0;
		for (let r of t) e[r] !== void 0 && n++;
		return n;
	}
	encodeMap(e, t) {
		let n = Object.keys(e);
		this.sortKeys && n.sort();
		let r = this.ignoreUndefined ? this.countWithoutUndefined(e, n) : n.length;
		if (r < 16) this.writeU8(128 + r);
		else if (r < 65536) this.writeU8(222), this.writeU16(r);
		else if (r < 4294967296) this.writeU8(223), this.writeU32(r);
		else throw Error(`Too large map object: ${r}`);
		for (let r of n) {
			let n = e[r];
			this.ignoreUndefined && n === void 0 || (this.encodeString(r), this.doEncode(n, t + 1));
		}
	}
	encodeExtension(e) {
		if (typeof e.data == "function") {
			let t = e.data(this.pos + 6), n = t.length;
			if (n >= 4294967296) throw Error(`Too large extension object: ${n}`);
			this.writeU8(201), this.writeU32(n), this.writeI8(e.type), this.writeU8a(t);
			return;
		}
		let t = e.data.length;
		if (t === 1) this.writeU8(212);
		else if (t === 2) this.writeU8(213);
		else if (t === 4) this.writeU8(214);
		else if (t === 8) this.writeU8(215);
		else if (t === 16) this.writeU8(216);
		else if (t < 256) this.writeU8(199), this.writeU8(t);
		else if (t < 65536) this.writeU8(200), this.writeU16(t);
		else if (t < 4294967296) this.writeU8(201), this.writeU32(t);
		else throw Error(`Too large extension object: ${t}`);
		this.writeI8(e.type), this.writeU8a(e.data);
	}
	writeU8(e) {
		this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
	}
	writeU8a(e) {
		let t = e.length;
		this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
	}
	writeI8(e) {
		this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
	}
	writeU16(e) {
		this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
	}
	writeI16(e) {
		this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
	}
	writeU32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
	}
	writeI32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
	}
	writeF32(e) {
		this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
	}
	writeF64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
	}
	writeU64(e) {
		this.ensureBufferSizeToWrite(8), ye(this.view, this.pos, e), this.pos += 8;
	}
	writeI64(e) {
		this.ensureBufferSizeToWrite(8), S(this.view, this.pos, e), this.pos += 8;
	}
	writeBigUint64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
	}
	writeBigInt64(e) {
		this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function Ee(e, t) {
	return new Te(t).encodeSharedRef(e);
}
var De = /* @__PURE__ */ new Set([
	"staging",
	"ready",
	"active",
	"confirmed",
	"superseded",
	"failed"
]), j = /* @__PURE__ */ new Set(["active", "confirmed"]), M = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageStoreError";
	}
};
function N(e) {
	if (!De.has(e)) throw new M(`Unknown vocabulary package state: ${e}`);
	return e;
}
function Oe(e) {
	if (typeof e != "string") throw new M(`Expected a semver data_version string, got a number: ${String(e)}`);
	return e;
}
var ke = m({
	package_id: i,
	changelog: h().min(1).max(4096),
	record_count: u().int().nonnegative(),
	compressed_size: u().int().nonnegative(),
	minimum_extension_version: ie,
	shard_entries: f(o),
	pinned: a(),
	confirmed_at: ae.optional()
}), Ae = m({
	package_record_id: h().min(1),
	shard_id: h().min(1),
	path: s,
	sha256: h().regex(/^[a-f0-9]{64}$/u),
	byte_length: u().int().nonnegative(),
	bytes_base64: h().min(1)
});
function P(e) {
	let t = ke.safeParse(e);
	if (!t.success) throw new M("Stored vocabulary package payload failed validation");
	return t.data;
}
function F(e) {
	let t = Ae.safeParse(e);
	if (!t.success) throw new M("Stored vocabulary shard payload failed validation");
	return t.data;
}
function I(e) {
	return g({
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
function je(e) {
	return g({ ...e });
}
function Me(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function Ne(e) {
	let t = atob(e);
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function Pe(e, t) {
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
function L(e) {
	let t = P(e.payload);
	return {
		record_id: e.id,
		state: N(e.state),
		pinned: t.pinned,
		confirmed_at: t.confirmed_at,
		manifest: Pe(Oe(e.data_version), t)
	};
}
var R = class {
	database;
	namespace;
	packages;
	shards;
	shard_index_cache = null;
	cache_active_package;
	active_package_cache = void 0;
	constructor(e, t, n = {}) {
		this.database = e, this.namespace = t, this.packages = new se(e), this.shards = new oe(e), this.cache_active_package = n.cache_active_package ?? !1;
	}
	invalidate_caches() {
		this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async list_packages() {
		return (await this.packages.list(this.namespace)).map(L);
	}
	async find_active_or_confirmed() {
		if (this.cache_active_package && this.active_package_cache !== void 0) return this.active_package_cache;
		let e = (await this.list_packages()).find((e) => j.has(e.state)) ?? null;
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
			payload: I({
				package_id: e.package_id,
				changelog: e.changelog,
				record_count: e.record_count,
				compressed_size: e.compressed_size,
				minimum_extension_version: e.minimum_extension_version,
				shard_entries: e.shards,
				pinned: !1
			})
		};
		return await this.packages.create(this.namespace, r), this.invalidate_active_package_cache(), L(r);
	}
	async put_shard_content(e, t, n) {
		await this.create_shard_record(e, t, Me(n));
	}
	async copy_shard(e, t, n) {
		let r = await this.find_shard_record(n, t.path);
		if (r === null) throw new M(`No source shard to copy for path: ${t.path}`);
		if (r.payload.sha256 !== t.sha256) throw new M(`Source shard content hash does not match the target manifest entry for ${t.path}`);
		await this.create_shard_record(e, t, r.payload.bytes_base64);
	}
	async mark_ready(e) {
		await this.transition_state(e, "ready");
	}
	async activate(e) {
		return _(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = null;
			for (let i of n) i.id !== e && j.has(N(i.state)) && (await this.packages.update(this.namespace, {
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
		if (N(t.state) !== "active") throw new M(`Cannot confirm package ${e}: state is "${t.state}", not "active"`);
		await this.transition_state(e, "confirmed", { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
	}
	async reselect_prior_confirmed(e) {
		return _(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = n.filter((t) => t.id !== e).map((e) => ({
				record: e,
				payload: P(e.payload)
			})).filter(({ record: e, payload: t }) => N(e.state) === "superseded" && t.confirmed_at !== void 0).sort((e, t) => (t.payload.confirmed_at ?? "").localeCompare(e.payload.confirmed_at ?? ""))[0], i = n.find((t) => t.id === e);
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
			return await this.packages.update(this.namespace, a, t), L(a);
		});
	}
	async rollback_staging(e) {
		let t = await this.list_owned_shards(e);
		await _(this.database, ["vocabulary_packages", "vocabulary_shards"], async (n) => {
			for (let e of t) await this.shards.delete(this.namespace, e.id, n);
			await this.packages.delete(this.namespace, e, n);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async cleanup_stale() {
		let e = (await this.packages.list(this.namespace)).filter((e) => {
			let t = P(e.payload), n = N(e.state);
			return (n === "superseded" || n === "failed") && !t.pinned;
		}), t = new Set(e.map((e) => e.id)), n = (await this.shards.list(this.namespace)).filter((e) => t.has(F(e.payload).package_record_id));
		return await _(this.database, ["vocabulary_packages", "vocabulary_shards"], async (t) => {
			for (let e of n) await this.shards.delete(this.namespace, e.id, t);
			for (let n of e) await this.packages.delete(this.namespace, n.id, t);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache(), { deleted_package_ids: [...t] };
	}
	async set_pinned(e, t) {
		let n = await this.require_record(e), r = P(n.payload);
		await this.packages.update(this.namespace, {
			...n,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: I({
				...r,
				pinned: t
			})
		}), this.invalidate_active_package_cache();
	}
	async manifest() {
		let e = await this.find_active_or_confirmed();
		if (e === null) throw new M(`No active vocabulary package in namespace: ${this.namespace}`);
		return e.manifest;
	}
	async shard_bytes(e) {
		let t = await this.find_active_or_confirmed();
		if (t === null) throw new M(`No active vocabulary package in namespace: ${this.namespace}`);
		let i = t.manifest.shards.find((t) => t.path === e);
		if (i === void 0) throw new M(`No shard manifest entry for path: ${e}`);
		let a = await this.find_shard_record(t.record_id, e);
		if (a === null) throw new M(`No shard bytes stored for path: ${e}`);
		if (a.payload.byte_length !== i.byte_length || a.payload.sha256 !== i.sha256) throw new M(`Stored shard metadata for ${e} does not match the active manifest`);
		let o = Ne(a.payload.bytes_base64);
		if (o.byteLength !== i.byte_length) throw new M(`Stored shard bytes for ${e} do not match the manifest byte_length`);
		if (n(r(o)) !== i.sha256) throw new M(`Stored shard bytes for ${e} do not match the manifest SHA-256`);
		return o;
	}
	async create_shard_record(e, t, n) {
		let r = (/* @__PURE__ */ new Date()).toISOString(), i = crypto.randomUUID(), a = te.parse(t.kind), o = {
			schema_version: 1,
			id: i,
			namespace: this.namespace,
			record_key: `${this.namespace}:${i}`,
			created_at: r,
			updated_at: r,
			data_version: e.manifest.data_version,
			kind: a,
			payload: je({
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
		return (await this.shards.list(this.namespace)).filter((t) => F(t.payload).package_record_id === e);
	}
	async get_shard_index() {
		if (this.shard_index_cache === null) {
			let e = await this.shards.list(this.namespace), t = /* @__PURE__ */ new Map();
			for (let n of e) {
				let e = F(n.payload);
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
			payload: F(r.payload)
		};
	}
	async require_record(e, t) {
		let n = await this.packages.get(this.namespace, e, t);
		if (n === null) throw new M(`No vocabulary package record ${e} in namespace ${this.namespace}`);
		return n;
	}
	async transition_state(e, t, n = {}) {
		let r = await this.require_record(e), i = P(r.payload);
		await this.packages.update(this.namespace, {
			...r,
			state: t,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: I({
				...i,
				...n.confirmed_at === void 0 ? {} : { confirmed_at: n.confirmed_at }
			})
		}), this.invalidate_active_package_cache();
	}
};
//#endregion
//#region ../../packages/vocabulary/src/search/query_normalizer.ts
function z(e, t) {
	return Array.from(e).slice(0, t).join("");
}
//#endregion
//#region ../../packages/vocabulary/src/search/shard_codec.ts
function B(e) {
	return new Uint8Array(e);
}
async function Fe(e) {
	if (typeof CompressionStream < "u") {
		let t = new Blob([B(e)]).stream().pipeThrough(new CompressionStream("gzip"));
		return new Uint8Array(await new Response(t).arrayBuffer());
	}
	let n = await import("./__vite-browser-external-BApYF4Nn.js").then((e) => /* @__PURE__ */ t(e.default, 1));
	return new Uint8Array(n.gzipSync(e, { level: 9 }));
}
async function Ie(e) {
	return Fe(Ee(e));
}
//#endregion
//#region ../../packages/vocabulary/src/import/import_source.ts
var V = l.omit({ record_id: !0 }), H = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportSourceFormatError";
	}
};
function U(e) {
	return e instanceof Error ? e.message : String(e);
}
function Le(e) {
	let t = [], n = [];
	return e.split(/\r?\n/u).forEach((e, r) => {
		let i = e.trim();
		if (i.length === 0) return;
		let a = r + 1, o;
		try {
			o = JSON.parse(i);
		} catch (e) {
			n.push({
				position: a,
				reason: `not valid JSON: ${U(e)}`
			});
			return;
		}
		let s = V.safeParse(o);
		if (!s.success) {
			n.push({
				position: a,
				reason: s.error.message
			});
			return;
		}
		t.push(s.data);
	}), {
		records: t,
		malformed: n
	};
}
var Re = {
	format: "tavern_canvas_jsonl",
	parse_batch: Le
}, ze = c({
	id_index: u().int(),
	name: h()
}), Be = c({
	id_index: u().int(),
	name: h(),
	subgroups: f(ze).default([])
}), Ve = c({
	subgroup_id: u().int().optional(),
	text: h().optional(),
	desc: h().optional()
}), He = c({
	tag_groups: f(Be),
	tag_tags: f(Ve)
}), Ue = "nsfw";
function We(e) {
	return e.tag_groups.length === 1 && e.tag_groups[0]?.subgroups.length === 0;
}
function Ge(e, t) {
	if (We(e)) return Ue;
	if (t !== void 0) return e.tag_groups.find((e) => e.subgroups.some((e) => e.id_index === t))?.name;
}
function Ke(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch (e) {
		throw new H(`legacy_v2 batch is not valid JSON: ${U(e)}`);
	}
	let n = He.safeParse(t);
	if (!n.success) throw new H(`legacy_v2 batch does not have the { tag_groups, tag_tags } shape: ${n.error.message}`);
	let r = n.data, i = [], a = [];
	return r.tag_tags.forEach((e, t) => {
		let n = t + 1, o = e.text?.trim();
		if (o === void 0 || o.length === 0) {
			a.push({
				position: n,
				reason: "missing or empty text"
			});
			return;
		}
		let s = Ge(r, e.subgroup_id), c = e.desc?.trim(), l = {
			tag: o,
			aliases: [],
			popularity: 0,
			...c !== void 0 && c.length > 0 ? { translation: c } : {},
			...s === void 0 ? {} : { category: s }
		}, u = V.safeParse(l);
		if (!u.success) {
			a.push({
				position: n,
				reason: u.error.message
			});
			return;
		}
		i.push(u.data);
	}), {
		records: i,
		malformed: a
	};
}
var qe = {
	tavern_canvas_jsonl: Re,
	legacy_v2: {
		format: "legacy_v2",
		parse_batch: Ke
	}
}, W = 2, G = 3;
function K(e, t) {
	let n = e.codePointAt(t);
	if (n === void 0) throw RangeError(`no code point at index ${String(t)} of "${e}"`);
	return n;
}
function q(e, t) {
	let n = 0, r = 0;
	for (; n < e.length && r < t.length;) {
		let i = K(e, n), a = K(t, r);
		if (i !== a) return i - a;
		n += i > 65535 ? 2 : 1, r += a > 65535 ? 2 : 1;
	}
	return e.length - n - (t.length - r);
}
function J(e) {
	let t = new TextEncoder().encode(e);
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
function Je(e) {
	e.sort(([e, t, n], [r, i, a]) => {
		let o = q(e, r);
		return o === 0 ? n === a ? t - i : a - n : o;
	});
}
function Y(e, t, n) {
	return [...e.entries()].sort(([e], [t]) => q(e, t)).map(([e, r]) => (Je(r), {
		shard_id: `${t}:${e}`,
		kind: t,
		path: `${t}/${n(e)}.msgpack.gz`,
		payload: {
			kind: t,
			entries: r
		}
	}));
}
function Ye(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = d(n.tag);
		if (e.length === 0) continue;
		let r = z(e, W), i = t.get(r) ?? [];
		i.push([
			e,
			n.record_id,
			n.popularity
		]), t.set(r, i);
	}
	return Y(t, "prefix", J);
}
function Xe(e) {
	return e.translation === void 0 ? e.aliases : [...e.aliases, e.translation];
}
function Ze(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e) for (let e of Xe(r)) {
		let i = d(e);
		if (i.length === 0) continue;
		let a = t.get(i) ?? /* @__PURE__ */ new Set();
		if (t.set(i, a), a.has(r.record_id)) continue;
		a.add(r.record_id);
		let o = ne(z(i, 2)), s = n.get(o) ?? [];
		s.push([
			i,
			r.record_id,
			r.popularity
		]), n.set(o, s);
	}
	return Y(n, "alias", (e) => e);
}
function Qe(e) {
	let t = Array.from(e), n = [];
	for (let e = 0; e + G <= t.length; e += 1) n.push(t.slice(e, e + G).join(""));
	return n;
}
function $e(e) {
	let t = [], n = 0;
	return e.forEach((e, r) => {
		t.push(r === 0 ? e : e - n), n = e;
	}), t;
}
function et(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = d(n.tag);
		for (let r of Qe(e)) {
			let e = t.get(r) ?? /* @__PURE__ */ new Set();
			e.add(n.record_id), t.set(r, e);
		}
	}
	let n = /* @__PURE__ */ new Map();
	for (let [e, r] of t) {
		let t = z(e, W), i = [...r].sort((e, t) => e - t), a = n.get(t) ?? [];
		a.push([e, $e(i)]), n.set(t, a);
	}
	return [...n.entries()].sort(([e], [t]) => q(e, t)).map(([e, t]) => (t.sort(([e], [t]) => q(e, t)), {
		shard_id: `trigram:${e}`,
		kind: "trigram",
		path: `trigram/${J(e)}.msgpack.gz`,
		payload: {
			kind: "trigram",
			entries: t
		}
	}));
}
function tt(e) {
	let t = [...e].sort((e, t) => e.record_id - t.record_id), n = [];
	for (let e = 0; e < t.length; e += p) {
		let r = t.slice(e, e + p), i = r[0];
		if (i === void 0) continue;
		let a = i.record_id;
		n.push({
			shard_id: `detail:${String(a)}`,
			kind: "detail",
			path: `detail/${String(a)}.msgpack.gz`,
			payload: {
				kind: "detail",
				start_id: a,
				records: r
			}
		});
	}
	return n;
}
function nt(e) {
	let t = [...e].sort((e, t) => e.popularity === t.popularity ? e.record_id - t.record_id : t.popularity - e.popularity), n = t.slice(0, ee).map((e) => e.record_id), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		if (e.category === void 0) continue;
		let t = r.get(e.category) ?? [];
		t.length < 500 && t.push(e.record_id), r.set(e.category, t);
	}
	let i = {};
	for (let [e, t] of [...r.entries()].sort(([e], [t]) => q(e, t))) i[e] = t;
	return {
		shard_id: "hot:global",
		kind: "hot",
		path: "hot/global.msgpack.gz",
		payload: {
			kind: "hot",
			global: n,
			by_category: i
		}
	};
}
function rt(e) {
	return [
		...Ye(e),
		...Ze(e),
		...et(e),
		...tt(e),
		nt(e)
	];
}
async function it(e, t) {
	let i = await Ie(t.payload);
	return {
		entry: {
			shard_id: t.shard_id,
			package_id: e,
			kind: t.kind,
			path: t.path,
			sha256: n(r(i)),
			byte_length: i.byteLength
		},
		bytes: i
	};
}
//#endregion
//#region ../../packages/vocabulary/src/import/import_builder.ts
var at = 8388608, ot = 2e5, st = 32, X = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportSizeLimitError";
	}
}, Z = class extends Error {
	constructor() {
		super("vocabulary import was cancelled"), this.name = "ImportCancelledError";
	}
}, Q = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportBuilderError";
	}
};
function $(e, t, n) {
	return e === void 0 ? t : (t === void 0 || t === e || n(), e);
}
function ct(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = d(n), r = t.get(e);
		(r === void 0 || q(n, r) < 0) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => q(e, t)).map(([, e]) => e);
}
var lt = class {
	#e = /* @__PURE__ */ new Map();
	#t = 0;
	add(e) {
		let t = d(e.tag), n = this.#e.get(t);
		if (n === void 0) {
			this.#e.set(t, {
				tag: e.tag,
				translation: e.translation,
				aliases: [...e.aliases],
				category: e.category,
				popularity: e.popularity,
				description: e.description
			});
			return;
		}
		let r = () => {
			this.#t += 1;
		};
		n.tag = $(n.tag, e.tag, r) ?? n.tag, n.translation = $(n.translation, e.translation, r), n.category = $(n.category, e.category, r), n.description = $(n.description, e.description, r), n.aliases.push(...e.aliases), n.popularity = Math.max(n.popularity, e.popularity);
	}
	get record_count() {
		return this.#e.size;
	}
	get conflict_count() {
		return this.#t;
	}
	finalize() {
		return [...this.#e.entries()].sort(([e], [t]) => q(e, t)).map(([, e], t) => ({
			record_id: t,
			tag: e.tag,
			...e.translation === void 0 ? {} : { translation: e.translation },
			aliases: ct(e.aliases).slice(0, st),
			...e.category === void 0 ? {} : { category: e.category },
			popularity: e.popularity,
			...e.description === void 0 ? {} : { description: e.description }
		}));
	}
}, ut = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c = new lt();
	#l = /* @__PURE__ */ new Set();
	#u = null;
	#d = 0;
	#f = !1;
	#p = !1;
	#m = null;
	constructor(e) {
		this.#e = e.store, this.#t = e.package_id, this.#n = e.data_version, this.#r = e.minimum_extension_version, this.#i = e.changelog, this.#a = e.on_progress, this.#o = e.max_batch_payload_length ?? 8388608, this.#s = e.max_total_records ?? 2e5;
	}
	cancel() {
		this.#f = !0;
	}
	async import_batch(e) {
		if (this.#h(), this.#p) throw new Q("this import already completed");
		if (e.batch_count <= 0 || e.batch_index < 0 || e.batch_index >= e.batch_count) throw new Q(`invalid batch_index ${String(e.batch_index)} for batch_count ${String(e.batch_count)}`);
		if (this.#u === null) this.#u = e.batch_count;
		else if (this.#u !== e.batch_count) throw new Q("batch_count changed mid-import");
		if (this.#l.has(e.batch_index)) throw new Q(`batch_index ${String(e.batch_index)} was already processed`);
		if (e.payload.length > this.#o) throw new X(`batch payload of ${String(e.payload.length)} characters exceeds the ${String(this.#o)}-character limit`);
		let t = qe[e.format].parse_batch(e.payload);
		for (let e of t.records) this.#c.add(e);
		if (this.#c.record_count > this.#s) throw new X(`import accumulated more than ${String(this.#s)} records`);
		this.#d += t.malformed.length, this.#l.add(e.batch_index), this.#g({
			phase: "batch",
			batch_index: e.batch_index,
			batch_count: e.batch_count,
			accepted_records: t.records.length,
			malformed_records: t.malformed.length
		});
		let n = !1;
		return this.#l.size === e.batch_count && (await this.#_(), n = !0), {
			accepted_records: t.records.length,
			malformed: t.malformed,
			complete: n
		};
	}
	async report_query_success() {
		let e = await this.#e.find_active_or_confirmed();
		e !== null && e.state === "active" && await this.#e.confirm(e.record_id);
	}
	async report_query_failure() {
		let e = await this.#e.find_active_or_confirmed();
		return e === null || e.state !== "active" ? null : this.#e.reselect_prior_confirmed(e.record_id);
	}
	#h() {
		if (this.#f) throw new Z();
	}
	#g(e) {
		this.#a?.(e);
	}
	async #_() {
		this.#p = !0, this.#g({ phase: "indexing" });
		let e = this.#c.finalize(), t = rt(e);
		try {
			let n = [];
			for (let e of t) this.#h(), n.push(await it(this.#t, e));
			let r = {
				package_id: this.#t,
				schema_version: 1,
				data_version: this.#n,
				changelog: this.#i,
				record_count: e.length,
				compressed_size: n.reduce((e, t) => e + t.entry.byte_length, 0),
				minimum_extension_version: this.#r,
				shards: n.map((e) => e.entry)
			}, i = re.safeParse(r);
			if (!i.success) throw new Q(`assembled manifest failed validation: ${i.error.message}`);
			this.#m = await this.#e.create_staging_package(i.data);
			for (let [e, t] of n.entries()) this.#h(), await this.#e.put_shard_content(this.#m, t.entry, t.bytes), this.#g({
				phase: "staging_shard",
				shard_index: e,
				shard_count: n.length
			});
			this.#h(), await this.#e.mark_ready(this.#m.record_id), this.#g({ phase: "activating" }), await this.#e.activate(this.#m.record_id), this.#g({
				phase: "complete",
				data_version: this.#n,
				record_count: e.length,
				package_record_id: this.#m.record_id,
				malformed_records: this.#d,
				merge_conflicts: this.#c.conflict_count
			});
		} catch (e) {
			throw this.#m !== null && await this.#e.rollback_staging(this.#m.record_id), e instanceof Z && this.#g({ phase: "cancelled" }), e;
		}
	}
}, dt = /* @__PURE__ */ e({
	DEFAULT_CATALOG_URL: () => DEFAULT_CATALOG_URL,
	DEFAULT_MAX_BATCH_PAYLOAD_LENGTH: () => at,
	DEFAULT_MAX_TOTAL_RECORDS: () => ot,
	DESKTOP_LRU_BUDGET_BYTES: () => DESKTOP_LRU_BUDGET_BYTES,
	ImportBuilder: () => ut,
	MOBILE_LRU_BUDGET_BYTES: () => MOBILE_LRU_BUDGET_BYTES,
	VocabularyPackageStore: () => R
});
//#endregion
export { ve as a, x as c, O as i, _e as l, R as n, C as o, A as r, be as s, dt as t, y as u };
