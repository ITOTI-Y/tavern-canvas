import { NormalizedOriginSchema, type NormalizedOrigin } from "@tavern-canvas/contracts";
import { z } from "zod";

export type HttpOriginClassification = "loopback" | "private" | "public_or_unknown";

const OccurredAtSchema = z.iso.datetime({ offset: false });

export function normalize_http_origin(value: string): NormalizedOrigin {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new TypeError("Endpoint must be an HTTP or HTTPS origin");
  }
  if (
    (url.protocol !== "http:" && url.protocol !== "https:") ||
    url.username.length > 0 ||
    url.password.length > 0 ||
    url.pathname !== "/" ||
    url.search.length > 0 ||
    url.hash.length > 0
  ) {
    throw new TypeError("Endpoint must be an HTTP or HTTPS origin");
  }
  return NormalizedOriginSchema.parse(url.origin);
}

export function acknowledge_http_origin(
  acknowledgments: Readonly<Record<string, string>>,
  endpoint: string,
  occurred_at: string,
): Readonly<Record<string, string>> {
  const origin = normalize_http_origin(endpoint);
  OccurredAtSchema.parse(occurred_at);
  return Object.freeze({ ...acknowledgments, [origin]: occurred_at });
}

export function is_http_origin_acknowledged(
  acknowledgments: Readonly<Record<string, string>>,
  endpoint: string,
): boolean {
  const origin = normalize_http_origin(endpoint);
  const occurred_at = acknowledgments[origin];
  return occurred_at !== undefined && OccurredAtSchema.safeParse(occurred_at).success;
}

export function requires_http_acknowledgment(endpoint: string): boolean {
  const origin = normalize_http_origin(endpoint);
  return new URL(origin).protocol === "http:";
}

export function classify_http_origin(endpoint: string): HttpOriginClassification {
  const hostname = new URL(normalize_http_origin(endpoint)).hostname.toLowerCase();
  if (hostname === "localhost" || hostname === "[::1]") {
    return "loopback";
  }

  const ipv4 = parse_ipv4(hostname);
  if (ipv4 !== undefined) {
    if (ipv4[0] === 127) {
      return "loopback";
    }
    if (
      ipv4[0] === 10 ||
      (ipv4[0] === 172 && ipv4[1] >= 16 && ipv4[1] <= 31) ||
      (ipv4[0] === 192 && ipv4[1] === 168) ||
      (ipv4[0] === 169 && ipv4[1] === 254)
    ) {
      return "private";
    }
    return "public_or_unknown";
  }

  if (hostname.startsWith("[fc") || hostname.startsWith("[fd")) {
    return "private";
  }
  const link_local_prefix = /^\[fe[89ab]/u;
  return link_local_prefix.test(hostname) ? "private" : "public_or_unknown";
}

export function is_loopback_origin(endpoint: string): boolean {
  return classify_http_origin(endpoint) === "loopback";
}

function parse_ipv4(hostname: string): readonly [number, number, number, number] | undefined {
  const parts = hostname.split(".");
  if (parts.length !== 4) {
    return undefined;
  }
  const octets = parts.map(Number);
  if (octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) {
    return undefined;
  }
  const [first, second, third, fourth] = octets;
  return first === undefined || second === undefined || third === undefined || fourth === undefined
    ? undefined
    : [first, second, third, fourth];
}
