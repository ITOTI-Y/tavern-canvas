import type { Page } from "@playwright/test";

export interface LayoutFinding {
  readonly kind: string;
  readonly detail: string;
}

export async function find_overflow_violations(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    const root = host?.shadowRoot;
    if (!root) {
      return [{ kind: "overflow", detail: "Shadow Root not found" }];
    }
    const findings: { kind: string; detail: string }[] = [];

    function is_scroll_container(element: Element): boolean {
      const style = getComputedStyle(element);
      return /(auto|scroll)/u.test(style.overflowX) || /(auto|scroll)/u.test(style.overflowY);
    }

    function nearest_scroll_container(element: Element): Element | null {
      let current = element.parentElement;
      while (current) {
        if (is_scroll_container(current)) {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    }

    const shell = root.querySelector<HTMLElement>('[class*="shell"]');
    if (shell && shell.scrollWidth > shell.clientWidth + 1) {
      findings.push({
        kind: "overflow",
        detail: `Shell has horizontal overflow: scrollWidth=${String(shell.scrollWidth)} clientWidth=${String(shell.clientWidth)}`,
      });
    }

    const candidates = root.querySelectorAll<HTMLElement>(
      "button, a, input, textarea, [role], div, span, p, dl, dt, dd, li, section, header, footer, main",
    );
    for (const element of candidates) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        continue;
      }
      const container = nearest_scroll_container(element);
      if (container) {
        continue;
      }
      const host_rect = root.host.getBoundingClientRect();
      if (rect.right > host_rect.right + 2) {
        const first_class = element.classList.item(0) ?? "";
        findings.push({
          kind: "overflow",
          detail: `${element.tagName.toLowerCase()}${first_class ? "." + first_class : ""} extends ${String(Math.round(rect.right - host_rect.right))}px past its container's right edge`,
        });
      }
    }

    return findings;
  });
}

export async function find_clipped_text_violations(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    const root = host?.shadowRoot;
    if (!root) {
      return [{ kind: "clipped-text", detail: "Shadow Root not found" }];
    }
    const findings: { kind: string; detail: string }[] = [];
    const elements = root.querySelectorAll<HTMLElement>("*");
    for (const element of elements) {
      if (element.children.length > 0) {
        continue;
      }
      const text = element.textContent.trim();
      if (text.length === 0) {
        continue;
      }
      const rect = element.getBoundingClientRect();
      if (rect.width <= 1 && rect.height <= 1) {
        continue;
      }
      const style = getComputedStyle(element);
      if (style.whiteSpace !== "nowrap" || style.overflow !== "hidden") {
        continue;
      }
      const is_clipped = element.scrollWidth > element.clientWidth + 1;
      if (!is_clipped) {
        continue;
      }
      const has_ellipsis = style.textOverflow === "ellipsis";
      const has_title = element.hasAttribute("title") || element.closest("[title]") !== null;
      if (!has_ellipsis && !has_title) {
        findings.push({
          kind: "clipped-text",
          detail: `Clipped without ellipsis or title: "${text.slice(0, 60)}"`,
        });
      }
    }
    return findings;
  });
}

export async function find_overlapping_controls(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    const root = host?.shadowRoot;
    if (!root) {
      return [{ kind: "overlap", detail: "Shadow Root not found" }];
    }

    // Clip each rect against its scrolling ancestors; unclipped rects report overlaps for pixels never painted.
    interface ClippedRect {
      readonly top: number;
      readonly bottom: number;
      readonly left: number;
      readonly right: number;
    }
    const root_host = root.host;
    function visible_clipped_rect(element: Element): ClippedRect | null {
      let rect: ClippedRect = element.getBoundingClientRect();
      let ancestor = element.parentElement;
      while (ancestor && ancestor !== root_host) {
        const style = getComputedStyle(ancestor);
        if (
          /(hidden|auto|scroll)/u.test(style.overflowY) ||
          /(hidden|auto|scroll)/u.test(style.overflowX)
        ) {
          const ancestor_rect = ancestor.getBoundingClientRect();
          rect = {
            top: Math.max(rect.top, ancestor_rect.top),
            bottom: Math.min(rect.bottom, ancestor_rect.bottom),
            left: Math.max(rect.left, ancestor_rect.left),
            right: Math.min(rect.right, ancestor_rect.right),
          };
          if (rect.bottom <= rect.top || rect.right <= rect.left) {
            return null;
          }
        }
        ancestor = ancestor.parentElement;
      }
      return rect;
    }

    const findings: { kind: string; detail: string }[] = [];
    const control_rects: [HTMLElement, ClippedRect][] = [];
    for (const element of root.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, [role="button"], [role="tab"], [role="menuitem"]',
    )) {
      const rect = element.getBoundingClientRect();
      if (
        rect.width <= 0 ||
        rect.height <= 0 ||
        getComputedStyle(element).visibility === "hidden"
      ) {
        continue;
      }
      const clipped = visible_clipped_rect(element);
      if (clipped) {
        control_rects.push([element, clipped]);
      }
    }

    for (let i = 0; i < control_rects.length; i += 1) {
      for (let j = i + 1; j < control_rects.length; j += 1) {
        const entry_a = control_rects[i];
        const entry_b = control_rects[j];
        if (!entry_a || !entry_b) {
          continue;
        }
        const [a, ra] = entry_a;
        const [b, rb] = entry_b;
        if (a.contains(b) || b.contains(a)) {
          continue;
        }
        const overlap_x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const overlap_y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        // 4px tolerance: subpixel rounding of adjacent flex items on the mobile bottom nav overlaps by a few px.
        if (overlap_x <= 4 || overlap_y <= 4) {
          continue;
        }
        // Only partial intersections count; a badge nested in a larger control is intentional.
        const overlap_area = overlap_x * overlap_y;
        const area_a = (ra.right - ra.left) * (ra.bottom - ra.top);
        const area_b = (rb.right - rb.left) * (rb.bottom - rb.top);
        const smaller_area = Math.min(area_a, area_b);
        const mostly_contained = smaller_area > 0 && overlap_area / smaller_area >= 0.9;
        if (mostly_contained) {
          continue;
        }
        findings.push({
          kind: "overlap",
          detail: `${a.tagName.toLowerCase()}[aria-label="${a.getAttribute("aria-label") ?? ""}"] overlaps ${b.tagName.toLowerCase()}[aria-label="${b.getAttribute("aria-label") ?? ""}"] by ${String(Math.round(overlap_x))}x${String(Math.round(overlap_y))}px`,
        });
      }
    }
    return findings;
  });
}

export async function find_portal_escapes(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    if (!host?.shadowRoot) {
      return [{ kind: "portal-escape", detail: "Shadow Root not found" }];
    }
    const portal_element = host.shadowRoot.querySelector('[data-shadow-role="portal"]');
    const findings: { kind: string; detail: string }[] = [];
    const escaped = document.body.querySelectorAll(
      '[role="dialog"], [role="alertdialog"], [role="menu"], [role="tooltip"], [role="listbox"]',
    );
    for (const element of escaped) {
      if (portal_element?.contains(element)) {
        continue;
      }
      if (host.shadowRoot.contains(element)) {
        continue;
      }
      findings.push({
        kind: "portal-escape",
        detail: `[role="${element.getAttribute("role") ?? ""}"] rendered outside the Shadow Root's portal element`,
      });
    }
    return findings;
  });
}

export async function find_blank_or_zero_dimension_images(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    const root = host?.shadowRoot;
    if (!root) {
      return [{ kind: "blank-image", detail: "Shadow Root not found" }];
    }
    const findings: { kind: string; detail: string }[] = [];
    const images = [...root.querySelectorAll<HTMLImageElement>("img")].filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    for (const img of images) {
      const label =
        img.getAttribute("alt") ?? img.getAttribute("src")?.slice(0, 60) ?? "(unlabeled image)";
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        findings.push({ kind: "zero-dimension", detail: `${label}: zero natural dimensions` });
        continue;
      }
      const canvas = document.createElement("canvas");
      const sample_size = 16;
      canvas.width = sample_size;
      canvas.height = sample_size;
      const context = canvas.getContext("2d");
      if (!context) {
        continue;
      }
      context.drawImage(img, 0, 0, sample_size, sample_size);
      let data: Uint8ClampedArray;
      try {
        data = context.getImageData(0, 0, sample_size, sample_size).data;
      } catch {
        continue; // canvas tainted by a cross-origin image
      }
      const [r0, g0, b0, a0] = [data[0], data[1], data[2], data[3]];
      let uniform = true;
      for (let index = 4; index < data.length; index += 4) {
        if (
          data[index] !== r0 ||
          data[index + 1] !== g0 ||
          data[index + 2] !== b0 ||
          data[index + 3] !== a0
        ) {
          uniform = false;
          break;
        }
      }
      if (uniform) {
        findings.push({
          kind: "blank-image",
          detail: `${label}: decoded to a uniform single color`,
        });
      }
    }
    return findings;
  });
}

export async function find_fixed_nav_overlap(page: Page): Promise<LayoutFinding[]> {
  return page.evaluate(() => {
    const host = document.getElementById("tavern-canvas-root");
    const root = host?.shadowRoot;
    if (!root) {
      return [{ kind: "fixed-nav-overlap", detail: "Shadow Root not found" }];
    }
    const findings: { kind: string; detail: string }[] = [];
    const workspace = root.querySelector('[data-testid="workspace"]');
    if (!workspace) {
      return findings;
    }
    const workspace_rect = workspace.getBoundingClientRect();
    const chrome_selectors = [
      "nav",
      '[class*="top_bar"]',
      '[class*="bottom_nav"]',
      '[class*="task_strip"]',
    ];
    for (const selector of chrome_selectors) {
      for (const chrome of root.querySelectorAll(selector)) {
        const rect = chrome.getBoundingClientRect();
        const overlap_x =
          Math.min(rect.right, workspace_rect.right) - Math.max(rect.left, workspace_rect.left);
        const overlap_y =
          Math.min(rect.bottom, workspace_rect.bottom) - Math.max(rect.top, workspace_rect.top);
        if (overlap_x > 2 && overlap_y > 2) {
          findings.push({
            kind: "fixed-nav-overlap",
            detail: `${selector} overlaps the workspace region by ${String(Math.round(overlap_x))}x${String(Math.round(overlap_y))}px`,
          });
        }
      }
    }
    return findings;
  });
}

export async function run_all_layout_checks(page: Page): Promise<LayoutFinding[]> {
  const [overflow, clipped, overlap, portal, images, fixed_nav] = await Promise.all([
    find_overflow_violations(page),
    find_clipped_text_violations(page),
    find_overlapping_controls(page),
    find_portal_escapes(page),
    find_blank_or_zero_dimension_images(page),
    find_fixed_nav_overlap(page),
  ]);
  return [...overflow, ...clipped, ...overlap, ...portal, ...images, ...fixed_nav];
}

export async function measure_box(
  page: Page,
  selector: string,
): Promise<{ width: number; height: number }> {
  return page.evaluate((sel) => {
    const host = document.getElementById("tavern-canvas-root");
    const element = host?.shadowRoot?.querySelector(sel);
    if (!element) {
      throw new Error(`measure_box: no element for selector "${sel}"`);
    }
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }, selector);
}

export async function measure_layout_shift(
  page: Page,
  action: () => Promise<void>,
): Promise<number> {
  await page.evaluate(() => {
    (window as unknown as { __cls_entries__: number[] }).__cls_entries__ = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layout_shift_entry = entry as unknown as { value: number; hadRecentInput: boolean };
        if (!layout_shift_entry.hadRecentInput) {
          (window as unknown as { __cls_entries__: number[] }).__cls_entries__.push(
            layout_shift_entry.value,
          );
        }
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
    (window as unknown as { __cls_observer__: PerformanceObserver }).__cls_observer__ = observer;
  });

  await action();
  await page.waitForTimeout(250); // Layout-shift entries can arrive a frame or two late.

  const total = await page.evaluate(() => {
    const entries = (window as unknown as { __cls_entries__: number[] }).__cls_entries__;
    return entries.reduce((sum, value) => sum + value, 0);
  });
  return total;
}
