import { d as e, f as t } from "./provider-ChWi4KfU.js";
import { E as n, b as r, g as i, l as a, m as o, s, x as c, y as l } from "./ids-CQF5rr2J.js";
import { S as u } from "./job_repository-BCVJs26r.js";
import { a as d, c as f, d as p, l as m } from "./business_repositories-Cv2ukFwX.js";
//#region ../../packages/contracts/src/archive.ts
var h = "tavern-canvas-archive", g = [
	"provider_profiles",
	"prompt_presets",
	"comfy_workflows",
	"novelai_vibes",
	"character_profiles",
	"regex_rules",
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"image_records",
	"generation_jobs",
	"legacy_preferences"
], _ = s(g), v = [
	"gateway_token",
	"provider_credentials",
	"logs",
	"support_bundles",
	"host_secrets"
], y = s(v), b = r({
	format: o(h),
	schema_version: o(1),
	extension_version: c().trim().min(1).max(64),
	created_at: n({ offset: !0 }),
	record_counts: l(_, i().int().nonnegative()),
	asset_count: i().int().nonnegative(),
	excluded_secret_categories: a(y)
}), x = r({
	sha256: c().regex(/^[a-f0-9]{64}$/u),
	byte_length: i().int().nonnegative()
}), S = l(c(), x), C = "manifest.json", w = "checksums.json", T = "assets", E = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;
function D(e) {
	return `records/${e}.jsonl`;
}
var O = /* @__PURE__ */ new Set([
	C,
	w,
	...g.map(D)
]);
function k(e) {
	return O.has(e) || j(e) !== null;
}
function A(e, t) {
	return `${T}/${e}.${t}`;
}
function j(e) {
	let t = E.exec(e);
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
function P(e) {
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
function F(n) {
	return t(e(n));
}
function I() {
	let e = {};
	for (let t of g) e[t] = 0;
	return e;
}
function L(e) {
	return {
		format: h,
		schema_version: 1,
		extension_version: e.extension_version,
		created_at: e.created_at,
		record_counts: e.record_counts,
		asset_count: e.asset_count,
		excluded_secret_categories: [...v]
	};
}
//#endregion
//#region ../../packages/storage/src/archive/_zip_module.ts
var R;
function z() {
	return R ??= import("./zip.js-mUlaFE4p.js"), R;
}
//#endregion
//#region ../../packages/storage/src/archive/export_archive.ts
var B = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "ArchiveExportError", this.reason = e;
	}
};
function V(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function H(e) {
	if (e?.aborted === !0) throw new B("cancelled", "Export was cancelled");
}
async function U(e) {
	return typeof Blob < "u" && e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
}
async function W(e) {
	let { database: t, namespace: n, extension_version: r, signal: i } = e, a = e.created_at ?? (/* @__PURE__ */ new Date()).toISOString(), o = d(t), s = new TextEncoder(), c = await z(), l = new c.ZipWriter(new c.BlobWriter("application/zip"), {
		level: 9,
		...i === void 0 ? {} : { signal: i }
	});
	try {
		let e = I(), t = {};
		for (let r of g) {
			H(i);
			let a = await o[r].list(n), u = a.map((e) => JSON.stringify(e)).join("\n"), d = s.encode(a.length === 0 ? "" : `${u}\n`), f = D(r);
			await l.add(f, new c.Uint8ArrayReader(d)), t[f] = {
				sha256: F(d),
				byte_length: d.byteLength
			}, e[r] = a.length;
		}
		let u = await o.image_records.list(n), d = [...new Set(u.map((e) => e.sha256))].sort();
		for (let e of d) {
			H(i);
			let n = await o.image_blobs.get(e);
			if (n === null) throw new B("missing_asset_blob", `image_blobs is missing content referenced by image_records: ${e}`);
			let r = await U(n.blob), a = A(e, P(r));
			await l.add(a, new c.Uint8ArrayReader(r)), t[a] = {
				sha256: F(r),
				byte_length: r.byteLength
			};
		}
		let f = L({
			extension_version: r,
			created_at: a,
			record_counts: e,
			asset_count: d.length
		}), p = s.encode(JSON.stringify(f));
		await l.add(C, new c.Uint8ArrayReader(p)), t[C] = {
			sha256: F(p),
			byte_length: p.byteLength
		};
		let m = s.encode(JSON.stringify(t));
		return await l.add(w, new c.Uint8ArrayReader(m)), await l.close();
	} catch (e) {
		throw V(e) || i?.aborted === !0 ? new B("cancelled", "Export was cancelled") : e;
	}
}
//#endregion
//#region ../../packages/storage/src/archive/import_archive.ts
var G = class extends Error {
	reason;
	namespace;
	constructor(e, t, n) {
		super(t), this.name = "ArchiveImportError", this.reason = e, this.namespace = n;
	}
};
function K(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function q(e) {
	if (e?.aborted === !0) throw new G("cancelled", "Import was cancelled");
}
async function J(e) {
	let t = await z();
	return typeof Blob < "u" && e instanceof Blob ? new t.BlobReader(e) : new t.Uint8ArrayReader(new Uint8Array(e));
}
async function Y(e) {
	try {
		await e.close();
	} catch {}
}
async function X(e, t) {
	if (e.uncompressedSize > 536870912) throw new G("size_limit_exceeded", `Entry exceeds the maximum allowed uncompressed size: ${e.filename}`);
	let n = await z();
	return e.getData(new n.Uint8ArrayWriter(), t === void 0 ? {} : { signal: t });
}
function Z(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
async function Q(e, t) {
	let n = e.get(C);
	if (n === void 0) throw new G("missing_file", `Archive is missing ${C}`);
	let r = await X(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new G("invalid_manifest", `${C} is not valid JSON`);
	}
	if (Z(i) !== 1) throw new G("unsupported_schema", "Archive declares an unsupported schema version");
	let a = b.safeParse(i);
	if (!a.success) throw new G("invalid_manifest", `${C} failed schema validation`);
	return {
		bytes: r,
		manifest: a.data
	};
}
async function ee(e, t) {
	let n = e.get(w);
	if (n === void 0) throw new G("missing_file", `Archive is missing ${w}`);
	let r = await X(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new G("invalid_checksums", `${w} is not valid JSON`);
	}
	let a = S.safeParse(i);
	if (!a.success) throw new G("invalid_checksums", `${w} failed schema validation`);
	return a.data;
}
function te(e, t) {
	for (let n of Object.keys(t)) if (!e.has(n)) throw new G("missing_file", `Archive is missing a file declared in ${w}: ${n}`);
	for (let n of e.keys()) if (n !== "checksums.json" && !(n in t)) throw new G("undeclared_file", `Archive contains a file not declared in ${w}: ${n}`);
}
function $(e, t, n) {
	let r = n[e];
	if (r === void 0) throw new G("missing_file", `${w} has no entry for ${e}`);
	if (t.byteLength !== r.byte_length || F(t) !== r.sha256) throw new G("checksum_mismatch", `Checksum mismatch for ${e}`);
}
function ne(e) {
	return e === "image_records" ? f : u[e];
}
function re(e, t, n) {
	let r = new TextDecoder().decode(n);
	if (r.length === 0) return [];
	let i = ne(e);
	return r.split("\n").filter((e) => e.length > 0).map((e, n) => {
		let r;
		try {
			r = JSON.parse(e);
		} catch {
			throw new G("malformed_record", `${t}:${String(n + 1)} is not valid JSON`);
		}
		let a = i.safeParse(r);
		if (!a.success) throw new G("invalid_record", `${t}:${String(n + 1)} failed schema validation`);
		return a.data;
	});
}
function ie(e, t) {
	return {
		...e,
		namespace: t,
		record_key: `${t}:${e.id}`
	};
}
async function ae(e, t, n, r, i) {
	let a = await e.get(t);
	if (a === null) {
		let a = m(n), o = new Uint8Array(n);
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
async function oe(e, t, n) {
	for (let r of g) {
		let i = await t[r].list(n);
		i.length !== 0 && await p(e, [r], async (e) => {
			for (let a of i) await t[r].delete(n, a.id, e);
		});
	}
}
async function se(e, t) {
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
async function ce(e) {
	let { database: t, signal: n } = e, r = await z(), i = await J(e.archive), a = new r.ZipReader(i, n === void 0 ? {} : { signal: n }), o;
	try {
		o = await a.getEntries();
	} catch (e) {
		throw await Y(a), K(e) || n?.aborted === !0 ? new G("cancelled", "Import was cancelled") : new G("invalid_input", `Archive could not be read: ${e instanceof Error ? e.message : String(e)}`);
	}
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		if (e.directory) throw await Y(a), new G("unexpected_path", `Unexpected directory entry: ${e.filename}`);
		if (s.has(e.filename)) throw await Y(a), new G("duplicate_path", `Duplicate path in archive: ${e.filename}`);
		if (!k(e.filename)) throw await Y(a), new G("unexpected_path", `Unexpected path in archive: ${e.filename}`);
		s.set(e.filename, e);
	}
	let c = `import:${crypto.randomUUID()}`, l = d(t), u = /* @__PURE__ */ new Map();
	try {
		let e = await Q(s, n), r = await ee(s, n);
		te(s, r), $(C, e.bytes, r);
		let i = e.manifest, o = I(), d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
		for (let e of g) {
			q(n);
			let i = D(e), a = s.get(i);
			if (a === void 0) throw new G("missing_file", `Archive is missing ${i}`);
			let u = await X(a, n);
			$(i, u, r);
			let h = re(e, i, u);
			o[e] = h.length;
			let g = h.map((e) => ie(e, c));
			if (await p(t, [e], async (t) => {
				for (let n of g) await l[e].create(c, n, t);
			}), e === "vocabularies") for (let e of g) d.add(e.id);
			else if (e === "vocabulary_groups") {
				for (let e of g) if (!d.has(e.vocabulary_id)) throw new G("reference_mismatch", `vocabulary_groups ${e.id} references a missing vocabulary ${e.vocabulary_id}`);
			} else if (e === "image_records") for (let e of g) f.add(e.id), m.set(e.sha256, (m.get(e.sha256) ?? 0) + 1);
			else if (e === "generation_jobs") {
				for (let e of g) for (let t of e.image_ids) if (!f.has(t)) throw new G("reference_mismatch", `generation_jobs ${e.id} references a missing image_record ${t}`);
			}
		}
		let h = 0, _ = /* @__PURE__ */ new Set();
		for (let [e, t] of s) {
			let i = j(e);
			if (i === null) continue;
			q(n);
			let a = await X(t, n);
			if ($(e, a, r), F(a) !== i.sha256) throw new G("checksum_mismatch", `Asset content hash does not match its filename: ${e}`);
			let o = m.get(i.sha256);
			if (o === void 0) throw new G("reference_mismatch", `Asset is not referenced by any image_record: ${e}`);
			await ae(l.image_blobs, i.sha256, a, o, u), _.add(i.sha256), h += 1;
		}
		for (let e of m.keys()) if (!_.has(e)) throw new G("missing_file", `image_records reference asset ${e} with no matching archive asset file`);
		for (let e of g) if (i.record_counts[e] !== o[e]) throw new G("count_mismatch", `Declared record count for ${e} does not match the archive contents`);
		if (i.asset_count !== h) throw new G("count_mismatch", "Declared asset count does not match the archive contents");
		let v = {
			migration_id: c,
			source_version: 1,
			state: "import_ready",
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			payload: {
				record_counts: o,
				asset_count: h,
				extension_version: i.extension_version
			}
		};
		return await l.migration_journal.create(v), await Y(a), {
			namespace: c,
			manifest: i,
			asset_count: h
		};
	} catch (e) {
		throw await oe(t, l, c), await se(l.image_blobs, u), await Y(a), e instanceof G ? new G(e.reason, e.message, c) : K(e) || n?.aborted === !0 ? new G("cancelled", "Import was cancelled", c) : new G("invalid_input", `Archive could not be imported: ${e instanceof Error ? e.message : String(e)}`, c);
	}
}
//#endregion
export { W as export_archive, ce as import_archive };
