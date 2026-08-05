const SENSITIVE_FIELD_NAMES = new Set([
  "prompt",
  "negativeprompt",
  "scenedescription",
  "messages",
  "chatcontent",
  "secret",
  "apikey",
  "authorization",
  "image",
  "images",
  "base64",
  "body",
  "upstreambody",
  "upstreamresponse",
  "upstreamresponsebody",
  "requestbody",
  "responsebody",
]);

export function redact_provider_log(value: unknown): unknown {
  return redact_value(value, new WeakMap<object, unknown>());
}

function redact_value(value: unknown, seen: WeakMap<object, unknown>): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (value instanceof Uint8Array) {
    return { byte_length: value.byteLength };
  }
  if (value instanceof Date) {
    return value.toISOString();
  }

  const existing = seen.get(value);
  if (existing !== undefined) {
    return "[Circular]";
  }

  if (Array.isArray(value)) {
    const redacted: unknown[] = [];
    seen.set(value, redacted);
    for (const item of value) {
      redacted.push(redact_value(item, seen));
    }
    return redacted;
  }

  const redacted: Record<string, unknown> = {};
  seen.set(value, redacted);
  for (const [key, child] of Object.entries(value)) {
    if (!is_sensitive_field(key)) {
      redacted[key] = redact_value(child, seen);
    }
  }
  return redacted;
}

function is_sensitive_field(key: string): boolean {
  const normalized = key.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
  return (
    SENSITIVE_FIELD_NAMES.has(normalized) ||
    ((normalized.startsWith("upstream") ||
      normalized.startsWith("request") ||
      normalized.startsWith("response")) &&
      normalized.endsWith("body"))
  );
}
