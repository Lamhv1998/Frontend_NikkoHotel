<template>
  <div class="flex gap-4 mb-6">
    <input
      type="text"
      class="border px-4 py-2 rounded w-full"
      placeholder="Tìm kiếm tiêu đề..."
      v-model="searchModel"
    />
    <select class="border px-4 py-2 rounded" v-model="categoryModel">
      <option value="">Tất cả chuyên mục</option>
      <option value="Nuxt">Nuxt</option>
      <option value="Vue">Vue</option>
      <option value="Deploy">Deploy</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  search: string
  category: string
}>()

const emits = defineEmits(['update:search', 'update:category'])

const searchModel = computed({
  get: () => props.search,
  set: val => emits('update:search', val)
})

const categoryModel = computed({
  get: () => props.category,
  set: val => emits('update:category', val)
})
</script>
