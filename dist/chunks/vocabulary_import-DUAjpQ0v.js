import { r as e } from "./rolldown-runtime-B0aSnxlc.js";
import { n as t, t as n } from "./sha2-BGNex9vj.js";
import { c as r, d as i, g as a, h as o, m as s, o as c, p as l, r as u, u as d } from "./schemas-DMBLWk59.js";
import { a as ee, d as f, o as p, r as te, s as m, t as ne } from "./vocabulary-BfEyI-lw.js";
import { t as h } from "./_vocabulary_import_error-BOxujgW3.js";
import { c as g, n as _, p as v, r as y, s as re, t as ie, u as ae } from "./package_store-BzGRz-no.js";
//#region ../../packages/contracts/src/vocabulary_shards.ts
var b = 4096, x = 1e3, oe = 2166136261, se = 16777619;
function ce(e) {
	let t = oe;
	for (let n of new TextEncoder().encode(e)) t = Math.imul(t ^ n, se);
	return t >>> 0;
}
function le(e) {
	let t = ce(e) % 512;
	return `h${String(t).padStart(3, "0")}`;
}
var S = a([
	o().trim().min(1).max(512),
	p,
	ee
]), ue = s({
	kind: r("prefix"),
	entries: u(S)
}), de = s({
	kind: r("alias"),
	entries: u(S)
}), fe = u(d().int()).min(1).check((e) => {
	e.value.forEach((t, n) => {
		if (n === 0) {
			t < 0 && e.issues.push({
				code: "custom",
				input: t,
				message: "first delta must be a nonnegative record_id",
				path: [n]
			});
			return;
		}
		t < 1 && e.issues.push({
			code: "custom",
			input: t,
			message: "subsequent deltas must be positive",
			path: [n]
		});
	});
}), pe = a([o().trim().min(1).max(24), fe]), C = s({
	kind: r("trigram"),
	entries: u(pe)
}), w = s({
	kind: r("detail"),
	start_id: p,
	records: u(m).min(1).max(b)
}), T = s({
	kind: r("hot"),
	global: u(p).max(x),
	by_category: l(ne, u(p).max(500))
});
c("kind", [
	ue,
	de,
	C,
	w,
	T
]);
var E = class e {
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
		this.extensionCodec = e?.extensionCodec ?? y.defaultCodec, this.context = e?.context, this.useBigInt64 = e?.useBigInt64 ?? !1, this.maxDepth = e?.maxDepth ?? 100, this.initialBufferSize = e?.initialBufferSize ?? 2048, this.sortKeys = e?.sortKeys ?? !1, this.forceFloat32 = e?.forceFloat32 ?? !1, this.ignoreUndefined = e?.ignoreUndefined ?? !1, this.forceIntegerToFloat = e?.forceIntegerToFloat ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
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
		let t = ae(e);
		this.ensureBufferSizeToWrite(5 + t), this.writeStringHeader(t), v(e, this.bytes, this.pos), this.pos += t;
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
		let n = _(e);
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
		this.ensureBufferSizeToWrite(8), g(this.view, this.pos, e), this.pos += 8;
	}
	writeI64(e) {
		this.ensureBufferSizeToWrite(8), re(this.view, this.pos, e), this.pos += 8;
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
function D(e, t) {
	return new E(t).encodeSharedRef(e);
}
//#endregion
//#region ../../packages/vocabulary/src/search/query_normalizer.ts
function O(e, t) {
	return Array.from(e).slice(0, t).join("");
}
//#endregion
//#region ../../packages/vocabulary/src/search/shard_codec.ts
function k(e) {
	return new Uint8Array(e);
}
async function A(t) {
	if (typeof CompressionStream < "u") {
		let e = new Blob([k(t)]).stream().pipeThrough(new CompressionStream("gzip"));
		return new Uint8Array(await new Response(e).arrayBuffer());
	}
	let n = await import("./__vite-browser-external-BApYF4Nn.js").then((t) => /* @__PURE__ */ e(t.default, 1));
	return new Uint8Array(n.gzipSync(t, { level: 9 }));
}
async function j(e) {
	return A(D(e));
}
//#endregion
//#region ../../packages/vocabulary/src/import/import_source.ts
var M = m.omit({ record_id: !0 }), N = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportSourceFormatError";
	}
};
function P(e) {
	return e instanceof Error ? e.message : String(e);
}
function F(e) {
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
				reason: `not valid JSON: ${P(e)}`
			});
			return;
		}
		let s = M.safeParse(o);
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
var I = {
	format: "tavern_canvas_jsonl",
	parse_batch: F
}, L = i({
	id_index: d().int(),
	name: o()
}), R = i({
	id_index: d().int(),
	name: o(),
	subgroups: u(L).default([])
}), z = i({
	subgroup_id: d().int().optional(),
	text: o().optional(),
	desc: o().optional()
}), B = i({
	tag_groups: u(R),
	tag_tags: u(z)
}), me = "nsfw";
function he(e) {
	return e.tag_groups.length === 1 && e.tag_groups[0]?.subgroups.length === 0;
}
function ge(e, t) {
	if (he(e)) return me;
	if (t !== void 0) return e.tag_groups.find((e) => e.subgroups.some((e) => e.id_index === t))?.name;
}
function _e(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch (e) {
		throw new N(`legacy_v2 batch is not valid JSON: ${P(e)}`);
	}
	let n = B.safeParse(t);
	if (!n.success) throw new N(`legacy_v2 batch does not have the { tag_groups, tag_tags } shape: ${n.error.message}`);
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
		let s = ge(r, e.subgroup_id), c = e.desc?.trim(), l = {
			tag: o,
			aliases: [],
			popularity: 0,
			...c !== void 0 && c.length > 0 ? { translation: c } : {},
			...s === void 0 ? {} : { category: s }
		}, u = M.safeParse(l);
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
var ve = {
	tavern_canvas_jsonl: I,
	legacy_v2: {
		format: "legacy_v2",
		parse_batch: _e
	}
}, V = 2, H = 3;
function U(e, t) {
	let n = e.codePointAt(t);
	if (n === void 0) throw RangeError(`no code point at index ${String(t)} of "${e}"`);
	return n;
}
function W(e, t) {
	let n = 0, r = 0;
	for (; n < e.length && r < t.length;) {
		let i = U(e, n), a = U(t, r);
		if (i !== a) return i - a;
		n += i > 65535 ? 2 : 1, r += a > 65535 ? 2 : 1;
	}
	return e.length - n - (t.length - r);
}
function G(e) {
	let t = new TextEncoder().encode(e);
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
function ye(e) {
	e.sort(([e, t, n], [r, i, a]) => {
		let o = W(e, r);
		return o === 0 ? n === a ? t - i : a - n : o;
	});
}
function K(e, t, n) {
	return [...e.entries()].sort(([e], [t]) => W(e, t)).map(([e, r]) => (ye(r), {
		shard_id: `${t}:${e}`,
		kind: t,
		path: `${t}/${n(e)}.msgpack.gz`,
		payload: {
			kind: t,
			entries: r
		}
	}));
}
function be(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = f(n.tag);
		if (e.length === 0) continue;
		let r = O(e, V), i = t.get(r) ?? [];
		i.push([
			e,
			n.record_id,
			n.popularity
		]), t.set(r, i);
	}
	return K(t, "prefix", G);
}
function xe(e) {
	return e.translation === void 0 ? e.aliases : [...e.aliases, e.translation];
}
function Se(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e) for (let e of xe(r)) {
		let i = f(e);
		if (i.length === 0) continue;
		let a = t.get(i) ?? /* @__PURE__ */ new Set();
		if (t.set(i, a), a.has(r.record_id)) continue;
		a.add(r.record_id);
		let o = le(O(i, 2)), s = n.get(o) ?? [];
		s.push([
			i,
			r.record_id,
			r.popularity
		]), n.set(o, s);
	}
	return K(n, "alias", (e) => e);
}
function Ce(e) {
	let t = Array.from(e), n = [];
	for (let e = 0; e + H <= t.length; e += 1) n.push(t.slice(e, e + H).join(""));
	return n;
}
function we(e) {
	let t = [], n = 0;
	return e.forEach((e, r) => {
		t.push(r === 0 ? e : e - n), n = e;
	}), t;
}
function Te(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = f(n.tag);
		for (let r of Ce(e)) {
			let e = t.get(r) ?? /* @__PURE__ */ new Set();
			e.add(n.record_id), t.set(r, e);
		}
	}
	let n = /* @__PURE__ */ new Map();
	for (let [e, r] of t) {
		let t = O(e, V), i = [...r].sort((e, t) => e - t), a = n.get(t) ?? [];
		a.push([e, we(i)]), n.set(t, a);
	}
	return [...n.entries()].sort(([e], [t]) => W(e, t)).map(([e, t]) => (t.sort(([e], [t]) => W(e, t)), {
		shard_id: `trigram:${e}`,
		kind: "trigram",
		path: `trigram/${G(e)}.msgpack.gz`,
		payload: {
			kind: "trigram",
			entries: t
		}
	}));
}
function Ee(e) {
	let t = [...e].sort((e, t) => e.record_id - t.record_id), n = [];
	for (let e = 0; e < t.length; e += b) {
		let r = t.slice(e, e + b), i = r[0];
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
function De(e) {
	let t = [...e].sort((e, t) => e.popularity === t.popularity ? e.record_id - t.record_id : t.popularity - e.popularity), n = t.slice(0, x).map((e) => e.record_id), r = /* @__PURE__ */ new Map();
	for (let e of t) {
		if (e.category === void 0) continue;
		let t = r.get(e.category) ?? [];
		t.length < 500 && t.push(e.record_id), r.set(e.category, t);
	}
	let i = {};
	for (let [e, t] of [...r.entries()].sort(([e], [t]) => W(e, t))) i[e] = t;
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
function Oe(e) {
	return [
		...be(e),
		...Se(e),
		...Te(e),
		...Ee(e),
		De(e)
	];
}
async function ke(e, r) {
	let i = await j(r.payload);
	return {
		entry: {
			shard_id: r.shard_id,
			package_id: e,
			kind: r.kind,
			path: r.path,
			sha256: t(n(i)),
			byte_length: i.byteLength
		},
		bytes: i
	};
}
var Ae = 32, q = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportSizeLimitError";
	}
}, J = class extends Error {
	constructor() {
		super("vocabulary import was cancelled"), this.name = "ImportCancelledError";
	}
}, Y = class extends Error {
	constructor(e) {
		super(e), this.name = "ImportBuilderError";
	}
};
function X(e, t, n) {
	return e === void 0 ? t : (t === void 0 || t === e || n(), e);
}
function je(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = f(n), r = t.get(e);
		(r === void 0 || W(n, r) < 0) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => W(e, t)).map(([, e]) => e);
}
var Me = class {
	#e = /* @__PURE__ */ new Map();
	#t = 0;
	add(e) {
		let t = f(e.tag), n = this.#e.get(t);
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
		n.tag = X(n.tag, e.tag, r) ?? n.tag, n.translation = X(n.translation, e.translation, r), n.category = X(n.category, e.category, r), n.description = X(n.description, e.description, r), n.aliases.push(...e.aliases), n.popularity = Math.max(n.popularity, e.popularity);
	}
	get record_count() {
		return this.#e.size;
	}
	get conflict_count() {
		return this.#t;
	}
	finalize() {
		return [...this.#e.entries()].sort(([e], [t]) => W(e, t)).map(([, e], t) => ({
			record_id: t,
			tag: e.tag,
			...e.translation === void 0 ? {} : { translation: e.translation },
			aliases: je(e.aliases).slice(0, Ae),
			...e.category === void 0 ? {} : { category: e.category },
			popularity: e.popularity,
			...e.description === void 0 ? {} : { description: e.description }
		}));
	}
}, Ne = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c = new Me();
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
		if (this.#h(), this.#p) throw new Y("this import already completed");
		if (e.batch_count <= 0 || e.batch_index < 0 || e.batch_index >= e.batch_count) throw new Y(`invalid batch_index ${String(e.batch_index)} for batch_count ${String(e.batch_count)}`);
		if (this.#u === null) this.#u = e.batch_count;
		else if (this.#u !== e.batch_count) throw new Y("batch_count changed mid-import");
		if (this.#l.has(e.batch_index)) throw new Y(`batch_index ${String(e.batch_index)} was already processed`);
		if (e.payload.length > this.#o) throw new q(`batch payload of ${String(e.payload.length)} characters exceeds the ${String(this.#o)}-character limit`);
		let t = ve[e.format].parse_batch(e.payload);
		for (let e of t.records) this.#c.add(e);
		if (this.#c.record_count > this.#s) throw new q(`import accumulated more than ${String(this.#s)} records`);
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
		if (this.#f) throw new J();
	}
	#g(e) {
		this.#a?.(e);
	}
	async #_() {
		this.#p = !0, this.#g({ phase: "indexing" });
		let e = this.#c.finalize(), t = Oe(e);
		try {
			let n = [];
			for (let e of t) this.#h(), n.push(await ke(this.#t, e));
			let r = {
				package_id: this.#t,
				schema_version: 1,
				data_version: this.#n,
				changelog: this.#i,
				record_count: e.length,
				compressed_size: n.reduce((e, t) => e + t.entry.byte_length, 0),
				minimum_extension_version: this.#r,
				shards: n.map((e) => e.entry)
			}, i = te.safeParse(r);
			if (!i.success) throw new Y(`assembled manifest failed validation: ${i.error.message}`);
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
			throw this.#m !== null && await this.#e.rollback_staging(this.#m.record_id), e instanceof J && this.#g({ phase: "cancelled" }), e;
		}
	}
}, Pe = "vocabulary", Fe = "local-import", Z = "1.0.0", Q = "3.0.0", Ie = "Imported from a local file", $ = 8388608;
function Le(e) {
	return "name" in e && typeof e.name == "string" ? e.name : "";
}
function Re(e) {
	try {
		let t = JSON.parse(e);
		return typeof t == "object" && !!t && !Array.isArray(t) && "tag_groups" in t && "tag_tags" in t && Array.isArray(t.tag_groups) && Array.isArray(t.tag_tags);
	} catch {
		return !1;
	}
}
function ze(e, t) {
	let n = Le(e).toLowerCase();
	if (n.endsWith(".jsonl") || n.endsWith(".ndjson")) return "tavern_canvas_jsonl";
	if (n.endsWith(".json")) return "legacy_v2";
	if (n.length === 0) return Re(t) ? "legacy_v2" : "tavern_canvas_jsonl";
	throw new h("vocabulary_import_invalid_format", "Vocabulary import accepts .jsonl, .ndjson, and legacy .json files");
}
function Be(e) {
	let t = e.replace(/\r\n?/gu, "\n").split("\n"), n = [], r = [], i = 0;
	for (let e of t) {
		if (e.length > $) throw new h("vocabulary_import_size_limit", "A vocabulary import line exceeds the maximum batch size");
		let t = r.length === 0 ? 0 : 1;
		r.length > 0 && i + t + e.length > $ && (n.push(r.join("\n")), r = [], i = 0), r.push(e), i += (r.length === 1 ? 0 : 1) + e.length;
	}
	return r.length > 0 && n.push(r.join("\n")), n;
}
function Ve(e) {
	switch (e.phase) {
		case "batch": return {
			phase: "batch",
			batch_index: e.batch_index ?? 0,
			batch_count: e.batch_count ?? 0,
			accepted_records: e.accepted_records ?? 0,
			malformed_records: e.malformed_records ?? 0
		};
		case "indexing": return { phase: "indexing" };
		case "staging_shard": return {
			phase: "staging_shard",
			shard_index: e.shard_index ?? 0,
			shard_count: e.shard_count ?? 0
		};
		case "activating": return { phase: "activating" };
		case "complete": return {
			phase: "complete",
			data_version: e.data_version ?? Z,
			record_count: e.record_count ?? 0,
			package_record_id: e.package_record_id ?? "",
			malformed_records: e.malformed_records ?? 0,
			merge_conflicts: e.merge_conflicts ?? 0
		};
		case "cancelled": return { phase: "cancelled" };
		default: return null;
	}
}
function He(e) {
	return e instanceof h ? e : e instanceof Error ? e.name === "ImportCancelledError" ? new h("vocabulary_import_cancelled", "Vocabulary import cancelled") : e.name === "ImportSizeLimitError" ? new h("vocabulary_import_size_limit", e.message) : e.name === "ImportSourceFormatError" ? new h("vocabulary_import_invalid_format", e.message) : new h("vocabulary_import_failed", e.message) : new h("vocabulary_import_failed", String(e));
}
function Ue(e, t, n) {
	let r = !1, i = null;
	function a() {
		r = !0, i?.cancel();
	}
	function o() {
		if (r) throw new h("vocabulary_import_cancelled", "Vocabulary import cancelled");
	}
	async function s() {
		if (t.size === 0) throw new h("vocabulary_import_invalid_file", "The vocabulary file is empty");
		if (e === null) throw new h("vocabulary_import_unavailable", "Vocabulary import needs IndexedDB, which is unavailable on this host");
		n?.({
			phase: "reading",
			received_bytes: 0,
			total_bytes: t.size
		}), o();
		let a = await t.text();
		if (o(), n?.({
			phase: "reading",
			received_bytes: t.size,
			total_bytes: t.size
		}), a.trim().length === 0) throw new h("vocabulary_import_invalid_file", "The vocabulary file is empty");
		let s = ze(t, a), c = s === "legacy_v2" ? [a] : Be(a);
		i = new Ne({
			store: new ie(e, Pe),
			package_id: Fe,
			data_version: Z,
			minimum_extension_version: Q,
			changelog: Ie,
			on_progress: (e) => {
				let t = Ve(e);
				t !== null && n?.(t);
			}
		}), r && i.cancel(), o();
		try {
			for (let [e, t] of c.entries()) await i.import_batch({
				format: s,
				batch_index: e,
				batch_count: c.length,
				payload: t
			}), o();
		} catch (e) {
			throw He(e);
		}
	}
	return {
		cancel: a,
		completed: s()
	};
}
//#endregion
export { Ue as start_vocabulary_import };
