const INVALID_DATA_MESSAGE = "Canonical JSON accepts only JSON data";

function invalid_data(): never {
  throw new TypeError(INVALID_DATA_MESSAGE);
}

function encode_primitive(value: null | boolean | number | string): string {
  if (typeof value === "number" && !Number.isFinite(value)) {
    return invalid_data();
  }
  return JSON.stringify(value);
}

function encode_value(value: unknown, ancestors: WeakSet<object>): string {
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    return encode_primitive(value);
  }
  if (typeof value !== "object") {
    return invalid_data();
  }
  if (ancestors.has(value)) {
    throw new TypeError("Canonical JSON cannot encode cyclic data");
  }

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const own_keys = Reflect.ownKeys(value);
      if (
        own_keys.some(
          (key) =>
            typeof key !== "string" ||
            (key !== "length" &&
              (!/^\d+$/u.test(key) || Number(key) >= value.length || String(Number(key)) !== key)),
        )
      ) {
        return invalid_data();
      }

      const entries: string[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
          return invalid_data();
        }
        entries.push(encode_value(value[index] as unknown, ancestors));
      }
      return `[${entries.join(",")}]`;
    }

    const prototype: unknown = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      return invalid_data();
    }

    const own_keys = Reflect.ownKeys(value);
    if (own_keys.some((key) => typeof key !== "string")) {
      return invalid_data();
    }
    const keys = own_keys.toSorted() as string[];
    const entries: string[] = [];
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        return invalid_data();
      }
      entries.push(`${encode_primitive(key)}:${encode_value(descriptor.value, ancestors)}`);
    }
    return `{${entries.join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

export function canonical_json(value: unknown): string {
  return encode_value(value, new WeakSet());
}
