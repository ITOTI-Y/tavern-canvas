import { S as e, b as t, g as n, s as r, u as i, w as a, y as o } from "./ids-DjWg1HG8.js";
import { n as s } from "./generation-CPQjBKML.js";
import { o as ee } from "./provider-WzlC6WOR.js";
import { A as te, D as c, M as l, N as ne, O as re, S as ie, T as u, _ as ae, a as d, b as oe, c as f, d as p, f as m, g as h, h as g, i as _, j as v, k as y, l as b, m as se, o as x, p as ce, r as S, s as le, t as C, u as w, v as T, w as E, x as D, y as O } from "./job_repository-DPx7Vzli.js";
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
	return A === null ? (j === null && (j = k(b, 7, { upgrade: ne }).then((e) => {
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
	poster_image_id: c.optional(),
	source_job_id: c.optional()
}), R = p.extend(L.shape), z = e([p, R]);
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
function ue(e) {
	if (K(e, V)) return "image/png";
	if (K(e, H)) return "image/jpeg";
	if (K(e, U) && K(e, W, 8)) return "image/webp";
	if (K(e, G, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var de = class extends S {
	constructor(e) {
		super(e, "provider_profiles", ie, !0);
	}
}, fe = class extends S {
	constructor(e) {
		super(e, "prompt_presets", O);
	}
}, pe = class extends S {
	constructor(e) {
		super(e, "comfy_workflows", f);
	}
}, me = class extends S {
	constructor(e) {
		super(e, "novelai_vibes", ae);
	}
}, he = class extends S {
	constructor(e) {
		super(e, "character_profiles", le);
	}
}, ge = class extends S {
	constructor(e) {
		super(e, "outfit_profiles", T);
	}
}, _e = class extends S {
	constructor(e) {
		super(e, "regex_rules", E);
	}
}, ve = class extends S {
	constructor(e) {
		super(e, "prompt_tag_presets", oe);
	}
}, ye = class extends S {
	constructor(e) {
		super(e, "lora_profiles", se);
	}
}, be = class extends S {
	constructor(e) {
		super(e, "vocabularies", te);
	}
}, xe = class extends S {
	constructor(e) {
		super(e, "vocabulary_groups", re);
	}
}, q = class extends S {
	constructor(e) {
		super(e, "vocabulary_packages", y);
	}
}, J = class extends S {
	constructor(e) {
		super(e, "vocabulary_shards", v);
	}
}, Se = class extends S {
	constructor(e) {
		super(e, "image_records", z);
	}
}, Ce = class extends S {
	constructor(e) {
		super(e, "legacy_preferences", m);
	}
}, we = class extends S {
	constructor(e) {
		super(e, "llm_connections", ce, !0);
	}
}, Te = class extends S {
	constructor(e) {
		super(e, "novelai_vibe_encodings", h);
	}
}, Ee = class extends S {
	constructor(e) {
		super(e, "provider_input_assets", D);
	}
};
function Y(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new x(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
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
		let n = u.parse(e);
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
				throw X(e) ? new _("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new d("image_blobs", n.sha256);
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
		let n = u.parse(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Y(e), n = w.safeParse(t);
		if (!n.success) throw new x("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new x("Image blob byte_length does not match blob data");
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e), n = w.safeParse(t);
		if (!n.success) throw new x("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new x("Stored image blob byte_length does not match blob data");
		return Y(n.data);
	}
}, De = class {
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
				throw X(e) ? new _("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new d("migration_journal", n.migration_id);
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
		let t = g.shape.migration_id.safeParse(e);
		if (!t.success) throw new x("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = Y(e);
		if (t.payload !== void 0) try {
			t.payload = l(t.payload);
		} catch (e) {
			throw new x(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = g.safeParse(t);
		if (!n.success) throw new x("Migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
	validate(e) {
		let t = Y(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			l(t.payload);
		} catch (e) {
			throw new x(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = g.safeParse(t);
		if (!n.success) throw new x("Stored migration journal failed schema validation", n.error.issues);
		return Y(n.data);
	}
};
function Oe(e) {
	return {
		provider_profiles: new de(e),
		prompt_presets: new fe(e),
		comfy_workflows: new pe(e),
		novelai_vibes: new me(e),
		character_profiles: new he(e),
		outfit_profiles: new ge(e),
		regex_rules: new _e(e),
		lora_profiles: new ye(e),
		prompt_tag_presets: new ve(e),
		vocabularies: new be(e),
		vocabulary_groups: new xe(e),
		vocabulary_packages: new q(e),
		vocabulary_shards: new J(e),
		image_records: new Se(e),
		image_blobs: new $(e),
		migration_journal: new De(e),
		generation_jobs: new C(e),
		legacy_preferences: new Ce(e),
		llm_connections: new we(e),
		novelai_vibe_encodings: new Te(e),
		provider_input_assets: new Ee(e)
	};
}
//#endregion
export { R as a, ue as c, N as d, Oe as i, B as l, q as n, L as o, J as r, z as s, $ as t, P as u };
