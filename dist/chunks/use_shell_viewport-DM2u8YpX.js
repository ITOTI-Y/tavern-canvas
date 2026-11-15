import { it as e, m as t, nt as n } from "./vue-i18n-BQWz_HuU.js";
var r = "(min-width: 960px)";
function i() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(r).matches;
}
function a(a) {
	if (a !== void 0) return t(() => a);
	let o = e(i());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let e = window.matchMedia(r), t = (e) => {
			o.value = e.matches;
		};
		e.addEventListener("change", t), n(() => {
			e.removeEventListener("change", t);
		});
	}
	return t(() => o.value ? "desktop" : "mobile");
}
//#endregion
export { a as t };
