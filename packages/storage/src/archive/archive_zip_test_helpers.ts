import {
  BlobReader,
  BlobWriter,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  ZipReader,
  ZipWriter,
} from "@zip.js/zip.js";

export interface RebuildArchiveOptions {
  readonly replace?: Readonly<Record<string, Uint8Array>>;
  readonly exclude?: readonly string[];
  /** Force a `passThrough` write so the entry declares a size unrelated to its real byte count. */
  readonly forge_uncompressed_size?: Readonly<Record<string, number>>;
}

export async function rebuild_archive(
  blob: Blob,
  options: RebuildArchiveOptions = {},
): Promise<Blob> {
  const zip_reader = new ZipReader(new BlobReader(blob));
  const entries = await zip_reader.getEntries();
  const zip_writer = new ZipWriter(new BlobWriter("application/zip"));
  const exclude = new Set(options.exclude ?? []);

  for (const entry of entries) {
    if (entry.directory || exclude.has(entry.filename)) {
      continue;
    }
    const bytes = options.replace?.[entry.filename] ?? new Uint8Array(await entry.arrayBuffer());
    const forged_size = options.forge_uncompressed_size?.[entry.filename];
    if (forged_size === undefined) {
      await zip_writer.add(entry.filename, new Uint8ArrayReader(bytes));
    } else {
      await zip_writer.add(entry.filename, new Uint8ArrayReader(bytes), {
        passThrough: true,
        compressionMethod: 0,
        uncompressedSize: forged_size,
        signature: 0,
      });
    }
  }

  await zip_reader.close();
  return zip_writer.close();
}

function read_u16le(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] as number) | ((bytes[offset + 1] as number) << 8);
}

function read_u32le(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] as number) |
      ((bytes[offset + 1] as number) << 8) |
      ((bytes[offset + 2] as number) << 16) |
      ((bytes[offset + 3] as number) << 24)) >>>
    0
  );
}

function write_u16le(bytes: Uint8Array, offset: number, value: number): void {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
}

function write_u32le(bytes: Uint8Array, offset: number, value: number): void {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
  bytes[offset + 2] = (value >>> 16) & 0xff;
  bytes[offset + 3] = (value >>> 24) & 0xff;
}

const EOCD_SIGNATURE = [0x50, 0x4b, 0x05, 0x06];

function find_eocd_offset(bytes: Uint8Array): number {
  for (let offset = bytes.length - 22; offset >= 0; offset -= 1) {
    if (
      bytes[offset] === EOCD_SIGNATURE[0] &&
      bytes[offset + 1] === EOCD_SIGNATURE[1] &&
      bytes[offset + 2] === EOCD_SIGNATURE[2] &&
      bytes[offset + 3] === EOCD_SIGNATURE[3]
    ) {
      return offset;
    }
  }
  throw new Error("End of central directory record not found");
}

// zip.js `ZipWriter` refuses duplicate filenames, so the central directory is edited directly.
export async function duplicate_first_central_directory_entry(blob: Blob): Promise<Blob> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const eocd_offset = find_eocd_offset(bytes);
  const disk_entry_count = read_u16le(bytes, eocd_offset + 8);
  const total_entries = read_u16le(bytes, eocd_offset + 10);
  const central_directory_size = read_u32le(bytes, eocd_offset + 12);
  const central_directory_offset = read_u32le(bytes, eocd_offset + 16);

  const filename_length = read_u16le(bytes, central_directory_offset + 28);
  const extra_field_length = read_u16le(bytes, central_directory_offset + 30);
  const comment_length = read_u16le(bytes, central_directory_offset + 32);
  const record_length = 46 + filename_length + extra_field_length + comment_length;
  const record_bytes = bytes.slice(
    central_directory_offset,
    central_directory_offset + record_length,
  );

  const local_data = bytes.slice(0, central_directory_offset);
  const central_directory = bytes.slice(
    central_directory_offset,
    central_directory_offset + central_directory_size,
  );
  const trailer = bytes.slice(central_directory_offset + central_directory_size).slice();

  write_u16le(trailer, 8, disk_entry_count + 1);
  write_u16le(trailer, 10, total_entries + 1);
  write_u32le(trailer, 12, central_directory_size + record_length);

  const combined = new Uint8Array(
    local_data.length + central_directory.length + record_bytes.length + trailer.length,
  );
  let cursor = 0;
  combined.set(local_data, cursor);
  cursor += local_data.length;
  combined.set(central_directory, cursor);
  cursor += central_directory.length;
  combined.set(record_bytes, cursor);
  cursor += record_bytes.length;
  combined.set(trailer, cursor);

  return new Blob([combined]);
}

export async function read_zip_entry_bytes(blob: Blob, filename: string): Promise<Uint8Array> {
  const zip_reader = new ZipReader(new BlobReader(blob));
  const entries = await zip_reader.getEntries();
  const entry = entries.find((candidate) => candidate.filename === filename);
  if (entry === undefined || entry.directory) {
    throw new Error(`Entry not found in archive: ${filename}`);
  }
  const bytes = await entry.getData(new Uint8ArrayWriter());
  await zip_reader.close();
  return bytes;
}
