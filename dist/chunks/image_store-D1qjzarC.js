import { n as e, t } from "./sha2-BGNex9vj.js";
import { a as n, d as r, f as i, g as a, l as o, m as s, p as c, s as l, t as u, u as d, v as f } from "./business_repositories-DrZf-uG8.js";
//#region ../../packages/storage/src/images/image_size.ts
var p = /* @__PURE__ */ new Set([
	192,
	193,
	194,
	195,
	197,
	198,
	199,
	201,
	202,
	203,
	205,
	206,
	207
]);
function m(e, t, n) {
	return String.fromCharCode(...e.subarray(t, t + n));
}
function h(e) {
	return e.byteLength >= 24 ? {
		width: e.getUint32(16),
		height: e.getUint32(20)
	} : null;
}
function g(e, t) {
	let n = 2;
	for (; n + 9 < e.length;) {
		if (e[n] !== 255) return null;
		let r = e[n + 1] ?? 0;
		if (p.has(r)) return {
			width: t.getUint16(n + 7),
			height: t.getUint16(n + 5)
		};
		n += 2 + t.getUint16(n + 2);
	}
	return null;
}
function _(e, t) {
	let n = m(e, 12, 4);
	if (n === "VP8X" && e.length >= 30) {
		let e = (e) => t.getUint16(e, !0) + (t.getUint8(e + 2) << 16);
		return {
			width: 1 + e(24),
			height: 1 + e(27)
		};
	}
	if (n === "VP8 " && e.length >= 30) return {
		width: t.getUint16(26, !0) & 16383,
		height: t.getUint16(28, !0) & 16383
	};
	if (n === "VP8L" && e.length >= 25) {
		let e = t.getUint32(21, !0);
		return {
			width: (e & 16383) + 1,
			height: (e >> 14 & 16383) + 1
		};
	}
	return null;
}
function v(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = null;
	return m(e, 1, 3) === "PNG" ? n = h(t) : e[0] === 255 && e[1] === 216 ? n = g(e, t) : m(e, 0, 4) === "RIFF" && m(e, 8, 4) === "WEBP" && (n = _(e, t)), n !== null && n.width > 0 && n.height > 0 ? n : null;
}
//#endregion
//#region ../../packages/storage/src/images/image_store.ts
var y = [
	"image_records",
	"image_blobs",
	"image_thumbnails"
], b = class extends Error {
	code = "image_hash_mismatch";
	sha256;
	constructor(e) {
		super(`Image blob content no longer matches its sha256 key: ${e}`), this.name = "ImageCorruptionError", this.sha256 = e;
	}
}, x = class extends Error {
	constructor(e) {
		super(`Image bytes do not match the claimed media type: ${e}`), this.name = "ImageMediaTypeError";
	}
}, S = class extends i {
	constructor(e) {
		super(e, "image_records", l);
	}
};
async function C(e) {
	return e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
async function w(e, t) {
	return e.objectStore("image_records").index("sha256").count(t);
}
async function T(n, r, i, a) {
	let o = d(i);
	if (o === void 0 || o !== a) throw new x(a);
	let s = f.parse(e(t(i))), c = await r.get(s, n);
	if (c === null) {
		let e = await w(n, s) + 1, t = {
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
async function E(e, t, n) {
	let r = f.parse(n), i = await t.get(r, e);
	return i === null ? !1 : i.ref_count <= 1 ? (await t.delete(r, e), await e.objectStore("image_thumbnails").delete(r), !0) : (await t.put({
		...i,
		ref_count: i.ref_count - 1
	}, e), !1);
}
async function D(n, r, i) {
	let a = f.parse(i), o = await r.get(a, n);
	if (o === null) return null;
	let s = await C(o.blob);
	if (e(t(s)) !== a) throw new b(a);
	return s;
}
async function O(e, t, n, r, i) {
	let a = await T(e, n, i.bytes, i.claimed_media_type), o = {
		schema_version: 1,
		id: i.id,
		namespace: r,
		record_key: `${r}:${i.id}`,
		created_at: i.created_at,
		updated_at: i.created_at,
		sha256: a.sha256,
		last_accessed_at: i.created_at,
		pinned: i.pinned ?? !1,
		...i.metadata.width === void 0 ? v(i.bytes) : null,
		...i.metadata,
		media_type: a.media_type,
		quarantined: !1
	};
	return await t.create(r, o, e), o;
}
async function k(e, t, n, r, i) {
	let a = await t.get(r, i, e);
	if (a === null) throw new c("image_records", `${r}:${i}`);
	await t.delete(r, i, e);
	let o = await E(e, n, a.sha256);
	return {
		sha256: a.sha256,
		blob_deleted: o
	};
}
async function A(e, t, n) {
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
async function j(e, t, n) {
	let r = new S(e), i = new u(e);
	return s(e, y, (e) => O(e, r, i, t, n));
}
async function M(e, t, r) {
	let i = new S(e), a = new u(e), o = new n(e);
	return s(e, [...y, "generation_jobs"], async (e) => {
		let n = await k(e, i, a, t, r);
		for (let n of await o.list(t, e)) n.image_ids.includes(r) && await o.put(t, {
			...n,
			image_ids: n.image_ids.filter((e) => e !== r)
		}, e);
		return n;
	});
}
async function N(e, t) {
	let n = await e.get("image_thumbnails", f.parse(t));
	if (n === void 0) return null;
	let r = a.parse(n);
	return {
		bytes: await C(r.blob),
		media_type: r.media_type
	};
}
async function P(e, t, n, r) {
	let i = f.parse(t);
	await s(e, ["image_blobs", "image_thumbnails"], async (e) => {
		await e.objectStore("image_blobs").get(i) !== void 0 && await e.objectStore("image_thumbnails").put(a.parse({
			sha256: i,
			media_type: r,
			blob: new Blob([new Uint8Array(n)], { type: r })
		}));
	});
}
async function F(e, t) {
	let n = new S(e), r = new u(e), i = await s(e, y, async (e) => {
		try {
			return { bytes: await D(e, r, t) };
		} catch (t) {
			if (!(t instanceof b)) throw t;
			return await A(e, n, t.sha256), { error: t };
		}
	});
	if ("error" in i) throw i.error;
	return i.bytes;
}
//#endregion
export { F as a, v as c, P as i, M as n, N as o, j as r, E as s, S as t };
