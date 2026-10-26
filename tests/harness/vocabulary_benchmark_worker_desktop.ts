import {
  PackageStoreShardByteSource,
  start_vocabulary_worker,
  with_activation_lifecycle,
} from "../../apps/extension/src/workers/vocabulary_worker.js";

// Explicit desktop-mode (64 MiB LRU) benchmark worker; the production entry picks its mode from
// navigator.deviceMemory, so the harness runs this and the mobile entry to cover both budgets.
declare const self: DedicatedWorkerGlobalScope;

// Debug global read by the Playwright spec, as in vocabulary_worker.ts.
interface VocabularyWorkerDebugGlobal {
  __vocabulary_worker_engine_debug__?: unknown;
}

const byte_source = new PackageStoreShardByteSource(self);
const engine = start_vocabulary_worker(byte_source, with_activation_lifecycle(self, byte_source), {
  memory_mode: "desktop",
});
(globalThis as VocabularyWorkerDebugGlobal).__vocabulary_worker_engine_debug__ = engine;
