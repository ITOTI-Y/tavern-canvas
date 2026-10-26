//#region src/storage/browser_secret_vault.ts
var e = "config_tavern_canvas_browser_secrets", t = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "BrowserSecretVaultError", this.code = e;
	}
};
function n(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
var r = class {
	#e;
	#t = null;
	constructor(e) {
		this.#e = e;
	}
	supports() {
		return !0;
	}
	async write_secret(e, t) {
		return (await this.#n()).write_secret(e, t);
	}
	async delete_secret(e) {
		return (await this.#n()).delete_secret(e);
	}
	async probe_secret(e) {
		return (await this.#n()).probe_secret(e);
	}
	async resolve_secret(e) {
		return (await this.#n()).resolve_secret(e);
	}
	async status() {
		return (await this.#n()).status();
	}
	async initialize(e) {
		return (await this.#n()).initialize(e);
	}
	async unlock(e) {
		return (await this.#n()).unlock(e);
	}
	async lock() {
		return (await this.#n()).lock();
	}
	async reset() {
		return (await this.#n()).reset();
	}
	async close() {
		this.#t !== null && await (await this.#t).close();
	}
	#n() {
		return this.#t ??= import("./_encrypted_browser_secret_vault-4YsrQUdv.js").then(({ EncryptedBrowserSecretVault: e }) => new e(this.#e));
	}
};
function i(e = globalThis) {
	let t = n(e, "indexedDB"), i = n(e, "crypto"), a = n(i, "subtle"), o = n(i, "getRandomValues");
	return typeof t != "object" || !t || typeof a != "object" || !a || typeof o != "function" ? null : new r({ crypto: i });
}
//#endregion
export { t as n, i as r, e as t };
