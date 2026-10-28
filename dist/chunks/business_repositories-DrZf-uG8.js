import { _ as e, a as t, c as n, h as r, i, m as a, n as o, p as s, r as c, s as ee, t as l, u, x as te, y as ne } from "./schemas-DMBLWk59.js";
import { t as re } from "./generation-C8k9E8Cm.js";
import { i as ie, r as ae } from "./provider-B-m_0o6I.js";
import { n as oe } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/database_schema.ts
var se = "tavern_canvas_v3", ce = {
	provider_profiles: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"provider_id",
			"updated_at"
		],
		since_version: 1
	},
	prompt_presets: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	comfy_workflows: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	novelai_vibes: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	character_profiles: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1,
		reset_version: 9
	},
	regex_rules: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	vocabulary_packages: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"data_version",
			"state"
		],
		since_version: 1
	},
	vocabulary_shards: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"data_version",
			"kind"
		],
		since_version: 1
	},
	image_records: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"sha256",
			"created_at",
			"last_accessed_at",
			"pinned"
		],
		since_version: 1
	},
	image_blobs: {
		key_path: "sha256",
		indexes: ["ref_count", "byte_length"],
		since_version: 1
	},
	image_thumbnails: {
		key_path: "sha256",
		indexes: [],
		since_version: 10
	},
	generation_jobs: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"request_id",
			"request_digest",
			"state",
			"updated_at"
		],
		since_version: 1
	},
	novelai_vibe_encodings: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 4
	},
	provider_input_assets: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 4
	},
	outfit_profiles: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 5,
		reset_version: 9
	},
	lora_profiles: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 6
	},
	prompt_tag_presets: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 7
	}
}, le = [
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"migration_journal",
	"legacy_preferences",
	"llm_connections"
], d = ee(() => e([
	r(),
	u(),
	i(),
	o(),
	c(d),
	s(r(), d)
])), f = r().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), p = r().regex(/^[a-f0-9]{64}$/u), m = te({ offset: !0 }), h = r().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), ue = {
	schema_version: n(1),
	id: f,
	namespace: h,
	record_key: r().min(1),
	created_at: m,
	updated_at: m,
	payload: d.optional()
};
function g(e) {
	return a({
		...ue,
		...e
	});
}
var _ = r().min(1).max(128), de = e([u().int().nonnegative(), r().min(1).max(128)]), fe = r().min(1).max(64), pe = r().min(1).max(128), v = g({ provider_id: _ }), y = g({}), b = g({}), me = g({}), x = g({}), S = g({}), C = g({}), w = g({}), T = g({}), E = g({
	data_version: de,
	state: fe
}), D = g({
	data_version: de,
	kind: pe
}), O = g({
	image_sha256: p,
	model_id: r().min(1).max(128),
	information_extracted: u().min(0).max(1),
	encoding: r().min(1).max(4e7)
}), k = g({
	sha256: p,
	last_accessed_at: m,
	pinned: i()
}), A = t((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), j = a({
	sha256: p,
	ref_count: u().int().nonnegative(),
	byte_length: u().int().nonnegative(),
	blob: A
}), he = a({
	sha256: p,
	media_type: l([
		"image/webp",
		"image/jpeg",
		"image/png"
	]),
	blob: A
}), M = g({
	media_type: l([
		"image/png",
		"image/jpeg",
		"image/webp"
	]),
	byte_length: u().int().positive(),
	blob: A
}), ge = a({
	generation_anchor: p,
	scene_description: r().trim().min(1).max(12e3),
	negative_constraints: r().trim().max(4e3).optional(),
	context_turns: u().int().min(0).max(12).optional(),
	style_preset_id: f.optional(),
	image_count: u().int().min(1).max(4).optional()
}), N = g({
	request_id: f,
	request_digest: p,
	generation_anchor: p,
	source_anchor: p,
	chat_id: r().min(1).max(512),
	requested_swipe_id: u().int().nonnegative(),
	provider_id: _,
	arguments: ge,
	state: l([
		"queued",
		"preparing",
		"submitting",
		"running",
		"completed",
		"failed",
		"cancelled",
		"attached",
		"orphaned"
	]),
	error: ae.nullable(),
	image_ids: c(f),
	automatic: i().optional()
}), P = {
	provider_profiles: v,
	prompt_presets: y,
	comfy_workflows: b,
	novelai_vibes: me,
	character_profiles: x,
	regex_rules: T,
	vocabulary_packages: E,
	vocabulary_shards: D,
	image_records: k,
	generation_jobs: N,
	novelai_vibe_encodings: O,
	provider_input_assets: M,
	outfit_profiles: S,
	lora_profiles: C,
	prompt_tag_presets: w
}, _e = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function F(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) F(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				F(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function I(e) {
	return F(e, "payload", /* @__PURE__ */ new WeakSet()), d.parse(e);
}
function L(e) {
	let t = I(e), n = (e, t) => {
		if (Array.isArray(e)) {
			e.forEach((e, r) => {
				n(e, `${t}[${String(r)}]`);
			});
			return;
		}
		if (typeof e == "object" && e) for (let [r, i] of Object.entries(e)) {
			let e = r.toLowerCase().replace(/[^a-z0-9]/gu, "");
			if (_e.test(e)) throw TypeError(`${t}.${r} contains a credential-like field`);
			n(i, `${t}.${r}`);
		}
	};
	n(t, "payload");
}
function R(e, t, n) {
	if (h.parse(e), f.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function ve(e, t, n, r, i) {
	if (!(t >= 10)) {
		for (let t of le) e.objectStoreNames.contains(t) && e.deleteObjectStore(t);
		for (let [n, i] of Object.entries(ce)) {
			let a = e.objectStoreNames.contains(n), o = a && (i.reset_version ?? 0) > t;
			if (o && e.deleteObjectStore(n), !a || o) {
				let t = e.createObjectStore(n, { keyPath: i.key_path });
				for (let e of i.indexes) t.createIndex(e, e);
				continue;
			}
			let s = r.objectStore(n);
			for (let e of i.indexes) s.indexNames.contains(e) || s.createIndex(e, e);
		}
	}
}
//#endregion
//#region ../../packages/storage/src/open_database.ts
var z = null, B = null;
function ye(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), z === i && (z = null));
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
function V() {
	return z === null ? (B === null && (B = oe(se, 10, { upgrade: ve }).then((e) => {
		let t = ye(e);
		return z = t, t;
	}).finally(() => {
		B = null;
	})), B) : Promise.resolve(z);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function be(e, t, n) {
	let r = Array.isArray(e) ? await V() : e, i, a;
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
//#endregion
//#region ../../packages/storage/src/repository.ts
var H = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, U = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, W = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function G(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new H(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function xe(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function Se(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var K = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = P[t], r = !1) {
		this.database = e, this.store_name = t, this.schema = n, this.rejects_provider_secrets = r;
	}
	async get(e, t, n) {
		let r = this.record_key(e, t);
		return this.run_read(n, async (e) => {
			let t = await this.store(e).get(r);
			return t === void 0 ? null : this.validate_loaded(t);
		});
	}
	async list(e, t) {
		let n = h.parse(e);
		return this.run_read(t, async (e) => {
			let t = (await this.store(e).index("namespace").getAll(n)).map((e) => this.validate_loaded(e));
			return t.sort((e, t) => e.id < t.id ? -1 : +(e.id > t.id)), t;
		});
	}
	async create(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			try {
				await this.store(e).add(r);
			} catch (e) {
				throw xe(e) ? new U(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new W(this.store_name, r.record_key);
			this.validate_loaded(n), await t.put(r);
		});
	}
	async put(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			await this.store(e).put(r);
		});
	}
	async delete(e, t, n) {
		let r = this.record_key(e, t);
		await this.run_write(n, async (e) => {
			await this.store(e).delete(r);
		});
	}
	store(e) {
		return e.objectStore(this.store_name);
	}
	record_key(e, t) {
		return `${h.parse(e)}:${f.parse(t)}`;
	}
	prepare_record(e, t) {
		let n = h.parse(e), r = G(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new H("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new H("Record id must be a UUID");
		let i = f.safeParse(r.id);
		if (!i.success) throw new H("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new H("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new H("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = I(r.payload);
			} catch (e) {
				throw new H(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				L(r.payload);
			} catch (e) {
				throw new H(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new H("Record failed schema validation", o.error.issues);
		return R(o.data.namespace, o.data.id, o.data.record_key), G(o.data);
	}
	validate_loaded(e) {
		let t = G(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new H("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			I(t.payload);
		} catch (e) {
			throw new H(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new H("Stored record failed schema validation", n.error.issues);
		try {
			R(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && L(n.data.payload);
		} catch (e) {
			throw new H(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return G(n.data);
	}
	async run_read(e, t) {
		if (e !== void 0) return t(e);
		let n = this.database.transaction(this.store_name, "readonly");
		try {
			let e = await t(n);
			return await n.done, e;
		} catch (e) {
			try {
				await n.done;
			} catch {}
			throw e;
		}
	}
	async run_write(e, t) {
		if (e !== void 0) return Se(e), t(e);
		let n = this.database.transaction(this.store_name, "readwrite");
		try {
			let e = await t(n);
			return await n.done, e;
		} catch (e) {
			try {
				n.abort();
			} catch {}
			try {
				await n.done;
			} catch {}
			throw e;
		}
	}
}, Ce = l([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), we = a({
	chat_id: r().trim().min(1).max(512),
	message_id: r().trim().min(1).max(512),
	swipe_id: u().int().nonnegative()
}), q = a({
	provider_id: ie,
	source_message: we.nullable(),
	generation_parameters: re,
	media_type: Ce,
	width: u().int().positive().optional(),
	height: u().int().positive().optional(),
	persisted_url: ne().max(2048).optional(),
	quarantined: i().default(!1),
	duration_ms: u().int().positive().optional(),
	poster_image_id: f.optional(),
	source_job_id: f.optional()
}), J = k.extend(q.shape), Y = e([k, J]);
function Te(e) {
	return "media_type" in e;
}
var Ee = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], De = [
	255,
	216,
	255
], Oe = [
	82,
	73,
	70,
	70
], ke = [
	87,
	69,
	66,
	80
], Ae = [
	102,
	116,
	121,
	112
];
function X(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function je(e) {
	if (X(e, Ee)) return "image/png";
	if (X(e, De)) return "image/jpeg";
	if (X(e, Oe) && X(e, ke, 8)) return "image/webp";
	if (X(e, Ae, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/job_repository.ts
var Z = class extends K {
	constructor(e) {
		super(e, "generation_jobs", N);
	}
};
function Me(e) {
	return new Z(e);
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var Ne = class extends K {
	constructor(e) {
		super(e, "provider_profiles", v, !0);
	}
}, Pe = class extends K {
	constructor(e) {
		super(e, "prompt_presets", y);
	}
}, Fe = class extends K {
	constructor(e) {
		super(e, "comfy_workflows", b);
	}
}, Ie = class extends K {
	constructor(e) {
		super(e, "novelai_vibes", me);
	}
}, Le = class extends K {
	constructor(e) {
		super(e, "character_profiles", x);
	}
}, Re = class extends K {
	constructor(e) {
		super(e, "outfit_profiles", S);
	}
}, ze = class extends K {
	constructor(e) {
		super(e, "regex_rules", T);
	}
}, Be = class extends K {
	constructor(e) {
		super(e, "prompt_tag_presets", w);
	}
}, Ve = class extends K {
	constructor(e) {
		super(e, "lora_profiles", C);
	}
}, He = class extends K {
	constructor(e) {
		super(e, "vocabulary_packages", E);
	}
}, Ue = class extends K {
	constructor(e) {
		super(e, "vocabulary_shards", D);
	}
}, We = class extends K {
	constructor(e) {
		super(e, "image_records", Y);
	}
}, Ge = class extends K {
	constructor(e) {
		super(e, "novelai_vibe_encodings", O);
	}
}, Ke = class extends K {
	constructor(e) {
		super(e, "provider_input_assets", M);
	}
};
function Q(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new H(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function qe(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function Je(e, t, n, r) {
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
async function $(e, t, n, r) {
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
var Ye = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = p.parse(e);
		return Je(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return Je(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw qe(e) ? new U("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new W("image_blobs", n.sha256);
			await t.put(n);
		});
	}
	async put(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").put(n);
		});
	}
	async delete(e, t) {
		let n = p.parse(e);
		await $(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Q(e), n = j.safeParse(t);
		if (!n.success) throw new H("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new H("Image blob byte_length does not match blob data");
		return Q(n.data);
	}
	validate(e) {
		let t = Q(e), n = j.safeParse(t);
		if (!n.success) throw new H("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new H("Stored image blob byte_length does not match blob data");
		return Q(n.data);
	}
};
function Xe(e) {
	return {
		provider_profiles: new Ne(e),
		prompt_presets: new Pe(e),
		comfy_workflows: new Fe(e),
		novelai_vibes: new Ie(e),
		character_profiles: new Le(e),
		outfit_profiles: new Re(e),
		regex_rules: new ze(e),
		lora_profiles: new Ve(e),
		prompt_tag_presets: new Be(e),
		vocabulary_packages: new He(e),
		vocabulary_shards: new Ue(e),
		image_records: new We(e),
		image_blobs: new Ye(e),
		generation_jobs: new Z(e),
		novelai_vibe_encodings: new Ge(e),
		provider_input_assets: new Ke(e)
	};
}
//#endregion
export { P as _, Z as a, I as b, q as c, Te as d, K as f, he as g, V as h, Xe as i, Y as l, be as m, He as n, Me as o, W as p, Ue as r, J as s, Ye as t, je as u, p as v, m as y };
