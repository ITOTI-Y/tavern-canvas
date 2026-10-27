import { _ as e, a as t, c as n, h as r, i, m as a, n as o, p as ee, r as s, s as te, t as c, u as l, x as u } from "./schemas-DMBLWk59.js";
//#region ../../packages/storage/src/database_schema.ts
var d = "tavern_canvas_v3", f = {
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
}, p = [
	"knowledge_entries",
	"vocabularies",
	"vocabulary_groups",
	"migration_journal",
	"legacy_preferences",
	"llm_connections"
], m = te(() => e([
	r(),
	l(),
	i(),
	o(),
	s(m),
	ee(r(), m)
])), h = r().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u), g = r().regex(/^[a-f0-9]{64}$/u), _ = u({ offset: !0 }), v = r().min(1).max(128).refine((e) => e === e.trim(), "namespace must not have surrounding whitespace").refine((e) => !e.includes("\0"), "namespace must not contain NUL"), y = {
	schema_version: n(1),
	id: h,
	namespace: v,
	record_key: r().min(1),
	created_at: _,
	updated_at: _,
	payload: m.optional()
};
function b(e) {
	return a({
		...y,
		...e
	});
}
var x = r().min(1).max(128), S = e([l().int().nonnegative(), r().min(1).max(128)]), ne = r().min(1).max(64), C = r().min(1).max(128), w = b({ provider_id: x }), T = b({}), E = b({}), D = b({}), O = b({}), k = b({}), A = b({}), j = b({}), M = b({}), N = b({
	data_version: S,
	state: ne
}), P = b({
	data_version: S,
	kind: C
}), F = b({
	image_sha256: g,
	model_id: r().min(1).max(128),
	information_extracted: l().min(0).max(1),
	encoding: r().min(1).max(4e7)
}), I = b({
	sha256: g,
	last_accessed_at: _,
	pinned: i()
}), L = t((e) => typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer, "expected a Blob or ArrayBuffer"), R = a({
	sha256: g,
	ref_count: l().int().nonnegative(),
	byte_length: l().int().nonnegative(),
	blob: L
}), z = b({
	media_type: c([
		"image/png",
		"image/jpeg",
		"image/webp"
	]),
	byte_length: l().int().positive(),
	blob: L
}), re = a({
	generation_anchor: g,
	scene_description: r().trim().min(1).max(12e3),
	negative_constraints: r().trim().max(4e3).optional(),
	context_turns: l().int().min(0).max(12).optional(),
	style_preset_id: h.optional(),
	image_count: l().int().min(1).max(4).optional()
}), ie = a({
	code: c([
		"auth_failed",
		"rate_limited",
		"content_blocked",
		"invalid_request",
		"provider_unavailable",
		"timed_out",
		"cancelled",
		"malformed_response"
	]),
	retryable: i(),
	retry_after_ms: l().int().nonnegative().optional(),
	status_code: l().int().min(100).max(599).optional()
}), B = b({
	request_id: h,
	request_digest: g,
	generation_anchor: g,
	source_anchor: g,
	chat_id: r().min(1).max(512),
	requested_swipe_id: l().int().nonnegative(),
	provider_id: x,
	arguments: re,
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
	error: ie.nullable(),
	image_ids: s(h),
	automatic: i().optional()
}), V = {
	provider_profiles: w,
	prompt_presets: T,
	comfy_workflows: E,
	novelai_vibes: D,
	character_profiles: O,
	regex_rules: M,
	vocabulary_packages: N,
	vocabulary_shards: P,
	image_records: I,
	generation_jobs: B,
	novelai_vibe_encodings: F,
	provider_input_assets: z,
	outfit_profiles: k,
	lora_profiles: A,
	prompt_tag_presets: j
}, H = /(credential|secret|token(?!s)|authorization|auth|header|apikey|password|passwd|privatekey|accesskey|refreshtoken)/u;
function U(e, t, n) {
	if (e !== null && typeof e != "string" && typeof e != "boolean") {
		if (typeof e == "number") {
			if (Number.isFinite(e)) return;
			throw TypeError(`${t} must contain finite JSON numbers`);
		}
		if (typeof e != "object") throw TypeError(`${t} must be JSON serializable`);
		if (typeof Blob < "u" && e instanceof Blob || e instanceof ArrayBuffer || e instanceof Date || e instanceof Map || e instanceof Set) throw TypeError(`${t} must not contain structured non-JSON values`);
		if (n.has(e)) throw TypeError(`${t} must not contain cycles`);
		if (n.add(e), Array.isArray(e)) for (let [r, i] of e.entries()) U(i, `${t}[${String(r)}]`, n);
		else {
			if (Object.getPrototypeOf(e) !== Object.prototype && Object.getPrototypeOf(e) !== null) throw TypeError(`${t} must contain plain objects`);
			for (let r of Reflect.ownKeys(e)) {
				if (typeof r != "string") throw TypeError(`${t} must not contain symbol keys`);
				U(e[r], `${t}.${r}`, n);
			}
		}
		n.delete(e);
	}
}
function W(e) {
	return U(e, "payload", /* @__PURE__ */ new WeakSet()), m.parse(e);
}
function G(e) {
	let t = W(e), n = (e, t) => {
		if (Array.isArray(e)) {
			e.forEach((e, r) => {
				n(e, `${t}[${String(r)}]`);
			});
			return;
		}
		if (typeof e == "object" && e) for (let [r, i] of Object.entries(e)) {
			let e = r.toLowerCase().replace(/[^a-z0-9]/gu, "");
			if (H.test(e)) throw TypeError(`${t}.${r} contains a credential-like field`);
			n(i, `${t}.${r}`);
		}
	};
	n(t, "payload");
}
function K(e, t, n) {
	if (v.parse(e), h.parse(t), n !== `${e}:${t}`) throw TypeError("record_key must equal namespace + ':' + id");
}
function q(e, t, n, r, i) {
	if (!(t >= 9)) {
		for (let t of p) e.objectStoreNames.contains(t) && e.deleteObjectStore(t);
		for (let [n, r] of Object.entries(f)) {
			if (r.since_version <= t) continue;
			e.objectStoreNames.contains(n) && e.deleteObjectStore(n);
			let i = e.createObjectStore(n, { keyPath: r.key_path });
			for (let e of r.indexes) i.createIndex(e, e);
		}
	}
}
//#endregion
//#region ../../packages/storage/src/repository.ts
var J = class extends Error {
	issues;
	constructor(e, t = []) {
		super(e), this.name = "RepositoryValidationError", this.issues = t;
	}
}, Y = class extends Error {
	constructor(e, t) {
		super(`A record already exists in ${e}: ${t}`), this.name = "RepositoryDuplicateError";
	}
}, X = class extends Error {
	constructor(e, t) {
		super(`No record exists in ${e}: ${t}`), this.name = "RepositoryNotFoundError";
	}
};
function Z(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new J(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
	}
}
function ae(e) {
	return e instanceof Error && e.name === "ConstraintError";
}
function oe(e) {
	if (e.mode === "readonly") throw TypeError("A readwrite transaction is required for this repository method");
}
var Q = class {
	database;
	store_name;
	schema;
	rejects_provider_secrets;
	constructor(e, t, n = V[t], r = !1) {
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
		let n = v.parse(e);
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
				throw ae(e) ? new Y(this.store_name, r.record_key) : e;
			}
		});
	}
	async update(e, t, n) {
		let r = this.prepare_record(e, t);
		await this.run_write(n, async (e) => {
			let t = this.store(e), n = await t.get(r.record_key);
			if (n === void 0) throw new X(this.store_name, r.record_key);
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
		return `${v.parse(e)}:${h.parse(t)}`;
	}
	prepare_record(e, t) {
		let n = v.parse(e), r = Z(t);
		if (r.namespace !== void 0 && r.namespace !== n) throw new J("Record namespace does not match the method namespace");
		if (typeof r.id != "string") throw new J("Record id must be a UUID");
		let i = h.safeParse(r.id);
		if (!i.success) throw new J("Record id must be a UUID", i.error.issues);
		let a = `${n}:${i.data}`;
		if (r.record_key !== void 0 && r.record_key !== a) throw new J("Record key does not match namespace and id");
		if (r.namespace = n, r.record_key = a, Object.hasOwn(r, "payload") && r.payload === void 0) throw new J("Payload must be serializable JSON");
		if (r.payload !== void 0) {
			try {
				r.payload = W(r.payload);
			} catch (e) {
				throw new J(e instanceof Error ? e.message : "Payload must be serializable JSON");
			}
			if (this.rejects_provider_secrets) try {
				G(r.payload);
			} catch (e) {
				throw new J(e instanceof Error ? e.message : "Provider payload contains a secret");
			}
		}
		let o = this.schema.safeParse(r);
		if (!o.success) throw new J("Record failed schema validation", o.error.issues);
		return K(o.data.namespace, o.data.id, o.data.record_key), Z(o.data);
	}
	validate_loaded(e) {
		let t = Z(e);
		if (typeof t == "object" && t && Object.hasOwn(t, "payload") && t.payload === void 0) throw new J("Stored payload must be serializable JSON");
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			W(t.payload);
		} catch (e) {
			throw new J(e instanceof Error ? e.message : "Stored payload must be serializable JSON");
		}
		let n = this.schema.safeParse(t);
		if (!n.success) throw new J("Stored record failed schema validation", n.error.issues);
		try {
			K(n.data.namespace, n.data.id, n.data.record_key), this.rejects_provider_secrets && n.data.payload !== void 0 && G(n.data.payload);
		} catch (e) {
			throw new J(e instanceof Error ? e.message : "Stored record failed derived-key validation");
		}
		return Z(n.data);
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
		if (e !== void 0) return oe(e), t(e);
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
}, $ = class extends Q {
	constructor(e) {
		super(e, "generation_jobs", B);
	}
};
function se(e) {
	return new $(e);
}
//#endregion
export { _ as C, W as D, P as E, q as O, g as S, N as T, j as _, X as a, V as b, E as c, I as d, A as f, T as g, k as h, Y as i, d as l, D as m, se as n, J as o, F as p, Q as r, O as s, $ as t, R as u, z as v, h as w, M as x, w as y };
