import { n as e } from "./provider-9M1GIrZ6.js";
//#region src/ui/chat/slot_error_label.ts
function t(t, n) {
	switch (n) {
		case "analysis_unparsable": return t("chat.errors.analysis_unparsable");
		case "message_changed": return t("chat.errors.message_changed");
		case "no_chat_open": return t("chat.errors.no_chat_open");
	}
	let r = e.safeParse(n);
	if (!r.success) return n;
	switch (r.data) {
		case "auth_failed": return t("chat.errors.auth_failed");
		case "rate_limited": return t("chat.errors.rate_limited");
		case "content_blocked": return t("chat.errors.content_blocked");
		case "invalid_request": return t("chat.errors.invalid_request");
		case "provider_unavailable": return t("chat.errors.provider_unavailable");
		case "timed_out": return t("chat.errors.timed_out");
		case "cancelled": return t("chat.errors.cancelled");
		case "malformed_response": return t("chat.errors.malformed_response");
		case "not_configured": return t("chat.errors.not_configured");
		case "storage_failed": return t("chat.errors.storage_failed");
		case "interrupted": return t("chat.errors.interrupted");
	}
}
//#endregion
export { t };
