import { t as e } from "./ids-DjWg1HG8.js";
import { a as t, c as n, s as r } from "./novelai-cCZ4kJg6.js";
import { a as i, i as a, n as o, r as s } from "./novelai_models-CXz0Nwhv.js";
import { t as c } from "./novelai_errors-Bve94MgO.js";
//#region ../../packages/contracts/src/providers/novelai_pricing.ts
var l = 65536, u = 1048576, d = 28, f = 140, p = 2, ee = 4, te = 5, m = [
	[1048576, 1],
	[1747627, 2],
	[2446678, 3],
	[3145728, 4]
];
function h(e) {
	let t = Math.max(e.pixels, l), n = Math.ceil(2951823174884865e-21 * t + 5.753298233447344e-7 * t * e.steps * e.step_price_factor) * e.smea_factor * e.price_multiplier, r = Math.max(Math.ceil(n * e.strength), 2);
	return r > f ? null : r;
}
function g(e, t) {
	return e === null || e.tier_level < 3 || !e.active ? !1 : !(t && e.usage?.is_negative === !0);
}
function _(e, t, r) {
	let i = a(e.model_id)?.profile, o = i?.smea === !0 && e.smea ? e.dyn ? 1.4 : 1.2 : 1, s = e.action === "infill" ? e.inpaint_strength : e.action === "img2img" ? e.strength : 1, c = h({
		pixels: e.width * e.height,
		steps: e.steps,
		smea_factor: o,
		strength: s,
		price_multiplier: i?.price_multiplier ?? 1,
		step_price_factor: i?.step_price_factor ?? 1
	}), l = e.character_references?.length ?? 0, f = n(e) ? e.vibe_references?.length ?? 0 : 0, m = e.width * e.height <= u && e.steps <= d && g(t, i?.opus_usage_limit ?? !1), _ = f === 0 ? 0 : r * p;
	return c === null ? {
		anlas: null,
		opus_free: m,
		per_image: null,
		vibe_encoding: _
	} : {
		anlas: c * (e.output_count - +!!m) + te * l * e.output_count + p * Math.max(0, f - ee) + _,
		opus_free: m,
		per_image: c,
		vibe_encoding: _
	};
}
function v(e, t, n) {
	let r = e * t;
	if (r <= n) return r;
	let i = Math.sqrt(n / r);
	return Math.floor(e * i) * Math.floor(t * i);
}
function y(e, t, n, r) {
	let i = h({
		pixels: v(t, n, u),
		steps: d,
		smea_factor: 1,
		strength: 1,
		price_multiplier: 1,
		step_price_factor: 1
	});
	if (i === null) return {
		anlas: null,
		opus_free: !1,
		per_image: null,
		vibe_encoding: 0
	};
	if (e === "bg-removal") return {
		anlas: 3 * i + 5,
		opus_free: !1,
		per_image: i,
		vibe_encoding: 0
	};
	let a = g(r, !1);
	return {
		anlas: a ? 0 : i,
		opus_free: a,
		per_image: i,
		vibe_encoding: 0
	};
}
function b(e) {
	if (e > 1048576) return {
		anlas: null,
		opus_free: !1,
		per_image: null,
		vibe_encoding: 0
	};
	let t = m.find(([t]) => e <= t)?.[1] ?? null;
	return {
		anlas: t,
		opus_free: !1,
		per_image: t,
		vibe_encoding: 0
	};
}
function x(e, t) {
	return r(e) ? _(e, t.account, t.unencoded_vibes) : e.action === "augment" ? y(e.tool, e.width, e.height, t.account) : b(t.source_pixels ?? Infinity);
}
//#endregion
//#region src/modules/novelai/novelai_infill_compositing.ts
var S = 4, C = 10, w = 2;
function T(e, t) {
	let { width: n, height: r, values: i } = e, a = new Uint8Array(i.length);
	for (let e = 0; e < r; e += 1) for (let r = 0; r < n; r += 1) {
		let o = 0;
		for (let a = -t; a <= t && o === 0; a += 1) {
			let t = r + a;
			t >= 0 && t < n && (o = i[e * n + t] ?? 0);
		}
		a[e * n + r] = o;
	}
	let o = new Uint8Array(i.length);
	for (let e = 0; e < r; e += 1) for (let i = 0; i < n; i += 1) {
		let s = 0;
		for (let o = -t; o <= t && s === 0; o += 1) {
			let t = e + o;
			t >= 0 && t < r && (s = a[t * n + i] ?? 0);
		}
		o[e * n + i] = s;
	}
	return {
		width: n,
		height: r,
		values: o
	};
}
function E(e, t, n) {
	let r = new Float32Array(t * n), i = e.width / t, a = e.height / n, o = (t, n) => (e.values[Math.min(e.height - 1, Math.max(0, n)) * e.width + Math.min(e.width - 1, Math.max(0, t))] ?? 0) / 255;
	for (let e = 0; e < n; e += 1) {
		let n = (e + .5) * a - .5, s = Math.floor(n), c = n - s;
		for (let n = 0; n < t; n += 1) {
			let a = (n + .5) * i - .5, l = Math.floor(a), u = a - l, d = o(l, s) * (1 - u) + o(l + 1, s) * u, f = o(l, s + 1) * (1 - u) + o(l + 1, s + 1) * u;
			r[e * t + n] = d * (1 - c) + f * c;
		}
	}
	return r;
}
function D(e, t, n, r, i) {
	let a = new Float32Array(e.length), o = i ? t : n, s = i ? n : t, c = r * 2 + 1;
	for (let n = 0; n < s; n += 1) {
		let s = (e) => {
			let r = Math.min(o - 1, Math.max(0, e));
			return i ? n * t + r : r * t + n;
		}, l = 0;
		for (let t = -r; t <= r; t += 1) l += e[s(t)] ?? 0;
		for (let t = 0; t < o; t += 1) a[s(t)] = l / c, l += (e[s(t + r + 1)] ?? 0) - (e[s(t - r)] ?? 0);
	}
	return a;
}
function ne(e, t, n, r, i) {
	let a = e;
	for (let e = 0; e < i; e += 1) a = D(a, t, n, r, !0), a = D(a, t, n, r, !1);
	return a;
}
function re(e, t, n) {
	return ne(E(T(e, S), t, n), t, n, C, w);
}
function ie(e, t, n) {
	let r = new Uint8ClampedArray(e.length);
	for (let i = 0; i < n.length; i += 1) {
		let a = Math.min(1, Math.max(0, n[i] ?? 0)), o = i * 4;
		for (let n = 0; n < 3; n += 1) {
			let i = e[o + n] ?? 0;
			r[o + n] = i + ((t[o + n] ?? 0) - i) * a;
		}
		r[o + 3] = 255;
	}
	return r;
}
//#endregion
//#region src/modules/novelai/novelai_image_operations.ts
var ae = {
	width: 448,
	height: 448
}, oe = [
	{
		width: 1024,
		height: 1536
	},
	{
		width: 1536,
		height: 1024
	},
	{
		width: 1472,
		height: 1472
	}
], O = 3143728, se = 1011712, k = 1048576, A = 155, j = 8;
function M(e) {
	let t = e.width / e.height;
	return oe.reduce((e, n) => Math.abs(Math.log(n.width / n.height / t)) < Math.abs(Math.log(e.width / e.height / t)) ? n : e);
}
function N(e, t) {
	let n = Math.sqrt(t / (e.width * e.height));
	return {
		width: Math.max(j, Math.floor(e.width * n / j) * j),
		height: Math.max(j, Math.floor(e.height * n / j) * j)
	};
}
function P(e) {
	let t = e.width * e.height;
	return t > O ? N(e, O) : t < se ? N(e, k) : e;
}
async function F(e) {
	return createImageBitmap(new Blob([new Uint8Array(e)]));
}
function I(e) {
	let t = new OffscreenCanvas(e.width, e.height), n = t.getContext("2d");
	if (n === null) throw Error("A 2D canvas context is unavailable in this browser");
	return {
		canvas: t,
		context: n
	};
}
async function L(e) {
	let t = await e.convertToBlob({ type: "image/png" });
	return new Uint8Array(await t.arrayBuffer());
}
function R(e, t) {
	let { context: n } = I(t);
	return n.drawImage(e, 0, 0, t.width, t.height), n.getImageData(0, 0, t.width, t.height);
}
function z() {
	return {
		async composite_infill(e, t, n) {
			let [r, i, a] = await Promise.all([
				F(e),
				F(t),
				F(n)
			]);
			try {
				let e = {
					width: i.width,
					height: i.height
				}, t = {
					width: Math.max(1, Math.floor(e.width / j)),
					height: Math.max(1, Math.floor(e.height / j))
				}, n = R(a, t).data, o = new Uint8Array(t.width * t.height);
				for (let e = 0; e < o.length; e += 1) o[e] = (n[e * 4] ?? 0) >= 128 ? 255 : 0;
				let s = re({
					values: o,
					...t
				}, e.width, e.height), c = ie(R(r, e).data, R(i, e).data, s), { canvas: l, context: u } = I(e);
				return u.putImageData(new ImageData(c, e.width, e.height), 0, 0), await L(l);
			} finally {
				r.close(), i.close(), a.close();
			}
		},
		async size(e) {
			let t = await F(e);
			try {
				return {
					width: t.width,
					height: t.height
				};
			} finally {
				t.close();
			}
		},
		async resize(e, t) {
			let n = await F(e);
			try {
				let { canvas: e, context: r } = I(t);
				return r.imageSmoothingQuality = "high", r.drawImage(n, 0, 0, t.width, t.height), await L(e);
			} finally {
				n.close();
			}
		},
		async pad(e, t) {
			let n = await F(e);
			try {
				let { canvas: e, context: r } = I(t);
				r.fillStyle = "#000000", r.fillRect(0, 0, t.width, t.height);
				let i = Math.min(t.width / n.width, t.height / n.height), a = Math.round(n.width * i), o = Math.round(n.height * i);
				return r.imageSmoothingQuality = "high", r.drawImage(n, Math.floor((t.width - a) / 2), Math.floor((t.height - o) / 2), a, o), await L(e);
			} finally {
				n.close();
			}
		},
		async binarize_mask(e, t) {
			let n = await F(e);
			try {
				let e = {
					width: Math.max(1, Math.floor(t.width / j)),
					height: Math.max(1, Math.floor(t.height / j))
				}, { canvas: r, context: i } = I(e);
				i.drawImage(n, 0, 0, e.width, e.height);
				let a = i.getImageData(0, 0, e.width, e.height), o = a.data;
				for (let e = 0; e < o.length; e += 4) {
					let t = ((o[e] ?? 0) + (o[e + 1] ?? 0) + (o[e + 2] ?? 0)) / 3 * (o[e + 3] ?? 0) / 255 >= A ? 255 : 0;
					o[e] = t, o[e + 1] = t, o[e + 2] = t, o[e + 3] = 255;
				}
				i.putImageData(a, 0, 0);
				let s = I(t);
				return s.context.imageSmoothingEnabled = !1, s.context.drawImage(r, 0, 0, t.width, t.height), await L(s.canvas);
			} finally {
				n.close();
			}
		}
	};
}
//#endregion
//#region src/modules/novelai/novelai_storage.ts
var B = 6048e5;
async function V(e) {
	let t = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(e)));
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
async function H(e) {
	let t = await V(new TextEncoder().encode(e)), n = (Number.parseInt(t.slice(16, 17), 16) & 3 | 8).toString(16);
	return `${t.slice(0, 8)}-${t.slice(8, 12)}-8${t.slice(13, 16)}-${n}${t.slice(17, 20)}-${t.slice(20, 32)}`;
}
function U(e) {
	return `${e.image_sha256}:${e.model_id}:${String(e.information_extracted)}`;
}
function W(e, t, n) {
	return {
		async get(n) {
			return (await e.get(t(), await H(U(n))))?.encoding ?? null;
		},
		async put(r, i) {
			let a = n(), o = await H(U(r));
			await e.put(t(), {
				schema_version: 1,
				id: o,
				namespace: t(),
				record_key: `${t()}:${o}`,
				created_at: a,
				updated_at: a,
				image_sha256: r.image_sha256,
				model_id: r.model_id,
				information_extracted: r.information_extracted,
				encoding: i
			});
		}
	};
}
function ce(e) {
	return e[0] === 255 && e[1] === 216 ? "image/jpeg" : e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 ? "image/webp" : "image/png";
}
function G(t, n, r) {
	async function i() {
		let e = r() - B;
		for (let r of await t.list(n())) Date.parse(r.created_at) < e && await t.delete(n(), r.id);
	}
	return {
		async put(a) {
			await i();
			let o = e.parse(crypto.randomUUID()), s = new Date(r()).toISOString();
			return await t.put(n(), {
				schema_version: 1,
				id: o,
				namespace: n(),
				record_key: `${n()}:${o}`,
				created_at: s,
				updated_at: s,
				media_type: ce(a),
				byte_length: a.byteLength,
				blob: new Uint8Array(a).buffer
			}), o;
		},
		async read(e) {
			let r = await t.get(n(), e);
			if (r === null) return null;
			let i = r.blob instanceof ArrayBuffer ? r.blob : await r.blob.arrayBuffer();
			return {
				asset_id: e,
				media_type: r.media_type,
				bytes: new Uint8Array(i)
			};
		}
	};
}
function le(e, t) {
	return { async read(n, r) {
		return await t.read(n) ?? e.read(n, r);
	} };
}
//#endregion
//#region src/modules/novelai/novelai_infill_output.ts
async function ue(e, t, n, r) {
	let [i, a] = await Promise.all([e.assets.read(t.image_asset_id, r), e.assets.read(t.mask_asset_id, r)]);
	return Promise.all(n.map(async (t) => {
		let n = await e.image_operations.composite_infill(i.bytes, t.bytes, a.bytes);
		return {
			asset: {
				...t.asset,
				media_type: "image/png",
				byte_length: n.byteLength,
				sha256: await V(n)
			},
			bytes: n
		};
	}));
}
//#endregion
//#region src/modules/novelai/novelai_request_preparation.ts
var K = class extends Error {
	constructor(e) {
		super(e), this.name = "NovelAiPreparationError";
	}
};
function de(e) {
	let t = a(e);
	if (t === null) throw new K(`"${e}" is not a NovelAI image model`);
	return t.profile;
}
function q(e, t) {
	return e.width === t.width && e.height === t.height;
}
async function J(e, t, n) {
	return (await e.assets.read(t, n)).bytes;
}
async function Y(e, t, n, r) {
	let i = await J(e, t, r);
	return q(await e.image_operations.size(i), n) ? t : e.store_input(await e.image_operations.resize(i, n));
}
async function X(e, t, n, r) {
	let i = await J(e, t, r), a = await e.image_operations.size(i), o = typeof n == "function" ? n(a) : n;
	return q(a, o) ? t : e.store_input(await e.image_operations.pad(i, o));
}
function Z(e, t, n) {
	return {
		image_sha256: e,
		model_id: t,
		information_extracted: n.information_extracted
	};
}
async function fe(e, t, n) {
	let r = t.vibe_references ?? [], i = [];
	for (let a of r) {
		if (a.encoding !== void 0) {
			i.push(a);
			continue;
		}
		let r = await J(e, a.asset_id, n), o = Z(await e.sha256(r), t.model_id, a), s = await e.vibe_cache.get(o);
		s === null && (s = await e.encode_vibe(r, t.model_id, a.information_extracted, n), await e.vibe_cache.put(o, s)), i.push({
			...a,
			encoding: s
		});
	}
	return i;
}
async function pe(e, t, r, i) {
	if (r.vibe_references === void 0 || !n(r)) return r.vibe_references;
	switch (t.vibe_transfer) {
		case "unsupported": throw new K(`${t.display_name} does not support vibe transfer`);
		case "encoded": return fe(e, r, i);
		case "raw_image": {
			let t = [];
			for (let n of r.vibe_references) t.push({
				...n,
				asset_id: await X(e, n.asset_id, ae, i)
			});
			return t;
		}
	}
}
async function me(e, t, n) {
	let r = de(t.model_id), i = {
		width: t.width,
		height: t.height
	}, a = await pe(e, r, t, n), o = t.character_references === void 0 ? void 0 : await Promise.all(t.character_references.map(async (t) => ({
		...t,
		asset_id: await X(e, t.asset_id, M, n)
	}))), s = {
		...a === void 0 ? {} : { vibe_references: [...a] },
		...o === void 0 ? {} : { character_references: o }
	};
	switch (t.action) {
		case "generate": return {
			...t,
			...s
		};
		case "img2img": return {
			...t,
			...s,
			image_asset_id: await Y(e, t.image_asset_id, i, n)
		};
		case "infill": {
			let r = await J(e, t.mask_asset_id, n);
			return {
				...t,
				...s,
				image_asset_id: await Y(e, t.image_asset_id, i, n),
				mask_asset_id: await e.store_input(await e.image_operations.binarize_mask(r, i))
			};
		}
	}
}
async function he(e, n, r) {
	let i;
	switch (n.action) {
		case "generate":
		case "img2img":
		case "infill":
			i = await me(e, n, r);
			break;
		case "augment": {
			let t = await J(e, n.image_asset_id, r), a = P(await e.image_operations.size(t));
			i = {
				...n,
				...a,
				image_asset_id: await Y(e, n.image_asset_id, a, r)
			};
			break;
		}
		case "upscale": i = n;
	}
	return t.parse(i);
}
async function ge(e, t, r) {
	if (t.action === "upscale" || t.action === "augment" || t.vibe_references === void 0 || !n(t) || a(t.model_id)?.profile.vibe_transfer !== "encoded") return 0;
	let i = 0;
	for (let n of t.vibe_references) {
		if (n.encoding !== void 0) continue;
		let a = (await e.assets.read(n.asset_id, r)).bytes, o = Z(await e.sha256(a), t.model_id, n);
		await e.vibe_cache.get(o) === null && (i += 1);
	}
	return i;
}
//#endregion
//#region src/modules/novelai/novelai_service.ts
var Q = "https://novelai.net/image", $ = /\/_next\/static\/chunks\/[A-Za-z0-9._-]+\.js/gu, _e = 3e7;
async function ve(e, t) {
	let n = await e(Q, t), r = [...new Set(n.match($) ?? [])].map((e) => new URL(e, Q).href), i = [n];
	for (let n of r) i.push(await e(n, t));
	return o(i);
}
function ye(e) {
	let t = i, n = null, r = !1;
	async function a(t) {
		r = !0;
		let { fetch_novelai_account: i } = await import("./adapters-DW2-o2Va.js");
		return n = await i(e.transport(), t), n;
	}
	return {
		get_account: a,
		list_models: () => s(t),
		async refresh_models(n) {
			let r = [];
			for (let i of e.page_fetchers) try {
				let e = await ve(i, n);
				if (e.length > 0) return t = e, s(t);
				r.push("the page named no NovelAI models");
			} catch (e) {
				r.push(e instanceof Error ? e.message : String(e));
			}
			throw new c(r.length === 0 ? "No relay can reach novelai.net from this host; the bundled model list stays in use" : `The NovelAI model list could not be refreshed (${r.join("; ")}); the bundled list stays in use`);
		},
		async estimate_cost(t, i) {
			r || await a(i).catch(() => void 0);
			let o = await ge(e.preparation, t, i), s;
			if (t.action === "upscale") {
				let n = (await e.preparation.assets.read(t.image_asset_id, i)).bytes, r = await e.image_operations.size(n);
				s = r.width * r.height;
			}
			return x(t, {
				account: n,
				unencoded_vibes: o,
				...s === void 0 ? {} : { source_pixels: s }
			});
		},
		async encode_vibe(t, n, r, i) {
			let { encode_novelai_vibe: a } = await import("./adapters-DW2-o2Va.js");
			return a(e.transport(), {
				image: t,
				model_id: n,
				information_extracted: r,
				max_request_bytes: _e,
				signal: i
			});
		}
	};
}
function be(e = globalThis.fetch.bind(globalThis)) {
	return async (t, n) => {
		let r = await e(`/proxy/${t}`, { signal: n });
		if (r.status === 404) throw Error("SillyTavern's CORS proxy is disabled (set enableCorsProxy: true)");
		if (!r.ok) throw Error(`the SillyTavern CORS proxy answered ${String(r.status)}`);
		return r.text();
	};
}
//#endregion
//#region src/modules/novelai/novelai_runtime.ts
function xe(e) {
	let t = z(), n = G(e.provider_inputs, e.namespace, () => Date.now()), r = W(e.vibe_encodings, e.namespace, () => (/* @__PURE__ */ new Date()).toISOString()), i = le(e.gallery_assets, n), a = ye({
		transport: e.transport,
		preparation: {
			assets: i,
			vibe_cache: r,
			sha256: V
		},
		image_operations: t,
		page_fetchers: [be(e.fetch)]
	});
	return {
		service: a,
		assets: i,
		store_input: (e) => n.put(e),
		finish: (e, n, r) => e.provider_id === "novelai" && e.action === "infill" ? ue({
			assets: i,
			image_operations: t
		}, e, n, r) : Promise.resolve(n),
		prepare: (e, o) => e.provider_id === "novelai" ? he({
			assets: i,
			image_operations: t,
			store_input: (e) => n.put(e),
			vibe_cache: r,
			encode_vibe: (e, t, n, r) => a.encode_vibe(e, t, n, r),
			sha256: V
		}, e, o) : Promise.resolve(e)
	};
}
//#endregion
export { xe as create_novelai_runtime };
