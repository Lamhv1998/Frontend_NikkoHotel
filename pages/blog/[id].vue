<script setup lang="ts">
import { blogList } from '@/stores/blogs'
import { useRoute } from 'vue-router'
// pages/blog/index.vue hoặc pages/blog/[id].vue
import BlogCard from './components/BlogCard.vue'
// import BlogFilters from './components/BlogFilters.vue'
// import Pagination from './components/Pagination.vue'


const route = useRoute()
const id = route.params.id
const blog = blogList.find(b => b.id === id)

if (!blog) {
  throw createError({ statusCode: 404, message: 'Không tìm thấy bài viết' })
}

// Gợi ý 2 bài cùng loại
const related = blogList
  .filter(b => b.category === blog.category && b.id !== blog.id)
  .slice(0, 2)
</script>

<template>
  <section class="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 rounded-t-3xl shadow-inner">
    <div class="max-w-5xl mx-auto">

              <!-- Ảnh đại diện -->
      <div v-if="blog.image" class="mb-8">
        <img
          :src="blog.image"
          alt="Thumbnail"
          class="w-full h-64 object-cover rounded-xl shadow-sm"
        />
      </div>

      <!-- Tiêu đề -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ blog.title }}</h1>

      <!-- Thông tin phụ -->
      <p class="text-sm text-gray-500 mb-6">
        <span class="font-medium">Chuyên mục:</span> {{ blog.category }} &nbsp;–&nbsp; {{ blog.createdAt }}
      </p>

      <!-- Nội dung -->
      <div class="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 leading-relaxed mb-10" v-html="blog.content" />

      <!-- Gợi ý -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Bài viết cùng chuyên mục</h2>
        <div class="grid gap-6">
          <BlogCard v-for="b in related" :key="b.id" :blog="b" />
        </div>
      </div>
    </div>
  </section>
</template>
