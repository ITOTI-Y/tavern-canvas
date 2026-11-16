import { g as e, u as t } from "./schemas-BjkyCQYG.js";
import { i as n } from "./ids-pPJWL4BL.js";
import { n as r } from "./generation-CxBPzqgd.js";
//#region ../../packages/contracts/src/providers/common.ts
var i = 4294967295, a = e().trim().min(1).max(128).regex(/^[A-Za-z0-9][A-Za-z0-9+._/ -]*$/u), o = t().int().min(0).max(i), s = t().int().min(64).max(4096).multipleOf(8), c = {
	request_id: n,
	generation_anchor: r,
	prompt: e().trim().min(1).max(12e3),
	negative_prompt: e().trim().max(4e3).optional(),
	output_count: t().int().min(1).max(4)
};
//#endregion
export { o as a, a as i, i as n, s as r, c as t };
