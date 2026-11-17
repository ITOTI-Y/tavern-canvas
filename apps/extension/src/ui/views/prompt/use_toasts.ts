import { ref } from "vue";

export interface ToastItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: "info" | "success" | "error";
  readonly duration?: number;
  /** A button beside the title, such as Undo; pressing it also closes the toast. */
  readonly action?: { readonly label: string; readonly run: () => void };
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
