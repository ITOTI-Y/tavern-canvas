import { ref } from "vue";

/**
 * Structurally identical to `ToastViewport.vue`'s exported `ToastItem` (Task 4). Declared locally
 * rather than imported from a `.vue` single-file component: the ESLint TypeScript project service
 * does not resolve type-only imports from `.vue` files reliably (they type as `any` under lint,
 * even though `vue-tsc` resolves them correctly), which would defeat `no-unsafe-*` checks on
 * every use below.
 */
export interface ToastItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: "info" | "success" | "error";
}

/**
 * Local, per-view toast queue. `ToastViewport` (Task 4) is stateless -- driven entirely by a
 * `toasts` prop -- so each view that wants transient completion notices (taste directive: toasts
 * report only things like "copied parameters" or a successful save, never primary content) owns
 * a small queue like this one. No shared/global toast state exists in `StudioState`.
 */
export function use_toasts() {
  const toasts = ref<ToastItem[]>([]);

  function push(toast: Omit<ToastItem, "id">): void {
    toasts.value = [...toasts.value, { ...toast, id: crypto.randomUUID() }];
  }

  function dismiss(id: string): void {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, push, dismiss };
}
