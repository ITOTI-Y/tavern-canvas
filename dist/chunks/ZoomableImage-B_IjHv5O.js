import { C as e, F as t, T as n, _ as r, dt as i, gt as a, m as o, mt as s, n as c, p as l, pt as u, q as d, rt as f, u as p, v as m, x as h, y as g } from "./vue-i18n-XoxYzLIP.js";
import { r as _ } from "./portal_keys-CIBE-_PC.js";
import { t as v } from "./AppIcon-DD754F_c.js";
import { t as y } from "./components_styles-CTlfgDU5.js";
import { t as b } from "./x-CyHrRl6n.js";
import { n as x } from "./_prop_utils-CvImpN6J.js";
import { a as S, c as C, n as w, r as T, s as E } from "./IconButton-CgMe_yUU.js";
//#region src/ui/components/ZoomableImage.vue?vue&type=script&setup=true&lang.ts
var D = ["aria-label"], O = ["src", "alt"], k = ["src", "alt"], A = /* @__PURE__ */ h({
	__name: "ZoomableImage",
	props: {
		src: {},
		alt: {},
		imageClass: {}
	},
	setup(h) {
		let { t: A } = c(), j = f(!1), M = n(_, void 0), N = l(() => M ? { to: M } : {});
		return (n, c) => (t(), r(p, null, [o("button", {
			type: "button",
			class: u(i(y).zoomTrigger),
			"aria-label": `${i(A)("common.actions.enlarge")}: ${h.alt}`,
			onClick: c[0] ||= (e) => j.value = !0
		}, [o("img", {
			src: h.src,
			alt: h.alt,
			class: u(h.imageClass)
		}, null, 10, O)], 10, D), g(i(C), {
			open: j.value,
			"onUpdate:open": c[3] ||= (e) => j.value = e
		}, {
			default: d(() => [g(i(x), s(e(N.value)), {
				default: d(() => [g(i(T), {
					class: u(i(y).dialogOverlay),
					onClick: c[1] ||= (e) => j.value = !1
				}, null, 8, ["class"]), g(i(S), {
					class: u(i(y).zoomContent),
					"aria-describedby": void 0,
					onClick: c[2] ||= (e) => j.value = !1
				}, {
					default: d(() => [
						g(i(w), { class: "tc-visually-hidden" }, {
							default: d(() => [m(a(h.alt), 1)]),
							_: 1
						}),
						o("img", {
							src: h.src,
							alt: h.alt,
							class: u(i(y).zoomImage)
						}, null, 10, k),
						g(i(E), {
							class: u(["tc-interactive", i(y).zoomClose]),
							"aria-label": i(A)("common.actions.close")
						}, {
							default: d(() => [g(v, {
								icon: i(b),
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
