import { n as e, r as t, t as n } from "./sha2-BGNex9vj.js";
import { Ct as r, S as i, St as a, _t as o, bt as s, gt as c, lt as l, mt as u, st as d, ut as f, vt as p, xt as m, yt as h } from "./src-B1pCVwkN.js";
import { C as g, b as _, d as v, g as ee, k as y, w as te, y as ne } from "./job_repository-Cci2nOvt.js";
import { a as b, d as x, l as re } from "./business_repositories-CSXCQSWl.js";
import { i as ie, n as ae, r as oe, t as se } from "./migration_journal-D7Tj2ayV.js";
//#region ../../tools/v2_migration/src/conversion_result.ts
function S(e, t) {
	return `${e}:${t}`;
}
function C(e, t) {
	return {
		schema_version: 1,
		id: t,
		namespace: e.namespace,
		record_key: S(e.namespace, t),
		created_at: e.migrated_at,
		updated_at: e.migrated_at
	};
}
var ce = s({
	schema_version: u(1),
	id: te,
	namespace: ee,
	record_key: m().min(1),
	created_at: g,
	updated_at: g
});
//#endregion
//#region ../../tools/v2_migration/src/inventory.ts
function w(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function T(e, t = []) {
	if (!w(e)) return [];
	let n = [];
	for (let r of Object.keys(e)) {
		let i = [...t, r];
		n.push({
			segments: i,
			path: i.join(".")
		}), n.push(...T(e[r], i));
	}
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/path_rules.ts
function le(e, t) {
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
function E(e, t) {
	let n;
	for (let r of t) {
		let t = le(r.pattern, e);
		t !== null && (n === void 0 || t > n.score) && (n = {
			rule: r,
			score: t
		});
	}
	return n?.rule;
}
//#endregion
//#region ../../tools/v2_migration/src/settings_path_registry.ts
function ue(e, t) {
	return {
		pattern: e,
		classification: "mapped",
		converter: t
	};
}
var de = [
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
], fe = [
	["st_chatu8_sd_auth", "sd_webui_auth"],
	["novelaiApi", "novelai_token"],
	["novelaiApi_id", "novelai_token"],
	["novelai_profiles.*.novelaiApi", "novelai_token"],
	["banana.apiKey", "banana_api_key"],
	["chatu8_ai_assistant.api_key", "chatu8_ai_assistant_api_key"],
	["llm_profiles.*.api_key", "llm_profile_api_key"],
	["ai_token", "legacy_ai_token"]
], D = [
	...de.map(([e, t]) => ue(e, t)),
	...fe.map(([e, t]) => ({
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
function O(r) {
	return e(n(t(r)));
}
function k(t) {
	return e(n(t));
}
function pe(e, r) {
	let i = new Uint8Array(r), a = 0, o = 0;
	for (; a < r;) {
		let s = n(t(`${e}::${String(o)}`)), c = Math.min(s.length, r - a);
		i.set(s.subarray(0, c), a), a += c, o += 1;
	}
	return i;
}
var me = "0123456789abcdef";
function he(e, t) {
	let n = e[t];
	if (n === void 0) throw RangeError(`Missing byte at index ${String(t)}`);
	return n;
}
function ge(e) {
	return me.charAt(e >> 4) + me.charAt(e & 15);
}
function A(e) {
	let t = pe(e, 16);
	t[6] = he(t, 6) & 15 | 80, t[8] = he(t, 8) & 63 | 128;
	let n = Array.from(t, ge).join("");
	return `${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20, 32)}`;
}
//#endregion
//#region ../../tools/v2_migration/src/legacy_coercion.ts
function j(e, t = !1) {
	return typeof e == "boolean" ? e : e === "true" || e !== "false" && t;
}
function M(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
//#endregion
//#region ../../tools/v2_migration/src/payload_extraction.ts
function _e(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (r.classification !== "mapped" || r.converter !== t) continue;
		let [e] = r.pattern.split(".");
		e !== void 0 && n.add(e);
	}
	return [...n].toSorted();
}
function N(e, t, n) {
	let r = {};
	for (let i of _e(t, n)) Object.hasOwn(e, i) && (r[i] = e[i]);
	return r;
}
function P(e, t, n) {
	if (!w(e)) return e;
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		let e = [...t, i];
		E(e, n)?.classification !== "deferred_secret_transfer" && (r[i] = P(a, e, n));
	}
	return r;
}
function F(e) {
	return y(e), e;
}
//#endregion
//#region ../../tools/v2_migration/src/converters/settings_converter.ts
var ve = ce.extend({ payload: h(m(), r()) });
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
	], r = i.parse({
		schema_version: 1,
		active_namespace: t.namespace,
		locale: "auto",
		credential_storage_mode: "host",
		active_provider_profile_id: null,
		global_concurrency: 1,
		auto_generation_enabled: j(e.autoLLMImageGen),
		fallback_generation_enabled: j(e.enablePregen),
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
	}), a = A(`${t.namespace}:legacy_preferences:settings_converter`), o = F(N(e, D, "settings_converter"));
	return {
		settings: r,
		legacy_preferences: ve.parse({
			schema_version: 1,
			id: a,
			namespace: t.namespace,
			record_key: S(t.namespace, a),
			created_at: t.migrated_at,
			updated_at: t.migrated_at,
			payload: o
		}),
		warnings: n
	};
}
//#endregion
//#region ../../tools/v2_migration/src/converters/provider_converter.ts
function I(e, t, n, r) {
	return ne.parse({
		...C(e, t),
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
	let n = [], r = [], i = [], a = A(`${t.namespace}:provider_converter:legacy_all`), o = P(N(e, D, "provider_converter"), [], D);
	i.push(I(t, a, "legacy_all", o)), n.push({
		path: "mode",
		message: `v2 "mode" was ${JSON.stringify(e.mode)}; the migration runner resolves this to active_provider_profile_id.`
	});
	for (let [n, a] of Object.entries(e.novelai_profiles)) {
		let e = A(`${t.namespace}:provider_converter:novelai:${n}`);
		i.push(I(t, e, "novelai", L(a, ["novelaiApi"]))), R(r, a.novelaiApi, {
			credential_kind: "novelai_token",
			source_path: `novelai_profiles.${n}.novelaiApi`,
			provider_profile_id: e
		});
	}
	for (let [n, r] of Object.entries(e.comfyui_profiles)) {
		let e = A(`${t.namespace}:provider_converter:comfyui:${n}`);
		i.push(I(t, e, "comfyui", { ...r }));
	}
	for (let [n, a] of Object.entries(e.llm_profiles)) {
		let e = A(`${t.namespace}:provider_converter:llm:${n}`);
		i.push(I(t, e, "llm", L(a, ["api_key"]))), R(r, a.api_key, {
			credential_kind: "llm_profile_api_key",
			source_path: `llm_profiles.${n}.api_key`,
			provider_profile_id: e
		});
	}
	let s = A(`${t.namespace}:provider_converter:openai_image:banana`);
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
	let c = A(`${t.namespace}:provider_converter:llm:chatu8_ai_assistant`);
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
		...C(e, t),
		payload: F(n)
	});
}
function B(e, t, n) {
	return _.regex_rules.parse({
		...C(e, t),
		payload: F(n)
	});
}
function xe(e, t) {
	let n = [], r = [], i = [], a = A(`${t.namespace}:prompt_converter:legacy_all`);
	r.push(z(t, a, N(e, D, "prompt_converter")));
	for (let [n, i] of Object.entries(e.yushe)) {
		let e = A(`${t.namespace}:prompt_converter:yushe:${n}`);
		r.push(z(t, e, {
			kind: "yushe",
			name: n,
			...i
		}));
	}
	for (let [n, i] of Object.entries(e.test_context_profiles)) {
		let e = A(`${t.namespace}:prompt_converter:test_context:${n}`);
		r.push(z(t, e, {
			kind: "llm_test_context",
			name: n,
			...i
		}));
	}
	let o = A(`${t.namespace}:prompt_converter:persona_ai_defaults`);
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
		let e = A(`${t.namespace}:prompt_converter:prompt_replace:${n}`);
		i.push(B(t, e, {
			kind: "prompt_replace",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.regex_profiles)) {
		let e = A(`${t.namespace}:prompt_converter:regex_profile:${n}`);
		i.push(B(t, e, {
			kind: "regex_profile",
			name: n,
			...r
		}));
	}
	for (let [n, r] of Object.entries(e.word_replacement_profiles)) {
		let e = A(`${t.namespace}:prompt_converter:word_replacement:${n}`);
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
		...C(e, t),
		payload: F(n)
	});
}
function H(e, t, n) {
	return _.novelai_vibes.parse({
		...C(e, t),
		payload: F(n)
	});
}
function Se(e, t, n) {
	let r = [], i = [], a = [], o = [], s = A(`${n.namespace}:asset_converter:legacy_all`);
	i.push(V(n, s, N(e, D, "asset_converter")));
	for (let [t, r] of Object.entries(e.workers)) {
		let e = A(`${n.namespace}:asset_converter:workers:${t}`);
		i.push(V(n, e, {
			kind: "workflow",
			name: t,
			workflow_json: r
		}));
	}
	let c = A(`${n.namespace}:asset_converter:edit_workflow`);
	i.push(V(n, c, {
		kind: "edit_workflow",
		editWorkerid: e.editWorkerid,
		editWorker: e.editWorker
	}));
	let l = A(`${n.namespace}:asset_converter:inpaint_defaults`);
	i.push(V(n, l, {
		kind: "inpaint_lora_defaults",
		inpaint_denoise: e.inpaint_denoise,
		inpaint_brush_size: e.inpaint_brush_size,
		inpaint_positive_prompt: e.inpaint_positive_prompt,
		inpaint_negative_prompt: e.inpaint_negative_prompt,
		weilin_lora_fix: e.weilin_lora_fix
	}));
	for (let [t, r] of Object.entries(e.vibePresets)) {
		let e = A(`${n.namespace}:asset_converter:vibe:${t}`);
		a.push(H(n, e, {
			kind: "vibe_preset",
			name: t,
			...r
		}));
	}
	let u = A(`${n.namespace}:asset_converter:vibe_defaults`);
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
		let t = M(e.data_base64), r = k(t), i = A(`${n.namespace}:asset_converter:config_image:${e.id}`);
		o.push(v.parse({
			...C(n, i),
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
		...C(e, t),
		payload: F(n)
	});
}
function Ce(e, t) {
	let n = [], r = [], i = A(`${t.namespace}:character_converter:legacy_all`);
	r.push(U(t, i, N(e, D, "character_converter")));
	let a = e.personaProfiles?.presets ?? {};
	for (let [e, n] of Object.entries(a)) {
		let i = A(`${t.namespace}:character_converter:persona:${e}`);
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
		...C(e, t),
		source_type: n,
		payload: F(r)
	});
}
function we(e, t) {
	let n = [], r = [], i = A(`${t.namespace}:knowledge_converter:legacy_all`);
	r.push(W(t, i, "legacy_all", N(e, D, "knowledge_converter")));
	let a = A(`${t.namespace}:knowledge_converter:knowledge_base_config`);
	r.push(W(t, a, "knowledge_base_config", e.knowledgeBaseConfig));
	for (let [n, i] of Object.entries(e.worldBookList)) {
		let a = A(`${t.namespace}:knowledge_converter:builtin_world_book:${n}`);
		r.push(W(t, a, "builtin_world_book", {
			name: n,
			enabled: e.worldBookEnabled,
			active_entry_id: e.worldBookList_id === n,
			...i
		}));
	}
	if (e.worldBookConfig !== void 0) {
		let n = A(`${t.namespace}:knowledge_converter:send_data_world_book_config`);
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
	return v.parse({
		...C(e, t),
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
	let s = M(r.data_base64), c = k(s);
	return Te(e, A(`${e.namespace}:gallery_converter:${t}:${r.uuid}`), c, i, {
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
	let s = t.tags.filter((e) => e.fileName === G), c = A(`${n.namespace}:gallery_converter:manual_vocabulary`);
	a.push(_.vocabularies.parse({
		...C(n, c),
		payload: {
			kind: "manual_vocabulary",
			tags: s
		}
	}));
	let l = t.groups.filter((e) => e.fileName === G), u = t.subgroups.filter((e) => e.fileName === G);
	for (let e of l) {
		let t = A(`${n.namespace}:gallery_converter:group:${e.id_index}`);
		o.push(_.vocabulary_groups.parse({
			...C(n, t),
			vocabulary_id: c,
			payload: {
				kind: "group",
				...e
			}
		}));
	}
	for (let e of u) {
		let t = A(`${n.namespace}:gallery_converter:subgroup:${e.id_index}`);
		o.push(_.vocabulary_groups.parse({
			...C(n, t),
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
	for (let { segments: r, path: i } of T(e)) {
		let e = E(r, D);
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
var q = a([
	m(),
	c(),
	f()
]), Oe = s({
	fixedPrompt: m(),
	fixedPrompt_end: m(),
	negativePrompt: m()
}), ke = s({
	model: m(),
	infoExtract: c(),
	strength: c(),
	imageId: m().nullable(),
	vibeDataId: m().nullable()
}), Ae = s({
	beforeAfterRegex: m(),
	textRegex: m()
}), je = s({
	textReplacement: m(),
	aiReplacement: m()
}), J = s({ text: m() }), Me = s({
	bgColor: m(),
	iconColor: m(),
	opacity: c()
}), Ne = s({
	bgColor: m().optional(),
	textColor: m().optional(),
	accentColor: m().optional()
}), Pe = s({
	novelaiApi: m(),
	novelaisite: m(),
	novelaiOtherSite: m(),
	enableCloudQueue: m(),
	cloudQueueUrl: m(),
	cloudQueueGreeting: m(),
	showQueueGreeting: m(),
	novelaimode: m(),
	novelai_sampler: m(),
	Schedule: m(),
	nai3Scale: m(),
	cfg_rescale: m(),
	AI_use_coords: m(),
	sm: m(),
	dyn: m(),
	nai3Variety: m(),
	nai3Deceisp: m(),
	enableVibeGroupTransfer: m(),
	randomVibeGroup: m(),
	normalizeRefStrength: m(),
	novelai_width: m(),
	novelai_height: m(),
	novelai_steps: m(),
	novelai_seed: m()
}), Fe = s({
	workerid: m(),
	worker: m(),
	editWorkerid: m(),
	editWorker: m(),
	comfyuiUrl: m(),
	MODEL_NAME: m(),
	comfyuisamplerName: m(),
	comfyui_vae: m(),
	comfyui_scheduler: m(),
	comfyuiCLIPName: m(),
	comfyui_width: m(),
	comfyui_height: m(),
	comfyui_steps: m(),
	comfyui_seed: m(),
	cfg_comfyui: m()
}), Ie = s({
	api_url: m(),
	api_key: m(),
	model: m(),
	temperature: c(),
	top_p: c(),
	max_tokens: c(),
	stream: f(),
	bypass_proxy: f()
}), Y = s({
	api_profile: m(),
	context_profile: m()
}), X = {
	api_profile: "",
	context_profile: ""
}, Z = s({
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
}, Re = s({
	id: m(),
	name: m(),
	role: d([
		"system",
		"user",
		"assistant"
	]),
	content: m(),
	enabled: f(),
	triggerMode: d(["always", "trigger"]),
	triggerWords: m(),
	andTriggerWords: m()
}), ze = s({ entries: l(Re) }), Q = s({
	user: s({
		text: m(),
		image: m()
	}),
	model: s({
		text: m(),
		image: m()
	})
}), Be = s({
	fixedPrompt: m(),
	postfixPrompt: m(),
	conversation: l(Q)
}), Ve = s({
	triggers: m(),
	conversation: Q
}), He = s({
	apiKey: m(),
	apiUrl: m(),
	model: m(),
	editModel: m(),
	videoModel: m(),
	aspectRatio: m(),
	imageSize: m(),
	useGrokFormat: m(),
	conversationPresetId: m(),
	editPresetId: m(),
	videoPresetId: m(),
	conversationPresets: h(m(), Be),
	prompt_replace: h(m(), J),
	prompt_replace_id: m()
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
}, We = s({
	api_url: m(),
	api_key: m(),
	model: m(),
	bypass_proxy: f(),
	stream: f(),
	system_prompt: m()
}), Ge = {
	api_url: "",
	api_key: "",
	model: "mistral",
	bypass_proxy: !1,
	stream: !0,
	system_prompt: ""
}, Ke = s({
	enabled: f(),
	asrServerUrl: m(),
	mode: d(["vad", "ptt"]),
	silenceTimeout: c(),
	vadThreshold: c(),
	maxKeepDuration: c(),
	language: m(),
	appendMode: f(),
	autoSend: f(),
	conversationMode: f()
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
}, Je = s({
	enabled: f(),
	triggerDepth: c(),
	worldBookSelections: h(m(), a([f(), u("force")])),
	worldEntrySelections: h(m(), h(m(), a([f(), u("force")])))
}), Ye = {
	enabled: !1,
	triggerDepth: 1,
	worldBookSelections: {},
	worldEntrySelections: {}
}, Xe = s({
	worldBookSelections: h(m(), a([f(), u("force")])),
	worldEntrySelections: h(m(), h(m(), a([f(), u("force")])))
}), Ze = s({
	backends: s({
		sd: s({
			success: c(),
			fail: c()
		}),
		comfyui: s({
			success: c(),
			fail: c()
		}),
		banana: s({
			success: c(),
			fail: c()
		}),
		novelai: s({
			success: c(),
			fail: c()
		})
	}),
	total: s({
		success: c(),
		fail: c()
	}),
	firstGenTime: c().nullable(),
	lastGenTime: c().nullable(),
	daily: h(m(), r())
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
}, $e = s({
	presets: h(m(), h(m(), r())),
	currentPresetId: m().optional(),
	enabled: f().optional(),
	injectionMode: m().optional(),
	currentUserPresetId: m().optional(),
	userEnabled: f().optional(),
	userInjectionMode: m().optional()
}), et = s({
	model: m(),
	temperature: c(),
	systemPrompt: m(),
	lastPrompt: m()
}), tt = {
	model: "mistral",
	temperature: .8,
	systemPrompt: "",
	lastPrompt: ""
}, nt = o({
	theme_id: m().default(""),
	themes: h(m(), Ne).default({}),
	generate_btn_style: m().default(""),
	image_frame_style: m().default(""),
	collapse_style: m().default(""),
	scriptEnabled: f().default(!1),
	helpTipsEnabled: q.default("true"),
	characterAI: et.default(tt),
	outfitAI: et.default(tt),
	newlineFixEnabled: q.default("true"),
	yushe: h(m(), Oe).default({}),
	yusheid_sd: m().default(""),
	yusheid_novelai: m().default(""),
	yusheid_comfyui: m().default(""),
	randomYushe: q.default("false"),
	aiAutonomousResolution: f().default(!0),
	prompt_replace: h(m(), J).default({}),
	prompt_replace_id: m().default(""),
	vibePresets: h(m(), ke).default({}),
	vibePresetId: m().default(""),
	regex_profiles: h(m(), Ae).default({}),
	current_regex_profile: m().default(""),
	word_replacement_profiles: h(m(), je).default({}),
	current_word_replacement_profile: m().default(""),
	regexTestMode: f().default(!1),
	mode: m().default("comfyui"),
	client: m().default("browser"),
	cache: m().default("1"),
	sdUrl: m().default("http://localhost:7860"),
	st_chatu8_sd_auth: m().default(""),
	comfyuiUrl: m().default("http://localhost:8188"),
	novelaiApi: m().default("000000"),
	novelaiApi_id: m().default("000000"),
	startTag: m().default("image###"),
	endTag: m().default("###"),
	nai3Scale: m().default("10"),
	sdCfgScale: m().default("7"),
	sm: m().default("true"),
	dyn: m().default("true"),
	cfg_rescale: m().default("0.18"),
	AQT_sd: m().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_sd: m().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	AQT_novelai: m().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_novelai: m().default("Heavy"),
	addFurryDataset: q.default("false"),
	AQT_comfyui: m().default("best quality, amazing quality, very aesthetic, absurdres"),
	UCP_comfyui: m().default("bad proportions, out of focus, username, text, bad anatomy, lowres, worstquality, watermark, cropped, bad body, deformed, mutated, disfigured, poorly drawn face, malformed hands, extra arms, extra limb, missing limb, too many fingers, extra legs, bad feet, missing fingers, fused fingers, acnes, floating limbs, disconnected limbs, long neck, long body, mutation, ugly, blurry, low quality, sketches, normal quality, monochrome, grayscale, signature, logo, jpeg artifacts, unfinished, displeasing, chromatic aberration, extra digits, artistic error, scan, abstract, photo, realism, screencap"),
	sd_csteps: m().default("28"),
	sd_cwidth: m().default("1024"),
	sd_cheight: m().default("1024"),
	sd_cseed: m().default("-1"),
	novelai_steps: m().default("28"),
	novelai_width: m().default("1024"),
	novelai_height: m().default("1024"),
	novelai_seed: m().default("0"),
	comfyui_steps: m().default("28"),
	comfyui_width: m().default("1024"),
	comfyui_height: m().default("1024"),
	comfyui_seed: m().default("0"),
	inpaint_denoise: m().default("0.75"),
	weilin_lora_fix: q.default("false"),
	inpaint_brush_size: c().default(30),
	inpaint_positive_prompt: m().default(""),
	inpaint_negative_prompt: m().default(""),
	cfg_comfyui: m().default("6"),
	sd_cchatu_8_model: m().default(""),
	sd_cchatu_8_vae: m().default("Automatic"),
	sd_cchatu_8_scheduler: m().default(""),
	sd_cchatu_8_upscaler: m().default("Latent"),
	sd_cupscale_factor: m().default("1"),
	sd_chires_fix: m().default("false"),
	sd_chires_steps: m().default("0"),
	sd_cdenoising_strength: m().default("0.7"),
	sd_cclip_skip: m().default("2"),
	sd_cadetailer: m().default("false"),
	restoreFaces: m().default("false"),
	sd_cchatu_8_samplerName: m().default("DPM++ 2M"),
	comfyuisamplerName: m().default(""),
	comfyuiCLIPName: m().default(""),
	comfyui_scheduler: m().default(""),
	comfyui_vae: m().default(""),
	novelai_sampler: m().default("k_euler"),
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
	InformationExtracted: m().default("0.3"),
	ReferenceStrength: m().default("0.6"),
	nai3Deceisp: q.default("true"),
	nai3Variety: q.default("true"),
	Schedule: m().default("karras"),
	MODEL_NAME: m().default(""),
	c_fenwei: m().default("0.8"),
	c_xijie: m().default("0.8"),
	c_idquanzhong: m().default("1.10"),
	c_quanzhong: m().default("0.8"),
	ipa: m().default("STANDARD (medium strength)"),
	dbclike: q.default("false"),
	collapseImage: q.default("false"),
	workers: h(m(), m()).default({}),
	workerid: m().default(""),
	worker: m().default(""),
	editWorkerid: m().default(""),
	editWorker: m().default(""),
	novelaimode: m().default("nai-diffusion-4-5-full"),
	novelaisite: m().default(""),
	novelaiOtherSite: m().default("http://localhost:9696/get-new-token"),
	enableCloudQueue: q.default("false"),
	cloudQueueUrl: m().default("https://st-chatu-novelai-queue.hf.space"),
	cloudQueueGreeting: m().default(""),
	showQueueGreeting: q.default("true"),
	displayMode: m().default(""),
	heavyFrontendMode: q.default("false"),
	insertOriginalText: q.default("false"),
	tagthinkEcho: q.default("false"),
	historyKeepImageTag: f().default(!1),
	enablePregen: q.default("false"),
	autoLLMImageGen: q.default("false"),
	imageAlignment: m().default("center"),
	imageSizeScale: m().default("100"),
	imageGenInterval: c().default(100),
	ai_temperature: c().default(1),
	ai_top_p: c().default(1),
	ai_presence_penalty: c().default(0),
	ai_frequency_penalty: c().default(0),
	ai_stream: q.default("false"),
	ai_private: q.default("true"),
	ai_token: m().default(""),
	ai_test_system: m().default("You are a helpful assistant."),
	ai_test_user: m().default("What is the capital of France?"),
	ai_test_output: m().default(""),
	chatu8_ai_assistant: We.default(Ge),
	chatu8_code: m().default(""),
	asr: Ke.default(qe),
	knowledgeBaseConfig: Je.default(Ye),
	llm_history_depth: c().default(2),
	imageGenStats: Ze.default(Qe),
	llm_profiles: h(m(), Ie).default({}),
	current_llm_profile: m().default(""),
	llm_request_type_profiles: h(m(), Z).default({}),
	current_llm_request_type_profile: m().default(""),
	llm_request_type_configs: Z.default(Le),
	test_context_profiles: h(m(), ze).default({}),
	current_test_context_profile: m().default(""),
	translation_model: m().default("mistral"),
	translation_system_prompt: m().default(""),
	AI_use_coords: q.default("true"),
	fabThemes: h(m(), Me).default({}),
	chatu8_fab_theme: m().default(""),
	enable_chatu8_fab: f().default(!0),
	enable_chatu8_fab_video: f().default(!1),
	enable_chatu8_desktop_pet: f().default(!1),
	chatu8_fab_bg_color: m().default("#ADD8E6"),
	chatu8_fab_icon_color: m().default("#FFFFFF"),
	chatu8_fab_icon_image_id: m().default(""),
	chatu8_fab_opacity: c().default(1),
	chatu8_fab_size: s({
		desktop: c(),
		mobile: c()
	}).default({
		desktop: 50,
		mobile: 40
	}),
	chatu8_fab_position: s({
		desktop: s({
			top: m(),
			left: m()
		}),
		mobile: s({
			top: m(),
			left: m()
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
	chatu8_fab_video_paths: s({
		idle: m(),
		dragging: m()
	}).default({
		idle: "",
		dragging: ""
	}),
	lastTab: m().default("main"),
	cacheStorageMigrated: f().default(!1),
	worldBookEnabled: q.default("false"),
	worldBookList: h(m(), s({ content: m() })).default({}),
	worldBookList_id: m().default(""),
	vocabulary_search_startswith: q.default("false"),
	vocabulary_search_limit: c().default(100),
	vocabulary_search_sort: m().default("hot_desc"),
	jiuguanchucun: q.default("false"),
	vibeJiuguanchucun: q.default("true"),
	convertToJpegStorage: q.default("false"),
	jiuguanStorage: h(m(), s({
		images: l(s({
			uuid: m(),
			path: m(),
			thumbnail_uuid: m(),
			thumbnail_path: m(),
			date: c(),
			isVideo: f(),
			originalUrl: m(),
			size: c(),
			thumbnail_size: c(),
			genParams: h(m(), r()).nullable().optional(),
			data_base64: p((e) => e === "" ? void 0 : e, m().min(1).optional())
		})),
		index: c(),
		change: m()
	})).default({}),
	banana: He.default(Ue),
	bananaCharacterPresets: h(m(), Ve).default({}),
	bananaCharacterPresetId: m().default(""),
	gestureEnabled: f().default(!1),
	clickTriggerEnabled: f().default(!0),
	gesture1: l(m()).default([]),
	gesture2: l(m()).default([]),
	gestureShowRecognition: f().default(!0),
	gestureShowTrail: f().default(!0),
	gestureTrailColor: m().default("#00ff00"),
	gestureMatchThreshold: c().default(60),
	defaultCharDemand: m().default(""),
	defaultImageDemand: m().default(""),
	novelai_profiles: h(m(), Pe).default({}),
	novelai_profile_id: m().default(""),
	comfyui_profiles: h(m(), Fe).default({}),
	comfyui_profile_id: m().default(""),
	worldBookConfig: Xe.optional(),
	personaProfiles: $e.optional()
}), rt = s({
	uuid: m().min(1),
	path: m().optional(),
	thumbnail_uuid: m().min(1).optional(),
	thumbnail_path: m().optional(),
	date: c().int().nonnegative(),
	isVideo: f(),
	originalUrl: m(),
	size: c().int().nonnegative(),
	thumbnail_size: c().int().nonnegative(),
	genParams: h(m(), r()).nullable().optional(),
	data_base64: m().min(1).optional()
}), it = s({
	images: l(rt),
	index: c().int().nonnegative(),
	change: m()
}), at = s({
	id_index: m().min(1),
	fileName: m().min(1),
	name: m().min(1)
}), ot = s({
	fileName: m().min(1),
	name: m().min(1),
	hot: c().int().optional()
}), st = s({
	id: m().min(1),
	data_base64: m().min(1),
	date: c().int().nonnegative()
}), ct = s({
	tupianhuancun_metadata: h(m(), it),
	tupianhuancun_blobs: h(m(), m().min(1)),
	groups: l(at),
	subgroups: l(at),
	tags: l(ot),
	config_images: l(st)
}), lt = s({
	tag: m().min(1),
	regex: m().optional(),
	locked: f().optional()
}), ut = s({
	chat_id: m().min(1),
	message_id: c().int().nonnegative(),
	role: d([
		"user",
		"assistant",
		"system"
	]),
	mes: m(),
	swipe_id: c().int().nonnegative().nullable(),
	extra: s({
		images: h(m(), l(lt)).optional(),
		lockedTags: l(m()).optional()
	}).optional()
});
s({ messages: l(ut) }), s({
	chatu8_uid: m().optional(),
	migration_flags: h(m(), m())
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
			fingerprint: O(JSON.stringify({
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
			fingerprint: O(JSON.stringify({
				source: "gallery",
				error: t
			})),
			message: `Legacy gallery database could not be read: ${t}`
		};
	}
	let r;
	try {
		r = O(JSON.stringify({
			settings: t,
			gallery: n ?? null
		}));
	} catch (e) {
		let t = e instanceof Error && e.message.length > 0 ? e.message.slice(0, 240) : "unknown error";
		return {
			kind: "invalid",
			fingerprint: O(JSON.stringify({
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
		t.byteLength !== 0 && n.set(k(t), t);
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
		let e = A(`${t}:provider_converter:openai_image:banana`);
		return n.some((t) => t.id === e) ? e : null;
	}
	let r = wt[e.mode]?.(e);
	if (r == null) return null;
	let i = A(`${t}:provider_converter:${e.mode}:${r}`);
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
		let n = re(o), i = new Uint8Array(o), a = {
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
	let { database: n, namespace: r, plan: i, bytes_by_sha256: a, migrated_at: o } = t, s = b(n);
	switch (e) {
		case "provider": return x(n, ["provider_profiles"], async (e) => {
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
		case "prompts": return x(n, ["prompt_presets", "regex_rules"], async (e) => {
			for (let t of i.prompt_presets) await s.prompt_presets.put(r, t, e);
			for (let t of i.regex_rules) await s.regex_rules.put(r, t, e);
			return i.prompt_presets.length + i.regex_rules.length;
		});
		case "assets": return x(n, [
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
		case "characters": return x(n, ["character_profiles"], async (e) => {
			for (let t of i.character_profiles) await s.character_profiles.put(r, t, e);
			return i.character_profiles.length;
		});
		case "knowledge": return x(n, ["knowledge_entries"], async (e) => {
			for (let t of i.knowledge_entries) await s.knowledge_entries.put(r, t, e);
			return i.knowledge_entries.length;
		});
		case "gallery": return x(n, [
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
		case "settings": return x(n, ["legacy_preferences"], async (e) => (await s.legacy_preferences.put(r, {
			schema_version: 1,
			id: i.legacy_preferences_id,
			namespace: r,
			record_key: `${r}:${i.legacy_preferences_id}`,
			created_at: o,
			updated_at: o,
			payload: y(i.legacy_preferences_payload)
		}, e), 1));
	}
}
async function At(e, t, n, r) {
	let i = b(e), a = {
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
		if (k(t.blob instanceof Blob ? new Uint8Array(await t.blob.arrayBuffer()) : new Uint8Array(t.blob)) !== e) throw new $("hash_mismatch", `Stored blob ${e} no longer hashes to its key`, "verifying");
	}
	return s;
}
async function jt(e) {
	let { database: t, settings: n, legacy_source: r, image_resolver: i, secret_destination: a } = e, o = e.migrated_at ?? (/* @__PURE__ */ new Date()).toISOString(), s = oe(t), c = await gt(r);
	if (c.kind === "absent") return await s.save(ae, {
		state: "not_required",
		checked_at: o
	}, o), { status: "not_required" };
	let l = `${se}${A(c.fingerprint)}`, u = await s.load(l);
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
			await ft(n, l, ie(t));
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
