//#region src/modules/novelai/novelai_errors.ts
var e = class extends Error {
	code = "capability_unavailable";
	constructor(e) {
		super(e), this.name = "NovelAiServiceUnavailableError";
	}
};
//#endregion
export { e as t };
