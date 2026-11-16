import { p as e, rt as t, tt as n } from "./vue-i18n-XoxYzLIP.js";
var r = "(min-width: 960px)";
function i() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(r).matches;
}
function a(a) {
	if (a !== void 0) return e(() => a);
	let o = t(i());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(r), t = (e) => {
			o.value = e.matches;
		};
		e.addEventListener("change", t), n(() => {
			e.removeEventListener("change", t);
		});
	}
	return e(() => o.value ? "desktop" : "mobile");
}
//#endregion
export { a as t };
