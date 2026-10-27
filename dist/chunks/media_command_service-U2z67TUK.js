import { n as e } from "./ids-stC4fUL8.js";
import { a as t } from "./provider-Ctw4medr.js";
import { n } from "./job_repository-D9SqferT.js";
//#region ../../packages/core/src/jobs/job_executor.ts
var r = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(t.parse(e));
	}
}, i = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async save(e) {
		let t = n(this.#e), r = {
			schema_version: 1,
			id: e.job_id,
			namespace: this.#t,
			record_key: `${this.#t}:${e.job_id}`,
			created_at: e.created_at,
			updated_at: e.updated_at,
			request_id: e.request_id,
			request_digest: e.request_digest,
			generation_anchor: e.generation_anchor,
			source_anchor: e.source_anchor,
			chat_id: e.chat_id,
			requested_swipe_id: e.requested_swipe_id,
			provider_id: e.provider_id,
			arguments: e.arguments,
			state: e.state,
			error: e.error,
			image_ids: [...e.image_ids]
		};
		await t.put(this.#t, r);
	}
}, a = class {
	#e = /* @__PURE__ */ new Map();
	register(e) {
		this.#e.set(e.request_id, e);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
};
async function o(t, n, r) {
	let i = t.resolve_source_message(n), a = [];
	for (let e of r) {
		let r = t.ids.next();
		await t.store.put_image({
			id: r,
			bytes: e.bytes,
			claimed_media_type: e.media_type,
			created_at: t.clock.now(),
			metadata: {
				provider_id: n.provider_id,
				source_message: i,
				generation_parameters: n.arguments
			}
		}), a.push(r);
	}
	return a.map((t) => e.parse(t));
}
var s = 1e3;
function c(e) {
	if (e instanceof Error && "provider_error" in e) {
		let n = t.safeParse(e.provider_error);
		if (n.success && n.data.code === "rate_limited") return new r(n.data);
	}
	return null;
}
var l = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new r({
			code: "invalid_request",
			retryable: !1
		});
		let i;
		try {
			i = await this.#n(n, t);
		} catch (e) {
			throw c(e) ?? e;
		}
		let a = await this.#r(n, i);
		return { image_ids: await this.#i(e, a) };
	}
	async #n(e, t) {
		let n = (await this.#e.load_adapters())[e.provider_id];
		if (n === void 0) throw new r({
			code: "provider_unavailable",
			retryable: !1
		});
		let i = {
			profile: await this.#e.profiles.resolve(e.provider_id),
			transport: this.#e.transport,
			assets: this.#e.assets,
			signal: t.signal,
			log: this.#e.log
		};
		await t.mark_running();
		let a = await n.submit(i, e);
		if (a.state === "completed") return a.output_assets;
		let o = a.poll_after_ms ?? s;
		for (;;) {
			await this.#t(o);
			let e = await n.poll(i, a);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new r(e.error);
			o = e.poll_after_ms ?? o;
		}
	}
	#r(e, t) {
		return this.#e.postprocess === void 0 ? Promise.resolve(t) : this.#e.postprocess(e, t);
	}
	#i(e, t) {
		return o(this.#e, e, t.map((e) => ({
			bytes: e.bytes,
			media_type: e.asset.media_type
		})));
	}
};
async function u(e, t, n) {
	return e.plans.register(n), d(e.queue, t, n.request_id, n.provider_id);
}
async function d(e, t, n, r) {
	let i = {
		request_id: n,
		generation_anchor: t.generation_anchor,
		source_anchor: t.source_anchor,
		chat_id: t.chat_id,
		requested_swipe_id: t.requested_swipe_id,
		provider_id: r,
		arguments: {
			generation_anchor: t.generation_anchor,
			scene_description: t.scene_description
		},
		automatic: !1
	};
	return e.enqueue(i);
}
function f(e, t) {
	return e.queue.cancel(t);
}
//#endregion
export { o as a, f as i, a as n, u as o, l as r, r as s, i as t };
