import { W as e, r as t } from "./AppIcon-BpY-A4VH.js";
import { G as n, U as r, Z as i } from "./PopperContent-_OEj_1Tb.js";
//#region ../../node_modules/.pnpm/lucide-vue-next@1.0.0_vue@3.5.40_typescript@6.0.3_/node_modules/lucide-vue-next/dist/esm/icons/chevron-down.js
var a = t("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), o = 0;
function s() {
	e((e) => {
		if (!r) return;
		let t = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", t[0] ?? c()), document.body.insertAdjacentElement("beforeend", t[1] ?? c()), o++, e(() => {
			o === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((e) => e.remove()), o--;
		});
	});
}
function c() {
	let e = document.createElement("span");
	return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function l(e) {
	let t = n("", 1e3);
	return {
		search: t,
		handleTypeaheadSearch: (n, r) => {
			if (t.value += n, e) e(n);
			else {
				let e = i(), n = r.map((e) => ({
					...e,
					textValue: e.value?.textValue ?? e.ref.textContent?.trim() ?? ""
				})), a = n.find((t) => t.ref === e), o = d(n.map((e) => e.textValue), t.value, a?.textValue), s = n.find((e) => e.textValue === o);
				return s && s.ref.focus(), s?.ref;
			}
		},
		resetTypeahead: () => {
			t.value = "";
		}
	};
}
function u(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function d(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = u(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
//#endregion
export { s as n, a as r, l as t };

//# sourceMappingURL=useTypeahead-DHbSip40.js.map