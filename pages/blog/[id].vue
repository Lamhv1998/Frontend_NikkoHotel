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

// Gợi ý 3 bài cùng loại
const related = blogList.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 3)

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

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 py-20 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <span class="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            {{ blog.category }}
          </span>
          <h1 class="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {{ blog.title }}
          </h1>
          <div class="mt-6 flex items-center justify-center gap-4 text-primary-100">
            <div class="flex items-center gap-2">
              <Icon name="ic:outline-schedule" class="h-5 w-5" />
              <span>{{ formatDate(blog.createdAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="ic:outline-person" class="h-5 w-5" />
              <span>Admin</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content -->
    <section class="py-12">
      <div class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-white p-8 shadow-xl">
          <!-- Featured Image -->
          <div v-if="blog.image" class="mb-8 overflow-hidden rounded-xl">
            <img 
              class="h-64 w-full object-cover sm:h-80 lg:h-96" 
              :src="blog.image" 
              :alt="blog.title" 
            />
          </div>

          <!-- Blog Content -->
          <article class="prose prose-lg max-w-none">
            <div v-html="blog.content" class="leading-relaxed text-gray-700" />
          </article>

          <!-- Tags & Share -->
          <div class="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-600">Chia sẻ:</span>
              <div class="flex gap-2">
                <button class="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                  <Icon name="ic:baseline-facebook" class="h-4 w-4" />
                </button>
                <button class="rounded-full bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500">
                  <Icon name="ic:baseline-twitter" class="h-4 w-4" />
                </button>
                <button class="rounded-full bg-green-600 p-2 text-white transition-colors hover:bg-green-700">
                  <Icon name="ic:baseline-whatsapp" class="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <NuxtLink
              to="/blog"
              class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
            >
              <Icon name="ic:baseline-arrow-back" class="h-4 w-4" />
              Quay lại danh sách
            </NuxtLink>
          </div>
        </div>

        <!-- Related Posts -->
        <div v-if="related.length > 0" class="mt-16">
          <div class="mb-8 text-center">
            <h2 class="text-3xl font-bold text-gray-900">Bài viết liên quan</h2>
            <p class="mt-2 text-gray-600">Khám phá thêm những bài viết cùng chuyên mục</p>
          </div>
          
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard v-for="relatedBlog in related" :key="relatedBlog.id" :blog="relatedBlog" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prose {
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.75;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #f59e0b;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
  margin: 2rem 0;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose img {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style>
