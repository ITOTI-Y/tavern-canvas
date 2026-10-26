function read_property(container: unknown, property_name: string): unknown {
  if ((typeof container !== "object" || container === null) && typeof container !== "function") {
    return undefined;
  }

  try {
    return Reflect.get(container, property_name);
  } catch {
    return undefined;
  }
}

/** SillyTavern loads third-party modules before its first-run Persona dialog; mounting then leaves the Studio under the host modal, which intercepts pointer events. */
export function wait_for_sillytavern_app_ready(globals: unknown): Promise<void> {
  const sillytavern = read_property(globals, "SillyTavern");
  const get_context = read_property(sillytavern, "getContext");
  if (typeof get_context !== "function") {
    return Promise.resolve();
  }

  let context: unknown;
  try {
    context = Reflect.apply(get_context, sillytavern, []);
  } catch {
    return Promise.resolve();
  }

  const event_source = read_property(context, "eventSource");
  const event_types = read_property(context, "eventTypes");
  const app_ready = read_property(event_types, "APP_READY");
  const on = read_property(event_source, "on");
  const remove_listener = read_property(event_source, "removeListener");
  if (typeof app_ready !== "string" || typeof on !== "function") {
    return Promise.resolve();
  }

  const { promise, resolve } = Promise.withResolvers<undefined>();
  let settled = false;
  const finish = () => {
    if (settled) {
      return;
    }
    settled = true;
    if (typeof remove_listener === "function") {
      try {
        Reflect.apply(remove_listener, event_source, [app_ready, finish]);
      } catch {
        // Host cleanup failure must not leave startup blocked.
      }
    }
    resolve(undefined);
  };

  try {
    Reflect.apply(on, event_source, [app_ready, finish]);
  } catch {
    finish();
  }
  return promise;
}
