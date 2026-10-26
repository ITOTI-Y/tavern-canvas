const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

/** Lucide's `image` icon (ISC), sized like the font icons in SillyTavern's own toolbars. */
const ICON_SHAPES: readonly (readonly [string, Readonly<Record<string, string>>])[] = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["circle", { cx: "9", cy: "9", r: "2" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
];

/** An icon for elements placed in SillyTavern's DOM, outside the Studio's Shadow Root. */
export function create_host_image_icon(document_: Document): SVGSVGElement {
  const svg = document_.createElementNS(SVG_NAMESPACE, "svg");
  for (const [name, value] of Object.entries({
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
  })) {
    svg.setAttribute(name, value);
  }
  for (const [tag, attributes] of ICON_SHAPES) {
    const shape = document_.createElementNS(SVG_NAMESPACE, tag);
    for (const [name, value] of Object.entries(attributes)) {
      shape.setAttribute(name, value);
    }
    svg.append(shape);
  }
  return svg;
}
