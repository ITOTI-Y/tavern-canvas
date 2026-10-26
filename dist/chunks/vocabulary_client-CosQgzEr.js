import { b as e, f as t, g as n, i as r, l as i, m as a, s as o, y as s } from "./ids-DjWg1HG8.js";
import { a as c, c as l, i as u, o as d, t as f } from "./vocabulary-BD4XUNJi.js";
//#region ../../packages/contracts/src/vocabulary_worker.ts
var p = 50, m = o([
	"exact",
	"hot",
	"prefix",
	"alias",
	"translation",
	"trigram"
]), h = s({
	record_id: d,
	display_text: e().trim().min(1).max(512),
	translation: e().trim().max(512).optional(),
	category: f.optional(),
	popularity: c,
	match_kind: m,
	score: n().nonnegative()
}), g = o(["tavern_canvas_jsonl", "legacy_v2"]), _ = e().trim().min(1).max(512), v = s({
	type: a("initialize"),
	request_id: r
}), y = s({
	type: a("query"),
	request_id: r,
	query: e().trim().max(256),
	category: f.optional()
}), b = s({
	type: a("next_page"),
	request_id: r,
	cursor: _
}), x = s({
	type: a("cancel"),
	request_id: r,
	target_request_id: r
}), S = s({
	type: a("import_source"),
	request_id: r,
	format: g,
	batch_index: n().int().nonnegative(),
	batch_count: n().int().positive(),
	payload: e().min(1).max(8388608)
}), C = s({
	type: a("dispose"),
	request_id: r
});
t("type", [
	v,
	y,
	b,
	x,
	S,
	C
]);
var w = s({
	type: a("ready"),
	package_id: u,
	data_version: l,
	record_count: n().int().nonnegative()
}), T = s({
	type: a("partial_results"),
	request_id: r,
	results: i(h).max(p)
}), E = s({
	type: a("complete"),
	request_id: r,
	results: i(h).max(p),
	next_cursor: _.nullable()
}), D = s({
	type: a("progress"),
	request_id: r,
	phase: e().trim().min(1).max(64),
	processed: n().int().nonnegative(),
	total: n().int().positive()
}), O = o([
	"cancelled",
	"invalid_request",
	"not_ready",
	"package_unavailable",
	"import_failed",
	"internal_error"
]), k = s({
	type: a("error"),
	request_id: r,
	code: O,
	message: e().trim().min(1).max(1024)
}), A = t("type", [
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
		}), this.#l = crypto.randomUUID(), this.#y({
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
	async next_page(e) {
		this.#p(), this.#r || await this.#m(), this.#p();
		let t = crypto.randomUUID();
		return new Promise((n, r) => {
			this.#n.set(t, {
				resolve: n,
				reject: r
			}), this.#y({
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
		}), this.#y({
			type: "query",
			request_id: a,
			query: t,
			...n.category === void 0 ? {} : { category: n.category }
		});
	}
	#f() {
		let e = this.#s;
		this.#s = null, this.#o !== null && (clearTimeout(this.#o), this.#o = null), e !== null && (e.request_id !== null && (this.#n.delete(e.request_id), this.#y({
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
			this.#r = !0, this.#_();
			return;
		}
		if (n.type === "error" && n.request_id === this.#l) {
			this.#u = new M(n.code, n.message), this.#v(this.#u);
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
				this.#g(n.request_id), r.resolve({
					results: n.results,
					next_cursor: n.next_cursor
				});
				return;
			case "error":
				this.#g(n.request_id), r.reject(new M(n.code, n.message));
				return;
		}
	}
	#g(e) {
		this.#n.delete(e), this.#s?.request_id === e && (this.#s = null);
	}
	#_() {
		let e = this.#i;
		this.#i = [];
		for (let t of e) t.resolve();
	}
	#v(e) {
		let t = this.#i;
		this.#i = [];
		for (let n of t) n.reject(e);
	}
	#y(e) {
		this.#e.postMessage(e);
	}
};
//#endregion
export { P as VocabularyClient };
