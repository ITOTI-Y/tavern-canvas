//#region ../../packages/contracts/src/providers/novelai_prompt_presets.ts
var e = {
	heavy: "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]",
	light: "lowres, jpeg artifacts, worst quality, watermark, blurry, very displeasing",
	human_focus: "lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], bad anatomy, bad hands, @_@, mismatched pupils, heart-shaped pupils, glowing eyes",
	none: "lowres"
}, t = {
	heavy: "{{worst quality}}, [displeasing], {unusual pupils}, guide lines, {{unfinished}}, {bad}, url, artist name, {{tall image}}, mosaic, {sketch page}, comic panel, impact (font), [dated], {logo}, ych, {what}, {where is your god now}, {distorted text}, repeated text, {floating head}, {1994}, {widescreen}, absolutely everyone, sequence, {compression artifacts}, hard translated, {cropped}, {commissioner name}, unknown text, high contrast",
	light: "{worst quality}, guide lines, unfinished, bad, url, tall image, widescreen, compression artifacts, unknown text",
	none: "lowres"
}, n = {
	heavy: "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, logo, dated, signature, multiple views, gigantic breasts, white blank page, blank page",
	light: "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, logo, dated, signature, white blank page, blank page",
	none: ""
}, r = {
	heavy: "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, white blank page, blank page",
	light: "blurry, lowres, error, worst quality, bad quality, jpeg artifacts, very displeasing, white blank page, blank page",
	none: ""
}, i = {
	heavy: "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, negative space, blank page",
	light: "blurry, lowres, upscaled, artistic error, scan artifacts, jpeg artifacts, logo, too many watermarks, negative space, blank page",
	human_focus: "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, bad anatomy, bad hands, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, @_@, mismatched pupils, glowing eyes, negative space, blank page",
	none: ""
}, a = "{worst quality}, distracting watermark, unfinished, bad quality, {widescreen}, upscale, {sequence}, {{grandfathered content}}, blurred foreground, chromatic aberration, sketch, everyone, [sketch background], simple, [flat colors], ych (character), outline, multiple scenes, [[horror (theme)]], comic", o = "lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page", s = {
	heavy: o,
	light: "lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page",
	furry_focus: a,
	human_focus: `${o}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
	none: ""
}, c = {
	heavy: o,
	light: "lowres, bad hands, bad anatomy, artistic error, sepia, white haze, worst quality, very displeasing, jpeg artifacts, 0::ai-generated::",
	furry_focus: a,
	human_focus: `${o}, @_@, mismatched pupils, glowing eyes, bad anatomy`,
	none: ""
}, l = {
	v3: {
		quality: { standard: "best quality, amazing quality, very aesthetic, absurdres" },
		undesired_content: e
	},
	furry_v3: {
		quality: { standard: "{best quality}, {amazing quality}" },
		undesired_content: t
	},
	v4_curated: {
		quality: { standard: "rating:general, best quality, very aesthetic, absurdres" },
		undesired_content: n
	},
	v4_full: {
		quality: { standard: "no text, best quality, very aesthetic, absurdres" },
		undesired_content: r
	},
	v4_5_curated: {
		quality: { standard: "very aesthetic, masterpiece, no text, -0.8::feet::, rating:general" },
		undesired_content: i
	},
	v4_5_full: {
		quality: { standard: "very aesthetic, masterpiece, no text" },
		undesired_content: s
	},
	v5: {
		quality: {
			standard: "very aesthetic, masterpiece, no text",
			light: "very aesthetic, amazing quality, no text"
		},
		undesired_content: c
	}
};
//#endregion
export { l as t };
