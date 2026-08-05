import { describe, expect, it } from "vitest";

import { redact_provider_log } from "./redaction.js";

const sensitive_fields = [
  "prompt",
  "negative_prompt",
  "scene_description",
  "messages",
  "chat_content",
  "secret",
  "api_key",
  "authorization",
  "image",
  "images",
  "base64",
  "upstream_body",
  "upstreamResponseBody",
  "request_body",
  "response_body",
] as const;

describe("redact_provider_log", () => {
  it.each(sensitive_fields)("removes %s regardless of case", (field_name) => {
    const upper_case_field = field_name.toUpperCase();
    const result = redact_provider_log({
      correlation_id: "request-1",
      nested: {
        [upper_case_field]: "fixture-secret-value",
        status_code: 429,
      },
    });

    expect(JSON.stringify(result)).not.toContain("fixture-secret-value");
    expect(result).toEqual({
      correlation_id: "request-1",
      nested: { status_code: 429 },
    });
  });

  it("redacts sensitive fields recursively through arrays", () => {
    const result = redact_provider_log({
      attempts: [
        {
          provider_id: "novelai",
          prompt: "private prompt",
          response: { upstream_body: { error: "private upstream error" } },
        },
        {
          provider_id: "novelai",
          images: ["private base64 image"],
        },
      ],
    });

    expect(result).toEqual({
      attempts: [{ provider_id: "novelai", response: {} }, { provider_id: "novelai" }],
    });
  });

  it("preserves operational metadata", () => {
    expect(
      redact_provider_log({
        correlation_id: "request-1",
        request_id: "request-1",
        job_id: "job-1",
        provider_id: "sd_webui",
        status_code: 503,
        error_code: "provider_unavailable",
        duration_ms: 120,
        byte_length: 4096,
        byte_count: 4096,
      }),
    ).toEqual({
      correlation_id: "request-1",
      request_id: "request-1",
      job_id: "job-1",
      provider_id: "sd_webui",
      status_code: 503,
      error_code: "provider_unavailable",
      duration_ms: 120,
      byte_length: 4096,
      byte_count: 4096,
    });
  });

  it("does not mutate the source log record", () => {
    const source = {
      provider_id: "google_image",
      details: { prompt: "private prompt", duration_ms: 20 },
    };

    const result = redact_provider_log(source);

    expect(source.details.prompt).toBe("private prompt");
    expect(result).toEqual({ provider_id: "google_image", details: { duration_ms: 20 } });
  });
});
