import { C as e, G as t, P as n, T as r, _ as i, dt as a, ft as o, lt as s, m as c, mt as l, n as u, p as d, tt as f, u as p, v as m, x as h, y as g } from "./vue-i18n-L-BrQRnK.js";
import { n as _ } from "./portal_keys-DthxrmWp.js";
import { t as v } from "./AppIcon-DkyxvN8k.js";
import { t as y } from "./components_styles-D-hVkM2e.js";
import { t as b } from "./x-D7Ry5i_D.js";
import { n as x } from "./_prop_utils-DgoYzKlR.js";
import { c as S, i as C, l as w, o as T, r as E } from "./IconButton-DsFRFlSI.js";
//#region src/ui/components/ZoomableImage.vue?vue&type=script&setup=true&lang.ts
var D = ["aria-label"], O = ["src", "alt"], k = ["src", "alt"], A = /* @__PURE__ */ h({
	__name: "ZoomableImage",
	props: {
		src: {},
		alt: {},
		imageClass: {}
	},
	setup(h) {
		let { t: A } = u(), j = f(!1), M = r(_, void 0), N = d(() => M ? { to: M } : {});
		return (r, u) => (n(), i(p, null, [c("button", {
			type: "button",
			class: a(s(y).zoomTrigger),
			"aria-label": `${s(A)("common.actions.enlarge")}: ${h.alt}`,
			onClick: u[0] ||= (e) => j.value = !0
		}, [c("img", {
			src: h.src,
			alt: h.alt,
			class: a(h.imageClass)
		}, null, 10, O)], 10, D), g(s(w), {
			open: j.value,
			"onUpdate:open": u[3] ||= (e) => j.value = e
		}, {
			default: t(() => [g(s(x), o(e(N.value)), {
				default: t(() => [g(s(C), {
					class: a(s(y).dialogOverlay),
					onClick: u[1] ||= (e) => j.value = !1
				}, null, 8, ["class"]), g(s(T), {
					class: a(s(y).zoomContent),
					"aria-describedby": void 0,
					onClick: u[2] ||= (e) => j.value = !1
				}, {
					default: t(() => [
						g(s(E), { class: "tc-visually-hidden" }, {
							default: t(() => [m(l(h.alt), 1)]),
							_: 1
						}),
						c("img", {
							src: h.src,
							alt: h.alt,
							class: a(s(y).zoomImage)
						}, null, 10, k),
						g(s(S), {
							class: a(["tc-interactive", s(y).zoomClose]),
							"aria-label": s(A)("common.actions.close")
						}, {
							default: t(() => [g(v, {
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
