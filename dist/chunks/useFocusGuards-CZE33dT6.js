import { U as e } from "./vue-i18n-L-BrQRnK.js";
import { w as t } from "./Teleport-CquQcgiX.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var n = 0;
function r() {
	e((e) => {
		if (!t) return;
		let r = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", r[0] ?? i()), document.body.insertAdjacentElement("beforeend", r[1] ?? i()), n++, e(() => {
			n === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), n--;
		});
	});
}
function i() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
export { r as t };
