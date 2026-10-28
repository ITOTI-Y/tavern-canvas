<script setup lang="ts">
import { Download, Trash2, Unlink, X } from "lucide-vue-next";

import AppButton from "../../components/AppButton.vue";
import IconButton from "../../components/IconButton.vue";
import styles from "./gallery_styles.js";

defineProps<{
  readonly selectedCountLabel: string;
  readonly selectAllLabel: string;
  readonly allSelected: boolean;
  readonly downloadLabel: string;
  readonly deleteLabel: string;
  readonly detachLabel: string;
  readonly clearLabel: string;
  readonly pending?: boolean;
}>();

const emit = defineEmits<{
  "select-all": [];
  download: [];
  delete: [];
  detach: [];
  clear: [];
}>();
</script>

<template>
  <div :class="styles.bulkActionBar" role="region" :aria-label="selectedCountLabel">
    <span class="tc-tabular-nums" :class="styles.bulkActionCount">{{ selectedCountLabel }}</span>
    <AppButton
      v-if="!allSelected"
      :label="selectAllLabel"
      variant="ghost"
      :class="styles.bulkWide"
      data-testid="gallery-select-all"
      @click="emit('select-all')"
    />
    <!-- Wide workspaces show labelled buttons; narrow ones the same actions as icons. -->
    <div :class="[styles.bulkActionButtons, styles.bulkWide]">
      <AppButton
        :label="downloadLabel"
        :icon="Download"
        variant="secondary"
        @click="emit('download')"
      />
      <AppButton :label="detachLabel" :icon="Unlink" variant="secondary" @click="emit('detach')" />
      <AppButton
        :label="deleteLabel"
        :icon="Trash2"
        variant="destructive"
        :pending="pending"
        @click="emit('delete')"
      />
    </div>
    <div :class="[styles.bulkActionButtons, styles.bulkNarrow]">
      <IconButton :icon="Download" size="sm" :label="downloadLabel" @click="emit('download')" />
      <IconButton :icon="Unlink" size="sm" :label="detachLabel" @click="emit('detach')" />
      <IconButton
        :icon="Trash2"
        size="sm"
        destructive
        :label="deleteLabel"
        @click="emit('delete')"
      />
    </div>
    <span :class="styles.bulkClear">
      <IconButton :icon="X" size="sm" :label="clearLabel" @click="emit('clear')" />
    </span>
  </div>
</template>
