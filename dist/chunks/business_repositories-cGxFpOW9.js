import { St as e, W as t, Z as n, at as r, bt as i, ct as a, mt as o, vt as s, yt as c } from "./src-CLzfjths.js";
import { A as ee, D as l, E as te, O as ne, S as u, T as re, _ as ie, a as d, c as ae, d as f, f as oe, h as p, i as m, k as h, l as se, m as ce, o as g, p as _, r as v, s as le, t as ue, u as y, v as de, w as b, x as fe, y as pe } from "./job_repository-DB1y8cIh.js";
//#region ../../node_modules/.pnpm/idb@8.0.3/node_modules/idb/build/index.js
var x = (e, t) => t.some((t) => e instanceof t), me, he;
function ge() {
	return me ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function _e() {
	return he ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var S = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), w = /* @__PURE__ */ new WeakMap();
function ve(e) {
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("success", i), e.removeEventListener("error", a);
		}, i = () => {
			t(D(e.result)), r();
		}, a = () => {
			n(e.error), r();
		};
		e.addEventListener("success", i), e.addEventListener("error", a);
	});
	return w.set(t, e), t;
}
function ye(e) {
	if (S.has(e)) return;
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
	S.set(e, t);
}
var T = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return S.get(e);
			if (t === "store") return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return D(e[t]);
	},
	set(e, t, n) {
		return e[t] = n, !0;
	},
	has(e, t) {
		return e instanceof IDBTransaction && (t === "done" || t === "store") || t in e;
	}
};
function E(e) {
	T = e(T);
}
function be(e) {
	return _e().includes(e) ? function(...t) {
		return e.apply(O(this), t), D(this.request);
	} : function(...t) {
		return D(e.apply(O(this), t));
	};
}
function xe(e) {
	return typeof e == "function" ? be(e) : (e instanceof IDBTransaction && ye(e), x(e, ge()) ? new Proxy(e, T) : e);
}
function D(e) {
	if (e instanceof IDBRequest) return ve(e);
	if (C.has(e)) return C.get(e);
	let t = xe(e);
	return t !== e && (C.set(e, t), w.set(t, e)), t;
}
var O = (e) => w.get(e);
function k(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = D(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(D(o.result), e.oldVersion, e.newVersion, D(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
var A = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], j = [
	"put",
	"add",
	"delete",
	"clear"
], M = /* @__PURE__ */ new Map();
function N(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (M.get(t)) return M.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = j.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || A.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return M.set(t, a), a;
}
E((e) => ({
	...e,
	get: (t, n, r) => N(t, n) || e.get(t, n, r),
	has: (t, n) => !!N(t, n) || e.has(t, n)
}));
var Se = [
	"continue",
	"continuePrimaryKey",
	"advance"
], P = {}, F = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), Ce = { get(e, t) {
	if (!Se.includes(t)) return e[t];
	let n = P[t];
	return n ||= P[t] = function(...e) {
		F.set(this, I.get(this)[t](...e));
	}, n;
} };
async function* we(...e) {
	let t = this;
	if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t) return;
	t = t;
	let n = new Proxy(t, Ce);
	for (I.set(n, t), w.set(n, O(t)); t;) yield n, t = await (F.get(n) || t.continue()), F.delete(n);
}
function L(e, t) {
	return t === Symbol.asyncIterator && x(e, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || t === "iterate" && x(e, [IDBIndex, IDBObjectStore]);
}
E((e) => ({
	...e,
	get(t, n, r) {
		return L(t, n) ? we : e.get(t, n, r);
	},
	has(t, n) {
		return L(t, n) || e.has(t, n);
	}
}));
//#endregion
//#region ../../packages/storage/src/open_database.ts
var R = null, z = null;
function Te(e) {
	let t = !1, n = () => {
		t || (t = !0, e.close(), R === i && (R = null));
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
function B() {
	return R === null ? (z === null && (z = k(se, 3, { upgrade: ee }).then((e) => {
		let t = Te(e);
		return R = t, t;
	}).finally(() => {
		z = null;
	})), z) : Promise.resolve(R);
}
//#endregion
//#region ../../packages/storage/src/transaction.ts
async function Ee(e, t, n) {
	let r = Array.isArray(e) ? await B() : e, i, a;
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
var De = r([
	"image/png",
	"image/jpeg",
	"image/webp",
	"video/mp4"
]), Oe = s({
	chat_id: c().trim().min(1).max(512),
	message_id: c().trim().min(1).max(512),
	swipe_id: o().int().nonnegative()
}), V = s({
	provider_id: t,
	source_message: Oe,
	generation_parameters: n,
	media_type: De,
	width: o().int().positive().optional(),
	height: o().int().positive().optional(),
	persisted_url: e().max(2048).optional(),
	quarantined: a().default(!1),
	duration_ms: o().int().positive().optional(),
	poster_image_id: b.optional(),
	source_job_id: b.optional()
}), H = f.extend(V.shape), U = i([f, H]);
function ke(e) {
	return "media_type" in e;
}
var Ae = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
], je = [
	255,
	216,
	255
], Me = [
	82,
	73,
	70,
	70
], Ne = [
	87,
	69,
	66,
	80
], Pe = [
	102,
	116,
	121,
	112
];
function W(e, t, n = 0) {
	return e.length < n + t.length ? !1 : t.every((t, r) => e[n + r] === t);
}
function Fe(e) {
	if (W(e, Ae)) return "image/png";
	if (W(e, je)) return "image/jpeg";
	if (W(e, Me) && W(e, Ne, 8)) return "image/webp";
	if (W(e, Pe, 4)) return "video/mp4";
}
//#endregion
//#region ../../packages/storage/src/repositories/business_repositories.ts
var Ie = class extends v {
	constructor(e) {
		super(e, "provider_profiles", pe, !0);
	}
}, Le = class extends v {
	constructor(e) {
		super(e, "prompt_presets", de);
	}
}, Re = class extends v {
	constructor(e) {
		super(e, "comfy_workflows", ae);
	}
}, ze = class extends v {
	constructor(e) {
		super(e, "novelai_vibes", ie);
	}
}, Be = class extends v {
	constructor(e) {
		super(e, "character_profiles", le);
	}
}, Ve = class extends v {
	constructor(e) {
		super(e, "regex_rules", fe);
	}
}, He = class extends v {
	constructor(e) {
		super(e, "knowledge_entries", oe);
	}
}, G = class extends v {
	constructor(e) {
		super(e, "vocabularies", l);
	}
}, Ue = class extends v {
	constructor(e) {
		super(e, "vocabulary_groups", re);
	}
}, K = class extends v {
	constructor(e) {
		super(e, "vocabulary_packages", te);
	}
}, q = class extends v {
	constructor(e) {
		super(e, "vocabulary_shards", ne);
	}
}, We = class extends v {
	constructor(e) {
		super(e, "image_records", U);
	}
}, Ge = class extends v {
	constructor(e) {
		super(e, "legacy_preferences", _);
	}
}, Ke = class extends v {
	constructor(e) {
		super(e, "llm_connections", ce, !0);
	}
};
function J(e) {
	try {
		return globalThis.structuredClone(e);
	} catch (e) {
		throw new g(`Value cannot cross the structured-clone boundary: ${e instanceof Error ? e.message : String(e)}`);
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
		let n = u.parse(e);
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
				throw Y(e) ? new m("image_blobs", n.sha256) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			let t = e.objectStore("image_blobs");
			if (await t.get(n.sha256) === void 0) throw new d("image_blobs", n.sha256);
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
		let n = u.parse(e);
		await Z(this.database, "image_blobs", t, async (e) => {
			await e.objectStore("image_blobs").delete(n);
		});
	}
	prepare(e) {
		let t = J(e), n = y.safeParse(t);
		if (!n.success) throw new g("Image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new g("Image blob byte_length does not match blob data");
		return J(n.data);
	}
	validate(e) {
		let t = J(e), n = y.safeParse(t);
		if (!n.success) throw new g("Stored image blob failed schema validation", n.error.issues);
		if ((n.data.blob instanceof Blob ? n.data.blob.size : n.data.blob.byteLength) !== n.data.byte_length) throw new g("Stored image blob byte_length does not match blob data");
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
				throw Y(e) ? new m("migration_journal", n.migration_id) : e;
			}
		});
	}
	async update(e, t) {
		let n = this.prepare(e);
		await Z(this.database, "migration_journal", t, async (e) => {
			let t = e.objectStore("migration_journal");
			if (await t.get(n.migration_id) === void 0) throw new d("migration_journal", n.migration_id);
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
		let t = p.shape.migration_id.safeParse(e);
		if (!t.success) throw new g("migration_id must be a nonempty bounded string", t.error.issues);
		return t.data;
	}
	prepare(e) {
		let t = J(e);
		if (t.payload !== void 0) try {
			t.payload = h(t.payload);
		} catch (e) {
			throw new g(e instanceof Error ? e.message : "Migration payload must be serializable JSON");
		}
		let n = p.safeParse(t);
		if (!n.success) throw new g("Migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
	validate(e) {
		let t = J(e);
		if (typeof t == "object" && t && "payload" in t && t.payload !== void 0) try {
			h(t.payload);
		} catch (e) {
			throw new g(e instanceof Error ? e.message : "Stored migration payload must be serializable JSON");
		}
		let n = p.safeParse(t);
		if (!n.success) throw new g("Stored migration journal failed schema validation", n.error.issues);
		return J(n.data);
	}
};
function qe(e) {
	return {
		provider_profiles: new Ie(e),
		prompt_presets: new Le(e),
		comfy_workflows: new Re(e),
		novelai_vibes: new ze(e),
		character_profiles: new Be(e),
		regex_rules: new Ve(e),
		knowledge_entries: new He(e),
		vocabularies: new G(e),
		vocabulary_groups: new Ue(e),
		vocabulary_packages: new K(e),
		vocabulary_shards: new q(e),
		image_records: new We(e),
		image_blobs: new Q(e),
		migration_journal: new $(e),
		generation_jobs: new ue(e),
		legacy_preferences: new Ge(e),
		llm_connections: new Ke(e)
	};
}
//#endregion
export { qe as a, U as c, Ee as d, B as f, q as i, Fe as l, $ as n, H as o, K as r, V as s, Q as t, ke as u };
