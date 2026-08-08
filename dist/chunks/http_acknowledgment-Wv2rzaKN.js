import { gt as e, h as t } from "./src-CpgRWEjb.js";
//#region src/transport/http_acknowledgment.ts
var n = e({ offset: !1 });
function r(e) {
	let n;
	try {
		n = new URL(e);
	} catch {
		throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	}
	if (n.protocol !== "http:" && n.protocol !== "https:" || n.username.length > 0 || n.password.length > 0 || n.pathname !== "/" || n.search.length > 0 || n.hash.length > 0) throw TypeError("Endpoint must be an HTTP or HTTPS origin");
	return t.parse(n.origin);
}
function i(e, t, i) {
	let a = r(t);
	return n.parse(i), Object.freeze({
		...e,
		[a]: i
	});
}
function a(e, t) {
	let i = e[r(t)];
	return i !== void 0 && n.safeParse(i).success;
}
function o(e) {
	let t = r(e);
	return new URL(t).protocol === "http:";
}
function s(e) {
	let t = new URL(r(e)).hostname.toLowerCase();
	if (t === "localhost" || t === "[::1]") return "loopback";
	let n = l(t);
	return n === void 0 ? t.startsWith("[fc") || t.startsWith("[fd") || /^\[fe[89ab]/u.test(t) ? "private" : "public_or_unknown" : n[0] === 127 ? "loopback" : n[0] === 10 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && n[1] === 168 || n[0] === 169 && n[1] === 254 ? "private" : "public_or_unknown";
}
function c(e) {
	return s(e) === "loopback";
}
function l(e) {
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
export { r as a, c as i, s as n, o, a as r, i as t };
