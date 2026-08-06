import {
  PackageStoreShardByteSource,
  start_vocabulary_worker,
  with_activation_lifecycle,
} from "../../apps/extension/src/workers/vocabulary_worker.js";

// Explicit mobile-mode (16 MiB LRU) benchmark worker -- the mirror of
// vocabulary_benchmark_worker_desktop.ts; see that file for why both exist.
declare const self: DedicatedWorkerGlobalScope;

interface VocabularyWorkerDebugGlobal {
  __vocabulary_worker_engine_debug__?: unknown;
}

const byte_source = new PackageStoreShardByteSource(self);
const engine = start_vocabulary_worker(byte_source, with_activation_lifecycle(self, byte_source), {
  memory_mode: "mobile",
});
(globalThis as VocabularyWorkerDebugGlobal).__vocabulary_worker_engine_debug__ = engine;
