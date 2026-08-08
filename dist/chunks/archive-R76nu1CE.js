import { n as e, t } from "./sha2-BGNex9vj.js";
import { d as n, f as r, l as i, p as a, u as o } from "./src-BPUc1ma2.js";
import { a as s, l as c, m as l, u, y as d } from "./business_repositories-CBdwxJT1.js";
//#region ../../packages/storage/src/archive/archive_manifest.ts
var f = "manifest.json", p = "checksums.json", m = "assets", h = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;
function g(e) {
	return `records/${e}.jsonl`;
}
var _ = /* @__PURE__ */ new Set([
	f,
	p,
	...n.map(g)
]);
function v(e) {
	return _.has(e) || b(e) !== null;
}
function y(e, t) {
	return `${m}/${e}.${t}`;
}
function b(e) {
	let t = h.exec(e);
	if (t === null) return null;
	let [, n, r] = t;
	return n === void 0 || r === void 0 ? null : {
		sha256: n,
		extension: r
	};
}
var x = [
	{
		extension: "png",
		bytes: [
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		]
	},
	{
		extension: "jpg",
		bytes: [
			255,
			216,
			255
		]
	},
	{
		extension: "gif",
		bytes: [
			71,
			73,
			70,
			56
		]
	}
];
function S(e, t, n) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function C(e) {
	for (let t of x) if (S(e, t.bytes, t.offset ?? 0)) return t.extension;
	return S(e, [
		82,
		73,
		70,
		70
	], 0) && S(e, [
		87,
		69,
		66,
		80
	], 8) ? "webp" : "bin";
}
function w(n) {
	return e(t(n));
}
function T() {
	let e = {};
	for (let t of n) e[t] = 0;
	return e;
}
function E(e) {
	return {
		format: o,
		schema_version: 1,
		extension_version: e.extension_version,
		created_at: e.created_at,
		record_counts: e.record_counts,
		asset_count: e.asset_count,
		excluded_secret_categories: [...i]
	};
}
//#endregion
//#region ../../packages/storage/src/archive/_zip_module.ts
var D;
function O() {
	return D ??= import("./zip.js-mUlaFE4p.js"), D;
}
//#endregion
//#region ../../packages/storage/src/archive/export_archive.ts
var k = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "ArchiveExportError", this.reason = e;
	}
};
function A(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function j(e) {
	if (e?.aborted === !0) throw new k("cancelled", "Export was cancelled");
}
async function M(e) {
	return typeof Blob < "u" && e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
}
async function N(e) {
	let { database: t, namespace: r, extension_version: i, signal: a } = e, o = e.created_at ?? (/* @__PURE__ */ new Date()).toISOString(), c = s(t), l = new TextEncoder(), u = await O(), d = new u.ZipWriter(new u.BlobWriter("application/zip"), {
		level: 9,
		...a === void 0 ? {} : { signal: a }
	});
	try {
		let e = T(), t = {};
		for (let i of n) {
			j(a);
			let n = await c[i].list(r), o = n.map((e) => JSON.stringify(e)).join("\n"), s = l.encode(n.length === 0 ? "" : `${o}\n`), f = g(i);
			await d.add(f, new u.Uint8ArrayReader(s)), t[f] = {
				sha256: w(s),
				byte_length: s.byteLength
			}, e[i] = n.length;
		}
		let s = await c.image_records.list(r), m = [...new Set(s.map((e) => e.sha256))].sort();
		for (let e of m) {
			j(a);
			let n = await c.image_blobs.get(e);
			if (n === null) throw new k("missing_asset_blob", `image_blobs is missing content referenced by image_records: ${e}`);
			let r = await M(n.blob), i = y(e, C(r));
			await d.add(i, new u.Uint8ArrayReader(r)), t[i] = {
				sha256: w(r),
				byte_length: r.byteLength
			};
		}
		let h = E({
			extension_version: i,
			created_at: o,
			record_counts: e,
			asset_count: m.length
		}), _ = l.encode(JSON.stringify(h));
		await d.add(f, new u.Uint8ArrayReader(_)), t[f] = {
			sha256: w(_),
			byte_length: _.byteLength
		};
		let v = l.encode(JSON.stringify(t));
		return await d.add(p, new u.Uint8ArrayReader(v)), await d.close();
	} catch (e) {
		throw A(e) || a?.aborted === !0 ? new k("cancelled", "Export was cancelled") : e;
	}
}
//#endregion
//#region ../../packages/storage/src/archive/import_archive.ts
var P = class extends Error {
	reason;
	namespace;
	constructor(e, t, n) {
		super(t), this.name = "ArchiveImportError", this.reason = e, this.namespace = n;
	}
};
function F(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function I(e) {
	if (e?.aborted === !0) throw new P("cancelled", "Import was cancelled");
}
async function L(e) {
	let t = await O();
	return typeof Blob < "u" && e instanceof Blob ? new t.BlobReader(e) : new t.Uint8ArrayReader(new Uint8Array(e));
}
async function R(e) {
	try {
		await e.close();
	} catch {}
}
async function z(e, t) {
	if (e.uncompressedSize > 536870912) throw new P("size_limit_exceeded", `Entry exceeds the maximum allowed uncompressed size: ${e.filename}`);
	let n = await O();
	return e.getData(new n.Uint8ArrayWriter(), t === void 0 ? {} : { signal: t });
}
function B(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
async function V(e, t) {
	let n = e.get(f);
	if (n === void 0) throw new P("missing_file", `Archive is missing ${f}`);
	let r = await z(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new P("invalid_manifest", `${f} is not valid JSON`);
	}
	if (B(i) !== 1) throw new P("unsupported_schema", "Archive declares an unsupported schema version");
	let o = a.safeParse(i);
	if (!o.success) throw new P("invalid_manifest", `${f} failed schema validation`);
	return {
		bytes: r,
		manifest: o.data
	};
}
async function H(e, t) {
	let n = e.get(p);
	if (n === void 0) throw new P("missing_file", `Archive is missing ${p}`);
	let i = await z(n, t), a;
	try {
		a = JSON.parse(new TextDecoder().decode(i));
	} catch {
		throw new P("invalid_checksums", `${p} is not valid JSON`);
	}
	let o = r.safeParse(a);
	if (!o.success) throw new P("invalid_checksums", `${p} failed schema validation`);
	return o.data;
}
function U(e, t) {
	for (let n of Object.keys(t)) if (!e.has(n)) throw new P("missing_file", `Archive is missing a file declared in ${p}: ${n}`);
	for (let n of e.keys()) if (n !== "checksums.json" && !(n in t)) throw new P("undeclared_file", `Archive contains a file not declared in ${p}: ${n}`);
}
function W(e, t, n) {
	let r = n[e];
	if (r === void 0) throw new P("missing_file", `${p} has no entry for ${e}`);
	if (t.byteLength !== r.byte_length || w(t) !== r.sha256) throw new P("checksum_mismatch", `Checksum mismatch for ${e}`);
}
function G(e) {
	return e === "image_records" ? c : d[e];
}
function K(e, t, n) {
	let r = new TextDecoder().decode(n);
	if (r.length === 0) return [];
	let i = G(e);
	return r.split("\n").filter((e) => e.length > 0).map((e, n) => {
		let r;
		try {
			r = JSON.parse(e);
		} catch {
			throw new P("malformed_record", `${t}:${String(n + 1)} is not valid JSON`);
		}
		let a = i.safeParse(r);
		if (!a.success) throw new P("invalid_record", `${t}:${String(n + 1)} failed schema validation`);
		return a.data;
	});
}
function q(e, t) {
	return {
		...e,
		namespace: t,
		record_key: `${t}:${e.id}`
	};
}
async function J(e, t, n, r, i) {
	let a = await e.get(t);
	if (a === null) {
		let a = u(n), o = new Uint8Array(n);
		await e.create({
			sha256: t,
			ref_count: r,
			byte_length: n.byteLength,
			blob: a === void 0 ? new Blob([o]) : new Blob([o], { type: a })
		}), i.set(t, {
			created: !0,
			delta: r
		});
	} else await e.update({
		...a,
		ref_count: a.ref_count + r
	}), i.set(t, {
		created: !1,
		delta: r
	});
}
async function Y(e, t, r) {
	for (let i of n) {
		let n = await t[i].list(r);
		n.length !== 0 && await l(e, [i], async (e) => {
			for (let a of n) await t[i].delete(r, a.id, e);
		});
	}
}
async function X(e, t) {
	for (let [n, r] of t) {
		if (r.created) {
			await e.delete(n);
			continue;
		}
		let t = await e.get(n);
		t !== null && await e.update({
			...t,
			ref_count: Math.max(0, t.ref_count - r.delta)
		});
	}
}
async function Z(e) {
	let { database: t, signal: r } = e, i = await O(), a = await L(e.archive), o = new i.ZipReader(a, r === void 0 ? {} : { signal: r }), c;
	try {
		c = await o.getEntries();
	} catch (e) {
		throw await R(o), F(e) || r?.aborted === !0 ? new P("cancelled", "Import was cancelled") : new P("invalid_input", `Archive could not be read: ${e instanceof Error ? e.message : String(e)}`);
	}
	let u = /* @__PURE__ */ new Map();
	for (let e of c) {
		if (e.directory) throw await R(o), new P("unexpected_path", `Unexpected directory entry: ${e.filename}`);
		if (u.has(e.filename)) throw await R(o), new P("duplicate_path", `Duplicate path in archive: ${e.filename}`);
		if (!v(e.filename)) throw await R(o), new P("unexpected_path", `Unexpected path in archive: ${e.filename}`);
		u.set(e.filename, e);
	}
	let d = `import:${crypto.randomUUID()}`, p = s(t), m = /* @__PURE__ */ new Map();
	try {
		let e = await V(u, r), i = await H(u, r);
		U(u, i), W(f, e.bytes, i);
		let a = e.manifest, s = T(), c = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Map();
		for (let e of n) {
			I(r);
			let n = g(e), a = u.get(n);
			if (a === void 0) throw new P("missing_file", `Archive is missing ${n}`);
			let o = await z(a, r);
			W(n, o, i);
			let f = K(e, n, o);
			s[e] = f.length;
			let m = f.map((e) => q(e, d));
			if (await l(t, [e], async (t) => {
				for (let n of m) await p[e].create(d, n, t);
			}), e === "vocabularies") for (let e of m) c.add(e.id);
			else if (e === "vocabulary_groups") {
				for (let e of m) if (!c.has(e.vocabulary_id)) throw new P("reference_mismatch", `vocabulary_groups ${e.id} references a missing vocabulary ${e.vocabulary_id}`);
			} else if (e === "image_records") for (let e of m) h.add(e.id), _.set(e.sha256, (_.get(e.sha256) ?? 0) + 1);
			else if (e === "generation_jobs") {
				for (let e of m) for (let t of e.image_ids) if (!h.has(t)) throw new P("reference_mismatch", `generation_jobs ${e.id} references a missing image_record ${t}`);
			}
		}
		let v = 0, y = /* @__PURE__ */ new Set();
		for (let [e, t] of u) {
			let n = b(e);
			if (n === null) continue;
			I(r);
			let a = await z(t, r);
			if (W(e, a, i), w(a) !== n.sha256) throw new P("checksum_mismatch", `Asset content hash does not match its filename: ${e}`);
			let o = _.get(n.sha256);
			if (o === void 0) throw new P("reference_mismatch", `Asset is not referenced by any image_record: ${e}`);
			await J(p.image_blobs, n.sha256, a, o, m), y.add(n.sha256), v += 1;
		}
		for (let e of _.keys()) if (!y.has(e)) throw new P("missing_file", `image_records reference asset ${e} with no matching archive asset file`);
		for (let e of n) if (a.record_counts[e] !== s[e]) throw new P("count_mismatch", `Declared record count for ${e} does not match the archive contents`);
		if (a.asset_count !== v) throw new P("count_mismatch", "Declared asset count does not match the archive contents");
		let x = {
			migration_id: d,
			source_version: 1,
			state: "import_ready",
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: {
				record_counts: s,
				asset_count: v,
				extension_version: a.extension_version
			}
		};
		return await p.migration_journal.create(x), await R(o), {
			namespace: d,
			manifest: a,
			asset_count: v
		};
	} catch (e) {
		throw await Y(t, p, d), await X(p.image_blobs, m), await R(o), e instanceof P ? new P(e.reason, e.message, d) : F(e) || r?.aborted === !0 ? new P("cancelled", "Import was cancelled", d) : new P("invalid_input", `Archive could not be imported: ${e instanceof Error ? e.message : String(e)}`, d);
	}
}
//#endregion
export { N as export_archive, Z as import_archive };
