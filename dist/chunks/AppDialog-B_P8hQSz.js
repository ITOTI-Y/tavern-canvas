import { E as e, I as t, J as n, M as r, N as i, S as a, _ as o, _t as s, b as c, ft as l, g as u, h as d, ht as f, m as p, mt as m, w as h, y as g, z as _ } from "./vue-i18n-BQWz_HuU.js";
import { n as v } from "./portal_keys-DthxrmWp.js";
import { t as y } from "./AppIcon-B1iv8vRB.js";
import { t as b } from "./components_styles-Cab5IILs.js";
import { t as x } from "./x-CZeKQbKW.js";
import { n as S } from "./_prop_utils-BQHilWOI.js";
import { a as C, c as w, i as T, l as E, o as D, r as O } from "./IconButton-DbYdD8bu.js";
//#endregion
//#region src/ui/components/AppDialog.vue
var k = /* @__PURE__ */ a({
	__name: "AppDialog",
	props: {
		open: { type: Boolean },
		title: {},
		description: {},
		closeLabel: {}
	},
	emits: ["update:open"],
	setup(a, { emit: k }) {
		let A = k;
		function j(e) {
			A("update:open", e);
		}
		let M = e(v, void 0), N = p(() => M ? { to: M } : {}), P = !1;
		function F(e) {
			P = e.composedPath().some((e) => e instanceof HTMLElement && e.dataset.dismissableLayer !== void 0);
		}
		function I(e) {
			P && e.preventDefault();
		}
		return i(() => {
			window.addEventListener("pointerdown", F, !0);
		}), r(() => {
			window.removeEventListener("pointerdown", F, !0);
		}), (e, r) => (t(), u(l(E), {
			open: a.open,
			"onUpdate:open": j
		}, {
			default: n(() => [c(l(S), f(h(N.value)), {
				default: n(() => [c(l(T), { class: m(l(b).dialogOverlay) }, null, 8, ["class"]), c(l(D), {
					class: m(l(b).dialogContent),
					onPointerDownOutside: I
				}, {
					default: n(() => [
						d("header", { class: m(l(b).dialogHeader) }, [c(l(O), { class: m(l(b).dialogTitle) }, {
							default: n(() => [g(s(a.title), 1)]),
							_: 1
						}, 8, ["class"]), c(l(w), {
							class: m(["tc-interactive", l(b).dialogClose]),
							"aria-label": a.closeLabel
						}, {
							default: n(() => [c(y, {
								icon: l(x),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])], 2),
						a.description ? (t(), u(l(C), {
							key: 0,
							class: m(l(b).dialogDescription)
						}, {
							default: n(() => [g(s(a.description), 1)]),
							_: 1
						}, 8, ["class"])) : o("", !0),
						d("div", { class: m(l(b).dialogBody) }, [_(e.$slots, "default")], 2)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 16)]),
			_: 3
		}, 8, ["open"]));
	}
});
//#endregion
export { k as t };
