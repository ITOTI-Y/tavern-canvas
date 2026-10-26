import { o as e } from "./ids-DjWg1HG8.js";
import { n as t, t as n } from "./build-BtJLSgAU.js";
import { n as r } from "./browser_secret_vault-BPvzuZ77.js";
//#region src/storage/_encrypted_browser_secret_vault.ts
var i = "vault", a = "metadata", o = "secrets", s = 6e5, c = 16, l = 12, u = 16, d = 1024, f = 16384, p = "tavern-canvas-browser-secret-vault:v1", m = "tavern-canvas-browser-secret-vault:metadata:v1";
function h(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function g(e) {
	return e.slice().buffer;
}
function _(e, t, n) {
	if (!(e instanceof ArrayBuffer) || e.byteLength !== t) throw new r("corrupted", `Encrypted vault ${n} is invalid`);
	return e;
}
function v(e) {
	if (!h(e) || e.id !== i || e.schema_version !== 1 || e.kdf !== "PBKDF2-SHA-256" || e.iterations !== s) throw new r("corrupted", "Encrypted vault metadata is invalid");
	return {
		id: i,
		schema_version: 1,
		kdf: "PBKDF2-SHA-256",
		iterations: s,
		salt: _(e.salt, c, "salt"),
		verifier_iv: _(e.verifier_iv, l, "verifier IV"),
		verifier_ciphertext: _(e.verifier_ciphertext, new TextEncoder().encode(p).byteLength + u, "verifier")
	};
}
function y(e, t) {
	if (!h(e) || e.reference !== t || e.schema_version !== 1 || typeof e.updated_at != "string" || !(e.ciphertext instanceof ArrayBuffer) || e.ciphertext.byteLength < u || e.ciphertext.byteLength > 16400) throw new r("corrupted", "Encrypted credential record is invalid");
	return {
		reference: t,
		schema_version: 1,
		iv: _(e.iv, l, "credential IV"),
		ciphertext: e.ciphertext,
		updated_at: e.updated_at
	};
}
function b(e) {
	let t = new TextEncoder().encode(e);
	if (e.length < 12 || t.byteLength > d) throw t.fill(0), new r("invalid_passphrase", "Vault passphrase must contain at least 12 characters");
	return t;
}
function x(t) {
	let n = e.safeParse(t);
	if (!n.success) throw new r("invalid_reference", "Credential reference must use the tavern_canvas: vault format");
	return n.data;
}
var S = class {
	#e;
	#t;
	#n;
	#r = null;
	#i = null;
	constructor(e) {
		this.#e = e.crypto, this.#t = e.database_name ?? "config_tavern_canvas_browser_secrets", this.#n = e.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
	}
	supports() {
		return !0;
	}
	async status() {
		let e = await this.#a(), t = await e.get(a, i), n = await e.count(o);
		if (t === void 0) {
			if (n > 0) throw new r("corrupted", "Encrypted credentials exist without vault metadata");
			return this.#i = null, {
				state: "uninitialized",
				secret_count: 0
			};
		}
		return v(t), {
			state: this.#i === null ? "locked" : "unlocked",
			secret_count: n
		};
	}
	async initialize(e) {
		let t = await this.#a();
		if (await t.get(a, i) !== void 0) throw new r("already_initialized", "Encrypted browser vault is already initialized");
		if (await t.count(o) > 0) throw new r("corrupted", "Encrypted credentials exist without vault metadata");
		let n = b(e), u = this.#o(c), d = this.#o(l), f;
		try {
			f = await this.#s(n, u);
		} finally {
			n.fill(0);
		}
		let h = new TextEncoder().encode(p), _ = new TextEncoder().encode(m), v;
		try {
			v = await this.#e.subtle.encrypt({
				name: "AES-GCM",
				iv: d,
				additionalData: _,
				tagLength: 128
			}, f, h);
		} finally {
			h.fill(0);
		}
		let y = {
			id: i,
			schema_version: 1,
			kdf: "PBKDF2-SHA-256",
			iterations: s,
			salt: g(u),
			verifier_iv: g(d),
			verifier_ciphertext: v
		};
		try {
			await t.add(a, y);
		} catch {
			throw new r("already_initialized", "Encrypted browser vault is already initialized");
		}
		return this.#i = f, this.status();
	}
	async unlock(e) {
		let t = await (await this.#a()).get(a, i);
		if (t === void 0) throw new r("unavailable", "Encrypted browser vault has not been initialized");
		let n = v(t), o = b(e), s;
		try {
			s = await this.#s(o, new Uint8Array(n.salt));
		} finally {
			o.fill(0);
		}
		let c;
		try {
			c = new Uint8Array(await this.#e.subtle.decrypt({
				name: "AES-GCM",
				iv: n.verifier_iv,
				additionalData: new TextEncoder().encode(m),
				tagLength: 128
			}, s, n.verifier_ciphertext));
		} catch {
			throw new r("invalid_passphrase", "Vault passphrase is incorrect");
		}
		let l = new TextEncoder().encode(p), u = c.byteLength === l.byteLength;
		for (let e = 0; e < l.byteLength; e += 1) u &&= c[e] === l[e];
		if (c.fill(0), l.fill(0), !u) throw new r("invalid_passphrase", "Vault passphrase is incorrect");
		return this.#i = s, this.status();
	}
	async lock() {
		return this.#i = null, this.status();
	}
	async reset() {
		await this.close();
		try {
			await n(this.#t);
		} catch {
			throw new r("unavailable", "Encrypted browser vault could not be reset");
		}
		return this.status();
	}
	async close() {
		this.#i = null;
		let e = this.#r;
		this.#r = null, e !== null && (await e).close();
	}
	async write_secret(e, t) {
		let n = x(e), i = this.#c(), a = new TextEncoder().encode(t);
		if (a.byteLength === 0 || a.byteLength > f) throw a.fill(0), new r("invalid_secret", "Credential value is empty or exceeds the encrypted vault limit");
		let s = this.#o(l), c;
		try {
			c = await this.#e.subtle.encrypt({
				name: "AES-GCM",
				iv: s,
				additionalData: new TextEncoder().encode(n),
				tagLength: 128
			}, i, a);
		} finally {
			a.fill(0);
		}
		await (await this.#a()).put(o, {
			reference: n,
			schema_version: 1,
			iv: g(s),
			ciphertext: c,
			updated_at: this.#n()
		});
	}
	async delete_secret(e) {
		let t = x(e);
		this.#c(), await (await this.#a()).delete(o, t);
	}
	async probe_secret(e) {
		let t = x(e), n = this.#c(), r = await (await this.#a()).get(o, t);
		return r !== void 0 && ((await this.#l(y(r, t), n)).fill(0), !0);
	}
	async resolve_secret(e) {
		let t = x(e), n = this.#c(), i = await (await this.#a()).get(o, t);
		if (i === void 0) throw new r("not_found", "Encrypted vault holds no such credential");
		let a = await this.#l(y(i, t), n);
		try {
			return new TextDecoder("utf-8", { fatal: !0 }).decode(a);
		} catch {
			throw new r("corrupted", "Encrypted credential is not valid UTF-8");
		} finally {
			a.fill(0);
		}
	}
	async #a() {
		let e = this.#r ?? t(this.#t, 1, { upgrade(e, t) {
			t < 1 && (e.createObjectStore(a, { keyPath: "id" }), e.createObjectStore(o, { keyPath: "reference" }));
		} });
		this.#r = e;
		try {
			return await e;
		} catch {
			throw this.#r === e && (this.#r = null), new r("unavailable", "Encrypted browser vault could not be opened");
		}
	}
	#o(e) {
		let t = new Uint8Array(e);
		return this.#e.getRandomValues(t), t;
	}
	async #s(e, t) {
		let n = await this.#e.subtle.importKey("raw", e, "PBKDF2", !1, ["deriveKey"]);
		return this.#e.subtle.deriveKey({
			name: "PBKDF2",
			hash: "SHA-256",
			salt: t,
			iterations: s
		}, n, {
			name: "AES-GCM",
			length: 256
		}, !1, ["encrypt", "decrypt"]);
	}
	#c() {
		if (this.#i === null) throw new r("locked", "Unlock the encrypted browser vault before using credentials");
		return this.#i;
	}
	async #l(e, t) {
		try {
			return new Uint8Array(await this.#e.subtle.decrypt({
				name: "AES-GCM",
				iv: e.iv,
				additionalData: new TextEncoder().encode(e.reference),
				tagLength: 128
			}, t, e.ciphertext));
		} catch {
			throw new r("corrupted", "Encrypted credential authentication failed");
		}
	}
};
//#endregion
export { S as EncryptedBrowserSecretVault };
