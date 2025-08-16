<template>
  <article class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <!-- Blog Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="blog.image"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        :src="blog.image"
        :alt="blog.title"
      />
      <div v-else class="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <Icon name="ic:outline-article" class="h-12 w-12 text-primary-400" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="absolute bottom-4 left-4">
        <span class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800">
          {{ blog.category }}
        </span>
      </div>
    </div>

    <!-- Blog Content -->
    <div class="p-6">
      <NuxtLink :to="`/blog/${blog.id}`" class="block">
        <h3 class="mb-3 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {{ blog.title }}
        </h3>
        <p class="mb-4 line-clamp-3 text-gray-600">
          {{ blog.summary || blog.content }}
        </p>
      </NuxtLink>

      <!-- Meta Info -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <Icon name="ic:outline-schedule" class="h-4 w-4" />
          <span>{{ formatDate(blog.createdAt) }}</span>
        </div>
        <NuxtLink
          :to="`/blog/${blog.id}`"
          class="inline-flex items-center gap-1 font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Đọc thêm
          <Icon name="ic:baseline-arrow-forward" class="h-4 w-4" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps<{ blog: Blog }>()

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
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
