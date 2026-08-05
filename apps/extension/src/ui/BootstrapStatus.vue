<script setup lang="ts">
import type { StartupStatus } from "../bootstrap/startup_error.js";

defineProps<{
  readonly status: StartupStatus;
  readonly version: string;
}>();
</script>

<template>
  <main class="bootstrap-status" :data-startup-state="status.state" aria-live="polite">
    <p class="bootstrap-status__eyebrow">TavernCanvas {{ version }}</p>
    <h1>{{ status.title }}</h1>
    <p>{{ status.message }}</p>
    <a
      v-if="status.state === 'blocked'"
      class="bootstrap-status__action"
      :href="status.update_url"
      target="_blank"
      rel="noreferrer"
    >
      Open JS Slash Runner
    </a>
  </main>
</template>
