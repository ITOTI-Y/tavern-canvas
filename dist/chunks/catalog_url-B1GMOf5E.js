//#region src/modules/vocabulary/catalog_url.ts
var e = ["huggingface.co", "hf.co"], t = /^[\w.-]+\/[\w.-]+$/u, n = /^\/datasets\/([\w.-]+\/[\w.-]+)(?:\/tree\/[\w.-]+)?\/?$/u;
function r(t) {
	return e.some((e) => t === e || t.endsWith(`.${e}`));
}
function i(e) {
	return `https://huggingface.co/datasets/${e}/resolve/main/catalog.json`;
}
function a(e) {
	let a = e.trim();
	if (a === "") return "";
	if (t.test(a)) return i(a);
	if (!URL.canParse(a)) return null;
	let o = new URL(a);
	if (o.protocol !== "https:") return null;
	let s = r(o.hostname) ? n.exec(o.pathname) : null;
	return s?.[1] === void 0 ? o.href : i(s[1]);
}
//#endregion
export { r as n, a as t };
