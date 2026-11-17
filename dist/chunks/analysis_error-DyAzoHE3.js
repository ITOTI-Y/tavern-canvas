//#region src/modules/illustration/analysis_error.ts
var e = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
}, t = class extends Error {
	reason;
	constructor(e) {
		super(e === "cancelled" ? "Analysis was cancelled" : "Analysis timed out"), this.name = "AnalysisStoppedError", this.reason = e;
	}
};
//#endregion
export { t as n, e as t };
