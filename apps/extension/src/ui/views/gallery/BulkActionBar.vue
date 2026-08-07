<script setup lang="ts">
import { Download, Trash2, Unlink, X } from "lucide-vue-next";

import AppButton from "../../components/AppButton.vue";
import IconButton from "../../components/IconButton.vue";
import styles from "./gallery.module.css";

/** Appears once at least one tile is selected. A 1px top divider separates it from the grid
 * (cockpit density discipline) instead of wrapping the whole bar in its own card. */
defineProps<{
  readonly selectedCountLabel: string;
  readonly downloadLabel: string;
  readonly deleteLabel: string;
  readonly detachLabel: string;
  readonly clearLabel: string;
  readonly pending?: boolean;
}>();

const emit = defineEmits<{
  download: [];
  delete: [];
  detach: [];
  clear: [];
}>();
</script>

<template>
  <div :class="styles.bulkActionBar">
    <span class="tc-tabular-nums" :class="styles.bulkActionCount">{{ selectedCountLabel }}</span>
    <div :class="styles.bulkActionButtons">
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
      <IconButton :icon="X" :label="clearLabel" @click="emit('clear')" />
    </div>
  </div>
</template>
