import { t as e } from "./ids-CQF5rr2J.js";
import { i as t, n, r } from "./novelai-Dkv1N5Ct.js";
import { i, n as a, r as o, t as s } from "./novelai_models-CWhnujYI.js";
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
function _(e, n, r) {
	let i = o(e.model_id)?.profile, a = i?.smea === !0 && e.smea ? e.dyn ? 1.4 : 1.2 : 1, s = e.action === "infill" ? e.inpaint_strength : e.action === "img2img" ? e.strength : 1, c = h({
		pixels: e.width * e.height,
		steps: e.steps,
		smea_factor: a,
		strength: s,
		price_multiplier: i?.price_multiplier ?? 1,
		step_price_factor: i?.step_price_factor ?? 1
	}), l = e.character_references?.length ?? 0, f = t(e) ? e.vibe_references?.length ?? 0 : 0, m = e.width * e.height <= u && e.steps <= d && g(n, i?.opus_usage_limit ?? !1), _ = f === 0 ? 0 : r * p;
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
function ne(e, t, n) {
	let r = e * t;
	if (r <= n) return r;
	let i = Math.sqrt(n / r);
	return Math.floor(e * i) * Math.floor(t * i);
}
function v(e, t, n, r) {
	let i = h({
		pixels: ne(t, n, u),
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
function y(e) {
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
function b(e, t) {
	return r(e) ? _(e, t.account, t.unencoded_vibes) : e.action === "augment" ? v(e.tool, e.width, e.height, t.account) : y(t.source_pixels ?? Infinity);
}
//#endregion
//#region src/modules/novelai/novelai_image_operations.ts
var x = {
	width: 448,
	height: 448
}, S = [
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
], C = 3143728, w = 1011712, T = 1048576, E = 155, D = 8;
function O(e) {
	let t = e.width / e.height;
	return S.reduce((e, n) => Math.abs(Math.log(n.width / n.height / t)) < Math.abs(Math.log(e.width / e.height / t)) ? n : e);
}
function k(e, t) {
	let n = Math.sqrt(t / (e.width * e.height));
	return {
		width: Math.max(D, Math.floor(e.width * n / D) * D),
		height: Math.max(D, Math.floor(e.height * n / D) * D)
	};
}
function re(e) {
	let t = e.width * e.height;
	return t > C ? k(e, C) : t < w ? k(e, T) : e;
}
async function A(e) {
	return createImageBitmap(new Blob([new Uint8Array(e)]));
}
function j(e) {
	let t = new OffscreenCanvas(e.width, e.height), n = t.getContext("2d");
	if (n === null) throw Error("A 2D canvas context is unavailable in this browser");
	return {
		canvas: t,
		context: n
	};
}
async function M(e) {
	let t = await e.convertToBlob({ type: "image/png" });
	return new Uint8Array(await t.arrayBuffer());
}
function N() {
	return {
		async size(e) {
			let t = await A(e);
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
			let n = await A(e);
			try {
				let { canvas: e, context: r } = j(t);
				return r.imageSmoothingQuality = "high", r.drawImage(n, 0, 0, t.width, t.height), await M(e);
			} finally {
				n.close();
			}
		},
		async pad(e, t) {
			let n = await A(e);
			try {
				let { canvas: e, context: r } = j(t);
				r.fillStyle = "#000000", r.fillRect(0, 0, t.width, t.height);
				let i = Math.min(t.width / n.width, t.height / n.height), a = Math.round(n.width * i), o = Math.round(n.height * i);
				return r.imageSmoothingQuality = "high", r.drawImage(n, Math.floor((t.width - a) / 2), Math.floor((t.height - o) / 2), a, o), await M(e);
			} finally {
				n.close();
			}
		},
		async binarize_mask(e, t) {
			let n = await A(e);
			try {
				let e = {
					width: Math.max(1, Math.floor(t.width / D)),
					height: Math.max(1, Math.floor(t.height / D))
				}, { canvas: r, context: i } = j(e);
				i.drawImage(n, 0, 0, e.width, e.height);
				let a = i.getImageData(0, 0, e.width, e.height), o = a.data;
				for (let e = 0; e < o.length; e += 4) {
					let t = ((o[e] ?? 0) + (o[e + 1] ?? 0) + (o[e + 2] ?? 0)) / 3 * (o[e + 3] ?? 0) / 255 >= E ? 255 : 0;
					o[e] = t, o[e + 1] = t, o[e + 2] = t, o[e + 3] = 255;
				}
				return i.putImageData(a, 0, 0), await M(r);
			} finally {
				n.close();
			}
		}
	};
}
//#endregion
//#region src/modules/novelai/novelai_request_preparation.ts
var P = class extends Error {
	constructor(e) {
		super(e), this.name = "NovelAiPreparationError";
	}
};
function F(e) {
	let t = o(e);
	if (t === null) throw new P(`"${e}" is not a NovelAI image model`);
	return t.profile;
}
function I(e, t) {
	return e.width === t.width && e.height === t.height;
}
async function L(e, t, n) {
	return (await e.assets.read(t, n)).bytes;
}
async function R(e, t, n, r) {
	let i = await L(e, t, r);
	return I(await e.image_operations.size(i), n) ? t : e.store_input(await e.image_operations.resize(i, n));
}
async function z(e, t, n, r) {
	let i = await L(e, t, r), a = await e.image_operations.size(i), o = typeof n == "function" ? n(a) : n;
	return I(a, o) ? t : e.store_input(await e.image_operations.pad(i, o));
}
function B(e, t, n) {
	return {
		image_sha256: e,
		model_id: t,
		information_extracted: n.information_extracted
	};
}
async function V(e, t, n) {
	let r = t.vibe_references ?? [], i = [];
	for (let a of r) {
		if (a.encoding !== void 0) {
			i.push(a);
			continue;
		}
		let r = await L(e, a.asset_id, n), o = B(await e.sha256(r), t.model_id, a), s = await e.vibe_cache.get(o);
		s === null && (s = await e.encode_vibe(r, t.model_id, a.information_extracted, n), await e.vibe_cache.put(o, s)), i.push({
			...a,
			encoding: s
		});
	}
	return i;
}
async function H(e, n, r, i) {
	if (r.vibe_references === void 0 || !t(r)) return r.vibe_references;
	switch (n.vibe_transfer) {
		case "unsupported": throw new P(`${n.display_name} does not support vibe transfer`);
		case "encoded": return V(e, r, i);
		case "raw_image": {
			let t = [];
			for (let n of r.vibe_references) t.push({
				...n,
				asset_id: await z(e, n.asset_id, x, i)
			});
			return t;
		}
	}
}
async function U(e, t, n) {
	let r = F(t.model_id), i = {
		width: t.width,
		height: t.height
	}, a = await H(e, r, t, n), o = t.character_references === void 0 ? void 0 : await Promise.all(t.character_references.map(async (t) => ({
		...t,
		asset_id: await z(e, t.asset_id, O, n)
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
			image_asset_id: await R(e, t.image_asset_id, i, n)
		};
		case "infill": {
			let r = await L(e, t.mask_asset_id, n);
			return {
				...t,
				...s,
				image_asset_id: await R(e, t.image_asset_id, i, n),
				mask_asset_id: await e.store_input(await e.image_operations.binarize_mask(r, i))
			};
		}
	}
}
async function W(e, t, r) {
	let i;
	switch (t.action) {
		case "generate":
		case "img2img":
		case "infill":
			i = await U(e, t, r);
			break;
		case "augment": {
			let n = await L(e, t.image_asset_id, r), a = re(await e.image_operations.size(n));
			i = {
				...t,
				...a,
				image_asset_id: await R(e, t.image_asset_id, a, r)
			};
			break;
		}
		case "upscale": i = t;
	}
	return n.parse(i);
}
async function G(e, n, r) {
	if (n.action === "upscale" || n.action === "augment" || n.vibe_references === void 0 || !t(n) || o(n.model_id)?.profile.vibe_transfer !== "encoded") return 0;
	let i = 0;
	for (let t of n.vibe_references) {
		if (t.encoding !== void 0) continue;
		let a = (await e.assets.read(t.asset_id, r)).bytes, o = B(await e.sha256(a), n.model_id, t);
		await e.vibe_cache.get(o) === null && (i += 1);
	}
	return i;
}
//#endregion
//#region src/modules/novelai/novelai_service.ts
var K = "https://novelai.net/image", q = /\/_next\/static\/chunks\/[A-Za-z0-9._-]+\.js/gu, J = 3e7;
async function Y(e, t) {
	let n = await e(K, t), r = [...new Set(n.match(q) ?? [])].map((e) => new URL(e, K).href), i = [n];
	for (let n of r) i.push(await e(n, t));
	return s(i);
}
function ie(e) {
	let t = i, n = null;
	return {
		async get_account(t) {
			let { fetch_novelai_account: r } = await import("./adapters-CcVZKObZ.js");
			return n = await r(e.transport(), t), n;
		},
		list_models: () => a(t),
		async refresh_models(n) {
			let r = [];
			for (let i of e.page_fetchers) try {
				let e = await Y(i, n);
				if (e.length > 0) return t = e, a(t);
				r.push("the page named no NovelAI models");
			} catch (e) {
				r.push(e instanceof Error ? e.message : String(e));
			}
			throw new c(r.length === 0 ? "No relay can reach novelai.net from this host; the bundled model list stays in use" : `The NovelAI model list could not be refreshed (${r.join("; ")}); the bundled list stays in use`);
		},
		async estimate_cost(t, r) {
			let i = await G(e.preparation, t, r), a;
			if (t.action === "upscale") {
				let n = (await e.preparation.assets.read(t.image_asset_id, r)).bytes, i = await e.image_operations.size(n);
				a = i.width * i.height;
			}
			return b(t, {
				account: n,
				unencoded_vibes: i,
				...a === void 0 ? {} : { source_pixels: a }
			});
		},
		async encode_vibe(t, n, r, i) {
			let { encode_novelai_vibe: a } = await import("./adapters-CcVZKObZ.js");
			return a(e.transport(), {
				image: t,
				model_id: n,
				information_extracted: r,
				max_request_bytes: J,
				signal: i
			});
		}
	};
}
function X(e = globalThis.fetch.bind(globalThis)) {
	return async (t, n) => {
		let r = await e(`/proxy/${t}`, { signal: n });
		if (r.status === 404) throw Error("SillyTavern's CORS proxy is disabled (set enableCorsProxy: true)");
		if (!r.ok) throw Error(`the SillyTavern CORS proxy answered ${String(r.status)}`);
		return r.text();
	};
}
//#endregion
//#region src/modules/novelai/novelai_storage.ts
var ae = 6048e5;
async function Z(e) {
	let t = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(e)));
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
async function Q(e) {
	let t = await Z(new TextEncoder().encode(e)), n = (Number.parseInt(t.slice(16, 17), 16) & 3 | 8).toString(16);
	return `${t.slice(0, 8)}-${t.slice(8, 12)}-8${t.slice(13, 16)}-${n}${t.slice(17, 20)}-${t.slice(20, 32)}`;
}
function $(e) {
	return `${e.image_sha256}:${e.model_id}:${String(e.information_extracted)}`;
}
function oe(e, t, n) {
	return {
		async get(n) {
			return (await e.get(t(), await Q($(n))))?.encoding ?? null;
		},
		async put(r, i) {
			let a = n(), o = await Q($(r));
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
function se(e) {
	return e[0] === 255 && e[1] === 216 ? "image/jpeg" : e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 ? "image/webp" : "image/png";
}
function ce(t, n, r) {
	async function i() {
		let e = r() - ae;
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
				media_type: se(a),
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
//#region src/modules/novelai/novelai_runtime.ts
function ue(e) {
	let t = N(), n = ce(e.provider_inputs, e.namespace, () => Date.now()), r = oe(e.vibe_encodings, e.namespace, () => (/* @__PURE__ */ new Date()).toISOString()), i = le(e.gallery_assets, n), a = ie({
		transport: e.transport,
		preparation: {
			assets: i,
			vibe_cache: r,
			sha256: Z
		},
		image_operations: t,
		page_fetchers: [X(e.fetch)]
	});
	return {
		service: a,
		assets: i,
		prepare: (e, o) => e.provider_id === "novelai" ? W({
			assets: i,
			image_operations: t,
			store_input: (e) => n.put(e),
			vibe_cache: r,
			encode_vibe: (e, t, n, r) => a.encode_vibe(e, t, n, r),
			sha256: Z
		}, e, o) : Promise.resolve(e)
	};
}
//#endregion
export { ue as create_novelai_runtime };
