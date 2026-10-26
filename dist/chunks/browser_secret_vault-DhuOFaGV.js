import { o as e } from "./ids-DjWg1HG8.js";
import { n as t } from "./build-BtJLSgAU.js";
var n = "device", r = "keys", i = "secrets", a = 12, o = 16384;
function s(t) {
	let n = e.safeParse(t);
	if (!n.success) throw new u("invalid_reference", "Credential reference must use the tavern_canvas: vault format");
	return n.data;
}
var c = class {
	#e;
	#t;
	#n;
	#r = null;
	#i = null;
	constructor(e) {
		this.#e = e.crypto, this.#t = e.database_name ?? "config_tavern_canvas_device_secrets", this.#n = e.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
	}
	supports() {
		return !0;
	}
	async write_secret(e, t) {
		let n = s(e), r = new TextEncoder().encode(t);
		if (r.byteLength === 0 || r.byteLength > o) throw r.fill(0), new u("invalid_secret", "Credential value is empty or exceeds the device vault limit");
		let c = new Uint8Array(a);
		this.#e.getRandomValues(c);
		let l;
		try {
			l = await this.#e.subtle.encrypt({
				name: "AES-GCM",
				iv: c,
				additionalData: new TextEncoder().encode(n)
			}, await this.#o(), r);
		} finally {
			r.fill(0);
		}
		await (await this.#c()).put(i, {
			reference: n,
			iv: c.buffer,
			ciphertext: l,
			updated_at: this.#n()
		});
	}
	async delete_secret(e) {
		await (await this.#c()).delete(i, s(e));
	}
	async probe_secret(e) {
		let t = s(e), n = await (await this.#c()).get(i, t);
		return n !== void 0 && ((await this.#a(n)).fill(0), !0);
	}
	async resolve_secret(e) {
		let t = s(e), n = await (await this.#c()).get(i, t);
		if (n === void 0) throw new u("not_found", "The device vault holds no such credential");
		let r = await this.#a(n);
		try {
			return new TextDecoder("utf-8", { fatal: !0 }).decode(r);
		} finally {
			r.fill(0);
		}
	}
	async close() {
		let e = this.#r;
		this.#r = null, this.#i = null, e !== null && (await e).close();
	}
	async #a(e) {
		try {
			return new Uint8Array(await this.#e.subtle.decrypt({
				name: "AES-GCM",
				iv: e.iv,
				additionalData: new TextEncoder().encode(e.reference)
			}, await this.#o(), e.ciphertext));
		} catch {
			throw new u("corrupted", "Device credential authentication failed");
		}
	}
	#o() {
		return this.#i ??= this.#s().catch((e) => {
			throw this.#i = null, e;
		});
	}
	async #s() {
		let e = await this.#c(), t = await e.get(r, n);
		if (t !== void 0) return t.key;
		let i = await this.#e.subtle.generateKey({
			name: "AES-GCM",
			length: 256
		}, !1, ["encrypt", "decrypt"]);
		try {
			return await e.add(r, {
				id: n,
				key: i
			}), i;
		} catch {
			let t = await e.get(r, n);
			if (t === void 0) throw new u("unavailable", "The device key could not be stored");
			return t.key;
		}
	}
	async #c() {
		let e = this.#r ??= t(this.#t, 1, { upgrade(e) {
			e.createObjectStore(r, { keyPath: "id" }), e.createObjectStore(i, { keyPath: "reference" });
		} });
		try {
			return await e;
		} catch {
			throw this.#r === e && (this.#r = null), new u("unavailable", "The device vault could not be opened");
		}
	}
}, l = "config_tavern_canvas_browser_secrets", u = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "BrowserSecretVaultError", this.code = e;
	}
};
function d(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
var f = class {
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
		return this.#t ??= import("./_encrypted_browser_secret_vault-D2fayKRM.js").then(({ EncryptedBrowserSecretVault: e }) => new e(this.#e));
	}
};
function p(e = globalThis) {
	let t = d(e, "indexedDB"), n = d(e, "crypto");
	return typeof t != "object" || !t || typeof d(n, "subtle") != "object" ? null : new c({ crypto: n });
}
function m(e = globalThis) {
	let t = d(e, "indexedDB"), n = d(e, "crypto"), r = d(n, "subtle"), i = d(n, "getRandomValues");
	return typeof t != "object" || !t || typeof r != "object" || !r || typeof i != "function" ? null : new f({ crypto: n });
}
//#endregion
export { p as i, u as n, m as r, l as t };
