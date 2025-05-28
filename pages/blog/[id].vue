<script lang="ts" setup>
import { blogList } from '@/stores/blogs'
import { useRoute } from 'vue-router'
// pages/blog/index.vue hoặc pages/blog/[id].vue
import BlogCard from './components/BlogCard.vue'
// import BlogFilters from './components/BlogFilters.vue'
// import Pagination from './components/Pagination.vue'

const route = useRoute()
const id = route.params.id
const blog = blogList.find((b) => b.id === id)

if (!blog) {
  throw createError({ statusCode: 404, message: 'Không tìm thấy bài viết' })
}

// Gợi ý 2 bài cùng loại
const related = blogList.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 2)
</script>

<template>
  <section class="rounded-t-3xl bg-white px-4 py-12 text-gray-800 shadow-inner sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <!-- Ảnh đại diện -->
      <div v-if="blog.image" class="mb-8">
        <img
          class="h-64 w-full rounded-xl object-cover shadow-sm"
          :src="blog.image"
          alt="Thumbnail"
        />
      </div>

      <!-- Tiêu đề -->
      <h1 class="mb-4 text-3xl font-bold text-gray-900">{{ blog.title }}</h1>

      <!-- Thông tin phụ -->
      <p class="mb-6 text-sm text-gray-500">
        <span class="font-medium">Chuyên mục:</span> {{ blog.category }} &nbsp;–&nbsp;
        {{ blog.createdAt }}
      </p>

      <!-- Nội dung -->
      <div
        v-html="blog.content"
        class="prose prose-sm sm:prose lg:prose-lg mb-10 max-w-none leading-relaxed text-gray-700"
      />

      <!-- Gợi ý -->
      <div>
        <h2 class="mb-6 text-2xl font-semibold text-gray-900">Bài viết cùng chuyên mục</h2>
        <div class="grid gap-6">
          <BlogCard v-for="b in related" :key="b.id" :blog="b" />
        </div>
      </div>
    </div>
  </section>
</template>
