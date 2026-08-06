import galleryFixture from "../../../tests/fixtures/migration/v2_gallery_metadata.json" with { type: "json" };
import messagesFixture from "../../../tests/fixtures/migration/v2_messages.json" with { type: "json" };
import settingsFixture from "../../../tests/fixtures/migration/v2_settings_full.json" with { type: "json" };
import { describe, expect, it } from "vitest";

import {
  assert_settings_fully_classified,
  classify_settings_paths,
  CONVERTER_NAMES,
  convert_assets,
  convert_characters,
  convert_gallery,
  convert_knowledge,
  convert_messages,
  convert_prompts,
  convert_provider,
  convert_settings,
  UnknownLegacyPathError,
} from "./converter_registry.js";
import {
  LegacyGalleryDatabaseFixtureSchema,
  LegacyMessagesFixtureSchema,
  LegacySettingsSchema,
} from "./legacy_schema.js";

const legacy_settings = LegacySettingsSchema.parse(settingsFixture);
const legacy_gallery = LegacyGalleryDatabaseFixtureSchema.parse(galleryFixture);
const legacy_messages = LegacyMessagesFixtureSchema.parse(messagesFixture);
const context = { namespace: "primary", migrated_at: "2026-08-06T00:00:00.000Z" };

describe("fixtures", () => {
  it("parse against their legacy schemas", () => {
    expect(Object.keys(legacy_settings).length).toBeGreaterThan(100);
    expect(Object.keys(legacy_gallery.tupianhuancun_metadata).length).toBeGreaterThan(0);
    expect(legacy_messages.messages.length).toBeGreaterThan(0);
  });
});

describe("classify_settings_paths", () => {
  it("classifies every own path in the fully populated settings fixture", () => {
    const result = classify_settings_paths(legacy_settings);

    expect(result.unknown).toEqual([]);
    expect(result.classified.length).toBeGreaterThan(100);
    expect(() => assert_settings_fully_classified(legacy_settings)).not.toThrow();
  });

  it("classifies every path as exactly one of the three closed categories", () => {
    const { classified } = classify_settings_paths(legacy_settings);
    const allowed = new Set(["mapped", "deferred_secret_transfer", "intentionally_obsolete"]);

    for (const entry of classified) {
      expect(allowed.has(entry.rule.classification)).toBe(true);
    }
  });

  it("fails an unknown top-level path instead of silently dropping it", () => {
    const polluted = { ...legacy_settings, unknown_future_field: "surprise" };

    const result = classify_settings_paths(polluted);

    expect(result.unknown).toEqual(["unknown_future_field"]);
    expect(() => assert_settings_fully_classified(polluted)).toThrow(UnknownLegacyPathError);
  });

  it("fails an unknown nested path even inside an otherwise-mapped container", () => {
    const polluted = {
      ...legacy_settings,
      banana: { ...legacy_settings.banana, unexpectedNestedField: true },
    };

    const result = classify_settings_paths(polluted);

    expect(result.unknown).toContain("banana.unexpectedNestedField");
  });

  it("limits intentionally_obsolete to the allowed reasons and never to business data", () => {
    const { classified } = classify_settings_paths(legacy_settings);
    const obsolete = classified.filter(
      (entry) => entry.rule.classification === "intentionally_obsolete",
    );

    expect(obsolete.length).toBeGreaterThan(0);
    for (const entry of obsolete) {
      expect(["cacheStorageMigrated", "lastTab"]).toContain(entry.path);
    }
    const protectedRoots = [
      "yushe",
      "novelai_profiles",
      "comfyui_profiles",
      "themes",
      "characterAI",
    ];
    for (const root of protectedRoots) {
      const rule = classified.find((entry) => entry.path === root)?.rule;
      expect(rule?.classification).not.toBe("intentionally_obsolete");
    }
  });

  it("routes reversible v2 credentials to deferred_secret_transfer, never mapped", () => {
    const { classified } = classify_settings_paths(legacy_settings);
    const secret_paths = classified
      .filter((entry) => entry.rule.classification === "deferred_secret_transfer")
      .map((entry) => entry.path);

    expect(secret_paths).toEqual(
      expect.arrayContaining([
        "st_chatu8_sd_auth",
        "novelaiApi",
        "novelaiApi_id",
        "ai_token",
        "banana.apiKey",
        "chatu8_ai_assistant.api_key",
        "novelai_profiles.默认.novelaiApi",
        "llm_profiles.默认.api_key",
      ]),
    );
  });
});

describe("converter registry", () => {
  it("lists all eight converter owners", () => {
    expect(CONVERTER_NAMES).toHaveLength(8);
    expect(new Set(CONVERTER_NAMES).size).toBe(8);
  });
});

describe("settings_converter", () => {
  it("produces a strict small-settings object and a legacy_preferences record", () => {
    const result = convert_settings(legacy_settings, context);

    expect(result.settings.active_namespace).toBe("primary");
    expect(result.settings.auto_generation_enabled).toBe(true);
    expect(result.settings.ui.optional_entry_enabled).toBe(true);
    expect(result.legacy_preferences.payload.theme_id).toBe("夜间");
    expect(result.legacy_preferences.namespace).toBe("primary");
  });

  it("is deterministic across repeated conversions", () => {
    const first = convert_settings(legacy_settings, context);
    const second = convert_settings(legacy_settings, context);

    expect(first.legacy_preferences.id).toBe(second.legacy_preferences.id);
  });
});

describe("provider_converter", () => {
  it("never leaks a reversible credential into a provider_profiles payload", () => {
    const result = convert_provider(legacy_settings, context);
    const serialized = JSON.stringify(result.records);

    expect(serialized).not.toContain("synthetic-sd-basic-auth-token");
    expect(serialized).not.toContain("synthetic-novelai-token-default");
    expect(serialized).not.toContain("synthetic-novelai-token-profile-default");
    expect(serialized).not.toContain("synthetic-banana-api-key");
    expect(serialized).not.toContain("synthetic-assistant-api-key");
    expect(serialized).not.toContain("synthetic-llm-api-key-default");
    expect(serialized).not.toContain("synthetic-legacy-ai-token");
  });

  it("emits one secret_transfer operation per reversible credential with its plaintext", () => {
    const result = convert_provider(legacy_settings, context);
    const by_kind = new Map(result.secret_transfers.map((op) => [op.source_path, op]));

    expect(by_kind.get("banana.apiKey")?.plaintext_value).toBe("synthetic-banana-api-key");
    expect(by_kind.get("llm_profiles.默认.api_key")?.plaintext_value).toBe(
      "synthetic-llm-api-key-default",
    );
    expect(by_kind.get("novelai_profiles.默认.novelaiApi")?.plaintext_value).toBe(
      "synthetic-novelai-token-profile-default",
    );
    expect(result.secret_transfers.every((op) => op.operation === "secret_transfer")).toBe(true);
  });

  it("remaps Banana/Grok (OpenAI-compatible) to provider_id openai_image", () => {
    const result = convert_provider(legacy_settings, context);

    expect(result.records.some((record) => record.provider_id === "openai_image")).toBe(true);
  });
});

describe("prompt_converter", () => {
  it("converts prompt presets and regex/replacement rules", () => {
    const result = convert_prompts(legacy_settings, context);

    expect(result.prompt_presets.length).toBeGreaterThan(0);
    expect(result.regex_rules.length).toBeGreaterThan(0);
  });
});

describe("asset_converter", () => {
  it("converts workflows, vibes, and uploaded configuration images", () => {
    const result = convert_assets(legacy_settings, legacy_gallery, context);

    expect(result.comfy_workflows.length).toBeGreaterThan(0);
    expect(result.novelai_vibes.length).toBeGreaterThan(0);
    expect(result.image_records).toHaveLength(1);
    expect(result.image_records[0]?.sha256).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("warns instead of converting when no gallery fixture is supplied", () => {
    const result = convert_assets(legacy_settings, undefined, context);

    expect(result.image_records).toHaveLength(0);
    expect(result.warnings.some((warning) => warning.path.includes("config_images"))).toBe(true);
  });
});

describe("character_converter", () => {
  it("converts persona presets", () => {
    const result = convert_characters(legacy_settings, context);

    expect(result.character_profiles.length).toBeGreaterThan(1);
  });
});

describe("knowledge_converter", () => {
  it("converts World Info, knowledge base, and send_data selections", () => {
    const result = convert_knowledge(legacy_settings, context);

    const kinds = result.knowledge_entries.map((entry) => entry.source_type);
    expect(kinds).toContain("knowledge_base_config");
    expect(kinds).toContain("builtin_world_book");
    expect(kinds).toContain("send_data_world_book_config");
  });
});

describe("gallery_converter", () => {
  it("converts server-persisted and IndexedDB images and skips the bundled tag dataset", () => {
    const result = convert_gallery(legacy_settings, legacy_gallery, context);

    expect(result.image_records).toHaveLength(2);
    expect(result.vocabularies).toHaveLength(1);
    expect(result.vocabulary_groups).toHaveLength(2);
    const manual_tags = (result.vocabularies[0]?.payload as { tags: unknown[] }).tags;
    expect(manual_tags).toHaveLength(1);
    expect(result.warnings.some((warning) => warning.path === "chatu8_gallery.tags")).toBe(true);
  });
});

describe("message_converter", () => {
  it("resolves a message's image tag to the same image id gallery_converter mints", () => {
    const gallery_result = convert_gallery(legacy_settings, legacy_gallery, context);
    const message_result = convert_messages(
      legacy_messages,
      legacy_settings.jiuguanStorage,
      context,
    );

    const resolved_entry = message_result.entries.find((entry) => entry.message_id === 4);
    expect(resolved_entry?.metadata.image_ids).toHaveLength(1);
    const image_id = resolved_entry?.metadata.image_ids[0];
    expect(gallery_result.image_records.some((record) => record.id === image_id)).toBe(true);
  });

  it("warns on a dangling tag reference instead of throwing", () => {
    const result = convert_messages(legacy_messages, legacy_settings.jiuguanStorage, context);

    const dangling_entry = result.entries.find((entry) => entry.message_id === 6);
    expect(dangling_entry?.metadata.image_ids).toEqual([]);
    expect(result.warnings.some((warning) => warning.message.includes("神秘生物特写"))).toBe(true);
  });

  it("is deterministic: re-running produces byte-identical anchors", () => {
    const first = convert_messages(legacy_messages, legacy_settings.jiuguanStorage, context);
    const second = convert_messages(legacy_messages, legacy_settings.jiuguanStorage, context);

    expect(first.entries).toEqual(second.entries);
  });
});
