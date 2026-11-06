import { h as e, i as t, r as n, u as r } from "./schemas-BjkyCQYG.js";
import { a as i } from "./ids-pPJWL4BL.js";
import { i as a, o, r as s, t as c } from "./novelai-B6V3MfU9.js";
import { i as l } from "./settings-AUN8XBLO.js";
import { n as u } from "./AppIcon-DkyxvN8k.js";
//#region ../../packages/contracts/src/providers/novelai_defaults.ts
var d = e({
	width: s,
	height: s,
	steps: r().int().min(1).max(50),
	scale: r().min(0).max(10),
	cfg_rescale: r().min(0).max(1),
	sampler: o,
	noise_schedule: a,
	smea: t(),
	dyn: t(),
	variety_plus: t(),
	vibe_asset_ids: n(i).max(16)
}).check((e) => {
	e.value.width * e.value.height > 3145728 && e.issues.push({
		code: "custom",
		input: e.value,
		message: `width × height must not exceed ${String(c)} pixels`,
		path: ["width"]
	});
});
function f(e, t) {
	let n = [];
	t.vibe_asset_ids.length > 0 && e.vibe_transfer === "unsupported" && n.push("vibe_transfer"), (t.smea || t.dyn) && !e.smea && n.push("smea"), t.cfg_rescale > 0 && !e.cfg_rescale && n.push("cfg_rescale"), t.variety_plus && e.variety_sigma === null && n.push("variety_plus");
	let r = e.fixed_settings;
	return r !== null && (t.sampler !== r.sampler && n.push("sampler"), t.steps !== r.steps && n.push("steps")), n;
}
//#endregion
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/image.js
var p = u("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]);
//#endregion
//#region src/transport/http_origin.ts
function m(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (t.protocol !== "http:" && t.protocol !== "https:" || t.username.length > 0 || t.password.length > 0 || t.pathname !== "/" || t.search.length > 0 || t.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return l.parse(t.origin);
}
function h(e) {
	let t = new URL(m(e)).hostname.toLowerCase();
	if (t === "localhost" || t === "[::1]") return "loopback";
	let n = _(t);
	return n === void 0 ? t.startsWith("[fc") || t.startsWith("[fd") || /^\[fe[89ab]/u.test(t) ? "private" : "public_or_unknown" : n[0] === 127 ? "loopback" : n[0] === 10 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168 || n[0] === 169 && n[1] === 254 ? "private" : "public_or_unknown";
}
function g(e) {
	return h(e) === "loopback";
}
function _(e) {
	let t = e.split(".");
	if (t.length !== 4) return;
	let n = t.map(Number);
	if (n.some((e) => !Number.isInteger(e) || e < 0 || e > 255)) return;
	let [r, i, a, o] = n;
	return r === void 0 || i === void 0 || a === void 0 || o === void 0 ? void 0 : [
		r,
		i,
		a,
		o
	];
}
//#endregion
export { f as a, d as i, m as n, p as r, g as t };
