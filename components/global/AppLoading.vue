<template>
  <div
    v-if="isLoading"
    class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/10 backdrop-blur-sm"
  >
    <div
      class="text-primary h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent"
    ></div>
  </div>
</template>

<script setup>
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
</script>
