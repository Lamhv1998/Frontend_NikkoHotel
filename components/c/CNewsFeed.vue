<template>
  <div class="news-feed">
    <div class="news-header">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
        Tin tức mới nhất về du lịch và khách sạn
      </h3>
      <button 
        @click="refreshNews" 
        :disabled="loading"
        class="refresh-btn"
      >
        <span v-if="loading">Đang tải...</span>
        <span v-else>Làm mới</span>
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-gray-600 mt-2">Đang tải tin tức mới...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <p class="text-red-600">{{ error }}</p>
      <button @click="refreshNews" class="retry-btn">
        Thử lại
      </button>
    </div>

    <!-- News list -->
    <div v-else-if="newsItems.length > 0" class="news-list">
      <div 
        v-for="news in newsItems" 
        :key="news.id"
        class="news-item"
      >

        <div class="news-content">
          <div class="news-meta">
            <span class="news-source">{{ news.source }}</span>
            <span class="news-date">{{ formatDate(news.createdAt) }}</span>
          </div>
          <h4 class="news-title">{{ news.title }}</h4>
          <a 
            :href="news.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="read-more-btn"
          >
            Đọc thêm →
          </a>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <p class="text-gray-500">Chưa có tin tức mới. Vui lòng thử lại sau.</p>
    </div>

    <!-- Auto-update info -->
    <div class="auto-update-info">
      <p class="text-xs text-gray-400">
        Tin tức được tự động cập nhật mỗi 5 phút
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsApi } from '~/composables/useNewsApi'

const { 
  newsItems, 
  loading, 
  error, 
  fetchNews, 
  startAutoUpdate 
} = useNewsApi()

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Refresh news manually
const refreshNews = async () => {
  await fetchNews()
}

// Start auto-update when component mounts
onMounted(() => {
  startAutoUpdate()
})
</script>

<style scoped>
.news-feed {
  @apply bg-white rounded-lg shadow-md p-6;
}

.news-header {
  @apply flex justify-between items-center mb-6;
}

.refresh-btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}

.loading-state {
  @apply text-center py-8;
}

.error-state {
  @apply text-center py-8;
}

.retry-btn {
  @apply mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors;
}

.news-list {
  @apply space-y-6;
}

.news-item {
  @apply flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow;
}

.news-image {
  @apply flex-shrink-0 w-32;
}

.news-content {
  @apply flex-1;
}

.news-meta {
  @apply flex items-center gap-3 mb-2;
}

.news-source {
  @apply text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded;
}

.news-date {
  @apply text-sm text-gray-500;
}

.news-title {
  @apply text-lg font-semibold text-gray-800 mb-2 line-clamp-2;
}

.news-summary {
  @apply text-gray-600 mb-3 line-clamp-3;
}

.read-more-btn {
  @apply inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors;
}

.empty-state {
  @apply text-center py-8;
}

.auto-update-info {
  @apply mt-6 pt-4 border-t border-gray-200 text-center;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
