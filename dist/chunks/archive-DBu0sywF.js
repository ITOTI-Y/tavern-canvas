import { n as e, t } from "./sha2-BGNex9vj.js";
import { T as n, b as r, g as i, l as a, m as o, s, v as c, y as l } from "./ids-DjWg1HG8.js";
import { C as u } from "./job_repository-DPx7Vzli.js";
import { c as d, i as f, s as p, u as m } from "./business_repositories-BQkU1ssS.js";
import { a as h } from "./image_store-ov5UgtDK.js";
//#region ../../packages/contracts/src/archive.ts
var g = "tavern-canvas-archive", _ = [
	"provider_profiles",
	"prompt_presets",
	"comfy_workflows",
	"novelai_vibes",
	"character_profiles",
	"regex_rules",
	"outfit_profiles",
	"lora_profiles",
	"prompt_tag_presets",
	"vocabularies",
	"vocabulary_groups",
	"image_records",
	"generation_jobs",
	"legacy_preferences"
], v = s(_), y = [
	"gateway_token",
	"provider_credentials",
	"logs",
	"support_bundles",
	"host_secrets"
], b = s(y), x = l({
	format: o(g),
	schema_version: o(1),
	extension_version: r().trim().min(1).max(64),
	created_at: n({ offset: !0 }),
	record_counts: c(v, i().int().nonnegative()),
	asset_count: i().int().nonnegative(),
	excluded_secret_categories: a(b)
}), S = l({
	sha256: r().regex(/^[a-f0-9]{64}$/u),
	byte_length: i().int().nonnegative()
}), C = c(r(), S), w = "manifest.json", T = "checksums.json", E = "assets", D = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;
function O(e) {
	return `records/${e}.jsonl`;
}
var k = /* @__PURE__ */ new Set([
	w,
	T,
	..._.map(O)
]);
function A(e) {
	return k.has(e) || j(e) !== null;
}
function ee(e, t) {
	return `${E}/${e}.${t}`;
}
function j(e) {
	let t = D.exec(e);
	if (t === null) return null;
	let [, n, r] = t;
	return n === void 0 || r === void 0 ? null : {
		sha256: n,
		extension: r
	};
}
var M = [
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
function N(e, t, n) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function te(e) {
	for (let t of M) if (N(e, t.bytes, t.offset ?? 0)) return t.extension;
	return N(e, [
		82,
		73,
		70,
		70
	], 0) && N(e, [
		87,
		69,
		66,
		80
	], 8) ? "webp" : "bin";
}
function P(n) {
	return e(t(n));
}
function F() {
	let e = {};
	for (let t of _) e[t] = 0;
	return e;
}
function ne(e) {
	return {
		format: g,
		schema_version: 1,
		extension_version: e.extension_version,
		created_at: e.created_at,
		record_counts: e.record_counts,
		asset_count: e.asset_count,
		excluded_secret_categories: [...y]
	};
}
//#endregion
//#region ../../packages/storage/src/archive/_zip_module.ts
var I;
function L() {
	return I ??= import("./zip.js-mUlaFE4p.js"), I;
}
//#endregion
//#region ../../packages/storage/src/archive/export_archive.ts
var R = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "ArchiveExportError", this.reason = e;
	}
};
function z(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function B(e) {
	if (e?.aborted === !0) throw new R("cancelled", "Export was cancelled");
}
async function V(e) {
	return typeof Blob < "u" && e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
}
async function H(e) {
	let { database: t, namespace: n, extension_version: r, signal: i } = e, a = e.created_at ?? (/* @__PURE__ */ new Date()).toISOString(), o = f(t), s = new TextEncoder(), c = await L(), l = new c.ZipWriter(new c.BlobWriter("application/zip"), {
		level: 9,
		...i === void 0 ? {} : { signal: i }
	});
	try {
		let e = F(), t = {};
		for (let r of _) {
			B(i);
			let a = await o[r].list(n), u = a.map((e) => JSON.stringify(e)).join("\n"), d = s.encode(a.length === 0 ? "" : `${u}\n`), f = O(r);
			await l.add(f, new c.Uint8ArrayReader(d)), t[f] = {
				sha256: P(d),
				byte_length: d.byteLength
			}, e[r] = a.length;
		}
		let u = await o.image_records.list(n), d = [...new Set(u.map((e) => e.sha256))].sort();
		for (let e of d) {
			B(i);
			let n = await o.image_blobs.get(e);
			if (n === null) throw new R("missing_asset_blob", `image_blobs is missing content referenced by image_records: ${e}`);
			let r = await V(n.blob), a = ee(e, te(r));
			await l.add(a, new c.Uint8ArrayReader(r)), t[a] = {
				sha256: P(r),
				byte_length: r.byteLength
			};
		}
		let f = ne({
			extension_version: r,
			created_at: a,
			record_counts: e,
			asset_count: d.length
		}), p = s.encode(JSON.stringify(f));
		await l.add(w, new c.Uint8ArrayReader(p)), t[w] = {
			sha256: P(p),
			byte_length: p.byteLength
		};
		let m = s.encode(JSON.stringify(t));
		return await l.add(T, new c.Uint8ArrayReader(m)), await l.close();
	} catch (e) {
		throw z(e) || i?.aborted === !0 ? new R("cancelled", "Export was cancelled") : e;
	}
}
//#endregion
//#region ../../packages/storage/src/archive/import_archive.ts
var U = class extends Error {
	reason;
	namespace;
	constructor(e, t, n) {
		super(t), this.name = "ArchiveImportError", this.reason = e, this.namespace = n;
	}
};
function W(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function G(e) {
	if (e?.aborted === !0) throw new U("cancelled", "Import was cancelled");
}
async function K(e) {
	let t = await L();
	return typeof Blob < "u" && e instanceof Blob ? new t.BlobReader(e) : new t.Uint8ArrayReader(new Uint8Array(e));
}
async function q(e) {
	try {
		await e.close();
	} catch {}
}
async function J(e, t) {
	if (e.uncompressedSize > 536870912) throw new U("size_limit_exceeded", `Entry exceeds the maximum allowed uncompressed size: ${e.filename}`);
	let n = await L();
	return e.getData(new n.Uint8ArrayWriter(), t === void 0 ? {} : { signal: t });
}
function Y(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
async function X(e, t) {
	let n = e.get(w);
	if (n === void 0) throw new U("missing_file", `Archive is missing ${w}`);
	let r = await J(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new U("invalid_manifest", `${w} is not valid JSON`);
	}
	if (Y(i) !== 1) throw new U("unsupported_schema", "Archive declares an unsupported schema version");
	let a = x.safeParse(i);
	if (!a.success) throw new U("invalid_manifest", `${w} failed schema validation`);
	return {
		bytes: r,
		manifest: a.data
	};
}
async function re(e, t) {
	let n = e.get(T);
	if (n === void 0) throw new U("missing_file", `Archive is missing ${T}`);
	let r = await J(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new U("invalid_checksums", `${T} is not valid JSON`);
	}
	let a = C.safeParse(i);
	if (!a.success) throw new U("invalid_checksums", `${T} failed schema validation`);
	return a.data;
}
function ie(e, t) {
	for (let n of Object.keys(t)) if (!e.has(n)) throw new U("missing_file", `Archive is missing a file declared in ${T}: ${n}`);
	for (let n of e.keys()) if (n !== "checksums.json" && !(n in t)) throw new U("undeclared_file", `Archive contains a file not declared in ${T}: ${n}`);
}
function Z(e, t, n) {
	let r = n[e];
	if (r === void 0) throw new U("missing_file", `${T} has no entry for ${e}`);
	if (t.byteLength !== r.byte_length || P(t) !== r.sha256) throw new U("checksum_mismatch", `Checksum mismatch for ${e}`);
}
function ae(e) {
	return e === "image_records" ? p : u[e];
}
function oe(e, t, n) {
	let r = new TextDecoder().decode(n);
	if (r.length === 0) return [];
	let i = ae(e);
	return r.split("\n").filter((e) => e.length > 0).map((e, n) => {
		let r;
		try {
			r = JSON.parse(e);
		} catch {
			throw new U("malformed_record", `${t}:${String(n + 1)} is not valid JSON`);
		}
		let a = i.safeParse(r);
		if (!a.success) throw new U("invalid_record", `${t}:${String(n + 1)} failed schema validation`);
		return a.data;
	});
}
function Q(e, t) {
	return {
		...e,
		namespace: t,
		record_key: `${t}:${e.id}`
	};
}
async function $(e, t, n, r, i) {
	let a = await e.get(t);
	if (a === null) {
		let a = d(n), o = new Uint8Array(n);
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
async function se(e, t, n) {
	for (let r of _) {
		let i = await t[r].list(n);
		i.length !== 0 && await m(e, [r], async (e) => {
			for (let a of i) await t[r].delete(n, a.id, e);
		});
	}
}
async function ce(e, t, n, r) {
	await m(e, [..._, "image_blobs"], async (e) => {
		for (let i of _) {
			let a = t[i];
			for (let o of await a.list(n, e)) {
				if (i === "image_records") {
					let n = await t.image_records.get(r, o.id, e);
					n !== null && await h(e, t.image_blobs, n.sha256);
				}
				await a.put(r, Q(o, r), e), await a.delete(n, o.id, e);
			}
		}
	});
}
async function le(e, t) {
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
async function ue(e) {
	let { database: t, signal: n } = e, r = await L(), i = await K(e.archive), a = new r.ZipReader(i, n === void 0 ? {} : { signal: n }), o;
	try {
		o = await a.getEntries();
	} catch (e) {
		throw await q(a), W(e) || n?.aborted === !0 ? new U("cancelled", "Import was cancelled") : new U("invalid_input", `Archive could not be read: ${e instanceof Error ? e.message : String(e)}`);
	}
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		if (e.directory) throw await q(a), new U("unexpected_path", `Unexpected directory entry: ${e.filename}`);
		if (s.has(e.filename)) throw await q(a), new U("duplicate_path", `Duplicate path in archive: ${e.filename}`);
		if (!A(e.filename)) throw await q(a), new U("unexpected_path", `Unexpected path in archive: ${e.filename}`);
		s.set(e.filename, e);
	}
	let c = `import:${crypto.randomUUID()}`, l = f(t), u = /* @__PURE__ */ new Map();
	try {
		let r = await X(s, n), i = await re(s, n);
		ie(s, i), Z(w, r.bytes, i);
		let o = r.manifest, d = F(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
		for (let e of _) {
			G(n);
			let r = O(e), a = s.get(r);
			if (a === void 0) throw new U("missing_file", `Archive is missing ${r}`);
			let o = await J(a, n);
			Z(r, o, i);
			let u = oe(e, r, o);
			d[e] = u.length;
			let g = u.map((e) => Q(e, c));
			if (await m(t, [e], async (t) => {
				for (let n of g) await l[e].create(c, n, t);
			}), e === "vocabularies") for (let e of g) f.add(e.id);
			else if (e === "vocabulary_groups") {
				for (let e of g) if (!f.has(e.vocabulary_id)) throw new U("reference_mismatch", `vocabulary_groups ${e.id} references a missing vocabulary ${e.vocabulary_id}`);
			} else if (e === "image_records") for (let e of g) p.add(e.id), h.set(e.sha256, (h.get(e.sha256) ?? 0) + 1);
			else if (e === "generation_jobs") {
				for (let e of g) for (let t of e.image_ids) if (!p.has(t)) throw new U("reference_mismatch", `generation_jobs ${e.id} references a missing image_record ${t}`);
			}
		}
		let g = 0, v = /* @__PURE__ */ new Set();
		for (let [e, t] of s) {
			let r = j(e);
			if (r === null) continue;
			G(n);
			let a = await J(t, n);
			if (Z(e, a, i), P(a) !== r.sha256) throw new U("checksum_mismatch", `Asset content hash does not match its filename: ${e}`);
			let o = h.get(r.sha256);
			if (o === void 0) throw new U("reference_mismatch", `Asset is not referenced by any image_record: ${e}`);
			await $(l.image_blobs, r.sha256, a, o, u), v.add(r.sha256), g += 1;
		}
		for (let e of h.keys()) if (!v.has(e)) throw new U("missing_file", `image_records reference asset ${e} with no matching archive asset file`);
		for (let e of _) if (o.record_counts[e] !== d[e]) throw new U("count_mismatch", `Declared record count for ${e} does not match the archive contents`);
		if (o.asset_count !== g) throw new U("count_mismatch", "Declared asset count does not match the archive contents");
		return G(n), await ce(t, l, c, e.namespace), await q(a), {
			manifest: o,
			asset_count: g
		};
	} catch (e) {
		throw await se(t, l, c), await le(l.image_blobs, u), await q(a), e instanceof U ? new U(e.reason, e.message, c) : W(e) || n?.aborted === !0 ? new U("cancelled", "Import was cancelled", c) : new U("invalid_input", `Archive could not be imported: ${e instanceof Error ? e.message : String(e)}`, c);
	}
}
//#endregion
export { H as export_archive, ue as import_archive };
