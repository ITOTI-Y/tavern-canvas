import { n as e, t } from "./sha2-BGNex9vj.js";
import { a as n, d as r, f as i, g as a, l as o, m as s, p as c, s as l, t as u, u as d, v as f } from "./business_repositories-DrZf-uG8.js";
//#region ../../packages/storage/src/images/image_store.ts
var p = [
	"image_records",
	"image_blobs",
	"image_thumbnails"
], m = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, h = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, g = class extends i {
	constructor(e) {
		super(e, "image_records", l);
	}
};
async function _(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function v(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function y(n, r, i, a) {
	let o = d(i);
	if (o === void 0 || o !== a) throw new h(a);
	let s = f.parse(e(t(i))), c = await r.get(s, n);
	if (c === null) {
		let e = await v(n, s) + 1, t = {
			sha256: s,
			ref_count: e,
			byte_length: i.byteLength,
			blob: new Blob([new Uint8Array(i)], { type: o })
		};
		return await r.create(t, n), {
			sha256: s,
			byte_length: t.byte_length,
			media_type: o,
			ref_count: e
		};
	}
	let l = {
		...c,
		ref_count: c.ref_count + 1
	};
	return await r.put(l, n), {
		sha256: s,
		byte_length: c.byte_length,
		media_type: o,
		ref_count: l.ref_count
	};
}
async function b(e, t, n) {
	let r = f.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), await e.objectStore("image_thumbnails").delete(r), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function x(n, r, i) {
	let a = f.parse(i), o = await r.get(a, n);
	if (o === null) return null;
	let s = await _(o.blob);
	if (e(t(s)) !== a) throw new m(a);
	return s;
}
async function S(e, t, n, r, i) {
	let a = await y(e, n, i.bytes, i.claimed_media_type), o = {
		schema_version: 1,
		id: i.id,
		namespace: r,
		record_key: `${r}:${i.id}`,
		created_at: i.created_at,
		updated_at: i.created_at,
		sha256: a.sha256,
		last_accessed_at: i.created_at,
		pinned: i.pinned ?? !1,
		...i.metadata,
		media_type: a.media_type,
		quarantined: !1
	};
	return await t.create(r, o, e), o;
}
async function C(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new c("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await b(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function w(e, t, n) {
	let i = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of i) {
		let i = o.safeParse(n);
		if (!i.success || !r(i.data)) continue;
		let a = i.data;
		a.quarantined || await t.update(a.namespace, {
			...a,
			quarantined: !0
		}, e);
	}
}
async function T(e, t, n) {
	let r = new g(e), i = new u(e);
	return s(e, p, (e) => S(e, r, i, t, n));
}
async function E(e, t, r) {
	let i = new g(e), a = new u(e), o = new n(e);
	return s(e, [...p, "generation_jobs"], async (e) => {
		let n = await C(e, i, a, t, r);
		for (let n of await o.list(t, e)) n.image_ids.includes(r) && await o.put(t, {
			...n,
			image_ids: n.image_ids.filter((e) => e !== r)
		}, e);
		return n;
	});
}
async function D(e, t) {
	let n = await e.get("image_thumbnails", f.parse(t));
	if (n === void 0) return null;
	let r = a.parse(n);
	return {
		bytes: await _(r.blob),
		media_type: r.media_type
	};
}
async function O(e, t, n, r) {
	let i = f.parse(t);
	await s(e, ["image_blobs", "image_thumbnails"], async (e) => {
		await e.objectStore("image_blobs").get(i) !== void 0 && await e.objectStore("image_thumbnails").put(a.parse({
			sha256: i,
			media_type: r,
			blob: new Blob([new Uint8Array(n)], { type: r })
		}));
	});
}
async function k(e, t) {
	let n = new g(e), r = new u(e), i = await s(e, p, async (e) => {
		try {
			return { bytes: await x(e, r, t) };
		} catch (t) {
			if (!(t instanceof m)) throw t;
			return await w(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
export { k as a, O as i, E as n, D as o, T as r, b as s, g as t };
