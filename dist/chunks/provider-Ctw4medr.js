import { _ as e, c as t, h as n, i as r, m as i, o as a, p as o, r as s, t as c, u as l, y as u } from "./schemas-DMBLWk59.js";
import { i as d, o as f, t as p } from "./ids-stC4fUL8.js";
import { r as m } from "./generation-D3I1cvL5.js";
import { a as h, d as g, f as _, l as v, p as y } from "./novelai-Ckd0H4Ml.js";
//#region ../../packages/contracts/src/providers/comfyui.ts
var b = e([
	n().max(4e3),
	l(),
	r()
]), x = o(_, b).check((e) => {
	Object.keys(e.value).length > 64 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "placeholder_values must contain at most 64 entries"
	});
}), S = o(_, p).check((e) => {
	Object.keys(e.value).length > 16 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "input_asset_bindings must contain at most 16 entries"
	});
}), C = i({
	provider_id: t("comfyui"),
	...v,
	workflow_id: p,
	placeholder_values: x,
	input_asset_bindings: S,
	output_node_ids: s(_).min(1).max(16),
	seed: y.optional()
}).check((e) => {
	new Set(e.value.output_node_ids).size !== e.value.output_node_ids.length && e.issues.push({
		code: "custom",
		input: e.value.output_node_ids,
		message: "output_node_ids must not contain duplicates",
		path: ["output_node_ids"]
	});
}), w = i({
	provider_id: t("google_image"),
	...v,
	model_id: c([
		"gemini-2.5-flash-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-image",
		"gemini-3.1-flash-image"
	]),
	reference_asset_ids: s(p).max(14),
	aspect_ratio: c([
		"1:1",
		"2:3",
		"3:2",
		"3:4",
		"4:3",
		"4:5",
		"5:4",
		"9:16",
		"16:9",
		"21:9"
	]),
	image_size: c([
		"1K",
		"2K",
		"4K"
	]),
	output_mime_type: c([
		"image/png",
		"image/jpeg",
		"image/webp"
	])
}), T = i({
	provider_id: t("openai_image"),
	...v,
	mode: c(["generate", "edit"]),
	model_id: c([
		"gpt-image-1",
		"gpt-image-1-mini",
		"gpt-image-1.5",
		"gpt-image-2",
		"gpt-image-2-2026-04-21",
		"chatgpt-image-latest"
	]),
	size: c([
		"auto",
		"1024x1024",
		"1536x1024",
		"1024x1536"
	]),
	quality: c([
		"auto",
		"low",
		"medium",
		"high"
	]),
	background: c([
		"auto",
		"opaque",
		"transparent"
	]),
	output_format: c([
		"png",
		"jpeg",
		"webp"
	]),
	compression: l().int().min(0).max(100).optional(),
	input_asset_ids: s(p).max(16),
	mask_asset_id: p.optional()
}).check((e) => {
	e.value.mode === "edit" && e.value.input_asset_ids.length === 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "edit mode requires at least one input asset",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.input_asset_ids.length > 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_ids,
		message: "generate mode does not accept input assets",
		path: ["input_asset_ids"]
	}), e.value.mode === "generate" && e.value.mask_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.mask_asset_id,
		message: "generate mode does not accept a mask asset",
		path: ["mask_asset_id"]
	}), e.value.output_format === "png" && e.value.compression !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.compression,
		message: "compression applies only to jpeg and webp output",
		path: ["compression"]
	});
}), E = i({
	scale: l().min(1).max(4),
	upscaler_id: _,
	steps: l().int().min(1).max(150),
	denoise_strength: l().min(0).max(1)
}), D = i({
	model_id: _,
	prompt: n().trim().max(4e3).optional(),
	negative_prompt: n().trim().max(4e3).optional(),
	confidence: l().min(0).max(1).optional(),
	mask_blur: l().int().min(0).max(64).optional(),
	denoise_strength: l().min(0).max(1).optional()
}), O = i({
	asset_id: p,
	model_id: _,
	module: _,
	weight: l().min(0).max(2),
	guidance_start: l().min(0).max(1),
	guidance_end: l().min(0).max(1),
	control_mode: c([
		"balanced",
		"prompt",
		"control"
	]).optional(),
	resize_mode: c([
		"resize",
		"crop_and_resize",
		"resize_and_fill"
	]).optional()
}).check((e) => {
	e.value.guidance_start > e.value.guidance_end && e.issues.push({
		code: "custom",
		input: e.value,
		message: "guidance_start must not exceed guidance_end",
		path: ["guidance_start"]
	});
}), k = i({
	lora_id: _,
	weight: l().min(-2).max(2)
}), A = i({
	provider_id: t("sd_webui"),
	...v,
	mode: c(["txt2img", "img2img"]),
	model_id: _,
	vae_id: _.optional(),
	sampler: _,
	scheduler: _,
	width: g,
	height: g,
	steps: l().int().min(1).max(150),
	cfg_scale: l().min(0).max(30),
	seed: y.optional(),
	input_asset_id: p.optional(),
	denoise_strength: l().min(0).max(1).optional(),
	hires_fix: E.optional(),
	adetailer: s(D).max(4).optional(),
	controlnet: s(O).max(4).optional(),
	lora_tokens: s(k).max(16).optional()
}).check((e) => {
	let t = e.value.mode === "img2img";
	t && e.value.hires_fix !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.hires_fix,
		message: "img2img does not accept hires_fix",
		path: ["hires_fix"]
	}), t && e.value.input_asset_id === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires input_asset_id",
		path: ["input_asset_id"]
	}), t && e.value.denoise_strength === void 0 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "img2img requires denoise_strength",
		path: ["denoise_strength"]
	}), !t && e.value.input_asset_id !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.input_asset_id,
		message: "txt2img does not accept input_asset_id",
		path: ["input_asset_id"]
	}), !t && e.value.denoise_strength !== void 0 && e.issues.push({
		code: "custom",
		input: e.value.denoise_strength,
		message: "txt2img does not accept denoise_strength",
		path: ["denoise_strength"]
	});
}), j = c([
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
]), M = "provider_api_key";
function N(e, t) {
	return f.parse(`tavern_canvas:${e}:${t}:${M}`);
}
var P = c([
	"text_to_image",
	"image_to_image",
	"reference_image",
	"progress",
	"cancel",
	"seed",
	"workflow",
	"streaming_result"
]), F = c([
	"auth_failed",
	"rate_limited",
	"content_blocked",
	"invalid_request",
	"provider_unavailable",
	"timed_out",
	"cancelled",
	"malformed_response"
]), I = i({
	code: F,
	retryable: r(),
	retry_after_ms: l().int().nonnegative().optional(),
	status_code: l().int().min(100).max(599).optional()
});
i({
	provider_id: j,
	...v
});
var L = a("provider_id", [
	A,
	h,
	C,
	T,
	w
]), R = i({
	asset_id: p,
	media_type: c([
		"image/png",
		"image/jpeg",
		"image/webp",
		"video/mp4"
	]),
	byte_length: l().int().positive().max(1e8),
	sha256: m,
	width: l().int().positive().optional(),
	height: l().int().positive().optional(),
	duration_ms: l().int().positive().optional(),
	persisted_url: u().optional()
}), z = i({
	request_id: d,
	provider_id: j,
	assets: s(R).min(1).max(4),
	seed: y.optional()
});
//#endregion
export { I as a, A as c, C as d, F as i, T as l, z as n, j as o, P as r, N as s, L as t, w as u };
