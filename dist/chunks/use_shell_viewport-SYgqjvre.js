import { p as e, rt as t, tt as n } from "./vue-i18n-XoxYzLIP.js";
//#region src/ui/contracts/view_models.ts
var r = { status: "idle" }, i = "capability_load_failed", a = "command_failed", o = /^[a-z][a-z0-9_]*$/u;
function s(e, t) {
	if (e instanceof Error) {
		let t = e.code;
		if (typeof t == "string" && o.test(t)) return { code: t };
	}
	return { code: t };
}
function c(e, t, n) {
	let r = n(t), i = e.findIndex((e) => n(e) === r);
	if (i === -1) return [...e, t];
	let a = [...e];
	return a[i] = t, a;
}
var l = /* @__PURE__ */ new Set([
	"queued",
	"preparing",
	"submitting",
	"running",
	"failed"
]);
function u(e) {
	return e === "failed" ? "error" : "pending";
}
function d(e) {
	return e === "running" ? "status.running" : e === "failed" ? "status.failed" : "status.pending";
}
function f(e) {
	return {
		id: e.job_id,
		label_code: d(e.state),
		status: u(e.state),
		progress: e.state !== "failed" && e.image_count > 0 ? e.completed_image_ids.length / e.image_count : null,
		error: e.state === "failed" ? e.error?.code ?? null : null
	};
}
function p(e) {
	return e.filter((e) => l.has(e.state)).map(f);
}
function m(e, t, n) {
	return e().status === "pending" ? Promise.resolve() : (t({ status: "pending" }), n().then((e) => {
		t({
			status: "success",
			result: e
		});
	}, (e) => {
		t({
			status: "error",
			failure: s(e, a)
		});
	}));
}
function h(e, t, n) {
	return {
		route: e,
		settings_section: "illustration",
		color_mode: t,
		loading: /* @__PURE__ */ new Set(),
		failures: /* @__PURE__ */ new Map(),
		generation: {
			profiles: [],
			active_profile_id: null,
			jobs: []
		},
		prompt: {
			presets: [],
			selected_preset_id: null,
			draft: null,
			save_command: r
		},
		assets: {
			active_category: "character",
			records: {
				character: [],
				outfit: [],
				lora: [],
				vibe: [],
				workflow: [],
				prompt_tag: [],
				creation: [],
				opening: []
			},
			vocabulary_catalog: [],
			vocabulary_install_command: r
		},
		gallery: {
			records: [],
			selected_record_id: null
		},
		diagnostics: {
			snapshot: null,
			timeline: [],
			support_bundle_command: r
		},
		settings: {
			settings: null,
			browser_secret_vault: {
				state: "unavailable",
				secret_count: 0
			},
			update_command: r
		},
		inspector: {
			collapsed: !1,
			width: n,
			selected_record: null
		},
		tasks: [],
		pending_deletions: [],
		deletion_failure: null
	};
}
function g(e, t) {
	let n = t.type === "job_updated" ? c(e.generation.jobs, t.job, (e) => e.job_id) : e.generation.jobs.filter((e) => e.job_id !== t.job_id);
	return {
		generation: {
			...e.generation,
			jobs: n
		},
		tasks: p(n)
	};
}
function _(e, t) {
	let n = t.type === "profile_upserted" ? c(e.generation.profiles, t.profile, (e) => e.id) : e.generation.profiles.filter((e) => e.id !== t.profile_id);
	return { generation: {
		...e.generation,
		profiles: n
	} };
}
function v(e, t) {
	let n = t.type === "preset_upserted" ? c(e.prompt.presets, t.preset, (e) => e.id) : e.prompt.presets.filter((e) => e.id !== t.preset_id);
	return { prompt: {
		...e.prompt,
		presets: n
	} };
}
function y(e, t) {
	let n = t.type === "asset_upserted" ? {
		...e.assets.records,
		[t.asset.category]: c(e.assets.records[t.asset.category], t.asset, (e) => e.id)
	} : {
		...e.assets.records,
		[t.category]: e.assets.records[t.category].filter((e) => e.id !== t.asset_id)
	};
	return { assets: {
		...e.assets,
		records: n
	} };
}
function b(e, t) {
	let n = t.type === "record_upserted" ? c(e.gallery.records, t.record, (e) => e.id) : e.gallery.records.filter((e) => e.id !== t.record_id);
	return { gallery: {
		...e.gallery,
		records: n
	} };
}
function x(e, t) {
	return { diagnostics: {
		...e.diagnostics,
		timeline: [...e.diagnostics.timeline, t.entry]
	} };
}
function S(e, t) {
	return { settings: {
		...e.settings,
		settings: t.settings
	} };
}
//#endregion
//#region src/ui/controllers/studio_controller.ts
var C = 8e3, w = class {
	#e;
	#t;
	#n = /* @__PURE__ */ new Set();
	#r = [];
	#i = !1;
	#a = Promise.resolve();
	#o = /* @__PURE__ */ new Map();
	#s = /* @__PURE__ */ new Set();
	#c = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#e = e.capabilities, this.#t = h(e.initial_route ?? "settings", e.initial_color_mode ?? "light", e.initial_inspector_width ?? 320);
	}
	get state() {
		return this.#t;
	}
	on_change(e) {
		return this.#n.add(e), () => {
			this.#n.delete(e);
		};
	}
	#l() {
		for (let e of this.#n) e();
	}
	#u(e) {
		this.#t = {
			...this.#t,
			...this.#d(e)
		}, this.#l();
	}
	#d(e) {
		let t = e;
		if (e.assets !== void 0 && this.#s.size > 0) {
			let n = { ...e.assets.records };
			for (let e of Object.keys(n)) n[e] = n[e].filter((e) => !this.#s.has(e.id));
			t = {
				...t,
				assets: {
					...e.assets,
					records: n
				}
			};
		}
		if (e.gallery !== void 0 && this.#c.size > 0) {
			let n = e.gallery.records.filter((e) => !this.#c.has(e.id));
			t = {
				...t,
				gallery: {
					...e.gallery,
					records: n
				}
			};
		}
		return t;
	}
	defer_deletion(e, t) {
		let n = crypto.randomUUID(), r = setTimeout(() => {
			this.#f(n);
		}, C);
		this.#o.set(n, {
			subject: e,
			actions: t,
			timer: r
		}), this.#u({ pending_deletions: [...this.#t.pending_deletions, {
			id: n,
			...e
		}] });
	}
	undo_deletion(e) {
		let t = this.#o.get(e);
		t !== void 0 && (clearTimeout(t.timer), this.#o.delete(e), t.actions.restore(), this.#u({ pending_deletions: this.#t.pending_deletions.filter((t) => t.id !== e) }));
	}
	dismiss_deletion_failure() {
		this.#u({ deletion_failure: null });
	}
	async #f(e) {
		let t = this.#o.get(e);
		if (t !== void 0) {
			clearTimeout(t.timer), this.#o.delete(e), this.#u({ pending_deletions: this.#t.pending_deletions.filter((t) => t.id !== e) });
			try {
				await t.actions.commit();
			} catch (e) {
				t.actions.restore(), this.#u({ deletion_failure: {
					...t.subject,
					message: e instanceof Error ? e.message : String(e)
				} });
			}
		}
	}
	#p(e) {
		this.#u({ generation: {
			...this.#t.generation,
			...e
		} });
	}
	#m(e) {
		this.#u({
			generation: {
				...this.#t.generation,
				jobs: e
			},
			tasks: p(e)
		});
	}
	#h(e) {
		this.#u({ prompt: {
			...this.#t.prompt,
			...e
		} });
	}
	#g(e) {
		this.#u({ assets: {
			...this.#t.assets,
			...e
		} });
	}
	#_(e) {
		this.#u({ gallery: {
			...this.#t.gallery,
			...e
		} });
	}
	#v(e) {
		this.#u({ diagnostics: {
			...this.#t.diagnostics,
			...e
		} });
	}
	#y(e) {
		this.#u({ settings: {
			...this.#t.settings,
			...e
		} });
	}
	#b(e) {
		this.#u({ inspector: {
			...this.#t.inspector,
			...e
		} });
	}
	#x(e, t) {
		let n = new Set(this.#t.loading);
		t ? n.add(e) : n.delete(e), this.#u({ loading: n });
	}
	#S(e, t) {
		let n = new Map(this.#t.failures);
		t ? n.set(e, t) : n.delete(e), this.#u({ failures: n });
	}
	#C(e, t, n) {
		return this.#x(e, !0), t().then((t) => {
			this.#i || (n(t), this.#S(e, null));
		}).catch((t) => {
			this.#i || this.#S(e, s(t, i));
		}).finally(() => {
			this.#x(e, !1);
		});
	}
	#w(e) {
		this.#i || this.#u(g(this.#t, e));
	}
	#T(e) {
		this.#i || this.#u(_(this.#t, e));
	}
	#E(e) {
		this.#i || this.#u(v(this.#t, e));
	}
	#D(e) {
		this.#i || this.#u(y(this.#t, e));
	}
	#O(e) {
		this.#i || this.#u(b(this.#t, e));
	}
	#k(e) {
		this.#i || this.#u(x(this.#t, e));
	}
	#A(e) {
		this.#i || this.#u(S(this.#t, e));
	}
	load_vocabulary_catalog() {
		return this.#C("vocabulary", () => this.#e.vocabulary.load(), (e) => {
			this.#g({ vocabulary_catalog: e });
		});
	}
	async start() {
		this.#r = [
			this.#e.generation.subscribe((e) => {
				this.#w(e);
			}),
			this.#e.profiles.subscribe((e) => {
				this.#T(e);
			}),
			this.#e.prompt_presets.subscribe((e) => {
				this.#E(e);
			}),
			this.#e.assets.subscribe((e) => {
				this.#D(e);
			}),
			this.#e.gallery.subscribe((e) => {
				this.#O(e);
			}),
			this.#e.diagnostics.subscribe((e) => {
				this.#k(e);
			}),
			this.#e.settings.subscribe((e) => {
				this.#A(e);
			})
		], await Promise.allSettled([
			...this.#j(),
			this.#C("diagnostics", () => this.#e.diagnostics.load(), (e) => {
				this.#v({ snapshot: e });
			}),
			this.#C("settings", () => this.#e.settings.load(), (e) => {
				this.#y({
					settings: e.settings,
					browser_secret_vault: e.browser_secret_vault
				});
			})
		]);
	}
	#j() {
		return [
			this.#C("generation", () => this.#e.generation.load(), (e) => {
				this.#m(e);
			}),
			this.#C("profiles", () => this.#e.profiles.load(), (e) => {
				this.#p({
					profiles: e,
					active_profile_id: this.#t.generation.active_profile_id ?? e[0]?.id ?? null
				});
			}),
			this.#C("prompt_presets", () => this.#e.prompt_presets.load(), (e) => {
				this.#h({ presets: e });
			}),
			this.#C("assets", () => this.#e.assets.load(), (e) => {
				this.#g({ records: e });
			}),
			this.#C("gallery", () => this.#e.gallery.load(), (e) => {
				this.#_({ records: e });
			})
		];
	}
	stop() {
		let e = [...this.#o.keys()].map((e) => this.#f(e));
		this.#i = !0;
		let t = [];
		for (let e of [...this.#r].reverse()) try {
			e();
		} catch (e) {
			t.push(e);
		}
		return this.#r = [], t.length > 0 ? Promise.reject(AggregateError(t, "Studio controller cleanup failed")) : Promise.all(e).then(() => void 0);
	}
	set_route(e) {
		this.#u({ route: e });
	}
	set_settings_section(e) {
		this.#u({
			route: "settings",
			settings_section: e
		});
	}
	set_inspector_width(e) {
		this.#b({ width: e });
	}
	set_inspector_collapsed(e) {
		this.#b({ collapsed: e });
	}
	select_inspector_record(e) {
		this.#b({ selected_record: e });
	}
	async select_prompt_preset(e) {
		this.#h({ selected_preset_id: e });
		let t = await this.#e.prompt_presets.load_draft(e);
		this.#i || this.#h({ draft: t });
	}
	start_new_prompt_preset() {
		this.#h({
			selected_preset_id: null,
			draft: {
				id: null,
				display_name: "",
				group: null,
				fixed_positive_prompt: "",
				fixed_negative_prompt: "",
				replacement_rules: [],
				regex_rules: []
			}
		});
	}
	update_prompt_draft(e) {
		this.#t.prompt.draft && this.#h({ draft: {
			...this.#t.prompt.draft,
			...e
		} });
	}
	async bulk_remove_prompt_presets(e) {
		if (await this.#e.prompt_presets.bulk_remove(e), this.#i) return;
		let t = new Set(e);
		this.#h({
			presets: this.#t.prompt.presets.filter((e) => !t.has(e.id)),
			selected_preset_id: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.selected_preset_id,
			draft: this.#t.prompt.selected_preset_id !== null && t.has(this.#t.prompt.selected_preset_id) ? null : this.#t.prompt.draft
		});
	}
	test_prompt_regex(e, t) {
		return this.#e.prompt_presets.test_regex(e, t);
	}
	save_prompt_preset(e) {
		return m(() => this.#t.prompt.save_command, (e) => {
			this.#h({ save_command: e });
		}, async () => {
			let t = await this.#e.prompt_presets.save_draft(e);
			return this.#h({
				presets: c(this.#t.prompt.presets, t, (e) => e.id),
				draft: null
			}), t;
		});
	}
	install_vocabulary_package(e, t) {
		return m(() => this.#t.assets.vocabulary_install_command, (e) => {
			this.#g({ vocabulary_install_command: e });
		}, () => this.#e.vocabulary.install(e, t));
	}
	update_settings(e) {
		let t = this.#a.then(() => this.#M(e));
		return this.#a = t, t;
	}
	async #M(e) {
		this.#y({ update_command: { status: "pending" } });
		try {
			let t = await this.#N(e);
			this.#y({ update_command: {
				status: "success",
				result: t
			} });
		} catch (e) {
			this.#y({ update_command: {
				status: "error",
				failure: s(e, a)
			} });
		}
	}
	async #N(e) {
		let t = await this.#e.settings.update(e);
		if (e.credential_storage_mode === void 0) return this.#y({ settings: t }), t;
		let [n, r] = await Promise.all([this.#e.settings.load(), this.#e.profiles.load()]);
		return this.#y({
			settings: n.settings,
			browser_secret_vault: n.browser_secret_vault
		}), this.#p({ profiles: r }), n.settings;
	}
	export_support_bundle() {
		return m(() => this.#t.diagnostics.support_bundle_command, (e) => {
			this.#v({ support_bundle_command: e });
		}, () => this.#e.diagnostics.export_support_bundle());
	}
	async load_diagnostics_timeline() {
		let e = await this.#e.diagnostics.load_timeline();
		this.#i || this.#v({ timeline: e });
	}
	async save_provider_profile(e) {
		let t = await this.#e.profiles.save(e);
		return this.#i || this.#p({ profiles: c(this.#t.generation.profiles, t, (e) => e.id) }), this.#P() === null && await this.set_active_provider_profile(t.id), t;
	}
	async remove_provider_profile(e) {
		await this.#e.profiles.remove(e);
		let t = this.#t.generation.profiles.filter((t) => t.id !== e);
		this.#i || this.#p({ profiles: t }), this.#t.settings.settings?.active_provider_profile_id === e && await this.set_active_provider_profile(t[0]?.id ?? null);
	}
	#P() {
		let e = this.#t.settings.settings?.active_provider_profile_id ?? null;
		return this.#t.generation.profiles.find((t) => t.id === e) ?? null;
	}
	async set_active_provider_profile(e) {
		await this.update_settings({ active_provider_profile_id: e }), this.#i || this.#p({ active_profile_id: this.#t.settings.settings?.active_provider_profile_id ?? null });
	}
	test_provider_profile_connection(e) {
		return this.#e.profiles.test_connection(e);
	}
	inspect_comfyui(e) {
		return this.#e.profiles.inspect_comfyui(e);
	}
	list_comfyui_workflows(e) {
		return this.#e.profiles.list_comfyui_workflows(e);
	}
	read_comfyui_workflow(e, t) {
		return this.#e.profiles.read_comfyui_workflow(e, t);
	}
	async set_provider_profile_credential(e, t) {
		let n = await this.#e.profiles.set_credential(e, t);
		return this.#i || this.#p({ profiles: c(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async clear_provider_profile_credential(e) {
		let t = await this.#e.profiles.clear_credential(e);
		return this.#i || this.#p({ profiles: c(this.#t.generation.profiles, t, (e) => e.id) }), t;
	}
	async save_novelai_defaults(e, t) {
		let n = await this.#e.profiles.save_novelai_defaults(e, t);
		return this.#i || this.#p({ profiles: c(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	async save_prompt_tags(e, t) {
		let n = await this.#e.profiles.save_prompt_tags(e, t);
		return this.#i || this.#p({ profiles: c(this.#t.generation.profiles, n, (e) => e.id) }), n;
	}
	load_novelai_account() {
		return this.#e.novelai.get_account();
	}
	load_novelai_models() {
		return this.#e.novelai.load();
	}
	set_deepl_key(e) {
		return this.#e.settings.set_deepl_key(e);
	}
	set_analysis_key(e) {
		return this.#e.settings.set_analysis_key(e);
	}
	list_worldbooks() {
		return this.#e.settings.list_worldbooks();
	}
	clear_analysis_key() {
		return this.#e.settings.clear_analysis_key();
	}
	clear_deepl_key() {
		return this.#e.settings.clear_deepl_key();
	}
	async initialize_browser_secret_vault(e) {
		let t = await this.#e.settings.initialize_browser_secret_vault(e);
		this.#i || this.#y({ browser_secret_vault: t });
	}
	async unlock_browser_secret_vault(e) {
		let t = await this.#e.settings.unlock_browser_secret_vault(e);
		this.#i || this.#y({ browser_secret_vault: t });
	}
	async lock_browser_secret_vault() {
		let e = await this.#e.settings.lock_browser_secret_vault();
		this.#i || this.#y({ browser_secret_vault: e });
	}
	async reset_browser_secret_vault() {
		let e = await this.#e.settings.reset_browser_secret_vault();
		this.#i || this.#y({ browser_secret_vault: e });
	}
	set_vocabulary_token(e) {
		return this.#e.settings.set_vocabulary_token(e);
	}
	clear_vocabulary_token() {
		return this.#e.settings.clear_vocabulary_token();
	}
	import_vocabulary_package(e, t) {
		return this.#e.settings.import_vocabulary_package(e, t);
	}
	cancel_vocabulary_import() {
		this.#e.settings.cancel_vocabulary_import();
	}
	export_settings_archive() {
		return this.#e.settings.export_archive();
	}
	async import_settings_archive(e) {
		await this.#e.settings.import_archive(e), await Promise.allSettled(this.#j());
	}
	set_active_asset_category(e) {
		this.#g({ active_category: e });
	}
	async save_asset(e, t) {
		let n = await this.#e.assets.save(e, t);
		this.#i || this.#g({ records: {
			...this.#t.assets.records,
			[e]: c(this.#t.assets.records[e], n, (e) => e.id)
		} });
	}
	remove_asset(e, t) {
		let n = this.#t.assets.records[e], r = n.findIndex((e) => e.id === t), i = n[r];
		return this.#s.add(t), this.#g({ records: { ...this.#t.assets.records } }), this.defer_deletion({
			label: i?.display_name ?? null,
			count: 1
		}, {
			commit: async () => {
				await this.#e.assets.remove(e, t), this.#s.delete(t);
			},
			restore: () => {
				this.#s.delete(t);
				let n = this.#t.assets.records[e];
				if (i === void 0 || n.some((e) => e.id === t)) return;
				let a = [...n];
				a.splice(Math.min(r, a.length), 0, i), this.#g({ records: {
					...this.#t.assets.records,
					[e]: a
				} });
			}
		}), Promise.resolve();
	}
	async reorder_assets(e, t) {
		if (await this.#e.assets.reorder(e, t), this.#i) return;
		let n = new Map(this.#t.assets.records[e].map((e) => [e.id, e])), r = t.map((e) => n.get(e)).filter((e) => e !== void 0);
		this.#g({ records: {
			...this.#t.assets.records,
			[e]: r
		} });
	}
	search_vocabulary(e, t) {
		return this.#e.vocabulary.search(e, t);
	}
	load_installed_vocabulary() {
		return this.#e.vocabulary.installed();
	}
	load_more_vocabulary(e) {
		return this.#e.vocabulary.next_page(e);
	}
	select_gallery_record(e) {
		this.#_({ selected_record_id: e });
	}
	reveal_gallery_source(e) {
		return this.#e.gallery.reveal_source(e);
	}
	read_gallery_bytes(e) {
		return this.#e.gallery.read_bytes(e);
	}
	read_gallery_thumbnail(e) {
		return this.#e.gallery.read_thumbnail(e);
	}
	async pin_gallery_record(e, t) {
		await this.#e.gallery.pin(e, t), !this.#i && this.#_({ records: this.#t.gallery.records.map((n) => n.id === e ? {
			...n,
			pinned: t
		} : n) });
	}
	async detach_gallery_record(e) {
		await this.#e.gallery.detach_from_message(e), !this.#i && this.#_({ records: this.#t.gallery.records.map((t) => t.id === e ? {
			...t,
			quarantined: !0
		} : t) });
	}
	delete_gallery_record(e) {
		return this.#F([e], () => this.#e.gallery.delete_record(e)), Promise.resolve();
	}
	#F(e, t) {
		let n = new Set(e), r = this.#t.gallery.records;
		for (let e of n) this.#c.add(e);
		this.#_({
			records: r,
			selected_record_id: this.#t.gallery.selected_record_id !== null && n.has(this.#t.gallery.selected_record_id) ? null : this.#t.gallery.selected_record_id
		}), this.defer_deletion({
			label: null,
			count: n.size
		}, {
			commit: async () => {
				await t();
				for (let e of n) this.#c.delete(e);
			},
			restore: () => {
				for (let e of n) this.#c.delete(e);
				let e = new Set(this.#t.gallery.records.map((e) => e.id)), t = r.filter((t) => n.has(t.id) && !e.has(t.id));
				if (t.length === 0) return;
				let i = new Map(r.map((e, t) => [e.id, t])), a = [...this.#t.gallery.records, ...t].sort((e, t) => (i.get(e.id) ?? 2 ** 53 - 1) - (i.get(t.id) ?? 2 ** 53 - 1));
				this.#_({ records: a });
			}
		});
	}
	async dismiss_failed_tasks() {
		let e = this.#t.generation.jobs.filter((e) => e.state === "failed");
		await this.#e.generation.dismiss(e.map((e) => e.job_id));
	}
	bulk_delete_gallery_records(e) {
		return this.#F(e, () => this.#e.gallery.bulk_delete(e)), Promise.resolve();
	}
};
function T(e) {
	return new w(e);
}
var E = "(min-width: 960px)";
function D() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(E).matches;
}
function O(r) {
	if (r !== void 0) return e(() => r);
	let i = t(D());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(E), t = (e) => {
			i.value = e.matches;
		};
		e.addEventListener("change", t), n(() => {
			e.removeEventListener("change", t);
		});
	}
	return e(() => i.value ? "desktop" : "mobile");
}
//#endregion
export { C as n, T as r, O as t };
