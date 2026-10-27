import { n as e } from "./novelai_request_defaults-B0sJ9ANr.js";
var t = class extends TypeError {
	constructor(e) {
		super(e), this.name = "InpaintDimensionError";
	}
};
function n(e, n) {
	if (!Number.isInteger(e) || e <= 0) throw new t(`${n} must be a positive integer, got ${String(e)}`);
}
function r(e, r, i, a) {
	if (n(e, "source_width"), n(r, "source_height"), n(i, "mask_width"), n(a, "mask_height"), e !== i || r !== a) throw new t(`Mask dimensions ${String(i)}x${String(a)} do not match source dimensions ${String(e)}x${String(r)}`);
}
function i(e, t, n, r, i, a, o) {
	let s = Math.max(0, Math.floor(r - a)), c = Math.min(t - 1, Math.ceil(r + a)), l = Math.max(0, Math.floor(i - a)), u = Math.min(n - 1, Math.ceil(i + a)), d = a * a;
	for (let n = l; n <= u; n += 1) for (let a = s; a <= c; a += 1) {
		let s = a - r, c = n - i;
		s * s + c * c <= d && (e[n * t + a] = o);
	}
}
var a = class {
	width;
	height;
	#e;
	#t;
	#n;
	constructor(e, t) {
		n(e, "width"), n(t, "height"), this.width = e, this.height = t, this.#e = new Uint8ClampedArray(e * t).fill(0), this.#t = [this.#e.slice()], this.#n = 0;
	}
	get mask() {
		return this.#e.slice();
	}
	can_undo() {
		return this.#n > 0;
	}
	can_redo() {
		return this.#n < this.#t.length - 1;
	}
	stroke(e, t, r) {
		if (e.length === 0) return;
		n(Math.round(t), "brush_size");
		let a = r === "brush" ? 255 : 0, o = t / 2, s = e[0];
		if (s === void 0) return;
		i(this.#e, this.width, this.height, s.x, s.y, o, a);
		let c = Math.max(1, t / 4);
		for (let t = 1; t < e.length; t += 1) {
			let n = e[t - 1], r = e[t];
			if (n === void 0 || r === void 0) continue;
			let s = Math.hypot(r.x - n.x, r.y - n.y), l = Math.max(1, Math.ceil(s / c));
			for (let e = 1; e <= l; e += 1) {
				let t = e / l, s = n.x + (r.x - n.x) * t, c = n.y + (r.y - n.y) * t;
				i(this.#e, this.width, this.height, s, c, o, a);
			}
		}
		this.#i();
	}
	clear() {
		this.#e = new Uint8ClampedArray(this.width * this.height).fill(0), this.#i();
	}
	undo() {
		this.can_undo() && (--this.#n, this.#e = this.#r(this.#n).slice());
	}
	redo() {
		this.can_redo() && (this.#n += 1, this.#e = this.#r(this.#n).slice());
	}
	#r(e) {
		let t = this.#t[e];
		if (t === void 0) throw RangeError(`No mask history entry at index ${String(e)}`);
		return t;
	}
	#i() {
		this.#t = [...this.#t.slice(0, this.#n + 1), this.#e.slice()], this.#t.length > 20 && (this.#t = this.#t.slice(this.#t.length - 20)), this.#n = this.#t.length - 1;
	}
	export_binary_mask() {
		return this.#e.slice();
	}
	export_feathered_mask(e) {
		if (e <= 0) return this.export_binary_mask();
		let t = this.#e, n = new Uint8ClampedArray(t.length), r = Math.ceil(e);
		for (let i = 0; i < this.height; i += 1) for (let a = 0; a < this.width; a += 1) {
			let o = i * this.width + a;
			if (t[o] === 255) {
				n[o] = 255;
				continue;
			}
			let s = Infinity;
			for (let e = -r; e <= r; e += 1) {
				let n = i + e;
				if (!(n < 0 || n >= this.height)) for (let i = -r; i <= r; i += 1) {
					let r = a + i;
					if (r < 0 || r >= this.width || t[n * this.width + r] !== 255) continue;
					let o = Math.hypot(i, e);
					o < s && (s = o);
				}
			}
			n[o] = s <= e ? Math.round(255 * (1 - s / e)) : 0;
		}
		return n;
	}
	export_grid_aligned_mask(e = 8) {
		n(e, "grid_size");
		let t = this.#e, r = new Uint8ClampedArray(t.length);
		for (let n = 0; n < this.height; n += e) for (let i = 0; i < this.width; i += e) {
			let a = !1, o = Math.min(n + e, this.height), s = Math.min(i + e, this.width);
			for (let e = n; e < o && !a; e += 1) for (let n = i; n < s; n += 1) if (t[e * this.width + n] === 255) {
				a = !0;
				break;
			}
			if (a) for (let e = n; e < o; e += 1) for (let t = i; t < s; t += 1) r[e * this.width + t] = 255;
		}
		return r;
	}
};
function o(t) {
	return {
		provider_id: "novelai",
		action: "infill",
		request_id: t.request_id,
		generation_anchor: t.generation_anchor,
		prompt: t.positive_prompt,
		...t.negative_prompt === void 0 ? {} : { negative_prompt: t.negative_prompt },
		output_count: 1,
		...e(t.model_id ?? "nai-diffusion-5-curated"),
		width: t.width,
		height: t.height,
		...t.seed === void 0 ? {} : { seed: t.seed },
		image_asset_id: t.image_asset_id,
		mask_asset_id: t.mask_asset_id,
		inpaint_strength: t.strength
	};
}
//#endregion
export { o as n, r, a as t };
