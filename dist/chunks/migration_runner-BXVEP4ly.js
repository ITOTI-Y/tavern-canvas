import { n as e, r as t, t as n } from "./sha2-BGNex9vj.js";
import { $ as r, ct as i, dt as a, ft as o, g as s, lt as c, mt as l, nt as u, ot as d, pt as f, tt as p, ut as m } from "./src-CpgRWEjb.js";
import { C as h, b as g, d as _, g as ee, k as v, w as te, y as ne } from "./job_repository-CcjjS_PI.js";
import { a as re, d as y, l as ie } from "./business_repositories-CDvcbNGU.js";
import { i as ae, n as oe, r as se, t as ce } from "./migration_journal-DS3R567y.js";
//#region ../../tools/v2_migration/src/conversion_result.ts
function b(e, t) {
	return `${e}:${t}`;
}
function x(e, t) {
	return {
		schema_version: 1,
		id: t,
		namespace: e.namespace,
		record_key: b(e.namespace, t),
		created_at: e.migrated_at,
		updated_at: e.migrated_at
	};
}
var le = a({
	schema_version: d(1),
	id: te,
	namespace: ee,
	record_key: o().min(1),
	created_at: h,
	updated_at: h
});
//#endregion
//#region ../../tools/v2_migration/src/inventory.ts
function S(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function C(e, t = []) {
	if (!S(e)) return [];
	let n = [];
	for (let r of Object.keys(e)) {
		let i = [...t, r];
		n.push({
			segments: i,
			path: i.join(".")
		}), n.push(...C(e[r], i));
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
function w(e, t) {
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
], T = [
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
function me(r) {
	return e(n(t(r)));
}
function E(t) {
	return e(n(t));
}
function he(e, r) {
	let i = new Uint8Array(r), a = 0, o = 0;
	for (; a < r;) {
		let s = n(t(`${e}::${String(o)}`)), c = Math.min(s.length, r - a);
		i.set(s.subarray(0, c), a), a += c, o += 1;
	}
	return i;
}
var D = "0123456789abcdef";
function O(e, t) {
	let n = e[t];
	if (n === void 0) throw RangeError(`Missing byte at index ${String(t)}`);
	return n;
}
function ge(e) {
	return D.charAt(e >> 4) + D.charAt(e & 15);
}
function k(e) {
	let t = he(e, 16);
	t[6] = O(t, 6) & 15 | 80, t[8] = O(t, 8) & 63 | 128;
	let n = Array.from(t, ge).join("");
	return `${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20, 32)}`;
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_coercion.ts
function _e(e, t = !1) {
	return typeof e == "boolean" ? e : e === "true" || e !== "false" && t;
}
function A(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/payload_extraction.ts
function ve(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (r.classification !== "mapped" || r.converter !== t) continue;
		let [e] = r.pattern.split(".");
		e !== void 0 && n.add(e);
	}
	return [...n].toSorted();
}
function j(e, t, n) {
	let r = {};
	for (let i of ve(t, n)) Object.hasOwn(e, i) && (r[i] = e[i]);
	return r;
}
function M(e, t, n) {
	if (!S(e)) return e;
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		let e = [...t, i];
		w(e, n)?.classification !== "deferred_secret_transfer" && (r[i] = M(a, e, n));
	}
	return r;
}
function N(e) {
	return v(e), e;
}
//#endregion
//#region ../../tools/v2_migration/src/converters/settings_converter.ts
var ye = le.extend({ payload: m(o(), l()) });
function be(e, t) {
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
	], r = s.parse({
		schema_version: 1,
		active_namespace: t.namespace,
		locale: "auto",
		active_provider_profile_id: null,
		global_concurrency: 1,
		auto_generation_enabled: _e(e.autoLLMImageGen),
		fallback_generation_enabled: _e(e.enablePregen),
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
	}), i = k(`${t.namespace}:legacy_preferences:settings_converter`), a = N(j(e, T, "settings_converter"));
	return {
		settings: r,
		legacy_preferences: ye.parse({
			schema_version: 1,
			id: i,
			namespace: t.namespace,
			record_key: b(t.namespace, i),
			created_at: t.migrated_at,
			updated_at: t.migrated_at,
			payload: a
		}),
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/provider_converter.ts
function P(e, t, n, r) {
	return ne.parse({
		...x(e, t),
		provider_id: n,
		payload: N(r)
	});
}
function F(e, t) {
	let n = new Set(t);
	return Object.fromEntries(Object.entries(e).filter(([e]) => !n.has(e)));
}
function I(e, t, n) {
	t.trim().length !== 0 && e.push({
		operation: "secret_transfer",
		plaintext_value: t,
		...n
	});
}
function xe(e, t) {
	let n = [], r = [], i = [], a = k(`${t.namespace}:provider_converter:legacy_all`), o = M(j(e, T, "provider_converter"), [], T);
	i.push(P(t, a, "legacy_all", o)), n.push({
		path: "mode",
		message: `v2 "mode" was ${JSON.stringify(e.mode)}; the migration runner resolves this to active_provider_profile_id.`
	});
	for (let [n, a] of Object.entries(e.novelai_profiles)) {
		let e = k(`${t.namespace}:provider_converter:novelai:${n}`);
		i.push(P(t, e, "novelai", F(a, ["novelaiApi"]))), I(r, a.novelaiApi, {
			credential_kind: "novelai_token",
			source_path: `novelai_profiles.${n}.novelaiApi`,
			provider_profile_id: e
		});
	}
	for (let [n, r] of Object.entries(e.comfyui_profiles)) {
		let e = k(`${t.namespace}:provider_converter:comfyui:${n}`);
		i.push(P(t, e, "comfyui", { ...r }));
	}
	for (let [n, a] of Object.entries(e.llm_profiles)) {
		let e = k(`${t.namespace}:provider_converter:llm:${n}`);
		i.push(P(t, e, "llm", F(a, ["api_key"]))), I(r, a.api_key, {
			credential_kind: "llm_profile_api_key",
			source_path: `llm_profiles.${n}.api_key`,
			provider_profile_id: e
		});
	}
	let s = k(`${t.namespace}:provider_converter:openai_image:banana`);
	i.push(P(t, s, "openai_image", {
		...F(e.banana, ["apiKey"]),
		character_presets: e.bananaCharacterPresets,
		character_preset_id: e.bananaCharacterPresetId
	})), n.push({
		path: "banana",
		message: "v2 \"banana\" (Banana/Grok) used an OpenAI-compatible API; remapped to provider_id \"openai_image\"."
	}), I(r, e.banana.apiKey, {
		credential_kind: "banana_api_key",
		source_path: "banana.apiKey",
		provider_profile_id: s
	});
	let c = k(`${t.namespace}:provider_converter:llm:chatu8_ai_assistant`);
	return i.push(P(t, c, "llm", F(e.chatu8_ai_assistant, ["api_key"]))), I(r, e.chatu8_ai_assistant.api_key, {
		credential_kind: "chatu8_ai_assistant_api_key",
		source_path: "chatu8_ai_assistant.api_key",
		provider_profile_id: c
	}), I(r, e.st_chatu8_sd_auth, {
		credential_kind: "sd_webui_auth",
		source_path: "st_chatu8_sd_auth",
		provider_profile_id: a
	}), I(r, e.novelaiApi, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi",
		provider_profile_id: a
	}), I(r, e.novelaiApi_id, {
		credential_kind: "novelai_token",
		source_path: "novelaiApi_id",
		provider_profile_id: a
	}), I(r, e.ai_token, {
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
function L(e, t, n) {
	return g.prompt_presets.parse({
		...x(e, t),
		payload: N(n)
	});
}
function R(e, t, n) {
	return g.regex_rules.parse({
		...x(e, t),
		payload: N(n)
	});
}
function Se(e, t) {
	let n = [], r = [], i = [], a = k(`${t.namespace}:prompt_converter:legacy_all`);
	r.push(L(t, a, j(e, T, "prompt_converter")));
	for (let [n, i] of Object.entries(e.yushe)) {
		let e = k(`${t.namespace}:prompt_converter:yushe:${n}`);
		r.push(L(t, e, {
			kind: "yushe",
			name: n,
			...i
		}));
	}
	for (let [n, i] of Object.entries(e.test_context_profiles)) {
		let e = k(`${t.namespace}:prompt_converter:test_context:${n}`);
		r.push(L(t, e, {
			kind: "llm_test_context",
			name: n,
			...i
		}));
	}
	let o = k(`${t.namespace}:prompt_converter:persona_ai_defaults`);
	r.push(L(t, o, {
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
		let e = k(`${t.namespace}:prompt_converter:prompt_replace:${n}`);
		i.push(R(t, e, {
			kind: "prompt_replace",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.regex_profiles)) {
		let e = k(`${t.namespace}:prompt_converter:regex_profile:${n}`);
		i.push(R(t, e, {
			kind: "regex_profile",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.word_replacement_profiles)) {
		let e = k(`${t.namespace}:prompt_converter:word_replacement:${n}`);
		i.push(R(t, e, {
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
function z(e, t, n) {
	return g.comfy_workflows.parse({
		...x(e, t),
		payload: N(n)
	});
}
function B(e, t, n) {
	return g.novelai_vibes.parse({
		...x(e, t),
		payload: N(n)
	});
}
function Ce(e, t, n) {
	let r = [], i = [], a = [], o = [], s = k(`${n.namespace}:asset_converter:legacy_all`);
	i.push(z(n, s, j(e, T, "asset_converter")));
	for (let [t, r] of Object.entries(e.workers)) {
		let e = k(`${n.namespace}:asset_converter:workers:${t}`);
		i.push(z(n, e, {
			kind: "workflow",
			name: t,
			workflow_json: r
		}));
	}
	let c = k(`${n.namespace}:asset_converter:edit_workflow`);
	i.push(z(n, c, {
		kind: "edit_workflow",
		editWorkerid: e.editWorkerid,
		editWorker: e.editWorker
	}));
	let l = k(`${n.namespace}:asset_converter:inpaint_defaults`);
	i.push(z(n, l, {
		kind: "inpaint_lora_defaults",
		inpaint_denoise: e.inpaint_denoise,
		inpaint_brush_size: e.inpaint_brush_size,
		inpaint_positive_prompt: e.inpaint_positive_prompt,
		inpaint_negative_prompt: e.inpaint_negative_prompt,
		weilin_lora_fix: e.weilin_lora_fix
	}));
	for (let [t, r] of Object.entries(e.vibePresets)) {
		let e = k(`${n.namespace}:asset_converter:vibe:${t}`);
		a.push(B(n, e, {
			kind: "vibe_preset",
			name: t,
			...r
		}));
	}
	let u = k(`${n.namespace}:asset_converter:vibe_defaults`);
	a.push(B(n, u, {
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
		let t = A(e.data_base64), r = E(t), i = k(`${n.namespace}:asset_converter:config_image:${e.id}`);
		o.push(_.parse({
			...x(n, i),
			sha256: r,
			last_accessed_at: n.migrated_at,
			pinned: !0,
			payload: N({
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
function V(e, t, n) {
	return g.character_profiles.parse({
		...x(e, t),
		payload: N(n)
	});
}
function we(e, t) {
	let n = [], r = [], i = k(`${t.namespace}:character_converter:legacy_all`);
	r.push(V(t, i, j(e, T, "character_converter")));
	let a = e.personaProfiles?.presets ?? {};
	for (let [e, n] of Object.entries(a)) {
		let i = k(`${t.namespace}:character_converter:persona:${e}`);
		r.push(V(t, i, {
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
function H(e, t, n, r) {
	return g.knowledge_entries.parse({
		...x(e, t),
		source_type: n,
		payload: N(r)
	});
}
function Te(e, t) {
	let n = [], r = [], i = k(`${t.namespace}:knowledge_converter:legacy_all`);
	r.push(H(t, i, "legacy_all", j(e, T, "knowledge_converter")));
	let a = k(`${t.namespace}:knowledge_converter:knowledge_base_config`);
	r.push(H(t, a, "knowledge_base_config", e.knowledgeBaseConfig));
	for (let [n, i] of Object.entries(e.worldBookList)) {
		let a = k(`${t.namespace}:knowledge_converter:builtin_world_book:${n}`);
		r.push(H(t, a, "builtin_world_book", {
			name: n,
			enabled: e.worldBookEnabled,
			active_entry_id: e.worldBookList_id === n,
			...i
		}));
	}
	if (e.worldBookConfig !== void 0) {
		let n = k(`${t.namespace}:knowledge_converter:send_data_world_book_config`);
		r.push(H(t, n, "send_data_world_book_config", e.worldBookConfig));
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
var U = "manual";
function Ee(e, t, n, r, i) {
	return _.parse({
		...x(e, t),
		sha256: n,
		last_accessed_at: e.migrated_at,
		pinned: !1,
		payload: {
			kind: r,
			...i
		}
	});
}
function W(e, t, n, r, i, a, o) {
	if (r.data_base64 === void 0) {
		a.push({
			path: o,
			message: `Image ${r.uuid} has no resolved bytes; the migration runner must fetch it before this record can be converted.`
		});
		return;
	}
	let s = A(r.data_base64), c = E(s);
	return Ee(e, k(`${e.namespace}:gallery_converter:${t}:${r.uuid}`), c, i, {
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
function De(e, t, n) {
	let r = [], i = [], a = [], o = [];
	for (let [t, a] of Object.entries(e.jiuguanStorage)) for (let [e, o] of a.images.entries()) {
		let a = W(n, "server", t, o, "server_metadata", r, `jiuguanStorage.${t}.images[${String(e)}]`);
		a !== void 0 && i.push(a);
	}
	for (let [e, a] of Object.entries(t?.tupianhuancun_metadata ?? {})) for (let [o, s] of a.images.entries()) {
		let a = s.data_base64 ?? (t?.tupianhuancun_blobs[s.uuid] === void 0 ? void 0 : t.tupianhuancun_blobs[s.uuid]), c = W(n, "indexeddb", e, {
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
	let s = t.tags.filter((e) => e.fileName === U), c = k(`${n.namespace}:gallery_converter:manual_vocabulary`);
	a.push(g.vocabularies.parse({
		...x(n, c),
		payload: {
			kind: "manual_vocabulary",
			tags: s
		}
	}));
	let l = t.groups.filter((e) => e.fileName === U), u = t.subgroups.filter((e) => e.fileName === U);
	for (let e of l) {
		let t = k(`${n.namespace}:gallery_converter:group:${e.id_index}`);
		o.push(g.vocabulary_groups.parse({
			...x(n, t),
			vocabulary_id: c,
			payload: {
				kind: "group",
				...e
			}
		}));
	}
	for (let e of u) {
		let t = k(`${n.namespace}:gallery_converter:subgroup:${e.id_index}`);
		o.push(g.vocabulary_groups.parse({
			...x(n, t),
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
function Oe(e) {
	let t = [], n = [];
	for (let { segments: r, path: i } of C(e)) {
		let e = w(r, T);
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
var G = f([
	o(),
	i(),
	u()
]), ke = a({
	fixedPrompt: o(),
	fixedPrompt_end: o(),
	negativePrompt: o()
}), Ae = a({
	model: o(),
	infoExtract: i(),
	strength: i(),
	imageId: o().nullable(),
	vibeDataId: o().nullable()
}), je = a({
	beforeAfterRegex: o(),
	textRegex: o()
}), Me = a({
	textReplacement: o(),
	aiReplacement: o()
}), K = a({ text: o() }), Ne = a({
	bgColor: o(),
	iconColor: o(),
	opacity: i()
}), Pe = a({
	bgColor: o().optional(),
	textColor: o().optional(),
	accentColor: o().optional()
}), Fe = a({
	novelaiApi: o(),
	novelaisite: o(),
	novelaiOtherSite: o(),
	enableCloudQueue: o(),
	cloudQueueUrl: o(),
	cloudQueueGreeting: o(),
	showQueueGreeting: o(),
	novelaimode: o(),
	novelai_sampler: o(),
	Schedule: o(),
	nai3Scale: o(),
	cfg_rescale: o(),
	AI_use_coords: o(),
	sm: o(),
	dyn: o(),
	nai3Variety: o(),
	nai3Deceisp: o(),
	enableVibeGroupTransfer: o(),
	randomVibeGroup: o(),
	normalizeRefStrength: o(),
	novelai_width: o(),
	novelai_height: o(),
	novelai_steps: o(),
	novelai_seed: o()
}), Ie = a({
	workerid: o(),
	worker: o(),
	editWorkerid: o(),
	editWorker: o(),
	comfyuiUrl: o(),
	MODEL_NAME: o(),
	comfyuisamplerName: o(),
	comfyui_vae: o(),
	comfyui_scheduler: o(),
	comfyuiCLIPName: o(),
	comfyui_width: o(),
	comfyui_height: o(),
	comfyui_steps: o(),
	comfyui_seed: o(),
	cfg_comfyui: o()
}), Le = a({
	api_url: o(),
	api_key: o(),
	model: o(),
	temperature: i(),
	top_p: i(),
	max_tokens: i(),
	stream: u(),
	bypass_proxy: u()
}), q = a({
	api_profile: o(),
	context_profile: o()
}), J = {
	api_profile: "",
	context_profile: ""
}, Y = a({
	image_gen: q,
	char_design: q,
	char_display: q,
	char_modify: q,
	translation: q,
	tag_modify: q,
	ai_assistant: q,
	persona_gen: q,
	user_persona_gen: q,
	chat_summary: q
}), Re = {
	image_gen: J,
	char_design: J,
	char_display: J,
	char_modify: J,
	translation: J,
	tag_modify: J,
	ai_assistant: J,
	persona_gen: J,
	user_persona_gen: J,
	chat_summary: J
}, ze = a({
	id: o(),
	name: o(),
	role: r([
		"system",
		"user",
		"assistant"
	]),
	content: o(),
	enabled: u(),
	triggerMode: r(["always", "trigger"]),
	triggerWords: o(),
	andTriggerWords: o()
}), Be = a({ entries: p(ze) }), X = a({
	user: a({
		text: o(),
		image: o()
	}),
	model: a({
		text: o(),
		image: o()
	})
}), Ve = a({
	fixedPrompt: o(),
	postfixPrompt: o(),
	conversation: p(X)
}), He = a({
	triggers: o(),
	conversation: X
}), Ue = a({
	apiKey: o(),
	apiUrl: o(),
	model: o(),
	editModel: o(),
	videoModel: o(),
	aspectRatio: o(),
	imageSize: o(),
	useGrokFormat: o(),
	conversationPresetId: o(),
	editPresetId: o(),
	videoPresetId: o(),
	conversationPresets: m(o(), Ve),
	prompt_replace: m(o(), K),
	prompt_replace_id: o()
}), We = {
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
}, Ge = a({
	api_url: o(),
	api_key: o(),
	model: o(),
	bypass_proxy: u(),
	stream: u(),
	system_prompt: o()
}), Ke = {
	api_url: "",
	api_key: "",
	model: "mistral",
	bypass_proxy: !1,
	stream: !0,
	system_prompt: ""
}, qe = a({
	enabled: u(),
	asrServerUrl: o(),
	mode: r(["vad", "ptt"]),
	silenceTimeout: i(),
	vadThreshold: i(),
	maxKeepDuration: i(),
	language: o(),
	appendMode: u(),
	autoSend: u(),
	conversationMode: u()
}), Je = {
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
}, Ye = a({
	enabled: u(),
	triggerDepth: i(),
	worldBookSelections: m(o(), f([u(), d("force")])),
	worldEntrySelections: m(o(), m(o(), f([u(), d("force")])))
}), Xe = {
	enabled: !1,
	triggerDepth: 1,
	worldBookSelections: {},
	worldEntrySelections: {}
}, Ze = a({
	worldBookSelections: m(o(), f([u(), d("force")])),
	worldEntrySelections: m(o(), m(o(), f([u(), d("force")])))
}), Qe = a({
	backends: a({
		sd: a({
			success: i(),
			fail: i()
		}),
		comfyui: a({
			success: i(),
			fail: i()
		}),
		banana: a({
			success: i(),
			fail: i()
		}),
		novelai: a({
			success: i(),
			fail: i()
		})
	}),
	total: a({
		success: i(),
		fail: i()
	}),
	firstGenTime: i().nullable(),
	lastGenTime: i().nullable(),
	daily: m(o(), l())
}), $e = {
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
}, et = a({
	presets: m(o(), m(o(), l())),
	currentPresetId: o().optional(),
	enabled: u().optional(),
	injectionMode: o().optional(),
	currentUserPresetId: o().optional(),
	userEnabled: u().optional(),
	userInjectionMode: o().optional()
}), Z = a({
	model: o(),
	temperature: i(),
	systemPrompt: o(),
	lastPrompt: o()
}), Q = {
	model: "mistral",
	temperature: .8,
	systemPrompt: "",
	lastPrompt: ""
}, tt = c({
	theme_id: o().default(""),
	themes: m(o(), Pe).default({}),
	generate_btn_style: o().default(""),
	image_frame_style: o().default(""),
	collapse_style: o().default(""),
	scriptEnabled: u().default(!1),
	helpTipsEnabled: G.default("true"),
	characterAI: Z.default(Q),
	outfitAI: Z.default(Q),
	newlineFixEnabled: G.default("true"),
	yushe: m(o(), ke).default({}),
	yusheid_sd: o().default(""),
	yusheid_novelai: o().default(""),
	yusheid_comfyui: o().default(""),
	randomYushe: G.default("false"),
	aiAutonomousResolution: u().default(!0),
	prompt_replace: m(o(), K).default({}),
	prompt_replace_id: o().default(""),
	vibePresets: m(o(), Ae).default({}),
	vibePresetId: o().default(""),
	regex_profiles: m(o(), je).default({}),
	current_regex_profile: o().default(""),
	word_replacement_profiles: m(o(), Me).default({}),
	current_word_replacement_profile: o().default(""),
	regexTestMode: u().default(!1),
	mode: o().default("comfyui"),
	client: o().default("browser"),
	cache: o().default("1"),
	sdUrl: o().default("http://localhost:7860"),
	st_chatu8_sd_auth: o().default(""),
	comfyuiUrl: o().default("http://localhost:8188"),
	novelaiApi: o().default("000000"),
	novelaiApi_id: o().default("000000"),
	startTag: o().default("image###"),
	endTag: o().default("###"),
	nai3Scale: o().default("10"),
	sdCfgScale: o().default("7"),
	sm: o().default("true"),
	dyn: o().default("true"),
	cfg_rescale: o().default("0.18"),
	AQT_sd: o().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_sd: o().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	AQT_novelai: o().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_novelai: o().default("Heavy"),
	addFurryDataset: G.default("false"),
	AQT_comfyui: o().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_comfyui: o().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	sd_csteps: o().default("28"),
	sd_cwidth: o().default("1024"),
	sd_cheight: o().default("1024"),
	sd_cseed: o().default("-1"),
	novelai_steps: o().default("28"),
	novelai_width: o().default("1024"),
	novelai_height: o().default("1024"),
	novelai_seed: o().default("0"),
	comfyui_steps: o().default("28"),
	comfyui_width: o().default("1024"),
	comfyui_height: o().default("1024"),
	comfyui_seed: o().default("0"),
	inpaint_denoise: o().default("0.75"),
	weilin_lora_fix: G.default("false"),
	inpaint_brush_size: i().default(30),
	inpaint_positive_prompt: o().default(""),
	inpaint_negative_prompt: o().default(""),
	cfg_comfyui: o().default("6"),
	sd_cchatu_8_model: o().default(""),
	sd_cchatu_8_vae: o().default("Automatic"),
	sd_cchatu_8_scheduler: o().default(""),
	sd_cchatu_8_upscaler: o().default("Latent"),
	sd_cupscale_factor: o().default("1"),
	sd_chires_fix: o().default("false"),
	sd_chires_steps: o().default("0"),
	sd_cdenoising_strength: o().default("0.7"),
	sd_cclip_skip: o().default("2"),
	sd_cadetailer: o().default("false"),
	restoreFaces: o().default("false"),
	sd_cchatu_8_samplerName: o().default("DPM++ 2M"),
	comfyuisamplerName: o().default(""),
	comfyuiCLIPName: o().default(""),
	comfyui_scheduler: o().default(""),
	comfyui_vae: o().default(""),
	novelai_sampler: o().default("k_euler"),
	zidongdianji: G.default("false"),
	zidongdianji2: G.default("false"),
	longPressToEdit: G.default("false"),
	clickToPreview: G.default("true"),
	nai3VibeTransfer: G.default("false"),
	enableVibeGroupTransfer: G.default("false"),
	randomVibeGroup: G.default("false"),
	normalizeRefStrength: G.default("false"),
	nai3CharRef: G.default("false"),
	nai3StylePerception: G.default("false"),
	InformationExtracted: o().default("0.3"),
	ReferenceStrength: o().default("0.6"),
	nai3Deceisp: G.default("true"),
	nai3Variety: G.default("true"),
	Schedule: o().default("karras"),
	MODEL_NAME: o().default(""),
	c_fenwei: o().default("0.8"),
	c_xijie: o().default("0.8"),
	c_idquanzhong: o().default("1.10"),
	c_quanzhong: o().default("0.8"),
	ipa: o().default("STANDARD (medium strength)"),
	dbclike: G.default("false"),
	collapseImage: G.default("false"),
	workers: m(o(), o()).default({}),
	workerid: o().default(""),
	worker: o().default(""),
	editWorkerid: o().default(""),
	editWorker: o().default(""),
	novelaimode: o().default("nai-diffusion-4-5-full"),
	novelaisite: o().default(""),
	novelaiOtherSite: o().default("http://localhost:9696/get-new-token"),
	enableCloudQueue: G.default("false"),
	cloudQueueUrl: o().default("https://st-chatu-novelai-queue.hf.space"),
	cloudQueueGreeting: o().default(""),
	showQueueGreeting: G.default("true"),
	displayMode: o().default(""),
	heavyFrontendMode: G.default("false"),
	insertOriginalText: G.default("false"),
	tagthinkEcho: G.default("false"),
	historyKeepImageTag: u().default(!1),
	enablePregen: G.default("false"),
	autoLLMImageGen: G.default("false"),
	imageAlignment: o().default("center"),
	imageSizeScale: o().default("100"),
	imageGenInterval: i().default(100),
	ai_temperature: i().default(1),
	ai_top_p: i().default(1),
	ai_presence_penalty: i().default(0),
	ai_frequency_penalty: i().default(0),
	ai_stream: G.default("false"),
	ai_private: G.default("true"),
	ai_token: o().default(""),
	ai_test_system: o().default("You are a helpful assistant."),
	ai_test_user: o().default("What is the capital of France?"),
	ai_test_output: o().default(""),
	chatu8_ai_assistant: Ge.default(Ke),
	chatu8_code: o().default(""),
	asr: qe.default(Je),
	knowledgeBaseConfig: Ye.default(Xe),
	llm_history_depth: i().default(2),
	imageGenStats: Qe.default($e),
	llm_profiles: m(o(), Le).default({}),
	current_llm_profile: o().default(""),
	llm_request_type_profiles: m(o(), Y).default({}),
	current_llm_request_type_profile: o().default(""),
	llm_request_type_configs: Y.default(Re),
	test_context_profiles: m(o(), Be).default({}),
	current_test_context_profile: o().default(""),
	translation_model: o().default("mistral"),
	translation_system_prompt: o().default(""),
	AI_use_coords: G.default("true"),
	fabThemes: m(o(), Ne).default({}),
	chatu8_fab_theme: o().default(""),
	enable_chatu8_fab: u().default(!0),
	enable_chatu8_fab_video: u().default(!1),
	enable_chatu8_desktop_pet: u().default(!1),
	chatu8_fab_bg_color: o().default("#ADD8E6"),
	chatu8_fab_icon_color: o().default("#FFFFFF"),
	chatu8_fab_icon_image_id: o().default(""),
	chatu8_fab_opacity: i().default(1),
	chatu8_fab_size: a({
		desktop: i(),
		mobile: i()
	}).default({
		desktop: 50,
		mobile: 40
	}),
	chatu8_fab_position: a({
		desktop: a({
			top: o(),
			left: o()
		}),
		mobile: a({
			top: o(),
			left: o()
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
		idle: o(),
		dragging: o()
	}).default({
		idle: "",
		dragging: ""
	}),
	lastTab: o().default("main"),
	cacheStorageMigrated: u().default(!1),
	worldBookEnabled: G.default("false"),
	worldBookList: m(o(), a({ content: o() })).default({}),
	worldBookList_id: o().default(""),
	vocabulary_search_startswith: G.default("false"),
	vocabulary_search_limit: i().default(100),
	vocabulary_search_sort: o().default("hot_desc"),
	jiuguanchucun: G.default("false"),
	vibeJiuguanchucun: G.default("true"),
	convertToJpegStorage: G.default("false"),
	jiuguanStorage: m(o(), a({
		images: p(a({
			uuid: o(),
			path: o(),
			thumbnail_uuid: o(),
			thumbnail_path: o(),
			date: i(),
			isVideo: u(),
			originalUrl: o(),
			size: i(),
			thumbnail_size: i(),
			genParams: m(o(), l()).nullable().optional(),
			data_base64: o().optional()
		})),
		index: i(),
		change: o()
	})).default({}),
	banana: Ue.default(We),
	bananaCharacterPresets: m(o(), He).default({}),
	bananaCharacterPresetId: o().default(""),
	gestureEnabled: u().default(!1),
	clickTriggerEnabled: u().default(!0),
	gesture1: p(o()).default([]),
	gesture2: p(o()).default([]),
	gestureShowRecognition: u().default(!0),
	gestureShowTrail: u().default(!0),
	gestureTrailColor: o().default("#00ff00"),
	gestureMatchThreshold: i().default(60),
	defaultCharDemand: o().default(""),
	defaultImageDemand: o().default(""),
	novelai_profiles: m(o(), Fe).default({}),
	novelai_profile_id: o().default(""),
	comfyui_profiles: m(o(), Ie).default({}),
	comfyui_profile_id: o().default(""),
	worldBookConfig: Ze.optional(),
	personaProfiles: et.optional()
}), nt = a({
	uuid: o().min(1),
	path: o().optional(),
	thumbnail_uuid: o().min(1).optional(),
	thumbnail_path: o().optional(),
	date: i().int().nonnegative(),
	isVideo: u(),
	originalUrl: o(),
	size: i().int().nonnegative(),
	thumbnail_size: i().int().nonnegative(),
	genParams: m(o(), l()).nullable().optional(),
	data_base64: o().min(1).optional()
}), rt = a({
	images: p(nt),
	index: i().int().nonnegative(),
	change: o()
}), it = a({
	id_index: o().min(1),
	fileName: o().min(1),
	name: o().min(1)
}), at = a({
	fileName: o().min(1),
	name: o().min(1),
	hot: i().int().optional()
}), ot = a({
	id: o().min(1),
	data_base64: o().min(1),
	date: i().int().nonnegative()
}), st = a({
	tupianhuancun_metadata: m(o(), rt),
	tupianhuancun_blobs: m(o(), o().min(1)),
	groups: p(it),
	subgroups: p(it),
	tags: p(at),
	config_images: p(ot)
}), ct = a({
	tag: o().min(1),
	regex: o().optional(),
	locked: u().optional()
}), lt = a({
	chat_id: o().min(1),
	message_id: i().int().nonnegative(),
	role: r([
		"user",
		"assistant",
		"system"
	]),
	mes: o(),
	swipe_id: i().int().nonnegative().nullable(),
	extra: a({
		images: m(o(), p(ct)).optional(),
		lockedTags: p(o()).optional()
	}).optional()
});
a({ messages: p(lt) }), a({
	chatu8_uid: o().optional(),
	migration_flags: m(o(), o())
});
//#endregion
//#region src/storage/active_namespace.ts
var ut = /* @__PURE__ */ new Set(["import_ready", "ready_to_switch"]);
async function dt(e, t, n) {
	let r = await n.with_marker_transaction(t, (e) => e.get_marker());
	if (r === null) throw Error(`Namespace marker is missing for namespace "${t}"`);
	if (r.namespace !== t) throw Error(`Namespace marker belongs to "${r.namespace}", expected "${t}"`);
	if (!ut.has(r.state)) throw Error(`Namespace "${t}" is not ready to switch (state: "${r.state}")`);
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
var ft = 10;
function pt(e) {
	return [...new Set(e.issues.map((e) => e.path.length > 0 ? e.path.join(".") : "(root)"))].slice(0, ft).join(", ");
}
function mt(e, t) {
	return {
		jiuguan_image_count: Object.values(e.jiuguanStorage).reduce((e, t) => e + t.images.length, 0),
		gallery_image_count: Object.values(t?.tupianhuancun_metadata ?? {}).reduce((e, t) => e + t.images.length, 0),
		config_image_count: t?.config_images.length ?? 0
	};
}
async function ht(e) {
	let t = await e.read_settings();
	if (t == null) return { kind: "absent" };
	let n = await e.read_gallery_database(), r = me(JSON.stringify({
		settings: t,
		gallery: n ?? null
	})), i = Oe(t);
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
	let a = tt.safeParse(t);
	if (!a.success) return {
		kind: "invalid",
		fingerprint: r,
		message: `Legacy settings failed schema validation: ${pt(a.error)}`
	};
	let o;
	if (n != null) {
		let e = st.safeParse(n);
		if (!e.success) return {
			kind: "invalid",
			fingerprint: r,
			message: `Legacy gallery database failed schema validation: ${pt(e.error)}`
		};
		o = e.data;
	}
	let s = a.data;
	return {
		kind: "present",
		settings: s,
		gallery: o,
		fingerprint: r,
		inventory: mt(s, o)
	};
}
function gt(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
function _t(e, t) {
	let n = /* @__PURE__ */ new Map(), r = (e) => {
		if (e === void 0) return;
		let t = gt(e);
		n.set(E(t), t);
	};
	for (let t of Object.values(e.jiuguanStorage)) for (let e of t.images) r(e.data_base64);
	for (let e of Object.values(t?.tupianhuancun_metadata ?? {})) for (let n of e.images) r(n.data_base64 ?? t?.tupianhuancun_blobs[n.uuid]);
	for (let e of t?.config_images ?? []) r(e.data_base64);
	return n;
}
function vt(e) {
	let t = "";
	for (let n of e) t += String.fromCharCode(n);
	return btoa(t);
}
async function yt(e, t) {
	let n = Object.entries(e.jiuguanStorage);
	if (n.length === 0) return e;
	let r = {};
	for (let [e, i] of n) {
		let n = await Promise.all(i.images.map(async (e) => {
			if (e.data_base64 !== void 0) return e;
			let n = await t.resolve_host_image(e.path);
			return n === null ? e : {
				...e,
				data_base64: vt(n)
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
function bt(e, t, n) {
	return `tavern_canvas:${e}:${t}:${n}`;
}
async function xt(e, t, n) {
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
	let i = bt(t, e.provider_profile_id, e.credential_kind);
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
async function St(e, t, n) {
	let r = [];
	for (let i of e) r.push(await xt(i, t, n));
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
}, Ct = {
	novelai: (e) => e.novelai_profile_id,
	comfyui: (e) => e.comfyui_profile_id,
	llm: (e) => e.current_llm_profile
};
function wt(e, t, n) {
	if (e.mode === "banana") {
		let e = k(`${t}:provider_converter:openai_image:banana`);
		return n.some((t) => t.id === e) ? e : null;
	}
	let r = Ct[e.mode]?.(e);
	if (r == null) return null;
	let i = k(`${t}:provider_converter:${e.mode}:${r}`);
	return n.some((e) => e.id === i) ? i : null;
}
function Tt(e, t, n, r) {
	let i = {
		namespace: n,
		migrated_at: r
	}, a = be(e, i), o = xe(e, i), s = Se(e, i), c = Ce(e, t, i), l = we(e, i), u = Te(e, i), d = De(e, t, i), f = wt(e, n, o.records), p = [
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
async function Et(e, t, n, r, i) {
	let a = await t.image_records.get(n, r.id, e) !== null;
	if (await t.image_records.put(n, r, e), a) return;
	let o = i.get(r.sha256);
	if (o === void 0) throw new $("missing_blob", `No resolved bytes for image ${r.id} (sha256 ${r.sha256})`, "assets_gallery");
	let s = await t.image_blobs.get(r.sha256, e);
	if (s === null) {
		let n = ie(o), i = new Uint8Array(o), a = {
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
var Dt = [
	"provider",
	"secrets",
	"prompts",
	"assets",
	"characters",
	"knowledge",
	"gallery",
	"settings"
];
async function Ot(e, t) {
	let { database: n, namespace: r, plan: i, bytes_by_sha256: a, migrated_at: o } = t, s = re(n);
	switch (e) {
		case "provider": return y(n, ["provider_profiles"], async (e) => {
			for (let t of i.provider_profiles) await s.provider_profiles.put(r, t, e);
			return i.provider_profiles.length;
		});
		case "secrets": {
			if (t.settings.get_settings().gateway.endpoint !== null) return 0;
			let e = await St(i.secret_transfers, r, t.secret_destination), n = e.records.find((e) => e.status === "blocked");
			if (n !== void 0) throw new $("secret_transfer_blocked", `Secret transfer blocked for credential "${n.credential_kind}" (${n.reason}); configure SillyTavern secret storage or a Gateway profile and retry`, "secrets");
			return e.records.length;
		}
		case "prompts": return y(n, ["prompt_presets", "regex_rules"], async (e) => {
			for (let t of i.prompt_presets) await s.prompt_presets.put(r, t, e);
			for (let t of i.regex_rules) await s.regex_rules.put(r, t, e);
			return i.prompt_presets.length + i.regex_rules.length;
		});
		case "assets": return y(n, [
			"comfy_workflows",
			"novelai_vibes",
			"image_records",
			"image_blobs"
		], async (e) => {
			for (let t of i.comfy_workflows) await s.comfy_workflows.put(r, t, e);
			for (let t of i.novelai_vibes) await s.novelai_vibes.put(r, t, e);
			for (let t of i.asset_image_records) await Et(e, s, r, t, a);
			return i.comfy_workflows.length + i.novelai_vibes.length + i.asset_image_records.length;
		});
		case "characters": return y(n, ["character_profiles"], async (e) => {
			for (let t of i.character_profiles) await s.character_profiles.put(r, t, e);
			return i.character_profiles.length;
		});
		case "knowledge": return y(n, ["knowledge_entries"], async (e) => {
			for (let t of i.knowledge_entries) await s.knowledge_entries.put(r, t, e);
			return i.knowledge_entries.length;
		});
		case "gallery": return y(n, [
			"image_records",
			"image_blobs",
			"vocabularies",
			"vocabulary_groups"
		], async (e) => {
			for (let t of i.gallery_image_records) await Et(e, s, r, t, a);
			for (let t of i.vocabularies) await s.vocabularies.put(r, t, e);
			for (let t of i.vocabulary_groups) await s.vocabulary_groups.put(r, t, e);
			return i.gallery_image_records.length + i.vocabularies.length + i.vocabulary_groups.length;
		});
		case "settings": return y(n, ["legacy_preferences"], async (e) => (await s.legacy_preferences.put(r, {
			schema_version: 1,
			id: i.legacy_preferences_id,
			namespace: r,
			record_key: `${r}:${i.legacy_preferences_id}`,
			created_at: o,
			updated_at: o,
			payload: v(i.legacy_preferences_payload)
		}, e), 1));
	}
}
async function kt(e, t, n, r) {
	let i = re(e), a = {
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
		if (E(t.blob instanceof Blob ? new Uint8Array(await t.blob.arrayBuffer()) : new Uint8Array(t.blob)) !== e) throw new $("hash_mismatch", `Stored blob ${e} no longer hashes to its key`, "verifying");
	}
	return s;
}
async function At(e) {
	let { database: t, settings: n, legacy_source: r, image_resolver: i, secret_destination: a } = e, o = e.migrated_at ?? (/* @__PURE__ */ new Date()).toISOString(), s = se(t), c = await ht(r);
	if (c.kind === "absent") return await s.save(oe, {
		state: "not_required",
		checked_at: o
	}, o), { status: "not_required" };
	let l = `${ce}${k(c.fingerprint)}`, u = await s.load(l);
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
		let e = await yt(c.settings, i);
		try {
			m = Tt(e, c.gallery, l, o);
		} catch (e) {
			throw e instanceof $ ? e : new $("converter_error", e instanceof Error ? e.message : String(e), "convert");
		}
		let r = _t(e, c.gallery);
		await g("copying");
		for (let e of Dt) {
			if (f.has(e)) continue;
			let i = await Ot(e, {
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
		await g("verifying"), h = await kt(t, l, m, c.inventory), await g("ready_to_switch");
		try {
			await dt(n, l, ae(t));
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
export { At as run_migration };
