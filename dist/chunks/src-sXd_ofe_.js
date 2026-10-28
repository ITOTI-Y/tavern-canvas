import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { n as t, t as n } from "./sha2-BGNex9vj.js";
import { h as r, i, m as a, r as o, u as s } from "./schemas-DMBLWk59.js";
import { c, i as l, l as u, n as d, u as f } from "./vocabulary-BfEyI-lw.js";
import { b as p, m, n as h, r as g, y as _ } from "./business_repositories-DrZf-uG8.js";
var v = /* @__PURE__ */ new Set([
	"staging",
	"ready",
	"active",
	"confirmed",
	"superseded",
	"failed"
]), y = /* @__PURE__ */ new Set(["active", "confirmed"]), b = class extends Error {
	constructor(e) {
		super(e), this.name = "PackageStoreError";
	}
};
function x(e) {
	if (!v.has(e)) throw new b(`Unknown vocabulary package state: ${e}`);
	return e;
}
function S(e) {
	if (typeof e != "string") throw new b(`Expected a semver data_version string, got a number: ${String(e)}`);
	return e;
}
var C = a({
	package_id: l,
	changelog: r().min(1).max(4096),
	record_count: s().int().nonnegative(),
	compressed_size: s().int().nonnegative(),
	minimum_extension_version: c,
	shard_entries: o(u),
	pinned: i(),
	confirmed_at: _.optional()
}), w = a({
	package_record_id: r().min(1),
	shard_id: r().min(1),
	path: f,
	sha256: r().regex(/^[a-f0-9]{64}$/u),
	byte_length: s().int().nonnegative(),
	bytes_base64: r().min(1)
});
function T(e) {
	let t = C.safeParse(e);
	if (!t.success) throw new b("Stored vocabulary package payload failed validation");
	return t.data;
}
function E(e) {
	let t = w.safeParse(e);
	if (!t.success) throw new b("Stored vocabulary shard payload failed validation");
	return t.data;
}
function D(e) {
	return p({
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
function O(e) {
	return p({ ...e });
}
function k(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
function A(e) {
	let t = atob(e);
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function j(e, t) {
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
function M(e) {
	let t = T(e.payload);
	return {
		record_id: e.id,
		state: x(e.state),
		pinned: t.pinned,
		confirmed_at: t.confirmed_at,
		manifest: j(S(e.data_version), t)
	};
}
var N = class {
	database;
	namespace;
	packages;
	shards;
	shard_index_cache = null;
	cache_active_package;
	active_package_cache = void 0;
	constructor(e, t, n = {}) {
		this.database = e, this.namespace = t, this.packages = new h(e), this.shards = new g(e), this.cache_active_package = n.cache_active_package ?? !1;
	}
	invalidate_caches() {
		this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async list_packages() {
		return (await this.packages.list(this.namespace)).map(M);
	}
	async find_active_or_confirmed() {
		if (this.cache_active_package && this.active_package_cache !== void 0) return this.active_package_cache;
		let e = (await this.list_packages()).find((e) => y.has(e.state)) ?? null;
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
			payload: D({
				package_id: e.package_id,
				changelog: e.changelog,
				record_count: e.record_count,
				compressed_size: e.compressed_size,
				minimum_extension_version: e.minimum_extension_version,
				shard_entries: e.shards,
				pinned: !1
			})
		};
		return await this.packages.create(this.namespace, r), this.invalidate_active_package_cache(), M(r);
	}
	async put_shard_content(e, t, n) {
		await this.create_shard_record(e, t, k(n));
	}
	async copy_shard(e, t, n) {
		let r = await this.find_shard_record(n, t.path);
		if (r === null) throw new b(`No source shard to copy for path: ${t.path}`);
		if (r.payload.sha256 !== t.sha256) throw new b(`Source shard content hash does not match the target manifest entry for ${t.path}`);
		await this.create_shard_record(e, t, r.payload.bytes_base64);
	}
	async mark_ready(e) {
		await this.transition_state(e, "ready");
	}
	async activate(e) {
		return m(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = null;
			for (let i of n) i.id !== e && y.has(x(i.state)) && (await this.packages.update(this.namespace, {
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
		if (x(t.state) !== "active") throw new b(`Cannot confirm package ${e}: state is "${t.state}", not "active"`);
		await this.transition_state(e, "confirmed", { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
	}
	async reselect_prior_confirmed(e) {
		return m(this.database, ["vocabulary_packages"], async (t) => {
			let n = await this.packages.list(this.namespace, t), r = n.filter((t) => t.id !== e).map((e) => ({
				record: e,
				payload: T(e.payload)
			})).filter(({ record: e, payload: t }) => x(e.state) === "superseded" && t.confirmed_at !== void 0).sort((e, t) => (t.payload.confirmed_at ?? "").localeCompare(e.payload.confirmed_at ?? ""))[0], i = n.find((t) => t.id === e);
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
			return await this.packages.update(this.namespace, a, t), M(a);
		});
	}
	async rollback_staging(e) {
		let t = await this.list_owned_shards(e);
		await m(this.database, ["vocabulary_packages", "vocabulary_shards"], async (n) => {
			for (let e of t) await this.shards.delete(this.namespace, e.id, n);
			await this.packages.delete(this.namespace, e, n);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache();
	}
	async cleanup_stale() {
		let e = (await this.packages.list(this.namespace)).filter((e) => {
			let t = T(e.payload), n = x(e.state);
			return (n === "superseded" || n === "failed") && !t.pinned;
		}), t = new Set(e.map((e) => e.id)), n = (await this.shards.list(this.namespace)).filter((e) => t.has(E(e.payload).package_record_id));
		return await m(this.database, ["vocabulary_packages", "vocabulary_shards"], async (t) => {
			for (let e of n) await this.shards.delete(this.namespace, e.id, t);
			for (let n of e) await this.packages.delete(this.namespace, n.id, t);
		}), this.invalidate_shard_index_cache(), this.invalidate_active_package_cache(), { deleted_package_ids: [...t] };
	}
	async set_pinned(e, t) {
		let n = await this.require_record(e), r = T(n.payload);
		await this.packages.update(this.namespace, {
			...n,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: D({
				...r,
				pinned: t
			})
		}), this.invalidate_active_package_cache();
	}
	async manifest() {
		let e = await this.find_active_or_confirmed();
		if (e === null) throw new b(`No active vocabulary package in namespace: ${this.namespace}`);
		return e.manifest;
	}
	async shard_bytes(e) {
		let r = await this.find_active_or_confirmed();
		if (r === null) throw new b(`No active vocabulary package in namespace: ${this.namespace}`);
		let i = r.manifest.shards.find((t) => t.path === e);
		if (i === void 0) throw new b(`No shard manifest entry for path: ${e}`);
		let a = await this.find_shard_record(r.record_id, e);
		if (a === null) throw new b(`No shard bytes stored for path: ${e}`);
		if (a.payload.byte_length !== i.byte_length || a.payload.sha256 !== i.sha256) throw new b(`Stored shard metadata for ${e} does not match the active manifest`);
		let o = A(a.payload.bytes_base64);
		if (o.byteLength !== i.byte_length) throw new b(`Stored shard bytes for ${e} do not match the manifest byte_length`);
		if (t(n(o)) !== i.sha256) throw new b(`Stored shard bytes for ${e} do not match the manifest SHA-256`);
		return o;
	}
	async create_shard_record(e, t, n) {
		let r = (/* @__PURE__ */ new Date()).toISOString(), i = crypto.randomUUID(), a = d.parse(t.kind), o = {
			schema_version: 1,
			id: i,
			namespace: this.namespace,
			record_key: `${this.namespace}:${i}`,
			created_at: r,
			updated_at: r,
			data_version: e.manifest.data_version,
			kind: a,
			payload: O({
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
		return (await this.shards.list(this.namespace)).filter((t) => E(t.payload).package_record_id === e);
	}
	async get_shard_index() {
		if (this.shard_index_cache === null) {
			let e = await this.shards.list(this.namespace), t = /* @__PURE__ */ new Map();
			for (let n of e) {
				let e = E(n.payload);
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
			payload: E(r.payload)
		};
	}
	async require_record(e, t) {
		let n = await this.packages.get(this.namespace, e, t);
		if (n === null) throw new b(`No vocabulary package record ${e} in namespace ${this.namespace}`);
		return n;
	}
	async transition_state(e, t, n = {}) {
		let r = await this.require_record(e), i = T(r.payload);
		await this.packages.update(this.namespace, {
			...r,
			state: t,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: D({
				...i,
				...n.confirmed_at === void 0 ? {} : { confirmed_at: n.confirmed_at }
			})
		}), this.invalidate_active_package_cache();
	}
}, P = /* @__PURE__ */ e({
	DEFAULT_CATALOG_URL: () => DEFAULT_CATALOG_URL,
	DEFAULT_MAX_BATCH_PAYLOAD_LENGTH: () => DEFAULT_MAX_BATCH_PAYLOAD_LENGTH,
	DEFAULT_MAX_TOTAL_RECORDS: () => DEFAULT_MAX_TOTAL_RECORDS,
	DESKTOP_LRU_BUDGET_BYTES: () => DESKTOP_LRU_BUDGET_BYTES,
	MOBILE_LRU_BUDGET_BYTES: () => MOBILE_LRU_BUDGET_BYTES,
	VocabularyPackageStore: () => N
});
//#endregion
export { N as n, P as t };
