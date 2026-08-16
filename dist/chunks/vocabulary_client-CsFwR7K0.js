import { a as e } from "./src-B1pCVwkN.js";
//#region src/modules/vocabulary/vocabulary_client.ts
var t = 120, n = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VocabularySearchError", this.code = e;
	}
};
function r(e) {
	return new n("cancelled", e);
}
var i = class {
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
		this.#t = e.debounce_ms ?? t, this.#e = e.create_worker(), this.#e.addEventListener("message", (e) => {
			this.#h(e.data);
		}), this.#l = crypto.randomUUID(), this.#y({
			type: "initialize",
			request_id: this.#l
		});
	}
	search(e, t = {}) {
		if (this.#a) return Promise.reject(r("client disposed"));
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
		let e = r("client disposed");
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
		})), e.reject(r("superseded by a newer search")));
	}
	#p() {
		if (this.#a) throw r("client disposed");
	}
	#m() {
		return this.#r || this.#a ? Promise.resolve() : this.#u === null ? new Promise((e, t) => {
			this.#i.push({
				resolve: e,
				reject: t
			});
		}) : Promise.reject(this.#u);
	}
	#h(t) {
		let r = e.safeParse(t);
		if (!r.success) return;
		let i = r.data;
		if (i.type === "ready") {
			this.#r = !0, this.#_();
			return;
		}
		if (i.type === "error" && i.request_id === this.#l) {
			this.#u = new n(i.code, i.message), this.#v(this.#u);
			return;
		}
		let a = this.#n.get(i.request_id);
		if (a !== void 0) switch (i.type) {
			case "partial_results":
				a.on_partial?.({
					results: i.results,
					next_cursor: null
				});
				return;
			case "progress": return;
			case "complete":
				this.#g(i.request_id), a.resolve({
					results: i.results,
					next_cursor: i.next_cursor
				});
				return;
			case "error":
				this.#g(i.request_id), a.reject(new n(i.code, i.message));
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
export { i as VocabularyClient };
