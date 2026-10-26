import { a as e } from "./provider-ChWi4KfU.js";
import { C as t, T as n, b as r, g as i, s as a, u as o, x as s } from "./ids-CQF5rr2J.js";
import { r as c } from "./generation-Ck4v0g3Y.js";
import { A as ee, C as l, D as u, E as d, M as f, O as te, _ as ne, a as p, b as m, c as h, d as g, f as _, h as v, i as y, j as b, k as re, l as ie, m as ae, o as x, p as oe, r as S, s as se, t as ce, u as C, v as le, w, x as T, y as E } from "./job_repository-BCVJs26r.js";
import { n as D } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/open_database.ts
var O = null, k = null;
function A(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), O === i && (O = null));
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
function j() {
	return O === null ? (k === null && (k = D(ie, 4, { upgrade: f }).then((e) => {
		let t = A(e);
		return O = t, t;
	}).finally(() => {
		k = null;
	})), k) : Promise.resolve(O);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function M(e, t, n) {
	let r = Array.isArray(e) ? await j() : e, i, a;
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
var N = a([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), P = r({
	chat_id: s().trim().min(1).max(512),
	message_id: s().trim().min(1).max(512),
	swipe_id: i().int().nonnegative()
}), F = r({
	provider_id: e,
	source_message: P,
	generation_parameters: c,
	media_type: N,
	width: i().int().positive().optional(),
	height: i().int().positive().optional(),
	persisted_url: n().max(2048).optional(),
	quarantined: o().default(!1),
	duration_ms: i().int().positive().optional(),
	poster_image_id: d.optional(),
	source_job_id: d.optional()
}), I = g.extend(F.shape), L = t([g, I]);
function R(e) {
	return "media_type" in e;
}
var z = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], B = [
	255,
	216,
	255
], V = [
	82,
	73,
	70,
	70
], H = [
	87,
	69,
	66,
	80
], U = [
	102,
	116,
	121,
	112
];
function W(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function ue(e) {
	if (W(e, z)) return "image/png";
	if (W(e, B)) return "image/jpeg";
	if (W(e, V) && W(e, H, 8)) return "image/webp";
	if (W(e, U, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var de = class extends S {
	constructor(e) {
		super(e, "provider_profiles", T, !0);
	}
}, fe = class extends S {
	constructor(e) {
		super(e, "prompt_presets", E);
	}
}, pe = class extends S {
	constructor(e) {
		super(e, "comfy_workflows", h);
	}
}, me = class extends S {
	constructor(e) {
		super(e, "novelai_vibes", le);
	}
}, he = class extends S {
	constructor(e) {
		super(e, "character_profiles", se);
	}
}, ge = class extends S {
	constructor(e) {
		super(e, "regex_rules", l);
	}
}, _e = class extends S {
	constructor(e) {
		super(e, "knowledge_entries", _);
	}
}, ve = class extends S {
	constructor(e) {
		super(e, "vocabularies", re);
	}
}, ye = class extends S {
	constructor(e) {
		super(e, "vocabulary_groups", u);
	}
}, G = class extends S {
	constructor(e) {
		super(e, "vocabulary_packages", te);
	}
}, K = class extends S {
	constructor(e) {
		super(e, "vocabulary_shards", ee);
	}
}, q = class extends S {
	constructor(e) {
		super(e, "image_records", L);
	}
}, be = class extends S {
	constructor(e) {
		super(e, "legacy_preferences", oe);
	}
}, xe = class extends S {
	constructor(e) {
		super(e, "llm_connections", ae, !0);
	}
}, Se = class extends S {
	constructor(e) {
		super(e, "novelai_vibe_encodings", ne);
	}
}, Ce = class extends S {
	constructor(e) {
		super(e, "provider_input_assets", m);
	}
};
function J(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new x(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
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
		let n = w.parse(e);
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
				throw Y(e) ? new y("image_blobs", n.sha256) : e;
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
		let n = w.parse(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = J(e), n = C.safeParse(t);
		if (!n.success) throw new x("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new x("Image blob byte_length does not match blob data");
		return J(n.data);
	}
	validate(e) {
		let t = J(e), n = C.safeParse(t);
		if (!n.success) throw new x("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new x("Stored image blob byte_length does not match blob data");
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
				throw Y(e) ? new y("migration_journal", n.migration_id) : e;
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
		let t = v.shape.migration_id.safeParse(e);
		if (!t.success) throw new x("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = J(e);
		if (t.payload !== void 0) try {
			t.payload = b(t.payload);
		} catch (e) {
			throw new x(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = v.safeParse(t);
		if (!n.success) throw new x("Migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
	validate(e) {
		let t = J(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			b(t.payload);
		} catch (e) {
			throw new x(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = v.safeParse(t);
		if (!n.success) throw new x("Stored migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
};
function we(e) {
	return {
		provider_profiles: new de(e),
		prompt_presets: new fe(e),
		comfy_workflows: new pe(e),
		novelai_vibes: new me(e),
		character_profiles: new he(e),
		regex_rules: new ge(e),
		knowledge_entries: new _e(e),
		vocabularies: new ve(e),
		vocabulary_groups: new ye(e),
		vocabulary_packages: new G(e),
		vocabulary_shards: new K(e),
		image_records: new q(e),
		image_blobs: new Q(e),
		migration_journal: new $(e),
		generation_jobs: new ce(e),
		legacy_preferences: new be(e),
		llm_connections: new xe(e),
		novelai_vibe_encodings: new Se(e),
		provider_input_assets: new Ce(e)
	};
}
//#endregion
export { we as a, L as c, M as d, j as f, K as i, ue as l, $ as n, I as o, G as r, F as s, Q as t, R as u };
