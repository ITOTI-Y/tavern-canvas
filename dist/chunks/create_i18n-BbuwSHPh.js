import { t as e } from "./vue-i18n-DUz2Gjn8.js";
//#region src/i18n/locale_resolution.ts
var t = "locale_load_failed", n = /* @__PURE__ */ new Set([
	"zh-cn",
	"zh-sg",
	"zh-hans"
]);
function r(e) {
	let t = e.trim().toLowerCase().replaceAll("_", "-");
	return n.has(t) ? "zh-CN" : "en";
}
function i(e, t) {
	return e === "auto" ? r(t) : e;
}
async function a(e, n, r) {
	if (n === "en" || e.availableLocales.includes(n)) return e.locale.value = n, { locale: n };
	let i = r[n];
	if (i === void 0) return e.locale.value = "en", {
		locale: "en",
		error_code: t
	};
	try {
		let t = await i();
		return e.setLocaleMessage(n, t), e.locale.value = n, { locale: n };
	} catch {
		return e.locale.value = "en", {
			locale: "en",
			error_code: t
		};
	}
}
var o = {
	app: {
		name: "Inkwell",
		version_label: "Version {version}",
		entry_description: "Illustrates chat replies with generated images. Settings, the gallery and image services are in the Inkwell window.",
		open_action: "Open Inkwell",
		unsupported_host: {
			title: "JS Slash Runner update required",
			description: "Inkwell needs JS Slash Runner {required_version} or newer. The installed version is {current_version}.",
			update_action: "Open update instructions"
		},
		fatal_error: {
			title: "Inkwell could not start",
			description: "Runtime initialization failed. Reload SillyTavern, then check Diagnostics for details.",
			reload_action: "Reload SillyTavern"
		},
		partial_init: {
			banner_title: "Running with limited functionality",
			banner_description: "Some data failed to load. Retry from Diagnostics or continue with what's available."
		}
	},
	nav: {
		assets: "Assets",
		gallery: "Gallery",
		settings: "Settings",
		inspector_expand: "Expand inspector",
		inspector_collapse: "Collapse inspector",
		task_strip_expand: "Show tasks",
		task_strip_collapse: "Hide tasks",
		task_strip_count: "{n} task | {n} tasks"
	},
	common: {
		actions: {
			save: "Save",
			cancel: "Cancel",
			close: "Close",
			delete: "Delete",
			copy: "Copy",
			copied: "Copied",
			download: "Download",
			search: "Search",
			clear: "Clear",
			deselect_all: "Deselect all",
			back: "Back",
			next: "Next",
			edit: "Edit",
			increase: "Increase",
			decrease: "Decrease"
		},
		labels: { name: "Name" },
		inspector: {
			title: "Inspector",
			empty_title: "Nothing selected",
			empty_description: "Select a job, image, or asset to see its details here.",
			selection: {
				id_label: "ID",
				kind_gallery_record: "Gallery image"
			}
		},
		notifications: {
			viewport_label: "Notifications",
			announce_label: "Notification"
		}
	},
	status: {
		loading: "Loading",
		empty: "Empty",
		partial: "Partial",
		error: "Error",
		disabled: "Disabled",
		success: "Success",
		pending: "Pending",
		running: "Running",
		cancelled: "Cancelled",
		completed: "Completed",
		failed: "Failed",
		retrying: "Retrying",
		online: "Online",
		offline: "Offline",
		connected: "Connected",
		blocked: "Blocked",
		unknown: "Unknown"
	},
	provider: { credentials: { not_stored_locally: "The token is kept in the selected credential storage and never appears in Inkwell UI or exports." } },
	prompt: {
		preset_browser: {
			title: "Presets",
			search_placeholder: "Search presets",
			empty_title: "No presets yet",
			empty_description: "Create a preset from the prompt builder to reuse it across generations.",
			bulk_delete_action: "Delete selected",
			bulk_delete_confirm_title: "Delete {n} preset? | Delete {n} presets?",
			bulk_delete_confirm_description: "This removes the selected presets permanently and cannot be undone.",
			new_preset_action: "New preset",
			random_group_action: "Pick random from group",
			ungrouped_label: "Ungrouped",
			load_error: "Presets failed to load."
		},
		fixed_prompts: {
			positive_label: "Fixed positive prompt",
			positive_placeholder: "Text always added before the generated positive prompt",
			negative_label: "Fixed negative prompt",
			negative_placeholder: "Text always added before the generated negative prompt"
		},
		replacement_rules: {
			title: "Replacement rules",
			add_action: "Add rule",
			trigger_label: "Trigger",
			trigger_placeholder: "Comma-separated triggers",
			triggers_hint: "Separate multiple triggers with commas.",
			replacement_label: "Replacement",
			replacement_placeholder: "Replacement text",
			empty_title: "No replacement rules yet",
			empty_description: "Add a rule to substitute matched text before it reaches the provider."
		},
		regex_rules: {
			title: "Regex rules",
			add_action: "Add regex rule",
			pattern_label: "Pattern",
			pattern_placeholder: "Regular expression pattern",
			flags_label: "Flags",
			test_input_label: "Test text",
			test_action: "Test pattern",
			test_result_label: "Test result",
			invalid_pattern: "This is not a valid regular expression: {message}",
			empty_title: "No regex rules yet",
			empty_description: "Add a rule to transform text with a regular expression before it reaches the provider."
		},
		builder: { title: "Prompt builder" }
	},
	assets: {
		tabs: {
			vocabulary: "Vocabulary",
			characters: "Characters",
			outfits: "Outfits",
			lora: "LoRA",
			vibe: "Vibe",
			workflow: "Workflow"
		},
		vocabulary: {
			search_placeholder: "Search tags",
			empty_title: "No vocabulary loaded yet",
			empty_description: "Install a vocabulary package from the update channel to search and insert tags.",
			tag_count: "{n} tag | {n} tags",
			update_action: "Check for updates",
			import_action: "Import package",
			bundled_label: "Bundled",
			progress_verifying_catalog_manifest: "Verifying catalog manifest",
			progress_downloading: "Downloading package",
			progress_verifying_package: "Verifying package",
			progress_installing: "Installing package",
			nsfw_disclosure_label: "Show packages that may include adult content",
			nsfw_disclosure_hint: "These packages are never installed automatically. Review them before installing."
		},
		characters: {
			empty_title: "No characters saved yet",
			empty_description: "Create a character profile to reuse names, appearance, and context across prompts.",
			add_action: "Add character",
			role_label: "Role",
			appearance_label: "Appearance",
			excluded_traits_label: "Excluded traits",
			excluded_traits_hint: "Tags this character must not show, such as another character's pointy ears; sent as this character's own negative prompt.",
			context_notes_label: "Character context",
			reference_image_label: "Reference image",
			reference_image_hint: "Scaled so the long edge is at most 1536 px and saved with the character.",
			reference_image_unreadable: "This file could not be read as an image.",
			reference_image_remove: "Remove reference image",
			reference_send_label: "Send with NovelAI requests that show this character",
			reference_mode_label: "Use as",
			reference_mode_hint: "Precise reference works on V4.5 only, costs 5 extra Anlas per image and turns off vibe transfer; when several characters use it, only the first is sent. Vibe transfer is not available on V5. Image to image starts from the reference; when several characters use it, only the first is used.",
			reference_mode_vibe: "Vibe transfer",
			reference_mode_img2img: "Image to image",
			reference_mode_precise: "Precise reference"
		},
		outfits: {
			empty_title: "No outfits saved yet",
			empty_description: "Add an outfit to a character to reuse it across generations.",
			add_action: "Add outfit",
			description_label: "Description",
			character_label: "Character",
			character_placeholder: "Select a character"
		},
		lora: {
			empty_title: "No LoRA yet",
			empty_description: "Add a LoRA and link it to a character. SD WebUI requests that show the character get the LoRA and its trigger words.",
			add_action: "Add LoRA",
			file_name_label: "File name",
			file_name_hint: "The LoRA's file name in SD WebUI without the extension, such as seraphina_v2.",
			character_label: "Character",
			character_hint: "A LoRA linked to no character is never added automatically.",
			character_placeholder: "Choose a character",
			weight_label: "Weight",
			trigger_words_label: "Trigger words"
		},
		vibe: {
			empty_title: "No vibe or reference groups yet",
			empty_description: "Add a NovelAI vibe transfer group or a Google reference group to reuse across requests.",
			add_action: "Add group",
			provider_label: "Source",
			provider_novelai: "NovelAI vibe transfer",
			provider_google: "Google reference",
			notes_label: "Notes",
			strength_label: "Strength",
			information_extracted_label: "Information extracted",
			image_label: "Image",
			image_hint: "Resized to at most 1536 px and stored with the group.",
			image_unreadable: "This file could not be read as an image."
		},
		workflow: {
			empty_title: "No ComfyUI workflows imported yet",
			empty_description: "Import a workflow JSON file to map its placeholders to Inkwell inputs.",
			import_action: "Import workflow",
			placeholder_scan_action: "Scan placeholders",
			edit_action: "Edit workflow",
			json_label: "Workflow JSON",
			placeholder_unmapped: "Not mapped",
			target_positive_prompt: "Positive prompt",
			target_negative_prompt: "Negative prompt",
			target_seed: "Seed",
			target_width: "Width",
			target_height: "Height",
			target_steps: "Steps"
		},
		random_selection_action: "Pick random",
		reorder_hint: "Drag to reorder",
		move_up_action: "Move up",
		move_down_action: "Move down",
		drag_handle_label: "Drag to reorder",
		form_dialog_description: "Fields marked * are required.",
		delete_confirm_title: "Delete {name}?",
		delete_confirm_description: "This removes it from your asset library permanently and cannot be undone."
	},
	gallery: {
		empty_title: "No generated images yet",
		empty_description: "Images appear here once a chat reply has been illustrated.",
		filters: {
			title: "Filters",
			provider_label: "Provider",
			date_range_label: "Date range",
			pinned_only_label: "Pinned only",
			orphaned_only_label: "Orphaned only"
		},
		orphan_label: "Not attached to any message",
		cache_occupancy: {
			label: "Local cache usage",
			description: "{used} of {limit} used"
		},
		thumbnail_failed: "Thumbnail unavailable",
		metadata_inspector: {
			title: "Parameters",
			seed_label: "Seed",
			provider_label: "Provider",
			model_label: "Model",
			prompt_label: "Prompt",
			copy_action: "Copy parameters",
			copied_toast: "Parameters copied",
			source_message_action: "Go to source message",
			source_other_chat: "The source message is in another chat; open that chat first.",
			source_not_found: "The source message is not loaded; load earlier messages or check whether it was deleted.",
			parameters_unavailable: "No embedded generation parameters were found in this image."
		},
		selection: {
			selected_count: "{n} image selected | {n} images selected",
			download_action: "Download selected",
			delete_action: "Delete selected",
			delete_confirm_title: "Delete {n} image? | Delete {n} images?",
			delete_confirm_description: "This removes the selected images and their files permanently and cannot be undone.",
			detach_action: "Detach from message",
			detach_confirm_title: "Detach {n} image from this message? | Detach {n} images from this message?",
			detach_confirm_description: "The image stays in Gallery but is no longer linked to this message."
		},
		pin_action: "Pin",
		unpin_action: "Unpin",
		download_action: "Download",
		select_image_action: "Select image",
		open_preview_action: "Open preview"
	},
	diagnostics: {
		capability_matrix: {
			title: "Capability matrix",
			available: "Available",
			unavailable: "Unavailable",
			capabilities: {
				main_generation_events: "Main generation events",
				preset_generation: "Preset generation",
				message_swipe_metadata: "Message swipe records",
				tavern_regex: "Tavern regex scripts",
				tavern_helper: "JS Slash Runner",
				gateway_protocol: "Gateway protocol"
			}
		},
		versions: {
			title: "Versions",
			helper_label: "JS Slash Runner",
			protocol_label: "Gateway protocol"
		},
		connection_tests: {
			title: "Connection tests",
			run_action: "Run tests",
			idle: "No connection test has run yet. A test sends one probe request to the current provider profile.",
			running: "Running connection tests",
			latency_label: "{ms} ms"
		},
		task_timeline: {
			title: "Task timeline",
			empty_description: "Generation and sync activity appear here as they run.",
			error_code_label: "Error code",
			time_label: "Time",
			event_label: "Event",
			module_label: "Module",
			provider_label: "Provider",
			count_label: "{n} event | {n} events"
		},
		storage_usage: {
			title: "Storage",
			estimate_label: "Estimated usage",
			quota_label: "Quota",
			quota_unavailable: "Storage estimate is unavailable on this host.",
			quota_high_pressure: "Storage usage is close to the browser quota. Free space in Gallery or Assets.",
			cache_references_label: "Cached references",
			cache_references_unavailable: "Cache reference count is unavailable on this host."
		},
		support_bundle: {
			title: "Support bundle",
			description: "Includes the version, capability matrix, redacted settings, error codes, and task timeline. It never includes prompts, message content, secrets, or image names.",
			export_action: "Export support bundle",
			exported_toast: "Support bundle exported"
		}
	},
	settings: {
		nav: {
			illustration: "Illustration",
			providers: "Image providers",
			translation: "Translation",
			prompts: "Prompt presets",
			library: "Library",
			connections: "Connections",
			general: "General",
			diagnostics: "Diagnostics"
		},
		illustration: {
			auto_generation_label: "Illustrate every reply automatically",
			auto_generation_hint: "When off, use the image button beside a reply to choose paragraphs and confirm before generating.",
			preset_label: "SillyTavern preset for the analysis",
			preset_placeholder: "Current preset",
			preset_hint: "Leave empty to use the preset loaded in SillyTavern. The analysis request goes through this preset as is, including any jailbreak, obfuscation or output format it applies; choosing and maintaining it is up to you.",
			connection_label: "Analysis connection",
			connection_current: "SillyTavern's current API",
			connection_proxy_preset: "Proxy preset",
			proxy_preset_label: "Proxy preset name",
			proxy_preset_hint: "The exact name of a proxy preset saved in SillyTavern's chat completion settings.",
			proxy_model_label: "Model",
			proxy_model_hint: "Leave empty to keep the preset's model.",
			connection_custom: "Custom API",
			custom_url_label: "API URL",
			custom_url_hint: "An OpenAI-compatible endpoint such as https://example.com/v1. SillyTavern's backend sends the request.",
			custom_invalid: "Enter an http or https URL and a model.",
			custom_model_label: "Model",
			custom_key_label: "API key",
			custom_key_hint: "Stored in the same backend as your other Inkwell credentials. With the SillyTavern secret store chosen under Settings > General, reading it back needs allowKeysExposure in SillyTavern.",
			custom_key_save: "Save key",
			custom_key_clear: "Remove key",
			custom_key_saved: "Key saved.",
			custom_key_cleared: "Key removed.",
			custom_key_failed: "The key could not be changed.",
			chat_history_label: "Chat messages sent with the analysis",
			world_info_label: "World info",
			world_info_chat: "Current chat's books",
			world_info_worldbook: "One book",
			world_info_off: "None",
			world_info_hint: "The current chat's books are what SillyTavern activates from the chat, including global, character and chat books. With one book, only its constant entries and the entries the analyzed reply's keywords activate are sent, in place of what SillyTavern activates.",
			worldbook_label: "Book",
			worldbook_placeholder: "Choose a book",
			worldbook_unavailable: "The book list could not be read. JS-Slash-Runner must be enabled.",
			max_images_label: "Images per reply at most",
			prompt_preset_label: "Prompt preset for image prompts",
			prompt_preset_none: "None",
			concurrency_label: "Images generated at the same time"
		},
		translation: {
			description: "Translation runs through SillyTavern's DeepL route because DeepL does not accept requests from a browser page. Glossary terms and the vocabulary's Chinese names are applied first; only the rest is sent to DeepL.",
			key_label: "DeepL key",
			key_hint: "Stored in SillyTavern's secret store, shared with SillyTavern's own translate extension. Free and Pro keys use different endpoints.",
			key_save: "Save key",
			key_clear: "Remove key",
			key_saved: "Key saved.",
			key_cleared: "Key removed.",
			key_failed: "SillyTavern did not accept the change.",
			endpoint_label: "DeepL plan",
			endpoint_free: "Free",
			endpoint_pro: "Pro",
			glossary_title: "Glossary",
			glossary_description: "Each Chinese term is replaced by its tag before anything goes to DeepL.",
			glossary_source: "Chinese term",
			glossary_target: "Tag",
			glossary_add: "Add term",
			glossary_remove: "Remove",
			glossary_save: "Save glossary"
		},
		novelai: {
			title: "NovelAI defaults",
			refresh_account: "Refresh account",
			account_unreachable: "NovelAI's account API could not be reached (network failure or a blocked cross-origin request), so the Anlas balance is unknown.",
			account_open_site: "Check it on NovelAI",
			account_summary: "{tier} · {anlas} Anlas · renews {expires}",
			model_label: "Model",
			width_label: "Width",
			height_label: "Height",
			steps_label: "Steps",
			scale_label: "Prompt guidance",
			cfg_rescale_label: "Guidance rescale",
			sampler_label: "Sampler",
			noise_schedule_label: "Noise schedule",
			quality_label: "Quality tags",
			quality_standard: "Standard",
			quality_light: "Light",
			quality_none: "None",
			uc_label: "Undesired content preset",
			uc_heavy: "Heavy",
			uc_light: "Light",
			uc_human_focus: "Human focus",
			uc_furry_focus: "Furry focus",
			uc_none: "None",
			smea_label: "SMEA",
			dyn_label: "SMEA DYN",
			variety_label: "Variety+",
			vibes_title: "Vibe transfer",
			vibes_empty: "No NovelAI vibe group with an image yet. Add one under Library.",
			ignored_title: "The selected model ignores these settings:",
			ignored_vibe_transfer: "vibe transfer",
			ignored_smea: "SMEA",
			ignored_cfg_rescale: "guidance rescale",
			ignored_variety_plus: "Variety+",
			ignored_sampler: "sampler",
			ignored_steps: "steps",
			ignored_undesired_content: "undesired content preset",
			invalid_size: "Width and height must be multiples of 64 within the model's pixel limit.",
			save: "Save defaults",
			saved: "Defaults saved.",
			save_failed: "The defaults could not be saved."
		},
		onboarding: {
			label: "First connection",
			title: "Set up the service that will generate your images",
			description: "Create a provider profile first. Add a Gateway endpoint only when your provider uses one, then run the connection test."
		},
		sections: {
			credential_storage: "Credential storage",
			provider_profiles: "Provider profiles",
			llm_connections: "Text model connections",
			gateway: "Gateway",
			appearance: "Appearance",
			data: "Data"
		},
		provider_profiles: {
			empty_description: "Add a provider profile to connect an image generation backend.",
			add_action: "Add provider profile",
			connection_test_action: "Test connection",
			dialog_add_title: "Add provider profile",
			dialog_edit_title: "Edit provider profile",
			provider_label: "Provider",
			model_label: "Model",
			workflow_label: "ComfyUI workflow ID",
			set_credential_action: "Set API key",
			clear_credential_action: "Remove API key",
			credential_set: "API key configured",
			credential_unset: "No API key configured",
			credential_dialog_title: "Set API key for {name}",
			credential_dialog_description: "The key is written to the selected credential storage backend. Inkwell keeps only its reference.",
			credential_label: "API key",
			provider_types: {
				sd_webui: "SD WebUI",
				novelai: "NovelAI",
				comfyui: "ComfyUI",
				openai_image: "OpenAI Image",
				google_image: "Google Image"
			},
			default_badge: "Default",
			set_default_action: "Set as default",
			remove_confirm_title: "Remove {name}?",
			remove_confirm_description: "This disconnects the provider profile from Inkwell. Jobs already submitted are not affected."
		},
		credential_storage: {
			mode_label: "Storage backend",
			mode_hint: "Applies to Provider, text-model, and Gateway credentials. This device encrypts keys in this browser without a passphrase; switching storage does not move keys, so enter them again.",
			modes: {
				browser_device: "This device",
				host: "SillyTavern vault",
				browser_encrypted: "Encrypted browser"
			},
			states: {
				unavailable: "Unavailable",
				error: "Vault error",
				uninitialized: "Not initialized",
				locked: "Locked · {count} encrypted credential | Locked · {count} encrypted credentials",
				unlocked: "Unlocked · {count} credential | Unlocked · {count} credentials"
			},
			passphrase_label: "Vault passphrase",
			confirm_passphrase_label: "Confirm passphrase",
			passphrase_hint: "At least {count} characters. The passphrase is required again after every reload.",
			unlock_hint: "Unlocks credentials for this browser session.",
			initialize_action: "Create encrypted vault",
			unlock_action: "Unlock",
			lock_action: "Lock",
			reset_action: "Reset vault",
			reset_confirm_title: "Reset encrypted browser vault?",
			reset_confirm_description: "All browser-encrypted credentials will be deleted permanently. Existing profile references will remain.",
			passphrase_too_short: "Use at least {count} characters.",
			passphrase_mismatch: "The passphrases do not match.",
			invalid_passphrase: "The passphrase is incorrect.",
			unlock_required: "The selected credential storage is unavailable or locked.",
			unavailable: "Encrypted browser storage is unavailable in this environment.",
			error: "The encrypted browser vault could not be read."
		},
		llm_connections: {
			section_description: "Text model connections power the assistant and prompt building. API keys use the selected credential storage backend.",
			empty_description: "Add a text model connection to let the assistant and prompt builder call a language model.",
			add_action: "Add text model connection",
			dialog_add_title: "Add text model connection",
			dialog_edit_title: "Edit text model connection",
			dialog_description: "Fields marked * are required. The API key is set separately.",
			provider_kind_label: "API dialect",
			provider_kinds: {
				openai_compatible: "OpenAI compatible",
				anthropic: "Anthropic",
				google_generative: "Google Generative AI",
				ollama: "Ollama"
			},
			route_label: "Request path",
			route_hint: "Chosen from the paths this dialect supports. The host supplies the address.",
			model_label: "Model",
			model_hint: "The model identifier this connection requests, such as gpt-4o-mini.",
			temperature_label: "Temperature",
			temperature_hint: "Lower values give steadier replies, higher values give more variety.",
			max_output_tokens_label: "Maximum output tokens",
			default_badge: "Default",
			set_default_action: "Use as the default text model",
			connection_test_action: "Test connection",
			set_credential_action: "Set API key",
			clear_credential_action: "Remove API key",
			credential_set: "API key configured",
			credential_unset: "No API key stored",
			credential_dialog_title: "Set API key",
			credential_dialog_description: "The key is written to the selected credential storage backend. Inkwell keeps only its reference.",
			credential_label: "API key",
			remove_confirm_title: "Remove {name}?",
			remove_confirm_description: "This disconnects the text model from Inkwell. The stored API key remains in its credential backend."
		},
		gateway: {
			endpoint_label: "Gateway endpoint",
			protocol_label: "Protocol",
			detect_action: "Detect protocol",
			token_secret_label: "Token secret reference",
			token_not_set: "No token configured",
			endpoint_hint: "The Gateway endpoint your provider profiles connect through.",
			token_label: "Gateway access token",
			token_hint: "The bearer token configured for this Gateway. It is written to the selected credential storage backend; Inkwell keeps only its reference.",
			token_save_action: "Save token",
			token_clear_action: "Clear token"
		},
		http_risk: {
			warning_title: "This connection is not encrypted",
			warning_description_local: "{origin} uses plain HTTP on a loopback or private network. Traffic stays on your local network but is not encrypted.",
			error_description_public: "{origin} uses plain HTTP on a public or unrecognized host. The token, prompts, and images travel in plaintext and can be intercepted.",
			disclosure: "The token, prompts, and images travel in plaintext over this connection.",
			continue_action: "Continue anyway",
			acknowledged_label: "Acknowledged for this origin"
		},
		appearance: {
			theme_label: "Theme",
			theme_system: "Match system",
			theme_light: "Light",
			theme_dark: "Dark",
			language_label: "Language",
			language_auto: "Match SillyTavern",
			language_zh_cn: "Simplified Chinese",
			language_en: "English",
			inspector_width_label: "Inspector width",
			optional_entry_label: "Show the floating entry button"
		},
		data: {
			vocabulary_channel_label: "Vocabulary update channel",
			vocabulary_channel_bundled: "Bundled baseline",
			vocabulary_channel_https: "Remote update channel",
			vocabulary_import: {
				action: "Import local package",
				cancel_action: "Cancel import",
				description: "Import a local .jsonl, .ndjson, or legacy v2 .json vocabulary source.",
				progress_reading: "Reading file: {received} / {total} bytes",
				progress_batch: "Parsing batch {current} / {total}",
				progress_indexing: "Building search indexes",
				progress_staging: "Storing shard {current} / {total}",
				progress_activating: "Activating package",
				progress_complete: "Imported {count} records successfully",
				progress_cancelled: "Import cancelled",
				success: "Vocabulary package imported successfully."
			},
			vocabulary_import_error: "Vocabulary import failed ({code}).",
			archive_export_action: "Export archive",
			archive_import_action: "Import archive",
			archive_import_description: "Importing merges records from the archive into your current data and never deletes existing data; a record with the same id as one in the archive is replaced by the archived version."
		}
	},
	errors: {
		validation_required: "This field is required.",
		gateway_incompatible: "The Gateway at {origin} reports an incompatible protocol version.",
		gateway_offline: "The Gateway at {origin} is not reachable.",
		connection_test_failed: "Connection test failed: {code}",
		unexpected: "Something went wrong. Check Diagnostics for details."
	},
	confirmations: {
		destructive: {
			default_confirm_action: "Delete",
			default_cancel_action: "Cancel"
		},
		discard_unsaved: {
			title: "Discard unsaved changes?",
			description: "Your edits are not saved yet. Leaving now discards them.",
			stay_action: "Keep editing",
			discard_action: "Discard changes"
		}
	},
	chat: {
		message_button: "Illustrate this reply",
		analysis_running: "Choosing paragraphs to illustrate…",
		analysis_failed: "Paragraph analysis failed: {reason}",
		slot: {
			generate: "Generate",
			regenerate: "Regenerate",
			edit: "Edit prompt",
			previous: "Previous image",
			next: "Next image",
			generating: "Generating…",
			interrupted: "Generation was interrupted by a reload",
			image_missing: "This image is no longer in the gallery",
			failed: "Generation failed: {reason}"
		},
		dialog: {
			title: "Illustrate reply",
			close: "Close",
			retry: "Analyze again",
			no_slots: "The analysis found no paragraph worth illustrating.",
			parse_failed_hint: "The model did not return the requested JSON. Your preset may impose its own output format or obfuscate replies; try another preset in the illustration settings.",
			translate_to_tags: "Translate to English tags",
			read_in_chinese: "Read in Chinese",
			base_prompt: "Shared prompt (scene and style)",
			character_prompt: "{name}",
			positive_prompt: "Prompt",
			negative_prompt: "Negative prompt",
			cost_anlas: "About {anlas} Anlas",
			cost_free: "Free with Opus",
			cost_rejected: "NovelAI would reject this request as too large",
			total_anlas: "Total about {anlas} Anlas",
			cancel: "Cancel",
			confirm: "Generate {count}"
		},
		quick_edit: {
			img2img: "Image to image",
			inpaint: "Inpaint",
			upscale: "Upscale",
			director: "Director tools",
			submit: "Generate",
			strength: "Strength {value}",
			upscale_description: "Enlarges the image with NovelAI's upscaler; the source must be at most 1 megapixel.",
			tool: "Tool",
			emotion: "Emotion",
			tool_prompt: "Extra prompt",
			defry: "Defry {value}",
			tools: {
				lineart: "Line art",
				sketch: "Sketch",
				colorize: "Colorize",
				emotion: "Change emotion",
				declutter: "Declutter",
				declutter_keep_bubbles: "Declutter, keep speech bubbles",
				bg_removal: "Remove background"
			},
			emotions: {
				neutral: "Neutral",
				happy: "Happy",
				sad: "Sad",
				angry: "Angry",
				scared: "Scared",
				surprised: "Surprised",
				tired: "Tired",
				excited: "Excited",
				nervous: "Nervous",
				thinking: "Thinking",
				confused: "Confused",
				shy: "Shy",
				disgusted: "Disgusted",
				smug: "Smug",
				bored: "Bored",
				laughing: "Laughing",
				irritated: "Irritated",
				aroused: "Aroused",
				embarrassed: "Embarrassed",
				worried: "Worried",
				love: "In love",
				determined: "Determined",
				hurt: "Hurt",
				playful: "Playful"
			}
		},
		inpaint: {
			undo: "Undo",
			redo: "Redo",
			erase: "Eraser",
			clear: "Clear mask",
			zoom_in: "Zoom in",
			zoom_out: "Zoom out",
			brush_size: "Brush size",
			strength: "Strength",
			dimension_error: "The mask size does not match the image."
		},
		errors: {
			auth_failed: "the provider rejected the credential",
			rate_limited: "rate limited, try again later",
			content_blocked: "blocked by the provider's content filter",
			invalid_request: "the provider rejected the request",
			provider_unavailable: "the provider is unavailable",
			timed_out: "timed out",
			cancelled: "cancelled",
			malformed_response: "the provider returned an unreadable response"
		}
	}
}, s = { "zh-CN": async () => (await import("./zh_cn-Fdypw4Mk.js")).zh_cn_messages }, c = {
	decimal: {
		style: "decimal",
		maximumFractionDigits: 2
	},
	percent: {
		style: "percent",
		maximumFractionDigits: 1
	}
}, l = {
	short_date: {
		year: "numeric",
		month: "short",
		day: "numeric"
	},
	short_time: {
		hour: "2-digit",
		minute: "2-digit"
	}
}, u = {
	legacy: !1,
	locale: "en",
	fallbackLocale: "en",
	messages: { en: o },
	numberFormats: {
		en: c,
		"zh-CN": c
	},
	datetimeFormats: {
		en: l,
		"zh-CN": l
	}
};
function d() {
	let t = e(u);
	async function n(e, n) {
		let r = i(e, n);
		return a(t.global, r, s);
	}
	return {
		i18n: t,
		apply_locale: n
	};
}
var f = [
	"byte",
	"kilobyte",
	"megabyte",
	"gigabyte",
	"terabyte"
];
function p(e, t) {
	let n = e, r = 0;
	for (; Math.abs(n) >= 1e3 && r < f.length - 1;) n /= 1e3, r += 1;
	return new Intl.NumberFormat(t, {
		style: "unit",
		unit: f[r],
		unitDisplay: "long",
		maximumFractionDigits: r === 0 ? 0 : 1
	}).format(n);
}
//#endregion
export { p as n, d as t };
