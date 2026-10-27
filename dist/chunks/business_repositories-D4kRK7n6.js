import { S as e, b as t, g as n, s as r, u as i, w as a, y as o } from "./ids-DjWg1HG8.js";
import { n as s } from "./generation-CPQjBKML.js";
import { o as ee } from "./provider-Bp1QeoG9.js";
import { A as c, C as te, D as l, E as u, M as d, O as f, _ as ne, a as p, b as m, c as h, d as g, f as _, g as v, h as y, i as b, j as x, k as re, l as ie, m as ae, o as S, p as oe, r as C, s as se, t as ce, u as w, v as T, w as E, x as D, y as O } from "./job_repository-BpPLSfp5.js";
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
	return A === null ? (j === null && (j = k(ie, 6, { upgrade: d }).then((e) => {
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
	provider_id: ee,
	source_message: I.nullable(),
	generation_parameters: s,
	media_type: F,
	width: n().int().positive().optional(),
	height: n().int().positive().optional(),
	persisted_url: a().max(2048).optional(),
	quarantined: i().default(!1),
	duration_ms: n().int().positive().optional(),
	poster_image_id: u.optional(),
	source_job_id: u.optional()
}), R = g.extend(L.shape), z = e([g, R]);
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
], W = [
	87,
	69,
	66,
	80
], G = [
	102,
	116,
	121,
	112
];
function K(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function le(e) {
	if (K(e, V)) return "image/png";
	if (K(e, H)) return "image/jpeg";
	if (K(e, U) && K(e, W, 8)) return "image/webp";
	if (K(e, G, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var ue = class extends C {
	constructor(e) {
		super(e, "provider_profiles", D, !0);
	}
}, de = class extends C {
	constructor(e) {
		super(e, "prompt_presets", O);
	}
}, fe = class extends C {
	constructor(e) {
		super(e, "comfy_workflows", h);
	}
}, pe = class extends C {
	constructor(e) {
		super(e, "novelai_vibes", ne);
	}
}, me = class extends C {
	constructor(e) {
		super(e, "character_profiles", se);
	}
}, he = class extends C {
	constructor(e) {
		super(e, "outfit_profiles", T);
	}
}, ge = class extends C {
	constructor(e) {
		super(e, "regex_rules", te);
	}
}, _e = class extends C {
	constructor(e) {
		super(e, "lora_profiles", ae);
	}
}, ve = class extends C {
	constructor(e) {
		super(e, "vocabularies", re);
	}
}, ye = class extends C {
	constructor(e) {
		super(e, "vocabulary_groups", l);
	}
}, q = class extends C {
	constructor(e) {
		super(e, "vocabulary_packages", f);
	}
}, J = class extends C {
	constructor(e) {
		super(e, "vocabulary_shards", c);
	}
}, be = class extends C {
	constructor(e) {
		super(e, "image_records", z);
	}
}, xe = class extends C {
	constructor(e) {
		super(e, "legacy_preferences", _);
	}
}, Se = class extends C {
	constructor(e) {
		super(e, "llm_connections", oe, !0);
	}
}, Ce = class extends C {
	constructor(e) {
		super(e, "novelai_vibe_encodings", v);
	}
}, we = class extends C {
	constructor(e) {
		super(e, "provider_input_assets", m);
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
		let n = E.parse(e);
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
				throw X(e) ? new b("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new p("image_blobs", n.sha256);
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
		let n = E.parse(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Y(e), n = w.safeParse(t);
		if (!n.success) throw new S("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new S("Image blob byte_length does not match blob data");
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e), n = w.safeParse(t);
		if (!n.success) throw new S("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new S("Stored image blob byte_length does not match blob data");
		return Y(n.data);
	}
}, Te = class {
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
				throw X(e) ? new b("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new p("migration_journal", n.migration_id);
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
		let t = y.shape.migration_id.safeParse(e);
		if (!t.success) throw new S("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = Y(e);
		if (t.payload !== void 0) try {
			t.payload = x(t.payload);
		} catch (e) {
			throw new S(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = y.safeParse(t);
		if (!n.success) throw new S("Migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			x(t.payload);
		} catch (e) {
			throw new S(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = y.safeParse(t);
		if (!n.success) throw new S("Stored migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
};
function Ee(e) {
	return {
		provider_profiles: new ue(e),
		prompt_presets: new de(e),
		comfy_workflows: new fe(e),
		novelai_vibes: new pe(e),
		character_profiles: new me(e),
		outfit_profiles: new he(e),
		regex_rules: new ge(e),
		lora_profiles: new _e(e),
		vocabularies: new ve(e),
		vocabulary_groups: new ye(e),
		vocabulary_packages: new q(e),
		vocabulary_shards: new J(e),
		image_records: new be(e),
		image_blobs: new $(e),
		migration_journal: new Te(e),
		generation_jobs: new ce(e),
		legacy_preferences: new xe(e),
		llm_connections: new Se(e),
		novelai_vibe_encodings: new Ce(e),
		provider_input_assets: new we(e)
	};
}
//#endregion
export { R as a, le as c, N as d, Ee as i, B as l, q as n, L as o, J as r, z as s, $ as t, P as u };
