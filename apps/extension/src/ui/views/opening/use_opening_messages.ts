import { ref, watch, type Ref } from "vue";
import { useI18n } from "vue-i18n";

type Messages = Record<string, unknown>;

const LOADERS: Readonly<Record<string, () => Promise<Messages>>> = {
  en: async () => (await import("../../../i18n/locales/deferred/opening_en.js")).en_messages,
  "zh-CN": async () =>
    (await import("../../../i18n/locales/deferred/opening_zh_cn.js")).zh_cn_messages,
};

/**
 * Merges the page's messages into English and the active locale once that locale is in use. A
 * locale is only merged after the app has loaded it, because a locale that already has messages is
 * never loaded again.
 */
export function use_opening_messages(): Ref<boolean> {
  const i18n = useI18n({ useScope: "global" });
  const ready = ref(false);

  async function ensure(target: string): Promise<void> {
    for (const locale of new Set(["en", target])) {
      const load = LOADERS[locale];
      if (load !== undefined && !i18n.te("opening.title", locale)) {
        i18n.mergeLocaleMessage(locale, await load());
      }
    }
    ready.value = true;
  }

  watch(
    i18n.locale,
    (locale) => {
      void ensure(locale);
    },
    { immediate: true },
  );
  return ready;
}
