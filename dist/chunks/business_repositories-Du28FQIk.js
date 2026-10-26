import { S as e, b as t, g as n, s as r, u as i, w as a, y as o } from "./ids-DjWg1HG8.js";
import { n as ee } from "./generation-CPQjBKML.js";
import { o as s } from "./provider-Bp1QeoG9.js";
import { A as c, C as l, D as u, E as d, O as te, S as ne, T as f, _ as p, a as m, b as h, c as g, d as _, f as v, g as y, h as b, i as x, j as re, k as ie, l as ae, m as oe, o as S, p as se, r as C, s as w, t as T, u as E, v as D, y as O } from "./job_repository-Du1AatS8.js";
import { n as k } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/open_database.ts
var A = null, j = null;
function M(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), A === i && (A = null));
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
function N() {
	return A === null ? (j === null && (j = k(ae, 4, { upgrade: re }).then((e) => {
		let t = M(e);
		return A = t, t;
	}).finally(() => {
		j = null;
	})), j) : Promise.resolve(A);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function P(e, t, n) {
	let r = Array.isArray(e) ? await N() : e, i, a;
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
var F = r([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), I = o({
	chat_id: t().trim().min(1).max(512),
	message_id: t().trim().min(1).max(512),
	swipe_id: n().int().nonnegative()
}), L = o({
	provider_id: s,
	source_message: I.nullable(),
	generation_parameters: ee,
	media_type: F,
	width: n().int().positive().optional(),
	height: n().int().positive().optional(),
	persisted_url: a().max(2048).optional(),
	quarantined: i().default(!1),
	duration_ms: n().int().positive().optional(),
	poster_image_id: f.optional(),
	source_job_id: f.optional()
}), R = _.extend(L.shape), z = e([_, R]);
function B(e) {
	return "media_type" in e;
}
var V = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], H = [
	255,
	216,
	255
], U = [
	82,
	73,
	70,
	70
], ce = [
	87,
	69,
	66,
	80
], W = [
	102,
	116,
	121,
	112
];
function G(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function le(e) {
	if (G(e, V)) return "image/png";
	if (G(e, H)) return "image/jpeg";
	if (G(e, U) && G(e, ce, 8)) return "image/webp";
	if (G(e, W, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var ue = class extends C {
	constructor(e) {
		super(e, "provider_profiles", h, !0);
	}
}, de = class extends C {
	constructor(e) {
		super(e, "prompt_presets", D);
	}
}, fe = class extends C {
	constructor(e) {
		super(e, "comfy_workflows", g);
	}
}, pe = class extends C {
	constructor(e) {
		super(e, "novelai_vibes", p);
	}
}, me = class extends C {
	constructor(e) {
		super(e, "character_profiles", w);
	}
}, he = class extends C {
	constructor(e) {
		super(e, "regex_rules", ne);
	}
}, ge = class extends C {
	constructor(e) {
		super(e, "knowledge_entries", v);
	}
}, _e = class extends C {
	constructor(e) {
		super(e, "vocabularies", te);
	}
}, ve = class extends C {
	constructor(e) {
		super(e, "vocabulary_groups", d);
	}
}, K = class extends C {
	constructor(e) {
		super(e, "vocabulary_packages", u);
	}
}, q = class extends C {
	constructor(e) {
		super(e, "vocabulary_shards", ie);
	}
}, J = class extends C {
	constructor(e) {
		super(e, "image_records", z);
	}
}, ye = class extends C {
	constructor(e) {
		super(e, "legacy_preferences", se);
	}
}, be = class extends C {
	constructor(e) {
		super(e, "llm_connections", oe, !0);
	}
}, xe = class extends C {
	constructor(e) {
		super(e, "novelai_vibe_encodings", y);
	}
}, Se = class extends C {
	constructor(e) {
		super(e, "provider_input_assets", O);
	}
};
function Y(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new S(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
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
				throw X(e) ? new x("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new m("image_blobs", n.sha256);
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
		let t = Y(e), n = E.safeParse(t);
		if (!n.success) throw new S("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new S("Image blob byte_length does not match blob data");
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e), n = E.safeParse(t);
		if (!n.success) throw new S("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new S("Stored image blob byte_length does not match blob data");
		return Y(n.data);
	}
}, Ce = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = this.key(e);
		return Z(this.database, "migration_journal", t, async (e) => {
			let t = await e.objectStore("migration_journal").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return Z(this.database, "migration_journal", e, async (e) => (await e.objectStore("migration_journal").getAll()).map((e) => this.validate(e)).sort((e, t) => e.migration_id < t.migration_id ? -1 : +(e.migration_id > t.migration_id)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			try {
				await e.objectStore("migration_journal").add(n);
			} catch (e) {
				throw X(e) ? new x("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new m("migration_journal", n.migration_id);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").put(n);
		});
	}
	async delete(e, t) {
		let n = this.key(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			await e.objectStore("migration_journal").delete(n);
		});
	}
	key(e) {
		let t = b.shape.migration_id.safeParse(e);
		if (!t.success) throw new S("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = Y(e);
		if (t.payload !== void 0) try {
			t.payload = c(t.payload);
		} catch (e) {
			throw new S(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = b.safeParse(t);
		if (!n.success) throw new S("Migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			c(t.payload);
		} catch (e) {
			throw new S(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = b.safeParse(t);
		if (!n.success) throw new S("Stored migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
};
function we(e) {
	return {
		provider_profiles: new ue(e),
		prompt_presets: new de(e),
		comfy_workflows: new fe(e),
		novelai_vibes: new pe(e),
		character_profiles: new me(e),
		regex_rules: new he(e),
		knowledge_entries: new ge(e),
		vocabularies: new _e(e),
		vocabulary_groups: new ve(e),
		vocabulary_packages: new K(e),
		vocabulary_shards: new q(e),
		image_records: new J(e),
		image_blobs: new $(e),
		migration_journal: new Ce(e),
		generation_jobs: new T(e),
		legacy_preferences: new ye(e),
		llm_connections: new be(e),
		novelai_vibe_encodings: new xe(e),
		provider_input_assets: new Se(e)
	};
}
//#endregion
export { R as a, le as c, N as d, we as i, B as l, K as n, L as o, q as r, z as s, $ as t, P as u };
