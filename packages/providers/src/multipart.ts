import { invalid_request } from "./image_bytes.js";

export interface MultipartFile {
  readonly field_name: string;
  readonly file_name: string;
  readonly content_type: string;
  readonly bytes: Uint8Array;
}

export interface EncodedMultipart {
  readonly content_type: string;
  readonly body: Uint8Array;
}

export function encode_multipart(
  fields: Readonly<Record<string, string>>,
  files: readonly MultipartFile[],
): EncodedMultipart {
  for (const name of Object.keys(fields)) {
    validate_token(name);
  }
  for (const file of files) {
    validate_token(file.field_name);
    validate_token(file.file_name);
    if (!/^[a-z]+\/[a-z0-9.+-]+$/u.test(file.content_type)) {
      throw invalid_request();
    }
  }

  const boundary = create_boundary(fields, files);
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  for (const [name, value] of Object.entries(fields)) {
    chunks.push(
      encoder.encode(
        `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
      ),
    );
  }
  for (const file of files) {
    chunks.push(
      encoder.encode(
        `--${boundary}\r\nContent-Disposition: form-data; name="${file.field_name}"; filename="${file.file_name}"\r\nContent-Type: ${file.content_type}\r\n\r\n`,
      ),
      file.bytes,
      encoder.encode("\r\n"),
    );
  }
  chunks.push(encoder.encode(`--${boundary}--\r\n`));

  const byte_length = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const body = new Uint8Array(byte_length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { content_type: `multipart/form-data; boundary=${boundary}`, body };
}

function create_boundary(
  fields: Readonly<Record<string, string>>,
  files: readonly MultipartFile[],
): string {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const boundary = `tavern-canvas-${globalThis.crypto.randomUUID()}`;
    const boundary_bytes = new TextEncoder().encode(boundary);
    const collides =
      Object.entries(fields).some(
        ([name, value]) => name.includes(boundary) || value.includes(boundary),
      ) ||
      files.some(
        (file) =>
          file.field_name.includes(boundary) ||
          file.file_name.includes(boundary) ||
          file.content_type.includes(boundary) ||
          contains_bytes(file.bytes, boundary_bytes),
      );
    if (!collides) {
      return boundary;
    }
  }
  throw invalid_request();
}

function contains_bytes(bytes: Uint8Array, pattern: Uint8Array): boolean {
  if (pattern.byteLength === 0 || bytes.byteLength < pattern.byteLength) {
    return false;
  }
  const last_start = bytes.byteLength - pattern.byteLength;
  for (let start = 0; start <= last_start; start += 1) {
    let matches = true;
    for (let offset = 0; offset < pattern.byteLength; offset += 1) {
      if (bytes[start + offset] !== pattern[offset]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      return true;
    }
  }
  return false;
}

function validate_token(value: string): void {
  if (value.length === 0 || value.length > 128 || /["\r\n]/u.test(value)) {
    throw invalid_request();
  }
}
