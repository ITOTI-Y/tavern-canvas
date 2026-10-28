import { _ as e, a as t, c as n, h as r, i, m as a, n as o, p as ee, r as s, s as te, t as c, u as l, x as ne, y as re } from "./schemas-DMBLWk59.js";
import { t as ie } from "./generation-C8k9E8Cm.js";
import { i as ae, r as oe } from "./provider-C7olz4RN.js";
import { n as se } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/database_schema.ts
var ce = "tavern_canvas_v3", le = {
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
		since_version: 9
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
		since_version: 9
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
}, ue = [
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"migration_journal",
	"legacy_preferences",
	"llm_connections"
], u = te(() => e([
	r(),
	l(),
	i(),
	o(),
	s(u),
	ee(r(), u)
])), d = r().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), f = r().regex(/^[a-f0-9]{64}$/u), p = ne({ offset: !0 }), m = r().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), de = {
	schema_version: n(1),
	id: d,
	namespace: m,
	record_key: r().min(1),
	created_at: p,
	updated_at: p,
	payload: u.optional()
};
function h(e) {
	return a({
		...de,
		...e
	});
}
var g = r().min(1).max(128), _ = e([l().int().nonnegative(), r().min(1).max(128)]), fe = r().min(1).max(64), pe = r().min(1).max(128), v = h({ provider_id: g }), y = h({}), b = h({}), x = h({}), S = h({}), C = h({}), w = h({}), T = h({}), me = h({}), he = h({
	data_version: _,
	state: fe
}), ge = h({
	data_version: _,
	kind: pe
}), E = h({
	image_sha256: f,
	model_id: r().min(1).max(128),
	information_extracted: l().min(0).max(1),
	encoding: r().min(1).max(4e7)
}), D = h({
	sha256: f,
	last_accessed_at: p,
	pinned: i()
}), O = t((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), k = a({
	sha256: f,
	ref_count: l().int().nonnegative(),
	byte_length: l().int().nonnegative(),
	blob: O
}), A = h({
	media_type: c([
		"image/png",
		"image/jpeg",
		"image/webp"
	]),
	byte_length: l().int().positive(),
	blob: O
}), _e = a({
	generation_anchor: f,
	scene_description: r().trim().min(1).max(12e3),
	negative_constraints: r().trim().max(4e3).optional(),
	context_turns: l().int().min(0).max(12).optional(),
	style_preset_id: d.optional(),
	image_count: l().int().min(1).max(4).optional()
}), j = h({
	request_id: d,
	request_digest: f,
	generation_anchor: f,
	source_anchor: f,
	chat_id: r().min(1).max(512),
	requested_swipe_id: l().int().nonnegative(),
	provider_id: g,
	arguments: _e,
	state: c([
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
	error: oe.nullable(),
	image_ids: s(d),
	automatic: i().optional()
}), M = {
	provider_profiles: v,
	prompt_presets: y,
	comfy_workflows: b,
	novelai_vibes: x,
	character_profiles: S,
	regex_rules: me,
	vocabulary_packages: he,
	vocabulary_shards: ge,
	image_records: D,
	generation_jobs: j,
	novelai_vibe_encodings: E,
	provider_input_assets: A,
	outfit_profiles: C,
	lora_profiles: w,
	prompt_tag_presets: T
}, ve = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function N(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) N(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				N(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function P(e) {
	return N(e, "payload", /* @__PURE__ */ new WeakSet()), u.parse(e);
}
function F(e) {
	let t = P(e), n = (e, t) => {
		if (Array.isArray(e)) {
			e.forEach((e, r) => {
				n(e, `${t}[${String(r)}]`);
			});
			return;
		}
		if (typeof e == "object" && e) for (let [r, i] of Object.entries(e)) {
			let e = r.toLowerCase().replace(/[^a-z0-9]/gu, "");
			if (ve.test(e)) throw TypeError(`${t}.${r} contains a credential-like field`);
			n(i, `${t}.${r}`);
		}
	};
	n(t, "payload");
}
function I(e, t, n) {
	if (m.parse(e), d.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function ye(e, t, n, r, i) {
	if (!(t >= 9)) {
		for (let t of ue) e.objectStoreNames.contains(t) && e.deleteObjectStore(t);
		for (let [n, r] of Object.entries(le)) {
			if (r.since_version <= t) continue;
			e.objectStoreNames.contains(n) && e.deleteObjectStore(n);
			let i = e.createObjectStore(n, { keyPath: r.key_path });
			for (let e of r.indexes) i.createIndex(e, e);
		}
	}
}
//#endregion
//#region ../../packages/storage/src/open_database.ts
var L = null, R = null;
function be(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), L === i && (L = null));
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
function z() {
	return L === null ? (R === null && (R = se(ce, 9, { upgrade: ye }).then((e) => {
		let t = be(e);
		return L = t, t;
	}).finally(() => {
		R = null;
	})), R) : Promise.resolve(L);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function xe(e, t, n) {
	let r = Array.isArray(e) ? await z() : e, i, a;
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
var B = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, V = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, H = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function U(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new B(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Se(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function Ce(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var W = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = M[t], r = !1) {
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
		let n = m.parse(e);
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
				throw Se(e) ? new V(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new H(this.store_name, r.record_key);
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
		return `${m.parse(e)}:${d.parse(t)}`;
	}
	prepare_record(e, t) {
		let n = m.parse(e), r = U(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new B("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new B("Record id must be a UUID");
		let i = d.safeParse(r.id);
		if (!i.success) throw new B("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new B("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new B("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = P(r.payload);
			} catch (e) {
				throw new B(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				F(r.payload);
			} catch (e) {
				throw new B(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new B("Record failed schema validation", o.error.issues);
		return I(o.data.namespace, o.data.id, o.data.record_key), U(o.data);
	}
	validate_loaded(e) {
		let t = U(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new B("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			P(t.payload);
		} catch (e) {
			throw new B(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new B("Stored record failed schema validation", n.error.issues);
		try {
			I(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && F(n.data.payload);
		} catch (e) {
			throw new B(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return U(n.data);
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
		if (e !== void 0) return Ce(e), t(e);
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
}, we = c([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), Te = a({
	chat_id: r().trim().min(1).max(512),
	message_id: r().trim().min(1).max(512),
	swipe_id: l().int().nonnegative()
}), G = a({
	provider_id: ae,
	source_message: Te.nullable(),
	generation_parameters: ie,
	media_type: we,
	width: l().int().positive().optional(),
	height: l().int().positive().optional(),
	persisted_url: re().max(2048).optional(),
	quarantined: i().default(!1),
	duration_ms: l().int().positive().optional(),
	poster_image_id: d.optional(),
	source_job_id: d.optional()
}), K = D.extend(G.shape), q = e([D, K]);
function Ee(e) {
	return "media_type" in e;
}
var De = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], Oe = [
	255,
	216,
	255
], ke = [
	82,
	73,
	70,
	70
], Ae = [
	87,
	69,
	66,
	80
], je = [
	102,
	116,
	121,
	112
];
function J(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function Me(e) {
	if (J(e, De)) return "image/png";
	if (J(e, Oe)) return "image/jpeg";
	if (J(e, ke) && J(e, Ae, 8)) return "image/webp";
	if (J(e, je, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/job_repository.ts
var Y = class extends W {
	constructor(e) {
		super(e, "generation_jobs", j);
	}
};
function Ne(e) {
	return new Y(e);
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var Pe = class extends W {
	constructor(e) {
		super(e, "provider_profiles", v, !0);
	}
}, Fe = class extends W {
	constructor(e) {
		super(e, "prompt_presets", y);
	}
}, Ie = class extends W {
	constructor(e) {
		super(e, "comfy_workflows", b);
	}
}, Le = class extends W {
	constructor(e) {
		super(e, "novelai_vibes", x);
	}
}, Re = class extends W {
	constructor(e) {
		super(e, "character_profiles", S);
	}
}, ze = class extends W {
	constructor(e) {
		super(e, "outfit_profiles", C);
	}
}, Be = class extends W {
	constructor(e) {
		super(e, "regex_rules", me);
	}
}, Ve = class extends W {
	constructor(e) {
		super(e, "prompt_tag_presets", T);
	}
}, He = class extends W {
	constructor(e) {
		super(e, "lora_profiles", w);
	}
}, X = class extends W {
	constructor(e) {
		super(e, "vocabulary_packages", he);
	}
}, Z = class extends W {
	constructor(e) {
		super(e, "vocabulary_shards", ge);
	}
}, Ue = class extends W {
	constructor(e) {
		super(e, "image_records", q);
	}
}, We = class extends W {
	constructor(e) {
		super(e, "novelai_vibe_encodings", E);
	}
}, Ge = class extends W {
	constructor(e) {
		super(e, "provider_input_assets", A);
	}
};
function Q(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new B(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Ke(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function qe(e, t, n, r) {
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
var Je = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = f.parse(e);
		return qe(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return qe(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw Ke(e) ? new V("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new H("image_blobs", n.sha256);
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
		let n = f.parse(e);
		await $(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Q(e), n = k.safeParse(t);
		if (!n.success) throw new B("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new B("Image blob byte_length does not match blob data");
		return Q(n.data);
	}
	validate(e) {
		let t = Q(e), n = k.safeParse(t);
		if (!n.success) throw new B("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new B("Stored image blob byte_length does not match blob data");
		return Q(n.data);
	}
};
function Ye(e) {
	return {
		provider_profiles: new Pe(e),
		prompt_presets: new Fe(e),
		comfy_workflows: new Ie(e),
		novelai_vibes: new Le(e),
		character_profiles: new Re(e),
		outfit_profiles: new ze(e),
		regex_rules: new Be(e),
		lora_profiles: new He(e),
		prompt_tag_presets: new Ve(e),
		vocabulary_packages: new X(e),
		vocabulary_shards: new Z(e),
		image_records: new Ue(e),
		image_blobs: new Je(e),
		generation_jobs: new Y(e),
		novelai_vibe_encodings: new We(e),
		provider_input_assets: new Ge(e)
	};
}
//#endregion
export { p as _, Ne as a, q as c, W as d, H as f, f as g, M as h, Ye as i, Me as l, z as m, X as n, K as o, xe as p, Z as r, G as s, Je as t, Ee as u, P as v };
