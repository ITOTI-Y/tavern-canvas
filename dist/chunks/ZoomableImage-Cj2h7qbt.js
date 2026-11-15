import { E as e, I as t, J as n, S as r, _t as i, b as a, d as o, ft as s, h as c, ht as l, it as u, m as d, mt as f, n as p, v as m, w as h, y as g } from "./vue-i18n-BQWz_HuU.js";
import { n as _ } from "./portal_keys-DthxrmWp.js";
import { t as v } from "./AppIcon-B1iv8vRB.js";
import { t as y } from "./components_styles-Cab5IILs.js";
import { t as b } from "./x-CZeKQbKW.js";
import { n as x } from "./_prop_utils-BQHilWOI.js";
import { c as S, i as C, l as w, o as T, r as E } from "./IconButton-DbYdD8bu.js";
//#region src/ui/components/ZoomableImage.vue?vue&type=script&setup=true&lang.ts
var D = ["aria-label"], O = ["src", "alt"], k = ["src", "alt"], A = /* @__PURE__ */ r({
	__name: "ZoomableImage",
	props: {
		src: {},
		alt: {},
		imageClass: {}
	},
	setup(r) {
		let { t: A } = p(), j = u(!1), M = e(_, void 0), N = d(() => M ? { to: M } : {});
		return (e, u) => (t(), m(o, null, [c("button", {
			type: "button",
			class: f(s(y).zoomTrigger),
			"aria-label": `${s(A)("common.actions.enlarge")}: ${r.alt}`,
			onClick: u[0] ||= (e) => j.value = !0
		}, [c("img", {
			src: r.src,
			alt: r.alt,
			class: f(r.imageClass)
		}, null, 10, O)], 10, D), a(s(w), {
			open: j.value,
			"onUpdate:open": u[3] ||= (e) => j.value = e
		}, {
			default: n(() => [a(s(x), l(h(N.value)), {
				default: n(() => [a(s(C), {
					class: f(s(y).dialogOverlay),
					onClick: u[1] ||= (e) => j.value = !1
				}, null, 8, ["class"]), a(s(T), {
					class: f(s(y).zoomContent),
					"aria-describedby": void 0,
					onClick: u[2] ||= (e) => j.value = !1
				}, {
					default: n(() => [
						a(s(E), { class: "tc-visually-hidden" }, {
							default: n(() => [g(i(r.alt), 1)]),
							_: 1
						}),
						c("img", {
							src: r.src,
							alt: r.alt,
							class: f(s(y).zoomImage)
						}, null, 10, k),
						a(s(S), {
							class: f(["tc-interactive", s(y).zoomClose]),
							"aria-label": s(A)("common.actions.close")
						}, {
							default: n(() => [a(v, {
								icon: s(b),
								size: 18
							}, null, 8, ["icon"])]),
							_: 1
						}, 8, ["class", "aria-label"])
					]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 16)]),
			_: 1
		}, 8, ["open"])], 64));
	}
});
//#endregion
export { A as t };
