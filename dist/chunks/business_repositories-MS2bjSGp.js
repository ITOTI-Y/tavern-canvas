import { S as e, a as t, b as n, c as r, g as i, h as a, i as o, m as s, n as ee, r as c, s as te, t as l, u, v as d } from "./schemas-BjkyCQYG.js";
import { t as ne } from "./generation-CxBPzqgd.js";
import { i as re, r as ie } from "./provider-BmQsAS1d.js";
import { n as ae } from "./build-BtJLSgAU.js";
//#region ../../packages/storage/src/database_schema.ts
var oe = "tavern_canvas_v3", se = {
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
	},
	creation_records: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 11
	},
	opening_records: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 12
	}
}, ce = [
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"migration_journal",
	"legacy_preferences",
	"llm_connections"
], f = te(() => d([
	i(),
	u(),
	o(),
	ee(),
	c(f),
	s(i(), f)
])), p = i().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), m = i().regex(/^[a-f0-9]{64}$/u), h = e({ offset: !0 }), g = i().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), le = {
	schema_version: r(1),
	id: p,
	namespace: g,
	record_key: i().min(1),
	created_at: h,
	updated_at: h,
	payload: f.optional()
};
function _(e) {
	return a({
		...le,
		...e
	});
}
var ue = i().min(1).max(128), de = d([u().int().nonnegative(), i().min(1).max(128)]), fe = i().min(1).max(64), pe = i().min(1).max(128), me = _({ provider_id: ue }), v = _({}), y = _({}), b = _({}), x = _({}), S = _({}), C = _({}), w = _({}), T = _({}), E = _({}), D = _({}), O = _({
	data_version: de,
	state: fe
}), k = _({
	data_version: de,
	kind: pe
}), A = _({
	image_sha256: m,
	model_id: i().min(1).max(128),
	information_extracted: u().min(0).max(1),
	encoding: i().min(1).max(4e7)
}), j = _({
	sha256: m,
	last_accessed_at: h,
	pinned: o()
}), M = t((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), N = a({
	sha256: m,
	ref_count: u().int().nonnegative(),
	byte_length: u().int().nonnegative(),
	blob: M
}), he = a({
	sha256: m,
	media_type: l([
		"image/webp",
		"image/jpeg",
		"image/png"
	]),
	blob: M
}), P = _({
	media_type: l([
		"image/png",
		"image/jpeg",
		"image/webp"
	]),
	byte_length: u().int().positive(),
	blob: M
}), ge = a({
	generation_anchor: m,
	scene_description: i().trim().min(1).max(12e3),
	negative_constraints: i().trim().max(4e3).optional(),
	context_turns: u().int().min(0).max(12).optional(),
	style_preset_id: p.optional(),
	image_count: u().int().min(1).max(4).optional()
}), F = _({
	request_id: p,
	request_digest: m,
	generation_anchor: m,
	source_anchor: m,
	chat_id: i().min(1).max(512),
	requested_swipe_id: u().int().nonnegative(),
	provider_id: ue,
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
	error: ie.nullable(),
	image_ids: c(p),
	automatic: o().optional()
}), I = {
	provider_profiles: me,
	prompt_presets: v,
	comfy_workflows: y,
	novelai_vibes: b,
	character_profiles: x,
	regex_rules: D,
	vocabulary_packages: O,
	vocabulary_shards: k,
	image_records: j,
	generation_jobs: F,
	novelai_vibe_encodings: A,
	provider_input_assets: P,
	outfit_profiles: S,
	lora_profiles: C,
	prompt_tag_presets: w,
	creation_records: T,
	opening_records: E
}, _e = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function L(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) L(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				L(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function R(e) {
	return L(e, "payload", /* @__PURE__ */ new WeakSet()), f.parse(e);
}
function z(e) {
	let t = R(e), n = (e, t) => {
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
function B(e, t, n) {
	if (g.parse(e), p.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function ve(e, t, n, r, i) {
	if (!(t >= 12)) {
		for (let t of ce) e.objectStoreNames.contains(t) && e.deleteObjectStore(t);
		for (let [n, i] of Object.entries(se)) {
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
var V = null, H = null;
function ye(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), V === i && (V = null));
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
function U() {
	return V === null ? (H === null && (H = ae(oe, 12, { upgrade: ve }).then((e) => {
		let t = ye(e);
		return V = t, t;
	}).finally(() => {
		H = null;
	})), H) : Promise.resolve(V);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function be(e, t, n) {
	let r = Array.isArray(e) ? await U() : e, i, a;
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
var W = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, G = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, K = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function q(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new W(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function xe(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function Se(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var J = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = I[t], r = !1) {
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
		let n = g.parse(e);
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
				throw xe(e) ? new G(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new K(this.store_name, r.record_key);
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
		return `${g.parse(e)}:${p.parse(t)}`;
	}
	prepare_record(e, t) {
		let n = g.parse(e), r = q(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new W("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new W("Record id must be a UUID");
		let i = p.safeParse(r.id);
		if (!i.success) throw new W("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new W("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new W("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = R(r.payload);
			} catch (e) {
				throw new W(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				z(r.payload);
			} catch (e) {
				throw new W(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new W("Record failed schema validation", o.error.issues);
		return B(o.data.namespace, o.data.id, o.data.record_key), q(o.data);
	}
	validate_loaded(e) {
		let t = q(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new W("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			R(t.payload);
		} catch (e) {
			throw new W(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new W("Stored record failed schema validation", n.error.issues);
		try {
			B(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && z(n.data.payload);
		} catch (e) {
			throw new W(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return q(n.data);
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
	chat_id: i().trim().min(1).max(512),
	message_id: i().trim().min(1).max(512),
	swipe_id: u().int().nonnegative()
}), Y = a({
	provider_id: re,
	source_message: we.nullable(),
	generation_parameters: ne,
	media_type: Ce,
	width: u().int().positive().optional(),
	height: u().int().positive().optional(),
	persisted_url: n().max(2048).optional(),
	quarantined: o().default(!1),
	duration_ms: u().int().positive().optional(),
	poster_image_id: p.optional(),
	source_job_id: p.optional()
}), Te = j.extend(Y.shape), Ee = d([j, Te]);
function De(e) {
	return "media_type" in e;
}
var Oe = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], ke = [
	255,
	216,
	255
], Ae = [
	82,
	73,
	70,
	70
], je = [
	87,
	69,
	66,
	80
], Me = [
	102,
	116,
	121,
	112
];
function X(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function Ne(e) {
	if (X(e, Oe)) return "image/png";
	if (X(e, ke)) return "image/jpeg";
	if (X(e, Ae) && X(e, je, 8)) return "image/webp";
	if (X(e, Me, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/job_repository.ts
var Z = class extends J {
	constructor(e) {
		super(e, "generation_jobs", F);
	}
};
function Pe(e) {
	return new Z(e);
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var Fe = class extends J {
	constructor(e) {
		super(e, "provider_profiles", me, !0);
	}
}, Ie = class extends J {
	constructor(e) {
		super(e, "prompt_presets", v);
	}
}, Le = class extends J {
	constructor(e) {
		super(e, "comfy_workflows", y);
	}
}, Re = class extends J {
	constructor(e) {
		super(e, "novelai_vibes", b);
	}
}, ze = class extends J {
	constructor(e) {
		super(e, "character_profiles", x);
	}
}, Be = class extends J {
	constructor(e) {
		super(e, "outfit_profiles", S);
	}
}, Ve = class extends J {
	constructor(e) {
		super(e, "regex_rules", D);
	}
}, He = class extends J {
	constructor(e) {
		super(e, "prompt_tag_presets", w);
	}
}, Ue = class extends J {
	constructor(e) {
		super(e, "creation_records", T);
	}
}, We = class extends J {
	constructor(e) {
		super(e, "opening_records", E);
	}
}, Ge = class extends J {
	constructor(e) {
		super(e, "lora_profiles", C);
	}
}, Ke = class extends J {
	constructor(e) {
		super(e, "vocabulary_packages", O);
	}
}, qe = class extends J {
	constructor(e) {
		super(e, "vocabulary_shards", k);
	}
}, Je = class extends J {
	constructor(e) {
		super(e, "image_records", Ee);
	}
}, Ye = class extends J {
	constructor(e) {
		super(e, "novelai_vibe_encodings", A);
	}
}, Xe = class extends J {
	constructor(e) {
		super(e, "provider_input_assets", P);
	}
};
function Q(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new W(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Ze(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
async function Qe(e, t, n, r) {
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
var $e = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = m.parse(e);
		return Qe(this.database, "image_blobs", t, async (e) => {
			let t = await e.objectStore("image_blobs").get(n);
			return t === void 0 ? null : this.validate(t);
		});
	}
	async list(e) {
		return Qe(this.database, "image_blobs", e, async (e) => (await e.objectStore("image_blobs").getAll()).map((e) => this.validate(e)).sort((e, t) => e.sha256 < t.sha256 ? -1 : +(e.sha256 > t.sha256)));
	}
	async create(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			try {
				await e.objectStore("image_blobs").add(n);
			} catch (e) {
				throw Ze(e) ? new G("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await $(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new K("image_blobs", n.sha256);
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
		let n = m.parse(e);
		await $(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = Q(e), n = N.safeParse(t);
		if (!n.success) throw new W("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new W("Image blob byte_length does not match blob data");
		return Q(n.data);
	}
	validate(e) {
		let t = Q(e), n = N.safeParse(t);
		if (!n.success) throw new W("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new W("Stored image blob byte_length does not match blob data");
		return Q(n.data);
	}
};
function et(e) {
	return {
		provider_profiles: new Fe(e),
		prompt_presets: new Ie(e),
		comfy_workflows: new Le(e),
		novelai_vibes: new Re(e),
		character_profiles: new ze(e),
		outfit_profiles: new Be(e),
		regex_rules: new Ve(e),
		lora_profiles: new Ge(e),
		prompt_tag_presets: new He(e),
		creation_records: new Ue(e),
		opening_records: new We(e),
		vocabulary_packages: new Ke(e),
		vocabulary_shards: new qe(e),
		image_records: new Je(e),
		image_blobs: new $e(e),
		generation_jobs: new Z(e),
		novelai_vibe_encodings: new Ye(e),
		provider_input_assets: new Xe(e)
	};
}
//#endregion
export { I as _, Z as a, R as b, Y as c, De as d, J as f, he as g, U as h, et as i, Ee as l, be as m, Ke as n, Pe as o, K as p, qe as r, Te as s, $e as t, Ne as u, m as v, h as y };
