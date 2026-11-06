import type { CreationScene } from "../../../apps/extension/src/modules/creation/creation_record.js";
import type { CreationPort } from "../../../apps/extension/src/ui/contracts/creation_port.js";

const SIZES = [
  { width: 1216, height: 832 },
  { width: 832, height: 1216 },
  { width: 1024, height: 1024 },
] as const;

const MESSAGES = [
  { name: "You", is_user: true, text: "Let's leave through the back door before they see us." },
  {
    name: "Lin",
    is_user: false,
    text: "She doesn't answer, grabs your hand and runs deeper into the alley, footsteps echoing on the wet flagstones while the rain keeps drumming on the awnings above.",
  },
  { name: "You", is_user: true, text: "It's a dead end!" },
  {
    name: "Lin",
    is_user: false,
    text: "Lin climbs onto a bin, vaults the low wall and reaches back for you. A torch beam sweeps across the brickwork behind.",
  },
  {
    name: "Lin",
    is_user: false,
    text: "They land on the roof next door; the city lights spread out below. She laughs, out of breath.",
  },
  { name: "You", is_user: true, text: "You knew this way all along, didn't you?" },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let next_id = 0;

function scene(index: number, text: string): CreationScene {
  next_id += 1;
  return {
    id: `harness-scene-${String(next_id)}`,
    enabled: index !== 2,
    scene: text,
    excerpt: `Paragraph ${String(index + 1)} of the source text.`,
    characters: index % 2 === 0 ? ["Lin"] : ["Lin", "Shen"],
    size: { ...(SIZES[index % SIZES.length] ?? SIZES[0]) },
    positive_prompt: "1girl, alley, night, rain, running",
    negative_prompt: "lowres",
    character_prompts: [],
    image_ids: [],
    active_image_id: null,
    last_error: null,
  };
}

const SCENE_TEXTS = [
  "Evening after rain, Lin folds her umbrella at the bookshop door",
  "Lin pulls a grey-blue watercolour book from the shelf, side view",
  "Behind the counter Shen looks up and moves the desk lamp toward her",
  "Rooftop at night with the city lights below",
];

/** Plans and draws in the Studio harness without a chat host or an image service. */
export function create_mock_creation_port(): CreationPort {
  let drawn = 0;
  return {
    async plan_story() {
      await wait(500);
      return SCENE_TEXTS.slice(0, 3).map((text, index) => scene(index, text));
    },
    async strip_messages() {
      await wait(200);
      return {
        chat_id: "harness-chat",
        messages: MESSAGES.map((message, index) => ({ ...message, message_id: index + 11 })),
      };
    },
    async plan_strip(_from, _to, max_panels) {
      await wait(500);
      return SCENE_TEXTS.slice(0, Math.min(max_panels, 4)).map((text, index) => scene(index, text));
    },
    async generate() {
      await wait(1200);
      drawn += 1;
      return `harness-image-${String(drawn)}`;
    },
  };
}
