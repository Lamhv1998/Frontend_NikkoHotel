<template>
  <section class="rounded-t-3xl bg-white px-4 py-12 text-gray-800 shadow-inner sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <UITitle text1="Danh sách blog" />

      <!-- Search + Filter -->
      <div
        class="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
      >
        <input
          v-model="search"
          class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-1/2"
          type="text"
          placeholder="Tìm kiếm tiêu đề..."
        />

        <UISelect
          v-model="category"
          label="label"
          value="value"
          placeholder="Tất cả chuyên mục"
          :options="categoryOptions"
          :disabled="false"
        />
      </div>

      <!-- Blog Cards -->
      <div class="grid gap-6">
        <div
          v-for="blog in paginatedBlogs"
          :key="blog.id"
          class="flex space-x-6 rounded-lg border border-gray-200 bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg"
        >
          <NuxtLink class="block flex-1 hover:text-yellow-600" :to="`/blog/${blog.id}`">
            <div class="flex">
              <img
                v-if="blog.image"
                class="mr-6 h-20 w-32 flex-shrink-0 rounded-md object-cover"
                :src="blog.image"
                alt="Thumbnail"
              />
              <div>
                <h2 class="mb-2 text-2xl font-semibold text-gray-900">{{ blog.title }}</h2>
                <p class="mb-2 line-clamp-2 text-gray-600">{{ blog.content }}</p>
                <p class="text-sm text-gray-500">
                  <span class="font-medium">Chuyên mục:</span> {{ blog.category }} &nbsp;–&nbsp;
                  {{ blog.createdAt }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-10 flex justify-center">
        <nav class="space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{
              'border-yellow-500 bg-yellow-500 font-semibold text-white': currentPage === page,
              'border-gray-300 bg-white text-gray-700 hover:bg-gray-100': currentPage !== page
            }"
            class="rounded-md border px-4 py-2"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { blogList, type Blog } from '@/stores/blogs'
import UITitle from './components/UI/UITitle.vue'
// pages/blog/index.vue hoặc pages/blog/[id].vue
import BlogCard from './components/BlogCard.vue'
import BlogFilters from './components/BlogFilters.vue'
import Pagination from './components/Pagination.vue'

const search = ref('')
const category = ref('')
const currentPage = ref(1)
const pageSize = 5

const categoryOptions = computed(() => {
  const unique = [...new Set(blogList.map((b) => b.category))]
  return [
    { label: 'Tất cả chuyên mục', value: '' },
    ...unique.map((cat) => ({ label: cat, value: cat }))
  ]
})

// Lọc theo search + category
const filteredBlogs = computed(() => {
  return blogList.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = category.value ? blog.category === category.value : true
    return matchesSearch && matchesCategory
  })
})

// Phân trang
const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredBlogs.value.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / pageSize))
</script>
