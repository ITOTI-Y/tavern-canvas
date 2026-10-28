import { G as e, L as t, P as n, R as r, h as i, j as a, lt as o, x as s, y as c } from "./vue-i18n-L-BrQRnK.js";
import { f as l, s as u, u as d } from "./Teleport-CquQcgiX.js";
import { r as f } from "./PopperContent-BPSDCuaj.js";
import { i as p } from "./PopoverPortal-BFGvpcA5.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var m = /* @__PURE__ */ s({
	__name: "PopoverTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(s) {
		let m = s, h = p(), { forwardRef: g, currentElement: _ } = l();
		return h.triggerId ||= d(void 0, "reka-popover-trigger"), a(() => {
			h.triggerElement.value = _.value;
		}), (a, s) => (n(), i(r(o(h).hasCustomAnchor.value ? o(u) : o(f)), { "as-child": "" }, {
			default: e(() => [c(o(u), {
				id: o(h).triggerId,
				ref: o(g),
				type: a.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": o(h).open.value,
				"aria-controls": o(h).contentId,
				"data-state": o(h).open.value ? "open" : "closed",
				as: a.as,
				"as-child": m.asChild,
				onClick: o(h).onOpenToggle
			}, {
				default: e(() => [t(a.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"as",
				"as-child",
				"onClick"
			])]),
			_: 3
		}));
	}
});
//#endregion
export { m as t };
