import {
  PackageStoreShardByteSource,
  start_vocabulary_worker,
  with_activation_lifecycle,
} from "../../apps/extension/src/workers/vocabulary_worker.js";

// Stage 05 Task 6: the production Worker (vocabulary_worker.ts, loaded
// unmodified as the primary benchmark worker) selects its LRU memory_mode
// from navigator.deviceMemory (detect_shard_memory_mode). Headless Chromium
// does not expose that API -- verified empirically, undefined both on the
// page and inside a dedicated Worker -- so the primary worker always
// resolves to "mobile" here, and there is no Chrome DevTools Protocol
// command to override it (checked: Emulation domain has
// setHardwareConcurrencyOverride but nothing for deviceMemory). To
// independently prove the desktop (64 MiB) LRU budget too, this thin entry
// point reuses the SAME real, exported production classes and functions
// with an explicit memory_mode -- exactly the option a real desktop-class
// caller would receive if deviceMemory were reported as >= 8. No
// search/decoding/storage logic is reimplemented here; every call below is
// the production class, unmodified.
declare const self: DedicatedWorkerGlobalScope;

// Same debug-global convention as vocabulary_worker.ts's own production
// auto-registration block, so the Playwright spec can read
// `resident_shard_bytes` (Stage 05 Task 6's LRU high-water-mark proof)
// uniformly for both the primary and this desktop worker.
interface VocabularyWorkerDebugGlobal {
  __vocabulary_worker_engine_debug__?: unknown;
}

const byte_source = new PackageStoreShardByteSource(self);
const engine = start_vocabulary_worker(byte_source, with_activation_lifecycle(self, byte_source), {
  memory_mode: "desktop",
});
(globalThis as VocabularyWorkerDebugGlobal).__vocabulary_worker_engine_debug__ = engine;
