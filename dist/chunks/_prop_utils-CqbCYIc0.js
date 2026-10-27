import { C as e, D as t, F as n, I as r, N as i, S as a, V as o, W as s, _ as c, ct as l, dt as u, g as d, h as f, ot as p, p as m, u as h, x as g } from "./vue-i18n-DUz2Gjn8.js";
import { p as _, t as v } from "./Teleport-CZ6NJvBB.js";
import { a as y } from "./PopperContent-8IQaFABb.js";
import { l as b } from "./Collection-DWsxNExQ.js";
//#region ../../node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function x(e) {
	return typeof e == "string" ? `'${e}'` : new S().serialize(e);
}
var S = /*@__PURE__*/ function() {
	class e {
		#e = /* @__PURE__ */ new Map();
		compare(e, t) {
			let n = typeof e, r = typeof t;
			return n === "string" && r === "string" ? e.localeCompare(t) : n === "number" && r === "number" ? e - t : String.prototype.localeCompare.call(this.serialize(e, !0), this.serialize(t, !0));
		}
		serialize(e, t) {
			if (e === null) return "null";
			switch (typeof e) {
				case "string": return t ? e : `'${e}'`;
				case "bigint": return `${e}n`;
				case "object": return this.$object(e);
				case "function": return this.$function(e);
			}
			return String(e);
		}
		serializeObject(e) {
			let t = Object.prototype.toString.call(e);
			if (t !== "[object Object]") return this.serializeBuiltInType(t.length < 10 ? `unknown:${t}` : t.slice(8, -1), e);
			let n = e.constructor, r = n === Object || n === void 0 ? "" : n.name;
			if (r !== "" && globalThis[r] === n) return this.serializeBuiltInType(r, e);
			if (typeof e.toJSON == "function") {
				let t = e.toJSON();
				return r + (typeof t == "object" && t ? this.$object(t) : `(${this.serialize(t)})`);
			}
			return this.serializeObjectEntries(r, Object.entries(e));
		}
		serializeBuiltInType(e, t) {
			let n = this["$" + e];
			if (n) return n.call(this, t);
			if (typeof t?.entries == "function") return this.serializeObjectEntries(e, t.entries());
			throw Error(`Cannot serialize ${e}`);
		}
		serializeObjectEntries(e, t) {
			let n = Array.from(t).sort((e, t) => this.compare(e[0], t[0])), r = `${e}{`;
			for (let e = 0; e < n.length; e++) {
				let [t, i] = n[e];
				r += `${this.serialize(t, !0)}:${this.serialize(i)}`, e < n.length - 1 && (r += ",");
			}
			return r + "}";
		}
		$object(e) {
			let t = this.#e.get(e);
			return t === void 0 && (this.#e.set(e, `#${this.#e.size}`), t = this.serializeObject(e), this.#e.set(e, t)), t;
		}
		$function(e) {
			let t = Function.prototype.toString.call(e);
			return t.slice(-15) === "[native code] }" ? `${e.name || ""}()[native]` : `${e.name}(${e.length})${t.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(e) {
			let t = "[";
			for (let n = 0; n < e.length; n++) t += this.serialize(e[n]), n < e.length - 1 && (t += ",");
			return t + "]";
		}
		$Date(e) {
			try {
				return `Date(${e.toISOString()})`;
			} catch {
				return "Date(null)";
			}
		}
		$ArrayBuffer(e) {
			return `ArrayBuffer[${new Uint8Array(e).join(",")}]`;
		}
		$Set(e) {
			return `Set${this.$Array(Array.from(e).sort((e, t) => this.compare(e, t)))}`;
		}
		$Map(e) {
			return this.serializeObjectEntries("Map", e.entries());
		}
	}
	for (let t of [
		"Error",
		"RegExp",
		"URL"
	]) e.prototype["$" + t] = function(e) {
		return `${t}(${e})`;
	};
	for (let t of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join(",")}]`;
	};
	for (let t of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + t] = function(e) {
		return `${t}[${e.join("n,")}${e.length > 0 ? "n" : ""}]`;
	};
	return e;
}();
function C(e, t) {
	return e === t || x(e) === x(t);
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
function w(e, t = -Infinity, n = Infinity) {
	return Math.min(n, Math.max(t, e));
}
function T(e, t) {
	let n = e, r = t.toString(), i = r.indexOf("."), a = i >= 0 ? r.length - i : 0;
	if (a > 0) {
		let e = 10 ** a;
		n = Math.round(n * e) / e;
	}
	return n;
}
function E(e, t, n, r) {
	t = Number(t), n = Number(n);
	let i = (e - (Number.isNaN(t) ? 0 : t)) % r, a = T(Math.abs(i) * 2 >= r ? e + Math.sign(i) * (r - Math.abs(i)) : e - i, r);
	return Number.isNaN(t) ? !Number.isNaN(n) && a > n && (a = Math.floor(T(n / r, r)) * r) : a < t ? a = t : !Number.isNaN(n) && a > n && (a = t + Math.floor(T((n - t) / r, r)) * r), a = T(a, r), a;
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function D(e) {
	return m(() => !p(e) || !!_(e)?.closest("form"));
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
function O() {
	let e = a()?.vnode?.scopeId;
	return e ? { [e]: "" } : {};
}
//#endregion
//#region ../../node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var k = /* @__PURE__ */ g({
	__name: "DialogPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(t) {
		let n = t;
		return (t, a) => (i(), f(l(v), u(e(n)), {
			default: s(() => [r(t.$slots, "default")]),
			_: 3
		}, 16));
	}
}), A = /* @__PURE__ */ g({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let n = e, { primitiveElement: r, currentElement: a } = b(), s = m(() => n.checked ?? n.value);
		return o(s, (e, t) => {
			if (!a.value) return;
			let n = a.value, r = window.HTMLInputElement.prototype, i = Object.getOwnPropertyDescriptor(r, "value").set;
			if (i && e !== t) {
				let t = new Event("input", { bubbles: !0 }), r = new Event("change", { bubbles: !0 });
				i.call(n, e), n.dispatchEvent(t), n.dispatchEvent(r);
			}
		}), (e, a) => (i(), f(y, t({
			ref_key: "primitiveElement",
			ref: r
		}, {
			...n,
			...e.$attrs
		}, { as: "input" }), null, 16));
	}
}), j = /* @__PURE__ */ g({
	inheritAttrs: !1,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: !0
		},
		value: {
			type: null,
			required: !0
		},
		checked: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		required: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		feature: {
			type: String,
			required: !1,
			default: "fully-hidden"
		}
	},
	setup(e) {
		let r = e, a = m(() => typeof r.value == "object" && Array.isArray(r.value) && r.value.length === 0 && r.required), o = m(() => typeof r.value == "string" || typeof r.value == "number" || typeof r.value == "boolean" || r.value === null || r.value === void 0 ? [{
			name: r.name,
			value: r.value
		}] : typeof r.value == "object" && Array.isArray(r.value) ? r.value.flatMap((e, t) => typeof e == "object" ? Object.entries(e).map(([e, n]) => ({
			name: `${r.name}[${t}][${e}]`,
			value: n
		})) : {
			name: `${r.name}[${t}]`,
			value: e
		}) : r.value !== null && typeof r.value == "object" && !Array.isArray(r.value) ? Object.entries(r.value).map(([e, t]) => ({
			name: `${r.name}[${e}]`,
			value: t
		})) : []);
		return (e, s) => (i(), c(h, null, [d(" We render single input if it's required "), a.value ? (i(), f(A, t({ key: e.name }, {
			...r,
			...e.$attrs
		}, {
			name: e.name,
			value: e.value
		}), null, 16, ["name", "value"])) : (i(!0), c(h, { key: 1 }, n(o.value, (n) => (i(), f(A, t({ key: n.name }, { ref_for: !0 }, {
			...r,
			...e.$attrs
		}, {
			name: n.name,
			value: n.value
		}), null, 16, ["name", "value"]))), 128))], 2112));
	}
});
//#endregion
//#region src/ui/components/_prop_utils.ts
function M(e) {
	let t = {};
	for (let n of Object.keys(e)) {
		let r = e[n];
		r !== void 0 && (t[n] = r);
	}
	return t;
}
//#endregion
export { D as a, C as c, O as i, j as n, w as o, k as r, E as s, M as t };
