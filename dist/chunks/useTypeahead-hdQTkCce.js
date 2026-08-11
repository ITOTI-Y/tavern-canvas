import { H as e } from "./vue-i18n-DUz2Gjn8.js";
import { w as t, x as n } from "./Teleport-C7mDSUEl.js";
import { o as r } from "./FocusScope-B2vRGnoX.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
var i = 0;
function a() {
	e((e) => {
		if (!n) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? o()), document.body.insertAdjacentElement("beforeend", t[1] ?? o()), i++, e(() => {
			i === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), i--;
		});
	});
}
function o() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function s(e) {
	let n = t("", 1e3);
	return {
		search: n,
		handleTypeaheadSearch: (t, i) => {
			if (n.value += t, e) e(t);
			else {
				let e = r(), t = i.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), a = t.find((t) => t.ref === e), o = l(t.map((e) => e.textValue), n.value, a?.textValue), s = t.find((e) => e.textValue === o);
				return s && s.ref.focus(), s?.ref;
			}
		},
		resetTypeahead: () => {
			n.value = "";
		}
	};
}
function c(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function l(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = c(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
export { a as n, s as t };
