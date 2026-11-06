<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

import ZoomableImage from "../../components/ZoomableImage.vue";

const props = defineProps<{
  readonly imageId: string;
  readonly alt: string;
  readonly readImage: (image_id: string) => Promise<Blob>;
  readonly imageClass?: string | undefined;
  readonly zoomable?: boolean;
}>();

const emit = defineEmits<{
  failed: [];
}>();

const url = ref<string | null>(null);
let token = 0;

function release(): void {
  if (url.value !== null) {
    URL.revokeObjectURL(url.value);
    url.value = null;
  }
}

watch(
  () => props.imageId,
  async (image_id) => {
    const current = (token += 1);
    release();
    try {
      const blob = await props.readImage(image_id);
      if (current === token) {
        url.value = URL.createObjectURL(blob);
      }
    } catch {
      if (current === token) {
        emit("failed");
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  token += 1;
  release();
});
</script>

<template>
  <template v-if="url !== null">
    <ZoomableImage v-if="zoomable" :src="url" :alt="alt" :image-class="imageClass" />
    <img v-else :src="url" :alt="alt" :class="imageClass" />
  </template>
</template>
