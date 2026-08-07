import type { TavernCanvasSettings } from "@tavern-canvas/contracts";

export type LocalePreference = TavernCanvasSettings["locale"];
export type SupportedLocale = "en" | "zh-CN";

export const LOCALE_LOAD_FAILED_CODE = "locale_load_failed" as const;

export interface LocaleLoadOutcome {
  readonly locale: SupportedLocale;
  readonly error_code?: typeof LOCALE_LOAD_FAILED_CODE;
}

export type LocaleMessageLoader = () => Promise<Record<string, unknown>>;
export type LocaleMessageLoaders = Partial<
  Record<Exclude<SupportedLocale, "en">, LocaleMessageLoader>
>;

/**
 * Minimal structural surface `load_locale` needs from a Vue I18n Composer
 * (an `I18n` instance's `.global`). Kept narrow (rather than importing
 * vue-i18n's real generic `Composer` type) so this module stays a pure,
 * dependency-light unit that tests can satisfy with a plain fake, while a
 * real `createI18n(...).global` still satisfies it structurally.
 */
export interface LocaleMessageHost {
  locale: { value: string };
  readonly availableLocales: readonly string[];
  setLocaleMessage(locale: string, messages: Record<string, unknown>): void;
}

// zh-Hans and zh-SG both resolve to Simplified Chinese content; every other
// tag (including zh-TW/zh-Hant, which are Traditional Chinese) falls back to
// English rather than guessing at a script.
const SIMPLIFIED_CHINESE_HOST_LOCALES = new Set(["zh-cn", "zh-sg", "zh-hans"]);

export function normalize_host_locale(host_locale: string): SupportedLocale {
  const normalized = host_locale.trim().toLowerCase().replaceAll("_", "-");
  return SIMPLIFIED_CHINESE_HOST_LOCALES.has(normalized) ? "zh-CN" : "en";
}

export function resolve_locale(preference: LocalePreference, host_locale: string): SupportedLocale {
  if (preference !== "auto") {
    return preference;
  }
  return normalize_host_locale(host_locale);
}

export async function load_locale(
  host: LocaleMessageHost,
  target: SupportedLocale,
  loaders: LocaleMessageLoaders,
): Promise<LocaleLoadOutcome> {
  if (target === "en" || host.availableLocales.includes(target)) {
    host.locale.value = target;
    return { locale: target };
  }

  const loader = loaders[target];
  if (loader === undefined) {
    host.locale.value = "en";
    return { locale: "en", error_code: LOCALE_LOAD_FAILED_CODE };
  }

  try {
    const messages = await loader();
    host.setLocaleMessage(target, messages);
    host.locale.value = target;
    return { locale: target };
  } catch {
    host.locale.value = "en";
    return { locale: "en", error_code: LOCALE_LOAD_FAILED_CODE };
  }
}
