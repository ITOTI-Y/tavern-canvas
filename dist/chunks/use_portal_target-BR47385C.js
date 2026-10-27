import { T as e } from "./vue-i18n-DUz2Gjn8.js";
import { n as t } from "./portal_keys-BFbEhMBO.js";
//#region src/ui/shell/use_portal_target.ts
function n() {
	let n = e(t);
	if (n === void 0) throw Error("No portal target was provided: every Reka portal must render inside the Shadow Root's dedicated portal element (see contracts/portal_keys.ts). Wrap this component tree in <PortalProvider>.");
	return n;
}
//#endregion
export { n as t };
