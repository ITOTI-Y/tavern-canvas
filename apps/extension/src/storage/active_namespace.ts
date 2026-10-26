import type { SillyTavernSettings } from "./sillytavern_settings.js";

export interface NamespaceReadinessMarker {
  namespace: string;
  state: string;
}

export interface NamespaceMarkerTransaction {
  get_marker(): Promise<NamespaceReadinessMarker | null>;
}

export interface NamespaceMarkerPort {
  with_marker_transaction<T>(
    namespace: string,
    callback: (transaction: NamespaceMarkerTransaction) => Promise<T> | T,
  ): Promise<T> | T;
}

// Only an import staging area or a completed migration may become active.
const READY_MARKER_STATES: ReadonlySet<string> = new Set(["import_ready", "ready_to_switch"]);

export async function switch_active_namespace(
  settings: SillyTavernSettings,
  namespace: string,
  marker_port: NamespaceMarkerPort,
): Promise<string> {
  const marker = await marker_port.with_marker_transaction(namespace, (transaction) =>
    transaction.get_marker(),
  );

  if (marker === null) {
    throw new Error(`Namespace marker is missing for namespace "${namespace}"`);
  }
  if (marker.namespace !== namespace) {
    throw new Error(`Namespace marker belongs to "${marker.namespace}", expected "${namespace}"`);
  }
  if (!READY_MARKER_STATES.has(marker.state)) {
    throw new Error(`Namespace "${namespace}" is not ready to switch (state: "${marker.state}")`);
  }

  const prior_namespace = settings.get_settings().active_namespace;
  settings.update_settings({ active_namespace: namespace });
  try {
    await settings.flush();
  } catch (error) {
    settings.update_settings({ active_namespace: prior_namespace });
    throw error;
  }
  return namespace;
}
