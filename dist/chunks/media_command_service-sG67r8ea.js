import { n as e, t } from "./sha2-BGNex9vj.js";
import { W as n, nt as r, tt as i } from "./src-B1pCVwkN.js";
import { n as a } from "./job_repository-Cci2nOvt.js";
//#region ../../packages/core/src/jobs/job_executor.ts
var o = class extends Error {
	provider_error;
	constructor(e) {
		super(`Job executor failed: ${e.code}`), this.name = "JobExecutorFailure", this.provider_error = Object.freeze(n.parse(e));
	}
}, s = 4, c = [
	102,
	116,
	121,
	112
];
function l(e) {
	return e.length < s + c.length ? !1 : c.every((t, n) => e[s + n] === t);
}
function u(t) {
	let n = t.slice(0, 16);
	n[6] = (n[6] ?? 0) & 15 | 80, n[8] = (n[8] ?? 0) & 63 | 128;
	let r = e(n);
	return i.parse(`${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20)}`);
}
var d = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VideoAssetError", this.code = e;
	}
};
function f(n, r) {
	if (!l(n)) throw new d("not_mp4", "Bytes do not carry an MP4 ftyp signature");
	let i = t(n);
	return {
		asset: {
			asset_id: u(i),
			media_type: "video/mp4",
			byte_length: n.byteLength,
			sha256: e(i),
			...r === void 0 ? {} : { duration_ms: r }
		},
		bytes: n
	};
}
var p = /src="([^"]+\.mp4[^"]*)"/u, m = 2e6, h = 1e8, g = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VideoGenerationError", this.code = e;
	}
};
async function _(e, t, n) {
	let r = await e.execute({
		route: t.route,
		method: "POST",
		content_type: t.content_type,
		accept: "application/json",
		body: t.body,
		max_request_bytes: t.body.byteLength,
		max_response_bytes: m,
		signal: n
	}), i = new TextDecoder().decode(r.body), a = p.exec(i);
	if (a?.[1] === void 0) throw new g("no_video_url", "Provider response carried no mp4 reference");
	if (e.fetch_remote_asset === void 0) throw new g("fetch_failed", "Transport cannot fetch remote video assets");
	return f((await e.fetch_remote_asset({
		url: a[1],
		allowed_origins: [new URL(a[1]).origin],
		max_bytes: h,
		signal: n
	})).body, void 0);
}
//#endregion
//#region src/modules/media/media_command_service.ts
var v = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t;
	}
	async save(e) {
		let t = a(this.#e), n = {
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
		await t.put(this.#t, n);
	}
}, y = class {
	#e = /* @__PURE__ */ new Map();
	register(e, t) {
		this.#e.set(e, t);
	}
	take(e) {
		let t = this.#e.get(e);
		return this.#e.delete(e), t;
	}
};
async function b(e, t, n) {
	let i = e.resolve_source_message(t), a = [];
	for (let r of n) {
		let n = e.ids.next();
		await e.store.put_image({
			id: n,
			bytes: r.bytes,
			claimed_media_type: r.media_type,
			created_at: e.clock.now(),
			metadata: {
				provider_id: t.provider_id,
				source_message: i,
				generation_parameters: t.arguments
			}
		}), a.push(n);
	}
	return a.map((e) => r.parse(e));
}
var x = 1e3, S = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = e.wait ?? ((e) => new Promise((t) => setTimeout(t, e)));
	}
	async execute(e, t) {
		let n = this.#e.plans.take(e.request_id);
		if (n === void 0) throw new o({
			code: "invalid_request",
			retryable: !1
		});
		let r = n.kind === "video" ? await this.#n(n.request, t) : await this.#r(n.request, t);
		return { image_ids: await this.#i(e, r) };
	}
	async #n(e, t) {
		return await t.mark_running(), [await _(this.#e.transport, e, t.signal)];
	}
	async #r(e, t) {
		let n = (await this.#e.load_adapters())[e.provider_id];
		if (n === void 0) throw new o({
			code: "provider_unavailable",
			retryable: !1
		});
		let r = {
			profile: await this.#e.profiles.resolve(e.provider_id),
			transport: this.#e.transport,
			assets: this.#e.assets,
			signal: t.signal,
			log: this.#e.log
		};
		await t.mark_running();
		let i = await n.submit(r, e);
		if (i.state === "completed") return i.output_assets;
		let a = i.poll_after_ms ?? x;
		for (;;) {
			await this.#t(a);
			let e = await n.poll(r, i);
			if (e.state === "completed") return e.output_assets;
			if (e.state === "failed") throw new o(e.error);
			a = e.poll_after_ms ?? a;
		}
	}
	#i(e, t) {
		return b(this.#e, e, t.map((e) => ({
			bytes: e.bytes,
			media_type: e.asset.media_type
		})));
	}
};
async function C(e, t, n) {
	return e.plans.register(n.request_id, {
		kind: "adapter",
		request: n
	}), w(e.queue, t, n.request_id, n.provider_id);
}
async function w(e, t, n, r) {
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
function T(e, t) {
	return e.queue.cancel(t);
}
//#endregion
export { b as a, T as i, y as n, C as o, S as r, o as s, v as t };
