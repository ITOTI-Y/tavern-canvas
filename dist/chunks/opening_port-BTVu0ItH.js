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
function i(t) {
	try {
		let n = JSON.parse(t.getItem(e) ?? "{}");
		return typeof n == "object" && n ? n : {};
	} catch {
		return {};
	}
}
function a(t) {
	let n = i(t);
	return {
		lookup(e, t, r) {
			let i = n[e]?.[String(t)];
			return i !== void 0 && i.hash === r ? i.slim : null;
		},
		save(r, a) {
			n = i(t);
			let o = { ...n[r] };
			for (let e of a) o[String(e.uid)] = {
				hash: e.hash,
				slim: e.slim
			};
			n = {
				...n,
				[r]: o
			}, t.setItem(e, JSON.stringify(n));
		},
		matching(e, t) {
			let r = /* @__PURE__ */ new Map();
			for (let [i, a] of t) {
				let t = n[e]?.[String(i)];
				t !== void 0 && t.hash === a && r.set(i, t.slim);
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
