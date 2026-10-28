import { ProviderErrorCodeSchema } from "@tavern-canvas/contracts";

type Translate = (key: string) => string;

/** A slot error is either a provider error code or the message of a submission that never queued. */
export function slot_error_label(t: Translate, error: string): string {
  const code = ProviderErrorCodeSchema.safeParse(error);
  if (!code.success) {
    return error;
  }
  switch (code.data) {
    case "auth_failed":
      return t("chat.errors.auth_failed");
    case "rate_limited":
      return t("chat.errors.rate_limited");
    case "content_blocked":
      return t("chat.errors.content_blocked");
    case "invalid_request":
      return t("chat.errors.invalid_request");
    case "provider_unavailable":
      return t("chat.errors.provider_unavailable");
    case "timed_out":
      return t("chat.errors.timed_out");
    case "cancelled":
      return t("chat.errors.cancelled");
    case "malformed_response":
      return t("chat.errors.malformed_response");
    case "not_configured":
      return t("chat.errors.not_configured");
    case "storage_failed":
      return t("chat.errors.storage_failed");
  }
}
