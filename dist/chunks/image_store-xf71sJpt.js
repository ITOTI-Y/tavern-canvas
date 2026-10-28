import { n as e, t } from "./sha2-BGNex9vj.js";
import { _ as n, a as r, d as i, f as a, l as o, m as s, p as c, s as l, t as u, u as d } from "./business_repositories-Tf6NN3HM.js";
//#region ../../packages/storage/src/images/image_store.ts
var f = ["image_records", "image_blobs"], p = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, m = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, h = class extends a {
	constructor(e) {
		super(e, "image_records", l);
	}
};
async function g(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function _(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function v(r, i, a, o) {
	let s = d(a);
	if (s === void 0 || s !== o) throw new m(o);
	let c = n.parse(e(t(a))), l = await i.get(c, r);
	if (l === null) {
		let e = await _(r, c) + 1, t = {
			sha256: c,
			ref_count: e,
			byte_length: a.byteLength,
			blob: new Blob([new Uint8Array(a)], { type: s })
		};
		return await i.create(t, r), {
			sha256: c,
			byte_length: t.byte_length,
			media_type: s,
			ref_count: e
		};
	}
	let u = {
		...l,
		ref_count: l.ref_count + 1
	};
	return await i.put(u, r), {
		sha256: c,
		byte_length: l.byte_length,
		media_type: s,
		ref_count: u.ref_count
	};
}
async function y(e, t, r) {
	let i = n.parse(r), a = await t.get(i, e);
	return a === null ? !1 : a.ref_count <= 1 ? (await t.delete(i, e), !0) : (await t.put({
		...a,
		ref_count: a.ref_count - 1
	}, e), !1);
}
async function b(r, i, a) {
	let o = n.parse(a), s = await i.get(o, r);
	if (s === null) return null;
	let c = await g(s.blob);
	if (e(t(c)) !== o) throw new p(o);
	return c;
}
async function x(e, t, n, r, i) {
	let a = await v(e, n, i.bytes, i.claimed_media_type), o = {
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
async function S(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new c("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await y(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function C(e, t, n) {
	let r = await e.objectStore("image_records").index("sha256").getAll(n);
	for (let n of r) {
		let r = o.safeParse(n);
		if (!r.success || !i(r.data)) continue;
		let a = r.data;
		a.quarantined || await t.update(a.namespace, {
			...a,
			quarantined: !0
		}, e);
	}
}
async function w(e, t, n) {
	let r = new h(e), i = new u(e);
	return s(e, f, (e) => x(e, r, i, t, n));
}
async function T(e, t, n) {
	let i = new h(e), a = new u(e), o = new r(e);
	return s(e, [...f, "generation_jobs"], async (e) => {
		let r = await S(e, i, a, t, n);
		for (let r of await o.list(t, e)) r.image_ids.includes(n) && await o.put(t, {
			...r,
			image_ids: r.image_ids.filter((e) => e !== n)
		}, e);
		return r;
	});
}
async function E(e, t) {
	let n = new h(e), r = new u(e), i = await s(e, f, async (e) => {
		try {
			return { bytes: await b(e, r, t) };
		} catch (t) {
			if (!(t instanceof p)) throw t;
			return await C(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
export { y as a, E as i, T as n, w as r, h as t };
