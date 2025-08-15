<template>
  <div
    v-if="isLoading"
    class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-sm"
  >
    <div class="text-center">
      <!-- Logo loading -->
      <div class="mb-6">
        <div class="text-4xl font-bold text-system-primary-100 mb-2">🏨</div>
        <div class="text-lg text-system-primary-100 font-semibold">Nikko Hotel</div>
      </div>
      
      <!-- Loading spinner -->
      <div class="relative">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-system-primary-40 border-t-system-primary-100"></div>
        <div class="absolute inset-0 h-16 w-16 animate-ping rounded-full border-2 border-system-primary-100 opacity-20"></div>
      </div>
      
      <!-- Loading text -->
      <div class="mt-4 text-system-primary-100 font-medium">
        Đang tải...
      </div>
      
      <!-- Progress bar -->
      <div class="mt-4 w-48 bg-system-primary-40 rounded-full h-1 overflow-hidden">
        <div class="h-full bg-system-primary-100 rounded-full animate-pulse" style="animation-duration: 1.5s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
