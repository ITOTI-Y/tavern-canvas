import { $ as e, G as t, St as n, bt as r, gt as i, st as a, ut as o, wt as ee, xt as s } from "./src-B1pCVwkN.js";
import { A as c, D as l, E as u, O as d, S as f, T as te, _ as ne, a as p, c as re, d as m, f as h, h as g, i as _, k as v, l as ie, m as y, o as b, p as x, r as S, s as ae, t as oe, u as C, v as se, w, x as ce, y as T } from "./job_repository-Cci2nOvt.js";
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
	return D === null ? (O === null && (O = E(ie, 3, { upgrade: c }).then((e) => {
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
var M = a([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), N = r({
	chat_id: s().trim().min(1).max(512),
	message_id: s().trim().min(1).max(512),
	swipe_id: i().int().nonnegative()
}), P = r({
	provider_id: t,
	source_message: N,
	generation_parameters: e,
	media_type: M,
	width: i().int().positive().optional(),
	height: i().int().positive().optional(),
	persisted_url: ee().max(2048).optional(),
	quarantined: o().default(!1),
	duration_ms: i().int().positive().optional(),
	poster_image_id: w.optional(),
	source_job_id: w.optional()
}), F = m.extend(P.shape), I = n([m, F]);
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
], B = [
	82,
	73,
	70,
	70
], V = [
	87,
	69,
	66,
	80
], H = [
	102,
	116,
	121,
	112
];
function U(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function W(e) {
	if (U(e, R)) return "image/png";
	if (U(e, z)) return "image/jpeg";
	if (U(e, B) && U(e, V, 8)) return "image/webp";
	if (U(e, H, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var le = class extends S {
	constructor(e) {
		super(e, "provider_profiles", T, !0);
	}
}, ue = class extends S {
	constructor(e) {
		super(e, "prompt_presets", se);
	}
}, de = class extends S {
	constructor(e) {
		super(e, "comfy_workflows", re);
	}
}, fe = class extends S {
	constructor(e) {
		super(e, "novelai_vibes", ne);
	}
}, pe = class extends S {
	constructor(e) {
		super(e, "character_profiles", ae);
	}
}, me = class extends S {
	constructor(e) {
		super(e, "regex_rules", ce);
	}
}, he = class extends S {
	constructor(e) {
		super(e, "knowledge_entries", h);
	}
}, ge = class extends S {
	constructor(e) {
		super(e, "vocabularies", l);
	}
}, _e = class extends S {
	constructor(e) {
		super(e, "vocabulary_groups", te);
	}
}, G = class extends S {
	constructor(e) {
		super(e, "vocabulary_packages", u);
	}
}, K = class extends S {
	constructor(e) {
		super(e, "vocabulary_shards", d);
	}
}, ve = class extends S {
	constructor(e) {
		super(e, "image_records", I);
	}
}, q = class extends S {
	constructor(e) {
		super(e, "legacy_preferences", x);
	}
}, ye = class extends S {
	constructor(e) {
		super(e, "llm_connections", y, !0);
	}
};
function J(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new b(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Y(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function X(e, t, n, r) {
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
async function Z(e, t, n, r) {
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
var Q = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = f.parse(e);
		return X(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return X(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw Y(e) ? new _("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new p("image_blobs", n.sha256);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").put(n);
		});
	}
	async delete(e, t) {
		let n = f.parse(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = J(e), n = C.safeParse(t);
		if (!n.success) throw new b("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new b("Image blob byte_length does not match blob data");
		return J(n.data);
	}
	validate(e) {
		let t = J(e), n = C.safeParse(t);
		if (!n.success) throw new b("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new b("Stored image blob byte_length does not match blob data");
		return J(n.data);
	}
}, $ = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = this.key(e);
		return X(this.database, "migration_journal", t, async (e) => {
			let t = await e.objectStore("migration_journal").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return X(this.database, "migration_journal", e, async (e) => (await e.objectStore("migration_journal").getAll()).map((e) => this.validate(e)).sort((e, t) => e.migration_id < t.migration_id ? -1 : +(e.migration_id > t.migration_id)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "migration_journal", t, async (e) => {
			try {
				await e.objectStore("migration_journal").add(n);
			} catch (e) {
				throw Y(e) ? new _("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new p("migration_journal", n.migration_id);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").put(n);
		});
	}
	async delete(e, t) {
		let n = this.key(e);
		await Z(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").delete(n);
		});
	}
	key(e) {
		let t = g.shape.migration_id.safeParse(e);
		if (!t.success) throw new b("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = J(e);
		if (t.payload !== void 0) try {
			t.payload = v(t.payload);
		} catch (e) {
			throw new b(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = g.safeParse(t);
		if (!n.success) throw new b("Migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
	validate(e) {
		let t = J(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			v(t.payload);
		} catch (e) {
			throw new b(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = g.safeParse(t);
		if (!n.success) throw new b("Stored migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
};
function be(e) {
	return {
		provider_profiles: new le(e),
		prompt_presets: new ue(e),
		comfy_workflows: new de(e),
		novelai_vibes: new fe(e),
		character_profiles: new pe(e),
		regex_rules: new me(e),
		knowledge_entries: new he(e),
		vocabularies: new ge(e),
		vocabulary_groups: new _e(e),
		vocabulary_packages: new G(e),
		vocabulary_shards: new K(e),
		image_records: new ve(e),
		image_blobs: new Q(e),
		migration_journal: new $(e),
		generation_jobs: new oe(e),
		legacy_preferences: new q(e),
		llm_connections: new ye(e)
	};
}
//#endregion
export { be as a, I as c, j as d, A as f, K as i, W as l, $ as n, F as o, G as r, P as s, Q as t, L as u };
