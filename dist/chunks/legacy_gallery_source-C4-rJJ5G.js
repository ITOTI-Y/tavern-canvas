//#region src/bootstrap/legacy_gallery_source.ts
var e = "chatu8_gallery", t = "tupian", n = "chatu8_config_images", r = "tupianhuancun", i = "config_images";
function a(e, t) {
	if (!((typeof e != "object" || !e) && typeof e != "function")) try {
		return Reflect.get(e, t);
	} catch {
		return;
	}
}
function o(e) {
	return typeof e != "object" || !e || Array.isArray(e) ? null : e;
}
function s(e) {
	if (typeof e == "string") return e;
	if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function c(e) {
	return Object.prototype.toString.call(e) === "[object ArrayBuffer]";
}
function l(e) {
	return ArrayBuffer.isView(e);
}
function u(e) {
	return c(e) ? new Uint8Array(e.slice(0)) : l(e) ? new Uint8Array(e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)) : Array.isArray(e) && e.every((e) => typeof e == "number") ? e.some((e) => !Number.isInteger(e) || e < 0 || e > 255) ? null : Uint8Array.from(e) : null;
}
function d(e) {
	let t = e.trim(), n = t.startsWith("data:") ? t.slice(t.indexOf(",") + 1) : t;
	if (n.length === 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(n)) throw Error("legacy image base64 is malformed");
	let r = atob(n), i = new Uint8Array(r.length);
	for (let e = 0; e < r.length; e += 1) i[e] = r.charCodeAt(e);
	return i;
}
function f(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	return btoa(t);
}
async function p(e) {
	let t = u(e);
	if (t !== null) return t;
	if (typeof e == "string") try {
		return d(e);
	} catch {
		return null;
	}
	if (typeof e != "object" || !e) return null;
	let n = a(e, "arrayBuffer");
	if (typeof n == "function") try {
		return u(await n.call(e));
	} catch {
		return null;
	}
	return null;
}
function m(e, t) {
	return (typeof t.uuid == "string" ? t.uuid : void 0) ?? (typeof t.id == "string" ? t.id : void 0) ?? (typeof t.key == "string" ? t.key : void 0) ?? s(e.key);
}
function h(e) {
	let t = o(e);
	return t !== null && Array.isArray(t.images);
}
function g(e, t) {
	let n = o(e);
	return n !== null && t.some((e) => typeof n[e] == "string" || typeof n[e] == "number");
}
function _(e) {
	let t = [], n = (e, r, i) => {
		if (i > 8) {
			t.push({
				key: e,
				value: r
			});
			return;
		}
		if (u(r) !== null || typeof a(r, "arrayBuffer") == "function") {
			t.push({
				key: e,
				value: r
			});
			return;
		}
		let s = o(r);
		if (Array.isArray(r)) {
			for (let e of r) n(void 0, e, i + 1);
			return;
		}
		if (s === null) {
			t.push({
				key: e,
				value: r
			});
			return;
		}
		if ("value" in s && ("key" in s || "id" in s) && !h(s)) {
			let t = y(s.key, y(s.id, e));
			n(t.length > 0 ? t : e, s.value, i + 1);
			return;
		}
		if (h(s) || g(s, [
			"id_index",
			"idIndex",
			"fileName",
			"file_name",
			"hot"
		]) || typeof s.id == "string" || typeof s.uuid == "string") {
			t.push({
				key: e,
				value: r
			});
			return;
		}
		for (let [e, t] of Object.entries(s)) n(e, t, i + 1);
	};
	for (let t of e) n(m(t, o(t.value) ?? {}), t.value, 0);
	return t;
}
function v(e, t = 0) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : t;
}
function y(e, t = "") {
	return typeof e == "string" ? e : t;
}
function b(e) {
	if (typeof e == "string" && e.trim().length !== 0) return f(d(e));
}
function x(e, t) {
	let n = o(e);
	if (n === null) throw Error("legacy gallery image entry is not an object");
	let r = y(n.uuid, y(n.id, t));
	if (r.length === 0) throw Error("legacy gallery image entry has no uuid");
	let i = {
		uuid: r,
		date: v(n.date, v(n.createdAt)),
		isVideo: n.isVideo === !0 || n.is_video === !0,
		originalUrl: y(n.originalUrl, y(n.original_url)),
		size: v(n.size),
		thumbnail_size: v(n.thumbnail_size, v(n.thumbnailSize))
	}, a = y(n.path, y(n.url));
	a.length > 0 && (i.path = a);
	let s = y(n.thumbnail_uuid, y(n.thumbnailUuid));
	s.length > 0 && (i.thumbnail_uuid = s);
	let c = y(n.thumbnail_path, y(n.thumbnailPath));
	c.length > 0 && (i.thumbnail_path = c), (n.genParams !== void 0 || n.gen_params !== void 0) && (i.genParams = n.genParams ?? n.gen_params ?? null);
	let l = b(n.data_base64 ?? n.dataBase64);
	return l !== void 0 && (i.data_base64 = l), i;
}
async function S(e) {
	let t = await p(e);
	if (t !== null) return t;
	let n = o(e);
	if (n === null) return null;
	for (let e of [
		"data_base64",
		"dataBase64",
		"blob",
		"bytes",
		"buffer",
		"data"
	]) {
		let t = n[e];
		if (t === void 0) continue;
		let r = typeof t == "string" ? (() => {
			try {
				return d(t);
			} catch {
				return null;
			}
		})() : await p(t);
		if (r !== null && r.byteLength > 0) return r;
	}
	return null;
}
async function C(e) {
	let t = {}, n = {};
	for (let r of e) {
		let e = r.value, i = m(r, o(e) ?? {}), a = await S(e);
		if (a !== null && i !== void 0) {
			n[i] = f(a);
			continue;
		}
		for (let e of _([r])) {
			if (h(e.value)) {
				let r = e.key ?? y(o(e.value)?.tag);
				if (r.length === 0) throw Error("legacy gallery metadata entry has no tag key");
				let i = e.value, a = [];
				for (let e of i.images) {
					let t = x(e, void 0), r = await S(e);
					r !== null && (n[String(t.uuid)] = f(r));
					let i = y(t.thumbnail_uuid), s = o(e);
					if (i.length > 0 && s !== null) {
						let e = await p(s.thumbnail_data ?? s.thumbnail_blob ?? s.thumbnail);
						e !== null && (n[i] = f(e));
					}
					a.push(t);
				}
				t[r] = {
					images: a,
					index: v(i.index),
					change: y(i.change)
				};
				continue;
			}
			let r = await S(e.value), i = y(o(e.value)?.uuid, e.key);
			r !== null && i.length > 0 && (n[i] = f(r));
		}
	}
	return {
		metadata: t,
		blobs: n
	};
}
function w(e, t, n) {
	let r = o(e);
	if (r === null) throw Error(`legacy gallery ${t} row is not an object`);
	if (t === "tag") {
		let e = y(r.fileName, y(r.file_name)), t = y(r.name, n);
		if (e.length === 0 || t.length === 0) throw Error("legacy gallery tag row is missing fileName or name");
		let i = {
			fileName: e,
			name: t
		};
		return r.hot !== void 0 && (i.hot = v(r.hot)), i;
	}
	let i = y(r.id_index, y(r.idIndex, n)), a = y(r.fileName, y(r.file_name)), s = y(r.name, n);
	if (i.length === 0 || a.length === 0 || s.length === 0) throw Error(`legacy gallery ${t} row is missing id_index, fileName, or name`);
	return {
		id_index: i,
		fileName: a,
		name: s
	};
}
function T(e, t) {
	let n = [];
	for (let r of _(e)) {
		let e = Array.isArray(r.value) ? r.value : [r.value];
		for (let i of e) n.push(w(i, t, r.key));
	}
	return n;
}
async function E(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = o(r.value);
		if (e !== null && "value" in e && ("key" in e || "id" in e)) {
			let i = y(e.id, y(e.key, s(r.key))), a = await p(e.value);
			i.length > 0 && a !== null && a.byteLength > 0 && (t.push({
				id: i,
				data_base64: f(a),
				date: v(e.date, v(e.createdAt))
			}), n.add(r));
		}
	}
	for (let r of _(e.filter((e) => !n.has(e)))) {
		let e = o(r.value), n = y(e?.id, y(e?.uuid, r.key));
		if (n.length === 0) throw Error("legacy config image entry has no id");
		let i = e === null ? await p(r.value) : await S(e);
		if (i === null || i.byteLength === 0) throw Error(`legacy config image ${n} has no bytes`);
		t.push({
			id: n,
			data_base64: f(i),
			date: v(e?.date, v(e?.createdAt))
		});
	}
	return t;
}
function D(e, t) {
	return e.objectStoreNames.contains(t);
}
function O(e, t) {
	if (!D(e, t)) return Promise.reject(/* @__PURE__ */ Error(`Legacy IndexedDB is missing store ${t}`));
	let { promise: n, resolve: r, reject: i } = Promise.withResolvers(), a = !1, o = [], s;
	try {
		s = e.transaction(t, "readonly");
		let n = s.objectStore(t).openCursor();
		n.onerror = () => {
			a || (a = !0, i(n.error ?? /* @__PURE__ */ Error(`Failed to read IndexedDB store ${t}`)));
		}, n.onsuccess = () => {
			let e = n.result;
			if (e === null) {
				a || (a = !0, r(o));
				return;
			}
			o.push({
				key: e.key,
				value: e.value
			}), e.continue();
		}, s.onerror = () => {
			a || (a = !0, i(s.error ?? /* @__PURE__ */ Error(`Failed to read IndexedDB store ${t}`)));
		};
	} catch (e) {
		i(e instanceof Error ? e : Error(String(e)));
	}
	return n;
}
function k(e) {
	let t = a(e, "indexedDB") ?? a(globalThis, "indexedDB");
	return typeof t != "object" || !t || typeof a(t, "open") != "function" ? null : t;
}
async function A(e) {
	let t = a(e, "databases");
	if (typeof t != "function") return null;
	try {
		let n = await Reflect.apply(t, e, []);
		return new Set(n.map((e) => e.name).filter((e) => e !== void 0));
	} catch {
		return null;
	}
}
function j(e, t) {
	let { promise: n, resolve: r, reject: i } = Promise.withResolvers(), a = !1, o = !1, s;
	try {
		s = e.open(t);
	} catch (e) {
		return i(e instanceof Error ? e : Error(String(e))), n;
	}
	return s.onupgradeneeded = () => {
		a = !0, s.transaction?.abort();
	}, s.onblocked = () => {
		o || (o = !0, i(/* @__PURE__ */ Error(`Legacy IndexedDB ${t} is blocked by another connection`)));
	}, s.onerror = () => {
		if (!o) {
			if (o = !0, a) {
				r(null);
				return;
			}
			i(s.error ?? /* @__PURE__ */ Error(`Failed to open legacy IndexedDB ${t}`));
		}
	}, s.onsuccess = () => {
		if (o) {
			s.result.close();
			return;
		}
		if (o = !0, a) {
			s.result.close(), r(null);
			return;
		}
		r(s.result);
	}, n;
}
async function M(e, t, n) {
	return n !== null && !n.has(t) ? null : j(e, t);
}
async function N(a) {
	let o = k(a);
	if (o === null) return;
	let s = await A(o), c = await M(o, e, s), l = await M(o, t, s), u = await M(o, n, s);
	if (c === null && l === null && u === null) return;
	let d = {}, f = {}, p = [], m = [], h = [], g = [];
	try {
		if (l !== null) {
			if (!D(l, r)) throw Error(`Legacy IndexedDB ${t} is missing store ${r}`);
			let e = await C(await O(l, r));
			Object.assign(d, e.metadata), Object.assign(f, e.blobs);
		}
		if (c !== null) {
			if (!D(c, r)) throw Error(`Legacy IndexedDB ${e} is missing store ${r}`);
			let t = await C(await O(c, r));
			Object.assign(d, t.metadata), Object.assign(f, t.blobs), D(c, "groups") && p.push(...T(await O(c, "groups"), "group")), D(c, "subgroups") && m.push(...T(await O(c, "subgroups"), "group")), D(c, "tags") && h.push(...T(await O(c, "tags"), "tag"));
		}
		if (u !== null) {
			if (!D(u, i)) throw Error(`Legacy IndexedDB ${n} is missing store ${i}`);
			g.push(...await E(await O(u, i)));
		}
	} finally {
		c?.close(), l?.close(), u?.close();
	}
	return {
		tupianhuancun_metadata: d,
		tupianhuancun_blobs: f,
		groups: p,
		subgroups: m,
		tags: h,
		config_images: g
	};
}
//#endregion
export { N as read_legacy_gallery_database };
