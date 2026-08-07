import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import { en_messages } from "../../i18n/locales/en.js";
import { PORTAL_TARGET_KEY } from "../contracts/portal_keys.js";
import type { InspectorSelection } from "../contracts/view_models.js";
import InspectorSheet from "./InspectorSheet.vue";

function mount_sheet(selection: InspectorSelection | null) {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en: en_messages },
  });
  const portal = document.createElement("div");
  document.body.append(portal);
  return mount(InspectorSheet, {
    props: { open: true, selection },
    global: { plugins: [i18n], provide: { [PORTAL_TARGET_KEY as unknown as string]: portal } },
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});

/** Mirrors ContextInspector.test.ts for the mobile drawer variant of the same fix. */
describe("InspectorSheet: renders selected_record", () => {
  it("renders the empty state when nothing is selected", async () => {
    mount_sheet(null);
    await nextTick();
    expect(document.body.textContent).toContain("Nothing selected");
  });

  it("renders a gallery_record selection with its regenerate intent", async () => {
    mount_sheet({
      kind: "gallery_record",
      record_id: "33333333-3333-4333-8333-333333333333",
      intent: "regenerate",
    });
    await nextTick();
    expect(document.body.textContent).toContain("Gallery image");
    expect(document.body.textContent).toContain("33333333-3333-4333-8333-333333333333");
    expect(document.body.textContent).toContain("Regenerate");
  });
});
