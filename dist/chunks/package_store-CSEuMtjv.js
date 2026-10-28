import { n as e, t } from "./sha2-BGNex9vj.js";
import { h as n, i as r, m as i, r as a, u as o } from "./schemas-DMBLWk59.js";
import { c as s, i as c, l, n as u, u as d } from "./vocabulary-BfEyI-lw.js";
import { m as f, n as p, r as ee, v as te, y as m } from "./business_repositories-Tf6NN3HM.js";
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function h(e) {
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
function g(e, t, n) {
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
var _ = new TextEncoder(), v = 50;
function y(e, t, n) {
	_.encodeInto(e, t.subarray(n));
}
function ne(e, t, n) {
	e.length > v ? y(e, t, n) : g(e, t, n);
}
var b = 4096;
function x(e, t, n) {
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
		a.length >= b && (o += String.fromCharCode(...a), a.length = 0);
	}
	return a.length > 0 && (o += String.fromCharCode(...a)), o;
}
var S = new TextDecoder(), C = 200;
function w(e, t, n) {
	let r = e.subarray(t, t + n);
	return S.decode(r);
}
function T(e, t, n) {
	return n > C ? w(e, t, n) : x(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var E = class {
	type;
	data;
	constructor(e, t) {
		this.type = e, this.data = t;
	}
}, D = class e extends Error {
	constructor(t) {
		super(t);
		let n = Object.create(e.prototype);
		Object.setPrototypeOf(this, n), Object.defineProperty(this, "name", {
			configurable: !0,
			enumerable: !1,
			value: e.name
		});
	}
}, O = 4294967295;
function k(e, t, n) {
	let r = n / 4294967296, i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function A(e, t, n) {
	let r = Math.floor(n / 4294967296), i = n;
	e.setUint32(t, r), e.setUint32(t + 4, i);
}
function j(e, t) {
	let n = e.getInt32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
function M(e, t) {
	let n = e.getUint32(t), r = e.getUint32(t + 4);
	return n * 4294967296 + r;
}
var N = 4294967295, P = 17179869183;
function F({ sec: e, nsec: t }) {
	if (e >= 0 && t >= 0 && e <= P) if (t === 0 && e <= N) {
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e), t;
	} else {
		let n = e / 4294967296, r = e & 4294967295, i = /* @__PURE__ */ new Uint8Array(8), a = new DataView(i.buffer);
		return a.setUint32(0, t << 2 | n & 3), a.setUint32(4, r), i;
	}
	{
		let n = /* @__PURE__ */ new Uint8Array(12), r = new DataView(n.buffer);
		return r.setUint32(0, t), A(r, 4, e), n;
	}
}
function I(e) {
	let t = e.getTime(), n = Math.floor(t / 1e3), r = (t - n * 1e3) * 1e6, i = Math.floor(r / 1e9);
	return {
		sec: n + i,
		nsec: r - i * 1e9
	};
}
function L(e) {
	return e instanceof Date ? F(I(e)) : null;
}
function R(e) {
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
			sec: j(t, 4),
			nsec: t.getUint32(0)
		};
		default: throw new D(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${e.length}`);
	}
}
function z(e) {
	let t = R(e);
	return /* @__PURE__ */ new Date(t.sec * 1e3 + t.nsec / 1e6);
}
var re = {
	type: -1,
	encode: L,
	decode: z
}, B = class e {
	static defaultCodec = new e();
	__brand;
	builtInEncoders = [];
	builtInDecoders = [];
	encoders = [];
	decoders = [];
	constructor() {
		this.register(re);
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
				if (i != null) return new E(-1 - n, i);
			}
		}
		for (let n = 0; n < this.encoders.length; n++) {
			let r = this.encoders[n];
			if (r != null) {
				let i = r(e, t);
				if (i != null) return new E(n, i);
			}
		}
		return e instanceof E ? e : null;
	}
	decode(e, t, n) {
		let r = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
		return r ? r(e, t, n) : new E(t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@msgpack+msgpack@3.1.3/node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function V(e) {
	return e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer;
}
function H(e) {
	return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : V(e) ? new Uint8Array(e) : Uint8Array.from(e);
}
var U = /* @__PURE__ */ new Set([
	"staging",
	"ready",
	"active",
	"confirmed",
	"superseded",
	"failed"
]), W = /* @__PURE__ */ new Set(["active", "confirmed"]), G = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageStoreError";
	}
};
function K(e) {
	if (!U.has(e)) throw new G(`Unknown vocabulary package state: ${e}`);
	return e;
}
function q(e) {
	if (typeof e != "string") throw new G(`Expected a semver data_version string, got a number: ${String(e)}`);
	return e;
}
var J = i({
	package_id: c,
	changelog: n().min(1).max(4096),
	record_count: o().int().nonnegative(),
	compressed_size: o().int().nonnegative(),
	minimum_extension_version: s,
	shard_entries: a(l),
	pinned: r(),
	confirmed_at: te.optional()
}), Y = i({
	package_record_id: n().min(1),
	shard_id: n().min(1),
	path: d,
	sha256: n().regex(/^[a-f0-9]{64}$/u),
	byte_length: o().int().nonnegative(),
	bytes_base64: n().min(1)
});
function X(e) {
	let t = J.safeParse(e);
	if (!t.success) throw new G("Stored vocabulary package payload failed validation");
	return t.data;
}
function Z(e) {
	let t = Y.safeParse(e);
	if (!t.success) throw new G("Stored vocabulary shard payload failed validation");
	return t.data;
}
function Q(e) {
	return m({
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
function ie(e) {
	return m({ ...e });
}
function ae(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function oe(e) {
	let t = atob(e);
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function se(e, t) {
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
function $(e) {
	let t = X(e.payload);
	return {
		record_id: e.id,
		state: K(e.state),
		pinned: t.pinned,
		confirmed_at: t.confirmed_at,
		manifest: se(q(e.data_version), t)
	};
}
var ce = class {
	database;
	namespace;
	packages;
	shards;
	shard_index_cache = null;
	cache_active_package;
	active_package_cache = void 0;
	constructor(e, t, n = {}) {
		this.database = e, this.namespace = t, this.packages = new p(e), this.shards = new ee(e), this.cache_active_package = n.cache_active_package ?? !1;
	}
	invalidate_caches() {
		this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async list_packages() {
		return (await this.packages.list(this.namespace)).map($);
	}
	async find_active_or_confirmed() {
		if (this.cache_active_package && this.active_package_cache !== void 0) return this.active_package_cache;
		let e = (await this.list_packages()).find((e) => W.has(e.state)) ?? null;
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
			payload: Q({
				package_id: e.package_id,
				changelog: e.changelog,
				record_count: e.record_count,
				compressed_size: e.compressed_size,
				minimum_extension_version: e.minimum_extension_version,
				shard_entries: e.shards,
				pinned: !1
			})
		};
		return await this.packages.create(this.namespace, r), this.invalidate_active_package_cache(), $(r);
	}
	async put_shard_content(e, t, n) {
		await this.create_shard_record(e, t, ae(n));
	}
	async copy_shard(e, t, n) {
		let r = await this.find_shard_record(n, t.path);
		if (r === null) throw new G(`No source shard to copy for path: ${t.path}`);
		if (r.payload.sha256 !== t.sha256) throw new G(`Source shard content hash does not match the target manifest entry for ${t.path}`);
		await this.create_shard_record(e, t, r.payload.bytes_base64);
	}
	async mark_ready(e) {
		await this.transition_state(e, "ready");
	}
	async activate(e) {
		return f(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = null;
			for (let i of n) i.id !== e && W.has(K(i.state)) && (await this.packages.update(this.namespace, {
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
		if (K(t.state) !== "active") throw new G(`Cannot confirm package ${e}: state is "${t.state}", not "active"`);
		await this.transition_state(e, "confirmed", { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
	}
	async reselect_prior_confirmed(e) {
		return f(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = n.filter((t) => t.id !== e).map((e) => ({
				record: e,
				payload: X(e.payload)
			})).filter(({ record: e, payload: t }) => K(e.state) === "superseded" && t.confirmed_at !== void 0).sort((e, t) => (t.payload.confirmed_at ?? "").localeCompare(e.payload.confirmed_at ?? ""))[0], i = n.find((t) => t.id === e);
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
			return await this.packages.update(this.namespace, a, t), $(a);
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
			let t = X(e.payload), n = K(e.state);
			return (n === "superseded" || n === "failed") && !t.pinned;
		}), t = new Set(e.map((e) => e.id)), n = (await this.shards.list(this.namespace)).filter((e) => t.has(Z(e.payload).package_record_id));
		return await f(this.database, ["vocabulary_packages", "vocabulary_shards"], async (t) => {
			for (let e of n) await this.shards.delete(this.namespace, e.id, t);
			for (let n of e) await this.packages.delete(this.namespace, n.id, t);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache(), { deleted_package_ids: [...t] };
	}
	async set_pinned(e, t) {
		let n = await this.require_record(e), r = X(n.payload);
		await this.packages.update(this.namespace, {
			...n,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: Q({
				...r,
				pinned: t
			})
		}), this.invalidate_active_package_cache();
	}
	async manifest() {
		let e = await this.find_active_or_confirmed();
		if (e === null) throw new G(`No active vocabulary package in namespace: ${this.namespace}`);
		return e.manifest;
	}
	async shard_bytes(n) {
		let r = await this.find_active_or_confirmed();
		if (r === null) throw new G(`No active vocabulary package in namespace: ${this.namespace}`);
		let i = r.manifest.shards.find((e) => e.path === n);
		if (i === void 0) throw new G(`No shard manifest entry for path: ${n}`);
		let a = await this.find_shard_record(r.record_id, n);
		if (a === null) throw new G(`No shard bytes stored for path: ${n}`);
		if (a.payload.byte_length !== i.byte_length || a.payload.sha256 !== i.sha256) throw new G(`Stored shard metadata for ${n} does not match the active manifest`);
		let o = oe(a.payload.bytes_base64);
		if (o.byteLength !== i.byte_length) throw new G(`Stored shard bytes for ${n} do not match the manifest byte_length`);
		if (e(t(o)) !== i.sha256) throw new G(`Stored shard bytes for ${n} do not match the manifest SHA-256`);
		return o;
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
			payload: ie({
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
		return (await this.shards.list(this.namespace)).filter((t) => Z(t.payload).package_record_id === e);
	}
	async get_shard_index() {
		if (this.shard_index_cache === null) {
			let e = await this.shards.list(this.namespace), t = /* @__PURE__ */ new Map();
			for (let n of e) {
				let e = Z(n.payload);
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
			payload: Z(r.payload)
		};
	}
	async require_record(e, t) {
		let n = await this.packages.get(this.namespace, e, t);
		if (n === null) throw new G(`No vocabulary package record ${e} in namespace ${this.namespace}`);
		return n;
	}
	async transition_state(e, t, n = {}) {
		let r = await this.require_record(e), i = X(r.payload);
		await this.packages.update(this.namespace, {
			...r,
			state: t,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: Q({
				...i,
				...n.confirmed_at === void 0 ? {} : { confirmed_at: n.confirmed_at }
			})
		}), this.invalidate_active_package_cache();
	}
};
//#endregion
export { j as a, k as c, T as d, x as f, O as i, D as l, H as n, M as o, ne as p, B as r, A as s, ce as t, h as u };
