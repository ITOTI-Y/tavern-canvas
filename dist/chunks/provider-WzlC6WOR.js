import { S as e, b as t, f as n, g as r, i, l as a, m as o, o as s, s as c, t as l, u, v as d, w as f, y as p } from "./ids-DjWg1HG8.js";
import { r as m } from "./generation-CPQjBKML.js";
import { a as h, d as g, f as _, l as v, p as y } from "./novelai-cCZ4kJg6.js";
//#region ../../packages/contracts/src/providers/comfyui.ts
var b = e([
	t().max(4e3),
	r(),
	u()
]), x = d(_, b).check((e) => {
	Object.keys(e.value).length > 64 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "placeholder_values must contain at most 64 entries"
	});
}), S = d(_, l).check((e) => {
	Object.keys(e.value).length > 16 && e.issues.push({
		code: "custom",
		input: e.value,
		message: "input_asset_bindings must contain at most 16 entries"
	});
}), C = p({
	provider_id: o("comfyui"),
	...v,
	workflow_id: l,
	placeholder_values: x,
	input_asset_bindings: S,
	output_node_ids: a(_).min(1).max(16),
	seed: y.optional()
}).check((e) => {
	new Set(e.value.output_node_ids).size !== e.value.output_node_ids.length && e.issues.push({
		code: "custom",
		input: e.value.output_node_ids,
		message: "output_node_ids must not contain duplicates",
		path: ["output_node_ids"]
	});
}), w = p({
	provider_id: o("google_image"),
	...v,
	model_id: c([
		"gemini-2.5-flash-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-image",
		"gemini-3.1-flash-image"
	]),
	reference_asset_ids: a(l).max(14),
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
}), T = p({
	provider_id: o("openai_image"),
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
	compression: r().int().min(0).max(100).optional(),
	input_asset_ids: a(l).max(16),
	mask_asset_id: l.optional()
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
}), E = p({
	scale: r().min(1).max(4),
	upscaler_id: _,
	steps: r().int().min(1).max(150),
	denoise_strength: r().min(0).max(1)
}), D = p({
	model_id: _,
	prompt: t().trim().max(4e3).optional(),
	negative_prompt: t().trim().max(4e3).optional(),
	confidence: r().min(0).max(1).optional(),
	mask_blur: r().int().min(0).max(64).optional(),
	denoise_strength: r().min(0).max(1).optional()
}), O = p({
	asset_id: l,
	model_id: _,
	module: _,
	weight: r().min(0).max(2),
	guidance_start: r().min(0).max(1),
	guidance_end: r().min(0).max(1),
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
}), k = p({
	lora_id: _,
	weight: r().min(-2).max(2)
}), A = p({
	provider_id: o("sd_webui"),
	...v,
	mode: c(["txt2img", "img2img"]),
	model_id: _,
	vae_id: _.optional(),
	sampler: _,
	scheduler: _,
	width: g,
	height: g,
	steps: r().int().min(1).max(150),
	cfg_scale: r().min(0).max(30),
	seed: y.optional(),
	input_asset_id: l.optional(),
	denoise_strength: r().min(0).max(1).optional(),
	hires_fix: E.optional(),
	adetailer: a(D).max(4).optional(),
	controlnet: a(O).max(4).optional(),
	lora_tokens: a(k).max(16).optional()
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
	return s.parse(`tavern_canvas:${e}:${t}:${M}`);
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
]), I = p({
	code: F,
	retryable: u(),
	retry_after_ms: r().int().nonnegative().optional(),
	status_code: r().int().min(100).max(599).optional()
});
p({
	provider_id: j,
	...v
});
var L = n("provider_id", [
	A,
	h,
	C,
	T,
	w
]), R = p({
	asset_id: l,
	media_type: c([
		"image/png",
		"image/jpeg",
		"image/webp",
		"video/mp4"
	]),
	byte_length: r().int().positive().max(1e8),
	sha256: m,
	width: r().int().positive().optional(),
	height: r().int().positive().optional(),
	duration_ms: r().int().positive().optional(),
	persisted_url: f().optional()
}), z = p({
	request_id: i,
	provider_id: j,
	assets: a(R).min(1).max(4),
	seed: y.optional()
});
//#endregion
export { I as a, A as c, C as d, F as i, T as l, z as n, j as o, P as r, N as s, L as t, w as u };
