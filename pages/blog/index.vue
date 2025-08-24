<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 py-20 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Blog & Tin tức
          </h1>
          <p class="mx-auto max-w-2xl text-xl text-primary-100">
            Khám phá những bài viết mới nhất về khách sạn, du lịch và trải nghiệm đáng nhớ
          </p>
        </div>
      </div>
    </section>

    <!-- Search & Filter Section -->
    <section class="relative -mt-8 pb-8">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-white p-6 shadow-xl">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <!-- Search Bar -->
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <Icon name="ic:outline-search" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                v-model="search"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                type="text"
                placeholder="Tìm kiếm bài viết..."
              />
            </div>

            <!-- Category Filter -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-600">Chuyên mục:</span>
              <UISelect
                v-model="category"
                label="label"
                value="value"
                placeholder="Tất cả chuyên mục"
                :options="categoryOptions"
                :disabled="false"
                class="min-w-[200px]"
              />
            </div>

            <!-- Sort Options -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-600">Sắp xếp:</span>
              <select
                v-model="sortBy"
                class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="title">Theo tiêu đề</option>
              </select>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-sm text-gray-600">Bộ lọc:</span>
            <span
              v-if="search"
              class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
            >
              "{{ search }}"
              <button
                @click="search = ''"
                class="ml-1 rounded-full p-0.5 hover:bg-primary-200"
              >
                <Icon name="ic:baseline-close" class="h-3 w-3" />
              </button>
            </span>
            <span
              v-if="category"
              class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
            >
              {{ category }}
              <button
                @click="category = ''"
                class="ml-1 rounded-full p-0.5 hover:bg-primary-200"
              >
                <Icon name="ic:baseline-close" class="h-3 w-3" />
              </button>
            </span>
            <button
              @click="clearAllFilters"
              class="text-sm text-gray-500 hover:text-primary-600"
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content -->
    <section class="py-12">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-8 flex items-center justify-between">
          <p class="text-gray-600">
            Hiển thị {{ paginatedBlogs.length }} trong {{ filteredBlogs.length }} bài viết
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Hiển thị:</span>
            <select
              v-model="pageSize"
              class="rounded-lg border border-gray-200 px-3 py-1 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="6">6 bài</option>
              <option value="12">12 bài</option>
              <option value="18">18 bài</option>
            </select>
          </div>
        </div>

        <!-- Blog Grid -->
        <div v-if="paginatedBlogs.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="blog in paginatedBlogs"
            :key="blog.id"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
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
                  {{ blog.content }}
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
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="mx-auto max-w-md">
            <Icon name="ic:outline-search-off" class="mx-auto h-16 w-16 text-gray-300" />
            <h3 class="mt-4 text-lg font-medium text-gray-900">Không tìm thấy bài viết</h3>
            <p class="mt-2 text-gray-600">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết phù hợp.
            </p>
            <button
              @click="clearAllFilters"
              class="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <nav class="flex items-center gap-2">
            <button
              :disabled="currentPage === 1"
              @click="currentPage = currentPage - 1"
              class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ic:baseline-chevron-left" class="h-4 w-4" />
              Trước
            </button>

            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                :class="{
                  'bg-primary-600 text-white': currentPage === page,
                  'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page
                }"
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-all"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>

            <button
              :disabled="currentPage === totalPages"
              @click="currentPage = currentPage + 1"
              class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
              <Icon name="ic:baseline-chevron-right" class="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </section>
    <CNewsFeed />
  </div>
</template>

<script lang="ts" setup>
import { blogList, type Blog } from '@/stores/blogs'

const search = ref('')
const category = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = ref(6)

const categoryOptions = computed(() => {
  const unique = [...new Set(blogList.map((b) => b.category))]
  return [
    { label: 'Tất cả chuyên mục', value: '' },
    ...unique.map((cat) => ({ label: cat, value: cat }))
  ]
})

// Lọc theo search + category
const filteredBlogs = computed(() => {
  let filtered = blogList.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.value.toLowerCase()) ||
                         blog.content.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = category.value ? blog.category === category.value : true
    return matchesSearch && matchesCategory
  })

  // Sắp xếp
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return filtered
})

// Phân trang
const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredBlogs.value.slice(start, start + pageSize.value)
})

const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / pageSize.value))

// Hiển thị trang phân trang
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Kiểm tra có filter active không
const hasActiveFilters = computed(() => {
  return search.value || category.value
})

// Xóa tất cả filter
const clearAllFilters = () => {
  search.value = ''
  category.value = ''
  currentPage.value = 1
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Reset page khi filter thay đổi
watch([search, category, sortBy], () => {
  currentPage.value = 1
})
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
