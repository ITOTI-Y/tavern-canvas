import { F as e, M as t, R as n, dt as r, h as i, q as a, x as o, y as s, z as c } from "./vue-i18n-XoxYzLIP.js";
import { f as l, s as u, u as d } from "./Teleport-zHbQRGnp.js";
import { r as f } from "./AppTooltip-BeFYZwud.js";
import { i as p } from "./PopoverPortal-CKwmxxi6.js";
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var m = /* @__PURE__ */ o({
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
	setup(o) {
		let m = o, h = p(), { forwardRef: g, currentElement: _ } = l();
		return h.triggerId ||= d(void 0, "reka-popover-trigger"), t(() => {
			h.triggerElement.value = _.value;
		}), (t, o) => (e(), i(c(r(h).hasCustomAnchor.value ? r(u) : r(f)), { "as-child": "" }, {
			default: a(() => [s(r(u), {
				id: r(h).triggerId,
				ref: r(g),
				type: t.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": r(h).open.value,
				"aria-controls": r(h).contentId,
				"data-state": r(h).open.value ? "open" : "closed",
				as: t.as,
				"as-child": m.asChild,
				onClick: r(h).onOpenToggle
			}, {
				default: a(() => [n(t.$slots, "default")]),
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
