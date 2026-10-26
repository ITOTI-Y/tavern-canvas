import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
//#region src/ui/views/assets/reference_image.ts
var t = /* @__PURE__ */ e({
	read_reference_image: () => r,
	reference_image_bytes: () => i
}), n = 1536;
async function r(e) {
	let t = await createImageBitmap(e);
	try {
		let e = Math.min(1, n / Math.max(t.width, t.height)), r = Math.max(1, Math.round(t.width * e)), i = Math.max(1, Math.round(t.height * e)), a = new OffscreenCanvas(r, i), o = a.getContext("2d");
		if (o === null) throw Error("A 2D canvas context is unavailable in this browser");
		o.drawImage(t, 0, 0, r, i);
		let s = await a.convertToBlob({
			type: "image/jpeg",
			quality: .92
		});
		return await new Promise((e, t) => {
			let n = new FileReader();
			n.onload = () => {
				e(n.result);
			}, n.onerror = () => {
				t(n.error ?? /* @__PURE__ */ Error("The image could not be read"));
			}, n.readAsDataURL(s);
		});
	} finally {
		t.close();
	}
}
function i(e) {
	let t = e.slice(e.indexOf(",") + 1);
	return Uint8Array.from(atob(t), (e) => e.charCodeAt(0));
}
//#endregion
export { t as n, r as t };
