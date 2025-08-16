<template>
  <div v-if="totalPages > 1" class="flex justify-center">
    <nav class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
        class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="ic:baseline-chevron-left" class="h-4 w-4" />
        Trước
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="{
            'bg-primary-600 text-white': currentPage === page,
            'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page
          }"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-all"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        :disabled="currentPage === totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
        class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau
        <Icon name="ic:baseline-chevron-right" class="h-4 w-4" />
      </button>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  'update:currentPage': [page: number]
}>()

// Hiển thị trang phân trang
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(props.totalPages, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>
