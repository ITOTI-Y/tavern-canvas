//#region src/modules/illustration/analysis_error.ts
var e = class extends Error {
	excerpt;
	constructor(e, t) {
		super(e), this.name = "AnalysisParseError", this.excerpt = t.slice(0, 400);
	}
};
//#endregion
export { e as t };
