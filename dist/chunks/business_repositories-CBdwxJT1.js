import { F as e, H as t, J as n, Q as r, X as i, Y as a, Z as o, at as s, ct as c, dt as ee, et as te, ot as l, rt as u, st as d, tt as ne, ut as re } from "./src-BPUc1ma2.js";
//#region ../../packages/storage/src/database_schema.ts
var ie = "tavern_canvas_v3", ae = {
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
		since_version: 1
	},
	regex_rules: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	knowledge_entries: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"source_type",
			"updated_at"
		],
		since_version: 1
	},
	vocabularies: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 1
	},
	vocabulary_groups: {
		key_path: "record_key",
		indexes: ["namespace", "vocabulary_id"],
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
	migration_journal: {
		key_path: "migration_id",
		indexes: [
			"source_version",
			"state",
			"updated_at"
		],
		since_version: 1
	},
	legacy_preferences: {
		key_path: "record_key",
		indexes: ["namespace", "updated_at"],
		since_version: 2
	},
	llm_connections: {
		key_path: "record_key",
		indexes: [
			"namespace",
			"provider_kind",
			"updated_at"
		],
		since_version: 3
	}
}, f = te(() => c([
	d(),
	u(),
	o(),
	a(),
	i(f),
	s(d(), f)
])), p = d().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), m = d().regex(/^[a-f0-9]{64}$/u), h = ee({ offset: !0 }), g = d().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), oe = {
	schema_version: ne(1),
	id: p,
	namespace: g,
	record_key: d().min(1),
	created_at: h,
	updated_at: h,
	payload: f.optional()
};
function _(e) {
	return l({
		...oe,
		...e
	});
}
var v = d().min(1).max(128), y = c([u().int().nonnegative(), d().min(1).max(128)]), se = d().min(1).max(64), ce = d().min(1).max(128), b = _({ provider_id: v }), x = _({}), le = _({}), ue = _({}), de = _({}), fe = _({}), pe = _({ source_type: d().min(1).max(128) }), me = _({}), he = _({ vocabulary_id: p }), ge = _({
	data_version: y,
	state: se
}), _e = _({
	data_version: y,
	kind: ce
}), ve = _({}), ye = _({
	provider_kind: d().min(1).max(64),
	credential_reference: d().min(1).max(256).regex(/^tavern_canvas:[A-Za-z0-9_.:-]+$/u).nullable()
}), S = _({
	sha256: m,
	last_accessed_at: h,
	pinned: o()
}), be = r((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), xe = l({
	sha256: m,
	ref_count: u().int().nonnegative(),
	byte_length: u().int().nonnegative(),
	blob: be
}), Se = l({
	generation_anchor: m,
	scene_description: d().trim().min(1).max(12e3),
	negative_constraints: d().trim().max(4e3).optional(),
	context_turns: u().int().min(0).max(12).optional(),
	style_preset_id: p.optional(),
	image_count: u().int().min(1).max(4).optional()
}), Ce = l({
	code: n([
		"auth_failed",
		"rate_limited",
		"content_blocked",
		"invalid_request",
		"provider_unavailable",
		"timed_out",
		"cancelled",
		"malformed_response"
	]),
	retryable: o(),
	retry_after_ms: u().int().nonnegative().optional(),
	status_code: u().int().min(100).max(599).optional()
}), C = _({
	request_id: p,
	request_digest: m,
	generation_anchor: m,
	source_anchor: m,
	chat_id: d().min(1).max(512),
	requested_swipe_id: u().int().nonnegative(),
	provider_id: v,
	arguments: Se,
	state: n([
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
	error: Ce.nullable(),
	image_ids: i(p),
	automatic: o().optional()
}), w = l({
	migration_id: d().min(1).max(256),
	source_version: u().int().nonnegative(),
	state: d().min(1).max(64),
	updated_at: h,
	payload: f.optional()
}), T = {
	provider_profiles: b,
	prompt_presets: x,
	comfy_workflows: le,
	novelai_vibes: ue,
	character_profiles: de,
	regex_rules: fe,
	knowledge_entries: pe,
	vocabularies: me,
	vocabulary_groups: he,
	vocabulary_packages: ge,
	vocabulary_shards: _e,
	image_records: S,
	generation_jobs: C,
	legacy_preferences: ve,
	llm_connections: ye
}, we = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function E(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) E(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				E(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function D(e) {
	return E(e, "payload", /* @__PURE__ */ new WeakSet()), f.parse(e);
}
function O(e) {
	let t = D(e), n = (e, t) => {
		if (Array.isArray(e)) {
			e.forEach((e, r) => {
				n(e, `${t}[${String(r)}]`);
			});
			return;
		}
		if (typeof e == "object" && e) for (let [r, i] of Object.entries(e)) {
			let e = r.toLowerCase().replace(/[^a-z0-9]/gu, "");
			if (we.test(e)) throw TypeError(`${t}.${r} contains a credential-like field`);
			n(i, `${t}.${r}`);
		}
	};
	n(t, "payload");
}
function k(e, t, n) {
	if (g.parse(e), p.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function Te(e, t, n, r, i) {
	if (!(t >= 3)) for (let [n, r] of Object.entries(ae)) {
		if (r.since_version <= t) continue;
		let i = e.createObjectStore(n, { keyPath: r.key_path });
		for (let e of r.indexes) i.createIndex(e, e);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/idb@8.0.3/node_modules/idb/build/index.js
var A = (e, t) => t.some((t) => e instanceof t), Ee, De;
function Oe() {
	return Ee ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function ke() {
	return De ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var j = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap();
function Ae(e) {
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("success", i), e.removeEventListener("error", a);
		}, i = () => {
			t(I(e.result)), r();
		}, a = () => {
			n(e.error), r();
		};
		e.addEventListener("success", i), e.addEventListener("error", a);
	});
	return N.set(t, e), t;
}
function je(e) {
	if (j.has(e)) return;
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("complete", i), e.removeEventListener("error", a), e.removeEventListener("abort", a);
		}, i = () => {
			t(), r();
		}, a = () => {
			n(e.error || new DOMException("AbortError", "AbortError")), r();
		};
		e.addEventListener("complete", i), e.addEventListener("error", a), e.addEventListener("abort", a);
	});
	j.set(e, t);
}
var P = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return j.get(e);
			if (t === "store") return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return I(e[t]);
	},
	set(e, t, n) {
		return e[t] = n, !0;
	},
	has(e, t) {
		return e instanceof IDBTransaction && (t === "done" || t === "store") || t in e;
	}
};
function F(e) {
	P = e(P);
}
function Me(e) {
	return ke().includes(e) ? function(...t) {
		return e.apply(L(this), t), I(this.request);
	} : function(...t) {
		return I(e.apply(L(this), t));
	};
}
function Ne(e) {
	return typeof e == "function" ? Me(e) : (e instanceof IDBTransaction && je(e), A(e, Oe()) ? new Proxy(e, P) : e);
}
function I(e) {
	if (e instanceof IDBRequest) return Ae(e);
	if (M.has(e)) return M.get(e);
	let t = Ne(e);
	return t !== e && (M.set(e, t), N.set(t, e)), t;
}
var L = (e) => N.get(e);
function Pe(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = I(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(I(o.result), e.oldVersion, e.newVersion, I(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
var Fe = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], Ie = [
	"put",
	"add",
	"delete",
	"clear"
], R = /* @__PURE__ */ new Map();
function z(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (R.get(t)) return R.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = Ie.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || Fe.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return R.set(t, a), a;
}
F((e) => ({
	...e,
	get: (t, n, r) => z(t, n) || e.get(t, n, r),
	has: (t, n) => !!z(t, n) || e.has(t, n)
}));
var Le = [
	"continue",
	"continuePrimaryKey",
	"advance"
], Re = {}, B = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Be = { get(e, t) {
	if (!Le.includes(t)) return e[t];
	let n = Re[t];
	return n ||= Re[t] = function(...e) {
		B.set(this, ze.get(this)[t](...e));
	}, n;
} };
async function* Ve(...e) {
	let t = this;
	if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t) return;
	t = t;
	let n = new Proxy(t, Be);
	for (ze.set(n, t), N.set(n, L(t)); t;) yield n, t = await (B.get(n) || t.continue()), B.delete(n);
}
function He(e, t) {
	return t === Symbol.asyncIterator && A(e, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || t === "iterate" && A(e, [IDBIndex, IDBObjectStore]);
}
F((e) => ({
	...e,
	get(t, n, r) {
		return He(t, n) ? Ve : e.get(t, n, r);
	},
	has(t, n) {
		return He(t, n) || e.has(t, n);
	}
}));
//#endregion
//#region ../../packages/storage/src/open_database.ts
var V = null, H = null;
function Ue(e) {
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
function We() {
	return V === null ? (H === null && (H = Pe(ie, 3, { upgrade: Te }).then((e) => {
		let t = Ue(e);
		return V = t, t;
	}).finally(() => {
		H = null;
	})), H) : Promise.resolve(V);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function Ge(e, t, n) {
	let r = Array.isArray(e) ? await We() : e, i, a;
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
var U = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, W = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, G = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function K(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new U(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function Ke(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function qe(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var q = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = T[t], r = !1) {
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
				throw Ke(e) ? new W(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new G(this.store_name, r.record_key);
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
		let n = g.parse(e), r = K(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new U("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new U("Record id must be a UUID");
		let i = p.safeParse(r.id);
		if (!i.success) throw new U("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new U("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new U("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = D(r.payload);
			} catch (e) {
				throw new U(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				O(r.payload);
			} catch (e) {
				throw new U(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new U("Record failed schema validation", o.error.issues);
		return k(o.data.namespace, o.data.id, o.data.record_key), K(o.data);
	}
	validate_loaded(e) {
		let t = K(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new U("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			D(t.payload);
		} catch (e) {
			throw new U(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new U("Stored record failed schema validation", n.error.issues);
		try {
			k(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && O(n.data.payload);
		} catch (e) {
			throw new U(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return K(n.data);
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
		if (e !== void 0) return qe(e), t(e);
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
}, Je = n([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), Ye = l({
	chat_id: d().trim().min(1).max(512),
	message_id: d().trim().min(1).max(512),
	swipe_id: u().int().nonnegative()
}), Xe = l({
	provider_id: e,
	source_message: Ye,
	generation_parameters: t,
	media_type: Je,
	width: u().int().positive().optional(),
	height: u().int().positive().optional(),
	persisted_url: re().max(2048).optional(),
	quarantined: o().default(!1),
	duration_ms: u().int().positive().optional(),
	poster_image_id: p.optional(),
	source_job_id: p.optional()
}), Ze = S.extend(Xe.shape), Qe = c([S, Ze]);
function $e(e) {
	return "media_type" in e;
}
var et = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], tt = [
	255,
	216,
	255
], nt = [
	82,
	73,
	70,
	70
], rt = [
	87,
	69,
	66,
	80
], it = [
	102,
	116,
	121,
	112
];
function J(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function at(e) {
	if (J(e, et)) return "image/png";
	if (J(e, tt)) return "image/jpeg";
	if (J(e, nt) && J(e, rt, 8)) return "image/webp";
	if (J(e, it, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/job_repository.ts
var ot = class extends q {
	constructor(e) {
		super(e, "generation_jobs", C);
	}
};
function st(e) {
	return new ot(e);
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var ct = class extends q {
	constructor(e) {
		super(e, "provider_profiles", b, !0);
	}
}, lt = class extends q {
	constructor(e) {
		super(e, "prompt_presets", x);
	}
}, ut = class extends q {
	constructor(e) {
		super(e, "comfy_workflows", le);
	}
}, dt = class extends q {
	constructor(e) {
		super(e, "novelai_vibes", ue);
	}
}, ft = class extends q {
	constructor(e) {
		super(e, "character_profiles", de);
	}
}, pt = class extends q {
	constructor(e) {
		super(e, "regex_rules", fe);
	}
}, mt = class extends q {
	constructor(e) {
		super(e, "knowledge_entries", pe);
	}
}, ht = class extends q {
	constructor(e) {
		super(e, "vocabularies", me);
	}
}, gt = class extends q {
	constructor(e) {
		super(e, "vocabulary_groups", he);
	}
}, Y = class extends q {
	constructor(e) {
		super(e, "vocabulary_packages", ge);
	}
}, _t = class extends q {
	constructor(e) {
		super(e, "vocabulary_shards", _e);
	}
}, vt = class extends q {
	constructor(e) {
		super(e, "image_records", Qe);
	}
}, yt = class extends q {
	constructor(e) {
		super(e, "legacy_preferences", ve);
	}
}, bt = class extends q {
	constructor(e) {
		super(e, "llm_connections", ye, !0);
	}
};
function X(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new U(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function xt(e) {
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
var St = class {
	database;
	constructor(e) {
		this.database = e;
	}
	async get(e, t) {
		let n = m.parse(e);
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
				throw xt(e) ? new W("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new G("image_blobs", n.sha256);
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
		let n = m.parse(e);
		await Q(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = X(e), n = xe.safeParse(t);
		if (!n.success) throw new U("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new U("Image blob byte_length does not match blob data");
		return X(n.data);
	}
	validate(e) {
		let t = X(e), n = xe.safeParse(t);
		if (!n.success) throw new U("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new U("Stored image blob byte_length does not match blob data");
		return X(n.data);
	}
}, $ = class {
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
				throw xt(e) ? new W("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Q(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new G("migration_journal", n.migration_id);
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
		let t = w.shape.migration_id.safeParse(e);
		if (!t.success) throw new U("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = X(e);
		if (t.payload !== void 0) try {
			t.payload = D(t.payload);
		} catch (e) {
			throw new U(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = w.safeParse(t);
		if (!n.success) throw new U("Migration journal failed schema validation", n.error.issues);
		return X(n.data);
	}
	validate(e) {
		let t = X(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			D(t.payload);
		} catch (e) {
			throw new U(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = w.safeParse(t);
		if (!n.success) throw new U("Stored migration journal failed schema validation", n.error.issues);
		return X(n.data);
	}
};
function Ct(e) {
	return {
		provider_profiles: new ct(e),
		prompt_presets: new lt(e),
		comfy_workflows: new ut(e),
		novelai_vibes: new dt(e),
		character_profiles: new ft(e),
		regex_rules: new pt(e),
		knowledge_entries: new mt(e),
		vocabularies: new ht(e),
		vocabulary_groups: new gt(e),
		vocabulary_packages: new Y(e),
		vocabulary_shards: new _t(e),
		image_records: new vt(e),
		image_blobs: new St(e),
		migration_journal: new $(e),
		generation_jobs: new ot(e),
		legacy_preferences: new yt(e),
		llm_connections: new bt(e)
	};
}
//#endregion
export { D as C, p as S, g as _, Ct as a, m as b, Xe as c, $e as d, q as f, S as g, We as h, _t as i, Qe as l, Ge as m, $ as n, st as o, G as p, Y as r, Ze as s, St as t, at as u, b as v, h as x, T as y };
