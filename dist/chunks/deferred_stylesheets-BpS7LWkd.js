//#region src/ui/styles/deferred_stylesheets.ts
var e = [
	"components",
	"dialogs",
	"illustrate_dialog",
	"prompt_field",
	"assets",
	"gallery",
	"prompt",
	"diagnostics",
	"settings"
], t = "data-deferred-stylesheet", n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
function i(n) {
	let r = n.getAttribute(t);
	return r === null ? -1 : e.indexOf(r);
}
function a(n, r, a) {
	let o = [...n.querySelectorAll("style")], s = o.find((e) => e.getAttribute(t) === r);
	if (s) {
		s.textContent = a;
		return;
	}
	let c = n.ownerDocument.createElement("style");
	c.setAttribute(t, r), c.textContent = a;
	let l = e.indexOf(r), u = o.findLast((e) => i(e) < l);
	u ? u.after(c) : n.prepend(c);
}
function o(e, t) {
	n.set(e, t);
	for (let n of r) a(n, e, t);
}
function s(e) {
	r.add(e);
	for (let [t, r] of n) a(e, t, r);
	return () => {
		r.delete(e);
	};
}
//#endregion
export { o as n, s as t };
