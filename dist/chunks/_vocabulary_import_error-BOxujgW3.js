//#region src/bootstrap/capabilities/_vocabulary_import_error.ts
var e = class extends Error {
	code;
	constructor(e, t) {
		super(t), this.name = "VocabularyImportError", this.code = e;
	}
};
//#endregion
export { e as t };
