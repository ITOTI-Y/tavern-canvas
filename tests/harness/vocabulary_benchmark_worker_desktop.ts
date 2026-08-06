import {
  PackageStoreShardByteSource,
  start_vocabulary_worker,
  with_activation_lifecycle,
} from "../../apps/extension/src/workers/vocabulary_worker.js";

// Explicit desktop-mode (64 MiB LRU) benchmark worker. The production entry
// point (vocabulary_worker.ts, loaded unmodified as the primary benchmark
// worker) picks its own mode from navigator.deviceMemory, so exactly one of
// the two budgets is reachable that way in any given environment; the
// harness runs whichever explicit entry covers the OTHER one, so both
// budgets are always proven. Everything below is the real, exported
// production class -- no search, decoding, or storage logic is
// reimplemented here; the only thing supplied is the memory_mode option a
// real desktop-class caller would receive.
declare const self: DedicatedWorkerGlobalScope;

// Same debug-global convention as vocabulary_worker.ts's own production
// auto-registration block, so the Playwright spec reads
// `resident_shard_bytes` / `shard_lru_budget_bytes` uniformly for every
// worker it tracks.
interface VocabularyWorkerDebugGlobal {
  __vocabulary_worker_engine_debug__?: unknown;
}

const byte_source = new PackageStoreShardByteSource(self);
const engine = start_vocabulary_worker(byte_source, with_activation_lifecycle(self, byte_source), {
  memory_mode: "desktop",
});
(globalThis as VocabularyWorkerDebugGlobal).__vocabulary_worker_engine_debug__ = engine;
