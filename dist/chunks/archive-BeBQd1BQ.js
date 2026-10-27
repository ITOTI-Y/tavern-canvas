import { n as e, t } from "./sha2-BGNex9vj.js";
import { c as n, h as r, m as i, p as a, r as o, t as s, u as c, x as l } from "./schemas-DMBLWk59.js";
import { b as u } from "./job_repository-D9SqferT.js";
import { c as d, i as f, s as p, u as m } from "./business_repositories-g30McWFh.js";
import { a as h } from "./image_store-CzdOstBK.js";
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
	"image_records",
	"generation_jobs"
], v = s(_), y = [
	"gateway_token",
	"provider_credentials",
	"logs",
	"support_bundles",
	"host_secrets"
], b = s(y), x = i({
	format: n(g),
	schema_version: n(1),
	extension_version: r().trim().min(1).max(64),
	created_at: l({ offset: !0 }),
	record_counts: a(v, c().int().nonnegative()),
	asset_count: c().int().nonnegative(),
	excluded_secret_categories: o(b)
}), ee = i({
	sha256: r().regex(/^[a-f0-9]{64}$/u),
	byte_length: c().int().nonnegative()
}), S = a(r(), ee), C = "manifest.json", w = "checksums.json", T = "assets", E = /^assets\/([a-f0-9]{64})\.([a-z0-9]{1,8})$/u;
function D(e) {
	return `records/${e}.jsonl`;
}
var O = /* @__PURE__ */ new Set([
	C,
	w,
	..._.map(D)
]);
function te(e) {
	return O.has(e) || A(e) !== null;
}
function k(e, t) {
	return `${T}/${e}.${t}`;
}
function A(e) {
	let t = E.exec(e);
	if (t === null) return null;
	let [, n, r] = t;
	return n === void 0 || r === void 0 ? null : {
		sha256: n,
		extension: r
	};
}
var j = [
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
function M(e, t, n) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function N(e) {
	for (let t of j) if (M(e, t.bytes, t.offset ?? 0)) return t.extension;
	return M(e, [
		82,
		73,
		70,
		70
	], 0) && M(e, [
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
function I(e) {
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
var L;
function R() {
	return L ??= import("./zip.js-mUlaFE4p.js"), L;
}
//#endregion
//#region ../../packages/storage/src/archive/export_archive.ts
var z = class extends Error {
	reason;
	constructor(e, t) {
		super(t), this.name = "ArchiveExportError", this.reason = e;
	}
};
function B(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function V(e) {
	if (e?.aborted === !0) throw new z("cancelled", "Export was cancelled");
}
async function H(e) {
	return typeof Blob < "u" && e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
}
async function U(e) {
	let { database: t, namespace: n, extension_version: r, signal: i } = e, a = e.created_at ?? (/* @__PURE__ */ new Date()).toISOString(), o = f(t), s = new TextEncoder(), c = await R(), l = new c.ZipWriter(new c.BlobWriter("application/zip"), {
		level: 9,
		...i === void 0 ? {} : { signal: i }
	});
	try {
		let e = F(), t = {};
		for (let r of _) {
			V(i);
			let a = await o[r].list(n), u = a.map((e) => JSON.stringify(e)).join("\n"), d = s.encode(a.length === 0 ? "" : `${u}\n`), f = D(r);
			await l.add(f, new c.Uint8ArrayReader(d)), t[f] = {
				sha256: P(d),
				byte_length: d.byteLength
			}, e[r] = a.length;
		}
		let u = await o.image_records.list(n), d = [...new Set(u.map((e) => e.sha256))].sort();
		for (let e of d) {
			V(i);
			let n = await o.image_blobs.get(e);
			if (n === null) throw new z("missing_asset_blob", `image_blobs is missing content referenced by image_records: ${e}`);
			let r = await H(n.blob), a = k(e, N(r));
			await l.add(a, new c.Uint8ArrayReader(r)), t[a] = {
				sha256: P(r),
				byte_length: r.byteLength
			};
		}
		let f = I({
			extension_version: r,
			created_at: a,
			record_counts: e,
			asset_count: d.length
		}), p = s.encode(JSON.stringify(f));
		await l.add(C, new c.Uint8ArrayReader(p)), t[C] = {
			sha256: P(p),
			byte_length: p.byteLength
		};
		let m = s.encode(JSON.stringify(t));
		return await l.add(w, new c.Uint8ArrayReader(m)), await l.close();
	} catch (e) {
		throw B(e) || i?.aborted === !0 ? new z("cancelled", "Export was cancelled") : e;
	}
}
//#endregion
//#region ../../packages/storage/src/archive/import_archive.ts
var W = class extends Error {
	reason;
	namespace;
	constructor(e, t, n) {
		super(t), this.name = "ArchiveImportError", this.reason = e, this.namespace = n;
	}
};
function G(e) {
	return e instanceof DOMException && e.name === "AbortError";
}
function K(e) {
	if (e?.aborted === !0) throw new W("cancelled", "Import was cancelled");
}
async function q(e) {
	let t = await R();
	return typeof Blob < "u" && e instanceof Blob ? new t.BlobReader(e) : new t.Uint8ArrayReader(new Uint8Array(e));
}
async function J(e) {
	try {
		await e.close();
	} catch {}
}
async function Y(e, t) {
	if (e.uncompressedSize > 536870912) throw new W("size_limit_exceeded", `Entry exceeds the maximum allowed uncompressed size: ${e.filename}`);
	let n = await R();
	return e.getData(new n.Uint8ArrayWriter(), t === void 0 ? {} : { signal: t });
}
function X(e) {
	if (typeof e != "object" || !e) return;
	let t = e.schema_version;
	return typeof t == "number" ? t : void 0;
}
async function Z(e, t) {
	let n = e.get(C);
	if (n === void 0) throw new W("missing_file", `Archive is missing ${C}`);
	let r = await Y(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new W("invalid_manifest", `${C} is not valid JSON`);
	}
	if (X(i) !== 1) throw new W("unsupported_schema", "Archive declares an unsupported schema version");
	let a = x.safeParse(i);
	if (!a.success) throw new W("invalid_manifest", `${C} failed schema validation`);
	return {
		bytes: r,
		manifest: a.data
	};
}
async function ne(e, t) {
	let n = e.get(w);
	if (n === void 0) throw new W("missing_file", `Archive is missing ${w}`);
	let r = await Y(n, t), i;
	try {
		i = JSON.parse(new TextDecoder().decode(r));
	} catch {
		throw new W("invalid_checksums", `${w} is not valid JSON`);
	}
	let a = S.safeParse(i);
	if (!a.success) throw new W("invalid_checksums", `${w} failed schema validation`);
	return a.data;
}
function re(e, t) {
	for (let n of Object.keys(t)) if (!e.has(n)) throw new W("missing_file", `Archive is missing a file declared in ${w}: ${n}`);
	for (let n of e.keys()) if (n !== "checksums.json" && !(n in t)) throw new W("undeclared_file", `Archive contains a file not declared in ${w}: ${n}`);
}
function Q(e, t, n) {
	let r = n[e];
	if (r === void 0) throw new W("missing_file", `${w} has no entry for ${e}`);
	if (t.byteLength !== r.byte_length || P(t) !== r.sha256) throw new W("checksum_mismatch", `Checksum mismatch for ${e}`);
}
function ie(e) {
	return e === "image_records" ? p : u[e];
}
function ae(e, t, n) {
	let r = new TextDecoder().decode(n);
	if (r.length === 0) return [];
	let i = ie(e);
	return r.split("\n").filter((e) => e.length > 0).map((e, n) => {
		let r;
		try {
			r = JSON.parse(e);
		} catch {
			throw new W("malformed_record", `${t}:${String(n + 1)} is not valid JSON`);
		}
		let a = i.safeParse(r);
		if (!a.success) throw new W("invalid_record", `${t}:${String(n + 1)} failed schema validation`);
		return a.data;
	});
}
function $(e, t) {
	return {
		...e,
		namespace: t,
		record_key: `${t}:${e.id}`
	};
}
async function oe(e, t, n, r, i) {
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
				await a.put(r, $(o, r), e), await a.delete(n, o.id, e);
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
	let { database: t, signal: n } = e, r = await R(), i = await q(e.archive), a = new r.ZipReader(i, n === void 0 ? {} : { signal: n }), o;
	try {
		o = await a.getEntries();
	} catch (e) {
		throw await J(a), G(e) || n?.aborted === !0 ? new W("cancelled", "Import was cancelled") : new W("invalid_input", `Archive could not be read: ${e instanceof Error ? e.message : String(e)}`);
	}
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		if (e.directory) throw await J(a), new W("unexpected_path", `Unexpected directory entry: ${e.filename}`);
		if (s.has(e.filename)) throw await J(a), new W("duplicate_path", `Duplicate path in archive: ${e.filename}`);
		if (!te(e.filename)) throw await J(a), new W("unexpected_path", `Unexpected path in archive: ${e.filename}`);
		s.set(e.filename, e);
	}
	let c = `import:${crypto.randomUUID()}`, l = f(t), u = /* @__PURE__ */ new Map();
	try {
		let r = await Z(s, n), i = await ne(s, n);
		re(s, i), Q(C, r.bytes, i);
		let o = r.manifest, d = F(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
		for (let e of _) {
			K(n);
			let r = D(e), a = s.get(r);
			if (a === void 0) throw new W("missing_file", `Archive is missing ${r}`);
			let o = await Y(a, n);
			Q(r, o, i);
			let u = ae(e, r, o);
			d[e] = u.length;
			let h = u.map((e) => $(e, c));
			if (await m(t, [e], async (t) => {
				for (let n of h) await l[e].create(c, n, t);
			}), e === "image_records") for (let e of h) f.add(e.id), p.set(e.sha256, (p.get(e.sha256) ?? 0) + 1);
			else if (e === "generation_jobs") {
				for (let e of h) for (let t of e.image_ids) if (!f.has(t)) throw new W("reference_mismatch", `generation_jobs ${e.id} references a missing image_record ${t}`);
			}
		}
		let h = 0, g = /* @__PURE__ */ new Set();
		for (let [e, t] of s) {
			let r = A(e);
			if (r === null) continue;
			K(n);
			let a = await Y(t, n);
			if (Q(e, a, i), P(a) !== r.sha256) throw new W("checksum_mismatch", `Asset content hash does not match its filename: ${e}`);
			let o = p.get(r.sha256);
			if (o === void 0) throw new W("reference_mismatch", `Asset is not referenced by any image_record: ${e}`);
			await oe(l.image_blobs, r.sha256, a, o, u), g.add(r.sha256), h += 1;
		}
		for (let e of p.keys()) if (!g.has(e)) throw new W("missing_file", `image_records reference asset ${e} with no matching archive asset file`);
		for (let e of _) if (o.record_counts[e] !== d[e]) throw new W("count_mismatch", `Declared record count for ${e} does not match the archive contents`);
		if (o.asset_count !== h) throw new W("count_mismatch", "Declared asset count does not match the archive contents");
		return K(n), await ce(t, l, c, e.namespace), await J(a), {
			manifest: o,
			asset_count: h
		};
	} catch (e) {
		throw await se(t, l, c), await le(l.image_blobs, u), await J(a), e instanceof W ? new W(e.reason, e.message, c) : G(e) || n?.aborted === !0 ? new W("cancelled", "Import was cancelled", c) : new W("invalid_input", `Archive could not be imported: ${e instanceof Error ? e.message : String(e)}`, c);
	}
}
//#endregion
export { U as export_archive, ue as import_archive };
