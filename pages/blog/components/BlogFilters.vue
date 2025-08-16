<template>
  <div class="rounded-2xl bg-white p-6 shadow-xl">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <!-- Search Bar -->
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon name="ic:outline-search" class="h-5 w-5 text-gray-400" />
        </div>
        <input
          v-model="searchModel"
          class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          type="text"
          placeholder="Tìm kiếm bài viết..."
        />
      </div>

      <!-- Category Filter -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-600">Chuyên mục:</span>
        <UISelect
          v-model="categoryModel"
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
          v-model="sortByModel"
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
        v-if="searchModel"
        class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
      >
        "{{ searchModel }}"
        <button
          @click="searchModel = ''"
          class="ml-1 rounded-full p-0.5 hover:bg-primary-200"
        >
          <Icon name="ic:baseline-close" class="h-3 w-3" />
        </button>
      </span>
      <span
        v-if="categoryModel"
        class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
      >
        {{ categoryModel }}
        <button
          @click="categoryModel = ''"
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
</template>

<script lang="ts" setup>
import { blogList } from '@/stores/blogs'

const props = defineProps<{
  search: string
  category: string
  sortBy: string
}>()

const emits = defineEmits(['update:search', 'update:category', 'update:sortBy'])

const searchModel = computed({
  get: () => props.search,
  set: (val) => emits('update:search', val)
})

const categoryModel = computed({
  get: () => props.category,
  set: (val) => emits('update:category', val)
})

const sortByModel = computed({
  get: () => props.sortBy,
  set: (val) => emits('update:sortBy', val)
})

const categoryOptions = computed(() => {
  const unique = [...new Set(blogList.map((b) => b.category))]
  return [
    { label: 'Tất cả chuyên mục', value: '' },
    ...unique.map((cat) => ({ label: cat, value: cat }))
  ]
})

// Kiểm tra có filter active không
const hasActiveFilters = computed(() => {
  return searchModel.value || categoryModel.value
})

// Xóa tất cả filter
const clearAllFilters = () => {
  searchModel.value = ''
  categoryModel.value = ''
  sortByModel.value = 'newest'
}
</script>
