import { bootstrap_tavern_canvas } from "../../../apps/extension/src/bootstrap/bootstrap.js";
import {
  bind_shadow_root_stylesheet,
  INITIAL_STYLESHEET,
} from "../../../apps/extension/src/dev/stylesheet_hmr.js";
import { open_database, ProviderProfileRepository } from "@tavern-canvas/storage";

import { create_host_environment, type MutableChatMessage } from "./all_host_environment.js";

const PROFILE_ID = "11111111-1111-4111-8111-111111111111";
const NAMESPACE = "primary";

const REPLY = [
  "雨下了一整夜。爱丽丝撑着一把透明的伞，站在旧城区的路灯下，等那个答应会来的人。",
  "街角的霓虹招牌一闪一闪，倒映在积水里，像一片碎掉的星空。她低头看了一眼手表，指针已经过了十一点。",
  "远处传来脚步声。一个穿着灰色风衣的少年从雨幕里跑过来，头发湿透，手里紧紧攥着一封信。",
  "“抱歉，我来晚了。”他喘着气，把信递给她，“这是你要的东西。”",
  "爱丽丝接过信，借着路灯的光拆开。纸上只有一行字，墨迹已经被雨水晕开。",
].join("\n\n");

const ANALYSIS_REPLY = JSON.stringify({
  illustrations: [
    {
      paragraph: 0,
      scene: "撑着透明雨伞的少女站在雨夜的路灯下",
      tags: "1girl, solo, transparent umbrella, rain, night, street light, standing, wet street",
      characters: ["Alice"],
    },
    {
      paragraph: 2,
      scene: "穿灰色风衣的少年冒雨跑来，手里攥着一封信",
      tags: "1boy, running, grey trench coat, wet hair, holding letter, rain, night",
      characters: [],
    },
  ],
});

function escape_html(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function regex_of(find_regex: string): RegExp | null {
  const match = /^\/(.*)\/([a-z]*)$/su.exec(find_regex);
  return match === null ? null : new RegExp(match[1] ?? "", match[2]);
}

/** Text drawn into a generated placeholder so each image shows the prompt it came from. */
async function draw_placeholder(prompt: string, width: number, height: number): Promise<string> {
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("no 2D canvas");
  }
  let hash = 0;
  for (const character of prompt) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  const hue = hash % 360;
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `hsl(${String(hue)} 45% 30%)`);
  gradient.addColorStop(1, `hsl(${String((hue + 60) % 360)} 50% 18%)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "rgb(255 255 255 / 85%)";
  context.font = "22px sans-serif";
  const words = prompt.split(", ");
  let line = "";
  let y = 48;
  for (const word of words) {
    const candidate = line === "" ? word : `${line}, ${word}`;
    if (context.measureText(candidate).width > width - 48 && line !== "") {
      context.fillText(line, 24, y);
      line = word;
      y += 30;
    } else {
      line = candidate;
    }
  }
  context.fillText(line, 24, y);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

async function boot(): Promise<void> {
  const environment = create_host_environment({
    helper_version: "4.11.1",
    secrets_readable: true,
    active_provider_profile_id: PROFILE_ID,
    gateway_endpoint: null,
    http_acknowledgments: {},
  });
  const { control } = environment;
  const reply = control.chat_messages[1];
  if (reply !== undefined) {
    reply.name = "爱丽丝";
    reply.mes = REPLY;
    reply.swipes = [REPLY];
  }
  const user = control.chat_messages[0];
  if (user !== undefined) {
    user.name = "你";
    user.mes = "（我约了爱丽丝在旧城区见面。）";
    user.swipes = [user.mes];
  }
  control.set_generate_response(ANALYSIS_REPLY);
  const settings = control.extension_settings.tavern_canvas as {
    locale: string;
    ui: { optional_entry_enabled: boolean };
  };
  settings.locale = "zh-CN";
  settings.ui.optional_entry_enabled = true;

  const chat_element = document.getElementById("chat");
  if (chat_element === null) {
    throw new Error("chat_demo.html has no #chat");
  }

  function render_text(message: MutableChatMessage): string {
    let text = message.mes;
    for (const script of control.regex_scripts) {
      const pattern = regex_of(script.find_regex);
      if (script.enabled && script.destination.display && !message.is_user && pattern !== null) {
        text = text.replace(pattern, script.replace_string);
      }
    }
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => (line.startsWith("<div ") ? line : `<p>${escape_html(line)}</p>`))
      .join("");
  }

  function render_message(message_id: number): void {
    const message = control.chat_messages[message_id];
    if (message === undefined) {
      return;
    }
    let element = chat_element?.querySelector<HTMLElement>(`.mes[mesid="${String(message_id)}"]`);
    if (element === null || element === undefined) {
      element = document.createElement("div");
      element.className = "mes";
      element.setAttribute("mesid", String(message_id));
      chat_element?.append(element);
    }
    element.innerHTML = `
      <div class="mes_header">
        <span class="ch_name">${escape_html(message.name)}</span>
        <div class="mes_buttons"><div class="extraMesButtons"></div></div>
      </div>
      <div class="mes_text">${render_text(message)}</div>`;
  }

  function render_chat(): void {
    control.chat_messages.forEach((_message, message_id) => {
      render_message(message_id);
    });
  }

  // SillyTavern re-renders a message after setChatMessages and reloads the chat after a regex change.
  const helper = environment.globals.TavernHelper as Record<string, unknown>;
  const set_chat_messages = helper.setChatMessages as (
    updates: readonly { message_id: number; message: string }[],
  ) => Promise<void>;
  helper.setChatMessages = async (updates: readonly { message_id: number; message: string }[]) => {
    await set_chat_messages(updates);
    for (const update of updates) {
      render_message(update.message_id);
      control.emit_message_rendered(update.message_id);
    }
  };
  const replace_regexes = helper.replaceTavernRegexes as (
    ...arguments_: unknown[]
  ) => Promise<void>;
  helper.replaceTavernRegexes = async (...arguments_: unknown[]) => {
    await replace_regexes(...arguments_);
    render_chat();
    control.emit_chat_changed("chat-a");
  };
  render_chat();

  const database = await open_database();
  await new ProviderProfileRepository(database).put(NAMESPACE, {
    schema_version: 1,
    id: PROFILE_ID,
    namespace: NAMESPACE,
    record_key: `${NAMESPACE}:${PROFILE_ID}`,
    created_at: "2026-10-26T00:00:00.000Z",
    updated_at: "2026-10-26T00:00:00.000Z",
    provider_id: "sd_webui",
    payload: {
      display_name: "模拟 SD WebUI",
      is_default: true,
      base_url: "http://127.0.0.1:7860",
      provider_profile: {
        model_allowlist: ["sd_xl_base"],
        output_mime_type_allowlist: ["image/png"],
        max_response_bytes: 5_000_000,
      },
    },
  });

  await bootstrap_tavern_canvas({
    globals: environment.globals,
    document,
    stylesheet: INITIAL_STYLESHEET,
    version: "demo",
    composition: {
      open_storage: () => Promise.resolve(database),
      provider_fetch: async (_input, init) => {
        const body = JSON.parse(typeof init?.body === "string" ? init.body : "{}") as {
          prompt?: string;
          width?: number;
          height?: number;
        };
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const image = await draw_placeholder(
          body.prompt ?? "",
          body.width ?? 512,
          body.height ?? 512,
        );
        return new Response(JSON.stringify({ images: [image], info: "{}" }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  });
  const shadow_root = document.getElementById("tavern-canvas-root")?.shadowRoot;
  if (shadow_root) {
    bind_shadow_root_stylesheet(shadow_root);
  }
}

void boot();
