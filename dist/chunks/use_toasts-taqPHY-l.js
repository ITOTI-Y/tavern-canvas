import { tt as e } from "./vue-i18n-L-BrQRnK.js";
//#region src/ui/views/prompt/use_toasts.ts
function t() {
	let t = e([]);
	function n(e) {
		t.value = [...t.value, {
			...e,
			id: crypto.randomUUID()
		}];
	}
	function r(e) {
		t.value = t.value.filter((t) => t.id !== e);
	}
	return {
		toasts: t,
		push: n,
		dismiss: r
	};
}
//#endregion
export { t };
