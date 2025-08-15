<template>
  <div v-if="hasError" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center max-w-md mx-auto p-8">
      <!-- Error Icon -->
      <div class="text-6xl mb-6">⚠️</div>
      
      <!-- Error Title -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Đã xảy ra lỗi
      </h1>
      
      <!-- Error Message -->
      <p class="text-gray-600 mb-6">
        {{ errorMessage }}
      </p>
      
      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          @click="retry"
          class="w-full bg-system-primary-100 text-white px-6 py-3 rounded-lg font-semibold hover:bg-system-primary-80 transition-colors duration-300"
        >
          Thử lại
        </button>
        
        <button
          @click="goHome"
          class="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup lang="ts">
interface Props {
  fallback?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.'
})

const hasError = ref(false)
const errorMessage = ref(props.fallback)

// Error handling
const handleError = (error: Error) => {
  console.error('Error caught by ErrorBoundary:', error)
  hasError.value = true
  errorMessage.value = error.message || props.fallback
}

// Retry function
const retry = () => {
  hasError.value = false
  errorMessage.value = props.fallback
  // Trigger a page refresh or retry logic
  window.location.reload()
}

// Go home function
const goHome = () => {
  navigateTo('/')
}

// Expose error handling
defineExpose({
  handleError
})

// Global error handler
onMounted(() => {
  window.addEventListener('error', (event) => {
    handleError(new Error(event.message))
  })
  
  window.addEventListener('unhandledrejection', (event) => {
    handleError(new Error(event.reason))
  })
})
</script>
