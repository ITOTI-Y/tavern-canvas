import { n as e, t } from "./sha2-BGNex9vj.js";
import { a as n, r, w as i } from "./job_repository-BpPLSfp5.js";
import { a, c as o, l as s, s as c, t as l, u } from "./business_repositories-D4kRK7n6.js";
//#region ../../packages/storage/src/images/image_store.ts
var d = ["image_records", "image_blobs"], f = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, p = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, m = class extends r {
	constructor(e) {
		super(e, "image_records", a);
	}
};
async function h(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function g(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function _(n, r, a, s) {
	let c = o(a);
	if (c === void 0 || c !== s) throw new p(s);
	let l = i.parse(e(t(a))), u = await r.get(l, n);
	if (u === null) {
		let e = await g(n, l) + 1, t = {
			sha256: l,
			ref_count: e,
			byte_length: a.byteLength,
			blob: new Blob([new Uint8Array(a)], { type: c })
		};
		return await r.create(t, n), {
			sha256: l,
			byte_length: t.byte_length,
			media_type: c,
			ref_count: e
		};
	}
	let d = {
		...u,
		ref_count: u.ref_count + 1
	};
	return await r.put(d, n), {
		sha256: l,
		byte_length: u.byte_length,
		media_type: c,
		ref_count: d.ref_count
	};
}
async function v(e, t, n) {
	let r = i.parse(n), a = await t.get(r, e);
	return a === null ? !1 : a.ref_count <= 1 ? (await t.delete(r, e), !0) : (await t.put({
		...a,
		ref_count: a.ref_count - 1
	}, e), !1);
}
async function y(n, r, a) {
	let o = i.parse(a), s = await r.get(o, n);
	if (s === null) return null;
	let c = await h(s.blob);
	if (e(t(c)) !== o) throw new f(o);
	return c;
}
async function b(e, t, n, r, i) {
	let a = await _(e, n, i.bytes, i.claimed_media_type), o = {
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
async function x(e, t, r, i, a) {
	let o = await t.get(i, a, e);
	if (o === null) throw new n("image_records", `${i}:${a}`);
	await t.delete(i, a, e);
	let s = await v(e, r, o.sha256);
	return {
		sha256: o.sha256,
		blob_deleted: s
	};
}
async function S(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = c.safeParse(n);
		if (!r.success || !s(r.data)) continue;
		let i = r.data;
		i.quarantined || await t.update(i.namespace, {
			...i,
			quarantined: !0
		}, e);
	}
}
async function C(e, t, n) {
	let r = new m(e), i = new l(e);
	return u(e, d, (e) => b(e, r, i, t, n));
}
async function w(e, t, n) {
	let r = new m(e), i = new l(e);
	return u(e, d, (e) => x(e, r, i, t, n));
}
async function T(e, t) {
	let n = new m(e), r = new l(e), i = await u(e, d, async (e) => {
		try {
			return { bytes: await y(e, r, t) };
		} catch (t) {
			if (!(t instanceof f)) throw t;
			return await S(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
export { v as a, T as i, w as n, C as r, m as t };
