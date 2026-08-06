/** v2 stores many flags as the literal strings "true"/"false" rather than booleans. */
export function to_bool(value: unknown, default_value = false): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return default_value;
}

/**
 * Fixtures stand in for IndexedDB ArrayBuffer values with base64 strings, so
 * converters can compute a real content hash without I/O. Uses the global
 * `atob`, available in both browsers and Node 16+, to stay isomorphic.
 */
export function decode_base64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
