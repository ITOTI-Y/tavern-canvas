import { b as e, c as t, g as n, h as r, i, o as a, r as o, t as s, u as c } from "./schemas-BjkyCQYG.js";
import { i as l, o as u, t as d } from "./ids-pPJWL4BL.js";
import { n as f } from "./generation-CxBPzqgd.js";
import { a as p, i as m, r as h, t as g } from "./common-C4qkl4E0.js";
import { n as _ } from "./comfyui-DKuS9w2U.js";
import { a as v } from "./novelai-CAMu2SDf.js";
//#region ../../packages/contracts/src/providers/google_image.ts
var y = r({
	provider_id: t("google_image"),
	...g,
	model_id: s([
		"gemini-2.5-flash-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-image",
		"gemini-3.1-flash-image"
	]),
	reference_asset_ids: o(d).max(14),
	aspect_ratio: s([
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
	image_size: s([
		"1K",
		"2K",
		"4K"
	]),
	output_mime_type: s([
		"image/png",
		"image/jpeg",
		"image/webp"
	])
}), b = r({
	provider_id: t("openai_image"),
	...g,
	mode: s(["generate", "edit"]),
	model_id: s([
		"gpt-image-1",
		"gpt-image-1-mini",
		"gpt-image-1.5",
		"gpt-image-2",
		"gpt-image-2-2026-04-21",
		"chatgpt-image-latest"
	]),
	size: s([
		"auto",
		"1024x1024",
		"1536x1024",
		"1024x1536"
	]),
	quality: s([
		"auto",
		"low",
		"medium",
		"high"
	]),
	background: s([
		"auto",
		"opaque",
		"transparent"
	]),
	output_format: s([
		"png",
		"jpeg",
		"webp"
	]),
	compression: c().int().min(0).max(100).optional(),
	input_asset_ids: o(d).max(16),
	mask_asset_id: d.optional()
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
}), x = r({
	scale: c().min(1).max(4),
	upscaler_id: m,
	steps: c().int().min(1).max(150),
	denoise_strength: c().min(0).max(1)
}), S = r({
	model_id: m,
	prompt: n().trim().max(4e3).optional(),
	negative_prompt: n().trim().max(4e3).optional(),
	confidence: c().min(0).max(1).optional(),
	mask_blur: c().int().min(0).max(64).optional(),
	denoise_strength: c().min(0).max(1).optional()
}), C = r({
	asset_id: d,
	model_id: m,
	module: m,
	weight: c().min(0).max(2),
	guidance_start: c().min(0).max(1),
	guidance_end: c().min(0).max(1),
	control_mode: s([
		"balanced",
		"prompt",
		"control"
	]).optional(),
	resize_mode: s([
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
}), w = r({
	lora_id: m,
	weight: c().min(-2).max(2)
}), T = r({
	provider_id: t("sd_webui"),
	...g,
	mode: s(["txt2img", "img2img"]),
	model_id: m,
	vae_id: m.optional(),
	sampler: m,
	scheduler: m,
	width: h,
	height: h,
	steps: c().int().min(1).max(150),
	cfg_scale: c().min(0).max(30),
	seed: p.optional(),
	input_asset_id: d.optional(),
	denoise_strength: c().min(0).max(1).optional(),
	hires_fix: x.optional(),
	adetailer: o(S).max(4).optional(),
	controlnet: o(C).max(4).optional(),
	lora_tokens: o(w).max(16).optional()
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
}), E = s([
	"sd_webui",
	"novelai",
	"comfyui",
	"openai_image",
	"google_image"
]), D = "provider_api_key";
function O(e, t) {
	return u.parse(`tavern_canvas:${e}:${t}:${D}`);
}
s([
	"text_to_image",
	"image_to_image",
	"reference_image",
	"progress",
	"cancel",
	"seed",
	"workflow",
	"streaming_result"
]);
var k = s([
	"auth_failed",
	"rate_limited",
	"content_blocked",
	"invalid_request",
	"provider_unavailable",
	"timed_out",
	"cancelled",
	"malformed_response",
	"not_configured",
	"storage_failed",
	"interrupted"
]), A = r({
	code: k,
	retryable: i(),
	retry_after_ms: c().int().nonnegative().optional(),
	status_code: c().int().min(100).max(599).optional()
});
r({
	provider_id: E,
	...g
}), a("provider_id", [
	T,
	v,
	_,
	b,
	y
]);
var j = r({
	asset_id: d,
	media_type: s([
		"image/png",
		"image/jpeg",
		"image/webp",
		"video/mp4"
	]),
	byte_length: c().int().positive().max(1e8),
	sha256: f,
	width: c().int().positive().optional(),
	height: c().int().positive().optional(),
	duration_ms: c().int().positive().optional(),
	persisted_url: e().optional()
}), M = r({
	request_id: l,
	provider_id: E,
	assets: o(j).min(1).max(4),
	seed: p.optional()
});
//#endregion
export { O as a, y as c, E as i, k as n, T as o, A as r, b as s, M as t };
