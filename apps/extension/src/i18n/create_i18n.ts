import { createI18n, type I18n } from "vue-i18n";

import {
  load_locale,
  resolve_locale,
  type LocaleLoadOutcome,
  type LocaleMessageLoaders,
  type LocalePreference,
  type SupportedLocale,
} from "./locale_resolution.js";
import { en_messages, type LocaleMessageSchema } from "./locales/en.js";

// Simplified Chinese ships as a separate Vite chunk, fetched only when a
// user (or the host locale, under "auto") actually needs it. English stays
// bundled so the shell always has a working fallback if this import fails.
const LOCALE_LOADERS: LocaleMessageLoaders = {
  "zh-CN": async () => (await import("./locales/zh_cn.js")).zh_cn_messages,
};

const NUMBER_FORMATS = {
  decimal: { style: "decimal", maximumFractionDigits: 2 },
  percent: { style: "percent", maximumFractionDigits: 1 },
} as const;

const DATETIME_FORMATS = {
  short_date: { year: "numeric", month: "short", day: "numeric" },
  short_time: { hour: "2-digit", minute: "2-digit" },
} as const;

const I18N_OPTIONS = {
  legacy: false as const,
  locale: "en" as SupportedLocale,
  fallbackLocale: "en" as SupportedLocale,
  messages: { en: en_messages },
  numberFormats: { en: NUMBER_FORMATS, "zh-CN": NUMBER_FORMATS },
  datetimeFormats: { en: DATETIME_FORMATS, "zh-CN": DATETIME_FORMATS },
};

export type TavernCanvasI18n = I18n<
  { en: LocaleMessageSchema; "zh-CN": LocaleMessageSchema },
  typeof DATETIME_FORMATS,
  typeof NUMBER_FORMATS,
  SupportedLocale,
  false
>;

export interface LocaleRuntime {
  readonly i18n: TavernCanvasI18n;
  apply_locale(preference: LocalePreference, host_locale: string): Promise<LocaleLoadOutcome>;
}

export function create_i18n(): LocaleRuntime {
  const i18n: TavernCanvasI18n = createI18n(I18N_OPTIONS);

  async function apply_locale(
    preference: LocalePreference,
    host_locale: string,
  ): Promise<LocaleLoadOutcome> {
    const target = resolve_locale(preference, host_locale);
    return load_locale(i18n.global, target, LOCALE_LOADERS);
  }

  return { i18n, apply_locale };
}

// CLDR's "kilobyte"/"megabyte"/... units (ECMA-402 sanctioned) are decimal
// (base 1000), not the binary base-1024 KiB/MiB some UIs use. Scaling here
// matches that so the rendered unit word and the magnitude agree.
const BYTE_UNITS = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"] as const;

export function format_byte_size(byte_count: number, locale: SupportedLocale): string {
  let scaled = byte_count;
  let unit_index = 0;
  while (Math.abs(scaled) >= 1000 && unit_index < BYTE_UNITS.length - 1) {
    scaled /= 1000;
    unit_index += 1;
  }

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: BYTE_UNITS[unit_index],
    unitDisplay: "long",
    maximumFractionDigits: unit_index === 0 ? 0 : 1,
  }).format(scaled);
}
