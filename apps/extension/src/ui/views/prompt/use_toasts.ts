import { ref } from "vue";

/**
 * Structurally identical to `ToastViewport.vue`'s exported `ToastItem` (Task 4). Declared locally
 * rather than imported from a `.vue` single-file component: the ESLint TypeScript project service
 * does not resolve type-only imports from `.vue` files reliably (they type as `any` under lint,
 * even though `vue-tsc` resolves them correctly), which would defeat `no-unsafe-*` checks on
 * every use below. Duplicated from `views/workbench/use_toasts.ts` -- each view owns its own
 * toast queue (see that file's docstring); no shared module lives above both view folders.
 */
export interface ToastItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: "info" | "success" | "error";
}

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
