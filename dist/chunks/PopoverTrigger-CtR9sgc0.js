import { B as e, I as t, J as n, N as r, S as i, b as a, ft as o, g as s, z as c } from "./vue-i18n-BQWz_HuU.js";
import { f as l, s as u, u as d } from "./Teleport-B2amidH8.js";
import { r as f } from "./AppTooltip-DuggrS-8.js";
import { i as p } from "./PopoverPortal-CDsj-yHu.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var m = /* @__PURE__ */ i({
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
	setup(i) {
		let m = i, h = p(), { forwardRef: g, currentElement: _ } = l();
		return h.triggerId ||= d(void 0, "reka-popover-trigger"), r(() => {
			h.triggerElement.value = _.value;
		}), (r, i) => (t(), s(e(o(h).hasCustomAnchor.value ? o(u) : o(f)), { "as-child": "" }, {
			default: n(() => [a(o(u), {
				id: o(h).triggerId,
				ref: o(g),
				type: r.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": o(h).open.value,
				"aria-controls": o(h).contentId,
				"data-state": o(h).open.value ? "open" : "closed",
				as: r.as,
				"as-child": m.asChild,
				onClick: o(h).onOpenToggle
			}, {
				default: n(() => [c(r.$slots, "default")]),
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
