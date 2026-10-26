import { d as e, f as t, p as n } from "./provider-ChWi4KfU.js";
import { C as r, _ as i, b as a, g as o, l as s, m as c, s as l, u, v as d, w as f, x as p, y as m } from "./ids-CQF5rr2J.js";
import { i as h } from "./settings-CBjQWJ8F.js";
import { E as g, S as _, T as v, d as y, g as ee, j as b, x as te } from "./job_repository-BCVJs26r.js";
import { a as x, d as S, l as ne } from "./business_repositories-Cv2ukFwX.js";
import { i as re, n as ie, r as ae, t as oe } from "./migration_journal-DJrA1Suw.js";
//#region ../../tools/v2_migration/src/conversion_result.ts
function C(e, t) {
	return `${e}:${t}`;
}
function w(e, t) {
	return {
		schema_version: 1,
		id: t,
		namespace: e.namespace,
		record_key: C(e.namespace, t),
		created_at: e.migrated_at,
		updated_at: e.migrated_at
	};
}
var se = a({
	schema_version: c(1),
	id: g,
	namespace: ee,
	record_key: p().min(1),
	created_at: v,
	updated_at: v
});
//#endregion
//#region ../../tools/v2_migration/src/inventory.ts
function ce(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function le(e, t = []) {
	if (!ce(e)) return [];
	let n = [];
	for (let r of Object.keys(e)) {
		let i = [...t, r];
		n.push({
			segments: i,
			path: i.join(".")
		}), n.push(...le(e[r], i));
	}
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/path_rules.ts
function ue(e, t) {
	let n = e.split("."), r = n.at(-1) === "**", i = r ? n.slice(0, -1) : n;
	if (!(r ? t.length >= i.length : t.length === i.length)) return null;
	let a = 0;
	for (let [e, n] of i.entries()) {
		if (n === "*") {
			a += 1;
			continue;
		}
		if (n !== t[e]) return null;
		a += 2;
	}
	return a;
}
function T(e, t) {
	let n;
	for (let r of t) {
		let t = ue(r.pattern, e);
		t !== null && (n === void 0 || t > n.score) && (n = {
			rule: r,
			score: t
		});
	}
	return n?.rule;
}
//#endregion
//#region ../../tools/v2_migration/src/settings_path_registry.ts
function de(e, t) {
	return {
		pattern: e,
		classification: "mapped",
		converter: t
	};
}
var fe = [
	["theme_id", "settings_converter"],
	["themes.**", "settings_converter"],
	["generate_btn_style", "settings_converter"],
	["image_frame_style", "settings_converter"],
	["collapse_style", "settings_converter"],
	["scriptEnabled", "settings_converter"],
	["helpTipsEnabled", "settings_converter"],
	["newlineFixEnabled", "settings_converter"],
	["aiAutonomousResolution", "settings_converter"],
	["addFurryDataset", "settings_converter"],
	["cache", "settings_converter"],
	["startTag", "settings_converter"],
	["endTag", "settings_converter"],
	["zidongdianji", "settings_converter"],
	["zidongdianji2", "settings_converter"],
	["longPressToEdit", "settings_converter"],
	["clickToPreview", "settings_converter"],
	["dbclike", "settings_converter"],
	["collapseImage", "settings_converter"],
	["cloudQueueGreeting", "settings_converter"],
	["showQueueGreeting", "settings_converter"],
	["displayMode", "settings_converter"],
	["heavyFrontendMode", "settings_converter"],
	["insertOriginalText", "settings_converter"],
	["tagthinkEcho", "settings_converter"],
	["historyKeepImageTag", "settings_converter"],
	["enablePregen", "settings_converter"],
	["autoLLMImageGen", "settings_converter"],
	["imageAlignment", "settings_converter"],
	["imageSizeScale", "settings_converter"],
	["imageGenInterval", "settings_converter"],
	["chatu8_code", "settings_converter"],
	["asr", "settings_converter"],
	["asr.enabled", "settings_converter"],
	["asr.asrServerUrl", "settings_converter"],
	["asr.mode", "settings_converter"],
	["asr.silenceTimeout", "settings_converter"],
	["asr.vadThreshold", "settings_converter"],
	["asr.maxKeepDuration", "settings_converter"],
	["asr.language", "settings_converter"],
	["asr.appendMode", "settings_converter"],
	["asr.autoSend", "settings_converter"],
	["asr.conversationMode", "settings_converter"],
	["imageGenStats", "settings_converter"],
	["imageGenStats.backends", "settings_converter"],
	["imageGenStats.backends.*", "settings_converter"],
	["imageGenStats.backends.*.success", "settings_converter"],
	["imageGenStats.backends.*.fail", "settings_converter"],
	["imageGenStats.total", "settings_converter"],
	["imageGenStats.total.success", "settings_converter"],
	["imageGenStats.total.fail", "settings_converter"],
	["imageGenStats.firstGenTime", "settings_converter"],
	["imageGenStats.lastGenTime", "settings_converter"],
	["imageGenStats.daily.**", "settings_converter"],
	["fabThemes.**", "settings_converter"],
	["chatu8_fab_theme", "settings_converter"],
	["enable_chatu8_fab", "settings_converter"],
	["enable_chatu8_desktop_pet", "settings_converter"],
	["chatu8_fab_bg_color", "settings_converter"],
	["chatu8_fab_icon_color", "settings_converter"],
	["chatu8_fab_opacity", "settings_converter"],
	["chatu8_fab_size", "settings_converter"],
	["chatu8_fab_size.desktop", "settings_converter"],
	["chatu8_fab_size.mobile", "settings_converter"],
	["chatu8_fab_position", "settings_converter"],
	["chatu8_fab_position.desktop", "settings_converter"],
	["chatu8_fab_position.desktop.top", "settings_converter"],
	["chatu8_fab_position.desktop.left", "settings_converter"],
	["chatu8_fab_position.mobile", "settings_converter"],
	["chatu8_fab_position.mobile.top", "settings_converter"],
	["chatu8_fab_position.mobile.left", "settings_converter"],
	["vocabulary_search_startswith", "settings_converter"],
	["vocabulary_search_limit", "settings_converter"],
	["vocabulary_search_sort", "settings_converter"],
	["jiuguanchucun", "settings_converter"],
	["convertToJpegStorage", "settings_converter"],
	["gestureEnabled", "settings_converter"],
	["clickTriggerEnabled", "settings_converter"],
	["gesture1", "settings_converter"],
	["gesture2", "settings_converter"],
	["gestureShowRecognition", "settings_converter"],
	["gestureShowTrail", "settings_converter"],
	["gestureTrailColor", "settings_converter"],
	["gestureMatchThreshold", "settings_converter"],
	["regexTestMode", "settings_converter"],
	["mode", "provider_converter"],
	["client", "provider_converter"],
	["sdUrl", "provider_converter"],
	["comfyuiUrl", "provider_converter"],
	["nai3Scale", "provider_converter"],
	["sdCfgScale", "provider_converter"],
	["sm", "provider_converter"],
	["dyn", "provider_converter"],
	["cfg_rescale", "provider_converter"],
	["sd_csteps", "provider_converter"],
	["sd_cwidth", "provider_converter"],
	["sd_cheight", "provider_converter"],
	["sd_cseed", "provider_converter"],
	["novelai_steps", "provider_converter"],
	["novelai_width", "provider_converter"],
	["novelai_height", "provider_converter"],
	["novelai_seed", "provider_converter"],
	["comfyui_steps", "provider_converter"],
	["comfyui_width", "provider_converter"],
	["comfyui_height", "provider_converter"],
	["comfyui_seed", "provider_converter"],
	["cfg_comfyui", "provider_converter"],
	["sd_cchatu_8_model", "provider_converter"],
	["sd_cchatu_8_vae", "provider_converter"],
	["sd_cchatu_8_scheduler", "provider_converter"],
	["sd_cchatu_8_upscaler", "provider_converter"],
	["sd_cupscale_factor", "provider_converter"],
	["sd_chires_fix", "provider_converter"],
	["sd_chires_steps", "provider_converter"],
	["sd_cdenoising_strength", "provider_converter"],
	["sd_cclip_skip", "provider_converter"],
	["sd_cadetailer", "provider_converter"],
	["restoreFaces", "provider_converter"],
	["sd_cchatu_8_samplerName", "provider_converter"],
	["comfyuisamplerName", "provider_converter"],
	["comfyuiCLIPName", "provider_converter"],
	["comfyui_scheduler", "provider_converter"],
	["comfyui_vae", "provider_converter"],
	["novelai_sampler", "provider_converter"],
	["nai3StylePerception", "provider_converter"],
	["nai3Deceisp", "provider_converter"],
	["nai3Variety", "provider_converter"],
	["Schedule", "provider_converter"],
	["MODEL_NAME", "provider_converter"],
	["c_fenwei", "provider_converter"],
	["c_xijie", "provider_converter"],
	["c_idquanzhong", "provider_converter"],
	["c_quanzhong", "provider_converter"],
	["ipa", "provider_converter"],
	["novelaimode", "provider_converter"],
	["novelaisite", "provider_converter"],
	["novelaiOtherSite", "provider_converter"],
	["enableCloudQueue", "provider_converter"],
	["cloudQueueUrl", "provider_converter"],
	["novelai_profiles.**", "provider_converter"],
	["novelai_profile_id", "provider_converter"],
	["comfyui_profiles.**", "provider_converter"],
	["comfyui_profile_id", "provider_converter"],
	["banana", "provider_converter"],
	["banana.apiUrl", "provider_converter"],
	["banana.model", "provider_converter"],
	["banana.editModel", "provider_converter"],
	["banana.videoModel", "provider_converter"],
	["banana.aspectRatio", "provider_converter"],
	["banana.imageSize", "provider_converter"],
	["banana.useGrokFormat", "provider_converter"],
	["banana.conversationPresetId", "provider_converter"],
	["banana.editPresetId", "provider_converter"],
	["banana.videoPresetId", "provider_converter"],
	["banana.conversationPresets.**", "provider_converter"],
	["banana.prompt_replace.**", "provider_converter"],
	["banana.prompt_replace_id", "provider_converter"],
	["bananaCharacterPresets.**", "provider_converter"],
	["bananaCharacterPresetId", "provider_converter"],
	["ai_temperature", "provider_converter"],
	["ai_top_p", "provider_converter"],
	["ai_presence_penalty", "provider_converter"],
	["ai_frequency_penalty", "provider_converter"],
	["ai_stream", "provider_converter"],
	["ai_private", "provider_converter"],
	["chatu8_ai_assistant", "provider_converter"],
	["chatu8_ai_assistant.api_url", "provider_converter"],
	["chatu8_ai_assistant.model", "provider_converter"],
	["chatu8_ai_assistant.bypass_proxy", "provider_converter"],
	["chatu8_ai_assistant.stream", "provider_converter"],
	["chatu8_ai_assistant.system_prompt", "provider_converter"],
	["llm_history_depth", "provider_converter"],
	["llm_profiles.**", "provider_converter"],
	["current_llm_profile", "provider_converter"],
	["llm_request_type_profiles.**", "provider_converter"],
	["current_llm_request_type_profile", "provider_converter"],
	["llm_request_type_configs", "provider_converter"],
	["llm_request_type_configs.*", "provider_converter"],
	["llm_request_type_configs.*.api_profile", "provider_converter"],
	["llm_request_type_configs.*.context_profile", "provider_converter"],
	["AI_use_coords", "provider_converter"],
	["characterAI", "prompt_converter"],
	["characterAI.model", "prompt_converter"],
	["characterAI.temperature", "prompt_converter"],
	["characterAI.systemPrompt", "prompt_converter"],
	["characterAI.lastPrompt", "prompt_converter"],
	["outfitAI", "prompt_converter"],
	["outfitAI.model", "prompt_converter"],
	["outfitAI.temperature", "prompt_converter"],
	["outfitAI.systemPrompt", "prompt_converter"],
	["outfitAI.lastPrompt", "prompt_converter"],
	["yushe.**", "prompt_converter"],
	["yusheid_sd", "prompt_converter"],
	["yusheid_novelai", "prompt_converter"],
	["yusheid_comfyui", "prompt_converter"],
	["randomYushe", "prompt_converter"],
	["prompt_replace.**", "prompt_converter"],
	["prompt_replace_id", "prompt_converter"],
	["regex_profiles.**", "prompt_converter"],
	["current_regex_profile", "prompt_converter"],
	["word_replacement_profiles.**", "prompt_converter"],
	["current_word_replacement_profile", "prompt_converter"],
	["AQT_sd", "prompt_converter"],
	["UCP_sd", "prompt_converter"],
	["AQT_novelai", "prompt_converter"],
	["UCP_novelai", "prompt_converter"],
	["AQT_comfyui", "prompt_converter"],
	["UCP_comfyui", "prompt_converter"],
	["ai_test_system", "prompt_converter"],
	["ai_test_user", "prompt_converter"],
	["ai_test_output", "prompt_converter"],
	["test_context_profiles.**", "prompt_converter"],
	["current_test_context_profile", "prompt_converter"],
	["translation_model", "prompt_converter"],
	["translation_system_prompt", "prompt_converter"],
	["defaultImageDemand", "prompt_converter"],
	["workers.**", "asset_converter"],
	["workerid", "asset_converter"],
	["worker", "asset_converter"],
	["editWorkerid", "asset_converter"],
	["editWorker", "asset_converter"],
	["weilin_lora_fix", "asset_converter"],
	["inpaint_denoise", "asset_converter"],
	["inpaint_brush_size", "asset_converter"],
	["inpaint_positive_prompt", "asset_converter"],
	["inpaint_negative_prompt", "asset_converter"],
	["vibePresets.**", "asset_converter"],
	["vibePresetId", "asset_converter"],
	["nai3VibeTransfer", "asset_converter"],
	["enableVibeGroupTransfer", "asset_converter"],
	["randomVibeGroup", "asset_converter"],
	["normalizeRefStrength", "asset_converter"],
	["nai3CharRef", "asset_converter"],
	["InformationExtracted", "asset_converter"],
	["ReferenceStrength", "asset_converter"],
	["vibeJiuguanchucun", "asset_converter"],
	["chatu8_fab_icon_image_id", "asset_converter"],
	["enable_chatu8_fab_video", "asset_converter"],
	["chatu8_fab_video_paths.**", "asset_converter"],
	["defaultCharDemand", "character_converter"],
	["personaProfiles", "character_converter"],
	["personaProfiles.presets.**", "character_converter"],
	["personaProfiles.currentPresetId", "character_converter"],
	["personaProfiles.enabled", "character_converter"],
	["personaProfiles.injectionMode", "character_converter"],
	["personaProfiles.currentUserPresetId", "character_converter"],
	["personaProfiles.userEnabled", "character_converter"],
	["personaProfiles.userInjectionMode", "character_converter"],
	["knowledgeBaseConfig", "knowledge_converter"],
	["knowledgeBaseConfig.enabled", "knowledge_converter"],
	["knowledgeBaseConfig.triggerDepth", "knowledge_converter"],
	["knowledgeBaseConfig.worldBookSelections.**", "knowledge_converter"],
	["knowledgeBaseConfig.worldEntrySelections.**", "knowledge_converter"],
	["worldBookEnabled", "knowledge_converter"],
	["worldBookList.**", "knowledge_converter"],
	["worldBookList_id", "knowledge_converter"],
	["worldBookConfig", "knowledge_converter"],
	["worldBookConfig.worldBookSelections.**", "knowledge_converter"],
	["worldBookConfig.worldEntrySelections.**", "knowledge_converter"],
	["jiuguanStorage.**", "gallery_converter"]
], pe = [
	["st_chatu8_sd_auth", "sd_webui_auth"],
	["novelaiApi", "novelai_token"],
	["novelaiApi_id", "novelai_token"],
	["novelai_profiles.*.novelaiApi", "novelai_token"],
	["banana.apiKey", "banana_api_key"],
	["chatu8_ai_assistant.api_key", "chatu8_ai_assistant_api_key"],
	["llm_profiles.*.api_key", "llm_profile_api_key"],
	["ai_token", "legacy_ai_token"]
], E = [
	...fe.map(([e, t]) => de(e, t)),
	...pe.map(([e, t]) => ({
		pattern: e,
		classification: "deferred_secret_transfer",
		converter: "provider_converter",
		credential_kind: t
	})),
	{
		pattern: "cacheStorageMigrated",
		classification: "intentionally_obsolete",
		reason: "cache_completion_flag"
	},
	{
		pattern: "lastTab",
		classification: "intentionally_obsolete",
		reason: "old_ui_dom_state"
	}
];
//#endregion
//#region ../../tools/v2_migration/src/id_derivation.ts
function D(r) {
	return t(e(n(r)));
}
function O(n) {
	return t(e(n));
}
function me(t, r) {
	let i = new Uint8Array(r), a = 0, o = 0;
	for (; a < r;) {
		let s = e(n(`${t}::${String(o)}`)), c = Math.min(s.length, r - a);
		i.set(s.subarray(0, c), a), a += c, o += 1;
	}
	return i;
}
var k = "0123456789abcdef";
function A(e, t) {
	let n = e[t];
	if (n === void 0) throw RangeError(`Missing byte at index ${String(t)}`);
	return n;
}
function he(e) {
	return k.charAt(e >> 4) + k.charAt(e & 15);
}
function j(e) {
	let t = me(e, 16);
	t[6] = A(t, 6) & 15 | 80, t[8] = A(t, 8) & 63 | 128;
	let n = Array.from(t, he).join("");
	return `${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20, 32)}`;
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_coercion.ts
function M(e, t = !1) {
	return typeof e == "boolean" ? e : e === "true" || e !== "false" && t;
}
function N(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/payload_extraction.ts
function ge(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (r.classification !== "mapped" || r.converter !== t) continue;
		let [e] = r.pattern.split(".");
		e !== void 0 && n.add(e);
	}
	return [...n].toSorted();
}
function P(e, t, n) {
	let r = {};
	for (let i of ge(t, n)) Object.hasOwn(e, i) && (r[i] = e[i]);
	return r;
}
function _e(e, t, n) {
	if (!ce(e)) return e;
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		let e = [...t, i];
		T(e, n)?.classification !== "deferred_secret_transfer" && (r[i] = _e(a, e, n));
	}
	return r;
}
function F(e) {
	return b(e), e;
}
//#endregion
//#region ../../tools/v2_migration/src/converters/settings_converter.ts
var ve = se.extend({ payload: m(p(), f()) });
function ye(e, t) {
	let n = [
		{
			path: "locale",
			message: "v2 has no UI locale setting; defaulted to 'auto'."
		},
		{
			path: "global_concurrency",
			message: "v2 has no concurrency-limit setting; defaulted to 1."
		},
		{
			path: "active_provider_profile_id",
			message: `Unresolved; the migration runner must map v2 "mode" (${JSON.stringify(e.mode)}) to a provider_profiles id created by provider_converter.`
		},
		{
			path: "gateway",
			message: "v2 has no Gateway concept; defaulted to an unconfigured Gateway."
		},
		{
			path: "ui.color_mode",
			message: "v2's rich custom theme system (theme_id/themes/fabThemes) has no v3 color_mode equivalent; preserved verbatim in legacy_preferences instead of being mapped."
		},
		{
			path: "ui.inspector_width",
			message: "v2 has no inspector panel; defaulted to 360."
		}
	], r = h.parse({
		schema_version: 1,
		active_namespace: t.namespace,
		locale: "auto",
		credential_storage_mode: "host",
		active_provider_profile_id: null,
		global_concurrency: 1,
		auto_generation_enabled: M(e.autoLLMImageGen),
		fallback_generation_enabled: M(e.enablePregen),
		vocabulary_update_channel: "bundled",
		gateway: {
			endpoint: null,
			token_secret_id: null,
			http_acknowledgments: {}
		},
		ui: {
			color_mode: "system",
			inspector_width: 360,
			inspector_collapsed: !1,
			optional_entry_enabled: e.enable_chatu8_fab
		}
	}), i = j(`${t.namespace}:legacy_preferences:settings_converter`), a = F(P(e, E, "settings_converter"));
	return {
		settings: r,
		legacy_preferences: ve.parse({
			schema_version: 1,
			id: i,
			namespace: t.namespace,
			record_key: C(t.namespace, i),
			created_at: t.migrated_at,
			updated_at: t.migrated_at,
			payload: a
		}),
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/provider_converter.ts
function I(e, t, n, r) {
	return te.parse({
		...w(e, t),
		provider_id: n,
		payload: F(r)
	});
}
function L(e, t) {
	let n = new Set(t);
	return Object.fromEntries(Object.entries(e).filter(([e]) => !n.has(e)));
}
function R(e, t, n) {
	t.trim().length !== 0 && e.push({
		operation: "secret_transfer",
		plaintext_value: t,
		...n
	});
}
function be(e, t) {
	let n = [], r = [], i = [], a = j(`${t.namespace}:provider_converter:legacy_all`), o = _e(P(e, E, "provider_converter"), [], E);
	i.push(I(t, a, "legacy_all", o)), n.push({
		path: "mode",
		message: `v2 "mode" was ${JSON.stringify(e.mode)}; the migration runner resolves this to active_provider_profile_id.`
	});
	for (let [n, a] of Object.entries(e.novelai_profiles)) {
		let e = j(`${t.namespace}:provider_converter:novelai:${n}`);
		i.push(I(t, e, "novelai", L(a, ["novelaiApi"]))), R(r, a.novelaiApi, {
			credential_kind: "novelai_token",
			source_path: `novelai_profiles.${n}.novelaiApi`,
			provider_profile_id: e
		});
	}
	for (let [n, r] of Object.entries(e.comfyui_profiles)) {
		let e = j(`${t.namespace}:provider_converter:comfyui:${n}`);
		i.push(I(t, e, "comfyui", { ...r }));
	}
	for (let [n, a] of Object.entries(e.llm_profiles)) {
		let e = j(`${t.namespace}:provider_converter:llm:${n}`);
		i.push(I(t, e, "llm", L(a, ["api_key"]))), R(r, a.api_key, {
			credential_kind: "llm_profile_api_key",
			source_path: `llm_profiles.${n}.api_key`,
			provider_profile_id: e
		});
	}
	let s = j(`${t.namespace}:provider_converter:openai_image:banana`);
	i.push(I(t, s, "openai_image", {
		...L(e.banana, ["apiKey"]),
		character_presets: e.bananaCharacterPresets,
		character_preset_id: e.bananaCharacterPresetId
	})), n.push({
		path: "banana",
		message: "v2 \"banana\" (Banana/Grok) used an OpenAI-compatible API; remapped to provider_id \"openai_image\"."
	}), R(r, e.banana.apiKey, {
		credential_kind: "banana_api_key",
		source_path: "banana.apiKey",
		provider_profile_id: s
	});
	let c = j(`${t.namespace}:provider_converter:llm:chatu8_ai_assistant`);
	return i.push(I(t, c, "llm", L(e.chatu8_ai_assistant, ["api_key"]))), R(r, e.chatu8_ai_assistant.api_key, {
		credential_kind: "chatu8_ai_assistant_api_key",
		source_path: "chatu8_ai_assistant.api_key",
		provider_profile_id: c
	}), R(r, e.st_chatu8_sd_auth, {
		credential_kind: "sd_webui_auth",
		source_path: "st_chatu8_sd_auth",
		provider_profile_id: a
	}), R(r, e.novelaiApi, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi",
		provider_profile_id: a
	}), R(r, e.novelaiApi_id, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi_id",
		provider_profile_id: a
	}), R(r, e.ai_token, {
		credential_kind: "legacy_ai_token",
		source_path: "ai_token",
		provider_profile_id: a
	}), {
		records: i,
		warnings: n,
		secret_transfers: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/prompt_converter.ts
function z(e, t, n) {
	return _.prompt_presets.parse({
		...w(e, t),
		payload: F(n)
	});
}
function B(e, t, n) {
	return _.regex_rules.parse({
		...w(e, t),
		payload: F(n)
	});
}
function xe(e, t) {
	let n = [], r = [], i = [], a = j(`${t.namespace}:prompt_converter:legacy_all`);
	r.push(z(t, a, P(e, E, "prompt_converter")));
	for (let [n, i] of Object.entries(e.yushe)) {
		let e = j(`${t.namespace}:prompt_converter:yushe:${n}`);
		r.push(z(t, e, {
			kind: "yushe",
			name: n,
			...i
		}));
	}
	for (let [n, i] of Object.entries(e.test_context_profiles)) {
		let e = j(`${t.namespace}:prompt_converter:test_context:${n}`);
		r.push(z(t, e, {
			kind: "llm_test_context",
			name: n,
			...i
		}));
	}
	let o = j(`${t.namespace}:prompt_converter:persona_ai_defaults`);
	r.push(z(t, o, {
		kind: "llm_prompt_builder_defaults",
		characterAI: e.characterAI,
		outfitAI: e.outfitAI,
		translation_model: e.translation_model,
		translation_system_prompt: e.translation_system_prompt,
		ai_test_system: e.ai_test_system,
		ai_test_user: e.ai_test_user,
		ai_test_output: e.ai_test_output,
		defaultImageDemand: e.defaultImageDemand
	}));
	for (let [n, r] of Object.entries(e.prompt_replace)) {
		let e = j(`${t.namespace}:prompt_converter:prompt_replace:${n}`);
		i.push(B(t, e, {
			kind: "prompt_replace",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.regex_profiles)) {
		let e = j(`${t.namespace}:prompt_converter:regex_profile:${n}`);
		i.push(B(t, e, {
			kind: "regex_profile",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.word_replacement_profiles)) {
		let e = j(`${t.namespace}:prompt_converter:word_replacement:${n}`);
		i.push(B(t, e, {
			kind: "word_replacement",
			name: n,
			...r
		}));
	}
	return {
		prompt_presets: r,
		regex_rules: i,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/asset_converter.ts
function V(e, t, n) {
	return _.comfy_workflows.parse({
		...w(e, t),
		payload: F(n)
	});
}
function H(e, t, n) {
	return _.novelai_vibes.parse({
		...w(e, t),
		payload: F(n)
	});
}
function Se(e, t, n) {
	let r = [], i = [], a = [], o = [], s = j(`${n.namespace}:asset_converter:legacy_all`);
	i.push(V(n, s, P(e, E, "asset_converter")));
	for (let [t, r] of Object.entries(e.workers)) {
		let e = j(`${n.namespace}:asset_converter:workers:${t}`);
		i.push(V(n, e, {
			kind: "workflow",
			name: t,
			workflow_json: r
		}));
	}
	let c = j(`${n.namespace}:asset_converter:edit_workflow`);
	i.push(V(n, c, {
		kind: "edit_workflow",
		editWorkerid: e.editWorkerid,
		editWorker: e.editWorker
	}));
	let l = j(`${n.namespace}:asset_converter:inpaint_defaults`);
	i.push(V(n, l, {
		kind: "inpaint_lora_defaults",
		inpaint_denoise: e.inpaint_denoise,
		inpaint_brush_size: e.inpaint_brush_size,
		inpaint_positive_prompt: e.inpaint_positive_prompt,
		inpaint_negative_prompt: e.inpaint_negative_prompt,
		weilin_lora_fix: e.weilin_lora_fix
	}));
	for (let [t, r] of Object.entries(e.vibePresets)) {
		let e = j(`${n.namespace}:asset_converter:vibe:${t}`);
		a.push(H(n, e, {
			kind: "vibe_preset",
			name: t,
			...r
		}));
	}
	let u = j(`${n.namespace}:asset_converter:vibe_defaults`);
	a.push(H(n, u, {
		kind: "vibe_defaults",
		nai3VibeTransfer: e.nai3VibeTransfer,
		enableVibeGroupTransfer: e.enableVibeGroupTransfer,
		randomVibeGroup: e.randomVibeGroup,
		normalizeRefStrength: e.normalizeRefStrength,
		nai3CharRef: e.nai3CharRef,
		InformationExtracted: e.InformationExtracted,
		ReferenceStrength: e.ReferenceStrength,
		vibeJiuguanchucun: e.vibeJiuguanchucun
	}));
	for (let e of t?.config_images ?? []) {
		let t = N(e.data_base64), r = O(t), i = j(`${n.namespace}:asset_converter:config_image:${e.id}`);
		o.push(y.parse({
			...w(n, i),
			sha256: r,
			last_accessed_at: n.migrated_at,
			pinned: !0,
			payload: F({
				kind: "uploaded_configuration_image",
				legacy_id: e.id,
				byte_length: t.byteLength
			})
		}));
	}
	return t === void 0 && r.push({
		path: "chatu8_config_images.config_images",
		message: "No gallery database fixture supplied; uploaded configuration images were not converted."
	}), {
		comfy_workflows: i,
		novelai_vibes: a,
		image_records: o,
		warnings: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/character_converter.ts
function U(e, t, n) {
	return _.character_profiles.parse({
		...w(e, t),
		payload: F(n)
	});
}
function Ce(e, t) {
	let n = [], r = [], i = j(`${t.namespace}:character_converter:legacy_all`);
	r.push(U(t, i, P(e, E, "character_converter")));
	let a = e.personaProfiles?.presets ?? {};
	for (let [e, n] of Object.entries(a)) {
		let i = j(`${t.namespace}:character_converter:persona:${e}`);
		r.push(U(t, i, {
			kind: "persona_preset",
			name: e,
			...n
		}));
	}
	return e.personaProfiles === void 0 && n.push({
		path: "personaProfiles",
		message: "v2 settings did not have personaProfiles initialized; no persona presets to convert."
	}), {
		character_profiles: r,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/knowledge_converter.ts
function W(e, t, n, r) {
	return _.knowledge_entries.parse({
		...w(e, t),
		source_type: n,
		payload: F(r)
	});
}
function we(e, t) {
	let n = [], r = [], i = j(`${t.namespace}:knowledge_converter:legacy_all`);
	r.push(W(t, i, "legacy_all", P(e, E, "knowledge_converter")));
	let a = j(`${t.namespace}:knowledge_converter:knowledge_base_config`);
	r.push(W(t, a, "knowledge_base_config", e.knowledgeBaseConfig));
	for (let [n, i] of Object.entries(e.worldBookList)) {
		let a = j(`${t.namespace}:knowledge_converter:builtin_world_book:${n}`);
		r.push(W(t, a, "builtin_world_book", {
			name: n,
			enabled: e.worldBookEnabled,
			active_entry_id: e.worldBookList_id === n,
			...i
		}));
	}
	if (e.worldBookConfig !== void 0) {
		let n = j(`${t.namespace}:knowledge_converter:send_data_world_book_config`);
		r.push(W(t, n, "send_data_world_book_config", e.worldBookConfig));
	} else n.push({
		path: "worldBookConfig",
		message: "v2 settings did not have worldBookConfig initialized (send_data World Info was never opened)."
	});
	return {
		knowledge_entries: r,
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/gallery_converter.ts
var G = "manual";
function Te(e, t, n, r, i) {
	return y.parse({
		...w(e, t),
		sha256: n,
		last_accessed_at: e.migrated_at,
		pinned: !1,
		payload: {
			kind: r,
			...i
		}
	});
}
function K(e, t, n, r, i, a, o) {
	if (r.data_base64 === void 0) {
		a.push({
			path: o,
			message: `Image ${r.uuid} has no resolved bytes; the migration runner must fetch it before this record can be converted.`
		});
		return;
	}
	let s = N(r.data_base64), c = O(s);
	return Te(e, j(`${e.namespace}:gallery_converter:${t}:${r.uuid}`), c, i, {
		tag_key: n,
		legacy_uuid: r.uuid,
		...r.path === void 0 ? {} : { host_path: r.path },
		...r.thumbnail_path === void 0 ? {} : { thumbnail_host_path: r.thumbnail_path },
		is_video: r.isVideo,
		original_url: r.originalUrl,
		byte_length: s.byteLength,
		generation_parameters: r.genParams ?? null
	});
}
function Ee(e, t, n) {
	let r = [], i = [], a = [], o = [];
	for (let [t, a] of Object.entries(e.jiuguanStorage)) for (let [e, o] of a.images.entries()) {
		let a = K(n, "server", t, o, "server_metadata", r, `jiuguanStorage.${t}.images[${String(e)}]`);
		a !== void 0 && i.push(a);
	}
	for (let [e, a] of Object.entries(t?.tupianhuancun_metadata ?? {})) for (let [o, s] of a.images.entries()) {
		let a = s.data_base64 ?? (t?.tupianhuancun_blobs[s.uuid] === void 0 ? void 0 : t.tupianhuancun_blobs[s.uuid]), c = K(n, "indexeddb", e, {
			...s,
			data_base64: a
		}, "indexeddb_blob", r, `chatu8_gallery.tupianhuancun.${e}.images[${String(o)}]`);
		c !== void 0 && i.push(c);
	}
	if (t === void 0) return r.push({
		path: "chatu8_gallery",
		message: "No gallery database fixture supplied; the IndexedDB tupianhuancun/vocabulary stores were not converted."
	}), {
		image_records: i,
		vocabularies: a,
		vocabulary_groups: o,
		warnings: r
	};
	let s = t.tags.filter((e) => e.fileName === G), c = j(`${n.namespace}:gallery_converter:manual_vocabulary`);
	a.push(_.vocabularies.parse({
		...w(n, c),
		payload: {
			kind: "manual_vocabulary",
			tags: s
		}
	}));
	let l = t.groups.filter((e) => e.fileName === G), u = t.subgroups.filter((e) => e.fileName === G);
	for (let e of l) {
		let t = j(`${n.namespace}:gallery_converter:group:${e.id_index}`);
		o.push(_.vocabulary_groups.parse({
			...w(n, t),
			vocabulary_id: c,
			payload: {
				kind: "group",
				...e
			}
		}));
	}
	for (let e of u) {
		let t = j(`${n.namespace}:gallery_converter:subgroup:${e.id_index}`);
		o.push(_.vocabulary_groups.parse({
			...w(n, t),
			vocabulary_id: c,
			payload: {
				kind: "subgroup",
				...e
			}
		}));
	}
	let d = t.tags.length - s.length;
	return d > 0 && r.push({
		path: "chatu8_gallery.tags",
		message: `Skipped ${String(d)} bundled (non-manual) tag row(s); the bundled vocabulary dataset ships with the extension and is not user data.`
	}), {
		image_records: i,
		vocabularies: a,
		vocabulary_groups: o,
		warnings: r
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converter_registry.ts
function De(e) {
	let t = [], n = [];
	for (let { segments: r, path: i } of le(e)) {
		let e = T(r, E);
		e === void 0 ? n.push(i) : t.push({
			path: i,
			rule: e
		});
	}
	return {
		classified: t,
		unknown: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_schema.ts
var q = r([
	p(),
	o(),
	u()
]), Oe = a({
	fixedPrompt: p(),
	fixedPrompt_end: p(),
	negativePrompt: p()
}), ke = a({
	model: p(),
	infoExtract: o(),
	strength: o(),
	imageId: p().nullable(),
	vibeDataId: p().nullable()
}), Ae = a({
	beforeAfterRegex: p(),
	textRegex: p()
}), je = a({
	textReplacement: p(),
	aiReplacement: p()
}), J = a({ text: p() }), Me = a({
	bgColor: p(),
	iconColor: p(),
	opacity: o()
}), Ne = a({
	bgColor: p().optional(),
	textColor: p().optional(),
	accentColor: p().optional()
}), Pe = a({
	novelaiApi: p(),
	novelaisite: p(),
	novelaiOtherSite: p(),
	enableCloudQueue: p(),
	cloudQueueUrl: p(),
	cloudQueueGreeting: p(),
	showQueueGreeting: p(),
	novelaimode: p(),
	novelai_sampler: p(),
	Schedule: p(),
	nai3Scale: p(),
	cfg_rescale: p(),
	AI_use_coords: p(),
	sm: p(),
	dyn: p(),
	nai3Variety: p(),
	nai3Deceisp: p(),
	enableVibeGroupTransfer: p(),
	randomVibeGroup: p(),
	normalizeRefStrength: p(),
	novelai_width: p(),
	novelai_height: p(),
	novelai_steps: p(),
	novelai_seed: p()
}), Fe = a({
	workerid: p(),
	worker: p(),
	editWorkerid: p(),
	editWorker: p(),
	comfyuiUrl: p(),
	MODEL_NAME: p(),
	comfyuisamplerName: p(),
	comfyui_vae: p(),
	comfyui_scheduler: p(),
	comfyuiCLIPName: p(),
	comfyui_width: p(),
	comfyui_height: p(),
	comfyui_steps: p(),
	comfyui_seed: p(),
	cfg_comfyui: p()
}), Ie = a({
	api_url: p(),
	api_key: p(),
	model: p(),
	temperature: o(),
	top_p: o(),
	max_tokens: o(),
	stream: u(),
	bypass_proxy: u()
}), Y = a({
	api_profile: p(),
	context_profile: p()
}), X = {
	api_profile: "",
	context_profile: ""
}, Z = a({
	image_gen: Y,
	char_design: Y,
	char_display: Y,
	char_modify: Y,
	translation: Y,
	tag_modify: Y,
	ai_assistant: Y,
	persona_gen: Y,
	user_persona_gen: Y,
	chat_summary: Y
}), Le = {
	image_gen: X,
	char_design: X,
	char_display: X,
	char_modify: X,
	translation: X,
	tag_modify: X,
	ai_assistant: X,
	persona_gen: X,
	user_persona_gen: X,
	chat_summary: X
}, Re = a({
	id: p(),
	name: p(),
	role: l([
		"system",
		"user",
		"assistant"
	]),
	content: p(),
	enabled: u(),
	triggerMode: l(["always", "trigger"]),
	triggerWords: p(),
	andTriggerWords: p()
}), ze = a({ entries: s(Re) }), Q = a({
	user: a({
		text: p(),
		image: p()
	}),
	model: a({
		text: p(),
		image: p()
	})
}), Be = a({
	fixedPrompt: p(),
	postfixPrompt: p(),
	conversation: s(Q)
}), Ve = a({
	triggers: p(),
	conversation: Q
}), He = a({
	apiKey: p(),
	apiUrl: p(),
	model: p(),
	editModel: p(),
	videoModel: p(),
	aspectRatio: p(),
	imageSize: p(),
	useGrokFormat: p(),
	conversationPresetId: p(),
	editPresetId: p(),
	videoPresetId: p(),
	conversationPresets: m(p(), Be),
	prompt_replace: m(p(), J),
	prompt_replace_id: p()
}), Ue = {
	apiKey: "123456",
	apiUrl: "http://localhost:8008",
	model: "",
	editModel: "",
	videoModel: "",
	aspectRatio: "1:1",
	imageSize: "1024x1024",
	useGrokFormat: "false",
	conversationPresetId: "",
	editPresetId: "",
	videoPresetId: "",
	conversationPresets: {},
	prompt_replace: {},
	prompt_replace_id: ""
}, We = a({
	api_url: p(),
	api_key: p(),
	model: p(),
	bypass_proxy: u(),
	stream: u(),
	system_prompt: p()
}), Ge = {
	api_url: "",
	api_key: "",
	model: "mistral",
	bypass_proxy: !1,
	stream: !0,
	system_prompt: ""
}, Ke = a({
	enabled: u(),
	asrServerUrl: p(),
	mode: l(["vad", "ptt"]),
	silenceTimeout: o(),
	vadThreshold: o(),
	maxKeepDuration: o(),
	language: p(),
	appendMode: u(),
	autoSend: u(),
	conversationMode: u()
}), qe = {
	enabled: !1,
	asrServerUrl: "https://qwen-qwen3-asr-demo.ms.show",
	mode: "vad",
	silenceTimeout: 1200,
	vadThreshold: .02,
	maxKeepDuration: 10,
	language: "auto",
	appendMode: !0,
	autoSend: !0,
	conversationMode: !1
}, Je = a({
	enabled: u(),
	triggerDepth: o(),
	worldBookSelections: m(p(), r([u(), c("force")])),
	worldEntrySelections: m(p(), m(p(), r([u(), c("force")])))
}), Ye = {
	enabled: !1,
	triggerDepth: 1,
	worldBookSelections: {},
	worldEntrySelections: {}
}, Xe = a({
	worldBookSelections: m(p(), r([u(), c("force")])),
	worldEntrySelections: m(p(), m(p(), r([u(), c("force")])))
}), Ze = a({
	backends: a({
		sd: a({
			success: o(),
			fail: o()
		}),
		comfyui: a({
			success: o(),
			fail: o()
		}),
		banana: a({
			success: o(),
			fail: o()
		}),
		novelai: a({
			success: o(),
			fail: o()
		})
	}),
	total: a({
		success: o(),
		fail: o()
	}),
	firstGenTime: o().nullable(),
	lastGenTime: o().nullable(),
	daily: m(p(), f())
}), Qe = {
	backends: {
		sd: {
			success: 0,
			fail: 0
		},
		comfyui: {
			success: 0,
			fail: 0
		},
		banana: {
			success: 0,
			fail: 0
		},
		novelai: {
			success: 0,
			fail: 0
		}
	},
	total: {
		success: 0,
		fail: 0
	},
	firstGenTime: null,
	lastGenTime: null,
	daily: {}
}, $e = a({
	presets: m(p(), m(p(), f())),
	currentPresetId: p().optional(),
	enabled: u().optional(),
	injectionMode: p().optional(),
	currentUserPresetId: p().optional(),
	userEnabled: u().optional(),
	userInjectionMode: p().optional()
}), et = a({
	model: p(),
	temperature: o(),
	systemPrompt: p(),
	lastPrompt: p()
}), tt = {
	model: "mistral",
	temperature: .8,
	systemPrompt: "",
	lastPrompt: ""
}, nt = i({
	theme_id: p().default(""),
	themes: m(p(), Ne).default({}),
	generate_btn_style: p().default(""),
	image_frame_style: p().default(""),
	collapse_style: p().default(""),
	scriptEnabled: u().default(!1),
	helpTipsEnabled: q.default("true"),
	characterAI: et.default(tt),
	outfitAI: et.default(tt),
	newlineFixEnabled: q.default("true"),
	yushe: m(p(), Oe).default({}),
	yusheid_sd: p().default(""),
	yusheid_novelai: p().default(""),
	yusheid_comfyui: p().default(""),
	randomYushe: q.default("false"),
	aiAutonomousResolution: u().default(!0),
	prompt_replace: m(p(), J).default({}),
	prompt_replace_id: p().default(""),
	vibePresets: m(p(), ke).default({}),
	vibePresetId: p().default(""),
	regex_profiles: m(p(), Ae).default({}),
	current_regex_profile: p().default(""),
	word_replacement_profiles: m(p(), je).default({}),
	current_word_replacement_profile: p().default(""),
	regexTestMode: u().default(!1),
	mode: p().default("comfyui"),
	client: p().default("browser"),
	cache: p().default("1"),
	sdUrl: p().default("http://localhost:7860"),
	st_chatu8_sd_auth: p().default(""),
	comfyuiUrl: p().default("http://localhost:8188"),
	novelaiApi: p().default("000000"),
	novelaiApi_id: p().default("000000"),
	startTag: p().default("image###"),
	endTag: p().default("###"),
	nai3Scale: p().default("10"),
	sdCfgScale: p().default("7"),
	sm: p().default("true"),
	dyn: p().default("true"),
	cfg_rescale: p().default("0.18"),
	AQT_sd: p().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_sd: p().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	AQT_novelai: p().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_novelai: p().default("Heavy"),
	addFurryDataset: q.default("false"),
	AQT_comfyui: p().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_comfyui: p().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	sd_csteps: p().default("28"),
	sd_cwidth: p().default("1024"),
	sd_cheight: p().default("1024"),
	sd_cseed: p().default("-1"),
	novelai_steps: p().default("28"),
	novelai_width: p().default("1024"),
	novelai_height: p().default("1024"),
	novelai_seed: p().default("0"),
	comfyui_steps: p().default("28"),
	comfyui_width: p().default("1024"),
	comfyui_height: p().default("1024"),
	comfyui_seed: p().default("0"),
	inpaint_denoise: p().default("0.75"),
	weilin_lora_fix: q.default("false"),
	inpaint_brush_size: o().default(30),
	inpaint_positive_prompt: p().default(""),
	inpaint_negative_prompt: p().default(""),
	cfg_comfyui: p().default("6"),
	sd_cchatu_8_model: p().default(""),
	sd_cchatu_8_vae: p().default("Automatic"),
	sd_cchatu_8_scheduler: p().default(""),
	sd_cchatu_8_upscaler: p().default("Latent"),
	sd_cupscale_factor: p().default("1"),
	sd_chires_fix: p().default("false"),
	sd_chires_steps: p().default("0"),
	sd_cdenoising_strength: p().default("0.7"),
	sd_cclip_skip: p().default("2"),
	sd_cadetailer: p().default("false"),
	restoreFaces: p().default("false"),
	sd_cchatu_8_samplerName: p().default("DPM++ 2M"),
	comfyuisamplerName: p().default(""),
	comfyuiCLIPName: p().default(""),
	comfyui_scheduler: p().default(""),
	comfyui_vae: p().default(""),
	novelai_sampler: p().default("k_euler"),
	zidongdianji: q.default("false"),
	zidongdianji2: q.default("false"),
	longPressToEdit: q.default("false"),
	clickToPreview: q.default("true"),
	nai3VibeTransfer: q.default("false"),
	enableVibeGroupTransfer: q.default("false"),
	randomVibeGroup: q.default("false"),
	normalizeRefStrength: q.default("false"),
	nai3CharRef: q.default("false"),
	nai3StylePerception: q.default("false"),
	InformationExtracted: p().default("0.3"),
	ReferenceStrength: p().default("0.6"),
	nai3Deceisp: q.default("true"),
	nai3Variety: q.default("true"),
	Schedule: p().default("karras"),
	MODEL_NAME: p().default(""),
	c_fenwei: p().default("0.8"),
	c_xijie: p().default("0.8"),
	c_idquanzhong: p().default("1.10"),
	c_quanzhong: p().default("0.8"),
	ipa: p().default("STANDARD (medium strength)"),
	dbclike: q.default("false"),
	collapseImage: q.default("false"),
	workers: m(p(), p()).default({}),
	workerid: p().default(""),
	worker: p().default(""),
	editWorkerid: p().default(""),
	editWorker: p().default(""),
	novelaimode: p().default("nai-diffusion-4-5-full"),
	novelaisite: p().default(""),
	novelaiOtherSite: p().default("http://localhost:9696/get-new-token"),
	enableCloudQueue: q.default("false"),
	cloudQueueUrl: p().default("https://st-chatu-novelai-queue.hf.space"),
	cloudQueueGreeting: p().default(""),
	showQueueGreeting: q.default("true"),
	displayMode: p().default(""),
	heavyFrontendMode: q.default("false"),
	insertOriginalText: q.default("false"),
	tagthinkEcho: q.default("false"),
	historyKeepImageTag: u().default(!1),
	enablePregen: q.default("false"),
	autoLLMImageGen: q.default("false"),
	imageAlignment: p().default("center"),
	imageSizeScale: p().default("100"),
	imageGenInterval: o().default(100),
	ai_temperature: o().default(1),
	ai_top_p: o().default(1),
	ai_presence_penalty: o().default(0),
	ai_frequency_penalty: o().default(0),
	ai_stream: q.default("false"),
	ai_private: q.default("true"),
	ai_token: p().default(""),
	ai_test_system: p().default("You are a helpful assistant."),
	ai_test_user: p().default("What is the capital of France?"),
	ai_test_output: p().default(""),
	chatu8_ai_assistant: We.default(Ge),
	chatu8_code: p().default(""),
	asr: Ke.default(qe),
	knowledgeBaseConfig: Je.default(Ye),
	llm_history_depth: o().default(2),
	imageGenStats: Ze.default(Qe),
	llm_profiles: m(p(), Ie).default({}),
	current_llm_profile: p().default(""),
	llm_request_type_profiles: m(p(), Z).default({}),
	current_llm_request_type_profile: p().default(""),
	llm_request_type_configs: Z.default(Le),
	test_context_profiles: m(p(), ze).default({}),
	current_test_context_profile: p().default(""),
	translation_model: p().default("mistral"),
	translation_system_prompt: p().default(""),
	AI_use_coords: q.default("true"),
	fabThemes: m(p(), Me).default({}),
	chatu8_fab_theme: p().default(""),
	enable_chatu8_fab: u().default(!0),
	enable_chatu8_fab_video: u().default(!1),
	enable_chatu8_desktop_pet: u().default(!1),
	chatu8_fab_bg_color: p().default("#ADD8E6"),
	chatu8_fab_icon_color: p().default("#FFFFFF"),
	chatu8_fab_icon_image_id: p().default(""),
	chatu8_fab_opacity: o().default(1),
	chatu8_fab_size: a({
		desktop: o(),
		mobile: o()
	}).default({
		desktop: 50,
		mobile: 40
	}),
	chatu8_fab_position: a({
		desktop: a({
			top: p(),
			left: p()
		}),
		mobile: a({
			top: p(),
			left: p()
		})
	}).default({
		desktop: {
			top: "65vh",
			left: "20px"
		},
		mobile: {
			top: "80vh",
			left: "10px"
		}
	}),
	chatu8_fab_video_paths: a({
		idle: p(),
		dragging: p()
	}).default({
		idle: "",
		dragging: ""
	}),
	lastTab: p().default("main"),
	cacheStorageMigrated: u().default(!1),
	worldBookEnabled: q.default("false"),
	worldBookList: m(p(), a({ content: p() })).default({}),
	worldBookList_id: p().default(""),
	vocabulary_search_startswith: q.default("false"),
	vocabulary_search_limit: o().default(100),
	vocabulary_search_sort: p().default("hot_desc"),
	jiuguanchucun: q.default("false"),
	vibeJiuguanchucun: q.default("true"),
	convertToJpegStorage: q.default("false"),
	jiuguanStorage: m(p(), a({
		images: s(a({
			uuid: p(),
			path: p(),
			thumbnail_uuid: p(),
			thumbnail_path: p(),
			date: o(),
			isVideo: u(),
			originalUrl: p(),
			size: o(),
			thumbnail_size: o(),
			genParams: m(p(), f()).nullable().optional(),
			data_base64: d((e) => e === "" ? void 0 : e, p().min(1).optional())
		})),
		index: o(),
		change: p()
	})).default({}),
	banana: He.default(Ue),
	bananaCharacterPresets: m(p(), Ve).default({}),
	bananaCharacterPresetId: p().default(""),
	gestureEnabled: u().default(!1),
	clickTriggerEnabled: u().default(!0),
	gesture1: s(p()).default([]),
	gesture2: s(p()).default([]),
	gestureShowRecognition: u().default(!0),
	gestureShowTrail: u().default(!0),
	gestureTrailColor: p().default("#00ff00"),
	gestureMatchThreshold: o().default(60),
	defaultCharDemand: p().default(""),
	defaultImageDemand: p().default(""),
	novelai_profiles: m(p(), Pe).default({}),
	novelai_profile_id: p().default(""),
	comfyui_profiles: m(p(), Fe).default({}),
	comfyui_profile_id: p().default(""),
	worldBookConfig: Xe.optional(),
	personaProfiles: $e.optional()
}), rt = a({
	uuid: p().min(1),
	path: p().optional(),
	thumbnail_uuid: p().min(1).optional(),
	thumbnail_path: p().optional(),
	date: o().int().nonnegative(),
	isVideo: u(),
	originalUrl: p(),
	size: o().int().nonnegative(),
	thumbnail_size: o().int().nonnegative(),
	genParams: m(p(), f()).nullable().optional(),
	data_base64: p().min(1).optional()
}), it = a({
	images: s(rt),
	index: o().int().nonnegative(),
	change: p()
}), at = a({
	id_index: p().min(1),
	fileName: p().min(1),
	name: p().min(1)
}), ot = a({
	fileName: p().min(1),
	name: p().min(1),
	hot: o().int().optional()
}), st = a({
	id: p().min(1),
	data_base64: p().min(1),
	date: o().int().nonnegative()
}), ct = a({
	tupianhuancun_metadata: m(p(), it),
	tupianhuancun_blobs: m(p(), p().min(1)),
	groups: s(at),
	subgroups: s(at),
	tags: s(ot),
	config_images: s(st)
}), lt = a({
	tag: p().min(1),
	regex: p().optional(),
	locked: u().optional()
}), ut = a({
	chat_id: p().min(1),
	message_id: o().int().nonnegative(),
	role: l([
		"user",
		"assistant",
		"system"
	]),
	mes: p(),
	swipe_id: o().int().nonnegative().nullable(),
	extra: a({
		images: m(p(), s(lt)).optional(),
		lockedTags: s(p()).optional()
	}).optional()
});
a({ messages: s(ut) }), a({
	chatu8_uid: p().optional(),
	migration_flags: m(p(), p())
});
//#endregion
//#region src/storage/active_namespace.ts
var dt = /* @__PURE__ */ new Set(["import_ready", "ready_to_switch"]);
async function ft(e, t, n) {
	let r = await n.with_marker_transaction(t, (e) => e.get_marker());
	if (r === null) throw Error(`Namespace marker is missing for namespace "${t}"`);
	if (r.namespace !== t) throw Error(`Namespace marker belongs to "${r.namespace}", expected "${t}"`);
	if (!dt.has(r.state)) throw Error(`Namespace "${t}" is not ready to switch (state: "${r.state}")`);
	let i = e.get_settings().active_namespace;
	e.update_settings({ active_namespace: t });
	try {
		await e.flush();
	} catch (t) {
		throw e.update_settings({ active_namespace: i }), t;
	}
	return t;
}
//#endregion
//#region src/migration/legacy_sources.ts
var pt = 10;
function mt(e) {
	return [...new Set(e.issues.map((e) => e.path.length > 0 ? e.path.join(".") : "(root)"))].slice(0, pt).join(", ");
}
function ht(e, t) {
	return {
		jiuguan_image_count: Object.values(e.jiuguanStorage).reduce((e, t) => e + t.images.length, 0),
		gallery_image_count: Object.values(t?.tupianhuancun_metadata ?? {}).reduce((e, t) => e + t.images.length, 0),
		config_image_count: t?.config_images.length ?? 0
	};
}
async function gt(e) {
	let t;
	try {
		t = await e.read_settings();
	} catch (e) {
		let t = e instanceof Error && e.message.length > 0 ? e.message.slice(0, 240) : "unknown error";
		return {
			kind: "invalid",
			fingerprint: D(JSON.stringify({
				source: "settings",
				error: t
			})),
			message: `Legacy settings could not be read: ${t}`
		};
	}
	if (t == null) return { kind: "absent" };
	let n;
	try {
		n = await e.read_gallery_database();
	} catch (e) {
		let t = e instanceof Error && e.message.length > 0 ? e.message.slice(0, 240) : "unknown error";
		return {
			kind: "invalid",
			fingerprint: D(JSON.stringify({
				source: "gallery",
				error: t
			})),
			message: `Legacy gallery database could not be read: ${t}`
		};
	}
	let r;
	try {
		r = D(JSON.stringify({
			settings: t,
			gallery: n ?? null
		}));
	} catch (e) {
		let t = e instanceof Error && e.message.length > 0 ? e.message.slice(0, 240) : "unknown error";
		return {
			kind: "invalid",
			fingerprint: D(JSON.stringify({
				source: "serialization",
				error: t
			})),
			message: `Legacy source could not be fingerprinted: ${t}`
		};
	}
	let i = De(t);
	if (i.unknown.length > 0) return {
		kind: "unknown_paths",
		fingerprint: r,
		paths: i.unknown
	};
	if (!i.classified.some((e) => e.rule.classification === "mapped")) return {
		kind: "invalid",
		fingerprint: r,
		message: "Legacy settings classify to zero mapped v2 data paths; refusing to treat an effectively-empty object as a real v2 install"
	};
	let a = nt.safeParse(t);
	if (!a.success) return {
		kind: "invalid",
		fingerprint: r,
		message: `Legacy settings failed schema validation: ${mt(a.error)}`
	};
	let o;
	if (n != null) {
		let e = ct.safeParse(n);
		if (!e.success) return {
			kind: "invalid",
			fingerprint: r,
			message: `Legacy gallery database failed schema validation: ${mt(e.error)}`
		};
		o = e.data;
	}
	let s = a.data;
	return {
		kind: "present",
		settings: s,
		gallery: o,
		fingerprint: r,
		inventory: ht(s, o)
	};
}
function _t(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
function vt(e, t) {
	let n = /* @__PURE__ */ new Map(), r = (e) => {
		if (typeof e != "string" || e.length === 0) return;
		let t = _t(e);
		t.byteLength !== 0 && n.set(O(t), t);
	};
	for (let t of Object.values(e.jiuguanStorage)) for (let e of t.images) r(e.data_base64);
	for (let e of Object.values(t?.tupianhuancun_metadata ?? {})) for (let n of e.images) r(n.data_base64 ?? t?.tupianhuancun_blobs[n.uuid]);
	for (let e of t?.config_images ?? []) r(e.data_base64);
	return n;
}
function yt(e) {
	let t = "";
	for (let n of e) t += String.fromCharCode(n);
	return btoa(t);
}
async function bt(e, t) {
	let n = Object.entries(e.jiuguanStorage);
	if (n.length === 0) return e;
	let r = {};
	for (let [e, i] of n) {
		let n = await Promise.all(i.images.map(async (e) => {
			if (typeof e.data_base64 == "string" && e.data_base64.length > 0) return e;
			let n;
			try {
				n = await t.resolve_host_image(e.path);
			} catch {
				n = null;
			}
			return n === null || n.byteLength === 0 ? {
				...e,
				data_base64: void 0
			} : {
				...e,
				data_base64: yt(n)
			};
		}));
		r[e] = {
			...i,
			images: n
		};
	}
	return {
		...e,
		jiuguanStorage: r
	};
}
//#endregion
//#region src/migration/secret_transfer.ts
function xt(e, t, n) {
	return `tavern_canvas:${e}:${t}:${n}`;
}
async function St(e, t, n) {
	let r = {
		credential_kind: e.credential_kind,
		provider_profile_id: e.provider_profile_id,
		source_path: e.source_path
	};
	if (n === null || !n.supports(e.credential_kind)) return {
		...r,
		status: "blocked",
		reason: "no_supported_destination"
	};
	let i = xt(t, e.provider_profile_id, e.credential_kind);
	try {
		await n.write_secret(i, e.plaintext_value);
	} catch {
		return {
			...r,
			status: "blocked",
			reason: "write_failed"
		};
	}
	return await n.probe_secret(i).catch(() => !1) ? {
		...r,
		status: "transferred",
		reference: i
	} : {
		...r,
		status: "blocked",
		reason: "probe_failed"
	};
}
async function Ct(e, t, n) {
	let r = [];
	for (let i of e) r.push(await St(i, t, n));
	return {
		records: r,
		blocked: r.some((e) => e.status === "blocked")
	};
}
//#endregion
//#region src/migration/migration_runner.ts
var $ = class extends Error {
	reason;
	step;
	constructor(e, t, n) {
		super(t), this.name = "ExpectedMigrationFailure", this.reason = e, this.step = n;
	}
}, wt = {
	novelai: (e) => e.novelai_profile_id,
	comfyui: (e) => e.comfyui_profile_id,
	llm: (e) => e.current_llm_profile
};
function Tt(e, t, n) {
	if (e.mode === "banana") {
		let e = j(`${t}:provider_converter:openai_image:banana`);
		return n.some((t) => t.id === e) ? e : null;
	}
	let r = wt[e.mode]?.(e);
	if (r == null) return null;
	let i = j(`${t}:provider_converter:${e.mode}:${r}`);
	return n.some((e) => e.id === i) ? i : null;
}
function Et(e, t, n, r) {
	let i = {
		namespace: n,
		migrated_at: r
	}, a = ye(e, i), o = be(e, i), s = xe(e, i), c = Se(e, t, i), l = Ce(e, i), u = we(e, i), d = Ee(e, t, i), f = Tt(e, n, o.records), p = [
		...a.warnings,
		...o.warnings,
		...s.warnings,
		...c.warnings,
		...l.warnings,
		...u.warnings,
		...d.warnings
	];
	return {
		settings: {
			...a.settings,
			active_provider_profile_id: f
		},
		legacy_preferences_id: a.legacy_preferences.id,
		legacy_preferences_payload: a.legacy_preferences.payload,
		provider_profiles: o.records,
		secret_transfers: o.secret_transfers,
		prompt_presets: s.prompt_presets,
		regex_rules: s.regex_rules,
		comfy_workflows: c.comfy_workflows,
		novelai_vibes: c.novelai_vibes,
		character_profiles: l.character_profiles,
		knowledge_entries: u.knowledge_entries,
		asset_image_records: c.image_records,
		gallery_image_records: d.image_records,
		vocabularies: d.vocabularies,
		vocabulary_groups: d.vocabulary_groups,
		warnings: p
	};
}
async function Dt(e, t, n, r, i) {
	let a = await t.image_records.get(n, r.id, e) !== null;
	if (await t.image_records.put(n, r, e), a) return;
	let o = i.get(r.sha256);
	if (o === void 0) throw new $("missing_blob", `No resolved bytes for image ${r.id} (sha256 ${r.sha256})`, "assets_gallery");
	let s = await t.image_blobs.get(r.sha256, e);
	if (s === null) {
		let n = ne(o), i = new Uint8Array(o), a = {
			sha256: r.sha256,
			ref_count: 1,
			byte_length: o.byteLength,
			blob: n === void 0 ? new Blob([i]) : new Blob([i], { type: n })
		};
		await t.image_blobs.create(a, e);
		return;
	}
	await t.image_blobs.update({
		...s,
		ref_count: s.ref_count + 1
	}, e);
}
var Ot = [
	"provider",
	"secrets",
	"prompts",
	"assets",
	"characters",
	"knowledge",
	"gallery",
	"settings"
];
async function kt(e, t) {
	let { database: n, namespace: r, plan: i, bytes_by_sha256: a, migrated_at: o } = t, s = x(n);
	switch (e) {
		case "provider": return S(n, ["provider_profiles"], async (e) => {
			for (let t of i.provider_profiles) await s.provider_profiles.put(r, t, e);
			return i.provider_profiles.length;
		});
		case "secrets": {
			let e = t.settings.get_settings().gateway;
			if (typeof e.token_secret_id == "string" && e.token_secret_id.length > 0) return 0;
			let n = await Ct(i.secret_transfers, r, t.secret_destination), a = n.records.find((e) => e.status === "blocked");
			if (a !== void 0) throw new $("secret_transfer_blocked", `Secret transfer blocked for credential "${a.credential_kind}" (${a.reason}); configure SillyTavern secret storage or a Gateway profile and retry`, "secrets");
			return n.records.length;
		}
		case "prompts": return S(n, ["prompt_presets", "regex_rules"], async (e) => {
			for (let t of i.prompt_presets) await s.prompt_presets.put(r, t, e);
			for (let t of i.regex_rules) await s.regex_rules.put(r, t, e);
			return i.prompt_presets.length + i.regex_rules.length;
		});
		case "assets": return S(n, [
			"comfy_workflows",
			"novelai_vibes",
			"image_records",
			"image_blobs"
		], async (e) => {
			for (let t of i.comfy_workflows) await s.comfy_workflows.put(r, t, e);
			for (let t of i.novelai_vibes) await s.novelai_vibes.put(r, t, e);
			for (let t of i.asset_image_records) await Dt(e, s, r, t, a);
			return i.comfy_workflows.length + i.novelai_vibes.length + i.asset_image_records.length;
		});
		case "characters": return S(n, ["character_profiles"], async (e) => {
			for (let t of i.character_profiles) await s.character_profiles.put(r, t, e);
			return i.character_profiles.length;
		});
		case "knowledge": return S(n, ["knowledge_entries"], async (e) => {
			for (let t of i.knowledge_entries) await s.knowledge_entries.put(r, t, e);
			return i.knowledge_entries.length;
		});
		case "gallery": return S(n, [
			"image_records",
			"image_blobs",
			"vocabularies",
			"vocabulary_groups"
		], async (e) => {
			for (let t of i.gallery_image_records) await Dt(e, s, r, t, a);
			for (let t of i.vocabularies) await s.vocabularies.put(r, t, e);
			for (let t of i.vocabulary_groups) await s.vocabulary_groups.put(r, t, e);
			return i.gallery_image_records.length + i.vocabularies.length + i.vocabulary_groups.length;
		});
		case "settings": return S(n, ["legacy_preferences"], async (e) => (await s.legacy_preferences.put(r, {
			schema_version: 1,
			id: i.legacy_preferences_id,
			namespace: r,
			record_key: `${r}:${i.legacy_preferences_id}`,
			created_at: o,
			updated_at: o,
			payload: b(i.legacy_preferences_payload)
		}, e), 1));
	}
}
async function At(e, t, n, r) {
	let i = x(e), a = {
		provider_profiles: n.provider_profiles.length,
		prompt_presets: n.prompt_presets.length,
		regex_rules: n.regex_rules.length,
		comfy_workflows: n.comfy_workflows.length,
		novelai_vibes: n.novelai_vibes.length,
		character_profiles: n.character_profiles.length,
		knowledge_entries: n.knowledge_entries.length,
		image_records: n.asset_image_records.length + n.gallery_image_records.length,
		vocabularies: n.vocabularies.length,
		vocabulary_groups: n.vocabulary_groups.length,
		legacy_preferences: 1
	};
	for (let [e, n] of Object.entries(a)) {
		let r = (await i[e].list(t)).length;
		if (r !== n) throw new $("count_mismatch", `Expected ${String(n)} record(s) in ${e}, found ${String(r)}`, "verifying");
	}
	if (n.asset_image_records.length !== r.config_image_count) throw new $("count_mismatch", `Expected ${String(r.config_image_count)} config image record(s) per source inventory, converter produced ${String(n.asset_image_records.length)}`, "verifying");
	let o = r.jiuguan_image_count + r.gallery_image_count;
	if (n.gallery_image_records.length !== o) throw new $("missing_blob", `Expected ${String(o)} gallery image record(s) per source inventory (jiuguan ${String(r.jiuguan_image_count)} + gallery ${String(r.gallery_image_count)}), converter produced ${String(n.gallery_image_records.length)}; some legacy images likely had no resolved bytes`, "verifying");
	let s = [...new Set([...n.asset_image_records, ...n.gallery_image_records].map((e) => e.sha256))];
	for (let e of s) {
		let t = await i.image_blobs.get(e);
		if (t === null) throw new $("missing_blob", `Missing image_blobs entry for ${e}`, "verifying");
		if (O(t.blob instanceof Blob ? new Uint8Array(await t.blob.arrayBuffer()) : new Uint8Array(t.blob)) !== e) throw new $("hash_mismatch", `Stored blob ${e} no longer hashes to its key`, "verifying");
	}
	return s;
}
async function jt(e) {
	let { database: t, settings: n, legacy_source: r, image_resolver: i, secret_destination: a } = e, o = e.migrated_at ?? (/* @__PURE__ */ new Date()).toISOString(), s = ae(t), c = await gt(r);
	if (c.kind === "absent") return await s.save(ie, {
		state: "not_required",
		checked_at: o
	}, o), { status: "not_required" };
	let l = `${oe}${j(c.fingerprint)}`, u = await s.load(l);
	if (u !== null && u.payload.state === "completed") return {
		status: "completed",
		namespace: l,
		counts: u.payload.counts
	};
	let d = u !== null && u.payload.state !== "not_required" ? u.payload.started_at : o, f = new Set(u !== null && u.payload.state !== "not_required" ? u.payload.completed_batches : []), p = { ...u !== null && u.payload.state !== "not_required" ? u.payload.counts : {} }, m = null, h = u !== null && u.payload.state !== "not_required" ? u.payload.image_hashes : [], g = (e) => s.save(l, {
		state: e,
		source_fingerprint: c.fingerprint,
		staging_namespace: l,
		started_at: d,
		completed_batches: [...f],
		counts: { ...p },
		image_hashes: [...h],
		warnings: m === null ? [] : [...m.warnings]
	}, (/* @__PURE__ */ new Date()).toISOString()), _ = (e) => s.save(l, {
		state: "failed",
		source_fingerprint: c.fingerprint,
		staging_namespace: l,
		started_at: d,
		completed_batches: [...f],
		counts: { ...p },
		image_hashes: [...h],
		warnings: m === null ? [] : [...m.warnings],
		failure: e
	}, (/* @__PURE__ */ new Date()).toISOString());
	if (u === null && await g("inventory"), c.kind === "unknown_paths") {
		let e = {
			reason: "unknown_setting_path",
			message: `Unclassified v2 settings path(s): ${c.paths.join(", ")}`,
			step: "inventory"
		};
		return await _(e), {
			status: "failed",
			namespace: l,
			failure: e
		};
	}
	if (c.kind === "invalid") {
		let e = {
			reason: "invalid_source",
			message: c.message,
			step: "inventory"
		};
		return await _(e), {
			status: "failed",
			namespace: l,
			failure: e
		};
	}
	try {
		let e = await bt(c.settings, i);
		try {
			m = Et(e, c.gallery, l, o);
		} catch (e) {
			throw e instanceof $ ? e : new $("converter_error", e instanceof Error ? e.message : String(e), "convert");
		}
		let r = vt(e, c.gallery);
		await g("copying");
		for (let e of Ot) {
			if (f.has(e)) continue;
			let i = await kt(e, {
				database: t,
				namespace: l,
				plan: m,
				bytes_by_sha256: r,
				migrated_at: o,
				settings: n,
				secret_destination: a
			});
			f.add(e), p[e] = i, await g("copying");
		}
		await g("verifying"), h = await At(t, l, m, c.inventory), await g("ready_to_switch");
		try {
			await ft(n, l, re(t));
		} catch (e) {
			throw new $("switch_failed", e instanceof Error ? e.message : String(e), "switch");
		}
		try {
			let { schema_version: e, active_namespace: t, gateway: r, ...i } = m.settings;
			n.update_settings(i);
		} catch {}
		return await g("completed"), {
			status: "completed",
			namespace: l,
			counts: p
		};
	} catch (e) {
		if (!(e instanceof $)) throw e;
		let t = {
			reason: e.reason,
			message: e.message,
			step: e.step
		};
		return await _(t), {
			status: "failed",
			namespace: l,
			failure: t
		};
	}
}
//#endregion
export { jt as run_migration };
