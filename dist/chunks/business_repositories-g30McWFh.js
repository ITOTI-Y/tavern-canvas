import { _ as e, h as t, i as n, m as r, t as i, u as a, y as o } from "./schemas-DMBLWk59.js";
import { n as s } from "./generation-D3I1cvL5.js";
import { o as c } from "./provider-Ctw4medr.js";
import { E as ee, O as te, S as l, T as u, _ as d, a as f, c as p, d as m, f as h, g, h as _, i as ne, l as re, m as ie, o as v, p as ae, r as y, s as oe, t as b, u as x, v as S, w as C, x as w, y as T } from "./job_repository-D9SqferT.js";
import { n as E } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/open_database.ts
var D = null, O = null;
function k(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), D === i && (D = null));
	}, r = () => (n(), Promise.resolve()), i = e;
	return Object.defineProperty(i, "connection", {
		configurable: !1,
		enumerable: !1,
		value: i,
		writable: !1
	}), Object.defineProperty(i, "dispose", {
		configurable: !0,
		enumerable: !1,
		value: r,
		writable: !1
	}), e.addEventListener("versionchange", n), i;
}
function A() {
	return D === null ? (O === null && (O = E(re, 9, { upgrade: te }).then((e) => {
		let t = k(e);
		return D = t, t;
	}).finally(() => {
		O = null;
	})), O) : Promise.resolve(D);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function j(e, t, n) {
	let r = Array.isArray(e) ? await A() : e, i, a;
	if (Array.isArray(e) ? (i = e, a = t) : (i = t, a = n), !Array.isArray(i)) throw TypeError("with_transaction requires store names");
	if (typeof a != "function") throw TypeError("with_transaction requires a callback");
	let o = r.transaction(i, "readwrite");
	try {
		let e = await a(o);
		return await o.done, e;
	} catch (e) {
		try {
			o.abort();
		} catch {}
		try {
			await o.done;
		} catch {}
		throw e;
	}
}
var M = i([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), N = r({
	chat_id: t().trim().min(1).max(512),
	message_id: t().trim().min(1).max(512),
	swipe_id: a().int().nonnegative()
}), P = r({
	provider_id: c,
	source_message: N.nullable(),
	generation_parameters: s,
	media_type: M,
	width: a().int().positive().optional(),
	height: a().int().positive().optional(),
	persisted_url: o().max(2048).optional(),
	quarantined: n().default(!1),
	duration_ms: a().int().positive().optional(),
	poster_image_id: C.optional(),
	source_job_id: C.optional()
}), F = m.extend(P.shape), I = e([m, F]);
function L(e) {
	return "media_type" in e;
}
var R = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], z = [
	255,
	216,
	255
], se = [
	82,
	73,
	70,
	70
], B = [
	87,
	69,
	66,
	80
], V = [
	102,
	116,
	121,
	112
];
function H(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function U(e) {
	if (H(e, R)) return "image/png";
	if (H(e, z)) return "image/jpeg";
	if (H(e, se) && H(e, B, 8)) return "image/webp";
	if (H(e, V, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var W = class extends y {
	constructor(e) {
		super(e, "provider_profiles", T, !0);
	}
}, G = class extends y {
	constructor(e) {
		super(e, "prompt_presets", g);
	}
}, K = class extends y {
	constructor(e) {
		super(e, "comfy_workflows", p);
	}
}, ce = class extends y {
	constructor(e) {
		super(e, "novelai_vibes", ie);
	}
}, le = class extends y {
	constructor(e) {
		super(e, "character_profiles", oe);
	}
}, ue = class extends y {
	constructor(e) {
		super(e, "outfit_profiles", _);
	}
}, de = class extends y {
	constructor(e) {
		super(e, "regex_rules", w);
	}
}, fe = class extends y {
	constructor(e) {
		super(e, "prompt_tag_presets", d);
	}
}, pe = class extends y {
	constructor(e) {
		super(e, "lora_profiles", h);
	}
}, q = class extends y {
	constructor(e) {
		super(e, "vocabulary_packages", u);
	}
}, J = class extends y {
	constructor(e) {
		super(e, "vocabulary_shards", ee);
	}
}, me = class extends y {
	constructor(e) {
		super(e, "image_records", I);
	}
}, he = class extends y {
	constructor(e) {
		super(e, "novelai_vibe_encodings", ae);
	}
}, ge = class extends y {
	constructor(e) {
		super(e, "provider_input_assets", S);
	}
};
function Y(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new v(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function X(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function Z(e, t, n, r) {
	if (n !== void 0) return r(n);
	let i = e.transaction(t, "readonly");
	try {
		let e = await r(i);
		return await i.done, e;
	} catch (e) {
		try {
			await i.done;
		} catch {}
		throw e;
	}
}
async function Q(e, t, n, r) {
	if (n !== void 0) {
		if (n.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
		return r(n);
	}
	let i = e.transaction(t, "readwrite");
	try {
		let e = await r(i);
		return await i.done, e;
	} catch (e) {
		try {
			i.abort();
		} catch {}
		try {
			await i.done;
		} catch {}
		throw e;
	}
}
var $ = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = l.parse(e);
		return Z(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return Z(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw X(e) ? new ne("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new f("image_blobs", n.sha256);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").put(n);
		});
	}
	async delete(e, t) {
		let n = l.parse(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Y(e), n = x.safeParse(t);
		if (!n.success) throw new v("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new v("Image blob byte_length does not match blob data");
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e), n = x.safeParse(t);
		if (!n.success) throw new v("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new v("Stored image blob byte_length does not match blob data");
		return Y(n.data);
	}
};
function _e(e) {
	return {
		provider_profiles: new W(e),
		prompt_presets: new G(e),
		comfy_workflows: new K(e),
		novelai_vibes: new ce(e),
		character_profiles: new le(e),
		outfit_profiles: new ue(e),
		regex_rules: new de(e),
		lora_profiles: new pe(e),
		prompt_tag_presets: new fe(e),
		vocabulary_packages: new q(e),
		vocabulary_shards: new J(e),
		image_records: new me(e),
		image_blobs: new $(e),
		generation_jobs: new b(e),
		novelai_vibe_encodings: new he(e),
		provider_input_assets: new ge(e)
	};
}
//#endregion
export { F as a, U as c, A as d, _e as i, L as l, q as n, P as o, J as r, I as s, $ as t, j as u };
