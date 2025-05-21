<template>
  <section class="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 rounded-t-3xl shadow-inner">
    <div class="max-w-5xl mx-auto">
        <UITitle text1="Danh sách blog"/>

      <!-- Search + Filter -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm tiêu đề..."
          class="px-4 py-2 w-full sm:w-1/2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          v-model="search"
        />  

      <UISelect
        v-model="category"
        :options="categoryOptions"
        label="label"
        value="value"
        placeholder="Tất cả chuyên mục"
        :disabled="false" 
      />

      </div>

      <!-- Blog Cards -->
      <div class="grid gap-6">
        <div
          v-for="blog in paginatedBlogs"
          :key="blog.id"
          class="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 flex space-x-6"
        >
          <NuxtLink :to="`/blog/${blog.id}`" class="block hover:text-yellow-600 flex-1">
            <div class="flex">
              <img
                v-if="blog.image"
                :src="blog.image"
                alt="Thumbnail"
                class="w-32 h-20 object-cover rounded-md mr-6 flex-shrink-0"
              />
              <div>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ blog.title }}</h2>
                <p class="text-gray-600 mb-2 line-clamp-2">{{ blog.content }}</p>
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
      <div class="flex justify-center mt-10">
        <nav class="space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="px-4 py-2 rounded-md border"
            :class="{
              'bg-yellow-500 text-white font-semibold border-yellow-500': currentPage === page,
              'bg-white text-gray-700 border-gray-300 hover:bg-gray-100': currentPage !== page
            }"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
  const unique = [...new Set(blogList.map(b => b.category))]
  return [
    { label: 'Tất cả chuyên mục', value: '' },
    ...unique.map(cat => ({ label: cat, value: cat }))
  ]
})


// Lọc theo search + category
const filteredBlogs = computed(() => {
  return blogList.filter(blog => {
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