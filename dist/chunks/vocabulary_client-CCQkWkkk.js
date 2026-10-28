import { c as e, h as t, m as n, o as r, r as i, t as a, u as o } from "./schemas-DMBLWk59.js";
import { i as s } from "./ids-stC4fUL8.js";
import { a as c, c as l, i as u, o as d, t as f } from "./vocabulary-BfEyI-lw.js";
//#region ../../packages/contracts/src/vocabulary_worker.ts
var p = 50, m = a([
	"exact",
	"hot",
	"prefix",
	"alias",
	"translation",
	"trigram"
]), h = n({
	record_id: d,
	display_text: t().trim().min(1).max(512),
	translation: t().trim().max(512).optional(),
	category: f.optional(),
	popularity: c,
	match_kind: m,
	score: o().nonnegative()
}), g = a(["tavern_canvas_jsonl", "legacy_v2"]), _ = t().trim().min(1).max(512), v = n({
	type: e("initialize"),
	request_id: s
}), y = n({
	type: e("query"),
	request_id: s,
	query: t().trim().max(256),
	category: f.optional()
}), b = n({
	type: e("next_page"),
	request_id: s,
	cursor: _
}), x = n({
	type: e("cancel"),
	request_id: s,
	target_request_id: s
}), S = n({
	type: e("import_source"),
	request_id: s,
	format: g,
	batch_index: o().int().nonnegative(),
	batch_count: o().int().positive(),
	payload: t().min(1).max(8388608)
}), C = n({
	type: e("dispose"),
	request_id: s
});
r("type", [
	v,
	y,
	b,
	x,
	S,
	C
]);
var w = n({
	type: e("ready"),
	package_id: u,
	data_version: l,
	record_count: o().int().nonnegative()
}), T = n({
	type: e("partial_results"),
	request_id: s,
	results: i(h).max(p)
}), E = n({
	type: e("complete"),
	request_id: s,
	results: i(h).max(p),
	next_cursor: _.nullable()
}), D = n({
	type: e("progress"),
	request_id: s,
	phase: t().trim().min(1).max(64),
	processed: o().int().nonnegative(),
	total: o().int().positive()
}), O = a([
	"cancelled",
	"invalid_request",
	"not_ready",
	"package_unavailable",
	"import_failed",
	"internal_error"
]), k = n({
	type: e("error"),
	request_id: s,
	code: O,
	message: t().trim().min(1).max(1024)
}), A = r("type", [
	w,
	T,
	E,
	D,
	k
]), j = 120, M = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VocabularySearchError", this.code = e;
	}
};
function N(e) {
	return new M("cancelled", e);
}
var P = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Map();
	#r = !1;
	#i = [];
	#a = !1;
	#o = null;
	#s = null;
	#c = 0;
	#l;
	#u = null;
	constructor(e) {
		this.#t = e.debounce_ms ?? j, this.#e = e.create_worker(), this.#e.addEventListener("message", (e) => {
			this.#h(e.data);
		}), this.#e.addEventListener("error", (e) => {
			this.#g(new M("package_unavailable", e.message));
		}), this.#l = crypto.randomUUID(), this.#b({
			type: "initialize",
			request_id: this.#l
		});
	}
	search(e, t = {}) {
		if (this.#a) return Promise.reject(N("client disposed"));
		this.#f(), this.#c += 1;
		let n = this.#c;
		return new Promise((r, i) => {
			this.#s = {
				generation: n,
				request_id: null,
				reject: i
			}, this.#o = setTimeout(() => {
				this.#o = null, this.#d(n, e, t, r, i);
			}, this.#t);
		});
	}
	async lookup(e) {
		await this.ready(), this.#p();
		let t = crypto.randomUUID();
		return new Promise((n, r) => {
			this.#n.set(t, {
				resolve: n,
				reject: r
			}), this.#b({
				type: "query",
				request_id: t,
				query: e
			});
		});
	}
	get is_ready() {
		return this.#r;
	}
	get has_failed() {
		return this.#u !== null;
	}
	async ready() {
		this.#p(), this.#r || await this.#m(), this.#p();
	}
	async next_page(e) {
		this.#p(), this.#r || await this.#m(), this.#p();
		let t = crypto.randomUUID();
		return new Promise((n, r) => {
			this.#n.set(t, {
				resolve: n,
				reject: r
			}), this.#b({
				type: "next_page",
				request_id: t,
				cursor: e
			});
		});
	}
	dispose() {
		if (this.#a) return;
		this.#a = !0, this.#o !== null && (clearTimeout(this.#o), this.#o = null);
		let e = N("client disposed");
		for (let t of this.#n.values()) t.reject(e);
		this.#n.clear(), this.#s !== null && this.#s.request_id === null && this.#s.reject(e), this.#s = null;
		for (let e of this.#i) e.resolve();
		this.#i = [], this.#e.terminate();
	}
	async #d(e, t, n, r, i) {
		if (!this.#r) try {
			await this.#m();
		} catch (t) {
			e === this.#c && !this.#a && (this.#s?.generation === e && (this.#s = null), i(t));
			return;
		}
		if (e !== this.#c || this.#a) return;
		let a = crypto.randomUUID();
		this.#s = {
			generation: e,
			request_id: a,
			reject: i
		}, this.#n.set(a, {
			resolve: r,
			reject: i,
			...n.on_partial === void 0 ? {} : { on_partial: n.on_partial }
		}), this.#b({
			type: "query",
			request_id: a,
			query: t,
			...n.category === void 0 ? {} : { category: n.category }
		});
	}
	#f() {
		let e = this.#s;
		this.#s = null, this.#o !== null && (clearTimeout(this.#o), this.#o = null), e !== null && (e.request_id !== null && (this.#n.delete(e.request_id), this.#b({
			type: "cancel",
			request_id: crypto.randomUUID(),
			target_request_id: e.request_id
		})), e.reject(N("superseded by a newer search")));
	}
	#p() {
		if (this.#a) throw N("client disposed");
	}
	#m() {
		return this.#r || this.#a ? Promise.resolve() : this.#u === null ? new Promise((e, t) => {
			this.#i.push({
				resolve: e,
				reject: t
			});
		}) : Promise.reject(this.#u);
	}
	#h(e) {
		let t = A.safeParse(e);
		if (!t.success) return;
		let n = t.data;
		if (n.type === "ready") {
			this.#r = !0, this.#v();
			return;
		}
		if (n.type === "error" && n.request_id === this.#l) {
			this.#g(new M(n.code, n.message));
			return;
		}
		let r = this.#n.get(n.request_id);
		if (r !== void 0) switch (n.type) {
			case "partial_results":
				r.on_partial?.({
					results: n.results,
					next_cursor: null
				});
				return;
			case "progress": return;
			case "complete":
				this.#_(n.request_id), r.resolve({
					results: n.results,
					next_cursor: n.next_cursor
				});
				return;
			case "error":
				this.#_(n.request_id), r.reject(new M(n.code, n.message));
				return;
		}
	}
	#g(e) {
		this.#u = e, this.#y(e);
		for (let t of this.#n.values()) t.reject(e);
		this.#n.clear(), this.#s = null;
	}
	#_(e) {
		this.#n.delete(e), this.#s?.request_id === e && (this.#s = null);
	}
	#v() {
		let e = this.#i;
		this.#i = [];
		for (let t of e) t.resolve();
	}
	#y(e) {
		let t = this.#i;
		this.#i = [];
		for (let n of t) n.reject(e);
	}
	#b(e) {
		this.#e.postMessage(e);
	}
};
//#endregion
export { P as VocabularyClient };
