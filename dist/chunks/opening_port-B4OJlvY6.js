//#region src/modules/world_info/slim_store.ts
var e = "tavern_canvas.world_info_slims.v1", t = /\{\{\s*(?:random|roll|pick)\b/iu;
function n(e) {
	return !t.test(e);
}
function r(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619) >>> 0;
	return `${t.toString(16)}-${String(e.length)}`;
}
function i(e) {
	try {
		let t = JSON.parse(e ?? "{}");
		return typeof t == "object" && t ? t : {};
	} catch {
		return {};
	}
}
function a(t) {
	let n = null, r = {}, a = () => {
		let a = t.getItem(e);
		return a !== n && (n = a, r = i(a)), r;
	}, o = (i) => {
		n = JSON.stringify(i), r = i, t.setItem(e, n);
	};
	return {
		lookup(e, t, n) {
			let r = a()[e]?.[String(t)];
			return r !== void 0 && r.hash === n ? r.slim : null;
		},
		get(e, t) {
			return a()[e]?.[String(t)] ?? null;
		},
		save(e, t) {
			let n = a(), r = { ...n[e] };
			for (let e of t) r[String(e.uid)] = {
				hash: e.hash,
				slim: e.slim
			};
			o({
				...n,
				[e]: r
			});
		},
		remove(e, t) {
			let n = a(), r = n[e]?.[String(t)];
			if (r === void 0) return null;
			let { [String(t)]: i, ...s } = n[e] ?? {};
			return o({
				...n,
				[e]: s
			}), r;
		},
		matching(e, t) {
			let n = a()[e], r = /* @__PURE__ */ new Map();
			for (let [e, i] of t) {
				let t = n?.[String(e)];
				t !== void 0 && t.hash === i && r.set(e, t.slim);
			}
			return r;
		}
	};
}
//#endregion
//#region src/ui/contracts/opening_port.ts
var o = Symbol("tavern-canvas-opening");
//#endregion
export { n as i, r as n, a as r, o as t };
