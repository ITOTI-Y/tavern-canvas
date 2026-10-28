import { $ as e, p as t, tt as n } from "./vue-i18n-L-BrQRnK.js";
var r = "(min-width: 960px)";
function i() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia(r).matches;
}
function a(a) {
	if (a !== void 0) return t(() => a);
	let o = n(i());
	if (typeof window < "u" && typeof window.matchMedia == "function") {
		let t = window.matchMedia(r), n = (e) => {
			o.value = e.matches;
		};
		t.addEventListener("change", n), e(() => {
			t.removeEventListener("change", n);
		});
	}
	return t(() => o.value ? "desktop" : "mobile");
}
//#endregion
export { a as t };
